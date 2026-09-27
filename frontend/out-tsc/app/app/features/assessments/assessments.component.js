import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { CLASSROOM_DATA_SOURCE, CURRICULUM_DATA_SOURCE, GRADE_DATA_SOURCE, TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { ASSESSMENT_STATES, ASSESSMENT_TYPES } from '@core/models/assessment.models';
import { GradeSheetFileService } from '@core/services/grade-sheet-file.service';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.code;
const _forTrack2 = ($index, $item) => $item.studentId;
const _forTrack3 = ($index, $item) => $item.rowNumber;
function AssessmentsComponent_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const b_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", b_r1.termName, " ");
} }
function AssessmentsComponent_Conditional_7_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const b_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", b_r1.awaitingValidationCount, " \u00E0 valider ");
} }
function AssessmentsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵtemplate(1, AssessmentsComponent_Conditional_7_Conditional_1_Template, 1, 1)(2, AssessmentsComponent_Conditional_7_Conditional_2_Template, 1, 1);
} if (rf & 2) {
    const b_r1 = ctx;
    i0.ɵɵtextInterpolate1(" ", b_r1.total, " devoir(s) ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(b_r1.termName ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(b_r1.awaitingValidationCount > 0 ? 2 : -1);
} }
function AssessmentsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "button", 9);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_8_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openForm()); });
    i0.ɵɵelementStart(2, "span", 10);
    i0.ɵɵtext(3, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " Nouveau devoir ");
    i0.ɵɵelementEnd()();
} }
function AssessmentsComponent_Conditional_14_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const b_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(b_r4.gradingCount);
} }
function AssessmentsComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AssessmentsComponent_Conditional_14_Conditional_0_Template, 2, 1, "span", 11);
} if (rf & 2) {
    i0.ɵɵconditional(ctx.gradingCount > 0 ? 0 : -1);
} }
function AssessmentsComponent_Conditional_17_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const b_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(b_r5.awaitingValidationCount);
} }
function AssessmentsComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AssessmentsComponent_Conditional_17_Conditional_0_Template, 2, 1, "span", 11);
} if (rf & 2) {
    i0.ɵɵconditional(ctx.awaitingValidationCount > 0 ? 0 : -1);
} }
function AssessmentsComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 8);
} }
function AssessmentsComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 12);
    i0.ɵɵlistener("retry", function AssessmentsComponent_Conditional_19_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.load()); });
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_20_Conditional_0_For_11_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 29)(1, "span", 30);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 31);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 32);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_20_Conditional_0_For_11_Template_button_click_5_listener() { const item_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openSheet(item_r9)); });
    i0.ɵɵtext(6, "Saisir les notes");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r9 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r9.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate4(" ", item_r9.classroomName, " \u00B7 ", item_r9.subjectName, " \u00B7 ", ctx_r2.formatDate(item_r9.assessmentDate), " \u00B7 ", item_r9.teacherName, " ");
} }
function AssessmentsComponent_Conditional_20_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 13)(1, "div", 24)(2, "span", 25);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 26);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 27);
    i0.ɵɵtext(8, " Pass\u00E9 une semaine, une copie non rendue ne se rattrape plus dans le trimestre : la note manquera au bulletin sans que rien ne le signale. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "ul", 28);
    i0.ɵɵrepeaterCreate(10, AssessmentsComponent_Conditional_20_Conditional_0_For_11_Template, 7, 5, "li", 29, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.overdue().length, " devoir(s) pass\u00E9s sans une seule note saisie ");
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r2.overdue());
} }
function AssessmentsComponent_Conditional_20_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 14)(1, "article", 33)(2, "p", 34);
    i0.ɵɵtext(3, "Annonc\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 35);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 36);
    i0.ɵɵtext(7, "Pas encore pass\u00E9s");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "article", 37)(9, "p", 34);
    i0.ɵɵtext(10, "En correction");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 35);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 36);
    i0.ɵɵtext(14, "Copies pass\u00E9es, notes en cours");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "article", 33)(16, "p", 34);
    i0.ɵɵtext(17, "\u00C0 valider");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p", 35);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p", 36);
    i0.ɵɵtext(21, "Notes rendues, en attente de relecture");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "article", 38)(23, "p", 34);
    i0.ɵɵtext(24, "Publi\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "p", 35);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p", 36);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const b_r10 = ctx;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(b_r10.plannedCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(b_r10.gradingCount);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("stat--alert", b_r10.awaitingValidationCount > 0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(b_r10.awaitingValidationCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(b_r10.publishedCount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", b_r10.awaitingPublicationCount, " valid\u00E9(s) non publi\u00E9(s)");
} }
function AssessmentsComponent_Conditional_20_For_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r11 = ctx.$implicit;
    i0.ɵɵproperty("value", classroom_r11.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(classroom_r11.name);
} }
function AssessmentsComponent_Conditional_20_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subject_r12 = ctx.$implicit;
    i0.ɵɵproperty("value", subject_r12.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(subject_r12.name);
} }
function AssessmentsComponent_Conditional_20_For_21_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 47);
    i0.ɵɵtext(1, "Hors moyenne");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_20_For_21_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 49);
    i0.ɵɵtext(1, " Aucune note attendue avant la date du devoir. ");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_20_For_21_Conditional_16_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const item_r14 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" \u00B7 moyenne ", ctx_r2.formatScore(item_r14.classAverage, item_r14.maxScore), " ");
} }
function AssessmentsComponent_Conditional_20_For_21_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50)(1, "div", 53);
    i0.ɵɵelement(2, "span", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 55);
    i0.ɵɵtext(4);
    i0.ɵɵtemplate(5, AssessmentsComponent_Conditional_20_For_21_Conditional_16_Conditional_5_Template, 1, 1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r14 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r2.progressOf(item_r14), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", item_r14.gradedCount, " / ", item_r14.studentCount, " corrig\u00E9es ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r14.classAverage !== undefined ? 5 : -1);
} }
function AssessmentsComponent_Conditional_20_For_21_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 56);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_20_For_21_Conditional_18_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r15); const item_r14 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openForm(item_r14)); });
    i0.ɵɵtext(1, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 57);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_20_For_21_Conditional_18_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r15); const item_r14 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openEntry(item_r14)); });
    i0.ɵɵtext(3, " Ouvrir la saisie ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.saving());
} }
function AssessmentsComponent_Conditional_20_For_21_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 56);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_20_For_21_Conditional_19_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r16); const item_r14 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openForm(item_r14)); });
    i0.ɵɵtext(1, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 32);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_20_For_21_Conditional_19_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r16); const item_r14 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openSheet(item_r14)); });
    i0.ɵɵtext(3, "Saisir les notes");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_20_For_21_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 58);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_20_For_21_Conditional_20_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const item_r14 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openSheet(item_r14)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r14.status === "SUBMITTED" ? "Relire et valider" : "Voir les notes", " ");
} }
function AssessmentsComponent_Conditional_20_For_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 39)(1, "header", 40)(2, "div", 41)(3, "h2", 42);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 43);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 44);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 45)(10, "p", 46);
    i0.ɵɵtext(11);
    i0.ɵɵtemplate(12, AssessmentsComponent_Conditional_20_For_21_Conditional_12_Template, 2, 0, "span", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 48);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, AssessmentsComponent_Conditional_20_For_21_Conditional_15_Template, 2, 0, "p", 49)(16, AssessmentsComponent_Conditional_20_For_21_Conditional_16_Template, 6, 5, "div", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "footer", 51);
    i0.ɵɵtemplate(18, AssessmentsComponent_Conditional_20_For_21_Conditional_18_Template, 4, 1)(19, AssessmentsComponent_Conditional_20_For_21_Conditional_19_Template, 4, 0)(20, AssessmentsComponent_Conditional_20_For_21_Conditional_20_Template, 2, 1, "button", 52);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r14 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("--paper-color", item_r14.subjectColor || "var(--brand)");
    i0.ɵɵattribute("data-tone", ctx_r2.stateOf(item_r14.status).tone);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r14.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" ", item_r14.classroomName, " \u00B7 ", item_r14.subjectName, " \u00B7 ", ctx_r2.formatDate(item_r14.assessmentDate), " ");
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", ctx_r2.stateOf(item_r14.status).tone)("title", ctx_r2.stateOf(item_r14.status).hint);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r14.statusLabel);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate3(" ", item_r14.assessmentTypeLabel, " \u00B7 sur ", item_r14.maxScore, " \u00B7 coefficient ", item_r14.coefficient, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(!item_r14.countsForAverage ? 12 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r14.teacherName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r14.status === "PLANNED" || item_r14.status === "DRAFT" ? 15 : 16);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(item_r14.status === "PLANNED" ? 18 : item_r14.gradeEntryOpen ? 19 : 20);
} }
function AssessmentsComponent_Conditional_20_ForEmpty_22_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Rien n'attend votre relecture. ");
} }
function AssessmentsComponent_Conditional_20_ForEmpty_22_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucune correction en cours. ");
} }
function AssessmentsComponent_Conditional_20_ForEmpty_22_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucun devoir sur cette p\u00E9riode. ");
} }
function AssessmentsComponent_Conditional_20_ForEmpty_22_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Un devoir se d\u00E9clare avant d'\u00EAtre corrig\u00E9 : c'est lui qui d\u00E9cide dans quelle moyenne la note entrera, et avec quel poids. ");
} }
function AssessmentsComponent_Conditional_20_ForEmpty_22_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Les devoirs apparaissent ici d\u00E8s que leur saisie est ouverte. ");
} }
function AssessmentsComponent_Conditional_20_ForEmpty_22_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_20_ForEmpty_22_Conditional_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openForm()); });
    i0.ɵɵtext(1, " Planifier un devoir ");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_20_ForEmpty_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23)(1, "p", 59);
    i0.ɵɵtemplate(2, AssessmentsComponent_Conditional_20_ForEmpty_22_Conditional_2_Template, 1, 0)(3, AssessmentsComponent_Conditional_20_ForEmpty_22_Conditional_3_Template, 1, 0)(4, AssessmentsComponent_Conditional_20_ForEmpty_22_Conditional_4_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 60);
    i0.ɵɵtemplate(6, AssessmentsComponent_Conditional_20_ForEmpty_22_Conditional_6_Template, 1, 0)(7, AssessmentsComponent_Conditional_20_ForEmpty_22_Conditional_7_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, AssessmentsComponent_Conditional_20_ForEmpty_22_Conditional_8_Template, 2, 0, "button", 61);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.tab() === "VALIDATION" ? 2 : ctx_r2.tab() === "CORRECTION" ? 3 : 4);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r2.tab() === "PLANNING" ? 6 : 7);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.tab() === "PLANNING" ? 8 : -1);
} }
function AssessmentsComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵtemplate(0, AssessmentsComponent_Conditional_20_Conditional_0_Template, 12, 1, "section", 13)(1, AssessmentsComponent_Conditional_20_Conditional_1_Template, 29, 7, "section", 14);
    i0.ɵɵelementStart(2, "section", 15)(3, "label", 16)(4, "span", 17);
    i0.ɵɵtext(5, "Filtrer par classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "select", 18);
    i0.ɵɵlistener("change", function AssessmentsComponent_Conditional_20_Template_select_change_6_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.changeClassroom($event.target.value)); });
    i0.ɵɵelementStart(7, "option", 19);
    i0.ɵɵtext(8, "Toutes les classes");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(9, AssessmentsComponent_Conditional_20_For_10_Template, 2, 2, "option", 20, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "label", 16)(12, "span", 17);
    i0.ɵɵtext(13, "Filtrer par mati\u00E8re");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "select", 18);
    i0.ɵɵlistener("change", function AssessmentsComponent_Conditional_20_Template_select_change_14_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.changeSubject($event.target.value)); });
    i0.ɵɵelementStart(15, "option", 19);
    i0.ɵɵtext(16, "Toutes les mati\u00E8res");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(17, AssessmentsComponent_Conditional_20_For_18_Template, 2, 2, "option", 20, _forTrack0);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "section", 21);
    i0.ɵɵrepeaterCreate(20, AssessmentsComponent_Conditional_20_For_21_Template, 21, 17, "article", 22, _forTrack0, false, AssessmentsComponent_Conditional_20_ForEmpty_22_Template, 9, 3, "div", 23);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r2.overdue().length > 0 ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_2_0 = ctx_r2.board()) ? 1 : -1, tmp_2_0);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r2.classroomFilter());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.classroomList());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r2.subjectFilter());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.subjectList());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.visible());
} }
function AssessmentsComponent_Conditional_21_For_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r19 = ctx.$implicit;
    i0.ɵɵproperty("value", classroom_r19.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(classroom_r19.name);
} }
function AssessmentsComponent_Conditional_21_For_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subject_r20 = ctx.$implicit;
    i0.ɵɵproperty("value", subject_r20.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(subject_r20.name);
} }
function AssessmentsComponent_Conditional_21_For_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const teacher_r21 = ctx.$implicit;
    i0.ɵɵproperty("value", teacher_r21.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(teacher_r21.fullName);
} }
function AssessmentsComponent_Conditional_21_For_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 20);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r22 = ctx.$implicit;
    i0.ɵɵproperty("value", type_r22.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(type_r22.label);
} }
function AssessmentsComponent_Conditional_21_Conditional_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 85);
    i0.ɵɵtext(1, " Fig\u00E9 : des notes ont d\u00E9j\u00E0 \u00E9t\u00E9 saisies sur ce bar\u00E8me. Le changer les ferait toutes bouger sans que personne y touche. ");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 62);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_21_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeForm()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 63)(2, "header", 64)(3, "h2", 65);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 66);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_21_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeForm()); });
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 67);
    i0.ɵɵlistener("ngSubmit", function AssessmentsComponent_Conditional_21_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitForm()); });
    i0.ɵɵelementStart(8, "div", 68)(9, "label", 69);
    i0.ɵɵtext(10, "Intitul\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 71)(13, "div", 68)(14, "label", 72);
    i0.ɵɵtext(15, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "select", 73)(17, "option", 19);
    i0.ɵɵtext(18, "Choisir\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(19, AssessmentsComponent_Conditional_21_For_20_Template, 2, 2, "option", 20, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 68)(22, "label", 74);
    i0.ɵɵtext(23, "Mati\u00E8re");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "select", 75)(25, "option", 19);
    i0.ɵɵtext(26, "Choisir\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(27, AssessmentsComponent_Conditional_21_For_28_Template, 2, 2, "option", 20, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span", 76);
    i0.ɵɵtext(30, " Elle doit figurer au programme du niveau : sans coefficient, la note n'entrerait dans aucune moyenne. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "div", 68)(32, "label", 77);
    i0.ɵɵtext(33, " Enseignant correcteur ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "select", 78)(35, "option", 19);
    i0.ɵɵtext(36, "Choisir\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(37, AssessmentsComponent_Conditional_21_For_38_Template, 2, 2, "option", 20, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span", 76);
    i0.ɵɵtext(40, " Il doit \u00EAtre affect\u00E9 \u00E0 cette mati\u00E8re dans cette classe, sinon les notes n'appara\u00EEtront sur aucun de ses \u00E9crans. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "div", 71)(42, "div", 68)(43, "label", 79);
    i0.ɵɵtext(44, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "select", 80);
    i0.ɵɵrepeaterCreate(46, AssessmentsComponent_Conditional_21_For_47_Template, 2, 2, "option", 20, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(48, "div", 68)(49, "label", 81);
    i0.ɵɵtext(50, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(51, "input", 82);
    i0.ɵɵelementStart(52, "span", 76);
    i0.ɵɵtext(53, " Elle doit tomber dans la p\u00E9riode en cours. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(54, "div", 71)(55, "div", 68)(56, "label", 83);
    i0.ɵɵtext(57, "Bar\u00E8me");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(58, "input", 84);
    i0.ɵɵtemplate(59, AssessmentsComponent_Conditional_21_Conditional_59_Template, 2, 0, "span", 85);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "div", 68)(61, "label", 86);
    i0.ɵɵtext(62, "Coefficient");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(63, "input", 87);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(64, "div", 68)(65, "label", 88);
    i0.ɵɵtext(66, "Dur\u00E9e (minutes)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(67, "input", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "label", 90);
    i0.ɵɵelement(69, "input", 91);
    i0.ɵɵelementStart(70, "span");
    i0.ɵɵtext(71, " Compte dans la moyenne ");
    i0.ɵɵelementStart(72, "small");
    i0.ɵɵtext(73, "D\u00E9cochez pour un devoir blanc : il est corrig\u00E9 et rendu, mais n'entre dans aucune moyenne.");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(74, "footer", 92)(75, "button", 93);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_21_Template_button_click_75_listener() { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeForm()); });
    i0.ɵɵtext(76, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "button", 94);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_21_Template_button_click_77_listener() { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitForm()); });
    i0.ɵɵtext(78);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.editing() ? "Modifier le devoir" : "Nouveau devoir", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r2.assessmentForm);
    i0.ɵɵadvance(12);
    i0.ɵɵrepeater(ctx_r2.classroomList());
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r2.subjectList());
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(ctx_r2.teacherList());
    i0.ɵɵadvance(9);
    i0.ɵɵrepeater(ctx_r2.types);
    i0.ɵɵadvance(12);
    i0.ɵɵattribute("disabled", ctx_r2.scaleLocked() ? "" : null);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.scaleLocked() ? 59 : -1);
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("disabled", ctx_r2.assessmentForm.invalid || ctx_r2.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.editing() ? "Enregistrer" : "Planifier", " ");
} }
function AssessmentsComponent_Conditional_22_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 99);
    i0.ɵɵtext(1, " moyenne ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r24 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.formatScore(ctx_r2.sheetCounters().average, s_r24.assessment.maxScore));
} }
function AssessmentsComponent_Conditional_22_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 103);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "input", 110);
    i0.ɵɵlistener("change", function AssessmentsComponent_Conditional_22_Conditional_27_Template_input_change_2_listener($event) { i0.ɵɵrestoreView(_r25); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onFileChosen($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.analysing() ? "Lecture\u2026" : "Importer", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.analysing() || ctx_r2.saving());
} }
function AssessmentsComponent_Conditional_22_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 104)(1, "p", 111);
    i0.ɵɵtext(2, "Distribution de la classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul", 112)(4, "li")(5, "span");
    i0.ɵɵtext(6, "Moyenne");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "li")(10, "span");
    i0.ɵɵtext(11, "M\u00E9diane");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "li")(15, "span");
    i0.ɵɵtext(16, "Extr\u00EAmes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "li")(20, "span");
    i0.ɵɵtext(21, "Ont la moyenne");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "strong");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "p", 113);
    i0.ɵɵtext(25, " Une copie o\u00F9 les deux tiers de la classe sont sous la moyenne est rarement une mauvaise classe : c'est le plus souvent un sujet trop dur ou un bar\u00E8me mal saisi. Cela se corrige avant la publication. ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r24 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.formatScore(s_r24.classAverage, s_r24.assessment.maxScore));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.formatScore(s_r24.median, s_r24.assessment.maxScore));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r2.formatScore(s_r24.minScore), " \u2014 ", ctx_r2.formatScore(s_r24.maxScoreObtained), "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", s_r24.passCount, " / ", s_r24.rows.length - s_r24.absentCount - s_r24.exemptedCount, "");
} }
function AssessmentsComponent_Conditional_22_For_32_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const row_r26 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", row_r26.revisionCount, " correction(s) ");
} }
function AssessmentsComponent_Conditional_22_For_32_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 119)(1, "span", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 120);
    i0.ɵɵlistener("change", function AssessmentsComponent_Conditional_22_For_32_Conditional_8_Template_input_change_3_listener($event) { i0.ɵɵrestoreView(_r27); const row_r26 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.setScore(row_r26.studentId, $event.target.value)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "span", 121);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "label", 122)(7, "input", 123);
    i0.ɵɵlistener("change", function AssessmentsComponent_Conditional_22_For_32_Conditional_8_Template_input_change_7_listener($event) { i0.ɵɵrestoreView(_r27); const row_r26 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleAbsent(row_r26.studentId, $event.target.checked)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "Absent");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "label", 122)(11, "input", 123);
    i0.ɵɵlistener("change", function AssessmentsComponent_Conditional_22_For_32_Conditional_8_Template_input_change_11_listener($event) { i0.ɵɵrestoreView(_r27); const row_r26 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleExempted(row_r26.studentId, $event.target.checked)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13, "Dispens\u00E9");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_14_0;
    const row_r26 = i0.ɵɵnextContext().$implicit;
    const s_r24 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Note de ", row_r26.studentName, "");
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", (tmp_14_0 = row_r26.score) !== null && tmp_14_0 !== undefined ? tmp_14_0 : "")("disabled", row_r26.absent || row_r26.exempted)("max", s_r24.assessment.maxScore);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("/ ", s_r24.assessment.maxScore, "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", row_r26.absent);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("checked", row_r26.exempted);
} }
function AssessmentsComponent_Conditional_22_For_32_Conditional_9_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 125);
    i0.ɵɵtext(1, "Absent");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_22_For_32_Conditional_9_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 47);
    i0.ɵɵtext(1, "Dispens\u00E9");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_22_For_32_Conditional_9_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const row_r26 = i0.ɵɵnextContext(2).$implicit;
    const s_r24 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.formatScore(row_r26.score, s_r24.assessment.maxScore), " ");
} }
function AssessmentsComponent_Conditional_22_For_32_Conditional_9_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 56);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_22_For_32_Conditional_9_Conditional_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r28); const row_r26 = i0.ɵɵnextContext(2).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openCorrection(row_r26)); });
    i0.ɵɵtext(1, "Corriger");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_22_For_32_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 124);
    i0.ɵɵtemplate(1, AssessmentsComponent_Conditional_22_For_32_Conditional_9_Conditional_1_Template, 2, 0, "span", 125)(2, AssessmentsComponent_Conditional_22_For_32_Conditional_9_Conditional_2_Template, 2, 0, "span", 47)(3, AssessmentsComponent_Conditional_22_For_32_Conditional_9_Conditional_3_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, AssessmentsComponent_Conditional_22_For_32_Conditional_9_Conditional_4_Template, 2, 0, "button", 126);
} if (rf & 2) {
    const row_r26 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵconditional(row_r26.absent ? 1 : row_r26.exempted ? 2 : 3);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(row_r26.requiresJustifiedCorrection ? 4 : -1);
} }
function AssessmentsComponent_Conditional_22_For_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 114)(1, "div", 115)(2, "span", 116);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 117);
    i0.ɵɵtext(5);
    i0.ɵɵtemplate(6, AssessmentsComponent_Conditional_22_For_32_Conditional_6_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 118);
    i0.ɵɵtemplate(8, AssessmentsComponent_Conditional_22_For_32_Conditional_8_Template, 14, 7)(9, AssessmentsComponent_Conditional_22_For_32_Conditional_9_Template, 5, 2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r26 = ctx.$implicit;
    const s_r24 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("marks__item--absent", row_r26.absent)("marks__item--missing", !row_r26.absent && !row_r26.exempted && row_r26.score === undefined);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r26.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", row_r26.studentNumber, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(row_r26.revisionCount > 0 ? 6 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(s_r24.assessment.gradeEntryOpen ? 8 : 9);
} }
function AssessmentsComponent_Conditional_22_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 108);
    i0.ɵɵtext(1, "Notes saisies, pas encore enregistr\u00E9es.");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_22_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 108);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.sheetCounters().missing, " \u00E9l\u00E8ve(s) sans note ni absence. ");
} }
function AssessmentsComponent_Conditional_22_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 127);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_22_Conditional_36_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r29); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.saveSheet()); });
    i0.ɵɵtext(1, "Enregistrer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 94);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_22_Conditional_36_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r29); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.submitSheet()); });
    i0.ɵɵtext(3, "Transmettre");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r2.saving());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.saving() || ctx_r2.sheetCounters().missing > 0);
} }
function AssessmentsComponent_Conditional_22_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 93);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_22_Conditional_37_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r30); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.closeSheet()); });
    i0.ɵɵtext(1, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 94);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_22_Conditional_37_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r30); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.validateSheet()); });
    i0.ɵɵtext(3, "Valider les notes");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.saving());
} }
function AssessmentsComponent_Conditional_22_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 93);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_22_Conditional_38_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r31); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.closeSheet()); });
    i0.ɵɵtext(1, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 94);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_22_Conditional_38_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r31); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.publishSheet()); });
    i0.ɵɵtext(3, "Publier aux familles");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.saving());
} }
function AssessmentsComponent_Conditional_22_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 93);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_22_Conditional_39_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r32); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.closeSheet()); });
    i0.ɵɵtext(1, "Fermer");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 62);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_22_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r23); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeSheet()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 95)(2, "header", 64)(3, "div")(4, "h2", 96);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 97);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 66);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_22_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r23); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeSheet()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 98)(11, "span", 99)(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14, " not\u00E9es ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 100)(16, "strong");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(18, " absents ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 101)(20, "strong");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(22, " sans note ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(23, AssessmentsComponent_Conditional_22_Conditional_23_Template, 4, 1, "span", 99);
    i0.ɵɵelementStart(24, "span", 102)(25, "button", 56);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_22_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r23); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.exportSheet()); });
    i0.ɵɵtext(26, " Exporter ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(27, AssessmentsComponent_Conditional_22_Conditional_27_Template, 3, 2, "label", 103);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(28, AssessmentsComponent_Conditional_22_Conditional_28_Template, 26, 6, "div", 104);
    i0.ɵɵelementStart(29, "div", 105)(30, "ul", 106);
    i0.ɵɵrepeaterCreate(31, AssessmentsComponent_Conditional_22_For_32_Template, 10, 8, "li", 107, _forTrack2);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "footer", 92);
    i0.ɵɵtemplate(34, AssessmentsComponent_Conditional_22_Conditional_34_Template, 2, 0, "p", 108)(35, AssessmentsComponent_Conditional_22_Conditional_35_Template, 2, 1, "p", 108)(36, AssessmentsComponent_Conditional_22_Conditional_36_Template, 4, 2)(37, AssessmentsComponent_Conditional_22_Conditional_37_Template, 4, 1)(38, AssessmentsComponent_Conditional_22_Conditional_38_Template, 4, 1)(39, AssessmentsComponent_Conditional_22_Conditional_39_Template, 2, 0, "button", 109);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r24 = ctx;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(s_r24.assessment.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate4(" ", s_r24.assessment.classroomName, " \u00B7 ", s_r24.assessment.subjectName, " \u00B7 sur ", s_r24.assessment.maxScore, " \u00B7 ", s_r24.assessment.statusLabel, " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.sheetCounters().scored);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.sheetCounters().absent);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.sheetCounters().missing);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.sheetCounters().average !== undefined ? 23 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(s_r24.assessment.gradeEntryOpen ? 27 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!s_r24.assessment.gradeEntryOpen ? 28 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(s_r24.rows);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r2.sheetDirty() ? 34 : ctx_r2.sheetCounters().missing > 0 && s_r24.assessment.gradeEntryOpen ? 35 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(s_r24.assessment.gradeEntryOpen ? 36 : s_r24.assessment.status === "SUBMITTED" ? 37 : s_r24.assessment.status === "VALIDATED" ? 38 : 39);
} }
function AssessmentsComponent_Conditional_23_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 101)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " refus\u00E9es ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const preview_r34 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(preview_r34.invalidRows + preview_r34.unknownRows + preview_r34.lockedRows);
} }
function AssessmentsComponent_Conditional_23_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 130);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const preview_r34 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", preview_r34.missingStudents, " \u00E9l\u00E8ve(s) de la classe ne figurent pas dans le fichier. Leur note actuelle est conserv\u00E9e telle quelle : un fichier incomplet n'efface rien. ");
} }
function AssessmentsComponent_Conditional_23_For_24_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const row_r35 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", row_r35.studentNumber, " ");
} }
function AssessmentsComponent_Conditional_23_For_24_Conditional_8_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Absent ");
} }
function AssessmentsComponent_Conditional_23_For_24_Conditional_8_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const row_r35 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.formatScore(row_r35.currentScore), " ");
} }
function AssessmentsComponent_Conditional_23_For_24_Conditional_8_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u2014 ");
} }
function AssessmentsComponent_Conditional_23_For_24_Conditional_8_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Absent ");
} }
function AssessmentsComponent_Conditional_23_For_24_Conditional_8_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const row_r35 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.formatScore(row_r35.newScore), " ");
} }
function AssessmentsComponent_Conditional_23_For_24_Conditional_8_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u2014 ");
} }
function AssessmentsComponent_Conditional_23_For_24_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 141);
    i0.ɵɵtemplate(1, AssessmentsComponent_Conditional_23_For_24_Conditional_8_Conditional_1_Template, 1, 0)(2, AssessmentsComponent_Conditional_23_For_24_Conditional_8_Conditional_2_Template, 1, 1)(3, AssessmentsComponent_Conditional_23_For_24_Conditional_8_Conditional_3_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 142);
    i0.ɵɵtext(5, "\u2192");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 143);
    i0.ɵɵtemplate(7, AssessmentsComponent_Conditional_23_For_24_Conditional_8_Conditional_7_Template, 1, 0)(8, AssessmentsComponent_Conditional_23_For_24_Conditional_8_Conditional_8_Template, 1, 1)(9, AssessmentsComponent_Conditional_23_For_24_Conditional_8_Conditional_9_Template, 1, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r35 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵconditional(row_r35.currentAbsent ? 1 : row_r35.currentScore !== undefined ? 2 : 3);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(row_r35.newAbsent ? 7 : row_r35.newScore !== undefined ? 8 : 9);
} }
function AssessmentsComponent_Conditional_23_For_24_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 138);
    i0.ɵɵtext(1, "Inchang\u00E9e");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_23_For_24_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 139);
    i0.ɵɵtext(1, "Refus\u00E9e");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_23_For_24_Conditional_11_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 144);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const message_r36 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(message_r36);
} }
function AssessmentsComponent_Conditional_23_For_24_Conditional_11_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 145);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const message_r37 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(message_r37);
} }
function AssessmentsComponent_Conditional_23_For_24_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 140);
    i0.ɵɵrepeaterCreate(1, AssessmentsComponent_Conditional_23_For_24_Conditional_11_For_2_Template, 2, 1, "li", 144, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵrepeaterCreate(3, AssessmentsComponent_Conditional_23_For_24_Conditional_11_For_4_Template, 2, 1, "li", 145, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r35 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(row_r35.errors);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(row_r35.warnings);
} }
function AssessmentsComponent_Conditional_23_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 132)(1, "div", 134)(2, "span", 135);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 136);
    i0.ɵɵtext(5);
    i0.ɵɵtemplate(6, AssessmentsComponent_Conditional_23_For_24_Conditional_6_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 137);
    i0.ɵɵtemplate(8, AssessmentsComponent_Conditional_23_For_24_Conditional_8_Template, 10, 2)(9, AssessmentsComponent_Conditional_23_For_24_Conditional_9_Template, 2, 0, "span", 138)(10, AssessmentsComponent_Conditional_23_For_24_Conditional_10_Template, 2, 0, "span", 139);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, AssessmentsComponent_Conditional_23_For_24_Conditional_11_Template, 5, 0, "ul", 140);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r35 = ctx.$implicit;
    i0.ɵɵattribute("data-status", row_r35.status);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r35.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ligne ", row_r35.rowNumber, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(row_r35.studentNumber ? 6 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(row_r35.status === "CHANGED" ? 8 : row_r35.status === "UNCHANGED" ? 9 : 10);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(row_r35.errors.length > 0 || row_r35.warnings.length > 0 ? 11 : -1);
} }
function AssessmentsComponent_Conditional_23_ForEmpty_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 133);
    i0.ɵɵtext(1, " Le fichier ne contient aucune ligne exploitable. ");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_23_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 108);
    i0.ɵɵtext(1, "Rien \u00E0 reprendre de ce fichier.");
    i0.ɵɵelementEnd();
} }
function AssessmentsComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 62);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_23_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r33); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeImport()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 128)(2, "header", 64)(3, "div")(4, "h2", 129);
    i0.ɵɵtext(5, "Ce que le fichier changerait");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 97);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 66);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_23_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r33); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeImport()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 98)(11, "span", 99)(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14, " \u00E0 modifier ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 99)(16, "strong");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(18, " inchang\u00E9es ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, AssessmentsComponent_Conditional_23_Conditional_19_Template, 4, 1, "span", 101);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, AssessmentsComponent_Conditional_23_Conditional_20_Template, 2, 1, "p", 130);
    i0.ɵɵelementStart(21, "div", 105)(22, "ul", 131);
    i0.ɵɵrepeaterCreate(23, AssessmentsComponent_Conditional_23_For_24_Template, 12, 6, "li", 132, _forTrack3, false, AssessmentsComponent_Conditional_23_ForEmpty_25_Template, 2, 0, "li", 133);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "footer", 92);
    i0.ɵɵtemplate(27, AssessmentsComponent_Conditional_23_Conditional_27_Template, 2, 0, "p", 108);
    i0.ɵɵelementStart(28, "button", 93);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_23_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r33); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeImport()); });
    i0.ɵɵtext(29, " Annuler ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 94);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_23_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r33); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.applyImport()); });
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const preview_r34 = ctx;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(preview_r34.fileName);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(preview_r34.changedRows);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(preview_r34.unchangedRows);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(preview_r34.invalidRows + preview_r34.unknownRows + preview_r34.lockedRows > 0 ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(preview_r34.missingStudents > 0 ? 20 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(preview_r34.rows);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(!preview_r34.importable ? 27 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !preview_r34.importable || ctx_r2.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Appliquer ", preview_r34.changedRows, " note(s) ");
} }
function AssessmentsComponent_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 62);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_24_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r38); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeCorrection()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 146)(2, "header", 64)(3, "div")(4, "h2", 147);
    i0.ɵɵtext(5, "Corriger une note");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 148);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 66);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_24_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r38); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeCorrection()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 67);
    i0.ɵɵlistener("ngSubmit", function AssessmentsComponent_Conditional_24_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r38); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitCorrection()); });
    i0.ɵɵelementStart(11, "p", 149);
    i0.ɵɵtext(12, " L'ancienne valeur et le motif sont conserv\u00E9s. Sans cette trace, une note corrig\u00E9e et une note trafiqu\u00E9e se ressemblent, et l'\u00E9l\u00E8ve n'a aucun moyen de contester. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 68)(14, "label", 150);
    i0.ɵɵtext(15, " Nouvelle note ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "input", 151);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "label", 90);
    i0.ɵɵelement(18, "input", 152);
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20, " L'\u00E9l\u00E8ve \u00E9tait absent ");
    i0.ɵɵelementStart(21, "small");
    i0.ɵɵtext(22, "La note est effac\u00E9e. Une absence n'est pas un z\u00E9ro : elle ne compte pas dans la moyenne.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "div", 68)(24, "label", 153);
    i0.ɵɵtext(25, " Pourquoi la note change ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(26, "input", 154);
    i0.ɵɵelementStart(27, "span", 76);
    i0.ɵɵtext(28, " Ce texte est conserv\u00E9 avec l'ancienne valeur et reste consultable. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "footer", 92)(30, "button", 93);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_24_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r38); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeCorrection()); });
    i0.ɵɵtext(31, " Annuler ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "button", 94);
    i0.ɵɵlistener("click", function AssessmentsComponent_Conditional_24_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r38); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitCorrection()); });
    i0.ɵɵtext(33, " Enregistrer la correction ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r39 = ctx;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate2("", row_r39.studentName, " \u2014 ", row_r39.statusLabel, "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r2.correctionForm);
    i0.ɵɵadvance(22);
    i0.ɵɵproperty("disabled", ctx_r2.correctionForm.invalid || ctx_r2.saving());
} }
/**
 * Assessments: planning the papers, entering the marks, validating them.
 *
 * <p>One screen for three moments because they are one chain, and each link is
 * a different person's responsibility. A paper announced by the office is sat,
 * corrected by the teacher, handed back, re-read, and only then shown to the
 * families. Splitting that across three screens is how schools end up with a
 * term's worth of marks that nobody ever validated.</p>
 *
 * <p>The help works like the one in the configuration: a card appears by itself
 * the first time a tab is opened, and the « ? Aide » button brings it back. The
 * things worth saying here are not obvious — why an empty mark is not a zero,
 * why the scale freezes after the first mark, why a published mark cannot be
 * changed silently.</p>
 */
