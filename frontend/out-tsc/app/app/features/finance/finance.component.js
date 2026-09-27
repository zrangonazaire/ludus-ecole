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
const _forTrack1 = ($index, $item) => $item.userId;
const _forTrack2 = ($index, $item) => $item.code;
const _forTrack3 = ($index, $item) => $item.levelId;
const _forTrack4 = ($index, $item) => $item.sequence;
const _c0 = () => ({ standalone: true });
function FinanceComponent_Conditional_7_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const range_r1 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate3(" \u00B7 de ", ctx_r1.format(range_r1.min), " \u00E0 ", ctx_r1.format(range_r1.max), " ", ctx_r1.currency(), " ");
} }
function FinanceComponent_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const range_r1 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate2(" \u00B7 ", ctx_r1.format(range_r1.min), " ", ctx_r1.currency(), " par \u00E9l\u00E8ve ");
} }
function FinanceComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, FinanceComponent_Conditional_7_Conditional_0_Template, 1, 3)(1, FinanceComponent_Conditional_7_Conditional_1_Template, 1, 2);
} if (rf & 2) {
    const range_r1 = ctx;
    i0.ɵɵconditional(range_r1.min !== range_r1.max ? 0 : 1);
} }
function FinanceComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openType()); });
    i0.ɵɵelementStart(1, "span", 16);
    i0.ɵɵtext(2, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Nouveau type de frais ");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openApply()); });
    i0.ɵɵtext(1, " Appliquer \u00E0 plusieurs niveaux ");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", c_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", c_r5.code, " \u2014 ", c_r5.name, "");
} }
function FinanceComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Cr\u00E9ez un circuit \u00AB Types de frais et tarifs \u00BB dans Configuration syst\u00E8me.");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.levelsWithoutFees().length);
} }
function FinanceComponent_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 14);
} }
function FinanceComponent_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 17);
    i0.ɵɵlistener("retry", function FinanceComponent_Conditional_33_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_0_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 17);
    i0.ɵɵlistener("retry", function FinanceComponent_Conditional_34_Conditional_0_Conditional_3_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.loadRequests()); });
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_0_For_5_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const detail_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(detail_r9);
} }
function FinanceComponent_Conditional_34_Conditional_0_For_5_For_12_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u00B7 Valid\u00E9 ");
} }
function FinanceComponent_Conditional_34_Conditional_0_For_5_For_12_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u00B7 Refus\u00E9 ");
} }
function FinanceComponent_Conditional_34_Conditional_0_For_5_For_12_For_7_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "date");
} if (rf & 2) {
    const member_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", i0.ɵɵpipeBind2(1, 1, member_r10.decidedAt, "dd/MM/yyyy HH:mm"), " ");
} }
function FinanceComponent_Conditional_34_Conditional_0_For_5_For_12_For_7_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const member_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u2014 ", member_r10.comment, " ");
} }
function FinanceComponent_Conditional_34_Conditional_0_For_5_For_12_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, FinanceComponent_Conditional_34_Conditional_0_For_5_For_12_For_7_Conditional_2_Template, 2, 4)(3, FinanceComponent_Conditional_34_Conditional_0_For_5_For_12_For_7_Conditional_3_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const member_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", member_r10.name, " : ", member_r10.decision === "APPROVED" ? "Valid\u00E9" : member_r10.decision === "REJECTED" ? "Refus\u00E9" : "En attente", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(member_r10.decidedAt ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(member_r10.comment ? 3 : -1);
} }
function FinanceComponent_Conditional_34_Conditional_0_For_5_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵtemplate(4, FinanceComponent_Conditional_34_Conditional_0_For_5_For_12_Conditional_4_Template, 1, 0)(5, FinanceComponent_Conditional_34_Conditional_0_For_5_For_12_Conditional_5_Template, 1, 0);
    i0.ɵɵrepeaterCreate(6, FinanceComponent_Conditional_34_Conditional_0_For_5_For_12_For_7_Template, 4, 4, "p", null, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const stage_r11 = ctx.$implicit;
    const $index_r12 = ctx.$index;
    const request_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("current-stage", $index_r12 + 1 === request_r13.currentLevel && request_r13.status === "SUBMITTED");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stage_r11.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u2014 ", stage_r11.mode === "ALL" ? "Tous les membres requis" : "Un membre suffit", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(stage_r11.status === "APPROVED" ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(stage_r11.status === "REJECTED" ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(stage_r11.members);
} }
function FinanceComponent_Conditional_34_Conditional_0_For_5_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 23);
    i0.ɵɵtext(1, "Commentaire (obligatoire pour refuser)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "textarea", 24);
    i0.ɵɵtwoWayListener("ngModelChange", function FinanceComponent_Conditional_34_Conditional_0_For_5_Conditional_13_Template_textarea_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r14); const request_r13 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r1.comments[request_r13.id], $event) || (ctx_r1.comments[request_r13.id] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 4)(4, "button", 25);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_0_For_5_Conditional_13_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r14); const request_r13 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.decide(request_r13, "APPROVE")); });
    i0.ɵɵtext(5, "Valider ce niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 26);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_0_For_5_Conditional_13_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r14); const request_r13 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.decide(request_r13, "REJECT")); });
    i0.ɵɵtext(7, "Refuser");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const request_r13 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("for", "comment-" + request_r13.id);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "comment-" + request_r13.id);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.comments[request_r13.id]);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !!ctx_r1.decidingId());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !!ctx_r1.decidingId());
} }
function FinanceComponent_Conditional_34_Conditional_0_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 21)(1, "h2");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(6, FinanceComponent_Conditional_34_Conditional_0_For_5_For_7_Template, 2, 1, "p", null, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementStart(8, "h3");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "ol");
    i0.ɵɵrepeaterCreate(11, FinanceComponent_Conditional_34_Conditional_0_For_5_For_12_Template, 8, 6, "li", 22, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, FinanceComponent_Conditional_34_Conditional_0_For_5_Conditional_13_Template, 8, 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const request_r13 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(request_r13.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r1.statusLabels[request_r13.status], " \u00B7 ", i0.ɵɵpipeBind2(5, 5, request_r13.createdAt, "dd/MM/yyyy HH:mm"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.requestDetails(request_r13));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(request_r13.circuitName);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(request_r13.stages);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(request_r13.awaitingMyDecision ? 13 : -1);
} }
function FinanceComponent_Conditional_34_Conditional_0_ForEmpty_6_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Aucune demande de frais.");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_0_ForEmpty_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, FinanceComponent_Conditional_34_Conditional_0_ForEmpty_6_Conditional_0_Template, 2, 0, "p");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵconditional(!ctx_r1.requestsError() ? 0 : -1);
} }
function FinanceComponent_Conditional_34_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 18)(1, "button", 20);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_0_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.loadRequests()); });
    i0.ɵɵtext(2, "Actualiser les demandes");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, FinanceComponent_Conditional_34_Conditional_0_Conditional_3_Template, 1, 0, "eduops-error-state");
    i0.ɵɵrepeaterCreate(4, FinanceComponent_Conditional_34_Conditional_0_For_5_Template, 14, 8, "article", 21, _forTrack0, false, FinanceComponent_Conditional_34_Conditional_0_ForEmpty_6_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.requestsError() ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.requests());
} }
function FinanceComponent_Conditional_34_Conditional_1_For_7_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 35);
    i0.ɵɵtext(1, "Obligatoire");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_1_For_7_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 36);
    i0.ɵɵtext(1, "Facultatif");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_1_For_7_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 38);
    i0.ɵɵtext(1, " Tarif\u00E9 sur ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " niveau(x) ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(type_r18.pricedLevels);
} }
function FinanceComponent_Conditional_34_Conditional_1_For_7_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1, "Aucun tarif d\u00E9fini");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_1_For_7_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 40);
    i0.ɵɵtext(1, " Un frais facultatif n'est pas g\u00E9n\u00E9r\u00E9 d'office \u00E0 l'inscription : il est propos\u00E9, pas d\u00FB. ");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_1_For_7_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 30)(1, "header", 32)(2, "div")(3, "h2", 33);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 34);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, FinanceComponent_Conditional_34_Conditional_1_For_7_Conditional_7_Template, 2, 0, "span", 35)(8, FinanceComponent_Conditional_34_Conditional_1_For_7_Conditional_8_Template, 2, 0, "span", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 37);
    i0.ɵɵtemplate(10, FinanceComponent_Conditional_34_Conditional_1_For_7_Conditional_10_Template, 5, 1, "p", 38)(11, FinanceComponent_Conditional_34_Conditional_1_For_7_Conditional_11_Template, 2, 0, "p", 39)(12, FinanceComponent_Conditional_34_Conditional_1_For_7_Conditional_12_Template, 2, 0, "p", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "footer", 41)(14, "button", 42);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_1_For_7_Template_button_click_14_listener() { const type_r18 = i0.ɵɵrestoreView(_r17).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openType(type_r18)); });
    i0.ɵɵtext(15, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 43);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_1_For_7_Template_button_click_16_listener() { const type_r18 = i0.ɵɵrestoreView(_r17).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.archiveType(type_r18)); });
    i0.ɵɵtext(17, "Archiver");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const type_r18 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(type_r18.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" ", type_r18.code, " \u00B7 ", type_r18.categoryLabel, " \u00B7 ", type_r18.recurrenceLabel, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(type_r18.mandatory ? 7 : 8);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(type_r18.pricedLevels > 0 ? 10 : 11);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!type_r18.mandatory ? 12 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", type_r18.pricedLevels > 0);
    i0.ɵɵattribute("title", type_r18.pricedLevels > 0 ? "Supprimez d'abord ses tarifs" : null);
} }
function FinanceComponent_Conditional_34_Conditional_1_ForEmpty_8_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 31)(1, "p", 44);
    i0.ɵɵtext(2, "Aucun type de frais d\u00E9clar\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 45);
    i0.ɵɵtext(4, " Commencez par ce que votre \u00E9tablissement facture : inscription, scolarit\u00E9, et les frais facultatifs comme la cantine ou le transport. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 15);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_1_ForEmpty_8_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openType()); });
    i0.ɵɵtext(6, " D\u00E9clarer un type de frais ");
    i0.ɵɵelementEnd()();
} }
function FinanceComponent_Conditional_34_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 27);
    i0.ɵɵtext(1, " Un type de frais existe une seule fois pour tout l'\u00E9tablissement et ne porte aucun montant. Son prix se r\u00E8gle niveau par niveau, dans l'onglet ");
    i0.ɵɵelementStart(2, "button", 28);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_1_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.changeTab("TARIFS")); });
    i0.ɵɵtext(3, " Tarifs par niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, ". ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "section", 29);
    i0.ɵɵrepeaterCreate(6, FinanceComponent_Conditional_34_Conditional_1_For_7_Template, 18, 9, "article", 30, _forTrack0, false, FinanceComponent_Conditional_34_Conditional_1_ForEmpty_8_Template, 7, 0, "div", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r1.types());
} }
function FinanceComponent_Conditional_34_Conditional_2_For_59_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", row_r19.optionalCount, " facultatif(s)");
} }
function FinanceComponent_Conditional_34_Conditional_2_For_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "span", 62);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 63);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, FinanceComponent_Conditional_34_Conditional_2_For_59_Conditional_6_Template, 2, 1, "span", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 56);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 56);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 56);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 56);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 56);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 56);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 64)(20, "span", 65);
    i0.ɵɵelement(21, "span", 66);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r19 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("state-table__row--empty", row_r19.scheduleCount === 0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r19.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r19.code);
    i0.ɵɵadvance();
    i0.ɵɵconditional(row_r19.optionalCount > 0 ? 6 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r19.feeTypeCount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r19.pricedLevels);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r19.scheduleCount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatAmount(row_r19.minAmount));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatAmount(row_r19.maxAmount));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r1.format(row_r19.totalAmount), " ", ctx_r1.currency(), "");
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("width", row_r19.share * 100, "%");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.formatPercent(row_r19.share), " ");
} }
function FinanceComponent_Conditional_34_Conditional_2_ForEmpty_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 67);
    i0.ɵɵtext(2, " Aucune rubrique de frais d\u00E9clar\u00E9e. ");
    i0.ɵɵelementEnd()();
} }
function FinanceComponent_Conditional_34_Conditional_2_Conditional_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 61);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Sans aucun tarif : ", ctx_r1.unpricedCategoryNames(), ". Ces rubriques restent utiles \u2014 elles se remplissent d\u00E8s qu'un type de frais les rejoint. ");
} }
function FinanceComponent_Conditional_34_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 27);
    i0.ɵɵtext(1, " Ce que votre plan facture, rubrique par rubrique. Les montants sont ceux des tarifs du catalogue : le total additionne les tarifs pos\u00E9s sur les niveaux, il ne dit pas ce qu'un \u00E9l\u00E8ve doit. La situation des familles se suit dans ");
    i0.ɵɵelementStart(2, "a", 46);
    i0.ɵɵtext(3, "les impay\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, ". ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "section", 47)(6, "article", 48)(7, "span", 49);
    i0.ɵɵtext(8, "Types de frais");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "strong", 50);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 51);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "article", 48)(14, "span", 49);
    i0.ɵɵtext(15, "Niveaux tarif\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "strong", 50);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 51);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "article", 48)(21, "span", 49);
    i0.ɵɵtext(22, "Tarifs pos\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "strong", 50);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span", 51);
    i0.ɵɵtext(26, "couples frais \u00D7 niveau");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "article", 48)(28, "span", 49);
    i0.ɵɵtext(29, "Montant cumul\u00E9 des tarifs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "strong", 50);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span", 51);
    i0.ɵɵtext(33, "toutes rubriques, tous niveaux");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "section", 52)(35, "div", 53)(36, "table", 54)(37, "caption", 55);
    i0.ɵɵtext(38, "Points de facturation par cat\u00E9gorie");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "thead")(40, "tr")(41, "th");
    i0.ɵɵtext(42, "Rubrique");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "th", 56);
    i0.ɵɵtext(44, "Types de frais");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "th", 56);
    i0.ɵɵtext(46, "Niveaux tarif\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "th", 56);
    i0.ɵɵtext(48, "Tarifs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "th", 56);
    i0.ɵɵtext(50, "Mini");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "th", 56);
    i0.ɵɵtext(52, "Maxi");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "th", 56);
    i0.ɵɵtext(54, "Total des tarifs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "th", 56);
    i0.ɵɵtext(56, "Part");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(57, "tbody");
    i0.ɵɵrepeaterCreate(58, FinanceComponent_Conditional_34_Conditional_2_For_59_Template, 23, 15, "tr", 57, _forTrack2, false, FinanceComponent_Conditional_34_Conditional_2_ForEmpty_60_Template, 3, 0, "tr");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "tfoot")(62, "tr")(63, "th", 58);
    i0.ɵɵtext(64, "Total");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "td", 56);
    i0.ɵɵtext(66);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(67, "td", 56);
    i0.ɵɵtext(68);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "td", 56);
    i0.ɵɵtext(70);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(71, "td", 59);
    i0.ɵɵelementStart(72, "td", 56)(73, "strong");
    i0.ɵɵtext(74);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(75, "td", 56);
    i0.ɵɵtext(76);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(77, "p", 60);
    i0.ɵɵtext(78, " \u00AB Total des tarifs \u00BB additionne, pour chaque rubrique, les montants pos\u00E9s sur tous les niveaux. Un frais tarif\u00E9 sur douze niveaux compte donc douze fois : c'est un poids de catalogue, pas une recette attendue. ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(79, FinanceComponent_Conditional_34_Conditional_2_Conditional_79_Template, 2, 1, "p", 61);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r1.categoryTotals().feeTypes);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.categoryTotals().usedCategories, "/", ctx_r1.categoryTotals().categories, " rubrique(s) utilis\u00E9e(s) ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.categoryTotals().pricedLevels);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("sur ", ctx_r1.levels().length, " niveau(x) d\u00E9clar\u00E9(s)");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.categoryTotals().schedules);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.format(ctx_r1.categoryTotals().totalAmount), " ", ctx_r1.currency(), " ");
    i0.ɵɵadvance(27);
    i0.ɵɵrepeater(ctx_r1.categoryStats());
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.categoryTotals().feeTypes);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.categoryTotals().pricedLevels);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.categoryTotals().schedules);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", ctx_r1.format(ctx_r1.categoryTotals().totalAmount), " ", ctx_r1.currency(), "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.categoryTotals().totalAmount > 0 ? "100 %" : "\u2014", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.categoryTotals().unpricedCategories.length > 0 ? 79 : -1);
} }
function FinanceComponent_Conditional_34_Conditional_3_Conditional_0_For_11_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 75)(1, "span", 76);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 77);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 78);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_3_Conditional_0_For_11_Template_button_click_5_listener() { const level_r21 = i0.ɵɵrestoreView(_r20).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.openSchedule(level_r21.levelId)); });
    i0.ɵɵtext(6, "D\u00E9finir le plan");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const level_r21 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r21.levelName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r21.cycleName);
} }
function FinanceComponent_Conditional_34_Conditional_3_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 68)(1, "div", 70)(2, "span", 71);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 72);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 73);
    i0.ɵɵtext(8, " Une inscription sur ces niveaux ne g\u00E9n\u00E9rera aucune \u00E9ch\u00E9ance : il n'y aura rien \u00E0 encaisser, et rien \u00E0 relancer. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "ul", 74);
    i0.ɵɵrepeaterCreate(10, FinanceComponent_Conditional_34_Conditional_3_Conditional_0_For_11_Template, 7, 2, "li", 75, _forTrack3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.levelsWithoutFees().length, " niveau(x) sans tarif ");
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.levelsWithoutFees());
} }
function FinanceComponent_Conditional_34_Conditional_3_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 31)(1, "p", 44);
    i0.ɵɵtext(2, "Aucun type de frais d\u00E9clar\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 45);
    i0.ɵɵtext(4, " Vous pouvez en cr\u00E9er un directement en d\u00E9finissant le tarif d'un niveau : le formulaire de cr\u00E9ation s'ouvre sur place. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 79);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_3_Conditional_1_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r22); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.changeTab("TYPES")); });
    i0.ɵɵtext(6, " Voir le catalogue ");
    i0.ɵɵelementEnd()();
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_8_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const level_r24 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", level_r24.instalmentCount, " \u00E9ch\u00E9ance(s) ");
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_8_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const level_r24 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵtextInterpolate1(" \u00B7 + ", ctx_r1.format(level_r24.optionalTotal), " en options ");
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2, " par \u00E9l\u00E8ve ");
    i0.ɵɵtemplate(3, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_8_Conditional_3_Template, 1, 1)(4, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_8_Conditional_4_Template, 1, 1);
} if (rf & 2) {
    const level_r24 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", ctx_r1.format(level_r24.mandatoryTotal), " ", level_r24.currency, "");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(level_r24.instalmentCount > 0 ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(level_r24.optionalTotal > 0 ? 4 : -1);
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucun frais d\u00E9fini ");
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 86);
    i0.ɵɵtext(1, "Tarif\u00E9");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 87);
    i0.ɵɵtext(1, "\u00C0 d\u00E9finir");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 36);
    i0.ɵɵtext(1, "Facultatif");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 94);
    i0.ɵɵtext(1, "Frais g\u00E9n\u00E9r\u00E9s");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Conditional_8_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 97)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 98);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r27 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(8);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r27.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.format(item_r27.amount));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r27.dueDate);
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 95);
    i0.ɵɵrepeaterCreate(1, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Conditional_8_For_2_Template, 7, 3, "li", 97, _forTrack4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r28 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(row_r28.instalments);
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 63);
    i0.ɵɵtext(1, "D\u00FB en une fois");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵtemplate(3, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Conditional_3_Template, 2, 0, "span", 36)(4, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Conditional_4_Template, 2, 0, "span", 94);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 56);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtemplate(8, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Conditional_8_Template, 3, 0, "ul", 95)(9, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Conditional_9_Template, 2, 0, "span", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 96)(11, "button", 42);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Template_button_click_11_listener() { const row_r28 = i0.ɵɵrestoreView(_r26).$implicit; const level_r24 = i0.ɵɵnextContext(3).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openSchedule(level_r24.levelId, row_r28.feeTypeId)); });
    i0.ɵɵtext(12, " Modifier ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 43);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Template_button_click_13_listener() { const row_r28 = i0.ɵɵrestoreView(_r26).$implicit; const ctx_r1 = i0.ɵɵnextContext(6); return i0.ɵɵresetView(ctx_r1.removeSchedule(row_r28.id, row_r28.feeTypeName)); });
    i0.ɵɵtext(14, " Retirer ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r28 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(6);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", row_r28.feeTypeName, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(!row_r28.mandatory ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(row_r28.locked ? 4 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.format(row_r28.totalAmount), " ", row_r28.currency, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(row_r28.instalments.length > 0 ? 8 : 9);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", row_r28.locked);
    i0.ɵɵattribute("title", row_r28.locked ? "Des frais \u00E9l\u00E8ves en sont issus" : null);
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53)(1, "table", 54)(2, "caption", 55);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "thead")(5, "tr")(6, "th");
    i0.ɵɵtext(7, "Frais");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th", 56);
    i0.ɵɵtext(9, "Montant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "\u00C9ch\u00E9ancier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th")(13, "span", 55);
    i0.ɵɵtext(14, "Actions");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(15, "tbody");
    i0.ɵɵrepeaterCreate(16, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_For_17_Template, 15, 8, "tr", null, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "tfoot")(19, "tr")(20, "th", 58);
    i0.ɵɵtext(21, "Total obligatoire par \u00E9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td", 56)(23, "strong");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(25, "td", 93);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const level_r24 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Frais du niveau ", level_r24.levelName, " ");
    i0.ɵɵadvance(13);
    i0.ɵɵrepeater(level_r24.schedules);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate2("", ctx_r1.format(level_r24.mandatoryTotal), " ", level_r24.currency, "");
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 90);
    i0.ɵɵtext(1, "Aucun frais d\u00E9fini pour ce niveau.");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 99);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r29); const level_r24 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openSchedule(level_r24.levelId)); });
    i0.ɵɵtext(1, " Ajouter un frais ");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 89);
    i0.ɵɵtemplate(1, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_1_Template, 26, 3, "div", 53)(2, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_2_Template, 2, 0, "p", 90);
    i0.ɵɵelementStart(3, "footer", 91);
    i0.ɵɵtemplate(4, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Conditional_4_Template, 2, 0, "button", 92);
    i0.ɵɵelementStart(5, "button", 43);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r25); const level_r24 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openApply(level_r24.levelId)); });
    i0.ɵɵtext(6, " Copier vers d'autres niveaux ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const level_r24 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵconditional(level_r24.schedules.length > 0 ? 1 : 2);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.availableFor(level_r24).length > 0 ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", level_r24.schedules.length === 0);
} }
function FinanceComponent_Conditional_34_Conditional_3_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 80)(1, "button", 81);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_34_Conditional_3_For_4_Template_button_click_1_listener() { const level_r24 = i0.ɵɵrestoreView(_r23).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.toggleLevel(level_r24.levelId)); });
    i0.ɵɵelementStart(2, "span", 82)(3, "span", 83);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 84);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 85);
    i0.ɵɵtemplate(8, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_8_Template, 5, 4)(9, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_9_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_10_Template, 2, 0, "span", 86)(11, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_11_Template, 2, 0, "span", 87);
    i0.ɵɵelementStart(12, "span", 88);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(14, FinanceComponent_Conditional_34_Conditional_3_For_4_Conditional_14_Template, 7, 3, "div", 89);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r24 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("level--open", ctx_r1.openLevelId() === level_r24.levelId);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-expanded", ctx_r1.openLevelId() === level_r24.levelId);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(level_r24.levelName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r24.cycleName);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(level_r24.ready ? 8 : 9);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(level_r24.ready ? 10 : 11);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.openLevelId() === level_r24.levelId ? "\u2212" : "+", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.openLevelId() === level_r24.levelId ? 14 : -1);
} }
function FinanceComponent_Conditional_34_Conditional_3_ForEmpty_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31)(1, "p", 44);
    i0.ɵɵtext(2, "Aucun niveau d\u00E9fini.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 45);
    i0.ɵɵtext(4, " Les frais se rattachent aux niveaux. Cr\u00E9ez-les d'abord dans ");
    i0.ɵɵelementStart(5, "a", 100);
    i0.ɵɵtext(6, "la configuration");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7, ". ");
    i0.ɵɵelementEnd()();
} }
function FinanceComponent_Conditional_34_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, FinanceComponent_Conditional_34_Conditional_3_Conditional_0_Template, 12, 1, "section", 68)(1, FinanceComponent_Conditional_34_Conditional_3_Conditional_1_Template, 7, 0, "div", 31);
    i0.ɵɵelementStart(2, "section", 19);
    i0.ɵɵrepeaterCreate(3, FinanceComponent_Conditional_34_Conditional_3_For_4_Template, 15, 9, "article", 69, _forTrack3, false, FinanceComponent_Conditional_34_Conditional_3_ForEmpty_5_Template, 8, 0, "div", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(ctx_r1.levelsWithoutFees().length > 0 ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.types().length === 0 ? 1 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.levels());
} }
function FinanceComponent_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, FinanceComponent_Conditional_34_Conditional_0_Template, 7, 2, "section", 18)(1, FinanceComponent_Conditional_34_Conditional_1_Template, 9, 1)(2, FinanceComponent_Conditional_34_Conditional_2_Template, 80, 16)(3, FinanceComponent_Conditional_34_Conditional_3_Template, 6, 3, "section", 19);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r1.tab() === "REQUESTS" ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.tab() === "TYPES" ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.tab() === "CATEGORIES" ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.tab() === "TARIFS" ? 3 : -1);
} }
function FinanceComponent_Conditional_35_Conditional_2_For_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r32 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r32.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r32.label);
} }
function FinanceComponent_Conditional_35_Conditional_2_For_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r33 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r33.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r33.label);
} }
function FinanceComponent_Conditional_35_Conditional_2_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 60);
    i0.ɵɵtext(1, " Un frais facultatif \u2014 cantine, transport \u2014 n'est pas g\u00E9n\u00E9r\u00E9 d'office \u00E0 l'inscription. Il est propos\u00E9 aux familles qui le souhaitent, et n'entre pas dans le total d\u00FB par \u00E9l\u00E8ve. ");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_35_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 103)(1, "h2", 104);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 105);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_2_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r31); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "form", 106)(6, "div", 107)(7, "div", 108)(8, "label", 109);
    i0.ɵɵtext(9, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(10, "input", 110);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 108)(12, "label", 111);
    i0.ɵɵtext(13, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(14, "input", 112);
    i0.ɵɵelementStart(15, "span", 113);
    i0.ɵɵtext(16, " Mis en majuscules sans accent : il figure sur les re\u00E7us. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "div", 107)(18, "div", 108)(19, "label", 114);
    i0.ɵɵtext(20, " Cat\u00E9gorie ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "select", 115);
    i0.ɵɵrepeaterCreate(22, FinanceComponent_Conditional_35_Conditional_2_For_23_Template, 2, 2, "option", 10, _forTrack2);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 108)(25, "label", 116);
    i0.ɵɵtext(26, " P\u00E9riodicit\u00E9 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "select", 117);
    i0.ɵɵrepeaterCreate(28, FinanceComponent_Conditional_35_Conditional_2_For_29_Template, 2, 2, "option", 10, _forTrack2);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "label", 118);
    i0.ɵɵelement(31, "input", 119);
    i0.ɵɵelementStart(32, "span");
    i0.ɵɵtext(33, "Frais obligatoire, d\u00FB par tous les \u00E9l\u00E8ves du niveau");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(34, FinanceComponent_Conditional_35_Conditional_2_Conditional_34_Template, 2, 0, "p", 60);
    i0.ɵɵelementStart(35, "label", 118);
    i0.ɵɵelement(36, "input", 120);
    i0.ɵɵelementStart(37, "span");
    i0.ɵɵtext(38, "Remboursable en cas de d\u00E9part");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(39, "footer", 121)(40, "button", 79);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_2_Template_button_click_40_listener() { i0.ɵɵrestoreView(_r31); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(41, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "button", 25);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_2_Template_button_click_42_listener() { i0.ɵɵrestoreView(_r31); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitType()); });
    i0.ɵɵtext(43);
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
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(!ctx_r1.typeForm.controls.mandatory.value ? 34 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("disabled", ctx_r1.typeForm.invalid || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Enregistrement..." : "Enregistrer", " ");
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Appliquer un tarif ");
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵtextInterpolate1(" Frais \u2014 ", (tmp_4_0 = ctx_r1.levelById(ctx_r1.scheduleLevelId() || "")) == null ? null : tmp_4_0.levelName, " ");
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 60);
    i0.ɵɵtext(1, " La scolarit\u00E9 augmente en g\u00E9n\u00E9ral avec le niveau, mais l'inscription, la cantine ou le transport sont identiques pour tous. Saisir seize fois le m\u00EAme montant, c'est seize occasions d'ajouter un z\u00E9ro. ");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_35_Conditional_3_For_14_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " (facultatif) ");
} }
function FinanceComponent_Conditional_35_Conditional_3_For_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, FinanceComponent_Conditional_35_Conditional_3_For_14_Conditional_2_Template, 1, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r35 = ctx.$implicit;
    i0.ɵɵproperty("value", type_r35.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", type_r35.name, "");
    i0.ɵɵadvance();
    i0.ɵɵconditional(!type_r35.mandatory ? 2 : -1);
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 113);
    i0.ɵɵtext(1, " Aucun type d\u00E9clar\u00E9 : choisissez \u00AB Cr\u00E9er un type de frais \u00BB pour en ajouter un sans quitter cet \u00E9cran. ");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_18_For_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r37 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r37.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r37.label);
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_18_For_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r38 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r38.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r38.label);
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r36 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 126)(1, "header", 146)(2, "h3", 147);
    i0.ɵɵtext(3, "Nouveau type de frais");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 148);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_3_Conditional_18_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r36); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.cancelInlineType()); });
    i0.ɵɵtext(5, " \u00D7 ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 107)(7, "div", 108)(8, "label", 149);
    i0.ɵɵtext(9, " Nom ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "input", 150);
    i0.ɵɵlistener("input", function FinanceComponent_Conditional_35_Conditional_3_Conditional_18_Template_input_input_10_listener($event) { i0.ɵɵrestoreView(_r36); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.suggestCode($event.target.value)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 108)(12, "label", 151);
    i0.ɵɵtext(13, " Code ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(14, "input", 152);
    i0.ɵɵelementStart(15, "span", 113);
    i0.ɵɵtext(16, "Propos\u00E9 d'apr\u00E8s le nom.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "div", 107)(18, "div", 108)(19, "label", 153);
    i0.ɵɵtext(20, " Cat\u00E9gorie ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "select", 154);
    i0.ɵɵrepeaterCreate(22, FinanceComponent_Conditional_35_Conditional_3_Conditional_18_For_23_Template, 2, 2, "option", 10, _forTrack2);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 108)(25, "label", 155);
    i0.ɵɵtext(26, " P\u00E9riodicit\u00E9 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "select", 156);
    i0.ɵɵrepeaterCreate(28, FinanceComponent_Conditional_35_Conditional_3_Conditional_18_For_29_Template, 2, 2, "option", 10, _forTrack2);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "label", 118);
    i0.ɵɵelement(31, "input", 119);
    i0.ɵɵelementStart(32, "span");
    i0.ɵɵtext(33, "Frais obligatoire, d\u00FB par tous les \u00E9l\u00E8ves du niveau");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div", 157)(35, "button", 99);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_3_Conditional_18_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r36); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.cancelInlineType()); });
    i0.ɵɵtext(36, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "button", 158);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_3_Conditional_18_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r36); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.createInlineType()); });
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(22);
    i0.ɵɵrepeater(ctx_r1.categories);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r1.recurrences);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("disabled", ctx_r1.newType.invalid || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Cr\u00E9ation..." : "Cr\u00E9er et s\u00E9lectionner", " ");
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_46_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r39 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 159);
    i0.ɵɵelement(1, "input", 160)(2, "input", 161)(3, "input", 162);
    i0.ɵɵelementStart(4, "button", 163);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_3_Conditional_46_For_2_Template_button_click_4_listener() { const ɵ$index_826_r40 = i0.ɵɵrestoreView(_r39).$index; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.balanceOn(ɵ$index_826_r40)); });
    i0.ɵɵtext(5, "=");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 164);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_3_Conditional_46_For_2_Template_button_click_6_listener() { const ɵ$index_826_r40 = i0.ɵɵrestoreView(_r39).$index; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.removeInstalment(ɵ$index_826_r40)); });
    i0.ɵɵtext(7, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ɵ$index_826_r40 = ctx.$index;
    i0.ɵɵproperty("formGroupName", ɵ$index_826_r40);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", "Libell\u00E9 de la tranche " + (ɵ$index_826_r40 + 1));
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", "Montant de la tranche " + (ɵ$index_826_r40 + 1));
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", "\u00C9ch\u00E9ance de la tranche " + (ɵ$index_826_r40 + 1));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("aria-label", "Supprimer la tranche " + (ɵ$index_826_r40 + 1));
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 141);
    i0.ɵɵrepeaterCreate(1, FinanceComponent_Conditional_35_Conditional_3_Conditional_46_For_2_Template, 8, 5, "li", 159, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.instalments.controls);
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 142);
    i0.ɵɵtext(1, " Aucune \u00E9ch\u00E9ance : le montant sera d\u00FB en une seule fois, \u00E0 l'inscription. ");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_51_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u2014 il reste ");
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r1.format(ctx_r1.remaining()), " ", ctx_r1.currency(), "");
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_51_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u2014 d\u00E9passement de ");
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r1.format(-ctx_r1.remaining()), " ", ctx_r1.currency(), "");
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_51_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u2014 le compte est juste ");
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 165);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, FinanceComponent_Conditional_35_Conditional_3_Conditional_51_Conditional_2_Template, 3, 2, "strong")(3, FinanceComponent_Conditional_35_Conditional_3_Conditional_51_Conditional_3_Template, 3, 2, "strong")(4, FinanceComponent_Conditional_35_Conditional_3_Conditional_51_Conditional_4_Template, 1, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("balance--ok", ctx_r1.balanced())("balance--off", !ctx_r1.balanced());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" R\u00E9parti : ", ctx_r1.format(ctx_r1.planned()), " / ", ctx_r1.format(ctx_r1.scheduleForm.controls.totalAmount.value), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.remaining() > 0 ? 2 : ctx_r1.remaining() < 0 ? 3 : 4);
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_52_For_4_For_5_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 174);
    i0.ɵɵtext(1, "sans tarif");
    i0.ɵɵelementEnd();
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_52_For_4_For_5_Template(rf, ctx) { if (rf & 1) {
    const _r44 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 172)(1, "input", 173);
    i0.ɵɵlistener("change", function FinanceComponent_Conditional_35_Conditional_3_Conditional_52_For_4_For_5_Template_input_change_1_listener() { const level_r45 = i0.ɵɵrestoreView(_r44).$implicit; const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.toggleTarget(level_r45.levelId)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, FinanceComponent_Conditional_35_Conditional_3_Conditional_52_For_4_For_5_Conditional_4_Template, 2, 0, "span", 174);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r45 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵclassProp("chip-check--on", ctx_r1.isTargeted(level_r45.levelId));
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r1.isTargeted(level_r45.levelId));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(level_r45.levelName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!level_r45.ready ? 4 : -1);
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_52_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r42 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 167)(1, "button", 169);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_3_Conditional_52_For_4_Template_button_click_1_listener() { const cycle_r43 = i0.ɵɵrestoreView(_r42).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.toggleCycleTargets(cycle_r43.id)); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 170);
    i0.ɵɵrepeaterCreate(4, FinanceComponent_Conditional_35_Conditional_3_Conditional_52_For_4_For_5_Template, 5, 5, "label", 171, _forTrack3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const cycle_r43 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", cycle_r43.name, " \u2014 tout s\u00E9lectionner ");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(cycle_r43.levels);
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_52_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Les niveaux qui ont d\u00E9j\u00E0 ce frais verront leur montant remplac\u00E9. ");
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_52_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Seuls les niveaux sans ce frais seront tarif\u00E9s. Les montants d\u00E9j\u00E0 r\u00E9gl\u00E9s ne sont pas \u00E9cras\u00E9s. ");
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    const _r41 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section")(1, "h3", 166);
    i0.ɵɵtext(2, "Les niveaux concern\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(3, FinanceComponent_Conditional_35_Conditional_3_Conditional_52_For_4_Template, 6, 1, "div", 167, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "label", 118)(6, "input", 168);
    i0.ɵɵtwoWayListener("ngModelChange", function FinanceComponent_Conditional_35_Conditional_3_Conditional_52_Template_input_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r41); const ctx_r1 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r1.applyReplace, $event) || (ctx_r1.applyReplace = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8, "\u00C9craser le tarif existant de ces niveaux");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "p", 60);
    i0.ɵɵtemplate(10, FinanceComponent_Conditional_35_Conditional_3_Conditional_52_Conditional_10_Template, 1, 0)(11, FinanceComponent_Conditional_35_Conditional_3_Conditional_52_Conditional_11_Template, 1, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.cycles());
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.applyReplace);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r1.applyReplace ? 10 : 11);
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_56_Template(rf, ctx) { if (rf & 1) {
    const _r46 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_3_Conditional_56_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r46); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.submitApply()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", !ctx_r1.canApply());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Application..." : "Appliquer \u00E0 " + ctx_r1.applyTargets().length + " niveau(x)", " ");
} }
function FinanceComponent_Conditional_35_Conditional_3_Conditional_57_Template(rf, ctx) { if (rf & 1) {
    const _r47 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_3_Conditional_57_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r47); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.submitSchedule()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r1.scheduleForm.invalid || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Enregistrement..." : "Enregistrer", " ");
} }
function FinanceComponent_Conditional_35_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r34 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 103)(1, "h2", 104);
    i0.ɵɵtemplate(2, FinanceComponent_Conditional_35_Conditional_3_Conditional_2_Template, 1, 0)(3, FinanceComponent_Conditional_35_Conditional_3_Conditional_3_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 105);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_3_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r34); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(5, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 122);
    i0.ɵɵtemplate(7, FinanceComponent_Conditional_35_Conditional_3_Conditional_7_Template, 2, 0, "p", 60);
    i0.ɵɵelementStart(8, "form", 123)(9, "div", 108)(10, "label", 124);
    i0.ɵɵtext(11, " Type de frais ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "select", 125);
    i0.ɵɵlistener("change", function FinanceComponent_Conditional_35_Conditional_3_Template_select_change_12_listener($event) { i0.ɵɵrestoreView(_r34); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onFeeTypeChanged($event.target.value)); });
    i0.ɵɵrepeaterCreate(13, FinanceComponent_Conditional_35_Conditional_3_For_14_Template, 3, 3, "option", 10, _forTrack0);
    i0.ɵɵelementStart(15, "option", 10);
    i0.ɵɵtext(16, "+ Cr\u00E9er un type de frais\u2026");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(17, FinanceComponent_Conditional_35_Conditional_3_Conditional_17_Template, 2, 0, "span", 113);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, FinanceComponent_Conditional_35_Conditional_3_Conditional_18_Template, 39, 2, "section", 126);
    i0.ɵɵelementStart(19, "div", 108)(20, "label", 127);
    i0.ɵɵtext(21, " Montant annuel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 128);
    i0.ɵɵelement(23, "input", 129);
    i0.ɵɵelementStart(24, "span", 130);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(26, "section", 131)(27, "header", 132)(28, "h3", 133);
    i0.ɵɵtext(29, "\u00C9ch\u00E9ancier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "p", 134);
    i0.ɵɵtext(31, " Chaque \u00E9ch\u00E9ance a son propre montant et sa propre date. Une rentr\u00E9e plus lourde que les tranches suivantes se saisit telle quelle. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div", 135)(33, "span", 136);
    i0.ɵɵtext(34, "Pr\u00E9-remplir :");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "input", 137);
    i0.ɵɵtwoWayListener("ngModelChange", function FinanceComponent_Conditional_35_Conditional_3_Template_input_ngModelChange_35_listener($event) { i0.ɵɵrestoreView(_r34); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.spreadCount, $event) || (ctx_r1.spreadCount = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span", 136);
    i0.ɵɵtext(37, "tranches \u00E0 partir du");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "input", 138);
    i0.ɵɵtwoWayListener("ngModelChange", function FinanceComponent_Conditional_35_Conditional_3_Template_input_ngModelChange_38_listener($event) { i0.ɵɵrestoreView(_r34); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.spreadFirstDate, $event) || (ctx_r1.spreadFirstDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span", 136);
    i0.ɵɵtext(40, "tous les");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "input", 139);
    i0.ɵɵtwoWayListener("ngModelChange", function FinanceComponent_Conditional_35_Conditional_3_Template_input_ngModelChange_41_listener($event) { i0.ɵɵrestoreView(_r34); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.spreadMonths, $event) || (ctx_r1.spreadMonths = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "span", 136);
    i0.ɵɵtext(43, "mois");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "button", 140);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_3_Template_button_click_44_listener() { i0.ɵɵrestoreView(_r34); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.spreadEvenly()); });
    i0.ɵɵtext(45, "R\u00E9partir \u00E9galement");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(46, FinanceComponent_Conditional_35_Conditional_3_Conditional_46_Template, 3, 0, "ul", 141)(47, FinanceComponent_Conditional_35_Conditional_3_Conditional_47_Template, 2, 0, "p", 142);
    i0.ɵɵelementStart(48, "div", 143)(49, "button", 42);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_3_Template_button_click_49_listener() { i0.ɵɵrestoreView(_r34); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.addInstalment()); });
    i0.ɵɵtext(50, " + Ajouter une \u00E9ch\u00E9ance ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(51, FinanceComponent_Conditional_35_Conditional_3_Conditional_51_Template, 5, 7, "p", 144);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(52, FinanceComponent_Conditional_35_Conditional_3_Conditional_52_Template, 12, 2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "footer", 121)(54, "button", 79);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Conditional_3_Template_button_click_54_listener() { i0.ɵɵrestoreView(_r34); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(55, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(56, FinanceComponent_Conditional_35_Conditional_3_Conditional_56_Template, 2, 2, "button", 145)(57, FinanceComponent_Conditional_35_Conditional_3_Conditional_57_Template, 2, 2, "button", 145);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const openPanel_r48 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(openPanel_r48 === "APPLY" ? 2 : 3);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(openPanel_r48 === "APPLY" ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.scheduleForm);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r1.types());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r1.newTypeOption);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r1.creatingType() && ctx_r1.types().length === 0 ? 17 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.creatingType() ? 18 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.currency());
    i0.ɵɵadvance(10);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.spreadCount);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(18, _c0));
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.spreadFirstDate);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(19, _c0));
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.spreadMonths);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(20, _c0));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.scheduleForm.controls.totalAmount.value <= 0);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.instalments.length > 0 ? 46 : 47);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r1.instalments.length > 0 ? 51 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(openPanel_r48 === "APPLY" ? 52 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(openPanel_r48 === "APPLY" ? 56 : 57);
} }
function FinanceComponent_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 101);
    i0.ɵɵlistener("click", function FinanceComponent_Conditional_35_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r30); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 102);
    i0.ɵɵtemplate(2, FinanceComponent_Conditional_35_Conditional_2_Template, 44, 5)(3, FinanceComponent_Conditional_35_Conditional_3_Template, 58, 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const openPanel_r48 = ctx;
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(openPanel_r48 === "TYPE" ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(openPanel_r48 === "SCHEDULE" || openPanel_r48 === "APPLY" ? 3 : -1);
} }
/**
 * Fees: what the school charges, and when it falls due.
 *
 * <p>Two halves of one question, like subjects and their coefficients. What the
 * school bills — inscription, scolarité, cantine — is the same list everywhere;
 * what it costs changes with the level. Keeping them on one screen is what
 * stops a school declaring fee types and never pricing them, which leaves
 * enrolments generating nothing to collect.</p>
 */
