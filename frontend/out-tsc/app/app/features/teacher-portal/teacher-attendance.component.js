import { createUuid } from "../../core/utils/uuid";
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ATTENDANCE_DATA_SOURCE, TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { NotificationService } from '@core/services/notification.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.studentId;
const _forTrack1 = ($index, $item) => $item.id;
function TeacherAttendanceComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state");
} }
function TeacherAttendanceComponent_Conditional_1_Conditional_0_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function TeacherAttendanceComponent_Conditional_1_Conditional_0_Conditional_25_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.markAllPresent()); });
    i0.ɵɵtext(1, " Tout marquer present ");
    i0.ɵɵelementEnd();
} }
function TeacherAttendanceComponent_Conditional_1_Conditional_0_For_28_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 12);
    i0.ɵɵelement(1, "eduops-avatar", 16);
    i0.ɵɵelementStart(2, "div", 17)(3, "p", 18);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 19);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 20)(8, "button", 21);
    i0.ɵɵlistener("click", function TeacherAttendanceComponent_Conditional_1_Conditional_0_For_28_Template_button_click_8_listener() { const record_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.mark(record_r5.studentId, "PRESENT")); });
    i0.ɵɵtext(9, "P");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 22);
    i0.ɵɵlistener("click", function TeacherAttendanceComponent_Conditional_1_Conditional_0_For_28_Template_button_click_10_listener() { const record_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.mark(record_r5.studentId, "ABSENT")); });
    i0.ɵɵtext(11, "A");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 23);
    i0.ɵɵlistener("click", function TeacherAttendanceComponent_Conditional_1_Conditional_0_For_28_Template_button_click_12_listener() { const record_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.mark(record_r5.studentId, "LATE")); });
    i0.ɵɵtext(13, "R");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const record_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", record_r5.studentName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(record_r5.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r5.studentNumber);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", "Presence de " + record_r5.studentName);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("mark--active", record_r5.status === "PRESENT");
    i0.ɵɵproperty("disabled", ctx_r1.submitted());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mark--active", record_r5.status === "ABSENT");
    i0.ɵɵproperty("disabled", ctx_r1.submitted());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mark--active", record_r5.status === "LATE");
    i0.ɵɵproperty("disabled", ctx_r1.submitted());
} }
function TeacherAttendanceComponent_Conditional_1_Conditional_0_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 13);
    i0.ɵɵtext(1, " Feuille validee et enregistr\u00E9e par le serveur. Toute correction sera tracee. ");
    i0.ɵɵelementEnd();
} }
function TeacherAttendanceComponent_Conditional_1_Conditional_0_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14)(1, "button", 24);
    i0.ɵɵlistener("click", function TeacherAttendanceComponent_Conditional_1_Conditional_0_Conditional_30_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 25);
    i0.ɵɵtext(4, " L'appel n'est definitif qu'apr\u00E8s confirmation du serveur. ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.submitting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.submitting() ? "Enregistrement..." : "Valider l'appel", " ");
} }
function TeacherAttendanceComponent_Conditional_1_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 0)(1, "button", 1);
    i0.ɵɵlistener("click", function TeacherAttendanceComponent_Conditional_1_Conditional_0_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(2, "\u2039 Retour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "h1", 2);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 3);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 4)(10, "div", 5)(11, "span", 6);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 7);
    i0.ɵɵtext(14, "Presents");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 8)(16, "span", 6);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 7);
    i0.ɵɵtext(19, "Absents");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 9)(21, "span", 6);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 7);
    i0.ɵɵtext(24, "Retards");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(25, TeacherAttendanceComponent_Conditional_1_Conditional_0_Conditional_25_Template, 2, 0, "button", 10);
    i0.ɵɵelementStart(26, "ul", 11);
    i0.ɵɵrepeaterCreate(27, TeacherAttendanceComponent_Conditional_1_Conditional_0_For_28_Template, 14, 13, "li", 12, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(29, TeacherAttendanceComponent_Conditional_1_Conditional_0_Conditional_29_Template, 2, 0, "p", 13)(30, TeacherAttendanceComponent_Conditional_1_Conditional_0_Conditional_30_Template, 5, 2, "div", 14);
} if (rf & 2) {
    const sheet_r7 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(sheet_r7.classroomName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(8, 7, sheet_r7.sessionDate, "EEEE d MMMM", "", "fr"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.counters().present);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.counters().absent);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.counters().late);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(!ctx_r1.submitted() ? 25 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(sheet_r7.records);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.submitted() ? 29 : 30);
} }
function TeacherAttendanceComponent_Conditional_1_Conditional_1_For_6_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "button", 30);
    i0.ɵɵlistener("click", function TeacherAttendanceComponent_Conditional_1_Conditional_1_For_6_Template_button_click_1_listener() { const classroom_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openSheet(classroom_r9)); });
    i0.ɵɵelementStart(2, "span", 31);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 32);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const classroom_r9 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(classroom_r9.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", classroom_r9.activeEnrollments, " \u00E9l\u00E8ves");
} }
function TeacherAttendanceComponent_Conditional_1_Conditional_1_ForEmpty_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 29);
    i0.ɵɵtext(1, "Aucune classe ne vous est affect\u00E9e.");
    i0.ɵɵelementEnd();
} }
function TeacherAttendanceComponent_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 26);
    i0.ɵɵtext(1, "Faire l'appel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p", 27);
    i0.ɵɵtext(3, "Selectionnez la classe concern\u00E9e.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "ul", 28);
    i0.ɵɵrepeaterCreate(5, TeacherAttendanceComponent_Conditional_1_Conditional_1_For_6_Template, 6, 2, "li", null, _forTrack1, false, TeacherAttendanceComponent_Conditional_1_Conditional_1_ForEmpty_7_Template, 2, 0, "li", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r1.classes());
} }
function TeacherAttendanceComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TeacherAttendanceComponent_Conditional_1_Conditional_0_Template, 31, 12)(1, TeacherAttendanceComponent_Conditional_1_Conditional_1_Template, 8, 1);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.sheet()) ? 0 : 1, tmp_1_0);
} }
/**
 * Attendance taking (section 30).
 *
 * Flow: pick class -> pick course -> student list -> mark -> submit ->
 * server-side validation -> record.
 *
 * The submit carries an idempotency key so a flaky connection or an offline
 * replay cannot register the sheet twice (sections 69 and 80). Nothing is
 * considered final until the server confirms.
 */
