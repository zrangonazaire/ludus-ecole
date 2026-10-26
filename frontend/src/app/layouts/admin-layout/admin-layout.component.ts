import {
  ChangeDetectionStrategy, Component, DestroyRef, HostListener, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import { WebSocketService } from '@core/websocket/websocket.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { GuidedTourService } from '@core/services/guided-tour.service';
import { I18nService } from '@core/services/i18n.service';
import { STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentSummary } from '@core/models/domain.models';
import { GuidedTourComponent } from '@shared/ui/guided-tour/guided-tour.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { PERMISSIONS, ROLES } from '@core/models/auth.models';
import { environment } from '@env/environment';

export interface NavItem {
  label: string;
  route: string;
  queryParams?: Record<string, string>;
  icon: string;
  permissions?: string[];
  section: string;
  /** Displayed in "Essentiel" (grand public daily mode) when true. */
  essential?: boolean;
  /** Keywords for the global command search. */
  keywords?: string;
  /** Signals unfinished setup; hidden once everything is done. */
  badge?: () => string | null;
  ready?: boolean;
}

export interface QuickAction {
  label: string;
  subtitle: string;
  route: string;
  queryParams?: Record<string, string>;
  icon: string;
  tone: 'blue' | 'green' | 'amber' | 'purple' | 'teal' | 'rose';
  permission?: string;
}

/**
 * Administration shell (section 56) — Full navigation with all routes & features visible.
 */
@Component({
  selector: 'eduops-admin-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AvatarComponent,
    GuidedTourComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly setupStatus = inject(SetupStatusService);
  private readonly tour = inject(GuidedTourService);
  private readonly studentSource = inject(STUDENT_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly ws = inject(WebSocketService);
  readonly i18n = inject(I18nService);
  readonly setupBadge = this.setupStatus.badge;
  readonly setupIncomplete = this.setupStatus.incomplete;
  readonly setupState = this.setupStatus.status;

  readonly user = this.auth.currentUser;
  readonly schoolName = environment.schoolName;
  readonly drawerOpen = signal(false);

  /**
   * Navigation mode: defaults to 'full' so ALL links and features are visible
   * immediately without hiding anything behind a toggle.
   */
  private static readonly NAV_MODE_KEY = 'eduops.nav.mode.v2';
  readonly navMode = signal<'essential' | 'full'>(this.readNavMode());

  /** Global search & command palette state. */
  readonly searchTerm = signal('');
  readonly searchFocused = signal(false);
  readonly studentResults = signal<StudentSummary[]>([]);
  readonly searchingStudents = signal(false);
  private readonly searchQuery$ = new Subject<string>();

  /** Topbar popovers. */
  readonly quickActionsOpen = signal(false);
  readonly notificationsOpen = signal(false);
  readonly portalMenuOpen = signal(false);

  readonly canSeeSystemConfig = computed(() => this.auth.has(PERMISSIONS.SCHOOL_VIEW));
  readonly isAdmin = computed(() =>
    this.auth.hasRole(ROLES.SCHOOL_ADMIN) || this.auth.hasRole(ROLES.SUPER_ADMIN)
  );

  readonly quickActions: readonly QuickAction[] = [
    {
      label: 'Inscrire un élève',
      subtitle: 'Nouveau dossier, réinscription ou affectation classe',
      route: '/enrollments/new',
      icon: '🎓',
      tone: 'blue',
      permission: PERMISSIONS.ENROLLMENT_CREATE
    },
    {
      label: 'Importer des élèves (Excel)',
      subtitle: 'Import en lot dans une classe avec frais du niveau automatiques',
      route: '/enrollments/new',
      queryParams: { mode: 'IMPORT' },
      icon: '📥',
      tone: 'teal',
      permission: PERMISSIONS.ENROLLMENT_CREATE
    },
    {
      label: 'Encaisser & Brouillard de caisse',
      subtitle: 'Paiement, sortie de caisse, reçu PDF & WhatsApp',
      route: '/payments',
      queryParams: { action: 'collect' },
      icon: '💳',
      tone: 'green',
      permission: PERMISSIONS.PAYMENT_CREATE
    },
    {
      label: 'Impayés & Relances WhatsApp',
      subtitle: 'Liste des retards et relance WhatsApp en 1 clic',
      route: '/outstanding',
      icon: '💬',
      tone: 'amber',
      permission: PERMISSIONS.FINANCE_VIEW
    },
    {
      label: 'Cartes scolaires (Badges QR)',
      subtitle: 'Impression en lot de cartes élèves avec QR Code',
      route: '/student-files',
      queryParams: { type: 'STUDENT_CARD', bulk: 'true' },
      icon: '🪪',
      tone: 'purple',
      permission: PERMISSIONS.DOCUMENT_VIEW
    },
    {
      label: 'Faire l’appel du jour',
      subtitle: 'Saisir les présences et absences d’une classe',
      route: '/attendance',
      icon: '📋',
      tone: 'amber',
      permission: PERMISSIONS.ATTENDANCE_VIEW
    },
    {
      label: 'Cahier de textes & Devoirs',
      subtitle: 'Publier et suivre les devoirs du soir (Enseignant / Parent / Élève)',
      route: '/teacher/home',
      icon: '📖',
      tone: 'purple'
    },
    {
      label: 'Contacter les familles',
      subtitle: 'Annonces, messages et relances ciblées',
      route: '/notifications',
      icon: '✉️',
      tone: 'rose'
    }
  ];

  readonly visibleQuickActions = computed(() =>
    this.quickActions.filter((a) => !a.permission || this.auth.has(a.permission))
  );

  private readonly allItems: NavItem[] = [
    // ─────────────────────────────────────────────────────── Pilotage
    { section: 'Pilotage', label: 'Vue d’ensemble', route: '/dashboard', icon: '⌂',
      permissions: [PERMISSIONS.DASHBOARD_VIEW], essential: true, ready: true,
      keywords: 'accueil tableau de bord direction kpi statistiques' },
    { section: 'Pilotage', label: 'Guide & Démarrage', route: '/setup', icon: '◎',
      badge: () => this.setupBadge(), essential: true, ready: true,
      keywords: 'configuration assistant etapes demarrage onboarding' },
    { section: 'Pilotage', label: 'Alertes du jour', route: '/alerts', icon: '⚡',
      permissions: [PERMISSIONS.ALERT_VIEW], essential: true, ready: true,
      keywords: 'alertes urgences retards classes pleines' },
    { section: 'Pilotage', label: 'Rapports & Statistiques', route: '/reports', icon: '▤',
      permissions: [PERMISSIONS.REPORT_VIEW], essential: true, ready: true,
      keywords: 'rapports bilans export statistiques' },

    // ─────────────────────────────────────────────────────── Scolarité
    { section: 'Scolarité', label: 'Tableau de bord Scolarité', route: '/scolarite-dashboard', icon: '◈',
      permissions: [PERMISSIONS.STUDENT_VIEW], essential: false, ready: true,
      keywords: 'tableau de bord scolarite statistiques eleves' },
    { section: 'Scolarité', label: 'Dossiers élèves', route: '/students', icon: '👤',
      permissions: [PERMISSIONS.STUDENT_VIEW], essential: true, ready: true,
      keywords: 'eleves etudiants dossiers matricule fiches export excel' },
    { section: 'Scolarité', label: 'Inscriptions', route: '/enrollments', icon: '✓',
      permissions: [PERMISSIONS.ENROLLMENT_VIEW], essential: true, ready: true,
      keywords: 'inscriptions reinscriptions affectation classe' },
    { section: 'Scolarité', label: 'Import Excel (Classe & Frais)', route: '/enrollments/new',
      queryParams: { mode: 'IMPORT' }, icon: '📥',
      permissions: [PERMISSIONS.ENROLLMENT_CREATE, PERMISSIONS.IMPORT_EXECUTE], essential: true, ready: true,
      keywords: 'import excel csv classe frais niveau etudiants masse' },
    { section: 'Scolarité', label: 'Import de listes & Historique', route: '/imports', icon: '⇪',
      permissions: [PERMISSIONS.IMPORT_EXECUTE, PERMISSIONS.STUDENT_VIEW], essential: false, ready: true,
      keywords: 'import excel csv listes historique lots' },
    { section: 'Scolarité', label: 'Documents & Certificats', route: '/student-files', icon: '📄',
      permissions: [PERMISSIONS.DOCUMENT_VIEW], essential: true, ready: true,
      keywords: 'documents officiels certificats scolarite attestations' },
    { section: 'Scolarité', label: 'Cartes scolaires (Badges QR)', route: '/student-files',
      queryParams: { type: 'STUDENT_CARD', bulk: 'true' }, icon: '🪪',
      permissions: [PERMISSIONS.DOCUMENT_VIEW], essential: true, ready: true,
      keywords: 'cartes scolaires badges qr code identite impression lot' },
    { section: 'Scolarité', label: 'Certificats & Attestations', route: '/certificates', icon: '📜',
      permissions: [PERMISSIONS.DOCUMENT_VIEW, PERMISSIONS.STUDENT_VIEW], essential: false, ready: true,
      keywords: 'certificats attestations frequentation scolarite' },
    { section: 'Scolarité', label: 'Modèles de documents', route: '/documents', icon: '🗂',
      permissions: [PERMISSIONS.DOCUMENT_VIEW, PERMISSIONS.STUDENT_VIEW], essential: false, ready: true,
      keywords: 'documents modeles archives' },
    { section: 'Scolarité', label: 'Admissions', route: '/admissions', icon: '✦',
      permissions: [PERMISSIONS.ADMISSION_VIEW], essential: false, ready: true,
      keywords: 'admissions candidatures nouveaux dossiers' },
    { section: 'Scolarité', label: 'Inscriptions pédagogiques', route: '/pedagogical-enrollments', icon: '🧩',
      permissions: [PERMISSIONS.ENROLLMENT_VIEW], essential: false, ready: true,
      keywords: 'inscriptions pedagogiques matieres groupes' },
    { section: 'Scolarité', label: 'Options & Langues', route: '/options', icon: '🌐',
      permissions: [PERMISSIONS.ENROLLMENT_VIEW], essential: false, ready: true,
      keywords: 'options langues lv2 specialites' },
    { section: 'Scolarité', label: 'Passage & Réinscription', route: '/promotions', icon: '↻',
      permissions: [PERMISSIONS.PROMOTION_DECIDE, PERMISSIONS.ENROLLMENT_CREATE], essential: false, ready: true,
      keywords: 'promotions passage redoublement fin annee' },
    { section: 'Scolarité', label: 'Transferts & Départs', route: '/transfers', icon: '⇄',
      permissions: [PERMISSIONS.ENROLLMENT_VIEW], essential: false, ready: true,
      keywords: 'transferts departs radiation exeat' },
    { section: 'Scolarité', label: 'Responsables légaux', route: '/guardians', icon: '👪',
      permissions: [PERMISSIONS.STUDENT_VIEW], essential: false, ready: true,
      keywords: 'parents tuteurs responsables familles' },
    { section: 'Scolarité', label: 'Santé & Infirmerie', route: '/health', icon: '✚',
      permissions: [PERMISSIONS.HEALTH_ALERT_VIEW], essential: false, ready: true,
      keywords: 'sante infirmerie allergies medical' },
    { section: 'Scolarité', label: 'Demandes des familles', route: '/requests', icon: '📬',
      permissions: [PERMISSIONS.DOCUMENT_VIEW], essential: false, ready: true,
      keywords: 'demandes familles guichet attestations' },

    // ────────────────────────────────────────────────────── Pédagogie
    { section: 'Pédagogie', label: 'Tableau de bord Pédagogie', route: '/pedagogy-dashboard', icon: '◈',
      permissions: [PERMISSIONS.CLASS_VIEW], essential: false, ready: true,
      keywords: 'tableau de bord pedagogie classes notes' },
    { section: 'Pédagogie', label: 'Classes & Effectifs', route: '/classes', icon: '▦',
      permissions: [PERMISSIONS.CLASS_VIEW], essential: true, ready: true,
      keywords: 'classes salles groupes capacite effectifs' },
    { section: 'Pédagogie', label: 'Matières & Programme', route: '/subjects', icon: '📚',
      permissions: [PERMISSIONS.SUBJECT_VIEW, PERMISSIONS.CLASS_VIEW], essential: false, ready: true,
      keywords: 'matieres coefficients programme disciplines' },
    { section: 'Pédagogie', label: 'Emploi du temps', route: '/timetable', icon: '📅',
      permissions: [PERMISSIONS.TIMETABLE_VIEW], essential: true, ready: true,
      keywords: 'emploi du temps planning horaires cours' },
    { section: 'Pédagogie', label: 'Présences & Appel', route: '/attendance', icon: '📋',
      permissions: [PERMISSIONS.ATTENDANCE_VIEW], essential: true, ready: true,
      keywords: 'presences absences retards appel' },
    { section: 'Pédagogie', label: 'Évaluations', route: '/assessments', icon: '✍️',
      permissions: [PERMISSIONS.ASSESSMENT_VIEW], essential: true, ready: true,
      keywords: 'evaluations devoirs compositions controles' },
    { section: 'Pédagogie', label: 'Saisie des Notes', route: '/grades', icon: '◉',
      permissions: [PERMISSIONS.GRADE_VIEW, PERMISSIONS.ASSESSMENT_VIEW], essential: true, ready: true,
      keywords: 'notes saisie correction moyennes' },
    { section: 'Pédagogie', label: 'Bulletins scolaires', route: '/report-cards', icon: '🎓',
      permissions: [PERMISSIONS.REPORT_CARD_VIEW], essential: true, ready: true,
      keywords: 'bulletins moyennes trimestres semestres rangs' },
    { section: 'Pédagogie', label: 'Cahier de textes & Devoirs', route: '/teacher/home', icon: '📖',
      essential: true, ready: true,
      keywords: 'cahier de textes devoirs maison soir enseignant' },
    { section: 'Pédagogie', label: 'Conseils de classe', route: '/councils', icon: '🏛',
      permissions: [PERMISSIONS.COUNCIL_VIEW, PERMISSIONS.CLASS_VIEW], essential: false, ready: true,
      keywords: 'conseils de classe appreciations decisions' },
    { section: 'Pédagogie', label: 'Vie scolaire & Discipline', route: '/discipline', icon: '⚠',
      permissions: ['DISCIPLINE_VIEW', PERMISSIONS.CLASS_VIEW], essential: false, ready: true,
      keywords: 'discipline incidents sanctions conseils' },

    // ──────────────────────────────────────────────────────── Finance
    { section: 'Finance', label: 'Tableau de bord Financier', route: '/finance-dashboard', icon: '◈',
      permissions: [PERMISSIONS.FINANCE_VIEW], essential: false, ready: true,
      keywords: 'tableau de bord financier recouvrement tresorerie' },
    { section: 'Finance', label: 'Encaissements, Brouillard & Reçus', route: '/payments', icon: '💳',
      permissions: [PERMISSIONS.PAYMENT_VIEW], essential: true, ready: true,
      keywords: 'paiements encaissements recus brouillard depenses whatsapp' },
    { section: 'Finance', label: 'Impayés & Relances WhatsApp', route: '/outstanding', icon: '💬',
      permissions: [PERMISSIONS.FINANCE_VIEW], essential: true, ready: true,
      keywords: 'impayes retards relances whatsapp recouvrement soldes' },
    { section: 'Finance', label: 'Tarifs & Facturation', route: '/finance', icon: '🏷',
      permissions: [PERMISSIONS.FINANCE_VIEW], essential: true, ready: true,
      keywords: 'frais tarifs scolarite echeanciers niveaux' },
    { section: 'Finance', label: 'Caisse & Sessions', route: '/cash', icon: '🏦',
      permissions: [PERMISSIONS.CASH_SESSION_MANAGE], essential: true, ready: true,
      keywords: 'caisse ouverture cloture especes guichet' },
    { section: 'Finance', label: 'Remises & Bourses', route: '/discounts', icon: '🎁',
      permissions: [PERMISSIONS.DISCOUNT_REQUEST_VIEW, PERMISSIONS.DISCOUNT_REQUEST_MANAGE], essential: false, ready: true,
      keywords: 'remises bourses reductions exoneration' },
    { section: 'Finance', label: 'Paramètres financiers', route: '/finance-config', icon: '⚙',
      permissions: [PERMISSIONS.FINANCE_MANAGE], essential: false, ready: true,
      keywords: 'parametres financiers caisses modes paiement' },

    // ───────────────────────────────────────────── Personnel & Accès
    { section: 'Personnel et accès', label: 'Tableau de bord Personnel', route: '/personnel-dashboard', icon: '◈',
      permissions: [PERMISSIONS.USER_MANAGE, PERMISSIONS.ROLE_MANAGE, PERMISSIONS.AUDIT_VIEW, PERMISSIONS.TEACHER_VIEW], essential: false, ready: true,
      keywords: 'tableau de bord personnel rh enseignants' },
    { section: 'Personnel et accès', label: 'Enseignants', route: '/teachers', icon: '👩‍🏫',
      permissions: [PERMISSIONS.TEACHER_VIEW], essential: true, ready: true,
      keywords: 'enseignants professeurs corps enseignant' },
    { section: 'Personnel et accès', label: 'Affectations enseignants', route: '/teacher-assignments', icon: '🔗',
      permissions: [PERMISSIONS.TEACHER_MANAGE], essential: false, ready: true,
      keywords: 'affectations professeurs classes matieres' },
    { section: 'Personnel et accès', label: 'Utilisateurs & Équipe', route: '/users', icon: '👥',
      permissions: [PERMISSIONS.USER_MANAGE], essential: false, ready: true,
      keywords: 'utilisateurs comptes personnel equipe' },
    { section: 'Personnel et accès', label: 'Profils d’accès', route: '/access-profiles', icon: '🔐',
      permissions: [PERMISSIONS.ROLE_MANAGE], essential: false, ready: true,
      keywords: 'profils acces roles permissions droits' },
    { section: 'Personnel et accès', label: 'Journal d’audit', route: '/audit', icon: '🛡',
      permissions: [PERMISSIONS.AUDIT_VIEW], essential: false, ready: true,
      keywords: 'audit securite historique traces' },

    // ───────────────────────────────────────────── Communication & Portails
    { section: 'Communication', label: 'Tableau de bord Communication', route: '/communication-dashboard', icon: '◈',
      essential: false, ready: true,
      keywords: 'tableau de bord communication messages' },
    { section: 'Communication', label: 'Messages & Annonces', route: '/notifications', icon: '✉',
      essential: true, ready: true,
      keywords: 'messages notifications annonces sms email whatsapp communication' },
    { section: 'Communication', label: 'Portail des familles (Accès)', route: '/portals', icon: '🌐',
      permissions: [PERMISSIONS.SCHOOL_VIEW], essential: false, ready: true,
      keywords: 'portail familles parents eleves acces' },
    { section: 'Communication', label: 'Portail Enseignant (Devoirs & Appel)', route: '/teacher/home', icon: '✎',
      essential: false, ready: true,
      keywords: 'portail enseignant professeur appel notes devoirs' },
    { section: 'Communication', label: 'Portail Parent (Suivi & Devoirs)', route: '/parent/academics', icon: '♡',
      essential: false, ready: true,
      keywords: 'portail parent famille suivi notes devoirs paiements' },
    { section: 'Communication', label: 'Portail Élève (Cours & Devoirs)', route: '/student/home', icon: '✦',
      essential: false, ready: true,
      keywords: 'portail eleve emploi du temps devoirs resultats' },

    // ───────────────────────────────────────────── Établissement
    { section: 'Établissement', label: 'Tableau de bord Établissement', route: '/establishment-dashboard', icon: '◈',
      permissions: [PERMISSIONS.SCHOOL_VIEW, PERMISSIONS.ACADEMIC_YEAR_VIEW, PERMISSIONS.LEVEL_VIEW, PERMISSIONS.CAMPUS_VIEW, PERMISSIONS.ROOM_VIEW], essential: false, ready: true,
      keywords: 'tableau de bord etablissement structure' },
    { section: 'Établissement', label: 'Années & Périodes', route: '/academic-years', icon: '🗓',
      permissions: [PERMISSIONS.ACADEMIC_YEAR_VIEW], essential: false, ready: true,
      keywords: 'annees scolaires trimestres semestres periodes' },
    { section: 'Établissement', label: 'Cycles & Niveaux', route: '/levels', icon: '🪜',
      permissions: [PERMISSIONS.LEVEL_VIEW], essential: false, ready: true,
      keywords: 'cycles niveaux primaire college lycee' },
    { section: 'Établissement', label: 'Fournitures scolaires', route: '/supplies', icon: '🎒',
      permissions: [PERMISSIONS.LEVEL_VIEW], essential: false, ready: true,
      keywords: 'fournitures listes manuels' },
    { section: 'Établissement', label: 'Sites & Campus', route: '/campus', icon: '📍',
      permissions: [PERMISSIONS.CAMPUS_VIEW], essential: false, ready: true,
      keywords: 'campus sites implantations' },
    { section: 'Établissement', label: 'Bâtiments & Salles', route: '/rooms', icon: '🏢',
      permissions: [PERMISSIONS.ROOM_VIEW], essential: false, ready: true,
      keywords: 'batiments salles locaux capacites campus' },
    { section: 'Établissement', label: 'Paramètres de l’école', route: '/administration', icon: '🏛',
      permissions: [PERMISSIONS.SCHOOL_VIEW], essential: false, ready: true,
      keywords: 'parametres ecole identite logo matricules' },
    { section: 'Établissement', label: 'Configuration système (Langue)', route: '/system-config', icon: '⚙',
      permissions: [PERMISSIONS.SCHOOL_VIEW], essential: true, ready: true,
      keywords: 'configuration systeme langue anglais francais apparence couleurs' }
  ];

  private static readonly COLLAPSE_KEY = 'eduops.nav.collapsed';
  readonly collapsed = signal<string[]>(this.readCollapsed());

  private readNavMode(): 'essential' | 'full' {
    try {
      const saved = localStorage.getItem(AdminLayoutComponent.NAV_MODE_KEY);
      return saved === 'essential' ? 'essential' : 'full';
    } catch {
      return 'full';
    }
  }

  setNavMode(mode: 'essential' | 'full'): void {
    this.navMode.set(mode);
    try {
      localStorage.setItem(AdminLayoutComponent.NAV_MODE_KEY, mode);
    } catch {
      // Ignore storage error in private browsing
    }
  }

  private readCollapsed(): string[] {
    try {
      const raw = localStorage.getItem(AdminLayoutComponent.COLLAPSE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  }

  isCollapsed(section: string): boolean {
    return this.collapsed().includes(section);
  }

  toggleSection(section: string): void {
    this.collapsed.update((list) => {
      const next = list.includes(section)
        ? list.filter((s) => s !== section)
        : [...list, section];
      try {
        localStorage.setItem(AdminLayoutComponent.COLLAPSE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage error
      }
      return next;
    });
  }

  /** Permitted items regardless of mode (used for counts and search). */
  readonly permittedItems = computed(() =>
    this.allItems.filter((item) => !item.permissions || this.auth.hasAny(...item.permissions))
  );

  readonly totalModuleCount = computed(() => this.permittedItems().length);
  readonly essentialModuleCount = computed(() =>
    this.permittedItems().filter((i) => i.essential).length
  );

  /** Grouped navigation items for the sidebar based on current mode. */
  readonly navigation = computed(() => {
    const mode = this.navMode();
    const visible = this.permittedItems().filter(
      (item) => mode === 'full' || item.essential
    );
    const grouped = new Map<string, NavItem[]>();
    visible.forEach((item) => {
      const list = grouped.get(item.section) ?? [];
      list.push(item);
      grouped.set(item.section, list);
    });
    return Array.from(grouped, ([section, items]) => ({ section, items }));
  });

  /** Matching navigation screens for the global search bar. */
  readonly matchingScreens = computed(() => {
    const q = this.normalize(this.searchTerm());
    if (!q) {
      return this.permittedItems().filter((i) => i.essential).slice(0, 8);
    }
    return this.permittedItems()
      .filter((item) => {
        const haystack = this.normalize(`${item.label} ${item.section} ${item.keywords ?? ''}`);
        return haystack.includes(q);
      })
      .slice(0, 10);
  });

  /** Matching quick actions for the global search bar. */
  readonly matchingActions = computed(() => {
    const q = this.normalize(this.searchTerm());
    if (!q) {
      return this.visibleQuickActions().slice(0, 6);
    }
    return this.visibleQuickActions().filter((a) =>
      this.normalize(`${a.label} ${a.subtitle}`).includes(q)
    );
  });

  ngOnInit(): void {
    this.setupStatus.refresh();
    this.tour.start(this.tour.dashboardTour);

    // Live student search in the global command bar
    this.searchQuery$
      .pipe(
        debounceTime(220),
        distinctUntilChanged(),
        switchMap((term) => {
          const trimmed = term.trim();
          if (trimmed.length < 2 || !this.auth.has(PERMISSIONS.STUDENT_VIEW)) {
            this.searchingStudents.set(false);
            return of([]);
          }
          this.searchingStudents.set(true);
          return this.studentSource.search({ page: 0, size: 5, search: trimmed }).pipe(
            catchError(() => of({ content: [] as StudentSummary[] })),
            switchMap((res) => of(res.content))
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((students) => {
        this.studentResults.set(students);
        this.searchingStudents.set(false);
      });
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      const input = document.getElementById('global-search') as HTMLInputElement | null;
      input?.focus();
      this.searchFocused.set(true);
      this.closePopovers();
    } else if (event.key === 'Escape') {
      this.searchFocused.set(false);
      this.closePopovers();
    }
  }

  onSearchInput(value: string): void {
    this.searchTerm.set(value);
    this.searchFocused.set(true);
    this.searchQuery$.next(value);
  }

  onSearchFocus(): void {
    this.closePopovers();
    this.searchFocused.set(true);
  }

  closeSearch(): void {
    this.searchFocused.set(false);
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.studentResults.set([]);
    this.searchFocused.set(false);
  }

  navigateTo(route: string, queryParams?: Record<string, string>): void {
    this.clearSearch();
    this.closePopovers();
    this.closeDrawer();
    void this.router.navigate([route], queryParams ? { queryParams } : undefined);
  }

  toggleQuickActions(): void {
    const next = !this.quickActionsOpen();
    this.closePopovers();
    this.searchFocused.set(false);
    this.quickActionsOpen.set(next);
  }

  toggleNotifications(): void {
    const next = !this.notificationsOpen();
    this.closePopovers();
    this.searchFocused.set(false);
    this.notificationsOpen.set(next);
  }

  togglePortalMenu(): void {
    const next = !this.portalMenuOpen();
    this.closePopovers();
    this.searchFocused.set(false);
    this.portalMenuOpen.set(next);
  }

  closePopovers(): void {
    this.quickActionsOpen.set(false);
    this.notificationsOpen.set(false);
    this.portalMenuOpen.set(false);
  }

  replayTour(): void {
    this.closeDrawer();
    this.closePopovers();
    this.tour.start(this.tour.dashboardTour, true);
  }

  toggleDrawer(): void {
    this.drawerOpen.update((open) => !open);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  logout(): void {
    this.closePopovers();
    this.auth.logout();
  }

  roleLabel(role?: string): string {
    switch (role) {
      case 'SUPER_ADMIN': return 'Super Administrateur';
      case 'SCHOOL_ADMIN': return 'Direction / Admin';
      case 'SECRETARY': return 'Secrétariat';
      case 'ACCOUNTANT':
      case 'CASHIER': return 'Comptabilité & Caisse';
      case 'TEACHER': return 'Enseignant';
      default: return role ?? 'Équipe';
    }
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
