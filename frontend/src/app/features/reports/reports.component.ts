import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DASHBOARD_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { ChartData, DashboardData } from '@core/models/domain.models';
import { NotificationService } from '@core/services/notification.service';
import { buildXlsx, saveBlob, slugify } from '@core/utils/spreadsheet-writer';
import { ChartCardComponent } from '@shared/ui/chart-card/chart-card.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

type ReportKey = 'OVERVIEW' | 'ENROLLMENT' | 'ATTENDANCE'
  | 'ACADEMIC' | 'FINANCE' | 'ALERTS';

interface ReportDefinition {
  readonly key: ReportKey;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly category: string;
}

interface ReportColumn {
  readonly key: string;
  readonly label: string;
  readonly width: number;
  readonly kind: 'text' | 'number';
}

interface ReportPreview {
  readonly columns: readonly ReportColumn[];
  readonly rows: ReadonlyArray<Record<string, string | number>>;
  readonly chart?: ChartData;
  readonly chartType?: 'bar' | 'line' | 'area';
}

const REPORTS: readonly ReportDefinition[] = [
  {
    key: 'OVERVIEW', title: 'Synthèse de direction', icon: '▦', category: 'Pilotage',
    description: "Les indicateurs essentiels de l'établissement sur une seule page."
  },
  {
    key: 'ENROLLMENT', title: 'Effectifs par niveau', icon: 'É', category: 'Scolarité',
    description: 'La répartition des élèves inscrits entre les différents niveaux.'
  },
  {
    key: 'ATTENDANCE', title: 'Présences et absences', icon: 'P', category: 'Scolarité',
    description: "L'évolution des taux de présence et d'absence par semaine."
  },
  {
    key: 'ACADEMIC', title: 'Résultats académiques', icon: 'N', category: 'Pédagogie',
    description: "L'évolution de la moyenne générale au fil des trimestres."
  },
  {
    key: 'FINANCE', title: 'Encaissements mensuels', icon: '₣', category: 'Finance',
    description: "Les montants attendus, encaissés et l'écart restant par mois."
  },
  {
    key: 'ALERTS', title: 'Alertes opérationnelles', icon: '!', category: 'Pilotage',
    description: 'Les situations actives qui demandent une action de l’équipe.'
  }
];

/**
 * Read-only reporting centre for the currently selected school year.
 *
 * Every preview and workbook is built from the same DashboardData payload as
 * the direction dashboard. The page therefore never invents a second version
 * of a KPI merely for export.
 */
