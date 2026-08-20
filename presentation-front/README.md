# EduOps — Dossier de présentation de l'application (Frontend)

Ce dossier décrit l'ensemble des **écrans de l'application front** `EduOps` (gestion scolaire).
Chaque écran est présenté avec : son **URL / route**, le **composant** qui le rend,
les **permissions** requises, ce que l'utilisateur y **voit et fait**, et son **état**
(implémenté, partiel ou en placeholder).

---

## 1. Vue d'ensemble

EduOps est une application de gestion scolaire qui regroupe en un seul produit
l'**administration**, la **pédagogie** et la **finance** d'un établissement. Elle expose
**quatre espaces distincts**, chacun avec une ergonomie adaptée à son public :

| Espace            | URL racine   | Public cible                                  | Type de layout          |
|-------------------|--------------|-----------------------------------------------|-------------------------|
| Public            | `/`           | Visiteurs, futurs établissements              | Landing page            |
| Authentification  | `/login`      | Tous les utilisateurs                         | Écran plein écran       |
| Administration    | `/` + `/…`    | Direction, scolarité, comptabilité            | Topbar + sidebar (desktop) |
| Portail enseignant| `/teacher`    | Enseignants                                   | Mobile-first, tab bar   |
| Portail parent    | `/parent`     | Parents / responsables légaux                 | Mobile-first, tab bar   |
| Portail élève     | `/student`    | Élèves (lecture seule)                        | Mobile-first, tab bar   |

### Navigation et redirection par rôle

À la connexion, l'utilisateur est redirigé vers la page d'accueil de son **rôle principal**
(`auth.service.ts → homeRoute()`) :

- `TEACHER` → `/teacher/home`
- `PARENT` → `/parent/home`
- `STUDENT` → `/student/home`
- tout autre rôle (admin, direction, comptable…) → `/dashboard`

### Rôles gérés (13)

`SUPER_ADMIN`, `SCHOOL_ADMIN`, `DIRECTOR`, `ACADEMIC_MANAGER`, `REGISTRAR`, `TEACHER`,
`ACCOUNTANT`, `CASHIER`, `DISCIPLINE_MANAGER`, `SECRETARY`, `PARENT`, `STUDENT`, `VIEWER`.

Chaque rôle dispose d'un ensemble fin de **permissions** (une soixantaine) qui pilotent
le menu visible et l'accès aux routes. Le backend re-vérifie toujours chaque droit
(les guards côté front sont une commodité UX, pas une sécurité).

### Structure du code

```
frontend/src/app/
├── app.routes.ts          → table de routage principale
├── app.config.ts          → providers (router, http, datasources, PWA)
├── core/                  → auth, guards, interceptors, datasources, services, websocket
├── features/              → les écrans, regroupés par domaine
│   ├── auth/              → login, forbidden
│   ├── landing/           → page d'accueil publique
│   ├── signup/            → création d'établissement public
│   ├── dashboard/         → tableau de bord direction
│   ├── students/          → liste + fiche élève
│   ├── enrollments/       → liste + assistant d'inscription
│   ├── classes/           → liste des classes
│   ├── teachers/          → liste des enseignants
│   ├── payments/          → registre des paiements
│   ├── placeholder/       → écrans en attente d'implémentation
│   ├── teacher-portal/    → espace enseignant
│   ├── parent-portal/     → espace parent
│   └── student-portal/    → espace élève
├── layouts/               → admin-layout (desktop) et mobile-layout (onglets)
└── shared/                → UI réutilisable (table, badges, cartes, pipes…)
```

---

## 2. Sommaire des documents

| Fichier | Contenu |
|---------|---------|
| `01-ecrans-access-et-authentification.md` | Landing, inscription d'établissement, connexion, accès refusé |
| `02-ecrans-administration.md`             | Layout admin, tableau de bord, élèves, inscriptions, classes, enseignants, paiements, écrans en attente |
| `03-portail-enseignant.md`                | Accueil enseignant, mes classes, prise d'appel, notes, profil |
| `04-portail-parent.md`                    | Accueil parent, enfants, scolarité, paiements, notifications, profil |
| `05-portail-eleve.md`                     | Accueil élève, emploi du temps, notes, bulletins, absences, profil |
| `06-composants-partages-et-conventions.md`| Brique UI réutilisable, états, thème, conventions |

## 3. Légende d'état des écrans

- ✅ **Implémenté** — composant complet, alimenté par une source de données.
- 🟡 **Partiel** — fonctionnel mais certaines actions sont simulées/en attente de l'API.
- ⛔ **Placeholder** — la route et la navigation existent, mais l'écran affiche un
  placeholder qui documente l'endpoint API qu'il consommera.
