import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { environment } from '@env/environment';
import { ApprovalCircuitService } from '@core/services/approval-circuit.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function SystemConfigCircuitComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 0);
} }
function SystemConfigCircuitComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 3);
    i0.ɵɵlistener("retry", function SystemConfigCircuitComponent_Conditional_1_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.reload()); });
    i0.ɵɵelementEnd();
} }
function SystemConfigCircuitComponent_Conditional_2_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 14);
    i0.ɵɵlistener("click", function SystemConfigCircuitComponent_Conditional_2_Conditional_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openNew()); });
    i0.ɵɵtext(1, "+ Nouveau circuit");
    i0.ɵɵelementEnd();
} }
function SystemConfigCircuitComponent_Conditional_2_For_21_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 17);
    i0.ɵɵlistener("click", function SystemConfigCircuitComponent_Conditional_2_For_21_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const c_r5 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openEdit(c_r5)); });
    i0.ɵɵtext(1, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 17);
    i0.ɵɵlistener("click", function SystemConfigCircuitComponent_Conditional_2_For_21_Conditional_9_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r4); const c_r5 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.deleteCircuit(c_r5.id)); });
    i0.ɵɵtext(3, "Supprimer");
    i0.ɵɵelementEnd();
} }
function SystemConfigCircuitComponent_Conditional_2_For_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "span", 15);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 16);
    i0.ɵɵtemplate(9, SystemConfigCircuitComponent_Conditional_2_For_21_Conditional_9_Template, 4, 0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(c_r5.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(c_r5.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", c_r5.levels.length, " niveau(x)");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.canEdit() ? 9 : -1);
} }
function SystemConfigCircuitComponent_Conditional_2_ForEmpty_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 18);
    i0.ɵɵtext(2, "Aucun circuit pour le moment.");
    i0.ɵɵelementEnd()();
} }
function SystemConfigCircuitComponent_Conditional_2_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1, "La modification demande la gestion de l\u2019\u00E9tablissement ou des r\u00E9ductions.");
    i0.ɵɵelementEnd();
} }
function SystemConfigCircuitComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 4);
    i0.ɵɵtext(1, "Cr\u00E9ez un ou plusieurs circuits. Chaque circuit a un code et des niveaux : \u00E0 chaque niveau, un ou plusieurs membres valideurs.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 5)(3, "div", 6)(4, "div", 7)(5, "span", 8);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, SystemConfigCircuitComponent_Conditional_2_Conditional_7_Template, 2, 0, "button", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 10)(9, "table", 11)(10, "thead")(11, "tr")(12, "th");
    i0.ɵɵtext(13, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th");
    i0.ɵɵtext(15, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th");
    i0.ɵɵtext(17, "Niveaux");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(18, "th");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵrepeaterCreate(20, SystemConfigCircuitComponent_Conditional_2_For_21_Template, 10, 4, "tr", null, _forTrack0, false, SystemConfigCircuitComponent_Conditional_2_ForEmpty_22_Template, 3, 0, "tr");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵtemplate(23, SystemConfigCircuitComponent_Conditional_2_Conditional_23_Template, 2, 0, "p", 12);
    i0.ɵɵelementStart(24, "p", 4);
    i0.ɵɵtext(25, "Suivi des demandes : ");
    i0.ɵɵelementStart(26, "a", 13);
    i0.ɵɵtext(27, "Remises et bourses \u2192");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r1.circuits().length, " circuit(s)");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.canEdit() ? 7 : -1);
    i0.ɵɵadvance(13);
    i0.ɵɵrepeater(ctx_r1.circuits());
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(!ctx_r1.canEdit() ? 23 : -1);
} }
function SystemConfigCircuitComponent_Conditional_3_For_22_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 45);
    i0.ɵɵlistener("click", function SystemConfigCircuitComponent_Conditional_3_For_22_Conditional_20_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const ɵ$index_121_r8 = i0.ɵɵnextContext().$index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeDraftLevel(ɵ$index_121_r8)); });
    i0.ɵɵtext(1, "\u2715");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const d_r10 = i0.ɵɵnextContext(2);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", d_r10.levels.length <= 1 || ctx_r1.saving());
} }
function SystemConfigCircuitComponent_Conditional_3_For_22_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 41);
    i0.ɵɵtext(1, "Aucun membre \u00E0 ce niveau.");
    i0.ɵɵelementEnd();
} }
function SystemConfigCircuitComponent_Conditional_3_For_22_For_24_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 47);
    i0.ɵɵlistener("click", function SystemConfigCircuitComponent_Conditional_3_For_22_For_24_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const m_r12 = i0.ɵɵnextContext().$implicit; const ɵ$index_121_r8 = i0.ɵɵnextContext().$index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeDraftMember(ɵ$index_121_r8, m_r12)); });
    i0.ɵɵtext(1, "\u2715");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
} }
function SystemConfigCircuitComponent_Conditional_3_For_22_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 43);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, SystemConfigCircuitComponent_Conditional_3_For_22_For_24_Conditional_2_Template, 2, 1, "button", 46);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r12 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx_r1.userLabel(m_r12), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.canEdit() ? 2 : -1);
} }
function SystemConfigCircuitComponent_Conditional_3_For_22_Conditional_25_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 49);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const u_r14 = ctx.$implicit;
    i0.ɵɵproperty("value", u_r14.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3("", u_r14.firstName, " ", u_r14.lastName, " (", u_r14.username, ")");
} }
function SystemConfigCircuitComponent_Conditional_3_For_22_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 44)(1, "select", 25);
    i0.ɵɵlistener("ngModelChange", function SystemConfigCircuitComponent_Conditional_3_For_22_Conditional_25_Template_select_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r13); const ɵ$index_121_r8 = i0.ɵɵnextContext().$index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setMemberPick(ɵ$index_121_r8, $event)); });
    i0.ɵɵelementStart(2, "option", 48);
    i0.ɵɵtext(3, "+ Ajouter un membre du comit\u00E9\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, SystemConfigCircuitComponent_Conditional_3_For_22_Conditional_25_For_5_Template, 2, 4, "option", 49, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 45);
    i0.ɵɵlistener("click", function SystemConfigCircuitComponent_Conditional_3_For_22_Conditional_25_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r13); const ɵ$index_121_r8 = i0.ɵɵnextContext().$index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.addDraftMember(ɵ$index_121_r8)); });
    i0.ɵɵtext(7, "Ajouter");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_14_0;
    const ɵ$index_121_r8 = i0.ɵɵnextContext().$index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", (tmp_14_0 = ctx_r1.memberPick()[ɵ$index_121_r8]) !== null && tmp_14_0 !== undefined ? tmp_14_0 : "")("disabled", ctx_r1.saving());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.users());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
} }
function SystemConfigCircuitComponent_Conditional_3_For_22_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 28)(1, "span", 34);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 35)(4, "label", 22)(5, "span");
    i0.ɵɵtext(6, "Code (ex : DOPI)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "input", 36);
    i0.ɵɵlistener("ngModelChange", function SystemConfigCircuitComponent_Conditional_3_For_22_Template_input_ngModelChange_7_listener($event) { const ɵ$index_121_r8 = i0.ɵɵrestoreView(_r7).$index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateDraftLevel(ɵ$index_121_r8, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "label", 22)(9, "span");
    i0.ɵɵtext(10, "Approbation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 25);
    i0.ɵɵlistener("ngModelChange", function SystemConfigCircuitComponent_Conditional_3_For_22_Template_select_ngModelChange_11_listener($event) { const ɵ$index_121_r8 = i0.ɵɵrestoreView(_r7).$index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setDraftMode(ɵ$index_121_r8, $event)); });
    i0.ɵɵelementStart(12, "option", 37);
    i0.ɵɵtext(13, "Tous");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "option", 38);
    i0.ɵɵtext(15, "Un seul");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "label", 39);
    i0.ɵɵelement(17, "input", 40);
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19, "Dernier niveau");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(20, SystemConfigCircuitComponent_Conditional_3_For_22_Conditional_20_Template, 2, 1, "button", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, SystemConfigCircuitComponent_Conditional_3_For_22_Conditional_21_Template, 2, 0, "p", 41);
    i0.ɵɵelementStart(22, "div", 42);
    i0.ɵɵrepeaterCreate(23, SystemConfigCircuitComponent_Conditional_3_For_22_For_24_Template, 3, 2, "span", 43, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(25, SystemConfigCircuitComponent_Conditional_3_For_22_Conditional_25_Template, 8, 3, "div", 44);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r15 = ctx.$implicit;
    const ɵ$index_121_r8 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Niveau ", ɵ$index_121_r8 + 1, "");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", level_r15.code)("disabled", ctx_r1.saving());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", level_r15.mode)("disabled", ctx_r1.saving());
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("checked", ctx_r1.isDraftLast(ɵ$index_121_r8));
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.canEdit() ? 20 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!level_r15.memberIds.length ? 21 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(level_r15.memberIds);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.canEdit() ? 25 : -1);
} }
function SystemConfigCircuitComponent_Conditional_3_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 45);
    i0.ɵɵlistener("click", function SystemConfigCircuitComponent_Conditional_3_Conditional_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.addDraftLevel()); });
    i0.ɵɵtext(1, "+ Ajouter un niveau");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const d_r10 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", d_r10.levels.length >= 5 || ctx_r1.saving());
} }
function SystemConfigCircuitComponent_Conditional_3_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.draftError());
} }
function SystemConfigCircuitComponent_Conditional_3_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 50);
    i0.ɵɵlistener("click", function SystemConfigCircuitComponent_Conditional_3_Conditional_28_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.saveDraft()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Enregistrement\u2026" : "Enregistrer le circuit", " ");
} }
function SystemConfigCircuitComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵlistener("click", function SystemConfigCircuitComponent_Conditional_3_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDraft()); });
    i0.ɵɵelementStart(1, "section", 20);
    i0.ɵɵlistener("click", function SystemConfigCircuitComponent_Conditional_3_Template_section_click_1_listener($event) { i0.ɵɵrestoreView(_r6); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 21)(5, "label", 22)(6, "span");
    i0.ɵɵtext(7, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "input", 23);
    i0.ɵɵlistener("ngModelChange", function SystemConfigCircuitComponent_Conditional_3_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateDraft("code", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "label", 22)(10, "span");
    i0.ɵɵtext(11, "Nom du circuit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "input", 24);
    i0.ɵɵlistener("ngModelChange", function SystemConfigCircuitComponent_Conditional_3_Template_input_ngModelChange_12_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateDraft("name", $event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "label", 22)(14, "span");
    i0.ɵɵtext(15, "Op\u00E9rations soumises au circuit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "select", 25);
    i0.ɵɵlistener("ngModelChange", function SystemConfigCircuitComponent_Conditional_3_Template_select_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateDraft("usage", $event)); });
    i0.ɵɵelementStart(17, "option", 26);
    i0.ɵɵtext(18, "R\u00E9ductions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "option", 27);
    i0.ɵɵtext(20, "Types de frais et tarifs");
    i0.ɵɵelementEnd()()();
    i0.ɵɵrepeaterCreate(21, SystemConfigCircuitComponent_Conditional_3_For_22_Template, 26, 9, "div", 28, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵtemplate(23, SystemConfigCircuitComponent_Conditional_3_Conditional_23_Template, 2, 1, "button", 29)(24, SystemConfigCircuitComponent_Conditional_3_Conditional_24_Template, 2, 1, "p", 30);
    i0.ɵɵelementStart(25, "div", 31)(26, "button", 32);
    i0.ɵɵlistener("click", function SystemConfigCircuitComponent_Conditional_3_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDraft()); });
    i0.ɵɵtext(27, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(28, SystemConfigCircuitComponent_Conditional_3_Conditional_28_Template, 2, 2, "button", 33);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const d_r10 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.draftIsNew() ? "Nouveau circuit" : "Modifier le circuit");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", d_r10.code)("disabled", ctx_r1.saving());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", d_r10.name)("disabled", ctx_r1.saving());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", d_r10.usage)("disabled", ctx_r1.saving());
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(d_r10.levels);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.canEdit() ? 23 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.draftError() ? 24 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.canEdit() ? 28 : -1);
} }
/**
 * Onglet Circuits de validation (modele Krindja).
 * Tableau CODE / NOM / NIVEAUX + Modifier / Supprimer, bouton
 * Nouveau circuit. La modale porte Code, Nom, niveaux avec code
 * (ex. DOPI), membres valideurs, mode Tous / Un seul, Dernier niveau.
 */
