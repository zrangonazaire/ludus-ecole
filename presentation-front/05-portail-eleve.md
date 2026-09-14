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
- **Composant** : `features/student-portal/student-home.component.ts`
- **État** : ✅ Implémenté

**Description** : Consomme `GET /api/v1/student/dashboard` et présente la synthèse
de la scolarité : classe, prochains cours, dernières notes et annonces.

---

## 2. Emploi du temps

- **Route** : `/student/timetable`
- **Composant** : `features/student-portal/student-timetable.component.ts`
- **État** : ✅ Implémenté

**Description** : Consomme `GET /api/v1/student/timetable` et présente la semaine de la
classe de l'élève, jour par jour (matière, enseignant, salle). Lecture seule.

---

## 3. Mes notes

- **Route** : `/student/grades`
- **Composant** : `features/student-portal/student-grades.component.ts`
- **État** : ✅ Implémenté

**Description** : Consomme `GET /api/v1/student/grades` et présente les notes publiées
par matière, la moyenne de la période, et le détail de chaque note.

---

## 4. Mes bulletins

- **Route** : `/student/report-cards`
- **Composant** : `features/student-portal/student-report-cards.component.ts`
- **État** : ✅ Implémenté

**Description** : Consomme `GET /api/v1/student/report-cards` et liste les bulletins
publiés, consultables dès leur remise aux familles (moyenne, rang, détail par matière).

---

## 5. Mes absences

- **Route** : `/student/attendance`
- **Composant** : `features/student-portal/student-attendance.component.ts`
- **État** : ✅ Implémenté

**Description** : Consomme `GET /api/v1/student/attendance` et présente le taux de
présence, le nombre d'absences non justifiées, et le relevé récent (absences, retards).

---

## 6. Mon profil

- **Route** : `/student/profile`
- **Composant** : `features/student-portal/student-profile.component.ts`
- **État** : ✅ Implémenté

**Description** : Consomme `GET /api/v1/auth/me` et affiche les informations du compte
de l'élève (identité, classe, coordonnées). Lecture seule.
