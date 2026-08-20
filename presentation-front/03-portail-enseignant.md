# Portail enseignant

Le portail enseignant est **mobile-first** : en-tête (logo, titre « Espace enseignant »,
notifications, avatar) + contenu + **barre d'onglets en bas** (`mobile-layout`).
Onglets : **Accueil**, **Classes**, **Presences**, **Notes**, **Profil**.
Accessible aux rôles `TEACHER`, `SUPER_ADMIN`, `SCHOOL_ADMIN` (guard de rôle).

---

## 1. Accueil enseignant

- **Route** : `/teacher/home`
- **Composant** : `features/teacher-portal/teacher-home.component.ts`
- **État** : ✅ Implémenté
- **Permission** : `PORTAL_TEACHER`

**Description** : Page d'accueil personnalisée.
- Salutation « Bonjour, [prénom] » et date du jour.
- **Actions rapides** : « Faire l'appel » → `/teacher/attendance`,
  « Saisir des notes » → `/teacher/grades`.
- **Mes classes** : liste des classes affectées à l'enseignant (fournies par le serveur
  selon le compte authentifié — un enseignant ne voit que ses classes), avec effectif,
  niveau et statut de capacité.

---

## 2. Mes classes

- **Route** : `/teacher/classes`
- **Composant** : `features/teacher-portal/teacher-classes.component.ts`
- **État** : ✅ Implémenté
- **Permission** : `PORTAL_TEACHER`

**Description** : Liste des classes de l'enseignant ; en tapant une classe, on ouvre la
**liste des élèves** de cette classe (avatar, nom, matricule) avec un bouton retour
« ‹ Toutes mes classes ». État vide si aucune classe n'est affectée.

---

## 3. Prise d'appel (Présences)

- **Route** : `/teacher/attendance`
- **Composant** : `features/teacher-portal/teacher-attendance.component.ts`
- **État** : ✅ Implémenté
- **Permission** : `ATTENDANCE_CREATE`

**Description** : Écran de saisie de présence, pensé pour être rapide depuis un téléphone.

**Flux** : choisir une **classe** → ouvrir la **feuille du jour** → marquer chaque élève →
valider → le serveur valide et enregistre.

**Fonctionnalités** :
- Bouton « **Tous présents** » pour pré-remplir (point de départ habituel de l'appel).
- Marquer chaque élève : **Présent / Absent / Retard / Absence excusée / Retard excusé**
  (le retard enregistre automatiquement l'heure d'arrivée).
- **Compteurs en direct** : présents, absents, retards, total.
- **Soumission avec clé d'idempotence** : un double envoi ou une relecture hors-ligne ne
  peut jamais enregistrer deux fois la feuille. Rien n'est définitif avant confirmation
  du serveur.
- **Toast de confirmation** : « Feuille enregistrée : X présents, Y absents, Z retards.
  Les parents concernés seront notifiés. »

---

## 4. Saisie des notes

- **Route** : `/teacher/grades`
- **Composant** : `features/placeholder/placeholder.component.ts`
- **État** : ⛔ Placeholder
- **Permission** : `GRADE_CREATE`

**Description** : Écran à construire ; le placeholder indique qu'il consommera
`POST /api/v1/teacher/grades`. Prévu pour : saisie guidée avec contrôle du barème,
accès limité aux classes réellement affectées.

---

## 5. Mon profil

- **Route** : `/teacher/profile`
- **Composant** : `features/placeholder/placeholder.component.ts`
- **État** : ⛔ Placeholder

**Description** : Écran à construire ; consommera `GET /api/v1/auth/me` pour afficher
les informations du compte de l'enseignant.
