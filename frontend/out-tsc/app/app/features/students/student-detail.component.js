import { ChangeDetectionStrategy, Component, DestroyRef, Input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { StudentStatementService } from '@core/services/student-statement.service';
import { renderStudentStatement } from './student-statement-print';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { StatusLabelPipe } from '@shared/pipes/status-label.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.academicYearId;
const _c0 = a0 => ({ studentId: a0, type: "SCHOOL_CERTIFICATE" });
function StudentDetailComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 1);
} }
function StudentDetailComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 2);
    i0.ɵɵlistener("retry", function StudentDetailComponent_Conditional_2_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2);
} if (rf & 2) {
    const student_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", student_r4.age, " ans ");
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-status-badge", 10);
} if (rf & 2) {
    i0.ɵɵproperty("status", ctx.globalStatus);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 21);
    i0.ɵɵlistener("click", function StudentDetailComponent_Conditional_3_Conditional_0_Conditional_22_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.printStatement()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r1.printing() || ctx_r1.editing());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.printing() ? "Pr\u00E9paration\u2026" : "Imprimer la fiche / paiements");
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function StudentDetailComponent_Conditional_3_Conditional_0_Conditional_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openEdit()); });
    i0.ɵɵtext(1, "Modifier");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r1.editing());
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Conditional_24_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 43);
    i0.ɵɵtext(1, "V\u00E9rifiez les champs obligatoires, la date de naissance (ant\u00E9rieure \u00E0 aujourd\u2019hui) et le format du courriel.");
    i0.ɵɵelementEnd();
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 16)(1, "header", 23)(2, "h2", 24);
    i0.ɵɵtext(3, "Modifier les informations de l\u2019\u00E9l\u00E8ve");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "form", 25);
    i0.ɵɵlistener("ngSubmit", function StudentDetailComponent_Conditional_3_Conditional_0_Conditional_24_Template_form_ngSubmit_4_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.save()); });
    i0.ɵɵelementStart(5, "fieldset", 26)(6, "div", 27)(7, "label");
    i0.ɵɵtext(8, "Nom *");
    i0.ɵɵelement(9, "input", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "label");
    i0.ɵɵtext(11, "Pr\u00E9nom *");
    i0.ɵɵelement(12, "input", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "label");
    i0.ɵɵtext(14, "Autres pr\u00E9noms");
    i0.ɵɵelement(15, "input", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "label");
    i0.ɵɵtext(17, "Sexe *");
    i0.ɵɵelementStart(18, "select", 31)(19, "option", 32);
    i0.ɵɵtext(20, "F\u00E9minin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "option", 33);
    i0.ɵɵtext(22, "Masculin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "option", 34);
    i0.ɵɵtext(24, "Autre");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "label");
    i0.ɵɵtext(26, "Date de naissance *");
    i0.ɵɵelement(27, "input", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "label");
    i0.ɵɵtext(29, "Lieu de naissance");
    i0.ɵɵelement(30, "input", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "label");
    i0.ɵɵtext(32, "Nationalit\u00E9");
    i0.ɵɵelement(33, "input", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "label");
    i0.ɵɵtext(35, "T\u00E9l\u00E9phone");
    i0.ɵɵelement(36, "input", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "label");
    i0.ɵɵtext(38, "Courriel");
    i0.ɵɵelement(39, "input", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "label");
    i0.ɵɵtext(41, "Adresse");
    i0.ɵɵelement(42, "input", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "label");
    i0.ɵɵtext(44, "Ville");
    i0.ɵɵelement(45, "input", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "label");
    i0.ɵɵtext(47, "\u00C9tablissement pr\u00E9c\u00E9dent");
    i0.ɵɵelement(48, "input", 42);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(49, StudentDetailComponent_Conditional_3_Conditional_0_Conditional_24_Conditional_49_Template, 2, 0, "p", 43);
    i0.ɵɵelementStart(50, "div", 44)(51, "button", 45);
    i0.ɵɵlistener("click", function StudentDetailComponent_Conditional_3_Conditional_0_Conditional_24_Template_button_click_51_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.cancelEdit()); });
    i0.ɵɵtext(52, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "button", 46);
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("formGroup", ctx_r1.editForm);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance(22);
    i0.ɵɵproperty("max", ctx_r1.maxBirthDate);
    i0.ɵɵadvance(22);
    i0.ɵɵconditional(ctx_r1.editForm.invalid && ctx_r1.editForm.touched ? 49 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.saving() ? "Enregistrement\u2026" : "Enregistrer les modifications");
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_34_For_74_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵtext(1, "Principal");
    i0.ɵɵelementEnd();
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_34_For_74_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 57);
    i0.ɵɵtext(1, "Responsable financier");
    i0.ɵɵelementEnd();
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_34_For_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 51);
    i0.ɵɵelement(1, "eduops-avatar", 53);
    i0.ɵɵelementStart(2, "div", 54)(3, "p", 55);
    i0.ɵɵtext(4);
    i0.ɵɵtemplate(5, StudentDetailComponent_Conditional_3_Conditional_0_Case_34_For_74_Conditional_5_Template, 2, 0, "span", 56)(6, StudentDetailComponent_Conditional_3_Conditional_0_Case_34_For_74_Conditional_6_Template, 2, 0, "span", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 58);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "statusLabel");
    i0.ɵɵelementStart(10, "span", 8);
    i0.ɵɵtext(11, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 49);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const guardian_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", guardian_r8.fullName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", guardian_r8.fullName, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(guardian_r8.primary ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(guardian_r8.financialResponsibility ? 6 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 6, guardian_r8.relationship), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(guardian_r8.phone);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_34_ForEmpty_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 52);
    i0.ɵɵtext(1, "Aucun responsable enregistr\u00E9.");
    i0.ɵɵelementEnd();
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "section", 20)(2, "header", 23)(3, "h3", 47);
    i0.ɵɵtext(4, "\u00C9tat civil");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "dl", 48)(6, "div")(7, "dt");
    i0.ɵɵtext(8, "Matricule");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "dd", 49);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div")(12, "dt");
    i0.ɵɵtext(13, "Nom complet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "dd");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div")(17, "dt");
    i0.ɵɵtext(18, "Sexe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "dd");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div")(22, "dt");
    i0.ɵɵtext(23, "Date de naissance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "dd");
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div")(28, "dt");
    i0.ɵɵtext(29, "Lieu de naissance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "dd");
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div")(33, "dt");
    i0.ɵɵtext(34, "Nationalite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "dd");
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "div")(38, "dt");
    i0.ɵɵtext(39, "T\u00E9l\u00E9phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "dd");
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(42, "div")(43, "dt");
    i0.ɵɵtext(44, "Courriel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "dd");
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "div")(48, "dt");
    i0.ɵɵtext(49, "Adresse");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "dd");
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(52, "div")(53, "dt");
    i0.ɵɵtext(54, "Ville");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "dd");
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(57, "div")(58, "dt");
    i0.ɵɵtext(59, "Date d'admission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "dd");
    i0.ɵɵtext(61);
    i0.ɵɵpipe(62, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(63, "div")(64, "dt");
    i0.ɵɵtext(65, "\u00C9tablissement precedent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "dd");
    i0.ɵɵtext(67);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(68, "section", 20)(69, "header", 23)(70, "h3", 47);
    i0.ɵɵtext(71, "Responsables legaux");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(72, "ul", 50);
    i0.ɵɵrepeaterCreate(73, StudentDetailComponent_Conditional_3_Conditional_0_Case_34_For_74_Template, 14, 8, "li", 51, _forTrack0, false, StudentDetailComponent_Conditional_3_Conditional_0_Case_34_ForEmpty_75_Template, 2, 0, "li", 52);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_8_0;
    let tmp_9_0;
    let tmp_15_0;
    const student_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(student_r4.studentNumber);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(student_r4.fullName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(student_r4.gender === "FEMALE" ? "F\u00E9minin" : student_r4.gender === "MALE" ? "Masculin" : "Autre");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(26, 13, student_r4.birthDate, "dd/MM/yyyy"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate((tmp_8_0 = student_r4.birthPlace) !== null && tmp_8_0 !== undefined ? tmp_8_0 : "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_9_0 = student_r4.nationality) !== null && tmp_9_0 !== undefined ? tmp_9_0 : "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(student_r4.phone || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(student_r4.email || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(student_r4.addressLine1 || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(student_r4.city || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(62, 16, student_r4.admissionDate, "dd/MM/yyyy"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate((tmp_15_0 = student_r4.previousSchool) !== null && tmp_15_0 !== undefined ? tmp_15_0 : "-");
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(student_r4.guardians);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 60);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 2);
    i0.ɵɵlistener("retry", function StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Conditional_6_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.loadHistory()); });
    i0.ɵɵelementEnd();
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Conditional_7_For_3_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 57);
    i0.ɵɵtext(1, "Redoublement");
    i0.ɵɵelementEnd();
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Conditional_7_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 62)(1, "h4");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "eduops-status-badge", 10);
    i0.ɵɵtemplate(9, StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Conditional_7_For_3_Conditional_9_Template, 2, 0, "span", 57);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const enrollment_r10 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", enrollment_r10.academicYearCode, " \u2014 ", enrollment_r10.classroomName, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", enrollment_r10.levelName, " \u00B7 ", enrollment_r10.enrollmentNumber, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Inscription le ", i0.ɵɵpipeBind2(7, 7, enrollment_r10.enrollmentDate, "dd/MM/yyyy"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("status", enrollment_r10.status);
    i0.ɵɵadvance();
    i0.ɵɵconditional(enrollment_r10.repeating ? 9 : -1);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Conditional_7_ForEmpty_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 52);
    i0.ɵɵtext(1, "Aucune inscription enregistr\u00E9e pour cet \u00E9l\u00E8ve.");
    i0.ɵɵelementEnd();
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 61);
    i0.ɵɵtext(1, "Les inscriptions de l\u2019\u00E9l\u00E8ve, de la plus r\u00E9cente \u00E0 la plus ancienne.");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(2, StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Conditional_7_For_3_Template, 10, 10, "article", 62, _forTrack0, false, StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Conditional_7_ForEmpty_4_Template, 2, 0, "p", 52);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.history());
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 20)(1, "header", 23)(2, "h3", 47);
    i0.ɵɵtext(3, "Parcours scolaire");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 59);
    i0.ɵɵtemplate(5, StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Conditional_5_Template, 1, 0, "eduops-loading-state", 60)(6, StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Conditional_6_Template, 1, 0, "eduops-error-state")(7, StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Conditional_7_Template, 5, 1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r1.historyLoading() ? 5 : ctx_r1.historyError() ? 6 : 7);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_36_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 63)(1, "div", 64)(2, "p", 65);
    i0.ɵɵtext(3, "Taux de pr\u00E9sence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 66);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 64)(7, "p", 65);
    i0.ɵɵtext(8, "Absences");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 66);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 64)(12, "p", 65);
    i0.ɵɵtext(13, "Absences non justifiees");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 66);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 64)(17, "p", 65);
    i0.ɵɵtext(18, "Retards");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p", 66);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const attendance_r11 = ctx;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", attendance_r11.attendanceRate, " %");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(attendance_r11.absenceCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(attendance_r11.unjustifiedAbsenceCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(attendance_r11.latenessCount);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, StudentDetailComponent_Conditional_3_Conditional_0_Case_36_Conditional_0_Template, 21, 4, "div", 63);
} if (rf & 2) {
    let tmp_4_0;
    const student_r4 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_4_0 = student_r4.attendanceSummary) ? 0 : -1, tmp_4_0);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_2_For_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 49);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 49);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 49);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵelement(16, "eduops-status-badge", 10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const fee_r12 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(fee_r12.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 6, fee_r12.amountDue));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 8, fee_r12.amountPaid));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 10, fee_r12.amountRemaining));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(14, 12, fee_r12.dueDate, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("status", fee_r12.status);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 63)(1, "div", 64)(2, "p", 65);
    i0.ɵɵtext(3, "Total du");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 68);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "money");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 64)(8, "p", 65);
    i0.ɵɵtext(9, "Total paye");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 69);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "money");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 64)(14, "p", 65);
    i0.ɵɵtext(15, "Reste a payer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p", 70);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "money");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 64)(20, "p", 65);
    i0.ɵɵtext(21, "Prochaine \u00E9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p", 71);
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "section", 67)(26, "header", 23)(27, "h3", 47);
    i0.ɵɵtext(28, "\u00C9ch\u00E9ancier");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 72)(30, "table", 73)(31, "thead")(32, "tr")(33, "th");
    i0.ɵɵtext(34, "Libell\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "th", 49);
    i0.ɵɵtext(36, "Montant du");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "th", 49);
    i0.ɵɵtext(38, "Paye");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "th", 49);
    i0.ɵɵtext(40, "Reste");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "th");
    i0.ɵɵtext(42, "\u00C9ch\u00E9ance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "th");
    i0.ɵɵtext(44, "Statut");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(45, "tbody");
    i0.ɵɵrepeaterCreate(46, StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_2_For_47_Template, 17, 15, "tr", null, _forTrack0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const finance_r13 = ctx;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 4, finance_r13.totalDue));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 6, finance_r13.totalPaid));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 8, finance_r13.outstandingAmount));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(24, 10, finance_r13.nextDueDate, "dd/MM/yyyy"));
    i0.ɵɵadvance(23);
    i0.ɵɵrepeater(finance_r13.fees);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 75);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 2);
    i0.ɵɵlistener("retry", function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_7_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.loadStatement()); });
    i0.ɵɵelementEnd();
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Conditional_0_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "money");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "money");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const balance_r16 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(balance_r16.yearLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 4, balance_r16.summary.totalDue, balance_r16.summary.currency));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 7, balance_r16.summary.totalPaid, balance_r16.summary.currency));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 10, balance_r16.summary.outstandingAmount, balance_r16.summary.currency));
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Conditional_0_ForEmpty_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 77);
    i0.ɵɵtext(2, "Aucun frais enregistr\u00E9.");
    i0.ɵɵelementEnd()();
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Conditional_0_For_38_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "br");
    i0.ɵɵelementStart(1, "small");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "money");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const payment_r17 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Non affect\u00E9 : ", i0.ɵɵpipeBind2(3, 1, payment_r17.unallocatedAmount, payment_r17.currency), "");
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Conditional_0_For_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelement(8, "br");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "statusLabel");
    i0.ɵɵelement(13, "br");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "money");
    i0.ɵɵtemplate(18, StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Conditional_0_For_38_Conditional_18_Template, 4, 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td");
    i0.ɵɵelement(20, "eduops-status-badge", 10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const payment_r17 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 9, payment_r17.paymentDate, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(payment_r17.yearLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(payment_r17.reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(payment_r17.receiptNumber || "Sans re\u00E7u");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 12, payment_r17.method));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(payment_r17.payerName || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(17, 14, payment_r17.amount, payment_r17.currency), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(payment_r17.status === "VALIDATED" && payment_r17.unallocatedAmount > 0 ? 18 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("status", payment_r17.status);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Conditional_0_ForEmpty_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 78);
    i0.ɵɵtext(2, "Aucun paiement enregistr\u00E9.");
    i0.ɵɵelementEnd()();
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72)(1, "table", 73)(2, "caption");
    i0.ɵɵtext(3, "Situation par ann\u00E9e scolaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "thead")(5, "tr")(6, "th");
    i0.ɵɵtext(7, "Ann\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Frais dus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "R\u00E9gl\u00E9 sur frais");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13, "Reste \u00E0 payer");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "tbody");
    i0.ɵɵrepeaterCreate(15, StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Conditional_0_For_16_Template, 12, 13, "tr", null, _forTrack1, false, StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Conditional_0_ForEmpty_17_Template, 3, 0, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "div", 72)(19, "table", 73)(20, "caption");
    i0.ɵɵtext(21, "Paiements enregistr\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "thead")(23, "tr")(24, "th");
    i0.ɵɵtext(25, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "th");
    i0.ɵɵtext(27, "Ann\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "th");
    i0.ɵɵtext(29, "R\u00E9f\u00E9rence / re\u00E7u");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "th");
    i0.ɵɵtext(31, "Mode / payeur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "th");
    i0.ɵɵtext(33, "Montant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "th");
    i0.ɵɵtext(35, "Statut");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(36, "tbody");
    i0.ɵɵrepeaterCreate(37, StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Conditional_0_For_38_Template, 21, 17, "tr", null, _forTrack0, false, StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Conditional_0_ForEmpty_39_Template, 3, 0, "tr");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(40, "p", 76);
    i0.ɵɵtext(41, "Les paiements en attente, annul\u00E9s, contre-pass\u00E9s ou \u00E9chou\u00E9s ne sont pas compt\u00E9s comme des r\u00E8glements valid\u00E9s.");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const statement_r18 = ctx;
    i0.ɵɵadvance(15);
    i0.ɵɵrepeater(statement_r18.balances);
    i0.ɵɵadvance(22);
    i0.ɵɵrepeater(statement_r18.payments);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Conditional_0_Template, 42, 2);
} if (rf & 2) {
    let tmp_6_0;
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵconditional((tmp_6_0 = ctx_r1.statement()) ? 0 : -1, tmp_6_0);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 67)(1, "header", 23)(2, "h3", 47);
    i0.ɵɵtext(3, "Historique financier \u2014 toutes ann\u00E9es");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 74);
    i0.ɵɵlistener("click", function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.loadStatement()); });
    i0.ɵɵtext(5, "Actualiser");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_6_Template, 1, 0, "eduops-loading-state", 75)(7, StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_7_Template, 1, 0, "eduops-error-state")(8, StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Conditional_8_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.statementLoading());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.statementLoading() ? 6 : ctx_r1.statementError() ? 7 : 8);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 61);
    i0.ɵɵtext(1, "\u00C9ch\u00E9ancier et totaux de l\u2019ann\u00E9e scolaire active.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_2_Template, 48, 13)(3, StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Conditional_3_Template, 9, 2, "section", 67);
} if (rf & 2) {
    let tmp_4_0;
    const student_r4 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_4_0 = student_r4.financialSummary) ? 2 : -1, tmp_4_0);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.canStatement() ? 3 : -1);
} }
function StudentDetailComponent_Conditional_3_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 3);
    i0.ɵɵelement(1, "eduops-avatar", 4);
    i0.ɵɵelementStart(2, "div", 5)(3, "h1", 6);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 7);
    i0.ɵɵtext(6);
    i0.ɵɵelementStart(7, "span", 8);
    i0.ɵɵtext(8, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9);
    i0.ɵɵelementStart(10, "span", 8);
    i0.ɵɵtext(11, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12);
    i0.ɵɵtemplate(13, StudentDetailComponent_Conditional_3_Conditional_0_Conditional_13_Template, 3, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 9);
    i0.ɵɵelement(15, "eduops-status-badge", 10);
    i0.ɵɵtemplate(16, StudentDetailComponent_Conditional_3_Conditional_0_Conditional_16_Template, 1, 1, "eduops-status-badge", 10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 11)(18, "a", 12);
    i0.ɵɵtext(19, "Retour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "a", 13);
    i0.ɵɵtext(21, "Certificat de scolarit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(22, StudentDetailComponent_Conditional_3_Conditional_0_Conditional_22_Template, 2, 2, "button", 14)(23, StudentDetailComponent_Conditional_3_Conditional_0_Conditional_23_Template, 2, 1, "button", 15);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(24, StudentDetailComponent_Conditional_3_Conditional_0_Conditional_24_Template, 55, 5, "section", 16);
    i0.ɵɵelementStart(25, "nav", 17)(26, "button", 18);
    i0.ɵɵlistener("click", function StudentDetailComponent_Conditional_3_Conditional_0_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.activeTab.set("identity")); });
    i0.ɵɵtext(27, "Identit\u00E9 & responsables");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "button", 18);
    i0.ɵɵlistener("click", function StudentDetailComponent_Conditional_3_Conditional_0_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openAcademic()); });
    i0.ɵɵtext(29, "Scolarit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 18);
    i0.ɵɵlistener("click", function StudentDetailComponent_Conditional_3_Conditional_0_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.activeTab.set("attendance")); });
    i0.ɵɵtext(31, "Pr\u00E9sences");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "button", 18);
    i0.ɵɵlistener("click", function StudentDetailComponent_Conditional_3_Conditional_0_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openFinance()); });
    i0.ɵɵtext(33, "Situation financi\u00E8re");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(34, StudentDetailComponent_Conditional_3_Conditional_0_Case_34_Template, 76, 19, "div", 19)(35, StudentDetailComponent_Conditional_3_Conditional_0_Case_35_Template, 8, 1, "section", 20)(36, StudentDetailComponent_Conditional_3_Conditional_0_Case_36_Template, 1, 1)(37, StudentDetailComponent_Conditional_3_Conditional_0_Case_37_Template, 4, 2);
} if (rf & 2) {
    let tmp_11_0;
    let tmp_24_0;
    const student_r4 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", student_r4.fullName)("photoUrl", student_r4.photoUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(student_r4.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", student_r4.studentNumber, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", student_r4.classroomName, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", student_r4.levelName, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(student_r4.age ? 13 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("status", student_r4.status);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_11_0 = student_r4.financialSummary) ? 16 : -1, tmp_11_0);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction1(26, _c0, student_r4.id));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.canStatement() ? 22 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.canEdit() ? 23 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.editing() ? 24 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("tabs__tab--active", ctx_r1.activeTab() === "identity");
    i0.ɵɵattribute("aria-selected", ctx_r1.activeTab() === "identity");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("tabs__tab--active", ctx_r1.activeTab() === "academic");
    i0.ɵɵattribute("aria-selected", ctx_r1.activeTab() === "academic");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("tabs__tab--active", ctx_r1.activeTab() === "attendance");
    i0.ɵɵattribute("aria-selected", ctx_r1.activeTab() === "attendance");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("tabs__tab--active", ctx_r1.activeTab() === "finance");
    i0.ɵɵattribute("aria-selected", ctx_r1.activeTab() === "finance");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_24_0 = ctx_r1.activeTab()) === "identity" ? 34 : tmp_24_0 === "academic" ? 35 : tmp_24_0 === "attendance" ? 36 : tmp_24_0 === "finance" ? 37 : -1);
} }
function StudentDetailComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, StudentDetailComponent_Conditional_3_Conditional_0_Template, 38, 28);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.student()) ? 0 : -1, tmp_1_0);
} }
/**
 * Student file. Answers, in one screen, the questions of section 97:
 * who is this pupil, which class, which guardians, what attendance,
 * what marks, what is still owed.
 */
