import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { WebSocketService } from '@core/websocket/websocket.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { GuidedTourService } from '@core/services/guided-tour.service';
import { GuidedTourComponent } from '@shared/ui/guided-tour/guided-tour.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { PERMISSIONS } from '@core/models/auth.models';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  permissions?: string[];
  section: string;
  /** Signals unfinished setup; hidden once everything is done. */
  badge?: () => string | null;
  /**
   * Faux tant que l'écran n'est pas construit.
   *
   * <p>L'entrée reste visible et cliquable : masquer un module que le serveur
   * gère déjà donnerait l'impression qu'il n'existe pas. Elle est simplement
   * marquée, pour qu'on sache où l'on va avant de cliquer.</p>
   */
  ready?: boolean;
}

/**
 * Administration shell (section 56).
 *
 * Desktop: fixed 64px topbar + 248px sidebar + content.
 * Tablet/mobile: the sidebar becomes an off-canvas drawer - a genuinely
 * different layout, not a shrunken desktop (section 55).
 */
@Component({
  selector: 'eduops-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AvatarComponent,
    GuidedTourComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly setupStatus = inject(SetupStatusService);
  private readonly tour = inject(GuidedTourService);
  readonly ws = inject(WebSocketService);
  readonly setupBadge = this.setupStatus.badge;
  readonly setupIncomplete = this.setupStatus.incomplete;

  readonly user = this.auth.currentUser;
  readonly drawerOpen = signal(false);
  readonly searchTerm = signal('');

  private readonly allItems: NavItem[] = [
    // ─────────────────────────────────────────────────────── Pilotage
    { section: 'Pilotage', label: 'Tableau de bord', route: '/dashboard', icon: '▤',
      permissions: [PERMISSIONS.DASHBOARD_VIEW], ready: true },
    { section: 'Pilotage', label: 'Configuration', route: '/setup', icon: '◑',
      badge: () => this.setupBadge(), ready: true },
    { section: 'Pilotage', label: 'Rapports', route: '/reports', icon: '▧',
      permissions: [PERMISSIONS.REPORT_VIEW], ready: true },
    { section: 'Pilotage', label: 'Alertes', route: '/alerts', icon: '⚡',
      permissions: [PERMISSIONS.ALERT_VIEW], ready: true },

    // ─────────────────────────────────────────────────────── Scolarité
    // Le travail réel d'un secrétariat : constituer un dossier, l'inscrire,
    // le suivre, le clore. Chaque entrée correspond à un acte qui laisse
    // une trace administrative.
    { section: 'Scolarité', label: 'Élèves', route: '/students', icon: '◍',
      permissions: [PERMISSIONS.STUDENT_VIEW], ready: true },
    // Les pièces officielles produites par l'établissement : édition,
    // traçabilité, réimpression et révocation au même endroit.
    { section: 'Scolarité', label: 'Documents officiels', route: '/student-files', icon: '▤',
      permissions: [PERMISSIONS.DOCUMENT_VIEW] },
    { section: 'Scolarité', label: 'Admissions', route: '/admissions', icon: '◐',
      permissions: [PERMISSIONS.ADMISSION_VIEW], ready: true },
    { section: 'Scolarité', label: 'Inscriptions', route: '/enrollments', icon: '✓',
      permissions: [PERMISSIONS.ENROLLMENT_VIEW], ready: true },
    // Le choix des enseignements à option : LV2, latin, série au lycée.
    // Distinct de l'inscription, et souvent décidé plus tard.
    { section: 'Scolarité', label: 'Options et langues', route: '/options', icon: '◈',
      permissions: [PERMISSIONS.ENROLLMENT_VIEW], ready: true },
    // Fin d'année : qui passe, qui redouble, qui s'oriente ailleurs.
    { section: 'Scolarité', label: 'Passage et réinscription', route: '/promotions',
      icon: '↻', permissions: ['PROMOTION_DECIDE'] },
    // Mouvements en cours d'année : arrivée d'un autre établissement,
    // départ, radiation. C'est ce qui produit l'exeat et le certificat
    // de radiation que réclame l'école d'accueil.
    { section: 'Scolarité', label: 'Transferts et départs', route: '/transfers', icon: '⇄',
      permissions: [PERMISSIONS.ENROLLMENT_VIEW], ready: true },
    { section: 'Scolarité', label: 'Responsables légaux', route: '/guardians', icon: '◎',
      permissions: ['GUARDIAN_VIEW'] },
    // Visites médicales, allergies, traitements en cours. L'infirmerie a
    // besoin de l'information au moment où l'enfant se présente, pas d'un
    // classeur au secrétariat.
    { section: 'Scolarité', label: 'Santé scolaire', route: '/health', icon: '✚',
      permissions: [PERMISSIONS.HEALTH_ALERT_VIEW], ready: true },
    // Ce que les familles réclament, en file d'attente à traiter.
    { section: 'Scolarité', label: 'Demandes des familles', route: '/requests', icon: '◑',
      permissions: [PERMISSIONS.DOCUMENT_VIEW], ready: true },
    { section: 'Scolarité', label: 'Import de listes', route: '/imports', icon: '⇪',
      permissions: [PERMISSIONS.IMPORT_EXECUTE], ready: true },

    // ────────────────────────────────────────────────────── Pédagogie
    { section: 'Pédagogie', label: 'Classes', route: '/classes', icon: '▦',
      permissions: [PERMISSIONS.CLASS_VIEW], ready: true },
    { section: 'Pédagogie', label: 'Matières et programme', route: '/subjects', icon: '◈',
      permissions: ['SUBJECT_VIEW'], ready: true },
    { section: 'Pédagogie', label: 'Emploi du temps', route: '/timetable', icon: '▥',
      permissions: [PERMISSIONS.TIMETABLE_VIEW], ready: true },
    { section: 'Pédagogie', label: 'Présences', route: '/attendance', icon: '◇',
      permissions: [PERMISSIONS.ATTENDANCE_VIEW], ready: true },
    { section: 'Pédagogie', label: 'Évaluations', route: '/assessments', icon: '◆',
      permissions: [PERMISSIONS.ASSESSMENT_VIEW], ready: true },
    { section: 'Pédagogie', label: 'Notes', route: '/grades', icon: '◉',
      permissions: [PERMISSIONS.GRADE_VIEW], ready: true },
    { section: 'Pédagogie', label: 'Bulletins', route: '/report-cards', icon: '▣',
      permissions: [PERMISSIONS.REPORT_CARD_VIEW], ready: true },
    { section: 'Pédagogie', label: 'Conseils de classe', route: '/councils', icon: '◔',
      permissions: ['COUNCIL_VIEW'] },
    { section: 'Pédagogie', label: 'Discipline', route: '/discipline', icon: '⚠',
      permissions: ['DISCIPLINE_VIEW'], ready: true },

    // ──────────────────────────────────────────────────────── Finance
    { section: 'Finance', label: 'Frais de scolarité', route: '/finance', icon: '◫',
      permissions: [PERMISSIONS.FINANCE_VIEW], ready: true },
    { section: 'Finance', label: 'Paiements', route: '/payments', icon: '◧',
      permissions: [PERMISSIONS.PAYMENT_VIEW] },
    { section: 'Finance', label: 'Caisse', route: '/cash', icon: '◨',
      permissions: [PERMISSIONS.CASH_SESSION_MANAGE], ready: true },
    { section: 'Finance', label: 'Remises et bourses', route: '/discounts', icon: '◪',
      permissions: ['DISCOUNT_MANAGE', 'SCHOLARSHIP_MANAGE'] },
    { section: 'Finance', label: 'Impayés', route: '/outstanding', icon: '◰',
      permissions: [PERMISSIONS.FINANCE_VIEW], ready: true },

    // ───────────────────────────────────────────── Personnel et accès
    { section: 'Personnel et accès', label: 'Enseignants', route: '/teachers', icon: '◍',
      permissions: [PERMISSIONS.TEACHER_VIEW] },
    { section: 'Personnel et accès', label: 'Personnel', route: '/staff', icon: '◌',
      permissions: [PERMISSIONS.STAFF_VIEW], ready: true },
    { section: 'Personnel et accès', label: 'Profils d’accès', route: '/users', icon: '◒',
      permissions: [PERMISSIONS.ROLE_MANAGE], ready: true },
    { section: 'Personnel et accès', label: 'Journal d\'audit', route: '/audit', icon: '▨',
      permissions: [PERMISSIONS.AUDIT_VIEW], ready: true },

    // ─────────────────────────────────────────────────── Communication
    // Aucune permission : c'est ma boîte de réception, pas un écran
    // d'administration. L'exiger priverait de leurs propres messages les
    // parents et les élèves, à qui l'on ne donne évidemment aucun droit
    // d'administration — or ce sont eux les premiers destinataires.
    { section: 'Communication', label: 'Messages', route: '/notifications', icon: '✉',
      ready: true },
    { section: 'Communication', label: 'Portail des familles', route: '/portals', icon: '◉',
      permissions: ['SCHOOL_VIEW'] },

    // ─────────────────────────────────────────────────── Établissement
    { section: 'Établissement', label: 'Paramètres', route: '/administration', icon: '◌',
      permissions: ['SCHOOL_VIEW'] },
    { section: 'Établissement', label: 'Années et périodes', route: '/academic-years',
      icon: '◷', permissions: [PERMISSIONS.ACADEMIC_YEAR_VIEW], ready: true },
    { section: 'Établissement', label: 'Cycles et niveaux', route: '/levels', icon: '◱',
      permissions: [PERMISSIONS.LEVEL_VIEW], ready: true },
        { section: 'Établissement', label: 'Campus et salles', route: '/campus', icon: '⌂',
      permissions: [PERMISSIONS.CAMPUS_VIEW], ready: true }
  ];

  /**
   * Sections repliées par l'utilisateur.
   *
   * <p>Sept sections et trente entrées ne tiennent pas à l'écran d'un portable.
   * Le choix est conservé d'une session à l'autre : un comptable qui replie la
   * pédagogie ne veut pas la rouvrir à chaque connexion.</p>
   */
  private static readonly COLLAPSE_KEY = 'eduops.nav.collapsed';
  readonly collapsed = signal<string[]>(this.readCollapsed());

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
        // Navigation privée ou stockage plein : le repli reste valable
        // pour la session, il ne sera simplement pas mémorisé.
      }
      return next;
    });
  }

  /** Only the entries the account may actually reach. */
  readonly navigation = computed(() => {
    const visible = this.allItems.filter(
      (item) => !item.permissions || this.auth.hasAny(...item.permissions));
    const grouped = new Map<string, NavItem[]>();
    visible.forEach((item) => {
      const list = grouped.get(item.section) ?? [];
      list.push(item);
      grouped.set(item.section, list);
    });
    return Array.from(grouped, ([section, items]) => ({ section, items }));
  });

  ngOnInit(): void {
    // Feeds the sidebar badge and the dashboard reminder.
    this.setupStatus.refresh();

    // The opening step is centred, so the page is laid out before the first
    // highlighted element is requested. Starting now also prevents two help
    // dialogs from opening during the initial navigation.
    this.tour.start(this.tour.dashboardTour);
  }

  /** "Reprendre le guide" in the sidebar footer. */
  replayTour(): void {
    this.closeDrawer();
    this.tour.start(this.tour.dashboardTour, true);
  }

  toggleDrawer(): void {
    this.drawerOpen.update((open) => !open);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  logout(): void {
    this.auth.logout();
  }
}
