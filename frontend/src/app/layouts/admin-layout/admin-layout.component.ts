import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { WebSocketService } from '@core/websocket/websocket.service';
import { SetupStatusService } from '@core/services/setup-status.service';
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
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly setupStatus = inject(SetupStatusService);
  readonly ws = inject(WebSocketService);
  readonly setupBadge = this.setupStatus.badge;
  readonly setupIncomplete = this.setupStatus.incomplete;

  readonly user = this.auth.currentUser;
  readonly drawerOpen = signal(false);
  readonly searchTerm = signal('');

  private readonly allItems: NavItem[] = [
    { section: 'Pilotage', label: 'Tableau de bord', route: '/dashboard', icon: '▤',
      permissions: [PERMISSIONS.DASHBOARD_VIEW] },
    { section: 'Pilotage', label: 'Configuration', route: '/setup', icon: '◑',
      badge: () => this.setupBadge() },

    { section: 'Scolarite', label: 'Eleves', route: '/students', icon: '◍',
      permissions: [PERMISSIONS.STUDENT_VIEW] },
    { section: 'Scolarite', label: 'Admissions', route: '/admissions', icon: '◐',
      permissions: ['ADMISSION_VIEW'] },
    { section: 'Scolarite', label: 'Inscriptions', route: '/enrollments', icon: '✓',
      permissions: [PERMISSIONS.ENROLLMENT_VIEW] },
    { section: 'Scolarite', label: 'Responsables', route: '/guardians', icon: '◎',
      permissions: ['GUARDIAN_VIEW'] },

    { section: 'Pedagogie', label: 'Classes', route: '/classes', icon: '▦',
      permissions: [PERMISSIONS.CLASS_VIEW] },
    { section: 'Pedagogie', label: 'Matieres', route: '/subjects', icon: '◈',
      permissions: ['SUBJECT_VIEW'] },
    { section: 'Pedagogie', label: 'Emploi du temps', route: '/timetable', icon: '▥',
      permissions: [PERMISSIONS.TIMETABLE_VIEW] },
    { section: 'Pedagogie', label: 'Presences', route: '/attendance', icon: '◇',
      permissions: [PERMISSIONS.ATTENDANCE_VIEW] },
    { section: 'Pedagogie', label: 'Evaluations', route: '/assessments', icon: '◆',
      permissions: [PERMISSIONS.ASSESSMENT_VIEW] },
    { section: 'Pedagogie', label: 'Notes', route: '/grades', icon: '◉',
      permissions: [PERMISSIONS.GRADE_VIEW] },
    { section: 'Pedagogie', label: 'Bulletins', route: '/report-cards', icon: '▣',
      permissions: [PERMISSIONS.REPORT_CARD_VIEW] },
    { section: 'Pedagogie', label: 'Enseignants', route: '/teachers', icon: '◍',
      permissions: [PERMISSIONS.TEACHER_VIEW] },
    { section: 'Pedagogie', label: 'Discipline', route: '/discipline', icon: '⚠',
      permissions: ['DISCIPLINE_VIEW'] },

    { section: 'Finance', label: 'Frais scolaires', route: '/finance', icon: '◫',
      permissions: [PERMISSIONS.FINANCE_VIEW] },
    { section: 'Finance', label: 'Paiements', route: '/payments', icon: '◧',
      permissions: [PERMISSIONS.PAYMENT_VIEW] },

    { section: 'Administration', label: 'Rapports', route: '/reports', icon: '▧',
      permissions: [PERMISSIONS.REPORT_VIEW] },
    { section: 'Administration', label: 'Parametres', route: '/administration', icon: '◌',
      permissions: ['SCHOOL_VIEW'] }
  ];

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
