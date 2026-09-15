# Déployer Soocloo sur le VPS avec HTTPS

Procédure pour Ubuntu, Docker Compose v2, et le VPS **57.129.132.150** indiqué
dans les fichiers du projet. Remplacer cette IP et l'utilisateur `ubuntu` si
votre serveur a changé. Le domaine principal sera **https://www.soocloo.com** ;
le certificat couvrira aussi **https://soocloo.com**.

Cette procédure utilise Nginx sur le VPS, qui transmet directement `/api/` et
`/ws` au backend et les autres requêtes au frontend. Le service Node `gateway`
n'est pas nécessaire. Ne pas lancer `scripts/deploy-server.sh` pour cette
installation : sa version actuelle désactive Nginx et vise un accès HTTP.

Les commandes ci-dessous sont à exécuter par vous. Aucun déploiement distant
n'a été effectué lors de la préparation de ce guide.

## 1. DNS

Dans la zone DNS de **soocloo.com**, configurer :

| Type | Nom | Destination |
|---|---|---|
| A | @ | 57.129.132.150 |
| CNAME | www | soocloo.com. |

Éviter un autre enregistrement A/AAAA concurrent sur `www`. Ne conserver un
AAAA que si l'IPv6 correspondante sert bien ce VPS. Si un proxy DNS/CDN est
activé, utiliser le mode DNS seul pour cette procédure initiale.

Après propagation, vérifier depuis votre poste :

```bash
dig +short soocloo.com A
dig +short www.soocloo.com A
```

Les deux noms doivent aboutir à l'IP du VPS avant de demander le certificat.

## 2. Préparer le VPS

```bash
ssh ubuntu@57.129.132.150
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx rsync dnsutils
sudo docker compose version
sudo mkdir -p /opt/eduops
sudo chown ubuntu:ubuntu /opt/eduops
```

