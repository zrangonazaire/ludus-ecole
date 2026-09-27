import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LEVELS_PER_PRESET, DemoSetupStore } from '@core/services/demo-setup.store';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.value;
function DemoSetupComponent_Case_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 38);
    i0.ɵɵtext(1, "01");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4, "On part de votre r\u00E9alit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Le format propos\u00E9 s\u2019adapte \u00E0 la taille et \u00E0 la structure choisies.");
    i0.ɵɵelementEnd()();
} }
function DemoSetupComponent_Case_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 38);
    i0.ɵɵtext(1, "02");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4, "Vous choisissez le point de d\u00E9part");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Les modules restent activables progressivement.");
    i0.ɵɵelementEnd()();
} }
function DemoSetupComponent_Case_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 38);
    i0.ɵɵtext(1, "03");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4, "Vos r\u00E8gles restent les v\u00F4tres");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "P\u00E9riodes, notes et paiements suivent votre fonctionnement.");
    i0.ɵɵelementEnd()();
} }
function DemoSetupComponent_Case_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 38);
    i0.ɵɵtext(1, "04");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4, "Le sc\u00E9nario est pr\u00EAt");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Relisez votre configuration avant de poursuivre.");
    i0.ɵɵelementEnd()();
} }
function DemoSetupComponent_For_57_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "button", 39);
    i0.ɵɵlistener("click", function DemoSetupComponent_For_57_Template_button_click_1_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(item_r2.id)); });
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("current", ctx_r2.step() === item_r2.id)("done", ctx_r2.draft().completedStep >= item_r2.id);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", item_r2.id > ctx_r2.maxReachableStep());
    i0.ɵɵattribute("aria-current", ctx_r2.step() === item_r2.id ? "step" : null);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.draft().completedStep >= item_r2.id ? "\u2713" : item_r2.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.label);
} }
function DemoSetupComponent_Conditional_60_For_13_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 60);
    i0.ɵɵelement(1, "path", 62);
    i0.ɵɵelementEnd();
} }
function DemoSetupComponent_Conditional_60_For_13_Case_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 60);
    i0.ɵɵelement(1, "path", 63);
    i0.ɵɵelementEnd();
} }
function DemoSetupComponent_Conditional_60_For_13_Case_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 60);
    i0.ɵɵelement(1, "path", 64);
    i0.ɵɵelementEnd();
} }
function DemoSetupComponent_Conditional_60_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label", 57);
    i0.ɵɵelement(1, "input", 58);
    i0.ɵɵelementStart(2, "span", 59);
    i0.ɵɵtemplate(3, DemoSetupComponent_Conditional_60_For_13_Case_3_Template, 2, 0, ":svg:svg", 60)(4, DemoSetupComponent_Conditional_60_For_13_Case_4_Template, 2, 0, ":svg:svg", 60)(5, DemoSetupComponent_Conditional_60_For_13_Case_5_Template, 2, 0, ":svg:svg", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "small");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 61);
    i0.ɵɵtext(11, "\u2713");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_13_0;
    const preset_r4 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ctx_r2.profileForm.controls.preset.value === preset_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", preset_r4.id);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_13_0 = preset_r4.id) === "primary" ? 3 : tmp_13_0 === "secondary" ? 4 : 5);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(preset_r4.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(preset_r4.description);
} }
function DemoSetupComponent_Conditional_60_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 50);
    i0.ɵɵtext(1, "Indiquez le nom de votre \u00E9tablissement.");
    i0.ɵɵelementEnd();
} }
function DemoSetupComponent_Conditional_60_For_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 53);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const country_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", country_r5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(country_r5);
} }
function DemoSetupComponent_Conditional_60_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 50);
    i0.ɵɵtext(1, "Indiquez votre ville.");
    i0.ɵɵelementEnd();
} }
function DemoSetupComponent_Conditional_60_For_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 53);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const band_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", band_r6.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(band_r6.label);
} }
function DemoSetupComponent_Conditional_60_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 50);
    i0.ɵɵtext(1, "Choisissez une valeur entre 1 et 20.");
    i0.ɵɵelementEnd();
} }
function DemoSetupComponent_Conditional_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "header", 40)(1, "span", 41);
    i0.ɵɵtext(2, "\u00C9tape 1 \u00B7 Votre terrain");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2", 42);
    i0.ɵɵtext(4, "Parlez-nous de votre \u00E9tablissement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Ces rep\u00E8res pr\u00E9parent une d\u00E9monstration plus proche de votre quotidien.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 43)(8, "fieldset", 44)(9, "legend");
    i0.ɵɵtext(10, "Quel profil vous ressemble le plus\u00A0?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 45);
    i0.ɵɵrepeaterCreate(12, DemoSetupComponent_Conditional_60_For_13_Template, 12, 6, "label", 46, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 47)(15, "label", 48)(16, "span");
    i0.ɵɵtext(17, "Nom de l\u2019\u00E9tablissement ");
    i0.ɵɵelementStart(18, "b", 13);
    i0.ɵɵtext(19, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(20, "input", 49);
    i0.ɵɵtemplate(21, DemoSetupComponent_Conditional_60_Conditional_21_Template, 2, 0, "small", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "label", 51)(23, "span");
    i0.ɵɵtext(24, "Pays ");
    i0.ɵɵelementStart(25, "b", 13);
    i0.ɵɵtext(26, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "select", 52);
    i0.ɵɵrepeaterCreate(28, DemoSetupComponent_Conditional_60_For_29_Template, 2, 2, "option", 53, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "label", 51)(31, "span");
    i0.ɵɵtext(32, "Ville ");
    i0.ɵɵelementStart(33, "b", 13);
    i0.ɵɵtext(34, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(35, "input", 54);
    i0.ɵɵtemplate(36, DemoSetupComponent_Conditional_60_Conditional_36_Template, 2, 0, "small", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "label", 51)(38, "span");
    i0.ɵɵtext(39, "Effectif actuel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "select", 55);
    i0.ɵɵrepeaterCreate(41, DemoSetupComponent_Conditional_60_For_42_Template, 2, 2, "option", 53, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "label", 51)(44, "span");
    i0.ɵɵtext(45, "Nombre de campus");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(46, "input", 56);
    i0.ɵɵtemplate(47, DemoSetupComponent_Conditional_60_Conditional_47_Template, 2, 0, "small", 50);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("formGroup", ctx_r2.profileForm);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r2.presets);
    i0.ɵɵadvance(9);
    i0.ɵɵconditional(ctx_r2.profileForm.controls.schoolName.invalid && (ctx_r2.formAttempted() || ctx_r2.profileForm.controls.schoolName.touched) ? 21 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r2.countries);
    i0.ɵɵadvance(8);
    i0.ɵɵconditional(ctx_r2.profileForm.controls.city.invalid && (ctx_r2.formAttempted() || ctx_r2.profileForm.controls.city.touched) ? 36 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r2.studentBands);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r2.profileForm.controls.campusCount.invalid && (ctx_r2.formAttempted() || ctx_r2.profileForm.controls.campusCount.touched) ? 47 : -1);
} }
function DemoSetupComponent_Conditional_61_For_12_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 72)(1, "input", 73);
    i0.ɵɵlistener("change", function DemoSetupComponent_Conditional_61_For_12_Template_input_change_1_listener() { const item_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.choosePriority(item_r8.id)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 74);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 61);
    i0.ɵɵtext(9, "\u2713");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const $index_r9 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ctx_r2.priority() === item_r8.id);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", item_r8.id)("checked", ctx_r2.priority() === item_r8.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("0", $index_r9 + 1, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r8.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r8.description);
} }
function DemoSetupComponent_Conditional_61_For_20_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 75)(1, "input", 76);
    i0.ɵɵlistener("change", function DemoSetupComponent_Conditional_61_For_20_Template_input_change_1_listener() { const module_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleModule(module_r11.id)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 77);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span")(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "small");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const module_r11 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ctx_r2.modules().includes(module_r11.id));
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r2.modules().includes(module_r11.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.modules().includes(module_r11.id) ? "\u2713" : "+");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(module_r11.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(module_r11.description);
} }
function DemoSetupComponent_Conditional_61_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 71);
    i0.ɵɵtext(1, "Choisissez au moins un espace pour continuer.");
    i0.ɵɵelementEnd();
} }
function DemoSetupComponent_Conditional_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "header", 40)(1, "span", 41);
    i0.ɵɵtext(2, "\u00C9tape 2 \u00B7 Votre cap");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2", 42);
    i0.ɵɵtext(4, "Que voulez-vous am\u00E9liorer en premier\u00A0?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Donnez une direction \u00E0 la d\u00E9mo, puis activez les espaces \u00E0 explorer.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "fieldset", 44)(8, "legend");
    i0.ɵɵtext(9, "Votre priorit\u00E9 principale");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 65);
    i0.ɵɵrepeaterCreate(11, DemoSetupComponent_Conditional_61_For_12_Template, 10, 7, "label", 66, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "fieldset", 67)(14, "legend");
    i0.ɵɵtext(15, "Les espaces \u00E0 inclure dans votre d\u00E9mo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p", 68);
    i0.ɵɵtext(17, "S\u00E9lectionnez au moins un module. Vous pourrez tout modifier plus tard.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 69);
    i0.ɵɵrepeaterCreate(19, DemoSetupComponent_Conditional_61_For_20_Template, 9, 6, "label", 70, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, DemoSetupComponent_Conditional_61_Conditional_21_Template, 2, 0, "p", 71);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵrepeater(ctx_r2.priorities);
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r2.availableModules);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.formAttempted() && ctx_r2.modules().length === 0 ? 21 : -1);
} }
function DemoSetupComponent_Conditional_62_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 50);
    i0.ɵɵtext(1, "Choisissez une valeur entre 1 et 12.");
    i0.ɵɵelementEnd();
} }
function DemoSetupComponent_Conditional_62_Conditional_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 50);
    i0.ɵɵtext(1, "Choisissez une valeur entre 10 et 100.");
    i0.ɵɵelementEnd();
} }
function DemoSetupComponent_Conditional_62_For_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 53);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const currency_r12 = ctx.$implicit;
    i0.ɵɵproperty("value", currency_r12.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(currency_r12.label);
} }
function DemoSetupComponent_Conditional_62_For_71_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 100)(1, "input", 76);
    i0.ɵɵlistener("change", function DemoSetupComponent_Conditional_62_For_71_Template_input_change_1_listener() { const mode_r14 = i0.ɵɵrestoreView(_r13).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.togglePaymentMode(mode_r14.id)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 101);
    i0.ɵɵtext(3, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const mode_r14 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ctx_r2.paymentModes().includes(mode_r14.id));
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r2.paymentModes().includes(mode_r14.id));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(mode_r14.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(mode_r14.description);
} }
function DemoSetupComponent_Conditional_62_Conditional_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 71);
    i0.ɵɵtext(1, "Choisissez au moins un mode de paiement.");
    i0.ɵɵelementEnd();
} }
function DemoSetupComponent_Conditional_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "header", 40)(1, "span", 41);
    i0.ɵɵtext(2, "\u00C9tape 3 \u00B7 Vos r\u00E8gles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2", 42);
    i0.ɵɵtext(4, "R\u00E9glez les d\u00E9tails qui comptent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Quelques choix suffisent pour donner \u00E0 l\u2019aper\u00E7u votre logique de fonctionnement.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 43)(8, "div", 78)(9, "fieldset", 79)(10, "legend");
    i0.ɵɵtext(11, "D\u00E9coupage de l\u2019ann\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 80)(13, "label");
    i0.ɵɵelement(14, "input", 81);
    i0.ɵɵtext(15, "3 trimestres ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "label");
    i0.ɵɵelement(17, "input", 82);
    i0.ɵɵtext(18, "2 semestres ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "fieldset", 79)(20, "legend");
    i0.ɵɵtext(21, "Syst\u00E8me d\u2019\u00E9valuation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 83)(23, "label");
    i0.ɵɵelement(24, "input", 84);
    i0.ɵɵtext(25, "/ 20 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "label");
    i0.ɵɵelement(27, "input", 85);
    i0.ɵɵtext(28, "/ 100 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "label");
    i0.ɵɵelement(30, "input", 86);
    i0.ɵɵtext(31, "Comp\u00E9tences ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(32, "label", 87)(33, "span")(34, "strong");
    i0.ɵɵtext(35, "Classement des \u00E9l\u00E8ves");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "small");
    i0.ɵɵtext(37, "Afficher le rang dans les r\u00E9sultats");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "span", 88);
    i0.ɵɵelement(39, "input", 89)(40, "i", 13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "div", 90)(42, "label", 91)(43, "span");
    i0.ɵɵtext(44, "Classes par niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "div", 92);
    i0.ɵɵelement(46, "input", 93);
    i0.ɵɵelementStart(47, "span");
    i0.ɵɵtext(48, "classes");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(49, DemoSetupComponent_Conditional_62_Conditional_49_Template, 2, 0, "small", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "label", 91)(51, "span");
    i0.ɵɵtext(52, "Capacit\u00E9 indicative par classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "div", 92);
    i0.ɵɵelement(54, "input", 94);
    i0.ɵɵelementStart(55, "span");
    i0.ɵɵtext(56, "\u00E9l\u00E8ves");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(57, DemoSetupComponent_Conditional_62_Conditional_57_Template, 2, 0, "small", 50);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(58, "p", 95);
    i0.ɵɵtext(59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "label", 91)(61, "span");
    i0.ɵɵtext(62, "Devise de r\u00E9f\u00E9rence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "select", 96);
    i0.ɵɵrepeaterCreate(64, DemoSetupComponent_Conditional_62_For_65_Template, 2, 2, "option", 53, _forTrack1);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(66, "fieldset", 97)(67, "legend");
    i0.ɵɵtext(68, "Modes de paiement \u00E0 pr\u00E9voir");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "div", 98);
    i0.ɵɵrepeaterCreate(70, DemoSetupComponent_Conditional_62_For_71_Template, 8, 5, "label", 99, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(72, DemoSetupComponent_Conditional_62_Conditional_72_Template, 2, 0, "p", 71);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("formGroup", ctx_r2.rulesForm);
    i0.ɵɵadvance(6);
    i0.ɵɵclassProp("selected", ctx_r2.rulesForm.controls.periodScheme.value === "trimester");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("selected", ctx_r2.rulesForm.controls.periodScheme.value === "semester");
    i0.ɵɵadvance(7);
    i0.ɵɵclassProp("selected", ctx_r2.rulesForm.controls.gradingScale.value === "20");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("selected", ctx_r2.rulesForm.controls.gradingScale.value === "100");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("selected", ctx_r2.rulesForm.controls.gradingScale.value === "competency");
    i0.ɵɵadvance(20);
    i0.ɵɵconditional(ctx_r2.rulesForm.controls.classesPerLevel.invalid && (ctx_r2.formAttempted() || ctx_r2.rulesForm.controls.classesPerLevel.touched) ? 49 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵconditional(ctx_r2.rulesForm.controls.classCapacity.invalid && (ctx_r2.formAttempted() || ctx_r2.rulesForm.controls.classCapacity.touched) ? 57 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r2.plannedClassCount(), " classes au total, ", ctx_r2.plannedSeatCount(), " places \u2014 cr\u00E9\u00E9es d\u00E8s la validation de votre compte. ");
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r2.currencies);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r2.paymentChoices);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.formAttempted() && ctx_r2.paymentModes().length === 0 ? 72 : -1);
} }
function DemoSetupComponent_Conditional_63_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 29)(1, "span", 102);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 103);
    i0.ɵɵelement(3, "path", 104);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(4, "span", 41);
    i0.ɵɵtext(5, "Votre sc\u00E9nario Soocloo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 42);
    i0.ɵɵtext(7, "Votre d\u00E9mo a maintenant une personnalit\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9, "Nous avons pr\u00E9par\u00E9 le cadre. Cr\u00E9ez votre compte pour poursuivre la mise en place de votre espace.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 105)(11, "article")(12, "span", 106);
    i0.ɵɵtext(13, "01");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "small");
    i0.ɵɵtext(15, "\u00C9tablissement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "strong");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "article")(21, "span", 106);
    i0.ɵɵtext(22, "02");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "small");
    i0.ɵɵtext(24, "Direction");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "strong");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "article")(30, "span", 106);
    i0.ɵɵtext(31, "03");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "small");
    i0.ɵɵtext(33, "Cadre scolaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "strong");
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "p");
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(38, "div", 107)(39, "div")(40, "strong");
    i0.ɵɵtext(41, "Pr\u00EAt \u00E0 donner vie \u00E0 cet espace\u00A0?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "span");
    i0.ɵɵtext(43, "Aucune carte bancaire demand\u00E9e.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "a", 108);
    i0.ɵɵlistener("click", function DemoSetupComponent_Conditional_63_Template_a_click_44_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.complete()); });
    i0.ɵɵtext(45, " Cr\u00E9er mon espace ");
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(46, "svg", 21);
    i0.ɵɵelement(47, "path", 109);
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(48, "button", 110);
    i0.ɵɵlistener("click", function DemoSetupComponent_Conditional_63_Template_button_click_48_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.restart()); });
    i0.ɵɵtext(49, "Recommencer la configuration");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(17);
    i0.ɵɵtextInterpolate(ctx_r2.draft().profile.schoolName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r2.presetLabel(ctx_r2.draft().profile.preset), " \u00B7 ", ctx_r2.draft().profile.city, "");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.priorityLabel(ctx_r2.draft().priorities.mainPriority));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", ctx_r2.draft().priorities.modules.length, " espace", ctx_r2.draft().priorities.modules.length > 1 ? "s" : "", " s\u00E9lectionn\u00E9", ctx_r2.draft().priorities.modules.length > 1 ? "s" : "", "");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.periodLabel(ctx_r2.draft().rules.periodScheme));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r2.scaleLabel(ctx_r2.draft().rules.gradingScale), " \u00B7 ", ctx_r2.draft().rules.currency, "");
} }
function DemoSetupComponent_Conditional_64_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 115);
    i0.ɵɵlistener("click", function DemoSetupComponent_Conditional_64_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.previous()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 21);
    i0.ɵɵelement(2, "path", 116);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Retour ");
    i0.ɵɵelementEnd();
} }
function DemoSetupComponent_Conditional_64_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 112);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 21);
    i0.ɵɵelement(2, "path", 116);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Accueil ");
    i0.ɵɵelementEnd();
} }
function DemoSetupComponent_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "footer", 30);
    i0.ɵɵtemplate(1, DemoSetupComponent_Conditional_64_Conditional_1_Template, 4, 0, "button", 111)(2, DemoSetupComponent_Conditional_64_Conditional_2_Template, 4, 0, "a", 112);
    i0.ɵɵelementStart(3, "span", 113);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 114);
    i0.ɵɵlistener("click", function DemoSetupComponent_Conditional_64_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.next()); });
    i0.ɵɵtext(6);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(7, "svg", 21);
    i0.ɵɵelement(8, "path", 109);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.step() > 1 ? 1 : 2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r2.step(), " / 4");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.step() === 3 ? "Voir mon sc\u00E9nario" : "Continuer", " ");
} }
function DemoSetupComponent_Conditional_100_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const label_r18 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(label_r18);
} }
function DemoSetupComponent_Conditional_100_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵrepeaterCreate(1, DemoSetupComponent_Conditional_100_For_2_Template, 2, 1, "span", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.selectedModuleLabels());
} }
function DemoSetupComponent_Conditional_101_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Aucun espace s\u00E9lectionn\u00E9");
    i0.ɵɵelementEnd();
} }
export class DemoSetupComponent {
    fb = inject(FormBuilder);
    store = inject(DemoSetupStore);
    destroyRef = inject(DestroyRef);
    initialDraft = this.store.draft();
    step = signal(Math.min(4, Math.max(1, this.initialDraft.completedStep + 1)));
    formAttempted = signal(false);
    modules = signal(this.initialDraft.priorities.modules);
    priority = signal(this.initialDraft.priorities.mainPriority);
    paymentModes = signal(this.initialDraft.rules.paymentModes);
    profileForm = this.fb.nonNullable.group({
        schoolName: [this.initialDraft.profile.schoolName, [Validators.required, Validators.maxLength(160)]],
        preset: [this.initialDraft.profile.preset, Validators.required],
        country: [this.initialDraft.profile.country, [Validators.required, Validators.maxLength(100)]],
        city: [this.initialDraft.profile.city, [Validators.required, Validators.maxLength(100)]],
        studentBand: [this.initialDraft.profile.studentBand, Validators.required],
        campusCount: [this.initialDraft.profile.campusCount, [Validators.required, Validators.min(1), Validators.max(20)]]
    });
    rulesForm = this.fb.nonNullable.group({
        periodScheme: [this.initialDraft.rules.periodScheme, Validators.required],
        gradingScale: [this.initialDraft.rules.gradingScale, Validators.required],
        rankingEnabled: [this.initialDraft.rules.rankingEnabled],
        classesPerLevel: [this.initialDraft.rules.classesPerLevel,
            [Validators.required, Validators.min(1), Validators.max(12)]],
        classCapacity: [this.initialDraft.rules.classCapacity, [Validators.required, Validators.min(10), Validators.max(100)]],
        currency: [this.initialDraft.rules.currency, Validators.required]
    });
    /**
     * Combien de classes le profil choisi produira.
     *
     * <p>Les niveaux ne sont pas saisis ici : ils découlent du profil — primaire,
     * secondaire, groupe scolaire. Le total se lit donc de la même table que
     * celle qui sert à créer l'école, et non d'un compte tenu à part qui
     * finirait par diverger.</p>
     */
    plannedClassCount = computed(() => {
        const levels = LEVELS_PER_PRESET[this.profileForm.controls.preset.value] ?? 0;
        return levels * (this.rulesForm.controls.classesPerLevel.value || 0);
    });
    plannedSeatCount = computed(() => this.plannedClassCount() * (this.rulesForm.controls.classCapacity.value || 0));
    presets = [
        { id: 'primary', label: 'Primaire', description: 'Cycles, classes et suivi adaptés aux plus jeunes.' },
        { id: 'secondary', label: 'Secondaire', description: 'Matières, coefficients et bulletins structurés.' },
        { id: 'group', label: 'Groupe scolaire', description: 'Plusieurs cycles ou campus dans une même vision.' }
    ];
    priorities = [
        { id: 'organize', label: 'Tout organiser', description: 'Réunir les opérations dans un espace cohérent.' },
        { id: 'collect', label: 'Mieux encaisser', description: 'Clarifier les échéances et le suivi des règlements.' },
        { id: 'engage', label: 'Mieux communiquer', description: 'Fluidifier les échanges avec les familles.' }
    ];
    availableModules = [
        { id: 'students', label: 'Élèves & inscriptions', description: 'Dossiers et admissions' },
        { id: 'pedagogy', label: 'Pédagogie', description: 'Notes, bulletins, présences' },
        { id: 'finance', label: 'Finances', description: 'Frais et règlements' },
        { id: 'communication', label: 'Communication', description: 'Messages aux familles' },
        { id: 'analytics', label: 'Pilotage', description: 'Indicateurs et rapports' },
        { id: 'administration', label: 'Administration', description: 'Équipe, rôles et accès' }
    ];
    paymentChoices = [
        { id: 'cash', label: 'Espèces', description: 'Paiement au guichet' },
        { id: 'mobile-money', label: 'Mobile Money', description: 'Paiement mobile' },
        { id: 'transfer', label: 'Virement', description: 'Paiement bancaire' },
        { id: 'card', label: 'Carte', description: 'Paiement par carte' }
    ];
    stepItems = [
        { id: 1, label: 'Profil' },
        { id: 2, label: 'Priorités' },
        { id: 3, label: 'Règles' },
        { id: 4, label: 'Aperçu' }
    ];
    coachmarks = {
        1: {
            title: 'Une démo qui vous ressemble',
            description: 'Choisissez le profil, la taille et la localisation de votre école pour obtenir un scénario vraiment pertinent.',
            points: ['Aucune donnée d’élève', 'Brouillon privé'],
            ctaLabel: 'Décrire mon école'
        },
        2: {
            title: 'Choisissez votre cap',
            description: 'Indiquez votre objectif principal et les espaces à explorer. La démonstration mettra d’abord en avant ce qui compte.',
            points: ['Une priorité claire', 'Modules au choix'],
            ctaLabel: 'Choisir mon cap'
        },
        3: {
            title: 'Gardez vos habitudes',
            description: 'Définissez périodes, notation, capacité, devise et paiements. Ces choix prépareront votre scénario scolaire.',
            points: ['Résultat visible immédiatement', 'Toujours modifiable'],
            ctaLabel: 'Régler mon cadre'
        },
        4: {
            title: 'Votre scénario est prêt',
            description: 'Relisez votre profil, vos priorités et vos règles avant de créer l’espace qui servira de base à votre démonstration.',
            points: ['Résumé en un regard', 'Retour toujours possible'],
            ctaLabel: 'Examiner mon scénario'
        }
    };
    countries = ['Côte d’Ivoire', 'Bénin', 'Burkina Faso', 'Cameroun', 'Guinée', 'Mali', 'Maroc', 'RDC', 'Sénégal', 'Togo'];
    studentBands = [
        { value: '1-100', label: 'Jusqu’à 100 élèves' },
        { value: '101-300', label: '101 à 300 élèves' },
        { value: '301-700', label: '301 à 700 élèves' },
        { value: '700+', label: 'Plus de 700 élèves' }
    ];
    currencies = [
        { value: 'XOF', label: 'Franc CFA (XOF)' },
        { value: 'GNF', label: 'Franc guinéen (GNF)' },
        { value: 'CDF', label: 'Franc congolais (CDF)' },
        { value: 'MAD', label: 'Dirham marocain (MAD)' },
        { value: 'EUR', label: 'Euro (EUR)' }
    ];
    draft = this.store.draft;
    coachmark = computed(() => this.coachmarks[this.step()]);
    progressWidth = computed(() => `${this.step() * 25}%`);
    maxReachableStep = computed(() => Math.min(4, this.draft().completedStep + 1));
    selectedModuleLabels = computed(() => this.availableModules
        .filter((choice) => this.modules().includes(choice.id))
        .map((choice) => choice.label));
    constructor() {
        this.profileForm.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.store.updateProfile(this.profileForm.getRawValue()));
        this.rulesForm.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.persistRules());
    }
    choosePreset(preset) {
        this.profileForm.controls.preset.setValue(preset);
    }
    choosePriority(priority) {
        this.priority.set(priority);
        this.store.updatePriorities({ mainPriority: priority, modules: this.modules() });
    }
    toggleModule(module) {
        const current = this.modules();
        const modules = current.includes(module)
            ? current.filter((item) => item !== module)
            : [...current, module];
        this.modules.set(modules);
        this.store.updatePriorities({ mainPriority: this.priority(), modules });
    }
    setPeriodScheme(value) {
        this.rulesForm.controls.periodScheme.setValue(value);
    }
    setGradingScale(value) {
        this.rulesForm.controls.gradingScale.setValue(value);
    }
    togglePaymentMode(mode) {
        const current = this.paymentModes();
        const modes = current.includes(mode)
            ? current.filter((item) => item !== mode)
            : [...current, mode];
        this.paymentModes.set(modes);
        this.persistRules();
    }
    next() {
        const current = this.step();
        this.formAttempted.set(true);
        if (current === 1 && this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }
        if (current === 2 && this.modules().length === 0) {
            return;
        }
        if (current === 3 && (this.rulesForm.invalid || this.paymentModes().length === 0)) {
            this.rulesForm.markAllAsTouched();
            return;
        }
        this.store.markStepCompleted(current);
        if (current < 4) {
            this.step.set((current + 1));
            this.formAttempted.set(false);
            this.focusStepStart();
        }
    }
    previous() {
        const current = this.step();
        if (current > 1) {
            this.step.set((current - 1));
            this.formAttempted.set(false);
            this.focusStepStart();
        }
    }
    goToStep(target) {
        if (target > this.maxReachableStep()) {
            return;
        }
        this.step.set(target);
        this.formAttempted.set(false);
        this.focusStepStart();
    }
    complete() {
        this.store.markStepCompleted(4);
    }
    restart() {
        this.store.reset();
        const fresh = this.store.draft();
        this.profileForm.reset(fresh.profile);
        this.rulesForm.reset({
            periodScheme: fresh.rules.periodScheme,
            gradingScale: fresh.rules.gradingScale,
            rankingEnabled: fresh.rules.rankingEnabled,
            classCapacity: fresh.rules.classCapacity,
            currency: fresh.rules.currency
        });
        this.priority.set(fresh.priorities.mainPriority);
        this.modules.set(fresh.priorities.modules);
        this.paymentModes.set(fresh.rules.paymentModes);
        this.step.set(1);
        this.formAttempted.set(false);
        this.focusStepStart();
    }
    presetLabel(value) {
        return this.presets.find((item) => item.id === value)?.label ?? value;
    }
    priorityLabel(value) {
        return this.priorities.find((item) => item.id === value)?.label ?? value;
    }
    periodLabel(value) {
        return value === 'trimester' ? '3 trimestres' : '2 semestres';
    }
    scaleLabel(value) {
        const labels = {
            '20': 'Notes sur 20',
            '100': 'Notes sur 100',
            competency: 'Compétences'
        };
        return labels[value];
    }
    persistRules() {
        this.store.updateRules({
            ...this.rulesForm.getRawValue(),
            paymentModes: this.paymentModes()
        });
    }
    focusStepStart() {
        if (typeof document === 'undefined') {
            return;
        }
        requestAnimationFrame(() => document.querySelector('#setup-step-title')?.focus());
    }
    static ɵfac = function DemoSetupComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DemoSetupComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DemoSetupComponent, selectors: [["eduops-demo-setup"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 109, vars: 26, consts: [["href", "#setup-main", 1, "skip-link"], [1, "setup-page"], ["flow", "demo-setup", "eyebrow", "Conseil pour cette \u00E9tape", 3, "accepted", "stepKey", "stepNumber", "totalSteps", "title", "description", "points", "ctaLabel"], ["aria-label", "Pr\u00E9sentation du configurateur", 1, "story-panel"], ["routerLink", "/", "aria-label", "Soocloo, revenir \u00E0 l\u2019accueil", 1, "brand"], ["aria-hidden", "true", 1, "brand-mark"], ["viewBox", "0 0 28 28", "role", "img"], ["d", "M7 9.5 14 5l7 4.5v9L14 23l-7-4.5v-9Z"], ["d", "M10.5 12.2 14 10l3.5 2.2v4.1L14 18.5l-3.5-2.2v-4.1Z"], [1, "story-copy"], [1, "story-kicker"], [1, "context-note"], ["aria-label", "Garanties de la d\u00E9monstration", 1, "trust-list"], ["aria-hidden", "true"], ["id", "setup-main", 1, "workspace"], [1, "workspace-topbar"], ["routerLink", "/", "aria-label", "Soocloo, revenir \u00E0 l\u2019accueil", 1, "mobile-brand"], ["aria-hidden", "true", 1, "brand-mark", "mini"], ["viewBox", "0 0 28 28"], [1, "draft-status"], ["routerLink", "/", 1, "exit-link"], ["viewBox", "0 0 20 20", "aria-hidden", "true"], ["d", "m8 5 5 5-5 5"], [1, "workspace-inner"], ["aria-label", "Progression de la configuration", 1, "stepper"], ["aria-hidden", "true", 1, "progress-track"], [3, "current", "done"], [1, "content-grid"], [1, "config-card"], [1, "final-content"], [1, "card-footer"], ["aria-label", "R\u00E9sum\u00E9 de votre configuration", 1, "live-preview"], [1, "preview-head"], ["aria-hidden", "true", 1, "school-avatar"], [1, "preview-facts"], [1, "preview-modules"], [1, "privacy-note"], ["d", "M6.5 8V6a3.5 3.5 0 0 1 7 0v2M5 8h10v8H5V8Z"], [1, "context-index"], ["type", "button", 3, "click", "disabled"], [1, "step-heading"], [1, "eyebrow"], ["id", "setup-step-title", "tabindex", "-1"], ["novalidate", "", 3, "formGroup"], [1, "form-section"], [1, "preset-grid"], [1, "choice-card", "preset-card", 3, "selected"], [1, "fields-grid"], [1, "field", "field-wide"], ["formControlName", "schoolName", "type", "text", "autocomplete", "organization", "placeholder", "Ex. Groupe scolaire Les Horizons"], [1, "field-error"], [1, "field"], ["formControlName", "country"], [3, "value"], ["formControlName", "city", "type", "text", "autocomplete", "address-level2", "placeholder", "Ex. Abidjan"], ["formControlName", "studentBand"], ["formControlName", "campusCount", "type", "number", "inputmode", "numeric", "min", "1", "max", "20"], [1, "choice-card", "preset-card"], ["type", "radio", "formControlName", "preset", 3, "value"], ["aria-hidden", "true", 1, "preset-icon"], ["viewBox", "0 0 24 24"], ["aria-hidden", "true", 1, "choice-check"], ["d", "M5 5.5A2.5 2.5 0 0 1 7.5 3H11v16H7.5A2.5 2.5 0 0 0 5 21.5v-16ZM19 5.5A2.5 2.5 0 0 0 16.5 3H13v16h3.5a2.5 2.5 0 0 1 2.5 2.5v-16Z"], ["d", "m3 9 9-5 9 5-9 5-9-5Zm4 3v5c2.8 2.5 7.2 2.5 10 0v-5M21 9v6"], ["d", "M4 21V8l8-5 8 5v13M8 21v-7h8v7M8 9h.01M12 9h.01M16 9h.01"], [1, "priority-grid"], [1, "choice-card", "priority-card", 3, "selected"], [1, "form-section", "module-section"], [1, "legend-help"], [1, "module-grid"], [1, "module-card", 3, "selected"], ["role", "alert", 1, "selection-error"], [1, "choice-card", "priority-card"], ["type", "radio", "name", "priority", 3, "change", "value", "checked"], ["aria-hidden", "true", 1, "priority-number"], [1, "module-card"], ["type", "checkbox", 3, "change", "checked"], ["aria-hidden", "true", 1, "module-mark"], [1, "rule-grid"], [1, "rule-block"], [1, "segmented"], ["type", "radio", "formControlName", "periodScheme", "value", "trimester"], ["type", "radio", "formControlName", "periodScheme", "value", "semester"], [1, "segmented", "three"], ["type", "radio", "formControlName", "gradingScale", "value", "20"], ["type", "radio", "formControlName", "gradingScale", "value", "100"], ["type", "radio", "formControlName", "gradingScale", "value", "competency"], [1, "rule-line"], [1, "switch"], ["type", "checkbox", "formControlName", "rankingEnabled"], [1, "field-pair"], [1, "field", "compact-field"], [1, "input-suffix"], ["type", "number", "formControlName", "classesPerLevel", "min", "1", "max", "12", "inputmode", "numeric"], ["type", "number", "formControlName", "classCapacity", "min", "10", "max", "100", "inputmode", "numeric"], [1, "rule-hint"], ["formControlName", "currency"], [1, "form-section", "payment-section"], [1, "payment-grid"], [1, "payment-card", 3, "selected"], [1, "payment-card"], ["aria-hidden", "true", 1, "payment-check"], ["aria-hidden", "true", 1, "success-mark"], ["viewBox", "0 0 32 32"], ["d", "m9 16 4.5 4.5L23 11"], [1, "recap-grid"], [1, "recap-index"], [1, "final-action"], ["routerLink", "/signup", 1, "primary-button", "final-button", 3, "click"], ["d", "M4 10h11M11 6l4 4-4 4"], ["type", "button", 1, "restart-button", 3, "click"], ["type", "button", 1, "secondary-button"], ["routerLink", "/", 1, "secondary-button"], [1, "step-count"], ["type", "button", 1, "primary-button", 3, "click"], ["type", "button", 1, "secondary-button", 3, "click"], ["d", "M16 10H5m4-4-4 4 4 4"]], template: function DemoSetupComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "a", 0);
            i0.ɵɵtext(1, "Aller \u00E0 la configuration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "div", 1)(3, "eduops-step-coachmark", 2);
            i0.ɵɵlistener("accepted", function DemoSetupComponent_Template_eduops_step_coachmark_accepted_3_listener() { return ctx.focusStepStart(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "aside", 3)(5, "a", 4)(6, "span", 5);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(7, "svg", 6);
            i0.ɵɵelement(8, "path", 7)(9, "path", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Soocloo");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 9)(13, "span", 10);
            i0.ɵɵtext(14, "Atelier de d\u00E9monstration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "h1");
            i0.ɵɵtext(16, "Votre \u00E9cole n\u2019a pas \u00E0 rentrer dans une case.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "p");
            i0.ɵɵtext(18, "Composez un espace qui reprend vos cycles, vos r\u00E8gles et vos priorit\u00E9s \u2014 avant m\u00EAme de cr\u00E9er un compte.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 11);
            i0.ɵɵtemplate(20, DemoSetupComponent_Case_20_Template, 7, 0)(21, DemoSetupComponent_Case_21_Template, 7, 0)(22, DemoSetupComponent_Case_22_Template, 7, 0)(23, DemoSetupComponent_Case_23_Template, 7, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "ul", 12)(25, "li")(26, "span", 13);
            i0.ɵɵtext(27, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(28, " Sans carte bancaire");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "li")(30, "span", 13);
            i0.ɵɵtext(31, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(32, " Donn\u00E9es de d\u00E9monstration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "li")(34, "span", 13);
            i0.ɵɵtext(35, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(36, " Rien n\u2019est envoy\u00E9 \u00E0 cette \u00E9tape");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(37, "main", 14)(38, "header", 15)(39, "a", 16)(40, "span", 17);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(41, "svg", 18);
            i0.ɵɵelement(42, "path", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵtext(43, " Soocloo ");
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(44, "span", 19);
            i0.ɵɵelement(45, "i", 13);
            i0.ɵɵtext(46, " Brouillon conserv\u00E9 dans cet onglet");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "a", 20);
            i0.ɵɵtext(48, " Retour au site ");
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(49, "svg", 21);
            i0.ɵɵelement(50, "path", 22);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(51, "div", 23)(52, "nav", 24)(53, "div", 25);
            i0.ɵɵelement(54, "span");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "ol");
            i0.ɵɵrepeaterCreate(56, DemoSetupComponent_For_57_Template, 6, 8, "li", 26, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(58, "div", 27)(59, "section", 28);
            i0.ɵɵtemplate(60, DemoSetupComponent_Conditional_60_Template, 48, 4)(61, DemoSetupComponent_Conditional_61_Template, 22, 1)(62, DemoSetupComponent_Conditional_62_Template, 73, 16)(63, DemoSetupComponent_Conditional_63_Template, 50, 10, "div", 29)(64, DemoSetupComponent_Conditional_64_Template, 9, 3, "footer", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "aside", 31)(66, "div", 32)(67, "span");
            i0.ɵɵtext(68, "Aper\u00E7u vivant");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(69, "i", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "div", 33);
            i0.ɵɵtext(71);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "h3");
            i0.ɵɵtext(73);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "p");
            i0.ɵɵtext(75);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "div", 34)(77, "div")(78, "small");
            i0.ɵɵtext(79, "Profil");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "strong");
            i0.ɵɵtext(81);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(82, "div")(83, "small");
            i0.ɵɵtext(84, "Campus");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(85, "strong");
            i0.ɵɵtext(86);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(87, "div")(88, "small");
            i0.ɵɵtext(89, "Devise");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "strong");
            i0.ɵɵtext(91);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(92, "div")(93, "small");
            i0.ɵɵtext(94, "Classes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(95, "strong");
            i0.ɵɵtext(96);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(97, "div", 35)(98, "small");
            i0.ɵɵtext(99, "Espaces choisis");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(100, DemoSetupComponent_Conditional_100_Template, 3, 0, "div")(101, DemoSetupComponent_Conditional_101_Template, 2, 0, "p");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(102, "div", 36);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(103, "svg", 21);
            i0.ɵɵelement(104, "path", 37);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(105, "span")(106, "strong");
            i0.ɵɵtext(107, "Brouillon priv\u00E9");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(108, "Conserv\u00E9 uniquement pour cette session.");
            i0.ɵɵelementEnd()()()()()()();
        } if (rf & 2) {
            let tmp_7_0;
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("stepKey", "step-" + ctx.step())("stepNumber", ctx.step())("totalSteps", 4)("title", ctx.coachmark().title)("description", ctx.coachmark().description)("points", ctx.coachmark().points)("ctaLabel", ctx.coachmark().ctaLabel);
            i0.ɵɵadvance(17);
            i0.ɵɵconditional((tmp_7_0 = ctx.step()) === 1 ? 20 : tmp_7_0 === 2 ? 21 : tmp_7_0 === 3 ? 22 : tmp_7_0 === 4 ? 23 : -1);
            i0.ɵɵadvance(34);
            i0.ɵɵstyleProp("width", ctx.progressWidth());
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.stepItems);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("final-card", ctx.step() === 4);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step() === 1 ? 60 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step() === 2 ? 61 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step() === 3 ? 62 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step() === 4 ? 63 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step() < 4 ? 64 : -1);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.draft().profile.schoolName ? ctx.draft().profile.schoolName.charAt(0).toUpperCase() : "E");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.draft().profile.schoolName || "Votre \u00E9tablissement");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("", ctx.draft().profile.city || "Ville \u00E0 pr\u00E9ciser", " \u00B7 ", ctx.draft().profile.country, "");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.presetLabel(ctx.draft().profile.preset));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.draft().profile.campusCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.draft().rules.currency);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("", ctx.draft().rules.classCapacity, " \u00E9l\u00E8ves");
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.selectedModuleLabels().length > 0 ? 100 : 101);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.MaxValidator, i1.FormGroupDirective, i1.FormControlName, RouterLink, StepCoachmarkComponent], styles: ["[_nghost-%COMP%] {\n  --ink: #102b2c;\n  --muted: #667b7b;\n  --line: #dce7e4;\n  --canvas: #f4f8f6;\n  --surface: #ffffff;\n  --primary: #087f72;\n  --primary-dark: #05675d;\n  --mint: #dff8ee;\n  --coral: #ff7557;\n  --sun: #f4bd55;\n  display: block;\n  min-height: 100dvh;\n  color: var(--ink);\n  font-family: Inter, \"Segoe UI\", sans-serif;\n}\n\n*[_ngcontent-%COMP%] { box-sizing: border-box; }\n\na[_ngcontent-%COMP%] { color: inherit; text-decoration: none; }\nbutton[_ngcontent-%COMP%], input[_ngcontent-%COMP%], select[_ngcontent-%COMP%] { font: inherit; }\nbutton[_ngcontent-%COMP%], a[_ngcontent-%COMP%] { -webkit-tap-highlight-color: transparent; }\n\n.skip-link[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 100;\n  top: 10px;\n  left: 10px;\n  padding: 10px 14px;\n  border-radius: 9px;\n  background: #fff;\n  color: var(--ink);\n  box-shadow: 0 8px 24px #001b1833;\n  transform: translateY(-160%);\n  transition: transform .2s ease;\n}\n\n.skip-link[_ngcontent-%COMP%]:focus { transform: translateY(0); }\n\n.setup-page[_ngcontent-%COMP%] {\n  min-height: 100dvh;\n  display: grid;\n  grid-template-columns: 320px minmax(0, 1fr);\n  background:\n    radial-gradient(circle at 82% 3%, #dff8ee8c, transparent 25rem),\n    var(--canvas);\n}\n\n.story-panel[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  height: 100dvh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  padding: 32px 34px 30px;\n  color: #f7fffc;\n  background:\n    radial-gradient(circle at 12% 72%, #19a89345, transparent 15rem),\n    linear-gradient(154deg, #092f2e 0%, #061f21 72%);\n}\n\n.brand[_ngcontent-%COMP%], \n.mobile-brand[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  width: fit-content;\n  font-weight: 800;\n  letter-spacing: -.02em;\n}\n\n.brand-mark[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  display: grid;\n  place-items: center;\n  border-radius: 12px;\n  background: linear-gradient(145deg, #20c9ad, #0a8b7b);\n  box-shadow: 0 10px 24px #0015135e;\n}\n\n.brand-mark[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] { width: 25px; fill: none; stroke: #fff; stroke-width: 1.7; }\n.brand-mark[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]:last-child { stroke: #ffd17c; }\n\n.story-copy[_ngcontent-%COMP%] { position: relative; z-index: 1; margin-top: 70px; }\n.story-kicker[_ngcontent-%COMP%], \n.eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  color: var(--primary);\n  font-size: .72rem;\n  font-weight: 800;\n  letter-spacing: .1em;\n  text-transform: uppercase;\n}\n.story-kicker[_ngcontent-%COMP%] { color: #7be4d2; }\n.story-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  max-width: 245px;\n  margin: 16px 0 18px;\n  color: #fff;\n  font-size: clamp(1.85rem, 2.5vw, 2.35rem);\n  line-height: 1.08;\n  letter-spacing: -.045em;\n}\n.story-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { max-width: 245px; margin: 0; color: #c3d7d4; font-size: .9rem; line-height: 1.65; }\n\n.context-note[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  gap: 12px;\n  padding: 15px;\n  border: 1px solid #c9fff12b;\n  border-radius: 15px;\n  background: #ffffff0a;\n}\n.context-index[_ngcontent-%COMP%] { color: #64d8c5; font-size: .68rem; font-weight: 800; letter-spacing: .08em; }\n.context-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; font-size: .83rem; }\n.context-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 5px 0 0; color: #aac3bf; font-size: .73rem; line-height: 1.45; }\n\n.trust-list[_ngcontent-%COMP%] { position: relative; z-index: 1; display: grid; gap: 8px; margin: auto 0 0; padding: 0; list-style: none; color: #b9cfcc; font-size: .72rem; }\n.trust-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: inline-grid; place-items: center; width: 16px; height: 16px; margin-right: 7px; border-radius: 50%; color: #72e2cf; background: #64ddc51a; font-weight: 800; }\n\n.workspace[_ngcontent-%COMP%] { min-width: 0; }\n.workspace-topbar[_ngcontent-%COMP%] {\n  height: 72px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 24px;\n  padding: 0 44px;\n  border-bottom: 1px solid #dbe7e280;\n  background: #f7faf8a6;\n}\n.mobile-brand[_ngcontent-%COMP%] { display: none; margin-right: auto; }\n.brand-mark.mini[_ngcontent-%COMP%] { width: 32px; height: 32px; }\n.brand-mark.mini[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] { width: 20px; }\n.draft-status[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: .73rem; }\n.draft-status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { width: 7px; height: 7px; border-radius: 50%; background: #1fc39e; box-shadow: 0 0 0 4px #1fc39e1b; }\n.exit-link[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: 5px; color: #526a69; font-size: .78rem; font-weight: 700; }\n.exit-link[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] { width: 17px; fill: none; stroke: currentColor; stroke-width: 1.8; }\n\n.workspace-inner[_ngcontent-%COMP%] { max-width: 1180px; margin: 0 auto; padding: 32px 40px 48px; }\n.stepper[_ngcontent-%COMP%] { position: relative; max-width: 680px; margin-bottom: 24px; }\n.progress-track[_ngcontent-%COMP%] { position: absolute; top: 16px; left: 18px; right: 18px; height: 2px; overflow: hidden; background: #d7e4df; }\n.progress-track[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: block; height: 100%; max-width: 100%; background: linear-gradient(90deg, var(--primary), #39c6ac); transition: width .35s ease; }\n.stepper[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%] { position: relative; z-index: 1; display: flex; justify-content: space-between; margin: 0; padding: 0; list-style: none; }\n.stepper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { display: grid; justify-items: center; gap: 5px; min-width: 70px; padding: 0 5px; color: #8b9b98; border: 0; background: transparent; cursor: pointer; }\n.stepper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { width: 34px; height: 34px; display: grid; place-items: center; border: 2px solid var(--canvas); border-radius: 50%; background: #dfe9e5; color: #768985; font-size: .72rem; font-weight: 800; transition: .2s ease; }\n.stepper[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { font-size: .67rem; font-weight: 700; }\n.stepper[_ngcontent-%COMP%]   li.current[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], \n.stepper[_ngcontent-%COMP%]   li.done[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { color: var(--primary); }\n.stepper[_ngcontent-%COMP%]   li.current[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { background: var(--primary); color: #fff; box-shadow: 0 0 0 5px #0f9a8818; }\n.stepper[_ngcontent-%COMP%]   li.done[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { background: #ccefe5; color: var(--primary-dark); }\n.stepper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled { cursor: not-allowed; opacity: .72; }\n.stepper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible    > span[_ngcontent-%COMP%] { outline: 3px solid #ffb85f; outline-offset: 2px; }\n\n.content-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: minmax(0, 1fr) 272px; gap: 22px; align-items: start; }\n.config-card[_ngcontent-%COMP%] {\n  min-width: 0;\n  overflow: hidden;\n  border: 1px solid #dfe9e5;\n  border-radius: 24px;\n  background: #fff;\n  box-shadow: 0 24px 70px #163b3320;\n}\n.step-heading[_ngcontent-%COMP%] { padding: 34px 38px 26px; }\n.step-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.final-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 9px 0 9px; color: #102b2c; font-size: clamp(1.55rem, 2.7vw, 2.1rem); line-height: 1.16; letter-spacing: -.04em; outline: none; }\n.step-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.final-content[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { max-width: 600px; margin: 0; color: var(--muted); font-size: .88rem; line-height: 1.55; }\n\nform[_ngcontent-%COMP%], .form-section[_ngcontent-%COMP%] { margin: 0; }\n.form-section[_ngcontent-%COMP%] { padding: 0 38px 27px; border: 0; }\n.form-section[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%], \n.rule-block[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] { width: 100%; margin: 0 0 12px; padding: 0; color: #284343; font-size: .78rem; font-weight: 800; }\n.preset-grid[_ngcontent-%COMP%], \n.priority-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }\n.choice-card[_ngcontent-%COMP%] { position: relative; min-height: 145px; display: flex; flex-direction: column; align-items: flex-start; padding: 17px; border: 1px solid var(--line); border-radius: 15px; background: #fbfdfc; cursor: pointer; }\n.choice-card.selected[_ngcontent-%COMP%] { border-color: #28a996; background: #f2fbf8; box-shadow: inset 0 0 0 1px #28a996; }\n.choice-card[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.module-card[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.payment-card[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.segmented[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { position: absolute; opacity: 0; pointer-events: none; }\n.choice-card[_ngcontent-%COMP%]:focus-within, \n.module-card[_ngcontent-%COMP%]:focus-within, \n.payment-card[_ngcontent-%COMP%]:focus-within, \n.segmented[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:focus-within { outline: 3px solid #ffbe6470; outline-offset: 2px; }\n.preset-icon[_ngcontent-%COMP%] { width: 35px; height: 35px; display: grid; place-items: center; margin-bottom: 18px; border-radius: 10px; color: var(--primary); background: #dff4ed; }\n.preset-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] { width: 20px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linejoin: round; }\n.choice-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--ink); font-size: .86rem; }\n.choice-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { margin-top: 6px; color: #718481; font-size: .69rem; line-height: 1.45; }\n.choice-check[_ngcontent-%COMP%] { position: absolute; top: 12px; right: 12px; width: 19px; height: 19px; display: grid; place-items: center; border: 1px solid #cad9d5; border-radius: 50%; color: transparent; font-size: .68rem; }\n.choice-card.selected[_ngcontent-%COMP%]   .choice-check[_ngcontent-%COMP%] { border-color: var(--primary); color: #fff; background: var(--primary); }\n\n.fields-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 17px; padding: 0 38px 32px; }\n.field[_ngcontent-%COMP%] { min-width: 0; display: grid; gap: 7px; color: #294343; font-size: .73rem; font-weight: 700; }\n.field-wide[_ngcontent-%COMP%] { grid-column: 1 / -1; }\n.field[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] { color: var(--coral); }\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 45px;\n  padding: 0 13px;\n  color: var(--ink);\n  border: 1px solid #d7e3df;\n  border-radius: 11px;\n  outline: none;\n  background: #fff;\n  font-size: .8rem;\n  font-weight: 500;\n}\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder { color: #9aa9a6; }\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus { border-color: #2da995; box-shadow: 0 0 0 3px #23a89417; }\n.field-error[_ngcontent-%COMP%], \n.selection-error[_ngcontent-%COMP%] { color: #b74435 !important; font-size: .68rem !important; font-weight: 600; }\n\n.priority-card[_ngcontent-%COMP%] { min-height: 122px; }\n.priority-number[_ngcontent-%COMP%] { margin-bottom: 17px; color: #1b9b89; font-size: .67rem; font-weight: 900; letter-spacing: .08em; }\n.module-section[_ngcontent-%COMP%] { padding-top: 2px; }\n.legend-help[_ngcontent-%COMP%] { margin: -6px 0 13px; color: var(--muted); font-size: .7rem; }\n.module-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }\n.module-card[_ngcontent-%COMP%] { position: relative; display: flex; align-items: center; gap: 11px; min-height: 65px; padding: 12px; border: 1px solid var(--line); border-radius: 13px; cursor: pointer; }\n.module-card.selected[_ngcontent-%COMP%] { border-color: #4eb5a3; background: #f2faf7; }\n.module-mark[_ngcontent-%COMP%] { flex: 0 0 auto; width: 27px; height: 27px; display: grid; place-items: center; border-radius: 8px; color: #69807c; background: #edf3f1; font-size: .8rem; font-weight: 800; }\n.module-card.selected[_ngcontent-%COMP%]   .module-mark[_ngcontent-%COMP%] { color: #fff; background: var(--primary); }\n.module-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.module-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; }\n.module-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: .77rem; }\n.module-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { margin-top: 3px; color: #7a8d89; font-size: .65rem; }\n.selection-error[_ngcontent-%COMP%] { margin: 10px 0 0; }\n\n.rule-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; padding: 0 38px 24px; }\n.rule-block[_ngcontent-%COMP%], \n.rule-line[_ngcontent-%COMP%], \n.compact-field[_ngcontent-%COMP%] { min-width: 0; margin: 0; padding: 15px; border: 1px solid var(--line); border-radius: 14px; }\n.segmented[_ngcontent-%COMP%] { position: relative; display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; padding: 4px; border-radius: 10px; background: #edf3f1; }\n.segmented.three[_ngcontent-%COMP%] { grid-template-columns: repeat(3, 1fr); }\n.segmented[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { position: relative; display: grid; place-items: center; min-height: 34px; padding: 5px; border-radius: 8px; color: #667c78; font-size: .67rem; font-weight: 700; text-align: center; cursor: pointer; }\n.segmented[_ngcontent-%COMP%]   label.selected[_ngcontent-%COMP%] { color: var(--primary-dark); background: #fff; box-shadow: 0 3px 10px #183a3215; }\n.rule-line[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: 15px; cursor: pointer; }\n.rule-line[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.rule-line[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; }\n.rule-line[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: .76rem; }\n.rule-line[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { margin-top: 4px; color: var(--muted); font-size: .65rem; font-weight: 500; }\n.switch[_ngcontent-%COMP%] { position: relative; flex: 0 0 auto; width: 40px; height: 23px; }\n.switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }\n.switch[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { position: absolute; inset: 0; border-radius: 20px; background: #cedbd7; transition: .2s ease; }\n.switch[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]::after { content: \"\"; position: absolute; top: 3px; left: 3px; width: 17px; height: 17px; border-radius: 50%; background: #fff; box-shadow: 0 2px 5px #173d3550; transition: .2s ease; }\n.switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + i[_ngcontent-%COMP%] { background: var(--primary); }\n.switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + i[_ngcontent-%COMP%]::after { transform: translateX(17px); }\n.switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible    + i[_ngcontent-%COMP%] { outline: 3px solid #ffbe6470; outline-offset: 2px; }\n.compact-field[_ngcontent-%COMP%] { align-content: start; }\n.input-suffix[_ngcontent-%COMP%] { position: relative; }\n.input-suffix[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { padding-right: 55px; }\n.input-suffix[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { position: absolute; top: 50%; right: 12px; color: #80918e; font-size: .66rem; transform: translateY(-50%); }\n.payment-section[_ngcontent-%COMP%] { padding-bottom: 31px; }\n.payment-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }\n.payment-card[_ngcontent-%COMP%] { position: relative; min-height: 78px; display: flex; flex-direction: column; justify-content: center; padding: 12px 10px; border: 1px solid var(--line); border-radius: 12px; cursor: pointer; }\n.payment-card.selected[_ngcontent-%COMP%] { border-color: #4fb6a4; background: #f0faf7; }\n.payment-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { padding-right: 16px; font-size: .72rem; }\n.payment-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { margin-top: 4px; color: #7e918d; font-size: .6rem; }\n.payment-check[_ngcontent-%COMP%] { position: absolute; top: 9px; right: 9px; color: transparent; font-size: .7rem; }\n.payment-card.selected[_ngcontent-%COMP%]   .payment-check[_ngcontent-%COMP%] { color: var(--primary); }\n\n.card-footer[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 15px; padding: 20px 38px; border-top: 1px solid #e6eeeb; background: #fbfdfc; }\n.primary-button[_ngcontent-%COMP%], \n.secondary-button[_ngcontent-%COMP%] { min-height: 45px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 18px; border-radius: 11px; font-size: .78rem; font-weight: 800; cursor: pointer; }\n.primary-button[_ngcontent-%COMP%] { justify-self: end; color: #fff; border: 0; background: linear-gradient(135deg, #099786, #087266); box-shadow: 0 9px 20px #08796a35; }\n.secondary-button[_ngcontent-%COMP%] { justify-self: start; color: #3f5855; border: 1px solid #d9e5e1; background: #fff; }\n.primary-button[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%], \n.secondary-button[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] { width: 17px; fill: none; stroke: currentColor; stroke-width: 1.8; }\n.step-count[_ngcontent-%COMP%] { color: #80918e; font-size: .69rem; font-weight: 800; }\n\n.live-preview[_ngcontent-%COMP%] { position: sticky; top: 95px; overflow: hidden; padding: 20px; border: 1px solid var(--line); border-radius: 20px; background: #fff; box-shadow: 0 15px 42px #17392f12; }\n.preview-head[_ngcontent-%COMP%] { display: flex; justify-content: space-between; margin-bottom: 18px; color: #6c827e; font-size: .63rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }\n.preview-head[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { width: 7px; height: 7px; border-radius: 50%; background: var(--coral); }\n.school-avatar[_ngcontent-%COMP%] { width: 46px; height: 46px; display: grid; place-items: center; margin-bottom: 12px; border-radius: 14px; color: #fff; background: linear-gradient(145deg, #16a48f, #075b56); font-weight: 900; }\n.live-preview[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { overflow-wrap: anywhere; margin: 0 0 5px; font-size: 1rem; }\n.live-preview[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { margin: 0; color: var(--muted); font-size: .7rem; }\n.preview-facts[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin: 18px 0; }\n.preview-facts[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] { min-width: 0; padding: 9px; border-radius: 9px; background: #f3f8f6; }\n.preview-facts[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .preview-facts[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .privacy-note[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .privacy-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; }\n.preview-facts[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .preview-modules[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] { color: #82938f; font-size: .58rem; }\n.preview-facts[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { overflow: hidden; margin-top: 4px; font-size: .66rem; text-overflow: ellipsis; white-space: nowrap; }\n.preview-modules[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }\n.preview-modules[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { padding: 5px 7px; border-radius: 7px; color: #28685f; background: var(--mint); font-size: .58rem; }\n.preview-modules[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { color: #889894; font-size: .65rem; }\n.privacy-note[_ngcontent-%COMP%] { display: flex; gap: 8px; margin: 18px -20px -20px; padding: 13px 20px; border-top: 1px solid var(--line); background: #fbfdfc; }\n.privacy-note[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] { width: 17px; fill: none; stroke: var(--primary); stroke-width: 1.6; }\n.privacy-note[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: #738783; font-size: .6rem; line-height: 1.4; }\n.privacy-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #34524e; }\n\n.final-content[_ngcontent-%COMP%] { padding: 38px; text-align: center; }\n.success-mark[_ngcontent-%COMP%] { width: 56px; height: 56px; display: grid; place-items: center; margin: 0 auto 19px; border-radius: 18px; color: #fff; background: var(--primary); }\n.success-mark[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] { width: 30px; fill: none; stroke: currentColor; stroke-width: 2.4; }\n.final-content[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { margin: 0 auto; }\n.recap-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; margin: 29px 0 22px; text-align: left; }\n.recap-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { position: relative; min-width: 0; padding: 16px; border: 1px solid var(--line); border-radius: 14px; background: #fbfdfc; }\n.recap-index[_ngcontent-%COMP%] { position: absolute; top: 13px; right: 13px; color: #83a19b; font-size: .58rem; }\n.recap-grid[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.recap-grid[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; }\n.recap-grid[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #78908b; font-size: .61rem; }\n.recap-grid[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { overflow-wrap: anywhere; margin: 13px 0 5px; font-size: .76rem; }\n.recap-grid[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: var(--muted); font-size: .63rem; line-height: 1.4; }\n.final-action[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 17px; border-radius: 15px; color: #fff; background: #0a302f; text-align: left; }\n.final-action[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.final-action[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: block; }\n.final-action[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: .78rem; }\n.final-action[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { margin-top: 4px; color: #b9d2ce; font-size: .65rem; }\n.final-button[_ngcontent-%COMP%] { flex: 0 0 auto; background: linear-gradient(135deg, #24bca4, #0a8c7c); }\n.restart-button[_ngcontent-%COMP%] { margin-top: 18px; padding: 4px; color: #647c78; border: 0; border-bottom: 1px solid #aebfbb; background: none; font-size: .67rem; cursor: pointer; }\n\n@media (max-width: 980px) {\n  .setup-page[_ngcontent-%COMP%] { display: block; }\n  .story-panel[_ngcontent-%COMP%] { display: none; }\n  .mobile-brand[_ngcontent-%COMP%] { display: inline-flex; }\n  .workspace-topbar[_ngcontent-%COMP%] { padding-inline: 28px; }\n  .content-grid[_ngcontent-%COMP%] { grid-template-columns: minmax(0, 1fr); }\n  .live-preview[_ngcontent-%COMP%] { position: static; }\n}\n\n@media (max-width: 640px) {\n  .workspace-topbar[_ngcontent-%COMP%] { height: 62px; gap: 12px; padding-inline: 16px; }\n  .draft-status[_ngcontent-%COMP%] { display: none; }\n  .exit-link[_ngcontent-%COMP%] { font-size: 0; }\n  .exit-link[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] { width: 21px; }\n  .workspace-inner[_ngcontent-%COMP%] { padding: 22px 12px 35px; }\n  .stepper[_ngcontent-%COMP%] { margin-inline: 4px; }\n  .stepper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { min-width: 44px; }\n  .stepper[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { font-size: .58rem; }\n  .content-grid[_ngcontent-%COMP%] { gap: 14px; }\n  .config-card[_ngcontent-%COMP%] { border-radius: 18px; }\n  .step-heading[_ngcontent-%COMP%] { padding: 27px 20px 22px; }\n  .step-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .final-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { font-size: 1.55rem; }\n  .form-section[_ngcontent-%COMP%] { padding-inline: 20px; }\n  .preset-grid[_ngcontent-%COMP%], .priority-grid[_ngcontent-%COMP%], .module-grid[_ngcontent-%COMP%], .fields-grid[_ngcontent-%COMP%], .rule-grid[_ngcontent-%COMP%], .payment-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .choice-card[_ngcontent-%COMP%] { min-height: auto; }\n  .preset-card[_ngcontent-%COMP%] { display: grid; grid-template-columns: 38px 1fr; column-gap: 11px; }\n  .preset-icon[_ngcontent-%COMP%] { grid-row: 1 / 3; margin: 0; }\n  .preset-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { margin-top: 3px; }\n  .fields-grid[_ngcontent-%COMP%], .rule-grid[_ngcontent-%COMP%] { padding-inline: 20px; }\n  .field-wide[_ngcontent-%COMP%] { grid-column: auto; }\n  .payment-grid[_ngcontent-%COMP%] { grid-template-columns: repeat(2, 1fr); }\n  .card-footer[_ngcontent-%COMP%] { padding: 17px 20px; }\n  .primary-button[_ngcontent-%COMP%], .secondary-button[_ngcontent-%COMP%] { padding-inline: 13px; }\n  .final-content[_ngcontent-%COMP%] { padding: 30px 20px; }\n  .recap-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .final-action[_ngcontent-%COMP%] { align-items: stretch; flex-direction: column; }\n  .final-button[_ngcontent-%COMP%] { width: 100%; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], *[_ngcontent-%COMP%]::before, *[_ngcontent-%COMP%]::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; }\n}\n\n\n\n\n\n\n\n\n.field-pair[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-3, 12px);\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.rule-hint[_ngcontent-%COMP%] {\n  margin: calc(var(--space-2, 8px) * -1) 0 var(--space-4, 16px);\n  font-size: 0.85rem;\n  color: var(--text-muted, #64748b);\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DemoSetupComponent, [{
        type: Component,
        args: [{ selector: 'eduops-demo-setup', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink, StepCoachmarkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<a class=\"skip-link\" href=\"#setup-main\">Aller \u00E0 la configuration</a>\n\n<div class=\"setup-page\">\n  <eduops-step-coachmark\n    flow=\"demo-setup\"\n    [stepKey]=\"'step-' + step()\"\n    [stepNumber]=\"step()\"\n    [totalSteps]=\"4\"\n    eyebrow=\"Conseil pour cette \u00E9tape\"\n    [title]=\"coachmark().title\"\n    [description]=\"coachmark().description\"\n    [points]=\"coachmark().points\"\n    [ctaLabel]=\"coachmark().ctaLabel\"\n    (accepted)=\"focusStepStart()\" />\n\n  <aside class=\"story-panel\" aria-label=\"Pr\u00E9sentation du configurateur\">\n    <a class=\"brand\" routerLink=\"/\" aria-label=\"Soocloo, revenir \u00E0 l\u2019accueil\">\n      <span class=\"brand-mark\" aria-hidden=\"true\">\n        <svg viewBox=\"0 0 28 28\" role=\"img\">\n          <path d=\"M7 9.5 14 5l7 4.5v9L14 23l-7-4.5v-9Z\" />\n          <path d=\"M10.5 12.2 14 10l3.5 2.2v4.1L14 18.5l-3.5-2.2v-4.1Z\" />\n        </svg>\n      </span>\n      <span>Soocloo</span>\n    </a>\n\n    <div class=\"story-copy\">\n      <span class=\"story-kicker\">Atelier de d\u00E9monstration</span>\n      <h1>Votre \u00E9cole n\u2019a pas \u00E0 rentrer dans une case.</h1>\n      <p>Composez un espace qui reprend vos cycles, vos r\u00E8gles et vos priorit\u00E9s \u2014 avant m\u00EAme de cr\u00E9er un compte.</p>\n    </div>\n\n    <div class=\"context-note\">\n      @switch (step()) {\n        @case (1) {\n          <span class=\"context-index\">01</span>\n          <div><strong>On part de votre r\u00E9alit\u00E9</strong><p>Le format propos\u00E9 s\u2019adapte \u00E0 la taille et \u00E0 la structure choisies.</p></div>\n        }\n        @case (2) {\n          <span class=\"context-index\">02</span>\n          <div><strong>Vous choisissez le point de d\u00E9part</strong><p>Les modules restent activables progressivement.</p></div>\n        }\n        @case (3) {\n          <span class=\"context-index\">03</span>\n          <div><strong>Vos r\u00E8gles restent les v\u00F4tres</strong><p>P\u00E9riodes, notes et paiements suivent votre fonctionnement.</p></div>\n        }\n        @case (4) {\n          <span class=\"context-index\">04</span>\n          <div><strong>Le sc\u00E9nario est pr\u00EAt</strong><p>Relisez votre configuration avant de poursuivre.</p></div>\n        }\n      }\n    </div>\n\n    <ul class=\"trust-list\" aria-label=\"Garanties de la d\u00E9monstration\">\n      <li><span aria-hidden=\"true\">\u2713</span> Sans carte bancaire</li>\n      <li><span aria-hidden=\"true\">\u2713</span> Donn\u00E9es de d\u00E9monstration</li>\n      <li><span aria-hidden=\"true\">\u2713</span> Rien n\u2019est envoy\u00E9 \u00E0 cette \u00E9tape</li>\n    </ul>\n  </aside>\n\n  <main class=\"workspace\" id=\"setup-main\">\n    <header class=\"workspace-topbar\">\n      <a class=\"mobile-brand\" routerLink=\"/\" aria-label=\"Soocloo, revenir \u00E0 l\u2019accueil\">\n        <span class=\"brand-mark mini\" aria-hidden=\"true\">\n          <svg viewBox=\"0 0 28 28\"><path d=\"M7 9.5 14 5l7 4.5v9L14 23l-7-4.5v-9Z\" /></svg>\n        </span>\n        Soocloo\n      </a>\n      <span class=\"draft-status\"><i aria-hidden=\"true\"></i> Brouillon conserv\u00E9 dans cet onglet</span>\n      <a class=\"exit-link\" routerLink=\"/\">\n        Retour au site\n        <svg viewBox=\"0 0 20 20\" aria-hidden=\"true\"><path d=\"m8 5 5 5-5 5\" /></svg>\n      </a>\n    </header>\n\n    <div class=\"workspace-inner\">\n      <nav class=\"stepper\" aria-label=\"Progression de la configuration\">\n        <div class=\"progress-track\" aria-hidden=\"true\"><span [style.width]=\"progressWidth()\"></span></div>\n        <ol>\n          @for (item of stepItems; track item.id) {\n            <li [class.current]=\"step() === item.id\" [class.done]=\"draft().completedStep >= item.id\">\n              <button\n                type=\"button\"\n                (click)=\"goToStep(item.id)\"\n                [disabled]=\"item.id > maxReachableStep()\"\n                [attr.aria-current]=\"step() === item.id ? 'step' : null\">\n                <span>{{ draft().completedStep >= item.id ? '\u2713' : item.id }}</span>\n                <small>{{ item.label }}</small>\n              </button>\n            </li>\n          }\n        </ol>\n      </nav>\n\n      <div class=\"content-grid\">\n        <section class=\"config-card\" [class.final-card]=\"step() === 4\">\n          @if (step() === 1) {\n            <header class=\"step-heading\">\n              <span class=\"eyebrow\">\u00C9tape 1 \u00B7 Votre terrain</span>\n              <h2 id=\"setup-step-title\" tabindex=\"-1\">Parlez-nous de votre \u00E9tablissement</h2>\n              <p>Ces rep\u00E8res pr\u00E9parent une d\u00E9monstration plus proche de votre quotidien.</p>\n            </header>\n\n            <form [formGroup]=\"profileForm\" novalidate>\n              <fieldset class=\"form-section\">\n                <legend>Quel profil vous ressemble le plus&nbsp;?</legend>\n                <div class=\"preset-grid\">\n                  @for (preset of presets; track preset.id) {\n                    <label class=\"choice-card preset-card\" [class.selected]=\"profileForm.controls.preset.value === preset.id\">\n                      <input type=\"radio\" formControlName=\"preset\" [value]=\"preset.id\" />\n                      <span class=\"preset-icon\" aria-hidden=\"true\">\n                        @switch (preset.id) {\n                          @case ('primary') { <svg viewBox=\"0 0 24 24\"><path d=\"M5 5.5A2.5 2.5 0 0 1 7.5 3H11v16H7.5A2.5 2.5 0 0 0 5 21.5v-16ZM19 5.5A2.5 2.5 0 0 0 16.5 3H13v16h3.5a2.5 2.5 0 0 1 2.5 2.5v-16Z\" /></svg> }\n                          @case ('secondary') { <svg viewBox=\"0 0 24 24\"><path d=\"m3 9 9-5 9 5-9 5-9-5Zm4 3v5c2.8 2.5 7.2 2.5 10 0v-5M21 9v6\" /></svg> }\n                          @default { <svg viewBox=\"0 0 24 24\"><path d=\"M4 21V8l8-5 8 5v13M8 21v-7h8v7M8 9h.01M12 9h.01M16 9h.01\" /></svg> }\n                        }\n                      </span>\n                      <strong>{{ preset.label }}</strong>\n                      <small>{{ preset.description }}</small>\n                      <span class=\"choice-check\" aria-hidden=\"true\">\u2713</span>\n                    </label>\n                  }\n                </div>\n              </fieldset>\n\n              <div class=\"fields-grid\">\n                <label class=\"field field-wide\">\n                  <span>Nom de l\u2019\u00E9tablissement <b aria-hidden=\"true\">*</b></span>\n                  <input formControlName=\"schoolName\" type=\"text\" autocomplete=\"organization\" placeholder=\"Ex. Groupe scolaire Les Horizons\" />\n                  @if (profileForm.controls.schoolName.invalid && (formAttempted() || profileForm.controls.schoolName.touched)) {\n                    <small class=\"field-error\">Indiquez le nom de votre \u00E9tablissement.</small>\n                  }\n                </label>\n                <label class=\"field\">\n                  <span>Pays <b aria-hidden=\"true\">*</b></span>\n                  <select formControlName=\"country\">\n                    @for (country of countries; track country) { <option [value]=\"country\">{{ country }}</option> }\n                  </select>\n                </label>\n                <label class=\"field\">\n                  <span>Ville <b aria-hidden=\"true\">*</b></span>\n                  <input formControlName=\"city\" type=\"text\" autocomplete=\"address-level2\" placeholder=\"Ex. Abidjan\" />\n                  @if (profileForm.controls.city.invalid && (formAttempted() || profileForm.controls.city.touched)) {\n                    <small class=\"field-error\">Indiquez votre ville.</small>\n                  }\n                </label>\n                <label class=\"field\">\n                  <span>Effectif actuel</span>\n                  <select formControlName=\"studentBand\">\n                    @for (band of studentBands; track band.value) { <option [value]=\"band.value\">{{ band.label }}</option> }\n                  </select>\n                </label>\n                <label class=\"field\">\n                  <span>Nombre de campus</span>\n                  <input formControlName=\"campusCount\" type=\"number\" inputmode=\"numeric\" min=\"1\" max=\"20\" />\n                  @if (profileForm.controls.campusCount.invalid && (formAttempted() || profileForm.controls.campusCount.touched)) {\n                    <small class=\"field-error\">Choisissez une valeur entre 1 et 20.</small>\n                  }\n                </label>\n              </div>\n            </form>\n          }\n\n          @if (step() === 2) {\n            <header class=\"step-heading\">\n              <span class=\"eyebrow\">\u00C9tape 2 \u00B7 Votre cap</span>\n              <h2 id=\"setup-step-title\" tabindex=\"-1\">Que voulez-vous am\u00E9liorer en premier&nbsp;?</h2>\n              <p>Donnez une direction \u00E0 la d\u00E9mo, puis activez les espaces \u00E0 explorer.</p>\n            </header>\n\n            <fieldset class=\"form-section\">\n              <legend>Votre priorit\u00E9 principale</legend>\n              <div class=\"priority-grid\">\n                @for (item of priorities; track item.id) {\n                  <label class=\"choice-card priority-card\" [class.selected]=\"priority() === item.id\">\n                    <input type=\"radio\" name=\"priority\" [value]=\"item.id\" [checked]=\"priority() === item.id\" (change)=\"choosePriority(item.id)\" />\n                    <span class=\"priority-number\" aria-hidden=\"true\">0{{ $index + 1 }}</span>\n                    <strong>{{ item.label }}</strong>\n                    <small>{{ item.description }}</small>\n                    <span class=\"choice-check\" aria-hidden=\"true\">\u2713</span>\n                  </label>\n                }\n              </div>\n            </fieldset>\n\n            <fieldset class=\"form-section module-section\">\n              <legend>Les espaces \u00E0 inclure dans votre d\u00E9mo</legend>\n              <p class=\"legend-help\">S\u00E9lectionnez au moins un module. Vous pourrez tout modifier plus tard.</p>\n              <div class=\"module-grid\">\n                @for (module of availableModules; track module.id) {\n                  <label class=\"module-card\" [class.selected]=\"modules().includes(module.id)\">\n                    <input type=\"checkbox\" [checked]=\"modules().includes(module.id)\" (change)=\"toggleModule(module.id)\" />\n                    <span class=\"module-mark\" aria-hidden=\"true\">{{ modules().includes(module.id) ? '\u2713' : '+' }}</span>\n                    <span><strong>{{ module.label }}</strong><small>{{ module.description }}</small></span>\n                  </label>\n                }\n              </div>\n              @if (formAttempted() && modules().length === 0) {\n                <p class=\"selection-error\" role=\"alert\">Choisissez au moins un espace pour continuer.</p>\n              }\n            </fieldset>\n          }\n\n          @if (step() === 3) {\n            <header class=\"step-heading\">\n              <span class=\"eyebrow\">\u00C9tape 3 \u00B7 Vos r\u00E8gles</span>\n              <h2 id=\"setup-step-title\" tabindex=\"-1\">R\u00E9glez les d\u00E9tails qui comptent</h2>\n              <p>Quelques choix suffisent pour donner \u00E0 l\u2019aper\u00E7u votre logique de fonctionnement.</p>\n            </header>\n\n            <form [formGroup]=\"rulesForm\" novalidate>\n              <div class=\"rule-grid\">\n                <fieldset class=\"rule-block\">\n                  <legend>D\u00E9coupage de l\u2019ann\u00E9e</legend>\n                  <div class=\"segmented\">\n                    <label [class.selected]=\"rulesForm.controls.periodScheme.value === 'trimester'\">\n                      <input type=\"radio\" formControlName=\"periodScheme\" value=\"trimester\" />3 trimestres\n                    </label>\n                    <label [class.selected]=\"rulesForm.controls.periodScheme.value === 'semester'\">\n                      <input type=\"radio\" formControlName=\"periodScheme\" value=\"semester\" />2 semestres\n                    </label>\n                  </div>\n                </fieldset>\n\n                <fieldset class=\"rule-block\">\n                  <legend>Syst\u00E8me d\u2019\u00E9valuation</legend>\n                  <div class=\"segmented three\">\n                    <label [class.selected]=\"rulesForm.controls.gradingScale.value === '20'\">\n                      <input type=\"radio\" formControlName=\"gradingScale\" value=\"20\" />/ 20\n                    </label>\n                    <label [class.selected]=\"rulesForm.controls.gradingScale.value === '100'\">\n                      <input type=\"radio\" formControlName=\"gradingScale\" value=\"100\" />/ 100\n                    </label>\n                    <label [class.selected]=\"rulesForm.controls.gradingScale.value === 'competency'\">\n                      <input type=\"radio\" formControlName=\"gradingScale\" value=\"competency\" />Comp\u00E9tences\n                    </label>\n                  </div>\n                </fieldset>\n\n                <label class=\"rule-line\">\n                  <span><strong>Classement des \u00E9l\u00E8ves</strong><small>Afficher le rang dans les r\u00E9sultats</small></span>\n                  <span class=\"switch\"><input type=\"checkbox\" formControlName=\"rankingEnabled\" /><i aria-hidden=\"true\"></i></span>\n                </label>\n\n                <!--\n                  Deux nombres distincts, volontairement c\u00F4te \u00E0 c\u00F4te : combien\n                  de classes accueillent un m\u00EAme niveau, et combien d'\u00E9l\u00E8ves\n                  tiennent dans chacune. Les confondre donnerait une \u00E9cole de\n                  40 \u00E9l\u00E8ves l\u00E0 o\u00F9 on en attend 240.\n                -->\n                <div class=\"field-pair\">\n                  <label class=\"field compact-field\">\n                    <span>Classes par niveau</span>\n                    <div class=\"input-suffix\"><input type=\"number\" formControlName=\"classesPerLevel\" min=\"1\" max=\"12\" inputmode=\"numeric\" /><span>classes</span></div>\n                    @if (rulesForm.controls.classesPerLevel.invalid && (formAttempted() || rulesForm.controls.classesPerLevel.touched)) {\n                      <small class=\"field-error\">Choisissez une valeur entre 1 et 12.</small>\n                    }\n                  </label>\n\n                  <label class=\"field compact-field\">\n                    <span>Capacit\u00E9 indicative par classe</span>\n                    <div class=\"input-suffix\"><input type=\"number\" formControlName=\"classCapacity\" min=\"10\" max=\"100\" inputmode=\"numeric\" /><span>\u00E9l\u00E8ves</span></div>\n                    @if (rulesForm.controls.classCapacity.invalid && (formAttempted() || rulesForm.controls.classCapacity.touched)) {\n                      <small class=\"field-error\">Choisissez une valeur entre 10 et 100.</small>\n                    }\n                  </label>\n                </div>\n\n                <!--\n                  Le total dit ce que les deux nombres produisent ensemble. Une\n                  \u00E9cole qui vise 300 \u00E9l\u00E8ves et lit \u00AB 96 places \u00BB corrige avant\n                  de cr\u00E9er, pas apr\u00E8s.\n                -->\n                <p class=\"rule-hint\">\n                  {{ plannedClassCount() }} classes au total,\n                  {{ plannedSeatCount() }} places \u2014 cr\u00E9\u00E9es d\u00E8s la validation de\n                  votre compte.\n                </p>\n\n                <label class=\"field compact-field\">\n                  <span>Devise de r\u00E9f\u00E9rence</span>\n                  <select formControlName=\"currency\">\n                    @for (currency of currencies; track currency.value) { <option [value]=\"currency.value\">{{ currency.label }}</option> }\n                  </select>\n                </label>\n              </div>\n            </form>\n\n            <fieldset class=\"form-section payment-section\">\n              <legend>Modes de paiement \u00E0 pr\u00E9voir</legend>\n              <div class=\"payment-grid\">\n                @for (mode of paymentChoices; track mode.id) {\n                  <label class=\"payment-card\" [class.selected]=\"paymentModes().includes(mode.id)\">\n                    <input type=\"checkbox\" [checked]=\"paymentModes().includes(mode.id)\" (change)=\"togglePaymentMode(mode.id)\" />\n                    <span class=\"payment-check\" aria-hidden=\"true\">\u2713</span>\n                    <strong>{{ mode.label }}</strong>\n                    <small>{{ mode.description }}</small>\n                  </label>\n                }\n              </div>\n              @if (formAttempted() && paymentModes().length === 0) {\n                <p class=\"selection-error\" role=\"alert\">Choisissez au moins un mode de paiement.</p>\n              }\n            </fieldset>\n          }\n\n          @if (step() === 4) {\n            <div class=\"final-content\">\n              <span class=\"success-mark\" aria-hidden=\"true\">\n                <svg viewBox=\"0 0 32 32\"><path d=\"m9 16 4.5 4.5L23 11\" /></svg>\n              </span>\n              <span class=\"eyebrow\">Votre sc\u00E9nario Soocloo</span>\n              <h2 id=\"setup-step-title\" tabindex=\"-1\">Votre d\u00E9mo a maintenant une personnalit\u00E9.</h2>\n              <p>Nous avons pr\u00E9par\u00E9 le cadre. Cr\u00E9ez votre compte pour poursuivre la mise en place de votre espace.</p>\n\n              <div class=\"recap-grid\">\n                <article>\n                  <span class=\"recap-index\">01</span>\n                  <small>\u00C9tablissement</small>\n                  <strong>{{ draft().profile.schoolName }}</strong>\n                  <p>{{ presetLabel(draft().profile.preset) }} \u00B7 {{ draft().profile.city }}</p>\n                </article>\n                <article>\n                  <span class=\"recap-index\">02</span>\n                  <small>Direction</small>\n                  <strong>{{ priorityLabel(draft().priorities.mainPriority) }}</strong>\n                  <p>{{ draft().priorities.modules.length }} espace{{ draft().priorities.modules.length > 1 ? 's' : '' }} s\u00E9lectionn\u00E9{{ draft().priorities.modules.length > 1 ? 's' : '' }}</p>\n                </article>\n                <article>\n                  <span class=\"recap-index\">03</span>\n                  <small>Cadre scolaire</small>\n                  <strong>{{ periodLabel(draft().rules.periodScheme) }}</strong>\n                  <p>{{ scaleLabel(draft().rules.gradingScale) }} \u00B7 {{ draft().rules.currency }}</p>\n                </article>\n              </div>\n\n              <div class=\"final-action\">\n                <div><strong>Pr\u00EAt \u00E0 donner vie \u00E0 cet espace&nbsp;?</strong><span>Aucune carte bancaire demand\u00E9e.</span></div>\n                <a class=\"primary-button final-button\" routerLink=\"/signup\" (click)=\"complete()\">\n                  Cr\u00E9er mon espace\n                  <svg viewBox=\"0 0 20 20\" aria-hidden=\"true\"><path d=\"M4 10h11M11 6l4 4-4 4\" /></svg>\n                </a>\n              </div>\n              <button class=\"restart-button\" type=\"button\" (click)=\"restart()\">Recommencer la configuration</button>\n            </div>\n          }\n\n          @if (step() < 4) {\n            <footer class=\"card-footer\">\n              @if (step() > 1) {\n                <button class=\"secondary-button\" type=\"button\" (click)=\"previous()\">\n                  <svg viewBox=\"0 0 20 20\" aria-hidden=\"true\"><path d=\"M16 10H5m4-4-4 4 4 4\" /></svg>\n                  Retour\n                </button>\n              } @else {\n                <a class=\"secondary-button\" routerLink=\"/\">\n                  <svg viewBox=\"0 0 20 20\" aria-hidden=\"true\"><path d=\"M16 10H5m4-4-4 4 4 4\" /></svg>\n                  Accueil\n                </a>\n              }\n              <span class=\"step-count\">{{ step() }} / 4</span>\n              <button class=\"primary-button\" type=\"button\" (click)=\"next()\">\n                {{ step() === 3 ? 'Voir mon sc\u00E9nario' : 'Continuer' }}\n                <svg viewBox=\"0 0 20 20\" aria-hidden=\"true\"><path d=\"M4 10h11M11 6l4 4-4 4\" /></svg>\n              </button>\n            </footer>\n          }\n        </section>\n\n        <aside class=\"live-preview\" aria-label=\"R\u00E9sum\u00E9 de votre configuration\">\n          <div class=\"preview-head\">\n            <span>Aper\u00E7u vivant</span>\n            <i aria-hidden=\"true\"></i>\n          </div>\n          <div class=\"school-avatar\" aria-hidden=\"true\">{{ draft().profile.schoolName ? draft().profile.schoolName.charAt(0).toUpperCase() : 'E' }}</div>\n          <h3>{{ draft().profile.schoolName || 'Votre \u00E9tablissement' }}</h3>\n          <p>{{ draft().profile.city || 'Ville \u00E0 pr\u00E9ciser' }} \u00B7 {{ draft().profile.country }}</p>\n\n          <div class=\"preview-facts\">\n            <div><small>Profil</small><strong>{{ presetLabel(draft().profile.preset) }}</strong></div>\n            <div><small>Campus</small><strong>{{ draft().profile.campusCount }}</strong></div>\n            <div><small>Devise</small><strong>{{ draft().rules.currency }}</strong></div>\n            <div><small>Classes</small><strong>{{ draft().rules.classCapacity }} \u00E9l\u00E8ves</strong></div>\n          </div>\n\n          <div class=\"preview-modules\">\n            <small>Espaces choisis</small>\n            @if (selectedModuleLabels().length > 0) {\n              <div>\n                @for (label of selectedModuleLabels(); track label) { <span>{{ label }}</span> }\n              </div>\n            } @else {\n              <p>Aucun espace s\u00E9lectionn\u00E9</p>\n            }\n          </div>\n\n          <div class=\"privacy-note\">\n            <svg viewBox=\"0 0 20 20\" aria-hidden=\"true\"><path d=\"M6.5 8V6a3.5 3.5 0 0 1 7 0v2M5 8h10v8H5V8Z\" /></svg>\n            <span><strong>Brouillon priv\u00E9</strong>Conserv\u00E9 uniquement pour cette session.</span>\n          </div>\n        </aside>\n      </div>\n    </div>\n  </main>\n</div>\n", styles: [":host {\n  --ink: #102b2c;\n  --muted: #667b7b;\n  --line: #dce7e4;\n  --canvas: #f4f8f6;\n  --surface: #ffffff;\n  --primary: #087f72;\n  --primary-dark: #05675d;\n  --mint: #dff8ee;\n  --coral: #ff7557;\n  --sun: #f4bd55;\n  display: block;\n  min-height: 100dvh;\n  color: var(--ink);\n  font-family: Inter, \"Segoe UI\", sans-serif;\n}\n\n* { box-sizing: border-box; }\n\na { color: inherit; text-decoration: none; }\nbutton, input, select { font: inherit; }\nbutton, a { -webkit-tap-highlight-color: transparent; }\n\n.skip-link {\n  position: fixed;\n  z-index: 100;\n  top: 10px;\n  left: 10px;\n  padding: 10px 14px;\n  border-radius: 9px;\n  background: #fff;\n  color: var(--ink);\n  box-shadow: 0 8px 24px #001b1833;\n  transform: translateY(-160%);\n  transition: transform .2s ease;\n}\n\n.skip-link:focus { transform: translateY(0); }\n\n.setup-page {\n  min-height: 100dvh;\n  display: grid;\n  grid-template-columns: 320px minmax(0, 1fr);\n  background:\n    radial-gradient(circle at 82% 3%, #dff8ee8c, transparent 25rem),\n    var(--canvas);\n}\n\n.story-panel {\n  position: sticky;\n  top: 0;\n  height: 100dvh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  padding: 32px 34px 30px;\n  color: #f7fffc;\n  background:\n    radial-gradient(circle at 12% 72%, #19a89345, transparent 15rem),\n    linear-gradient(154deg, #092f2e 0%, #061f21 72%);\n}\n\n.brand,\n.mobile-brand {\n  position: relative;\n  z-index: 1;\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  width: fit-content;\n  font-weight: 800;\n  letter-spacing: -.02em;\n}\n\n.brand-mark {\n  width: 38px;\n  height: 38px;\n  display: grid;\n  place-items: center;\n  border-radius: 12px;\n  background: linear-gradient(145deg, #20c9ad, #0a8b7b);\n  box-shadow: 0 10px 24px #0015135e;\n}\n\n.brand-mark svg { width: 25px; fill: none; stroke: #fff; stroke-width: 1.7; }\n.brand-mark svg path:last-child { stroke: #ffd17c; }\n\n.story-copy { position: relative; z-index: 1; margin-top: 70px; }\n.story-kicker,\n.eyebrow {\n  display: inline-flex;\n  color: var(--primary);\n  font-size: .72rem;\n  font-weight: 800;\n  letter-spacing: .1em;\n  text-transform: uppercase;\n}\n.story-kicker { color: #7be4d2; }\n.story-copy h1 {\n  max-width: 245px;\n  margin: 16px 0 18px;\n  color: #fff;\n  font-size: clamp(1.85rem, 2.5vw, 2.35rem);\n  line-height: 1.08;\n  letter-spacing: -.045em;\n}\n.story-copy p { max-width: 245px; margin: 0; color: #c3d7d4; font-size: .9rem; line-height: 1.65; }\n\n.context-note {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  gap: 12px;\n  padding: 15px;\n  border: 1px solid #c9fff12b;\n  border-radius: 15px;\n  background: #ffffff0a;\n}\n.context-index { color: #64d8c5; font-size: .68rem; font-weight: 800; letter-spacing: .08em; }\n.context-note strong { display: block; font-size: .83rem; }\n.context-note p { margin: 5px 0 0; color: #aac3bf; font-size: .73rem; line-height: 1.45; }\n\n.trust-list { position: relative; z-index: 1; display: grid; gap: 8px; margin: auto 0 0; padding: 0; list-style: none; color: #b9cfcc; font-size: .72rem; }\n.trust-list span { display: inline-grid; place-items: center; width: 16px; height: 16px; margin-right: 7px; border-radius: 50%; color: #72e2cf; background: #64ddc51a; font-weight: 800; }\n\n.workspace { min-width: 0; }\n.workspace-topbar {\n  height: 72px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 24px;\n  padding: 0 44px;\n  border-bottom: 1px solid #dbe7e280;\n  background: #f7faf8a6;\n}\n.mobile-brand { display: none; margin-right: auto; }\n.brand-mark.mini { width: 32px; height: 32px; }\n.brand-mark.mini svg { width: 20px; }\n.draft-status { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: .73rem; }\n.draft-status i { width: 7px; height: 7px; border-radius: 50%; background: #1fc39e; box-shadow: 0 0 0 4px #1fc39e1b; }\n.exit-link { display: inline-flex; align-items: center; gap: 5px; color: #526a69; font-size: .78rem; font-weight: 700; }\n.exit-link svg { width: 17px; fill: none; stroke: currentColor; stroke-width: 1.8; }\n\n.workspace-inner { max-width: 1180px; margin: 0 auto; padding: 32px 40px 48px; }\n.stepper { position: relative; max-width: 680px; margin-bottom: 24px; }\n.progress-track { position: absolute; top: 16px; left: 18px; right: 18px; height: 2px; overflow: hidden; background: #d7e4df; }\n.progress-track span { display: block; height: 100%; max-width: 100%; background: linear-gradient(90deg, var(--primary), #39c6ac); transition: width .35s ease; }\n.stepper ol { position: relative; z-index: 1; display: flex; justify-content: space-between; margin: 0; padding: 0; list-style: none; }\n.stepper button { display: grid; justify-items: center; gap: 5px; min-width: 70px; padding: 0 5px; color: #8b9b98; border: 0; background: transparent; cursor: pointer; }\n.stepper button > span { width: 34px; height: 34px; display: grid; place-items: center; border: 2px solid var(--canvas); border-radius: 50%; background: #dfe9e5; color: #768985; font-size: .72rem; font-weight: 800; transition: .2s ease; }\n.stepper small { font-size: .67rem; font-weight: 700; }\n.stepper li.current button,\n.stepper li.done button { color: var(--primary); }\n.stepper li.current button > span { background: var(--primary); color: #fff; box-shadow: 0 0 0 5px #0f9a8818; }\n.stepper li.done button > span { background: #ccefe5; color: var(--primary-dark); }\n.stepper button:disabled { cursor: not-allowed; opacity: .72; }\n.stepper button:focus-visible > span { outline: 3px solid #ffb85f; outline-offset: 2px; }\n\n.content-grid { display: grid; grid-template-columns: minmax(0, 1fr) 272px; gap: 22px; align-items: start; }\n.config-card {\n  min-width: 0;\n  overflow: hidden;\n  border: 1px solid #dfe9e5;\n  border-radius: 24px;\n  background: #fff;\n  box-shadow: 0 24px 70px #163b3320;\n}\n.step-heading { padding: 34px 38px 26px; }\n.step-heading h2,\n.final-content h2 { margin: 9px 0 9px; color: #102b2c; font-size: clamp(1.55rem, 2.7vw, 2.1rem); line-height: 1.16; letter-spacing: -.04em; outline: none; }\n.step-heading p,\n.final-content > p { max-width: 600px; margin: 0; color: var(--muted); font-size: .88rem; line-height: 1.55; }\n\nform, .form-section { margin: 0; }\n.form-section { padding: 0 38px 27px; border: 0; }\n.form-section legend,\n.rule-block legend { width: 100%; margin: 0 0 12px; padding: 0; color: #284343; font-size: .78rem; font-weight: 800; }\n.preset-grid,\n.priority-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }\n.choice-card { position: relative; min-height: 145px; display: flex; flex-direction: column; align-items: flex-start; padding: 17px; border: 1px solid var(--line); border-radius: 15px; background: #fbfdfc; cursor: pointer; }\n.choice-card.selected { border-color: #28a996; background: #f2fbf8; box-shadow: inset 0 0 0 1px #28a996; }\n.choice-card input,\n.module-card input,\n.payment-card input,\n.segmented input { position: absolute; opacity: 0; pointer-events: none; }\n.choice-card:focus-within,\n.module-card:focus-within,\n.payment-card:focus-within,\n.segmented label:focus-within { outline: 3px solid #ffbe6470; outline-offset: 2px; }\n.preset-icon { width: 35px; height: 35px; display: grid; place-items: center; margin-bottom: 18px; border-radius: 10px; color: var(--primary); background: #dff4ed; }\n.preset-icon svg { width: 20px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linejoin: round; }\n.choice-card strong { color: var(--ink); font-size: .86rem; }\n.choice-card small { margin-top: 6px; color: #718481; font-size: .69rem; line-height: 1.45; }\n.choice-check { position: absolute; top: 12px; right: 12px; width: 19px; height: 19px; display: grid; place-items: center; border: 1px solid #cad9d5; border-radius: 50%; color: transparent; font-size: .68rem; }\n.choice-card.selected .choice-check { border-color: var(--primary); color: #fff; background: var(--primary); }\n\n.fields-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 17px; padding: 0 38px 32px; }\n.field { min-width: 0; display: grid; gap: 7px; color: #294343; font-size: .73rem; font-weight: 700; }\n.field-wide { grid-column: 1 / -1; }\n.field b { color: var(--coral); }\n.field input,\n.field select {\n  width: 100%;\n  height: 45px;\n  padding: 0 13px;\n  color: var(--ink);\n  border: 1px solid #d7e3df;\n  border-radius: 11px;\n  outline: none;\n  background: #fff;\n  font-size: .8rem;\n  font-weight: 500;\n}\n.field input::placeholder { color: #9aa9a6; }\n.field input:focus,\n.field select:focus { border-color: #2da995; box-shadow: 0 0 0 3px #23a89417; }\n.field-error,\n.selection-error { color: #b74435 !important; font-size: .68rem !important; font-weight: 600; }\n\n.priority-card { min-height: 122px; }\n.priority-number { margin-bottom: 17px; color: #1b9b89; font-size: .67rem; font-weight: 900; letter-spacing: .08em; }\n.module-section { padding-top: 2px; }\n.legend-help { margin: -6px 0 13px; color: var(--muted); font-size: .7rem; }\n.module-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }\n.module-card { position: relative; display: flex; align-items: center; gap: 11px; min-height: 65px; padding: 12px; border: 1px solid var(--line); border-radius: 13px; cursor: pointer; }\n.module-card.selected { border-color: #4eb5a3; background: #f2faf7; }\n.module-mark { flex: 0 0 auto; width: 27px; height: 27px; display: grid; place-items: center; border-radius: 8px; color: #69807c; background: #edf3f1; font-size: .8rem; font-weight: 800; }\n.module-card.selected .module-mark { color: #fff; background: var(--primary); }\n.module-card strong,\n.module-card small { display: block; }\n.module-card strong { font-size: .77rem; }\n.module-card small { margin-top: 3px; color: #7a8d89; font-size: .65rem; }\n.selection-error { margin: 10px 0 0; }\n\n.rule-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; padding: 0 38px 24px; }\n.rule-block,\n.rule-line,\n.compact-field { min-width: 0; margin: 0; padding: 15px; border: 1px solid var(--line); border-radius: 14px; }\n.segmented { position: relative; display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; padding: 4px; border-radius: 10px; background: #edf3f1; }\n.segmented.three { grid-template-columns: repeat(3, 1fr); }\n.segmented label { position: relative; display: grid; place-items: center; min-height: 34px; padding: 5px; border-radius: 8px; color: #667c78; font-size: .67rem; font-weight: 700; text-align: center; cursor: pointer; }\n.segmented label.selected { color: var(--primary-dark); background: #fff; box-shadow: 0 3px 10px #183a3215; }\n.rule-line { display: flex; align-items: center; justify-content: space-between; gap: 15px; cursor: pointer; }\n.rule-line strong,\n.rule-line small { display: block; }\n.rule-line strong { font-size: .76rem; }\n.rule-line small { margin-top: 4px; color: var(--muted); font-size: .65rem; font-weight: 500; }\n.switch { position: relative; flex: 0 0 auto; width: 40px; height: 23px; }\n.switch input { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }\n.switch i { position: absolute; inset: 0; border-radius: 20px; background: #cedbd7; transition: .2s ease; }\n.switch i::after { content: \"\"; position: absolute; top: 3px; left: 3px; width: 17px; height: 17px; border-radius: 50%; background: #fff; box-shadow: 0 2px 5px #173d3550; transition: .2s ease; }\n.switch input:checked + i { background: var(--primary); }\n.switch input:checked + i::after { transform: translateX(17px); }\n.switch input:focus-visible + i { outline: 3px solid #ffbe6470; outline-offset: 2px; }\n.compact-field { align-content: start; }\n.input-suffix { position: relative; }\n.input-suffix input { padding-right: 55px; }\n.input-suffix span { position: absolute; top: 50%; right: 12px; color: #80918e; font-size: .66rem; transform: translateY(-50%); }\n.payment-section { padding-bottom: 31px; }\n.payment-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }\n.payment-card { position: relative; min-height: 78px; display: flex; flex-direction: column; justify-content: center; padding: 12px 10px; border: 1px solid var(--line); border-radius: 12px; cursor: pointer; }\n.payment-card.selected { border-color: #4fb6a4; background: #f0faf7; }\n.payment-card strong { padding-right: 16px; font-size: .72rem; }\n.payment-card small { margin-top: 4px; color: #7e918d; font-size: .6rem; }\n.payment-check { position: absolute; top: 9px; right: 9px; color: transparent; font-size: .7rem; }\n.payment-card.selected .payment-check { color: var(--primary); }\n\n.card-footer { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 15px; padding: 20px 38px; border-top: 1px solid #e6eeeb; background: #fbfdfc; }\n.primary-button,\n.secondary-button { min-height: 45px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 18px; border-radius: 11px; font-size: .78rem; font-weight: 800; cursor: pointer; }\n.primary-button { justify-self: end; color: #fff; border: 0; background: linear-gradient(135deg, #099786, #087266); box-shadow: 0 9px 20px #08796a35; }\n.secondary-button { justify-self: start; color: #3f5855; border: 1px solid #d9e5e1; background: #fff; }\n.primary-button svg,\n.secondary-button svg { width: 17px; fill: none; stroke: currentColor; stroke-width: 1.8; }\n.step-count { color: #80918e; font-size: .69rem; font-weight: 800; }\n\n.live-preview { position: sticky; top: 95px; overflow: hidden; padding: 20px; border: 1px solid var(--line); border-radius: 20px; background: #fff; box-shadow: 0 15px 42px #17392f12; }\n.preview-head { display: flex; justify-content: space-between; margin-bottom: 18px; color: #6c827e; font-size: .63rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }\n.preview-head i { width: 7px; height: 7px; border-radius: 50%; background: var(--coral); }\n.school-avatar { width: 46px; height: 46px; display: grid; place-items: center; margin-bottom: 12px; border-radius: 14px; color: #fff; background: linear-gradient(145deg, #16a48f, #075b56); font-weight: 900; }\n.live-preview h3 { overflow-wrap: anywhere; margin: 0 0 5px; font-size: 1rem; }\n.live-preview > p { margin: 0; color: var(--muted); font-size: .7rem; }\n.preview-facts { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin: 18px 0; }\n.preview-facts div { min-width: 0; padding: 9px; border-radius: 9px; background: #f3f8f6; }\n.preview-facts small, .preview-facts strong, .privacy-note span, .privacy-note strong { display: block; }\n.preview-facts small, .preview-modules > small { color: #82938f; font-size: .58rem; }\n.preview-facts strong { overflow: hidden; margin-top: 4px; font-size: .66rem; text-overflow: ellipsis; white-space: nowrap; }\n.preview-modules > div { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 8px; }\n.preview-modules span { padding: 5px 7px; border-radius: 7px; color: #28685f; background: var(--mint); font-size: .58rem; }\n.preview-modules p { color: #889894; font-size: .65rem; }\n.privacy-note { display: flex; gap: 8px; margin: 18px -20px -20px; padding: 13px 20px; border-top: 1px solid var(--line); background: #fbfdfc; }\n.privacy-note svg { width: 17px; fill: none; stroke: var(--primary); stroke-width: 1.6; }\n.privacy-note span { color: #738783; font-size: .6rem; line-height: 1.4; }\n.privacy-note strong { color: #34524e; }\n\n.final-content { padding: 38px; text-align: center; }\n.success-mark { width: 56px; height: 56px; display: grid; place-items: center; margin: 0 auto 19px; border-radius: 18px; color: #fff; background: var(--primary); }\n.success-mark svg { width: 30px; fill: none; stroke: currentColor; stroke-width: 2.4; }\n.final-content > p { margin: 0 auto; }\n.recap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; margin: 29px 0 22px; text-align: left; }\n.recap-grid article { position: relative; min-width: 0; padding: 16px; border: 1px solid var(--line); border-radius: 14px; background: #fbfdfc; }\n.recap-index { position: absolute; top: 13px; right: 13px; color: #83a19b; font-size: .58rem; }\n.recap-grid small,\n.recap-grid strong { display: block; }\n.recap-grid small { color: #78908b; font-size: .61rem; }\n.recap-grid strong { overflow-wrap: anywhere; margin: 13px 0 5px; font-size: .76rem; }\n.recap-grid p { margin: 0; color: var(--muted); font-size: .63rem; line-height: 1.4; }\n.final-action { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 17px; border-radius: 15px; color: #fff; background: #0a302f; text-align: left; }\n.final-action strong,\n.final-action span { display: block; }\n.final-action strong { font-size: .78rem; }\n.final-action span { margin-top: 4px; color: #b9d2ce; font-size: .65rem; }\n.final-button { flex: 0 0 auto; background: linear-gradient(135deg, #24bca4, #0a8c7c); }\n.restart-button { margin-top: 18px; padding: 4px; color: #647c78; border: 0; border-bottom: 1px solid #aebfbb; background: none; font-size: .67rem; cursor: pointer; }\n\n@media (max-width: 980px) {\n  .setup-page { display: block; }\n  .story-panel { display: none; }\n  .mobile-brand { display: inline-flex; }\n  .workspace-topbar { padding-inline: 28px; }\n  .content-grid { grid-template-columns: minmax(0, 1fr); }\n  .live-preview { position: static; }\n}\n\n@media (max-width: 640px) {\n  .workspace-topbar { height: 62px; gap: 12px; padding-inline: 16px; }\n  .draft-status { display: none; }\n  .exit-link { font-size: 0; }\n  .exit-link svg { width: 21px; }\n  .workspace-inner { padding: 22px 12px 35px; }\n  .stepper { margin-inline: 4px; }\n  .stepper button { min-width: 44px; }\n  .stepper small { font-size: .58rem; }\n  .content-grid { gap: 14px; }\n  .config-card { border-radius: 18px; }\n  .step-heading { padding: 27px 20px 22px; }\n  .step-heading h2, .final-content h2 { font-size: 1.55rem; }\n  .form-section { padding-inline: 20px; }\n  .preset-grid, .priority-grid, .module-grid, .fields-grid, .rule-grid, .payment-grid { grid-template-columns: 1fr; }\n  .choice-card { min-height: auto; }\n  .preset-card { display: grid; grid-template-columns: 38px 1fr; column-gap: 11px; }\n  .preset-icon { grid-row: 1 / 3; margin: 0; }\n  .preset-card small { margin-top: 3px; }\n  .fields-grid, .rule-grid { padding-inline: 20px; }\n  .field-wide { grid-column: auto; }\n  .payment-grid { grid-template-columns: repeat(2, 1fr); }\n  .card-footer { padding: 17px 20px; }\n  .primary-button, .secondary-button { padding-inline: 13px; }\n  .final-content { padding: 30px 20px; }\n  .recap-grid { grid-template-columns: 1fr; }\n  .final-action { align-items: stretch; flex-direction: column; }\n  .final-button { width: 100%; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; }\n}\n\n/**\n * Les deux nombres qui d\u00E9cident de la taille de l'\u00E9cole, c\u00F4te \u00E0 c\u00F4te.\n *\n * Les s\u00E9parer verticalement laissait croire qu'ils \u00E9taient ind\u00E9pendants ;\n * c'est leur produit qui compte, et on le lit mieux d'un seul regard.\n */\n.field-pair {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-3, 12px);\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.rule-hint {\n  margin: calc(var(--space-2, 8px) * -1) 0 var(--space-4, 16px);\n  font-size: 0.85rem;\n  color: var(--text-muted, #64748b);\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DemoSetupComponent, { className: "DemoSetupComponent", filePath: "frontend/src/app/features/demo-setup/demo-setup.component.ts", lineNumber: 42 }); })();
//# sourceMappingURL=demo-setup.component.js.map