import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DASHBOARD_DATA_SOURCE } from '@core/datasource/data-source';
import { WebSocketService } from '@core/websocket/websocket.service';
import { WS_EVENTS } from '@core/websocket/websocket-events';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.id;
function AlertsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 4);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Actualis\u00E9 \u00E0 ", i0.ɵɵpipeBind2(2, 1, ctx, "HH:mm:ss"), "");
} }
function AlertsComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 8);
} }
function AlertsComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 9);
    i0.ɵɵlistener("retry", function AlertsComponent_Conditional_14_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function AlertsComponent_Conditional_15_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" sur ", ctx_r1.alerts().length, " ");
} }
function AlertsComponent_Conditional_15_Conditional_65_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 39);
    i0.ɵɵlistener("click", function AlertsComponent_Conditional_15_Conditional_65_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.resetFilters()); });
    i0.ɵɵtext(1, " Effacer les filtres ");
    i0.ɵɵelementEnd();
} }
function AlertsComponent_Conditional_15_For_68_Conditional_13_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span")(1, "strong");
    i0.ɵɵtext(2, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const alert_r6 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", alert_r6.studentName, "");
} }
function AlertsComponent_Conditional_15_For_68_Conditional_13_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span")(1, "strong");
    i0.ɵɵtext(2, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const alert_r6 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", alert_r6.classroomName, "");
} }
function AlertsComponent_Conditional_15_For_68_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵtemplate(1, AlertsComponent_Conditional_15_For_68_Conditional_13_Conditional_1_Template, 4, 1, "span")(2, AlertsComponent_Conditional_15_For_68_Conditional_13_Conditional_2_Template, 4, 1, "span");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const alert_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵconditional(alert_r6.studentName ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(alert_r6.classroomName ? 2 : -1);
} }
function AlertsComponent_Conditional_15_For_68_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 50);
    i0.ɵɵtext(1, "\u00C0 traiter en priorit\u00E9");
    i0.ɵɵelementEnd();
} }
function AlertsComponent_Conditional_15_For_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 37)(1, "div", 40);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 41)(4, "div", 42)(5, "span", 43);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 44);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "h3", 45);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 46);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, AlertsComponent_Conditional_15_For_68_Conditional_13_Template, 3, 2, "div", 47);
    i0.ɵɵelementStart(14, "p", 48);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 49);
    i0.ɵɵtemplate(18, AlertsComponent_Conditional_15_For_68_Conditional_18_Template, 2, 0, "span", 50);
    i0.ɵɵelementStart(19, "a", 51);
    i0.ɵɵtext(20);
    i0.ɵɵelementStart(21, "span", 7);
    i0.ɵɵtext(22, "\u2192");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const alert_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-tone", alert_r6.severity.toLowerCase());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.iconFor(alert_r6.type));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-tone", alert_r6.severity.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.severityLabel(alert_r6.severity), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.typeLabel(alert_r6.type));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(alert_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(alert_r6.message);
    i0.ɵɵadvance();
    i0.ɵɵconditional(alert_r6.studentName || alert_r6.classroomName ? 13 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" D\u00E9tect\u00E9e le ", i0.ɵɵpipeBind2(16, 12, alert_r6.createdAt, "dd/MM/yyyy \u00E0 HH:mm"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(alert_r6.severity === "CRITICAL" ? 18 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", ctx_r1.actionFor(alert_r6.type).route);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.actionFor(alert_r6.type).label, " ");
} }
function AlertsComponent_Conditional_15_ForEmpty_69_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 54);
    i0.ɵɵlistener("click", function AlertsComponent_Conditional_15_ForEmpty_69_Conditional_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.resetFilters()); });
    i0.ɵɵtext(1, " Afficher toutes les alertes ");
    i0.ɵɵelementEnd();
} }
function AlertsComponent_Conditional_15_ForEmpty_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38)(1, "span", 52);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, AlertsComponent_Conditional_15_ForEmpty_69_Conditional_7_Template, 2, 0, "button", 53);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.hasFilters() ? "\u2315" : "\u2713", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.hasFilters() ? "Aucune alerte ne correspond" : "Aucune alerte active");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.hasFilters() ? "Modifiez la recherche ou effacez les filtres pour retrouver les autres alertes." : "Les indicateurs de l'\u00E9tablissement ne signalent aucune situation \u00E0 traiter.", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasFilters() ? 7 : -1);
} }
function AlertsComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 10)(1, "button", 11);
    i0.ɵɵlistener("click", function AlertsComponent_Conditional_15_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.filterBy("ALL")); });
    i0.ɵɵelementStart(2, "span", 12);
    i0.ɵɵtext(3, "\u26A1");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span")(5, "strong", 13);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 14);
    i0.ɵɵtext(8, "alertes actives");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "button", 15);
    i0.ɵɵlistener("click", function AlertsComponent_Conditional_15_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.filterBy("CRITICAL")); });
    i0.ɵɵelementStart(10, "span", 12);
    i0.ɵɵtext(11, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span")(13, "strong", 13);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 14);
    i0.ɵɵtext(16, "critiques");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "button", 16);
    i0.ɵɵlistener("click", function AlertsComponent_Conditional_15_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.filterBy("WARNING")); });
    i0.ɵɵelementStart(18, "span", 12);
    i0.ɵɵtext(19, "\u25B3");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span")(21, "strong", 13);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 14);
    i0.ɵɵtext(24, "\u00E0 surveiller");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "button", 17);
    i0.ɵɵlistener("click", function AlertsComponent_Conditional_15_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.filterBy("INFO")); });
    i0.ɵɵelementStart(26, "span", 12);
    i0.ɵɵtext(27, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "span")(29, "strong", 13);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "span", 14);
    i0.ɵɵtext(32, "informatives");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(33, "section", 18)(34, "span", 19);
    i0.ɵɵtext(35, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div")(37, "p", 20);
    i0.ɵɵtext(38, "Une vue de travail, pas une bo\u00EEte de r\u00E9ception");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "p", 21);
    i0.ɵɵtext(40, " Les alertes sont g\u00E9n\u00E9r\u00E9es \u00E0 partir des donn\u00E9es de l'\u00E9tablissement. Ouvrez le module concern\u00E9 pour traiter la situation \u00E0 sa source. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(41, "section", 22)(42, "label", 23)(43, "span", 24);
    i0.ɵɵtext(44, "\u2315");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "span", 25);
    i0.ɵɵtext(46, "Rechercher une alerte");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "input", 26);
    i0.ɵɵlistener("input", function AlertsComponent_Conditional_15_Template_input_input_47_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setSearch($event.target.value)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "div", 27)(49, "button", 28);
    i0.ɵɵlistener("click", function AlertsComponent_Conditional_15_Template_button_click_49_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.filterBy("ALL")); });
    i0.ɵɵtext(50, "Toutes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "button", 29);
    i0.ɵɵlistener("click", function AlertsComponent_Conditional_15_Template_button_click_51_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.filterBy("CRITICAL")); });
    i0.ɵɵtext(52, "Critiques");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "button", 30);
    i0.ɵɵlistener("click", function AlertsComponent_Conditional_15_Template_button_click_53_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.filterBy("WARNING")); });
    i0.ɵɵtext(54, "Attention");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "button", 31);
    i0.ɵɵlistener("click", function AlertsComponent_Conditional_15_Template_button_click_55_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.filterBy("INFO")); });
    i0.ɵɵtext(56, "Informations");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(57, "section", 32)(58, "header", 33)(59, "div")(60, "h2", 34);
    i0.ɵɵtext(61, "Priorit\u00E9s actives");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "p");
    i0.ɵɵtext(63);
    i0.ɵɵtemplate(64, AlertsComponent_Conditional_15_Conditional_64_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(65, AlertsComponent_Conditional_15_Conditional_65_Template, 2, 0, "button", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "div", 36);
    i0.ɵɵrepeaterCreate(67, AlertsComponent_Conditional_15_For_68_Template, 23, 15, "article", 37, _forTrack0, false, AlertsComponent_Conditional_15_ForEmpty_69_Template, 8, 4, "div", 38);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("summary-card--selected", ctx_r1.severity() === "ALL");
    i0.ɵɵattribute("aria-pressed", ctx_r1.severity() === "ALL");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.alerts().length);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("summary-card--selected", ctx_r1.severity() === "CRITICAL");
    i0.ɵɵattribute("aria-pressed", ctx_r1.severity() === "CRITICAL");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.criticalCount());
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("summary-card--selected", ctx_r1.severity() === "WARNING");
    i0.ɵɵattribute("aria-pressed", ctx_r1.severity() === "WARNING");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.warningCount());
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("summary-card--selected", ctx_r1.severity() === "INFO");
    i0.ɵɵattribute("aria-pressed", ctx_r1.severity() === "INFO");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.infoCount());
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("value", ctx_r1.search());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("chip--on", ctx_r1.severity() === "ALL");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("chip--on", ctx_r1.severity() === "CRITICAL");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("chip--on", ctx_r1.severity() === "WARNING");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("chip--on", ctx_r1.severity() === "INFO");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.filteredAlerts().length, " r\u00E9sultat(s) ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasFilters() ? 64 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasFilters() ? 65 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.filteredAlerts());
} }
const SEVERITY_RANK = {
    CRITICAL: 0,
    WARNING: 1,
    INFO: 2
};
const TYPE_LABELS = {
    CLASS_FULL: 'Capacité des classes',
    PAYMENT_OVERDUE: 'Situation financière',
    GRADE_ENTRY_DELAY: 'Suivi pédagogique',
    STUDENT_REPEATED_ABSENCE: 'Assiduité',
    ABSENCE_REPEATED: 'Assiduité',
    ENROLLMENT_INCOMPLETE: 'Inscriptions',
    DOCUMENT_MISSING: 'Dossiers élèves',
    TIMETABLE_CONFLICT: 'Emploi du temps'
};
const TYPE_ACTIONS = {
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
export class AlertsComponent {
    dataSource = inject(DASHBOARD_DATA_SOURCE);
    ws = inject(WebSocketService);
    destroyRef = inject(DestroyRef);
    alerts = signal([]);
    loading = signal(true);
    error = signal(false);
    lastRefresh = signal(null);
    search = signal('');
    severity = signal('ALL');
    criticalCount = computed(() => this.count('CRITICAL'));
    warningCount = computed(() => this.count('WARNING'));
    infoCount = computed(() => this.count('INFO'));
    filteredAlerts = computed(() => {
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
    hasFilters = computed(() => this.search().trim().length > 0
        || this.severity() !== 'ALL');
    ngOnInit() {
        this.load();
        this.ws.on(WS_EVENTS.ALERT_CREATED)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.load(true));
    }
    load(silent = false) {
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
    setSearch(value) {
        this.search.set(value);
    }
    filterBy(severity) {
        this.severity.set(severity);
    }
    resetFilters() {
        this.search.set('');
        this.severity.set('ALL');
    }
    severityLabel(severity) {
        return ({ INFO: 'Information', WARNING: 'Attention', CRITICAL: 'Critique' })[severity];
    }
    typeLabel(type) {
        return TYPE_LABELS[type] ?? type.replaceAll('_', ' ').toLocaleLowerCase('fr');
    }
    actionFor(type) {
        return TYPE_ACTIONS[type] ?? { label: 'Ouvrir le tableau de bord', route: '/dashboard' };
    }
    iconFor(type) {
        if (type.includes('PAYMENT'))
            return '₣';
        if (type.includes('ABSENCE'))
            return 'A';
        if (type.includes('GRADE'))
            return 'N';
        if (type.includes('CLASS'))
            return 'C';
        if (type.includes('DOCUMENT') || type.includes('ENROLLMENT'))
            return 'D';
        return '!';
    }
    count(severity) {
        return this.alerts().filter((alert) => alert.severity === severity).length;
    }
    static ɵfac = function AlertsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AlertsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AlertsComponent, selectors: [["eduops-alerts"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 16, vars: 3, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta"], [1, "refresh-time"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], ["aria-hidden", "true"], ["message", "Chargement des alertes\u2026"], [3, "retry"], ["aria-label", "R\u00E9sum\u00E9 des alertes", 1, "summary"], ["type", "button", 1, "summary-card", "summary-card--all", 3, "click"], ["aria-hidden", "true", 1, "summary-card__icon"], [1, "summary-card__value", "numeric"], [1, "summary-card__label"], ["type", "button", 1, "summary-card", "summary-card--critical", 3, "click"], ["type", "button", 1, "summary-card", "summary-card--warning", 3, "click"], ["type", "button", 1, "summary-card", "summary-card--info", 3, "click"], ["aria-label", "Fonctionnement des alertes", 1, "notice"], ["aria-hidden", "true", 1, "notice__icon"], [1, "notice__title"], [1, "notice__text"], ["aria-label", "Filtres des alertes", 1, "toolbar"], [1, "search-field"], ["aria-hidden", "true", 1, "search-field__icon"], [1, "visually-hidden"], ["type", "search", "placeholder", "Rechercher un \u00E9l\u00E8ve, une classe ou un sujet\u2026", 1, "input", 3, "input", "value"], ["role", "group", "aria-label", "Filtrer par priorit\u00E9", 1, "severity-filter"], ["type", "button", 1, "chip", 3, "click"], ["type", "button", 1, "chip", "chip--critical", 3, "click"], ["type", "button", 1, "chip", "chip--warning", 3, "click"], ["type", "button", 1, "chip", "chip--info", 3, "click"], ["aria-labelledby", "alerts-heading", 1, "alerts-section"], [1, "alerts-section__head"], ["id", "alerts-heading"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm"], [1, "alert-list"], [1, "alert-row"], [1, "empty-state"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["aria-hidden", "true", 1, "alert-row__symbol"], [1, "alert-row__content"], [1, "alert-row__eyebrow"], [1, "severity"], [1, "alert-row__domain"], [1, "alert-row__title"], [1, "alert-row__message"], [1, "alert-row__context"], [1, "alert-row__date"], [1, "alert-row__action"], [1, "priority-note"], [1, "btn", "btn--secondary", "btn--sm", 3, "routerLink"], ["aria-hidden", "true", 1, "empty-state__icon"], ["type", "button", 1, "btn", "btn--secondary"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"]], template: function AlertsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Centre d'alertes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, " Les situations qui demandent l'attention de l'\u00E9quipe, class\u00E9es par priorit\u00E9. ");
            i0.ɵɵtemplate(7, AlertsComponent_Conditional_7_Template, 3, 4, "span", 4);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 5)(9, "button", 6);
            i0.ɵɵlistener("click", function AlertsComponent_Template_button_click_9_listener() { return ctx.load(); });
            i0.ɵɵelementStart(10, "span", 7);
            i0.ɵɵtext(11, "\u21BB");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(12, " Actualiser ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(13, AlertsComponent_Conditional_13_Template, 1, 0, "eduops-loading-state", 8)(14, AlertsComponent_Conditional_14_Template, 1, 0, "eduops-error-state")(15, AlertsComponent_Conditional_15_Template, 70, 29);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵadvance(7);
            i0.ɵɵconditional((tmp_0_0 = ctx.lastRefresh()) ? 7 : -1, tmp_0_0);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.loading() ? 13 : ctx.error() ? 14 : 15);
        } }, dependencies: [CommonModule, i1.DatePipe, RouterLink, LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.refresh-time[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-left: var(--space-2);\n  color: var(--text-light);\n}\n\n.summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: var(--space-4);\n  margin-bottom: var(--space-5);\n}\n\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  min-width: 0;\n  padding: var(--space-4);\n  text-align: left;\n  color: var(--text-normal);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n  cursor: pointer;\n  transition: border-color var(--transition-fast), transform var(--transition-fast),\n    box-shadow var(--transition-fast);\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: var(--shadow-sm);\n  }\n\n  &--selected {\n    border-color: var(--brand);\n    box-shadow: 0 0 0 2px var(--brand-tint);\n  }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 42px;\n    height: 42px;\n    font-size: var(--text-lg);\n    font-weight: 800;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border-radius: 12px;\n  }\n\n  &__value {\n    display: block;\n    font-size: var(--text-2xl);\n    line-height: var(--leading-tight);\n    color: var(--text-strong);\n  }\n\n  &__label {\n    display: block;\n    margin-top: 2px;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n\n  &--critical &__icon { color: var(--danger); background: var(--danger-bg); }\n  &--warning &__icon { color: var(--warning); background: var(--warning-bg); }\n  &--info &__icon { color: var(--info); background: var(--info-bg); }\n  &--all &__icon { color: var(--brand); background: var(--brand-tint); }\n}\n\n.notice[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--brand-tint);\n  border: 1px solid var(--brand-tint-border);\n  border-radius: var(--radius-card);\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 24px;\n    height: 24px;\n    font-weight: 800;\n    color: var(--text-on-brand);\n    background: var(--brand);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 700; color: var(--text-strong); }\n  &__text { margin: 3px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  flex-wrap: wrap;\n}\n\n.search-field[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1 1 320px;\n  max-width: 540px;\n\n  &__icon {\n    position: absolute;\n    top: 50%;\n    left: var(--space-3);\n    z-index: 1;\n    color: var(--text-light);\n    transform: translateY(-50%);\n    pointer-events: none;\n  }\n\n  .input { padding-left: 36px; }\n}\n\n.severity-filter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  flex-wrap: wrap;\n}\n\n.chip[_ngcontent-%COMP%] {\n  min-height: 34px;\n  padding: 0 var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-pill);\n  cursor: pointer;\n\n  &:hover { background: var(--surface-hover); }\n\n  &--on {\n    font-weight: 600;\n    color: var(--brand);\n    background: var(--brand-tint);\n    border-color: var(--brand-tint-border);\n  }\n\n  &--critical.chip--on { color: var(--danger); background: var(--danger-bg); border-color: var(--danger); }\n  &--warning.chip--on { color: var(--warning); background: var(--warning-bg); border-color: var(--warning); }\n  &--info.chip--on { color: var(--info); background: var(--info-bg); border-color: var(--info); }\n}\n\n.alerts-section[_ngcontent-%COMP%] {\n  &__head {\n    display: flex;\n    align-items: flex-end;\n    justify-content: space-between;\n    gap: var(--space-4);\n    margin-bottom: var(--space-3);\n\n    h2 { margin: 0; font-size: var(--text-lg); color: var(--text-strong); }\n    p { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n  }\n}\n\n.alert-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n\n.alert-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  gap: var(--space-4);\n  padding: var(--space-5);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 4px solid var(--border-strong);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n\n  &[data-tone='critical'] { border-left-color: var(--danger); }\n  &[data-tone='warning'] { border-left-color: var(--warning); }\n  &[data-tone='info'] { border-left-color: var(--info); }\n\n  &__symbol {\n    display: grid;\n    place-items: center;\n    width: 42px;\n    height: 42px;\n    font-size: var(--text-md);\n    font-weight: 800;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border-radius: 12px;\n  }\n\n  &[data-tone='critical'] &__symbol { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='warning'] &__symbol { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='info'] &__symbol { color: var(--info); background: var(--info-bg); }\n\n  &__eyebrow {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    margin-bottom: var(--space-2);\n    flex-wrap: wrap;\n  }\n\n  &__domain { font-size: var(--text-xs); color: var(--text-light); }\n  &__title { margin: 0 0 var(--space-2); font-size: var(--text-md); color: var(--text-strong); }\n  &__message { max-width: 78ch; margin: 0; line-height: var(--leading-relaxed); color: var(--text-normal); }\n\n  &__context {\n    display: flex;\n    gap: var(--space-2);\n    margin-top: var(--space-3);\n    flex-wrap: wrap;\n\n    span {\n      padding: 3px var(--space-2);\n      font-size: var(--text-xs);\n      color: var(--text-muted);\n      background: var(--surface-sunken);\n      border-radius: var(--radius-badge);\n    }\n\n    strong { color: var(--text-normal); }\n  }\n\n  &__date { margin: var(--space-3) 0 0; font-size: var(--text-xs); color: var(--text-light); }\n\n  &__action {\n    display: flex;\n    align-items: flex-end;\n    justify-content: space-between;\n    flex-direction: column;\n    gap: var(--space-3);\n    min-width: 170px;\n  }\n}\n\n.severity[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 22px;\n  padding: 0 var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 700;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='critical'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='warning'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='info'] { color: var(--info); background: var(--info-bg); }\n}\n\n.priority-note[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  font-weight: 700;\n  color: var(--danger);\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: var(--space-12) var(--space-5);\n  text-align: center;\n  background: var(--surface-card);\n  border: 1px dashed var(--border-strong);\n  border-radius: var(--radius-card);\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    width: 48px;\n    height: 48px;\n    margin-bottom: var(--space-3);\n    font-size: var(--text-xl);\n    font-weight: 700;\n    color: var(--success);\n    background: var(--success-bg);\n    border-radius: 50%;\n  }\n\n  h3 { margin: 0; color: var(--text-strong); }\n  p { max-width: 520px; margin: var(--space-2) 0 var(--space-4); color: var(--text-muted); }\n}\n\n@include tablet-down {\n  .summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n  .alert-row { grid-template-columns: auto minmax(0, 1fr); }\n  .alert-row__action {\n    grid-column: 2;\n    align-items: center;\n    justify-content: flex-start;\n    flex-direction: row;\n  }\n}\n\n@include mobile {\n  .summary { grid-template-columns: 1fr 1fr; gap: var(--space-2); }\n  .summary-card { padding: var(--space-3); }\n  .summary-card__icon { width: 36px; height: 36px; }\n  .summary-card__value { font-size: var(--text-xl); }\n\n  .toolbar { align-items: stretch; padding: var(--space-3); }\n  .search-field { flex-basis: 100%; max-width: none; }\n  .severity-filter { width: 100%; }\n  .chip { flex: 1 1 auto; }\n\n  .alert-row {\n    grid-template-columns: 1fr;\n    padding: var(--space-4);\n  }\n  .alert-row__symbol { width: 36px; height: 36px; }\n  .alert-row__action { grid-column: 1; align-items: flex-start; flex-direction: column; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AlertsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-alerts', standalone: true, imports: [CommonModule, RouterLink, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Centre d'alertes</h1>\n      <p class=\"page__meta\">\n        Les situations qui demandent l'attention de l'\u00E9quipe, class\u00E9es par priorit\u00E9.\n        @if (lastRefresh(); as refreshed) {\n          <span class=\"refresh-time\">Actualis\u00E9 \u00E0 {{ refreshed | date:'HH:mm:ss' }}</span>\n        }\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      <button type=\"button\" class=\"btn btn--secondary\" [disabled]=\"loading()\"\n              (click)=\"load()\">\n        <span aria-hidden=\"true\">\u21BB</span>\n        Actualiser\n      </button>\n    </div>\n  </header>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des alertes\u2026\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n    <section class=\"summary\" aria-label=\"R\u00E9sum\u00E9 des alertes\">\n      <button type=\"button\" class=\"summary-card summary-card--all\"\n              [class.summary-card--selected]=\"severity() === 'ALL'\"\n              [attr.aria-pressed]=\"severity() === 'ALL'\"\n              (click)=\"filterBy('ALL')\">\n        <span class=\"summary-card__icon\" aria-hidden=\"true\">\u26A1</span>\n        <span>\n          <strong class=\"summary-card__value numeric\">{{ alerts().length }}</strong>\n          <span class=\"summary-card__label\">alertes actives</span>\n        </span>\n      </button>\n\n      <button type=\"button\" class=\"summary-card summary-card--critical\"\n              [class.summary-card--selected]=\"severity() === 'CRITICAL'\"\n              [attr.aria-pressed]=\"severity() === 'CRITICAL'\"\n              (click)=\"filterBy('CRITICAL')\">\n        <span class=\"summary-card__icon\" aria-hidden=\"true\">!</span>\n        <span>\n          <strong class=\"summary-card__value numeric\">{{ criticalCount() }}</strong>\n          <span class=\"summary-card__label\">critiques</span>\n        </span>\n      </button>\n\n      <button type=\"button\" class=\"summary-card summary-card--warning\"\n              [class.summary-card--selected]=\"severity() === 'WARNING'\"\n              [attr.aria-pressed]=\"severity() === 'WARNING'\"\n              (click)=\"filterBy('WARNING')\">\n        <span class=\"summary-card__icon\" aria-hidden=\"true\">\u25B3</span>\n        <span>\n          <strong class=\"summary-card__value numeric\">{{ warningCount() }}</strong>\n          <span class=\"summary-card__label\">\u00E0 surveiller</span>\n        </span>\n      </button>\n\n      <button type=\"button\" class=\"summary-card summary-card--info\"\n              [class.summary-card--selected]=\"severity() === 'INFO'\"\n              [attr.aria-pressed]=\"severity() === 'INFO'\"\n              (click)=\"filterBy('INFO')\">\n        <span class=\"summary-card__icon\" aria-hidden=\"true\">i</span>\n        <span>\n          <strong class=\"summary-card__value numeric\">{{ infoCount() }}</strong>\n          <span class=\"summary-card__label\">informatives</span>\n        </span>\n      </button>\n    </section>\n\n    <section class=\"notice\" aria-label=\"Fonctionnement des alertes\">\n      <span class=\"notice__icon\" aria-hidden=\"true\">i</span>\n      <div>\n        <p class=\"notice__title\">Une vue de travail, pas une bo\u00EEte de r\u00E9ception</p>\n        <p class=\"notice__text\">\n          Les alertes sont g\u00E9n\u00E9r\u00E9es \u00E0 partir des donn\u00E9es de l'\u00E9tablissement.\n          Ouvrez le module concern\u00E9 pour traiter la situation \u00E0 sa source.\n        </p>\n      </div>\n    </section>\n\n    <section class=\"toolbar\" aria-label=\"Filtres des alertes\">\n      <label class=\"search-field\">\n        <span class=\"search-field__icon\" aria-hidden=\"true\">\u2315</span>\n        <span class=\"visually-hidden\">Rechercher une alerte</span>\n        <input class=\"input\" type=\"search\" [value]=\"search()\"\n               placeholder=\"Rechercher un \u00E9l\u00E8ve, une classe ou un sujet\u2026\"\n               (input)=\"setSearch($any($event.target).value)\">\n      </label>\n\n      <div class=\"severity-filter\" role=\"group\" aria-label=\"Filtrer par priorit\u00E9\">\n        <button type=\"button\" class=\"chip\" [class.chip--on]=\"severity() === 'ALL'\"\n                (click)=\"filterBy('ALL')\">Toutes</button>\n        <button type=\"button\" class=\"chip chip--critical\"\n                [class.chip--on]=\"severity() === 'CRITICAL'\"\n                (click)=\"filterBy('CRITICAL')\">Critiques</button>\n        <button type=\"button\" class=\"chip chip--warning\"\n                [class.chip--on]=\"severity() === 'WARNING'\"\n                (click)=\"filterBy('WARNING')\">Attention</button>\n        <button type=\"button\" class=\"chip chip--info\"\n                [class.chip--on]=\"severity() === 'INFO'\"\n                (click)=\"filterBy('INFO')\">Informations</button>\n      </div>\n    </section>\n\n    <section class=\"alerts-section\" aria-labelledby=\"alerts-heading\">\n      <header class=\"alerts-section__head\">\n        <div>\n          <h2 id=\"alerts-heading\">Priorit\u00E9s actives</h2>\n          <p>\n            {{ filteredAlerts().length }} r\u00E9sultat(s)\n            @if (hasFilters()) { sur {{ alerts().length }} }\n          </p>\n        </div>\n        @if (hasFilters()) {\n          <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"resetFilters()\">\n            Effacer les filtres\n          </button>\n        }\n      </header>\n\n      <div class=\"alert-list\">\n        @for (alert of filteredAlerts(); track alert.id) {\n          <article class=\"alert-row\" [attr.data-tone]=\"alert.severity.toLowerCase()\">\n            <div class=\"alert-row__symbol\" aria-hidden=\"true\">{{ iconFor(alert.type) }}</div>\n\n            <div class=\"alert-row__content\">\n              <div class=\"alert-row__eyebrow\">\n                <span class=\"severity\" [attr.data-tone]=\"alert.severity.toLowerCase()\">\n                  {{ severityLabel(alert.severity) }}\n                </span>\n                <span class=\"alert-row__domain\">{{ typeLabel(alert.type) }}</span>\n              </div>\n\n              <h3 class=\"alert-row__title\">{{ alert.title }}</h3>\n              <p class=\"alert-row__message\">{{ alert.message }}</p>\n\n              @if (alert.studentName || alert.classroomName) {\n                <div class=\"alert-row__context\">\n                  @if (alert.studentName) {\n                    <span><strong>\u00C9l\u00E8ve</strong> {{ alert.studentName }}</span>\n                  }\n                  @if (alert.classroomName) {\n                    <span><strong>Classe</strong> {{ alert.classroomName }}</span>\n                  }\n                </div>\n              }\n\n              <p class=\"alert-row__date\">\n                D\u00E9tect\u00E9e le {{ alert.createdAt | date:'dd/MM/yyyy \u00E0 HH:mm' }}\n              </p>\n            </div>\n\n            <div class=\"alert-row__action\">\n              @if (alert.severity === 'CRITICAL') {\n                <span class=\"priority-note\">\u00C0 traiter en priorit\u00E9</span>\n              }\n              <a class=\"btn btn--secondary btn--sm\" [routerLink]=\"actionFor(alert.type).route\">\n                {{ actionFor(alert.type).label }}\n                <span aria-hidden=\"true\">\u2192</span>\n              </a>\n            </div>\n          </article>\n        } @empty {\n          <div class=\"empty-state\">\n            <span class=\"empty-state__icon\" aria-hidden=\"true\">\n              {{ hasFilters() ? '\u2315' : '\u2713' }}\n            </span>\n            <h3>{{ hasFilters() ? 'Aucune alerte ne correspond' : 'Aucune alerte active' }}</h3>\n            <p>\n              {{ hasFilters()\n                ? 'Modifiez la recherche ou effacez les filtres pour retrouver les autres alertes.'\n                : \"Les indicateurs de l'\u00E9tablissement ne signalent aucune situation \u00E0 traiter.\" }}\n            </p>\n            @if (hasFilters()) {\n              <button type=\"button\" class=\"btn btn--secondary\" (click)=\"resetFilters()\">\n                Afficher toutes les alertes\n              </button>\n            }\n          </div>\n        }\n      </div>\n    </section>\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n.refresh-time {\n  display: inline-block;\n  margin-left: var(--space-2);\n  color: var(--text-light);\n}\n\n.summary {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: var(--space-4);\n  margin-bottom: var(--space-5);\n}\n\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  min-width: 0;\n  padding: var(--space-4);\n  text-align: left;\n  color: var(--text-normal);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n  cursor: pointer;\n  transition: border-color var(--transition-fast), transform var(--transition-fast),\n    box-shadow var(--transition-fast);\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: var(--shadow-sm);\n  }\n\n  &--selected {\n    border-color: var(--brand);\n    box-shadow: 0 0 0 2px var(--brand-tint);\n  }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 42px;\n    height: 42px;\n    font-size: var(--text-lg);\n    font-weight: 800;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border-radius: 12px;\n  }\n\n  &__value {\n    display: block;\n    font-size: var(--text-2xl);\n    line-height: var(--leading-tight);\n    color: var(--text-strong);\n  }\n\n  &__label {\n    display: block;\n    margin-top: 2px;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n\n  &--critical &__icon { color: var(--danger); background: var(--danger-bg); }\n  &--warning &__icon { color: var(--warning); background: var(--warning-bg); }\n  &--info &__icon { color: var(--info); background: var(--info-bg); }\n  &--all &__icon { color: var(--brand); background: var(--brand-tint); }\n}\n\n.notice {\n  display: flex;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--brand-tint);\n  border: 1px solid var(--brand-tint-border);\n  border-radius: var(--radius-card);\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 24px;\n    height: 24px;\n    font-weight: 800;\n    color: var(--text-on-brand);\n    background: var(--brand);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 700; color: var(--text-strong); }\n  &__text { margin: 3px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  flex-wrap: wrap;\n}\n\n.search-field {\n  position: relative;\n  flex: 1 1 320px;\n  max-width: 540px;\n\n  &__icon {\n    position: absolute;\n    top: 50%;\n    left: var(--space-3);\n    z-index: 1;\n    color: var(--text-light);\n    transform: translateY(-50%);\n    pointer-events: none;\n  }\n\n  .input { padding-left: 36px; }\n}\n\n.severity-filter {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  flex-wrap: wrap;\n}\n\n.chip {\n  min-height: 34px;\n  padding: 0 var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-pill);\n  cursor: pointer;\n\n  &:hover { background: var(--surface-hover); }\n\n  &--on {\n    font-weight: 600;\n    color: var(--brand);\n    background: var(--brand-tint);\n    border-color: var(--brand-tint-border);\n  }\n\n  &--critical.chip--on { color: var(--danger); background: var(--danger-bg); border-color: var(--danger); }\n  &--warning.chip--on { color: var(--warning); background: var(--warning-bg); border-color: var(--warning); }\n  &--info.chip--on { color: var(--info); background: var(--info-bg); border-color: var(--info); }\n}\n\n.alerts-section {\n  &__head {\n    display: flex;\n    align-items: flex-end;\n    justify-content: space-between;\n    gap: var(--space-4);\n    margin-bottom: var(--space-3);\n\n    h2 { margin: 0; font-size: var(--text-lg); color: var(--text-strong); }\n    p { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n  }\n}\n\n.alert-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n\n.alert-row {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  gap: var(--space-4);\n  padding: var(--space-5);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 4px solid var(--border-strong);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n\n  &[data-tone='critical'] { border-left-color: var(--danger); }\n  &[data-tone='warning'] { border-left-color: var(--warning); }\n  &[data-tone='info'] { border-left-color: var(--info); }\n\n  &__symbol {\n    display: grid;\n    place-items: center;\n    width: 42px;\n    height: 42px;\n    font-size: var(--text-md);\n    font-weight: 800;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border-radius: 12px;\n  }\n\n  &[data-tone='critical'] &__symbol { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='warning'] &__symbol { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='info'] &__symbol { color: var(--info); background: var(--info-bg); }\n\n  &__eyebrow {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    margin-bottom: var(--space-2);\n    flex-wrap: wrap;\n  }\n\n  &__domain { font-size: var(--text-xs); color: var(--text-light); }\n  &__title { margin: 0 0 var(--space-2); font-size: var(--text-md); color: var(--text-strong); }\n  &__message { max-width: 78ch; margin: 0; line-height: var(--leading-relaxed); color: var(--text-normal); }\n\n  &__context {\n    display: flex;\n    gap: var(--space-2);\n    margin-top: var(--space-3);\n    flex-wrap: wrap;\n\n    span {\n      padding: 3px var(--space-2);\n      font-size: var(--text-xs);\n      color: var(--text-muted);\n      background: var(--surface-sunken);\n      border-radius: var(--radius-badge);\n    }\n\n    strong { color: var(--text-normal); }\n  }\n\n  &__date { margin: var(--space-3) 0 0; font-size: var(--text-xs); color: var(--text-light); }\n\n  &__action {\n    display: flex;\n    align-items: flex-end;\n    justify-content: space-between;\n    flex-direction: column;\n    gap: var(--space-3);\n    min-width: 170px;\n  }\n}\n\n.severity {\n  display: inline-flex;\n  align-items: center;\n  min-height: 22px;\n  padding: 0 var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 700;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='critical'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='warning'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='info'] { color: var(--info); background: var(--info-bg); }\n}\n\n.priority-note {\n  font-size: var(--text-xs);\n  font-weight: 700;\n  color: var(--danger);\n}\n\n.empty-state {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: var(--space-12) var(--space-5);\n  text-align: center;\n  background: var(--surface-card);\n  border: 1px dashed var(--border-strong);\n  border-radius: var(--radius-card);\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    width: 48px;\n    height: 48px;\n    margin-bottom: var(--space-3);\n    font-size: var(--text-xl);\n    font-weight: 700;\n    color: var(--success);\n    background: var(--success-bg);\n    border-radius: 50%;\n  }\n\n  h3 { margin: 0; color: var(--text-strong); }\n  p { max-width: 520px; margin: var(--space-2) 0 var(--space-4); color: var(--text-muted); }\n}\n\n@include tablet-down {\n  .summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n  .alert-row { grid-template-columns: auto minmax(0, 1fr); }\n  .alert-row__action {\n    grid-column: 2;\n    align-items: center;\n    justify-content: flex-start;\n    flex-direction: row;\n  }\n}\n\n@include mobile {\n  .summary { grid-template-columns: 1fr 1fr; gap: var(--space-2); }\n  .summary-card { padding: var(--space-3); }\n  .summary-card__icon { width: 36px; height: 36px; }\n  .summary-card__value { font-size: var(--text-xl); }\n\n  .toolbar { align-items: stretch; padding: var(--space-3); }\n  .search-field { flex-basis: 100%; max-width: none; }\n  .severity-filter { width: 100%; }\n  .chip { flex: 1 1 auto; }\n\n  .alert-row {\n    grid-template-columns: 1fr;\n    padding: var(--space-4);\n  }\n  .alert-row__symbol { width: 36px; height: 36px; }\n  .alert-row__action { grid-column: 1; align-items: flex-start; flex-direction: column; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AlertsComponent, { className: "AlertsComponent", filePath: "frontend/src/app/features/alerts/alerts.component.ts", lineNumber: 65 }); })();
//# sourceMappingURL=alerts.component.js.map