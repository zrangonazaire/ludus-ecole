import { createUuid } from "../../core/utils/uuid";
import { ChangeDetectionStrategy, Component, DestroyRef, HostListener, ViewChild, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, ReplaySubject, catchError, debounceTime, expand, finalize, of, reduce, switchMap } from 'rxjs';
import { buildXlsx, saveBlob } from '@core/utils/spreadsheet-writer';
import { FINANCE_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { DataTableComponent } from '@shared/ui/data-table/data-table.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { ConfirmDialogComponent } from '@shared/ui/confirm-dialog/confirm-dialog.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { StatusLabelPipe } from '@shared/pipes/status-label.pipe';
import { NotificationService } from '@core/services/notification.service';
import { PERMISSIONS } from '@core/models/auth.models';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _c0 = ["amountTpl"];
const _c1 = ["methodTpl"];
const _c2 = ["statusTpl"];
const _c3 = ["actionsTpl"];
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.key;
const _forTrack2 = ($index, $item) => $item.value;
const _forTrack3 = ($index, $item) => $item.fee.id;
function PaymentListComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx.totalElements, " paiement(s)");
} }
function PaymentListComponent_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 19);
    i0.ɵɵlistener("click", function PaymentListComponent_button_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openCollection()); });
    i0.ɵɵelementStart(1, "span", 20);
    i0.ɵɵtext(2, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Encaisser un paiement ");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵtext(1, "Impossible de charger les paiements. ");
    i0.ɵɵelementStart(2, "button", 21);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_15_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.load()); });
    i0.ɵɵtext(3, "R\u00E9essayer");
    i0.ɵɵelementEnd()();
} }
function PaymentListComponent_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "money");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const payment_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, payment_r5.amount, payment_r5.currency));
} }
function PaymentListComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "statusLabel");
} if (rf & 2) {
    const payment_r6 = ctx.$implicit;
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, payment_r6.paymentMethod), " ");
} }
function PaymentListComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-status-badge", 23);
} if (rf & 2) {
    const payment_r7 = ctx.$implicit;
    i0.ɵɵproperty("status", payment_r7.status);
} }
function PaymentListComponent_ng_template_23_Conditional_3_button_0_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 28);
    i0.ɵɵlistener("click", function PaymentListComponent_ng_template_23_Conditional_3_button_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const payment_r9 = i0.ɵɵnextContext(2).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.askCancel(payment_r9)); });
    i0.ɵɵtext(1, "Annuler");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r2.cancelling());
} }
function PaymentListComponent_ng_template_23_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PaymentListComponent_ng_template_23_Conditional_3_button_0_Template, 2, 1, "button", 27);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("eduopsHasPermission", ctx_r2.cancelPermission);
} }
function PaymentListComponent_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 24)(1, "button", 25);
    i0.ɵɵlistener("click", function PaymentListComponent_ng_template_23_Template_button_click_1_listener() { const payment_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.showReceipt(payment_r9)); });
    i0.ɵɵtext(2, "Re\u00E7u");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, PaymentListComponent_ng_template_23_Conditional_3_Template, 1, 1, "button", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const payment_r9 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(payment_r9.status === "VALIDATED" ? 3 : -1);
} }
function PaymentListComponent_Conditional_25_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 32);
    i0.ɵɵtext(1, "Op\u00E9ration termin\u00E9e");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_Conditional_25_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 32);
    i0.ɵɵtext(1, "Nouvel encaissement");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_Conditional_25_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 34);
    i0.ɵɵtext(1, "S\u00E9lectionnez l'\u00E9l\u00E8ve, puis v\u00E9rifiez le montant avant validation.");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_Conditional_25_Conditional_11_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44)(1, "dt");
    i0.ɵɵtext(2, "Solde restant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dd", 46);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "money");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const result_r13 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, result_r13.outstandingAfterPayment, result_r13.currency));
} }
function PaymentListComponent_Conditional_25_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 37)(1, "div", 38);
    i0.ɵɵtext(2, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Le paiement est bien enregistr\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Le solde de l'\u00E9l\u00E8ve et ses \u00E9ch\u00E9ances ont \u00E9t\u00E9 mis \u00E0 jour.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "section", 39)(8, "div", 40)(9, "div")(10, "span");
    i0.ɵɵtext(11, "Re\u00E7u");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "strong", 41);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(14, "eduops-status-badge", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 42);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "dl", 43)(19, "div")(20, "dt");
    i0.ɵɵtext(21, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "dd");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div")(25, "dt");
    i0.ɵɵtext(26, "Matricule");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "dd", 41);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div")(30, "dt");
    i0.ɵɵtext(31, "Mode");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "dd");
    i0.ɵɵtext(33);
    i0.ɵɵpipe(34, "statusLabel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div")(36, "dt");
    i0.ɵɵtext(37, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "dd", 41);
    i0.ɵɵtext(39);
    i0.ɵɵpipe(40, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(41, PaymentListComponent_Conditional_25_Conditional_11_Conditional_41_Template, 6, 4, "div", 44);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(42, "footer", 45)(43, "button", 21);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_25_Conditional_11_Template_button_click_43_listener() { const result_r13 = i0.ɵɵrestoreView(_r12); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.showReceipt(result_r13)); });
    i0.ɵɵtext(44, "Voir le re\u00E7u");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "button", 21);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_25_Conditional_11_Template_button_click_45_listener() { i0.ɵɵrestoreView(_r12); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.collectAnother()); });
    i0.ɵɵtext(46, " Encaisser un autre paiement ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "button", 19);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_25_Conditional_11_Template_button_click_47_listener() { i0.ɵɵrestoreView(_r12); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.closeCollection()); });
    i0.ɵɵtext(48, "Terminer");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_7_0;
    const result_r13 = ctx;
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate((tmp_7_0 = result_r13.receiptNumber) !== null && tmp_7_0 !== undefined ? tmp_7_0 : result_r13.paymentReference);
    i0.ɵɵadvance();
    i0.ɵɵproperty("status", result_r13.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(17, 8, result_r13.amount, result_r13.currency));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(result_r13.studentName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(result_r13.studentNumber);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(34, 11, result_r13.paymentMethod));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(40, 13, result_r13.paymentDate, "dd/MM/yyyy"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(result_r13.outstandingAfterPayment !== undefined ? 41 : -1);
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_11_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵelement(1, "span", 61);
    i0.ɵɵtext(2, " Lecture de la situation financi\u00E8re\u2026 ");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_11_Conditional_10_Conditional_0_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 64)(1, "span", 20);
    i0.ɵɵtext(2, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Le compte de cet \u00E9l\u00E8ve est d\u00E9j\u00E0 sold\u00E9. ");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_11_Conditional_10_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 62)(1, "div")(2, "span");
    i0.ɵɵtext(3, "Solde restant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong", 46);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "money");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 63)(8, "span");
    i0.ɵɵtext(9, "D\u00E9j\u00E0 r\u00E9gl\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "strong", 46);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "money");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(13, PaymentListComponent_Conditional_25_Conditional_12_Conditional_11_Conditional_10_Conditional_0_Conditional_13_Template, 4, 0, "p", 64);
} if (rf & 2) {
    const summary_r16 = ctx;
    i0.ɵɵclassProp("balance-card--settled", summary_r16.outstandingAmount === 0);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 5, summary_r16.outstandingAmount, summary_r16.currency));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 8, summary_r16.totalPaid, summary_r16.currency));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(summary_r16.outstandingAmount === 0 ? 13 : -1);
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_11_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PaymentListComponent_Conditional_25_Conditional_12_Conditional_11_Conditional_10_Conditional_0_Template, 14, 11);
} if (rf & 2) {
    let tmp_9_0;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵconditional((tmp_9_0 = ctx_r2.financialSummary()) ? 0 : -1, tmp_9_0);
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 57);
    i0.ɵɵelement(1, "eduops-avatar", 58);
    i0.ɵɵelementStart(2, "div", 59)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 41);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 25);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_25_Conditional_12_Conditional_11_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.changeStudent()); });
    i0.ɵɵtext(8, " Changer ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(9, PaymentListComponent_Conditional_25_Conditional_12_Conditional_11_Conditional_9_Template, 3, 0, "div", 60)(10, PaymentListComponent_Conditional_25_Conditional_12_Conditional_11_Conditional_10_Template, 1, 1);
} if (rf & 2) {
    let tmp_11_0;
    const student_r17 = ctx;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", student_r17.fullName)("photoUrl", student_r17.photoUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(student_r17.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", student_r17.studentNumber, " \u00B7 ", (tmp_11_0 = student_r17.classroomName) !== null && tmp_11_0 !== undefined ? tmp_11_0 : "Sans classe", "");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r2.summaryLoading() ? 9 : 10);
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_12_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70);
    i0.ɵɵelement(1, "span", 61);
    i0.ɵɵtext(2, " Recherche\u2026 ");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_12_Conditional_8_For_1_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 72);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_25_Conditional_12_Conditional_12_Conditional_8_For_1_Template_button_click_0_listener() { const student_r20 = i0.ɵɵrestoreView(_r19).$implicit; const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.selectStudent(student_r20)); });
    i0.ɵɵelement(1, "eduops-avatar", 73);
    i0.ɵɵelementStart(2, "span", 74)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small", 41);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 75);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 76);
    i0.ɵɵtext(10, "\u203A");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_22_0;
    const student_r20 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", student_r20.fullName)("photoUrl", student_r20.photoUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(student_r20.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(student_r20.studentNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_22_0 = student_r20.classroomName) !== null && tmp_22_0 !== undefined ? tmp_22_0 : "Sans classe");
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_12_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, PaymentListComponent_Conditional_25_Conditional_12_Conditional_12_Conditional_8_For_1_Template, 11, 5, "button", 71, _forTrack0);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵrepeater(ctx_r2.studentResults());
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_12_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 70);
    i0.ɵɵtext(1, "Aucun \u00E9l\u00E8ve actif trouv\u00E9.");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 65)(1, "label", 66);
    i0.ɵɵtext(2, "Rechercher un \u00E9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 67);
    i0.ɵɵtext(4, "\u2315");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 68);
    i0.ɵɵlistener("input", function PaymentListComponent_Conditional_25_Conditional_12_Conditional_12_Template_input_input_5_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.onStudentSearch($event.target.value)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 69);
    i0.ɵɵtemplate(7, PaymentListComponent_Conditional_25_Conditional_12_Conditional_12_Conditional_7_Template, 3, 0, "div", 70)(8, PaymentListComponent_Conditional_25_Conditional_12_Conditional_12_Conditional_8_Template, 2, 0)(9, PaymentListComponent_Conditional_25_Conditional_12_Conditional_12_Conditional_9_Template, 2, 0, "p", 70);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r2.studentSearch());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.studentsLoading() ? 7 : ctx_r2.studentResults().length ? 8 : 9);
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 83);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "money");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r21 = ctx.$implicit;
    const summary_r22 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", group_r21.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", group_r21.name, " \u2014 ", i0.ɵɵpipeBind2(2, 3, group_r21.totalRemaining, summary_r22.currency), " restant");
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 84)(1, "span", 20);
    i0.ɵɵtext(2, "\u2139");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r2.rubriqueName(ctx_r2.rubriqueControl.value), " ");
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 91);
    i0.ɵɵtext(1, "Saisissez un montant sup\u00E9rieur \u00E0 z\u00E9ro.");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_35_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 111);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_35_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r24); const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.chooseAmount(ctx_r2.suggestedAmount())); });
    i0.ɵɵtext(1, " Prochaine \u00E9ch\u00E9ance ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "money");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const summary_r22 = i0.ɵɵnextContext(2);
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("quick-amount--active", ctx_r2.amountEntered() === ctx_r2.suggestedAmount());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 3, ctx_r2.suggestedAmount(), summary_r22.currency));
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 92);
    i0.ɵɵtemplate(1, PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_35_Conditional_1_Template, 5, 6, "button", 110);
    i0.ɵɵelementStart(2, "button", 111);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_35_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r23); const summary_r22 = i0.ɵɵnextContext(); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.chooseAmount(summary_r22.outstandingAmount)); });
    i0.ɵɵtext(3, " Tout solder ");
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "money");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const summary_r22 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.suggestedAmount() > 0 && ctx_r2.suggestedAmount() !== summary_r22.outstandingAmount ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("quick-amount--active", ctx_r2.amountEntered() === summary_r22.outstandingAmount);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 4, summary_r22.outstandingAmount, summary_r22.currency));
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_36_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "span")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "strong", 46);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "money");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const allocation_r25 = ctx.$implicit;
    const summary_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(allocation_r25.fee.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u00C9ch\u00E9ance du ", i0.ɵɵpipeBind2(6, 3, allocation_r25.fee.dueDate, "dd/MM/yyyy"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 6, allocation_r25.amount, summary_r22.currency));
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 93)(1, "div", 112)(2, "span");
    i0.ɵɵtext(3, "Affectation automatique");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong", 46);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "money");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "ul");
    i0.ɵɵrepeaterCreate(8, PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_36_For_9_Template, 10, 9, "li", null, _forTrack3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const summary_r22 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("Reste ", i0.ɵɵpipeBind2(6, 1, ctx_r2.remainingAfterPayment(), summary_r22.currency), "");
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.allocationPreview());
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 94)(1, "span", 20);
    i0.ɵɵtext(2, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "money");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const summary_r22 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(4, 1, ctx_r2.unallocatedAmount(), summary_r22.currency), " restera en avance non affect\u00E9e. ");
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_For_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label", 113);
    i0.ɵɵelement(1, "input", 114);
    i0.ɵɵelementStart(2, "span", 115);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span")(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "small");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 116);
    i0.ɵɵtext(10, "\u2713");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const method_r26 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("method-card--selected", ctx_r2.paymentForm.controls.paymentMethod.value === method_r26.value);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", method_r26.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(method_r26.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(method_r26.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(method_r26.hint);
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 91);
    i0.ɵɵtext(1, "Ajoutez la r\u00E9f\u00E9rence qui permettra de retrouver l'op\u00E9ration.");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 77)(1, "div", 50)(2, "span", 51);
    i0.ɵɵtext(3, "2");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "h3", 78);
    i0.ɵɵtext(6, "Quelle rubrique ?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8, "S\u00E9lectionnez la rubrique concern\u00E9e. Les \u00E9ch\u00E9ances seront affect\u00E9es automatiquement.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "label", 79)(10, "span", 80);
    i0.ɵɵtext(11, "Rubrique");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "select", 81)(13, "option", 82);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(15, PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_For_16_Template, 3, 6, "option", 83, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(17, PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_17_Template, 4, 1, "p", 84);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "section", 85)(19, "div", 50)(20, "span", 51);
    i0.ɵɵtext(21, "3");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div")(23, "h3", 86);
    i0.ɵɵtext(24, "Combien est encaiss\u00E9 ?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "p");
    i0.ɵɵtext(26, "Le montant sera affect\u00E9 aux \u00E9ch\u00E9ances dans l'ordre.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(27, "div", 87)(28, "label", 88);
    i0.ɵɵtext(29, "Montant re\u00E7u");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 89);
    i0.ɵɵelement(31, "input", 90);
    i0.ɵɵelementStart(32, "span");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(34, PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_34_Template, 2, 0, "span", 91);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(35, PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_35_Template, 7, 7, "div", 92)(36, PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_36_Template, 10, 4, "div", 93)(37, PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_37_Template, 5, 4, "p", 94);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "section", 95)(39, "div", 50)(40, "span", 51);
    i0.ɵɵtext(41, "4");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "div")(43, "h3", 96);
    i0.ɵɵtext(44, "Comment le paiement a-t-il \u00E9t\u00E9 re\u00E7u ?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "p");
    i0.ɵɵtext(46, "Choisissez le mode et ajoutez sa r\u00E9f\u00E9rence si n\u00E9cessaire.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(47, "div", 97);
    i0.ɵɵrepeaterCreate(48, PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_For_49_Template, 11, 6, "label", 98, _forTrack2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div", 99)(51, "div", 79)(52, "label", 100);
    i0.ɵɵtext(53, "Date d'encaissement");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(54, "input", 101);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "div", 79)(56, "label", 102);
    i0.ɵɵtext(57);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(58, "input", 103);
    i0.ɵɵtemplate(59, PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Conditional_59_Template, 2, 0, "span", 91);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(60, "details", 104)(61, "summary");
    i0.ɵɵtext(62, "Informations compl\u00E9mentaires ");
    i0.ɵɵelementStart(63, "span");
    i0.ɵɵtext(64, "facultatif");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "div", 105)(66, "div", 79)(67, "label", 106);
    i0.ɵɵtext(68, "Nom de la personne qui r\u00E8gle");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(69, "input", 107);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "div", 79)(71, "label", 108);
    i0.ɵɵtext(72, "Note interne");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(73, "textarea", 109);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const summary_r22 = ctx;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("formControl", ctx_r2.rubriqueControl);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Toutes les rubriques (", ctx_r2.feesByRubrique().length, ")");
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.feesByRubrique());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.rubriqueControl.value ? 17 : -1);
    i0.ɵɵadvance(14);
    i0.ɵɵclassProp("is-invalid", ctx_r2.paymentForm.controls.amount.touched && ctx_r2.paymentForm.controls.amount.invalid);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(summary_r22.currency);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.paymentForm.controls.amount.touched && ctx_r2.paymentForm.controls.amount.invalid ? 34 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(summary_r22.outstandingAmount > 0 ? 35 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.amountEntered() > 0 && ctx_r2.allocationPreview().length ? 36 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.unallocatedAmount() > 0 ? 37 : -1);
    i0.ɵɵadvance(11);
    i0.ɵɵrepeater(ctx_r2.paymentMethods);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("max", ctx_r2.today);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("field__label--required", ctx_r2.referenceRequired());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.referenceLabel());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("is-invalid", ctx_r2.paymentForm.controls.externalReference.touched && ctx_r2.referenceRequired() && !ctx_r2.paymentForm.controls.externalReference.value.trim());
    i0.ɵɵproperty("placeholder", ctx_r2.referenceRequired() ? "Obligatoire pour ce mode" : "Facultatif");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.paymentForm.controls.externalReference.touched && ctx_r2.referenceRequired() && !ctx_r2.paymentForm.controls.externalReference.value.trim() ? 59 : -1);
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54)(1, "span");
    i0.ɵɵtext(2, "Total \u00E0 encaisser");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 46);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "money");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, ctx_r2.amountEntered(), ctx.currency));
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 117);
    i0.ɵɵtext(1, " Encaissement\u2026 ");
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 20);
    i0.ɵɵtext(1, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2, " Valider l'encaissement ");
} }
function PaymentListComponent_Conditional_25_Conditional_12_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 56)(1, "span", 20);
    i0.ɵɵtext(2, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.blockers().join(" "), " ");
} }
function PaymentListComponent_Conditional_25_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 47);
    i0.ɵɵlistener("ngSubmit", function PaymentListComponent_Conditional_25_Conditional_12_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.submitPayment()); });
    i0.ɵɵelementStart(1, "div", 48)(2, "section", 49)(3, "div", 50)(4, "span", 51);
    i0.ɵɵtext(5, "1");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div")(7, "h3", 52);
    i0.ɵɵtext(8, "Quel \u00E9l\u00E8ve r\u00E8gle ?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10, "Recherchez par nom ou matricule.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(11, PaymentListComponent_Conditional_25_Conditional_12_Conditional_11_Template, 11, 6)(12, PaymentListComponent_Conditional_25_Conditional_12_Conditional_12_Template, 10, 2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, PaymentListComponent_Conditional_25_Conditional_12_Conditional_13_Template, 74, 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "footer", 53);
    i0.ɵɵtemplate(15, PaymentListComponent_Conditional_25_Conditional_12_Conditional_15_Template, 6, 4, "div", 54);
    i0.ɵɵelementStart(16, "button", 9);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_25_Conditional_12_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.closeCollection()); });
    i0.ɵɵtext(17, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 55);
    i0.ɵɵtemplate(19, PaymentListComponent_Conditional_25_Conditional_12_Conditional_19_Template, 2, 0)(20, PaymentListComponent_Conditional_25_Conditional_12_Conditional_20_Template, 3, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, PaymentListComponent_Conditional_25_Conditional_12_Conditional_21_Template, 4, 1, "p", 56);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroup", ctx_r2.paymentForm);
    i0.ɵɵadvance(11);
    i0.ɵɵconditional((tmp_7_0 = ctx_r2.selectedStudent()) ? 11 : 12, tmp_7_0);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_8_0 = ctx_r2.financialSummary()) ? 13 : -1, tmp_8_0);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_9_0 = ctx_r2.financialSummary()) ? 15 : -1, tmp_9_0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.saving());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.canSubmit())("title", ctx_r2.canSubmit() ? "Valider l\u2019encaissement" : ctx_r2.blockers().join(" "));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.saving() ? 19 : 20);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r2.canSubmit() && ctx_r2.blockers().length && ctx_r2.selectedStudent() && ctx_r2.financialSummary() ? 21 : -1);
} }
function PaymentListComponent_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 29);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_25_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeCollection()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 30)(2, "header", 31)(3, "div");
    i0.ɵɵtemplate(4, PaymentListComponent_Conditional_25_Conditional_4_Template, 2, 0, "span", 32)(5, PaymentListComponent_Conditional_25_Conditional_5_Template, 2, 0, "span", 32);
    i0.ɵɵelementStart(6, "h2", 33);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, PaymentListComponent_Conditional_25_Conditional_8_Template, 2, 0, "p", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 35);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_25_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r11); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeCollection()); });
    i0.ɵɵtext(10, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(11, PaymentListComponent_Conditional_25_Conditional_11_Template, 49, 16)(12, PaymentListComponent_Conditional_25_Conditional_12_Template, 22, 9, "form", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_9_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r2.paymentResult() ? 4 : 5);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.paymentResult() ? "Paiement encaiss\u00E9" : "Encaisser un paiement", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r2.paymentResult() ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.saving());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_9_0 = ctx_r2.paymentResult()) ? 11 : 12, tmp_9_0);
} }
function PaymentListComponent_Conditional_26_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 122);
    i0.ɵɵtext(1, "Chargement du re\u00E7u\u2026");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_Conditional_26_Conditional_10_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 94);
    i0.ɵɵtext(1, "ANNUL\u00C9 \u2014 Ce re\u00E7u ne justifie plus un r\u00E8glement.");
    i0.ɵɵelementEnd();
} }
function PaymentListComponent_Conditional_26_Conditional_10_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "dt");
    i0.ɵɵtext(2, "Payeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dd");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const payment_r28 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(payment_r28.payerName);
} }
function PaymentListComponent_Conditional_26_Conditional_10_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "dt");
    i0.ɵɵtext(2, "R\u00E9f\u00E9rence externe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dd");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const payment_r28 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(payment_r28.externalReference);
} }
function PaymentListComponent_Conditional_26_Conditional_10_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "dt");
    i0.ɵɵtext(2, "Montant affect\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dd");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "money");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div")(7, "dt");
    i0.ɵɵtext(8, "Avance non affect\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "dd");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "money");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const payment_r28 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 2, payment_r28.allocatedAmount, payment_r28.currency));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 5, payment_r28.unallocatedAmount, payment_r28.currency));
} }
function PaymentListComponent_Conditional_26_Conditional_10_Conditional_42_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "money");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const allocation_r29 = ctx.$implicit;
    const payment_r28 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(allocation_r29.feeLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 2, allocation_r29.amount, payment_r28.currency));
} }
function PaymentListComponent_Conditional_26_Conditional_10_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 93)(1, "h3");
    i0.ɵɵtext(2, "Affectations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul");
    i0.ɵɵrepeaterCreate(4, PaymentListComponent_Conditional_26_Conditional_10_Conditional_42_For_5_Template, 6, 5, "li", null, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const payment_r28 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(payment_r28.allocations);
} }
function PaymentListComponent_Conditional_26_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 123)(1, "div", 40)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "statusLabel");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, PaymentListComponent_Conditional_26_Conditional_10_Conditional_7_Template, 2, 0, "p", 94);
    i0.ɵɵelementStart(8, "div", 42);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "dl", 43)(12, "div")(13, "dt");
    i0.ɵɵtext(14, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "dd");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div")(18, "dt");
    i0.ɵɵtext(19, "Matricule");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "dd");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div")(23, "dt");
    i0.ɵɵtext(24, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "dd");
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div")(29, "dt");
    i0.ɵɵtext(30, "Mode");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "dd");
    i0.ɵɵtext(32);
    i0.ɵɵpipe(33, "statusLabel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div")(35, "dt");
    i0.ɵɵtext(36, "R\u00E9f\u00E9rence du paiement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "dd");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(39, PaymentListComponent_Conditional_26_Conditional_10_Conditional_39_Template, 5, 1, "div")(40, PaymentListComponent_Conditional_26_Conditional_10_Conditional_40_Template, 5, 1, "div")(41, PaymentListComponent_Conditional_26_Conditional_10_Conditional_41_Template, 12, 8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(42, PaymentListComponent_Conditional_26_Conditional_10_Conditional_42_Template, 6, 0, "section", 93);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_7_0;
    const payment_r28 = ctx;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate((tmp_7_0 = payment_r28.receiptNumber) !== null && tmp_7_0 !== undefined ? tmp_7_0 : payment_r28.paymentReference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 13, payment_r28.status));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(payment_r28.status === "CANCELLED" ? 7 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 15, payment_r28.amount, payment_r28.currency));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(payment_r28.studentName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(payment_r28.studentNumber);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(27, 18, payment_r28.paymentDate, "dd/MM/yyyy"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(33, 21, payment_r28.paymentMethod));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(payment_r28.paymentReference);
    i0.ɵɵadvance();
    i0.ɵɵconditional(payment_r28.payerName ? 39 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(payment_r28.externalReference ? 40 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(payment_r28.status === "VALIDATED" ? 41 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(payment_r28.allocations.length ? 42 : -1);
} }
function PaymentListComponent_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17)(1, "button", 118);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_26_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r27); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeReceipt()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "aside", 119)(3, "header", 31)(4, "h2", 120);
    i0.ɵɵtext(5, "Re\u00E7u de paiement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 121);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_26_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r27); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeReceipt()); });
    i0.ɵɵtext(7, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 48);
    i0.ɵɵtemplate(9, PaymentListComponent_Conditional_26_Conditional_9_Template, 2, 0, "p", 122)(10, PaymentListComponent_Conditional_26_Conditional_10_Template, 43, 23, "article", 123);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "footer", 53)(12, "button", 21);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_26_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r27); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeReceipt()); });
    i0.ɵɵtext(13, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 124);
    i0.ɵɵlistener("click", function PaymentListComponent_Conditional_26_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r27); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.printReceipt()); });
    i0.ɵɵtext(15, "Imprimer / PDF");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_6_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵconditional(ctx_r2.receiptLoading() ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_6_0 = ctx_r2.receipt()) ? 10 : -1, tmp_6_0);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r2.receipt());
} }
const EMPTY_STUDENT_PAGE = {
    content: [], page: 0, size: 8, totalElements: 0, totalPages: 1, first: true, last: true
};
/**
 * Payment register and guided collection workflow.
 *
 * A payment is submitted with a client-generated operation id. Retrying after
 * a network interruption is therefore safe: the backend returns the first
 * payment instead of creating a duplicate.
 */
