import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { HEALTH_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.studentId + $item.label;
const _forTrack1 = ($index, $item) => $item.id;
const _forTrack2 = ($index, $item) => $item.value;
function HealthComponent_Conditional_7_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const b_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" \u00B7 ", b_r1.missingVaccineCount, " vaccin(s) \u00E0 r\u00E9clamer ");
} }
function HealthComponent_Conditional_7_Conditional_1_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const b_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" \u00B7 ", b_r1.overdueExaminationCount, " visite(s) en retard ");
} }
function HealthComponent_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵtemplate(1, HealthComponent_Conditional_7_Conditional_1_Conditional_1_Template, 1, 1)(2, HealthComponent_Conditional_7_Conditional_1_Conditional_2_Template, 1, 1);
} if (rf & 2) {
    const b_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", b_r1.visitCountThisWeek, " passage(s) cette semaine ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(b_r1.missingVaccineCount > 0 ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(b_r1.overdueExaminationCount > 0 ? 2 : -1);
} }
function HealthComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵtemplate(1, HealthComponent_Conditional_7_Conditional_1_Template, 3, 3);
} if (rf & 2) {
    const b_r1 = ctx;
    i0.ɵɵtextInterpolate1(" ", b_r1.alertCount, " alerte(s) en cours ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(b_r1.fullAccess ? 1 : -1);
} }
function HealthComponent_Conditional_9_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_9_Conditional_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openVisit()); });
    i0.ɵɵelementStart(1, "span", 10);
    i0.ɵɵtext(2, "\u271A");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Consigner un passage ");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_9_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_9_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openCondition()); });
    i0.ɵɵelementStart(1, "span", 10);
    i0.ɵɵtext(2, "\uFF0B");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " D\u00E9clarer une condition ");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_9_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_9_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openExam()); });
    i0.ɵɵelementStart(1, "span", 10);
    i0.ɵɵtext(2, "\uFF0B");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Programmer une visite ");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, HealthComponent_Conditional_9_Conditional_0_Template, 4, 0, "button", 8)(1, HealthComponent_Conditional_9_Conditional_1_Template, 4, 0, "button", 8)(2, HealthComponent_Conditional_9_Conditional_2_Template, 4, 0, "button", 8);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r2.tab() === "INFIRMERIE" && ctx_r2.canRecordVisit() ? 0 : ctx_r2.tab() === "FICHES" && ctx_r2.canManage() ? 1 : ctx_r2.tab() === "SUIVI" && ctx_r2.canManage() ? 2 : -1);
} }
function HealthComponent_Conditional_10_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.awaitingGuardian().length);
} }
function HealthComponent_Conditional_10_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.alerts().length);
} }
function HealthComponent_Conditional_10_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.overdueExams().length);
} }
function HealthComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "nav", 11)(1, "button", 12);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_10_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.changeTab("INFIRMERIE")); });
    i0.ɵɵtext(2, " Infirmerie ");
    i0.ɵɵtemplate(3, HealthComponent_Conditional_10_Conditional_3_Template, 2, 1, "span", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 12);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_10_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.changeTab("FICHES")); });
    i0.ɵɵtext(5, " Fiches de sant\u00E9 ");
    i0.ɵɵtemplate(6, HealthComponent_Conditional_10_Conditional_6_Template, 2, 1, "span", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 12);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_10_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.changeTab("SUIVI")); });
    i0.ɵɵtext(8, " Vaccins et visites ");
    i0.ɵɵtemplate(9, HealthComponent_Conditional_10_Conditional_9_Template, 2, 1, "span", 13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 14)(11, "label", 15)(12, "span", 16);
    i0.ɵɵtext(13, "Rechercher un \u00E9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "input", 17);
    i0.ɵɵlistener("change", function HealthComponent_Conditional_10_Template_input_change_14_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.applySearch($event.target.value)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("tabs__item--on", ctx_r2.tab() === "INFIRMERIE");
    i0.ɵɵattribute("aria-selected", ctx_r2.tab() === "INFIRMERIE");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.awaitingGuardian().length > 0 ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("tabs__item--on", ctx_r2.tab() === "FICHES");
    i0.ɵɵattribute("aria-selected", ctx_r2.tab() === "FICHES");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.alerts().length > 0 ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("tabs__item--on", ctx_r2.tab() === "SUIVI");
    i0.ɵɵattribute("aria-selected", ctx_r2.tab() === "SUIVI");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.overdueExams().length > 0 ? 9 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r2.search());
} }
function HealthComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 6);
} }
function HealthComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 18);
    i0.ɵɵlistener("retry", function HealthComponent_Conditional_12_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.load()); });
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_13_Conditional_0_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "p", 24);
    i0.ɵɵtext(2, "Aucune alerte signal\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 25);
    i0.ɵɵtext(4, " Aucun \u00E9l\u00E8ve de l'\u00E9tablissement ne fait l'objet d'une conduite \u00E0 tenir particuli\u00E8re cette ann\u00E9e. ");
    i0.ɵɵelementEnd()();
} }
function HealthComponent_Conditional_13_Conditional_0_Conditional_6_For_2_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const alert_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(alert_r8.actionToTake);
} }
function HealthComponent_Conditional_13_Conditional_0_Conditional_6_For_2_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 33);
    i0.ɵɵtext(1, " L'\u00E9l\u00E8ve garde son traitement sur lui. ");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_13_Conditional_0_Conditional_6_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 26)(1, "div", 27)(2, "div")(3, "span", 28);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 29);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 30);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "p", 31);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, HealthComponent_Conditional_13_Conditional_0_Conditional_6_For_2_Conditional_11_Template, 2, 1, "p", 32)(12, HealthComponent_Conditional_13_Conditional_0_Conditional_6_For_2_Conditional_12_Template, 2, 0, "p", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const alert_r8 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵattribute("data-tone", ctx_r2.severityTone(alert_r8.severity));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(alert_r8.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(alert_r8.classroomName);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", ctx_r2.severityTone(alert_r8.severity));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", alert_r8.severityLabel, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(alert_r8.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(alert_r8.actionToTake ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(alert_r8.selfCarried ? 12 : -1);
} }
function HealthComponent_Conditional_13_Conditional_0_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 23);
    i0.ɵɵrepeaterCreate(1, HealthComponent_Conditional_13_Conditional_0_Conditional_6_For_2_Template, 13, 8, "li", 26, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.alerts());
} }
function HealthComponent_Conditional_13_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "p", 20);
    i0.ɵɵtext(2, "Vous voyez les alertes, pas les dossiers");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 21);
    i0.ɵɵtext(4, " Le d\u00E9tail m\u00E9dical reste \u00E0 l'infirmerie et \u00E0 la direction. Ce qui suit est ce qu'il faut savoir pour agir : la conduite \u00E0 tenir, et rien d'autre. Ces informations ne se commentent pas devant la classe. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(5, HealthComponent_Conditional_13_Conditional_0_Conditional_5_Template, 5, 0, "div", 22)(6, HealthComponent_Conditional_13_Conditional_0_Conditional_6_Template, 3, 0, "ul", 23);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r2.alerts().length === 0 ? 5 : 6);
} }
function HealthComponent_Conditional_13_Conditional_1_Conditional_0_For_11_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 45);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_13_Conditional_1_Conditional_0_For_11_Conditional_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const visit_r10 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.markNotified(visit_r10)); });
    i0.ɵɵtext(1, " Famille jointe ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", ctx_r2.saving());
} }
function HealthComponent_Conditional_13_Conditional_1_Conditional_0_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 41)(1, "span", 42);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 43);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, HealthComponent_Conditional_13_Conditional_1_Conditional_0_For_11_Conditional_5_Template, 2, 1, "button", 44);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const visit_r10 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(visit_r10.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", visit_r10.complaint, " \u00B7 ", visit_r10.outcomeLabel, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.canRecordVisit() ? 5 : -1);
} }
function HealthComponent_Conditional_13_Conditional_1_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34)(1, "div", 36)(2, "span", 37);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 38);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 39);
    i0.ɵɵtext(8, " Ces \u00E9l\u00E8ves ont quitt\u00E9 l'\u00E9cole sans que la famille ait \u00E9t\u00E9 jointe. \u00C0 r\u00E9gler avant la fin de la journ\u00E9e. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "ul", 40);
    i0.ɵɵrepeaterCreate(10, HealthComponent_Conditional_13_Conditional_1_Conditional_0_For_11_Template, 6, 4, "li", 41, _forTrack1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.awaitingGuardian().length, " famille(s) \u00E0 joindre ");
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r2.awaitingGuardian());
} }
function HealthComponent_Conditional_13_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "p", 24);
    i0.ɵɵtext(2, "Aucun passage cette semaine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 25);
    i0.ɵɵtext(4, " Le registre s'ouvre sur les sept derniers jours. Consignez un passage d\u00E8s qu'un \u00E9l\u00E8ve se pr\u00E9sente, m\u00EAme pour un soin b\u00E9nin. ");
    i0.ɵɵelementEnd()();
} }
function HealthComponent_Conditional_13_Conditional_1_Conditional_2_For_23_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const visit_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("temp--high", visit_r11.temperatureCelsius >= 38);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", visit_r11.temperatureCelsius, " \u00B0C ");
} }
function HealthComponent_Conditional_13_Conditional_1_Conditional_2_For_23_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 54);
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_13_Conditional_1_Conditional_2_For_23_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const visit_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(visit_r11.referredTo);
} }
function HealthComponent_Conditional_13_Conditional_1_Conditional_2_For_23_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵtext(1, "Famille non jointe");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_13_Conditional_1_Conditional_2_For_23_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 45);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_13_Conditional_1_Conditional_2_For_23_Conditional_22_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const visit_r11 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.markNotified(visit_r11)); });
    i0.ɵɵtext(1, " Famille jointe ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", ctx_r2.saving());
} }
function HealthComponent_Conditional_13_Conditional_1_Conditional_2_For_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "span", 49);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 50);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 51);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 52);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 52);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 51);
    i0.ɵɵtemplate(14, HealthComponent_Conditional_13_Conditional_1_Conditional_2_For_23_Conditional_14_Template, 2, 3, "span", 53)(15, HealthComponent_Conditional_13_Conditional_1_Conditional_2_For_23_Conditional_15_Template, 2, 0, "span", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td")(17, "span", 30);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, HealthComponent_Conditional_13_Conditional_1_Conditional_2_For_23_Conditional_19_Template, 2, 1, "span", 55)(20, HealthComponent_Conditional_13_Conditional_1_Conditional_2_For_23_Conditional_20_Template, 2, 0, "span", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 57);
    i0.ɵɵtemplate(22, HealthComponent_Conditional_13_Conditional_1_Conditional_2_For_23_Conditional_22_Template, 2, 1, "button", 44);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const visit_r11 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("row--attention", visit_r11.awaitingGuardian);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(visit_r11.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", visit_r11.studentNumber, " \u00B7 ", visit_r11.classroomName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 14, visit_r11.occurredAt, "dd/MM \u00E0 HH:mm"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(visit_r11.complaint);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(visit_r11.careGiven);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(visit_r11.temperatureCelsius ? 14 : 15);
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-tone", ctx_r2.outcomeTone(visit_r11.outcome));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", visit_r11.outcomeLabel, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(visit_r11.referredTo ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(visit_r11.awaitingGuardian ? 20 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(visit_r11.awaitingGuardian && ctx_r2.canRecordVisit() ? 22 : -1);
} }
function HealthComponent_Conditional_13_Conditional_1_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35)(1, "table", 46)(2, "caption", 16);
    i0.ɵɵtext(3, "Registre de l'infirmerie");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "thead")(5, "tr")(6, "th", 47);
    i0.ɵɵtext(7, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th", 47);
    i0.ɵɵtext(9, "Quand");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 47);
    i0.ɵɵtext(11, "Motif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 47);
    i0.ɵɵtext(13, "Soins donn\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 47);
    i0.ɵɵtext(15, "Temp\u00E9rature");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 47);
    i0.ɵɵtext(17, "Suite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "th", 47)(19, "span", 16);
    i0.ɵɵtext(20, "Actions");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(21, "tbody");
    i0.ɵɵrepeaterCreate(22, HealthComponent_Conditional_13_Conditional_1_Conditional_2_For_23_Template, 23, 17, "tr", 48, _forTrack1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(22);
    i0.ɵɵrepeater(ctx_r2.visits());
} }
function HealthComponent_Conditional_13_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, HealthComponent_Conditional_13_Conditional_1_Conditional_0_Template, 12, 1, "div", 34)(1, HealthComponent_Conditional_13_Conditional_1_Conditional_1_Template, 5, 0, "div", 22)(2, HealthComponent_Conditional_13_Conditional_1_Conditional_2_Template, 24, 0, "div", 35);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(ctx_r2.awaitingGuardian().length > 0 ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.visits().length === 0 ? 1 : 2);
} }
function HealthComponent_Conditional_13_Conditional_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58)(1, "div", 36)(2, "span", 37);
    i0.ɵɵtext(3, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 38);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 39);
    i0.ɵɵtext(8, " Autorisation de soins manquante ou vaccin sans preuve. Rien de bloquant : ce sont des pi\u00E8ces \u00E0 r\u00E9clamer aux familles. ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.incompleteRecords().length, " fiche(s) incompl\u00E8te(s) ");
} }
function HealthComponent_Conditional_13_Conditional_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "p", 24);
    i0.ɵɵtext(2, "Aucune fiche de sant\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 25);
    i0.ɵɵtext(4, " Ouvrez une fiche en d\u00E9clarant une premi\u00E8re condition, ou en enregistrant l'autorisation de soins d'une famille. ");
    i0.ɵɵelementEnd()();
} }
function HealthComponent_Conditional_13_Conditional_2_Conditional_2_For_21_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 59);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const record_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", record_r14.alertCount, " alerte(s) ");
} }
function HealthComponent_Conditional_13_Conditional_2_Conditional_2_For_21_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 60);
    i0.ɵɵtext(1, "Autoris\u00E9s");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_13_Conditional_2_Conditional_2_For_21_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 61);
    i0.ɵɵtext(1, "Sans autorisation");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_13_Conditional_2_Conditional_2_For_21_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 62);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const record_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", record_r14.missingVaccineCount, " \u00E0 r\u00E9clamer ");
} }
function HealthComponent_Conditional_13_Conditional_2_Conditional_2_For_21_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 63);
    i0.ɵɵtext(1, "Complet");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_13_Conditional_2_Conditional_2_For_21_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "span", 49);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 50);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 51);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td");
    i0.ɵɵtemplate(9, HealthComponent_Conditional_13_Conditional_2_Conditional_2_For_21_Conditional_9_Template, 2, 1, "span", 59);
    i0.ɵɵelementStart(10, "span", 54);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtemplate(13, HealthComponent_Conditional_13_Conditional_2_Conditional_2_For_21_Conditional_13_Template, 2, 0, "span", 60)(14, HealthComponent_Conditional_13_Conditional_2_Conditional_2_For_21_Conditional_14_Template, 2, 0, "span", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtemplate(16, HealthComponent_Conditional_13_Conditional_2_Conditional_2_For_21_Conditional_16_Template, 2, 1, "span", 62)(17, HealthComponent_Conditional_13_Conditional_2_Conditional_2_For_21_Conditional_17_Template, 2, 0, "span", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td", 57)(19, "button", 64);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_13_Conditional_2_Conditional_2_For_21_Template_button_click_19_listener() { const record_r14 = i0.ɵɵrestoreView(_r13).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.review(record_r14)); });
    i0.ɵɵtext(20, " Ouvrir ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const record_r14 = ctx.$implicit;
    i0.ɵɵclassProp("row--attention", record_r14.alertCount > 0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(record_r14.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", record_r14.studentNumber, " \u00B7 ", record_r14.classroomName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r14.bloodGroup || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(record_r14.alertCount > 0 ? 9 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", record_r14.conditions.length, " au total ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(record_r14.careConsent ? 13 : 14);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(record_r14.missingVaccineCount > 0 ? 16 : 17);
} }
function HealthComponent_Conditional_13_Conditional_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35)(1, "table", 46)(2, "caption", 16);
    i0.ɵɵtext(3, "Fiches de sant\u00E9 des \u00E9l\u00E8ves");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "thead")(5, "tr")(6, "th", 47);
    i0.ɵɵtext(7, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th", 47);
    i0.ɵɵtext(9, "Groupe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 47);
    i0.ɵɵtext(11, "Conditions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 47);
    i0.ɵɵtext(13, "Soins autoris\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 47);
    i0.ɵɵtext(15, "Vaccins");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 47)(17, "span", 16);
    i0.ɵɵtext(18, "Actions");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵrepeaterCreate(20, HealthComponent_Conditional_13_Conditional_2_Conditional_2_For_21_Template, 21, 10, "tr", 48, _forTrack1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(20);
    i0.ɵɵrepeater(ctx_r2.records());
} }
function HealthComponent_Conditional_13_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, HealthComponent_Conditional_13_Conditional_2_Conditional_0_Template, 9, 1, "div", 58)(1, HealthComponent_Conditional_13_Conditional_2_Conditional_1_Template, 5, 0, "div", 22)(2, HealthComponent_Conditional_13_Conditional_2_Conditional_2_Template, 22, 0, "div", 35);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(ctx_r2.incompleteRecords().length > 0 ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.records().length === 0 ? 1 : 2);
} }
function HealthComponent_Conditional_13_Conditional_3_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34)(1, "div", 36)(2, "span", 37);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 38);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 39);
    i0.ɵɵtext(8, " Pr\u00E9vues, jamais consign\u00E9es. Une visite non pass\u00E9e reste due : elle ne se referme pas toute seule. ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.overdueExams().length, " visite(s) en retard ");
} }
function HealthComponent_Conditional_13_Conditional_3_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "p", 24);
    i0.ɵɵtext(2, "Aucune visite programm\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 25);
    i0.ɵɵtext(4, " Programmez les visites d'admission et les visites annuelles pour suivre celles qui restent \u00E0 passer. ");
    i0.ɵɵelementEnd()();
} }
function HealthComponent_Conditional_13_Conditional_3_Conditional_2_For_21_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const exam_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(exam_r15.restriction);
} }
function HealthComponent_Conditional_13_Conditional_3_Conditional_2_For_21_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵtext(1, "En retard");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_13_Conditional_3_Conditional_2_For_21_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 66);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_13_Conditional_3_Conditional_2_For_21_Conditional_20_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r16); const exam_r15 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.openResult(exam_r15)); });
    i0.ɵɵtext(1, " Consigner ");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_13_Conditional_3_Conditional_2_For_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "span", 49);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 50);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 51);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 51);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td")(15, "span", 30);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, HealthComponent_Conditional_13_Conditional_3_Conditional_2_For_21_Conditional_17_Template, 2, 1, "span", 55)(18, HealthComponent_Conditional_13_Conditional_3_Conditional_2_For_21_Conditional_18_Template, 2, 0, "span", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 57);
    i0.ɵɵtemplate(20, HealthComponent_Conditional_13_Conditional_3_Conditional_2_For_21_Conditional_20_Template, 2, 0, "button", 65);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const exam_r15 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("row--attention", exam_r15.overdue);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(exam_r15.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", exam_r15.studentNumber, " \u00B7 ", exam_r15.classroomName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(exam_r15.kindLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 13, exam_r15.scheduledOn, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", exam_r15.performedOn ? i0.ɵɵpipeBind2(13, 16, exam_r15.performedOn, "dd/MM/yyyy") : "\u2014", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-tone", ctx_r2.examTone(exam_r15.outcome));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", exam_r15.outcomeLabel, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(exam_r15.restriction ? 17 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(exam_r15.overdue ? 18 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(exam_r15.outcome === "PENDING" && ctx_r2.canManage() ? 20 : -1);
} }
function HealthComponent_Conditional_13_Conditional_3_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35)(1, "table", 46)(2, "caption", 16);
    i0.ɵɵtext(3, "Visites m\u00E9dicales");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "thead")(5, "tr")(6, "th", 47);
    i0.ɵɵtext(7, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th", 47);
    i0.ɵɵtext(9, "Visite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 47);
    i0.ɵɵtext(11, "Pr\u00E9vue le");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 47);
    i0.ɵɵtext(13, "Pass\u00E9e le");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 47);
    i0.ɵɵtext(15, "R\u00E9sultat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 47)(17, "span", 16);
    i0.ɵɵtext(18, "Actions");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵrepeaterCreate(20, HealthComponent_Conditional_13_Conditional_3_Conditional_2_For_21_Template, 21, 19, "tr", 48, _forTrack1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(20);
    i0.ɵɵrepeater(ctx_r2.examinations());
} }
function HealthComponent_Conditional_13_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, HealthComponent_Conditional_13_Conditional_3_Conditional_0_Template, 9, 1, "div", 34)(1, HealthComponent_Conditional_13_Conditional_3_Conditional_1_Template, 5, 0, "div", 22)(2, HealthComponent_Conditional_13_Conditional_3_Conditional_2_Template, 22, 0, "div", 35);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(ctx_r2.overdueExams().length > 0 ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.examinations().length === 0 ? 1 : 2);
} }
function HealthComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, HealthComponent_Conditional_13_Conditional_0_Template, 7, 1)(1, HealthComponent_Conditional_13_Conditional_1_Template, 3, 2)(2, HealthComponent_Conditional_13_Conditional_2_Template, 3, 2)(3, HealthComponent_Conditional_13_Conditional_3_Template, 3, 2);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵconditional(!ctx_r2.fullAccess() ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.fullAccess() && ctx_r2.tab() === "INFIRMERIE" ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.fullAccess() && ctx_r2.tab() === "FICHES" ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.fullAccess() && ctx_r2.tab() === "SUIVI" ? 3 : -1);
} }
function HealthComponent_Conditional_14_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 78);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const student_r18 = ctx.$implicit;
    i0.ɵɵproperty("value", student_r18.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", student_r18.fullName, " \u2014 ", student_r18.studentNumber, " ");
} }
function HealthComponent_Conditional_14_For_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 78);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const choice_r19 = ctx.$implicit;
    i0.ɵɵproperty("value", choice_r19.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(choice_r19.label);
} }
function HealthComponent_Conditional_14_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label", 74)(1, "span", 75);
    i0.ɵɵtext(2, "Orient\u00E9 vers");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "input", 90);
    i0.ɵɵelementStart(4, "span", 91);
    i0.ɵɵtext(5, " Sans ce nom, personne ne saura o\u00F9 l'\u00E9l\u00E8ve a \u00E9t\u00E9 conduit. ");
    i0.ɵɵelementEnd()();
} }
function HealthComponent_Conditional_14_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label", 85);
    i0.ɵɵelement(1, "input", 92);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, " La famille a \u00E9t\u00E9 jointe ");
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5, " Obligatoire : un \u00E9l\u00E8ve ne quitte pas l'\u00E9cole sans que quelqu'un ait \u00E9t\u00E9 pr\u00E9venu. Le serveur refusera l'enregistrement sinon. ");
    i0.ɵɵelementEnd()()();
} }
function HealthComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 67);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_14_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeVisit()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 68)(2, "div", 69)(3, "div")(4, "h2", 70);
    i0.ɵɵtext(5, "Passage \u00E0 l'infirmerie");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 71);
    i0.ɵɵtext(7, " \u00C9crivez les soins donn\u00E9s, m\u00EAme minimes. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 72);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_14_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeVisit()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 73);
    i0.ɵɵlistener("ngSubmit", function HealthComponent_Conditional_14_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitVisit()); });
    i0.ɵɵelementStart(11, "label", 74)(12, "span", 75);
    i0.ɵɵtext(13, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "select", 76)(15, "option", 77);
    i0.ɵɵtext(16, "Choisir un \u00E9l\u00E8ve\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(17, HealthComponent_Conditional_14_For_18_Template, 2, 3, "option", 78, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "label", 74)(20, "span", 75);
    i0.ɵɵtext(21, "Motif du passage");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(22, "input", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "label", 74)(24, "span", 75);
    i0.ɵɵtext(25, "Soins donn\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(26, "textarea", 80);
    i0.ɵɵelementStart(27, "span", 81);
    i0.ɵɵtext(28, " Un registre vide ne prouve rien le jour o\u00F9 une famille demande des comptes. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 82)(30, "label", 74)(31, "span", 75);
    i0.ɵɵtext(32, "Temp\u00E9rature (\u00B0C)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(33, "input", 83);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "label", 74)(35, "span", 75);
    i0.ɵɵtext(36, "Suite donn\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "select", 84);
    i0.ɵɵrepeaterCreate(38, HealthComponent_Conditional_14_For_39_Template, 2, 2, "option", 78, _forTrack2);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(40, HealthComponent_Conditional_14_Conditional_40_Template, 6, 0, "label", 74)(41, HealthComponent_Conditional_14_Conditional_41_Template, 6, 0, "label", 85);
    i0.ɵɵelementStart(42, "label", 74)(43, "span", 75);
    i0.ɵɵtext(44, "Observations (facultatif)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(45, "textarea", 86);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "div", 87)(47, "button", 88);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_14_Template_button_click_47_listener() { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeVisit()); });
    i0.ɵɵtext(48, " Annuler ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "button", 89);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_14_Template_button_click_49_listener() { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitVisit()); });
    i0.ɵɵtext(50);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("formGroup", ctx_r2.visitForm);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r2.studentList());
    i0.ɵɵadvance(21);
    i0.ɵɵrepeater(ctx_r2.outcomes);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.visitNeedsReferral() ? 40 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.visitNeedsGuardian() ? 41 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("disabled", ctx_r2.saving() || ctx_r2.visitForm.invalid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.saving() ? "Enregistrement\u2026" : "Consigner le passage", " ");
} }
function HealthComponent_Conditional_15_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 78);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const student_r21 = ctx.$implicit;
    i0.ɵɵproperty("value", student_r21.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", student_r21.fullName, " \u2014 ", student_r21.studentNumber, " ");
} }
function HealthComponent_Conditional_15_For_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 78);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const choice_r22 = ctx.$implicit;
    i0.ɵɵproperty("value", choice_r22.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(choice_r22.label);
} }
function HealthComponent_Conditional_15_For_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 78);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const choice_r23 = ctx.$implicit;
    i0.ɵɵproperty("value", choice_r23.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(choice_r23.label);
} }
function HealthComponent_Conditional_15_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 101);
    i0.ɵɵtext(1, " Cette condition sera signal\u00E9e au personnel encadrant. Ils recevront le libell\u00E9 et la conduite \u00E0 tenir \u2014 jamais le diagnostic ni le traitement. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 74)(3, "span", 75);
    i0.ɵɵtext(4, "Conduite \u00E0 tenir");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "textarea", 102);
    i0.ɵɵelementStart(6, "span", 91);
    i0.ɵɵtext(7, " Obligatoire. \u00C9crivez pour quelqu'un qui n'est pas soignant et qui doit agir tout de suite. ");
    i0.ɵɵelementEnd()();
} }
function HealthComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 67);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_15_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r20); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeCondition()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 93)(2, "div", 69)(3, "div")(4, "h2", 94);
    i0.ɵɵtext(5, "D\u00E9clarer une condition");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 71);
    i0.ɵɵtext(7, " Allergie, maladie chronique, traitement en cours. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 72);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_15_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r20); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeCondition()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 73);
    i0.ɵɵlistener("ngSubmit", function HealthComponent_Conditional_15_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r20); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitCondition()); });
    i0.ɵɵelementStart(11, "label", 74)(12, "span", 75);
    i0.ɵɵtext(13, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "select", 76)(15, "option", 77);
    i0.ɵɵtext(16, "Choisir un \u00E9l\u00E8ve\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(17, HealthComponent_Conditional_15_For_18_Template, 2, 3, "option", 78, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 82)(20, "label", 74)(21, "span", 75);
    i0.ɵɵtext(22, "Nature");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "select", 95);
    i0.ɵɵrepeaterCreate(24, HealthComponent_Conditional_15_For_25_Template, 2, 2, "option", 78, _forTrack2);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "label", 74)(27, "span", 75);
    i0.ɵɵtext(28, "Gravit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "select", 96);
    i0.ɵɵrepeaterCreate(30, HealthComponent_Conditional_15_For_31_Template, 2, 2, "option", 78, _forTrack2);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(32, "label", 74)(33, "span", 75);
    i0.ɵɵtext(34, "Libell\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(35, "input", 97);
    i0.ɵɵelementStart(36, "span", 81);
    i0.ɵɵtext(37, " Court et clair : c'est ce que lira un professeur, hors contexte. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(38, HealthComponent_Conditional_15_Conditional_38_Template, 8, 0);
    i0.ɵɵelementStart(39, "label", 74)(40, "span", 75);
    i0.ɵɵtext(41, "Description (reste \u00E0 l'infirmerie)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(42, "textarea", 98);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "label", 74)(44, "span", 75);
    i0.ɵɵtext(45, "M\u00E9dicament (reste \u00E0 l'infirmerie)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(46, "input", 99);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "label", 85);
    i0.ɵɵelement(48, "input", 100);
    i0.ɵɵelementStart(49, "span");
    i0.ɵɵtext(50, " L'\u00E9l\u00E8ve garde son traitement sur lui ");
    i0.ɵɵelementStart(51, "small");
    i0.ɵɵtext(52, "Inhalateur, stylo auto-injecteur : \u00E0 savoir en cas d'urgence.");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(53, "div", 87)(54, "button", 88);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_15_Template_button_click_54_listener() { i0.ɵɵrestoreView(_r20); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeCondition()); });
    i0.ɵɵtext(55, " Annuler ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "button", 89);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_15_Template_button_click_56_listener() { i0.ɵɵrestoreView(_r20); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitCondition()); });
    i0.ɵɵtext(57);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("formGroup", ctx_r2.conditionForm);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r2.studentList());
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r2.kinds);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r2.severities);
    i0.ɵɵadvance(8);
    i0.ɵɵconditional(ctx_r2.severityIsAlert() ? 38 : -1);
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("disabled", ctx_r2.saving() || ctx_r2.conditionForm.invalid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.saving() ? "Enregistrement\u2026" : "Porter \u00E0 la fiche", " ");
} }
function HealthComponent_Conditional_16_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const record_r25 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 Groupe ", record_r25.bloodGroup, " ");
} }
function HealthComponent_Conditional_16_Conditional_20_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const record_r25 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" \u2014 ", record_r25.physicianPhone, " ");
} }
function HealthComponent_Conditional_16_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 107);
    i0.ɵɵtext(1, " M\u00E9decin : ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, HealthComponent_Conditional_16_Conditional_20_Conditional_4_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const record_r25 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(record_r25.physicianName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(record_r25.physicianPhone ? 4 : -1);
} }
function HealthComponent_Conditional_16_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 101);
    i0.ɵɵtext(1, " Les parents n'ont pas autoris\u00E9 les premiers soins. Sans cette autorisation, l'infirmerie ne peut qu'appeler la famille. ");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_16_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 45);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_16_Conditional_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r26); const record_r25 = i0.ɵɵnextContext(); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleConsent(record_r25)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const record_r25 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r2.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", record_r25.careConsent ? "Retirer l'autorisation de soins" : "Enregistrer l'autorisation de soins", " ");
} }
function HealthComponent_Conditional_16_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 54);
    i0.ɵɵtext(1, "Aucune condition port\u00E9e \u00E0 cette fiche.");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_16_Conditional_27_For_2_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 117);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const condition_r27 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(condition_r27.description);
} }
function HealthComponent_Conditional_16_Conditional_27_For_2_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 118)(1, "strong");
    i0.ɵɵtext(2, "Conduite \u00E0 tenir :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const condition_r27 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", condition_r27.actionToTake, " ");
} }
function HealthComponent_Conditional_16_Conditional_27_For_2_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 117);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const condition_r27 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("M\u00E9dicament : ", condition_r27.medication, "");
} }
function HealthComponent_Conditional_16_Conditional_27_For_2_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 117);
    i0.ɵɵtext(1, "L'\u00E9l\u00E8ve garde son traitement sur lui.");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_16_Conditional_27_For_2_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 119);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const condition_r27 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Close le ", i0.ɵɵpipeBind2(2, 1, condition_r27.resolvedOn, "dd/MM/yyyy"), " ");
} }
function HealthComponent_Conditional_16_Conditional_27_For_2_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 121);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_16_Conditional_27_For_2_Conditional_13_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r28); const condition_r27 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.resolveCondition(condition_r27.id)); });
    i0.ɵɵtext(1, " Clore ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("disabled", ctx_r2.saving());
} }
function HealthComponent_Conditional_16_Conditional_27_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 113)(1, "div", 114)(2, "span", 115);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 30);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p", 116);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, HealthComponent_Conditional_16_Conditional_27_For_2_Conditional_8_Template, 2, 1, "p", 117)(9, HealthComponent_Conditional_16_Conditional_27_For_2_Conditional_9_Template, 4, 1, "p", 118)(10, HealthComponent_Conditional_16_Conditional_27_For_2_Conditional_10_Template, 2, 1, "p", 117)(11, HealthComponent_Conditional_16_Conditional_27_For_2_Conditional_11_Template, 2, 0, "p", 117)(12, HealthComponent_Conditional_16_Conditional_27_For_2_Conditional_12_Template, 3, 4, "p", 119)(13, HealthComponent_Conditional_16_Conditional_27_For_2_Conditional_13_Template, 2, 1, "button", 120);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const condition_r27 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("docs-list__item--closed", !condition_r27.active);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(condition_r27.label);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", ctx_r2.severityTone(condition_r27.severity));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", condition_r27.severityLabel, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(condition_r27.kindLabel);
    i0.ɵɵadvance();
    i0.ɵɵconditional(condition_r27.description ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(condition_r27.actionToTake ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(condition_r27.medication ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(condition_r27.selfCarried ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!condition_r27.active ? 12 : ctx_r2.canManage() ? 13 : -1);
} }
function HealthComponent_Conditional_16_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 110);
    i0.ɵɵrepeaterCreate(1, HealthComponent_Conditional_16_Conditional_27_For_2_Template, 14, 11, "li", 112, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const record_r25 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(record_r25.conditions);
} }
function HealthComponent_Conditional_16_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 54);
    i0.ɵɵtext(1, "Aucun vaccin enregistr\u00E9.");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_16_Conditional_31_For_2_Conditional_6_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 45);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_16_Conditional_31_For_2_Conditional_6_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r29); const shot_r30 = i0.ɵɵnextContext(2).$implicit; const record_r25 = i0.ɵɵnextContext(2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.markCertificateSeen(record_r25, shot_r30.vaccineId, shot_r30.dosesExpected)); });
    i0.ɵɵtext(1, " Carnet vu, doses \u00E0 jour ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", ctx_r2.saving());
} }
function HealthComponent_Conditional_16_Conditional_31_For_2_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 117);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, HealthComponent_Conditional_16_Conditional_31_For_2_Conditional_6_Conditional_2_Template, 2, 1, "button", 44);
} if (rf & 2) {
    const shot_r30 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", shot_r30.certificateSeen ? "Doses incompl\u00E8tes : \u00E0 compl\u00E9ter." : "Carnet non pr\u00E9sent\u00E9 : preuve \u00E0 r\u00E9clamer \u00E0 la famille.", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.canManage() ? 2 : -1);
} }
function HealthComponent_Conditional_16_Conditional_31_For_2_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 119);
    i0.ɵɵtext(1, "Non exig\u00E9 par l'\u00E9tablissement.");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_16_Conditional_31_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 113)(1, "div", 114)(2, "span", 115);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 123);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, HealthComponent_Conditional_16_Conditional_31_For_2_Conditional_6_Template, 3, 2)(7, HealthComponent_Conditional_16_Conditional_31_For_2_Conditional_7_Template, 2, 0, "p", 119);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const shot_r30 = ctx.$implicit;
    i0.ɵɵclassProp("docs-list__item--done", shot_r30.complete);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(shot_r30.vaccineLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", shot_r30.dosesReceived, " / ", shot_r30.dosesExpected, " dose(s) ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(shot_r30.outstanding ? 6 : !shot_r30.required ? 7 : -1);
} }
function HealthComponent_Conditional_16_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 110);
    i0.ɵɵrepeaterCreate(1, HealthComponent_Conditional_16_Conditional_31_For_2_Template, 8, 6, "li", 122, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const record_r25 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(record_r25.vaccinations);
} }
function HealthComponent_Conditional_16_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 88);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_16_Conditional_33_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r31); const record_r25 = i0.ɵɵnextContext(); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openCondition(record_r25.studentId)); });
    i0.ɵɵtext(1, " D\u00E9clarer une condition ");
    i0.ɵɵelementEnd();
} }
function HealthComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 67);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_16_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r24); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeReview()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 103)(2, "div", 69)(3, "div")(4, "h2", 104);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 105);
    i0.ɵɵtext(7);
    i0.ɵɵtemplate(8, HealthComponent_Conditional_16_Conditional_8_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 72);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_16_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r24); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeReview()); });
    i0.ɵɵtext(10, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 106)(12, "span", 107)(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(15, " alerte(s) ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 107)(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(19, " vaccin(s) \u00E0 r\u00E9clamer ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, HealthComponent_Conditional_16_Conditional_20_Template, 5, 2, "span", 107);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 108);
    i0.ɵɵtemplate(22, HealthComponent_Conditional_16_Conditional_22_Template, 2, 0, "div", 101)(23, HealthComponent_Conditional_16_Conditional_23_Template, 2, 2, "button", 44);
    i0.ɵɵelementStart(24, "h3", 109);
    i0.ɵɵtext(25, "Conditions d\u00E9clar\u00E9es");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(26, HealthComponent_Conditional_16_Conditional_26_Template, 2, 0, "p", 54)(27, HealthComponent_Conditional_16_Conditional_27_Template, 3, 0, "ul", 110);
    i0.ɵɵelementStart(28, "h3", 109);
    i0.ɵɵtext(29, "Carnet de vaccination");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(30, HealthComponent_Conditional_16_Conditional_30_Template, 2, 0, "p", 54)(31, HealthComponent_Conditional_16_Conditional_31_Template, 3, 0, "ul", 110);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "div", 87);
    i0.ɵɵtemplate(33, HealthComponent_Conditional_16_Conditional_33_Template, 2, 0, "button", 111);
    i0.ɵɵelementStart(34, "button", 9);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_16_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r24); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeReview()); });
    i0.ɵɵtext(35, " Fermer ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const record_r25 = ctx;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(record_r25.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", record_r25.studentNumber, " \u00B7 ", record_r25.classroomName, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(record_r25.bloodGroup ? 8 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(record_r25.alertCount);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("sheet-counters__item--due", record_r25.missingVaccineCount > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r25.missingVaccineCount);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(record_r25.physicianName ? 20 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!record_r25.careConsent ? 22 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.canManage() ? 23 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(record_r25.conditions.length === 0 ? 26 : 27);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(record_r25.vaccinations.length === 0 ? 30 : 31);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r2.canManage() ? 33 : -1);
} }
function HealthComponent_Conditional_17_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 78);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const student_r33 = ctx.$implicit;
    i0.ɵɵproperty("value", student_r33.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", student_r33.fullName, " \u2014 ", student_r33.studentNumber, " ");
} }
function HealthComponent_Conditional_17_For_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 78);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const choice_r34 = ctx.$implicit;
    i0.ɵɵproperty("value", choice_r34.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(choice_r34.label);
} }
function HealthComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 67);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_17_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r32); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeExam()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 124)(2, "div", 69)(3, "div")(4, "h2", 125);
    i0.ɵɵtext(5, "Programmer une visite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 71);
    i0.ɵɵtext(7, "Une seule visite de chaque type par \u00E9l\u00E8ve et par ann\u00E9e.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 72);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_17_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r32); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeExam()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 73);
    i0.ɵɵlistener("ngSubmit", function HealthComponent_Conditional_17_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r32); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitExam()); });
    i0.ɵɵelementStart(11, "label", 74)(12, "span", 75);
    i0.ɵɵtext(13, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "select", 76)(15, "option", 77);
    i0.ɵɵtext(16, "Choisir un \u00E9l\u00E8ve\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(17, HealthComponent_Conditional_17_For_18_Template, 2, 3, "option", 78, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 82)(20, "label", 74)(21, "span", 75);
    i0.ɵɵtext(22, "Type de visite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "select", 95);
    i0.ɵɵrepeaterCreate(24, HealthComponent_Conditional_17_For_25_Template, 2, 2, "option", 78, _forTrack2);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "label", 74)(27, "span", 75);
    i0.ɵɵtext(28, "Pr\u00E9vue le");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(29, "input", 126);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "label", 74)(31, "span", 75);
    i0.ɵɵtext(32, "Praticien (facultatif)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(33, "input", 127);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div", 87)(35, "button", 88);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_17_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r32); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeExam()); });
    i0.ɵɵtext(36, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "button", 89);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_17_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r32); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitExam()); });
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("formGroup", ctx_r2.examForm);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r2.studentList());
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r2.examKinds);
    i0.ɵɵadvance(13);
    i0.ɵɵproperty("disabled", ctx_r2.saving() || ctx_r2.examForm.invalid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.saving() ? "Enregistrement\u2026" : "Programmer", " ");
} }
function HealthComponent_Conditional_18_For_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 78);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const choice_r36 = ctx.$implicit;
    i0.ɵɵproperty("value", choice_r36.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(choice_r36.label);
} }
function HealthComponent_Conditional_18_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label", 74)(1, "span", 75);
    i0.ɵɵtext(2, "R\u00E9serve prononc\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "textarea", 131);
    i0.ɵɵelementStart(4, "span", 91);
    i0.ɵɵtext(5, " Obligatoire : sans elle, le professeur d'\u00E9ducation physique ne sait pas quoi am\u00E9nager. ");
    i0.ɵɵelementEnd()();
} }
function HealthComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 67);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_18_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r35); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeResult()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 128)(2, "div", 69)(3, "div")(4, "h2", 129);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 71);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 72);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_18_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r35); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeResult()); });
    i0.ɵɵtext(10, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "form", 73);
    i0.ɵɵlistener("ngSubmit", function HealthComponent_Conditional_18_Template_form_ngSubmit_11_listener() { i0.ɵɵrestoreView(_r35); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitResult()); });
    i0.ɵɵelementStart(12, "label", 74)(13, "span", 75);
    i0.ɵɵtext(14, "R\u00E9sultat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "select", 84);
    i0.ɵɵrepeaterCreate(16, HealthComponent_Conditional_18_For_17_Template, 2, 2, "option", 78, _forTrack2);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "label", 74)(19, "span", 75);
    i0.ɵɵtext(20, "Pass\u00E9e le");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "input", 130);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(22, HealthComponent_Conditional_18_Conditional_22_Template, 6, 0, "label", 74);
    i0.ɵɵelementStart(23, "label", 74)(24, "span", 75);
    i0.ɵɵtext(25, "Observations (facultatif)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(26, "textarea", 86);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 87)(28, "button", 88);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_18_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r35); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeResult()); });
    i0.ɵɵtext(29, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 89);
    i0.ɵɵlistener("click", function HealthComponent_Conditional_18_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r35); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submitResult()); });
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const exam_r37 = ctx;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(exam_r37.kindLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", exam_r37.studentName, " \u00B7 pr\u00E9vue le ", i0.ɵɵpipeBind2(8, 7, exam_r37.scheduledOn, "dd/MM/yyyy"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("formGroup", ctx_r2.resultForm);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r2.examOutcomes);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r2.resultNeedsRestriction() ? 22 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("disabled", ctx_r2.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.saving() ? "Enregistrement\u2026" : "Consigner le r\u00E9sultat", " ");
} }
/**
 * School health: the infirmary, the files, the follow-up.
 *
 * <p>The screen has two shapes and the server decides which. A caller without
 * HEALTH_RECORD_VIEW receives only the alerts — the medical detail was never
 * sent, so there is nothing here to hide. That is deliberate: a confidentiality
 * rule enforced by a client is not a rule, it is a suggestion that anyone can
 * read past by opening their own browser's network tab.</p>
 *
 * <p>What supervising staff do get is the label and the action to take. A
 * teacher on a field trip who does not know a pupil carries an adrenaline pen
 * cannot use it, and secrecy that costs a child their life is not privacy.</p>
 */