@Component({
  selector: 'eduops-reports',
  standalone: true,
  imports: [CommonModule, ChartCardComponent, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  private readonly dataSource = inject(DASHBOARD_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  readonly reports = REPORTS;
  readonly selectedKey = signal<ReportKey>('OVERVIEW');
  readonly data = signal<DashboardData | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);

  readonly canExport = computed(() => this.auth.has(PERMISSIONS.REPORT_EXPORT));
  readonly selectedReport = computed(() => REPORTS.find(
    (report) => report.key === this.selectedKey()) ?? REPORTS[0]);
  readonly preview = computed<ReportPreview>(() => {
    const data = this.data();
    return data ? this.buildPreview(this.selectedKey(), data) : { columns: [], rows: [] };
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.load().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.data.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  selectReport(key: ReportKey): void {
    this.selectedKey.set(key);
  }

  exportSelected(): void {
    const data = this.data();
    const report = this.selectedReport();
    const preview = this.preview();
    if (!data || !this.canExport() || preview.rows.length === 0) {
      return;
    }

    const workbook = buildXlsx({
      sheetName: report.title.slice(0, 31),
      preamble: [
        `${data.campusName} — ${data.academicYear.code}`,
        report.title,
        `Données générées le ${this.formatTimestamp(data.generatedAt)}`
      ],
      columns: preview.columns.map((column) => ({
        header: column.label,
        width: column.width,
        kind: column.kind
      })),
      rows: preview.rows.map((row) => preview.columns.map((column) => row[column.key]))
    });

    const date = new Date().toISOString().slice(0, 10);
    saveBlob(workbook, `rapport-${slugify(report.title)}-${date}.xlsx`);
    this.notifications.success(
      `${report.title} a été préparé au format Excel.`, 'Rapport exporté');
  }

  cell(row: Record<string, string | number>, key: string): string | number {
    return row[key] ?? '—';
  }

  private buildPreview(key: ReportKey, data: DashboardData): ReportPreview {
    switch (key) {
      case 'ENROLLMENT':
        return this.fromChart(
          data.enrollmentByLevel,
          [{ key: 'period', label: 'Niveau', width: 24, kind: 'text' },
           { key: 'value0', label: 'Effectif', width: 16, kind: 'number' }],
          'bar');
      case 'ATTENDANCE':
        return this.fromChart(
          data.attendanceTrend,
          [{ key: 'period', label: 'Semaine', width: 18, kind: 'text' },
           { key: 'value0', label: 'Présence (%)', width: 18, kind: 'number' },
           { key: 'value1', label: 'Absence (%)', width: 18, kind: 'number' }],
          'line');
      case 'ACADEMIC':
        return this.fromChart(
          data.academicPerformance,
          [{ key: 'period', label: 'Période', width: 20, kind: 'text' },
           { key: 'value0', label: 'Moyenne générale', width: 22, kind: 'number' }],
          'area');
      case 'FINANCE': {
        const columns: ReportColumn[] = [
          { key: 'period', label: 'Mois', width: 18, kind: 'text' },
          { key: 'value0', label: 'Encaissé', width: 20, kind: 'number' },
          { key: 'value1', label: 'Attendu', width: 20, kind: 'number' },
          { key: 'gap', label: 'Écart', width: 20, kind: 'number' }
        ];
        const base = this.fromChart(data.monthlyCollections, columns, 'bar');
        return {
          ...base,
          rows: base.rows.map((row) => ({
            ...row,
            gap: Number(row['value1'] ?? 0) - Number(row['value0'] ?? 0)
          }))
        };
      }
      case 'ALERTS':
        return {
          columns: [
            { key: 'severity', label: 'Priorité', width: 16, kind: 'text' },
            { key: 'title', label: 'Alerte', width: 30, kind: 'text' },
            { key: 'message', label: 'Description', width: 60, kind: 'text' },
            { key: 'student', label: 'Élève', width: 28, kind: 'text' },
            { key: 'classroom', label: 'Classe', width: 18, kind: 'text' },
            { key: 'date', label: 'Détectée le', width: 22, kind: 'text' }
          ],
          rows: [...data.alerts]
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .map((alert) => ({
              severity: this.severityLabel(alert.severity),
              title: alert.title,
              message: alert.message,
              student: alert.studentName ?? '—',
              classroom: alert.classroomName ?? '—',
              date: this.formatTimestamp(alert.createdAt)
            }))
        };
      case 'OVERVIEW':
      default:
        return {
          columns: [
            { key: 'indicator', label: 'Indicateur', width: 34, kind: 'text' },
            { key: 'value', label: 'Valeur', width: 24, kind: 'text' },
            { key: 'change', label: 'Évolution', width: 30, kind: 'text' }
          ],
          rows: data.kpis.map((kpi) => ({
            indicator: kpi.label,
            value: `${kpi.formatted}${kpi.suffix ?? ''}`,
            change: kpi.delta === undefined
              ? '—'
              : `${kpi.delta > 0 ? '+' : ''}${kpi.delta}${kpi.deltaLabel ? ` ${kpi.deltaLabel}` : ''}`
          }))
        };
    }
  }

  private fromChart(chart: ChartData, columns: readonly ReportColumn[],
                    chartType: 'bar' | 'line' | 'area'): ReportPreview {
    return {
      columns,
      chart,
      chartType,
      rows: chart.categories.map((period, index) => {
        const row: Record<string, string | number> = { period };
        chart.series.forEach((series, seriesIndex) => {
          row[`value${seriesIndex}`] = series.data[index] ?? 0;
        });
        return row;
      })
    };
  }

  private severityLabel(value: 'INFO' | 'WARNING' | 'CRITICAL'): string {
    return ({ INFO: 'Information', WARNING: 'Attention', CRITICAL: 'Critique' })[value];
  }

  private formatTimestamp(value: string): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date(value));
  }
}
