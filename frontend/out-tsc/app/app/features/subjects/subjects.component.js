import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CURRICULUM_DATA_SOURCE } from '@core/datasource/data-source';
import { SUBJECT_CATEGORIES, SUBJECT_COLORS } from '@core/models/curriculum.models';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.levelId;
const _forTrack2 = ($index, $item) => $item.subjectId;
const _forTrack3 = ($index, $item) => $item.code;
function SubjectsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 10);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleArchived()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 11);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_8_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openSubject()); });
    i0.ɵɵelementStart(3, "span", 12);
    i0.ɵɵtext(4, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Nouvelle mati\u00E8re ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.showArchived() ? "Masquer les archiv\u00E9es" : "Voir les archiv\u00E9es", " ");
} }
function SubjectsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 13);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openApply()); });
    i0.ɵɵtext(1, " Appliquer \u00E0 plusieurs niveaux ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r1.activeSubjects().length === 0);
} }
function SubjectsComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.levelsWithoutProgramme().length);
} }
function SubjectsComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 9);
} }
function SubjectsComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 14);
    i0.ɵɵlistener("retry", function SubjectsComponent_Conditional_17_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 26);
    i0.ɵɵtext(1, "Non not\u00E9e");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 27);
    i0.ɵɵtext(1, "Archiv\u00E9e");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 29);
    i0.ɵɵtext(1, " Au programme de ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " niveau(x) ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subject_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(subject_r8.levelCount);
} }
function SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 30);
    i0.ɵɵtext(1, " Au programme d'aucun niveau ");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 31);
    i0.ɵɵtext(1, " Elle appara\u00EEt dans l'emploi du temps mais n'entre dans aucune moyenne. ");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 36);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_16_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const subject_r8 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.archiveSubject(subject_r8)); });
    i0.ɵɵtext(1, "Archiver");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subject_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("disabled", subject_r8.levelCount > 0);
    i0.ɵɵattribute("title", subject_r8.levelCount > 0 ? "Retirez-la d'abord des programmes" : null);
} }
function SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 33);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const subject_r8 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.restoreSubject(subject_r8)); });
    i0.ɵɵtext(1, "R\u00E9activer");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_18_Conditional_0_For_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 21)(1, "header", 22)(2, "div", 23)(3, "h2", 24);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 25);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_7_Template, 2, 0, "span", 26)(8, SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_8_Template, 2, 0, "span", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 28);
    i0.ɵɵtemplate(10, SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_10_Template, 5, 1, "p", 29)(11, SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_11_Template, 2, 0, "p", 30)(12, SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_12_Template, 2, 0, "p", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "footer", 32)(14, "button", 33);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_18_Conditional_0_For_7_Template_button_click_14_listener() { const subject_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openSubject(subject_r8)); });
    i0.ɵɵtext(15, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(16, SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_16_Template, 2, 2, "button", 34)(17, SubjectsComponent_Conditional_18_Conditional_0_For_7_Conditional_17_Template, 2, 0, "button", 35);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const subject_r8 = ctx.$implicit;
    i0.ɵɵstyleProp("--subject-color", subject_r8.colorHex || "var(--brand)");
    i0.ɵɵclassProp("subject--archived", subject_r8.status !== "ACTIVE");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(subject_r8.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", subject_r8.code, " \u00B7 ", subject_r8.categoryLabel, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(!subject_r8.graded ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(subject_r8.status !== "ACTIVE" ? 8 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(subject_r8.levelCount > 0 ? 10 : 11);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!subject_r8.graded ? 12 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(subject_r8.status === "ACTIVE" ? 16 : 17);
} }
function SubjectsComponent_Conditional_18_Conditional_0_ForEmpty_8_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20)(1, "p", 37);
    i0.ɵɵtext(2, "Aucune mati\u00E8re d\u00E9clar\u00E9e.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 38);
    i0.ɵɵtext(4, " Commencez par la liste de ce que votre \u00E9tablissement enseigne. Les coefficients viendront ensuite, niveau par niveau. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 11);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_18_Conditional_0_ForEmpty_8_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openSubject()); });
    i0.ɵɵtext(6, " D\u00E9clarer une mati\u00E8re ");
    i0.ɵɵelementEnd()();
} }
function SubjectsComponent_Conditional_18_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, " Une mati\u00E8re existe une seule fois pour tout l'\u00E9tablissement. Ce qui change d'un niveau \u00E0 l'autre, c'est son coefficient \u2014 il se r\u00E8gle dans l'onglet ");
    i0.ɵɵelementStart(2, "button", 17);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_18_Conditional_0_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.changeTab("PROGRAMME")); });
    i0.ɵɵtext(3, " Programme et coefficients");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, ". ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "section", 18);
    i0.ɵɵrepeaterCreate(6, SubjectsComponent_Conditional_18_Conditional_0_For_7_Template, 18, 12, "article", 19, _forTrack0, false, SubjectsComponent_Conditional_18_Conditional_0_ForEmpty_8_Template, 7, 0, "div", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r1.subjects());
} }
function SubjectsComponent_Conditional_18_Conditional_1_Conditional_0_For_11_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 46)(1, "span", 47);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 48);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 49);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_18_Conditional_1_Conditional_0_For_11_Template_button_click_5_listener() { const level_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.openApply(level_r12.levelId)); });
    i0.ɵɵtext(6, "D\u00E9finir le programme");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const level_r12 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r12.levelName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r12.cycleName);
} }
function SubjectsComponent_Conditional_18_Conditional_1_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 39)(1, "div", 41)(2, "span", 42);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 43);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 44);
    i0.ɵɵtext(8, " Sans mati\u00E8re not\u00E9e, aucune moyenne ne peut \u00EAtre calcul\u00E9e et aucun bulletin publi\u00E9 pour ces niveaux. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "ul", 45);
    i0.ɵɵrepeaterCreate(10, SubjectsComponent_Conditional_18_Conditional_1_Conditional_0_For_11_Template, 7, 2, "li", 46, _forTrack1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.levelsWithoutProgramme().length, " niveau(x) sans programme ");
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.levelsWithoutProgramme());
} }
function SubjectsComponent_Conditional_18_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20)(1, "p", 37);
    i0.ɵɵtext(2, "D\u00E9clarez d'abord vos mati\u00E8res.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 38);
    i0.ɵɵtext(4, " Le programme rattache des mati\u00E8res existantes \u00E0 chaque niveau. Il n'y a rien \u00E0 rattacher pour l'instant. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 11);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_18_Conditional_1_Conditional_1_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.changeTab("CATALOGUE")); });
    i0.ɵɵtext(6, " Aller au catalogue ");
    i0.ɵɵelementEnd()();
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
} if (rf & 2) {
    const level_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", level_r15.subjectCount, " mati\u00E8re(s) \u00B7 total des coefficients ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r15.totalCoefficient);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u00B7 ", level_r15.totalWeeklyHours, " h ");
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucune mati\u00E8re ");
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵtext(1, "Pr\u00EAt");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 57);
    i0.ɵɵtext(1, "\u00C0 d\u00E9finir");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_1_For_19_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 26);
    i0.ɵɵtext(1, "Non not\u00E9e");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_1_For_19_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 71);
    i0.ɵɵtext(1, "Notes saisies");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_1_For_19_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 26);
    i0.ɵɵtext(1, "Option");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_1_For_19_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵelement(2, "span", 67);
    i0.ɵɵtext(3);
    i0.ɵɵelementStart(4, "span", 68);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 66)(7, "input", 69);
    i0.ɵɵlistener("change", function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_1_For_19_Template_input_change_7_listener($event) { const row_r18 = i0.ɵɵrestoreView(_r17).$implicit; const level_r15 = i0.ɵɵnextContext(3).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.changeCoefficient(level_r15.levelId, row_r18.subjectId, $event.target.value, row_r18.weeklyHours, row_r18.mandatory)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td", 66)(9, "input", 70);
    i0.ɵɵlistener("change", function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_1_For_19_Template_input_change_9_listener($event) { const row_r18 = i0.ɵɵrestoreView(_r17).$implicit; const level_r15 = i0.ɵɵnextContext(3).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.changeHours(level_r15.levelId, row_r18.subjectId, $event.target.value, row_r18.coefficient, row_r18.mandatory)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵtemplate(11, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_1_For_19_Conditional_11_Template, 2, 0, "span", 26)(12, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_1_For_19_Conditional_12_Template, 2, 0, "span", 71)(13, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_1_For_19_Conditional_13_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 72)(15, "button", 36);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_1_For_19_Template_button_click_15_listener() { const row_r18 = i0.ɵɵrestoreView(_r17).$implicit; const level_r15 = i0.ɵɵnextContext(3).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.removeRow(level_r15.levelId, row_r18.subjectId, row_r18.subjectName)); });
    i0.ɵɵtext(16, " Retirer ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r18 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("background", row_r18.subjectColor || "var(--brand)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", row_r18.subjectName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r18.subjectCode);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", row_r18.coefficient)("disabled", !row_r18.graded);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", row_r18.weeklyHours);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!row_r18.graded ? 11 : row_r18.locked ? 12 : !row_r18.mandatory ? 13 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", row_r18.locked);
    i0.ɵɵattribute("title", row_r18.locked ? "Des \u00E9valuations existent d\u00E9j\u00E0" : null);
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60)(1, "table", 64)(2, "caption", 65);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "thead")(5, "tr")(6, "th");
    i0.ɵɵtext(7, "Mati\u00E8re");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th", 66);
    i0.ɵɵtext(9, "Coefficient");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 66);
    i0.ɵɵtext(11, "Heures / semaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th")(15, "span", 65);
    i0.ɵɵtext(16, "Actions");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(17, "tbody");
    i0.ɵɵrepeaterCreate(18, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_1_For_19_Template, 17, 10, "tr", null, _forTrack2);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const level_r15 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Programme du niveau ", level_r15.levelName, " ");
    i0.ɵɵadvance(15);
    i0.ɵɵrepeater(level_r15.subjects);
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 61);
    i0.ɵɵtext(1, " Aucune mati\u00E8re rattach\u00E9e \u00E0 ce niveau. ");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_3_For_8_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " (non not\u00E9e) ");
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_3_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 78);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_3_For_8_Conditional_2_Template, 1, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subject_r20 = ctx.$implicit;
    i0.ɵɵproperty("value", subject_r20.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", subject_r20.name, "");
    i0.ɵɵadvance();
    i0.ɵɵconditional(!subject_r20.graded ? 2 : -1);
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 73);
    i0.ɵɵlistener("ngSubmit", function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_3_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r19); const level_r15 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.addRow(level_r15)); });
    i0.ɵɵelementStart(1, "div", 74)(2, "label", 75);
    i0.ɵɵtext(3, " Mati\u00E8re ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 76)(5, "option", 77);
    i0.ɵɵtext(6, "Choisir\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(7, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_3_For_8_Template, 3, 3, "option", 78, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 79)(10, "label", 75);
    i0.ɵɵtext(11, " Coefficient ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 80);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 79)(14, "label", 75);
    i0.ɵɵtext(15, " Heures ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "input", 81);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 82);
    i0.ɵɵtext(18, "Ajouter");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const level_r15 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("formGroup", ctx_r1.rowForm);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("for", "sub-" + level_r15.levelId);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "sub-" + level_r15.levelId);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.availableFor(level_r15));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("for", "coef-" + level_r15.levelId);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "coef-" + level_r15.levelId);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("for", "h-" + level_r15.levelId);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "h-" + level_r15.levelId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.rowForm.invalid || ctx_r1.saving());
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 61);
    i0.ɵɵtext(1, " Toutes les mati\u00E8res du catalogue sont d\u00E9j\u00E0 au programme de ce niveau. ");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵtemplate(1, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_1_Template, 20, 1, "div", 60)(2, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_2_Template, 2, 0, "p", 61)(3, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_3_Template, 19, 8, "form", 62)(4, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Conditional_4_Template, 2, 0, "p", 61);
    i0.ɵɵelementStart(5, "footer", 63)(6, "button", 36);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r16); const level_r15 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openApply(level_r15.levelId)); });
    i0.ɵɵtext(7, " Copier ce programme vers d'autres niveaux ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const level_r15 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵconditional(level_r15.subjects.length > 0 ? 1 : 2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.availableFor(level_r15).length > 0 ? 3 : ctx_r1.activeSubjects().length > 0 ? 4 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", level_r15.subjects.length === 0);
} }
function SubjectsComponent_Conditional_18_Conditional_1_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 50)(1, "button", 51);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_18_Conditional_1_For_4_Template_button_click_1_listener() { const level_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.toggleLevel(level_r15.levelId)); });
    i0.ɵɵelementStart(2, "span", 52)(3, "span", 53);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 54);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 55);
    i0.ɵɵtemplate(8, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_8_Template, 4, 3)(9, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_9_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_10_Template, 2, 0, "span", 56)(11, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_11_Template, 2, 0, "span", 57);
    i0.ɵɵelementStart(12, "span", 58);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(14, SubjectsComponent_Conditional_18_Conditional_1_For_4_Conditional_14_Template, 8, 3, "div", 59);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r15 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("level--open", ctx_r1.openLevelId() === level_r15.levelId);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-expanded", ctx_r1.openLevelId() === level_r15.levelId);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(level_r15.levelName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r15.cycleName);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(level_r15.subjectCount > 0 ? 8 : 9);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(level_r15.ready ? 10 : 11);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.openLevelId() === level_r15.levelId ? "\u2212" : "+", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.openLevelId() === level_r15.levelId ? 14 : -1);
} }
function SubjectsComponent_Conditional_18_Conditional_1_ForEmpty_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "p", 37);
    i0.ɵɵtext(2, "Aucun niveau d\u00E9fini.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 38);
    i0.ɵɵtext(4, " Le programme se rattache aux niveaux. Cr\u00E9ez-les d'abord dans ");
    i0.ɵɵelementStart(5, "a", 83);
    i0.ɵɵtext(6, "la configuration");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7, ". ");
    i0.ɵɵelementEnd()();
} }
function SubjectsComponent_Conditional_18_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, SubjectsComponent_Conditional_18_Conditional_1_Conditional_0_Template, 12, 1, "section", 39)(1, SubjectsComponent_Conditional_18_Conditional_1_Conditional_1_Template, 7, 0, "div", 20);
    i0.ɵɵelementStart(2, "section", 15);
    i0.ɵɵrepeaterCreate(3, SubjectsComponent_Conditional_18_Conditional_1_For_4_Template, 15, 9, "article", 40, _forTrack1, false, SubjectsComponent_Conditional_18_Conditional_1_ForEmpty_5_Template, 8, 0, "div", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(ctx_r1.levelsWithoutProgramme().length > 0 ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.activeSubjects().length === 0 ? 1 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.levels());
} }
function SubjectsComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, SubjectsComponent_Conditional_18_Conditional_0_Template, 9, 1)(1, SubjectsComponent_Conditional_18_Conditional_1_Template, 6, 3, "section", 15);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r1.tab() === "CATALOGUE" ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.tab() === "PROGRAMME" ? 1 : -1);
} }
function SubjectsComponent_Conditional_19_Conditional_2_For_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 78);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r23 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r23.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r23.label);
} }
function SubjectsComponent_Conditional_19_Conditional_2_For_35_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 106);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_19_Conditional_2_For_35_Template_button_click_0_listener() { const color_r25 = i0.ɵɵrestoreView(_r24).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.pickColor(color_r25)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r25 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵstyleProp("background", color_r25);
    i0.ɵɵclassProp("swatch--on", ctx_r1.subjectForm.controls.colorHex.value === color_r25);
    i0.ɵɵattribute("aria-label", "Couleur " + color_r25);
} }
function SubjectsComponent_Conditional_19_Conditional_2_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 104);
    i0.ɵɵtext(1, " Une mati\u00E8re non not\u00E9e figure \u00E0 l'emploi du temps et sur le bulletin, mais son coefficient n'entre dans aucun calcul. C'est le cas de la vie scolaire ou des activit\u00E9s d'\u00E9veil. ");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_19_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 86)(1, "h2", 87);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 88);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_19_Conditional_2_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r22); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "form", 89)(6, "div", 90)(7, "div", 74)(8, "label", 91);
    i0.ɵɵtext(9, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(10, "input", 92);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 74)(12, "label", 93);
    i0.ɵɵtext(13, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(14, "input", 94);
    i0.ɵɵelementStart(15, "span", 95);
    i0.ɵɵtext(16, " Mis en majuscules sans accent : il sert dans les exports. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "div", 90)(18, "div", 74)(19, "label", 96);
    i0.ɵɵtext(20, "Abr\u00E9viation");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "input", 97);
    i0.ɵɵelementStart(22, "span", 95);
    i0.ɵɵtext(23, "Affich\u00E9e dans l'emploi du temps.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 74)(25, "label", 98);
    i0.ɵɵtext(26, " Cat\u00E9gorie ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "select", 99);
    i0.ɵɵrepeaterCreate(28, SubjectsComponent_Conditional_19_Conditional_2_For_29_Template, 2, 2, "option", 78, _forTrack3);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "div", 74)(31, "span", 75);
    i0.ɵɵtext(32, "Couleur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 100);
    i0.ɵɵrepeaterCreate(34, SubjectsComponent_Conditional_19_Conditional_2_For_35_Template, 1, 5, "button", 101, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span", 95);
    i0.ɵɵtext(37, "Sert \u00E0 rep\u00E9rer la mati\u00E8re dans la grille horaire.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "label", 102);
    i0.ɵɵelement(39, "input", 103);
    i0.ɵɵelementStart(40, "span");
    i0.ɵɵtext(41, "Mati\u00E8re not\u00E9e, qui entre dans les moyennes");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(42, SubjectsComponent_Conditional_19_Conditional_2_Conditional_42_Template, 2, 0, "p", 104);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "footer", 105)(44, "button", 10);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_19_Conditional_2_Template_button_click_44_listener() { i0.ɵɵrestoreView(_r22); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(45, " Annuler ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "button", 13);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_19_Conditional_2_Template_button_click_46_listener() { i0.ɵɵrestoreView(_r22); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitSubject()); });
    i0.ɵɵtext(47);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.editingSubject() ? "Modifier la mati\u00E8re" : "Nouvelle mati\u00E8re", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.subjectForm);
    i0.ɵɵadvance(23);
    i0.ɵɵrepeater(ctx_r1.categories);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r1.colors);
    i0.ɵɵadvance(8);
    i0.ɵɵconditional(!ctx_r1.subjectForm.controls.graded.value ? 42 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.subjectForm.invalid || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Enregistrement..." : "Enregistrer", " ");
} }
function SubjectsComponent_Conditional_19_Conditional_3_For_13_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 26);
    i0.ɵɵtext(1, "Non not\u00E9e");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_19_Conditional_3_For_13_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 69);
    i0.ɵɵlistener("change", function SubjectsComponent_Conditional_19_Conditional_3_For_13_Conditional_7_Template_input_change_0_listener($event) { i0.ɵɵrestoreView(_r29); const subject_r28 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.setApplyCoefficient(subject_r28.id, $event.target.value)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subject_r28 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("value", ctx_r1.applyCoefficientOf(subject_r28.id))("disabled", !subject_r28.graded);
} }
function SubjectsComponent_Conditional_19_Conditional_3_For_13_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 110)(1, "label", 114)(2, "input", 115);
    i0.ɵɵlistener("change", function SubjectsComponent_Conditional_19_Conditional_3_For_13_Template_input_change_2_listener() { const subject_r28 = i0.ɵɵrestoreView(_r27).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.toggleApplyRow(subject_r28.id)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "span", 67);
    i0.ɵɵelementStart(4, "span", 116);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, SubjectsComponent_Conditional_19_Conditional_3_For_13_Conditional_6_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, SubjectsComponent_Conditional_19_Conditional_3_For_13_Conditional_7_Template, 1, 2, "input", 117);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subject_r28 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", ctx_r1.isApplyRow(subject_r28.id));
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", subject_r28.colorHex || "var(--brand)");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(subject_r28.name);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!subject_r28.graded ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isApplyRow(subject_r28.id) ? 7 : -1);
} }
function SubjectsComponent_Conditional_19_Conditional_3_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 111);
    i0.ɵɵtext(1, " Total des coefficients : ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.applyTotal());
} }
function SubjectsComponent_Conditional_19_Conditional_3_For_19_For_5_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 122);
    i0.ɵɵtext(1, "vide");
    i0.ɵɵelementEnd();
} }
function SubjectsComponent_Conditional_19_Conditional_3_For_19_For_5_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 121)(1, "input", 115);
    i0.ɵɵlistener("change", function SubjectsComponent_Conditional_19_Conditional_3_For_19_For_5_Template_input_change_1_listener() { const level_r33 = i0.ɵɵrestoreView(_r32).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.toggleTarget(level_r33.levelId)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, SubjectsComponent_Conditional_19_Conditional_3_For_19_For_5_Conditional_4_Template, 2, 0, "span", 122);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r33 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("chip-check--on", ctx_r1.isTargeted(level_r33.levelId));
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r1.isTargeted(level_r33.levelId));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r33.levelName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!level_r33.ready ? 4 : -1);
} }
function SubjectsComponent_Conditional_19_Conditional_3_For_19_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 112)(1, "button", 118);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_19_Conditional_3_For_19_Template_button_click_1_listener() { const cycle_r31 = i0.ɵɵrestoreView(_r30).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.toggleCycleTargets(cycle_r31.id)); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 119);
    i0.ɵɵrepeaterCreate(4, SubjectsComponent_Conditional_19_Conditional_3_For_19_For_5_Template, 5, 5, "label", 120, _forTrack1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const cycle_r31 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", cycle_r31.name, " \u2014 tout s\u00E9lectionner ");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(cycle_r31.levels);
} }
function SubjectsComponent_Conditional_19_Conditional_3_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Les mati\u00E8res absentes de cette liste seront retir\u00E9es \u2014 sauf celles qui portent d\u00E9j\u00E0 des \u00E9valuations, qui sont conserv\u00E9es. ");
} }
function SubjectsComponent_Conditional_19_Conditional_3_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Seules les mati\u00E8res absentes seront ajout\u00E9es. Les coefficients d\u00E9j\u00E0 r\u00E9gl\u00E9s sur un niveau ne sont pas \u00E9cras\u00E9s. ");
} }
function SubjectsComponent_Conditional_19_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 86)(1, "h2", 87);
    i0.ɵɵtext(2, "Appliquer un programme");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 88);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_19_Conditional_3_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r26); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 107)(6, "p", 104);
    i0.ɵɵtext(7, " Dans un cycle, le programme change rarement d'un niveau \u00E0 l'autre. Remplir quatre fois le m\u00EAme tableau, c'est quatre occasions de se tromper de coefficient \u2014 et une erreur reste invisible jusqu'au premier bulletin. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "section")(9, "h3", 108);
    i0.ɵɵtext(10, "1 \u00B7 Les mati\u00E8res et leurs coefficients");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "ul", 109);
    i0.ɵɵrepeaterCreate(12, SubjectsComponent_Conditional_19_Conditional_3_For_13_Template, 8, 6, "li", 110, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, SubjectsComponent_Conditional_19_Conditional_3_Conditional_14_Template, 4, 1, "p", 111);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "section")(16, "h3", 108);
    i0.ɵɵtext(17, "2 \u00B7 Les niveaux concern\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(18, SubjectsComponent_Conditional_19_Conditional_3_For_19_Template, 6, 1, "div", 112, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "label", 102)(21, "input", 113);
    i0.ɵɵtwoWayListener("ngModelChange", function SubjectsComponent_Conditional_19_Conditional_3_Template_input_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r26); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.applyReplace, $event) || (ctx_r1.applyReplace = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23, "Remplacer le programme existant de ces niveaux");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "p", 104);
    i0.ɵɵtemplate(25, SubjectsComponent_Conditional_19_Conditional_3_Conditional_25_Template, 1, 0)(26, SubjectsComponent_Conditional_19_Conditional_3_Conditional_26_Template, 1, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "footer", 105)(28, "button", 10);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_19_Conditional_3_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r26); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(29, " Annuler ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 13);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_19_Conditional_3_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r26); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitApply()); });
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(12);
    i0.ɵɵrepeater(ctx_r1.activeSubjects());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.applyRows().size > 0 ? 14 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.cycles());
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.applyReplace);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r1.applyReplace ? 25 : 26);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", !ctx_r1.canApply());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Application..." : "Appliquer \u00E0 " + ctx_r1.applyTargets().length + " niveau(x)", " ");
} }
function SubjectsComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 84);
    i0.ɵɵlistener("click", function SubjectsComponent_Conditional_19_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 85);
    i0.ɵɵtemplate(2, SubjectsComponent_Conditional_19_Conditional_2_Template, 48, 5)(3, SubjectsComponent_Conditional_19_Conditional_3_Template, 32, 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const openPanel_r34 = ctx;
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(openPanel_r34 === "SUBJECT" ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(openPanel_r34 === "APPLY" ? 3 : -1);
} }
/**
 * Subjects and programme — the two configuration steps that gate report cards.
 *
 * <p>They live on one screen because they answer one question in two halves:
 * what does the school teach, and with what weight at each level. Splitting
 * them across two pages made people declare subjects and never come back to
 * weight them, which leaves averages uncomputable without saying so.</p>
 */
