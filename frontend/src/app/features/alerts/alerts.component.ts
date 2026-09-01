import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DASHBOARD_DATA_SOURCE } from '@core/datasource/data-source';
import { AlertSeverity } from '@core/models/common.models';
import { DashboardAlert } from '@core/models/domain.models';
import { WebSocketService } from '@core/websocket/websocket.service';
import { WS_EVENTS } from '@core/websocket/websocket-events';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

type SeverityFilter = 'ALL' | AlertSeverity;

interface AlertAction {
  readonly label: string;
  readonly route: string;
}

const SEVERITY_RANK: Record<AlertSeverity, number> = {
  CRITICAL: 0,
  WARNING: 1,
  INFO: 2
};

const TYPE_LABELS: Record<string, string> = {
  CLASS_FULL: 'Capacité des classes',
  PAYMENT_OVERDUE: 'Situation financière',
  GRADE_ENTRY_DELAY: 'Suivi pédagogique',
  STUDENT_REPEATED_ABSENCE: 'Assiduité',
  ABSENCE_REPEATED: 'Assiduité',
  ENROLLMENT_INCOMPLETE: 'Inscriptions',
  DOCUMENT_MISSING: 'Dossiers élèves',
  TIMETABLE_CONFLICT: 'Emploi du temps'
};

const TYPE_ACTIONS: Record<string, AlertAction> = {
  CLASS_FULL: { label: 'Voir les classes', route: '/classes' },
  PAYMENT_OVERDUE: { label: 'Voir les finances', route: '/finance' },
  GRADE_ENTRY_DELAY: { label: 'Voir les évaluations', route: '/assessments' },
  STUDENT_REPEATED_ABSENCE: { label: 'Voir les présences', route: '/attendance' },
  ABSENCE_REPEATED: { label: 'Voir les présences', route: '/attendance' },
  ENROLLMENT_INCOMPLETE: { label: 'Voir les inscriptions', route: '/enrollments' },
  DOCUMENT_MISSING: { label: 'Voir les dossiers', route: '/student-files' },
  TIMETABLE_CONFLICT: { label: "Voir l'emploi du temps", route: '/timetable' }
};

/**
 * Operational alerts collected by the direction dashboard.
 *
 * The current backend contract exposes active alerts as part of DashboardData.
 * This page deliberately stays read-only until acknowledge/resolve endpoints
 * exist: a button that only hid an alert in one browser would be misleading.
 */
@Component({
  selector: 'eduops-alerts',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})
export class AlertsComponent implements OnInit {
  private readonly dataSource = inject(DASHBOARD_DATA_SOURCE);
  private readonly ws = inject(WebSocketService);
  private readonly destroyRef = inject(DestroyRef);

  readonly alerts = signal<DashboardAlert[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly lastRefresh = signal<Date | null>(null);
  readonly search = signal('');
  readonly severity = signal<SeverityFilter>('ALL');

  readonly criticalCount = computed(() => this.count('CRITICAL'));
  readonly warningCount = computed(() => this.count('WARNING'));
  readonly infoCount = computed(() => this.count('INFO'));

  readonly filteredAlerts = computed(() => {
    const query = this.search().trim().toLocaleLowerCase('fr');
    const severity = this.severity();

    return [...this.alerts()]
      .filter((alert) => severity === 'ALL' || alert.severity === severity)
      .filter((alert) => !query || [
        alert.title,
        alert.message,
        alert.studentName,
        alert.classroomName,
        this.typeLabel(alert.type)
      ].some((value) => value?.toLocaleLowerCase('fr').includes(query)))
      .sort((left, right) => SEVERITY_RANK[left.severity] - SEVERITY_RANK[right.severity]
        || right.createdAt.localeCompare(left.createdAt));
  });

  readonly hasFilters = computed(() => this.search().trim().length > 0
    || this.severity() !== 'ALL');

  ngOnInit(): void {
    this.load();
    this.ws.on(WS_EVENTS.ALERT_CREATED)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.load(true));
  }

  load(silent = false): void {
    if (!silent) {
      this.loading.set(true);
    }
    this.error.set(false);
    this.dataSource.load().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (dashboard) => {
        this.alerts.set(dashboard.alerts);
        this.loading.set(false);
        this.lastRefresh.set(new Date());
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  setSearch(value: string): void {
    this.search.set(value);
  }

  filterBy(severity: SeverityFilter): void {
    this.severity.set(severity);
  }

  resetFilters(): void {
    this.search.set('');
    this.severity.set('ALL');
  }

  severityLabel(severity: AlertSeverity): string {
    return ({ INFO: 'Information', WARNING: 'Attention', CRITICAL: 'Critique' })[severity];
  }

  typeLabel(type: string): string {
    return TYPE_LABELS[type] ?? type.replaceAll('_', ' ').toLocaleLowerCase('fr');
  }

  actionFor(type: string): AlertAction {
    return TYPE_ACTIONS[type] ?? { label: 'Ouvrir le tableau de bord', route: '/dashboard' };
  }

  iconFor(type: string): string {
    if (type.includes('PAYMENT')) return '₣';
    if (type.includes('ABSENCE')) return 'A';
    if (type.includes('GRADE')) return 'N';
    if (type.includes('CLASS')) return 'C';
    if (type.includes('DOCUMENT') || type.includes('ENROLLMENT')) return 'D';
    return '!';
  }

  private count(severity: AlertSeverity): number {
    return this.alerts().filter((alert) => alert.severity === severity).length;
  }
}
