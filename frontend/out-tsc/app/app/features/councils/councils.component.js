import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CLASSROOM_DATA_SOURCE, COUNCIL_DATA_SOURCE, REFERENCE_DATA_SOURCE, TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { COUNCIL_STATES, PROMOTION_DECISIONS } from '@core/models/council.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ConfirmDialogComponent } from '@shared/ui/confirm-dialog/confirm-dialog.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.code;
const _forTrack2 = ($index, $item) => $item.enrollmentId;
function CouncilsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreate()); });
    i0.ɵɵtext(1, " Planifier un conseil ");
    i0.ɵɵelementEnd();
} }
function CouncilsComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 6);
} }
function CouncilsComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 10);
    i0.ɵɵlistener("retry", function CouncilsComponent_Conditional_11_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.initialize()); });
    i0.ɵɵelementEnd();
} }
function CouncilsComponent_Conditional_12_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const year_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", year_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(year_r5.label);
} }
function CouncilsComponent_Conditional_12_For_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const state_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", state_r6.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(state_r6.label);
} }
function CouncilsComponent_Conditional_12_For_54_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵelementStart(1, "small");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_13_0;
    const council_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", council_r8.classAverage.toLocaleString("fr-FR"), "/20 ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", (tmp_13_0 = council_r8.successRate == null ? null : council_r8.successRate.toLocaleString("fr-FR")) !== null && tmp_13_0 !== undefined ? tmp_13_0 : "\u2014", " % de r\u00E9ussite");
} }
function CouncilsComponent_Conditional_12_For_54_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u2014 ");
} }
function CouncilsComponent_Conditional_12_For_54_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td", 25);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td")(9, "span", 26);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td", 27);
    i0.ɵɵtemplate(12, CouncilsComponent_Conditional_12_For_54_Conditional_12_Template, 3, 2, "small")(13, CouncilsComponent_Conditional_12_For_54_Conditional_13_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 24)(15, "button", 28);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_12_For_54_Template_button_click_15_listener() { const council_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openDetail(council_r8)); });
    i0.ɵɵtext(16, " Ouvrir ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const council_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatDate(council_r8.meetingDate));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(council_r8.classroomName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(council_r8.termName);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-tone", ctx_r1.stateOf(council_r8.status).tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.stateOf(council_r8.status).label, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(council_r8.classAverage != null ? 12 : 13);
} }
function CouncilsComponent_Conditional_12_ForEmpty_55_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Planifiez le premier conseil de cette p\u00E9riode pour commencer.");
    i0.ɵɵelementEnd();
} }
function CouncilsComponent_Conditional_12_ForEmpty_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 29)(2, "div", 30)(3, "strong");
    i0.ɵɵtext(4, "Aucun conseil pour ces filtres.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, CouncilsComponent_Conditional_12_ForEmpty_55_Conditional_5_Template, 2, 0, "span");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r1.canManage() ? 5 : -1);
} }
function CouncilsComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 11)(1, "label", 12)(2, "span", 13);
    i0.ɵɵtext(3, "Ann\u00E9e scolaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 14);
    i0.ɵɵlistener("change", function CouncilsComponent_Conditional_12_Template_select_change_4_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changeYear($event.target.value)); });
    i0.ɵɵrepeaterCreate(5, CouncilsComponent_Conditional_12_For_6_Template, 2, 2, "option", 15, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "label", 12)(8, "span", 13);
    i0.ɵɵtext(9, "\u00C9tat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "select", 14);
    i0.ɵɵlistener("change", function CouncilsComponent_Conditional_12_Template_select_change_10_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changeStatus($event.target.value)); });
    i0.ɵɵelementStart(11, "option", 16);
    i0.ɵɵtext(12, "Tous les \u00E9tats");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(13, CouncilsComponent_Conditional_12_For_14_Template, 2, 2, "option", 15, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "p", 17);
    i0.ɵɵtext(16, "Un conseil est unique pour une classe et une p\u00E9riode.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "section", 18)(18, "div", 19)(19, "strong");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span");
    i0.ɵɵtext(22, "\u00E0 venir");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 19)(24, "strong");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span");
    i0.ɵɵtext(27, "en cours");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div", 19)(29, "strong");
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "span");
    i0.ɵɵtext(32, "clos");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(33, "section", 20)(34, "div", 21)(35, "table", 22)(36, "caption", 23);
    i0.ɵɵtext(37, "Conseils de classe planifi\u00E9s et clos");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "thead")(39, "tr")(40, "th");
    i0.ɵɵtext(41, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "th");
    i0.ɵɵtext(43, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "th");
    i0.ɵɵtext(45, "P\u00E9riode");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "th");
    i0.ɵɵtext(47, "\u00C9tat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "th");
    i0.ɵɵtext(49, "Moyenne / r\u00E9ussite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "th", 24);
    i0.ɵɵtext(51, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(52, "tbody");
    i0.ɵɵrepeaterCreate(53, CouncilsComponent_Conditional_12_For_54_Template, 17, 6, "tr", null, _forTrack0, false, CouncilsComponent_Conditional_12_ForEmpty_55_Template, 6, 1, "tr");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r1.selectedYearId());
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.years());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r1.selectedStatus());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.states);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.plannedCount());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.inProgressCount());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.closedCount());
    i0.ɵɵadvance(23);
    i0.ɵɵrepeater(ctx_r1.councils());
} }
function CouncilsComponent_Conditional_13_For_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r10 = ctx.$implicit;
    i0.ɵɵproperty("value", classroom_r10.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", classroom_r10.name, " \u00B7 ", classroom_r10.levelName, "");
} }
function CouncilsComponent_Conditional_13_For_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const term_r11 = ctx.$implicit;
    i0.ɵɵproperty("value", term_r11.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(term_r11.name);
} }
function CouncilsComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_13_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCreate()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 32)(2, "header", 33)(3, "div")(4, "h2", 34);
    i0.ɵɵtext(5, "Planifier un conseil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 35);
    i0.ɵɵtext(7, "La classe et la p\u00E9riode ne peuvent \u00EAtre choisies qu'une seule fois.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 36);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_13_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCreate()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 37);
    i0.ɵɵlistener("ngSubmit", function CouncilsComponent_Conditional_13_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitCreate()); });
    i0.ɵɵelementStart(11, "p", 38);
    i0.ɵɵtext(12, " Le conseil rassemble les d\u00E9cisions de la p\u00E9riode. Il sera possible d'ajouter les participants et de renseigner le proc\u00E8s-verbal avant sa cl\u00F4ture. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 12)(14, "label", 39);
    i0.ɵɵtext(15, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "select", 40)(17, "option", 16);
    i0.ɵɵtext(18, "Choisir une classe\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(19, CouncilsComponent_Conditional_13_For_20_Template, 2, 3, "option", 15, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 12)(22, "label", 41);
    i0.ɵɵtext(23, "P\u00E9riode");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "select", 42)(25, "option", 16);
    i0.ɵɵtext(26, "Choisir une p\u00E9riode\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(27, CouncilsComponent_Conditional_13_For_28_Template, 2, 2, "option", 15, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 43)(30, "div", 12)(31, "label", 44);
    i0.ɵɵtext(32, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(33, "input", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 12)(35, "label", 46);
    i0.ɵɵtext(36, "D\u00E9but");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(37, "input", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "div", 12)(39, "label", 48);
    i0.ɵɵtext(40, "Fin");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(41, "input", 49);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(42, "div", 12)(43, "label", 50);
    i0.ɵɵtext(44, "Lieu");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(45, "input", 51);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "footer", 52)(47, "button", 53);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_13_Template_button_click_47_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCreate()); });
    i0.ɵɵtext(48, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "button", 54);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_13_Template_button_click_49_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitCreate()); });
    i0.ɵɵtext(50, "Planifier");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("formGroup", ctx_r1.createForm);
    i0.ɵɵadvance(9);
    i0.ɵɵrepeater(ctx_r1.filteredClassrooms());
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r1.terms());
    i0.ɵɵadvance(22);
    i0.ɵɵproperty("disabled", ctx_r1.createForm.invalid || ctx_r1.saving());
} }
function CouncilsComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelement(1, "eduops-loading-state", 55);
    i0.ɵɵelementEnd();
} }
function CouncilsComponent_Conditional_15_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "moyenne ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "r\u00E9ussite ");
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_4_0;
    const council_r13 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", council_r13.classAverage.toLocaleString("fr-FR"), "/20");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", (tmp_4_0 = council_r13.successRate == null ? null : council_r13.successRate.toLocaleString("fr-FR")) !== null && tmp_4_0 !== undefined ? tmp_4_0 : "\u2014", " %");
} }
function CouncilsComponent_Conditional_15_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 61)(1, "div", 63)(2, "div")(3, "h3");
    i0.ɵɵtext(4, "Organisation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Les informations pratiques restent modifiables jusqu'\u00E0 la cl\u00F4ture.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 71);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_15_Conditional_24_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.saveMeeting()); });
    i0.ɵɵtext(8, "Enregistrer");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "form", 72)(10, "label", 12)(11, "span", 13);
    i0.ɵɵtext(12, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 73);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "label", 12)(15, "span", 13);
    i0.ɵɵtext(16, "D\u00E9but");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(17, "input", 74);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "label", 12)(19, "span", 13);
    i0.ɵɵtext(20, "Fin");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "input", 75);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "label", 76)(23, "span", 13);
    i0.ɵɵtext(24, "Lieu");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 77);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "label", 78)(27, "span", 13);
    i0.ɵɵtext(28, "Observations");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(29, "textarea", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "label", 78)(31, "span", 13);
    i0.ɵɵtext(32, "Lien vers le proc\u00E8s-verbal");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(33, "input", 80);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || ctx_r1.meetingForm.invalid);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r1.meetingForm);
} }
function CouncilsComponent_Conditional_15_Conditional_25_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const council_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" \u00B7 ", council_r13.endTime, " ");
} }
function CouncilsComponent_Conditional_15_Conditional_25_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 81);
    i0.ɵɵtext(1, "Consulter");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const council_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("href", council_r13.minutesUrl, i0.ɵɵsanitizeUrl);
} }
function CouncilsComponent_Conditional_15_Conditional_25_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Non joint ");
} }
function CouncilsComponent_Conditional_15_Conditional_25_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 82);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const council_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(council_r13.remarks);
} }
function CouncilsComponent_Conditional_15_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 62)(1, "dl")(2, "div")(3, "dt");
    i0.ɵɵtext(4, "Lieu");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "dd");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div")(8, "dt");
    i0.ɵɵtext(9, "Horaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "dd");
    i0.ɵɵtext(11);
    i0.ɵɵtemplate(12, CouncilsComponent_Conditional_15_Conditional_25_Conditional_12_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div")(14, "dt");
    i0.ɵɵtext(15, "Proc\u00E8s-verbal");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "dd");
    i0.ɵɵtemplate(17, CouncilsComponent_Conditional_15_Conditional_25_Conditional_17_Template, 2, 1, "a", 81)(18, CouncilsComponent_Conditional_15_Conditional_25_Conditional_18_Template, 1, 0);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(19, CouncilsComponent_Conditional_15_Conditional_25_Conditional_19_Template, 2, 1, "p", 82);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const council_r13 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(council_r13.location || "Non renseign\u00E9");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", council_r13.startTime || "\u2014", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(council_r13.endTime ? 12 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(council_r13.minutesUrl ? 17 : 18);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(council_r13.remarks ? 19 : -1);
} }
function CouncilsComponent_Conditional_15_For_35_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 83)(1, "input", 84);
    i0.ɵɵlistener("change", function CouncilsComponent_Conditional_15_For_35_Conditional_6_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r15); const participant_r16 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setPresence(participant_r16.id, $event.target.checked)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2, " Pr\u00E9sent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 85);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_15_For_35_Conditional_6_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r15); const participant_r16 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeParticipant(participant_r16.id)); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const participant_r16 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", participant_r16.present);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵattribute("aria-label", "Retirer " + participant_r16.name);
} }
function CouncilsComponent_Conditional_15_For_35_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const participant_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("data-tone", participant_r16.present ? "done" : "off");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", participant_r16.present ? "Pr\u00E9sent" : "Absent", " ");
} }
function CouncilsComponent_Conditional_15_For_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 65)(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, CouncilsComponent_Conditional_15_For_35_Conditional_6_Template, 5, 3)(7, CouncilsComponent_Conditional_15_For_35_Conditional_7_Template, 2, 2, "span", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const participant_r16 = ctx.$implicit;
    const council_r13 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(participant_r16.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(participant_r16.roleLabel);
    i0.ɵɵadvance();
    i0.ɵɵconditional(council_r13.editable && ctx_r1.canManage() ? 6 : 7);
} }
function CouncilsComponent_Conditional_15_ForEmpty_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 66);
    i0.ɵɵtext(1, "Aucun participant renseign\u00E9.");
    i0.ɵɵelementEnd();
} }
function CouncilsComponent_Conditional_15_Conditional_37_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const teacher_r18 = ctx.$implicit;
    i0.ɵɵproperty("value", teacher_r18.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", teacher_r18.fullName, " \u00B7 ", teacher_r18.speciality, "");
} }
function CouncilsComponent_Conditional_15_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 86);
    i0.ɵɵlistener("ngSubmit", function CouncilsComponent_Conditional_15_Conditional_37_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.addParticipant()); });
    i0.ɵɵelementStart(1, "label", 12)(2, "span", 13);
    i0.ɵɵtext(3, "Enseignant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 87)(5, "option", 16);
    i0.ɵɵtext(6, "Choisir\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(7, CouncilsComponent_Conditional_15_Conditional_37_For_8_Template, 2, 3, "option", 15, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "label", 12)(10, "span", 13);
    i0.ɵɵtext(11, "R\u00F4le");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 88);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "label", 89);
    i0.ɵɵelement(14, "input", 90);
    i0.ɵɵtext(15, " Pr\u00E9sent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 91);
    i0.ɵɵtext(17, "Ajouter");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroup", ctx_r1.participantForm);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r1.teachers());
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("disabled", ctx_r1.participantForm.invalid || ctx_r1.saving());
} }
function CouncilsComponent_Conditional_15_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.pendingCount(), " d\u00E9cision(s) restent \u00E0 consigner. ");
} }
function CouncilsComponent_Conditional_15_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Les d\u00E9cisions ont \u00E9t\u00E9 fig\u00E9es \u00E0 la cl\u00F4ture. ");
} }
function CouncilsComponent_Conditional_15_For_64_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 28);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_15_For_64_Conditional_14_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r19); const student_r20 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openDecision(student_r20)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const student_r20 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", student_r20.decided ? "Modifier" : "D\u00E9cider", " ");
} }
function CouncilsComponent_Conditional_15_For_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small", 92);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 25);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td")(9, "span", 26);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td", 93);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 24);
    i0.ɵɵtemplate(14, CouncilsComponent_Conditional_15_For_64_Conditional_14_Template, 2, 1, "button", 94);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const student_r20 = ctx.$implicit;
    const council_r13 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("row--pending", !student_r20.decided);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(student_r20.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(student_r20.studentNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(student_r20.annualAverage != null ? student_r20.annualAverage.toLocaleString("fr-FR") + " / 20" : "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-tone", ctx_r1.decisionOf(student_r20.decision).tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.decisionOf(student_r20.decision).label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(student_r20.orientationAdvice || student_r20.justification || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(council_r13.editable && ctx_r1.canDecide() ? 14 : -1);
} }
function CouncilsComponent_Conditional_15_Conditional_65_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 97);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_15_Conditional_65_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r22); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.startCouncil()); });
    i0.ɵɵtext(1, "D\u00E9marrer le conseil");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
} }
function CouncilsComponent_Conditional_15_Conditional_65_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "footer", 52);
    i0.ɵɵtemplate(1, CouncilsComponent_Conditional_15_Conditional_65_Conditional_1_Template, 2, 1, "button", 95);
    i0.ɵɵelementStart(2, "span", 96);
    i0.ɵɵtext(3, "La cl\u00F4ture fige les d\u00E9cisions et les pr\u00E9sences.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 54);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_15_Conditional_65_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.askClose()); });
    i0.ɵɵtext(5, "Clore le conseil");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const council_r13 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(council_r13.status === "PLANNED" ? 1 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
} }
function CouncilsComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_15_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDetail()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 56)(2, "header", 33)(3, "div")(4, "div", 57)(5, "h2", 58);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 26);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "p", 35);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "button", 36);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_15_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDetail()); });
    i0.ɵɵtext(12, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 59)(14, "span")(15, "strong");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span")(19, "strong");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(22, CouncilsComponent_Conditional_15_Conditional_22_Template, 8, 2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 60);
    i0.ɵɵtemplate(24, CouncilsComponent_Conditional_15_Conditional_24_Template, 34, 2, "section", 61)(25, CouncilsComponent_Conditional_15_Conditional_25_Template, 20, 5, "section", 62);
    i0.ɵɵelementStart(26, "section", 61)(27, "div", 63)(28, "div")(29, "h3");
    i0.ɵɵtext(30, "Participants");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "p");
    i0.ɵɵtext(32, "La feuille de pr\u00E9sence fait partie du compte rendu du conseil.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(33, "ul", 64);
    i0.ɵɵrepeaterCreate(34, CouncilsComponent_Conditional_15_For_35_Template, 8, 3, "li", 65, _forTrack0, false, CouncilsComponent_Conditional_15_ForEmpty_36_Template, 2, 0, "li", 66);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(37, CouncilsComponent_Conditional_15_Conditional_37_Template, 18, 2, "form", 67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "section", 68)(39, "div", 63)(40, "div")(41, "h3");
    i0.ɵɵtext(42, "D\u00E9cisions des \u00E9l\u00E8ves");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "p");
    i0.ɵɵtemplate(44, CouncilsComponent_Conditional_15_Conditional_44_Template, 1, 1)(45, CouncilsComponent_Conditional_15_Conditional_45_Template, 1, 0);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(46, "div", 21)(47, "table", 69)(48, "caption", 23);
    i0.ɵɵtext(49, "D\u00E9cisions des \u00E9l\u00E8ves");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "thead")(51, "tr")(52, "th");
    i0.ɵɵtext(53, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "th");
    i0.ɵɵtext(55, "Moyenne annuelle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "th");
    i0.ɵɵtext(57, "D\u00E9cision");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "th");
    i0.ɵɵtext(59, "Orientation / observation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "th", 24);
    i0.ɵɵtext(61, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(62, "tbody");
    i0.ɵɵrepeaterCreate(63, CouncilsComponent_Conditional_15_For_64_Template, 15, 9, "tr", 70, _forTrack2);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵtemplate(65, CouncilsComponent_Conditional_15_Conditional_65_Template, 6, 2, "footer", 52);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const council_r13 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2("", council_r13.classroomName, " \u00B7 ", council_r13.termName, "");
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", ctx_r1.stateOf(council_r13.status).tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", council_r13.statusLabel, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("R\u00E9union du ", ctx_r1.formatDate(council_r13.meetingDate), " \u00B7 ", council_r13.levelName, "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.decidedCount());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" / ", council_r13.students.length, " d\u00E9cisions");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.presentCount());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" / ", council_r13.participants.length, " participant(s) pr\u00E9sent(s)");
    i0.ɵɵadvance();
    i0.ɵɵconditional(council_r13.classAverage != null ? 22 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(council_r13.editable && ctx_r1.canManage() ? 24 : 25);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(council_r13.participants);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(council_r13.editable && ctx_r1.canManage() ? 37 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵconditional(council_r13.editable ? 44 : 45);
    i0.ɵɵadvance(19);
    i0.ɵɵrepeater(council_r13.students);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(council_r13.editable && ctx_r1.canManage() ? 65 : -1);
} }
function CouncilsComponent_Conditional_16_Conditional_1_For_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const decision_r25 = ctx.$implicit;
    i0.ɵɵproperty("value", decision_r25.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(decision_r25.label);
} }
function CouncilsComponent_Conditional_16_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "aside", 99)(1, "header", 33)(2, "div")(3, "h2", 100);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 101);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 36);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_16_Conditional_1_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r24); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeDecision()); });
    i0.ɵɵtext(8, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "form", 37);
    i0.ɵɵlistener("ngSubmit", function CouncilsComponent_Conditional_16_Conditional_1_Template_form_ngSubmit_9_listener() { i0.ɵɵrestoreView(_r24); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.saveDecision()); });
    i0.ɵɵelementStart(10, "p", 38);
    i0.ɵɵtext(11, "Une d\u00E9cision reste rectifiable tant que le conseil n'est pas clos. La moyenne sert au bilan de la classe, pas \u00E0 remplacer la d\u00E9cision du conseil.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "label", 12)(13, "span", 102);
    i0.ɵɵtext(14, "D\u00E9cision");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "select", 103);
    i0.ɵɵrepeaterCreate(16, CouncilsComponent_Conditional_16_Conditional_1_For_17_Template, 2, 2, "option", 15, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "label", 12)(19, "span", 13);
    i0.ɵɵtext(20, "Moyenne annuelle /20");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "input", 104);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "label", 12)(23, "span", 13);
    i0.ɵɵtext(24, "Justification");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "textarea", 105);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "label", 12)(27, "span", 13);
    i0.ɵɵtext(28, "Conseil d'orientation");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(29, "textarea", 106);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "footer", 52)(31, "button", 53);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_16_Conditional_1_Template_button_click_31_listener() { i0.ɵɵrestoreView(_r24); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeDecision()); });
    i0.ɵɵtext(32, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "button", 54);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_16_Conditional_1_Template_button_click_33_listener() { i0.ɵɵrestoreView(_r24); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.saveDecision()); });
    i0.ɵɵtext(34, "Enregistrer la d\u00E9cision");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const student_r26 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("D\u00E9cision pour ", student_r26.studentName, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", student_r26.studentNumber, " \u00B7 ", student_r26.fromLevelName, "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.decisionForm);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r1.decisions);
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("disabled", ctx_r1.decisionForm.invalid || ctx_r1.saving());
} }
function CouncilsComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 98);
    i0.ɵɵlistener("click", function CouncilsComponent_Conditional_16_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDecision()); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(1, CouncilsComponent_Conditional_16_Conditional_1_Template, 35, 5, "aside", 99);
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_2_0 = ctx_r1.deciding()) ? 1 : -1, tmp_2_0);
} }
function CouncilsComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-confirm-dialog", 107);
    i0.ɵɵlistener("cancel", function CouncilsComponent_Conditional_17_Template_eduops_confirm_dialog_cancel_0_listener() { i0.ɵɵrestoreView(_r27); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeConfirmOpen.set(false)); })("confirm", function CouncilsComponent_Conditional_17_Template_eduops_confirm_dialog_confirm_0_listener() { i0.ɵɵrestoreView(_r27); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCouncil()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", "Les " + ctx_r1.decidedCount() + " d\u00E9cisions enregistr\u00E9es, la feuille de pr\u00E9sence et le proc\u00E8s-verbal ne pourront plus \u00EAtre modifi\u00E9s.");
} }
/**
 * The class-council desk: calendar, attendance sheet and individual decisions.
 *
 * A promotion decision is kept on the council, rather than written directly on
 * a future enrollment. That makes the meeting's outcome readable and prevents
 * a later re-enrollment from silently changing what the council concluded.
 */
