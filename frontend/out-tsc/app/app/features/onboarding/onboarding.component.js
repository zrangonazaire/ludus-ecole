import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { translateErrorCode } from '@core/services/error-messages';
import { OnboardingService } from '@core/services/onboarding.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.code;
function OnboardingComponent_Conditional_15_For_9_Conditional_7_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 29)(1, "input", 24);
    i0.ɵɵlistener("change", function OnboardingComponent_Conditional_15_For_9_Conditional_7_For_2_Template_input_change_1_listener() { const level_r5 = i0.ɵɵrestoreView(_r4).$implicit; const cycle_r2 = i0.ɵɵnextContext(2).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleLevel(cycle_r2.code, level_r5.code)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r5 = ctx.$implicit;
    i0.ɵɵclassProp("chip-check--on", level_r5.selected);
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", level_r5.selected);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", level_r5.name, " ");
} }
function OnboardingComponent_Conditional_15_For_9_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵrepeaterCreate(1, OnboardingComponent_Conditional_15_For_9_Conditional_7_For_2_Template, 3, 4, "label", 28, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cycle_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(cycle_r2.levels);
} }
function OnboardingComponent_Conditional_15_For_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 22)(1, "label", 23)(2, "input", 24);
    i0.ɵɵlistener("change", function OnboardingComponent_Conditional_15_For_9_Template_input_change_2_listener() { const cycle_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleCycle(cycle_r2.code)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 25);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 26);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, OnboardingComponent_Conditional_15_For_9_Conditional_7_Template, 3, 0, "div", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cycle_r2 = ctx.$implicit;
    i0.ɵɵclassProp("cycle--on", cycle_r2.selected);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", cycle_r2.selected);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(cycle_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cycle_r2.levels.length, " niveaux");
    i0.ɵɵadvance();
    i0.ɵɵconditional(cycle_r2.selected ? 7 : -1);
} }
function OnboardingComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 10)(1, "p", 16);
    i0.ɵɵtext(2, "\u00C9tape 1 sur 4");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 17);
    i0.ɵɵtext(4, "Quels cycles enseignez-vous ?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 18);
    i0.ɵɵtext(6, " Structure d'un \u00E9tablissement ivoirien courant, pr\u00E9remplie. Decochez ce qui ne vous concern\u00E9 pas \u2014 vous reglerez ensuite chaque niveau separement. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 19);
    i0.ɵɵrepeaterCreate(8, OnboardingComponent_Conditional_15_For_9_Template, 8, 6, "article", 20, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 21)(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13, " niveaux s\u00E9lectionn\u00E9s ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r2.cycles());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.activeLevels().length);
} }
function OnboardingComponent_Conditional_16_For_25_Conditional_8_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 51)(1, "span", 52);
    i0.ɵɵtext(2, "Noms des classes, s\u00E9par\u00E9s par des virgules");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 64);
    i0.ɵɵlistener("ngModelChange", function OnboardingComponent_Conditional_16_For_25_Conditional_8_Conditional_22_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r10); const level_r8 = i0.ɵɵnextContext(2).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.setCustomNames(level_r8.code, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 55);
    i0.ɵɵtext(5, " Utile pour les noms de couleurs, de saints ou de promotions. ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const level_r8 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", level_r8.customNames)("name", "cn-" + level_r8.code)("placeholder", level_r8.name + " Etoile, " + level_r8.name + " Soleil");
} }
function OnboardingComponent_Conditional_16_For_25_Conditional_8_For_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 63);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const name_r11 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(name_r11);
} }
function OnboardingComponent_Conditional_16_For_25_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 49)(1, "div", 50)(2, "label", 51)(3, "span", 52);
    i0.ɵɵtext(4, "Nombre de classes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 53);
    i0.ɵɵlistener("ngModelChange", function OnboardingComponent_Conditional_16_For_25_Conditional_8_Template_input_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r9); const level_r8 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.setClassCount(level_r8.code, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "label", 51)(7, "span", 52);
    i0.ɵɵtext(8, "Capacit\u00E9 d'une classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "input", 54);
    i0.ɵɵlistener("ngModelChange", function OnboardingComponent_Conditional_16_For_25_Conditional_8_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r9); const level_r8 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.setCapacity(level_r8.code, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 55);
    i0.ɵɵtext(11, " Au-dela, l'inscription exige une d\u00E9rogation justifiee. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "label", 51)(13, "span", 52);
    i0.ɵɵtext(14, "Nommage des classes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "select", 56);
    i0.ɵɵlistener("ngModelChange", function OnboardingComponent_Conditional_16_For_25_Conditional_8_Template_select_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r9); const level_r8 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.setNaming(level_r8.code, $event)); });
    i0.ɵɵelementStart(16, "option", 57);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "option", 58);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "option", 59);
    i0.ɵɵtext(21, "Noms personnalis\u00E9s");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(22, OnboardingComponent_Conditional_16_For_25_Conditional_8_Conditional_22_Template, 6, 3, "label", 51);
    i0.ɵɵelementStart(23, "div", 60)(24, "p", 61);
    i0.ɵɵtext(25, "Classes qui seront cr\u00E9\u00E9es");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 62);
    i0.ɵɵrepeaterCreate(27, OnboardingComponent_Conditional_16_For_25_Conditional_8_For_28_Template, 2, 1, "span", 63, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const level_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", level_r8.classCount)("name", "cc-" + level_r8.code);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", level_r8.capacity)("name", "cap-" + level_r8.code);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", level_r8.naming)("name", "nm-" + level_r8.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Lettres \u2014 ", level_r8.name, " A, B, C");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Chiffres \u2014 ", level_r8.name, " 1, 2, 3");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(level_r8.naming === "CUSTOM" ? 22 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r2.classNamesFor(level_r8));
} }
function OnboardingComponent_Conditional_16_For_25_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 44)(1, "button", 45);
    i0.ɵɵlistener("click", function OnboardingComponent_Conditional_16_For_25_Template_button_click_1_listener() { const level_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleOpenLevel(level_r8.code)); });
    i0.ɵɵelementStart(2, "span", 46);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 47);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 48);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, OnboardingComponent_Conditional_16_For_25_Conditional_8_Template, 29, 9, "div", 49);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r8 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("level--open", ctx_r2.openLevel() === level_r8.code);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-expanded", ctx_r2.openLevel() === level_r8.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r8.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", level_r8.classCount, " classe(s) \u00D7 ", level_r8.capacity, " places ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.openLevel() === level_r8.code ? "\u2212" : "+", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.openLevel() === level_r8.code ? 8 : -1);
} }
function OnboardingComponent_Conditional_16_ForEmpty_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1, "Revenez a l'\u00E9tape 1 pour s\u00E9lectionner au moins un niveau.");
    i0.ɵɵelementEnd();
} }
function OnboardingComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 11)(1, "p", 16);
    i0.ɵɵtext(2, "\u00C9tape 2 sur 4");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 17);
    i0.ɵɵtext(4, "Les classes de chaque niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 18);
    i0.ɵɵtext(6, " Nombre, capacit\u00E9 et nom peuvent differer d'un niveau a l'autre. Depliez un niveau pour l'ajuster, ou appliquez une valeur a tous d'un coup. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 30)(8, "p", 31);
    i0.ɵɵtext(9, "Appliquer a tous les niveaux");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 32)(11, "label", 33)(12, "span");
    i0.ɵɵtext(13, "Classes par niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "input", 34);
    i0.ɵɵlistener("ngModelChange", function OnboardingComponent_Conditional_16_Template_input_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setBulk("classCount", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "button", 35);
    i0.ɵɵlistener("click", function OnboardingComponent_Conditional_16_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.applyToAllLevels("classCount")); });
    i0.ɵɵtext(16, "Appliquer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "label", 33)(18, "span");
    i0.ɵɵtext(19, "Capacit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "input", 36);
    i0.ɵɵlistener("ngModelChange", function OnboardingComponent_Conditional_16_Template_input_ngModelChange_20_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setBulk("capacity", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "button", 35);
    i0.ɵɵlistener("click", function OnboardingComponent_Conditional_16_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.applyToAllLevels("capacity")); });
    i0.ɵɵtext(22, "Appliquer");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "div", 37);
    i0.ɵɵrepeaterCreate(24, OnboardingComponent_Conditional_16_For_25_Template, 9, 8, "article", 38, _forTrack0, false, OnboardingComponent_Conditional_16_ForEmpty_26_Template, 2, 0, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 40)(28, "p", 41);
    i0.ɵɵtext(29, "Total");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "p", 42);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "p", 43);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngModel", ctx_r2.bulk().classCount);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r2.bulk().capacity);
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r2.activeLevels());
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", ctx_r2.totalClasses(), " classes");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r2.activeLevels().length, " niveaux \u2014 ", ctx_r2.totalSeats(), " places au total ");
} }
function OnboardingComponent_Conditional_17_For_9_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 71)(1, "label");
    i0.ɵɵtext(2, "Coef.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 72);
    i0.ɵɵlistener("ngModelChange", function OnboardingComponent_Conditional_17_For_9_Conditional_8_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r14); const subject_r13 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.updateCoefficient(subject_r13.code, $event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const subject_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵattribute("for", "coef-" + subject_r13.code);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "coef-" + subject_r13.code)("ngModel", subject_r13.coefficient)("name", "coef-" + subject_r13.code);
} }
function OnboardingComponent_Conditional_17_For_9_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 67)(1, "label", 68)(2, "input", 24);
    i0.ɵɵlistener("change", function OnboardingComponent_Conditional_17_For_9_Template_input_change_2_listener() { const subject_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleSubject(subject_r13.code)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span")(4, "span", 69);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 70);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(8, OnboardingComponent_Conditional_17_For_9_Conditional_8_Template, 4, 4, "div", 71);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const subject_r13 = ctx.$implicit;
    i0.ɵɵclassProp("subject--on", subject_r13.selected);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", subject_r13.selected);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(subject_r13.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(subject_r13.code);
    i0.ɵɵadvance();
    i0.ɵɵconditional(subject_r13.selected ? 8 : -1);
} }
function OnboardingComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 10)(1, "p", 16);
    i0.ɵɵtext(2, "\u00C9tape 3 sur 4");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 17);
    i0.ɵɵtext(4, "Quelles mati\u00E8res et quels coefficients ?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 18);
    i0.ɵɵtext(6, " Ces coefficients servent de base au calcul des moyennes. Ils restent ajustables niveau par niveau depuis le programme scolaire. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 65);
    i0.ɵɵrepeaterCreate(8, OnboardingComponent_Conditional_17_For_9_Template, 9, 6, "div", 66, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 21)(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13, " mati\u00E8res s\u00E9lectionn\u00E9es ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r2.subjects());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.selectedSubjectCount());
} }
function OnboardingComponent_Conditional_18_For_49_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td", 79)(5, "input", 80);
    i0.ɵɵlistener("ngModelChange", function OnboardingComponent_Conditional_18_For_49_Template_input_ngModelChange_5_listener($event) { const level_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.setRegistrationFee(level_r17.code, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 79)(7, "input", 81);
    i0.ɵɵlistener("ngModelChange", function OnboardingComponent_Conditional_18_For_49_Template_input_ngModelChange_7_listener($event) { const level_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.setTuitionTotal(level_r17.code, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td", 79)(9, "input", 82);
    i0.ɵɵlistener("ngModelChange", function OnboardingComponent_Conditional_18_For_49_Template_input_ngModelChange_9_listener($event) { const level_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.setInstalments(level_r17.code, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "td", 83);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 83)(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "number");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const level_r17 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(level_r17.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngModel", level_r17.registrationFee)("name", "reg-" + level_r17.code);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngModel", level_r17.tuitionTotal)("name", "tui-" + level_r17.code);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngModel", level_r17.instalments)("name", "ins-" + level_r17.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 9, ctx_r2.instalmentAmount(level_r17), "1.0-0"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(16, 12, ctx_r2.totalPerStudent(level_r17), "1.0-0"));
} }
function OnboardingComponent_Conditional_18_ForEmpty_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 84);
    i0.ɵɵtext(2, "Aucun niveau s\u00E9lectionn\u00E9.");
    i0.ɵɵelementEnd()();
} }
function OnboardingComponent_Conditional_18_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40)(1, "p", 41);
    i0.ɵɵtext(2, "Fourchette de scolarit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 42);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "number");
    i0.ɵɵpipe(6, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 85);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const range_r18 = ctx;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2(" ", i0.ɵɵpipeBind2(5, 3, range_r18.min, "1.0-0"), " \u2014 ", i0.ɵɵpipeBind2(6, 6, range_r18.max, "1.0-0"), " FCFA ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" Un \u00E9ch\u00E9ancier distinct sera cr\u00E9\u00E9 pour chacun des ", ctx_r2.activeLevels().length, " niveaux. ");
} }
function OnboardingComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 11)(1, "p", 16);
    i0.ɵɵtext(2, "\u00C9tape 4 sur 4");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h1", 17);
    i0.ɵɵtext(4, "La scolarit\u00E9 de chaque niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 18);
    i0.ɵɵtext(6, " Les tarifs augmentent generalement avec le niveau. Chaque niveau a donc ses propres frais et son propre \u00E9ch\u00E9ancier, g\u00E9n\u00E9r\u00E9 automatiquement a l'inscription. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 30)(8, "p", 31);
    i0.ɵɵtext(9, "Appliquer a tous les niveaux");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 32)(11, "label", 33)(12, "span");
    i0.ɵɵtext(13, "Inscription");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "input", 73);
    i0.ɵɵlistener("ngModelChange", function OnboardingComponent_Conditional_18_Template_input_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setBulk("registrationFee", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "button", 35);
    i0.ɵɵlistener("click", function OnboardingComponent_Conditional_18_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.applyToAllLevels("registrationFee")); });
    i0.ɵɵtext(16, "Appliquer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "label", 33)(18, "span");
    i0.ɵɵtext(19, "Scolarit\u00E9 annuelle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "input", 74);
    i0.ɵɵlistener("ngModelChange", function OnboardingComponent_Conditional_18_Template_input_ngModelChange_20_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setBulk("tuitionTotal", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "button", 35);
    i0.ɵɵlistener("click", function OnboardingComponent_Conditional_18_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.applyToAllLevels("tuitionTotal")); });
    i0.ɵɵtext(22, "Appliquer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "label", 33)(24, "span");
    i0.ɵɵtext(25, "\u00C9ch\u00E9ances");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "input", 75);
    i0.ɵɵlistener("ngModelChange", function OnboardingComponent_Conditional_18_Template_input_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setBulk("instalments", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "button", 35);
    i0.ɵɵlistener("click", function OnboardingComponent_Conditional_18_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.applyToAllLevels("instalments")); });
    i0.ɵɵtext(28, "Appliquer");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "div", 76)(30, "table", 77)(31, "caption", 78);
    i0.ɵɵtext(32, "Frais de scolarit\u00E9 par niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "thead")(34, "tr")(35, "th");
    i0.ɵɵtext(36, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "th", 79);
    i0.ɵɵtext(38, "Inscription");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "th", 79);
    i0.ɵɵtext(40, "Scolarit\u00E9 annuelle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "th", 79);
    i0.ɵɵtext(42, "\u00C9ch\u00E9ances");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "th", 79);
    i0.ɵɵtext(44, "Montant par \u00E9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "th", 79);
    i0.ɵɵtext(46, "Total par \u00E9l\u00E8ve");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(47, "tbody");
    i0.ɵɵrepeaterCreate(48, OnboardingComponent_Conditional_18_For_49_Template, 17, 15, "tr", null, _forTrack0, false, OnboardingComponent_Conditional_18_ForEmpty_50_Template, 3, 0, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(51, OnboardingComponent_Conditional_18_Conditional_51_Template, 9, 9, "div", 40);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_5_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngModel", ctx_r2.bulk().registrationFee);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r2.bulk().tuitionTotal);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r2.bulk().instalments);
    i0.ɵɵadvance(22);
    i0.ɵɵrepeater(ctx_r2.activeLevels());
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((tmp_5_0 = ctx_r2.tuitionRange()) ? 51 : -1, tmp_5_0);
} }
function OnboardingComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 86);
    i0.ɵɵlistener("click", function OnboardingComponent_Conditional_20_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r19); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.back()); });
    i0.ɵɵtext(1, "Retour");
    i0.ɵɵelementEnd();
} }
function OnboardingComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span");
} }
function OnboardingComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 87);
    i0.ɵɵlistener("click", function OnboardingComponent_Conditional_22_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r20); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.next()); });
    i0.ɵɵtext(1, "Continuer");
    i0.ɵɵelementEnd();
} }
function OnboardingComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 88);
    i0.ɵɵlistener("click", function OnboardingComponent_Conditional_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r21); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.finish()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r2.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.saving() ? "Configuration..." : "Terminer la configuration", " ");
} }
export class OnboardingComponent {
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    router = inject(Router);
    onboarding = inject(OnboardingService);
    destroyRef = inject(DestroyRef);
    step = signal(1);
    saving = signal(false);
    user = this.auth.currentUser;
    /** Which level is expanded in steps 2 and 4. */
    openLevel = signal(null);
    cycles = signal([
        {
            code: 'PRE', name: 'Préscolaire', selected: false,
            levels: [
                { code: 'PS', name: 'Petite section', selected: true },
                { code: 'MS', name: 'Moyenne section', selected: true },
                { code: 'GS', name: 'Grande section', selected: true }
            ]
        },
        {
            code: 'PRI', name: 'Primaire', selected: true,
            levels: [
                { code: 'CP1', name: 'CP1', selected: true },
                { code: 'CP2', name: 'CP2', selected: true },
                { code: 'CE1', name: 'CE1', selected: true },
                { code: 'CE2', name: 'CE2', selected: true },
                { code: 'CM1', name: 'CM1', selected: true },
                { code: 'CM2', name: 'CM2', selected: true }
            ]
        },
        {
            code: 'COL', name: 'Collège', selected: true,
            levels: [
                { code: '6EME', name: '6eme', selected: true },
                { code: '5EME', name: '5eme', selected: true },
                { code: '4EME', name: '4eme', selected: true },
                { code: '3EME', name: '3eme', selected: true }
            ]
        },
        {
            code: 'LYC', name: 'Lycée', selected: false,
            levels: [
                { code: '2NDE', name: '2nde', selected: true },
                { code: '1ERE', name: '1ere', selected: true },
                { code: 'TLE', name: 'Terminale', selected: true }
            ]
        }
    ]);
    /** Per-level settings, rebuilt whenever the cycle selection changes. */
    levelSetups = signal([]);
    subjects = signal([
        { code: 'FRA', name: 'Français', coefficient: 4, selected: true },
        { code: 'MAT', name: 'Mathematiques', coefficient: 4, selected: true },
        { code: 'ANG', name: 'Anglais', coefficient: 2, selected: true },
        { code: 'HG', name: 'Histoire-Geographie', coefficient: 2, selected: true },
        { code: 'SVT', name: 'Sciences de la Vie et de la Terre', coefficient: 2, selected: true },
        { code: 'PC', name: 'Physique-Chimie', coefficient: 2, selected: true },
        { code: 'EPS', name: 'Education Physique et Sportive', coefficient: 1, selected: true },
        { code: 'ECM', name: 'Education Civique et Morale', coefficient: 1, selected: false },
        { code: 'INFO', name: 'Informatique', coefficient: 1, selected: false }
    ]);
    /** Values used by the "apply to every level" shortcuts. */
    bulk = signal({
        classCount: 2,
        capacity: 40,
        registrationFee: 25000,
        tuitionTotal: 600000,
        instalments: 3
    });
    constructor() {
        this.rebuildLevelSetups();
    }
    // ---------------------------------------------------------------- totals
    activeLevels = computed(() => this.levelSetups().filter((l) => l.selected));
    totalClasses = computed(() => this.activeLevels().reduce((n, l) => n + l.classCount, 0));
    totalSeats = computed(() => this.activeLevels().reduce((n, l) => n + l.classCount * l.capacity, 0));
    selectedSubjectCount = computed(() => this.subjects().filter((s) => s.selected).length);
    /** Range of annual tuition across levels, shown as a sanity check. */
    tuitionRange = computed(() => {
        const values = this.activeLevels().map((l) => l.tuitionTotal);
        if (values.length === 0) {
            return null;
        }
        return { min: Math.min(...values), max: Math.max(...values) };
    });
    // ------------------------------------------------------------- cycles
    toggleCycle(code) {
        this.cycles.update((list) => list.map((c) => (c.code === code ? { ...c, selected: !c.selected } : c)));
        this.rebuildLevelSetups();
    }
    toggleLevel(cycleCode, levelCode) {
        this.cycles.update((list) => list.map((c) => c.code !== cycleCode ? c : {
            ...c,
            levels: c.levels.map((l) => l.code === levelCode ? { ...l, selected: !l.selected } : l)
        }));
        this.rebuildLevelSetups();
    }
    /**
     * Keeps {@link levelSetups} in step with the cycle selection, preserving any
     * value the administrator already typed for a level that stays selected.
     */
    rebuildLevelSetups() {
        const previous = new Map(this.levelSetups().map((l) => [l.code, l]));
        const defaults = this.bulk();
        const next = [];
        for (const cycle of this.cycles()) {
            if (!cycle.selected) {
                continue;
            }
            for (const level of cycle.levels) {
                if (!level.selected) {
                    continue;
                }
                next.push(previous.get(level.code) ?? {
                    cycleCode: cycle.code,
                    code: level.code,
                    name: level.name,
                    selected: true,
                    classCount: defaults.classCount,
                    naming: 'LETTER',
                    customNames: '',
                    capacity: defaults.capacity,
                    registrationFee: defaults.registrationFee,
                    tuitionTotal: defaults.tuitionTotal,
                    instalments: defaults.instalments
                });
            }
        }
        this.levelSetups.set(next);
    }
    // -------------------------------------------------------- per level edits
    patchLevel(code, patch) {
        this.levelSetups.update((list) => list.map((l) => (l.code === code ? { ...l, ...patch } : l)));
    }
    setClassCount(code, value) {
        this.patchLevel(code, { classCount: Math.max(1, Math.min(20, Number(value) || 1)) });
    }
    setCapacity(code, value) {
        this.patchLevel(code, { capacity: Math.max(1, Math.min(200, Number(value) || 1)) });
    }
    setNaming(code, value) {
        this.patchLevel(code, { naming: value });
    }
    setCustomNames(code, value) {
        this.patchLevel(code, { customNames: value });
    }
    setRegistrationFee(code, value) {
        this.patchLevel(code, { registrationFee: Math.max(0, Number(value) || 0) });
    }
    setTuitionTotal(code, value) {
        this.patchLevel(code, { tuitionTotal: Math.max(0, Number(value) || 0) });
    }
    setInstalments(code, value) {
        this.patchLevel(code, { instalments: Math.max(1, Number(value) || 1) });
    }
    toggleOpenLevel(code) {
        this.openLevel.update((current) => (current === code ? null : code));
    }
    // ------------------------------------------------------------- bulk apply
    setBulk(field, value) {
        this.bulk.update((b) => ({ ...b, [field]: Number(value) || 0 }));
    }
    /** Copies one bulk value onto every level, so nobody types it thirteen times. */
    applyToAllLevels(field) {
        const value = this.bulk()[field];
        this.levelSetups.update((list) => list.map((l) => ({ ...l, [field]: value })));
        this.notifications.info(`Valeur appliquee aux ${this.activeLevels().length} niveaux.`);
    }
    // ------------------------------------------------------------- previews
    /** The class names that will actually be created for a level. */
    classNamesFor(level) {
        if (level.naming === 'CUSTOM') {
            const parts = level.customNames.split(',').map((p) => p.trim()).filter(Boolean);
            return parts.length > 0 ? parts : [level.name];
        }
        const suffixes = level.naming === 'LETTER'
            ? 'ABCDEFGHIJKLMNOPQRST'.split('')
            : Array.from({ length: 20 }, (_, i) => String(i + 1));
        return Array.from({ length: level.classCount }, (_, i) => `${level.name} ${suffixes[i] ?? i + 1}`);
    }
    instalmentAmount(level) {
        return level.instalments > 0
            ? Math.round(level.tuitionTotal / level.instalments)
            : 0;
    }
    totalPerStudent(level) {
        return level.tuitionTotal + level.registrationFee;
    }
    // --------------------------------------------------------------- subjects
    toggleSubject(code) {
        this.subjects.update((list) => list.map((s) => (s.code === code ? { ...s, selected: !s.selected } : s)));
    }
    updateCoefficient(code, value) {
        this.subjects.update((list) => list.map((s) => (s.code === code ? { ...s, coefficient: Number(value) || 1 } : s)));
    }
    // ------------------------------------------------------------- navigation
    next() {
        this.step.update((s) => (s < 4 ? (s + 1) : s));
    }
    back() {
        this.step.update((s) => (s > 1 ? (s - 1) : s));
    }
    skip() {
        void this.router.navigate(['/dashboard']);
    }
    /**
     * Envoie la configuration au serveur, et n'annonce que ce qui a été créé.
     *
     * <p>Cette méthode se contentait d'un `setTimeout` de 900 ms suivi d'un
     * message « Établissement configuré » énonçant les chiffres saisis. Rien
     * n'était enregistré — le composant n'injectait même pas de source de
     * données. Le directeur ne s'en apercevait que des semaines plus tard,
     * devant un écran Classes vide.</p>
     *
     * <p>Le message final reprend maintenant les compteurs renvoyés par le
     * serveur, pas les nôtres. S'il en crée quatre là où l'écran en montrait
     * quatorze, c'est quatre qui s'affichent.</p>
     */
    finish() {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        this.onboarding.apply(this.buildPayload())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (result) => {
                this.saving.set(false);
                this.notifications.success(`${result.levels} niveau(x), ${result.classrooms} classe(s), `
                    + `${result.subjects} matière(s) et ${result.feeSchedules} barème(s) `
                    + 'créés, avec une scolarité propre à chaque niveau.', 'Établissement configuré');
                // Ce qui a été écarté se dit à part : l'école voit quoi reprendre
                // plutôt que de découvrir un niveau manquant dans trois semaines.
                if (result.skipped.length > 0) {
                    this.notifications.warning(result.skipped.join(' '), `${result.skipped.length} élément(s) ignoré(s)`);
                }
                void this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                this.saving.set(false);
                // On reste sur l'assistant : rien n'a été créé côté serveur, la
                // saisie est intacte, et l'utilisateur peut réessayer sans tout
                // ressaisir. L'envoyer au tableau de bord lui ferait croire que
                // c'est passé.
                // Le serveur écrit souvent mieux que le catalogue de codes : il sait
                // que « l'établissement a déjà des cycles » et dit quoi faire à la
                // place. Le remplacer par « L'opération est en conflit avec l'état
                // actuel » perdrait tout ce qui est utile.
                const failure = err?.error;
                const message = failure?.message?.trim()
                    || translateErrorCode(failure?.code ?? 'UNKNOWN');
                this.notifications.error(message, 'La configuration n’a pas été enregistrée');
            }
        });
    }
    /** Traduit l'état de l'assistant en ce que le serveur attend. */
    buildPayload() {
        const levelsByCycle = new Map();
        for (const level of this.activeLevels()) {
            const rows = levelsByCycle.get(level.cycleCode) ?? [];
            rows.push({
                code: level.code,
                name: level.name,
                // Les noms sont résolus ici, pas sur le serveur : l'école recevra
                // exactement ceux que l'aperçu lui a montrés, y compris les siens.
                classNames: this.classNamesFor(level),
                capacity: level.capacity,
                registrationFee: level.registrationFee,
                tuitionTotal: level.tuitionTotal,
                instalments: level.instalments
            });
            levelsByCycle.set(level.cycleCode, rows);
        }
        const cycles = [];
        for (const cycle of this.cycles()) {
            const levels = levelsByCycle.get(cycle.code);
            // Un cycle dont aucun niveau n'est retenu n'a rien à ouvrir.
            if (!levels || levels.length === 0) {
                continue;
            }
            cycles.push({ code: cycle.code, name: cycle.name, levels });
        }
        return {
            cycles,
            subjects: this.subjects()
                .filter((subject) => subject.selected)
                .map((subject) => ({
                code: subject.code,
                name: subject.name,
                coefficient: subject.coefficient
            }))
        };
    }
    firstName() {
        return this.user()?.fullName.split(' ')[0] ?? '';
    }
    static ɵfac = function OnboardingComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OnboardingComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OnboardingComponent, selectors: [["eduops-onboarding"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 24, vars: 10, consts: [[1, "onboarding"], [1, "ob__header"], [1, "ob__brand"], ["aria-hidden", "true", 1, "ob__logo"], [1, "ob__title"], [1, "ob__subtitle"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["role", "progressbar", "aria-valuemin", "1", "aria-valuemax", "4", 1, "ob__progress"], [1, "ob__progress-fill"], ["id", "main-content", 1, "ob__body"], [1, "pane"], [1, "pane", "pane--wide"], [1, "ob__footer"], ["type", "button", 1, "btn", "btn--secondary"], ["type", "button", 1, "btn", "btn--primary", "btn--lg"], ["type", "button", 1, "btn", "btn--primary", "btn--lg", 3, "disabled"], [1, "pane__step"], [1, "pane__title"], [1, "pane__lead"], [1, "cycles"], [1, "cycle", 3, "cycle--on"], [1, "pane__summary"], [1, "cycle"], [1, "cycle__head"], ["type", "checkbox", 3, "change", "checked"], [1, "cycle__name"], [1, "cycle__count"], [1, "cycle__levels"], [1, "chip-check", 3, "chip-check--on"], [1, "chip-check"], [1, "bulk"], [1, "bulk__title"], [1, "bulk__row"], [1, "bulk__field"], ["type", "number", "min", "1", "max", "20", "name", "bulkClassCount", 1, "input", "input--small", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], ["type", "number", "min", "1", "max", "200", "name", "bulkCapacity", 1, "input", "input--small", 3, "ngModelChange", "ngModel"], [1, "levels"], [1, "level", 3, "level--open"], [1, "empty"], [1, "preview"], [1, "preview__title"], [1, "preview__value", "numeric"], [1, "preview__detail", "numeric"], [1, "level"], ["type", "button", 1, "level__head", 3, "click"], [1, "level__name"], [1, "level__recap", "numeric"], ["aria-hidden", "true", 1, "level__sign"], [1, "level__body"], [1, "level__grid"], [1, "field"], [1, "field__label"], ["type", "number", "min", "1", "max", "20", 1, "input", 3, "ngModelChange", "ngModel", "name"], ["type", "number", "min", "1", "max", "200", 1, "input", 3, "ngModelChange", "ngModel", "name"], [1, "field__hint"], [1, "select", 3, "ngModelChange", "ngModel", "name"], ["value", "LETTER"], ["value", "NUMBER"], ["value", "CUSTOM"], [1, "names-preview"], [1, "names-preview__title"], [1, "names-preview__chips"], [1, "name-chip"], ["type", "text", 1, "input", 3, "ngModelChange", "ngModel", "name", "placeholder"], [1, "subjects"], [1, "subject", 3, "subject--on"], [1, "subject"], [1, "subject__pick"], [1, "subject__name"], [1, "subject__code", "numeric"], [1, "subject__coef"], ["type", "number", "min", "1", "max", "10", 1, "input", "input--tiny", 3, "ngModelChange", "id", "ngModel", "name"], ["type", "number", "min", "0", "step", "1000", "name", "bulkReg", 1, "input", "input--small", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "step", "5000", "name", "bulkTuition", 1, "input", "input--small", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", "max", "12", "name", "bulkInst", 1, "input", "input--small", 3, "ngModelChange", "ngModel"], [1, "table-wrapper", "fees"], [1, "table"], [1, "visually-hidden"], [1, "numeric"], ["type", "number", "min", "0", "step", "1000", 1, "input", "input--small", 3, "ngModelChange", "ngModel", "name"], ["type", "number", "min", "0", "step", "5000", 1, "input", "input--small", 3, "ngModelChange", "ngModel", "name"], ["type", "number", "min", "1", "max", "12", 1, "input", "input--tiny", 3, "ngModelChange", "ngModel", "name"], [1, "numeric", "money"], ["colspan", "6", 1, "empty"], [1, "preview__detail"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary", "btn--lg", 3, "click"], ["type", "button", 1, "btn", "btn--primary", "btn--lg", 3, "click", "disabled"]], template: function OnboardingComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "span", 3);
            i0.ɵɵtext(4, "E");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div")(6, "p", 4);
            i0.ɵɵtext(7, "Configurons votre \u00E9tablissement");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p", 5);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(10, "button", 6);
            i0.ɵɵlistener("click", function OnboardingComponent_Template_button_click_10_listener() { return ctx.skip(); });
            i0.ɵɵtext(11, " Passer, je ferai plus tard ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 7);
            i0.ɵɵelement(13, "span", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "main", 9);
            i0.ɵɵtemplate(15, OnboardingComponent_Conditional_15_Template, 14, 1, "section", 10)(16, OnboardingComponent_Conditional_16_Template, 34, 6, "section", 11)(17, OnboardingComponent_Conditional_17_Template, 14, 1, "section", 10)(18, OnboardingComponent_Conditional_18_Template, 52, 5, "section", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "footer", 12);
            i0.ɵɵtemplate(20, OnboardingComponent_Conditional_20_Template, 2, 0, "button", 13)(21, OnboardingComponent_Conditional_21_Template, 1, 0, "span")(22, OnboardingComponent_Conditional_22_Template, 2, 0, "button", 14)(23, OnboardingComponent_Conditional_23_Template, 2, 2, "button", 15);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate1("Bonjour ", ctx.firstName(), " \u2014 quelques minutes suffisent");
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("aria-valuenow", ctx.step());
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("width", ctx.step() * 25, "%");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.step() === 1 ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step() === 2 ? 16 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step() === 3 ? 17 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step() === 4 ? 18 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.step() > 1 ? 20 : 21);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.step() < 4 ? 22 : 23);
        } }, dependencies: [CommonModule, i1.DecimalPipe, FormsModule, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.MinValidator, i2.MaxValidator, i2.NgModel], styles: ["@import 'styles/tokens';\n\n.onboarding[_ngcontent-%COMP%] { min-height: 100vh; display: flex; flex-direction: column; background: var(--surface-page); }\n\n\n\n.ob__header[_ngcontent-%COMP%] {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-4); padding: var(--space-4) var(--space-8);\n  background: var(--surface-card); border-bottom: 1px solid var(--border);\n}\n.ob__brand[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); }\n.ob__logo[_ngcontent-%COMP%] {\n  width: 38px; height: 38px; display: grid; place-items: center;\n  background: var(--brand); color: #fff; border-radius: 10px;\n  font-family: var(--font-display); font-weight: 800;\n}\n.ob__title[_ngcontent-%COMP%] { margin: 0; font-family: var(--font-display); font-weight: 700; color: var(--text-strong); }\n.ob__subtitle[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n.ob__progress[_ngcontent-%COMP%] { height: 3px; background: var(--surface-sunken); }\n.ob__progress-fill[_ngcontent-%COMP%] { display: block; height: 100%; background: var(--brand); transition: width var(--transition-base); }\n\n\n\n.ob__body[_ngcontent-%COMP%] { flex: 1; padding: var(--space-8); }\n.draft-note[_ngcontent-%COMP%] {\n  max-width: 760px; display: flex; align-items: flex-start; gap: var(--space-3);\n  margin: 0 auto var(--space-5); padding: var(--space-3) var(--space-4);\n  border: 1px solid var(--brand-tint-border); border-radius: var(--radius-button);\n  background: var(--brand-tint);\n}\n.draft-note[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  flex: 0 0 22px; height: 22px; display: grid; place-items: center;\n  border-radius: 7px; background: var(--brand); color: #fff; font-size: 11px; font-weight: 800;\n}\n.draft-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: var(--text-muted); font-size: var(--text-xs); line-height: 1.55; }\n.draft-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--text-strong); }\n.pane[_ngcontent-%COMP%] { max-width: 760px; margin: 0 auto; }\n.pane__step[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-2); font-size: var(--text-xs); font-weight: 700;\n  text-transform: uppercase; letter-spacing: .06em; color: var(--brand);\n}\n.pane__title[_ngcontent-%COMP%] { font-size: var(--text-2xl); margin: 0 0 var(--space-2); }\n.pane__lead[_ngcontent-%COMP%] { color: var(--text-muted); margin-bottom: var(--space-6); line-height: var(--leading-relaxed); }\n.pane__summary[_ngcontent-%COMP%] { margin-top: var(--space-5); text-align: center; color: var(--text-muted); }\n.pane__summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--brand); font-size: var(--text-lg); }\n\n\n\n.cycles[_ngcontent-%COMP%] { display: grid; gap: var(--space-3); }\n.cycle[_ngcontent-%COMP%] {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); overflow: hidden;\n}\n.cycle--on[_ngcontent-%COMP%] { border-color: var(--brand-tint-border); }\n.cycle__head[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: var(--space-3);\n  padding: var(--space-4) var(--space-5); cursor: pointer;\n}\n.cycle__name[_ngcontent-%COMP%] { font-weight: 700; color: var(--text-strong); flex: 1; }\n.cycle__count[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--text-muted); }\n.cycle__levels[_ngcontent-%COMP%] {\n  display: flex; flex-wrap: wrap; gap: var(--space-2);\n  padding: 0 var(--space-5) var(--space-4);\n}\n\n.chip-check[_ngcontent-%COMP%] {\n  display: inline-flex; align-items: center; gap: var(--space-2);\n  padding: 6px 12px; border-radius: var(--radius-pill);\n  background: var(--surface-sunken); border: 1px solid transparent;\n  font-size: var(--text-sm); font-weight: 600; color: var(--text-muted); cursor: pointer;\n}\n.chip-check--on[_ngcontent-%COMP%] { background: var(--brand-tint); border-color: var(--brand-tint-border); color: var(--brand); }\n\n\n\n.pane--wide[_ngcontent-%COMP%] { max-width: 1040px; }\n\n\n\n.bulk[_ngcontent-%COMP%] {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); padding: var(--space-4) var(--space-5);\n  margin-bottom: var(--space-5);\n}\n.bulk__title[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-3); font-size: var(--text-xs); font-weight: 700;\n  text-transform: uppercase; letter-spacing: .05em; color: var(--text-light);\n}\n.bulk__row[_ngcontent-%COMP%] { display: flex; align-items: flex-end; gap: var(--space-3); flex-wrap: wrap; }\n.bulk__field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 4px; }\n.bulk__field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--text-muted); font-weight: 600; }\n\n.input--small[_ngcontent-%COMP%] { width: 130px; }\n\n\n\n.levels[_ngcontent-%COMP%] { display: grid; gap: var(--space-2); }\n.level[_ngcontent-%COMP%] {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); overflow: hidden;\n}\n.level--open[_ngcontent-%COMP%] { border-color: var(--brand-tint-border); }\n.level__head[_ngcontent-%COMP%] {\n  width: 100%; display: flex; align-items: center; gap: var(--space-4);\n  padding: var(--space-4) var(--space-5); background: none; border: 0;\n  cursor: pointer; font: inherit; text-align: left;\n}\n.level__name[_ngcontent-%COMP%] { font-weight: 700; color: var(--text-strong); min-width: 140px; }\n.level__recap[_ngcontent-%COMP%] { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n.level__sign[_ngcontent-%COMP%] { font-size: 20px; color: var(--brand); line-height: 1; }\n.level__body[_ngcontent-%COMP%] {\n  padding: 0 var(--space-5) var(--space-5);\n  border-top: 1px solid var(--border-light); padding-top: var(--space-4);\n}\n.level__grid[_ngcontent-%COMP%] {\n  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: var(--space-4); margin-bottom: var(--space-3);\n}\n\n\n\n.names-preview[_ngcontent-%COMP%] {\n  margin-top: var(--space-4); padding: var(--space-4);\n  background: var(--surface-page); border-radius: var(--radius-button);\n}\n.names-preview__title[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-2); font-size: var(--text-xs);\n  font-weight: 700; color: var(--text-muted);\n}\n.names-preview__chips[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n.name-chip[_ngcontent-%COMP%] {\n  padding: 4px 12px; border-radius: var(--radius-pill);\n  background: var(--brand-tint); color: var(--brand);\n  font-size: var(--text-sm); font-weight: 600;\n}\n\n\n\n.fees[_ngcontent-%COMP%] { background: var(--surface-card); border: 1px solid var(--border); border-radius: var(--radius-card); }\n.fees[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%] { margin: 0; }\n.fees[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { vertical-align: middle; }\n.fees[_ngcontent-%COMP%]   .money[_ngcontent-%COMP%] { font-weight: 600; color: var(--text-strong); }\n\n\n\n.settings[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-5); }\n.setting[_ngcontent-%COMP%] {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); padding: var(--space-5);\n  display: flex; flex-direction: column; gap: var(--space-2);\n}\n\n.preview[_ngcontent-%COMP%] {\n  margin-top: var(--space-6); padding: var(--space-6);\n  background: var(--brand-tint); border: 1px solid var(--brand-tint-border);\n  border-radius: var(--radius-card); text-align: center;\n}\n.preview__title[_ngcontent-%COMP%] { margin: 0 0 var(--space-2); font-size: var(--text-sm); font-weight: 600; color: var(--brand); }\n.preview__value[_ngcontent-%COMP%] {\n  margin: 0; font-family: var(--font-display); font-size: var(--text-2xl);\n  font-weight: 700; color: var(--text-strong); letter-spacing: -0.02em;\n}\n.preview__detail[_ngcontent-%COMP%] { margin: var(--space-2) 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n\n\n.subjects[_ngcontent-%COMP%] { display: grid; gap: var(--space-2); }\n.subject[_ngcontent-%COMP%] {\n  display: flex; align-items: center; justify-content: space-between; gap: var(--space-4);\n  padding: var(--space-3) var(--space-4);\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-button);\n}\n.subject--on[_ngcontent-%COMP%] { border-color: var(--brand-tint-border); }\n.subject__pick[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); cursor: pointer; flex: 1; }\n.subject__name[_ngcontent-%COMP%] { font-weight: 600; color: var(--text-strong); }\n.subject__code[_ngcontent-%COMP%] { display: block; font-size: var(--text-xs); color: var(--text-muted); }\n.subject__coef[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--text-muted); }\n.input--tiny[_ngcontent-%COMP%] { width: 64px; text-align: center; }\n\n\n\n.ob__footer[_ngcontent-%COMP%] {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-4); padding: var(--space-4) var(--space-8);\n  background: var(--surface-card); border-top: 1px solid var(--border);\n  position: sticky; bottom: 0;\n}\n\n@include mobile {\n  .ob__header, .ob__footer { padding: var(--space-3) var(--space-4); }\n  .ob__body { padding: var(--space-5) var(--space-4); }\n  .pane__title { font-size: var(--text-xl); }\n  .subject { flex-direction: row; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OnboardingComponent, [{
        type: Component,
        args: [{ selector: 'eduops-onboarding', standalone: true, imports: [CommonModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"onboarding\">\n  <header class=\"ob__header\">\n    <div class=\"ob__brand\">\n      <span class=\"ob__logo\" aria-hidden=\"true\">E</span>\n      <div>\n        <p class=\"ob__title\">Configurons votre \u00E9tablissement</p>\n        <p class=\"ob__subtitle\">Bonjour {{ firstName() }} \u2014 quelques minutes suffisent</p>\n      </div>\n    </div>\n    <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"skip()\">\n      Passer, je ferai plus tard\n    </button>\n  </header>\n\n  <div class=\"ob__progress\" role=\"progressbar\" [attr.aria-valuenow]=\"step()\"\n       aria-valuemin=\"1\" aria-valuemax=\"4\">\n    <span class=\"ob__progress-fill\" [style.width.%]=\"step() * 25\"></span>\n  </div>\n\n  <main class=\"ob__body\" id=\"main-content\">\n\n    <!-- \u2550\u2550\u2550 1. Cycles et niveaux \u2550\u2550\u2550 -->\n    @if (step() === 1) {\n      <section class=\"pane\">\n        <p class=\"pane__step\">\u00C9tape 1 sur 4</p>\n        <h1 class=\"pane__title\">Quels cycles enseignez-vous ?</h1>\n        <p class=\"pane__lead\">\n          Structure d'un \u00E9tablissement ivoirien courant, pr\u00E9remplie.\n          Decochez ce qui ne vous concern\u00E9 pas \u2014 vous reglerez ensuite chaque niveau separement.\n        </p>\n\n        <div class=\"cycles\">\n          @for (cycle of cycles(); track cycle.code) {\n            <article class=\"cycle\" [class.cycle--on]=\"cycle.selected\">\n              <label class=\"cycle__head\">\n                <input type=\"checkbox\" [checked]=\"cycle.selected\"\n                       (change)=\"toggleCycle(cycle.code)\" />\n                <span class=\"cycle__name\">{{ cycle.name }}</span>\n                <span class=\"cycle__count\">{{ cycle.levels.length }} niveaux</span>\n              </label>\n              @if (cycle.selected) {\n                <div class=\"cycle__levels\">\n                  @for (level of cycle.levels; track level.code) {\n                    <label class=\"chip-check\" [class.chip-check--on]=\"level.selected\">\n                      <input type=\"checkbox\" [checked]=\"level.selected\"\n                             (change)=\"toggleLevel(cycle.code, level.code)\" />\n                      {{ level.name }}\n                    </label>\n                  }\n                </div>\n              }\n            </article>\n          }\n        </div>\n\n        <p class=\"pane__summary\">\n          <strong>{{ activeLevels().length }}</strong> niveaux s\u00E9lectionn\u00E9s\n        </p>\n      </section>\n    }\n\n    <!-- \u2550\u2550\u2550 2. Classes, niveau par niveau \u2550\u2550\u2550 -->\n    @if (step() === 2) {\n      <section class=\"pane pane--wide\">\n        <p class=\"pane__step\">\u00C9tape 2 sur 4</p>\n        <h1 class=\"pane__title\">Les classes de chaque niveau</h1>\n        <p class=\"pane__lead\">\n          Nombre, capacit\u00E9 et nom peuvent differer d'un niveau a l'autre.\n          Depliez un niveau pour l'ajuster, ou appliquez une valeur a tous d'un coup.\n        </p>\n\n        <!-- Application groupee -->\n        <div class=\"bulk\">\n          <p class=\"bulk__title\">Appliquer a tous les niveaux</p>\n          <div class=\"bulk__row\">\n            <label class=\"bulk__field\">\n              <span>Classes par niveau</span>\n              <input class=\"input input--small\" type=\"number\" min=\"1\" max=\"20\"\n                     [ngModel]=\"bulk().classCount\" name=\"bulkClassCount\"\n                     (ngModelChange)=\"setBulk('classCount', $event)\" />\n            </label>\n            <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                    (click)=\"applyToAllLevels('classCount')\">Appliquer</button>\n\n            <label class=\"bulk__field\">\n              <span>Capacit\u00E9</span>\n              <input class=\"input input--small\" type=\"number\" min=\"1\" max=\"200\"\n                     [ngModel]=\"bulk().capacity\" name=\"bulkCapacity\"\n                     (ngModelChange)=\"setBulk('capacity', $event)\" />\n            </label>\n            <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                    (click)=\"applyToAllLevels('capacity')\">Appliquer</button>\n          </div>\n        </div>\n\n        <!-- Detail par niveau -->\n        <div class=\"levels\">\n          @for (level of activeLevels(); track level.code) {\n            <article class=\"level\" [class.level--open]=\"openLevel() === level.code\">\n              <button type=\"button\" class=\"level__head\" (click)=\"toggleOpenLevel(level.code)\"\n                      [attr.aria-expanded]=\"openLevel() === level.code\">\n                <span class=\"level__name\">{{ level.name }}</span>\n                <span class=\"level__recap numeric\">\n                  {{ level.classCount }} classe(s) \u00D7 {{ level.capacity }} places\n                </span>\n                <span class=\"level__sign\" aria-hidden=\"true\">\n                  {{ openLevel() === level.code ? '\u2212' : '+' }}\n                </span>\n              </button>\n\n              @if (openLevel() === level.code) {\n                <div class=\"level__body\">\n                  <div class=\"level__grid\">\n                    <label class=\"field\">\n                      <span class=\"field__label\">Nombre de classes</span>\n                      <input class=\"input\" type=\"number\" min=\"1\" max=\"20\"\n                             [ngModel]=\"level.classCount\" [name]=\"'cc-' + level.code\"\n                             (ngModelChange)=\"setClassCount(level.code, $event)\" />\n                    </label>\n\n                    <label class=\"field\">\n                      <span class=\"field__label\">Capacit\u00E9 d'une classe</span>\n                      <input class=\"input\" type=\"number\" min=\"1\" max=\"200\"\n                             [ngModel]=\"level.capacity\" [name]=\"'cap-' + level.code\"\n                             (ngModelChange)=\"setCapacity(level.code, $event)\" />\n                      <span class=\"field__hint\">\n                        Au-dela, l'inscription exige une d\u00E9rogation justifiee.\n                      </span>\n                    </label>\n\n                    <label class=\"field\">\n                      <span class=\"field__label\">Nommage des classes</span>\n                      <select class=\"select\" [ngModel]=\"level.naming\"\n                              [name]=\"'nm-' + level.code\"\n                              (ngModelChange)=\"setNaming(level.code, $event)\">\n                        <option value=\"LETTER\">Lettres \u2014 {{ level.name }} A, B, C</option>\n                        <option value=\"NUMBER\">Chiffres \u2014 {{ level.name }} 1, 2, 3</option>\n                        <option value=\"CUSTOM\">Noms personnalis\u00E9s</option>\n                      </select>\n                    </label>\n                  </div>\n\n                  @if (level.naming === 'CUSTOM') {\n                    <label class=\"field\">\n                      <span class=\"field__label\">Noms des classes, s\u00E9par\u00E9s par des virgules</span>\n                      <input class=\"input\" type=\"text\"\n                             [ngModel]=\"level.customNames\" [name]=\"'cn-' + level.code\"\n                             (ngModelChange)=\"setCustomNames(level.code, $event)\"\n                             [placeholder]=\"level.name + ' Etoile, ' + level.name + ' Soleil'\" />\n                      <span class=\"field__hint\">\n                        Utile pour les noms de couleurs, de saints ou de promotions.\n                      </span>\n                    </label>\n                  }\n\n                  <div class=\"names-preview\">\n                    <p class=\"names-preview__title\">Classes qui seront cr\u00E9\u00E9es</p>\n                    <div class=\"names-preview__chips\">\n                      @for (name of classNamesFor(level); track name) {\n                        <span class=\"name-chip\">{{ name }}</span>\n                      }\n                    </div>\n                  </div>\n                </div>\n              }\n            </article>\n          } @empty {\n            <p class=\"empty\">Revenez a l'\u00E9tape 1 pour s\u00E9lectionner au moins un niveau.</p>\n          }\n        </div>\n\n        <div class=\"preview\">\n          <p class=\"preview__title\">Total</p>\n          <p class=\"preview__value numeric\">{{ totalClasses() }} classes</p>\n          <p class=\"preview__detail numeric\">\n            {{ activeLevels().length }} niveaux \u2014 {{ totalSeats() }} places au total\n          </p>\n        </div>\n      </section>\n    }\n\n    <!-- \u2550\u2550\u2550 3. Matieres \u2550\u2550\u2550 -->\n    @if (step() === 3) {\n      <section class=\"pane\">\n        <p class=\"pane__step\">\u00C9tape 3 sur 4</p>\n        <h1 class=\"pane__title\">Quelles mati\u00E8res et quels coefficients ?</h1>\n        <p class=\"pane__lead\">\n          Ces coefficients servent de base au calcul des moyennes. Ils restent\n          ajustables niveau par niveau depuis le programme scolaire.\n        </p>\n\n        <div class=\"subjects\">\n          @for (subject of subjects(); track subject.code) {\n            <div class=\"subject\" [class.subject--on]=\"subject.selected\">\n              <label class=\"subject__pick\">\n                <input type=\"checkbox\" [checked]=\"subject.selected\"\n                       (change)=\"toggleSubject(subject.code)\" />\n                <span>\n                  <span class=\"subject__name\">{{ subject.name }}</span>\n                  <span class=\"subject__code numeric\">{{ subject.code }}</span>\n                </span>\n              </label>\n              @if (subject.selected) {\n                <div class=\"subject__coef\">\n                  <label [attr.for]=\"'coef-' + subject.code\">Coef.</label>\n                  <input [id]=\"'coef-' + subject.code\" class=\"input input--tiny\"\n                         type=\"number\" min=\"1\" max=\"10\" [ngModel]=\"subject.coefficient\"\n                         (ngModelChange)=\"updateCoefficient(subject.code, $event)\"\n                         [name]=\"'coef-' + subject.code\" />\n                </div>\n              }\n            </div>\n          }\n        </div>\n\n        <p class=\"pane__summary\">\n          <strong>{{ selectedSubjectCount() }}</strong> mati\u00E8res s\u00E9lectionn\u00E9es\n        </p>\n      </section>\n    }\n\n    <!-- \u2550\u2550\u2550 4. Scolarite, niveau par niveau \u2550\u2550\u2550 -->\n    @if (step() === 4) {\n      <section class=\"pane pane--wide\">\n        <p class=\"pane__step\">\u00C9tape 4 sur 4</p>\n        <h1 class=\"pane__title\">La scolarit\u00E9 de chaque niveau</h1>\n        <p class=\"pane__lead\">\n          Les tarifs augmentent generalement avec le niveau. Chaque niveau a donc\n          ses propres frais et son propre \u00E9ch\u00E9ancier, g\u00E9n\u00E9r\u00E9 automatiquement a l'inscription.\n        </p>\n\n        <div class=\"bulk\">\n          <p class=\"bulk__title\">Appliquer a tous les niveaux</p>\n          <div class=\"bulk__row\">\n            <label class=\"bulk__field\">\n              <span>Inscription</span>\n              <input class=\"input input--small\" type=\"number\" min=\"0\" step=\"1000\"\n                     [ngModel]=\"bulk().registrationFee\" name=\"bulkReg\"\n                     (ngModelChange)=\"setBulk('registrationFee', $event)\" />\n            </label>\n            <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                    (click)=\"applyToAllLevels('registrationFee')\">Appliquer</button>\n\n            <label class=\"bulk__field\">\n              <span>Scolarit\u00E9 annuelle</span>\n              <input class=\"input input--small\" type=\"number\" min=\"0\" step=\"5000\"\n                     [ngModel]=\"bulk().tuitionTotal\" name=\"bulkTuition\"\n                     (ngModelChange)=\"setBulk('tuitionTotal', $event)\" />\n            </label>\n            <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                    (click)=\"applyToAllLevels('tuitionTotal')\">Appliquer</button>\n\n            <label class=\"bulk__field\">\n              <span>\u00C9ch\u00E9ances</span>\n              <input class=\"input input--small\" type=\"number\" min=\"1\" max=\"12\"\n                     [ngModel]=\"bulk().instalments\" name=\"bulkInst\"\n                     (ngModelChange)=\"setBulk('instalments', $event)\" />\n            </label>\n            <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                    (click)=\"applyToAllLevels('instalments')\">Appliquer</button>\n          </div>\n        </div>\n\n        <div class=\"table-wrapper fees\">\n          <table class=\"table\">\n            <caption class=\"visually-hidden\">Frais de scolarit\u00E9 par niveau</caption>\n            <thead>\n              <tr>\n                <th>Niveau</th>\n                <th class=\"numeric\">Inscription</th>\n                <th class=\"numeric\">Scolarit\u00E9 annuelle</th>\n                <th class=\"numeric\">\u00C9ch\u00E9ances</th>\n                <th class=\"numeric\">Montant par \u00E9ch\u00E9ance</th>\n                <th class=\"numeric\">Total par \u00E9l\u00E8ve</th>\n              </tr>\n            </thead>\n            <tbody>\n              @for (level of activeLevels(); track level.code) {\n                <tr>\n                  <td><strong>{{ level.name }}</strong></td>\n                  <td class=\"numeric\">\n                    <input class=\"input input--small\" type=\"number\" min=\"0\" step=\"1000\"\n                           [ngModel]=\"level.registrationFee\" [name]=\"'reg-' + level.code\"\n                           (ngModelChange)=\"setRegistrationFee(level.code, $event)\" />\n                  </td>\n                  <td class=\"numeric\">\n                    <input class=\"input input--small\" type=\"number\" min=\"0\" step=\"5000\"\n                           [ngModel]=\"level.tuitionTotal\" [name]=\"'tui-' + level.code\"\n                           (ngModelChange)=\"setTuitionTotal(level.code, $event)\" />\n                  </td>\n                  <td class=\"numeric\">\n                    <input class=\"input input--tiny\" type=\"number\" min=\"1\" max=\"12\"\n                           [ngModel]=\"level.instalments\" [name]=\"'ins-' + level.code\"\n                           (ngModelChange)=\"setInstalments(level.code, $event)\" />\n                  </td>\n                  <td class=\"numeric money\">{{ instalmentAmount(level) | number:'1.0-0' }}</td>\n                  <td class=\"numeric money\">\n                    <strong>{{ totalPerStudent(level) | number:'1.0-0' }}</strong>\n                  </td>\n                </tr>\n              } @empty {\n                <tr><td colspan=\"6\" class=\"empty\">Aucun niveau s\u00E9lectionn\u00E9.</td></tr>\n              }\n            </tbody>\n          </table>\n        </div>\n\n        @if (tuitionRange(); as range) {\n          <div class=\"preview\">\n            <p class=\"preview__title\">Fourchette de scolarit\u00E9</p>\n            <p class=\"preview__value numeric\">\n              {{ range.min | number:'1.0-0' }} \u2014 {{ range.max | number:'1.0-0' }} FCFA\n            </p>\n            <p class=\"preview__detail\">\n              Un \u00E9ch\u00E9ancier distinct sera cr\u00E9\u00E9 pour chacun des\n              {{ activeLevels().length }} niveaux.\n            </p>\n          </div>\n        }\n      </section>\n    }\n  </main>\n\n  <footer class=\"ob__footer\">\n    @if (step() > 1) {\n      <button type=\"button\" class=\"btn btn--secondary\" (click)=\"back()\">Retour</button>\n    } @else {\n      <span></span>\n    }\n\n    @if (step() < 4) {\n      <button type=\"button\" class=\"btn btn--primary btn--lg\" (click)=\"next()\">Continuer</button>\n    } @else {\n      <button type=\"button\" class=\"btn btn--primary btn--lg\"\n              [disabled]=\"saving()\" (click)=\"finish()\">\n        {{ saving() ? 'Configuration...' : 'Terminer la configuration' }}\n      </button>\n    }\n  </footer>\n</div>\n", styles: ["@import 'styles/tokens';\n\n.onboarding { min-height: 100vh; display: flex; flex-direction: column; background: var(--surface-page); }\n\n/* \u2500\u2500 En-tete \u2500\u2500 */\n.ob__header {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-4); padding: var(--space-4) var(--space-8);\n  background: var(--surface-card); border-bottom: 1px solid var(--border);\n}\n.ob__brand { display: flex; align-items: center; gap: var(--space-3); }\n.ob__logo {\n  width: 38px; height: 38px; display: grid; place-items: center;\n  background: var(--brand); color: #fff; border-radius: 10px;\n  font-family: var(--font-display); font-weight: 800;\n}\n.ob__title { margin: 0; font-family: var(--font-display); font-weight: 700; color: var(--text-strong); }\n.ob__subtitle { margin: 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n.ob__progress { height: 3px; background: var(--surface-sunken); }\n.ob__progress-fill { display: block; height: 100%; background: var(--brand); transition: width var(--transition-base); }\n\n/* \u2500\u2500 Corps \u2500\u2500 */\n.ob__body { flex: 1; padding: var(--space-8); }\n.draft-note {\n  max-width: 760px; display: flex; align-items: flex-start; gap: var(--space-3);\n  margin: 0 auto var(--space-5); padding: var(--space-3) var(--space-4);\n  border: 1px solid var(--brand-tint-border); border-radius: var(--radius-button);\n  background: var(--brand-tint);\n}\n.draft-note > span {\n  flex: 0 0 22px; height: 22px; display: grid; place-items: center;\n  border-radius: 7px; background: var(--brand); color: #fff; font-size: 11px; font-weight: 800;\n}\n.draft-note p { margin: 0; color: var(--text-muted); font-size: var(--text-xs); line-height: 1.55; }\n.draft-note strong { color: var(--text-strong); }\n.pane { max-width: 760px; margin: 0 auto; }\n.pane__step {\n  margin: 0 0 var(--space-2); font-size: var(--text-xs); font-weight: 700;\n  text-transform: uppercase; letter-spacing: .06em; color: var(--brand);\n}\n.pane__title { font-size: var(--text-2xl); margin: 0 0 var(--space-2); }\n.pane__lead { color: var(--text-muted); margin-bottom: var(--space-6); line-height: var(--leading-relaxed); }\n.pane__summary { margin-top: var(--space-5); text-align: center; color: var(--text-muted); }\n.pane__summary strong { color: var(--brand); font-size: var(--text-lg); }\n\n/* \u2500\u2500 Cycles \u2500\u2500 */\n.cycles { display: grid; gap: var(--space-3); }\n.cycle {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); overflow: hidden;\n}\n.cycle--on { border-color: var(--brand-tint-border); }\n.cycle__head {\n  display: flex; align-items: center; gap: var(--space-3);\n  padding: var(--space-4) var(--space-5); cursor: pointer;\n}\n.cycle__name { font-weight: 700; color: var(--text-strong); flex: 1; }\n.cycle__count { font-size: var(--text-xs); color: var(--text-muted); }\n.cycle__levels {\n  display: flex; flex-wrap: wrap; gap: var(--space-2);\n  padding: 0 var(--space-5) var(--space-4);\n}\n\n.chip-check {\n  display: inline-flex; align-items: center; gap: var(--space-2);\n  padding: 6px 12px; border-radius: var(--radius-pill);\n  background: var(--surface-sunken); border: 1px solid transparent;\n  font-size: var(--text-sm); font-weight: 600; color: var(--text-muted); cursor: pointer;\n}\n.chip-check--on { background: var(--brand-tint); border-color: var(--brand-tint-border); color: var(--brand); }\n\n/* \u2500\u2500 Pane large pour les tableaux par niveau \u2500\u2500 */\n.pane--wide { max-width: 1040px; }\n\n/* \u2500\u2500 Application groupee \u2500\u2500 */\n.bulk {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); padding: var(--space-4) var(--space-5);\n  margin-bottom: var(--space-5);\n}\n.bulk__title {\n  margin: 0 0 var(--space-3); font-size: var(--text-xs); font-weight: 700;\n  text-transform: uppercase; letter-spacing: .05em; color: var(--text-light);\n}\n.bulk__row { display: flex; align-items: flex-end; gap: var(--space-3); flex-wrap: wrap; }\n.bulk__field { display: flex; flex-direction: column; gap: 4px; }\n.bulk__field span { font-size: var(--text-xs); color: var(--text-muted); font-weight: 600; }\n\n.input--small { width: 130px; }\n\n/* \u2500\u2500 Niveaux depliables \u2500\u2500 */\n.levels { display: grid; gap: var(--space-2); }\n.level {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); overflow: hidden;\n}\n.level--open { border-color: var(--brand-tint-border); }\n.level__head {\n  width: 100%; display: flex; align-items: center; gap: var(--space-4);\n  padding: var(--space-4) var(--space-5); background: none; border: 0;\n  cursor: pointer; font: inherit; text-align: left;\n}\n.level__name { font-weight: 700; color: var(--text-strong); min-width: 140px; }\n.level__recap { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n.level__sign { font-size: 20px; color: var(--brand); line-height: 1; }\n.level__body {\n  padding: 0 var(--space-5) var(--space-5);\n  border-top: 1px solid var(--border-light); padding-top: var(--space-4);\n}\n.level__grid {\n  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: var(--space-4); margin-bottom: var(--space-3);\n}\n\n/* \u2500\u2500 Apercu des noms de classes \u2500\u2500 */\n.names-preview {\n  margin-top: var(--space-4); padding: var(--space-4);\n  background: var(--surface-page); border-radius: var(--radius-button);\n}\n.names-preview__title {\n  margin: 0 0 var(--space-2); font-size: var(--text-xs);\n  font-weight: 700; color: var(--text-muted);\n}\n.names-preview__chips { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n.name-chip {\n  padding: 4px 12px; border-radius: var(--radius-pill);\n  background: var(--brand-tint); color: var(--brand);\n  font-size: var(--text-sm); font-weight: 600;\n}\n\n/* \u2500\u2500 Tableau des frais \u2500\u2500 */\n.fees { background: var(--surface-card); border: 1px solid var(--border); border-radius: var(--radius-card); }\n.fees .input { margin: 0; }\n.fees td { vertical-align: middle; }\n.fees .money { font-weight: 600; color: var(--text-strong); }\n\n/* \u2500\u2500 Reglages \u2500\u2500 */\n.settings { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-5); }\n.setting {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); padding: var(--space-5);\n  display: flex; flex-direction: column; gap: var(--space-2);\n}\n\n.preview {\n  margin-top: var(--space-6); padding: var(--space-6);\n  background: var(--brand-tint); border: 1px solid var(--brand-tint-border);\n  border-radius: var(--radius-card); text-align: center;\n}\n.preview__title { margin: 0 0 var(--space-2); font-size: var(--text-sm); font-weight: 600; color: var(--brand); }\n.preview__value {\n  margin: 0; font-family: var(--font-display); font-size: var(--text-2xl);\n  font-weight: 700; color: var(--text-strong); letter-spacing: -0.02em;\n}\n.preview__detail { margin: var(--space-2) 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n/* \u2500\u2500 Matieres \u2500\u2500 */\n.subjects { display: grid; gap: var(--space-2); }\n.subject {\n  display: flex; align-items: center; justify-content: space-between; gap: var(--space-4);\n  padding: var(--space-3) var(--space-4);\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-button);\n}\n.subject--on { border-color: var(--brand-tint-border); }\n.subject__pick { display: flex; align-items: center; gap: var(--space-3); cursor: pointer; flex: 1; }\n.subject__name { font-weight: 600; color: var(--text-strong); }\n.subject__code { display: block; font-size: var(--text-xs); color: var(--text-muted); }\n.subject__coef { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--text-muted); }\n.input--tiny { width: 64px; text-align: center; }\n\n/* \u2500\u2500 Pied \u2500\u2500 */\n.ob__footer {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-4); padding: var(--space-4) var(--space-8);\n  background: var(--surface-card); border-top: 1px solid var(--border);\n  position: sticky; bottom: 0;\n}\n\n@include mobile {\n  .ob__header, .ob__footer { padding: var(--space-3) var(--space-4); }\n  .ob__body { padding: var(--space-5) var(--space-4); }\n  .pane__title { font-size: var(--text-xl); }\n  .subject { flex-direction: row; }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OnboardingComponent, { className: "OnboardingComponent", filePath: "frontend/src/app/features/onboarding/onboarding.component.ts", lineNumber: 64 }); })();
//# sourceMappingURL=onboarding.component.js.map