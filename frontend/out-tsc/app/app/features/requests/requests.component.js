import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { FAMILY_REQUEST_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { FAMILY_REQUEST_STATUSES, FAMILY_REQUEST_TYPES } from '@core/models/family-request.models';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.code;
const _forTrack1 = ($index, $item) => $item.id;
function RequestsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "button", 6);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_7_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreate()); });
    i0.ɵɵelementStart(2, "span", 7);
    i0.ɵɵtext(3, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " Enregistrer une demande ");
    i0.ɵɵelementEnd()();
} }
function RequestsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 5);
} }
function RequestsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 8);
    i0.ɵɵlistener("retry", function RequestsComponent_Conditional_9_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function RequestsComponent_Conditional_10_Conditional_0_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 18)(1, "span", 36);
    i0.ɵɵtext(2, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Les plus anciennes et les urgentes apparaissent en t\u00EAte de file.");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const b_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", b_r5.overdueCount, " demande(s) ont d\u00E9pass\u00E9 leur d\u00E9lai");
} }
function RequestsComponent_Conditional_10_Conditional_0_For_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", status_r6.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(status_r6.label);
} }
function RequestsComponent_Conditional_10_Conditional_0_For_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", type_r7.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(type_r7.label);
} }
function RequestsComponent_Conditional_10_Conditional_0_Conditional_56_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 37);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_10_Conditional_0_Conditional_56_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.resetFilters()); });
    i0.ɵɵtext(1, " R\u00E9initialiser ");
    i0.ɵɵelementEnd();
} }
function RequestsComponent_Conditional_10_Conditional_0_For_66_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const request_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(request_r11.classroomName);
} }
function RequestsComponent_Conditional_10_Conditional_0_For_66_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 38);
    i0.ɵɵelement(1, "div", 39);
    i0.ɵɵelementStart(2, "div", 40)(3, "div", 41)(4, "span", 42);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 43);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 44);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "h3");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p", 45);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 46)(15, "span")(16, "strong");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, RequestsComponent_Conditional_10_Conditional_0_For_66_Conditional_19_Template, 2, 1, "span");
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "div", 47)(23, "span");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "small");
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "small");
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 48)(31, "span");
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "button", 49);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_10_Conditional_0_For_66_Template_button_click_33_listener() { const request_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.review(request_r11)); });
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const request_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("request-card--overdue", request_r11.overdue);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", ctx_r1.priorityTone(request_r11.priority));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-tone", ctx_r1.statusTone(request_r11.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", request_r11.statusLabel, " ");
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", ctx_r1.priorityTone(request_r11.priority));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", request_r11.priorityLabel, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(request_r11.reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(request_r11.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(request_r11.typeLabel);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(request_r11.studentName);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u00B7 ", request_r11.studentNumber, "");
    i0.ɵɵadvance();
    i0.ɵɵconditional(request_r11.classroomName ? 19 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Demand\u00E9e par ", request_r11.guardianName, "");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("request-card__late", request_r11.overdue);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.dueLabel(request_r11));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Re\u00E7ue le ", i0.ɵɵpipeBind2(27, 21, request_r11.submittedAt, "dd/MM \u00E0 HH:mm"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(request_r11.channelLabel);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(request_r11.assignedTo || "Non attribu\u00E9e");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.canManage() ? "Traiter" : "Consulter", " ");
} }
function RequestsComponent_Conditional_10_Conditional_0_ForEmpty_67_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 52);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_10_Conditional_0_ForEmpty_67_Conditional_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.resetFilters()); });
    i0.ɵɵtext(1, " Voir les demandes ouvertes ");
    i0.ɵɵelementEnd();
} }
function RequestsComponent_Conditional_10_Conditional_0_ForEmpty_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35)(1, "span", 50);
    i0.ɵɵtext(2, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Aucune demande dans cette vue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, RequestsComponent_Conditional_10_Conditional_0_ForEmpty_67_Conditional_7_Template, 2, 0, "button", 51);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.hasFilters() ? "Modifiez les filtres pour retrouver les autres demandes." : "La file est vide : aucune famille n\u2019attend de r\u00E9ponse.", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.hasFilters() ? 7 : -1);
} }
function RequestsComponent_Conditional_10_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 9)(1, "button", 10);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_10_Conditional_0_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.filterStatus("OPEN")); });
    i0.ɵɵelementStart(2, "span", 11);
    i0.ɵɵtext(3, "\u00C0 traiter");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong", 12);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 13);
    i0.ɵɵtext(7, "demandes ouvertes");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 14);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_10_Conditional_0_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.filterStatus("NEW")); });
    i0.ɵɵelementStart(9, "span", 11);
    i0.ɵɵtext(10, "Nouvelles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "strong", 12);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 13);
    i0.ɵɵtext(14, "\u00E0 attribuer");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "button", 15);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_10_Conditional_0_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.filterStatus("IN_PROGRESS")); });
    i0.ɵɵelementStart(16, "span", 11);
    i0.ɵɵtext(17, "En traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "strong", 12);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 13);
    i0.ɵɵtext(21, "prises en charge");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "button", 16);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_10_Conditional_0_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.filterStatus("READY")); });
    i0.ɵɵelementStart(23, "span", 11);
    i0.ɵɵtext(24, "Pr\u00EAtes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "strong", 12);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span", 13);
    i0.ɵɵtext(28, "\u00E0 remettre");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "button", 17);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_10_Conditional_0_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.filterStatus("OPEN")); });
    i0.ɵɵelementStart(30, "span", 11);
    i0.ɵɵtext(31, "En retard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "strong", 12);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span", 13);
    i0.ɵɵtext(35, "d\u00E9lai d\u00E9pass\u00E9");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(36, RequestsComponent_Conditional_10_Conditional_0_Conditional_36_Template, 8, 1, "section", 18);
    i0.ɵɵelementStart(37, "section", 19)(38, "label", 20)(39, "span", 21);
    i0.ɵɵtext(40, "\u2315");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "span", 22);
    i0.ɵɵtext(42, "Rechercher une demande");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "input", 23);
    i0.ɵɵlistener("change", function RequestsComponent_Conditional_10_Conditional_0_Template_input_change_43_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.applySearch($event.target.value)); })("keyup.enter", function RequestsComponent_Conditional_10_Conditional_0_Template_input_keyup_enter_43_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.applySearch($event.target.value)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "select", 24);
    i0.ɵɵlistener("change", function RequestsComponent_Conditional_10_Conditional_0_Template_select_change_44_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.filterStatus($event.target.value)); });
    i0.ɵɵelementStart(45, "option", 25);
    i0.ɵɵtext(46, "Tous les statuts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "option", 26);
    i0.ɵɵtext(48, "Toutes les demandes ouvertes");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(49, RequestsComponent_Conditional_10_Conditional_0_For_50_Template, 2, 2, "option", 27, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "select", 28);
    i0.ɵɵlistener("change", function RequestsComponent_Conditional_10_Conditional_0_Template_select_change_51_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.filterType($event.target.value)); });
    i0.ɵɵelementStart(52, "option", 25);
    i0.ɵɵtext(53, "Tous les types");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(54, RequestsComponent_Conditional_10_Conditional_0_For_55_Template, 2, 2, "option", 27, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(56, RequestsComponent_Conditional_10_Conditional_0_Conditional_56_Template, 2, 0, "button", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "section", 30)(58, "header", 31)(59, "div")(60, "h2", 32);
    i0.ɵɵtext(61, "File de traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "p");
    i0.ɵɵtext(63);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(64, "div", 33);
    i0.ɵɵrepeaterCreate(65, RequestsComponent_Conditional_10_Conditional_0_For_66_Template, 35, 24, "article", 34, _forTrack1, false, RequestsComponent_Conditional_10_Conditional_0_ForEmpty_67_Template, 8, 2, "div", 35);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const b_r5 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("stat--selected", ctx_r1.statusFilter() === "OPEN");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", b_r5.newCount + b_r5.inProgressCount + b_r5.waitingFamilyCount + b_r5.readyCount, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("stat--selected", ctx_r1.statusFilter() === "NEW");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(b_r5.newCount);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("stat--selected", ctx_r1.statusFilter() === "IN_PROGRESS");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(b_r5.inProgressCount);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("stat--selected", ctx_r1.statusFilter() === "READY");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(b_r5.readyCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(b_r5.overdueCount);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(b_r5.overdueCount > 0 ? 36 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("value", ctx_r1.search());
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.statusFilter());
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r1.statuses);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r1.typeFilter());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.types);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.hasFilters() ? 56 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", b_r5.requests.length, " demande(s) affich\u00E9e(s)");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.visible());
} }
function RequestsComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, RequestsComponent_Conditional_10_Conditional_0_Template, 68, 20);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.board()) ? 0 : -1, tmp_1_0);
} }
function RequestsComponent_Conditional_11_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const student_r13 = ctx.$implicit;
    i0.ɵɵproperty("value", student_r13.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", student_r13.fullName, " \u2014 ", student_r13.studentNumber, " ");
} }
function RequestsComponent_Conditional_11_For_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r14 = ctx.$implicit;
    i0.ɵɵproperty("value", type_r14.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(type_r14.label);
} }
function RequestsComponent_Conditional_11_For_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const channel_r15 = ctx.$implicit;
    i0.ɵɵproperty("value", channel_r15.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(channel_r15.label);
} }
function RequestsComponent_Conditional_11_For_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const priority_r16 = ctx.$implicit;
    i0.ɵɵproperty("value", priority_r16.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(priority_r16.label);
} }
function RequestsComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 53);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_11_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCreate()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 54)(2, "header", 55)(3, "div")(4, "h2", 56);
    i0.ɵɵtext(5, "Enregistrer une demande");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 57);
    i0.ɵɵtext(7, "Pour une demande re\u00E7ue au t\u00E9l\u00E9phone ou \u00E0 l'accueil.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 58);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_11_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCreate()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 59);
    i0.ɵɵlistener("ngSubmit", function RequestsComponent_Conditional_11_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitCreate()); });
    i0.ɵɵelementStart(11, "label", 60)(12, "span", 61);
    i0.ɵɵtext(13, "\u00C9l\u00E8ve concern\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "select", 62)(15, "option", 25);
    i0.ɵɵtext(16, "Choisir un \u00E9l\u00E8ve\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(17, RequestsComponent_Conditional_11_For_18_Template, 2, 3, "option", 27, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 63)(20, "label", 60)(21, "span", 61);
    i0.ɵɵtext(22, "Demandeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(23, "input", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "label", 60)(25, "span", 65);
    i0.ɵɵtext(26, "T\u00E9l\u00E9phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(27, "input", 66);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div", 63)(29, "label", 60)(30, "span", 61);
    i0.ɵɵtext(31, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "select", 67);
    i0.ɵɵrepeaterCreate(33, RequestsComponent_Conditional_11_For_34_Template, 2, 2, "option", 27, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "label", 60)(36, "span", 61);
    i0.ɵɵtext(37, "Canal");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "select", 68);
    i0.ɵɵrepeaterCreate(39, RequestsComponent_Conditional_11_For_40_Template, 2, 2, "option", 27, _forTrack0);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(41, "label", 60)(42, "span", 61);
    i0.ɵɵtext(43, "Objet");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(44, "input", 69);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "label", 60)(46, "span", 65);
    i0.ɵɵtext(47, "Pr\u00E9cisions");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(48, "textarea", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "label", 60)(50, "span", 61);
    i0.ɵɵtext(51, "Priorit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "select", 71);
    i0.ɵɵrepeaterCreate(53, RequestsComponent_Conditional_11_For_54_Template, 2, 2, "option", 27, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "span", 72);
    i0.ɵɵtext(56, "Une urgence est attendue sous 24 heures.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(57, "footer", 73)(58, "button", 74);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_11_Template_button_click_58_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCreate()); });
    i0.ɵɵtext(59, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "button", 75);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_11_Template_button_click_60_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitCreate()); });
    i0.ɵɵtext(61);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("formGroup", ctx_r1.createForm);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r1.studentList());
    i0.ɵɵadvance(16);
    i0.ɵɵrepeater(ctx_r1.types);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r1.channels);
    i0.ɵɵadvance(14);
    i0.ɵɵrepeater(ctx_r1.priorities);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", ctx_r1.createForm.invalid || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Enregistrement\u2026" : "Ajouter \u00E0 la file", " ");
} }
function RequestsComponent_Conditional_12_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const request_r18 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", request_r18.classroomName, " ");
} }
function RequestsComponent_Conditional_12_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 84)(1, "h3");
    i0.ɵɵtext(2, "Pr\u00E9cisions de la famille");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const request_r18 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(request_r18.description);
} }
function RequestsComponent_Conditional_12_Conditional_46_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r20 = ctx.$implicit;
    i0.ɵɵproperty("value", status_r20.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(status_r20.label);
} }
function RequestsComponent_Conditional_12_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 88);
    i0.ɵɵlistener("ngSubmit", function RequestsComponent_Conditional_12_Conditional_46_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r19); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.saveReview()); });
    i0.ɵɵelementStart(1, "h3");
    i0.ɵɵtext(2, "Traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 63)(4, "label", 60)(5, "span", 65);
    i0.ɵɵtext(6, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "select", 89);
    i0.ɵɵrepeaterCreate(8, RequestsComponent_Conditional_12_Conditional_46_For_9_Template, 2, 2, "option", 27, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "label", 60)(11, "span", 65);
    i0.ɵɵtext(12, "Attribu\u00E9e \u00E0");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 90);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "label", 60)(15, "span", 65);
    i0.ɵɵtext(16, "Note interne");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(17, "textarea", 91);
    i0.ɵɵelementStart(18, "span", 72);
    i0.ɵɵtext(19, "Cette note reste interne \u00E0 l'\u00E9tablissement.");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroup", ctx_r1.reviewForm);
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r1.statuses);
} }
function RequestsComponent_Conditional_12_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 84)(1, "h3");
    i0.ɵɵtext(2, "Note de traitement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const request_r18 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(request_r18.internalNote);
} }
function RequestsComponent_Conditional_12_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 86);
    i0.ɵɵtext(1, "Ouvrir les documents");
    i0.ɵɵelementEnd();
} }
function RequestsComponent_Conditional_12_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 75);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_12_Conditional_52_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.saveReview()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Enregistrement\u2026" : "Enregistrer le traitement", " ");
} }
function RequestsComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 53);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_12_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeReview()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 76)(2, "header", 55)(3, "div")(4, "span", 77);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 78);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 57);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "button", 58);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_12_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeReview()); });
    i0.ɵɵtext(11, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 79)(13, "section", 80)(14, "div", 81)(15, "span", 82);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div")(18, "strong");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21);
    i0.ɵɵtemplate(22, RequestsComponent_Conditional_12_Conditional_22_Template, 1, 1);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "dl", 83)(24, "div")(25, "dt");
    i0.ɵɵtext(26, "Demandeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "dd");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div")(30, "dt");
    i0.ɵɵtext(31, "T\u00E9l\u00E9phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "dd");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div")(35, "dt");
    i0.ɵɵtext(36, "Re\u00E7ue le");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "dd");
    i0.ɵɵtext(38);
    i0.ɵɵpipe(39, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "div")(41, "dt");
    i0.ɵɵtext(42, "\u00C9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "dd");
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(45, RequestsComponent_Conditional_12_Conditional_45_Template, 5, 1, "div", 84);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(46, RequestsComponent_Conditional_12_Conditional_46_Template, 20, 1, "form", 85)(47, RequestsComponent_Conditional_12_Conditional_47_Template, 5, 1, "div", 84);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "footer", 73);
    i0.ɵɵtemplate(49, RequestsComponent_Conditional_12_Conditional_49_Template, 2, 0, "a", 86);
    i0.ɵɵelementStart(50, "button", 74);
    i0.ɵɵlistener("click", function RequestsComponent_Conditional_12_Template_button_click_50_listener() { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeReview()); });
    i0.ɵɵtext(51, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(52, RequestsComponent_Conditional_12_Conditional_52_Template, 2, 2, "button", 87);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const request_r18 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(request_r18.reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(request_r18.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", request_r18.typeLabel, " \u00B7 ", request_r18.channelLabel, "");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" ", request_r18.studentName.charAt(0), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(request_r18.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", request_r18.studentNumber, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(request_r18.classroomName ? 22 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(request_r18.guardianName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(request_r18.guardianPhone || "Non renseign\u00E9");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(39, 18, request_r18.submittedAt, "dd/MM/yyyy \u00E0 HH:mm"));
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("detail-grid__late", request_r18.overdue);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.dueLabel(request_r18));
    i0.ɵɵadvance();
    i0.ɵɵconditional(request_r18.description ? 45 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.canManage() ? 46 : request_r18.internalNote ? 47 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(request_r18.status === "READY" ? 49 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.canManage() ? 52 : -1);
} }
/** Incoming family requests, from first contact to handover. */
export class RequestsComponent {
    dataSource = inject(FAMILY_REQUEST_DATA_SOURCE);
    students = inject(STUDENT_DATA_SOURCE);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    types = FAMILY_REQUEST_TYPES;
    statuses = FAMILY_REQUEST_STATUSES;
    priorities = [
        { code: 'NORMAL', label: 'Normale' },
        { code: 'HIGH', label: 'Haute' },
        { code: 'URGENT', label: 'Urgente' }
    ];
    channels = [
        { code: 'PORTAL', label: 'Portail parent' },
        { code: 'EMAIL', label: 'E-mail' },
        { code: 'PHONE', label: 'Téléphone' },
        { code: 'IN_PERSON', label: "À l'accueil" }
    ];
    board = signal(null);
    studentList = signal([]);
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    search = signal('');
    statusFilter = signal('OPEN');
    typeFilter = signal('');
    creating = signal(false);
    reviewing = signal(null);
    canManage = computed(() => this.auth.has(PERMISSIONS.DOCUMENT_GENERATE));
    visible = computed(() => this.board()?.requests ?? []);
    hasFilters = computed(() => this.search().trim().length > 0
        || this.statusFilter() !== 'OPEN' || this.typeFilter() !== '');
    createForm = this.fb.nonNullable.group({
        studentId: ['', Validators.required],
        guardianName: ['', [Validators.required, Validators.maxLength(160)]],
        guardianPhone: ['', Validators.maxLength(40)],
        type: ['SCHOOL_CERTIFICATE', Validators.required],
        subject: ['', [Validators.required, Validators.maxLength(200)]],
        description: ['', Validators.maxLength(2000)],
        priority: ['NORMAL', Validators.required],
        channel: ['IN_PERSON', Validators.required]
    });
    reviewForm = this.fb.nonNullable.group({
        status: ['IN_PROGRESS', Validators.required],
        assignedTo: ['', Validators.maxLength(160)],
        internalNote: ['', Validators.maxLength(2000)]
    });
    ngOnInit() {
        forkJoin({ students: this.students.search({ page: 0, size: 500 }) })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: ({ students }) => this.studentList.set(students.content),
            error: () => undefined
        });
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.board({
            search: this.search().trim() || undefined,
            status: this.statusFilter() || undefined,
            type: this.typeFilter() || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (board) => {
                this.board.set(board);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    applySearch(value) {
        this.search.set(value);
        this.load();
    }
    filterStatus(status) {
        this.statusFilter.set(status);
        this.load();
    }
    filterType(type) {
        this.typeFilter.set(type);
        this.load();
    }
    resetFilters() {
        this.search.set('');
        this.statusFilter.set('OPEN');
        this.typeFilter.set('');
        this.load();
    }
    openCreate() {
        this.createForm.reset({
            studentId: '', guardianName: '', guardianPhone: '',
            type: 'SCHOOL_CERTIFICATE', subject: '', description: '',
            priority: 'NORMAL', channel: 'IN_PERSON'
        });
        this.creating.set(true);
    }
    closeCreate() {
        this.creating.set(false);
    }
    submitCreate() {
        if (this.createForm.invalid || this.saving()) {
            this.createForm.markAllAsTouched();
            return;
        }
        const value = this.createForm.getRawValue();
        this.saving.set(true);
        this.dataSource.create({
            studentId: value.studentId,
            guardianName: value.guardianName.trim(),
            guardianPhone: value.guardianPhone.trim() || undefined,
            type: value.type,
            subject: value.subject.trim(),
            description: value.description.trim() || undefined,
            priority: value.priority,
            channel: value.channel
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (request) => {
                this.saving.set(false);
                this.creating.set(false);
                this.notifications.success(`${request.reference} est ajoutée à la file.`, 'Demande enregistrée');
                this.load();
            },
            error: () => this.fail()
        });
    }
    review(request) {
        this.reviewing.set(request);
        this.reviewForm.reset({
            status: request.status === 'NEW' ? 'IN_PROGRESS' : request.status,
            assignedTo: request.assignedTo ?? '',
            internalNote: request.internalNote ?? ''
        });
    }
    closeReview() {
        this.reviewing.set(null);
    }
    saveReview() {
        const request = this.reviewing();
        if (!request || this.reviewForm.invalid || this.saving())
            return;
        const value = this.reviewForm.getRawValue();
        this.saving.set(true);
        this.dataSource.update(request.id, {
            status: value.status,
            assignedTo: value.assignedTo.trim() || undefined,
            internalNote: value.internalNote.trim() || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (saved) => {
                this.saving.set(false);
                this.reviewing.set(saved);
                this.notifications.success(`${saved.reference} est maintenant « ${saved.statusLabel} ».`, 'Demande mise à jour');
                this.load();
            },
            error: () => this.fail()
        });
    }
    statusTone(status) {
        return this.statuses.find((item) => item.code === status)?.tone ?? 'new';
    }
    priorityTone(priority) {
        return ({ NORMAL: 'normal', HIGH: 'high', URGENT: 'urgent' })[priority];
    }
    dueLabel(request) {
        if (request.status === 'COMPLETED')
            return 'Clôturée';
        if (request.status === 'REJECTED')
            return 'Refusée';
        if (request.overdue)
            return 'Délai dépassé';
        const hours = Math.max(0, Math.ceil((Date.parse(request.dueAt) - Date.now()) / 3600000));
        return hours < 24 ? `Échéance dans ${hours} h` : `Échéance dans ${Math.ceil(hours / 24)} j`;
    }
    fail() {
        this.saving.set(false);
        this.notifications.error("La demande n'a pas pu être enregistrée.", 'Action refusée');
    }
    static ɵfac = function RequestsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RequestsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RequestsComponent, selectors: [["eduops-requests"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 13, vars: 4, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta"], [1, "page__actions"], ["message", "Chargement des demandes\u2026"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], [3, "retry"], ["aria-label", "\u00C9tat de la file", 1, "stats"], ["type", "button", 1, "stat", 3, "click"], [1, "stat__label"], [1, "stat__value", "numeric"], [1, "stat__note"], ["type", "button", 1, "stat", "stat--new", 3, "click"], ["type", "button", 1, "stat", "stat--progress", 3, "click"], ["type", "button", 1, "stat", "stat--ready", 3, "click"], ["type", "button", 1, "stat", "stat--overdue", 3, "click"], ["role", "status", 1, "warning-block"], ["aria-label", "Filtres", 1, "toolbar"], [1, "search-field"], ["aria-hidden", "true", 1, "search-field__icon"], [1, "visually-hidden"], ["type", "search", "placeholder", "R\u00E9f\u00E9rence, \u00E9l\u00E8ve, famille ou objet\u2026", 1, "input", 3, "change", "keyup.enter", "value"], ["aria-label", "Filtrer par statut", 1, "input", "toolbar__select", 3, "change", "value"], ["value", ""], ["value", "OPEN"], [3, "value"], ["aria-label", "Filtrer par type", 1, "input", "toolbar__select", 3, "change", "value"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm"], ["aria-labelledby", "queue-title", 1, "queue"], [1, "queue__head"], ["id", "queue-title"], [1, "request-list"], [1, "request-card", 3, "request-card--overdue"], [1, "empty-state"], ["aria-hidden", "true", 1, "warning-block__icon"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], [1, "request-card"], ["aria-hidden", "true", 1, "request-card__priority"], [1, "request-card__main"], [1, "request-card__eyebrow"], [1, "status"], [1, "priority"], [1, "request-card__reference", "numeric"], [1, "request-card__type"], [1, "request-card__people"], [1, "request-card__timing"], [1, "request-card__owner"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], ["aria-hidden", "true", 1, "empty-state__icon"], ["type", "button", 1, "btn", "btn--secondary"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "create-title", 1, "drawer"], [1, "drawer__head"], ["id", "create-title", 1, "drawer__title"], [1, "drawer__meta"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "drawer__body", 3, "ngSubmit", "formGroup"], [1, "field"], [1, "field__label", "field__label--required"], ["formControlName", "studentId", 1, "input"], [1, "grid2"], ["formControlName", "guardianName", "placeholder", "Nom du responsable", 1, "input"], [1, "field__label"], ["formControlName", "guardianPhone", "type", "tel", 1, "input"], ["formControlName", "type", 1, "input"], ["formControlName", "channel", 1, "input"], ["formControlName", "subject", "placeholder", "Ex. Certificat pour allocation familiale", 1, "input"], ["rows", "4", "formControlName", "description", 1, "input"], ["formControlName", "priority", 1, "input"], [1, "field__hint"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "review-title", 1, "drawer", "drawer--wide"], [1, "drawer__reference", "numeric"], ["id", "review-title", 1, "drawer__title"], [1, "drawer__body"], [1, "request-detail"], [1, "detail-person"], ["aria-hidden", "true", 1, "detail-person__avatar"], [1, "detail-grid"], [1, "detail-description"], [1, "processing", 3, "formGroup"], ["routerLink", "/student-files", 1, "btn", "btn--secondary"], ["type", "button", 1, "btn", "btn--primary", 3, "disabled"], [1, "processing", 3, "ngSubmit", "formGroup"], ["formControlName", "status", 1, "input"], ["formControlName", "assignedTo", "placeholder", "Nom de l'agent", 1, "input"], ["rows", "4", "formControlName", "internalNote", "placeholder", "Pi\u00E8ce manquante, appel effectu\u00E9, document pr\u00E9par\u00E9\u2026", 1, "input"]], template: function RequestsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Demandes des familles");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, " Une file unique pour r\u00E9pondre, pr\u00E9parer les documents et rappeler les familles. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, RequestsComponent_Conditional_7_Template, 5, 0, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, RequestsComponent_Conditional_8_Template, 1, 0, "eduops-loading-state", 5)(9, RequestsComponent_Conditional_9_Template, 1, 0, "eduops-error-state")(10, RequestsComponent_Conditional_10_Template, 1, 1)(11, RequestsComponent_Conditional_11_Template, 62, 3)(12, RequestsComponent_Conditional_12_Template, 53, 21);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_3_0;
            i0.ɵɵadvance(7);
            i0.ɵɵconditional(ctx.canManage() ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 8 : ctx.error() ? 9 : 10);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.creating() ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_3_0 = ctx.reviewing()) ? 12 : -1, tmp_3_0);
        } }, dependencies: [CommonModule, i1.DatePipe, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, RouterLink,
            LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  gap: var(--space-3);\n  margin-bottom: var(--space-5);\n}\n\n.stat[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  flex-direction: column;\n  padding: var(--space-4);\n  text-align: left;\n  color: var(--text-normal);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 3px solid var(--border-strong);\n  border-radius: var(--radius-card);\n  cursor: pointer;\n\n  &:hover { background: var(--surface-hover); }\n  &--selected { border-color: var(--brand); box-shadow: 0 0 0 2px var(--brand-tint); }\n  &--new { border-left-color: var(--brand); }\n  &--progress { border-left-color: var(--warning); }\n  &--ready { border-left-color: var(--success); }\n  &--overdue { border-left-color: var(--danger); }\n  &__label { font-size: var(--text-xs); color: var(--text-muted); }\n  &__value { margin: 2px 0; font-size: var(--text-2xl); color: var(--text-strong); }\n  &__note { font-size: var(--text-xs); color: var(--text-light); }\n}\n\n.warning-block[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--danger-bg);\n  border: 1px solid var(--danger);\n  border-radius: var(--radius-card);\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 24px;\n    height: 24px;\n    font-weight: 800;\n    color: var(--text-on-brand);\n    background: var(--danger);\n    border-radius: 50%;\n  }\n  strong { color: var(--text-strong); }\n  p { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  flex-wrap: wrap;\n\n  &__select { width: auto; min-width: 190px; }\n}\n\n.search-field[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1 1 300px;\n\n  &__icon {\n    position: absolute;\n    top: 50%;\n    left: var(--space-3);\n    z-index: 1;\n    color: var(--text-light);\n    transform: translateY(-50%);\n  }\n  .input { padding-left: 36px; }\n}\n\n.queue[_ngcontent-%COMP%] {\n  &__head {\n    margin-bottom: var(--space-3);\n    h2 { margin: 0; font-size: var(--text-lg); color: var(--text-strong); }\n    p { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n  }\n}\n\n.request-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); }\n\n.request-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto auto;\n  gap: var(--space-5);\n  overflow: hidden;\n  padding: var(--space-4) var(--space-5);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n\n  &--overdue { border-color: var(--danger); }\n\n  &__priority {\n    position: absolute;\n    inset: 0 auto 0 0;\n    width: 4px;\n    background: var(--border-strong);\n    &[data-tone='high'] { background: var(--warning); }\n    &[data-tone='urgent'] { background: var(--danger); }\n  }\n\n  &__eyebrow { display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap; }\n  &__reference { font-size: var(--text-xs); color: var(--text-light); }\n  h3 { margin: var(--space-2) 0 2px; font-size: var(--text-md); color: var(--text-strong); }\n  &__type { margin: 0; font-size: var(--text-xs); color: var(--brand); }\n\n  &__people {\n    display: flex;\n    gap: var(--space-2) var(--space-3);\n    margin-top: var(--space-3);\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    flex-wrap: wrap;\n    strong { color: var(--text-normal); }\n  }\n\n  &__timing, &__owner {\n    display: flex;\n    align-items: flex-end;\n    justify-content: center;\n    flex-direction: column;\n    min-width: 150px;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    small { color: var(--text-light); }\n  }\n\n  &__late { font-weight: 700; color: var(--danger); }\n  &__owner { gap: var(--space-2); }\n}\n\n.status[_ngcontent-%COMP%], .priority[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 22px;\n  padding: 0 var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 700;\n  border-radius: var(--radius-badge);\n}\n\n.status[_ngcontent-%COMP%] {\n  &[data-tone='new'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='progress'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='waiting'] { color: var(--text-muted); background: var(--surface-sunken); }\n  &[data-tone='ready'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='done'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='rejected'] { color: var(--danger); background: var(--danger-bg); }\n}\n\n.priority[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  &[data-tone='high'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='urgent'] { color: var(--danger); background: var(--danger-bg); }\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: var(--space-12) var(--space-5);\n  text-align: center;\n  background: var(--surface-card);\n  border: 1px dashed var(--border-strong);\n  border-radius: var(--radius-card);\n  &__icon {\n    display: grid; place-items: center; width: 48px; height: 48px;\n    font-size: var(--text-xl); color: var(--success); background: var(--success-bg);\n    border-radius: 50%;\n  }\n  h3 { margin: var(--space-3) 0 var(--space-2); color: var(--text-strong); }\n  p { margin: 0 0 var(--space-4); color: var(--text-muted); }\n}\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0 0 0 auto;\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n  width: min(500px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n  &--wide { width: min(620px, 100vw); }\n  &__head {\n    display: flex; align-items: flex-start; justify-content: space-between;\n    gap: var(--space-3); padding: var(--space-5); border-bottom: 1px solid var(--border-light);\n  }\n  &__title { margin: 0; font-size: var(--text-lg); color: var(--text-strong); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n  &__reference { display: block; margin-bottom: 3px; font-size: var(--text-xs); color: var(--brand); }\n  &__close { width: 32px; height: 32px; font-size: var(--text-lg); color: var(--text-muted); background: none; border: 0; cursor: pointer; }\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n  &__foot {\n    display: flex; align-items: center; justify-content: flex-end; gap: var(--space-3);\n    padding: var(--space-4) var(--space-5); border-top: 1px solid var(--border-light);\n    flex-wrap: wrap;\n  }\n}\n\n.grid2[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }\n\n.detail-person[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: var(--space-3); padding-bottom: var(--space-4);\n  border-bottom: 1px solid var(--border-light);\n  &__avatar {\n    display: grid; place-items: center; width: 42px; height: 42px; font-weight: 800;\n    color: var(--text-on-brand); background: var(--brand); border-radius: 12px;\n  }\n  div { display: flex; flex-direction: column; }\n  strong { color: var(--text-strong); }\n  span { font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);\n  margin: var(--space-5) 0;\n  div { min-width: 0; }\n  dt { font-size: var(--text-xs); color: var(--text-light); }\n  dd { margin: 3px 0 0; color: var(--text-strong); }\n  &__late { font-weight: 700; color: var(--danger) !important; }\n}\n\n.detail-description[_ngcontent-%COMP%] {\n  padding: var(--space-4); margin-bottom: var(--space-5);\n  background: var(--surface-sunken); border-radius: var(--radius-input);\n  h3 { margin: 0 0 var(--space-2); font-size: var(--text-sm); color: var(--text-strong); }\n  p { margin: 0; line-height: var(--leading-relaxed); color: var(--text-muted); }\n}\n\n.processing[_ngcontent-%COMP%] {\n  padding-top: var(--space-5); border-top: 1px solid var(--border-light);\n  > h3 { margin: 0 0 var(--space-4); font-size: var(--text-md); color: var(--text-strong); }\n}\n\n@include tablet-down {\n  .stats { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n  .request-card { grid-template-columns: minmax(0, 1fr) auto; }\n  .request-card__timing { grid-column: 1; align-items: flex-start; }\n  .request-card__owner { grid-row: 1 / span 2; grid-column: 2; }\n}\n\n@include mobile {\n  .stats { grid-template-columns: 1fr 1fr; gap: var(--space-2); }\n  .stat { padding: var(--space-3); }\n  .toolbar { align-items: stretch; padding: var(--space-3); }\n  .toolbar__select { width: 100%; }\n  .request-card { grid-template-columns: 1fr; gap: var(--space-3); padding: var(--space-4); }\n  .request-card__timing, .request-card__owner { grid-column: 1; grid-row: auto; align-items: flex-start; }\n  .grid2, .detail-grid { grid-template-columns: 1fr; }\n  .drawer__foot { align-items: stretch; flex-direction: column; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RequestsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-requests', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink,
                    LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Demandes des familles</h1>\n      <p class=\"page__meta\">\n        Une file unique pour r\u00E9pondre, pr\u00E9parer les documents et rappeler les familles.\n      </p>\n    </div>\n    @if (canManage()) {\n      <div class=\"page__actions\">\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openCreate()\">\n          <span aria-hidden=\"true\">+</span> Enregistrer une demande\n        </button>\n      </div>\n    }\n  </header>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des demandes\u2026\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n    @if (board(); as b) {\n    <section class=\"stats\" aria-label=\"\u00C9tat de la file\">\n      <button type=\"button\" class=\"stat\" [class.stat--selected]=\"statusFilter() === 'OPEN'\"\n              (click)=\"filterStatus('OPEN')\">\n        <span class=\"stat__label\">\u00C0 traiter</span>\n        <strong class=\"stat__value numeric\">\n          {{ b.newCount + b.inProgressCount + b.waitingFamilyCount + b.readyCount }}\n        </strong>\n        <span class=\"stat__note\">demandes ouvertes</span>\n      </button>\n      <button type=\"button\" class=\"stat stat--new\"\n              [class.stat--selected]=\"statusFilter() === 'NEW'\" (click)=\"filterStatus('NEW')\">\n        <span class=\"stat__label\">Nouvelles</span>\n        <strong class=\"stat__value numeric\">{{ b.newCount }}</strong>\n        <span class=\"stat__note\">\u00E0 attribuer</span>\n      </button>\n      <button type=\"button\" class=\"stat stat--progress\"\n              [class.stat--selected]=\"statusFilter() === 'IN_PROGRESS'\"\n              (click)=\"filterStatus('IN_PROGRESS')\">\n        <span class=\"stat__label\">En traitement</span>\n        <strong class=\"stat__value numeric\">{{ b.inProgressCount }}</strong>\n        <span class=\"stat__note\">prises en charge</span>\n      </button>\n      <button type=\"button\" class=\"stat stat--ready\"\n              [class.stat--selected]=\"statusFilter() === 'READY'\" (click)=\"filterStatus('READY')\">\n        <span class=\"stat__label\">Pr\u00EAtes</span>\n        <strong class=\"stat__value numeric\">{{ b.readyCount }}</strong>\n        <span class=\"stat__note\">\u00E0 remettre</span>\n      </button>\n      <button type=\"button\" class=\"stat stat--overdue\" (click)=\"filterStatus('OPEN')\">\n        <span class=\"stat__label\">En retard</span>\n        <strong class=\"stat__value numeric\">{{ b.overdueCount }}</strong>\n        <span class=\"stat__note\">d\u00E9lai d\u00E9pass\u00E9</span>\n      </button>\n    </section>\n\n    @if (b.overdueCount > 0) {\n      <section class=\"warning-block\" role=\"status\">\n        <span class=\"warning-block__icon\" aria-hidden=\"true\">!</span>\n        <div>\n          <strong>{{ b.overdueCount }} demande(s) ont d\u00E9pass\u00E9 leur d\u00E9lai</strong>\n          <p>Les plus anciennes et les urgentes apparaissent en t\u00EAte de file.</p>\n        </div>\n      </section>\n    }\n\n    <section class=\"toolbar\" aria-label=\"Filtres\">\n      <label class=\"search-field\">\n        <span class=\"search-field__icon\" aria-hidden=\"true\">\u2315</span>\n        <span class=\"visually-hidden\">Rechercher une demande</span>\n        <input type=\"search\" class=\"input\" [value]=\"search()\"\n               placeholder=\"R\u00E9f\u00E9rence, \u00E9l\u00E8ve, famille ou objet\u2026\"\n               (change)=\"applySearch($any($event.target).value)\"\n               (keyup.enter)=\"applySearch($any($event.target).value)\">\n      </label>\n\n      <select class=\"input toolbar__select\" [value]=\"statusFilter()\"\n              aria-label=\"Filtrer par statut\"\n              (change)=\"filterStatus($any($event.target).value)\">\n        <option value=\"\">Tous les statuts</option>\n        <option value=\"OPEN\">Toutes les demandes ouvertes</option>\n        @for (status of statuses; track status.code) {\n          <option [value]=\"status.code\">{{ status.label }}</option>\n        }\n      </select>\n\n      <select class=\"input toolbar__select\" [value]=\"typeFilter()\"\n              aria-label=\"Filtrer par type\"\n              (change)=\"filterType($any($event.target).value)\">\n        <option value=\"\">Tous les types</option>\n        @for (type of types; track type.code) {\n          <option [value]=\"type.code\">{{ type.label }}</option>\n        }\n      </select>\n\n      @if (hasFilters()) {\n        <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"resetFilters()\">\n          R\u00E9initialiser\n        </button>\n      }\n    </section>\n\n    <section class=\"queue\" aria-labelledby=\"queue-title\">\n      <header class=\"queue__head\">\n        <div>\n          <h2 id=\"queue-title\">File de traitement</h2>\n          <p>{{ b.requests.length }} demande(s) affich\u00E9e(s)</p>\n        </div>\n      </header>\n\n      <div class=\"request-list\">\n        @for (request of visible(); track request.id) {\n          <article class=\"request-card\" [class.request-card--overdue]=\"request.overdue\">\n            <div class=\"request-card__priority\"\n                 [attr.data-tone]=\"priorityTone(request.priority)\" aria-hidden=\"true\"></div>\n\n            <div class=\"request-card__main\">\n              <div class=\"request-card__eyebrow\">\n                <span class=\"status\" [attr.data-tone]=\"statusTone(request.status)\">\n                  {{ request.statusLabel }}\n                </span>\n                <span class=\"priority\" [attr.data-tone]=\"priorityTone(request.priority)\">\n                  {{ request.priorityLabel }}\n                </span>\n                <span class=\"request-card__reference numeric\">{{ request.reference }}</span>\n              </div>\n              <h3>{{ request.subject }}</h3>\n              <p class=\"request-card__type\">{{ request.typeLabel }}</p>\n              <div class=\"request-card__people\">\n                <span><strong>{{ request.studentName }}</strong> \u00B7 {{ request.studentNumber }}</span>\n                @if (request.classroomName) { <span>{{ request.classroomName }}</span> }\n                <span>Demand\u00E9e par {{ request.guardianName }}</span>\n              </div>\n            </div>\n\n            <div class=\"request-card__timing\">\n              <span [class.request-card__late]=\"request.overdue\">{{ dueLabel(request) }}</span>\n              <small>Re\u00E7ue le {{ request.submittedAt | date:'dd/MM \u00E0 HH:mm' }}</small>\n              <small>{{ request.channelLabel }}</small>\n            </div>\n\n            <div class=\"request-card__owner\">\n              <span>{{ request.assignedTo || 'Non attribu\u00E9e' }}</span>\n              <button type=\"button\" class=\"btn btn--secondary btn--sm\" (click)=\"review(request)\">\n                {{ canManage() ? 'Traiter' : 'Consulter' }}\n              </button>\n            </div>\n          </article>\n        } @empty {\n          <div class=\"empty-state\">\n            <span class=\"empty-state__icon\" aria-hidden=\"true\">\u2713</span>\n            <h3>Aucune demande dans cette vue</h3>\n            <p>\n              {{ hasFilters()\n                ? 'Modifiez les filtres pour retrouver les autres demandes.'\n                : 'La file est vide : aucune famille n\u2019attend de r\u00E9ponse.' }}\n            </p>\n            @if (hasFilters()) {\n              <button type=\"button\" class=\"btn btn--secondary\" (click)=\"resetFilters()\">\n                Voir les demandes ouvertes\n              </button>\n            }\n          </div>\n        }\n      </div>\n    </section>\n    }\n  }\n\n  @if (creating()) {\n    <div class=\"drawer-backdrop\" (click)=\"closeCreate()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"create-title\">\n      <header class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"create-title\">Enregistrer une demande</h2>\n          <p class=\"drawer__meta\">Pour une demande re\u00E7ue au t\u00E9l\u00E9phone ou \u00E0 l'accueil.</p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeCreate()\">\u00D7</button>\n      </header>\n\n      <form class=\"drawer__body\" [formGroup]=\"createForm\" (ngSubmit)=\"submitCreate()\">\n        <label class=\"field\">\n          <span class=\"field__label field__label--required\">\u00C9l\u00E8ve concern\u00E9</span>\n          <select class=\"input\" formControlName=\"studentId\">\n            <option value=\"\">Choisir un \u00E9l\u00E8ve\u2026</option>\n            @for (student of studentList(); track student.id) {\n              <option [value]=\"student.id\">\n                {{ student.fullName }} \u2014 {{ student.studentNumber }}\n              </option>\n            }\n          </select>\n        </label>\n\n        <div class=\"grid2\">\n          <label class=\"field\">\n            <span class=\"field__label field__label--required\">Demandeur</span>\n            <input class=\"input\" formControlName=\"guardianName\" placeholder=\"Nom du responsable\">\n          </label>\n          <label class=\"field\">\n            <span class=\"field__label\">T\u00E9l\u00E9phone</span>\n            <input class=\"input\" formControlName=\"guardianPhone\" type=\"tel\">\n          </label>\n        </div>\n\n        <div class=\"grid2\">\n          <label class=\"field\">\n            <span class=\"field__label field__label--required\">Type</span>\n            <select class=\"input\" formControlName=\"type\">\n              @for (type of types; track type.code) {\n                <option [value]=\"type.code\">{{ type.label }}</option>\n              }\n            </select>\n          </label>\n          <label class=\"field\">\n            <span class=\"field__label field__label--required\">Canal</span>\n            <select class=\"input\" formControlName=\"channel\">\n              @for (channel of channels; track channel.code) {\n                <option [value]=\"channel.code\">{{ channel.label }}</option>\n              }\n            </select>\n          </label>\n        </div>\n\n        <label class=\"field\">\n          <span class=\"field__label field__label--required\">Objet</span>\n          <input class=\"input\" formControlName=\"subject\"\n                 placeholder=\"Ex. Certificat pour allocation familiale\">\n        </label>\n\n        <label class=\"field\">\n          <span class=\"field__label\">Pr\u00E9cisions</span>\n          <textarea class=\"input\" rows=\"4\" formControlName=\"description\"></textarea>\n        </label>\n\n        <label class=\"field\">\n          <span class=\"field__label field__label--required\">Priorit\u00E9</span>\n          <select class=\"input\" formControlName=\"priority\">\n            @for (priority of priorities; track priority.code) {\n              <option [value]=\"priority.code\">{{ priority.label }}</option>\n            }\n          </select>\n          <span class=\"field__hint\">Une urgence est attendue sous 24 heures.</span>\n        </label>\n      </form>\n\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--ghost\" (click)=\"closeCreate()\">Annuler</button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"createForm.invalid || saving()\" (click)=\"submitCreate()\">\n          {{ saving() ? 'Enregistrement\u2026' : 'Ajouter \u00E0 la file' }}\n        </button>\n      </footer>\n    </aside>\n  }\n\n  @if (reviewing(); as request) {\n    <div class=\"drawer-backdrop\" (click)=\"closeReview()\"></div>\n    <aside class=\"drawer drawer--wide\" role=\"dialog\" aria-modal=\"true\"\n           aria-labelledby=\"review-title\">\n      <header class=\"drawer__head\">\n        <div>\n          <span class=\"drawer__reference numeric\">{{ request.reference }}</span>\n          <h2 class=\"drawer__title\" id=\"review-title\">{{ request.subject }}</h2>\n          <p class=\"drawer__meta\">{{ request.typeLabel }} \u00B7 {{ request.channelLabel }}</p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeReview()\">\u00D7</button>\n      </header>\n\n      <div class=\"drawer__body\">\n        <section class=\"request-detail\">\n          <div class=\"detail-person\">\n            <span class=\"detail-person__avatar\" aria-hidden=\"true\">\n              {{ request.studentName.charAt(0) }}\n            </span>\n            <div>\n              <strong>{{ request.studentName }}</strong>\n              <span>{{ request.studentNumber }} @if (request.classroomName) { \u00B7 {{ request.classroomName }} }</span>\n            </div>\n          </div>\n\n          <dl class=\"detail-grid\">\n            <div><dt>Demandeur</dt><dd>{{ request.guardianName }}</dd></div>\n            <div><dt>T\u00E9l\u00E9phone</dt><dd>{{ request.guardianPhone || 'Non renseign\u00E9' }}</dd></div>\n            <div><dt>Re\u00E7ue le</dt><dd>{{ request.submittedAt | date:'dd/MM/yyyy \u00E0 HH:mm' }}</dd></div>\n            <div><dt>\u00C9ch\u00E9ance</dt><dd [class.detail-grid__late]=\"request.overdue\">{{ dueLabel(request) }}</dd></div>\n          </dl>\n\n          @if (request.description) {\n            <div class=\"detail-description\">\n              <h3>Pr\u00E9cisions de la famille</h3>\n              <p>{{ request.description }}</p>\n            </div>\n          }\n        </section>\n\n        @if (canManage()) {\n          <form class=\"processing\" [formGroup]=\"reviewForm\" (ngSubmit)=\"saveReview()\">\n            <h3>Traitement</h3>\n            <div class=\"grid2\">\n              <label class=\"field\">\n                <span class=\"field__label\">Statut</span>\n                <select class=\"input\" formControlName=\"status\">\n                  @for (status of statuses; track status.code) {\n                    <option [value]=\"status.code\">{{ status.label }}</option>\n                  }\n                </select>\n              </label>\n              <label class=\"field\">\n                <span class=\"field__label\">Attribu\u00E9e \u00E0</span>\n                <input class=\"input\" formControlName=\"assignedTo\"\n                       placeholder=\"Nom de l'agent\">\n              </label>\n            </div>\n            <label class=\"field\">\n              <span class=\"field__label\">Note interne</span>\n              <textarea class=\"input\" rows=\"4\" formControlName=\"internalNote\"\n                        placeholder=\"Pi\u00E8ce manquante, appel effectu\u00E9, document pr\u00E9par\u00E9\u2026\"></textarea>\n              <span class=\"field__hint\">Cette note reste interne \u00E0 l'\u00E9tablissement.</span>\n            </label>\n          </form>\n        } @else if (request.internalNote) {\n          <div class=\"detail-description\">\n            <h3>Note de traitement</h3>\n            <p>{{ request.internalNote }}</p>\n          </div>\n        }\n      </div>\n\n      <footer class=\"drawer__foot\">\n        @if (request.status === 'READY') {\n          <a class=\"btn btn--secondary\" routerLink=\"/student-files\">Ouvrir les documents</a>\n        }\n        <button type=\"button\" class=\"btn btn--ghost\" (click)=\"closeReview()\">Fermer</button>\n        @if (canManage()) {\n          <button type=\"button\" class=\"btn btn--primary\" [disabled]=\"saving()\"\n                  (click)=\"saveReview()\">\n            {{ saving() ? 'Enregistrement\u2026' : 'Enregistrer le traitement' }}\n          </button>\n        }\n      </footer>\n    </aside>\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n.stats {\n  display: grid;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  gap: var(--space-3);\n  margin-bottom: var(--space-5);\n}\n\n.stat {\n  display: flex;\n  align-items: flex-start;\n  flex-direction: column;\n  padding: var(--space-4);\n  text-align: left;\n  color: var(--text-normal);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 3px solid var(--border-strong);\n  border-radius: var(--radius-card);\n  cursor: pointer;\n\n  &:hover { background: var(--surface-hover); }\n  &--selected { border-color: var(--brand); box-shadow: 0 0 0 2px var(--brand-tint); }\n  &--new { border-left-color: var(--brand); }\n  &--progress { border-left-color: var(--warning); }\n  &--ready { border-left-color: var(--success); }\n  &--overdue { border-left-color: var(--danger); }\n  &__label { font-size: var(--text-xs); color: var(--text-muted); }\n  &__value { margin: 2px 0; font-size: var(--text-2xl); color: var(--text-strong); }\n  &__note { font-size: var(--text-xs); color: var(--text-light); }\n}\n\n.warning-block {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--danger-bg);\n  border: 1px solid var(--danger);\n  border-radius: var(--radius-card);\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 24px;\n    height: 24px;\n    font-weight: 800;\n    color: var(--text-on-brand);\n    background: var(--danger);\n    border-radius: 50%;\n  }\n  strong { color: var(--text-strong); }\n  p { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.toolbar {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  flex-wrap: wrap;\n\n  &__select { width: auto; min-width: 190px; }\n}\n\n.search-field {\n  position: relative;\n  flex: 1 1 300px;\n\n  &__icon {\n    position: absolute;\n    top: 50%;\n    left: var(--space-3);\n    z-index: 1;\n    color: var(--text-light);\n    transform: translateY(-50%);\n  }\n  .input { padding-left: 36px; }\n}\n\n.queue {\n  &__head {\n    margin-bottom: var(--space-3);\n    h2 { margin: 0; font-size: var(--text-lg); color: var(--text-strong); }\n    p { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n  }\n}\n\n.request-list { display: flex; flex-direction: column; gap: var(--space-3); }\n\n.request-card {\n  position: relative;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto auto;\n  gap: var(--space-5);\n  overflow: hidden;\n  padding: var(--space-4) var(--space-5);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n\n  &--overdue { border-color: var(--danger); }\n\n  &__priority {\n    position: absolute;\n    inset: 0 auto 0 0;\n    width: 4px;\n    background: var(--border-strong);\n    &[data-tone='high'] { background: var(--warning); }\n    &[data-tone='urgent'] { background: var(--danger); }\n  }\n\n  &__eyebrow { display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap; }\n  &__reference { font-size: var(--text-xs); color: var(--text-light); }\n  h3 { margin: var(--space-2) 0 2px; font-size: var(--text-md); color: var(--text-strong); }\n  &__type { margin: 0; font-size: var(--text-xs); color: var(--brand); }\n\n  &__people {\n    display: flex;\n    gap: var(--space-2) var(--space-3);\n    margin-top: var(--space-3);\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    flex-wrap: wrap;\n    strong { color: var(--text-normal); }\n  }\n\n  &__timing, &__owner {\n    display: flex;\n    align-items: flex-end;\n    justify-content: center;\n    flex-direction: column;\n    min-width: 150px;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    small { color: var(--text-light); }\n  }\n\n  &__late { font-weight: 700; color: var(--danger); }\n  &__owner { gap: var(--space-2); }\n}\n\n.status, .priority {\n  display: inline-flex;\n  align-items: center;\n  min-height: 22px;\n  padding: 0 var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 700;\n  border-radius: var(--radius-badge);\n}\n\n.status {\n  &[data-tone='new'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='progress'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='waiting'] { color: var(--text-muted); background: var(--surface-sunken); }\n  &[data-tone='ready'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='done'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='rejected'] { color: var(--danger); background: var(--danger-bg); }\n}\n\n.priority {\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  &[data-tone='high'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='urgent'] { color: var(--danger); background: var(--danger-bg); }\n}\n\n.empty-state {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: var(--space-12) var(--space-5);\n  text-align: center;\n  background: var(--surface-card);\n  border: 1px dashed var(--border-strong);\n  border-radius: var(--radius-card);\n  &__icon {\n    display: grid; place-items: center; width: 48px; height: 48px;\n    font-size: var(--text-xl); color: var(--success); background: var(--success-bg);\n    border-radius: 50%;\n  }\n  h3 { margin: var(--space-3) 0 var(--space-2); color: var(--text-strong); }\n  p { margin: 0 0 var(--space-4); color: var(--text-muted); }\n}\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer {\n  position: fixed;\n  inset: 0 0 0 auto;\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n  width: min(500px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n  &--wide { width: min(620px, 100vw); }\n  &__head {\n    display: flex; align-items: flex-start; justify-content: space-between;\n    gap: var(--space-3); padding: var(--space-5); border-bottom: 1px solid var(--border-light);\n  }\n  &__title { margin: 0; font-size: var(--text-lg); color: var(--text-strong); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n  &__reference { display: block; margin-bottom: 3px; font-size: var(--text-xs); color: var(--brand); }\n  &__close { width: 32px; height: 32px; font-size: var(--text-lg); color: var(--text-muted); background: none; border: 0; cursor: pointer; }\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n  &__foot {\n    display: flex; align-items: center; justify-content: flex-end; gap: var(--space-3);\n    padding: var(--space-4) var(--space-5); border-top: 1px solid var(--border-light);\n    flex-wrap: wrap;\n  }\n}\n\n.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }\n\n.detail-person {\n  display: flex; align-items: center; gap: var(--space-3); padding-bottom: var(--space-4);\n  border-bottom: 1px solid var(--border-light);\n  &__avatar {\n    display: grid; place-items: center; width: 42px; height: 42px; font-weight: 800;\n    color: var(--text-on-brand); background: var(--brand); border-radius: 12px;\n  }\n  div { display: flex; flex-direction: column; }\n  strong { color: var(--text-strong); }\n  span { font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.detail-grid {\n  display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);\n  margin: var(--space-5) 0;\n  div { min-width: 0; }\n  dt { font-size: var(--text-xs); color: var(--text-light); }\n  dd { margin: 3px 0 0; color: var(--text-strong); }\n  &__late { font-weight: 700; color: var(--danger) !important; }\n}\n\n.detail-description {\n  padding: var(--space-4); margin-bottom: var(--space-5);\n  background: var(--surface-sunken); border-radius: var(--radius-input);\n  h3 { margin: 0 0 var(--space-2); font-size: var(--text-sm); color: var(--text-strong); }\n  p { margin: 0; line-height: var(--leading-relaxed); color: var(--text-muted); }\n}\n\n.processing {\n  padding-top: var(--space-5); border-top: 1px solid var(--border-light);\n  > h3 { margin: 0 0 var(--space-4); font-size: var(--text-md); color: var(--text-strong); }\n}\n\n@include tablet-down {\n  .stats { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n  .request-card { grid-template-columns: minmax(0, 1fr) auto; }\n  .request-card__timing { grid-column: 1; align-items: flex-start; }\n  .request-card__owner { grid-row: 1 / span 2; grid-column: 2; }\n}\n\n@include mobile {\n  .stats { grid-template-columns: 1fr 1fr; gap: var(--space-2); }\n  .stat { padding: var(--space-3); }\n  .toolbar { align-items: stretch; padding: var(--space-3); }\n  .toolbar__select { width: 100%; }\n  .request-card { grid-template-columns: 1fr; gap: var(--space-3); padding: var(--space-4); }\n  .request-card__timing, .request-card__owner { grid-column: 1; grid-row: auto; align-items: flex-start; }\n  .grid2, .detail-grid { grid-template-columns: 1fr; }\n  .drawer__foot { align-items: stretch; flex-direction: column; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RequestsComponent, { className: "RequestsComponent", filePath: "frontend/src/app/features/requests/requests.component.ts", lineNumber: 34 }); })();
//# sourceMappingURL=requests.component.js.map