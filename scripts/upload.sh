#!/usr/bin/env bash
# =====================================================================
# Transfere les configs de production du PC vers le VPS 57.129.132.150.
# A executer sur le PC. Les secrets restent locaux et ne sont PAS committes.
#   bash scripts/upload.sh
# =====================================================================
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

HOST="${1:-57.129.132.150}"
USER="${2:-ubuntu}"
DEST="${3:-/opt/eduops}"

echo "==> Creation du repertoire de destination sur le VPS"
ssh "$USER@$HOST" "sudo mkdir -p $DEST/config && sudo chown -R $USER:$USER $DEST"

echo "==> Transfert de docker/ (compose + nginx + postgres + redis)"
scp -r docker "$USER@$HOST:$DEST/"

echo "==> Transfert de scripts/"
scp -r scripts "$USER@$HOST:$DEST/"

if [ -f backend/src/main/resources/application-prod.yml ]; then
  echo "==> Transfert de application-prod.yml vers $DEST/config/"
  scp backend/src/main/resources/application-prod.yml "$USER@$HOST:$DEST/config/"
fi

echo
echo "Transfert termine. Ensuite, sur le serveur :"
echo "  ssh $USER@$HOST"
echo "  cd $DEST && bash scripts/redeploy.sh"
