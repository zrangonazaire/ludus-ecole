# Écrans d'administration (Espace direction / scolarité / finance)

Tous les écrans d'administration sont rendus dans le **layout admin** :
une **topbar fixe de 64 px**, une **sidebar de 248 px** et une zone de contenu.
Sur tablette/mobile, la sidebar devient un **tiroir (off-canvas)** avec un voile (scrim) —
une vraie mise en page différente, pas un simple rétrécissement.

La topbar contient : menu burger, logo, **recherche globale**, indicateur **temps réel**
(WebSocket), icône notifications et **bloc utilisateur** (avatar, nom, rôle, déconnexion).
La sidebar affiche la navigation **filtrée par permissions**, groupée par sections :
**Pilotage**, **Scolarité**, **Pédagogie**, **Finance**, **Administration**.

---

## 1. Tableau de bord (Dashboard)

- **Route** : `/dashboard`
- **Composant** : `features/dashboard/dashboard.component.ts`
- **État** : ✅ Implémenté
- **Permission** : `DASHBOARD_VIEW`

**Description** : Le tableau de pilotage de l'établissement. Toutes les données viennent
du backend et l'écran se **rafraîchit en direct** à la réception d'événements temps réel
(nouvelle inscription, appel, absence, paiement, alerte) — pas besoin de recharger la page.

**Contenu** :
- **En-tête** : titre, année scolaire, campus, trimestre courant, date du jour ;
  boutons « Actualiser » et « Nouvelle inscription ».
- **Grille de KPI** : indicateurs clés (effectifs, présence, moyennes, encaissements…).
- **Graphiques** : Effectifs par niveau (barres), Présence/absence (ligne),
  Performance académique (aire), Encaissements réalisé/attendu par mois (barres).
- **Widgets** : Dernières inscriptions, Absences du jour, Derniers paiements,
  Alertes importantes, Évaluations à venir, Classes à surveiller (occupation).
- Note de **dernière actualisation** (heure).
- États **chargement** / **erreur** (avec bouton réessayer).

---

## 2. Élèves — Liste

- **Route** : `/students`
- **Composant** : `features/students/student-list.component.ts`
- **État** : ✅ Implémenté
- **Permission** : `STUDENT_VIEW`

**Description** : Liste paginée des élèves avec **recherche** (débounce serveur),
**filtre par statut** et **pagination**. Tableau (composant `data-table`) avec colonnes :
Élève (avatar + nom), Matricule, Classe, Niveau, Âge, Statut.
Cliquer sur une ligne ouvre la fiche élève.

---

## 3. Élèves — Fiche détaillée

- **Route** : `/students/:id`
- **Composant** : `features/students/student-detail.component.ts`
- **État** : ✅ Implémenté
- **Permission** : `STUDENT_VIEW`

**Description** : La fiche d'un élève, qui répond en un écran aux questions : qui est cet
élève, sa classe, ses responsables, ses présences, ses notes, ce qui reste dû.

**Contenu** :
- **En-tête profil** : avatar, nom, matricule, classe, niveau, âge, badges de statut
  (statut élève + statut financier), actions (Retour, Certificat de scolarité, Modifier).
- **Onglets** :
  - **Identité & responsables** : état civil, établissement précédent, liste des
    responsables légaux.
  - **Scolarité** : parcours scolaire (historique inscriptions/notes/bulletins).
  - **Présences** : taux de présence, absences, absences non justifiées, retards.
  - **Situation financière** : total dû, payé, reste à payer, prochaine échéance +
    **échéancier** détaillé (libellé, dû, payé, reste, échéance, statut).

---

## 4. Inscriptions — Liste

- **Route** : `/enrollments`
- **Composant** : `features/enrollments/enrollment-list.component.ts`
- **État** : ✅ Implémenté
- **Permission** : `ENROLLMENT_VIEW`