export class StudentDetailComponent {
    /** Bound from the route parameter via withComponentInputBinding(). */
    id;
    dataSource = inject(STUDENT_DATA_SOURCE);
    destroyRef = inject(DestroyRef);
    auth = inject(AuthService);
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    notifications = inject(NotificationService);
    statements = inject(StudentStatementService);
    canEdit = computed(() => this.auth.has(PERMISSIONS.STUDENT_UPDATE));
    canStatement = computed(() => this.auth.has(PERMISSIONS.FINANCE_VIEW) && this.auth.has(PERMISSIONS.PAYMENT_VIEW));
    editing = signal(false);
    saving = signal(false);
    printing = signal(false);
    statement = signal(null);
    statementLoading = signal(false);
    statementError = signal(false);
    maxBirthDate = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    editForm = this.fb.nonNullable.group({
        firstName: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(80)]],
        lastName: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(80)]],
        middleName: ['', Validators.maxLength(80)],
        gender: ['MALE', Validators.required],
        birthDate: ['', [Validators.required, (control) => control.value && control.value > this.maxBirthDate ? { past: true } : null]],
        birthPlace: ['', Validators.maxLength(120)], nationality: ['', Validators.maxLength(80)],
        email: ['', [Validators.email, Validators.maxLength(160)]], phone: ['', Validators.maxLength(40)],
        address: ['', Validators.maxLength(200)], city: ['', Validators.maxLength(120)],
        previousSchool: ['', Validators.maxLength(160)]
    });
    openEdit() {
        const student = this.student();
        if (!student || !this.canEdit())
            return;
        this.editForm.reset({ firstName: student.firstName, lastName: student.lastName,
            middleName: student.middleName ?? '', gender: student.gender, birthDate: student.birthDate,
            birthPlace: student.birthPlace ?? '', nationality: student.nationality ?? '',
            email: student.email ?? '', phone: student.phone ?? '', address: student.addressLine1 ?? '',
            city: student.city ?? '', previousSchool: student.previousSchool ?? '' });
        this.editing.set(true);
    }
    canLeave() {
        return !this.saving() && (!this.editing() || !this.editForm.dirty
            || window.confirm('Abandonner les modifications non enregistrées ?'));
    }
    cancelEdit() { if (this.canLeave())
        this.editing.set(false); }
    save() {
        if (!this.canEdit() || this.saving())
            return;
        if (this.editForm.invalid) {
            this.editForm.markAllAsTouched();
            return;
        }
        const value = this.editForm.getRawValue();
        this.saving.set(true);
        this.dataSource.update(this.id, { ...value, version: this.student()?.version,
            firstName: value.firstName.trim(), lastName: value.lastName.trim(), email: value.email.trim()
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: student => {
                this.student.set(student);
                this.saving.set(false);
                this.editing.set(false);
                this.editForm.markAsPristine();
                this.statement.set(null);
                this.notifications.success('Les informations de l’élève ont été mises à jour.');
            }, error: err => {
                this.saving.set(false);
                this.notifications.error(translateErrorCode(err?.error?.code ?? 'INTERNAL_ERROR'));
            }
        });
    }
    openFinance() {
        this.activeTab.set('finance');
        if (this.canStatement() && !this.statement() && !this.statementLoading())
            this.loadStatement();
    }
    loadStatement() {
        if (!this.canStatement())
            return;
        this.statementLoading.set(true);
        this.statementError.set(false);
        this.statements.get(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: value => { this.statement.set(value); this.statementLoading.set(false); },
            error: () => { this.statementError.set(true); this.statementLoading.set(false); }
        });
    }
    printStatement() {
        if (!this.canStatement() || this.printing() || this.editing())
            return;
        const preview = window.open('', '_blank');
        if (!preview) {
            this.notifications.error('Autorisez les fenêtres contextuelles pour imprimer la fiche.');
            return;
        }
        preview.document.body.textContent = 'Préparation de la fiche de l’élève…';
        this.printing.set(true);
        this.statements.get(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: value => {
                this.printing.set(false);
                this.statement.set(value);
                if (preview.closed)
                    return;
                renderStudentStatement(preview.document, value);
                preview.focus();
                preview.setTimeout(() => { if (!preview.closed)
                    preview.print(); }, 200);
            }, error: () => {
                this.printing.set(false);
                preview.close();
                this.notifications.error('Impossible de préparer la fiche complète. Réessayez.');
            }
        });
    }
    student = signal(null);
    loading = signal(true);
    error = signal(false);
    history = signal([]);
    historyLoading = signal(false);
    historyError = signal(false);
    historyLoaded = false;
    openAcademic() {
        this.activeTab.set('academic');
        if (!this.historyLoaded && !this.historyLoading())
            this.loadHistory();
    }
    loadHistory() {
        this.historyLoading.set(true);
        this.historyError.set(false);
        this.dataSource.getEnrollments(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: rows => {
                this.history.set(rows);
                this.historyLoaded = true;
                this.historyLoading.set(false);
            },
            error: () => {
                this.historyError.set(true);
                this.historyLoading.set(false);
            }
        });
    }
    activeTab = signal('identity');
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.getById(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (student) => {
                this.student.set(student);
                this.loading.set(false);
                if (this.route.snapshot.queryParamMap.get('edit') === 'true')
                    this.openEdit();
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    static ɵfac = function StudentDetailComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StudentDetailComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StudentDetailComponent, selectors: [["eduops-student-detail"]], inputs: { id: "id" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 4, vars: 1, consts: [[1, "page"], ["message", "Chargement de la fiche \u00E9l\u00E8ve..."], [3, "retry"], [1, "profile"], ["size", "xl", 3, "name", "photoUrl"], [1, "profile__identity"], [1, "profile__name"], [1, "profile__meta", "numeric"], [1, "dot"], [1, "profile__badges"], [3, "status"], [1, "profile__actions"], ["routerLink", "/students", 1, "btn", "btn--secondary"], ["routerLink", "/student-files", 1, "btn", "btn--secondary", 3, "queryParams"], ["type", "button", 1, "btn", "btn--secondary", 3, "disabled"], ["type", "button", 1, "btn", "btn--primary", 3, "disabled"], ["aria-labelledby", "edit-title", 1, "card", "edit-card"], ["role", "tablist", "aria-label", "Sections de la fiche", 1, "tabs"], ["type", "button", "role", "tab", 1, "tabs__tab", 3, "click"], [1, "grid", "grid--2"], [1, "card"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [1, "card__header"], ["id", "edit-title", 1, "card__title"], [1, "card__body", 3, "ngSubmit", "formGroup"], [3, "disabled"], [1, "edit-grid"], ["formControlName", "lastName", "maxlength", "80", 1, "input"], ["formControlName", "firstName", "maxlength", "80", 1, "input"], ["formControlName", "middleName", "maxlength", "80", 1, "input"], ["formControlName", "gender", 1, "select"], ["value", "FEMALE"], ["value", "MALE"], ["value", "OTHER"], ["type", "date", "formControlName", "birthDate", 1, "input", 3, "max"], ["formControlName", "birthPlace", "maxlength", "120", 1, "input"], ["formControlName", "nationality", "maxlength", "80", 1, "input"], ["type", "tel", "formControlName", "phone", "maxlength", "40", 1, "input"], ["type", "email", "formControlName", "email", "maxlength", "160", 1, "input"], ["formControlName", "address", "maxlength", "200", 1, "input"], ["formControlName", "city", "maxlength", "120", 1, "input"], ["formControlName", "previousSchool", "maxlength", "160", 1, "input"], ["role", "alert", 1, "edit-error"], [1, "edit-actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "submit", 1, "btn", "btn--primary"], [1, "card__title"], [1, "definition", "card__body"], [1, "numeric"], [1, "guardians", "card__body"], [1, "guardian"], [1, "empty"], ["size", "md", 3, "name"], [1, "guardian__body"], [1, "guardian__name"], [1, "badge", "badge--info"], [1, "badge", "badge--warning"], [1, "guardian__meta"], [1, "card__body"], ["message", "Chargement du parcours scolaire\u2026"], [1, "muted"], [1, "card", 2, "margin-bottom", "16px", "padding", "16px"], [1, "grid", "grid--kpi"], [1, "stat", "card"], [1, "stat__label"], [1, "stat__value", "numeric"], [1, "card", 2, "margin-top", "var(--space-6)"], [1, "stat__value", "money"], [1, "stat__value", "money", "stat__value--success"], [1, "stat__value", "money", "stat__value--danger"], [1, "stat__value"], [1, "table-wrapper"], [1, "table"], [1, "btn", "btn--secondary", "btn--sm", 3, "click", "disabled"], ["message", "Chargement des paiements\u2026"], [1, "card__body", "muted"], ["colspan", "4"], ["colspan", "6"]], template: function StudentDetailComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, StudentDetailComponent_Conditional_1_Template, 1, 0, "eduops-loading-state", 1)(2, StudentDetailComponent_Conditional_2_Template, 1, 0, "eduops-error-state")(3, StudentDetailComponent_Conditional_3_Template, 1, 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 1 : ctx.error() ? 2 : 3);
        } }, dependencies: [CommonModule, i1.DatePipe, RouterLink, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MaxLengthValidator, i2.FormGroupDirective, i2.FormControlName, AvatarComponent, StatusBadgeComponent,
            LoadingStateComponent, ErrorStateComponent, MoneyPipe, StatusLabelPipe], styles: ["@import 'styles/tokens';\n\n.profile[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-5);\n  padding: var(--space-6);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  margin-bottom: var(--space-5);\n  flex-wrap: wrap;\n}\n\n.profile__identity[_ngcontent-%COMP%] { flex: 1; min-width: 240px; }\n.profile__name[_ngcontent-%COMP%] { font-size: var(--text-2xl); margin: 0; }\n.profile__meta[_ngcontent-%COMP%] { margin: var(--space-1) 0 var(--space-3); color: var(--text-muted); font-size: var(--text-sm); }\n.profile__badges[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); flex-wrap: wrap; }\n.profile__actions[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); flex-wrap: wrap; }\n\n.dot[_ngcontent-%COMP%] { margin: 0 var(--space-2); color: var(--text-light); }\n\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--space-1);\n  border-bottom: 1px solid var(--border);\n  margin-bottom: var(--space-5);\n  overflow-x: auto;\n}\n\n.tabs__tab[_ngcontent-%COMP%] {\n  background: none;\n  border: 0;\n  border-bottom: 2px solid transparent;\n  padding: var(--space-3) var(--space-4);\n  font: inherit;\n  font-weight: 600;\n  color: var(--text-muted);\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.tabs__tab--active[_ngcontent-%COMP%] { color: var(--brand); border-bottom-color: var(--brand); }\n\n.definition[_ngcontent-%COMP%] { display: grid; gap: var(--space-3); }\n.definition[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { display: flex; justify-content: space-between; gap: var(--space-4); }\n.definition[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] { color: var(--text-muted); font-size: var(--text-sm); margin: 0; }\n.definition[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] { margin: 0; font-weight: 600; color: var(--text-strong); text-align: right; }\n\n.guardians[_ngcontent-%COMP%] { list-style: none; display: grid; gap: var(--space-4); }\n.guardian[_ngcontent-%COMP%] { display: flex; gap: var(--space-3); align-items: center; }\n.guardian__body[_ngcontent-%COMP%] { flex: 1; }\n.guardian__name[_ngcontent-%COMP%] {\n  margin: 0; font-weight: 600; color: var(--text-strong);\n  display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap;\n}\n.guardian__meta[_ngcontent-%COMP%] { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n.stat[_ngcontent-%COMP%] { padding: var(--space-5); }\n.stat__label[_ngcontent-%COMP%] { margin: 0 0 var(--space-2); font-size: var(--text-sm); color: var(--text-muted); font-weight: 600; }\n.stat__value[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: var(--text-xl);\n  font-weight: 700;\n  color: var(--text-strong);\n}\n.stat__value--success[_ngcontent-%COMP%] { color: var(--success); }\n.stat__value--danger[_ngcontent-%COMP%] { color: var(--danger); }\n\n.muted[_ngcontent-%COMP%] { color: var(--text-muted); }\n.empty[_ngcontent-%COMP%] { color: var(--text-muted); text-align: center; padding: var(--space-6) 0; }\ncode[_ngcontent-%COMP%] { font-family: ui-monospace, monospace; background: var(--surface-sunken); padding: 2px 6px; border-radius: 4px; }\n\n@include mobile {\n  .profile { flex-direction: column; align-items: flex-start; text-align: left; }\n}\n.edit-card[_ngcontent-%COMP%] { margin-bottom: var(--space-6); }\n.edit-card[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%] { border: 0; padding: 0; margin: 0; min-width: 0; }\n.edit-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-4); }\n.edit-grid[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-2); font-size: var(--text-sm); }\n.edit-actions[_ngcontent-%COMP%] { display: flex; gap: var(--space-3); justify-content: flex-end; margin-top: var(--space-5); }\n.edit-error[_ngcontent-%COMP%] { color: var(--danger); }\n.edit-grid[_ngcontent-%COMP%]   .ng-invalid.ng-touched[_ngcontent-%COMP%] { border-color: var(--danger); }\n@media (max-width: 800px) { .edit-grid[_ngcontent-%COMP%] { grid-template-columns: repeat(2, minmax(0, 1fr)); } }\n@media (max-width: 480px) { .edit-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StudentDetailComponent, [{
        type: Component,
        args: [{ selector: 'eduops-student-detail', standalone: true, imports: [
                    CommonModule, RouterLink, ReactiveFormsModule, AvatarComponent, StatusBadgeComponent,
                    LoadingStateComponent, ErrorStateComponent, MoneyPipe, StatusLabelPipe
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement de la fiche \u00E9l\u00E8ve...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n    @if (student(); as student) {\n\n    <header class=\"profile\">\n      <eduops-avatar [name]=\"student.fullName\" [photoUrl]=\"student.photoUrl\" size=\"xl\" />\n      <div class=\"profile__identity\">\n        <h1 class=\"profile__name\">{{ student.fullName }}</h1>\n        <p class=\"profile__meta numeric\">\n          {{ student.studentNumber }}\n          <span class=\"dot\">\u2022</span>{{ student.classroomName }}\n          <span class=\"dot\">\u2022</span>{{ student.levelName }}\n          @if (student.age) { <span class=\"dot\">\u2022</span>{{ student.age }} ans }\n        </p>\n        <div class=\"profile__badges\">\n          <eduops-status-badge [status]=\"student.status\" />\n          @if (student.financialSummary; as finance) {\n            <eduops-status-badge [status]=\"finance.globalStatus\" />\n          }\n        </div>\n      </div>\n      <div class=\"profile__actions\">\n        <a class=\"btn btn--secondary\" routerLink=\"/students\">Retour</a>\n        <a class=\"btn btn--secondary\" routerLink=\"/student-files\"\n           [queryParams]=\"{ studentId: student.id, type: 'SCHOOL_CERTIFICATE' }\">Certificat de scolarit\u00E9</a>\n        @if (canStatement()) {\n          <button type=\"button\" class=\"btn btn--secondary\" [disabled]=\"printing() || editing()\"\n                  (click)=\"printStatement()\">{{ printing() ? 'Pr\u00E9paration\u2026' : 'Imprimer la fiche / paiements' }}</button>\n        }\n        @if (canEdit()) {\n          <button type=\"button\" class=\"btn btn--primary\" [disabled]=\"editing()\" (click)=\"openEdit()\">Modifier</button>\n        }\n      </div>\n    </header>\n\n    @if (editing()) {\n      <section class=\"card edit-card\" aria-labelledby=\"edit-title\">\n        <header class=\"card__header\"><h2 id=\"edit-title\" class=\"card__title\">Modifier les informations de l\u2019\u00E9l\u00E8ve</h2></header>\n        <form class=\"card__body\" [formGroup]=\"editForm\" (ngSubmit)=\"save()\">\n          <fieldset [disabled]=\"saving()\">\n            <div class=\"edit-grid\">\n              <label>Nom *<input class=\"input\" formControlName=\"lastName\" maxlength=\"80\" /></label>\n              <label>Pr\u00E9nom *<input class=\"input\" formControlName=\"firstName\" maxlength=\"80\" /></label>\n              <label>Autres pr\u00E9noms<input class=\"input\" formControlName=\"middleName\" maxlength=\"80\" /></label>\n              <label>Sexe *<select class=\"select\" formControlName=\"gender\"><option value=\"FEMALE\">F\u00E9minin</option><option value=\"MALE\">Masculin</option><option value=\"OTHER\">Autre</option></select></label>\n              <label>Date de naissance *<input class=\"input\" type=\"date\" formControlName=\"birthDate\" [max]=\"maxBirthDate\" /></label>\n              <label>Lieu de naissance<input class=\"input\" formControlName=\"birthPlace\" maxlength=\"120\" /></label>\n              <label>Nationalit\u00E9<input class=\"input\" formControlName=\"nationality\" maxlength=\"80\" /></label>\n              <label>T\u00E9l\u00E9phone<input class=\"input\" type=\"tel\" formControlName=\"phone\" maxlength=\"40\" /></label>\n              <label>Courriel<input class=\"input\" type=\"email\" formControlName=\"email\" maxlength=\"160\" /></label>\n              <label>Adresse<input class=\"input\" formControlName=\"address\" maxlength=\"200\" /></label>\n              <label>Ville<input class=\"input\" formControlName=\"city\" maxlength=\"120\" /></label>\n              <label>\u00C9tablissement pr\u00E9c\u00E9dent<input class=\"input\" formControlName=\"previousSchool\" maxlength=\"160\" /></label>\n            </div>\n            @if (editForm.invalid && editForm.touched) {\n              <p class=\"edit-error\" role=\"alert\">V\u00E9rifiez les champs obligatoires, la date de naissance (ant\u00E9rieure \u00E0 aujourd\u2019hui) et le format du courriel.</p>\n            }\n            <div class=\"edit-actions\"><button type=\"button\" class=\"btn btn--secondary\" (click)=\"cancelEdit()\">Annuler</button>\n              <button type=\"submit\" class=\"btn btn--primary\">{{ saving() ? 'Enregistrement\u2026' : 'Enregistrer les modifications' }}</button></div>\n          </fieldset>\n        </form>\n      </section>\n    }\n\n    <nav class=\"tabs\" role=\"tablist\" aria-label=\"Sections de la fiche\">\n      <button type=\"button\" role=\"tab\" class=\"tabs__tab\"\n              [class.tabs__tab--active]=\"activeTab() === 'identity'\"\n              [attr.aria-selected]=\"activeTab() === 'identity'\"\n              (click)=\"activeTab.set('identity')\">Identit\u00E9 &amp; responsables</button>\n      <button type=\"button\" role=\"tab\" class=\"tabs__tab\"\n              [class.tabs__tab--active]=\"activeTab() === 'academic'\"\n              [attr.aria-selected]=\"activeTab() === 'academic'\"\n              (click)=\"openAcademic()\">Scolarit\u00E9</button>\n      <button type=\"button\" role=\"tab\" class=\"tabs__tab\"\n              [class.tabs__tab--active]=\"activeTab() === 'attendance'\"\n              [attr.aria-selected]=\"activeTab() === 'attendance'\"\n              (click)=\"activeTab.set('attendance')\">Pr\u00E9sences</button>\n      <button type=\"button\" role=\"tab\" class=\"tabs__tab\"\n              [class.tabs__tab--active]=\"activeTab() === 'finance'\"\n              [attr.aria-selected]=\"activeTab() === 'finance'\"\n              (click)=\"openFinance()\">Situation financi\u00E8re</button>\n    </nav>\n\n    @switch (activeTab()) {\n      @case ('identity') {\n        <div class=\"grid grid--2\">\n          <section class=\"card\">\n            <header class=\"card__header\"><h3 class=\"card__title\">\u00C9tat civil</h3></header>\n            <dl class=\"definition card__body\">\n              <div><dt>Matricule</dt><dd class=\"numeric\">{{ student.studentNumber }}</dd></div>\n              <div><dt>Nom complet</dt><dd>{{ student.fullName }}</dd></div>\n              <div><dt>Sexe</dt><dd>{{ student.gender === 'FEMALE' ? 'F\u00E9minin' : student.gender === 'MALE' ? 'Masculin' : 'Autre' }}</dd></div>\n              <div><dt>Date de naissance</dt><dd>{{ student.birthDate | date:'dd/MM/yyyy' }}</dd></div>\n              <div><dt>Lieu de naissance</dt><dd>{{ student.birthPlace ?? '-' }}</dd></div>\n              <div><dt>Nationalite</dt><dd>{{ student.nationality ?? '-' }}</dd></div>\n              <div><dt>T\u00E9l\u00E9phone</dt><dd>{{ student.phone || '\u2014' }}</dd></div>\n              <div><dt>Courriel</dt><dd>{{ student.email || '\u2014' }}</dd></div>\n              <div><dt>Adresse</dt><dd>{{ student.addressLine1 || '\u2014' }}</dd></div>\n              <div><dt>Ville</dt><dd>{{ student.city || '\u2014' }}</dd></div>\n              <div><dt>Date d'admission</dt><dd>{{ student.admissionDate | date:'dd/MM/yyyy' }}</dd></div>\n              <div><dt>\u00C9tablissement precedent</dt><dd>{{ student.previousSchool ?? '-' }}</dd></div>\n            </dl>\n          </section>\n\n          <section class=\"card\">\n            <header class=\"card__header\">\n              <h3 class=\"card__title\">Responsables legaux</h3>\n            </header>\n            <ul class=\"guardians card__body\">\n              @for (guardian of student.guardians; track guardian.id) {\n                <li class=\"guardian\">\n                  <eduops-avatar [name]=\"guardian.fullName\" size=\"md\" />\n                  <div class=\"guardian__body\">\n                    <p class=\"guardian__name\">\n                      {{ guardian.fullName }}\n                      @if (guardian.primary) { <span class=\"badge badge--info\">Principal</span> }\n                      @if (guardian.financialResponsibility) {\n                        <span class=\"badge badge--warning\">Responsable financier</span>\n                      }\n                    </p>\n                    <p class=\"guardian__meta\">\n                      {{ guardian.relationship | statusLabel }}\n                      <span class=\"dot\">\u2022</span><span class=\"numeric\">{{ guardian.phone }}</span>\n                    </p>\n                  </div>\n                </li>\n              } @empty {\n                <li class=\"empty\">Aucun responsable enregistr\u00E9.</li>\n              }\n            </ul>\n          </section>\n        </div>\n      }\n\n      @case ('academic') {\n        <section class=\"card\">\n          <header class=\"card__header\"><h3 class=\"card__title\">Parcours scolaire</h3></header>\n          <div class=\"card__body\">\n            @if (historyLoading()) {\n              <eduops-loading-state message=\"Chargement du parcours scolaire\u2026\" />\n            } @else if (historyError()) {\n              <eduops-error-state (retry)=\"loadHistory()\" />\n            } @else {\n              <p class=\"muted\">Les inscriptions de l\u2019\u00E9l\u00E8ve, de la plus r\u00E9cente \u00E0 la plus ancienne.</p>\n              @for (enrollment of history(); track enrollment.id) {\n                <article class=\"card\" style=\"margin-bottom: 16px; padding: 16px\">\n                  <h4>{{ enrollment.academicYearCode }} \u2014 {{ enrollment.classroomName }}</h4>\n                  <p>{{ enrollment.levelName }} \u00B7 {{ enrollment.enrollmentNumber }}</p>\n                  <p>Inscription le {{ enrollment.enrollmentDate | date:'dd/MM/yyyy' }}</p>\n                  <eduops-status-badge [status]=\"enrollment.status\" />\n                  @if (enrollment.repeating) { <span class=\"badge badge--warning\">Redoublement</span> }\n                </article>\n              } @empty {\n                <p class=\"empty\">Aucune inscription enregistr\u00E9e pour cet \u00E9l\u00E8ve.</p>\n              }\n            }\n          </div>\n        </section>\n      }\n\n      @case ('attendance') {\n        @if (student.attendanceSummary; as attendance) {\n          <div class=\"grid grid--kpi\">\n            <div class=\"stat card\"><p class=\"stat__label\">Taux de pr\u00E9sence</p>\n              <p class=\"stat__value numeric\">{{ attendance.attendanceRate }} %</p></div>\n            <div class=\"stat card\"><p class=\"stat__label\">Absences</p>\n              <p class=\"stat__value numeric\">{{ attendance.absenceCount }}</p></div>\n            <div class=\"stat card\"><p class=\"stat__label\">Absences non justifiees</p>\n              <p class=\"stat__value numeric\">{{ attendance.unjustifiedAbsenceCount }}</p></div>\n            <div class=\"stat card\"><p class=\"stat__label\">Retards</p>\n              <p class=\"stat__value numeric\">{{ attendance.latenessCount }}</p></div>\n          </div>\n        }\n      }\n\n      @case ('finance') {\n        <p class=\"muted\">\u00C9ch\u00E9ancier et totaux de l\u2019ann\u00E9e scolaire active.</p>\n        @if (student.financialSummary; as finance) {\n          <div class=\"grid grid--kpi\">\n            <div class=\"stat card\"><p class=\"stat__label\">Total du</p>\n              <p class=\"stat__value money\">{{ finance.totalDue | money }}</p></div>\n            <div class=\"stat card\"><p class=\"stat__label\">Total paye</p>\n              <p class=\"stat__value money stat__value--success\">{{ finance.totalPaid | money }}</p></div>\n            <div class=\"stat card\"><p class=\"stat__label\">Reste a payer</p>\n              <p class=\"stat__value money stat__value--danger\">{{ finance.outstandingAmount | money }}</p></div>\n            <div class=\"stat card\"><p class=\"stat__label\">Prochaine \u00E9ch\u00E9ance</p>\n              <p class=\"stat__value\">{{ finance.nextDueDate | date:'dd/MM/yyyy' }}</p></div>\n          </div>\n\n          <section class=\"card\" style=\"margin-top: var(--space-6)\">\n            <header class=\"card__header\"><h3 class=\"card__title\">\u00C9ch\u00E9ancier</h3></header>\n            <div class=\"table-wrapper\">\n              <table class=\"table\">\n                <thead>\n                  <tr>\n                    <th>Libell\u00E9</th><th class=\"numeric\">Montant du</th>\n                    <th class=\"numeric\">Paye</th><th class=\"numeric\">Reste</th>\n                    <th>\u00C9ch\u00E9ance</th><th>Statut</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  @for (fee of finance.fees; track fee.id) {\n                    <tr>\n                      <td>{{ fee.label }}</td>\n                      <td class=\"numeric\">{{ fee.amountDue | money }}</td>\n                      <td class=\"numeric\">{{ fee.amountPaid | money }}</td>\n                      <td class=\"numeric\">{{ fee.amountRemaining | money }}</td>\n                      <td>{{ fee.dueDate | date:'dd/MM/yyyy' }}</td>\n                      <td><eduops-status-badge [status]=\"fee.status\" /></td>\n                    </tr>\n                  }\n                </tbody>\n              </table>\n            </div>\n          </section>\n        }\n        @if (canStatement()) {\n          <section class=\"card\" style=\"margin-top: var(--space-6)\">\n            <header class=\"card__header\"><h3 class=\"card__title\">Historique financier \u2014 toutes ann\u00E9es</h3>\n              <button class=\"btn btn--secondary btn--sm\" (click)=\"loadStatement()\" [disabled]=\"statementLoading()\">Actualiser</button></header>\n            @if (statementLoading()) { <eduops-loading-state message=\"Chargement des paiements\u2026\" /> }\n            @else if (statementError()) { <eduops-error-state (retry)=\"loadStatement()\" /> }\n            @else {\n              @if (statement(); as statement) {\n                <div class=\"table-wrapper\"><table class=\"table\"><caption>Situation par ann\u00E9e scolaire</caption>\n                  <thead><tr><th>Ann\u00E9e</th><th>Frais dus</th><th>R\u00E9gl\u00E9 sur frais</th><th>Reste \u00E0 payer</th></tr></thead><tbody>\n                  @for (balance of statement.balances; track balance.academicYearId) {\n                    <tr><td>{{ balance.yearLabel }}</td><td>{{ balance.summary.totalDue | money:balance.summary.currency }}</td>\n                      <td>{{ balance.summary.totalPaid | money:balance.summary.currency }}</td><td>{{ balance.summary.outstandingAmount | money:balance.summary.currency }}</td></tr>\n                  } @empty { <tr><td colspan=\"4\">Aucun frais enregistr\u00E9.</td></tr> }\n                  </tbody></table></div>\n                <div class=\"table-wrapper\"><table class=\"table\"><caption>Paiements enregistr\u00E9s</caption>\n                  <thead><tr><th>Date</th><th>Ann\u00E9e</th><th>R\u00E9f\u00E9rence / re\u00E7u</th><th>Mode / payeur</th><th>Montant</th><th>Statut</th></tr></thead><tbody>\n                  @for (payment of statement.payments; track payment.id) {\n                    <tr><td>{{ payment.paymentDate | date:'dd/MM/yyyy' }}</td><td>{{ payment.yearLabel }}</td>\n                      <td>{{ payment.reference }}<br />{{ payment.receiptNumber || 'Sans re\u00E7u' }}</td>\n                      <td>{{ payment.method | statusLabel }}<br />{{ payment.payerName || '\u2014' }}</td>\n                      <td>{{ payment.amount | money:payment.currency }}\n                        @if (payment.status === 'VALIDATED' && payment.unallocatedAmount > 0) { <br /><small>Non affect\u00E9 : {{ payment.unallocatedAmount | money:payment.currency }}</small> }\n                      </td><td><eduops-status-badge [status]=\"payment.status\" /></td></tr>\n                  } @empty { <tr><td colspan=\"6\">Aucun paiement enregistr\u00E9.</td></tr> }\n                  </tbody></table></div>\n                <p class=\"card__body muted\">Les paiements en attente, annul\u00E9s, contre-pass\u00E9s ou \u00E9chou\u00E9s ne sont pas compt\u00E9s comme des r\u00E8glements valid\u00E9s.</p>\n              }\n            }\n          </section>\n        }\n      }\n    }\n    }\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n.profile {\n  display: flex;\n  align-items: center;\n  gap: var(--space-5);\n  padding: var(--space-6);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  margin-bottom: var(--space-5);\n  flex-wrap: wrap;\n}\n\n.profile__identity { flex: 1; min-width: 240px; }\n.profile__name { font-size: var(--text-2xl); margin: 0; }\n.profile__meta { margin: var(--space-1) 0 var(--space-3); color: var(--text-muted); font-size: var(--text-sm); }\n.profile__badges { display: flex; gap: var(--space-2); flex-wrap: wrap; }\n.profile__actions { display: flex; gap: var(--space-2); flex-wrap: wrap; }\n\n.dot { margin: 0 var(--space-2); color: var(--text-light); }\n\n.tabs {\n  display: flex;\n  gap: var(--space-1);\n  border-bottom: 1px solid var(--border);\n  margin-bottom: var(--space-5);\n  overflow-x: auto;\n}\n\n.tabs__tab {\n  background: none;\n  border: 0;\n  border-bottom: 2px solid transparent;\n  padding: var(--space-3) var(--space-4);\n  font: inherit;\n  font-weight: 600;\n  color: var(--text-muted);\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.tabs__tab--active { color: var(--brand); border-bottom-color: var(--brand); }\n\n.definition { display: grid; gap: var(--space-3); }\n.definition > div { display: flex; justify-content: space-between; gap: var(--space-4); }\n.definition dt { color: var(--text-muted); font-size: var(--text-sm); margin: 0; }\n.definition dd { margin: 0; font-weight: 600; color: var(--text-strong); text-align: right; }\n\n.guardians { list-style: none; display: grid; gap: var(--space-4); }\n.guardian { display: flex; gap: var(--space-3); align-items: center; }\n.guardian__body { flex: 1; }\n.guardian__name {\n  margin: 0; font-weight: 600; color: var(--text-strong);\n  display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap;\n}\n.guardian__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); }\n\n.stat { padding: var(--space-5); }\n.stat__label { margin: 0 0 var(--space-2); font-size: var(--text-sm); color: var(--text-muted); font-weight: 600; }\n.stat__value {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: var(--text-xl);\n  font-weight: 700;\n  color: var(--text-strong);\n}\n.stat__value--success { color: var(--success); }\n.stat__value--danger { color: var(--danger); }\n\n.muted { color: var(--text-muted); }\n.empty { color: var(--text-muted); text-align: center; padding: var(--space-6) 0; }\ncode { font-family: ui-monospace, monospace; background: var(--surface-sunken); padding: 2px 6px; border-radius: 4px; }\n\n@include mobile {\n  .profile { flex-direction: column; align-items: flex-start; text-align: left; }\n}\n.edit-card { margin-bottom: var(--space-6); }\n.edit-card fieldset { border: 0; padding: 0; margin: 0; min-width: 0; }\n.edit-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--space-4); }\n.edit-grid label { display: flex; flex-direction: column; gap: var(--space-2); font-size: var(--text-sm); }\n.edit-actions { display: flex; gap: var(--space-3); justify-content: flex-end; margin-top: var(--space-5); }\n.edit-error { color: var(--danger); }\n.edit-grid .ng-invalid.ng-touched { border-color: var(--danger); }\n@media (max-width: 800px) { .edit-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }\n@media (max-width: 480px) { .edit-grid { grid-template-columns: 1fr; } }\n"] }]
    }], null, { id: [{
            type: Input,
            args: [{ required: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StudentDetailComponent, { className: "StudentDetailComponent", filePath: "frontend/src/app/features/students/student-detail.component.ts", lineNumber: 37 }); })();
//# sourceMappingURL=student-detail.component.js.map