export class FinanceComponent {
    dataSource = inject(FEE_DATA_SOURCE);
    approvals = inject(FeeApprovalService);
    circuitService = inject(ApprovalCircuitService);
    circuits = signal([]);
    circuitId = signal('');
    requests = signal([]);
    requestsError = signal(false);
    decidingId = signal(null);
    comments = {};
    pendingCount = computed(() => this.requests().filter(r => r.status === 'SUBMITTED').length);
    statusLabels = { SUBMITTED: 'En validation', APPROVED: 'Approuvée', REJECTED: 'Refusée', EFFECTIVE: 'Appliquée' };
    notifications = inject(NotificationService);
    setupStatus = inject(SetupStatusService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    categories = FEE_CATEGORIES;
    recurrences = FEE_RECURRENCES;
    tab = signal('TARIFS');
    types = signal([]);
    levels = signal([]);
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    panel = signal(null);
    editingType = signal(null);
    openLevelId = signal(null);
    /** Niveau visé par le panneau de tarif. */
    scheduleLevelId = signal(null);
    applyTargets = signal([]);
    applyReplace = false;
    /** Vrai quand on crée un type de frais sans quitter le panneau de tarif. */
    creatingType = signal(false);
    /** Valeur sentinelle de la liste déroulante qui déclenche la création. */
    static NEW_TYPE = '__new__';
    newTypeOption = FinanceComponent.NEW_TYPE;
    typeForm = this.fb.nonNullable.group({
        code: ['', [Validators.required, Validators.maxLength(40)]],
        name: ['', [Validators.required, Validators.maxLength(150)]],
        category: ['TUITION', [Validators.required]],
        recurrence: ['ANNUAL', [Validators.required]],
        mandatory: [true],
        refundable: [false]
    });
    scheduleForm = this.fb.nonNullable.group({
        feeTypeId: ['', [Validators.required]],
        totalAmount: [0, [Validators.required, Validators.min(0)]],
        instalments: this.fb.array([]),
        // Groupe imbriqué plutôt qu'un second formulaire : un [formGroup] dans un
        // autre est refusé par Angular. Désactivé, il n'entre pas dans la validité.
        newType: this.fb.nonNullable.group({
            code: ['', [Validators.required, Validators.maxLength(40)]],
            name: ['', [Validators.required, Validators.maxLength(150)]],
            category: ['OTHER', [Validators.required]],
            recurrence: ['ANNUAL', [Validators.required]],
            mandatory: [true]
        })
    });
    /** Paramètres du bouton « Répartir également », qui ne fait que pré-remplir. */
    spreadCount = 3;
    spreadFirstDate = '';
    spreadMonths = 3;
    get instalments() {
        return this.scheduleForm.controls.instalments;
    }
    get newType() {
        return this.scheduleForm.controls.newType;
    }
    ngOnInit() {
        this.newType.disable();
        this.circuitService.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: rows => { this.circuits.set(rows.filter(c => c.usage === 'FEE')); this.circuitId.set(this.circuits()[0]?.id ?? ''); },
            error: () => this.notifications.error('Chargement des circuits impossible.')
        });
        this.load();
    }
    load() {
        this.loadRequests();
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.listTypes().pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (list) => {
                this.types.set(list);
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
            error: () => this.levels.set([])
        });
    }
    changeTab(tab) {
        this.tab.set(tab);
        this.panel.set(null);
    }
    // ------------------------------------------------------------------ vues
    /** Niveaux sans aucun frais obligatoire : leurs inscriptions ne factureront rien. */
    levelsWithoutFees = computed(() => this.levels().filter((l) => !l.ready));
    readyCount = computed(() => this.levels().filter((l) => l.ready).length);
    currency = computed(() => this.levels()[0]?.currency ?? 'XOF');
    /** Écart entre le niveau le moins cher et le plus cher, s'il y en a un. */
    priceRange = computed(() => {
        const priced = this.levels().filter((l) => l.ready).map((l) => l.mandatoryTotal);
        if (priced.length === 0) {
            return null;
        }
        return { min: Math.min(...priced), max: Math.max(...priced) };
    });
    /**
     * État du plan par rubrique : ce que chaque catégorie porte réellement.
     *
     * <p>Toutes les rubriques connues figurent dans l'état, même celles restées
     * vides : « Transport : 0 » est une information, pas un trou. Le libellé vient
     * du type de frais — une rubrique créée par l'école n'est pas dans la liste
     * statique — et rien n'est relu du serveur : cet état ne fait que recomposer
     * les types et les tarifs déjà chargés.</p>
     */
    categoryStats = computed(() => {
        const types = this.types();
        const typeCounts = new Map();
        const typeById = new Map();
        for (const type of types) {
            typeCounts.set(type.category, (typeCounts.get(type.category) ?? 0) + 1);
            typeById.set(type.id, type);
        }
        const drafts = new Map();
        const ensure = (code, label) => {
            const existing = drafts.get(code);
            if (existing) {
                // Le code ne tient lieu de libellé que faute de mieux.
                if (existing.label === code && label !== code) {
                    existing.label = label;
                }
                return existing;
            }
            const draft = { label, levels: new Set(), amounts: [], optional: 0 };
            drafts.set(code, draft);
            return draft;
        };
        // Les rubriques réellement déclarées, puis celles du catalogue d'origine.
        for (const type of types) {
            ensure(type.category, type.categoryLabel || type.category);
        }
        for (const category of FEE_CATEGORIES) {
            ensure(category.code, category.label);
        }
        for (const level of this.levels()) {
            for (const schedule of level.schedules) {
                const type = typeById.get(schedule.feeTypeId);
                const draft = ensure(schedule.category, type?.categoryLabel || schedule.category);
                draft.levels.add(level.levelId);
                draft.amounts.push(schedule.totalAmount);
                if (!schedule.mandatory) {
                    draft.optional += 1;
                }
            }
        }
        const rows = Array.from(drafts.entries()).map(([code, draft]) => {
            const total = draft.amounts.reduce((sum, amount) => sum + amount, 0);
            return {
                code,
                label: draft.label,
                feeTypeCount: typeCounts.get(code) ?? 0,
                pricedLevels: draft.levels.size,
                scheduleCount: draft.amounts.length,
                optionalCount: draft.optional,
                minAmount: draft.amounts.length ? Math.min(...draft.amounts) : null,
                maxAmount: draft.amounts.length ? Math.max(...draft.amounts) : null,
                totalAmount: total,
                share: 0
            };
        });
        // L'ordre suit le poids réel : la rubrique qui pèse le plus vient en tête.
        rows.sort((a, b) => b.totalAmount - a.totalAmount
            || a.label.localeCompare(b.label, 'fr'));
        const grandTotal = rows.reduce((sum, row) => sum + row.totalAmount, 0);
        return grandTotal > 0
            ? rows.map((row) => ({ ...row, share: row.totalAmount / grandTotal }))
            : rows;
    });
    /** Chiffres de tête de l'état par rubrique. */
    categoryTotals = computed(() => {
        const rows = this.categoryStats();
        return {
            categories: rows.length,
            usedCategories: rows.filter((row) => row.scheduleCount > 0).length,
            unpricedCategories: rows.filter((row) => row.scheduleCount === 0),
            feeTypes: this.types().length,
            schedules: rows.reduce((sum, row) => sum + row.scheduleCount, 0),
            totalAmount: rows.reduce((sum, row) => sum + row.totalAmount, 0),
            pricedLevels: this.levels().filter((level) => level.schedules.length > 0).length
        };
    });
    /** Les rubriques déclarées qu'aucun tarif ne vient encore remplir. */
    unpricedCategoryNames = computed(() => this.categoryTotals()
        .unpricedCategories.map((row) => row.label).join(' · '));
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
    }
    levelById(levelId) {
        return this.levels().find((l) => l.levelId === levelId);
    }
    /** Types de frais pas encore tarifés sur ce niveau. */
    availableFor(level) {
        const used = new Set(level.schedules.map((s) => s.feeTypeId));
        return this.types().filter((t) => !used.has(t.id));
    }
    format(amount) {
        return new Intl.NumberFormat('fr-FR').format(amount);
    }
    /** Part d'une rubrique dans le total des tarifs, en pourcentage. */
    formatPercent(share) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'percent', maximumFractionDigits: 1
        }).format(share);
    }
    /** Un montant, ou un tiret quand la rubrique ne porte encore aucun tarif. */
    formatAmount(amount) {
        return amount === null ? '—' : this.format(amount);
    }
    /**
     * Réagit au choix dans la liste des types de frais.
     *
     * <p>La sentinelle ouvre un formulaire de création sur place. Renvoyer
     * l'utilisateur vers l'onglet « Types de frais » lui ferait perdre le montant
     * et l'échéancier qu'il vient de saisir.</p>
     */
    onFeeTypeChanged(value) {
        if (value === FinanceComponent.NEW_TYPE) {
            this.newType.reset({
                code: '', name: '', category: 'OTHER', recurrence: 'ANNUAL', mandatory: true
            });
            this.newType.enable();
            this.creatingType.set(true);
        }
        else {
            this.newType.disable();
            this.creatingType.set(false);
        }
    }
    cancelInlineType() {
        this.newType.disable();
        this.creatingType.set(false);
        this.scheduleForm.controls.feeTypeId.setValue(this.types()[0]?.id ?? '');
    }
    /** Crée le type puis le sélectionne, sans fermer le panneau de tarif. */
    createInlineType() {
        if (this.newType.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.newType.getRawValue();
        if (!this.requireCircuit())
            return;
        this.approvals.createType({
            code: value.code.trim(),
            name: value.name.trim(),
            category: value.category,
            recurrence: value.recurrence,
            mandatory: value.mandatory,
            refundable: false
        }, this.circuitId()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.cancelInlineType();
                this.saving.set(false);
                this.notifications.success('Demande envoyée. Le nouveau type sera disponible après validation.');
                this.loadRequests();
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    /** Le code est proposé d'après le nom, tant qu'on n'y a pas touché. */
    suggestCode(name) {
        if (this.newType.controls.code.dirty) {
            return;
        }
        const code = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toUpperCase().replace(/[^A-Z0-9]+/g, '').slice(0, 8);
        this.newType.controls.code.setValue(code);
    }
    // -------------------------------------------------------- types de frais
    openType(type) {
        this.editingType.set(type ?? null);
        this.typeForm.reset({
            code: type?.code ?? '',
            name: type?.name ?? '',
            category: type?.category ?? 'TUITION',
            recurrence: type?.recurrence ?? 'ANNUAL',
            mandatory: type?.mandatory ?? true,
            refundable: type?.refundable ?? false
        });
        this.panel.set('TYPE');
    }
    submitType() {
        if (this.typeForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.typeForm.getRawValue();
        const payload = {
            code: value.code.trim(),
            name: value.name.trim(),
            category: value.category,
            recurrence: value.recurrence,
            mandatory: value.mandatory,
            refundable: value.refundable
        };
        const editing = this.editingType();
        if (!this.requireCircuit())
            return;
        const request = editing
            ? this.approvals.updateType(editing.id, payload, this.circuitId())
            : this.approvals.createType(payload, this.circuitId());
        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => { this.submitted(); },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    archiveType(type) {
        if (!this.requireCircuit())
            return;
        this.approvals.archiveType(type.id, this.circuitId()).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.submitted();
            },
            error: (err) => this.explain(err)
        });
    }
    // -------------------------------------------------------------- tarifs
    openSchedule(levelId, feeTypeId) {
        const level = this.levelById(levelId);
        const existing = feeTypeId
            ? level?.schedules.find((s) => s.feeTypeId === feeTypeId)
            : undefined;
        const fallback = this.availableFor(level)[0]?.id ?? this.types()[0]?.id ?? '';
        this.scheduleLevelId.set(levelId);
        this.scheduleForm.patchValue({
            feeTypeId: existing?.feeTypeId ?? fallback,
            totalAmount: existing?.totalAmount ?? 0
        });
        this.instalments.clear();
        (existing?.instalments ?? []).forEach((row) => this.instalments.push(this.row(row.label, row.amount, row.dueDate, row.graceDays)));
        this.spreadCount = existing?.instalments.length || 3;
        this.spreadFirstDate = existing?.instalments[0]?.dueDate ?? '';
        this.spreadMonths = 3;
        this.panel.set('SCHEDULE');
    }
    /** Une ligne d'échéance : montant et date saisis librement. */
    row(label, amount, dueDate, graceDays = 0) {
        return this.fb.nonNullable.group({
            label: [label, [Validators.maxLength(120)]],
            amount: [amount, [Validators.required, Validators.min(0.01)]],
            dueDate: [dueDate, [Validators.required]],
            graceDays: [graceDays, [Validators.min(0), Validators.max(90)]]
        });
    }
    addInstalment() {
        const last = this.instalments.at(this.instalments.length - 1);
        const nextDate = last
            ? this.shiftMonths(last.controls.dueDate.value, this.spreadMonths)
            : (this.spreadFirstDate || this.defaultFirstDate());
        // La nouvelle ligne reprend le reste à répartir : le cas courant est
        // « il me manque une tranche pour tomber juste ».
        const remaining = Math.max(0, this.remaining());
        this.instalments.push(this.row(this.ordinal(this.instalments.length + 1), remaining, nextDate));
    }
    removeInstalment(index) {
        this.instalments.removeAt(index);
        this.renumber();
    }
    /**
     * Pré-remplit un échéancier régulier.
     *
     * <p>Ce n'est qu'un point de départ : chaque montant reste ensuite modifiable
     * indépendamment. La différence d'arrondi va sur la première tranche pour que
     * la somme tombe exactement sur le total annoncé.</p>
     */
    spreadEvenly() {
        const total = this.scheduleForm.controls.totalAmount.value;
        const count = this.spreadCount;
        if (!count || count < 1 || total <= 0) {
            return;
        }
        const share = Math.round((total / count) * 100) / 100;
        const first = Math.round((total - share * (count - 1)) * 100) / 100;
        let due = this.spreadFirstDate || this.defaultFirstDate();
        this.instalments.clear();
        for (let i = 0; i < count; i++) {
            this.instalments.push(this.row(this.ordinal(i + 1), i === 0 ? first : share, due));
            due = this.shiftMonths(due, this.spreadMonths || 3);
        }
    }
    /** Met le reste à répartir sur une ligne, pour tomber juste en un clic. */
    balanceOn(index) {
        const row = this.instalments.at(index);
        if (!row) {
            return;
        }
        const others = this.instalments.controls
            .filter((_, i) => i !== index)
            .reduce((sum, c) => sum + (c.controls.amount.value || 0), 0);
        const target = Math.round((this.scheduleForm.controls.totalAmount.value - others) * 100) / 100;
        if (target > 0) {
            row.controls.amount.setValue(target);
        }
    }
    renumber() {
        this.instalments.controls.forEach((control, index) => {
            const label = control.controls.label.value;
            if (!label || /^\d+(re|e) tranche$/.test(label)) {
                control.controls.label.setValue(this.ordinal(index + 1));
            }
        });
    }
    ordinal(sequence) {
        return sequence === 1 ? '1re tranche' : `${sequence}e tranche`;
    }
    defaultFirstDate() {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date.toISOString().slice(0, 10);
    }
    shiftMonths(iso, months) {
        const date = iso ? new Date(iso) : new Date();
        date.setMonth(date.getMonth() + months);
        return date.toISOString().slice(0, 10);
    }
    // --------------------------------------------------- contrôle de la somme
    /** Somme des échéances saisies. */
    planned() {
        return Math.round(this.instalments.controls
            .reduce((sum, c) => sum + (c.controls.amount.value || 0), 0) * 100) / 100;
    }
    /** Ce qu'il reste à répartir. Négatif quand on a dépassé le total. */
    remaining() {
        const total = this.scheduleForm.controls.totalAmount.value || 0;
        return Math.round((total - this.planned()) * 100) / 100;
    }
    /** Vrai quand l'échéancier tombe juste, ou qu'il n'y en a pas. */
    balanced() {
        return this.instalments.length === 0 || Math.abs(this.remaining()) < 0.005;
    }
    submitSchedule() {
        const levelId = this.scheduleLevelId();
        if (!levelId || this.creatingType() || this.scheduleForm.invalid
            || !this.balanced() || this.saving()) {
            return;
        }
        this.saving.set(true);
        if (!this.requireCircuit())
            return;
        this.approvals.saveSchedule(this.payload(levelId), this.circuitId())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => { this.submitted(); },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    removeSchedule(scheduleId, label) {
        if (!this.requireCircuit())
            return;
        this.approvals.deleteSchedule(scheduleId, this.circuitId()).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.submitted();
            },
            error: (err) => this.explain(err)
        });
    }
    payload(levelId) {
        const value = this.scheduleForm.getRawValue();
        // `newType` sert uniquement à la création sur place : il ne part pas au serveur.
        const instalments = value.instalments.map((row) => ({
            label: row.label || undefined,
            amount: row.amount,
            dueDate: row.dueDate,
            graceDays: row.graceDays
        }));
        return {
            feeTypeId: value.feeTypeId,
            levelId,
            totalAmount: value.totalAmount,
            instalments
        };
    }
    // ------------------------------------------------- application groupée
    openApply(levelId) {
        const source = levelId ? this.levelById(levelId) : undefined;
        const first = source?.schedules[0];
        this.scheduleForm.patchValue({
            feeTypeId: first?.feeTypeId ?? this.types()[0]?.id ?? '',
            totalAmount: first?.totalAmount ?? 0
        });
        this.instalments.clear();
        (first?.instalments ?? []).forEach((row) => this.instalments.push(this.row(row.label, row.amount, row.dueDate, row.graceDays)));
        this.spreadCount = first?.instalments.length || 3;
        this.spreadFirstDate = first?.instalments[0]?.dueDate ?? '';
        this.spreadMonths = 3;
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
        const all = ids.every((id) => this.applyTargets().includes(id));
        this.applyTargets.update((list) => all
            ? list.filter((id) => !ids.includes(id))
            : Array.from(new Set([...list, ...ids])));
    }
    isTargeted(levelId) {
        return this.applyTargets().includes(levelId);
    }
    canApply() {
        return this.applyTargets().length > 0 && !this.creatingType()
            && this.scheduleForm.valid && this.balanced() && !this.saving();
    }
    submitApply() {
        if (!this.canApply()) {
            return;
        }
        this.saving.set(true);
        if (!this.requireCircuit())
            return;
        this.approvals.apply({
            levelIds: this.applyTargets(),
            schedule: this.payload(undefined),
            replaceExisting: this.applyReplace
        }, this.circuitId()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => { this.submitted(); },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ------------------------------------------------------------ internals
    closePanel() {
        this.panel.set(null);
        this.editingType.set(null);
        this.scheduleLevelId.set(null);
        this.creatingType.set(false);
    }
    afterWrite() {
        this.saving.set(false);
        this.closePanel();
        this.load();
        this.setupStatus.refresh();
    }
    requireCircuit() {
        if (this.circuits().some(c => c.id === this.circuitId()))
            return true;
        this.saving.set(false);
        this.notifications.error('Choisissez un circuit « Frais et tarifs » configuré avant de soumettre.');
        return false;
    }
    submitted() {
        this.notifications.success('Demande envoyée dans le circuit. Aucun changement ne sera appliqué avant la dernière validation.');
        this.afterWrite();
        this.tab.set('REQUESTS');
    }
    loadRequests() {
        this.requestsError.set(false);
        this.approvals.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: rows => this.requests.set(rows),
            error: () => this.requestsError.set(true)
        });
    }
    decide(request, decision) {
        if (this.decidingId())
            return;
        const comment = this.comments[request.id]?.trim() ?? '';
        if (decision === 'REJECT' && !comment) {
            this.notifications.error('Indiquez le motif du refus.');
            return;
        }
        this.decidingId.set(request.id);
        this.approvals.decide(request.id, decision, comment).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: updated => {
                this.decidingId.set(null);
                delete this.comments[request.id];
                this.notifications.success(updated.status === 'EFFECTIVE' ? 'Validation complète : modification appliquée.' : 'Décision enregistrée.');
                this.load();
                this.setupStatus.refresh();
            },
            error: err => { this.decidingId.set(null); this.explain(err); }
        });
    }
    requestDetails(request) {
        const input = request.payload.input ?? {};
        const schedule = input['schedule'] ?? input;
        const details = [];
        if (input['name'])
            details.push(`Nom : ${input['name']} · Code : ${input['code']}`);
        if (input['category'])
            details.push(`Catégorie : ${this.categories.find(c => c.code === input['category'])?.label ?? input['category']}`);
        if (input['recurrence'])
            details.push(`Périodicité : ${this.recurrences.find(c => c.code === input['recurrence'])?.label ?? input['recurrence']}`);
        if (typeof input['mandatory'] === 'boolean')
            details.push(input['mandatory'] ? 'Frais obligatoire' : 'Frais facultatif');
        if (typeof input['refundable'] === 'boolean')
            details.push(input['refundable'] ? 'Remboursable' : 'Non remboursable');
        if (input['description'])
            details.push(`Description : ${input['description']}`);
        if (schedule['totalAmount'] != null) {
            details.push(`Montant : ${this.format(Number(schedule['totalAmount']))} ${this.currency()}`);
            const ids = input['levelIds'] ?? (schedule['levelId'] ? [String(schedule['levelId'])] : []);
            details.push(`Niveaux : ${ids.length ? ids.map(id => this.levelById(id)?.levelName ?? id).join(', ') : 'Tous les niveaux'}`);
            if (input['replaceExisting'] != null)
                details.push(input['replaceExisting'] ? 'Remplace les tarifs existants' : 'Complète uniquement les niveaux sans tarif');
            details.push(`Nouveaux élèves : ${schedule['appliesToNewStudents'] === false ? 'non' : 'oui'} · Réinscriptions : ${schedule['appliesToReturningStudents'] === false ? 'non' : 'oui'}`);
            const instalments = schedule['instalments'];
            for (const row of instalments ?? [])
                details.push(`${row.label || 'Échéance'} : ${this.format(row.amount)} · ${row.dueDate}`);
            if (!instalments?.length)
                details.push(schedule['instalmentCount'] ? `${schedule['instalmentCount']} échéances régulières` : 'Montant dû en une fois');
        }
        return details;
    }
    explain(err) {
        const response = err?.error;
        this.notifications.error(response?.message ?? (response?.code ? translateErrorCode(response.code) : 'Action impossible. Réessayez.'), 'Action refusée');
    }
    static ɵfac = function FinanceComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FinanceComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FinanceComponent, selectors: [["eduops-finance"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 36, vars: 23, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--primary"], [1, "approval-choice", "card"], ["for", "fee-circuit"], ["id", "fee-circuit", 1, "input", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], ["role", "tablist", 1, "tabs"], ["type", "button", "role", "tab", 1, "tabs__item", 3, "click"], [1, "tabs__badge", "numeric"], ["message", "Chargement des frais..."], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], [3, "retry"], [1, "approval-requests"], [1, "levels"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], [1, "card", "approval-request"], [3, "current-stage"], [3, "for"], ["maxlength", "2000", 1, "input", 3, "ngModelChange", "id", "ngModel"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn--ghost", 3, "click", "disabled"], [1, "lead"], ["type", "button", 1, "linklike", 3, "click"], [1, "grid", "grid--3"], [1, "type", "card"], [1, "empty-state"], [1, "type__head"], [1, "type__name"], [1, "type__meta", "numeric"], [1, "pill", "pill--req"], [1, "pill", "pill--opt"], [1, "type__body"], [1, "type__usage", "numeric"], [1, "type__usage", "type__usage--none"], [1, "type__note"], [1, "type__footer"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], [1, "empty-state__title"], [1, "empty-state__text"], ["routerLink", "/outstanding"], ["aria-label", "Chiffres du plan de facturation", 1, "grid", "grid--kpi", "state-kpis"], [1, "card", "state-kpi"], [1, "state-kpi__label"], [1, "state-kpi__value", "numeric"], [1, "state-kpi__note"], [1, "card", "state-table"], [1, "table-wrapper"], [1, "table"], [1, "visually-hidden"], [1, "numeric"], [3, "state-table__row--empty"], ["scope", "row"], ["colspan", "2", 1, "numeric"], [1, "hint-block"], [1, "state-note"], [1, "state-table__label"], [1, "muted"], [1, "numeric", "state-table__share"], ["aria-hidden", "true", 1, "share"], [1, "share__bar"], ["colspan", "8", 1, "state-table__empty"], ["role", "status", 1, "alert-block"], [1, "level", "card", 3, "level--open"], [1, "alert-block__head"], ["aria-hidden", "true", 1, "alert-block__icon"], [1, "alert-block__title"], [1, "alert-block__text"], [1, "pending"], [1, "pending__item"], [1, "pending__name"], [1, "pending__cycle"], ["type", "button", 1, "btn", "btn--primary", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], [1, "level", "card"], ["type", "button", 1, "level__head", 3, "click"], [1, "level__identity"], [1, "level__name"], [1, "level__cycle"], [1, "level__stats", "numeric"], [1, "pill", "pill--ok"], [1, "pill", "pill--warn"], ["aria-hidden", "true", 1, "level__chevron"], [1, "level__body"], [1, "level__empty"], [1, "level__foot"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm"], ["colspan", "2"], [1, "pill", "pill--lock"], [1, "plan"], [1, "cell-actions"], [1, "plan__row", "numeric"], [1, "plan__date"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], ["routerLink", "/setup"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", 1, "drawer"], [1, "drawer__head"], [1, "drawer__title"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "drawer__body", 3, "formGroup"], [1, "grid2"], [1, "field"], ["for", "typeName", 1, "field__label", "field__label--required"], ["id", "typeName", "formControlName", "name", "placeholder", "Scolarit\u00E9 annuelle", 1, "input"], ["for", "typeCode", 1, "field__label", "field__label--required"], ["id", "typeCode", "formControlName", "code", "placeholder", "SCOL", 1, "input"], [1, "field__hint"], ["for", "typeCategory", 1, "field__label", "field__label--required"], ["id", "typeCategory", "formControlName", "category", 1, "select"], ["for", "typeRecurrence", 1, "field__label", "field__label--required"], ["id", "typeRecurrence", "formControlName", "recurrence", 1, "select"], [1, "switch"], ["type", "checkbox", "formControlName", "mandatory"], ["type", "checkbox", "formControlName", "refundable"], [1, "drawer__foot"], [1, "drawer__body"], [1, "stack", 3, "formGroup"], ["for", "feeTypeId", 1, "field__label", "field__label--required"], ["id", "feeTypeId", "formControlName", "feeTypeId", 1, "select", 3, "change"], ["formGroupName", "newType", 1, "inline-type"], ["for", "totalAmount", 1, "field__label", "field__label--required"], [1, "amount"], ["id", "totalAmount", "type", "number", "min", "0", "step", "1000", "formControlName", "totalAmount", 1, "input"], [1, "amount__unit"], [1, "plan-editor"], [1, "plan-editor__head"], [1, "plan-editor__title"], [1, "plan-editor__hint"], [1, "spread"], [1, "spread__label"], ["type", "number", "min", "1", "max", "12", "aria-label", "Nombre de tranches", 1, "input", "input--tiny", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "date", "aria-label", "Date de la premi\u00E8re tranche", 1, "input", "input--date", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "1", "max", "12", "aria-label", "Mois entre deux tranches", 1, "input", "input--tiny", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click", "disabled"], ["formArrayName", "instalments", 1, "rows"], [1, "plan-editor__empty"], [1, "plan-editor__foot"], [1, "balance", "numeric", 3, "balance--ok", "balance--off"], ["type", "button", 1, "btn", "btn--primary", 3, "disabled"], [1, "inline-type__head"], [1, "inline-type__title"], ["type", "button", "aria-label", "Annuler la cr\u00E9ation", 1, "inline-type__close", 3, "click"], ["for", "inlineName", 1, "field__label", "field__label--required"], ["id", "inlineName", "formControlName", "name", "placeholder", "Frais de biblioth\u00E8que", 1, "input", 3, "input"], ["for", "inlineCode", 1, "field__label", "field__label--required"], ["id", "inlineCode", "formControlName", "code", "placeholder", "BIBLIO", 1, "input"], ["for", "inlineCategory", 1, "field__label", "field__label--required"], ["id", "inlineCategory", "formControlName", "category", 1, "select"], ["for", "inlineRecurrence", 1, "field__label", "field__label--required"], ["id", "inlineRecurrence", "formControlName", "recurrence", 1, "select"], [1, "inline-type__foot"], ["type", "button", 1, "btn", "btn--primary", "btn--sm", 3, "click", "disabled"], [1, "rows__item", 3, "formGroupName"], ["formControlName", "label", 1, "input", "rows__label"], ["type", "number", "min", "0", "step", "1000", "formControlName", "amount", 1, "input", "rows__amount", "numeric"], ["type", "date", "formControlName", "dueDate", 1, "input", "rows__date"], ["type", "button", "title", "Mettre le reste sur cette tranche", 1, "rows__fix", 3, "click"], ["type", "button", 1, "rows__remove", 3, "click"], [1, "balance", "numeric"], [1, "drawer__section"], [1, "cycle"], ["type", "checkbox", "name", "applyReplace", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "cycle__all", 3, "click"], [1, "cycle__levels"], [1, "chip-check", 3, "chip-check--on"], [1, "chip-check"], ["type", "checkbox", 3, "change", "checked"], [1, "chip-check__flag"]], template: function FinanceComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Plan de facturation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6);
            i0.ɵɵtemplate(7, FinanceComponent_Conditional_7_Template, 2, 1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 4);
            i0.ɵɵtemplate(9, FinanceComponent_Conditional_9_Template, 4, 0, "button", 5)(10, FinanceComponent_Conditional_10_Template, 2, 0, "button", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "section", 6)(12, "label", 7);
            i0.ɵɵtext(13, "Circuit des demandes de frais et tarifs");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "select", 8);
            i0.ɵɵlistener("ngModelChange", function FinanceComponent_Template_select_ngModelChange_14_listener($event) { return ctx.circuitId.set($event); });
            i0.ɵɵelementStart(15, "option", 9);
            i0.ɵɵtext(16, "\u2014 Choisir un circuit \u2014");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(17, FinanceComponent_For_18_Template, 2, 3, "option", 10, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "p");
            i0.ɵɵtext(20, "Cr\u00E9ation, modification, suppression et application des frais n\u00E9cessitent une validation. Le dernier niveau applique le changement.");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(21, FinanceComponent_Conditional_21_Template, 2, 0, "p");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "nav", 11)(23, "button", 12);
            i0.ɵɵlistener("click", function FinanceComponent_Template_button_click_23_listener() { return ctx.changeTab("TARIFS"); });
            i0.ɵɵtext(24, " Tarifs par niveau ");
            i0.ɵɵtemplate(25, FinanceComponent_Conditional_25_Template, 2, 1, "span", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "button", 12);
            i0.ɵɵlistener("click", function FinanceComponent_Template_button_click_26_listener() { return ctx.changeTab("TYPES"); });
            i0.ɵɵtext(27, " Types de frais ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "button", 12);
            i0.ɵɵlistener("click", function FinanceComponent_Template_button_click_28_listener() { return ctx.changeTab("CATEGORIES"); });
            i0.ɵɵtext(29, " \u00C9tat par cat\u00E9gorie ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "button", 12);
            i0.ɵɵlistener("click", function FinanceComponent_Template_button_click_30_listener() { return ctx.changeTab("REQUESTS"); });
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(32, FinanceComponent_Conditional_32_Template, 1, 0, "eduops-loading-state", 14)(33, FinanceComponent_Conditional_33_Template, 1, 0, "eduops-error-state")(34, FinanceComponent_Conditional_34_Template, 4, 4)(35, FinanceComponent_Conditional_35_Template, 4, 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_1_0;
            let tmp_17_0;
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate3(" ", ctx.types().length, " type(s) de frais \u2014 ", ctx.readyCount(), "/", ctx.levels().length, " niveau(x) tarif\u00E9(s) ");
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_1_0 = ctx.priceRange()) ? 7 : -1, tmp_1_0);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.tab() === "TYPES" ? 9 : ctx.tab() === "TARIFS" ? 10 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngModel", ctx.circuitId());
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.circuits());
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.circuits().length ? 21 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "TARIFS");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "TARIFS");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.levelsWithoutFees().length > 0 ? 25 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "TYPES");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "TYPES");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "CATEGORIES");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "CATEGORIES");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "REQUESTS");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "REQUESTS");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("Demandes de validation (", ctx.pendingCount(), ")");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 32 : ctx.error() ? 33 : 34);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_17_0 = ctx.panel()) ? 35 : -1, tmp_17_0);
        } }, dependencies: [CommonModule, i1.DatePipe, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MaxLengthValidator, i2.MinValidator, i2.MaxValidator, i2.FormGroupDirective, i2.FormControlName, i2.FormGroupName, i2.FormArrayName, FormsModule, i2.NgModel, RouterLink,
            LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.lead[_ngcontent-%COMP%] {\n  max-width: 720px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n.linklike[_ngcontent-%COMP%] {\n  padding: 0;\n  font: inherit;\n  color: var(--brand);\n  background: none;\n  border: none;\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n\n\n\n.tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n\n\n\n.pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-pill);\n\n  &--ok { color: var(--success); background: var(--success-bg); }\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n  &--lock { color: var(--info); background: var(--info-bg); }\n  &--muted { color: var(--text-muted); background: var(--surface-sunken); }\n  &--archived { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n.dot[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  margin-right: var(--space-2);\n  border-radius: 50%;\n  vertical-align: middle;\n}\n\n.muted[_ngcontent-%COMP%] {\n  margin-left: var(--space-2);\n  font-size: var(--text-xs);\n  color: var(--text-light);\n}\n\n\n\n\n.type[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  border-top: 3px solid var(--border-strong);\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-4) var(--space-2);\n  }\n\n  &__title { min-width: 0; }\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__body { flex: 1; padding: 0 var(--space-4) var(--space-3); }\n\n  &__usage {\n    margin: 0;\n    font-size: var(--text-sm);\n    color: var(--text-normal);\n\n    &--none { color: var(--text-light); font-style: italic; }\n  }\n\n  &__note {\n    margin: var(--space-2) 0 0;\n    font-size: var(--text-xs);\n    line-height: var(--leading-relaxed);\n    color: var(--text-muted);\n  }\n\n  &__footer {\n    display: flex;\n    gap: var(--space-1);\n    padding: var(--space-2) var(--space-3);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n\n\n\n.alert-block[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-4);\n  padding: var(--space-4);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 26px;\n    height: 26px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-3) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n\n.levels[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n\n.level[_ngcontent-%COMP%] {\n  overflow: hidden;\n\n  &--open { box-shadow: var(--shadow-sm); }\n\n  &__head {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    width: 100%;\n    padding: var(--space-3) var(--space-4);\n    text-align: left;\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { background: var(--surface-hover); }\n  }\n\n  &__identity { display: flex; flex-direction: column; min-width: 130px; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { font-size: var(--text-xs); color: var(--text-light); }\n\n  &__stats {\n    flex: 1;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n\n  &__chevron {\n    width: 20px;\n    text-align: center;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n  }\n\n  &__body {\n    padding: 0 var(--space-4) var(--space-4);\n    border-top: 1px solid var(--border-light);\n  }\n\n  &__empty {\n    margin: var(--space-3) 0;\n    padding: var(--space-4);\n    text-align: center;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    margin-top: var(--space-2);\n  }\n\n  @media (max-width: 760px) {\n    &__stats { display: none; }\n  }\n}\n\n.table-wrapper[_ngcontent-%COMP%] { overflow-x: auto; margin-top: var(--space-3); }\n\n.input--tiny[_ngcontent-%COMP%] { width: 80px; padding: 4px var(--space-2); text-align: right; }\n\n.cell-actions[_ngcontent-%COMP%] { text-align: right; white-space: nowrap; }\n\n.add-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: var(--space-3);\n  margin-top: var(--space-3);\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  .field { flex: 1; min-width: 180px; }\n  .field--tiny { flex: none; width: 110px; min-width: 0; }\n}\n\n\n\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgba(15, 23, 42, .45);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n\n  &__close {\n    font-size: 1.5rem;\n    line-height: 1;\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { color: var(--text-strong); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__section {\n    margin: 0 0 var(--space-2);\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--brand);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.grid2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.swatches[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n.swatch[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border: 2px solid transparent;\n  border-radius: var(--radius-input);\n  cursor: pointer;\n\n  &--on {\n    border-color: var(--text-strong);\n    box-shadow: 0 0 0 2px var(--surface-card) inset;\n  }\n}\n\n.picker[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  max-height: 260px;\n  overflow-y: auto;\n\n  &__row {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-2);\n    padding: var(--space-1) var(--space-2);\n    border-radius: var(--radius-input);\n\n    &:hover { background: var(--surface-hover); }\n  }\n\n  &__check {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex: 1;\n    min-width: 0;\n    font-size: var(--text-sm);\n    cursor: pointer;\n  }\n\n  &__name {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n}\n\n.total[_ngcontent-%COMP%] {\n  margin: var(--space-2) 0 0;\n  font-size: var(--text-sm);\n  color: var(--text-normal);\n}\n\n.cycle[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-3);\n\n  &__all {\n    padding: 0;\n    font-size: var(--text-xs);\n    font-weight: 600;\n    color: var(--brand);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__levels {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-2);\n    margin-top: var(--space-2);\n  }\n}\n\n.chip-check[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-1) var(--space-3);\n  font-size: var(--text-sm);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-pill);\n  cursor: pointer;\n\n  input { margin: 0; }\n\n  &--on {\n    border-color: var(--brand);\n    background: var(--brand-tint);\n  }\n\n  &__flag {\n    font-size: var(--text-xs);\n    color: var(--warning);\n  }\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n\n\n.pill--req[_ngcontent-%COMP%] { color: var(--brand); background: var(--brand-tint); }\n.pill--opt[_ngcontent-%COMP%] { color: var(--text-muted); background: var(--surface-sunken); }\n\n.amount[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n\n  .input { flex: 1; text-align: right; }\n\n  &__unit {\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--text-muted);\n  }\n}\n\n.grid3[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: var(--space-3);\n}\n\n.stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n\n\n\n.plan[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n\n  &__row {\n    display: grid;\n    grid-template-columns: 90px 1fr auto;\n    gap: var(--space-2);\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    padding: 1px 0;\n  }\n\n  &__date { color: var(--text-light); }\n}\n\n\n\n.preview[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  &__title {\n    margin: 0 0 var(--space-2);\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--text-strong);\n  }\n\n  &__list { margin: 0; padding: 0; list-style: none; }\n\n  &__row {\n    display: flex;\n    align-items: baseline;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: 3px 0;\n    font-size: var(--text-sm);\n    border-bottom: 1px dashed var(--border);\n\n    &:last-of-type { border-bottom: none; }\n  }\n\n  &__note {\n    margin: var(--space-2) 0 0;\n    font-size: var(--text-xs);\n    line-height: var(--leading-relaxed);\n    color: var(--text-light);\n  }\n}\n\n.table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.table[_ngcontent-%COMP%]   tfoot[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding-top: var(--space-3);\n  border-top: 2px solid var(--border-strong);\n  font-size: var(--text-sm);\n}\n\n\n\n\n.plan-editor[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  &__head { margin-bottom: var(--space-3); }\n\n  &__title {\n    margin: 0;\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--text-strong);\n  }\n\n  &__hint {\n    margin: 2px 0 0;\n    font-size: var(--text-xs);\n    line-height: var(--leading-relaxed);\n    color: var(--text-muted);\n  }\n\n  &__empty {\n    margin: 0;\n    padding: var(--space-3);\n    text-align: center;\n    font-size: var(--text-xs);\n    color: var(--text-light);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n  }\n\n  &__foot {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-2);\n    margin-top: var(--space-2);\n  }\n}\n\n.spread[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--space-2);\n  margin-bottom: var(--space-3);\n  padding-bottom: var(--space-3);\n  border-bottom: 1px dashed var(--border);\n\n  &__label {\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    white-space: nowrap;\n  }\n}\n\n.input--date[_ngcontent-%COMP%] { width: 150px; }\n\n.rows[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) 110px 148px 28px 28px;\n    align-items: center;\n    gap: var(--space-2);\n  }\n\n  &__amount { text-align: right; }\n\n  &__fix,\n  &__remove {\n    width: 26px;\n    height: 26px;\n    font-size: var(--text-sm);\n    line-height: 1;\n    color: var(--text-muted);\n    background: var(--surface-card);\n    border: 1px solid var(--border);\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &:hover { color: var(--text-strong); border-color: var(--border-strong); }\n  }\n\n  &__remove:hover { color: var(--danger); border-color: var(--danger); }\n\n  @media (max-width: 560px) {\n    &__item { grid-template-columns: minmax(0, 1fr) 90px 28px; }\n    &__date, &__fix { display: none; }\n  }\n}\n\n.balance[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: var(--space-1) var(--space-2);\n  font-size: var(--text-xs);\n  border-radius: var(--radius-input);\n\n  &--ok { color: var(--success); background: var(--success-bg); }\n  &--off { color: var(--warning); background: var(--warning-bg); }\n}\n\n\n\n\n.inline-type[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  background: var(--brand-tint);\n  border: 1px solid var(--brand);\n  border-radius: var(--radius-input);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-2);\n  }\n\n  &__title {\n    margin: 0;\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--brand);\n  }\n\n  &__close {\n    font-size: 1.2rem;\n    line-height: 1;\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { color: var(--text-strong); }\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n  }\n}\n\n.approval-choice[_ngcontent-%COMP%] { padding: 1rem; margin-bottom: 1rem; }\n.approval-choice[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] { display: block; max-width: 36rem; margin: .5rem 0; }\n.approval-requests[_ngcontent-%COMP%] { display: grid; gap: 1rem; }\n.approval-request[_ngcontent-%COMP%] { padding: 1.25rem; }\n.approval-request[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { font-size: 1.1rem; }\n.approval-request[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] { padding: .5rem; margin-bottom: .5rem; }\n.approval-request[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: .3rem 0; }\n.current-stage[_ngcontent-%COMP%] { border-left: 3px solid var(--color-primary, #2563eb); background: #f4f7fb; }\n.approval-request[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] { display: block; width: 100%; margin: .5rem 0; }\n\n\n\n\n.state-kpis[_ngcontent-%COMP%] { margin-bottom: var(--space-4); }\n\n.state-kpi[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: var(--space-4);\n\n  &__label {\n    font-size: var(--text-xs);\n    text-transform: uppercase;\n    letter-spacing: .04em;\n    color: var(--text-muted);\n  }\n\n  &__value {\n    font-size: var(--text-xl);\n    font-weight: 700;\n    color: var(--text-strong);\n  }\n\n  &__note { font-size: var(--text-xs); color: var(--text-light); }\n}\n\n.state-table[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n\n  &__label { font-weight: 600; color: var(--text-strong); }\n\n  \n\n  &__row--empty { color: var(--text-light); }\n\n  &__share { white-space: nowrap; }\n\n  &__empty {\n    padding: var(--space-10) !important;\n    text-align: center;\n    color: var(--text-muted);\n  }\n\n  .hint-block { margin-top: var(--space-4); }\n}\n\n.state-note[_ngcontent-%COMP%] {\n  margin: var(--space-3) 0 0;\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n.share[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 64px;\n  height: 6px;\n  margin-right: var(--space-2);\n  overflow: hidden;\n  vertical-align: middle;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-pill);\n\n  &__bar { display: block; height: 100%; background: var(--brand); }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FinanceComponent, [{
        type: Component,
        args: [{ selector: 'eduops-finance', standalone: true, imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,
                    LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Plan de facturation</h1>\n      <p class=\"page__meta numeric\">\n        {{ types().length }} type(s) de frais \u2014\n        {{ readyCount() }}/{{ levels().length }} niveau(x) tarif\u00E9(s)\n        @if (priceRange(); as range) {\n          @if (range.min !== range.max) {\n            \u00B7 de {{ format(range.min) }} \u00E0 {{ format(range.max) }} {{ currency() }}\n          } @else {\n            \u00B7 {{ format(range.min) }} {{ currency() }} par \u00E9l\u00E8ve\n          }\n        }\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      @if (tab() === 'TYPES') {\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openType()\">\n          <span aria-hidden=\"true\">+</span> Nouveau type de frais\n        </button>\n      } @else if (tab() === 'TARIFS') {\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openApply()\">\n          Appliquer \u00E0 plusieurs niveaux\n        </button>\n      }\n    </div>\n  </header>\n\n  <section class=\"approval-choice card\">\n    <label for=\"fee-circuit\">Circuit des demandes de frais et tarifs</label>\n    <select id=\"fee-circuit\" class=\"input\" [ngModel]=\"circuitId()\" (ngModelChange)=\"circuitId.set($event)\">\n      <option value=\"\">\u2014 Choisir un circuit \u2014</option>\n      @for (c of circuits(); track c.id) { <option [value]=\"c.id\">{{ c.code }} \u2014 {{ c.name }}</option> }\n    </select>\n    <p>Cr\u00E9ation, modification, suppression et application des frais n\u00E9cessitent une validation. Le dernier niveau applique le changement.</p>\n    @if (!circuits().length) { <p>Cr\u00E9ez un circuit \u00AB Types de frais et tarifs \u00BB dans Configuration syst\u00E8me.</p> }\n  </section>\n\n  <nav class=\"tabs\" role=\"tablist\">\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'TARIFS'\"\n            [attr.aria-selected]=\"tab() === 'TARIFS'\"\n            (click)=\"changeTab('TARIFS')\">\n      Tarifs par niveau\n      @if (levelsWithoutFees().length > 0) {\n        <span class=\"tabs__badge numeric\">{{ levelsWithoutFees().length }}</span>\n      }\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'TYPES'\"\n            [attr.aria-selected]=\"tab() === 'TYPES'\"\n            (click)=\"changeTab('TYPES')\">\n      Types de frais\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'CATEGORIES'\"\n            [attr.aria-selected]=\"tab() === 'CATEGORIES'\"\n            (click)=\"changeTab('CATEGORIES')\">\n      \u00C9tat par cat\u00E9gorie\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\" [class.tabs__item--on]=\"tab() === 'REQUESTS'\"\n      [attr.aria-selected]=\"tab() === 'REQUESTS'\" (click)=\"changeTab('REQUESTS')\">Demandes de validation ({{ pendingCount() }})</button>\n  </nav>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des frais...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n\n    @if (tab() === 'REQUESTS') {\n      <section class=\"approval-requests\">\n        <button type=\"button\" class=\"btn btn--ghost\" (click)=\"loadRequests()\">Actualiser les demandes</button>\n        @if (requestsError()) { <eduops-error-state (retry)=\"loadRequests()\" /> }\n        @for (request of requests(); track request.id) {\n          <article class=\"card approval-request\">\n            <h2>{{ request.label }}</h2>\n            <p>{{ statusLabels[request.status] }} \u00B7 {{ request.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>\n            @for (detail of requestDetails(request); track $index) { <p>{{ detail }}</p> }\n            <h3>{{ request.circuitName }}</h3>\n            <ol>\n              @for (stage of request.stages; track $index) {\n                <li [class.current-stage]=\"$index + 1 === request.currentLevel && request.status === 'SUBMITTED'\">\n                  <strong>{{ stage.code }}</strong> \u2014 {{ stage.mode === 'ALL' ? 'Tous les membres requis' : 'Un membre suffit' }}\n                  @if (stage.status === 'APPROVED') { \u00B7 Valid\u00E9 }\n                  @if (stage.status === 'REJECTED') { \u00B7 Refus\u00E9 }\n                  @for (member of stage.members; track member.userId) {\n                    <p>{{ member.name }} : {{ member.decision === 'APPROVED' ? 'Valid\u00E9' : member.decision === 'REJECTED' ? 'Refus\u00E9' : 'En attente' }}\n                      @if (member.decidedAt) { \u00B7 {{ member.decidedAt | date:'dd/MM/yyyy HH:mm' }} }\n                      @if (member.comment) { \u2014 {{ member.comment }} }\n                    </p>\n                  }\n                </li>\n              }\n            </ol>\n            @if (request.awaitingMyDecision) {\n              <label [for]=\"'comment-' + request.id\">Commentaire (obligatoire pour refuser)</label>\n              <textarea class=\"input\" [id]=\"'comment-' + request.id\" [(ngModel)]=\"comments[request.id]\" maxlength=\"2000\"></textarea>\n              <div class=\"page__actions\">\n                <button type=\"button\" class=\"btn btn--primary\" [disabled]=\"!!decidingId()\" (click)=\"decide(request, 'APPROVE')\">Valider ce niveau</button>\n                <button type=\"button\" class=\"btn btn--ghost\" [disabled]=\"!!decidingId()\" (click)=\"decide(request, 'REJECT')\">Refuser</button>\n              </div>\n            }\n          </article>\n        } @empty { @if (!requestsError()) { <p>Aucune demande de frais.</p> } }\n      </section>\n    }\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Types de frais \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (tab() === 'TYPES') {\n      <p class=\"lead\">\n        Un type de frais existe une seule fois pour tout l'\u00E9tablissement et ne porte\n        aucun montant. Son prix se r\u00E8gle niveau par niveau, dans l'onglet\n        <button type=\"button\" class=\"linklike\" (click)=\"changeTab('TARIFS')\">\n          Tarifs par niveau</button>.\n      </p>\n\n      <section class=\"grid grid--3\">\n        @for (type of types(); track type.id) {\n          <article class=\"type card\">\n            <header class=\"type__head\">\n              <div>\n                <h2 class=\"type__name\">{{ type.name }}</h2>\n                <p class=\"type__meta numeric\">\n                  {{ type.code }} \u00B7 {{ type.categoryLabel }} \u00B7 {{ type.recurrenceLabel }}\n                </p>\n              </div>\n              @if (type.mandatory) {\n                <span class=\"pill pill--req\">Obligatoire</span>\n              } @else {\n                <span class=\"pill pill--opt\">Facultatif</span>\n              }\n            </header>\n\n            <div class=\"type__body\">\n              @if (type.pricedLevels > 0) {\n                <p class=\"type__usage numeric\">\n                  Tarif\u00E9 sur <strong>{{ type.pricedLevels }}</strong> niveau(x)\n                </p>\n              } @else {\n                <p class=\"type__usage type__usage--none\">Aucun tarif d\u00E9fini</p>\n              }\n              @if (!type.mandatory) {\n                <p class=\"type__note\">\n                  Un frais facultatif n'est pas g\u00E9n\u00E9r\u00E9 d'office \u00E0 l'inscription :\n                  il est propos\u00E9, pas d\u00FB.\n                </p>\n              }\n            </div>\n\n            <footer class=\"type__footer\">\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                      (click)=\"openType(type)\">Modifier</button>\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                      [disabled]=\"type.pricedLevels > 0\"\n                      [attr.title]=\"type.pricedLevels > 0\n                        ? 'Supprimez d\\'abord ses tarifs' : null\"\n                      (click)=\"archiveType(type)\">Archiver</button>\n            </footer>\n          </article>\n        } @empty {\n          <div class=\"empty-state\">\n            <p class=\"empty-state__title\">Aucun type de frais d\u00E9clar\u00E9.</p>\n            <p class=\"empty-state__text\">\n              Commencez par ce que votre \u00E9tablissement facture : inscription,\n              scolarit\u00E9, et les frais facultatifs comme la cantine ou le transport.\n            </p>\n            <button type=\"button\" class=\"btn btn--primary\" (click)=\"openType()\">\n              D\u00E9clarer un type de frais\n            </button>\n          </div>\n        }\n      </section>\n    }\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 \u00C9tat par cat\u00E9gorie \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (tab() === 'CATEGORIES') {\n      <p class=\"lead\">\n        Ce que votre plan facture, rubrique par rubrique. Les montants sont ceux\n        des tarifs du catalogue : le total additionne les tarifs pos\u00E9s sur les\n        niveaux, il ne dit pas ce qu'un \u00E9l\u00E8ve doit. La situation des familles se\n        suit dans <a routerLink=\"/outstanding\">les impay\u00E9s</a>.\n      </p>\n\n      <section class=\"grid grid--kpi state-kpis\" aria-label=\"Chiffres du plan de facturation\">\n        <article class=\"card state-kpi\">\n          <span class=\"state-kpi__label\">Types de frais</span>\n          <strong class=\"state-kpi__value numeric\">{{ categoryTotals().feeTypes }}</strong>\n          <span class=\"state-kpi__note\">\n            {{ categoryTotals().usedCategories }}/{{ categoryTotals().categories }} rubrique(s)\n            utilis\u00E9e(s)\n          </span>\n        </article>\n        <article class=\"card state-kpi\">\n          <span class=\"state-kpi__label\">Niveaux tarif\u00E9s</span>\n          <strong class=\"state-kpi__value numeric\">{{ categoryTotals().pricedLevels }}</strong>\n          <span class=\"state-kpi__note\">sur {{ levels().length }} niveau(x) d\u00E9clar\u00E9(s)</span>\n        </article>\n        <article class=\"card state-kpi\">\n          <span class=\"state-kpi__label\">Tarifs pos\u00E9s</span>\n          <strong class=\"state-kpi__value numeric\">{{ categoryTotals().schedules }}</strong>\n          <span class=\"state-kpi__note\">couples frais \u00D7 niveau</span>\n        </article>\n        <article class=\"card state-kpi\">\n          <span class=\"state-kpi__label\">Montant cumul\u00E9 des tarifs</span>\n          <strong class=\"state-kpi__value numeric\">\n            {{ format(categoryTotals().totalAmount) }} {{ currency() }}\n          </strong>\n          <span class=\"state-kpi__note\">toutes rubriques, tous niveaux</span>\n        </article>\n      </section>\n\n      <section class=\"card state-table\">\n        <div class=\"table-wrapper\">\n          <table class=\"table\">\n            <caption class=\"visually-hidden\">Points de facturation par cat\u00E9gorie</caption>\n            <thead>\n              <tr>\n                <th>Rubrique</th>\n                <th class=\"numeric\">Types de frais</th>\n                <th class=\"numeric\">Niveaux tarif\u00E9s</th>\n                <th class=\"numeric\">Tarifs</th>\n                <th class=\"numeric\">Mini</th>\n                <th class=\"numeric\">Maxi</th>\n                <th class=\"numeric\">Total des tarifs</th>\n                <th class=\"numeric\">Part</th>\n              </tr>\n            </thead>\n            <tbody>\n              @for (row of categoryStats(); track row.code) {\n                <tr [class.state-table__row--empty]=\"row.scheduleCount === 0\">\n                  <td>\n                    <span class=\"state-table__label\">{{ row.label }}</span>\n                    <span class=\"muted\">{{ row.code }}</span>\n                    @if (row.optionalCount > 0) {\n                      <span class=\"pill pill--opt\">{{ row.optionalCount }} facultatif(s)</span>\n                    }\n                  </td>\n                  <td class=\"numeric\">{{ row.feeTypeCount }}</td>\n                  <td class=\"numeric\">{{ row.pricedLevels }}</td>\n                  <td class=\"numeric\">{{ row.scheduleCount }}</td>\n                  <td class=\"numeric\">{{ formatAmount(row.minAmount) }}</td>\n                  <td class=\"numeric\">{{ formatAmount(row.maxAmount) }}</td>\n                  <td class=\"numeric\">{{ format(row.totalAmount) }} {{ currency() }}</td>\n                  <td class=\"numeric state-table__share\">\n                    <span class=\"share\" aria-hidden=\"true\">\n                      <span class=\"share__bar\" [style.width.%]=\"row.share * 100\"></span>\n                    </span>\n                    {{ formatPercent(row.share) }}\n                  </td>\n                </tr>\n              } @empty {\n                <tr>\n                  <td class=\"state-table__empty\" colspan=\"8\">\n                    Aucune rubrique de frais d\u00E9clar\u00E9e.\n                  </td>\n                </tr>\n              }\n            </tbody>\n            <tfoot>\n              <tr>\n                <th scope=\"row\">Total</th>\n                <td class=\"numeric\">{{ categoryTotals().feeTypes }}</td>\n                <td class=\"numeric\">{{ categoryTotals().pricedLevels }}</td>\n                <td class=\"numeric\">{{ categoryTotals().schedules }}</td>\n                <td class=\"numeric\" colspan=\"2\"></td>\n                <td class=\"numeric\">\n                  <strong>{{ format(categoryTotals().totalAmount) }} {{ currency() }}</strong>\n                </td>\n                <td class=\"numeric\">\n                  {{ categoryTotals().totalAmount > 0 ? '100 %' : '\u2014' }}\n                </td>\n              </tr>\n            </tfoot>\n          </table>\n        </div>\n\n        <p class=\"hint-block\">\n          \u00AB Total des tarifs \u00BB additionne, pour chaque rubrique, les montants pos\u00E9s\n          sur tous les niveaux. Un frais tarif\u00E9 sur douze niveaux compte donc douze\n          fois : c'est un poids de catalogue, pas une recette attendue.\n        </p>\n        @if (categoryTotals().unpricedCategories.length > 0) {\n          <p class=\"state-note\">\n            Sans aucun tarif : {{ unpricedCategoryNames() }}. Ces rubriques restent\n            utiles \u2014 elles se remplissent d\u00E8s qu'un type de frais les rejoint.\n          </p>\n        }\n      </section>\n    }\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Tarifs par niveau \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (tab() === 'TARIFS') {\n\n      @if (levelsWithoutFees().length > 0) {\n        <section class=\"alert-block\" role=\"status\">\n          <div class=\"alert-block__head\">\n            <span class=\"alert-block__icon\" aria-hidden=\"true\">!</span>\n            <div>\n              <p class=\"alert-block__title\">\n                {{ levelsWithoutFees().length }} niveau(x) sans tarif\n              </p>\n              <p class=\"alert-block__text\">\n                Une inscription sur ces niveaux ne g\u00E9n\u00E9rera aucune \u00E9ch\u00E9ance :\n                il n'y aura rien \u00E0 encaisser, et rien \u00E0 relancer.\n              </p>\n            </div>\n          </div>\n          <ul class=\"pending\">\n            @for (level of levelsWithoutFees(); track level.levelId) {\n              <li class=\"pending__item\">\n                <span class=\"pending__name\">{{ level.levelName }}</span>\n                <span class=\"pending__cycle\">{{ level.cycleName }}</span>\n                <button type=\"button\" class=\"btn btn--primary btn--sm\"\n                        (click)=\"openSchedule(level.levelId)\">D\u00E9finir le plan</button>\n              </li>\n            }\n          </ul>\n        </section>\n      }\n\n      @if (types().length === 0) {\n        <div class=\"empty-state\">\n          <p class=\"empty-state__title\">Aucun type de frais d\u00E9clar\u00E9.</p>\n          <p class=\"empty-state__text\">\n            Vous pouvez en cr\u00E9er un directement en d\u00E9finissant le tarif d'un niveau :\n            le formulaire de cr\u00E9ation s'ouvre sur place.\n          </p>\n          <button type=\"button\" class=\"btn btn--secondary\" (click)=\"changeTab('TYPES')\">\n            Voir le catalogue\n          </button>\n        </div>\n      }\n\n      <section class=\"levels\">\n        @for (level of levels(); track level.levelId) {\n          <article class=\"level card\" [class.level--open]=\"openLevelId() === level.levelId\">\n            <button type=\"button\" class=\"level__head\" (click)=\"toggleLevel(level.levelId)\"\n                    [attr.aria-expanded]=\"openLevelId() === level.levelId\">\n              <span class=\"level__identity\">\n                <span class=\"level__name\">{{ level.levelName }}</span>\n                <span class=\"level__cycle\">{{ level.cycleName }}</span>\n              </span>\n              <span class=\"level__stats numeric\">\n                @if (level.ready) {\n                  <strong>{{ format(level.mandatoryTotal) }} {{ level.currency }}</strong>\n                  par \u00E9l\u00E8ve\n                  @if (level.instalmentCount > 0) {\n                    \u00B7 {{ level.instalmentCount }} \u00E9ch\u00E9ance(s)\n                  }\n                  @if (level.optionalTotal > 0) {\n                    \u00B7 + {{ format(level.optionalTotal) }} en options\n                  }\n                } @else {\n                  Aucun frais d\u00E9fini\n                }\n              </span>\n              @if (level.ready) {\n                <span class=\"pill pill--ok\">Tarif\u00E9</span>\n              } @else {\n                <span class=\"pill pill--warn\">\u00C0 d\u00E9finir</span>\n              }\n              <span class=\"level__chevron\" aria-hidden=\"true\">\n                {{ openLevelId() === level.levelId ? '\u2212' : '+' }}\n              </span>\n            </button>\n\n            @if (openLevelId() === level.levelId) {\n              <div class=\"level__body\">\n                @if (level.schedules.length > 0) {\n                  <div class=\"table-wrapper\">\n                    <table class=\"table\">\n                      <caption class=\"visually-hidden\">\n                        Frais du niveau {{ level.levelName }}\n                      </caption>\n                      <thead>\n                        <tr>\n                          <th>Frais</th>\n                          <th class=\"numeric\">Montant</th>\n                          <th>\u00C9ch\u00E9ancier</th>\n                          <th><span class=\"visually-hidden\">Actions</span></th>\n                        </tr>\n                      </thead>\n                      <tbody>\n                        @for (row of level.schedules; track row.id) {\n                          <tr>\n                            <td>\n                              {{ row.feeTypeName }}\n                              @if (!row.mandatory) {\n                                <span class=\"pill pill--opt\">Facultatif</span>\n                              }\n                              @if (row.locked) {\n                                <span class=\"pill pill--lock\">Frais g\u00E9n\u00E9r\u00E9s</span>\n                              }\n                            </td>\n                            <td class=\"numeric\">\n                              {{ format(row.totalAmount) }} {{ row.currency }}\n                            </td>\n                            <td>\n                              @if (row.instalments.length > 0) {\n                                <ul class=\"plan\">\n                                  @for (item of row.instalments; track item.sequence) {\n                                    <li class=\"plan__row numeric\">\n                                      <span>{{ item.label }}</span>\n                                      <span>{{ format(item.amount) }}</span>\n                                      <span class=\"plan__date\">{{ item.dueDate }}</span>\n                                    </li>\n                                  }\n                                </ul>\n                              } @else {\n                                <span class=\"muted\">D\u00FB en une fois</span>\n                              }\n                            </td>\n                            <td class=\"cell-actions\">\n                              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                                      (click)=\"openSchedule(level.levelId, row.feeTypeId)\">\n                                Modifier\n                              </button>\n                              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                                      [disabled]=\"row.locked\"\n                                      [attr.title]=\"row.locked\n                                        ? 'Des frais \u00E9l\u00E8ves en sont issus' : null\"\n                                      (click)=\"removeSchedule(row.id, row.feeTypeName)\">\n                                Retirer\n                              </button>\n                            </td>\n                          </tr>\n                        }\n                      </tbody>\n                      <tfoot>\n                        <tr>\n                          <th scope=\"row\">Total obligatoire par \u00E9l\u00E8ve</th>\n                          <td class=\"numeric\">\n                            <strong>{{ format(level.mandatoryTotal) }} {{ level.currency }}</strong>\n                          </td>\n                          <td colspan=\"2\"></td>\n                        </tr>\n                      </tfoot>\n                    </table>\n                  </div>\n                } @else {\n                  <p class=\"level__empty\">Aucun frais d\u00E9fini pour ce niveau.</p>\n                }\n\n                <footer class=\"level__foot\">\n                  @if (availableFor(level).length > 0) {\n                    <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                            (click)=\"openSchedule(level.levelId)\">\n                      Ajouter un frais\n                    </button>\n                  }\n                  <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                          [disabled]=\"level.schedules.length === 0\"\n                          (click)=\"openApply(level.levelId)\">\n                    Copier vers d'autres niveaux\n                  </button>\n                </footer>\n              </div>\n            }\n          </article>\n        } @empty {\n          <div class=\"empty-state\">\n            <p class=\"empty-state__title\">Aucun niveau d\u00E9fini.</p>\n            <p class=\"empty-state__text\">\n              Les frais se rattachent aux niveaux. Cr\u00E9ez-les d'abord dans\n              <a routerLink=\"/setup\">la configuration</a>.\n            </p>\n          </div>\n        }\n      </section>\n    }\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau lat\u00E9ral \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (panel(); as openPanel) {\n    <div class=\"drawer-backdrop\" (click)=\"closePanel()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\">\n\n      <!-- \u2500\u2500\u2500 Type de frais \u2500\u2500\u2500 -->\n      @if (openPanel === 'TYPE') {\n        <header class=\"drawer__head\">\n          <h2 class=\"drawer__title\">\n            {{ editingType() ? 'Modifier le type de frais' : 'Nouveau type de frais' }}\n          </h2>\n          <button type=\"button\" class=\"drawer__close\" (click)=\"closePanel()\"\n                  aria-label=\"Fermer\">&times;</button>\n        </header>\n        <form class=\"drawer__body\" [formGroup]=\"typeForm\">\n          <div class=\"grid2\">\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"typeName\">Nom</label>\n              <input id=\"typeName\" class=\"input\" formControlName=\"name\"\n                     placeholder=\"Scolarit\u00E9 annuelle\" />\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"typeCode\">Code</label>\n              <input id=\"typeCode\" class=\"input\" formControlName=\"code\" placeholder=\"SCOL\" />\n              <span class=\"field__hint\">\n                Mis en majuscules sans accent : il figure sur les re\u00E7us.\n              </span>\n            </div>\n          </div>\n\n          <div class=\"grid2\">\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"typeCategory\">\n                Cat\u00E9gorie\n              </label>\n              <select id=\"typeCategory\" class=\"select\" formControlName=\"category\">\n                @for (item of categories; track item.code) {\n                  <option [value]=\"item.code\">{{ item.label }}</option>\n                }\n              </select>\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"typeRecurrence\">\n                P\u00E9riodicit\u00E9\n              </label>\n              <select id=\"typeRecurrence\" class=\"select\" formControlName=\"recurrence\">\n                @for (item of recurrences; track item.code) {\n                  <option [value]=\"item.code\">{{ item.label }}</option>\n                }\n              </select>\n            </div>\n          </div>\n\n          <label class=\"switch\">\n            <input type=\"checkbox\" formControlName=\"mandatory\" />\n            <span>Frais obligatoire, d\u00FB par tous les \u00E9l\u00E8ves du niveau</span>\n          </label>\n          @if (!typeForm.controls.mandatory.value) {\n            <p class=\"hint-block\">\n              Un frais facultatif \u2014 cantine, transport \u2014 n'est pas g\u00E9n\u00E9r\u00E9 d'office\n              \u00E0 l'inscription. Il est propos\u00E9 aux familles qui le souhaitent, et\n              n'entre pas dans le total d\u00FB par \u00E9l\u00E8ve.\n            </p>\n          }\n\n          <label class=\"switch\">\n            <input type=\"checkbox\" formControlName=\"refundable\" />\n            <span>Remboursable en cas de d\u00E9part</span>\n          </label>\n        </form>\n        <footer class=\"drawer__foot\">\n          <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closePanel()\">Annuler</button>\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"typeForm.invalid || saving()\" (click)=\"submitType()\">\n            {{ saving() ? 'Enregistrement...' : 'Enregistrer' }}\n          </button>\n        </footer>\n      }\n\n      <!-- \u2500\u2500\u2500 Tarif d'un niveau, ou application group\u00E9e \u2500\u2500\u2500 -->\n      @if (openPanel === 'SCHEDULE' || openPanel === 'APPLY') {\n        <header class=\"drawer__head\">\n          <h2 class=\"drawer__title\">\n            @if (openPanel === 'APPLY') {\n              Appliquer un tarif\n            } @else {\n              Frais \u2014 {{ levelById(scheduleLevelId() || '')?.levelName }}\n            }\n          </h2>\n          <button type=\"button\" class=\"drawer__close\" (click)=\"closePanel()\"\n                  aria-label=\"Fermer\">&times;</button>\n        </header>\n        <div class=\"drawer__body\">\n          @if (openPanel === 'APPLY') {\n            <p class=\"hint-block\">\n              La scolarit\u00E9 augmente en g\u00E9n\u00E9ral avec le niveau, mais l'inscription,\n              la cantine ou le transport sont identiques pour tous. Saisir seize fois\n              le m\u00EAme montant, c'est seize occasions d'ajouter un z\u00E9ro.\n            </p>\n          }\n\n          <form [formGroup]=\"scheduleForm\" class=\"stack\">\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"feeTypeId\">\n                Type de frais\n              </label>\n              <select id=\"feeTypeId\" class=\"select\" formControlName=\"feeTypeId\"\n                      (change)=\"onFeeTypeChanged($any($event.target).value)\">\n                @for (type of types(); track type.id) {\n                  <option [value]=\"type.id\">\n                    {{ type.name }}@if (!type.mandatory) { (facultatif) }\n                  </option>\n                }\n                <option [value]=\"newTypeOption\">+ Cr\u00E9er un type de frais\u2026</option>\n              </select>\n              @if (!creatingType() && types().length === 0) {\n                <span class=\"field__hint\">\n                  Aucun type d\u00E9clar\u00E9 : choisissez \u00AB Cr\u00E9er un type de frais \u00BB pour\n                  en ajouter un sans quitter cet \u00E9cran.\n                </span>\n              }\n            </div>\n\n            <!-- \u2500\u2500\u2500 Cr\u00E9ation d'un type sans quitter le panneau \u2500\u2500\u2500 -->\n            @if (creatingType()) {\n              <section class=\"inline-type\" formGroupName=\"newType\">\n                <header class=\"inline-type__head\">\n                  <h3 class=\"inline-type__title\">Nouveau type de frais</h3>\n                  <button type=\"button\" class=\"inline-type__close\"\n                          (click)=\"cancelInlineType()\" aria-label=\"Annuler la cr\u00E9ation\">\n                    &times;\n                  </button>\n                </header>\n\n                <div class=\"grid2\">\n                  <div class=\"field\">\n                    <label class=\"field__label field__label--required\" for=\"inlineName\">\n                      Nom\n                    </label>\n                    <input id=\"inlineName\" class=\"input\" formControlName=\"name\"\n                           placeholder=\"Frais de biblioth\u00E8que\"\n                           (input)=\"suggestCode($any($event.target).value)\" />\n                  </div>\n                  <div class=\"field\">\n                    <label class=\"field__label field__label--required\" for=\"inlineCode\">\n                      Code\n                    </label>\n                    <input id=\"inlineCode\" class=\"input\" formControlName=\"code\"\n                           placeholder=\"BIBLIO\" />\n                    <span class=\"field__hint\">Propos\u00E9 d'apr\u00E8s le nom.</span>\n                  </div>\n                </div>\n\n                <div class=\"grid2\">\n                  <div class=\"field\">\n                    <label class=\"field__label field__label--required\" for=\"inlineCategory\">\n                      Cat\u00E9gorie\n                    </label>\n                    <select id=\"inlineCategory\" class=\"select\" formControlName=\"category\">\n                      @for (item of categories; track item.code) {\n                        <option [value]=\"item.code\">{{ item.label }}</option>\n                      }\n                    </select>\n                  </div>\n                  <div class=\"field\">\n                    <label class=\"field__label field__label--required\" for=\"inlineRecurrence\">\n                      P\u00E9riodicit\u00E9\n                    </label>\n                    <select id=\"inlineRecurrence\" class=\"select\" formControlName=\"recurrence\">\n                      @for (item of recurrences; track item.code) {\n                        <option [value]=\"item.code\">{{ item.label }}</option>\n                      }\n                    </select>\n                  </div>\n                </div>\n\n                <label class=\"switch\">\n                  <input type=\"checkbox\" formControlName=\"mandatory\" />\n                  <span>Frais obligatoire, d\u00FB par tous les \u00E9l\u00E8ves du niveau</span>\n                </label>\n\n                <div class=\"inline-type__foot\">\n                  <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                          (click)=\"cancelInlineType()\">Annuler</button>\n                  <button type=\"button\" class=\"btn btn--primary btn--sm\"\n                          [disabled]=\"newType.invalid || saving()\"\n                          (click)=\"createInlineType()\">\n                    {{ saving() ? 'Cr\u00E9ation...' : 'Cr\u00E9er et s\u00E9lectionner' }}\n                  </button>\n                </div>\n              </section>\n            }\n\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"totalAmount\">\n                Montant annuel\n              </label>\n              <div class=\"amount\">\n                <input id=\"totalAmount\" class=\"input\" type=\"number\" min=\"0\" step=\"1000\"\n                       formControlName=\"totalAmount\" />\n                <span class=\"amount__unit\">{{ currency() }}</span>\n              </div>\n            </div>\n\n            <!-- \u2500\u2500\u2500 \u00C9ch\u00E9ancier : chaque montant est libre \u2500\u2500\u2500 -->\n            <section class=\"plan-editor\">\n              <header class=\"plan-editor__head\">\n                <h3 class=\"plan-editor__title\">\u00C9ch\u00E9ancier</h3>\n                <p class=\"plan-editor__hint\">\n                  Chaque \u00E9ch\u00E9ance a son propre montant et sa propre date.\n                  Une rentr\u00E9e plus lourde que les tranches suivantes se saisit telle quelle.\n                </p>\n              </header>\n\n              <div class=\"spread\">\n                <span class=\"spread__label\">Pr\u00E9-remplir :</span>\n                <input class=\"input input--tiny\" type=\"number\" min=\"1\" max=\"12\"\n                       [(ngModel)]=\"spreadCount\" [ngModelOptions]=\"{ standalone: true }\"\n                       aria-label=\"Nombre de tranches\" />\n                <span class=\"spread__label\">tranches \u00E0 partir du</span>\n                <input class=\"input input--date\" type=\"date\"\n                       [(ngModel)]=\"spreadFirstDate\" [ngModelOptions]=\"{ standalone: true }\"\n                       aria-label=\"Date de la premi\u00E8re tranche\" />\n                <span class=\"spread__label\">tous les</span>\n                <input class=\"input input--tiny\" type=\"number\" min=\"1\" max=\"12\"\n                       [(ngModel)]=\"spreadMonths\" [ngModelOptions]=\"{ standalone: true }\"\n                       aria-label=\"Mois entre deux tranches\" />\n                <span class=\"spread__label\">mois</span>\n                <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                        [disabled]=\"scheduleForm.controls.totalAmount.value <= 0\"\n                        (click)=\"spreadEvenly()\">R\u00E9partir \u00E9galement</button>\n              </div>\n\n              @if (instalments.length > 0) {\n                <ul class=\"rows\" formArrayName=\"instalments\">\n                  @for (row of instalments.controls; track $index; let i = $index) {\n                    <li class=\"rows__item\" [formGroupName]=\"i\">\n                      <input class=\"input rows__label\" formControlName=\"label\"\n                             [attr.aria-label]=\"'Libell\u00E9 de la tranche ' + (i + 1)\" />\n                      <input class=\"input rows__amount numeric\" type=\"number\"\n                             min=\"0\" step=\"1000\" formControlName=\"amount\"\n                             [attr.aria-label]=\"'Montant de la tranche ' + (i + 1)\" />\n                      <input class=\"input rows__date\" type=\"date\" formControlName=\"dueDate\"\n                             [attr.aria-label]=\"'\u00C9ch\u00E9ance de la tranche ' + (i + 1)\" />\n                      <button type=\"button\" class=\"rows__fix\"\n                              title=\"Mettre le reste sur cette tranche\"\n                              (click)=\"balanceOn(i)\">=</button>\n                      <button type=\"button\" class=\"rows__remove\"\n                              [attr.aria-label]=\"'Supprimer la tranche ' + (i + 1)\"\n                              (click)=\"removeInstalment(i)\">&times;</button>\n                    </li>\n                  }\n                </ul>\n              } @else {\n                <p class=\"plan-editor__empty\">\n                  Aucune \u00E9ch\u00E9ance : le montant sera d\u00FB en une seule fois, \u00E0 l'inscription.\n                </p>\n              }\n\n              <div class=\"plan-editor__foot\">\n                <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"addInstalment()\">\n                  + Ajouter une \u00E9ch\u00E9ance\n                </button>\n\n                @if (instalments.length > 0) {\n                  <p class=\"balance numeric\"\n                     [class.balance--ok]=\"balanced()\"\n                     [class.balance--off]=\"!balanced()\">\n                    R\u00E9parti : {{ format(planned()) }} / {{ format(scheduleForm.controls.totalAmount.value) }}\n                    @if (remaining() > 0) {\n                      \u2014 il reste <strong>{{ format(remaining()) }} {{ currency() }}</strong>\n                    } @else if (remaining() < 0) {\n                      \u2014 d\u00E9passement de <strong>{{ format(-remaining()) }} {{ currency() }}</strong>\n                    } @else {\n                      \u2014 le compte est juste\n                    }\n                  </p>\n                }\n              </div>\n            </section>\n          </form>\n\n          @if (openPanel === 'APPLY') {\n            <section>\n              <h3 class=\"drawer__section\">Les niveaux concern\u00E9s</h3>\n              @for (cycle of cycles(); track cycle.id) {\n                <div class=\"cycle\">\n                  <button type=\"button\" class=\"cycle__all\"\n                          (click)=\"toggleCycleTargets(cycle.id)\">\n                    {{ cycle.name }} \u2014 tout s\u00E9lectionner\n                  </button>\n                  <div class=\"cycle__levels\">\n                    @for (level of cycle.levels; track level.levelId) {\n                      <label class=\"chip-check\"\n                             [class.chip-check--on]=\"isTargeted(level.levelId)\">\n                        <input type=\"checkbox\" [checked]=\"isTargeted(level.levelId)\"\n                               (change)=\"toggleTarget(level.levelId)\" />\n                        <span>{{ level.levelName }}</span>\n                        @if (!level.ready) {\n                          <span class=\"chip-check__flag\">sans tarif</span>\n                        }\n                      </label>\n                    }\n                  </div>\n                </div>\n              }\n            </section>\n\n            <label class=\"switch\">\n              <input type=\"checkbox\" [(ngModel)]=\"applyReplace\" name=\"applyReplace\" />\n              <span>\u00C9craser le tarif existant de ces niveaux</span>\n            </label>\n            <p class=\"hint-block\">\n              @if (applyReplace) {\n                Les niveaux qui ont d\u00E9j\u00E0 ce frais verront leur montant remplac\u00E9.\n              } @else {\n                Seuls les niveaux sans ce frais seront tarif\u00E9s. Les montants d\u00E9j\u00E0\n                r\u00E9gl\u00E9s ne sont pas \u00E9cras\u00E9s.\n              }\n            </p>\n          }\n        </div>\n        <footer class=\"drawer__foot\">\n          <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closePanel()\">Annuler</button>\n          @if (openPanel === 'APPLY') {\n            <button type=\"button\" class=\"btn btn--primary\"\n                    [disabled]=\"!canApply()\" (click)=\"submitApply()\">\n              {{ saving()\n                 ? 'Application...'\n                 : 'Appliquer \u00E0 ' + applyTargets().length + ' niveau(x)' }}\n            </button>\n          } @else {\n            <button type=\"button\" class=\"btn btn--primary\"\n                    [disabled]=\"scheduleForm.invalid || saving()\" (click)=\"submitSchedule()\">\n              {{ saving() ? 'Enregistrement...' : 'Enregistrer' }}\n            </button>\n          }\n        </footer>\n      }\n    </aside>\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n.lead {\n  max-width: 720px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n.linklike {\n  padding: 0;\n  font: inherit;\n  color: var(--brand);\n  background: none;\n  border: none;\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Onglets \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.tabs {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Pastilles \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.pill {\n  display: inline-block;\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-pill);\n\n  &--ok { color: var(--success); background: var(--success-bg); }\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n  &--lock { color: var(--info); background: var(--info-bg); }\n  &--muted { color: var(--text-muted); background: var(--surface-sunken); }\n  &--archived { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n.dot {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  margin-right: var(--space-2);\n  border-radius: 50%;\n  vertical-align: middle;\n}\n\n.muted {\n  margin-left: var(--space-2);\n  font-size: var(--text-xs);\n  color: var(--text-light);\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Cartes mati\u00E8re \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.type {\n  display: flex;\n  flex-direction: column;\n  border-top: 3px solid var(--border-strong);\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-4) var(--space-2);\n  }\n\n  &__title { min-width: 0; }\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__body { flex: 1; padding: 0 var(--space-4) var(--space-3); }\n\n  &__usage {\n    margin: 0;\n    font-size: var(--text-sm);\n    color: var(--text-normal);\n\n    &--none { color: var(--text-light); font-style: italic; }\n  }\n\n  &__note {\n    margin: var(--space-2) 0 0;\n    font-size: var(--text-xs);\n    line-height: var(--leading-relaxed);\n    color: var(--text-muted);\n  }\n\n  &__footer {\n    display: flex;\n    gap: var(--space-1);\n    padding: var(--space-2) var(--space-3);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Alerte niveaux sans programme \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.alert-block {\n  margin-bottom: var(--space-4);\n  padding: var(--space-4);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 26px;\n    height: 26px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-3) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Niveaux \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.levels {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n\n.level {\n  overflow: hidden;\n\n  &--open { box-shadow: var(--shadow-sm); }\n\n  &__head {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    width: 100%;\n    padding: var(--space-3) var(--space-4);\n    text-align: left;\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { background: var(--surface-hover); }\n  }\n\n  &__identity { display: flex; flex-direction: column; min-width: 130px; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { font-size: var(--text-xs); color: var(--text-light); }\n\n  &__stats {\n    flex: 1;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n\n  &__chevron {\n    width: 20px;\n    text-align: center;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n  }\n\n  &__body {\n    padding: 0 var(--space-4) var(--space-4);\n    border-top: 1px solid var(--border-light);\n  }\n\n  &__empty {\n    margin: var(--space-3) 0;\n    padding: var(--space-4);\n    text-align: center;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    margin-top: var(--space-2);\n  }\n\n  @media (max-width: 760px) {\n    &__stats { display: none; }\n  }\n}\n\n.table-wrapper { overflow-x: auto; margin-top: var(--space-3); }\n\n.input--tiny { width: 80px; padding: 4px var(--space-2); text-align: right; }\n\n.cell-actions { text-align: right; white-space: nowrap; }\n\n.add-row {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: var(--space-3);\n  margin-top: var(--space-3);\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  .field { flex: 1; min-width: 180px; }\n  .field--tiny { flex: none; width: 110px; min-width: 0; }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau lat\u00E9ral \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgba(15, 23, 42, .45);\n}\n\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n\n  &__close {\n    font-size: 1.5rem;\n    line-height: 1;\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { color: var(--text-strong); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__section {\n    margin: 0 0 var(--space-2);\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--brand);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.grid2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.swatches { display: flex; flex-wrap: wrap; gap: var(--space-2); }\n\n.swatch {\n  width: 26px;\n  height: 26px;\n  border: 2px solid transparent;\n  border-radius: var(--radius-input);\n  cursor: pointer;\n\n  &--on {\n    border-color: var(--text-strong);\n    box-shadow: 0 0 0 2px var(--surface-card) inset;\n  }\n}\n\n.picker {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  max-height: 260px;\n  overflow-y: auto;\n\n  &__row {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-2);\n    padding: var(--space-1) var(--space-2);\n    border-radius: var(--radius-input);\n\n    &:hover { background: var(--surface-hover); }\n  }\n\n  &__check {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex: 1;\n    min-width: 0;\n    font-size: var(--text-sm);\n    cursor: pointer;\n  }\n\n  &__name {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n}\n\n.total {\n  margin: var(--space-2) 0 0;\n  font-size: var(--text-sm);\n  color: var(--text-normal);\n}\n\n.cycle {\n  margin-bottom: var(--space-3);\n\n  &__all {\n    padding: 0;\n    font-size: var(--text-xs);\n    font-weight: 600;\n    color: var(--brand);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__levels {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-2);\n    margin-top: var(--space-2);\n  }\n}\n\n.chip-check {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-1) var(--space-3);\n  font-size: var(--text-sm);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-pill);\n  cursor: pointer;\n\n  input { margin: 0; }\n\n  &--on {\n    border-color: var(--brand);\n    background: var(--brand-tint);\n  }\n\n  &__flag {\n    font-size: var(--text-xs);\n    color: var(--warning);\n  }\n}\n\n.empty-state {\n  grid-column: 1 / -1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Propre aux frais \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.pill--req { color: var(--brand); background: var(--brand-tint); }\n.pill--opt { color: var(--text-muted); background: var(--surface-sunken); }\n\n.amount {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n\n  .input { flex: 1; text-align: right; }\n\n  &__unit {\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--text-muted);\n  }\n}\n\n.grid3 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: var(--space-3);\n}\n\n.stack {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n}\n\n/* \u00C9ch\u00E9ancier affich\u00E9 dans le tableau d'un niveau */\n.plan {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n\n  &__row {\n    display: grid;\n    grid-template-columns: 90px 1fr auto;\n    gap: var(--space-2);\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    padding: 1px 0;\n  }\n\n  &__date { color: var(--text-light); }\n}\n\n/* Aper\u00E7u du plan dans le panneau */\n.preview {\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  &__title {\n    margin: 0 0 var(--space-2);\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--text-strong);\n  }\n\n  &__list { margin: 0; padding: 0; list-style: none; }\n\n  &__row {\n    display: flex;\n    align-items: baseline;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: 3px 0;\n    font-size: var(--text-sm);\n    border-bottom: 1px dashed var(--border);\n\n    &:last-of-type { border-bottom: none; }\n  }\n\n  &__note {\n    margin: var(--space-2) 0 0;\n    font-size: var(--text-xs);\n    line-height: var(--leading-relaxed);\n    color: var(--text-light);\n  }\n}\n\n.table tfoot th,\n.table tfoot td {\n  padding-top: var(--space-3);\n  border-top: 2px solid var(--border-strong);\n  font-size: var(--text-sm);\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 \u00C9ch\u00E9ancier \u00E9ditable \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.plan-editor {\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  &__head { margin-bottom: var(--space-3); }\n\n  &__title {\n    margin: 0;\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--text-strong);\n  }\n\n  &__hint {\n    margin: 2px 0 0;\n    font-size: var(--text-xs);\n    line-height: var(--leading-relaxed);\n    color: var(--text-muted);\n  }\n\n  &__empty {\n    margin: 0;\n    padding: var(--space-3);\n    text-align: center;\n    font-size: var(--text-xs);\n    color: var(--text-light);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n  }\n\n  &__foot {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-2);\n    margin-top: var(--space-2);\n  }\n}\n\n.spread {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--space-2);\n  margin-bottom: var(--space-3);\n  padding-bottom: var(--space-3);\n  border-bottom: 1px dashed var(--border);\n\n  &__label {\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    white-space: nowrap;\n  }\n}\n\n.input--date { width: 150px; }\n\n.rows {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) 110px 148px 28px 28px;\n    align-items: center;\n    gap: var(--space-2);\n  }\n\n  &__amount { text-align: right; }\n\n  &__fix,\n  &__remove {\n    width: 26px;\n    height: 26px;\n    font-size: var(--text-sm);\n    line-height: 1;\n    color: var(--text-muted);\n    background: var(--surface-card);\n    border: 1px solid var(--border);\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &:hover { color: var(--text-strong); border-color: var(--border-strong); }\n  }\n\n  &__remove:hover { color: var(--danger); border-color: var(--danger); }\n\n  @media (max-width: 560px) {\n    &__item { grid-template-columns: minmax(0, 1fr) 90px 28px; }\n    &__date, &__fix { display: none; }\n  }\n}\n\n.balance {\n  margin: 0;\n  padding: var(--space-1) var(--space-2);\n  font-size: var(--text-xs);\n  border-radius: var(--radius-input);\n\n  &--ok { color: var(--success); background: var(--success-bg); }\n  &--off { color: var(--warning); background: var(--warning-bg); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Cr\u00E9ation d'un type sur place \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.inline-type {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  background: var(--brand-tint);\n  border: 1px solid var(--brand);\n  border-radius: var(--radius-input);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-2);\n  }\n\n  &__title {\n    margin: 0;\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--brand);\n  }\n\n  &__close {\n    font-size: 1.2rem;\n    line-height: 1;\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n\n    &:hover { color: var(--text-strong); }\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n  }\n}\n\n.approval-choice { padding: 1rem; margin-bottom: 1rem; }\n.approval-choice select { display: block; max-width: 36rem; margin: .5rem 0; }\n.approval-requests { display: grid; gap: 1rem; }\n.approval-request { padding: 1.25rem; }\n.approval-request h2 { font-size: 1.1rem; }\n.approval-request li { padding: .5rem; margin-bottom: .5rem; }\n.approval-request li p { margin: .3rem 0; }\n.current-stage { border-left: 3px solid var(--color-primary, #2563eb); background: #f4f7fb; }\n.approval-request textarea { display: block; width: 100%; margin: .5rem 0; }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 \u00C9tat par cat\u00E9gorie \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.state-kpis { margin-bottom: var(--space-4); }\n\n.state-kpi {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: var(--space-4);\n\n  &__label {\n    font-size: var(--text-xs);\n    text-transform: uppercase;\n    letter-spacing: .04em;\n    color: var(--text-muted);\n  }\n\n  &__value {\n    font-size: var(--text-xl);\n    font-weight: 700;\n    color: var(--text-strong);\n  }\n\n  &__note { font-size: var(--text-xs); color: var(--text-light); }\n}\n\n.state-table {\n  padding: var(--space-4);\n\n  &__label { font-weight: 600; color: var(--text-strong); }\n\n  /* Une rubrique sans tarif reste lisible, mais s'efface derri\u00E8re celles qui p\u00E8sent. */\n  &__row--empty { color: var(--text-light); }\n\n  &__share { white-space: nowrap; }\n\n  &__empty {\n    padding: var(--space-10) !important;\n    text-align: center;\n    color: var(--text-muted);\n  }\n\n  .hint-block { margin-top: var(--space-4); }\n}\n\n.state-note {\n  margin: var(--space-3) 0 0;\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n.share {\n  display: inline-block;\n  width: 64px;\n  height: 6px;\n  margin-right: var(--space-2);\n  overflow: hidden;\n  vertical-align: middle;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-pill);\n\n  &__bar { display: block; height: 100%; background: var(--brand); }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FinanceComponent, { className: "FinanceComponent", filePath: "frontend/src/app/features/finance/finance.component.ts", lineNumber: 70 }); })();
//# sourceMappingURL=finance.component.js.map