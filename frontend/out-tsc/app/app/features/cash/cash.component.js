import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { CashService } from '@core/services/cash.service';
import { NotificationService } from '@core/services/notification.service';
import { AuthService } from '@core/auth/auth.service';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function CashComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1, "Chargement de la caisse\u2026");
    i0.ɵɵelementEnd();
} }
function CashComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 5)(1, "h2");
    i0.ɵɵtext(2, "La caisse est indisponible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Impossible de charger vos sessions.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 8);
    i0.ɵɵlistener("click", function CashComponent_Conditional_11_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵtext(6, "R\u00E9essayer");
    i0.ɵɵelementEnd()();
} }
function CashComponent_Conditional_12_Conditional_0_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 22);
    i0.ɵɵtext(1, "Acc\u00E9der aux encaissements");
    i0.ɵɵelementEnd();
} }
function CashComponent_Conditional_12_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 9)(1, "div")(2, "span", 20);
    i0.ɵɵtext(3, "Session ouverte");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Votre caisse est en service");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 21);
    i0.ɵɵtemplate(10, CashComponent_Conditional_12_Conditional_0_Conditional_10_Template, 2, 0, "a", 22);
    i0.ɵɵelementStart(11, "button", 8);
    i0.ɵɵlistener("click", function CashComponent_Conditional_12_Conditional_0_Template_button_click_11_listener() { const s_r5 = i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.startClose(s_r5)); });
    i0.ɵɵtext(12, "Cl\u00F4turer la caisse");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "div", 23)(14, "article")(15, "span");
    i0.ɵɵtext(16, "Fond de caisse initial");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "small");
    i0.ɵɵtext(21, "Montant d\u00E9clar\u00E9 \u00E0 l\u2019ouverture");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "article")(23, "span");
    i0.ɵɵtext(24, "Esp\u00E8ces encaiss\u00E9es");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "strong");
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "small");
    i0.ɵɵtext(29, "Paiements valid\u00E9s de la session");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "article", 24)(31, "span");
    i0.ɵɵtext(32, "Solde attendu en caisse");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "strong");
    i0.ɵɵtext(34);
    i0.ɵɵpipe(35, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "small");
    i0.ɵɵtext(37, "Fond initial + encaissements en esp\u00E8ces");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const s_r5 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("Ouverte le ", i0.ɵɵpipeBind2(8, 5, s_r5.openedAt, "dd/MM/yyyy \u00E0 HH:mm"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.auth.has("PAYMENT_VIEW") ? 10 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(19, 8, s_r5.openingBalance));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(27, 10, s_r5.cashReceived));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(35, 12, s_r5.expectedBalance));
} }
function CashComponent_Conditional_12_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 9)(1, "div")(2, "span", 25);
    i0.ɵɵtext(3, "Caisse ferm\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Pr\u00EAt pour une nouvelle session ?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "D\u00E9clarez le fond de caisse disponible avant de commencer vos encaissements.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 8);
    i0.ɵɵlistener("click", function CashComponent_Conditional_12_Conditional_1_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.startOpen()); });
    i0.ɵɵtext(9, "+ Ouvrir ma caisse");
    i0.ɵɵelementEnd()();
} }
function CashComponent_Conditional_12_For_46_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td", 26);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td")(10, "span", 25);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td");
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td")(22, "button", 27);
    i0.ɵɵpipe(23, "date");
    i0.ɵɵlistener("click", function CashComponent_Conditional_12_For_46_Template_button_click_22_listener() { const s_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.inspect(s_r8)); });
    i0.ɵɵtext(24, "Consulter \u2192");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const s_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("title", s_r8.reference);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r8.reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 13, s_r8.openedAt, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 16, s_r8.openedAt, "HH:mm"));
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("open", s_r8.status === "OPEN");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.labels[s_r8.status]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 19, s_r8.expectedBalance));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 21, s_r8.actualBalance));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("discrepancy", s_r8.difference !== null && s_r8.difference !== 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 23, s_r8.difference));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("aria-label", "Consulter la session du " + i0.ɵɵpipeBind2(23, 25, s_r8.openedAt, "dd/MM/yyyy HH:mm"));
} }
function CashComponent_Conditional_12_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "h3");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.sessions().length ? "Aucune session correspondante" : "Votre historique commence ici");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.sessions().length ? "Modifiez la recherche ou le statut s\u00E9lectionn\u00E9." : "Vos sessions appara\u00EEtront d\u00E8s la premi\u00E8re ouverture de caisse.");
} }
function CashComponent_Conditional_12_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "footer")(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 21)(4, "button", 3);
    i0.ɵɵlistener("click", function CashComponent_Conditional_12_Conditional_48_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.page.set(ctx_r1.page() - 1)); });
    i0.ɵɵtext(5, "Pr\u00E9c\u00E9dent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 3);
    i0.ɵɵlistener("click", function CashComponent_Conditional_12_Conditional_48_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.page.set(ctx_r1.page() + 1)); });
    i0.ɵɵtext(7, "Suivant");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Page ", ctx_r1.page(), " sur ", ctx_r1.pages(), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.page() === 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.page() === ctx_r1.pages());
} }
function CashComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵtemplate(0, CashComponent_Conditional_12_Conditional_0_Template, 38, 14)(1, CashComponent_Conditional_12_Conditional_1_Template, 10, 0, "section", 9);
    i0.ɵɵelementStart(2, "section", 6)(3, "div", 10)(4, "div")(5, "h2");
    i0.ɵɵtext(6, "Historique de mes sessions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8, "Retrouvez les soldes et les \u00E9carts de vos cl\u00F4tures.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 11)(12, "label");
    i0.ɵɵtext(13, "R\u00E9f\u00E9rence");
    i0.ɵɵelementStart(14, "input", 12);
    i0.ɵɵlistener("ngModelChange", function CashComponent_Conditional_12_Template_input_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.search.set($event); return i0.ɵɵresetView(ctx_r1.page.set(1)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "label");
    i0.ɵɵtext(16, "Statut");
    i0.ɵɵelementStart(17, "select", 13);
    i0.ɵɵlistener("ngModelChange", function CashComponent_Conditional_12_Template_select_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.status.set($event); return i0.ɵɵresetView(ctx_r1.page.set(1)); });
    i0.ɵɵelementStart(18, "option", 14);
    i0.ɵɵtext(19, "Tous les statuts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "option", 15);
    i0.ɵɵtext(21, "Ouverte");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "option", 16);
    i0.ɵɵtext(23, "Cl\u00F4tur\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "option", 17);
    i0.ɵɵtext(25, "Rapproch\u00E9e");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(26, "div", 18)(27, "table")(28, "thead")(29, "tr")(30, "th");
    i0.ɵɵtext(31, "Session");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "th");
    i0.ɵɵtext(33, "Ouverture");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "th");
    i0.ɵɵtext(35, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "th");
    i0.ɵɵtext(37, "Solde attendu");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "th");
    i0.ɵɵtext(39, "Montant compt\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "th");
    i0.ɵɵtext(41, "\u00C9cart");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "th");
    i0.ɵɵtext(43, "Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(44, "tbody");
    i0.ɵɵrepeaterCreate(45, CashComponent_Conditional_12_For_46_Template, 25, 28, "tr", null, _forTrack0);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(47, CashComponent_Conditional_12_Conditional_47_Template, 5, 2, "div", 19)(48, CashComponent_Conditional_12_Conditional_48_Template, 8, 4, "footer");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.current()) ? 0 : 1, tmp_1_0);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1("", ctx_r1.history().length, " session(s)");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.search());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r1.status());
    i0.ɵɵadvance(28);
    i0.ɵɵrepeater(ctx_r1.visible());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r1.history().length ? 47 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.history().length ? 48 : -1);
} }
function CashComponent_Conditional_13_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38)(1, "span");
    i0.ɵɵtext(2, "Solde attendu");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "money");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Comptez les esp\u00E8ces pr\u00E9sentes dans la caisse, fond initial compris. La cl\u00F4ture fige le solde de cette session.");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 1, ctx_r1.closing.expectedBalance));
} }
function CashComponent_Conditional_13_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38)(1, "span");
    i0.ɵɵtext(2, "\u00C9cart de caisse");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "money");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("discrepancy", ctx_r1.difference() !== 0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 3, ctx_r1.difference()));
} }
function CashComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "section", 28)(2, "header")(3, "h2", 29);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 30);
    i0.ɵɵlistener("click", function CashComponent_Conditional_13_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.modal.set(null)); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 31, 0);
    i0.ɵɵlistener("ngSubmit", function CashComponent_Conditional_13_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵelementStart(9, "fieldset", 32);
    i0.ɵɵtemplate(10, CashComponent_Conditional_13_Conditional_10_Template, 8, 3);
    i0.ɵɵelementStart(11, "label");
    i0.ɵɵtext(12);
    i0.ɵɵelementStart(13, "input", 33);
    i0.ɵɵtwoWayListener("ngModelChange", function CashComponent_Conditional_13_Template_input_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.amount, $event) || (ctx_r1.amount = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(14, CashComponent_Conditional_13_Conditional_14_Template, 6, 5, "div", 34);
    i0.ɵɵelementStart(15, "label");
    i0.ɵɵtext(16);
    i0.ɵɵelementStart(17, "textarea", 35);
    i0.ɵɵtwoWayListener("ngModelChange", function CashComponent_Conditional_13_Template_textarea_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.notes, $event) || (ctx_r1.notes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "footer")(19, "button", 36);
    i0.ɵɵlistener("click", function CashComponent_Conditional_13_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.modal.set(null)); });
    i0.ɵɵtext(20, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 37);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const mode_r11 = ctx;
    const cashForm_r12 = i0.ɵɵreference(8);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(mode_r11 === "open" ? "Ouvrir ma caisse" : "Cl\u00F4turer ma caisse");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵconditional(mode_r11 === "close" && ctx_r1.closing ? 10 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", mode_r11 === "open" ? "Fond de caisse initial (XOF)" : "Esp\u00E8ces compt\u00E9es (XOF)", " *");
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.amount);
    i0.ɵɵadvance();
    i0.ɵɵconditional(mode_r11 === "close" && ctx_r1.amount !== null ? 14 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(mode_r11 === "close" && ctx_r1.difference() !== 0 ? "Explication de l\u2019\u00E9cart *" : "Observations");
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.notes);
    i0.ɵɵproperty("required", mode_r11 === "close" && ctx_r1.difference() !== 0);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", cashForm_r12.invalid || !ctx_r1.validAmount() || mode_r11 === "close" && ctx_r1.difference() !== 0 && !ctx_r1.notes.trim());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.saving() ? "Enregistrement\u2026" : mode_r11 === "open" ? "Ouvrir la caisse" : "Confirmer la cl\u00F4ture");
} }
function CashComponent_Conditional_14_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "br");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
} if (rf & 2) {
    const s_r14 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Cl\u00F4ture : ", i0.ɵɵpipeBind2(2, 1, s_r14.closedAt, "dd/MM/yyyy HH:mm"), " ");
} }
function CashComponent_Conditional_14_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3");
    i0.ɵɵtext(1, "Observations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p", 44);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r14 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(s_r14.notes);
} }
function CashComponent_Conditional_14_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 43);
    i0.ɵɵtext(1, "Chargement des paiements\u2026");
    i0.ɵɵelementEnd();
} }
function CashComponent_Conditional_14_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 45);
    i0.ɵɵtext(1, "Impossible de charger les paiements.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 27);
    i0.ɵɵlistener("click", function CashComponent_Conditional_14_Conditional_53_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r15); const s_r14 = i0.ɵɵnextContext(); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.inspect(s_r14)); });
    i0.ɵɵtext(3, "R\u00E9essayer");
    i0.ɵɵelementEnd();
} }
function CashComponent_Conditional_14_Conditional_54_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementStart(3, "small");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "money");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const m_r16 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(m_r16.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", m_r16.reference, " \u00B7 ", i0.ɵɵpipeBind2(5, 5, m_r16.date, "dd/MM/yyyy"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.methods[m_r16.method] || m_r16.method);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 8, m_r16.amount));
} }
function CashComponent_Conditional_14_Conditional_54_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 19);
    i0.ɵɵtext(1, "Aucun paiement valid\u00E9 rattach\u00E9 \u00E0 cette session.");
    i0.ɵɵelementEnd();
} }
function CashComponent_Conditional_14_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18)(1, "table")(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "\u00C9l\u00E8ve / r\u00E9f\u00E9rence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th");
    i0.ɵɵtext(7, "Mode");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Montant");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "tbody");
    i0.ɵɵrepeaterCreate(11, CashComponent_Conditional_14_Conditional_54_For_12_Template, 11, 10, "tr", null, _forTrack0);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(13, CashComponent_Conditional_14_Conditional_54_Conditional_13_Template, 2, 0, "p", 19);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(11);
    i0.ɵɵrepeater(ctx_r1.movements());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r1.movements().length ? 13 : -1);
} }
function CashComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "section", 39)(2, "header")(3, "div")(4, "h2", 40);
    i0.ɵɵtext(5, "D\u00E9tail de la session");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 41);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 42);
    i0.ɵɵlistener("click", function CashComponent_Conditional_14_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selected.set(null)); });
    i0.ɵɵtext(9, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "span", 25);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "date");
    i0.ɵɵtemplate(15, CashComponent_Conditional_14_Conditional_15_Template, 3, 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "dl")(17, "div")(18, "dt");
    i0.ɵɵtext(19, "Fond initial");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "dd");
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "money");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div")(24, "dt");
    i0.ɵɵtext(25, "Esp\u00E8ces encaiss\u00E9es");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "dd");
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "money");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div")(30, "dt");
    i0.ɵɵtext(31, "Solde attendu");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "dd");
    i0.ɵɵtext(33);
    i0.ɵɵpipe(34, "money");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div")(36, "dt");
    i0.ɵɵtext(37, "Montant compt\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "dd");
    i0.ɵɵtext(39);
    i0.ɵɵpipe(40, "money");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "div")(42, "dt");
    i0.ɵɵtext(43, "\u00C9cart");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "dd");
    i0.ɵɵtext(45);
    i0.ɵɵpipe(46, "money");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(47, CashComponent_Conditional_14_Conditional_47_Template, 4, 1);
    i0.ɵɵelementStart(48, "h3");
    i0.ɵɵtext(49, "Paiements valid\u00E9s rattach\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "p");
    i0.ɵɵtext(51, "Seuls les paiements en esp\u00E8ces entrent dans le solde de caisse.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(52, CashComponent_Conditional_14_Conditional_52_Template, 2, 0, "p", 43)(53, CashComponent_Conditional_14_Conditional_53_Template, 4, 0)(54, CashComponent_Conditional_14_Conditional_54_Template, 14, 1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r14 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(s_r14.reference);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("open", s_r14.status === "OPEN");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.labels[s_r14.status]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Ouverture : ", i0.ɵɵpipeBind2(14, 15, s_r14.openedAt, "dd/MM/yyyy HH:mm"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(s_r14.closedAt ? 15 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 18, s_r14.openingBalance));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(28, 20, s_r14.cashReceived));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(34, 22, s_r14.expectedBalance));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(40, 24, s_r14.actualBalance));
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("discrepancy", s_r14.difference !== null && s_r14.difference !== 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(46, 26, s_r14.difference));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(s_r14.notes ? 47 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r1.movementsLoading() ? 52 : ctx_r1.movementsError() ? 53 : 54);
} }
export class CashComponent {
    service = inject(CashService);
    notifications = inject(NotificationService);
    destroyRef = inject(DestroyRef);
    auth = inject(AuthService);
    sessions = signal([]);
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    modal = signal(null);
    selected = signal(null);
    movements = signal([]);
    movementsLoading = signal(false);
    movementsError = signal(false);
    search = signal('');
    status = signal('');
    page = signal(1);
    current = computed(() => this.sessions().find(s => s.status === 'OPEN'));
    history = computed(() => this.sessions().filter(s => (!this.status() || s.status === this.status()) &&
        s.reference.toLowerCase().includes(this.search().toLowerCase())));
    pages = computed(() => Math.max(1, Math.ceil(this.history().length / 10)));
    visible = computed(() => this.history().slice((this.page() - 1) * 10, this.page() * 10));
    labels = { OPEN: 'Ouverte', CLOSED: 'Clôturée', RECONCILED: 'Rapprochée' };
    methods = { CASH: 'Espèces', BANK_TRANSFER: 'Virement', CARD: 'Carte', MOBILE_MONEY: 'Mobile Money', CHEQUE: 'Chèque', OTHER: 'Autre' };
    amount = null;
    notes = '';
    closing = null;
    constructor() { this.load(); }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.service.list().pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false))).subscribe({
            next: data => { this.sessions.set(data); this.page.set(Math.min(this.page(), this.pages())); }, error: () => this.error.set(true)
        });
    }
    startOpen() { this.amount = null; this.notes = ''; this.modal.set('open'); }
    startClose(s) { this.closing = s; this.amount = null; this.notes = ''; this.modal.set('close'); }
    validAmount() { return this.amount !== null && Number.isFinite(this.amount) && this.amount >= 0 && this.amount <= 9999999999999 && Number.isInteger(this.amount); }
    difference() { return this.amount === null || !this.closing ? null : this.amount - this.closing.expectedBalance; }
    submit() {
        if (!this.validAmount() || this.saving())
            return;
        if (this.modal() === 'close' && this.difference() !== 0 && !this.notes.trim())
            return;
        let request;
        if (this.modal() === 'open')
            request = this.service.open(this.amount, this.notes.trim());
        else if (this.closing)
            request = this.service.close(this.closing, this.amount, this.notes.trim());
        else
            return;
        this.saving.set(true);
        request.pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.saving.set(false))).subscribe({
            next: () => { this.notifications.success(this.modal() === 'open' ? 'La caisse est ouverte.' : 'La caisse est clôturée.'); this.modal.set(null); this.load(); },
            error: err => {
                this.notifications.error(err.status === 409 ? 'La session ou son solde a changé. Actualisez la caisse avant de recommencer.' : 'Opération impossible. Vérifiez les montants puis réessayez.');
                if (err.status === 409) {
                    this.modal.set(null);
                    this.load();
                }
            }
        });
    }
    inspect(session) {
        this.selected.set(session);
        this.movements.set([]);
        this.movementsLoading.set(true);
        this.movementsError.set(false);
        this.service.movements(session.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: items => { if (this.selected()?.id === session.id) {
                this.movements.set(items);
                this.movementsLoading.set(false);
            } },
            error: () => { if (this.selected()?.id === session.id) {
                this.movementsError.set(true);
                this.movementsLoading.set(false);
            } }
        });
    }
    static ɵfac = function CashComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CashComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CashComponent, selectors: [["eduops-cash"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 15, vars: 4, consts: [["cashForm", "ngForm"], [1, "heading"], [1, "eyebrow"], [1, "btn", 3, "click", "disabled"], ["role", "status", 1, "empty"], ["role", "alert", 1, "card", "empty"], [1, "card"], [1, "overlay"], [1, "btn", "btn--primary", 3, "click"], [1, "active-session"], [1, "section-heading"], [1, "filters"], ["type", "search", "placeholder", "Rechercher une session\u2026", 1, "input", 3, "ngModelChange", "ngModel"], [1, "input", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "OPEN"], ["value", "CLOSED"], ["value", "RECONCILED"], [1, "table-wrap"], [1, "empty"], [1, "badge", "open"], [1, "buttons"], ["routerLink", "/payments", 1, "btn"], [1, "metrics"], [1, "expected"], [1, "badge"], [1, "reference", 3, "title"], [1, "btn", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "cash-title", 1, "panel"], ["id", "cash-title"], ["aria-label", "Fermer", 1, "btn", 3, "click", "disabled"], [3, "ngSubmit"], [3, "disabled"], ["type", "number", "name", "amount", "required", "", "min", "0", "max", "9999999999999", "step", "1", "placeholder", "0", 1, "input", 3, "ngModelChange", "ngModel"], [1, "summary", 3, "discrepancy"], ["name", "notes", "rows", "4", "maxlength", "2000", "placeholder", "Pr\u00E9cisions sur la session\u2026", 1, "input", 3, "ngModelChange", "ngModel", "required"], ["type", "button", 1, "btn", 3, "click"], [1, "btn", "btn--primary", 3, "disabled"], [1, "summary"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "session-title", 1, "panel", "wide"], ["id", "session-title"], [1, "full-reference"], ["aria-label", "Fermer", 1, "btn", 3, "click"], ["role", "status"], [1, "notes"], ["role", "alert"]], template: function CashComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div")(2, "span", 2);
            i0.ɵɵtext(3, "FINANCE \u00B7 MES SESSIONS");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Caisse");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Ouvrez votre caisse, suivez les esp\u00E8ces et contr\u00F4lez le solde en fin de journ\u00E9e.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "button", 3);
            i0.ɵɵlistener("click", function CashComponent_Template_button_click_8_listener() { return ctx.load(); });
            i0.ɵɵtext(9, "Actualiser");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(10, CashComponent_Conditional_10_Template, 2, 0, "div", 4)(11, CashComponent_Conditional_11_Template, 7, 0, "section", 5)(12, CashComponent_Conditional_12_Template, 49, 6, "section", 6)(13, CashComponent_Conditional_13_Template, 23, 12, "div", 7)(14, CashComponent_Conditional_14_Template, 55, 28, "div", 7);
        } if (rf & 2) {
            let tmp_2_0;
            let tmp_3_0;
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading() ? 10 : ctx.error() ? 11 : 12);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_2_0 = ctx.modal()) ? 13 : -1, tmp_2_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_3_0 = ctx.selected()) ? 14 : -1, tmp_3_0);
        } }, dependencies: [CommonModule, i1.DatePipe, FormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.RequiredValidator, i2.MaxLengthValidator, i2.MinValidator, i2.MaxValidator, i2.NgModel, i2.NgForm, RouterLink, MoneyPipe], styles: ["[_nghost-%COMP%] { display: block; } h1[_ngcontent-%COMP%] { margin: 6px 0; } h2[_ngcontent-%COMP%] { margin: 0; font-size: 20px; } h3[_ngcontent-%COMP%] { font-size: 16px; } p[_ngcontent-%COMP%], small[_ngcontent-%COMP%] { color: var(--text-muted); line-height: 1.6; }.eyebrow[_ngcontent-%COMP%] { font-size: 11px; font-weight: 700; letter-spacing: 2px; color: var(--brand); }\n.heading[_ngcontent-%COMP%], .active-session[_ngcontent-%COMP%], .section-heading[_ngcontent-%COMP%], header[_ngcontent-%COMP%], footer[_ngcontent-%COMP%] { display:flex; align-items:center; justify-content:space-between; gap:20px; }.heading[_ngcontent-%COMP%] { margin-bottom:24px; }.buttons[_ngcontent-%COMP%] { display:flex; gap:10px; flex-wrap:wrap; }.card[_ngcontent-%COMP%] { background:var(--surface-card); border:1px solid var(--border); border-radius:12px; overflow:hidden; }\n.active-session[_ngcontent-%COMP%] { padding:26px; background:var(--surface-card); border:1px solid var(--border); border-left:4px solid var(--brand); border-radius:12px; margin-bottom:24px; }.active-session[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin-top:14px; }.active-session[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin-bottom:0; }.badge[_ngcontent-%COMP%] { display:inline-block; padding:5px 10px; background:var(--surface-sunken); color:var(--text-muted); border-radius:6px; font-size:12px; font-weight:600; }.badge.open[_ngcontent-%COMP%] { background:#e6f5ec; color:#216b44; }\n.metrics[_ngcontent-%COMP%] { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-bottom:28px; }.metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { padding:24px; background:var(--surface-card); border:1px solid var(--border); border-radius:12px; }.metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color:var(--text-muted); font-size:13px; }.metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display:block; font-size:26px; margin:14px 0 8px; }.metrics[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { font-size:12px; }.metrics[_ngcontent-%COMP%]   .expected[_ngcontent-%COMP%] { background:#edf3ff; border-color:#d5e2ff; }.expected[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color:var(--brand); }\n.section-heading[_ngcontent-%COMP%], .filters[_ngcontent-%COMP%], footer[_ngcontent-%COMP%] { padding:20px 24px; }.section-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin-bottom:0; }.section-heading[_ngcontent-%COMP%] > span[_ngcontent-%COMP%] { color:var(--text-muted); font-size:13px; }.filters[_ngcontent-%COMP%] { display:flex; gap:16px; background:var(--surface-sunken); }.filters[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:first-child { flex:1; } label[_ngcontent-%COMP%] { display:flex; flex-direction:column; gap:8px; font-size:13px; font-weight:600; }.input[_ngcontent-%COMP%] { width:100%; min-height:42px; } .table-wrap[_ngcontent-%COMP%] { overflow-x:auto; } table[_ngcontent-%COMP%] { width:100%; border-collapse:collapse; text-align:left; white-space:nowrap; } th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] { padding:16px; border-bottom:1px solid var(--border); font-size:13px; } th[_ngcontent-%COMP%] { font-size:12px; color:var(--text-muted); } small[_ngcontent-%COMP%] { display:block; margin-top:4px; }.reference[_ngcontent-%COMP%] { max-width:165px; overflow:hidden; text-overflow:ellipsis; }.discrepancy[_ngcontent-%COMP%] { color:#b44327; font-weight:700; }.empty[_ngcontent-%COMP%] { text-align:center; padding:42px 20px; }\n.overlay[_ngcontent-%COMP%] { position:fixed; inset:0; z-index:1000; background:#0f172a66; display:flex; justify-content:flex-end; }.panel[_ngcontent-%COMP%] { width:min(540px,100%); height:100%; overflow-y:auto; background:var(--surface-card); padding:28px; box-shadow:-8px 0 40px #0002; }.panel.wide[_ngcontent-%COMP%] { width:min(760px,100%); }.panel[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] { margin-bottom:26px; }.panel[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { margin:22px 0; }.panel[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] { padding:22px 0; }.summary[_ngcontent-%COMP%] { display:flex; justify-content:space-between; padding:18px; border-radius:8px; background:var(--surface-sunken); gap:16px; }.summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size:20px; } fieldset[_ngcontent-%COMP%] { border:0; padding:0; margin:0; min-width:0; } dl[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] { display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border); } dd[_ngcontent-%COMP%] { margin:0; font-weight:600; }.notes[_ngcontent-%COMP%] { white-space:pre-wrap; overflow-wrap:anywhere; }.full-reference[_ngcontent-%COMP%] { overflow-wrap:anywhere; font-size:12px; }\n@media(max-width:800px) { .heading[_ngcontent-%COMP%], .active-session[_ngcontent-%COMP%], .section-heading[_ngcontent-%COMP%] { align-items:flex-start; flex-direction:column; }.metrics[_ngcontent-%COMP%] { grid-template-columns:1fr; gap:12px; }.metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { padding:18px; }.filters[_ngcontent-%COMP%] { flex-direction:column; }.panel[_ngcontent-%COMP%] { padding:20px; }.summary[_ngcontent-%COMP%] { flex-wrap:wrap; } }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CashComponent, [{
        type: Component,
        args: [{ selector: 'eduops-cash', standalone: true, imports: [CommonModule, FormsModule, RouterLink, MoneyPipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"heading\"><div><span class=\"eyebrow\">FINANCE \u00B7 MES SESSIONS</span><h1>Caisse</h1><p>Ouvrez votre caisse, suivez les esp\u00E8ces et contr\u00F4lez le solde en fin de journ\u00E9e.</p></div><button class=\"btn\" [disabled]=\"loading()\" (click)=\"load()\">Actualiser</button></div>\n@if (loading()) { <div class=\"empty\" role=\"status\">Chargement de la caisse\u2026</div> }\n@else if (error()) { <section class=\"card empty\" role=\"alert\"><h2>La caisse est indisponible</h2><p>Impossible de charger vos sessions.</p><button class=\"btn btn--primary\" (click)=\"load()\">R\u00E9essayer</button></section> }\n@else {\n  @if (current(); as s) {\n    <section class=\"active-session\"><div><span class=\"badge open\">Session ouverte</span><h2>Votre caisse est en service</h2><p>Ouverte le {{ s.openedAt | date:'dd/MM/yyyy \u00E0 HH:mm' }}</p></div><div class=\"buttons\">@if (auth.has('PAYMENT_VIEW')) { <a class=\"btn\" routerLink=\"/payments\">Acc\u00E9der aux encaissements</a> }<button class=\"btn btn--primary\" (click)=\"startClose(s)\">Cl\u00F4turer la caisse</button></div></section>\n    <div class=\"metrics\"><article><span>Fond de caisse initial</span><strong>{{ s.openingBalance | money }}</strong><small>Montant d\u00E9clar\u00E9 \u00E0 l\u2019ouverture</small></article><article><span>Esp\u00E8ces encaiss\u00E9es</span><strong>{{ s.cashReceived | money }}</strong><small>Paiements valid\u00E9s de la session</small></article><article class=\"expected\"><span>Solde attendu en caisse</span><strong>{{ s.expectedBalance | money }}</strong><small>Fond initial + encaissements en esp\u00E8ces</small></article></div>\n  } @else {\n    <section class=\"active-session\"><div><span class=\"badge\">Caisse ferm\u00E9e</span><h2>Pr\u00EAt pour une nouvelle session ?</h2><p>D\u00E9clarez le fond de caisse disponible avant de commencer vos encaissements.</p></div><button class=\"btn btn--primary\" (click)=\"startOpen()\">+ Ouvrir ma caisse</button></section>\n  }\n  <section class=\"card\"><div class=\"section-heading\"><div><h2>Historique de mes sessions</h2><p>Retrouvez les soldes et les \u00E9carts de vos cl\u00F4tures.</p></div><span>{{ history().length }} session(s)</span></div>\n    <div class=\"filters\"><label>R\u00E9f\u00E9rence<input type=\"search\" class=\"input\" placeholder=\"Rechercher une session\u2026\" [ngModel]=\"search()\" (ngModelChange)=\"search.set($event); page.set(1)\"></label><label>Statut<select class=\"input\" [ngModel]=\"status()\" (ngModelChange)=\"status.set($event); page.set(1)\"><option value=\"\">Tous les statuts</option><option value=\"OPEN\">Ouverte</option><option value=\"CLOSED\">Cl\u00F4tur\u00E9e</option><option value=\"RECONCILED\">Rapproch\u00E9e</option></select></label></div>\n    <div class=\"table-wrap\"><table><thead><tr><th>Session</th><th>Ouverture</th><th>Statut</th><th>Solde attendu</th><th>Montant compt\u00E9</th><th>\u00C9cart</th><th>Actions</th></tr></thead><tbody>@for (s of visible(); track s.id) {\n      <tr><td class=\"reference\" [title]=\"s.reference\">{{ s.reference }}</td><td>{{ s.openedAt | date:'dd/MM/yyyy' }}<small>{{ s.openedAt | date:'HH:mm' }}</small></td><td><span class=\"badge\" [class.open]=\"s.status === 'OPEN'\">{{ labels[s.status] }}</span></td><td>{{ s.expectedBalance | money }}</td><td>{{ s.actualBalance | money }}</td><td [class.discrepancy]=\"s.difference !== null && s.difference !== 0\">{{ s.difference | money }}</td><td><button class=\"btn\" (click)=\"inspect(s)\" [attr.aria-label]=\"'Consulter la session du ' + (s.openedAt | date:'dd/MM/yyyy HH:mm')\">Consulter \u2192</button></td></tr>\n    }</tbody></table></div>\n    @if (!history().length) { <div class=\"empty\"><h3>{{ sessions().length ? 'Aucune session correspondante' : 'Votre historique commence ici' }}</h3><p>{{ sessions().length ? 'Modifiez la recherche ou le statut s\u00E9lectionn\u00E9.' : 'Vos sessions appara\u00EEtront d\u00E8s la premi\u00E8re ouverture de caisse.' }}</p></div> }\n    @if (history().length) { <footer><span>Page {{ page() }} sur {{ pages() }}</span><div class=\"buttons\"><button class=\"btn\" [disabled]=\"page() === 1\" (click)=\"page.set(page()-1)\">Pr\u00E9c\u00E9dent</button><button class=\"btn\" [disabled]=\"page() === pages()\" (click)=\"page.set(page()+1)\">Suivant</button></div></footer> }\n  </section>\n}\n@if (modal(); as mode) {\n  <div class=\"overlay\"><section class=\"panel\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"cash-title\"><header><h2 id=\"cash-title\">{{ mode === 'open' ? 'Ouvrir ma caisse' : 'Cl\u00F4turer ma caisse' }}</h2><button class=\"btn\" aria-label=\"Fermer\" [disabled]=\"saving()\" (click)=\"modal.set(null)\">\u2715</button></header>\n    <form #cashForm=\"ngForm\" (ngSubmit)=\"submit()\"><fieldset [disabled]=\"saving()\">\n      @if (mode === 'close' && closing) { <div class=\"summary\"><span>Solde attendu</span><strong>{{ closing.expectedBalance | money }}</strong></div><p>Comptez les esp\u00E8ces pr\u00E9sentes dans la caisse, fond initial compris. La cl\u00F4ture fige le solde de cette session.</p> }\n      <label>{{ mode === 'open' ? 'Fond de caisse initial (XOF)' : 'Esp\u00E8ces compt\u00E9es (XOF)' }} *<input class=\"input\" type=\"number\" name=\"amount\" required min=\"0\" max=\"9999999999999\" step=\"1\" [(ngModel)]=\"amount\" placeholder=\"0\"></label>\n      @if (mode === 'close' && amount !== null) { <div class=\"summary\" [class.discrepancy]=\"difference() !== 0\"><span>\u00C9cart de caisse</span><strong>{{ difference() | money }}</strong></div> }\n      <label>{{ mode === 'close' && difference() !== 0 ? 'Explication de l\u2019\u00E9cart *' : 'Observations' }}<textarea class=\"input\" name=\"notes\" rows=\"4\" maxlength=\"2000\" [(ngModel)]=\"notes\" [required]=\"mode === 'close' && difference() !== 0\" placeholder=\"Pr\u00E9cisions sur la session\u2026\"></textarea></label>\n      <footer><button type=\"button\" class=\"btn\" (click)=\"modal.set(null)\">Annuler</button><button class=\"btn btn--primary\" [disabled]=\"cashForm.invalid || !validAmount() || (mode === 'close' && difference() !== 0 && !notes.trim())\">{{ saving() ? 'Enregistrement\u2026' : mode === 'open' ? 'Ouvrir la caisse' : 'Confirmer la cl\u00F4ture' }}</button></footer>\n    </fieldset></form>\n  </section></div>\n}\n@if (selected(); as s) {\n  <div class=\"overlay\"><section class=\"panel wide\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"session-title\"><header><div><h2 id=\"session-title\">D\u00E9tail de la session</h2><p class=\"full-reference\">{{ s.reference }}</p></div><button class=\"btn\" aria-label=\"Fermer\" (click)=\"selected.set(null)\">\u2715</button></header>\n    <span class=\"badge\" [class.open]=\"s.status === 'OPEN'\">{{ labels[s.status] }}</span><p>Ouverture : {{ s.openedAt | date:'dd/MM/yyyy HH:mm' }}@if (s.closedAt) { <br>Cl\u00F4ture : {{ s.closedAt | date:'dd/MM/yyyy HH:mm' }} }</p>\n    <dl><div><dt>Fond initial</dt><dd>{{ s.openingBalance | money }}</dd></div><div><dt>Esp\u00E8ces encaiss\u00E9es</dt><dd>{{ s.cashReceived | money }}</dd></div><div><dt>Solde attendu</dt><dd>{{ s.expectedBalance | money }}</dd></div><div><dt>Montant compt\u00E9</dt><dd>{{ s.actualBalance | money }}</dd></div><div><dt>\u00C9cart</dt><dd [class.discrepancy]=\"s.difference !== null && s.difference !== 0\">{{ s.difference | money }}</dd></div></dl>\n    @if (s.notes) { <h3>Observations</h3><p class=\"notes\">{{ s.notes }}</p> }\n    <h3>Paiements valid\u00E9s rattach\u00E9s</h3><p>Seuls les paiements en esp\u00E8ces entrent dans le solde de caisse.</p>\n    @if (movementsLoading()) { <p role=\"status\">Chargement des paiements\u2026</p> } @else if (movementsError()) { <p role=\"alert\">Impossible de charger les paiements.</p><button class=\"btn\" (click)=\"inspect(s)\">R\u00E9essayer</button> } @else {\n      <div class=\"table-wrap\"><table><thead><tr><th>\u00C9l\u00E8ve / r\u00E9f\u00E9rence</th><th>Mode</th><th>Montant</th></tr></thead><tbody>@for (m of movements(); track m.id) { <tr><td>{{ m.studentName }}<small>{{ m.reference }} \u00B7 {{ m.date | date:'dd/MM/yyyy' }}</small></td><td>{{ methods[m.method] || m.method }}</td><td>{{ m.amount | money }}</td></tr> }</tbody></table></div>@if (!movements().length) { <p class=\"empty\">Aucun paiement valid\u00E9 rattach\u00E9 \u00E0 cette session.</p> }\n    }\n  </section></div>\n}\n", styles: [":host { display: block; } h1 { margin: 6px 0; } h2 { margin: 0; font-size: 20px; } h3 { font-size: 16px; } p, small { color: var(--text-muted); line-height: 1.6; }.eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2px; color: var(--brand); }\n.heading,.active-session,.section-heading,header,footer { display:flex; align-items:center; justify-content:space-between; gap:20px; }.heading { margin-bottom:24px; }.buttons { display:flex; gap:10px; flex-wrap:wrap; }.card { background:var(--surface-card); border:1px solid var(--border); border-radius:12px; overflow:hidden; }\n.active-session { padding:26px; background:var(--surface-card); border:1px solid var(--border); border-left:4px solid var(--brand); border-radius:12px; margin-bottom:24px; }.active-session h2 { margin-top:14px; }.active-session p { margin-bottom:0; }.badge { display:inline-block; padding:5px 10px; background:var(--surface-sunken); color:var(--text-muted); border-radius:6px; font-size:12px; font-weight:600; }.badge.open { background:#e6f5ec; color:#216b44; }\n.metrics { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-bottom:28px; }.metrics article { padding:24px; background:var(--surface-card); border:1px solid var(--border); border-radius:12px; }.metrics span { color:var(--text-muted); font-size:13px; }.metrics strong { display:block; font-size:26px; margin:14px 0 8px; }.metrics small { font-size:12px; }.metrics .expected { background:#edf3ff; border-color:#d5e2ff; }.expected strong { color:var(--brand); }\n.section-heading,.filters,footer { padding:20px 24px; }.section-heading p { margin-bottom:0; }.section-heading>span { color:var(--text-muted); font-size:13px; }.filters { display:flex; gap:16px; background:var(--surface-sunken); }.filters label:first-child { flex:1; } label { display:flex; flex-direction:column; gap:8px; font-size:13px; font-weight:600; }.input { width:100%; min-height:42px; } .table-wrap { overflow-x:auto; } table { width:100%; border-collapse:collapse; text-align:left; white-space:nowrap; } th,td { padding:16px; border-bottom:1px solid var(--border); font-size:13px; } th { font-size:12px; color:var(--text-muted); } small { display:block; margin-top:4px; }.reference { max-width:165px; overflow:hidden; text-overflow:ellipsis; }.discrepancy { color:#b44327; font-weight:700; }.empty { text-align:center; padding:42px 20px; }\n.overlay { position:fixed; inset:0; z-index:1000; background:#0f172a66; display:flex; justify-content:flex-end; }.panel { width:min(540px,100%); height:100%; overflow-y:auto; background:var(--surface-card); padding:28px; box-shadow:-8px 0 40px #0002; }.panel.wide { width:min(760px,100%); }.panel header { margin-bottom:26px; }.panel label { margin:22px 0; }.panel footer { padding:22px 0; }.summary { display:flex; justify-content:space-between; padding:18px; border-radius:8px; background:var(--surface-sunken); gap:16px; }.summary strong { font-size:20px; } fieldset { border:0; padding:0; margin:0; min-width:0; } dl>div { display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border); } dd { margin:0; font-weight:600; }.notes { white-space:pre-wrap; overflow-wrap:anywhere; }.full-reference { overflow-wrap:anywhere; font-size:12px; }\n@media(max-width:800px) { .heading,.active-session,.section-heading { align-items:flex-start; flex-direction:column; }.metrics { grid-template-columns:1fr; gap:12px; }.metrics article { padding:18px; }.filters { flex-direction:column; }.panel { padding:20px; }.summary { flex-wrap:wrap; } }\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CashComponent, { className: "CashComponent", filePath: "frontend/src/app/features/cash/cash.component.ts", lineNumber: 14 }); })();
//# sourceMappingURL=cash.component.js.map