# Soocloo : Docker Compose et Caddy

Cette configuration suit la procedure fournie pour https://soocloo.com.
www.soocloo.com redirige vers soocloo.com. Caddy expose 80/443 ; le gateway
interne transmet /api et /ws au backend et les pages au frontend.
Aucun fichier .env n'est requis. SMTP reste desactive.

## Avant la bascule

- DNS A de soocloo.com et www.soocloo.com vers 57.129.132.150. Ne conserver
  un AAAA que si cette IPv6 fonctionne sur le VPS.
- Autoriser TCP 80/443, conserver SSH. UDP 443 est facultatif pour HTTP/3.
- Verifier que les images 1.0.0 souhaitees sont publiees. Les changements
  de gateway et Caddy sont montes depuis les fichiers, sans build necessaire.
- Sauvegarder les donnees avant la bascule.
- Le projet Compose s'appelle eduops pour reutiliser les volumes eduops_*
  observes dans les logs. Verifier avec `sudo docker volume ls` AVANT de lancer.
  Si votre installation utilise eduops-prod, adapter `name` dans les deux
  fichiers Compose a ce nom, sinon une nouvelle base vide serait creee.

## Transferer depuis PowerShell

Depuis C:\PROJET\LUDUS-ECOLE :

```powershell
scp compose.yaml Caddyfile ubuntu@57.129.132.150:/opt/eduops/
scp docker/compose.prod.yml ubuntu@57.129.132.150:/opt/eduops/docker/
scp -r docker/proxy ubuntu@57.129.132.150:/opt/eduops/docker/
```

Ne pas recopier les fichiers de secrets existants. Pour une premiere installation,
copier aussi docker/postgres, docker/redis et scripts, puis creer
/opt/eduops/config/application-prod.yml a partir de
docker/backend/application-prod.example.yml en completant les secrets et les droits.

## Configuration backend deja presente sur le serveur

Editer `sudo nano /opt/eduops/config/application-prod.yml`, conserver les secrets
et ajuster les champs existants (ne pas dupliquer les sections YAML) :

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
    base-url: "https://soocloo.com"
    api-url: "https://soocloo.com"
  security:
    require-https: true
```

## Demarrer sur le VPS

```bash
cd /opt/eduops
sudo docker compose config --quiet
sudo docker login -u astairenazaire
sudo docker compose pull
sudo docker compose up -d postgres redis
sudo docker compose up -d --no-build --wait --wait-timeout 300 backend frontend gateway
sudo docker compose restart backend
sudo docker compose up -d --no-build --wait --wait-timeout 300 backend frontend gateway
sudo docker compose exec gateway wget -qO- http://localhost/healthz
sudo docker compose exec gateway wget -qO- http://frontend/healthz
sudo docker compose exec gateway wget -qO- http://backend:8080/actuator/health
```

Le redemarrage backend recharge le YAML monte. Attendre UP avant la bascule.
Apres verification que Nginx ne sert pas d'autres sites indispensables :

```bash
sudo systemctl stop nginx
sudo ss -lntp | grep -E ':(80|443)\b'
```

Les ports doivent etre libres, quel que soit le programme qui les utilisait.

```bash
sudo docker compose up -d caddy
sudo docker compose exec caddy caddy validate --config /etc/caddy/Caddyfile
sudo docker compose logs --tail=100 caddy
curl -I http://soocloo.com
curl -I https://soocloo.com
curl -I https://www.soocloo.com
```

Apres succes, `sudo systemctl disable nginx`. Si Caddy ne demarre pas,
`sudo docker compose stop caddy` puis `sudo systemctl start nginx` permet de
retablir l'ancien proxy (adapter aussi les URL backend si retour a HTTP).

## Mises a jour

```bash
sudo docker compose pull backend frontend
sudo docker compose up -d --no-build --wait --wait-timeout 300 backend frontend gateway
sudo docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
sudo docker compose ps
```

Les certificats sont conserves dans caddy_data. Ne jamais supprimer les volumes
de production. Le renouvellement TLS et le fonctionnement sur le VPS doivent
etre verifies sur le serveur ; une validation locale ne prouve pas l'etat DNS.
