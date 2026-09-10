> Configuration actuelle sans variables : suivre [DEPLOIEMENT_IP.md](DEPLOIEMENT_IP.md). Les anciennes instructions dotenv ci-dessous sont remplacees par ce guide.

# Production sur le VPS 57.129.132.150

Cette configuration utilise Docker Compose v2 et Nginx sur le VPS Ubuntu.
Docker est deja installe. Le fichier `docker/compose.prod.yml` est autonome :
ne pas le fusionner avec le Compose de developpement.
Le projet Compose `eduops-prod` cree des volumes neufs, distincts du developpement.
Une base existante doit etre migree explicitement ; aucun transfert automatique.

## 1. Preparer le serveur

Faire pointer un enregistrement DNS A (ex. ecole.ton-domaine.com) vers
`57.129.132.150`. Remplacer ce domaine dans toutes les commandes ci-dessous.
Ne pas publier d'enregistrement AAAA sans IPv6 fonctionnelle.
Autoriser TCP 80/443 dans les pare-feu du VPS et du fournisseur, tout en conservant
le port SSH. Ne pas ouvrir 4200, 58080, 5432 ou 6379.
Verifier que 4200 et 58080 sont libres et que Nginx gere deja, ou peut utiliser, 80/443.

```bash
ssh ubuntu@57.129.132.150
sudo docker compose version
sudo apt update
sudo apt install -y git nginx certbot python3-certbot-nginx
sudo mkdir -p /opt/eduops
sudo chown "$USER":"$USER" /opt/eduops
git clone https://github.com/zrangonazaire/ludus-ecole.git /opt/eduops
cd /opt/eduops
```

Adapter l'utilisateur SSH. Pour un depot prive, configurer une cle de deploiement.
Les fichiers de production doivent avoir ete pousses dans le depot avant le clone.

## 2. Configurer les valeurs reelles

```bash
cp .env.prod.example .env.prod
chmod 600 .env.prod
nano .env.prod
```

Remplir toutes les valeurs vides et remplacer `APP_BASE_URL` par l'origine HTTPS
du domaine, sans chemin ni slash final. Generer chaque mot de passe avec
`openssl rand -hex 32` et le JWT avec `openssl rand -hex 64`.
Ne pas reutiliser les secrets de developpement. Le JWT doit contenir au moins
64 caracteres et le mot de passe administrateur au moins 10 caracteres.
Pour un secret SMTP contenant `$` ou `#`, entourer la valeur de quotes simples
dans le fichier dotenv. Ne jamais executer ce fichier avec `source`.

Configurer un SMTP authentifie STARTTLS (port 587 habituellement) et un expediteur
autorise par ce fournisseur. La production ne demarre pas Mailpit.
Ne pas versionner `.env.prod`. Changer POSTGRES_PASSWORD sur une base deja creee
ne change pas son mot de passe : effectuer aussi la rotation dans PostgreSQL.

## 3. Construire et demarrer

```bash
sudo bash scripts/compose-prod.sh config --quiet
sudo bash scripts/compose-prod.sh build --pull
sudo bash scripts/compose-prod.sh up -d --wait --wait-timeout 300
sudo bash scripts/compose-prod.sh ps
sudo bash scripts/compose-prod.sh logs --tail=100 backend
curl -fsS http://127.0.0.1:58080/actuator/health
```

Flyway applique les migrations au demarrage. Les images sont construites localement,
sans registre Docker prive. Les Dockerfiles ne lancent pas les tests : avant une
livraison, executer `mvn verify` dans backend (Docker requis pour les tests
d'integration) et `npm ci` puis `npm run build -- --configuration production`
dans frontend. Choisir une version validee avant d'y saisir des donnees reelles.

## 4. Installer Nginx et HTTPS

```bash
sudo cp docker/nginx/production.conf /etc/nginx/sites-available/eduops
sudo nano /etc/nginx/sites-available/eduops
# Remplacer ecole.ton-domaine.com par le domaine reel.
sudo ln -s /etc/nginx/sites-available/eduops /etc/nginx/sites-enabled/eduops
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx
sudo certbot --nginx -d ecole.ton-domaine.com --redirect
sudo certbot renew --dry-run
curl -I https://ecole.ton-domaine.com
```

Si le lien existe deja, ne pas relancer `ln -s`. Conserver les sites existants.
N'utiliser l'application qu'apres activation de HTTPS. Le proxy hote envoie les
routes API/WebSocket directement au backend pour transmettre correctement HTTPS.
L'Actuator n'est pas publie par ce proxy. Swagger et ses schemas sont desactives.
Angular production utilise deja `/api/v1`, `/ws` et les donnees reelles.

Verifier connexion, changement du mot de passe initial, creation d'une donnee,
televersement/telechargement, WebSocket et reception d'un email.

## 5. Sauvegardes

```bash
cd /opt/eduops
sudo bash scripts/backup-prod.sh
```

Le script interrompt temporairement le backend, sauvegarde PostgreSQL, les fichiers
et les variables secretes, puis redemarre le backend meme en cas d'echec.
Seuls les repertoires contenant `COMPLETE` sont declares termines.
Copier les sauvegardes de facon chiffree hors du VPS et tester une restauration
sur une instance isolee. Adapter retention et frequence au volume d'activite.
Exemple quotidien dans `sudo crontab -e` (interruption a 02:00, heure du serveur) :

```cron
0 2 * * * cd /opt/eduops && bash scripts/backup-prod.sh >> /var/log/eduops-backup.log 2>&1
```

## 6. Mise a jour et retour arriere

```bash
cd /opt/eduops
sudo bash scripts/backup-prod.sh
# Ne continuer que si la sauvegarde est terminee.
git pull --ff-only
# Choisir dans .env.prod un IMAGE_TAG unique pour cette livraison.
sudo bash scripts/compose-prod.sh build --pull
sudo bash scripts/compose-prod.sh up -d --wait --wait-timeout 300
sudo bash scripts/compose-prod.sh ps
```

Conserver les anciennes images et noter le tag precedent. Pour revenir a une
ancienne image, remettre son IMAGE_TAG et lancer `up -d --no-build --pull never`.
Si Flyway a modifie le schema, verifier d'abord sa compatibilite : restaurer la
sauvegarde prealable peut etre necessaire et perd les ecritures posterieures.
Pour restaurer dans une instance de recuperation vide, arreter le backend,
restaurer `database.dump` avec `pg_restore -U <utilisateur> -d <base> --no-owner`,
extraire `storage.tar.gz` dans son volume backend_storage avec les droits de
l'utilisateur eduops, puis relancer la version de code associee. Ne pas restaurer
directement par-dessus une production active.

Ne jamais lancer `down -v` ni supprimer les volumes de production.
