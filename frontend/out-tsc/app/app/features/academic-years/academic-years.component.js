import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { TERM_TYPES } from '@core/models/academic-year.models';
import { AcademicYearService } from '@core/services/academic-year.service';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.code;
const _forTrack2 = ($index, $item) => $item.sequence;
function AcademicYearsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 12);
    i0.ɵɵlistener("click", function AcademicYearsComponent_Conditional_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreate()); });
    i0.ɵɵtext(1, " + Nouvelle ann\u00E9e ");
    i0.ɵɵelementEnd();
} }
function AcademicYearsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 4);
    i0.ɵɵtext(1, " Tous les \u00E9crans travaillent actuellement sur ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const active_r3 = ctx;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(active_r3.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" (", active_r3.enrollmentCount, " inscription(s), ", active_r3.classroomCount, " classe(s)). ");
} }
function AcademicYearsComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 5);
    i0.ɵɵtext(1, " Aucune ann\u00E9e active. Les \u00E9crans qui d\u00E9pendent de l\u2019ann\u00E9e de travail resteront vides tant que vous n\u2019en aurez pas activ\u00E9 une. ");
    i0.ɵɵelementEnd();
} }
function AcademicYearsComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 6);
} }
function AcademicYearsComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 13);
    i0.ɵɵlistener("retry", function AcademicYearsComponent_Conditional_12_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function AcademicYearsComponent_Conditional_13_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 12);
    i0.ɵɵlistener("click", function AcademicYearsComponent_Conditional_13_Conditional_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openCreate()); });
    i0.ɵɵtext(1, " Cr\u00E9er une ann\u00E9e ");
    i0.ɵɵelementEnd();
} }
function AcademicYearsComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "h2");
    i0.ɵɵtext(2, "Aucune ann\u00E9e scolaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Cr\u00E9ez la premi\u00E8re : sans ann\u00E9e, aucune inscription ni aucune note ne peut \u00EAtre rattach\u00E9e \u00E0 quoi que ce soit.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AcademicYearsComponent_Conditional_13_Conditional_5_Template, 2, 0, "button", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r1.canManage() ? 5 : -1);
} }
function AcademicYearsComponent_Conditional_14_For_2_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const year_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(year_r7.label);
} }
function AcademicYearsComponent_Conditional_14_For_2_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function AcademicYearsComponent_Conditional_14_For_2_Conditional_18_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const year_r7 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.askSwitch(year_r7)); });
    i0.ɵɵtext(1, " Travailler sur cette ann\u00E9e ");
    i0.ɵɵelementEnd();
} }
function AcademicYearsComponent_Conditional_14_For_2_Conditional_19_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1, " Cette ann\u00E9e n\u2019a aucune p\u00E9riode. Elle ne peut pas \u00EAtre activ\u00E9e : aucune note ne pourrait s\u2019y rattacher. ");
    i0.ɵɵelementEnd();
} }
function AcademicYearsComponent_Conditional_14_For_2_Conditional_19_Conditional_1_For_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td")(14, "span");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const term_r9 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(term_r9.sequence);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(term_r9.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 8, term_r9.startDate, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 11, term_r9.endDate, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(term_r9.weight);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap("badge badge--" + term_r9.status.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", term_r9.statusLabel, " ");
} }
function AcademicYearsComponent_Conditional_14_For_2_Conditional_19_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 27)(1, "thead")(2, "tr")(3, "th", 28);
    i0.ɵɵtext(4, "#");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th", 28);
    i0.ɵɵtext(6, "P\u00E9riode");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 28);
    i0.ɵɵtext(8, "D\u00E9but");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 28);
    i0.ɵɵtext(10, "Fin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 28);
    i0.ɵɵtext(12, "Poids");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 28);
    i0.ɵɵtext(14, "\u00C9tat");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "tbody");
    i0.ɵɵrepeaterCreate(16, AcademicYearsComponent_Conditional_14_For_2_Conditional_19_Conditional_1_For_17_Template, 16, 14, "tr", null, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const year_r7 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(16);
    i0.ɵɵrepeater(year_r7.terms);
} }
function AcademicYearsComponent_Conditional_14_For_2_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AcademicYearsComponent_Conditional_14_For_2_Conditional_19_Conditional_0_Template, 2, 0, "p", 26)(1, AcademicYearsComponent_Conditional_14_For_2_Conditional_19_Conditional_1_Template, 18, 0, "table", 27);
} if (rf & 2) {
    const year_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵconditional(year_r7.terms.length === 0 ? 0 : 1);
} }
function AcademicYearsComponent_Conditional_14_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 15)(1, "div", 16)(2, "div", 17)(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AcademicYearsComponent_Conditional_14_For_2_Conditional_5_Template, 2, 1, "p", 18);
    i0.ɵɵelementStart(6, "p", 19);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 20)(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 21);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 22)(16, "button", 23);
    i0.ɵɵlistener("click", function AcademicYearsComponent_Conditional_14_For_2_Template_button_click_16_listener() { const year_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleTerms(year_r7.id)); });
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, AcademicYearsComponent_Conditional_14_For_2_Conditional_18_Template, 2, 0, "button", 24);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(19, AcademicYearsComponent_Conditional_14_For_2_Conditional_19_Template, 2, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const year_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("is-active", year_r7.active);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(year_r7.code);
    i0.ɵɵadvance();
    i0.ɵɵconditional(year_r7.label !== year_r7.code ? 5 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" du ", i0.ɵɵpipeBind2(8, 15, year_r7.startDate, "dd/MM/yyyy"), " au ", i0.ɵɵpipeBind2(9, 18, year_r7.endDate, "dd/MM/yyyy"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap("badge badge--" + ctx_r1.statusTone(year_r7));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", year_r7.statusLabel, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" ", year_r7.enrollmentCount, " inscrit(s) \u00B7 ", year_r7.classroomCount, " classe(s) \u00B7 ", year_r7.terms.length, " p\u00E9riode(s) ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.expanded() === year_r7.id ? "Masquer les p\u00E9riodes" : "Voir les p\u00E9riodes", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.canManage() && !year_r7.active && year_r7.editable ? 18 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.expanded() === year_r7.id ? 19 : -1);
} }
function AcademicYearsComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 9);
    i0.ɵɵrepeaterCreate(1, AcademicYearsComponent_Conditional_14_For_2_Template, 20, 21, "li", 14, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.list());
} }
function AcademicYearsComponent_Conditional_15_For_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 45);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r11 = ctx.$implicit;
    i0.ɵɵproperty("value", type_r11.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(type_r11.label);
} }
function AcademicYearsComponent_Conditional_15_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1, " Ces dates ne permettent pas ce d\u00E9coupage : v\u00E9rifiez que la fin suit le d\u00E9but et que la dur\u00E9e suffit. ");
    i0.ɵɵelementEnd();
} }
function AcademicYearsComponent_Conditional_15_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 49);
    i0.ɵɵtext(1, " Renseignez les dates pour voir le d\u00E9coupage. ");
    i0.ɵɵelementEnd();
} }
function AcademicYearsComponent_Conditional_15_Conditional_41_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "span", 55);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 56);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const term_r12 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(term_r12.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", i0.ɵɵpipeBind2(5, 3, term_r12.startDate, "dd/MM/yyyy"), " \u2192 ", i0.ɵɵpipeBind2(6, 6, term_r12.endDate, "dd/MM/yyyy"), " ");
} }
function AcademicYearsComponent_Conditional_15_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ol", 53);
    i0.ɵɵrepeaterCreate(1, AcademicYearsComponent_Conditional_15_Conditional_41_For_2_Template, 7, 9, "li", null, _forTrack2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 54);
    i0.ɵɵtext(4, " Le d\u00E9coupage couvre l\u2019ann\u00E9e enti\u00E8re, sans trou entre les p\u00E9riodes. ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.preview());
} }
function AcademicYearsComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 10)(1, "form", 29);
    i0.ɵɵlistener("ngSubmit", function AcademicYearsComponent_Conditional_15_Template_form_ngSubmit_1_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵelementStart(2, "header", 30)(3, "h2", 31);
    i0.ɵɵtext(4, "Nouvelle ann\u00E9e scolaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 23);
    i0.ɵɵlistener("click", function AcademicYearsComponent_Conditional_15_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCreate()); });
    i0.ɵɵtext(6, " Fermer ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 32)(8, "div", 33)(9, "label", 34);
    i0.ɵɵtext(10, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 35);
    i0.ɵɵelementStart(12, "span", 36);
    i0.ɵɵtext(13, "R\u00E9f\u00E9rence stable, reprise sur les bulletins.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 33)(15, "label", 37);
    i0.ɵɵtext(16, "Libell\u00E9 (facultatif)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(17, "input", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 33)(19, "label", 39);
    i0.ɵɵtext(20, "D\u00E9but");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "input", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 33)(23, "label", 41);
    i0.ɵɵtext(24, "Fin");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 33)(27, "label", 43);
    i0.ɵɵtext(28, "D\u00E9coupage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "select", 44);
    i0.ɵɵlistener("change", function AcademicYearsComponent_Conditional_15_Template_select_change_29_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onTermTypeChange($event.target.value)); });
    i0.ɵɵrepeaterCreate(30, AcademicYearsComponent_Conditional_15_For_31_Template, 2, 2, "option", 45, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div", 33)(33, "label", 46);
    i0.ɵɵtext(34, "Nombre de p\u00E9riodes");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(35, "input", 47);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "section", 48)(37, "h3");
    i0.ɵɵtext(38, "P\u00E9riodes qui seront cr\u00E9\u00E9es");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(39, AcademicYearsComponent_Conditional_15_Conditional_39_Template, 2, 0, "p", 26)(40, AcademicYearsComponent_Conditional_15_Conditional_40_Template, 2, 0, "p", 49)(41, AcademicYearsComponent_Conditional_15_Conditional_41_Template, 5, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "footer", 50)(43, "button", 51);
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "button", 52);
    i0.ɵɵlistener("click", function AcademicYearsComponent_Conditional_15_Template_button_click_45_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCreate()); });
    i0.ɵɵtext(46, " Annuler ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance(29);
    i0.ɵɵrepeater(ctx_r1.termTypes);
    i0.ɵɵadvance(9);
    i0.ɵɵconditional(ctx_r1.previewImpossible() ? 39 : ctx_r1.preview().length === 0 ? 40 : 41);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || ctx_r1.preview().length === 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Enregistrement\u2026" : "Cr\u00E9er l\u2019ann\u00E9e", " ");
} }
function AcademicYearsComponent_Conditional_16_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const leaving_r14 = ctx;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3(" ", leaving_r14.code, " passe en cl\u00F4ture en cours. Elle reste consultable, avec ses ", leaving_r14.enrollmentCount, " inscription(s) et ses ", leaving_r14.classroomCount, " classe(s), et vous pouvez y revenir \u00E0 tout moment. ");
} }
function AcademicYearsComponent_Conditional_16_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 49);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const target_r15 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", target_r15.code, " ne contient encore aucune inscription : les listes d\u2019\u00E9l\u00E8ves appara\u00EEtront vides jusqu\u2019\u00E0 ce que vous en cr\u00E9iez. ");
} }
function AcademicYearsComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11)(1, "div", 57)(2, "h2", 58);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, " Tous les \u00E9crans \u2014 \u00E9l\u00E8ves, classes, notes, pr\u00E9sences, paiements \u2014 basculeront sur cette ann\u00E9e. ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, AcademicYearsComponent_Conditional_16_Conditional_6_Template, 2, 3, "p", 26)(7, AcademicYearsComponent_Conditional_16_Conditional_7_Template, 2, 1, "p", 49);
    i0.ɵɵelementStart(8, "footer", 50)(9, "button", 59);
    i0.ɵɵlistener("click", function AcademicYearsComponent_Conditional_16_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmSwitch()); });
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 52);
    i0.ɵɵlistener("click", function AcademicYearsComponent_Conditional_16_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancelSwitch()); });
    i0.ɵɵtext(12, " Annuler ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_3_0;
    const target_r15 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Travailler sur ", target_r15.code, " ?");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((tmp_3_0 = ctx_r1.current()) ? 6 : -1, tmp_3_0);
    i0.ɵɵadvance();
    i0.ɵɵconditional(target_r15.enrollmentCount === 0 ? 7 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Bascule\u2026" : "Oui, travailler sur " + target_r15.code, " ");
} }
/**
 * Années scolaires et découpage en périodes.
 *
 * <p>L'action lourde de cet écran est la bascule d'année : une vingtaine
 * d'autres écrans lisent l'année de travail, et en changer ne casse rien —
 * tout se met simplement à décrire une autre année. C'est précisément ce qui
 * la rend dangereuse, et pourquoi elle demande une confirmation qui nomme ce
 * que contient l'année quittée.</p>
 */
