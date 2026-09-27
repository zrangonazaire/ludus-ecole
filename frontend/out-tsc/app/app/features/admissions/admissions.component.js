import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ADMISSION_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.value;
const _c0 = () => [];
function AdmissionsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "button", 25);
    i0.ɵɵlistener("click", function AdmissionsComponent_Conditional_9_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreate()); });
    i0.ɵɵelementStart(2, "span", 15);
    i0.ɵɵtext(3, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " Nouveau dossier ");
    i0.ɵɵelementEnd()();
} }
function AdmissionsComponent_For_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const year_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", year_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(year_r3.label);
} }
function AdmissionsComponent_For_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", status_r4.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(status_r4.label);
} }
function AdmissionsComponent_For_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", level_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(level_r5.label);
} }
function AdmissionsComponent_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 23);
} }
function AdmissionsComponent_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 26);
    i0.ɵɵlistener("retry", function AdmissionsComponent_Conditional_53_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadOptions(ctx_r1.yearFilter())); });
    i0.ɵɵelementEnd();
} }
function AdmissionsComponent_Conditional_54_For_21_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td")(8, "span", 28);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "small");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td")(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "small");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td")(18, "span");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "small");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "td")(23, "span", 29);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "td")(26, "span", 30);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "td")(29, "button", 31);
    i0.ɵɵlistener("click", function AdmissionsComponent_Conditional_54_For_21_Template_button_click_29_listener() { const application_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openDetails(application_r8)); });
    i0.ɵɵtext(30, "Ouvrir");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const application_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(application_r8.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("N\u00E9(e) le ", i0.ɵɵpipeBind2(6, 13, application_r8.birthDate, "dd/MM/yyyy"), "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(application_r8.applicationNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(application_r8.campusName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(application_r8.requestedLevelName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(application_r8.reservedClassroomName || "Classe non r\u00E9serv\u00E9e");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(application_r8.guardianFullName || "Non renseign\u00E9");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(application_r8.guardianPhone || application_r8.guardianEmail || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("document-progress--complete", application_r8.documentsComplete);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.documentProgress(application_r8), " obligatoires ");
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-status", application_r8.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.statusLabel(application_r8.status));
} }
function AdmissionsComponent_Conditional_54_ForEmpty_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 32);
    i0.ɵɵtext(2, "Aucun dossier ne correspond aux filtres.");
    i0.ɵɵelementEnd()();
} }
function AdmissionsComponent_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24)(1, "table")(2, "caption", 27);
    i0.ɵɵtext(3, "Dossiers d\u2019admission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "thead")(5, "tr")(6, "th");
    i0.ɵɵtext(7, "Candidat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Dossier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "Niveau demand\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th");
    i0.ɵɵtext(15, "Pi\u00E8ces");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th");
    i0.ɵɵtext(17, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(18, "th");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵrepeaterCreate(20, AdmissionsComponent_Conditional_54_For_21_Template, 31, 16, "tr", null, _forTrack0, false, AdmissionsComponent_Conditional_54_ForEmpty_22_Template, 3, 0, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(20);
    i0.ɵɵrepeater(ctx_r1.applications());
} }
function AdmissionsComponent_Conditional_55_For_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const year_r10 = ctx.$implicit;
    i0.ɵɵproperty("value", year_r10.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(year_r10.label);
} }
function AdmissionsComponent_Conditional_55_For_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const campus_r11 = ctx.$implicit;
    i0.ɵɵproperty("value", campus_r11.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(campus_r11.label);
} }
function AdmissionsComponent_Conditional_55_For_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r12 = ctx.$implicit;
    i0.ɵɵproperty("value", level_r12.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(level_r12.label);
} }
function AdmissionsComponent_Conditional_55_For_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r13 = ctx.$implicit;
    i0.ɵɵproperty("value", classroom_r13.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(classroom_r13.label);
} }
function AdmissionsComponent_Conditional_55_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵlistener("click", function AdmissionsComponent_Conditional_55_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCreate()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 34)(2, "header", 35)(3, "div")(4, "p", 2);
    i0.ɵɵtext(5, "Admission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 36);
    i0.ɵɵtext(7, "Nouveau dossier");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 37);
    i0.ɵɵlistener("click", function AdmissionsComponent_Conditional_55_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCreate()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 38);
    i0.ɵɵlistener("ngSubmit", function AdmissionsComponent_Conditional_55_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitCreate()); });
    i0.ɵɵelementStart(11, "section", 39)(12, "h3");
    i0.ɵɵtext(13, "Scolarit\u00E9 demand\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 40)(15, "label", 41)(16, "span", 42);
    i0.ɵɵtext(17, "Ann\u00E9e scolaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "select", 43);
    i0.ɵɵrepeaterCreate(19, AdmissionsComponent_Conditional_55_For_20_Template, 2, 2, "option", 18, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "label", 41)(22, "span", 42);
    i0.ɵɵtext(23, "Campus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "select", 44);
    i0.ɵɵrepeaterCreate(25, AdmissionsComponent_Conditional_55_For_26_Template, 2, 2, "option", 18, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "label", 41)(28, "span", 42);
    i0.ɵɵtext(29, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "select", 45)(31, "option", 20);
    i0.ɵɵtext(32, "Choisir\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(33, AdmissionsComponent_Conditional_55_For_34_Template, 2, 2, "option", 18, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "label", 41)(36, "span", 46);
    i0.ɵɵtext(37, "Classe \u00E0 r\u00E9server");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "select", 47)(39, "option", 20);
    i0.ɵɵtext(40, "Aucune pour l\u2019instant");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(41, AdmissionsComponent_Conditional_55_For_42_Template, 2, 2, "option", 18, _forTrack0);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(43, "section", 39)(44, "h3");
    i0.ɵɵtext(45, "Identit\u00E9 du candidat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "div", 40)(47, "label", 41)(48, "span", 42);
    i0.ɵɵtext(49, "Pr\u00E9nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(50, "input", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "label", 41)(52, "span", 42);
    i0.ɵɵtext(53, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(54, "input", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "label", 41)(56, "span", 46);
    i0.ɵɵtext(57, "Autres pr\u00E9noms");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(58, "input", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "label", 41)(60, "span", 42);
    i0.ɵɵtext(61, "Sexe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "select", 51)(63, "option", 52);
    i0.ɵɵtext(64, "F\u00E9minin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "option", 53);
    i0.ɵɵtext(66, "Masculin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(67, "option", 54);
    i0.ɵɵtext(68, "Autre");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(69, "label", 41)(70, "span", 42);
    i0.ɵɵtext(71, "Date de naissance");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(72, "input", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "label", 41)(74, "span", 46);
    i0.ɵɵtext(75, "Lieu de naissance");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(76, "input", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "label", 41)(78, "span", 46);
    i0.ɵɵtext(79, "Nationalit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(80, "input", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "label", 41)(82, "span", 46);
    i0.ɵɵtext(83, "\u00C9cole pr\u00E9c\u00E9dente");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(84, "input", 58);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(85, "section", 39)(86, "h3");
    i0.ɵɵtext(87, "Responsable l\u00E9gal");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(88, "div", 40)(89, "label", 41)(90, "span", 46);
    i0.ɵɵtext(91, "Pr\u00E9nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(92, "input", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(93, "label", 41)(94, "span", 46);
    i0.ɵɵtext(95, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(96, "input", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(97, "label", 41)(98, "span", 46);
    i0.ɵɵtext(99, "T\u00E9l\u00E9phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(100, "input", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(101, "label", 41)(102, "span", 46);
    i0.ɵɵtext(103, "Courriel");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(104, "input", 62);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(105, "label", 63)(106, "span", 46);
    i0.ɵɵtext(107, "Notes internes");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(108, "textarea", 64);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(109, "footer", 65)(110, "button", 66);
    i0.ɵɵlistener("click", function AdmissionsComponent_Conditional_55_Template_button_click_110_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeCreate()); });
    i0.ɵɵtext(111, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(112, "button", 67);
    i0.ɵɵlistener("click", function AdmissionsComponent_Conditional_55_Template_button_click_112_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitCreate()); });
    i0.ɵɵtext(113);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("formGroup", ctx_r1.createForm);
    i0.ɵɵadvance(9);
    i0.ɵɵrepeater((tmp_2_0 = (tmp_2_0 = ctx_r1.options()) == null ? null : tmp_2_0.academicYears) !== null && tmp_2_0 !== undefined ? tmp_2_0 : i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater((tmp_3_0 = (tmp_3_0 = ctx_r1.options()) == null ? null : tmp_3_0.campuses) !== null && tmp_3_0 !== undefined ? tmp_3_0 : i0.ɵɵpureFunction0(4, _c0));
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater((tmp_4_0 = (tmp_4_0 = ctx_r1.options()) == null ? null : tmp_4_0.levels) !== null && tmp_4_0 !== undefined ? tmp_4_0 : i0.ɵɵpureFunction0(5, _c0));
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r1.availableClassroomsForCreate());
    i0.ɵɵadvance(71);
    i0.ɵɵproperty("disabled", ctx_r1.createForm.invalid || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Cr\u00E9ation\u2026" : "Cr\u00E9er le dossier", " ");
} }
function AdmissionsComponent_Conditional_56_For_46_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 80);
    i0.ɵɵtext(1, "\u2026");
    i0.ɵɵelementEnd();
} }
function AdmissionsComponent_Conditional_56_For_46_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 78)(1, "input", 79);
    i0.ɵɵlistener("change", function AdmissionsComponent_Conditional_56_For_46_Template_input_change_1_listener($event) { const document_r16 = i0.ɵɵrestoreView(_r15).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleDocument(document_r16.id, $event.target.checked)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, AdmissionsComponent_Conditional_56_For_46_Conditional_7_Template, 2, 0, "span", 80);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r16 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("document-item--received", document_r16.received);
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", document_r16.received)("disabled", !ctx_r1.canManage() || ctx_r1.documentUpdating() !== null);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r16.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(document_r16.mandatory ? "Obligatoire" : "Facultatif");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.documentUpdating() === document_r16.id ? 7 : -1);
} }
function AdmissionsComponent_Conditional_56_Conditional_47_For_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r18 = ctx.$implicit;
    i0.ɵɵproperty("value", status_r18.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(status_r18.label);
} }
function AdmissionsComponent_Conditional_56_Conditional_47_For_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r19 = ctx.$implicit;
    i0.ɵɵproperty("value", classroom_r19.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(classroom_r19.label);
} }
function AdmissionsComponent_Conditional_56_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 76)(1, "div", 73)(2, "div")(3, "h3");
    i0.ɵɵtext(4, "Faire avancer le dossier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Seules les transitions autoris\u00E9es sont propos\u00E9es.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "label", 41)(8, "span", 42);
    i0.ɵɵtext(9, "Nouvel \u00E9tat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "select", 81)(11, "option", 20);
    i0.ɵɵtext(12, "Choisir une action\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(13, AdmissionsComponent_Conditional_56_Conditional_47_For_14_Template, 2, 2, "option", 18, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 40)(16, "label", 41)(17, "span", 46);
    i0.ɵɵtext(18, "Classe r\u00E9serv\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "select", 47)(20, "option", 20);
    i0.ɵɵtext(21, "Aucune");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(22, AdmissionsComponent_Conditional_56_Conditional_47_For_23_Template, 2, 2, "option", 18, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "label", 41)(25, "span", 46);
    i0.ɵɵtext(26, "Note du test");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(27, "input", 82);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "label", 41)(29, "span", 46);
    i0.ɵɵtext(30, "Motif / observation");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(31, "textarea", 83);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "button", 67);
    i0.ɵɵlistener("click", function AdmissionsComponent_Conditional_56_Conditional_47_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitWorkflow()); });
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const application_r20 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.workflowForm);
    i0.ɵɵadvance(13);
    i0.ɵɵrepeater(ctx_r1.nextStatuses(application_r20));
    i0.ɵɵadvance(9);
    i0.ɵɵrepeater(ctx_r1.availableClassrooms(application_r20));
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("disabled", ctx_r1.workflowForm.invalid || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.saving() ? "Enregistrement\u2026" : "Confirmer l\u2019action");
} }
function AdmissionsComponent_Conditional_56_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 77)(1, "strong");
    i0.ɵɵtext(2, "Motif de d\u00E9cision");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const application_r20 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(application_r20.decisionReason);
} }
function AdmissionsComponent_Conditional_56_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵlistener("click", function AdmissionsComponent_Conditional_56_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDetails()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 68)(2, "header", 35)(3, "div")(4, "p", 2);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 69);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 37);
    i0.ɵɵlistener("click", function AdmissionsComponent_Conditional_56_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeDetails()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 70)(11, "div", 71)(12, "span", 30);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "dl")(15, "div")(16, "dt");
    i0.ɵɵtext(17, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "dd");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div")(21, "dt");
    i0.ɵɵtext(22, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "dd");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div")(26, "dt");
    i0.ɵɵtext(27, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "dd");
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div")(31, "dt");
    i0.ɵɵtext(32, "Contact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "dd");
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(35, "section", 72)(36, "div", 73)(37, "div")(38, "h3");
    i0.ɵɵtext(39, "Pi\u00E8ces du dossier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "p");
    i0.ɵɵtext(41, "Les pi\u00E8ces obligatoires doivent \u00EAtre re\u00E7ues avant l\u2019acceptation.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(42, "strong");
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "div", 74);
    i0.ɵɵrepeaterCreate(45, AdmissionsComponent_Conditional_56_For_46_Template, 8, 7, "label", 75, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(47, AdmissionsComponent_Conditional_56_Conditional_47_Template, 34, 3, "section", 76)(48, AdmissionsComponent_Conditional_56_Conditional_48_Template, 5, 1, "section", 77);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const application_r20 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(application_r20.applicationNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(application_r20.fullName);
    i0.ɵɵadvance(5);
    i0.ɵɵattribute("data-status", application_r20.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.statusLabel(application_r20.status));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(application_r20.requestedLevelName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(application_r20.reservedClassroomName || "\u00C0 d\u00E9finir");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(application_r20.guardianFullName || "Non renseign\u00E9");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(application_r20.guardianPhone || application_r20.guardianEmail || "\u2014");
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r1.documentProgress(application_r20));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(application_r20.documents);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.canDecide() && ctx_r1.nextStatuses(application_r20).length > 0 ? 47 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(application_r20.decisionReason ? 48 : -1);
} }
export class AdmissionsComponent {
    dataSource = inject(ADMISSION_DATA_SOURCE);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    page = signal(null);
    options = signal(null);
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    createOpen = signal(false);
    detailOpen = signal(false);
    selected = signal(null);
    documentUpdating = signal(null);
    search = signal('');
    statusFilter = signal('');
    levelFilter = signal('');
    yearFilter = signal('');
    canManage = computed(() => this.auth.has(PERMISSIONS.ADMISSION_MANAGE));
    canDecide = computed(() => this.auth.has(PERMISSIONS.ADMISSION_DECIDE));
    applications = computed(() => this.page()?.content ?? []);
    summary = computed(() => {
        const items = this.applications();
        return {
            total: this.page()?.totalElements ?? 0,
            review: items.filter((item) => ['SUBMITTED', 'UNDER_REVIEW', 'TESTED']
                .includes(item.status)).length,
            accepted: items.filter((item) => item.status === 'ACCEPTED').length,
            incomplete: items.filter((item) => !item.documentsComplete
                && !['REJECTED', 'WITHDRAWN', 'CONVERTED'].includes(item.status)).length
        };
    });
    statuses = [
        { value: 'DRAFT', label: 'Brouillon' },
        { value: 'SUBMITTED', label: 'Soumis' },
        { value: 'UNDER_REVIEW', label: 'À étudier' },
        { value: 'TESTED', label: 'Test passé' },
        { value: 'ACCEPTED', label: 'Accepté' },
        { value: 'WAITLISTED', label: 'Liste d’attente' },
        { value: 'REJECTED', label: 'Refusé' },
        { value: 'WITHDRAWN', label: 'Retiré' },
        { value: 'CONVERTED', label: 'Inscrit' }
    ];
    createForm = this.fb.nonNullable.group({
        academicYearId: ['', Validators.required],
        campusId: ['', Validators.required],
        requestedLevelId: ['', Validators.required],
        reservedClassroomId: [''],
        firstName: ['', [Validators.required, Validators.maxLength(120)]],
        lastName: ['', [Validators.required, Validators.maxLength(120)]],
        middleName: ['', Validators.maxLength(120)],
        gender: ['FEMALE', Validators.required],
        birthDate: ['', Validators.required],
        birthPlace: [''],
        nationality: ['Ivoirienne'],
        previousSchool: [''],
        guardianFirstName: [''],
        guardianLastName: [''],
        guardianPhone: [''],
        guardianEmail: ['', Validators.email],
        notes: ['']
    });
    workflowForm = this.fb.nonNullable.group({
        status: ['', Validators.required],
        reservedClassroomId: [''],
        entranceExamScore: [''],
        reason: ['']
    });
    ngOnInit() {
        this.loadOptions();
    }
    loadOptions(academicYearId) {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.options(academicYearId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (options) => {
                this.options.set(options);
                const yearId = academicYearId || options.defaultAcademicYearId
                    || options.academicYears[0]?.id || '';
                this.yearFilter.set(yearId);
                this.createForm.controls.academicYearId.setValue(yearId);
                if (!this.createForm.controls.campusId.value) {
                    this.createForm.controls.campusId.setValue(options.campuses[0]?.id ?? '');
                }
                this.load();
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.search({
            academicYearId: this.yearFilter() || undefined,
            status: this.statusFilter() || undefined,
            levelId: this.levelFilter() || undefined,
            search: this.search().trim() || undefined,
            page: 0,
            size: 100,
            sort: 'createdAt,desc'
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (page) => {
                this.page.set(page);
                this.loading.set(false);
            },
            error: () => {
                // Une recherche indisponible ne doit pas masquer les options ni le
                // formulaire de création déjà chargés.
                this.page.set({
                    content: [], page: 0, size: 100, totalElements: 0, totalPages: 0,
                    first: true, last: true
                });
                this.loading.set(false);
                this.error.set(false);
            }
        });
    }
    onYearChange(value) {
        this.levelFilter.set('');
        this.loadOptions(value);
    }
    openCreate() {
        const options = this.options();
        this.createForm.reset({
            academicYearId: this.yearFilter() || options?.defaultAcademicYearId || '',
            campusId: options?.campuses[0]?.id ?? '',
            requestedLevelId: '', reservedClassroomId: '',
            firstName: '', lastName: '', middleName: '', gender: 'FEMALE', birthDate: '',
            birthPlace: '', nationality: 'Ivoirienne', previousSchool: '',
            guardianFirstName: '', guardianLastName: '', guardianPhone: '',
            guardianEmail: '', notes: ''
        });
        this.createOpen.set(true);
    }
    closeCreate() {
        if (!this.saving())
            this.createOpen.set(false);
    }
    submitCreate() {
        if (this.createForm.invalid || this.saving()) {
            this.createForm.markAllAsTouched();
            return;
        }
        const value = this.createForm.getRawValue();
        const payload = {
            academicYearId: value.academicYearId,
            campusId: value.campusId,
            requestedLevelId: value.requestedLevelId,
            reservedClassroomId: optional(value.reservedClassroomId),
            firstName: value.firstName.trim(), lastName: value.lastName.trim(),
            middleName: optional(value.middleName),
            gender: value.gender,
            birthDate: value.birthDate,
            birthPlace: optional(value.birthPlace), nationality: optional(value.nationality),
            previousSchool: optional(value.previousSchool),
            guardianFirstName: optional(value.guardianFirstName),
            guardianLastName: optional(value.guardianLastName),
            guardianPhone: optional(value.guardianPhone), guardianEmail: optional(value.guardianEmail),
            notes: optional(value.notes)
        };
        this.saving.set(true);
        this.dataSource.create(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (created) => {
                this.saving.set(false);
                this.createOpen.set(false);
                this.notifications.success(`${created.applicationNumber} a été créé.`, 'Dossier d’admission');
                this.load();
            },
            error: () => this.saving.set(false)
        });
    }
    openDetails(application) {
        this.selected.set(application);
        this.workflowForm.reset({
            status: '',
            reservedClassroomId: application.reservedClassroomId ?? '',
            entranceExamScore: application.entranceExamScore?.toString() ?? '',
            reason: application.decisionReason ?? ''
        });
        this.detailOpen.set(true);
    }
    closeDetails() {
        if (!this.saving()) {
            this.detailOpen.set(false);
            this.selected.set(null);
        }
    }
    submitWorkflow() {
        const application = this.selected();
        if (!application || this.workflowForm.invalid || this.saving())
            return;
        const value = this.workflowForm.getRawValue();
        const status = value.status;
        if (status === 'TESTED' && value.entranceExamScore === '') {
            this.notifications.warning('Saisissez la note du test d’entrée.');
            return;
        }
        if (status === 'REJECTED' && !value.reason.trim()) {
            this.notifications.warning('Le motif du refus est obligatoire.');
            return;
        }
        const payload = {
            status,
            reservedClassroomId: optional(value.reservedClassroomId),
            entranceExamScore: value.entranceExamScore === ''
                ? undefined : Number(value.entranceExamScore),
            reason: optional(value.reason)
        };
        this.saving.set(true);
        this.dataSource.changeStatus(application.id, payload)
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (updated) => {
                this.saving.set(false);
                this.replace(updated);
                this.workflowForm.controls.status.setValue('');
                this.notifications.success(`Le dossier est maintenant « ${this.statusLabel(updated.status)} ».`);
            },
            error: () => this.saving.set(false)
        });
    }
    toggleDocument(documentId, received) {
        const application = this.selected();
        if (!application || this.documentUpdating())
            return;
        this.documentUpdating.set(documentId);
        this.dataSource.updateDocument(application.id, documentId, received)
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (updated) => {
                this.documentUpdating.set(null);
                this.replace(updated);
            },
            error: () => this.documentUpdating.set(null)
        });
    }
    availableClassroomsForCreate() {
        const value = this.createForm.getRawValue();
        return this.options()?.classrooms.filter((item) => (!value.requestedLevelId || item.levelId === value.requestedLevelId)
            && (!value.campusId || item.campusId === value.campusId)) ?? [];
    }
    availableClassrooms(application) {
        return this.options()?.classrooms.filter((item) => item.levelId === application.requestedLevelId
            && item.campusId === application.campusId) ?? [];
    }
    nextStatuses(application) {
        const transitions = {
            DRAFT: ['SUBMITTED', 'WITHDRAWN'],
            SUBMITTED: ['UNDER_REVIEW', 'REJECTED', 'WITHDRAWN'],
            UNDER_REVIEW: ['TESTED', 'ACCEPTED', 'WAITLISTED', 'REJECTED', 'WITHDRAWN'],
            TESTED: ['ACCEPTED', 'WAITLISTED', 'REJECTED', 'WITHDRAWN'],
            ACCEPTED: ['WITHDRAWN'],
            WAITLISTED: ['ACCEPTED', 'REJECTED', 'WITHDRAWN'],
            REJECTED: [], WITHDRAWN: [], CONVERTED: []
        };
        return transitions[application.status].map((status) => ({
            value: status, label: this.statusLabel(status)
        }));
    }
    statusLabel(status) {
        return this.statuses.find((item) => item.value === status)?.label ?? status;
    }
    documentProgress(application) {
        const mandatory = application.documents.filter((item) => item.mandatory);
        return `${mandatory.filter((item) => item.received).length}/${mandatory.length}`;
    }
    replace(updated) {
        this.selected.set(updated);
        this.page.update((page) => page ? {
            ...page,
            content: page.content.map((item) => item.id === updated.id ? updated : item)
        } : page);
    }
    static ɵfac = function AdmissionsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdmissionsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdmissionsComponent, selectors: [["eduops-admissions"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 57, vars: 14, consts: [[1, "page"], [1, "page__header"], [1, "eyebrow"], [1, "page__title"], [1, "page__meta"], [1, "page__actions"], ["aria-label", "R\u00E9sum\u00E9 des admissions", 1, "summary-grid"], [1, "summary", "card"], [1, "numeric"], [1, "summary", "card", "summary--review"], [1, "summary", "card", "summary--success"], [1, "summary", "card", "summary--warning"], [1, "card", "board"], [1, "filters"], [1, "search-field"], ["aria-hidden", "true"], ["type", "search", "placeholder", "Nom ou num\u00E9ro de dossier\u2026", 1, "input", 3, "input", "keyup.enter", "value"], ["aria-label", "Ann\u00E9e scolaire", 1, "select", 3, "change", "value"], [3, "value"], ["aria-label", "Statut", 1, "select", 3, "change", "value"], ["value", ""], ["aria-label", "Niveau", 1, "select", 3, "change", "value"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], ["message", "Chargement des admissions\u2026"], [1, "table-wrap"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], [3, "retry"], [1, "visually-hidden"], [1, "number", "numeric"], [1, "document-progress"], [1, "status"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["colspan", "7", 1, "empty"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "admission-create-title", 1, "drawer"], [1, "drawer__head"], ["id", "admission-create-title"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "drawer__body", 3, "ngSubmit", "formGroup"], [1, "form-section"], [1, "form-grid"], [1, "field"], [1, "field__label", "field__label--required"], ["formControlName", "academicYearId", 1, "select"], ["formControlName", "campusId", 1, "select"], ["formControlName", "requestedLevelId", 1, "select"], [1, "field__label"], ["formControlName", "reservedClassroomId", 1, "select"], ["formControlName", "firstName", 1, "input"], ["formControlName", "lastName", 1, "input"], ["formControlName", "middleName", 1, "input"], ["formControlName", "gender", 1, "select"], ["value", "FEMALE"], ["value", "MALE"], ["value", "OTHER"], ["type", "date", "formControlName", "birthDate", 1, "input"], ["formControlName", "birthPlace", 1, "input"], ["formControlName", "nationality", 1, "input"], ["formControlName", "previousSchool", 1, "input"], ["formControlName", "guardianFirstName", 1, "input"], ["formControlName", "guardianLastName", 1, "input"], ["type", "tel", "formControlName", "guardianPhone", 1, "input"], ["type", "email", "formControlName", "guardianEmail", 1, "input"], [1, "field", "field--wide"], ["rows", "3", "formControlName", "notes", 1, "textarea"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "admission-detail-title", 1, "drawer", "drawer--detail"], ["id", "admission-detail-title"], [1, "drawer__body"], [1, "detail-summary"], [1, "detail-section"], [1, "detail-section__head"], [1, "document-list"], [1, "document-item", 3, "document-item--received"], [1, "detail-section", "workflow", 3, "formGroup"], [1, "decision-note"], [1, "document-item"], ["type", "checkbox", 3, "change", "checked", "disabled"], [1, "spinner"], ["formControlName", "status", 1, "select"], ["type", "number", "min", "0", "step", "0.25", "formControlName", "entranceExamScore", 1, "input", "numeric"], ["rows", "3", "formControlName", "reason", 1, "textarea"]], template: function AdmissionsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "Scolarit\u00E9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 3);
            i0.ɵɵtext(6, "Admissions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, "Du d\u00E9p\u00F4t du dossier \u00E0 la d\u00E9cision d\u2019admission");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, AdmissionsComponent_Conditional_9_Template, 5, 0, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "section", 6)(11, "article", 7)(12, "span");
            i0.ɵɵtext(13, "Total");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "strong", 8);
            i0.ɵɵtext(15);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "article", 9)(17, "span");
            i0.ɵɵtext(18, "\u00C0 traiter");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "strong", 8);
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "article", 10)(22, "span");
            i0.ɵɵtext(23, "Accept\u00E9s");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "strong", 8);
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "article", 11)(27, "span");
            i0.ɵɵtext(28, "Pi\u00E8ces manquantes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "strong", 8);
            i0.ɵɵtext(30);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(31, "section", 12)(32, "header", 13)(33, "label", 14)(34, "span", 15);
            i0.ɵɵtext(35, "\u2315");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "input", 16);
            i0.ɵɵlistener("input", function AdmissionsComponent_Template_input_input_36_listener($event) { return ctx.search.set($event.target.value); })("keyup.enter", function AdmissionsComponent_Template_input_keyup_enter_36_listener() { return ctx.load(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "select", 17);
            i0.ɵɵlistener("change", function AdmissionsComponent_Template_select_change_37_listener($event) { return ctx.onYearChange($event.target.value); });
            i0.ɵɵrepeaterCreate(38, AdmissionsComponent_For_39_Template, 2, 2, "option", 18, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "select", 19);
            i0.ɵɵlistener("change", function AdmissionsComponent_Template_select_change_40_listener($event) { ctx.statusFilter.set($event.target.value); return ctx.load(); });
            i0.ɵɵelementStart(41, "option", 20);
            i0.ɵɵtext(42, "Tous les statuts");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(43, AdmissionsComponent_For_44_Template, 2, 2, "option", 18, _forTrack1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "select", 21);
            i0.ɵɵlistener("change", function AdmissionsComponent_Template_select_change_45_listener($event) { ctx.levelFilter.set($event.target.value); return ctx.load(); });
            i0.ɵɵelementStart(46, "option", 20);
            i0.ɵɵtext(47, "Tous les niveaux");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(48, AdmissionsComponent_For_49_Template, 2, 2, "option", 18, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "button", 22);
            i0.ɵɵlistener("click", function AdmissionsComponent_Template_button_click_50_listener() { return ctx.load(); });
            i0.ɵɵtext(51, "Rechercher");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(52, AdmissionsComponent_Conditional_52_Template, 1, 0, "eduops-loading-state", 23)(53, AdmissionsComponent_Conditional_53_Template, 1, 0, "eduops-error-state")(54, AdmissionsComponent_Conditional_54_Template, 23, 1, "div", 24);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(55, AdmissionsComponent_Conditional_55_Template, 114, 6)(56, AdmissionsComponent_Conditional_56_Template, 49, 11);
        } if (rf & 2) {
            let tmp_7_0;
            let tmp_11_0;
            let tmp_14_0;
            i0.ɵɵadvance(9);
            i0.ɵɵconditional(ctx.canManage() ? 9 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.summary().total);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary().review);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary().accepted);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary().incomplete);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("value", ctx.search());
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.yearFilter());
            i0.ɵɵadvance();
            i0.ɵɵrepeater((tmp_7_0 = (tmp_7_0 = ctx.options()) == null ? null : tmp_7_0.academicYears) !== null && tmp_7_0 !== undefined ? tmp_7_0 : i0.ɵɵpureFunction0(12, _c0));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", ctx.statusFilter());
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.statuses);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", ctx.levelFilter());
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater((tmp_11_0 = (tmp_11_0 = ctx.options()) == null ? null : tmp_11_0.levels) !== null && tmp_11_0 !== undefined ? tmp_11_0 : i0.ɵɵpureFunction0(13, _c0));
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.loading() ? 52 : ctx.error() ? 53 : 54);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.createOpen() ? 55 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_14_0 = ctx.detailOpen() && ctx.selected()) ? 56 : -1, tmp_14_0);
        } }, dependencies: [CommonModule, i1.DatePipe, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MinValidator, i2.FormGroupDirective, i2.FormControlName, LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.eyebrow[_ngcontent-%COMP%] { margin: 0 0 4px; color: var(--brand); font-size: var(--text-xs); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }\n\n.summary-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-3); margin-bottom: var(--space-5); }\n.summary[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; padding: var(--space-4); border-left: 3px solid var(--border); }\n.summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--text-muted); font-size: var(--text-sm); }\n.summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--text-strong); font-size: var(--text-xl); }\n.summary--review[_ngcontent-%COMP%] { border-left-color: var(--info); }\n.summary--success[_ngcontent-%COMP%] { border-left-color: var(--success); }\n.summary--warning[_ngcontent-%COMP%] { border-left-color: var(--warning); }\n\n.board[_ngcontent-%COMP%] { overflow: hidden; }\n.filters[_ngcontent-%COMP%] { display: grid; grid-template-columns: minmax(220px, 1fr) repeat(3, minmax(145px, auto)) auto; gap: var(--space-2); padding: var(--space-4); border-bottom: 1px solid var(--border); }\n.search-field[_ngcontent-%COMP%] { position: relative; }\n.search-field[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { position: absolute; left: 11px; top: 50%; color: var(--text-light); transform: translateY(-50%); }\n.search-field[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%] { width: 100%; padding-left: 32px; }\n\n.table-wrap[_ngcontent-%COMP%] { overflow-x: auto; }\ntable[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; }\nth[_ngcontent-%COMP%] { padding: var(--space-3) var(--space-4); color: var(--text-light); font-size: var(--text-xs); text-align: left; text-transform: uppercase; background: var(--surface-sunken); }\ntd[_ngcontent-%COMP%] { padding: var(--space-3) var(--space-4); color: var(--text-muted); font-size: var(--text-sm); border-top: 1px solid var(--border-light); vertical-align: middle; }\ntd[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], td[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { display: block; color: var(--text-strong); }\ntd[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; margin-top: 2px; color: var(--text-light); font-size: var(--text-xs); }\ntbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover { background: var(--surface-hover); }\n.number[_ngcontent-%COMP%] { font-family: var(--font-mono); font-size: var(--text-xs); }\n.empty[_ngcontent-%COMP%] { padding: var(--space-10); text-align: center; }\n\n.status[_ngcontent-%COMP%] { display: inline-flex; width: max-content; padding: 4px 9px; color: var(--text-muted); font-size: var(--text-xs); font-weight: 700; background: var(--surface-sunken); border-radius: var(--radius-pill); }\n.status[data-status='ACCEPTED'][_ngcontent-%COMP%], .status[data-status='CONVERTED'][_ngcontent-%COMP%] { color: var(--success); background: var(--success-bg); }\n.status[data-status='REJECTED'][_ngcontent-%COMP%], .status[data-status='WITHDRAWN'][_ngcontent-%COMP%] { color: var(--danger); background: var(--danger-bg); }\n.status[data-status='WAITLISTED'][_ngcontent-%COMP%], .status[data-status='TESTED'][_ngcontent-%COMP%] { color: var(--warning); background: var(--warning-bg); }\n.status[data-status='SUBMITTED'][_ngcontent-%COMP%], .status[data-status='UNDER_REVIEW'][_ngcontent-%COMP%] { color: var(--info); background: var(--info-bg); }\n.document-progress[_ngcontent-%COMP%] { color: var(--warning); font-size: var(--text-xs); font-weight: 700; }\n.document-progress--complete[_ngcontent-%COMP%] { color: var(--success); }\n\n.drawer-backdrop[_ngcontent-%COMP%] { position: fixed; z-index: 80; inset: 0; background: rgba(9, 25, 44, .42); backdrop-filter: blur(2px); }\n.drawer[_ngcontent-%COMP%] { position: fixed; z-index: 81; inset: 0 0 0 auto; display: flex; flex-direction: column; width: min(720px, 100vw); background: var(--surface-card); box-shadow: var(--shadow-xl); }\n.drawer--detail[_ngcontent-%COMP%] { width: min(600px, 100vw); }\n.drawer__head[_ngcontent-%COMP%] { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-3); padding: var(--space-5); border-bottom: 1px solid var(--border); }\n.drawer__head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-xl); }\n.drawer__close[_ngcontent-%COMP%] { padding: 0; color: var(--text-muted); font-size: 1.6rem; line-height: 1; background: none; border: 0; cursor: pointer; }\n.drawer__body[_ngcontent-%COMP%] { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: var(--space-5); padding: var(--space-5); }\n.drawer__foot[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: var(--space-2); padding: var(--space-4) var(--space-5); border-top: 1px solid var(--border); }\n\n.form-section[_ngcontent-%COMP%] { padding-bottom: var(--space-4); border-bottom: 1px solid var(--border-light); }\n.form-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .detail-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0 0 var(--space-3); font-size: var(--text-md); }\n.form-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }\n.field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 5px; }\n.field--wide[_ngcontent-%COMP%] { margin-top: var(--space-3); }\n.field[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   .textarea[_ngcontent-%COMP%] { width: 100%; }\n\n.detail-summary[_ngcontent-%COMP%] { padding: var(--space-4); background: var(--surface-sunken); border-radius: var(--radius-card); }\n.detail-summary[_ngcontent-%COMP%]   dl[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin: var(--space-4) 0 0; }\n.detail-summary[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] { color: var(--text-light); font-size: var(--text-xs); }\n.detail-summary[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] { margin: 2px 0 0; color: var(--text-strong); font-size: var(--text-sm); font-weight: 650; }\n.detail-section[_ngcontent-%COMP%] { padding: var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-card); }\n.detail-section__head[_ngcontent-%COMP%] { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-3); margin-bottom: var(--space-3); }\n.detail-section__head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin-bottom: 2px; }\n.detail-section__head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: var(--text-light); font-size: var(--text-xs); }\n.document-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-2); }\n.document-item[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--warning-bg); border-radius: var(--radius-input); cursor: pointer; }\n.document-item--received[_ngcontent-%COMP%] { background: var(--success-bg); }\n.document-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) { flex: 1; }\n.document-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .document-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; }\n.document-item[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { margin-top: 2px; color: var(--text-light); font-size: var(--text-xs); }\n.workflow[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); }\n.decision-note[_ngcontent-%COMP%] { padding: var(--space-4); color: var(--text-muted); background: var(--brand-tint); border-radius: var(--radius-card); }\n.decision-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 5px 0 0; }\n\n@include tablet {\n  .summary-grid { grid-template-columns: 1fr 1fr; }\n  .filters { grid-template-columns: 1fr 1fr; }\n}\n\n@include mobile {\n  .summary-grid, .form-grid, .detail-summary dl { grid-template-columns: 1fr; }\n  .filters { grid-template-columns: 1fr; }\n  .drawer__body { padding: var(--space-4); }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdmissionsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-admissions', standalone: true, imports: [CommonModule, ReactiveFormsModule, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <p class=\"eyebrow\">Scolarit\u00E9</p>\n      <h1 class=\"page__title\">Admissions</h1>\n      <p class=\"page__meta\">Du d\u00E9p\u00F4t du dossier \u00E0 la d\u00E9cision d\u2019admission</p>\n    </div>\n    @if (canManage()) {\n      <div class=\"page__actions\">\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openCreate()\">\n          <span aria-hidden=\"true\">+</span> Nouveau dossier\n        </button>\n      </div>\n    }\n  </header>\n\n  <section class=\"summary-grid\" aria-label=\"R\u00E9sum\u00E9 des admissions\">\n    <article class=\"summary card\"><span>Total</span><strong class=\"numeric\">{{ summary().total }}</strong></article>\n    <article class=\"summary card summary--review\"><span>\u00C0 traiter</span><strong class=\"numeric\">{{ summary().review }}</strong></article>\n    <article class=\"summary card summary--success\"><span>Accept\u00E9s</span><strong class=\"numeric\">{{ summary().accepted }}</strong></article>\n    <article class=\"summary card summary--warning\"><span>Pi\u00E8ces manquantes</span><strong class=\"numeric\">{{ summary().incomplete }}</strong></article>\n  </section>\n\n  <section class=\"card board\">\n    <header class=\"filters\">\n      <label class=\"search-field\">\n        <span aria-hidden=\"true\">\u2315</span>\n        <input class=\"input\" type=\"search\" placeholder=\"Nom ou num\u00E9ro de dossier\u2026\"\n               [value]=\"search()\"\n               (input)=\"search.set($any($event.target).value)\"\n               (keyup.enter)=\"load()\" />\n      </label>\n      <select class=\"select\" aria-label=\"Ann\u00E9e scolaire\" [value]=\"yearFilter()\"\n              (change)=\"onYearChange($any($event.target).value)\">\n        @for (year of options()?.academicYears ?? []; track year.id) {\n          <option [value]=\"year.id\">{{ year.label }}</option>\n        }\n      </select>\n      <select class=\"select\" aria-label=\"Statut\" [value]=\"statusFilter()\"\n              (change)=\"statusFilter.set($any($event.target).value); load()\">\n        <option value=\"\">Tous les statuts</option>\n        @for (status of statuses; track status.value) {\n          <option [value]=\"status.value\">{{ status.label }}</option>\n        }\n      </select>\n      <select class=\"select\" aria-label=\"Niveau\" [value]=\"levelFilter()\"\n              (change)=\"levelFilter.set($any($event.target).value); load()\">\n        <option value=\"\">Tous les niveaux</option>\n        @for (level of options()?.levels ?? []; track level.id) {\n          <option [value]=\"level.id\">{{ level.label }}</option>\n        }\n      </select>\n      <button type=\"button\" class=\"btn btn--secondary btn--sm\" (click)=\"load()\">Rechercher</button>\n    </header>\n\n    @if (loading()) {\n      <eduops-loading-state message=\"Chargement des admissions\u2026\" />\n    } @else if (error()) {\n      <eduops-error-state (retry)=\"loadOptions(yearFilter())\" />\n    } @else {\n      <div class=\"table-wrap\">\n        <table>\n          <caption class=\"visually-hidden\">Dossiers d\u2019admission</caption>\n          <thead><tr>\n            <th>Candidat</th><th>Dossier</th><th>Niveau demand\u00E9</th>\n            <th>Responsable</th><th>Pi\u00E8ces</th><th>Statut</th><th></th>\n          </tr></thead>\n          <tbody>\n            @for (application of applications(); track application.id) {\n              <tr>\n                <td>\n                  <strong>{{ application.fullName }}</strong>\n                  <small>N\u00E9(e) le {{ application.birthDate | date:'dd/MM/yyyy' }}</small>\n                </td>\n                <td><span class=\"number numeric\">{{ application.applicationNumber }}</span><small>{{ application.campusName }}</small></td>\n                <td><strong>{{ application.requestedLevelName }}</strong><small>{{ application.reservedClassroomName || 'Classe non r\u00E9serv\u00E9e' }}</small></td>\n                <td><span>{{ application.guardianFullName || 'Non renseign\u00E9' }}</span><small>{{ application.guardianPhone || application.guardianEmail || '\u2014' }}</small></td>\n                <td>\n                  <span class=\"document-progress\" [class.document-progress--complete]=\"application.documentsComplete\">\n                    {{ documentProgress(application) }} obligatoires\n                  </span>\n                </td>\n                <td><span class=\"status\" [attr.data-status]=\"application.status\">{{ statusLabel(application.status) }}</span></td>\n                <td><button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"openDetails(application)\">Ouvrir</button></td>\n              </tr>\n            } @empty {\n              <tr><td colspan=\"7\" class=\"empty\">Aucun dossier ne correspond aux filtres.</td></tr>\n            }\n          </tbody>\n        </table>\n      </div>\n    }\n  </section>\n</div>\n\n@if (createOpen()) {\n  <div class=\"drawer-backdrop\" (click)=\"closeCreate()\"></div>\n  <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"admission-create-title\">\n    <header class=\"drawer__head\">\n      <div><p class=\"eyebrow\">Admission</p><h2 id=\"admission-create-title\">Nouveau dossier</h2></div>\n      <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\" (click)=\"closeCreate()\">\u00D7</button>\n    </header>\n    <form class=\"drawer__body\" [formGroup]=\"createForm\" (ngSubmit)=\"submitCreate()\">\n      <section class=\"form-section\">\n        <h3>Scolarit\u00E9 demand\u00E9e</h3>\n        <div class=\"form-grid\">\n          <label class=\"field\"><span class=\"field__label field__label--required\">Ann\u00E9e scolaire</span>\n            <select class=\"select\" formControlName=\"academicYearId\">\n              @for (year of options()?.academicYears ?? []; track year.id) { <option [value]=\"year.id\">{{ year.label }}</option> }\n            </select>\n          </label>\n          <label class=\"field\"><span class=\"field__label field__label--required\">Campus</span>\n            <select class=\"select\" formControlName=\"campusId\">\n              @for (campus of options()?.campuses ?? []; track campus.id) { <option [value]=\"campus.id\">{{ campus.label }}</option> }\n            </select>\n          </label>\n          <label class=\"field\"><span class=\"field__label field__label--required\">Niveau</span>\n            <select class=\"select\" formControlName=\"requestedLevelId\">\n              <option value=\"\">Choisir\u2026</option>\n              @for (level of options()?.levels ?? []; track level.id) { <option [value]=\"level.id\">{{ level.label }}</option> }\n            </select>\n          </label>\n          <label class=\"field\"><span class=\"field__label\">Classe \u00E0 r\u00E9server</span>\n            <select class=\"select\" formControlName=\"reservedClassroomId\">\n              <option value=\"\">Aucune pour l\u2019instant</option>\n              @for (classroom of availableClassroomsForCreate(); track classroom.id) { <option [value]=\"classroom.id\">{{ classroom.label }}</option> }\n            </select>\n          </label>\n        </div>\n      </section>\n\n      <section class=\"form-section\">\n        <h3>Identit\u00E9 du candidat</h3>\n        <div class=\"form-grid\">\n          <label class=\"field\"><span class=\"field__label field__label--required\">Pr\u00E9nom</span><input class=\"input\" formControlName=\"firstName\" /></label>\n          <label class=\"field\"><span class=\"field__label field__label--required\">Nom</span><input class=\"input\" formControlName=\"lastName\" /></label>\n          <label class=\"field\"><span class=\"field__label\">Autres pr\u00E9noms</span><input class=\"input\" formControlName=\"middleName\" /></label>\n          <label class=\"field\"><span class=\"field__label field__label--required\">Sexe</span>\n            <select class=\"select\" formControlName=\"gender\"><option value=\"FEMALE\">F\u00E9minin</option><option value=\"MALE\">Masculin</option><option value=\"OTHER\">Autre</option></select>\n          </label>\n          <label class=\"field\"><span class=\"field__label field__label--required\">Date de naissance</span><input class=\"input\" type=\"date\" formControlName=\"birthDate\" /></label>\n          <label class=\"field\"><span class=\"field__label\">Lieu de naissance</span><input class=\"input\" formControlName=\"birthPlace\" /></label>\n          <label class=\"field\"><span class=\"field__label\">Nationalit\u00E9</span><input class=\"input\" formControlName=\"nationality\" /></label>\n          <label class=\"field\"><span class=\"field__label\">\u00C9cole pr\u00E9c\u00E9dente</span><input class=\"input\" formControlName=\"previousSchool\" /></label>\n        </div>\n      </section>\n\n      <section class=\"form-section\">\n        <h3>Responsable l\u00E9gal</h3>\n        <div class=\"form-grid\">\n          <label class=\"field\"><span class=\"field__label\">Pr\u00E9nom</span><input class=\"input\" formControlName=\"guardianFirstName\" /></label>\n          <label class=\"field\"><span class=\"field__label\">Nom</span><input class=\"input\" formControlName=\"guardianLastName\" /></label>\n          <label class=\"field\"><span class=\"field__label\">T\u00E9l\u00E9phone</span><input class=\"input\" type=\"tel\" formControlName=\"guardianPhone\" /></label>\n          <label class=\"field\"><span class=\"field__label\">Courriel</span><input class=\"input\" type=\"email\" formControlName=\"guardianEmail\" /></label>\n        </div>\n        <label class=\"field field--wide\"><span class=\"field__label\">Notes internes</span><textarea class=\"textarea\" rows=\"3\" formControlName=\"notes\"></textarea></label>\n      </section>\n    </form>\n    <footer class=\"drawer__foot\">\n      <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeCreate()\">Annuler</button>\n      <button type=\"button\" class=\"btn btn--primary\" [disabled]=\"createForm.invalid || saving()\" (click)=\"submitCreate()\">\n        {{ saving() ? 'Cr\u00E9ation\u2026' : 'Cr\u00E9er le dossier' }}\n      </button>\n    </footer>\n  </aside>\n}\n\n@if (detailOpen() && selected(); as application) {\n  <div class=\"drawer-backdrop\" (click)=\"closeDetails()\"></div>\n  <aside class=\"drawer drawer--detail\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"admission-detail-title\">\n    <header class=\"drawer__head\">\n      <div><p class=\"eyebrow\">{{ application.applicationNumber }}</p><h2 id=\"admission-detail-title\">{{ application.fullName }}</h2></div>\n      <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\" (click)=\"closeDetails()\">\u00D7</button>\n    </header>\n    <div class=\"drawer__body\">\n      <div class=\"detail-summary\">\n        <span class=\"status\" [attr.data-status]=\"application.status\">{{ statusLabel(application.status) }}</span>\n        <dl><div><dt>Niveau</dt><dd>{{ application.requestedLevelName }}</dd></div><div><dt>Classe</dt><dd>{{ application.reservedClassroomName || '\u00C0 d\u00E9finir' }}</dd></div><div><dt>Responsable</dt><dd>{{ application.guardianFullName || 'Non renseign\u00E9' }}</dd></div><div><dt>Contact</dt><dd>{{ application.guardianPhone || application.guardianEmail || '\u2014' }}</dd></div></dl>\n      </div>\n\n      <section class=\"detail-section\">\n        <div class=\"detail-section__head\"><div><h3>Pi\u00E8ces du dossier</h3><p>Les pi\u00E8ces obligatoires doivent \u00EAtre re\u00E7ues avant l\u2019acceptation.</p></div><strong>{{ documentProgress(application) }}</strong></div>\n        <div class=\"document-list\">\n          @for (document of application.documents; track document.id) {\n            <label class=\"document-item\" [class.document-item--received]=\"document.received\">\n              <input type=\"checkbox\" [checked]=\"document.received\"\n                     [disabled]=\"!canManage() || documentUpdating() !== null\"\n                     (change)=\"toggleDocument(document.id, $any($event.target).checked)\" />\n              <span><strong>{{ document.label }}</strong><small>{{ document.mandatory ? 'Obligatoire' : 'Facultatif' }}</small></span>\n              @if (documentUpdating() === document.id) { <span class=\"spinner\">\u2026</span> }\n            </label>\n          }\n        </div>\n      </section>\n\n      @if (canDecide() && nextStatuses(application).length > 0) {\n        <section class=\"detail-section workflow\" [formGroup]=\"workflowForm\">\n          <div class=\"detail-section__head\"><div><h3>Faire avancer le dossier</h3><p>Seules les transitions autoris\u00E9es sont propos\u00E9es.</p></div></div>\n          <label class=\"field\"><span class=\"field__label field__label--required\">Nouvel \u00E9tat</span>\n            <select class=\"select\" formControlName=\"status\"><option value=\"\">Choisir une action\u2026</option>@for (status of nextStatuses(application); track status.value) { <option [value]=\"status.value\">{{ status.label }}</option> }</select>\n          </label>\n          <div class=\"form-grid\">\n            <label class=\"field\"><span class=\"field__label\">Classe r\u00E9serv\u00E9e</span>\n              <select class=\"select\" formControlName=\"reservedClassroomId\"><option value=\"\">Aucune</option>@for (classroom of availableClassrooms(application); track classroom.id) { <option [value]=\"classroom.id\">{{ classroom.label }}</option> }</select>\n            </label>\n            <label class=\"field\"><span class=\"field__label\">Note du test</span><input class=\"input numeric\" type=\"number\" min=\"0\" step=\"0.25\" formControlName=\"entranceExamScore\" /></label>\n          </div>\n          <label class=\"field\"><span class=\"field__label\">Motif / observation</span><textarea class=\"textarea\" rows=\"3\" formControlName=\"reason\"></textarea></label>\n          <button type=\"button\" class=\"btn btn--primary\" [disabled]=\"workflowForm.invalid || saving()\" (click)=\"submitWorkflow()\">{{ saving() ? 'Enregistrement\u2026' : 'Confirmer l\u2019action' }}</button>\n        </section>\n      }\n\n      @if (application.decisionReason) {\n        <section class=\"decision-note\"><strong>Motif de d\u00E9cision</strong><p>{{ application.decisionReason }}</p></section>\n      }\n    </div>\n  </aside>\n}\n", styles: ["@import 'styles/tokens';\n\n.eyebrow { margin: 0 0 4px; color: var(--brand); font-size: var(--text-xs); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }\n\n.summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-3); margin-bottom: var(--space-5); }\n.summary { display: flex; align-items: center; justify-content: space-between; padding: var(--space-4); border-left: 3px solid var(--border); }\n.summary span { color: var(--text-muted); font-size: var(--text-sm); }\n.summary strong { color: var(--text-strong); font-size: var(--text-xl); }\n.summary--review { border-left-color: var(--info); }\n.summary--success { border-left-color: var(--success); }\n.summary--warning { border-left-color: var(--warning); }\n\n.board { overflow: hidden; }\n.filters { display: grid; grid-template-columns: minmax(220px, 1fr) repeat(3, minmax(145px, auto)) auto; gap: var(--space-2); padding: var(--space-4); border-bottom: 1px solid var(--border); }\n.search-field { position: relative; }\n.search-field > span { position: absolute; left: 11px; top: 50%; color: var(--text-light); transform: translateY(-50%); }\n.search-field .input { width: 100%; padding-left: 32px; }\n\n.table-wrap { overflow-x: auto; }\ntable { width: 100%; border-collapse: collapse; }\nth { padding: var(--space-3) var(--space-4); color: var(--text-light); font-size: var(--text-xs); text-align: left; text-transform: uppercase; background: var(--surface-sunken); }\ntd { padding: var(--space-3) var(--space-4); color: var(--text-muted); font-size: var(--text-sm); border-top: 1px solid var(--border-light); vertical-align: middle; }\ntd strong, td > span { display: block; color: var(--text-strong); }\ntd small { display: block; margin-top: 2px; color: var(--text-light); font-size: var(--text-xs); }\ntbody tr:hover { background: var(--surface-hover); }\n.number { font-family: var(--font-mono); font-size: var(--text-xs); }\n.empty { padding: var(--space-10); text-align: center; }\n\n.status { display: inline-flex; width: max-content; padding: 4px 9px; color: var(--text-muted); font-size: var(--text-xs); font-weight: 700; background: var(--surface-sunken); border-radius: var(--radius-pill); }\n.status[data-status='ACCEPTED'], .status[data-status='CONVERTED'] { color: var(--success); background: var(--success-bg); }\n.status[data-status='REJECTED'], .status[data-status='WITHDRAWN'] { color: var(--danger); background: var(--danger-bg); }\n.status[data-status='WAITLISTED'], .status[data-status='TESTED'] { color: var(--warning); background: var(--warning-bg); }\n.status[data-status='SUBMITTED'], .status[data-status='UNDER_REVIEW'] { color: var(--info); background: var(--info-bg); }\n.document-progress { color: var(--warning); font-size: var(--text-xs); font-weight: 700; }\n.document-progress--complete { color: var(--success); }\n\n.drawer-backdrop { position: fixed; z-index: 80; inset: 0; background: rgba(9, 25, 44, .42); backdrop-filter: blur(2px); }\n.drawer { position: fixed; z-index: 81; inset: 0 0 0 auto; display: flex; flex-direction: column; width: min(720px, 100vw); background: var(--surface-card); box-shadow: var(--shadow-xl); }\n.drawer--detail { width: min(600px, 100vw); }\n.drawer__head { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-3); padding: var(--space-5); border-bottom: 1px solid var(--border); }\n.drawer__head h2 { margin: 0; font-size: var(--text-xl); }\n.drawer__close { padding: 0; color: var(--text-muted); font-size: 1.6rem; line-height: 1; background: none; border: 0; cursor: pointer; }\n.drawer__body { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: var(--space-5); padding: var(--space-5); }\n.drawer__foot { display: flex; justify-content: flex-end; gap: var(--space-2); padding: var(--space-4) var(--space-5); border-top: 1px solid var(--border); }\n\n.form-section { padding-bottom: var(--space-4); border-bottom: 1px solid var(--border-light); }\n.form-section h3, .detail-section h3 { margin: 0 0 var(--space-3); font-size: var(--text-md); }\n.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }\n.field { display: flex; flex-direction: column; gap: 5px; }\n.field--wide { margin-top: var(--space-3); }\n.field .input, .field .select, .field .textarea { width: 100%; }\n\n.detail-summary { padding: var(--space-4); background: var(--surface-sunken); border-radius: var(--radius-card); }\n.detail-summary dl { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin: var(--space-4) 0 0; }\n.detail-summary dt { color: var(--text-light); font-size: var(--text-xs); }\n.detail-summary dd { margin: 2px 0 0; color: var(--text-strong); font-size: var(--text-sm); font-weight: 650; }\n.detail-section { padding: var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-card); }\n.detail-section__head { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-3); margin-bottom: var(--space-3); }\n.detail-section__head h3 { margin-bottom: 2px; }\n.detail-section__head p { margin: 0; color: var(--text-light); font-size: var(--text-xs); }\n.document-list { display: flex; flex-direction: column; gap: var(--space-2); }\n.document-item { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--warning-bg); border-radius: var(--radius-input); cursor: pointer; }\n.document-item--received { background: var(--success-bg); }\n.document-item span:nth-child(2) { flex: 1; }\n.document-item strong, .document-item small { display: block; }\n.document-item small { margin-top: 2px; color: var(--text-light); font-size: var(--text-xs); }\n.workflow { display: flex; flex-direction: column; gap: var(--space-3); }\n.decision-note { padding: var(--space-4); color: var(--text-muted); background: var(--brand-tint); border-radius: var(--radius-card); }\n.decision-note p { margin: 5px 0 0; }\n\n@include tablet {\n  .summary-grid { grid-template-columns: 1fr 1fr; }\n  .filters { grid-template-columns: 1fr 1fr; }\n}\n\n@include mobile {\n  .summary-grid, .form-grid, .detail-summary dl { grid-template-columns: 1fr; }\n  .filters { grid-template-columns: 1fr; }\n  .drawer__body { padding: var(--space-4); }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdmissionsComponent, { className: "AdmissionsComponent", filePath: "frontend/src/app/features/admissions/admissions.component.ts", lineNumber: 29 }); })();
function optional(value) {
    const trimmed = value.trim();
    return trimmed || undefined;
}
//# sourceMappingURL=admissions.component.js.map