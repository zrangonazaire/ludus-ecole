#!/usr/bin/env bash
# =====================================================================
# Synchronise le code local vers le VPS et execute le redeploiement.
# A executer depuis votre poste (Git Bash, WSL ou Linux/macOS) :
#   bash scripts/sync-to-vps.sh
# =====================================================================
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

HOST="${1:-57.129.132.150}"
USER="${2:-ubuntu}"
DEST="${3:-/opt/eduops}"

echo "================================================================="
echo "  SYNCHRONISATION ET REDEPLOIEMENT SUR LE VPS ($HOST)"
echo "================================================================="

echo "==> [1/6] Preparation du dossier distant $DEST..."
ssh "$USER@$HOST" "sudo mkdir -p $DEST/config && sudo chown $USER:$USER $DEST"

echo "==> [2/6] Transfert de docker/ et scripts/..."
# Application updates must not overwrite the VPS secrets with local values.
docker_archive=$(mktemp)
trap 'rm -f "$docker_archive"' EXIT
tar --exclude=.env --exclude='.env.*' --exclude=./postgres/production.password --exclude=./redis/production.conf -cf "$docker_archive" -C docker .
scp "$docker_archive" "$USER@$HOST:$DEST/.deploy-docker.tar"
ssh "$USER@$HOST" "mkdir -p $DEST/docker && tar --no-same-owner --no-same-permissions -xf $DEST/.deploy-docker.tar -C $DEST/docker && rm -f $DEST/.deploy-docker.tar"
scp -r scripts "$USER@$HOST:$DEST/"

echo "==> [3/6] Transfert du backend (pom.xml et src/)..."
ssh "$USER@$HOST" "mkdir -p $DEST/backend"
scp backend/pom.xml "$USER@$HOST:$DEST/backend/"
[ -f backend/Dockerfile ] && scp backend/Dockerfile "$USER@$HOST:$DEST/backend/"
scp -r backend/src "$USER@$HOST:$DEST/backend/"

echo "==> [4/6] Transfert du frontend..."
ssh "$USER@$HOST" "mkdir -p $DEST/frontend"
scp frontend/package.json "$USER@$HOST:$DEST/frontend/"
[ -f frontend/package-lock.json ] && scp frontend/package-lock.json "$USER@$HOST:$DEST/frontend/"
[ -f frontend/angular.json ] && scp frontend/angular.json "$USER@$HOST:$DEST/frontend/"
[ -f frontend/nginx.conf ] && scp frontend/nginx.conf "$USER@$HOST:$DEST/frontend/"
[ -f frontend/ngsw-config.json ] && scp frontend/ngsw-config.json "$USER@$HOST:$DEST/frontend/"
[ -f frontend/Dockerfile ] && scp frontend/Dockerfile "$USER@$HOST:$DEST/frontend/"
scp frontend/tsconfig*.json "$USER@$HOST:$DEST/frontend/"
scp -r frontend/src "$USER@$HOST:$DEST/frontend/"

echo "==> [5/6] Transfert du compose.yaml..."
scp compose.yaml "$USER@$HOST:$DEST/"

echo "==> [6/6] Execution du redeploiement sur le VPS..."
ssh -t "$USER@$HOST" "cd $DEST && bash scripts/redeploy.sh --skip-git-pull"

echo
echo "================================================================="
echo "  Redeploiement termine avec succes !"
echo "================================================================="
