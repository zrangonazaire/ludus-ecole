import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, expand, reduce, tap } from 'rxjs';
import { environment } from '@env/environment';
import { CLASSROOM_DATA_SOURCE, ROOM_DATA_SOURCE, TEACHER_DATA_SOURCE, TIMETABLE_DATA_SOURCE } from '@core/datasource/data-source';
import { CONFLICT_LABELS, DAY_LABELS } from '@core/models/timetable.models';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.label;
const _forTrack1 = ($index, $item) => $item.id;
const _forTrack2 = ($index, $item) => $item.subjectId + $item.teacherId;
const _forTrack3 = ($index, $item) => $item.kind + $item.message;
const _forTrack4 = ($index, $item) => $item.message;
const _forTrack5 = ($index, $item) => $item.start;
const _forTrack6 = ($index, $item) => $item.day;
function TimetableComponent_Conditional_6_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 19);
    i0.ɵɵtext(1, "Brouillon");
    i0.ɵɵelementEnd();
} }
function TimetableComponent_Conditional_6_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 20);
    i0.ɵɵtext(1, "Publi\u00E9");
    i0.ɵɵelementEnd();
} }
function TimetableComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵtemplate(1, TimetableComponent_Conditional_6_Conditional_1_Template, 2, 0, "span", 19)(2, TimetableComponent_Conditional_6_Conditional_2_Template, 2, 0, "span", 20);
} if (rf & 2) {
    const g_r1 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate2(" ", g_r1.scopeLabel, " \u2014 ", ctx_r1.totalHours(), " h par semaine ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(g_r1.status === "DRAFT" ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(g_r1.status === "PUBLISHED" ? 2 : -1);
} }
function TimetableComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 6);
    i0.ɵɵlistener("click", function TimetableComponent_Conditional_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleSettings()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r1.loading() || !ctx_r1.grid());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.settingsOpen() ? "Fermer les r\u00E9glages" : "R\u00E9glages de la grille", " ");
} }
function TimetableComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 21);
    i0.ɵɵlistener("click", function TimetableComponent_Conditional_13_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.publish()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r1.saving() || ((tmp_1_0 = (tmp_1_0 = ctx_r1.grid()) == null ? null : tmp_1_0.slots == null ? null : tmp_1_0.slots.length) !== null && tmp_1_0 !== undefined ? tmp_1_0 : 0) === 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Publication..." : "Publier", " ");
} }
function TimetableComponent_Case_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Classe ");
} }
function TimetableComponent_Case_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Professeur ");
} }
function TimetableComponent_Case_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Salle ");
} }
function TimetableComponent_Conditional_28_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", classroom_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", classroom_r5.name, " \u2014 ", classroom_r5.levelName, "");
} }
function TimetableComponent_Conditional_28_ForEmpty_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 23);
    i0.ɵɵtext(1, "Aucune classe enregistr\u00E9e");
    i0.ɵɵelementEnd();
} }
function TimetableComponent_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, TimetableComponent_Conditional_28_For_1_Template, 2, 3, "option", 22, _forTrack1, false, TimetableComponent_Conditional_28_ForEmpty_2_Template, 2, 0, "option", 23);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r1.classList());
} }
function TimetableComponent_Conditional_29_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const teacher_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", teacher_r6.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(teacher_r6.fullName);
} }
function TimetableComponent_Conditional_29_ForEmpty_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 23);
    i0.ɵɵtext(1, "Aucun professeur enregistr\u00E9");
    i0.ɵɵelementEnd();
} }
function TimetableComponent_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, TimetableComponent_Conditional_29_For_1_Template, 2, 2, "option", 22, _forTrack1, false, TimetableComponent_Conditional_29_ForEmpty_2_Template, 2, 0, "option", 23);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r1.teacherList());
} }
function TimetableComponent_Conditional_30_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const room_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", room_r7.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3("", room_r7.name, " \u2014 ", room_r7.campusName, " (", room_r7.code, ")");
} }
function TimetableComponent_Conditional_30_ForEmpty_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 23);
    i0.ɵɵtext(1, "Aucune salle enregistr\u00E9e");
    i0.ɵɵelementEnd();
} }
function TimetableComponent_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, TimetableComponent_Conditional_30_For_1_Template, 2, 4, "option", 22, _forTrack1, false, TimetableComponent_Conditional_30_ForEmpty_2_Template, 2, 0, "option", 23);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r1.roomList());
} }
function TimetableComponent_Conditional_31_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtext(1, "Chargement des r\u00E9glages\u2026");
    i0.ɵɵelementEnd();
} }
function TimetableComponent_Conditional_31_Conditional_4_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 38)(1, "input", 39);
    i0.ɵɵlistener("change", function TimetableComponent_Conditional_31_Conditional_4_For_4_Template_input_change_1_listener() { const day_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.toggleDay(day_r10)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r10 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("settings__day--on", ctx_r1.dayToggled(day_r10));
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r1.dayToggled(day_r10));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.dayLabel(day_r10), " ");
} }
function TimetableComponent_Conditional_31_Conditional_4_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const time_r11 = ctx.$implicit;
    i0.ɵɵproperty("value", time_r11);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(time_r11);
} }
function TimetableComponent_Conditional_31_Conditional_4_For_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const time_r12 = ctx.$implicit;
    i0.ɵɵproperty("value", time_r12);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(time_r12);
} }
function TimetableComponent_Conditional_31_Conditional_4_For_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r13 = ctx.$implicit;
    i0.ɵɵproperty("value", step_r13);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", step_r13, " min");
} }
function TimetableComponent_Conditional_31_Conditional_4_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.settingsError());
} }
function TimetableComponent_Conditional_31_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtext(1, " Ces r\u00E9glages s'appliquent \u00E0 toutes les grilles (classes, professeurs, salles). Les cours d\u00E9j\u00E0 pos\u00E9s ne sont pas d\u00E9plac\u00E9s. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "div", 26);
    i0.ɵɵrepeaterCreate(3, TimetableComponent_Conditional_31_Conditional_4_For_4_Template, 3, 4, "label", 27, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 28)(6, "div")(7, "label", 29);
    i0.ɵɵtext(8, "D\u00E9but de la journ\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 30);
    i0.ɵɵlistener("ngModelChange", function TimetableComponent_Conditional_31_Conditional_4_Template_select_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.settingsStart.set($event)); });
    i0.ɵɵrepeaterCreate(10, TimetableComponent_Conditional_31_Conditional_4_For_11_Template, 2, 2, "option", 22, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div")(13, "label", 31);
    i0.ɵɵtext(14, "Fin de la journ\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "select", 32);
    i0.ɵɵlistener("ngModelChange", function TimetableComponent_Conditional_31_Conditional_4_Template_select_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.settingsEnd.set($event)); });
    i0.ɵɵrepeaterCreate(16, TimetableComponent_Conditional_31_Conditional_4_For_17_Template, 2, 2, "option", 22, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div")(19, "label", 33);
    i0.ɵɵtext(20, "Pas de la grille");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "select", 34);
    i0.ɵɵlistener("ngModelChange", function TimetableComponent_Conditional_31_Conditional_4_Template_select_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.changeSettingsStep($event)); });
    i0.ɵɵrepeaterCreate(22, TimetableComponent_Conditional_31_Conditional_4_For_23_Template, 2, 2, "option", 22, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(24, TimetableComponent_Conditional_31_Conditional_4_Conditional_24_Template, 2, 1, "p", 35);
    i0.ɵɵelementStart(25, "div", 36)(26, "button", 37);
    i0.ɵɵlistener("click", function TimetableComponent_Conditional_31_Conditional_4_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleSettings()); });
    i0.ɵɵtext(27, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "button", 21);
    i0.ɵɵlistener("click", function TimetableComponent_Conditional_31_Conditional_4_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.saveSettings()); });
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.allDays);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r1.settingsStart());
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.settingsTimeChoices);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r1.settingsEnd());
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.settingsTimeChoices);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r1.settingsStep());
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.settingsStepChoices);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.settingsError() ? 24 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.savingSettings() || !ctx_r1.settingsDirty());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.savingSettings() ? "Enregistrement\u2026" : "Enregistrer", " ");
} }
function TimetableComponent_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 15)(1, "h2", 24);
    i0.ɵɵtext(2, "R\u00E9glages de la grille horaire");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, TimetableComponent_Conditional_31_Conditional_3_Template, 2, 0, "p", 25)(4, TimetableComponent_Conditional_31_Conditional_4_Template, 30, 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.settingsLoading() ? 3 : 4);
} }
function TimetableComponent_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 16);
} }
function TimetableComponent_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 40);
    i0.ɵɵlistener("retry", function TimetableComponent_Conditional_33_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function TimetableComponent_Conditional_34_Conditional_0_Case_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucune classe disponible pour afficher un emploi du temps. ");
} }
function TimetableComponent_Conditional_34_Conditional_0_Case_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucun professeur disponible pour afficher un emploi du temps. ");
} }
function TimetableComponent_Conditional_34_Conditional_0_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucune salle disponible pour afficher un emploi du temps. ");
} }
function TimetableComponent_Conditional_34_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 41);
    i0.ɵɵtemplate(1, TimetableComponent_Conditional_34_Conditional_0_Case_1_Template, 1, 0)(2, TimetableComponent_Conditional_34_Conditional_0_Case_2_Template, 1, 0)(3, TimetableComponent_Conditional_34_Conditional_0_Case_3_Template, 1, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_2_0 = ctx_r1.scope()) === "CLASSROOM" ? 1 : tmp_2_0 === "TEACHER" ? 2 : tmp_2_0 === "ROOM" ? 3 : -1);
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const room_r16 = ctx.$implicit;
    i0.ɵɵproperty("value", room_r16.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3(" ", room_r16.name, " \u2014 ", room_r16.campusName, " (", room_r16.code, ") ");
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r17 = ctx.$implicit;
    i0.ɵɵproperty("value", entry_r17.subjectId + "|" + entry_r17.teacherId);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", entry_r17.subjectName, " \u2014 ", entry_r17.teacherName, " ");
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r18 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("value", day_r18);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.dayLabel(day_r18));
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const hour_r19 = ctx.$implicit;
    i0.ɵɵproperty("value", hour_r19);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", hour_r19, " heures");
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const minute_r20 = ctx.$implicit;
    i0.ɵɵproperty("value", minute_r20);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", minute_r20, " mn");
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 68);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.formSummary());
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const duration_r21 = ctx.$implicit;
    i0.ɵɵproperty("value", duration_r21);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", duration_r21, " min");
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 71);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.formError());
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 71);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const conflict_r22 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r1.conflictLabel(conflict_r22), " \u2014 ", conflict_r22.message, " ");
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_58_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const entry_r24 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" / ", entry_r24.weeklyHours, " h ");
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_58_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "div", 75);
    i0.ɵɵlistener("dragstart", function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_58_Template_div_dragstart_1_listener($event) { const entry_r24 = i0.ɵɵrestoreView(_r23).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.startPaletteDrag(entry_r24, $event)); })("dragend", function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_58_Template_div_dragend_1_listener() { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.endDrag()); });
    i0.ɵɵelementStart(2, "span", 76);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 77);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 78);
    i0.ɵɵelement(7, "span", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 80);
    i0.ɵɵtext(9);
    i0.ɵɵtemplate(10, TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_58_Conditional_10_Template, 1, 1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const entry_r24 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("--chip-color", entry_r24.subjectColor || "var(--brand)");
    i0.ɵɵclassProp("chip--done", entry_r24.complete);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r24.subjectName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r24.teacherName);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r1.paletteProgress(entry_r24), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", entry_r24.placedMinutes / 60, " h pos\u00E9es ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(entry_r24.weeklyHours ? 10 : -1);
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_ForEmpty_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 74);
    i0.ɵɵtext(1, " Aucune affectation d'enseignant sur cette classe. ");
    i0.ɵɵelementStart(2, "a", 81);
    i0.ɵɵtext(3, "Affectez d'abord les enseignants");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " : la palette n'offre que des combinaisons d\u00E9j\u00E0 valides. ");
    i0.ɵɵelementEnd();
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "aside", 44)(1, "h2", 53);
    i0.ɵɵtext(2, "Mati\u00E8res \u00E0 poser");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 54)(4, "label", 55);
    i0.ɵɵtext(5, "Salle des cours pos\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "select", 56);
    i0.ɵɵlistener("ngModelChange", function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_Template_select_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.changeRoomChoice($event)); });
    i0.ɵɵelementStart(7, "option", 23);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(9, TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_10_Template, 2, 4, "option", 22, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p", 57);
    i0.ɵɵtext(12, " Faites glisser une mati\u00E8re sur la grille, ou utilisez le formulaire ci-dessous pour choisir le jour, l'heure et la dur\u00E9e exacts. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 58)(14, "label", 59);
    i0.ɵɵtext(15, "Mati\u00E8re & enseignant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "select", 60);
    i0.ɵɵlistener("ngModelChange", function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_Template_select_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.formSubjectKey.set($event)); });
    i0.ɵɵelementStart(17, "option", 23);
    i0.ɵɵtext(18, "\u2014 Choisir \u2014");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(19, TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_20_Template, 2, 3, "option", 22, _forTrack2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "label", 61);
    i0.ɵɵtext(22, "Jour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "select", 62);
    i0.ɵɵlistener("ngModelChange", function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_Template_select_ngModelChange_23_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.formDay.set($event)); });
    i0.ɵɵelementStart(24, "option", 23);
    i0.ɵɵtext(25, "\u2014 Choisir \u2014");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(26, TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_27_Template, 2, 2, "option", 22, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 63)(29, "div")(30, "label", 64);
    i0.ɵɵtext(31, "Heure de d\u00E9part");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "select", 65);
    i0.ɵɵlistener("ngModelChange", function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_Template_select_ngModelChange_32_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.formHour.set($event)); });
    i0.ɵɵelementStart(33, "option", 23);
    i0.ɵɵtext(34, "\u2014 h \u2014");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(35, TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_36_Template, 2, 2, "option", 22, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "div")(38, "label", 66);
    i0.ɵɵtext(39, "Minutes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "select", 67);
    i0.ɵɵlistener("ngModelChange", function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_Template_select_ngModelChange_40_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.formMinute.set($event)); });
    i0.ɵɵelementStart(41, "option", 23);
    i0.ɵɵtext(42, "\u2014 mn \u2014");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(43, TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_44_Template, 2, 2, "option", 22, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(45, TimetableComponent_Conditional_34_Conditional_1_Conditional_1_Conditional_45_Template, 2, 1, "p", 68);
    i0.ɵɵelementStart(46, "label", 69);
    i0.ɵɵtext(47, "Dur\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "select", 70);
    i0.ɵɵlistener("ngModelChange", function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_Template_select_ngModelChange_48_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.formDuration.set($event)); });
    i0.ɵɵrepeaterCreate(49, TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_50_Template, 2, 2, "option", 22, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(51, TimetableComponent_Conditional_34_Conditional_1_Conditional_1_Conditional_51_Template, 2, 1, "p", 71);
    i0.ɵɵrepeaterCreate(52, TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_53_Template, 2, 2, "p", 71, _forTrack3);
    i0.ɵɵelementStart(54, "button", 72);
    i0.ɵɵlistener("click", function TimetableComponent_Conditional_34_Conditional_1_Conditional_1_Template_button_click_54_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.createSlotManually()); });
    i0.ɵɵtext(55);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(56, "ul", 73);
    i0.ɵɵrepeaterCreate(57, TimetableComponent_Conditional_34_Conditional_1_Conditional_1_For_58_Template, 11, 10, "li", null, _forTrack2, false, TimetableComponent_Conditional_34_Conditional_1_Conditional_1_ForEmpty_59_Template, 5, 0, "li", 74);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r1.roomChoice());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.defaultRoomOptionLabel());
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.activeRooms());
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r1.formSubjectKey());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.palette());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.formDay());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.days());
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r1.formHour());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.hourChoices());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r1.formMinute());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.minuteChoices);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.formSummary() ? 45 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r1.formDuration());
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.durationChoices);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.formError() ? 51 : -1);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.formConflicts());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canSubmitForm());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Enregistrement\u2026" : "Ajouter le cours", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.palette());
} }
function TimetableComponent_Conditional_34_Conditional_1_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r25 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.dayLabel(day_r25));
} }
function TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_For_2_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 91);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const slot_r30 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(slot_r30.classroomName);
} }
function TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_For_2_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 94);
    i0.ɵɵlistener("click", function TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_For_2_Conditional_10_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r31); const slot_r30 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(5); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.removeSlot(slot_r30)); });
    i0.ɵɵtext(1, " Annuler ce cours ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(6);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || ctx_r1.cancelling());
} }
function TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 87);
    i0.ɵɵlistener("dragstart", function TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_For_2_Template_article_dragstart_0_listener($event) { const slot_r30 = i0.ɵɵrestoreView(_r29).$implicit; const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.startSlotDrag(slot_r30, $event)); })("dragend", function TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_For_2_Template_article_dragend_0_listener() { i0.ɵɵrestoreView(_r29); const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.endDrag()); })("click", function TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_For_2_Template_article_click_0_listener() { const slot_r30 = i0.ɵɵrestoreView(_r29).$implicit; const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.select(slot_r30)); });
    i0.ɵɵelementStart(1, "button", 88);
    i0.ɵɵlistener("click", function TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_For_2_Template_button_click_1_listener($event) { const slot_r30 = i0.ɵɵrestoreView(_r29).$implicit; const ctx_r1 = i0.ɵɵnextContext(5); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.select(slot_r30)); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 89);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 90);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_For_2_Conditional_7_Template, 2, 1, "span", 91);
    i0.ɵɵelementStart(8, "span", 92);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_For_2_Conditional_10_Template, 2, 1, "button", 93);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_36_0;
    let tmp_39_0;
    const slot_r30 = ctx.$implicit;
    const hour_r28 = i0.ɵɵnextContext(2).$implicit;
    const g_r32 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("--course-color", slot_r30.subjectColor || "var(--brand)")("--span", ctx_r1.spanOf(slot_r30))("--off", ctx_r1.offsetOf(slot_r30, hour_r28));
    i0.ɵɵclassProp("course--selected", ((tmp_36_0 = ctx_r1.selectedSlot()) == null ? null : tmp_36_0.id) === slot_r30.id);
    i0.ɵɵproperty("draggable", g_r32.editable);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", "D\u00E9tails du cours : " + slot_r30.subjectName)("aria-pressed", ((tmp_39_0 = ctx_r1.selectedSlot()) == null ? null : tmp_39_0.id) === slot_r30.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", slot_r30.subjectShortName || slot_r30.subjectName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(slot_r30.teacherName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.hhmm(slot_r30.startTime), " \u2013 ", ctx_r1.hhmm(slot_r30.endTime), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(g_r32.scope !== "CLASSROOM" ? 7 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Salle : ", slot_r30.roomName || "Non affect\u00E9e", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.canCancel() ? 10 : -1);
} }
function TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_Conditional_3_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 95);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const conflict_r33 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(6);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.conflictLabel(conflict_r33));
} }
function TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86);
    i0.ɵɵrepeaterCreate(1, TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_Conditional_3_For_2_Template, 2, 1, "span", 95, _forTrack4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.hoverConflicts());
} }
function TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 84);
    i0.ɵɵlistener("dragover", function TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_Template_td_dragover_0_listener($event) { const day_r27 = i0.ɵɵrestoreView(_r26).$implicit; const hour_r28 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onDragOver(day_r27, hour_r28, $event)); })("drop", function TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_Template_td_drop_0_listener($event) { const day_r27 = i0.ɵɵrestoreView(_r26).$implicit; const hour_r28 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onDrop(day_r27, hour_r28, $event)); });
    i0.ɵɵrepeaterCreate(1, TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_For_2_Template, 11, 18, "article", 85, _forTrack1);
    i0.ɵɵtemplate(3, TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_Conditional_3_Template, 3, 0, "div", 86);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r27 = ctx.$implicit;
    const hour_r28 = i0.ɵɵnextContext().$implicit;
    const g_r32 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("cell--blocked", ctx_r1.isBlocked(day_r27, hour_r28))("cell--allowed", ctx_r1.isAllowed(day_r27, hour_r28))("cell--drop", g_r32.editable);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.slotsAt(day_r27, hour_r28));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.isBlocked(day_r27, hour_r28) ? 3 : -1);
} }
function TimetableComponent_Conditional_34_Conditional_1_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 82);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(3, TimetableComponent_Conditional_34_Conditional_1_For_15_For_4_Template, 4, 7, "td", 83, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const hour_r28 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(hour_r28);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.days());
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_16_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const conflict_r34 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(conflict_r34.message);
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "p", 96);
    i0.ɵɵtext(2, "Ce cr\u00E9neau est refus\u00E9 :");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul");
    i0.ɵɵrepeaterCreate(4, TimetableComponent_Conditional_34_Conditional_1_Conditional_16_For_5_Template, 2, 1, "li", null, _forTrack4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.hoverConflicts());
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_17_Conditional_8_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const room_r37 = ctx.$implicit;
    i0.ɵɵproperty("value", room_r37.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", room_r37.name, " \u2014 ", room_r37.campusName, "");
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_17_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 101)(1, "label", 103);
    i0.ɵɵtext(2, "Salle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 104);
    i0.ɵɵlistener("ngModelChange", function TimetableComponent_Conditional_34_Conditional_1_Conditional_17_Conditional_8_Template_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r35); const slot_r36 = i0.ɵɵnextContext(); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.changeSlotRoom(slot_r36, $event)); });
    i0.ɵɵelementStart(4, "option", 23);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(6, TimetableComponent_Conditional_34_Conditional_1_Conditional_17_Conditional_8_For_7_Template, 2, 3, "option", 22, _forTrack1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_6_0;
    const slot_r36 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", (tmp_6_0 = slot_r36.roomId) !== null && tmp_6_0 !== undefined ? tmp_6_0 : "")("disabled", ctx_r1.saving());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.defaultRoomOptionLabel());
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.activeRooms());
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_17_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r38 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 105);
    i0.ɵɵlistener("click", function TimetableComponent_Conditional_34_Conditional_1_Conditional_17_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r38); const slot_r36 = i0.ɵɵnextContext(); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.removeSlot(slot_r36)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || ctx_r1.cancelling());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.cancelling() ? "Annulation..." : "Annuler ce cours", " ");
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 52)(1, "div", 97)(2, "p", 98);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 99);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 100);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, TimetableComponent_Conditional_34_Conditional_1_Conditional_17_Conditional_8_Template, 8, 3, "div", 101)(9, TimetableComponent_Conditional_34_Conditional_1_Conditional_17_Conditional_9_Template, 2, 2, "button", 102);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const slot_r36 = ctx;
    const g_r32 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(slot_r36.subjectName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate4(" ", ctx_r1.dayLabel(slot_r36.dayOfWeek), " ", ctx_r1.hhmm(slot_r36.startTime), " \u2013 ", ctx_r1.hhmm(slot_r36.endTime), " \u00B7 ", slot_r36.teacherName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" Classe : ", slot_r36.classroomName, " \u00B7 Salle : ", slot_r36.roomName || "Non affect\u00E9e", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(g_r32.editable ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.canCancel() ? 9 : -1);
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_18_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " La grille est vide. Faites glisser une mati\u00E8re depuis la colonne de gauche. ");
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_18_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Aucun cours sur cette semaine. ");
} }
function TimetableComponent_Conditional_34_Conditional_1_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 41);
    i0.ɵɵtemplate(1, TimetableComponent_Conditional_34_Conditional_1_Conditional_18_Conditional_1_Template, 1, 0)(2, TimetableComponent_Conditional_34_Conditional_1_Conditional_18_Conditional_2_Template, 1, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const g_r32 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(g_r32.editable ? 1 : 2);
} }
function TimetableComponent_Conditional_34_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtemplate(1, TimetableComponent_Conditional_34_Conditional_1_Conditional_1_Template, 60, 12, "aside", 44);
    i0.ɵɵelementStart(2, "div", 45)(3, "div", 46)(4, "table", 47)(5, "caption", 48);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "thead")(8, "tr")(9, "th", 49);
    i0.ɵɵtext(10, "Heure");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(11, TimetableComponent_Conditional_34_Conditional_1_For_12_Template, 2, 1, "th", 50, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵrepeaterCreate(14, TimetableComponent_Conditional_34_Conditional_1_For_15_Template, 5, 1, "tr", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(16, TimetableComponent_Conditional_34_Conditional_1_Conditional_16_Template, 6, 0, "div", 51)(17, TimetableComponent_Conditional_34_Conditional_1_Conditional_17_Template, 10, 9, "div", 52)(18, TimetableComponent_Conditional_34_Conditional_1_Conditional_18_Template, 3, 1, "p", 41);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_11_0;
    const g_r32 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("layout--with-palette", g_r32.editable);
    i0.ɵɵadvance();
    i0.ɵɵconditional(g_r32.editable ? 1 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("--day-count", ctx_r1.days().length)("--row-height", ctx_r1.screenRowHeight() + "px");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Emploi du temps de ", g_r32.scopeLabel, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r1.days());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.hours());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.hoverConflicts().length > 0 ? 16 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_11_0 = ctx_r1.selectedSlot()) ? 17 : -1, tmp_11_0);
    i0.ɵɵadvance();
    i0.ɵɵconditional(g_r32.slots.length === 0 ? 18 : -1);
} }
function TimetableComponent_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TimetableComponent_Conditional_34_Conditional_0_Template, 4, 1, "p", 41)(1, TimetableComponent_Conditional_34_Conditional_1_Template, 19, 11, "div", 42);
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional(!ctx_r1.scopeId() ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_2_0 = ctx_r1.grid()) ? 1 : -1, tmp_2_0);
} }
function TimetableComponent_For_37_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const page_r39 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" Classe : ", page_r39.label, " ");
} }
function TimetableComponent_For_37_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const page_r39 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" Professeur : ", page_r39.label, " ");
} }
function TimetableComponent_For_37_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const page_r39 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" Salle : ", page_r39.label, " ");
} }
function TimetableComponent_For_37_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const page_r39 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Salle : ", page_r39.roomName || "\u2014", "");
} }
function TimetableComponent_For_37_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 111)(1, "span");
    i0.ɵɵtext(2, "Professeur principal de la classe :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const page_r39 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", page_r39.mainTeacherName || "\u2014", "");
} }
function TimetableComponent_For_37_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "col");
} }
function TimetableComponent_For_37_For_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r40 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.dayLabel(day_r40));
} }
function TimetableComponent_For_37_For_31_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 116)(1, "th");
    i0.ɵɵtext(2, "Apr\u00E8s-midi");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const page_r39 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵattribute("colspan", page_r39.days.length + 1);
} }
function TimetableComponent_For_37_For_31_For_5_For_2_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const slot_r41 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" (", slot_r41.roomName, ") ");
} }
function TimetableComponent_For_37_For_31_For_5_For_2_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const slot_r41 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(slot_r41.classroomName);
} }
function TimetableComponent_For_37_For_31_For_5_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 118)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵtemplate(3, TimetableComponent_For_37_For_31_For_5_For_2_Conditional_3_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, TimetableComponent_For_37_For_31_For_5_For_2_Conditional_4_Template, 2, 1, "span");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const slot_r41 = ctx.$implicit;
    const page_r39 = i0.ɵɵnextContext(3).$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(slot_r41.subjectShortName || slot_r41.subjectName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(slot_r41.roomName ? 3 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(page_r39.scope !== "CLASSROOM" ? 4 : -1);
} }
function TimetableComponent_For_37_For_31_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵrepeaterCreate(1, TimetableComponent_For_37_For_31_For_5_For_2_Template, 5, 3, "div", 118, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cell_r42 = ctx.$implicit;
    i0.ɵɵattribute("rowspan", cell_r42.rowspan);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(cell_r42.slots);
} }
function TimetableComponent_For_37_For_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TimetableComponent_For_37_For_31_Conditional_0_Template, 3, 1, "tr", 116);
    i0.ɵɵelementStart(1, "tr")(2, "th", 117);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, TimetableComponent_For_37_For_31_For_5_Template, 3, 1, "td", null, _forTrack6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r43 = ctx.$implicit;
    i0.ɵɵconditional(row_r43.afternoon ? 0 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", row_r43.start.replace(":", "H"), "\u2013", row_r43.end.replace(":", "H"), "");
    i0.ɵɵadvance();
    i0.ɵɵrepeater(row_r43.cells);
} }
function TimetableComponent_For_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 18)(1, "header", 106)(2, "div", 107)(3, "p", 108);
    i0.ɵɵtext(4, "Minist\u00E8re de l\u2019\u00C9ducation nationale,");
    i0.ɵɵelement(5, "br");
    i0.ɵɵtext(6, "de l\u2019Alphab\u00E9tisation et de l\u2019Enseignement technique");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 109);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "h1");
    i0.ɵɵtext(10, "Emploi du temps");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 110)(12, "strong");
    i0.ɵɵtemplate(13, TimetableComponent_For_37_Conditional_13_Template, 1, 1)(14, TimetableComponent_For_37_Conditional_14_Template, 1, 1)(15, TimetableComponent_For_37_Conditional_15_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(16, TimetableComponent_For_37_Conditional_16_Template, 2, 1, "strong");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, TimetableComponent_For_37_Conditional_17_Template, 4, 1, "p", 111);
    i0.ɵɵelementStart(18, "table", 112)(19, "colgroup");
    i0.ɵɵelement(20, "col", 113);
    i0.ɵɵrepeaterCreate(21, TimetableComponent_For_37_For_22_Template, 1, 0, "col", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "thead")(24, "tr")(25, "th", 50);
    i0.ɵɵtext(26, "Horaires");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(27, TimetableComponent_For_37_For_28_Template, 2, 1, "th", 50, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "tbody");
    i0.ɵɵrepeaterCreate(30, TimetableComponent_For_37_For_31_Template, 6, 3, "tr", null, _forTrack5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "footer", 114)(33, "p");
    i0.ɵɵtext(34, "Le responsable de l\u2019\u00E9tablissement");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(35, "div", 115);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const page_r39 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.schoolName());
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(page_r39.scope === "CLASSROOM" ? 13 : page_r39.scope === "TEACHER" ? 14 : 15);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(page_r39.scope === "CLASSROOM" ? 16 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(page_r39.scope === "CLASSROOM" ? 17 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(page_r39.days);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(page_r39.days);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(page_r39.rows);
} }
/**
 * The weekly timetable: read it, and for a class, build it.
 *
 * <p>Placement is validated by the server while the course is still hovering,
 * so a cell that cannot accept the drop says so before the user lets go. The
 * alternative — accepting the drop then undoing it — makes the grid jump under
 * the cursor and hides which rule was broken.</p>
 */
