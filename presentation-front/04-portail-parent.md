# Portail parent

Le portail parent est **mobile-first** : en-tête (logo, « Espace parent », notifications,
avatar) + contenu + **barre d'onglets en bas** (`mobile-layout`).
Onglets : **Accueil**, **Enfants**, **Scolarite**, **Paiements**, **Profil**.
Accessible aux rôles `PARENT`, `SUPER_ADMIN`, `SCHOOL_ADMIN` (guard de rôle).

---

## 1. Accueil parent

- **Route** : `/parent/home`
- **Composant** : `features/parent-portal/parent-home.component.ts`
- **État** : 🟡 Partiel (utilise des données mock pour l'instant)
- **Permission** : `PORTAL_PARENT`

**Description** : Page d'accueil qui présente les **enfants** de l'utilisateur (le serveur
ne renvoie que les élèves réellement rattachés au compte du parent).

Pour chaque enfant :
- **En-tête** : avatar, nom, classe, matricule, badge de statut.
- **Statistiques** : présence du jour, taux de présence, moyenne récente, solde scolaire.
- **Alerte** si un solde est dû : montant restant + prochaine date d'échéance (encart orange).
- État vide si aucun élève n'est associé au compte (contact secrétariat).

---

## 2. Enfants

- **Route** : `/parent/children`
- **Composant** : `features/placeholder/placeholder.component.ts`
- **État** : ⛔ Placeholder

**Description** : Écran à construire ; consommera `GET /api/v1/parent/children` pour
lister les enfants du parent.

---

## 3. Scolarité

- **Route** : `/parent/academics`
- **Composant** : `features/placeholder/placeholder.component.ts`
- **État** : ⛔ Placeholder

**Description** : Écran à construire ; consommera
`GET /api/v1/parent/children/{id}/grades` (notes, évaluations, bulletins des enfants).

---

## 4. Paiements

- **Route** : `/parent/payments`
- **Composant** : `features/placeholder/placeholder.component.ts`
- **État** : ⛔ Placeholder

**Description** : Écran à construire ; consommera
`GET /api/v1/parent/children/{id}/financial-summary` (solde, échéancier, reçus).

---

## 5. Notifications

- **Route** : `/parent/notifications`
- **Composant** : `features/placeholder/placeholder.component.ts`
- **État** : ⛔ Placeholder

**Description** : Écran à construire ; consommera `GET /api/v1/parent/notifications`
(absences, retards, bulletins publiés, échéances).

---

## 6. Mon profil

- **Route** : `/parent/profile`
- **Composant** : `features/placeholder/placeholder.component.ts`
- **État** : ⛔ Placeholder

**Description** : Écran à construire ; consommera `GET /api/v1/auth/me` pour afficher
les informations du compte du parent.
