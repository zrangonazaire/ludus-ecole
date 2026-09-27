import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CLASSROOM_DATA_SOURCE, OFFICIAL_DOCUMENT_DATA_SOURCE, REFERENCE_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { OFFICIAL_DOCUMENT_TEMPLATES } from '@core/models/official-document.models';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.type;
const _forTrack1 = ($index, $item) => $item.id;
const _c0 = a0 => ({ $implicit: a0 });
function StudentFilesComponent_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 14);
} }
function StudentFilesComponent_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 16);
    i0.ɵɵlistener("retry", function StudentFilesComponent_Conditional_28_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.load()); });
    i0.ɵɵelementEnd();
} }
function StudentFilesComponent_Conditional_29_Conditional_0_For_12_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 59);
    i0.ɵɵtext(1, "\u2713");
    i0.ɵɵelementEnd();
} }
function StudentFilesComponent_Conditional_29_Conditional_0_For_12_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 56);
    i0.ɵɵlistener("click", function StudentFilesComponent_Conditional_29_Conditional_0_For_12_Template_button_click_0_listener() { const template_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.chooseTemplate(template_r6.type)); });
    i0.ɵɵelementStart(1, "span", 57);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 58)(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, StudentFilesComponent_Conditional_29_Conditional_0_For_12_Conditional_8_Template, 2, 0, "span", 59);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const template_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("template-card--on", ctx_r2.issueForm.controls.type.value === template_r6.type);
    i0.ɵɵattribute("data-tone", template_r6.tone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(template_r6.shortCode);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(template_r6.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(template_r6.description);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.issueForm.controls.type.value === template_r6.type ? 8 : -1);
} }
function StudentFilesComponent_Conditional_29_Conditional_0_For_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", classroom_r7.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(classroom_r7.name);
} }
function StudentFilesComponent_Conditional_29_Conditional_0_For_33_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 60);
    i0.ɵɵlistener("click", function StudentFilesComponent_Conditional_29_Conditional_0_For_33_Template_button_click_0_listener() { const student_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.chooseStudent(student_r9.id)); });
    i0.ɵɵelementStart(1, "span", 61);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 62)(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small", 63);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 64);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(10, "span", 65);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const student_r9 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("student-row--on", ctx_r2.selectedStudentId() === student_r9.id);
    i0.ɵɵattribute("aria-selected", ctx_r2.selectedStudentId() === student_r9.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", student_r9.firstName.charAt(0), "", student_r9.lastName.charAt(0), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(student_r9.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(student_r9.studentNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(student_r9.classroomName || "Sans classe");
} }
function StudentFilesComponent_Conditional_29_Conditional_0_ForEmpty_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1, "Aucun \u00E9l\u00E8ve ne correspond \u00E0 cette recherche.");
    i0.ɵɵelementEnd();
} }
function StudentFilesComponent_Conditional_29_Conditional_0_Conditional_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "label", 66);
    i0.ɵɵtext(2, "Motif");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "input", 67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 68)(5, "div", 36)(6, "label", 69);
    i0.ɵɵtext(7, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 36)(10, "label", 71);
    i0.ɵɵtext(11, "Heure");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 72);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 36)(14, "label", 73);
    i0.ɵɵtext(15, "Lieu");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "input", 74);
    i0.ɵɵelementEnd()();
} }
function StudentFilesComponent_Conditional_29_Conditional_0_Conditional_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35)(1, "div", 36)(2, "label", 75);
    i0.ɵɵtext(3, "Destinataire");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 36)(6, "label", 77);
    i0.ɵɵtext(7, "Motif ou usage");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 78);
    i0.ɵɵelementEnd()();
} }
function StudentFilesComponent_Conditional_29_Conditional_0_Conditional_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 44);
    i0.ɵɵtext(1, " Votre profil peut consulter le registre, mais ne peut pas \u00E9mettre de document. ");
    i0.ɵɵelementEnd();
} }
function StudentFilesComponent_Conditional_29_Conditional_0_Conditional_84_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function StudentFilesComponent_Conditional_29_Conditional_0_Conditional_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, StudentFilesComponent_Conditional_29_Conditional_0_Conditional_84_ng_container_0_Template, 1, 0, "ng-container", 79);
} if (rf & 2) {
    i0.ɵɵnextContext(3);
    const officialSheet_r10 = i0.ɵɵreference(32);
    i0.ɵɵproperty("ngTemplateOutlet", officialSheet_r10)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, ctx));
} }
function StudentFilesComponent_Conditional_29_Conditional_0_Conditional_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 55);
    i0.ɵɵtext(1, "S\u00E9lectionnez un \u00E9l\u00E8ve pour afficher le document.");
    i0.ɵɵelementEnd();
} }
function StudentFilesComponent_Conditional_29_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17)(1, "section", 19)(2, "header", 20)(3, "span", 21);
    i0.ɵɵtext(4, "1");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "h2");
    i0.ɵɵtext(7, "Choisir le document");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9, "Le texte officiel et les champs utiles s\u2019adaptent au mod\u00E8le.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 22);
    i0.ɵɵrepeaterCreate(11, StudentFilesComponent_Conditional_29_Conditional_0_For_12_Template, 9, 7, "button", 23, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "header", 24)(14, "span", 21);
    i0.ɵɵtext(15, "2");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div")(17, "h2");
    i0.ɵɵtext(18, "S\u00E9lectionner l\u2019\u00E9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p");
    i0.ɵɵtext(20, "L\u2019identit\u00E9 et l\u2019inscription sont reprises du dossier scolaire.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 25)(22, "div", 26)(23, "span", 10);
    i0.ɵɵtext(24, "\u2315");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "input", 27);
    i0.ɵɵlistener("input", function StudentFilesComponent_Conditional_29_Conditional_0_Template_input_input_25_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.studentSearch.set($event.target.value)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "select", 28);
    i0.ɵɵlistener("change", function StudentFilesComponent_Conditional_29_Conditional_0_Template_select_change_26_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.classroomFilter.set($event.target.value)); });
    i0.ɵɵelementStart(27, "option", 29);
    i0.ɵɵtext(28, "Toutes les classes");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(29, StudentFilesComponent_Conditional_29_Conditional_0_For_30_Template, 2, 2, "option", 30, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div", 31);
    i0.ɵɵrepeaterCreate(32, StudentFilesComponent_Conditional_29_Conditional_0_For_33_Template, 11, 8, "button", 32, _forTrack1, false, StudentFilesComponent_Conditional_29_Conditional_0_ForEmpty_34_Template, 2, 0, "div", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "header", 24)(36, "span", 21);
    i0.ɵɵtext(37, "3");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "div")(39, "h2");
    i0.ɵɵtext(40, "Compl\u00E9ter les mentions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "p");
    i0.ɵɵtext(42, "Seules les informations utiles au mod\u00E8le choisi sont imprim\u00E9es.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(43, "form", 34)(44, "div", 35)(45, "div", 36)(46, "label", 37);
    i0.ɵɵtext(47, " Date de d\u00E9livrance ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(48, "input", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "div", 36)(50, "label", 39);
    i0.ɵɵtext(51, "Valable jusqu\u2019au");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(52, "input", 40);
    i0.ɵɵelementStart(53, "span", 41);
    i0.ɵɵtext(54, "Laissez vide si la pi\u00E8ce n\u2019expire pas.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(55, StudentFilesComponent_Conditional_29_Conditional_0_Conditional_55_Template, 17, 0)(56, StudentFilesComponent_Conditional_29_Conditional_0_Conditional_56_Template, 9, 0, "div", 35);
    i0.ɵɵelementStart(57, "div", 36)(58, "label", 42);
    i0.ɵɵtext(59, "Mention compl\u00E9mentaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(60, "textarea", 43);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(61, StudentFilesComponent_Conditional_29_Conditional_0_Conditional_61_Template, 2, 0, "p", 44);
    i0.ɵɵelementStart(62, "footer", 45)(63, "div", 46)(64, "span", 47);
    i0.ɵɵtext(65, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "span");
    i0.ɵɵtext(67, "Le num\u00E9ro et le code d\u2019authenticit\u00E9 sont attribu\u00E9s au moment de l\u2019\u00E9mission.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(68, "button", 48);
    i0.ɵɵlistener("click", function StudentFilesComponent_Conditional_29_Conditional_0_Template_button_click_68_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.issue(false)); });
    i0.ɵɵtext(69);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "button", 49);
    i0.ɵɵlistener("click", function StudentFilesComponent_Conditional_29_Conditional_0_Template_button_click_70_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.issue(true)); });
    i0.ɵɵelementStart(71, "span", 10);
    i0.ɵɵtext(72, "\u25A3");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(73);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(74, "aside", 50)(75, "header", 51)(76, "div")(77, "span", 52);
    i0.ɵɵtext(78, "Aper\u00E7u avant \u00E9mission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(79, "strong");
    i0.ɵɵtext(80, "A4 \u00B7 Portrait");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(81, "span", 53);
    i0.ɵɵtext(82, "72 %");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(83, "div", 54);
    i0.ɵɵtemplate(84, StudentFilesComponent_Conditional_29_Conditional_0_Conditional_84_Template, 1, 4, "ng-container")(85, StudentFilesComponent_Conditional_29_Conditional_0_Conditional_85_Template, 2, 0, "div", 55);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_15_0;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(11);
    i0.ɵɵrepeater(ctx_r2.templates);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("value", ctx_r2.studentSearch());
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.classroomFilter());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.classrooms());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.visibleStudents());
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("formGroup", ctx_r2.issueForm);
    i0.ɵɵadvance(12);
    i0.ɵɵconditional(ctx_r2.issueForm.controls.type.value === "SUMMONS" ? 55 : 56);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(!ctx_r2.canGenerate() ? 61 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", !ctx_r2.readyToIssue());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.saving() ? "\u00C9mission..." : "\u00C9mettre sans imprimer", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.readyToIssue());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.saving() ? "Pr\u00E9paration..." : "\u00C9mettre et imprimer", " ");
    i0.ɵɵadvance(11);
    i0.ɵɵconditional((tmp_15_0 = ctx_r2.previewDocument()) ? 84 : 85, tmp_15_0);
} }
function StudentFilesComponent_Conditional_29_Conditional_1_For_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const template_r12 = ctx.$implicit;
    i0.ɵɵproperty("value", template_r12.type);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(template_r12.label);
} }
function StudentFilesComponent_Conditional_29_Conditional_1_For_62_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 100);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(document_r14.revokeReason);
} }
function StudentFilesComponent_Conditional_29_Conditional_1_For_62_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 104);
    i0.ɵɵlistener("click", function StudentFilesComponent_Conditional_29_Conditional_1_For_62_Conditional_22_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r15); const document_r14 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openRevoke(document_r14)); });
    i0.ɵɵtext(1, "R\u00E9voquer");
    i0.ɵɵelementEnd();
} }
function StudentFilesComponent_Conditional_29_Conditional_1_For_62_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "span", 97);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 98);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td")(7, "span", 97);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 98);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 63);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td")(16, "span", 99);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, StudentFilesComponent_Conditional_29_Conditional_1_For_62_Conditional_18_Template, 2, 1, "span", 100);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 101)(20, "button", 102);
    i0.ɵɵlistener("click", function StudentFilesComponent_Conditional_29_Conditional_1_For_62_Template_button_click_20_listener() { const document_r14 = i0.ɵɵrestoreView(_r13).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.print(document_r14)); });
    i0.ɵɵtext(21, "R\u00E9imprimer");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(22, StudentFilesComponent_Conditional_29_Conditional_1_For_62_Conditional_22_Template, 2, 0, "button", 103);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const document_r14 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("register-table__revoked", document_r14.status === "REVOKED");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r14.typeLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(document_r14.documentNumber);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r14.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(document_r14.studentNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(document_r14.classroomName || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.shortDate(document_r14.issuedAt));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-status", document_r14.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.statusLabel(document_r14.status), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(document_r14.revokeReason ? 18 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(document_r14.status === "ISSUED" && ctx_r2.canGenerate() ? 22 : -1);
} }
function StudentFilesComponent_Conditional_29_Conditional_1_ForEmpty_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 105)(2, "div", 106)(3, "span", 10);
    i0.ɵɵtext(4, "\u25A4");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6, "Aucun document trouv\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8, "\u00C9mettez un premier document ou ajustez les filtres.");
    i0.ɵɵelementEnd()()()();
} }
function StudentFilesComponent_Conditional_29_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 80)(1, "article", 81)(2, "span", 82);
    i0.ɵɵtext(3, "\u25A4");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "strong", 63);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8, "documents enregistr\u00E9s");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "article", 81)(10, "span", 83);
    i0.ɵɵtext(11, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div")(13, "strong", 63);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span");
    i0.ɵɵtext(16, "documents valides");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "article", 81)(18, "span", 84);
    i0.ɵɵtext(19, "\u00D7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div")(21, "strong", 63);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span");
    i0.ɵɵtext(24, "documents r\u00E9voqu\u00E9s");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(25, "section", 85)(26, "header", 86)(27, "div")(28, "h2");
    i0.ɵɵtext(29, "Registre d\u2019\u00E9mission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "p");
    i0.ɵɵtext(31, "Une pi\u00E8ce \u00E9mise reste tra\u00E7able, m\u00EAme apr\u00E8s sa r\u00E9vocation.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div", 87)(33, "div", 88)(34, "span", 10);
    i0.ɵɵtext(35, "\u2315");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "input", 89);
    i0.ɵɵlistener("input", function StudentFilesComponent_Conditional_29_Conditional_1_Template_input_input_36_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.historySearch.set($event.target.value)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "select", 90);
    i0.ɵɵlistener("change", function StudentFilesComponent_Conditional_29_Conditional_1_Template_select_change_37_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.historyType.set($event.target.value)); });
    i0.ɵɵelementStart(38, "option", 29);
    i0.ɵɵtext(39, "Tous les documents");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(40, StudentFilesComponent_Conditional_29_Conditional_1_For_41_Template, 2, 2, "option", 30, _forTrack0);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(42, "div", 91)(43, "table", 92)(44, "caption", 93);
    i0.ɵɵtext(45, "Documents officiels \u00E9mis");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "thead")(47, "tr")(48, "th", 94);
    i0.ɵɵtext(49, "Document");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "th", 94);
    i0.ɵɵtext(51, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "th", 94);
    i0.ɵɵtext(53, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "th", 94);
    i0.ɵɵtext(55, "D\u00E9livr\u00E9 le");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "th", 94);
    i0.ɵɵtext(57, "\u00C9tat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "th", 95);
    i0.ɵɵtext(59, "Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(60, "tbody");
    i0.ɵɵrepeaterCreate(61, StudentFilesComponent_Conditional_29_Conditional_1_For_62_Template, 23, 12, "tr", 96, _forTrack1, false, StudentFilesComponent_Conditional_29_Conditional_1_ForEmpty_63_Template, 9, 0, "tr");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.documents().length);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.issuedCount());
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.revokedCount());
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("value", ctx_r2.historySearch());
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.historyType());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.templates);
    i0.ɵɵadvance(21);
    i0.ɵɵrepeater(ctx_r2.visibleDocuments());
} }
function StudentFilesComponent_Conditional_29_Conditional_2_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 110);
    i0.ɵɵtext(1, "Lecture seule");
    i0.ɵɵelementEnd();
} }
function StudentFilesComponent_Conditional_29_Conditional_2_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 115);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("src", ctx_r2.layoutForm.controls.logoDataUrl.value, i0.ɵɵsanitizeUrl);
} }
function StudentFilesComponent_Conditional_29_Conditional_2_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.layoutForm.controls.schoolName.value.charAt(0) || "E");
} }
function StudentFilesComponent_Conditional_29_Conditional_2_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 102);
    i0.ɵɵlistener("click", function StudentFilesComponent_Conditional_29_Conditional_2_Conditional_28_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.removeLogo()); });
    i0.ɵɵtext(1, "Retirer");
    i0.ɵɵelementEnd();
} }
function StudentFilesComponent_Conditional_29_Conditional_2_Conditional_109_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 155);
    i0.ɵɵtext(1, "Le mod\u00E8le doit contenir {seq} ou {seq:n}.");
    i0.ɵɵelementEnd();
} }
function StudentFilesComponent_Conditional_29_Conditional_2_Conditional_156_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function StudentFilesComponent_Conditional_29_Conditional_2_Conditional_156_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, StudentFilesComponent_Conditional_29_Conditional_2_Conditional_156_ng_container_0_Template, 1, 0, "ng-container", 79);
} if (rf & 2) {
    i0.ɵɵnextContext(3);
    const officialSheet_r10 = i0.ɵɵreference(32);
    i0.ɵɵproperty("ngTemplateOutlet", officialSheet_r10)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, ctx));
} }
function StudentFilesComponent_Conditional_29_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 18)(1, "section", 107)(2, "header", 108)(3, "div")(4, "span", 109);
    i0.ɵɵtext(5, "Param\u00E8tres de l\u2019\u00E9tablissement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2");
    i0.ɵɵtext(7, "Papier \u00E0 en-t\u00EAte officiel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9, "Ces r\u00E9glages s\u2019appliqueront uniquement aux prochains documents.");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, StudentFilesComponent_Conditional_29_Conditional_2_Conditional_10_Template, 2, 0, "span", 110);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "form", 111)(12, "fieldset", 112)(13, "legend");
    i0.ɵɵtext(14, "Identit\u00E9 visuelle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 113)(16, "div", 114);
    i0.ɵɵtemplate(17, StudentFilesComponent_Conditional_29_Conditional_2_Conditional_17_Template, 1, 1, "img", 115)(18, StudentFilesComponent_Conditional_29_Conditional_2_Conditional_18_Template, 2, 1, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 116)(20, "strong");
    i0.ɵɵtext(21, "Logo de l\u2019\u00E9tablissement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "small");
    i0.ɵɵtext(23, "PNG, JPG ou SVG \u00B7 500 Ko maximum");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 117)(25, "label", 118);
    i0.ɵɵtext(26, "Choisir un logo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "input", 119);
    i0.ɵɵlistener("change", function StudentFilesComponent_Conditional_29_Conditional_2_Template_input_change_27_listener($event) { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onLogoSelected($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(28, StudentFilesComponent_Conditional_29_Conditional_2_Conditional_28_Template, 2, 0, "button", 120);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "label", 121)(30, "span");
    i0.ɵɵtext(31, "Couleur officielle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span", 122);
    i0.ɵɵelement(33, "input", 123)(34, "input", 124);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(35, "div", 35)(36, "div", 36)(37, "label", 125);
    i0.ɵɵtext(38, " Nom affich\u00E9 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(39, "input", 126);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 36)(41, "label", 127);
    i0.ɵɵtext(42, "D\u00E9nomination l\u00E9gale");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(43, "input", 128);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "div", 35)(45, "div", 36)(46, "label", 129);
    i0.ɵɵtext(47, "Devise");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(48, "input", 130);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "div", 36)(50, "label", 131);
    i0.ɵɵtext(51, " N\u00B0 d\u2019autorisation / agr\u00E9ment ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(52, "input", 132);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(53, "fieldset", 112)(54, "legend");
    i0.ɵɵtext(55, "En-t\u00EAte institutionnel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "div", 35)(57, "div", 36)(58, "label", 133);
    i0.ɵɵtext(59, "Bloc gauche");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(60, "textarea", 134);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "div", 36)(62, "label", 135);
    i0.ɵɵtext(63, "Bloc droit");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(64, "textarea", 136);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "div", 35)(66, "div", 36)(67, "label", 137);
    i0.ɵɵtext(68, "Adresse");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(69, "input", 138);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "div", 36)(71, "label", 139);
    i0.ɵɵtext(72, "Ville");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(73, "input", 140);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(74, "div", 68)(75, "div", 36)(76, "label", 141);
    i0.ɵɵtext(77, "T\u00E9l\u00E9phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(78, "input", 142);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(79, "div", 36)(80, "label", 143);
    i0.ɵɵtext(81, "E-mail");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(82, "input", 144);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(83, "div", 36)(84, "label", 145);
    i0.ɵɵtext(85, "Site web");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(86, "input", 146);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(87, "fieldset", 112)(88, "legend");
    i0.ɵɵtext(89, "Signature, pied de page et s\u00E9curit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(90, "div", 35)(91, "div", 36)(92, "label", 147);
    i0.ɵɵtext(93, "Nom du signataire");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(94, "input", 148);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(95, "div", 36)(96, "label", 149);
    i0.ɵɵtext(97, " Fonction du signataire ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(98, "input", 150);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(99, "div", 36)(100, "label", 151);
    i0.ɵɵtext(101, "Texte du pied de page");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(102, "textarea", 152);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(103, "div", 36)(104, "label", 153);
    i0.ɵɵtext(105, " Num\u00E9rotation ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(106, "input", 154);
    i0.ɵɵelementStart(107, "span", 41);
    i0.ɵɵtext(108, " Variables : {year}, {yy}, {schoolCode} et {seq:6}. Exemple : DOC-2026-000123. ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(109, StudentFilesComponent_Conditional_29_Conditional_2_Conditional_109_Template, 2, 0, "span", 155);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(110, "div", 156)(111, "label", 157);
    i0.ɵɵelement(112, "input", 158);
    i0.ɵɵelementStart(113, "span")(114, "strong");
    i0.ɵɵtext(115, "Afficher le logo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(116, "small");
    i0.ɵɵtext(117, "Dans le bloc central de l\u2019en-t\u00EAte");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(118, "label", 157);
    i0.ɵɵelement(119, "input", 159);
    i0.ɵɵelementStart(120, "span")(121, "strong");
    i0.ɵɵtext(122, "Afficher la devise");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(123, "small");
    i0.ɵɵtext(124, "Sous le nom de l\u2019\u00E9tablissement");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(125, "label", 157);
    i0.ɵɵelement(126, "input", 160);
    i0.ɵɵelementStart(127, "span")(128, "strong");
    i0.ɵɵtext(129, "Zone de signature");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(130, "small");
    i0.ɵɵtext(131, "R\u00E9serve une zone pour le cachet");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(132, "label", 157);
    i0.ɵɵelement(133, "input", 161);
    i0.ɵɵelementStart(134, "span")(135, "strong");
    i0.ɵɵtext(136, "Code d\u2019authenticit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(137, "small");
    i0.ɵɵtext(138, "Identifiant unique v\u00E9rifiable");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(139, "footer", 162)(140, "p");
    i0.ɵɵtext(141, " Les documents d\u00E9j\u00E0 \u00E9mis conservent leur ancien en-t\u00EAte afin de rester identiques aux exemplaires remis. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(142, "button", 48);
    i0.ɵɵlistener("click", function StudentFilesComponent_Conditional_29_Conditional_2_Template_button_click_142_listener() { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.cancelLayoutChanges()); });
    i0.ɵɵtext(143, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(144, "button", 49);
    i0.ɵɵlistener("click", function StudentFilesComponent_Conditional_29_Conditional_2_Template_button_click_144_listener() { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.saveLayout()); });
    i0.ɵɵtext(145);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(146, "aside", 163)(147, "header", 51)(148, "div")(149, "span", 52);
    i0.ɵɵtext(150, "Aper\u00E7u en direct");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(151, "strong");
    i0.ɵɵtext(152);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(153, "span", 164);
    i0.ɵɵtext(154, "En direct");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(155, "div", 54);
    i0.ɵɵtemplate(156, StudentFilesComponent_Conditional_29_Conditional_2_Conditional_156_Template, 1, 4, "ng-container");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_15_0;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵconditional(!ctx_r2.canConfigure() ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r2.layoutForm);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.canConfigure());
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r2.layoutForm.controls.logoDataUrl.value && ctx_r2.layoutForm.controls.showLogo.value ? 17 : 18);
    i0.ɵɵadvance(11);
    i0.ɵɵconditional(ctx_r2.layoutForm.controls.logoDataUrl.value ? 28 : -1);
    i0.ɵɵadvance(25);
    i0.ɵɵproperty("disabled", !ctx_r2.canConfigure());
    i0.ɵɵadvance(34);
    i0.ɵɵproperty("disabled", !ctx_r2.canConfigure());
    i0.ɵɵadvance(22);
    i0.ɵɵconditional(ctx_r2.layoutForm.controls.documentNumberPattern.invalid ? 109 : -1);
    i0.ɵɵadvance(33);
    i0.ɵɵproperty("disabled", ctx_r2.layoutForm.pristine || ctx_r2.saving());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.layoutForm.invalid || ctx_r2.layoutForm.pristine || ctx_r2.saving() || !ctx_r2.canConfigure());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.saving() ? "Enregistrement..." : "Enregistrer la mise en page", " ");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.selectedTemplate().label);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional((tmp_15_0 = ctx_r2.previewDocument()) ? 156 : -1, tmp_15_0);
} }
function StudentFilesComponent_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, StudentFilesComponent_Conditional_29_Conditional_0_Template, 86, 11, "div", 17)(1, StudentFilesComponent_Conditional_29_Conditional_1_Template, 64, 6)(2, StudentFilesComponent_Conditional_29_Conditional_2_Template, 157, 13, "div", 18);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r2.tab() === "CREATE" ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.tab() === "REGISTER" ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.tab() === "SETTINGS" ? 2 : -1);
} }
function StudentFilesComponent_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 165);
    i0.ɵɵlistener("click", function StudentFilesComponent_Conditional_30_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeRevoke()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 166)(2, "div", 167);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2", 168);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, " Le document restera dans le registre, mais son code de v\u00E9rification indiquera qu\u2019il n\u2019est plus valable. Cette action ne se supprime pas. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "form", 169)(9, "div", 36)(10, "label", 170);
    i0.ɵɵtext(11, "Motif");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "textarea", 171);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 172)(14, "button", 7);
    i0.ɵɵlistener("click", function StudentFilesComponent_Conditional_30_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeRevoke()); });
    i0.ɵɵtext(15, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 173);
    i0.ɵɵlistener("click", function StudentFilesComponent_Conditional_30_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r18); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.revoke()); });
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("R\u00E9voquer ", ctx.documentNumber, " ?");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r2.revokeForm);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("disabled", ctx_r2.revokeForm.invalid || ctx_r2.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.saving() ? "R\u00E9vocation..." : "Confirmer la r\u00E9vocation", " ");
} }
function StudentFilesComponent_ng_template_31_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 175);
    i0.ɵɵtext(1, "APER\u00C7U");
    i0.ɵɵelementEnd();
} }
function StudentFilesComponent_ng_template_31_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 176);
    i0.ɵɵtext(1, "R\u00C9VOQU\u00C9");
    i0.ɵɵelementEnd();
} }
function StudentFilesComponent_ng_template_31_Conditional_7_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 192);
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("src", document_r19.layout.logoDataUrl, i0.ɵɵsanitizeUrl);
} }
function StudentFilesComponent_ng_template_31_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 193);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", document_r19.layout.schoolName.charAt(0), " ");
} }
function StudentFilesComponent_ng_template_31_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, StudentFilesComponent_ng_template_31_Conditional_7_Conditional_0_Template, 1, 1, "img", 192)(1, StudentFilesComponent_ng_template_31_Conditional_7_Conditional_1_Template, 2, 1, "span", 193);
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵconditional(document_r19.layout.logoDataUrl ? 0 : 1);
} }
function StudentFilesComponent_ng_template_31_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(document_r19.layout.legalName);
} }
function StudentFilesComponent_ng_template_31_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "em");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u00AB ", document_r19.layout.motto, " \u00BB");
} }
function StudentFilesComponent_ng_template_31_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", document_r19.layout.city, " ");
} }
function StudentFilesComponent_ng_template_31_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" T\u00E9l. ", document_r19.layout.phone, " ");
} }
function StudentFilesComponent_ng_template_31_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", document_r19.layout.email, " ");
} }
function StudentFilesComponent_ng_template_31_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(document_r19.layout.registrationNumber);
} }
function StudentFilesComponent_ng_template_31_Conditional_28_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u00E0 ");
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(document_r19.birthPlace);
} }
function StudentFilesComponent_ng_template_31_Conditional_28_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " \u00E0 l\u2019attention de ");
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(document_r19.metadata.recipient);
} }
function StudentFilesComponent_ng_template_31_Conditional_28_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " pour ");
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(document_r19.metadata.purpose);
} }
function StudentFilesComponent_ng_template_31_Conditional_28_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " pour servir et valoir ce que de droit ");
} }
function StudentFilesComponent_ng_template_31_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 184)(1, "p");
    i0.ɵɵtext(2, " Je soussign\u00E9(e), ");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 194);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9, " matricule ");
    i0.ɵɵelementStart(10, "strong", 63);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12);
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, StudentFilesComponent_ng_template_31_Conditional_28_Conditional_15_Template, 3, 1, "strong");
    i0.ɵɵtext(16, ", est r\u00E9guli\u00E8rement inscrit(e) en classe de ");
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(19, " au titre de l\u2019ann\u00E9e scolaire ");
    i0.ɵɵelementStart(20, "strong");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(22, ". ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "p");
    i0.ɵɵtext(24, " Le pr\u00E9sent certificat lui est d\u00E9livr\u00E9 ");
    i0.ɵɵtemplate(25, StudentFilesComponent_ng_template_31_Conditional_28_Conditional_25_Template, 3, 1, "strong")(26, StudentFilesComponent_ng_template_31_Conditional_28_Conditional_26_Template, 3, 1, "strong")(27, StudentFilesComponent_ng_template_31_Conditional_28_Conditional_27_Template, 1, 0);
    i0.ɵɵtext(28, ". ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(document_r19.layout.signatoryName || document_r19.layout.signatoryTitle);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(", ", document_r19.layout.signatoryTitle, ", certifie que ", ctx_r2.salutation(document_r19), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(document_r19.studentName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(document_r19.studentNumber);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(", ", ctx_r2.bornLabel(document_r19), " le ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatDate(document_r19.birthDate));
    i0.ɵɵadvance();
    i0.ɵɵconditional(document_r19.birthPlace ? 15 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r19.classroomName || document_r19.levelName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r19.academicYearCode);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(document_r19.metadata.recipient ? 25 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(document_r19.metadata.purpose ? 26 : 27);
} }
function StudentFilesComponent_ng_template_31_Conditional_29_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "R\u00E9f\u00E9rence d\u2019inscription : ");
    i0.ɵɵelementStart(2, "strong", 63);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, ".");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r19.enrollmentNumber);
} }
function StudentFilesComponent_ng_template_31_Conditional_29_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵtextInterpolate1(" pour ", document_r19.metadata.purpose, " ");
} }
function StudentFilesComponent_ng_template_31_Conditional_29_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " pour servir et valoir ce que de droit ");
} }
function StudentFilesComponent_ng_template_31_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 184)(1, "p");
    i0.ɵɵtext(2, " La direction de ");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " atteste que l\u2019inscription administrative de ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 194);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9, " sous le matricule ");
    i0.ɵɵelementStart(10, "strong", 63);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12, ", est enregistr\u00E9e pour l\u2019ann\u00E9e scolaire ");
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(15, ", en classe de ");
    i0.ɵɵelementStart(16, "strong");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(18, ". ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, StudentFilesComponent_ng_template_31_Conditional_29_Conditional_19_Template, 5, 1, "p");
    i0.ɵɵelementStart(20, "p");
    i0.ɵɵtext(21, " La pr\u00E9sente attestation est d\u00E9livr\u00E9e ");
    i0.ɵɵtemplate(22, StudentFilesComponent_ng_template_31_Conditional_29_Conditional_22_Template, 1, 1)(23, StudentFilesComponent_ng_template_31_Conditional_29_Conditional_23_Template, 1, 0);
    i0.ɵɵtext(24, ". ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(document_r19.layout.schoolName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r19.studentName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(document_r19.studentNumber);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r19.academicYearCode);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r19.classroomName);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(document_r19.enrollmentNumber ? 19 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(document_r19.metadata.purpose ? 22 : 23);
} }
function StudentFilesComponent_ng_template_31_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 185)(1, "h2", 195);
    i0.ɵɵtext(2, "Identit\u00E9 de l\u2019\u00E9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dl", 196)(4, "div")(5, "dt");
    i0.ɵɵtext(6, "Nom et pr\u00E9noms");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "dd");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div")(10, "dt");
    i0.ɵɵtext(11, "Matricule");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "dd", 63);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div")(15, "dt");
    i0.ɵɵtext(16, "Date de naissance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "dd");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div")(20, "dt");
    i0.ɵɵtext(21, "Lieu de naissance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "dd");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div")(25, "dt");
    i0.ɵɵtext(26, "Nationalit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "dd");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div")(30, "dt");
    i0.ɵɵtext(31, "Sexe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "dd");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "h2", 195);
    i0.ɵɵtext(35, "Situation scolaire actuelle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "dl", 196)(37, "div")(38, "dt");
    i0.ɵɵtext(39, "Ann\u00E9e scolaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "dd");
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(42, "div")(43, "dt");
    i0.ɵɵtext(44, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "dd");
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "div")(48, "dt");
    i0.ɵɵtext(49, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "dd");
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(52, "div")(53, "dt");
    i0.ɵɵtext(54, "N\u00B0 d\u2019inscription");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "dd", 63);
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(document_r19.studentName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(document_r19.studentNumber);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.formatDate(document_r19.birthDate));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(document_r19.birthPlace || "Non renseign\u00E9");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(document_r19.nationality || "Non renseign\u00E9e");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(document_r19.gender === "FEMALE" ? "F\u00E9minin" : "Masculin");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(document_r19.academicYearCode);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(document_r19.classroomName || "Non affect\u00E9(e)");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(document_r19.levelName || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(document_r19.enrollmentNumber || "\u2014");
} }
function StudentFilesComponent_ng_template_31_Conditional_31_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2, ", ");
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(document_r19.metadata.recipient);
} }
function StudentFilesComponent_ng_template_31_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 184)(1, "p");
    i0.ɵɵtemplate(2, StudentFilesComponent_ng_template_31_Conditional_31_Conditional_2_Template, 3, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, " Madame, Monsieur,");
    i0.ɵɵelement(5, "br")(6, "br");
    i0.ɵɵtext(7, "Vous \u00EAtes pri\u00E9(e) de bien vouloir vous pr\u00E9senter \u00E0 ");
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10, " au sujet de l\u2019\u00E9l\u00E8ve ");
    i0.ɵɵelementStart(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13, ", matricule ");
    i0.ɵɵelementStart(14, "strong", 63);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(16, ". ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "dl", 197)(18, "div")(19, "dt");
    i0.ɵɵtext(20, "Motif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "dd");
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div")(24, "dt");
    i0.ɵɵtext(25, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "dd");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div")(29, "dt");
    i0.ɵɵtext(30, "Heure");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "dd");
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div")(34, "dt");
    i0.ɵɵtext(35, "Lieu");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "dd");
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(38, "p");
    i0.ɵɵtext(39, "Votre pr\u00E9sence est vivement souhait\u00E9e. Nous vous remercions de votre ponctualit\u00E9.");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(document_r19.metadata.recipient ? 2 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(document_r19.layout.schoolName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r19.studentName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r19.studentNumber);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(document_r19.metadata.purpose || "Entretien scolaire");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.formatDate(document_r19.metadata.meetingDate));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(document_r19.metadata.meetingTime || "\u00C0 convenir");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(document_r19.metadata.meetingPlace || "Administration");
} }
function StudentFilesComponent_ng_template_31_Conditional_32_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 200);
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("src", document_r19.photoUrl, i0.ɵɵsanitizeUrl);
} }
function StudentFilesComponent_ng_template_31_Conditional_32_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(document_r19.studentName.charAt(0));
} }
function StudentFilesComponent_ng_template_31_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 186)(1, "header")(2, "span");
    i0.ɵɵtext(3, "CARTE D\u2019\u00C9L\u00C8VE");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 198)(7, "div", 199);
    i0.ɵɵtemplate(8, StudentFilesComponent_ng_template_31_Conditional_32_Conditional_8_Template, 1, 1, "img", 200)(9, StudentFilesComponent_ng_template_31_Conditional_32_Conditional_9_Template, 2, 1, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "dl")(11, "div")(12, "dt");
    i0.ɵɵtext(13, "Nom et pr\u00E9noms");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "dd");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div")(17, "dt");
    i0.ɵɵtext(18, "Matricule");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "dd", 63);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div")(22, "dt");
    i0.ɵɵtext(23, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "dd");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div")(27, "dt");
    i0.ɵɵtext(28, "N\u00E9(e) le");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "dd");
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(31, "footer")(32, "span");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span", 63);
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(document_r19.academicYearCode);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(document_r19.photoUrl ? 8 : 9);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(document_r19.studentName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(document_r19.studentNumber);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(document_r19.classroomName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.formatDate(document_r19.birthDate));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r19.layout.signatoryTitle);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(document_r19.verificationCode);
} }
function StudentFilesComponent_ng_template_31_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 187);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(document_r19.metadata.additionalMention);
} }
function StudentFilesComponent_ng_template_31_Conditional_34_Conditional_8_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext(3).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(document_r19.layout.signatoryName);
} }
function StudentFilesComponent_ng_template_31_Conditional_34_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 201)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 202);
    i0.ɵɵtext(4, "Signature et cachet");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, StudentFilesComponent_ng_template_31_Conditional_34_Conditional_8_Conditional_5_Template, 2, 1, "strong");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(document_r19.layout.signatoryTitle);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(document_r19.layout.signatoryName ? 5 : -1);
} }
function StudentFilesComponent_ng_template_31_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 188)(1, "p");
    i0.ɵɵtext(2, " Fait \u00E0 ");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, ", le ");
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, StudentFilesComponent_ng_template_31_Conditional_34_Conditional_8_Template, 6, 2, "div", 201);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(document_r19.layout.city || "\u2014");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.formatDate(document_r19.issuedAt));
    i0.ɵɵadvance();
    i0.ɵɵconditional(document_r19.layout.showSignatureLine ? 8 : -1);
} }
function StudentFilesComponent_ng_template_31_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 190)(1, "span", 203);
    i0.ɵɵtext(2, "\u25A6");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span")(4, "small");
    i0.ɵɵtext(5, "Code d\u2019authenticit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong", 63);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const document_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(document_r19.verificationCode);
} }
function StudentFilesComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 174);
    i0.ɵɵtemplate(1, StudentFilesComponent_ng_template_31_Conditional_1_Template, 2, 0, "span", 175)(2, StudentFilesComponent_ng_template_31_Conditional_2_Template, 2, 0, "span", 176);
    i0.ɵɵelementStart(3, "header", 177)(4, "div", 178);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 179);
    i0.ɵɵtemplate(7, StudentFilesComponent_ng_template_31_Conditional_7_Template, 2, 1);
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, StudentFilesComponent_ng_template_31_Conditional_10_Template, 2, 1, "small")(11, StudentFilesComponent_ng_template_31_Conditional_11_Template, 2, 1, "em");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 180);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 181)(15, "span");
    i0.ɵɵtext(16);
    i0.ɵɵtemplate(17, StudentFilesComponent_ng_template_31_Conditional_17_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtemplate(19, StudentFilesComponent_ng_template_31_Conditional_19_Template, 1, 1)(20, StudentFilesComponent_ng_template_31_Conditional_20_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, StudentFilesComponent_ng_template_31_Conditional_21_Template, 2, 1, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "section", 182);
    i0.ɵɵelement(23, "span", 183);
    i0.ɵɵelementStart(24, "h1");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "p", 63);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(28, StudentFilesComponent_ng_template_31_Conditional_28_Template, 29, 12, "section", 184)(29, StudentFilesComponent_ng_template_31_Conditional_29_Template, 25, 7, "section", 184)(30, StudentFilesComponent_ng_template_31_Conditional_30_Template, 57, 10, "section", 185)(31, StudentFilesComponent_ng_template_31_Conditional_31_Template, 40, 8, "section", 184)(32, StudentFilesComponent_ng_template_31_Conditional_32_Template, 36, 8, "section", 186)(33, StudentFilesComponent_ng_template_31_Conditional_33_Template, 2, 1, "p", 187)(34, StudentFilesComponent_ng_template_31_Conditional_34_Template, 9, 3, "section", 188);
    i0.ɵɵelementStart(35, "footer", 189)(36, "p");
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(38, StudentFilesComponent_ng_template_31_Conditional_38_Template, 8, 1, "div", 190);
    i0.ɵɵelementStart(39, "span", 191);
    i0.ɵɵtext(40, "Page 1 / 1");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const document_r19 = ctx.$implicit;
    i0.ɵɵstyleProp("--document-accent", document_r19.layout.accentColor);
    i0.ɵɵclassProp("official-sheet--revoked", document_r19.status === "REVOKED")("official-sheet--card", document_r19.type === "STUDENT_CARD");
    i0.ɵɵadvance();
    i0.ɵɵconditional(document_r19.status === "DRAFT" ? 1 : document_r19.status === "REVOKED" ? 2 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", document_r19.layout.headerLeft, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(document_r19.layout.showLogo ? 7 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(document_r19.layout.schoolName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(document_r19.layout.legalName ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(document_r19.layout.showMotto && document_r19.layout.motto ? 11 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", document_r19.layout.headerRight, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r19.layout.address);
    i0.ɵɵadvance();
    i0.ɵɵconditional(document_r19.layout.city ? 17 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(document_r19.layout.phone ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(document_r19.layout.email ? 20 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(document_r19.layout.registrationNumber ? 21 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(document_r19.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("N\u00B0 ", document_r19.documentNumber, "");
    i0.ɵɵadvance();
    i0.ɵɵconditional(document_r19.type === "SCHOOL_CERTIFICATE" ? 28 : document_r19.type === "ENROLLMENT_ATTESTATION" ? 29 : document_r19.type === "STUDENT_FILE" ? 30 : document_r19.type === "SUMMONS" ? 31 : document_r19.type === "STUDENT_CARD" ? 32 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(document_r19.metadata.additionalMention ? 33 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(document_r19.type !== "STUDENT_CARD" ? 34 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(document_r19.layout.footerText);
    i0.ɵɵadvance();
    i0.ɵɵconditional(document_r19.layout.showVerificationCode ? 38 : -1);
} }
function StudentFilesComponent_Conditional_34_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function StudentFilesComponent_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, StudentFilesComponent_Conditional_34_ng_container_0_Template, 1, 0, "ng-container", 79);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const officialSheet_r10 = i0.ɵɵreference(32);
    i0.ɵɵproperty("ngTemplateOutlet", officialSheet_r10)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, ctx));
} }
export class StudentFilesComponent {
    documentsSource = inject(OFFICIAL_DOCUMENT_DATA_SOURCE);
    studentsSource = inject(STUDENT_DATA_SOURCE);
    classroomsSource = inject(CLASSROOM_DATA_SOURCE);
    referenceSource = inject(REFERENCE_DATA_SOURCE);
    notifications = inject(NotificationService);
    auth = inject(AuthService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    route = inject(ActivatedRoute);
    templates = OFFICIAL_DOCUMENT_TEMPLATES;
    tab = signal('CREATE');
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    students = signal([]);
    classrooms = signal([]);
    academicYearCode = signal('');
    documents = signal([]);
    layout = signal(null);
    selectedStudentId = signal('');
    studentSearch = signal('');
    classroomFilter = signal('');
    historySearch = signal('');
    historyType = signal('');
    printing = signal(null);
    revokeTarget = signal(null);
    draftRevision = signal(0);
    canGenerate = computed(() => this.auth.has(PERMISSIONS.DOCUMENT_GENERATE));
    canConfigure = computed(() => this.auth.has(PERMISSIONS.SCHOOL_MANAGE));
    issueForm = this.fb.nonNullable.group({
        type: ['SCHOOL_CERTIFICATE', [Validators.required]],
        issueDate: [localIsoDate(), [Validators.required]],
        validUntil: [''],
        purpose: ['', [Validators.maxLength(500)]],
        recipient: ['', [Validators.maxLength(250)]],
        additionalMention: ['', [Validators.maxLength(1000)]],
        meetingDate: [''],
        meetingTime: [''],
        meetingPlace: ['', [Validators.maxLength(250)]]
    });
    layoutForm = this.fb.nonNullable.group({
        schoolName: ['', [Validators.required, Validators.maxLength(200)]],
        legalName: ['', [Validators.maxLength(255)]],
        motto: ['', [Validators.maxLength(255)]],
        registrationNumber: ['', [Validators.maxLength(80)]],
        address: ['', [Validators.maxLength(400)]],
        city: ['', [Validators.maxLength(120)]],
        country: ['', [Validators.maxLength(120)]],
        phone: ['', [Validators.maxLength(40)]],
        email: ['', [Validators.email, Validators.maxLength(180)]],
        website: ['', [Validators.maxLength(200)]],
        logoDataUrl: [''],
        headerLeft: ['', [Validators.maxLength(500)]],
        headerRight: ['', [Validators.maxLength(500)]],
        footerText: ['', [Validators.maxLength(1000)]],
        signatoryName: ['', [Validators.maxLength(200)]],
        signatoryTitle: ['', [Validators.required, Validators.maxLength(160)]],
        accentColor: ['#1f5fd6', [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]],
        documentNumberPattern: ['DOC-{year}-{seq:6}', [Validators.required,
                Validators.pattern(/.*\{seq(?::\d+)?}.*/)]],
        showLogo: [true],
        showMotto: [true],
        showSignatureLine: [true],
        showVerificationCode: [true]
    });
    revokeForm = this.fb.nonNullable.group({
        reason: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]]
    });
    selectedTemplate = computed(() => {
        this.draftRevision();
        const type = this.issueForm.controls.type.value;
        return this.templates.find((item) => item.type === type) ?? this.templates[0];
    });
    selectedStudent = computed(() => this.students().find((student) => student.id === this.selectedStudentId()) ?? null);
    visibleStudents = computed(() => {
        const search = normalise(this.studentSearch());
        const classroomId = this.classroomFilter();
        return this.students()
            .filter((student) => !classroomId || student.classroomId === classroomId)
            .filter((student) => !search || normalise(`${student.fullName} ${student.studentNumber} ${student.classroomName ?? ''}`)
            .includes(search))
            .slice(0, 10);
    });
    visibleDocuments = computed(() => {
        const search = normalise(this.historySearch());
        const type = this.historyType();
        return this.documents()
            .filter((document) => !type || document.type === type)
            .filter((document) => !search || normalise(`${document.studentName} ${document.studentNumber} ${document.documentNumber} ${document.title}`)
            .includes(search));
    });
    issuedCount = computed(() => this.documents().filter((document) => document.status === 'ISSUED').length);
    revokedCount = computed(() => this.documents().filter((document) => document.status === 'REVOKED').length);
    previewDocument = computed(() => {
        this.draftRevision();
        const student = this.selectedStudent();
        const layout = this.previewLayout();
        if (!student || !layout) {
            return null;
        }
        const value = this.issueForm.getRawValue();
        const classroom = this.classrooms().find((item) => item.id === student.classroomId);
        return {
            id: 'preview',
            type: value.type,
            typeLabel: this.selectedTemplate().label,
            documentNumber: previewNumber(layout.documentNumberPattern, value.issueDate),
            verificationCode: 'APER-CU00-2026',
            title: this.selectedTemplate().label,
            status: 'DRAFT',
            issuedAt: `${value.issueDate}T00:00:00Z`,
            validUntil: value.validUntil || undefined,
            studentId: student.id,
            studentName: student.fullName,
            studentNumber: student.studentNumber,
            gender: student.gender,
            birthDate: student.birthDate,
            birthPlace: 'Abidjan',
            nationality: 'Ivoirienne',
            photoUrl: student.photoUrl,
            enrollmentNumber: `INS-${value.issueDate.slice(0, 4)}-${student.studentNumber.slice(-6)}`,
            classroomName: classroom?.name ?? student.classroomName,
            levelName: classroom?.levelName ?? student.levelName,
            academicYearId: classroom?.academicYearId,
            academicYearCode: this.academicYearCode(),
            metadata: {
                purpose: value.purpose.trim() || undefined,
                recipient: value.recipient.trim() || undefined,
                additionalMention: value.additionalMention.trim() || undefined,
                meetingDate: value.meetingDate || undefined,
                meetingTime: value.meetingTime || undefined,
                meetingPlace: value.meetingPlace.trim() || undefined
            },
            layout
        };
    });
    readyToIssue = computed(() => {
        this.draftRevision();
        const value = this.issueForm.getRawValue();
        const summonsComplete = value.type !== 'SUMMONS'
            || (!!value.purpose.trim() && !!value.meetingDate);
        return !!this.selectedStudent() && this.issueForm.valid && summonsComplete
            && this.canGenerate() && !this.saving();
    });
    ngOnInit() {
        this.watchForms();
        this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.load());
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        const requestedStudentId = this.route.snapshot.queryParamMap.get('studentId');
        const requestedType = this.route.snapshot.queryParamMap.get('type');
        if (requestedType && this.templates.some(template => template.type === requestedType)) {
            this.chooseTemplate(requestedType);
        }
        forkJoin({
            requestedStudent: requestedStudentId ? this.studentsSource.getById(requestedStudentId) : of(null),
            students: this.studentsSource.search({ page: 0, size: 300, status: 'ACTIVE' })
                .pipe(catchError(() => of({ content: [] }))),
            classrooms: this.classroomsSource.list().pipe(catchError(() => of([]))),
            years: this.referenceSource.academicYears().pipe(catchError(() => of([]))),
            documents: this.documentsSource.search({ page: 0, size: 100 })
                .pipe(catchError(() => of({ content: [] }))),
            layout: this.documentsSource.layout().pipe(catchError(() => of(null)))
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (data) => {
                const students = data.students.content;
                this.students.set(data.requestedStudent && !students.some(student => student.id === data.requestedStudent.id)
                    ? [data.requestedStudent, ...students] : students);
                this.classrooms.set(data.classrooms);
                this.documents.set(data.documents.content);
                if (data.layout) {
                    this.layout.set(data.layout);
                    this.layoutForm.reset(data.layout);
                }
                const activeYear = data.years.find((year) => year.status === 'ACTIVE') ?? data.years[0];
                this.academicYearCode.set(activeYear?.code ?? '');
                this.selectedStudentId.set(data.requestedStudent?.id ?? students[0]?.id ?? '');
                if (data.requestedStudent)
                    this.tab.set('CREATE');
                this.loading.set(false);
                this.draftRevision.update((value) => value + 1);
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    changeTab(tab) {
        this.tab.set(tab);
        this.draftRevision.update((value) => value + 1);
    }
    /** Ouvre une nouvelle émission sans conserver les mentions précédentes. */
    newDocument() {
        this.issueForm.reset({
            type: 'SCHOOL_CERTIFICATE',
            issueDate: localIsoDate(),
            validUntil: '',
            purpose: '',
            recipient: '',
            additionalMention: '',
            meetingDate: '',
            meetingTime: '',
            meetingPlace: ''
        });
        this.studentSearch.set('');
        this.classroomFilter.set('');
        this.selectedStudentId.set(this.students()[0]?.id ?? '');
        this.tab.set('CREATE');
        this.draftRevision.update((value) => value + 1);
    }
    chooseTemplate(type) {
        this.issueForm.patchValue({ type });
    }
    chooseStudent(studentId) {
        this.selectedStudentId.set(studentId);
    }
    issue(printAfter) {
        if (!this.readyToIssue()) {
            return;
        }
        this.saving.set(true);
        const value = this.issueForm.getRawValue();
        this.documentsSource.issue({
            studentId: this.selectedStudentId(),
            type: value.type,
            issueDate: value.issueDate,
            validUntil: value.validUntil || undefined,
            purpose: value.purpose.trim() || undefined,
            recipient: value.recipient.trim() || undefined,
            additionalMention: value.additionalMention.trim() || undefined,
            meetingDate: value.meetingDate || undefined,
            meetingTime: value.meetingTime || undefined,
            meetingPlace: value.meetingPlace.trim() || undefined
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (document) => {
                this.saving.set(false);
                this.documents.update((items) => [document, ...items]);
                this.notifications.success(`${document.title} ${document.documentNumber} enregistré pour ${document.studentName}.`, 'Document officiel émis');
                if (printAfter) {
                    this.print(document);
                }
                else {
                    this.tab.set('REGISTER');
                }
            },
            error: () => this.saving.set(false)
        });
    }
    print(document) {
        this.printing.set(document);
        setTimeout(() => {
            window.print();
            this.printing.set(null);
        }, 120);
    }
    openRevoke(document) {
        this.revokeTarget.set(document);
        this.revokeForm.reset({ reason: '' });
    }
    closeRevoke() {
        this.revokeTarget.set(null);
    }
    revoke() {
        const target = this.revokeTarget();
        if (!target || this.revokeForm.invalid || this.saving()) {
            return;
        }
        this.saving.set(true);
        this.documentsSource.revoke(target.id, this.revokeForm.controls.reason.value)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (document) => {
                this.documents.update((items) => items.map((item) => item.id === document.id ? document : item));
                this.saving.set(false);
                this.closeRevoke();
                this.notifications.warning(`${document.documentNumber} reste au registre mais n'est plus valable.`, 'Document révoqué');
            },
            error: () => this.saving.set(false)
        });
    }
    saveLayout() {
        if (this.layoutForm.invalid || this.saving() || !this.canConfigure()) {
            this.layoutForm.markAllAsTouched();
            return;
        }
        this.saving.set(true);
        this.documentsSource.saveLayout(this.layoutForm.getRawValue())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (layout) => {
                this.layout.set(layout);
                this.layoutForm.reset(layout);
                this.saving.set(false);
                this.notifications.success('Les prochains documents utiliseront cette mise en page. Les anciens restent inchangés.', 'Papier à en-tête enregistré');
            },
            error: () => this.saving.set(false)
        });
    }
    cancelLayoutChanges() {
        const layout = this.layout();
        if (layout) {
            this.layoutForm.reset(layout);
        }
    }
    onLogoSelected(event) {
        const input = event.target;
        const file = input.files?.[0];
        if (!file) {
            return;
        }
        if (!file.type.startsWith('image/') || file.size > 500_000) {
            this.notifications.error('Choisissez une image PNG, JPG ou SVG de moins de 500 Ko.', 'Logo non chargé');
            input.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.layoutForm.patchValue({ logoDataUrl: String(reader.result ?? ''), showLogo: true });
            input.value = '';
        };
        reader.readAsDataURL(file);
    }
    removeLogo() {
        this.layoutForm.patchValue({ logoDataUrl: '', showLogo: false });
    }
    formatDate(value) {
        if (!value) {
            return '—';
        }
        return new Date(value.length === 10 ? `${value}T00:00:00` : value)
            .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    shortDate(value) {
        return new Date(value).toLocaleDateString('fr-FR');
    }
    statusLabel(status) {
        return status === 'REVOKED' ? 'Révoqué' : status === 'ISSUED' ? 'Émis' : 'Brouillon';
    }
    salutation(document) {
        return document.gender === 'FEMALE' ? "l'élève" : "l'élève";
    }
    bornLabel(document) {
        return document.gender === 'FEMALE' ? 'née' : 'né';
    }
    previewLayout() {
        if (this.tab() === 'SETTINGS' && this.layoutForm.valid) {
            return this.layoutForm.getRawValue();
        }
        return this.layout();
    }
    watchForms() {
        this.issueForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.draftRevision.update((value) => value + 1));
        this.layoutForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.draftRevision.update((value) => value + 1));
    }
    static ɵfac = function StudentFilesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StudentFilesComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StudentFilesComponent, selectors: [["eduops-student-files"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 35, vars: 13, consts: [["officialSheet", ""], [1, "page", "screen-only"], [1, "page__header"], [1, "eyebrow"], [1, "page__title"], [1, "page__meta"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["aria-hidden", "true", 1, "btn-icon"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], ["role", "tablist", "aria-label", "Documents officiels", 1, "tabs"], ["type", "button", "role", "tab", 1, "tabs__item", 3, "click"], [1, "tabs__badge", "numeric"], ["message", "Chargement des documents officiels..."], [1, "print-only"], [3, "retry"], [1, "workspace"], [1, "settings-workspace"], [1, "builder", "card"], [1, "builder__head"], [1, "step-number"], [1, "template-grid"], ["type", "button", 1, "template-card", 3, "template-card--on"], [1, "builder__head", "builder__head--section"], [1, "student-filters"], [1, "search-box"], ["type", "search", "placeholder", "Nom, pr\u00E9nom ou matricule", 3, "input", "value"], ["aria-label", "Filtrer par classe", 1, "select", 3, "change", "value"], ["value", ""], [3, "value"], ["role", "listbox", "aria-label", "\u00C9l\u00E8ves", 1, "student-list"], ["type", "button", "role", "option", 1, "student-row", 3, "student-row--on"], [1, "student-empty"], [1, "document-fields", 3, "formGroup"], [1, "field-row"], [1, "field"], ["for", "issue-date", 1, "field__label", "field__label--required"], ["id", "issue-date", "type", "date", "formControlName", "issueDate", 1, "input"], ["for", "valid-until", 1, "field__label"], ["id", "valid-until", "type", "date", "formControlName", "validUntil", 1, "input"], [1, "field__hint"], ["for", "additional-mention", 1, "field__label"], ["id", "additional-mention", "rows", "2", "formControlName", "additionalMention", "placeholder", "Cette mention appara\u00EEtra sous le texte principal.", 1, "textarea"], [1, "permission-note"], [1, "builder__actions"], [1, "issue-note"], ["aria-hidden", "true", 1, "issue-note__icon"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["aria-label", "Aper\u00E7u du document", 1, "preview-panel"], [1, "preview-panel__head"], [1, "preview-panel__eyebrow"], [1, "preview-panel__scale"], [1, "preview-stage"], [1, "preview-empty"], ["type", "button", 1, "template-card", 3, "click"], ["aria-hidden", "true", 1, "template-card__mark"], [1, "template-card__copy"], ["aria-hidden", "true", 1, "template-card__check"], ["type", "button", "role", "option", 1, "student-row", 3, "click"], ["aria-hidden", "true", 1, "student-row__avatar"], [1, "student-row__copy"], [1, "numeric"], [1, "student-row__class"], ["aria-hidden", "true", 1, "student-row__radio"], ["for", "purpose", 1, "field__label", "field__label--required"], ["id", "purpose", "formControlName", "purpose", "placeholder", "Entretien relatif au suivi scolaire de l\u2019\u00E9l\u00E8ve", 1, "input"], [1, "field-row", "field-row--3"], ["for", "meeting-date", 1, "field__label", "field__label--required"], ["id", "meeting-date", "type", "date", "formControlName", "meetingDate", 1, "input"], ["for", "meeting-time", 1, "field__label"], ["id", "meeting-time", "type", "time", "formControlName", "meetingTime", 1, "input"], ["for", "meeting-place", 1, "field__label"], ["id", "meeting-place", "formControlName", "meetingPlace", "placeholder", "Bureau de la direction", 1, "input"], ["for", "recipient", 1, "field__label"], ["id", "recipient", "formControlName", "recipient", "placeholder", "\u00C0 qui de droit", 1, "input"], ["for", "purpose", 1, "field__label"], ["id", "purpose", "formControlName", "purpose", "placeholder", "Pour servir et valoir ce que de droit", 1, "input"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "register-summary"], [1, "summary-card"], ["aria-hidden", "true", 1, "summary-card__icon", "summary-card__icon--blue"], ["aria-hidden", "true", 1, "summary-card__icon", "summary-card__icon--green"], ["aria-hidden", "true", 1, "summary-card__icon", "summary-card__icon--red"], [1, "card", "register"], [1, "register__head"], [1, "register__filters"], [1, "search-box", "search-box--compact"], ["type", "search", "placeholder", "\u00C9l\u00E8ve, matricule ou num\u00E9ro", 3, "input", "value"], ["aria-label", "Filtrer par type", 1, "select", 3, "change", "value"], [1, "table-wrapper"], [1, "table", "register-table"], [1, "visually-hidden"], ["scope", "col"], ["scope", "col", 1, "cell-actions"], [3, "register-table__revoked"], [1, "document-cell__title"], [1, "document-cell__number", "numeric"], [1, "status-pill"], [1, "document-cell__reason"], [1, "cell-actions"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", "btn--text-danger"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", "btn--text-danger", 3, "click"], ["colspan", "6"], [1, "register-empty"], [1, "settings-card", "card"], [1, "settings-card__head"], [1, "settings-card__eyebrow"], ["data-status", "DRAFT", 1, "status-pill"], [1, "settings-form", 3, "formGroup"], [3, "disabled"], [1, "logo-editor"], [1, "logo-editor__preview"], ["alt", "Logo de l\u2019\u00E9tablissement", 3, "src"], [1, "logo-editor__copy"], [1, "logo-editor__actions"], ["for", "school-logo", 1, "btn", "btn--secondary", "btn--sm"], ["id", "school-logo", "type", "file", "accept", "image/png,image/jpeg,image/svg+xml", 1, "visually-hidden", 3, "change"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm"], [1, "color-field"], [1, "color-field__control"], ["type", "color", "formControlName", "accentColor"], ["formControlName", "accentColor", 1, "input", "numeric"], ["for", "school-name", 1, "field__label", "field__label--required"], ["id", "school-name", "formControlName", "schoolName", 1, "input"], ["for", "legal-name", 1, "field__label"], ["id", "legal-name", "formControlName", "legalName", 1, "input"], ["for", "motto", 1, "field__label"], ["id", "motto", "formControlName", "motto", 1, "input"], ["for", "registration-number", 1, "field__label"], ["id", "registration-number", "formControlName", "registrationNumber", 1, "input"], ["for", "header-left", 1, "field__label"], ["id", "header-left", "rows", "3", "formControlName", "headerLeft", 1, "textarea"], ["for", "header-right", 1, "field__label"], ["id", "header-right", "rows", "3", "formControlName", "headerRight", 1, "textarea"], ["for", "address", 1, "field__label"], ["id", "address", "formControlName", "address", 1, "input"], ["for", "city", 1, "field__label"], ["id", "city", "formControlName", "city", 1, "input"], ["for", "phone", 1, "field__label"], ["id", "phone", "formControlName", "phone", 1, "input"], ["for", "email", 1, "field__label"], ["id", "email", "type", "email", "formControlName", "email", 1, "input"], ["for", "website", 1, "field__label"], ["id", "website", "formControlName", "website", 1, "input"], ["for", "signatory-name", 1, "field__label"], ["id", "signatory-name", "formControlName", "signatoryName", 1, "input"], ["for", "signatory-title", 1, "field__label", "field__label--required"], ["id", "signatory-title", "formControlName", "signatoryTitle", 1, "input"], ["for", "footer-text", 1, "field__label"], ["id", "footer-text", "rows", "2", "formControlName", "footerText", 1, "textarea"], ["for", "number-pattern", 1, "field__label", "field__label--required"], ["id", "number-pattern", "formControlName", "documentNumberPattern", 1, "input", "numeric"], [1, "field__error"], [1, "option-grid"], [1, "check-option"], ["type", "checkbox", "formControlName", "showLogo"], ["type", "checkbox", "formControlName", "showMotto"], ["type", "checkbox", "formControlName", "showSignatureLine"], ["type", "checkbox", "formControlName", "showVerificationCode"], [1, "settings-card__foot"], ["aria-label", "Aper\u00E7u du papier \u00E0 en-t\u00EAte", 1, "preview-panel", "preview-panel--settings"], [1, "live-dot"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "revoke-title", 1, "revoke-dialog", "card"], ["aria-hidden", "true", 1, "revoke-dialog__icon"], ["id", "revoke-title"], [3, "formGroup"], ["for", "revoke-reason", 1, "field__label", "field__label--required"], ["id", "revoke-reason", "rows", "3", "formControlName", "reason", "placeholder", "Erreur sur l\u2019identit\u00E9, document remplac\u00E9...", 1, "textarea"], [1, "revoke-dialog__actions"], ["type", "button", 1, "btn", "btn--danger", 3, "click", "disabled"], [1, "official-sheet"], [1, "official-sheet__watermark"], [1, "official-sheet__watermark", "official-sheet__watermark--revoked"], [1, "letterhead"], [1, "letterhead__authority", "letterhead__authority--left"], [1, "letterhead__school"], [1, "letterhead__authority", "letterhead__authority--right"], [1, "letterhead-details"], [1, "document-heading"], [1, "document-heading__rule"], [1, "document-body", "document-body--prose"], [1, "document-body"], [1, "student-card-print"], [1, "additional-mention"], [1, "document-closing"], [1, "official-sheet__footer"], [1, "verification-block"], [1, "page-number"], ["alt", "", 1, "letterhead__logo", 3, "src"], ["aria-hidden", "true", 1, "letterhead__monogram"], [1, "student-name"], [1, "section-title"], [1, "identity-grid"], [1, "meeting-card"], [1, "student-card-print__body"], [1, "student-card-print__photo"], ["alt", "", 3, "src"], [1, "signature-block"], [1, "signature-block__space"], ["aria-hidden", "true", 1, "verification-block__qr"]], template: function StudentFilesComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 1)(1, "header", 2)(2, "div")(3, "div", 3);
            i0.ɵɵtext(4, "Scolarit\u00E9 \u00B7 Documents");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 4);
            i0.ɵɵtext(6, "Documents officiels");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 5);
            i0.ɵɵtext(8, " \u00C9mettez, imprimez et retrouvez les pi\u00E8ces remises aux \u00E9l\u00E8ves et aux familles. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 6)(10, "button", 7);
            i0.ɵɵlistener("click", function StudentFilesComponent_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.changeTab("SETTINGS")); });
            i0.ɵɵelementStart(11, "span", 8);
            i0.ɵɵtext(12, "\u2699");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(13, " Papier \u00E0 en-t\u00EAte ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "button", 9);
            i0.ɵɵlistener("click", function StudentFilesComponent_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.newDocument()); });
            i0.ɵɵelementStart(15, "span", 10);
            i0.ɵɵtext(16, "\uFF0B");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(17, " Nouveau document ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(18, "nav", 11)(19, "button", 12);
            i0.ɵɵlistener("click", function StudentFilesComponent_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.changeTab("CREATE")); });
            i0.ɵɵtext(20, " Cr\u00E9er un document ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "button", 12);
            i0.ɵɵlistener("click", function StudentFilesComponent_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.changeTab("REGISTER")); });
            i0.ɵɵtext(22, " Registre ");
            i0.ɵɵelementStart(23, "span", 13);
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "button", 12);
            i0.ɵɵlistener("click", function StudentFilesComponent_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.changeTab("SETTINGS")); });
            i0.ɵɵtext(26, " Mise en page ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(27, StudentFilesComponent_Conditional_27_Template, 1, 0, "eduops-loading-state", 14)(28, StudentFilesComponent_Conditional_28_Template, 1, 0, "eduops-error-state")(29, StudentFilesComponent_Conditional_29_Template, 3, 3)(30, StudentFilesComponent_Conditional_30_Template, 18, 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(31, StudentFilesComponent_ng_template_31_Template, 41, 25, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(33, "div", 15);
            i0.ɵɵtemplate(34, StudentFilesComponent_Conditional_34_Template, 1, 4, "ng-container");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_9_0;
            let tmp_10_0;
            i0.ɵɵadvance(19);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "CREATE");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "CREATE");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "REGISTER");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "REGISTER");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.issuedCount());
            i0.ɵɵadvance();
            i0.ɵɵclassProp("tabs__item--on", ctx.tab() === "SETTINGS");
            i0.ɵɵattribute("aria-selected", ctx.tab() === "SETTINGS");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading() ? 27 : ctx.error() ? 28 : 29);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_9_0 = ctx.revokeTarget()) ? 30 : -1, tmp_9_0);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional((tmp_10_0 = ctx.printing()) ? 34 : -1, tmp_10_0);
        } }, dependencies: [CommonModule, i1.NgTemplateOutlet, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.CheckboxControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.print-only[_ngcontent-%COMP%] { display: none; }\n\n.eyebrow[_ngcontent-%COMP%], \n.settings-card__eyebrow[_ngcontent-%COMP%], \n.preview-panel__eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: var(--space-1);\n  font-size: 10px;\n  font-weight: 800;\n  letter-spacing: .12em;\n  text-transform: uppercase;\n  color: var(--brand);\n}\n\n.btn-icon[_ngcontent-%COMP%] { font-size: 15px; }\n\n.tabs[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-5);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: inline-flex;\n    align-items: center;\n    gap: var(--space-2);\n    min-height: 36px;\n    padding: 0 var(--space-4);\n    font: 600 var(--text-sm) var(--font-body);\n    color: var(--text-muted);\n    background: transparent;\n    border: 0;\n    border-radius: 8px;\n    cursor: pointer;\n\n    &--on {\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    min-width: 20px;\n    padding: 1px 6px;\n    font-size: 10px;\n    color: var(--brand);\n    background: var(--brand-tint);\n    border-radius: var(--radius-pill);\n  }\n}\n\n.workspace[_ngcontent-%COMP%], \n.settings-workspace[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(590px, 1fr) minmax(430px, 620px);\n  gap: var(--space-5);\n  align-items: start;\n}\n\n.builder[_ngcontent-%COMP%] { overflow: hidden; }\n\n.builder__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  padding: var(--space-5) var(--space-6) var(--space-4);\n\n  &--section {\n    margin-top: var(--space-2);\n    padding-top: var(--space-5);\n    border-top: 1px solid var(--border-light);\n  }\n\n  h2 { margin: 0; font-size: var(--text-md); }\n  p { margin: 3px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.step-number[_ngcontent-%COMP%] {\n  display: inline-flex;\n  flex: 0 0 24px;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  font-size: 11px;\n  font-weight: 800;\n  color: var(--brand);\n  background: var(--brand-tint);\n  border-radius: 50%;\n}\n\n.template-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: var(--space-3);\n  padding: 0 var(--space-6) var(--space-5);\n}\n\n.template-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  min-height: 76px;\n  padding: var(--space-3);\n  text-align: left;\n  color: var(--text-normal);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  cursor: pointer;\n  transition: border-color var(--transition-fast), box-shadow var(--transition-fast),\n              transform var(--transition-fast);\n\n  &:hover { border-color: var(--brand-tint-border); transform: translateY(-1px); }\n  &--on { border-color: var(--brand); box-shadow: 0 0 0 2px var(--brand-tint); }\n\n  &__mark {\n    display: inline-flex;\n    flex: 0 0 40px;\n    align-items: center;\n    justify-content: center;\n    width: 40px;\n    height: 46px;\n    font-size: 11px;\n    font-weight: 800;\n    letter-spacing: .05em;\n    color: var(--brand);\n    background: var(--brand-tint);\n    border-radius: 8px 8px 8px 2px;\n  }\n\n  &[data-tone='green'] .template-card__mark { color: var(--success); background: var(--success-bg); }\n  &[data-tone='amber'] .template-card__mark { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='violet'] .template-card__mark { color: var(--chart-4); background: #f0ecfb; }\n  &[data-tone='slate'] .template-card__mark { color: var(--text-normal); background: var(--surface-sunken); }\n\n  &__copy {\n    display: flex;\n    flex: 1;\n    min-width: 0;\n    flex-direction: column;\n    gap: 3px;\n\n    strong { font-size: var(--text-sm); color: var(--text-strong); }\n    small { font-size: 11px; line-height: 1.35; color: var(--text-muted); }\n  }\n\n  &__check {\n    position: absolute;\n    top: 8px;\n    right: 8px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 18px;\n    height: 18px;\n    font-size: 10px;\n    color: #fff;\n    background: var(--brand);\n    border-radius: 50%;\n  }\n}\n\n.student-filters[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 180px;\n  gap: var(--space-3);\n  padding: 0 var(--space-6) var(--space-3);\n}\n\n.search-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  min-height: 38px;\n  padding: 0 var(--space-3);\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: var(--radius-input);\n\n  &:focus-within { border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-tint); }\n  input { width: 100%; font: inherit; color: var(--text-strong); background: transparent; border: 0; outline: 0; }\n  &--compact { width: min(300px, 100%); }\n}\n\n.student-list[_ngcontent-%COMP%] {\n  max-height: 286px;\n  margin: 0 var(--space-6) var(--space-5);\n  overflow-y: auto;\n  border: 1px solid var(--border);\n  border-radius: 12px;\n}\n\n.student-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 34px minmax(0, 1fr) auto 18px;\n  gap: var(--space-3);\n  align-items: center;\n  width: 100%;\n  padding: 10px var(--space-3);\n  text-align: left;\n  color: var(--text-normal);\n  background: var(--surface-card);\n  border: 0;\n  border-bottom: 1px solid var(--border-light);\n  cursor: pointer;\n\n  &:last-child { border-bottom: 0; }\n  &:hover { background: var(--surface-hover); }\n  &--on { background: var(--brand-tint); }\n\n  &__avatar {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 34px;\n    height: 34px;\n    font-size: 10px;\n    font-weight: 800;\n    color: var(--brand);\n    background: #fff;\n    border: 1px solid var(--brand-tint-border);\n    border-radius: 50%;\n  }\n\n  &__copy { display: flex; min-width: 0; flex-direction: column; }\n  &__copy strong { overflow: hidden; font-size: var(--text-sm); color: var(--text-strong); text-overflow: ellipsis; white-space: nowrap; }\n  &__copy small { font-size: 10px; color: var(--text-muted); }\n  &__class { font-size: var(--text-xs); font-weight: 600; color: var(--text-muted); }\n  &__radio { width: 14px; height: 14px; border: 1.5px solid var(--border-strong); border-radius: 50%; }\n  &--on &__radio { border: 4px solid var(--brand); }\n}\n\n.student-empty[_ngcontent-%COMP%] {\n  padding: var(--space-6);\n  text-align: center;\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n}\n\n.document-fields[_ngcontent-%COMP%], \n.settings-form[_ngcontent-%COMP%] { padding: 0 var(--space-6) var(--space-2); }\n\n.field-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: var(--space-4);\n\n  &--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n}\n\n.permission-note[_ngcontent-%COMP%], \n.issue-note[_ngcontent-%COMP%] {\n  font-size: var(--text-xs);\n  color: var(--text-muted);\n}\n\n.permission-note[_ngcontent-%COMP%] {\n  margin: 0 var(--space-6) var(--space-4);\n  padding: var(--space-3);\n  color: var(--warning);\n  background: var(--warning-bg);\n  border-radius: var(--radius-input);\n}\n\n.builder__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: var(--space-3);\n  padding: var(--space-4) var(--space-6);\n  background: var(--surface-sunken);\n  border-top: 1px solid var(--border);\n  flex-wrap: wrap;\n}\n\n.issue-note[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  align-items: center;\n  gap: var(--space-2);\n  min-width: 220px;\n\n  &__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 20px;\n    height: 20px;\n    color: var(--success);\n    background: var(--success-bg);\n    border-radius: 50%;\n  }\n}\n\n.preview-panel[_ngcontent-%COMP%] {\n  position: sticky;\n  top: calc(var(--topbar-height) + var(--space-4));\n  overflow: hidden;\n  background: #e9edf4;\n  border: 1px solid var(--border-strong);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-sm);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: var(--space-3) var(--space-4);\n    background: var(--surface-card);\n    border-bottom: 1px solid var(--border);\n\n    strong { display: block; font-size: var(--text-xs); color: var(--text-strong); }\n  }\n\n  &__eyebrow { margin-bottom: 1px; font-size: 8px; }\n  &__scale { font-size: 10px; font-weight: 700; color: var(--text-muted); }\n}\n\n.preview-stage[_ngcontent-%COMP%] {\n  max-height: calc(100vh - 170px);\n  padding: var(--space-5);\n  overflow: auto;\n}\n\n.preview-empty[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 480px;\n  place-items: center;\n  text-align: center;\n  color: var(--text-muted);\n}\n\n.register-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: var(--space-4);\n  margin-bottom: var(--space-5);\n}\n\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n\n  &__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 38px;\n    height: 38px;\n    font-size: var(--text-lg);\n    border-radius: 10px;\n\n    &--blue { color: var(--brand); background: var(--brand-tint); }\n    &--green { color: var(--success); background: var(--success-bg); }\n    &--red { color: var(--danger); background: var(--danger-bg); }\n  }\n\n  div { display: flex; flex-direction: column; }\n  strong { font-size: var(--text-xl); color: var(--text-strong); line-height: 1.1; }\n  span { font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.register[_ngcontent-%COMP%] { overflow: hidden; }\n\n.register__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-5) var(--space-6);\n  border-bottom: 1px solid var(--border);\n\n  h2 { margin: 0; font-size: var(--text-lg); }\n  p { margin: 3px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.register__filters[_ngcontent-%COMP%] { display: flex; gap: var(--space-3); }\n.register__filters[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%] { width: 210px; }\n\n.document-cell__title[_ngcontent-%COMP%], \n.document-cell__number[_ngcontent-%COMP%], \n.document-cell__reason[_ngcontent-%COMP%] { display: block; }\n.document-cell__title[_ngcontent-%COMP%] { font-weight: 600; color: var(--text-strong); }\n.document-cell__number[_ngcontent-%COMP%] { margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n.document-cell__reason[_ngcontent-%COMP%] { max-width: 240px; margin-top: 3px; font-size: 10px; color: var(--danger); }\n.cell-actions[_ngcontent-%COMP%] { text-align: right !important; white-space: nowrap; }\n.btn--text-danger[_ngcontent-%COMP%] { color: var(--danger); }\n.register-table__revoked[_ngcontent-%COMP%] { background: var(--danger-bg); }\n\n.status-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 4px 9px;\n  font-size: 10px;\n  font-weight: 700;\n  color: var(--success);\n  background: var(--success-bg);\n  border-radius: var(--radius-pill);\n\n  &[data-status='REVOKED'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-status='DRAFT'] { color: var(--text-muted); background: var(--surface-sunken); }\n}\n\n.register-empty[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: var(--space-2);\n  padding: var(--space-10);\n  color: var(--text-muted);\n\n  > span { font-size: 28px; color: var(--text-light); }\n  strong { color: var(--text-strong); }\n  p { margin: 0; font-size: var(--text-sm); }\n}\n\n.settings-card[_ngcontent-%COMP%] { overflow: hidden; }\n\n.settings-card__head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-6);\n  border-bottom: 1px solid var(--border);\n\n  h2 { margin: 0; font-size: var(--text-lg); }\n  p { margin: var(--space-1) 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.settings-form[_ngcontent-%COMP%] {\n  padding-top: var(--space-5);\n\n  fieldset { padding: 0; margin: 0 0 var(--space-6); border: 0; }\n  legend {\n    width: 100%;\n    padding: 0 0 var(--space-3);\n    margin-bottom: var(--space-4);\n    font-size: var(--text-sm);\n    font-weight: 700;\n    color: var(--text-strong);\n    border-bottom: 1px solid var(--border-light);\n  }\n}\n\n.logo-editor[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 78px 1fr auto;\n  gap: var(--space-4);\n  align-items: center;\n  margin-bottom: var(--space-5);\n}\n\n.logo-editor__preview[_ngcontent-%COMP%] {\n  display: grid;\n  width: 78px;\n  height: 78px;\n  overflow: hidden;\n  place-items: center;\n  color: var(--brand);\n  background: var(--surface-sunken);\n  border: 1px dashed var(--border-strong);\n  border-radius: 14px;\n\n  img { width: 100%; height: 100%; padding: 8px; object-fit: contain; }\n  span { font: 800 26px var(--font-display); }\n}\n\n.logo-editor__copy[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n  min-width: 0;\n  strong { font-size: var(--text-sm); color: var(--text-strong); }\n  small { font-size: var(--text-xs); color: var(--text-muted); }\n}\n.logo-editor__actions[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); margin-top: var(--space-2); }\n\n.color-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  color: var(--text-normal);\n}\n\n.color-field__control[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  input[type='color'] { width: 38px; height: 38px; padding: 3px; border: 1px solid var(--border-strong); border-radius: 8px; }\n  .input { width: 96px; }\n}\n\n.option-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: var(--space-3);\n}\n\n.check-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n  cursor: pointer;\n\n  input { margin-top: 2px; accent-color: var(--brand); }\n  span { display: flex; flex-direction: column; gap: 2px; }\n  strong { font-size: var(--text-xs); color: var(--text-strong); }\n  small { font-size: 10px; color: var(--text-muted); }\n}\n\n.settings-card__foot[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: var(--space-3);\n  padding: var(--space-4) var(--space-6);\n  background: var(--surface-sunken);\n  border-top: 1px solid var(--border);\n\n  p { flex: 1; margin: 0; font-size: 10px; line-height: 1.45; color: var(--text-muted); }\n}\n\n.live-dot[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 9px;\n  font-weight: 700;\n  color: var(--success);\n  &::before { content: ''; width: 6px; height: 6px; background: currentColor; border-radius: 50%; }\n}\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgb(15 23 42 / 45%);\n}\n\n.revoke-dialog[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  z-index: var(--z-modal);\n  width: min(460px, calc(100vw - 32px));\n  padding: var(--space-6);\n  transform: translate(-50%, -50%);\n\n  &__icon {\n    display: grid;\n    width: 42px;\n    height: 42px;\n    margin-bottom: var(--space-4);\n    place-items: center;\n    font-size: var(--text-lg);\n    font-weight: 800;\n    color: var(--danger);\n    background: var(--danger-bg);\n    border-radius: 50%;\n  }\n  h2 { margin: 0; font-size: var(--text-lg); }\n  > p { margin: var(--space-2) 0 var(--space-4); font-size: var(--text-sm); line-height: 1.55; color: var(--text-muted); }\n  &__actions { display: flex; justify-content: flex-end; gap: var(--space-3); }\n}\n\n\n\n\n.official-sheet[_ngcontent-%COMP%] {\n  --document-accent: #1f5fd6;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  min-height: 790px;\n  padding: 38px 42px 28px;\n  overflow: hidden;\n  font-family: Georgia, 'Times New Roman', serif;\n  font-size: 11px;\n  line-height: 1.55;\n  color: #172033;\n  background: #fff;\n  box-shadow: 0 8px 24px rgb(31 42 68 / 14%);\n\n  &__watermark {\n    position: absolute;\n    top: 47%;\n    left: 50%;\n    z-index: 0;\n    font: 800 58px Arial, sans-serif;\n    letter-spacing: .16em;\n    color: rgb(31 95 214 / 5%);\n    transform: translate(-50%, -50%) rotate(-30deg);\n    pointer-events: none;\n    white-space: nowrap;\n  }\n\n  &__watermark--revoked { color: rgb(220 53 69 / 8%); }\n  &--revoked { outline: 4px solid rgb(220 53 69 / 18%); outline-offset: -4px; }\n}\n\n.letterhead[_ngcontent-%COMP%], \n.letterhead-details[_ngcontent-%COMP%], \n.document-heading[_ngcontent-%COMP%], \n.document-body[_ngcontent-%COMP%], \n.additional-mention[_ngcontent-%COMP%], \n.document-closing[_ngcontent-%COMP%], \n.official-sheet__footer[_ngcontent-%COMP%] { position: relative; z-index: 1; }\n\n.letterhead[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, .85fr) minmax(150px, 1.3fr) minmax(0, .85fr);\n  gap: 16px;\n  align-items: start;\n  padding-bottom: 12px;\n  border-bottom: 2px solid var(--document-accent);\n\n  &__authority {\n    padding-top: 3px;\n    font-family: Arial, sans-serif;\n    font-size: 7.5px;\n    font-weight: 700;\n    line-height: 1.5;\n    white-space: pre-line;\n    text-transform: uppercase;\n    color: #344054;\n    &--right { text-align: right; }\n  }\n\n  &__school { display: flex; align-items: center; flex-direction: column; text-align: center; }\n  &__school > strong { font: 800 13px Arial, sans-serif; text-transform: uppercase; color: var(--document-accent); }\n  &__school > small { font: 7px/1.4 Arial, sans-serif; color: #667085; }\n  &__school > em { margin-top: 2px; font-size: 7.5px; color: #475467; }\n  &__logo { width: 43px; height: 43px; margin-bottom: 4px; object-fit: contain; }\n  &__monogram {\n    display: grid;\n    width: 40px;\n    height: 40px;\n    margin-bottom: 4px;\n    place-items: center;\n    font: 800 20px Arial, sans-serif;\n    color: #fff;\n    background: var(--document-accent);\n    border-radius: 50%;\n  }\n}\n\n.letterhead-details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px 12px;\n  padding: 7px 0;\n  font: 6.5px Arial, sans-serif;\n  color: #667085;\n  border-bottom: 1px solid #e4e7ec;\n  flex-wrap: wrap;\n}\n\n.document-heading[_ngcontent-%COMP%] {\n  margin: 34px 0 30px;\n  text-align: center;\n\n  &__rule { display: block; width: 30px; height: 3px; margin: 0 auto 8px; background: var(--document-accent); }\n  h1 { margin: 0; font-size: 19px; letter-spacing: .04em; text-transform: uppercase; text-decoration: underline; text-underline-offset: 5px; }\n  p { margin: 8px 0 0; font: 8px Arial, sans-serif; color: #667085; }\n}\n\n.document-body[_ngcontent-%COMP%] {\n  &--prose { font-size: 12px; line-height: 1.9; text-align: justify; }\n  p { margin: 0 0 16px; }\n  .student-name { margin: 22px 0; font-size: 18px; font-weight: 700; text-align: center; text-transform: uppercase; color: var(--document-accent); }\n}\n\n.section-title[_ngcontent-%COMP%] {\n  padding-bottom: 5px;\n  margin: 0 0 12px;\n  font: 700 10px Arial, sans-serif;\n  letter-spacing: .06em;\n  text-transform: uppercase;\n  color: var(--document-accent);\n  border-bottom: 1px solid #d0d5dd;\n}\n\n.identity-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0;\n  margin: 0 0 28px;\n  border-top: 1px solid #d0d5dd;\n  border-left: 1px solid #d0d5dd;\n\n  div { min-height: 52px; padding: 9px 11px; border-right: 1px solid #d0d5dd; border-bottom: 1px solid #d0d5dd; }\n  dt { font: 6.5px Arial, sans-serif; text-transform: uppercase; color: #667085; }\n  dd { margin: 3px 0 0; font-weight: 700; }\n}\n\n.meeting-card[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1px;\n  margin: 24px 0;\n  background: #d0d5dd;\n  border: 1px solid #d0d5dd;\n\n  div { padding: 10px 12px; background: #f9fafb; }\n  dt { font: 7px Arial, sans-serif; text-transform: uppercase; color: #667085; }\n  dd { margin: 3px 0 0; font-weight: 700; }\n}\n\n.student-card-print[_ngcontent-%COMP%] {\n  width: 84%;\n  margin: 30px auto;\n  overflow: hidden;\n  font-family: Arial, sans-serif;\n  border: 1px solid #98a2b3;\n  border-radius: 12px;\n  box-shadow: 0 4px 10px rgb(16 24 40 / 10%);\n\n  > header { display: flex; justify-content: space-between; padding: 10px 14px; color: #fff; background: var(--document-accent); }\n  > header span { font-size: 10px; font-weight: 800; letter-spacing: .12em; }\n  &__body { display: grid; grid-template-columns: 90px 1fr; gap: 18px; padding: 18px; }\n  &__photo { display: grid; height: 110px; overflow: hidden; place-items: center; font-size: 34px; font-weight: 800; color: var(--document-accent); background: #eef2f6; border-radius: 8px; }\n  &__photo img { width: 100%; height: 100%; object-fit: cover; }\n  dl { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 0; }\n  dt { font-size: 6.5px; text-transform: uppercase; color: #667085; }\n  dd { margin: 2px 0 0; font-size: 10px; font-weight: 700; }\n  > footer { display: flex; justify-content: space-between; padding: 8px 14px; font-size: 7px; color: #475467; background: #f2f4f7; }\n}\n\n.additional-mention[_ngcontent-%COMP%] {\n  padding: 9px 12px;\n  margin: 12px 0 0;\n  font-size: 9px;\n  font-style: italic;\n  color: #475467;\n  background: #f9fafb;\n  border-left: 3px solid var(--document-accent);\n}\n\n.document-closing[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-end;\n  margin-top: 26px;\n\n  > p { margin: 0 18px 0 0; font-size: 10px; }\n}\n\n.signature-block[_ngcontent-%COMP%] {\n  width: 180px;\n  text-align: center;\n  span { display: block; font-size: 9px; font-weight: 700; text-decoration: underline; }\n  &__space { display: grid; height: 72px; place-items: center; font: italic 7px Arial, sans-serif; color: #98a2b3; }\n  strong { font-size: 9px; }\n}\n\n.official-sheet__footer[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 8px 14px;\n  align-items: end;\n  padding-top: 10px;\n  margin-top: auto;\n  font-family: Arial, sans-serif;\n  border-top: 1px solid var(--document-accent);\n\n  > p { margin: 0; font-size: 6.5px; color: #667085; }\n  .page-number { grid-column: 1 / -1; font-size: 6px; text-align: right; color: #98a2b3; }\n}\n\n.verification-block[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  min-width: 130px;\n\n  &__qr { display: grid; width: 28px; height: 28px; place-items: center; font-size: 23px; color: #101828; border: 1px solid #101828; }\n  > span:last-child { display: flex; flex-direction: column; }\n  small { font-size: 5.5px; text-transform: uppercase; color: #667085; }\n  strong { font-size: 8px; letter-spacing: .08em; }\n}\n\n@include tablet-down {\n  .workspace,\n  .settings-workspace { grid-template-columns: 1fr; }\n  .preview-panel { position: static; }\n  .preview-stage { max-height: none; }\n}\n\n@include mobile {\n  .tabs { display: flex; width: 100%; overflow-x: auto; }\n  .tabs__item { flex: 0 0 auto; }\n  .template-grid,\n  .field-row,\n  .field-row--3,\n  .student-filters,\n  .option-grid,\n  .register-summary { grid-template-columns: 1fr; }\n  .student-row { grid-template-columns: 34px minmax(0, 1fr) 18px; }\n  .student-row__class { display: none; }\n  .builder__head,\n  .template-grid,\n  .student-filters,\n  .document-fields,\n  .settings-form { padding-right: var(--space-4); padding-left: var(--space-4); }\n  .student-list { margin-right: var(--space-4); margin-left: var(--space-4); }\n  .builder__actions,\n  .settings-card__foot { align-items: stretch; flex-direction: column; }\n  .builder__actions .btn,\n  .settings-card__foot .btn { width: 100%; }\n  .register__head,\n  .register__filters { align-items: stretch; flex-direction: column; }\n  .register__filters .select,\n  .search-box--compact { width: 100%; }\n  .logo-editor { grid-template-columns: 64px 1fr; }\n  .color-field { grid-column: 1 / -1; }\n  .preview-stage { padding: var(--space-2); }\n  .official-sheet { min-height: 660px; padding: 24px 22px 18px; }\n  .letterhead { grid-template-columns: 1fr; }\n  .letterhead__authority { display: none; }\n}\n\n@media print {\n  .screen-only[_ngcontent-%COMP%] { display: none !important; }\n  .print-only[_ngcontent-%COMP%] { display: block; }\n\n  .official-sheet[_ngcontent-%COMP%] {\n    width: 210mm;\n    min-height: 297mm;\n    padding: 14mm 16mm 11mm;\n    font-size: 10.5pt;\n    box-shadow: none;\n    page-break-after: always;\n  }\n\n  .official-sheet__watermark[_ngcontent-%COMP%] { display: none; }\n  .letterhead__school[_ngcontent-%COMP%]    > strong[_ngcontent-%COMP%] { font-size: 13pt; }\n  .letterhead__school[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%], \n   .letterhead__school[_ngcontent-%COMP%]    > em[_ngcontent-%COMP%], \n   .letterhead__authority[_ngcontent-%COMP%] { font-size: 7.5pt; }\n  .letterhead-details[_ngcontent-%COMP%] { font-size: 6.5pt; }\n  .document-heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { font-size: 18pt; }\n  .document-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { font-size: 8pt; }\n  .document-body--prose[_ngcontent-%COMP%] { font-size: 11pt; }\n  .document-body[_ngcontent-%COMP%]   .student-name[_ngcontent-%COMP%] { font-size: 17pt; }\n}\n\n@page { size: A4 portrait; margin: 0; }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StudentFilesComponent, [{
        type: Component,
        args: [{ selector: 'eduops-student-files', standalone: true, imports: [CommonModule, ReactiveFormsModule, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page screen-only\">\n  <header class=\"page__header\">\n    <div>\n      <div class=\"eyebrow\">Scolarit\u00E9 \u00B7 Documents</div>\n      <h1 class=\"page__title\">Documents officiels</h1>\n      <p class=\"page__meta\">\n        \u00C9mettez, imprimez et retrouvez les pi\u00E8ces remises aux \u00E9l\u00E8ves et aux familles.\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      <button type=\"button\" class=\"btn btn--secondary\" (click)=\"changeTab('SETTINGS')\">\n        <span class=\"btn-icon\" aria-hidden=\"true\">\u2699</span> Papier \u00E0 en-t\u00EAte\n      </button>\n      <button type=\"button\" class=\"btn btn--primary\" (click)=\"newDocument()\">\n        <span aria-hidden=\"true\">\uFF0B</span> Nouveau document\n      </button>\n    </div>\n  </header>\n\n  <nav class=\"tabs\" role=\"tablist\" aria-label=\"Documents officiels\">\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'CREATE'\"\n            [attr.aria-selected]=\"tab() === 'CREATE'\"\n            (click)=\"changeTab('CREATE')\">\n      Cr\u00E9er un document\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'REGISTER'\"\n            [attr.aria-selected]=\"tab() === 'REGISTER'\"\n            (click)=\"changeTab('REGISTER')\">\n      Registre\n      <span class=\"tabs__badge numeric\">{{ issuedCount() }}</span>\n    </button>\n    <button type=\"button\" class=\"tabs__item\" role=\"tab\"\n            [class.tabs__item--on]=\"tab() === 'SETTINGS'\"\n            [attr.aria-selected]=\"tab() === 'SETTINGS'\"\n            (click)=\"changeTab('SETTINGS')\">\n      Mise en page\n    </button>\n  </nav>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des documents officiels...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n\n    @if (tab() === 'CREATE') {\n      <div class=\"workspace\">\n        <section class=\"builder card\">\n          <header class=\"builder__head\">\n            <span class=\"step-number\">1</span>\n            <div>\n              <h2>Choisir le document</h2>\n              <p>Le texte officiel et les champs utiles s\u2019adaptent au mod\u00E8le.</p>\n            </div>\n          </header>\n\n          <div class=\"template-grid\">\n            @for (template of templates; track template.type) {\n              <button type=\"button\" class=\"template-card\"\n                      [class.template-card--on]=\"issueForm.controls.type.value === template.type\"\n                      [attr.data-tone]=\"template.tone\"\n                      (click)=\"chooseTemplate(template.type)\">\n                <span class=\"template-card__mark\" aria-hidden=\"true\">{{ template.shortCode }}</span>\n                <span class=\"template-card__copy\">\n                  <strong>{{ template.label }}</strong>\n                  <small>{{ template.description }}</small>\n                </span>\n                @if (issueForm.controls.type.value === template.type) {\n                  <span class=\"template-card__check\" aria-hidden=\"true\">\u2713</span>\n                }\n              </button>\n            }\n          </div>\n\n          <header class=\"builder__head builder__head--section\">\n            <span class=\"step-number\">2</span>\n            <div>\n              <h2>S\u00E9lectionner l\u2019\u00E9l\u00E8ve</h2>\n              <p>L\u2019identit\u00E9 et l\u2019inscription sont reprises du dossier scolaire.</p>\n            </div>\n          </header>\n\n          <div class=\"student-filters\">\n            <div class=\"search-box\">\n              <span aria-hidden=\"true\">\u2315</span>\n              <input type=\"search\" placeholder=\"Nom, pr\u00E9nom ou matricule\"\n                     [value]=\"studentSearch()\"\n                     (input)=\"studentSearch.set($any($event.target).value)\" />\n            </div>\n            <select class=\"select\" aria-label=\"Filtrer par classe\"\n                    [value]=\"classroomFilter()\"\n                    (change)=\"classroomFilter.set($any($event.target).value)\">\n              <option value=\"\">Toutes les classes</option>\n              @for (classroom of classrooms(); track classroom.id) {\n                <option [value]=\"classroom.id\">{{ classroom.name }}</option>\n              }\n            </select>\n          </div>\n\n          <div class=\"student-list\" role=\"listbox\" aria-label=\"\u00C9l\u00E8ves\">\n            @for (student of visibleStudents(); track student.id) {\n              <button type=\"button\" class=\"student-row\" role=\"option\"\n                      [class.student-row--on]=\"selectedStudentId() === student.id\"\n                      [attr.aria-selected]=\"selectedStudentId() === student.id\"\n                      (click)=\"chooseStudent(student.id)\">\n                <span class=\"student-row__avatar\" aria-hidden=\"true\">\n                  {{ student.firstName.charAt(0) }}{{ student.lastName.charAt(0) }}\n                </span>\n                <span class=\"student-row__copy\">\n                  <strong>{{ student.fullName }}</strong>\n                  <small class=\"numeric\">{{ student.studentNumber }}</small>\n                </span>\n                <span class=\"student-row__class\">{{ student.classroomName || 'Sans classe' }}</span>\n                <span class=\"student-row__radio\" aria-hidden=\"true\"></span>\n              </button>\n            } @empty {\n              <div class=\"student-empty\">Aucun \u00E9l\u00E8ve ne correspond \u00E0 cette recherche.</div>\n            }\n          </div>\n\n          <header class=\"builder__head builder__head--section\">\n            <span class=\"step-number\">3</span>\n            <div>\n              <h2>Compl\u00E9ter les mentions</h2>\n              <p>Seules les informations utiles au mod\u00E8le choisi sont imprim\u00E9es.</p>\n            </div>\n          </header>\n\n          <form class=\"document-fields\" [formGroup]=\"issueForm\">\n            <div class=\"field-row\">\n              <div class=\"field\">\n                <label class=\"field__label field__label--required\" for=\"issue-date\">\n                  Date de d\u00E9livrance\n                </label>\n                <input id=\"issue-date\" class=\"input\" type=\"date\" formControlName=\"issueDate\" />\n              </div>\n              <div class=\"field\">\n                <label class=\"field__label\" for=\"valid-until\">Valable jusqu\u2019au</label>\n                <input id=\"valid-until\" class=\"input\" type=\"date\" formControlName=\"validUntil\" />\n                <span class=\"field__hint\">Laissez vide si la pi\u00E8ce n\u2019expire pas.</span>\n              </div>\n            </div>\n\n            @if (issueForm.controls.type.value === 'SUMMONS') {\n              <div class=\"field\">\n                <label class=\"field__label field__label--required\" for=\"purpose\">Motif</label>\n                <input id=\"purpose\" class=\"input\" formControlName=\"purpose\"\n                       placeholder=\"Entretien relatif au suivi scolaire de l\u2019\u00E9l\u00E8ve\" />\n              </div>\n              <div class=\"field-row field-row--3\">\n                <div class=\"field\">\n                  <label class=\"field__label field__label--required\" for=\"meeting-date\">Date</label>\n                  <input id=\"meeting-date\" class=\"input\" type=\"date\"\n                         formControlName=\"meetingDate\" />\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"meeting-time\">Heure</label>\n                  <input id=\"meeting-time\" class=\"input\" type=\"time\"\n                         formControlName=\"meetingTime\" />\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"meeting-place\">Lieu</label>\n                  <input id=\"meeting-place\" class=\"input\" formControlName=\"meetingPlace\"\n                         placeholder=\"Bureau de la direction\" />\n                </div>\n              </div>\n            } @else {\n              <div class=\"field-row\">\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"recipient\">Destinataire</label>\n                  <input id=\"recipient\" class=\"input\" formControlName=\"recipient\"\n                         placeholder=\"\u00C0 qui de droit\" />\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"purpose\">Motif ou usage</label>\n                  <input id=\"purpose\" class=\"input\" formControlName=\"purpose\"\n                         placeholder=\"Pour servir et valoir ce que de droit\" />\n                </div>\n              </div>\n            }\n\n            <div class=\"field\">\n              <label class=\"field__label\" for=\"additional-mention\">Mention compl\u00E9mentaire</label>\n              <textarea id=\"additional-mention\" class=\"textarea\" rows=\"2\"\n                        formControlName=\"additionalMention\"\n                        placeholder=\"Cette mention appara\u00EEtra sous le texte principal.\"></textarea>\n            </div>\n          </form>\n\n          @if (!canGenerate()) {\n            <p class=\"permission-note\">\n              Votre profil peut consulter le registre, mais ne peut pas \u00E9mettre de document.\n            </p>\n          }\n\n          <footer class=\"builder__actions\">\n            <div class=\"issue-note\">\n              <span class=\"issue-note__icon\" aria-hidden=\"true\">\u2713</span>\n              <span>Le num\u00E9ro et le code d\u2019authenticit\u00E9 sont attribu\u00E9s au moment de l\u2019\u00E9mission.</span>\n            </div>\n            <button type=\"button\" class=\"btn btn--secondary\"\n                    [disabled]=\"!readyToIssue()\" (click)=\"issue(false)\">\n              {{ saving() ? '\u00C9mission...' : '\u00C9mettre sans imprimer' }}\n            </button>\n            <button type=\"button\" class=\"btn btn--primary\"\n                    [disabled]=\"!readyToIssue()\" (click)=\"issue(true)\">\n              <span aria-hidden=\"true\">\u25A3</span>\n              {{ saving() ? 'Pr\u00E9paration...' : '\u00C9mettre et imprimer' }}\n            </button>\n          </footer>\n        </section>\n\n        <aside class=\"preview-panel\" aria-label=\"Aper\u00E7u du document\">\n          <header class=\"preview-panel__head\">\n            <div>\n              <span class=\"preview-panel__eyebrow\">Aper\u00E7u avant \u00E9mission</span>\n              <strong>A4 \u00B7 Portrait</strong>\n            </div>\n            <span class=\"preview-panel__scale\">72 %</span>\n          </header>\n          <div class=\"preview-stage\">\n            @if (previewDocument(); as document) {\n              <ng-container *ngTemplateOutlet=\"officialSheet; context: { $implicit: document }\" />\n            } @else {\n              <div class=\"preview-empty\">S\u00E9lectionnez un \u00E9l\u00E8ve pour afficher le document.</div>\n            }\n          </div>\n        </aside>\n      </div>\n    }\n\n    @if (tab() === 'REGISTER') {\n      <section class=\"register-summary\">\n        <article class=\"summary-card\">\n          <span class=\"summary-card__icon summary-card__icon--blue\" aria-hidden=\"true\">\u25A4</span>\n          <div><strong class=\"numeric\">{{ documents().length }}</strong><span>documents enregistr\u00E9s</span></div>\n        </article>\n        <article class=\"summary-card\">\n          <span class=\"summary-card__icon summary-card__icon--green\" aria-hidden=\"true\">\u2713</span>\n          <div><strong class=\"numeric\">{{ issuedCount() }}</strong><span>documents valides</span></div>\n        </article>\n        <article class=\"summary-card\">\n          <span class=\"summary-card__icon summary-card__icon--red\" aria-hidden=\"true\">\u00D7</span>\n          <div><strong class=\"numeric\">{{ revokedCount() }}</strong><span>documents r\u00E9voqu\u00E9s</span></div>\n        </article>\n      </section>\n\n      <section class=\"card register\">\n        <header class=\"register__head\">\n          <div>\n            <h2>Registre d\u2019\u00E9mission</h2>\n            <p>Une pi\u00E8ce \u00E9mise reste tra\u00E7able, m\u00EAme apr\u00E8s sa r\u00E9vocation.</p>\n          </div>\n          <div class=\"register__filters\">\n            <div class=\"search-box search-box--compact\">\n              <span aria-hidden=\"true\">\u2315</span>\n              <input type=\"search\" placeholder=\"\u00C9l\u00E8ve, matricule ou num\u00E9ro\"\n                     [value]=\"historySearch()\"\n                     (input)=\"historySearch.set($any($event.target).value)\" />\n            </div>\n            <select class=\"select\" aria-label=\"Filtrer par type\"\n                    [value]=\"historyType()\"\n                    (change)=\"historyType.set($any($event.target).value)\">\n              <option value=\"\">Tous les documents</option>\n              @for (template of templates; track template.type) {\n                <option [value]=\"template.type\">{{ template.label }}</option>\n              }\n            </select>\n          </div>\n        </header>\n\n        <div class=\"table-wrapper\">\n          <table class=\"table register-table\">\n            <caption class=\"visually-hidden\">Documents officiels \u00E9mis</caption>\n            <thead>\n              <tr>\n                <th scope=\"col\">Document</th>\n                <th scope=\"col\">\u00C9l\u00E8ve</th>\n                <th scope=\"col\">Classe</th>\n                <th scope=\"col\">D\u00E9livr\u00E9 le</th>\n                <th scope=\"col\">\u00C9tat</th>\n                <th scope=\"col\" class=\"cell-actions\">Actions</th>\n              </tr>\n            </thead>\n            <tbody>\n              @for (document of visibleDocuments(); track document.id) {\n                <tr [class.register-table__revoked]=\"document.status === 'REVOKED'\">\n                  <td>\n                    <span class=\"document-cell__title\">{{ document.typeLabel }}</span>\n                    <span class=\"document-cell__number numeric\">{{ document.documentNumber }}</span>\n                  </td>\n                  <td>\n                    <span class=\"document-cell__title\">{{ document.studentName }}</span>\n                    <span class=\"document-cell__number numeric\">{{ document.studentNumber }}</span>\n                  </td>\n                  <td>{{ document.classroomName || '\u2014' }}</td>\n                  <td class=\"numeric\">{{ shortDate(document.issuedAt) }}</td>\n                  <td>\n                    <span class=\"status-pill\" [attr.data-status]=\"document.status\">\n                      {{ statusLabel(document.status) }}\n                    </span>\n                    @if (document.revokeReason) {\n                      <span class=\"document-cell__reason\">{{ document.revokeReason }}</span>\n                    }\n                  </td>\n                  <td class=\"cell-actions\">\n                    <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                            (click)=\"print(document)\">R\u00E9imprimer</button>\n                    @if (document.status === 'ISSUED' && canGenerate()) {\n                      <button type=\"button\" class=\"btn btn--ghost btn--sm btn--text-danger\"\n                              (click)=\"openRevoke(document)\">R\u00E9voquer</button>\n                    }\n                  </td>\n                </tr>\n              } @empty {\n                <tr>\n                  <td colspan=\"6\">\n                    <div class=\"register-empty\">\n                      <span aria-hidden=\"true\">\u25A4</span>\n                      <strong>Aucun document trouv\u00E9</strong>\n                      <p>\u00C9mettez un premier document ou ajustez les filtres.</p>\n                    </div>\n                  </td>\n                </tr>\n              }\n            </tbody>\n          </table>\n        </div>\n      </section>\n    }\n\n    @if (tab() === 'SETTINGS') {\n      <div class=\"settings-workspace\">\n        <section class=\"settings-card card\">\n          <header class=\"settings-card__head\">\n            <div>\n              <span class=\"settings-card__eyebrow\">Param\u00E8tres de l\u2019\u00E9tablissement</span>\n              <h2>Papier \u00E0 en-t\u00EAte officiel</h2>\n              <p>Ces r\u00E9glages s\u2019appliqueront uniquement aux prochains documents.</p>\n            </div>\n            @if (!canConfigure()) {\n              <span class=\"status-pill\" data-status=\"DRAFT\">Lecture seule</span>\n            }\n          </header>\n\n          <form class=\"settings-form\" [formGroup]=\"layoutForm\">\n            <fieldset [disabled]=\"!canConfigure()\">\n              <legend>Identit\u00E9 visuelle</legend>\n              <div class=\"logo-editor\">\n                <div class=\"logo-editor__preview\">\n                  @if (layoutForm.controls.logoDataUrl.value && layoutForm.controls.showLogo.value) {\n                    <img [src]=\"layoutForm.controls.logoDataUrl.value\" alt=\"Logo de l\u2019\u00E9tablissement\" />\n                  } @else {\n                    <span>{{ layoutForm.controls.schoolName.value.charAt(0) || 'E' }}</span>\n                  }\n                </div>\n                <div class=\"logo-editor__copy\">\n                  <strong>Logo de l\u2019\u00E9tablissement</strong>\n                  <small>PNG, JPG ou SVG \u00B7 500 Ko maximum</small>\n                  <div class=\"logo-editor__actions\">\n                    <label class=\"btn btn--secondary btn--sm\" for=\"school-logo\">Choisir un logo</label>\n                    <input id=\"school-logo\" class=\"visually-hidden\" type=\"file\"\n                           accept=\"image/png,image/jpeg,image/svg+xml\"\n                           (change)=\"onLogoSelected($event)\" />\n                    @if (layoutForm.controls.logoDataUrl.value) {\n                      <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                              (click)=\"removeLogo()\">Retirer</button>\n                    }\n                  </div>\n                </div>\n                <label class=\"color-field\">\n                  <span>Couleur officielle</span>\n                  <span class=\"color-field__control\">\n                    <input type=\"color\" formControlName=\"accentColor\" />\n                    <input class=\"input numeric\" formControlName=\"accentColor\" />\n                  </span>\n                </label>\n              </div>\n\n              <div class=\"field-row\">\n                <div class=\"field\">\n                  <label class=\"field__label field__label--required\" for=\"school-name\">\n                    Nom affich\u00E9\n                  </label>\n                  <input id=\"school-name\" class=\"input\" formControlName=\"schoolName\" />\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"legal-name\">D\u00E9nomination l\u00E9gale</label>\n                  <input id=\"legal-name\" class=\"input\" formControlName=\"legalName\" />\n                </div>\n              </div>\n              <div class=\"field-row\">\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"motto\">Devise</label>\n                  <input id=\"motto\" class=\"input\" formControlName=\"motto\" />\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"registration-number\">\n                    N\u00B0 d\u2019autorisation / agr\u00E9ment\n                  </label>\n                  <input id=\"registration-number\" class=\"input\"\n                         formControlName=\"registrationNumber\" />\n                </div>\n              </div>\n            </fieldset>\n\n            <fieldset [disabled]=\"!canConfigure()\">\n              <legend>En-t\u00EAte institutionnel</legend>\n              <div class=\"field-row\">\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"header-left\">Bloc gauche</label>\n                  <textarea id=\"header-left\" class=\"textarea\" rows=\"3\"\n                            formControlName=\"headerLeft\"></textarea>\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"header-right\">Bloc droit</label>\n                  <textarea id=\"header-right\" class=\"textarea\" rows=\"3\"\n                            formControlName=\"headerRight\"></textarea>\n                </div>\n              </div>\n              <div class=\"field-row\">\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"address\">Adresse</label>\n                  <input id=\"address\" class=\"input\" formControlName=\"address\" />\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"city\">Ville</label>\n                  <input id=\"city\" class=\"input\" formControlName=\"city\" />\n                </div>\n              </div>\n              <div class=\"field-row field-row--3\">\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"phone\">T\u00E9l\u00E9phone</label>\n                  <input id=\"phone\" class=\"input\" formControlName=\"phone\" />\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"email\">E-mail</label>\n                  <input id=\"email\" class=\"input\" type=\"email\" formControlName=\"email\" />\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"website\">Site web</label>\n                  <input id=\"website\" class=\"input\" formControlName=\"website\" />\n                </div>\n              </div>\n            </fieldset>\n\n            <fieldset [disabled]=\"!canConfigure()\">\n              <legend>Signature, pied de page et s\u00E9curit\u00E9</legend>\n              <div class=\"field-row\">\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"signatory-name\">Nom du signataire</label>\n                  <input id=\"signatory-name\" class=\"input\" formControlName=\"signatoryName\" />\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label field__label--required\" for=\"signatory-title\">\n                    Fonction du signataire\n                  </label>\n                  <input id=\"signatory-title\" class=\"input\" formControlName=\"signatoryTitle\" />\n                </div>\n              </div>\n              <div class=\"field\">\n                <label class=\"field__label\" for=\"footer-text\">Texte du pied de page</label>\n                <textarea id=\"footer-text\" class=\"textarea\" rows=\"2\"\n                          formControlName=\"footerText\"></textarea>\n              </div>\n              <div class=\"field\">\n                <label class=\"field__label field__label--required\" for=\"number-pattern\">\n                  Num\u00E9rotation\n                </label>\n                <input id=\"number-pattern\" class=\"input numeric\"\n                       formControlName=\"documentNumberPattern\" />\n                <span class=\"field__hint\">\n                  Variables : &#123;year&#125;, &#123;yy&#125;, &#123;schoolCode&#125; et\n                  &#123;seq:6&#125;. Exemple : DOC-2026-000123.\n                </span>\n                @if (layoutForm.controls.documentNumberPattern.invalid) {\n                  <span class=\"field__error\">Le mod\u00E8le doit contenir &#123;seq&#125; ou &#123;seq:n&#125;.</span>\n                }\n              </div>\n              <div class=\"option-grid\">\n                <label class=\"check-option\">\n                  <input type=\"checkbox\" formControlName=\"showLogo\" />\n                  <span><strong>Afficher le logo</strong><small>Dans le bloc central de l\u2019en-t\u00EAte</small></span>\n                </label>\n                <label class=\"check-option\">\n                  <input type=\"checkbox\" formControlName=\"showMotto\" />\n                  <span><strong>Afficher la devise</strong><small>Sous le nom de l\u2019\u00E9tablissement</small></span>\n                </label>\n                <label class=\"check-option\">\n                  <input type=\"checkbox\" formControlName=\"showSignatureLine\" />\n                  <span><strong>Zone de signature</strong><small>R\u00E9serve une zone pour le cachet</small></span>\n                </label>\n                <label class=\"check-option\">\n                  <input type=\"checkbox\" formControlName=\"showVerificationCode\" />\n                  <span><strong>Code d\u2019authenticit\u00E9</strong><small>Identifiant unique v\u00E9rifiable</small></span>\n                </label>\n              </div>\n            </fieldset>\n          </form>\n\n          <footer class=\"settings-card__foot\">\n            <p>\n              Les documents d\u00E9j\u00E0 \u00E9mis conservent leur ancien en-t\u00EAte afin de rester identiques\n              aux exemplaires remis.\n            </p>\n            <button type=\"button\" class=\"btn btn--secondary\"\n                    [disabled]=\"layoutForm.pristine || saving()\"\n                    (click)=\"cancelLayoutChanges()\">Annuler</button>\n            <button type=\"button\" class=\"btn btn--primary\"\n                    [disabled]=\"layoutForm.invalid || layoutForm.pristine || saving() || !canConfigure()\"\n                    (click)=\"saveLayout()\">\n              {{ saving() ? 'Enregistrement...' : 'Enregistrer la mise en page' }}\n            </button>\n          </footer>\n        </section>\n\n        <aside class=\"preview-panel preview-panel--settings\" aria-label=\"Aper\u00E7u du papier \u00E0 en-t\u00EAte\">\n          <header class=\"preview-panel__head\">\n            <div>\n              <span class=\"preview-panel__eyebrow\">Aper\u00E7u en direct</span>\n              <strong>{{ selectedTemplate().label }}</strong>\n            </div>\n            <span class=\"live-dot\">En direct</span>\n          </header>\n          <div class=\"preview-stage\">\n            @if (previewDocument(); as document) {\n              <ng-container *ngTemplateOutlet=\"officialSheet; context: { $implicit: document }\" />\n            }\n          </div>\n        </aside>\n      </div>\n    }\n  }\n\n  @if (revokeTarget(); as document) {\n    <div class=\"drawer-backdrop\" (click)=\"closeRevoke()\"></div>\n    <aside class=\"revoke-dialog card\" role=\"dialog\" aria-modal=\"true\"\n           aria-labelledby=\"revoke-title\">\n      <div class=\"revoke-dialog__icon\" aria-hidden=\"true\">!</div>\n      <h2 id=\"revoke-title\">R\u00E9voquer {{ document.documentNumber }} ?</h2>\n      <p>\n        Le document restera dans le registre, mais son code de v\u00E9rification indiquera\n        qu\u2019il n\u2019est plus valable. Cette action ne se supprime pas.\n      </p>\n      <form [formGroup]=\"revokeForm\">\n        <div class=\"field\">\n          <label class=\"field__label field__label--required\" for=\"revoke-reason\">Motif</label>\n          <textarea id=\"revoke-reason\" class=\"textarea\" rows=\"3\" formControlName=\"reason\"\n                    placeholder=\"Erreur sur l\u2019identit\u00E9, document remplac\u00E9...\"></textarea>\n        </div>\n      </form>\n      <div class=\"revoke-dialog__actions\">\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closeRevoke()\">Annuler</button>\n        <button type=\"button\" class=\"btn btn--danger\"\n                [disabled]=\"revokeForm.invalid || saving()\" (click)=\"revoke()\">\n          {{ saving() ? 'R\u00E9vocation...' : 'Confirmer la r\u00E9vocation' }}\n        </button>\n      </div>\n    </aside>\n  }\n</div>\n\n<!-- Un seul gabarit sert \u00E0 l\u2019aper\u00E7u et \u00E0 l\u2019impression : aucune divergence visuelle. -->\n<ng-template #officialSheet let-document>\n  <article class=\"official-sheet\" [class.official-sheet--revoked]=\"document.status === 'REVOKED'\"\n           [class.official-sheet--card]=\"document.type === 'STUDENT_CARD'\"\n           [style.--document-accent]=\"document.layout.accentColor\">\n    @if (document.status === 'DRAFT') {\n      <span class=\"official-sheet__watermark\">APER\u00C7U</span>\n    } @else if (document.status === 'REVOKED') {\n      <span class=\"official-sheet__watermark official-sheet__watermark--revoked\">R\u00C9VOQU\u00C9</span>\n    }\n\n    <header class=\"letterhead\">\n      <div class=\"letterhead__authority letterhead__authority--left\">\n        {{ document.layout.headerLeft }}\n      </div>\n      <div class=\"letterhead__school\">\n        @if (document.layout.showLogo) {\n          @if (document.layout.logoDataUrl) {\n            <img class=\"letterhead__logo\" [src]=\"document.layout.logoDataUrl\" alt=\"\" />\n          } @else {\n            <span class=\"letterhead__monogram\" aria-hidden=\"true\">\n              {{ document.layout.schoolName.charAt(0) }}\n            </span>\n          }\n        }\n        <strong>{{ document.layout.schoolName }}</strong>\n        @if (document.layout.legalName) { <small>{{ document.layout.legalName }}</small> }\n        @if (document.layout.showMotto && document.layout.motto) {\n          <em>\u00AB {{ document.layout.motto }} \u00BB</em>\n        }\n      </div>\n      <div class=\"letterhead__authority letterhead__authority--right\">\n        {{ document.layout.headerRight }}\n      </div>\n    </header>\n\n    <div class=\"letterhead-details\">\n      <span>{{ document.layout.address }}@if (document.layout.city) { \u00B7 {{ document.layout.city }} }</span>\n      <span>\n        @if (document.layout.phone) { T\u00E9l. {{ document.layout.phone }} }\n        @if (document.layout.email) { \u00B7 {{ document.layout.email }} }\n      </span>\n      @if (document.layout.registrationNumber) {\n        <span>{{ document.layout.registrationNumber }}</span>\n      }\n    </div>\n\n    <section class=\"document-heading\">\n      <span class=\"document-heading__rule\"></span>\n      <h1>{{ document.title }}</h1>\n      <p class=\"numeric\">N\u00B0 {{ document.documentNumber }}</p>\n    </section>\n\n    @if (document.type === 'SCHOOL_CERTIFICATE') {\n      <section class=\"document-body document-body--prose\">\n        <p>\n          Je soussign\u00E9(e), <strong>{{ document.layout.signatoryName || document.layout.signatoryTitle }}</strong>,\n          {{ document.layout.signatoryTitle }}, certifie que {{ salutation(document) }}\n        </p>\n        <p class=\"student-name\">{{ document.studentName }}</p>\n        <p>\n          matricule <strong class=\"numeric\">{{ document.studentNumber }}</strong>,\n          {{ bornLabel(document) }} le <strong>{{ formatDate(document.birthDate) }}</strong>\n          @if (document.birthPlace) { \u00E0 <strong>{{ document.birthPlace }}</strong> },\n          est r\u00E9guli\u00E8rement inscrit(e) en classe de\n          <strong>{{ document.classroomName || document.levelName }}</strong> au titre de l\u2019ann\u00E9e\n          scolaire <strong>{{ document.academicYearCode }}</strong>.\n        </p>\n        <p>\n          Le pr\u00E9sent certificat lui est d\u00E9livr\u00E9\n          @if (document.metadata.recipient) { \u00E0 l\u2019attention de <strong>{{ document.metadata.recipient }}</strong> }\n          @if (document.metadata.purpose) { pour <strong>{{ document.metadata.purpose }}</strong> }\n          @else { pour servir et valoir ce que de droit }.\n        </p>\n      </section>\n    } @else if (document.type === 'ENROLLMENT_ATTESTATION') {\n      <section class=\"document-body document-body--prose\">\n        <p>\n          La direction de <strong>{{ document.layout.schoolName }}</strong> atteste que\n          l\u2019inscription administrative de\n        </p>\n        <p class=\"student-name\">{{ document.studentName }}</p>\n        <p>\n          sous le matricule <strong class=\"numeric\">{{ document.studentNumber }}</strong>,\n          est enregistr\u00E9e pour l\u2019ann\u00E9e scolaire <strong>{{ document.academicYearCode }}</strong>,\n          en classe de <strong>{{ document.classroomName }}</strong>.\n        </p>\n        @if (document.enrollmentNumber) {\n          <p>R\u00E9f\u00E9rence d\u2019inscription : <strong class=\"numeric\">{{ document.enrollmentNumber }}</strong>.</p>\n        }\n        <p>\n          La pr\u00E9sente attestation est d\u00E9livr\u00E9e\n          @if (document.metadata.purpose) { pour {{ document.metadata.purpose }} }\n          @else { pour servir et valoir ce que de droit }.\n        </p>\n      </section>\n    } @else if (document.type === 'STUDENT_FILE') {\n      <section class=\"document-body\">\n        <h2 class=\"section-title\">Identit\u00E9 de l\u2019\u00E9l\u00E8ve</h2>\n        <dl class=\"identity-grid\">\n          <div><dt>Nom et pr\u00E9noms</dt><dd>{{ document.studentName }}</dd></div>\n          <div><dt>Matricule</dt><dd class=\"numeric\">{{ document.studentNumber }}</dd></div>\n          <div><dt>Date de naissance</dt><dd>{{ formatDate(document.birthDate) }}</dd></div>\n          <div><dt>Lieu de naissance</dt><dd>{{ document.birthPlace || 'Non renseign\u00E9' }}</dd></div>\n          <div><dt>Nationalit\u00E9</dt><dd>{{ document.nationality || 'Non renseign\u00E9e' }}</dd></div>\n          <div><dt>Sexe</dt><dd>{{ document.gender === 'FEMALE' ? 'F\u00E9minin' : 'Masculin' }}</dd></div>\n        </dl>\n        <h2 class=\"section-title\">Situation scolaire actuelle</h2>\n        <dl class=\"identity-grid\">\n          <div><dt>Ann\u00E9e scolaire</dt><dd>{{ document.academicYearCode }}</dd></div>\n          <div><dt>Classe</dt><dd>{{ document.classroomName || 'Non affect\u00E9(e)' }}</dd></div>\n          <div><dt>Niveau</dt><dd>{{ document.levelName || '\u2014' }}</dd></div>\n          <div><dt>N\u00B0 d\u2019inscription</dt><dd class=\"numeric\">{{ document.enrollmentNumber || '\u2014' }}</dd></div>\n        </dl>\n      </section>\n    } @else if (document.type === 'SUMMONS') {\n      <section class=\"document-body document-body--prose\">\n        <p>@if (document.metadata.recipient) { <strong>{{ document.metadata.recipient }}</strong>, }</p>\n        <p>\n          Madame, Monsieur,<br /><br />Vous \u00EAtes pri\u00E9(e) de bien vouloir vous pr\u00E9senter \u00E0\n          <strong>{{ document.layout.schoolName }}</strong> au sujet de l\u2019\u00E9l\u00E8ve\n          <strong>{{ document.studentName }}</strong>, matricule\n          <strong class=\"numeric\">{{ document.studentNumber }}</strong>.\n        </p>\n        <dl class=\"meeting-card\">\n          <div><dt>Motif</dt><dd>{{ document.metadata.purpose || 'Entretien scolaire' }}</dd></div>\n          <div><dt>Date</dt><dd>{{ formatDate(document.metadata.meetingDate) }}</dd></div>\n          <div><dt>Heure</dt><dd>{{ document.metadata.meetingTime || '\u00C0 convenir' }}</dd></div>\n          <div><dt>Lieu</dt><dd>{{ document.metadata.meetingPlace || 'Administration' }}</dd></div>\n        </dl>\n        <p>Votre pr\u00E9sence est vivement souhait\u00E9e. Nous vous remercions de votre ponctualit\u00E9.</p>\n      </section>\n    } @else if (document.type === 'STUDENT_CARD') {\n      <section class=\"student-card-print\">\n        <header>\n          <span>CARTE D\u2019\u00C9L\u00C8VE</span><strong>{{ document.academicYearCode }}</strong>\n        </header>\n        <div class=\"student-card-print__body\">\n          <div class=\"student-card-print__photo\">\n            @if (document.photoUrl) { <img [src]=\"document.photoUrl\" alt=\"\" /> }\n            @else { <span>{{ document.studentName.charAt(0) }}</span> }\n          </div>\n          <dl>\n            <div><dt>Nom et pr\u00E9noms</dt><dd>{{ document.studentName }}</dd></div>\n            <div><dt>Matricule</dt><dd class=\"numeric\">{{ document.studentNumber }}</dd></div>\n            <div><dt>Classe</dt><dd>{{ document.classroomName }}</dd></div>\n            <div><dt>N\u00E9(e) le</dt><dd>{{ formatDate(document.birthDate) }}</dd></div>\n          </dl>\n        </div>\n        <footer>\n          <span>{{ document.layout.signatoryTitle }}</span>\n          <span class=\"numeric\">{{ document.verificationCode }}</span>\n        </footer>\n      </section>\n    }\n\n    @if (document.metadata.additionalMention) {\n      <p class=\"additional-mention\">{{ document.metadata.additionalMention }}</p>\n    }\n\n    @if (document.type !== 'STUDENT_CARD') {\n      <section class=\"document-closing\">\n        <p>\n          Fait \u00E0 <strong>{{ document.layout.city || '\u2014' }}</strong>,\n          le <strong>{{ formatDate(document.issuedAt) }}</strong>\n        </p>\n        @if (document.layout.showSignatureLine) {\n          <div class=\"signature-block\">\n            <span>{{ document.layout.signatoryTitle }}</span>\n            <div class=\"signature-block__space\">Signature et cachet</div>\n            @if (document.layout.signatoryName) { <strong>{{ document.layout.signatoryName }}</strong> }\n          </div>\n        }\n      </section>\n    }\n\n    <footer class=\"official-sheet__footer\">\n      <p>{{ document.layout.footerText }}</p>\n      @if (document.layout.showVerificationCode) {\n        <div class=\"verification-block\">\n          <span class=\"verification-block__qr\" aria-hidden=\"true\">\u25A6</span>\n          <span>\n            <small>Code d\u2019authenticit\u00E9</small>\n            <strong class=\"numeric\">{{ document.verificationCode }}</strong>\n          </span>\n        </div>\n      }\n      <span class=\"page-number\">Page 1 / 1</span>\n    </footer>\n  </article>\n</ng-template>\n\n<div class=\"print-only\">\n  @if (printing(); as document) {\n    <ng-container *ngTemplateOutlet=\"officialSheet; context: { $implicit: document }\" />\n  }\n</div>\n\n", styles: ["@import 'styles/tokens';\n\n.print-only { display: none; }\n\n.eyebrow,\n.settings-card__eyebrow,\n.preview-panel__eyebrow {\n  display: block;\n  margin-bottom: var(--space-1);\n  font-size: 10px;\n  font-weight: 800;\n  letter-spacing: .12em;\n  text-transform: uppercase;\n  color: var(--brand);\n}\n\n.btn-icon { font-size: 15px; }\n\n.tabs {\n  display: inline-flex;\n  gap: 3px;\n  padding: 3px;\n  margin-bottom: var(--space-5);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__item {\n    display: inline-flex;\n    align-items: center;\n    gap: var(--space-2);\n    min-height: 36px;\n    padding: 0 var(--space-4);\n    font: 600 var(--text-sm) var(--font-body);\n    color: var(--text-muted);\n    background: transparent;\n    border: 0;\n    border-radius: 8px;\n    cursor: pointer;\n\n    &--on {\n      color: var(--text-strong);\n      background: var(--surface-card);\n      box-shadow: var(--shadow-xs);\n    }\n  }\n\n  &__badge {\n    min-width: 20px;\n    padding: 1px 6px;\n    font-size: 10px;\n    color: var(--brand);\n    background: var(--brand-tint);\n    border-radius: var(--radius-pill);\n  }\n}\n\n.workspace,\n.settings-workspace {\n  display: grid;\n  grid-template-columns: minmax(590px, 1fr) minmax(430px, 620px);\n  gap: var(--space-5);\n  align-items: start;\n}\n\n.builder { overflow: hidden; }\n\n.builder__head {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  padding: var(--space-5) var(--space-6) var(--space-4);\n\n  &--section {\n    margin-top: var(--space-2);\n    padding-top: var(--space-5);\n    border-top: 1px solid var(--border-light);\n  }\n\n  h2 { margin: 0; font-size: var(--text-md); }\n  p { margin: 3px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.step-number {\n  display: inline-flex;\n  flex: 0 0 24px;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  font-size: 11px;\n  font-weight: 800;\n  color: var(--brand);\n  background: var(--brand-tint);\n  border-radius: 50%;\n}\n\n.template-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: var(--space-3);\n  padding: 0 var(--space-6) var(--space-5);\n}\n\n.template-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  min-height: 76px;\n  padding: var(--space-3);\n  text-align: left;\n  color: var(--text-normal);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  cursor: pointer;\n  transition: border-color var(--transition-fast), box-shadow var(--transition-fast),\n              transform var(--transition-fast);\n\n  &:hover { border-color: var(--brand-tint-border); transform: translateY(-1px); }\n  &--on { border-color: var(--brand); box-shadow: 0 0 0 2px var(--brand-tint); }\n\n  &__mark {\n    display: inline-flex;\n    flex: 0 0 40px;\n    align-items: center;\n    justify-content: center;\n    width: 40px;\n    height: 46px;\n    font-size: 11px;\n    font-weight: 800;\n    letter-spacing: .05em;\n    color: var(--brand);\n    background: var(--brand-tint);\n    border-radius: 8px 8px 8px 2px;\n  }\n\n  &[data-tone='green'] .template-card__mark { color: var(--success); background: var(--success-bg); }\n  &[data-tone='amber'] .template-card__mark { color: var(--warning); background: var(--warning-bg); }\n  &[data-tone='violet'] .template-card__mark { color: var(--chart-4); background: #f0ecfb; }\n  &[data-tone='slate'] .template-card__mark { color: var(--text-normal); background: var(--surface-sunken); }\n\n  &__copy {\n    display: flex;\n    flex: 1;\n    min-width: 0;\n    flex-direction: column;\n    gap: 3px;\n\n    strong { font-size: var(--text-sm); color: var(--text-strong); }\n    small { font-size: 11px; line-height: 1.35; color: var(--text-muted); }\n  }\n\n  &__check {\n    position: absolute;\n    top: 8px;\n    right: 8px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 18px;\n    height: 18px;\n    font-size: 10px;\n    color: #fff;\n    background: var(--brand);\n    border-radius: 50%;\n  }\n}\n\n.student-filters {\n  display: grid;\n  grid-template-columns: 1fr 180px;\n  gap: var(--space-3);\n  padding: 0 var(--space-6) var(--space-3);\n}\n\n.search-box {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  min-height: 38px;\n  padding: 0 var(--space-3);\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: var(--radius-input);\n\n  &:focus-within { border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-tint); }\n  input { width: 100%; font: inherit; color: var(--text-strong); background: transparent; border: 0; outline: 0; }\n  &--compact { width: min(300px, 100%); }\n}\n\n.student-list {\n  max-height: 286px;\n  margin: 0 var(--space-6) var(--space-5);\n  overflow-y: auto;\n  border: 1px solid var(--border);\n  border-radius: 12px;\n}\n\n.student-row {\n  display: grid;\n  grid-template-columns: 34px minmax(0, 1fr) auto 18px;\n  gap: var(--space-3);\n  align-items: center;\n  width: 100%;\n  padding: 10px var(--space-3);\n  text-align: left;\n  color: var(--text-normal);\n  background: var(--surface-card);\n  border: 0;\n  border-bottom: 1px solid var(--border-light);\n  cursor: pointer;\n\n  &:last-child { border-bottom: 0; }\n  &:hover { background: var(--surface-hover); }\n  &--on { background: var(--brand-tint); }\n\n  &__avatar {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 34px;\n    height: 34px;\n    font-size: 10px;\n    font-weight: 800;\n    color: var(--brand);\n    background: #fff;\n    border: 1px solid var(--brand-tint-border);\n    border-radius: 50%;\n  }\n\n  &__copy { display: flex; min-width: 0; flex-direction: column; }\n  &__copy strong { overflow: hidden; font-size: var(--text-sm); color: var(--text-strong); text-overflow: ellipsis; white-space: nowrap; }\n  &__copy small { font-size: 10px; color: var(--text-muted); }\n  &__class { font-size: var(--text-xs); font-weight: 600; color: var(--text-muted); }\n  &__radio { width: 14px; height: 14px; border: 1.5px solid var(--border-strong); border-radius: 50%; }\n  &--on &__radio { border: 4px solid var(--brand); }\n}\n\n.student-empty {\n  padding: var(--space-6);\n  text-align: center;\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n}\n\n.document-fields,\n.settings-form { padding: 0 var(--space-6) var(--space-2); }\n\n.field-row {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: var(--space-4);\n\n  &--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n}\n\n.permission-note,\n.issue-note {\n  font-size: var(--text-xs);\n  color: var(--text-muted);\n}\n\n.permission-note {\n  margin: 0 var(--space-6) var(--space-4);\n  padding: var(--space-3);\n  color: var(--warning);\n  background: var(--warning-bg);\n  border-radius: var(--radius-input);\n}\n\n.builder__actions {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: var(--space-3);\n  padding: var(--space-4) var(--space-6);\n  background: var(--surface-sunken);\n  border-top: 1px solid var(--border);\n  flex-wrap: wrap;\n}\n\n.issue-note {\n  display: flex;\n  flex: 1;\n  align-items: center;\n  gap: var(--space-2);\n  min-width: 220px;\n\n  &__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 20px;\n    height: 20px;\n    color: var(--success);\n    background: var(--success-bg);\n    border-radius: 50%;\n  }\n}\n\n.preview-panel {\n  position: sticky;\n  top: calc(var(--topbar-height) + var(--space-4));\n  overflow: hidden;\n  background: #e9edf4;\n  border: 1px solid var(--border-strong);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-sm);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: var(--space-3) var(--space-4);\n    background: var(--surface-card);\n    border-bottom: 1px solid var(--border);\n\n    strong { display: block; font-size: var(--text-xs); color: var(--text-strong); }\n  }\n\n  &__eyebrow { margin-bottom: 1px; font-size: 8px; }\n  &__scale { font-size: 10px; font-weight: 700; color: var(--text-muted); }\n}\n\n.preview-stage {\n  max-height: calc(100vh - 170px);\n  padding: var(--space-5);\n  overflow: auto;\n}\n\n.preview-empty {\n  display: grid;\n  min-height: 480px;\n  place-items: center;\n  text-align: center;\n  color: var(--text-muted);\n}\n\n.register-summary {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: var(--space-4);\n  margin-bottom: var(--space-5);\n}\n\n.summary-card {\n  display: flex;\n  align-items: center;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n\n  &__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 38px;\n    height: 38px;\n    font-size: var(--text-lg);\n    border-radius: 10px;\n\n    &--blue { color: var(--brand); background: var(--brand-tint); }\n    &--green { color: var(--success); background: var(--success-bg); }\n    &--red { color: var(--danger); background: var(--danger-bg); }\n  }\n\n  div { display: flex; flex-direction: column; }\n  strong { font-size: var(--text-xl); color: var(--text-strong); line-height: 1.1; }\n  span { font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.register { overflow: hidden; }\n\n.register__head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-5) var(--space-6);\n  border-bottom: 1px solid var(--border);\n\n  h2 { margin: 0; font-size: var(--text-lg); }\n  p { margin: 3px 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.register__filters { display: flex; gap: var(--space-3); }\n.register__filters .select { width: 210px; }\n\n.document-cell__title,\n.document-cell__number,\n.document-cell__reason { display: block; }\n.document-cell__title { font-weight: 600; color: var(--text-strong); }\n.document-cell__number { margin-top: 2px; font-size: var(--text-xs); color: var(--text-muted); }\n.document-cell__reason { max-width: 240px; margin-top: 3px; font-size: 10px; color: var(--danger); }\n.cell-actions { text-align: right !important; white-space: nowrap; }\n.btn--text-danger { color: var(--danger); }\n.register-table__revoked { background: var(--danger-bg); }\n\n.status-pill {\n  display: inline-flex;\n  padding: 4px 9px;\n  font-size: 10px;\n  font-weight: 700;\n  color: var(--success);\n  background: var(--success-bg);\n  border-radius: var(--radius-pill);\n\n  &[data-status='REVOKED'] { color: var(--danger); background: var(--danger-bg); }\n  &[data-status='DRAFT'] { color: var(--text-muted); background: var(--surface-sunken); }\n}\n\n.register-empty {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: var(--space-2);\n  padding: var(--space-10);\n  color: var(--text-muted);\n\n  > span { font-size: 28px; color: var(--text-light); }\n  strong { color: var(--text-strong); }\n  p { margin: 0; font-size: var(--text-sm); }\n}\n\n.settings-card { overflow: hidden; }\n\n.settings-card__head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: var(--space-4);\n  padding: var(--space-6);\n  border-bottom: 1px solid var(--border);\n\n  h2 { margin: 0; font-size: var(--text-lg); }\n  p { margin: var(--space-1) 0 0; font-size: var(--text-xs); color: var(--text-muted); }\n}\n\n.settings-form {\n  padding-top: var(--space-5);\n\n  fieldset { padding: 0; margin: 0 0 var(--space-6); border: 0; }\n  legend {\n    width: 100%;\n    padding: 0 0 var(--space-3);\n    margin-bottom: var(--space-4);\n    font-size: var(--text-sm);\n    font-weight: 700;\n    color: var(--text-strong);\n    border-bottom: 1px solid var(--border-light);\n  }\n}\n\n.logo-editor {\n  display: grid;\n  grid-template-columns: 78px 1fr auto;\n  gap: var(--space-4);\n  align-items: center;\n  margin-bottom: var(--space-5);\n}\n\n.logo-editor__preview {\n  display: grid;\n  width: 78px;\n  height: 78px;\n  overflow: hidden;\n  place-items: center;\n  color: var(--brand);\n  background: var(--surface-sunken);\n  border: 1px dashed var(--border-strong);\n  border-radius: 14px;\n\n  img { width: 100%; height: 100%; padding: 8px; object-fit: contain; }\n  span { font: 800 26px var(--font-display); }\n}\n\n.logo-editor__copy {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n  min-width: 0;\n  strong { font-size: var(--text-sm); color: var(--text-strong); }\n  small { font-size: var(--text-xs); color: var(--text-muted); }\n}\n.logo-editor__actions { display: flex; gap: var(--space-2); margin-top: var(--space-2); }\n\n.color-field {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  color: var(--text-normal);\n}\n\n.color-field__control {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  input[type='color'] { width: 38px; height: 38px; padding: 3px; border: 1px solid var(--border-strong); border-radius: 8px; }\n  .input { width: 96px; }\n}\n\n.option-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: var(--space-3);\n}\n\n.check-option {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-input);\n  cursor: pointer;\n\n  input { margin-top: 2px; accent-color: var(--brand); }\n  span { display: flex; flex-direction: column; gap: 2px; }\n  strong { font-size: var(--text-xs); color: var(--text-strong); }\n  small { font-size: 10px; color: var(--text-muted); }\n}\n\n.settings-card__foot {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: var(--space-3);\n  padding: var(--space-4) var(--space-6);\n  background: var(--surface-sunken);\n  border-top: 1px solid var(--border);\n\n  p { flex: 1; margin: 0; font-size: 10px; line-height: 1.45; color: var(--text-muted); }\n}\n\n.live-dot {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 9px;\n  font-weight: 700;\n  color: var(--success);\n  &::before { content: ''; width: 6px; height: 6px; background: currentColor; border-radius: 50%; }\n}\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: var(--z-modal-backdrop);\n  background: rgb(15 23 42 / 45%);\n}\n\n.revoke-dialog {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  z-index: var(--z-modal);\n  width: min(460px, calc(100vw - 32px));\n  padding: var(--space-6);\n  transform: translate(-50%, -50%);\n\n  &__icon {\n    display: grid;\n    width: 42px;\n    height: 42px;\n    margin-bottom: var(--space-4);\n    place-items: center;\n    font-size: var(--text-lg);\n    font-weight: 800;\n    color: var(--danger);\n    background: var(--danger-bg);\n    border-radius: 50%;\n  }\n  h2 { margin: 0; font-size: var(--text-lg); }\n  > p { margin: var(--space-2) 0 var(--space-4); font-size: var(--text-sm); line-height: 1.55; color: var(--text-muted); }\n  &__actions { display: flex; justify-content: flex-end; gap: var(--space-3); }\n}\n\n/* ------------------------------------------------------------------ Sheet */\n\n.official-sheet {\n  --document-accent: #1f5fd6;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  min-height: 790px;\n  padding: 38px 42px 28px;\n  overflow: hidden;\n  font-family: Georgia, 'Times New Roman', serif;\n  font-size: 11px;\n  line-height: 1.55;\n  color: #172033;\n  background: #fff;\n  box-shadow: 0 8px 24px rgb(31 42 68 / 14%);\n\n  &__watermark {\n    position: absolute;\n    top: 47%;\n    left: 50%;\n    z-index: 0;\n    font: 800 58px Arial, sans-serif;\n    letter-spacing: .16em;\n    color: rgb(31 95 214 / 5%);\n    transform: translate(-50%, -50%) rotate(-30deg);\n    pointer-events: none;\n    white-space: nowrap;\n  }\n\n  &__watermark--revoked { color: rgb(220 53 69 / 8%); }\n  &--revoked { outline: 4px solid rgb(220 53 69 / 18%); outline-offset: -4px; }\n}\n\n.letterhead,\n.letterhead-details,\n.document-heading,\n.document-body,\n.additional-mention,\n.document-closing,\n.official-sheet__footer { position: relative; z-index: 1; }\n\n.letterhead {\n  display: grid;\n  grid-template-columns: minmax(0, .85fr) minmax(150px, 1.3fr) minmax(0, .85fr);\n  gap: 16px;\n  align-items: start;\n  padding-bottom: 12px;\n  border-bottom: 2px solid var(--document-accent);\n\n  &__authority {\n    padding-top: 3px;\n    font-family: Arial, sans-serif;\n    font-size: 7.5px;\n    font-weight: 700;\n    line-height: 1.5;\n    white-space: pre-line;\n    text-transform: uppercase;\n    color: #344054;\n    &--right { text-align: right; }\n  }\n\n  &__school { display: flex; align-items: center; flex-direction: column; text-align: center; }\n  &__school > strong { font: 800 13px Arial, sans-serif; text-transform: uppercase; color: var(--document-accent); }\n  &__school > small { font: 7px/1.4 Arial, sans-serif; color: #667085; }\n  &__school > em { margin-top: 2px; font-size: 7.5px; color: #475467; }\n  &__logo { width: 43px; height: 43px; margin-bottom: 4px; object-fit: contain; }\n  &__monogram {\n    display: grid;\n    width: 40px;\n    height: 40px;\n    margin-bottom: 4px;\n    place-items: center;\n    font: 800 20px Arial, sans-serif;\n    color: #fff;\n    background: var(--document-accent);\n    border-radius: 50%;\n  }\n}\n\n.letterhead-details {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px 12px;\n  padding: 7px 0;\n  font: 6.5px Arial, sans-serif;\n  color: #667085;\n  border-bottom: 1px solid #e4e7ec;\n  flex-wrap: wrap;\n}\n\n.document-heading {\n  margin: 34px 0 30px;\n  text-align: center;\n\n  &__rule { display: block; width: 30px; height: 3px; margin: 0 auto 8px; background: var(--document-accent); }\n  h1 { margin: 0; font-size: 19px; letter-spacing: .04em; text-transform: uppercase; text-decoration: underline; text-underline-offset: 5px; }\n  p { margin: 8px 0 0; font: 8px Arial, sans-serif; color: #667085; }\n}\n\n.document-body {\n  &--prose { font-size: 12px; line-height: 1.9; text-align: justify; }\n  p { margin: 0 0 16px; }\n  .student-name { margin: 22px 0; font-size: 18px; font-weight: 700; text-align: center; text-transform: uppercase; color: var(--document-accent); }\n}\n\n.section-title {\n  padding-bottom: 5px;\n  margin: 0 0 12px;\n  font: 700 10px Arial, sans-serif;\n  letter-spacing: .06em;\n  text-transform: uppercase;\n  color: var(--document-accent);\n  border-bottom: 1px solid #d0d5dd;\n}\n\n.identity-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0;\n  margin: 0 0 28px;\n  border-top: 1px solid #d0d5dd;\n  border-left: 1px solid #d0d5dd;\n\n  div { min-height: 52px; padding: 9px 11px; border-right: 1px solid #d0d5dd; border-bottom: 1px solid #d0d5dd; }\n  dt { font: 6.5px Arial, sans-serif; text-transform: uppercase; color: #667085; }\n  dd { margin: 3px 0 0; font-weight: 700; }\n}\n\n.meeting-card {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1px;\n  margin: 24px 0;\n  background: #d0d5dd;\n  border: 1px solid #d0d5dd;\n\n  div { padding: 10px 12px; background: #f9fafb; }\n  dt { font: 7px Arial, sans-serif; text-transform: uppercase; color: #667085; }\n  dd { margin: 3px 0 0; font-weight: 700; }\n}\n\n.student-card-print {\n  width: 84%;\n  margin: 30px auto;\n  overflow: hidden;\n  font-family: Arial, sans-serif;\n  border: 1px solid #98a2b3;\n  border-radius: 12px;\n  box-shadow: 0 4px 10px rgb(16 24 40 / 10%);\n\n  > header { display: flex; justify-content: space-between; padding: 10px 14px; color: #fff; background: var(--document-accent); }\n  > header span { font-size: 10px; font-weight: 800; letter-spacing: .12em; }\n  &__body { display: grid; grid-template-columns: 90px 1fr; gap: 18px; padding: 18px; }\n  &__photo { display: grid; height: 110px; overflow: hidden; place-items: center; font-size: 34px; font-weight: 800; color: var(--document-accent); background: #eef2f6; border-radius: 8px; }\n  &__photo img { width: 100%; height: 100%; object-fit: cover; }\n  dl { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 0; }\n  dt { font-size: 6.5px; text-transform: uppercase; color: #667085; }\n  dd { margin: 2px 0 0; font-size: 10px; font-weight: 700; }\n  > footer { display: flex; justify-content: space-between; padding: 8px 14px; font-size: 7px; color: #475467; background: #f2f4f7; }\n}\n\n.additional-mention {\n  padding: 9px 12px;\n  margin: 12px 0 0;\n  font-size: 9px;\n  font-style: italic;\n  color: #475467;\n  background: #f9fafb;\n  border-left: 3px solid var(--document-accent);\n}\n\n.document-closing {\n  display: flex;\n  align-items: flex-start;\n  justify-content: flex-end;\n  margin-top: 26px;\n\n  > p { margin: 0 18px 0 0; font-size: 10px; }\n}\n\n.signature-block {\n  width: 180px;\n  text-align: center;\n  span { display: block; font-size: 9px; font-weight: 700; text-decoration: underline; }\n  &__space { display: grid; height: 72px; place-items: center; font: italic 7px Arial, sans-serif; color: #98a2b3; }\n  strong { font-size: 9px; }\n}\n\n.official-sheet__footer {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: 8px 14px;\n  align-items: end;\n  padding-top: 10px;\n  margin-top: auto;\n  font-family: Arial, sans-serif;\n  border-top: 1px solid var(--document-accent);\n\n  > p { margin: 0; font-size: 6.5px; color: #667085; }\n  .page-number { grid-column: 1 / -1; font-size: 6px; text-align: right; color: #98a2b3; }\n}\n\n.verification-block {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  min-width: 130px;\n\n  &__qr { display: grid; width: 28px; height: 28px; place-items: center; font-size: 23px; color: #101828; border: 1px solid #101828; }\n  > span:last-child { display: flex; flex-direction: column; }\n  small { font-size: 5.5px; text-transform: uppercase; color: #667085; }\n  strong { font-size: 8px; letter-spacing: .08em; }\n}\n\n@include tablet-down {\n  .workspace,\n  .settings-workspace { grid-template-columns: 1fr; }\n  .preview-panel { position: static; }\n  .preview-stage { max-height: none; }\n}\n\n@include mobile {\n  .tabs { display: flex; width: 100%; overflow-x: auto; }\n  .tabs__item { flex: 0 0 auto; }\n  .template-grid,\n  .field-row,\n  .field-row--3,\n  .student-filters,\n  .option-grid,\n  .register-summary { grid-template-columns: 1fr; }\n  .student-row { grid-template-columns: 34px minmax(0, 1fr) 18px; }\n  .student-row__class { display: none; }\n  .builder__head,\n  .template-grid,\n  .student-filters,\n  .document-fields,\n  .settings-form { padding-right: var(--space-4); padding-left: var(--space-4); }\n  .student-list { margin-right: var(--space-4); margin-left: var(--space-4); }\n  .builder__actions,\n  .settings-card__foot { align-items: stretch; flex-direction: column; }\n  .builder__actions .btn,\n  .settings-card__foot .btn { width: 100%; }\n  .register__head,\n  .register__filters { align-items: stretch; flex-direction: column; }\n  .register__filters .select,\n  .search-box--compact { width: 100%; }\n  .logo-editor { grid-template-columns: 64px 1fr; }\n  .color-field { grid-column: 1 / -1; }\n  .preview-stage { padding: var(--space-2); }\n  .official-sheet { min-height: 660px; padding: 24px 22px 18px; }\n  .letterhead { grid-template-columns: 1fr; }\n  .letterhead__authority { display: none; }\n}\n\n@media print {\n  .screen-only { display: none !important; }\n  .print-only { display: block; }\n\n  .official-sheet {\n    width: 210mm;\n    min-height: 297mm;\n    padding: 14mm 16mm 11mm;\n    font-size: 10.5pt;\n    box-shadow: none;\n    page-break-after: always;\n  }\n\n  .official-sheet__watermark { display: none; }\n  .letterhead__school > strong { font-size: 13pt; }\n  .letterhead__school > small,\n  .letterhead__school > em,\n  .letterhead__authority { font-size: 7.5pt; }\n  .letterhead-details { font-size: 6.5pt; }\n  .document-heading h1 { font-size: 18pt; }\n  .document-heading p { font-size: 8pt; }\n  .document-body--prose { font-size: 11pt; }\n  .document-body .student-name { font-size: 17pt; }\n}\n\n@page { size: A4 portrait; margin: 0; }\n\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StudentFilesComponent, { className: "StudentFilesComponent", filePath: "frontend/src/app/features/student-files/student-files.component.ts", lineNumber: 35 }); })();
function localIsoDate() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60_000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}
function normalise(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
function previewNumber(pattern, issueDate) {
    const year = issueDate.slice(0, 4) || String(new Date().getFullYear());
    return pattern.replaceAll('{year}', year).replaceAll('{yy}', year.slice(-2))
        .replaceAll('{schoolCode}', 'ECOLE')
        .replace(/\{seq(?::(\d+))?}/g, (_match, width) => '0'.repeat(Math.max(1, Number(width ?? 6) - 3)) + '123');
}
//# sourceMappingURL=student-files.component.js.map