export class TimetableComponent {
    auth = inject(AuthService);
    canCancel = computed(() => this.auth.has(PERMISSIONS.TIMETABLE_MANAGE));
    cancelling = signal(false);
    // ─── Réglages de la grille (jours, heures de la journée, pas) ───
    canManageSettings = computed(() => this.auth.has(PERMISSIONS.TIMETABLE_MANAGE));
    settingsOpen = signal(false);
    settingsLoading = signal(false);
    savingSettings = signal(false);
    settingsError = signal('');
    settingsDays = signal([]);
    settingsStart = signal('07:00');
    settingsEnd = signal('18:00');
    settingsStep = signal(60);
    /** Choix d'heures pour les bornes de journée : quarts d'heure de 06:00 à 20:00. */
    settingsTimeChoices = Array.from({ length: 57 }, (_, i) => {
        const minutes = 6 * 60 + i * 15;
        return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
    });
    settingsStepChoices = [15, 30, 45, 60];
    /** Tous les jours proposés, dans l'ordre de la semaine. */
    allDays = Object.keys(DAY_LABELS);
    settingsDirty = computed(() => this.settingsStart() !== this.grid()?.dayStart
        || this.settingsEnd() !== this.grid()?.dayEnd
        || this.settingsStep() !== this.grid()?.stepMinutes
        || this.settingsDays().join(',') !== this.grid()?.days.join(','));
    toggleDay(day) {
        const current = this.settingsDays();
        const order = Object.keys(DAY_LABELS);
        this.settingsDays.set(current.includes(day)
            ? current.filter(d => d !== day)
            : [...current, day].sort((a, b) => order.indexOf(a) - order.indexOf(b)));
    }
    dayToggled(day) {
        return this.settingsDays().includes(day);
    }
    /** Le select renvoie une chaîne : on repasse en nombre pour la comparaison et l'API. */
    changeSettingsStep(value) {
        this.settingsStep.set(Number(value));
    }
    /** Ouvre (et charge au premier appel) ou ferme le panneau de réglages. */
    toggleSettings() {
        if (this.settingsOpen()) {
            this.settingsOpen.set(false);
            return;
        }
        this.settingsOpen.set(true);
        this.settingsLoading.set(true);
        this.settingsError.set('');
        this.timetables.settings().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (s) => {
                this.settingsDays.set([...s.days]);
                this.settingsStart.set(s.dayStart.slice(0, 5));
                this.settingsEnd.set(s.dayEnd.slice(0, 5));
                this.settingsStep.set(s.stepMinutes);
                this.settingsLoading.set(false);
            },
            error: () => {
                this.settingsLoading.set(false);
                this.settingsError.set('Impossible de charger les réglages.');
            }
        });
    }
    saveSettings() {
        if (!this.settingsDays().length) {
            this.settingsError.set('Choisissez au moins un jour ouvré.');
            return;
        }
        if (this.settingsStart() >= this.settingsEnd()) {
            this.settingsError.set("L'heure de fin de journée doit être postérieure à l'heure de début.");
            return;
        }
        this.savingSettings.set(true);
        this.settingsError.set('');
        this.timetables.updateSettings({
            days: this.settingsDays(),
            dayStart: this.settingsStart(),
            dayEnd: this.settingsEnd(),
            stepMinutes: Number(this.settingsStep())
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.savingSettings.set(false);
                this.settingsOpen.set(false);
                this.notifications.success('Réglages de la grille enregistrés.');
                this.load();
            },
            error: (err) => {
                this.savingSettings.set(false);
                this.settingsError.set(err?.error?.message ?? 'Enregistrement impossible.');
            }
        });
    }
    timetables = inject(TIMETABLE_DATA_SOURCE);
    classrooms = inject(CLASSROOM_DATA_SOURCE);
    teachers = inject(TEACHER_DATA_SOURCE);
    rooms = inject(ROOM_DATA_SOURCE);
    notifications = inject(NotificationService);
    route = inject(ActivatedRoute);
    destroyRef = inject(DestroyRef);
    grid = signal(null);
    palette = signal([]);
    classList = signal([]);
    teacherList = signal([]);
    roomList = signal([]);
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    scope = signal('CLASSROOM');
    scopeId = signal('');
    /** Salle que les prochains cours posés prendront ; vide = salle habituelle. */
    roomChoice = signal('');
    /** Case actuellement survolée pendant un glisser, et son verdict serveur. */
    hoverCell = signal(null);
    hoverConflicts = signal([]);
    checking = signal(false);
    selectedSlot = signal(null);
    schoolName = signal(environment.schoolName ?? 'Établissement');
    dragged = null;
    hoverToken = 0;
    loadToken = 0;
    selections = {};
    ngOnInit() {
        this.selections.CLASSROOM = this.route.snapshot.queryParamMap.get('classroomId') ?? '';
        this.loadOptions();
    }
    loadOptions() {
        const scope = this.scope();
        const token = ++this.loadToken;
        this.grid.set(null);
        this.palette.set([]);
        this.scopeId.set('');
        this.loading.set(true);
        this.error.set(false);
        const request = scope === 'TEACHER'
            ? this.teachers.search({ page: 0, size: 100 }).pipe(expand(page => page.page + 1 < page.totalPages
                ? this.teachers.search({ page: page.page + 1, size: 100 }) : EMPTY), reduce((list, page) => [...list, ...page.content], []), tap(list => this.teacherList.set(list)))
            : scope === 'ROOM'
                ? this.rooms.list().pipe(tap(list => this.roomList.set(list)))
                : this.classrooms.list().pipe(tap(list => this.classList.set(list)));
        // Le constructeur d'emploi du temps choisit une salle : la liste des salles
        // ne sert donc plus seulement à l'onglet « Par salle ».
        if (scope === 'CLASSROOM') {
            this.loadRooms();
        }
        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: list => {
                if (token !== this.loadToken)
                    return;
                const previous = this.selections[scope];
                const id = list.find(item => item.id === previous)?.id ?? list[0]?.id ?? '';
                this.scopeId.set(id);
                if (id) {
                    this.selections[scope] = id;
                    if (scope === 'CLASSROOM') {
                        this.syncRoomChoice(id);
                    }
                    this.load();
                }
                else {
                    this.loading.set(false);
                }
            },
            error: () => {
                if (token !== this.loadToken)
                    return;
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    /**
     * Les salles actives, pour les sélecteurs de salle.
     *
     * <p>Un échec n'est pas bloquant : sans salles, le sélecteur n'offre que la
     * salle habituelle et le serveur reste seul juge.</p>
     */
    loadRooms() {
        this.rooms.list().pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (list) => this.roomList.set(list),
            error: () => this.roomList.set([])
        });
    }
    /**
     * Aligne la salle proposée sur la classe choisie.
     *
     * <p>Appelée au changement de classe, pas à chaque rechargement : après avoir
     * posé un cours au laboratoire, on enchaîne souvent avec le même lieu, et le
     * ramener à la salle habituelle à chaque fois serait une brimade.</p>
     */
    syncRoomChoice(classroomId) {
        this.roomChoice.set(this.classList().find((item) => item.id === classroomId)?.defaultRoomId ?? '');
    }
    // ------------------------------------------------------------------ lecture
    load() {
        const id = this.scopeId();
        if (!id) {
            this.loadOptions();
            return;
        }
        const token = ++this.loadToken;
        this.grid.set(null);
        this.palette.set([]);
        this.loading.set(true);
        this.error.set(false);
        const request = this.scope() === 'TEACHER'
            ? this.timetables.teacherGrid(id)
            : this.scope() === 'ROOM'
                ? this.timetables.roomGrid(id)
                : this.timetables.classroomGrid(id);
        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (grid) => {
                if (token !== this.loadToken)
                    return;
                this.grid.set(grid);
                this.loading.set(false);
            },
            error: () => {
                if (token !== this.loadToken)
                    return;
                this.loading.set(false);
                this.error.set(true);
            }
        });
        if (this.scope() === 'CLASSROOM') {
            this.timetables.palette(id).pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                next: (entries) => { if (token === this.loadToken)
                    this.palette.set(entries); },
                error: () => { if (token === this.loadToken)
                    this.palette.set([]); }
            });
        }
        else {
            this.palette.set([]);
        }
    }
    changeScope(scope) {
        if (scope === this.scope())
            return;
        this.scope.set(scope);
        this.selectedSlot.set(null);
        this.endDrag();
        this.loadOptions();
    }
    changeScopeId(id) {
        this.scopeId.set(id);
        this.selections[this.scope()] = id;
        if (this.scope() === 'CLASSROOM') {
            this.syncRoomChoice(id);
        }
        this.selectedSlot.set(null);
        this.endDrag();
        this.load();
    }
    /**
     * Choisit la salle que les prochains cours posés prendront.
     *
     * <p>Le verdict affiché portait sur l'ancienne salle : on l'efface plutôt que
     * de laisser une case verte qui ne l'est plus.</p>
     */
    changeRoomChoice(roomId) {
        this.roomChoice.set(roomId);
        this.endDrag();
    }
    // -------------------------------------------------------------- géométrie
    /** Les heures de la règle verticale, du début à la fin de journée. */
    hours = computed(() => {
        const grid = this.grid();
        if (!grid) {
            return [];
        }
        const step = grid.stepMinutes > 0 ? grid.stepMinutes : 60;
        const start = Math.min(this.toMinutes(grid.dayStart), ...grid.slots.map(slot => this.toMinutes(slot.startTime)));
        const end = Math.max(this.toMinutes(grid.dayEnd), ...grid.slots.map(slot => this.toMinutes(slot.endTime)));
        const slots = [];
        for (let m = start; m < end; m += step) {
            slots.push(this.toLabel(m));
        }
        return slots;
    });
    days = computed(() => {
        const grid = this.grid();
        if (!grid)
            return [];
        const present = new Set([...grid.days, ...grid.slots.map(slot => slot.dayOfWeek)]);
        return Object.keys(DAY_LABELS).filter(day => present.has(day));
    });
    /** Salles proposables : une salle archivée n'accueille plus de cours. */
    activeRooms = computed(() => this.roomList().filter((room) => room.status === 'ACTIVE'));
    /** Salle habituelle de la classe affichée, quand elle en a une. */
    defaultRoom = computed(() => {
        const classroomId = this.scopeId();
        const roomId = this.classList().find((item) => item.id === classroomId)?.defaultRoomId;
        return this.activeRooms().find((room) => room.id === roomId);
    });
    /**
     * Libellé de l'option « laisser la salle habituelle ».
     *
     * <p>Vide veut dire « le serveur décide » : il retombe sur la salle habituelle
     * de la classe. Afficher « Aucune salle » quand la classe en a une ferait
     * croire à un choix qui n'existe pas.</p>
     */
    defaultRoomOptionLabel() {
        const room = this.defaultRoom();
        return room ? `Salle habituelle — ${room.name}` : 'Aucune salle';
    }
    dayLabel(day) {
        return DAY_LABELS[day] ?? day;
    }
    /**
     * Les cours qui tombent dans cette tranche horaire.
     *
     * <p>La grille suit le pas des réglages de l'école (souvent une heure
     * pleine) mais un cours peut commencer à 07:30 : on l'affiche dans la
     * tranche qui le contient, sinon il serait enregistré sans jamais paraître.
     * C'est la même règle que la feuille d'impression.</p>
     */
    slotsAt(day, hour) {
        const step = this.grid()?.stepMinutes ?? 60;
        const startMin = this.toMinutes(hour);
        return (this.grid()?.slots ?? []).filter((slot) => {
            return slot.dayOfWeek === day
                && this.toMinutes(slot.startTime) >= startMin
                && this.toMinutes(slot.startTime) < startMin + step;
        });
    }
    /**
     * Hauteur de la carte, en nombre de cases.
     *
     * Un cours de deux heures occupe deux lignes : sans cela, la grille mentirait
     * sur la durée réelle et deux cours consécutifs seraient indiscernables.
     */
    spanOf(slot, stepMinutes = this.grid()?.stepMinutes ?? 60) {
        const step = stepMinutes > 0 ? stepMinutes : 60;
        return Math.max(1 / step, (this.toMinutes(slot.endTime) - this.toMinutes(slot.startTime)) / step);
    }
    /** Keep the day compact; short cards can scroll and open their full details. */
    screenRowHeight = computed(() => 80);
    showSavedSlot(slot, source) {
        const current = this.grid();
        if (!current || current.scope !== source.scope || current.scopeId !== source.scopeId)
            return;
        const slots = [...current.slots.filter(item => item.id !== slot.id), slot];
        this.grid.set({ ...current, slots,
            totalMinutes: slots.reduce((sum, item) => sum + (this.toMinutes(item.endTime) - this.toMinutes(item.startTime)), 0) });
        this.palette.update(entries => entries.map(entry => {
            const placedMinutes = slots.filter(item => item.subjectId === entry.subjectId && item.teacherId === entry.teacherId)
                .reduce((sum, item) => sum + this.toMinutes(item.endTime) - this.toMinutes(item.startTime), 0);
            return { ...entry, placedMinutes, complete: !!entry.weeklyHours && placedMinutes >= entry.weeklyHours * 60 };
        }));
    }
    /**
     * Décalage vertical de la carte dans sa cellule conteneur, entre 0 et 1.
     *
     * Un cours de 07:30 logé dans la ligne 07:00 doit démarrer à mi-case,
     * sinon la grille le présenterait comme commençant à l'heure pleine.
     */
    offsetOf(slot, hour, stepMinutes = this.grid()?.stepMinutes ?? 60) {
        const step = stepMinutes > 0 ? stepMinutes : 60;
        const offset = (this.toMinutes(slot.startTime) - this.toMinutes(hour)) / step;
        return Math.max(0, Math.min(1, offset));
    }
    cellKey(day, hour) {
        return `${day}|${hour}`;
    }
    /** Vrai quand la case survolée est refusée par le serveur. */
    isBlocked(day, hour) {
        return this.hoverCell() === this.cellKey(day, hour) && this.hoverConflicts().length > 0;
    }
    isAllowed(day, hour) {
        return this.hoverCell() === this.cellKey(day, hour)
            && this.hoverConflicts().length === 0 && !this.checking();
    }
    conflictLabel(conflict) {
        return CONFLICT_LABELS[conflict.kind] ?? 'Conflit';
    }
    totalHours = computed(() => {
        const minutes = this.grid()?.totalMinutes ?? 0;
        return (minutes / 60).toFixed(minutes % 60 === 0 ? 0 : 1);
    });
    // --------------------------------------------------------- création manuelle
    /** Clé « subjectId|teacherId » choisie dans le formulaire d'ajout. */
    formSubjectKey = signal('');
    formDay = signal('');
    /** Heure et minute de départ saisies séparément (ex. 07 h 30). */
    formHour = signal('');
    formMinute = signal('');
    formDuration = signal(60);
    formConflicts = signal([]);
    formError = signal('');
    /** Les heures pleines de la journée, d'après les réglages de l'école. */
    hourChoices = computed(() => {
        const grid = this.grid();
        if (!grid) {
            return [];
        }
        const start = this.toMinutes(grid.dayStart);
        const end = this.toMinutes(grid.dayEnd);
        const choices = [];
        for (let m = start; m < end; m += 60) {
            choices.push(this.toLabel(m).slice(0, 2));
        }
        return choices;
    });
    /** Les minutes proposées, au quart d'heure. */
    minuteChoices = ['00', '15', '30', '45'];
    /** L'heure de départ reconstituée, au format HH:mm. */
    formStartTime = computed(() => {
        const hour = this.formHour();
        const minute = this.formMinute();
        return hour && minute ? `${hour}:${minute}` : '';
    });
    /**
     * Libellé français d'une heure : 07:30 devient « 07h30 ».
     *
     * <p>À l'école on dit « sept heures trente », pas « sept deux-points
     * trente » : les écrans s'adressent à des humains, la colonne SQL attend
     * HH:mm — on convertit à l'affichage, jamais au stockage.</p>
     */
    frTime(time) {
        return time.replace(':', 'h');
    }
    /** Résumé lisible du cours saisi : « Départ 07h30 · Fin 09h30 (120 min) ». */
    formSummary = computed(() => {
        const start = this.formStartTime();
        const grid = this.grid();
        if (!start || !grid) {
            return '';
        }
        const endMin = this.toMinutes(start) + Number(this.formDuration());
        const end = this.toLabel(Math.min(endMin, this.toMinutes(grid.dayEnd)));
        return `Départ à ${this.frTime(start)} · Fin à ${this.frTime(end)}`;
    });
    /** Durées proposées, en minutes. */
    durationChoices = [30, 45, 60, 90, 120];
    canSubmitForm() {
        return !!this.grid()?.editable
            && !!this.formSubjectKey()
            && !!this.formDay()
            && !!this.formStartTime()
            && !this.saving();
    }
    /**
     * Crée un cours à partir du formulaire : le serveur vérifie d'abord les
     * règles (enseignant, classe, salle) et le cours n'est posé que si rien
     * ne s'y oppose — le même verdict que le survol du glisser-déposer.
     */
    createSlotManually() {
        const grid = this.grid();
        if (!this.canSubmitForm() || !grid) {
            return;
        }
        const [subjectId, teacherId] = this.formSubjectKey().split('|');
        const entry = this.palette().find((item) => item.subjectId === subjectId && item.teacherId === teacherId);
        const start = this.formStartTime();
        // Le <select> renvoie une chaîne : sans conversion, 450 + "120" donnerait
        // "450120" par concaténation et ferait échouer le contrôle de fin de journée.
        const duration = Number(this.formDuration());
        if (!Number.isFinite(duration) || duration <= 0) {
            this.formError.set('Durée invalide.');
            return;
        }
        const endMin = this.toMinutes(start) + duration;
        if (endMin > this.toMinutes(grid.dayEnd)) {
            this.formError.set('Le cours dépasse la fin de la journée.');
            return;
        }
        const payload = {
            classroomId: this.scopeId(),
            subjectId,
            teacherId,
            roomId: this.roomChoice() || undefined,
            dayOfWeek: this.formDay(),
            startTime: start,
            endTime: this.toLabel(endMin),
            slotType: 'COURSE'
        };
        this.formError.set('');
        this.formConflicts.set([]);
        this.saving.set(true);
        this.timetables.check(payload).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (conflicts) => {
                if (conflicts.length > 0) {
                    this.saving.set(false);
                    this.formConflicts.set(conflicts);
                    return;
                }
                this.timetables.createSlot(payload)
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe({
                    next: (slot) => {
                        this.showSavedSlot(slot, grid);
                        this.saving.set(false);
                        this.notifications.success(`${entry?.subjectName ?? 'Cours'} — ` +
                            `${this.dayLabel(payload.dayOfWeek).toLowerCase()} ` +
                            `${payload.startTime}–${payload.endTime}.`, 'Cours ajouté');
                    },
                    error: (err) => {
                        this.saving.set(false);
                        this.formError.set(err?.error?.message ?? "Impossible d’ajouter le cours. Réessayez.");
                    }
                });
            },
            error: () => this.saving.set(false)
        });
    }
    // ---------------------------------------------------------- glisser-déposer
    startPaletteDrag(entry, event) {
        this.dragged = {
            kind: 'PALETTE',
            subjectId: entry.subjectId,
            teacherId: entry.teacherId,
            // La salle choisie dans la palette, sinon celle que la matière proposait
            // déjà (la salle habituelle de la classe) : sans cela le cours partirait
            // sans lieu et échapperait au contrôle de conflit de salle.
            roomId: this.roomChoice() || entry.roomId || undefined,
            durationMinutes: this.grid()?.stepMinutes ?? 60
        };
        event.dataTransfer?.setData('text/plain', entry.subjectId);
    }
    startSlotDrag(slot, event) {
        this.dragged = {
            kind: 'SLOT',
            subjectId: slot.subjectId,
            teacherId: slot.teacherId,
            slotId: slot.id,
            roomId: slot.roomId,
            durationMinutes: slot.durationMinutes
        };
        event.dataTransfer?.setData('text/plain', slot.id);
    }
    endDrag() {
        ++this.hoverToken;
        this.checking.set(false);
        this.dragged = null;
        this.hoverCell.set(null);
        this.hoverConflicts.set([]);
    }
    /**
     * Interroge le serveur pendant le survol.
     *
     * Un jeton par survol évite qu'une réponse lente sur une case quittée vienne
     * repeindre la case en cours.
     */
    onDragOver(day, hour, event) {
        event.preventDefault();
        if (!this.dragged || !this.grid()?.editable) {
            return;
        }
        const key = this.cellKey(day, hour);
        if (this.hoverCell() === key) {
            return;
        }
        this.hoverCell.set(key);
        this.hoverConflicts.set([]);
        this.checking.set(true);
        const token = ++this.hoverToken;
        this.timetables.check(this.payloadFor(day, hour), this.dragged.slotId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (conflicts) => {
                if (token !== this.hoverToken) {
                    return;
                }
                this.hoverConflicts.set(conflicts);
                this.checking.set(false);
            },
            error: () => {
                if (token === this.hoverToken) {
                    this.checking.set(false);
                }
            }
        });
    }
    onDrop(day, hour, event) {
        event.preventDefault();
        const dragged = this.dragged;
        const grid = this.grid();
        if (!dragged || !grid?.editable || this.saving() || this.cancelling()) {
            return;
        }
        if (this.hoverCell() === this.cellKey(day, hour) && this.hoverConflicts().length > 0) {
            this.notifications.error(this.hoverConflicts()[0].message, 'Placement refusé');
            this.endDrag();
            return;
        }
        this.saving.set(true);
        const payload = this.payloadFor(day, hour);
        const request = dragged.slotId
            ? this.timetables.updateSlot(dragged.slotId, payload)
            : this.timetables.createSlot(payload);
        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (slot) => {
                this.showSavedSlot(slot, grid);
                this.saving.set(false);
                this.endDrag();
                this.notifications.success("Le cours est affiché dans le planning.", "Cours enregistré");
            },
            error: () => {
                this.saving.set(false);
                this.endDrag();
            }
        });
    }
    payloadFor(day, hour) {
        const dragged = this.dragged;
        const start = this.toMinutes(hour);
        return {
            classroomId: this.scopeId(),
            subjectId: dragged.subjectId,
            teacherId: dragged.teacherId,
            roomId: dragged.roomId,
            dayOfWeek: day,
            startTime: this.toLabel(start),
            endTime: this.toLabel(start + dragged.durationMinutes),
            slotType: 'COURSE'
        };
    }
    // ------------------------------------------------------------------ actions
    removeSlot(slot) {
        if (!this.canCancel() || this.saving() || this.cancelling() || this.loading()
            || !this.grid()?.slots.some((item) => item.id === slot.id)) {
            return;
        }
        // Le planning représente un créneau récurrent, pas une séance datée.
        const message = `Annuler « ${slot.subjectName} » du ${this.dayLabel(slot.dayOfWeek).toLowerCase()} ` +
            `${this.hhmm(slot.startTime)}–${this.hhmm(slot.endTime)} ?\n\n` +
            'Ce créneau hebdomadaire sera retiré de toutes les vues de l\'emploi du temps. ' +
            'Les séances d\'appel déjà enregistrées sont conservées.';
        if (!window.confirm(message)) {
            return;
        }
        this.cancelling.set(true);
        this.timetables.deleteSlot(slot.id).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.cancelling.set(false);
                this.notifications.success(`${slot.subjectName} annulé le ${this.dayLabel(slot.dayOfWeek).toLowerCase()} ` +
                    `${this.hhmm(slot.startTime)}–${this.hhmm(slot.endTime)}.`, 'Cours annulé');
                this.selectedSlot.set(null);
                this.load();
            },
            // L'échec ne doit pas laisser un bouton mort : on remet le bouton
            // actif pour retenter, et l'erreur remonte en notif (intercepteur).
            error: () => this.cancelling.set(false)
        });
    }
    /**
     * Déplace un cours déjà posé vers une autre salle.
     *
     * <p>Le point d'entrée de modification attend le cours entier, pas seulement le
     * champ modifié : on renvoie l'horaire et le couple matière/enseignant tels
     * quels, avec la nouvelle salle. Le serveur revérifie alors les trois règles —
     * dont celle de la salle — et refuse en disant laquelle est enfreinte.</p>
     */
    changeSlotRoom(slot, roomId) {
        if (!this.grid()?.editable || this.saving() || this.cancelling() || (slot.roomId ?? '') === roomId) {
            return;
        }
        this.saving.set(true);
        const payload = {
            classroomId: slot.classroomId,
            subjectId: slot.subjectId,
            teacherId: slot.teacherId,
            // Vide veut dire « la salle habituelle de la classe » : le serveur tranche.
            roomId: roomId || undefined,
            dayOfWeek: slot.dayOfWeek,
            startTime: this.hhmm(slot.startTime),
            endTime: this.hhmm(slot.endTime),
            slotType: slot.slotType,
            note: slot.note
        };
        this.timetables.updateSlot(slot.id, payload).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.saving.set(false);
                this.notifications.success(`${slot.subjectName} — ${roomId ? this.roomLabel(roomId) : 'salle habituelle'}.`, 'Salle du cours mise à jour');
                this.selectedSlot.set(null);
                this.load();
            },
            error: () => this.saving.set(false)
        });
    }
    /** Nom lisible d'une salle, pour les messages. */
    roomLabel(roomId) {
        return this.roomList().find((room) => room.id === roomId)?.name ?? 'nouvelle salle';
    }
    publish() {
        const grid = this.grid();
        if (!grid || this.saving() || this.cancelling()) {
            return;
        }
        this.saving.set(true);
        this.timetables.publish(grid.scopeId).pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (published) => {
                this.grid.set(published);
                this.saving.set(false);
                this.notifications.success('Les enseignants et les parents voient désormais cette version.', 'Emploi du temps publié');
            },
            error: () => this.saving.set(false)
        });
    }
    select(slot) {
        this.selectedSlot.set(this.selectedSlot()?.id === slot.id ? null : slot);
    }
    // ------------------------------------------------------------------ impression
    printPages = computed(() => {
        const grid = this.grid();
        if (!grid) {
            return [];
        }
        return [this.buildPrintPage(grid)];
    });
    buildPrintPage(grid) {
        const dayStartMin = this.toMinutes(grid.dayStart);
        const dayEndMin = this.toMinutes(grid.dayEnd);
        // Include exact course boundaries so short and multi-period lessons print faithfully.
        const boundaries = new Set([dayStartMin, dayEndMin]);
        for (let m = dayStartMin; m < dayEndMin; m += grid.stepMinutes)
            boundaries.add(m);
        for (const slot of grid.slots) {
            boundaries.add(this.toMinutes(slot.startTime));
            boundaries.add(this.toMinutes(slot.endTime));
        }
        const afternoonStart = 13 * 60;
        if (Math.min(...boundaries) <= afternoonStart && Math.max(...boundaries) > afternoonStart) {
            boundaries.add(afternoonStart);
        }
        const times = [...boundaries].sort((a, b) => a - b);
        const rows = times.slice(0, -1).map((start, index) => ({
            start: this.toLabel(start),
            end: this.toLabel(times[index + 1]),
            afternoon: start === afternoonStart,
            cells: this.days().flatMap(day => {
                const active = grid.slots.filter(slot => slot.dayOfWeek === day
                    && this.toMinutes(slot.startTime) <= start && this.toMinutes(slot.endTime) > start);
                // Conflicting lessons stay visible together instead of covering one another.
                if (active.length === 1) {
                    const slot = active[0];
                    const overlaps = grid.slots.some(other => other.id !== slot.id && other.dayOfWeek === day
                        && this.toMinutes(other.startTime) < this.toMinutes(slot.endTime)
                        && this.toMinutes(other.endTime) > this.toMinutes(slot.startTime));
                    if (!overlaps) {
                        // Split merged lessons at 13:00 so no cell crosses the section heading.
                        if (this.toMinutes(slot.startTime) < start && start !== afternoonStart)
                            return [];
                        const end = start < afternoonStart
                            ? Math.min(this.toMinutes(slot.endTime), afternoonStart)
                            : this.toMinutes(slot.endTime);
                        return [{ day, slots: active, rowspan: times.indexOf(end) - index }];
                    }
                }
                return [{ day, slots: active, rowspan: 1 }];
            })
        }));
        const classroom = grid.scope === 'CLASSROOM'
            ? this.classList().find(item => item.id === grid.scopeId) : undefined;
        const hours = rows.map(row => row.start);
        return {
            rows,
            roomName: classroom?.defaultRoomName,
            mainTeacherName: classroom?.mainTeacherName,
            label: grid.scopeLabel,
            scopeId: grid.scopeId,
            scope: grid.scope,
            days: this.days(),
            hours,
            stepMinutes: grid.stepMinutes,
            slots: grid.slots,
            totalMinutes: grid.totalMinutes,
            totalHours: Math.round((grid.totalMinutes / 60) * 10) / 10,
        };
    }
    print() {
        if (!this.grid()) {
            return;
        }
        // Le rendu de la feuille est fait par Angular : on attend un tour de boucle
        // avant d'ouvrir le dialogue, sinon la page part vide à l'imprimante.
        setTimeout(() => {
            window.print();
        }, 120);
    }
    slotsAtPrint(day, hour, slots) {
        const startMin = this.toMinutes(hour);
        const endMin = startMin + (this.grid()?.stepMinutes ?? 60);
        return slots.filter((slot) => {
            const slotStart = this.toMinutes(slot.startTime);
            return slot.dayOfWeek === day && slotStart >= startMin && slotStart < endMin;
        });
    }
    generatedDate() {
        return new Date().toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }
    /** Part du volume horaire déjà posée, en pourcentage. */
    paletteProgress(entry) {
        const expected = (entry.weeklyHours ?? 0) * 60;
        if (expected <= 0) {
            return 0;
        }
        return Math.min(100, Math.round((entry.placedMinutes / expected) * 100));
    }
    // ------------------------------------------------------------------ minutes
    /** Tolère HH:mm comme HH:mm:ss, selon la sérialisation du serveur. */
    hhmm(time) {
        return time.slice(0, 5);
    }
    toMinutes(time) {
        const [hours, minutes] = this.hhmm(time).split(':').map(Number);
        return hours * 60 + minutes;
    }
    toLabel(total) {
        const hours = Math.floor(total / 60);
        const minutes = total % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
    static ɵfac = function TimetableComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TimetableComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TimetableComponent, selectors: [["eduops-timetable"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 38, vars: 20, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--ghost", "screen-only", 3, "disabled"], ["type", "button", 1, "btn", "btn--ghost", "screen-only", 3, "click", "disabled"], ["aria-hidden", "true"], ["type", "button", 1, "btn", "btn--primary", 3, "disabled"], [1, "controls"], ["role", "tablist", 1, "tabs"], ["type", "button", "role", "tab", 1, "tabs__item", 3, "click"], [1, "field", "field--inline"], ["for", "scopeId", 1, "field__label"], ["id", "scopeId", "name", "scopeId", 1, "select", 3, "ngModelChange", "ngModel"], ["role", "region", "aria-label", "R\u00E9glages de la grille horaire", 1, "settings"], ["message", "Chargement de l'emploi du temps..."], [1, "print-only"], [1, "timetable-sheet"], [1, "tag", "tag--draft"], [1, "tag", "tag--live"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [3, "value"], ["value", ""], [1, "settings__title"], [1, "settings__hint"], [1, "settings__days"], [1, "settings__day", 3, "settings__day--on"], [1, "settings__times"], ["for", "settingsStart", 1, "field__label"], ["id", "settingsStart", "name", "settingsStart", 1, "select", 3, "ngModelChange", "ngModel"], ["for", "settingsEnd", 1, "field__label"], ["id", "settingsEnd", "name", "settingsEnd", 1, "select", 3, "ngModelChange", "ngModel"], ["for", "settingsStep", 1, "field__label"], ["id", "settingsStep", "name", "settingsStep", 1, "select", 3, "ngModelChange", "ngModel"], ["role", "alert", 1, "settings__error"], [1, "settings__actions"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], [1, "settings__day"], ["type", "checkbox", 3, "change", "checked"], [3, "retry"], [1, "board__empty"], [1, "layout", 3, "layout--with-palette"], [1, "layout"], [1, "palette"], [1, "board"], [1, "board__scroll"], [1, "grid"], [1, "visually-hidden"], ["scope", "col", 1, "grid__corner"], ["scope", "col"], ["role", "alert", 1, "conflicts"], [1, "detail"], [1, "palette__title"], [1, "palette__room"], ["for", "paletteRoom", 1, "field__label"], ["id", "paletteRoom", "name", "paletteRoom", 1, "select", 3, "ngModelChange", "ngModel"], [1, "palette__hint"], [1, "palette__form"], ["for", "manualSubject", 1, "field__label"], ["id", "manualSubject", "name", "manualSubject", 1, "select", 3, "ngModelChange", "ngModel"], ["for", "manualDay", 1, "field__label"], ["id", "manualDay", "name", "manualDay", 1, "select", 3, "ngModelChange", "ngModel"], [1, "palette__form-row"], ["for", "manualHour", 1, "field__label"], ["id", "manualHour", "name", "manualHour", 1, "select", 3, "ngModelChange", "ngModel"], ["for", "manualMinute", 1, "field__label"], ["id", "manualMinute", "name", "manualMinute", 1, "select", 3, "ngModelChange", "ngModel"], [1, "palette__form-summary"], ["for", "manualDuration", 1, "field__label"], ["id", "manualDuration", "name", "manualDuration", 1, "select", 3, "ngModelChange", "ngModel"], ["role", "alert", 1, "palette__form-error"], ["type", "button", 1, "btn", "btn--primary", "palette__form-submit", 3, "click", "disabled"], [1, "palette__list"], [1, "palette__empty"], ["draggable", "true", 1, "chip", 3, "dragstart", "dragend"], [1, "chip__name"], [1, "chip__teacher"], ["aria-hidden", "true", 1, "chip__bar"], [1, "chip__fill"], [1, "chip__quota", "numeric"], ["routerLink", "/teachers"], ["scope", "row", 1, "grid__hour", "numeric"], [1, "cell", 3, "cell--blocked", "cell--allowed", "cell--drop"], [1, "cell", 3, "dragover", "drop"], [1, "course", 3, "course--selected", "--course-color", "--span", "--off", "draggable"], ["role", "alert", 1, "veto"], [1, "course", 3, "dragstart", "dragend", "click", "draggable"], ["type", "button", 1, "course__subject", "course__select", 3, "click"], [1, "course__teacher"], [1, "course__time", "numeric"], [1, "course__where"], ["data-testid", "card-room", 1, "course__where"], ["type", "button", "data-testid", "card-cancel-course", 1, "course__cancel", 3, "disabled"], ["type", "button", "data-testid", "card-cancel-course", 1, "course__cancel", 3, "click", "disabled"], [1, "veto__line"], [1, "conflicts__title"], [1, "detail__body"], [1, "detail__title"], [1, "detail__meta", "numeric"], ["data-testid", "course-room", 1, "detail__meta"], [1, "detail__room"], ["type", "button", "data-testid", "cancel-course", 1, "btn", "btn--ghost", "btn--sm", 3, "disabled"], ["for", "detailRoom", 1, "field__label"], ["id", "detailRoom", "name", "detailRoom", 1, "select", 3, "ngModelChange", "ngModel", "disabled"], ["type", "button", "data-testid", "cancel-course", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], [1, "sheet__header"], [1, "sheet__identity"], [1, "sheet__ministry"], [1, "sheet__school"], [1, "sheet__meta"], [1, "sheet__principal"], [1, "sheet__grid"], [1, "sheet__hours-col"], [1, "sheet__footer"], [1, "sheet__signature"], [1, "sheet__separator"], ["scope", "row", 1, "sheet__hours"], [1, "sheet__course"]], template: function TimetableComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Emploi du temps");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtemplate(6, TimetableComponent_Conditional_6_Template, 3, 4);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4);
            i0.ɵɵtemplate(8, TimetableComponent_Conditional_8_Template, 2, 2, "button", 5);
            i0.ɵɵelementStart(9, "button", 6);
            i0.ɵɵlistener("click", function TimetableComponent_Template_button_click_9_listener() { return ctx.print(); });
            i0.ɵɵelementStart(10, "span", 7);
            i0.ɵɵtext(11, "\u25A8");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(12, " Imprimer ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(13, TimetableComponent_Conditional_13_Template, 2, 2, "button", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "section", 9)(15, "div", 10)(16, "button", 11);
            i0.ɵɵlistener("click", function TimetableComponent_Template_button_click_16_listener() { return ctx.changeScope("CLASSROOM"); });
            i0.ɵɵtext(17, "Par classe");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "button", 11);
            i0.ɵɵlistener("click", function TimetableComponent_Template_button_click_18_listener() { return ctx.changeScope("TEACHER"); });
            i0.ɵɵtext(19, "Par professeur");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "button", 11);
            i0.ɵɵlistener("click", function TimetableComponent_Template_button_click_20_listener() { return ctx.changeScope("ROOM"); });
            i0.ɵɵtext(21, "Par salle");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 12)(23, "label", 13);
            i0.ɵɵtemplate(24, TimetableComponent_Case_24_Template, 1, 0)(25, TimetableComponent_Case_25_Template, 1, 0)(26, TimetableComponent_Case_26_Template, 1, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "select", 14);
            i0.ɵɵlistener("ngModelChange", function TimetableComponent_Template_select_ngModelChange_27_listener($event) { return ctx.changeScopeId($event); });
            i0.ɵɵtemplate(28, TimetableComponent_Conditional_28_Template, 3, 1)(29, TimetableComponent_Conditional_29_Template, 3, 1)(30, TimetableComponent_Conditional_30_Template, 3, 1);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(31, TimetableComponent_Conditional_31_Template, 5, 1, "section", 15)(32, TimetableComponent_Conditional_32_Template, 1, 0, "eduops-loading-state", 16)(33, TimetableComponent_Conditional_33_Template, 1, 0, "eduops-error-state")(34, TimetableComponent_Conditional_34_Template, 2, 2);
            i0.ɵɵelementStart(35, "div", 17);
            i0.ɵɵrepeaterCreate(36, TimetableComponent_For_37_Template, 36, 4, "article", 18, _forTrack0);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_0_0;
            let tmp_3_0;
            let tmp_10_0;
            i0.ɵɵadvance(6);
            i0.ɵɵconditional((tmp_0_0 = ctx.grid()) ? 6 : -1, tmp_0_0);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.canManageSettings() ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.loading() || !ctx.grid());
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(((tmp_3_0 = ctx.grid()) == null ? null : tmp_3_0.editable) ? 13 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("tabs__item--on", ctx.scope() === "CLASSROOM");
            i0.ɵɵattribute("aria-selected", ctx.scope() === "CLASSROOM");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.scope() === "TEACHER");
            i0.ɵɵattribute("aria-selected", ctx.scope() === "TEACHER");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.scope() === "ROOM");
            i0.ɵɵattribute("aria-selected", ctx.scope() === "ROOM");
            i0.ɵɵadvance(4);
            i0.ɵɵconditional((tmp_10_0 = ctx.scope()) === "CLASSROOM" ? 24 : tmp_10_0 === "TEACHER" ? 25 : tmp_10_0 === "ROOM" ? 26 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngModel", ctx.scopeId());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.scope() === "CLASSROOM" ? 28 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.scope() === "TEACHER" ? 29 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.scope() === "ROOM" ? 30 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.settingsOpen() && ctx.canManageSettings() ? 31 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 32 : ctx.error() ? 33 : 34);
            i0.ɵɵadvance(4);
            i0.ɵɵrepeater(ctx.printPages());
        } }, dependencies: [CommonModule, FormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgModel, RouterLink, LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-left: var(--space-2);\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-pill);\n\n  &--draft { color: var(--warning); background: var(--warning-bg); }\n  &--live { color: var(--success); background: var(--success-bg); }\n}\n\n.controls[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: var(--space-4);\n  margin-bottom: var(--space-4);\n}\n\n.tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 3px;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n}\n\n.field--inline[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n\n  .field__label { margin: 0; white-space: nowrap; }\n  .select { min-width: 220px; }\n}\n\n\n\n\n.settings[_ngcontent-%COMP%] {\n  margin-bottom: var(--space-4);\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n\n  &__title { margin: 0 0 var(--space-1); font-size: var(--text-md); }\n\n  &__hint {\n    margin: 0 0 var(--space-3);\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    line-height: var(--leading-relaxed);\n  }\n\n  &__days {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-2);\n    margin-bottom: var(--space-3);\n  }\n\n  &__day {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 4px var(--space-3);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border: 1px solid var(--border);\n    border-radius: var(--radius-pill);\n    cursor: pointer;\n    user-select: none;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      border-color: var(--brand, var(--text-strong));\n      background: color-mix(in srgb, var(--brand, var(--text-strong)) 10%, transparent);\n    }\n\n    input { accent-color: var(--brand, currentColor); margin: 0; }\n  }\n\n  &__times {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-3);\n    margin-bottom: var(--space-2);\n\n    > div { display: flex; flex-direction: column; gap: 4px; }\n    .select { min-width: 130px; }\n  }\n\n  &__error {\n    margin: var(--space-2) 0 0;\n    font-size: var(--text-xs);\n    color: var(--danger, #b3261e);\n    line-height: var(--leading-relaxed);\n  }\n\n  &__actions {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    margin-top: var(--space-3);\n  }\n}\n\n\n\n\n.layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: var(--space-4);\n  align-items: start;\n\n  \n\n\n\n  &--with-palette { grid-template-columns: 250px minmax(0, 1fr); }\n\n  @media (max-width: 1400px) {\n    &--with-palette { grid-template-columns: minmax(0, 1fr); }\n  }\n}\n\n\n\n\n.palette[_ngcontent-%COMP%] {\n  position: sticky;\n  top: var(--space-4);\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n\n  &__title { margin: 0 0 var(--space-1); font-size: var(--text-md); }\n\n  \n\n  &__room {\n    margin-bottom: var(--space-3);\n\n    .field__label { display: block; margin-bottom: 4px; }\n    .select { width: 100%; }\n  }\n\n  &__hint {\n    margin: 0 0 var(--space-3);\n    font-size: var(--text-xs);\n    line-height: var(--leading-relaxed);\n    color: var(--text-muted);\n  }\n\n  \n\n  &__form {\n    margin-bottom: var(--space-4);\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n    border: 1px solid var(--border);\n    border-radius: var(--radius-card);\n\n    .field__label { display: block; margin: var(--space-2) 0 4px; font-size: var(--text-xs); }\n    .select { width: 100%; }\n\n    &-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); }\n\n    &-error {\n      margin: var(--space-2) 0 0;\n      font-size: var(--text-xs);\n      line-height: var(--leading-relaxed);\n      color: var(--danger, #b3261e);\n    }\n\n    &-summary {\n      margin: var(--space-2) 0 0;\n      font-size: var(--text-xs);\n      font-weight: 600;\n      color: var(--text-strong);\n    }\n\n    &-submit { margin-top: var(--space-3); width: 100%; }\n  }\n\n  &__list {\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-2);\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    max-height: 60vh;\n    overflow-y: auto;\n  }\n\n  \n\n\n\n  @media (max-width: 1400px) {\n    position: static;\n    max-height: none;\n\n    &__list {\n      display: grid;\n      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));\n      max-height: none;\n      overflow-y: visible;\n    }\n  }\n\n  &__empty {\n    font-size: var(--text-sm);\n    line-height: var(--leading-relaxed);\n    color: var(--text-muted);\n  }\n}\n\n.chip[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: var(--space-2) var(--space-3);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 4px solid var(--chip-color, var(--brand));\n  border-radius: var(--radius-input);\n  cursor: grab;\n  transition: box-shadow var(--transition-fast), transform var(--transition-fast);\n\n  &:hover { box-shadow: var(--shadow-sm); transform: translateX(2px); }\n  &:active { cursor: grabbing; }\n\n  &--done { opacity: .6; }\n\n  &__name { font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); }\n  &__teacher { font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__bar {\n    display: block;\n    height: 3px;\n    margin-top: 4px;\n    background: var(--surface-sunken);\n    border-radius: var(--radius-pill);\n    overflow: hidden;\n  }\n\n  &__fill { display: block; height: 100%; background: var(--chip-color, var(--brand)); }\n  &__quota { font-size: var(--text-xs); color: var(--text-light); }\n}\n\n\n\n\n.board[_ngcontent-%COMP%] {\n  min-width: 0;\n\n  &__scroll {\n    overflow-x: auto;\n    background: var(--surface-card);\n    border: 1px solid var(--border);\n    border-radius: var(--radius-card);\n  }\n\n  &__empty {\n    margin: var(--space-4) 0 0;\n    padding: var(--space-6);\n    text-align: center;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n}\n\n.grid[_ngcontent-%COMP%] {\n  \n\n\n\n  display: table;\n  width: 100%;\n  \n\n\n  min-width: calc(56px + var(--day-count, 5) * 240px);\n  border-collapse: collapse;\n  table-layout: fixed;\n\n  th, td { border: 1px solid var(--border-light); }\n\n  thead th {\n    padding: var(--space-3) var(--space-2);\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--text-strong);\n    background: var(--surface-sunken);\n    position: sticky;\n    top: 0;\n    z-index: 1;\n  }\n\n  &__corner { width: 56px; }\n\n  &__hour {\n    width: 56px;\n    padding: var(--space-2);\n    font-size: var(--text-xs);\n    font-weight: 500;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    vertical-align: top;\n    text-align: right;\n  }\n}\n\n.cell[_ngcontent-%COMP%] {\n  position: relative;\n  height: var(--row-height, 80px);\n  box-sizing: border-box;\n  padding: 0;\n  vertical-align: top;\n  transition: background var(--transition-fast), box-shadow var(--transition-fast);\n\n  &--drop:hover { background: var(--surface-hover); }\n\n  &--allowed {\n    background: var(--success-bg);\n    box-shadow: inset 0 0 0 2px var(--success);\n  }\n\n  &--blocked {\n    background: var(--danger-bg);\n    box-shadow: inset 0 0 0 2px var(--danger);\n  }\n}\n\n.course[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  position: absolute;\n  top: calc(3px + var(--row-height, 80px) * var(--off, 0));\n  left: 3px;\n  right: 3px;\n  height: calc(var(--row-height, 80px) * var(--span, 1) - 6px);\n  z-index: 5;\n  padding: var(--space-2);\n  box-sizing: border-box;\n  overflow: auto;\n  > * { flex-shrink: 0; }\n  color: var(--text-strong);\n  background: color-mix(in srgb, var(--course-color, var(--brand)) 14%, transparent);\n  border-left: 3px solid var(--course-color, var(--brand));\n  border-radius: var(--radius-input);\n  box-shadow: 0 1px 3px rgb(16 24 40 / 0.12);\n  cursor: grab;\n\n  &:active { cursor: grabbing; }\n\n  &--selected { box-shadow: 0 0 0 2px var(--course-color, var(--brand)); }\n\n  &__subject {\n    font-size: var(--text-sm);\n    font-weight: 600;\n    line-height: 1.2;\n    overflow-wrap: anywhere;\n  }\n\n  &__select {\n    padding: 0;\n    border: 0;\n    color: inherit;\n    background: transparent;\n    text-align: left;\n    cursor: pointer;\n\n    &:focus-visible { outline: 2px solid var(--brand); }\n  }\n\n  &__cancel {\n    align-self: flex-start;\n    margin-top: var(--space-1);\n    padding: 2px 4px;\n    border: 1px solid currentColor;\n    border-radius: var(--radius-input);\n    color: var(--danger);\n    background: var(--surface-card);\n    font: inherit;\n    font-size: var(--text-xs);\n    cursor: pointer;\n\n    &:disabled { opacity: .5; cursor: wait; }\n    &:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }\n  }\n\n  &__teacher,\n  &__where {\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    line-height: 1.25;\n    \n\n    overflow-wrap: break-word;\n  }\n\n  &__time {\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    white-space: nowrap;\n    font-variant-numeric: tabular-nums;\n  }\n}\n\n.veto[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 3px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 2px;\n  padding: 2px;\n  text-align: center;\n  background: var(--danger-bg);\n  border-radius: var(--radius-input);\n  pointer-events: none;\n\n  &__line {\n    font-size: var(--text-xs);\n    font-weight: 600;\n    color: var(--danger);\n  }\n}\n\n.conflicts[_ngcontent-%COMP%] {\n  margin-top: var(--space-3);\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--danger);\n  background: var(--danger-bg);\n  border-left: 3px solid var(--danger);\n  border-radius: var(--radius-input);\n\n  &__title { margin: 0; font-weight: 600; }\n  ul { margin: var(--space-1) 0 0; padding-left: var(--space-5); }\n}\n\n.detail[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  margin-top: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  \n\n  &__room {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n\n    .field__label { margin: 0; white-space: nowrap; }\n    .select { min-width: 200px; }\n  }\n}\n\n\n\n.print-only[_ngcontent-%COMP%] { display: none; }\n@media print {\n  @page { size: A4 portrait; margin: 12mm; }\n  [_nghost-%COMP%], .page[_ngcontent-%COMP%] { display: block; margin: 0; padding: 0; }\n  .page[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.print-only), .screen-only[_ngcontent-%COMP%] { display: none !important; }\n  .print-only[_ngcontent-%COMP%] { display: block !important; }\n}\n.timetable-sheet[_ngcontent-%COMP%] {\n  color: #000;\n  background: #fff;\n  font-family: Arial, sans-serif;\n  font-size: 9pt;\n  padding: 5mm 0;\n  break-after: page;\n  &:last-child { break-after: auto; }\n  p { margin: 0; }\n  .sheet__header { display: flex; align-items: center; justify-content: space-between; gap: 8mm; margin-bottom: 8mm; }\n  .sheet__identity { flex: 1; text-align: center; text-transform: uppercase; font-weight: 700; }\n  .sheet__ministry { font-size: 7pt; line-height: 1.5; }\n  .sheet__school { margin-top: 3mm; font-size: 9pt; }\n  h1 { border: 1.2pt solid #000; padding: 4mm; font-size: 14pt; text-transform: uppercase; margin: 0; }\n  .sheet__meta { display: flex; justify-content: flex-end; gap: 18mm; margin-bottom: 3mm; font-size: 12pt; }\n  .sheet__principal { margin-bottom: 2mm; font-weight: 700; text-transform: uppercase; }\n  .sheet__principal span { font-size: 8pt; text-decoration: underline; margin-right: 3mm; }\n  .sheet__grid { width: 100%; border-collapse: collapse; table-layout: fixed; border: 1.2pt solid #000; }\n  .sheet__hours-col { width: 29mm; }\n  th, td { border: .75pt solid #000; padding: 2mm 1mm; text-align: center; vertical-align: middle; overflow-wrap: anywhere; }\n  thead th { text-transform: uppercase; font-size: 9pt; height: 9mm; }\n  tbody td { height: 8mm; }\n  .sheet__hours { font-size: 8pt; white-space: nowrap; font-variant-numeric: tabular-nums; }\n  .sheet__separator th { font-weight: 400; text-transform: uppercase; padding: 2mm; }\n  .sheet__course { font-size: 8pt; line-height: 1.4; text-transform: uppercase; }\n  .sheet__course + .sheet__course { margin-top: 2mm; }\n  .sheet__course span { display: block; font-size: 7pt; }\n  tr { break-inside: avoid; }\n  .sheet__footer { margin-top: 8mm; text-align: right; font-size: 9pt; break-inside: avoid; }\n  .sheet__signature { height: 15mm; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TimetableComponent, [{
        type: Component,
        args: [{ selector: 'eduops-timetable', standalone: true, imports: [CommonModule, FormsModule, RouterLink, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Emploi du temps</h1>\n      <p class=\"page__meta numeric\">\n        @if (grid(); as g) {\n          {{ g.scopeLabel }} \u2014 {{ totalHours() }} h par semaine\n          @if (g.status === 'DRAFT') { <span class=\"tag tag--draft\">Brouillon</span> }\n          @if (g.status === 'PUBLISHED') { <span class=\"tag tag--live\">Publi\u00E9</span> }\n        }\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      @if (canManageSettings()) {\n        <button type=\"button\" class=\"btn btn--ghost screen-only\"\n                [disabled]=\"loading() || !grid()\"\n                (click)=\"toggleSettings()\">\n          {{ settingsOpen() ? 'Fermer les r\u00E9glages' : 'R\u00E9glages de la grille' }}\n        </button>\n      }\n      <button type=\"button\" class=\"btn btn--ghost screen-only\"\n              [disabled]=\"loading() || !grid()\"\n              (click)=\"print()\">\n        <span aria-hidden=\"true\">\u25A8</span>\n        Imprimer\n      </button>\n      @if (grid()?.editable) {\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"saving() || (grid()?.slots?.length ?? 0) === 0\"\n                (click)=\"publish()\">\n          {{ saving() ? 'Publication...' : 'Publier' }}\n        </button>\n      }\n    </div>\n  </header>\n\n  <!-- \u2550\u2550\u2550 Choix de la vue \u2550\u2550\u2550 -->\n  <section class=\"controls\">\n    <div class=\"tabs\" role=\"tablist\">\n      <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n              [class.tabs__item--on]=\"scope() === 'CLASSROOM'\"\n              [attr.aria-selected]=\"scope() === 'CLASSROOM'\"\n              (click)=\"changeScope('CLASSROOM')\">Par classe</button>\n      <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n              [class.tabs__item--on]=\"scope() === 'TEACHER'\"\n              [attr.aria-selected]=\"scope() === 'TEACHER'\"\n              (click)=\"changeScope('TEACHER')\">Par professeur</button>\n      <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n              [class.tabs__item--on]=\"scope() === 'ROOM'\"\n              [attr.aria-selected]=\"scope() === 'ROOM'\"\n              (click)=\"changeScope('ROOM')\">Par salle</button>\n    </div>\n\n    <div class=\"field field--inline\">\n      <label class=\"field__label\" for=\"scopeId\">\n        @switch (scope()) {\n          @case ('CLASSROOM') { Classe }\n          @case ('TEACHER') { Professeur }\n          @case ('ROOM') { Salle }\n        }\n      </label>\n      <select id=\"scopeId\" class=\"select\" [ngModel]=\"scopeId()\" name=\"scopeId\"\n              (ngModelChange)=\"changeScopeId($event)\">\n        @if (scope() === 'CLASSROOM') {\n          @for (classroom of classList(); track classroom.id) {\n            <option [value]=\"classroom.id\">{{ classroom.name }} \u2014 {{ classroom.levelName }}</option>\n          } @empty {\n            <option value=\"\">Aucune classe enregistr\u00E9e</option>\n          }\n        }\n        @if (scope() === 'TEACHER') {\n          @for (teacher of teacherList(); track teacher.id) {\n            <option [value]=\"teacher.id\">{{ teacher.fullName }}</option>\n          } @empty {\n            <option value=\"\">Aucun professeur enregistr\u00E9</option>\n          }\n        }\n        @if (scope() === 'ROOM') {\n          @for (room of roomList(); track room.id) {\n            <option [value]=\"room.id\">{{ room.name }} \u2014 {{ room.campusName }} ({{ room.code }})</option>\n          } @empty {\n            <option value=\"\">Aucune salle enregistr\u00E9e</option>\n          }\n        }\n      </select>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550 R\u00E9glages de la grille horaire \u2550\u2550\u2550 -->\n  @if (settingsOpen() && canManageSettings()) {\n    <section class=\"settings\" role=\"region\" aria-label=\"R\u00E9glages de la grille horaire\">\n      <h2 class=\"settings__title\">R\u00E9glages de la grille horaire</h2>\n      @if (settingsLoading()) {\n        <p class=\"settings__hint\">Chargement des r\u00E9glages\u2026</p>\n      } @else {\n        <p class=\"settings__hint\">\n          Ces r\u00E9glages s'appliquent \u00E0 toutes les grilles (classes, professeurs, salles).\n          Les cours d\u00E9j\u00E0 pos\u00E9s ne sont pas d\u00E9plac\u00E9s.\n        </p>\n        <div class=\"settings__days\">\n          @for (day of allDays; track day) {\n            <label class=\"settings__day\" [class.settings__day--on]=\"dayToggled(day)\">\n              <input type=\"checkbox\" [checked]=\"dayToggled(day)\" (change)=\"toggleDay(day)\">\n              {{ dayLabel(day) }}\n            </label>\n          }\n        </div>\n        <div class=\"settings__times\">\n          <div>\n            <label class=\"field__label\" for=\"settingsStart\">D\u00E9but de la journ\u00E9e</label>\n            <select id=\"settingsStart\" class=\"select\"\n                    [ngModel]=\"settingsStart()\" name=\"settingsStart\"\n                    (ngModelChange)=\"settingsStart.set($event)\">\n              @for (time of settingsTimeChoices; track time) {\n                <option [value]=\"time\">{{ time }}</option>\n              }\n            </select>\n          </div>\n          <div>\n            <label class=\"field__label\" for=\"settingsEnd\">Fin de la journ\u00E9e</label>\n            <select id=\"settingsEnd\" class=\"select\"\n                    [ngModel]=\"settingsEnd()\" name=\"settingsEnd\"\n                    (ngModelChange)=\"settingsEnd.set($event)\">\n              @for (time of settingsTimeChoices; track time) {\n                <option [value]=\"time\">{{ time }}</option>\n              }\n            </select>\n          </div>\n          <div>\n            <label class=\"field__label\" for=\"settingsStep\">Pas de la grille</label>\n            <select id=\"settingsStep\" class=\"select\"\n                    [ngModel]=\"settingsStep()\" name=\"settingsStep\"\n                    (ngModelChange)=\"changeSettingsStep($event)\">\n              @for (step of settingsStepChoices; track step) {\n                <option [value]=\"step\">{{ step }} min</option>\n              }\n            </select>\n          </div>\n        </div>\n        @if (settingsError()) {\n          <p class=\"settings__error\" role=\"alert\">{{ settingsError() }}</p>\n        }\n        <div class=\"settings__actions\">\n          <button type=\"button\" class=\"btn btn--ghost\" (click)=\"toggleSettings()\">Annuler</button>\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"savingSettings() || !settingsDirty()\"\n                  (click)=\"saveSettings()\">\n            {{ savingSettings() ? 'Enregistrement\u2026' : 'Enregistrer' }}\n          </button>\n        </div>\n      }\n    </section>\n  }\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement de l'emploi du temps...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n    @if (!scopeId()) {\n      <p class=\"board__empty\">\n        @switch (scope()) {\n          @case ('CLASSROOM') { Aucune classe disponible pour afficher un emploi du temps. }\n          @case ('TEACHER') { Aucun professeur disponible pour afficher un emploi du temps. }\n          @case ('ROOM') { Aucune salle disponible pour afficher un emploi du temps. }\n        }\n      </p>\n    }\n    @if (grid(); as g) {\n\n    <div class=\"layout\" [class.layout--with-palette]=\"g.editable\">\n\n      <!-- \u2550\u2550\u2550 Palette des mati\u00E8res \u2550\u2550\u2550 -->\n      @if (g.editable) {\n        <aside class=\"palette\">\n          <h2 class=\"palette__title\">Mati\u00E8res \u00E0 poser</h2>\n\n          <div class=\"palette__room\">\n            <label class=\"field__label\" for=\"paletteRoom\">Salle des cours pos\u00E9s</label>\n            <select id=\"paletteRoom\" class=\"select\"\n                    [ngModel]=\"roomChoice()\" name=\"paletteRoom\"\n                    (ngModelChange)=\"changeRoomChoice($event)\">\n              <option value=\"\">{{ defaultRoomOptionLabel() }}</option>\n              @for (room of activeRooms(); track room.id) {\n                <option [value]=\"room.id\">\n                  {{ room.name }} \u2014 {{ room.campusName }} ({{ room.code }})\n                </option>\n              }\n            </select>\n          </div>\n\n          <p class=\"palette__hint\">\n            Faites glisser une mati\u00E8re sur la grille, ou utilisez le formulaire\n            ci-dessous pour choisir le jour, l'heure et la dur\u00E9e exacts.\n          </p>\n\n          <!-- \u2550\u2550\u2550 Formulaire d'ajout manuel \u2550\u2550\u2550 -->\n          <div class=\"palette__form\">\n            <label class=\"field__label\" for=\"manualSubject\">Mati\u00E8re &amp; enseignant</label>\n            <select id=\"manualSubject\" class=\"select\"\n                    [ngModel]=\"formSubjectKey()\" name=\"manualSubject\"\n                    (ngModelChange)=\"formSubjectKey.set($event)\">\n              <option value=\"\">\u2014 Choisir \u2014</option>\n              @for (entry of palette(); track entry.subjectId + entry.teacherId) {\n                <option [value]=\"entry.subjectId + '|' + entry.teacherId\">\n                  {{ entry.subjectName }} \u2014 {{ entry.teacherName }}\n                </option>\n              }\n            </select>\n\n            <label class=\"field__label\" for=\"manualDay\">Jour</label>\n            <select id=\"manualDay\" class=\"select\"\n                    [ngModel]=\"formDay()\" name=\"manualDay\"\n                    (ngModelChange)=\"formDay.set($event)\">\n              <option value=\"\">\u2014 Choisir \u2014</option>\n              @for (day of days(); track day) {\n                <option [value]=\"day\">{{ dayLabel(day) }}</option>\n              }\n            </select>\n\n            <div class=\"palette__form-row\">\n              <div>\n                <label class=\"field__label\" for=\"manualHour\">Heure de d\u00E9part</label>\n                <select id=\"manualHour\" class=\"select\"\n                        [ngModel]=\"formHour()\" name=\"manualHour\"\n                        (ngModelChange)=\"formHour.set($event)\">\n                  <option value=\"\">\u2014 h \u2014</option>\n                  @for (hour of hourChoices(); track hour) {\n                    <option [value]=\"hour\">{{ hour }} heures</option>\n                  }\n                </select>\n              </div>\n              <div>\n                <label class=\"field__label\" for=\"manualMinute\">Minutes</label>\n                <select id=\"manualMinute\" class=\"select\"\n                        [ngModel]=\"formMinute()\" name=\"manualMinute\"\n                        (ngModelChange)=\"formMinute.set($event)\">\n                  <option value=\"\">\u2014 mn \u2014</option>\n                  @for (minute of minuteChoices; track minute) {\n                    <option [value]=\"minute\">{{ minute }} mn</option>\n                  }\n                </select>\n              </div>\n            </div>\n\n            @if (formSummary()) {\n              <p class=\"palette__form-summary\">{{ formSummary() }}</p>\n            }\n\n            <label class=\"field__label\" for=\"manualDuration\">Dur\u00E9e</label>\n            <select id=\"manualDuration\" class=\"select\"\n                    [ngModel]=\"formDuration()\" name=\"manualDuration\"\n                    (ngModelChange)=\"formDuration.set($event)\">\n              @for (duration of durationChoices; track duration) {\n                <option [value]=\"duration\">{{ duration }} min</option>\n              }\n            </select>\n\n            @if (formError()) {\n              <p class=\"palette__form-error\" role=\"alert\">{{ formError() }}</p>\n            }\n            @for (conflict of formConflicts(); track conflict.kind + conflict.message) {\n              <p class=\"palette__form-error\" role=\"alert\">\n                {{ conflictLabel(conflict) }} \u2014 {{ conflict.message }}\n              </p>\n            }\n\n            <button type=\"button\" class=\"btn btn--primary palette__form-submit\"\n                    [disabled]=\"!canSubmitForm()\"\n                    (click)=\"createSlotManually()\">\n              {{ saving() ? 'Enregistrement\u2026' : 'Ajouter le cours' }}\n            </button>\n          </div>\n\n          <ul class=\"palette__list\">\n            @for (entry of palette(); track entry.subjectId + entry.teacherId) {\n              <li>\n                <div class=\"chip\" draggable=\"true\"\n                     [class.chip--done]=\"entry.complete\"\n                     [style.--chip-color]=\"entry.subjectColor || 'var(--brand)'\"\n                     (dragstart)=\"startPaletteDrag(entry, $event)\"\n                     (dragend)=\"endDrag()\">\n                  <span class=\"chip__name\">{{ entry.subjectName }}</span>\n                  <span class=\"chip__teacher\">{{ entry.teacherName }}</span>\n                  <span class=\"chip__bar\" aria-hidden=\"true\">\n                    <span class=\"chip__fill\" [style.width.%]=\"paletteProgress(entry)\"></span>\n                  </span>\n                  <span class=\"chip__quota numeric\">\n                    {{ entry.placedMinutes / 60 }} h pos\u00E9es\n                    @if (entry.weeklyHours) { / {{ entry.weeklyHours }} h }\n                  </span>\n                </div>\n              </li>\n            } @empty {\n              <li class=\"palette__empty\">\n                Aucune affectation d'enseignant sur cette classe.\n                <a routerLink=\"/teachers\">Affectez d'abord les enseignants</a> :\n                la palette n'offre que des combinaisons d\u00E9j\u00E0 valides.\n              </li>\n            }\n          </ul>\n        </aside>\n      }\n\n      <!-- \u2550\u2550\u2550 La grille \u2550\u2550\u2550 -->\n      <div class=\"board\">\n        <div class=\"board__scroll\">\n          <table class=\"grid\" [style.--day-count]=\"days().length\"\n                 [style.--row-height]=\"screenRowHeight() + 'px'\">\n            <caption class=\"visually-hidden\">\n              Emploi du temps de {{ g.scopeLabel }}\n            </caption>\n            <thead>\n              <tr>\n                <th class=\"grid__corner\" scope=\"col\">Heure</th>\n                @for (day of days(); track day) {\n                  <th scope=\"col\">{{ dayLabel(day) }}</th>\n                }\n              </tr>\n            </thead>\n            <tbody>\n              @for (hour of hours(); track hour) {\n                <tr>\n                  <th class=\"grid__hour numeric\" scope=\"row\">{{ hour }}</th>\n                  @for (day of days(); track day) {\n                    <td class=\"cell\"\n                        [class.cell--blocked]=\"isBlocked(day, hour)\"\n                        [class.cell--allowed]=\"isAllowed(day, hour)\"\n                        [class.cell--drop]=\"g.editable\"\n                        (dragover)=\"onDragOver(day, hour, $event)\"\n                        (drop)=\"onDrop(day, hour, $event)\">\n\n                      @for (slot of slotsAt(day, hour); track slot.id) {\n                        <article class=\"course\"\n                                 [class.course--selected]=\"selectedSlot()?.id === slot.id\"\n                                 [style.--course-color]=\"slot.subjectColor || 'var(--brand)'\"\n                                 [style.--span]=\"spanOf(slot)\"\n                                 [style.--off]=\"offsetOf(slot, hour)\"\n                                 [draggable]=\"g.editable\"\n                                 (dragstart)=\"startSlotDrag(slot, $event)\"\n                                 (dragend)=\"endDrag()\"\n                                 (click)=\"select(slot)\">\n                          <button type=\"button\" class=\"course__subject course__select\"\n                                  [attr.aria-label]=\"'D\u00E9tails du cours : ' + slot.subjectName\"\n                                  [attr.aria-pressed]=\"selectedSlot()?.id === slot.id\"\n                                  (click)=\"$event.stopPropagation(); select(slot)\">\n                            {{ slot.subjectShortName || slot.subjectName }}\n                          </button>\n                          <span class=\"course__teacher\">{{ slot.teacherName }}</span>\n                          <span class=\"course__time numeric\">\n                            {{ hhmm(slot.startTime) }} \u2013 {{ hhmm(slot.endTime) }}\n                          </span>\n                          @if (g.scope !== 'CLASSROOM') {\n                            <span class=\"course__where\">{{ slot.classroomName }}</span>\n                          }\n                          <span class=\"course__where\" data-testid=\"card-room\">\n                            Salle : {{ slot.roomName || 'Non affect\u00E9e' }}\n                          </span>\n                          @if (canCancel()) {\n                            <button type=\"button\" class=\"course__cancel\" data-testid=\"card-cancel-course\"\n                                    [disabled]=\"saving() || cancelling()\"\n                                    (click)=\"$event.stopPropagation(); removeSlot(slot)\">\n                              Annuler ce cours\n                            </button>\n                          }\n                        </article>\n                      }\n\n                      @if (isBlocked(day, hour)) {\n                        <div class=\"veto\" role=\"alert\">\n                          @for (conflict of hoverConflicts(); track conflict.message) {\n                            <span class=\"veto__line\">{{ conflictLabel(conflict) }}</span>\n                          }\n                        </div>\n                      }\n                    </td>\n                  }\n                </tr>\n              }\n            </tbody>\n          </table>\n        </div>\n\n        @if (hoverConflicts().length > 0) {\n          <div class=\"conflicts\" role=\"alert\">\n            <p class=\"conflicts__title\">Ce cr\u00E9neau est refus\u00E9 :</p>\n            <ul>\n              @for (conflict of hoverConflicts(); track conflict.message) {\n                <li>{{ conflict.message }}</li>\n              }\n            </ul>\n          </div>\n        }\n\n        @if (selectedSlot(); as slot) {\n          <div class=\"detail\">\n            <div class=\"detail__body\">\n              <p class=\"detail__title\">{{ slot.subjectName }}</p>\n              <p class=\"detail__meta numeric\">\n                {{ dayLabel(slot.dayOfWeek) }} {{ hhmm(slot.startTime) }} \u2013\n                {{ hhmm(slot.endTime) }} \u00B7 {{ slot.teacherName }}\n              </p>\n              <p class=\"detail__meta\" data-testid=\"course-room\">\n                Classe : {{ slot.classroomName }} \u00B7 Salle : {{ slot.roomName || 'Non affect\u00E9e' }}\n              </p>\n            </div>\n            @if (g.editable) {\n              <div class=\"detail__room\">\n                <label class=\"field__label\" for=\"detailRoom\">Salle</label>\n                <select id=\"detailRoom\" class=\"select\"\n                        [ngModel]=\"slot.roomId ?? ''\" name=\"detailRoom\"\n                        [disabled]=\"saving()\"\n                        (ngModelChange)=\"changeSlotRoom(slot, $event)\">\n                  <option value=\"\">{{ defaultRoomOptionLabel() }}</option>\n                  @for (room of activeRooms(); track room.id) {\n                    <option [value]=\"room.id\">{{ room.name }} \u2014 {{ room.campusName }}</option>\n                  }\n                </select>\n              </div>\n            }\n            @if (canCancel()) {\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\" data-testid=\"cancel-course\"\n                      [disabled]=\"saving() || cancelling()\"\n                      (click)=\"removeSlot(slot)\">\n                {{ cancelling() ? 'Annulation...' : 'Annuler ce cours' }}\n              </button>\n            }\n          </div>\n        }\n\n        @if (g.slots.length === 0) {\n          <p class=\"board__empty\">\n            @if (g.editable) {\n              La grille est vide. Faites glisser une mati\u00E8re depuis la colonne de gauche.\n            } @else {\n              Aucun cours sur cette semaine.\n            }\n          </p>\n        }\n      </div>\n    </div>\n    }\n  }\n\n  <!-- Feuille A4 d\u00E9di\u00E9e \u00E0 l\u2019impression. -->\n  <div class=\"print-only\">\n    @for (page of printPages(); track page.label) {\n      <article class=\"timetable-sheet\">\n        <header class=\"sheet__header\">\n          <div class=\"sheet__identity\">\n            <p class=\"sheet__ministry\">Minist\u00E8re de l\u2019\u00C9ducation nationale,<br>de l\u2019Alphab\u00E9tisation et de l\u2019Enseignement technique</p>\n            <p class=\"sheet__school\">{{ schoolName() }}</p>\n          </div>\n          <h1>Emploi du temps</h1>\n        </header>\n        <div class=\"sheet__meta\">\n          <strong>\n            @if (page.scope === 'CLASSROOM') { Classe : {{ page.label }} }\n            @else if (page.scope === 'TEACHER') { Professeur : {{ page.label }} }\n            @else { Salle : {{ page.label }} }\n          </strong>\n          @if (page.scope === 'CLASSROOM') { <strong>Salle : {{ page.roomName || '\u2014' }}</strong> }\n        </div>\n        @if (page.scope === 'CLASSROOM') {\n          <p class=\"sheet__principal\"><span>Professeur principal de la classe :</span> {{ page.mainTeacherName || '\u2014' }}</p>\n        }\n        <table class=\"sheet__grid\">\n          <colgroup><col class=\"sheet__hours-col\">@for (day of page.days; track day) { <col> }</colgroup>\n          <thead><tr>\n            <th scope=\"col\">Horaires</th>\n            @for (day of page.days; track day) { <th scope=\"col\">{{ dayLabel(day) }}</th> }\n          </tr></thead>\n          <tbody>\n            @for (row of page.rows; track row.start) {\n              @if (row.afternoon) {\n                <tr class=\"sheet__separator\"><th [attr.colspan]=\"page.days.length + 1\">Apr\u00E8s-midi</th></tr>\n              }\n              <tr>\n                <th scope=\"row\" class=\"sheet__hours\">{{ row.start.replace(':', 'H') }}\u2013{{ row.end.replace(':', 'H') }}</th>\n                @for (cell of row.cells; track cell.day) {\n                  <td [attr.rowspan]=\"cell.rowspan\">\n                    @for (slot of cell.slots; track slot.id) {\n                      <div class=\"sheet__course\">\n                        <strong>{{ slot.subjectShortName || slot.subjectName }}@if (slot.roomName) { ({{ slot.roomName }}) }</strong>\n                        @if (page.scope !== 'CLASSROOM') { <span>{{ slot.classroomName }}</span> }\n                      </div>\n                    }\n                  </td>\n                }\n              </tr>\n            }\n          </tbody>\n        </table>\n        <footer class=\"sheet__footer\"><p>Le responsable de l\u2019\u00E9tablissement</p><div class=\"sheet__signature\"></div></footer>\n      </article>\n    }\n  </div>\n</div>\n", styles: ["@import 'styles/tokens';\n\n.tag {\n  display: inline-block;\n  margin-left: var(--space-2);\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-pill);\n\n  &--draft { color: var(--warning); background: var(--warning-bg); }\n  &--live { color: var(--success); background: var(--success-bg); }\n}\n\n.controls {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: var(--space-4);\n  margin-bottom: var(--space-4);\n}\n\n.tabs {\n  display: inline-flex;\n  padding: 3px;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    padding: var(--space-2) var(--space-4);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: none;\n    border: none;\n    border-radius: var(--radius-input);\n    cursor: pointer;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n}\n\n.field--inline {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n\n  .field__label { margin: 0; white-space: nowrap; }\n  .select { min-width: 220px; }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 R\u00E9glages de la grille \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.settings {\n  margin-bottom: var(--space-4);\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n\n  &__title { margin: 0 0 var(--space-1); font-size: var(--text-md); }\n\n  &__hint {\n    margin: 0 0 var(--space-3);\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    line-height: var(--leading-relaxed);\n  }\n\n  &__days {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-2);\n    margin-bottom: var(--space-3);\n  }\n\n  &__day {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 4px var(--space-3);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border: 1px solid var(--border);\n    border-radius: var(--radius-pill);\n    cursor: pointer;\n    user-select: none;\n\n    &--on {\n      font-weight: 600;\n      color: var(--text-strong);\n      border-color: var(--brand, var(--text-strong));\n      background: color-mix(in srgb, var(--brand, var(--text-strong)) 10%, transparent);\n    }\n\n    input { accent-color: var(--brand, currentColor); margin: 0; }\n  }\n\n  &__times {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-3);\n    margin-bottom: var(--space-2);\n\n    > div { display: flex; flex-direction: column; gap: 4px; }\n    .select { min-width: 130px; }\n  }\n\n  &__error {\n    margin: var(--space-2) 0 0;\n    font-size: var(--text-xs);\n    color: var(--danger, #b3261e);\n    line-height: var(--leading-relaxed);\n  }\n\n  &__actions {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    margin-top: var(--space-3);\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Disposition \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: var(--space-4);\n  align-items: start;\n\n  /* C\u00F4te \u00E0 c\u00F4te uniquement sur les tr\u00E8s grands \u00E9crans ; d\u00E8s que la place\n     manque, la palette passe SOUS la grille : le tableau occupe toute la\n     largeur de la page et chaque colonne de jour reste large et lisible. */\n  &--with-palette { grid-template-columns: 250px minmax(0, 1fr); }\n\n  @media (max-width: 1400px) {\n    &--with-palette { grid-template-columns: minmax(0, 1fr); }\n  }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Palette \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.palette {\n  position: sticky;\n  top: var(--space-4);\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n\n  &__title { margin: 0 0 var(--space-1); font-size: var(--text-md); }\n\n  /* La salle des cours pos\u00E9s : le premier choix \u00E0 faire, avant m\u00EAme la mati\u00E8re. */\n  &__room {\n    margin-bottom: var(--space-3);\n\n    .field__label { display: block; margin-bottom: 4px; }\n    .select { width: 100%; }\n  }\n\n  &__hint {\n    margin: 0 0 var(--space-3);\n    font-size: var(--text-xs);\n    line-height: var(--leading-relaxed);\n    color: var(--text-muted);\n  }\n\n  /* Le formulaire d'ajout manuel : jour, heure au quart d'heure et dur\u00E9e. */\n  &__form {\n    margin-bottom: var(--space-4);\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n    border: 1px solid var(--border);\n    border-radius: var(--radius-card);\n\n    .field__label { display: block; margin: var(--space-2) 0 4px; font-size: var(--text-xs); }\n    .select { width: 100%; }\n\n    &-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); }\n\n    &-error {\n      margin: var(--space-2) 0 0;\n      font-size: var(--text-xs);\n      line-height: var(--leading-relaxed);\n      color: var(--danger, #b3261e);\n    }\n\n    &-summary {\n      margin: var(--space-2) 0 0;\n      font-size: var(--text-xs);\n      font-weight: 600;\n      color: var(--text-strong);\n    }\n\n    &-submit { margin-top: var(--space-3); width: 100%; }\n  }\n\n  &__list {\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-2);\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    max-height: 60vh;\n    overflow-y: auto;\n  }\n\n  /* Quand la palette est empil\u00E9e sous la grille (\u00E9crans \u2264 1400 px),\n     la liste de mati\u00E8res s'\u00E9tale en plusieurs colonnes au lieu d'une\n     longue colonne \u00E9troite. */\n  @media (max-width: 1400px) {\n    position: static;\n    max-height: none;\n\n    &__list {\n      display: grid;\n      grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));\n      max-height: none;\n      overflow-y: visible;\n    }\n  }\n\n  &__empty {\n    font-size: var(--text-sm);\n    line-height: var(--leading-relaxed);\n    color: var(--text-muted);\n  }\n}\n\n.chip {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: var(--space-2) var(--space-3);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-left: 4px solid var(--chip-color, var(--brand));\n  border-radius: var(--radius-input);\n  cursor: grab;\n  transition: box-shadow var(--transition-fast), transform var(--transition-fast);\n\n  &:hover { box-shadow: var(--shadow-sm); transform: translateX(2px); }\n  &:active { cursor: grabbing; }\n\n  &--done { opacity: .6; }\n\n  &__name { font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); }\n  &__teacher { font-size: var(--text-xs); color: var(--text-muted); }\n\n  &__bar {\n    display: block;\n    height: 3px;\n    margin-top: 4px;\n    background: var(--surface-sunken);\n    border-radius: var(--radius-pill);\n    overflow: hidden;\n  }\n\n  &__fill { display: block; height: 100%; background: var(--chip-color, var(--brand)); }\n  &__quota { font-size: var(--text-xs); color: var(--text-light); }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Grille \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.board {\n  min-width: 0;\n\n  &__scroll {\n    overflow-x: auto;\n    background: var(--surface-card);\n    border: 1px solid var(--border);\n    border-radius: var(--radius-card);\n  }\n\n  &__empty {\n    margin: var(--space-4) 0 0;\n    padding: var(--space-6);\n    text-align: center;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n}\n\n.grid {\n  /* \u26A0 Le style global `.grid` (styles/_components.scss) pose `display: grid`\n     pour les grilles KPI : sur un <table>, cela casse tout l'agencement\n     tabulaire. On r\u00E9tablit explicitement le rendu de tableau. */\n  display: table;\n  width: 100%;\n  /* Colonnes de jours larges : mati\u00E8re, enseignant, salle et horaires\n     doivent rester lisibles dans chaque cellule. */\n  min-width: calc(56px + var(--day-count, 5) * 240px);\n  border-collapse: collapse;\n  table-layout: fixed;\n\n  th, td { border: 1px solid var(--border-light); }\n\n  thead th {\n    padding: var(--space-3) var(--space-2);\n    font-size: var(--text-sm);\n    font-weight: 600;\n    color: var(--text-strong);\n    background: var(--surface-sunken);\n    position: sticky;\n    top: 0;\n    z-index: 1;\n  }\n\n  &__corner { width: 56px; }\n\n  &__hour {\n    width: 56px;\n    padding: var(--space-2);\n    font-size: var(--text-xs);\n    font-weight: 500;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    vertical-align: top;\n    text-align: right;\n  }\n}\n\n.cell {\n  position: relative;\n  height: var(--row-height, 80px);\n  box-sizing: border-box;\n  padding: 0;\n  vertical-align: top;\n  transition: background var(--transition-fast), box-shadow var(--transition-fast);\n\n  &--drop:hover { background: var(--surface-hover); }\n\n  &--allowed {\n    background: var(--success-bg);\n    box-shadow: inset 0 0 0 2px var(--success);\n  }\n\n  &--blocked {\n    background: var(--danger-bg);\n    box-shadow: inset 0 0 0 2px var(--danger);\n  }\n}\n\n.course {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  position: absolute;\n  top: calc(3px + var(--row-height, 80px) * var(--off, 0));\n  left: 3px;\n  right: 3px;\n  height: calc(var(--row-height, 80px) * var(--span, 1) - 6px);\n  z-index: 5;\n  padding: var(--space-2);\n  box-sizing: border-box;\n  overflow: auto;\n  > * { flex-shrink: 0; }\n  color: var(--text-strong);\n  background: color-mix(in srgb, var(--course-color, var(--brand)) 14%, transparent);\n  border-left: 3px solid var(--course-color, var(--brand));\n  border-radius: var(--radius-input);\n  box-shadow: 0 1px 3px rgb(16 24 40 / 0.12);\n  cursor: grab;\n\n  &:active { cursor: grabbing; }\n\n  &--selected { box-shadow: 0 0 0 2px var(--course-color, var(--brand)); }\n\n  &__subject {\n    font-size: var(--text-sm);\n    font-weight: 600;\n    line-height: 1.2;\n    overflow-wrap: anywhere;\n  }\n\n  &__select {\n    padding: 0;\n    border: 0;\n    color: inherit;\n    background: transparent;\n    text-align: left;\n    cursor: pointer;\n\n    &:focus-visible { outline: 2px solid var(--brand); }\n  }\n\n  &__cancel {\n    align-self: flex-start;\n    margin-top: var(--space-1);\n    padding: 2px 4px;\n    border: 1px solid currentColor;\n    border-radius: var(--radius-input);\n    color: var(--danger);\n    background: var(--surface-card);\n    font: inherit;\n    font-size: var(--text-xs);\n    cursor: pointer;\n\n    &:disabled { opacity: .5; cursor: wait; }\n    &:focus-visible { outline: 2px solid var(--brand); outline-offset: 2px; }\n  }\n\n  &__teacher,\n  &__where {\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    line-height: 1.25;\n    /* Le texte passe \u00E0 la ligne : aucune information ne doit \u00EAtre coup\u00E9e. */\n    overflow-wrap: break-word;\n  }\n\n  &__time {\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n    white-space: nowrap;\n    font-variant-numeric: tabular-nums;\n  }\n}\n\n.veto {\n  position: absolute;\n  inset: 3px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 2px;\n  padding: 2px;\n  text-align: center;\n  background: var(--danger-bg);\n  border-radius: var(--radius-input);\n  pointer-events: none;\n\n  &__line {\n    font-size: var(--text-xs);\n    font-weight: 600;\n    color: var(--danger);\n  }\n}\n\n.conflicts {\n  margin-top: var(--space-3);\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--danger);\n  background: var(--danger-bg);\n  border-left: 3px solid var(--danger);\n  border-radius: var(--radius-input);\n\n  &__title { margin: 0; font-weight: 600; }\n  ul { margin: var(--space-1) 0 0; padding-left: var(--space-5); }\n}\n\n.detail {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  margin-top: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n  /* Changer la salle d'un cours d\u00E9j\u00E0 pos\u00E9, sans le retirer puis le reposer. */\n  &__room {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n\n    .field__label { margin: 0; white-space: nowrap; }\n    .select { min-width: 200px; }\n  }\n}\n\n/* Feuille sobre, conforme au mod\u00E8le administratif. */\n.print-only { display: none; }\n@media print {\n  @page { size: A4 portrait; margin: 12mm; }\n  :host, .page { display: block; margin: 0; padding: 0; }\n  .page > *:not(.print-only), .screen-only { display: none !important; }\n  .print-only { display: block !important; }\n}\n.timetable-sheet {\n  color: #000;\n  background: #fff;\n  font-family: Arial, sans-serif;\n  font-size: 9pt;\n  padding: 5mm 0;\n  break-after: page;\n  &:last-child { break-after: auto; }\n  p { margin: 0; }\n  .sheet__header { display: flex; align-items: center; justify-content: space-between; gap: 8mm; margin-bottom: 8mm; }\n  .sheet__identity { flex: 1; text-align: center; text-transform: uppercase; font-weight: 700; }\n  .sheet__ministry { font-size: 7pt; line-height: 1.5; }\n  .sheet__school { margin-top: 3mm; font-size: 9pt; }\n  h1 { border: 1.2pt solid #000; padding: 4mm; font-size: 14pt; text-transform: uppercase; margin: 0; }\n  .sheet__meta { display: flex; justify-content: flex-end; gap: 18mm; margin-bottom: 3mm; font-size: 12pt; }\n  .sheet__principal { margin-bottom: 2mm; font-weight: 700; text-transform: uppercase; }\n  .sheet__principal span { font-size: 8pt; text-decoration: underline; margin-right: 3mm; }\n  .sheet__grid { width: 100%; border-collapse: collapse; table-layout: fixed; border: 1.2pt solid #000; }\n  .sheet__hours-col { width: 29mm; }\n  th, td { border: .75pt solid #000; padding: 2mm 1mm; text-align: center; vertical-align: middle; overflow-wrap: anywhere; }\n  thead th { text-transform: uppercase; font-size: 9pt; height: 9mm; }\n  tbody td { height: 8mm; }\n  .sheet__hours { font-size: 8pt; white-space: nowrap; font-variant-numeric: tabular-nums; }\n  .sheet__separator th { font-weight: 400; text-transform: uppercase; padding: 2mm; }\n  .sheet__course { font-size: 8pt; line-height: 1.4; text-transform: uppercase; }\n  .sheet__course + .sheet__course { margin-top: 2mm; }\n  .sheet__course span { display: block; font-size: 7pt; }\n  tr { break-inside: avoid; }\n  .sheet__footer { margin-top: 8mm; text-align: right; font-size: 9pt; break-inside: avoid; }\n  .sheet__signature { height: 15mm; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TimetableComponent, { className: "TimetableComponent", filePath: "frontend/src/app/features/timetable/timetable.component.ts", lineNumber: 69 }); })();
//# sourceMappingURL=timetable.component.js.map