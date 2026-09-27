import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OPTION_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { OPTION_CATEGORIES, OPTION_CHOICE_STATES, OPTION_COLORS } from '@core/models/option.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.code;
function OptionsComponent_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const o_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", o_r1.waitlistedCount, " en attente ");
} }
function OptionsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵtemplate(1, OptionsComponent_Conditional_7_Conditional_1_Template, 1, 1);
} if (rf & 2) {
    const o_r1 = ctx;
    i0.ɵɵtextInterpolate4(" ", o_r1.activeOptionCount, " option(s) \u00B7 ", o_r1.offeringCount, " ouverture(s) de niveau \u00B7 ", o_r1.confirmedCount, " place(s) confirm\u00E9e(s) sur ", o_r1.totalCapacity, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(o_r1.waitlistedCount > 0 ? 1 : -1);
} }
function OptionsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 10);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openAssign()); });
    i0.ɵɵelementStart(1, "span", 11);
    i0.ɵɵtext(2, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Inscrire un \u00E9l\u00E8ve ");
    i0.ɵɵelementEnd();
} }
function OptionsComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 10);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openForm()); });
    i0.ɵɵelementStart(1, "span", 11);
    i0.ɵɵtext(2, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Nouvelle option ");
    i0.ɵɵelementEnd();
} }
function OptionsComponent_Conditional_18_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const o_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(o_r5.waitlistedCount);
} }
function OptionsComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, OptionsComponent_Conditional_18_Conditional_0_Template, 2, 1, "span", 12);
} if (rf & 2) {
    i0.ɵɵconditional(ctx.waitlistedCount > 0 ? 0 : -1);
} }
function OptionsComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 9);
} }
function OptionsComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 13);
    i0.ɵɵlistener("retry", function OptionsComponent_Conditional_20_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.load()); });
    i0.ɵɵelementEnd();
} }
function OptionsComponent_Conditional_21_Conditional_0_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 20)(1, "span", 21);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 22);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_12_0;
    const offering_r7 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", (tmp_12_0 = ctx_r2.optionOf(offering_r7.id)) == null ? null : tmp_12_0.name, " \u2014 ", offering_r7.levelName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" ", offering_r7.confirmedCount, "/", offering_r7.capacity, " places \u00B7 ", offering_r7.waitlistedCount, " en attente ");
} }
function OptionsComponent_Conditional_21_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 14)(1, "div", 15)(2, "span", 16);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 17);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 18);
    i0.ɵɵtext(8, " Les v\u0153ux qui arrivent sur ces groupes passent en liste d'attente. Augmenter la capacit\u00E9, ou ouvrir un second groupe, lib\u00E8re la file. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "ul", 19);
    i0.ɵɵrepeaterCreate(10, OptionsComponent_Conditional_21_Conditional_0_For_11_Template, 5, 5, "li", 20, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.fullOfferings().length, " ouverture(s) au complet ");
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r2.fullOfferings());
} }
function OptionsComponent_Conditional_21_Conditional_1_For_7_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const option_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", option_r11.languageCode, " ");
} }
function OptionsComponent_Conditional_21_Conditional_1_For_7_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r11.waitlistedCount, " en attente ");
} }
function OptionsComponent_Conditional_21_Conditional_1_For_7_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r11.description);
} }
function OptionsComponent_Conditional_21_Conditional_1_For_7_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 36);
    i0.ɵɵtext(1, " Ouverte sur ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " niveau(x) \u00B7 ");
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r11.levelCount);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r11.confirmedCount);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" / ", option_r11.totalCapacity, " place(s) prise(s) ");
} }
function OptionsComponent_Conditional_21_Conditional_1_For_7_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 37);
    i0.ɵɵtext(1, " Ouverte sur aucun niveau : personne ne peut la choisir. ");
    i0.ɵɵelementEnd();
} }
function OptionsComponent_Conditional_21_Conditional_1_For_7_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 28)(1, "header", 29)(2, "div", 30)(3, "h2", 31);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 32);
    i0.ɵɵtext(6);
    i0.ɵɵtemplate(7, OptionsComponent_Conditional_21_Conditional_1_For_7_Conditional_7_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, OptionsComponent_Conditional_21_Conditional_1_For_7_Conditional_8_Template, 2, 1, "span", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 34);
    i0.ɵɵtemplate(10, OptionsComponent_Conditional_21_Conditional_1_For_7_Conditional_10_Template, 2, 1, "p", 35)(11, OptionsComponent_Conditional_21_Conditional_1_For_7_Conditional_11_Template, 8, 3, "p", 36)(12, OptionsComponent_Conditional_21_Conditional_1_For_7_Conditional_12_Template, 2, 0, "p", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "footer", 38)(14, "button", 39);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_21_Conditional_1_For_7_Template_button_click_14_listener() { const option_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openForm(option_r11)); });
    i0.ɵɵtext(15, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 40);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_21_Conditional_1_For_7_Template_button_click_16_listener() { const option_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.archive(option_r11)); });
    i0.ɵɵtext(17, "Archiver");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 41);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_21_Conditional_1_For_7_Template_button_click_18_listener() { const option_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openOfferings(option_r11)); });
    i0.ɵɵtext(19, "Niveaux");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const option_r11 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵstyleProp("--option-color", option_r11.colorHex || "var(--brand)");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(option_r11.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", option_r11.code, " \u00B7 ", option_r11.categoryLabel, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(option_r11.languageCode ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(option_r11.waitlistedCount > 0 ? 8 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(option_r11.description ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(option_r11.levelCount > 0 ? 11 : 12);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r2.saving() || option_r11.confirmedCount > 0 || option_r11.requestedCount > 0 || option_r11.waitlistedCount > 0);
    i0.ɵɵattribute("title", option_r11.confirmedCount > 0 ? "Des \u00E9l\u00E8ves l'ont choisie" : null);
} }
function OptionsComponent_Conditional_21_Conditional_1_ForEmpty_8_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "p", 42);
    i0.ɵɵtext(2, "Aucune option d\u00E9clar\u00E9e.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 43);
    i0.ɵɵtext(4, " Commencez par les langues vivantes : ce sont les seuls choix que tous les \u00E9l\u00E8ves doivent faire. Le reste \u2014 latin, musique, informatique \u2014 vient ensuite. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 10);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_21_Conditional_1_ForEmpty_8_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openForm()); });
    i0.ɵɵtext(6, " D\u00E9clarer une option ");
    i0.ɵɵelementEnd()();
} }
function OptionsComponent_Conditional_21_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1, " Une option existe une seule fois pour tout l'\u00E9tablissement. Ce qui change d'un niveau \u00E0 l'autre \u2014 capacit\u00E9, horaire, p\u00E9riode de choix \u2014 se r\u00E8gle dans ");
    i0.ɵɵelementStart(2, "button", 24);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_21_Conditional_1_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.changeTab("NIVEAUX")); });
    i0.ɵɵtext(3, " Ouverture par niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, ". ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "section", 25);
    i0.ɵɵrepeaterCreate(6, OptionsComponent_Conditional_21_Conditional_1_For_7_Template, 20, 11, "article", 26, _forTrack0, false, OptionsComponent_Conditional_21_Conditional_1_ForEmpty_8_Template, 7, 0, "div", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r2.options());
} }
function OptionsComponent_Conditional_21_Conditional_2_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r12 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(level_r12.name);
} }
function OptionsComponent_Conditional_21_Conditional_2_For_16_For_9_Conditional_1_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 60);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const offering_r14 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", offering_r14.waitlistedCount, " en attente");
} }
function OptionsComponent_Conditional_21_Conditional_2_For_16_For_9_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 58);
    i0.ɵɵelement(3, "span", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, OptionsComponent_Conditional_21_Conditional_2_For_16_For_9_Conditional_1_Conditional_4_Template, 2, 1, "span", 60);
} if (rf & 2) {
    const offering_r14 = ctx;
    const ctx_r2 = i0.ɵɵnextContext(5);
    i0.ɵɵclassProp("matrix__seats--full", offering_r14.availableSeats === 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", offering_r14.confirmedCount, "/", offering_r14.capacity, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r2.fillOf(offering_r14), "%");
    i0.ɵɵadvance();
    i0.ɵɵconditional(offering_r14.waitlistedCount > 0 ? 4 : -1);
} }
function OptionsComponent_Conditional_21_Conditional_2_For_16_For_9_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function OptionsComponent_Conditional_21_Conditional_2_For_16_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 54);
    i0.ɵɵtemplate(1, OptionsComponent_Conditional_21_Conditional_2_For_16_For_9_Conditional_1_Template, 5, 7)(2, OptionsComponent_Conditional_21_Conditional_2_For_16_For_9_Conditional_2_Template, 2, 0, "span", 56);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_22_0;
    const level_r15 = ctx.$implicit;
    const option_r16 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_22_0 = ctx_r2.offeringAt(option_r16, level_r15.id)) ? 1 : 2, tmp_22_0);
} }
function OptionsComponent_Conditional_21_Conditional_2_For_16_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "th", 50);
    i0.ɵɵelement(2, "span", 51);
    i0.ɵɵelementStart(3, "span")(4, "span", 52);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 53);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵrepeaterCreate(8, OptionsComponent_Conditional_21_Conditional_2_For_16_For_9_Template, 3, 1, "td", 54, _forTrack0);
    i0.ɵɵelementStart(10, "td", 55)(11, "button", 41);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_21_Conditional_2_For_16_Template_button_click_11_listener() { const option_r16 = i0.ɵɵrestoreView(_r13).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openOfferings(option_r16)); });
    i0.ɵɵtext(12, "R\u00E9gler");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const option_r16 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("background", option_r16.colorHex || "var(--brand)");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r16.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r16.code);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.levels());
} }
function OptionsComponent_Conditional_21_Conditional_2_ForEmpty_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 27)(3, "p", 42);
    i0.ɵɵtext(4, "Aucune option au catalogue.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 43);
    i0.ɵɵtext(6, " D\u00E9clarez d'abord une option, puis revenez l'ouvrir sur les niveaux concern\u00E9s. ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵattribute("colspan", ctx_r2.levels().length + 2);
} }
function OptionsComponent_Conditional_21_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1, " Chaque case dit ce qui est ouvert, avec les places prises sur les places offertes. Une case vide veut dire que l'option n'est pas propos\u00E9e \u00E0 ce niveau : aucun \u00E9l\u00E8ve ne peut la demander. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 44)(3, "table", 45)(4, "caption", 46);
    i0.ɵɵtext(5, "Options ouvertes par niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "thead")(7, "tr")(8, "th", 47);
    i0.ɵɵtext(9, "Option");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(10, OptionsComponent_Conditional_21_Conditional_2_For_11_Template, 2, 1, "th", 48, _forTrack0);
    i0.ɵɵelementStart(12, "th", 49);
    i0.ɵɵtext(13, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "tbody");
    i0.ɵɵrepeaterCreate(15, OptionsComponent_Conditional_21_Conditional_2_For_16_Template, 13, 4, "tr", null, _forTrack0, false, OptionsComponent_Conditional_21_Conditional_2_ForEmpty_17_Template, 7, 1, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(ctx_r2.levels());
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r2.options());
} }
function OptionsComponent_Conditional_21_Conditional_3_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r18 = ctx.$implicit;
    i0.ɵɵproperty("value", level_r18.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(level_r18.name);
} }
function OptionsComponent_Conditional_21_Conditional_3_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const state_r19 = ctx.$implicit;
    i0.ɵɵproperty("value", state_r19.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(state_r19.label);
} }
function OptionsComponent_Conditional_21_Conditional_3_For_41_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 77);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_21_Conditional_3_For_41_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r20); const choice_r21 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.changeStatus(choice_r21, "CONFIRMED")); });
    i0.ɵɵtext(1, "Confirmer");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("disabled", ctx_r2.saving());
} }
function OptionsComponent_Conditional_21_Conditional_3_For_41_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 40);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_21_Conditional_3_For_41_Conditional_18_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r22); const choice_r21 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.changeStatus(choice_r21, "WAITLISTED")); });
    i0.ɵɵtext(1, "Mettre en attente");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("disabled", ctx_r2.saving());
} }
function OptionsComponent_Conditional_21_Conditional_3_For_41_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 40);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_21_Conditional_3_For_41_Conditional_19_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r23); const choice_r21 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.changeStatus(choice_r21, "CANCELLED")); });
    i0.ɵɵtext(1, "Retirer");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("disabled", ctx_r2.saving());
} }
function OptionsComponent_Conditional_21_Conditional_3_For_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "span", 70);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 71);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td")(7, "span", 72);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 73);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td")(14, "span", 74);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "td", 55);
    i0.ɵɵtemplate(17, OptionsComponent_Conditional_21_Conditional_3_For_41_Conditional_17_Template, 2, 1, "button", 75)(18, OptionsComponent_Conditional_21_Conditional_3_For_41_Conditional_18_Template, 2, 1, "button", 76)(19, OptionsComponent_Conditional_21_Conditional_3_For_41_Conditional_19_Template, 2, 1, "button", 76);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const choice_r21 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("row--wait", choice_r21.status === "WAITLISTED");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(choice_r21.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", choice_r21.studentNumber, " \u00B7 ", choice_r21.classroomName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("--option-color", choice_r21.optionColor || "var(--brand)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", choice_r21.optionName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(choice_r21.levelName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(choice_r21.priority);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-tone", ctx_r2.stateOf(choice_r21.status).tone)("title", ctx_r2.stateOf(choice_r21.status).hint);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", choice_r21.statusLabel, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(choice_r21.status !== "CONFIRMED" ? 17 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(choice_r21.status === "REQUESTED" ? 18 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(choice_r21.status !== "CANCELLED" ? 19 : -1);
} }
function OptionsComponent_Conditional_21_Conditional_3_ForEmpty_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 78)(2, "div", 27)(3, "p", 42);
    i0.ɵɵtext(4, "Aucun v\u0153u sur ce filtre.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 43);
    i0.ɵɵtext(6, " Les v\u0153ux arrivent du portail des familles, ou s'inscrivent ici pendant la campagne de choix. ");
    i0.ɵɵelementEnd()()()();
} }
function OptionsComponent_Conditional_21_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 61)(1, "label", 62)(2, "span", 46);
    i0.ɵɵtext(3, "Filtrer par niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 63);
    i0.ɵɵlistener("change", function OptionsComponent_Conditional_21_Conditional_3_Template_select_change_4_listener($event) { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.changeLevelFilter($event.target.value)); });
    i0.ɵɵelementStart(5, "option", 64);
    i0.ɵɵtext(6, "Tous les niveaux");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(7, OptionsComponent_Conditional_21_Conditional_3_For_8_Template, 2, 2, "option", 65, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "label", 62)(10, "span", 46);
    i0.ɵɵtext(11, "Filtrer par \u00E9tat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "select", 63);
    i0.ɵɵlistener("change", function OptionsComponent_Conditional_21_Conditional_3_Template_select_change_12_listener($event) { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.changeStatusFilter($event.target.value)); });
    i0.ɵɵelementStart(13, "option", 64);
    i0.ɵɵtext(14, "Tous les \u00E9tats");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(15, OptionsComponent_Conditional_21_Conditional_3_For_16_Template, 2, 2, "option", 65, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "label", 66)(18, "span", 46);
    i0.ɵɵtext(19, "Rechercher un \u00E9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "input", 67);
    i0.ɵɵlistener("change", function OptionsComponent_Conditional_21_Conditional_3_Template_input_change_20_listener($event) { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.changeSearch($event.target.value)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 44)(22, "table", 68)(23, "caption", 46);
    i0.ɵɵtext(24, "V\u0153ux d'options des \u00E9l\u00E8ves");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "thead")(26, "tr")(27, "th", 47);
    i0.ɵɵtext(28, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "th", 47);
    i0.ɵɵtext(30, "Option");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "th", 47);
    i0.ɵɵtext(32, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "th", 48);
    i0.ɵɵtext(34, "Priorit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "th", 47);
    i0.ɵɵtext(36, "\u00C9tat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "th", 49);
    i0.ɵɵtext(38, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(39, "tbody");
    i0.ɵɵrepeaterCreate(40, OptionsComponent_Conditional_21_Conditional_3_For_41_Template, 20, 16, "tr", 69, _forTrack0, false, OptionsComponent_Conditional_21_Conditional_3_ForEmpty_42_Template, 7, 0, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r2.levelFilter());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.levels());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r2.statusFilter());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.states);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r2.search());
    i0.ɵɵadvance(20);
    i0.ɵɵrepeater(ctx_r2.choices());
} }
function OptionsComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, OptionsComponent_Conditional_21_Conditional_0_Template, 12, 1, "section", 14)(1, OptionsComponent_Conditional_21_Conditional_1_Template, 9, 1)(2, OptionsComponent_Conditional_21_Conditional_2_Template, 18, 1)(3, OptionsComponent_Conditional_21_Conditional_3_Template, 43, 4);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r2.fullOfferings().length > 0 ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.tab() === "CATALOGUE" ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.tab() === "NIVEAUX" ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.tab() === "VOEUX" ? 3 : -1);
} }
function OptionsComponent_Conditional_22_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r25 = ctx.$implicit;
    i0.ɵɵproperty("value", category_r25.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(category_r25.label);
} }
function OptionsComponent_Conditional_22_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86)(1, "label", 102);
    i0.ɵɵtext(2, "Code de la langue");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "input", 103);
    i0.ɵɵelementStart(4, "span", 91);
    i0.ɵɵtext(5, " Code ISO \u00E0 deux lettres : es, de, en. C'est lui qui distinguera une LV1 d'une LV2 dans les bulletins. ");
    i0.ɵɵelementEnd()();
} }
function OptionsComponent_Conditional_22_For_35_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 104);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_22_For_35_Template_button_click_0_listener() { const color_r27 = i0.ɵɵrestoreView(_r26).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.pickColor(color_r27)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r27 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("background", color_r27);
    i0.ɵɵclassProp("swatch--on", ctx_r2.optionForm.controls.colorHex.value === color_r27);
    i0.ɵɵattribute("aria-label", "Couleur " + color_r27);
} }
function OptionsComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 79);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_22_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r24); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeForm()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 80)(2, "header", 81)(3, "h2", 82);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 83);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_22_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r24); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeForm()); });
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 84);
    i0.ɵɵlistener("ngSubmit", function OptionsComponent_Conditional_22_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r24); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitForm()); });
    i0.ɵɵelementStart(8, "div", 85)(9, "div", 86)(10, "label", 87);
    i0.ɵɵtext(11, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 88);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 86)(14, "label", 89);
    i0.ɵɵtext(15, "Famille");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "select", 90);
    i0.ɵɵrepeaterCreate(17, OptionsComponent_Conditional_22_For_18_Template, 2, 2, "option", 65, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 91);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 86)(22, "label", 92);
    i0.ɵɵtext(23, "Intitul\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(24, "input", 93);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, OptionsComponent_Conditional_22_Conditional_25_Template, 6, 0, "div", 86);
    i0.ɵɵelementStart(26, "div", 86)(27, "label", 94);
    i0.ɵɵtext(28, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(29, "textarea", 95);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 86)(31, "span", 96);
    i0.ɵɵtext(32, "Couleur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 97);
    i0.ɵɵrepeaterCreate(34, OptionsComponent_Conditional_22_For_35_Template, 1, 5, "button", 98, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span", 91);
    i0.ɵɵtext(37, " Elle rend l'option reconnaissable dans l'emploi du temps et les listes. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(38, "footer", 99)(39, "button", 100);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_22_Template_button_click_39_listener() { i0.ɵɵrestoreView(_r24); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeForm()); });
    i0.ɵɵtext(40, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "button", 101);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_22_Template_button_click_41_listener() { i0.ɵɵrestoreView(_r24); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitForm()); });
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.editing() ? "Modifier l'option" : "Nouvelle option", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r2.optionForm);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(ctx_r2.categories);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.categoryHint(ctx_r2.optionForm.controls.category.value), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r2.optionForm.controls.category.value === "LANGUAGE" ? 25 : -1);
    i0.ɵɵadvance(9);
    i0.ɵɵrepeater(ctx_r2.colors);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", ctx_r2.optionForm.invalid || ctx_r2.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.editing() ? "Enregistrer" : "Cr\u00E9er", " ");
} }
function OptionsComponent_Conditional_23_For_18_Conditional_5_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const offering_r31 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", offering_r31.waitlistedCount, " en attente ");
} }
function OptionsComponent_Conditional_23_For_18_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 123);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, OptionsComponent_Conditional_23_For_18_Conditional_5_Conditional_2_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const offering_r31 = ctx;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", offering_r31.confirmedCount, "/", offering_r31.capacity, " places ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(offering_r31.waitlistedCount > 0 ? 2 : -1);
} }
function OptionsComponent_Conditional_23_For_18_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 124);
    i0.ɵɵtext(1, "Non ouverte");
    i0.ɵɵelementEnd();
} }
function OptionsComponent_Conditional_23_For_18_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 111)(1, "label", 121)(2, "input", 122);
    i0.ɵɵlistener("change", function OptionsComponent_Conditional_23_For_18_Template_input_change_2_listener() { const level_r30 = i0.ɵɵrestoreView(_r29).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleLevel(level_r30.id)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(5, OptionsComponent_Conditional_23_For_18_Conditional_5_Template, 3, 3, "span", 123)(6, OptionsComponent_Conditional_23_For_18_Conditional_6_Template, 2, 0, "span", 124);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_14_0;
    const level_r30 = ctx.$implicit;
    const option_r32 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", ctx_r2.isSelected(level_r30.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r30.name);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_14_0 = ctx_r2.offeringAt(option_r32, level_r30.id)) ? 5 : 6, tmp_14_0);
} }
function OptionsComponent_Conditional_23_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 112);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.closingLevels().length, " niveau(x) seront ferm\u00E9s \u00E0 l'enregistrement. Un niveau portant des v\u0153ux ne peut pas \u00EAtre ferm\u00E9 : retirez d'abord les \u00E9l\u00E8ves concern\u00E9s. ");
} }
function OptionsComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 79);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_23_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r28); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeOfferings()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 105)(2, "header", 81)(3, "div")(4, "h2", 106);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 107);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 83);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_23_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r28); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeOfferings()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 84);
    i0.ɵɵlistener("ngSubmit", function OptionsComponent_Conditional_23_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r28); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitOfferings()); });
    i0.ɵɵelementStart(11, "p", 108);
    i0.ɵɵtext(12, " Cocher un niveau ouvre l'option avec la capacit\u00E9 et l'horaire ci-dessous. C'est un remplacement : un niveau d\u00E9coch\u00E9 ferme son offre. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 86)(14, "span", 109);
    i0.ɵɵtext(15, "Niveaux");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "ul", 110);
    i0.ɵɵrepeaterCreate(17, OptionsComponent_Conditional_23_For_18_Template, 7, 3, "li", 111, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(19, OptionsComponent_Conditional_23_Conditional_19_Template, 2, 1, "p", 112);
    i0.ɵɵelementStart(20, "div", 85)(21, "div", 86)(22, "label", 113);
    i0.ɵɵtext(23, " Places par niveau ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(24, "input", 114);
    i0.ɵɵelementStart(25, "span", 91);
    i0.ɵɵtext(26, " Au-del\u00E0, un v\u0153u passe en liste d'attente plut\u00F4t que d'\u00EAtre refus\u00E9. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 86)(28, "label", 115);
    i0.ɵɵtext(29, " Heures par semaine ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 116);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div", 85)(32, "div", 86)(33, "label", 117);
    i0.ɵɵtext(34, "Ouverture des choix");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(35, "input", 118);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 86)(37, "label", 119);
    i0.ɵɵtext(38, "Cl\u00F4ture des choix");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(39, "input", 120);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(40, "footer", 99)(41, "button", 100);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_23_Template_button_click_41_listener() { i0.ɵɵrestoreView(_r28); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeOfferings()); });
    i0.ɵɵtext(42, " Annuler ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "button", 101);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_23_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r28); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitOfferings()); });
    i0.ɵɵtext(44, " Enregistrer ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const option_r32 = ctx;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(option_r32.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", option_r32.code, " \u00B7 ", option_r32.categoryLabel, "");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r2.offeringForm);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r2.levels());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.closingLevels().length > 0 ? 19 : -1);
    i0.ɵɵadvance(24);
    i0.ɵɵproperty("disabled", ctx_r2.offeringForm.invalid || ctx_r2.saving());
} }
function OptionsComponent_Conditional_24_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_12_0;
    const offering_r34 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", offering_r34.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3(" ", (tmp_12_0 = ctx_r2.optionOf(offering_r34.id)) == null ? null : tmp_12_0.name, " \u2014 ", offering_r34.levelName, " (", offering_r34.availableSeats, " place(s)) ");
} }
function OptionsComponent_Conditional_24_Conditional_16_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 137);
    i0.ɵɵtext(1, " Ce groupe est complet : le v\u0153u partira en liste d'attente. ");
    i0.ɵɵelementEnd();
} }
function OptionsComponent_Conditional_24_Conditional_16_Conditional_1_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const target_r35 = i0.ɵɵnextContext(2);
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" Choix ouverts jusqu'au ", ctx_r2.formatDate(target_r35.choiceEndDate), ". ");
} }
function OptionsComponent_Conditional_24_Conditional_16_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 91);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, OptionsComponent_Conditional_24_Conditional_16_Conditional_1_Conditional_2_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const target_r35 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", target_r35.availableSeats, " place(s) restante(s) sur ", target_r35.capacity, ". ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(target_r35.choiceEndDate ? 2 : -1);
} }
function OptionsComponent_Conditional_24_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, OptionsComponent_Conditional_24_Conditional_16_Conditional_0_Template, 2, 0, "span", 137)(1, OptionsComponent_Conditional_24_Conditional_16_Conditional_1_Template, 3, 3, "span", 91);
} if (rf & 2) {
    i0.ɵɵconditional(ctx.availableSeats === 0 ? 0 : 1);
} }
function OptionsComponent_Conditional_24_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const student_r36 = ctx.$implicit;
    i0.ɵɵproperty("value", student_r36.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", student_r36.fullName, " \u2014 ", student_r36.classroomName, " ");
} }
function OptionsComponent_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 79);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_24_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r33); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeAssign()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 125)(2, "header", 81)(3, "h2", 126);
    i0.ɵɵtext(4, "Inscrire un \u00E9l\u00E8ve \u00E0 une option");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 83);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_24_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r33); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeAssign()); });
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 84);
    i0.ɵɵlistener("ngSubmit", function OptionsComponent_Conditional_24_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r33); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitAssign()); });
    i0.ɵɵelementStart(8, "div", 86)(9, "label", 127);
    i0.ɵɵtext(10, " Option et niveau ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 128);
    i0.ɵɵlistener("change", function OptionsComponent_Conditional_24_Template_select_change_11_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onOfferingChosen($event.target.value)); });
    i0.ɵɵelementStart(12, "option", 64);
    i0.ɵɵtext(13, "Choisir\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(14, OptionsComponent_Conditional_24_For_15_Template, 2, 4, "option", 65, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(16, OptionsComponent_Conditional_24_Conditional_16_Template, 2, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 86)(18, "label", 129);
    i0.ɵɵtext(19, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "select", 130)(21, "option", 64);
    i0.ɵɵtext(22, "Choisir\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(23, OptionsComponent_Conditional_24_For_24_Template, 2, 3, "option", 65, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span", 91);
    i0.ɵɵtext(26, " Seuls les \u00E9l\u00E8ves du niveau o\u00F9 l'option est ouverte apparaissent : ailleurs, elle ne tomberait sur aucune heure de leur emploi du temps. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 86)(28, "label", 131);
    i0.ɵɵtext(29, " Priorit\u00E9 du v\u0153u ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 132);
    i0.ɵɵelementStart(31, "span", 91);
    i0.ɵɵtext(32, " 1 pour le premier choix de l'\u00E9l\u00E8ve. C'est ce classement qui d\u00E9partage quand les places manquent. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 86)(34, "label", 133);
    i0.ɵɵtext(35, "Observation");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(36, "textarea", 134);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "label", 135);
    i0.ɵɵelement(38, "input", 136);
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40, " Confirmer la place tout de suite ");
    i0.ɵɵelementStart(41, "small");
    i0.ɵɵtext(42, "D\u00E9cochez pour enregistrer le v\u0153u sans trancher. Si le groupe est complet, la confirmation devient automatiquement une mise en attente.");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(43, "footer", 99)(44, "button", 100);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_24_Template_button_click_44_listener() { i0.ɵɵrestoreView(_r33); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeAssign()); });
    i0.ɵɵtext(45, " Annuler ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "button", 101);
    i0.ɵɵlistener("click", function OptionsComponent_Conditional_24_Template_button_click_46_listener() { i0.ɵɵrestoreView(_r33); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitAssign()); });
    i0.ɵɵtext(47, " Inscrire ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("formGroup", ctx_r2.assignForm);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r2.allOfferings());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_3_0 = ctx_r2.assignTarget()) ? 16 : -1, tmp_3_0);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r2.candidates());
    i0.ɵɵadvance(23);
    i0.ɵɵproperty("disabled", ctx_r2.assignForm.invalid || ctx_r2.saving());
} }
/**
 * Options and languages: the catalogue, where each is open, and who chose what.
 *
 * <p>An option is the one thing in a school that is chosen rather than
 * assigned, and choice needs capacity. Everything on this screen turns on that:
 * a wish beyond the seats available is not refused, it is put on a waiting
 * list — and when somebody cancels, that list is the only reason a seat gets
 * offered to anyone.</p>
 *
 * <p>The help works like the one in the configuration: a card appears by itself
 * the first time a tab is opened, and the « ? Aide » button brings it back.</p>
 */
