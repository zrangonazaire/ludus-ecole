import { createUuid } from "../../core/utils/uuid";
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ATTENDANCE_DATA_SOURCE } from '@core/datasource/data-source';
import { ATTENDANCE_MARKS, QUICK_MARKS } from '@core/models/attendance.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.classroomId;
const _forTrack1 = ($index, $item) => $item.id;
const _forTrack2 = ($index, $item) => $item.subjectId + ((tmp_35_0 = $item.startTime) !== null && tmp_35_0 !== undefined ? tmp_35_0 : "");
const _forTrack3 = ($index, $item) => $item.studentId;
const _forTrack4 = ($index, $item) => $item.code;
function AttendanceComponent_Conditional_7_Conditional_0_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const d_r1 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" \u00B7 ", ctx_r1.formatRate(d_r1.attendanceRate), " de pr\u00E9sence ");
} }
function AttendanceComponent_Conditional_7_Conditional_0_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const d_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", d_r1.termName, " ");
} }
function AttendanceComponent_Conditional_7_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵtemplate(1, AttendanceComponent_Conditional_7_Conditional_0_Conditional_1_Template, 1, 1)(2, AttendanceComponent_Conditional_7_Conditional_0_Conditional_2_Template, 1, 1);
} if (rf & 2) {
    const d_r1 = ctx;
    i0.ɵɵtextInterpolate2(" ", d_r1.sheetsDone, "/", d_r1.classroomCount, " classe(s) appel\u00E9e(s) ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(d_r1.attendanceRate !== undefined ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(d_r1.termName ? 2 : -1);
} }
function AttendanceComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AttendanceComponent_Conditional_7_Conditional_0_Template, 3, 4);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.day()) ? 0 : -1, tmp_1_0);
} }
function AttendanceComponent_Conditional_8_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const g_r3 = ctx;
    i0.ɵɵtextInterpolate3(" ", g_r3.absenceCount, " absence(s) et ", g_r3.latenessCount, " retard(s) \u2014 ", g_r3.studentCount, " \u00E9l\u00E8ve(s) concern\u00E9(s) ");
} }
function AttendanceComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AttendanceComponent_Conditional_8_Conditional_0_Template, 1, 3);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.digest()) ? 0 : -1, tmp_1_0);
} }
function AttendanceComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.pendingClassrooms().length);
} }
function AttendanceComponent_Conditional_17_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const g_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(g_r4.followUpCount);
} }
function AttendanceComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AttendanceComponent_Conditional_17_Conditional_0_Template, 2, 1, "span", 7);
} if (rf & 2) {
    i0.ɵɵconditional(ctx.followUpCount > 0 ? 0 : -1);
} }
function AttendanceComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 8);
} }
function AttendanceComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 9);
    i0.ɵɵlistener("retry", function AttendanceComponent_Conditional_19_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.reload()); });
    i0.ɵɵelementEnd();
} }
function AttendanceComponent_Conditional_20_Conditional_0_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1, "Aujourd'hui");
    i0.ɵɵelementEnd();
} }
function AttendanceComponent_Conditional_20_Conditional_0_Conditional_13_For_11_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const classroom_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", classroom_r8.mainTeacherName, " ");
} }
function AttendanceComponent_Conditional_20_Conditional_0_Conditional_13_For_11_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 28)(1, "span", 29);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 30);
    i0.ɵɵtext(4);
    i0.ɵɵtemplate(5, AttendanceComponent_Conditional_20_Conditional_0_Conditional_13_For_11_Conditional_5_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 31);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_20_Conditional_0_Conditional_13_For_11_Template_button_click_6_listener() { const classroom_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.openSheet(classroom_r8)); });
    i0.ɵɵtext(7, "Faire l'appel");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const classroom_r8 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(classroom_r8.classroomName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", classroom_r8.expectedCount, " \u00E9l\u00E8ve(s) ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(classroom_r8.mainTeacherName ? 5 : -1);
} }
function AttendanceComponent_Conditional_20_Conditional_0_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 18)(1, "div", 23)(2, "span", 24);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 25);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 26);
    i0.ɵɵtext(8, " Ce ne sont pas des classes sans absents : ce sont des classes dont personne ne sait rien. Aucune famille ne sera pr\u00E9venue, et le taux du jour ne les compte pas. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "ul", 27);
    i0.ɵɵrepeaterCreate(10, AttendanceComponent_Conditional_20_Conditional_0_Conditional_13_For_11_Template, 8, 3, "li", 28, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.pendingClassrooms().length, " classe(s) sans appel ");
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.pendingClassrooms());
} }
function AttendanceComponent_Conditional_20_Conditional_0_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 19)(1, "article", 32)(2, "p", 33);
    i0.ɵɵtext(3, "Taux de pr\u00E9sence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 34);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 35);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "article", 32)(9, "p", 33);
    i0.ɵɵtext(10, "Pr\u00E9sents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 34);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 35);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "article", 36)(16, "p", 33);
    i0.ɵɵtext(17, "Absents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p", 34);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p", 35);
    i0.ɵɵtext(21, "Familles pr\u00E9venues \u00E0 l'enregistrement");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "article", 37)(23, "p", 33);
    i0.ɵɵtext(24, "Retards");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "p", 34);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p", 35);
    i0.ɵɵtext(28, "Compt\u00E9s pr\u00E9sents au taux");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const d_r9 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.formatRate(d_r9.attendanceRate));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Sur les ", d_r9.sheetsDone, " classe(s) appel\u00E9e(s)");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(d_r9.presentCount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("sur ", d_r9.expectedCount, " attendus");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(d_r9.absentCount);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(d_r9.lateCount);
} }
function AttendanceComponent_Conditional_20_Conditional_0_For_17_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const classroom_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", classroom_r11.mainTeacherName, " ");
} }
function AttendanceComponent_Conditional_20_Conditional_0_For_17_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(classroom_r11.statusLabel);
} }
function AttendanceComponent_Conditional_20_Conditional_0_For_17_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 42);
    i0.ɵɵtext(1, "Appel \u00E0 faire");
    i0.ɵɵelementEnd();
} }
function AttendanceComponent_Conditional_20_Conditional_0_For_17_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 44)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " pr\u00E9sent(s) \u00B7 ");
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6, " absent(s) \u00B7 ");
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " retard(s) ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(classroom_r11.presentCount);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(classroom_r11.absentCount);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(classroom_r11.lateCount);
} }
function AttendanceComponent_Conditional_20_Conditional_0_For_17_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 45);
    i0.ɵɵtext(1, " Rien d'enregistr\u00E9 pour cette journ\u00E9e. ");
    i0.ɵɵelementEnd();
} }
function AttendanceComponent_Conditional_20_Conditional_0_For_17_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 38)(1, "header", 39)(2, "div")(3, "h2", 40);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 41);
    i0.ɵɵtext(6);
    i0.ɵɵtemplate(7, AttendanceComponent_Conditional_20_Conditional_0_For_17_Conditional_7_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, AttendanceComponent_Conditional_20_Conditional_0_For_17_Conditional_8_Template, 2, 1, "span", 13)(9, AttendanceComponent_Conditional_20_Conditional_0_For_17_Conditional_9_Template, 2, 0, "span", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 43);
    i0.ɵɵtemplate(11, AttendanceComponent_Conditional_20_Conditional_0_For_17_Conditional_11_Template, 10, 3, "p", 44)(12, AttendanceComponent_Conditional_20_Conditional_0_For_17_Conditional_12_Template, 2, 0, "p", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "footer", 46)(14, "button", 47);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_20_Conditional_0_For_17_Template_button_click_14_listener() { const classroom_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openSheet(classroom_r11)); });
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const classroom_r11 = ctx.$implicit;
    i0.ɵɵclassProp("klass--todo", !classroom_r11.done);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(classroom_r11.classroomName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", classroom_r11.expectedCount, " \u00E9l\u00E8ve(s) ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(classroom_r11.mainTeacherName ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(classroom_r11.done ? 8 : 9);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(classroom_r11.done ? 11 : 12);
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(classroom_r11.done ? "btn btn--ghost btn--sm" : "btn btn--primary btn--sm");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", classroom_r11.done ? "Voir ou corriger" : "Faire l'appel", " ");
} }
function AttendanceComponent_Conditional_20_Conditional_0_ForEmpty_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "p", 48);
    i0.ɵɵtext(2, "Aucune classe active.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 49);
    i0.ɵɵtext(4, " Cr\u00E9ez vos classes avant de faire l'appel : une feuille de pr\u00E9sence se rattache \u00E0 une classe et \u00E0 ses inscrits. ");
    i0.ɵɵelementEnd()();
} }
function AttendanceComponent_Conditional_20_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 10)(1, "button", 11);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_20_Conditional_0_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.goToPreviousDay()); });
    i0.ɵɵtext(2, "\u2039");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 12)(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, AttendanceComponent_Conditional_20_Conditional_0_Conditional_6_Template, 2, 0, "span", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 14);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_20_Conditional_0_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.goToNextDay()); });
    i0.ɵɵtext(8, "\u203A");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "label", 15)(10, "span", 16);
    i0.ɵɵtext(11, "Choisir une date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "input", 17);
    i0.ɵɵlistener("change", function AttendanceComponent_Conditional_20_Conditional_0_Template_input_change_12_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.changeDate($event.target.value)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(13, AttendanceComponent_Conditional_20_Conditional_0_Conditional_13_Template, 12, 1, "section", 18)(14, AttendanceComponent_Conditional_20_Conditional_0_Conditional_14_Template, 29, 6, "section", 19);
    i0.ɵɵelementStart(15, "section", 20);
    i0.ɵɵrepeaterCreate(16, AttendanceComponent_Conditional_20_Conditional_0_For_17_Template, 16, 10, "article", 21, _forTrack0, false, AttendanceComponent_Conditional_20_Conditional_0_ForEmpty_18_Template, 5, 0, "div", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_8_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.formatDate(ctx_r1.date()));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isToday() ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.isToday());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r1.date())("max", ctx_r1.maxDate);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.pendingClassrooms().length > 0 ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_8_0 = ctx_r1.day()) ? 14 : -1, tmp_8_0);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.orderedClassrooms());
} }
function AttendanceComponent_Conditional_20_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Absences et retards ensemble : trois quarts d'heure perdus chaque matin p\u00E8sent autant qu'une journ\u00E9e manqu\u00E9e. ");
} }
function AttendanceComponent_Conditional_20_Conditional_1_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Ce qui n'est pas encore couvert, de la plus ancienne absence \u00E0 la plus r\u00E9cente. La file se traite par le haut. ");
} }
function AttendanceComponent_Conditional_20_Conditional_1_For_6_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 64);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_20_Conditional_1_For_6_Template_button_click_0_listener() { const choice_r14 = i0.ɵɵrestoreView(_r13).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.changePeriod(choice_r14)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const choice_r14 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("chip--on", ctx_r1.periodDays() === choice_r14);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", choice_r14, " jours ");
} }
function AttendanceComponent_Conditional_20_Conditional_1_For_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r15 = ctx.$implicit;
    i0.ɵɵproperty("value", classroom_r15.classroomId);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(classroom_r15.classroomName);
} }
function AttendanceComponent_Conditional_20_Conditional_1_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 58)(1, "button", 64);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_20_Conditional_1_Conditional_15_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.changeFilter("ALL")); });
    i0.ɵɵtext(2, "Tout");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 64);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_20_Conditional_1_Conditional_15_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.changeFilter("UNJUSTIFIED")); });
    i0.ɵɵtext(4, "Non justifi\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 64);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_20_Conditional_1_Conditional_15_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.changeFilter("FOLLOW_UP")); });
    i0.ɵɵtext(6, "\u00C0 relancer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 64);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_20_Conditional_1_Conditional_15_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.changeFilter("LATENESS")); });
    i0.ɵɵtext(8, "Retards");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 64);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_20_Conditional_1_Conditional_15_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.changeFilter("JUSTIFIED")); });
    i0.ɵɵtext(10, "Justifi\u00E9");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("chip--on", ctx_r1.filter() === "ALL");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("chip--on", ctx_r1.filter() === "UNJUSTIFIED");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("chip--on", ctx_r1.filter() === "FOLLOW_UP");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("chip--on", ctx_r1.filter() === "LATENESS");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("chip--on", ctx_r1.filter() === "JUSTIFIED");
} }
function AttendanceComponent_Conditional_20_Conditional_1_Conditional_16_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 18)(1, "div", 23)(2, "span", 24);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "p", 25);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 26);
    i0.ɵɵtext(8, " Sur cette p\u00E9riode, ce n'est plus un incident. Ces situations se traitent avec la famille avant le conseil de classe, pas pendant. ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const g_r17 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", g_r17.repeatedCount, " \u00E9l\u00E8ve(s) \u00E0 trois absences non justifi\u00E9es ou plus ");
} }
function AttendanceComponent_Conditional_20_Conditional_1_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 19)(1, "article", 32)(2, "p", 33);
    i0.ɵɵtext(3, "Taux de pr\u00E9sence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 34);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 35);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "article", 36)(9, "p", 33);
    i0.ɵɵtext(10, "Absences");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 34);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 35);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "article", 37)(16, "p", 33);
    i0.ɵɵtext(17, "Retards");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p", 34);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p", 35);
    i0.ɵɵtext(21, "Compt\u00E9s pr\u00E9sents, jamais oubli\u00E9s");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "article", 32)(23, "p", 33);
    i0.ɵɵtext(24, "\u00C0 relancer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "p", 34);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p", 35);
    i0.ɵɵtext(28, "Sans justificatif depuis 2 jours ou plus");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(29, AttendanceComponent_Conditional_20_Conditional_1_Conditional_16_Conditional_29_Template, 9, 1, "section", 18);
} if (rf & 2) {
    const g_r17 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.formatRate(g_r17.attendanceRate));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Du ", ctx_r1.formatDate(g_r17.from), " au ", ctx_r1.formatDate(g_r17.to), "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(g_r17.absenceCount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", g_r17.justifiedCount, " justifi\u00E9e(s) au total");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(g_r17.latenessCount);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("stat--alert", g_r17.followUpCount > 0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(g_r17.followUpCount);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(g_r17.repeatedCount > 0 ? 29 : -1);
} }
function AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 68);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("il y a ", entry_r18.daysWaiting, " j");
} }
function AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 70);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", entry_r18.minutesLate, " min");
} }
function AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const entry_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", entry_r18.reason, " ");
} }
function AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 72);
    i0.ɵɵtext(1, "Aucun motif communiqu\u00E9");
    i0.ɵɵelementEnd();
} }
function AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 73);
    i0.ɵɵtext(1, "Famille relanc\u00E9e");
    i0.ɵɵelementEnd();
} }
function AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 13);
    i0.ɵɵtext(1, "Justifi\u00E9e");
    i0.ɵɵelementEnd();
} }
function AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_21_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 78);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_21_Conditional_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r20); const entry_r18 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.remind(entry_r18)); });
    i0.ɵɵtext(1, "Relancer");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
} }
function AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵtemplate(0, AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_21_Conditional_0_Template, 2, 1, "button", 76);
    i0.ɵɵelementStart(1, "button", 77);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_21_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r19); const entry_r18 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openJustify(entry_r18)); });
    i0.ɵɵtext(2, "Justifier");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵconditional(entry_r18.needsFollowUp && !entry_r18.guardianNotified ? 0 : -1);
} }
function AttendanceComponent_Conditional_20_Conditional_1_For_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "span", 65);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 66);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 67);
    i0.ɵɵtext(9);
    i0.ɵɵtemplate(10, AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_10_Template, 2, 1, "span", 68);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td")(12, "span", 69);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_14_Template, 2, 1, "span", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 71);
    i0.ɵɵtemplate(16, AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_16_Template, 1, 1)(17, AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_17_Template, 2, 0, "span", 72)(18, AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_18_Template, 2, 0, "span", 73);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 74);
    i0.ɵɵtemplate(20, AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_20_Template, 2, 0, "span", 13)(21, AttendanceComponent_Conditional_20_Conditional_1_For_37_Conditional_21_Template, 3, 1, "button", 75);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const entry_r18 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("row--alert", entry_r18.needsFollowUp);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(entry_r18.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r18.studentNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r18.classroomName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.formatDate(entry_r18.date), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(entry_r18.daysWaiting > 0 ? 10 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-tone", ctx_r1.markOf(entry_r18.status).tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", entry_r18.statusLabel, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(entry_r18.minutesLate ? 14 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(entry_r18.reason ? 16 : 17);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(entry_r18.guardianNotified && !entry_r18.justified ? 18 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(entry_r18.justified ? 20 : 21);
} }
function AttendanceComponent_Conditional_20_Conditional_1_ForEmpty_38_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucune absence ni retard enregistr\u00E9. V\u00E9rifiez que l'appel est bien fait chaque jour : une liste vide peut aussi vouloir dire qu'on ne sait rien. ");
} }
function AttendanceComponent_Conditional_20_Conditional_1_ForEmpty_38_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucune ligne ne correspond \u00E0 ce filtre. Les compteurs ci-dessus, eux, portent sur toute la p\u00E9riode. ");
} }
function AttendanceComponent_Conditional_20_Conditional_1_ForEmpty_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 79)(2, "div", 22)(3, "p", 48);
    i0.ɵɵtext(4, "Rien \u00E0 traiter sur cette p\u00E9riode.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 49);
    i0.ɵɵtemplate(6, AttendanceComponent_Conditional_20_Conditional_1_ForEmpty_38_Conditional_6_Template, 1, 0)(7, AttendanceComponent_Conditional_20_Conditional_1_ForEmpty_38_Conditional_7_Template, 1, 0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r1.filter() === "ALL" ? 6 : 7);
} }
function AttendanceComponent_Conditional_20_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 50);
    i0.ɵɵtemplate(1, AttendanceComponent_Conditional_20_Conditional_1_Conditional_1_Template, 1, 0)(2, AttendanceComponent_Conditional_20_Conditional_1_Conditional_2_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "section", 51)(4, "div", 52);
    i0.ɵɵrepeaterCreate(5, AttendanceComponent_Conditional_20_Conditional_1_For_6_Template, 2, 3, "button", 53, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "label", 54)(8, "span", 16);
    i0.ɵɵtext(9, "Filtrer par classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "select", 55);
    i0.ɵɵlistener("change", function AttendanceComponent_Conditional_20_Conditional_1_Template_select_change_10_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.changeClassroom($event.target.value)); });
    i0.ɵɵelementStart(11, "option", 56);
    i0.ɵɵtext(12, "Toutes les classes");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(13, AttendanceComponent_Conditional_20_Conditional_1_For_14_Template, 2, 2, "option", 57, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(15, AttendanceComponent_Conditional_20_Conditional_1_Conditional_15_Template, 11, 10, "div", 58);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(16, AttendanceComponent_Conditional_20_Conditional_1_Conditional_16_Template, 30, 10);
    i0.ɵɵelementStart(17, "div", 59)(18, "table", 60)(19, "caption", 16);
    i0.ɵɵtext(20, "Absences et retards de la p\u00E9riode");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "thead")(22, "tr")(23, "th", 61);
    i0.ɵɵtext(24, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "th", 61);
    i0.ɵɵtext(26, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "th", 61);
    i0.ɵɵtext(28, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "th", 61);
    i0.ɵɵtext(30, "Marque");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "th", 61);
    i0.ɵɵtext(32, "Motif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "th", 62);
    i0.ɵɵtext(34, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(35, "tbody");
    i0.ɵɵrepeaterCreate(36, AttendanceComponent_Conditional_20_Conditional_1_For_37_Template, 22, 13, "tr", 63, _forTrack1, false, AttendanceComponent_Conditional_20_Conditional_1_ForEmpty_38_Template, 8, 1, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_7_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.tab() === "SUIVI" ? 1 : 2);
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.periods);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r1.classroomFilter());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.classroomOptions());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.tab() === "SUIVI" ? 15 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_7_0 = ctx_r1.digest()) ? 16 : -1, tmp_7_0);
    i0.ɵɵadvance(20);
    i0.ɵɵrepeater(ctx_r1.waitingEntries());
} }
function AttendanceComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AttendanceComponent_Conditional_20_Conditional_0_Template, 19, 8)(1, AttendanceComponent_Conditional_20_Conditional_1_Template, 39, 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r1.tab() === "APPEL" ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.tab() !== "APPEL" ? 1 : -1);
} }
function AttendanceComponent_Conditional_21_For_12_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const lesson_r23 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", lesson_r23.teacherName, " ");
} }
function AttendanceComponent_Conditional_21_For_12_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const lesson_r23 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", lesson_r23.roomName, " ");
} }
function AttendanceComponent_Conditional_21_For_12_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 94);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r23 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" appel fait \u00B7 ", lesson_r23.absentCount, " absent(s) ");
} }
function AttendanceComponent_Conditional_21_For_12_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 95);
    i0.ɵɵtext(1, "commenc\u00E9");
    i0.ɵɵelementEnd();
} }
function AttendanceComponent_Conditional_21_For_12_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 96);
    i0.ɵɵtext(1, "\u00E0 faire");
    i0.ɵɵelementEnd();
} }
function AttendanceComponent_Conditional_21_For_12_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "button", 89);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_21_For_12_Template_button_click_1_listener() { const lesson_r23 = i0.ɵɵrestoreView(_r22).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openLesson(lesson_r23)); });
    i0.ɵɵelementStart(2, "span", 90);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 91)(5, "span", 92);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 93);
    i0.ɵɵtemplate(8, AttendanceComponent_Conditional_21_For_12_Conditional_8_Template, 1, 1)(9, AttendanceComponent_Conditional_21_For_12_Conditional_9_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, AttendanceComponent_Conditional_21_For_12_Conditional_10_Template, 2, 1, "span", 94)(11, AttendanceComponent_Conditional_21_For_12_Conditional_11_Template, 2, 0, "span", 95)(12, AttendanceComponent_Conditional_21_For_12_Conditional_12_Template, 2, 0, "span", 96);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lesson_r23 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("is-done", lesson_r23.done);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.lessonWhen(lesson_r23));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(lesson_r23.subjectName);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(lesson_r23.teacherName ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(lesson_r23.roomName ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(lesson_r23.done ? 10 : lesson_r23.sheetStarted ? 11 : 12);
} }
function AttendanceComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    let tmp_35_0;
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 80);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_21_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancelLessonPick()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 81)(2, "header", 82)(3, "div")(4, "h2", 83);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 84);
    i0.ɵɵtext(7, "Quel cours appelez-vous ?");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 85);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_21_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancelLessonPick()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "ul", 86);
    i0.ɵɵrepeaterCreate(11, AttendanceComponent_Conditional_21_For_12_Template, 13, 7, "li", null, _forTrack2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 87);
    i0.ɵɵtext(14, " Vous pr\u00E9f\u00E9rez un appel pour toute la journ\u00E9e ? ");
    i0.ɵɵelementStart(15, "button", 88);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_21_Template_button_click_15_listener() { const classroom_r24 = i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openDaySheet(classroom_r24)); });
    i0.ɵɵtext(16, " Appel de la journ\u00E9e ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx.classroomName);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r1.lessons());
} }
function AttendanceComponent_Conditional_22_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u00B7 ");
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r26 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r26.subjectName);
} }
function AttendanceComponent_Conditional_22_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u00B7 journ\u00E9e enti\u00E8re ");
} }
function AttendanceComponent_Conditional_22_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const s_r26 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", s_r26.startTime.slice(0, 5), " ");
} }
function AttendanceComponent_Conditional_22_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const s_r26 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", s_r26.teacherName, " ");
} }
function AttendanceComponent_Conditional_22_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const s_r26 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", s_r26.statusLabel, " ");
} }
function AttendanceComponent_Conditional_22_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 104);
    i0.ɵɵtext(1, " Cette feuille est verrouill\u00E9e : elle reste consultable, mais les marques ne peuvent plus changer. C'est elle qui a servi aux bulletins. ");
    i0.ɵɵelementEnd();
} }
function AttendanceComponent_Conditional_22_For_34_For_8_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 120);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_22_For_34_For_8_Template_button_click_0_listener() { const code_r29 = i0.ɵɵrestoreView(_r28).$implicit; const record_r30 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.mark(record_r30.studentId, code_r29)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const code_r29 = ctx.$implicit;
    const record_r30 = i0.ɵɵnextContext().$implicit;
    const s_r26 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("mark-btn--on", record_r30.status === code_r29);
    i0.ɵɵproperty("disabled", !s_r26.editable);
    i0.ɵɵattribute("data-tone", ctx_r1.markOf(code_r29).tone)("title", ctx_r1.markOf(code_r29).hint);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.markOf(code_r29).short, " ");
} }
function AttendanceComponent_Conditional_22_For_34_For_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r31 = ctx.$implicit;
    i0.ɵɵproperty("value", option_r31.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(option_r31.label);
} }
function AttendanceComponent_Conditional_22_For_34_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 119)(1, "span", 16);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 121);
    i0.ɵɵlistener("change", function AttendanceComponent_Conditional_22_For_34_Conditional_15_Template_input_change_3_listener($event) { i0.ɵɵrestoreView(_r32); const record_r30 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setArrivalTime(record_r30.studentId, $event.target.value)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const record_r30 = i0.ɵɵnextContext().$implicit;
    const s_r26 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Heure d'arriv\u00E9e de ", record_r30.studentName, "");
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", record_r30.arrivalTime || "")("disabled", !s_r26.editable);
} }
function AttendanceComponent_Conditional_22_For_34_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 107)(1, "div", 112)(2, "span", 113);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 114);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 115);
    i0.ɵɵrepeaterCreate(7, AttendanceComponent_Conditional_22_For_34_For_8_Template, 2, 6, "button", 116, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementStart(9, "label", 117)(10, "span", 16);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "select", 118);
    i0.ɵɵlistener("change", function AttendanceComponent_Conditional_22_For_34_Template_select_change_12_listener($event) { const record_r30 = i0.ɵɵrestoreView(_r27).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.mark(record_r30.studentId, $event.target.value)); });
    i0.ɵɵrepeaterCreate(13, AttendanceComponent_Conditional_22_For_34_For_14_Template, 2, 2, "option", 57, _forTrack4);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(15, AttendanceComponent_Conditional_22_For_34_Conditional_15_Template, 4, 3, "label", 119);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const record_r30 = ctx.$implicit;
    const s_r26 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("data-tone", ctx_r1.markOf(record_r30.status).tone);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(record_r30.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(record_r30.studentNumber);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", "Marque de " + record_r30.studentName);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.quickMarks);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Autre marque pour ", record_r30.studentName, "");
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", record_r30.status)("disabled", !s_r26.editable);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.marks);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(record_r30.status === "LATE" || record_r30.status === "EXCUSED_LATE" ? 15 : -1);
} }
function AttendanceComponent_Conditional_22_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 109);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.missingArrivalTimes(), " retard(s) sans heure d'arriv\u00E9e. ");
} }
function AttendanceComponent_Conditional_22_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 109);
    i0.ɵɵtext(1, " Marques pos\u00E9es, pas encore enregistr\u00E9es. ");
    i0.ɵɵelementEnd();
} }
function AttendanceComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 80);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_22_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r25); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeSheet()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 97)(2, "header", 82)(3, "div")(4, "h2", 98);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 99);
    i0.ɵɵtext(7);
    i0.ɵɵtemplate(8, AttendanceComponent_Conditional_22_Conditional_8_Template, 3, 1, "strong")(9, AttendanceComponent_Conditional_22_Conditional_9_Template, 1, 0)(10, AttendanceComponent_Conditional_22_Conditional_10_Template, 1, 1)(11, AttendanceComponent_Conditional_22_Conditional_11_Template, 1, 1)(12, AttendanceComponent_Conditional_22_Conditional_12_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "button", 85);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_22_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r25); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeSheet()); });
    i0.ɵɵtext(14, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 100)(16, "span", 101)(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(19, " pr\u00E9sents ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 102)(21, "strong");
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(23, " absents ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 103)(25, "strong");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(27, " retards ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "button", 78);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_22_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r25); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.markAllPresent()); });
    i0.ɵɵtext(29, " Tout le monde est pr\u00E9sent ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(30, AttendanceComponent_Conditional_22_Conditional_30_Template, 2, 0, "p", 104);
    i0.ɵɵelementStart(31, "div", 105)(32, "ul", 106);
    i0.ɵɵrepeaterCreate(33, AttendanceComponent_Conditional_22_For_34_Template, 16, 8, "li", 107, _forTrack3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "footer", 108);
    i0.ɵɵtemplate(36, AttendanceComponent_Conditional_22_Conditional_36_Template, 2, 1, "p", 109)(37, AttendanceComponent_Conditional_22_Conditional_37_Template, 2, 0, "p", 109);
    i0.ɵɵelementStart(38, "button", 110);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_22_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r25); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeSheet()); });
    i0.ɵɵtext(39, " Fermer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "button", 111);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_22_Template_button_click_40_listener() { i0.ɵɵrestoreView(_r25); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitSheet()); });
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const s_r26 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(s_r26.classroomName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.formatDate(s_r26.sessionDate), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(s_r26.subjectName ? 8 : 9);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(s_r26.startTime ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(s_r26.teacherName ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(s_r26.submittedAt ? 12 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.sheetCounters().present);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.sheetCounters().absent);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.sheetCounters().late);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !s_r26.editable);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!s_r26.editable ? 30 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(s_r26.records);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.missingArrivalTimes() > 0 ? 36 : ctx_r1.sheetDirty() ? 37 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || !s_r26.editable);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", s_r26.submittedAt ? "Enregistrer la correction" : "Valider l'appel", " ");
} }
function AttendanceComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 80);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_23_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r33); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeJustify()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 122)(2, "header", 82)(3, "div")(4, "h2", 123);
    i0.ɵɵtext(5, "Justificatif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 84);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 85);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_23_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r33); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeJustify()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 124);
    i0.ɵɵlistener("ngSubmit", function AttendanceComponent_Conditional_23_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r33); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitJustify()); });
    i0.ɵɵelementStart(11, "p", 104);
    i0.ɵɵtext(12, " L'absence ne dispara\u00EEt pas : elle devient justifi\u00E9e. L'\u00E9l\u00E8ve garde son historique, la famille n'est plus relanc\u00E9e. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 125)(14, "label", 126);
    i0.ɵɵtext(15, "Ce qui a \u00E9t\u00E9 pr\u00E9sent\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "input", 127);
    i0.ɵɵelementStart(17, "p", 128);
    i0.ɵɵtext(18, " C'est ce texte que relira le conseil de classe en juin. \u00AB Certificat m\u00E9dical du 12/03 \u00BB se comprend encore ; \u00AB RAS \u00BB ne se comprend plus. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 125)(20, "label", 129);
    i0.ɵɵtext(21, "Pi\u00E8ce num\u00E9ris\u00E9e (facultatif)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(22, "input", 130);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "footer", 108)(24, "button", 110);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_23_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r33); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeJustify()); });
    i0.ɵɵtext(25, " Annuler ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 111);
    i0.ɵɵlistener("click", function AttendanceComponent_Conditional_23_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r33); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitJustify()); });
    i0.ɵɵtext(27, " Enregistrer le justificatif ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const absence_r34 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate3(" ", absence_r34.studentName, " \u2014 ", absence_r34.classroomName, " \u2014 ", ctx_r1.formatDate(absence_r34.date), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.justifyForm);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("disabled", ctx_r1.justifyForm.invalid || ctx_r1.saving());
} }
/**
 * Attendance: the roll call, the follow-up, the excuses.
 *
 * <p>One screen for three moments that are the same fact seen at three
 * distances. A mark taken at half past seven becomes an absence to chase on
 * Thursday, and a slip handed in at the office turns it into a justified one.
 * Splitting them across three pages made people take the register and never
 * look at what it accumulated.</p>
 *
 * <p>The help works like the one in the configuration: a card appears by itself
 * the first time a tab is opened, and the « ? Aide » button brings it back
 * whenever it is wanted. Nothing here is obvious enough to be left unsaid — why
 * a class with no sheet is worse than a class full of absents, why the
 * attendance rate ignores the classes that were never called — and none of it
 * should have to be read twice by someone who already knows.</p>
 */
export class AttendanceComponent {
    dataSource = inject(ATTENDANCE_DATA_SOURCE);
    notifications = inject(NotificationService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    marks = ATTENDANCE_MARKS;
    quickMarks = QUICK_MARKS;
    totalSteps = 3;
    /** Fenêtres proposées au suivi : la semaine, le mois, le trimestre. */
    periods = [7, 30, 90];
    /** Bornes le sélecteur de date : on n'appelle pas un jour à venir. */
    maxDate = isoToday();
    tab = signal('APPEL');
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    /** Le jour appelé. Une date future est refusée : ce serait une saisie fausse. */
    date = signal(isoToday());
    day = signal(null);
    /** La feuille ouverte dans le panneau ; nulle quand il est fermé. */
    /**
     * La classe dont on est en train de choisir le cours.
     *
     * <p>Étape intermédiaire, et seulement quand elle a un emploi du temps :
     * au primaire un maître tient sa classe toute la journée, lui faire choisir
     * une matière serait une question sans réponse.</p>
     */
    pickingLesson = signal(null);
    lessons = signal([]);
    loadingLessons = signal(false);
    sheet = signal(null);
    sheetDirty = signal(false);
    digest = signal(null);
    filter = signal('ALL');
    classroomFilter = signal('');
    periodDays = signal(30);
    /** La ligne dont on saisit le justificatif ; nulle quand le panneau est fermé. */
    justifying = signal(null);
    /** Une clé par feuille ouverte : rejouer l'envoi ne crée pas de doublon. */
    idempotencyKey = newKey();
    justifyForm = this.fb.nonNullable.group({
        reason: ['', [Validators.required, Validators.maxLength(255)]],
        documentUrl: ['', [Validators.maxLength(500)]]
    });
    // ------------------------------------------------------------------ aide
    help = {
        APPEL: {
            step: 1,
            title: "L'appel se fait classe par classe, en une minute",
            description: "Chaque feuille s'ouvre avec tout le monde présent. Vous ne touchez "
                + "que les lignes qui changent — c'est ce qui permet d'appeler quarante élèves "
                + 'sans se tromper de nom.',
            points: [
                "Une classe sans feuille n'est pas une classe sans absents : c'est une classe "
                    + 'dont personne ne sait rien. Elle reste en tête de liste jusqu\'à ce que '
                    + "l'appel soit fait.",
                'Le taux du jour ne compte que les classes appelées. Compter les autres le '
                    + "ferait monter à mesure que l'appel se fait mal.",
                "Un retard demande son heure d'arrivée : sans elle, il n'est ni mesurable ni "
                    + 'cumulable en fin de trimestre.'
            ],
            ctaLabel: "J'ai compris, faire l'appel"
        },
        SUIVI: {
            step: 2,
            title: 'Les absences et les retards se lisent ensemble',
            description: 'Trois quarts d\'heure perdus chaque matin pèsent autant qu\'une '
                + 'journée manquée. Une liste qui ne montrerait que les absences entières ne '
                + 'ferait jamais apparaître ce cas-là.',
            points: [
                'Les compteurs portent sur toute la période. Seule la liste suit le filtre : '
                    + 'des totaux qui suivraient le filtre permettraient de réduire la vue jusqu\'à '
                    + 'ce que tout paraisse en ordre.',
                'Une absence justifiée reste visible. Effacée, elle laisserait un conseil de '
                    + 'classe se demander pourquoi un élève a manqué un trimestre avec un dossier '
                    + 'vierge.',
                "Trois absences non justifiées sur la période, ce n'est plus un incident : "
                    + "c'est une tendance, et l'écran le dit."
            ],
            ctaLabel: 'Voir le suivi'
        },
        ATTENTE: {
            step: 3,
            title: 'Ce qui attend encore un justificatif',
            description: 'Les absences non couvertes, de la plus ancienne à la plus récente. '
                + "Passé deux jours, un justificatif qui n'est pas arrivé n'arrive généralement "
                + 'plus tout seul : c\'est le moment d\'appeler.',
            points: [
                'La relance est inscrite sur la ligne, pas seulement envoyée. À deux, on '
                    + "n'appelle pas deux fois la même famille en oubliant la suivante.",
                "Enregistrer un justificatif ne supprime pas l'absence : il la couvre. "
                    + "L'élève garde son historique, la famille n'est plus relancée.",
                'Le motif saisi ici est celui que relira le conseil de classe. « Certificat '
                    + 'médical du 12/03 » se comprend en juin ; « RAS » ne se comprend plus.'
            ],
            ctaLabel: 'Traiter la file'
        }
    };
    helpCopy = computed(() => this.help[this.tab()]);
    // --------------------------------------------------------------- cycle
    ngOnInit() {
        this.loadDay();
    }
    changeTab(tab) {
        this.tab.set(tab);
        this.closeSheet();
        this.justifying.set(null);
        if (tab === 'APPEL') {
            this.loadDay();
        }
        else {
            this.filter.set(tab === 'ATTENTE' ? 'UNJUSTIFIED' : 'ALL');
            this.loadDigest();
        }
    }
    reload() {
        if (this.tab() === 'APPEL') {
            this.loadDay();
        }
        else {
            this.loadDigest();
        }
    }
    // ---------------------------------------------------------- appel du jour
    loadDay() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.day(this.date())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (day) => {
                this.day.set(day);
                this.loading.set(false);
            },
            error: (err) => {
                this.loading.set(false);
                this.error.set(true);
                this.explain(err);
            }
        });
    }
    changeDate(value) {
        if (!value) {
            return;
        }
        if (value > isoToday()) {
            this.notifications.error("On ne fait pas l'appel d'un jour qui n'est pas encore arrivé.", 'Date refusée');
            return;
        }
        this.date.set(value);
        this.loadDay();
    }
    goToPreviousDay() {
        this.changeDate(shiftDays(this.date(), -1));
    }
    goToNextDay() {
        const next = shiftDays(this.date(), 1);
        if (next <= isoToday()) {
            this.changeDate(next);
        }
    }
    isToday = computed(() => this.date() === isoToday());
    /** Les classes non appelées d'abord : ce sont elles qui restent à faire. */
    orderedClassrooms = computed(() => {
        const list = [...(this.day()?.classrooms ?? [])];
        return list.sort((a, b) => Number(a.done) - Number(b.done)
            || a.classroomName.localeCompare(b.classroomName));
    });
    pendingClassrooms = computed(() => this.orderedClassrooms().filter((c) => !c.done));
    // -------------------------------------------------------------- feuille
    /**
     * Ouvre l'appel d'une classe.
     *
     * <p>Demande d'abord ses cours du jour. S'il y en a, on laisse choisir
     * lequel : au collège l'absence se constate cours par cours, et un appel
     * unique compterait présent tout le jour un élève parti après la récréation.
     * S'il n'y en a pas, on ouvre directement l'appel de la journée.</p>
     */
    openSheet(classroom) {
        this.loadingLessons.set(true);
        this.lessons.set([]);
        this.dataSource.lessons(classroom.classroomId, this.date())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (lessons) => {
                this.loadingLessons.set(false);
                if (lessons.length === 0) {
                    this.openDaySheet(classroom);
                    return;
                }
                this.lessons.set(lessons);
                this.pickingLesson.set(classroom);
            },
            error: () => {
                // L'emploi du temps indisponible ne doit pas empêcher l'appel :
                // on retombe sur celui de la journée plutôt que de bloquer.
                this.loadingLessons.set(false);
                this.openDaySheet(classroom);
            }
        });
    }
    /** L'appel de la journée entière, sans matière. */
    openDaySheet(classroom) {
        this.pickingLesson.set(null);
        this.loadSheet(classroom.classroomId, undefined);
    }
    /** L'appel d'un cours précis. */
    openLesson(lesson) {
        const classroom = this.pickingLesson();
        if (!classroom) {
            return;
        }
        this.pickingLesson.set(null);
        this.loadSheet(classroom.classroomId, lesson.subjectId);
    }
    cancelLessonPick() {
        this.pickingLesson.set(null);
        this.lessons.set([]);
    }
    loadSheet(classroomId, subjectId) {
        this.saving.set(false);
        this.sheetDirty.set(false);
        this.idempotencyKey = newKey();
        this.dataSource.openSheet(classroomId, this.date(), subjectId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (sheet) => this.sheet.set(sheet),
            error: (err) => this.explain(err)
        });
    }
    /** « 08:00 – 09:00 », ou la matière seule si l'horaire manque. */
    lessonWhen(lesson) {
        if (!lesson.startTime) {
            return '';
        }
        const end = lesson.endTime ? ` – ${lesson.endTime.slice(0, 5)}` : '';
        return `${lesson.startTime.slice(0, 5)}${end}`;
    }
    closeSheet() {
        this.sheet.set(null);
        this.sheetDirty.set(false);
    }
    mark(studentId, status) {
        this.sheetDirty.set(true);
        this.sheet.update((current) => current === null ? current : {
            ...current,
            records: current.records.map((record) => record.studentId !== studentId
                ? record
                : {
                    ...record,
                    status,
                    statusLabel: labelOf(status),
                    // Un retard sans heure d'arrivée n'est pas mesurable : on propose
                    // l'heure courante, qui reste modifiable.
                    arrivalTime: status === 'LATE' || status === 'EXCUSED_LATE'
                        ? record.arrivalTime ?? currentTime()
                        : undefined
                })
        });
    }
    setArrivalTime(studentId, value) {
        this.sheetDirty.set(true);
        this.sheet.update((current) => current === null ? current : {
            ...current,
            records: current.records.map((record) => record.studentId === studentId
                ? { ...record, arrivalTime: value || undefined }
                : record)
        });
    }
    markAllPresent() {
        this.sheetDirty.set(true);
        this.sheet.update((current) => current === null ? current : {
            ...current,
            records: current.records.map((record) => ({
                ...record,
                status: 'PRESENT',
                statusLabel: labelOf('PRESENT'),
                arrivalTime: undefined
            }))
        });
    }
    /** Le compte de la feuille ouverte, recalculé à chaque marque. */
    sheetCounters = computed(() => {
        const records = this.sheet()?.records ?? [];
        const absent = records.filter((r) => r.status === 'ABSENT'
            || r.status === 'EXCUSED_ABSENCE').length;
        const late = records.filter((r) => r.status === 'LATE'
            || r.status === 'EXCUSED_LATE').length;
        return {
            total: records.length,
            absent,
            late,
            // Les présents sont ce qui reste : le compte tombe toujours juste.
            present: Math.max(0, records.length - absent - late)
        };
    });
    /** Un retard sans heure bloque l'enregistrement : le serveur le refuserait. */
    missingArrivalTimes = computed(() => (this.sheet()?.records ?? []).filter((r) => (r.status === 'LATE' || r.status === 'EXCUSED_LATE') && !r.arrivalTime).length);
    submitSheet() {
        const sheet = this.sheet();
        if (!sheet || this.saving()) {
            return;
        }
        if (this.missingArrivalTimes() > 0) {
            this.notifications.error("Un retard doit porter une heure d'arrivée : sans elle, il n'est ni mesurable "
                + 'ni cumulable en fin de trimestre.', 'Heure manquante');
            return;
        }
        this.saving.set(true);
        this.dataSource.submitSheet(sheet, this.idempotencyKey)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (saved) => {
                const counters = this.sheetCounters();
                this.saving.set(false);
                this.closeSheet();
                this.loadDay();
                this.notifications.success(`${saved.classroomName} : ${counters.present} présent(s), `
                    + `${counters.absent} absent(s), ${counters.late} retard(s). `
                    + 'Les familles concernées sont prévenues.', 'Appel enregistré');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ------------------------------------------------------------- le suivi
    loadDigest() {
        this.loading.set(true);
        this.error.set(false);
        const to = isoToday();
        this.dataSource.absences({
            from: shiftDays(to, -this.periodDays()),
            to,
            classroomId: this.classroomFilter() || undefined,
            filter: this.filter()
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (digest) => {
                this.digest.set(digest);
                this.loading.set(false);
            },
            error: (err) => {
                this.loading.set(false);
                this.error.set(true);
                this.explain(err);
            }
        });
    }
    changePeriod(days) {
        this.periodDays.set(days);
        this.loadDigest();
    }
    changeFilter(filter) {
        this.filter.set(filter);
        this.loadDigest();
    }
    changeClassroom(classroomId) {
        this.classroomFilter.set(classroomId);
        this.loadDigest();
    }
    /** Les classes proposées au filtre viennent du jour déjà chargé. */
    classroomOptions = computed(() => this.day()?.classrooms ?? []);
    waitingEntries = computed(() => {
        const entries = this.digest()?.entries ?? [];
        // Du plus ancien au plus récent : la file se traite par le haut.
        return [...entries].sort((a, b) => a.date.localeCompare(b.date));
    });
    // -------------------------------------------------------- justificatifs
    openJustify(absence) {
        this.justifying.set(absence);
        this.justifyForm.reset({ reason: absence.reason ?? '', documentUrl: '' });
    }
    closeJustify() {
        this.justifying.set(null);
    }
    submitJustify() {
        const absence = this.justifying();
        if (!absence || this.justifyForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        const value = this.justifyForm.getRawValue();
        this.dataSource.justify(absence.id, {
            reason: value.reason.trim(),
            documentUrl: value.documentUrl.trim() || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (saved) => {
                this.saving.set(false);
                this.justifying.set(null);
                this.loadDigest();
                this.notifications.success(`L'absence du ${formatDay(saved.date)} de ${saved.studentName} est justifiée. `
                    + "Elle reste dans son historique, elle n'y est plus reprochée.", 'Justificatif enregistré');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    remind(absence) {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        this.dataSource.remind(absence.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (saved) => {
                this.saving.set(false);
                this.loadDigest();
                this.notifications.success(`La famille de ${saved.studentName} est relancée. La date est inscrite sur `
                    + "la ligne : personne ne rappellera pour la même absence.", 'Relance envoyée');
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    // ------------------------------------------------------------- affichage
    markOf(status) {
        return this.marks.find((m) => m.code === status) ?? this.marks[0];
    }
    formatDate(iso) {
        return formatDay(iso);
    }
    formatRate(rate) {
        return rate === undefined || rate === null ? '—' : `${rate.toFixed(1)} %`;
    }
    /** Traduit le code du serveur plutôt que d'afficher « erreur ». */
    explain(err) {
        const error = err?.error;
        if (error?.code) {
            this.notifications.error(error.message ?? translateErrorCode(error.code), 'Action refusée');
        }
    }
    static ɵfac = function AttendanceComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AttendanceComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AttendanceComponent, selectors: [["eduops-attendance"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 24, vars: 23, consts: [[1, "page"], ["flow", "attendance", "eyebrow", "Conseil pour cet onglet", 3, "stepKey", "stepNumber", "totalSteps", "title", "description", "points", "ctaLabel"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], ["role", "tablist", 1, "tabs"], ["type", "button", "role", "tab", 1, "tabs__item", 3, "click"], [1, "tabs__badge", "numeric"], ["message", "Chargement des pr\u00E9sences..."], [3, "retry"], [1, "daybar", "card"], ["type", "button", "aria-label", "Jour pr\u00E9c\u00E9dent", 1, "daybar__nav", 3, "click"], [1, "daybar__label"], [1, "pill", "pill--ok"], ["type", "button", "aria-label", "Jour suivant", 1, "daybar__nav", 3, "click", "disabled"], [1, "daybar__picker"], [1, "visually-hidden"], ["type", "date", 1, "input", 3, "change", "value", "max"], ["role", "status", 1, "alert-block"], [1, "stats"], [1, "grid", "grid--3"], [1, "klass", "card", 3, "klass--todo"], [1, "empty-state"], [1, "alert-block__head"], ["aria-hidden", "true", 1, "alert-block__icon"], [1, "alert-block__title"], [1, "alert-block__text"], [1, "pending"], [1, "pending__item"], [1, "pending__name"], [1, "pending__cycle", "numeric"], ["type", "button", 1, "btn", "btn--primary", "btn--sm", 3, "click"], [1, "stat"], [1, "stat__label"], [1, "stat__value", "numeric"], [1, "stat__note"], [1, "stat", "stat--absent"], [1, "stat", "stat--late"], [1, "klass", "card"], [1, "klass__head"], [1, "klass__name"], [1, "klass__meta", "numeric"], [1, "pill", "pill--warn"], [1, "klass__body"], [1, "klass__counts", "numeric"], [1, "klass__counts", "klass__counts--none"], [1, "klass__footer"], ["type", "button", 3, "click"], [1, "empty-state__title"], [1, "empty-state__text"], [1, "lead"], [1, "filters"], ["role", "group", "aria-label", "P\u00E9riode", 1, "filters__group"], ["type", "button", 1, "chip", 3, "chip--on"], [1, "filters__select"], [1, "input", 3, "change", "value"], ["value", ""], [3, "value"], ["role", "group", "aria-label", "Type", 1, "filters__group"], [1, "table-wrapper", "card"], [1, "table"], ["scope", "col"], ["scope", "col", 1, "cell-actions"], [3, "row--alert"], ["type", "button", 1, "chip", 3, "click"], [1, "entry__name"], [1, "entry__number", "numeric"], [1, "numeric"], [1, "entry__age"], [1, "mark"], [1, "entry__age", "numeric"], [1, "entry__reason"], [1, "muted"], [1, "pill", "pill--muted"], [1, "cell-actions"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "disabled"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], ["colspan", "6"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "lesson-title", 1, "drawer"], [1, "drawer__head"], ["id", "lesson-title", 1, "drawer__title"], [1, "drawer__meta"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "lessons"], [1, "lessons__fallback"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["type", "button", 1, "lesson", 3, "click"], [1, "lesson__when", "numeric"], [1, "lesson__body"], [1, "lesson__subject"], [1, "lesson__meta"], [1, "lesson__state", "lesson__state--done"], [1, "lesson__state", "lesson__state--started"], [1, "lesson__state"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "sheet-title", 1, "drawer", "drawer--wide"], ["id", "sheet-title", 1, "drawer__title"], [1, "drawer__meta", "numeric"], [1, "sheet-counters", "numeric"], [1, "sheet-counters__item"], [1, "sheet-counters__item", "sheet-counters__item--absent"], [1, "sheet-counters__item", "sheet-counters__item--late"], [1, "hint-block"], [1, "drawer__body"], [1, "roll"], [1, "roll__item"], [1, "drawer__foot"], [1, "drawer__warning"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [1, "roll__identity"], [1, "roll__name"], [1, "roll__number", "numeric"], ["role", "group", 1, "roll__marks"], ["type", "button", 1, "mark-btn", 3, "mark-btn--on", "disabled"], [1, "roll__more"], [1, "input", "input--tiny", 3, "change", "value", "disabled"], [1, "roll__time"], ["type", "button", 1, "mark-btn", 3, "click", "disabled"], ["type", "time", 1, "input", "input--tiny", 3, "change", "value", "disabled"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "justify-title", 1, "drawer"], ["id", "justify-title", 1, "drawer__title"], [1, "drawer__body", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "justify-reason", 1, "field__label", "field__label--required"], ["id", "justify-reason", "formControlName", "reason", "placeholder", "Certificat m\u00E9dical du 12/03", 1, "input"], [1, "field__hint"], ["for", "justify-url", 1, "field__label", "field__label--required"], ["id", "justify-url", "formControlName", "documentUrl", "placeholder", "https://...", 1, "input"]], template: function AttendanceComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "eduops-step-coachmark", 1);
            i0.ɵɵelementStart(2, "header", 2)(3, "div")(4, "h1", 3);
            i0.ɵɵtext(5, "Pr\u00E9sences");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 4);
            i0.ɵɵtemplate(7, AttendanceComponent_Conditional_7_Template, 1, 1)(8, AttendanceComponent_Conditional_8_Template, 1, 1);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "nav", 5)(10, "button", 6);
            i0.ɵɵlistener("click", function AttendanceComponent_Template_button_click_10_listener() { return ctx.changeTab("APPEL"); });
            i0.ɵɵtext(11, " Appel du jour ");
            i0.ɵɵtemplate(12, AttendanceComponent_Conditional_12_Template, 2, 1, "span", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 6);
            i0.ɵɵlistener("click", function AttendanceComponent_Template_button_click_13_listener() { return ctx.changeTab("SUIVI"); });
            i0.ɵɵtext(14, " Suivi des absences ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "button", 6);
            i0.ɵɵlistener("click", function AttendanceComponent_Template_button_click_15_listener() { return ctx.changeTab("ATTENTE"); });
            i0.ɵɵtext(16, " Justificatifs et relances ");
            i0.ɵɵtemplate(17, AttendanceComponent_Conditional_17_Template, 1, 1);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(18, AttendanceComponent_Conditional_18_Template, 1, 0, "eduops-loading-state", 8)(19, AttendanceComponent_Conditional_19_Template, 1, 0, "eduops-error-state")(20, AttendanceComponent_Conditional_20_Template, 2, 2)(21, AttendanceComponent_Conditional_21_Template, 17, 1)(22, AttendanceComponent_Conditional_22_Template, 42, 14)(23, AttendanceComponent_Conditional_23_Template, 28, 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_15_0;
            let tmp_17_0;
            let tmp_18_0;
            let tmp_19_0;
            i0.ɵɵadvance();
            i0.ɵɵproperty("stepKey", ctx.tab())("stepNumber", ctx.helpCopy().step)("totalSteps", ctx.totalSteps)("title", ctx.helpCopy().title)("description", ctx.helpCopy().description)("points", ctx.helpCopy().points)("ctaLabel", ctx.helpCopy().ctaLabel);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.tab() === "APPEL" ? 7 : 8);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "APPEL");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "APPEL");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.pendingClassrooms().length > 0 ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "SUIVI");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "SUIVI");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "ATTENTE");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "ATTENTE");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional((tmp_15_0 = ctx.digest()) ? 17 : -1, tmp_15_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 18 : ctx.error() ? 19 : 20);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_17_0 = ctx.pickingLesson()) ? 21 : -1, tmp_17_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_18_0 = ctx.sheet()) ? 22 : -1, tmp_18_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_19_0 = ctx.justifying()) ? 23 : -1, tmp_19_0);
        } }, dependencies: [CommonModule, FormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName, LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent], styles: ["@import 'styles/tokens';\n\n.lead[_ngcontent-%COMP%] {\n  max-width: 68ch;\n  margin: 0 0 var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n}\n\n.muted[_ngcontent-%COMP%] { color: var(--text-muted); }\n\n\n\n\n.tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n\n\n\n.pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-badge);\n  white-space: nowrap;\n\n  &--ok { color: var(--success); background: var(--success-bg); }\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n  &--muted { color: var(--text-muted); background: var(--surface-sunken); }\n}\n\n\n\n\n.daybar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  margin-bottom: var(--space-5);\n\n  &__nav {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    line-height: 1;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &:disabled { opacity: 0.4; cursor: not-allowed; }\n    &:hover:not(:disabled) { color: var(--text-strong); }\n  }\n\n  &__label {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex: 1;\n    text-transform: capitalize;\n    color: var(--text-strong);\n  }\n\n  &__picker { margin-left: auto; }\n  &__picker .input { width: auto; }\n}\n\n\n\n\n.stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));\n  gap: var(--space-4);\n  margin-bottom: var(--space-5);\n}\n\n.stat[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 3px solid var(--border-strong);\n  border-radius: var(--radius-card);\n\n  &__label { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n  &__value { margin: 2px 0; font-size: var(--text-2xl); color: var(--text-strong); }\n  &__note { margin: 0; font-size: var(--text-xs); color: var(--text-light); }\n\n  &--absent { border-left-color: var(--danger); }\n  &--late { border-left-color: var(--warning); }\n  &--alert {\n    border-left-color: var(--warning);\n    background: var(--warning-bg);\n  }\n}\n\n\n\n\n.alert-block[_ngcontent-%COMP%] {\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 22px;\n    height: 22px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-4) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n\n.klass[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n\n  &--todo { border-color: var(--warning); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4);\n  }\n\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__body { flex: 1; padding: 0 var(--space-4) var(--space-3); }\n\n  &__counts {\n    margin: 0;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n\n    &--none { font-style: italic; color: var(--text-light); }\n  }\n\n  &__footer {\n    display: flex;\n    justify-content: flex-end;\n    padding: var(--space-3) var(--space-4);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n\n\n\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--space-3);\n  margin-bottom: var(--space-5);\n\n  &__group { display: inline-flex; flex-wrap: wrap; gap: var(--space-2); }\n  &__select .input { width: auto; }\n}\n\n.chip[_ngcontent-%COMP%] {\n  padding: var(--space-2) var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-pill);\n  cursor: pointer;\n\n  &--on {\n    font-weight: 600;\n    color: var(--brand);\n    background: var(--brand-tint);\n    border-color: var(--brand-tint-border);\n  }\n}\n\n\n\n\n.table-wrapper[_ngcontent-%COMP%] { overflow-x: auto; }\n\n.cell-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-2);\n  justify-content: flex-end;\n  white-space: nowrap;\n}\n\n.row--alert[_ngcontent-%COMP%] { background: var(--warning-bg); }\n\n.entry[_ngcontent-%COMP%] {\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__number { display: block; font-size: var(--text-xs); color: var(--text-light); }\n  &__age { margin-left: var(--space-2); font-size: var(--text-xs); color: var(--text-light); }\n  &__reason { font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n.mark[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='ok'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='absent'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='late'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='other'] { color: var(--text-muted); background: var(--surface-sunken); }\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n\n\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n  width: min(440px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &--wide { width: min(620px, 100vw); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n  &__meta {\n    margin: 2px 0 0;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    text-transform: capitalize;\n  }\n\n  &__close {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border-light);\n  }\n\n  &__warning {\n    flex: 1;\n    margin: 0;\n    font-size: var(--text-xs);\n    color: var(--warning);\n  }\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n}\n\n\n\n\n.sheet-counters[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n\n  &__item strong { color: var(--text-strong); }\n  &__item--absent strong { color: var(--danger); }\n  &__item--late strong { color: var(--warning); }\n  .btn { margin-left: auto; }\n}\n\n.roll[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    border-left: 3px solid transparent;\n    border-radius: var(--radius-input);\n\n    &[data-tone='absent'] { background: var(--danger-bg); border-left-color: var(--danger); }\n    &[data-tone='late'] { background: var(--warning-bg); border-left-color: var(--warning); }\n    &[data-tone='other'] { background: var(--surface-sunken); }\n  }\n\n  &__identity { display: flex; flex-direction: column; min-width: 0; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__number { font-size: var(--text-xs); color: var(--text-light); }\n\n  &__marks {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex: none;\n  }\n\n  &__more .input,\n  &__time .input { width: auto; }\n}\n\n.mark-btn[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 32px;\n  font-size: var(--text-sm);\n  font-weight: 700;\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: var(--radius-input);\n  cursor: pointer;\n\n  &:disabled { opacity: 0.5; cursor: not-allowed; }\n\n  &--on[data-tone='ok'] {\n    color: var(--text-on-brand);\n    background: var(--success);\n    border-color: var(--success);\n  }\n\n  &--on[data-tone='absent'] {\n    color: #fff;\n    background: var(--danger);\n    border-color: var(--danger);\n  }\n\n  &--on[data-tone='late'] {\n    color: #fff;\n    background: var(--warning);\n    border-color: var(--warning);\n  }\n}\n\n.input--tiny[_ngcontent-%COMP%] { width: 92px; padding: 4px var(--space-2); }\n\n@include mobile {\n  .drawer,\n  .drawer--wide { width: 100vw; }\n\n  .roll__item { flex-direction: column; align-items: flex-start; }\n  .sheet-counters { flex-wrap: wrap; }\n}\n\n\n\n\n.lessons[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n\n  &__fallback {\n    margin: 1rem 0 0;\n    padding-top: 0.75rem;\n    border-top: 1px solid var(--border-strong);\n    font-size: 0.85rem;\n    color: var(--text-muted);\n  }\n}\n\n.lesson[_ngcontent-%COMP%] {\n  width: 100%;\n  display: grid;\n  grid-template-columns: 5.5rem 1fr auto;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid var(--border-strong);\n  border-radius: 10px;\n  background: var(--surface-card);\n  text-align: left;\n  cursor: pointer;\n\n  &:hover { border-color: var(--brand); }\n\n  \n\n\n  &.is-done { opacity: 0.62; }\n\n  &__when {\n    font-size: 0.82rem;\n    color: var(--text-muted);\n  }\n\n  &__body {\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n  }\n\n  &__subject {\n    font-weight: 600;\n    font-size: 0.92rem;\n  }\n\n  &__meta {\n    font-size: 0.78rem;\n    color: var(--text-muted);\n  }\n\n  &__state {\n    font-size: 0.72rem;\n    font-weight: 600;\n    padding: 0.12rem 0.5rem;\n    border-radius: 999px;\n    background: rgba(100, 116, 139, 0.14);\n    color: #475569;\n    white-space: nowrap;\n\n    &--done { background: rgba(22, 163, 74, 0.14); color: #15803d; }\n    &--started { background: rgba(217, 119, 6, 0.16); color: #b45309; }\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AttendanceComponent, [{
        type: Component,
        args: [{ selector: 'eduops-attendance', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule,
                    LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n\n  <!-- L'aide de la configuration, appliqu\u00E9e telle quelle : une carte au premier\n       passage sur l'onglet, un bouton \u00AB ? Aide \u00BB pour la revoir ensuite. -->\n  <eduops-step-coachmark\n    flow=\"attendance\"\n    [stepKey]=\"tab()\"\n    [stepNumber]=\"helpCopy().step\"\n    [totalSteps]=\"totalSteps\"\n    eyebrow=\"Conseil pour cet onglet\"\n    [title]=\"helpCopy().title\"\n    [description]=\"helpCopy().description\"\n    [points]=\"helpCopy().points\"\n    [ctaLabel]=\"helpCopy().ctaLabel\" />\n\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Pr\u00E9sences</h1>\n      <p class=\"page__meta numeric\">\n        @if (tab() === 'APPEL') {\n          @if (day(); as d) {\n            {{ d.sheetsDone }}/{{ d.classroomCount }} classe(s) appel\u00E9e(s)\n            @if (d.attendanceRate !== undefined) {\n              \u00B7 {{ formatRate(d.attendanceRate) }} de pr\u00E9sence\n            }\n            @if (d.termName) { \u00B7 {{ d.termName }} }\n          }\n        } @else {\n          @if (digest(); as g) {\n            {{ g.absenceCount }} absence(s) et {{ g.latenessCount }} retard(s) \u2014\n            {{ g.studentCount }} \u00E9l\u00E8ve(s) concern\u00E9(s)\n          }\n        }\n      </p>\n    </div>\n  </header>\n\n  <nav class=\"tabs\" role=\"tablist\">\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'APPEL'\"\n            [attr.aria-selected]=\"tab() === 'APPEL'\"\n            (click)=\"changeTab('APPEL')\">\n      Appel du jour\n      @if (pendingClassrooms().length > 0) {\n        <span class=\"tabs__badge numeric\">{{ pendingClassrooms().length }}</span>\n      }\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'SUIVI'\"\n            [attr.aria-selected]=\"tab() === 'SUIVI'\"\n            (click)=\"changeTab('SUIVI')\">\n      Suivi des absences\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'ATTENTE'\"\n            [attr.aria-selected]=\"tab() === 'ATTENTE'\"\n            (click)=\"changeTab('ATTENTE')\">\n      Justificatifs et relances\n      @if (digest(); as g) {\n        @if (g.followUpCount > 0) {\n          <span class=\"tabs__badge numeric\">{{ g.followUpCount }}</span>\n        }\n      }\n    </button>\n  </nav>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des pr\u00E9sences...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"reload()\" />\n  } @else {\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Appel du jour \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (tab() === 'APPEL') {\n\n      <section class=\"daybar card\">\n        <button type=\"button\" class=\"daybar__nav\" (click)=\"goToPreviousDay()\"\n                aria-label=\"Jour pr\u00E9c\u00E9dent\">\u2039</button>\n        <div class=\"daybar__label\">\n          <strong>{{ formatDate(date()) }}</strong>\n          @if (isToday()) { <span class=\"pill pill--ok\">Aujourd'hui</span> }\n        </div>\n        <button type=\"button\" class=\"daybar__nav\" (click)=\"goToNextDay()\"\n                [disabled]=\"isToday()\" aria-label=\"Jour suivant\">\u203A</button>\n        <label class=\"daybar__picker\">\n          <span class=\"visually-hidden\">Choisir une date</span>\n          <input type=\"date\" class=\"input\" [value]=\"date()\" [max]=\"maxDate\"\n                 (change)=\"changeDate($any($event.target).value)\" />\n        </label>\n      </section>\n\n      @if (pendingClassrooms().length > 0) {\n        <section class=\"alert-block\" role=\"status\">\n          <div class=\"alert-block__head\">\n            <span class=\"alert-block__icon\" aria-hidden=\"true\">!</span>\n            <div>\n              <p class=\"alert-block__title\">\n                {{ pendingClassrooms().length }} classe(s) sans appel\n              </p>\n              <p class=\"alert-block__text\">\n                Ce ne sont pas des classes sans absents : ce sont des classes dont\n                personne ne sait rien. Aucune famille ne sera pr\u00E9venue, et le taux\n                du jour ne les compte pas.\n              </p>\n            </div>\n          </div>\n          <ul class=\"pending\">\n            @for (classroom of pendingClassrooms(); track classroom.classroomId) {\n              <li class=\"pending__item\">\n                <span class=\"pending__name\">{{ classroom.classroomName }}</span>\n                <span class=\"pending__cycle numeric\">\n                  {{ classroom.expectedCount }} \u00E9l\u00E8ve(s)\n                  @if (classroom.mainTeacherName) { \u00B7 {{ classroom.mainTeacherName }} }\n                </span>\n                <button type=\"button\" class=\"btn btn--primary btn--sm\"\n                        (click)=\"openSheet(classroom)\">Faire l'appel</button>\n              </li>\n            }\n          </ul>\n        </section>\n      }\n\n      @if (day(); as d) {\n        <section class=\"stats\">\n          <article class=\"stat\">\n            <p class=\"stat__label\">Taux de pr\u00E9sence</p>\n            <p class=\"stat__value numeric\">{{ formatRate(d.attendanceRate) }}</p>\n            <p class=\"stat__note\">Sur les {{ d.sheetsDone }} classe(s) appel\u00E9e(s)</p>\n          </article>\n          <article class=\"stat\">\n            <p class=\"stat__label\">Pr\u00E9sents</p>\n            <p class=\"stat__value numeric\">{{ d.presentCount }}</p>\n            <p class=\"stat__note\">sur {{ d.expectedCount }} attendus</p>\n          </article>\n          <article class=\"stat stat--absent\">\n            <p class=\"stat__label\">Absents</p>\n            <p class=\"stat__value numeric\">{{ d.absentCount }}</p>\n            <p class=\"stat__note\">Familles pr\u00E9venues \u00E0 l'enregistrement</p>\n          </article>\n          <article class=\"stat stat--late\">\n            <p class=\"stat__label\">Retards</p>\n            <p class=\"stat__value numeric\">{{ d.lateCount }}</p>\n            <p class=\"stat__note\">Compt\u00E9s pr\u00E9sents au taux</p>\n          </article>\n        </section>\n      }\n\n      <section class=\"grid grid--3\">\n        @for (classroom of orderedClassrooms(); track classroom.classroomId) {\n          <article class=\"klass card\" [class.klass--todo]=\"!classroom.done\">\n            <header class=\"klass__head\">\n              <div>\n                <h2 class=\"klass__name\">{{ classroom.classroomName }}</h2>\n                <p class=\"klass__meta numeric\">\n                  {{ classroom.expectedCount }} \u00E9l\u00E8ve(s)\n                  @if (classroom.mainTeacherName) { \u00B7 {{ classroom.mainTeacherName }} }\n                </p>\n              </div>\n              @if (classroom.done) {\n                <span class=\"pill pill--ok\">{{ classroom.statusLabel }}</span>\n              } @else {\n                <span class=\"pill pill--warn\">Appel \u00E0 faire</span>\n              }\n            </header>\n\n            <div class=\"klass__body\">\n              @if (classroom.done) {\n                <p class=\"klass__counts numeric\">\n                  <strong>{{ classroom.presentCount }}</strong> pr\u00E9sent(s) \u00B7\n                  <strong>{{ classroom.absentCount }}</strong> absent(s) \u00B7\n                  <strong>{{ classroom.lateCount }}</strong> retard(s)\n                </p>\n              } @else {\n                <p class=\"klass__counts klass__counts--none\">\n                  Rien d'enregistr\u00E9 pour cette journ\u00E9e.\n                </p>\n              }\n            </div>\n\n            <footer class=\"klass__footer\">\n              <button type=\"button\"\n                      [class]=\"classroom.done ? 'btn btn--ghost btn--sm' : 'btn btn--primary btn--sm'\"\n                      (click)=\"openSheet(classroom)\">\n                {{ classroom.done ? 'Voir ou corriger' : \"Faire l'appel\" }}\n              </button>\n            </footer>\n          </article>\n        } @empty {\n          <div class=\"empty-state\">\n            <p class=\"empty-state__title\">Aucune classe active.</p>\n            <p class=\"empty-state__text\">\n              Cr\u00E9ez vos classes avant de faire l'appel : une feuille de pr\u00E9sence se\n              rattache \u00E0 une classe et \u00E0 ses inscrits.\n            </p>\n          </div>\n        }\n      </section>\n    }\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Suivi et file d'attente \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    @if (tab() !== 'APPEL') {\n\n      <p class=\"lead\">\n        @if (tab() === 'SUIVI') {\n          Absences et retards ensemble : trois quarts d'heure perdus chaque matin\n          p\u00E8sent autant qu'une journ\u00E9e manqu\u00E9e.\n        } @else {\n          Ce qui n'est pas encore couvert, de la plus ancienne absence \u00E0 la plus\n          r\u00E9cente. La file se traite par le haut.\n        }\n      </p>\n\n      <section class=\"filters\">\n        <div class=\"filters__group\" role=\"group\" aria-label=\"P\u00E9riode\">\n          @for (choice of periods; track choice) {\n            <button type=\"button\" class=\"chip\"\n                    [class.chip--on]=\"periodDays() === choice\"\n                    (click)=\"changePeriod(choice)\">\n              {{ choice }} jours\n            </button>\n          }\n        </div>\n\n        <label class=\"filters__select\">\n          <span class=\"visually-hidden\">Filtrer par classe</span>\n          <select class=\"input\" [value]=\"classroomFilter()\"\n                  (change)=\"changeClassroom($any($event.target).value)\">\n            <option value=\"\">Toutes les classes</option>\n            @for (classroom of classroomOptions(); track classroom.classroomId) {\n              <option [value]=\"classroom.classroomId\">{{ classroom.classroomName }}</option>\n            }\n          </select>\n        </label>\n\n        @if (tab() === 'SUIVI') {\n          <div class=\"filters__group\" role=\"group\" aria-label=\"Type\">\n            <button type=\"button\" class=\"chip\" [class.chip--on]=\"filter() === 'ALL'\"\n                    (click)=\"changeFilter('ALL')\">Tout</button>\n            <button type=\"button\" class=\"chip\" [class.chip--on]=\"filter() === 'UNJUSTIFIED'\"\n                    (click)=\"changeFilter('UNJUSTIFIED')\">Non justifi\u00E9</button>\n            <button type=\"button\" class=\"chip\" [class.chip--on]=\"filter() === 'FOLLOW_UP'\"\n                    (click)=\"changeFilter('FOLLOW_UP')\">\u00C0 relancer</button>\n            <button type=\"button\" class=\"chip\" [class.chip--on]=\"filter() === 'LATENESS'\"\n                    (click)=\"changeFilter('LATENESS')\">Retards</button>\n            <button type=\"button\" class=\"chip\" [class.chip--on]=\"filter() === 'JUSTIFIED'\"\n                    (click)=\"changeFilter('JUSTIFIED')\">Justifi\u00E9</button>\n          </div>\n        }\n      </section>\n\n      @if (digest(); as g) {\n        <section class=\"stats\">\n          <article class=\"stat\">\n            <p class=\"stat__label\">Taux de pr\u00E9sence</p>\n            <p class=\"stat__value numeric\">{{ formatRate(g.attendanceRate) }}</p>\n            <p class=\"stat__note\">Du {{ formatDate(g.from) }} au {{ formatDate(g.to) }}</p>\n          </article>\n          <article class=\"stat stat--absent\">\n            <p class=\"stat__label\">Absences</p>\n            <p class=\"stat__value numeric\">{{ g.absenceCount }}</p>\n            <p class=\"stat__note\">{{ g.justifiedCount }} justifi\u00E9e(s) au total</p>\n          </article>\n          <article class=\"stat stat--late\">\n            <p class=\"stat__label\">Retards</p>\n            <p class=\"stat__value numeric\">{{ g.latenessCount }}</p>\n            <p class=\"stat__note\">Compt\u00E9s pr\u00E9sents, jamais oubli\u00E9s</p>\n          </article>\n          <article class=\"stat\" [class.stat--alert]=\"g.followUpCount > 0\">\n            <p class=\"stat__label\">\u00C0 relancer</p>\n            <p class=\"stat__value numeric\">{{ g.followUpCount }}</p>\n            <p class=\"stat__note\">Sans justificatif depuis 2 jours ou plus</p>\n          </article>\n        </section>\n\n        @if (g.repeatedCount > 0) {\n          <section class=\"alert-block\" role=\"status\">\n            <div class=\"alert-block__head\">\n              <span class=\"alert-block__icon\" aria-hidden=\"true\">!</span>\n              <div>\n                <p class=\"alert-block__title\">\n                  {{ g.repeatedCount }} \u00E9l\u00E8ve(s) \u00E0 trois absences non justifi\u00E9es ou plus\n                </p>\n                <p class=\"alert-block__text\">\n                  Sur cette p\u00E9riode, ce n'est plus un incident. Ces situations se\n                  traitent avec la famille avant le conseil de classe, pas pendant.\n                </p>\n              </div>\n            </div>\n          </section>\n        }\n      }\n\n      <div class=\"table-wrapper card\">\n        <table class=\"table\">\n          <caption class=\"visually-hidden\">Absences et retards de la p\u00E9riode</caption>\n          <thead>\n            <tr>\n              <th scope=\"col\">\u00C9l\u00E8ve</th>\n              <th scope=\"col\">Classe</th>\n              <th scope=\"col\">Date</th>\n              <th scope=\"col\">Marque</th>\n              <th scope=\"col\">Motif</th>\n              <th scope=\"col\" class=\"cell-actions\">Action</th>\n            </tr>\n          </thead>\n          <tbody>\n            @for (entry of waitingEntries(); track entry.id) {\n              <tr [class.row--alert]=\"entry.needsFollowUp\">\n                <td>\n                  <span class=\"entry__name\">{{ entry.studentName }}</span>\n                  <span class=\"entry__number numeric\">{{ entry.studentNumber }}</span>\n                </td>\n                <td>{{ entry.classroomName }}</td>\n                <td class=\"numeric\">\n                  {{ formatDate(entry.date) }}\n                  @if (entry.daysWaiting > 0) {\n                    <span class=\"entry__age\">il y a {{ entry.daysWaiting }} j</span>\n                  }\n                </td>\n                <td>\n                  <span class=\"mark\" [attr.data-tone]=\"markOf(entry.status).tone\">\n                    {{ entry.statusLabel }}\n                  </span>\n                  @if (entry.minutesLate) {\n                    <span class=\"entry__age numeric\">{{ entry.minutesLate }} min</span>\n                  }\n                </td>\n                <td class=\"entry__reason\">\n                  @if (entry.reason) {\n                    {{ entry.reason }}\n                  } @else {\n                    <span class=\"muted\">Aucun motif communiqu\u00E9</span>\n                  }\n                  @if (entry.guardianNotified && !entry.justified) {\n                    <span class=\"pill pill--muted\">Famille relanc\u00E9e</span>\n                  }\n                </td>\n                <td class=\"cell-actions\">\n                  @if (entry.justified) {\n                    <span class=\"pill pill--ok\">Justifi\u00E9e</span>\n                  } @else {\n                    @if (entry.needsFollowUp && !entry.guardianNotified) {\n                      <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                              [disabled]=\"saving()\" (click)=\"remind(entry)\">Relancer</button>\n                    }\n                    <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                            (click)=\"openJustify(entry)\">Justifier</button>\n                  }\n                </td>\n              </tr>\n            } @empty {\n              <tr>\n                <td colspan=\"6\">\n                  <div class=\"empty-state\">\n                    <p class=\"empty-state__title\">Rien \u00E0 traiter sur cette p\u00E9riode.</p>\n                    <p class=\"empty-state__text\">\n                      @if (filter() === 'ALL') {\n                        Aucune absence ni retard enregistr\u00E9. V\u00E9rifiez que l'appel est\n                        bien fait chaque jour : une liste vide peut aussi vouloir dire\n                        qu'on ne sait rien.\n                      } @else {\n                        Aucune ligne ne correspond \u00E0 ce filtre. Les compteurs\n                        ci-dessus, eux, portent sur toute la p\u00E9riode.\n                      }\n                    </p>\n                  </div>\n                </td>\n              </tr>\n            }\n          </tbody>\n        </table>\n      </div>\n    }\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Choix du cours (coll\u00E8ge, lyc\u00E9e) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (pickingLesson(); as classroom) {\n    <div class=\"drawer-backdrop\" (click)=\"cancelLessonPick()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\"\n           aria-labelledby=\"lesson-title\">\n      <header class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"lesson-title\">{{ classroom.classroomName }}</h2>\n          <p class=\"drawer__meta\">Quel cours appelez-vous ?</p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"cancelLessonPick()\">\u00D7</button>\n      </header>\n\n      <ul class=\"lessons\">\n        @for (lesson of lessons(); track lesson.subjectId + (lesson.startTime ?? '')) {\n          <li>\n            <button type=\"button\" class=\"lesson\" [class.is-done]=\"lesson.done\"\n                    (click)=\"openLesson(lesson)\">\n              <span class=\"lesson__when numeric\">{{ lessonWhen(lesson) }}</span>\n              <span class=\"lesson__body\">\n                <span class=\"lesson__subject\">{{ lesson.subjectName }}</span>\n                <span class=\"lesson__meta\">\n                  @if (lesson.teacherName) { {{ lesson.teacherName }} }\n                  @if (lesson.roomName) { \u00B7 {{ lesson.roomName }} }\n                </span>\n              </span>\n              <!-- Dire si l'appel est fait \u00E9vite qu'un professeur qui reprend\n                   la classe apr\u00E8s un coll\u00E8gue le refasse \u00AB au cas o\u00F9 \u00BB. -->\n              @if (lesson.done) {\n                <span class=\"lesson__state lesson__state--done\">\n                  appel fait \u00B7 {{ lesson.absentCount }} absent(s)\n                </span>\n              } @else if (lesson.sheetStarted) {\n                <span class=\"lesson__state lesson__state--started\">commenc\u00E9</span>\n              } @else {\n                <span class=\"lesson__state\">\u00E0 faire</span>\n              }\n            </button>\n          </li>\n        }\n      </ul>\n\n      <p class=\"lessons__fallback\">\n        Vous pr\u00E9f\u00E9rez un appel pour toute la journ\u00E9e ?\n        <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                (click)=\"openDaySheet(classroom)\">\n          Appel de la journ\u00E9e\n        </button>\n      </p>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Feuille d'appel \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (sheet(); as s) {\n    <div class=\"drawer-backdrop\" (click)=\"closeSheet()\"></div>\n    <aside class=\"drawer drawer--wide\" role=\"dialog\" aria-modal=\"true\"\n           aria-labelledby=\"sheet-title\">\n      <header class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"sheet-title\">{{ s.classroomName }}</h2>\n          <p class=\"drawer__meta numeric\">\n            {{ formatDate(s.sessionDate) }}\n            @if (s.subjectName) {\n              \u00B7 <strong>{{ s.subjectName }}</strong>\n            } @else {\n              \u00B7 journ\u00E9e enti\u00E8re\n            }\n            @if (s.startTime) { \u00B7 {{ s.startTime.slice(0, 5) }} }\n            @if (s.teacherName) { \u00B7 {{ s.teacherName }} }\n            @if (s.submittedAt) { \u00B7 {{ s.statusLabel }} }\n          </p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeSheet()\">\u00D7</button>\n      </header>\n\n      <div class=\"sheet-counters numeric\">\n        <span class=\"sheet-counters__item\">\n          <strong>{{ sheetCounters().present }}</strong> pr\u00E9sents\n        </span>\n        <span class=\"sheet-counters__item sheet-counters__item--absent\">\n          <strong>{{ sheetCounters().absent }}</strong> absents\n        </span>\n        <span class=\"sheet-counters__item sheet-counters__item--late\">\n          <strong>{{ sheetCounters().late }}</strong> retards\n        </span>\n        <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                [disabled]=\"!s.editable\" (click)=\"markAllPresent()\">\n          Tout le monde est pr\u00E9sent\n        </button>\n      </div>\n\n      @if (!s.editable) {\n        <p class=\"hint-block\">\n          Cette feuille est verrouill\u00E9e : elle reste consultable, mais les marques\n          ne peuvent plus changer. C'est elle qui a servi aux bulletins.\n        </p>\n      }\n\n      <div class=\"drawer__body\">\n        <ul class=\"roll\">\n          @for (record of s.records; track record.studentId) {\n            <li class=\"roll__item\" [attr.data-tone]=\"markOf(record.status).tone\">\n              <div class=\"roll__identity\">\n                <span class=\"roll__name\">{{ record.studentName }}</span>\n                <span class=\"roll__number numeric\">{{ record.studentNumber }}</span>\n              </div>\n\n              <div class=\"roll__marks\" role=\"group\"\n                   [attr.aria-label]=\"'Marque de ' + record.studentName\">\n                @for (code of quickMarks; track code) {\n                  <button type=\"button\" class=\"mark-btn\"\n                          [class.mark-btn--on]=\"record.status === code\"\n                          [attr.data-tone]=\"markOf(code).tone\"\n                          [attr.title]=\"markOf(code).hint\"\n                          [disabled]=\"!s.editable\"\n                          (click)=\"mark(record.studentId, code)\">\n                    {{ markOf(code).short }}\n                  </button>\n                }\n                <label class=\"roll__more\">\n                  <span class=\"visually-hidden\">Autre marque pour {{ record.studentName }}</span>\n                  <select class=\"input input--tiny\" [value]=\"record.status\"\n                          [disabled]=\"!s.editable\"\n                          (change)=\"mark(record.studentId, $any($event.target).value)\">\n                    @for (option of marks; track option.code) {\n                      <option [value]=\"option.code\">{{ option.label }}</option>\n                    }\n                  </select>\n                </label>\n\n                @if (record.status === 'LATE' || record.status === 'EXCUSED_LATE') {\n                  <label class=\"roll__time\">\n                    <span class=\"visually-hidden\">Heure d'arriv\u00E9e de {{ record.studentName }}</span>\n                    <input type=\"time\" class=\"input input--tiny\"\n                           [value]=\"record.arrivalTime || ''\"\n                           [disabled]=\"!s.editable\"\n                           (change)=\"setArrivalTime(record.studentId, $any($event.target).value)\" />\n                  </label>\n                }\n              </div>\n            </li>\n          }\n        </ul>\n      </div>\n\n      <footer class=\"drawer__foot\">\n        @if (missingArrivalTimes() > 0) {\n          <p class=\"drawer__warning\">\n            {{ missingArrivalTimes() }} retard(s) sans heure d'arriv\u00E9e.\n          </p>\n        } @else if (sheetDirty()) {\n          <p class=\"drawer__warning\">\n            Marques pos\u00E9es, pas encore enregistr\u00E9es.\n          </p>\n        }\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeSheet()\">\n          Fermer\n        </button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"saving() || !s.editable\"\n                (click)=\"submitSheet()\">\n          {{ s.submittedAt ? 'Enregistrer la correction' : \"Valider l'appel\" }}\n        </button>\n      </footer>\n    </aside>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Justificatif \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (justifying(); as absence) {\n    <div class=\"drawer-backdrop\" (click)=\"closeJustify()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"justify-title\">\n      <header class=\"drawer__head\">\n        <div>\n          <h2 class=\"drawer__title\" id=\"justify-title\">Justificatif</h2>\n          <p class=\"drawer__meta\">\n            {{ absence.studentName }} \u2014 {{ absence.classroomName }} \u2014\n            {{ formatDate(absence.date) }}\n          </p>\n        </div>\n        <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\"\n                (click)=\"closeJustify()\">\u00D7</button>\n      </header>\n\n      <form class=\"drawer__body\" [formGroup]=\"justifyForm\" (ngSubmit)=\"submitJustify()\">\n        <p class=\"hint-block\">\n          L'absence ne dispara\u00EEt pas : elle devient justifi\u00E9e. L'\u00E9l\u00E8ve garde son\n          historique, la famille n'est plus relanc\u00E9e.\n        </p>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"justify-reason\">Ce qui a \u00E9t\u00E9 pr\u00E9sent\u00E9</label>\n          <input id=\"justify-reason\" class=\"input\" formControlName=\"reason\"\n                 placeholder=\"Certificat m\u00E9dical du 12/03\" />\n          <p class=\"field__hint\">\n            C'est ce texte que relira le conseil de classe en juin. \u00AB Certificat\n            m\u00E9dical du 12/03 \u00BB se comprend encore ; \u00AB RAS \u00BB ne se comprend plus.\n          </p>\n        </div>\n\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"justify-url\">Pi\u00E8ce num\u00E9ris\u00E9e (facultatif)</label>\n          <input id=\"justify-url\" class=\"input\" formControlName=\"documentUrl\"\n                 placeholder=\"https://...\" />\n        </div>\n      </form>\n\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeJustify()\">\n          Annuler\n        </button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"justifyForm.invalid || saving()\"\n                (click)=\"submitJustify()\">\n          Enregistrer le justificatif\n        </button>\n      </footer>\n    </aside>\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n.lead {\n  max-width: 68ch;\n  margin: 0 0 var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n}\n\n.muted { color: var(--text-muted); }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Onglets \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.tabs {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-4);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    display: grid;\n    place-items: center;\n    min-width: 18px;\n    height: 18px;\n    padding: 0 5px;\n    font-size: var(--text-xs);\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: var(--radius-pill);\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Pastilles \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.pill {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-badge);\n  white-space: nowrap;\n\n  &--ok { color: var(--success); background: var(--success-bg); }\n  &--warn { color: var(--warning); background: var(--warning-bg); }\n  &--muted { color: var(--text-muted); background: var(--surface-sunken); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Barre du jour \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.daybar {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  margin-bottom: var(--space-5);\n\n  &__nav {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    line-height: 1;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &:disabled { opacity: 0.4; cursor: not-allowed; }\n    &:hover:not(:disabled) { color: var(--text-strong); }\n  }\n\n  &__label {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex: 1;\n    text-transform: capitalize;\n    color: var(--text-strong);\n  }\n\n  &__picker { margin-left: auto; }\n  &__picker .input { width: auto; }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Compteurs \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.stats {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));\n  gap: var(--space-4);\n  margin-bottom: var(--space-5);\n}\n\n.stat {\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 3px solid var(--border-strong);\n  border-radius: var(--radius-card);\n\n  &__label { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n  &__value { margin: 2px 0; font-size: var(--text-2xl); color: var(--text-strong); }\n  &__note { margin: 0; font-size: var(--text-xs); color: var(--text-light); }\n\n  &--absent { border-left-color: var(--danger); }\n  &--late { border-left-color: var(--warning); }\n  &--alert {\n    border-left-color: var(--warning);\n    background: var(--warning-bg);\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Ce qui reste \u00E0 faire \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.alert-block {\n  padding: var(--space-4);\n  margin-bottom: var(--space-5);\n  background: var(--warning-bg);\n  border: 1px solid var(--warning);\n  border-radius: var(--radius-card);\n\n  &__head { display: flex; gap: var(--space-3); align-items: flex-start; }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 22px;\n    height: 22px;\n    font-weight: 700;\n    color: var(--text-on-brand);\n    background: var(--warning);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n.pending {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  margin: var(--space-4) 0 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    background: var(--surface-card);\n    border-radius: var(--radius-input);\n  }\n\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__cycle { flex: 1; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Carte de classe \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.klass {\n  display: flex;\n  flex-direction: column;\n\n  &--todo { border-color: var(--warning); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4);\n  }\n\n  &__name { margin: 0; font-size: var(--text-md); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__body { flex: 1; padding: 0 var(--space-4) var(--space-3); }\n\n  &__counts {\n    margin: 0;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n\n    &--none { font-style: italic; color: var(--text-light); }\n  }\n\n  &__footer {\n    display: flex;\n    justify-content: flex-end;\n    padding: var(--space-3) var(--space-4);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Filtres \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.filters {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--space-3);\n  margin-bottom: var(--space-5);\n\n  &__group { display: inline-flex; flex-wrap: wrap; gap: var(--space-2); }\n  &__select .input { width: auto; }\n}\n\n.chip {\n  padding: var(--space-2) var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-pill);\n  cursor: pointer;\n\n  &--on {\n    font-weight: 600;\n    color: var(--brand);\n    background: var(--brand-tint);\n    border-color: var(--brand-tint-border);\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Tableau du suivi \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.table-wrapper { overflow-x: auto; }\n\n.cell-actions {\n  display: flex;\n  gap: var(--space-2);\n  justify-content: flex-end;\n  white-space: nowrap;\n}\n\n.row--alert { background: var(--warning-bg); }\n\n.entry {\n  &__name { display: block; font-weight: 600; color: var(--text-strong); }\n  &__number { display: block; font-size: var(--text-xs); color: var(--text-light); }\n  &__age { margin-left: var(--space-2); font-size: var(--text-xs); color: var(--text-light); }\n  &__reason { font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n/* La m\u00EAme marque a la m\u00EAme couleur partout : liste, feuille, boutons. */\n.mark {\n  display: inline-block;\n  padding: 2px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-badge);\n\n  &[data-tone='ok'] { color: var(--success); background: var(--success-bg); }\n  &[data-tone='absent'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-tone='late'] { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='other'] { color: var(--text-muted); background: var(--surface-sunken); }\n}\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-12) var(--space-4);\n  text-align: center;\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; max-width: 460px; font-size: var(--text-sm); color: var(--text-muted); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneaux \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 40;\n  background: rgb(15 23 42 / 35%);\n}\n\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n  width: min(440px, 100vw);\n  background: var(--surface-card);\n  border-left: 1px solid var(--border);\n  box-shadow: var(--shadow-lg);\n\n  &--wide { width: min(620px, 100vw); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title { margin: 0; font-size: var(--text-lg); }\n  &__meta {\n    margin: 2px 0 0;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    text-transform: capitalize;\n  }\n\n  &__close {\n    width: 32px;\n    height: 32px;\n    font-size: var(--text-lg);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    cursor: pointer;\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border-light);\n  }\n\n  &__warning {\n    flex: 1;\n    margin: 0;\n    font-size: var(--text-xs);\n    color: var(--warning);\n  }\n}\n\n.hint-block {\n  padding: var(--space-3);\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Feuille d'appel \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.sheet-counters {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-5);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n  background: var(--surface-sunken);\n\n  &__item strong { color: var(--text-strong); }\n  &__item--absent strong { color: var(--danger); }\n  &__item--late strong { color: var(--warning); }\n  .btn { margin-left: auto; }\n}\n\n.roll {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n  margin: 0;\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-2) var(--space-3);\n    border-left: 3px solid transparent;\n    border-radius: var(--radius-input);\n\n    &[data-tone='absent'] { background: var(--danger-bg); border-left-color: var(--danger); }\n    &[data-tone='late'] { background: var(--warning-bg); border-left-color: var(--warning); }\n    &[data-tone='other'] { background: var(--surface-sunken); }\n  }\n\n  &__identity { display: flex; flex-direction: column; min-width: 0; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__number { font-size: var(--text-xs); color: var(--text-light); }\n\n  &__marks {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex: none;\n  }\n\n  &__more .input,\n  &__time .input { width: auto; }\n}\n\n.mark-btn {\n  width: 34px;\n  height: 32px;\n  font-size: var(--text-sm);\n  font-weight: 700;\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: var(--radius-input);\n  cursor: pointer;\n\n  &:disabled { opacity: 0.5; cursor: not-allowed; }\n\n  &--on[data-tone='ok'] {\n    color: var(--text-on-brand);\n    background: var(--success);\n    border-color: var(--success);\n  }\n\n  &--on[data-tone='absent'] {\n    color: #fff;\n    background: var(--danger);\n    border-color: var(--danger);\n  }\n\n  &--on[data-tone='late'] {\n    color: #fff;\n    background: var(--warning);\n    border-color: var(--warning);\n  }\n}\n\n.input--tiny { width: 92px; padding: 4px var(--space-2); }\n\n@include mobile {\n  .drawer,\n  .drawer--wide { width: 100vw; }\n\n  .roll__item { flex-direction: column; align-items: flex-start; }\n  .sheet-counters { flex-wrap: wrap; }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 choix du cours du jour \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.lessons {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n\n  &__fallback {\n    margin: 1rem 0 0;\n    padding-top: 0.75rem;\n    border-top: 1px solid var(--border-strong);\n    font-size: 0.85rem;\n    color: var(--text-muted);\n  }\n}\n\n.lesson {\n  width: 100%;\n  display: grid;\n  grid-template-columns: 5.5rem 1fr auto;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.6rem 0.75rem;\n  border: 1px solid var(--border-strong);\n  border-radius: 10px;\n  background: var(--surface-card);\n  text-align: left;\n  cursor: pointer;\n\n  &:hover { border-color: var(--brand); }\n\n  /* Un cours d\u00E9j\u00E0 appel\u00E9 reste ouvrable \u2014 on corrige une erreur de saisie \u2014\n     mais il s'efface visuellement pour que l'\u0153il aille vers ce qui reste. */\n  &.is-done { opacity: 0.62; }\n\n  &__when {\n    font-size: 0.82rem;\n    color: var(--text-muted);\n  }\n\n  &__body {\n    display: flex;\n    flex-direction: column;\n    min-width: 0;\n  }\n\n  &__subject {\n    font-weight: 600;\n    font-size: 0.92rem;\n  }\n\n  &__meta {\n    font-size: 0.78rem;\n    color: var(--text-muted);\n  }\n\n  &__state {\n    font-size: 0.72rem;\n    font-weight: 600;\n    padding: 0.12rem 0.5rem;\n    border-radius: 999px;\n    background: rgba(100, 116, 139, 0.14);\n    color: #475569;\n    white-space: nowrap;\n\n    &--done { background: rgba(22, 163, 74, 0.14); color: #15803d; }\n    &--started { background: rgba(217, 119, 6, 0.16); color: #b45309; }\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AttendanceComponent, { className: "AttendanceComponent", filePath: "frontend/src/app/features/attendance/attendance.component.ts", lineNumber: 56 }); })();
/* ------------------------------------------------------------------ dates */
function isoToday() {
    return toIso(new Date());
}
function toIso(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
}
function shiftDays(iso, days) {
    const date = new Date(`${iso}T00:00:00`);
    date.setDate(date.getDate() + days);
    return toIso(date);
}
function currentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}
function formatDay(iso) {
    const date = new Date(`${iso}T00:00:00`);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}
function labelOf(status) {
    return ATTENDANCE_MARKS.find((m) => m.code === status)?.label ?? '';
}
function newKey() {
    return createUuid();
}
//# sourceMappingURL=attendance.component.js.map