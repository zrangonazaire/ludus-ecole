import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { FEE_DATA_SOURCE, FINANCE_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { ApprovalCircuitService } from '@core/services/approval-circuit.service';
import { DISCOUNT_LEVEL_LABELS, DISCOUNT_STATUS_LABELS } from '@core/models/discount-request.models';
import { PERMISSIONS } from '@core/models/auth.models';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.key;
const _forTrack1 = ($index, $item) => $item.id;
const _forTrack2 = ($index, $item) => $item.levelNumber;
const _forTrack3 = ($index, $item) => $item.userId;
const _c0 = () => [];
function DiscountsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Enregistrement\u2026 ");
} }
function DiscountsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Nouvelle demande ");
} }
function DiscountsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 8);
    i0.ɵɵlistener("retry", function DiscountsComponent_Conditional_9_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function DiscountsComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state");
} }
function DiscountsComponent_Conditional_11_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_11_Conditional_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openForm()); });
    i0.ɵɵtext(1, "Cr\u00E9er la premi\u00E8re demande");
    i0.ɵɵelementEnd();
} }
function DiscountsComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 5)(1, "div", 9);
    i0.ɵɵtext(2, "\u25EA");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Aucune demande de r\u00E9duction dans cette \u00E9cole pour le moment.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, DiscountsComponent_Conditional_11_Conditional_5_Template, 2, 0, "button", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r1.canRequest() ? 5 : -1);
} }
function DiscountsComponent_Conditional_12_For_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tabItem_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(tabItem_r5.key === "MINE" ? ctx_r1.countMine() : tabItem_r5.key === "PENDING" ? ctx_r1.countPending() : ctx_r1.requests().length);
} }
function DiscountsComponent_Conditional_12_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_12_For_2_Template_button_click_0_listener() { const tabItem_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.tab.set(tabItem_r5.key)); });
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, DiscountsComponent_Conditional_12_For_2_Conditional_2_Template, 2, 1, "span", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tabItem_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("tab-active", tabItem_r5.key === ctx_r1.tab());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", tabItem_r5.label, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(tabItem_r5.key === "MINE" && ctx_r1.countMine() || tabItem_r5.key === "PENDING" && ctx_r1.countPending() || tabItem_r5.key === "ALL" && ctx_r1.requests().length ? 2 : -1);
} }
function DiscountsComponent_Conditional_12_For_5_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const request_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("N\u00B0 ", request_r6.studentNumber, "");
} }
function DiscountsComponent_Conditional_12_For_5_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const request_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Soit ", ctx_r1.computedAmountLabel(request_r6), "");
} }
function DiscountsComponent_Conditional_12_For_5_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28)(1, "span", 25);
    i0.ɵɵtext(2, "Motif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 26);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const request_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(request_r6.reason);
} }
function DiscountsComponent_Conditional_12_For_5_For_33_Case_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u2713 ");
} }
function DiscountsComponent_Conditional_12_For_5_For_33_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u2715 ");
} }
function DiscountsComponent_Conditional_12_For_5_For_33_Case_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const level_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", level_r7.levelNumber, " ");
} }
function DiscountsComponent_Conditional_12_For_5_For_33_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵtext(1, "Palier en attente de votre d\u00E9cision");
    i0.ɵɵelementEnd();
} }
function DiscountsComponent_Conditional_12_For_5_For_33_For_12_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "date");
} if (rf & 2) {
    const member_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", i0.ɵɵpipeBind2(1, 1, member_r8.decidedAt, "dd/MM/yyyy HH:mm"), " ");
} }
function DiscountsComponent_Conditional_12_For_5_For_33_For_12_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const member_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u2014 ", member_r8.comment, " ");
} }
function DiscountsComponent_Conditional_12_For_5_For_33_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, DiscountsComponent_Conditional_12_For_5_For_33_For_12_Conditional_2_Template, 2, 4)(3, DiscountsComponent_Conditional_12_For_5_For_33_For_12_Conditional_3_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const member_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", member_r8.name, " : ", member_r8.decision === "APPROVED" ? "Valid\u00E9" : member_r8.decision === "REJECTED" ? "Refus\u00E9" : "En attente", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(member_r8.decidedAt ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(member_r8.comment ? 3 : -1);
} }
function DiscountsComponent_Conditional_12_For_5_For_33_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Valid\u00E9 par ", level_r7.approverName, "");
} }
function DiscountsComponent_Conditional_12_For_5_For_33_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u00AB ", level_r7.comment, " \u00BB");
} }
function DiscountsComponent_Conditional_12_For_5_For_33_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 49)(1, "button", 50);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_12_For_5_For_33_Conditional_15_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r9); const request_r6 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.askDecision(request_r6)); });
    i0.ɵɵtext(2, "Valider");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 51);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_12_For_5_For_33_Conditional_15_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r9); const request_r6 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.askDecision(request_r6)); });
    i0.ɵɵtext(4, "Refuser");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.savingDecision());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.savingDecision());
} }
function DiscountsComponent_Conditional_12_For_5_For_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 41)(1, "div", 42);
    i0.ɵɵtemplate(2, DiscountsComponent_Conditional_12_For_5_For_33_Case_2_Template, 1, 0)(3, DiscountsComponent_Conditional_12_For_5_For_33_Case_3_Template, 1, 0)(4, DiscountsComponent_Conditional_12_For_5_For_33_Case_4_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 43)(6, "div", 44);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 45);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, DiscountsComponent_Conditional_12_For_5_For_33_Conditional_10_Template, 2, 0, "div", 46);
    i0.ɵɵrepeaterCreate(11, DiscountsComponent_Conditional_12_For_5_For_33_For_12_Template, 4, 4, "div", 47, _forTrack3);
    i0.ɵɵtemplate(13, DiscountsComponent_Conditional_12_For_5_For_33_Conditional_13_Template, 2, 1, "div", 47)(14, DiscountsComponent_Conditional_12_For_5_For_33_Conditional_14_Template, 2, 1, "div", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, DiscountsComponent_Conditional_12_For_5_For_33_Conditional_15_Template, 5, 2, "div", 49);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_24_0;
    let tmp_28_0;
    const level_r7 = ctx.$implicit;
    const request_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("level-current", level_r7.levelNumber === request_r6.currentLevel && request_r6.status === "SUBMITTED")("level-done", level_r7.status === "APPROVED")("level-rejected", level_r7.status === "REJECTED");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_24_0 = level_r7.status) === "APPROVED" ? 2 : tmp_24_0 === "REJECTED" ? 3 : 4);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", level_r7.levelNumber, ". ", level_r7.name, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r7.roleLabel || level_r7.roleCode);
    i0.ɵɵadvance();
    i0.ɵɵconditional(level_r7.status === "PENDING" && level_r7.levelNumber === request_r6.currentLevel && request_r6.awaitingMyDecision ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵrepeater((tmp_28_0 = level_r7.members) !== null && tmp_28_0 !== undefined ? tmp_28_0 : i0.ɵɵpureFunction0(14, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(level_r7.approverName ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(level_r7.comment ? 14 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(level_r7.levelNumber === request_r6.currentLevel && request_r6.awaitingMyDecision ? 15 : -1);
} }
function DiscountsComponent_Conditional_12_For_5_Conditional_35_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Application\u2026 ");
} }
function DiscountsComponent_Conditional_12_For_5_Conditional_35_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Rendre la r\u00E9duction effective ");
} }
function DiscountsComponent_Conditional_12_For_5_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 52);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_12_For_5_Conditional_35_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const request_r6 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.apply(request_r6)); });
    i0.ɵɵtemplate(1, DiscountsComponent_Conditional_12_For_5_Conditional_35_Conditional_1_Template, 1, 0)(2, DiscountsComponent_Conditional_12_For_5_Conditional_35_Conditional_2_Template, 1, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const request_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("btn-loading", ctx_r1.applying() === request_r6.id);
    i0.ɵɵproperty("disabled", ctx_r1.applying() === request_r6.id);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.applying() === request_r6.id ? 1 : 2);
} }
function DiscountsComponent_Conditional_12_For_5_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const request_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("R\u00E9duction appliqu\u00E9e le ", ctx_r1.effectiveAtLabel(request_r6), ".");
} }
function DiscountsComponent_Conditional_12_For_5_Conditional_37_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const request_r6 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵtextInterpolate1(" Refus\u00E9 : ", request_r6.rejectionReason, " ");
} }
function DiscountsComponent_Conditional_12_For_5_Conditional_37_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Demande refus\u00E9e. ");
} }
function DiscountsComponent_Conditional_12_For_5_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵtemplate(1, DiscountsComponent_Conditional_12_For_5_Conditional_37_Conditional_1_Template, 1, 1)(2, DiscountsComponent_Conditional_12_For_5_Conditional_37_Conditional_2_Template, 1, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const request_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵconditional(request_r6.rejectionReason ? 1 : 2);
} }
function DiscountsComponent_Conditional_12_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 18)(1, "div", 19)(2, "div", 20)(3, "span", 21);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 22);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 23)(10, "div", 24)(11, "span", 25);
    i0.ɵɵtext(12, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 26);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, DiscountsComponent_Conditional_12_For_5_Conditional_15_Template, 2, 1, "span", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 24)(17, "span", 25);
    i0.ɵɵtext(18, "R\u00E9duction");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 26);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, DiscountsComponent_Conditional_12_For_5_Conditional_21_Template, 2, 1, "span", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(22, DiscountsComponent_Conditional_12_For_5_Conditional_22_Template, 5, 1, "div", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 29)(24, "div", 30)(25, "span", 31);
    i0.ɵɵtext(26, "Circuit de validation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span", 32);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 33);
    i0.ɵɵelement(30, "div", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "ol", 35);
    i0.ɵɵrepeaterCreate(32, DiscountsComponent_Conditional_12_For_5_For_33_Template, 16, 15, "li", 36, _forTrack2);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div", 37);
    i0.ɵɵtemplate(35, DiscountsComponent_Conditional_12_For_5_Conditional_35_Template, 3, 4, "button", 38)(36, DiscountsComponent_Conditional_12_For_5_Conditional_36_Template, 2, 1, "div", 39)(37, DiscountsComponent_Conditional_12_For_5_Conditional_37_Template, 3, 1, "div", 40);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const request_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("request-card-closed", request_r6.status !== "SUBMITTED");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(request_r6.reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(request_r6.label);
    i0.ɵɵadvance();
    i0.ɵɵclassMapInterpolate1("status-pill status-", request_r6.status, "");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.statusLabel(request_r6));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(request_r6.studentName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(request_r6.studentNumber ? 15 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.valueLabel(request_r6));
    i0.ɵɵadvance();
    i0.ɵɵconditional(request_r6.computedAmount != null ? 21 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(request_r6.reason ? 22 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r1.progressPercent(request_r6), "% valid\u00E9");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r1.progressPercent(request_r6), "%");
    i0.ɵɵclassProp("progress-fill-done", request_r6.status === "EFFECTIVE");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(request_r6.levels);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(request_r6.status === "APPROVED" && !request_r6.effectiveAt ? 35 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(request_r6.effectiveAt ? 36 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(request_r6.status === "REJECTED" ? 37 : -1);
} }
function DiscountsComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵrepeaterCreate(1, DiscountsComponent_Conditional_12_For_2_Template, 3, 4, "button", 13, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul", 14);
    i0.ɵɵrepeaterCreate(4, DiscountsComponent_Conditional_12_For_5_Template, 38, 21, "li", 15, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.tabs);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.visible());
} }
function DiscountsComponent_Conditional_13_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.formError());
} }
function DiscountsComponent_Conditional_13_Conditional_13_For_2_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const student_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", student_r13.classroomName, " ");
} }
function DiscountsComponent_Conditional_13_Conditional_13_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "button", 84);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_13_Conditional_13_For_2_Template_button_click_1_listener() { const student_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.selectStudent(student_r13)); });
    i0.ɵɵelementStart(2, "span", 85);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 86);
    i0.ɵɵtext(5);
    i0.ɵɵtemplate(6, DiscountsComponent_Conditional_13_Conditional_13_For_2_Conditional_6_Template, 1, 1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const student_r13 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(student_r13.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", student_r13.studentNumber, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(student_r13.classroomName ? 6 : -1);
} }
function DiscountsComponent_Conditional_13_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 62);
    i0.ɵɵrepeaterCreate(1, DiscountsComponent_Conditional_13_Conditional_13_For_2_Template, 7, 3, "li", null, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.studentResults());
} }
function DiscountsComponent_Conditional_13_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 63)(1, "span", 26);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 87);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_13_Conditional_14_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.clearStudent()); });
    i0.ɵɵtext(4, "Retirer");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.selectedStudentName());
} }
function DiscountsComponent_Conditional_13_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Pourcentage (\u2264 100 %) ");
} }
function DiscountsComponent_Conditional_13_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Montant ");
} }
function DiscountsComponent_Conditional_13_For_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 78);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r15 = ctx.$implicit;
    i0.ɵɵproperty("value", c_r15.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", c_r15.code, " \u2014 ", c_r15.name, "");
} }
function DiscountsComponent_Conditional_13_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 75);
    i0.ɵɵtext(1, "Cr\u00E9ez un circuit \u00AB R\u00E9ductions \u00BB dans Configuration syst\u00E8me avant de soumettre.");
    i0.ɵɵelementEnd();
} }
function DiscountsComponent_Conditional_13_For_53_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 88);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r16 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(m_r16.fullName || m_r16.username);
} }
function DiscountsComponent_Conditional_13_For_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(2, DiscountsComponent_Conditional_13_For_53_For_3_Template, 2, 1, "span", 88, _forTrack1);
} if (rf & 2) {
    const l_r17 = ctx.$implicit;
    const $index_r18 = ctx.$index;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3("", $index_r18 + 1, ". ", l_r17.name, " \u2014 ", l_r17.mode === "ALL" ? "Tous les membres" : "Un seul membre suffit", "");
    i0.ɵɵadvance();
    i0.ɵɵrepeater(l_r17.members);
} }
function DiscountsComponent_Conditional_13_For_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 78);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const fee_r19 = ctx.$implicit;
    i0.ɵɵproperty("value", fee_r19.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(fee_r19.name);
} }
function DiscountsComponent_Conditional_13_Conditional_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Envoi\u2026 ");
} }
function DiscountsComponent_Conditional_13_Conditional_80_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Envoyer dans le circuit ");
} }
function DiscountsComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 53);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_13_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeForm()); });
    i0.ɵɵelementStart(1, "div", 54);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_13_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r11); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "header", 55)(3, "h2");
    i0.ɵɵtext(4, "Nouvelle demande de r\u00E9duction");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 56);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_13_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeForm()); });
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, DiscountsComponent_Conditional_13_Conditional_7_Template, 2, 1, "div", 57);
    i0.ɵɵelementStart(8, "div", 58)(9, "label", 59);
    i0.ɵɵtext(10, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 60)(12, "input", 61);
    i0.ɵɵlistener("ngModelChange", function DiscountsComponent_Conditional_13_Template_input_ngModelChange_12_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.searchStudents($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, DiscountsComponent_Conditional_13_Conditional_13_Template, 3, 0, "ul", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, DiscountsComponent_Conditional_13_Conditional_14_Template, 5, 1, "div", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 64)(16, "div", 58)(17, "label", 59);
    i0.ɵɵtext(18, "Type de r\u00E9duction");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 65)(20, "label", 66)(21, "input", 67);
    i0.ɵɵlistener("ngModelChange", function DiscountsComponent_Conditional_13_Template_input_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.formKind.set($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23, "Pourcentage");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "label", 66)(25, "input", 68);
    i0.ɵɵlistener("ngModelChange", function DiscountsComponent_Conditional_13_Template_input_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.formKind.set($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span");
    i0.ɵɵtext(27, "Montant fixe");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(28, "div", 58)(29, "label", 69);
    i0.ɵɵtemplate(30, DiscountsComponent_Conditional_13_Conditional_30_Template, 1, 0)(31, DiscountsComponent_Conditional_13_Conditional_31_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "input", 70);
    i0.ɵɵlistener("ngModelChange", function DiscountsComponent_Conditional_13_Template_input_ngModelChange_32_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.formValue.set($event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(33, "div", 58)(34, "label", 71);
    i0.ɵɵtext(35, "Intitul\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "input", 72);
    i0.ɵɵlistener("ngModelChange", function DiscountsComponent_Conditional_13_Template_input_ngModelChange_36_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.formLabel.set($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "div", 58)(38, "label", 73);
    i0.ɵɵtext(39, "Motif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "textarea", 74);
    i0.ɵɵlistener("ngModelChange", function DiscountsComponent_Conditional_13_Template_textarea_ngModelChange_40_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.formReason.set($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "div", 58)(42, "label", 59);
    i0.ɵɵtext(43, "Circuit de validation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "p", 75);
    i0.ɵɵtext(45, "Chaque niveau est valid\u00E9 dans l\u2019ordre. La r\u00E9duction n\u2019est appliqu\u00E9e qu\u2019apr\u00E8s le dernier.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "select", 76);
    i0.ɵɵlistener("ngModelChange", function DiscountsComponent_Conditional_13_Template_select_ngModelChange_46_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.circuitId.set($event)); });
    i0.ɵɵelementStart(47, "option", 77);
    i0.ɵɵtext(48, "\u2014 Choisir un circuit \u2014");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(49, DiscountsComponent_Conditional_13_For_50_Template, 2, 3, "option", 78, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(51, DiscountsComponent_Conditional_13_Conditional_51_Template, 2, 0, "p", 75);
    i0.ɵɵrepeaterCreate(52, DiscountsComponent_Conditional_13_For_53_Template, 4, 3, null, null, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "div", 58)(55, "label", 79);
    i0.ɵɵtext(56, "Frais concern\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "select", 80);
    i0.ɵɵlistener("ngModelChange", function DiscountsComponent_Conditional_13_Template_select_ngModelChange_57_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.feeTypeId.set($event)); });
    i0.ɵɵelementStart(58, "option", 77);
    i0.ɵɵtext(59, "Tous les frais restant dus");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(60, DiscountsComponent_Conditional_13_For_61_Template, 2, 2, "option", 78, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "p", 75);
    i0.ɵɵtext(63, "Le montant est limit\u00E9 au solde restant d\u00FB. La derni\u00E8re validation applique automatiquement la r\u00E9duction.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(64, "div", 81)(65, "div", 82)(66, "span");
    i0.ɵɵtext(67, "R\u00E9duction");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "strong");
    i0.ɵɵtext(69);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(70, "div", 82)(71, "span");
    i0.ɵɵtext(72, "Circuit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "span");
    i0.ɵɵtext(74);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(75, "footer", 83)(76, "button", 11);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_13_Template_button_click_76_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeForm()); });
    i0.ɵɵtext(77, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "button", 3);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_13_Template_button_click_78_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitRequest()); });
    i0.ɵɵtemplate(79, DiscountsComponent_Conditional_13_Conditional_79_Template, 1, 0)(80, DiscountsComponent_Conditional_13_Conditional_80_Template, 1, 0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵconditional(ctx_r1.formError() ? 7 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r1.studentSearch());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.studentResults().length > 0 ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.formStudentId() ? 14 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r1.formKind());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.formKind());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("for", "value-" + ctx_r1.formKind());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.formKind() === "PERCENTAGE" ? 30 : 31);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "value-" + ctx_r1.formKind())("ngModel", ctx_r1.formValue());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.formLabel());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.formReason());
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r1.circuitId());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.circuits());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r1.circuits().length ? 51 : -1);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.formLevels());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r1.feeTypeId());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.feeTypes());
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r1.valueLabel(ctx_r1.formPreviewRequest()));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r1.formLevels().length, " niveau(s) : ", ctx_r1.formPreviewLevelNames(), "");
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("btn-loading", ctx_r1.submitting());
    i0.ɵɵproperty("disabled", ctx_r1.submitting());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.submitting() ? 79 : 80);
} }
function DiscountsComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 89);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_14_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancelDecision()); });
    i0.ɵɵelementStart(1, "div", 90);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_14_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r20); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "header", 91)(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 56);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_14_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancelDecision()); });
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 92)(8, "p", 93);
    i0.ɵɵtext(9, "Vous tranchez le niveau ");
    i0.ɵɵelementStart(10, "strong");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12, ".");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 94)(14, "button", 95);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_14_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmDecision("APPROVE")); });
    i0.ɵɵelementStart(15, "span", 96);
    i0.ɵɵtext(16, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18, "Valider le palier");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "button", 97);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_14_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmDecision("REJECT")); });
    i0.ɵɵelementStart(20, "span", 96);
    i0.ɵɵtext(21, "\u2715");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23, "Refuser le palier");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "label", 98);
    i0.ɵɵtext(25, "Motif (obligatoire en cas de refus)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "textarea", 99);
    i0.ɵɵlistener("ngModelChange", function DiscountsComponent_Conditional_14_Template_textarea_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.decisionComment.set($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "footer", 100)(28, "button", 11);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_14_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancelDecision()); });
    i0.ɵɵtext(29, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 3);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_14_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmDecision("APPROVE")); });
    i0.ɵɵtext(31, "Valider le palier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "button", 101);
    i0.ɵɵlistener("click", function DiscountsComponent_Conditional_14_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmDecision("REJECT")); });
    i0.ɵɵtext(33, "Refuser");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("D\u00E9cision : ", ctx_r1.deciding().reference, "");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.currentLevelLabel(ctx_r1.deciding()));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.savingDecision());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r1.savingDecision());
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r1.decisionComment());
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("btn-loading", ctx_r1.savingDecision());
    i0.ɵɵproperty("disabled", ctx_r1.savingDecision());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("btn-loading", ctx_r1.savingDecision());
    i0.ɵɵproperty("disabled", ctx_r1.savingDecision());
} }
/**
 * Réductions de scolarité : demander, suivre le circuit, décider.
 *
 * <p>L'écran est bâti autour d'une seule idée : on ne voit d'abord que ce
 * qui attend une décision. La chaîne de validation est dessinée sur chaque
 * demande, le palier courant en évidence, et les boutons Valider / Refuser
 * n'apparaissent que si le palier appartient au profil du lecteur — le
 * serveur reste seul juge, mais on ne propose pas un geste sans effet.</p>
 */
