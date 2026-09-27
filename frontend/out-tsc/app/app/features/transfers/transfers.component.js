import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { CLASSROOM_DATA_SOURCE, STUDENT_DATA_SOURCE, TRANSFER_DATA_SOURCE } from '@core/datasource/data-source';
import { DEPARTURE_DOCUMENTS, DEPARTURE_REASONS, DEPARTURE_STATES } from '@core/models/transfer.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.code;
const _forTrack2 = ($index, $item) => $item.key;
function TransfersComponent_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const b_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", b_r1.upcomingDepartureCount, " d\u00E9part(s) annonc\u00E9(s) ");
} }
function TransfersComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵtemplate(1, TransfersComponent_Conditional_7_Conditional_1_Template, 1, 1);
} if (rf & 2) {
    const b_r1 = ctx;
    i0.ɵɵtextInterpolate3(" ", b_r1.classChangeCount, " changement(s) de classe \u00B7 ", b_r1.pendingDepartureCount, " sortie(s) \u00E0 traiter \u00B7 ", b_r1.clearedDepartureCount, " dossier(s) sold\u00E9(s) ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(b_r1.upcomingDepartureCount > 0 ? 1 : -1);
} }
function TransfersComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openChange()); });
    i0.ɵɵelementStart(1, "span", 16);
    i0.ɵɵtext(2, "\u21C4");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Changer un \u00E9l\u00E8ve de classe ");
    i0.ɵɵelementEnd();
} }
function TransfersComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openDeparture()); });
    i0.ɵɵelementStart(1, "span", 16);
    i0.ɵɵtext(2, "\u2192");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Enregistrer un d\u00E9part ");
    i0.ɵɵelementEnd();
} }
function TransfersComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.pendingDepartures().length);
} }
function TransfersComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 14);
} }
function TransfersComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 17);
    i0.ɵɵlistener("retry", function TransfersComponent_Conditional_23_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.load()); });
    i0.ɵɵelementEnd();
} }
function TransfersComponent_Conditional_24_Conditional_0_For_18_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 29);
    i0.ɵɵtext(1, "Change de niveau");
    i0.ɵɵelementEnd();
} }
function TransfersComponent_Conditional_24_Conditional_0_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "span", 23);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 24);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 25)(7, "span", 26);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 27);
    i0.ɵɵtext(10, "\u2192");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 28);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, TransfersComponent_Conditional_24_Conditional_0_For_18_Conditional_13_Template, 2, 0, "span", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 30);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 31);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const change_r7 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("row--attention", change_r7.crossesLevel);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(change_r7.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(change_r7.studentNumber);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(change_r7.fromClassroomName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(change_r7.toClassroomName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(change_r7.crossesLevel ? 13 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(change_r7.reason);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatDate(change_r7.transferredAt));
} }
function TransfersComponent_Conditional_24_Conditional_0_ForEmpty_19_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td", 32)(2, "div", 33)(3, "p", 34);
    i0.ɵɵtext(4, "Aucun changement de classe cette ann\u00E9e.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 35);
    i0.ɵɵtext(6, " Les mouvements internes apparaissent ici d\u00E8s qu'un \u00E9l\u00E8ve change de groupe. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 15);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_24_Conditional_0_ForEmpty_19_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openChange()); });
    i0.ɵɵtext(8, " Changer un \u00E9l\u00E8ve de classe ");
    i0.ɵɵelementEnd()()()();
} }
function TransfersComponent_Conditional_24_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 19);
    i0.ɵɵtext(1, " L'\u00E9l\u00E8ve change de groupe, sa scolarit\u00E9 continue. Le motif reste au dossier : au conseil de classe, personne ne se souvient plus de la raison. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 18)(3, "table", 20)(4, "caption", 12);
    i0.ɵɵtext(5, "Changements de classe de l'ann\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "thead")(7, "tr")(8, "th", 21);
    i0.ɵɵtext(9, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 21);
    i0.ɵɵtext(11, "Mouvement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 21);
    i0.ɵɵtext(13, "Motif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 21);
    i0.ɵɵtext(15, "Date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "tbody");
    i0.ɵɵrepeaterCreate(17, TransfersComponent_Conditional_24_Conditional_0_For_18_Template, 18, 9, "tr", 22, _forTrack0, false, TransfersComponent_Conditional_24_Conditional_0_ForEmpty_19_Template, 9, 0, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(17);
    i0.ɵɵrepeater(ctx_r2.classChanges());
} }
function TransfersComponent_Conditional_24_Conditional_1_Conditional_0_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 39)(1, "div", 41)(2, "span", 42);
    i0.ɵɵtext(3, "\u20A3");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 43);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 44);
    i0.ɵɵtext(8, " Le solde est not\u00E9 au dossier de chaque sortie et n'emp\u00EAche rien : retenir un dossier scolaire pour dette est ill\u00E9gal dans beaucoup de pays. Il est l\u00E0 pour qu'on le voie avant que la famille reparte. ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const b_r8 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2(" ", ctx_r2.formatAmount(b_r8.outstandingTotal), " ", b_r8.currency, " dus par les familles qui partent ");
} }
function TransfersComponent_Conditional_24_Conditional_1_Conditional_0_Conditional_1_For_11_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 46)(1, "span", 47);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 48);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 49);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_24_Conditional_1_Conditional_0_Conditional_1_For_11_Template_button_click_5_listener() { const departure_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r2 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r2.openReview(departure_r10)); });
    i0.ɵɵtext(6, "Pr\u00E9parer les pi\u00E8ces");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const departure_r10 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(departure_r10.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" ", departure_r10.classroomName, " \u00B7 ", ctx_r2.formatDate(departure_r10.departureDate), " \u00B7 ", departure_r10.reasonLabel, " ");
} }
function TransfersComponent_Conditional_24_Conditional_1_Conditional_0_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 40)(1, "div", 41)(2, "span", 42);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 43);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 44);
    i0.ɵɵtext(8, " Ces \u00E9l\u00E8ves sont encore en classe : la date de sortie n'est pas atteinte. Les pi\u00E8ces peuvent \u00EAtre pr\u00E9par\u00E9es d\u00E8s maintenant. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "ul", 45);
    i0.ɵɵrepeaterCreate(10, TransfersComponent_Conditional_24_Conditional_1_Conditional_0_Conditional_1_For_11_Template, 7, 4, "li", 46, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.upcomingDepartures().length, " d\u00E9part(s) annonc\u00E9(s) \u00E0 venir ");
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r2.upcomingDepartures());
} }
function TransfersComponent_Conditional_24_Conditional_1_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TransfersComponent_Conditional_24_Conditional_1_Conditional_0_Conditional_0_Template, 9, 2, "section", 39)(1, TransfersComponent_Conditional_24_Conditional_1_Conditional_0_Conditional_1_Template, 12, 1, "section", 40);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵconditional(ctx.outstandingTotal > 0 ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.upcomingDepartures().length > 0 ? 1 : -1);
} }
function TransfersComponent_Conditional_24_Conditional_1_For_23_Conditional_8_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const departure_r13 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", departure_r13.destinationCity, " ");
} }
function TransfersComponent_Conditional_24_Conditional_1_For_23_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 50);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, TransfersComponent_Conditional_24_Conditional_1_For_23_Conditional_8_Conditional_2_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const departure_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", departure_r13.destinationSchool, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(departure_r13.destinationCity ? 2 : -1);
} }
function TransfersComponent_Conditional_24_Conditional_1_For_23_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 51);
    i0.ɵɵtext(1, "R\u00E9inscription interdite");
    i0.ɵɵelementEnd();
} }
function TransfersComponent_Conditional_24_Conditional_1_For_23_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 52);
    i0.ɵɵtext(1, "\u00E0 venir");
    i0.ɵɵelementEnd();
} }
function TransfersComponent_Conditional_24_Conditional_1_For_23_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const departure_r13 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.formatAmount(departure_r13.outstandingAmount), " ");
} }
function TransfersComponent_Conditional_24_Conditional_1_For_23_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 54);
    i0.ɵɵtext(1, "\u00E0 jour");
    i0.ɵɵelementEnd();
} }
function TransfersComponent_Conditional_24_Conditional_1_For_23_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "span", 23);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 24);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵtemplate(8, TransfersComponent_Conditional_24_Conditional_1_For_23_Conditional_8_Template, 3, 2, "span", 50)(9, TransfersComponent_Conditional_24_Conditional_1_For_23_Conditional_9_Template, 2, 0, "span", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 31);
    i0.ɵɵtext(11);
    i0.ɵɵtemplate(12, TransfersComponent_Conditional_24_Conditional_1_For_23_Conditional_12_Template, 2, 0, "span", 52);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 53);
    i0.ɵɵtemplate(14, TransfersComponent_Conditional_24_Conditional_1_For_23_Conditional_14_Template, 1, 1)(15, TransfersComponent_Conditional_24_Conditional_1_For_23_Conditional_15_Template, 2, 0, "span", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 31)(17, "span", 55);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "td")(20, "span", 56);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "td", 57)(23, "button", 49);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_24_Conditional_1_For_23_Template_button_click_23_listener() { const departure_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openReview(departure_r13)); });
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const departure_r13 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("row--cancelled", departure_r13.status === "CANCELLED");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(departure_r13.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", departure_r13.studentNumber, " \u00B7 ", departure_r13.classroomName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", departure_r13.reasonLabel, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(departure_r13.destinationSchool ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!departure_r13.allowsReturn ? 9 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.formatDate(departure_r13.departureDate), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(departure_r13.upcoming ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("owed--due", departure_r13.outstandingAmount > 0);
    i0.ɵɵadvance();
    i0.ɵɵconditional(departure_r13.outstandingAmount > 0 ? 14 : 15);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("docs--complete", departure_r13.documentsComplete);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", departure_r13.documentsIssued, "/4 ");
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-tone", ctx_r2.stateOf(departure_r13.status).tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", departure_r13.statusLabel, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", departure_r13.editable ? "Traiter" : "Voir", " ");
} }
function TransfersComponent_Conditional_24_Conditional_1_ForEmpty_24_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td", 58)(2, "div", 33)(3, "p", 34);
    i0.ɵɵtext(4, "Aucun d\u00E9part enregistr\u00E9 cette ann\u00E9e.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 35);
    i0.ɵɵtext(6, " Une sortie cl\u00F4t l'inscription et ouvre la liste des pi\u00E8ces \u00E0 remettre : exeat, certificat de radiation, dernier bulletin, dossier scolaire. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 15);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_24_Conditional_1_ForEmpty_24_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r11); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openDeparture()); });
    i0.ɵɵtext(8, " Enregistrer un d\u00E9part ");
    i0.ɵɵelementEnd()()()();
} }
function TransfersComponent_Conditional_24_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TransfersComponent_Conditional_24_Conditional_1_Conditional_0_Template, 2, 2);
    i0.ɵɵelementStart(1, "div", 18)(2, "table", 20)(3, "caption", 12);
    i0.ɵɵtext(4, "D\u00E9parts de l'ann\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "thead")(6, "tr")(7, "th", 21);
    i0.ɵɵtext(8, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 21);
    i0.ɵɵtext(10, "Motif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 21);
    i0.ɵɵtext(12, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 36);
    i0.ɵɵtext(14, "Solde d\u00FB");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th", 21);
    i0.ɵɵtext(16, "Pi\u00E8ces");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th", 21);
    i0.ɵɵtext(18, "\u00C9tat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 37);
    i0.ɵɵtext(20, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "tbody");
    i0.ɵɵrepeaterCreate(22, TransfersComponent_Conditional_24_Conditional_1_For_23_Template, 25, 19, "tr", 38, _forTrack0, false, TransfersComponent_Conditional_24_Conditional_1_ForEmpty_24_Template, 9, 0, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional((tmp_2_0 = ctx_r2.board()) ? 0 : -1, tmp_2_0);
    i0.ɵɵadvance(22);
    i0.ɵɵrepeater(ctx_r2.departures());
} }
function TransfersComponent_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TransfersComponent_Conditional_24_Conditional_0_Template, 20, 1)(1, TransfersComponent_Conditional_24_Conditional_1_Template, 25, 2, "div", 18);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r2.tab() === "CHANGEMENTS" ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.tab() === "DEPARTS" ? 1 : -1);
} }
function TransfersComponent_Conditional_25_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 69);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const student_r15 = ctx.$implicit;
    i0.ɵɵproperty("value", student_r15.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", student_r15.fullName, " \u2014 ", student_r15.classroomName, " ");
} }
function TransfersComponent_Conditional_25_For_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 69);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r16 = ctx.$implicit;
    i0.ɵɵproperty("value", classroom_r16.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3(" ", classroom_r16.name, " (", classroom_r16.activeEnrollments, "/", classroom_r16.capacityMaximum, ") ");
} }
function TransfersComponent_Conditional_25_Conditional_24_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 80);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const target_r17 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", target_r17.name, " est compl\u00E8te. Une d\u00E9rogation explicite est n\u00E9cessaire. ");
} }
function TransfersComponent_Conditional_25_Conditional_24_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 74);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const target_r17 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", target_r17.availableSeats, " place(s) restante(s) sur ", target_r17.capacityMaximum, ". ");
} }
function TransfersComponent_Conditional_25_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TransfersComponent_Conditional_25_Conditional_24_Conditional_0_Template, 2, 1, "span", 80)(1, TransfersComponent_Conditional_25_Conditional_24_Conditional_1_Template, 2, 2, "span", 74);
} if (rf & 2) {
    i0.ɵɵconditional(ctx.availableSeats <= 0 ? 0 : 1);
} }
function TransfersComponent_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_25_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeChange()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 60)(2, "header", 61)(3, "h2", 62);
    i0.ɵɵtext(4, "Changer un \u00E9l\u00E8ve de classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 63);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_25_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeChange()); });
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 64);
    i0.ɵɵlistener("ngSubmit", function TransfersComponent_Conditional_25_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitChange()); });
    i0.ɵɵelementStart(8, "div", 65)(9, "label", 66);
    i0.ɵɵtext(10, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 67)(12, "option", 68);
    i0.ɵɵtext(13, "Choisir\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(14, TransfersComponent_Conditional_25_For_15_Template, 2, 3, "option", 69, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 65)(17, "label", 70);
    i0.ɵɵtext(18, " Classe d'accueil ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "select", 71)(20, "option", 68);
    i0.ɵɵtext(21, "Choisir\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(22, TransfersComponent_Conditional_25_For_23_Template, 2, 4, "option", 69, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(24, TransfersComponent_Conditional_25_Conditional_24_Template, 2, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 65)(26, "label", 72);
    i0.ɵɵtext(27, "Motif");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(28, "textarea", 73);
    i0.ɵɵelementStart(29, "span", 74);
    i0.ɵɵtext(30, " Il reste au dossier et se relit au conseil de classe. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "label", 75);
    i0.ɵɵelement(32, "input", 76);
    i0.ɵɵelementStart(33, "span");
    i0.ɵɵtext(34, " Passer outre la capacit\u00E9 de la classe d'accueil ");
    i0.ɵɵelementStart(35, "small");
    i0.ɵɵtext(36, "\u00C0 r\u00E9server aux cas o\u00F9 la d\u00E9cision est d\u00E9j\u00E0 prise ailleurs. La d\u00E9rogation laisse une trace au dossier.");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(37, "footer", 77)(38, "button", 78);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_25_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeChange()); });
    i0.ɵɵtext(39, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "button", 79);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_25_Template_button_click_40_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitChange()); });
    i0.ɵɵtext(41, "Enregistrer le changement");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("formGroup", ctx_r2.changeForm);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r2.studentList());
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r2.classroomList());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_4_0 = ctx_r2.changeTarget()) ? 24 : -1, tmp_4_0);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("disabled", ctx_r2.changeForm.invalid || ctx_r2.saving());
} }
function TransfersComponent_Conditional_26_For_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 69);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const student_r19 = ctx.$implicit;
    i0.ɵɵproperty("value", student_r19.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", student_r19.fullName, " \u2014 ", student_r19.classroomName, " ");
} }
function TransfersComponent_Conditional_26_For_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 69);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const reason_r20 = ctx.$implicit;
    i0.ɵɵproperty("value", reason_r20.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(reason_r20.label);
} }
function TransfersComponent_Conditional_26_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 74);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function TransfersComponent_Conditional_26_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 92)(1, "div", 65)(2, "label", 93);
    i0.ɵɵtext(3, " \u00C9tablissement d'accueil ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 94);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 65)(6, "label", 95);
    i0.ɵɵtext(7, "Ville");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 96);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "p", 97);
    i0.ɵɵtext(10, " Sans le nom de l'\u00E9tablissement, l'exeat ne peut pas \u00EAtre rapproch\u00E9 par l'\u00E9cole d'accueil. ");
    i0.ɵɵelementEnd();
} }
function TransfersComponent_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_26_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeDeparture()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 81)(2, "header", 61)(3, "h2", 82);
    i0.ɵɵtext(4, "Enregistrer un d\u00E9part");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 63);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_26_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeDeparture()); });
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 64);
    i0.ɵɵlistener("ngSubmit", function TransfersComponent_Conditional_26_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitDeparture()); });
    i0.ɵɵelementStart(8, "p", 83);
    i0.ɵɵtext(9, " L'inscription sera close et l'\u00E9l\u00E8ve retir\u00E9 des effectifs. Le solde d\u00FB est relev\u00E9 maintenant et fig\u00E9 sur le dossier : recalcul\u00E9 plus tard, il donnerait un autre chiffre que celui annonc\u00E9 \u00E0 la famille. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 65)(11, "label", 84);
    i0.ɵɵtext(12, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "select", 85)(14, "option", 68);
    i0.ɵɵtext(15, "Choisir\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(16, TransfersComponent_Conditional_26_For_17_Template, 2, 3, "option", 69, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 65)(19, "label", 86);
    i0.ɵɵtext(20, "Motif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "select", 87);
    i0.ɵɵrepeaterCreate(22, TransfersComponent_Conditional_26_For_23_Template, 2, 2, "option", 69, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(24, TransfersComponent_Conditional_26_Conditional_24_Template, 2, 1, "span", 74);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 65)(26, "label", 88);
    i0.ɵɵtext(27, " Dernier jour de pr\u00E9sence ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(28, "input", 89);
    i0.ɵɵelementStart(29, "span", 74);
    i0.ɵɵtext(30, " Peut \u00EAtre \u00E0 venir : une famille annonce souvent son d\u00E9part pour la fin du mois. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(31, TransfersComponent_Conditional_26_Conditional_31_Template, 11, 0);
    i0.ɵɵelementStart(32, "div", 65)(33, "label", 90);
    i0.ɵɵtext(34, "Observation");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(35, "textarea", 91);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "footer", 77)(37, "button", 78);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_26_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeDeparture()); });
    i0.ɵɵtext(38, " Annuler ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "button", 79);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_26_Template_button_click_39_listener() { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitDeparture()); });
    i0.ɵɵtext(40, "Enregistrer la sortie");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("formGroup", ctx_r2.departureForm);
    i0.ɵɵadvance(9);
    i0.ɵɵrepeater(ctx_r2.studentList());
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r2.reasons);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_4_0 = ctx_r2.reasonHint(ctx_r2.departureForm.controls.reason.value)) ? 24 : -1, tmp_4_0);
    i0.ɵɵadvance(7);
    i0.ɵɵconditional(ctx_r2.needsDestination() ? 31 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("disabled", ctx_r2.departureForm.invalid || ctx_r2.saving());
} }
function TransfersComponent_Conditional_27_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 103);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const departure_r22 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" Cette famille doit encore ", ctx_r2.formatAmount(departure_r22.outstandingAmount), " ", departure_r22.currency, ". Le montant est not\u00E9 au dossier et ne bloque pas la remise des pi\u00E8ces : c'est une information pour le recouvrement, pas un moyen de pression. ");
} }
function TransfersComponent_Conditional_27_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 103);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const departure_r22 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Sortie annul\u00E9e : ", departure_r22.cancelledReason, " ");
} }
function TransfersComponent_Conditional_27_For_26_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 109)(1, "label", 110)(2, "input", 111);
    i0.ɵɵlistener("change", function TransfersComponent_Conditional_27_For_26_Template_input_change_2_listener() { const document_r24 = i0.ɵɵrestoreView(_r23).$implicit; const departure_r22 = i0.ɵɵnextContext(); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleDocument(departure_r22, document_r24.key)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span")(4, "span", 112);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const document_r24 = ctx.$implicit;
    const departure_r22 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("docs-list__item--done", ctx_r2.documentGiven(departure_r22, document_r24.key));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", ctx_r2.documentGiven(departure_r22, document_r24.key))("disabled", !departure_r22.editable || ctx_r2.saving());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r24.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(document_r24.hint);
} }
function TransfersComponent_Conditional_27_Conditional_27_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const departure_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" \u2014 ", departure_r22.destinationCity, " ");
} }
function TransfersComponent_Conditional_27_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 107)(1, "p", 113);
    i0.ɵɵtext(2, "\u00C9tablissement d'accueil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 114);
    i0.ɵɵtext(4);
    i0.ɵɵtemplate(5, TransfersComponent_Conditional_27_Conditional_27_Conditional_5_Template, 1, 1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const departure_r22 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", departure_r22.destinationSchool, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(departure_r22.destinationCity ? 5 : -1);
} }
function TransfersComponent_Conditional_27_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 107)(1, "p", 113);
    i0.ɵɵtext(2, "Observation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 114);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const departure_r22 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(departure_r22.notes);
} }
function TransfersComponent_Conditional_27_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 108);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const departure_r22 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", 4 - departure_r22.documentsIssued, " pi\u00E8ce(s) restent \u00E0 remettre. ");
} }
function TransfersComponent_Conditional_27_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 115);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_27_Conditional_33_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r25); const departure_r22 = i0.ɵɵnextContext(); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openCancel(departure_r22)); });
    i0.ɵɵtext(1, " Annuler la sortie ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 79);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_27_Conditional_33_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r25); const departure_r22 = i0.ɵɵnextContext(); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.clearDeparture(departure_r22)); });
    i0.ɵɵtext(3, " Solder le dossier ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const departure_r22 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r2.saving());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.saving() || !departure_r22.documentsComplete);
} }
function TransfersComponent_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_27_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r21); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeReview()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 98)(2, "header", 61)(3, "div")(4, "h2", 99);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 100);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 63);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_27_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r21); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeReview()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 101)(11, "span", 102)(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14, " / 4 pi\u00E8ces remises ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 102);
    i0.ɵɵtext(16, " solde ");
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "span", 56);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(21, TransfersComponent_Conditional_27_Conditional_21_Template, 2, 2, "p", 103)(22, TransfersComponent_Conditional_27_Conditional_22_Template, 2, 1, "p", 103);
    i0.ɵɵelementStart(23, "div", 104)(24, "ul", 105);
    i0.ɵɵrepeaterCreate(25, TransfersComponent_Conditional_27_For_26_Template, 8, 6, "li", 106, _forTrack2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(27, TransfersComponent_Conditional_27_Conditional_27_Template, 6, 2, "div", 107)(28, TransfersComponent_Conditional_27_Conditional_28_Template, 5, 1, "div", 107);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "footer", 77);
    i0.ɵɵtemplate(30, TransfersComponent_Conditional_27_Conditional_30_Template, 2, 1, "p", 108);
    i0.ɵɵelementStart(31, "button", 78);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_27_Template_button_click_31_listener() { i0.ɵɵrestoreView(_r21); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeReview()); });
    i0.ɵɵtext(32, " Fermer ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(33, TransfersComponent_Conditional_27_Conditional_33_Template, 4, 2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const departure_r22 = ctx;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(departure_r22.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" ", departure_r22.classroomName, " \u00B7 ", departure_r22.reasonLabel, " \u00B7 ", ctx_r2.formatDate(departure_r22.departureDate), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(departure_r22.documentsIssued);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("sheet-counters__item--due", departure_r22.outstandingAmount > 0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r2.formatAmount(departure_r22.outstandingAmount), " ", departure_r22.currency, "");
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", ctx_r2.stateOf(departure_r22.status).tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", departure_r22.statusLabel, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(departure_r22.outstandingAmount > 0 ? 21 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(departure_r22.status === "CANCELLED" ? 22 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.documents);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(departure_r22.destinationSchool ? 27 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(departure_r22.notes ? 28 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(departure_r22.editable && !departure_r22.documentsComplete ? 30 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(departure_r22.editable ? 33 : -1);
} }
function TransfersComponent_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_28_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r26); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeCancel()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 116)(2, "header", 61)(3, "div")(4, "h2", 117);
    i0.ɵɵtext(5, "Annuler la sortie");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 118);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 63);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_28_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r26); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeCancel()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 64);
    i0.ɵɵlistener("ngSubmit", function TransfersComponent_Conditional_28_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r26); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitCancel()); });
    i0.ɵɵelementStart(11, "p", 83);
    i0.ɵɵtext(12, " L'\u00E9l\u00E8ve reprend sa place dans les effectifs et son inscription redevient active. Le motif reste au dossier : un \u00E9l\u00E8ve qui r\u00E9appara\u00EEt dans une liste de classe apr\u00E8s avoir \u00E9t\u00E9 radi\u00E9 demande une explication \u00E9crite, sans quoi la personne suivante conclura \u00E0 un d\u00E9faut du logiciel. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 65)(14, "label", 119);
    i0.ɵɵtext(15, " Pourquoi cette sortie est annul\u00E9e ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "textarea", 120);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "footer", 77)(18, "button", 78);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_28_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r26); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeCancel()); });
    i0.ɵɵtext(19, " Revenir ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 79);
    i0.ɵɵlistener("click", function TransfersComponent_Conditional_28_Template_button_click_20_listener() { i0.ɵɵrestoreView(_r26); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitCancel()); });
    i0.ɵɵtext(21, "Annuler la sortie");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const departure_r27 = ctx;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate2(" ", departure_r27.studentName, " \u2014 ", departure_r27.classroomName, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r2.cancelForm);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("disabled", ctx_r2.cancelForm.invalid || ctx_r2.saving());
} }
/**
 * Movements: changing class, and leaving the school.
 *
 * <p>The two are kept apart on purpose. A change of class is an internal
 * arrangement that happens a dozen times a term. A departure ends the schooling
 * and produces paperwork a receiving school will chase — sometimes years later.
 * One list for both would bury the second under the first.</p>
 *
 * <p>The balance owed is shown on every departure and blocks nothing.
 * Withholding a pupil's school file over a debt is unlawful in many places;
 * what the product owes the secretary is the figure, in front of them, before
 * the family walks out of the door.</p>
 */