export class AcademicYearsComponent {
    years = inject(AcademicYearService);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    termTypes = TERM_TYPES;
    list = signal([]);
    loading = signal(true);
    failed = signal(false);
    saving = signal(false);
    creating = signal(false);
    switching = signal(null);
    expanded = signal(null);
    canManage = computed(() => this.auth.has(PERMISSIONS.ACADEMIC_YEAR_MANAGE));
    current = computed(() => this.list().find((year) => year.active) ?? null);
    form = this.fb.nonNullable.group({
        code: ['', [Validators.required, Validators.maxLength(30)]],
        label: ['', Validators.maxLength(120)],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        termType: ['TRIMESTER', Validators.required],
        termCount: [3, [Validators.required, Validators.min(1), Validators.max(6)]]
    });
    /** Ce que le serveur créera, calculé avec la même règle que lui. */
    preview = signal([]);
    /** Vide tant que les dates ne permettent pas un découpage valable. */
    previewImpossible = computed(() => {
        const value = this.form.getRawValue();
        return Boolean(value.startDate && value.endDate) && this.preview().length === 0;
    });
    helpCopy = {
        title: 'Une année, puis ses périodes',
        description: 'L’année porte les inscriptions, les classes et les frais. '
            + 'Ses périodes portent les notes et les bulletins : sans elles, le '
            + 'carnet reste vide. Le découpage proposé est ajustable, mais il '
            + 'couvre toujours l’année entière, sans trou.',
        points: [
            'Créer une année ne bascule rien : on prépare la rentrée pendant que '
                + 'l’année en cours tourne encore.',
            'Activer une année change ce que voient tous les autres écrans. '
                + 'L’ancienne passe en clôture, et reste consultable.',
            'Le code sert de référence stable — « 2026-2027 » plutôt que '
                + '« Année en cours ».'
        ]
    };
    ngOnInit() {
        this.load();
        this.form.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.refreshPreview());
    }
    load() {
        this.loading.set(true);
        this.failed.set(false);
        this.years.list()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (years) => {
                this.list.set(years);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.failed.set(true);
            }
        });
    }
    openCreate() {
        const suggestion = this.suggestNextYear();
        this.form.reset({
            code: suggestion.code,
            label: '',
            startDate: suggestion.startDate,
            endDate: suggestion.endDate,
            termType: 'TRIMESTER',
            termCount: 3
        });
        this.refreshPreview();
        this.creating.set(true);
    }
    closeCreate() {
        this.creating.set(false);
    }
    /** Change le nombre de périodes par défaut quand on change de découpage. */
    onTermTypeChange(type) {
        const preset = TERM_TYPES.find((item) => item.code === type);
        this.form.patchValue({ termType: type, termCount: preset?.defaultCount ?? 3 });
    }
    refreshPreview() {
        const value = this.form.getRawValue();
        this.preview.set(this.years.previewTerms(value.startDate, value.endDate, value.termType, Number(value.termCount)));
    }
    submit() {
        if (this.form.invalid || this.saving() || this.preview().length === 0) {
            this.form.markAllAsTouched();
            return;
        }
        const value = this.form.getRawValue();
        this.saving.set(true);
        this.years.create({
            code: value.code.trim(),
            label: value.label.trim() || undefined,
            startDate: value.startDate,
            endDate: value.endDate,
            termType: value.termType,
            termCount: Number(value.termCount)
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (year) => {
                this.saving.set(false);
                this.creating.set(false);
                this.notifications.success(`${year.code} créée avec ${year.terms.length} période(s).`, 'Année enregistrée');
                this.load();
            },
            error: (err) => {
                this.saving.set(false);
                this.notifications.error(this.messageOf(err), 'Création refusée');
            }
        });
    }
    askSwitch(year) {
        this.switching.set(year);
    }
    cancelSwitch() {
        this.switching.set(null);
    }
    confirmSwitch() {
        const year = this.switching();
        if (!year || this.saving()) {
            return;
        }
        this.saving.set(true);
        this.years.activate(year.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (activated) => {
                this.saving.set(false);
                this.switching.set(null);
                this.notifications.success(`Tous les écrans travaillent maintenant sur ${activated.code}.`, 'Année de travail changée');
                this.load();
            },
            error: (err) => {
                this.saving.set(false);
                this.notifications.error(this.messageOf(err), 'Bascule refusée');
            }
        });
    }
    toggleTerms(yearId) {
        this.expanded.update((open) => (open === yearId ? null : yearId));
    }
    statusTone(year) {
        return year.status.toLowerCase();
    }
    /**
     * L'année suivante, proposée par défaut.
     *
     * <p>Une rentrée ivoirienne s'ouvre en septembre et se ferme en juillet.
     * Proposer ces dates évite six saisies dans le cas courant ; elles restent
     * modifiables pour les établissements qui suivent un autre calendrier.</p>
     */
    suggestNextYear() {
        const latest = this.list()[0];
        const base = latest ? Number(latest.code.slice(0, 4)) + 1 : new Date().getFullYear();
        const start = Number.isNaN(base) ? new Date().getFullYear() : base;
        return {
            code: `${start}-${start + 1}`,
            startDate: `${start}-09-01`,
            endDate: `${start + 1}-07-31`
        };
    }
    messageOf(err) {
        const failure = err?.error;
        // Le message du serveur d'abord : il nomme le code en doublon ou la durée
        // insuffisante, là où le code d'erreur ne rend qu'une phrase générique.
        return failure?.message?.trim()
            || translateErrorCode(failure?.code ?? 'UNKNOWN');
    }
    static ɵfac = function AcademicYearsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AcademicYearsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AcademicYearsComponent, selectors: [["eduops-academic-years"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 17, vars: 10, consts: [[1, "years"], ["flow", "academic-years", "stepKey", "overview", "eyebrow", "\u00C0 savoir sur cet \u00E9cran", 3, "stepNumber", "totalSteps", "title", "description", "points"], [1, "page-head"], ["type", "button", 1, "btn", "btn--primary"], [1, "banner"], [1, "banner", "banner--warn"], ["message", "Chargement des ann\u00E9es\u2026"], ["title", "Ann\u00E9es indisponibles", "message", "La liste des ann\u00E9es n\u2019a pas pu \u00EAtre charg\u00E9e."], [1, "panel", "empty"], [1, "year-list"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "create-title", 1, "modal"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "switch-title", 1, "modal"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["title", "Ann\u00E9es indisponibles", "message", "La liste des ann\u00E9es n\u2019a pas pu \u00EAtre charg\u00E9e.", 3, "retry"], [1, "year", 3, "is-active"], [1, "year"], [1, "year__head"], [1, "year__identity"], [1, "year__label"], [1, "year__dates"], [1, "year__meta"], [1, "year__counts"], [1, "year__actions"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], [1, "notice", "notice--warn"], [1, "terms"], ["scope", "col"], [1, "modal__panel", 3, "ngSubmit", "formGroup"], [1, "modal__head"], ["id", "create-title"], [1, "grid"], [1, "field"], ["for", "code", 1, "field__label"], ["id", "code", "formControlName", "code", "placeholder", "2026-2027", 1, "input"], [1, "field__hint"], ["for", "label", 1, "field__label"], ["id", "label", "formControlName", "label", "placeholder", "Ann\u00E9e scolaire 2026-2027", 1, "input"], ["for", "startDate", 1, "field__label"], ["id", "startDate", "type", "date", "formControlName", "startDate", 1, "input"], ["for", "endDate", 1, "field__label"], ["id", "endDate", "type", "date", "formControlName", "endDate", 1, "input"], ["for", "termType", 1, "field__label"], ["id", "termType", "formControlName", "termType", 1, "select", 3, "change"], [3, "value"], ["for", "termCount", 1, "field__label"], ["id", "termCount", "type", "number", "min", "1", "max", "6", "formControlName", "termCount", 1, "input"], [1, "preview"], [1, "notice", "notice--muted"], [1, "modal__actions"], ["type", "submit", 1, "btn", "btn--primary", 3, "disabled"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], [1, "preview__list"], [1, "preview__note"], [1, "preview__name"], [1, "preview__span"], [1, "modal__panel", "modal__panel--narrow"], ["id", "switch-title"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"]], template: function AcademicYearsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "eduops-step-coachmark", 1);
            i0.ɵɵelementStart(2, "header", 2)(3, "div")(4, "h1");
            i0.ɵɵtext(5, "Ann\u00E9es et p\u00E9riodes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "L\u2019ann\u00E9e porte les inscriptions et les classes ; ses p\u00E9riodes portent les notes et les bulletins.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(8, AcademicYearsComponent_Conditional_8_Template, 2, 0, "button", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, AcademicYearsComponent_Conditional_9_Template, 5, 3, "p", 4)(10, AcademicYearsComponent_Conditional_10_Template, 2, 0, "p", 5)(11, AcademicYearsComponent_Conditional_11_Template, 1, 0, "eduops-loading-state", 6)(12, AcademicYearsComponent_Conditional_12_Template, 1, 0, "eduops-error-state", 7)(13, AcademicYearsComponent_Conditional_13_Template, 6, 1, "div", 8)(14, AcademicYearsComponent_Conditional_14_Template, 3, 0, "ul", 9)(15, AcademicYearsComponent_Conditional_15_Template, 47, 4, "div", 10)(16, AcademicYearsComponent_Conditional_16_Template, 13, 5, "div", 11);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_6_0;
            let tmp_9_0;
            i0.ɵɵadvance();
            i0.ɵɵproperty("stepNumber", 1)("totalSteps", 1)("title", ctx.helpCopy.title)("description", ctx.helpCopy.description)("points", ctx.helpCopy.points);
            i0.ɵɵadvance(7);
            i0.ɵɵconditional(ctx.canManage() ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_6_0 = ctx.current()) ? 9 : !ctx.loading() && ctx.list().length > 0 ? 10 : -1, tmp_6_0);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading() ? 11 : ctx.failed() ? 12 : ctx.list().length === 0 ? 13 : 14);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.creating() ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_9_0 = ctx.switching()) ? 16 : -1, tmp_9_0);
        } }, dependencies: [CommonModule, i1.DatePipe, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MinValidator, i2.MaxValidator, i2.FormGroupDirective, i2.FormControlName, LoadingStateComponent,
            ErrorStateComponent, StepCoachmarkComponent], styles: [".years[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.page-head[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n\n  h1 {\n    margin: 0 0 0.25rem;\n    font-size: 1.5rem;\n  }\n\n  p {\n    margin: 0;\n    color: var(--text-muted);\n    max-width: 60ch;\n  }\n}\n\n.banner[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.7rem 0.95rem;\n  border-radius: 8px;\n  background: var(--brand-tint);\n  color: var(--text-strong);\n  font-size: 0.9rem;\n\n  &--warn {\n    background: rgba(217, 119, 6, 0.12);\n    color: #b45309;\n  }\n}\n\n.panel[_ngcontent-%COMP%], \n.year[_ngcontent-%COMP%] {\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: 12px;\n  padding: 1rem 1.15rem;\n}\n\n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n\n  h2 { margin: 0; font-size: 1.1rem; }\n  p { margin: 0; color: var(--text-muted); max-width: 48ch; }\n}\n\n.year-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.year[_ngcontent-%COMP%] {\n  &.is-active {\n    border-color: var(--brand);\n    box-shadow: 0 0 0 3px var(--brand-tint);\n  }\n\n  &__head {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.75rem;\n  }\n\n  &__identity h2 {\n    margin: 0;\n    font-size: 1.1rem;\n  }\n\n  &__label,\n  &__dates {\n    margin: 0.1rem 0 0;\n    font-size: 0.85rem;\n    color: var(--text-muted);\n  }\n\n  &__meta {\n    display: flex;\n    flex-direction: column;\n    gap: 0.3rem;\n    align-items: flex-start;\n  }\n\n  &__counts {\n    font-size: 0.8rem;\n    color: var(--text-muted);\n  }\n\n  &__actions {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.4rem;\n  }\n}\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.15rem 0.55rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background: var(--border-subtle, rgba(100, 116, 139, 0.16));\n  color: #475569;\n\n  \n\n  &--active, &--open { background: rgba(22, 163, 74, 0.14); color: #15803d; }\n  &--draft, &--planned { background: rgba(100, 116, 139, 0.16); color: #475569; }\n  &--closing, &--validation { background: rgba(217, 119, 6, 0.16); color: #b45309; }\n  &--closed, &--archived { background: rgba(220, 38, 38, 0.12); color: #b91c1c; }\n  &--grade_entry { background: rgba(37, 99, 235, 0.14); color: #1d4ed8; }\n}\n\n.terms[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 0.85rem;\n  font-size: 0.86rem;\n\n  th, td {\n    padding: 0.45rem 0.55rem;\n    text-align: left;\n    border-bottom: 1px solid var(--border-subtle, rgba(100, 116, 139, 0.2));\n  }\n\n  th {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: var(--text-muted);\n  }\n}\n\n.notice[_ngcontent-%COMP%] {\n  margin: 0.75rem 0 0;\n  padding: 0.6rem 0.85rem;\n  border-radius: 8px;\n  font-size: 0.86rem;\n\n  &--muted {\n    background: rgba(100, 116, 139, 0.08);\n    color: var(--text-muted);\n  }\n\n  &--warn {\n    background: rgba(217, 119, 6, 0.1);\n    color: #b45309;\n  }\n}\n\n\n\n\n.modal[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.4);\n  display: grid;\n  place-items: center;\n  padding: 1rem;\n  z-index: 50;\n\n  &__panel {\n    width: min(46rem, 100%);\n    max-height: 90vh;\n    overflow-y: auto;\n    background: var(--surface-card);\n    border-radius: 12px;\n    padding: 1.25rem;\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n\n    &--narrow { width: min(32rem, 100%); }\n  }\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 1rem;\n\n    h2 { margin: 0; font-size: 1.15rem; }\n  }\n\n  &__actions {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.6rem;\n  }\n\n  h2 { margin: 0; font-size: 1.15rem; }\n  p { margin: 0; font-size: 0.92rem; }\n}\n\n.grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));\n  gap: 0 1rem;\n}\n\n.preview[_ngcontent-%COMP%] {\n  border: 1px solid var(--border-strong);\n  border-radius: 10px;\n  padding: 0.85rem 1rem;\n\n  h3 {\n    margin: 0 0 0.6rem;\n    font-size: 0.95rem;\n  }\n\n  &__list {\n    margin: 0;\n    padding-left: 1.2rem;\n    display: flex;\n    flex-direction: column;\n    gap: 0.3rem;\n    font-size: 0.88rem;\n  }\n\n  &__name { font-weight: 600; }\n\n  &__span {\n    margin-left: 0.5rem;\n    color: var(--text-muted);\n  }\n\n  &__note {\n    margin: 0.6rem 0 0;\n    font-size: 0.8rem;\n    color: var(--text-muted);\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AcademicYearsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-academic-years', standalone: true, imports: [CommonModule, ReactiveFormsModule, LoadingStateComponent,
                    ErrorStateComponent, StepCoachmarkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"years\">\n\n  <eduops-step-coachmark\n    flow=\"academic-years\"\n    stepKey=\"overview\"\n    [stepNumber]=\"1\"\n    [totalSteps]=\"1\"\n    eyebrow=\"\u00C0 savoir sur cet \u00E9cran\"\n    [title]=\"helpCopy.title\"\n    [description]=\"helpCopy.description\"\n    [points]=\"helpCopy.points\" />\n\n  <header class=\"page-head\">\n    <div>\n      <h1>Ann\u00E9es et p\u00E9riodes</h1>\n      <p>L\u2019ann\u00E9e porte les inscriptions et les classes ; ses p\u00E9riodes portent\n        les notes et les bulletins.</p>\n    </div>\n    @if (canManage()) {\n      <button type=\"button\" class=\"btn btn--primary\" (click)=\"openCreate()\">\n        + Nouvelle ann\u00E9e\n      </button>\n    }\n  </header>\n\n  @if (current(); as active) {\n    <p class=\"banner\">\n      Tous les \u00E9crans travaillent actuellement sur\n      <strong>{{ active.code }}</strong>\n      ({{ active.enrollmentCount }} inscription(s), {{ active.classroomCount }} classe(s)).\n    </p>\n  } @else if (!loading() && list().length > 0) {\n    <p class=\"banner banner--warn\">\n      Aucune ann\u00E9e active. Les \u00E9crans qui d\u00E9pendent de l\u2019ann\u00E9e de travail\n      resteront vides tant que vous n\u2019en aurez pas activ\u00E9 une.\n    </p>\n  }\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des ann\u00E9es\u2026\" />\n  } @else if (failed()) {\n    <eduops-error-state\n      title=\"Ann\u00E9es indisponibles\"\n      message=\"La liste des ann\u00E9es n\u2019a pas pu \u00EAtre charg\u00E9e.\"\n      (retry)=\"load()\" />\n  } @else if (list().length === 0) {\n    <div class=\"panel empty\">\n      <h2>Aucune ann\u00E9e scolaire</h2>\n      <p>Cr\u00E9ez la premi\u00E8re : sans ann\u00E9e, aucune inscription ni aucune note ne\n        peut \u00EAtre rattach\u00E9e \u00E0 quoi que ce soit.</p>\n      @if (canManage()) {\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openCreate()\">\n          Cr\u00E9er une ann\u00E9e\n        </button>\n      }\n    </div>\n  } @else {\n    <ul class=\"year-list\">\n      @for (year of list(); track year.id) {\n        <li class=\"year\" [class.is-active]=\"year.active\">\n          <div class=\"year__head\">\n            <div class=\"year__identity\">\n              <h2>{{ year.code }}</h2>\n              @if (year.label !== year.code) {\n                <p class=\"year__label\">{{ year.label }}</p>\n              }\n              <p class=\"year__dates\">\n                du {{ year.startDate | date:'dd/MM/yyyy' }}\n                au {{ year.endDate | date:'dd/MM/yyyy' }}\n              </p>\n            </div>\n\n            <div class=\"year__meta\">\n              <span [class]=\"'badge badge--' + statusTone(year)\">\n                {{ year.statusLabel }}\n              </span>\n              <span class=\"year__counts\">\n                {{ year.enrollmentCount }} inscrit(s) \u00B7\n                {{ year.classroomCount }} classe(s) \u00B7\n                {{ year.terms.length }} p\u00E9riode(s)\n              </span>\n            </div>\n\n            <div class=\"year__actions\">\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                      (click)=\"toggleTerms(year.id)\">\n                {{ expanded() === year.id ? 'Masquer les p\u00E9riodes' : 'Voir les p\u00E9riodes' }}\n              </button>\n              @if (canManage() && !year.active && year.editable) {\n                <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                        (click)=\"askSwitch(year)\">\n                  Travailler sur cette ann\u00E9e\n                </button>\n              }\n            </div>\n          </div>\n\n          @if (expanded() === year.id) {\n            @if (year.terms.length === 0) {\n              <p class=\"notice notice--warn\">\n                Cette ann\u00E9e n\u2019a aucune p\u00E9riode. Elle ne peut pas \u00EAtre activ\u00E9e :\n                aucune note ne pourrait s\u2019y rattacher.\n              </p>\n            } @else {\n              <table class=\"terms\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\">#</th>\n                    <th scope=\"col\">P\u00E9riode</th>\n                    <th scope=\"col\">D\u00E9but</th>\n                    <th scope=\"col\">Fin</th>\n                    <th scope=\"col\">Poids</th>\n                    <th scope=\"col\">\u00C9tat</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  @for (term of year.terms; track term.id) {\n                    <tr>\n                      <td>{{ term.sequence }}</td>\n                      <td>{{ term.name }}</td>\n                      <td>{{ term.startDate | date:'dd/MM/yyyy' }}</td>\n                      <td>{{ term.endDate | date:'dd/MM/yyyy' }}</td>\n                      <td>{{ term.weight }}</td>\n                      <td>\n                        <span [class]=\"'badge badge--' + term.status.toLowerCase()\">\n                          {{ term.statusLabel }}\n                        </span>\n                      </td>\n                    </tr>\n                  }\n                </tbody>\n              </table>\n            }\n          }\n        </li>\n      }\n    </ul>\n  }\n\n  <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 cr\u00E9ation -->\n  @if (creating()) {\n    <div class=\"modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"create-title\">\n      <form class=\"modal__panel\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        <header class=\"modal__head\">\n          <h2 id=\"create-title\">Nouvelle ann\u00E9e scolaire</h2>\n          <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"closeCreate()\">\n            Fermer\n          </button>\n        </header>\n\n        <div class=\"grid\">\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"code\">Code</label>\n            <input id=\"code\" class=\"input\" formControlName=\"code\"\n                   placeholder=\"2026-2027\" />\n            <span class=\"field__hint\">R\u00E9f\u00E9rence stable, reprise sur les bulletins.</span>\n          </div>\n\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"label\">Libell\u00E9 (facultatif)</label>\n            <input id=\"label\" class=\"input\" formControlName=\"label\"\n                   placeholder=\"Ann\u00E9e scolaire 2026-2027\" />\n          </div>\n\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"startDate\">D\u00E9but</label>\n            <input id=\"startDate\" class=\"input\" type=\"date\" formControlName=\"startDate\" />\n          </div>\n\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"endDate\">Fin</label>\n            <input id=\"endDate\" class=\"input\" type=\"date\" formControlName=\"endDate\" />\n          </div>\n\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"termType\">D\u00E9coupage</label>\n            <select id=\"termType\" class=\"select\" formControlName=\"termType\"\n                    (change)=\"onTermTypeChange($any($event.target).value)\">\n              @for (type of termTypes; track type.code) {\n                <option [value]=\"type.code\">{{ type.label }}</option>\n              }\n            </select>\n          </div>\n\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"termCount\">Nombre de p\u00E9riodes</label>\n            <input id=\"termCount\" class=\"input\" type=\"number\" min=\"1\" max=\"6\"\n                   formControlName=\"termCount\" />\n          </div>\n        </div>\n\n        <!--\n          L'aper\u00E7u est le c\u0153ur de ce formulaire : il montre exactement les\n          dates que le serveur cr\u00E9era, calcul\u00E9es avec la m\u00EAme r\u00E8gle.\n        -->\n        <section class=\"preview\">\n          <h3>P\u00E9riodes qui seront cr\u00E9\u00E9es</h3>\n          @if (previewImpossible()) {\n            <p class=\"notice notice--warn\">\n              Ces dates ne permettent pas ce d\u00E9coupage : v\u00E9rifiez que la fin\n              suit le d\u00E9but et que la dur\u00E9e suffit.\n            </p>\n          } @else if (preview().length === 0) {\n            <p class=\"notice notice--muted\">\n              Renseignez les dates pour voir le d\u00E9coupage.\n            </p>\n          } @else {\n            <ol class=\"preview__list\">\n              @for (term of preview(); track term.sequence) {\n                <li>\n                  <span class=\"preview__name\">{{ term.name }}</span>\n                  <span class=\"preview__span\">\n                    {{ term.startDate | date:'dd/MM/yyyy' }} \u2192\n                    {{ term.endDate | date:'dd/MM/yyyy' }}\n                  </span>\n                </li>\n              }\n            </ol>\n            <p class=\"preview__note\">\n              Le d\u00E9coupage couvre l\u2019ann\u00E9e enti\u00E8re, sans trou entre les p\u00E9riodes.\n            </p>\n          }\n        </section>\n\n        <footer class=\"modal__actions\">\n          <button type=\"submit\" class=\"btn btn--primary\"\n                  [disabled]=\"saving() || preview().length === 0\">\n            {{ saving() ? 'Enregistrement\u2026' : 'Cr\u00E9er l\u2019ann\u00E9e' }}\n          </button>\n          <button type=\"button\" class=\"btn btn--ghost\" (click)=\"closeCreate()\">\n            Annuler\n          </button>\n        </footer>\n      </form>\n    </div>\n  }\n\n  <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 confirmation de bascule -->\n  @if (switching(); as target) {\n    <div class=\"modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"switch-title\">\n      <div class=\"modal__panel modal__panel--narrow\">\n        <h2 id=\"switch-title\">Travailler sur {{ target.code }} ?</h2>\n\n        <p>\n          Tous les \u00E9crans \u2014 \u00E9l\u00E8ves, classes, notes, pr\u00E9sences, paiements \u2014\n          basculeront sur cette ann\u00E9e.\n        </p>\n\n        @if (current(); as leaving) {\n          <p class=\"notice notice--warn\">\n            {{ leaving.code }} passe en cl\u00F4ture en cours. Elle reste\n            consultable, avec ses {{ leaving.enrollmentCount }} inscription(s)\n            et ses {{ leaving.classroomCount }} classe(s), et vous pouvez y\n            revenir \u00E0 tout moment.\n          </p>\n        }\n\n        @if (target.enrollmentCount === 0) {\n          <p class=\"notice notice--muted\">\n            {{ target.code }} ne contient encore aucune inscription : les\n            listes d\u2019\u00E9l\u00E8ves appara\u00EEtront vides jusqu\u2019\u00E0 ce que vous en cr\u00E9iez.\n          </p>\n        }\n\n        <footer class=\"modal__actions\">\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"saving()\" (click)=\"confirmSwitch()\">\n            {{ saving() ? 'Bascule\u2026' : 'Oui, travailler sur ' + target.code }}\n          </button>\n          <button type=\"button\" class=\"btn btn--ghost\" (click)=\"cancelSwitch()\">\n            Annuler\n          </button>\n        </footer>\n      </div>\n    </div>\n  }\n\n</section>\n", styles: [".years {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.page-head {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n\n  h1 {\n    margin: 0 0 0.25rem;\n    font-size: 1.5rem;\n  }\n\n  p {\n    margin: 0;\n    color: var(--text-muted);\n    max-width: 60ch;\n  }\n}\n\n.banner {\n  margin: 0;\n  padding: 0.7rem 0.95rem;\n  border-radius: 8px;\n  background: var(--brand-tint);\n  color: var(--text-strong);\n  font-size: 0.9rem;\n\n  &--warn {\n    background: rgba(217, 119, 6, 0.12);\n    color: #b45309;\n  }\n}\n\n.panel,\n.year {\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: 12px;\n  padding: 1rem 1.15rem;\n}\n\n.empty {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n\n  h2 { margin: 0; font-size: 1.1rem; }\n  p { margin: 0; color: var(--text-muted); max-width: 48ch; }\n}\n\n.year-list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.year {\n  &.is-active {\n    border-color: var(--brand);\n    box-shadow: 0 0 0 3px var(--brand-tint);\n  }\n\n  &__head {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.75rem;\n  }\n\n  &__identity h2 {\n    margin: 0;\n    font-size: 1.1rem;\n  }\n\n  &__label,\n  &__dates {\n    margin: 0.1rem 0 0;\n    font-size: 0.85rem;\n    color: var(--text-muted);\n  }\n\n  &__meta {\n    display: flex;\n    flex-direction: column;\n    gap: 0.3rem;\n    align-items: flex-start;\n  }\n\n  &__counts {\n    font-size: 0.8rem;\n    color: var(--text-muted);\n  }\n\n  &__actions {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.4rem;\n  }\n}\n\n.badge {\n  display: inline-block;\n  padding: 0.15rem 0.55rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background: var(--border-subtle, rgba(100, 116, 139, 0.16));\n  color: #475569;\n\n  /* La couleur double l'\u00E9tiquette, elle ne la remplace jamais. */\n  &--active, &--open { background: rgba(22, 163, 74, 0.14); color: #15803d; }\n  &--draft, &--planned { background: rgba(100, 116, 139, 0.16); color: #475569; }\n  &--closing, &--validation { background: rgba(217, 119, 6, 0.16); color: #b45309; }\n  &--closed, &--archived { background: rgba(220, 38, 38, 0.12); color: #b91c1c; }\n  &--grade_entry { background: rgba(37, 99, 235, 0.14); color: #1d4ed8; }\n}\n\n.terms {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 0.85rem;\n  font-size: 0.86rem;\n\n  th, td {\n    padding: 0.45rem 0.55rem;\n    text-align: left;\n    border-bottom: 1px solid var(--border-subtle, rgba(100, 116, 139, 0.2));\n  }\n\n  th {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: var(--text-muted);\n  }\n}\n\n.notice {\n  margin: 0.75rem 0 0;\n  padding: 0.6rem 0.85rem;\n  border-radius: 8px;\n  font-size: 0.86rem;\n\n  &--muted {\n    background: rgba(100, 116, 139, 0.08);\n    color: var(--text-muted);\n  }\n\n  &--warn {\n    background: rgba(217, 119, 6, 0.1);\n    color: #b45309;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 fen\u00EAtres */\n\n.modal {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.4);\n  display: grid;\n  place-items: center;\n  padding: 1rem;\n  z-index: 50;\n\n  &__panel {\n    width: min(46rem, 100%);\n    max-height: 90vh;\n    overflow-y: auto;\n    background: var(--surface-card);\n    border-radius: 12px;\n    padding: 1.25rem;\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n\n    &--narrow { width: min(32rem, 100%); }\n  }\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 1rem;\n\n    h2 { margin: 0; font-size: 1.15rem; }\n  }\n\n  &__actions {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.6rem;\n  }\n\n  h2 { margin: 0; font-size: 1.15rem; }\n  p { margin: 0; font-size: 0.92rem; }\n}\n\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));\n  gap: 0 1rem;\n}\n\n.preview {\n  border: 1px solid var(--border-strong);\n  border-radius: 10px;\n  padding: 0.85rem 1rem;\n\n  h3 {\n    margin: 0 0 0.6rem;\n    font-size: 0.95rem;\n  }\n\n  &__list {\n    margin: 0;\n    padding-left: 1.2rem;\n    display: flex;\n    flex-direction: column;\n    gap: 0.3rem;\n    font-size: 0.88rem;\n  }\n\n  &__name { font-weight: 600; }\n\n  &__span {\n    margin-left: 0.5rem;\n    color: var(--text-muted);\n  }\n\n  &__note {\n    margin: 0.6rem 0 0;\n    font-size: 0.8rem;\n    color: var(--text-muted);\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AcademicYearsComponent, { className: "AcademicYearsComponent", filePath: "frontend/src/app/features/academic-years/academic-years.component.ts", lineNumber: 37 }); })();
//# sourceMappingURL=academic-years.component.js.map