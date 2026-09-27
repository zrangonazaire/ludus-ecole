import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FEE_DATA_SOURCE } from '@core/datasource/data-source';
import { FEE_CATEGORIES, FEE_RECURRENCES } from '@core/models/fee.models';
import { ApprovalCircuitService } from '@core/services/approval-circuit.service';
import { FeeApprovalService } from '@core/services/fee-approval.service';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.levelId;
const _forTrack2 = ($index, $item) => $item.code;
function FinanceConfigComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openType()); });
    i0.ɵɵelementStart(1, "span", 16);
    i0.ɵɵtext(2, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Nouveau type de frais ");
    i0.ɵɵelementEnd();
} }
function FinanceConfigComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openSchedule()); });
    i0.ɵɵelementStart(1, "span", 16);
    i0.ɵɵtext(2, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Nouveau tarif ");
    i0.ɵɵelementEnd();
} }
function FinanceConfigComponent_For_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", c_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", c_r4.code, " \u2014 ", c_r4.name, "");
} }
function FinanceConfigComponent_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 13);
    i0.ɵɵtext(1, " Aucun circuit disponible \u2014 cr\u00E9ez-en un dans ");
    i0.ɵɵelementStart(2, "a", 17);
    i0.ɵɵtext(3, "Configuration syst\u00E8me");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, ". ");
    i0.ɵɵelementEnd();
} }
function FinanceConfigComponent_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 14);
} }
function FinanceConfigComponent_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 18);
    i0.ɵɵlistener("retry", function FinanceConfigComponent_Conditional_33_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function FinanceConfigComponent_Conditional_34_Case_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 19)(1, "div", 21)(2, "h2", 22);
    i0.ɵɵtext(3, "Aper\u00E7u");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 23);
    i0.ɵɵtext(5, "Vue d'ensemble de la configuration financi\u00E8re");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 24)(7, "div", 25)(8, "div", 26);
    i0.ɵɵtext(9, "\uD83D\uDCCB");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 27)(11, "span", 28);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 29);
    i0.ɵɵtext(14, "Types de frais");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "div", 25)(16, "div", 26);
    i0.ɵɵtext(17, "\uD83D\uDCCC");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 27)(19, "span", 28);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 29);
    i0.ɵɵtext(22, "Frais obligatoires");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "div", 25)(24, "div", 26);
    i0.ɵɵtext(25, "\uD83D\uDCDA");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 27)(27, "span", 28);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span", 29);
    i0.ɵɵtext(30, "Niveaux tarif\u00E9s");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "div", 25)(32, "div", 26);
    i0.ɵɵtext(33, "\u2714");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 27)(35, "span", 30);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span", 29);
    i0.ɵɵtext(38, "Circuits cr\u00E9\u00E9s");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(39, "div", 31)(40, "h3");
    i0.ɵɵtext(41, "Conseils");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "ul")(43, "li");
    i0.ɵɵtext(44, "Cr\u00E9ez d'abord les types de frais avant de d\u00E9finir les tarifs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "li");
    i0.ɵɵtext(46, "Chaque type de frais peut avoir plusieurs tarifs selon les niveaux");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "li");
    i0.ɵɵtext(48, "Les \u00E9ch\u00E9ances permettent de diviser les paiements sur plusieurs dates");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "li");
    i0.ɵɵtext(50, "Un circuit de validation est requis pour les r\u00E9ductions de scolarit\u00E9");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate(ctx_r1.totalFeeTypes());
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.mandatoryTypes());
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.pricedLevels());
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.circuits().length);
} }
function FinanceConfigComponent_Conditional_34_Case_1_For_4_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 39);
    i0.ɵɵtext(1, "Obligatoire");
    i0.ɵɵelementEnd();
} }
function FinanceConfigComponent_Conditional_34_Case_1_For_4_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 40);
    i0.ɵɵtext(1, "Facultatif");
    i0.ɵɵelementEnd();
} }
function FinanceConfigComponent_Conditional_34_Case_1_For_4_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 42);
    i0.ɵɵtext(1, "Tarif\u00E9 sur ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " niveau(x)");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(type_r8.pricedLevels);
} }
function FinanceConfigComponent_Conditional_34_Case_1_For_4_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 43);
    i0.ɵɵtext(1, "Aucun tarif d\u00E9fini");
    i0.ɵɵelementEnd();
} }
function FinanceConfigComponent_Conditional_34_Case_1_For_4_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 44);
    i0.ɵɵtext(1, "Frais remboursable selon le r\u00E8glement de l'\u00E9tablissement.");
    i0.ɵɵelementEnd();
} }
function FinanceConfigComponent_Conditional_34_Case_1_For_4_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(type_r8.description);
} }
function FinanceConfigComponent_Conditional_34_Case_1_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 34)(1, "header", 36)(2, "div")(3, "h2", 37);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 38);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, FinanceConfigComponent_Conditional_34_Case_1_For_4_Conditional_7_Template, 2, 0, "span", 39)(8, FinanceConfigComponent_Conditional_34_Case_1_For_4_Conditional_8_Template, 2, 0, "span", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 41);
    i0.ɵɵtemplate(10, FinanceConfigComponent_Conditional_34_Case_1_For_4_Conditional_10_Template, 5, 1, "p", 42)(11, FinanceConfigComponent_Conditional_34_Case_1_For_4_Conditional_11_Template, 2, 0, "p", 43)(12, FinanceConfigComponent_Conditional_34_Case_1_For_4_Conditional_12_Template, 2, 0, "p", 44)(13, FinanceConfigComponent_Conditional_34_Case_1_For_4_Conditional_13_Template, 2, 1, "p", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "footer", 45)(15, "button", 46);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_34_Case_1_For_4_Template_button_click_15_listener() { const type_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openType(type_r8)); });
    i0.ɵɵtext(16, " Modifier ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 47);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_34_Case_1_For_4_Template_button_click_17_listener() { const type_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.archiveType(type_r8)); });
    i0.ɵɵtext(18, " Archiver ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const type_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(type_r8.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" ", type_r8.code, " \u00B7 ", ctx_r1.categoryLabel(type_r8.category), " \u00B7 ", ctx_r1.recurrenceLabel(type_r8.recurrence), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(type_r8.mandatory ? 7 : 8);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(type_r8.pricedLevels > 0 ? 10 : 11);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(type_r8.refundable ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(type_r8.description ? 13 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", type_r8.pricedLevels > 0);
    i0.ɵɵattribute("title", type_r8.pricedLevels > 0 ? "Supprimez d'abord ses tarifs" : null);
} }
function FinanceConfigComponent_Conditional_34_Case_1_ForEmpty_5_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 35)(1, "p", 48);
    i0.ɵɵtext(2, "Aucun type de frais d\u00E9clar\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 49);
    i0.ɵɵtext(4, " Commencez par ce que votre \u00E9tablissement facture : inscription, scolarit\u00E9, cantine, transport\u2026 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 15);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_34_Case_1_ForEmpty_5_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openType()); });
    i0.ɵɵtext(6, " D\u00E9clarer un type de frais ");
    i0.ɵɵelementEnd()();
} }
function FinanceConfigComponent_Conditional_34_Case_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 32);
    i0.ɵɵtext(1, " Un type de frais d\u00E9crit ce que l'\u00E9tablissement facture (code, cat\u00E9gorie, p\u00E9riodicit\u00E9). Son montant se r\u00E8gle ensuite niveau par niveau, dans l'onglet \u00AB Tarifs par niveau \u00BB. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "section", 33);
    i0.ɵɵrepeaterCreate(3, FinanceConfigComponent_Conditional_34_Case_1_For_4_Template, 19, 10, "article", 34, _forTrack0, false, FinanceConfigComponent_Conditional_34_Case_1_ForEmpty_5_Template, 7, 0, "div", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.types());
} }
function FinanceConfigComponent_Conditional_34_Case_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 35)(1, "p", 48);
    i0.ɵɵtext(2, "Aucun type de frais d\u00E9clar\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 49);
    i0.ɵɵtext(4, " Un tarif rattache un type de frais \u00E0 un niveau : d\u00E9clarez d'abord ce que votre \u00E9tablissement facture. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 15);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_34_Case_2_Conditional_0_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.tab.set("FEES")); });
    i0.ɵɵtext(6, " Aller aux types de frais ");
    i0.ɵɵelementEnd()();
} }
function FinanceConfigComponent_Conditional_34_Case_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35)(1, "p", 48);
    i0.ɵɵtext(2, "Aucun niveau d\u00E9fini.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 49);
    i0.ɵɵtext(4, " Les tarifs se rattachent aux niveaux : cr\u00E9ez-les d'abord dans la configuration de l'\u00E9tablissement. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 51);
    i0.ɵɵtext(6, "Ouvrir la configuration");
    i0.ɵɵelementEnd()();
} }
function FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 39);
    i0.ɵɵtext(1, "Pr\u00EAt");
    i0.ɵɵelementEnd();
} }
function FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 58);
    i0.ɵɵtext(1, "Incomplet");
    i0.ɵɵelementEnd();
} }
function FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Conditional_12_For_15_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementStart(3, "span", 66);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 65);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 65);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 67)(12, "button", 46);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Conditional_12_For_15_Template_button_click_12_listener() { const schedule_r12 = i0.ɵɵrestoreView(_r11).$implicit; const level_r13 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.openSchedule(level_r13.levelId, schedule_r12.feeTypeId)); });
    i0.ɵɵtext(13, " Modifier ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 47);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Conditional_12_For_15_Template_button_click_14_listener() { const schedule_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(6); return i0.ɵɵresetView(ctx_r1.deleteSchedule(schedule_r12)); });
    i0.ɵɵtext(15, " Supprimer ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const schedule_r12 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(6);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", schedule_r12.feeTypeName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(schedule_r12.feeTypeCode);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(schedule_r12.label || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.format(schedule_r12.totalAmount), " ", schedule_r12.currency, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(schedule_r12.instalments.length);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", schedule_r12.locked);
    i0.ɵɵattribute("title", schedule_r12.locked ? "Ce tarif est d\u00E9j\u00E0 factur\u00E9" : null);
} }
function FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60)(1, "table", 64)(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Frais");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th");
    i0.ɵɵtext(7, "Libell\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th", 65);
    i0.ɵɵtext(9, "Montant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 65);
    i0.ɵɵtext(11, "\u00C9ch\u00E9ances");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "th");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵrepeaterCreate(14, FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Conditional_12_For_15_Template, 16, 8, "tr", null, _forTrack0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const level_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(14);
    i0.ɵɵrepeater(level_r13.schedules);
} }
function FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 61);
    i0.ɵɵtext(1, "Aucun frais d\u00E9fini pour ce niveau.");
    i0.ɵɵelementEnd();
} }
function FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 52)(1, "div", 53)(2, "div", 54)(3, "span", 55);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 56);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 57);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Conditional_9_Template, 2, 0, "span", 39)(10, FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Conditional_10_Template, 2, 0, "span", 58);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 59);
    i0.ɵɵtemplate(12, FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Conditional_12_Template, 16, 0, "div", 60)(13, FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Conditional_13_Template, 2, 0, "p", 61);
    i0.ɵɵelementStart(14, "footer", 62)(15, "button", 63);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Template_button_click_15_listener() { const level_r13 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.openSchedule(level_r13.levelId)); });
    i0.ɵɵtext(16, " Ajouter un tarif ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const level_r13 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(level_r13.levelName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r13.cycleName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" ", level_r13.scheduleCount, " tarif(s) \u00B7 Obligatoires ", ctx_r1.format(level_r13.mandatoryTotal), " \u00B7 Facultatifs ", ctx_r1.format(level_r13.optionalTotal), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(level_r13.ready ? 9 : 10);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(level_r13.schedules.length > 0 ? 12 : 13);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.availableFor(level_r13).length === 0);
} }
function FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 50);
    i0.ɵɵrepeaterCreate(1, FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_For_2_Template, 17, 8, "article", 52, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.levels());
} }
function FinanceConfigComponent_Conditional_34_Case_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, FinanceConfigComponent_Conditional_34_Case_2_Conditional_0_Template, 7, 0, "div", 35)(1, FinanceConfigComponent_Conditional_34_Case_2_Conditional_1_Template, 7, 0, "div", 35)(2, FinanceConfigComponent_Conditional_34_Case_2_Conditional_2_Template, 3, 0, "section", 50);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(ctx_r1.types().length === 0 ? 0 : ctx_r1.levels().length === 0 ? 1 : 2);
} }
function FinanceConfigComponent_Conditional_34_Case_3_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 35)(1, "p", 48);
    i0.ɵɵtext(2, "Aucune \u00E9ch\u00E9ance planifi\u00E9e.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 49);
    i0.ɵɵtext(4, " D\u00E9finissez d'abord des tarifs par niveau : chaque tarif g\u00E9n\u00E8re son propre \u00E9ch\u00E9ancier. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 15);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_34_Case_3_Conditional_2_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.tab.set("PRICING")); });
    i0.ɵɵtext(6, " Aller aux tarifs ");
    i0.ɵɵelementEnd()();
} }
function FinanceConfigComponent_Conditional_34_Case_3_Conditional_3_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 65);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 65);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r15 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r15.levelName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r15.feeTypeName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r15.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 6, row_r15.dueDate, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r1.format(row_r15.amount), " ", row_r15.currency, "");
} }
function FinanceConfigComponent_Conditional_34_Case_3_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60)(1, "table", 64)(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th");
    i0.ɵɵtext(7, "Frais");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "\u00C9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 65);
    i0.ɵɵtext(11, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 65);
    i0.ɵɵtext(13, "Montant");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "tbody");
    i0.ɵɵrepeaterCreate(15, FinanceConfigComponent_Conditional_34_Case_3_Conditional_3_For_16_Template, 12, 9, "tr", null, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "tfoot")(18, "tr")(19, "td", 68)(20, "strong");
    i0.ɵɵtext(21, "Total planifi\u00E9");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "td", 65)(23, "strong");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(15);
    i0.ɵɵrepeater(ctx_r1.instalmentRows());
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate2("", ctx_r1.format(ctx_r1.instalmentTotal()), " ", ctx_r1.currency(), "");
} }
function FinanceConfigComponent_Conditional_34_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 32);
    i0.ɵɵtext(1, " Toutes les \u00E9ch\u00E9ances planifi\u00E9es, tous frais confondus, tri\u00E9es par date. ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, FinanceConfigComponent_Conditional_34_Case_3_Conditional_2_Template, 7, 0, "div", 35)(3, FinanceConfigComponent_Conditional_34_Case_3_Conditional_3_Template, 25, 2, "div", 60);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.instalmentRows().length === 0 ? 2 : 3);
} }
function FinanceConfigComponent_Conditional_34_Case_4_Conditional_5_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r16 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", c_r16.code, " \u2014 ", c_r16.name, "");
} }
function FinanceConfigComponent_Conditional_34_Case_4_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 70);
    i0.ɵɵrepeaterCreate(1, FinanceConfigComponent_Conditional_34_Case_4_Conditional_5_For_2_Template, 2, 2, "li", null, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.discountCircuits());
} }
function FinanceConfigComponent_Conditional_34_Case_4_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 71);
    i0.ɵɵtext(1, " Aucun circuit \u00AB Remises \u00BB configur\u00E9 \u2014 cr\u00E9ez-en un dans Configuration syst\u00E8me. ");
    i0.ɵɵelementEnd();
} }
function FinanceConfigComponent_Conditional_34_Case_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 20)(1, "h2", 69);
    i0.ɵɵtext(2, "Remises, bourses et r\u00E9ductions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, " Les r\u00E9ductions de scolarit\u00E9 suivent leur propre circuit de validation, sur un \u00E9cran d\u00E9di\u00E9. V\u00E9rifiez ici qu'un circuit \u00AB Remises \u00BB est en place. ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, FinanceConfigComponent_Conditional_34_Case_4_Conditional_5_Template, 3, 0, "ul", 70)(6, FinanceConfigComponent_Conditional_34_Case_4_Conditional_6_Template, 2, 0, "p", 71);
    i0.ɵɵelementStart(7, "a", 72);
    i0.ɵɵtext(8, " Ouvrir l'espace Remises et bourses ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r1.discountCircuits().length > 0 ? 5 : 6);
} }
function FinanceConfigComponent_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, FinanceConfigComponent_Conditional_34_Case_0_Template, 51, 4, "section", 19)(1, FinanceConfigComponent_Conditional_34_Case_1_Template, 6, 1)(2, FinanceConfigComponent_Conditional_34_Case_2_Template, 3, 1)(3, FinanceConfigComponent_Conditional_34_Case_3_Template, 4, 1)(4, FinanceConfigComponent_Conditional_34_Case_4_Template, 9, 1, "section", 20);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.tab()) === "DASHBOARD" ? 0 : tmp_1_0 === "FEES" ? 1 : tmp_1_0 === "PRICING" ? 2 : tmp_1_0 === "INSTALMENTS" ? 3 : tmp_1_0 === "DISCOUNTS" ? 4 : -1);
} }
function FinanceConfigComponent_Conditional_35_Conditional_2_For_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r19 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r19.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r19.label);
} }
function FinanceConfigComponent_Conditional_35_Conditional_2_For_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r20 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r20.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r20.label);
} }
function FinanceConfigComponent_Conditional_35_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 75)(1, "h2", 76);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 77);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_35_Conditional_2_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "form", 78)(6, "div", 79)(7, "div", 80)(8, "label", 81);
    i0.ɵɵtext(9, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(10, "input", 82);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 80)(12, "label", 83);
    i0.ɵɵtext(13, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(14, "input", 84);
    i0.ɵɵelementStart(15, "span", 85);
    i0.ɵɵtext(16, " Majuscules, chiffres et tirets bas, sans espace : ce code figure sur les re\u00E7us. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "div", 79)(18, "div", 80)(19, "label", 86);
    i0.ɵɵtext(20, "Cat\u00E9gorie");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "select", 87);
    i0.ɵɵrepeaterCreate(22, FinanceConfigComponent_Conditional_35_Conditional_2_For_23_Template, 2, 2, "option", 12, _forTrack2);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 80)(25, "label", 88);
    i0.ɵɵtext(26, "P\u00E9riodicit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "select", 89);
    i0.ɵɵrepeaterCreate(28, FinanceConfigComponent_Conditional_35_Conditional_2_For_29_Template, 2, 2, "option", 12, _forTrack2);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "label", 90);
    i0.ɵɵelement(31, "input", 91);
    i0.ɵɵtext(32, " Frais obligatoire (g\u00E9n\u00E9r\u00E9 \u00E0 chaque inscription) ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "label", 90);
    i0.ɵɵelement(34, "input", 92);
    i0.ɵɵtext(35, " Remboursable en cas de d\u00E9part ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 80)(37, "label", 93);
    i0.ɵɵtext(38, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(39, "textarea", 94);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "p", 95);
    i0.ɵɵtext(41, " L'\u00E9criture part dans le circuit choisi en haut de page : rien ne s'applique avant la derni\u00E8re validation. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(42, "footer", 96)(43, "button", 97);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_35_Conditional_2_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(44, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "button", 98);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_35_Conditional_2_Template_button_click_45_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.saveType()); });
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.editingType() ? "Modifier le type de frais" : "Nouveau type de frais", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.typeForm);
    i0.ɵɵadvance(17);
    i0.ɵɵrepeater(ctx_r1.categories);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r1.recurrences);
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.editingType() ? "Envoyer la modification" : "Envoyer la cr\u00E9ation", " ");
} }
function FinanceConfigComponent_Conditional_35_Conditional_3_For_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r22 = ctx.$implicit;
    i0.ɵɵproperty("value", type_r22.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", type_r22.name, " (", type_r22.code, ")");
} }
function FinanceConfigComponent_Conditional_35_Conditional_3_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r23 = ctx.$implicit;
    i0.ɵɵproperty("value", level_r23.levelId);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", level_r23.levelName, " (", level_r23.cycleName, ")");
} }
function FinanceConfigComponent_Conditional_35_Conditional_3_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 112)(1, "div", 80)(2, "label", 113);
    i0.ɵɵtext(3, "Nombre d'\u00E9ch\u00E9ances");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 114);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 80)(6, "label", 115);
    i0.ɵɵtext(7, "Premi\u00E8re \u00E9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 116);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 80)(10, "label", 117);
    i0.ɵɵtext(11, "Mois entre \u00E9ch\u00E9ances");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 118);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "p", 95);
    i0.ɵɵtext(14, " Le serveur r\u00E9partit le montant en parts \u00E9gales \u00E0 partir de la premi\u00E8re date. ");
    i0.ɵɵelementEnd();
} }
function FinanceConfigComponent_Conditional_35_Conditional_3_Conditional_48_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 120);
    i0.ɵɵelement(1, "input", 122)(2, "input", 123)(3, "input", 124);
    i0.ɵɵelementStart(4, "button", 125);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_35_Conditional_3_Conditional_48_For_2_Template_button_click_4_listener() { const $index_r26 = i0.ɵɵrestoreView(_r25).$index; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.removeInstalmentRow($index_r26)); });
    i0.ɵɵtext(5, " \u00D7 ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const $index_r26 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("formGroupName", $index_r26);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.instalments.length <= 1);
} }
function FinanceConfigComponent_Conditional_35_Conditional_3_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 119);
    i0.ɵɵrepeaterCreate(1, FinanceConfigComponent_Conditional_35_Conditional_3_Conditional_48_For_2_Template, 6, 2, "div", 120, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 110)(4, "button", 46);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_35_Conditional_3_Conditional_48_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r24); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.addInstalmentRow()); });
    i0.ɵɵtext(5, " + Ajouter une \u00E9ch\u00E9ance ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 121);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.instalments.controls);
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("balance-note--bad", !ctx_r1.balanced());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" Saisi : ", ctx_r1.format(ctx_r1.plannedSum()), " / ", ctx_r1.format(ctx_r1.scheduleForm.controls.totalAmount.value), " ");
} }
function FinanceConfigComponent_Conditional_35_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 75)(1, "h2", 76);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 77);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_35_Conditional_3_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "form", 78)(6, "div", 79)(7, "div", 80)(8, "label", 99);
    i0.ɵɵtext(9, "Type de frais");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "select", 100)(11, "option", 11);
    i0.ɵɵtext(12, "Choisir\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(13, FinanceConfigComponent_Conditional_35_Conditional_3_For_14_Template, 2, 3, "option", 12, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 80)(16, "label", 101);
    i0.ɵɵtext(17, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "select", 102)(19, "option", 11);
    i0.ɵɵtext(20, "Choisir\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(21, FinanceConfigComponent_Conditional_35_Conditional_3_For_22_Template, 2, 3, "option", 12, _forTrack1);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "div", 79)(24, "div", 80)(25, "label", 103);
    i0.ɵɵtext(26, "Libell\u00E9 affich\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(27, "input", 104);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 80)(29, "label", 105);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(31, "input", 106);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "label", 90);
    i0.ɵɵelement(33, "input", 107);
    i0.ɵɵtext(34, " Appliqu\u00E9 aux nouveaux \u00E9l\u00E8ves ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "label", 90);
    i0.ɵɵelement(36, "input", 108);
    i0.ɵɵtext(37, " Appliqu\u00E9 aux r\u00E9inscriptions ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "p", 109);
    i0.ɵɵtext(39, "\u00C9ch\u00E9ancier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 110)(41, "label", 90)(42, "input", 111);
    i0.ɵɵlistener("change", function FinanceConfigComponent_Conditional_35_Conditional_3_Template_input_change_42_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setScheduleMode("AUTO")); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(43, " R\u00E9partition automatique ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "label", 90)(45, "input", 111);
    i0.ɵɵlistener("change", function FinanceConfigComponent_Conditional_35_Conditional_3_Template_input_change_45_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setScheduleMode("MANUAL")); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(46, " \u00C9ch\u00E9ances personnalis\u00E9es ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(47, FinanceConfigComponent_Conditional_35_Conditional_3_Conditional_47_Template, 15, 0)(48, FinanceConfigComponent_Conditional_35_Conditional_3_Conditional_48_Template, 8, 4);
    i0.ɵɵelementStart(49, "p", 95);
    i0.ɵɵtext(50, " L'\u00E9ch\u00E9ancier part dans le circuit choisi en haut de page : rien ne s'applique avant la derni\u00E8re validation. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(51, "footer", 96)(52, "button", 97);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_35_Conditional_3_Template_button_click_52_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(53, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "button", 98);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_35_Conditional_3_Template_button_click_54_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.saveSchedule()); });
    i0.ɵɵtext(55);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.editingSchedule() ? "Modifier le tarif" : "Nouveau tarif", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.scheduleForm);
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r1.types());
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r1.levels());
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1(" Montant total (", ctx_r1.currency(), ") ");
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("checked", ctx_r1.scheduleMode() === "AUTO");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("checked", ctx_r1.scheduleMode() === "MANUAL");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.scheduleMode() === "AUTO" ? 47 : 48);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.editingSchedule() ? "Envoyer la modification" : "Envoyer le tarif", " ");
} }
function FinanceConfigComponent_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵlistener("click", function FinanceConfigComponent_Conditional_35_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 74);
    i0.ɵɵtemplate(2, FinanceConfigComponent_Conditional_35_Conditional_2_Template, 47, 4)(3, FinanceConfigComponent_Conditional_35_Conditional_3_Template, 56, 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const openPanel_r27 = ctx;
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(openPanel_r27 === "TYPE" ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(openPanel_r27 === "SCHEDULE" ? 3 : -1);
} }
/**
 * Paramètres financiers (menu Finance → Paramètres).
 *
 * <p>Les écritures passent toutes par un circuit de validation, comme sur le
 * Plan de facturation : le serveur ne modifie rien avant la dernière
 * approbation. Cette page ne fait que soumettre ; le suivi des demandes reste
 * dans l'onglet « Demandes de validation » du Plan de facturation.</p>
 */
export class FinanceConfigComponent {
    dataSource = inject(FEE_DATA_SOURCE);
    approvals = inject(FeeApprovalService);
    circuitService = inject(ApprovalCircuitService);
    notifications = inject(NotificationService);
    setupStatus = inject(SetupStatusService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    categories = FEE_CATEGORIES;
    recurrences = FEE_RECURRENCES;
    // ───────────────────────────────────────────── état de l'écran
    tab = signal('DASHBOARD');
    panel = signal(null);
    loading = signal(true);
    saving = signal(false);
    error = signal(false);
    types = signal([]);
    levels = signal([]);
    circuits = signal([]);
    circuitId = signal('');
    editingType = signal(null);
    scheduleMode = signal('AUTO');
    // ───────────────────────────────────────────── vues dérivées
    totalFeeTypes = computed(() => this.types().length);
    mandatoryTypes = computed(() => this.types().filter((t) => t.mandatory).length);
    pricedLevels = computed(() => this.levels().filter((l) => l.scheduleCount > 0).length);
    currency = computed(() => this.levels()[0]?.currency ?? 'XOF');
    /** Circuits « frais » s'il en existe, sinon tous (démonstration). */
    feeCircuits = computed(() => {
        const all = this.circuits();
        const fee = all.filter((c) => c.usage === 'FEE');
        return fee.length ? fee : all;
    });
    discountCircuits = computed(() => this.circuits().filter((c) => c.usage === 'DISCOUNT'));
    /** Toutes les échéances, à plat et triées par date (onglet Échéances). */
    instalmentRows = computed(() => {
        const rows = [];
        for (const level of this.levels()) {
            for (const schedule of level.schedules) {
                for (const inst of schedule.instalments) {
                    rows.push({
                        levelName: level.levelName,
                        feeTypeName: schedule.feeTypeName,
                        label: inst.label,
                        dueDate: inst.dueDate,
                        amount: inst.amount,
                        currency: schedule.currency
                    });
                }
            }
        }
        return rows.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    });
    // ───────────────────────────────────────────── formulaires
    typeForm = this.fb.nonNullable.group({
        code: ['', [Validators.required, Validators.maxLength(40)]],
        name: ['', [Validators.required, Validators.maxLength(150)]],
        category: ['OTHER', [Validators.required]],
        recurrence: ['ANNUAL', [Validators.required]],
        mandatory: [true],
        refundable: [false],
        description: ['', [Validators.maxLength(500)]]
    });
    scheduleForm = this.fb.nonNullable.group({
        feeTypeId: ['', [Validators.required]],
        levelId: ['', [Validators.required]],
        label: ['', [Validators.maxLength(120)]],
        totalAmount: [0, [Validators.required, Validators.min(1)]],
        appliesToNewStudents: [true],
        appliesToReturningStudents: [true],
        instalmentCount: [3, [Validators.required, Validators.min(1)]],
        firstDueDate: [''],
        monthsBetweenInstalments: [3, [Validators.min(0)]],
        instalments: this.fb.array([])
    });
    instalments = this.scheduleForm.controls.instalments;
    // ────────────────────────────────────── état du panneau tarif
    editingSchedule = signal(null);
    instalmentTotal = computed(() => Math.round(this.instalmentRows().reduce((sum, r) => sum + r.amount, 0) * 100) / 100);
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.listTypes().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (list) => {
                this.types.set(list);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
        this.dataSource.levels().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (list) => this.levels.set(list),
            error: () => this.levels.set([])
        });
        this.circuitService.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (rows) => {
                this.circuits.set(rows);
                if (!this.circuitId()) {
                    this.circuitId.set(rows.find((c) => c.usage === 'FEE')?.id ?? rows[0]?.id ?? '');
                }
            },
            error: () => this.notifications.error('Chargement des circuits de validation impossible.')
        });
    }
    // ────────────────────────────────────────── aide à la saisie
    typeById(id) {
        return this.types().find((t) => t.id === id);
    }
    levelById(id) {
        return this.levels().find((l) => l.levelId === id);
    }
    /** Types de frais pas encore tarifés sur ce niveau. */
    availableFor(level) {
        const used = new Set(level.schedules.map((s) => s.feeTypeId));
        return this.types().filter((t) => !used.has(t.id));
    }
    categoryLabel(code) {
        return this.categories.find((c) => c.code === code)?.label ?? code;
    }
    recurrenceLabel(code) {
        return this.recurrences.find((r) => r.code === code)?.label ?? code;
    }
    format(amount) {
        return new Intl.NumberFormat('fr-FR').format(amount);
    }
    // ────────────────────────────────────────── types de frais
    openType(type) {
        this.editingType.set(type ?? null);
        this.typeForm.reset({
            code: type?.code ?? '',
            name: type?.name ?? '',
            category: type?.category ?? 'OTHER',
            recurrence: type?.recurrence ?? 'ANNUAL',
            mandatory: type?.mandatory ?? true,
            refundable: type?.refundable ?? false,
            description: type?.description ?? ''
        });
        this.panel.set('TYPE');
    }
    closePanel() {
        this.panel.set(null);
        this.editingType.set(null);
        this.editingSchedule.set(null);
    }
    saveType() {
        if (this.saving()) {
            return;
        }
        if (this.typeForm.invalid) {
            this.typeForm.markAllAsTouched();
            return;
        }
        this.saving.set(true);
        if (!this.requireCircuit()) {
            return;
        }
        const value = this.typeForm.getRawValue();
        const payload = {
            code: value.code.trim().toUpperCase(),
            name: value.name.trim(),
            category: value.category,
            recurrence: value.recurrence,
            mandatory: value.mandatory,
            refundable: value.refundable,
            description: value.description.trim() || undefined
        };
        const editing = this.editingType();
        const request = editing
            ? this.approvals.updateType(editing.id, payload, this.circuitId())
            : this.approvals.createType(payload, this.circuitId());
        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => this.afterWrite(editing ? 'Type de frais modifié' : 'Type de frais créé'),
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    archiveType(type) {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        if (!this.requireCircuit()) {
            return;
        }
        this.approvals.archiveType(type.id, this.circuitId())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => this.afterWrite(`« ${type.name} » archivé`),
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ────────────────────────────────── ouverture du panneau tarif
    openSchedule(levelId, feeTypeId) {
        const level = (levelId ? this.levelById(levelId) : this.levels()[0]) ?? null;
        const existing = level && feeTypeId
            ? level.schedules.find((s) => s.feeTypeId === feeTypeId)
            : undefined;
        const fallbackType = level ? this.availableFor(level)[0] : this.types()[0];
        this.editingSchedule.set(existing ?? null);
        this.scheduleForm.reset({
            feeTypeId: feeTypeId ?? fallbackType?.id ?? '',
            levelId: level?.levelId ?? '',
            label: existing?.label ?? '',
            totalAmount: existing?.totalAmount ?? 0,
            appliesToNewStudents: existing?.appliesToNewStudents ?? true,
            appliesToReturningStudents: existing?.appliesToReturningStudents ?? true,
            instalmentCount: existing?.instalments.length || 3,
            firstDueDate: existing?.instalments[0]?.dueDate ?? '',
            monthsBetweenInstalments: 3
        });
        this.instalments.clear();
        for (const inst of existing?.instalments ?? []) {
            this.instalments.push(this.instalmentRow(inst.label, inst.amount, inst.dueDate));
        }
        this.scheduleMode.set(existing ? 'MANUAL' : 'AUTO');
        this.panel.set('SCHEDULE');
    }
    setScheduleMode(mode) {
        this.scheduleMode.set(mode);
        if (mode === 'MANUAL' && this.instalments.length === 0) {
            this.addInstalmentRow();
        }
    }
    addInstalmentRow() {
        const remaining = Math.max(0, Math.round((this.scheduleForm.controls.totalAmount.value - this.plannedSum()) * 100) / 100);
        this.instalments.push(this.instalmentRow('', remaining, ''));
    }
    removeInstalmentRow(index) {
        if (this.instalments.length > 1) {
            this.instalments.removeAt(index);
        }
    }
    /** Somme des échéances saisies à la main. */
    plannedSum() {
        return Math.round(this.instalments.controls
            .reduce((sum, row) => sum + (row.controls.amount.value || 0), 0) * 100) / 100;
    }
    /** Le total saisi et la somme des échéances concordent. */
    balanced() {
        const total = this.scheduleForm.controls.totalAmount.value || 0;
        return Math.abs(this.plannedSum() - total) < 0.01;
    }
    instalmentRow(label, amount, dueDate) {
        return this.fb.nonNullable.group({
            label: [label, [Validators.maxLength(120)]],
            amount: [amount, [Validators.required, Validators.min(1)]],
            dueDate: [dueDate, [Validators.required]]
        });
    }
    saveSchedule() {
        if (this.saving()) {
            return;
        }
        if (this.scheduleForm.invalid) {
            this.scheduleForm.markAllAsTouched();
            return;
        }
        const mode = this.scheduleMode();
        if (mode === 'AUTO' && !this.scheduleForm.controls.firstDueDate.value) {
            this.notifications.error('Indiquez la date de la première échéance.');
            return;
        }
        if (mode === 'MANUAL') {
            if (this.instalments.length === 0) {
                this.notifications.error('Ajoutez au moins une échéance.');
                return;
            }
            if (!this.balanced()) {
                this.notifications.error('Les échéances saisies ne totalisent pas le montant du tarif.');
                return;
            }
        }
        this.saving.set(true);
        if (!this.requireCircuit()) {
            return;
        }
        this.approvals.saveSchedule(this.buildSchedulePayload(), this.circuitId())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => this.afterWrite(this.editingSchedule() ? 'Tarif modifié' : 'Tarif créé'),
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    deleteSchedule(schedule) {
        if (schedule.locked) {
            this.notifications.error('Ce tarif est déjà facturé : suppression impossible.');
            return;
        }
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        if (!this.requireCircuit()) {
            return;
        }
        this.approvals.deleteSchedule(schedule.id, this.circuitId())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => this.afterWrite('Tarif supprimé'),
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    buildSchedulePayload() {
        const value = this.scheduleForm.getRawValue();
        const base = {
            feeTypeId: value.feeTypeId,
            levelId: value.levelId,
            label: value.label.trim() || undefined,
            totalAmount: value.totalAmount,
            appliesToNewStudents: value.appliesToNewStudents,
            appliesToReturningStudents: value.appliesToReturningStudents
        };
        if (this.scheduleMode() === 'AUTO') {
            base.instalmentCount = value.instalmentCount;
            base.firstDueDate = value.firstDueDate;
            if (value.monthsBetweenInstalments > 0) {
                base.monthsBetweenInstalments = value.monthsBetweenInstalments;
            }
        }
        else {
            base.instalments = this.instalments.controls.map((row) => ({
                label: row.controls.label.value || undefined,
                amount: row.controls.amount.value,
                dueDate: row.controls.dueDate.value,
                graceDays: 0
            }));
        }
        return base;
    }
    // ──────────────────────────────────────────────── internals
    /** Toute écriture exige un circuit de validation choisi. */
    requireCircuit() {
        if (this.circuitId() && this.feeCircuits().some((c) => c.id === this.circuitId())) {
            return true;
        }
        this.saving.set(false);
        this.notifications.error('Choisissez un circuit de validation en haut de la page.');
        return false;
    }
    afterWrite(label) {
        this.saving.set(false);
        this.closePanel();
        this.load();
        this.setupStatus.refresh();
        this.notifications.success(`${label} : demande envoyée dans le circuit. Elle s'appliquera après la dernière validation.`);
    }
    explain(err) {
        const response = err?.error;
        this.notifications.error(response?.message
            ?? (response?.code ? translateErrorCode(response.code) : 'Action impossible. Réessayez.'), 'Action refusée');
    }
    static ɵfac = function FinanceConfigComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FinanceConfigComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FinanceConfigComponent, selectors: [["eduops-finance-config"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 36, vars: 20, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--primary"], ["role", "tablist", 1, "tabs"], ["type", "button", "role", "tab", 1, "tabs__item", 3, "click"], [1, "approval-choice", "card"], ["for", "cfg-fee-circuit"], ["id", "cfg-fee-circuit", 1, "input", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], [1, "approval-choice__hint"], ["message", "Chargement des param\u00E8tres financiers..."], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], ["routerLink", "/system-config"], [3, "retry"], [1, "config-dashboard", "card"], [1, "card", "config-discounts"], [1, "config-dashboard__header"], [1, "config-dashboard__title"], [1, "config-dashboard__subtitle"], [1, "config-dashboard__grid"], [1, "stat-card"], [1, "stat-card__icon"], [1, "stat-card__content"], [1, "stat-card__value", "numeric"], [1, "stat-card__label"], [1, "stat-card__value"], [1, "config-dashboard__tips"], [1, "lead"], [1, "grid", "grid--3"], [1, "type", "card"], [1, "empty-state"], [1, "type__head"], [1, "type__name"], [1, "type__meta", "numeric"], [1, "pill", "pill--ok"], [1, "pill", "pill--muted"], [1, "type__body"], [1, "type__usage", "numeric"], [1, "type__usage", "type__usage--none"], [1, "type__note"], [1, "type__footer"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], [1, "empty-state__title"], [1, "empty-state__text"], [1, "levels"], ["routerLink", "/setup", 1, "btn", "btn--primary"], [1, "level", "card"], [1, "level__head"], [1, "level__identity"], [1, "level__name"], [1, "level__cycle"], [1, "level__stats", "numeric"], [1, "pill", "pill--warn"], [1, "level__body"], [1, "table-wrapper"], [1, "level__empty"], [1, "level__foot"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click", "disabled"], [1, "table"], [1, "numeric"], [1, "muted"], [1, "cell-actions"], ["colspan", "4"], [1, "config-discounts__title"], [1, "config-discounts__list"], [1, "config-discounts__warn"], ["routerLink", "/discounts", 1, "btn", "btn--primary"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", 1, "drawer"], [1, "drawer__head"], [1, "drawer__title"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "drawer__body", 3, "formGroup"], [1, "grid2"], [1, "field"], ["for", "cfg-name", 1, "field__label", "field__label--required"], ["id", "cfg-name", "formControlName", "name", "placeholder", "Scolarit\u00E9 annuelle", 1, "input"], ["for", "cfg-code", 1, "field__label", "field__label--required"], ["id", "cfg-code", "formControlName", "code", "placeholder", "SCOL", 1, "input"], [1, "field__hint"], ["for", "cfg-category", 1, "field__label", "field__label--required"], ["id", "cfg-category", "formControlName", "category", 1, "select"], ["for", "cfg-recurrence", 1, "field__label", "field__label--required"], ["id", "cfg-recurrence", "formControlName", "recurrence", 1, "select"], [1, "check"], ["type", "checkbox", "formControlName", "mandatory"], ["type", "checkbox", "formControlName", "refundable"], ["for", "cfg-description", 1, "field__label"], ["id", "cfg-description", "rows", "3", "formControlName", "description", "placeholder", "Facultatif : rappel interne", 1, "textarea"], [1, "hint-block"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["for", "sch-type", 1, "field__label", "field__label--required"], ["id", "sch-type", "formControlName", "feeTypeId", 1, "select"], ["for", "sch-level", 1, "field__label", "field__label--required"], ["id", "sch-level", "formControlName", "levelId", 1, "select"], ["for", "sch-label", 1, "field__label"], ["id", "sch-label", "formControlName", "label", "placeholder", "Nom par d\u00E9faut si vide", 1, "input"], ["for", "sch-amount", 1, "field__label", "field__label--required"], ["id", "sch-amount", "type", "number", "min", "1", "formControlName", "totalAmount", 1, "input"], ["type", "checkbox", "formControlName", "appliesToNewStudents"], ["type", "checkbox", "formControlName", "appliesToReturningStudents"], [1, "drawer__section"], [1, "mode-row"], ["type", "radio", "name", "sch-mode", 3, "change", "checked"], [1, "spread-bar"], ["for", "sch-count", 1, "field__label", "field__label--required"], ["id", "sch-count", "type", "number", "min", "1", "max", "24", "formControlName", "instalmentCount", 1, "input"], ["for", "sch-first", 1, "field__label", "field__label--required"], ["id", "sch-first", "type", "date", "formControlName", "firstDueDate", 1, "input"], ["for", "sch-months", 1, "field__label"], ["id", "sch-months", "type", "number", "min", "1", "max", "12", "formControlName", "monthsBetweenInstalments", 1, "input"], ["formArrayName", "instalments", 1, "inst-rows"], [1, "inst-row", 3, "formGroupName"], [1, "balance-note"], ["formControlName", "label", "placeholder", "Libell\u00E9 (ex. 1\u00E8re \u00E9ch\u00E9ance)", 1, "input"], ["type", "number", "min", "1", "formControlName", "amount", "placeholder", "Montant", 1, "input"], ["type", "date", "formControlName", "dueDate", 1, "input"], ["type", "button", "aria-label", "Retirer l'\u00E9ch\u00E9ance", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"]], template: function FinanceConfigComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Param\u00E8tres financiers");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, "Gestion compl\u00E8te des frais, tarifs et circuits de validation");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4);
            i0.ɵɵtemplate(8, FinanceConfigComponent_Conditional_8_Template, 4, 0, "button", 5)(9, FinanceConfigComponent_Conditional_9_Template, 4, 0, "button", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "nav", 6)(11, "button", 7);
            i0.ɵɵlistener("click", function FinanceConfigComponent_Template_button_click_11_listener() { return ctx.tab.set("DASHBOARD"); });
            i0.ɵɵtext(12, " Tableau de bord ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 7);
            i0.ɵɵlistener("click", function FinanceConfigComponent_Template_button_click_13_listener() { return ctx.tab.set("FEES"); });
            i0.ɵɵtext(14, " Types de frais ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "button", 7);
            i0.ɵɵlistener("click", function FinanceConfigComponent_Template_button_click_15_listener() { return ctx.tab.set("PRICING"); });
            i0.ɵɵtext(16, " Tarifs par niveau ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "button", 7);
            i0.ɵɵlistener("click", function FinanceConfigComponent_Template_button_click_17_listener() { return ctx.tab.set("INSTALMENTS"); });
            i0.ɵɵtext(18, " \u00C9ch\u00E9ances ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "button", 7);
            i0.ɵɵlistener("click", function FinanceConfigComponent_Template_button_click_19_listener() { return ctx.tab.set("DISCOUNTS"); });
            i0.ɵɵtext(20, " R\u00E9ductions ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "section", 8)(22, "label", 9);
            i0.ɵɵtext(23, "Circuit de validation \u00AB Frais et tarifs \u00BB");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "select", 10);
            i0.ɵɵlistener("ngModelChange", function FinanceConfigComponent_Template_select_ngModelChange_24_listener($event) { return ctx.circuitId.set($event); });
            i0.ɵɵelementStart(25, "option", 11);
            i0.ɵɵtext(26, "\u2014 Choisir un circuit \u2014");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(27, FinanceConfigComponent_For_28_Template, 2, 3, "option", 12, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "p");
            i0.ɵɵtext(30, " Toute cr\u00E9ation, modification ou suppression de frais part dans ce circuit : le changement ne s'applique qu'apr\u00E8s la derni\u00E8re validation. ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(31, FinanceConfigComponent_Conditional_31_Template, 5, 0, "p", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(32, FinanceConfigComponent_Conditional_32_Template, 1, 0, "eduops-loading-state", 14)(33, FinanceConfigComponent_Conditional_33_Template, 1, 0, "eduops-error-state")(34, FinanceConfigComponent_Conditional_34_Template, 5, 1)(35, FinanceConfigComponent_Conditional_35_Template, 4, 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_15_0;
            i0.ɵɵadvance(8);
            i0.ɵɵconditional(ctx.tab() === "FEES" ? 8 : ctx.tab() === "PRICING" ? 9 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "DASHBOARD");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "DASHBOARD");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "FEES");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "FEES");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "PRICING");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "PRICING");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "INSTALMENTS");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "INSTALMENTS");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "DISCOUNTS");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "DISCOUNTS");
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngModel", ctx.circuitId());
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.feeCircuits());
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.circuits().length ? 31 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 32 : ctx.error() ? 33 : 34);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_15_0 = ctx.panel()) ? 35 : -1, tmp_15_0);
        } }, dependencies: [CommonModule, i1.DatePipe, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MinValidator, i2.MaxValidator, i2.FormGroupDirective, i2.FormControlName, i2.FormGroupName, i2.FormArrayName, FormsModule, i2.NgModel, RouterLink,
            LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n\n\n\n.tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n}\n\n\n\n\n.approval-choice[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  margin-bottom: var(--space-4);\n\n  > label { font-weight: 600; color: var(--text-strong); }\n  select { display: block; max-width: 36rem; margin: var(--space-2) 0; }\n  p { margin: var(--space-2) 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__hint { color: var(--warning); }\n}\n\n\n\n\n.lead[_ngcontent-%COMP%] {\n  max-width: 720px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n.muted[_ngcontent-%COMP%] { color: var(--text-light); }\n\n.pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-pill);\n\n  &--ok { color: var(--success); background: var(--success-bg); }\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n  &--muted { color: var(--text-muted); background: var(--surface-sunken); }\n}\n\n\n\n\n.config-dashboard[_ngcontent-%COMP%] {\n  padding: var(--space-5);\n\n  &__header { margin-bottom: var(--space-4); }\n  &__title { margin: 0; font-size: var(--text-lg); color: var(--text-strong); }\n  &__subtitle { margin: 4px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: var(--space-3);\n  }\n\n  &__tips {\n    margin-top: var(--space-5);\n    padding-top: var(--space-4);\n    border-top: 1px solid var(--border-light);\n\n    h3 { margin: 0 0 var(--space-2); font-size: var(--text-sm); color: var(--text-strong); }\n\n    ul {\n      margin: 0;\n      padding-left: 1.1rem;\n      font-size: var(--text-sm);\n      color: var(--text-muted);\n\n      li { margin-bottom: 4px; }\n    }\n  }\n}\n\n.stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  &__icon { font-size: 1.4rem; }\n  &__content { display: flex; flex-direction: column; min-width: 0; }\n  &__value { font-size: var(--text-xl); font-weight: 700; color: var(--text-strong); }\n  &__label { font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n\n\n\n.type[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  border-top: 3px solid var(--border-strong);\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-4) var(--space-2);\n  }\n\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n  &__body { flex: 1; padding: 0 var(--space-4) var(--space-3); }\n\n  &__usage {\n    margin: 0;\n    font-size: var(--text-sm);\n\n    &--none { color: var(--text-light); font-style: italic; }\n  }\n\n  &__note {\n    margin: var(--space-2) 0 0;\n    font-size: var(--text-xs);\n    line-height: var(--leading-relaxed);\n    color: var(--text-muted);\n  }\n\n  &__footer {\n    display: flex;\n    gap: var(--space-1);\n    padding: var(--space-2) var(--space-3);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n\n\n\n.levels[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n\n.level[_ngcontent-%COMP%] {\n  overflow: hidden;\n\n  &__head {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-3) var(--space-4);\n  }\n\n  &__identity { display: flex; flex-direction: column; min-width: 130px; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { font-size: var(--text-xs); color: var(--text-light); }\n  &__stats { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__body {\n    padding: 0 var(--space-4) var(--space-4);\n    border-top: 1px solid var(--border-light);\n  }\n\n  &__empty {\n    margin: var(--space-3) 0;\n    padding: var(--space-4);\n    text-align: center;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    margin-top: var(--space-2);\n  }\n\n  @media (max-width: 760px) {\n    &__stats { display: none; }\n  }\n}\n\n.table-wrapper[_ngcontent-%COMP%] { overflow-x: auto; margin-top: var(--space-3); }\n.cell-actions[_ngcontent-%COMP%] { text-align: right; white-space: nowrap; }\n\n\n\n\n.config-discounts[_ngcontent-%COMP%] {\n  padding: var(--space-5);\n\n  &__title { margin: 0 0 var(--space-3); font-size: var(--text-lg); }\n\n  p {\n    margin: 0 0 var(--space-3);\n    max-width: 640px;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n\n  &__list {\n    margin: 0 0 var(--space-4);\n    padding-left: 1.1rem;\n    font-size: var(--text-sm);\n    color: var(--text-normal);\n  }\n\n  p.config-discounts__warn { color: var(--warning); font-weight: 600; }\n\n}\n\n\n\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgba(15, 23, 42, .45);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n\n  &__close {\n    font-size: 1.5rem;\n    line-height: 1;\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { color: var(--text-strong); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__section {\n    margin: 0;\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--brand);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.grid2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.check[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  font-size: var(--text-sm);\n  color: var(--text-normal);\n\n  input { width: auto; }\n}\n\n.mode-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-4);\n\n  .check { font-weight: 600; }\n}\n\n.spread-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  .field { flex: 1; min-width: 130px; }\n}\n\n.inst-rows[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n\n.inst-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 110px 150px auto;\n  gap: var(--space-2);\n  align-items: center;\n}\n\n.balance-note[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  color: var(--text-muted);\n\n  &--bad { color: var(--warning); font-weight: 600; }\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-6) var(--space-4);\n  text-align: center;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-card);\n\n  &__title {\n    margin: 0;\n    font-weight: 600;\n    color: var(--text-strong);\n  }\n\n  &__text {\n    margin: 0;\n    max-width: 460px;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FinanceConfigComponent, [{
        type: Component,
        args: [{ selector: 'eduops-finance-config', standalone: true, imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,
                    LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Param\u00E8tres financiers</h1>\n      <p class=\"page__meta\">Gestion compl\u00E8te des frais, tarifs et circuits de validation</p>\n    </div>\n    <div class=\"page__actions\">\n      @if (tab() === 'FEES') {\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openType()\">\n          <span aria-hidden=\"true\">+</span> Nouveau type de frais\n        </button>\n      } @else if (tab() === 'PRICING') {\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openSchedule()\">\n          <span aria-hidden=\"true\">+</span> Nouveau tarif\n        </button>\n      }\n    </div>\n  </header>\n\n  <nav class=\"tabs\" role=\"tablist\">\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'DASHBOARD'\"\n            [attr.aria-selected]=\"tab() === 'DASHBOARD'\"\n            (click)=\"tab.set('DASHBOARD')\">\n      Tableau de bord\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'FEES'\"\n            [attr.aria-selected]=\"tab() === 'FEES'\"\n            (click)=\"tab.set('FEES')\">\n      Types de frais\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'PRICING'\"\n            [attr.aria-selected]=\"tab() === 'PRICING'\"\n            (click)=\"tab.set('PRICING')\">\n      Tarifs par niveau\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'INSTALMENTS'\"\n            [attr.aria-selected]=\"tab() === 'INSTALMENTS'\"\n            (click)=\"tab.set('INSTALMENTS')\">\n      \u00C9ch\u00E9ances\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'DISCOUNTS'\"\n            [attr.aria-selected]=\"tab() === 'DISCOUNTS'\"\n            (click)=\"tab.set('DISCOUNTS')\">\n      R\u00E9ductions\n    </button>\n  </nav>\n\n  <section class=\"approval-choice card\">\n    <label for=\"cfg-fee-circuit\">Circuit de validation \u00AB Frais et tarifs \u00BB</label>\n    <select id=\"cfg-fee-circuit\" class=\"input\" [ngModel]=\"circuitId()\" (ngModelChange)=\"circuitId.set($event)\">\n      <option value=\"\">\u2014 Choisir un circuit \u2014</option>\n      @for (c of feeCircuits(); track c.id) {\n        <option [value]=\"c.id\">{{ c.code }} \u2014 {{ c.name }}</option>\n      }\n    </select>\n    <p>\n      Toute cr\u00E9ation, modification ou suppression de frais part dans ce circuit :\n      le changement ne s'applique qu'apr\u00E8s la derni\u00E8re validation.\n    </p>\n    @if (!circuits().length) {\n      <p class=\"approval-choice__hint\">\n        Aucun circuit disponible \u2014 cr\u00E9ez-en un dans\n        <a routerLink=\"/system-config\">Configuration syst\u00E8me</a>.\n      </p>\n    }\n  </section>\n\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des param\u00E8tres financiers...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n    @switch (tab()) {\n      @case ('DASHBOARD') {\n        <section class=\"config-dashboard card\">\n          <div class=\"config-dashboard__header\">\n            <h2 class=\"config-dashboard__title\">Aper\u00E7u</h2>\n            <p class=\"config-dashboard__subtitle\">Vue d'ensemble de la configuration financi\u00E8re</p>\n          </div>\n          <div class=\"config-dashboard__grid\">\n            <div class=\"stat-card\">\n              <div class=\"stat-card__icon\">\uD83D\uDCCB</div>\n              <div class=\"stat-card__content\">\n                <span class=\"stat-card__value numeric\">{{ totalFeeTypes() }}</span>\n                <span class=\"stat-card__label\">Types de frais</span>\n              </div>\n            </div>\n            <div class=\"stat-card\">\n              <div class=\"stat-card__icon\">\uD83D\uDCCC</div>\n              <div class=\"stat-card__content\">\n                <span class=\"stat-card__value numeric\">{{ mandatoryTypes() }}</span>\n                <span class=\"stat-card__label\">Frais obligatoires</span>\n              </div>\n            </div>\n            <div class=\"stat-card\">\n              <div class=\"stat-card__icon\">\uD83D\uDCDA</div>\n              <div class=\"stat-card__content\">\n                <span class=\"stat-card__value numeric\">{{ pricedLevels() }}</span>\n                <span class=\"stat-card__label\">Niveaux tarif\u00E9s</span>\n              </div>\n            </div>\n            <div class=\"stat-card\">\n              <div class=\"stat-card__icon\">\u2714</div>\n              <div class=\"stat-card__content\">\n                <span class=\"stat-card__value\">{{ circuits().length }}</span>\n                <span class=\"stat-card__label\">Circuits cr\u00E9\u00E9s</span>\n              </div>\n            </div>\n          </div>\n          <div class=\"config-dashboard__tips\">\n            <h3>Conseils</h3>\n            <ul>\n              <li>Cr\u00E9ez d'abord les types de frais avant de d\u00E9finir les tarifs</li>\n              <li>Chaque type de frais peut avoir plusieurs tarifs selon les niveaux</li>\n              <li>Les \u00E9ch\u00E9ances permettent de diviser les paiements sur plusieurs dates</li>\n              <li>Un circuit de validation est requis pour les r\u00E9ductions de scolarit\u00E9</li>\n            </ul>\n          </div>\n        </section>\n      }\n      @case ('FEES') {\n        <p class=\"lead\">\n          Un type de frais d\u00E9crit ce que l'\u00E9tablissement facture (code, cat\u00E9gorie,\n          p\u00E9riodicit\u00E9). Son montant se r\u00E8gle ensuite niveau par niveau, dans\n          l'onglet \u00AB Tarifs par niveau \u00BB.\n        </p>\n\n        <section class=\"grid grid--3\">\n          @for (type of types(); track type.id) {\n            <article class=\"type card\">\n              <header class=\"type__head\">\n                <div>\n                  <h2 class=\"type__name\">{{ type.name }}</h2>\n                  <p class=\"type__meta numeric\">\n                    {{ type.code }} \u00B7 {{ categoryLabel(type.category) }} \u00B7 {{ recurrenceLabel(type.recurrence) }}\n                  </p>\n                </div>\n                @if (type.mandatory) {\n                  <span class=\"pill pill--ok\">Obligatoire</span>\n                } @else {\n                  <span class=\"pill pill--muted\">Facultatif</span>\n                }\n              </header>\n\n              <div class=\"type__body\">\n                @if (type.pricedLevels > 0) {\n                  <p class=\"type__usage numeric\">Tarif\u00E9 sur <strong>{{ type.pricedLevels }}</strong> niveau(x)</p>\n                } @else {\n                  <p class=\"type__usage type__usage--none\">Aucun tarif d\u00E9fini</p>\n                }\n                @if (type.refundable) {\n                  <p class=\"type__note\">Frais remboursable selon le r\u00E8glement de l'\u00E9tablissement.</p>\n                }\n                @if (type.description) {\n                  <p class=\"type__note\">{{ type.description }}</p>\n                }\n              </div>\n\n              <footer class=\"type__footer\">\n                <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"openType(type)\">\n                  Modifier\n                </button>\n                <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                        [disabled]=\"type.pricedLevels > 0\"\n                        [attr.title]=\"type.pricedLevels > 0 ? 'Supprimez d\\'abord ses tarifs' : null\"\n                        (click)=\"archiveType(type)\">\n                  Archiver\n                </button>\n              </footer>\n            </article>\n          } @empty {\n            <div class=\"empty-state\">\n              <p class=\"empty-state__title\">Aucun type de frais d\u00E9clar\u00E9.</p>\n              <p class=\"empty-state__text\">\n                Commencez par ce que votre \u00E9tablissement facture : inscription,\n                scolarit\u00E9, cantine, transport\u2026\n              </p>\n              <button type=\"button\" class=\"btn btn--primary\" (click)=\"openType()\">\n                D\u00E9clarer un type de frais\n              </button>\n            </div>\n          }\n        </section>\n      }\n      @case ('PRICING') {\n        @if (types().length === 0) {\n          <div class=\"empty-state\">\n            <p class=\"empty-state__title\">Aucun type de frais d\u00E9clar\u00E9.</p>\n            <p class=\"empty-state__text\">\n              Un tarif rattache un type de frais \u00E0 un niveau : d\u00E9clarez d'abord\n              ce que votre \u00E9tablissement facture.\n            </p>\n            <button type=\"button\" class=\"btn btn--primary\" (click)=\"tab.set('FEES')\">\n              Aller aux types de frais\n            </button>\n          </div>\n        } @else if (levels().length === 0) {\n          <div class=\"empty-state\">\n            <p class=\"empty-state__title\">Aucun niveau d\u00E9fini.</p>\n            <p class=\"empty-state__text\">\n              Les tarifs se rattachent aux niveaux : cr\u00E9ez-les d'abord dans la\n              configuration de l'\u00E9tablissement.\n            </p>\n            <a class=\"btn btn--primary\" routerLink=\"/setup\">Ouvrir la configuration</a>\n          </div>\n        } @else {\n          <section class=\"levels\">\n            @for (level of levels(); track level.levelId) {\n              <article class=\"level card\">\n                <div class=\"level__head\">\n                  <div class=\"level__identity\">\n                    <span class=\"level__name\">{{ level.levelName }}</span>\n                    <span class=\"level__cycle\">{{ level.cycleName }}</span>\n                  </div>\n                  <span class=\"level__stats numeric\">\n                    {{ level.scheduleCount }} tarif(s) \u00B7 Obligatoires\n                    {{ format(level.mandatoryTotal) }} \u00B7 Facultatifs\n                    {{ format(level.optionalTotal) }}\n                  </span>\n                  @if (level.ready) {\n                    <span class=\"pill pill--ok\">Pr\u00EAt</span>\n                  } @else {\n                    <span class=\"pill pill--warn\">Incomplet</span>\n                  }\n                </div>\n\n                <div class=\"level__body\">\n                  @if (level.schedules.length > 0) {\n                    <div class=\"table-wrapper\">\n                      <table class=\"table\">\n                        <thead>\n                          <tr>\n                            <th>Frais</th>\n                            <th>Libell\u00E9</th>\n                            <th class=\"numeric\">Montant</th>\n                            <th class=\"numeric\">\u00C9ch\u00E9ances</th>\n                            <th></th>\n                          </tr>\n                        </thead>\n                        <tbody>\n                          @for (schedule of level.schedules; track schedule.id) {\n                            <tr>\n                              <td>\n                                {{ schedule.feeTypeName }}\n                                <span class=\"muted\">{{ schedule.feeTypeCode }}</span>\n                              </td>\n                              <td>{{ schedule.label || '\u2014' }}</td>\n                              <td class=\"numeric\">\n                                {{ format(schedule.totalAmount) }} {{ schedule.currency }}\n                              </td>\n                              <td class=\"numeric\">{{ schedule.instalments.length }}</td>\n                              <td class=\"cell-actions\">\n                                <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                                        (click)=\"openSchedule(level.levelId, schedule.feeTypeId)\">\n                                  Modifier\n                                </button>\n                                <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                                        [disabled]=\"schedule.locked\"\n                                        [attr.title]=\"schedule.locked ? 'Ce tarif est d\u00E9j\u00E0 factur\u00E9' : null\"\n                                        (click)=\"deleteSchedule(schedule)\">\n                                  Supprimer\n                                </button>\n                              </td>\n                            </tr>\n                          }\n                        </tbody>\n                      </table>\n                    </div>\n                  } @else {\n                    <p class=\"level__empty\">Aucun frais d\u00E9fini pour ce niveau.</p>\n                  }\n\n                  <footer class=\"level__foot\">\n                    <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                            [disabled]=\"availableFor(level).length === 0\"\n                            (click)=\"openSchedule(level.levelId)\">\n                      Ajouter un tarif\n                    </button>\n                  </footer>\n                </div>\n              </article>\n            }\n          </section>\n        }\n      }\n      @case ('INSTALMENTS') {\n        <p class=\"lead\">\n          Toutes les \u00E9ch\u00E9ances planifi\u00E9es, tous frais confondus, tri\u00E9es par date.\n        </p>\n\n        @if (instalmentRows().length === 0) {\n          <div class=\"empty-state\">\n            <p class=\"empty-state__title\">Aucune \u00E9ch\u00E9ance planifi\u00E9e.</p>\n            <p class=\"empty-state__text\">\n              D\u00E9finissez d'abord des tarifs par niveau : chaque tarif g\u00E9n\u00E8re son\n              propre \u00E9ch\u00E9ancier.\n            </p>\n            <button type=\"button\" class=\"btn btn--primary\" (click)=\"tab.set('PRICING')\">\n              Aller aux tarifs\n            </button>\n          </div>\n        } @else {\n          <div class=\"table-wrapper\">\n            <table class=\"table\">\n              <thead>\n                <tr>\n                  <th>Niveau</th>\n                  <th>Frais</th>\n                  <th>\u00C9ch\u00E9ance</th>\n                  <th class=\"numeric\">Date</th>\n                  <th class=\"numeric\">Montant</th>\n                </tr>\n              </thead>\n              <tbody>\n                @for (row of instalmentRows(); track $index) {\n                  <tr>\n                    <td>{{ row.levelName }}</td>\n                    <td>{{ row.feeTypeName }}</td>\n                    <td>{{ row.label }}</td>\n                    <td class=\"numeric\">{{ row.dueDate | date:'dd/MM/yyyy' }}</td>\n                    <td class=\"numeric\">{{ format(row.amount) }} {{ row.currency }}</td>\n                  </tr>\n                }\n              </tbody>\n              <tfoot>\n                <tr>\n                  <td colspan=\"4\"><strong>Total planifi\u00E9</strong></td>\n                  <td class=\"numeric\">\n                    <strong>{{ format(instalmentTotal()) }} {{ currency() }}</strong>\n                  </td>\n                </tr>\n              </tfoot>\n            </table>\n          </div>\n        }\n      }\n      @case ('DISCOUNTS') {\n        <section class=\"card config-discounts\">\n          <h2 class=\"config-discounts__title\">Remises, bourses et r\u00E9ductions</h2>\n          <p>\n            Les r\u00E9ductions de scolarit\u00E9 suivent leur propre circuit de validation,\n            sur un \u00E9cran d\u00E9di\u00E9. V\u00E9rifiez ici qu'un circuit \u00AB Remises \u00BB est en place.\n          </p>\n          @if (discountCircuits().length > 0) {\n            <ul class=\"config-discounts__list\">\n              @for (c of discountCircuits(); track c.id) {\n                <li>{{ c.code }} \u2014 {{ c.name }}</li>\n              }\n            </ul>\n          } @else {\n            <p class=\"config-discounts__warn\">\n              Aucun circuit \u00AB Remises \u00BB configur\u00E9 \u2014 cr\u00E9ez-en un dans Configuration syst\u00E8me.\n            </p>\n          }\n          <a class=\"btn btn--primary\" routerLink=\"/discounts\">\n            Ouvrir l'espace Remises et bourses\n          </a>\n        </section>\n      }\n    }\n  }\n\n  @if (panel(); as openPanel) {\n    <div class=\"drawer-backdrop\" (click)=\"closePanel()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\">\n      @if (openPanel === 'TYPE') {\n        <header class=\"drawer__head\">\n          <h2 class=\"drawer__title\">\n            {{ editingType() ? 'Modifier le type de frais' : 'Nouveau type de frais' }}\n          </h2>\n          <button type=\"button\" class=\"drawer__close\" (click)=\"closePanel()\" aria-label=\"Fermer\">&times;</button>\n        </header>\n        <form class=\"drawer__body\" [formGroup]=\"typeForm\">\n          <div class=\"grid2\">\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"cfg-name\">Nom</label>\n              <input id=\"cfg-name\" class=\"input\" formControlName=\"name\"\n                     placeholder=\"Scolarit\u00E9 annuelle\" />\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"cfg-code\">Code</label>\n              <input id=\"cfg-code\" class=\"input\" formControlName=\"code\" placeholder=\"SCOL\" />\n              <span class=\"field__hint\">\n                Majuscules, chiffres et tirets bas, sans espace : ce code figure sur les re\u00E7us.\n              </span>\n            </div>\n          </div>\n\n          <div class=\"grid2\">\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"cfg-category\">Cat\u00E9gorie</label>\n              <select id=\"cfg-category\" class=\"select\" formControlName=\"category\">\n                @for (item of categories; track item.code) {\n                  <option [value]=\"item.code\">{{ item.label }}</option>\n                }\n              </select>\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"cfg-recurrence\">P\u00E9riodicit\u00E9</label>\n              <select id=\"cfg-recurrence\" class=\"select\" formControlName=\"recurrence\">\n                @for (item of recurrences; track item.code) {\n                  <option [value]=\"item.code\">{{ item.label }}</option>\n                }\n              </select>\n            </div>\n          </div>\n\n          <label class=\"check\">\n            <input type=\"checkbox\" formControlName=\"mandatory\" />\n            Frais obligatoire (g\u00E9n\u00E9r\u00E9 \u00E0 chaque inscription)\n          </label>\n          <label class=\"check\">\n            <input type=\"checkbox\" formControlName=\"refundable\" />\n            Remboursable en cas de d\u00E9part\n          </label>\n\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"cfg-description\">Description</label>\n            <textarea id=\"cfg-description\" class=\"textarea\" rows=\"3\"\n                      formControlName=\"description\"\n                      placeholder=\"Facultatif : rappel interne\"></textarea>\n          </div>\n\n          <p class=\"hint-block\">\n            L'\u00E9criture part dans le circuit choisi en haut de page : rien ne\n            s'applique avant la derni\u00E8re validation.\n          </p>\n        </form>\n        <footer class=\"drawer__foot\">\n          <button type=\"button\" class=\"btn btn--ghost\" (click)=\"closePanel()\">Annuler</button>\n          <button type=\"button\" class=\"btn btn--primary\" [disabled]=\"saving()\" (click)=\"saveType()\">\n            {{ editingType() ? 'Envoyer la modification' : 'Envoyer la cr\u00E9ation' }}\n          </button>\n        </footer>\n      }\n      @if (openPanel === 'SCHEDULE') {\n        <header class=\"drawer__head\">\n          <h2 class=\"drawer__title\">\n            {{ editingSchedule() ? 'Modifier le tarif' : 'Nouveau tarif' }}\n          </h2>\n          <button type=\"button\" class=\"drawer__close\" (click)=\"closePanel()\" aria-label=\"Fermer\">&times;</button>\n        </header>\n        <form class=\"drawer__body\" [formGroup]=\"scheduleForm\">\n          <div class=\"grid2\">\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"sch-type\">Type de frais</label>\n              <select id=\"sch-type\" class=\"select\" formControlName=\"feeTypeId\">\n                <option value=\"\">Choisir\u2026</option>\n                @for (type of types(); track type.id) {\n                  <option [value]=\"type.id\">{{ type.name }} ({{ type.code }})</option>\n                }\n              </select>\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"sch-level\">Niveau</label>\n              <select id=\"sch-level\" class=\"select\" formControlName=\"levelId\">\n                <option value=\"\">Choisir\u2026</option>\n                @for (level of levels(); track level.levelId) {\n                  <option [value]=\"level.levelId\">{{ level.levelName }} ({{ level.cycleName }})</option>\n                }\n              </select>\n            </div>\n          </div>\n\n          <div class=\"grid2\">\n            <div class=\"field\">\n              <label class=\"field__label\" for=\"sch-label\">Libell\u00E9 affich\u00E9</label>\n              <input id=\"sch-label\" class=\"input\" formControlName=\"label\"\n                     placeholder=\"Nom par d\u00E9faut si vide\" />\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"sch-amount\">\n                Montant total ({{ currency() }})\n              </label>\n              <input id=\"sch-amount\" class=\"input\" type=\"number\" min=\"1\" formControlName=\"totalAmount\" />\n            </div>\n          </div>\n\n          <label class=\"check\">\n            <input type=\"checkbox\" formControlName=\"appliesToNewStudents\" />\n            Appliqu\u00E9 aux nouveaux \u00E9l\u00E8ves\n          </label>\n          <label class=\"check\">\n            <input type=\"checkbox\" formControlName=\"appliesToReturningStudents\" />\n            Appliqu\u00E9 aux r\u00E9inscriptions\n          </label>\n\n          <p class=\"drawer__section\">\u00C9ch\u00E9ancier</p>\n          <div class=\"mode-row\">\n            <label class=\"check\">\n              <input type=\"radio\" name=\"sch-mode\" [checked]=\"scheduleMode() === 'AUTO'\"\n                     (change)=\"setScheduleMode('AUTO')\" />\n              R\u00E9partition automatique\n            </label>\n            <label class=\"check\">\n              <input type=\"radio\" name=\"sch-mode\" [checked]=\"scheduleMode() === 'MANUAL'\"\n                     (change)=\"setScheduleMode('MANUAL')\" />\n              \u00C9ch\u00E9ances personnalis\u00E9es\n            </label>\n          </div>\n\n          @if (scheduleMode() === 'AUTO') {\n            <div class=\"spread-bar\">\n              <div class=\"field\">\n                <label class=\"field__label field__label--required\" for=\"sch-count\">Nombre d'\u00E9ch\u00E9ances</label>\n                <input id=\"sch-count\" class=\"input\" type=\"number\" min=\"1\" max=\"24\"\n                       formControlName=\"instalmentCount\" />\n              </div>\n              <div class=\"field\">\n                <label class=\"field__label field__label--required\" for=\"sch-first\">Premi\u00E8re \u00E9ch\u00E9ance</label>\n                <input id=\"sch-first\" class=\"input\" type=\"date\" formControlName=\"firstDueDate\" />\n              </div>\n              <div class=\"field\">\n                <label class=\"field__label\" for=\"sch-months\">Mois entre \u00E9ch\u00E9ances</label>\n                <input id=\"sch-months\" class=\"input\" type=\"number\" min=\"1\" max=\"12\"\n                       formControlName=\"monthsBetweenInstalments\" />\n              </div>\n            </div>\n            <p class=\"hint-block\">\n              Le serveur r\u00E9partit le montant en parts \u00E9gales \u00E0 partir de la premi\u00E8re date.\n            </p>\n          } @else {\n            <div class=\"inst-rows\" formArrayName=\"instalments\">\n              @for (row of instalments.controls; track $index) {\n                <div class=\"inst-row\" [formGroupName]=\"$index\">\n                  <input class=\"input\" formControlName=\"label\" placeholder=\"Libell\u00E9 (ex. 1\u00E8re \u00E9ch\u00E9ance)\" />\n                  <input class=\"input\" type=\"number\" min=\"1\" formControlName=\"amount\" placeholder=\"Montant\" />\n                  <input class=\"input\" type=\"date\" formControlName=\"dueDate\" />\n                  <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                          [disabled]=\"instalments.length <= 1\"\n                          (click)=\"removeInstalmentRow($index)\" aria-label=\"Retirer l'\u00E9ch\u00E9ance\">\n                    &times;\n                  </button>\n                </div>\n              }\n            </div>\n            <div class=\"mode-row\">\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"addInstalmentRow()\">\n                + Ajouter une \u00E9ch\u00E9ance\n              </button>\n              <p class=\"balance-note\" [class.balance-note--bad]=\"!balanced()\">\n                Saisi : {{ format(plannedSum()) }} / {{ format(scheduleForm.controls.totalAmount.value) }}\n              </p>\n            </div>\n          }\n\n          <p class=\"hint-block\">\n            L'\u00E9ch\u00E9ancier part dans le circuit choisi en haut de page : rien ne\n            s'applique avant la derni\u00E8re validation.\n          </p>\n        </form>\n        <footer class=\"drawer__foot\">\n          <button type=\"button\" class=\"btn btn--ghost\" (click)=\"closePanel()\">Annuler</button>\n          <button type=\"button\" class=\"btn btn--primary\" [disabled]=\"saving()\" (click)=\"saveSchedule()\">\n            {{ editingSchedule() ? 'Envoyer la modification' : 'Envoyer le tarif' }}\n          </button>\n        </footer>\n      }\n\n    </aside>\n  }\n\n</div>\n\n", styles: ["@import 'styles/tokens';\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Onglets \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.tabs {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Circuit d'approbation \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.approval-choice {\n  padding: var(--space-4);\n  margin-bottom: var(--space-4);\n\n  > label { font-weight: 600; color: var(--text-strong); }\n  select { display: block; max-width: 36rem; margin: var(--space-2) 0; }\n  p { margin: var(--space-2) 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__hint { color: var(--warning); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Textes courants \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.lead {\n  max-width: 720px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n.muted { color: var(--text-light); }\n\n.pill {\n  display: inline-block;\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-pill);\n\n  &--ok { color: var(--success); background: var(--success-bg); }\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n  &--muted { color: var(--text-muted); background: var(--surface-sunken); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Tableau de bord \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.config-dashboard {\n  padding: var(--space-5);\n\n  &__header { margin-bottom: var(--space-4); }\n  &__title { margin: 0; font-size: var(--text-lg); color: var(--text-strong); }\n  &__subtitle { margin: 4px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: var(--space-3);\n  }\n\n  &__tips {\n    margin-top: var(--space-5);\n    padding-top: var(--space-4);\n    border-top: 1px solid var(--border-light);\n\n    h3 { margin: 0 0 var(--space-2); font-size: var(--text-sm); color: var(--text-strong); }\n\n    ul {\n      margin: 0;\n      padding-left: 1.1rem;\n      font-size: var(--text-sm);\n      color: var(--text-muted);\n\n      li { margin-bottom: 4px; }\n    }\n  }\n}\n\n.stat-card {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  &__icon { font-size: 1.4rem; }\n  &__content { display: flex; flex-direction: column; min-width: 0; }\n  &__value { font-size: var(--text-xl); font-weight: 700; color: var(--text-strong); }\n  &__label { font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Cartes de types \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.type {\n  display: flex;\n  flex-direction: column;\n  border-top: 3px solid var(--border-strong);\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-4) var(--space-2);\n  }\n\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n  &__body { flex: 1; padding: 0 var(--space-4) var(--space-3); }\n\n  &__usage {\n    margin: 0;\n    font-size: var(--text-sm);\n\n    &--none { color: var(--text-light); font-style: italic; }\n  }\n\n  &__note {\n    margin: var(--space-2) 0 0;\n    font-size: var(--text-xs);\n    line-height: var(--leading-relaxed);\n    color: var(--text-muted);\n  }\n\n  &__footer {\n    display: flex;\n    gap: var(--space-1);\n    padding: var(--space-2) var(--space-3);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Niveaux (tarifs) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.levels {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n\n.level {\n  overflow: hidden;\n\n  &__head {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-3) var(--space-4);\n  }\n\n  &__identity { display: flex; flex-direction: column; min-width: 130px; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { font-size: var(--text-xs); color: var(--text-light); }\n  &__stats { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__body {\n    padding: 0 var(--space-4) var(--space-4);\n    border-top: 1px solid var(--border-light);\n  }\n\n  &__empty {\n    margin: var(--space-3) 0;\n    padding: var(--space-4);\n    text-align: center;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    margin-top: var(--space-2);\n  }\n\n  @media (max-width: 760px) {\n    &__stats { display: none; }\n  }\n}\n\n.table-wrapper { overflow-x: auto; margin-top: var(--space-3); }\n.cell-actions { text-align: right; white-space: nowrap; }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 R\u00E9ductions \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.config-discounts {\n  padding: var(--space-5);\n\n  &__title { margin: 0 0 var(--space-3); font-size: var(--text-lg); }\n\n  p {\n    margin: 0 0 var(--space-3);\n    max-width: 640px;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n\n  &__list {\n    margin: 0 0 var(--space-4);\n    padding-left: 1.1rem;\n    font-size: var(--text-sm);\n    color: var(--text-normal);\n  }\n\n  p.config-discounts__warn { color: var(--warning); font-weight: 600; }\n\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau lat\u00E9ral \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgba(15, 23, 42, .45);\n}\n\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n\n  &__close {\n    font-size: 1.5rem;\n    line-height: 1;\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { color: var(--text-strong); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__section {\n    margin: 0;\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--brand);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.grid2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.check {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  font-size: var(--text-sm);\n  color: var(--text-normal);\n\n  input { width: auto; }\n}\n\n.mode-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-4);\n\n  .check { font-weight: 600; }\n}\n\n.spread-bar {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  .field { flex: 1; min-width: 130px; }\n}\n\n.inst-rows {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n\n.inst-row {\n  display: grid;\n  grid-template-columns: 1fr 110px 150px auto;\n  gap: var(--space-2);\n  align-items: center;\n}\n\n.balance-note {\n  font-size: var(--text-xs);\n  color: var(--text-muted);\n\n  &--bad { color: var(--warning); font-weight: 600; }\n}\n\n.hint-block {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.empty-state {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-6) var(--space-4);\n  text-align: center;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-card);\n\n  &__title {\n    margin: 0;\n    font-weight: 600;\n    color: var(--text-strong);\n  }\n\n  &__text {\n    margin: 0;\n    max-width: 460px;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n}\n\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FinanceConfigComponent, { className: "FinanceConfigComponent", filePath: "frontend/src/app/features/finance/finance-config.component.ts", lineNumber: 44 }); })();
//# sourceMappingURL=finance-config.component.js.map