export class CouncilsComponent {
    dataSource = inject(COUNCIL_DATA_SOURCE);
    classroomsSource = inject(CLASSROOM_DATA_SOURCE);
    referenceSource = inject(REFERENCE_DATA_SOURCE);
    teacherSource = inject(TEACHER_DATA_SOURCE);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    states = COUNCIL_STATES;
    decisions = PROMOTION_DECISIONS;
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    detailLoading = signal(false);
    createOpen = signal(false);
    closeConfirmOpen = signal(false);
    decisionOpen = signal(false);
    years = signal([]);
    terms = signal([]);
    classrooms = signal([]);
    teachers = signal([]);
    councils = signal([]);
    selectedYearId = signal('');
    selectedStatus = signal('');
    detail = signal(null);
    deciding = signal(null);
    canManage = computed(() => this.auth.has(PERMISSIONS.COUNCIL_MANAGE));
    canDecide = computed(() => this.auth.has(PERMISSIONS.PROMOTION_DECIDE));
    filteredClassrooms = computed(() => this.classrooms().filter((classroom) => classroom.academicYearId === this.selectedYearId() && classroom.status === 'ACTIVE'));
    plannedCount = computed(() => this.councils()
        .filter((council) => council.status === 'PLANNED').length);
    inProgressCount = computed(() => this.councils()
        .filter((council) => council.status === 'IN_PROGRESS').length);
    closedCount = computed(() => this.councils()
        .filter((council) => council.status === 'CLOSED').length);
    decidedCount = computed(() => this.detail()?.students
        .filter((student) => student.decided).length ?? 0);
    pendingCount = computed(() => Math.max(0, (this.detail()?.students.length ?? 0) - this.decidedCount()));
    presentCount = computed(() => this.detail()?.participants
        .filter((participant) => participant.present).length ?? 0);
    createForm = this.fb.nonNullable.group({
        classroomId: ['', Validators.required],
        termId: ['', Validators.required],
        meetingDate: [today(), Validators.required],
        startTime: [''],
        endTime: [''],
        location: ['', [Validators.maxLength(150)]]
    });
    meetingForm = this.fb.nonNullable.group({
        meetingDate: ['', Validators.required],
        startTime: [''],
        endTime: [''],
        location: ['', [Validators.maxLength(150)]],
        remarks: [''],
        minutesUrl: ['', [Validators.maxLength(500)]]
    });
    participantForm = this.fb.nonNullable.group({
        teacherId: ['', Validators.required],
        roleLabel: ['Enseignant', [Validators.required, Validators.maxLength(120)]],
        present: [true]
    });
    decisionForm = this.fb.nonNullable.group({
        decision: ['PASS', Validators.required],
        annualAverage: [''],
        justification: [''],
        orientationAdvice: ['', Validators.maxLength(255)]
    });
    ngOnInit() {
        this.initialize();
    }
    initialize() {
        this.loading.set(true);
        this.error.set(false);
        this.referenceSource.academicYears().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (years) => {
                this.years.set(years);
                const active = years.find((year) => year.status === 'ACTIVE') ?? years[0];
                this.selectedYearId.set(active?.id ?? '');
                if (!active) {
                    this.loading.set(false);
                    return;
                }
                forkJoin({
                    classrooms: this.classroomsSource.list(),
                    terms: this.referenceSource.terms(active.id),
                    teachers: this.teacherSource.search({ page: 0, size: 100 })
                }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
                    next: (data) => {
                        this.classrooms.set(data.classrooms);
                        this.terms.set(data.terms);
                        this.teachers.set(data.teachers.content.filter((teacher) => teacher.status === 'ACTIVE'));
                        this.load();
                    },
                    error: () => this.failLoad()
                });
            },
            error: () => this.failLoad()
        });
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.list({
            academicYearId: this.selectedYearId() || undefined,
            status: this.selectedStatus() || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (councils) => {
                this.councils.set(councils);
                this.loading.set(false);
            },
            error: (error) => {
                this.loading.set(false);
                this.error.set(true);
                this.explain(error);
            }
        });
    }
    changeYear(yearId) {
        this.selectedYearId.set(yearId);
        this.detail.set(null);
        this.referenceSource.terms(yearId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (terms) => {
                this.terms.set(terms);
                this.load();
            },
            error: (error) => this.explain(error)
        });
    }
    changeStatus(status) {
        this.selectedStatus.set(status);
        this.load();
    }
    stateOf(status) {
        return this.states.find((state) => state.code === status) ?? this.states[0];
    }
    decisionOf(decision) {
        return this.decisions.find((item) => item.code === (decision ?? 'PENDING_DECISION'))
            ?? this.decisions[0];
    }
    formatDate(value) {
        return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
            .format(new Date(`${value}T12:00:00`));
    }
    openCreate() {
        const firstTerm = this.terms().find((term) => term.status === 'GRADE_ENTRY')
            ?? this.terms().find((term) => term.status === 'OPEN')
            ?? this.terms()[0];
        this.createForm.reset({
            classroomId: this.filteredClassrooms()[0]?.id ?? '',
            termId: firstTerm?.id ?? '',
            meetingDate: today(), startTime: '', endTime: '', location: ''
        });
        this.createOpen.set(true);
    }
    closeCreate() {
        this.createOpen.set(false);
    }
    submitCreate() {
        if (this.createForm.invalid || this.saving()) {
            return;
        }
        const value = this.createForm.getRawValue();
        this.saving.set(true);
        this.dataSource.create({
            ...value,
            startTime: value.startTime || undefined,
            endTime: value.endTime || undefined,
            location: value.location.trim() || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (council) => {
                this.saving.set(false);
                this.closeCreate();
                this.replaceSummary(council);
                this.openDetail(council);
                this.notifications.success(`${council.classroomName} · ${council.termName} est ajouté au calendrier.`, 'Conseil planifié');
            },
            error: (error) => {
                this.saving.set(false);
                this.explain(error);
            }
        });
    }
    openDetail(council) {
        this.detailLoading.set(true);
        this.dataSource.get(council.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (detail) => {
                this.detailLoading.set(false);
                this.setDetail(detail);
            },
            error: (error) => {
                this.detailLoading.set(false);
                this.explain(error);
            }
        });
    }
    closeDetail() {
        this.detail.set(null);
        this.decisionOpen.set(false);
        this.closeConfirmOpen.set(false);
    }
    saveMeeting() {
        const council = this.detail();
        if (!council || !council.editable || this.meetingForm.invalid || this.saving()) {
            return;
        }
        const value = this.meetingForm.getRawValue();
        this.saving.set(true);
        this.dataSource.update(council.id, {
            ...value,
            startTime: value.startTime || undefined,
            endTime: value.endTime || undefined,
            location: value.location.trim() || undefined,
            remarks: value.remarks.trim() || undefined,
            minutesUrl: value.minutesUrl.trim() || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (updated) => {
                this.saving.set(false);
                this.setDetail(updated);
                this.replaceSummary(updated);
                this.notifications.success('Les informations pratiques sont enregistrées.');
            },
            error: (error) => {
                this.saving.set(false);
                this.explain(error);
            }
        });
    }
    startCouncil() {
        const council = this.detail();
        if (!council || this.saving())
            return;
        this.saving.set(true);
        this.dataSource.start(council.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (updated) => {
                this.saving.set(false);
                this.setDetail(updated);
                this.replaceSummary(updated);
                this.notifications.success('Le conseil est ouvert : les décisions peuvent être consignées.');
            },
            error: (error) => {
                this.saving.set(false);
                this.explain(error);
            }
        });
    }
    askClose() {
        if (this.detail() && !this.saving())
            this.closeConfirmOpen.set(true);
    }
    closeCouncil() {
        const council = this.detail();
        if (!council || this.saving())
            return;
        this.saving.set(true);
        this.dataSource.close(council.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (updated) => {
                this.saving.set(false);
                this.closeConfirmOpen.set(false);
                this.setDetail(updated);
                this.replaceSummary(updated);
                this.notifications.success(`${this.decidedCount()} décision(s) sont désormais figées.`, 'Conseil clos');
            },
            error: (error) => {
                this.saving.set(false);
                this.explain(error);
            }
        });
    }
    addParticipant() {
        const council = this.detail();
        if (!council || this.participantForm.invalid || this.saving())
            return;
        const value = this.participantForm.getRawValue();
        this.saving.set(true);
        this.dataSource.addParticipant(council.id, {
            teacherId: value.teacherId,
            roleLabel: value.roleLabel.trim(),
            present: value.present
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (updated) => {
                this.saving.set(false);
                this.setDetail(updated);
                this.participantForm.reset({ teacherId: '', roleLabel: 'Enseignant', present: true });
            },
            error: (error) => {
                this.saving.set(false);
                this.explain(error);
            }
        });
    }
    setPresence(participantId, present) {
        const council = this.detail();
        if (!council || this.saving())
            return;
        this.dataSource.setParticipantPresence(council.id, participantId, present)
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (updated) => this.setDetail(updated),
            error: (error) => this.explain(error)
        });
    }
    removeParticipant(participantId) {
        const council = this.detail();
        if (!council || this.saving())
            return;
        this.saving.set(true);
        this.dataSource.removeParticipant(council.id, participantId)
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (updated) => {
                this.saving.set(false);
                this.setDetail(updated);
            },
            error: (error) => {
                this.saving.set(false);
                this.explain(error);
            }
        });
    }
    openDecision(student) {
        if (!this.canDecide() || !this.detail()?.editable)
            return;
        this.deciding.set(student);
        this.decisionForm.reset({
            decision: student.decision ?? 'PASS',
            annualAverage: student.annualAverage?.toString() ?? '',
            justification: student.justification ?? '',
            orientationAdvice: student.orientationAdvice ?? ''
        });
        this.decisionOpen.set(true);
    }
    closeDecision() {
        this.decisionOpen.set(false);
        this.deciding.set(null);
    }
    saveDecision() {
        const council = this.detail();
        const student = this.deciding();
        if (!council || !student || this.decisionForm.invalid || this.saving())
            return;
        const value = this.decisionForm.getRawValue();
        const annualAverage = value.annualAverage.trim() === '' ? undefined : Number(value.annualAverage);
        if (annualAverage !== undefined && (!Number.isFinite(annualAverage)
            || annualAverage < 0 || annualAverage > 20)) {
            this.notifications.error('La moyenne annuelle doit être comprise entre 0 et 20.', 'Moyenne invalide');
            return;
        }
        this.saving.set(true);
        this.dataSource.recordDecision(council.id, {
            enrollmentId: student.enrollmentId,
            decision: value.decision,
            annualAverage,
            justification: value.justification.trim() || undefined,
            orientationAdvice: value.orientationAdvice.trim() || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (updatedStudent) => {
                this.saving.set(false);
                this.detail.update((current) => current ? {
                    ...current,
                    students: current.students.map((item) => item.enrollmentId === updatedStudent.enrollmentId
                        ? updatedStudent : item)
                } : current);
                this.closeDecision();
                this.notifications.success(`Décision enregistrée pour ${updatedStudent.studentName}.`);
            },
            error: (error) => {
                this.saving.set(false);
                this.explain(error);
            }
        });
    }
    setDetail(detail) {
        this.detail.set(detail);
        this.meetingForm.reset({
            meetingDate: detail.meetingDate,
            startTime: detail.startTime ?? '',
            endTime: detail.endTime ?? '',
            location: detail.location ?? '',
            remarks: detail.remarks ?? '',
            minutesUrl: detail.minutesUrl ?? ''
        });
    }
    replaceSummary(council) {
        const summary = {
            id: council.id, classroomId: council.classroomId, classroomName: council.classroomName,
            termId: council.termId, termName: council.termName, academicYearId: council.academicYearId,
            meetingDate: council.meetingDate, status: council.status,
            classAverage: council.classAverage, successRate: council.successRate
        };
        this.councils.update((items) => {
            const found = items.some((item) => item.id === council.id);
            const next = found ? items.map((item) => item.id === council.id ? summary : item) : [summary, ...items];
            return next.sort((a, b) => b.meetingDate.localeCompare(a.meetingDate));
        });
    }
    failLoad() {
        this.loading.set(false);
        this.error.set(true);
    }
    explain(err) {
        const apiError = err?.error;
        if (apiError?.code) {
            this.notifications.error(translateErrorCode(apiError.code), 'Action refusée');
            return;
        }
        const code = err?.message;
        this.notifications.error(code && /^[A-Z_]+$/.test(code)
            ? translateErrorCode(code) : 'Une erreur est survenue. Réessayez.', 'Action refusée');
    }
    static ɵfac = function CouncilsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CouncilsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CouncilsComponent, selectors: [["eduops-councils"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 18, vars: 7, consts: [[1, "page"], [1, "page__header"], [1, "eyebrow"], [1, "page__title"], [1, "page__meta"], ["type", "button", 1, "btn", "btn--primary"], ["message", "Chargement des conseils de classe..."], [1, "loading-overlay"], ["title", "Clore ce conseil ?", "confirmLabel", "Clore d\u00E9finitivement", 3, "message"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], [3, "retry"], ["aria-label", "Filtres des conseils de classe", 1, "filters", "card"], [1, "field"], [1, "field__label"], [1, "input", 3, "change", "value"], [3, "value"], ["value", ""], [1, "filters__hint"], ["aria-label", "Synth\u00E8se des conseils", 1, "metrics"], [1, "metric", "card"], [1, "card", "table-card"], [1, "table-wrapper"], [1, "table"], [1, "visually-hidden"], [1, "cell-actions"], [1, "numeric"], [1, "state"], [1, "numeric", "muted"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], ["colspan", "6"], [1, "empty"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "create-council-title", 1, "drawer"], [1, "drawer__head"], ["id", "create-council-title", 1, "drawer__title"], [1, "drawer__meta"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "drawer__body", "form-stack", 3, "ngSubmit", "formGroup"], [1, "hint-block"], ["for", "council-classroom", 1, "field__label", "field__label--required"], ["id", "council-classroom", "formControlName", "classroomId", 1, "input"], ["for", "council-term", 1, "field__label", "field__label--required"], ["id", "council-term", "formControlName", "termId", 1, "input"], [1, "grid2"], ["for", "council-date", 1, "field__label", "field__label--required"], ["id", "council-date", "type", "date", "formControlName", "meetingDate", 1, "input"], ["for", "council-start", 1, "field__label"], ["id", "council-start", "type", "time", "formControlName", "startTime", 1, "input"], ["for", "council-end", 1, "field__label"], ["id", "council-end", "type", "time", "formControlName", "endTime", 1, "input"], ["for", "council-location", 1, "field__label"], ["id", "council-location", "formControlName", "location", "placeholder", "Salle des professeurs", 1, "input"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["message", "Ouverture du conseil..."], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "council-detail-title", 1, "drawer", "drawer--wide"], [1, "drawer__title-line"], ["id", "council-detail-title", 1, "drawer__title"], [1, "council-stats", "numeric"], [1, "drawer__body", "detail-body"], [1, "detail-section"], [1, "summary-card"], [1, "detail-section__head"], [1, "participants"], [1, "participants__item"], [1, "participants__empty"], [1, "participant-form", 3, "formGroup"], [1, "detail-section", "detail-section--decisions"], [1, "table", "decision-table"], [3, "row--pending"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click", "disabled"], [1, "meeting-grid", 3, "formGroup"], ["type", "date", "formControlName", "meetingDate", 1, "input"], ["type", "time", "formControlName", "startTime", 1, "input"], ["type", "time", "formControlName", "endTime", 1, "input"], [1, "field", "meeting-grid__location"], ["formControlName", "location", 1, "input"], [1, "field", "meeting-grid__wide"], ["rows", "2", "formControlName", "remarks", "placeholder", "Points retenus pendant la r\u00E9union", 1, "textarea"], ["type", "url", "formControlName", "minutesUrl", "placeholder", "https://\u2026", 1, "input"], ["target", "_blank", "rel", "noopener", 3, "href"], [1, "summary-card__remarks"], [1, "presence"], ["type", "checkbox", 3, "change", "checked"], ["type", "button", 1, "icon-button", 3, "click", "disabled"], [1, "participant-form", 3, "ngSubmit", "formGroup"], ["formControlName", "teacherId", 1, "input"], ["formControlName", "roleLabel", 1, "input"], [1, "presence", "presence--form"], ["type", "checkbox", "formControlName", "present"], ["type", "submit", 1, "btn", "btn--secondary", "btn--sm", 3, "disabled"], [1, "muted", "numeric"], [1, "decision-note"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm"], ["type", "button", 1, "btn", "btn--secondary", 3, "disabled"], [1, "drawer__warning"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], [1, "drawer-backdrop", "drawer-backdrop--front", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "decision-title", 1, "drawer", "drawer--decision"], ["id", "decision-title", 1, "drawer__title"], [1, "drawer__meta", "numeric"], [1, "field__label", "field__label--required"], ["formControlName", "decision", 1, "input"], ["type", "number", "min", "0", "max", "20", "step", "0.01", "formControlName", "annualAverage", "placeholder", "Ex. 12,5", 1, "input"], ["rows", "3", "formControlName", "justification", "placeholder", "\u00C9l\u00E9ments examin\u00E9s par le conseil", 1, "textarea"], ["rows", "2", "formControlName", "orientationAdvice", "placeholder", "Entretien, fili\u00E8re ou \u00E9tablissement conseill\u00E9", 1, "textarea"], ["title", "Clore ce conseil ?", "confirmLabel", "Clore d\u00E9finitivement", 3, "cancel", "confirm", "message"]], template: function CouncilsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "P\u00E9dagogie \u00B7 Fin de p\u00E9riode");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 3);
            i0.ɵɵtext(6, "Conseils de classe");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, "Planifiez la r\u00E9union, consignez les d\u00E9cisions et gardez un proc\u00E8s-verbal lisible.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, CouncilsComponent_Conditional_9_Template, 2, 0, "button", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, CouncilsComponent_Conditional_10_Template, 1, 0, "eduops-loading-state", 6)(11, CouncilsComponent_Conditional_11_Template, 1, 0, "eduops-error-state")(12, CouncilsComponent_Conditional_12_Template, 56, 6);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(13, CouncilsComponent_Conditional_13_Template, 51, 2)(14, CouncilsComponent_Conditional_14_Template, 2, 0, "div", 7)(15, CouncilsComponent_Conditional_15_Template, 66, 16)(16, CouncilsComponent_Conditional_16_Template, 2, 1)(17, CouncilsComponent_Conditional_17_Template, 1, 1, "eduops-confirm-dialog", 8);
        } if (rf & 2) {
            let tmp_4_0;
            let tmp_5_0;
            i0.ɵɵadvance(9);
            i0.ɵɵconditional(ctx.canManage() ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 10 : ctx.error() ? 11 : 12);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.createOpen() ? 13 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.detailLoading() && !ctx.detail() ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_4_0 = ctx.detail()) ? 15 : -1, tmp_4_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_5_0 = ctx.decisionOpen()) ? 16 : -1, tmp_5_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.closeConfirmOpen() ? 17 : -1);
        } }, dependencies: [CommonModule, FormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.MaxValidator, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName, LoadingStateComponent,
            ErrorStateComponent, ConfirmDialogComponent], styles: ["@import 'styles/tokens';\n\n.filters[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(200px, 280px) minmax(160px, 220px) 1fr;\n  gap: var(--space-4);\n  align-items: end;\n  padding: var(--space-4) var(--space-5);\n  margin-bottom: var(--space-4);\n\n  &__hint {\n    margin: 0 0 var(--space-2);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n}\n\n.field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-2); }\n\n.metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: var(--space-3);\n  margin-bottom: var(--space-5);\n}\n\n.metric[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: var(--space-2);\n  padding: var(--space-4) var(--space-5);\n\n  strong { font-family: var(--font-display); font-size: var(--text-2xl); color: var(--text-strong); }\n  span { font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.table-card[_ngcontent-%COMP%] { overflow: hidden; }\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { vertical-align: middle; }\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; }\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { margin-top: 2px; }\n.cell-actions[_ngcontent-%COMP%] { text-align: right; white-space: nowrap; }\n.muted[_ngcontent-%COMP%] { color: var(--text-muted); }\n\n.state[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='todo'] { color: var(--text-muted); background: var(--surface-sunken); }\n  &[data-tone='review'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='done'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='warning'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='danger'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='off'] { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n.empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  padding: var(--space-8);\n  text-align: center;\n  color: var(--text-muted);\n\n  strong { color: var(--text-strong); }\n}\n\n\n\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgb(16 24 40 / 38%);\n\n  &--front { z-index: calc(var(--z-modal) + 1); }\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: var(--z-modal);\n  top: 0;\n  right: 0;\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 100vw);\n  height: 100dvh;\n  background: var(--surface-card);\n  box-shadow: var(--shadow-xl);\n\n  &--wide { width: min(1040px, 100vw); }\n  &--decision { z-index: calc(var(--z-modal) + 2); width: min(520px, 100vw); }\n\n  &__head {\n    display: flex;\n    justify-content: space-between;\n    gap: var(--space-4);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n  &__title { margin: 0; font-family: var(--font-display); font-size: var(--text-xl); color: var(--text-strong); }\n  &__title-line { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; }\n  &__meta { margin: var(--space-1) 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n  &__close { display: grid; flex: none; place-items: center; width: 32px; height: 32px; border: 0; border-radius: var(--radius-input); color: var(--text-muted); background: none; font-size: var(--text-xl); cursor: pointer; }\n  &__close:hover { background: var(--surface-sunken); color: var(--text-strong); }\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n  &__foot { display: flex; align-items: center; justify-content: flex-end; gap: var(--space-3); flex-wrap: wrap; padding: var(--space-4) var(--space-5); border-top: 1px solid var(--border-light); }\n  &__warning { flex: 1; min-width: 220px; margin: 0; font-size: var(--text-xs); color: var(--warning); }\n}\n\n.form-stack[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-4); }\n.grid2[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-3); }\n.hint-block[_ngcontent-%COMP%] { margin: 0; padding: var(--space-3); font-size: var(--text-sm); line-height: 1.5; color: var(--text-muted); background: var(--surface-sunken); border-radius: var(--radius-input); }\n\n.loading-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal);\n  display: grid;\n  place-items: center;\n  background: rgb(255 255 255 / 78%);\n}\n\n\n\n\n.council-stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  flex-wrap: wrap;\n\n  strong { color: var(--text-strong); }\n}\n\n.detail-body[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-6); }\n\n.detail-section[_ngcontent-%COMP%] {\n  padding-bottom: var(--space-6);\n  border-bottom: 1px solid var(--border-light);\n\n  &:last-child { padding-bottom: 0; border-bottom: 0; }\n  &__head { display: flex; justify-content: space-between; gap: var(--space-4); align-items: flex-start; margin-bottom: var(--space-4); }\n  h3 { margin: 0; font-family: var(--font-display); font-size: var(--text-lg); color: var(--text-strong); }\n  p { margin: var(--space-1) 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.meeting-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.25fr .8fr .8fr 1.5fr;\n  gap: var(--space-3);\n\n  &__location { grid-column: span 1; }\n  &__wide { grid-column: 1 / -1; }\n}\n\n.summary-card[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-card);\n\n  dl { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-4); margin: 0; }\n  dt { font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; letter-spacing: .04em; color: var(--text-muted); }\n  dd { margin: var(--space-1) 0 0; color: var(--text-strong); }\n  a { color: var(--brand); }\n  &__remarks { margin: var(--space-4) 0 0; padding-top: var(--space-3); border-top: 1px solid var(--border-light); color: var(--text-normal); }\n}\n\n.participants[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-2); padding: 0; margin: 0; list-style: none; }\n.participants__item[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--surface-sunken); border-radius: var(--radius-input); }\n.participants__item[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n.participants__item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .participants__item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:not(.state) { display: block; }\n.participants__item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--text-strong); }\n.participants__item[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n.participants__empty[_ngcontent-%COMP%] { padding: var(--space-4); color: var(--text-muted); text-align: center; background: var(--surface-sunken); border-radius: var(--radius-input); }\n\n.presence[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--text-normal); cursor: pointer; white-space: nowrap; }\n.presence--form[_ngcontent-%COMP%] { align-self: end; height: 38px; }\n.icon-button[_ngcontent-%COMP%] { display: grid; place-items: center; width: 28px; height: 28px; border: 0; color: var(--text-muted); background: none; font-size: var(--text-lg); cursor: pointer; border-radius: var(--radius-input); }\n.icon-button[_ngcontent-%COMP%]:hover { color: var(--danger); background: var(--danger-bg); }\n\n.participant-form[_ngcontent-%COMP%] { display: grid; grid-template-columns: minmax(180px, 1.6fr) minmax(140px, 1fr) auto auto; gap: var(--space-3); align-items: end; margin-top: var(--space-3); padding: var(--space-3); border: 1px dashed var(--border-strong); border-radius: var(--radius-input); }\n\n.decision-table[_ngcontent-%COMP%] { min-width: 760px; }\n.decision-note[_ngcontent-%COMP%] { max-width: 30ch; font-size: var(--text-sm); color: var(--text-muted); }\n.row--pending[_ngcontent-%COMP%] { background: var(--warning-bg); }\n\n@include mobile {\n  .filters, .meeting-grid, .participant-form { grid-template-columns: 1fr; }\n  .metrics { grid-template-columns: 1fr; }\n  .grid2 { grid-template-columns: 1fr; }\n  .summary-card dl { grid-template-columns: 1fr; gap: var(--space-3); }\n  .drawer, .drawer--wide, .drawer--decision { width: 100vw; }\n  .drawer__foot { align-items: stretch; flex-direction: column; }\n  .drawer__warning { min-width: 0; }\n  .participant-form .presence--form { height: auto; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CouncilsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-councils', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule, LoadingStateComponent,
                    ErrorStateComponent, ConfirmDialogComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <p class=\"eyebrow\">P\u00E9dagogie \u00B7 Fin de p\u00E9riode</p>\n      <h1 class=\"page__title\">Conseils de classe</h1>\n      <p class=\"page__meta\">Planifiez la r\u00E9union, consignez les d\u00E9cisions et gardez un proc\u00E8s-verbal lisible.</p>\n    </div>\n    @if (canManage()) {\n      <button type=\"button\" class=\"btn btn--primary\" (click)=\"openCreate()\">\n        Planifier un conseil\n      </button>\n    }\n  </header>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des conseils de classe...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"initialize()\" />\n  } @else {\n    <section class=\"filters card\" aria-label=\"Filtres des conseils de classe\">\n      <label class=\"field\">\n        <span class=\"field__label\">Ann\u00E9e scolaire</span>\n        <select class=\"input\" [value]=\"selectedYearId()\"\n                (change)=\"changeYear($any($event.target).value)\">\n          @for (year of years(); track year.id) {\n            <option [value]=\"year.id\">{{ year.label }}</option>\n          }\n        </select>\n      </label>\n      <label class=\"field\">\n        <span class=\"field__label\">\u00C9tat</span>\n        <select class=\"input\" [value]=\"selectedStatus()\"\n                (change)=\"changeStatus($any($event.target).value)\">\n          <option value=\"\">Tous les \u00E9tats</option>\n          @for (state of states; track state.code) {\n            <option [value]=\"state.code\">{{ state.label }}</option>\n          }\n        </select>\n      </label>\n      <p class=\"filters__hint\">Un conseil est unique pour une classe et une p\u00E9riode.</p>\n    </section>\n\n    <section class=\"metrics\" aria-label=\"Synth\u00E8se des conseils\">\n      <div class=\"metric card\"><strong>{{ plannedCount() }}</strong><span>\u00E0 venir</span></div>\n      <div class=\"metric card\"><strong>{{ inProgressCount() }}</strong><span>en cours</span></div>\n      <div class=\"metric card\"><strong>{{ closedCount() }}</strong><span>clos</span></div>\n    </section>\n\n    <section class=\"card table-card\">\n      <div class=\"table-wrapper\">\n        <table class=\"table\">\n          <caption class=\"visually-hidden\">Conseils de classe planifi\u00E9s et clos</caption>\n          <thead>\n            <tr>\n              <th>Date</th>\n              <th>Classe</th>\n              <th>P\u00E9riode</th>\n              <th>\u00C9tat</th>\n              <th>Moyenne / r\u00E9ussite</th>\n              <th class=\"cell-actions\">Action</th>\n            </tr>\n          </thead>\n          <tbody>\n            @for (council of councils(); track council.id) {\n              <tr>\n                <td class=\"numeric\">{{ formatDate(council.meetingDate) }}</td>\n                <td><strong>{{ council.classroomName }}</strong></td>\n                <td>{{ council.termName }}</td>\n                <td>\n                  <span class=\"state\" [attr.data-tone]=\"stateOf(council.status).tone\">\n                    {{ stateOf(council.status).label }}\n                  </span>\n                </td>\n                <td class=\"numeric muted\">\n                  @if (council.classAverage != null) {\n                    {{ council.classAverage.toLocaleString('fr-FR') }}/20\n                    <small>{{ council.successRate?.toLocaleString('fr-FR') ?? '\u2014' }} % de r\u00E9ussite</small>\n                  } @else {\n                    \u2014\n                  }\n                </td>\n                <td class=\"cell-actions\">\n                  <button type=\"button\" class=\"btn btn--secondary btn--sm\" (click)=\"openDetail(council)\">\n                    Ouvrir\n                  </button>\n                </td>\n              </tr>\n            } @empty {\n              <tr>\n                <td colspan=\"6\">\n                  <div class=\"empty\">\n                    <strong>Aucun conseil pour ces filtres.</strong>\n                    @if (canManage()) {\n                      <span>Planifiez le premier conseil de cette p\u00E9riode pour commencer.</span>\n                    }\n                  </div>\n                </td>\n              </tr>\n            }\n          </tbody>\n        </table>\n      </div>\n    </section>\n  }\n</div>\n\n@if (createOpen()) {\n  <div class=\"drawer-backdrop\" (click)=\"closeCreate()\"></div>\n  <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"create-council-title\">\n    <header class=\"drawer__head\">\n      <div>\n        <h2 class=\"drawer__title\" id=\"create-council-title\">Planifier un conseil</h2>\n        <p class=\"drawer__meta\">La classe et la p\u00E9riode ne peuvent \u00EAtre choisies qu'une seule fois.</p>\n      </div>\n      <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\" (click)=\"closeCreate()\">\u00D7</button>\n    </header>\n\n    <form class=\"drawer__body form-stack\" [formGroup]=\"createForm\" (ngSubmit)=\"submitCreate()\">\n      <p class=\"hint-block\">\n        Le conseil rassemble les d\u00E9cisions de la p\u00E9riode. Il sera possible d'ajouter les\n        participants et de renseigner le proc\u00E8s-verbal avant sa cl\u00F4ture.\n      </p>\n      <div class=\"field\">\n        <label class=\"field__label field__label--required\" for=\"council-classroom\">Classe</label>\n        <select id=\"council-classroom\" class=\"input\" formControlName=\"classroomId\">\n          <option value=\"\">Choisir une classe\u2026</option>\n          @for (classroom of filteredClassrooms(); track classroom.id) {\n            <option [value]=\"classroom.id\">{{ classroom.name }} \u00B7 {{ classroom.levelName }}</option>\n          }\n        </select>\n      </div>\n      <div class=\"field\">\n        <label class=\"field__label field__label--required\" for=\"council-term\">P\u00E9riode</label>\n        <select id=\"council-term\" class=\"input\" formControlName=\"termId\">\n          <option value=\"\">Choisir une p\u00E9riode\u2026</option>\n          @for (term of terms(); track term.id) {\n            <option [value]=\"term.id\">{{ term.name }}</option>\n          }\n        </select>\n      </div>\n      <div class=\"grid2\">\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"council-date\">Date</label>\n          <input id=\"council-date\" type=\"date\" class=\"input\" formControlName=\"meetingDate\" />\n        </div>\n        <div class=\"field\">\n          <label class=\"field__label\" for=\"council-start\">D\u00E9but</label>\n          <input id=\"council-start\" type=\"time\" class=\"input\" formControlName=\"startTime\" />\n        </div>\n        <div class=\"field\">\n          <label class=\"field__label\" for=\"council-end\">Fin</label>\n          <input id=\"council-end\" type=\"time\" class=\"input\" formControlName=\"endTime\" />\n        </div>\n      </div>\n      <div class=\"field\">\n        <label class=\"field__label\" for=\"council-location\">Lieu</label>\n        <input id=\"council-location\" class=\"input\" formControlName=\"location\"\n               placeholder=\"Salle des professeurs\" />\n      </div>\n    </form>\n    <footer class=\"drawer__foot\">\n      <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeCreate()\">Annuler</button>\n      <button type=\"button\" class=\"btn btn--primary\" [disabled]=\"createForm.invalid || saving()\"\n              (click)=\"submitCreate()\">Planifier</button>\n    </footer>\n  </aside>\n}\n\n@if (detailLoading() && !detail()) {\n  <div class=\"loading-overlay\"><eduops-loading-state message=\"Ouverture du conseil...\" /></div>\n}\n\n@if (detail(); as council) {\n  <div class=\"drawer-backdrop\" (click)=\"closeDetail()\"></div>\n  <aside class=\"drawer drawer--wide\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"council-detail-title\">\n    <header class=\"drawer__head\">\n      <div>\n        <div class=\"drawer__title-line\">\n          <h2 class=\"drawer__title\" id=\"council-detail-title\">{{ council.classroomName }} \u00B7 {{ council.termName }}</h2>\n          <span class=\"state\" [attr.data-tone]=\"stateOf(council.status).tone\">\n            {{ council.statusLabel }}\n          </span>\n        </div>\n        <p class=\"drawer__meta\">R\u00E9union du {{ formatDate(council.meetingDate) }} \u00B7 {{ council.levelName }}</p>\n      </div>\n      <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\" (click)=\"closeDetail()\">\u00D7</button>\n    </header>\n\n    <div class=\"council-stats numeric\">\n      <span><strong>{{ decidedCount() }}</strong> / {{ council.students.length }} d\u00E9cisions</span>\n      <span><strong>{{ presentCount() }}</strong> / {{ council.participants.length }} participant(s) pr\u00E9sent(s)</span>\n      @if (council.classAverage != null) {\n        <span>moyenne <strong>{{ council.classAverage.toLocaleString('fr-FR') }}/20</strong></span>\n        <span>r\u00E9ussite <strong>{{ council.successRate?.toLocaleString('fr-FR') ?? '\u2014' }} %</strong></span>\n      }\n    </div>\n\n    <div class=\"drawer__body detail-body\">\n      @if (council.editable && canManage()) {\n        <section class=\"detail-section\">\n          <div class=\"detail-section__head\">\n            <div><h3>Organisation</h3><p>Les informations pratiques restent modifiables jusqu'\u00E0 la cl\u00F4ture.</p></div>\n            <button type=\"button\" class=\"btn btn--secondary btn--sm\" [disabled]=\"saving() || meetingForm.invalid\"\n                    (click)=\"saveMeeting()\">Enregistrer</button>\n          </div>\n          <form class=\"meeting-grid\" [formGroup]=\"meetingForm\">\n            <label class=\"field\"><span class=\"field__label\">Date</span><input type=\"date\" class=\"input\" formControlName=\"meetingDate\" /></label>\n            <label class=\"field\"><span class=\"field__label\">D\u00E9but</span><input type=\"time\" class=\"input\" formControlName=\"startTime\" /></label>\n            <label class=\"field\"><span class=\"field__label\">Fin</span><input type=\"time\" class=\"input\" formControlName=\"endTime\" /></label>\n            <label class=\"field meeting-grid__location\"><span class=\"field__label\">Lieu</span><input class=\"input\" formControlName=\"location\" /></label>\n            <label class=\"field meeting-grid__wide\"><span class=\"field__label\">Observations</span><textarea class=\"textarea\" rows=\"2\" formControlName=\"remarks\" placeholder=\"Points retenus pendant la r\u00E9union\"></textarea></label>\n            <label class=\"field meeting-grid__wide\"><span class=\"field__label\">Lien vers le proc\u00E8s-verbal</span><input type=\"url\" class=\"input\" formControlName=\"minutesUrl\" placeholder=\"https://\u2026\" /></label>\n          </form>\n        </section>\n      } @else {\n        <section class=\"summary-card\">\n          <dl>\n            <div><dt>Lieu</dt><dd>{{ council.location || 'Non renseign\u00E9' }}</dd></div>\n            <div><dt>Horaire</dt><dd>{{ council.startTime || '\u2014' }} @if (council.endTime) { \u00B7 {{ council.endTime }} }</dd></div>\n            <div><dt>Proc\u00E8s-verbal</dt><dd>@if (council.minutesUrl) { <a [href]=\"council.minutesUrl\" target=\"_blank\" rel=\"noopener\">Consulter</a> } @else { Non joint }</dd></div>\n          </dl>\n          @if (council.remarks) { <p class=\"summary-card__remarks\">{{ council.remarks }}</p> }\n        </section>\n      }\n\n      <section class=\"detail-section\">\n        <div class=\"detail-section__head\">\n          <div><h3>Participants</h3><p>La feuille de pr\u00E9sence fait partie du compte rendu du conseil.</p></div>\n        </div>\n        <ul class=\"participants\">\n          @for (participant of council.participants; track participant.id) {\n            <li class=\"participants__item\">\n              <div><strong>{{ participant.name }}</strong><span>{{ participant.roleLabel }}</span></div>\n              @if (council.editable && canManage()) {\n                <label class=\"presence\"><input type=\"checkbox\" [checked]=\"participant.present\"\n                  (change)=\"setPresence(participant.id, $any($event.target).checked)\" /> Pr\u00E9sent</label>\n                <button type=\"button\" class=\"icon-button\" [attr.aria-label]=\"'Retirer ' + participant.name\"\n                        [disabled]=\"saving()\" (click)=\"removeParticipant(participant.id)\">\u00D7</button>\n              } @else {\n                <span class=\"state\" [attr.data-tone]=\"participant.present ? 'done' : 'off'\">\n                  {{ participant.present ? 'Pr\u00E9sent' : 'Absent' }}\n                </span>\n              }\n            </li>\n          } @empty {\n            <li class=\"participants__empty\">Aucun participant renseign\u00E9.</li>\n          }\n        </ul>\n        @if (council.editable && canManage()) {\n          <form class=\"participant-form\" [formGroup]=\"participantForm\" (ngSubmit)=\"addParticipant()\">\n            <label class=\"field\"><span class=\"field__label\">Enseignant</span>\n              <select class=\"input\" formControlName=\"teacherId\"><option value=\"\">Choisir\u2026</option>\n                @for (teacher of teachers(); track teacher.id) { <option [value]=\"teacher.id\">{{ teacher.fullName }} \u00B7 {{ teacher.speciality }}</option> }\n              </select>\n            </label>\n            <label class=\"field\"><span class=\"field__label\">R\u00F4le</span><input class=\"input\" formControlName=\"roleLabel\" /></label>\n            <label class=\"presence presence--form\"><input type=\"checkbox\" formControlName=\"present\" /> Pr\u00E9sent</label>\n            <button type=\"submit\" class=\"btn btn--secondary btn--sm\" [disabled]=\"participantForm.invalid || saving()\">Ajouter</button>\n          </form>\n        }\n      </section>\n\n      <section class=\"detail-section detail-section--decisions\">\n        <div class=\"detail-section__head\">\n          <div>\n            <h3>D\u00E9cisions des \u00E9l\u00E8ves</h3>\n            <p>@if (council.editable) { {{ pendingCount() }} d\u00E9cision(s) restent \u00E0 consigner. } @else { Les d\u00E9cisions ont \u00E9t\u00E9 fig\u00E9es \u00E0 la cl\u00F4ture. }</p>\n          </div>\n        </div>\n        <div class=\"table-wrapper\">\n          <table class=\"table decision-table\">\n            <caption class=\"visually-hidden\">D\u00E9cisions des \u00E9l\u00E8ves</caption>\n            <thead><tr><th>\u00C9l\u00E8ve</th><th>Moyenne annuelle</th><th>D\u00E9cision</th><th>Orientation / observation</th><th class=\"cell-actions\">Action</th></tr></thead>\n            <tbody>\n              @for (student of council.students; track student.enrollmentId) {\n                <tr [class.row--pending]=\"!student.decided\">\n                  <td><strong>{{ student.studentName }}</strong><small class=\"muted numeric\">{{ student.studentNumber }}</small></td>\n                  <td class=\"numeric\">{{ student.annualAverage != null ? student.annualAverage.toLocaleString('fr-FR') + ' / 20' : '\u2014' }}</td>\n                  <td><span class=\"state\" [attr.data-tone]=\"decisionOf(student.decision).tone\">{{ decisionOf(student.decision).label }}</span></td>\n                  <td class=\"decision-note\">{{ student.orientationAdvice || student.justification || '\u2014' }}</td>\n                  <td class=\"cell-actions\">\n                    @if (council.editable && canDecide()) {\n                      <button type=\"button\" class=\"btn btn--secondary btn--sm\" (click)=\"openDecision(student)\">\n                        {{ student.decided ? 'Modifier' : 'D\u00E9cider' }}\n                      </button>\n                    }\n                  </td>\n                </tr>\n              }\n            </tbody>\n          </table>\n        </div>\n      </section>\n    </div>\n\n    @if (council.editable && canManage()) {\n      <footer class=\"drawer__foot\">\n        @if (council.status === 'PLANNED') {\n          <button type=\"button\" class=\"btn btn--secondary\" [disabled]=\"saving()\" (click)=\"startCouncil()\">D\u00E9marrer le conseil</button>\n        }\n        <span class=\"drawer__warning\">La cl\u00F4ture fige les d\u00E9cisions et les pr\u00E9sences.</span>\n        <button type=\"button\" class=\"btn btn--primary\" [disabled]=\"saving()\" (click)=\"askClose()\">Clore le conseil</button>\n      </footer>\n    }\n  </aside>\n}\n\n@if (decisionOpen(); as open) {\n  <div class=\"drawer-backdrop drawer-backdrop--front\" (click)=\"closeDecision()\"></div>\n  @if (deciding(); as student) {\n    <aside class=\"drawer drawer--decision\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"decision-title\">\n      <header class=\"drawer__head\"><div><h2 class=\"drawer__title\" id=\"decision-title\">D\u00E9cision pour {{ student.studentName }}</h2><p class=\"drawer__meta numeric\">{{ student.studentNumber }} \u00B7 {{ student.fromLevelName }}</p></div><button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\" (click)=\"closeDecision()\">\u00D7</button></header>\n      <form class=\"drawer__body form-stack\" [formGroup]=\"decisionForm\" (ngSubmit)=\"saveDecision()\">\n        <p class=\"hint-block\">Une d\u00E9cision reste rectifiable tant que le conseil n'est pas clos. La moyenne sert au bilan de la classe, pas \u00E0 remplacer la d\u00E9cision du conseil.</p>\n        <label class=\"field\"><span class=\"field__label field__label--required\">D\u00E9cision</span><select class=\"input\" formControlName=\"decision\">@for (decision of decisions; track decision.code) { <option [value]=\"decision.code\">{{ decision.label }}</option> }</select></label>\n        <label class=\"field\"><span class=\"field__label\">Moyenne annuelle /20</span><input type=\"number\" min=\"0\" max=\"20\" step=\"0.01\" class=\"input\" formControlName=\"annualAverage\" placeholder=\"Ex. 12,5\" /></label>\n        <label class=\"field\"><span class=\"field__label\">Justification</span><textarea rows=\"3\" class=\"textarea\" formControlName=\"justification\" placeholder=\"\u00C9l\u00E9ments examin\u00E9s par le conseil\"></textarea></label>\n        <label class=\"field\"><span class=\"field__label\">Conseil d'orientation</span><textarea rows=\"2\" class=\"textarea\" formControlName=\"orientationAdvice\" placeholder=\"Entretien, fili\u00E8re ou \u00E9tablissement conseill\u00E9\"></textarea></label>\n      </form>\n      <footer class=\"drawer__foot\"><button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeDecision()\">Annuler</button><button type=\"button\" class=\"btn btn--primary\" [disabled]=\"decisionForm.invalid || saving()\" (click)=\"saveDecision()\">Enregistrer la d\u00E9cision</button></footer>\n    </aside>\n  }\n}\n\n@if (closeConfirmOpen()) {\n  <eduops-confirm-dialog\n    title=\"Clore ce conseil ?\"\n    [message]=\"'Les ' + decidedCount() + ' d\u00E9cisions enregistr\u00E9es, la feuille de pr\u00E9sence et le proc\u00E8s-verbal ne pourront plus \u00EAtre modifi\u00E9s.'\"\n    confirmLabel=\"Clore d\u00E9finitivement\"\n    (cancel)=\"closeConfirmOpen.set(false)\"\n    (confirm)=\"closeCouncil()\" />\n}\n", styles: ["@import 'styles/tokens';\n\n.filters {\n  display: grid;\n  grid-template-columns: minmax(200px, 280px) minmax(160px, 220px) 1fr;\n  gap: var(--space-4);\n  align-items: end;\n  padding: var(--space-4) var(--space-5);\n  margin-bottom: var(--space-4);\n\n  &__hint {\n    margin: 0 0 var(--space-2);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n}\n\n.field { display: flex; flex-direction: column; gap: var(--space-2); }\n\n.metrics {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: var(--space-3);\n  margin-bottom: var(--space-5);\n}\n\n.metric {\n  display: flex;\n  align-items: baseline;\n  gap: var(--space-2);\n  padding: var(--space-4) var(--space-5);\n\n  strong { font-family: var(--font-display); font-size: var(--text-2xl); color: var(--text-strong); }\n  span { font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.table-card { overflow: hidden; }\n.table td { vertical-align: middle; }\n.table td strong, .table td small { display: block; }\n.table td small { margin-top: 2px; }\n.cell-actions { text-align: right; white-space: nowrap; }\n.muted { color: var(--text-muted); }\n\n.state {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='todo'] { color: var(--text-muted); background: var(--surface-sunken); }\n  &[data-tone='review'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='done'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='warning'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='danger'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='off'] { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n.empty {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  padding: var(--space-8);\n  text-align: center;\n  color: var(--text-muted);\n\n  strong { color: var(--text-strong); }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 drawers */\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgb(16 24 40 / 38%);\n\n  &--front { z-index: calc(var(--z-modal) + 1); }\n}\n\n.drawer {\n  position: fixed;\n  z-index: var(--z-modal);\n  top: 0;\n  right: 0;\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 100vw);\n  height: 100dvh;\n  background: var(--surface-card);\n  box-shadow: var(--shadow-xl);\n\n  &--wide { width: min(1040px, 100vw); }\n  &--decision { z-index: calc(var(--z-modal) + 2); width: min(520px, 100vw); }\n\n  &__head {\n    display: flex;\n    justify-content: space-between;\n    gap: var(--space-4);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n  &__title { margin: 0; font-family: var(--font-display); font-size: var(--text-xl); color: var(--text-strong); }\n  &__title-line { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; }\n  &__meta { margin: var(--space-1) 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n  &__close { display: grid; flex: none; place-items: center; width: 32px; height: 32px; border: 0; border-radius: var(--radius-input); color: var(--text-muted); background: none; font-size: var(--text-xl); cursor: pointer; }\n  &__close:hover { background: var(--surface-sunken); color: var(--text-strong); }\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n  &__foot { display: flex; align-items: center; justify-content: flex-end; gap: var(--space-3); flex-wrap: wrap; padding: var(--space-4) var(--space-5); border-top: 1px solid var(--border-light); }\n  &__warning { flex: 1; min-width: 220px; margin: 0; font-size: var(--text-xs); color: var(--warning); }\n}\n\n.form-stack { display: flex; flex-direction: column; gap: var(--space-4); }\n.grid2 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-3); }\n.hint-block { margin: 0; padding: var(--space-3); font-size: var(--text-sm); line-height: 1.5; color: var(--text-muted); background: var(--surface-sunken); border-radius: var(--radius-input); }\n\n.loading-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal);\n  display: grid;\n  place-items: center;\n  background: rgb(255 255 255 / 78%);\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 council detail */\n\n.council-stats {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  flex-wrap: wrap;\n\n  strong { color: var(--text-strong); }\n}\n\n.detail-body { display: flex; flex-direction: column; gap: var(--space-6); }\n\n.detail-section {\n  padding-bottom: var(--space-6);\n  border-bottom: 1px solid var(--border-light);\n\n  &:last-child { padding-bottom: 0; border-bottom: 0; }\n  &__head { display: flex; justify-content: space-between; gap: var(--space-4); align-items: flex-start; margin-bottom: var(--space-4); }\n  h3 { margin: 0; font-family: var(--font-display); font-size: var(--text-lg); color: var(--text-strong); }\n  p { margin: var(--space-1) 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.meeting-grid {\n  display: grid;\n  grid-template-columns: 1.25fr .8fr .8fr 1.5fr;\n  gap: var(--space-3);\n\n  &__location { grid-column: span 1; }\n  &__wide { grid-column: 1 / -1; }\n}\n\n.summary-card {\n  padding: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-card);\n\n  dl { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-4); margin: 0; }\n  dt { font-size: var(--text-xs); font-weight: 700; text-transform: uppercase; letter-spacing: .04em; color: var(--text-muted); }\n  dd { margin: var(--space-1) 0 0; color: var(--text-strong); }\n  a { color: var(--brand); }\n  &__remarks { margin: var(--space-4) 0 0; padding-top: var(--space-3); border-top: 1px solid var(--border-light); color: var(--text-normal); }\n}\n\n.participants { display: flex; flex-direction: column; gap: var(--space-2); padding: 0; margin: 0; list-style: none; }\n.participants__item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--surface-sunken); border-radius: var(--radius-input); }\n.participants__item > div { flex: 1; min-width: 0; }\n.participants__item strong, .participants__item span:not(.state) { display: block; }\n.participants__item strong { color: var(--text-strong); }\n.participants__item div span { margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n.participants__empty { padding: var(--space-4); color: var(--text-muted); text-align: center; background: var(--surface-sunken); border-radius: var(--radius-input); }\n\n.presence { display: inline-flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--text-normal); cursor: pointer; white-space: nowrap; }\n.presence--form { align-self: end; height: 38px; }\n.icon-button { display: grid; place-items: center; width: 28px; height: 28px; border: 0; color: var(--text-muted); background: none; font-size: var(--text-lg); cursor: pointer; border-radius: var(--radius-input); }\n.icon-button:hover { color: var(--danger); background: var(--danger-bg); }\n\n.participant-form { display: grid; grid-template-columns: minmax(180px, 1.6fr) minmax(140px, 1fr) auto auto; gap: var(--space-3); align-items: end; margin-top: var(--space-3); padding: var(--space-3); border: 1px dashed var(--border-strong); border-radius: var(--radius-input); }\n\n.decision-table { min-width: 760px; }\n.decision-note { max-width: 30ch; font-size: var(--text-sm); color: var(--text-muted); }\n.row--pending { background: var(--warning-bg); }\n\n@include mobile {\n  .filters, .meeting-grid, .participant-form { grid-template-columns: 1fr; }\n  .metrics { grid-template-columns: 1fr; }\n  .grid2 { grid-template-columns: 1fr; }\n  .summary-card dl { grid-template-columns: 1fr; gap: var(--space-3); }\n  .drawer, .drawer--wide, .drawer--decision { width: 100vw; }\n  .drawer__foot { align-items: stretch; flex-direction: column; }\n  .drawer__warning { min-width: 0; }\n  .participant-form .presence--form { height: auto; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CouncilsComponent, { className: "CouncilsComponent", filePath: "frontend/src/app/features/councils/councils.component.ts", lineNumber: 39 }); })();
function today() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60_000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}
//# sourceMappingURL=councils.component.js.map