export class TeacherAttendanceComponent {
    teachers = inject(TEACHER_DATA_SOURCE);
    attendance = inject(ATTENDANCE_DATA_SOURCE);
    notifications = inject(NotificationService);
    destroyRef = inject(DestroyRef);
    classes = signal([]);
    sheet = signal(null);
    loading = signal(true);
    submitting = signal(false);
    submitted = signal(false);
    today = new Date().toISOString().slice(0, 10);
    /** One key per opened sheet: replaying the submit is safe. */
    idempotencyKey = createUuid();
    counters = computed(() => {
        const records = this.sheet()?.records ?? [];
        return {
            present: records.filter((r) => r.status === 'PRESENT').length,
            absent: records.filter((r) => r.status === 'ABSENT' || r.status === 'EXCUSED_ABSENCE').length,
            late: records.filter((r) => r.status === 'LATE' || r.status === 'EXCUSED_LATE').length,
            total: records.length
        };
    });
    ngOnInit() {
        this.teachers.myClasses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (classes) => {
                this.classes.set(classes);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
    openSheet(classroom) {
        this.loading.set(true);
        this.submitted.set(false);
        this.idempotencyKey = createUuid();
        this.attendance.openSheet(classroom.id, this.today)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (sheet) => {
                this.sheet.set(sheet);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
    mark(studentId, status) {
        this.sheet.update((current) => {
            if (!current) {
                return current;
            }
            return {
                ...current,
                records: current.records.map((record) => record.studentId === studentId
                    ? {
                        ...record,
                        status,
                        arrivalTime: status === 'LATE'
                            ? new Date().toTimeString().slice(0, 5)
                            : undefined
                    }
                    : record)
            };
        });
    }
    /** Marks everyone present, the usual starting point of a roll call. */
    markAllPresent() {
        this.sheet.update((current) => current
            ? { ...current, records: current.records.map((r) => ({ ...r, status: 'PRESENT' })) }
            : current);
    }
    submit() {
        const sheet = this.sheet();
        if (!sheet || this.submitting()) {
            return;
        }
        this.submitting.set(true);
        this.attendance.submitSheet(sheet, this.idempotencyKey)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (saved) => {
                this.sheet.set(saved);
                this.submitting.set(false);
                this.submitted.set(true);
                const counters = this.counters();
                this.notifications.success(`Feuille enregistree : ${counters.present} presents, ${counters.absent} absents, `
                    + `${counters.late} retards. Les parents concernes seront notifies.`, 'Appel valide');
            },
            error: () => this.submitting.set(false)
        });
    }
    close() {
        this.sheet.set(null);
        this.submitted.set(false);
    }
    static ɵfac = function TeacherAttendanceComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TeacherAttendanceComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TeacherAttendanceComponent, selectors: [["eduops-teacher-attendance"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 2, vars: 1, consts: [[1, "sheet-head"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], [1, "sheet-head__title"], [1, "sheet-head__meta"], [1, "counters"], [1, "counter", "counter--present"], [1, "counter__value", "numeric"], [1, "counter__label"], [1, "counter", "counter--absent"], [1, "counter", "counter--late"], ["type", "button", 1, "btn", "btn--secondary", "btn--block"], [1, "roll"], [1, "roll__item"], ["role", "status", 1, "submitted"], [1, "submit-bar"], ["type", "button", 1, "btn", "btn--secondary", "btn--block", 3, "click"], ["size", "sm", 3, "name"], [1, "roll__body"], [1, "roll__name"], [1, "roll__meta", "numeric"], ["role", "group", 1, "marks"], ["type", "button", "aria-label", "Present", 1, "mark", "mark--p", 3, "click", "disabled"], ["type", "button", "aria-label", "Absent", 1, "mark", "mark--a", 3, "click", "disabled"], ["type", "button", "aria-label", "Retard", 1, "mark", "mark--r", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn--primary", "btn--block", "btn--lg", 3, "click", "disabled"], [1, "submit-bar__note"], [1, "title"], [1, "subtitle"], [1, "classes"], [1, "empty"], ["type", "button", 1, "class-row", "card", 3, "click"], [1, "class-row__name"], [1, "class-row__meta", "numeric"]], template: function TeacherAttendanceComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, TeacherAttendanceComponent_Conditional_0_Template, 1, 0, "eduops-loading-state")(1, TeacherAttendanceComponent_Conditional_1_Template, 2, 1);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.loading() ? 0 : 1);
        } }, dependencies: [CommonModule, i1.DatePipe, FormsModule, AvatarComponent, LoadingStateComponent], styles: [".title[_ngcontent-%COMP%] { font-size: var(--text-xl); margin-bottom: var(--space-1); }\n.subtitle[_ngcontent-%COMP%] { color: var(--text-muted); margin-bottom: var(--space-4); font-size: var(--text-sm); }\n\n.classes[_ngcontent-%COMP%] { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-2); }\n.class-row[_ngcontent-%COMP%] {\n  width: 100%; display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-3); padding: var(--space-4); background: var(--surface-card);\n  border: 1px solid var(--border); cursor: pointer; font: inherit; text-align: left;\n}\n.class-row__name[_ngcontent-%COMP%] { font-weight: 600; color: var(--text-strong); }\n.class-row__meta[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--text-muted); }\n\n.sheet-head[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4); }\n.sheet-head__title[_ngcontent-%COMP%] { font-size: var(--text-lg); margin: 0; }\n.sheet-head__meta[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-xs); color: var(--text-muted); text-transform: capitalize; }\n\n.counters[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2); margin-bottom: var(--space-4); }\n.counter[_ngcontent-%COMP%] {\n  display: flex; flex-direction: column; align-items: center;\n  padding: var(--space-3); border-radius: var(--radius-card);\n  background: var(--surface-card); border: 1px solid var(--border);\n}\n.counter__value[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; }\n.counter__label[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--text-muted); }\n.counter--present[_ngcontent-%COMP%]   .counter__value[_ngcontent-%COMP%] { color: var(--success); }\n.counter--absent[_ngcontent-%COMP%]   .counter__value[_ngcontent-%COMP%] { color: var(--danger); }\n.counter--late[_ngcontent-%COMP%]   .counter__value[_ngcontent-%COMP%] { color: var(--warning); }\n\n.roll[_ngcontent-%COMP%] { list-style: none; margin: var(--space-4) 0; padding: 0; display: grid; gap: var(--space-2); }\n.roll__item[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: var(--space-3);\n  padding: var(--space-3); background: var(--surface-card);\n  border: 1px solid var(--border); border-radius: var(--radius-button);\n}\n.roll__body[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n.roll__name[_ngcontent-%COMP%] { margin: 0; font-weight: 600; color: var(--text-strong); font-size: var(--text-sm); }\n.roll__meta[_ngcontent-%COMP%] { margin: 0; font-size: 11px; color: var(--text-muted); }\n\n.marks[_ngcontent-%COMP%] { display: flex; gap: var(--space-1); }\n.mark[_ngcontent-%COMP%] {\n  \n\n  width: 40px; height: 40px;\n  border-radius: var(--radius-button);\n  border: 1px solid var(--border-strong);\n  background: var(--surface-card);\n  font-family: var(--font-display); font-weight: 700; font-size: var(--text-base);\n  color: var(--text-muted); cursor: pointer;\n  transition: all var(--transition-fast);\n}\n.mark[_ngcontent-%COMP%]:disabled { opacity: 0.6; cursor: not-allowed; }\n.mark--p.mark--active[_ngcontent-%COMP%] { background: var(--success); border-color: var(--success); color: #fff; }\n.mark--a.mark--active[_ngcontent-%COMP%] { background: var(--danger); border-color: var(--danger); color: #fff; }\n.mark--r.mark--active[_ngcontent-%COMP%] { background: var(--warning); border-color: var(--warning); color: #fff; }\n\n.submit-bar[_ngcontent-%COMP%] { margin-top: var(--space-5); }\n.submit-bar__note[_ngcontent-%COMP%] { margin: var(--space-2) 0 0; text-align: center; font-size: var(--text-xs); color: var(--text-light); }\n\n.submitted[_ngcontent-%COMP%] {\n  margin-top: var(--space-5); padding: var(--space-4);\n  background: var(--success-bg); color: var(--success);\n  border-radius: var(--radius-button); font-weight: 600; text-align: center;\n}\n\n.empty[_ngcontent-%COMP%] { text-align: center; color: var(--text-muted); padding: var(--space-8) 0; }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeacherAttendanceComponent, [{
        type: Component,
        args: [{ selector: 'eduops-teacher-attendance', standalone: true, imports: [CommonModule, FormsModule, AvatarComponent, LoadingStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (loading()) {\n  <eduops-loading-state />\n} @else {\n  @if (sheet(); as sheet) {\n\n  <header class=\"sheet-head\">\n    <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"close()\">\u2039 Retour</button>\n    <div>\n      <h1 class=\"sheet-head__title\">{{ sheet.classroomName }}</h1>\n      <p class=\"sheet-head__meta\">{{ sheet.sessionDate | date:'EEEE d MMMM':'':'fr' }}</p>\n    </div>\n  </header>\n\n  <div class=\"counters\">\n    <div class=\"counter counter--present\">\n      <span class=\"counter__value numeric\">{{ counters().present }}</span>\n      <span class=\"counter__label\">Presents</span>\n    </div>\n    <div class=\"counter counter--absent\">\n      <span class=\"counter__value numeric\">{{ counters().absent }}</span>\n      <span class=\"counter__label\">Absents</span>\n    </div>\n    <div class=\"counter counter--late\">\n      <span class=\"counter__value numeric\">{{ counters().late }}</span>\n      <span class=\"counter__label\">Retards</span>\n    </div>\n  </div>\n\n  @if (!submitted()) {\n    <button type=\"button\" class=\"btn btn--secondary btn--block\" (click)=\"markAllPresent()\">\n      Tout marquer present\n    </button>\n  }\n\n  <ul class=\"roll\">\n    @for (record of sheet.records; track record.studentId) {\n      <li class=\"roll__item\">\n        <eduops-avatar [name]=\"record.studentName\" size=\"sm\" />\n        <div class=\"roll__body\">\n          <p class=\"roll__name\">{{ record.studentName }}</p>\n          <p class=\"roll__meta numeric\">{{ record.studentNumber }}</p>\n        </div>\n\n        <div class=\"marks\" role=\"group\" [attr.aria-label]=\"'Presence de ' + record.studentName\">\n          <button type=\"button\" class=\"mark mark--p\"\n                  [class.mark--active]=\"record.status === 'PRESENT'\"\n                  [disabled]=\"submitted()\"\n                  (click)=\"mark(record.studentId, 'PRESENT')\"\n                  aria-label=\"Present\">P</button>\n          <button type=\"button\" class=\"mark mark--a\"\n                  [class.mark--active]=\"record.status === 'ABSENT'\"\n                  [disabled]=\"submitted()\"\n                  (click)=\"mark(record.studentId, 'ABSENT')\"\n                  aria-label=\"Absent\">A</button>\n          <button type=\"button\" class=\"mark mark--r\"\n                  [class.mark--active]=\"record.status === 'LATE'\"\n                  [disabled]=\"submitted()\"\n                  (click)=\"mark(record.studentId, 'LATE')\"\n                  aria-label=\"Retard\">R</button>\n        </div>\n      </li>\n    }\n  </ul>\n\n  @if (submitted()) {\n    <p class=\"submitted\" role=\"status\">\n      Feuille validee et enregistr\u00E9e par le serveur. Toute correction sera tracee.\n    </p>\n  } @else {\n    <div class=\"submit-bar\">\n      <button type=\"button\" class=\"btn btn--primary btn--block btn--lg\"\n              [disabled]=\"submitting()\" (click)=\"submit()\">\n        {{ submitting() ? 'Enregistrement...' : \"Valider l'appel\" }}\n      </button>\n      <p class=\"submit-bar__note\">\n        L'appel n'est definitif qu'apr\u00E8s confirmation du serveur.\n      </p>\n    </div>\n  }\n\n} @else {\n  <h1 class=\"title\">Faire l'appel</h1>\n  <p class=\"subtitle\">Selectionnez la classe concern\u00E9e.</p>\n  <ul class=\"classes\">\n    @for (classroom of classes(); track classroom.id) {\n      <li>\n        <button type=\"button\" class=\"class-row card\" (click)=\"openSheet(classroom)\">\n          <span class=\"class-row__name\">{{ classroom.name }}</span>\n          <span class=\"class-row__meta numeric\">{{ classroom.activeEnrollments }} \u00E9l\u00E8ves</span>\n        </button>\n      </li>\n    } @empty {\n      <li class=\"empty\">Aucune classe ne vous est affect\u00E9e.</li>\n    }\n  </ul>\n}\n}\n", styles: [".title { font-size: var(--text-xl); margin-bottom: var(--space-1); }\n.subtitle { color: var(--text-muted); margin-bottom: var(--space-4); font-size: var(--text-sm); }\n\n.classes { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-2); }\n.class-row {\n  width: 100%; display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-3); padding: var(--space-4); background: var(--surface-card);\n  border: 1px solid var(--border); cursor: pointer; font: inherit; text-align: left;\n}\n.class-row__name { font-weight: 600; color: var(--text-strong); }\n.class-row__meta { font-size: var(--text-sm); color: var(--text-muted); }\n\n.sheet-head { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4); }\n.sheet-head__title { font-size: var(--text-lg); margin: 0; }\n.sheet-head__meta { margin: 0; font-size: var(--text-xs); color: var(--text-muted); text-transform: capitalize; }\n\n.counters { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2); margin-bottom: var(--space-4); }\n.counter {\n  display: flex; flex-direction: column; align-items: center;\n  padding: var(--space-3); border-radius: var(--radius-card);\n  background: var(--surface-card); border: 1px solid var(--border);\n}\n.counter__value { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; }\n.counter__label { font-size: var(--text-xs); color: var(--text-muted); }\n.counter--present .counter__value { color: var(--success); }\n.counter--absent .counter__value { color: var(--danger); }\n.counter--late .counter__value { color: var(--warning); }\n\n.roll { list-style: none; margin: var(--space-4) 0; padding: 0; display: grid; gap: var(--space-2); }\n.roll__item {\n  display: flex; align-items: center; gap: var(--space-3);\n  padding: var(--space-3); background: var(--surface-card);\n  border: 1px solid var(--border); border-radius: var(--radius-button);\n}\n.roll__body { flex: 1; min-width: 0; }\n.roll__name { margin: 0; font-weight: 600; color: var(--text-strong); font-size: var(--text-sm); }\n.roll__meta { margin: 0; font-size: 11px; color: var(--text-muted); }\n\n.marks { display: flex; gap: var(--space-1); }\n.mark {\n  /* 44px touch target (section 90) */\n  width: 40px; height: 40px;\n  border-radius: var(--radius-button);\n  border: 1px solid var(--border-strong);\n  background: var(--surface-card);\n  font-family: var(--font-display); font-weight: 700; font-size: var(--text-base);\n  color: var(--text-muted); cursor: pointer;\n  transition: all var(--transition-fast);\n}\n.mark:disabled { opacity: 0.6; cursor: not-allowed; }\n.mark--p.mark--active { background: var(--success); border-color: var(--success); color: #fff; }\n.mark--a.mark--active { background: var(--danger); border-color: var(--danger); color: #fff; }\n.mark--r.mark--active { background: var(--warning); border-color: var(--warning); color: #fff; }\n\n.submit-bar { margin-top: var(--space-5); }\n.submit-bar__note { margin: var(--space-2) 0 0; text-align: center; font-size: var(--text-xs); color: var(--text-light); }\n\n.submitted {\n  margin-top: var(--space-5); padding: var(--space-4);\n  background: var(--success-bg); color: var(--success);\n  border-radius: var(--radius-button); font-weight: 600; text-align: center;\n}\n\n.empty { text-align: center; color: var(--text-muted); padding: var(--space-8) 0; }\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TeacherAttendanceComponent, { className: "TeacherAttendanceComponent", filePath: "frontend/src/app/features/teacher-portal/teacher-attendance.component.ts", lineNumber: 31 }); })();
//# sourceMappingURL=teacher-attendance.component.js.map