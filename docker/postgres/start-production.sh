#!/bin/sh
# Explicit paths and credentials file; no environment-based configuration.
set -eu
if grep -q A_COMPLETER /etc/postgresql/production.password; then
  echo 'Complete docker/postgres/production.password before starting PostgreSQL.' >&2
  exit 1
fi
mkdir -p /var/lib/postgresql/data /var/run/postgresql
chown postgres:postgres /var/lib/postgresql/data /var/run/postgresql
chmod 700 /var/lib/postgresql/data
if [ ! -s /var/lib/postgresql/data/PG_VERSION ]; then
  # Copy the root-readable mounted secret to a postgres-readable temporary file.
  install -m 600 -o postgres -g postgres /etc/postgresql/production.password /var/run/postgresql/init.password
  gosu postgres initdb -D /var/lib/postgresql/data -U eduops \
    --pwfile=/var/run/postgresql/init.password --auth-local=trust --auth-host=scram-sha-256
  rm /var/run/postgresql/init.password
  printf '\nhost all all all scram-sha-256\n' >> /var/lib/postgresql/data/pg_hba.conf
  gosu postgres pg_ctl -D /var/lib/postgresql/data -o "-c listen_addresses=''" -w start
  gosu postgres createdb -U eduops eduops
  gosu postgres pg_ctl -D /var/lib/postgresql/data -m fast -w stop
fi
exec gosu postgres postgres -D /var/lib/postgresql/data -c config_file=/etc/postgresql/postgresql.conf
