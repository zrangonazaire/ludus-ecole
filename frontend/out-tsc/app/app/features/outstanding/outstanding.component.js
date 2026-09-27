import { ChangeDetectionStrategy, Component, DestroyRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReplaySubject, catchError, debounceTime, of, switchMap } from 'rxjs';
import { FINANCE_DATA_SOURCE } from '@core/datasource/data-source';
import { DataTableComponent } from '@shared/ui/data-table/data-table.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { PERMISSIONS } from '@core/models/auth.models';
import { CollectionPanelComponent } from './collection-panel.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["studentTpl"];
const _c1 = ["guardianTpl"];
const _c2 = ["dueTpl"];
const _c3 = ["delayTpl"];
const _c4 = ["amountTpl"];
const _c5 = ["actionsTpl"];
const _forTrack0 = ($index, $item) => $item.studentId;
const _forTrack1 = ($index, $item) => $item.value;
const _c6 = a0 => [a0];
const _c7 = () => [];
const _c8 = a0 => ["/students", a0];
const _c9 = () => ["/payments"];
const _c10 = a0 => ({ studentId: a0 });
function OutstandingComponent_a_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 26)(1, "span", 19);
    i0.ɵɵtext(2, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Encaisser un paiement ");
    i0.ɵɵelementEnd();
} }
function OutstandingComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 12)(1, "article", 27)(2, "div", 28);
    i0.ɵɵtext(3, "\u25F0");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p");
    i0.ɵɵtext(6, "Solde total \u00E0 recevoir");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong", 29);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "article", 30)(13, "div", 28);
    i0.ɵɵtext(14, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div")(16, "p");
    i0.ɵɵtext(17, "D\u00E9j\u00E0 en retard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "strong", 29);
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span");
    i0.ɵɵtext(22, "\u00C9ch\u00E9ances d\u00E9pass\u00E9es");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "article", 31)(24, "div", 28);
    i0.ɵɵtext(25, "\u231B");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div")(27, "p");
    i0.ɵɵtext(28, "Priorit\u00E9 de relance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "strong", 32);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "span");
    i0.ɵɵtext(32, "Retards de 30 jours ou plus");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const data_r2 = ctx;
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 4, data_r2.totalOutstanding, data_r2.currency));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", data_r2.studentCount, " \u00E9l\u00E8ve(s) concern\u00E9(s)");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(20, 7, data_r2.overdueAmount, data_r2.currency));
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(data_r2.criticalCount);
} }
function OutstandingComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 13);
    i0.ɵɵelement(1, "div", 33)(2, "div", 33)(3, "div", 33);
    i0.ɵɵelementEnd();
} }
function OutstandingComponent_For_13_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 14)(1, "button", 34);
    i0.ɵɵlistener("click", function OutstandingComponent_For_13_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.selectedStudent.set(null)); });
    i0.ɵɵtext(2, "Fermer le dossier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "eduops-collection-panel", 35);
    i0.ɵɵlistener("saved", function OutstandingComponent_For_13_Template_eduops_collection_panel_saved_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.reload()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const student_r5 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("student", student_r5);
} }
function OutstandingComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx.students.totalElements, " r\u00E9sultat(s) dans cette vue");
} }
function OutstandingComponent_For_29_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 37);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx.criticalCount);
} }
function OutstandingComponent_For_29_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 36);
    i0.ɵɵlistener("click", function OutstandingComponent_For_29_Template_button_click_0_listener() { const choice_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.selectBucket(choice_r7.value)); });
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, OutstandingComponent_For_29_Conditional_2_Template, 2, 1, "span", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_18_0;
    const choice_r7 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("bucket--active", ctx_r3.bucket() === choice_r7.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", choice_r7.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_18_0 = choice_r7.value === "CRITICAL" && ctx_r3.board()) ? 2 : -1, tmp_18_0);
} }
function OutstandingComponent_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 38);
    i0.ɵɵlistener("retry", function OutstandingComponent_Conditional_30_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.reload()); });
    i0.ɵɵelementEnd();
} }
function OutstandingComponent_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-data-table", 39);
    i0.ɵɵlistener("pageChange", function OutstandingComponent_Conditional_31_Template_eduops_data_table_pageChange_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onPageChange($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_8_0;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("columns", ctx_r3.columns)("page", (tmp_8_0 = (tmp_8_0 = ctx_r3.board()) == null ? null : tmp_8_0.students) !== null && tmp_8_0 !== undefined ? tmp_8_0 : null)("loading", ctx_r3.loading());
} }
function OutstandingComponent_ng_template_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵelement(1, "eduops-avatar", 41);
    i0.ɵɵelementStart(2, "span")(3, "a", 42);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small", 32);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_12_0;
    const row_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", row_r10.studentName)("photoUrl", row_r10.photoUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(6, _c8, row_r10.studentId));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r10.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", row_r10.studentNumber, " \u00B7 ", (tmp_12_0 = row_r10.classroomName) !== null && tmp_12_0 !== undefined ? tmp_12_0 : "Sans classe", "");
} }
function OutstandingComponent_ng_template_34_Conditional_0_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 45);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r11 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("href", "tel:" + row_r11.guardianPhone, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r11.guardianPhone);
} }
function OutstandingComponent_ng_template_34_Conditional_0_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1, "Coordonn\u00E9es non renseign\u00E9es");
    i0.ɵɵelementEnd();
} }
function OutstandingComponent_ng_template_34_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, OutstandingComponent_ng_template_34_Conditional_0_Conditional_3_Template, 2, 2, "a", 45)(4, OutstandingComponent_ng_template_34_Conditional_0_Conditional_4_Template, 2, 0, "small");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r11.guardianName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(row_r11.guardianPhone ? 3 : 4);
} }
function OutstandingComponent_ng_template_34_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 44);
    i0.ɵɵtext(1, "Responsable \u00E0 compl\u00E9ter");
    i0.ɵɵelementEnd();
} }
function OutstandingComponent_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, OutstandingComponent_ng_template_34_Conditional_0_Template, 5, 2, "div", 43)(1, OutstandingComponent_ng_template_34_Conditional_1_Template, 2, 0, "span", 44);
} if (rf & 2) {
    const row_r11 = ctx.$implicit;
    i0.ɵɵconditional(row_r11.guardianName ? 0 : 1);
} }
function OutstandingComponent_ng_template_36_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Relance : ", i0.ɵɵpipeBind2(2, 1, row_r12.nextContactDate, "dd/MM/yyyy"), "");
} }
function OutstandingComponent_ng_template_36_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "money");
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("Promesse : ", i0.ɵɵpipeBind2(2, 2, row_r12.promisedAmount, row_r12.currency), " le ", i0.ɵɵpipeBind2(3, 5, row_r12.promisedDate, "dd/MM/yyyy"), "");
} }
function OutstandingComponent_ng_template_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46)(1, "strong", 32);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, OutstandingComponent_ng_template_36_Conditional_6_Template, 3, 4, "small")(7, OutstandingComponent_ng_template_36_Conditional_7_Template, 4, 8, "small");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r12 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 4, row_r12.oldestDueDate, "dd MMM yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", row_r12.instalmentCount, " \u00E9ch\u00E9ance(s) ouverte(s)");
    i0.ɵɵadvance();
    i0.ɵɵconditional(row_r12.nextContactDate ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(row_r12.promisedAmount ? 7 : -1);
} }
function OutstandingComponent_ng_template_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 47);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r13 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵattribute("data-tone", ctx_r3.delayTone(row_r13));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.delayLabel(row_r13), " ");
} }
function OutstandingComponent_ng_template_40_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "money");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(2, 1, row_r14.overdueAmount, row_r14.currency), " en retard");
} }
function OutstandingComponent_ng_template_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48)(1, "strong", 29);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, OutstandingComponent_ng_template_40_Conditional_4_Template, 3, 4, "small");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r14 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 2, row_r14.outstandingAmount, row_r14.currency));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(row_r14.overdueAmount > 0 && row_r14.overdueAmount !== row_r14.outstandingAmount ? 4 : -1);
} }
function OutstandingComponent_ng_template_42_a_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 51);
    i0.ɵɵtext(1, " Encaisser ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(2, _c9))("queryParams", i0.ɵɵpureFunction1(3, _c10, row_r16.studentId));
} }
function OutstandingComponent_ng_template_42_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 49);
    i0.ɵɵlistener("click", function OutstandingComponent_ng_template_42_Template_button_click_0_listener() { const row_r16 = i0.ɵɵrestoreView(_r15).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.selectedStudent.set(row_r16)); });
    i0.ɵɵtext(1, "Suivi");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, OutstandingComponent_ng_template_42_a_2_Template, 2, 5, "a", 50);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("eduopsHasPermission", ctx_r3.createPaymentPermission);
} }
/** Collection board: what is owed, by whom, and what needs attention first. */
export class OutstandingComponent {
    dataSource = inject(FINANCE_DATA_SOURCE);
    destroyRef = inject(DestroyRef);
    selectedStudent = signal(null);
    board = signal(null);
    loading = signal(true);
    error = signal(false);
    search = signal('');
    bucket = signal('ALL');
    currentPage = signal(0);
    createPaymentPermission = PERMISSIONS.PAYMENT_CREATE;
    buckets = [
        { value: 'FOLLOW_UP', label: 'À relancer' },
        { value: 'ALL', label: 'Tous les soldes' },
        { value: 'OVERDUE', label: 'En retard' },
        { value: 'CRITICAL', label: '30 jours et plus' },
        { value: 'DUE_SOON', label: 'À échéance bientôt' }
    ];
    query$ = new ReplaySubject(1);
    studentTpl;
    guardianTpl;
    dueTpl;
    delayTpl;
    amountTpl;
    actionsTpl;
    columns = [];
    ngOnInit() {
        this.columns = [
            { key: 'studentName', label: 'Élève', template: this.studentTpl, width: '25%' },
            { key: 'guardianName', label: 'Responsable financier', template: this.guardianTpl, width: '22%' },
            { key: 'oldestDueDate', label: 'Plus ancienne échéance', template: this.dueTpl, width: '15%' },
            { key: 'daysOverdue', label: 'Retard', template: this.delayTpl, width: '12%' },
            { key: 'outstandingAmount', label: 'Solde', numeric: true, template: this.amountTpl, width: '14%' },
            { key: 'actions', label: '', template: this.actionsTpl, width: '12%' }
        ];
        this.query$
            .pipe(debounceTime(220), switchMap(() => {
            this.loading.set(true);
            this.error.set(false);
            return this.dataSource.outstanding({
                page: this.currentPage(),
                size: 15,
                search: this.search().trim() || undefined,
                bucket: this.bucket()
            }).pipe(catchError(() => {
                this.error.set(true);
                return of(null);
            }));
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((board) => {
            if (board)
                this.board.set(board);
            this.loading.set(false);
        });
        this.reload();
    }
    onSearch(value) {
        this.search.set(value);
        this.currentPage.set(0);
        this.reload();
    }
    selectBucket(bucket) {
        this.bucket.set(bucket);
        this.currentPage.set(0);
        this.reload();
    }
    onPageChange(page) {
        this.currentPage.set(page);
        this.reload();
    }
    reload() {
        this.query$.next();
    }
    delayLabel(row) {
        if (row.daysOverdue === 0)
            return 'À venir';
        if (row.daysOverdue === 1)
            return '1 jour';
        return `${row.daysOverdue} jours`;
    }
    delayTone(row) {
        if (row.daysOverdue >= 30)
            return 'critical';
        if (row.daysOverdue > 0)
            return 'overdue';
        return 'soon';
    }
    static ɵfac = function OutstandingComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OutstandingComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OutstandingComponent, selectors: [["eduops-outstanding"]], viewQuery: function OutstandingComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
            i0.ɵɵviewQuery(_c1, 7);
            i0.ɵɵviewQuery(_c2, 7);
            i0.ɵɵviewQuery(_c3, 7);
            i0.ɵɵviewQuery(_c4, 7);
            i0.ɵɵviewQuery(_c5, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.studentTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.guardianTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dueTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.delayTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.amountTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.actionsTpl = _t.first);
        } }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 44, vars: 8, consts: [["studentTpl", ""], ["guardianTpl", ""], ["dueTpl", ""], ["delayTpl", ""], ["amountTpl", ""], ["actionsTpl", ""], [1, "page"], [1, "page__header", "outstanding-header"], [1, "page__eyebrow"], [1, "page__title"], [1, "page__meta"], ["class", "btn btn--primary", "routerLink", "/payments", 4, "eduopsHasPermission"], ["aria-label", "Synth\u00E8se des impay\u00E9s", 1, "metrics"], ["aria-hidden", "true", 1, "metrics", "metrics--loading"], ["aria-label", "Dossier de recouvrement", 1, "card"], [1, "card", "collection-card"], [1, "collection-toolbar"], [1, "collection-toolbar__top"], [1, "search-box"], ["aria-hidden", "true"], ["for", "outstanding-search", 1, "visually-hidden"], ["id", "outstanding-search", "type", "search", "placeholder", "\u00C9l\u00E8ve, matricule, classe ou responsable", 1, "input", 3, "input", "value"], ["role", "group", "aria-label", "Filtrer les impay\u00E9s", 1, "buckets"], ["type", "button", 1, "bucket", 3, "bucket--active"], ["title", "Impossible de charger les impay\u00E9s", "message", "Le registre financier n'est pas disponible pour le moment."], ["caption", "Liste des soldes \u00E0 recouvrer", "emptyTitle", "Aucun solde dans cette vue", "emptyMessage", "Aucune famille ne correspond \u00E0 ces crit\u00E8res.", 3, "columns", "page", "loading"], ["routerLink", "/payments", 1, "btn", "btn--primary"], [1, "metric", "metric--primary"], ["aria-hidden", "true", 1, "metric__icon"], [1, "money"], [1, "metric", "metric--danger"], [1, "metric", "metric--warning"], [1, "numeric"], [1, "skeleton"], ["type", "button", 1, "btn", 3, "click"], [3, "saved", "student"], ["type", "button", 1, "bucket", 3, "click"], [1, "bucket__count", "numeric"], ["title", "Impossible de charger les impay\u00E9s", "message", "Le registre financier n'est pas disponible pour le moment.", 3, "retry"], ["caption", "Liste des soldes \u00E0 recouvrer", "emptyTitle", "Aucun solde dans cette vue", "emptyMessage", "Aucune famille ne correspond \u00E0 ces crit\u00E8res.", 3, "pageChange", "columns", "page", "loading"], [1, "person"], ["size", "sm", 3, "name", "photoUrl"], [1, "person__name", 3, "routerLink"], [1, "guardian"], [1, "missing-contact"], [3, "href"], [1, "due-date"], [1, "delay"], [1, "balance"], ["type", "button", 1, "btn", "btn--sm", 3, "click"], ["class", "btn btn--primary btn--sm collect-action", 3, "routerLink", "queryParams", 4, "eduopsHasPermission"], [1, "btn", "btn--primary", "btn--sm", "collect-action", 3, "routerLink", "queryParams"]], template: function OutstandingComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 6)(1, "header", 7)(2, "div")(3, "p", 8);
            i0.ɵɵtext(4, "Finance \u00B7 Recouvrement");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 9);
            i0.ɵɵtext(6, "Impay\u00E9s");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 10);
            i0.ɵɵtext(8, "Les familles \u00E0 accompagner, class\u00E9es par anciennet\u00E9 du solde.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, OutstandingComponent_a_9_Template, 4, 0, "a", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, OutstandingComponent_Conditional_10_Template, 33, 10, "section", 12)(11, OutstandingComponent_Conditional_11_Template, 4, 0, "section", 13);
            i0.ɵɵrepeaterCreate(12, OutstandingComponent_For_13_Template, 4, 1, "section", 14, _forTrack0);
            i0.ɵɵelementStart(14, "section", 15)(15, "div", 16)(16, "div", 17)(17, "div")(18, "h2");
            i0.ɵɵtext(19, "Suivi des familles");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(20, OutstandingComponent_Conditional_20_Template, 2, 1, "p");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 18)(22, "span", 19);
            i0.ɵɵtext(23, "\u2315");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "label", 20);
            i0.ɵɵtext(25, "Rechercher une famille");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "input", 21);
            i0.ɵɵlistener("input", function OutstandingComponent_Template_input_input_26_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSearch($event.target.value)); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(27, "div", 22);
            i0.ɵɵrepeaterCreate(28, OutstandingComponent_For_29_Template, 3, 4, "button", 23, _forTrack1);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(30, OutstandingComponent_Conditional_30_Template, 1, 0, "eduops-error-state", 24)(31, OutstandingComponent_Conditional_31_Template, 1, 3, "eduops-data-table", 25);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(32, OutstandingComponent_ng_template_32_Template, 7, 8, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(34, OutstandingComponent_ng_template_34_Template, 2, 1, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor)(36, OutstandingComponent_ng_template_36_Template, 8, 7, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor)(38, OutstandingComponent_ng_template_38_Template, 2, 2, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor)(40, OutstandingComponent_ng_template_40_Template, 5, 5, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor)(42, OutstandingComponent_ng_template_42_Template, 3, 1, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            let tmp_7_0;
            let tmp_9_0;
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("eduopsHasPermission", ctx.createPaymentPermission);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_7_0 = ctx.board()) ? 10 : ctx.loading() ? 11 : -1, tmp_7_0);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.selectedStudent() ? i0.ɵɵpureFunction1(5, _c6, ctx.selectedStudent()) : i0.ɵɵpureFunction0(7, _c7));
            i0.ɵɵadvance(8);
            i0.ɵɵconditional((tmp_9_0 = ctx.board()) ? 20 : -1, tmp_9_0);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("value", ctx.search());
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.buckets);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.error() ? 30 : 31);
        } }, dependencies: [CommonModule, i1.DatePipe, RouterLink, DataTableComponent, AvatarComponent, ErrorStateComponent,
            HasPermissionDirective, MoneyPipe, CollectionPanelComponent], styles: ["@import 'styles/tokens';\n\n.page__eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-1);\n  font-size: var(--text-xs);\n  font-weight: 700;\n  letter-spacing: .06em;\n  text-transform: uppercase;\n  color: var(--brand);\n}\n\n.metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.35fr 1fr 1fr;\n  gap: var(--space-4);\n  margin-bottom: var(--space-5);\n\n  &--loading > div { min-height: 126px; border-radius: var(--radius-card); }\n}\n\n.metric[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  min-width: 0;\n  padding: var(--space-5);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 44px;\n    height: 44px;\n    font-size: var(--text-lg);\n    font-weight: 800;\n    border-radius: 12px;\n  }\n\n  > div:last-child { display: flex; min-width: 0; flex-direction: column; }\n  p { margin: 0; font-size: var(--text-sm); color: var(--text-muted); }\n  strong { margin: 4px 0 2px; font-size: var(--text-xl); color: var(--text-strong); }\n  span { font-size: var(--text-xs); color: var(--text-light); }\n\n  &--primary { border-top: 3px solid var(--brand); }\n  &--primary &__icon { color: var(--brand); background: var(--brand-tint); }\n  &--danger { border-top: 3px solid var(--danger); }\n  &--danger &__icon { color: var(--danger); background: var(--danger-bg); }\n  &--warning { border-top: 3px solid var(--warning); }\n  &--warning &__icon { color: var(--warning); background: var(--warning-bg); }\n}\n\n.collection-card[_ngcontent-%COMP%] { overflow: hidden; }\n.collection-toolbar[_ngcontent-%COMP%] { border-bottom: 1px solid var(--border-light); }\n\n.collection-toolbar__top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-5) var(--space-6) var(--space-4);\n\n  h2 { margin: 0; font-size: var(--text-lg); color: var(--text-strong); }\n  p { margin: 3px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.search-box[_ngcontent-%COMP%] {\n  position: relative;\n  width: min(390px, 100%);\n  > span { position: absolute; top: 50%; left: 13px; transform: translateY(-50%); color: var(--text-muted); }\n  .input { padding-left: 38px; }\n}\n\n.buckets[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-2);\n  padding: 0 var(--space-6) var(--space-4);\n  overflow-x: auto;\n}\n\n.bucket[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  min-height: 34px;\n  padding: 0 var(--space-3);\n  font: inherit;\n  font-size: var(--text-sm);\n  white-space: nowrap;\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: var(--radius-pill);\n  cursor: pointer;\n\n  &--active { font-weight: 650; color: var(--brand); background: var(--brand-tint); border-color: var(--brand); }\n  &__count {\n    min-width: 19px;\n    padding: 1px 6px;\n    text-align: center;\n    font-size: 10px;\n    color: var(--danger);\n    background: var(--danger-bg);\n    border-radius: var(--radius-pill);\n  }\n}\n\n.person[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  min-width: 210px;\n  > span { display: flex; min-width: 0; flex-direction: column; }\n  &__name { overflow: hidden; font-weight: 650; text-overflow: ellipsis; color: var(--text-strong); text-decoration: none; }\n  &__name:hover { color: var(--brand); text-decoration: underline; }\n  small { margin-top: 2px; color: var(--text-muted); }\n}\n\n.guardian[_ngcontent-%COMP%], .due-date[_ngcontent-%COMP%], .balance[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  strong { color: var(--text-strong); }\n  small, a { margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n  a:hover { color: var(--brand); }\n}\n\n.missing-contact[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--warning); }\n.balance[_ngcontent-%COMP%] { align-items: flex-end; }\n.balance[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: var(--text-md); }\n.balance[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: var(--danger); }\n\n.delay[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 4px 9px;\n  font-size: var(--text-xs);\n  font-weight: 700;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='critical'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='overdue'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='soon'] { color: var(--success); background: var(--success-bg); }\n}\n\n.collect-action[_ngcontent-%COMP%] { text-decoration: none; }\n\n@include tablet-down {\n  .metrics { grid-template-columns: 1fr 1fr 1fr; }\n  .metric { align-items: flex-start; padding: var(--space-4); }\n  .metric__icon { display: none; }\n}\n\n@include mobile {\n  .outstanding-header .btn { width: 100%; }\n  .metrics { grid-template-columns: 1fr 1fr; gap: var(--space-2); }\n  .metric { padding: var(--space-3); }\n  .metric:first-child { grid-column: 1 / -1; }\n  .metric strong { font-size: var(--text-lg); }\n  .collection-toolbar__top { align-items: stretch; flex-direction: column; padding: var(--space-4); }\n  .search-box { width: 100%; }\n  .buckets { padding: 0 var(--space-4) var(--space-4); }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OutstandingComponent, [{
        type: Component,
        args: [{ selector: 'eduops-outstanding', standalone: true, imports: [
                    CommonModule, RouterLink, DataTableComponent, AvatarComponent, ErrorStateComponent,
                    HasPermissionDirective, MoneyPipe, CollectionPanelComponent
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header outstanding-header\">\n    <div>\n      <p class=\"page__eyebrow\">Finance \u00B7 Recouvrement</p>\n      <h1 class=\"page__title\">Impay\u00E9s</h1>\n      <p class=\"page__meta\">Les familles \u00E0 accompagner, class\u00E9es par anciennet\u00E9 du solde.</p>\n    </div>\n    <a class=\"btn btn--primary\" routerLink=\"/payments\"\n       *eduopsHasPermission=\"createPaymentPermission\">\n      <span aria-hidden=\"true\">+</span> Encaisser un paiement\n    </a>\n  </header>\n\n  @if (board(); as data) {\n    <section class=\"metrics\" aria-label=\"Synth\u00E8se des impay\u00E9s\">\n      <article class=\"metric metric--primary\">\n        <div class=\"metric__icon\" aria-hidden=\"true\">\u25F0</div>\n        <div>\n          <p>Solde total \u00E0 recevoir</p>\n          <strong class=\"money\">{{ data.totalOutstanding | money:data.currency }}</strong>\n          <span>{{ data.studentCount }} \u00E9l\u00E8ve(s) concern\u00E9(s)</span>\n        </div>\n      </article>\n      <article class=\"metric metric--danger\">\n        <div class=\"metric__icon\" aria-hidden=\"true\">!</div>\n        <div>\n          <p>D\u00E9j\u00E0 en retard</p>\n          <strong class=\"money\">{{ data.overdueAmount | money:data.currency }}</strong>\n          <span>\u00C9ch\u00E9ances d\u00E9pass\u00E9es</span>\n        </div>\n      </article>\n      <article class=\"metric metric--warning\">\n        <div class=\"metric__icon\" aria-hidden=\"true\">\u231B</div>\n        <div>\n          <p>Priorit\u00E9 de relance</p>\n          <strong class=\"numeric\">{{ data.criticalCount }}</strong>\n          <span>Retards de 30 jours ou plus</span>\n        </div>\n      </article>\n    </section>\n  } @else if (loading()) {\n    <section class=\"metrics metrics--loading\" aria-hidden=\"true\">\n      <div class=\"skeleton\"></div><div class=\"skeleton\"></div><div class=\"skeleton\"></div>\n    </section>\n  }\n\n  @for (student of selectedStudent() ? [selectedStudent()!] : []; track student.studentId) {\n    <section class=\"card\" aria-label=\"Dossier de recouvrement\">\n      <button type=\"button\" class=\"btn\" (click)=\"selectedStudent.set(null)\">Fermer le dossier</button>\n      <eduops-collection-panel [student]=\"student\" (saved)=\"reload()\" />\n    </section>\n  }\n  <section class=\"card collection-card\">\n    <div class=\"collection-toolbar\">\n      <div class=\"collection-toolbar__top\">\n        <div>\n          <h2>Suivi des familles</h2>\n          @if (board(); as data) {\n            <p>{{ data.students.totalElements }} r\u00E9sultat(s) dans cette vue</p>\n          }\n        </div>\n        <div class=\"search-box\">\n          <span aria-hidden=\"true\">\u2315</span>\n          <label class=\"visually-hidden\" for=\"outstanding-search\">Rechercher une famille</label>\n          <input id=\"outstanding-search\" class=\"input\" type=\"search\"\n                 placeholder=\"\u00C9l\u00E8ve, matricule, classe ou responsable\"\n                 [value]=\"search()\" (input)=\"onSearch($any($event.target).value)\" />\n        </div>\n      </div>\n      <div class=\"buckets\" role=\"group\" aria-label=\"Filtrer les impay\u00E9s\">\n        @for (choice of buckets; track choice.value) {\n          <button type=\"button\" class=\"bucket\"\n                  [class.bucket--active]=\"bucket() === choice.value\"\n                  (click)=\"selectBucket(choice.value)\">\n            {{ choice.label }}\n            @if (choice.value === 'CRITICAL' && board(); as data) {\n              <span class=\"bucket__count numeric\">{{ data.criticalCount }}</span>\n            }\n          </button>\n        }\n      </div>\n    </div>\n\n    @if (error()) {\n      <eduops-error-state\n        title=\"Impossible de charger les impay\u00E9s\"\n        message=\"Le registre financier n'est pas disponible pour le moment.\"\n        (retry)=\"reload()\" />\n    } @else {\n      <eduops-data-table\n        [columns]=\"columns\"\n        [page]=\"board()?.students ?? null\"\n        [loading]=\"loading()\"\n        caption=\"Liste des soldes \u00E0 recouvrer\"\n        emptyTitle=\"Aucun solde dans cette vue\"\n        emptyMessage=\"Aucune famille ne correspond \u00E0 ces crit\u00E8res.\"\n        (pageChange)=\"onPageChange($event)\" />\n    }\n  </section>\n</div>\n\n<ng-template #studentTpl let-row>\n  <div class=\"person\">\n    <eduops-avatar [name]=\"row.studentName\" [photoUrl]=\"row.photoUrl\" size=\"sm\" />\n    <span>\n      <a class=\"person__name\" [routerLink]=\"['/students', row.studentId]\">{{ row.studentName }}</a>\n      <small class=\"numeric\">{{ row.studentNumber }} \u00B7 {{ row.classroomName ?? 'Sans classe' }}</small>\n    </span>\n  </div>\n</ng-template>\n\n<ng-template #guardianTpl let-row>\n  @if (row.guardianName) {\n    <div class=\"guardian\">\n      <strong>{{ row.guardianName }}</strong>\n      @if (row.guardianPhone) {\n        <a [href]=\"'tel:' + row.guardianPhone\">{{ row.guardianPhone }}</a>\n      } @else {\n        <small>Coordonn\u00E9es non renseign\u00E9es</small>\n      }\n    </div>\n  } @else {\n    <span class=\"missing-contact\">Responsable \u00E0 compl\u00E9ter</span>\n  }\n</ng-template>\n\n<ng-template #dueTpl let-row>\n  <div class=\"due-date\">\n    <strong class=\"numeric\">{{ row.oldestDueDate | date:'dd MMM yyyy' }}</strong>\n    <small>{{ row.instalmentCount }} \u00E9ch\u00E9ance(s) ouverte(s)</small>\n    @if (row.nextContactDate) { <small>Relance : {{ row.nextContactDate | date:'dd/MM/yyyy' }}</small> }\n    @if (row.promisedAmount) { <small>Promesse : {{ row.promisedAmount | money:row.currency }} le {{ row.promisedDate | date:'dd/MM/yyyy' }}</small> }\n  </div>\n</ng-template>\n\n<ng-template #delayTpl let-row>\n  <span class=\"delay\" [attr.data-tone]=\"delayTone(row)\">\n    {{ delayLabel(row) }}\n  </span>\n</ng-template>\n\n<ng-template #amountTpl let-row>\n  <div class=\"balance\">\n    <strong class=\"money\">{{ row.outstandingAmount | money:row.currency }}</strong>\n    @if (row.overdueAmount > 0 && row.overdueAmount !== row.outstandingAmount) {\n      <small>{{ row.overdueAmount | money:row.currency }} en retard</small>\n    }\n  </div>\n</ng-template>\n\n<ng-template #actionsTpl let-row>\n  <button type=\"button\" class=\"btn btn--sm\" (click)=\"selectedStudent.set(row)\">Suivi</button>\n  <a class=\"btn btn--primary btn--sm collect-action\"\n     [routerLink]=\"['/payments']\" [queryParams]=\"{ studentId: row.studentId }\"\n     *eduopsHasPermission=\"createPaymentPermission\">\n    Encaisser\n  </a>\n</ng-template>\n", styles: ["@import 'styles/tokens';\n\n.page__eyebrow {\n  margin: 0 0 var(--space-1);\n  font-size: var(--text-xs);\n  font-weight: 700;\n  letter-spacing: .06em;\n  text-transform: uppercase;\n  color: var(--brand);\n}\n\n.metrics {\n  display: grid;\n  grid-template-columns: 1.35fr 1fr 1fr;\n  gap: var(--space-4);\n  margin-bottom: var(--space-5);\n\n  &--loading > div { min-height: 126px; border-radius: var(--radius-card); }\n}\n\n.metric {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  min-width: 0;\n  padding: var(--space-5);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 44px;\n    height: 44px;\n    font-size: var(--text-lg);\n    font-weight: 800;\n    border-radius: 12px;\n  }\n\n  > div:last-child { display: flex; min-width: 0; flex-direction: column; }\n  p { margin: 0; font-size: var(--text-sm); color: var(--text-muted); }\n  strong { margin: 4px 0 2px; font-size: var(--text-xl); color: var(--text-strong); }\n  span { font-size: var(--text-xs); color: var(--text-light); }\n\n  &--primary { border-top: 3px solid var(--brand); }\n  &--primary &__icon { color: var(--brand); background: var(--brand-tint); }\n  &--danger { border-top: 3px solid var(--danger); }\n  &--danger &__icon { color: var(--danger); background: var(--danger-bg); }\n  &--warning { border-top: 3px solid var(--warning); }\n  &--warning &__icon { color: var(--warning); background: var(--warning-bg); }\n}\n\n.collection-card { overflow: hidden; }\n.collection-toolbar { border-bottom: 1px solid var(--border-light); }\n\n.collection-toolbar__top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-5) var(--space-6) var(--space-4);\n\n  h2 { margin: 0; font-size: var(--text-lg); color: var(--text-strong); }\n  p { margin: 3px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.search-box {\n  position: relative;\n  width: min(390px, 100%);\n  > span { position: absolute; top: 50%; left: 13px; transform: translateY(-50%); color: var(--text-muted); }\n  .input { padding-left: 38px; }\n}\n\n.buckets {\n  display: flex;\n  gap: var(--space-2);\n  padding: 0 var(--space-6) var(--space-4);\n  overflow-x: auto;\n}\n\n.bucket {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  min-height: 34px;\n  padding: 0 var(--space-3);\n  font: inherit;\n  font-size: var(--text-sm);\n  white-space: nowrap;\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: var(--radius-pill);\n  cursor: pointer;\n\n  &--active { font-weight: 650; color: var(--brand); background: var(--brand-tint); border-color: var(--brand); }\n  &__count {\n    min-width: 19px;\n    padding: 1px 6px;\n    text-align: center;\n    font-size: 10px;\n    color: var(--danger);\n    background: var(--danger-bg);\n    border-radius: var(--radius-pill);\n  }\n}\n\n.person {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  min-width: 210px;\n  > span { display: flex; min-width: 0; flex-direction: column; }\n  &__name { overflow: hidden; font-weight: 650; text-overflow: ellipsis; color: var(--text-strong); text-decoration: none; }\n  &__name:hover { color: var(--brand); text-decoration: underline; }\n  small { margin-top: 2px; color: var(--text-muted); }\n}\n\n.guardian, .due-date, .balance {\n  display: flex;\n  flex-direction: column;\n  strong { color: var(--text-strong); }\n  small, a { margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n  a:hover { color: var(--brand); }\n}\n\n.missing-contact { font-size: var(--text-xs); color: var(--warning); }\n.balance { align-items: flex-end; }\n.balance strong { font-size: var(--text-md); }\n.balance small { color: var(--danger); }\n\n.delay {\n  display: inline-flex;\n  padding: 4px 9px;\n  font-size: var(--text-xs);\n  font-weight: 700;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='critical'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='overdue'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='soon'] { color: var(--success); background: var(--success-bg); }\n}\n\n.collect-action { text-decoration: none; }\n\n@include tablet-down {\n  .metrics { grid-template-columns: 1fr 1fr 1fr; }\n  .metric { align-items: flex-start; padding: var(--space-4); }\n  .metric__icon { display: none; }\n}\n\n@include mobile {\n  .outstanding-header .btn { width: 100%; }\n  .metrics { grid-template-columns: 1fr 1fr; gap: var(--space-2); }\n  .metric { padding: var(--space-3); }\n  .metric:first-child { grid-column: 1 / -1; }\n  .metric strong { font-size: var(--text-lg); }\n  .collection-toolbar__top { align-items: stretch; flex-direction: column; padding: var(--space-4); }\n  .search-box { width: 100%; }\n  .buckets { padding: 0 var(--space-4) var(--space-4); }\n}\n"] }]
    }], null, { studentTpl: [{
            type: ViewChild,
            args: ['studentTpl', { static: true }]
        }], guardianTpl: [{
            type: ViewChild,
            args: ['guardianTpl', { static: true }]
        }], dueTpl: [{
            type: ViewChild,
            args: ['dueTpl', { static: true }]
        }], delayTpl: [{
            type: ViewChild,
            args: ['delayTpl', { static: true }]
        }], amountTpl: [{
            type: ViewChild,
            args: ['amountTpl', { static: true }]
        }], actionsTpl: [{
            type: ViewChild,
            args: ['actionsTpl', { static: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OutstandingComponent, { className: "OutstandingComponent", filePath: "frontend/src/app/features/outstanding/outstanding.component.ts", lineNumber: 39 }); })();
//# sourceMappingURL=outstanding.component.js.map