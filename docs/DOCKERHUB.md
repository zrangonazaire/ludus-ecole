# Publier les images sur Docker Hub

Les Dockerfiles utilisent chacun leur dossier comme contexte de construction.
Demarrer Docker Desktop en mode conteneurs Linux. Depuis la racine du projet,
les commandes utilisent le compte Docker Hub astairenazaire et le tag 1.0.0 :

```powershell
docker login
docker build --pull -t astairenazaire/ludus-backend:1.0.0 ./backend
docker build --pull -t astairenazaire/ludus-frontend:1.0.0 ./frontend
docker push astairenazaire/ludus-backend:1.0.0
docker push astairenazaire/ludus-frontend:1.0.0
```

Le backend utilise Java 21. Le frontend est construit en production et servi
par Nginx sur le port 80. Son proxy attend un service `backend` sur le port 8080
dans le meme reseau Docker. Conserver le proxy HTTPS du guide de production.
Les builds Docker ne remplacent pas `mvn verify` : les tests backend ne sont pas
executes pendant la construction de l'image.

## Configuration de production sur le VPS

Le fichier `backend/src/main/resources/application-prod.yml` est exclu de la
nouvelle image backend pour ne pas publier les mots de passe ecrits directement
dans ce fichier. Completer ce fichier puis le transferer uniquement sur le VPS
dans `/opt/eduops/config/application-prod.yml` et en limiter les permissions,
tout en le laissant lisible par l'utilisateur du conteneur.

`docker/compose.prod.yml` utilise deja les images Docker Hub et monte ce fichier.
Definir `IMAGE_TAG=1.0.0` dans `.env.prod` (ou le tag publie). Configuration resumee :

```yaml
  backend:
    image: astairenazaire/ludus-backend:1.0.0
    command:
      - --spring.profiles.active=prod
      - --spring.config.additional-location=file:/app/config/application-prod.yml
    volumes:
      - backend_storage:/app/storage
      - /opt/eduops/config/application-prod.yml:/app/config/application-prod.yml:ro

  frontend:
    image: astairenazaire/ludus-frontend:1.0.0
```

Ce fragment illustre la configuration deja presente ; aucune modification
des services n'est necessaire pour utiliser le tag 1.0.0.
Le Compose existant exige toujours `.env.prod`. Ses mots de passe PostgreSQL
et Redis doivent correspondre au fichier YAML monte.

Puis, depuis `/opt/eduops` :

```bash
sudo docker login
sudo bash scripts/compose-prod.sh pull
sudo bash scripts/compose-prod.sh up -d --no-build --wait --wait-timeout 300
sudo bash scripts/compose-prod.sh ps
sudo bash scripts/compose-prod.sh logs --tail=100 backend
```

La connexion Docker Hub sur le VPS est necessaire pour les images privees.
