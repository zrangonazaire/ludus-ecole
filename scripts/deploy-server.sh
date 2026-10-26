#!/usr/bin/env bash
# =====================================================================
# Script de deploiement / mise a jour SUR le VPS (57.129.132.150)
# A executer dans /opt/eduops :
#   cd /opt/eduops && bash scripts/deploy-server.sh
# =====================================================================
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

HOST_PUBLIC=57.129.132.150

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
sudo bash scripts/prepare-prod-permissions.sh

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
