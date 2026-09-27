import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.subjectName;
function StudentReportCardsComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 0);
} }
function StudentReportCardsComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 3);
    i0.ɵɵlistener("retry", function StudentReportCardsComponent_Conditional_1_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function StudentReportCardsComponent_Conditional_2_For_11_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u00B7 publi\u00E9 le ", ctx_r1.publishedAt(card_r4.publishedAt), "");
} }
function StudentReportCardsComponent_Conditional_2_For_11_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", card_r4.generalAverage, "/", card_r4.scaleMax, "");
} }
function StudentReportCardsComponent_Conditional_2_For_11_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 19);
    i0.ɵɵtext(1, "-");
    i0.ɵɵelementEnd();
} }
function StudentReportCardsComponent_Conditional_2_For_11_Conditional_28_For_2_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const line_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("coef. ", line_r5.coefficient, "");
} }
function StudentReportCardsComponent_Conditional_2_For_11_Conditional_28_For_2_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const line_r5 = i0.ɵɵnextContext().$implicit;
    const card_r4 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵtextInterpolate2(" ", line_r5.subjectAverage, "/", card_r4.scaleMax, " ");
} }
function StudentReportCardsComponent_Conditional_2_For_11_Conditional_28_For_2_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u2014 ");
} }
function StudentReportCardsComponent_Conditional_2_For_11_Conditional_28_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "span", 23);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, StudentReportCardsComponent_Conditional_2_For_11_Conditional_28_For_2_Conditional_3_Template, 2, 1, "span", 24);
    i0.ɵɵelementStart(4, "span", 25);
    i0.ɵɵtemplate(5, StudentReportCardsComponent_Conditional_2_For_11_Conditional_28_For_2_Conditional_5_Template, 1, 2)(6, StudentReportCardsComponent_Conditional_2_For_11_Conditional_28_For_2_Conditional_6_Template, 1, 0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const line_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(line_r5.subjectName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(line_r5.coefficient ? 3 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(line_r5.subjectAverage !== undefined ? 5 : 6);
} }
function StudentReportCardsComponent_Conditional_2_For_11_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ol", 22);
    i0.ɵɵrepeaterCreate(1, StudentReportCardsComponent_Conditional_2_For_11_Conditional_28_For_2_Template, 7, 3, "li", null, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(card_r4.lines);
} }
function StudentReportCardsComponent_Conditional_2_For_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 9)(1, "header", 11)(2, "div", 12)(3, "h2", 13);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 14);
    i0.ɵɵtext(6);
    i0.ɵɵtemplate(7, StudentReportCardsComponent_Conditional_2_For_11_Conditional_7_Template, 2, 1, "span");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 15);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 16)(11, "div", 17)(12, "span", 18);
    i0.ɵɵtext(13, "Moyenne g\u00E9n\u00E9rale");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, StudentReportCardsComponent_Conditional_2_For_11_Conditional_14_Template, 2, 2, "span", 19)(15, StudentReportCardsComponent_Conditional_2_For_11_Conditional_15_Template, 2, 0, "span", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 17)(17, "span", 18);
    i0.ɵɵtext(18, "Rang");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 20);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 17)(22, "span", 18);
    i0.ɵɵtext(23, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 20);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(26, "button", 21);
    i0.ɵɵlistener("click", function StudentReportCardsComponent_Conditional_2_For_11_Template_button_click_26_listener() { const card_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggle(card_r4.id)); });
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(28, StudentReportCardsComponent_Conditional_2_For_11_Conditional_28_Template, 3, 0, "ol", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(card_r4.termName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", card_r4.academicYearCode, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r4.publishedAt ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(card_r4.passing ? "badge--success" : "badge--danger");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", card_r4.passing ? "Admis" : "A am\u00E9liorer", " ");
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(card_r4.generalAverage !== undefined ? 14 : 15);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(card_r4.rankLabel || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(card_r4.statusLabel);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-expanded", ctx_r1.expanded() === card_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.expanded() === card_r4.id ? "Masquer le d\u00E9tail" : "Voir le d\u00E9tail par mati\u00E8re", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.expanded() === card_r4.id ? 28 : -1);
} }
function StudentReportCardsComponent_Conditional_2_ForEmpty_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-empty-state", 10);
} }
function StudentReportCardsComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2)(1, "header", 4)(2, "div")(3, "p", 5);
    i0.ɵɵtext(4, "Fin de p\u00E9riode");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h1", 6);
    i0.ɵɵtext(6, "Mes bulletins");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 7);
    i0.ɵɵtext(8, "Consultables d\u00E8s leur remise aux familles.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 8);
    i0.ɵɵrepeaterCreate(10, StudentReportCardsComponent_Conditional_2_For_11_Template, 29, 12, "article", 9, _forTrack0, false, StudentReportCardsComponent_Conditional_2_ForEmpty_12_Template, 1, 0, "eduops-empty-state", 10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(ctx_r1.list());
} }
/** Les bulletins publiés de l'élève, consultables dès leur remise aux familles. */
export class StudentReportCardsComponent {
    dataSource = inject(STUDENT_PORTAL_DATA_SOURCE);
    destroyRef = inject(DestroyRef);
    list = signal([]);
    loading = signal(true);
    loadFailed = signal(false);
    /** Bulletin dont le détail des matières est déplié. */
    expanded = signal(null);
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.loadFailed.set(false);
        this.dataSource.reportCards().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (list) => { this.list.set(list); this.loading.set(false); },
            error: () => { this.list.set([]); this.loadFailed.set(true); this.loading.set(false); }
        });
    }
    toggle(cardId) {
        this.expanded.update((open) => (open === cardId ? null : cardId));
    }
    publishedAt(iso) {
        return iso ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    }
    static ɵfac = function StudentReportCardsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StudentReportCardsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StudentReportCardsComponent, selectors: [["eduops-student-report-cards"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 1, consts: [["message", "Chargement de tes bulletins..."], ["title", "Bulletins indisponibles", "message", "Impossible de r\u00E9cup\u00E9rer tes bulletins pour le moment."], [1, "report-cards-page"], ["title", "Bulletins indisponibles", "message", "Impossible de r\u00E9cup\u00E9rer tes bulletins pour le moment.", 3, "retry"], [1, "page-header"], [1, "page-header__eyebrow"], ["id", "report-cards-title"], [1, "page-header__message"], [1, "cards"], [1, "card"], ["title", "Aucun bulletin publi\u00E9", "icon", "\u25A3", "message", "Ton \u00E9tablissement n'a pas encore remis de bulletin sur cette ann\u00E9e scolaire."], [1, "card__head"], [1, "card__head-main"], [1, "card__title"], [1, "card__meta"], [1, "badge"], [1, "card__figures"], [1, "figure"], [1, "figure__label"], [1, "figure__value", "numeric"], [1, "figure__value"], ["type", "button", 1, "card__toggle", 3, "click"], [1, "card__lines"], [1, "card__lines-subject"], [1, "card__lines-coef", "numeric"], [1, "card__lines-average", "numeric"]], template: function StudentReportCardsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, StudentReportCardsComponent_Conditional_0_Template, 1, 0, "eduops-loading-state", 0)(1, StudentReportCardsComponent_Conditional_1_Template, 1, 0, "eduops-error-state", 1)(2, StudentReportCardsComponent_Conditional_2_Template, 13, 1, "div", 2);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.loading() ? 0 : ctx.loadFailed() ? 1 : 2);
        } }, dependencies: [CommonModule, EmptyStateComponent, ErrorStateComponent, LoadingStateComponent], styles: ["@import 'styles/tokens';\n\n[_nghost-%COMP%] { display: block; }\n\n.report-cards-page[_ngcontent-%COMP%] { width: 100%; max-width: 920px; margin: 0 auto; }\n\n.page-header[_ngcontent-%COMP%] { margin: var(--space-1) 0 var(--space-4); }\n.page-header__eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-1);\n  color: var(--text-muted);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: .04em;\n}\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { font-size: clamp(var(--text-xl), 5vw, var(--text-2xl)); }\n.page-header__message[_ngcontent-%COMP%] { margin: var(--space-1) 0 0; color: var(--text-muted); }\n\n.cards[_ngcontent-%COMP%] { display: grid; gap: var(--space-4); }\n\n.card[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n}\n.card__head[_ngcontent-%COMP%] { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-2); }\n.card__title[_ngcontent-%COMP%] { margin: 0; font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; }\n.card__meta[_ngcontent-%COMP%] { margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); }\n\n.card__figures[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); margin: var(--space-4) 0 0; }\n.figure[_ngcontent-%COMP%] { display: flex; flex-direction: column; }\n.figure__label[_ngcontent-%COMP%] { margin: 0; color: var(--text-muted); font-size: var(--text-xs); }\n.figure__value[_ngcontent-%COMP%] { margin: 2px 0 0; color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-md); font-weight: 700; }\n\n.card__toggle[_ngcontent-%COMP%] {\n  display: block;\n  margin: var(--space-3) 0 0;\n  padding: 0;\n  border: 0;\n  background: none;\n  color: var(--brand);\n  font-size: var(--text-xs);\n  cursor: pointer;\n}\n\n.card__lines[_ngcontent-%COMP%] { display: grid; gap: var(--space-1); margin: var(--space-3) 0 0; }\n.card__lines[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-2);\n  padding: var(--space-2) var(--space-2);\n  border-bottom: 1px solid var(--border-light);\n}\n.card__lines[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child { border-bottom: 0; }\n.card__lines-subject[_ngcontent-%COMP%] { color: var(--text-normal); font-size: var(--text-xs); }\n.card__lines-coef[_ngcontent-%COMP%] { color: var(--text-light); font-size: 10px; }\n.card__lines-average[_ngcontent-%COMP%] { color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-sm); white-space: nowrap; }\n\n@include mobile {\n  .card__figures { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-2); }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StudentReportCardsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-student-report-cards', standalone: true, imports: [CommonModule, EmptyStateComponent, ErrorStateComponent, LoadingStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (loading()) {\n  <eduops-loading-state message=\"Chargement de tes bulletins...\" />\n} @else if (loadFailed()) {\n  <eduops-error-state\n    title=\"Bulletins indisponibles\"\n    message=\"Impossible de r\u00E9cup\u00E9rer tes bulletins pour le moment.\"\n    (retry)=\"load()\" />\n} @else {\n  <div class=\"report-cards-page\">\n    <header class=\"page-header\">\n      <div>\n        <p class=\"page-header__eyebrow\">Fin de p\u00E9riode</p>\n        <h1 id=\"report-cards-title\">Mes bulletins</h1>\n        <p class=\"page-header__message\">Consultables d\u00E8s leur remise aux familles.</p>\n      </div>\n    </header>\n\n    <div class=\"cards\">\n      @for (card of list(); track card.id) {\n        <article class=\"card\">\n          <header class=\"card__head\">\n            <div class=\"card__head-main\">\n              <h2 class=\"card__title\">{{ card.termName }}</h2>\n              <p class=\"card__meta\">\n                {{ card.academicYearCode }}\n                @if (card.publishedAt) { <span>\u00B7 publi\u00E9 le {{ publishedAt(card.publishedAt) }}</span> }\n              </p>\n            </div>\n            <span class=\"badge\" [class]=\"card.passing ? 'badge--success' : 'badge--danger'\">\n              {{ card.passing ? 'Admis' : 'A am\u00E9liorer' }}\n            </span>\n          </header>\n\n          <div class=\"card__figures\">\n            <div class=\"figure\">\n              <span class=\"figure__label\">Moyenne g\u00E9n\u00E9rale</span>\n              @if (card.generalAverage !== undefined) {\n                <span class=\"figure__value numeric\">{{ card.generalAverage }}/{{ card.scaleMax }}</span>\n              } @else { <span class=\"figure__value numeric\">-</span> }\n            </div>\n            <div class=\"figure\">\n              <span class=\"figure__label\">Rang</span>\n              <span class=\"figure__value\">{{ card.rankLabel || '\u2014' }}</span>\n            </div>\n            <div class=\"figure\">\n              <span class=\"figure__label\">Statut</span>\n              <span class=\"figure__value\">{{ card.statusLabel }}</span>\n            </div>\n          </div>\n\n          <button type=\"button\" class=\"card__toggle\" (click)=\"toggle(card.id)\"\n            [attr.aria-expanded]=\"expanded() === card.id\">\n            {{ expanded() === card.id ? 'Masquer le d\u00E9tail' : 'Voir le d\u00E9tail par mati\u00E8re' }}\n          </button>\n\n          @if (expanded() === card.id) {\n            <ol class=\"card__lines\">\n              @for (line of card.lines; track line.subjectName) {\n                <li>\n                  <span class=\"card__lines-subject\">{{ line.subjectName }}</span>\n                  @if (line.coefficient) { <span class=\"card__lines-coef numeric\">coef. {{ line.coefficient }}</span> }\n                  <span class=\"card__lines-average numeric\">\n                    @if (line.subjectAverage !== undefined) { {{ line.subjectAverage }}/{{ card.scaleMax }} } @else { \u2014 }\n                  </span>\n                </li>\n              }\n            </ol>\n          }\n        </article>\n      } @empty {\n        <eduops-empty-state\n          title=\"Aucun bulletin publi\u00E9\"\n          icon=\"\u25A3\"\n          message=\"Ton \u00E9tablissement n'a pas encore remis de bulletin sur cette ann\u00E9e scolaire.\" />\n      }\n    </div>\n  </div>\n}", styles: ["@import 'styles/tokens';\n\n:host { display: block; }\n\n.report-cards-page { width: 100%; max-width: 920px; margin: 0 auto; }\n\n.page-header { margin: var(--space-1) 0 var(--space-4); }\n.page-header__eyebrow {\n  margin: 0 0 var(--space-1);\n  color: var(--text-muted);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: .04em;\n}\n.page-header h1 { font-size: clamp(var(--text-xl), 5vw, var(--text-2xl)); }\n.page-header__message { margin: var(--space-1) 0 0; color: var(--text-muted); }\n\n.cards { display: grid; gap: var(--space-4); }\n\n.card {\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n}\n.card__head { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-2); }\n.card__title { margin: 0; font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; }\n.card__meta { margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); }\n\n.card__figures { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); margin: var(--space-4) 0 0; }\n.figure { display: flex; flex-direction: column; }\n.figure__label { margin: 0; color: var(--text-muted); font-size: var(--text-xs); }\n.figure__value { margin: 2px 0 0; color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-md); font-weight: 700; }\n\n.card__toggle {\n  display: block;\n  margin: var(--space-3) 0 0;\n  padding: 0;\n  border: 0;\n  background: none;\n  color: var(--brand);\n  font-size: var(--text-xs);\n  cursor: pointer;\n}\n\n.card__lines { display: grid; gap: var(--space-1); margin: var(--space-3) 0 0; }\n.card__lines li {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-2);\n  padding: var(--space-2) var(--space-2);\n  border-bottom: 1px solid var(--border-light);\n}\n.card__lines li:last-child { border-bottom: 0; }\n.card__lines-subject { color: var(--text-normal); font-size: var(--text-xs); }\n.card__lines-coef { color: var(--text-light); font-size: 10px; }\n.card__lines-average { color: var(--text-strong); font-family: var(--font-display); font-size: var(--text-sm); white-space: nowrap; }\n\n@include mobile {\n  .card__figures { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-2); }\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StudentReportCardsComponent, { className: "StudentReportCardsComponent", filePath: "frontend/src/app/features/student-portal/student-report-cards.component.ts", lineNumber: 19 }); })();
//# sourceMappingURL=student-report-cards.component.js.map