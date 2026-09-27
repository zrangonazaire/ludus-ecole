import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CLASSROOM_DATA_SOURCE } from '@core/datasource/data-source';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.levelId;
const _c0 = a0 => ({ classroomId: a0 });
function ClassListComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 8);
} }
function ClassListComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 10);
    i0.ɵɵlistener("retry", function ClassListComponent_Conditional_15_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function ClassListComponent_Conditional_16_Conditional_0_For_11_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "em");
    i0.ɵɵtext(1, "aucune classe");
    i0.ɵɵelementEnd();
} }
function ClassListComponent_Conditional_16_Conditional_0_For_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 20)(1, "span", 21);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 22);
    i0.ɵɵtext(4);
    i0.ɵɵtemplate(5, ClassListComponent_Conditional_16_Conditional_0_For_11_Conditional_5_Template, 2, 0, "em");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 23);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_16_Conditional_0_For_11_Template_button_click_6_listener() { const level_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openCreate(level_r4.levelId)); });
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const level_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r4.levelName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" ", level_r4.totalEnrolled, "/", level_r4.totalCapacity, " \u2014 ", level_r4.occupancyRate, " % ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(level_r4.classroomCount === 0 ? 5 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Ouvrir ", level_r4.suggestedName, " ");
} }
function ClassListComponent_Conditional_16_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 11)(1, "div", 15)(2, "span", 16);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 17);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 18);
    i0.ɵɵtext(8, " Le nombre de classes pr\u00E9vu \u00E0 la configuration ne suffit plus. Ouvrez-en une de plus : le nom continue la s\u00E9rie existante. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "ul", 19);
    i0.ɵɵrepeaterCreate(10, ClassListComponent_Conditional_16_Conditional_0_For_11_Template, 8, 6, "li", 20, _forTrack1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.crowdedLevels().length, " niveau(x) arrivent \u00E0 saturation ");
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.crowdedLevels());
} }
function ClassListComponent_Conditional_16_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 26);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_16_Conditional_1_For_2_Template_button_click_0_listener() { const level_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.filterByLevel(level_r6.levelId)); });
    i0.ɵɵelementStart(1, "span", 27);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 28);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 29);
    i0.ɵɵelement(6, "span", 30);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const level_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("level-chip--on", ctx_r1.levelFilter() === level_r6.levelId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r6.levelName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", level_r6.classroomCount, " cl. \u2014 ", level_r6.occupancyRate, " % ");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", level_r6.occupancyRate > 100 ? 100 : level_r6.occupancyRate, "%");
    i0.ɵɵclassProp("level-chip__fill--hot", level_r6.needsMoreClasses);
} }
function ClassListComponent_Conditional_16_Conditional_1_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_16_Conditional_1_Conditional_3_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.filterByLevel(null)); });
    i0.ɵɵtext(1, " Tout afficher ");
    i0.ɵɵelementEnd();
} }
function ClassListComponent_Conditional_16_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 12);
    i0.ɵɵrepeaterCreate(1, ClassListComponent_Conditional_16_Conditional_1_For_2_Template, 7, 9, "button", 24, _forTrack1);
    i0.ɵɵtemplate(3, ClassListComponent_Conditional_16_Conditional_1_Conditional_3_Template, 2, 0, "button", 25);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.levels());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.levelFilter() ? 3 : -1);
} }
function ClassListComponent_Conditional_16_For_4_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 45);
    i0.ɵɵtext(1, " Cette classe est en brouillon : elle n'accepte pas encore d'inscriptions. ");
    i0.ɵɵelementEnd();
} }
function ClassListComponent_Conditional_16_For_4_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_16_For_4_Conditional_38_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const classroom_r10 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.activate(classroom_r10)); });
    i0.ɵɵtext(1, " Ouvrir ");
    i0.ɵɵelementEnd();
} }
function ClassListComponent_Conditional_16_For_4_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_16_For_4_Conditional_39_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const classroom_r10 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.close(classroom_r10)); });
    i0.ɵɵtext(1, " Fermer ");
    i0.ɵɵelementEnd();
} }
function ClassListComponent_Conditional_16_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 32)(1, "header", 33)(2, "div")(3, "h2", 34);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 35);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "eduops-status-badge", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 37)(9, "div", 38)(10, "div", 39);
    i0.ɵɵelement(11, "span", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p", 41)(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(15);
    i0.ɵɵelementStart(16, "span", 42);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "dl", 43)(19, "div")(20, "dt");
    i0.ɵɵtext(21, "Places restantes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "dd", 44);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div")(25, "dt");
    i0.ɵɵtext(26, "Places projet\u00E9es");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "dd", 44);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div")(30, "dt");
    i0.ɵɵtext(31, "Professeur principal");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "dd");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(34, ClassListComponent_Conditional_16_For_4_Conditional_34_Template, 2, 0, "p", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "footer", 46)(36, "button", 31);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_16_For_4_Template_button_click_36_listener() { const classroom_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openEdit(classroom_r10)); });
    i0.ɵɵtext(37, " Modifier ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(38, ClassListComponent_Conditional_16_For_4_Conditional_38_Template, 2, 0, "button", 25)(39, ClassListComponent_Conditional_16_For_4_Conditional_39_Template, 2, 0, "button", 25);
    i0.ɵɵelementStart(40, "a", 47);
    i0.ɵɵtext(41, "\u00C9l\u00E8ves");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "a", 48);
    i0.ɵɵtext(43, "Emploi du temps");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_23_0;
    let tmp_24_0;
    let tmp_25_0;
    const classroom_r10 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("class-card--draft", classroom_r10.status === "DRAFT");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(classroom_r10.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", classroom_r10.code, " \u2014 ", classroom_r10.levelName, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("status", classroom_r10.capacityStatus);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", classroom_r10.activeEnrollments + " \u00E9l\u00E8ves sur " + classroom_r10.capacityMaximum);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", classroom_r10.occupancyRate > 100 ? 100 : classroom_r10.occupancyRate, "%")("background", ctx_r1.gaugeTone(classroom_r10));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(classroom_r10.activeEnrollments);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" / ", classroom_r10.capacityMaximum, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("(", classroom_r10.occupancyRate, " %)");
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("negative", classroom_r10.availableSeats <= 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", classroom_r10.availableSeats, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("negative", ((tmp_23_0 = classroom_r10.projectedAvailableSeats) !== null && tmp_23_0 !== undefined ? tmp_23_0 : 0) < 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (tmp_24_0 = classroom_r10.projectedAvailableSeats) !== null && tmp_24_0 !== undefined ? tmp_24_0 : classroom_r10.availableSeats, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_25_0 = classroom_r10.mainTeacherName) !== null && tmp_25_0 !== undefined ? tmp_25_0 : "Non affect\u00E9");
    i0.ɵɵadvance();
    i0.ɵɵconditional(classroom_r10.status === "DRAFT" ? 34 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(classroom_r10.status === "DRAFT" ? 38 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(classroom_r10.status === "ACTIVE" && classroom_r10.activeEnrollments === 0 ? 39 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction1(26, _c0, classroom_r10.id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction1(28, _c0, classroom_r10.id));
} }
function ClassListComponent_Conditional_16_ForEmpty_5_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucune classe sur ce niveau. ");
} }
function ClassListComponent_Conditional_16_ForEmpty_5_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucune classe d\u00E9finie pour cette ann\u00E9e scolaire. ");
} }
function ClassListComponent_Conditional_16_ForEmpty_5_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 51);
    i0.ɵɵtext(1, " D\u00E9finissez d'abord vos cycles et vos niveaux dans ");
    i0.ɵɵelementStart(2, "a", 52);
    i0.ɵɵtext(3, "la configuration");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, ". ");
    i0.ɵɵelementEnd();
} }
function ClassListComponent_Conditional_16_ForEmpty_5_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14)(1, "p", 49);
    i0.ɵɵtemplate(2, ClassListComponent_Conditional_16_ForEmpty_5_Conditional_2_Template, 1, 0)(3, ClassListComponent_Conditional_16_ForEmpty_5_Conditional_3_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 50);
    i0.ɵɵtext(5, " Une classe se rattache \u00E0 un niveau et porte un effectif maximum. Les places restantes sont ensuite calcul\u00E9es automatiquement. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 6);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_16_ForEmpty_5_Template_button_click_6_listener() { let tmp_3_0; i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openCreate((tmp_3_0 = ctx_r1.levelFilter()) !== null && tmp_3_0 !== undefined ? tmp_3_0 : undefined)); });
    i0.ɵɵtext(7, " Cr\u00E9er une classe ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, ClassListComponent_Conditional_16_ForEmpty_5_Conditional_8_Template, 5, 0, "p", 51);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.levelFilter() ? 2 : 3);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.levels().length === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.levels().length === 0 ? 8 : -1);
} }
function ClassListComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ClassListComponent_Conditional_16_Conditional_0_Template, 12, 1, "section", 11)(1, ClassListComponent_Conditional_16_Conditional_1_Template, 4, 1, "section", 12);
    i0.ɵɵelementStart(2, "section", 9);
    i0.ɵɵrepeaterCreate(3, ClassListComponent_Conditional_16_For_4_Template, 44, 30, "article", 13, _forTrack0, false, ClassListComponent_Conditional_16_ForEmpty_5_Template, 9, 3, "div", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r1.crowdedLevels().length > 0 ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.levels().length > 0 ? 1 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.visibleClasses());
} }
function ClassListComponent_Conditional_17_Conditional_2_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 62);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r15 = ctx.$implicit;
    i0.ɵɵproperty("value", level_r15.levelId);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3(" ", level_r15.levelName, " \u2014 ", level_r15.classroomCount, " classe(s), ", level_r15.occupancyRate, " % occup\u00E9 ");
} }
function ClassListComponent_Conditional_17_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 55)(1, "h2", 56);
    i0.ɵɵtext(2, "Nouvelle classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 57);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_17_Conditional_2_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "form", 58)(6, "div", 59)(7, "label", 60);
    i0.ɵɵtext(8, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 61);
    i0.ɵɵlistener("change", function ClassListComponent_Conditional_17_Conditional_2_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onLevelChange($event.target.value)); });
    i0.ɵɵrepeaterCreate(10, ClassListComponent_Conditional_17_Conditional_2_For_11_Template, 2, 4, "option", 62, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 63);
    i0.ɵɵtext(13, " Les frais de scolarit\u00E9 et le programme suivent le niveau, pas la classe. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 64)(15, "div", 59)(16, "label", 65);
    i0.ɵɵtext(17, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(18, "input", 66);
    i0.ɵɵelementStart(19, "span", 63);
    i0.ɵɵtext(20, "Propos\u00E9 d'apr\u00E8s la s\u00E9rie existante.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 59)(22, "label", 67);
    i0.ɵɵtext(23, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(24, "input", 68);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 64)(26, "div", 59)(27, "label", 69);
    i0.ɵɵtext(28, " Effectif maximum ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(29, "input", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 59)(31, "label", 71);
    i0.ɵɵtext(32, "Seuil d'alerte (%)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(33, "input", 72);
    i0.ɵɵelementStart(34, "span", 63);
    i0.ɵɵtext(35, "Au-del\u00E0, la classe passe en \u00AB presque pleine \u00BB.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(36, "label", 73);
    i0.ɵɵelement(37, "input", 74);
    i0.ɵɵelementStart(38, "span");
    i0.ɵɵtext(39, "Ouvrir imm\u00E9diatement aux inscriptions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(40, "footer", 75)(41, "button", 76);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_17_Conditional_2_Template_button_click_41_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(42, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "button", 6);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_17_Conditional_2_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitCreate()); });
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("formGroup", ctx_r1.createForm);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r1.levels());
    i0.ɵɵadvance(33);
    i0.ɵɵproperty("disabled", ctx_r1.createForm.invalid || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Cr\u00E9ation..." : "Cr\u00E9er la classe", " ");
} }
function ClassListComponent_Conditional_17_Conditional_3_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 62);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r17 = ctx.$implicit;
    i0.ɵɵproperty("value", level_r17.levelId);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3(" ", level_r17.levelName, " \u2014 ", level_r17.classroomCount, " classe(s), ", level_r17.occupancyRate, " % occup\u00E9 ");
} }
function ClassListComponent_Conditional_17_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 55)(1, "h2", 56);
    i0.ɵɵtext(2, "Ajouter plusieurs classes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 57);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_17_Conditional_3_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "form", 58)(6, "p", 77);
    i0.ɵɵtext(7, " \u00C0 utiliser quand la configuration initiale n'a pas pr\u00E9vu assez de classes. Les noms poursuivent la s\u00E9rie : un niveau ayant d\u00E9j\u00E0 A et B re\u00E7oit C, D, E. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 59)(9, "label", 78);
    i0.ɵɵtext(10, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 79);
    i0.ɵɵrepeaterCreate(12, ClassListComponent_Conditional_17_Conditional_3_For_13_Template, 2, 4, "option", 62, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 64)(15, "div", 59)(16, "label", 80);
    i0.ɵɵtext(17, " Nombre de classes ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(18, "input", 81);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 59)(20, "label", 82);
    i0.ɵɵtext(21, " Effectif de chacune ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(22, "input", 83);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "p", 84);
    i0.ɵɵtext(24, " Places ajout\u00E9es : ");
    i0.ɵɵelementStart(25, "strong");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "label", 73);
    i0.ɵɵelement(28, "input", 74);
    i0.ɵɵelementStart(29, "span");
    i0.ɵɵtext(30, "Ouvrir imm\u00E9diatement aux inscriptions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "footer", 75)(32, "button", 76);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_17_Conditional_3_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(33, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "button", 6);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_17_Conditional_3_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitBulk()); });
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("formGroup", ctx_r1.bulkForm);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r1.levels());
    i0.ɵɵadvance(14);
    i0.ɵɵtextInterpolate(ctx_r1.bulkForm.controls.count.value * ctx_r1.bulkForm.controls.capacityMaximum.value);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("disabled", ctx_r1.bulkForm.invalid || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Cr\u00E9ation..." : "Ajouter " + ctx_r1.bulkForm.controls.count.value + " classe(s)", " ");
} }
function ClassListComponent_Conditional_17_Conditional_4_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 89);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Ne peut pas descendre sous ", ctx_r1.minimumCapacity(), " : c'est le nombre d'\u00E9l\u00E8ves d\u00E9j\u00E0 inscrits. ");
} }
function ClassListComponent_Conditional_17_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 55)(1, "h2", 56);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 57);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_17_Conditional_4_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "form", 58)(6, "div", 59)(7, "label", 85);
    i0.ɵɵtext(8, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "input", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 64)(11, "div", 59)(12, "label", 87);
    i0.ɵɵtext(13, " Effectif maximum ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(14, "input", 88);
    i0.ɵɵtemplate(15, ClassListComponent_Conditional_17_Conditional_4_Conditional_15_Template, 2, 1, "span", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 59)(17, "label", 90);
    i0.ɵɵtext(18, "Seuil d'alerte (%)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 91);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "p", 77);
    i0.ɵɵtext(21, " Le niveau d'une classe n'est pas modifiable : le changer d\u00E9placerait silencieusement tous les \u00E9l\u00E8ves inscrits. Un transfert se fait \u00E9l\u00E8ve par \u00E9l\u00E8ve. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "footer", 75)(23, "button", 76);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_17_Conditional_4_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(24, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "button", 6);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_17_Conditional_4_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitEdit()); });
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Modifier ", (tmp_3_0 = ctx_r1.editing()) == null ? null : tmp_3_0.name, "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.editForm);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("min", ctx_r1.minimumCapacity());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.minimumCapacity() > 0 ? 15 : -1);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("disabled", ctx_r1.editForm.invalid || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Enregistrement..." : "Enregistrer", " ");
} }
function ClassListComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 53);
    i0.ɵɵlistener("click", function ClassListComponent_Conditional_17_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 54);
    i0.ɵɵtemplate(2, ClassListComponent_Conditional_17_Conditional_2_Template, 45, 3)(3, ClassListComponent_Conditional_17_Conditional_3_Template, 36, 4)(4, ClassListComponent_Conditional_17_Conditional_4_Template, 27, 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const openPanel_r19 = ctx;
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(openPanel_r19 === "ONE" ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(openPanel_r19 === "MANY" ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(openPanel_r19 === "EDIT" ? 4 : -1);
} }
/**
 * Classes overview and, above all, the place where a school corrects the
 * forecast it gave during setup.
 *
 * <p>Occupancy is displayed exactly as the backend computed it: available seats
 * are derived from active enrollments (rule 9) and never entered by a user.</p>
 */
export class ClassListComponent {
    dataSource = inject(CLASSROOM_DATA_SOURCE);
    notifications = inject(NotificationService);
    setupStatus = inject(SetupStatusService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    classes = signal([]);
    levels = signal([]);
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    panel = signal(null);
    editing = signal(null);
    levelFilter = signal(null);
    createForm = this.fb.nonNullable.group({
        levelId: ['', [Validators.required]],
        name: [''],
        code: [''],
        capacityMaximum: [45, [Validators.required, Validators.min(1), Validators.max(300)]],
        capacityWarningThreshold: [90, [Validators.min(1), Validators.max(100)]],
        activateImmediately: [true]
    });
    bulkForm = this.fb.nonNullable.group({
        levelId: ['', [Validators.required]],
        count: [2, [Validators.required, Validators.min(1), Validators.max(26)]],
        capacityMaximum: [45, [Validators.required, Validators.min(1), Validators.max(300)]],
        activateImmediately: [true]
    });
    editForm = this.fb.nonNullable.group({
        name: ['', [Validators.required]],
        capacityMaximum: [45, [Validators.required, Validators.min(1), Validators.max(300)]],
        capacityWarningThreshold: [90, [Validators.min(1), Validators.max(100)]]
    });
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (classes) => {
                this.classes.set(classes);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
        this.dataSource.levelCapacities().pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (levels) => this.levels.set(levels),
            // A missing capacity summary must not blank out the class list.
            error: () => this.levels.set([])
        });
    }
    // ---------------------------------------------------------------- lecture
    visibleClasses = computed(() => {
        const filter = this.levelFilter();
        return filter ? this.classes().filter((c) => c.levelId === filter) : this.classes();
    });
    /** Niveaux satures : ceux qui justifient d'ouvrir une classe de plus. */
    crowdedLevels = computed(() => this.levels().filter((l) => l.needsMoreClasses));
    totalSeats = computed(() => this.classes().reduce((sum, c) => sum + c.capacityMaximum, 0));
    totalEnrolled = computed(() => this.classes().reduce((sum, c) => sum + c.activeEnrollments, 0));
    filterByLevel(levelId) {
        this.levelFilter.set(this.levelFilter() === levelId ? null : levelId);
    }
    levelName(levelId) {
        return this.levels().find((l) => l.levelId === levelId)?.levelName ?? '';
    }
    /** Bar colour follows the same thresholds as the backend capacity status. */
    gaugeTone(classroom) {
        switch (classroom.capacityStatus) {
            case 'OVER_CAPACITY':
            case 'FULL':
                return 'var(--danger)';
            case 'WARNING':
                return 'var(--warning)';
            default:
                return 'var(--success)';
        }
    }
    // ---------------------------------------------------------------- panneaux
    openCreate(levelId) {
        const level = this.levels().find((l) => l.levelId === levelId) ?? this.levels()[0];
        this.createForm.reset({
            levelId: level?.levelId ?? '',
            name: level?.suggestedName ?? '',
            code: level?.suggestedCode ?? '',
            capacityMaximum: level?.suggestedCapacity ?? 45,
            capacityWarningThreshold: 90,
            activateImmediately: true
        });
        this.panel.set('ONE');
    }
    openBulk(levelId) {
        const level = this.levels().find((l) => l.levelId === levelId) ?? this.levels()[0];
        this.bulkForm.reset({
            levelId: level?.levelId ?? '',
            count: 2,
            capacityMaximum: level?.suggestedCapacity ?? 45,
            activateImmediately: true
        });
        this.panel.set('MANY');
    }
    openEdit(classroom) {
        this.editing.set(classroom);
        this.editForm.reset({
            name: classroom.name,
            capacityMaximum: classroom.capacityMaximum,
            capacityWarningThreshold: 90
        });
        this.panel.set('EDIT');
    }
    closePanel() {
        this.panel.set(null);
        this.editing.set(null);
    }
    /**
     * Changer de niveau dans le formulaire remet le nom, le code et l'effectif
     * proposes : la suggestion suit le niveau, elle ne reste pas figee sur le
     * premier choix.
     */
    onLevelChange(levelId) {
        const level = this.levels().find((l) => l.levelId === levelId);
        if (!level) {
            return;
        }
        this.createForm.patchValue({
            name: level.suggestedName,
            code: level.suggestedCode,
            capacityMaximum: level.suggestedCapacity
        });
    }
    // ---------------------------------------------------------------- ecriture
    submitCreate() {
        if (this.createForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.createForm.getRawValue();
        this.dataSource.create({
            levelId: value.levelId,
            name: value.name.trim() || undefined,
            code: value.code.trim() || undefined,
            capacityMaximum: value.capacityMaximum,
            capacityWarningThreshold: value.capacityWarningThreshold,
            activateImmediately: value.activateImmediately
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (classroom) => {
                this.notifications.success(`${classroom.name} est ouverte avec ${classroom.capacityMaximum} places.`, 'Classe créée');
                this.afterWrite();
            },
            error: () => this.saving.set(false)
        });
    }
    submitBulk() {
        if (this.bulkForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.bulkForm.getRawValue();
        this.dataSource.createMany({
            levelId: value.levelId,
            count: value.count,
            capacityMaximum: value.capacityMaximum,
            activateImmediately: value.activateImmediately
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (created) => {
                this.notifications.success(`${created.length} classe(s) ajoutée(s) : ${created.map((c) => c.name).join(', ')}.`, 'Classes créées');
                this.afterWrite();
            },
            error: () => this.saving.set(false)
        });
    }
    submitEdit() {
        const classroom = this.editing();
        if (!classroom || this.editForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.editForm.getRawValue();
        this.dataSource.update(classroom.id, {
            name: value.name.trim(),
            capacityMaximum: value.capacityMaximum,
            capacityWarningThreshold: value.capacityWarningThreshold
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (updated) => {
                this.notifications.success(`${updated.name} est à jour.`, 'Classe modifiée');
                this.afterWrite();
            },
            error: () => this.saving.set(false)
        });
    }
    activate(classroom) {
        this.dataSource.activate(classroom.id).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.notifications.success(`${classroom.name} accepte les inscriptions.`);
                this.load();
            }
        });
    }
    close(classroom) {
        this.dataSource.close(classroom.id).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.notifications.success(`${classroom.name} est fermée.`);
                this.load();
            }
        });
    }
    /** Effectif au-dela duquel l'effectif saisi ne peut pas descendre. */
    minimumCapacity() {
        return this.editing()?.activeEnrollments ?? 0;
    }
    afterWrite() {
        this.saving.set(false);
        this.closePanel();
        this.load();
        // La classe compte pour l'etape CLASSES de la configuration.
        this.setupStatus.refresh();
    }
    static ɵfac = function ClassListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ClassListComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ClassListComponent, selectors: [["eduops-class-list"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 18, vars: 7, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["aria-hidden", "true"], ["message", "Chargement des classes..."], [1, "grid", "grid--3"], [3, "retry"], ["role", "status", 1, "alert-block"], [1, "levels"], [1, "class-card", "card", 3, "class-card--draft"], [1, "empty-state"], [1, "alert-block__head"], ["aria-hidden", "true", 1, "alert-block__icon"], [1, "alert-block__title"], [1, "alert-block__text"], [1, "crowded"], [1, "crowded__item"], [1, "crowded__name"], [1, "crowded__meta", "numeric"], ["type", "button", 1, "btn", "btn--primary", "btn--sm", 3, "click"], ["type", "button", 1, "level-chip", 3, "level-chip--on"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm"], ["type", "button", 1, "level-chip", 3, "click"], [1, "level-chip__name"], [1, "level-chip__count", "numeric"], ["aria-hidden", "true", 1, "level-chip__bar"], [1, "level-chip__fill"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], [1, "class-card", "card"], [1, "class-card__head"], [1, "class-card__name"], [1, "class-card__meta", "numeric"], [3, "status"], [1, "class-card__body"], ["role", "img", 1, "gauge"], [1, "gauge__bar"], [1, "gauge__fill"], [1, "gauge__label", "numeric"], [1, "gauge__rate"], [1, "class-card__stats"], [1, "numeric"], [1, "draft-note"], [1, "class-card__footer"], ["routerLink", "/students", 1, "btn", "btn--ghost", "btn--sm", 3, "queryParams"], ["routerLink", "/timetable", 1, "btn", "btn--ghost", "btn--sm", 3, "queryParams"], [1, "empty-state__title"], [1, "empty-state__text"], [1, "empty-state__hint"], ["routerLink", "/setup"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", 1, "drawer"], [1, "drawer__head"], [1, "drawer__title"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "drawer__body", 3, "formGroup"], [1, "field"], ["for", "levelId", 1, "field__label", "field__label--required"], ["id", "levelId", "formControlName", "levelId", 1, "select", 3, "change"], [3, "value"], [1, "field__hint"], [1, "grid2"], ["for", "name", 1, "field__label"], ["id", "name", "formControlName", "name", 1, "input"], ["for", "code", 1, "field__label"], ["id", "code", "formControlName", "code", 1, "input"], ["for", "capacity", 1, "field__label", "field__label--required"], ["id", "capacity", "type", "number", "min", "1", "max", "300", "formControlName", "capacityMaximum", 1, "input"], ["for", "threshold", 1, "field__label"], ["id", "threshold", "type", "number", "min", "1", "max", "100", "formControlName", "capacityWarningThreshold", 1, "input"], [1, "switch"], ["type", "checkbox", "formControlName", "activateImmediately"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], [1, "hint-block"], ["for", "bulkLevel", 1, "field__label", "field__label--required"], ["id", "bulkLevel", "formControlName", "levelId", 1, "select"], ["for", "count", 1, "field__label", "field__label--required"], ["id", "count", "type", "number", "min", "1", "max", "26", "formControlName", "count", 1, "input"], ["for", "bulkCapacity", 1, "field__label", "field__label--required"], ["id", "bulkCapacity", "type", "number", "min", "1", "max", "300", "formControlName", "capacityMaximum", 1, "input"], [1, "preview-line", "numeric"], ["for", "editName", 1, "field__label", "field__label--required"], ["id", "editName", "formControlName", "name", 1, "input"], ["for", "editCapacity", 1, "field__label", "field__label--required"], ["id", "editCapacity", "type", "number", "max", "300", "formControlName", "capacityMaximum", 1, "input", 3, "min"], [1, "field__hint", "numeric"], ["for", "editThreshold", 1, "field__label"], ["id", "editThreshold", "type", "number", "min", "1", "max", "100", "formControlName", "capacityWarningThreshold", 1, "input"]], template: function ClassListComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Classes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "button", 5);
            i0.ɵɵlistener("click", function ClassListComponent_Template_button_click_8_listener() { return ctx.openBulk(); });
            i0.ɵɵtext(9, " Ajouter plusieurs classes ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "button", 6);
            i0.ɵɵlistener("click", function ClassListComponent_Template_button_click_10_listener() { return ctx.openCreate(); });
            i0.ɵɵelementStart(11, "span", 7);
            i0.ɵɵtext(12, "+");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(13, " Nouvelle classe ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(14, ClassListComponent_Conditional_14_Template, 1, 0, "eduops-loading-state", 8)(15, ClassListComponent_Conditional_15_Template, 1, 0, "eduops-error-state")(16, ClassListComponent_Conditional_16_Template, 6, 3, "section", 9)(17, ClassListComponent_Conditional_17_Template, 5, 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_4_0;
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate3(" ", ctx.classes().length, " classe(s) \u2014 ", ctx.totalEnrolled(), " \u00E9l\u00E8ves sur ", ctx.totalSeats(), " places ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.levels().length === 0);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.levels().length === 0);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.loading() ? 14 : ctx.error() ? 15 : 16);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_4_0 = ctx.panel()) ? 17 : -1, tmp_4_0);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.MaxValidator, i1.FormGroupDirective, i1.FormControlName, RouterLink,
            StatusBadgeComponent, LoadingStateComponent, ErrorStateComponent], styles: [".class-card[_ngcontent-%COMP%] { display: flex; flex-direction: column; }\n\n.class-card__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-5) var(--space-5) var(--space-3);\n}\n\n.class-card__name[_ngcontent-%COMP%] { font-size: var(--text-lg); margin: 0; }\n.class-card__meta[_ngcontent-%COMP%] { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n.class-card__body[_ngcontent-%COMP%] { padding: 0 var(--space-5) var(--space-4); flex: 1; }\n\n.gauge[_ngcontent-%COMP%] { margin-bottom: var(--space-4); }\n.gauge__bar[_ngcontent-%COMP%] {\n  height: 8px;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-pill);\n  overflow: hidden;\n}\n.gauge__fill[_ngcontent-%COMP%] { display: block; height: 100%; border-radius: var(--radius-pill); transition: width 300ms ease; }\n.gauge__label[_ngcontent-%COMP%] { margin: var(--space-2) 0 0; font-size: var(--text-sm); color: var(--text-normal); }\n.gauge__rate[_ngcontent-%COMP%] { color: var(--text-muted); }\n\n.class-card__stats[_ngcontent-%COMP%] { display: grid; gap: var(--space-2); margin: 0; }\n.class-card__stats[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { display: flex; justify-content: space-between; gap: var(--space-3); }\n.class-card__stats[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-sm); color: var(--text-muted); }\n.class-card__stats[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); }\n.class-card__stats[_ngcontent-%COMP%]   dd.negative[_ngcontent-%COMP%] { color: var(--danger); }\n\n.class-card__footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-1);\n  padding: var(--space-3) var(--space-4);\n  border-top: 1px solid var(--border-light);\n}\n\n.empty[_ngcontent-%COMP%] { grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: var(--space-10); }\n\n\n\n\n.alert-block[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-4);\n  padding: var(--space-4);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 26px;\n    height: 26px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.crowded[_ngcontent-%COMP%] {\n  margin: var(--space-3) 0 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__meta { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n  &__meta em { color: var(--danger); font-style: normal; }\n}\n\n\n\n\n.levels[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--space-2);\n  margin-bottom: var(--space-4);\n}\n\n.level-chip[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 130px;\n  padding: var(--space-2) var(--space-3);\n  text-align: left;\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-button);\n  cursor: pointer;\n  transition: border-color var(--transition-fast);\n\n  &:hover { border-color: var(--brand); }\n\n  &--on {\n    border-color: var(--brand);\n    background: var(--brand-tint);\n  }\n\n  &__name { font-weight: 600; font-size: var(--text-sm); color: var(--text-strong); }\n  &__count { font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__bar {\n    display: block;\n    height: 4px;\n    background: var(--surface-sunken);\n    border-radius: var(--radius-pill);\n    overflow: hidden;\n  }\n\n  &__fill {\n    display: block;\n    height: 100%;\n    background: var(--success);\n\n    &--hot { background: var(--warning); }\n  }\n}\n\n\n\n\n.class-card--draft[_ngcontent-%COMP%] { border-style: dashed; }\n\n.draft-note[_ngcontent-%COMP%] {\n  margin: var(--space-3) 0 0;\n  padding: var(--space-2);\n  font-size: var(--text-xs);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n  &__hint { margin: var(--space-2) 0 0; font-size: var(--text-xs); color: var(--text-light); }\n}\n\n\n\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgba(15, 23, 42, .45);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n  width: min(460px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n\n  &__close {\n    font-size: 1.5rem;\n    line-height: 1;\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { color: var(--text-strong); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.grid2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.preview-line[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--text-normal);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClassListComponent, [{
        type: Component,
        args: [{ selector: 'eduops-class-list', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink,
                    StatusBadgeComponent, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Classes</h1>\n      <p class=\"page__meta numeric\">\n        {{ classes().length }} classe(s) \u2014 {{ totalEnrolled() }} \u00E9l\u00E8ves sur\n        {{ totalSeats() }} places\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      <button type=\"button\" class=\"btn btn--secondary\" (click)=\"openBulk()\"\n              [disabled]=\"levels().length === 0\">\n        Ajouter plusieurs classes\n      </button>\n      <button type=\"button\" class=\"btn btn--primary\" (click)=\"openCreate()\"\n              [disabled]=\"levels().length === 0\">\n        <span aria-hidden=\"true\">+</span> Nouvelle classe\n      </button>\n    </div>\n  </header>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des classes...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n\n    <!-- \u2550\u2550\u2550 Niveaux satur\u00E9s : la configuration initiale n'a pas pr\u00E9vu assez \u2550\u2550\u2550 -->\n    @if (crowdedLevels().length > 0) {\n      <section class=\"alert-block\" role=\"status\">\n        <div class=\"alert-block__head\">\n          <span class=\"alert-block__icon\" aria-hidden=\"true\">!</span>\n          <div>\n            <p class=\"alert-block__title\">\n              {{ crowdedLevels().length }} niveau(x) arrivent \u00E0 saturation\n            </p>\n            <p class=\"alert-block__text\">\n              Le nombre de classes pr\u00E9vu \u00E0 la configuration ne suffit plus.\n              Ouvrez-en une de plus : le nom continue la s\u00E9rie existante.\n            </p>\n          </div>\n        </div>\n        <ul class=\"crowded\">\n          @for (level of crowdedLevels(); track level.levelId) {\n            <li class=\"crowded__item\">\n              <span class=\"crowded__name\">{{ level.levelName }}</span>\n              <span class=\"crowded__meta numeric\">\n                {{ level.totalEnrolled }}/{{ level.totalCapacity }} \u2014 {{ level.occupancyRate }} %\n                @if (level.classroomCount === 0) {\n                  <em>aucune classe</em>\n                }\n              </span>\n              <button type=\"button\" class=\"btn btn--primary btn--sm\"\n                      (click)=\"openCreate(level.levelId)\">\n                Ouvrir {{ level.suggestedName }}\n              </button>\n            </li>\n          }\n        </ul>\n      </section>\n    }\n\n    <!-- \u2550\u2550\u2550 R\u00E9partition par niveau, cliquable pour filtrer \u2550\u2550\u2550 -->\n    @if (levels().length > 0) {\n      <section class=\"levels\">\n        @for (level of levels(); track level.levelId) {\n          <button type=\"button\" class=\"level-chip\"\n                  [class.level-chip--on]=\"levelFilter() === level.levelId\"\n                  (click)=\"filterByLevel(level.levelId)\">\n            <span class=\"level-chip__name\">{{ level.levelName }}</span>\n            <span class=\"level-chip__count numeric\">\n              {{ level.classroomCount }} cl. \u2014 {{ level.occupancyRate }} %\n            </span>\n            <span class=\"level-chip__bar\" aria-hidden=\"true\">\n              <span class=\"level-chip__fill\"\n                    [style.width.%]=\"level.occupancyRate > 100 ? 100 : level.occupancyRate\"\n                    [class.level-chip__fill--hot]=\"level.needsMoreClasses\"></span>\n            </span>\n          </button>\n        }\n        @if (levelFilter()) {\n          <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"filterByLevel(null)\">\n            Tout afficher\n          </button>\n        }\n      </section>\n    }\n\n    <!-- \u2550\u2550\u2550 Les classes \u2550\u2550\u2550 -->\n    <section class=\"grid grid--3\">\n      @for (classroom of visibleClasses(); track classroom.id) {\n        <article class=\"class-card card\" [class.class-card--draft]=\"classroom.status === 'DRAFT'\">\n          <header class=\"class-card__head\">\n            <div>\n              <h2 class=\"class-card__name\">{{ classroom.name }}</h2>\n              <p class=\"class-card__meta numeric\">\n                {{ classroom.code }} \u2014 {{ classroom.levelName }}\n              </p>\n            </div>\n            <eduops-status-badge [status]=\"classroom.capacityStatus\" />\n          </header>\n\n          <div class=\"class-card__body\">\n            <!-- Occupancy gauge: computed server-side, displayed here -->\n            <div class=\"gauge\" role=\"img\"\n                 [attr.aria-label]=\"classroom.activeEnrollments + ' \u00E9l\u00E8ves sur ' + classroom.capacityMaximum\">\n              <div class=\"gauge__bar\">\n                <span class=\"gauge__fill\"\n                      [style.width.%]=\"classroom.occupancyRate > 100 ? 100 : classroom.occupancyRate\"\n                      [style.background]=\"gaugeTone(classroom)\"></span>\n              </div>\n              <p class=\"gauge__label numeric\">\n                <strong>{{ classroom.activeEnrollments }}</strong> / {{ classroom.capacityMaximum }}\n                <span class=\"gauge__rate\">({{ classroom.occupancyRate }} %)</span>\n              </p>\n            </div>\n\n            <dl class=\"class-card__stats\">\n              <div>\n                <dt>Places restantes</dt>\n                <dd class=\"numeric\" [class.negative]=\"classroom.availableSeats <= 0\">\n                  {{ classroom.availableSeats }}\n                </dd>\n              </div>\n              <div>\n                <dt>Places projet\u00E9es</dt>\n                <dd class=\"numeric\"\n                    [class.negative]=\"(classroom.projectedAvailableSeats ?? 0) < 0\">\n                  {{ classroom.projectedAvailableSeats ?? classroom.availableSeats }}\n                </dd>\n              </div>\n              <div>\n                <dt>Professeur principal</dt>\n                <dd>{{ classroom.mainTeacherName ?? 'Non affect\u00E9' }}</dd>\n              </div>\n            </dl>\n\n            @if (classroom.status === 'DRAFT') {\n              <p class=\"draft-note\">\n                Cette classe est en brouillon : elle n'accepte pas encore d'inscriptions.\n              </p>\n            }\n          </div>\n\n          <footer class=\"class-card__footer\">\n            <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"openEdit(classroom)\">\n              Modifier\n            </button>\n            @if (classroom.status === 'DRAFT') {\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"activate(classroom)\">\n                Ouvrir\n              </button>\n            }\n            @if (classroom.status === 'ACTIVE' && classroom.activeEnrollments === 0) {\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"close(classroom)\">\n                Fermer\n              </button>\n            }\n            <a class=\"btn btn--ghost btn--sm\" routerLink=\"/students\"\n               [queryParams]=\"{ classroomId: classroom.id }\">\u00C9l\u00E8ves</a>\n            <a class=\"btn btn--ghost btn--sm\" routerLink=\"/timetable\"\n               [queryParams]=\"{ classroomId: classroom.id }\">Emploi du temps</a>\n          </footer>\n        </article>\n      } @empty {\n        <div class=\"empty-state\">\n          <p class=\"empty-state__title\">\n            @if (levelFilter()) {\n              Aucune classe sur ce niveau.\n            } @else {\n              Aucune classe d\u00E9finie pour cette ann\u00E9e scolaire.\n            }\n          </p>\n          <p class=\"empty-state__text\">\n            Une classe se rattache \u00E0 un niveau et porte un effectif maximum.\n            Les places restantes sont ensuite calcul\u00E9es automatiquement.\n          </p>\n          <button type=\"button\" class=\"btn btn--primary\"\n                  (click)=\"openCreate(levelFilter() ?? undefined)\"\n                  [disabled]=\"levels().length === 0\">\n            Cr\u00E9er une classe\n          </button>\n          @if (levels().length === 0) {\n            <p class=\"empty-state__hint\">\n              D\u00E9finissez d'abord vos cycles et vos niveaux dans\n              <a routerLink=\"/setup\">la configuration</a>.\n            </p>\n          }\n        </div>\n      }\n    </section>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau lat\u00E9ral \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (panel(); as openPanel) {\n    <div class=\"drawer-backdrop\" (click)=\"closePanel()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\">\n\n      <!-- \u2500\u2500\u2500 Une classe \u2500\u2500\u2500 -->\n      @if (openPanel === 'ONE') {\n        <header class=\"drawer__head\">\n          <h2 class=\"drawer__title\">Nouvelle classe</h2>\n          <button type=\"button\" class=\"drawer__close\" (click)=\"closePanel()\"\n                  aria-label=\"Fermer\">&times;</button>\n        </header>\n        <form class=\"drawer__body\" [formGroup]=\"createForm\">\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"levelId\">Niveau</label>\n            <select id=\"levelId\" class=\"select\" formControlName=\"levelId\"\n                    (change)=\"onLevelChange($any($event.target).value)\">\n              @for (level of levels(); track level.levelId) {\n                <option [value]=\"level.levelId\">\n                  {{ level.levelName }} \u2014 {{ level.classroomCount }} classe(s),\n                  {{ level.occupancyRate }} % occup\u00E9\n                </option>\n              }\n            </select>\n            <span class=\"field__hint\">\n              Les frais de scolarit\u00E9 et le programme suivent le niveau, pas la classe.\n            </span>\n          </div>\n\n          <div class=\"grid2\">\n            <div class=\"field\">\n              <label class=\"field__label\" for=\"name\">Nom</label>\n              <input id=\"name\" class=\"input\" formControlName=\"name\" />\n              <span class=\"field__hint\">Propos\u00E9 d'apr\u00E8s la s\u00E9rie existante.</span>\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label\" for=\"code\">Code</label>\n              <input id=\"code\" class=\"input\" formControlName=\"code\" />\n            </div>\n          </div>\n\n          <div class=\"grid2\">\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"capacity\">\n                Effectif maximum\n              </label>\n              <input id=\"capacity\" class=\"input\" type=\"number\" min=\"1\" max=\"300\"\n                     formControlName=\"capacityMaximum\" />\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label\" for=\"threshold\">Seuil d'alerte (%)</label>\n              <input id=\"threshold\" class=\"input\" type=\"number\" min=\"1\" max=\"100\"\n                     formControlName=\"capacityWarningThreshold\" />\n              <span class=\"field__hint\">Au-del\u00E0, la classe passe en \u00AB presque pleine \u00BB.</span>\n            </div>\n          </div>\n\n          <label class=\"switch\">\n            <input type=\"checkbox\" formControlName=\"activateImmediately\" />\n            <span>Ouvrir imm\u00E9diatement aux inscriptions</span>\n          </label>\n        </form>\n        <footer class=\"drawer__foot\">\n          <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closePanel()\">Annuler</button>\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"createForm.invalid || saving()\" (click)=\"submitCreate()\">\n            {{ saving() ? 'Cr\u00E9ation...' : 'Cr\u00E9er la classe' }}\n          </button>\n        </footer>\n      }\n\n      <!-- \u2500\u2500\u2500 Plusieurs classes \u2500\u2500\u2500 -->\n      @if (openPanel === 'MANY') {\n        <header class=\"drawer__head\">\n          <h2 class=\"drawer__title\">Ajouter plusieurs classes</h2>\n          <button type=\"button\" class=\"drawer__close\" (click)=\"closePanel()\"\n                  aria-label=\"Fermer\">&times;</button>\n        </header>\n        <form class=\"drawer__body\" [formGroup]=\"bulkForm\">\n          <p class=\"hint-block\">\n            \u00C0 utiliser quand la configuration initiale n'a pas pr\u00E9vu assez de classes.\n            Les noms poursuivent la s\u00E9rie : un niveau ayant d\u00E9j\u00E0 A et B re\u00E7oit C, D, E.\n          </p>\n\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"bulkLevel\">Niveau</label>\n            <select id=\"bulkLevel\" class=\"select\" formControlName=\"levelId\">\n              @for (level of levels(); track level.levelId) {\n                <option [value]=\"level.levelId\">\n                  {{ level.levelName }} \u2014 {{ level.classroomCount }} classe(s),\n                  {{ level.occupancyRate }} % occup\u00E9\n                </option>\n              }\n            </select>\n          </div>\n\n          <div class=\"grid2\">\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"count\">\n                Nombre de classes\n              </label>\n              <input id=\"count\" class=\"input\" type=\"number\" min=\"1\" max=\"26\"\n                     formControlName=\"count\" />\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"bulkCapacity\">\n                Effectif de chacune\n              </label>\n              <input id=\"bulkCapacity\" class=\"input\" type=\"number\" min=\"1\" max=\"300\"\n                     formControlName=\"capacityMaximum\" />\n            </div>\n          </div>\n\n          <p class=\"preview-line numeric\">\n            Places ajout\u00E9es :\n            <strong>{{ bulkForm.controls.count.value * bulkForm.controls.capacityMaximum.value }}</strong>\n          </p>\n\n          <label class=\"switch\">\n            <input type=\"checkbox\" formControlName=\"activateImmediately\" />\n            <span>Ouvrir imm\u00E9diatement aux inscriptions</span>\n          </label>\n        </form>\n        <footer class=\"drawer__foot\">\n          <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closePanel()\">Annuler</button>\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"bulkForm.invalid || saving()\" (click)=\"submitBulk()\">\n            {{ saving() ? 'Cr\u00E9ation...' : 'Ajouter ' + bulkForm.controls.count.value + ' classe(s)' }}\n          </button>\n        </footer>\n      }\n\n      <!-- \u2500\u2500\u2500 Modification \u2500\u2500\u2500 -->\n      @if (openPanel === 'EDIT') {\n        <header class=\"drawer__head\">\n          <h2 class=\"drawer__title\">Modifier {{ editing()?.name }}</h2>\n          <button type=\"button\" class=\"drawer__close\" (click)=\"closePanel()\"\n                  aria-label=\"Fermer\">&times;</button>\n        </header>\n        <form class=\"drawer__body\" [formGroup]=\"editForm\">\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"editName\">Nom</label>\n            <input id=\"editName\" class=\"input\" formControlName=\"name\" />\n          </div>\n\n          <div class=\"grid2\">\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"editCapacity\">\n                Effectif maximum\n              </label>\n              <input id=\"editCapacity\" class=\"input\" type=\"number\"\n                     [min]=\"minimumCapacity()\" max=\"300\"\n                     formControlName=\"capacityMaximum\" />\n              @if (minimumCapacity() > 0) {\n                <span class=\"field__hint numeric\">\n                  Ne peut pas descendre sous {{ minimumCapacity() }} : c'est le nombre\n                  d'\u00E9l\u00E8ves d\u00E9j\u00E0 inscrits.\n                </span>\n              }\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label\" for=\"editThreshold\">Seuil d'alerte (%)</label>\n              <input id=\"editThreshold\" class=\"input\" type=\"number\" min=\"1\" max=\"100\"\n                     formControlName=\"capacityWarningThreshold\" />\n            </div>\n          </div>\n\n          <p class=\"hint-block\">\n            Le niveau d'une classe n'est pas modifiable : le changer d\u00E9placerait\n            silencieusement tous les \u00E9l\u00E8ves inscrits. Un transfert se fait \u00E9l\u00E8ve par \u00E9l\u00E8ve.\n          </p>\n        </form>\n        <footer class=\"drawer__foot\">\n          <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closePanel()\">Annuler</button>\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"editForm.invalid || saving()\" (click)=\"submitEdit()\">\n            {{ saving() ? 'Enregistrement...' : 'Enregistrer' }}\n          </button>\n        </footer>\n      }\n    </aside>\n  }\n</div>\n", styles: [".class-card { display: flex; flex-direction: column; }\n\n.class-card__head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-5) var(--space-5) var(--space-3);\n}\n\n.class-card__name { font-size: var(--text-lg); margin: 0; }\n.class-card__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n.class-card__body { padding: 0 var(--space-5) var(--space-4); flex: 1; }\n\n.gauge { margin-bottom: var(--space-4); }\n.gauge__bar {\n  height: 8px;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-pill);\n  overflow: hidden;\n}\n.gauge__fill { display: block; height: 100%; border-radius: var(--radius-pill); transition: width 300ms ease; }\n.gauge__label { margin: var(--space-2) 0 0; font-size: var(--text-sm); color: var(--text-normal); }\n.gauge__rate { color: var(--text-muted); }\n\n.class-card__stats { display: grid; gap: var(--space-2); margin: 0; }\n.class-card__stats > div { display: flex; justify-content: space-between; gap: var(--space-3); }\n.class-card__stats dt { margin: 0; font-size: var(--text-sm); color: var(--text-muted); }\n.class-card__stats dd { margin: 0; font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); }\n.class-card__stats dd.negative { color: var(--danger); }\n\n.class-card__footer {\n  display: flex;\n  gap: var(--space-1);\n  padding: var(--space-3) var(--space-4);\n  border-top: 1px solid var(--border-light);\n}\n\n.empty { grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: var(--space-10); }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Niveaux satur\u00E9s \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.alert-block {\n  margin-bottom: var(--space-4);\n  padding: var(--space-4);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 26px;\n    height: 26px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.crowded {\n  margin: var(--space-3) 0 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__meta { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n  &__meta em { color: var(--danger); font-style: normal; }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Filtre par niveau \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.levels {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--space-2);\n  margin-bottom: var(--space-4);\n}\n\n.level-chip {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  min-width: 130px;\n  padding: var(--space-2) var(--space-3);\n  text-align: left;\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-button);\n  cursor: pointer;\n  transition: border-color var(--transition-fast);\n\n  &:hover { border-color: var(--brand); }\n\n  &--on {\n    border-color: var(--brand);\n    background: var(--brand-tint);\n  }\n\n  &__name { font-weight: 600; font-size: var(--text-sm); color: var(--text-strong); }\n  &__count { font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__bar {\n    display: block;\n    height: 4px;\n    background: var(--surface-sunken);\n    border-radius: var(--radius-pill);\n    overflow: hidden;\n  }\n\n  &__fill {\n    display: block;\n    height: 100%;\n    background: var(--success);\n\n    &--hot { background: var(--warning); }\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Cartes \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.class-card--draft { border-style: dashed; }\n\n.draft-note {\n  margin: var(--space-3) 0 0;\n  padding: var(--space-2);\n  font-size: var(--text-xs);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n}\n\n.empty-state {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n  &__hint { margin: var(--space-2) 0 0; font-size: var(--text-xs); color: var(--text-light); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau lat\u00E9ral \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgba(15, 23, 42, .45);\n}\n\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n  width: min(460px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n\n  &__close {\n    font-size: 1.5rem;\n    line-height: 1;\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { color: var(--text-strong); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.grid2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.preview-line {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--text-normal);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ClassListComponent, { className: "ClassListComponent", filePath: "frontend/src/app/features/classes/class-list.component.ts", lineNumber: 34 }); })();
//# sourceMappingURL=class-list.component.js.map