export class DiscountsComponent {
    finance = inject(FINANCE_DATA_SOURCE);
    students = inject(STUDENT_DATA_SOURCE);
    circuitsService = inject(ApprovalCircuitService);
    fees = inject(FEE_DATA_SOURCE);
    notifications = inject(NotificationService);
    auth = inject(AuthService);
    destroyRef = inject(DestroyRef);
    moneyPipe = new MoneyPipe();
    requests = signal([]);
    loading = signal(true);
    error = signal(false);
    tab = signal('MINE');
    circuits = signal([]);
    feeTypes = signal([]);
    circuitId = signal('');
    feeTypeId = signal('');
    selectedCircuit = computed(() => this.circuits().find(c => c.id === this.circuitId()));
    tabs = [
        { key: 'MINE', label: 'À valider par moi' },
        { key: 'PENDING', label: 'En circuit' },
        { key: 'ALL', label: 'Toutes les demandes' }
    ];
    countMine = computed(() => this.requests().filter((r) => r.awaitingMyDecision).length);
    countPending = computed(() => this.requests().filter((r) => r.status === 'SUBMITTED').length);
    countToApply = computed(() => this.requests().filter((r) => r.status === 'APPROVED').length);
    visible = computed(() => {
        const rows = [...this.requests()].sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
        switch (this.tab()) {
            case 'MINE': return rows.filter((r) => r.awaitingMyDecision);
            case 'PENDING': return rows.filter((r) => r.status === 'SUBMITTED');
            default: return rows;
        }
    });
    canRequest = computed(() => this.auth.hasAny(PERMISSIONS.DISCOUNT_REQUEST_MANAGE));
    // formulaire
    formOpen = signal(false);
    submitting = signal(false);
    formError = signal('');
    studentSearch = signal('');
    studentResults = signal([]);
    formStudentId = signal('');
    selectedStudentName = signal('');
    formLabel = signal('');
    formReason = signal('');
    formKind = signal('PERCENTAGE');
    formValue = signal(null);
    formLevels = computed(() => (this.selectedCircuit()?.levels ?? [])
        .map(l => ({ name: l.code, roleCode: '', mode: l.mode, members: l.members })));
    studentQuery$ = new Subject();
    // décision
    deciding = signal(null);
    decisionComment = signal('');
    savingDecision = signal(false);
    applying = signal(null);
    ngOnInit() {
        this.circuitsService.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: rows => { this.circuits.set(rows.filter(c => c.usage === 'DISCOUNT')); this.circuitId.set(this.circuits()[0]?.id ?? ''); },
            error: () => this.notifications.error('Chargement des circuits impossible. Réessayez avant de soumettre.')
        });
        this.fees.listTypes().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: rows => this.feeTypes.set(rows),
            error: () => this.notifications.error('Chargement des types de frais impossible.')
        });
        this.studentQuery$
            .pipe(debounceTime(220), distinctUntilChanged(), switchMap((term) => this.students.search({ page: 0, size: 8, search: term.trim() })
            .pipe(catchError(() => of(null)))), takeUntilDestroyed(this.destroyRef))
            .subscribe((page) => this.studentResults.set(page?.content ?? []));
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.finance.discountRequests().pipe(takeUntilDestroyed(this.destroyRef), catchError(() => {
            this.error.set(true);
            return of([]);
        })).subscribe((rows) => {
            this.requests.set(rows);
            this.loading.set(false);
        });
    }
    openForm() {
        this.formOpen.set(true);
        this.formError.set('');
        this.formLabel.set('');
        this.formReason.set('');
        this.formKind.set('PERCENTAGE');
        this.formValue.set(null);
        this.feeTypeId.set('');
        this.formStudentId.set('');
        this.selectedStudentName.set('');
        this.studentSearch.set('');
        this.studentResults.set([]);
    }
    closeForm() {
        this.formOpen.set(false);
    }
    searchStudents(term) {
        this.studentSearch.set(term);
        if (term.trim().length < 2) {
            this.studentResults.set([]);
            return;
        }
        this.studentQuery$.next(term);
    }
    selectStudent(student) {
        this.formStudentId.set(student.id);
        this.selectedStudentName.set(student.fullName);
        this.studentSearch.set(`${student.fullName} — ${student.studentNumber}`);
        this.studentResults.set([]);
    }
    clearStudent() {
        this.formStudentId.set('');
        this.studentSearch.set('');
        this.studentResults.set([]);
        this.selectedStudentName.set('');
    }
    submitRequest() {
        if (!this.formStudentId()) {
            this.formError.set('Choisissez l’élève concerné.');
            return;
        }
        if (!this.formLabel().trim()) {
            this.formError.set('Donnez un intitulé : il apparaîtra dans l’historique.');
            return;
        }
        const value = Number(this.formValue());
        if (!Number.isFinite(value) || value <= 0) {
            this.formError.set('La valeur de la réduction doit être strictement positive.');
            return;
        }
        if (this.formKind() === 'PERCENTAGE' && value > 100) {
            this.formError.set('Un pourcentage ne peut dépasser 100.');
            return;
        }
        if (!this.selectedCircuit()) {
            this.formError.set('Choisissez un circuit enregistré dans Configuration système.');
            return;
        }
        this.submitting.set(true);
        this.formError.set('');
        this.finance.createDiscountRequest({
            studentId: this.formStudentId(),
            label: this.formLabel().trim(),
            reason: this.formReason().trim() || undefined,
            discountType: this.formKind(),
            value,
            circuitId: this.circuitId(),
            feeTypeId: this.feeTypeId() || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (created) => {
                this.submitting.set(false);
                this.formOpen.set(false);
                this.notifications.success(`Demande ${created.reference} envoyée à « ${this.formLevels()[0]?.name ?? '…'} ».`, 'Demande enregistrée');
                this.load();
            },
            error: (err) => {
                this.submitting.set(false);
                this.formError.set(err?.error?.message ?? 'Enregistrement impossible.');
            }
        });
    }
    askDecision(request) {
        this.deciding.set(request);
        this.decisionComment.set('');
    }
    cancelDecision() {
        this.deciding.set(null);
    }
    confirmDecision(decision) {
        const request = this.deciding();
        if (!request) {
            return;
        }
        if (decision === 'REJECT' && !this.decisionComment().trim()) {
            this.notifications.error('Indiquez le motif du refus.', 'Motif requis');
            return;
        }
        this.savingDecision.set(true);
        const payload = {
            decision,
            comment: this.decisionComment().trim() || undefined
        };
        this.finance.decideDiscountRequest(request.id, payload)
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (updated) => {
                this.savingDecision.set(false);
                this.deciding.set(null);
                this.notifications.success(decision === 'APPROVE'
                    ? (updated.status === 'SUBMITTED'
                        ? `Palier validé. En attente de « ${this.currentLevelLabel(updated)} ».`
                        : 'Tous les paliers sont validés : la réduction est appliquée.')
                    : `Demande ${updated.reference} refusée.`, decision === 'APPROVE' ? 'Validation enregistrée' : 'Demande refusée');
                this.load();
            },
            error: (err) => {
                this.savingDecision.set(false);
                this.notifications.error(err?.error?.message ?? 'Décision impossible.', 'Refusé');
            }
        });
    }
    apply(request) {
        this.applying.set(request.id);
        this.finance.applyDiscountRequest(request.id)
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.applying.set(null);
                this.notifications.success('Les échéances de l’élève portent désormais la réduction.', 'Réduction appliquée');
                this.load();
            },
            error: (err) => {
                this.applying.set(null);
                this.notifications.error(err?.error?.message ?? 'Application impossible.', 'Refusé');
            }
        });
    }
    // affichage
    statusLabel(request) {
        return DISCOUNT_STATUS_LABELS[request.status];
    }
    levelLabel(status) {
        return DISCOUNT_LEVEL_LABELS[status];
    }
    canDecide(request) {
        return !!request.awaitingMyDecision;
    }
    currentLevelLabel(request) {
        return request.levels
            .find((l) => l.levelNumber === request.currentLevel)
            ?.name ?? '…';
    }
    valueLabel(request) {
        return request.discountType === 'PERCENTAGE'
            ? `${request.value} %`
            : this.moneyPipe.transform(request.value);
    }
    computedAmountLabel(request) {
        const amount = request.computedAmount ?? request.value;
        return this.moneyPipe.transform(amount);
    }
    effectiveAtLabel(request) {
        return request.effectiveAt ? new Date(request.effectiveAt).toLocaleString('fr-FR') : '';
    }
    progressPercent(request) {
        const done = request.levels.filter((l) => l.status === 'APPROVED').length;
        if (request.status === 'EFFECTIVE') {
            return 100;
        }
        if (request.status === 'REJECTED') {
            return 0;
        }
        return Math.round((done / request.totalLevels) * 100);
    }
    formPreviewRequest() {
        return {
            discountType: this.formKind(),
            value: this.formValue() ?? 0,
            levels: this.formLevels(),
            status: 'SUBMITTED',
            currentLevel: 1,
            totalLevels: this.formLevels().length
        };
    }
    formPreviewLevelNames() {
        return this.formLevels().map((l) => l.name).join(' → ');
    }
    static ɵfac = function DiscountsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DiscountsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DiscountsComponent, selectors: [["eduops-discounts"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 15, vars: 7, consts: [[1, "discounts"], [1, "page-actions"], [1, "page-sub"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["title", "Impossible de charger les demandes"], [1, "empty"], [1, "form-overlay"], [1, "modal-overlay"], ["title", "Impossible de charger les demandes", 3, "retry"], [1, "empty-icon"], ["type", "button", 1, "btn", "btn-ghost"], ["type", "button", 1, "btn", "btn-ghost", 3, "click"], [1, "tabs"], [1, "tab", 3, "tab-active"], [1, "request-list"], [1, "request-card", 3, "request-card-closed"], [1, "tab", 3, "click"], [1, "tab-badge"], [1, "request-card"], [1, "request-head"], [1, "request-title"], [1, "request-ref"], [1, "request-label"], [1, "request-meta"], [1, "meta-item"], [1, "meta-label"], [1, "meta-value"], [1, "meta-secondary"], [1, "meta-item", "meta-reason"], [1, "circuit"], [1, "circuit-head"], [1, "circuit-label"], [1, "circuit-progress-text"], [1, "progress-bar"], [1, "progress-fill"], [1, "level-list"], [1, "level", 3, "level-current", "level-done", "level-rejected"], [1, "request-foot"], [1, "btn", "btn-plain", 3, "btn-loading", "disabled"], [1, "effective-note"], [1, "rejected-note"], [1, "level"], [1, "level-marker"], [1, "level-body"], [1, "level-title"], [1, "level-profils"], [1, "level-now"], [1, "leveltrace"], [1, "level-comment"], [1, "level-actions"], [1, "btn", "btn-ghost", "btn-sm", 3, "click", "disabled"], [1, "btn", "btn-ghost", "btn-sm", "btn-ghost-danger", 3, "click", "disabled"], [1, "btn", "btn-plain", 3, "click", "disabled"], [1, "form-overlay", 3, "click"], [1, "form-card", 3, "click"], [1, "form-header"], ["type", "button", 1, "btn-close", 3, "click"], [1, "form-error"], [1, "form-section"], [1, "section-label"], [1, "student-search"], ["type", "text", "placeholder", "Rechercher un \u00E9l\u00E8ve\u2026", 1, "input", 3, "ngModelChange", "ngModel"], [1, "student-results"], [1, "selected-student"], [1, "form-row"], [1, "radio-group"], [1, "radio"], ["type", "radio", "name", "kind", "value", "PERCENTAGE", 3, "ngModelChange", "ngModel"], ["type", "radio", "name", "kind", "value", "FIXED_AMOUNT", 3, "ngModelChange", "ngModel"], [1, "section-label", 3, "for"], ["type", "number", "placeholder", "Exemple : 15 ou 150000", 1, "input", "input-amount", 3, "ngModelChange", "id", "ngModel"], ["for", "discount-label", 1, "section-label"], ["type", "text", "id", "discount-label", "placeholder", "Exemple : R\u00E9duction fratrie", 1, "input", 3, "ngModelChange", "ngModel"], ["for", "discount-reason", 1, "section-label"], ["id", "discount-reason", "rows", "3", "placeholder", "Pr\u00E9cisez le contexte de la r\u00E9duction\u2026", 1, "input", "input-textarea", 3, "ngModelChange", "ngModel"], [1, "form-hint"], ["aria-label", "Circuit de validation", 1, "input", "input-select", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], ["for", "discount-fee", 1, "section-label"], ["id", "discount-fee", 1, "input", "input-select", 3, "ngModelChange", "ngModel"], [1, "form-preview"], [1, "preview-line"], [1, "form-footer"], ["type", "button", 1, "student-result", 3, "click"], [1, "student-result-name"], [1, "student-result-meta"], ["type", "button", 1, "link-remove", 3, "click"], [1, "chip"], [1, "modal-overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "modal-body"], [1, "decision-context"], [1, "decision-grid"], [1, "decision-option", "decision-approve", 3, "click", "disabled"], [1, "decision-icon"], [1, "decision-option", "decision-reject", 3, "click", "disabled"], ["for", "decision-comment", 1, "section-label"], ["id", "decision-comment", "rows", "3", 1, "input", "input-textarea", 3, "ngModelChange", "ngModel"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"]], template: function DiscountsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "h1");
            i0.ɵɵtext(2, "Remises et bourses");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 1)(4, "span", 2);
            i0.ɵɵtext(5, "Demandes valid\u00E9es dans un circuit \u00E0 plusieurs niveaux.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "button", 3);
            i0.ɵɵlistener("click", function DiscountsComponent_Template_button_click_6_listener() { return ctx.openForm(); });
            i0.ɵɵtemplate(7, DiscountsComponent_Conditional_7_Template, 1, 0)(8, DiscountsComponent_Conditional_8_Template, 1, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, DiscountsComponent_Conditional_9_Template, 1, 0, "eduops-error-state", 4)(10, DiscountsComponent_Conditional_10_Template, 1, 0, "eduops-loading-state")(11, DiscountsComponent_Conditional_11_Template, 6, 1, "section", 5)(12, DiscountsComponent_Conditional_12_Template, 6, 0)(13, DiscountsComponent_Conditional_13_Template, 81, 22, "div", 6)(14, DiscountsComponent_Conditional_14_Template, 34, 11, "div", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵclassProp("btn-loading", ctx.submitting());
            i0.ɵɵproperty("disabled", !ctx.canRequest());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.submitting() ? 7 : 8);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.error() ? 9 : ctx.loading() ? 10 : ctx.requests().length === 0 ? 11 : 12);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.formOpen() ? 13 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.deciding() ? 14 : -1);
        } }, dependencies: [CommonModule, i1.DatePipe, FormsModule, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.RadioControlValueAccessor, i2.NgControlStatus, i2.NgModel, LoadingStateComponent, ErrorStateComponent], styles: [".discounts[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.page-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 12px;\n  margin-bottom: 18px;\n}\n\n.page-sub[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n}\n\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 18px;\n  flex-wrap: wrap;\n}\n\n.tab[_ngcontent-%COMP%] {\n  appearance: none;\n  border: 1px solid var(--border);\n  background: var(--surface);\n  color: var(--text);\n  padding: 6px 12px;\n  border-radius: 8px;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.tab-active[_ngcontent-%COMP%] {\n  background: var(--primary);\n  color: white;\n  border-color: var(--primary);\n}\n\n.tab-badge[_ngcontent-%COMP%] {\n  background: var(--surface);\n  color: var(--text-muted);\n  border-radius: 999px;\n  padding: 0 8px;\n  font-size: 12px;\n  line-height: 20px;\n}\n\n.tab-active[_ngcontent-%COMP%]   .tab-badge[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.25);\n  color: white;\n}\n\n.request-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  gap: 14px;\n}\n\n.request-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  padding: 14px 16px;\n  background: var(--surface);\n}\n\n.request-card-closed[_ngcontent-%COMP%] {\n  opacity: 0.85;\n}\n\n.request-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n\n.request-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.request-ref[_ngcontent-%COMP%] {\n  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n  color: var(--text-muted);\n  letter-spacing: 0.02em;\n}\n\n.request-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n\n.status-pill[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  padding: 2px 10px;\n  font-size: 12px;\n  line-height: 20px;\n  white-space: nowrap;\n  border: 1px solid transparent;\n}\n\n.status-SUBMITTED[_ngcontent-%COMP%] {\n  background: var(--bg-muted);\n  color: var(--text);\n}\n\n.status-APPROVED[_ngcontent-%COMP%] {\n  background: var(--success-bg);\n  color: var(--success);\n  border-color: var(--success-border);\n}\n\n.status-REJECTED[_ngcontent-%COMP%] {\n  background: var(--danger-bg);\n  color: var(--danger);\n  border-color: var(--danger-border);\n}\n\n.status-CANCELLED[_ngcontent-%COMP%] {\n  background: var(--muted);\n  color: var(--text-muted);\n}\n\n.status-EFFECTIVE[_ngcontent-%COMP%] {\n  background: var(--success-bg);\n  color: var(--success);\n  border-color: var(--success-border);\n}\n\n.request-meta[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  margin-bottom: 14px;\n}\n\n.meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  align-items: baseline;\n}\n\n.meta-label[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 13px;\n}\n\n.meta-value[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n\n.meta-secondary[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 13px;\n}\n\n.meta-reason[_ngcontent-%COMP%] {\n  margin-top: 4px;\n}\n\n.circuit[_ngcontent-%COMP%] {\n  border-top: 1px dashed var(--border);\n  padding-top: 12px;\n  margin-bottom: 12px;\n}\n\n.circuit-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n\n.circuit-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-muted);\n}\n\n.circuit-progress-text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--primary);\n  font-weight: 600;\n}\n\n.progress-bar[_ngcontent-%COMP%] {\n  height: 6px;\n  background: var(--bg-muted);\n  border-radius: 999px;\n  overflow: hidden;\n  margin-bottom: 12px;\n}\n\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: var(--primary);\n  border-radius: 999px;\n  transition: width 0.25s ease;\n}\n\n.progress-fill-done[_ngcontent-%COMP%] {\n  background: var(--success);\n}\n\n.level-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  gap: 8px;\n}\n\n.level[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 28px 1fr auto;\n  gap: 10px;\n  align-items: start;\n  padding: 8px 10px;\n  border-radius: 8px;\n  background: var(--bg-muted);\n}\n\n.level-current[_ngcontent-%COMP%] {\n  background: var(--primary-bg);\n  border: 1px solid var(--primary-border);\n}\n\n.level-done[_ngcontent-%COMP%] {\n  background: var(--success-bg);\n  opacity: 0.85;\n}\n\n.level-rejected[_ngcontent-%COMP%] {\n  background: var(--danger-bg);\n  opacity: 0.85;\n}\n\n.level-marker[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: var(--surface);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  color: var(--text-muted);\n  border: 1px solid var(--border);\n}\n\n.level-done[_ngcontent-%COMP%]   .level-marker[_ngcontent-%COMP%] {\n  background: var(--success);\n  color: white;\n  border-color: var(--success);\n}\n\n.level-rejected[_ngcontent-%COMP%]   .level-marker[_ngcontent-%COMP%] {\n  background: var(--danger);\n  color: white;\n  border-color: var(--danger);\n}\n\n.level-body[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.level-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text);\n}\n\n.level-profils[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 13px;\n  margin-top: 2px;\n}\n\n.level-now[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  font-size: 12px;\n  color: var(--primary);\n  background: var(--primary-bg);\n  padding: 4px 8px;\n  border-radius: 6px;\n}\n\n.leveltrace[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  font-size: 12px;\n  color: var(--text-muted);\n}\n\n.level-comment[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  font-size: 12px;\n  color: var(--text-muted);\n  font-style: italic;\n}\n\n.level-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  margin-top: 6px;\n}\n\n.request-foot[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-items: center;\n  padding-top: 12px;\n  border-top: 1px solid var(--border);\n  margin-top: 12px;\n}\n\n.effective-note[_ngcontent-%COMP%] {\n  color: var(--success);\n  font-size: 13px;\n  font-weight: 500;\n}\n\n.rejected-note[_ngcontent-%COMP%] {\n  color: var(--danger);\n  font-size: 13px;\n}\n\n.form-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  z-index: 50;\n}\n\n.form-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 560px;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  padding: 20px;\n  box-shadow: var(--shadow-lg);\n  max-height: 90vh;\n  overflow: auto;\n}\n\n.form-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 18px;\n}\n\n.form-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 18px;\n}\n\n.btn-close[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  font-size: 22px;\n  color: var(--text-muted);\n  cursor: pointer;\n  line-height: 1;\n}\n\n.form-error[_ngcontent-%COMP%] {\n  background: var(--danger-bg);\n  color: var(--danger);\n  padding: 8px 12px;\n  border-radius: 8px;\n  margin-bottom: 14px;\n  font-size: 13px;\n}\n\n.form-section[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n\n.section-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-bottom: 6px;\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n\n.form-row-2[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr 1fr;\n}\n\n.input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 9px 11px;\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  background: var(--surface);\n  color: var(--text);\n  font-size: 14px;\n}\n\n.input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n\n.input-amount[_ngcontent-%COMP%] {\n  font-variant-numeric: tabular-nums;\n}\n\n.input-select[_ngcontent-%COMP%] {\n  appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='currentColor' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right 11px center;\n  padding-right: 30px;\n}\n\n.input-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n  min-height: 72px;\n}\n\n.student-search[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.student-results[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 4px);\n  left: 0;\n  right: 0;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  list-style: none;\n  padding: 4px;\n  max-height: 220px;\n  overflow: auto;\n  z-index: 6;\n}\n\n.student-result[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  width: 100%;\n  text-align: left;\n  padding: 8px 10px;\n  border-radius: 6px;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  color: var(--text);\n}\n\n.student-result[_ngcontent-%COMP%]:hover {\n  background: var(--bg-muted);\n}\n\n.student-result-meta[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 13px;\n}\n\n.selected-student[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 8px;\n  padding: 6px 10px;\n  background: var(--success-bg);\n  border-radius: 8px;\n}\n\n.link-remove[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: var(--danger);\n  text-decoration: underline;\n  cursor: pointer;\n  font-size: 13px;\n  padding: 0;\n}\n\n.radio-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n\n.radio[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  cursor: pointer;\n}\n\n.radio[_ngcontent-%COMP%]   input[type=\"radio\"][_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n}\n\n.form-hint[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  font-size: 13px;\n  margin-bottom: 10px;\n}\n\n.levels-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.level-input[_ngcontent-%COMP%] {\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  padding: 10px;\n  background: var(--bg-muted);\n}\n\n.level-input-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n\n.level-index[_ngcontent-%COMP%] {\n  color: var(--primary);\n  font-weight: 600;\n  font-size: 13px;\n}\n\n.btn-link-remove[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: var(--text-muted);\n  cursor: pointer;\n  font-size: 12px;\n}\n\n.levels-actions[_ngcontent-%COMP%] {\n  margin-top: 10px;\n}\n\n.form-preview[_ngcontent-%COMP%] {\n  background: var(--bg-muted);\n  padding: 10px 12px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.preview-line[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  font-size: 13px;\n}\n\n.preview-line[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text);\n}\n\n.form-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n}\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  z-index: 60;\n}\n\n.modal[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 440px;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  padding: 18px;\n  box-shadow: var(--shadow-lg);\n}\n\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 14px;\n}\n\n.modal-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 17px;\n}\n\n.modal-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n\n.decision-context[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  margin: 0;\n}\n\n.decision-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n\n.decision-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 12px;\n  border-radius: 10px;\n  border: 1px solid var(--border);\n  background: var(--surface);\n  cursor: pointer;\n  font-weight: 500;\n}\n\n.decision-option[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.decision-approve[_ngcontent-%COMP%] {\n  color: var(--primary);\n  border-color: var(--primary-border);\n}\n\n.decision-reject[_ngcontent-%COMP%] {\n  color: var(--danger);\n  border-color: var(--danger-border);\n}\n\n.decision-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding-top: 4px;\n}\n\n.btn-ghost-danger[_ngcontent-%COMP%] {\n  color: var(--danger);\n}\n\n.btn-danger[_ngcontent-%COMP%] {\n  background: var(--danger);\n  color: white;\n  border-color: var(--danger);\n}\n\n.btn-danger[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n\n.btn-loading[_ngcontent-%COMP%] {\n  opacity: 0.7;\n  pointer-events: none;\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DiscountsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-discounts', standalone: true, imports: [
                    CommonModule, FormsModule, MoneyPipe, LoadingStateComponent, ErrorStateComponent
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"discounts\">\n  <h1>Remises et bourses</h1>\n  <div class=\"page-actions\">\n    <span class=\"page-sub\">Demandes valid\u00E9es dans un circuit \u00E0 plusieurs niveaux.</span>\n    <button\n      type=\"button\"\n      class=\"btn btn-primary\"\n      [class.btn-loading]=\"submitting()\"\n      [disabled]=\"!canRequest()\"\n      (click)=\"openForm()\">\n      @if (submitting()) { Enregistrement\u2026 } @else { Nouvelle demande }\n    </button>\n  </div>\n\n  @if (error()) {\n    <eduops-error-state title=\"Impossible de charger les demandes\" (retry)=\"load()\"></eduops-error-state>\n  } @else if (loading()) {\n    <eduops-loading-state></eduops-loading-state>\n  } @else if (requests().length === 0) {\n    <section class=\"empty\">\n      <div class=\"empty-icon\">\u25EA</div>\n      <p>Aucune demande de r\u00E9duction dans cette \u00E9cole pour le moment.</p>\n      @if (canRequest()) {\n        <button type=\"button\" class=\"btn btn-ghost\" (click)=\"openForm()\">Cr\u00E9er la premi\u00E8re demande</button>\n      }\n    </section>\n  } @else {\n    <div class=\"tabs\">\n      @for (tabItem of tabs; track tabItem.key) {\n        <button\n          class=\"tab\"\n          [class.tab-active]=\"tabItem.key === tab()\"\n          (click)=\"tab.set(tabItem.key)\">\n          {{ tabItem.label }}\n          @if ((tabItem.key === 'MINE' && countMine()) || (tabItem.key === 'PENDING' && countPending()) || (tabItem.key === 'ALL' && requests().length)) {\n            <span class=\"tab-badge\">{{ (tabItem.key === 'MINE' ? countMine() : tabItem.key === 'PENDING' ? countPending() : requests().length) }}</span>\n          }\n        </button>\n      }\n    </div>\n\n    <ul class=\"request-list\">\n      @for (request of visible(); track request.id) {\n        <li class=\"request-card\" [class.request-card-closed]=\"request.status !== 'SUBMITTED'\">\n          <div class=\"request-head\">\n            <div class=\"request-title\">\n              <span class=\"request-ref\">{{ request.reference }}</span>\n              <span class=\"request-label\">{{ request.label }}</span>\n            </div>\n            <span class=\"status-pill status-{{ request.status }}\">{{ statusLabel(request) }}</span>\n          </div>\n\n          <div class=\"request-meta\">\n            <div class=\"meta-item\">\n              <span class=\"meta-label\">\u00C9l\u00E8ve</span>\n              <span class=\"meta-value\">{{ request.studentName }}</span>\n              @if (request.studentNumber) { <span class=\"meta-secondary\">N\u00B0 {{ request.studentNumber }}</span> }\n            </div>\n            <div class=\"meta-item\">\n              <span class=\"meta-label\">R\u00E9duction</span>\n              <span class=\"meta-value\">{{ valueLabel(request) }}</span>\n              @if (request.computedAmount != null) { <span class=\"meta-secondary\">Soit {{ computedAmountLabel(request) }}</span> }\n            </div>\n            @if (request.reason) {\n              <div class=\"meta-item meta-reason\">\n                <span class=\"meta-label\">Motif</span>\n                <span class=\"meta-value\">{{ request.reason }}</span>\n              </div>\n            }\n          </div>\n\n          <div class=\"circuit\">\n            <div class=\"circuit-head\">\n              <span class=\"circuit-label\">Circuit de validation</span>\n              <span class=\"circuit-progress-text\">{{ progressPercent(request) }}% valid\u00E9</span>\n            </div>\n\n            <div class=\"progress-bar\">\n              <div class=\"progress-fill\" [style.width.%]=\"progressPercent(request)\" [class.progress-fill-done]=\"request.status === 'EFFECTIVE'\"></div>\n            </div>\n\n            <ol class=\"level-list\">\n              @for (level of request.levels; track level.levelNumber) {\n                <li class=\"level\"\n                  [class.level-current]=\"level.levelNumber === request.currentLevel && request.status === 'SUBMITTED'\"\n                  [class.level-done]=\"level.status === 'APPROVED'\"\n                  [class.level-rejected]=\"level.status === 'REJECTED'\">\n                  <div class=\"level-marker\">\n                    @switch (level.status) {\n                      @case ('APPROVED') { \u2713 }\n                      @case ('REJECTED') { \u2715 }\n                      @default { {{ level.levelNumber }} }\n                    }\n                  </div>\n                  <div class=\"level-body\">\n                    <div class=\"level-title\">{{ level.levelNumber }}. {{ level.name }}</div>\n                    <div class=\"level-profils\">{{ level.roleLabel || level.roleCode }}</div>\n                    @if (level.status === 'PENDING' && level.levelNumber === request.currentLevel && request.awaitingMyDecision) {\n                      <div class=\"level-now\">Palier en attente de votre d\u00E9cision</div>\n                    }\n                    @for (member of level.members ?? []; track member.userId) {\n                      <div class=\"leveltrace\">{{ member.name }} : {{ member.decision === 'APPROVED' ? 'Valid\u00E9' : member.decision === 'REJECTED' ? 'Refus\u00E9' : 'En attente' }}\n                        @if (member.decidedAt) { \u00B7 {{ member.decidedAt | date:'dd/MM/yyyy HH:mm' }} }\n                        @if (member.comment) { \u2014 {{ member.comment }} }\n                      </div>\n                    }\n                    @if (level.approverName) {\n                      <div class=\"leveltrace\">Valid\u00E9 par {{ level.approverName }}</div>\n                    }\n                    @if (level.comment) {\n                      <div class=\"level-comment\">\u00AB {{ level.comment }} \u00BB</div>\n                    }\n                  </div>\n                  @if (level.levelNumber === request.currentLevel && request.awaitingMyDecision) {\n                    <div class=\"level-actions\">\n                      <button class=\"btn btn-ghost btn-sm\" [disabled]=\"savingDecision()\" (click)=\"askDecision(request)\">Valider</button>\n                      <button class=\"btn btn-ghost btn-sm btn-ghost-danger\" [disabled]=\"savingDecision()\" (click)=\"askDecision(request)\">Refuser</button>\n                    </div>\n                  }\n                </li>\n              }\n            </ol>\n          </div>\n\n          <div class=\"request-foot\">\n            @if (request.status === 'APPROVED' && !request.effectiveAt) {\n              <button class=\"btn btn-plain\" [class.btn-loading]=\"applying() === request.id\" [disabled]=\"applying() === request.id\" (click)=\"apply(request)\">\n                @if (applying() === request.id) { Application\u2026 } @else { Rendre la r\u00E9duction effective }\n              </button>\n            }\n            @if (request.effectiveAt) {\n              <div class=\"effective-note\">R\u00E9duction appliqu\u00E9e le {{ effectiveAtLabel(request) }}.</div>\n            }\n            @if (request.status === 'REJECTED') {\n              <div class=\"rejected-note\">\n                @if (request.rejectionReason) { Refus\u00E9 : {{ request.rejectionReason }} } @else { Demande refus\u00E9e. }\n              </div>\n            }\n          </div>\n        </li>\n      }\n    </ul>\n  }\n\n  @if (formOpen()) {\n    <div class=\"form-overlay\" (click)=\"closeForm()\">\n      <div class=\"form-card\" (click)=\"$event.stopPropagation()\">\n        <header class=\"form-header\">\n          <h2>Nouvelle demande de r\u00E9duction</h2>\n          <button type=\"button\" class=\"btn-close\" (click)=\"closeForm()\">\u00D7</button>\n        </header>\n\n        @if (formError()) { <div class=\"form-error\">{{ formError() }}</div> }\n\n        <div class=\"form-section\">\n          <label class=\"section-label\">\u00C9l\u00E8ve</label>\n          <div class=\"student-search\">\n            <input type=\"text\" class=\"input\" placeholder=\"Rechercher un \u00E9l\u00E8ve\u2026\" [ngModel]=\"studentSearch()\" (ngModelChange)=\"searchStudents($event)\">\n            @if (studentResults().length > 0) {\n              <ul class=\"student-results\">\n                @for (student of studentResults(); track student.id) {\n                  <li>\n                    <button type=\"button\" class=\"student-result\" (click)=\"selectStudent(student)\">\n                      <span class=\"student-result-name\">{{ student.fullName }}</span>\n                      <span class=\"student-result-meta\">\n                        {{ student.studentNumber }}\n                        @if (student.classroomName) { \u00B7 {{ student.classroomName }} }\n                      </span>\n                    </button>\n                  </li>\n                }\n              </ul>\n            }\n          </div>\n          @if (formStudentId()) {\n            <div class=\"selected-student\">\n              <span class=\"meta-value\">{{ selectedStudentName() }}</span>\n              <button type=\"button\" class=\"link-remove\" (click)=\"clearStudent()\">Retirer</button>\n            </div>\n          }\n        </div>\n\n        <div class=\"form-row\">\n          <div class=\"form-section\">\n            <label class=\"section-label\">Type de r\u00E9duction</label>\n            <div class=\"radio-group\">\n              <label class=\"radio\"><input type=\"radio\" name=\"kind\" value=\"PERCENTAGE\" [ngModel]=\"formKind()\" (ngModelChange)=\"formKind.set($event)\"><span>Pourcentage</span></label>\n              <label class=\"radio\"><input type=\"radio\" name=\"kind\" value=\"FIXED_AMOUNT\" [ngModel]=\"formKind()\" (ngModelChange)=\"formKind.set($event)\"><span>Montant fixe</span></label>\n            </div>\n          </div>\n\n          <div class=\"form-section\">\n            <label class=\"section-label\" [for]=\"'value-' + formKind()\">\n              @if (formKind() === 'PERCENTAGE') { Pourcentage (\u2264 100 %) } @else { Montant }\n            </label>\n            <input [id]=\"'value-' + formKind()\" type=\"number\" class=\"input input-amount\" placeholder=\"Exemple : 15 ou 150000\" [ngModel]=\"formValue()\" (ngModelChange)=\"formValue.set($event)\">\n          </div>\n        </div>\n\n        <div class=\"form-section\">\n          <label class=\"section-label\" for=\"discount-label\">Intitul\u00E9</label>\n          <input type=\"text\" id=\"discount-label\" class=\"input\" placeholder=\"Exemple : R\u00E9duction fratrie\" [ngModel]=\"formLabel()\" (ngModelChange)=\"formLabel.set($event)\">\n        </div>\n\n        <div class=\"form-section\">\n          <label class=\"section-label\" for=\"discount-reason\">Motif</label>\n          <textarea id=\"discount-reason\" class=\"input input-textarea\" rows=\"3\" placeholder=\"Pr\u00E9cisez le contexte de la r\u00E9duction\u2026\" [ngModel]=\"formReason()\" (ngModelChange)=\"formReason.set($event)\"></textarea>\n        </div>\n\n        <div class=\"form-section\">\n          <label class=\"section-label\">Circuit de validation</label>\n          <p class=\"form-hint\">Chaque niveau est valid\u00E9 dans l\u2019ordre. La r\u00E9duction n\u2019est appliqu\u00E9e qu\u2019apr\u00E8s le dernier.</p>\n\n          <select class=\"input input-select\" aria-label=\"Circuit de validation\" [ngModel]=\"circuitId()\" (ngModelChange)=\"circuitId.set($event)\">\n            <option value=\"\">\u2014 Choisir un circuit \u2014</option>\n            @for (c of circuits(); track c.id) { <option [value]=\"c.id\">{{ c.code }} \u2014 {{ c.name }}</option> }\n          </select>\n          @if (!circuits().length) { <p class=\"form-hint\">Cr\u00E9ez un circuit \u00AB R\u00E9ductions \u00BB dans Configuration syst\u00E8me avant de soumettre.</p> }\n          @for (l of formLevels(); track $index) {\n            <p>{{ $index + 1 }}. {{ l.name }} \u2014 {{ l.mode === 'ALL' ? 'Tous les membres' : 'Un seul membre suffit' }}</p>\n            @for (m of l.members; track m.id) { <span class=\"chip\">{{ m.fullName || m.username }}</span> }\n          }\n        </div>\n        <div class=\"form-section\">\n          <label class=\"section-label\" for=\"discount-fee\">Frais concern\u00E9s</label>\n          <select id=\"discount-fee\" class=\"input input-select\" [ngModel]=\"feeTypeId()\" (ngModelChange)=\"feeTypeId.set($event)\">\n            <option value=\"\">Tous les frais restant dus</option>\n            @for (fee of feeTypes(); track fee.id) { <option [value]=\"fee.id\">{{ fee.name }}</option> }\n          </select>\n          <p class=\"form-hint\">Le montant est limit\u00E9 au solde restant d\u00FB. La derni\u00E8re validation applique automatiquement la r\u00E9duction.</p>\n        </div>\n\n        <div class=\"form-preview\">\n          <div class=\"preview-line\"><span>R\u00E9duction</span><strong>{{ valueLabel(formPreviewRequest()) }}</strong></div>\n          <div class=\"preview-line\"><span>Circuit</span><span>{{ formLevels().length }} niveau(s) : {{ formPreviewLevelNames() }}</span></div>\n        </div>\n\n        <footer class=\"form-footer\">\n          <button type=\"button\" class=\"btn btn-ghost\" (click)=\"closeForm()\">Annuler</button>\n          <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"submitting()\" [class.btn-loading]=\"submitting()\" (click)=\"submitRequest()\">\n            @if (submitting()) { Envoi\u2026 } @else { Envoyer dans le circuit }\n          </button>\n        </footer>\n      </div>\n    </div>\n  }\n\n  @if (deciding()) {\n    <div class=\"modal-overlay\" (click)=\"cancelDecision()\">\n      <div class=\"modal\" (click)=\"$event.stopPropagation()\">\n        <header class=\"modal-header\">\n          <h2>D\u00E9cision : {{ deciding()!.reference }}</h2>\n          <button type=\"button\" class=\"btn-close\" (click)=\"cancelDecision()\">\u00D7</button>\n        </header>\n\n        <div class=\"modal-body\">\n          <p class=\"decision-context\">Vous tranchez le niveau <strong>{{ currentLevelLabel(deciding()!) }}</strong>.</p>\n\n          <div class=\"decision-grid\">\n            <button class=\"decision-option decision-approve\" [disabled]=\"savingDecision()\" (click)=\"confirmDecision('APPROVE')\">\n              <span class=\"decision-icon\">\u2713</span><span>Valider le palier</span>\n            </button>\n            <button class=\"decision-option decision-reject\" [disabled]=\"savingDecision()\" (click)=\"confirmDecision('REJECT')\">\n              <span class=\"decision-icon\">\u2715</span><span>Refuser le palier</span>\n            </button>\n          </div>\n\n          <label class=\"section-label\" for=\"decision-comment\">Motif (obligatoire en cas de refus)</label>\n          <textarea id=\"decision-comment\" class=\"input input-textarea\" rows=\"3\" [ngModel]=\"decisionComment()\" (ngModelChange)=\"decisionComment.set($event)\"></textarea>\n        </div>\n\n        <footer class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-ghost\" (click)=\"cancelDecision()\">Annuler</button>\n          <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"savingDecision()\" [class.btn-loading]=\"savingDecision()\" (click)=\"confirmDecision('APPROVE')\">Valider le palier</button>\n          <button type=\"button\" class=\"btn btn-danger\" [disabled]=\"savingDecision()\" [class.btn-loading]=\"savingDecision()\" (click)=\"confirmDecision('REJECT')\">Refuser</button>\n        </footer>\n      </div>\n    </div>\n  }\n</section>\n", styles: [".discounts {\n  display: block;\n}\n\n.page-actions {\n  display: flex;\n  align-items: baseline;\n  gap: 12px;\n  margin-bottom: 18px;\n}\n\n.page-sub {\n  color: var(--text-muted);\n}\n\n.tabs {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 18px;\n  flex-wrap: wrap;\n}\n\n.tab {\n  appearance: none;\n  border: 1px solid var(--border);\n  background: var(--surface);\n  color: var(--text);\n  padding: 6px 12px;\n  border-radius: 8px;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.tab-active {\n  background: var(--primary);\n  color: white;\n  border-color: var(--primary);\n}\n\n.tab-badge {\n  background: var(--surface);\n  color: var(--text-muted);\n  border-radius: 999px;\n  padding: 0 8px;\n  font-size: 12px;\n  line-height: 20px;\n}\n\n.tab-active .tab-badge {\n  background: rgba(255, 255, 255, 0.25);\n  color: white;\n}\n\n.request-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  gap: 14px;\n}\n\n.request-card {\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  padding: 14px 16px;\n  background: var(--surface);\n}\n\n.request-card-closed {\n  opacity: 0.85;\n}\n\n.request-head {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n\n.request-title {\n  display: flex;\n  align-items: baseline;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.request-ref {\n  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n  color: var(--text-muted);\n  letter-spacing: 0.02em;\n}\n\n.request-label {\n  font-weight: 600;\n}\n\n.status-pill {\n  border-radius: 999px;\n  padding: 2px 10px;\n  font-size: 12px;\n  line-height: 20px;\n  white-space: nowrap;\n  border: 1px solid transparent;\n}\n\n.status-SUBMITTED {\n  background: var(--bg-muted);\n  color: var(--text);\n}\n\n.status-APPROVED {\n  background: var(--success-bg);\n  color: var(--success);\n  border-color: var(--success-border);\n}\n\n.status-REJECTED {\n  background: var(--danger-bg);\n  color: var(--danger);\n  border-color: var(--danger-border);\n}\n\n.status-CANCELLED {\n  background: var(--muted);\n  color: var(--text-muted);\n}\n\n.status-EFFECTIVE {\n  background: var(--success-bg);\n  color: var(--success);\n  border-color: var(--success-border);\n}\n\n.request-meta {\n  display: grid;\n  gap: 6px;\n  margin-bottom: 14px;\n}\n\n.meta-item {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  align-items: baseline;\n}\n\n.meta-label {\n  color: var(--text-muted);\n  font-size: 13px;\n}\n\n.meta-value {\n  font-weight: 500;\n}\n\n.meta-secondary {\n  color: var(--text-muted);\n  font-size: 13px;\n}\n\n.meta-reason {\n  margin-top: 4px;\n}\n\n.circuit {\n  border-top: 1px dashed var(--border);\n  padding-top: 12px;\n  margin-bottom: 12px;\n}\n\n.circuit-head {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n\n.circuit-label {\n  font-size: 13px;\n  color: var(--text-muted);\n}\n\n.circuit-progress-text {\n  font-size: 13px;\n  color: var(--primary);\n  font-weight: 600;\n}\n\n.progress-bar {\n  height: 6px;\n  background: var(--bg-muted);\n  border-radius: 999px;\n  overflow: hidden;\n  margin-bottom: 12px;\n}\n\n.progress-fill {\n  height: 100%;\n  background: var(--primary);\n  border-radius: 999px;\n  transition: width 0.25s ease;\n}\n\n.progress-fill-done {\n  background: var(--success);\n}\n\n.level-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: grid;\n  gap: 8px;\n}\n\n.level {\n  display: grid;\n  grid-template-columns: 28px 1fr auto;\n  gap: 10px;\n  align-items: start;\n  padding: 8px 10px;\n  border-radius: 8px;\n  background: var(--bg-muted);\n}\n\n.level-current {\n  background: var(--primary-bg);\n  border: 1px solid var(--primary-border);\n}\n\n.level-done {\n  background: var(--success-bg);\n  opacity: 0.85;\n}\n\n.level-rejected {\n  background: var(--danger-bg);\n  opacity: 0.85;\n}\n\n.level-marker {\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: var(--surface);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  color: var(--text-muted);\n  border: 1px solid var(--border);\n}\n\n.level-done .level-marker {\n  background: var(--success);\n  color: white;\n  border-color: var(--success);\n}\n\n.level-rejected .level-marker {\n  background: var(--danger);\n  color: white;\n  border-color: var(--danger);\n}\n\n.level-body {\n  min-width: 0;\n}\n\n.level-title {\n  font-weight: 600;\n  color: var(--text);\n}\n\n.level-profils {\n  color: var(--text-muted);\n  font-size: 13px;\n  margin-top: 2px;\n}\n\n.level-now {\n  margin-top: 6px;\n  font-size: 12px;\n  color: var(--primary);\n  background: var(--primary-bg);\n  padding: 4px 8px;\n  border-radius: 6px;\n}\n\n.leveltrace {\n  margin-top: 4px;\n  font-size: 12px;\n  color: var(--text-muted);\n}\n\n.level-comment {\n  margin-top: 4px;\n  font-size: 12px;\n  color: var(--text-muted);\n  font-style: italic;\n}\n\n.level-actions {\n  display: flex;\n  gap: 6px;\n  margin-top: 6px;\n}\n\n.request-foot {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-items: center;\n  padding-top: 12px;\n  border-top: 1px solid var(--border);\n  margin-top: 12px;\n}\n\n.effective-note {\n  color: var(--success);\n  font-size: 13px;\n  font-weight: 500;\n}\n\n.rejected-note {\n  color: var(--danger);\n  font-size: 13px;\n}\n\n.form-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  z-index: 50;\n}\n\n.form-card {\n  width: 100%;\n  max-width: 560px;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  padding: 20px;\n  box-shadow: var(--shadow-lg);\n  max-height: 90vh;\n  overflow: auto;\n}\n\n.form-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 18px;\n}\n\n.form-header h2 {\n  margin: 0;\n  font-size: 18px;\n}\n\n.btn-close {\n  background: transparent;\n  border: none;\n  font-size: 22px;\n  color: var(--text-muted);\n  cursor: pointer;\n  line-height: 1;\n}\n\n.form-error {\n  background: var(--danger-bg);\n  color: var(--danger);\n  padding: 8px 12px;\n  border-radius: 8px;\n  margin-bottom: 14px;\n  font-size: 13px;\n}\n\n.form-section {\n  margin-bottom: 16px;\n}\n\n.section-label {\n  display: block;\n  font-size: 13px;\n  color: var(--text-muted);\n  margin-bottom: 6px;\n}\n\n.form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n}\n\n.form-row-2 {\n  grid-template-columns: 1fr 1fr;\n}\n\n.input {\n  width: 100%;\n  padding: 9px 11px;\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  background: var(--surface);\n  color: var(--text);\n  font-size: 14px;\n}\n\n.input::placeholder {\n  color: var(--text-muted);\n}\n\n.input-amount {\n  font-variant-numeric: tabular-nums;\n}\n\n.input-select {\n  appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='currentColor' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right 11px center;\n  padding-right: 30px;\n}\n\n.input-textarea {\n  resize: vertical;\n  min-height: 72px;\n}\n\n.student-search {\n  position: relative;\n}\n\n.student-results {\n  position: absolute;\n  top: calc(100% + 4px);\n  left: 0;\n  right: 0;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  list-style: none;\n  padding: 4px;\n  max-height: 220px;\n  overflow: auto;\n  z-index: 6;\n}\n\n.student-result {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  width: 100%;\n  text-align: left;\n  padding: 8px 10px;\n  border-radius: 6px;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  color: var(--text);\n}\n\n.student-result:hover {\n  background: var(--bg-muted);\n}\n\n.student-result-meta {\n  color: var(--text-muted);\n  font-size: 13px;\n}\n\n.selected-student {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 8px;\n  padding: 6px 10px;\n  background: var(--success-bg);\n  border-radius: 8px;\n}\n\n.link-remove {\n  background: transparent;\n  border: none;\n  color: var(--danger);\n  text-decoration: underline;\n  cursor: pointer;\n  font-size: 13px;\n  padding: 0;\n}\n\n.radio-group {\n  display: flex;\n  gap: 16px;\n}\n\n.radio {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  cursor: pointer;\n}\n\n.radio input[type=\"radio\"] {\n  width: 16px;\n  height: 16px;\n}\n\n.form-hint {\n  color: var(--text-muted);\n  font-size: 13px;\n  margin-bottom: 10px;\n}\n\n.levels-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.level-input {\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  padding: 10px;\n  background: var(--bg-muted);\n}\n\n.level-input-head {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n\n.level-index {\n  color: var(--primary);\n  font-weight: 600;\n  font-size: 13px;\n}\n\n.btn-link-remove {\n  background: transparent;\n  border: none;\n  color: var(--text-muted);\n  cursor: pointer;\n  font-size: 12px;\n}\n\n.levels-actions {\n  margin-top: 10px;\n}\n\n.form-preview {\n  background: var(--bg-muted);\n  padding: 10px 12px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.preview-line {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  font-size: 13px;\n}\n\n.preview-line strong {\n  color: var(--text);\n}\n\n.form-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n}\n\n.modal-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.45);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  z-index: 60;\n}\n\n.modal {\n  width: 100%;\n  max-width: 440px;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  padding: 18px;\n  box-shadow: var(--shadow-lg);\n}\n\n.modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 14px;\n}\n\n.modal-header h2 {\n  margin: 0;\n  font-size: 17px;\n}\n\n.modal-body {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n\n.decision-context {\n  color: var(--text-muted);\n  margin: 0;\n}\n\n.decision-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n\n.decision-option {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 12px;\n  border-radius: 10px;\n  border: 1px solid var(--border);\n  background: var(--surface);\n  cursor: pointer;\n  font-weight: 500;\n}\n\n.decision-option:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.decision-approve {\n  color: var(--primary);\n  border-color: var(--primary-border);\n}\n\n.decision-reject {\n  color: var(--danger);\n  border-color: var(--danger-border);\n}\n\n.decision-icon {\n  font-size: 18px;\n}\n\n.modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding-top: 4px;\n}\n\n.btn-ghost-danger {\n  color: var(--danger);\n}\n\n.btn-danger {\n  background: var(--danger);\n  color: white;\n  border-color: var(--danger);\n}\n\n.btn-danger:hover {\n  opacity: 0.9;\n}\n\n.btn-loading {\n  opacity: 0.7;\n  pointer-events: none;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DiscountsComponent, { className: "DiscountsComponent", filePath: "frontend/src/app/features/discounts/discounts.component.ts", lineNumber: 54 }); })();
//# sourceMappingURL=discounts.component.js.map