import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.id;
function StudentAttendanceComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 0);
} }
function StudentAttendanceComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 2);
    i0.ɵɵlistener("retry", function StudentAttendanceComponent_Conditional_1_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function StudentAttendanceComponent_Conditional_2_Conditional_0_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const att_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind3(2, 1, att_r3.attendanceRate, "1.0-1", "fr-FR"), " %");
} }
function StudentAttendanceComponent_Conditional_2_Conditional_0_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵtext(1, "-");
    i0.ɵɵelementEnd();
} }
function StudentAttendanceComponent_Conditional_2_Conditional_0_For_25_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const record_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(record_r4.reason);
} }
function StudentAttendanceComponent_Conditional_2_Conditional_0_For_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 15)(1, "time", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 18)(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, StudentAttendanceComponent_Conditional_2_Conditional_0_For_25_Conditional_6_Template, 2, 1, "p");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 19);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const record_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵattribute("datetime", record_r4.date);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.dateLabel(record_r4.date));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(record_r4.subjectName || "Journ\u00E9e");
    i0.ɵɵadvance();
    i0.ɵɵconditional(record_r4.reason ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassMap("badge record__pill record__pill--" + ctx_r1.toneOf(record_r4.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", record_r4.statusLabel, " ");
} }
function StudentAttendanceComponent_Conditional_2_Conditional_0_ForEmpty_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-empty-state", 16);
} }
function StudentAttendanceComponent_Conditional_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "header", 4)(2, "div")(3, "p", 5);
    i0.ɵɵtext(4, "Assiduit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h1", 6);
    i0.ɵɵtext(6, "Mes pr\u00E9sences");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 7);
    i0.ɵɵtext(8, "Ton taux de pr\u00E9sence et tes absences r\u00E9centes.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 8)(10, "article", 9)(11, "span", 10);
    i0.ɵɵtext(12, "Taux de pr\u00E9sence");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, StudentAttendanceComponent_Conditional_2_Conditional_0_Conditional_13_Template, 3, 5, "span", 11)(14, StudentAttendanceComponent_Conditional_2_Conditional_0_Conditional_14_Template, 2, 0, "span", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "article", 9)(16, "span", 10);
    i0.ɵɵtext(17, "Absences non justifi\u00E9es");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 11);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "section", 12)(21, "h2", 13);
    i0.ɵɵtext(22, "Relev\u00E9 des pr\u00E9sences");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 14);
    i0.ɵɵrepeaterCreate(24, StudentAttendanceComponent_Conditional_2_Conditional_0_For_25_Template, 9, 7, "article", 15, _forTrack0, false, StudentAttendanceComponent_Conditional_2_Conditional_0_ForEmpty_26_Template, 1, 0, "eduops-empty-state", 16);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const att_r3 = ctx;
    i0.ɵɵadvance(13);
    i0.ɵɵconditional(att_r3.attendanceRate !== undefined ? 13 : 14);
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("summary-card__value--alert", att_r3.unjustifiedAbsences > 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", att_r3.unjustifiedAbsences, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(att_r3.records);
} }
function StudentAttendanceComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, StudentAttendanceComponent_Conditional_2_Conditional_0_Template, 27, 5, "div", 3);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.data()) ? 0 : -1, tmp_1_0);
} }
/** L'état des présences de l'élève (lecture seule). */
export class StudentAttendanceComponent {
    dataSource = inject(STUDENT_PORTAL_DATA_SOURCE);
    destroyRef = inject(DestroyRef);
    data = signal(null);
    loading = signal(true);
    loadFailed = signal(false);
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.loadFailed.set(false);
        this.dataSource.attendance().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (data) => { this.data.set(data); this.loading.set(false); },
            error: () => { this.data.set(null); this.loadFailed.set(true); this.loading.set(false); }
        });
    }
    dateLabel(iso) {
        return new Date(iso).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' });
    }
    /** Trace la tonalité visuelle d'un statut de présence. */
    toneOf(status) {
        switch (status) {
            case 'PRESENT':
            case 'LEFT_EARLY': return 'ok';
            case 'ABSENT':
            case 'EXCUSED_ABSENCE': return 'absent';
            case 'LATE':
            case 'EXCUSED_LATE': return 'late';
            default: return 'neutral';
        }
    }
    static ɵfac = function StudentAttendanceComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StudentAttendanceComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StudentAttendanceComponent, selectors: [["eduops-student-attendance"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 1, consts: [["message", "Chargement de tes pr\u00E9sences..."], ["title", "Pr\u00E9sences indisponibles", "message", "Impossible de r\u00E9cup\u00E9rer tes pr\u00E9sences pour le moment."], ["title", "Pr\u00E9sences indisponibles", "message", "Impossible de r\u00E9cup\u00E9rer tes pr\u00E9sences pour le moment.", 3, "retry"], [1, "attendance-page"], [1, "page-header"], [1, "page-header__eyebrow"], ["id", "attendance-title"], [1, "page-header__message"], [1, "summary"], [1, "summary-card"], [1, "summary-card__label"], [1, "summary-card__value", "numeric"], ["aria-labelledby", "records-title", 1, "records"], ["id", "records-title", 1, "visually-hidden"], [1, "records__list"], [1, "record"], ["title", "Aucun relev\u00E9", "icon", "\u25D0", "message", "Aucune absence ou retard enregistr\u00E9 sur la p\u00E9riode."], [1, "record__date"], [1, "record__body"], [1, "badge"]], template: function StudentAttendanceComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, StudentAttendanceComponent_Conditional_0_Template, 1, 0, "eduops-loading-state", 0)(1, StudentAttendanceComponent_Conditional_1_Template, 1, 0, "eduops-error-state", 1)(2, StudentAttendanceComponent_Conditional_2_Template, 1, 1);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.loading() ? 0 : ctx.loadFailed() ? 1 : 2);
        } }, dependencies: [CommonModule, i1.DecimalPipe, EmptyStateComponent, ErrorStateComponent, LoadingStateComponent], styles: ["@import 'styles/tokens';\n\n[_nghost-%COMP%] { display: block; }\n\n.attendance-page[_ngcontent-%COMP%] { width: 100%; max-width: 920px; margin: 0 auto; }\n\n.page-header[_ngcontent-%COMP%] { margin: var(--space-1) 0 var(--space-4); }\n.page-header__eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-1);\n  color: var(--text-muted);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: .04em;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { font-size: clamp(var(--text-xl), 5vw, var(--text-2xl)); }\n.page-header__message[_ngcontent-%COMP%] { margin: var(--space-1) 0 0; color: var(--text-muted); }\n\n.summary[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); margin-bottom: var(--space-4); }\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n}\n.summary-card__label[_ngcontent-%COMP%] { margin: 0; color: var(--text-muted); font-size: var(--text-xs); }\n.summary-card__value[_ngcontent-%COMP%] { margin: 2px 0 0; color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; }\n.summary-card__value--alert[_ngcontent-%COMP%] { color: var(--danger); }\n\n.records__list[_ngcontent-%COMP%] { display: grid; gap: var(--space-1); }\n.record[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) 0;\n  border-bottom: 1px solid var(--border-light);\n}\n.record[_ngcontent-%COMP%]:last-child { border-bottom: 0; }\n.record__date[_ngcontent-%COMP%] { flex: 0 0 auto; color: var(--text-muted); font-size: var(--text-xs); font-weight: 600; text-transform: capitalize; min-width: 120px; }\n.record__body[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n.record[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-sm); }\n.record__body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); }\n\n.record__pill[_ngcontent-%COMP%] { font-weight: 700; }\n.record__pill--ok[_ngcontent-%COMP%] { color: var(--success); background: var(--success-bg); }\n.record__pill--absent[_ngcontent-%COMP%] { color: var(--danger); background: var(--danger-bg); }\n.record__pill--late[_ngcontent-%COMP%] { color: var(--warning); background: var(--warning-bg); }\n.record__pill--neutral[_ngcontent-%COMP%] { color: var(--text-muted); background: var(--surface-sunken); }\n\n@include mobile {\n  .summary { grid-template-columns: 1fr 1fr; }\n  .record { flex-wrap: wrap; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StudentAttendanceComponent, [{
        type: Component,
        args: [{ selector: 'eduops-student-attendance', standalone: true, imports: [CommonModule, EmptyStateComponent, ErrorStateComponent, LoadingStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (loading()) {\n  <eduops-loading-state message=\"Chargement de tes pr\u00E9sences...\" />\n} @else if (loadFailed()) {\n  <eduops-error-state\n    title=\"Pr\u00E9sences indisponibles\"\n    message=\"Impossible de r\u00E9cup\u00E9rer tes pr\u00E9sences pour le moment.\"\n    (retry)=\"load()\" />\n} @else {\n  @if (data(); as att) {\n    <div class=\"attendance-page\">\n      <header class=\"page-header\">\n        <div>\n          <p class=\"page-header__eyebrow\">Assiduit\u00E9</p>\n          <h1 id=\"attendance-title\">Mes pr\u00E9sences</h1>\n          <p class=\"page-header__message\">Ton taux de pr\u00E9sence et tes absences r\u00E9centes.</p>\n        </div>\n      </header>\n\n      <div class=\"summary\">\n        <article class=\"summary-card\">\n          <span class=\"summary-card__label\">Taux de pr\u00E9sence</span>\n          @if (att.attendanceRate !== undefined) {\n            <span class=\"summary-card__value numeric\">{{ att.attendanceRate | number:'1.0-1':'fr-FR' }} %</span>\n          } @else { <span class=\"summary-card__value numeric\">-</span> }\n        </article>\n        <article class=\"summary-card\">\n          <span class=\"summary-card__label\">Absences non justifi\u00E9es</span>\n          <span class=\"summary-card__value numeric\" [class.summary-card__value--alert]=\"att.unjustifiedAbsences > 0\">\n            {{ att.unjustifiedAbsences }}\n          </span>\n        </article>\n      </div>\n\n      <section class=\"records\" aria-labelledby=\"records-title\">\n        <h2 id=\"records-title\" class=\"visually-hidden\">Relev\u00E9 des pr\u00E9sences</h2>\n        <div class=\"records__list\">\n          @for (record of att.records; track record.id) {\n            <article class=\"record\">\n              <time class=\"record__date\" [attr.datetime]=\"record.date\">{{ dateLabel(record.date) }}</time>\n              <div class=\"record__body\">\n                <h3>{{ record.subjectName || 'Journ\u00E9e' }}</h3>\n                @if (record.reason) { <p>{{ record.reason }}</p> }\n              </div>\n              <span class=\"badge\" [class]=\"'badge record__pill record__pill--' + toneOf(record.status)\">\n                {{ record.statusLabel }}\n              </span>\n            </article>\n          } @empty {\n            <eduops-empty-state\n              title=\"Aucun relev\u00E9\"\n              icon=\"\u25D0\"\n              message=\"Aucune absence ou retard enregistr\u00E9 sur la p\u00E9riode.\" />\n          }\n        </div>\n      </section>\n    </div>\n  }\n}", styles: ["@import 'styles/tokens';\n\n:host { display: block; }\n\n.attendance-page { width: 100%; max-width: 920px; margin: 0 auto; }\n\n.page-header { margin: var(--space-1) 0 var(--space-4); }\n.page-header__eyebrow {\n  margin: 0 0 var(--space-1);\n  color: var(--text-muted);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: .04em;\n}\n.page-header h1 { font-size: clamp(var(--text-xl), 5vw, var(--text-2xl)); }\n.page-header__message { margin: var(--space-1) 0 0; color: var(--text-muted); }\n\n.summary { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); margin-bottom: var(--space-4); }\n.summary-card {\n  display: flex;\n  flex-direction: column;\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n}\n.summary-card__label { margin: 0; color: var(--text-muted); font-size: var(--text-xs); }\n.summary-card__value { margin: 2px 0 0; color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; }\n.summary-card__value--alert { color: var(--danger); }\n\n.records__list { display: grid; gap: var(--space-1); }\n.record {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) 0;\n  border-bottom: 1px solid var(--border-light);\n}\n.record:last-child { border-bottom: 0; }\n.record__date { flex: 0 0 auto; color: var(--text-muted); font-size: var(--text-xs); font-weight: 600; text-transform: capitalize; min-width: 120px; }\n.record__body { flex: 1; min-width: 0; }\n.record h3 { margin: 0; font-size: var(--text-sm); }\n.record__body p { margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); }\n\n.record__pill { font-weight: 700; }\n.record__pill--ok { color: var(--success); background: var(--success-bg); }\n.record__pill--absent { color: var(--danger); background: var(--danger-bg); }\n.record__pill--late { color: var(--warning); background: var(--warning-bg); }\n.record__pill--neutral { color: var(--text-muted); background: var(--surface-sunken); }\n\n@include mobile {\n  .summary { grid-template-columns: 1fr 1fr; }\n  .record { flex-wrap: wrap; }\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StudentAttendanceComponent, { className: "StudentAttendanceComponent", filePath: "frontend/src/app/features/student-portal/student-attendance.component.ts", lineNumber: 19 }); })();
//# sourceMappingURL=student-attendance.component.js.map