**Description** : Registre des inscriptions de l'année active. Tableau : N° d'inscription,
Élève, Matricule, Classe, Date, Type (Nouvelle / Reinscription / Transfert),
Statut (avec badge **Dérogation** si l'inscription dépasse la capacité).
Recherche et pagination, boutons « Exporter » et « Nouvelle inscription »
(bouton créé visible selon la permission `ENROLLMENT_CREATE`).

---

## 5. Inscriptions — Assistant (Wizard)

- **Route** : `/enrollments/new`
- **Composant** : `features/enrollments/enrollment-wizard.component.ts`
- **État** : ✅ Implémenté
- **Permission** : `ENROLLMENT_CREATE`

**Description** : Assistant d'inscription en **3 étapes** :
1. **Élève** : recherche par texte (≥ 2 caractères) et choix d'un candidat.
2. **Classe** : choix parmi les classes disponibles.
3. **Pré-vérification serveur** (`GET /enrollments/check`) : affiche tous les blocages à la
   fois (classe pleine, inscription déjà existante, fenêtre fermée). Si le seul blocage est
   le **dépassement de capacité**, un responsable autorisé peut demander une **dérogation**
   (avec motif obligatoire ≥ 10 caractères). Confirmation puis création.

**Sécurité** : la soumission porte une **clé d'idempotence** (UUID) pour qu'un double
clic ne crée jamais deux inscriptions. Un toast confirme la réussite.

---

## 6. Classes — Vue d'ensemble

- **Route** : `/classes`
- **Composant** : `features/classes/class-list.component.ts`
- **État** : ✅ Implémenté
- **Permission** : `CLASS_VIEW`

**Description** : Liste des classes avec **capacité** (places restantes calculées par le
backend, jamais saisies à la main). Chaque classe affiche un **gauge d'occupation** dont la
couleur suit le statut de capacité (succès / avertissement / danger) et un badge de statut.

---

## 7. Enseignants — Liste

- **Route** : `/teachers`
- **Composant** : `features/teachers/teacher-list.component.ts`
- **État** : ✅ Implémenté
- **Permission** : `TEACHER_VIEW`

**Description** : Liste paginée des enseignants (avatar + nom + email, matricule employé,
spécialité, nombre de classes, téléphone, statut) avec recherche et pagination.
Bouton « Nouvel enseignant ».

---

## 8. Paiements — Registre

- **Route** : `/payments`
- **Composant** : `features/payments/payment-list.component.ts`
- **État** : 🟡 Partiel (liste complète ; l'annulation est simulée en attendant l'API)
- **Permission** : `PAYMENT_VIEW`

**Description** : Registre des paiements : Date, Reçu, Élève, Matricule, Montant (formaté),
Mode de paiement, Statut, actions (Reçu, Annuler). Recherche et pagination,
boutons « Exporter » et « Encaisser un paiement ».

**Annulation** : ouvre une **boîte de dialogue de confirmation** qui exige un **motif**
obligatoire ; le message explique que les affectations seront contre-passées et le reçu
marqué annulé (rien n'est supprimé). La permission `PAYMENT_CANCEL` contrôle le bouton.

---

## 9. Écrans en attente (placeholders)

Routes existantes (la navigation est complète) mais dont l'interface reste à construire.
Chacun affiche un **placeholder** qui documente l'endpoint API qu'il consommera
(`features/placeholder/placeholder.component.ts`) :

| Route            | Titre              | Endpoint attendu                     | Permission |
|------------------|--------------------|--------------------------------------|------------|
| `/admissions`    | Admissions         | `GET /api/v1/admissions`             | ADMISSION_VIEW |
| `/guardians`     | Responsables légaux| `GET /api/v1/guardians`              | GUARDIAN_VIEW |
| `/subjects`      | Matières           | `GET /api/v1/subjects`               | SUBJECT_VIEW |
| `/timetable`     | Emploi du temps    | `GET /api/v1/timetables`             | TIMETABLE_VIEW |
| `/attendance`    | Présences          | `GET /api/v1/attendance`             | ATTENDANCE_VIEW |
| `/assessments`   | Évaluations        | `GET /api/v1/assessments`            | ASSESSMENT_VIEW |
| `/grades`        | Notes              | `GET /api/v1/grades`                 | GRADE_VIEW |
| `/report-cards`  | Bulletins          | `GET /api/v1/report-cards`           | REPORT_CARD_VIEW |
| `/discipline`    | Discipline         | `GET /api/v1/discipline/incidents`   | DISCIPLINE_VIEW |
| `/finance`       | Frais scolaires    | `GET /api/v1/fees`                   | FINANCE_VIEW |
| `/reports`       | Rapports           | `GET /api/v1/reports`                | REPORT_VIEW |
| `/administration`| Paramètres         | `GET /api/v1/school`                 | SCHOOL_VIEW |

> Note : le parcours d'inscription d'établissement renvoie vers `/onboarding`, dont
> la route/écran n'est pas encore déclaré dans la table de routage principale.