export class OptionsComponent {
    dataSource = inject(OPTION_DATA_SOURCE);
    students = inject(STUDENT_DATA_SOURCE);
    notifications = inject(NotificationService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    categories = OPTION_CATEGORIES;
    states = OPTION_CHOICE_STATES;
    colors = OPTION_COLORS;
    totalSteps = 3;
    tab = signal('CATALOGUE');
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    overview = signal(null);
    choices = signal([]);
    choiceTotal = signal(0);
    /** Filtres de l'onglet des vœux. */
    levelFilter = signal('');
    statusFilter = signal('');
    search = signal('');
    /** L'option en cours de création ou de modification. */
    editing = signal(null);
    formOpen = signal(false);
    /** L'option dont on règle les niveaux d'ouverture. */
    offeringFor = signal(null);
    selectedLevels = signal([]);
    /** Le panneau d'affectation d'un élève. */
    assignOpen = signal(false);
    candidates = signal([]);
    optionForm = this.fb.nonNullable.group({
        code: ['', [Validators.required, Validators.maxLength(30)]],
        name: ['', [Validators.required, Validators.maxLength(150)]],
        category: ['LANGUAGE', [Validators.required]],
        languageCode: ['', [Validators.maxLength(10)]],
        description: ['', [Validators.maxLength(1000)]],
        colorHex: [OPTION_COLORS[0]]
    });
    offeringForm = this.fb.nonNullable.group({
        capacity: [30, [Validators.required, Validators.min(1), Validators.max(500)]],
        weeklyHours: [2, [Validators.required, Validators.min(0.25)]],
        choiceStartDate: [''],
        choiceEndDate: ['']
    });
    assignForm = this.fb.nonNullable.group({
        offeringId: ['', [Validators.required]],
        studentId: ['', [Validators.required]],
        priority: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
        notes: ['', [Validators.maxLength(1000)]],
        confirmImmediately: [true]
    });
    // ------------------------------------------------------------------ aide
    help = {
        CATALOGUE: {
            step: 1,
            title: 'Une option existe une fois pour tout l\'établissement',
            description: "Le latin, l'espagnol ou la chorale se déclarent ici une seule "
                + 'fois. Ce qui change d\'un niveau à l\'autre, c\'est la capacité, le volume '
                + 'horaire et la période de choix — cela se règle dans l\'onglet suivant.',
            points: [
                'Une langue vivante porte son code ISO : c\'est lui qui permettra plus tard '
                    + 'de distinguer une LV1 d\'une LV2 dans les bulletins et les emplois du temps.',
                'Une option déjà choisie par des élèves ne s\'archive pas. Ils se '
                    + 'retrouveraient sans enseignement, sans que rien ne le signale.',
                'La couleur n\'est pas décorative : c\'est elle qui rend une option '
                    + 'reconnaissable dans l\'emploi du temps et dans les listes de vœux.'
            ],
            ctaLabel: 'Voir le catalogue'
        },
        NIVEAUX: {
            step: 2,
            title: 'Une option s\'ouvre niveau par niveau, avec une capacité',
            description: 'Cocher les niveaux ouvre l\'option pour chacun d\'eux avec la même '
                + 'capacité et le même horaire. C\'est un remplacement : un niveau décoché '
                + 'ferme son offre.',
            points: [
                'La capacité n\'est pas indicative. Au-delà, un vœu n\'est pas refusé : il '
                    + 'passe en liste d\'attente, et une annulation libère une place pour le '
                    + 'premier de la liste.',
                'La capacité ne peut pas descendre en dessous des places déjà confirmées : '
                    + 'des élèves se retrouveraient inscrits à un cours qui ne peut pas les '
                    + 'accueillir.',
                'La fenêtre de choix borne la campagne. Hors de ces dates, les familles ne '
                    + 'saisissent plus, et l\'établissement peut arbitrer sur une liste stable.'
            ],
            ctaLabel: 'Ouvrir les niveaux'
        },
        VOEUX: {
            step: 3,
            title: 'Les vœux se traitent par ordre d\'arrivée et de priorité',
            description: 'Chaque élève classe ses vœux. L\'écran remonte d\'abord ce qui '
                + 'attend une décision, puis la liste d\'attente, puis ce qui est réglé.',
            points: [
                'Un élève ne peut choisir qu\'une option ouverte à son propre niveau : '
                    + 'ailleurs, elle ne tomberait sur aucune heure de son emploi du temps.',
                'Confirmer au-delà de la capacité est refusé. C\'est le seul geste que '
                    + 'l\'écran empêche, parce qu\'il crée un effectif que la salle ne peut pas '
                    + 'contenir.',
                'Annuler une place confirmée la rend immédiatement disponible. C\'est ce qui '
                    + 'donne un sens à la liste d\'attente.'
            ],
            ctaLabel: 'Traiter les vœux'
        }
    };
    helpCopy = computed(() => this.help[this.tab()]);
    // --------------------------------------------------------------- cycle
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.overview()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (overview) => {
                this.overview.set(overview);
                this.loading.set(false);
                if (this.tab() === 'VOEUX') {
                    this.loadChoices();
                }
            },
            error: (err) => {
                this.loading.set(false);
                this.error.set(true);
                this.explain(err);
            }
        });
    }
    loadChoices() {
        this.dataSource.choices({
            levelId: this.levelFilter() || undefined,
            status: this.statusFilter() || undefined,
            search: this.search() || undefined,
            page: 0,
            size: 100
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (page) => {
                this.choices.set(page.content);
                this.choiceTotal.set(page.totalElements);
            },
            error: (err) => this.explain(err)
        });
    }
    changeTab(tab) {
        this.tab.set(tab);
        this.closeForm();
        this.closeOfferings();
        this.assignOpen.set(false);
        if (tab === 'VOEUX') {
            this.loadChoices();
        }
    }
    changeLevelFilter(levelId) {
        this.levelFilter.set(levelId);
        this.loadChoices();
    }
    changeStatusFilter(status) {
        this.statusFilter.set(status);
        this.loadChoices();
    }
    changeSearch(term) {
        this.search.set(term);
        this.loadChoices();
    }
    // ------------------------------------------------------------- les vues
    options = computed(() => this.overview()?.options ?? []);
    levels = computed(() => this.overview()?.levels ?? []);
    /** Toutes les offres, à plat : c'est ce que remplit la liste de choix. */
    allOfferings = computed(() => this.options().flatMap((option) => option.offerings));
    /** Les offres pleines : la liste d'attente commence là. */
    fullOfferings = computed(() => this.allOfferings().filter((offering) => offering.availableSeats === 0));
    /** Ce que propose un niveau donné, pour la grille de l'onglet Niveaux. */
    offeringAt(option, levelId) {
        return option.offerings.find((offering) => offering.levelId === levelId);
    }
    optionOf(offeringId) {
        return this.options().find((option) => option.offerings.some((offering) => offering.id === offeringId));
    }
    stateOf(status) {
        return this.states.find((state) => state.code === status) ?? this.states[0];
    }
    /** Taux de remplissage, pour la barre de la grille. */
    fillOf(offering) {
        return offering.capacity > 0
            ? Math.min(100, Math.round((offering.confirmedCount * 100) / offering.capacity))
            : 0;
    }
    // --------------------------------------------------------- le catalogue
    openForm(option) {
        this.editing.set(option ?? null);
        this.optionForm.reset({
            code: option?.code ?? '',
            name: option?.name ?? '',
            category: option?.category ?? 'LANGUAGE',
            languageCode: option?.languageCode ?? '',
            description: option?.description ?? '',
            colorHex: option?.colorHex ?? OPTION_COLORS[0]
        });
        this.formOpen.set(true);
    }
    closeForm() {
        this.formOpen.set(false);
        this.editing.set(null);
    }
    pickColor(color) {
        this.optionForm.patchValue({ colorHex: color });
    }
    submitForm() {
        if (this.optionForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.optionForm.getRawValue();
        const payload = {
            code: value.code.trim().toUpperCase(),
            name: value.name.trim(),
            category: value.category,
            languageCode: value.languageCode.trim() || undefined,
            description: value.description.trim() || undefined,
            colorHex: value.colorHex
        };
        const option = this.editing();
        const request = option
            ? this.dataSource.update(option.id, payload)
            : this.dataSource.create(payload);
        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (overview) => {
                this.overview.set(overview);
                this.saving.set(false);
                this.closeForm();
                this.notifications.success(option
                    ? `${payload.name} est à jour.`
                    : `${payload.name} est au catalogue. Ouvrez-la sur les niveaux concernés.`, option ? 'Option modifiée' : 'Option créée');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    archive(option) {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.archive(option.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (overview) => {
                this.overview.set(overview);
                this.saving.set(false);
                this.notifications.success(`${option.name} n'apparaît plus dans les listes de choix.`, 'Option archivée');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ----------------------------------------------------------- les niveaux
    openOfferings(option) {
        this.offeringFor.set(option);
        this.selectedLevels.set(option.offerings.map((offering) => offering.levelId));
        const reference = option.offerings[0];
        this.offeringForm.reset({
            capacity: reference?.capacity ?? 30,
            weeklyHours: reference?.weeklyHours ?? 2,
            choiceStartDate: reference?.choiceStartDate ?? '',
            choiceEndDate: reference?.choiceEndDate ?? ''
        });
    }
    closeOfferings() {
        this.offeringFor.set(null);
    }
    toggleLevel(levelId) {
        this.selectedLevels.update((list) => list.includes(levelId)
            ? list.filter((id) => id !== levelId)
            : [...list, levelId]);
    }
    isSelected(levelId) {
        return this.selectedLevels().includes(levelId);
    }
    /** Ce qu'un décochage fermerait : l'écran le dit avant d'enregistrer. */
    closingLevels = computed(() => {
        const option = this.offeringFor();
        if (!option) {
            return [];
        }
        return option.offerings.filter((offering) => !this.selectedLevels().includes(offering.levelId));
    });
    submitOfferings() {
        const option = this.offeringFor();
        if (!option || this.offeringForm.invalid || this.saving()) {
            return;
        }
        if (this.selectedLevels().length === 0) {
            this.notifications.error('Choisissez au moins un niveau : une option ouverte nulle part ne peut être '
                + 'choisie par personne.', 'Aucun niveau');
            return;
        }
        this.saving.set(true);
        const value = this.offeringForm.getRawValue();
        this.dataSource.saveOfferings(option.id, {
            levelIds: this.selectedLevels(),
            capacity: value.capacity,
            weeklyHours: value.weeklyHours,
            choiceStartDate: value.choiceStartDate || undefined,
            choiceEndDate: value.choiceEndDate || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (overview) => {
                this.overview.set(overview);
                this.saving.set(false);
                this.closeOfferings();
                this.notifications.success(`${option.name} est ouverte sur ${this.selectedLevels().length} niveau(x), `
                    + `${value.capacity} places chacun.`, 'Niveaux enregistrés');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ------------------------------------------------------------- les vœux
    openAssign(offering) {
        this.assignForm.reset({
            offeringId: offering?.id ?? '',
            studentId: '',
            priority: 1,
            notes: '',
            confirmImmediately: true
        });
        this.candidates.set([]);
        this.assignOpen.set(true);
        if (offering) {
            this.loadCandidates(offering.id);
        }
    }
    closeAssign() {
        this.assignOpen.set(false);
    }
    /** Ne propose que les élèves du niveau où l'option est ouverte. */
    onOfferingChosen(offeringId) {
        this.assignForm.patchValue({ offeringId, studentId: '' });
        this.loadCandidates(offeringId);
    }
    loadCandidates(offeringId) {
        const offering = this.allOfferings().find((row) => row.id === offeringId);
        if (!offering) {
            this.candidates.set([]);
            return;
        }
        this.students.search({ page: 0, size: 500 })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (page) => this.candidates.set(page.content.filter((student) => student.levelName === offering.levelName)),
            error: () => this.candidates.set([])
        });
    }
    /** L'offre visée par le formulaire, pour afficher les places restantes. */
    assignTarget = computed(() => {
        const id = this.assignForm.controls.offeringId.value;
        return this.allOfferings().find((offering) => offering.id === id);
    });
    submitAssign() {
        if (this.assignForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.assignForm.getRawValue();
        this.dataSource.assign({
            studentId: value.studentId,
            offeringId: value.offeringId,
            priority: value.priority,
            notes: value.notes.trim() || undefined,
            confirmImmediately: value.confirmImmediately
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (choice) => {
                this.saving.set(false);
                this.closeAssign();
                this.load();
                this.notifications.success(choice.status === 'WAITLISTED'
                    ? `${choice.studentName} est sur la liste d'attente de ${choice.optionName} : `
                        + 'la classe est complète. Une annulation lui rendra la place.'
                    : `${choice.studentName} est inscrit en ${choice.optionName}.`, choice.statusLabel);
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    changeStatus(choice, status) {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.changeChoiceStatus(choice.id, status)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (saved) => {
                this.saving.set(false);
                this.load();
                this.notifications.success(status === 'CANCELLED'
                    ? `${saved.studentName} est retiré de ${saved.optionName}. La place est `
                        + 'de nouveau disponible.'
                    : `${saved.studentName} — ${saved.optionName} : ${saved.statusLabel.toLowerCase()}.`, 'Vœu mis à jour');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ------------------------------------------------------------- affichage
    categoryHint(category) {
        return this.categories.find((item) => item.code === category)?.hint ?? '';
    }
    formatDate(iso) {
        if (!iso) {
            return '';
        }
        return new Date(`${iso}T00:00:00`)
            .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
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
    static ɵfac = function OptionsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OptionsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OptionsComponent, selectors: [["eduops-options"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 25, vars: 23, consts: [[1, "page"], ["flow", "options", "eyebrow", "Conseil pour cet onglet", 3, "stepKey", "stepNumber", "totalSteps", "title", "description", "points", "ctaLabel"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--primary"], ["role", "tablist", 1, "tabs"], ["type", "button", "role", "tab", 1, "tabs__item", 3, "click"], ["message", "Chargement des options..."], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], [1, "tabs__badge", "numeric"], [3, "retry"], ["role", "status", 1, "alert-block"], [1, "alert-block__head"], ["aria-hidden", "true", 1, "alert-block__icon"], [1, "alert-block__title"], [1, "alert-block__text"], [1, "pending"], [1, "pending__item"], [1, "pending__name"], [1, "pending__cycle", "numeric"], [1, "lead"], ["type", "button", 1, "linklike", 3, "click"], [1, "grid", "grid--3"], [1, "option", "card", 3, "--option-color"], [1, "empty-state"], [1, "option", "card"], [1, "option__head"], [1, "option__title"], [1, "option__name"], [1, "option__meta", "numeric"], [1, "pill", "pill--warn", "numeric"], [1, "option__body"], [1, "option__note"], [1, "option__usage", "numeric"], [1, "option__usage", "option__usage--none"], [1, "option__footer"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], [1, "empty-state__title"], [1, "empty-state__text"], [1, "table-wrapper", "card"], [1, "table", "matrix"], [1, "visually-hidden"], ["scope", "col"], ["scope", "col", 1, "numeric"], ["scope", "col", 1, "cell-actions"], ["scope", "row", 1, "matrix__option"], ["aria-hidden", "true", 1, "matrix__swatch"], [1, "matrix__name"], [1, "matrix__code", "numeric"], [1, "numeric", "matrix__cell"], [1, "cell-actions"], ["aria-label", "Non propos\u00E9e", 1, "matrix__closed"], [1, "matrix__seats"], ["aria-hidden", "true", 1, "matrix__bar"], [1, "matrix__fill"], [1, "matrix__wait"], [1, "filters"], [1, "filters__select"], [1, "input", 3, "change", "value"], ["value", ""], [3, "value"], [1, "filters__search"], ["type", "search", "placeholder", "Nom ou matricule", 1, "input", 3, "change", "value"], [1, "table"], [3, "row--wait"], [1, "entry__name"], [1, "entry__number", "numeric"], [1, "chip-option"], [1, "numeric"], [1, "state"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "disabled"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "disabled"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click", "disabled"], ["colspan", "6"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "option-form-title", 1, "drawer"], [1, "drawer__head"], ["id", "option-form-title", 1, "drawer__title"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "drawer__body", 3, "ngSubmit", "formGroup"], [1, "grid2"], [1, "field"], ["for", "option-code", 1, "field__label", "field__label--required"], ["id", "option-code", "formControlName", "code", "placeholder", "ESP-LV2", 1, "input"], ["for", "option-cat", 1, "field__label", "field__label--required"], ["id", "option-cat", "formControlName", "category", 1, "input"], [1, "field__hint"], ["for", "option-name", 1, "field__label", "field__label--required"], ["id", "option-name", "formControlName", "name", "placeholder", "Espagnol LV2", 1, "input"], ["for", "option-desc", 1, "field__label"], ["id", "option-desc", "rows", "2", "formControlName", "description", "placeholder", "Deuxi\u00E8me langue vivante, \u00E0 partir de la 4e.", 1, "textarea"], [1, "field__label"], [1, "swatches"], ["type", "button", 1, "swatch", 3, "swatch--on", "background"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["for", "option-lang", 1, "field__label"], ["id", "option-lang", "formControlName", "languageCode", "placeholder", "es", 1, "input"], ["type", "button", 1, "swatch", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "offering-title", 1, "drawer"], ["id", "offering-title", 1, "drawer__title"], [1, "drawer__meta", "numeric"], [1, "hint-block"], [1, "field__label", "field__label--required"], [1, "levels"], [1, "levels__item"], [1, "hint-block", "hint-block--warn"], ["for", "off-capacity", 1, "field__label", "field__label--required"], ["id", "off-capacity", "type", "number", "formControlName", "capacity", "min", "1", "max", "500", "step", "1", 1, "input"], ["for", "off-hours", 1, "field__label", "field__label--required"], ["id", "off-hours", "type", "number", "formControlName", "weeklyHours", "min", "0.25", "step", "0.25", 1, "input"], ["for", "off-start", 1, "field__label"], ["id", "off-start", "type", "date", "formControlName", "choiceStartDate", 1, "input"], ["for", "off-end", 1, "field__label"], ["id", "off-end", "type", "date", "formControlName", "choiceEndDate", 1, "input"], [1, "levels__check"], ["type", "checkbox", 3, "change", "checked"], [1, "levels__state", "numeric"], [1, "levels__state", "levels__state--none"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "assign-title", 1, "drawer"], ["id", "assign-title", 1, "drawer__title"], ["for", "assign-offering", 1, "field__label", "field__label--required"], ["id", "assign-offering", "formControlName", "offeringId", 1, "input", 3, "change"], ["for", "assign-student", 1, "field__label", "field__label--required"], ["id", "assign-student", "formControlName", "studentId", 1, "input"], ["for", "assign-priority", 1, "field__label", "field__label--required"], ["id", "assign-priority", "type", "number", "formControlName", "priority", "min", "1", "max", "10", "step", "1", 1, "input"], ["for", "assign-notes", 1, "field__label"], ["id", "assign-notes", "rows", "2", "formControlName", "notes", 1, "textarea"], [1, "switch"], ["type", "checkbox", "formControlName", "confirmImmediately"], [1, "field__hint", "field__hint--warn"]], template: function OptionsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "eduops-step-coachmark", 1);
            i0.ɵɵelementStart(2, "header", 2)(3, "div")(4, "h1", 3);
            i0.ɵɵtext(5, "Options et langues");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 4);
            i0.ɵɵtemplate(7, OptionsComponent_Conditional_7_Template, 2, 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 5);
            i0.ɵɵtemplate(9, OptionsComponent_Conditional_9_Template, 4, 0, "button", 6)(10, OptionsComponent_Conditional_10_Template, 4, 0, "button", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "nav", 7)(12, "button", 8);
            i0.ɵɵlistener("click", function OptionsComponent_Template_button_click_12_listener() { return ctx.changeTab("CATALOGUE"); });
            i0.ɵɵtext(13, " Catalogue ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "button", 8);
            i0.ɵɵlistener("click", function OptionsComponent_Template_button_click_14_listener() { return ctx.changeTab("NIVEAUX"); });
            i0.ɵɵtext(15, " Ouverture par niveau ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "button", 8);
            i0.ɵɵlistener("click", function OptionsComponent_Template_button_click_16_listener() { return ctx.changeTab("VOEUX"); });
            i0.ɵɵtext(17, " V\u0153ux des \u00E9l\u00E8ves ");
            i0.ɵɵtemplate(18, OptionsComponent_Conditional_18_Template, 1, 1);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(19, OptionsComponent_Conditional_19_Template, 1, 0, "eduops-loading-state", 9)(20, OptionsComponent_Conditional_20_Template, 1, 0, "eduops-error-state")(21, OptionsComponent_Conditional_21_Template, 4, 4)(22, OptionsComponent_Conditional_22_Template, 43, 6)(23, OptionsComponent_Conditional_23_Template, 45, 6)(24, OptionsComponent_Conditional_24_Template, 48, 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_7_0;
            let tmp_15_0;
            let tmp_18_0;
            i0.ɵɵadvance();
            i0.ɵɵproperty("stepKey", ctx.tab())("stepNumber", ctx.helpCopy().step)("totalSteps", ctx.totalSteps)("title", ctx.helpCopy().title)("description", ctx.helpCopy().description)("points", ctx.helpCopy().points)("ctaLabel", ctx.helpCopy().ctaLabel);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional((tmp_7_0 = ctx.overview()) ? 7 : -1, tmp_7_0);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.tab() === "VOEUX" ? 9 : 10);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "CATALOGUE");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "CATALOGUE");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "NIVEAUX");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "NIVEAUX");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "VOEUX");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "VOEUX");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional((tmp_15_0 = ctx.overview()) ? 18 : -1, tmp_15_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 19 : ctx.error() ? 20 : 21);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.formOpen() ? 22 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_18_0 = ctx.offeringFor()) ? 23 : -1, tmp_18_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.assignOpen() ? 24 : -1);
        } }, dependencies: [CommonModule, FormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.MaxValidator, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName, LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent], styles: ["@import 'styles/tokens';\n\n.lead[_ngcontent-%COMP%] {\n  max-width: 68ch;\n  margin: 0 0 var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n}\n\n.linklike[_ngcontent-%COMP%] {\n  padding: 0;\n  font: inherit;\n  color: var(--brand);\n  background: none;\n  border: none;\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n\n\n\n.tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n.pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n}\n\n\n\n\n\n\n.state[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='todo'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='wait'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='done'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='off'] { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n\n\n\n.alert-block[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 22px;\n    height: 22px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-4) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n    flex-wrap: wrap;\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n\n.option[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  border-top: 3px solid var(--option-color, var(--brand));\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4);\n  }\n\n  &__title { min-width: 0; }\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__body {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-2);\n    padding: 0 var(--space-4) var(--space-3);\n  }\n\n  &__note { margin: 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__usage {\n    margin: 0;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n\n    &--none { font-style: italic; color: var(--warning); }\n  }\n\n  &__footer {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-3) var(--space-4);\n    border-top: 1px solid var(--border-light);\n    flex-wrap: wrap;\n  }\n}\n\n\n\n\n.table-wrapper[_ngcontent-%COMP%] { overflow-x: auto; }\n\n.matrix[_ngcontent-%COMP%] {\n  &__option {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    text-align: left;\n    font-weight: 400;\n  }\n\n  &__swatch {\n    flex: none;\n    width: 10px;\n    height: 22px;\n    border-radius: 3px;\n  }\n\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__code { display: block; font-size: var(--text-xs); color: var(--text-light); }\n\n  &__cell { min-width: 96px; }\n\n  &__seats {\n    display: block;\n    font-weight: 600;\n    color: var(--text-strong);\n\n    &--full { color: var(--warning); }\n  }\n\n  &__bar {\n    display: block;\n    height: 4px;\n    margin: 3px 0 0 auto;\n    width: 64px;\n    background: var(--surface-sunken);\n    border-radius: var(--radius-pill);\n    overflow: hidden;\n  }\n\n  &__fill {\n    display: block;\n    height: 100%;\n    background: var(--brand);\n    border-radius: var(--radius-pill);\n  }\n\n  &__wait {\n    display: block;\n    margin-top: 2px;\n    font-size: var(--text-xs);\n    color: var(--warning);\n  }\n\n  &__closed { color: var(--text-light); }\n}\n\n\n\n\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n\n  &__select .input,\n  &__search .input { width: auto; min-width: 180px; }\n}\n\n.cell-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-2);\n  justify-content: flex-end;\n  white-space: nowrap;\n}\n\n.row--wait[_ngcontent-%COMP%] { background: var(--warning-bg); }\n\n.entry[_ngcontent-%COMP%] {\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__number { display: block; font-size: var(--text-xs); color: var(--text-light); }\n}\n\n.chip-option[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  color: var(--text-strong);\n  border-left: 3px solid var(--option-color, var(--brand));\n  background: var(--surface-sunken);\n  border-radius: var(--radius-badge);\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__close {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n.grid2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  &--warn {\n    color: var(--warning);\n    background: var(--warning-bg);\n  }\n}\n\n.field__hint--warn[_ngcontent-%COMP%] { color: var(--warning); }\n\n.switch[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n  font-size: var(--text-sm);\n  cursor: pointer;\n\n  input { margin-top: 3px; }\n  small { display: block; margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.levels[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n  }\n\n  &__check {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    font-weight: 600;\n    color: var(--text-strong);\n    cursor: pointer;\n  }\n\n  &__state {\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n\n    &--none { font-style: italic; color: var(--text-light); }\n  }\n}\n\n.swatches[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n.swatch[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border: 2px solid transparent;\n  border-radius: var(--radius-badge);\n  cursor: pointer;\n\n  &--on {\n    border-color: var(--text-strong);\n    box-shadow: 0 0 0 2px var(--surface-card) inset;\n  }\n}\n\n@include mobile {\n  .drawer { width: 100vw; }\n  .option__footer { flex-wrap: wrap; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OptionsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-options', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule,
                    LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n\n  <!-- L'aide de la configuration, appliqu\u00E9e telle quelle : une carte au premier\n       passage sur l'onglet, un bouton \u00AB ? Aide \u00BB pour la revoir ensuite. -->\n  <eduops-step-coachmark\n    flow=\"options\"\n    [stepKey]=\"tab()\"\n    [stepNumber]=\"helpCopy().step\"\n    [totalSteps]=\"totalSteps\"\n    eyebrow=\"Conseil pour cet onglet\"\n    [title]=\"helpCopy().title\"\n    [description]=\"helpCopy().description\"\n    [points]=\"helpCopy().points\"\n    [ctaLabel]=\"helpCopy().ctaLabel\" />\n\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Options et langues</h1>\n      <p class=\"page__meta numeric\">\n        @if (overview(); as o) {\n          {{ o.activeOptionCount }} option(s) \u00B7 {{ o.offeringCount }} ouverture(s) de niveau\n          \u00B7 {{ o.confirmedCount }} place(s) confirm\u00E9e(s) sur {{ o.totalCapacity }}\n          @if (o.waitlistedCount > 0) {\n            \u00B7 {{ o.waitlistedCount }} en attente\n          }\n        }\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      @if (tab() === 'VOEUX') {\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openAssign()\">\n          <span aria-hidden=\"true\">+</span> Inscrire un \u00E9l\u00E8ve\n        </button>\n      } @else {\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openForm()\">\n          <span aria-hidden=\"true\">+</span> Nouvelle option\n        </button>\n      }\n    </div>\n  </header>\n\n  <nav class=\"tabs\" role=\"tablist\">\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'CATALOGUE'\"\n            [attr.aria-selected]=\"tab() === 'CATALOGUE'\"\n            (click)=\"changeTab('CATALOGUE')\">\n      Catalogue\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'NIVEAUX'\"\n            [attr.aria-selected]=\"tab() === 'NIVEAUX'\"\n            (click)=\"changeTab('NIVEAUX')\">\n      Ouverture par niveau\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'VOEUX'\"\n            [attr.aria-selected]=\"tab() === 'VOEUX'\"\n            (click)=\"changeTab('VOEUX')\">\n      V\u0153ux des \u00E9l\u00E8ves\n      @if (overview(); as o) {\n        @if (o.waitlistedCount > 0) {\n          <span class=\"tabs__badge numeric\">{{ o.waitlistedCount }}</span>\n        }\n      }\n    </button>\n  </nav>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des options...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n\n    @if (fullOfferings().length > 0) {\n      <section class=\"alert-block\" role=\"status\">\n        <div class=\"alert-block__head\">\n          <span class=\"alert-block__icon\" aria-hidden=\"true\">!</span>\n          <div>\n            <p class=\"alert-block__title\">\n              {{ fullOfferings().length }} ouverture(s) au complet\n            </p>\n            <p class=\"alert-block__text\">\n              Les v\u0153ux qui arrivent sur ces groupes passent en liste d'attente.\n              Augmenter la capacit\u00E9, ou ouvrir un second groupe, lib\u00E8re la file.\n            </p>\n          </div>\n        </div>\n        <ul class=\"pending\">\n          @for (offering of fullOfferings(); track offering.id) {\n            <li class=\"pending__item\">\n              <span class=\"pending__name\">\n                {{ optionOf(offering.id)?.name }} \u2014 {{ offering.levelName }}\n              </span>\n              <span class=\"pending__cycle numeric\">\n                {{ offering.confirmedCount }}/{{ offering.capacity }} places \u00B7\n                {{ offering.waitlistedCount }} en attente\n              </span>\n            </li>\n          }\n        </ul>\n      </section>\n    }\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Catalogue \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (tab() === 'CATALOGUE') {\n      <p class=\"lead\">\n        Une option existe une seule fois pour tout l'\u00E9tablissement. Ce qui change\n        d'un niveau \u00E0 l'autre \u2014 capacit\u00E9, horaire, p\u00E9riode de choix \u2014 se r\u00E8gle dans\n        <button type=\"button\" class=\"linklike\" (click)=\"changeTab('NIVEAUX')\">\n          Ouverture par niveau</button>.\n      </p>\n\n      <section class=\"grid grid--3\">\n        @for (option of options(); track option.id) {\n          <article class=\"option card\"\n                   [style.--option-color]=\"option.colorHex || 'var(--brand)'\">\n            <header class=\"option__head\">\n              <div class=\"option__title\">\n                <h2 class=\"option__name\">{{ option.name }}</h2>\n                <p class=\"option__meta numeric\">\n                  {{ option.code }} \u00B7 {{ option.categoryLabel }}\n                  @if (option.languageCode) { \u00B7 {{ option.languageCode }} }\n                </p>\n              </div>\n              @if (option.waitlistedCount > 0) {\n                <span class=\"pill pill--warn numeric\">\n                  {{ option.waitlistedCount }} en attente\n                </span>\n              }\n            </header>\n\n            <div class=\"option__body\">\n              @if (option.description) {\n                <p class=\"option__note\">{{ option.description }}</p>\n              }\n              @if (option.levelCount > 0) {\n                <p class=\"option__usage numeric\">\n                  Ouverte sur <strong>{{ option.levelCount }}</strong> niveau(x) \u00B7\n                  <strong>{{ option.confirmedCount }}</strong> / {{ option.totalCapacity }}\n                  place(s) prise(s)\n                </p>\n              } @else {\n                <p class=\"option__usage option__usage--none\">\n                  Ouverte sur aucun niveau : personne ne peut la choisir.\n                </p>\n              }\n            </div>\n\n            <footer class=\"option__footer\">\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                      (click)=\"openForm(option)\">Modifier</button>\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                      [disabled]=\"saving() || option.confirmedCount > 0\n                        || option.requestedCount > 0 || option.waitlistedCount > 0\"\n                      [attr.title]=\"option.confirmedCount > 0\n                        ? 'Des \u00E9l\u00E8ves l\\'ont choisie' : null\"\n                      (click)=\"archive(option)\">Archiver</button>\n              <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                      (click)=\"openOfferings(option)\">Niveaux</button>\n            </footer>\n          </article>\n        } @empty {\n          <div class=\"empty-state\">\n            <p class=\"empty-state__title\">Aucune option d\u00E9clar\u00E9e.</p>\n            <p class=\"empty-state__text\">\n              Commencez par les langues vivantes : ce sont les seuls choix que tous\n              les \u00E9l\u00E8ves doivent faire. Le reste \u2014 latin, musique, informatique \u2014\n              vient ensuite.\n            </p>\n            <button type=\"button\" class=\"btn btn--primary\" (click)=\"openForm()\">\n              D\u00E9clarer une option\n            </button>\n          </div>\n        }\n      </section>\n    }\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Ouverture par niveau \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (tab() === 'NIVEAUX') {\n      <p class=\"lead\">\n        Chaque case dit ce qui est ouvert, avec les places prises sur les places\n        offertes. Une case vide veut dire que l'option n'est pas propos\u00E9e \u00E0 ce\n        niveau : aucun \u00E9l\u00E8ve ne peut la demander.\n      </p>\n\n      <div class=\"table-wrapper card\">\n        <table class=\"table matrix\">\n          <caption class=\"visually-hidden\">Options ouvertes par niveau</caption>\n          <thead>\n            <tr>\n              <th scope=\"col\">Option</th>\n              @for (level of levels(); track level.id) {\n                <th scope=\"col\" class=\"numeric\">{{ level.name }}</th>\n              }\n              <th scope=\"col\" class=\"cell-actions\">Action</th>\n            </tr>\n          </thead>\n          <tbody>\n            @for (option of options(); track option.id) {\n              <tr>\n                <th scope=\"row\" class=\"matrix__option\">\n                  <span class=\"matrix__swatch\"\n                        [style.background]=\"option.colorHex || 'var(--brand)'\"\n                        aria-hidden=\"true\"></span>\n                  <span>\n                    <span class=\"matrix__name\">{{ option.name }}</span>\n                    <span class=\"matrix__code numeric\">{{ option.code }}</span>\n                  </span>\n                </th>\n                @for (level of levels(); track level.id) {\n                  <td class=\"numeric matrix__cell\">\n                    @if (offeringAt(option, level.id); as offering) {\n                      <span class=\"matrix__seats\"\n                            [class.matrix__seats--full]=\"offering.availableSeats === 0\">\n                        {{ offering.confirmedCount }}/{{ offering.capacity }}\n                      </span>\n                      <span class=\"matrix__bar\" aria-hidden=\"true\">\n                        <span class=\"matrix__fill\" [style.width.%]=\"fillOf(offering)\"></span>\n                      </span>\n                      @if (offering.waitlistedCount > 0) {\n                        <span class=\"matrix__wait\">{{ offering.waitlistedCount }} en attente</span>\n                      }\n                    } @else {\n                      <span class=\"matrix__closed\" aria-label=\"Non propos\u00E9e\">\u2014</span>\n                    }\n                  </td>\n                }\n                <td class=\"cell-actions\">\n                  <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                          (click)=\"openOfferings(option)\">R\u00E9gler</button>\n                </td>\n              </tr>\n            } @empty {\n              <tr>\n                <td [attr.colspan]=\"levels().length + 2\">\n                  <div class=\"empty-state\">\n                    <p class=\"empty-state__title\">Aucune option au catalogue.</p>\n                    <p class=\"empty-state__text\">\n                      D\u00E9clarez d'abord une option, puis revenez l'ouvrir sur les\n                      niveaux concern\u00E9s.\n                    </p>\n                  </div>\n                </td>\n              </tr>\n            }\n          </tbody>\n        </table>\n      </div>\n    }\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 V\u0153ux des \u00E9l\u00E8ves \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (tab() === 'VOEUX') {\n      <section class=\"filters\">\n        <label class=\"filters__select\">\n          <span class=\"visually-hidden\">Filtrer par niveau</span>\n          <select class=\"input\" [value]=\"levelFilter()\"\n                  (change)=\"changeLevelFilter($any($event.target).value)\">\n            <option value=\"\">Tous les niveaux</option>\n            @for (level of levels(); track level.id) {\n              <option [value]=\"level.id\">{{ level.name }}</option>\n            }\n          </select>\n        </label>\n        <label class=\"filters__select\">\n          <span class=\"visually-hidden\">Filtrer par \u00E9tat</span>\n          <select class=\"input\" [value]=\"statusFilter()\"\n                  (change)=\"changeStatusFilter($any($event.target).value)\">\n            <option value=\"\">Tous les \u00E9tats</option>\n            @for (state of states; track state.code) {\n              <option [value]=\"state.code\">{{ state.label }}</option>\n            }\n          </select>\n        </label>\n        <label class=\"filters__search\">\n          <span class=\"visually-hidden\">Rechercher un \u00E9l\u00E8ve</span>\n          <input type=\"search\" class=\"input\" placeholder=\"Nom ou matricule\"\n                 [value]=\"search()\"\n                 (change)=\"changeSearch($any($event.target).value)\" />\n        </label>\n      </section>\n\n      <div class=\"table-wrapper card\">\n        <table class=\"table\">\n          <caption class=\"visually-hidden\">V\u0153ux d'options des \u00E9l\u00E8ves</caption>\n          <thead>\n            <tr>\n              <th scope=\"col\">\u00C9l\u00E8ve</th>\n              <th scope=\"col\">Option</th>\n              <th scope=\"col\">Niveau</th>\n              <th scope=\"col\" class=\"numeric\">Priorit\u00E9</th>\n              <th scope=\"col\">\u00C9tat</th>\n              <th scope=\"col\" class=\"cell-actions\">Action</th>\n            </tr>\n          </thead>\n          <tbody>\n            @for (choice of choices(); track choice.id) {\n              <tr [class.row--wait]=\"choice.status === 'WAITLISTED'\">\n                <td>\n                  <span class=\"entry__name\">{{ choice.studentName }}</span>\n                  <span class=\"entry__number numeric\">\n                    {{ choice.studentNumber }} \u00B7 {{ choice.classroomName }}\n                  </span>\n                </td>\n                <td>\n                  <span class=\"chip-option\"\n                        [style.--option-color]=\"choice.optionColor || 'var(--brand)'\">\n                    {{ choice.optionName }}\n                  </span>\n                </td>\n                <td>{{ choice.levelName }}</td>\n                <td class=\"numeric\">{{ choice.priority }}</td>\n                <td>\n                  <span class=\"state\" [attr.data-tone]=\"stateOf(choice.status).tone\"\n                        [attr.title]=\"stateOf(choice.status).hint\">\n                    {{ choice.statusLabel }}\n                  </span>\n                </td>\n                <td class=\"cell-actions\">\n                  @if (choice.status !== 'CONFIRMED') {\n                    <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                            [disabled]=\"saving()\"\n                            (click)=\"changeStatus(choice, 'CONFIRMED')\">Confirmer</button>\n                  }\n                  @if (choice.status === 'REQUESTED') {\n                    <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                            [disabled]=\"saving()\"\n                            (click)=\"changeStatus(choice, 'WAITLISTED')\">Mettre en attente</button>\n                  }\n                  @if (choice.status !== 'CANCELLED') {\n                    <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                            [disabled]=\"saving()\"\n                            (click)=\"changeStatus(choice, 'CANCELLED')\">Retirer</button>\n                  }\n                </td>\n              </tr>\n            } @empty {\n              <tr>\n                <td colspan=\"6\">\n                  <div class=\"empty-state\">\n                    <p class=\"empty-state__title\">Aucun v\u0153u sur ce filtre.</p>\n                    <p class=\"empty-state__text\">\n                      Les v\u0153ux arrivent du portail des familles, ou s'inscrivent ici\n                      pendant la campagne de choix.\n                    </p>\n                  </div>\n                </td>\n              </tr>\n            }\n          </tbody>\n        </table>\n      </div>\n    }\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Formulaire d'option \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (formOpen()) {\n    <div class=\"drawer-backdrop\" (click)=\"closeForm()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"option-form-title\">\n      <header class=\"drawer__head\">\n        <h2 class=\"drawer__title\" id=\"option-form-title\">\n          {{ editing() ? 'Modifier l\\'option' : 'Nouvelle option' }}\n        </h2>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeForm()\">\u00D7</button>\n      </header>\n\n      <form class=\"drawer__body\" [formGroup]=\"optionForm\" (ngSubmit)=\"submitForm()\">\n        <div class=\"grid2\">\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"option-code\">Code</label>\n            <input id=\"option-code\" class=\"input\" formControlName=\"code\"\n                   placeholder=\"ESP-LV2\" />\n          </div>\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"option-cat\">Famille</label>\n            <select id=\"option-cat\" class=\"input\" formControlName=\"category\">\n              @for (category of categories; track category.code) {\n                <option [value]=\"category.code\">{{ category.label }}</option>\n              }\n            </select>\n            <span class=\"field__hint\">\n              {{ categoryHint(optionForm.controls.category.value) }}\n            </span>\n          </div>\n        </div>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"option-name\">Intitul\u00E9</label>\n          <input id=\"option-name\" class=\"input\" formControlName=\"name\"\n                 placeholder=\"Espagnol LV2\" />\n        </div>\n\n        @if (optionForm.controls.category.value === 'LANGUAGE') {\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"option-lang\">Code de la langue</label>\n            <input id=\"option-lang\" class=\"input\" formControlName=\"languageCode\"\n                   placeholder=\"es\" />\n            <span class=\"field__hint\">\n              Code ISO \u00E0 deux lettres : es, de, en. C'est lui qui distinguera une LV1\n              d'une LV2 dans les bulletins.\n            </span>\n          </div>\n        }\n\n        <div class=\"field\">\n          <label class=\"field__label\" for=\"option-desc\">Description</label>\n          <textarea id=\"option-desc\" class=\"textarea\" rows=\"2\"\n                    formControlName=\"description\"\n                    placeholder=\"Deuxi\u00E8me langue vivante, \u00E0 partir de la 4e.\"></textarea>\n        </div>\n\n        <div class=\"field\">\n          <span class=\"field__label\">Couleur</span>\n          <div class=\"swatches\">\n            @for (color of colors; track color) {\n              <button type=\"button\" class=\"swatch\"\n                      [class.swatch--on]=\"optionForm.controls.colorHex.value === color\"\n                      [style.background]=\"color\"\n                      [attr.aria-label]=\"'Couleur ' + color\"\n                      (click)=\"pickColor(color)\"></button>\n            }\n          </div>\n          <span class=\"field__hint\">\n            Elle rend l'option reconnaissable dans l'emploi du temps et les listes.\n          </span>\n        </div>\n      </form>\n\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeForm()\">Annuler</button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"optionForm.invalid || saving()\"\n                (click)=\"submitForm()\">\n          {{ editing() ? 'Enregistrer' : 'Cr\u00E9er' }}\n        </button>\n      </footer>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Ouverture sur les niveaux \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (offeringFor(); as option) {\n    <div class=\"drawer-backdrop\" (click)=\"closeOfferings()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"offering-title\">\n      <header class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"offering-title\">{{ option.name }}</h2>\n          <p class=\"drawer__meta numeric\">{{ option.code }} \u00B7 {{ option.categoryLabel }}</p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeOfferings()\">\u00D7</button>\n      </header>\n\n      <form class=\"drawer__body\" [formGroup]=\"offeringForm\" (ngSubmit)=\"submitOfferings()\">\n        <p class=\"hint-block\">\n          Cocher un niveau ouvre l'option avec la capacit\u00E9 et l'horaire ci-dessous.\n          C'est un remplacement : un niveau d\u00E9coch\u00E9 ferme son offre.\n        </p>\n\n        <div class=\"field\">\n          <span class=\"field__label field__label--required\">Niveaux</span>\n          <ul class=\"levels\">\n            @for (level of levels(); track level.id) {\n              <li class=\"levels__item\">\n                <label class=\"levels__check\">\n                  <input type=\"checkbox\" [checked]=\"isSelected(level.id)\"\n                         (change)=\"toggleLevel(level.id)\" />\n                  <span>{{ level.name }}</span>\n                </label>\n                @if (offeringAt(option, level.id); as offering) {\n                  <span class=\"levels__state numeric\">\n                    {{ offering.confirmedCount }}/{{ offering.capacity }} places\n                    @if (offering.waitlistedCount > 0) {\n                      \u00B7 {{ offering.waitlistedCount }} en attente\n                    }\n                  </span>\n                } @else {\n                  <span class=\"levels__state levels__state--none\">Non ouverte</span>\n                }\n              </li>\n            }\n          </ul>\n        </div>\n\n        @if (closingLevels().length > 0) {\n          <p class=\"hint-block hint-block--warn\">\n            {{ closingLevels().length }} niveau(x) seront ferm\u00E9s \u00E0 l'enregistrement.\n            Un niveau portant des v\u0153ux ne peut pas \u00EAtre ferm\u00E9 : retirez d'abord les\n            \u00E9l\u00E8ves concern\u00E9s.\n          </p>\n        }\n\n        <div class=\"grid2\">\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"off-capacity\">\n              Places par niveau\n            </label>\n            <input id=\"off-capacity\" type=\"number\" class=\"input\" formControlName=\"capacity\"\n                   min=\"1\" max=\"500\" step=\"1\" />\n            <span class=\"field__hint\">\n              Au-del\u00E0, un v\u0153u passe en liste d'attente plut\u00F4t que d'\u00EAtre refus\u00E9.\n            </span>\n          </div>\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"off-hours\">\n              Heures par semaine\n            </label>\n            <input id=\"off-hours\" type=\"number\" class=\"input\" formControlName=\"weeklyHours\"\n                   min=\"0.25\" step=\"0.25\" />\n          </div>\n        </div>\n\n        <div class=\"grid2\">\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"off-start\">Ouverture des choix</label>\n            <input id=\"off-start\" type=\"date\" class=\"input\" formControlName=\"choiceStartDate\" />\n          </div>\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"off-end\">Cl\u00F4ture des choix</label>\n            <input id=\"off-end\" type=\"date\" class=\"input\" formControlName=\"choiceEndDate\" />\n          </div>\n        </div>\n      </form>\n\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeOfferings()\">\n          Annuler\n        </button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"offeringForm.invalid || saving()\"\n                (click)=\"submitOfferings()\">\n          Enregistrer\n        </button>\n      </footer>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Inscrire un \u00E9l\u00E8ve \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (assignOpen()) {\n    <div class=\"drawer-backdrop\" (click)=\"closeAssign()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"assign-title\">\n      <header class=\"drawer__head\">\n        <h2 class=\"drawer__title\" id=\"assign-title\">Inscrire un \u00E9l\u00E8ve \u00E0 une option</h2>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeAssign()\">\u00D7</button>\n      </header>\n\n      <form class=\"drawer__body\" [formGroup]=\"assignForm\" (ngSubmit)=\"submitAssign()\">\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"assign-offering\">\n            Option et niveau\n          </label>\n          <select id=\"assign-offering\" class=\"input\" formControlName=\"offeringId\"\n                  (change)=\"onOfferingChosen($any($event.target).value)\">\n            <option value=\"\">Choisir\u2026</option>\n            @for (offering of allOfferings(); track offering.id) {\n              <option [value]=\"offering.id\">\n                {{ optionOf(offering.id)?.name }} \u2014 {{ offering.levelName }}\n                ({{ offering.availableSeats }} place(s))\n              </option>\n            }\n          </select>\n          @if (assignTarget(); as target) {\n            @if (target.availableSeats === 0) {\n              <span class=\"field__hint field__hint--warn\">\n                Ce groupe est complet : le v\u0153u partira en liste d'attente.\n              </span>\n            } @else {\n              <span class=\"field__hint\">\n                {{ target.availableSeats }} place(s) restante(s) sur {{ target.capacity }}.\n                @if (target.choiceEndDate) {\n                  Choix ouverts jusqu'au {{ formatDate(target.choiceEndDate) }}.\n                }\n              </span>\n            }\n          }\n        </div>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"assign-student\">\u00C9l\u00E8ve</label>\n          <select id=\"assign-student\" class=\"input\" formControlName=\"studentId\">\n            <option value=\"\">Choisir\u2026</option>\n            @for (student of candidates(); track student.id) {\n              <option [value]=\"student.id\">\n                {{ student.fullName }} \u2014 {{ student.classroomName }}\n              </option>\n            }\n          </select>\n          <span class=\"field__hint\">\n            Seuls les \u00E9l\u00E8ves du niveau o\u00F9 l'option est ouverte apparaissent : ailleurs,\n            elle ne tomberait sur aucune heure de leur emploi du temps.\n          </span>\n        </div>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"assign-priority\">\n            Priorit\u00E9 du v\u0153u\n          </label>\n          <input id=\"assign-priority\" type=\"number\" class=\"input\" formControlName=\"priority\"\n                 min=\"1\" max=\"10\" step=\"1\" />\n          <span class=\"field__hint\">\n            1 pour le premier choix de l'\u00E9l\u00E8ve. C'est ce classement qui d\u00E9partage\n            quand les places manquent.\n          </span>\n        </div>\n\n        <div class=\"field\">\n          <label class=\"field__label\" for=\"assign-notes\">Observation</label>\n          <textarea id=\"assign-notes\" class=\"textarea\" rows=\"2\"\n                    formControlName=\"notes\"></textarea>\n        </div>\n\n        <label class=\"switch\">\n          <input type=\"checkbox\" formControlName=\"confirmImmediately\" />\n          <span>\n            Confirmer la place tout de suite\n            <small>D\u00E9cochez pour enregistrer le v\u0153u sans trancher. Si le groupe est\n              complet, la confirmation devient automatiquement une mise en attente.</small>\n          </span>\n        </label>\n      </form>\n\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeAssign()\">\n          Annuler\n        </button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"assignForm.invalid || saving()\"\n                (click)=\"submitAssign()\">\n          Inscrire\n        </button>\n      </footer>\n    </aside>\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n.lead {\n  max-width: 68ch;\n  margin: 0 0 var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n}\n\n.linklike {\n  padding: 0;\n  font: inherit;\n  color: var(--brand);\n  background: none;\n  border: none;\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Onglets \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.tabs {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n.pill {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n}\n\n/**\n * L'\u00E9tat d'un v\u0153u porte sa couleur : \u00AB sur liste d'attente \u00BB et \u00AB confirm\u00E9 \u00BB\n * ne doivent pas se ressembler, puisqu'un seul des deux donne une place.\n */\n.state {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='todo'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='wait'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='done'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='off'] { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Ce qui est complet \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.alert-block {\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 22px;\n    height: 22px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-4) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n    flex-wrap: wrap;\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Carte d'option \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.option {\n  display: flex;\n  flex-direction: column;\n  border-top: 3px solid var(--option-color, var(--brand));\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4);\n  }\n\n  &__title { min-width: 0; }\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__body {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-2);\n    padding: 0 var(--space-4) var(--space-3);\n  }\n\n  &__note { margin: 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__usage {\n    margin: 0;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n\n    &--none { font-style: italic; color: var(--warning); }\n  }\n\n  &__footer {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-3) var(--space-4);\n    border-top: 1px solid var(--border-light);\n    flex-wrap: wrap;\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Grille options \u00D7 niveaux \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.table-wrapper { overflow-x: auto; }\n\n.matrix {\n  &__option {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    text-align: left;\n    font-weight: 400;\n  }\n\n  &__swatch {\n    flex: none;\n    width: 10px;\n    height: 22px;\n    border-radius: 3px;\n  }\n\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__code { display: block; font-size: var(--text-xs); color: var(--text-light); }\n\n  &__cell { min-width: 96px; }\n\n  &__seats {\n    display: block;\n    font-weight: 600;\n    color: var(--text-strong);\n\n    &--full { color: var(--warning); }\n  }\n\n  &__bar {\n    display: block;\n    height: 4px;\n    margin: 3px 0 0 auto;\n    width: 64px;\n    background: var(--surface-sunken);\n    border-radius: var(--radius-pill);\n    overflow: hidden;\n  }\n\n  &__fill {\n    display: block;\n    height: 100%;\n    background: var(--brand);\n    border-radius: var(--radius-pill);\n  }\n\n  &__wait {\n    display: block;\n    margin-top: 2px;\n    font-size: var(--text-xs);\n    color: var(--warning);\n  }\n\n  &__closed { color: var(--text-light); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Filtres et v\u0153ux \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.filters {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n\n  &__select .input,\n  &__search .input { width: auto; min-width: 180px; }\n}\n\n.cell-actions {\n  display: flex;\n  gap: var(--space-2);\n  justify-content: flex-end;\n  white-space: nowrap;\n}\n\n.row--wait { background: var(--warning-bg); }\n\n.entry {\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__number { display: block; font-size: var(--text-xs); color: var(--text-light); }\n}\n\n.chip-option {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  color: var(--text-strong);\n  border-left: 3px solid var(--option-color, var(--brand));\n  background: var(--surface-sunken);\n  border-radius: var(--radius-badge);\n}\n\n.empty-state {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneaux \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__close {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n.grid2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block {\n  padding: var(--space-3);\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  &--warn {\n    color: var(--warning);\n    background: var(--warning-bg);\n  }\n}\n\n.field__hint--warn { color: var(--warning); }\n\n.switch {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n  font-size: var(--text-sm);\n  cursor: pointer;\n\n  input { margin-top: 3px; }\n  small { display: block; margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.levels {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n  }\n\n  &__check {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    font-weight: 600;\n    color: var(--text-strong);\n    cursor: pointer;\n  }\n\n  &__state {\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n\n    &--none { font-style: italic; color: var(--text-light); }\n  }\n}\n\n.swatches { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n.swatch {\n  width: 28px;\n  height: 28px;\n  border: 2px solid transparent;\n  border-radius: var(--radius-badge);\n  cursor: pointer;\n\n  &--on {\n    border-color: var(--text-strong);\n    box-shadow: 0 0 0 2px var(--surface-card) inset;\n  }\n}\n\n@include mobile {\n  .drawer { width: 100vw; }\n  .option__footer { flex-wrap: wrap; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OptionsComponent, { className: "OptionsComponent", filePath: "frontend/src/app/features/options/options.component.ts", lineNumber: 50 }); })();
//# sourceMappingURL=options.component.js.map