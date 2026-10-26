import { Injectable, computed, signal } from '@angular/core';

export type SupportedLang = 'fr' | 'en';

const STORAGE_KEY = 'eduops.appearance.global';
const LOCALE_STORAGE_KEY = 'eduops.locale';

/**
 * Exact phrase dictionary (French -> English) with normalized straight apostrophes.
 */
const RAW_DICTIONARY: Readonly<Record<string, string>> = {
  // ─── Navigation & Shell ───
  'Pilotage': 'Overview',
  'Scolarité': 'Students & Admissions',
  'Scolarité & Élèves': 'Students & Admissions',
  'Pédagogie & Vie scolaire': 'Academics & School Life',
  'Pédagogie': 'Academics',
  'Vie scolaire': 'Student Life',
  'Finance & Caisse': 'Finance & Cashier',
  'Finance': 'Finance',
  'Personnel et accès': 'Staff & Access',
  'Communication': 'Communication',
  'Établissement': 'School Setup',
  'Administration': 'Administration',
  'Vue d\'ensemble': 'Overview',
  'Guide & Démarrage': 'Setup Guide',
  'Alertes du jour': 'Daily Alerts',
  'Rapports & Statistiques': 'Reports & Analytics',
  'Tableau de bord Scolarité': 'Students Dashboard',
  'Dossiers élèves': 'Student Records',
  'Annuaire élèves': 'Student Directory',
  'Élèves': 'Students',
  'Inscriptions': 'Enrollments',
  'Import Excel (Classe & Frais)': 'Excel Import (Class & Fees)',
  'Import de listes & Historique': 'Batch Imports & History',
  'Documents & Certificats': 'Documents & Certificates',
  'Cartes scolaires (Badges QR)': 'Student ID Cards (QR Badges)',
  'Certificats & Attestations': 'Certificates & Attestations',
  'Modèles de documents': 'Document Templates',
  'Documents élèves': 'Student Documents',
  'Admissions': 'Admissions',
  'Inscriptions pédagogiques': 'Course Enrollments',
  'Options & Langues': 'Options & Languages',
  'Passage & Réinscription': 'Promotions & Re-enrollment',
  'Transferts & Départs': 'Transfers & Departures',
  'Mouvements': 'Transfers & Departures',
  'Responsables légaux': 'Legal Guardians',
  'Santé & Infirmerie': 'Health & Infirmary',
  'Demandes des familles': 'Family Requests',
  'Import Excel': 'Excel Import',
  'Tableau de bord Pédagogie': 'Academics Dashboard',
  'Classes & Effectifs': 'Classes & Capacity',
  'Classes & Niveaux': 'Classes & Grade Levels',
  'Classes': 'Classes',
  'Emploi du temps': 'Timetable',
  'Présences & Appel': 'Attendance & Roll Call',
  'Appel & Absences': 'Attendance & Absences',
  'Présences': 'Attendance',
  'Notes & Évaluations': 'Grades & Assessments',
  'Évaluations': 'Assessments',
  'Saisie des Notes': 'Grade Entry',
  'Bulletins scolaires': 'Report Cards',
  'Bulletins': 'Report Cards',
  'Cahier de textes & Devoirs': 'Homework & Classbook',
  'Matières & Programme': 'Subjects & Curriculum',
  'Programme': 'Curriculum',
  'Options & Séries': 'Options & Tracks',
  'Conseils de classe': 'Class Councils',
  'Vie scolaire & Discipline': 'Student Life & Discipline',
  'Discipline': 'Discipline',
  'Infirmerie': 'Infirmary',
  'Tableau de bord Financier': 'Finance Dashboard',
  'Encaissements, Brouillard & Reçus': 'Payments, Cashbook & Receipts',
  'Encaissements & Reçus': 'Payments & Receipts',
  'Caisse & Reçus': 'Cashier & Receipts',
  'Encaissements': 'Payments',
  'Impayés & Relances WhatsApp': 'Arrears & WhatsApp Reminders',
  'Impayés & Relances': 'Arrears & Reminders',
  'Impayés': 'Overdue Arrears',
  'Tarifs & Facturation': 'Fees & Billing',
  'Frais & Tarifs': 'Fees & Tuition',
  'Frais': 'Fees',
  'Caisse & Sessions': 'Cashier & Sessions',
  'Caisse du jour': 'Daily Cash Session',
  'Remises & Bourses': 'Discounts & Scholarships',
  'Trésorerie & Remises': 'Treasury & Discounts',
  'Paramètres financiers': 'Financial Settings',
  'Tableau de bord Personnel': 'Staff Dashboard',
  'Tableau de bord Communication': 'Communication Dashboard',
  'Messages & Annonces': 'Messages & Announcements',
  'Portail des familles (Accès)': 'Family Portal (Access)',
  'Portail Enseignant (Devoirs & Appel)': 'Teacher Portal (Homework & Attendance)',
  'Portail Parent (Suivi & Devoirs)': 'Parent Portal (Follow-up & Homework)',
  'Portail Élève (Cours & Devoirs)': 'Student Portal (Courses & Homework)',
  'Tableau de bord Établissement': 'School Setup Dashboard',
  'Bâtiments & Salles': 'Buildings & Rooms',
  'Paramètres de l\'école': 'School Settings',
  'Configuration système (Langue)': 'System Configuration (Language)',
  'Annonces & SMS': 'Announcements & SMS',
  'Enseignants': 'Teachers',
  'Affectations enseignants': 'Teacher Assignments',
  'Années & Périodes': 'Academic Years & Terms',
  'Cycles & Niveaux': 'Cycles & Grade Levels',
  'Campus & Salles': 'Campuses & Rooms',
  'Sites & Campus': 'Sites & Campuses',
  'Salles': 'Rooms',
  'Fournitures scolaires': 'School Supplies',
  'Fournitures': 'Supplies',
  'Portail des familles': 'Family Portal',
  'Utilisateurs & Équipe': 'Users & Staff',
  'Utilisateurs': 'Users',
  'Profils d\'accès': 'Access Profiles',
  'Journal d\'audit': 'Audit Log',
  'Tableau de bord': 'Dashboard',
  'Portails': 'Portals',
  'Rapports': 'Reports',
  'Imports': 'Data Imports',
  'Configuration': 'Setup Checklist',
  'Paramètres': 'Settings',
  'Configuration système': 'System Configuration',
  'Essentiel': 'Essential',
  'Mode Essentiel': 'Essential Mode',
  'Complet (34)': 'All (34)',
  'Tous les modules': 'All Modules',
  'Tous les modules (34)': 'All Modules (34)',
  'Navigation principale': 'Main Navigation',
  'Rechercher un élève, une classe ou une action (Ctrl+K)...': 'Search a student, class, or action (Ctrl+K)...',
  'Action rapide': 'Quick Action',
  '+ Action rapide': '+ Quick Action',
  'Actions rapides': 'Quick Actions',
  'Que souhaitez-vous faire ?': 'What would you like to do?',
  'Accédez directement aux opérations du quotidien': 'Jump directly to daily school operations',
  'Inscrire un élève': 'Enroll a Student',
  'Nouveau dossier, réinscription ou import Excel': 'New student, re-enrollment, or Excel import',
  'Encaisser un paiement': 'Collect a Payment',
  'Espèces, Mobile Money, virement et reçu immédiat': 'Cash, Mobile Money, bank transfer & instant receipt',
  'Faire l\'appel du jour': 'Take Daily Attendance',
  'Saisir les présences et absences d\'une classe': 'Record class attendance and absences',
  'Saisir ou valider des notes': 'Enter or Validate Grades',
  'Évaluations, feuilles de notes et moyennes': 'Assessments, grade sheets, and averages',
  'Délivrer un document officiel': 'Issue an Official Document',
  'Certificat de scolarité, carte élève, attestation': 'Enrollment certificate, student ID card, attestation',
  'Contacter les familles': 'Contact Families',
  'Annonces, messages et relances ciblées': 'Targeted announcements, messages, and reminders',
  'Changer de portail': 'Switch Portal',
  'Changer d\'espace': 'Switch Workspace',
  'Prévisualisez l\'expérience de chaque membre de l\'école': 'Preview the portal for each school role',
  'Administration & Direction': 'Administration & Leadership',
  'Pilotage complet de l\'établissement': 'Full school management cockpit',
  'Portail Administration': 'Administration Portal',
  'Portail Enseignant': 'Teacher Portal',
  'Appel en classe, cahier de notes et planning': 'Class roll call, gradebook, and schedule',
  'Portail Parent': 'Parent Portal',
  'Suivi des enfants, bulletins et paiements': 'Children follow-up, report cards, and payments',
  'Portail Élève': 'Student Portal',
  'Emploi du temps, notes et résultats': 'Timetable, grades, and results',
  'Se déconnecter': 'Sign Out',
  'Déconnexion': 'Sign Out',
  'Fermer (Échap)': 'Close (Esc)',

  // ─── System Config & Administration ───
  'Identité, apparence et circuit de validation de l\'établissement.': 'School identity, appearance, and discount approval workflow.',
  'Vérifier ma configuration': 'Check Setup Status',
  'Identité': 'Identity',
  'Paramétrage de l\'établissement': 'School settings & numbering',
  'Apparence et région': 'Appearance & Region',
  'Affichage de ce navigateur': 'Browser display & language',
  'Circuit de validation': 'Approval Workflow',
  'Réductions de scolarité': 'Tuition discounts',
  'Couleur du portail, taille de police, devise, langue et fuseau horaire : appliqués immédiatement sur ce navigateur, réversibles à tout moment. Les paramètres officiels de l\'établissement restent dans « Paramètres ».':
    'Portal color, font size, currency, language, and timezone: applied immediately in this browser and reversible anytime. Official school settings remain in "Identity".',
  'Aperçu couleur': 'Color Preview',
  'Portail de l\'établissement': 'School Management Portal',
  'Couleur principale': 'Primary Color',
  'Taille de police': 'Font Size',
  'Compacte': 'Compact',
  'Normale': 'Normal',
  'Large': 'Large',
  'Devise (3 lettres)': 'Currency (3 letters)',
  'Devise (3 lettres) *': 'Currency (3 letters) *',
  'Langue': 'Language',
  'Langue *': 'Language *',
  'Fuseau horaire': 'Timezone',
  'Fuseau horaire *': 'Timezone *',
  'Réinitialiser': 'Reset',
  'Enregistrer l\'apparence': 'Save Appearance',
  'Enregistrer': 'Save',
  'Enregistrement…': 'Saving…',
  'Enregistrement...': 'Saving...',
  'Annuler les modifications': 'Discard Changes',
  'Identité, coordonnées et réglages qui s\'appliquent à tout l\'établissement.': 'Identity, contact details, and global settings for the entire school.',
  'Code': 'Code',
  'Statut': 'Status',
  'Le code et le statut identifient l\'établissement dans les documents officiels et dans la numérotation : ils ne se modifient pas ici.':
    'The school code and status identify your institution on official documents and numbering sequences.',
  'Nom de l\'établissement *': 'School Name *',
  'Raison sociale': 'Legal Name',
  'Devise': 'Motto / Currency',
  'Numéro d\'enregistrement': 'Registration Number',
  'Coordonnées': 'Contact Information',
  'E-mail': 'Email',
  'Téléphone': 'Phone',
  'Site web': 'Website',
  'Adresse': 'Address',
  'Complément d\'adresse': 'Address Line 2',
  'Ville': 'City',
  'Pays *': 'Country *',
  'Préférences': 'Preferences',
  'La devise et l\'échelle de notation se répercutent sur tout ce qui est émis ensuite : reçus, moyennes, bulletins. Ce qui est déjà imprimé ne bouge pas.':
    'Currency and grading scale apply to all newly issued receipts, averages, and report cards. Previously printed documents remain unchanged.',
  'Note maximale (échelle) *': 'Maximum Grade (Scale) *',
  'Afficher le classement des élèves dans les bulletins': 'Display student rank on report cards',
  'Génération des matricules & Séquence d\'attribution': 'Student ID Numbering & Sequence',
  'Matricule Élève': 'Student ID Format',
  'Format du matricule élève *': 'Student ID Pattern *',
  'Variables disponibles :': 'Available variables:',
  'Aperçu en direct': 'Live Preview',
  'Réinitialisation annuelle': 'Annual Reset',
  'Numérotation continue': 'Continuous Numbering',
  'Prochain matricule attribué :': 'Next Assigned ID:',
  'Matricule suivant :': 'Following ID:',
  'Configuration de la séquence d\'attribution': 'Sequence Counter Configuration',
  'Politique de réinitialisation *': 'Reset Policy *',
  'Annuelle': 'Annual',
  'Remise à zéro chaque nouvelle année': 'Resets to start value every new school year',
  'Continue': 'Continuous',
  'Numérotation continue sans remise à zéro': 'Keeps incrementing across school years',
  'Prochain numéro à attribuer *': 'Next Sequence Number *',
  'Remettre à 1': 'Reset to 1',
  'Valeur de départ pour nouvelles années': 'Starting Number for New Years',
  'Autres gabarits de numérotation': 'Other Numbering Patterns',
  'Matricule enseignant': 'Teacher ID Pattern',
  'Matricule personnel': 'Staff ID Pattern',
  'Format des reçus *': 'Receipt Number Pattern *',
  'Format des factures *': 'Invoice Number Pattern *',

  // ─── Dashboard ───
  'Pôle Financier': 'Financial Hub',
  'Pôle Académique': 'Academic Hub',
  'Pôle Vie Scolaire': 'Student Life Hub',
  'Actions quotidiennes en 1 clic': '1-Click Daily Actions',
  'Pointer les absents et retards par classe': 'Mark absences and lateness by class',
  'Encaisser une scolarité': 'Record Tuition Payment',
  'Saisie rapide et reçu immédiat': 'Fast entry and instant receipt',
  'Relancer les impayés': 'Send Arrears Reminders',
  'WhatsApp, SMS ou e-mail en 1 clic': '1-click WhatsApp, SMS, or email',
  'Nouvelle inscription': 'New Enrollment',
  'Nouvel élève, réinscription ou import Excel': 'New student, re-enrollment, or Excel import',
  'Élèves actifs': 'Active Students',
  'Inscriptions actives': 'Active Enrollments',
  'Classes ouvertes': 'Active Classes',
  'Encaissements du mois': 'Monthly Collections',
  'Taux de recouvrement': 'Collection Rate',
  'Reste à recouvrer': 'Outstanding Balance',
  'Derniers encaissements': 'Recent Payments',
  'Dernières inscriptions': 'Recent Enrollments',
  'Évaluations à venir': 'Upcoming Assessments',
  'Voir tout': 'View All',
  'Actualiser': 'Refresh',

  // ─── Students, Enrollments & Excel Import ───
  'Annuaire des élèves': 'Student Directory',
  'Exporter Excel': 'Export Excel',
  '⬇ Exporter Excel': '⬇ Export Excel',
  'Importer Excel / CSV': 'Import Excel / CSV',
  '⬆ Importer Excel / CSV': '⬆ Import Excel / CSV',
  'Cartes scolaires (QR)': 'Student ID Cards (QR)',
  '🪪 Cartes scolaires (QR)': '🪪 Student ID Cards (QR)',
  '+ Inscrire un élève': '+ Enroll Student',
  'Inscrire un nouvel élève': 'Enroll a New Student',
  'Réinscrire un élève': 'Re-enroll a Student',
  'Importer une liste d\'élèves': 'Import Student List',
  'Importer une liste d\'élèves (Excel)': 'Import Student List (Excel)',
  'Comment souhaitez-vous procéder ?': 'How would you like to proceed?',
  'Retour à la liste': 'Back to List',
  'Changer de méthode': 'Change Method',
  'Nouvel élève': 'New Student',
  'Réinscription': 'Re-enrollment',
  'Identité de l\'élève': 'Student Identity',
  'Responsable légal': 'Legal Guardian',
  'Affecter à une classe': 'Assign to a Classroom',
  'Contrôles serveur et validation': 'Server Checks & Confirmation',
  'Modèle & Classe': 'Template & Class',
  'Dépôt': 'Upload',
  'Vérification': 'Verification',
  'Vérification & Frais': 'Verification & Fees',
  'Import': 'Import',
  '1. Classe d\'affectation & Modèle Excel': '1. Target Classroom & Excel Template',
  '2. Déposer le fichier rempli': '2. Upload Completed Spreadsheet',
  'Vérification avant import & Frais du niveau': 'Pre-Import Verification & Grade Level Fees',
  'Classe cible par défaut (recommandé si vous importez le fichier d\'une classe)':
    'Default Target Classroom (recommended when importing a single class file)',
  'Utiliser uniquement la colonne « Classe » du fichier Excel':
    'Use only the "Classe" column from the Excel file',
  'Télécharger le modèle Excel': 'Download Excel Template',
  'J\'ai déjà mon fichier Excel': 'I Already Have My Excel File',
  'J\'ai déjà le modèle': 'I Already Have the Template',
  'Glissez votre fichier ici': 'Drag and drop your file here',
  'Choisir un fichier': 'Choose a File',
  'Formats acceptés : .xlsx, .xls, .csv': 'Accepted formats: .xlsx, .xls, .csv',
  'Classe & Frais du niveau': 'Class & Grade Fees',
  'État': 'Status',
  'Détail': 'Details',
  'prêtes': 'ready',
  'à vérifier': 'warnings',
  'doublons': 'duplicates',
  'erreurs': 'errors',
  'Prêt': 'Ready',
  'À vérifier': 'Check',
  'Doublon': 'Duplicate',
  'Erreur': 'Error',
  'Import terminé': 'Import Complete',
  'Voir les élèves': 'View Students',
  'Aller à la caisse': 'Go to Cashier',
  'Voir les inscriptions': 'View Enrollments',
  'Déposer un autre fichier': 'Upload Another File',

  // ─── Payments, Cashbook & Arrears ───
  'Caisse et encaissements': 'Cashier & Payments',
  'Nouvel encaissement': 'New Payment',
  'Brouillard de caisse': 'Daily Cashbook',
  'Total Entrées (Encaissements)': 'Total Cash In (Receipts)',
  'Sorties / Dépenses du jour': 'Daily Cash Out / Expenses',
  'Solde net en caisse': 'Net Cash Balance',
  'Nouvelle sortie de caisse': 'New Cash Expense',
  '+ Sortie de caisse': '+ Cash Expense',
  'Imprimer PV de caisse': 'Print Cashbook Report',
  'Impayés et relances': 'Overdue Arrears & Reminders',
  'Relancer sur WhatsApp': 'Remind via WhatsApp',
  'Partager le reçu sur WhatsApp': 'Share Receipt via WhatsApp',
  'Imprimer le reçu': 'Print Receipt',
  'Espèces': 'Cash',
  'Mobile Money': 'Mobile Money',
  'Virement': 'Bank Transfer',
  'Carte': 'Card',
  'Chèque': 'Check',

  // ─── Student Files & ID Cards ───
  'Impression Cartes Scolaires (Lot QR)': 'Print Student ID Cards (QR Batch)',
  '🪪 Impression Cartes Scolaires (Lot QR)': '🪪 Print Student ID Cards (QR Batch)',
  'Carte d\'identité scolaire': 'Student ID Card',
  'Certificat de scolarité': 'Enrollment Certificate',
  'Attestation de fréquentation': 'Attendance Certificate',
  'Fiche individuelle': 'Student Profile Sheet',

  // ─── Common Fields & Buttons ───
  'Nom': 'Last Name',
  'Prénom': 'First Name',
  'Prénoms': 'First Name(s)',
  'Sexe': 'Gender',
  'Féminin': 'Female',
  'Masculin': 'Male',
  'Date de naissance': 'Date of Birth',
  'Lieu de naissance': 'Place of Birth',
  'Nationalité': 'Nationality',
  'École précédente': 'Previous School',
  'Classe': 'Classroom',
  'Niveau': 'Grade Level',
  'Frais du niveau': 'Grade Level Fees',
  'Responsable': 'Guardian',
  'Lien de parenté': 'Relationship',
  'Mère': 'Mother',
  'Père': 'Father',
  'Tuteur': 'Guardian / Tutor',
  'Représentant légal': 'Legal Representative',
  'Continuer': 'Continue',
  'Retour': 'Back',
  'Précédent': 'Previous',
  'Suivant': 'Next',
  'Annuler': 'Cancel',
  'Confirmer': 'Confirm',
  'Valider': 'Validate',
  'Valider l\'inscription': 'Confirm Enrollment',
  'Supprimer': 'Delete',
  'Modifier': 'Edit',
  'Imprimer': 'Print',
  'Télécharger': 'Download',
  'Rechercher': 'Search',
  'Filtrer': 'Filter',
  'Toutes les classes': 'All Classes',
  'Tous les statuts': 'All Statuses',
  'Actif': 'Active',
  'Inactif': 'Inactive',
  'Validé': 'Validated',
  'En attente': 'Pending',
  'Payé': 'Paid',
  'Partiel': 'Partial',
  'En retard': 'Overdue',
  'Annulé': 'Cancelled',
  'Brouillon': 'Draft'
};

