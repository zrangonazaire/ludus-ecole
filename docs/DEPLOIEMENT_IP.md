# Deploiement Docker Hub sans domaine

Acces provisoire : http://57.129.132.150. HTTP ne chiffre pas les identifiants
ni les donnees : reserver cette configuration aux essais avant activation HTTPS.
Les images deja publiees n'ont pas besoin d'etre reconstruites pour ces changements
de configuration, puisque le YAML de production est monte depuis le VPS.

## 1. Recuperer les fichiers

Publier les fichiers modifies sur GitHub sans secrets, puis sur le VPS :

```bash
ssh ubuntu@57.129.132.150
sudo mkdir -p /opt/eduops
sudo chown "$USER":"$USER" /opt/eduops
git clone https://github.com/zrangonazaire/ludus-ecole.git /opt/eduops
cd /opt/eduops
```

Si le projet existe deja, faire `cd /opt/eduops` puis `git pull --ff-only`
a la place du clone. Docker avec Compose v2 doit etre installe.

## 2. Completer la configuration

Pour une premiere installation uniquement (ne pas ecraser des fichiers existants) :

```bash
cp .env.prod.example .env.prod
chmod 600 .env.prod
mkdir -p config
cp backend/src/main/resources/application-prod.yml config/application-prod.yml
nano .env.prod
nano config/application-prod.yml
```

Completer toutes les valeurs vides du dotenv et tous les `A_COMPLETER_...` du YAML.
Utiliser `IMAGE_TAG=1.0.0` et `APP_BASE_URL=http://57.129.132.150`.
Conserver eduops comme nom et utilisateur de base, postgres:5432 pour PostgreSQL
et redis:6379 pour Redis dans le YAML. Les mots de passe de ces deux services
doivent correspondre dans les deux fichiers. Ne pas changer les mots de passe
d'une base existante sans effectuer aussi leur rotation dans le service.

Generer chaque mot de passe separement avec `openssl rand -hex 32`, et le JWT
avec `openssl rand -hex 64`. Renseigner le vrai compte administrateur et un SMTP
authentifie STARTTLS (host, utilisateur, mot de passe, expediteur autorise).
Les valeurs applicatives sont lues dans le YAML ; le Compose exige encore les
valeurs dotenv. Garder les deux fichiers coherents.

Pour une configuration existante, mettre les trois URL du YAML sur
http://57.129.132.150, `eduops.security.require-https: false` et
`server.servlet.session.cookie.secure: false`, en conservant les autres valeurs.

## 3. Telecharger et demarrer

```bash
sudo docker compose version
sudo docker login -u astairenazaire
sudo docker compose --env-file .env.prod -f docker/compose.prod.yml config --quiet
sudo docker compose --env-file .env.prod -f docker/compose.prod.yml pull
BACKEND_UID=$(sudo docker run --rm --entrypoint id astairenazaire/ludus-backend:1.0.0 -u)
sudo chown "$BACKEND_UID" config/application-prod.yml
sudo chmod 600 config/application-prod.yml
sudo docker compose --env-file .env.prod -f docker/compose.prod.yml up -d --no-build --wait --wait-timeout 300
sudo docker compose --env-file .env.prod -f docker/compose.prod.yml ps
curl -fsS http://127.0.0.1:58080/actuator/health
```

Le healthcheck doit indiquer UP. Si seul le contenu d'un YAML deja monte a change,
redemarrer aussi le backend :

```bash
sudo docker compose --env-file .env.prod -f docker/compose.prod.yml restart backend
```

En cas d'echec :

```bash
sudo docker compose --env-file .env.prod -f docker/compose.prod.yml logs --tail=200 backend
```

## 4. Publier HTTP avec Nginx

```bash
sudo apt update
sudo apt install -y nginx
sudo cp docker/nginx/production.conf /etc/nginx/sites-available/eduops
```

Creer le lien uniquement s'il n'existe pas deja :

```bash
sudo ln -s /etc/nginx/sites-available/eduops /etc/nginx/sites-enabled/eduops
```

```bash
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx
curl -I http://57.129.132.150
```

Autoriser TCP 80 dans le pare-feu du VPS et chez OVH, conserver SSH et ne pas
ouvrir publiquement 4200, 58080, 5432 ou 6379. Ne pas executer Certbot avec un
domaine fictif. Ouvrir http://57.129.132.150 et verifier connexion, creation,
fichiers, emails et WebSocket. Le service worker Angular ne fonctionne pas
sur cette origine HTTP distante : le mode hors ligne n'est pas disponible.

La base est distincte du developpement. Ne jamais utiliser `down -v`.
Sauvegarder avec `sudo bash scripts/backup-prod.sh` (interruption temporaire),
conserver une copie chiffree hors du VPS et tester une restauration.

Quand HTTPS sera configure, remplacer les URL, retablir les deux options de
securite a true et redemarrer le backend.
