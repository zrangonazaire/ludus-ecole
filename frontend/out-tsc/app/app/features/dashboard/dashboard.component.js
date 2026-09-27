import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DASHBOARD_DATA_SOURCE } from '@core/datasource/data-source';
import { WebSocketService } from '@core/websocket/websocket.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { WS_EVENTS } from '@core/websocket/websocket-events';
import { KpiCardComponent } from '@shared/ui/kpi-card/kpi-card.component';
import { ChartCardComponent } from '@shared/ui/chart-card/chart-card.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { SetupProgressComponent } from '@shared/ui/setup-progress/setup-progress.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.key;
const _forTrack1 = ($index, $item) => $item.id;
const _forTrack2 = ($index, $item) => $item.studentId;
function DashboardComponent_Conditional_5_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2);
} if (rf & 2) {
    const dashboard_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", dashboard_r1.currentTerm.name, " ");
} }
function DashboardComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 3)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 9);
    i0.ɵɵtext(4, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5);
    i0.ɵɵtemplate(6, DashboardComponent_Conditional_5_Conditional_6_Template, 3, 1);
    i0.ɵɵelementStart(7, "span", 9);
    i0.ɵɵtext(8, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dashboard_r1 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dashboard_r1.academicYear.code);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", dashboard_r1.campusName, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(dashboard_r1.currentTerm ? 6 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r1.today(), " ");
} }
function DashboardComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 8);
} }
function DashboardComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 10);
    i0.ɵɵlistener("retry", function DashboardComponent_Conditional_17_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function DashboardComponent_Conditional_18_Conditional_0_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-kpi-card", 12);
} if (rf & 2) {
    const kpi_r4 = ctx.$implicit;
    i0.ɵɵproperty("kpi", kpi_r4);
} }
function DashboardComponent_Conditional_18_Conditional_0_For_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 24);
    i0.ɵɵelement(1, "eduops-avatar", 33);
    i0.ɵɵelementStart(2, "div", 34)(3, "p", 35);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 36);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "eduops-status-badge", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const enrollment_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", enrollment_r5.studentName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(enrollment_r5.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", enrollment_r5.studentNumber, " \u2014 ", enrollment_r5.classroomName, "");
    i0.ɵɵadvance();
    i0.ɵɵproperty("status", enrollment_r5.status);
} }
function DashboardComponent_Conditional_18_Conditional_0_ForEmpty_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 25);
    i0.ɵɵtext(1, "Aucune inscription recente.");
    i0.ɵɵelementEnd();
} }
function DashboardComponent_Conditional_18_Conditional_0_For_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 24);
    i0.ɵɵelement(1, "eduops-avatar", 33);
    i0.ɵɵelementStart(2, "div", 34)(3, "p", 35);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 36);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "eduops-status-badge", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const absence_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", absence_r6.studentName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(absence_r6.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(absence_r6.studentNumber);
    i0.ɵɵadvance();
    i0.ɵɵproperty("status", absence_r6.status);
} }
function DashboardComponent_Conditional_18_Conditional_0_ForEmpty_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 25);
    i0.ɵɵtext(1, "Aucune absence signalee aujourd'hui.");
    i0.ɵɵelementEnd();
} }
function DashboardComponent_Conditional_18_Conditional_0_For_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 24)(1, "div", 34)(2, "p", 35);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 36);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 38);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "money");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const payment_r7 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(payment_r7.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(payment_r7.receiptNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 3, payment_r7.amount));
} }
function DashboardComponent_Conditional_18_Conditional_0_ForEmpty_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 25);
    i0.ɵɵtext(1, "Aucun paiement enregistr\u00E9.");
    i0.ɵɵelementEnd();
} }
function DashboardComponent_Conditional_18_Conditional_0_For_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 29);
    i0.ɵɵelement(1, "span", 39);
    i0.ɵɵelementStart(2, "div", 34)(3, "p", 35);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 40);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const alert_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵclassMap("alert-dot--" + alert_r8.severity.toLowerCase());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(alert_r8.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(alert_r8.message);
} }
function DashboardComponent_Conditional_18_Conditional_0_ForEmpty_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 25);
    i0.ɵɵtext(1, "Aucune alerte active.");
    i0.ɵɵelementEnd();
} }
function DashboardComponent_Conditional_18_Conditional_0_For_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 24)(1, "div", 34)(2, "p", 35);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 40);
    i0.ɵɵtext(5);
    i0.ɵɵelementStart(6, "span", 9);
    i0.ɵɵtext(7, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(10, "eduops-status-badge", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const assessment_r9 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(assessment_r9.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", assessment_r9.classroomName, " \u2014 ", assessment_r9.subjectName, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(9, 5, assessment_r9.assessmentDate, "dd/MM"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("status", assessment_r9.status);
} }
function DashboardComponent_Conditional_18_Conditional_0_ForEmpty_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 25);
    i0.ɵɵtext(1, "Aucune \u00E9valuation programmee.");
    i0.ɵɵelementEnd();
} }
function DashboardComponent_Conditional_18_Conditional_0_For_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 24)(1, "div", 34)(2, "p", 35);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 36);
    i0.ɵɵtext(5);
    i0.ɵɵelementStart(6, "span", 9);
    i0.ɵɵtext(7, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(9, "eduops-status-badge", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r10 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(classroom_r10.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", classroom_r10.activeEnrollments, "/", classroom_r10.capacityMaximum, " \u00E9l\u00E8ves ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", classroom_r10.occupancyRate, " % ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("status", classroom_r10.capacityStatus);
} }
function DashboardComponent_Conditional_18_Conditional_0_ForEmpty_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 25);
    i0.ɵɵtext(1, "Toutes les classes sont dans les seuils.");
    i0.ɵɵelementEnd();
} }
function DashboardComponent_Conditional_18_Conditional_0_Conditional_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 32);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Derni\u00E8re actualisation : ", i0.ɵɵpipeBind2(2, 1, ctx, "HH:mm:ss"), "");
} }
function DashboardComponent_Conditional_18_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 11);
    i0.ɵɵrepeaterCreate(1, DashboardComponent_Conditional_18_Conditional_0_For_2_Template, 1, 1, "eduops-kpi-card", 12, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "section", 13);
    i0.ɵɵelement(4, "eduops-chart-card", 14)(5, "eduops-chart-card", 15)(6, "eduops-chart-card", 16)(7, "eduops-chart-card", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "section", 18)(9, "article", 19)(10, "header", 20)(11, "h3", 21);
    i0.ɵɵtext(12, "Derni\u00E8res inscriptions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "a", 22);
    i0.ɵɵtext(14, "Tout voir");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "ul", 23);
    i0.ɵɵrepeaterCreate(16, DashboardComponent_Conditional_18_Conditional_0_For_17_Template, 8, 5, "li", 24, _forTrack1, false, DashboardComponent_Conditional_18_Conditional_0_ForEmpty_18_Template, 2, 0, "li", 25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "article", 19)(20, "header", 20)(21, "h3", 21);
    i0.ɵɵtext(22, "Absences du jour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 26);
    i0.ɵɵtext(24, "LIVE");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "ul", 23);
    i0.ɵɵrepeaterCreate(26, DashboardComponent_Conditional_18_Conditional_0_For_27_Template, 8, 4, "li", 24, _forTrack2, false, DashboardComponent_Conditional_18_Conditional_0_ForEmpty_28_Template, 2, 0, "li", 25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "article", 19)(30, "header", 20)(31, "h3", 21);
    i0.ɵɵtext(32, "Encaissements recents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "a", 27);
    i0.ɵɵtext(34, "Tout voir");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "ul", 23);
    i0.ɵɵrepeaterCreate(36, DashboardComponent_Conditional_18_Conditional_0_For_37_Template, 9, 5, "li", 24, _forTrack1, false, DashboardComponent_Conditional_18_Conditional_0_ForEmpty_38_Template, 2, 0, "li", 25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "article", 19)(40, "header", 20)(41, "h3", 21);
    i0.ɵɵtext(42, "Alertes importantes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "a", 28);
    i0.ɵɵtext(44, "Tout voir");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "ul", 23);
    i0.ɵɵrepeaterCreate(46, DashboardComponent_Conditional_18_Conditional_0_For_47_Template, 7, 4, "li", 29, _forTrack1, false, DashboardComponent_Conditional_18_Conditional_0_ForEmpty_48_Template, 2, 0, "li", 25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(49, "article", 19)(50, "header", 20)(51, "h3", 21);
    i0.ɵɵtext(52, "\u00C9valuations a venir");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "a", 30);
    i0.ɵɵtext(54, "Tout voir");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(55, "ul", 23);
    i0.ɵɵrepeaterCreate(56, DashboardComponent_Conditional_18_Conditional_0_For_57_Template, 11, 8, "li", 24, _forTrack1, false, DashboardComponent_Conditional_18_Conditional_0_ForEmpty_58_Template, 2, 0, "li", 25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(59, "article", 19)(60, "header", 20)(61, "h3", 21);
    i0.ɵɵtext(62, "Classes a surveiller");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "a", 31);
    i0.ɵɵtext(64, "Tout voir");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "ul", 23);
    i0.ɵɵrepeaterCreate(66, DashboardComponent_Conditional_18_Conditional_0_For_67_Template, 10, 5, "li", 24, _forTrack1, false, DashboardComponent_Conditional_18_Conditional_0_ForEmpty_68_Template, 2, 0, "li", 25);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(69, DashboardComponent_Conditional_18_Conditional_0_Conditional_69_Template, 3, 4, "p", 32);
} if (rf & 2) {
    let tmp_14_0;
    const dashboard_r11 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(dashboard_r11.kpis);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("data", dashboard_r11.enrollmentByLevel);
    i0.ɵɵadvance();
    i0.ɵɵproperty("data", dashboard_r11.attendanceTrend);
    i0.ɵɵadvance();
    i0.ɵɵproperty("data", dashboard_r11.academicPerformance);
    i0.ɵɵadvance();
    i0.ɵɵproperty("data", dashboard_r11.monthlyCollections);
    i0.ɵɵadvance(9);
    i0.ɵɵrepeater(dashboard_r11.recentEnrollments);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(dashboard_r11.todayAbsences);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(dashboard_r11.recentPayments);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(dashboard_r11.alerts);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(dashboard_r11.upcomingAssessments);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(dashboard_r11.classesNeedingAttention);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((tmp_14_0 = ctx_r1.lastRefresh()) ? 69 : -1, tmp_14_0);
} }
function DashboardComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, DashboardComponent_Conditional_18_Conditional_0_Template, 70, 11);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.data()) ? 0 : -1, tmp_1_0);
} }
/**
 * Direction dashboard (sections 56 to 59).
 *
 * Every figure comes from the backend. The component only renders and
 * refreshes on domain events, so the screen and the reports can never disagree.
 */