export class SubjectsComponent {
    dataSource = inject(CURRICULUM_DATA_SOURCE);
    notifications = inject(NotificationService);
    setupStatus = inject(SetupStatusService);
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    destroyRef = inject(DestroyRef);
    categories = SUBJECT_CATEGORIES;
    colors = SUBJECT_COLORS;
    tab = signal('CATALOGUE');
    subjects = signal([]);
    levels = signal([]);
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    panel = signal(null);
    editingSubject = signal(null);
    openLevelId = signal(null);
    showArchived = signal(false);
    /** Niveaux cochés dans le panneau d'application groupée. */
    applyTargets = signal([]);
    /** Matière → coefficient, pour l'application groupée. */
    applyRows = signal(new Map());
    applyReplace = false;
    subjectForm = this.fb.nonNullable.group({
        code: ['', [Validators.required, Validators.maxLength(20)]],
        name: ['', [Validators.required, Validators.maxLength(150)]],
        shortName: ['', [Validators.maxLength(40)]],
        category: ['SCIENCE', [Validators.required]],
        colorHex: [SUBJECT_COLORS[0]],
        graded: [true]
    });
    /** Ligne en cours d'ajout sur un niveau. */
    rowForm = this.fb.nonNullable.group({
        subjectId: ['', [Validators.required]],
        coefficient: [2, [Validators.required, Validators.min(0.01), Validators.max(20)]],
        weeklyHours: [2, [Validators.min(0), Validators.max(40)]],
        mandatory: [true]
    });
    ngOnInit() {
        if (this.route.snapshot.queryParamMap.get('tab') === 'programme') {
            this.tab.set('PROGRAMME');
        }
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.listSubjects(this.showArchived())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (list) => {
                this.subjects.set(list);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
        this.dataSource.levels().pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (list) => this.levels.set(list),
            // Un programme illisible ne doit pas vider le catalogue.
            error: () => this.levels.set([])
        });
    }
    changeTab(tab) {
        this.tab.set(tab);
        this.panel.set(null);
    }
    toggleArchived() {
        this.showArchived.update((v) => !v);
        this.load();
    }
    // ------------------------------------------------------------------ vues
    activeSubjects = computed(() => this.subjects().filter((s) => s.status === 'ACTIVE'));
    /** Niveaux sans aucune matière notée : ce sont eux qui bloquent les bulletins. */
    levelsWithoutProgramme = computed(() => this.levels().filter((l) => !l.ready));
    readyCount = computed(() => this.levels().filter((l) => l.ready).length);
    /** Niveaux regroupés par cycle, pour le panneau d'application groupée. */
    cycles = computed(() => {
        const groups = new Map();
        this.levels().forEach((level) => {
            const group = groups.get(level.cycleId);
            if (group) {
                group.levels.push(level);
            }
            else {
                groups.set(level.cycleId, { id: level.cycleId, name: level.cycleName, levels: [level] });
            }
        });
        return Array.from(groups.values());
    });
    toggleLevel(levelId) {
        this.openLevelId.set(this.openLevelId() === levelId ? null : levelId);
        this.rowForm.reset({ subjectId: '', coefficient: 2, weeklyHours: 2, mandatory: true });
    }
    /** Matières encore disponibles pour ce niveau. */
    availableFor(level) {
        const used = new Set(level.subjects.map((s) => s.subjectId));
        return this.activeSubjects().filter((s) => !used.has(s.id));
    }
    levelById(levelId) {
        return this.levels().find((l) => l.levelId === levelId);
    }
    // --------------------------------------------------------- catalogue
    openSubject(subject) {
        this.editingSubject.set(subject ?? null);
        this.subjectForm.reset({
            code: subject?.code ?? '',
            name: subject?.name ?? '',
            shortName: subject?.shortName ?? '',
            category: subject?.category ?? 'SCIENCE',
            colorHex: subject?.colorHex ?? SUBJECT_COLORS[0],
            graded: subject?.graded ?? true
        });
        this.panel.set('SUBJECT');
    }
    pickColor(color) {
        this.subjectForm.patchValue({ colorHex: color });
    }
    submitSubject() {
        if (this.subjectForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.subjectForm.getRawValue();
        const payload = {
            code: value.code.trim(),
            name: value.name.trim(),
            shortName: value.shortName.trim() || undefined,
            category: value.category,
            colorHex: value.colorHex,
            graded: value.graded
        };
        const editing = this.editingSubject();
        const request = editing
            ? this.dataSource.updateSubject(editing.id, payload)
            : this.dataSource.createSubject(payload);
        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (subject) => {
                this.notifications.success(editing ? `${subject.name} est à jour.` : `${subject.name} a été ajoutée.`, editing ? 'Matière modifiée' : 'Matière créée');
                this.afterWrite();
            },
            error: () => this.saving.set(false)
        });
    }
    archiveSubject(subject) {
        this.dataSource.archiveSubject(subject.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.notifications.success(`${subject.name} n'apparaît plus dans les listes de choix.`, 'Matière archivée');
                this.load();
            },
            error: (err) => this.explain(err)
        });
    }
    restoreSubject(subject) {
        this.dataSource.restoreSubject(subject.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({ next: () => this.load() });
    }
    // --------------------------------------------------------- programme
    addRow(level) {
        if (this.rowForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.rowForm.getRawValue();
        this.write(level.levelId, {
            subjectId: value.subjectId,
            coefficient: value.coefficient,
            weeklyHours: value.weeklyHours,
            mandatory: value.mandatory
        }, () => {
            this.rowForm.reset({ subjectId: '', coefficient: 2, weeklyHours: 2, mandatory: true });
        });
    }
    /**
     * Un coefficient modifié dans la grille part directement au serveur.
     *
     * Pas de bouton « Enregistrer » : sur un tableau de dix lignes, il crée
     * surtout des modifications perdues quand on change d'onglet.
     */
    changeCoefficient(levelId, subjectId, raw, weeklyHours, mandatory) {
        const coefficient = Number(raw);
        if (!Number.isFinite(coefficient) || coefficient <= 0) {
            this.notifications.error('Le coefficient doit être strictement positif.', 'Valeur refusée');
            return;
        }
        this.write(levelId, { subjectId, coefficient, weeklyHours, mandatory });
    }
    changeHours(levelId, subjectId, raw, coefficient, mandatory) {
        const weeklyHours = Number(raw);
        if (!Number.isFinite(weeklyHours) || weeklyHours < 0) {
            return;
        }
        this.write(levelId, { subjectId, coefficient, weeklyHours, mandatory });
    }
    removeRow(levelId, subjectId, subjectName) {
        this.dataSource.removeLevelSubject(levelId, subjectId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (updated) => {
                this.replaceLevel(updated);
                this.notifications.success(`${subjectName} retirée du programme.`);
                this.setupStatus.refresh();
            },
            error: (err) => this.explain(err)
        });
    }
    write(levelId, payload, onDone) {
        this.dataSource.upsertLevelSubject(levelId, payload)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (updated) => {
                this.replaceLevel(updated);
                this.saving.set(false);
                this.setupStatus.refresh();
                onDone?.();
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    replaceLevel(updated) {
        this.levels.update((list) => list.map((l) => (l.levelId === updated.levelId ? updated : l)));
    }
    // ------------------------------------------------- application groupée
    openApply(levelId) {
        const source = levelId ? this.levelById(levelId) : undefined;
        const rows = new Map();
        if (source) {
            source.subjects.forEach((s) => rows.set(s.subjectId, s.coefficient));
        }
        this.applyRows.set(rows);
        this.applyTargets.set(levelId ? [levelId] : []);
        this.applyReplace = false;
        this.panel.set('APPLY');
    }
    toggleTarget(levelId) {
        this.applyTargets.update((list) => list.includes(levelId)
            ? list.filter((id) => id !== levelId)
            : [...list, levelId]);
    }
    toggleCycleTargets(cycleId) {
        const ids = this.levels().filter((l) => l.cycleId === cycleId).map((l) => l.levelId);
        const allSelected = ids.every((id) => this.applyTargets().includes(id));
        this.applyTargets.update((list) => allSelected
            ? list.filter((id) => !ids.includes(id))
            : Array.from(new Set([...list, ...ids])));
    }
    isTargeted(levelId) {
        return this.applyTargets().includes(levelId);
    }
    toggleApplyRow(subjectId) {
        this.applyRows.update((map) => {
            const next = new Map(map);
            if (next.has(subjectId)) {
                next.delete(subjectId);
            }
            else {
                next.set(subjectId, 2);
            }
            return next;
        });
    }
    setApplyCoefficient(subjectId, raw) {
        const value = Number(raw);
        if (!Number.isFinite(value) || value <= 0) {
            return;
        }
        this.applyRows.update((map) => new Map(map).set(subjectId, value));
    }
    applyCoefficientOf(subjectId) {
        return this.applyRows().get(subjectId) ?? 2;
    }
    isApplyRow(subjectId) {
        return this.applyRows().has(subjectId);
    }
    applyTotal = computed(() => Array.from(this.applyRows().values()).reduce((sum, v) => sum + v, 0));
    canApply() {
        return this.applyTargets().length > 0 && this.applyRows().size > 0 && !this.saving();
    }
    submitApply() {
        if (!this.canApply()) {
            return;
        }
        this.saving.set(true);
        const subjects = Array.from(this.applyRows().entries()).map(([subjectId, coefficient]) => ({
            subjectId, coefficient, mandatory: true
        }));
        this.dataSource.apply({
            levelIds: this.applyTargets(),
            subjects,
            replaceExisting: this.applyReplace
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (updated) => {
                this.notifications.success(`${subjects.length} matière(s) appliquées à ${updated.length} niveau(x).`, 'Programme appliqué');
                this.afterWrite();
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ------------------------------------------------------------ internals
    closePanel() {
        this.panel.set(null);
        this.editingSubject.set(null);
    }
    afterWrite() {
        this.saving.set(false);
        this.closePanel();
        this.load();
        this.setupStatus.refresh();
    }
    /** Traduit le code d'erreur du serveur plutôt que d'afficher « erreur ». */
    explain(err) {
        const code = err?.error?.code;
        if (code) {
            this.notifications.error(translateErrorCode(code), 'Action refusée');
        }
    }
    static ɵfac = function SubjectsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SubjectsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SubjectsComponent, selectors: [["eduops-subjects"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 20, vars: 13, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--primary", 3, "disabled"], ["role", "tablist", 1, "tabs"], ["type", "button", "role", "tab", 1, "tabs__item", 3, "click"], [1, "tabs__badge", "numeric"], ["message", "Chargement des mati\u00E8res..."], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [3, "retry"], [1, "levels"], [1, "lead"], ["type", "button", 1, "linklike", 3, "click"], [1, "grid", "grid--3"], [1, "subject", "card", 3, "subject--archived", "--subject-color"], [1, "empty-state"], [1, "subject", "card"], [1, "subject__head"], [1, "subject__title"], [1, "subject__name"], [1, "subject__meta", "numeric"], [1, "pill", "pill--muted"], [1, "pill", "pill--archived"], [1, "subject__body"], [1, "subject__usage", "numeric"], [1, "subject__usage", "subject__usage--none"], [1, "subject__note"], [1, "subject__footer"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "disabled"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], [1, "empty-state__title"], [1, "empty-state__text"], ["role", "status", 1, "alert-block"], [1, "level", "card", 3, "level--open"], [1, "alert-block__head"], ["aria-hidden", "true", 1, "alert-block__icon"], [1, "alert-block__title"], [1, "alert-block__text"], [1, "pending"], [1, "pending__item"], [1, "pending__name"], [1, "pending__cycle"], ["type", "button", 1, "btn", "btn--primary", "btn--sm", 3, "click"], [1, "level", "card"], ["type", "button", 1, "level__head", 3, "click"], [1, "level__identity"], [1, "level__name"], [1, "level__cycle"], [1, "level__stats", "numeric"], [1, "pill", "pill--ok"], [1, "pill", "pill--warn"], ["aria-hidden", "true", 1, "level__chevron"], [1, "level__body"], [1, "table-wrapper"], [1, "level__empty"], [1, "add-row", 3, "formGroup"], [1, "level__foot"], [1, "table"], [1, "visually-hidden"], [1, "numeric"], ["aria-hidden", "true", 1, "dot"], [1, "muted", "numeric"], ["type", "number", "min", "0.5", "max", "20", "step", "0.5", 1, "input", "input--tiny", 3, "change", "value", "disabled"], ["type", "number", "min", "0", "max", "40", "step", "0.5", 1, "input", "input--tiny", 3, "change", "value"], [1, "pill", "pill--lock"], [1, "cell-actions"], [1, "add-row", 3, "ngSubmit", "formGroup"], [1, "field"], [1, "field__label"], ["formControlName", "subjectId", 1, "select", 3, "id"], ["value", ""], [3, "value"], [1, "field", "field--tiny"], ["type", "number", "min", "0.5", "max", "20", "step", "0.5", "formControlName", "coefficient", 1, "input", 3, "id"], ["type", "number", "min", "0", "max", "40", "step", "0.5", "formControlName", "weeklyHours", 1, "input", 3, "id"], ["type", "submit", 1, "btn", "btn--secondary", 3, "disabled"], ["routerLink", "/setup"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", 1, "drawer"], [1, "drawer__head"], [1, "drawer__title"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "drawer__body", 3, "formGroup"], [1, "grid2"], ["for", "name", 1, "field__label", "field__label--required"], ["id", "name", "formControlName", "name", "placeholder", "Math\u00E9matiques", 1, "input"], ["for", "code", 1, "field__label", "field__label--required"], ["id", "code", "formControlName", "code", "placeholder", "MATH", 1, "input"], [1, "field__hint"], ["for", "shortName", 1, "field__label"], ["id", "shortName", "formControlName", "shortName", "placeholder", "Maths", 1, "input"], ["for", "category", 1, "field__label", "field__label--required"], ["id", "category", "formControlName", "category", 1, "select"], [1, "swatches"], ["type", "button", 1, "swatch", 3, "swatch--on", "background"], [1, "switch"], ["type", "checkbox", "formControlName", "graded"], [1, "hint-block"], [1, "drawer__foot"], ["type", "button", 1, "swatch", 3, "click"], [1, "drawer__body"], [1, "drawer__section"], [1, "picker"], [1, "picker__row"], [1, "total", "numeric"], [1, "cycle"], ["type", "checkbox", "name", "applyReplace", 3, "ngModelChange", "ngModel"], [1, "picker__check"], ["type", "checkbox", 3, "change", "checked"], [1, "picker__name"], ["type", "number", "min", "0.5", "max", "20", "step", "0.5", 1, "input", "input--tiny", 3, "value", "disabled"], ["type", "button", 1, "cycle__all", 3, "click"], [1, "cycle__levels"], [1, "chip-check", 3, "chip-check--on"], [1, "chip-check"], [1, "chip-check__flag"]], template: function SubjectsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Mati\u00E8res et programme");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4);
            i0.ɵɵtemplate(8, SubjectsComponent_Conditional_8_Template, 6, 1)(9, SubjectsComponent_Conditional_9_Template, 2, 1, "button", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "nav", 6)(11, "button", 7);
            i0.ɵɵlistener("click", function SubjectsComponent_Template_button_click_11_listener() { return ctx.changeTab("CATALOGUE"); });
            i0.ɵɵtext(12, " Catalogue des mati\u00E8res ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 7);
            i0.ɵɵlistener("click", function SubjectsComponent_Template_button_click_13_listener() { return ctx.changeTab("PROGRAMME"); });
            i0.ɵɵtext(14, " Programme et coefficients ");
            i0.ɵɵtemplate(15, SubjectsComponent_Conditional_15_Template, 2, 1, "span", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(16, SubjectsComponent_Conditional_16_Template, 1, 0, "eduops-loading-state", 9)(17, SubjectsComponent_Conditional_17_Template, 1, 0, "eduops-error-state")(18, SubjectsComponent_Conditional_18_Template, 2, 2)(19, SubjectsComponent_Conditional_19_Template, 4, 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_8_0;
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate3(" ", ctx.activeSubjects().length, " mati\u00E8re(s) \u2014 ", ctx.readyCount(), "/", ctx.levels().length, " niveau(x) avec un programme ");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.tab() === "CATALOGUE" ? 8 : 9);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "CATALOGUE");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "CATALOGUE");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "PROGRAMME");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "PROGRAMME");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.levelsWithoutProgramme().length > 0 ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 16 : ctx.error() ? 17 : 18);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_8_0 = ctx.panel()) ? 19 : -1, tmp_8_0);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.MaxValidator, i1.FormGroupDirective, i1.FormControlName, FormsModule, i1.NgModel, RouterLink,
            LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.lead[_ngcontent-%COMP%] {\n  max-width: 720px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n.linklike[_ngcontent-%COMP%] {\n  padding: 0;\n  font: inherit;\n  color: var(--brand);\n  background: none;\n  border: none;\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n\n\n\n.tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n\n\n\n.pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-pill);\n\n  &--ok { color: var(--success); background: var(--success-bg); }\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n  &--lock { color: var(--info); background: var(--info-bg); }\n  &--muted { color: var(--text-muted); background: var(--surface-sunken); }\n  &--archived { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n.dot[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  margin-right: var(--space-2);\n  border-radius: 50%;\n  vertical-align: middle;\n}\n\n.muted[_ngcontent-%COMP%] {\n  margin-left: var(--space-2);\n  font-size: var(--text-xs);\n  color: var(--text-light);\n}\n\n\n\n\n.subject[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  border-top: 3px solid var(--subject-color, var(--brand));\n\n  &--archived { opacity: .6; }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-4) var(--space-2);\n  }\n\n  &__title { min-width: 0; }\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__body { flex: 1; padding: 0 var(--space-4) var(--space-3); }\n\n  &__usage {\n    margin: 0;\n    font-size: var(--text-sm);\n    color: var(--text-normal);\n\n    &--none { color: var(--text-light); font-style: italic; }\n  }\n\n  &__note {\n    margin: var(--space-2) 0 0;\n    font-size: var(--text-xs);\n    line-height: var(--leading-relaxed);\n    color: var(--text-muted);\n  }\n\n  &__footer {\n    display: flex;\n    gap: var(--space-1);\n    padding: var(--space-2) var(--space-3);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n\n\n\n.alert-block[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-4);\n  padding: var(--space-4);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 26px;\n    height: 26px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-3) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n\n.levels[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n\n.level[_ngcontent-%COMP%] {\n  overflow: hidden;\n\n  &--open { box-shadow: var(--shadow-sm); }\n\n  &__head {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    width: 100%;\n    padding: var(--space-3) var(--space-4);\n    text-align: left;\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { background: var(--surface-hover); }\n  }\n\n  &__identity { display: flex; flex-direction: column; min-width: 130px; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { font-size: var(--text-xs); color: var(--text-light); }\n\n  &__stats {\n    flex: 1;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n\n  &__chevron {\n    width: 20px;\n    text-align: center;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n  }\n\n  &__body {\n    padding: 0 var(--space-4) var(--space-4);\n    border-top: 1px solid var(--border-light);\n  }\n\n  &__empty {\n    margin: var(--space-3) 0;\n    padding: var(--space-4);\n    text-align: center;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    margin-top: var(--space-2);\n  }\n\n  @media (max-width: 760px) {\n    &__stats { display: none; }\n  }\n}\n\n.table-wrapper[_ngcontent-%COMP%] { overflow-x: auto; margin-top: var(--space-3); }\n\n.input--tiny[_ngcontent-%COMP%] { width: 80px; padding: 4px var(--space-2); text-align: right; }\n\n.cell-actions[_ngcontent-%COMP%] { text-align: right; white-space: nowrap; }\n\n.add-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: var(--space-3);\n  margin-top: var(--space-3);\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  .field { flex: 1; min-width: 180px; }\n  .field--tiny { flex: none; width: 110px; min-width: 0; }\n}\n\n\n\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgba(15, 23, 42, .45);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n\n  &__close {\n    font-size: 1.5rem;\n    line-height: 1;\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { color: var(--text-strong); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__section {\n    margin: 0 0 var(--space-2);\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--brand);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.grid2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.swatches[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n.swatch[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border: 2px solid transparent;\n  border-radius: var(--radius-input);\n  cursor: pointer;\n\n  &--on {\n    border-color: var(--text-strong);\n    box-shadow: 0 0 0 2px var(--surface-card) inset;\n  }\n}\n\n.picker[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  max-height: 260px;\n  overflow-y: auto;\n\n  &__row {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-2);\n    padding: var(--space-1) var(--space-2);\n    border-radius: var(--radius-input);\n\n    &:hover { background: var(--surface-hover); }\n  }\n\n  &__check {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex: 1;\n    min-width: 0;\n    font-size: var(--text-sm);\n    cursor: pointer;\n  }\n\n  &__name {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n}\n\n.total[_ngcontent-%COMP%] {\n  margin: var(--space-2) 0 0;\n  font-size: var(--text-sm);\n  color: var(--text-normal);\n}\n\n.cycle[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-3);\n\n  &__all {\n    padding: 0;\n    font-size: var(--text-xs);\n    font-weight: 600;\n    color: var(--brand);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__levels {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-2);\n    margin-top: var(--space-2);\n  }\n}\n\n.chip-check[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-1) var(--space-3);\n  font-size: var(--text-sm);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-pill);\n  cursor: pointer;\n\n  input { margin: 0; }\n\n  &--on {\n    border-color: var(--brand);\n    background: var(--brand-tint);\n  }\n\n  &__flag {\n    font-size: var(--text-xs);\n    color: var(--warning);\n  }\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SubjectsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-subjects', standalone: true, imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,
                    LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Mati\u00E8res et programme</h1>\n      <p class=\"page__meta numeric\">\n        {{ activeSubjects().length }} mati\u00E8re(s) \u2014\n        {{ readyCount() }}/{{ levels().length }} niveau(x) avec un programme\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      @if (tab() === 'CATALOGUE') {\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"toggleArchived()\">\n          {{ showArchived() ? 'Masquer les archiv\u00E9es' : 'Voir les archiv\u00E9es' }}\n        </button>\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openSubject()\">\n          <span aria-hidden=\"true\">+</span> Nouvelle mati\u00E8re\n        </button>\n      } @else {\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"activeSubjects().length === 0\"\n                (click)=\"openApply()\">\n          Appliquer \u00E0 plusieurs niveaux\n        </button>\n      }\n    </div>\n  </header>\n\n  <nav class=\"tabs\" role=\"tablist\">\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'CATALOGUE'\"\n            [attr.aria-selected]=\"tab() === 'CATALOGUE'\"\n            (click)=\"changeTab('CATALOGUE')\">\n      Catalogue des mati\u00E8res\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'PROGRAMME'\"\n            [attr.aria-selected]=\"tab() === 'PROGRAMME'\"\n            (click)=\"changeTab('PROGRAMME')\">\n      Programme et coefficients\n      @if (levelsWithoutProgramme().length > 0) {\n        <span class=\"tabs__badge numeric\">{{ levelsWithoutProgramme().length }}</span>\n      }\n    </button>\n  </nav>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des mati\u00E8res...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Catalogue \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (tab() === 'CATALOGUE') {\n      <p class=\"lead\">\n        Une mati\u00E8re existe une seule fois pour tout l'\u00E9tablissement. Ce qui change\n        d'un niveau \u00E0 l'autre, c'est son coefficient \u2014 il se r\u00E8gle dans l'onglet\n        <button type=\"button\" class=\"linklike\" (click)=\"changeTab('PROGRAMME')\">\n          Programme et coefficients</button>.\n      </p>\n\n      <section class=\"grid grid--3\">\n        @for (subject of subjects(); track subject.id) {\n          <article class=\"subject card\"\n                   [class.subject--archived]=\"subject.status !== 'ACTIVE'\"\n                   [style.--subject-color]=\"subject.colorHex || 'var(--brand)'\">\n            <header class=\"subject__head\">\n              <div class=\"subject__title\">\n                <h2 class=\"subject__name\">{{ subject.name }}</h2>\n                <p class=\"subject__meta numeric\">\n                  {{ subject.code }} \u00B7 {{ subject.categoryLabel }}\n                </p>\n              </div>\n              @if (!subject.graded) {\n                <span class=\"pill pill--muted\">Non not\u00E9e</span>\n              }\n              @if (subject.status !== 'ACTIVE') {\n                <span class=\"pill pill--archived\">Archiv\u00E9e</span>\n              }\n            </header>\n\n            <div class=\"subject__body\">\n              @if (subject.levelCount > 0) {\n                <p class=\"subject__usage numeric\">\n                  Au programme de <strong>{{ subject.levelCount }}</strong> niveau(x)\n                </p>\n              } @else {\n                <p class=\"subject__usage subject__usage--none\">\n                  Au programme d'aucun niveau\n                </p>\n              }\n              @if (!subject.graded) {\n                <p class=\"subject__note\">\n                  Elle appara\u00EEt dans l'emploi du temps mais n'entre dans aucune moyenne.\n                </p>\n              }\n            </div>\n\n            <footer class=\"subject__footer\">\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                      (click)=\"openSubject(subject)\">Modifier</button>\n              @if (subject.status === 'ACTIVE') {\n                <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                        [disabled]=\"subject.levelCount > 0\"\n                        [attr.title]=\"subject.levelCount > 0\n                          ? 'Retirez-la d\\'abord des programmes' : null\"\n                        (click)=\"archiveSubject(subject)\">Archiver</button>\n              } @else {\n                <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                        (click)=\"restoreSubject(subject)\">R\u00E9activer</button>\n              }\n            </footer>\n          </article>\n        } @empty {\n          <div class=\"empty-state\">\n            <p class=\"empty-state__title\">Aucune mati\u00E8re d\u00E9clar\u00E9e.</p>\n            <p class=\"empty-state__text\">\n              Commencez par la liste de ce que votre \u00E9tablissement enseigne.\n              Les coefficients viendront ensuite, niveau par niveau.\n            </p>\n            <button type=\"button\" class=\"btn btn--primary\" (click)=\"openSubject()\">\n              D\u00E9clarer une mati\u00E8re\n            </button>\n          </div>\n        }\n      </section>\n    }\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Programme \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (tab() === 'PROGRAMME') {\n\n      @if (levelsWithoutProgramme().length > 0) {\n        <section class=\"alert-block\" role=\"status\">\n          <div class=\"alert-block__head\">\n            <span class=\"alert-block__icon\" aria-hidden=\"true\">!</span>\n            <div>\n              <p class=\"alert-block__title\">\n                {{ levelsWithoutProgramme().length }} niveau(x) sans programme\n              </p>\n              <p class=\"alert-block__text\">\n                Sans mati\u00E8re not\u00E9e, aucune moyenne ne peut \u00EAtre calcul\u00E9e et aucun\n                bulletin publi\u00E9 pour ces niveaux.\n              </p>\n            </div>\n          </div>\n          <ul class=\"pending\">\n            @for (level of levelsWithoutProgramme(); track level.levelId) {\n              <li class=\"pending__item\">\n                <span class=\"pending__name\">{{ level.levelName }}</span>\n                <span class=\"pending__cycle\">{{ level.cycleName }}</span>\n                <button type=\"button\" class=\"btn btn--primary btn--sm\"\n                        (click)=\"openApply(level.levelId)\">D\u00E9finir le programme</button>\n              </li>\n            }\n          </ul>\n        </section>\n      }\n\n      @if (activeSubjects().length === 0) {\n        <div class=\"empty-state\">\n          <p class=\"empty-state__title\">D\u00E9clarez d'abord vos mati\u00E8res.</p>\n          <p class=\"empty-state__text\">\n            Le programme rattache des mati\u00E8res existantes \u00E0 chaque niveau.\n            Il n'y a rien \u00E0 rattacher pour l'instant.\n          </p>\n          <button type=\"button\" class=\"btn btn--primary\" (click)=\"changeTab('CATALOGUE')\">\n            Aller au catalogue\n          </button>\n        </div>\n      }\n\n      <section class=\"levels\">\n        @for (level of levels(); track level.levelId) {\n          <article class=\"level card\" [class.level--open]=\"openLevelId() === level.levelId\">\n            <button type=\"button\" class=\"level__head\" (click)=\"toggleLevel(level.levelId)\"\n                    [attr.aria-expanded]=\"openLevelId() === level.levelId\">\n              <span class=\"level__identity\">\n                <span class=\"level__name\">{{ level.levelName }}</span>\n                <span class=\"level__cycle\">{{ level.cycleName }}</span>\n              </span>\n              <span class=\"level__stats numeric\">\n                @if (level.subjectCount > 0) {\n                  {{ level.subjectCount }} mati\u00E8re(s) \u00B7\n                  total des coefficients <strong>{{ level.totalCoefficient }}</strong> \u00B7\n                  {{ level.totalWeeklyHours }} h\n                } @else {\n                  Aucune mati\u00E8re\n                }\n              </span>\n              @if (level.ready) {\n                <span class=\"pill pill--ok\">Pr\u00EAt</span>\n              } @else {\n                <span class=\"pill pill--warn\">\u00C0 d\u00E9finir</span>\n              }\n              <span class=\"level__chevron\" aria-hidden=\"true\">\n                {{ openLevelId() === level.levelId ? '\u2212' : '+' }}\n              </span>\n            </button>\n\n            @if (openLevelId() === level.levelId) {\n              <div class=\"level__body\">\n                @if (level.subjects.length > 0) {\n                  <div class=\"table-wrapper\">\n                    <table class=\"table\">\n                      <caption class=\"visually-hidden\">\n                        Programme du niveau {{ level.levelName }}\n                      </caption>\n                      <thead>\n                        <tr>\n                          <th>Mati\u00E8re</th>\n                          <th class=\"numeric\">Coefficient</th>\n                          <th class=\"numeric\">Heures / semaine</th>\n                          <th>Statut</th>\n                          <th><span class=\"visually-hidden\">Actions</span></th>\n                        </tr>\n                      </thead>\n                      <tbody>\n                        @for (row of level.subjects; track row.subjectId) {\n                          <tr>\n                            <td>\n                              <span class=\"dot\" aria-hidden=\"true\"\n                                    [style.background]=\"row.subjectColor || 'var(--brand)'\"></span>\n                              {{ row.subjectName }}\n                              <span class=\"muted numeric\">{{ row.subjectCode }}</span>\n                            </td>\n                            <td class=\"numeric\">\n                              <input class=\"input input--tiny\" type=\"number\"\n                                     min=\"0.5\" max=\"20\" step=\"0.5\"\n                                     [value]=\"row.coefficient\"\n                                     [disabled]=\"!row.graded\"\n                                     (change)=\"changeCoefficient(level.levelId, row.subjectId,\n                                       $any($event.target).value, row.weeklyHours, row.mandatory)\" />\n                            </td>\n                            <td class=\"numeric\">\n                              <input class=\"input input--tiny\" type=\"number\"\n                                     min=\"0\" max=\"40\" step=\"0.5\"\n                                     [value]=\"row.weeklyHours\"\n                                     (change)=\"changeHours(level.levelId, row.subjectId,\n                                       $any($event.target).value, row.coefficient, row.mandatory)\" />\n                            </td>\n                            <td>\n                              @if (!row.graded) {\n                                <span class=\"pill pill--muted\">Non not\u00E9e</span>\n                              } @else if (row.locked) {\n                                <span class=\"pill pill--lock\">Notes saisies</span>\n                              } @else if (!row.mandatory) {\n                                <span class=\"pill pill--muted\">Option</span>\n                              }\n                            </td>\n                            <td class=\"cell-actions\">\n                              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                                      [disabled]=\"row.locked\"\n                                      [attr.title]=\"row.locked\n                                        ? 'Des \u00E9valuations existent d\u00E9j\u00E0' : null\"\n                                      (click)=\"removeRow(level.levelId, row.subjectId,\n                                                         row.subjectName)\">\n                                Retirer\n                              </button>\n                            </td>\n                          </tr>\n                        }\n                      </tbody>\n                    </table>\n                  </div>\n                } @else {\n                  <p class=\"level__empty\">\n                    Aucune mati\u00E8re rattach\u00E9e \u00E0 ce niveau.\n                  </p>\n                }\n\n                <!-- Ajouter une mati\u00E8re -->\n                @if (availableFor(level).length > 0) {\n                  <form class=\"add-row\" [formGroup]=\"rowForm\"\n                        (ngSubmit)=\"addRow(level)\">\n                    <div class=\"field\">\n                      <label class=\"field__label\" [attr.for]=\"'sub-' + level.levelId\">\n                        Mati\u00E8re\n                      </label>\n                      <select class=\"select\" [id]=\"'sub-' + level.levelId\"\n                              formControlName=\"subjectId\">\n                        <option value=\"\">Choisir\u2026</option>\n                        @for (subject of availableFor(level); track subject.id) {\n                          <option [value]=\"subject.id\">\n                            {{ subject.name }}@if (!subject.graded) { (non not\u00E9e) }\n                          </option>\n                        }\n                      </select>\n                    </div>\n                    <div class=\"field field--tiny\">\n                      <label class=\"field__label\" [attr.for]=\"'coef-' + level.levelId\">\n                        Coefficient\n                      </label>\n                      <input class=\"input\" [id]=\"'coef-' + level.levelId\" type=\"number\"\n                             min=\"0.5\" max=\"20\" step=\"0.5\" formControlName=\"coefficient\" />\n                    </div>\n                    <div class=\"field field--tiny\">\n                      <label class=\"field__label\" [attr.for]=\"'h-' + level.levelId\">\n                        Heures\n                      </label>\n                      <input class=\"input\" [id]=\"'h-' + level.levelId\" type=\"number\"\n                             min=\"0\" max=\"40\" step=\"0.5\" formControlName=\"weeklyHours\" />\n                    </div>\n                    <button type=\"submit\" class=\"btn btn--secondary\"\n                            [disabled]=\"rowForm.invalid || saving()\">Ajouter</button>\n                  </form>\n                } @else if (activeSubjects().length > 0) {\n                  <p class=\"level__empty\">\n                    Toutes les mati\u00E8res du catalogue sont d\u00E9j\u00E0 au programme de ce niveau.\n                  </p>\n                }\n\n                <footer class=\"level__foot\">\n                  <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                          [disabled]=\"level.subjects.length === 0\"\n                          (click)=\"openApply(level.levelId)\">\n                    Copier ce programme vers d'autres niveaux\n                  </button>\n                </footer>\n              </div>\n            }\n          </article>\n        } @empty {\n          <div class=\"empty-state\">\n            <p class=\"empty-state__title\">Aucun niveau d\u00E9fini.</p>\n            <p class=\"empty-state__text\">\n              Le programme se rattache aux niveaux. Cr\u00E9ez-les d'abord dans\n              <a routerLink=\"/setup\">la configuration</a>.\n            </p>\n          </div>\n        }\n      </section>\n    }\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau lat\u00E9ral \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (panel(); as openPanel) {\n    <div class=\"drawer-backdrop\" (click)=\"closePanel()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\">\n\n      <!-- \u2500\u2500\u2500 Mati\u00E8re \u2500\u2500\u2500 -->\n      @if (openPanel === 'SUBJECT') {\n        <header class=\"drawer__head\">\n          <h2 class=\"drawer__title\">\n            {{ editingSubject() ? 'Modifier la mati\u00E8re' : 'Nouvelle mati\u00E8re' }}\n          </h2>\n          <button type=\"button\" class=\"drawer__close\" (click)=\"closePanel()\"\n                  aria-label=\"Fermer\">&times;</button>\n        </header>\n        <form class=\"drawer__body\" [formGroup]=\"subjectForm\">\n          <div class=\"grid2\">\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"name\">Nom</label>\n              <input id=\"name\" class=\"input\" formControlName=\"name\"\n                     placeholder=\"Math\u00E9matiques\" />\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"code\">Code</label>\n              <input id=\"code\" class=\"input\" formControlName=\"code\" placeholder=\"MATH\" />\n              <span class=\"field__hint\">\n                Mis en majuscules sans accent : il sert dans les exports.\n              </span>\n            </div>\n          </div>\n\n          <div class=\"grid2\">\n            <div class=\"field\">\n              <label class=\"field__label\" for=\"shortName\">Abr\u00E9viation</label>\n              <input id=\"shortName\" class=\"input\" formControlName=\"shortName\"\n                     placeholder=\"Maths\" />\n              <span class=\"field__hint\">Affich\u00E9e dans l'emploi du temps.</span>\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"category\">\n                Cat\u00E9gorie\n              </label>\n              <select id=\"category\" class=\"select\" formControlName=\"category\">\n                @for (item of categories; track item.code) {\n                  <option [value]=\"item.code\">{{ item.label }}</option>\n                }\n              </select>\n            </div>\n          </div>\n\n          <div class=\"field\">\n            <span class=\"field__label\">Couleur</span>\n            <div class=\"swatches\">\n              @for (color of colors; track color) {\n                <button type=\"button\" class=\"swatch\"\n                        [class.swatch--on]=\"subjectForm.controls.colorHex.value === color\"\n                        [style.background]=\"color\"\n                        [attr.aria-label]=\"'Couleur ' + color\"\n                        (click)=\"pickColor(color)\"></button>\n              }\n            </div>\n            <span class=\"field__hint\">Sert \u00E0 rep\u00E9rer la mati\u00E8re dans la grille horaire.</span>\n          </div>\n\n          <label class=\"switch\">\n            <input type=\"checkbox\" formControlName=\"graded\" />\n            <span>Mati\u00E8re not\u00E9e, qui entre dans les moyennes</span>\n          </label>\n          @if (!subjectForm.controls.graded.value) {\n            <p class=\"hint-block\">\n              Une mati\u00E8re non not\u00E9e figure \u00E0 l'emploi du temps et sur le bulletin,\n              mais son coefficient n'entre dans aucun calcul. C'est le cas de la\n              vie scolaire ou des activit\u00E9s d'\u00E9veil.\n            </p>\n          }\n        </form>\n        <footer class=\"drawer__foot\">\n          <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closePanel()\">\n            Annuler\n          </button>\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"subjectForm.invalid || saving()\" (click)=\"submitSubject()\">\n            {{ saving() ? 'Enregistrement...' : 'Enregistrer' }}\n          </button>\n        </footer>\n      }\n\n      <!-- \u2500\u2500\u2500 Application group\u00E9e \u2500\u2500\u2500 -->\n      @if (openPanel === 'APPLY') {\n        <header class=\"drawer__head\">\n          <h2 class=\"drawer__title\">Appliquer un programme</h2>\n          <button type=\"button\" class=\"drawer__close\" (click)=\"closePanel()\"\n                  aria-label=\"Fermer\">&times;</button>\n        </header>\n        <div class=\"drawer__body\">\n          <p class=\"hint-block\">\n            Dans un cycle, le programme change rarement d'un niveau \u00E0 l'autre.\n            Remplir quatre fois le m\u00EAme tableau, c'est quatre occasions de se tromper\n            de coefficient \u2014 et une erreur reste invisible jusqu'au premier bulletin.\n          </p>\n\n          <section>\n            <h3 class=\"drawer__section\">1 \u00B7 Les mati\u00E8res et leurs coefficients</h3>\n            <ul class=\"picker\">\n              @for (subject of activeSubjects(); track subject.id) {\n                <li class=\"picker__row\">\n                  <label class=\"picker__check\">\n                    <input type=\"checkbox\" [checked]=\"isApplyRow(subject.id)\"\n                           (change)=\"toggleApplyRow(subject.id)\" />\n                    <span class=\"dot\" aria-hidden=\"true\"\n                          [style.background]=\"subject.colorHex || 'var(--brand)'\"></span>\n                    <span class=\"picker__name\">{{ subject.name }}</span>\n                    @if (!subject.graded) {\n                      <span class=\"pill pill--muted\">Non not\u00E9e</span>\n                    }\n                  </label>\n                  @if (isApplyRow(subject.id)) {\n                    <input class=\"input input--tiny\" type=\"number\"\n                           min=\"0.5\" max=\"20\" step=\"0.5\"\n                           [value]=\"applyCoefficientOf(subject.id)\"\n                           [disabled]=\"!subject.graded\"\n                           (change)=\"setApplyCoefficient(subject.id,\n                                                         $any($event.target).value)\" />\n                  }\n                </li>\n              }\n            </ul>\n            @if (applyRows().size > 0) {\n              <p class=\"total numeric\">\n                Total des coefficients : <strong>{{ applyTotal() }}</strong>\n              </p>\n            }\n          </section>\n\n          <section>\n            <h3 class=\"drawer__section\">2 \u00B7 Les niveaux concern\u00E9s</h3>\n            @for (cycle of cycles(); track cycle.id) {\n              <div class=\"cycle\">\n                <button type=\"button\" class=\"cycle__all\"\n                        (click)=\"toggleCycleTargets(cycle.id)\">\n                  {{ cycle.name }} \u2014 tout s\u00E9lectionner\n                </button>\n                <div class=\"cycle__levels\">\n                  @for (level of cycle.levels; track level.levelId) {\n                    <label class=\"chip-check\" [class.chip-check--on]=\"isTargeted(level.levelId)\">\n                      <input type=\"checkbox\" [checked]=\"isTargeted(level.levelId)\"\n                             (change)=\"toggleTarget(level.levelId)\" />\n                      <span>{{ level.levelName }}</span>\n                      @if (!level.ready) {\n                        <span class=\"chip-check__flag\">vide</span>\n                      }\n                    </label>\n                  }\n                </div>\n              </div>\n            }\n          </section>\n\n          <label class=\"switch\">\n            <input type=\"checkbox\" [(ngModel)]=\"applyReplace\" name=\"applyReplace\" />\n            <span>Remplacer le programme existant de ces niveaux</span>\n          </label>\n          <p class=\"hint-block\">\n            @if (applyReplace) {\n              Les mati\u00E8res absentes de cette liste seront retir\u00E9es \u2014 sauf celles qui\n              portent d\u00E9j\u00E0 des \u00E9valuations, qui sont conserv\u00E9es.\n            } @else {\n              Seules les mati\u00E8res absentes seront ajout\u00E9es. Les coefficients d\u00E9j\u00E0\n              r\u00E9gl\u00E9s sur un niveau ne sont pas \u00E9cras\u00E9s.\n            }\n          </p>\n        </div>\n        <footer class=\"drawer__foot\">\n          <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closePanel()\">\n            Annuler\n          </button>\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"!canApply()\" (click)=\"submitApply()\">\n            {{ saving()\n               ? 'Application...'\n               : 'Appliquer \u00E0 ' + applyTargets().length + ' niveau(x)' }}\n          </button>\n        </footer>\n      }\n    </aside>\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n.lead {\n  max-width: 720px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n.linklike {\n  padding: 0;\n  font: inherit;\n  color: var(--brand);\n  background: none;\n  border: none;\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Onglets \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.tabs {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Pastilles \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.pill {\n  display: inline-block;\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-pill);\n\n  &--ok { color: var(--success); background: var(--success-bg); }\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n  &--lock { color: var(--info); background: var(--info-bg); }\n  &--muted { color: var(--text-muted); background: var(--surface-sunken); }\n  &--archived { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n.dot {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  margin-right: var(--space-2);\n  border-radius: 50%;\n  vertical-align: middle;\n}\n\n.muted {\n  margin-left: var(--space-2);\n  font-size: var(--text-xs);\n  color: var(--text-light);\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Cartes mati\u00E8re \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.subject {\n  display: flex;\n  flex-direction: column;\n  border-top: 3px solid var(--subject-color, var(--brand));\n\n  &--archived { opacity: .6; }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-4) var(--space-2);\n  }\n\n  &__title { min-width: 0; }\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__body { flex: 1; padding: 0 var(--space-4) var(--space-3); }\n\n  &__usage {\n    margin: 0;\n    font-size: var(--text-sm);\n    color: var(--text-normal);\n\n    &--none { color: var(--text-light); font-style: italic; }\n  }\n\n  &__note {\n    margin: var(--space-2) 0 0;\n    font-size: var(--text-xs);\n    line-height: var(--leading-relaxed);\n    color: var(--text-muted);\n  }\n\n  &__footer {\n    display: flex;\n    gap: var(--space-1);\n    padding: var(--space-2) var(--space-3);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Alerte niveaux sans programme \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.alert-block {\n  margin-bottom: var(--space-4);\n  padding: var(--space-4);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 26px;\n    height: 26px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-3) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Niveaux \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.levels {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n\n.level {\n  overflow: hidden;\n\n  &--open { box-shadow: var(--shadow-sm); }\n\n  &__head {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    width: 100%;\n    padding: var(--space-3) var(--space-4);\n    text-align: left;\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { background: var(--surface-hover); }\n  }\n\n  &__identity { display: flex; flex-direction: column; min-width: 130px; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { font-size: var(--text-xs); color: var(--text-light); }\n\n  &__stats {\n    flex: 1;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n\n  &__chevron {\n    width: 20px;\n    text-align: center;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n  }\n\n  &__body {\n    padding: 0 var(--space-4) var(--space-4);\n    border-top: 1px solid var(--border-light);\n  }\n\n  &__empty {\n    margin: var(--space-3) 0;\n    padding: var(--space-4);\n    text-align: center;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    margin-top: var(--space-2);\n  }\n\n  @media (max-width: 760px) {\n    &__stats { display: none; }\n  }\n}\n\n.table-wrapper { overflow-x: auto; margin-top: var(--space-3); }\n\n.input--tiny { width: 80px; padding: 4px var(--space-2); text-align: right; }\n\n.cell-actions { text-align: right; white-space: nowrap; }\n\n.add-row {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: var(--space-3);\n  margin-top: var(--space-3);\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  .field { flex: 1; min-width: 180px; }\n  .field--tiny { flex: none; width: 110px; min-width: 0; }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau lat\u00E9ral \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgba(15, 23, 42, .45);\n}\n\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n\n  &__close {\n    font-size: 1.5rem;\n    line-height: 1;\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { color: var(--text-strong); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__section {\n    margin: 0 0 var(--space-2);\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--brand);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.grid2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.swatches { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n.swatch {\n  width: 26px;\n  height: 26px;\n  border: 2px solid transparent;\n  border-radius: var(--radius-input);\n  cursor: pointer;\n\n  &--on {\n    border-color: var(--text-strong);\n    box-shadow: 0 0 0 2px var(--surface-card) inset;\n  }\n}\n\n.picker {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  max-height: 260px;\n  overflow-y: auto;\n\n  &__row {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-2);\n    padding: var(--space-1) var(--space-2);\n    border-radius: var(--radius-input);\n\n    &:hover { background: var(--surface-hover); }\n  }\n\n  &__check {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex: 1;\n    min-width: 0;\n    font-size: var(--text-sm);\n    cursor: pointer;\n  }\n\n  &__name {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n}\n\n.total {\n  margin: var(--space-2) 0 0;\n  font-size: var(--text-sm);\n  color: var(--text-normal);\n}\n\n.cycle {\n  margin-bottom: var(--space-3);\n\n  &__all {\n    padding: 0;\n    font-size: var(--text-xs);\n    font-weight: 600;\n    color: var(--brand);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__levels {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-2);\n    margin-top: var(--space-2);\n  }\n}\n\n.chip-check {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-1) var(--space-3);\n  font-size: var(--text-sm);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-pill);\n  cursor: pointer;\n\n  input { margin: 0; }\n\n  &--on {\n    border-color: var(--brand);\n    background: var(--brand-tint);\n  }\n\n  &__flag {\n    font-size: var(--text-xs);\n    color: var(--warning);\n  }\n}\n\n.empty-state {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SubjectsComponent, { className: "SubjectsComponent", filePath: "frontend/src/app/features/subjects/subjects.component.ts", lineNumber: 40 }); })();
//# sourceMappingURL=subjects.component.js.map