#!/usr/bin/env bash
# =====================================================================
# Script de REDEPLOIEMENT sur le VPS (57.129.132.150 / soocloo.com)
#
# A executer SUR le VPS dans /opt/eduops :
#   cd /opt/eduops && bash scripts/redeploy.sh
# =====================================================================
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

SKIP_GIT_PULL=false
case "${1:-}" in
  --skip-git-pull) SKIP_GIT_PULL=true ;;
  "") ;;
  *) echo "Usage: bash scripts/redeploy.sh [--skip-git-pull]" >&2; exit 2 ;;
esac

echo "================================================================="
echo "   REDEPLOIEMENT DE L'APPLICATION EDUOPS (LUDUS ECOLE)"
echo "================================================================="

# 1. Sauvegarde préventive si le stack tourne déjà
if [ -f scripts/backup-prod.sh ]; then
  echo "==> [1/5] Sauvegarde préventive des données..."
  bash scripts/backup-prod.sh || echo "⚠️ Sauvegarde ignorée (première installation ou conteneurs non démarrés)."
else
  echo "==> [1/5] Pas de script de sauvegarde, étape ignorée."
fi

# 2. Mise à jour du code Git (si dépôt git actif sur le VPS)
echo "==> [2/5] Vérification des mises à jour du code..."
if [ "$SKIP_GIT_PULL" = true ]; then
  echo "  Sources transferees depuis le poste local : mise a jour Git ignoree."
elif [ -d .git ]; then
  echo "  Mise à jour depuis origin/main..."
  git pull --rebase
fi

# 3. Construction des images avec le code à jour
echo "==> [3/5] Construction des nouvelles images Docker (Backend & Frontend)..."
sudo docker compose -f docker/compose.prod.yml build backend frontend

# 4. Redémarrage des services
echo "==> [4/5] Redémarrage à chaud des conteneurs applicatifs..."
sudo docker compose -f docker/compose.prod.yml up -d --wait --wait-timeout 300 postgres redis backend frontend

# 5. Contrôle de santé
echo "==> [5/5] Contrôle d'intégrité..."
sudo docker compose -f docker/compose.prod.yml ps

echo "  Vérification de l'API Backend :"
curl -fsS http://127.0.0.1:58080/actuator/health
echo "  -> Backend UP et opérationnel !"

echo "  Vérification du Frontend :"
curl -fsS http://127.0.0.1:4200/healthz
echo "  -> Frontend UP et opérationnel !"

# Recharger Nginx système s'il est configuré
if command -v nginx >/dev/null 2>&1; then
  echo "==> Test et rechargement de la configuration Nginx hôte..."
  if sudo nginx -t; then
    sudo systemctl reload nginx
    echo "  -> Nginx hôte rechargé avec succès."
  fi
fi

echo
echo "================================================================="
echo "   Redéploiement terminé avec succès !"
echo "   Application accessible sur votre domaine / IP VPS."
echo "================================================================="
