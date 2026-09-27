import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DASHBOARD_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { buildXlsx, saveBlob, slugify } from '@core/utils/spreadsheet-writer';
import { ChartCardComponent } from '@shared/ui/chart-card/chart-card.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.key;
function ReportsComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function ReportsComponent_Conditional_12_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.exportSelected()); });
    i0.ɵɵelementStart(1, "span", 6);
    i0.ɵɵtext(2, "\u21E9");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Exporter en Excel ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r1.loading() || ctx_r1.preview().rows.length === 0);
} }
function ReportsComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 8);
} }
function ReportsComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 10);
    i0.ɵɵlistener("retry", function ReportsComponent_Conditional_14_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function ReportsComponent_Conditional_15_Conditional_0_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span")(1, "strong");
    i0.ɵɵtext(2, "P\u00E9riode");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dashboard_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", dashboard_r4.currentTerm.name, "");
} }
function ReportsComponent_Conditional_15_Conditional_0_For_25_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 33);
    i0.ɵɵlistener("click", function ReportsComponent_Conditional_15_Conditional_0_For_25_Template_button_click_0_listener() { const report_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.selectReport(report_r6.key)); });
    i0.ɵɵelementStart(1, "span", 34);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 35)(4, "span", 36);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "small");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "span", 37);
    i0.ɵɵtext(11, "\u203A");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const report_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("report-choice--selected", ctx_r1.selectedKey() === report_r6.key);
    i0.ɵɵattribute("aria-current", ctx_r1.selectedKey() === report_r6.key ? "page" : null);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(report_r6.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(report_r6.category);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(report_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(report_r6.description);
} }
function ReportsComponent_Conditional_15_Conditional_0_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21)(1, "span", 6);
    i0.ɵɵtext(2, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Votre acc\u00E8s permet la consultation. L'export n\u00E9cessite la permission d\u00E9di\u00E9e.");
    i0.ɵɵelementEnd()();
} }
function ReportsComponent_Conditional_15_Conditional_0_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵelement(1, "eduops-chart-card", 38);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_8_0;
    const dashboard_r4 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("title", ctx_r1.selectedReport().title)("subtitle", "Ann\u00E9e scolaire " + dashboard_r4.academicYear.code)("data", ctx)("type", (tmp_8_0 = ctx_r1.preview().chartType) !== null && tmp_8_0 !== undefined ? tmp_8_0 : "bar")("height", 280);
} }
function ReportsComponent_Conditional_15_Conditional_0_For_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r7 = ctx.$implicit;
    i0.ɵɵclassProp("numeric", column_r7.kind === "number");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(column_r7.label);
} }
function ReportsComponent_Conditional_15_Conditional_0_For_51_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r8 = ctx.$implicit;
    const row_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("numeric", column_r8.kind === "number");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.cell(row_r9, column_r8.key), " ");
} }
function ReportsComponent_Conditional_15_Conditional_0_For_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵrepeaterCreate(1, ReportsComponent_Conditional_15_Conditional_0_For_51_For_2_Template, 2, 3, "td", 30, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.preview().columns);
} }
function ReportsComponent_Conditional_15_Conditional_0_ForEmpty_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 39);
    i0.ɵɵtext(2, " Aucune donn\u00E9e disponible pour ce rapport. ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵattribute("colspan", ctx_r1.preview().columns.length);
} }
function ReportsComponent_Conditional_15_Conditional_0_Conditional_56_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 40);
    i0.ɵɵlistener("click", function ReportsComponent_Conditional_15_Conditional_0_Conditional_56_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.exportSelected()); });
    i0.ɵɵtext(1, " T\u00E9l\u00E9charger ce rapport ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r1.preview().rows.length === 0);
} }
function ReportsComponent_Conditional_15_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 11)(1, "div", 12)(2, "span", 13);
    i0.ɵɵtext(3, "R");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 14);
    i0.ɵɵtemplate(10, ReportsComponent_Conditional_15_Conditional_0_Conditional_10_Template, 4, 1, "span");
    i0.ɵɵelementStart(11, "span")(12, "strong");
    i0.ɵɵtext(13, "Donn\u00E9es arr\u00EAt\u00E9es au");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "div", 15)(17, "aside", 16)(18, "div", 17)(19, "h2");
    i0.ɵɵtext(20, "Rapports disponibles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 18);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "nav", 19);
    i0.ɵɵrepeaterCreate(24, ReportsComponent_Conditional_15_Conditional_0_For_25_Template, 12, 7, "button", 20, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(26, ReportsComponent_Conditional_15_Conditional_0_Conditional_26_Template, 5, 0, "div", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "main", 22)(28, "header", 23)(29, "div")(30, "span", 24);
    i0.ɵɵtext(31, "Aper\u00E7u du rapport");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "h2");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "p");
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "div", 25)(37, "strong", 18);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40, "ligne(s)");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(41, ReportsComponent_Conditional_15_Conditional_0_Conditional_41_Template, 2, 5, "div", 26);
    i0.ɵɵelementStart(42, "section", 27)(43, "div", 28)(44, "table", 29)(45, "thead")(46, "tr");
    i0.ɵɵrepeaterCreate(47, ReportsComponent_Conditional_15_Conditional_0_For_48_Template, 2, 3, "th", 30, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(49, "tbody");
    i0.ɵɵrepeaterCreate(50, ReportsComponent_Conditional_15_Conditional_0_For_51_Template, 3, 0, "tr", null, i0.ɵɵrepeaterTrackByIndex, false, ReportsComponent_Conditional_15_Conditional_0_ForEmpty_52_Template, 3, 1, "tr");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(53, "footer", 31)(54, "span");
    i0.ɵɵtext(55);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(56, ReportsComponent_Conditional_15_Conditional_0_Conditional_56_Template, 2, 1, "button", 32);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_13_0;
    const dashboard_r4 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(dashboard_r4.campusName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Ann\u00E9e scolaire ", dashboard_r4.academicYear.code, "");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(dashboard_r4.currentTerm ? 10 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(15, 13, dashboard_r4.generatedAt, "dd/MM/yyyy \u00E0 HH:mm"), " ");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.reports.length);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.reports);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r1.canExport() ? 26 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.selectedReport().title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.selectedReport().description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.preview().rows.length);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((tmp_13_0 = ctx_r1.preview().chart) ? 41 : -1, tmp_13_0);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r1.preview().columns);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.preview().rows);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" Source : tableau de bord Soocloo \u00B7 ", dashboard_r4.academicYear.code, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.canExport() ? 56 : -1);
} }
function ReportsComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ReportsComponent_Conditional_15_Conditional_0_Template, 57, 16);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.data()) ? 0 : -1, tmp_1_0);
} }
const REPORTS = [
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
export class ReportsComponent {
    dataSource = inject(DASHBOARD_DATA_SOURCE);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    destroyRef = inject(DestroyRef);
    reports = REPORTS;
    selectedKey = signal('OVERVIEW');
    data = signal(null);
    loading = signal(true);
    error = signal(false);
    canExport = computed(() => this.auth.has(PERMISSIONS.REPORT_EXPORT));
    selectedReport = computed(() => REPORTS.find((report) => report.key === this.selectedKey()) ?? REPORTS[0]);
    preview = computed(() => {
        const data = this.data();
        return data ? this.buildPreview(this.selectedKey(), data) : { columns: [], rows: [] };
    });
    ngOnInit() {
        this.load();
    }
    load() {
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
    selectReport(key) {
        this.selectedKey.set(key);
    }
    exportSelected() {
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
        this.notifications.success(`${report.title} a été préparé au format Excel.`, 'Rapport exporté');
    }
    cell(row, key) {
        return row[key] ?? '—';
    }
    buildPreview(key, data) {
        switch (key) {
            case 'ENROLLMENT':
                return this.fromChart(data.enrollmentByLevel, [{ key: 'period', label: 'Niveau', width: 24, kind: 'text' },
                    { key: 'value0', label: 'Effectif', width: 16, kind: 'number' }], 'bar');
            case 'ATTENDANCE':
                return this.fromChart(data.attendanceTrend, [{ key: 'period', label: 'Semaine', width: 18, kind: 'text' },
                    { key: 'value0', label: 'Présence (%)', width: 18, kind: 'number' },
                    { key: 'value1', label: 'Absence (%)', width: 18, kind: 'number' }], 'line');
            case 'ACADEMIC':
                return this.fromChart(data.academicPerformance, [{ key: 'period', label: 'Période', width: 20, kind: 'text' },
                    { key: 'value0', label: 'Moyenne générale', width: 22, kind: 'number' }], 'area');
            case 'FINANCE': {
                const columns = [
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
    fromChart(chart, columns, chartType) {
        return {
            columns,
            chart,
            chartType,
            rows: chart.categories.map((period, index) => {
                const row = { period };
                chart.series.forEach((series, seriesIndex) => {
                    row[`value${seriesIndex}`] = series.data[index] ?? 0;
                });
                return row;
            })
        };
    }
    severityLabel(value) {
        return ({ INFO: 'Information', WARNING: 'Attention', CRITICAL: 'Critique' })[value];
    }
    formatTimestamp(value) {
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }).format(new Date(value));
    }
    static ɵfac = function ReportsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReportsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReportsComponent, selectors: [["eduops-reports"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 16, vars: 3, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], ["aria-hidden", "true"], ["type", "button", 1, "btn", "btn--primary", 3, "disabled"], ["message", "Pr\u00E9paration des rapports\u2026"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [3, "retry"], ["aria-label", "Contexte du rapport", 1, "context-bar"], [1, "context-bar__main"], ["aria-hidden", "true", 1, "context-bar__mark"], [1, "context-bar__meta"], [1, "reports-layout"], ["aria-label", "Catalogue des rapports", 1, "catalog"], [1, "catalog__head"], [1, "numeric"], [1, "catalog__list"], ["type", "button", 1, "report-choice", 3, "report-choice--selected"], [1, "catalog__permission"], ["aria-live", "polite", 1, "preview"], [1, "preview__head"], [1, "preview__eyebrow"], [1, "preview__count"], [1, "preview__chart"], ["aria-label", "Donn\u00E9es du rapport", 1, "report-table"], [1, "table-wrapper"], [1, "table"], [3, "numeric"], [1, "preview__foot"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "disabled"], ["type", "button", 1, "report-choice", 3, "click"], ["aria-hidden", "true", 1, "report-choice__icon"], [1, "report-choice__copy"], [1, "report-choice__category"], ["aria-hidden", "true", 1, "report-choice__arrow"], [3, "title", "subtitle", "data", "type", "height"], [1, "table-empty"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click", "disabled"]], template: function ReportsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Rapports");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, " Consultez les chiffres de l'\u00E9tablissement et exportez la vue dont vous avez besoin. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "button", 5);
            i0.ɵɵlistener("click", function ReportsComponent_Template_button_click_8_listener() { return ctx.load(); });
            i0.ɵɵelementStart(9, "span", 6);
            i0.ɵɵtext(10, "\u21BB");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(11, " Actualiser ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(12, ReportsComponent_Conditional_12_Template, 4, 1, "button", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(13, ReportsComponent_Conditional_13_Template, 1, 0, "eduops-loading-state", 8)(14, ReportsComponent_Conditional_14_Template, 1, 0, "eduops-error-state")(15, ReportsComponent_Conditional_15_Template, 1, 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.canExport() ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 13 : ctx.error() ? 14 : 15);
        } }, dependencies: [CommonModule, i1.DatePipe, ChartCardComponent, LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.context-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n  flex-wrap: wrap;\n\n  &__main {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n\n    div { display: flex; flex-direction: column; }\n    strong { color: var(--text-strong); }\n    span { margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n  }\n\n  &__mark {\n    display: grid;\n    place-items: center;\n    width: 42px;\n    height: 42px;\n    font-size: var(--text-lg);\n    font-weight: 800;\n    color: var(--text-on-brand);\n    background: var(--brand);\n    border-radius: 12px;\n  }\n\n  &__meta {\n    display: flex;\n    align-items: center;\n    gap: var(--space-5);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    flex-wrap: wrap;\n\n    span { display: flex; flex-direction: column; }\n    strong { font-size: var(--text-xs); font-weight: 500; color: var(--text-light); }\n  }\n}\n\n.reports-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(280px, 340px) minmax(0, 1fr);\n  align-items: start;\n  gap: var(--space-5);\n}\n\n.catalog[_ngcontent-%COMP%] {\n  overflow: hidden;\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4);\n    border-bottom: 1px solid var(--border-light);\n\n    h2 { margin: 0; font-size: var(--text-md); color: var(--text-strong); }\n    span {\n      display: grid;\n      place-items: center;\n      min-width: 24px;\n      height: 24px;\n      font-size: var(--text-xs);\n      font-weight: 700;\n      color: var(--brand);\n      background: var(--brand-tint);\n      border-radius: var(--radius-pill);\n    }\n  }\n\n  &__list { display: flex; flex-direction: column; padding: var(--space-2); }\n\n  &__permission {\n    display: flex;\n    gap: var(--space-2);\n    padding: var(--space-3) var(--space-4);\n    background: var(--surface-sunken);\n    border-top: 1px solid var(--border-light);\n\n    > span {\n      display: grid;\n      place-items: center;\n      flex: none;\n      width: 20px;\n      height: 20px;\n      font-size: var(--text-xs);\n      font-weight: 700;\n      color: var(--text-on-brand);\n      background: var(--text-muted);\n      border-radius: 50%;\n    }\n\n    p { margin: 0; font-size: var(--text-xs); line-height: 1.5; color: var(--text-muted); }\n  }\n}\n\n.report-choice[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: var(--space-3);\n  width: 100%;\n  padding: var(--space-3);\n  text-align: left;\n  color: var(--text-normal);\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: var(--radius-input);\n  cursor: pointer;\n  transition: background var(--transition-fast), border-color var(--transition-fast);\n\n  &:hover { background: var(--surface-hover); }\n\n  &--selected {\n    background: var(--brand-tint);\n    border-color: var(--brand-tint-border);\n  }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    width: 36px;\n    height: 36px;\n    font-size: var(--text-sm);\n    font-weight: 800;\n    color: var(--brand);\n    background: var(--brand-tint);\n    border-radius: 10px;\n  }\n\n  &--selected &__icon { color: var(--text-on-brand); background: var(--brand); }\n\n  &__copy {\n    display: flex;\n    min-width: 0;\n    flex-direction: column;\n\n    strong { margin: 1px 0 2px; font-size: var(--text-sm); color: var(--text-strong); }\n    small {\n      display: -webkit-box;\n      overflow: hidden;\n      font-size: var(--text-xs);\n      line-height: 1.35;\n      color: var(--text-muted);\n      -webkit-box-orient: vertical;\n      -webkit-line-clamp: 2;\n    }\n  }\n\n  &__category {\n    font-size: 10px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: var(--text-light);\n  }\n\n  &__arrow { font-size: var(--text-lg); color: var(--text-light); }\n}\n\n.preview[_ngcontent-%COMP%] {\n  overflow: hidden;\n  min-width: 0;\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-4);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n\n    h2 { margin: 2px 0 var(--space-2); font-size: var(--text-xl); color: var(--text-strong); }\n    p { max-width: 66ch; margin: 0; color: var(--text-muted); }\n  }\n\n  &__eyebrow {\n    font-size: var(--text-xs);\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: var(--brand);\n  }\n\n  &__count {\n    display: flex;\n    align-items: flex-end;\n    flex-direction: column;\n    flex: none;\n\n    strong { font-size: var(--text-xl); color: var(--text-strong); }\n    span { font-size: var(--text-xs); color: var(--text-muted); }\n  }\n\n  &__chart { padding: var(--space-5) var(--space-5) 0; }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-4);\n    padding: var(--space-4) var(--space-5);\n    font-size: var(--text-xs);\n    color: var(--text-light);\n    background: var(--surface-sunken);\n    border-top: 1px solid var(--border-light);\n    flex-wrap: wrap;\n  }\n}\n\n.report-table[_ngcontent-%COMP%] { padding: var(--space-5); }\n.table-wrapper[_ngcontent-%COMP%] { overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius-input); }\n.table[_ngcontent-%COMP%] { min-width: 640px; }\n.table-empty[_ngcontent-%COMP%] { padding: var(--space-10) !important; text-align: center; color: var(--text-muted); }\n\n@include tablet-down {\n  .reports-layout { grid-template-columns: 1fr; }\n  .catalog__list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }\n}\n\n@include mobile {\n  .context-bar { align-items: flex-start; }\n  .context-bar__meta { align-items: flex-start; flex-direction: column; gap: var(--space-2); }\n  .catalog__list { grid-template-columns: 1fr; }\n  .preview__head { flex-direction: column; }\n  .preview__count { align-items: flex-start; flex-direction: row; gap: var(--space-2); }\n  .preview__chart, .report-table { padding: var(--space-3); }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-reports', standalone: true, imports: [CommonModule, ChartCardComponent, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Rapports</h1>\n      <p class=\"page__meta\">\n        Consultez les chiffres de l'\u00E9tablissement et exportez la vue dont vous avez besoin.\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      <button type=\"button\" class=\"btn btn--secondary\" [disabled]=\"loading()\"\n              (click)=\"load()\">\n        <span aria-hidden=\"true\">\u21BB</span> Actualiser\n      </button>\n      @if (canExport()) {\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"loading() || preview().rows.length === 0\"\n                (click)=\"exportSelected()\">\n          <span aria-hidden=\"true\">\u21E9</span> Exporter en Excel\n        </button>\n      }\n    </div>\n  </header>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Pr\u00E9paration des rapports\u2026\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n    @if (data(); as dashboard) {\n    <section class=\"context-bar\" aria-label=\"Contexte du rapport\">\n      <div class=\"context-bar__main\">\n        <span class=\"context-bar__mark\" aria-hidden=\"true\">R</span>\n        <div>\n          <strong>{{ dashboard.campusName }}</strong>\n          <span>Ann\u00E9e scolaire {{ dashboard.academicYear.code }}</span>\n        </div>\n      </div>\n      <div class=\"context-bar__meta\">\n        @if (dashboard.currentTerm) {\n          <span><strong>P\u00E9riode</strong> {{ dashboard.currentTerm.name }}</span>\n        }\n        <span>\n          <strong>Donn\u00E9es arr\u00EAt\u00E9es au</strong>\n          {{ dashboard.generatedAt | date:'dd/MM/yyyy \u00E0 HH:mm' }}\n        </span>\n      </div>\n    </section>\n\n    <div class=\"reports-layout\">\n      <aside class=\"catalog\" aria-label=\"Catalogue des rapports\">\n        <div class=\"catalog__head\">\n          <h2>Rapports disponibles</h2>\n          <span class=\"numeric\">{{ reports.length }}</span>\n        </div>\n\n        <nav class=\"catalog__list\">\n          @for (report of reports; track report.key) {\n            <button type=\"button\" class=\"report-choice\"\n                    [class.report-choice--selected]=\"selectedKey() === report.key\"\n                    [attr.aria-current]=\"selectedKey() === report.key ? 'page' : null\"\n                    (click)=\"selectReport(report.key)\">\n              <span class=\"report-choice__icon\" aria-hidden=\"true\">{{ report.icon }}</span>\n              <span class=\"report-choice__copy\">\n                <span class=\"report-choice__category\">{{ report.category }}</span>\n                <strong>{{ report.title }}</strong>\n                <small>{{ report.description }}</small>\n              </span>\n              <span class=\"report-choice__arrow\" aria-hidden=\"true\">\u203A</span>\n            </button>\n          }\n        </nav>\n\n        @if (!canExport()) {\n          <div class=\"catalog__permission\">\n            <span aria-hidden=\"true\">i</span>\n            <p>Votre acc\u00E8s permet la consultation. L'export n\u00E9cessite la permission d\u00E9di\u00E9e.</p>\n          </div>\n        }\n      </aside>\n\n      <main class=\"preview\" aria-live=\"polite\">\n        <header class=\"preview__head\">\n          <div>\n            <span class=\"preview__eyebrow\">Aper\u00E7u du rapport</span>\n            <h2>{{ selectedReport().title }}</h2>\n            <p>{{ selectedReport().description }}</p>\n          </div>\n          <div class=\"preview__count\">\n            <strong class=\"numeric\">{{ preview().rows.length }}</strong>\n            <span>ligne(s)</span>\n          </div>\n        </header>\n\n        @if (preview().chart; as chart) {\n          <div class=\"preview__chart\">\n            <eduops-chart-card\n              [title]=\"selectedReport().title\"\n              [subtitle]=\"'Ann\u00E9e scolaire ' + dashboard.academicYear.code\"\n              [data]=\"chart\"\n              [type]=\"preview().chartType ?? 'bar'\"\n              [height]=\"280\" />\n          </div>\n        }\n\n        <section class=\"report-table\" aria-label=\"Donn\u00E9es du rapport\">\n          <div class=\"table-wrapper\">\n            <table class=\"table\">\n              <thead>\n                <tr>\n                  @for (column of preview().columns; track column.key) {\n                    <th [class.numeric]=\"column.kind === 'number'\">{{ column.label }}</th>\n                  }\n                </tr>\n              </thead>\n              <tbody>\n                @for (row of preview().rows; track $index) {\n                  <tr>\n                    @for (column of preview().columns; track column.key) {\n                      <td [class.numeric]=\"column.kind === 'number'\">\n                        {{ cell(row, column.key) }}\n                      </td>\n                    }\n                  </tr>\n                } @empty {\n                  <tr>\n                    <td class=\"table-empty\" [attr.colspan]=\"preview().columns.length\">\n                      Aucune donn\u00E9e disponible pour ce rapport.\n                    </td>\n                  </tr>\n                }\n              </tbody>\n            </table>\n          </div>\n        </section>\n\n        <footer class=\"preview__foot\">\n          <span>\n            Source : tableau de bord Soocloo \u00B7 {{ dashboard.academicYear.code }}\n          </span>\n          @if (canExport()) {\n            <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                    [disabled]=\"preview().rows.length === 0\"\n                    (click)=\"exportSelected()\">\n              T\u00E9l\u00E9charger ce rapport\n            </button>\n          }\n        </footer>\n      </main>\n    </div>\n    }\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n.context-bar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n  flex-wrap: wrap;\n\n  &__main {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n\n    div { display: flex; flex-direction: column; }\n    strong { color: var(--text-strong); }\n    span { margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n  }\n\n  &__mark {\n    display: grid;\n    place-items: center;\n    width: 42px;\n    height: 42px;\n    font-size: var(--text-lg);\n    font-weight: 800;\n    color: var(--text-on-brand);\n    background: var(--brand);\n    border-radius: 12px;\n  }\n\n  &__meta {\n    display: flex;\n    align-items: center;\n    gap: var(--space-5);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    flex-wrap: wrap;\n\n    span { display: flex; flex-direction: column; }\n    strong { font-size: var(--text-xs); font-weight: 500; color: var(--text-light); }\n  }\n}\n\n.reports-layout {\n  display: grid;\n  grid-template-columns: minmax(280px, 340px) minmax(0, 1fr);\n  align-items: start;\n  gap: var(--space-5);\n}\n\n.catalog {\n  overflow: hidden;\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4);\n    border-bottom: 1px solid var(--border-light);\n\n    h2 { margin: 0; font-size: var(--text-md); color: var(--text-strong); }\n    span {\n      display: grid;\n      place-items: center;\n      min-width: 24px;\n      height: 24px;\n      font-size: var(--text-xs);\n      font-weight: 700;\n      color: var(--brand);\n      background: var(--brand-tint);\n      border-radius: var(--radius-pill);\n    }\n  }\n\n  &__list { display: flex; flex-direction: column; padding: var(--space-2); }\n\n  &__permission {\n    display: flex;\n    gap: var(--space-2);\n    padding: var(--space-3) var(--space-4);\n    background: var(--surface-sunken);\n    border-top: 1px solid var(--border-light);\n\n    > span {\n      display: grid;\n      place-items: center;\n      flex: none;\n      width: 20px;\n      height: 20px;\n      font-size: var(--text-xs);\n      font-weight: 700;\n      color: var(--text-on-brand);\n      background: var(--text-muted);\n      border-radius: 50%;\n    }\n\n    p { margin: 0; font-size: var(--text-xs); line-height: 1.5; color: var(--text-muted); }\n  }\n}\n\n.report-choice {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: var(--space-3);\n  width: 100%;\n  padding: var(--space-3);\n  text-align: left;\n  color: var(--text-normal);\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: var(--radius-input);\n  cursor: pointer;\n  transition: background var(--transition-fast), border-color var(--transition-fast);\n\n  &:hover { background: var(--surface-hover); }\n\n  &--selected {\n    background: var(--brand-tint);\n    border-color: var(--brand-tint-border);\n  }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    width: 36px;\n    height: 36px;\n    font-size: var(--text-sm);\n    font-weight: 800;\n    color: var(--brand);\n    background: var(--brand-tint);\n    border-radius: 10px;\n  }\n\n  &--selected &__icon { color: var(--text-on-brand); background: var(--brand); }\n\n  &__copy {\n    display: flex;\n    min-width: 0;\n    flex-direction: column;\n\n    strong { margin: 1px 0 2px; font-size: var(--text-sm); color: var(--text-strong); }\n    small {\n      display: -webkit-box;\n      overflow: hidden;\n      font-size: var(--text-xs);\n      line-height: 1.35;\n      color: var(--text-muted);\n      -webkit-box-orient: vertical;\n      -webkit-line-clamp: 2;\n    }\n  }\n\n  &__category {\n    font-size: 10px;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: var(--text-light);\n  }\n\n  &__arrow { font-size: var(--text-lg); color: var(--text-light); }\n}\n\n.preview {\n  overflow: hidden;\n  min-width: 0;\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-4);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n\n    h2 { margin: 2px 0 var(--space-2); font-size: var(--text-xl); color: var(--text-strong); }\n    p { max-width: 66ch; margin: 0; color: var(--text-muted); }\n  }\n\n  &__eyebrow {\n    font-size: var(--text-xs);\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: var(--brand);\n  }\n\n  &__count {\n    display: flex;\n    align-items: flex-end;\n    flex-direction: column;\n    flex: none;\n\n    strong { font-size: var(--text-xl); color: var(--text-strong); }\n    span { font-size: var(--text-xs); color: var(--text-muted); }\n  }\n\n  &__chart { padding: var(--space-5) var(--space-5) 0; }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-4);\n    padding: var(--space-4) var(--space-5);\n    font-size: var(--text-xs);\n    color: var(--text-light);\n    background: var(--surface-sunken);\n    border-top: 1px solid var(--border-light);\n    flex-wrap: wrap;\n  }\n}\n\n.report-table { padding: var(--space-5); }\n.table-wrapper { overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius-input); }\n.table { min-width: 640px; }\n.table-empty { padding: var(--space-10) !important; text-align: center; color: var(--text-muted); }\n\n@include tablet-down {\n  .reports-layout { grid-template-columns: 1fr; }\n  .catalog__list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }\n}\n\n@include mobile {\n  .context-bar { align-items: flex-start; }\n  .context-bar__meta { align-items: flex-start; flex-direction: column; gap: var(--space-2); }\n  .catalog__list { grid-template-columns: 1fr; }\n  .preview__head { flex-direction: column; }\n  .preview__count { align-items: flex-start; flex-direction: row; gap: var(--space-2); }\n  .preview__chart, .report-table { padding: var(--space-3); }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ReportsComponent, { className: "ReportsComponent", filePath: "frontend/src/app/features/reports/reports.component.ts", lineNumber: 83 }); })();
//# sourceMappingURL=reports.component.js.map