export class AssessmentsComponent {
    dataSource = inject(GRADE_DATA_SOURCE);
    classrooms = inject(CLASSROOM_DATA_SOURCE);
    curriculum = inject(CURRICULUM_DATA_SOURCE);
    teachers = inject(TEACHER_DATA_SOURCE);
    notifications = inject(NotificationService);
    files = inject(GradeSheetFileService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    route = inject(ActivatedRoute);
    /**
     * The component is also the grade-book entry point. Keeping both URLs on the
     * same workflow prevents a mark from having one lifecycle in Assessments and
     * another in Grades.
     */
    gradesEntryPoint = this.route.snapshot.data['initialTab'] === 'CORRECTION';
    pageTitle = this.gradesEntryPoint ? 'Notes' : 'Évaluations';
    types = ASSESSMENT_TYPES;
    states = ASSESSMENT_STATES;
    totalSteps = 3;
    tab = signal(this.gradesEntryPoint ? 'CORRECTION' : 'PLANNING');
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    board = signal(null);
    classroomList = signal([]);
    subjectList = signal([]);
    teacherList = signal([]);
    classroomFilter = signal('');
    subjectFilter = signal('');
    /** Le devoir en cours de création ou de modification ; nul si le panneau est fermé. */
    editing = signal(null);
    formOpen = signal(false);
    /** La feuille de notes ouverte ; nulle si le panneau est fermé. */
    sheet = signal(null);
    sheetDirty = signal(false);
    /** La note dont on saisit la correction justifiée. */
    correcting = signal(null);
    /** L'aperçu du fichier rendu ; nul tant qu'aucun fichier n'a été déposé. */
    importPreview = signal(null);
    analysing = signal(false);
    assessmentForm = this.fb.nonNullable.group({
        classroomId: ['', [Validators.required]],
        subjectId: ['', [Validators.required]],
        teacherId: ['', [Validators.required]],
        title: ['', [Validators.required, Validators.maxLength(200)]],
        assessmentType: ['TEST', [Validators.required]],
        assessmentDate: ['', [Validators.required]],
        durationMinutes: [120, [Validators.min(1), Validators.max(600)]],
        maxScore: [20, [Validators.required, Validators.min(0.001), Validators.max(1000)]],
        coefficient: [2, [Validators.required, Validators.min(0.001), Validators.max(100)]],
        countsForAverage: [true]
    });
    correctionForm = this.fb.nonNullable.group({
        score: [0, [Validators.min(0)]],
        absent: [false],
        justification: ['', [Validators.required, Validators.maxLength(500)]]
    });
    // ------------------------------------------------------------------ aide
    help = {
        PLANNING: {
            step: 1,
            title: 'Un devoir se déclare avant d\'être corrigé',
            description: "Chaque devoir porte une classe, une matière, un enseignant et un "
                + "barème. Ces quatre-là décident où la note ira : dans quelle moyenne, avec "
                + 'quel poids, dans quel bulletin.',
            points: [
                "Une date hors de la période est refusée : la note irait dans le mauvais "
                    + "bulletin, et rien en aval ne s'en apercevrait.",
                'Une matière absente du programme du niveau est refusée : sans coefficient, '
                    + "la note n'entrerait dans aucune moyenne.",
                'Le barème se fige dès la première note saisie. Le changer après coup ferait '
                    + 'bouger toutes les notes déjà entrées sans que personne y touche.'
            ],
            ctaLabel: 'Planifier un devoir'
        },
        CORRECTION: {
            step: 2,
            title: 'La saisie se fait copie par copie, et se garde',
            description: 'Enregistrer n\'est pas soumettre. Une correction étalée sur une '
                + 'soirée survit à un navigateur fermé, et rien de ce qui est encore en cours '
                + 'de saisie n\'apparaît comme définitif au secrétariat.',
            points: [
                "Une case vide n'est pas un zéro : un zéro se saisit. Un élève qui n'a pas "
                    + 'composé se marque absent — sa note ne compte pas, elle n\'est pas comptée '
                    + 'zéro.',
                'Un devoir ne peut pas être soumis tant qu\'un élève n\'a ni note ni absence. '
                    + 'Une note manquante ne se voit pas dans une moyenne : l\'élève pèse '
                    + 'simplement moins, en silence.',
                'La feuille s\'exporte en classeur Excel, se remplit hors ligne, et revient '
                    + 'par « Importer ». Le rapprochement se fait sur le matricule, jamais sur '
                    + 'l\'ordre des lignes : trier par note avant de rendre le fichier ne casse rien.',
                'Un import montre d\'abord ce qu\'il changerait, ligne par ligne, avec '
                    + 'l\'ancienne note à côté de la nouvelle. Rien n\'est écrit avant votre accord.'
            ],
            ctaLabel: 'Voir les corrections'
        },
        VALIDATION: {
            step: 3,
            title: 'Relire avant que les familles voient',
            description: 'Les notes soumises attendent votre relecture. La distribution est '
                + 'affichée avec elles : moyenne, médiane, extrêmes, nombre d\'élèves ayant '
                + 'la moyenne.',
            points: [
                'Une copie où les deux tiers de la classe sont sous 5 est rarement une '
                    + 'mauvaise classe : c\'est le plus souvent un sujet trop dur ou un barème mal '
                    + 'saisi. Cela se voit avant la publication, pas après.',
                'Valider fait entrer les notes dans les moyennes. Publier les montre aux '
                    + 'familles. Les deux gestes sont séparés parce qu\'ils n\'engagent pas la '
                    + 'même chose.',
                'Après publication, toute correction exige un motif écrit, conservé avec '
                    + 'l\'ancienne valeur. Sans cette trace, une note corrigée et une note '
                    + 'trafiquée se ressemblent.'
            ],
            ctaLabel: 'Relire les notes'
        }
    };
    helpCopy = computed(() => this.help[this.tab()]);
    // --------------------------------------------------------------- cycle
    ngOnInit() {
        this.loadReferences();
        this.load();
    }
    changeTab(tab) {
        this.tab.set(tab);
        this.closeSheet();
        this.closeForm();
    }
    loadReferences() {
        forkJoin({
            classrooms: this.classrooms.list(),
            subjects: this.curriculum.listSubjects(),
            teachers: this.teachers.search({ page: 0, size: 200 })
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (data) => {
                this.classroomList.set(data.classrooms);
                this.subjectList.set(data.subjects.filter((s) => s.status === 'ACTIVE'));
                this.teacherList.set(data.teachers.content);
            },
            // Les listes de choix manquantes ne doivent pas vider le tableau.
            error: () => undefined
        });
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.board({
            classroomId: this.classroomFilter() || undefined,
            subjectId: this.subjectFilter() || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (board) => {
                this.board.set(board);
                this.loading.set(false);
            },
            error: (err) => {
                this.loading.set(false);
                this.error.set(true);
                this.explain(err);
            }
        });
    }
    changeClassroom(classroomId) {
        this.classroomFilter.set(classroomId);
        this.load();
    }
    changeSubject(subjectId) {
        this.subjectFilter.set(subjectId);
        this.load();
    }
    // ------------------------------------------------------------- les vues
    /** Ce que montre l'onglet courant. Les compteurs, eux, ne bougent jamais. */
    visible = computed(() => {
        const all = this.board()?.assessments ?? [];
        switch (this.tab()) {
            case 'CORRECTION':
                return all.filter((a) => a.status === 'OPEN' || a.status === 'GRADING'
                    || a.status === 'PLANNED');
            case 'VALIDATION':
                return all.filter((a) => a.status === 'SUBMITTED' || a.status === 'VALIDATED');
            default:
                return all;
        }
    });
    /** Copies passées depuis plus d'une semaine sans une seule note saisie. */
    overdue = computed(() => {
        const today = isoToday();
        return (this.board()?.assessments ?? []).filter((a) => (a.status === 'OPEN' || a.status === 'GRADING')
            && a.gradedCount === 0
            && daysBetween(a.assessmentDate, today) >= 7);
    });
    stateOf(status) {
        return this.states.find((s) => s.code === status) ?? this.states[0];
    }
    progressOf(item) {
        return item.studentCount > 0
            ? Math.round((item.gradedCount * 100) / item.studentCount)
            : 0;
    }
    // -------------------------------------------------------- le formulaire
    openForm(item) {
        this.editing.set(item ?? null);
        this.assessmentForm.reset({
            classroomId: item?.classroomId ?? this.classroomFilter() ?? '',
            subjectId: item?.subjectId ?? '',
            teacherId: item?.teacherId ?? '',
            title: item?.title ?? '',
            assessmentType: item?.assessmentType ?? 'TEST',
            assessmentDate: item?.assessmentDate ?? isoToday(),
            durationMinutes: item?.durationMinutes ?? 120,
            maxScore: item?.maxScore ?? 20,
            coefficient: item?.coefficient ?? 2,
            countsForAverage: item?.countsForAverage ?? true
        });
        this.formOpen.set(true);
    }
    closeForm() {
        this.formOpen.set(false);
        this.editing.set(null);
    }
    /** Le barème est verrouillé dès qu'une note existe : le champ le dit. */
    scaleLocked = computed(() => {
        const item = this.editing();
        return item !== null && item.gradedCount > 0;
    });
    submitForm() {
        if (this.assessmentForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.assessmentForm.getRawValue();
        const payload = {
            classroomId: value.classroomId,
            subjectId: value.subjectId,
            teacherId: value.teacherId,
            title: value.title.trim(),
            assessmentType: value.assessmentType,
            assessmentDate: value.assessmentDate,
            durationMinutes: value.durationMinutes || undefined,
            maxScore: value.maxScore,
            coefficient: value.coefficient,
            countsForAverage: value.countsForAverage
        };
        const item = this.editing();
        const request = item
            ? this.dataSource.updateAssessment(item.id, payload)
            : this.dataSource.createAssessment(payload);
        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (saved) => {
                this.saving.set(false);
                this.closeForm();
                this.load();
                this.notifications.success(item
                    ? `${saved.title} est à jour.`
                    : `${saved.title} est annoncé en ${saved.classroomName} pour le `
                        + `${formatDay(saved.assessmentDate)}.`, item ? 'Devoir modifié' : 'Devoir planifié');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // -------------------------------------------------------- le cycle de vie
    advance(item, target, message) {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.changeStatus(item.id, target)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.saving.set(false);
                this.load();
                this.notifications.success(message, item.title);
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    openEntry(item) {
        this.advance(item, 'OPEN', 'La saisie est ouverte : la feuille contient la liste réelle des inscrits.');
    }
    cancel(item) {
        this.advance(item, 'CANCELLED', "Le devoir est annulé. Il ne compte nulle part et n'apparaît plus dans le tableau.");
    }
    // ------------------------------------------------------ la feuille de notes
    openSheet(item) {
        this.sheetDirty.set(false);
        this.dataSource.gradeSheet(item.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (sheet) => this.sheet.set(sheet),
            error: (err) => this.explain(err)
        });
    }
    closeSheet() {
        this.sheet.set(null);
        this.sheetDirty.set(false);
        this.correcting.set(null);
        this.importPreview.set(null);
    }
    setScore(studentId, raw) {
        const sheet = this.sheet();
        if (!sheet) {
            return;
        }
        const trimmed = raw.trim();
        // Une case vidée n'est pas un zéro : elle redevient « pas encore corrigé ».
        const score = trimmed === '' ? undefined : Number(trimmed.replace(',', '.'));
        if (score !== undefined && (!Number.isFinite(score) || score < 0
            || score > sheet.assessment.maxScore)) {
            this.notifications.error(`La note doit être comprise entre 0 et ${sheet.assessment.maxScore}.`, 'Note hors barème');
            return;
        }
        this.patchRow(studentId, { score, absent: false });
    }
    /** Marquer absent efface la note : une absence n'est pas un zéro. */
    toggleAbsent(studentId, absent) {
        this.patchRow(studentId, { absent, score: undefined });
    }
    toggleExempted(studentId, exempted) {
        this.patchRow(studentId, { exempted, score: undefined });
    }
    patchRow(studentId, patch) {
        this.sheetDirty.set(true);
        this.sheet.update((current) => current === null ? current : {
            ...current,
            rows: current.rows.map((row) => row.studentId === studentId
                ? { ...row, ...patch }
                : row)
        });
    }
    /** Le compte de la feuille ouverte, recalculé à chaque saisie. */
    sheetCounters = computed(() => {
        const sheet = this.sheet();
        const rows = sheet?.rows ?? [];
        const scored = rows.filter((r) => !r.absent && !r.exempted && r.score !== undefined);
        const scores = scored.map((r) => r.score);
        const half = (sheet?.assessment.maxScore ?? 20) / 2;
        return {
            total: rows.length,
            scored: scored.length,
            absent: rows.filter((r) => r.absent).length,
            exempted: rows.filter((r) => r.exempted).length,
            missing: rows.filter((r) => !r.absent && !r.exempted && r.score === undefined).length,
            passed: scores.filter((s) => s >= half).length,
            average: scores.length > 0
                ? Math.round((scores.reduce((sum, s) => sum + s, 0) / scores.length) * 100) / 100
                : undefined
        };
    });
    saveSheet() {
        const sheet = this.sheet();
        if (!sheet || this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.saveGrades(sheet.assessment.id, sheet.rows.map((row) => ({
            studentId: row.studentId,
            score: row.score,
            absent: row.absent,
            exempted: row.exempted,
            comment: row.comment
        }))).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (saved) => {
                this.sheet.set(saved);
                this.sheetDirty.set(false);
                this.saving.set(false);
                this.load();
                this.notifications.success(`${this.sheetCounters().scored} note(s) enregistrée(s). Rien n'est encore `
                    + 'transmis : la correction peut reprendre plus tard.', 'Notes enregistrées');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    submitSheet() {
        const sheet = this.sheet();
        if (!sheet || this.saving()) {
            return;
        }
        if (this.sheetCounters().missing > 0) {
            this.notifications.error(`${this.sheetCounters().missing} élève(s) n'ont ni note ni absence. Une note `
                + "manquante ne se voit pas dans une moyenne : l'élève pèse simplement moins.", 'Feuille incomplète');
            return;
        }
        this.runOnSheet(() => this.dataSource.submitGrades(sheet.assessment.id), 'Notes transmises. Elles attendent la relecture de l\'administration.');
    }
    validateSheet() {
        const sheet = this.sheet();
        if (!sheet) {
            return;
        }
        this.runOnSheet(() => this.dataSource.validateGrades(sheet.assessment.id), 'Notes validées : elles comptent désormais dans les moyennes. Les familles ne '
            + 'les voient pas encore.');
    }
    publishSheet() {
        const sheet = this.sheet();
        if (!sheet) {
            return;
        }
        this.runOnSheet(() => this.dataSource.publishGrades(sheet.assessment.id), 'Notes publiées. Toute correction exigera désormais un motif écrit.');
    }
    runOnSheet(action, message) {
        this.saving.set(true);
        action().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (saved) => {
                this.sheet.set(saved);
                this.sheetDirty.set(false);
                this.saving.set(false);
                this.load();
                this.notifications.success(message, saved.assessment.title);
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ------------------------------------------------ export et import
    /** Le classeur part avec la classe déjà remplie : rien à recopier. */
    exportSheet() {
        const sheet = this.sheet();
        if (!sheet) {
            return;
        }
        this.files.export(sheet);
        this.notifications.success('Le classeur est téléchargé. Les notes se saisissent hors ligne, puis le '
            + 'fichier revient ici par « Importer ».', 'Feuille exportée');
    }
    /**
     * Lit le fichier rendu et décrit ce qu'il changerait. Rien n'est écrit ici.
     */
    async onFileChosen(event) {
        const input = event.target;
        const file = input.files?.[0];
        const sheet = this.sheet();
        if (!file || !sheet) {
            return;
        }
        this.analysing.set(true);
        try {
            this.importPreview.set(await this.files.analyse(file, sheet));
        }
        finally {
            this.analysing.set(false);
            // Sans cela, redéposer le même fichier après correction ne déclenche rien.
            input.value = '';
        }
    }
    closeImport() {
        this.importPreview.set(null);
    }
    /** N'applique que les lignes acceptées ; les autres restent en l'état. */
    applyImport() {
        const preview = this.importPreview();
        const sheet = this.sheet();
        if (!preview || !sheet || !preview.importable || this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.saveGrades(sheet.assessment.id, this.files.toEntries(preview, sheet))
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (saved) => {
                this.sheet.set(saved);
                this.sheetDirty.set(false);
                this.importPreview.set(null);
                this.saving.set(false);
                this.load();
                const ignored = preview.invalidRows + preview.unknownRows + preview.lockedRows;
                this.notifications.success(`${preview.changedRows} note(s) reprises du fichier.`
                    + (ignored > 0 ? ` ${ignored} ligne(s) laissées en l'état.` : ''), 'Notes importées');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ------------------------------------------------------ la correction
    openCorrection(row) {
        this.correcting.set(row);
        this.correctionForm.reset({
            score: row.score ?? 0,
            absent: row.absent,
            justification: ''
        });
    }
    closeCorrection() {
        this.correcting.set(null);
    }
    submitCorrection() {
        const row = this.correcting();
        if (!row || !row.id || this.correctionForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.correctionForm.getRawValue();
        this.dataSource.correctGrade(row.id, {
            score: value.absent ? undefined : value.score,
            absent: value.absent,
            justification: value.justification.trim()
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (saved) => {
                this.sheet.set(saved);
                this.correcting.set(null);
                this.saving.set(false);
                this.load();
                this.notifications.success(`La note de ${row.studentName} est corrigée. L'ancienne valeur et le motif `
                    + 'sont conservés.', 'Correction enregistrée');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ------------------------------------------------------------- affichage
    formatDate(iso) {
        return formatDay(iso);
    }
    formatScore(value, scale) {
        if (value === undefined || value === null) {
            return '—';
        }
        return scale ? `${trim(value)}/${trim(scale)}` : trim(value);
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
    static ɵfac = function AssessmentsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AssessmentsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AssessmentsComponent, selectors: [["eduops-assessments"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 25, vars: 26, consts: [[1, "page"], ["flow", "assessments", "eyebrow", "Conseil pour cet onglet", 3, "stepKey", "stepNumber", "totalSteps", "title", "description", "points", "ctaLabel"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], ["role", "tablist", 1, "tabs"], ["type", "button", "role", "tab", 1, "tabs__item", 3, "click"], ["message", "Chargement des devoirs..."], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], [1, "tabs__badge", "numeric"], [3, "retry"], ["role", "status", 1, "alert-block"], [1, "stats"], [1, "filters"], [1, "filters__select"], [1, "visually-hidden"], [1, "input", 3, "change", "value"], ["value", ""], [3, "value"], [1, "grid", "grid--3"], [1, "paper", "card", 3, "--paper-color"], [1, "empty-state"], [1, "alert-block__head"], ["aria-hidden", "true", 1, "alert-block__icon"], [1, "alert-block__title"], [1, "alert-block__text"], [1, "pending"], [1, "pending__item"], [1, "pending__name"], [1, "pending__cycle", "numeric"], ["type", "button", 1, "btn", "btn--primary", "btn--sm", 3, "click"], [1, "stat"], [1, "stat__label"], [1, "stat__value", "numeric"], [1, "stat__note"], [1, "stat", "stat--doing"], [1, "stat", "stat--done"], [1, "paper", "card"], [1, "paper__head"], [1, "paper__title"], [1, "paper__name"], [1, "paper__meta", "numeric"], [1, "state"], [1, "paper__body"], [1, "paper__scale", "numeric"], [1, "pill", "pill--muted"], [1, "paper__teacher"], [1, "paper__progress", "paper__progress--none"], [1, "progress"], [1, "paper__footer"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm"], [1, "progress__bar"], [1, "progress__fill"], [1, "progress__label", "numeric"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--primary", "btn--sm", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], [1, "empty-state__title"], [1, "empty-state__text"], ["type", "button", 1, "btn", "btn--primary"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "paper-form-title", 1, "drawer"], [1, "drawer__head"], ["id", "paper-form-title", 1, "drawer__title"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "drawer__body", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "paper-title", 1, "field__label", "field__label--required"], ["id", "paper-title", "formControlName", "title", "placeholder", "Devoir surveill\u00E9 n\u00B02 \u2014 \u00E9quations", 1, "input"], [1, "grid2"], ["for", "paper-class", 1, "field__label", "field__label--required"], ["id", "paper-class", "formControlName", "classroomId", 1, "input"], ["for", "paper-subject", 1, "field__label", "field__label--required"], ["id", "paper-subject", "formControlName", "subjectId", 1, "input"], [1, "field__hint"], ["for", "paper-teacher", 1, "field__label", "field__label--required"], ["id", "paper-teacher", "formControlName", "teacherId", 1, "input"], ["for", "paper-type", 1, "field__label", "field__label--required"], ["id", "paper-type", "formControlName", "assessmentType", 1, "input"], ["for", "paper-date", 1, "field__label", "field__label--required"], ["id", "paper-date", "type", "date", "formControlName", "assessmentDate", 1, "input"], ["for", "paper-scale", 1, "field__label", "field__label--required"], ["id", "paper-scale", "type", "number", "formControlName", "maxScore", "min", "1", "max", "1000", "step", "1", 1, "input"], [1, "field__hint", "field__hint--lock"], ["for", "paper-coef", 1, "field__label", "field__label--required"], ["id", "paper-coef", "type", "number", "formControlName", "coefficient", "min", "0.5", "max", "100", "step", "0.5", 1, "input"], ["for", "paper-duration", 1, "field__label"], ["id", "paper-duration", "type", "number", "formControlName", "durationMinutes", "min", "5", "max", "600", "step", "5", 1, "input"], [1, "switch"], ["type", "checkbox", "formControlName", "countsForAverage"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "sheet-title", 1, "drawer", "drawer--wide"], ["id", "sheet-title", 1, "drawer__title"], [1, "drawer__meta", "numeric"], [1, "sheet-counters", "numeric"], [1, "sheet-counters__item"], [1, "sheet-counters__item", "sheet-counters__item--absent"], [1, "sheet-counters__item", "sheet-counters__item--missing"], [1, "sheet-counters__files"], [1, "btn", "btn--ghost", "btn--sm", "file-button"], [1, "distribution"], [1, "drawer__body"], [1, "marks"], [1, "marks__item", 3, "marks__item--absent", "marks__item--missing"], [1, "drawer__warning"], ["type", "button", 1, "btn", "btn--secondary"], ["type", "file", "accept", ".xlsx,.xlsm,.csv,.tsv,.txt", 3, "change", "disabled"], [1, "distribution__title"], [1, "distribution__list", "numeric"], [1, "distribution__hint"], [1, "marks__item"], [1, "marks__identity"], [1, "marks__name"], [1, "marks__number", "numeric"], [1, "marks__entry"], [1, "marks__score"], ["type", "number", "min", "0", "step", "0.25", 1, "input", "input--score", 3, "change", "value", "disabled", "max"], [1, "marks__scale", "numeric"], [1, "marks__flag"], ["type", "checkbox", 3, "change", "checked"], [1, "marks__value", "numeric"], [1, "pill", "pill--warn"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "import-title", 1, "drawer", "drawer--wide"], ["id", "import-title", 1, "drawer__title"], [1, "hint-block", "hint-block--inset"], [1, "diff"], [1, "diff__item"], [1, "diff__empty"], [1, "diff__identity"], [1, "diff__name"], [1, "diff__number", "numeric"], [1, "diff__change", "numeric"], [1, "muted"], [1, "diff__refused"], [1, "diff__notes"], [1, "diff__before"], ["aria-hidden", "true", 1, "diff__arrow"], [1, "diff__after"], [1, "diff__note", "diff__note--error"], [1, "diff__note"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "correction-title", 1, "drawer"], ["id", "correction-title", 1, "drawer__title"], [1, "drawer__meta"], [1, "hint-block"], ["for", "correction-score", 1, "field__label", "field__label--required"], ["id", "correction-score", "type", "number", "formControlName", "score", "min", "0", "step", "0.25", 1, "input"], ["type", "checkbox", "formControlName", "absent"], ["for", "correction-why", 1, "field__label", "field__label--required"], ["id", "correction-why", "formControlName", "justification", "placeholder", "Erreur d'addition sur la copie, exercice 3 recompt\u00E9", 1, "input"]], template: function AssessmentsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "eduops-step-coachmark", 1);
            i0.ɵɵelementStart(2, "header", 2)(3, "div")(4, "h1", 3);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 4);
            i0.ɵɵtemplate(7, AssessmentsComponent_Conditional_7_Template, 3, 3);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(8, AssessmentsComponent_Conditional_8_Template, 5, 0, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "nav", 6)(10, "button", 7);
            i0.ɵɵlistener("click", function AssessmentsComponent_Template_button_click_10_listener() { return ctx.changeTab("PLANNING"); });
            i0.ɵɵtext(11, " Tous les devoirs ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "button", 7);
            i0.ɵɵlistener("click", function AssessmentsComponent_Template_button_click_12_listener() { return ctx.changeTab("CORRECTION"); });
            i0.ɵɵtext(13, " Corrections en cours ");
            i0.ɵɵtemplate(14, AssessmentsComponent_Conditional_14_Template, 1, 1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "button", 7);
            i0.ɵɵlistener("click", function AssessmentsComponent_Template_button_click_15_listener() { return ctx.changeTab("VALIDATION"); });
            i0.ɵɵtext(16, " \u00C0 valider et publier ");
            i0.ɵɵtemplate(17, AssessmentsComponent_Conditional_17_Template, 1, 1);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(18, AssessmentsComponent_Conditional_18_Template, 1, 0, "eduops-loading-state", 8)(19, AssessmentsComponent_Conditional_19_Template, 1, 0, "eduops-error-state")(20, AssessmentsComponent_Conditional_20_Template, 23, 5)(21, AssessmentsComponent_Conditional_21_Template, 79, 6)(22, AssessmentsComponent_Conditional_22_Template, 40, 13)(23, AssessmentsComponent_Conditional_23_Template, 32, 9)(24, AssessmentsComponent_Conditional_24_Template, 34, 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_8_0;
            let tmp_14_0;
            let tmp_17_0;
            let tmp_20_0;
            let tmp_21_0;
            let tmp_22_0;
            i0.ɵɵadvance();
            i0.ɵɵproperty("stepKey", ctx.tab())("stepNumber", ctx.helpCopy().step)("totalSteps", ctx.totalSteps)("title", ctx.helpCopy().title)("description", ctx.helpCopy().description)("points", ctx.helpCopy().points)("ctaLabel", ctx.helpCopy().ctaLabel);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.pageTitle);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional((tmp_8_0 = ctx.board()) ? 7 : -1, tmp_8_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.gradesEntryPoint ? 8 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "PLANNING");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "PLANNING");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "CORRECTION");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "CORRECTION");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional((tmp_14_0 = ctx.board()) ? 14 : -1, tmp_14_0);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "VALIDATION");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "VALIDATION");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional((tmp_17_0 = ctx.board()) ? 17 : -1, tmp_17_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 18 : ctx.error() ? 19 : 20);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.formOpen() ? 21 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_20_0 = ctx.sheet()) ? 22 : -1, tmp_20_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_21_0 = ctx.importPreview()) ? 23 : -1, tmp_21_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_22_0 = ctx.correcting()) ? 24 : -1, tmp_22_0);
        } }, dependencies: [CommonModule, FormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.MaxValidator, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName, LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent], styles: ["@import 'styles/tokens';\n\n\n\n\n.tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n\n\n\n.pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-badge);\n  white-space: nowrap;\n\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n  &--muted { color: var(--text-muted); background: var(--surface-sunken); }\n}\n\n\n\n\n\n\n.state[_ngcontent-%COMP%] {\n  display: inline-block;\n  flex: none;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='todo'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='doing'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='review'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='done'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='off'] { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n\n\n\n.stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));\n  gap: var(--space-4);\n  margin-bottom: var(--space-5);\n}\n\n.stat[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 3px solid var(--border-strong);\n  border-radius: var(--radius-card);\n\n  &__label { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n  &__value { margin: 2px 0; font-size: var(--text-2xl); color: var(--text-strong); }\n  &__note { margin: 0; font-size: var(--text-xs); color: var(--text-light); }\n\n  &--doing { border-left-color: var(--warning); }\n  &--done { border-left-color: var(--success); }\n  &--alert { border-left-color: var(--danger); background: var(--danger-bg); }\n}\n\n\n\n\n.alert-block[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 22px;\n    height: 22px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-4) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n    flex-wrap: wrap;\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-3);\n  margin-bottom: var(--space-5);\n\n  &__select .input { width: auto; }\n}\n\n\n\n\n.paper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  border-top: 3px solid var(--paper-color, var(--brand));\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4);\n  }\n\n  &__title { min-width: 0; }\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__body {\n    flex: 1;\n    padding: 0 var(--space-4) var(--space-3);\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-2);\n  }\n\n  &__scale {\n    margin: 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex-wrap: wrap;\n  }\n\n  &__teacher { margin: 0; font-size: var(--text-sm); color: var(--text-normal); }\n\n  &__progress--none {\n    margin: 0;\n    font-size: var(--text-sm);\n    font-style: italic;\n    color: var(--text-light);\n  }\n\n  &__footer {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-3) var(--space-4);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n.progress[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n\n  &__bar {\n    height: 6px;\n    background: var(--surface-sunken);\n    border-radius: var(--radius-pill);\n    overflow: hidden;\n  }\n\n  &__fill {\n    display: block;\n    height: 100%;\n    background: var(--paper-color, var(--brand));\n    border-radius: var(--radius-pill);\n  }\n\n  &__label { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n  width: min(460px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &--wide { width: min(640px, 100vw); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__close {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border-light);\n  }\n\n  &__warning {\n    flex: 1;\n    margin: 0;\n    font-size: var(--text-xs);\n    color: var(--warning);\n  }\n}\n\n.grid2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n}\n\n.field__hint--lock[_ngcontent-%COMP%] { color: var(--warning); }\n\n.switch[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n  font-size: var(--text-sm);\n  cursor: pointer;\n\n  input { margin-top: 3px; }\n  small { display: block; margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n\n\n\n.sheet-counters[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  flex-wrap: wrap;\n\n  &__item strong { color: var(--text-strong); }\n  &__item--absent strong { color: var(--warning); }\n  &__item--missing strong { color: var(--danger); }\n}\n\n.distribution[_ngcontent-%COMP%] {\n  padding: var(--space-4) var(--space-5);\n  border-bottom: 1px solid var(--border-light);\n\n  &__title { margin: 0 0 var(--space-2); font-weight: 600; color: var(--text-strong); }\n\n  &__list {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n    gap: var(--space-3);\n    margin: 0;\n    padding: 0;\n    list-style: none;\n\n    li { display: flex; flex-direction: column; }\n    span { font-size: var(--text-xs); color: var(--text-muted); }\n    strong { color: var(--text-strong); }\n  }\n\n  &__hint {\n    margin: var(--space-3) 0 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n}\n\n.marks[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    border-left: 3px solid transparent;\n    border-radius: var(--radius-input);\n\n    &--absent { background: var(--warning-bg); border-left-color: var(--warning); }\n    &--missing { background: var(--danger-bg); border-left-color: var(--danger); }\n  }\n\n  &__identity { display: flex; flex-direction: column; min-width: 0; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__number { font-size: var(--text-xs); color: var(--text-light); }\n\n  &__entry {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    flex: none;\n  }\n\n  &__scale { font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__flag {\n    display: flex;\n    align-items: center;\n    gap: 4px;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    cursor: pointer;\n  }\n\n  &__value { min-width: 70px; text-align: right; color: var(--text-strong); }\n}\n\n.input--score[_ngcontent-%COMP%] {\n  width: 78px;\n  padding: 4px var(--space-2);\n  text-align: right;\n}\n\n\n\n\n.sheet-counters__files[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-2);\n  margin-left: auto;\n}\n\n\n\n.file-button[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  overflow: hidden;\n  cursor: pointer;\n\n  input {\n    position: absolute;\n    inset: 0;\n    opacity: 0;\n    cursor: pointer;\n  }\n\n  input:disabled { cursor: not-allowed; }\n}\n\n.hint-block--inset[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 0;\n  border-bottom: 1px solid var(--border-light);\n}\n\n.muted[_ngcontent-%COMP%] { color: var(--text-muted); }\n\n.diff[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: grid;\n    grid-template-columns: 1fr auto;\n    gap: var(--space-2) var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    border-left: 3px solid transparent;\n    border-radius: var(--radius-input);\n    background: var(--surface-sunken);\n\n    &[data-status='CHANGED'] {\n      background: var(--brand-tint);\n      border-left-color: var(--brand);\n    }\n\n    &[data-status='UNCHANGED'] { background: transparent; }\n\n    &[data-status='INVALID'],\n    &[data-status='UNKNOWN'],\n    &[data-status='DUPLICATE'] {\n      background: var(--danger-bg);\n      border-left-color: var(--danger);\n    }\n\n    &[data-status='LOCKED'] {\n      background: var(--warning-bg);\n      border-left-color: var(--warning);\n    }\n  }\n\n  &__identity { display: flex; flex-direction: column; min-width: 0; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__number { font-size: var(--text-xs); color: var(--text-light); }\n\n  &__change {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    white-space: nowrap;\n  }\n\n  &__before { color: var(--text-muted); text-decoration: line-through; }\n  &__arrow { color: var(--text-light); }\n  &__after { font-weight: 700; color: var(--text-strong); }\n  &__refused { font-size: var(--text-xs); font-weight: 600; color: var(--danger); }\n\n  &__notes {\n    grid-column: 1 / -1;\n    margin: 0;\n    padding-left: var(--space-4);\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n\n  &__note--error { color: var(--danger); }\n\n  &__empty {\n    padding: var(--space-8);\n    text-align: center;\n    color: var(--text-muted);\n  }\n}\n\n@include mobile {\n  .drawer,\n  .drawer--wide { width: 100vw; }\n\n  .marks__item { flex-direction: column; align-items: flex-start; }\n  .paper__footer { flex-wrap: wrap; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AssessmentsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-assessments', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule,
                    LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n\n  <!-- L'aide de la configuration, appliqu\u00E9e telle quelle : une carte au premier\n       passage sur l'onglet, un bouton \u00AB ? Aide \u00BB pour la revoir ensuite. -->\n  <eduops-step-coachmark\n    flow=\"assessments\"\n    [stepKey]=\"tab()\"\n    [stepNumber]=\"helpCopy().step\"\n    [totalSteps]=\"totalSteps\"\n    eyebrow=\"Conseil pour cet onglet\"\n    [title]=\"helpCopy().title\"\n    [description]=\"helpCopy().description\"\n    [points]=\"helpCopy().points\"\n    [ctaLabel]=\"helpCopy().ctaLabel\" />\n\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">{{ pageTitle }}</h1>\n      <p class=\"page__meta numeric\">\n        @if (board(); as b) {\n          {{ b.total }} devoir(s)\n          @if (b.termName) { \u00B7 {{ b.termName }} }\n          @if (b.awaitingValidationCount > 0) {\n            \u00B7 {{ b.awaitingValidationCount }} \u00E0 valider\n          }\n        }\n      </p>\n    </div>\n    @if (!gradesEntryPoint) {\n      <div class=\"page__actions\">\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openForm()\">\n          <span aria-hidden=\"true\">+</span> Nouveau devoir\n        </button>\n      </div>\n    }\n  </header>\n\n  <nav class=\"tabs\" role=\"tablist\">\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'PLANNING'\"\n            [attr.aria-selected]=\"tab() === 'PLANNING'\"\n            (click)=\"changeTab('PLANNING')\">\n      Tous les devoirs\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'CORRECTION'\"\n            [attr.aria-selected]=\"tab() === 'CORRECTION'\"\n            (click)=\"changeTab('CORRECTION')\">\n      Corrections en cours\n      @if (board(); as b) {\n        @if (b.gradingCount > 0) {\n          <span class=\"tabs__badge numeric\">{{ b.gradingCount }}</span>\n        }\n      }\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'VALIDATION'\"\n            [attr.aria-selected]=\"tab() === 'VALIDATION'\"\n            (click)=\"changeTab('VALIDATION')\">\n      \u00C0 valider et publier\n      @if (board(); as b) {\n        @if (b.awaitingValidationCount > 0) {\n          <span class=\"tabs__badge numeric\">{{ b.awaitingValidationCount }}</span>\n        }\n      }\n    </button>\n  </nav>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des devoirs...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n\n    @if (overdue().length > 0) {\n      <section class=\"alert-block\" role=\"status\">\n        <div class=\"alert-block__head\">\n          <span class=\"alert-block__icon\" aria-hidden=\"true\">!</span>\n          <div>\n            <p class=\"alert-block__title\">\n              {{ overdue().length }} devoir(s) pass\u00E9s sans une seule note saisie\n            </p>\n            <p class=\"alert-block__text\">\n              Pass\u00E9 une semaine, une copie non rendue ne se rattrape plus dans le\n              trimestre : la note manquera au bulletin sans que rien ne le signale.\n            </p>\n          </div>\n        </div>\n        <ul class=\"pending\">\n          @for (item of overdue(); track item.id) {\n            <li class=\"pending__item\">\n              <span class=\"pending__name\">{{ item.title }}</span>\n              <span class=\"pending__cycle numeric\">\n                {{ item.classroomName }} \u00B7 {{ item.subjectName }} \u00B7\n                {{ formatDate(item.assessmentDate) }} \u00B7 {{ item.teacherName }}\n              </span>\n              <button type=\"button\" class=\"btn btn--primary btn--sm\"\n                      (click)=\"openSheet(item)\">Saisir les notes</button>\n            </li>\n          }\n        </ul>\n      </section>\n    }\n\n    @if (board(); as b) {\n      <section class=\"stats\">\n        <article class=\"stat\">\n          <p class=\"stat__label\">Annonc\u00E9s</p>\n          <p class=\"stat__value numeric\">{{ b.plannedCount }}</p>\n          <p class=\"stat__note\">Pas encore pass\u00E9s</p>\n        </article>\n        <article class=\"stat stat--doing\">\n          <p class=\"stat__label\">En correction</p>\n          <p class=\"stat__value numeric\">{{ b.gradingCount }}</p>\n          <p class=\"stat__note\">Copies pass\u00E9es, notes en cours</p>\n        </article>\n        <article class=\"stat\" [class.stat--alert]=\"b.awaitingValidationCount > 0\">\n          <p class=\"stat__label\">\u00C0 valider</p>\n          <p class=\"stat__value numeric\">{{ b.awaitingValidationCount }}</p>\n          <p class=\"stat__note\">Notes rendues, en attente de relecture</p>\n        </article>\n        <article class=\"stat stat--done\">\n          <p class=\"stat__label\">Publi\u00E9s</p>\n          <p class=\"stat__value numeric\">{{ b.publishedCount }}</p>\n          <p class=\"stat__note\">{{ b.awaitingPublicationCount }} valid\u00E9(s) non publi\u00E9(s)</p>\n        </article>\n      </section>\n    }\n\n    <section class=\"filters\">\n      <label class=\"filters__select\">\n        <span class=\"visually-hidden\">Filtrer par classe</span>\n        <select class=\"input\" [value]=\"classroomFilter()\"\n                (change)=\"changeClassroom($any($event.target).value)\">\n          <option value=\"\">Toutes les classes</option>\n          @for (classroom of classroomList(); track classroom.id) {\n            <option [value]=\"classroom.id\">{{ classroom.name }}</option>\n          }\n        </select>\n      </label>\n      <label class=\"filters__select\">\n        <span class=\"visually-hidden\">Filtrer par mati\u00E8re</span>\n        <select class=\"input\" [value]=\"subjectFilter()\"\n                (change)=\"changeSubject($any($event.target).value)\">\n          <option value=\"\">Toutes les mati\u00E8res</option>\n          @for (subject of subjectList(); track subject.id) {\n            <option [value]=\"subject.id\">{{ subject.name }}</option>\n          }\n        </select>\n      </label>\n    </section>\n\n    <section class=\"grid grid--3\">\n      @for (item of visible(); track item.id) {\n        <article class=\"paper card\"\n                 [attr.data-tone]=\"stateOf(item.status).tone\"\n                 [style.--paper-color]=\"item.subjectColor || 'var(--brand)'\">\n          <header class=\"paper__head\">\n            <div class=\"paper__title\">\n              <h2 class=\"paper__name\">{{ item.title }}</h2>\n              <p class=\"paper__meta numeric\">\n                {{ item.classroomName }} \u00B7 {{ item.subjectName }} \u00B7\n                {{ formatDate(item.assessmentDate) }}\n              </p>\n            </div>\n            <span class=\"state\" [attr.data-tone]=\"stateOf(item.status).tone\"\n                  [attr.title]=\"stateOf(item.status).hint\">{{ item.statusLabel }}</span>\n          </header>\n\n          <div class=\"paper__body\">\n            <p class=\"paper__scale numeric\">\n              {{ item.assessmentTypeLabel }} \u00B7 sur {{ item.maxScore }} \u00B7\n              coefficient {{ item.coefficient }}\n              @if (!item.countsForAverage) {\n                <span class=\"pill pill--muted\">Hors moyenne</span>\n              }\n            </p>\n            <p class=\"paper__teacher\">{{ item.teacherName }}</p>\n\n            @if (item.status === 'PLANNED' || item.status === 'DRAFT') {\n              <p class=\"paper__progress paper__progress--none\">\n                Aucune note attendue avant la date du devoir.\n              </p>\n            } @else {\n              <div class=\"progress\">\n                <div class=\"progress__bar\">\n                  <span class=\"progress__fill\" [style.width.%]=\"progressOf(item)\"></span>\n                </div>\n                <p class=\"progress__label numeric\">\n                  {{ item.gradedCount }} / {{ item.studentCount }} corrig\u00E9es\n                  @if (item.classAverage !== undefined) {\n                    \u00B7 moyenne {{ formatScore(item.classAverage, item.maxScore) }}\n                  }\n                </p>\n              </div>\n            }\n          </div>\n\n          <footer class=\"paper__footer\">\n            @if (item.status === 'PLANNED') {\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                      (click)=\"openForm(item)\">Modifier</button>\n              <button type=\"button\" class=\"btn btn--primary btn--sm\"\n                      [disabled]=\"saving()\" (click)=\"openEntry(item)\">\n                Ouvrir la saisie\n              </button>\n            } @else if (item.gradeEntryOpen) {\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                      (click)=\"openForm(item)\">Modifier</button>\n              <button type=\"button\" class=\"btn btn--primary btn--sm\"\n                      (click)=\"openSheet(item)\">Saisir les notes</button>\n            } @else {\n              <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                      (click)=\"openSheet(item)\">\n                {{ item.status === 'SUBMITTED' ? 'Relire et valider' : 'Voir les notes' }}\n              </button>\n            }\n          </footer>\n        </article>\n      } @empty {\n        <div class=\"empty-state\">\n          <p class=\"empty-state__title\">\n            @if (tab() === 'VALIDATION') {\n              Rien n'attend votre relecture.\n            } @else if (tab() === 'CORRECTION') {\n              Aucune correction en cours.\n            } @else {\n              Aucun devoir sur cette p\u00E9riode.\n            }\n          </p>\n          <p class=\"empty-state__text\">\n            @if (tab() === 'PLANNING') {\n              Un devoir se d\u00E9clare avant d'\u00EAtre corrig\u00E9 : c'est lui qui d\u00E9cide dans\n              quelle moyenne la note entrera, et avec quel poids.\n            } @else {\n              Les devoirs apparaissent ici d\u00E8s que leur saisie est ouverte.\n            }\n          </p>\n          @if (tab() === 'PLANNING') {\n            <button type=\"button\" class=\"btn btn--primary\" (click)=\"openForm()\">\n              Planifier un devoir\n            </button>\n          }\n        </div>\n      }\n    </section>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Formulaire du devoir \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (formOpen()) {\n    <div class=\"drawer-backdrop\" (click)=\"closeForm()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"paper-form-title\">\n      <header class=\"drawer__head\">\n        <h2 class=\"drawer__title\" id=\"paper-form-title\">\n          {{ editing() ? 'Modifier le devoir' : 'Nouveau devoir' }}\n        </h2>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeForm()\">\u00D7</button>\n      </header>\n\n      <form class=\"drawer__body\" [formGroup]=\"assessmentForm\" (ngSubmit)=\"submitForm()\">\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"paper-title\">Intitul\u00E9</label>\n          <input id=\"paper-title\" class=\"input\" formControlName=\"title\"\n                 placeholder=\"Devoir surveill\u00E9 n\u00B02 \u2014 \u00E9quations\" />\n        </div>\n\n        <div class=\"grid2\">\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"paper-class\">Classe</label>\n            <select id=\"paper-class\" class=\"input\" formControlName=\"classroomId\">\n              <option value=\"\">Choisir\u2026</option>\n              @for (classroom of classroomList(); track classroom.id) {\n                <option [value]=\"classroom.id\">{{ classroom.name }}</option>\n              }\n            </select>\n          </div>\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"paper-subject\">Mati\u00E8re</label>\n            <select id=\"paper-subject\" class=\"input\" formControlName=\"subjectId\">\n              <option value=\"\">Choisir\u2026</option>\n              @for (subject of subjectList(); track subject.id) {\n                <option [value]=\"subject.id\">{{ subject.name }}</option>\n              }\n            </select>\n            <span class=\"field__hint\">\n              Elle doit figurer au programme du niveau : sans coefficient, la note\n              n'entrerait dans aucune moyenne.\n            </span>\n          </div>\n        </div>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"paper-teacher\">\n            Enseignant correcteur\n          </label>\n          <select id=\"paper-teacher\" class=\"input\" formControlName=\"teacherId\">\n            <option value=\"\">Choisir\u2026</option>\n            @for (teacher of teacherList(); track teacher.id) {\n              <option [value]=\"teacher.id\">{{ teacher.fullName }}</option>\n            }\n          </select>\n          <span class=\"field__hint\">\n            Il doit \u00EAtre affect\u00E9 \u00E0 cette mati\u00E8re dans cette classe, sinon les notes\n            n'appara\u00EEtront sur aucun de ses \u00E9crans.\n          </span>\n        </div>\n\n        <div class=\"grid2\">\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"paper-type\">Type</label>\n            <select id=\"paper-type\" class=\"input\" formControlName=\"assessmentType\">\n              @for (type of types; track type.code) {\n                <option [value]=\"type.code\">{{ type.label }}</option>\n              }\n            </select>\n          </div>\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"paper-date\">Date</label>\n            <input id=\"paper-date\" type=\"date\" class=\"input\" formControlName=\"assessmentDate\" />\n            <span class=\"field__hint\">\n              Elle doit tomber dans la p\u00E9riode en cours.\n            </span>\n          </div>\n        </div>\n\n        <div class=\"grid2\">\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"paper-scale\">Bar\u00E8me</label>\n            <input id=\"paper-scale\" type=\"number\" class=\"input\" formControlName=\"maxScore\"\n                   min=\"1\" max=\"1000\" step=\"1\" [attr.disabled]=\"scaleLocked() ? '' : null\" />\n            @if (scaleLocked()) {\n              <span class=\"field__hint field__hint--lock\">\n                Fig\u00E9 : des notes ont d\u00E9j\u00E0 \u00E9t\u00E9 saisies sur ce bar\u00E8me. Le changer les\n                ferait toutes bouger sans que personne y touche.\n              </span>\n            }\n          </div>\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"paper-coef\">Coefficient</label>\n            <input id=\"paper-coef\" type=\"number\" class=\"input\" formControlName=\"coefficient\"\n                   min=\"0.5\" max=\"100\" step=\"0.5\" />\n          </div>\n        </div>\n\n        <div class=\"field\">\n          <label class=\"field__label\" for=\"paper-duration\">Dur\u00E9e (minutes)</label>\n          <input id=\"paper-duration\" type=\"number\" class=\"input\"\n                 formControlName=\"durationMinutes\" min=\"5\" max=\"600\" step=\"5\" />\n        </div>\n\n        <label class=\"switch\">\n          <input type=\"checkbox\" formControlName=\"countsForAverage\" />\n          <span>\n            Compte dans la moyenne\n            <small>D\u00E9cochez pour un devoir blanc : il est corrig\u00E9 et rendu, mais\n              n'entre dans aucune moyenne.</small>\n          </span>\n        </label>\n      </form>\n\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeForm()\">Annuler</button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"assessmentForm.invalid || saving()\"\n                (click)=\"submitForm()\">\n          {{ editing() ? 'Enregistrer' : 'Planifier' }}\n        </button>\n      </footer>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Feuille de notes \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (sheet(); as s) {\n    <div class=\"drawer-backdrop\" (click)=\"closeSheet()\"></div>\n    <aside class=\"drawer drawer--wide\" role=\"dialog\" aria-modal=\"true\"\n           aria-labelledby=\"sheet-title\">\n      <header class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"sheet-title\">{{ s.assessment.title }}</h2>\n          <p class=\"drawer__meta numeric\">\n            {{ s.assessment.classroomName }} \u00B7 {{ s.assessment.subjectName }} \u00B7\n            sur {{ s.assessment.maxScore }} \u00B7 {{ s.assessment.statusLabel }}\n          </p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeSheet()\">\u00D7</button>\n      </header>\n\n      <div class=\"sheet-counters numeric\">\n        <span class=\"sheet-counters__item\">\n          <strong>{{ sheetCounters().scored }}</strong> not\u00E9es\n        </span>\n        <span class=\"sheet-counters__item sheet-counters__item--absent\">\n          <strong>{{ sheetCounters().absent }}</strong> absents\n        </span>\n        <span class=\"sheet-counters__item sheet-counters__item--missing\">\n          <strong>{{ sheetCounters().missing }}</strong> sans note\n        </span>\n        @if (sheetCounters().average !== undefined) {\n          <span class=\"sheet-counters__item\">\n            moyenne <strong>{{ formatScore(sheetCounters().average, s.assessment.maxScore) }}</strong>\n          </span>\n        }\n\n        <span class=\"sheet-counters__files\">\n          <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"exportSheet()\">\n            Exporter\n          </button>\n          @if (s.assessment.gradeEntryOpen) {\n            <label class=\"btn btn--ghost btn--sm file-button\">\n              {{ analysing() ? 'Lecture\u2026' : 'Importer' }}\n              <input type=\"file\" accept=\".xlsx,.xlsm,.csv,.tsv,.txt\"\n                     [disabled]=\"analysing() || saving()\"\n                     (change)=\"onFileChosen($event)\" />\n            </label>\n          }\n        </span>\n      </div>\n\n      @if (!s.assessment.gradeEntryOpen) {\n        <div class=\"distribution\">\n          <p class=\"distribution__title\">Distribution de la classe</p>\n          <ul class=\"distribution__list numeric\">\n            <li><span>Moyenne</span>\n              <strong>{{ formatScore(s.classAverage, s.assessment.maxScore) }}</strong></li>\n            <li><span>M\u00E9diane</span>\n              <strong>{{ formatScore(s.median, s.assessment.maxScore) }}</strong></li>\n            <li><span>Extr\u00EAmes</span>\n              <strong>{{ formatScore(s.minScore) }} \u2014 {{ formatScore(s.maxScoreObtained) }}</strong></li>\n            <li><span>Ont la moyenne</span>\n              <strong>{{ s.passCount }} / {{ s.rows.length - s.absentCount - s.exemptedCount }}</strong></li>\n          </ul>\n          <p class=\"distribution__hint\">\n            Une copie o\u00F9 les deux tiers de la classe sont sous la moyenne est rarement\n            une mauvaise classe : c'est le plus souvent un sujet trop dur ou un bar\u00E8me\n            mal saisi. Cela se corrige avant la publication.\n          </p>\n        </div>\n      }\n\n      <div class=\"drawer__body\">\n        <ul class=\"marks\">\n          @for (row of s.rows; track row.studentId) {\n            <li class=\"marks__item\"\n                [class.marks__item--absent]=\"row.absent\"\n                [class.marks__item--missing]=\"!row.absent && !row.exempted && row.score === undefined\">\n              <div class=\"marks__identity\">\n                <span class=\"marks__name\">{{ row.studentName }}</span>\n                <span class=\"marks__number numeric\">\n                  {{ row.studentNumber }}\n                  @if (row.revisionCount > 0) {\n                    \u00B7 {{ row.revisionCount }} correction(s)\n                  }\n                </span>\n              </div>\n\n              <div class=\"marks__entry\">\n                @if (s.assessment.gradeEntryOpen) {\n                  <label class=\"marks__score\">\n                    <span class=\"visually-hidden\">Note de {{ row.studentName }}</span>\n                    <input type=\"number\" class=\"input input--score\"\n                           [value]=\"row.score ?? ''\"\n                           [disabled]=\"row.absent || row.exempted\"\n                           min=\"0\" [max]=\"s.assessment.maxScore\" step=\"0.25\"\n                           (change)=\"setScore(row.studentId, $any($event.target).value)\" />\n                  </label>\n                  <span class=\"marks__scale numeric\">/ {{ s.assessment.maxScore }}</span>\n\n                  <label class=\"marks__flag\">\n                    <input type=\"checkbox\" [checked]=\"row.absent\"\n                           (change)=\"toggleAbsent(row.studentId, $any($event.target).checked)\" />\n                    <span>Absent</span>\n                  </label>\n                  <label class=\"marks__flag\">\n                    <input type=\"checkbox\" [checked]=\"row.exempted\"\n                           (change)=\"toggleExempted(row.studentId, $any($event.target).checked)\" />\n                    <span>Dispens\u00E9</span>\n                  </label>\n                } @else {\n                  <span class=\"marks__value numeric\">\n                    @if (row.absent) {\n                      <span class=\"pill pill--warn\">Absent</span>\n                    } @else if (row.exempted) {\n                      <span class=\"pill pill--muted\">Dispens\u00E9</span>\n                    } @else {\n                      {{ formatScore(row.score, s.assessment.maxScore) }}\n                    }\n                  </span>\n                  @if (row.requiresJustifiedCorrection) {\n                    <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                            (click)=\"openCorrection(row)\">Corriger</button>\n                  }\n                }\n              </div>\n            </li>\n          }\n        </ul>\n      </div>\n\n      <footer class=\"drawer__foot\">\n        @if (sheetDirty()) {\n          <p class=\"drawer__warning\">Notes saisies, pas encore enregistr\u00E9es.</p>\n        } @else if (sheetCounters().missing > 0 && s.assessment.gradeEntryOpen) {\n          <p class=\"drawer__warning\">\n            {{ sheetCounters().missing }} \u00E9l\u00E8ve(s) sans note ni absence.\n          </p>\n        }\n\n        @if (s.assessment.gradeEntryOpen) {\n          <button type=\"button\" class=\"btn btn--secondary\"\n                  [disabled]=\"saving()\" (click)=\"saveSheet()\">Enregistrer</button>\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"saving() || sheetCounters().missing > 0\"\n                  (click)=\"submitSheet()\">Transmettre</button>\n        } @else if (s.assessment.status === 'SUBMITTED') {\n          <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeSheet()\">Fermer</button>\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"saving()\" (click)=\"validateSheet()\">Valider les notes</button>\n        } @else if (s.assessment.status === 'VALIDATED') {\n          <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeSheet()\">Fermer</button>\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"saving()\" (click)=\"publishSheet()\">Publier aux familles</button>\n        } @else {\n          <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeSheet()\">Fermer</button>\n        }\n      </footer>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 V\u00E9rification de l'import \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (importPreview(); as preview) {\n    <div class=\"drawer-backdrop\" (click)=\"closeImport()\"></div>\n    <aside class=\"drawer drawer--wide\" role=\"dialog\" aria-modal=\"true\"\n           aria-labelledby=\"import-title\">\n      <header class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"import-title\">Ce que le fichier changerait</h2>\n          <p class=\"drawer__meta numeric\">{{ preview.fileName }}</p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeImport()\">\u00D7</button>\n      </header>\n\n      <div class=\"sheet-counters numeric\">\n        <span class=\"sheet-counters__item\">\n          <strong>{{ preview.changedRows }}</strong> \u00E0 modifier\n        </span>\n        <span class=\"sheet-counters__item\">\n          <strong>{{ preview.unchangedRows }}</strong> inchang\u00E9es\n        </span>\n        @if (preview.invalidRows + preview.unknownRows + preview.lockedRows > 0) {\n          <span class=\"sheet-counters__item sheet-counters__item--missing\">\n            <strong>{{ preview.invalidRows + preview.unknownRows + preview.lockedRows }}</strong>\n            refus\u00E9es\n          </span>\n        }\n      </div>\n\n      @if (preview.missingStudents > 0) {\n        <p class=\"hint-block hint-block--inset\">\n          {{ preview.missingStudents }} \u00E9l\u00E8ve(s) de la classe ne figurent pas dans le\n          fichier. Leur note actuelle est conserv\u00E9e telle quelle : un fichier\n          incomplet n'efface rien.\n        </p>\n      }\n\n      <div class=\"drawer__body\">\n        <ul class=\"diff\">\n          @for (row of preview.rows; track row.rowNumber) {\n            <li class=\"diff__item\" [attr.data-status]=\"row.status\">\n              <div class=\"diff__identity\">\n                <span class=\"diff__name\">{{ row.studentName }}</span>\n                <span class=\"diff__number numeric\">\n                  ligne {{ row.rowNumber }}\n                  @if (row.studentNumber) { \u00B7 {{ row.studentNumber }} }\n                </span>\n              </div>\n\n              <div class=\"diff__change numeric\">\n                @if (row.status === 'CHANGED') {\n                  <span class=\"diff__before\">\n                    @if (row.currentAbsent) { Absent }\n                    @else if (row.currentScore !== undefined) { {{ formatScore(row.currentScore) }} }\n                    @else { \u2014 }\n                  </span>\n                  <span class=\"diff__arrow\" aria-hidden=\"true\">\u2192</span>\n                  <span class=\"diff__after\">\n                    @if (row.newAbsent) { Absent }\n                    @else if (row.newScore !== undefined) { {{ formatScore(row.newScore) }} }\n                    @else { \u2014 }\n                  </span>\n                } @else if (row.status === 'UNCHANGED') {\n                  <span class=\"muted\">Inchang\u00E9e</span>\n                } @else {\n                  <span class=\"diff__refused\">Refus\u00E9e</span>\n                }\n              </div>\n\n              @if (row.errors.length > 0 || row.warnings.length > 0) {\n                <ul class=\"diff__notes\">\n                  @for (message of row.errors; track message) {\n                    <li class=\"diff__note diff__note--error\">{{ message }}</li>\n                  }\n                  @for (message of row.warnings; track message) {\n                    <li class=\"diff__note\">{{ message }}</li>\n                  }\n                </ul>\n              }\n            </li>\n          } @empty {\n            <li class=\"diff__empty\">\n              Le fichier ne contient aucune ligne exploitable.\n            </li>\n          }\n        </ul>\n      </div>\n\n      <footer class=\"drawer__foot\">\n        @if (!preview.importable) {\n          <p class=\"drawer__warning\">Rien \u00E0 reprendre de ce fichier.</p>\n        }\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeImport()\">\n          Annuler\n        </button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"!preview.importable || saving()\"\n                (click)=\"applyImport()\">\n          Appliquer {{ preview.changedRows }} note(s)\n        </button>\n      </footer>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Correction justifi\u00E9e \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (correcting(); as row) {\n    <div class=\"drawer-backdrop\" (click)=\"closeCorrection()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"correction-title\">\n      <header class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"correction-title\">Corriger une note</h2>\n          <p class=\"drawer__meta\">{{ row.studentName }} \u2014 {{ row.statusLabel }}</p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeCorrection()\">\u00D7</button>\n      </header>\n\n      <form class=\"drawer__body\" [formGroup]=\"correctionForm\" (ngSubmit)=\"submitCorrection()\">\n        <p class=\"hint-block\">\n          L'ancienne valeur et le motif sont conserv\u00E9s. Sans cette trace, une note\n          corrig\u00E9e et une note trafiqu\u00E9e se ressemblent, et l'\u00E9l\u00E8ve n'a aucun moyen\n          de contester.\n        </p>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"correction-score\">\n            Nouvelle note\n          </label>\n          <input id=\"correction-score\" type=\"number\" class=\"input\" formControlName=\"score\"\n                 min=\"0\" step=\"0.25\" />\n        </div>\n\n        <label class=\"switch\">\n          <input type=\"checkbox\" formControlName=\"absent\" />\n          <span>\n            L'\u00E9l\u00E8ve \u00E9tait absent\n            <small>La note est effac\u00E9e. Une absence n'est pas un z\u00E9ro : elle ne\n              compte pas dans la moyenne.</small>\n          </span>\n        </label>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"correction-why\">\n            Pourquoi la note change\n          </label>\n          <input id=\"correction-why\" class=\"input\" formControlName=\"justification\"\n                 placeholder=\"Erreur d'addition sur la copie, exercice 3 recompt\u00E9\" />\n          <span class=\"field__hint\">\n            Ce texte est conserv\u00E9 avec l'ancienne valeur et reste consultable.\n          </span>\n        </div>\n      </form>\n\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeCorrection()\">\n          Annuler\n        </button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"correctionForm.invalid || saving()\"\n                (click)=\"submitCorrection()\">\n          Enregistrer la correction\n        </button>\n      </footer>\n    </aside>\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Onglets \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.tabs {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Pastilles et \u00E9tats \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.pill {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-badge);\n  white-space: nowrap;\n\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n  &--muted { color: var(--text-muted); background: var(--surface-sunken); }\n}\n\n/**\n * La couleur porte le sens : \u00AB \u00E0 valider \u00BB est du travail qui attend,\n * \u00AB publi\u00E9 \u00BB est du travail fini. Les deux ne doivent pas se ressembler.\n */\n.state {\n  display: inline-block;\n  flex: none;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='todo'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='doing'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='review'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='done'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='off'] { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Compteurs \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.stats {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));\n  gap: var(--space-4);\n  margin-bottom: var(--space-5);\n}\n\n.stat {\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 3px solid var(--border-strong);\n  border-radius: var(--radius-card);\n\n  &__label { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n  &__value { margin: 2px 0; font-size: var(--text-2xl); color: var(--text-strong); }\n  &__note { margin: 0; font-size: var(--text-xs); color: var(--text-light); }\n\n  &--doing { border-left-color: var(--warning); }\n  &--done { border-left-color: var(--success); }\n  &--alert { border-left-color: var(--danger); background: var(--danger-bg); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Ce qui est en retard \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.alert-block {\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 22px;\n    height: 22px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-4) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n    flex-wrap: wrap;\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Filtres \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.filters {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-3);\n  margin-bottom: var(--space-5);\n\n  &__select .input { width: auto; }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Carte de devoir \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.paper {\n  display: flex;\n  flex-direction: column;\n  border-top: 3px solid var(--paper-color, var(--brand));\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4);\n  }\n\n  &__title { min-width: 0; }\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__body {\n    flex: 1;\n    padding: 0 var(--space-4) var(--space-3);\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-2);\n  }\n\n  &__scale {\n    margin: 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex-wrap: wrap;\n  }\n\n  &__teacher { margin: 0; font-size: var(--text-sm); color: var(--text-normal); }\n\n  &__progress--none {\n    margin: 0;\n    font-size: var(--text-sm);\n    font-style: italic;\n    color: var(--text-light);\n  }\n\n  &__footer {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-3) var(--space-4);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n.progress {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n\n  &__bar {\n    height: 6px;\n    background: var(--surface-sunken);\n    border-radius: var(--radius-pill);\n    overflow: hidden;\n  }\n\n  &__fill {\n    display: block;\n    height: 100%;\n    background: var(--paper-color, var(--brand));\n    border-radius: var(--radius-pill);\n  }\n\n  &__label { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.empty-state {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneaux \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n  width: min(460px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &--wide { width: min(640px, 100vw); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__close {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border-light);\n  }\n\n  &__warning {\n    flex: 1;\n    margin: 0;\n    font-size: var(--text-xs);\n    color: var(--warning);\n  }\n}\n\n.grid2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block {\n  padding: var(--space-3);\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n}\n\n.field__hint--lock { color: var(--warning); }\n\n.switch {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n  font-size: var(--text-sm);\n  cursor: pointer;\n\n  input { margin-top: 3px; }\n  small { display: block; margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Feuille de notes \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.sheet-counters {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  flex-wrap: wrap;\n\n  &__item strong { color: var(--text-strong); }\n  &__item--absent strong { color: var(--warning); }\n  &__item--missing strong { color: var(--danger); }\n}\n\n.distribution {\n  padding: var(--space-4) var(--space-5);\n  border-bottom: 1px solid var(--border-light);\n\n  &__title { margin: 0 0 var(--space-2); font-weight: 600; color: var(--text-strong); }\n\n  &__list {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n    gap: var(--space-3);\n    margin: 0;\n    padding: 0;\n    list-style: none;\n\n    li { display: flex; flex-direction: column; }\n    span { font-size: var(--text-xs); color: var(--text-muted); }\n    strong { color: var(--text-strong); }\n  }\n\n  &__hint {\n    margin: var(--space-3) 0 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n}\n\n.marks {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    border-left: 3px solid transparent;\n    border-radius: var(--radius-input);\n\n    &--absent { background: var(--warning-bg); border-left-color: var(--warning); }\n    &--missing { background: var(--danger-bg); border-left-color: var(--danger); }\n  }\n\n  &__identity { display: flex; flex-direction: column; min-width: 0; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__number { font-size: var(--text-xs); color: var(--text-light); }\n\n  &__entry {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    flex: none;\n  }\n\n  &__scale { font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__flag {\n    display: flex;\n    align-items: center;\n    gap: 4px;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    cursor: pointer;\n  }\n\n  &__value { min-width: 70px; text-align: right; color: var(--text-strong); }\n}\n\n.input--score {\n  width: 78px;\n  padding: 4px var(--space-2);\n  text-align: right;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Export et import \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.sheet-counters__files {\n  display: flex;\n  gap: var(--space-2);\n  margin-left: auto;\n}\n\n/* Un label qui a l'air d'un bouton : l'input fichier natif ne se style pas. */\n.file-button {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  overflow: hidden;\n  cursor: pointer;\n\n  input {\n    position: absolute;\n    inset: 0;\n    opacity: 0;\n    cursor: pointer;\n  }\n\n  input:disabled { cursor: not-allowed; }\n}\n\n.hint-block--inset {\n  margin: 0;\n  border-radius: 0;\n  border-bottom: 1px solid var(--border-light);\n}\n\n.muted { color: var(--text-muted); }\n\n.diff {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: grid;\n    grid-template-columns: 1fr auto;\n    gap: var(--space-2) var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    border-left: 3px solid transparent;\n    border-radius: var(--radius-input);\n    background: var(--surface-sunken);\n\n    &[data-status='CHANGED'] {\n      background: var(--brand-tint);\n      border-left-color: var(--brand);\n    }\n\n    &[data-status='UNCHANGED'] { background: transparent; }\n\n    &[data-status='INVALID'],\n    &[data-status='UNKNOWN'],\n    &[data-status='DUPLICATE'] {\n      background: var(--danger-bg);\n      border-left-color: var(--danger);\n    }\n\n    &[data-status='LOCKED'] {\n      background: var(--warning-bg);\n      border-left-color: var(--warning);\n    }\n  }\n\n  &__identity { display: flex; flex-direction: column; min-width: 0; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__number { font-size: var(--text-xs); color: var(--text-light); }\n\n  &__change {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    white-space: nowrap;\n  }\n\n  &__before { color: var(--text-muted); text-decoration: line-through; }\n  &__arrow { color: var(--text-light); }\n  &__after { font-weight: 700; color: var(--text-strong); }\n  &__refused { font-size: var(--text-xs); font-weight: 600; color: var(--danger); }\n\n  &__notes {\n    grid-column: 1 / -1;\n    margin: 0;\n    padding-left: var(--space-4);\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n\n  &__note--error { color: var(--danger); }\n\n  &__empty {\n    padding: var(--space-8);\n    text-align: center;\n    color: var(--text-muted);\n  }\n}\n\n@include mobile {\n  .drawer,\n  .drawer--wide { width: 100vw; }\n\n  .marks__item { flex-direction: column; align-items: flex-start; }\n  .paper__footer { flex-wrap: wrap; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AssessmentsComponent, { className: "AssessmentsComponent", filePath: "frontend/src/app/features/assessments/assessments.component.ts", lineNumber: 59 }); })();
/* ------------------------------------------------------------------ dates */
function isoToday() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
}
function daysBetween(from, to) {
    const start = Date.parse(`${from}T00:00:00`);
    const end = Date.parse(`${to}T00:00:00`);
    return Math.round((end - start) / 86400000);
}
function formatDay(iso) {
    const date = new Date(`${iso}T00:00:00`);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
}
function trim(value) {
    return Number.isInteger(value) ? String(value) : String(value).replace('.', ',');
}
//# sourceMappingURL=assessments.component.js.map