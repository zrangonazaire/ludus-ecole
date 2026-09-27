import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { GradePipe } from '@shared/pipes/grade.pipe';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.subjectName;
function StudentGradesComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 0);
} }
function StudentGradesComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 2);
    i0.ɵɵlistener("retry", function StudentGradesComponent_Conditional_1_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function StudentGradesComponent_Conditional_2_Conditional_0_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "span", 15);
    i0.ɵɵtext(2, "Ma moyenne");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 16);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "grade");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const grades_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, grades_r3.average, grades_r3.scaleMax));
} }
function StudentGradesComponent_Conditional_2_Conditional_0_Conditional_10_For_4_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "grade");
} if (rf & 2) {
    const subject_r4 = i0.ɵɵnextContext().$implicit;
    const grades_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(1, 1, subject_r4.average, grades_r3.scaleMax), " ");
} }
function StudentGradesComponent_Conditional_2_Conditional_0_Conditional_10_For_4_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " - ");
} }
function StudentGradesComponent_Conditional_2_Conditional_0_Conditional_10_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 18)(1, "span", 19);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 20)(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 21);
    i0.ɵɵtemplate(9, StudentGradesComponent_Conditional_2_Conditional_0_Conditional_10_For_4_Conditional_9_Template, 2, 4)(10, StudentGradesComponent_Conditional_2_Conditional_0_Conditional_10_For_4_Conditional_10_Template, 1, 0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const subject_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", subject_r4.subjectName.slice(0, 2).toUpperCase(), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(subject_r4.subjectName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", subject_r4.count, " note", subject_r4.count > 1 ? "s" : "", "");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(subject_r4.average !== undefined ? 9 : 10);
} }
function StudentGradesComponent_Conditional_2_Conditional_0_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 9)(1, "h2", 17);
    i0.ɵɵtext(2, "Moyennes par mati\u00E8re");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(3, StudentGradesComponent_Conditional_2_Conditional_0_Conditional_10_For_4_Template, 11, 5, "article", 18, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const grades_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(grades_r3.bySubject);
} }
function StudentGradesComponent_Conditional_2_Conditional_0_For_16_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const record_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("coef. ", record_r5.coefficient, "");
} }
function StudentGradesComponent_Conditional_2_Conditional_0_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 13)(1, "span", 22);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 23)(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 24)(9, "strong", 25);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "grade");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, StudentGradesComponent_Conditional_2_Conditional_0_For_16_Conditional_12_Template, 2, 1, "span");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const record_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", record_r5.subjectName.slice(0, 2).toUpperCase(), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(record_r5.assessmentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", record_r5.subjectName, " \u00B7 ", ctx_r1.publishedAt(record_r5.publishedAt), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 6, record_r5.score, record_r5.maxScore));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(record_r5.coefficient ? 12 : -1);
} }
function StudentGradesComponent_Conditional_2_Conditional_0_ForEmpty_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-empty-state", 14);
} }
function StudentGradesComponent_Conditional_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "header", 4)(2, "div")(3, "p", 5);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h1", 6);
    i0.ɵɵtext(6, "Mes notes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 7);
    i0.ɵɵtext(8, "Tes r\u00E9sultats publi\u00E9s.");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(9, StudentGradesComponent_Conditional_2_Conditional_0_Conditional_9_Template, 6, 4, "div", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, StudentGradesComponent_Conditional_2_Conditional_0_Conditional_10_Template, 5, 0, "section", 9);
    i0.ɵɵelementStart(11, "section", 10)(12, "h2", 11);
    i0.ɵɵtext(13, "D\u00E9tails des notes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 12);
    i0.ɵɵrepeaterCreate(15, StudentGradesComponent_Conditional_2_Conditional_0_For_16_Template, 13, 9, "article", 13, _forTrack0, false, StudentGradesComponent_Conditional_2_Conditional_0_ForEmpty_17_Template, 1, 0, "eduops-empty-state", 14);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const grades_r3 = ctx;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(grades_r3.termLabel);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(grades_r3.average !== undefined ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(grades_r3.bySubject.length > 0 ? 10 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(grades_r3.records);
} }
function StudentGradesComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, StudentGradesComponent_Conditional_2_Conditional_0_Template, 18, 4, "div", 3);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.data()) ? 0 : -1, tmp_1_0);
} }
/**
 * Les notes publiées de l'élève, groupées par matière, avec la moyenne de
 * la période en cours (lecture seule).
 */