/**
 * Pattern replacements for composite / dynamic French phrases -> English.
 */
const PATTERN_RULES: ReadonlyArray<[RegExp, string]> = [
  [/^Étape\s+(\d+)\s+sur\s+(\d+)$/i, 'Step $1 of $2'],
  [/^(\d+)\s+élève\(s\)\s+créé\(s\)\s+et\s+inscrit\(s\)(.*)$/i, '$1 student(s) created and enrolled$2'],
  [/^Importer\s+(\d+)\s+élève\(s\)(\s+et\s+associer\s+les\s+frais)?$/i, 'Import $1 student(s) & assign fees'],
  [/^(\d+)\s+ligne\(s\)\s+affichée\(s\)$/i, '$1 row(s) displayed'],
  [/^(\d+)\s+ligne\(s\)(.*)$/i, '$1 row(s)$2'],
  [/^Lignes\s+(\d+)–(\d+)\s+sur\s+(\d+)\s+—\s+page\s+(\d+)\s+\/\s+(\d+)$/i, 'Rows $1–$2 of $3 — page $4 / $5'],
  [/^frais de niveau\s+\((\d+)\s+éch\.\)$/i, 'level fees ($1 inst.)'],
  [/^(\d+)\s+place\(s\)\s+restante\(s\)$/i, '$1 seat(s) remaining'],
  [/^Niveau\s+(.+)$/i, 'Grade $1'],
  [/^Classe cible\s*:\s*(.+)$/i, 'Target Class: $1'],
  [/^Frais du niveau associés\s*:\s*(.+)$/i, 'Associated Level Fees: $1'],
  [/^Dernier numéro attribué\s*:\s*(.+)$/i, 'Last assigned number: $1'],
  [/^Bonjour,\s*(.+)$/i, 'Welcome, $1']
];

