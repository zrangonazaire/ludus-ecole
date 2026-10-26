#!/usr/bin/env bash
# Run as root after building/pulling the images, before starting the services.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

CONFIG=/opt/eduops/config/application-prod.yml
for secret in "$CONFIG" docker/postgres/production.password docker/redis/production.conf; do
  if [ ! -f "$secret" ]; then
    echo "Configuration de production manquante : $secret" >&2
    exit 1
  fi
done

# Resolve users from the actual Compose images, including image overrides.
# Never guess the UID: a wrong owner prevents Spring from reading its config.
backend_uid=$(docker compose -f docker/compose.prod.yml run --rm -T --no-deps --entrypoint id backend -u)
redis_gid=$(docker compose -f docker/compose.prod.yml run --rm -T --no-deps --entrypoint id redis -g redis)
if [[ ! "$backend_uid" =~ ^[0-9]+$ || ! "$redis_gid" =~ ^[0-9]+$ ]]; then
  echo "Impossible de determiner les utilisateurs des images backend/redis." >&2
  exit 1
fi

chown "$backend_uid" "$CONFIG"
chmod 600 "$CONFIG"
chown root:root docker/postgres/production.password
chmod 600 docker/postgres/production.password
chown root:"$redis_gid" docker/redis/production.conf
chmod 640 docker/redis/production.conf
echo "Droits de production retablis (UID backend=$backend_uid, GID redis=$redis_gid)."
