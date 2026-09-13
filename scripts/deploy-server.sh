#!/usr/bin/env bash
# =====================================================================
# Script de deploiement a executer SUR le VPS 57.129.132.150
# Une fois que scripts/upload.sh a transfere les fichiers dans /opt/eduops.
#   cd /opt/eduops && bash scripts/deploy-server.sh
# =====================================================================
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

HOST_PUBLIC=57.129.132.150
BACKEND_IMG=astairenazaire/ludus-backend:1.0.0
FRONTEND_IMG=astairenazaire/ludus-frontend:1.0.0
CONFIG=/opt/eduops/config/application-prod.yml

echo "==> Version docker compose"
sudo docker compose version

echo "==> Login Docker Hub (requis si les images sont privees)"
if sudo docker login -u astairenazaire; then
  echo "login OK"
else
  echo "ATTENTION : login echoue. Les images publiques seront malgre tout tirees."
fi

echo "==> Telechargement des images"
sudo bash scripts/compose-prod.sh pull

echo "==> Droits sur les secrets"
UID_BACKEND=$(sudo docker run --rm --entrypoint id "$BACKEND_IMG" -u | cut -d= -f2 | cut -d'(' -f1)
GID_REDIS=$(sudo docker run --rm --entrypoint id redis:7-alpine redis | awk -F'gid=' '{print $2}' | cut -d'(' -f1)
echo "  UID backend=$UID_BACKEND  GID redis=$GID_REDIS"
sudo chown "$UID_BACKEND" "$CONFIG"
sudo chmod 600 "$CONFIG"
sudo chown root:root docker/postgres/production.password
sudo chmod 600 docker/postgres/production.password
sudo chown root:"$GID_REDIS" docker/redis/production.conf
sudo chmod 640 docker/redis/production.conf

echo "==> Validation du Compose"
sudo bash scripts/compose-prod.sh config --quiet

echo "==> Demarrage des conteneurs (attente du healthy)"
sudo bash scripts/compose-prod.sh up -d --no-build --wait --wait-timeout 300
sudo bash scripts/compose-prod.sh ps

echo "==> Sante du backend"
curl -fsS http://127.0.0.1:58080/actuator/health && echo " OK"

echo "==> Reverse proxy Node.js (gateway) + demarrage complet"
# Gateway = proxy Node.js (port 80) servant le SPA, /api et /ws.
sudo bash scripts/compose-prod.sh up -d --wait --wait-timeout 180
sudo bash scripts/compose-prod.sh ps

echo "==> Desactivation de l'ancien Nginx système (s'il existe) pour liberer le port 80"
if command -v nginx >/dev/null 2>&1; then
  sudo rm -f /etc/nginx/sites-enabled/eduops
  sudo rm -f /etc/nginx/sites-available/eduops
  sudo systemctl disable nginx 2>/dev/null || true
  sudo systemctl stop nginx 2>/dev/null || true
  sudo systemctl reload nginx 2>/dev/null || true
  echo "  Nginx système stoppé et desactivé."
else
  echo "  Pas de Nginx système détecté, rien à faire."
fi

echo "==> Test du proxy Node.js"
curl -fsS http://127.0.0.1/healthz && echo " (proxy OK)"
curl -fsS http://127.0.0.1:58080/actuator/health && echo " (backend OK)"

echo
echo "======================================================================"
echo " Deploiement termine. Ouvrez http://$HOST_PUBLIC"
echo " Connexion administrateur initiale :"
echo "   email    : admin@ecole.local"
echo "   password : UKYzAsr2Hz97JaXGaZWVwr9n"
echo " Pensez a changer ce mot de passe a la premiere connexion."
echo "======================================================================"