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
 * Configuration explicite pour le reseau Compose prive derriere Caddy.
 */
const http = require('http');

const BACKEND = {
  host: 'backend',
  port: 8080,
};
const FRONTEND = {
  host: 'frontend',
  port: 80,
};
const PORT = 80;

// En-têtes "hop-by-hop" interdits par un reverse-proxy : ils décrivent la liaison
// locale et sont gérés par Node lui-même, pas transférés upstream/downstream.
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
  if (path === '/api' || path.startsWith('/api/') || path === '/ws' || path.startsWith('/ws/')) return BACKEND;
  return FRONTEND;
}

function buildHeaders(target, req) {
  const headers = { ...req.headers };
  // Caddy is the only public ingress; the gateway has no published port.
  headers['x-real-ip'] = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  headers['x-forwarded-for'] = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  headers['x-forwarded-proto'] = req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
  headers['x-forwarded-host'] = req.headers['x-forwarded-host'] || req.headers.host;
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
    if (head && head.length) upstreamSocket.write(head);
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

if (require.main === module) {
  const server = http.createServer(handleRequest);
  server.on('upgrade', handleUpgrade);
  server.listen(PORT, () => log(`proxy en écoute sur le port ${PORT}`));
}
module.exports = { buildHeaders, targetFor };
