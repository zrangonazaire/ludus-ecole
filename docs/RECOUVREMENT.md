# Impayés et recouvrement

Ouvrir **Finance → Impayés** (`/outstanding`). Le tableau concerne l'année scolaire active.
Les soldes proviennent des frais réellement affectés aux élèves et diminuent lors des
encaissements. Une échéance est en retard à partir du lendemain de sa date limite ;
le filtre prioritaire commence à 30 jours de retard.

## Suivre un dossier

1. Rechercher un élève, une classe ou un responsable financier.
2. Cliquer sur **Suivi** pour consulter les démarches de l'année active.
3. Choisir le canal, saisir le compte rendu et, si nécessaire, la prochaine date de relance.
4. En cas de promesse, renseigner ensemble un montant positif et sa date de paiement.
5. Enregistrer. L'auteur et la date sont conservés avec la démarche.

Le formulaire consigne des contacts déjà effectués : il n'envoie aucun SMS ni email.
Chaque enregistrement est conservé ; une correction s'effectue par une nouvelle note.
Les champs de suivi du tableau reflètent la dernière démarche du dossier. Une nouvelle
note sans date de relance efface donc cette date dans le tableau, sans supprimer l'historique.
Le filtre **À relancer** présente les dossiers dont cette date est aujourd'hui ou passée.
Une promesse n'est pas un encaissement et ne réduit jamais le solde dû.

Utiliser **Encaisser** pour enregistrer un versement dans le circuit de paiement existant.
Un élève dont le solde est intégralement réglé disparaît du tableau ; son historique reste
conservé en base. Les frais jamais générés lors d'une inscription ne peuvent pas apparaître
comme impayés : ce module ne crée pas de frais rétroactivement.

## Droits et installation

- `FINANCE_VIEW` : consultation du tableau et de l'historique.
- `FINANCE_MANAGE` : enregistrement d'une démarche.
- `PAYMENT_CREATE` : accès à l'encaissement.

La migration Flyway `V57__collection_actions.sql` ajoute l'historique, ses contraintes et
la protection par établissement. Reconstruire et déployer le backend et le frontend ;
Flyway applique la migration au démarrage du backend. Aucune configuration de messagerie
supplémentaire n'est nécessaire.
