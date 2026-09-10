# Deploiement sans variables d'environnement

Aucun .env ni bloc environment dans le Compose de production.
Completer les fichiers suivants avant le transfert, sans publier leurs secrets :

- docker/postgres/production.password : mot de passe PostgreSQL seul.
- docker/redis/production.conf : remplacer A_COMPLETER_REDIS_PASSWORD.
- backend/src/main/resources/application-prod.yml : remplacer tous les
  A_COMPLETER, les adresses admin/SMTP et le fournisseur SMTP. Les mots de passe
  PostgreSQL et Redis doivent correspondre aux deux fichiers precedents.
  Secret JWT aleatoire : au moins 64 caracteres.

Conserver les URL http://57.129.132.150 et les adresses postgres:5432, redis:6379.
Ne pas ecraser des fichiers existants deja renseignes. Changer un fichier de
mot de passe ne change pas le mot de passe d'une base deja initialisee.

## Depuis PowerShell sur le PC

```powershell
cd C:\PROJET\LUDUS-ECOLE
ssh ubuntu@57.129.132.150 "mkdir -p /opt/eduops/config"
scp -r docker ubuntu@57.129.132.150:/opt/eduops/
scp -r scripts ubuntu@57.129.132.150:/opt/eduops/
scp backend/src/main/resources/application-prod.yml ubuntu@57.129.132.150:/opt/eduops/config/
```

## Sur le serveur

```bash
ssh ubuntu@57.129.132.150
cd /opt/eduops
sudo docker compose version
sudo docker login -u astairenazaire
sudo docker compose -f docker/compose.prod.yml config --quiet
sudo docker compose -f docker/compose.prod.yml pull
sudo docker run --rm --entrypoint id astairenazaire/ludus-backend:1.0.0 -u
sudo docker run --rm --entrypoint id redis:7-alpine redis
```

Remplacer UID_BACKEND et GID_REDIS par les nombres affiches (uid backend,
gid redis). Ces marqueurs sont a remplacer directement, pas des variables :

```bash
sudo chown UID_BACKEND config/application-prod.yml
sudo chmod 600 config/application-prod.yml
sudo chown root:root docker/postgres/production.password
sudo chmod 600 docker/postgres/production.password
sudo chown root:GID_REDIS docker/redis/production.conf
sudo chmod 640 docker/redis/production.conf
sudo docker compose -f docker/compose.prod.yml up -d --no-build --wait --wait-timeout 300
sudo docker compose -f docker/compose.prod.yml ps
curl -fsS http://127.0.0.1:58080/actuator/health
```

Attendre UP. En cas d'erreur :

```bash
sudo docker compose -f docker/compose.prod.yml logs --tail=200
```

Si le YAML monte est modifie apres demarrage, faire aussi
`sudo docker compose -f docker/compose.prod.yml restart backend`.

## Nginx

```bash
sudo apt update
sudo apt install -y nginx
sudo cp docker/nginx/production.conf /etc/nginx/sites-available/eduops
```

Creer le lien uniquement s'il n'existe pas :

```bash
sudo ln -s /etc/nginx/sites-available/eduops /etc/nginx/sites-enabled/eduops
```

```bash
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx
```

Autoriser TCP 80 sur le VPS et chez OVH, conserver SSH. Ne pas exposer les ports
4200, 58080, PostgreSQL ou Redis. Ouvrir http://57.129.132.150.
Verifier connexion, creation, fichiers, emails et WebSocket.

HTTP est provisoire pour essais : les identifiants ne sont pas chiffres.
Avec HTTPS, retablir les URL et secure/require-https a true dans le YAML.
Les images publiees n'ont pas besoin d'etre reconstruites pour ces configurations.

Sauvegarde : `sudo bash scripts/backup-prod.sh` (interruption temporaire).
Copier les sauvegardes chiffrees hors du VPS et tester une restauration.
Ne jamais lancer down -v. Les donnees de developpement ne sont pas transferees.