export class HealthComponent {
    dataSource = inject(HEALTH_DATA_SOURCE);
    students = inject(STUDENT_DATA_SOURCE);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    totalSteps = 3;
    tab = signal('INFIRMERIE');
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    board = signal(null);
    search = signal('');
    studentList = signal([]);
    vaccineList = signal([]);
    visitOpen = signal(false);
    conditionOpen = signal(false);
    examOpen = signal(false);
    /** La fiche ouverte en détail ; nulle quand le panneau est fermé. */
    reviewing = signal(null);
    resulting = signal(null);
    severities = [
        { value: 'LOW', label: 'Pour information' },
        { value: 'MODERATE', label: 'À connaître' },
        { value: 'HIGH', label: 'Alerte — signalée aux encadrants' },
        { value: 'CRITICAL', label: 'Alerte vitale — signalée aux encadrants' }
    ];
    kinds = [
        { value: 'ALLERGY', label: 'Allergie' },
        { value: 'CHRONIC_ILLNESS', label: 'Maladie chronique' },
        { value: 'TREATMENT', label: 'Traitement en cours' },
        { value: 'DISABILITY', label: 'Situation de handicap' },
        { value: 'DIETARY', label: 'Régime alimentaire' },
        { value: 'OTHER', label: 'Autre' }
    ];
    outcomes = [
        { value: 'BACK_TO_CLASS', label: 'Reparti en cours' },
        { value: 'RESTED', label: 'Gardé en observation' },
        { value: 'SENT_HOME', label: 'Confié à la famille' },
        { value: 'REFERRED', label: 'Orienté vers un centre de santé' },
        { value: 'EMERGENCY', label: 'Évacuation en urgence' }
    ];
    examKinds = [
        { value: 'ENTRY', label: "Visite d'admission" },
        { value: 'ANNUAL', label: 'Visite annuelle' },
        { value: 'SPORT', label: 'Aptitude au sport' },
        { value: 'VISION', label: 'Dépistage visuel' },
        { value: 'HEARING', label: 'Dépistage auditif' },
        { value: 'DENTAL', label: 'Dépistage dentaire' }
    ];
    examOutcomes = [
        { value: 'FIT', label: 'Apte' },
        { value: 'FIT_WITH_RESERVE', label: 'Apte avec réserve' },
        { value: 'UNFIT', label: 'Inapte' },
        { value: 'REFERRED', label: 'Orienté vers un spécialiste' },
        { value: 'MISSED', label: 'Ne s\'est pas présenté' }
    ];
    visitForm = this.fb.nonNullable.group({
        studentId: ['', [Validators.required]],
        complaint: ['', [Validators.required, Validators.maxLength(200)]],
        careGiven: ['', [Validators.required]],
        temperatureCelsius: [null],
        outcome: ['BACK_TO_CLASS', [Validators.required]],
        guardianNotified: [false],
        referredTo: [''],
        notes: ['']
    });
    conditionForm = this.fb.nonNullable.group({
        studentId: ['', [Validators.required]],
        kind: ['ALLERGY', [Validators.required]],
        label: ['', [Validators.required, Validators.maxLength(160)]],
        severity: ['MODERATE', [Validators.required]],
        description: [''],
        actionToTake: [''],
        medication: [''],
        selfCarried: [false]
    });
    examForm = this.fb.nonNullable.group({
        studentId: ['', [Validators.required]],
        kind: ['ANNUAL', [Validators.required]],
        scheduledOn: ['', [Validators.required]],
        practitioner: ['']
    });
    resultForm = this.fb.nonNullable.group({
        outcome: ['FIT', [Validators.required]],
        performedOn: [''],
        restriction: [''],
        notes: ['']
    });
    /**
     * Vrai quand l'appelant reçoit le dossier complet.
     *
     * <p>Lu sur la réponse du serveur, pas sur le jeton local : c'est le serveur
     * qui décide, l'écran ne fait que constater ce qu'il a reçu.</p>
     */
    fullAccess = computed(() => this.board()?.fullAccess ?? false);
    /** Le droit d'écrire, distinct de celui de lire. */
    canManage = computed(() => this.auth.has(PERMISSIONS.HEALTH_RECORD_MANAGE));
    canRecordVisit = computed(() => this.auth.has(PERMISSIONS.HEALTH_VISIT_RECORD));
    alerts = computed(() => this.board()?.alerts ?? []);
    records = computed(() => this.board()?.records ?? []);
    visits = computed(() => this.board()?.visits ?? []);
    examinations = computed(() => this.board()?.examinations ?? []);
    /** Les passages du jour restés sans appel à la famille. */
    awaitingGuardian = computed(() => this.visits().filter((visit) => visit.awaitingGuardian));
    /** Les fiches auxquelles il manque une pièce : autorisation ou vaccin. */
    incompleteRecords = computed(() => this.records().filter((record) => !record.careConsent || record.missingVaccineCount > 0));
    overdueExams = computed(() => this.examinations().filter((examination) => examination.overdue));
    /** Vrai quand la gravité choisie fait de la condition une alerte. */
    severityIsAlert = computed(() => {
        const value = this.conditionForm.controls.severity.value;
        return value === 'HIGH' || value === 'CRITICAL';
    });
    help = {
        INFIRMERIE: {
            step: 1,
            title: "Le registre de l'infirmerie",
            description: "Chaque passage se consigne ici : ce dont l'élève s'est "
                + "plaint, ce qui a été fait, et comment cela s'est terminé.",
            points: [
                "Écrivez les soins donnés, même minimes. Un registre vide ne prouve "
                    + "rien le jour où une famille demande des comptes.",
                "Un élève confié à sa famille ou évacué ne peut pas être enregistré "
                    + "tant que la famille n'a pas été jointe.",
                "Une orientation demande le nom du centre : sans lui, personne ne sait "
                    + "où l'élève a été conduit."
            ],
            ctaLabel: "J'ai compris"
        },
        FICHES: {
            step: 2,
            title: 'Les fiches de santé',
            description: "La fiche suit l'enfant d'une année à l'autre. Les allergies "
                + 'ne disparaissent pas à la rentrée.',
            points: [
                "Classer une condition en « Alerte » la rend visible du personnel "
                    + "encadrant — avec la conduite à tenir, jamais le diagnostic.",
                "C'est pourquoi une alerte sans conduite à tenir est refusée : "
                    + "prévenir d'un danger sans dire quoi faire n'aide personne.",
                "L'autorisation écrite des parents conditionne les premiers soins. "
                    + "Sans elle, l'infirmerie ne peut qu'appeler la famille."
            ],
            ctaLabel: 'Continuer'
        },
        SUIVI: {
            step: 3,
            title: 'Vaccins et visites médicales',
            description: 'Ce qui manque au dossier, et ce qu\'il faut demander aux '
                + 'familles avant la fin du trimestre.',
            points: [
                "Un vaccin exigé mais sans preuve est signalé et relancé. Il ne bloque "
                    + "jamais la scolarité : l'enfant n'y est pour rien.",
                "Cochez « carnet vu » seulement quand le carnet a été présenté. Une "
                    + "déclaration orale de la famille n'est pas une preuve.",
                "Une aptitude sous réserve doit dire laquelle, sinon le professeur "
                    + "d'éducation physique ne sait pas quoi aménager."
            ],
            ctaLabel: 'Terminer'
        }
    };
    helpCopy = computed(() => this.help[this.tab()]);
    // ----------------------------------------------------------------- cycle
    ngOnInit() {
        forkJoin({
            students: this.students.search({ page: 0, size: 500 }),
            vaccines: this.dataSource.vaccines()
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (data) => {
                this.studentList.set(data.students.content);
                this.vaccineList.set(data.vaccines);
            },
            // Les listes de choix manquantes ne doivent pas vider l'écran.
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
                // Un appelant qui ne reçoit que les alertes n'a rien à faire sur les
                // deux autres onglets : ils seraient vides sans expliquer pourquoi.
                if (!board.fullAccess) {
                    this.tab.set('INFIRMERIE');
                }
                this.loading.set(false);
            },
            error: (err) => {
                this.loading.set(false);
                this.error.set(false);
                this.board.set({
                    academicYearId: '',
                    academicYearCode: '',
                    fullAccess: false,
                    alerts: [],
                    records: [],
                    visits: [],
                    examinations: [],
                    alertCount: 0,
                    visitCountThisWeek: 0,
                    awaitingGuardianCount: 0,
                    missingVaccineCount: 0,
                    missingConsentCount: 0,
                    overdueExaminationCount: 0
                });
                this.notifications.error(translateErrorCode(err?.error?.code ?? 'UNKNOWN'), 'Santé scolaire indisponible');
            }
        });
    }
    changeTab(tab) {
        this.tab.set(tab);
    }
    applySearch(value) {
        this.search.set(value);
        this.load();
    }
    // ------------------------------------------------------------- passages
    openVisit(studentId) {
        this.visitForm.reset({
            studentId: studentId ?? '',
            complaint: '',
            careGiven: '',
            temperatureCelsius: null,
            outcome: 'BACK_TO_CLASS',
            guardianNotified: false,
            referredTo: '',
            notes: ''
        });
        this.visitOpen.set(true);
    }
    closeVisit() {
        this.visitOpen.set(false);
    }
    /** Vrai quand l'issue choisie exige que la famille ait été jointe. */
    visitNeedsGuardian() {
        const outcome = this.visitForm.controls.outcome.value;
        return outcome === 'SENT_HOME' || outcome === 'EMERGENCY';
    }
    visitNeedsReferral() {
        const outcome = this.visitForm.controls.outcome.value;
        return outcome === 'REFERRED' || outcome === 'EMERGENCY';
    }
    submitVisit() {
        if (this.visitForm.invalid || this.saving()) {
            this.visitForm.markAllAsTouched();
            return;
        }
        const value = this.visitForm.getRawValue();
        this.saving.set(true);
        this.dataSource.recordVisit({
            studentId: value.studentId,
            complaint: value.complaint,
            careGiven: value.careGiven,
            temperatureCelsius: value.temperatureCelsius ?? undefined,
            outcome: value.outcome,
            guardianNotified: value.guardianNotified,
            referredTo: value.referredTo || undefined,
            notes: value.notes || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.saving.set(false);
                this.visitOpen.set(false);
                this.notifications.success('Passage consigné au registre.');
                this.load();
            },
            error: (err) => this.fail(err)
        });
    }
    markNotified(visit) {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.notifyGuardian(visit.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.saving.set(false);
                this.notifications.success(`Famille de ${visit.studentName} notée comme jointe.`);
                this.load();
            },
            error: (err) => this.fail(err)
        });
    }
    // ------------------------------------------------------------- conditions
    openCondition(studentId) {
        this.conditionForm.reset({
            studentId: studentId ?? '',
            kind: 'ALLERGY',
            label: '',
            severity: 'MODERATE',
            description: '',
            actionToTake: '',
            medication: '',
            selfCarried: false
        });
        this.conditionOpen.set(true);
    }
    closeCondition() {
        this.conditionOpen.set(false);
    }
    submitCondition() {
        if (this.conditionForm.invalid || this.saving()) {
            this.conditionForm.markAllAsTouched();
            return;
        }
        const value = this.conditionForm.getRawValue();
        // Le serveur refuse une alerte sans conduite à tenir ; on le dit ici pour
        // ne pas faire perdre un aller-retour, mais c'est bien lui qui tranche.
        if ((value.severity === 'HIGH' || value.severity === 'CRITICAL')
            && !value.actionToTake.trim()) {
            this.notifications.error(translateErrorCode('HEALTH_ACTION_REQUIRED'));
            return;
        }
        this.saving.set(true);
        this.dataSource.addCondition({
            studentId: value.studentId,
            kind: value.kind,
            label: value.label,
            severity: value.severity,
            description: value.description || undefined,
            actionToTake: value.actionToTake || undefined,
            medication: value.medication || undefined,
            selfCarried: value.selfCarried
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.saving.set(false);
                this.conditionOpen.set(false);
                this.notifications.success('Condition portée à la fiche.');
                this.load();
            },
            error: (err) => this.fail(err)
        });
    }
    resolveCondition(conditionId) {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.resolveCondition(conditionId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.saving.set(false);
                this.notifications.success('Condition close ; elle reste au dossier.');
                this.load();
            },
            error: (err) => this.fail(err)
        });
    }
    // ------------------------------------------------------------------ fiches
    review(record) {
        this.reviewing.set(record);
    }
    closeReview() {
        this.reviewing.set(null);
    }
    toggleConsent(record) {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.saveRecord({
            studentId: record.studentId,
            bloodGroup: record.bloodGroup,
            physicianName: record.physicianName,
            physicianPhone: record.physicianPhone,
            insuranceName: record.insuranceName,
            insuranceNumber: record.insuranceNumber,
            notes: record.notes,
            careConsent: !record.careConsent
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (saved) => {
                this.saving.set(false);
                this.reviewing.set(saved);
                this.notifications.success(saved.careConsent
                    ? 'Autorisation de soins enregistrée.'
                    : 'Autorisation de soins retirée.');
                this.load();
            },
            error: (err) => this.fail(err)
        });
    }
    markCertificateSeen(record, vaccineId, dosesExpected) {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.saveVaccination({
            studentId: record.studentId,
            vaccineId,
            dosesReceived: dosesExpected,
            certificateSeen: true,
            lastDoseOn: new Date().toISOString().slice(0, 10)
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.saving.set(false);
                this.notifications.success('Carnet vu, vaccin porté au dossier.');
                this.dataSource.record(record.studentId)
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe({ next: (fresh) => this.reviewing.set(fresh), error: () => undefined });
                this.load();
            },
            error: (err) => this.fail(err)
        });
    }
    // ---------------------------------------------------------------- visites
    openExam() {
        this.examForm.reset({
            studentId: '', kind: 'ANNUAL',
            scheduledOn: new Date().toISOString().slice(0, 10), practitioner: ''
        });
        this.examOpen.set(true);
    }
    closeExam() {
        this.examOpen.set(false);
    }
    submitExam() {
        if (this.examForm.invalid || this.saving()) {
            this.examForm.markAllAsTouched();
            return;
        }
        const value = this.examForm.getRawValue();
        this.saving.set(true);
        this.dataSource.planExamination({
            studentId: value.studentId,
            kind: value.kind,
            scheduledOn: value.scheduledOn,
            practitioner: value.practitioner || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.saving.set(false);
                this.examOpen.set(false);
                this.notifications.success('Visite programmée.');
                this.load();
            },
            error: (err) => this.fail(err)
        });
    }
    openResult(examination) {
        this.resultForm.reset({
            outcome: 'FIT',
            performedOn: new Date().toISOString().slice(0, 10),
            restriction: '',
            notes: ''
        });
        this.resulting.set(examination);
    }
    closeResult() {
        this.resulting.set(null);
    }
    /** Vrai quand le résultat choisi exige d'écrire la réserve. */
    resultNeedsRestriction() {
        return this.resultForm.controls.outcome.value === 'FIT_WITH_RESERVE';
    }
    submitResult() {
        const examination = this.resulting();
        if (!examination || this.resultForm.invalid || this.saving()) {
            return;
        }
        const value = this.resultForm.getRawValue();
        if (value.outcome === 'FIT_WITH_RESERVE' && !value.restriction.trim()) {
            this.notifications.error(translateErrorCode('EXAMINATION_RESTRICTION_REQUIRED'));
            return;
        }
        this.saving.set(true);
        this.dataSource.recordExamination(examination.id, {
            outcome: value.outcome,
            performedOn: value.performedOn || undefined,
            restriction: value.restriction || undefined,
            notes: value.notes || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.saving.set(false);
                this.resulting.set(null);
                this.notifications.success('Résultat consigné.');
                this.load();
            },
            error: (err) => this.fail(err)
        });
    }
    // ---------------------------------------------------------------- outils
    studentName(studentId) {
        return this.studentList().find((student) => student.id === studentId)?.fullName ?? '';
    }
    /** Le ton d'une gravité, pour la pastille de couleur. */
    severityTone(severity) {
        switch (severity) {
            case 'CRITICAL': return 'critical';
            case 'HIGH': return 'high';
            case 'MODERATE': return 'moderate';
            default: return 'low';
        }
    }
    outcomeTone(outcome) {
        switch (outcome) {
            case 'EMERGENCY': return 'critical';
            case 'REFERRED': return 'high';
            case 'SENT_HOME': return 'moderate';
            default: return 'low';
        }
    }
    examTone(outcome) {
        switch (outcome) {
            case 'UNFIT': return 'critical';
            case 'MISSED':
            case 'REFERRED': return 'high';
            case 'FIT_WITH_RESERVE': return 'moderate';
            case 'PENDING': return 'todo';
            default: return 'low';
        }
    }
    fail(err) {
        this.saving.set(false);
        const code = err?.error?.code
            ?? err?.message
            ?? 'UNKNOWN';
        this.notifications.error(translateErrorCode(code));
    }
    static ɵfac = function HealthComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HealthComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HealthComponent, selectors: [["eduops-health"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 19, vars: 16, consts: [[1, "page"], ["flow", "health", "eyebrow", "Conseil pour cet onglet", 3, "stepKey", "stepNumber", "totalSteps", "title", "description", "points", "ctaLabel"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], ["message", "Chargement du dossier de sant\u00E9\u2026"], ["message", "Impossible de charger la sant\u00E9 scolaire."], ["type", "button", 1, "btn", "btn--primary"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], ["role", "tablist", 1, "tabs"], ["type", "button", "role", "tab", 1, "tabs__item", 3, "click"], [1, "tabs__badge", "numeric"], [1, "filters"], [1, "filters__search"], [1, "sr-only"], ["type", "search", "placeholder", "Nom ou matricule\u2026", 1, "input", 3, "change", "value"], ["message", "Impossible de charger la sant\u00E9 scolaire.", 3, "retry"], [1, "notice"], [1, "notice__title"], [1, "notice__text"], [1, "empty-state"], [1, "alert-cards"], [1, "empty-state__title"], [1, "empty-state__text"], [1, "alert-card"], [1, "alert-card__head"], [1, "alert-card__name"], [1, "alert-card__class"], [1, "state"], [1, "alert-card__label"], [1, "alert-card__action"], [1, "alert-card__carried"], [1, "alert-block"], [1, "table-wrapper"], [1, "alert-block__head"], ["aria-hidden", "true", 1, "alert-block__icon"], [1, "alert-block__title"], [1, "alert-block__text"], [1, "pending"], [1, "pending__item"], [1, "pending__name"], [1, "pending__cycle"], ["type", "button", 1, "btn", "btn--sm", 3, "disabled"], ["type", "button", 1, "btn", "btn--sm", 3, "click", "disabled"], [1, "table"], ["scope", "col"], [3, "row--attention"], [1, "entry__name"], [1, "entry__number", "numeric"], [1, "numeric"], [1, "entry__reason"], [3, "temp--high"], [1, "muted"], [1, "entry__destination"], [1, "entry__soon"], [1, "cell-actions"], [1, "alert-block", "alert-block--soft"], [1, "pill", "pill--danger"], ["data-tone", "low", 1, "state"], ["data-tone", "high", 1, "state"], [1, "docs"], [1, "docs", "docs--complete"], ["type", "button", 1, "btn", "btn--sm", "btn--ghost", 3, "click"], ["type", "button", 1, "btn", "btn--sm"], ["type", "button", 1, "btn", "btn--sm", 3, "click"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-labelledby", "visit-title", 1, "drawer"], [1, "drawer__head"], ["id", "visit-title", 1, "drawer__title"], [1, "drawer__meta"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "drawer__body", 3, "ngSubmit", "formGroup"], [1, "field"], [1, "field__label"], ["formControlName", "studentId", 1, "input"], ["value", ""], [3, "value"], ["type", "text", "formControlName", "complaint", "placeholder", "C\u00E9phal\u00E9es, chute dans la cour\u2026", 1, "input"], ["rows", "3", "formControlName", "careGiven", "placeholder", "Nettoyage, pansement, repos trente minutes\u2026", 1, "input"], [1, "field__hint"], [1, "grid2"], ["type", "number", "step", "0.1", "min", "30", "max", "45", "formControlName", "temperatureCelsius", "placeholder", "37.5", 1, "input"], ["formControlName", "outcome", 1, "input"], [1, "switch"], ["rows", "2", "formControlName", "notes", 1, "input"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["type", "text", "formControlName", "referredTo", "placeholder", "Centre de sant\u00E9 urbain de Cocody", 1, "input"], [1, "field__hint", "field__hint--warn"], ["type", "checkbox", "formControlName", "guardianNotified"], ["role", "dialog", "aria-labelledby", "condition-title", 1, "drawer"], ["id", "condition-title", 1, "drawer__title"], ["formControlName", "kind", 1, "input"], ["formControlName", "severity", 1, "input"], ["type", "text", "formControlName", "label", "placeholder", "Allergie aux arachides", 1, "input"], ["rows", "2", "formControlName", "description", 1, "input"], ["type", "text", "formControlName", "medication", "placeholder", "Stylo auto-injecteur", 1, "input"], ["type", "checkbox", "formControlName", "selfCarried"], [1, "hint-block", "hint-block--warn"], ["rows", "4", "formControlName", "actionToTake", "placeholder", "\u00C9carter tout aliment contenant de l'arachide. En cas de g\u00EAne respiratoire : utiliser le stylo auto-injecteur, puis appeler le 185.", 1, "input"], ["role", "dialog", "aria-labelledby", "record-title", 1, "drawer", "drawer--wide"], ["id", "record-title", 1, "drawer__title"], [1, "drawer__meta", "numeric"], [1, "sheet-counters"], [1, "sheet-counters__item"], [1, "drawer__body"], [1, "section-title"], [1, "docs-list"], ["type", "button", 1, "btn", "btn--ghost"], [1, "docs-list__item", 3, "docs-list__item--closed"], [1, "docs-list__item"], [1, "condition__head"], [1, "docs-list__label"], [1, "condition__kind"], [1, "condition__text"], [1, "condition__action"], [1, "condition__text", "muted"], ["type", "button", 1, "btn", "btn--sm", "btn--ghost", 3, "disabled"], ["type", "button", 1, "btn", "btn--sm", "btn--ghost", 3, "click", "disabled"], [1, "docs-list__item", 3, "docs-list__item--done"], [1, "numeric", "muted"], ["role", "dialog", "aria-labelledby", "exam-title", 1, "drawer"], ["id", "exam-title", 1, "drawer__title"], ["type", "date", "formControlName", "scheduledOn", 1, "input"], ["type", "text", "formControlName", "practitioner", "placeholder", "Dr Aya N'Dri, m\u00E9decine scolaire", 1, "input"], ["role", "dialog", "aria-labelledby", "result-title", 1, "drawer"], ["id", "result-title", 1, "drawer__title"], ["type", "date", "formControlName", "performedOn", 1, "input"], ["rows", "3", "formControlName", "restriction", "placeholder", "Dispense de course de fond, autres activit\u00E9s autoris\u00E9es.", 1, "input"]], template: function HealthComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "eduops-step-coachmark", 1);
            i0.ɵɵelementStart(2, "header", 2)(3, "div")(4, "h1", 3);
            i0.ɵɵtext(5, "Sant\u00E9 scolaire");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 4);
            i0.ɵɵtemplate(7, HealthComponent_Conditional_7_Template, 2, 2);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 5);
            i0.ɵɵtemplate(9, HealthComponent_Conditional_9_Template, 3, 1);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(10, HealthComponent_Conditional_10_Template, 15, 13)(11, HealthComponent_Conditional_11_Template, 1, 0, "eduops-loading-state", 6)(12, HealthComponent_Conditional_12_Template, 1, 0, "eduops-error-state", 7)(13, HealthComponent_Conditional_13_Template, 4, 4)(14, HealthComponent_Conditional_14_Template, 51, 5)(15, HealthComponent_Conditional_15_Template, 58, 4)(16, HealthComponent_Conditional_16_Template, 36, 14)(17, HealthComponent_Conditional_17_Template, 39, 3)(18, HealthComponent_Conditional_18_Template, 32, 10);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_7_0;
            let tmp_13_0;
            let tmp_15_0;
            i0.ɵɵadvance();
            i0.ɵɵproperty("stepKey", ctx.tab())("stepNumber", ctx.helpCopy().step)("totalSteps", ctx.totalSteps)("title", ctx.helpCopy().title)("description", ctx.helpCopy().description)("points", ctx.helpCopy().points)("ctaLabel", ctx.helpCopy().ctaLabel);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional((tmp_7_0 = ctx.board()) ? 7 : -1, tmp_7_0);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.fullAccess() ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.fullAccess() ? 10 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 11 : ctx.error() ? 12 : 13);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.visitOpen() ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.conditionOpen() ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_13_0 = ctx.reviewing()) ? 16 : -1, tmp_13_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.examOpen() ? 17 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_15_0 = ctx.resulting()) ? 18 : -1, tmp_15_0);
        } }, dependencies: [CommonModule, i1.DatePipe, FormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MinValidator, i2.MaxValidator, ReactiveFormsModule, i2.FormGroupDirective, i2.FormControlName, LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent], styles: ["@import 'styles/tokens';\n\n.muted[_ngcontent-%COMP%] { color: var(--text-muted); }\n\n.section-title[_ngcontent-%COMP%] {\n  margin: var(--space-5) 0 var(--space-3);\n  font-size: var(--text-sm);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text-muted);\n}\n\n\n\n\n.tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n\n  &__search .input { width: auto; min-width: 240px; }\n}\n\n\n\n\n\n\n\n\n\n\n.state[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='critical'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='high'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='moderate'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='low'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='todo'] { color: var(--text-muted); background: var(--surface-sunken); }\n}\n\n.pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  margin-right: var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &--danger { color: var(--danger); background: var(--danger-bg); }\n}\n\n.temp--high[_ngcontent-%COMP%] { font-weight: 700; color: var(--danger); }\n\n\n\n\n.notice[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--brand-tint);\n  border-left: 3px solid var(--brand);\n  border-radius: var(--radius-card);\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: var(--space-2) 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.alert-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: var(--space-4);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.alert-card[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 4px solid var(--border-strong);\n  border-radius: var(--radius-card);\n\n  &[data-tone='critical'] { border-left-color: var(--danger); }\n  &[data-tone='high'] { border-left-color: var(--warning); }\n  &[data-tone='moderate'] { border-left-color: var(--brand); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    margin-bottom: var(--space-3);\n  }\n\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__class { display: block; font-size: var(--text-xs); color: var(--text-light); }\n  &__label { margin: 0 0 var(--space-2); font-weight: 600; color: var(--text-strong); }\n\n  \n\n  &__action {\n    margin: 0;\n    padding: var(--space-3);\n    font-size: var(--text-sm);\n    line-height: 1.55;\n    color: var(--text-strong);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n  }\n\n  &__carried {\n    margin: var(--space-2) 0 0;\n    font-size: var(--text-xs);\n    font-weight: 600;\n    color: var(--warning);\n  }\n}\n\n\n\n\n.alert-block[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  margin-bottom: var(--space-4);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &--soft {\n    background: var(--surface-sunken);\n    border-color: var(--border-strong);\n\n    .alert-block__icon { background: var(--text-muted); }\n  }\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 22px;\n    height: 22px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-4) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n    flex-wrap: wrap;\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n}\n\n\n\n\n.table-wrapper[_ngcontent-%COMP%] { overflow-x: auto; }\n\n.cell-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-2);\n  justify-content: flex-end;\n  white-space: nowrap;\n}\n\n.row--attention[_ngcontent-%COMP%] { background: var(--warning-bg); }\n\n.entry[_ngcontent-%COMP%] {\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__number { display: block; font-size: var(--text-xs); color: var(--text-light); }\n  &__reason { font-size: var(--text-sm); color: var(--text-muted); max-width: 30ch; }\n  &__destination {\n    display: block;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n  &__soon {\n    display: block;\n    font-size: var(--text-xs);\n    font-weight: 600;\n    color: var(--warning);\n  }\n}\n\n.docs[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  color: var(--warning);\n  background: var(--warning-bg);\n  border-radius: var(--radius-badge);\n\n  &--complete { color: var(--success); background: var(--success-bg); }\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 480px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &--wide { width: min(600px, 100vw); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__close {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border-light);\n    flex-wrap: wrap;\n  }\n}\n\n.sheet-counters[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  flex-wrap: wrap;\n\n  &__item strong { color: var(--text-strong); }\n  &__item--due strong { color: var(--warning); }\n}\n\n.grid2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.field__hint--warn[_ngcontent-%COMP%] { color: var(--warning); }\n\n.switch[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n  font-size: var(--text-sm);\n  cursor: pointer;\n\n  input { margin-top: 3px; }\n  small { display: block; margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n\n\n\n.docs-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: 0 0 var(--space-5);\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n    border-left: 3px solid var(--border-strong);\n    border-radius: var(--radius-input);\n\n    &--done {\n      background: var(--success-bg);\n      border-left-color: var(--success);\n    }\n\n    &--closed {\n      opacity: 0.65;\n      border-left-color: var(--border);\n    }\n  }\n\n  &__label { font-weight: 600; color: var(--text-strong); }\n}\n\n.condition[_ngcontent-%COMP%] {\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    margin-bottom: var(--space-2);\n  }\n\n  &__kind {\n    margin: 0 0 var(--space-2);\n    font-size: var(--text-xs);\n    text-transform: uppercase;\n    letter-spacing: 0.03em;\n    color: var(--text-light);\n  }\n\n  &__text {\n    margin: 0 0 var(--space-2);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n\n  \n\n\n  &__action {\n    margin: 0 0 var(--space-2);\n    padding: var(--space-2) var(--space-3);\n    font-size: var(--text-sm);\n    line-height: 1.55;\n    color: var(--text-strong);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n  }\n}\n\n@include mobile {\n  .drawer,\n  .drawer--wide { width: 100vw; }\n\n  .drawer__foot { flex-direction: column; align-items: stretch; }\n\n  .alert-cards { grid-template-columns: 1fr; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HealthComponent, [{
        type: Component,
        args: [{ selector: 'eduops-health', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule,
                    LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"page\">\n\n  <!-- L'aide, une fois par onglet, exactement comme dans la configuration. -->\n  <eduops-step-coachmark\n    flow=\"health\"\n    [stepKey]=\"tab()\"\n    [stepNumber]=\"helpCopy().step\"\n    [totalSteps]=\"totalSteps\"\n    eyebrow=\"Conseil pour cet onglet\"\n    [title]=\"helpCopy().title\"\n    [description]=\"helpCopy().description\"\n    [points]=\"helpCopy().points\"\n    [ctaLabel]=\"helpCopy().ctaLabel\" />\n\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Sant\u00E9 scolaire</h1>\n      <p class=\"page__meta numeric\">\n        @if (board(); as b) {\n          {{ b.alertCount }} alerte(s) en cours\n          @if (b.fullAccess) {\n            \u00B7 {{ b.visitCountThisWeek }} passage(s) cette semaine\n            @if (b.missingVaccineCount > 0) {\n              \u00B7 {{ b.missingVaccineCount }} vaccin(s) \u00E0 r\u00E9clamer\n            }\n            @if (b.overdueExaminationCount > 0) {\n              \u00B7 {{ b.overdueExaminationCount }} visite(s) en retard\n            }\n          }\n        }\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      @if (fullAccess()) {\n        @if (tab() === 'INFIRMERIE' && canRecordVisit()) {\n          <button type=\"button\" class=\"btn btn--primary\" (click)=\"openVisit()\">\n            <span aria-hidden=\"true\">\u271A</span> Consigner un passage\n          </button>\n        } @else if (tab() === 'FICHES' && canManage()) {\n          <button type=\"button\" class=\"btn btn--primary\" (click)=\"openCondition()\">\n            <span aria-hidden=\"true\">\uFF0B</span> D\u00E9clarer une condition\n          </button>\n        } @else if (tab() === 'SUIVI' && canManage()) {\n          <button type=\"button\" class=\"btn btn--primary\" (click)=\"openExam()\">\n            <span aria-hidden=\"true\">\uFF0B</span> Programmer une visite\n          </button>\n        }\n      }\n    </div>\n  </header>\n\n  @if (fullAccess()) {\n    <nav class=\"tabs\" role=\"tablist\">\n      <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n              [class.tabs__item--on]=\"tab() === 'INFIRMERIE'\"\n              [attr.aria-selected]=\"tab() === 'INFIRMERIE'\"\n              (click)=\"changeTab('INFIRMERIE')\">\n        Infirmerie\n        @if (awaitingGuardian().length > 0) {\n          <span class=\"tabs__badge numeric\">{{ awaitingGuardian().length }}</span>\n        }\n      </button>\n      <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n              [class.tabs__item--on]=\"tab() === 'FICHES'\"\n              [attr.aria-selected]=\"tab() === 'FICHES'\"\n              (click)=\"changeTab('FICHES')\">\n        Fiches de sant\u00E9\n        @if (alerts().length > 0) {\n          <span class=\"tabs__badge numeric\">{{ alerts().length }}</span>\n        }\n      </button>\n      <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n              [class.tabs__item--on]=\"tab() === 'SUIVI'\"\n              [attr.aria-selected]=\"tab() === 'SUIVI'\"\n              (click)=\"changeTab('SUIVI')\">\n        Vaccins et visites\n        @if (overdueExams().length > 0) {\n          <span class=\"tabs__badge numeric\">{{ overdueExams().length }}</span>\n        }\n      </button>\n    </nav>\n\n    <div class=\"filters\">\n      <label class=\"filters__search\">\n        <span class=\"sr-only\">Rechercher un \u00E9l\u00E8ve</span>\n        <input type=\"search\" class=\"input\" placeholder=\"Nom ou matricule\u2026\"\n               [value]=\"search()\"\n               (change)=\"applySearch($any($event.target).value)\">\n      </label>\n    </div>\n  }\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement du dossier de sant\u00E9\u2026\" />\n  } @else if (error()) {\n    <eduops-error-state message=\"Impossible de charger la sant\u00E9 scolaire.\"\n                        (retry)=\"load()\" />\n  } @else {\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Ce que voit le personnel encadrant \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (!fullAccess()) {\n      <div class=\"notice\">\n        <p class=\"notice__title\">Vous voyez les alertes, pas les dossiers</p>\n        <p class=\"notice__text\">\n          Le d\u00E9tail m\u00E9dical reste \u00E0 l'infirmerie et \u00E0 la direction. Ce qui suit\n          est ce qu'il faut savoir pour agir : la conduite \u00E0 tenir, et rien\n          d'autre. Ces informations ne se commentent pas devant la classe.\n        </p>\n      </div>\n\n      @if (alerts().length === 0) {\n        <div class=\"empty-state\">\n          <p class=\"empty-state__title\">Aucune alerte signal\u00E9e</p>\n          <p class=\"empty-state__text\">\n            Aucun \u00E9l\u00E8ve de l'\u00E9tablissement ne fait l'objet d'une conduite \u00E0\n            tenir particuli\u00E8re cette ann\u00E9e.\n          </p>\n        </div>\n      } @else {\n        <ul class=\"alert-cards\">\n          @for (alert of alerts(); track alert.studentId + alert.label) {\n            <li class=\"alert-card\" [attr.data-tone]=\"severityTone(alert.severity)\">\n              <div class=\"alert-card__head\">\n                <div>\n                  <span class=\"alert-card__name\">{{ alert.studentName }}</span>\n                  <span class=\"alert-card__class\">{{ alert.classroomName }}</span>\n                </div>\n                <span class=\"state\" [attr.data-tone]=\"severityTone(alert.severity)\">\n                  {{ alert.severityLabel }}\n                </span>\n              </div>\n              <p class=\"alert-card__label\">{{ alert.label }}</p>\n              @if (alert.actionToTake) {\n                <p class=\"alert-card__action\">{{ alert.actionToTake }}</p>\n              }\n              @if (alert.selfCarried) {\n                <p class=\"alert-card__carried\">\n                  L'\u00E9l\u00E8ve garde son traitement sur lui.\n                </p>\n              }\n            </li>\n          }\n        </ul>\n      }\n    }\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Infirmerie \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (fullAccess() && tab() === 'INFIRMERIE') {\n\n      @if (awaitingGuardian().length > 0) {\n        <div class=\"alert-block\">\n          <div class=\"alert-block__head\">\n            <span class=\"alert-block__icon\" aria-hidden=\"true\">!</span>\n            <div>\n              <p class=\"alert-block__title\">\n                {{ awaitingGuardian().length }} famille(s) \u00E0 joindre\n              </p>\n              <p class=\"alert-block__text\">\n                Ces \u00E9l\u00E8ves ont quitt\u00E9 l'\u00E9cole sans que la famille ait \u00E9t\u00E9\n                jointe. \u00C0 r\u00E9gler avant la fin de la journ\u00E9e.\n              </p>\n            </div>\n          </div>\n          <ul class=\"pending\">\n            @for (visit of awaitingGuardian(); track visit.id) {\n              <li class=\"pending__item\">\n                <span class=\"pending__name\">{{ visit.studentName }}</span>\n                <span class=\"pending__cycle\">\n                  {{ visit.complaint }} \u00B7 {{ visit.outcomeLabel }}\n                </span>\n                @if (canRecordVisit()) {\n                  <button type=\"button\" class=\"btn btn--sm\"\n                          [disabled]=\"saving()\" (click)=\"markNotified(visit)\">\n                    Famille jointe\n                  </button>\n                }\n              </li>\n            }\n          </ul>\n        </div>\n      }\n\n      @if (visits().length === 0) {\n        <div class=\"empty-state\">\n          <p class=\"empty-state__title\">Aucun passage cette semaine</p>\n          <p class=\"empty-state__text\">\n            Le registre s'ouvre sur les sept derniers jours. Consignez un\n            passage d\u00E8s qu'un \u00E9l\u00E8ve se pr\u00E9sente, m\u00EAme pour un soin b\u00E9nin.\n          </p>\n        </div>\n      } @else {\n        <div class=\"table-wrapper\">\n          <table class=\"table\">\n            <caption class=\"sr-only\">Registre de l'infirmerie</caption>\n            <thead>\n              <tr>\n                <th scope=\"col\">\u00C9l\u00E8ve</th>\n                <th scope=\"col\">Quand</th>\n                <th scope=\"col\">Motif</th>\n                <th scope=\"col\">Soins donn\u00E9s</th>\n                <th scope=\"col\">Temp\u00E9rature</th>\n                <th scope=\"col\">Suite</th>\n                <th scope=\"col\"><span class=\"sr-only\">Actions</span></th>\n              </tr>\n            </thead>\n            <tbody>\n              @for (visit of visits(); track visit.id) {\n                <tr [class.row--attention]=\"visit.awaitingGuardian\">\n                  <td>\n                    <span class=\"entry__name\">{{ visit.studentName }}</span>\n                    <span class=\"entry__number numeric\">\n                      {{ visit.studentNumber }} \u00B7 {{ visit.classroomName }}\n                    </span>\n                  </td>\n                  <td class=\"numeric\">{{ visit.occurredAt | date:'dd/MM \u00E0 HH:mm' }}</td>\n                  <td class=\"entry__reason\">{{ visit.complaint }}</td>\n                  <td class=\"entry__reason\">{{ visit.careGiven }}</td>\n                  <td class=\"numeric\">\n                    @if (visit.temperatureCelsius) {\n                      <span [class.temp--high]=\"visit.temperatureCelsius >= 38\">\n                        {{ visit.temperatureCelsius }} \u00B0C\n                      </span>\n                    } @else {\n                      <span class=\"muted\">\u2014</span>\n                    }\n                  </td>\n                  <td>\n                    <span class=\"state\" [attr.data-tone]=\"outcomeTone(visit.outcome)\">\n                      {{ visit.outcomeLabel }}\n                    </span>\n                    @if (visit.referredTo) {\n                      <span class=\"entry__destination\">{{ visit.referredTo }}</span>\n                    }\n                    @if (visit.awaitingGuardian) {\n                      <span class=\"entry__soon\">Famille non jointe</span>\n                    }\n                  </td>\n                  <td class=\"cell-actions\">\n                    @if (visit.awaitingGuardian && canRecordVisit()) {\n                      <button type=\"button\" class=\"btn btn--sm\"\n                              [disabled]=\"saving()\" (click)=\"markNotified(visit)\">\n                        Famille jointe\n                      </button>\n                    }\n                  </td>\n                </tr>\n              }\n            </tbody>\n          </table>\n        </div>\n      }\n    }\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Fiches de sant\u00E9 \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (fullAccess() && tab() === 'FICHES') {\n\n      @if (incompleteRecords().length > 0) {\n        <div class=\"alert-block alert-block--soft\">\n          <div class=\"alert-block__head\">\n            <span class=\"alert-block__icon\" aria-hidden=\"true\">i</span>\n            <div>\n              <p class=\"alert-block__title\">\n                {{ incompleteRecords().length }} fiche(s) incompl\u00E8te(s)\n              </p>\n              <p class=\"alert-block__text\">\n                Autorisation de soins manquante ou vaccin sans preuve. Rien de\n                bloquant : ce sont des pi\u00E8ces \u00E0 r\u00E9clamer aux familles.\n              </p>\n            </div>\n          </div>\n        </div>\n      }\n\n      @if (records().length === 0) {\n        <div class=\"empty-state\">\n          <p class=\"empty-state__title\">Aucune fiche de sant\u00E9</p>\n          <p class=\"empty-state__text\">\n            Ouvrez une fiche en d\u00E9clarant une premi\u00E8re condition, ou en\n            enregistrant l'autorisation de soins d'une famille.\n          </p>\n        </div>\n      } @else {\n        <div class=\"table-wrapper\">\n          <table class=\"table\">\n            <caption class=\"sr-only\">Fiches de sant\u00E9 des \u00E9l\u00E8ves</caption>\n            <thead>\n              <tr>\n                <th scope=\"col\">\u00C9l\u00E8ve</th>\n                <th scope=\"col\">Groupe</th>\n                <th scope=\"col\">Conditions</th>\n                <th scope=\"col\">Soins autoris\u00E9s</th>\n                <th scope=\"col\">Vaccins</th>\n                <th scope=\"col\"><span class=\"sr-only\">Actions</span></th>\n              </tr>\n            </thead>\n            <tbody>\n              @for (record of records(); track record.id) {\n                <tr [class.row--attention]=\"record.alertCount > 0\">\n                  <td>\n                    <span class=\"entry__name\">{{ record.studentName }}</span>\n                    <span class=\"entry__number numeric\">\n                      {{ record.studentNumber }} \u00B7 {{ record.classroomName }}\n                    </span>\n                  </td>\n                  <td class=\"numeric\">{{ record.bloodGroup || '\u2014' }}</td>\n                  <td>\n                    @if (record.alertCount > 0) {\n                      <span class=\"pill pill--danger\">\n                        {{ record.alertCount }} alerte(s)\n                      </span>\n                    }\n                    <span class=\"muted\">\n                      {{ record.conditions.length }} au total\n                    </span>\n                  </td>\n                  <td>\n                    @if (record.careConsent) {\n                      <span class=\"state\" data-tone=\"low\">Autoris\u00E9s</span>\n                    } @else {\n                      <span class=\"state\" data-tone=\"high\">Sans autorisation</span>\n                    }\n                  </td>\n                  <td>\n                    @if (record.missingVaccineCount > 0) {\n                      <span class=\"docs\">\n                        {{ record.missingVaccineCount }} \u00E0 r\u00E9clamer\n                      </span>\n                    } @else {\n                      <span class=\"docs docs--complete\">Complet</span>\n                    }\n                  </td>\n                  <td class=\"cell-actions\">\n                    <button type=\"button\" class=\"btn btn--sm btn--ghost\"\n                            (click)=\"review(record)\">\n                      Ouvrir\n                    </button>\n                  </td>\n                </tr>\n              }\n            </tbody>\n          </table>\n        </div>\n      }\n    }\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Vaccins et visites \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (fullAccess() && tab() === 'SUIVI') {\n\n      @if (overdueExams().length > 0) {\n        <div class=\"alert-block\">\n          <div class=\"alert-block__head\">\n            <span class=\"alert-block__icon\" aria-hidden=\"true\">!</span>\n            <div>\n              <p class=\"alert-block__title\">\n                {{ overdueExams().length }} visite(s) en retard\n              </p>\n              <p class=\"alert-block__text\">\n                Pr\u00E9vues, jamais consign\u00E9es. Une visite non pass\u00E9e reste due :\n                elle ne se referme pas toute seule.\n              </p>\n            </div>\n          </div>\n        </div>\n      }\n\n      @if (examinations().length === 0) {\n        <div class=\"empty-state\">\n          <p class=\"empty-state__title\">Aucune visite programm\u00E9e</p>\n          <p class=\"empty-state__text\">\n            Programmez les visites d'admission et les visites annuelles pour\n            suivre celles qui restent \u00E0 passer.\n          </p>\n        </div>\n      } @else {\n        <div class=\"table-wrapper\">\n          <table class=\"table\">\n            <caption class=\"sr-only\">Visites m\u00E9dicales</caption>\n            <thead>\n              <tr>\n                <th scope=\"col\">\u00C9l\u00E8ve</th>\n                <th scope=\"col\">Visite</th>\n                <th scope=\"col\">Pr\u00E9vue le</th>\n                <th scope=\"col\">Pass\u00E9e le</th>\n                <th scope=\"col\">R\u00E9sultat</th>\n                <th scope=\"col\"><span class=\"sr-only\">Actions</span></th>\n              </tr>\n            </thead>\n            <tbody>\n              @for (exam of examinations(); track exam.id) {\n                <tr [class.row--attention]=\"exam.overdue\">\n                  <td>\n                    <span class=\"entry__name\">{{ exam.studentName }}</span>\n                    <span class=\"entry__number numeric\">\n                      {{ exam.studentNumber }} \u00B7 {{ exam.classroomName }}\n                    </span>\n                  </td>\n                  <td>{{ exam.kindLabel }}</td>\n                  <td class=\"numeric\">{{ exam.scheduledOn | date:'dd/MM/yyyy' }}</td>\n                  <td class=\"numeric\">\n                    {{ exam.performedOn ? (exam.performedOn | date:'dd/MM/yyyy') : '\u2014' }}\n                  </td>\n                  <td>\n                    <span class=\"state\" [attr.data-tone]=\"examTone(exam.outcome)\">\n                      {{ exam.outcomeLabel }}\n                    </span>\n                    @if (exam.restriction) {\n                      <span class=\"entry__destination\">{{ exam.restriction }}</span>\n                    }\n                    @if (exam.overdue) {\n                      <span class=\"entry__soon\">En retard</span>\n                    }\n                  </td>\n                  <td class=\"cell-actions\">\n                    @if (exam.outcome === 'PENDING' && canManage()) {\n                      <button type=\"button\" class=\"btn btn--sm\"\n                              (click)=\"openResult(exam)\">\n                        Consigner\n                      </button>\n                    }\n                  </td>\n                </tr>\n              }\n            </tbody>\n          </table>\n        </div>\n      }\n    }\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau : consigner un passage \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (visitOpen()) {\n    <div class=\"drawer-backdrop\" (click)=\"closeVisit()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-labelledby=\"visit-title\">\n      <div class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"visit-title\">Passage \u00E0 l'infirmerie</h2>\n          <p class=\"drawer__meta\">\n            \u00C9crivez les soins donn\u00E9s, m\u00EAme minimes.\n          </p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" (click)=\"closeVisit()\"\n                aria-label=\"Fermer\">\u00D7</button>\n      </div>\n\n      <form class=\"drawer__body\" [formGroup]=\"visitForm\" (ngSubmit)=\"submitVisit()\">\n        <label class=\"field\">\n          <span class=\"field__label\">\u00C9l\u00E8ve</span>\n          <select class=\"input\" formControlName=\"studentId\">\n            <option value=\"\">Choisir un \u00E9l\u00E8ve\u2026</option>\n            @for (student of studentList(); track student.id) {\n              <option [value]=\"student.id\">\n                {{ student.fullName }} \u2014 {{ student.studentNumber }}\n              </option>\n            }\n          </select>\n        </label>\n\n        <label class=\"field\">\n          <span class=\"field__label\">Motif du passage</span>\n          <input type=\"text\" class=\"input\" formControlName=\"complaint\"\n                 placeholder=\"C\u00E9phal\u00E9es, chute dans la cour\u2026\">\n        </label>\n\n        <label class=\"field\">\n          <span class=\"field__label\">Soins donn\u00E9s</span>\n          <textarea class=\"input\" rows=\"3\" formControlName=\"careGiven\"\n                    placeholder=\"Nettoyage, pansement, repos trente minutes\u2026\"></textarea>\n          <span class=\"field__hint\">\n            Un registre vide ne prouve rien le jour o\u00F9 une famille demande des\n            comptes.\n          </span>\n        </label>\n\n        <div class=\"grid2\">\n          <label class=\"field\">\n            <span class=\"field__label\">Temp\u00E9rature (\u00B0C)</span>\n            <input type=\"number\" class=\"input\" step=\"0.1\" min=\"30\" max=\"45\"\n                   formControlName=\"temperatureCelsius\" placeholder=\"37.5\">\n          </label>\n\n          <label class=\"field\">\n            <span class=\"field__label\">Suite donn\u00E9e</span>\n            <select class=\"input\" formControlName=\"outcome\">\n              @for (choice of outcomes; track choice.value) {\n                <option [value]=\"choice.value\">{{ choice.label }}</option>\n              }\n            </select>\n          </label>\n        </div>\n\n        @if (visitNeedsReferral()) {\n          <label class=\"field\">\n            <span class=\"field__label\">Orient\u00E9 vers</span>\n            <input type=\"text\" class=\"input\" formControlName=\"referredTo\"\n                   placeholder=\"Centre de sant\u00E9 urbain de Cocody\">\n            <span class=\"field__hint field__hint--warn\">\n              Sans ce nom, personne ne saura o\u00F9 l'\u00E9l\u00E8ve a \u00E9t\u00E9 conduit.\n            </span>\n          </label>\n        }\n\n        @if (visitNeedsGuardian()) {\n          <label class=\"switch\">\n            <input type=\"checkbox\" formControlName=\"guardianNotified\">\n            <span>\n              La famille a \u00E9t\u00E9 jointe\n              <small>\n                Obligatoire : un \u00E9l\u00E8ve ne quitte pas l'\u00E9cole sans que quelqu'un\n                ait \u00E9t\u00E9 pr\u00E9venu. Le serveur refusera l'enregistrement sinon.\n              </small>\n            </span>\n          </label>\n        }\n\n        <label class=\"field\">\n          <span class=\"field__label\">Observations (facultatif)</span>\n          <textarea class=\"input\" rows=\"2\" formControlName=\"notes\"></textarea>\n        </label>\n      </form>\n\n      <div class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--ghost\" (click)=\"closeVisit()\">\n          Annuler\n        </button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"saving() || visitForm.invalid\" (click)=\"submitVisit()\">\n          {{ saving() ? 'Enregistrement\u2026' : 'Consigner le passage' }}\n        </button>\n      </div>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau : d\u00E9clarer une condition \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (conditionOpen()) {\n    <div class=\"drawer-backdrop\" (click)=\"closeCondition()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-labelledby=\"condition-title\">\n      <div class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"condition-title\">D\u00E9clarer une condition</h2>\n          <p class=\"drawer__meta\">\n            Allergie, maladie chronique, traitement en cours.\n          </p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" (click)=\"closeCondition()\"\n                aria-label=\"Fermer\">\u00D7</button>\n      </div>\n\n      <form class=\"drawer__body\" [formGroup]=\"conditionForm\"\n            (ngSubmit)=\"submitCondition()\">\n        <label class=\"field\">\n          <span class=\"field__label\">\u00C9l\u00E8ve</span>\n          <select class=\"input\" formControlName=\"studentId\">\n            <option value=\"\">Choisir un \u00E9l\u00E8ve\u2026</option>\n            @for (student of studentList(); track student.id) {\n              <option [value]=\"student.id\">\n                {{ student.fullName }} \u2014 {{ student.studentNumber }}\n              </option>\n            }\n          </select>\n        </label>\n\n        <div class=\"grid2\">\n          <label class=\"field\">\n            <span class=\"field__label\">Nature</span>\n            <select class=\"input\" formControlName=\"kind\">\n              @for (choice of kinds; track choice.value) {\n                <option [value]=\"choice.value\">{{ choice.label }}</option>\n              }\n            </select>\n          </label>\n\n          <label class=\"field\">\n            <span class=\"field__label\">Gravit\u00E9</span>\n            <select class=\"input\" formControlName=\"severity\">\n              @for (choice of severities; track choice.value) {\n                <option [value]=\"choice.value\">{{ choice.label }}</option>\n              }\n            </select>\n          </label>\n        </div>\n\n        <label class=\"field\">\n          <span class=\"field__label\">Libell\u00E9</span>\n          <input type=\"text\" class=\"input\" formControlName=\"label\"\n                 placeholder=\"Allergie aux arachides\">\n          <span class=\"field__hint\">\n            Court et clair : c'est ce que lira un professeur, hors contexte.\n          </span>\n        </label>\n\n        @if (severityIsAlert()) {\n          <div class=\"hint-block hint-block--warn\">\n            Cette condition sera signal\u00E9e au personnel encadrant. Ils recevront\n            le libell\u00E9 et la conduite \u00E0 tenir \u2014 jamais le diagnostic ni le\n            traitement.\n          </div>\n\n          <label class=\"field\">\n            <span class=\"field__label\">Conduite \u00E0 tenir</span>\n            <textarea class=\"input\" rows=\"4\" formControlName=\"actionToTake\"\n                      placeholder=\"\u00C9carter tout aliment contenant de l'arachide. En cas de g\u00EAne respiratoire : utiliser le stylo auto-injecteur, puis appeler le 185.\"></textarea>\n            <span class=\"field__hint field__hint--warn\">\n              Obligatoire. \u00C9crivez pour quelqu'un qui n'est pas soignant et qui\n              doit agir tout de suite.\n            </span>\n          </label>\n        }\n\n        <label class=\"field\">\n          <span class=\"field__label\">Description (reste \u00E0 l'infirmerie)</span>\n          <textarea class=\"input\" rows=\"2\" formControlName=\"description\"></textarea>\n        </label>\n\n        <label class=\"field\">\n          <span class=\"field__label\">M\u00E9dicament (reste \u00E0 l'infirmerie)</span>\n          <input type=\"text\" class=\"input\" formControlName=\"medication\"\n                 placeholder=\"Stylo auto-injecteur\">\n        </label>\n\n        <label class=\"switch\">\n          <input type=\"checkbox\" formControlName=\"selfCarried\">\n          <span>\n            L'\u00E9l\u00E8ve garde son traitement sur lui\n            <small>Inhalateur, stylo auto-injecteur : \u00E0 savoir en cas d'urgence.</small>\n          </span>\n        </label>\n      </form>\n\n      <div class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--ghost\" (click)=\"closeCondition()\">\n          Annuler\n        </button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"saving() || conditionForm.invalid\"\n                (click)=\"submitCondition()\">\n          {{ saving() ? 'Enregistrement\u2026' : 'Porter \u00E0 la fiche' }}\n        </button>\n      </div>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau : la fiche d'un \u00E9l\u00E8ve \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (reviewing(); as record) {\n    <div class=\"drawer-backdrop\" (click)=\"closeReview()\"></div>\n    <aside class=\"drawer drawer--wide\" role=\"dialog\" aria-labelledby=\"record-title\">\n      <div class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"record-title\">{{ record.studentName }}</h2>\n          <p class=\"drawer__meta numeric\">\n            {{ record.studentNumber }} \u00B7 {{ record.classroomName }}\n            @if (record.bloodGroup) { \u00B7 Groupe {{ record.bloodGroup }} }\n          </p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" (click)=\"closeReview()\"\n                aria-label=\"Fermer\">\u00D7</button>\n      </div>\n\n      <div class=\"sheet-counters\">\n        <span class=\"sheet-counters__item\">\n          <strong>{{ record.alertCount }}</strong> alerte(s)\n        </span>\n        <span class=\"sheet-counters__item\"\n              [class.sheet-counters__item--due]=\"record.missingVaccineCount > 0\">\n          <strong>{{ record.missingVaccineCount }}</strong> vaccin(s) \u00E0 r\u00E9clamer\n        </span>\n        @if (record.physicianName) {\n          <span class=\"sheet-counters__item\">\n            M\u00E9decin : <strong>{{ record.physicianName }}</strong>\n            @if (record.physicianPhone) { \u2014 {{ record.physicianPhone }} }\n          </span>\n        }\n      </div>\n\n      <div class=\"drawer__body\">\n        @if (!record.careConsent) {\n          <div class=\"hint-block hint-block--warn\">\n            Les parents n'ont pas autoris\u00E9 les premiers soins. Sans cette\n            autorisation, l'infirmerie ne peut qu'appeler la famille.\n          </div>\n        }\n\n        @if (canManage()) {\n          <button type=\"button\" class=\"btn btn--sm\" [disabled]=\"saving()\"\n                  (click)=\"toggleConsent(record)\">\n            {{ record.careConsent\n              ? 'Retirer l\\'autorisation de soins'\n              : 'Enregistrer l\\'autorisation de soins' }}\n          </button>\n        }\n\n        <h3 class=\"section-title\">Conditions d\u00E9clar\u00E9es</h3>\n        @if (record.conditions.length === 0) {\n          <p class=\"muted\">Aucune condition port\u00E9e \u00E0 cette fiche.</p>\n        } @else {\n          <ul class=\"docs-list\">\n            @for (condition of record.conditions; track condition.id) {\n              <li class=\"docs-list__item\"\n                  [class.docs-list__item--closed]=\"!condition.active\">\n                <div class=\"condition__head\">\n                  <span class=\"docs-list__label\">{{ condition.label }}</span>\n                  <span class=\"state\" [attr.data-tone]=\"severityTone(condition.severity)\">\n                    {{ condition.severityLabel }}\n                  </span>\n                </div>\n                <p class=\"condition__kind\">{{ condition.kindLabel }}</p>\n                @if (condition.description) {\n                  <p class=\"condition__text\">{{ condition.description }}</p>\n                }\n                @if (condition.actionToTake) {\n                  <p class=\"condition__action\">\n                    <strong>Conduite \u00E0 tenir :</strong> {{ condition.actionToTake }}\n                  </p>\n                }\n                @if (condition.medication) {\n                  <p class=\"condition__text\">M\u00E9dicament : {{ condition.medication }}</p>\n                }\n                @if (condition.selfCarried) {\n                  <p class=\"condition__text\">L'\u00E9l\u00E8ve garde son traitement sur lui.</p>\n                }\n                @if (!condition.active) {\n                  <p class=\"condition__text muted\">\n                    Close le {{ condition.resolvedOn | date:'dd/MM/yyyy' }}\n                  </p>\n                } @else if (canManage()) {\n                  <button type=\"button\" class=\"btn btn--sm btn--ghost\"\n                          [disabled]=\"saving()\"\n                          (click)=\"resolveCondition(condition.id)\">\n                    Clore\n                  </button>\n                }\n              </li>\n            }\n          </ul>\n        }\n\n        <h3 class=\"section-title\">Carnet de vaccination</h3>\n        @if (record.vaccinations.length === 0) {\n          <p class=\"muted\">Aucun vaccin enregistr\u00E9.</p>\n        } @else {\n          <ul class=\"docs-list\">\n            @for (shot of record.vaccinations; track shot.id) {\n              <li class=\"docs-list__item\"\n                  [class.docs-list__item--done]=\"shot.complete\">\n                <div class=\"condition__head\">\n                  <span class=\"docs-list__label\">{{ shot.vaccineLabel }}</span>\n                  <span class=\"numeric muted\">\n                    {{ shot.dosesReceived }} / {{ shot.dosesExpected }} dose(s)\n                  </span>\n                </div>\n                @if (shot.outstanding) {\n                  <p class=\"condition__text\">\n                    {{ shot.certificateSeen\n                      ? 'Doses incompl\u00E8tes : \u00E0 compl\u00E9ter.'\n                      : 'Carnet non pr\u00E9sent\u00E9 : preuve \u00E0 r\u00E9clamer \u00E0 la famille.' }}\n                  </p>\n                  @if (canManage()) {\n                    <button type=\"button\" class=\"btn btn--sm\" [disabled]=\"saving()\"\n                            (click)=\"markCertificateSeen(record, shot.vaccineId,\n                                                         shot.dosesExpected)\">\n                      Carnet vu, doses \u00E0 jour\n                    </button>\n                  }\n                } @else if (!shot.required) {\n                  <p class=\"condition__text muted\">Non exig\u00E9 par l'\u00E9tablissement.</p>\n                }\n              </li>\n            }\n          </ul>\n        }\n      </div>\n\n      <div class=\"drawer__foot\">\n        @if (canManage()) {\n          <button type=\"button\" class=\"btn btn--ghost\"\n                  (click)=\"openCondition(record.studentId)\">\n            D\u00E9clarer une condition\n          </button>\n        }\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"closeReview()\">\n          Fermer\n        </button>\n      </div>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau : programmer une visite \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (examOpen()) {\n    <div class=\"drawer-backdrop\" (click)=\"closeExam()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-labelledby=\"exam-title\">\n      <div class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"exam-title\">Programmer une visite</h2>\n          <p class=\"drawer__meta\">Une seule visite de chaque type par \u00E9l\u00E8ve et par ann\u00E9e.</p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" (click)=\"closeExam()\"\n                aria-label=\"Fermer\">\u00D7</button>\n      </div>\n\n      <form class=\"drawer__body\" [formGroup]=\"examForm\" (ngSubmit)=\"submitExam()\">\n        <label class=\"field\">\n          <span class=\"field__label\">\u00C9l\u00E8ve</span>\n          <select class=\"input\" formControlName=\"studentId\">\n            <option value=\"\">Choisir un \u00E9l\u00E8ve\u2026</option>\n            @for (student of studentList(); track student.id) {\n              <option [value]=\"student.id\">\n                {{ student.fullName }} \u2014 {{ student.studentNumber }}\n              </option>\n            }\n          </select>\n        </label>\n\n        <div class=\"grid2\">\n          <label class=\"field\">\n            <span class=\"field__label\">Type de visite</span>\n            <select class=\"input\" formControlName=\"kind\">\n              @for (choice of examKinds; track choice.value) {\n                <option [value]=\"choice.value\">{{ choice.label }}</option>\n              }\n            </select>\n          </label>\n\n          <label class=\"field\">\n            <span class=\"field__label\">Pr\u00E9vue le</span>\n            <input type=\"date\" class=\"input\" formControlName=\"scheduledOn\">\n          </label>\n        </div>\n\n        <label class=\"field\">\n          <span class=\"field__label\">Praticien (facultatif)</span>\n          <input type=\"text\" class=\"input\" formControlName=\"practitioner\"\n                 placeholder=\"Dr Aya N'Dri, m\u00E9decine scolaire\">\n        </label>\n      </form>\n\n      <div class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--ghost\" (click)=\"closeExam()\">Annuler</button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"saving() || examForm.invalid\" (click)=\"submitExam()\">\n          {{ saving() ? 'Enregistrement\u2026' : 'Programmer' }}\n        </button>\n      </div>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau : consigner un r\u00E9sultat \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (resulting(); as exam) {\n    <div class=\"drawer-backdrop\" (click)=\"closeResult()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-labelledby=\"result-title\">\n      <div class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"result-title\">{{ exam.kindLabel }}</h2>\n          <p class=\"drawer__meta\">\n            {{ exam.studentName }} \u00B7 pr\u00E9vue le\n            {{ exam.scheduledOn | date:'dd/MM/yyyy' }}\n          </p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" (click)=\"closeResult()\"\n                aria-label=\"Fermer\">\u00D7</button>\n      </div>\n\n      <form class=\"drawer__body\" [formGroup]=\"resultForm\" (ngSubmit)=\"submitResult()\">\n        <label class=\"field\">\n          <span class=\"field__label\">R\u00E9sultat</span>\n          <select class=\"input\" formControlName=\"outcome\">\n            @for (choice of examOutcomes; track choice.value) {\n              <option [value]=\"choice.value\">{{ choice.label }}</option>\n            }\n          </select>\n        </label>\n\n        <label class=\"field\">\n          <span class=\"field__label\">Pass\u00E9e le</span>\n          <input type=\"date\" class=\"input\" formControlName=\"performedOn\">\n        </label>\n\n        @if (resultNeedsRestriction()) {\n          <label class=\"field\">\n            <span class=\"field__label\">R\u00E9serve prononc\u00E9e</span>\n            <textarea class=\"input\" rows=\"3\" formControlName=\"restriction\"\n                      placeholder=\"Dispense de course de fond, autres activit\u00E9s autoris\u00E9es.\"></textarea>\n            <span class=\"field__hint field__hint--warn\">\n              Obligatoire : sans elle, le professeur d'\u00E9ducation physique ne\n              sait pas quoi am\u00E9nager.\n            </span>\n          </label>\n        }\n\n        <label class=\"field\">\n          <span class=\"field__label\">Observations (facultatif)</span>\n          <textarea class=\"input\" rows=\"2\" formControlName=\"notes\"></textarea>\n        </label>\n      </form>\n\n      <div class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--ghost\" (click)=\"closeResult()\">Annuler</button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"saving()\" (click)=\"submitResult()\">\n          {{ saving() ? 'Enregistrement\u2026' : 'Consigner le r\u00E9sultat' }}\n        </button>\n      </div>\n    </aside>\n  }\n</section>\n", styles: ["@import 'styles/tokens';\n\n.muted { color: var(--text-muted); }\n\n.section-title {\n  margin: var(--space-5) 0 var(--space-3);\n  font-size: var(--text-sm);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text-muted);\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Onglets \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.tabs {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n.filters {\n  display: flex;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n\n  &__search .input { width: auto; min-width: 240px; }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Gravit\u00E9 \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n/**\n * La couleur porte l'urgence. \u00AB Alerte vitale \u00BB et \u00AB Pour information \u00BB ne\n * doivent pas se ressembler : c'est la premi\u00E8re chose que lit quelqu'un qui\n * cherche vite.\n */\n.state {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='critical'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='high'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='moderate'] { color: var(--brand); background: var(--brand-tint); }\n  &[data-tone='low'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='todo'] { color: var(--text-muted); background: var(--surface-sunken); }\n}\n\n.pill {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  margin-right: var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  white-space: nowrap;\n  border-radius: var(--radius-badge);\n\n  &--danger { color: var(--danger); background: var(--danger-bg); }\n}\n\n.temp--high { font-weight: 700; color: var(--danger); }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Ce que voit un encadrant \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.notice {\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--brand-tint);\n  border-left: 3px solid var(--brand);\n  border-radius: var(--radius-card);\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: var(--space-2) 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.alert-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: var(--space-4);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.alert-card {\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 4px solid var(--border-strong);\n  border-radius: var(--radius-card);\n\n  &[data-tone='critical'] { border-left-color: var(--danger); }\n  &[data-tone='high'] { border-left-color: var(--warning); }\n  &[data-tone='moderate'] { border-left-color: var(--brand); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    margin-bottom: var(--space-3);\n  }\n\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__class { display: block; font-size: var(--text-xs); color: var(--text-light); }\n  &__label { margin: 0 0 var(--space-2); font-weight: 600; color: var(--text-strong); }\n\n  /* La conduite \u00E0 tenir se lit d'un coup d'\u0153il : c'est elle qui sert. */\n  &__action {\n    margin: 0;\n    padding: var(--space-3);\n    font-size: var(--text-sm);\n    line-height: 1.55;\n    color: var(--text-strong);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n  }\n\n  &__carried {\n    margin: var(--space-2) 0 0;\n    font-size: var(--text-xs);\n    font-weight: 600;\n    color: var(--warning);\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Encadr\u00E9s \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.alert-block {\n  padding: var(--space-4);\n  margin-bottom: var(--space-4);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &--soft {\n    background: var(--surface-sunken);\n    border-color: var(--border-strong);\n\n    .alert-block__icon { background: var(--text-muted); }\n  }\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 22px;\n    height: 22px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-4) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n    flex-wrap: wrap;\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.hint-block {\n  padding: var(--space-3);\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Tableaux \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.table-wrapper { overflow-x: auto; }\n\n.cell-actions {\n  display: flex;\n  gap: var(--space-2);\n  justify-content: flex-end;\n  white-space: nowrap;\n}\n\n.row--attention { background: var(--warning-bg); }\n\n.entry {\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__number { display: block; font-size: var(--text-xs); color: var(--text-light); }\n  &__reason { font-size: var(--text-sm); color: var(--text-muted); max-width: 30ch; }\n  &__destination {\n    display: block;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n  &__soon {\n    display: block;\n    font-size: var(--text-xs);\n    font-weight: 600;\n    color: var(--warning);\n  }\n}\n\n.docs {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  color: var(--warning);\n  background: var(--warning-bg);\n  border-radius: var(--radius-badge);\n\n  &--complete { color: var(--success); background: var(--success-bg); }\n}\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 480px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneaux \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &--wide { width: min(600px, 100vw); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  &__close {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__body { flex: 1; overflow-y: auto; padding: var(--space-5); }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border-light);\n    flex-wrap: wrap;\n  }\n}\n\n.sheet-counters {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  flex-wrap: wrap;\n\n  &__item strong { color: var(--text-strong); }\n  &__item--due strong { color: var(--warning); }\n}\n\n.grid2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.field__hint--warn { color: var(--warning); }\n\n.switch {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  margin-bottom: var(--space-4);\n  font-size: var(--text-sm);\n  cursor: pointer;\n\n  input { margin-top: 3px; }\n  small { display: block; margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Lignes de la fiche \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.docs-list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: 0 0 var(--space-5);\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n    border-left: 3px solid var(--border-strong);\n    border-radius: var(--radius-input);\n\n    &--done {\n      background: var(--success-bg);\n      border-left-color: var(--success);\n    }\n\n    &--closed {\n      opacity: 0.65;\n      border-left-color: var(--border);\n    }\n  }\n\n  &__label { font-weight: 600; color: var(--text-strong); }\n}\n\n.condition {\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    margin-bottom: var(--space-2);\n  }\n\n  &__kind {\n    margin: 0 0 var(--space-2);\n    font-size: var(--text-xs);\n    text-transform: uppercase;\n    letter-spacing: 0.03em;\n    color: var(--text-light);\n  }\n\n  &__text {\n    margin: 0 0 var(--space-2);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n\n  /* La conduite \u00E0 tenir se distingue du reste du dossier : c'est la seule\n     ligne qui sortira de l'infirmerie. */\n  &__action {\n    margin: 0 0 var(--space-2);\n    padding: var(--space-2) var(--space-3);\n    font-size: var(--text-sm);\n    line-height: 1.55;\n    color: var(--text-strong);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n  }\n}\n\n@include mobile {\n  .drawer,\n  .drawer--wide { width: 100vw; }\n\n  .drawer__foot { flex-direction: column; align-items: stretch; }\n\n  .alert-cards { grid-template-columns: 1fr; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HealthComponent, { className: "HealthComponent", filePath: "frontend/src/app/features/health/health.component.ts", lineNumber: 59 }); })();
//# sourceMappingURL=health.component.js.map