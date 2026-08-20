# Portail élève

Le portail élève est **mobile-first** : en-tête (logo, « Espace eleve », notifications,
avatar) + contenu + **barre d'onglets en bas** (`mobile-layout`).
Onglets : **Accueil**, **Emploi**, **Notes**, **Bulletins**, **Profil**.
Accessible aux rôles `STUDENT`, `SUPER_ADMIN`, `SCHOOL_ADMIN` (guard de rôle).

> **Règle** : le portail élève est **en lecture seule** — un élève ne modifie jamais de
> données officielles (notes, présences, scolarité). Tous les écrans consomment des
> données serveur et ne proposent aucune action d'écriture.

---

## 1. Accueil élève

- **Route** : `/student/home`
- **Composant** : `features/placeholder/placeholder.component.ts`
- **État** : ⛔ Placeholder

**Description** : Écran à construire ; consommera `GET /api/v1/student/dashboard`
(synthèse de la scolarité : classe, prochains cours, dernières notes, annonces).

---

## 2. Emploi du temps

- **Route** : `/student/timetable`
- **Composant** : `features/placeholder/placeholder.component.ts`
- **État** : ⛔ Placeholder

**Description** : Écran à construire ; consommera `GET /api/v1/student/timetable`
(emploi du temps de la classe de l'élève).

---

## 3. Mes notes

- **Route** : `/student/grades`
- **Composant** : `features/placeholder/placeholder.component.ts`
- **État** : ⛔ Placeholder

**Description** : Écran à construire ; consommera `GET /api/v1/student/grades`
(notes par matière, moyennes).

---

## 4. Mes bulletins

- **Route** : `/student/report-cards`
- **Composant** : `features/placeholder/placeholder.component.ts`
- **État** : ⛔ Placeholder

**Description** : Écran à construire ; consommera `GET /api/v1/student/report-cards`
(bulletins publiés, consultables dès leur publication).

---

## 5. Mes absences

- **Route** : `/student/attendance`
- **Composant** : `features/placeholder/placeholder.component.ts`
- **État** : ⛔ Placeholder

**Description** : Écran à construire ; consommera `GET /api/v1/student/attendance`
(absences, retards, justification).

---

## 6. Mon profil

- **Route** : `/student/profile`
- **Composant** : `features/placeholder/placeholder.component.ts`
- **État** : ⛔ Placeholder

**Description** : Écran à construire ; consommera `GET /api/v1/auth/me` pour afficher
les informations du compte de l'élève.
