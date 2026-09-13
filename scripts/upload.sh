#!/usr/bin/env bash
# =====================================================================
# Transfere les configs de production du PC vers le VPS 57.129.132.150.
# A executer sur le PC. Les secrets restent locaux et ne sont PAS committes.
#   bash scripts/upload.sh
# Le mot de passe SSH (ubuntu) est demande interactivement.
# =====================================================================
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

HOST=57.129.132.150
USER=ubuntu
DEST=/opt/eduops

echo "==> Creation du repertoire de destination sur le VPS"
ssh "$USER@$HOST" "sudo mkdir -p $DEST/config && sudo chown $USER:$USER $DEST"

echo "==> Transfert de docker/ (compose + nginx + postgres + redis)"
scp -r docker "$USER@$HOST:$DEST/"

echo "==> Transfert de scripts/"
scp -r scripts "$USER@$HOST:$DEST/"

echo "==> Transfert de application-prod.yml (secrets) vers $DEST/config/"
scp backend/src/main/resources/application-prod.yml "$USER@$HOST:$DEST/config/"

echo
echo "Transfert termine. Ensuite, sur le serveur :"
echo '  ssh ubuntu@57.129.132.150'
echo '  sudo -s   # ou utilisez sudo au fil des commandes'
echo '  cd /opt/eduops && bash scripts/deploy-server.sh'