export class SystemConfigCircuitComponent {
    http = inject(HttpClient);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    store = inject(ApprovalCircuitService);
    destroyRef = inject(DestroyRef);
    circuits = signal([]);
    users = signal([]);
    loading = signal(true);
    failed = signal(false);
    draft = signal(null);
    draftIsNew = signal(false);
    draftError = signal('');
    saving = signal(false);
    memberPick = signal({});
    canEdit() {
        return this.auth.hasAny('SCHOOL_MANAGE', 'DISCOUNT_REQUEST_MANAGE');
    }
    ngOnInit() {
        this.loadCircuits();
        this.http.get(`${environment.apiBaseUrl}/users`)
            .pipe(catchError(() => of([])), takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (users) => {
                this.users.set(users.filter((u) => u.status === 'ACTIVE'));
                this.loading.set(false);
            },
            error: () => { this.loading.set(false); this.failed.set(true); }
        });
    }
    loadCircuits() {
        this.store.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: rows => {
                this.circuits.set(rows.map(c => ({ ...c, usage: c.usage ?? 'DISCOUNT',
                    levels: c.levels.map((l, i) => ({ code: l.code, mode: l.mode,
                        memberIds: l.members.map(m => m.id), isLast: i === c.levels.length - 1 })) })));
                this.loading.set(false);
            },
            error: () => { this.failed.set(true); this.loading.set(false); }
        });
    }
    reload() {
        this.loading.set(true);
        this.failed.set(false);
        this.ngOnInit();
    }
    userLabel(id) {
        const u = this.users().find((x) => x.id === id);
        return u ? `${u.firstName} ${u.lastName} (${u.username})` : 'Compte introuvable';
    }
    openNew() {
        if (!this.canEdit()) {
            return;
        }
        this.draftIsNew.set(true);
        this.draftError.set('');
        this.memberPick.set({});
        this.draft.set({
            id: '', code: '', name: '', usage: 'DISCOUNT',
            levels: [{ code: '', memberIds: [], mode: 'ALL', isLast: true }]
        });
    }
    openEdit(circuit) {
        if (!this.canEdit()) {
            return;
        }
        this.draftIsNew.set(false);
        this.draftError.set('');
        this.memberPick.set({});
        this.draft.set(structuredClone(circuit));
    }
    closeDraft() {
        if (this.saving()) {
            return;
        }
        this.draft.set(null);
    }
    updateDraft(field, value) {
        this.draft.update((d) => d ? { ...d, [field]: value } : d);
    }
    addDraftLevel() {
        this.draft.update((d) => {
            if (!d || d.levels.length >= 5) {
                return d;
            }
            const levels = [...d.levels.map((l) => ({ ...l, isLast: false })),
                { code: '', memberIds: [], mode: 'ALL', isLast: true }];
            return { ...d, levels };
        });
    }
    removeDraftLevel(index) {
        this.draft.update((d) => {
            if (!d || d.levels.length <= 1) {
                return d;
            }
            const levels = d.levels.filter((_, i) => i !== index)
                .map((l, i, all) => ({ ...l, isLast: i === all.length - 1 }));
            return { ...d, levels };
        });
    }
    updateDraftLevel(index, value) {
        this.draft.update((d) => {
            if (!d) {
                return d;
            }
            return { ...d, levels: d.levels.map((l, i) => i === index ? { ...l, code: value } : l) };
        });
    }
    setDraftMode(index, mode) {
        this.draft.update((d) => {
            if (!d) {
                return d;
            }
            return { ...d, levels: d.levels.map((l, i) => i === index ? { ...l, mode } : l) };
        });
    }
    isDraftLast(index) {
        const d = this.draft();
        return !!d && index === d.levels.length - 1;
    }
    addDraftMember(index) {
        const userId = this.memberPick()[index];
        if (!userId) {
            return;
        }
        this.draft.update((d) => {
            if (!d) {
                return d;
            }
            const levels = d.levels.map((l, i) => i === index && !l.memberIds.includes(userId)
                ? { ...l, memberIds: [...l.memberIds, userId] } : l);
            return { ...d, levels };
        });
        this.memberPick.update((p) => ({ ...p, [index]: '' }));
    }
    setMemberPick(index, value) {
        this.memberPick.update((p) => ({ ...p, [index]: value }));
    }
    removeDraftMember(index, userId) {
        this.draft.update((d) => {
            if (!d) {
                return d;
            }
            const levels = d.levels.map((l, i) => i === index
                ? { ...l, memberIds: l.memberIds.filter((m) => m !== userId) } : l);
            return { ...d, levels };
        });
    }
    saveDraft() {
        const d = this.draft();
        if (!d || !this.canEdit() || this.saving()) {
            return;
        }
        const code = d.code.trim().toUpperCase();
        const name = d.name.trim();
        if (!code) {
            this.draftError.set('Donnez un code au circuit (ex. VAL-ADM).');
            return;
        }
        if (!name) {
            this.draftError.set('Donnez un nom au circuit (ex. VALIDATION DOSSIER ADMISSION).');
            return;
        }
        const clash = this.circuits().some((c) => c.id !== d.id
            && c.code.trim().toUpperCase() === code);
        if (clash) {
            this.draftError.set(`Le code ${code} est déjà utilisé par un autre circuit.`);
            return;
        }
        if (d.levels.some((l) => !l.code.trim())) {
            this.draftError.set('Chaque niveau doit avoir un code (ex. DOPI).');
            return;
        }
        if (d.levels.some((l) => l.memberIds.length === 0)) {
            this.draftError.set('Affectez au moins un membre à chaque niveau.');
            return;
        }
        this.saving.set(true);
        const payload = { code, name, usage: d.usage, levels: d.levels.map(l => ({
                code: l.code, mode: l.mode, memberIds: l.memberIds
            })) };
        const save = this.draftIsNew() ? this.store.create(payload) : this.store.update(d.id, payload);
        save.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.saving.set(false);
                this.draft.set(null);
                this.loadCircuits();
                this.notifications.success(`Circuit ${code} enregistré.`, 'Circuit enregistré');
            },
            error: err => {
                this.saving.set(false);
                this.draftError.set(err?.error?.message ?? 'Enregistrement impossible.');
            }
        });
    }
    deleteCircuit(id) {
        if (!this.canEdit()) {
            return;
        }
        this.store.remove(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => { this.loadCircuits(); this.notifications.success('Le circuit est supprimé.'); },
            error: err => this.notifications.error(err?.error?.message ?? 'Suppression impossible.')
        });
    }
    static ɵfac = function SystemConfigCircuitComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SystemConfigCircuitComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SystemConfigCircuitComponent, selectors: [["eduops-system-config-circuit"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 4, vars: 2, consts: [["message", "Chargement des circuits\u2026"], ["title", "Circuits indisponibles", "message", "Les comptes valideurs n\u2019ont pas pu \u00EAtre charg\u00E9s."], [1, "modal-backdrop"], ["title", "Circuits indisponibles", "message", "Les comptes valideurs n\u2019ont pas pu \u00EAtre charg\u00E9s.", 3, "retry"], [1, "section-note"], [1, "card"], [1, "card__body", "card__body--flush"], [1, "circuit-head"], [1, "circuit-head__count"], ["type", "button", 1, "btn", "btn--primary", "btn--sm"], [1, "table-wrap"], [1, "circuit-table"], [1, "restricted"], ["routerLink", "/discounts"], ["type", "button", 1, "btn", "btn--primary", "btn--sm", 3, "click"], [1, "chip", "mono"], [1, "row-ops"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["colspan", "4"], [1, "modal-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-label", "Circuit de validation", 1, "modal", 3, "click"], [1, "grid"], [1, "field"], ["maxlength", "20", "placeholder", "CAISSE", 1, "input", "mono", 3, "ngModelChange", "ngModel", "disabled"], ["maxlength", "150", "placeholder", "Ex : Validation des d\u00E9penses", 1, "input", 3, "ngModelChange", "ngModel", "disabled"], [1, "input", 3, "ngModelChange", "ngModel", "disabled"], ["value", "DISCOUNT"], ["value", "FEE"], [1, "draft-level"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "disabled"], ["role", "alert", 1, "field__error"], [1, "foot-actions"], ["type", "button", 1, "btn", "btn--ghost", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn--primary", 3, "disabled"], [1, "circuit__rank"], [1, "draft-level__row"], ["maxlength", "20", 1, "input", "mono", 3, "ngModelChange", "ngModel", "disabled"], ["value", "ALL"], ["value", "ONE"], [1, "check"], ["type", "checkbox", "disabled", "", 3, "checked"], [1, "members-none"], [1, "chips"], [1, "chip"], [1, "member-add"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], ["type", "button", "aria-label", "Retirer", 1, "chip__x", 3, "disabled"], ["type", "button", "aria-label", "Retirer", 1, "chip__x", 3, "click", "disabled"], ["value", ""], [3, "value"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"]], template: function SystemConfigCircuitComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, SystemConfigCircuitComponent_Conditional_0_Template, 1, 0, "eduops-loading-state", 0)(1, SystemConfigCircuitComponent_Conditional_1_Template, 1, 0, "eduops-error-state", 1)(2, SystemConfigCircuitComponent_Conditional_2_Template, 28, 4)(3, SystemConfigCircuitComponent_Conditional_3_Template, 29, 11, "div", 2);
        } if (rf & 2) {
            let tmp_1_0;
            i0.ɵɵconditional(ctx.loading() ? 0 : ctx.failed() ? 1 : 2);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_1_0 = ctx.draft()) ? 3 : -1, tmp_1_0);
        } }, dependencies: [CommonModule, FormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.MaxLengthValidator, i1.NgModel, RouterLink, LoadingStateComponent, ErrorStateComponent], styles: [".guide-note[_ngcontent-%COMP%] { color: var(--text-muted); line-height: 1.6; }\n.tabs[_ngcontent-%COMP%] {\n  display: flex; gap: var(--space-2); flex-wrap: wrap; margin: var(--space-4) 0;\n  .tab {\n    display: flex; flex-direction: column; align-items: flex-start; gap: 2px;\n    padding: var(--space-3) var(--space-4); border: 1px solid var(--border);\n    border-radius: var(--radius-button); background: var(--surface-card);\n    color: var(--text-strong); font: inherit; font-weight: 600; cursor: pointer;\n    small { font-weight: 400; color: var(--text-muted); font-size: var(--text-xs); }\n    &-active { border-color: var(--brand); box-shadow: var(--shadow-sm); }\n  }\n}\n.card[_ngcontent-%COMP%] {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); margin-bottom: var(--space-4);\n  &__body { padding: var(--space-5); }\n}\n.identity-card[_ngcontent-%COMP%]   .pinned[_ngcontent-%COMP%] {\n  display: flex; gap: var(--space-6); flex-wrap: wrap;\n  & > div { display: flex; flex-direction: column; gap: 2px; }\n  &__label { font-size: var(--text-xs); text-transform: uppercase; letter-spacing: .04em; color: var(--text-light); }\n  &__value { font-size: var(--text-md); font-weight: 600; }\n  &__note { margin: var(--space-3) 0 0; font-size: var(--text-sm); color: var(--text-light); }\n}\n.section-title[_ngcontent-%COMP%] { margin: 0 0 var(--space-3); font-size: var(--text-md); }\n.section-note[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-4); font-size: var(--text-sm);\n  color: var(--text-light); max-width: 78ch; line-height: 1.6;\n  code { background: var(--surface-muted, rgba(0,0,0,.04)); padding: 0 4px; border-radius: 4px; }\n}\n.grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-3) var(--space-4); }\n.field[_ngcontent-%COMP%] {\n  display: flex; flex-direction: column; gap: var(--space-1);\n  & > span { font-size: var(--text-sm); color: var(--text-light); }\n  &__error { font-size: var(--text-xs); color: var(--danger, #b3261e); }\n}\n.foot-actions[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); align-items: center; justify-content: flex-end; margin-bottom: var(--space-4); }\n.color-row[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); align-items: center;\n  input[type=\"color\"] { width: 44px; height: 36px; padding: 2px; border: 1px solid var(--border); border-radius: 8px; background: #fff; }\n  .input { flex: 1; }\n}\n.preview[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4);\n  padding: var(--space-3); border-radius: var(--radius-card);\n  background: var(--brand); color: var(--text-on-brand, #fff);\n  &__chip { font-size: var(--text-xs); text-transform: uppercase; letter-spacing: .04em; opacity: .85; }\n  &__title { font-weight: 700; }\n}\n.circuit[_ngcontent-%COMP%] { list-style: none; padding: 0; margin: 0 0 var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }\n.circuit__level[_ngcontent-%COMP%] {\n  display: flex; gap: var(--space-3); align-items: flex-start;\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); padding: var(--space-4);\n}\n.circuit__rank[_ngcontent-%COMP%] {\n  display: grid; place-items: center; flex-shrink: 0;\n  width: 34px; height: 34px; border-radius: 50%;\n  background: var(--brand); color: #fff; font-weight: 700;\n}\n.circuit__fields[_ngcontent-%COMP%] { flex: 1; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-3); }\n.circuit__reader[_ngcontent-%COMP%] { grid-column: 1 / -1; margin: 0; font-size: var(--text-sm); color: var(--text-muted); }\n.circuit__ops[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-1); }\n.circuit-head[_ngcontent-%COMP%] {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-3); margin-bottom: var(--space-3);\n  &__count { font-size: var(--text-sm); color: var(--text-muted); }\n}\n.card__body--flush[_ngcontent-%COMP%] { padding: 0; overflow: hidden;\n  .circuit-head { padding: var(--space-4) var(--space-4) 0; }\n}\n.table-wrap[_ngcontent-%COMP%] { overflow-x: auto; }\n.circuit-table[_ngcontent-%COMP%] {\n  width: 100%; border-collapse: collapse; font-size: var(--text-sm);\n  th, td { text-align: left; padding: var(--space-3) var(--space-4); border-top: 1px solid var(--border-light); }\n  thead th { border-top: 0; font-size: var(--text-xs); text-transform: uppercase; letter-spacing: .04em; color: var(--text-light); }\n  .row-ops { white-space: nowrap; text-align: right; }\n}\n.chip[_ngcontent-%COMP%] {\n  display: inline-flex; align-items: center; gap: var(--space-1);\n  padding: 2px var(--space-2); border-radius: var(--radius-pill);\n  background: var(--surface-sunken); border: 1px solid var(--border);\n  font-size: var(--text-xs); font-weight: 600; color: var(--text-strong);\n  &__x { border: 0; background: none; cursor: pointer; color: var(--text-muted); font: inherit; padding: 0 2px; }\n}\n.chips[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: var(--space-1); margin-top: var(--space-2); }\n.members-none[_ngcontent-%COMP%] { margin: var(--space-1) 0 0; font-size: var(--text-xs); color: var(--text-light); }\n.member-add[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); margin-top: var(--space-2);\n  .input { flex: 1; }\n}\n.check[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); }\n.draft-level[_ngcontent-%COMP%] {\n  border: 1px solid var(--border); border-radius: var(--radius-card);\n  padding: var(--space-3); margin: var(--space-3) 0; background: var(--surface-card);\n  .circuit__rank { width: auto; height: auto; border-radius: var(--radius-pill); padding: 2px var(--space-2); font-size: var(--text-xs); margin-bottom: var(--space-2); }\n  &__row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-2); align-items: end; }\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed; inset: 0; z-index: var(--z-modal-backdrop, 1040);\n  background: rgba(27, 36, 53, .45); display: grid; place-items: center; padding: var(--space-4);\n}\n.modal[_ngcontent-%COMP%] {\n  width: min(640px, 100%); max-height: 90vh; overflow: auto;\n  background: var(--surface-card); border-radius: var(--radius-card);\n  padding: var(--space-5); box-shadow: var(--shadow-lg);\n  h2 { margin: 0 0 var(--space-4); font-size: var(--text-lg); }\n  .foot-actions { margin: var(--space-4) 0 0; }\n}\n.restricted[_ngcontent-%COMP%] { color: var(--text-muted); font-size: var(--text-sm); }\n.mono[_ngcontent-%COMP%] { font-family: var(--font-mono, ui-monospace, monospace); }\na[_ngcontent-%COMP%]:focus-visible, button[_ngcontent-%COMP%]:focus-visible { outline: 2px solid var(--brand); outline-offset: 3px; }\n@media (max-width: 600px) {\n  .card__body[_ngcontent-%COMP%] { padding: var(--space-3); }\n  .circuit__level[_ngcontent-%COMP%] { flex-direction: column; }\n  .circuit__ops[_ngcontent-%COMP%] { flex-direction: row; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SystemConfigCircuitComponent, [{
        type: Component,
        args: [{ selector: 'eduops-system-config-circuit', standalone: true, imports: [CommonModule, FormsModule, RouterLink, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (loading()) {\n  <eduops-loading-state message=\"Chargement des circuits\u2026\" />\n} @else if (failed()) {\n  <eduops-error-state title=\"Circuits indisponibles\"\n    message=\"Les comptes valideurs n\u2019ont pas pu \u00EAtre charg\u00E9s.\" (retry)=\"reload()\" />\n} @else {\n  <p class=\"section-note\">Cr\u00E9ez un ou plusieurs circuits. Chaque circuit a un code et des niveaux :\n  \u00E0 chaque niveau, un ou plusieurs membres valideurs.</p>\n\n  <div class=\"card\"><div class=\"card__body card__body--flush\">\n    <div class=\"circuit-head\">\n      <span class=\"circuit-head__count\">{{ circuits().length }} circuit(s)</span>\n      @if (canEdit()) {\n        <button type=\"button\" class=\"btn btn--primary btn--sm\" (click)=\"openNew()\">+ Nouveau circuit</button>\n      }\n    </div>\n    <div class=\"table-wrap\"><table class=\"circuit-table\">\n      <thead><tr><th>Code</th><th>Nom</th><th>Niveaux</th><th></th></tr></thead>\n      <tbody>\n        @for (c of circuits(); track c.id) {\n          <tr>\n            <td><span class=\"chip mono\">{{ c.code }}</span></td>\n            <td>{{ c.name }}</td>\n            <td>{{ c.levels.length }} niveau(x)</td>\n            <td class=\"row-ops\">\n              @if (canEdit()) {\n                <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"openEdit(c)\">Modifier</button>\n                <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"deleteCircuit(c.id)\">Supprimer</button>\n              }\n            </td>\n          </tr>\n        } @empty {\n          <tr><td colspan=\"4\">Aucun circuit pour le moment.</td></tr>\n        }\n      </tbody>\n    </table></div>\n  </div></div>\n\n  @if (!canEdit()) {\n    <p class=\"restricted\">La modification demande la gestion de l\u2019\u00E9tablissement ou des r\u00E9ductions.</p>\n  }\n\n  <p class=\"section-note\">Suivi des demandes : <a routerLink=\"/discounts\">Remises et bourses \u2192</a></p>\n}\n\n@if (draft(); as d) {\n  <div class=\"modal-backdrop\" (click)=\"closeDraft()\">\n    <section class=\"modal\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Circuit de validation\"\n             (click)=\"$event.stopPropagation()\">\n      <h2>{{ draftIsNew() ? 'Nouveau circuit' : 'Modifier le circuit' }}</h2>\n      <div class=\"grid\">\n        <label class=\"field\"><span>Code</span>\n          <input class=\"input mono\" [ngModel]=\"d.code\" [disabled]=\"saving()\"\n                 (ngModelChange)=\"updateDraft('code', $event)\" maxlength=\"20\" placeholder=\"CAISSE\" />\n        </label>\n        <label class=\"field\"><span>Nom du circuit</span>\n          <input class=\"input\" [ngModel]=\"d.name\" [disabled]=\"saving()\"\n                 (ngModelChange)=\"updateDraft('name', $event)\" maxlength=\"150\"\n                 placeholder=\"Ex : Validation des d\u00E9penses\" />\n        </label>\n      </div>\n\n      <label class=\"field\"><span>Op\u00E9rations soumises au circuit</span>\n        <select class=\"input\" [ngModel]=\"d.usage\" (ngModelChange)=\"updateDraft('usage', $event)\" [disabled]=\"saving()\">\n          <option value=\"DISCOUNT\">R\u00E9ductions</option>\n          <option value=\"FEE\">Types de frais et tarifs</option>\n        </select>\n      </label>\n\n      @for (level of d.levels; track $index; let i = $index) {\n        <div class=\"draft-level\">\n          <span class=\"circuit__rank\">Niveau {{ i + 1 }}</span>\n          <div class=\"draft-level__row\">\n            <label class=\"field\"><span>Code (ex : DOPI)</span>\n              <input class=\"input mono\" [ngModel]=\"level.code\" [disabled]=\"saving()\"\n                     (ngModelChange)=\"updateDraftLevel(i, $event)\" maxlength=\"20\" />\n            </label>\n            <label class=\"field\"><span>Approbation</span>\n              <select class=\"input\" [ngModel]=\"level.mode\" [disabled]=\"saving()\"\n                      (ngModelChange)=\"setDraftMode(i, $event)\">\n                <option value=\"ALL\">Tous</option>\n                <option value=\"ONE\">Un seul</option>\n              </select>\n            </label>\n            <label class=\"check\">\n              <input type=\"checkbox\" [checked]=\"isDraftLast(i)\" disabled />\n              <span>Dernier niveau</span>\n            </label>\n            @if (canEdit()) {\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"removeDraftLevel(i)\"\n                      [disabled]=\"d.levels.length <= 1 || saving()\">\u2715</button>\n            }\n          </div>\n          @if (!level.memberIds.length) {\n            <p class=\"members-none\">Aucun membre \u00E0 ce niveau.</p>\n          }\n          <div class=\"chips\">\n            @for (m of level.memberIds; track m) {\n              <span class=\"chip\">{{ userLabel(m) }}\n                @if (canEdit()) {\n                  <button type=\"button\" class=\"chip__x\" (click)=\"removeDraftMember(i, m)\"\n                          [disabled]=\"saving()\" aria-label=\"Retirer\">\u2715</button>\n                }\n              </span>\n            }\n          </div>\n          @if (canEdit()) {\n            <div class=\"member-add\">\n              <select class=\"input\" [ngModel]=\"memberPick()[i] ?? ''\"\n                      (ngModelChange)=\"setMemberPick(i, $event)\" [disabled]=\"saving()\">\n                <option value=\"\">+ Ajouter un membre du comit\u00E9\u2026</option>\n                @for (u of users(); track u.id) {\n                  <option [value]=\"u.id\">{{ u.firstName }} {{ u.lastName }} ({{ u.username }})</option>\n                }\n              </select>\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"addDraftMember(i)\"\n                      [disabled]=\"saving()\">Ajouter</button>\n            </div>\n          }\n        </div>\n      }\n\n      @if (canEdit()) {\n        <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"addDraftLevel()\"\n                [disabled]=\"d.levels.length >= 5 || saving()\">+ Ajouter un niveau</button>\n      }\n\n      @if (draftError()) {\n        <p class=\"field__error\" role=\"alert\">{{ draftError() }}</p>\n      }\n\n      <div class=\"foot-actions\">\n        <button type=\"button\" class=\"btn btn--ghost\" (click)=\"closeDraft()\"\n                [disabled]=\"saving()\">Annuler</button>\n        @if (canEdit()) {\n          <button type=\"button\" class=\"btn btn--primary\" (click)=\"saveDraft()\" [disabled]=\"saving()\">\n            {{ saving() ? 'Enregistrement\u2026' : 'Enregistrer le circuit' }}\n          </button>\n        }\n      </div>\n    </section>\n  </div>\n}\n", styles: [".guide-note { color: var(--text-muted); line-height: 1.6; }\n.tabs {\n  display: flex; gap: var(--space-2); flex-wrap: wrap; margin: var(--space-4) 0;\n  .tab {\n    display: flex; flex-direction: column; align-items: flex-start; gap: 2px;\n    padding: var(--space-3) var(--space-4); border: 1px solid var(--border);\n    border-radius: var(--radius-button); background: var(--surface-card);\n    color: var(--text-strong); font: inherit; font-weight: 600; cursor: pointer;\n    small { font-weight: 400; color: var(--text-muted); font-size: var(--text-xs); }\n    &-active { border-color: var(--brand); box-shadow: var(--shadow-sm); }\n  }\n}\n.card {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); margin-bottom: var(--space-4);\n  &__body { padding: var(--space-5); }\n}\n.identity-card .pinned {\n  display: flex; gap: var(--space-6); flex-wrap: wrap;\n  & > div { display: flex; flex-direction: column; gap: 2px; }\n  &__label { font-size: var(--text-xs); text-transform: uppercase; letter-spacing: .04em; color: var(--text-light); }\n  &__value { font-size: var(--text-md); font-weight: 600; }\n  &__note { margin: var(--space-3) 0 0; font-size: var(--text-sm); color: var(--text-light); }\n}\n.section-title { margin: 0 0 var(--space-3); font-size: var(--text-md); }\n.section-note {\n  margin: 0 0 var(--space-4); font-size: var(--text-sm);\n  color: var(--text-light); max-width: 78ch; line-height: 1.6;\n  code { background: var(--surface-muted, rgba(0,0,0,.04)); padding: 0 4px; border-radius: 4px; }\n}\n.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-3) var(--space-4); }\n.field {\n  display: flex; flex-direction: column; gap: var(--space-1);\n  & > span { font-size: var(--text-sm); color: var(--text-light); }\n  &__error { font-size: var(--text-xs); color: var(--danger, #b3261e); }\n}\n.foot-actions { display: flex; gap: var(--space-2); align-items: center; justify-content: flex-end; margin-bottom: var(--space-4); }\n.color-row { display: flex; gap: var(--space-2); align-items: center;\n  input[type=\"color\"] { width: 44px; height: 36px; padding: 2px; border: 1px solid var(--border); border-radius: 8px; background: #fff; }\n  .input { flex: 1; }\n}\n.preview {\n  display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4);\n  padding: var(--space-3); border-radius: var(--radius-card);\n  background: var(--brand); color: var(--text-on-brand, #fff);\n  &__chip { font-size: var(--text-xs); text-transform: uppercase; letter-spacing: .04em; opacity: .85; }\n  &__title { font-weight: 700; }\n}\n.circuit { list-style: none; padding: 0; margin: 0 0 var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }\n.circuit__level {\n  display: flex; gap: var(--space-3); align-items: flex-start;\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); padding: var(--space-4);\n}\n.circuit__rank {\n  display: grid; place-items: center; flex-shrink: 0;\n  width: 34px; height: 34px; border-radius: 50%;\n  background: var(--brand); color: #fff; font-weight: 700;\n}\n.circuit__fields { flex: 1; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-3); }\n.circuit__reader { grid-column: 1 / -1; margin: 0; font-size: var(--text-sm); color: var(--text-muted); }\n.circuit__ops { display: flex; flex-direction: column; gap: var(--space-1); }\n.circuit-head {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-3); margin-bottom: var(--space-3);\n  &__count { font-size: var(--text-sm); color: var(--text-muted); }\n}\n.card__body--flush { padding: 0; overflow: hidden;\n  .circuit-head { padding: var(--space-4) var(--space-4) 0; }\n}\n.table-wrap { overflow-x: auto; }\n.circuit-table {\n  width: 100%; border-collapse: collapse; font-size: var(--text-sm);\n  th, td { text-align: left; padding: var(--space-3) var(--space-4); border-top: 1px solid var(--border-light); }\n  thead th { border-top: 0; font-size: var(--text-xs); text-transform: uppercase; letter-spacing: .04em; color: var(--text-light); }\n  .row-ops { white-space: nowrap; text-align: right; }\n}\n.chip {\n  display: inline-flex; align-items: center; gap: var(--space-1);\n  padding: 2px var(--space-2); border-radius: var(--radius-pill);\n  background: var(--surface-sunken); border: 1px solid var(--border);\n  font-size: var(--text-xs); font-weight: 600; color: var(--text-strong);\n  &__x { border: 0; background: none; cursor: pointer; color: var(--text-muted); font: inherit; padding: 0 2px; }\n}\n.chips { display: flex; flex-wrap: wrap; gap: var(--space-1); margin-top: var(--space-2); }\n.members-none { margin: var(--space-1) 0 0; font-size: var(--text-xs); color: var(--text-light); }\n.member-add { display: flex; gap: var(--space-2); margin-top: var(--space-2);\n  .input { flex: 1; }\n}\n.check { display: inline-flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); }\n.draft-level {\n  border: 1px solid var(--border); border-radius: var(--radius-card);\n  padding: var(--space-3); margin: var(--space-3) 0; background: var(--surface-card);\n  .circuit__rank { width: auto; height: auto; border-radius: var(--radius-pill); padding: 2px var(--space-2); font-size: var(--text-xs); margin-bottom: var(--space-2); }\n  &__row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-2); align-items: end; }\n}\n.modal-backdrop {\n  position: fixed; inset: 0; z-index: var(--z-modal-backdrop, 1040);\n  background: rgba(27, 36, 53, .45); display: grid; place-items: center; padding: var(--space-4);\n}\n.modal {\n  width: min(640px, 100%); max-height: 90vh; overflow: auto;\n  background: var(--surface-card); border-radius: var(--radius-card);\n  padding: var(--space-5); box-shadow: var(--shadow-lg);\n  h2 { margin: 0 0 var(--space-4); font-size: var(--text-lg); }\n  .foot-actions { margin: var(--space-4) 0 0; }\n}\n.restricted { color: var(--text-muted); font-size: var(--text-sm); }\n.mono { font-family: var(--font-mono, ui-monospace, monospace); }\na:focus-visible, button:focus-visible { outline: 2px solid var(--brand); outline-offset: 3px; }\n@media (max-width: 600px) {\n  .card__body { padding: var(--space-3); }\n  .circuit__level { flex-direction: column; }\n  .circuit__ops { flex-direction: row; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SystemConfigCircuitComponent, { className: "SystemConfigCircuitComponent", filePath: "frontend/src/app/features/system-config/system-config-circuit.component.ts", lineNumber: 35 }); })();
//# sourceMappingURL=system-config-circuit.component.js.map