export class PaymentListComponent {
    dataSource = inject(FINANCE_DATA_SOURCE);
    studentsDataSource = inject(STUDENT_DATA_SOURCE);
    notifications = inject(NotificationService);
    destroyRef = inject(DestroyRef);
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    page = signal(null);
    loading = signal(true);
    cancelTarget = signal(null);
    cancelling = signal(false);
    receipt = signal(null);
    receiptLoading = signal(false);
    exporting = signal(false);
    loadError = signal(false);
    summaryRequest;
    listRequest;
    receiptRequest;
    panelOpen = signal(false);
    studentSearch = signal('');
    studentResults = signal([]);
    studentsLoading = signal(false);
    selectedStudent = signal(null);
    financialSummary = signal(null);
    summaryLoading = signal(false);
    saving = signal(false);
    amountEntered = signal(0);
    paymentResult = signal(null);
    today = this.localToday();
    createPermission = PERMISSIONS.PAYMENT_CREATE;
    cancelPermission = PERMISSIONS.PAYMENT_CANCEL;
    paymentMethods = [
        { value: 'CASH', label: 'Espèces', hint: 'À la caisse', icon: '₣' },
        { value: 'MOBILE_MONEY', label: 'Mobile Money', hint: 'Orange, MTN, Wave…', icon: '⌁' },
        { value: 'BANK_TRANSFER', label: 'Virement', hint: 'Compte bancaire', icon: '⇄' },
        { value: 'CARD', label: 'Carte', hint: 'TPE ou en ligne', icon: '▣' },
        { value: 'CHEQUE', label: 'Chèque', hint: 'Numéro requis', icon: '▤' },
        { value: 'OTHER', label: 'Autre', hint: 'À préciser', icon: '⋯' }
    ];
    paymentForm = this.fb.nonNullable.group({
        amount: [0, [Validators.required, Validators.min(0.01)]],
        paymentMethod: ['CASH', [Validators.required]],
        paymentDate: [this.today, [Validators.required]],
        externalReference: ['', [Validators.maxLength(120)]],
        payerName: ['', [Validators.maxLength(200)]],
        notes: ['', [Validators.maxLength(1000)]],
        rubrique: ['']
    });
    rubriqueControl = this.paymentForm.controls.rubrique;
    /** Fees selected for explicit allocation, with the amount to apply to each. */
    selectedFees = signal([]);
    outstandingFees = computed(() => (this.financialSummary()?.fees ?? [])
        .filter((fee) => fee.amountRemaining > 0 && !['WAIVED', 'CANCELLED'].includes(fee.status))
        .sort((left, right) => left.dueDate.localeCompare(right.dueDate)));
    /**
     * Lignes dues regroupées par rubrique (type de frais) : chaque rubrique
     * affiche son montant total restant et ses échéances. La scolarité (TUITION)
     * n'est qu'une rubrique parmi les autres (cantine, transport…).
     */
    feesByRubrique = computed(() => {
        const groups = new Map();
        for (const fee of this.outstandingFees()) {
            const key = fee.feeTypeId ?? fee.feeTypeName;
            let group = groups.get(key);
            if (!group) {
                group = {
                    key,
                    name: fee.feeTypeName,
                    categoryLabel: fee.categoryLabel ?? fee.feeTypeName,
                    mandatory: fee.mandatory ?? true,
                    totalRemaining: 0,
                    fees: []
                };
                groups.set(key, group);
            }
            group.fees.push(fee);
            group.totalRemaining += fee.amountRemaining;
        }
        return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    });
    /** Libellé de rubrique d'une ligne : type de frais + catégorie. */
    rubriqueOf(fee) {
        const category = fee.categoryLabel ?? fee.category;
        if (category && category !== fee.feeTypeName)
            return `${fee.feeTypeName} · ${category}`;
        return fee.feeTypeName;
    }
    /** Nom d'une rubrique selon sa clé. */
    rubriqueName(key) {
        const group = this.feesByRubrique().find(g => g.key === key);
        return group?.name ?? key;
    }
    /** Filtre du combo rubrique : '' = toutes les rubriques. */
    rubriqueFilter = signal('');
    /** Groupes de rubriques visibles selon le combo. */
    visibleRubriques = computed(() => {
        const filter = this.rubriqueFilter();
        const groups = this.feesByRubrique();
        return filter ? groups.filter((g) => g.key === filter) : groups;
    });
    /** Choisir une rubrique dans le combo (filtre les échéances affichées). */
    selectRubrique(value) {
        this.rubriqueFilter.set(value ?? '');
    }
    suggestedAmount = computed(() => this.outstandingFees()[0]?.amountRemaining ?? 0);
    allocationPreview = computed(() => {
        let remaining = Math.max(0, this.amountEntered());
        const allocations = [];
        for (const fee of this.outstandingFees()) {
            if (remaining <= 0)
                break;
            const amount = Math.min(remaining, fee.amountRemaining);
            allocations.push({ fee, amount });
            remaining -= amount;
        }
        return allocations;
    });
    remainingAfterPayment = computed(() => Math.max(0, (this.financialSummary()?.outstandingAmount ?? 0) - this.amountEntered()));
    unallocatedAmount = computed(() => Math.max(0, this.amountEntered() - (this.financialSummary()?.outstandingAmount ?? 0)));
    studentQuery$ = new ReplaySubject(1);
    operationId = '';
    search = '';
    currentPage = 0;
    amountTpl;
    methodTpl;
    statusTpl;
    actionsTpl;
    columns = [];
    ngOnInit() {
        this.columns = [
            { key: 'paymentDate', label: 'Date', width: '10%' },
            { key: 'receiptNumber', label: 'Reçu', numeric: true, width: '16%' },
            { key: 'studentName', label: 'Élève', width: '20%' },
            { key: 'studentNumber', label: 'Matricule', numeric: true, width: '14%' },
            { key: 'amount', label: 'Montant', numeric: true, template: this.amountTpl, width: '14%' },
            { key: 'paymentMethod', label: 'Mode', template: this.methodTpl, width: '10%' },
            { key: 'status', label: 'Statut', template: this.statusTpl, width: '8%' },
            { key: 'actions', label: '', template: this.actionsTpl, width: '8%' }
        ];
        this.studentQuery$
            .pipe(debounceTime(220), switchMap((search) => {
            this.studentsLoading.set(true);
            return this.studentsDataSource.search({
                page: 0, size: 8, search: search || undefined, status: 'ACTIVE'
            }).pipe(catchError(() => of(EMPTY_STUDENT_PAGE)));
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((page) => {
            this.studentResults.set(page.content);
            this.studentsLoading.set(false);
        });
        this.paymentForm.controls.amount.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((amount) => this.amountEntered.set(Number(amount) || 0));
        this.load();
        const requestedStudentId = this.route.snapshot.queryParamMap.get('studentId');
        if (requestedStudentId) {
            this.openCollection();
            this.studentsDataSource.getById(requestedStudentId)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                next: (student) => this.selectStudent(student),
                error: () => this.closeCollection()
            });
        }
    }
    load() {
        this.listRequest?.unsubscribe();
        this.loading.set(true);
        this.loadError.set(false);
        this.listRequest = this.dataSource
            .searchPayments({ page: this.currentPage, size: 20, search: this.search || undefined })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (page) => {
                this.page.set(page);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.loadError.set(true);
            }
        });
    }
    onSearch(value) {
        this.search = value;
        this.currentPage = 0;
        this.load();
    }
    onPageChange(page) {
        this.currentPage = page;
        this.load();
    }
    openCollection() {
        this.panelOpen.set(true);
        this.resetCollection();
        this.studentQuery$.next('');
        setTimeout(() => document.getElementById('collection-student-search')?.focus());
    }
    closeCollection() {
        if (this.saving())
            return;
        this.panelOpen.set(false);
    }
    onStudentSearch(value) {
        this.studentSearch.set(value);
        this.studentQuery$.next(value.trim());
    }
    selectStudent(student) {
        this.summaryRequest?.unsubscribe();
        this.selectedStudent.set(student);
        this.studentSearch.set(student.fullName);
        this.studentResults.set([]);
        this.financialSummary.set(null);
        this.summaryLoading.set(true);
        this.rubriqueFilter.set('');
        this.paymentForm.controls.payerName.setValue('');
        this.summaryRequest = this.dataSource.getStudentSummary(student.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (summary) => {
                this.financialSummary.set(summary);
                this.summaryLoading.set(false);
                const suggestion = summary.fees
                    ?.filter((fee) => fee.amountRemaining > 0)
                    .sort((left, right) => left.dueDate.localeCompare(right.dueDate))[0]
                    ?.amountRemaining ?? summary.outstandingAmount;
                this.chooseAmount(suggestion);
                setTimeout(() => document.getElementById('payment-amount')?.focus());
            },
            error: () => this.summaryLoading.set(false)
        });
    }
    changeStudent() {
        this.summaryRequest?.unsubscribe();
        this.summaryLoading.set(false);
        this.selectedStudent.set(null);
        this.financialSummary.set(null);
        this.studentSearch.set('');
        this.chooseAmount(0);
        this.studentQuery$.next('');
        setTimeout(() => document.getElementById('collection-student-search')?.focus());
    }
    chooseAmount(amount) {
        this.paymentForm.controls.amount.setValue(amount);
        this.paymentForm.controls.amount.markAsDirty();
    }
    referenceRequired() {
        return this.paymentForm.controls.paymentMethod.value !== 'CASH';
    }
    referenceLabel() {
        const labels = {
            MOBILE_MONEY: 'Référence de transaction',
            BANK_TRANSFER: 'Référence du virement',
            CARD: 'Référence de transaction',
            CHEQUE: 'Numéro du chèque',
            OTHER: 'Référence ou précision'
        };
        return labels[this.paymentForm.controls.paymentMethod.value] ?? 'Référence externe';
    }
    /** Human-readable reasons why the submit button is still disabled. */
    blockers() {
        if (this.paymentResult())
            return [];
        const reasons = [];
        if (!this.selectedStudent()) {
            reasons.push('Sélectionnez un élève.');
            return reasons;
        }
        if (this.summaryLoading()) {
            reasons.push('Chargement de la situation financière…');
            return reasons;
        }
        if (!this.financialSummary()) {
            reasons.push('Situation financière introuvable. Re-sélectionnez l’élève.');
            return reasons;
        }
        const rawAmount = Number(this.paymentForm.controls.amount.value) || 0;
        if (rawAmount <= 0)
            reasons.push('Saisissez un montant supérieur à zéro.');
        const dateValue = this.paymentForm.controls.paymentDate.value || '';
        if (!dateValue)
            reasons.push('Renseignez la date d’encaissement.');
        else if (dateValue > this.localToday())
            reasons.push('La date d’encaissement ne peut pas être dans le futur.');
        if (this.referenceRequired()
            && this.paymentForm.controls.externalReference.value.trim().length === 0) {
            reasons.push(`Ajoutez la référence : ${this.referenceLabel()}.`);
        }
        if (reasons.length === 0 && this.paymentForm.invalid) {
            reasons.push('Vérifiez les champs : une valeur dépasse la longueur autorisée.');
        }
        return reasons;
    }
    canSubmit() {
        const rawAmount = Number(this.paymentForm.controls.amount.value) || 0;
        const dateValue = this.paymentForm.controls.paymentDate.value || '';
        const referencePresent = this.paymentForm.controls.externalReference.value.trim().length > 0;
        if (!this.selectedStudent() || !this.financialSummary() || this.summaryLoading())
            return false;
        if (this.saving() || this.paymentResult())
            return false;
        if (!this.paymentForm.valid)
            return false;
        if (rawAmount <= 0)
            return false;
        if (!dateValue || dateValue > this.localToday())
            return false;
        if (this.referenceRequired() && !referencePresent)
            return false;
        return true;
    }
    submitPayment() {
        const student = this.selectedStudent();
        const summary = this.financialSummary();
        if (!student || !summary || !this.canSubmit()) {
            this.paymentForm.markAllAsTouched();
            return;
        }
        const value = this.paymentForm.getRawValue();
        const selected = this.selectedFees();
        // Build explicit allocations from selected fees. If nothing is selected,
        // fall back to automatic allocation (empty array) — the backend
        // distributes the amount over the oldest open fees.
        const allocations = selected.length > 0
            ? selected.map((f) => ({ studentFeeId: f.id, amount: f.allocatedAmount || f.amountRemaining }))
            : [];
        const payload = {
            studentId: student.id,
            academicYearId: summary.academicYearId,
            amount: value.amount,
            paymentMethod: value.paymentMethod,
            paymentDate: value.paymentDate,
            externalReference: this.optional(value.externalReference),
            payerName: this.optional(value.payerName),
            notes: this.optional(value.notes),
            operationId: this.operationId,
            allocations
        };
        this.saving.set(true);
        this.dataSource.recordPayment(payload)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (payment) => {
                this.saving.set(false);
                this.paymentResult.set(payment);
                this.notifications.success(`Le reçu ${payment.receiptNumber ?? payment.paymentReference} est prêt.`, 'Paiement encaissé');
                this.load();
            },
            error: () => this.saving.set(false)
        });
    }
    collectAnother() {
        this.resetCollection();
        this.studentQuery$.next('');
        setTimeout(() => document.getElementById('collection-student-search')?.focus());
    }
    askCancel(payment) {
        this.cancelTarget.set(payment);
    }
    cancelMessage() {
        const payment = this.cancelTarget();
        if (!payment)
            return '';
        return `Le paiement ${payment.paymentReference} de ${payment.studentName} sera annulé. `
            + `Les affectations seront contre-passées et le reçu marqué annulé. `
            + `Aucune donnée n'est supprimée.`;
    }
    confirmCancel(reason) {
        const payment = this.cancelTarget();
        if (!payment || this.cancelling() || !reason.trim())
            return;
        this.cancelTarget.set(null);
        this.cancelling.set(true);
        this.dataSource.cancelPayment(payment.id, reason.trim())
            .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.cancelling.set(false)))
            .subscribe({
            next: (cancelled) => {
                if (this.receipt()?.id === cancelled.id)
                    this.receipt.set(cancelled);
                this.notifications.success(`Le paiement ${cancelled.paymentReference} a été annulé.`);
                this.load();
            },
            error: () => this.notifications.error("Le paiement n'a pas pu être annulé. Réessayez.")
        });
    }
    showReceipt(payment) {
        this.receiptRequest?.unsubscribe();
        this.receipt.set(null);
        this.receiptLoading.set(true);
        this.receiptRequest = this.dataSource.getPayment(payment.id)
            .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.receiptLoading.set(false)))
            .subscribe({
            next: (result) => this.receipt.set(result),
            error: () => this.notifications.error('Impossible de charger le reçu.')
        });
    }
    closeReceipt() {
        this.receiptRequest?.unsubscribe();
        this.receipt.set(null);
        this.receiptLoading.set(false);
    }
    printReceipt() {
        const content = document.getElementById('payment-receipt');
        if (!content || !this.receipt())
            return;
        const preview = window.open('', '_blank', 'width=800,height=900');
        if (!preview) {
            this.notifications.error("Autorisez l'ouverture de la fenêtre pour imprimer le reçu.");
            return;
        }
        preview.opener = null;
        preview.document.title = this.receipt().receiptNumber ?? 'Reçu de paiement';
        const style = preview.document.createElement('style');
        style.textContent = `body { font: 15px Arial, sans-serif; color: #172338; padding: 32px; }
      .receipt-card__head { display: flex; justify-content: space-between; border-bottom: 2px solid; padding-bottom: 16px; }
      .receipt-card__amount { font-size: 32px; margin: 24px 0; }
      dl { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
      dt { color: #555; } dd { margin: 6px 0 0; overflow-wrap: anywhere; }
      li { display: flex; justify-content: space-between; padding: 10px 0; }
      ul { padding: 0; } @page { margin: 16mm; }`;
        preview.document.head.appendChild(style);
        preview.document.body.appendChild(content.cloneNode(true));
        preview.focus();
        preview.setTimeout(() => preview.print(), 150);
    }
    exportPayments() {
        if (this.exporting())
            return;
        const search = this.search || undefined;
        this.exporting.set(true);
        this.dataSource.searchPayments({ page: 0, size: 100, search })
            .pipe(expand((page) => page.last || page.content.length === 0 ? EMPTY
            : this.dataSource.searchPayments({ page: page.page + 1, size: 100, search })), reduce((payments, page) => payments.concat(page.content), []), takeUntilDestroyed(this.destroyRef), finalize(() => this.exporting.set(false))).subscribe({
            next: (payments) => {
                const labels = new StatusLabelPipe();
                saveBlob(buildXlsx({
                    sheetName: 'Paiements',
                    columns: ['Date', 'Référence', 'Reçu', 'Élève', 'Matricule', 'Montant', 'Devise', 'Mode', 'Statut']
                        .map((header, index) => ({ header, width: index === 3 ? 32 : 22, kind: index === 5 ? 'number' : 'text' })),
                    rows: payments.map((payment) => [payment.paymentDate, payment.paymentReference,
                        payment.receiptNumber, payment.studentName, payment.studentNumber, payment.amount,
                        payment.currency, labels.transform(payment.paymentMethod), labels.transform(payment.status)])
                }), `paiements-${this.localToday()}.xlsx`);
                this.notifications.success(`${payments.length} paiement(s) exporté(s).`);
            },
            error: () => this.notifications.error("L'export a échoué. Réessayez.")
        });
    }
    onEscape() {
        if (this.receipt() || this.receiptLoading()) {
            this.closeReceipt();
            return;
        }
        if (this.panelOpen())
            this.closeCollection();
    }
    resetCollection() {
        this.summaryRequest?.unsubscribe();
        this.selectedStudent.set(null);
        this.financialSummary.set(null);
        this.studentResults.set([]);
        this.studentSearch.set('');
        this.summaryLoading.set(false);
        this.paymentResult.set(null);
        this.operationId = createUuid();
        this.paymentForm.reset({
            amount: 0,
            paymentMethod: 'CASH',
            paymentDate: this.today,
            externalReference: '',
            payerName: '',
            notes: ''
        });
        this.amountEntered.set(0);
        this.selectedFees.set([]);
    }
    /** Toggle a fee in the explicit allocation selection. */
    toggleFee(fee) {
        const current = this.selectedFees();
        const existing = current.find((f) => f.id === fee.id);
        if (existing) {
            this.selectedFees.set(current.filter((f) => f.id !== fee.id));
        }
        else {
            this.selectedFees.set([
                ...current,
                {
                    id: fee.id,
                    label: fee.label,
                    dueDate: fee.dueDate,
                    amountRemaining: fee.amountRemaining,
                    allocatedAmount: 0,
                },
            ]);
        }
    }
    /** Update the allocated amount for a selected fee. Amount is distributed, not per-fee editable. */
    updateAllocation(feeId, amount) {
        this.selectedFees.update((fees) => fees.map((f) => (f.id === feeId ? { ...f, allocatedAmount: amount } : f)));
    }
    /** Total montant alloué aux frais sélectionnés. */
    selectedAllocationTotal = computed(() => this.selectedFees().reduce((sum, f) => sum + f.allocatedAmount, 0));
    /** Frais non encore affectés dans la sélection. */
    unallocatedSelectedFees = computed(() => this.selectedFees().filter((f) => f.allocatedAmount === 0));
    /** Vérifier si un frais est sélectionné. */
    isFeeSelected(feeId) {
        return this.selectedFees().some((f) => f.id === feeId);
    }
    /** Montant alloué pour un frais donné. */
    getAllocatedAmount(feeId) {
        return this.selectedFees().find((f) => f.id === feeId)?.allocatedAmount ?? 0;
    }
    /** Gérer la saisie du montant alloué pour un frais. */
    onAllocationInput(feeId, rawValue, currency) {
        const parsed = this.parseMoney(rawValue, currency);
        if (parsed === null)
            return;
        this.updateAllocation(feeId, Math.max(0, parsed));
    }
    /** Allouer le montant restant complet à un frais. */
    fillAllocation(feeId, maxAmount) {
        this.updateAllocation(feeId, maxAmount);
    }
    /** Sélectionner ou désélectionner tous les frais disponibles. */
    selectAllFees() {
        const outstanding = this.outstandingFees();
        if (this.selectedFees().length === outstanding.length) {
            this.selectedFees.set([]);
        }
        else {
            this.selectedFees.set(outstanding.map((fee) => ({
                id: fee.id,
                label: fee.label,
                dueDate: fee.dueDate,
                amountRemaining: fee.amountRemaining,
                allocatedAmount: 0,
            })));
        }
    }
    /** Analyser une valeur monétaire saisie par l'utilisateur. */
    parseMoney(value, currency) {
        const cleaned = value.replace(/[^\d.,]/g, '').trim();
        if (cleaned === '')
            return null;
        const normalized = cleaned.replace(',', '.');
        const num = Number(normalized);
        return Number.isFinite(num) ? num : null;
    }
    optional(value) {
        const clean = value.trim();
        return clean || undefined;
    }
    localToday() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    static ɵfac = function PaymentListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PaymentListComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PaymentListComponent, selectors: [["eduops-payment-list"]], viewQuery: function PaymentListComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
            i0.ɵɵviewQuery(_c1, 7);
            i0.ɵɵviewQuery(_c2, 7);
            i0.ɵɵviewQuery(_c3, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.amountTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.methodTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.statusTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.actionsTpl = _t.first);
        } }, hostBindings: function PaymentListComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown.escape", function PaymentListComponent_keydown_escape_HostBindingHandler() { return ctx.onEscape(); }, false, i0.ɵɵresolveDocument);
        } }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 28, vars: 14, consts: [["amountTpl", ""], ["methodTpl", ""], ["statusTpl", ""], ["actionsTpl", ""], [1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], ["type", "button", "class", "btn btn--primary", 3, "click", 4, "eduopsHasPermission"], [1, "card"], [1, "card__header"], ["for", "payment-search", 1, "visually-hidden"], ["id", "payment-search", "type", "search", "placeholder", "\u00C9l\u00E8ve, matricule, r\u00E9f\u00E9rence ou num\u00E9ro de re\u00E7u", 1, "input", "register-search", 3, "input"], ["role", "alert"], ["caption", "Registre des paiements", 3, "pageChange", "columns", "page", "loading"], [1, "receipt-overlay"], ["title", "Annuler ce paiement", "confirmLabel", "Annuler le paiement", "reasonLabel", "Motif de l'annulation", 3, "confirm", "cancel", "open", "message", "danger", "requireReason"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], [1, "money", "amount-cell"], [3, "status"], [1, "row"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "disabled"], ["type", "button", "class", "btn btn--ghost btn--sm", 3, "disabled", "click", 4, "eduopsHasPermission"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], ["type", "button", "aria-label", "Fermer le formulaire", 1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "collection-title", 1, "drawer", "drawer--wide"], [1, "drawer__head"], [1, "drawer__eyebrow"], ["id", "collection-title", 1, "drawer__title"], [1, "drawer__meta"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click", "disabled"], [1, "drawer__form", 3, "formGroup"], ["aria-live", "polite", 1, "drawer__body", "success-view"], ["aria-hidden", "true", 1, "success-view__icon"], ["aria-label", "R\u00E9capitulatif du re\u00E7u", 1, "receipt-card"], [1, "receipt-card__head"], [1, "numeric"], [1, "receipt-card__amount", "money"], [1, "receipt-card__details"], [1, "receipt-card__balance"], [1, "drawer__foot", "drawer__foot--success"], [1, "money"], [1, "drawer__form", 3, "ngSubmit", "formGroup"], [1, "drawer__body"], ["aria-labelledby", "student-section-title", 1, "form-section"], [1, "section-heading"], [1, "section-heading__step"], ["id", "student-section-title"], [1, "drawer__foot"], [1, "footer-total"], ["type", "submit", 1, "btn", "btn--primary", "btn--collect", 3, "disabled", "title"], ["role", "status", 1, "inline-message", "inline-message--warning"], [1, "selected-student"], ["size", "md", 3, "name", "photoUrl"], [1, "selected-student__identity"], ["role", "status", 1, "summary-loading"], ["aria-hidden", "true", 1, "spinner", "spinner--sm"], [1, "balance-card"], [1, "balance-card__secondary"], [1, "inline-message", "inline-message--success"], [1, "student-picker"], ["for", "collection-student-search", 1, "visually-hidden"], ["aria-hidden", "true", 1, "student-picker__icon"], ["id", "collection-student-search", "type", "search", "autocomplete", "off", "placeholder", "Nom, pr\u00E9nom ou matricule", 1, "input", "student-picker__input", 3, "input", "value"], ["aria-live", "polite", 1, "student-results"], [1, "student-results__state"], ["type", "button", 1, "student-result"], ["type", "button", 1, "student-result", 3, "click"], ["size", "sm", 3, "name", "photoUrl"], [1, "student-result__identity"], [1, "student-result__class"], ["aria-hidden", "true", 1, "student-result__arrow"], ["aria-labelledby", "rubrique-section-title", 1, "form-section", "form-section--spaced"], ["id", "rubrique-section-title"], [1, "field"], [1, "field__label"], ["aria-label", "Rubrique", 1, "input", 3, "formControl"], ["value", ""], [3, "value"], [1, "inline-message", "inline-message--info"], ["aria-labelledby", "amount-section-title", 1, "form-section", "form-section--spaced"], ["id", "amount-section-title"], [1, "field", "amount-field"], ["for", "payment-amount", 1, "field__label", "field__label--required"], [1, "amount-input"], ["id", "payment-amount", "type", "number", "inputmode", "decimal", "min", "0.01", "step", "0.01", "formControlName", "amount", 1, "input"], [1, "field__error"], ["aria-label", "Montants sugg\u00E9r\u00E9s", 1, "quick-amounts"], [1, "allocation-card"], [1, "inline-message", "inline-message--warning"], ["aria-labelledby", "method-section-title", 1, "form-section", "form-section--spaced"], ["id", "method-section-title"], [1, "method-grid"], [1, "method-card", 3, "method-card--selected"], [1, "grid2", "payment-details"], ["for", "payment-date", 1, "field__label", "field__label--required"], ["id", "payment-date", "type", "date", "formControlName", "paymentDate", 1, "input", 3, "max"], ["for", "payment-reference", 1, "field__label"], ["id", "payment-reference", "type", "text", "formControlName", "externalReference", "maxlength", "120", 1, "input", 3, "placeholder"], [1, "optional-details"], [1, "optional-details__content"], ["for", "payment-payer", 1, "field__label"], ["id", "payment-payer", "type", "text", "maxlength", "200", "formControlName", "payerName", "placeholder", "Ex. Mariam Traor\u00E9", 1, "input"], ["for", "payment-notes", 1, "field__label"], ["id", "payment-notes", "rows", "2", "maxlength", "1000", "formControlName", "notes", "placeholder", "Une pr\u00E9cision utile pour la caisse", 1, "textarea"], ["type", "button", 1, "quick-amount", 3, "quick-amount--active"], ["type", "button", 1, "quick-amount", 3, "click"], [1, "allocation-card__head"], [1, "method-card"], ["type", "radio", "formControlName", "paymentMethod", 3, "value"], ["aria-hidden", "true", 1, "method-card__icon"], ["aria-hidden", "true", 1, "method-card__check"], ["aria-hidden", "true", 1, "spinner", "spinner--button"], ["type", "button", "aria-label", "Fermer le re\u00E7u", 1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "receipt-title", 1, "drawer", "drawer--wide"], ["id", "receipt-title"], ["type", "button", "aria-label", "Fermer le re\u00E7u", 1, "drawer__close", 3, "click"], ["role", "status"], ["id", "payment-receipt", 1, "receipt-card"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"]], template: function PaymentListComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 4)(1, "header", 5)(2, "div")(3, "h1", 6);
            i0.ɵɵtext(4, "Encaissements");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, PaymentListComponent_Conditional_5_Template, 2, 1, "p", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 8)(7, "button", 9);
            i0.ɵɵlistener("click", function PaymentListComponent_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.exportPayments()); });
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, PaymentListComponent_button_9_Template, 4, 0, "button", 10);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "section", 11)(11, "div", 12)(12, "label", 13);
            i0.ɵɵtext(13, "Rechercher un paiement");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "input", 14);
            i0.ɵɵlistener("input", function PaymentListComponent_Template_input_input_14_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSearch($event.target.value)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(15, PaymentListComponent_Conditional_15_Template, 4, 0, "p", 15);
            i0.ɵɵelementStart(16, "eduops-data-table", 16);
            i0.ɵɵlistener("pageChange", function PaymentListComponent_Template_eduops_data_table_pageChange_16_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onPageChange($event)); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(17, PaymentListComponent_ng_template_17_Template, 3, 4, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(19, PaymentListComponent_ng_template_19_Template, 2, 3, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor)(21, PaymentListComponent_ng_template_21_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor)(23, PaymentListComponent_ng_template_23_Template, 4, 1, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor)(25, PaymentListComponent_Conditional_25_Template, 13, 5)(26, PaymentListComponent_Conditional_26_Template, 16, 3, "div", 17);
            i0.ɵɵelementStart(27, "eduops-confirm-dialog", 18);
            i0.ɵɵlistener("confirm", function PaymentListComponent_Template_eduops_confirm_dialog_confirm_27_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.confirmCancel($event)); })("cancel", function PaymentListComponent_Template_eduops_confirm_dialog_cancel_27_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelTarget.set(null)); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_4_0;
            i0.ɵɵadvance(5);
            i0.ɵɵconditional((tmp_4_0 = ctx.page()) ? 5 : -1, tmp_4_0);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.exporting());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.exporting() ? "Export en cours\u2026" : "Exporter", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("eduopsHasPermission", ctx.createPermission);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.loadError() ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("columns", ctx.columns)("page", ctx.page())("loading", ctx.loading());
            i0.ɵɵadvance(9);
            i0.ɵɵconditional(ctx.panelOpen() ? 25 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.receipt() || ctx.receiptLoading() ? 26 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("open", ctx.cancelTarget() !== null)("message", ctx.cancelMessage())("danger", true)("requireReason", true);
        } }, dependencies: [CommonModule, i1.DatePipe, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.RadioControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MaxLengthValidator, i2.MinValidator, i2.FormControlDirective, i2.FormGroupDirective, i2.FormControlName, DataTableComponent, StatusBadgeComponent,
            ConfirmDialogComponent, AvatarComponent, HasPermissionDirective, MoneyPipe,
            StatusLabelPipe], styles: ["@import 'styles/tokens';\n\n.register-search[_ngcontent-%COMP%] { max-width: 380px; }\n.amount-cell[_ngcontent-%COMP%] { font-weight: 700; }\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  padding: 0;\n  background: rgb(15 23 42 / 38%);\n  border: 0;\n  cursor: default;\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0 0 0 auto;\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &--wide { width: min(680px, 100vw); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-4);\n    padding: var(--space-5) var(--space-6);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__eyebrow {\n    display: block;\n    margin-bottom: 2px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    letter-spacing: .06em;\n    text-transform: uppercase;\n    color: var(--brand);\n  }\n\n  &__title { margin: 0; font-size: var(--text-xl); color: var(--text-strong); }\n  &__meta { margin: 4px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__close {\n    flex: none;\n    width: 34px;\n    height: 34px;\n    padding: 0;\n    font-size: 24px;\n    line-height: 1;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border: 0;\n    border-radius: 50%;\n    cursor: pointer;\n  }\n\n  &__form { min-height: 0; flex: 1; display: flex; flex-direction: column; }\n  &__body { min-height: 0; flex: 1; overflow-y: auto; padding: var(--space-6); }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-6);\n    background: var(--surface-card);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n.form-section--spaced[_ngcontent-%COMP%] {\n  padding-top: var(--space-6);\n  margin-top: var(--space-6);\n  border-top: 1px solid var(--border-light);\n}\n\n.section-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n\n  &__step {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 28px;\n    height: 28px;\n    font-size: var(--text-sm);\n    font-weight: 800;\n    color: var(--brand);\n    background: var(--brand-tint);\n    border-radius: 50%;\n  }\n\n  h3 { margin: 1px 0 0; font-size: var(--text-md); color: var(--text-strong); }\n  p { margin: 3px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.student-picker[_ngcontent-%COMP%] {\n  position: relative;\n\n  &__icon {\n    position: absolute;\n    top: 50%;\n    left: 13px;\n    z-index: 1;\n    transform: translateY(-50%);\n    font-size: 20px;\n    color: var(--text-muted);\n    pointer-events: none;\n  }\n\n  &__input { height: 44px; padding-left: 42px; }\n}\n\n.student-results[_ngcontent-%COMP%] {\n  max-height: 286px;\n  margin-top: var(--space-2);\n  overflow-y: auto;\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n\n  &__state {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: var(--space-2);\n    min-height: 76px;\n    margin: 0;\n    color: var(--text-muted);\n  }\n}\n\n.student-result[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto auto;\n  align-items: center;\n  gap: var(--space-3);\n  width: 100%;\n  padding: var(--space-3);\n  text-align: left;\n  color: var(--text-normal);\n  background: var(--surface-card);\n  border: 0;\n  border-bottom: 1px solid var(--border-light);\n  cursor: pointer;\n\n  &:last-child { border-bottom: 0; }\n  &:hover, &:focus-visible { background: var(--surface-hover); outline: none; }\n\n  &__identity {\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n    strong { overflow: hidden; text-overflow: ellipsis; color: var(--text-strong); }\n    small { margin-top: 2px; color: var(--text-muted); }\n  }\n\n  &__class { font-size: var(--text-xs); color: var(--text-muted); }\n  &__arrow { font-size: 22px; color: var(--text-light); }\n}\n\n.selected-student[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n\n  &__identity {\n    display: flex;\n    flex: 1;\n    flex-direction: column;\n    min-width: 0;\n    strong { overflow: hidden; text-overflow: ellipsis; color: var(--text-strong); }\n    span { margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n  }\n}\n\n.summary-loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  min-height: 76px;\n  color: var(--text-muted);\n}\n\n.balance-card[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-4);\n  padding: var(--space-4);\n  margin-top: var(--space-3);\n  color: var(--text-on-brand);\n  background: var(--brand);\n  border-radius: var(--radius-card);\n\n  div { display: flex; flex-direction: column; gap: 3px; }\n  span { font-size: var(--text-xs); opacity: .78; }\n  strong { font-size: var(--text-lg); }\n  &__secondary { padding-left: var(--space-4); border-left: 1px solid rgb(255 255 255 / 26%); }\n\n  &--settled { background: var(--success); }\n}\n\n.amount-field[_ngcontent-%COMP%] { max-width: 360px; }\n.amount-input[_ngcontent-%COMP%] {\n  position: relative;\n  .input { height: 48px; padding-right: 64px; font-size: var(--text-xl); font-weight: 750; }\n  > span {\n    position: absolute;\n    top: 50%;\n    right: var(--space-3);\n    transform: translateY(-50%);\n    font-size: var(--text-sm);\n    font-weight: 700;\n    color: var(--text-muted);\n  }\n}\n\n.quick-amounts[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); margin: 0 0 var(--space-4); flex-wrap: wrap; }\n.quick-amount[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 2px;\n  padding: var(--space-2) var(--space-3);\n  font-size: var(--text-xs);\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: var(--radius-input);\n  cursor: pointer;\n  strong { color: var(--text-strong); }\n\n  &--active { color: var(--brand); background: var(--brand-tint); border-color: var(--brand); }\n  &--active strong { color: var(--brand); }\n}\n\n.allocation-card[_ngcontent-%COMP%] {\n  overflow: hidden;\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n\n  &__head {\n    display: flex;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-3) var(--space-4);\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    strong { color: var(--text-normal); }\n  }\n\n  ul { margin: 0; padding: 0; list-style: none; }\n  li {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-3) var(--space-4);\n    border-top: 1px solid var(--border-light);\n    > span { display: flex; flex-direction: column; min-width: 0; }\n    > span strong { overflow: hidden; text-overflow: ellipsis; color: var(--text-strong); }\n    small { margin-top: 2px; color: var(--text-muted); }\n    > strong { flex: none; color: var(--success); }\n  }\n}\n\n.inline-message[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-2);\n  padding: var(--space-3);\n  margin: var(--space-3) 0 0;\n  font-size: var(--text-sm);\n  border-radius: var(--radius-input);\n\n  > span { font-weight: 800; }\n  &--success { color: var(--success); background: var(--success-bg); }\n  &--warning { color: var(--warning); background: var(--warning-bg); }\n}\n\n.fee-selection__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  margin-bottom: var(--space-2);\n}\n\n.fee-selection__summary[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--text-muted); }\n\n.fee-rubrique-filter[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 420px;\n  margin: var(--space-3) 0 var(--space-1);\n}\n\n.fee-group__title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: var(--space-2);\n  margin: var(--space-4) 0 var(--space-2);\n  font-size: var(--text-sm);\n  font-weight: 700;\n  color: var(--text-strong);\n\n  small { font-weight: 400; color: var(--text-muted); }\n}\n\n.fee-group__total[_ngcontent-%COMP%] { margin-left: auto; font-size: var(--text-sm); }\n\n.fee-list[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.fee-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  border: 1px solid var(--border-light);\n  border-radius: var(--radius-input);\n\n  & + & { margin-top: var(--space-2); }\n\n  &--selected { background: var(--brand-tint); border-color: var(--brand); }\n}\n\n.fee-item__info[_ngcontent-%COMP%] { display: flex; flex: 1; flex-direction: column; min-width: 0; }\n.fee-item__label[_ngcontent-%COMP%] { font-weight: 650; color: var(--text-strong); }\n.fee-item__meta[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--text-muted); }\n\n.method-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--space-2);\n}\n\n.method-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  min-height: 68px;\n  padding: var(--space-3);\n  color: var(--text-normal);\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: var(--radius-input);\n  cursor: pointer;\n  transition: border-color var(--transition-fast), background var(--transition-fast);\n\n  input { position: absolute; opacity: 0; pointer-events: none; }\n  &:focus-within { box-shadow: 0 0 0 3px var(--brand-tint); }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 30px;\n    height: 30px;\n    font-size: var(--text-md);\n    font-weight: 800;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border-radius: 9px;\n  }\n\n  > span:nth-of-type(2) { display: flex; flex-direction: column; min-width: 0; }\n  strong { font-size: var(--text-sm); color: var(--text-strong); }\n  small { margin-top: 1px; overflow: hidden; font-size: 10px; text-overflow: ellipsis; white-space: nowrap; color: var(--text-muted); }\n\n  &__check { position: absolute; top: 6px; right: 8px; color: transparent; }\n  &--selected { background: var(--brand-tint); border-color: var(--brand); }\n  &--selected &__icon { color: var(--brand); background: var(--surface-card); }\n  &--selected &__check { color: var(--brand); }\n}\n\n.payment-details[_ngcontent-%COMP%] { margin-top: var(--space-4); }\n.grid2[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }\n\n.optional-details[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--border-light);\n  summary {\n    padding: var(--space-3) 0;\n    font-size: var(--text-sm);\n    font-weight: 650;\n    color: var(--text-normal);\n    cursor: pointer;\n    span { margin-left: var(--space-1); font-size: var(--text-xs); font-weight: 400; color: var(--text-light); }\n  }\n  &__content { padding-top: var(--space-2); }\n}\n\n.footer-total[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  min-width: 130px;\n  span { font-size: var(--text-xs); color: var(--text-muted); }\n  strong { margin-top: 1px; font-size: var(--text-lg); color: var(--text-strong); }\n}\n\n.btn--collect[_ngcontent-%COMP%] { min-width: 190px; }\n.spinner--sm[_ngcontent-%COMP%] { width: 18px; height: 18px; border-width: 2px; }\n.spinner--button[_ngcontent-%COMP%] { width: 16px; height: 16px; border-width: 2px; border-color: rgb(255 255 255 / 38%); border-top-color: #fff; }\n\n.success-view[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  text-align: center;\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    width: 58px;\n    height: 58px;\n    margin: var(--space-6) 0 var(--space-4);\n    font-size: 28px;\n    font-weight: 800;\n    color: var(--success);\n    background: var(--success-bg);\n    border-radius: 50%;\n  }\n\n  h3 { margin: 0; font-size: var(--text-xl); color: var(--text-strong); }\n  > p { margin: var(--space-2) 0 var(--space-6); color: var(--text-muted); }\n}\n\n.receipt-card[_ngcontent-%COMP%] {\n  width: min(440px, 100%);\n  overflow: hidden;\n  text-align: left;\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-sm);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4);\n    background: var(--surface-sunken);\n    > div { display: flex; flex-direction: column; }\n    span { font-size: var(--text-xs); color: var(--text-muted); }\n    strong { margin-top: 2px; color: var(--text-strong); }\n  }\n\n  &__amount {\n    padding: var(--space-6) var(--space-4);\n    text-align: center;\n    font-size: var(--text-2xl);\n    font-weight: 800;\n    color: var(--brand);\n    border-bottom: 1px dashed var(--border-strong);\n  }\n\n  &__details {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: var(--space-4);\n    margin: 0;\n    padding: var(--space-4);\n    div { min-width: 0; }\n    dt { font-size: var(--text-xs); color: var(--text-muted); }\n    dd { margin: 3px 0 0; overflow: hidden; text-overflow: ellipsis; color: var(--text-strong); }\n  }\n\n  &__balance {\n    grid-column: 1 / -1;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding-top: var(--space-3);\n    border-top: 1px solid var(--border-light);\n    dd { font-weight: 700; color: var(--success); }\n  }\n}\n\n.receipt-overlay[_ngcontent-%COMP%] { position: fixed; inset: 0; z-index: var(--z-modal); }\n\n@include mobile {\n  .register-search { max-width: none; }\n  .drawer, .drawer--wide { width: 100vw; }\n  .drawer__head, .drawer__body { padding: var(--space-4); }\n  .drawer__foot { align-items: stretch; flex-direction: column; padding: var(--space-3) var(--space-4); }\n  .drawer__foot--success { flex-direction: column-reverse; }\n  .footer-total { align-items: center; padding-bottom: var(--space-1); }\n  .method-grid { grid-template-columns: 1fr 1fr; }\n  .grid2 { grid-template-columns: 1fr; gap: 0; }\n  .student-result { grid-template-columns: auto minmax(0, 1fr) auto; }\n  .student-result__class { display: none; }\n  .balance-card { grid-template-columns: 1fr; }\n  .balance-card__secondary { padding: var(--space-3) 0 0; border-top: 1px solid rgb(255 255 255 / 26%); border-left: 0; }\n  .btn--collect { width: 100%; }\n  .receipt-card__details { grid-template-columns: 1fr; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaymentListComponent, [{
        type: Component,
        args: [{ selector: 'eduops-payment-list', standalone: true, imports: [
                    CommonModule, ReactiveFormsModule, DataTableComponent, StatusBadgeComponent,
                    ConfirmDialogComponent, AvatarComponent, HasPermissionDirective, MoneyPipe,
                    StatusLabelPipe
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n\n  <header class=\"page__header\">\n\n    <div>\n\n      <h1 class=\"page__title\">Encaissements</h1>\n\n      @if (page(); as result) {\n\n        <p class=\"page__meta numeric\">{{ result.totalElements }} paiement(s)</p>\n\n      }\n\n    </div>\n\n    <div class=\"page__actions\">\n\n      <button type=\"button\" class=\"btn btn--secondary\" [disabled]=\"exporting()\" (click)=\"exportPayments()\">\n\n        {{ exporting() ? 'Export en cours\u2026' : 'Exporter' }}\n\n      </button>\n\n      <button type=\"button\" class=\"btn btn--primary\"\n\n              *eduopsHasPermission=\"createPermission\" (click)=\"openCollection()\">\n\n        <span aria-hidden=\"true\">+</span> Encaisser un paiement\n\n      </button>\n\n    </div>\n\n  </header>\n\n  <section class=\"card\">\n\n    <div class=\"card__header\">\n\n      <label class=\"visually-hidden\" for=\"payment-search\">Rechercher un paiement</label>\n\n      <input id=\"payment-search\" class=\"input register-search\" type=\"search\"\n\n             placeholder=\"\u00C9l\u00E8ve, matricule, r\u00E9f\u00E9rence ou num\u00E9ro de re\u00E7u\"\n\n             (input)=\"onSearch($any($event.target).value)\" />\n\n    </div>\n\n    @if (loadError()) {\n\n      <p role=\"alert\">Impossible de charger les paiements.\n\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"load()\">R\u00E9essayer</button>\n\n      </p>\n\n    }\n\n    <eduops-data-table\n\n      [columns]=\"columns\" [page]=\"page()\" [loading]=\"loading()\"\n\n      caption=\"Registre des paiements\"\n\n      (pageChange)=\"onPageChange($event)\" />\n\n  </section>\n\n</div>\n\n<ng-template #amountTpl let-payment>\n\n  <span class=\"money amount-cell\">{{ payment.amount | money:payment.currency }}</span>\n\n</ng-template>\n\n<ng-template #methodTpl let-payment>\n\n  {{ payment.paymentMethod | statusLabel }}\n\n</ng-template>\n\n<ng-template #statusTpl let-payment>\n\n  <eduops-status-badge [status]=\"payment.status\" />\n\n</ng-template>\n\n<ng-template #actionsTpl let-payment>\n\n  <div class=\"row\">\n\n    <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"showReceipt(payment)\">Re\u00E7u</button>\n\n    @if (payment.status === 'VALIDATED') {\n\n      <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n\n              *eduopsHasPermission=\"cancelPermission\"\n\n              [disabled]=\"cancelling()\"\n\n              (click)=\"askCancel(payment)\">Annuler</button>\n\n    }\n\n  </div>\n\n</ng-template>\n\n@if (panelOpen()) {\n\n  <button type=\"button\" class=\"drawer-backdrop\" aria-label=\"Fermer le formulaire\"\n\n          (click)=\"closeCollection()\"></button>\n\n  <aside class=\"drawer drawer--wide\" role=\"dialog\" aria-modal=\"true\"\n\n         aria-labelledby=\"collection-title\">\n\n    <header class=\"drawer__head\">\n\n      <div>\n\n        @if (paymentResult()) {\n\n          <span class=\"drawer__eyebrow\">Op\u00E9ration termin\u00E9e</span>\n\n        } @else {\n\n          <span class=\"drawer__eyebrow\">Nouvel encaissement</span>\n\n        }\n\n        <h2 class=\"drawer__title\" id=\"collection-title\">\n\n          {{ paymentResult() ? 'Paiement encaiss\u00E9' : 'Encaisser un paiement' }}\n\n        </h2>\n\n        @if (!paymentResult()) {\n\n          <p class=\"drawer__meta\">S\u00E9lectionnez l'\u00E9l\u00E8ve, puis v\u00E9rifiez le montant avant validation.</p>\n\n        }\n\n      </div>\n\n      <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n\n              [disabled]=\"saving()\" (click)=\"closeCollection()\">\u00D7</button>\n\n    </header>\n\n    @if (paymentResult(); as result) {\n\n      <div class=\"drawer__body success-view\" aria-live=\"polite\">\n\n        <div class=\"success-view__icon\" aria-hidden=\"true\">\u2713</div>\n\n        <h3>Le paiement est bien enregistr\u00E9</h3>\n\n        <p>Le solde de l'\u00E9l\u00E8ve et ses \u00E9ch\u00E9ances ont \u00E9t\u00E9 mis \u00E0 jour.</p>\n\n        <section class=\"receipt-card\" aria-label=\"R\u00E9capitulatif du re\u00E7u\">\n\n          <div class=\"receipt-card__head\">\n\n            <div>\n\n              <span>Re\u00E7u</span>\n\n              <strong class=\"numeric\">{{ result.receiptNumber ?? result.paymentReference }}</strong>\n\n            </div>\n\n            <eduops-status-badge [status]=\"result.status\" />\n\n          </div>\n\n          <div class=\"receipt-card__amount money\">{{ result.amount | money:result.currency }}</div>\n\n          <dl class=\"receipt-card__details\">\n\n            <div><dt>\u00C9l\u00E8ve</dt><dd>{{ result.studentName }}</dd></div>\n\n            <div><dt>Matricule</dt><dd class=\"numeric\">{{ result.studentNumber }}</dd></div>\n\n            <div><dt>Mode</dt><dd>{{ result.paymentMethod | statusLabel }}</dd></div>\n\n            <div><dt>Date</dt><dd class=\"numeric\">{{ result.paymentDate | date:'dd/MM/yyyy' }}</dd></div>\n\n            @if (result.outstandingAfterPayment !== undefined) {\n\n              <div class=\"receipt-card__balance\">\n\n                <dt>Solde restant</dt>\n\n                <dd class=\"money\">{{ result.outstandingAfterPayment | money:result.currency }}</dd>\n\n              </div>\n\n            }\n\n          </dl>\n\n        </section>\n\n      </div>\n\n      <footer class=\"drawer__foot drawer__foot--success\">\n\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"showReceipt(result)\">Voir le re\u00E7u</button>\n\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"collectAnother()\">\n\n          Encaisser un autre paiement\n\n        </button>\n\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"closeCollection()\">Terminer</button>\n\n      </footer>\n\n    } @else {\n\n      <form class=\"drawer__form\" [formGroup]=\"paymentForm\" (ngSubmit)=\"submitPayment()\">\n\n        <div class=\"drawer__body\">\n\n          <section class=\"form-section\" aria-labelledby=\"student-section-title\">\n\n            <div class=\"section-heading\">\n\n              <span class=\"section-heading__step\">1</span>\n\n              <div>\n\n                <h3 id=\"student-section-title\">Quel \u00E9l\u00E8ve r\u00E8gle ?</h3>\n\n                <p>Recherchez par nom ou matricule.</p>\n\n              </div>\n\n            </div>\n\n            @if (selectedStudent(); as student) {\n\n              <div class=\"selected-student\">\n\n                <eduops-avatar [name]=\"student.fullName\" [photoUrl]=\"student.photoUrl\" size=\"md\" />\n\n                <div class=\"selected-student__identity\">\n\n                  <strong>{{ student.fullName }}</strong>\n\n                  <span class=\"numeric\">{{ student.studentNumber }} \u00B7 {{ student.classroomName ?? 'Sans classe' }}</span>\n\n                </div>\n\n                <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"changeStudent()\">\n\n                  Changer\n\n                </button>\n\n              </div>\n\n              @if (summaryLoading()) {\n\n                <div class=\"summary-loading\" role=\"status\">\n\n                  <span class=\"spinner spinner--sm\" aria-hidden=\"true\"></span>\n\n                  Lecture de la situation financi\u00E8re\u2026\n\n                </div>\n\n              } @else {\n\n                @if (financialSummary(); as summary) {\n\n                  <div class=\"balance-card\" [class.balance-card--settled]=\"summary.outstandingAmount === 0\">\n\n                    <div>\n\n                      <span>Solde restant</span>\n\n                      <strong class=\"money\">{{ summary.outstandingAmount | money:summary.currency }}</strong>\n\n                    </div>\n\n                    <div class=\"balance-card__secondary\">\n\n                      <span>D\u00E9j\u00E0 r\u00E9gl\u00E9</span>\n\n                      <strong class=\"money\">{{ summary.totalPaid | money:summary.currency }}</strong>\n\n                    </div>\n\n                  </div>\n\n                  @if (summary.outstandingAmount === 0) {\n\n                    <p class=\"inline-message inline-message--success\">\n\n                      <span aria-hidden=\"true\">\u2713</span> Le compte de cet \u00E9l\u00E8ve est d\u00E9j\u00E0 sold\u00E9.\n\n                    </p>\n\n                  }\n\n                }\n\n              }\n\n            } @else {\n\n              <div class=\"student-picker\">\n\n                <label class=\"visually-hidden\" for=\"collection-student-search\">Rechercher un \u00E9l\u00E8ve</label>\n\n                <span class=\"student-picker__icon\" aria-hidden=\"true\">\u2315</span>\n\n                <input id=\"collection-student-search\" class=\"input student-picker__input\"\n\n                       type=\"search\" autocomplete=\"off\"\n\n                       placeholder=\"Nom, pr\u00E9nom ou matricule\"\n\n                       [value]=\"studentSearch()\"\n\n                       (input)=\"onStudentSearch($any($event.target).value)\" />\n\n              </div>\n\n              <div class=\"student-results\" aria-live=\"polite\">\n\n                @if (studentsLoading()) {\n\n                  <div class=\"student-results__state\">\n\n                    <span class=\"spinner spinner--sm\" aria-hidden=\"true\"></span> Recherche\u2026\n\n                  </div>\n\n                } @else if (studentResults().length) {\n\n                  @for (student of studentResults(); track student.id) {\n\n                    <button type=\"button\" class=\"student-result\" (click)=\"selectStudent(student)\">\n\n                      <eduops-avatar [name]=\"student.fullName\" [photoUrl]=\"student.photoUrl\" size=\"sm\" />\n\n                      <span class=\"student-result__identity\">\n\n                        <strong>{{ student.fullName }}</strong>\n\n                        <small class=\"numeric\">{{ student.studentNumber }}</small>\n\n                      </span>\n\n                      <span class=\"student-result__class\">{{ student.classroomName ?? 'Sans classe' }}</span>\n\n                      <span class=\"student-result__arrow\" aria-hidden=\"true\">\u203A</span>\n\n                    </button>\n\n                  }\n\n                } @else {\n\n                  <p class=\"student-results__state\">Aucun \u00E9l\u00E8ve actif trouv\u00E9.</p>\n\n                }\n\n              </div>\n\n            }\n\n          </section>\n\n          @if (financialSummary(); as summary) {\n\n             <section class=\"form-section form-section--spaced\" aria-labelledby=\"rubrique-section-title\">\n\n               <div class=\"section-heading\">\n\n                 <span class=\"section-heading__step\">2</span>\n\n                 <div>\n\n                   <h3 id=\"rubrique-section-title\">Quelle rubrique ?</h3>\n\n                   <p>S\u00E9lectionnez la rubrique concern\u00E9e. Les \u00E9ch\u00E9ances seront affect\u00E9es automatiquement.</p>\n\n                 </div>\n\n               </div>\n\n               <label class=\"field\">\n\n                 <span class=\"field__label\">Rubrique</span>\n\n                 <select class=\"input\" [formControl]=\"rubriqueControl\" aria-label=\"Rubrique\">\n\n                   <option value=\"\">Toutes les rubriques ({{ feesByRubrique().length }})</option>\n\n                   @for (group of feesByRubrique(); track group.key) {\n\n                     <option [value]=\"group.key\">{{ group.name }} \u2014 {{ group.totalRemaining | money:summary.currency }} restant</option>\n\n                   }\n\n                 </select>\n\n               </label>\n\n               @if (rubriqueControl.value) {\n\n                 <p class=\"inline-message inline-message--info\">\n\n                   <span aria-hidden=\"true\">\u2139</span>{{ rubriqueName(rubriqueControl.value) }}\n\n                 </p>\n\n               }\n\n             </section>\n\n            <section class=\"form-section form-section--spaced\" aria-labelledby=\"amount-section-title\">\n\n              <div class=\"section-heading\">\n\n                <span class=\"section-heading__step\">3</span>\n\n                <div>\n\n                  <h3 id=\"amount-section-title\">Combien est encaiss\u00E9 ?</h3>\n\n                  <p>Le montant sera affect\u00E9 aux \u00E9ch\u00E9ances dans l'ordre.</p>\n\n                </div>\n\n              </div>\n\n              <div class=\"field amount-field\">\n\n                <label class=\"field__label field__label--required\" for=\"payment-amount\">Montant re\u00E7u</label>\n\n                <div class=\"amount-input\">\n\n                  <input id=\"payment-amount\" class=\"input\" type=\"number\" inputmode=\"decimal\"\n\n                         min=\"0.01\" step=\"0.01\" formControlName=\"amount\"\n\n                         [class.is-invalid]=\"paymentForm.controls.amount.touched && paymentForm.controls.amount.invalid\" />\n\n                  <span>{{ summary.currency }}</span>\n\n                </div>\n\n                @if (paymentForm.controls.amount.touched && paymentForm.controls.amount.invalid) {\n\n                  <span class=\"field__error\">Saisissez un montant sup\u00E9rieur \u00E0 z\u00E9ro.</span>\n\n                }\n\n              </div>\n\n              @if (summary.outstandingAmount > 0) {\n\n                <div class=\"quick-amounts\" aria-label=\"Montants sugg\u00E9r\u00E9s\">\n\n                  @if (suggestedAmount() > 0 && suggestedAmount() !== summary.outstandingAmount) {\n\n                    <button type=\"button\" class=\"quick-amount\"\n\n                            [class.quick-amount--active]=\"amountEntered() === suggestedAmount()\"\n\n                            (click)=\"chooseAmount(suggestedAmount())\">\n\n                      Prochaine \u00E9ch\u00E9ance\n\n                      <strong>{{ suggestedAmount() | money:summary.currency }}</strong>\n\n                    </button>\n\n                  }\n\n                  <button type=\"button\" class=\"quick-amount\"\n\n                          [class.quick-amount--active]=\"amountEntered() === summary.outstandingAmount\"\n\n                          (click)=\"chooseAmount(summary.outstandingAmount)\">\n\n                    Tout solder\n\n                    <strong>{{ summary.outstandingAmount | money:summary.currency }}</strong>\n\n                  </button>\n\n                </div>\n\n              }\n\n              @if (amountEntered() > 0 && allocationPreview().length) {\n\n                <div class=\"allocation-card\">\n\n                  <div class=\"allocation-card__head\">\n\n                    <span>Affectation automatique</span>\n\n                    <strong class=\"money\">Reste {{ remainingAfterPayment() | money:summary.currency }}</strong>\n\n                  </div>\n\n                  <ul>\n\n                    @for (allocation of allocationPreview(); track allocation.fee.id) {\n\n                      <li>\n\n                        <span>\n\n                          <strong>{{ allocation.fee.label }}</strong>\n\n                          <small>\u00C9ch\u00E9ance du {{ allocation.fee.dueDate | date:'dd/MM/yyyy' }}</small>\n\n                        </span>\n\n                        <strong class=\"money\">{{ allocation.amount | money:summary.currency }}</strong>\n\n                      </li>\n\n                    }\n\n                  </ul>\n\n                </div>\n\n              }\n\n              @if (unallocatedAmount() > 0) {\n\n                <p class=\"inline-message inline-message--warning\">\n\n                  <span aria-hidden=\"true\">!</span>\n\n                  {{ unallocatedAmount() | money:summary.currency }} restera en avance non affect\u00E9e.\n\n                </p>\n\n              }\n\n            </section>\n\n            <section class=\"form-section form-section--spaced\" aria-labelledby=\"method-section-title\">\n\n              <div class=\"section-heading\">\n\n                <span class=\"section-heading__step\">4</span>\n\n                <div>\n\n                  <h3 id=\"method-section-title\">Comment le paiement a-t-il \u00E9t\u00E9 re\u00E7u ?</h3>\n\n                  <p>Choisissez le mode et ajoutez sa r\u00E9f\u00E9rence si n\u00E9cessaire.</p>\n\n                </div>\n\n              </div>\n\n              <div class=\"method-grid\">\n\n                @for (method of paymentMethods; track method.value) {\n\n                  <label class=\"method-card\"\n\n                         [class.method-card--selected]=\"paymentForm.controls.paymentMethod.value === method.value\">\n\n<input type=\"radio\" formControlName=\"paymentMethod\" [value]=\"method.value\" />\n\n                    <span class=\"method-card__icon\" aria-hidden=\"true\">{{ method.icon }}</span>\n\n                    <span><strong>{{ method.label }}</strong><small>{{ method.hint }}</small></span>\n\n                    <span class=\"method-card__check\" aria-hidden=\"true\">\u2713</span>\n\n                  </label>\n\n                }\n\n              </div>\n\n              <div class=\"grid2 payment-details\">\n\n                <div class=\"field\">\n\n                  <label class=\"field__label field__label--required\" for=\"payment-date\">Date d'encaissement</label>\n\n                  <input id=\"payment-date\" class=\"input\" type=\"date\" [max]=\"today\"\n\n                         formControlName=\"paymentDate\" />\n\n                </div>\n\n                <div class=\"field\">\n\n                  <label class=\"field__label\" [class.field__label--required]=\"referenceRequired()\"\n\n                         for=\"payment-reference\">{{ referenceLabel() }}</label>\n\n                  <input id=\"payment-reference\" class=\"input\" type=\"text\"\n\n                         formControlName=\"externalReference\" maxlength=\"120\"\n\n                         [class.is-invalid]=\"paymentForm.controls.externalReference.touched && referenceRequired() && !paymentForm.controls.externalReference.value.trim()\"\n\n                         [placeholder]=\"referenceRequired() ? 'Obligatoire pour ce mode' : 'Facultatif'\" />\n\n                  @if (paymentForm.controls.externalReference.touched && referenceRequired()\n\n                    && !paymentForm.controls.externalReference.value.trim()) {\n\n                    <span class=\"field__error\">Ajoutez la r\u00E9f\u00E9rence qui permettra de retrouver l'op\u00E9ration.</span>\n\n                  }\n\n                </div>\n\n              </div>\n\n              <details class=\"optional-details\">\n\n                <summary>Informations compl\u00E9mentaires <span>facultatif</span></summary>\n\n                <div class=\"optional-details__content\">\n\n                  <div class=\"field\">\n\n                    <label class=\"field__label\" for=\"payment-payer\">Nom de la personne qui r\u00E8gle</label>\n\n                    <input id=\"payment-payer\" class=\"input\" type=\"text\" maxlength=\"200\"\n\n                           formControlName=\"payerName\" placeholder=\"Ex. Mariam Traor\u00E9\" />\n\n                  </div>\n\n                  <div class=\"field\">\n\n                    <label class=\"field__label\" for=\"payment-notes\">Note interne</label>\n\n                    <textarea id=\"payment-notes\" class=\"textarea\" rows=\"2\" maxlength=\"1000\"\n\n                              formControlName=\"notes\"\n\n                              placeholder=\"Une pr\u00E9cision utile pour la caisse\"></textarea>\n\n                  </div>\n\n                </div>\n\n              </details>\n\n            </section>\n\n          }\n\n        </div>\n\n        <footer class=\"drawer__foot\">\n\n          @if (financialSummary(); as summary) {\n\n            <div class=\"footer-total\">\n\n              <span>Total \u00E0 encaisser</span>\n\n              <strong class=\"money\">{{ amountEntered() | money:summary.currency }}</strong>\n\n            </div>\n\n          }\n\n          <button type=\"button\" class=\"btn btn--secondary\" [disabled]=\"saving()\"\n\n                  (click)=\"closeCollection()\">Annuler</button>\n\n          <button type=\"submit\" class=\"btn btn--primary btn--collect\" [disabled]=\"!canSubmit()\"\n                  [title]=\"canSubmit() ? 'Valider l\u2019encaissement' : blockers().join(' ')\">\n\n            @if (saving()) {\n\n              <span class=\"spinner spinner--button\" aria-hidden=\"true\"></span> Encaissement\u2026\n\n            } @else {\n\n              <span aria-hidden=\"true\">\u2713</span> Valider l'encaissement\n\n            }\n\n          </button>\n\n          @if (!canSubmit() && blockers().length && selectedStudent() && financialSummary()) {\n\n            <p class=\"inline-message inline-message--warning\" role=\"status\">\n\n              <span aria-hidden=\"true\">!</span> {{ blockers().join(' ') }}\n\n            </p>\n\n          }\n\n        </footer>\n\n      </form>\n\n    }\n\n  </aside>\n\n}\n\n@if (receipt() || receiptLoading()) {\n\n  <div class=\"receipt-overlay\">\n\n    <button type=\"button\" class=\"drawer-backdrop\" aria-label=\"Fermer le re\u00E7u\" (click)=\"closeReceipt()\"></button>\n\n    <aside class=\"drawer drawer--wide\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"receipt-title\">\n\n      <header class=\"drawer__head\">\n\n        <h2 id=\"receipt-title\">Re\u00E7u de paiement</h2>\n\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer le re\u00E7u\" (click)=\"closeReceipt()\">\u00D7</button>\n\n      </header>\n\n      <div class=\"drawer__body\">\n\n        @if (receiptLoading()) { <p role=\"status\">Chargement du re\u00E7u\u2026</p> }\n\n        @if (receipt(); as payment) {\n\n          <article id=\"payment-receipt\" class=\"receipt-card\">\n\n            <div class=\"receipt-card__head\">\n\n              <strong>{{ payment.receiptNumber ?? payment.paymentReference }}</strong>\n\n              <strong>{{ payment.status | statusLabel }}</strong>\n\n            </div>\n\n            @if (payment.status === 'CANCELLED') {\n\n              <p class=\"inline-message inline-message--warning\">ANNUL\u00C9 \u2014 Ce re\u00E7u ne justifie plus un r\u00E8glement.</p>\n\n            }\n\n            <div class=\"receipt-card__amount money\">{{ payment.amount | money:payment.currency }}</div>\n\n            <dl class=\"receipt-card__details\">\n\n              <div><dt>\u00C9l\u00E8ve</dt><dd>{{ payment.studentName }}</dd></div>\n\n              <div><dt>Matricule</dt><dd>{{ payment.studentNumber }}</dd></div>\n\n              <div><dt>Date</dt><dd>{{ payment.paymentDate | date:'dd/MM/yyyy' }}</dd></div>\n\n              <div><dt>Mode</dt><dd>{{ payment.paymentMethod | statusLabel }}</dd></div>\n\n              <div><dt>R\u00E9f\u00E9rence du paiement</dt><dd>{{ payment.paymentReference }}</dd></div>\n\n              @if (payment.payerName) { <div><dt>Payeur</dt><dd>{{ payment.payerName }}</dd></div> }\n\n              @if (payment.externalReference) { <div><dt>R\u00E9f\u00E9rence externe</dt><dd>{{ payment.externalReference }}</dd></div> }\n\n              @if (payment.status === 'VALIDATED') {\n\n                <div><dt>Montant affect\u00E9</dt><dd>{{ payment.allocatedAmount | money:payment.currency }}</dd></div>\n\n                <div><dt>Avance non affect\u00E9e</dt><dd>{{ payment.unallocatedAmount | money:payment.currency }}</dd></div>\n\n              }\n\n            </dl>\n\n            @if (payment.allocations.length) {\n\n              <section class=\"allocation-card\">\n\n                <h3>Affectations</h3>\n\n                <ul>\n\n                  @for (allocation of payment.allocations; track allocation.id) {\n\n                    <li><span>{{ allocation.feeLabel }}</span><strong>{{ allocation.amount | money:payment.currency }}</strong></li>\n\n                  }\n\n                </ul>\n\n              </section>\n\n            }\n\n          </article>\n\n        }\n\n      </div>\n\n      <footer class=\"drawer__foot\">\n\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeReceipt()\">Fermer</button>\n\n        <button type=\"button\" class=\"btn btn--primary\" [disabled]=\"!receipt()\" (click)=\"printReceipt()\">Imprimer / PDF</button>\n\n      </footer>\n\n    </aside>\n\n  </div>\n\n}\n\n<eduops-confirm-dialog\n\n  [open]=\"cancelTarget() !== null\"\n\n  title=\"Annuler ce paiement\"\n\n  [message]=\"cancelMessage()\"\n\n  confirmLabel=\"Annuler le paiement\"\n\n  [danger]=\"true\"\n\n  [requireReason]=\"true\"\n\n  reasonLabel=\"Motif de l'annulation\"\n\n  (confirm)=\"confirmCancel($event)\"\n\n  (cancel)=\"cancelTarget.set(null)\" />", styles: ["@import 'styles/tokens';\n\n.register-search { max-width: 380px; }\n.amount-cell { font-weight: 700; }\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  padding: 0;\n  background: rgb(15 23 42 / 38%);\n  border: 0;\n  cursor: default;\n}\n\n.drawer {\n  position: fixed;\n  inset: 0 0 0 auto;\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n  width: min(560px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &--wide { width: min(680px, 100vw); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-4);\n    padding: var(--space-5) var(--space-6);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__eyebrow {\n    display: block;\n    margin-bottom: 2px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    letter-spacing: .06em;\n    text-transform: uppercase;\n    color: var(--brand);\n  }\n\n  &__title { margin: 0; font-size: var(--text-xl); color: var(--text-strong); }\n  &__meta { margin: 4px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__close {\n    flex: none;\n    width: 34px;\n    height: 34px;\n    padding: 0;\n    font-size: 24px;\n    line-height: 1;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border: 0;\n    border-radius: 50%;\n    cursor: pointer;\n  }\n\n  &__form { min-height: 0; flex: 1; display: flex; flex-direction: column; }\n  &__body { min-height: 0; flex: 1; overflow-y: auto; padding: var(--space-6); }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-6);\n    background: var(--surface-card);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n.form-section--spaced {\n  padding-top: var(--space-6);\n  margin-top: var(--space-6);\n  border-top: 1px solid var(--border-light);\n}\n\n.section-heading {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n\n  &__step {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 28px;\n    height: 28px;\n    font-size: var(--text-sm);\n    font-weight: 800;\n    color: var(--brand);\n    background: var(--brand-tint);\n    border-radius: 50%;\n  }\n\n  h3 { margin: 1px 0 0; font-size: var(--text-md); color: var(--text-strong); }\n  p { margin: 3px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.student-picker {\n  position: relative;\n\n  &__icon {\n    position: absolute;\n    top: 50%;\n    left: 13px;\n    z-index: 1;\n    transform: translateY(-50%);\n    font-size: 20px;\n    color: var(--text-muted);\n    pointer-events: none;\n  }\n\n  &__input { height: 44px; padding-left: 42px; }\n}\n\n.student-results {\n  max-height: 286px;\n  margin-top: var(--space-2);\n  overflow-y: auto;\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n\n  &__state {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: var(--space-2);\n    min-height: 76px;\n    margin: 0;\n    color: var(--text-muted);\n  }\n}\n\n.student-result {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto auto;\n  align-items: center;\n  gap: var(--space-3);\n  width: 100%;\n  padding: var(--space-3);\n  text-align: left;\n  color: var(--text-normal);\n  background: var(--surface-card);\n  border: 0;\n  border-bottom: 1px solid var(--border-light);\n  cursor: pointer;\n\n  &:last-child { border-bottom: 0; }\n  &:hover, &:focus-visible { background: var(--surface-hover); outline: none; }\n\n  &__identity {\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n    strong { overflow: hidden; text-overflow: ellipsis; color: var(--text-strong); }\n    small { margin-top: 2px; color: var(--text-muted); }\n  }\n\n  &__class { font-size: var(--text-xs); color: var(--text-muted); }\n  &__arrow { font-size: 22px; color: var(--text-light); }\n}\n\n.selected-student {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n\n  &__identity {\n    display: flex;\n    flex: 1;\n    flex-direction: column;\n    min-width: 0;\n    strong { overflow: hidden; text-overflow: ellipsis; color: var(--text-strong); }\n    span { margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n  }\n}\n\n.summary-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  min-height: 76px;\n  color: var(--text-muted);\n}\n\n.balance-card {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--space-4);\n  padding: var(--space-4);\n  margin-top: var(--space-3);\n  color: var(--text-on-brand);\n  background: var(--brand);\n  border-radius: var(--radius-card);\n\n  div { display: flex; flex-direction: column; gap: 3px; }\n  span { font-size: var(--text-xs); opacity: .78; }\n  strong { font-size: var(--text-lg); }\n  &__secondary { padding-left: var(--space-4); border-left: 1px solid rgb(255 255 255 / 26%); }\n\n  &--settled { background: var(--success); }\n}\n\n.amount-field { max-width: 360px; }\n.amount-input {\n  position: relative;\n  .input { height: 48px; padding-right: 64px; font-size: var(--text-xl); font-weight: 750; }\n  > span {\n    position: absolute;\n    top: 50%;\n    right: var(--space-3);\n    transform: translateY(-50%);\n    font-size: var(--text-sm);\n    font-weight: 700;\n    color: var(--text-muted);\n  }\n}\n\n.quick-amounts { display: flex; gap: var(--space-2); margin: 0 0 var(--space-4); flex-wrap: wrap; }\n.quick-amount {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 2px;\n  padding: var(--space-2) var(--space-3);\n  font-size: var(--text-xs);\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: var(--radius-input);\n  cursor: pointer;\n  strong { color: var(--text-strong); }\n\n  &--active { color: var(--brand); background: var(--brand-tint); border-color: var(--brand); }\n  &--active strong { color: var(--brand); }\n}\n\n.allocation-card {\n  overflow: hidden;\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n\n  &__head {\n    display: flex;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-3) var(--space-4);\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    strong { color: var(--text-normal); }\n  }\n\n  ul { margin: 0; padding: 0; list-style: none; }\n  li {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-3) var(--space-4);\n    border-top: 1px solid var(--border-light);\n    > span { display: flex; flex-direction: column; min-width: 0; }\n    > span strong { overflow: hidden; text-overflow: ellipsis; color: var(--text-strong); }\n    small { margin-top: 2px; color: var(--text-muted); }\n    > strong { flex: none; color: var(--success); }\n  }\n}\n\n.inline-message {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-2);\n  padding: var(--space-3);\n  margin: var(--space-3) 0 0;\n  font-size: var(--text-sm);\n  border-radius: var(--radius-input);\n\n  > span { font-weight: 800; }\n  &--success { color: var(--success); background: var(--success-bg); }\n  &--warning { color: var(--warning); background: var(--warning-bg); }\n}\n\n.fee-selection__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  margin-bottom: var(--space-2);\n}\n\n.fee-selection__summary { font-size: var(--text-sm); color: var(--text-muted); }\n\n.fee-rubrique-filter {\n  display: block;\n  max-width: 420px;\n  margin: var(--space-3) 0 var(--space-1);\n}\n\n.fee-group__title {\n  display: flex;\n  align-items: baseline;\n  gap: var(--space-2);\n  margin: var(--space-4) 0 var(--space-2);\n  font-size: var(--text-sm);\n  font-weight: 700;\n  color: var(--text-strong);\n\n  small { font-weight: 400; color: var(--text-muted); }\n}\n\n.fee-group__total { margin-left: auto; font-size: var(--text-sm); }\n\n.fee-list {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.fee-item {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  border: 1px solid var(--border-light);\n  border-radius: var(--radius-input);\n\n  & + & { margin-top: var(--space-2); }\n\n  &--selected { background: var(--brand-tint); border-color: var(--brand); }\n}\n\n.fee-item__info { display: flex; flex: 1; flex-direction: column; min-width: 0; }\n.fee-item__label { font-weight: 650; color: var(--text-strong); }\n.fee-item__meta { font-size: var(--text-xs); color: var(--text-muted); }\n\n.method-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--space-2);\n}\n\n.method-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  min-height: 68px;\n  padding: var(--space-3);\n  color: var(--text-normal);\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: var(--radius-input);\n  cursor: pointer;\n  transition: border-color var(--transition-fast), background var(--transition-fast);\n\n  input { position: absolute; opacity: 0; pointer-events: none; }\n  &:focus-within { box-shadow: 0 0 0 3px var(--brand-tint); }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 30px;\n    height: 30px;\n    font-size: var(--text-md);\n    font-weight: 800;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border-radius: 9px;\n  }\n\n  > span:nth-of-type(2) { display: flex; flex-direction: column; min-width: 0; }\n  strong { font-size: var(--text-sm); color: var(--text-strong); }\n  small { margin-top: 1px; overflow: hidden; font-size: 10px; text-overflow: ellipsis; white-space: nowrap; color: var(--text-muted); }\n\n  &__check { position: absolute; top: 6px; right: 8px; color: transparent; }\n  &--selected { background: var(--brand-tint); border-color: var(--brand); }\n  &--selected &__icon { color: var(--brand); background: var(--surface-card); }\n  &--selected &__check { color: var(--brand); }\n}\n\n.payment-details { margin-top: var(--space-4); }\n.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }\n\n.optional-details {\n  border-top: 1px solid var(--border-light);\n  summary {\n    padding: var(--space-3) 0;\n    font-size: var(--text-sm);\n    font-weight: 650;\n    color: var(--text-normal);\n    cursor: pointer;\n    span { margin-left: var(--space-1); font-size: var(--text-xs); font-weight: 400; color: var(--text-light); }\n  }\n  &__content { padding-top: var(--space-2); }\n}\n\n.footer-total {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  min-width: 130px;\n  span { font-size: var(--text-xs); color: var(--text-muted); }\n  strong { margin-top: 1px; font-size: var(--text-lg); color: var(--text-strong); }\n}\n\n.btn--collect { min-width: 190px; }\n.spinner--sm { width: 18px; height: 18px; border-width: 2px; }\n.spinner--button { width: 16px; height: 16px; border-width: 2px; border-color: rgb(255 255 255 / 38%); border-top-color: #fff; }\n\n.success-view {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  text-align: center;\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    width: 58px;\n    height: 58px;\n    margin: var(--space-6) 0 var(--space-4);\n    font-size: 28px;\n    font-weight: 800;\n    color: var(--success);\n    background: var(--success-bg);\n    border-radius: 50%;\n  }\n\n  h3 { margin: 0; font-size: var(--text-xl); color: var(--text-strong); }\n  > p { margin: var(--space-2) 0 var(--space-6); color: var(--text-muted); }\n}\n\n.receipt-card {\n  width: min(440px, 100%);\n  overflow: hidden;\n  text-align: left;\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-sm);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4);\n    background: var(--surface-sunken);\n    > div { display: flex; flex-direction: column; }\n    span { font-size: var(--text-xs); color: var(--text-muted); }\n    strong { margin-top: 2px; color: var(--text-strong); }\n  }\n\n  &__amount {\n    padding: var(--space-6) var(--space-4);\n    text-align: center;\n    font-size: var(--text-2xl);\n    font-weight: 800;\n    color: var(--brand);\n    border-bottom: 1px dashed var(--border-strong);\n  }\n\n  &__details {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: var(--space-4);\n    margin: 0;\n    padding: var(--space-4);\n    div { min-width: 0; }\n    dt { font-size: var(--text-xs); color: var(--text-muted); }\n    dd { margin: 3px 0 0; overflow: hidden; text-overflow: ellipsis; color: var(--text-strong); }\n  }\n\n  &__balance {\n    grid-column: 1 / -1;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding-top: var(--space-3);\n    border-top: 1px solid var(--border-light);\n    dd { font-weight: 700; color: var(--success); }\n  }\n}\n\n.receipt-overlay { position: fixed; inset: 0; z-index: var(--z-modal); }\n\n@include mobile {\n  .register-search { max-width: none; }\n  .drawer, .drawer--wide { width: 100vw; }\n  .drawer__head, .drawer__body { padding: var(--space-4); }\n  .drawer__foot { align-items: stretch; flex-direction: column; padding: var(--space-3) var(--space-4); }\n  .drawer__foot--success { flex-direction: column-reverse; }\n  .footer-total { align-items: center; padding-bottom: var(--space-1); }\n  .method-grid { grid-template-columns: 1fr 1fr; }\n  .grid2 { grid-template-columns: 1fr; gap: 0; }\n  .student-result { grid-template-columns: auto minmax(0, 1fr) auto; }\n  .student-result__class { display: none; }\n  .balance-card { grid-template-columns: 1fr; }\n  .balance-card__secondary { padding: var(--space-3) 0 0; border-top: 1px solid rgb(255 255 255 / 26%); border-left: 0; }\n  .btn--collect { width: 100%; }\n  .receipt-card__details { grid-template-columns: 1fr; }\n}\n"] }]
    }], null, { amountTpl: [{
            type: ViewChild,
            args: ['amountTpl', { static: true }]
        }], methodTpl: [{
            type: ViewChild,
            args: ['methodTpl', { static: true }]
        }], statusTpl: [{
            type: ViewChild,
            args: ['statusTpl', { static: true }]
        }], actionsTpl: [{
            type: ViewChild,
            args: ['actionsTpl', { static: true }]
        }], onEscape: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PaymentListComponent, { className: "PaymentListComponent", filePath: "frontend/src/app/features/payments/payment-list.component.ts", lineNumber: 85 }); })();
//# sourceMappingURL=payment-list.component.js.map