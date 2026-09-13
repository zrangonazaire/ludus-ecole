'use strict';

/**
 * EduOps - Reverse proxy Node.js (sans dépendance externe).
 * Remplace le Nginx système sur le VPS.
 *
 * Routage :
 *   /api/* et /ws   -> backend (port interne 8080)
 *   tout le reste   -> frontend (port interne 80)
 *
 * Gère les requêtes HTTP(S) et le passage WebSocket (upgrade).
 * Variables d'environnement (définies dans compose.prod.yml) :
 *   BACKEND_HOST / BACKEND_PORT / FRONTEND_HOST / FRONTEND_PORT / LISTEN_PORT
 */
const http = require('http');

const BACKEND = {
  host: process.env.BACKEND_HOST || 'backend',
  port: Number(process.env.BACKEND_PORT || 8080),
};
const FRONTEND = {
  host: process.env.FRONTEND_HOST || 'frontend',
  port: Number(process.env.FRONTEND_PORT || 80),
};
const PORT = Number(process.env.LISTEN_PORT || 80);

// En-têtes "hop-by-hop" interdits par un reverse-proxy : ils décrivent la liaison
// locale et sont gérés par Node lui-même, pas transférés upstream/downstream.
// Polyfill injecté dans le HTML servi par le frontend, AVANT les bundles.
// crypto.randomUUID est absent en HTTP via IP (contexte non sécurisé) et
// ferait planter Angular au chargement. Longueur minimale : le script est
// exécuté par le navigateur avant les modules, et définit l'API manquante.
const POLYFILL_RANDOM_UUID =
  '<script>(function(){var c=window.crypto;if(c&&typeof c.randomUUID!=="function"){' +
  'c.randomUUID=function(){var a=new Uint8Array(16),i;c.getRandomValues(a);' +
  'a[6]=a[6]&15|64;a[8]=a[8]&63|128;var h="";for(i=0;i<16;i++){' +
  'h+=(i===4||i===6||i===8||i===10?"-":"")+(a[i]<16?"0":"")+a[i].toString(16);}' +
  'return h;};}})();</script>';

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

function log(msg) {
  console.log(`${new Date().toISOString()} [eduops-proxy] ${msg}`);
}

function targetFor(req) {
  const path = req.url.split('?')[0];
  if (path.startsWith('/api') || path.startsWith('/ws')) return BACKEND;
  return FRONTEND;
}

function buildHeaders(target, req) {
  const headers = { ...req.headers, host: target.host };
  // Force une réponse non compressée de l'upstream : l'injection du polyfill
  // exige de lire/écrire le HTML en clair. Le contenu est ensuite renvoyé tel
  // quel (sans recompression), ce qui est négligeable pour ce proxy.
  delete headers['accept-encoding'];
  headers['X-Real-IP'] = req.socket.remoteAddress || '';
  headers['X-Forwarded-For'] = req.socket.remoteAddress || '';
  headers['X-Forwarded-Proto'] = 'http';
  return headers;
}

function handleRequest(req, res) {
  const target = targetFor(req);
  // Point de santé du proxy lui-même (utilisé par le healthcheck Docker).
  if (req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('ok\n');
    return;
  }
  const upstream = http.request(
    {
      host: target.host,
      port: target.port,
      path: req.url,
      method: req.method,
      headers: buildHeaders(target, req),
    },
    (upstreamRes) => {
      const headers = { ...upstreamRes.headers };
      for (const key of Object.keys(headers)) {
        if (HOP_BY_HOP.has(key.toLowerCase())) delete headers[key];
      }

      const contentType = String(headers['content-type'] || '');
      // Injecte le polyfill crypto.randomUUID dans les pages HTML du frontend
      // (index.html) pour fonctionner en HTTP non sécurisé, sans reconstruire
      // l'image Angular. Le reste (assets, API) est streamé normalement.
      const isFrontendHtml =
        target === FRONTEND &&
        (contentType.includes('text/html')) &&
        !upstreamRes.statusCode.toString().startsWith('3');

      if (isFrontendHtml) {
        const chunks = [];
        upstreamRes.on('data', (c) => chunks.push(c));
        upstreamRes.on('end', () => {
          let body = Buffer.concat(chunks).toString('utf8');
          if (body.includes('</head>')) {
            // Injecte avant </head> : le doctype reste en première position,
            // le navigateur reste en "Standards Mode".
            body = body.replace('</head>', POLYFILL_RANDOM_UUID + '</head>');
          } else {
            // Sans </head> exploitable, on ne dégrade PAS la page (évite le
            // Quirks Mode) : on place le polyfill à la fin du body.
            body = body.replace('</body>', POLYFILL_RANDOM_UUID + '</body>') ||
              body + POLYFILL_RANDOM_UUID;
          }
          // Le body est modifié -> la longueur d'origine n'est plus valable.
          delete headers['content-length'];
          res.writeHead(upstreamRes.statusCode, headers);
          res.end(body);
        });
        upstreamRes.on('error', (err) => log(`erreur lecture html -> ${err.message}`));
        return;
      }

      res.writeHead(upstreamRes.statusCode, headers);
      upstreamRes.pipe(res);
    }
  );

  upstream.on('error', (err) => {
    log(`erreur upstream vers ${target.host}:${target.port} -> ${err.message}`);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad Gateway');
    } else {
      res.destroy();
    }
  });
  req.on('error', () => upstream.destroy());

  req.pipe(upstream);
}

function handleUpgrade(req, socket, head) {
  const target = targetFor(req);
  const upstream = http.request({
    host: target.host,
    port: target.port,
    path: req.url,
    method: 'GET',
    headers: buildHeaders(target, req),
  });

  upstream.on('upgrade', (upstreamRes, upstreamSocket, upstreamHead) => {
    socket.write(
      'HTTP/1.1 101 Switching Protocols\r\n' +
        `Upgrade: ${upstreamRes.headers.upgrade || 'websocket'}\r\n` +
        `Connection: Upgrade\r\n` +
        `Sec-WebSocket-Accept: ${upstreamRes.headers['sec-websocket-accept'] || ''}\r\n` +
        '\r\n'
    );
    if (upstreamHead && upstreamHead.length) socket.write(upstreamHead);
    upstreamSocket.pipe(socket);
    socket.pipe(upstreamSocket);
    upstreamSocket.on('error', () => socket.destroy());
    socket.on('error', () => upstreamSocket.destroy());
  });

  upstream.on('error', (err) => {
    log(`erreur websocket upstream -> ${err.message}`);
    socket.destroy();
  });
  upstream.end();
}

const server = http.createServer(handleRequest);
server.on('upgrade', handleUpgrade);

server.listen(PORT, () => {
  log(`proxy en écoute sur le port ${PORT}`);
  log(`backend  -> ${BACKEND.host}:${BACKEND.port}`);
  log(`frontend -> ${FRONTEND.host}:${FRONTEND.port}`);
});