export class StudentGradesComponent {
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
        this.dataSource.grades().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (data) => { this.data.set(data); this.loading.set(false); },
            error: () => { this.data.set(null); this.loadFailed.set(true); this.loading.set(false); }
        });
    }
    publishedAt(iso) {
        return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }
    static ɵfac = function StudentGradesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StudentGradesComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StudentGradesComponent, selectors: [["eduops-student-grades"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 1, consts: [["message", "Chargement de tes notes..."], ["title", "Notes indisponibles", "message", "Impossible de r\u00E9cup\u00E9rer tes notes pour le moment."], ["title", "Notes indisponibles", "message", "Impossible de r\u00E9cup\u00E9rer tes notes pour le moment.", 3, "retry"], [1, "grades-page"], [1, "page-header"], [1, "page-header__eyebrow"], ["id", "grades-title"], [1, "page-header__message"], [1, "average-card"], ["aria-labelledby", "subjects-title", 1, "subjects"], ["aria-labelledby", "details-title", 1, "grade-list"], ["id", "details-title", 1, "visually-hidden"], [1, "grade-list__items"], [1, "grade-row"], ["title", "Aucune note publi\u00E9e", "icon", "\u25C9", "message", "Ton \u00E9tablissement n'a pas encore publi\u00E9 de notes sur cette p\u00E9riode."], [1, "average-card__label"], [1, "average-card__value", "numeric"], ["id", "subjects-title", 1, "visually-hidden"], [1, "subject-card"], ["aria-hidden", "true", 1, "subject-card__badge"], [1, "subject-card__body"], [1, "subject-card__average", "numeric"], ["aria-hidden", "true", 1, "grade-row__subject"], [1, "grade-row__body"], [1, "grade-row__result"], [1, "numeric"]], template: function StudentGradesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, StudentGradesComponent_Conditional_0_Template, 1, 0, "eduops-loading-state", 0)(1, StudentGradesComponent_Conditional_1_Template, 1, 0, "eduops-error-state", 1)(2, StudentGradesComponent_Conditional_2_Template, 1, 1);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.loading() ? 0 : ctx.loadFailed() ? 1 : 2);
        } }, dependencies: [CommonModule, EmptyStateComponent, ErrorStateComponent,
            LoadingStateComponent, GradePipe], styles: ["@import 'styles/tokens';\n\n[_nghost-%COMP%] { display: block; }\n\n.grades-page[_ngcontent-%COMP%] { width: 100%; max-width: 920px; margin: 0 auto; }\n\n.page-header[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); margin: var(--space-1) 0 var(--space-4); }\n.page-header__eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-1);\n  color: var(--text-muted);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: .04em;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { font-size: clamp(var(--text-xl), 5vw, var(--text-2xl)); }\n.page-header__message[_ngcontent-%COMP%] { margin: var(--space-1) 0 0; color: var(--text-muted); }\n\n.average-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: var(--space-3) var(--space-4);\n  background: var(--brand-tint);\n  border: 1px solid var(--brand-tint-border);\n  border-radius: var(--radius-card);\n}\n.average-card__label[_ngcontent-%COMP%] { margin: 0; color: var(--text-muted); font-size: var(--text-xs); }\n.average-card__value[_ngcontent-%COMP%] { margin: 2px 0 0; color: var(--brand); font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; }\n\n.subjects[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--space-3); margin-bottom: var(--space-4); }\n.subject-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n}\n.subject-card__badge[_ngcontent-%COMP%] { display: grid; place-items: center; width: 34px; height: 34px; flex: 0 0 34px; color: var(--brand); background: var(--brand-tint); border-radius: 9px; font-size: 10px; font-weight: 800; }\n.subject-card__body[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n.subject-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { overflow: hidden; margin: 0; font-size: var(--text-xs); text-overflow: ellipsis; white-space: nowrap; }\n.subject-card__body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 2px 0 0; color: var(--text-light); font-size: 10px; }\n.subject-card__average[_ngcontent-%COMP%] { color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-sm); white-space: nowrap; }\n\n.grade-list[_ngcontent-%COMP%] { margin-top: var(--space-4); }\n.grade-list__items[_ngcontent-%COMP%] { display: grid; gap: var(--space-1); }\n.grade-row[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-light); }\n.grade-row[_ngcontent-%COMP%]:last-child { border-bottom: 0; }\n.grade-row__subject[_ngcontent-%COMP%] { display: grid; place-items: center; width: 36px; height: 36px; flex: 0 0 36px; color: var(--brand); background: var(--brand-tint); border-radius: 10px; font-size: 10px; font-weight: 800; }\n.grade-row__body[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n.grade-row[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { overflow: hidden; margin: 0; font-size: var(--text-sm); text-overflow: ellipsis; white-space: nowrap; }\n.grade-row__body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { overflow: hidden; margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); text-overflow: ellipsis; white-space: nowrap; }\n.grade-row__result[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: flex-end; }\n.grade-row__result[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-sm); white-space: nowrap; }\n.grade-row__result[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--text-light); font-size: 10px; }\n\n@include mobile {\n  .page-header { flex-wrap: wrap; }\n  .subjects { grid-template-columns: 1fr; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StudentGradesComponent, [{
        type: Component,
        args: [{ selector: 'eduops-student-grades', standalone: true, imports: [CommonModule, EmptyStateComponent, ErrorStateComponent,
                    LoadingStateComponent, GradePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (loading()) {\n  <eduops-loading-state message=\"Chargement de tes notes...\" />\n} @else if (loadFailed()) {\n  <eduops-error-state\n    title=\"Notes indisponibles\"\n    message=\"Impossible de r\u00E9cup\u00E9rer tes notes pour le moment.\"\n    (retry)=\"load()\" />\n} @else {\n  @if (data(); as grades) {\n    <div class=\"grades-page\">\n      <header class=\"page-header\">\n        <div>\n          <p class=\"page-header__eyebrow\">{{ grades.termLabel }}</p>\n          <h1 id=\"grades-title\">Mes notes</h1>\n          <p class=\"page-header__message\">Tes r\u00E9sultats publi\u00E9s.</p>\n        </div>\n        @if (grades.average !== undefined) {\n          <div class=\"average-card\">\n            <span class=\"average-card__label\">Ma moyenne</span>\n            <span class=\"average-card__value numeric\">{{ grades.average | grade:grades.scaleMax }}</span>\n          </div>\n        }\n      </header>\n\n      @if (grades.bySubject.length > 0) {\n        <section class=\"subjects\" aria-labelledby=\"subjects-title\">\n          <h2 id=\"subjects-title\" class=\"visually-hidden\">Moyennes par mati\u00E8re</h2>\n          @for (subject of grades.bySubject; track subject.subjectName) {\n            <article class=\"subject-card\">\n              <span class=\"subject-card__badge\" aria-hidden=\"true\">\n                {{ subject.subjectName.slice(0, 2).toUpperCase() }}\n              </span>\n              <div class=\"subject-card__body\">\n                <h3>{{ subject.subjectName }}</h3>\n                <p>{{ subject.count }} note{{ subject.count > 1 ? 's' : '' }}</p>\n              </div>\n              <span class=\"subject-card__average numeric\">\n                @if (subject.average !== undefined) { {{ subject.average | grade:grades.scaleMax }} } @else { - }\n              </span>\n            </article>\n          }\n        </section>\n      }\n\n      <section class=\"grade-list\" aria-labelledby=\"details-title\">\n        <h2 id=\"details-title\" class=\"visually-hidden\">D\u00E9tails des notes</h2>\n        <div class=\"grade-list__items\">\n          @for (record of grades.records; track record.id) {\n            <article class=\"grade-row\">\n              <span class=\"grade-row__subject\" aria-hidden=\"true\">\n                {{ record.subjectName.slice(0, 2).toUpperCase() }}\n              </span>\n              <div class=\"grade-row__body\">\n                <h3>{{ record.assessmentName }}</h3>\n                <p>{{ record.subjectName }} \u00B7 {{ publishedAt(record.publishedAt) }}</p>\n              </div>\n              <div class=\"grade-row__result\">\n                <strong class=\"numeric\">{{ record.score | grade:record.maxScore }}</strong>\n                @if (record.coefficient) { <span>coef. {{ record.coefficient }}</span> }\n              </div>\n            </article>\n          } @empty {\n            <eduops-empty-state\n              title=\"Aucune note publi\u00E9e\"\n              icon=\"\u25C9\"\n              message=\"Ton \u00E9tablissement n'a pas encore publi\u00E9 de notes sur cette p\u00E9riode.\" />\n          }\n        </div>\n      </section>\n    </div>\n  }\n}", styles: ["@import 'styles/tokens';\n\n:host { display: block; }\n\n.grades-page { width: 100%; max-width: 920px; margin: 0 auto; }\n\n.page-header { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); margin: var(--space-1) 0 var(--space-4); }\n.page-header__eyebrow {\n  margin: 0 0 var(--space-1);\n  color: var(--text-muted);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: .04em;\n}\n.page-header h1 { font-size: clamp(var(--text-xl), 5vw, var(--text-2xl)); }\n.page-header__message { margin: var(--space-1) 0 0; color: var(--text-muted); }\n\n.average-card {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  padding: var(--space-3) var(--space-4);\n  background: var(--brand-tint);\n  border: 1px solid var(--brand-tint-border);\n  border-radius: var(--radius-card);\n}\n.average-card__label { margin: 0; color: var(--text-muted); font-size: var(--text-xs); }\n.average-card__value { margin: 2px 0 0; color: var(--brand); font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; }\n\n.subjects { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--space-3); margin-bottom: var(--space-4); }\n.subject-card {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n}\n.subject-card__badge { display: grid; place-items: center; width: 34px; height: 34px; flex: 0 0 34px; color: var(--brand); background: var(--brand-tint); border-radius: 9px; font-size: 10px; font-weight: 800; }\n.subject-card__body { flex: 1; min-width: 0; }\n.subject-card h3 { overflow: hidden; margin: 0; font-size: var(--text-xs); text-overflow: ellipsis; white-space: nowrap; }\n.subject-card__body p { margin: 2px 0 0; color: var(--text-light); font-size: 10px; }\n.subject-card__average { color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-sm); white-space: nowrap; }\n\n.grade-list { margin-top: var(--space-4); }\n.grade-list__items { display: grid; gap: var(--space-1); }\n.grade-row { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-light); }\n.grade-row:last-child { border-bottom: 0; }\n.grade-row__subject { display: grid; place-items: center; width: 36px; height: 36px; flex: 0 0 36px; color: var(--brand); background: var(--brand-tint); border-radius: 10px; font-size: 10px; font-weight: 800; }\n.grade-row__body { flex: 1; min-width: 0; }\n.grade-row h3 { overflow: hidden; margin: 0; font-size: var(--text-sm); text-overflow: ellipsis; white-space: nowrap; }\n.grade-row__body p { overflow: hidden; margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); text-overflow: ellipsis; white-space: nowrap; }\n.grade-row__result { display: flex; flex-direction: column; align-items: flex-end; }\n.grade-row__result strong { color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-sm); white-space: nowrap; }\n.grade-row__result span { color: var(--text-light); font-size: 10px; }\n\n@include mobile {\n  .page-header { flex-wrap: wrap; }\n  .subjects { grid-template-columns: 1fr; }\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StudentGradesComponent, { className: "StudentGradesComponent", filePath: "frontend/src/app/features/student-portal/student-grades.component.ts", lineNumber: 24 }); })();
//# sourceMappingURL=student-grades.component.js.map