Si Docker/Compose manque, suivre l'installation officielle :
[Docker Engine sur Ubuntu](https://docs.docker.com/engine/install/ubuntu/).

Autoriser TCP **80 et 443** dans le pare-feu du fournisseur et celui du VPS.
Conserver le port SSH réel. Pour UFW avec SSH sur le port standard 22 :

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw status
```

Si vous activez UFW pour la première fois, autoriser aussi les autres services
nécessaires avant `sudo ufw enable`. Les ports applicatifs doivent rester liés
à `127.0.0.1`, comme dans le Compose de production ; PostgreSQL et Redis n'ont
pas de port publié. Les ports Docker publics peuvent contourner UFW.
[Documentation Docker](https://docs.docker.com/engine/network/packet-filtering-firewalls/).

## 3. Transférer le code corrigé

**Sur votre poste**, depuis le projet :

```bash
cd /home/astairenazaire/spring-projet/ludus-ecole
rsync -az --exclude='.git/' --exclude='node_modules/' --exclude='target/' \
  --exclude='dist/' --exclude='.angular/' --exclude='backups/' \
  --exclude='storage/' --exclude='presentation-front/' --exclude='.env*' \
  --exclude='config/' --exclude='production.password' --exclude='production.conf' \
  --exclude='backend/src/main/resources/application-prod.yml' \
  ./ ubuntu@57.129.132.150:/opt/eduops/
```

Cette commande transfère les modifications locales, même non poussées dans Git,
et conserve les secrets déjà présents sur le serveur. Pour une installation
existante, effectuer d'abord une sauvegarde à l'étape 10 et conserver la version
précédente du Compose. Ne pas utiliser `--delete`.

Le Dockerfile backend corrigé transmet les arguments de démarrage de Compose
et exclut le fichier de secrets production du JAR. L'application lit le fichier
externe `/opt/eduops/config/application-prod.yml` monté dans le conteneur.

## 4. Créer la configuration privée sur le VPS

Les valeurs secrètes présentes dans l'ancien code ne doivent pas être utilisées
pour une nouvelle production. Générer de nouvelles valeurs indépendantes.

**Sur le VPS, pour une première installation uniquement :**

```bash
cd /opt/eduops
sudo install -d -m 750 config
sudo install -m 600 docker/backend/application-prod.example.yml config/application-prod.yml
sudoedit config/application-prod.yml
```

Remplacer chaque `A_COMPLETER` :

- `spring.datasource.password` : nouveau mot de passe PostgreSQL ;
- `spring.data.redis.password` : nouveau mot de passe Redis différent ;
- `eduops.bootstrap.admin-password` : mot de passe administrateur unique ;
- `eduops.security.jwt.secret` : secret aléatoire d'au moins 64 caractères ;
- `spring.mail.password` : secret SMTP, ou chaîne vide si les emails restent désactivés.

Générer les valeurs dans le terminal du VPS puis les conserver dans votre
gestionnaire de mots de passe : `openssl rand -hex 32` pour un mot de passe,
`openssl rand -hex 64` pour JWT. Ne pas les committer ou les partager.

Le modèle contient déjà ces valeurs HTTPS :

```yaml
server:
  forward-headers-strategy: framework
  servlet:
    session:
      cookie:
        secure: true
eduops:
  cors:
    allowed-origins: "https://soocloo.com,https://www.soocloo.com"
  app:
    base-url: "https://www.soocloo.com"
    api-url: "https://www.soocloo.com"
  security:
    require-https: true
```

Ce bloc est un extrait : modifier les sections existantes, ne pas dupliquer
les clés YAML. La redirection HTTPS sera assurée par Nginx : le champ
`require-https` n'est actuellement pas exploité par la chaîne Spring Security.

Créer le fichier PostgreSQL contenant **uniquement** le même mot de passe que
`spring.datasource.password` :

```bash
sudoedit docker/postgres/production.password
sudo cp docker/redis/redis.conf docker/redis/production.conf
sudoedit docker/redis/production.conf
```

Ajouter dans le fichier Redis `requirepass VOTRE_MOT_DE_PASSE_REDIS`, avec la
même valeur que dans le YAML. Utiliser des secrets hexadécimaux simplifie leur
syntaxe. En installation existante, ne pas écraser ces fichiers : changer le
mot de passe PostgreSQL dans un fichier ne le change pas dans la base.

Pour les emails, renseigner le fournisseur SMTP, l'identifiant, le mot de passe
et un expéditeur autorisé. Avec STARTTLS sur 587, activer
`mail.smtp.auth`, `mail.smtp.starttls.enable`, `mail.smtp.starttls.required`
et `eduops.mail.enabled`. Configurer SPF/DKIM chez ce fournisseur et vérifier
l'envoi avant d'ouvrir les inscriptions. Le modèle laisse les emails désactivés.

## 5. Construire les images de la version corrigée

Le Compose actuel contient des images `1.0.0` : elles ne contiennent pas
automatiquement les corrections locales. Construire une nouvelle version :

```bash
cd /opt/eduops
sudo docker build -f docker/backend/Dockerfile -t astairenazaire/ludus-backend:soocloo-20260915 .
sudo docker build -f docker/frontend/Dockerfile -t astairenazaire/ludus-frontend:soocloo-20260915 .
sudoedit docker/compose.prod.yml
```

Dans le Compose, remplacer les deux tags `1.0.0` par `soocloo-20260915`.
Ne pas changer le nom `eduops-prod` ou les volumes d'une installation existante.
Conserver les images précédentes pour pouvoir revenir en arrière.

Vérifier les identifiants numériques des utilisateurs des images :

```bash
sudo docker run --rm --entrypoint id astairenazaire/ludus-backend:soocloo-20260915 -u
sudo docker run --rm --entrypoint id redis:7-alpine -g redis
```

Remplacer `UID_BACKEND` et `GID_REDIS` ci-dessous par les nombres affichés :

```bash
sudo chown UID_BACKEND config/application-prod.yml
sudo chmod 600 config/application-prod.yml
sudo chown root:root docker/postgres/production.password
sudo chmod 600 docker/postgres/production.password
sudo chown root:GID_REDIS docker/redis/production.conf
sudo chmod 640 docker/redis/production.conf
```

## 6. Démarrer l'application

```bash
cd /opt/eduops
sudo bash scripts/compose-prod.sh config --quiet
sudo bash scripts/compose-prod.sh up -d --no-build --pull never --wait --wait-timeout 300 postgres redis backend frontend
sudo bash scripts/compose-prod.sh ps
curl -fsS http://127.0.0.1:58080/actuator/health
curl -I http://127.0.0.1:4200
```

Télécharger au préalable `postgres:16-alpine` et `redis:7-alpine` avec
`sudo docker pull` si ces images manquent. Le backend doit annoncer le profil
`prod` et un état `UP`. Dans Docker, sa base est `postgres:5432`, jamais
`localhost:55432`. Les volumes de production sont distincts du développement ;
les données locales ne sont pas transférées automatiquement.

Si le service `gateway` de l'ancienne installation tourne, l'arrêter :
`sudo bash scripts/compose-prod.sh stop gateway`. Nginx utilisera directement
4200 et 58080, tous deux accessibles seulement depuis le VPS.

En cas d'échec :

```bash
sudo bash scripts/compose-prod.sh logs --tail=150 backend postgres
```

## 7. Installer le site Nginx

```bash
sudo cp /opt/eduops/docker/nginx/soocloo.conf /etc/nginx/sites-available/soocloo
sudo ln -s /etc/nginx/sites-available/soocloo /etc/nginx/sites-enabled/soocloo
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx
```

Si le lien existe déjà, ne pas refaire `ln -s`. Si un ancien site Nginx déclare
les mêmes domaines, retirer uniquement son lien d'activation après sauvegarde.
Conserver les autres sites hébergés. Vérifier que les ports 80/443 sont libres
ou déjà gérés par Nginx. Ne pas utiliser les identifiants dans le site HTTP
provisoire ; passer immédiatement à l'étape suivante.

## 8. Activer HTTPS avec Let's Encrypt

```bash
sudo certbot --nginx -d soocloo.com -d www.soocloo.com --redirect
sudo nginx -t
sudo systemctl reload nginx
sudo certbot renew --dry-run
systemctl list-timers --all | grep certbot
```

Renseigner votre adresse de contact et accepter les conditions demandées.
Certbot installe le certificat et la redirection HTTP vers HTTPS. Vérifier
qu'un timer de renouvellement est actif. Conserver le port 80 joignable pour
la validation et le renouvellement HTTP-01.
[Guide officiel Ubuntu/Certbot](https://ubuntu.com/server/docs/how-to/security/obtain-tls-certificates/).

Ne pas recopier ensuite le fichier HTTP initial par-dessus le fichier modifié
par Certbot, sous peine de supprimer sa configuration HTTPS.

## 9. Vérifier depuis votre poste

```bash
curl -I http://www.soocloo.com
curl -I https://www.soocloo.com
curl -I https://soocloo.com
```

Attendre une redirection pour HTTP et un certificat valide pour les deux noms.
Ouvrir **https://www.soocloo.com**, vérifier la connexion, changer le mot de
passe initial, créer une donnée, tester les fichiers, le WebSocket et les emails
si activés. Les deux domaines fonctionnent ; aucune redirection du domaine nu
vers `www` n'est imposée par ce guide.

Les tests automatiques ne remplacent pas ces essais sur le VPS : DNS,
certificat et SMTP dépendent de votre infrastructure réelle.

## 10. Sauvegarde et mises à jour

```bash
cd /opt/eduops
sudo bash scripts/backup-prod.sh
```

Le script arrête temporairement le backend puis le redémarre. Il sauvegarde
la base, les fichiers et les secrets. Vérifier le marqueur `COMPLETE`, copier
la sauvegarde de manière chiffrée hors du VPS et tester une restauration sur
une instance isolée. Exécuter une sauvegarde avant toute mise à jour.

Pour chaque livraison, choisir de nouveaux tags d'images, modifier le Compose,
puis relancer les quatre services avec la commande de l'étape 6. Flyway applique
les nouvelles migrations. Un retour à une ancienne image exige un schéma
compatible ou une restauration de la sauvegarde préalable.

**Ne jamais lancer `docker compose down -v` sur la production.**
