import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { CLASSROOM_DATA_SOURCE, REFERENCE_DATA_SOURCE, REPORT_CARD_DATA_SOURCE } from '@core/datasource/data-source';
import { COUNCIL_DECISIONS, REPORT_CARD_STATES } from '@core/models/report-card.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.subjectName;
const _forTrack2 = ($index, $item) => $item.code;
function ReportCardsComponent_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const b_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", b_r1.publishedCount, " remis ");
} }
function ReportCardsComponent_Conditional_7_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const b_r1 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 moyenne de classe ", ctx_r1.formatAverage(b_r1.classAverage), " ");
} }
function ReportCardsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵtemplate(1, ReportCardsComponent_Conditional_7_Conditional_1_Template, 1, 1)(2, ReportCardsComponent_Conditional_7_Conditional_2_Template, 1, 1);
} if (rf & 2) {
    const b_r1 = ctx;
    i0.ɵɵtextInterpolate2(" ", b_r1.generatedCount, "/", b_r1.studentCount, " bulletin(s) g\u00E9n\u00E9r\u00E9s ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(b_r1.publishedCount > 0 ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(b_r1.classAverage !== undefined ? 2 : -1);
} }
function ReportCardsComponent_Conditional_9_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 19);
    i0.ɵɵlistener("click", function ReportCardsComponent_Conditional_9_Conditional_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.printAll()); });
    i0.ɵɵtext(1, " Imprimer la classe ");
    i0.ɵɵelementEnd();
} }
function ReportCardsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ReportCardsComponent_Conditional_9_Conditional_0_Template, 2, 0, "button", 18);
} if (rf & 2) {
    i0.ɵɵconditional(ctx.generatedCount > 0 ? 0 : -1);
} }
function ReportCardsComponent_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", classroom_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(classroom_r4.name);
} }
function ReportCardsComponent_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const term_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", term_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(term_r5.name);
} }
function ReportCardsComponent_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.missing());
} }
function ReportCardsComponent_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.pending());
} }
function ReportCardsComponent_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 14);
} }
function ReportCardsComponent_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 20);
    i0.ɵɵlistener("retry", function ReportCardsComponent_Conditional_33_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function ReportCardsComponent_Conditional_34_Conditional_0_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 26)(1, "div", 35)(2, "span", 36);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 37);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 38);
    i0.ɵɵtext(8, " G\u00E9n\u00E9rer maintenant calculerait les moyennes sur une partie du travail, et rien en aval ne s'en apercevrait. Validez ces devoirs dans \u00C9valuations avant de continuer. ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const b_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2(" ", b_r7.unvalidatedAssessments, " devoir(s) de ", b_r7.termName, " sans notes valid\u00E9es ");
} }
function ReportCardsComponent_Conditional_34_Conditional_0_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 27)(1, "div", 35)(2, "span", 36);
    i0.ɵɵtext(3, "?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 37);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 38);
    i0.ɵɵtext(8, " Leur bulletin sortirait vide. C'est un probl\u00E8me de saisie, pas de bulletin : il se r\u00E8gle dans \u00C9valuations. ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const b_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", b_r7.studentsWithoutGrades, " \u00E9l\u00E8ve(s) sans aucune note valid\u00E9e ");
} }
function ReportCardsComponent_Conditional_34_Conditional_0_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const b_r7 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate2(" de ", ctx_r1.formatAverage(b_r7.classMinAverage), " \u00E0 ", ctx_r1.formatAverage(b_r7.classMaxAverage), " ");
} }
function ReportCardsComponent_Conditional_34_Conditional_0_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucun bulletin g\u00E9n\u00E9r\u00E9 ");
} }
function ReportCardsComponent_Conditional_34_Conditional_0_Conditional_33_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 40);
    i0.ɵɵlistener("click", function ReportCardsComponent_Conditional_34_Conditional_0_Conditional_33_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.generate(true)); });
    i0.ɵɵtext(1, " Tout recalculer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p", 41);
    i0.ɵɵtext(3, " Recalculer ne touche pas aux bulletins d\u00E9j\u00E0 remis : ils repartent en r\u00E9vision suivante, l'ancienne restant consultable. ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const b_r7 = i0.ɵɵnextContext(2);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || !b_r7.readyToGenerate);
} }
function ReportCardsComponent_Conditional_34_Conditional_0_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 39);
    i0.ɵɵlistener("click", function ReportCardsComponent_Conditional_34_Conditional_0_Conditional_33_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.generate(false)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, ReportCardsComponent_Conditional_34_Conditional_0_Conditional_33_Conditional_2_Template, 4, 1);
} if (rf & 2) {
    const b_r7 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || !b_r7.readyToGenerate);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", b_r7.generatedCount === 0 ? "G\u00E9n\u00E9rer les bulletins" : "G\u00E9n\u00E9rer les manquants", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(b_r7.generatedCount > 0 ? 2 : -1);
} }
function ReportCardsComponent_Conditional_34_Conditional_0_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 39);
    i0.ɵɵlistener("click", function ReportCardsComponent_Conditional_34_Conditional_0_Conditional_34_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.publishAll()); });
    i0.ɵɵtext(1, " Remettre toute la classe ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p", 41);
    i0.ɵɵtext(3, " Les bulletins se distribuent ensemble : publier un par un ferait que certaines familles voient les notes plusieurs jours avant les autres. ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const b_r7 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || b_r7.generatedCount === 0 || b_r7.publishedCount === b_r7.generatedCount);
} }
function ReportCardsComponent_Conditional_34_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ReportCardsComponent_Conditional_34_Conditional_0_Conditional_0_Template, 9, 2, "section", 26)(1, ReportCardsComponent_Conditional_34_Conditional_0_Conditional_1_Template, 9, 1, "section", 27);
    i0.ɵɵelementStart(2, "section", 28)(3, "article", 29)(4, "p", 30);
    i0.ɵɵtext(5, "Moyenne de la classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 31);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 32);
    i0.ɵɵtemplate(9, ReportCardsComponent_Conditional_34_Conditional_0_Conditional_9_Template, 1, 2)(10, ReportCardsComponent_Conditional_34_Conditional_0_Conditional_10_Template, 1, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "article", 33)(12, "p", 30);
    i0.ɵɵtext(13, "Ont la moyenne");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 31);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p", 32);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "article", 29)(19, "p", 30);
    i0.ɵɵtext(20, "Restent \u00E0 g\u00E9n\u00E9rer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p", 31);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "p", 32);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "article", 33)(26, "p", 30);
    i0.ɵɵtext(27, "Remis aux familles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "p", 31);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "p", 32);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(32, "section", 34);
    i0.ɵɵtemplate(33, ReportCardsComponent_Conditional_34_Conditional_0_Conditional_33_Template, 3, 3)(34, ReportCardsComponent_Conditional_34_Conditional_0_Conditional_34_Template, 4, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const b_r7 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(b_r7.unvalidatedAssessments > 0 ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(b_r7.studentsWithoutGrades > 0 ? 1 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.formatAverage(b_r7.classAverage));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(b_r7.classMinAverage !== undefined ? 9 : 10);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(b_r7.passingCount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("sur ", b_r7.generatedCount, " bulletin(s)");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("stat--alert", ctx_r1.missing() > 0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.missing());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("sur ", b_r7.studentCount, " \u00E9l\u00E8ve(s)");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(b_r7.publishedCount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", b_r7.generatedCount - b_r7.publishedCount, " en attente de remise ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.tab() === "GENERATION" ? 33 : ctx_r1.tab() === "REMISE" ? 34 : -1);
} }
function ReportCardsComponent_Conditional_34_For_23_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵelementStart(1, "small");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", card_r12.rankInClass, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("/", card_r12.classSize, "");
} }
function ReportCardsComponent_Conditional_34_For_23_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u2014 ");
} }
function ReportCardsComponent_Conditional_34_For_23_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const card_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 r\u00E9vision ", card_r12.revision, " ");
} }
function ReportCardsComponent_Conditional_34_For_23_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u00B7 ", card_r12.latenessCount, " retard(s)");
} }
function ReportCardsComponent_Conditional_34_For_23_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 49);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(card_r12.councilDecisionLabel);
} }
function ReportCardsComponent_Conditional_34_For_23_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td", 42);
    i0.ɵɵtemplate(2, ReportCardsComponent_Conditional_34_For_23_Conditional_2_Template, 3, 2, "small")(3, ReportCardsComponent_Conditional_34_For_23_Conditional_3_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td")(5, "span", 43);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 44);
    i0.ɵɵtext(8);
    i0.ɵɵtemplate(9, ReportCardsComponent_Conditional_34_For_23_Conditional_9_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "td", 45);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 46);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 47);
    i0.ɵɵtext(15);
    i0.ɵɵtemplate(16, ReportCardsComponent_Conditional_34_For_23_Conditional_16_Template, 2, 1, "small");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td")(18, "span", 48);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, ReportCardsComponent_Conditional_34_For_23_Conditional_20_Template, 2, 1, "span", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 50)(22, "button", 51);
    i0.ɵɵlistener("click", function ReportCardsComponent_Conditional_34_For_23_Template_button_click_22_listener() { const card_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.printOne(card_r12)); });
    i0.ɵɵtext(23, "Imprimer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "button", 52);
    i0.ɵɵlistener("click", function ReportCardsComponent_Conditional_34_For_23_Template_button_click_24_listener() { const card_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openReview(card_r12)); });
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const card_r12 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("row--top", card_r12.rankInClass === 1)("row--failing", !card_r12.passing && card_r12.generalAverage !== undefined);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(card_r12.rankInClass !== undefined ? 2 : 3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(card_r12.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", card_r12.studentNumber, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r12.revision > 1 ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("average--fail", !card_r12.passing);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.formatAverage(card_r12.generalAverage, card_r12.scaleMax), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.gapToClass(card_r12) || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", card_r12.absenceCount, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r12.latenessCount > 0 ? 16 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-tone", ctx_r1.stateOf(card_r12.status).tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", card_r12.statusLabel, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r12.councilDecisionLabel ? 20 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", card_r12.editable ? "Relire" : "Voir", " ");
} }
function ReportCardsComponent_Conditional_34_ForEmpty_24_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucun bulletin remis pour l'instant. ");
} }
function ReportCardsComponent_Conditional_34_ForEmpty_24_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucun bulletin \u00E0 relire. ");
} }
function ReportCardsComponent_Conditional_34_ForEmpty_24_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucun bulletin g\u00E9n\u00E9r\u00E9 pour cette classe et cette p\u00E9riode. ");
} }
function ReportCardsComponent_Conditional_34_ForEmpty_24_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " La g\u00E9n\u00E9ration calcule toute la classe en une passe : c'est ce qui donne un sens au rang port\u00E9 par chaque bulletin. ");
} }
function ReportCardsComponent_Conditional_34_ForEmpty_24_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Les bulletins apparaissent ici une fois g\u00E9n\u00E9r\u00E9s. ");
} }
function ReportCardsComponent_Conditional_34_ForEmpty_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 53)(2, "div", 54)(3, "p", 55);
    i0.ɵɵtemplate(4, ReportCardsComponent_Conditional_34_ForEmpty_24_Conditional_4_Template, 1, 0)(5, ReportCardsComponent_Conditional_34_ForEmpty_24_Conditional_5_Template, 1, 0)(6, ReportCardsComponent_Conditional_34_ForEmpty_24_Conditional_6_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 56);
    i0.ɵɵtemplate(8, ReportCardsComponent_Conditional_34_ForEmpty_24_Conditional_8_Template, 1, 0)(9, ReportCardsComponent_Conditional_34_ForEmpty_24_Conditional_9_Template, 1, 0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r1.tab() === "REMISE" ? 4 : ctx_r1.tab() === "RELECTURE" ? 5 : 6);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r1.tab() === "GENERATION" ? 8 : 9);
} }
function ReportCardsComponent_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ReportCardsComponent_Conditional_34_Conditional_0_Template, 35, 13);
    i0.ɵɵelementStart(1, "div", 15)(2, "table", 21)(3, "caption", 8);
    i0.ɵɵtext(4, "Classement de la classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "thead")(6, "tr")(7, "th", 22);
    i0.ɵɵtext(8, "Rang");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 22);
    i0.ɵɵtext(10, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 23);
    i0.ɵɵtext(12, "Moyenne");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 23);
    i0.ɵɵtext(14, "\u00C9cart");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th", 23);
    i0.ɵɵtext(16, "Absences");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th", 22);
    i0.ɵɵtext(18, "\u00C9tat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 24);
    i0.ɵɵtext(20, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "tbody");
    i0.ɵɵrepeaterCreate(22, ReportCardsComponent_Conditional_34_For_23_Template, 26, 18, "tr", 25, _forTrack0, false, ReportCardsComponent_Conditional_34_ForEmpty_24_Template, 10, 2, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.batch()) ? 0 : -1, tmp_1_0);
    i0.ɵɵadvance(22);
    i0.ɵɵrepeater(ctx_r1.visible());
} }
function ReportCardsComponent_Conditional_35_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const card_r14 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 r\u00E9vision ", card_r14.revision, " ");
} }
function ReportCardsComponent_Conditional_35_For_48_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const line_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", line_r15.appreciation, " ");
} }
function ReportCardsComponent_Conditional_35_For_48_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 82);
    i0.ɵɵtext(1, "Aucune note valid\u00E9e");
    i0.ɵɵelementEnd();
} }
function ReportCardsComponent_Conditional_35_For_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 47);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 45);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 47);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 47);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtemplate(12, ReportCardsComponent_Conditional_35_For_48_Conditional_12_Template, 1, 1)(13, ReportCardsComponent_Conditional_35_For_48_Conditional_13_Template, 2, 0, "span", 82);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_17_0;
    const line_r15 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("row--empty", line_r15.subjectAverage === undefined);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(line_r15.subjectName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(line_r15.coefficient);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.formatAverage(line_r15.subjectAverage), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatAverage(line_r15.classSubjectAverage));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_17_0 = line_r15.rankInSubject) !== null && tmp_17_0 !== undefined ? tmp_17_0 : "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(line_r15.appreciation ? 12 : 13);
} }
function ReportCardsComponent_Conditional_35_Conditional_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 69);
    i0.ɵɵtext(1, " Ce bulletin est remis aux familles. Les appr\u00E9ciations font partie du document qu'elles ont re\u00E7u et ne changent plus. ");
    i0.ɵɵelementEnd();
} }
function ReportCardsComponent_Conditional_35_For_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const decision_r16 = ctx.$implicit;
    i0.ɵɵproperty("value", decision_r16.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(decision_r16.label);
} }
function ReportCardsComponent_Conditional_35_Conditional_78_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 40);
    i0.ɵɵlistener("click", function ReportCardsComponent_Conditional_35_Conditional_78_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitRemarks()); });
    i0.ɵɵtext(1, " Enregistrer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 39);
    i0.ɵɵlistener("click", function ReportCardsComponent_Conditional_35_Conditional_78_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r17); const card_r14 = i0.ɵɵnextContext(); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.publishOne(card_r14)); });
    i0.ɵɵtext(3, " Remettre \u00E0 la famille ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r14 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || card_r14.generalAverage === undefined);
} }
function ReportCardsComponent_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 57);
    i0.ɵɵlistener("click", function ReportCardsComponent_Conditional_35_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeReview()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 58)(2, "header", 59)(3, "div")(4, "h2", 60);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 61);
    i0.ɵɵtext(7);
    i0.ɵɵtemplate(8, ReportCardsComponent_Conditional_35_Conditional_8_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 62);
    i0.ɵɵlistener("click", function ReportCardsComponent_Conditional_35_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeReview()); });
    i0.ɵɵtext(10, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 63)(12, "span", 64);
    i0.ɵɵtext(13, " moyenne ");
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "span", 64);
    i0.ɵɵtext(17, " rang ");
    i0.ɵɵelementStart(18, "strong");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "span", 64);
    i0.ɵɵtext(21, " classe ");
    i0.ɵɵelementStart(22, "strong");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "span", 64)(25, "strong");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(27, " absence(s) ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div", 65)(29, "table", 66)(30, "caption", 8);
    i0.ɵɵtext(31, "D\u00E9tail par mati\u00E8re");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "thead")(33, "tr")(34, "th", 22);
    i0.ɵɵtext(35, "Mati\u00E8re");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "th", 23);
    i0.ɵɵtext(37, "Coef.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "th", 23);
    i0.ɵɵtext(39, "Moyenne");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "th", 23);
    i0.ɵɵtext(41, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "th", 23);
    i0.ɵɵtext(43, "Rang");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "th", 22);
    i0.ɵɵtext(45, "Appr\u00E9ciation");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(46, "tbody");
    i0.ɵɵrepeaterCreate(47, ReportCardsComponent_Conditional_35_For_48_Template, 14, 8, "tr", 67, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(49, "form", 68);
    i0.ɵɵlistener("ngSubmit", function ReportCardsComponent_Conditional_35_Template_form_ngSubmit_49_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitRemarks()); });
    i0.ɵɵtemplate(50, ReportCardsComponent_Conditional_35_Conditional_50_Template, 2, 0, "p", 69);
    i0.ɵɵelementStart(51, "div", 70)(52, "label", 71);
    i0.ɵɵtext(53, "Appr\u00E9ciation g\u00E9n\u00E9rale");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(54, "textarea", 72);
    i0.ɵɵelementStart(55, "span", 73);
    i0.ɵɵtext(56, " C'est la ligne que la famille lit en premier. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(57, "div", 70)(58, "label", 74);
    i0.ɵɵtext(59, "Mot du professeur principal");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(60, "textarea", 75);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "div", 70)(62, "label", 76);
    i0.ɵɵtext(63, " Mot du chef d'\u00E9tablissement ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(64, "textarea", 77);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "div", 70)(66, "label", 78);
    i0.ɵɵtext(67, "D\u00E9cision du conseil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "select", 79);
    i0.ɵɵrepeaterCreate(69, ReportCardsComponent_Conditional_35_For_70_Template, 2, 2, "option", 10, _forTrack2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "span", 73);
    i0.ɵɵtext(72);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(73, "footer", 80)(74, "button", 81);
    i0.ɵɵlistener("click", function ReportCardsComponent_Conditional_35_Template_button_click_74_listener() { const card_r14 = i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.printOne(card_r14)); });
    i0.ɵɵtext(75, " Imprimer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(76, "button", 19);
    i0.ɵɵlistener("click", function ReportCardsComponent_Conditional_35_Template_button_click_76_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeReview()); });
    i0.ɵɵtext(77, " Fermer ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(78, ReportCardsComponent_Conditional_35_Conditional_78_Template, 4, 2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const card_r14 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(card_r14.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" ", card_r14.classroomName, " \u00B7 ", card_r14.termName, " \u00B7 ", card_r14.reference, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r14.revision > 1 ? 8 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.formatAverage(card_r14.generalAverage, card_r14.scaleMax));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(card_r14.rankLabel || "\u2014");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.formatAverage(card_r14.classAverage));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("sheet-counters__item--missing", card_r14.absenceCount > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(card_r14.absenceCount);
    i0.ɵɵadvance(21);
    i0.ɵɵrepeater(card_r14.lines);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r1.remarkForm);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!card_r14.editable ? 50 : -1);
    i0.ɵɵadvance(19);
    i0.ɵɵrepeater(ctx_r1.decisions);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.decisions[0].hint, " ");
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(card_r14.editable ? 78 : -1);
} }
function ReportCardsComponent_For_38_For_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 90);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 92);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 90);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 90);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 90);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_25_0;
    const line_r18 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(line_r18.subjectName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(line_r18.coefficient);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatAverage(line_r18.subjectAverage));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatAverage(line_r18.weightedAverage));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatAverage(line_r18.classSubjectAverage));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_25_0 = line_r18.rankInSubject) !== null && tmp_25_0 !== undefined ? tmp_25_0 : "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(line_r18.appreciation || "");
} }
function ReportCardsComponent_For_38_Conditional_93_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p")(1, "span");
    i0.ɵɵtext(2, "Appr\u00E9ciation g\u00E9n\u00E9rale");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(card_r19.generalRemark);
} }
function ReportCardsComponent_For_38_Conditional_93_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p")(1, "span");
    i0.ɵɵtext(2, "Professeur principal");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(card_r19.headTeacherRemark);
} }
function ReportCardsComponent_For_38_Conditional_93_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p")(1, "span");
    i0.ɵɵtext(2, "Chef d'\u00E9tablissement");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(card_r19.principalRemark);
} }
function ReportCardsComponent_For_38_Conditional_93_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 99);
    i0.ɵɵtemplate(1, ReportCardsComponent_For_38_Conditional_93_Conditional_1_Template, 4, 1, "p")(2, ReportCardsComponent_For_38_Conditional_93_Conditional_2_Template, 4, 1, "p")(3, ReportCardsComponent_For_38_Conditional_93_Conditional_3_Template, 4, 1, "p");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const card_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r19.generalRemark ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r19.headTeacherRemark ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r19.principalRemark ? 3 : -1);
} }
function ReportCardsComponent_For_38_Conditional_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 100)(1, "span");
    i0.ɵɵtext(2, "D\u00E9cision du conseil de classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const card_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(card_r19.councilDecisionLabel);
} }
function ReportCardsComponent_For_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 17)(1, "header", 83)(2, "div", 84)(3, "p", 85);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 86);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 87)(8, "h1");
    i0.ɵɵtext(9, "Bulletin de notes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "section", 88)(13, "p")(14, "span");
    i0.ɵɵtext(15, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "strong");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "p")(19, "span");
    i0.ɵɵtext(20, "Matricule");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "strong");
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "p")(24, "span");
    i0.ɵɵtext(25, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "strong");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "p")(29, "span");
    i0.ɵɵtext(30, "Effectif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "strong");
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(33, "table", 89)(34, "thead")(35, "tr")(36, "th");
    i0.ɵɵtext(37, "Mati\u00E8re");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "th", 90);
    i0.ɵɵtext(39, "Coef.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "th", 90);
    i0.ɵɵtext(41, "Moyenne");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "th", 90);
    i0.ɵɵtext(43, "Moy. \u00D7 coef.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "th", 90);
    i0.ɵɵtext(45, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "th", 90);
    i0.ɵɵtext(47, "Rang");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "th");
    i0.ɵɵtext(49, "Appr\u00E9ciation");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(50, "tbody");
    i0.ɵɵrepeaterCreate(51, ReportCardsComponent_For_38_For_52_Template, 15, 7, "tr", null, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "tfoot")(54, "tr")(55, "td", 91);
    i0.ɵɵtext(56, "Total des coefficients");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "td", 92);
    i0.ɵɵtext(58);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(59, "td", 93);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(60, "section", 94)(61, "div", 95)(62, "p", 96);
    i0.ɵɵtext(63, "Moyenne g\u00E9n\u00E9rale");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "p", 97);
    i0.ɵɵtext(65);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(66, "div", 95)(67, "p", 96);
    i0.ɵɵtext(68, "Rang");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "p", 97);
    i0.ɵɵtext(70);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(71, "div", 95)(72, "p", 96);
    i0.ɵɵtext(73, "Moyenne de la classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(74, "p", 97);
    i0.ɵɵtext(75);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(76, "div", 95)(77, "p", 96);
    i0.ɵɵtext(78, "Extr\u00EAmes de la classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(79, "p", 97);
    i0.ɵɵtext(80);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(81, "section", 98)(82, "p")(83, "span");
    i0.ɵɵtext(84, "Absences");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(85, "strong");
    i0.ɵɵtext(86);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(87);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(88, "p")(89, "span");
    i0.ɵɵtext(90, "Retards");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(91, "strong");
    i0.ɵɵtext(92);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(93, ReportCardsComponent_For_38_Conditional_93_Template, 4, 3, "section", 99)(94, ReportCardsComponent_For_38_Conditional_94_Template, 5, 1, "section", 100);
    i0.ɵɵelementStart(95, "footer", 101)(96, "div", 102)(97, "p");
    i0.ɵɵtext(98, "Signature du chef d'\u00E9tablissement");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(99, "div", 103)(100, "p", 104);
    i0.ɵɵtext(101);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(102, "p", 105);
    i0.ɵɵtext(103);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(104, "p", 106);
    i0.ɵɵtext(105, " Ce code permet de faire contr\u00F4ler l'authenticit\u00E9 du bulletin aupr\u00E8s de l'\u00E9tablissement. ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const card_r19 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(card_r19.classroomName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Ann\u00E9e scolaire ", card_r19.academicYearCode, "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(card_r19.termName);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(card_r19.studentName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(card_r19.studentNumber);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(card_r19.classroomName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(card_r19.classSize);
    i0.ɵɵadvance(19);
    i0.ɵɵrepeater(card_r19.lines);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(card_r19.totalCoefficient);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.formatAverage(card_r19.generalAverage, card_r19.scaleMax), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(card_r19.rankLabel || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.formatAverage(card_r19.classAverage));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.formatAverage(card_r19.classMinAverage), " \u2014 ", ctx_r1.formatAverage(card_r19.classMaxAverage), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(card_r19.absenceCount);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" dont ", card_r19.justifiedAbsenceCount, " justifi\u00E9e(s) ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(card_r19.latenessCount);
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r19.generalRemark || card_r19.headTeacherRemark || card_r19.principalRemark ? 93 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(card_r19.councilDecisionLabel ? 94 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(card_r19.reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Code de v\u00E9rification : ", card_r19.verificationCode, "");
} }
/**
 * Report cards: computing them, reviewing them, handing them out.
 *
 * <p>A report card is the one document a school produces that a family keeps
 * for years. It is also the only place where everything else — the marks, the
 * coefficients, the attendance register — is added up and shown to someone
 * outside the school. That is why nothing here is recomputed on the fly: what
 * is printed in December must still read the same in June.</p>
 *
 * <p>The help works like the one in the configuration: a card appears by itself
 * the first time a tab is opened, and the « ? Aide » button brings it back.</p>
 */
export class ReportCardsComponent {
    dataSource = inject(REPORT_CARD_DATA_SOURCE);
    classrooms = inject(CLASSROOM_DATA_SOURCE);
    reference = inject(REFERENCE_DATA_SOURCE);
    notifications = inject(NotificationService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    decisions = COUNCIL_DECISIONS;
    states = REPORT_CARD_STATES;
    totalSteps = 3;
    tab = signal('GENERATION');
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    classroomList = signal([]);
    termList = signal([]);
    classroomId = signal('');
    termId = signal('');
    batch = signal(null);
    /** Le bulletin ouvert en relecture ; nul quand le panneau est fermé. */
    reviewing = signal(null);
    /** Les bulletins envoyés à l'impression ; vide hors impression. */
    printing = signal([]);
    remarkForm = this.fb.nonNullable.group({
        generalRemark: ['', [Validators.maxLength(2000)]],
        headTeacherRemark: ['', [Validators.maxLength(2000)]],
        principalRemark: ['', [Validators.maxLength(2000)]],
        councilDecision: ['PENDING_DECISION']
    });
    // ------------------------------------------------------------------ aide
    help = {
        GENERATION: {
            step: 1,
            title: 'Un bulletin se calcule une fois, pour toute la classe',
            description: 'La classe entière part en une passe. Sans cela le rang n\'a pas '
                + 'de sens : chaque bulletin porte la position de son élève parmi les autres, '
                + 'calculée sur les mêmes notes au même moment.',
            points: [
                'La génération est refusée tant qu\'un devoir de la période n\'a pas ses '
                    + 'notes validées. Les moyennes porteraient sur une partie du travail, et '
                    + 'rien en aval ne s\'en apercevrait.',
                'Un élève sans aucune note validée sortirait avec un bulletin vide. L\'écran '
                    + 'le dit avant, parce que c\'est un problème de saisie, pas de bulletin.',
                'Rien n\'est recalculé à la lecture. Un bulletin remis en décembre doit dire '
                    + 'en juin exactement ce qu\'il disait alors.'
            ],
            ctaLabel: 'Générer les bulletins'
        },
        RELECTURE: {
            step: 2,
            title: 'Les appréciations sont la seule partie qu\'un humain écrit',
            description: 'Les moyennes sortent des notes. Le mot du professeur principal, '
                + 'celui du chef d\'établissement et la décision du conseil sont ajoutés ici, '
                + 'et ne sont jamais régénérés.',
            points: [
                'Le classement se lit d\'un coup d\'œil : moyenne, rang, écart à la moyenne '
                    + 'de classe. Un élève très au-dessus ou très en dessous se voit sans '
                    + 'ouvrir son bulletin.',
                '« Décision en attente » est la valeur honnête tant que le conseil ne s\'est '
                    + 'pas réuni. Pré-remplir « Admis » mettrait des mots dans sa bouche.',
                'Une fois le bulletin remis, les appréciations sont figées elles aussi : '
                    + 'elles font partie du document que la famille a reçu.'
            ],
            ctaLabel: 'Relire les bulletins'
        },
        REMISE: {
            step: 3,
            title: 'Les bulletins se remettent ensemble',
            description: 'Publier un par un ferait que certaines familles voient les notes '
                + 'plusieurs jours avant les autres — et c\'est le genre de chose qui finit '
                + 'en discussion dans un couloir.',
            points: [
                'La remise est refusée tant qu\'un bulletin n\'a pas de moyenne générale. Un '
                    + 'bulletin vide n\'apprend rien à une famille et ne peut pas être contesté.',
                'Chaque bulletin porte un code de vérification. Une école peut contrôler un '
                    + 'papier qu\'on lui présente : un document que personne ne peut vérifier '
                    + 'est un document que n\'importe qui peut fabriquer.',
                'Une note corrigée après la remise ne réécrit pas le bulletin : elle produit '
                    + 'la révision suivante, et l\'ancienne reste consultable.'
            ],
            ctaLabel: 'Remettre aux familles'
        }
    };
    helpCopy = computed(() => this.help[this.tab()]);
    // --------------------------------------------------------------- cycle
    ngOnInit() {
        forkJoin({
            classrooms: this.classrooms.list(),
            years: this.reference.academicYears()
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (data) => {
                this.classroomList.set(data.classrooms);
                const active = data.years.find((year) => year.status === 'ACTIVE') ?? data.years[0];
                if (!active) {
                    this.loading.set(false);
                    return;
                }
                this.loadTerms(active.id);
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    loadTerms(academicYearId) {
        this.reference.terms(academicYearId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (terms) => {
                this.termList.set(terms);
                // La période de saisie en cours d'abord : c'est celle qu'on clôture.
                const current = terms.find((term) => term.status === 'GRADE_ENTRY')
                    ?? terms.find((term) => term.status === 'OPEN')
                    ?? terms[0];
                this.termId.set(current?.id ?? '');
                this.classroomId.set(this.classroomList()[0]?.id ?? '');
                this.load();
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    load() {
        if (!this.classroomId() || !this.termId()) {
            this.loading.set(false);
            return;
        }
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.batch({ classroomId: this.classroomId(), termId: this.termId() })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (batch) => {
                this.batch.set(batch);
                this.loading.set(false);
            },
            error: (err) => {
                this.loading.set(false);
                this.error.set(true);
                this.explain(err);
            }
        });
    }
    changeTab(tab) {
        this.tab.set(tab);
        this.closeReview();
    }
    changeClassroom(classroomId) {
        this.classroomId.set(classroomId);
        this.load();
    }
    changeTerm(termId) {
        this.termId.set(termId);
        this.load();
    }
    // ------------------------------------------------------------- les vues
    /** Ce que montre l'onglet courant. Les compteurs, eux, ne bougent jamais. */
    visible = computed(() => {
        const cards = this.batch()?.reportCards ?? [];
        switch (this.tab()) {
            case 'RELECTURE':
                return cards.filter((card) => card.editable);
            case 'REMISE':
                return cards.filter((card) => card.status === 'PUBLISHED');
            default:
                return cards;
        }
    });
    pending = computed(() => (this.batch()?.reportCards ?? [])
        .filter((card) => card.editable).length);
    /** Élèves sans bulletin : la génération ne les a pas encore couverts. */
    missing = computed(() => {
        const batch = this.batch();
        return batch ? Math.max(0, batch.studentCount - batch.generatedCount) : 0;
    });
    stateOf(status) {
        return this.states.find((state) => state.code === status) ?? this.states[0];
    }
    /** Écart à la moyenne de la classe, signé, comme sur un bulletin papier. */
    gapToClass(card) {
        if (card.generalAverage === undefined || card.classAverage === undefined) {
            return '';
        }
        const gap = Math.round((card.generalAverage - card.classAverage) * 100) / 100;
        return gap > 0 ? `+${format(gap)}` : format(gap);
    }
    // ------------------------------------------------------------ génération
    generate(regenerate) {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.generate({
            classroomId: this.classroomId(),
            termId: this.termId(),
            regenerate
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (batch) => {
                this.batch.set(batch);
                this.saving.set(false);
                this.notifications.success(`${batch.generatedCount} bulletin(s) calculés pour ${batch.classroomName}. `
                    + 'Rien n\'est encore remis aux familles.', batch.termName);
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ------------------------------------------------------------- relecture
    openReview(card) {
        this.reviewing.set(card);
        this.remarkForm.reset({
            generalRemark: card.generalRemark ?? '',
            headTeacherRemark: card.headTeacherRemark ?? '',
            principalRemark: card.principalRemark ?? '',
            councilDecision: card.councilDecision ?? 'PENDING_DECISION'
        });
        if (!card.editable) {
            this.remarkForm.disable();
        }
        else {
            this.remarkForm.enable();
        }
    }
    closeReview() {
        this.reviewing.set(null);
    }
    submitRemarks() {
        const card = this.reviewing();
        if (!card || this.remarkForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.remarkForm.getRawValue();
        this.dataSource.remark(card.id, {
            generalRemark: value.generalRemark.trim() || undefined,
            headTeacherRemark: value.headTeacherRemark.trim() || undefined,
            principalRemark: value.principalRemark.trim() || undefined,
            councilDecision: value.councilDecision
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (saved) => {
                this.reviewing.set(saved);
                this.saving.set(false);
                this.load();
                this.notifications.success(`Les appréciations de ${saved.studentName} sont enregistrées.`, 'Bulletin mis à jour');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ---------------------------------------------------------------- remise
    publishOne(card) {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.publish(card.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (saved) => {
                this.saving.set(false);
                this.closeReview();
                this.load();
                this.notifications.success(`Le bulletin de ${saved.studentName} est remis. Code de vérification : `
                    + `${saved.verificationCode}.`, 'Bulletin remis');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    publishAll() {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.publishAll({ classroomId: this.classroomId(), termId: this.termId() })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (batch) => {
                this.batch.set(batch);
                this.saving.set(false);
                this.notifications.success(`${batch.publishedCount} bulletin(s) remis aux familles de `
                    + `${batch.classroomName}.`, batch.termName);
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ------------------------------------------------------------ impression
    /** Une page par élève, dans l'ordre du classement. */
    printAll() {
        const cards = this.batch()?.reportCards ?? [];
        if (cards.length === 0) {
            return;
        }
        this.print(cards);
    }
    printOne(card) {
        this.print([card]);
    }
    print(cards) {
        this.printing.set(cards);
        // Le rendu de la feuille est fait par Angular : on attend un tour de boucle
        // avant d'ouvrir le dialogue, sinon la page part vide à l'imprimante.
        setTimeout(() => {
            window.print();
            this.printing.set([]);
        }, 120);
    }
    // ------------------------------------------------------------- affichage
    formatAverage(value, scale) {
        if (value === undefined || value === null) {
            return '—';
        }
        return scale ? `${format(value)} / ${format(scale)}` : format(value);
    }
    formatDate(iso) {
        if (!iso) {
            return '';
        }
        return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    /** Traduit le code du serveur plutôt que d'afficher « erreur ». */
    explain(err) {
        const error = err?.error;
        if (error?.code) {
            this.notifications.error(error.message ?? translateErrorCode(error.code), 'Action refusée');
            return;
        }
        // En démonstration, le magasin lève un code nu plutôt qu'une réponse HTTP.
        const code = err?.message;
        if (code && /^[A-Z_]+$/.test(code)) {
            this.notifications.error(translateErrorCode(code), 'Action refusée');
        }
    }
    static ɵfac = function ReportCardsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReportCardsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReportCardsComponent, selectors: [["eduops-report-cards"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 39, vars: 24, consts: [[1, "page", "screen-only"], ["flow", "report-cards", "eyebrow", "Conseil pour cet onglet", 3, "stepKey", "stepNumber", "totalSteps", "title", "description", "points", "ctaLabel"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], [1, "filters"], [1, "filters__select"], [1, "visually-hidden"], [1, "input", 3, "change", "value"], [3, "value"], ["role", "tablist", 1, "tabs"], ["type", "button", "role", "tab", 1, "tabs__item", 3, "click"], [1, "tabs__badge", "numeric"], ["message", "Chargement des bulletins..."], [1, "table-wrapper", "card"], [1, "print-only"], [1, "bulletin"], ["type", "button", 1, "btn", "btn--secondary"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], [3, "retry"], [1, "table"], ["scope", "col"], ["scope", "col", 1, "numeric"], ["scope", "col", 1, "cell-actions"], [3, "row--top", "row--failing"], ["role", "status", 1, "alert-block"], ["role", "status", 1, "alert-block", "alert-block--soft"], [1, "stats"], [1, "stat"], [1, "stat__label"], [1, "stat__value", "numeric"], [1, "stat__note"], [1, "stat", "stat--done"], [1, "actions-bar"], [1, "alert-block__head"], ["aria-hidden", "true", 1, "alert-block__icon"], [1, "alert-block__title"], [1, "alert-block__text"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], [1, "actions-bar__note"], [1, "numeric", "rank"], [1, "entry__name"], [1, "entry__number", "numeric"], [1, "numeric", "average"], [1, "numeric", "gap"], [1, "numeric"], [1, "state"], [1, "entry__decision"], [1, "cell-actions"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], ["colspan", "7"], [1, "empty-state"], [1, "empty-state__title"], [1, "empty-state__text"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "review-title", 1, "drawer", "drawer--wide"], [1, "drawer__head"], ["id", "review-title", 1, "drawer__title"], [1, "drawer__meta", "numeric"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "sheet-counters", "numeric"], [1, "sheet-counters__item"], [1, "drawer__body"], [1, "table", "table--compact"], [3, "row--empty"], [1, "remarks", 3, "ngSubmit", "formGroup"], [1, "hint-block"], [1, "field"], ["for", "remark-general", 1, "field__label"], ["id", "remark-general", "rows", "3", "formControlName", "generalRemark", "placeholder", "Trimestre s\u00E9rieux, des r\u00E9sultats en progression.", 1, "textarea"], [1, "field__hint"], ["for", "remark-head", 1, "field__label"], ["id", "remark-head", "rows", "2", "formControlName", "headTeacherRemark", 1, "textarea"], ["for", "remark-principal", 1, "field__label"], ["id", "remark-principal", "rows", "2", "formControlName", "principalRemark", 1, "textarea"], ["for", "remark-decision", 1, "field__label"], ["id", "remark-decision", "formControlName", "councilDecision", 1, "input"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], [1, "muted"], [1, "bulletin__head"], [1, "bulletin__school"], [1, "bulletin__school-name"], [1, "bulletin__year"], [1, "bulletin__title"], [1, "bulletin__identity"], [1, "bulletin__table"], [1, "right"], ["colspan", "2"], [1, "right", "strong"], ["colspan", "4"], [1, "bulletin__summary"], [1, "bulletin__box"], [1, "bulletin__box-label"], [1, "bulletin__box-value"], [1, "bulletin__attendance"], [1, "bulletin__remarks"], [1, "bulletin__decision"], [1, "bulletin__foot"], [1, "bulletin__signature"], [1, "bulletin__stamp"], [1, "bulletin__reference"], [1, "bulletin__code"], [1, "bulletin__note"]], template: function ReportCardsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "eduops-step-coachmark", 1);
            i0.ɵɵelementStart(2, "header", 2)(3, "div")(4, "h1", 3);
            i0.ɵɵtext(5, "Bulletins");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 4);
            i0.ɵɵtemplate(7, ReportCardsComponent_Conditional_7_Template, 3, 4);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 5);
            i0.ɵɵtemplate(9, ReportCardsComponent_Conditional_9_Template, 1, 1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "section", 6)(11, "label", 7)(12, "span", 8);
            i0.ɵɵtext(13, "Classe");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "select", 9);
            i0.ɵɵlistener("change", function ReportCardsComponent_Template_select_change_14_listener($event) { return ctx.changeClassroom($event.target.value); });
            i0.ɵɵrepeaterCreate(15, ReportCardsComponent_For_16_Template, 2, 2, "option", 10, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "label", 7)(18, "span", 8);
            i0.ɵɵtext(19, "P\u00E9riode");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "select", 9);
            i0.ɵɵlistener("change", function ReportCardsComponent_Template_select_change_20_listener($event) { return ctx.changeTerm($event.target.value); });
            i0.ɵɵrepeaterCreate(21, ReportCardsComponent_For_22_Template, 2, 2, "option", 10, _forTrack0);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(23, "nav", 11)(24, "button", 12);
            i0.ɵɵlistener("click", function ReportCardsComponent_Template_button_click_24_listener() { return ctx.changeTab("GENERATION"); });
            i0.ɵɵtext(25, " G\u00E9n\u00E9ration ");
            i0.ɵɵtemplate(26, ReportCardsComponent_Conditional_26_Template, 2, 1, "span", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "button", 12);
            i0.ɵɵlistener("click", function ReportCardsComponent_Template_button_click_27_listener() { return ctx.changeTab("RELECTURE"); });
            i0.ɵɵtext(28, " Relecture et appr\u00E9ciations ");
            i0.ɵɵtemplate(29, ReportCardsComponent_Conditional_29_Template, 2, 1, "span", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "button", 12);
            i0.ɵɵlistener("click", function ReportCardsComponent_Template_button_click_30_listener() { return ctx.changeTab("REMISE"); });
            i0.ɵɵtext(31, " Remis aux familles ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(32, ReportCardsComponent_Conditional_32_Template, 1, 0, "eduops-loading-state", 14)(33, ReportCardsComponent_Conditional_33_Template, 1, 0, "eduops-error-state")(34, ReportCardsComponent_Conditional_34_Template, 25, 2, "div", 15)(35, ReportCardsComponent_Conditional_35_Template, 79, 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 16);
            i0.ɵɵrepeaterCreate(37, ReportCardsComponent_For_38_Template, 106, 20, "article", 17, _forTrack0);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_7_0;
            let tmp_8_0;
            let tmp_22_0;
            i0.ɵɵadvance();
            i0.ɵɵproperty("stepKey", ctx.tab())("stepNumber", ctx.helpCopy().step)("totalSteps", ctx.totalSteps)("title", ctx.helpCopy().title)("description", ctx.helpCopy().description)("points", ctx.helpCopy().points)("ctaLabel", ctx.helpCopy().ctaLabel);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional((tmp_7_0 = ctx.batch()) ? 7 : -1, tmp_7_0);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional((tmp_8_0 = ctx.batch()) ? 9 : -1, tmp_8_0);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("value", ctx.classroomId());
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.classroomList());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("value", ctx.termId());
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.termList());
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "GENERATION");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "GENERATION");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.missing() > 0 ? 26 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "RELECTURE");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "RELECTURE");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.pending() > 0 ? 29 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "REMISE");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "REMISE");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading() ? 32 : ctx.error() ? 33 : 34);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_22_0 = ctx.reviewing()) ? 35 : -1, tmp_22_0);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.printing());
        } }, dependencies: [CommonModule, FormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName, LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent], styles: ["@import 'styles/tokens';\n\n\n\n\n.print-only[_ngcontent-%COMP%] { display: none; }\n\n.tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n\n  &__select .input { width: auto; }\n}\n\n.state[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='todo'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='review'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='done'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='off'] { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n.stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));\n  gap: var(--space-4);\n  margin-bottom: var(--space-5);\n}\n\n.stat[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 3px solid var(--border-strong);\n  border-radius: var(--radius-card);\n\n  &__label { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n  &__value { margin: 2px 0; font-size: var(--text-2xl); color: var(--text-strong); }\n  &__note { margin: 0; font-size: var(--text-xs); color: var(--text-light); }\n\n  &--done { border-left-color: var(--success); }\n  &--alert { border-left-color: var(--warning); background: var(--warning-bg); }\n}\n\n.alert-block[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  margin-bottom: var(--space-4);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &--soft {\n    background: var(--surface-sunken);\n    border-color: var(--border-strong);\n\n    .alert-block__icon { background: var(--text-muted); }\n  }\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 22px;\n    height: 22px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.actions-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  flex-wrap: wrap;\n  margin-bottom: var(--space-4);\n\n  &__note {\n    flex: 1;\n    min-width: 240px;\n    margin: 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n}\n\n.table-wrapper[_ngcontent-%COMP%] { overflow-x: auto; }\n\n.cell-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-2);\n  justify-content: flex-end;\n  white-space: nowrap;\n}\n\n.rank[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--text-strong);\n\n  small { font-weight: 400; color: var(--text-light); }\n}\n\n.average[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--text-strong);\n\n  &--fail { color: var(--danger); }\n}\n\n.gap[_ngcontent-%COMP%] { color: var(--text-muted); }\n\n.row--top[_ngcontent-%COMP%] { background: var(--success-bg); }\n.row--failing[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child { box-shadow: inset 3px 0 0 var(--danger); }\n.row--empty[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { color: var(--text-light); }\n\n.entry[_ngcontent-%COMP%] {\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__number { display: block; font-size: var(--text-xs); color: var(--text-light); }\n  &__decision {\n    display: block;\n    margin-top: 2px;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n}\n\n.muted[_ngcontent-%COMP%] { color: var(--text-muted); }\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n  width: min(460px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &--wide { width: min(720px, 100vw); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__close {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border-light);\n    flex-wrap: wrap;\n  }\n}\n\n.sheet-counters[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  flex-wrap: wrap;\n\n  &__item strong { color: var(--text-strong); }\n  &__item--missing strong { color: var(--warning); }\n}\n\n.table--compact[_ngcontent-%COMP%] {\n  th, td { padding: var(--space-2) var(--space-3); font-size: var(--text-sm); }\n}\n\n.remarks[_ngcontent-%COMP%] { margin-top: var(--space-5); }\n\n.hint-block[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n}\n\n@include mobile {\n  .drawer,\n  .drawer--wide { width: 100vw; }\n}\n\n\n\n\n\n\n@media print {\n  .screen-only[_ngcontent-%COMP%] { display: none !important; }\n  .print-only[_ngcontent-%COMP%] { display: block; }\n}\n\n.bulletin[_ngcontent-%COMP%] {\n  \n\n\n  padding: 14mm 12mm;\n  font-family: var(--font-body, 'Calibri', 'Segoe UI', sans-serif);\n  font-size: 10pt;\n  color: #101828;\n  page-break-after: always;\n\n  &:last-child { page-break-after: auto; }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    padding-bottom: 4mm;\n    border-bottom: 1.5pt solid #101828;\n  }\n\n  &__school-name { margin: 0; font-size: 13pt; font-weight: 700; }\n  &__year { margin: 1mm 0 0; font-size: 9pt; color: #475467; }\n\n  &__title {\n    text-align: right;\n\n    h1 { margin: 0; font-size: 15pt; letter-spacing: 0.5pt; }\n    p { margin: 1mm 0 0; font-size: 10pt; color: #475467; }\n  }\n\n  &__identity {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 3mm;\n    margin: 5mm 0;\n\n    p { margin: 0; display: flex; flex-direction: column; }\n    span { font-size: 8pt; text-transform: uppercase; color: #667085; }\n    strong { font-size: 11pt; }\n  }\n\n  &__table {\n    width: 100%;\n    border-collapse: collapse;\n    margin-bottom: 5mm;\n\n    th, td {\n      padding: 1.6mm 2mm;\n      border: 0.5pt solid #d0d5dd;\n      text-align: left;\n    }\n\n    th {\n      font-size: 8.5pt;\n      text-transform: uppercase;\n      background: #f2f4f7;\n    }\n\n    td { font-size: 9.5pt; }\n    .right { text-align: right; }\n    .strong { font-weight: 700; }\n\n    tfoot td {\n      font-weight: 600;\n      background: #f9fafb;\n    }\n  }\n\n  &__summary {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 3mm;\n    margin-bottom: 5mm;\n  }\n\n  &__box {\n    padding: 3mm;\n    text-align: center;\n    border: 0.5pt solid #d0d5dd;\n  }\n\n  &__box-label {\n    margin: 0;\n    font-size: 8pt;\n    text-transform: uppercase;\n    color: #667085;\n  }\n\n  &__box-value { margin: 1mm 0 0; font-size: 13pt; font-weight: 700; }\n\n  &__attendance {\n    display: flex;\n    gap: 8mm;\n    padding: 2.5mm 3mm;\n    margin-bottom: 4mm;\n    background: #f9fafb;\n    border: 0.5pt solid #d0d5dd;\n\n    p { margin: 0; font-size: 9.5pt; }\n    span { margin-right: 2mm; text-transform: uppercase; font-size: 8pt; color: #667085; }\n    strong { margin-right: 1mm; }\n  }\n\n  &__remarks {\n    margin-bottom: 4mm;\n\n    p {\n      margin: 0 0 2.5mm;\n      padding-bottom: 2mm;\n      font-size: 9.5pt;\n      border-bottom: 0.4pt dotted #d0d5dd;\n    }\n\n    span {\n      display: block;\n      font-size: 8pt;\n      text-transform: uppercase;\n      color: #667085;\n    }\n  }\n\n  &__decision {\n    display: flex;\n    align-items: baseline;\n    gap: 3mm;\n    padding: 3mm;\n    margin-bottom: 6mm;\n    border: 1pt solid #101828;\n\n    span { font-size: 8.5pt; text-transform: uppercase; color: #475467; }\n    strong { font-size: 12pt; }\n  }\n\n  &__foot {\n    display: flex;\n    align-items: flex-end;\n    justify-content: space-between;\n    gap: 8mm;\n  }\n\n  &__signature {\n    width: 55mm;\n    padding-top: 16mm;\n    border-top: 0.5pt solid #98a2b3;\n\n    p { margin: 0; font-size: 8.5pt; color: #667085; }\n  }\n\n  &__stamp { text-align: right; }\n  &__reference { margin: 0; font-size: 9pt; font-weight: 600; }\n  &__code { margin: 1mm 0 0; font-size: 10pt; font-weight: 700; letter-spacing: 1pt; }\n  &__note { margin: 1mm 0 0; max-width: 70mm; font-size: 7.5pt; color: #667085; }\n}\n\n@page {\n  size: A4 portrait;\n  margin: 0;\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportCardsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-report-cards', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule,
                    LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page screen-only\">\n\n  <!-- L'aide de la configuration, appliqu\u00E9e telle quelle : une carte au premier\n       passage sur l'onglet, un bouton \u00AB ? Aide \u00BB pour la revoir ensuite. -->\n  <eduops-step-coachmark\n    flow=\"report-cards\"\n    [stepKey]=\"tab()\"\n    [stepNumber]=\"helpCopy().step\"\n    [totalSteps]=\"totalSteps\"\n    eyebrow=\"Conseil pour cet onglet\"\n    [title]=\"helpCopy().title\"\n    [description]=\"helpCopy().description\"\n    [points]=\"helpCopy().points\"\n    [ctaLabel]=\"helpCopy().ctaLabel\" />\n\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Bulletins</h1>\n      <p class=\"page__meta numeric\">\n        @if (batch(); as b) {\n          {{ b.generatedCount }}/{{ b.studentCount }} bulletin(s) g\u00E9n\u00E9r\u00E9s\n          @if (b.publishedCount > 0) { \u00B7 {{ b.publishedCount }} remis }\n          @if (b.classAverage !== undefined) {\n            \u00B7 moyenne de classe {{ formatAverage(b.classAverage) }}\n          }\n        }\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      @if (batch(); as b) {\n        @if (b.generatedCount > 0) {\n          <button type=\"button\" class=\"btn btn--secondary\" (click)=\"printAll()\">\n            Imprimer la classe\n          </button>\n        }\n      }\n    </div>\n  </header>\n\n  <section class=\"filters\">\n    <label class=\"filters__select\">\n      <span class=\"visually-hidden\">Classe</span>\n      <select class=\"input\" [value]=\"classroomId()\"\n              (change)=\"changeClassroom($any($event.target).value)\">\n        @for (classroom of classroomList(); track classroom.id) {\n          <option [value]=\"classroom.id\">{{ classroom.name }}</option>\n        }\n      </select>\n    </label>\n    <label class=\"filters__select\">\n      <span class=\"visually-hidden\">P\u00E9riode</span>\n      <select class=\"input\" [value]=\"termId()\"\n              (change)=\"changeTerm($any($event.target).value)\">\n        @for (term of termList(); track term.id) {\n          <option [value]=\"term.id\">{{ term.name }}</option>\n        }\n      </select>\n    </label>\n  </section>\n\n  <nav class=\"tabs\" role=\"tablist\">\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'GENERATION'\"\n            [attr.aria-selected]=\"tab() === 'GENERATION'\"\n            (click)=\"changeTab('GENERATION')\">\n      G\u00E9n\u00E9ration\n      @if (missing() > 0) {\n        <span class=\"tabs__badge numeric\">{{ missing() }}</span>\n      }\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'RELECTURE'\"\n            [attr.aria-selected]=\"tab() === 'RELECTURE'\"\n            (click)=\"changeTab('RELECTURE')\">\n      Relecture et appr\u00E9ciations\n      @if (pending() > 0) {\n        <span class=\"tabs__badge numeric\">{{ pending() }}</span>\n      }\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'REMISE'\"\n            [attr.aria-selected]=\"tab() === 'REMISE'\"\n            (click)=\"changeTab('REMISE')\">\n      Remis aux familles\n    </button>\n  </nav>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des bulletins...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n\n    @if (batch(); as b) {\n\n      @if (b.unvalidatedAssessments > 0) {\n        <section class=\"alert-block\" role=\"status\">\n          <div class=\"alert-block__head\">\n            <span class=\"alert-block__icon\" aria-hidden=\"true\">!</span>\n            <div>\n              <p class=\"alert-block__title\">\n                {{ b.unvalidatedAssessments }} devoir(s) de {{ b.termName }} sans notes valid\u00E9es\n              </p>\n              <p class=\"alert-block__text\">\n                G\u00E9n\u00E9rer maintenant calculerait les moyennes sur une partie du travail,\n                et rien en aval ne s'en apercevrait. Validez ces devoirs dans\n                \u00C9valuations avant de continuer.\n              </p>\n            </div>\n          </div>\n        </section>\n      }\n\n      @if (b.studentsWithoutGrades > 0) {\n        <section class=\"alert-block alert-block--soft\" role=\"status\">\n          <div class=\"alert-block__head\">\n            <span class=\"alert-block__icon\" aria-hidden=\"true\">?</span>\n            <div>\n              <p class=\"alert-block__title\">\n                {{ b.studentsWithoutGrades }} \u00E9l\u00E8ve(s) sans aucune note valid\u00E9e\n              </p>\n              <p class=\"alert-block__text\">\n                Leur bulletin sortirait vide. C'est un probl\u00E8me de saisie, pas de\n                bulletin : il se r\u00E8gle dans \u00C9valuations.\n              </p>\n            </div>\n          </div>\n        </section>\n      }\n\n      <section class=\"stats\">\n        <article class=\"stat\">\n          <p class=\"stat__label\">Moyenne de la classe</p>\n          <p class=\"stat__value numeric\">{{ formatAverage(b.classAverage) }}</p>\n          <p class=\"stat__note\">\n            @if (b.classMinAverage !== undefined) {\n              de {{ formatAverage(b.classMinAverage) }} \u00E0 {{ formatAverage(b.classMaxAverage) }}\n            } @else {\n              Aucun bulletin g\u00E9n\u00E9r\u00E9\n            }\n          </p>\n        </article>\n        <article class=\"stat stat--done\">\n          <p class=\"stat__label\">Ont la moyenne</p>\n          <p class=\"stat__value numeric\">{{ b.passingCount }}</p>\n          <p class=\"stat__note\">sur {{ b.generatedCount }} bulletin(s)</p>\n        </article>\n        <article class=\"stat\" [class.stat--alert]=\"missing() > 0\">\n          <p class=\"stat__label\">Restent \u00E0 g\u00E9n\u00E9rer</p>\n          <p class=\"stat__value numeric\">{{ missing() }}</p>\n          <p class=\"stat__note\">sur {{ b.studentCount }} \u00E9l\u00E8ve(s)</p>\n        </article>\n        <article class=\"stat stat--done\">\n          <p class=\"stat__label\">Remis aux familles</p>\n          <p class=\"stat__value numeric\">{{ b.publishedCount }}</p>\n          <p class=\"stat__note\">\n            {{ b.generatedCount - b.publishedCount }} en attente de remise\n          </p>\n        </article>\n      </section>\n\n      <section class=\"actions-bar\">\n        @if (tab() === 'GENERATION') {\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"saving() || !b.readyToGenerate\"\n                  (click)=\"generate(false)\">\n            {{ b.generatedCount === 0 ? 'G\u00E9n\u00E9rer les bulletins' : 'G\u00E9n\u00E9rer les manquants' }}\n          </button>\n          @if (b.generatedCount > 0) {\n            <button type=\"button\" class=\"btn btn--secondary\"\n                    [disabled]=\"saving() || !b.readyToGenerate\"\n                    (click)=\"generate(true)\">\n              Tout recalculer\n            </button>\n            <p class=\"actions-bar__note\">\n              Recalculer ne touche pas aux bulletins d\u00E9j\u00E0 remis : ils repartent en\n              r\u00E9vision suivante, l'ancienne restant consultable.\n            </p>\n          }\n        } @else if (tab() === 'REMISE') {\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"saving() || b.generatedCount === 0\n                    || b.publishedCount === b.generatedCount\"\n                  (click)=\"publishAll()\">\n            Remettre toute la classe\n          </button>\n          <p class=\"actions-bar__note\">\n            Les bulletins se distribuent ensemble : publier un par un ferait que\n            certaines familles voient les notes plusieurs jours avant les autres.\n          </p>\n        }\n      </section>\n    }\n\n    <div class=\"table-wrapper card\">\n      <table class=\"table\">\n        <caption class=\"visually-hidden\">Classement de la classe</caption>\n        <thead>\n          <tr>\n            <th scope=\"col\">Rang</th>\n            <th scope=\"col\">\u00C9l\u00E8ve</th>\n            <th scope=\"col\" class=\"numeric\">Moyenne</th>\n            <th scope=\"col\" class=\"numeric\">\u00C9cart</th>\n            <th scope=\"col\" class=\"numeric\">Absences</th>\n            <th scope=\"col\">\u00C9tat</th>\n            <th scope=\"col\" class=\"cell-actions\">Action</th>\n          </tr>\n        </thead>\n        <tbody>\n          @for (card of visible(); track card.id) {\n            <tr [class.row--top]=\"card.rankInClass === 1\"\n                [class.row--failing]=\"!card.passing && card.generalAverage !== undefined\">\n              <td class=\"numeric rank\">\n                @if (card.rankInClass !== undefined) {\n                  {{ card.rankInClass }}<small>/{{ card.classSize }}</small>\n                } @else {\n                  \u2014\n                }\n              </td>\n              <td>\n                <span class=\"entry__name\">{{ card.studentName }}</span>\n                <span class=\"entry__number numeric\">\n                  {{ card.studentNumber }}\n                  @if (card.revision > 1) { \u00B7 r\u00E9vision {{ card.revision }} }\n                </span>\n              </td>\n              <td class=\"numeric average\" [class.average--fail]=\"!card.passing\">\n                {{ formatAverage(card.generalAverage, card.scaleMax) }}\n              </td>\n              <td class=\"numeric gap\">{{ gapToClass(card) || '\u2014' }}</td>\n              <td class=\"numeric\">\n                {{ card.absenceCount }}\n                @if (card.latenessCount > 0) {\n                  <small>\u00B7 {{ card.latenessCount }} retard(s)</small>\n                }\n              </td>\n              <td>\n                <span class=\"state\" [attr.data-tone]=\"stateOf(card.status).tone\">\n                  {{ card.statusLabel }}\n                </span>\n                @if (card.councilDecisionLabel) {\n                  <span class=\"entry__decision\">{{ card.councilDecisionLabel }}</span>\n                }\n              </td>\n              <td class=\"cell-actions\">\n                <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                        (click)=\"printOne(card)\">Imprimer</button>\n                <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                        (click)=\"openReview(card)\">\n                  {{ card.editable ? 'Relire' : 'Voir' }}\n                </button>\n              </td>\n            </tr>\n          } @empty {\n            <tr>\n              <td colspan=\"7\">\n                <div class=\"empty-state\">\n                  <p class=\"empty-state__title\">\n                    @if (tab() === 'REMISE') {\n                      Aucun bulletin remis pour l'instant.\n                    } @else if (tab() === 'RELECTURE') {\n                      Aucun bulletin \u00E0 relire.\n                    } @else {\n                      Aucun bulletin g\u00E9n\u00E9r\u00E9 pour cette classe et cette p\u00E9riode.\n                    }\n                  </p>\n                  <p class=\"empty-state__text\">\n                    @if (tab() === 'GENERATION') {\n                      La g\u00E9n\u00E9ration calcule toute la classe en une passe : c'est ce qui\n                      donne un sens au rang port\u00E9 par chaque bulletin.\n                    } @else {\n                      Les bulletins apparaissent ici une fois g\u00E9n\u00E9r\u00E9s.\n                    }\n                  </p>\n                </div>\n              </td>\n            </tr>\n          }\n        </tbody>\n      </table>\n    </div>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Relecture d'un bulletin \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (reviewing(); as card) {\n    <div class=\"drawer-backdrop\" (click)=\"closeReview()\"></div>\n    <aside class=\"drawer drawer--wide\" role=\"dialog\" aria-modal=\"true\"\n           aria-labelledby=\"review-title\">\n      <header class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"review-title\">{{ card.studentName }}</h2>\n          <p class=\"drawer__meta numeric\">\n            {{ card.classroomName }} \u00B7 {{ card.termName }} \u00B7\n            {{ card.reference }}\n            @if (card.revision > 1) { \u00B7 r\u00E9vision {{ card.revision }} }\n          </p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeReview()\">\u00D7</button>\n      </header>\n\n      <div class=\"sheet-counters numeric\">\n        <span class=\"sheet-counters__item\">\n          moyenne <strong>{{ formatAverage(card.generalAverage, card.scaleMax) }}</strong>\n        </span>\n        <span class=\"sheet-counters__item\">\n          rang <strong>{{ card.rankLabel || '\u2014' }}</strong>\n        </span>\n        <span class=\"sheet-counters__item\">\n          classe <strong>{{ formatAverage(card.classAverage) }}</strong>\n        </span>\n        <span class=\"sheet-counters__item\"\n              [class.sheet-counters__item--missing]=\"card.absenceCount > 0\">\n          <strong>{{ card.absenceCount }}</strong> absence(s)\n        </span>\n      </div>\n\n      <div class=\"drawer__body\">\n        <table class=\"table table--compact\">\n          <caption class=\"visually-hidden\">D\u00E9tail par mati\u00E8re</caption>\n          <thead>\n            <tr>\n              <th scope=\"col\">Mati\u00E8re</th>\n              <th scope=\"col\" class=\"numeric\">Coef.</th>\n              <th scope=\"col\" class=\"numeric\">Moyenne</th>\n              <th scope=\"col\" class=\"numeric\">Classe</th>\n              <th scope=\"col\" class=\"numeric\">Rang</th>\n              <th scope=\"col\">Appr\u00E9ciation</th>\n            </tr>\n          </thead>\n          <tbody>\n            @for (line of card.lines; track line.subjectName) {\n              <tr [class.row--empty]=\"line.subjectAverage === undefined\">\n                <td>{{ line.subjectName }}</td>\n                <td class=\"numeric\">{{ line.coefficient }}</td>\n                <td class=\"numeric average\">\n                  {{ formatAverage(line.subjectAverage) }}\n                </td>\n                <td class=\"numeric\">{{ formatAverage(line.classSubjectAverage) }}</td>\n                <td class=\"numeric\">{{ line.rankInSubject ?? '\u2014' }}</td>\n                <td>\n                  @if (line.appreciation) {\n                    {{ line.appreciation }}\n                  } @else {\n                    <span class=\"muted\">Aucune note valid\u00E9e</span>\n                  }\n                </td>\n              </tr>\n            }\n          </tbody>\n        </table>\n\n        <form class=\"remarks\" [formGroup]=\"remarkForm\" (ngSubmit)=\"submitRemarks()\">\n          @if (!card.editable) {\n            <p class=\"hint-block\">\n              Ce bulletin est remis aux familles. Les appr\u00E9ciations font partie du\n              document qu'elles ont re\u00E7u et ne changent plus.\n            </p>\n          }\n\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"remark-general\">Appr\u00E9ciation g\u00E9n\u00E9rale</label>\n            <textarea id=\"remark-general\" class=\"textarea\" rows=\"3\"\n                      formControlName=\"generalRemark\"\n                      placeholder=\"Trimestre s\u00E9rieux, des r\u00E9sultats en progression.\"></textarea>\n            <span class=\"field__hint\">\n              C'est la ligne que la famille lit en premier.\n            </span>\n          </div>\n\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"remark-head\">Mot du professeur principal</label>\n            <textarea id=\"remark-head\" class=\"textarea\" rows=\"2\"\n                      formControlName=\"headTeacherRemark\"></textarea>\n          </div>\n\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"remark-principal\">\n              Mot du chef d'\u00E9tablissement\n            </label>\n            <textarea id=\"remark-principal\" class=\"textarea\" rows=\"2\"\n                      formControlName=\"principalRemark\"></textarea>\n          </div>\n\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"remark-decision\">D\u00E9cision du conseil</label>\n            <select id=\"remark-decision\" class=\"input\" formControlName=\"councilDecision\">\n              @for (decision of decisions; track decision.code) {\n                <option [value]=\"decision.code\">{{ decision.label }}</option>\n              }\n            </select>\n            <span class=\"field__hint\">\n              {{ decisions[0].hint }}\n            </span>\n          </div>\n        </form>\n      </div>\n\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--ghost\" (click)=\"printOne(card)\">\n          Imprimer\n        </button>\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeReview()\">\n          Fermer\n        </button>\n        @if (card.editable) {\n          <button type=\"button\" class=\"btn btn--secondary\"\n                  [disabled]=\"saving()\" (click)=\"submitRemarks()\">\n            Enregistrer\n          </button>\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"saving() || card.generalAverage === undefined\"\n                  (click)=\"publishOne(card)\">\n            Remettre \u00E0 la famille\n          </button>\n        }\n      </footer>\n    </aside>\n  }\n</div>\n\n<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Feuille imprimable \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     Hors impression, ce bloc est vide : il n'est peupl\u00E9 que le temps d'ouvrir\n     le dialogue d'impression. Une page A4 par \u00E9l\u00E8ve. -->\n<div class=\"print-only\">\n  @for (card of printing(); track card.id) {\n    <article class=\"bulletin\">\n      <header class=\"bulletin__head\">\n        <div class=\"bulletin__school\">\n          <p class=\"bulletin__school-name\">{{ card.classroomName }}</p>\n          <p class=\"bulletin__year\">Ann\u00E9e scolaire {{ card.academicYearCode }}</p>\n        </div>\n        <div class=\"bulletin__title\">\n          <h1>Bulletin de notes</h1>\n          <p>{{ card.termName }}</p>\n        </div>\n      </header>\n\n      <section class=\"bulletin__identity\">\n        <p><span>\u00C9l\u00E8ve</span><strong>{{ card.studentName }}</strong></p>\n        <p><span>Matricule</span><strong>{{ card.studentNumber }}</strong></p>\n        <p><span>Classe</span><strong>{{ card.classroomName }}</strong></p>\n        <p><span>Effectif</span><strong>{{ card.classSize }}</strong></p>\n      </section>\n\n      <table class=\"bulletin__table\">\n        <thead>\n          <tr>\n            <th>Mati\u00E8re</th>\n            <th class=\"right\">Coef.</th>\n            <th class=\"right\">Moyenne</th>\n            <th class=\"right\">Moy. \u00D7 coef.</th>\n            <th class=\"right\">Classe</th>\n            <th class=\"right\">Rang</th>\n            <th>Appr\u00E9ciation</th>\n          </tr>\n        </thead>\n        <tbody>\n          @for (line of card.lines; track line.subjectName) {\n            <tr>\n              <td>{{ line.subjectName }}</td>\n              <td class=\"right\">{{ line.coefficient }}</td>\n              <td class=\"right strong\">{{ formatAverage(line.subjectAverage) }}</td>\n              <td class=\"right\">{{ formatAverage(line.weightedAverage) }}</td>\n              <td class=\"right\">{{ formatAverage(line.classSubjectAverage) }}</td>\n              <td class=\"right\">{{ line.rankInSubject ?? '\u2014' }}</td>\n              <td>{{ line.appreciation || '' }}</td>\n            </tr>\n          }\n        </tbody>\n        <tfoot>\n          <tr>\n            <td colspan=\"2\">Total des coefficients</td>\n            <td class=\"right strong\">{{ card.totalCoefficient }}</td>\n            <td colspan=\"4\"></td>\n          </tr>\n        </tfoot>\n      </table>\n\n      <section class=\"bulletin__summary\">\n        <div class=\"bulletin__box\">\n          <p class=\"bulletin__box-label\">Moyenne g\u00E9n\u00E9rale</p>\n          <p class=\"bulletin__box-value\">\n            {{ formatAverage(card.generalAverage, card.scaleMax) }}\n          </p>\n        </div>\n        <div class=\"bulletin__box\">\n          <p class=\"bulletin__box-label\">Rang</p>\n          <p class=\"bulletin__box-value\">{{ card.rankLabel || '\u2014' }}</p>\n        </div>\n        <div class=\"bulletin__box\">\n          <p class=\"bulletin__box-label\">Moyenne de la classe</p>\n          <p class=\"bulletin__box-value\">{{ formatAverage(card.classAverage) }}</p>\n        </div>\n        <div class=\"bulletin__box\">\n          <p class=\"bulletin__box-label\">Extr\u00EAmes de la classe</p>\n          <p class=\"bulletin__box-value\">\n            {{ formatAverage(card.classMinAverage) }} \u2014 {{ formatAverage(card.classMaxAverage) }}\n          </p>\n        </div>\n      </section>\n\n      <section class=\"bulletin__attendance\">\n        <p>\n          <span>Absences</span>\n          <strong>{{ card.absenceCount }}</strong>\n          dont {{ card.justifiedAbsenceCount }} justifi\u00E9e(s)\n        </p>\n        <p><span>Retards</span><strong>{{ card.latenessCount }}</strong></p>\n      </section>\n\n      @if (card.generalRemark || card.headTeacherRemark || card.principalRemark) {\n        <section class=\"bulletin__remarks\">\n          @if (card.generalRemark) {\n            <p><span>Appr\u00E9ciation g\u00E9n\u00E9rale</span>{{ card.generalRemark }}</p>\n          }\n          @if (card.headTeacherRemark) {\n            <p><span>Professeur principal</span>{{ card.headTeacherRemark }}</p>\n          }\n          @if (card.principalRemark) {\n            <p><span>Chef d'\u00E9tablissement</span>{{ card.principalRemark }}</p>\n          }\n        </section>\n      }\n\n      @if (card.councilDecisionLabel) {\n        <section class=\"bulletin__decision\">\n          <span>D\u00E9cision du conseil de classe</span>\n          <strong>{{ card.councilDecisionLabel }}</strong>\n        </section>\n      }\n\n      <footer class=\"bulletin__foot\">\n        <div class=\"bulletin__signature\">\n          <p>Signature du chef d'\u00E9tablissement</p>\n        </div>\n        <div class=\"bulletin__stamp\">\n          <p class=\"bulletin__reference\">{{ card.reference }}</p>\n          <p class=\"bulletin__code\">Code de v\u00E9rification : {{ card.verificationCode }}</p>\n          <p class=\"bulletin__note\">\n            Ce code permet de faire contr\u00F4ler l'authenticit\u00E9 du bulletin aupr\u00E8s\n            de l'\u00E9tablissement.\n          </p>\n        </div>\n      </footer>\n    </article>\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 \u00C9cran \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.print-only { display: none; }\n\n.tabs {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n.filters {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n\n  &__select .input { width: auto; }\n}\n\n.state {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='todo'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='review'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='done'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='off'] { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n.stats {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));\n  gap: var(--space-4);\n  margin-bottom: var(--space-5);\n}\n\n.stat {\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 3px solid var(--border-strong);\n  border-radius: var(--radius-card);\n\n  &__label { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n  &__value { margin: 2px 0; font-size: var(--text-2xl); color: var(--text-strong); }\n  &__note { margin: 0; font-size: var(--text-xs); color: var(--text-light); }\n\n  &--done { border-left-color: var(--success); }\n  &--alert { border-left-color: var(--warning); background: var(--warning-bg); }\n}\n\n.alert-block {\n  padding: var(--space-4);\n  margin-bottom: var(--space-4);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &--soft {\n    background: var(--surface-sunken);\n    border-color: var(--border-strong);\n\n    .alert-block__icon { background: var(--text-muted); }\n  }\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 22px;\n    height: 22px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.actions-bar {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  flex-wrap: wrap;\n  margin-bottom: var(--space-4);\n\n  &__note {\n    flex: 1;\n    min-width: 240px;\n    margin: 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n}\n\n.table-wrapper { overflow-x: auto; }\n\n.cell-actions {\n  display: flex;\n  gap: var(--space-2);\n  justify-content: flex-end;\n  white-space: nowrap;\n}\n\n.rank {\n  font-weight: 700;\n  color: var(--text-strong);\n\n  small { font-weight: 400; color: var(--text-light); }\n}\n\n.average {\n  font-weight: 700;\n  color: var(--text-strong);\n\n  &--fail { color: var(--danger); }\n}\n\n.gap { color: var(--text-muted); }\n\n.row--top { background: var(--success-bg); }\n.row--failing td:first-child { box-shadow: inset 3px 0 0 var(--danger); }\n.row--empty td { color: var(--text-light); }\n\n.entry {\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__number { display: block; font-size: var(--text-xs); color: var(--text-light); }\n  &__decision {\n    display: block;\n    margin-top: 2px;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n}\n\n.muted { color: var(--text-muted); }\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau de relecture \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n  width: min(460px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &--wide { width: min(720px, 100vw); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__close {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border-light);\n    flex-wrap: wrap;\n  }\n}\n\n.sheet-counters {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  flex-wrap: wrap;\n\n  &__item strong { color: var(--text-strong); }\n  &__item--missing strong { color: var(--warning); }\n}\n\n.table--compact {\n  th, td { padding: var(--space-2) var(--space-3); font-size: var(--text-sm); }\n}\n\n.remarks { margin-top: var(--space-5); }\n\n.hint-block {\n  padding: var(--space-3);\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n}\n\n@include mobile {\n  .drawer,\n  .drawer--wide { width: 100vw; }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Impression \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   Une page A4 par \u00E9l\u00E8ve. Le navigateur sait aussi enregistrer en PDF, ce qui\n   donne un fichier sans qu'il faille embarquer un moteur PDF. */\n\n@media print {\n  .screen-only { display: none !important; }\n  .print-only { display: block; }\n}\n\n.bulletin {\n  /* Marges g\u00E9n\u00E9reuses : les imprimantes des \u00E9tablissements coupent souvent\n     plus large que la zone imprimable annonc\u00E9e. */\n  padding: 14mm 12mm;\n  font-family: var(--font-body, 'Calibri', 'Segoe UI', sans-serif);\n  font-size: 10pt;\n  color: #101828;\n  page-break-after: always;\n\n  &:last-child { page-break-after: auto; }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    padding-bottom: 4mm;\n    border-bottom: 1.5pt solid #101828;\n  }\n\n  &__school-name { margin: 0; font-size: 13pt; font-weight: 700; }\n  &__year { margin: 1mm 0 0; font-size: 9pt; color: #475467; }\n\n  &__title {\n    text-align: right;\n\n    h1 { margin: 0; font-size: 15pt; letter-spacing: 0.5pt; }\n    p { margin: 1mm 0 0; font-size: 10pt; color: #475467; }\n  }\n\n  &__identity {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 3mm;\n    margin: 5mm 0;\n\n    p { margin: 0; display: flex; flex-direction: column; }\n    span { font-size: 8pt; text-transform: uppercase; color: #667085; }\n    strong { font-size: 11pt; }\n  }\n\n  &__table {\n    width: 100%;\n    border-collapse: collapse;\n    margin-bottom: 5mm;\n\n    th, td {\n      padding: 1.6mm 2mm;\n      border: 0.5pt solid #d0d5dd;\n      text-align: left;\n    }\n\n    th {\n      font-size: 8.5pt;\n      text-transform: uppercase;\n      background: #f2f4f7;\n    }\n\n    td { font-size: 9.5pt; }\n    .right { text-align: right; }\n    .strong { font-weight: 700; }\n\n    tfoot td {\n      font-weight: 600;\n      background: #f9fafb;\n    }\n  }\n\n  &__summary {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 3mm;\n    margin-bottom: 5mm;\n  }\n\n  &__box {\n    padding: 3mm;\n    text-align: center;\n    border: 0.5pt solid #d0d5dd;\n  }\n\n  &__box-label {\n    margin: 0;\n    font-size: 8pt;\n    text-transform: uppercase;\n    color: #667085;\n  }\n\n  &__box-value { margin: 1mm 0 0; font-size: 13pt; font-weight: 700; }\n\n  &__attendance {\n    display: flex;\n    gap: 8mm;\n    padding: 2.5mm 3mm;\n    margin-bottom: 4mm;\n    background: #f9fafb;\n    border: 0.5pt solid #d0d5dd;\n\n    p { margin: 0; font-size: 9.5pt; }\n    span { margin-right: 2mm; text-transform: uppercase; font-size: 8pt; color: #667085; }\n    strong { margin-right: 1mm; }\n  }\n\n  &__remarks {\n    margin-bottom: 4mm;\n\n    p {\n      margin: 0 0 2.5mm;\n      padding-bottom: 2mm;\n      font-size: 9.5pt;\n      border-bottom: 0.4pt dotted #d0d5dd;\n    }\n\n    span {\n      display: block;\n      font-size: 8pt;\n      text-transform: uppercase;\n      color: #667085;\n    }\n  }\n\n  &__decision {\n    display: flex;\n    align-items: baseline;\n    gap: 3mm;\n    padding: 3mm;\n    margin-bottom: 6mm;\n    border: 1pt solid #101828;\n\n    span { font-size: 8.5pt; text-transform: uppercase; color: #475467; }\n    strong { font-size: 12pt; }\n  }\n\n  &__foot {\n    display: flex;\n    align-items: flex-end;\n    justify-content: space-between;\n    gap: 8mm;\n  }\n\n  &__signature {\n    width: 55mm;\n    padding-top: 16mm;\n    border-top: 0.5pt solid #98a2b3;\n\n    p { margin: 0; font-size: 8.5pt; color: #667085; }\n  }\n\n  &__stamp { text-align: right; }\n  &__reference { margin: 0; font-size: 9pt; font-weight: 600; }\n  &__code { margin: 1mm 0 0; font-size: 10pt; font-weight: 700; letter-spacing: 1pt; }\n  &__note { margin: 1mm 0 0; max-width: 70mm; font-size: 7.5pt; color: #667085; }\n}\n\n@page {\n  size: A4 portrait;\n  margin: 0;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ReportCardsComponent, { className: "ReportCardsComponent", filePath: "frontend/src/app/features/report-cards/report-cards.component.ts", lineNumber: 51 }); })();
/** Deux décimales, virgule française, sans zéro inutile. */
function format(value) {
    return (Math.round(value * 100) / 100).toString().replace('.', ',');
}
//# sourceMappingURL=report-cards.component.js.map