export class TransfersComponent {
    dataSource = inject(TRANSFER_DATA_SOURCE);
    classrooms = inject(CLASSROOM_DATA_SOURCE);
    students = inject(STUDENT_DATA_SOURCE);
    notifications = inject(NotificationService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    reasons = DEPARTURE_REASONS;
    documents = DEPARTURE_DOCUMENTS;
    states = DEPARTURE_STATES;
    totalSteps = 2;
    tab = signal('CHANGEMENTS');
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    board = signal(null);
    search = signal('');
    classroomList = signal([]);
    studentList = signal([]);
    changeOpen = signal(false);
    departureOpen = signal(false);
    /** La sortie ouverte en détail ; nulle quand le panneau est fermé. */
    reviewing = signal(null);
    cancelling = signal(null);
    changeForm = this.fb.nonNullable.group({
        studentId: ['', [Validators.required]],
        toClassroomId: ['', [Validators.required]],
        reason: ['', [Validators.required, Validators.maxLength(1000)]],
        overrideCapacity: [false]
    });
    departureForm = this.fb.nonNullable.group({
        studentId: ['', [Validators.required]],
        reason: ['TRANSFER_OUT', [Validators.required]],
        departureDate: ['', [Validators.required]],
        destinationSchool: ['', [Validators.maxLength(200)]],
        destinationCity: ['', [Validators.maxLength(120)]],
        notes: ['', [Validators.maxLength(2000)]]
    });
    cancelForm = this.fb.nonNullable.group({
        reason: ['', [Validators.required, Validators.maxLength(1000)]]
    });
    // ------------------------------------------------------------------ aide
    help = {
        CHANGEMENTS: {
            step: 1,
            title: 'Un changement de classe reste un arrangement interne',
            description: "L'élève change de groupe, sa scolarité continue. Le motif est "
                + 'obligatoire : il reste au dossier et se relit au conseil de classe, quand '
                + 'personne ne se souvient plus de la raison.',
            points: [
                'Le contrôle de capacité est celui de l\'inscription. Un changement qui '
                    + 'l\'ignorerait serait une façon de surcharger une classe sans que personne '
                    + 'l\'ait décidé — la dérogation existe, et elle laisse une trace.',
                'Un changement qui traverse un niveau est signalé. C\'est rare en cours '
                    + 'd\'année, et le programme n\'est pas le même : cela mérite une relecture.',
                'Le mouvement est enregistré, pas seulement appliqué. La classe d\'origine '
                    + 'reste lisible, ce qui compte pour les moyennes déjà calculées.'
            ],
            ctaLabel: 'Voir les changements'
        },
        DEPARTS: {
            step: 2,
            title: 'Un départ met fin à la scolarité et produit des pièces',
            description: "L'exeat, le certificat de radiation, le dernier bulletin, le "
                + "dossier rendu. L'école d'accueil réclamera les premières ; la famille "
                + 'reviendra pour les autres, parfois des années plus tard.',
            points: [
                'Le solde dû est affiché et figé le jour du départ. Il ne bloque rien : '
                    + 'retenir un dossier scolaire pour dette est illégal dans beaucoup de pays. '
                    + 'Ce que l\'écran doit, c\'est le chiffre sous les yeux avant que la famille '
                    + 'reparte.',
                'Les pièces se cochent une à une, à mesure qu\'elles sont remises. Solder un '
                    + 'dossier incomplet ferait croire que la famille est repartie avec tout.',
                'Une sortie enregistrée par erreur s\'annule, avec un motif écrit : l\'élève '
                    + 'revient dans les effectifs. Sans explication, la personne suivante '
                    + 'conclura à un défaut du logiciel.'
            ],
            ctaLabel: 'Traiter les départs'
        }
    };
    helpCopy = computed(() => this.help[this.tab()]);
    // --------------------------------------------------------------- cycle
    ngOnInit() {
        forkJoin({
            classrooms: this.classrooms.list(),
            students: this.students.search({ page: 0, size: 500 })
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (data) => {
                this.classroomList.set(data.classrooms);
                this.studentList.set(data.students.content);
            },
            // Les listes de choix manquantes ne doivent pas vider le tableau.
            error: () => undefined
        });
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.board(this.search() || undefined)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (board) => {
                this.board.set(board);
                this.loading.set(false);
            },
            error: (err) => {
                this.loading.set(false);
                this.error.set(true);
                this.explain(err);
            }
        });
    }
    changeTab(tab) {
        this.tab.set(tab);
        this.closeAll();
    }
    changeSearch(term) {
        this.search.set(term);
        this.load();
    }
    closeAll() {
        this.changeOpen.set(false);
        this.departureOpen.set(false);
        this.reviewing.set(null);
        this.cancelling.set(null);
    }
    // ------------------------------------------------------------- les vues
    classChanges = computed(() => this.board()?.classChanges ?? []);
    departures = computed(() => this.board()?.departures ?? []);
    /** Les sorties dont il manque des pièces : c'est le travail qui reste. */
    pendingDepartures = computed(() => this.departures().filter((row) => row.status === 'RECORDED'));
    /** Les sorties annoncées dont la date n'est pas atteinte. */
    upcomingDepartures = computed(() => this.departures().filter((row) => row.upcoming));
    stateOf(status) {
        return this.states.find((state) => state.code === status) ?? this.states[0];
    }
    /** La classe d'accueil choisie, pour afficher son remplissage. */
    changeTarget = computed(() => {
        const id = this.changeForm.controls.toClassroomId.value;
        return this.classroomList().find((room) => room.id === id);
    });
    /** Vrai quand le motif choisi exige le nom de l'établissement d'accueil. */
    needsDestination = computed(() => {
        const reason = this.departureForm.controls.reason.value;
        return this.reasons.find((item) => item.code === reason)?.needsDestination ?? false;
    });
    reasonHint(reason) {
        return this.reasons.find((item) => item.code === reason)?.hint ?? '';
    }
    // ------------------------------------------------- changement de classe
    openChange() {
        this.changeForm.reset({
            studentId: '', toClassroomId: '', reason: '', overrideCapacity: false
        });
        this.changeOpen.set(true);
    }
    closeChange() {
        this.changeOpen.set(false);
    }
    submitChange() {
        if (this.changeForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.changeForm.getRawValue();
        this.dataSource.changeClass({
            // En démonstration comme au serveur, l'inscription porte l'élève.
            enrollmentId: `enr-${value.studentId}`,
            toClassroomId: value.toClassroomId,
            reason: value.reason.trim(),
            overrideCapacity: value.overrideCapacity
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (change) => {
                this.saving.set(false);
                this.closeChange();
                this.load();
                this.notifications.success(`${change.studentName} passe de ${change.fromClassroomName} à `
                    + `${change.toClassroomName}.`, change.crossesLevel ? 'Changement de niveau enregistré' : 'Changement enregistré');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ------------------------------------------------------------ les départs
    openDeparture() {
        this.departureForm.reset({
            studentId: '',
            reason: 'TRANSFER_OUT',
            departureDate: isoToday(),
            destinationSchool: '',
            destinationCity: '',
            notes: ''
        });
        this.departureOpen.set(true);
    }
    closeDeparture() {
        this.departureOpen.set(false);
    }
    submitDeparture() {
        if (this.departureForm.invalid || this.saving()) {
            return;
        }
        const value = this.departureForm.getRawValue();
        if (this.needsDestination() && !value.destinationSchool.trim()) {
            this.notifications.error("Un transfert vers un autre établissement demande son nom : sans lui, l'exeat "
                + "ne peut pas être rapproché par l'école d'accueil.", 'Établissement manquant');
            return;
        }
        this.saving.set(true);
        this.dataSource.recordDeparture({
            enrollmentId: `enr-${value.studentId}`,
            reason: value.reason,
            departureDate: value.departureDate,
            destinationSchool: value.destinationSchool.trim() || undefined,
            destinationCity: value.destinationCity.trim() || undefined,
            notes: value.notes.trim() || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (departure) => {
                this.saving.set(false);
                this.closeDeparture();
                this.tab.set('DEPARTS');
                this.load();
                this.notifications.success(departure.outstandingAmount > 0
                    ? `Sortie de ${departure.studentName} enregistrée. Solde dû : `
                        + `${formatMoney(departure.outstandingAmount)} ${departure.currency}. `
                        + 'Il est noté au dossier et ne bloque pas la remise des pièces.'
                    : `Sortie de ${departure.studentName} enregistrée. Aucun solde dû.`, 'Départ enregistré');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ----------------------------------------------------------- les pièces
    openReview(departure) {
        this.reviewing.set(departure);
    }
    closeReview() {
        this.reviewing.set(null);
    }
    /** Coche ou décoche une pièce et enregistre aussitôt. */
    toggleDocument(departure, key) {
        if (this.saving() || !departure.editable) {
            return;
        }
        const payload = {
            exeatIssued: departure.exeatIssued,
            certificateIssued: departure.certificateIssued,
            reportCardIssued: departure.reportCardIssued,
            fileReturned: departure.fileReturned
        };
        payload[key] = !payload[key];
        this.saving.set(true);
        this.dataSource.updateDocuments(departure.id, payload)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (saved) => {
                this.reviewing.set(saved);
                this.saving.set(false);
                this.load();
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    documentGiven(departure, key) {
        return departure[key];
    }
    clearDeparture(departure) {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.clearDeparture(departure.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (saved) => {
                this.reviewing.set(saved);
                this.saving.set(false);
                this.load();
                this.notifications.success(`Le dossier de ${saved.studentName} est soldé : la famille est repartie `
                    + 'avec les quatre pièces.', 'Dossier soldé');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ---------------------------------------------------------- l'annulation
    openCancel(departure) {
        this.cancelling.set(departure);
        this.cancelForm.reset({ reason: '' });
    }
    closeCancel() {
        this.cancelling.set(null);
    }
    submitCancel() {
        const departure = this.cancelling();
        if (!departure || this.cancelForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.cancelDeparture(departure.id, this.cancelForm.getRawValue().reason.trim())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (saved) => {
                this.saving.set(false);
                this.closeCancel();
                this.closeReview();
                this.load();
                this.notifications.success(`${saved.studentName} reprend sa place en ${saved.classroomName}. `
                    + 'Le motif de l\'annulation reste au dossier.', 'Sortie annulée');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ------------------------------------------------------------- affichage
    formatDate(iso) {
        if (!iso) {
            return '';
        }
        const source = iso.length > 10 ? iso : `${iso}T00:00:00`;
        return new Date(source).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    formatAmount(value) {
        return value === undefined || value === null ? '—' : formatMoney(value);
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
    static ɵfac = function TransfersComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TransfersComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TransfersComponent, selectors: [["eduops-transfers"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 29, vars: 22, consts: [[1, "page"], ["flow", "transfers", "eyebrow", "Conseil pour cet onglet", 3, "stepKey", "stepNumber", "totalSteps", "title", "description", "points", "ctaLabel"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--primary"], ["role", "tablist", 1, "tabs"], ["type", "button", "role", "tab", 1, "tabs__item", 3, "click"], [1, "tabs__badge", "numeric"], [1, "filters"], [1, "filters__search"], [1, "visually-hidden"], ["type", "search", "placeholder", "Nom ou matricule", 1, "input", 3, "change", "value"], ["message", "Chargement des mouvements..."], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], [3, "retry"], [1, "table-wrapper", "card"], [1, "lead"], [1, "table"], ["scope", "col"], [3, "row--attention"], [1, "entry__name"], [1, "entry__number", "numeric"], [1, "move"], [1, "move__from"], ["aria-hidden", "true", 1, "move__arrow"], [1, "move__to"], [1, "pill", "pill--warn"], [1, "entry__reason"], [1, "numeric"], ["colspan", "4"], [1, "empty-state"], [1, "empty-state__title"], [1, "empty-state__text"], ["scope", "col", 1, "numeric"], ["scope", "col", 1, "cell-actions"], [3, "row--cancelled"], ["role", "status", 1, "alert-block", "alert-block--soft"], ["role", "status", 1, "alert-block"], [1, "alert-block__head"], ["aria-hidden", "true", 1, "alert-block__icon"], [1, "alert-block__title"], [1, "alert-block__text"], [1, "pending"], [1, "pending__item"], [1, "pending__name"], [1, "pending__cycle", "numeric"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], [1, "entry__destination"], [1, "pill", "pill--danger"], [1, "entry__soon"], [1, "numeric", "owed"], [1, "muted"], [1, "docs"], [1, "state"], [1, "cell-actions"], ["colspan", "7"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "change-title", 1, "drawer"], [1, "drawer__head"], ["id", "change-title", 1, "drawer__title"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "drawer__body", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "change-student", 1, "field__label", "field__label--required"], ["id", "change-student", "formControlName", "studentId", 1, "input"], ["value", ""], [3, "value"], ["for", "change-target", 1, "field__label", "field__label--required"], ["id", "change-target", "formControlName", "toClassroomId", 1, "input"], ["for", "change-reason", 1, "field__label", "field__label--required"], ["id", "change-reason", "rows", "3", "formControlName", "reason", "placeholder", "R\u00E9\u00E9quilibrage des effectifs apr\u00E8s trois arriv\u00E9es en 6e A", 1, "textarea"], [1, "field__hint"], [1, "switch"], ["type", "checkbox", "formControlName", "overrideCapacity"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [1, "field__hint", "field__hint--warn"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "departure-title", 1, "drawer"], ["id", "departure-title", 1, "drawer__title"], [1, "hint-block"], ["for", "dep-student", 1, "field__label", "field__label--required"], ["id", "dep-student", "formControlName", "studentId", 1, "input"], ["for", "dep-reason", 1, "field__label", "field__label--required"], ["id", "dep-reason", "formControlName", "reason", 1, "input"], ["for", "dep-date", 1, "field__label", "field__label--required"], ["id", "dep-date", "type", "date", "formControlName", "departureDate", 1, "input"], ["for", "dep-notes", 1, "field__label"], ["id", "dep-notes", "rows", "2", "formControlName", "notes", "placeholder", "Famille re\u00E7ue au secr\u00E9tariat, pi\u00E8ces annonc\u00E9es.", 1, "textarea"], [1, "grid2"], ["for", "dep-school", 1, "field__label", "field__label--required"], ["id", "dep-school", "formControlName", "destinationSchool", "placeholder", "Coll\u00E8ge Moderne de Cocody", 1, "input"], ["for", "dep-city", 1, "field__label"], ["id", "dep-city", "formControlName", "destinationCity", "placeholder", "Abidjan", 1, "input"], [1, "hint-block", "hint-block--warn"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "review-title", 1, "drawer", "drawer--wide"], ["id", "review-title", 1, "drawer__title"], [1, "drawer__meta", "numeric"], [1, "sheet-counters", "numeric"], [1, "sheet-counters__item"], [1, "hint-block", "hint-block--inset"], [1, "drawer__body"], [1, "docs-list"], [1, "docs-list__item", 3, "docs-list__item--done"], [1, "destination"], [1, "drawer__warning"], [1, "docs-list__item"], [1, "docs-list__check"], ["type", "checkbox", 3, "change", "checked", "disabled"], [1, "docs-list__label"], [1, "destination__label"], [1, "destination__value"], ["type", "button", 1, "btn", "btn--ghost", 3, "click", "disabled"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "cancel-title", 1, "drawer"], ["id", "cancel-title", 1, "drawer__title"], [1, "drawer__meta"], ["for", "cancel-reason", 1, "field__label", "field__label--required"], ["id", "cancel-reason", "rows", "3", "formControlName", "reason", "placeholder", "La famille est revenue sur sa d\u00E9cision, l'\u00E9l\u00E8ve reprend en 4e A", 1, "textarea"]], template: function TransfersComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "eduops-step-coachmark", 1);
            i0.ɵɵelementStart(2, "header", 2)(3, "div")(4, "h1", 3);
            i0.ɵɵtext(5, "Transferts et d\u00E9parts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 4);
            i0.ɵɵtemplate(7, TransfersComponent_Conditional_7_Template, 2, 4);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 5);
            i0.ɵɵtemplate(9, TransfersComponent_Conditional_9_Template, 4, 0, "button", 6)(10, TransfersComponent_Conditional_10_Template, 4, 0, "button", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "nav", 7)(12, "button", 8);
            i0.ɵɵlistener("click", function TransfersComponent_Template_button_click_12_listener() { return ctx.changeTab("CHANGEMENTS"); });
            i0.ɵɵtext(13, " Changements de classe ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "button", 8);
            i0.ɵɵlistener("click", function TransfersComponent_Template_button_click_14_listener() { return ctx.changeTab("DEPARTS"); });
            i0.ɵɵtext(15, " D\u00E9parts et radiations ");
            i0.ɵɵtemplate(16, TransfersComponent_Conditional_16_Template, 2, 1, "span", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "section", 10)(18, "label", 11)(19, "span", 12);
            i0.ɵɵtext(20, "Rechercher un \u00E9l\u00E8ve");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "input", 13);
            i0.ɵɵlistener("change", function TransfersComponent_Template_input_change_21_listener($event) { return ctx.changeSearch($event.target.value); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(22, TransfersComponent_Conditional_22_Template, 1, 0, "eduops-loading-state", 14)(23, TransfersComponent_Conditional_23_Template, 1, 0, "eduops-error-state")(24, TransfersComponent_Conditional_24_Template, 2, 2)(25, TransfersComponent_Conditional_25_Template, 42, 3)(26, TransfersComponent_Conditional_26_Template, 41, 4)(27, TransfersComponent_Conditional_27_Template, 34, 17)(28, TransfersComponent_Conditional_28_Template, 22, 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_7_0;
            let tmp_18_0;
            let tmp_19_0;
            i0.ɵɵadvance();
            i0.ɵɵproperty("stepKey", ctx.tab())("stepNumber", ctx.helpCopy().step)("totalSteps", ctx.totalSteps)("title", ctx.helpCopy().title)("description", ctx.helpCopy().description)("points", ctx.helpCopy().points)("ctaLabel", ctx.helpCopy().ctaLabel);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional((tmp_7_0 = ctx.board()) ? 7 : -1, tmp_7_0);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.tab() === "CHANGEMENTS" ? 9 : 10);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "CHANGEMENTS");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "CHANGEMENTS");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "DEPARTS");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "DEPARTS");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.pendingDepartures().length > 0 ? 16 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("value", ctx.search());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 22 : ctx.error() ? 23 : 24);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.changeOpen() ? 25 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.departureOpen() ? 26 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_18_0 = ctx.reviewing()) ? 27 : -1, tmp_18_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_19_0 = ctx.cancelling()) ? 28 : -1, tmp_19_0);
        } }, dependencies: [CommonModule, FormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName, LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent], styles: ["@import 'styles/tokens';\n\n.lead[_ngcontent-%COMP%] {\n  max-width: 68ch;\n  margin: 0 0 var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n}\n\n.muted[_ngcontent-%COMP%] { color: var(--text-muted); }\n\n\n\n\n.tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n\n  &__search .input { width: auto; min-width: 240px; }\n}\n\n.pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n  &--danger { color: var(--danger); background: var(--danger-bg); }\n}\n\n\n\n\n\n\n\n.state[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='todo'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='wait'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='done'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='off'] { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n\n\n\n.alert-block[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  margin-bottom: var(--space-4);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &--soft {\n    background: var(--surface-sunken);\n    border-color: var(--border-strong);\n\n    .alert-block__icon { background: var(--text-muted); }\n  }\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 22px;\n    height: 22px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-4) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n    flex-wrap: wrap;\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n\n.table-wrapper[_ngcontent-%COMP%] { overflow-x: auto; }\n\n.cell-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-2);\n  justify-content: flex-end;\n  white-space: nowrap;\n}\n\n.row--attention[_ngcontent-%COMP%] { background: var(--warning-bg); }\n.row--cancelled[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { color: var(--text-light); text-decoration: line-through; }\n.row--cancelled[_ngcontent-%COMP%]   .state[_ngcontent-%COMP%] { text-decoration: none; }\n\n.entry[_ngcontent-%COMP%] {\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__number { display: block; font-size: var(--text-xs); color: var(--text-light); }\n  &__reason { font-size: var(--text-sm); color: var(--text-muted); max-width: 34ch; }\n  &__destination {\n    display: block;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n  &__soon {\n    display: block;\n    font-size: var(--text-xs);\n    font-weight: 600;\n    color: var(--warning);\n  }\n}\n\n.move[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  flex-wrap: wrap;\n\n  &__from { color: var(--text-muted); }\n  &__arrow { color: var(--text-light); }\n  &__to { font-weight: 600; color: var(--text-strong); }\n}\n\n.owed[_ngcontent-%COMP%] {\n  color: var(--text-muted);\n\n  &--due { font-weight: 700; color: var(--warning); }\n}\n\n.docs[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-weight: 600;\n  color: var(--warning);\n  background: var(--warning-bg);\n  border-radius: var(--radius-badge);\n\n  &--complete { color: var(--success); background: var(--success-bg); }\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 480px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &--wide { width: min(600px, 100vw); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__close {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border-light);\n    flex-wrap: wrap;\n  }\n\n  &__warning {\n    flex: 1;\n    min-width: 180px;\n    margin: 0;\n    font-size: var(--text-xs);\n    color: var(--warning);\n  }\n}\n\n.sheet-counters[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  flex-wrap: wrap;\n\n  &__item strong { color: var(--text-strong); }\n  &__item--due strong { color: var(--warning); }\n}\n\n.grid2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n\n  &--inset {\n    margin: 0;\n    border-radius: 0;\n    border-bottom: 1px solid var(--border-light);\n  }\n}\n\n.field__hint--warn[_ngcontent-%COMP%] { color: var(--warning); }\n\n.switch[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n  font-size: var(--text-sm);\n  cursor: pointer;\n\n  input { margin-top: 3px; }\n  small { display: block; margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n\n\n\n.docs-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: 0 0 var(--space-5);\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n    border-left: 3px solid var(--border-strong);\n    border-radius: var(--radius-input);\n\n    &--done {\n      background: var(--success-bg);\n      border-left-color: var(--success);\n    }\n  }\n\n  &__check {\n    display: flex;\n    align-items: flex-start;\n    gap: var(--space-3);\n    cursor: pointer;\n\n    input { margin-top: 3px; }\n    small { display: block; margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n  }\n\n  &__label { font-weight: 600; color: var(--text-strong); }\n}\n\n.destination[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  margin-bottom: var(--space-3);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-input);\n\n  &__label {\n    margin: 0;\n    font-size: var(--text-xs);\n    text-transform: uppercase;\n    color: var(--text-muted);\n  }\n\n  &__value { margin: 2px 0 0; color: var(--text-strong); }\n}\n\n@include mobile {\n  .drawer,\n  .drawer--wide { width: 100vw; }\n\n  .drawer__foot { flex-direction: column; align-items: stretch; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TransfersComponent, [{
        type: Component,
        args: [{ selector: 'eduops-transfers', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule,
                    LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n\n  <!-- L'aide de la configuration, appliqu\u00E9e telle quelle : une carte au premier\n       passage sur l'onglet, un bouton \u00AB ? Aide \u00BB pour la revoir ensuite. -->\n  <eduops-step-coachmark\n    flow=\"transfers\"\n    [stepKey]=\"tab()\"\n    [stepNumber]=\"helpCopy().step\"\n    [totalSteps]=\"totalSteps\"\n    eyebrow=\"Conseil pour cet onglet\"\n    [title]=\"helpCopy().title\"\n    [description]=\"helpCopy().description\"\n    [points]=\"helpCopy().points\"\n    [ctaLabel]=\"helpCopy().ctaLabel\" />\n\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Transferts et d\u00E9parts</h1>\n      <p class=\"page__meta numeric\">\n        @if (board(); as b) {\n          {{ b.classChangeCount }} changement(s) de classe \u00B7\n          {{ b.pendingDepartureCount }} sortie(s) \u00E0 traiter \u00B7\n          {{ b.clearedDepartureCount }} dossier(s) sold\u00E9(s)\n          @if (b.upcomingDepartureCount > 0) {\n            \u00B7 {{ b.upcomingDepartureCount }} d\u00E9part(s) annonc\u00E9(s)\n          }\n        }\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      @if (tab() === 'CHANGEMENTS') {\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openChange()\">\n          <span aria-hidden=\"true\">\u21C4</span> Changer un \u00E9l\u00E8ve de classe\n        </button>\n      } @else {\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openDeparture()\">\n          <span aria-hidden=\"true\">\u2192</span> Enregistrer un d\u00E9part\n        </button>\n      }\n    </div>\n  </header>\n\n  <nav class=\"tabs\" role=\"tablist\">\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'CHANGEMENTS'\"\n            [attr.aria-selected]=\"tab() === 'CHANGEMENTS'\"\n            (click)=\"changeTab('CHANGEMENTS')\">\n      Changements de classe\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'DEPARTS'\"\n            [attr.aria-selected]=\"tab() === 'DEPARTS'\"\n            (click)=\"changeTab('DEPARTS')\">\n      D\u00E9parts et radiations\n      @if (pendingDepartures().length > 0) {\n        <span class=\"tabs__badge numeric\">{{ pendingDepartures().length }}</span>\n      }\n    </button>\n  </nav>\n\n  <section class=\"filters\">\n    <label class=\"filters__search\">\n      <span class=\"visually-hidden\">Rechercher un \u00E9l\u00E8ve</span>\n      <input type=\"search\" class=\"input\" placeholder=\"Nom ou matricule\"\n             [value]=\"search()\"\n             (change)=\"changeSearch($any($event.target).value)\" />\n    </label>\n  </section>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des mouvements...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Changements de classe \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (tab() === 'CHANGEMENTS') {\n      <p class=\"lead\">\n        L'\u00E9l\u00E8ve change de groupe, sa scolarit\u00E9 continue. Le motif reste au dossier :\n        au conseil de classe, personne ne se souvient plus de la raison.\n      </p>\n\n      <div class=\"table-wrapper card\">\n        <table class=\"table\">\n          <caption class=\"visually-hidden\">Changements de classe de l'ann\u00E9e</caption>\n          <thead>\n            <tr>\n              <th scope=\"col\">\u00C9l\u00E8ve</th>\n              <th scope=\"col\">Mouvement</th>\n              <th scope=\"col\">Motif</th>\n              <th scope=\"col\">Date</th>\n            </tr>\n          </thead>\n          <tbody>\n            @for (change of classChanges(); track change.id) {\n              <tr [class.row--attention]=\"change.crossesLevel\">\n                <td>\n                  <span class=\"entry__name\">{{ change.studentName }}</span>\n                  <span class=\"entry__number numeric\">{{ change.studentNumber }}</span>\n                </td>\n                <td class=\"move\">\n                  <span class=\"move__from\">{{ change.fromClassroomName }}</span>\n                  <span class=\"move__arrow\" aria-hidden=\"true\">\u2192</span>\n                  <span class=\"move__to\">{{ change.toClassroomName }}</span>\n                  @if (change.crossesLevel) {\n                    <span class=\"pill pill--warn\">Change de niveau</span>\n                  }\n                </td>\n                <td class=\"entry__reason\">{{ change.reason }}</td>\n                <td class=\"numeric\">{{ formatDate(change.transferredAt) }}</td>\n              </tr>\n            } @empty {\n              <tr>\n                <td colspan=\"4\">\n                  <div class=\"empty-state\">\n                    <p class=\"empty-state__title\">Aucun changement de classe cette ann\u00E9e.</p>\n                    <p class=\"empty-state__text\">\n                      Les mouvements internes apparaissent ici d\u00E8s qu'un \u00E9l\u00E8ve change\n                      de groupe.\n                    </p>\n                    <button type=\"button\" class=\"btn btn--primary\" (click)=\"openChange()\">\n                      Changer un \u00E9l\u00E8ve de classe\n                    </button>\n                  </div>\n                </td>\n              </tr>\n            }\n          </tbody>\n        </table>\n      </div>\n    }\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 D\u00E9parts et radiations \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (tab() === 'DEPARTS') {\n\n      @if (board(); as b) {\n        @if (b.outstandingTotal > 0) {\n          <section class=\"alert-block alert-block--soft\" role=\"status\">\n            <div class=\"alert-block__head\">\n              <span class=\"alert-block__icon\" aria-hidden=\"true\">\u20A3</span>\n              <div>\n                <p class=\"alert-block__title\">\n                  {{ formatAmount(b.outstandingTotal) }} {{ b.currency }} dus par les\n                  familles qui partent\n                </p>\n                <p class=\"alert-block__text\">\n                  Le solde est not\u00E9 au dossier de chaque sortie et n'emp\u00EAche rien :\n                  retenir un dossier scolaire pour dette est ill\u00E9gal dans beaucoup de\n                  pays. Il est l\u00E0 pour qu'on le voie avant que la famille reparte.\n                </p>\n              </div>\n            </div>\n          </section>\n        }\n\n        @if (upcomingDepartures().length > 0) {\n          <section class=\"alert-block\" role=\"status\">\n            <div class=\"alert-block__head\">\n              <span class=\"alert-block__icon\" aria-hidden=\"true\">!</span>\n              <div>\n                <p class=\"alert-block__title\">\n                  {{ upcomingDepartures().length }} d\u00E9part(s) annonc\u00E9(s) \u00E0 venir\n                </p>\n                <p class=\"alert-block__text\">\n                  Ces \u00E9l\u00E8ves sont encore en classe : la date de sortie n'est pas\n                  atteinte. Les pi\u00E8ces peuvent \u00EAtre pr\u00E9par\u00E9es d\u00E8s maintenant.\n                </p>\n              </div>\n            </div>\n            <ul class=\"pending\">\n              @for (departure of upcomingDepartures(); track departure.id) {\n                <li class=\"pending__item\">\n                  <span class=\"pending__name\">{{ departure.studentName }}</span>\n                  <span class=\"pending__cycle numeric\">\n                    {{ departure.classroomName }} \u00B7 {{ formatDate(departure.departureDate) }}\n                    \u00B7 {{ departure.reasonLabel }}\n                  </span>\n                  <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                          (click)=\"openReview(departure)\">Pr\u00E9parer les pi\u00E8ces</button>\n                </li>\n              }\n            </ul>\n          </section>\n        }\n      }\n\n      <div class=\"table-wrapper card\">\n        <table class=\"table\">\n          <caption class=\"visually-hidden\">D\u00E9parts de l'ann\u00E9e</caption>\n          <thead>\n            <tr>\n              <th scope=\"col\">\u00C9l\u00E8ve</th>\n              <th scope=\"col\">Motif</th>\n              <th scope=\"col\">Date</th>\n              <th scope=\"col\" class=\"numeric\">Solde d\u00FB</th>\n              <th scope=\"col\">Pi\u00E8ces</th>\n              <th scope=\"col\">\u00C9tat</th>\n              <th scope=\"col\" class=\"cell-actions\">Action</th>\n            </tr>\n          </thead>\n          <tbody>\n            @for (departure of departures(); track departure.id) {\n              <tr [class.row--cancelled]=\"departure.status === 'CANCELLED'\">\n                <td>\n                  <span class=\"entry__name\">{{ departure.studentName }}</span>\n                  <span class=\"entry__number numeric\">\n                    {{ departure.studentNumber }} \u00B7 {{ departure.classroomName }}\n                  </span>\n                </td>\n                <td>\n                  {{ departure.reasonLabel }}\n                  @if (departure.destinationSchool) {\n                    <span class=\"entry__destination\">\n                      {{ departure.destinationSchool }}\n                      @if (departure.destinationCity) { \u00B7 {{ departure.destinationCity }} }\n                    </span>\n                  }\n                  @if (!departure.allowsReturn) {\n                    <span class=\"pill pill--danger\">R\u00E9inscription interdite</span>\n                  }\n                </td>\n                <td class=\"numeric\">\n                  {{ formatDate(departure.departureDate) }}\n                  @if (departure.upcoming) {\n                    <span class=\"entry__soon\">\u00E0 venir</span>\n                  }\n                </td>\n                <td class=\"numeric owed\" [class.owed--due]=\"departure.outstandingAmount > 0\">\n                  @if (departure.outstandingAmount > 0) {\n                    {{ formatAmount(departure.outstandingAmount) }}\n                  } @else {\n                    <span class=\"muted\">\u00E0 jour</span>\n                  }\n                </td>\n                <td class=\"numeric\">\n                  <span class=\"docs\" [class.docs--complete]=\"departure.documentsComplete\">\n                    {{ departure.documentsIssued }}/4\n                  </span>\n                </td>\n                <td>\n                  <span class=\"state\" [attr.data-tone]=\"stateOf(departure.status).tone\">\n                    {{ departure.statusLabel }}\n                  </span>\n                </td>\n                <td class=\"cell-actions\">\n                  <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                          (click)=\"openReview(departure)\">\n                    {{ departure.editable ? 'Traiter' : 'Voir' }}\n                  </button>\n                </td>\n              </tr>\n            } @empty {\n              <tr>\n                <td colspan=\"7\">\n                  <div class=\"empty-state\">\n                    <p class=\"empty-state__title\">Aucun d\u00E9part enregistr\u00E9 cette ann\u00E9e.</p>\n                    <p class=\"empty-state__text\">\n                      Une sortie cl\u00F4t l'inscription et ouvre la liste des pi\u00E8ces \u00E0\n                      remettre : exeat, certificat de radiation, dernier bulletin,\n                      dossier scolaire.\n                    </p>\n                    <button type=\"button\" class=\"btn btn--primary\" (click)=\"openDeparture()\">\n                      Enregistrer un d\u00E9part\n                    </button>\n                  </div>\n                </td>\n              </tr>\n            }\n          </tbody>\n        </table>\n      </div>\n    }\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Changement de classe \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (changeOpen()) {\n    <div class=\"drawer-backdrop\" (click)=\"closeChange()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"change-title\">\n      <header class=\"drawer__head\">\n        <h2 class=\"drawer__title\" id=\"change-title\">Changer un \u00E9l\u00E8ve de classe</h2>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeChange()\">\u00D7</button>\n      </header>\n\n      <form class=\"drawer__body\" [formGroup]=\"changeForm\" (ngSubmit)=\"submitChange()\">\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"change-student\">\u00C9l\u00E8ve</label>\n          <select id=\"change-student\" class=\"input\" formControlName=\"studentId\">\n            <option value=\"\">Choisir\u2026</option>\n            @for (student of studentList(); track student.id) {\n              <option [value]=\"student.id\">\n                {{ student.fullName }} \u2014 {{ student.classroomName }}\n              </option>\n            }\n          </select>\n        </div>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"change-target\">\n            Classe d'accueil\n          </label>\n          <select id=\"change-target\" class=\"input\" formControlName=\"toClassroomId\">\n            <option value=\"\">Choisir\u2026</option>\n            @for (classroom of classroomList(); track classroom.id) {\n              <option [value]=\"classroom.id\">\n                {{ classroom.name }} ({{ classroom.activeEnrollments }}/{{ classroom.capacityMaximum }})\n              </option>\n            }\n          </select>\n          @if (changeTarget(); as target) {\n            @if (target.availableSeats <= 0) {\n              <span class=\"field__hint field__hint--warn\">\n                {{ target.name }} est compl\u00E8te. Une d\u00E9rogation explicite est n\u00E9cessaire.\n              </span>\n            } @else {\n              <span class=\"field__hint\">\n                {{ target.availableSeats }} place(s) restante(s) sur {{ target.capacityMaximum }}.\n              </span>\n            }\n          }\n        </div>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"change-reason\">Motif</label>\n          <textarea id=\"change-reason\" class=\"textarea\" rows=\"3\" formControlName=\"reason\"\n                    placeholder=\"R\u00E9\u00E9quilibrage des effectifs apr\u00E8s trois arriv\u00E9es en 6e A\"></textarea>\n          <span class=\"field__hint\">\n            Il reste au dossier et se relit au conseil de classe.\n          </span>\n        </div>\n\n        <label class=\"switch\">\n          <input type=\"checkbox\" formControlName=\"overrideCapacity\" />\n          <span>\n            Passer outre la capacit\u00E9 de la classe d'accueil\n            <small>\u00C0 r\u00E9server aux cas o\u00F9 la d\u00E9cision est d\u00E9j\u00E0 prise ailleurs. La\n              d\u00E9rogation laisse une trace au dossier.</small>\n          </span>\n        </label>\n      </form>\n\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeChange()\">Annuler</button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"changeForm.invalid || saving()\"\n                (click)=\"submitChange()\">Enregistrer le changement</button>\n      </footer>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Enregistrer un d\u00E9part \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (departureOpen()) {\n    <div class=\"drawer-backdrop\" (click)=\"closeDeparture()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"departure-title\">\n      <header class=\"drawer__head\">\n        <h2 class=\"drawer__title\" id=\"departure-title\">Enregistrer un d\u00E9part</h2>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeDeparture()\">\u00D7</button>\n      </header>\n\n      <form class=\"drawer__body\" [formGroup]=\"departureForm\" (ngSubmit)=\"submitDeparture()\">\n        <p class=\"hint-block\">\n          L'inscription sera close et l'\u00E9l\u00E8ve retir\u00E9 des effectifs. Le solde d\u00FB est\n          relev\u00E9 maintenant et fig\u00E9 sur le dossier : recalcul\u00E9 plus tard, il donnerait\n          un autre chiffre que celui annonc\u00E9 \u00E0 la famille.\n        </p>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"dep-student\">\u00C9l\u00E8ve</label>\n          <select id=\"dep-student\" class=\"input\" formControlName=\"studentId\">\n            <option value=\"\">Choisir\u2026</option>\n            @for (student of studentList(); track student.id) {\n              <option [value]=\"student.id\">\n                {{ student.fullName }} \u2014 {{ student.classroomName }}\n              </option>\n            }\n          </select>\n        </div>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"dep-reason\">Motif</label>\n          <select id=\"dep-reason\" class=\"input\" formControlName=\"reason\">\n            @for (reason of reasons; track reason.code) {\n              <option [value]=\"reason.code\">{{ reason.label }}</option>\n            }\n          </select>\n          @if (reasonHint(departureForm.controls.reason.value); as hint) {\n            <span class=\"field__hint\">{{ hint }}</span>\n          }\n        </div>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"dep-date\">\n            Dernier jour de pr\u00E9sence\n          </label>\n          <input id=\"dep-date\" type=\"date\" class=\"input\" formControlName=\"departureDate\" />\n          <span class=\"field__hint\">\n            Peut \u00EAtre \u00E0 venir : une famille annonce souvent son d\u00E9part pour la fin\n            du mois.\n          </span>\n        </div>\n\n        @if (needsDestination()) {\n          <div class=\"grid2\">\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"dep-school\">\n                \u00C9tablissement d'accueil\n              </label>\n              <input id=\"dep-school\" class=\"input\" formControlName=\"destinationSchool\"\n                     placeholder=\"Coll\u00E8ge Moderne de Cocody\" />\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label\" for=\"dep-city\">Ville</label>\n              <input id=\"dep-city\" class=\"input\" formControlName=\"destinationCity\"\n                     placeholder=\"Abidjan\" />\n            </div>\n          </div>\n          <p class=\"hint-block hint-block--warn\">\n            Sans le nom de l'\u00E9tablissement, l'exeat ne peut pas \u00EAtre rapproch\u00E9 par\n            l'\u00E9cole d'accueil.\n          </p>\n        }\n\n        <div class=\"field\">\n          <label class=\"field__label\" for=\"dep-notes\">Observation</label>\n          <textarea id=\"dep-notes\" class=\"textarea\" rows=\"2\" formControlName=\"notes\"\n                    placeholder=\"Famille re\u00E7ue au secr\u00E9tariat, pi\u00E8ces annonc\u00E9es.\"></textarea>\n        </div>\n      </form>\n\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeDeparture()\">\n          Annuler\n        </button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"departureForm.invalid || saving()\"\n                (click)=\"submitDeparture()\">Enregistrer la sortie</button>\n      </footer>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Dossier de sortie \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (reviewing(); as departure) {\n    <div class=\"drawer-backdrop\" (click)=\"closeReview()\"></div>\n    <aside class=\"drawer drawer--wide\" role=\"dialog\" aria-modal=\"true\"\n           aria-labelledby=\"review-title\">\n      <header class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"review-title\">{{ departure.studentName }}</h2>\n          <p class=\"drawer__meta numeric\">\n            {{ departure.classroomName }} \u00B7 {{ departure.reasonLabel }} \u00B7\n            {{ formatDate(departure.departureDate) }}\n          </p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeReview()\">\u00D7</button>\n      </header>\n\n      <div class=\"sheet-counters numeric\">\n        <span class=\"sheet-counters__item\">\n          <strong>{{ departure.documentsIssued }}</strong> / 4 pi\u00E8ces remises\n        </span>\n        <span class=\"sheet-counters__item\"\n              [class.sheet-counters__item--due]=\"departure.outstandingAmount > 0\">\n          solde <strong>{{ formatAmount(departure.outstandingAmount) }}\n          {{ departure.currency }}</strong>\n        </span>\n        <span class=\"state\" [attr.data-tone]=\"stateOf(departure.status).tone\">\n          {{ departure.statusLabel }}\n        </span>\n      </div>\n\n      @if (departure.outstandingAmount > 0) {\n        <p class=\"hint-block hint-block--inset\">\n          Cette famille doit encore {{ formatAmount(departure.outstandingAmount) }}\n          {{ departure.currency }}. Le montant est not\u00E9 au dossier et ne bloque pas la\n          remise des pi\u00E8ces : c'est une information pour le recouvrement, pas un\n          moyen de pression.\n        </p>\n      }\n\n      @if (departure.status === 'CANCELLED') {\n        <p class=\"hint-block hint-block--inset\">\n          Sortie annul\u00E9e : {{ departure.cancelledReason }}\n        </p>\n      }\n\n      <div class=\"drawer__body\">\n        <ul class=\"docs-list\">\n          @for (document of documents; track document.key) {\n            <li class=\"docs-list__item\"\n                [class.docs-list__item--done]=\"documentGiven(departure, document.key)\">\n              <label class=\"docs-list__check\">\n                <input type=\"checkbox\"\n                       [checked]=\"documentGiven(departure, document.key)\"\n                       [disabled]=\"!departure.editable || saving()\"\n                       (change)=\"toggleDocument(departure, document.key)\" />\n                <span>\n                  <span class=\"docs-list__label\">{{ document.label }}</span>\n                  <small>{{ document.hint }}</small>\n                </span>\n              </label>\n            </li>\n          }\n        </ul>\n\n        @if (departure.destinationSchool) {\n          <div class=\"destination\">\n            <p class=\"destination__label\">\u00C9tablissement d'accueil</p>\n            <p class=\"destination__value\">\n              {{ departure.destinationSchool }}\n              @if (departure.destinationCity) { \u2014 {{ departure.destinationCity }} }\n            </p>\n          </div>\n        }\n\n        @if (departure.notes) {\n          <div class=\"destination\">\n            <p class=\"destination__label\">Observation</p>\n            <p class=\"destination__value\">{{ departure.notes }}</p>\n          </div>\n        }\n      </div>\n\n      <footer class=\"drawer__foot\">\n        @if (departure.editable && !departure.documentsComplete) {\n          <p class=\"drawer__warning\">\n            {{ 4 - departure.documentsIssued }} pi\u00E8ce(s) restent \u00E0 remettre.\n          </p>\n        }\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeReview()\">\n          Fermer\n        </button>\n        @if (departure.editable) {\n          <button type=\"button\" class=\"btn btn--ghost\"\n                  [disabled]=\"saving()\" (click)=\"openCancel(departure)\">\n            Annuler la sortie\n          </button>\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"saving() || !departure.documentsComplete\"\n                  (click)=\"clearDeparture(departure)\">\n            Solder le dossier\n          </button>\n        }\n      </footer>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Annulation d'une sortie \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (cancelling(); as departure) {\n    <div class=\"drawer-backdrop\" (click)=\"closeCancel()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"cancel-title\">\n      <header class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"cancel-title\">Annuler la sortie</h2>\n          <p class=\"drawer__meta\">\n            {{ departure.studentName }} \u2014 {{ departure.classroomName }}\n          </p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeCancel()\">\u00D7</button>\n      </header>\n\n      <form class=\"drawer__body\" [formGroup]=\"cancelForm\" (ngSubmit)=\"submitCancel()\">\n        <p class=\"hint-block\">\n          L'\u00E9l\u00E8ve reprend sa place dans les effectifs et son inscription redevient\n          active. Le motif reste au dossier : un \u00E9l\u00E8ve qui r\u00E9appara\u00EEt dans une liste\n          de classe apr\u00E8s avoir \u00E9t\u00E9 radi\u00E9 demande une explication \u00E9crite, sans quoi\n          la personne suivante conclura \u00E0 un d\u00E9faut du logiciel.\n        </p>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"cancel-reason\">\n            Pourquoi cette sortie est annul\u00E9e\n          </label>\n          <textarea id=\"cancel-reason\" class=\"textarea\" rows=\"3\" formControlName=\"reason\"\n                    placeholder=\"La famille est revenue sur sa d\u00E9cision, l'\u00E9l\u00E8ve reprend en 4e A\"></textarea>\n        </div>\n      </form>\n\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeCancel()\">\n          Revenir\n        </button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"cancelForm.invalid || saving()\"\n                (click)=\"submitCancel()\">Annuler la sortie</button>\n      </footer>\n    </aside>\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n.lead {\n  max-width: 68ch;\n  margin: 0 0 var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n}\n\n.muted { color: var(--text-muted); }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Onglets \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.tabs {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n.filters {\n  display: flex;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n\n  &__search .input { width: auto; min-width: 240px; }\n}\n\n.pill {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n  &--danger { color: var(--danger); background: var(--danger-bg); }\n}\n\n/**\n * L'\u00E9tat d'une sortie porte sa couleur : \u00AB enregistr\u00E9e \u00BB veut dire qu'il reste\n * du travail, \u00AB sold\u00E9 \u00BB que la famille est repartie avec tout. Les confondre\n * fait manquer un exeat.\n */\n.state {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='todo'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='wait'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='done'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='off'] { color: var(--text-light); background: var(--surface-sunken); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Encadr\u00E9s \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.alert-block {\n  padding: var(--space-4);\n  margin-bottom: var(--space-4);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &--soft {\n    background: var(--surface-sunken);\n    border-color: var(--border-strong);\n\n    .alert-block__icon { background: var(--text-muted); }\n  }\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 22px;\n    height: 22px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-4) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n    flex-wrap: wrap;\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Tableaux \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.table-wrapper { overflow-x: auto; }\n\n.cell-actions {\n  display: flex;\n  gap: var(--space-2);\n  justify-content: flex-end;\n  white-space: nowrap;\n}\n\n.row--attention { background: var(--warning-bg); }\n.row--cancelled td { color: var(--text-light); text-decoration: line-through; }\n.row--cancelled .state { text-decoration: none; }\n\n.entry {\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__number { display: block; font-size: var(--text-xs); color: var(--text-light); }\n  &__reason { font-size: var(--text-sm); color: var(--text-muted); max-width: 34ch; }\n  &__destination {\n    display: block;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n  &__soon {\n    display: block;\n    font-size: var(--text-xs);\n    font-weight: 600;\n    color: var(--warning);\n  }\n}\n\n.move {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  flex-wrap: wrap;\n\n  &__from { color: var(--text-muted); }\n  &__arrow { color: var(--text-light); }\n  &__to { font-weight: 600; color: var(--text-strong); }\n}\n\n.owed {\n  color: var(--text-muted);\n\n  &--due { font-weight: 700; color: var(--warning); }\n}\n\n.docs {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-weight: 600;\n  color: var(--warning);\n  background: var(--warning-bg);\n  border-radius: var(--radius-badge);\n\n  &--complete { color: var(--success); background: var(--success-bg); }\n}\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 480px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneaux \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &--wide { width: min(600px, 100vw); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__close {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border-light);\n    flex-wrap: wrap;\n  }\n\n  &__warning {\n    flex: 1;\n    min-width: 180px;\n    margin: 0;\n    font-size: var(--text-xs);\n    color: var(--warning);\n  }\n}\n\n.sheet-counters {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  flex-wrap: wrap;\n\n  &__item strong { color: var(--text-strong); }\n  &__item--due strong { color: var(--warning); }\n}\n\n.grid2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block {\n  padding: var(--space-3);\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n\n  &--inset {\n    margin: 0;\n    border-radius: 0;\n    border-bottom: 1px solid var(--border-light);\n  }\n}\n\n.field__hint--warn { color: var(--warning); }\n\n.switch {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n  font-size: var(--text-sm);\n  cursor: pointer;\n\n  input { margin-top: 3px; }\n  small { display: block; margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Les quatre pi\u00E8ces \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.docs-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: 0 0 var(--space-5);\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n    border-left: 3px solid var(--border-strong);\n    border-radius: var(--radius-input);\n\n    &--done {\n      background: var(--success-bg);\n      border-left-color: var(--success);\n    }\n  }\n\n  &__check {\n    display: flex;\n    align-items: flex-start;\n    gap: var(--space-3);\n    cursor: pointer;\n\n    input { margin-top: 3px; }\n    small { display: block; margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n  }\n\n  &__label { font-weight: 600; color: var(--text-strong); }\n}\n\n.destination {\n  padding: var(--space-3);\n  margin-bottom: var(--space-3);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-input);\n\n  &__label {\n    margin: 0;\n    font-size: var(--text-xs);\n    text-transform: uppercase;\n    color: var(--text-muted);\n  }\n\n  &__value { margin: 2px 0 0; color: var(--text-strong); }\n}\n\n@include mobile {\n  .drawer,\n  .drawer--wide { width: 100vw; }\n\n  .drawer__foot { flex-direction: column; align-items: stretch; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TransfersComponent, { className: "TransfersComponent", filePath: "frontend/src/app/features/transfers/transfers.component.ts", lineNumber: 54 }); })();
/* ------------------------------------------------------------------ outils */
function isoToday() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
        + `-${String(now.getDate()).padStart(2, '0')}`;
}
/** Espace insécable comme séparateur : c'est l'usage francophone. */
function formatMoney(value) {
    return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
//# sourceMappingURL=transfers.component.js.map