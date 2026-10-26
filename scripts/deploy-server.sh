#!/usr/bin/env bash
# =====================================================================
# Script de deploiement / mise a jour SUR le VPS (57.129.132.150)
# A executer dans /opt/eduops :
#   cd /opt/eduops && bash scripts/deploy-server.sh
# =====================================================================
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

HOST_PUBLIC=57.129.132.150
BACKEND_IMG=astairenazaire/ludus-backend:1.0.0
CONFIG=/opt/eduops/config/application-prod.yml

echo "==> Version docker compose"
sudo docker compose version

echo "==> Construction / Mise à jour des images Docker"
if [ -d backend ] && [ -d frontend ]; then
  echo "  Sources locales détectées : compilation des images..."
  sudo docker compose -f docker/compose.prod.yml build
else
  echo "  Pas de sources locales : téléchargement depuis le registre Docker..."
  sudo docker compose -f docker/compose.prod.yml pull
fi

echo "==> Droits sur les secrets de production"
UID_BACKEND=$(sudo docker run --rm --entrypoint id "$BACKEND_IMG" -u 2>/dev/null | cut -d= -f2 | cut -d'(' -f1 || echo "1000")
GID_REDIS=$(sudo docker run --rm --entrypoint id redis:7-alpine redis 2>/dev/null | awk -F'gid=' '{print $2}' | cut -d'(' -f1 || echo "1000")
echo "  UID backend=$UID_BACKEND  GID redis=$GID_REDIS"

if [ -f "$CONFIG" ]; then
  sudo chown "$UID_BACKEND" "$CONFIG"
  sudo chmod 600 "$CONFIG"
fi
if [ -f docker/postgres/production.password ]; then
  sudo chown root:root docker/postgres/production.password
  sudo chmod 600 docker/postgres/production.password
fi
if [ -f docker/redis/production.conf ]; then
  sudo chown root:"$GID_REDIS" docker/redis/production.conf
  sudo chmod 640 docker/redis/production.conf
fi

echo "==> Validation du Compose"
sudo docker compose -f docker/compose.prod.yml config --quiet

echo "==> Démarrage des conteneurs de production"
sudo docker compose -f docker/compose.prod.yml up -d --wait --wait-timeout 300 postgres redis backend frontend
sudo docker compose -f docker/compose.prod.yml ps

echo "==> Vérification de santé"
echo -n "  Backend Spring Boot : "
curl -fsS http://127.0.0.1:58080/actuator/health && echo " (OK)"
echo -n "  Frontend Nginx : "
curl -fsS http://127.0.0.1:4200/healthz && echo " (OK)"

if command -v nginx >/dev/null 2>&1; then
  echo "==> Rechargement de Nginx système hôte..."
  if sudo nginx -t; then
    sudo systemctl reload nginx
    echo "  Nginx hôte rechargé avec succès."
  fi
fi

echo
echo "======================================================================"
echo " Déploiement terminé. Accès : https://soocloo.com ou http://$HOST_PUBLIC"
echo "======================================================================"
