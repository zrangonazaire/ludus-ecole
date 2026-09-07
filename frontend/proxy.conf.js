/**
 * Vers quel backend le serveur de développement renvoie /api et /ws.
 *
 * Il y a deux façons de lancer le backend, et elles n'écoutent pas au même
 * endroit :
 *   - `mvn spring-boot:run` écoute sur 8080 (server.port dans application.yml) ;
 *   - la pile Docker publie 58080 (BACKEND_PORT dans docker/.env).
 *
 * L'ancien fichier JSON codait 58080 en dur alors que le README annonce
 * « proxies /api and /ws to the local :8080 ». Quand le backend tournait par
 * Maven, chaque appel partait vers un port où personne n'écoutait : le serveur
 * de développement répondait alors 500 avec un corps texte, sans l'enveloppe
 * d'erreur du serveur, et l'écran accusait le backend d'une panne interne
 * alors qu'il n'avait simplement jamais été joint.
 *
 * Par défaut 8080, le cas documenté. Pour la pile Docker :
 *   BACKEND_PORT=58080 npm start
 */
const port = process.env.BACKEND_PORT || '8080';
const target = process.env.BACKEND_URL || `http://localhost:${port}`;

/** Dit en clair, dans le terminal, ce que le navigateur ne peut pas deviner. */
function onError(err, req, res) {
  const message = `[proxy] ${req.method} ${req.url} -> ${target} : ${err.code || err.message}`
    + (err.code === 'ECONNREFUSED'
      ? `\n[proxy] Aucun serveur n'écoute sur ${target}.`
        + ' Lancez le backend, ou fixez BACKEND_PORT si le vôtre écoute ailleurs.'
      : '');
  console.error(message);
  if (res && !res.headersSent && res.writeHead) {
    res.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8' });
    // On rend l'enveloppe que le frontend sait lire, plutôt qu'une page
    // d'erreur du serveur de développement : l'écran affiche ainsi « serveur
    // injoignable » au lieu de « panne interne du serveur ».
    res.end(JSON.stringify({
      status: 503,
      code: 'BACKEND_UNREACHABLE',
      message: `Le backend ne répond pas sur ${target}.`,
      path: req.url
    }));
  }
}

module.exports = {
  '/api': { target, secure: false, changeOrigin: true, onError },
  '/ws': { target, secure: false, ws: true, onError }
};