function normalizeKey(str: string): string {
  return str.replace(/[\u2018\u2019]/g, "'");
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly locale = signal<string>(this.readInitialLocale());
  readonly lang = computed<SupportedLang>(() =>
    this.locale().toLowerCase().startsWith('en') ? 'en' : 'fr'
  );

  private observer: MutationObserver | null = null;
  private isMutating = false;
  private readonly originalText = new WeakMap<Text, string>();
  private readonly translatedText = new WeakMap<Text, string>();
  private readonly originalAttrs = new WeakMap<Element, Map<string, string>>();
  private readonly translatedAttrs = new WeakMap<Element, Map<string, string>>();

  constructor() {
    this.initObserver();
    this.applyLocaleToDocument(this.locale());
  }

  private readInitialLocale(): string {
    try {
      const explicit = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (explicit) return explicit;
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { locale?: string };
        if (parsed?.locale) return parsed.locale;
      }
    } catch {
      // ignore storage errors
    }
    return 'fr-CI';
  }

  setLocale(newLocale: string): void {
    const clean = (newLocale || 'fr-CI').trim();
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, clean);
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, locale: clean }));
    } catch {
      // ignore storage errors
    }
    this.locale.set(clean);
    this.applyLocaleToDocument(clean);
  }

  toggleLanguage(): void {
    const next = this.lang() === 'en' ? 'fr-CI' : 'en';
    this.setLocale(next);
  }

  translate(text: string): string {
    if (this.lang() !== 'en' || !text) {
      return text;
    }
    return this.translateStringToEnglish(text);
  }

  private applyLocaleToDocument(locale: string): void {
    if (typeof document === 'undefined') return;
    const isEn = locale.toLowerCase().startsWith('en');
    document.documentElement.lang = isEn ? 'en' : 'fr';
    document.documentElement.setAttribute('data-locale', locale);

    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => this.processSubtree(document.body));
    } else {
      this.processSubtree(document.body);
    }
  }

  private initObserver(): void {
    if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') {
      return;
    }
    const start = () => {
      if (!document.body || this.observer) return;
      this.observer = new MutationObserver((mutations) => {
        if (this.isMutating || this.lang() !== 'en') return;
        this.isMutating = true;
        try {
          for (const mutation of mutations) {
            if (mutation.type === 'characterData' && mutation.target.nodeType === Node.TEXT_NODE) {
              this.processTextNode(mutation.target as Text);
            } else if (mutation.type === 'childList') {
              mutation.addedNodes.forEach((node) => this.processSubtree(node));
            }
          }
        } finally {
          this.isMutating = false;
        }
      });
      this.observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
      if (this.lang() === 'en') {
        this.processSubtree(document.body);
      }
    };

    if (document.body) {
      start();
    } else {
      window.addEventListener('DOMContentLoaded', start, { once: true });
    }
  }

  private processSubtree(root: Node | null): void {
    if (!root) return;
    const isEn = this.lang() === 'en';
    this.isMutating = true;
    try {
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT
      );
      let current: Node | null = root;
      while (current) {
        if (current.nodeType === Node.TEXT_NODE) {
          if (isEn) {
            this.processTextNode(current as Text);
          } else {
            this.restoreTextNode(current as Text);
          }
        } else if (current.nodeType === Node.ELEMENT_NODE) {
          const el = current as Element;
          if (isEn) {
            this.processElementAttrs(el);
          } else {
            this.restoreElementAttrs(el);
          }
        }
        current = walker.nextNode();
      }
    } finally {
      this.isMutating = false;
    }
  }

  private shouldSkipNode(textNode: Text): boolean {
    const parent = textNode.parentElement;
    if (!parent) return true;
    const tag = parent.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'CODE') {
      return true;
    }
    if (parent.classList.contains('mono')) {
      return true;
    }
    return false;
  }

  private processTextNode(textNode: Text): void {
    if (this.shouldSkipNode(textNode)) return;
    const raw = textNode.nodeValue ?? '';
    if (!raw.trim()) return;

    if (this.translatedText.get(textNode) === raw) {
      return;
    }

    this.originalText.set(textNode, raw);
    const translated = this.translatePreservingWhitespace(raw);
    if (translated !== raw) {
      this.translatedText.set(textNode, translated);
      textNode.nodeValue = translated;
    }
  }

  private restoreTextNode(textNode: Text): void {
    const original = this.originalText.get(textNode);
    const lastTranslated = this.translatedText.get(textNode);
    if (original !== undefined && textNode.nodeValue === lastTranslated) {
      textNode.nodeValue = original;
    }
  }

  private processElementAttrs(el: Element): void {
    const attrs = ['placeholder', 'title', 'aria-label'];
    for (const attr of attrs) {
      const val = el.getAttribute(attr);
      if (!val || !val.trim()) continue;

      let transMap = this.translatedAttrs.get(el);
      if (transMap?.get(attr) === val) continue;

      let origMap = this.originalAttrs.get(el);
      if (!origMap) {
        origMap = new Map<string, string>();
        this.originalAttrs.set(el, origMap);
      }
      origMap.set(attr, val);

      const translated = this.translatePreservingWhitespace(val);
      if (translated !== val) {
        if (!transMap) {
          transMap = new Map<string, string>();
          this.translatedAttrs.set(el, transMap);
        }
        transMap.set(attr, translated);
        el.setAttribute(attr, translated);
      }
    }
  }

  private restoreElementAttrs(el: Element): void {
    const origMap = this.originalAttrs.get(el);
    const transMap = this.translatedAttrs.get(el);
    if (!origMap) return;
    origMap.forEach((origVal, attr) => {
      if (el.getAttribute(attr) === transMap?.get(attr)) {
        el.setAttribute(attr, origVal);
      }
    });
  }

  private translatePreservingWhitespace(raw: string): string {
    const leadingMatch = raw.match(/^\s*/);
    const trailingMatch = raw.match(/\s*$/);
    const leading = leadingMatch ? leadingMatch[0] : '';
    const trailing = trailingMatch ? trailingMatch[0] : '';
    const core = raw.trim().replace(/\s+/g, ' ');
    if (!core) return raw;

    const translatedCore = this.translateStringToEnglish(core);
    if (translatedCore === core) return raw;
    return `${leading}${translatedCore}${trailing}`;
  }

  private translateStringToEnglish(core: string): string {
    const normalized = normalizeKey(core);
    const direct = RAW_DICTIONARY[normalized];
    if (direct) return direct;

    for (const [pattern, replacement] of PATTERN_RULES) {
      if (pattern.test(normalized)) {
        return normalized.replace(pattern, replacement);
      }
    }
    return core;
  }
}