export class DashboardComponent {
    dataSource = inject(DASHBOARD_DATA_SOURCE);
    ws = inject(WebSocketService);
    setupStatus = inject(SetupStatusService);
    destroyRef = inject(DestroyRef);
    /** Drives the reminder banner; disappears once setup is finished. */
    setup = this.setupStatus.status;
    setupIncomplete = this.setupStatus.incomplete;
    data = signal(null);
    loading = signal(true);
    error = signal(false);
    lastRefresh = signal(null);
    ngOnInit() {
        this.load();
        // Live refresh without a page reload (section 48).
        this.ws
            .on(WS_EVENTS.STUDENT_ENROLLED, WS_EVENTS.ATTENDANCE_RECORDED, WS_EVENTS.ABSENCE_RECORDED, WS_EVENTS.PAYMENT_RECEIVED, WS_EVENTS.PAYMENT_CANCELLED, WS_EVENTS.ALERT_CREATED)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.load(true));
    }
    load(silent = false) {
        if (!silent) {
            this.loading.set(true);
        }
        this.error.set(false);
        this.dataSource.load().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (data) => {
                this.data.set(data);
                this.loading.set(false);
                this.lastRefresh.set(new Date());
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    today() {
        return new Date().toLocaleDateString('fr-FR', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });
    }
    static ɵfac = function DashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardComponent, selectors: [["eduops-dashboard"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 19, vars: 2, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["aria-hidden", "true"], ["routerLink", "/enrollments/new", 1, "btn", "btn--primary"], ["message", "Chargement du tableau de bord..."], [1, "dot"], [3, "retry"], ["aria-label", "Indicateurs cles", 1, "grid", "grid--kpi"], [3, "kpi"], [1, "grid", "grid--2", "section-gap"], ["title", "Effectifs par niveau", "subtitle", "R\u00E9partition des \u00E9l\u00E8ves inscrits", "type", "bar", 3, "data"], ["title", "Pr\u00E9sence / absence", "subtitle", "\u00C9volution sur les 8 derni\u00E8res semaines", "type", "line", 3, "data"], ["title", "Performance academique", "subtitle", "\u00C9volution de la moyenne g\u00E9n\u00E9rale", "type", "area", 3, "data"], ["title", "Encaissements", "subtitle", "Realise contre attendu, par mois", "type", "bar", 3, "data"], [1, "grid", "grid--3", "section-gap"], [1, "card"], [1, "card__header"], [1, "card__title"], ["routerLink", "/enrollments", 1, "link-sm"], [1, "list"], [1, "list__item"], [1, "list__empty"], [1, "badge", "badge--warning", "badge--live"], ["routerLink", "/payments", 1, "link-sm"], ["routerLink", "/alerts", 1, "link-sm"], [1, "list__item", "list__item--alert"], ["routerLink", "/assessments", 1, "link-sm"], ["routerLink", "/classes", 1, "link-sm"], [1, "refresh-note"], ["size", "sm", 3, "name"], [1, "list__body"], [1, "list__title"], [1, "list__meta", "numeric"], [3, "status"], [1, "list__amount", "money"], ["aria-hidden", "true", 1, "alert-dot"], [1, "list__meta"]], template: function DashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Tableau de bord");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, DashboardComponent_Conditional_5_Template, 10, 4, "p", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 4)(7, "button", 5);
            i0.ɵɵlistener("click", function DashboardComponent_Template_button_click_7_listener() { return ctx.load(); });
            i0.ɵɵelementStart(8, "span", 6);
            i0.ɵɵtext(9, "\u27F3");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(10, " Actualiser ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "a", 7)(12, "span", 6);
            i0.ɵɵtext(13, "+");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(14, " Nouvelle inscription ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(15, "eduops-setup-progress");
            i0.ɵɵtemplate(16, DashboardComponent_Conditional_16_Template, 1, 0, "eduops-loading-state", 8)(17, DashboardComponent_Conditional_17_Template, 1, 0, "eduops-error-state")(18, DashboardComponent_Conditional_18_Template, 1, 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵadvance(5);
            i0.ɵɵconditional((tmp_0_0 = ctx.data()) ? 5 : -1, tmp_0_0);
            i0.ɵɵadvance(11);
            i0.ɵɵconditional(ctx.loading() ? 16 : ctx.error() ? 17 : 18);
        } }, dependencies: [CommonModule, i1.DatePipe, RouterLink, KpiCardComponent, ChartCardComponent, StatusBadgeComponent,
            LoadingStateComponent, ErrorStateComponent, AvatarComponent, MoneyPipe,
            SetupProgressComponent], styles: ["@import 'styles/tokens';\n\n.section-gap[_ngcontent-%COMP%] { margin-top: var(--space-6); }\n\n.dot[_ngcontent-%COMP%] { margin: 0 var(--space-2); color: var(--text-light); }\n\n.link-sm[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  font-weight: 600;\n  color: var(--brand);\n}\n\n.list[_ngcontent-%COMP%] { list-style: none; margin: 0; padding: var(--space-2) 0; }\n\n.list__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-5);\n  border-bottom: 1px solid var(--border-light);\n}\n\n.list__item[_ngcontent-%COMP%]:last-child { border-bottom: none; }\n.list__item--alert[_ngcontent-%COMP%] { align-items: flex-start; }\n\n.list__body[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n\n.list__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--text-base);\n  font-weight: 600;\n  color: var(--text-strong);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.list__meta[_ngcontent-%COMP%] {\n  margin: 2px 0 0;\n  font-size: var(--text-xs);\n  color: var(--text-muted);\n}\n\n.list__amount[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--success);\n  white-space: nowrap;\n}\n\n.list__empty[_ngcontent-%COMP%] {\n  padding: var(--space-6) var(--space-5);\n  text-align: center;\n  color: var(--text-muted);\n  font-size: var(--text-sm);\n}\n\n.alert-dot[_ngcontent-%COMP%] {\n  width: 8px; height: 8px;\n  border-radius: 50%;\n  margin-top: 6px;\n  flex-shrink: 0;\n}\n.alert-dot--info[_ngcontent-%COMP%] { background: var(--info); }\n.alert-dot--warning[_ngcontent-%COMP%] { background: var(--warning); }\n.alert-dot--critical[_ngcontent-%COMP%] { background: var(--danger); }\n\n.refresh-note[_ngcontent-%COMP%] {\n  margin-top: var(--space-6);\n  text-align: right;\n  font-size: var(--text-xs);\n  color: var(--text-light);\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardComponent, [{
        type: Component,
        args: [{ selector: 'eduops-dashboard', standalone: true, imports: [
                    CommonModule, RouterLink, KpiCardComponent, ChartCardComponent, StatusBadgeComponent,
                    LoadingStateComponent, ErrorStateComponent, AvatarComponent, MoneyPipe,
                    SetupProgressComponent
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n\n  <!-- ============ Header (section 56) ============ -->\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Tableau de bord</h1>\n      @if (data(); as dashboard) {\n        <p class=\"page__meta\">\n          <strong>{{ dashboard.academicYear.code }}</strong>\n          <span class=\"dot\">\u2022</span>{{ dashboard.campusName }}\n          @if (dashboard.currentTerm) {\n            <span class=\"dot\">\u2022</span>{{ dashboard.currentTerm.name }}\n          }\n          <span class=\"dot\">\u2022</span>{{ today() }}\n        </p>\n      }\n    </div>\n\n    <div class=\"page__actions\">\n      <button type=\"button\" class=\"btn btn--secondary\" (click)=\"load()\">\n        <span aria-hidden=\"true\">\u27F3</span> Actualiser\n      </button>\n      <a class=\"btn btn--primary\" routerLink=\"/enrollments/new\">\n        <span aria-hidden=\"true\">+</span> Nouvelle inscription\n      </a>\n    </div>\n  </header>\n\n  <!-- Bien demarrer : reste affiche tant que la configuration n'est pas finie -->\n  <eduops-setup-progress />\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement du tableau de bord...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n    @if (data(); as dashboard) {\n\n    <!-- ============ KPI grid (section 57) ============ -->\n    <section class=\"grid grid--kpi\" aria-label=\"Indicateurs cles\">\n      @for (kpi of dashboard.kpis; track kpi.key) {\n        <eduops-kpi-card [kpi]=\"kpi\" />\n      }\n    </section>\n\n    <!-- ============ Charts (section 58) ============ -->\n    <section class=\"grid grid--2 section-gap\">\n      <eduops-chart-card title=\"Effectifs par niveau\"\n                         subtitle=\"R\u00E9partition des \u00E9l\u00E8ves inscrits\"\n                         [data]=\"dashboard.enrollmentByLevel\" type=\"bar\" />\n\n      <eduops-chart-card title=\"Pr\u00E9sence / absence\"\n                         subtitle=\"\u00C9volution sur les 8 derni\u00E8res semaines\"\n                         [data]=\"dashboard.attendanceTrend\" type=\"line\" />\n\n      <eduops-chart-card title=\"Performance academique\"\n                         subtitle=\"\u00C9volution de la moyenne g\u00E9n\u00E9rale\"\n                         [data]=\"dashboard.academicPerformance\" type=\"area\" />\n\n      <eduops-chart-card title=\"Encaissements\"\n                         subtitle=\"Realise contre attendu, par mois\"\n                         [data]=\"dashboard.monthlyCollections\" type=\"bar\" />\n    </section>\n\n    <!-- ============ Widgets (section 59) ============ -->\n    <section class=\"grid grid--3 section-gap\">\n\n      <!-- Dernieres inscriptions -->\n      <article class=\"card\">\n        <header class=\"card__header\">\n          <h3 class=\"card__title\">Derni\u00E8res inscriptions</h3>\n          <a class=\"link-sm\" routerLink=\"/enrollments\">Tout voir</a>\n        </header>\n        <ul class=\"list\">\n          @for (enrollment of dashboard.recentEnrollments; track enrollment.id) {\n            <li class=\"list__item\">\n              <eduops-avatar [name]=\"enrollment.studentName\" size=\"sm\" />\n              <div class=\"list__body\">\n                <p class=\"list__title\">{{ enrollment.studentName }}</p>\n                <p class=\"list__meta numeric\">{{ enrollment.studentNumber }} \u2014 {{ enrollment.classroomName }}</p>\n              </div>\n              <eduops-status-badge [status]=\"enrollment.status\" />\n            </li>\n          } @empty {\n            <li class=\"list__empty\">Aucune inscription recente.</li>\n          }\n        </ul>\n      </article>\n\n      <!-- Absences du jour -->\n      <article class=\"card\">\n        <header class=\"card__header\">\n          <h3 class=\"card__title\">Absences du jour</h3>\n          <span class=\"badge badge--warning badge--live\">LIVE</span>\n        </header>\n        <ul class=\"list\">\n          @for (absence of dashboard.todayAbsences; track absence.studentId) {\n            <li class=\"list__item\">\n              <eduops-avatar [name]=\"absence.studentName\" size=\"sm\" />\n              <div class=\"list__body\">\n                <p class=\"list__title\">{{ absence.studentName }}</p>\n                <p class=\"list__meta numeric\">{{ absence.studentNumber }}</p>\n              </div>\n              <eduops-status-badge [status]=\"absence.status\" />\n            </li>\n          } @empty {\n            <li class=\"list__empty\">Aucune absence signalee aujourd'hui.</li>\n          }\n        </ul>\n      </article>\n\n      <!-- Encaissements recents -->\n      <article class=\"card\">\n        <header class=\"card__header\">\n          <h3 class=\"card__title\">Encaissements recents</h3>\n          <a class=\"link-sm\" routerLink=\"/payments\">Tout voir</a>\n        </header>\n        <ul class=\"list\">\n          @for (payment of dashboard.recentPayments; track payment.id) {\n            <li class=\"list__item\">\n              <div class=\"list__body\">\n                <p class=\"list__title\">{{ payment.studentName }}</p>\n                <p class=\"list__meta numeric\">{{ payment.receiptNumber }}</p>\n              </div>\n              <span class=\"list__amount money\">{{ payment.amount | money }}</span>\n            </li>\n          } @empty {\n            <li class=\"list__empty\">Aucun paiement enregistr\u00E9.</li>\n          }\n        </ul>\n      </article>\n\n      <!-- Alertes importantes -->\n      <article class=\"card\">\n        <header class=\"card__header\">\n          <h3 class=\"card__title\">Alertes importantes</h3>\n          <a class=\"link-sm\" routerLink=\"/alerts\">Tout voir</a>\n        </header>\n        <ul class=\"list\">\n          @for (alert of dashboard.alerts; track alert.id) {\n            <li class=\"list__item list__item--alert\">\n              <span class=\"alert-dot\" [class]=\"'alert-dot--' + alert.severity.toLowerCase()\"\n                    aria-hidden=\"true\"></span>\n              <div class=\"list__body\">\n                <p class=\"list__title\">{{ alert.title }}</p>\n                <p class=\"list__meta\">{{ alert.message }}</p>\n              </div>\n            </li>\n          } @empty {\n            <li class=\"list__empty\">Aucune alerte active.</li>\n          }\n        </ul>\n      </article>\n\n      <!-- Evaluations a venir -->\n      <article class=\"card\">\n        <header class=\"card__header\">\n          <h3 class=\"card__title\">\u00C9valuations a venir</h3>\n          <a class=\"link-sm\" routerLink=\"/assessments\">Tout voir</a>\n        </header>\n        <ul class=\"list\">\n          @for (assessment of dashboard.upcomingAssessments; track assessment.id) {\n            <li class=\"list__item\">\n              <div class=\"list__body\">\n                <p class=\"list__title\">{{ assessment.title }}</p>\n                <p class=\"list__meta\">\n                  {{ assessment.classroomName }} \u2014 {{ assessment.subjectName }}\n                  <span class=\"dot\">\u2022</span>{{ assessment.assessmentDate | date:'dd/MM' }}\n                </p>\n              </div>\n              <eduops-status-badge [status]=\"assessment.status\" />\n            </li>\n          } @empty {\n            <li class=\"list__empty\">Aucune \u00E9valuation programmee.</li>\n          }\n        </ul>\n      </article>\n\n      <!-- Classes necessitant attention -->\n      <article class=\"card\">\n        <header class=\"card__header\">\n          <h3 class=\"card__title\">Classes a surveiller</h3>\n          <a class=\"link-sm\" routerLink=\"/classes\">Tout voir</a>\n        </header>\n        <ul class=\"list\">\n          @for (classroom of dashboard.classesNeedingAttention; track classroom.id) {\n            <li class=\"list__item\">\n              <div class=\"list__body\">\n                <p class=\"list__title\">{{ classroom.name }}</p>\n                <p class=\"list__meta numeric\">\n                  {{ classroom.activeEnrollments }}/{{ classroom.capacityMaximum }} \u00E9l\u00E8ves\n                  <span class=\"dot\">\u2022</span>{{ classroom.occupancyRate }} %\n                </p>\n              </div>\n              <eduops-status-badge [status]=\"classroom.capacityStatus\" />\n            </li>\n          } @empty {\n            <li class=\"list__empty\">Toutes les classes sont dans les seuils.</li>\n          }\n        </ul>\n      </article>\n    </section>\n\n      @if (lastRefresh(); as refreshed) {\n        <p class=\"refresh-note\">Derni\u00E8re actualisation : {{ refreshed | date:'HH:mm:ss' }}</p>\n      }\n    }\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n.section-gap { margin-top: var(--space-6); }\n\n.dot { margin: 0 var(--space-2); color: var(--text-light); }\n\n.link-sm {\n  font-size: var(--text-sm);\n  font-weight: 600;\n  color: var(--brand);\n}\n\n.list { list-style: none; margin: 0; padding: var(--space-2) 0; }\n\n.list__item {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-5);\n  border-bottom: 1px solid var(--border-light);\n}\n\n.list__item:last-child { border-bottom: none; }\n.list__item--alert { align-items: flex-start; }\n\n.list__body { flex: 1; min-width: 0; }\n\n.list__title {\n  margin: 0;\n  font-size: var(--text-base);\n  font-weight: 600;\n  color: var(--text-strong);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.list__meta {\n  margin: 2px 0 0;\n  font-size: var(--text-xs);\n  color: var(--text-muted);\n}\n\n.list__amount {\n  font-weight: 700;\n  color: var(--success);\n  white-space: nowrap;\n}\n\n.list__empty {\n  padding: var(--space-6) var(--space-5);\n  text-align: center;\n  color: var(--text-muted);\n  font-size: var(--text-sm);\n}\n\n.alert-dot {\n  width: 8px; height: 8px;\n  border-radius: 50%;\n  margin-top: 6px;\n  flex-shrink: 0;\n}\n.alert-dot--info { background: var(--info); }\n.alert-dot--warning { background: var(--warning); }\n.alert-dot--critical { background: var(--danger); }\n\n.refresh-note {\n  margin-top: var(--space-6);\n  text-align: right;\n  font-size: var(--text-xs);\n  color: var(--text-light);\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "frontend/src/app/features/dashboard/dashboard.component.ts", lineNumber: 37 }); })();
//# sourceMappingURL=dashboard.component.js.map