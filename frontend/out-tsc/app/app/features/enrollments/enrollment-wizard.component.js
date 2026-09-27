import { createUuid } from "../../core/utils/uuid";
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CLASSROOM_DATA_SOURCE, ENROLLMENT_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentImportService } from '@core/services/student-import.service';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { translateErrorCode } from '@core/services/error-messages';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.rowNumber;
const _c0 = () => ["Nom", "Pr\u00E9noms", "Sexe", "Date de naissance", "Lieu de naissance", "Nationalit\u00E9", "Classe", "Nom du responsable", "T\u00E9l\u00E9phone du responsable", "Email du responsable", "Lien de parent\u00E9", "\u00C9cole pr\u00E9c\u00E9dente"];
function EnrollmentWizardComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 1)(1, "div")(2, "h1", 2);
    i0.ɵɵtext(3, "Nouvelle inscription");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 3);
    i0.ɵɵtext(5, "Comment souhaitez-vous proc\u00E9der ?");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "a", 4);
    i0.ɵɵtext(7, "Retour \u00E0 la liste");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 5)(9, "button", 6);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_1_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.chooseMode("NEW")); });
    i0.ɵɵelementStart(10, "span", 7);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(11, "svg", 8);
    i0.ɵɵelement(12, "path", 9)(13, "circle", 10)(14, "path", 11);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(15, "span", 12);
    i0.ɵɵtext(16, "Nouvel \u00E9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 13);
    i0.ɵɵtext(18, " L'\u00E9l\u00E8ve n'existe pas encore. Vous saisissez son identit\u00E9, son responsable l\u00E9gal, puis vous l'affectez \u00E0 une classe. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 14);
    i0.ɵɵtext(20, "Le cas le plus courant \u00E0 la rentr\u00E9e");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "button", 15);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_1_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.chooseMode("RETURNING")); });
    i0.ɵɵelementStart(22, "span", 7);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(23, "svg", 8);
    i0.ɵɵelement(24, "path", 16)(25, "path", 17);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(26, "span", 12);
    i0.ɵɵtext(27, "R\u00E9inscription");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "span", 13);
    i0.ɵɵtext(29, " L'\u00E9l\u00E8ve est d\u00E9j\u00E0 connu de l'\u00E9tablissement. Vous le retrouvez, puis vous l'inscrivez dans sa nouvelle classe. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "span", 14);
    i0.ɵɵtext(31, "Son historique est conserv\u00E9");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "button", 18);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_1_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.chooseMode("IMPORT")); });
    i0.ɵɵelementStart(33, "span", 7);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(34, "svg", 8);
    i0.ɵɵelement(35, "path", 19)(36, "path", 20);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(37, "span", 12);
    i0.ɵɵtext(38, "Import Excel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span", 13);
    i0.ɵɵtext(40, " Vous avez d\u00E9j\u00E0 une liste. T\u00E9l\u00E9chargez le mod\u00E8le, remplissez-le, d\u00E9posez-le : les doublons et les erreurs sont signal\u00E9s avant tout enregistrement. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "span", 14);
    i0.ɵɵtext(42, "Plusieurs dizaines d'\u00E9l\u00E8ves d'un coup");
    i0.ɵɵelementEnd()()();
} }
function EnrollmentWizardComponent_Conditional_2_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Inscrire un nouvel \u00E9l\u00E8ve ");
} }
function EnrollmentWizardComponent_Conditional_2_Case_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " R\u00E9inscrire un \u00E9l\u00E8ve ");
} }
function EnrollmentWizardComponent_Conditional_2_Case_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Importer une liste d'\u00E9l\u00E8ves ");
} }
function EnrollmentWizardComponent_Conditional_2_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 28)(1, "span", 29);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const label_r4 = ctx.$implicit;
    const ɵ$index_99_r5 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("steps__item--active", ctx_r1.step() >= ɵ$index_99_r5 + 1)("steps__item--current", ctx_r1.step() === ɵ$index_99_r5 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ɵ$index_99_r5 + 1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", label_r4, " ");
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 26)(1, "header", 30)(2, "h2", 31);
    i0.ɵɵtext(3, "Identit\u00E9 de l'\u00E9l\u00E8ve");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "form", 32)(5, "div", 33)(6, "div", 34)(7, "label", 35);
    i0.ɵɵtext(8, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "input", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 34)(11, "label", 37);
    i0.ɵɵtext(12, "Pr\u00E9noms");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 38);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 33)(15, "div", 34)(16, "label", 39);
    i0.ɵɵtext(17, "Sexe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "select", 40)(19, "option", 41);
    i0.ɵɵtext(20, "F\u00E9minin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "option", 42);
    i0.ɵɵtext(22, "Masculin");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "div", 34)(24, "label", 43);
    i0.ɵɵtext(25, " Date de naissance ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(26, "input", 44);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 33)(28, "div", 34)(29, "label", 45);
    i0.ɵɵtext(30, "Lieu de naissance");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(31, "input", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "div", 34)(33, "label", 47);
    i0.ɵɵtext(34, "Nationalit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(35, "input", 48);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "div", 34)(37, "label", 49);
    i0.ɵɵtext(38, "\u00C9cole pr\u00E9c\u00E9dente");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(39, "input", 50);
    i0.ɵɵelementStart(40, "span", 51);
    i0.ɵɵtext(41, " Le matricule sera attribu\u00E9 automatiquement selon le format de l'\u00E9tablissement. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(42, "footer", 52)(43, "span", 53);
    i0.ɵɵtext(44, "Les champs marqu\u00E9s d'une \u00E9toile sont obligatoires.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "button", 54);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_15_Template_button_click_45_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.next()); });
    i0.ɵɵtext(46, "Continuer");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("formGroup", ctx_r1.identity);
    i0.ɵɵadvance(41);
    i0.ɵɵproperty("disabled", ctx_r1.identity.invalid);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 26)(1, "header", 30)(2, "h2", 31);
    i0.ɵɵtext(3, "Responsable l\u00E9gal");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "form", 32)(5, "p", 55);
    i0.ɵɵtext(6, " Ce responsable recevra les notifications d'absence, les bulletins et, s'il est d\u00E9sign\u00E9 responsable financier, les avis d'\u00E9ch\u00E9ance. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 33)(8, "div", 34)(9, "label", 56);
    i0.ɵɵtext(10, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 34)(13, "label", 58);
    i0.ɵɵtext(14, "Pr\u00E9noms");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 59);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 33)(17, "div", 34)(18, "label", 60);
    i0.ɵɵtext(19, "T\u00E9l\u00E9phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(20, "input", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 34)(22, "label", 62);
    i0.ɵɵtext(23, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(24, "input", 63);
    i0.ɵɵelementStart(25, "span", 51);
    i0.ɵɵtext(26, "N\u00E9cessaire pour ouvrir le portail parent.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(27, "div", 34)(28, "label", 64);
    i0.ɵɵtext(29, "Lien de parent\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "select", 65)(31, "option", 66);
    i0.ɵɵtext(32, "M\u00E8re");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "option", 67);
    i0.ɵɵtext(34, "P\u00E8re");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "option", 68);
    i0.ɵɵtext(36, "Tuteur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "option", 69);
    i0.ɵɵtext(38, "Repr\u00E9sentant l\u00E9gal");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(39, "label", 70);
    i0.ɵɵelement(40, "input", 71);
    i0.ɵɵelementStart(41, "span");
    i0.ɵɵtext(42, "Responsable financier : re\u00E7oit les factures et les relances d'impay\u00E9");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(43, "footer", 52)(44, "button", 21);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_16_Template_button_click_44_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.back()); });
    i0.ɵɵtext(45, "Retour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "button", 54);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_16_Template_button_click_46_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.next()); });
    i0.ɵɵtext(47, "Continuer");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("formGroup", ctx_r1.guardian);
    i0.ɵɵadvance(42);
    i0.ɵɵproperty("disabled", ctx_r1.guardian.invalid);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_17_For_11_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "button", 77);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_17_For_11_Template_button_click_1_listener() { const candidate_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.chooseStudent(candidate_r10)); });
    i0.ɵɵelement(2, "eduops-avatar", 78);
    i0.ɵɵelementStart(3, "span", 79)(4, "span", 80);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 81);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "eduops-status-badge", 82);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_15_0;
    const candidate_r10 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", candidate_r10.fullName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(candidate_r10.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", candidate_r10.studentNumber, " \u2014 ", (tmp_15_0 = candidate_r10.classroomName) !== null && tmp_15_0 !== undefined ? tmp_15_0 : "Sans classe", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("status", candidate_r10.status);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_17_ForEmpty_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 76);
    i0.ɵɵtext(1, " Saisissez un nom ou un matricule pour retrouver un \u00E9l\u00E8ve d\u00E9j\u00E0 enregistr\u00E9. ");
    i0.ɵɵelementEnd();
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 26)(1, "header", 30)(2, "h2", 31);
    i0.ɵɵtext(3, "Retrouver l'\u00E9l\u00E8ve");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 72)(5, "div", 34)(6, "label", 73);
    i0.ɵɵtext(7, "Nom, pr\u00E9nom ou matricule");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "input", 74);
    i0.ɵɵlistener("input", function EnrollmentWizardComponent_Conditional_2_Conditional_17_Template_input_input_8_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.searchStudents($event.target.value)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "ul", 75);
    i0.ɵɵrepeaterCreate(10, EnrollmentWizardComponent_Conditional_2_Conditional_17_For_11_Template, 9, 5, "li", null, _forTrack0, false, EnrollmentWizardComponent_Conditional_2_Conditional_17_ForEmpty_12_Template, 2, 0, "li", 76);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(ctx_r1.candidates());
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_18_For_7_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li")(1, "button", 84);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_18_For_7_Template_button_click_1_listener() { const classroom_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.chooseClassroom(classroom_r13)); });
    i0.ɵɵelementStart(2, "span", 85)(3, "span", 86);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 87);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 88);
    i0.ɵɵelement(8, "span", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "eduops-status-badge", 82);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_13_0;
    const classroom_r13 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("class-row--on", ((tmp_13_0 = ctx_r1.selectedClassroom()) == null ? null : tmp_13_0.id) === classroom_r13.id);
    i0.ɵɵproperty("disabled", ctx_r1.checking());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(classroom_r13.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" ", classroom_r13.activeEnrollments, "/", classroom_r13.capacityMaximum, " \u2014 ", classroom_r13.availableSeats, " place(s) restante(s) ");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap("gauge-mini__fill--" + classroom_r13.capacityStatus);
    i0.ɵɵstyleProp("width", classroom_r13.occupancyRate > 100 ? 100 : classroom_r13.occupancyRate, "%");
    i0.ɵɵadvance();
    i0.ɵɵproperty("status", classroom_r13.capacityStatus);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_18_ForEmpty_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 76);
    i0.ɵɵtext(1, " Aucune classe active. ");
    i0.ɵɵelementStart(2, "a", 90);
    i0.ɵɵtext(3, "Cr\u00E9ez-en une");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " avant d'inscrire. ");
    i0.ɵɵelementEnd();
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 26)(1, "header", 30)(2, "h2", 31);
    i0.ɵɵtext(3, "Affecter \u00E0 une classe");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 72)(5, "ul", 83);
    i0.ɵɵrepeaterCreate(6, EnrollmentWizardComponent_Conditional_2_Conditional_18_For_7_Template, 10, 12, "li", null, _forTrack0, false, EnrollmentWizardComponent_Conditional_2_Conditional_18_ForEmpty_8_Template, 5, 0, "li", 76);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "footer", 52)(10, "button", 21);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_18_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.back()); });
    i0.ɵɵtext(11, "Retour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 54);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_18_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.next()); });
    i0.ɵɵtext(13, "Continuer");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r1.availableClasses());
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", !ctx_r1.selectedClassroom());
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 94);
    i0.ɵɵtext(1, " Tous les contr\u00F4les sont pass\u00E9s. L'inscription peut \u00EAtre valid\u00E9e. ");
    i0.ɵɵelementEnd();
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Conditional_12_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const blocker_r15 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.blockerMessage(blocker_r15));
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 95)(1, "p", 98);
    i0.ɵɵtext(2, "Le serveur refuse cette inscription :");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul");
    i0.ɵɵrepeaterCreate(4, EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Conditional_12_For_5_Template, 2, 1, "li", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const result_r16 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(result_r16.blockers);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_For_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 96);
    i0.ɵɵtext(1, "Attention : la classe est presque pleine.");
    i0.ɵɵelementEnd();
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Conditional_15_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 34)(1, "label", 100);
    i0.ɵɵtext(2, " Justification ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "textarea", 101);
    i0.ɵɵtwoWayListener("ngModelChange", function EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Conditional_15_Conditional_5_Template_textarea_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(5); i0.ɵɵtwoWayBindingSet(ctx_r1.overrideReason, $event) || (ctx_r1.overrideReason = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 51);
    i0.ɵɵtext(5, " Exige la permission correspondante et sera conserv\u00E9e au journal d'audit. ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.overrideReason);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 97)(1, "label", 70)(2, "input", 99);
    i0.ɵɵtwoWayListener("ngModelChange", function EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Conditional_15_Template_input_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(4); i0.ɵɵtwoWayBindingSet(ctx_r1.overrideRequested, $event) || (ctx_r1.overrideRequested = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Demander une d\u00E9rogation de capacit\u00E9");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(5, EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Conditional_15_Conditional_5_Template, 6, 1, "div", 34);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.overrideRequested);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.overrideRequested ? 5 : -1);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 92)(1, "p", 93);
    i0.ɵɵtext(2, " Capacit\u00E9 : ");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " \u2014 disponibles : ");
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8, " \u2014 projet\u00E9es : ");
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(11, EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Conditional_11_Template, 2, 0, "p", 94)(12, EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Conditional_12_Template, 6, 0, "div", 95);
    i0.ɵɵrepeaterCreate(13, EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_For_14_Template, 2, 0, "p", 96, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵtemplate(15, EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Conditional_15_Template, 6, 2, "div", 97);
} if (rf & 2) {
    const result_r16 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", result_r16.occupiedSeats, "/", result_r16.capacityMaximum, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(result_r16.availableSeats);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(result_r16.projectedAvailableSeats);
    i0.ɵɵadvance();
    i0.ɵɵconditional(result_r16.allowed ? 11 : 12);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(result_r16.warnings);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!result_r16.allowed && ctx_r1.canOverride() ? 15 : -1);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 26)(1, "header", 30)(2, "h2", 31);
    i0.ɵɵtext(3, "Contr\u00F4les serveur et validation");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 72);
    i0.ɵɵtemplate(5, EnrollmentWizardComponent_Conditional_2_Conditional_19_Conditional_5_Template, 16, 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "footer", 52)(7, "button", 21);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_19_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.back()); });
    i0.ɵɵtext(8, "Retour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 91);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_19_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional((tmp_3_0 = ctx_r1.checkResult()) ? 5 : -1, tmp_3_0);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r1.canSubmit() || ctx_r1.submitting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.submitting() ? "Enregistrement..." : "Valider l'inscription", " ");
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_20_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 105);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const col_r20 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(col_r20);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 26)(1, "header", 30)(2, "h2", 31);
    i0.ɵɵtext(3, "T\u00E9l\u00E9charger le mod\u00E8le");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 72)(5, "p", 55);
    i0.ɵɵtext(6, " Le mod\u00E8le est g\u00E9n\u00E9r\u00E9 pour votre \u00E9tablissement : vos classes r\u00E9elles y sont propos\u00E9es en liste d\u00E9roulante, ce qui \u00E9vite les fautes de frappe. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 102)(8, "p", 103);
    i0.ɵɵtext(9, "Colonnes attendues");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 104);
    i0.ɵɵrepeaterCreate(11, EnrollmentWizardComponent_Conditional_2_Conditional_20_For_12_Template, 2, 1, "span", 105, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 106);
    i0.ɵɵtext(14, " Ne saisissez pas le matricule : il est attribu\u00E9 automatiquement. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "footer", 52)(16, "button", 107);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_20_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r19); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.next()); });
    i0.ɵɵtext(17, " J'ai d\u00E9j\u00E0 le mod\u00E8le ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 108);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_20_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r19); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.downloadTemplate()); });
    i0.ɵɵtext(19, " T\u00E9l\u00E9charger le mod\u00E8le Excel ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(11);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_21_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 110);
    i0.ɵɵelementStart(1, "p", 111);
    i0.ɵɵtext(2, "Analyse du fichier...");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 112);
    i0.ɵɵtext(4, "Aucune donn\u00E9e n'est enregistr\u00E9e \u00E0 ce stade.");
    i0.ɵɵelementEnd();
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_21_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 113);
    i0.ɵɵtext(1, "\u21EA");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p", 111);
    i0.ɵɵtext(3, "Glissez votre fichier ici");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 112);
    i0.ɵɵtext(5, "Formats accept\u00E9s : .xlsx, .xls, .csv");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "label", 114);
    i0.ɵɵtext(7, " Choisir un fichier ");
    i0.ɵɵelementStart(8, "input", 115);
    i0.ɵɵlistener("change", function EnrollmentWizardComponent_Conditional_2_Conditional_21_Conditional_7_Template_input_change_8_listener($event) { i0.ɵɵrestoreView(_r22); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onFileSelected($event)); });
    i0.ɵɵelementEnd()();
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 26)(1, "header", 30)(2, "h2", 31);
    i0.ɵɵtext(3, "D\u00E9poser le fichier rempli");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 72)(5, "div", 109);
    i0.ɵɵlistener("dragover", function EnrollmentWizardComponent_Conditional_2_Conditional_21_Template_div_dragover_5_listener($event) { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onDragOver($event)); })("dragleave", function EnrollmentWizardComponent_Conditional_2_Conditional_21_Template_div_dragleave_5_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onDragLeave()); })("drop", function EnrollmentWizardComponent_Conditional_2_Conditional_21_Template_div_drop_5_listener($event) { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onDrop($event)); });
    i0.ɵɵtemplate(6, EnrollmentWizardComponent_Conditional_2_Conditional_21_Conditional_6_Template, 5, 0)(7, EnrollmentWizardComponent_Conditional_2_Conditional_21_Conditional_7_Template, 9, 0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "footer", 52)(9, "button", 21);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_21_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r21); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.back()); });
    i0.ɵɵtext(10, "Retour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 53);
    i0.ɵɵtext(12, "Le fichier est analys\u00E9 avant tout enregistrement.");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("dropzone--over", ctx_r1.dragging());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.analysing() ? 6 : 7);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵtextInterpolate2(" \u2014 page ", ctx_r1.previewPage() + 1, " / ", ctx_r1.previewTotalPages(), " ");
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 128);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r24 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r24);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r24);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const col_r25 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(col_r25);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_53_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const col_r26 = ctx.$implicit;
    const row_r27 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r27.values[col_r26] || "\u2014");
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_53_For_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 137);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const e_r28 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(e_r28);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_53_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 138);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const w_r29 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(w_r29);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_53_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 139);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r27 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r27.previewStudentNumber);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 132);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(3, EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_53_For_4_Template, 2, 1, "td", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementStart(5, "td")(6, "span", 135);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td", 136);
    i0.ɵɵrepeaterCreate(9, EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_53_For_10_Template, 2, 1, "span", 137, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵrepeaterCreate(11, EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_53_For_12_Template, 2, 1, "span", 138, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵtemplate(13, EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_53_Conditional_13_Template, 2, 1, "span", 139);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r27 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵclassMap("row--" + row_r27.status.toLowerCase());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r27.rowNumber);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.previewColumns());
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap("badge--" + ctx_r1.rowTone(row_r27.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.rowLabel(row_r27.status), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(row_r27.errors);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(row_r27.warnings);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(row_r27.previewStudentNumber ? 13 : -1);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Conditional_54_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 141);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Conditional_54_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r30); const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.previewPrevPage()); });
    i0.ɵɵtext(1, " Pr\u00E9c\u00E9dent ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 140);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 141);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Conditional_54_Conditional_1_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r30); const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.previewNextPage()); });
    i0.ɵɵtext(5, " Suivant ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const result_r31 = i0.ɵɵnextContext(2);
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r1.previewPage() === 0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate5(" Lignes ", ctx_r1.previewFirstRow(), "\u2013", ctx_r1.previewLastRow(), " sur ", result_r31.rows.length, " \u2014 page ", ctx_r1.previewPage() + 1, " / ", ctx_r1.previewTotalPages(), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.previewPage() >= ctx_r1.previewTotalPages() - 1);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Conditional_54_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 140);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const result_r31 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", result_r31.rows.length, " ligne(s) affich\u00E9e(s) ");
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "nav", 134);
    i0.ɵɵtemplate(1, EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Conditional_54_Conditional_1_Template, 6, 7)(2, EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Conditional_54_Conditional_2_Template, 2, 1, "span", 140);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.previewTotalPages() > 1 ? 1 : 2);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 26)(1, "header", 30)(2, "div")(3, "h2", 31);
    i0.ɵɵtext(4, "V\u00E9rification avant import");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 116);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "div", 117)(8, "div", 118)(9, "span", 119);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 120);
    i0.ɵɵtext(12, "pr\u00EAtes");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 121)(14, "span", 119);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 120);
    i0.ɵɵtext(17, "\u00E0 v\u00E9rifier");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 122)(19, "span", 119);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 120);
    i0.ɵɵtext(22, "doublons");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 123)(24, "span", 119);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 120);
    i0.ɵɵtext(27, "erreurs");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(28, "div", 124)(29, "span", 125);
    i0.ɵɵtext(30);
    i0.ɵɵtemplate(31, EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Conditional_31_Template, 1, 2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "label", 126);
    i0.ɵɵtext(33, " Lignes par page ");
    i0.ɵɵelementStart(34, "select", 127);
    i0.ɵɵlistener("change", function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Template_select_change_34_listener($event) { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.changePreviewPageSize($event)); });
    i0.ɵɵrepeaterCreate(35, EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_36_Template, 2, 2, "option", 128, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(37, "div", 129)(38, "table", 130)(39, "caption", 131);
    i0.ɵɵtext(40, "Lignes du fichier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "thead")(42, "tr")(43, "th", 132);
    i0.ɵɵtext(44, "Ligne");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(45, EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_46_Template, 2, 1, "th", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementStart(47, "th");
    i0.ɵɵtext(48, "\u00C9tat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "th");
    i0.ɵɵtext(50, "D\u00E9tail");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(51, "tbody");
    i0.ɵɵrepeaterCreate(52, EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_For_53_Template, 14, 7, "tr", 133, _forTrack1);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(54, EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Conditional_54_Template, 3, 1, "nav", 134);
    i0.ɵɵelementStart(55, "footer", 52)(56, "button", 21);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Template_button_click_56_listener() { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.back()); });
    i0.ɵɵtext(57, " D\u00E9poser un autre fichier ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "button", 91);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Template_button_click_58_listener() { i0.ɵɵrestoreView(_r23); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.confirmImport()); });
    i0.ɵɵtext(59);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const result_r31 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(result_r31.fileName);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(result_r31.validRows);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(result_r31.warningRows);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(result_r31.duplicateRows);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(result_r31.invalidRows);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", result_r31.rows.length, " ligne(s) ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.previewTotalPages() > 1 ? 31 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", ctx_r1.previewPageSize());
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.pageSizeOptions);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(ctx_r1.previewColumns());
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r1.pagedPreviewRows());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(result_r31.rows.length > ctx_r1.pageSizeOptions[0] ? 54 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !result_r31.importable || ctx_r1.submitting());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.submitting() ? "Import en cours..." : "Importer " + (result_r31.validRows + result_r31.warningRows) + " \u00E9l\u00E8ve(s)", " ");
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, EnrollmentWizardComponent_Conditional_2_Conditional_22_Conditional_0_Template, 60, 11, "section", 26);
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional((tmp_3_0 = ctx_r1.preview()) ? 0 : -1, tmp_3_0);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_23_Conditional_0_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 146);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const report_r32 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", report_r32.invalidRows, " ligne(s) refus\u00E9e(s) par une r\u00E8gle m\u00E9tier. ");
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_23_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 26)(1, "div", 142)(2, "span", 143);
    i0.ɵɵtext(3, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2", 144);
    i0.ɵɵtext(5, "Import termin\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 145);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, EnrollmentWizardComponent_Conditional_2_Conditional_23_Conditional_0_Conditional_8_Template, 2, 1, "p", 146);
    i0.ɵɵelementStart(9, "div", 147)(10, "a", 148);
    i0.ɵɵtext(11, "Voir les \u00E9l\u00E8ves");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "a", 149);
    i0.ɵɵtext(13, "Voir les inscriptions");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const report_r32 = ctx;
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" ", report_r32.validRows, " \u00E9l\u00E8ve(s) cr\u00E9\u00E9(s) et inscrit(s). ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(report_r32.invalidRows > 0 ? 8 : -1);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, EnrollmentWizardComponent_Conditional_2_Conditional_23_Conditional_0_Template, 14, 2, "section", 26);
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional((tmp_3_0 = ctx_r1.importReport()) ? 0 : -1, tmp_3_0);
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_24_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "dt");
    i0.ɵɵtext(2, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "dd");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.guardian.controls.firstName.value, " ", ctx_r1.guardian.controls.lastName.value, " ");
} }
function EnrollmentWizardComponent_Conditional_2_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "aside", 27)(1, "div", 150)(2, "header", 151);
    i0.ɵɵelement(3, "eduops-avatar", 152);
    i0.ɵɵelementStart(4, "div")(5, "p", 153);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 154);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "dl", 155)(10, "div")(11, "dt");
    i0.ɵɵtext(12, "Classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "dd");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div")(16, "dt");
    i0.ɵɵtext(17, "Niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "dd");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(20, EnrollmentWizardComponent_Conditional_2_Conditional_24_Conditional_20_Template, 5, 2, "div");
    i0.ɵɵelementStart(21, "div")(22, "dt");
    i0.ɵɵtext(23, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "dd");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(26, "p", 156);
    i0.ɵɵtext(27, " Les frais de scolarit\u00E9 du niveau choisi seront g\u00E9n\u00E9r\u00E9s automatiquement \u00E0 la validation, avec leur \u00E9ch\u00E9ancier. ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("name", ctx_r1.draftName() || "?");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.draftName() || "Nouvel \u00E9l\u00E8ve");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", (tmp_5_0 = (tmp_5_0 = ctx_r1.selectedStudent()) == null ? null : tmp_5_0.studentNumber) !== null && tmp_5_0 !== undefined ? tmp_5_0 : "Matricule attribu\u00E9 \u00E0 la validation", " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate((tmp_6_0 = (tmp_6_0 = ctx_r1.selectedClassroom()) == null ? null : tmp_6_0.name) !== null && tmp_6_0 !== undefined ? tmp_6_0 : "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_7_0 = (tmp_7_0 = ctx_r1.selectedClassroom()) == null ? null : tmp_7_0.levelName) !== null && tmp_7_0 !== undefined ? tmp_7_0 : "\u2014");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.mode() === "NEW" ? 20 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.mode() === "RETURNING" ? "R\u00E9inscription" : "Nouvelle inscription");
} }
function EnrollmentWizardComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 1)(1, "div")(2, "h1", 2);
    i0.ɵɵtemplate(3, EnrollmentWizardComponent_Conditional_2_Case_3_Template, 1, 0)(4, EnrollmentWizardComponent_Conditional_2_Case_4_Template, 1, 0)(5, EnrollmentWizardComponent_Conditional_2_Case_5_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 3);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 21);
    i0.ɵɵlistener("click", function EnrollmentWizardComponent_Conditional_2_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.backToModes()); });
    i0.ɵɵtext(9, " Changer de m\u00E9thode ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "ol", 22);
    i0.ɵɵrepeaterCreate(11, EnrollmentWizardComponent_Conditional_2_For_12_Template, 4, 6, "li", 23, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 24)(14, "div", 25);
    i0.ɵɵtemplate(15, EnrollmentWizardComponent_Conditional_2_Conditional_15_Template, 47, 2, "section", 26)(16, EnrollmentWizardComponent_Conditional_2_Conditional_16_Template, 48, 2, "section", 26)(17, EnrollmentWizardComponent_Conditional_2_Conditional_17_Template, 13, 1, "section", 26)(18, EnrollmentWizardComponent_Conditional_2_Conditional_18_Template, 14, 2, "section", 26)(19, EnrollmentWizardComponent_Conditional_2_Conditional_19_Template, 11, 3, "section", 26)(20, EnrollmentWizardComponent_Conditional_2_Conditional_20_Template, 20, 1, "section", 26)(21, EnrollmentWizardComponent_Conditional_2_Conditional_21_Template, 13, 3, "section", 26)(22, EnrollmentWizardComponent_Conditional_2_Conditional_22_Template, 1, 1)(23, EnrollmentWizardComponent_Conditional_2_Conditional_23_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(24, EnrollmentWizardComponent_Conditional_2_Conditional_24_Template, 28, 7, "aside", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_2_0;
    const currentMode_r33 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((tmp_2_0 = currentMode_r33) === "NEW" ? 3 : tmp_2_0 === "RETURNING" ? 4 : tmp_2_0 === "IMPORT" ? 5 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("\u00C9tape ", ctx_r1.step(), " sur ", ctx_r1.stepLabels().length, "");
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.stepLabels());
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("layout--wide", currentMode_r33 === "IMPORT");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(currentMode_r33 === "NEW" && ctx_r1.step() === 1 ? 15 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentMode_r33 === "NEW" && ctx_r1.step() === 2 ? 16 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentMode_r33 === "RETURNING" && ctx_r1.step() === 1 ? 17 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentMode_r33 === "NEW" && ctx_r1.step() === 3 || currentMode_r33 === "RETURNING" && ctx_r1.step() === 2 ? 18 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentMode_r33 === "NEW" && ctx_r1.step() === 4 || currentMode_r33 === "RETURNING" && ctx_r1.step() === 3 ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentMode_r33 === "IMPORT" && ctx_r1.step() === 1 ? 20 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentMode_r33 === "IMPORT" && ctx_r1.step() === 2 ? 21 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentMode_r33 === "IMPORT" && ctx_r1.step() === 3 ? 22 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currentMode_r33 === "IMPORT" && ctx_r1.step() === 4 ? 23 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.mode() !== "IMPORT" ? 24 : -1);
} }
export class EnrollmentWizardComponent {
    fb = inject(FormBuilder);
    students = inject(STUDENT_DATA_SOURCE);
    classrooms = inject(CLASSROOM_DATA_SOURCE);
    enrollments = inject(ENROLLMENT_DATA_SOURCE);
    importService = inject(StudentImportService);
    notifications = inject(NotificationService);
    setupStatus = inject(SetupStatusService);
    router = inject(Router);
    destroyRef = inject(DestroyRef);
    /** null tant que l'utilisateur n'a pas choisi son mode d'entrée. */
    mode = signal(null);
    step = signal(1);
    submitting = signal(false);
    availableClasses = signal([]);
    selectedClassroom = signal(null);
    checkResult = signal(null);
    checking = signal(false);
    // --- mode réinscription ---
    candidates = signal([]);
    selectedStudent = signal(null);
    // --- mode import ---
    preview = signal(null);
    importReport = signal(null);
    analysing = signal(false);
    dragging = signal(false);
    /** Dérogation de capacité : permission + justification, toutes deux auditées. */
    overrideRequested = false;
    overrideReason = '';
    /** Une clé par session d'assistant : un double clic n'inscrit qu'une fois. */
    idempotencyKey = createUuid();
    identity = this.fb.nonNullable.group({
        lastName: ['', [Validators.required, Validators.maxLength(120)]],
        firstName: ['', [Validators.required, Validators.maxLength(120)]],
        gender: ['FEMALE', [Validators.required]],
        birthDate: ['', [Validators.required]],
        birthPlace: [''],
        nationality: ['Ivoirienne'],
        previousSchool: ['']
    });
    guardian = this.fb.nonNullable.group({
        lastName: ['', [Validators.required, Validators.maxLength(120)]],
        firstName: ['', [Validators.required, Validators.maxLength(120)]],
        phone: ['', [Validators.required]],
        email: ['', [Validators.email]],
        relationship: ['MOTHER', [Validators.required]],
        financialResponsibility: [true]
    });
    ngOnInit() {
        this.classrooms.list().pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((list) => this.availableClasses.set(list));
    }
    // ------------------------------------------------------------- navigation
    chooseMode(mode) {
        this.mode.set(mode);
        this.step.set(1);
    }
    backToModes() {
        this.mode.set(null);
        this.step.set(1);
        this.preview.set(null);
        this.importReport.set(null);
        this.selectedStudent.set(null);
        this.selectedClassroom.set(null);
        this.checkResult.set(null);
    }
    next() {
        this.step.update((s) => s + 1);
    }
    back() {
        this.step.update((s) => Math.max(1, s - 1));
    }
    /** Libellés des étapes, propres à chaque mode. */
    stepLabels = computed(() => {
        switch (this.mode()) {
            case 'NEW': return ['Identité', 'Responsable', 'Classe', 'Confirmation'];
            case 'RETURNING': return ['Élève', 'Classe', 'Confirmation'];
            case 'IMPORT': return ['Modèle', 'Dépôt', 'Vérification', 'Import'];
            default: return [];
        }
    });
    // --------------------------------------------------------- élève existant
    searchStudents(term) {
        if (term.trim().length < 2) {
            this.candidates.set([]);
            return;
        }
        this.students.search({ page: 0, size: 8, search: term })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((page) => this.candidates.set(page.content));
    }
    chooseStudent(student) {
        this.selectedStudent.set(student);
        this.next();
    }
    // ------------------------------------------------------------------ classe
    chooseClassroom(classroom) {
        this.selectedClassroom.set(classroom);
        const student = this.selectedStudent();
        if (student) {
            this.runCheck(student.id, classroom.id);
        }
        else {
            // Élève pas encore créé : seule la capacité est vérifiable maintenant.
            this.checkResult.set({
                allowed: classroom.availableSeats > 0,
                blockers: classroom.availableSeats > 0 ? [] : ['CLASS_CAPACITY_EXCEEDED'],
                warnings: classroom.capacityStatus === 'WARNING' ? ['CLASS_CAPACITY_WARNING'] : [],
                capacityMaximum: classroom.capacityMaximum,
                occupiedSeats: classroom.activeEnrollments,
                availableSeats: classroom.availableSeats,
                projectedAvailableSeats: classroom.projectedAvailableSeats ?? classroom.availableSeats
            });
        }
    }
    runCheck(studentId, classroomId) {
        this.checking.set(true);
        this.enrollments.check(studentId, classroomId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (result) => {
                this.checkResult.set(result);
                this.checking.set(false);
            },
            error: () => this.checking.set(false)
        });
    }
    blockerMessage(code) {
        return translateErrorCode(code);
    }
    canOverride() {
        const result = this.checkResult();
        return !!result && result.blockers.length === 1
            && result.blockers[0] === 'CLASS_CAPACITY_EXCEEDED';
    }
    canSubmit() {
        const result = this.checkResult();
        if (!result || !this.selectedClassroom()) {
            return false;
        }
        if (this.mode() === 'NEW' && (this.identity.invalid || this.guardian.invalid)) {
            return false;
        }
        if (this.mode() === 'RETURNING' && !this.selectedStudent()) {
            return false;
        }
        if (result.allowed) {
            return true;
        }
        return this.canOverride() && this.overrideRequested
            && this.overrideReason.trim().length >= 10;
    }
    submit() {
        if (!this.canSubmit() || this.submitting()) {
            return;
        }
        this.submitting.set(true);
        const payload = {
            studentId: this.selectedStudent()?.id,
            newStudent: this.mode() === 'NEW' ? {
                ...this.identity.getRawValue(),
                guardian: this.guardian.getRawValue()
            } : undefined,
            classroomId: this.selectedClassroom().id,
            enrollmentKind: this.mode() === 'RETURNING' ? 'RE_ENROLLMENT' : 'NEW',
            validateImmediately: true,
            overCapacityOverride: this.overrideRequested,
            overCapacityReason: this.overrideRequested ? this.overrideReason : undefined,
            idempotencyKey: this.idempotencyKey
        };
        this.enrollments.create(payload)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (enrollment) => {
                this.notifications.success(`${enrollment.studentName} est inscrit(e) en ${enrollment.classroomName}.`, `Inscription ${enrollment.enrollmentNumber}`);
                this.setupStatus.refresh();
                void this.router.navigate(['/enrollments']);
            },
            error: () => this.submitting.set(false)
        });
    }
    // ------------------------------------------------------------------ import
    downloadTemplate() {
        this.importService.downloadTemplate();
        this.notifications.info('Remplissez une ligne par élève, puis déposez le fichier à l\'étape suivante.');
        this.next();
    }
    onDragOver(event) {
        event.preventDefault();
        this.dragging.set(true);
    }
    onDragLeave() {
        this.dragging.set(false);
    }
    onDrop(event) {
        event.preventDefault();
        this.dragging.set(false);
        const file = event.dataTransfer?.files?.[0];
        if (file) {
            this.analyseFile(file);
        }
    }
    onFileSelected(event) {
        const file = event.target.files?.[0];
        if (file) {
            this.analyseFile(file);
        }
    }
    analyseFile(file) {
        this.analysing.set(true);
        this.importService.analyse(file)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (preview) => {
                this.preview.set(preview);
                this.previewPage.set(0);
                this.analysing.set(false);
                this.step.set(3);
            },
            error: () => this.analysing.set(false)
        });
    }
    confirmImport() {
        const preview = this.preview();
        if (!preview || this.submitting()) {
            return;
        }
        this.submitting.set(true);
        this.importService.confirm(preview.batchId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (report) => {
                this.importReport.set(report);
                this.submitting.set(false);
                this.step.set(4);
                this.setupStatus.refresh();
                this.notifications.success(`${report.validRows} élève(s) créé(s) et inscrit(s).`, 'Import terminé');
            },
            error: () => this.submitting.set(false)
        });
    }
    rowTone(status) {
        switch (status) {
            case 'VALID': return 'success';
            case 'WARNING': return 'warning';
            case 'DUPLICATE': return 'neutral';
            default: return 'danger';
        }
    }
    rowLabel(status) {
        switch (status) {
            case 'VALID': return 'Prêt';
            case 'WARNING': return 'À vérifier';
            case 'DUPLICATE': return 'Doublon';
            default: return 'Erreur';
        }
    }
    /** Colonnes réellement présentes dans le fichier déposé. */
    previewColumns = computed(() => {
        const rows = this.preview()?.rows ?? [];
        const keys = new Set();
        rows.forEach((r) => Object.keys(r.values).forEach((k) => keys.add(k)));
        return Array.from(keys).slice(0, 5);
    });
    // --- pagination de l'aperçu import : 300 lignes d'un coup rend le tableau illisible ---
    pageSizeOptions = [10, 20, 50, 100];
    previewPageSize = signal(10);
    previewPage = signal(0);
    previewTotalPages = computed(() => {
        const total = this.preview()?.rows.length ?? 0;
        return Math.max(1, Math.ceil(total / this.previewPageSize()));
    });
    pagedPreviewRows = computed(() => {
        const rows = this.preview()?.rows ?? [];
        const start = this.previewPage() * this.previewPageSize();
        return rows.slice(start, start + this.previewPageSize());
    });
    previewFirstRow() {
        const total = this.preview()?.rows.length ?? 0;
        return total === 0 ? 0 : this.previewPage() * this.previewPageSize() + 1;
    }
    previewLastRow() {
        const total = this.preview()?.rows.length ?? 0;
        return Math.min(total, (this.previewPage() + 1) * this.previewPageSize());
    }
    previewPrevPage() {
        this.previewPage.update((p) => Math.max(0, p - 1));
    }
    previewNextPage() {
        this.previewPage.update((p) => Math.min(this.previewTotalPages() - 1, p + 1));
    }
    changePreviewPageSize(event) {
        const size = Number(event.target.value);
        if (Number.isFinite(size) && size > 0) {
            this.previewPageSize.set(size);
            this.previewPage.set(0);
        }
    }
    /** Nom affiché dans le panneau latéral, au fur et à mesure de la saisie. */
    draftName = computed(() => {
        const student = this.selectedStudent();
        if (student) {
            return student.fullName;
        }
        const { firstName, lastName } = this.identity.getRawValue();
        return `${firstName} ${lastName}`.trim();
    });
    static ɵfac = function EnrollmentWizardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EnrollmentWizardComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EnrollmentWizardComponent, selectors: [["eduops-enrollment-wizard"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 2, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta"], ["routerLink", "/enrollments", 1, "btn", "btn--secondary"], [1, "modes"], ["type", "button", 1, "mode", "mode--new", 3, "click"], ["aria-hidden", "true", 1, "mode__icon"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.6", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M19 8v6M22 11h-6"], [1, "mode__title"], [1, "mode__text"], [1, "mode__hint"], ["type", "button", 1, "mode", "mode--returning", 3, "click"], ["d", "M3 12a9 9 0 1 0 3-6.7L3 8"], ["d", "M3 3v5h5"], ["type", "button", 1, "mode", "mode--import", 3, "click"], ["d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"], ["d", "M7 10l5 5 5-5M12 15V3"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], [1, "steps"], [1, "steps__item", 3, "steps__item--active", "steps__item--current"], [1, "layout"], [1, "layout__main"], [1, "card"], [1, "layout__side"], [1, "steps__item"], [1, "steps__index"], [1, "card__header"], [1, "card__title"], [1, "card__body", 3, "formGroup"], [1, "grid2"], [1, "field"], ["for", "lastName", 1, "field__label", "field__label--required"], ["id", "lastName", "formControlName", "lastName", "placeholder", "KONE", "autocomplete", "family-name", 1, "input"], ["for", "firstName", 1, "field__label", "field__label--required"], ["id", "firstName", "formControlName", "firstName", "placeholder", "Aya Marie", "autocomplete", "given-name", 1, "input"], ["for", "gender", 1, "field__label", "field__label--required"], ["id", "gender", "formControlName", "gender", 1, "select"], ["value", "FEMALE"], ["value", "MALE"], ["for", "birthDate", 1, "field__label", "field__label--required"], ["id", "birthDate", "type", "date", "formControlName", "birthDate", 1, "input"], ["for", "birthPlace", 1, "field__label"], ["id", "birthPlace", "formControlName", "birthPlace", "placeholder", "Abidjan", 1, "input"], ["for", "nationality", 1, "field__label"], ["id", "nationality", "formControlName", "nationality", 1, "input"], ["for", "previousSchool", 1, "field__label"], ["id", "previousSchool", "formControlName", "previousSchool", "placeholder", "EPP Cocody", 1, "input"], [1, "field__hint"], [1, "card__footer", "row", "row--between"], [1, "footer-note"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [1, "hint-block"], ["for", "gLastName", 1, "field__label", "field__label--required"], ["id", "gLastName", "formControlName", "lastName", 1, "input"], ["for", "gFirstName", 1, "field__label", "field__label--required"], ["id", "gFirstName", "formControlName", "firstName", 1, "input"], ["for", "gPhone", 1, "field__label", "field__label--required"], ["id", "gPhone", "type", "tel", "formControlName", "phone", "placeholder", "+225 07 11 22 33", 1, "input"], ["for", "gEmail", 1, "field__label"], ["id", "gEmail", "type", "email", "formControlName", "email", 1, "input"], ["for", "gRel", 1, "field__label", "field__label--required"], ["id", "gRel", "formControlName", "relationship", 1, "select"], ["value", "MOTHER"], ["value", "FATHER"], ["value", "TUTOR"], ["value", "LEGAL_REPRESENTATIVE"], [1, "switch"], ["type", "checkbox", "formControlName", "financialResponsibility"], [1, "card__body"], ["for", "search", 1, "field__label"], ["id", "search", "type", "search", "placeholder", "Au moins 2 caract\u00E8res", 1, "input", 3, "input"], [1, "picker"], [1, "picker__empty"], ["type", "button", 1, "picker__row", 3, "click"], ["size", "sm", 3, "name"], [1, "picker__body"], [1, "picker__title"], [1, "picker__meta", "numeric"], [3, "status"], [1, "classes"], ["type", "button", 1, "class-row", 3, "click", "disabled"], [1, "class-row__body"], [1, "class-row__name"], [1, "class-row__meta", "numeric"], ["aria-hidden", "true", 1, "gauge-mini"], [1, "gauge-mini__fill"], ["routerLink", "/classes"], ["type", "button", 1, "btn", "btn--primary", "btn--lg", 3, "click", "disabled"], [1, "capacity"], [1, "capacity__line", "numeric"], ["role", "status", 1, "verdict", "verdict--ok"], ["role", "alert", 1, "verdict", "verdict--ko"], [1, "verdict", "verdict--warn"], [1, "override"], [1, "verdict__title"], ["type", "checkbox", "name", "override", 3, "ngModelChange", "ngModel"], ["for", "reason", 1, "field__label", "field__label--required"], ["id", "reason", "rows", "3", "name", "reason", "placeholder", "Motif d\u00E9taill\u00E9 (10 caract\u00E8res minimum)", 1, "textarea", 3, "ngModelChange", "ngModel"], [1, "columns-preview"], [1, "columns-preview__title"], [1, "columns-preview__chips"], [1, "col-chip"], [1, "columns-preview__note"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], [1, "dropzone", 3, "dragover", "dragleave", "drop"], ["aria-hidden", "true", 1, "spinner"], [1, "dropzone__title"], [1, "dropzone__text"], ["aria-hidden", "true", 1, "dropzone__icon"], [1, "btn", "btn--primary", "dropzone__button"], ["type", "file", "accept", ".xlsx,.xls,.csv", "hidden", "", 3, "change"], [1, "card__subtitle"], [1, "tally"], [1, "tally__item", "tally__item--ok"], [1, "tally__value", "numeric"], [1, "tally__label"], [1, "tally__item", "tally__item--warn"], [1, "tally__item", "tally__item--dup"], [1, "tally__item", "tally__item--err"], [1, "table-toolbar"], [1, "table-toolbar__count", "numeric"], [1, "pager__size"], [3, "change", "value"], [3, "value"], [1, "table-wrapper"], [1, "table"], [1, "visually-hidden"], [1, "numeric"], [3, "class"], ["aria-label", "Pagination de l'aper\u00E7u", 1, "pager"], [1, "badge"], [1, "cell-detail"], [1, "msg", "msg--err"], [1, "msg", "msg--warn"], [1, "msg", "msg--ok", "numeric"], [1, "pager__state", "numeric"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click", "disabled"], [1, "card__body", "done"], ["aria-hidden", "true", 1, "done__icon"], [1, "done__title"], [1, "done__text", "numeric"], [1, "done__warn", "numeric"], [1, "done__actions"], ["routerLink", "/students", 1, "btn", "btn--secondary"], ["routerLink", "/enrollments", 1, "btn", "btn--primary"], [1, "draft", "card"], [1, "draft__head"], ["size", "lg", 3, "name"], [1, "draft__name"], [1, "draft__meta"], [1, "draft__list"], [1, "draft__note"]], template: function EnrollmentWizardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, EnrollmentWizardComponent_Conditional_1_Template, 43, 0)(2, EnrollmentWizardComponent_Conditional_2_Template, 25, 15);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_1_0;
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.mode() === null ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_1_0 = ctx.mode()) ? 2 : -1, tmp_1_0);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, FormsModule, i1.NgModel, RouterLink,
            AvatarComponent, StatusBadgeComponent], styles: ["@import 'styles/tokens';\n\n\n\n\n.modes[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: var(--space-4);\n  margin-top: var(--space-4);\n}\n\n.mode[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: var(--space-2);\n  padding: var(--space-5);\n  text-align: left;\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  cursor: pointer;\n  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;\n\n  &:hover,\n  &:focus-visible {\n    transform: translateY(-3px);\n    border-color: var(--brand);\n    box-shadow: var(--shadow-md);\n  }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    width: 46px;\n    height: 46px;\n    border-radius: var(--radius-button);\n    background: var(--brand-tint);\n    color: var(--brand);\n\n    svg { width: 24px; height: 24px; }\n  }\n\n  &__title {\n    font-size: 1.05rem;\n    font-weight: 600;\n    color: var(--text-strong);\n  }\n\n  &__text {\n    font-size: .875rem;\n    line-height: 1.5;\n    color: var(--text-muted);\n  }\n\n  &__hint {\n    margin-top: auto;\n    padding-top: var(--space-2);\n    font-size: .78rem;\n    font-weight: 500;\n    color: var(--brand);\n  }\n\n  &--returning &__icon { background: var(--info-bg); color: var(--info); }\n  &--returning &__hint { color: var(--info); }\n  &--import &__icon { background: var(--success-bg); color: var(--success); }\n  &--import &__hint { color: var(--success); }\n}\n\n\n\n\n.steps[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-2);\n  margin: 0 0 var(--space-4);\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-3);\n    font-size: .85rem;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border: 1px solid var(--border);\n    border-radius: var(--radius-pill);\n\n    &--active {\n      color: var(--brand);\n      border-color: var(--brand);\n      background: var(--brand-tint);\n    }\n\n    &--current {\n      font-weight: 600;\n      box-shadow: 0 0 0 3px var(--brand-tint);\n    }\n  }\n\n  &__index {\n    display: grid;\n    place-items: center;\n    width: 20px;\n    height: 20px;\n    font-size: .72rem;\n    font-weight: 700;\n    border-radius: 50%;\n    background: var(--surface-card);\n    border: 1px solid currentColor;\n  }\n}\n\n\n\n\n.layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 300px;\n  gap: var(--space-4);\n  align-items: start;\n\n  &--wide { grid-template-columns: minmax(0, 1fr); }\n\n  @media (max-width: 1080px) {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n\n.grid2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-3);\n  padding: var(--space-3);\n  font-size: .875rem;\n  line-height: 1.5;\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.footer-note[_ngcontent-%COMP%] {\n  font-size: .8rem;\n  color: var(--text-light);\n}\n\n\n\n\n.picker[_ngcontent-%COMP%] {\n  margin: var(--space-3) 0 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n\n  &__row {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    width: 100%;\n    padding: var(--space-2) var(--space-3);\n    text-align: left;\n    background: transparent;\n    border: 1px solid transparent;\n    border-radius: var(--radius-button);\n    cursor: pointer;\n\n    &:hover { background: var(--surface-sunken); border-color: var(--border); }\n  }\n\n  &__body { display: flex; flex-direction: column; flex: 1; min-width: 0; }\n  &__title { font-weight: 600; color: var(--text-strong); }\n  &__meta { font-size: .8rem; color: var(--text-muted); }\n\n  &__empty {\n    padding: var(--space-5);\n    text-align: center;\n    font-size: .875rem;\n    color: var(--text-light);\n  }\n}\n\n.classes[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n\n.class-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 90px auto;\n  align-items: center;\n  gap: var(--space-3);\n  width: 100%;\n  padding: var(--space-3);\n  text-align: left;\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-button);\n  cursor: pointer;\n\n  &:hover:not(:disabled) { border-color: var(--brand); }\n  &:disabled { opacity: .55; cursor: progress; }\n\n  &--on {\n    border-color: var(--brand);\n    background: var(--brand-tint);\n    box-shadow: 0 0 0 2px var(--brand-tint);\n  }\n\n  &__body { display: flex; flex-direction: column; min-width: 0; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__meta { font-size: .8rem; color: var(--text-muted); }\n\n  @media (max-width: 620px) {\n    grid-template-columns: minmax(0, 1fr) auto;\n    .gauge-mini { display: none; }\n  }\n}\n\n.gauge-mini[_ngcontent-%COMP%] {\n  display: block;\n  height: 6px;\n  border-radius: var(--radius-pill);\n  background: var(--surface-sunken);\n  overflow: hidden;\n\n  &__fill {\n    display: block;\n    height: 100%;\n    background: var(--success);\n    transition: width .2s ease;\n\n    &--WARNING { background: var(--warning); }\n    &--FULL,\n    &--OVER_CAPACITY { background: var(--danger); }\n  }\n}\n\n\n\n\n.capacity[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__line { margin: 0; font-size: .9rem; color: var(--text-normal); }\n}\n\n.verdict[_ngcontent-%COMP%] {\n  margin: var(--space-3) 0 0;\n  padding: var(--space-3);\n  font-size: .9rem;\n  line-height: 1.5;\n  border-radius: var(--radius-button);\n  border-left: 3px solid transparent;\n\n  ul { margin: var(--space-2) 0 0; padding-left: var(--space-4); }\n\n  &__title { margin: 0; font-weight: 600; }\n\n  &--ok { color: var(--success); background: var(--success-bg); border-left-color: var(--success); }\n  &--warn { color: var(--warning); background: var(--warning-bg); border-left-color: var(--warning); }\n  &--ko { color: var(--danger); background: var(--danger-bg); border-left-color: var(--danger); }\n}\n\n.override[_ngcontent-%COMP%] {\n  margin-top: var(--space-4);\n  padding: var(--space-3);\n  border: 1px dashed var(--warning);\n  border-radius: var(--radius-button);\n}\n\n\n\n\n.columns-preview[_ngcontent-%COMP%] {\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__title { margin: 0 0 var(--space-2); font-weight: 600; font-size: .9rem; }\n  &__chips { display: flex; flex-wrap: wrap; gap: var(--space-1); }\n  &__note { margin: var(--space-3) 0 0; font-size: .8rem; color: var(--text-light); }\n}\n\n.col-chip[_ngcontent-%COMP%] {\n  padding: 2px var(--space-2);\n  font-size: .78rem;\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-pill);\n}\n\n.dropzone[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  min-height: 240px;\n  padding: var(--space-6);\n  text-align: center;\n  border: 2px dashed var(--border-strong);\n  border-radius: var(--radius-card);\n  background: var(--surface-sunken);\n  transition: border-color .15s ease, background .15s ease;\n\n  &--over {\n    border-color: var(--brand);\n    background: var(--brand-tint);\n  }\n\n  &__icon { font-size: 2.2rem; color: var(--brand); line-height: 1; }\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; font-size: .85rem; color: var(--text-muted); }\n  &__button { margin-top: var(--space-2); cursor: pointer; }\n}\n\n.spinner[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  border: 3px solid var(--border);\n  border-top-color: var(--brand);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin .8s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_spin { to { transform: rotate(360deg); } }\n\n.tally[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: var(--space-2);\n  padding: var(--space-3) var(--space-4);\n  border-bottom: 1px solid var(--border);\n\n  &__item {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    padding: var(--space-3);\n    border-radius: var(--radius-button);\n    background: var(--surface-sunken);\n  }\n\n  &__value { font-size: 1.5rem; font-weight: 700; line-height: 1; }\n  &__label { font-size: .78rem; color: var(--text-muted); }\n\n  &__item--ok { background: var(--success-bg); .tally__value { color: var(--success); } }\n  &__item--warn { background: var(--warning-bg); .tally__value { color: var(--warning); } }\n  &__item--dup { .tally__value { color: var(--text-muted); } }\n  &__item--err { background: var(--danger-bg); .tally__value { color: var(--danger); } }\n}\n\n.table-wrapper[_ngcontent-%COMP%] { overflow-x: auto; }\n\n.table-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  flex-wrap: wrap;\n  padding: var(--space-2) var(--space-4);\n\n  &__count { font-size: .82rem; color: var(--text-muted); }\n}\n\n.pager[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  flex-wrap: wrap;\n  padding: var(--space-3) var(--space-4);\n  border-top: 1px solid var(--border);\n\n  &__state { font-size: .82rem; color: var(--text-muted); }\n\n  &__size {\n    display: inline-flex;\n    align-items: center;\n    gap: var(--space-2);\n    font-size: .82rem;\n    color: var(--text-muted);\n\n    select {\n      padding: .3rem .5rem;\n      font-size: .85rem;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      border: 1px solid var(--border);\n      border-radius: var(--radius-button);\n      cursor: pointer;\n    }\n  }\n}\n\n.row--invalid[_ngcontent-%COMP%]    > td[_ngcontent-%COMP%] { background: var(--danger-bg); }\n.row--duplicate[_ngcontent-%COMP%]    > td[_ngcontent-%COMP%] { background: var(--surface-sunken); }\n.row--warning[_ngcontent-%COMP%]    > td[_ngcontent-%COMP%] { background: var(--warning-bg); }\n\n.cell-detail[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  max-width: 280px;\n}\n\n.msg[_ngcontent-%COMP%] {\n  font-size: .78rem;\n  line-height: 1.35;\n\n  &--err { color: var(--danger); }\n  &--warn { color: var(--warning); }\n  &--ok { color: var(--text-light); }\n}\n\n.done[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-8) var(--space-4);\n  text-align: center;\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    width: 56px;\n    height: 56px;\n    font-size: 1.8rem;\n    color: var(--success);\n    background: var(--success-bg);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-size: 1.25rem; }\n  &__text { margin: 0; color: var(--text-muted); }\n  &__warn { margin: 0; color: var(--warning); font-size: .875rem; }\n  &__actions { display: flex; gap: var(--space-2); margin-top: var(--space-3); }\n}\n\n\n\n\n.draft[_ngcontent-%COMP%] {\n  position: sticky;\n  top: var(--space-4);\n  padding: var(--space-4);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding-bottom: var(--space-3);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__name { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__meta { margin: 0; font-size: .78rem; color: var(--text-light); }\n\n  &__list {\n    margin: var(--space-3) 0;\n\n    > div {\n      display: flex;\n      justify-content: space-between;\n      gap: var(--space-2);\n      padding: var(--space-2) 0;\n      border-bottom: 1px dashed var(--border);\n    }\n\n    dt { font-size: .8rem; color: var(--text-muted); }\n    dd { margin: 0; font-size: .85rem; font-weight: 500; text-align: right; color: var(--text-strong); }\n  }\n\n  &__note {\n    margin: 0;\n    font-size: .78rem;\n    line-height: 1.5;\n    color: var(--text-light);\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EnrollmentWizardComponent, [{
        type: Component,
        args: [{ selector: 'eduops-enrollment-wizard', standalone: true, imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,
                    AvatarComponent, StatusBadgeComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550 Choix du mode \u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (mode() === null) {\n    <header class=\"page__header\">\n      <div>\n        <h1 class=\"page__title\">Nouvelle inscription</h1>\n        <p class=\"page__meta\">Comment souhaitez-vous proc\u00E9der ?</p>\n      </div>\n      <a class=\"btn btn--secondary\" routerLink=\"/enrollments\">Retour \u00E0 la liste</a>\n    </header>\n\n    <div class=\"modes\">\n      <button type=\"button\" class=\"mode mode--new\" (click)=\"chooseMode('NEW')\">\n        <span class=\"mode__icon\" aria-hidden=\"true\">\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"\n               stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/>\n            <circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M19 8v6M22 11h-6\"/>\n          </svg>\n        </span>\n        <span class=\"mode__title\">Nouvel \u00E9l\u00E8ve</span>\n        <span class=\"mode__text\">\n          L'\u00E9l\u00E8ve n'existe pas encore. Vous saisissez son identit\u00E9, son responsable\n          l\u00E9gal, puis vous l'affectez \u00E0 une classe.\n        </span>\n        <span class=\"mode__hint\">Le cas le plus courant \u00E0 la rentr\u00E9e</span>\n      </button>\n\n      <button type=\"button\" class=\"mode mode--returning\" (click)=\"chooseMode('RETURNING')\">\n        <span class=\"mode__icon\" aria-hidden=\"true\">\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"\n               stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <path d=\"M3 12a9 9 0 1 0 3-6.7L3 8\"/><path d=\"M3 3v5h5\"/>\n          </svg>\n        </span>\n        <span class=\"mode__title\">R\u00E9inscription</span>\n        <span class=\"mode__text\">\n          L'\u00E9l\u00E8ve est d\u00E9j\u00E0 connu de l'\u00E9tablissement. Vous le retrouvez, puis vous\n          l'inscrivez dans sa nouvelle classe.\n        </span>\n        <span class=\"mode__hint\">Son historique est conserv\u00E9</span>\n      </button>\n\n      <button type=\"button\" class=\"mode mode--import\" (click)=\"chooseMode('IMPORT')\">\n        <span class=\"mode__icon\" aria-hidden=\"true\">\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"\n               stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/>\n            <path d=\"M7 10l5 5 5-5M12 15V3\"/>\n          </svg>\n        </span>\n        <span class=\"mode__title\">Import Excel</span>\n        <span class=\"mode__text\">\n          Vous avez d\u00E9j\u00E0 une liste. T\u00E9l\u00E9chargez le mod\u00E8le, remplissez-le, d\u00E9posez-le :\n          les doublons et les erreurs sont signal\u00E9s avant tout enregistrement.\n        </span>\n        <span class=\"mode__hint\">Plusieurs dizaines d'\u00E9l\u00E8ves d'un coup</span>\n      </button>\n    </div>\n  }\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550 Parcours \u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  @if (mode(); as currentMode) {\n    <header class=\"page__header\">\n      <div>\n        <h1 class=\"page__title\">\n          @switch (currentMode) {\n            @case ('NEW') { Inscrire un nouvel \u00E9l\u00E8ve }\n            @case ('RETURNING') { R\u00E9inscrire un \u00E9l\u00E8ve }\n            @case ('IMPORT') { Importer une liste d'\u00E9l\u00E8ves }\n          }\n        </h1>\n        <p class=\"page__meta\">\u00C9tape {{ step() }} sur {{ stepLabels().length }}</p>\n      </div>\n      <button type=\"button\" class=\"btn btn--secondary\" (click)=\"backToModes()\">\n        Changer de m\u00E9thode\n      </button>\n    </header>\n\n    <ol class=\"steps\">\n      @for (label of stepLabels(); track label; let i = $index) {\n        <li class=\"steps__item\" [class.steps__item--active]=\"step() >= i + 1\"\n            [class.steps__item--current]=\"step() === i + 1\">\n          <span class=\"steps__index\">{{ i + 1 }}</span> {{ label }}\n        </li>\n      }\n    </ol>\n\n    <div class=\"layout\" [class.layout--wide]=\"currentMode === 'IMPORT'\">\n      <div class=\"layout__main\">\n\n        <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500 NOUVEL \u00C9L\u00C8VE : identit\u00E9 \u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n        @if (currentMode === 'NEW' && step() === 1) {\n          <section class=\"card\">\n            <header class=\"card__header\"><h2 class=\"card__title\">Identit\u00E9 de l'\u00E9l\u00E8ve</h2></header>\n            <form class=\"card__body\" [formGroup]=\"identity\">\n              <div class=\"grid2\">\n                <div class=\"field\">\n                  <label class=\"field__label field__label--required\" for=\"lastName\">Nom</label>\n                  <input id=\"lastName\" class=\"input\" formControlName=\"lastName\"\n                         placeholder=\"KONE\" autocomplete=\"family-name\" />\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label field__label--required\" for=\"firstName\">Pr\u00E9noms</label>\n                  <input id=\"firstName\" class=\"input\" formControlName=\"firstName\"\n                         placeholder=\"Aya Marie\" autocomplete=\"given-name\" />\n                </div>\n              </div>\n\n              <div class=\"grid2\">\n                <div class=\"field\">\n                  <label class=\"field__label field__label--required\" for=\"gender\">Sexe</label>\n                  <select id=\"gender\" class=\"select\" formControlName=\"gender\">\n                    <option value=\"FEMALE\">F\u00E9minin</option>\n                    <option value=\"MALE\">Masculin</option>\n                  </select>\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label field__label--required\" for=\"birthDate\">\n                    Date de naissance\n                  </label>\n                  <input id=\"birthDate\" class=\"input\" type=\"date\" formControlName=\"birthDate\" />\n                </div>\n              </div>\n\n              <div class=\"grid2\">\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"birthPlace\">Lieu de naissance</label>\n                  <input id=\"birthPlace\" class=\"input\" formControlName=\"birthPlace\"\n                         placeholder=\"Abidjan\" />\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"nationality\">Nationalit\u00E9</label>\n                  <input id=\"nationality\" class=\"input\" formControlName=\"nationality\" />\n                </div>\n              </div>\n\n              <div class=\"field\">\n                <label class=\"field__label\" for=\"previousSchool\">\u00C9cole pr\u00E9c\u00E9dente</label>\n                <input id=\"previousSchool\" class=\"input\" formControlName=\"previousSchool\"\n                       placeholder=\"EPP Cocody\" />\n                <span class=\"field__hint\">\n                  Le matricule sera attribu\u00E9 automatiquement selon le format de l'\u00E9tablissement.\n                </span>\n              </div>\n            </form>\n            <footer class=\"card__footer row row--between\">\n              <span class=\"footer-note\">Les champs marqu\u00E9s d'une \u00E9toile sont obligatoires.</span>\n              <button type=\"button\" class=\"btn btn--primary\"\n                      [disabled]=\"identity.invalid\" (click)=\"next()\">Continuer</button>\n            </footer>\n          </section>\n        }\n\n        <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500 NOUVEL \u00C9L\u00C8VE : responsable \u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n        @if (currentMode === 'NEW' && step() === 2) {\n          <section class=\"card\">\n            <header class=\"card__header\">\n              <h2 class=\"card__title\">Responsable l\u00E9gal</h2>\n            </header>\n            <form class=\"card__body\" [formGroup]=\"guardian\">\n              <p class=\"hint-block\">\n                Ce responsable recevra les notifications d'absence, les bulletins et,\n                s'il est d\u00E9sign\u00E9 responsable financier, les avis d'\u00E9ch\u00E9ance.\n              </p>\n\n              <div class=\"grid2\">\n                <div class=\"field\">\n                  <label class=\"field__label field__label--required\" for=\"gLastName\">Nom</label>\n                  <input id=\"gLastName\" class=\"input\" formControlName=\"lastName\" />\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label field__label--required\" for=\"gFirstName\">Pr\u00E9noms</label>\n                  <input id=\"gFirstName\" class=\"input\" formControlName=\"firstName\" />\n                </div>\n              </div>\n\n              <div class=\"grid2\">\n                <div class=\"field\">\n                  <label class=\"field__label field__label--required\" for=\"gPhone\">T\u00E9l\u00E9phone</label>\n                  <input id=\"gPhone\" class=\"input\" type=\"tel\" formControlName=\"phone\"\n                         placeholder=\"+225 07 11 22 33\" />\n                </div>\n                <div class=\"field\">\n                  <label class=\"field__label\" for=\"gEmail\">Email</label>\n                  <input id=\"gEmail\" class=\"input\" type=\"email\" formControlName=\"email\" />\n                  <span class=\"field__hint\">N\u00E9cessaire pour ouvrir le portail parent.</span>\n                </div>\n              </div>\n\n              <div class=\"field\">\n                <label class=\"field__label field__label--required\" for=\"gRel\">Lien de parent\u00E9</label>\n                <select id=\"gRel\" class=\"select\" formControlName=\"relationship\">\n                  <option value=\"MOTHER\">M\u00E8re</option>\n                  <option value=\"FATHER\">P\u00E8re</option>\n                  <option value=\"TUTOR\">Tuteur</option>\n                  <option value=\"LEGAL_REPRESENTATIVE\">Repr\u00E9sentant l\u00E9gal</option>\n                </select>\n              </div>\n\n              <label class=\"switch\">\n                <input type=\"checkbox\" formControlName=\"financialResponsibility\" />\n                <span>Responsable financier : re\u00E7oit les factures et les relances d'impay\u00E9</span>\n              </label>\n            </form>\n            <footer class=\"card__footer row row--between\">\n              <button type=\"button\" class=\"btn btn--secondary\" (click)=\"back()\">Retour</button>\n              <button type=\"button\" class=\"btn btn--primary\"\n                      [disabled]=\"guardian.invalid\" (click)=\"next()\">Continuer</button>\n            </footer>\n          </section>\n        }\n\n        <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500 R\u00C9INSCRIPTION : recherche \u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n        @if (currentMode === 'RETURNING' && step() === 1) {\n          <section class=\"card\">\n            <header class=\"card__header\"><h2 class=\"card__title\">Retrouver l'\u00E9l\u00E8ve</h2></header>\n            <div class=\"card__body\">\n              <div class=\"field\">\n                <label class=\"field__label\" for=\"search\">Nom, pr\u00E9nom ou matricule</label>\n                <input id=\"search\" class=\"input\" type=\"search\" placeholder=\"Au moins 2 caract\u00E8res\"\n                       (input)=\"searchStudents($any($event.target).value)\" />\n              </div>\n              <ul class=\"picker\">\n                @for (candidate of candidates(); track candidate.id) {\n                  <li>\n                    <button type=\"button\" class=\"picker__row\" (click)=\"chooseStudent(candidate)\">\n                      <eduops-avatar [name]=\"candidate.fullName\" size=\"sm\" />\n                      <span class=\"picker__body\">\n                        <span class=\"picker__title\">{{ candidate.fullName }}</span>\n                        <span class=\"picker__meta numeric\">\n                          {{ candidate.studentNumber }} \u2014 {{ candidate.classroomName ?? 'Sans classe' }}\n                        </span>\n                      </span>\n                      <eduops-status-badge [status]=\"candidate.status\" />\n                    </button>\n                  </li>\n                } @empty {\n                  <li class=\"picker__empty\">\n                    Saisissez un nom ou un matricule pour retrouver un \u00E9l\u00E8ve d\u00E9j\u00E0 enregistr\u00E9.\n                  </li>\n                }\n              </ul>\n            </div>\n          </section>\n        }\n\n        <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500 Choix de la classe (nouveau + r\u00E9inscription) \u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n        @if ((currentMode === 'NEW' && step() === 3)\n          || (currentMode === 'RETURNING' && step() === 2)) {\n          <section class=\"card\">\n            <header class=\"card__header\">\n              <h2 class=\"card__title\">Affecter \u00E0 une classe</h2>\n            </header>\n            <div class=\"card__body\">\n              <ul class=\"classes\">\n                @for (classroom of availableClasses(); track classroom.id) {\n                  <li>\n                    <button type=\"button\" class=\"class-row\"\n                            [class.class-row--on]=\"selectedClassroom()?.id === classroom.id\"\n                            [disabled]=\"checking()\"\n                            (click)=\"chooseClassroom(classroom)\">\n                      <span class=\"class-row__body\">\n                        <span class=\"class-row__name\">{{ classroom.name }}</span>\n                        <span class=\"class-row__meta numeric\">\n                          {{ classroom.activeEnrollments }}/{{ classroom.capacityMaximum }} \u2014\n                          {{ classroom.availableSeats }} place(s) restante(s)\n                        </span>\n                      </span>\n                      <span class=\"gauge-mini\" aria-hidden=\"true\">\n                        <span class=\"gauge-mini__fill\"\n                              [style.width.%]=\"classroom.occupancyRate > 100 ? 100 : classroom.occupancyRate\"\n                              [class]=\"'gauge-mini__fill--' + classroom.capacityStatus\"></span>\n                      </span>\n                      <eduops-status-badge [status]=\"classroom.capacityStatus\" />\n                    </button>\n                  </li>\n                } @empty {\n                  <li class=\"picker__empty\">\n                    Aucune classe active. <a routerLink=\"/classes\">Cr\u00E9ez-en une</a> avant d'inscrire.\n                  </li>\n                }\n              </ul>\n            </div>\n            <footer class=\"card__footer row row--between\">\n              <button type=\"button\" class=\"btn btn--secondary\" (click)=\"back()\">Retour</button>\n              <button type=\"button\" class=\"btn btn--primary\"\n                      [disabled]=\"!selectedClassroom()\" (click)=\"next()\">Continuer</button>\n            </footer>\n          </section>\n        }\n\n        <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500 Confirmation \u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n        @if ((currentMode === 'NEW' && step() === 4)\n          || (currentMode === 'RETURNING' && step() === 3)) {\n          <section class=\"card\">\n            <header class=\"card__header\">\n              <h2 class=\"card__title\">Contr\u00F4les serveur et validation</h2>\n            </header>\n            <div class=\"card__body\">\n              @if (checkResult(); as result) {\n                <div class=\"capacity\">\n                  <p class=\"capacity__line numeric\">\n                    Capacit\u00E9 : <strong>{{ result.occupiedSeats }}/{{ result.capacityMaximum }}</strong>\n                    \u2014 disponibles : <strong>{{ result.availableSeats }}</strong>\n                    \u2014 projet\u00E9es : <strong>{{ result.projectedAvailableSeats }}</strong>\n                  </p>\n                </div>\n\n                @if (result.allowed) {\n                  <p class=\"verdict verdict--ok\" role=\"status\">\n                    Tous les contr\u00F4les sont pass\u00E9s. L'inscription peut \u00EAtre valid\u00E9e.\n                  </p>\n                } @else {\n                  <div class=\"verdict verdict--ko\" role=\"alert\">\n                    <p class=\"verdict__title\">Le serveur refuse cette inscription :</p>\n                    <ul>\n                      @for (blocker of result.blockers; track blocker) {\n                        <li>{{ blockerMessage(blocker) }}</li>\n                      }\n                    </ul>\n                  </div>\n                }\n\n                @for (warning of result.warnings; track warning) {\n                  <p class=\"verdict verdict--warn\">Attention : la classe est presque pleine.</p>\n                }\n\n                @if (!result.allowed && canOverride()) {\n                  <div class=\"override\">\n                    <label class=\"switch\">\n                      <input type=\"checkbox\" [(ngModel)]=\"overrideRequested\" name=\"override\" />\n                      <span>Demander une d\u00E9rogation de capacit\u00E9</span>\n                    </label>\n                    @if (overrideRequested) {\n                      <div class=\"field\">\n                        <label class=\"field__label field__label--required\" for=\"reason\">\n                          Justification\n                        </label>\n                        <textarea id=\"reason\" class=\"textarea\" rows=\"3\"\n                                  [(ngModel)]=\"overrideReason\" name=\"reason\"\n                                  placeholder=\"Motif d\u00E9taill\u00E9 (10 caract\u00E8res minimum)\"></textarea>\n                        <span class=\"field__hint\">\n                          Exige la permission correspondante et sera conserv\u00E9e au journal d'audit.\n                        </span>\n                      </div>\n                    }\n                  </div>\n                }\n              }\n            </div>\n            <footer class=\"card__footer row row--between\">\n              <button type=\"button\" class=\"btn btn--secondary\" (click)=\"back()\">Retour</button>\n              <button type=\"button\" class=\"btn btn--primary btn--lg\"\n                      [disabled]=\"!canSubmit() || submitting()\" (click)=\"submit()\">\n                {{ submitting() ? 'Enregistrement...' : \"Valider l'inscription\" }}\n              </button>\n            </footer>\n          </section>\n        }\n\n        <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500 IMPORT : mod\u00E8le \u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n        @if (currentMode === 'IMPORT' && step() === 1) {\n          <section class=\"card\">\n            <header class=\"card__header\">\n              <h2 class=\"card__title\">T\u00E9l\u00E9charger le mod\u00E8le</h2>\n            </header>\n            <div class=\"card__body\">\n              <p class=\"hint-block\">\n                Le mod\u00E8le est g\u00E9n\u00E9r\u00E9 pour votre \u00E9tablissement : vos classes r\u00E9elles y sont\n                propos\u00E9es en liste d\u00E9roulante, ce qui \u00E9vite les fautes de frappe.\n              </p>\n\n              <div class=\"columns-preview\">\n                <p class=\"columns-preview__title\">Colonnes attendues</p>\n                <div class=\"columns-preview__chips\">\n                  @for (col of ['Nom','Pr\u00E9noms','Sexe','Date de naissance','Lieu de naissance',\n                                'Nationalit\u00E9','Classe','Nom du responsable',\n                                'T\u00E9l\u00E9phone du responsable','Email du responsable',\n                                'Lien de parent\u00E9','\u00C9cole pr\u00E9c\u00E9dente']; track col) {\n                    <span class=\"col-chip\">{{ col }}</span>\n                  }\n                </div>\n                <p class=\"columns-preview__note\">\n                  Ne saisissez pas le matricule : il est attribu\u00E9 automatiquement.\n                </p>\n              </div>\n            </div>\n            <footer class=\"card__footer row row--between\">\n              <button type=\"button\" class=\"btn btn--ghost\" (click)=\"next()\">\n                J'ai d\u00E9j\u00E0 le mod\u00E8le\n              </button>\n              <button type=\"button\" class=\"btn btn--primary\" (click)=\"downloadTemplate()\">\n                T\u00E9l\u00E9charger le mod\u00E8le Excel\n              </button>\n            </footer>\n          </section>\n        }\n\n        <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500 IMPORT : d\u00E9p\u00F4t \u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n        @if (currentMode === 'IMPORT' && step() === 2) {\n          <section class=\"card\">\n            <header class=\"card__header\"><h2 class=\"card__title\">D\u00E9poser le fichier rempli</h2></header>\n            <div class=\"card__body\">\n              <div class=\"dropzone\" [class.dropzone--over]=\"dragging()\"\n                   (dragover)=\"onDragOver($event)\" (dragleave)=\"onDragLeave()\"\n                   (drop)=\"onDrop($event)\">\n                @if (analysing()) {\n                  <div class=\"spinner\" aria-hidden=\"true\"></div>\n                  <p class=\"dropzone__title\">Analyse du fichier...</p>\n                  <p class=\"dropzone__text\">Aucune donn\u00E9e n'est enregistr\u00E9e \u00E0 ce stade.</p>\n                } @else {\n                  <span class=\"dropzone__icon\" aria-hidden=\"true\">\u21EA</span>\n                  <p class=\"dropzone__title\">Glissez votre fichier ici</p>\n                  <p class=\"dropzone__text\">Formats accept\u00E9s : .xlsx, .xls, .csv</p>\n                  <label class=\"btn btn--primary dropzone__button\">\n                    Choisir un fichier\n                    <input type=\"file\" accept=\".xlsx,.xls,.csv\" hidden\n                           (change)=\"onFileSelected($event)\" />\n                  </label>\n                }\n              </div>\n            </div>\n            <footer class=\"card__footer row row--between\">\n              <button type=\"button\" class=\"btn btn--secondary\" (click)=\"back()\">Retour</button>\n              <span class=\"footer-note\">Le fichier est analys\u00E9 avant tout enregistrement.</span>\n            </footer>\n          </section>\n        }\n\n        <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500 IMPORT : v\u00E9rification \u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n        @if (currentMode === 'IMPORT' && step() === 3) {\n          @if (preview(); as result) {\n            <section class=\"card\">\n              <header class=\"card__header\">\n                <div>\n                  <h2 class=\"card__title\">V\u00E9rification avant import</h2>\n                  <p class=\"card__subtitle\">{{ result.fileName }}</p>\n                </div>\n              </header>\n\n              <div class=\"tally\">\n                <div class=\"tally__item tally__item--ok\">\n                  <span class=\"tally__value numeric\">{{ result.validRows }}</span>\n                  <span class=\"tally__label\">pr\u00EAtes</span>\n                </div>\n                <div class=\"tally__item tally__item--warn\">\n                  <span class=\"tally__value numeric\">{{ result.warningRows }}</span>\n                  <span class=\"tally__label\">\u00E0 v\u00E9rifier</span>\n                </div>\n                <div class=\"tally__item tally__item--dup\">\n                  <span class=\"tally__value numeric\">{{ result.duplicateRows }}</span>\n                  <span class=\"tally__label\">doublons</span>\n                </div>\n                <div class=\"tally__item tally__item--err\">\n                  <span class=\"tally__value numeric\">{{ result.invalidRows }}</span>\n                  <span class=\"tally__label\">erreurs</span>\n                </div>\n              </div>\n\n              <div class=\"table-toolbar\">\n                <span class=\"table-toolbar__count numeric\">\n                  {{ result.rows.length }} ligne(s)\n                  @if (previewTotalPages() > 1) {\n                    \u2014 page {{ previewPage() + 1 }} / {{ previewTotalPages() }}\n                  }\n                </span>\n                <label class=\"pager__size\">\n                  Lignes par page\n                  <select [value]=\"previewPageSize()\" (change)=\"changePreviewPageSize($event)\">\n                    @for (size of pageSizeOptions; track size) {\n                      <option [value]=\"size\">{{ size }}</option>\n                    }\n                  </select>\n                </label>\n              </div>\n\n              <div class=\"table-wrapper\">\n                <table class=\"table\">\n                  <caption class=\"visually-hidden\">Lignes du fichier</caption>\n                  <thead>\n                    <tr>\n                      <th class=\"numeric\">Ligne</th>\n                      @for (col of previewColumns(); track col) { <th>{{ col }}</th> }\n                      <th>\u00C9tat</th>\n                      <th>D\u00E9tail</th>\n                    </tr>\n                  </thead>\n                  <tbody>\n                    @for (row of pagedPreviewRows(); track row.rowNumber) {\n                      <tr [class]=\"'row--' + row.status.toLowerCase()\">\n                        <td class=\"numeric\">{{ row.rowNumber }}</td>\n                        @for (col of previewColumns(); track col) {\n                          <td>{{ row.values[col] || '\u2014' }}</td>\n                        }\n                        <td>\n                          <span class=\"badge\" [class]=\"'badge--' + rowTone(row.status)\">\n                            {{ rowLabel(row.status) }}\n                          </span>\n                        </td>\n                        <td class=\"cell-detail\">\n                          @for (e of row.errors; track e) { <span class=\"msg msg--err\">{{ e }}</span> }\n                          @for (w of row.warnings; track w) { <span class=\"msg msg--warn\">{{ w }}</span> }\n                          @if (row.previewStudentNumber) {\n                            <span class=\"msg msg--ok numeric\">{{ row.previewStudentNumber }}</span>\n                          }\n                        </td>\n                      </tr>\n                    }\n                  </tbody>\n                </table>\n              </div>\n\n              @if (result.rows.length > pageSizeOptions[0]) {\n                <nav class=\"pager\" aria-label=\"Pagination de l'aper\u00E7u\">\n                  @if (previewTotalPages() > 1) {\n                    <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                            [disabled]=\"previewPage() === 0\" (click)=\"previewPrevPage()\">\n                      Pr\u00E9c\u00E9dent\n                    </button>\n                    <span class=\"pager__state numeric\">\n                      Lignes {{ previewFirstRow() }}\u2013{{ previewLastRow() }}\n                      sur {{ result.rows.length }}\n                      \u2014 page {{ previewPage() + 1 }} / {{ previewTotalPages() }}\n                    </span>\n                    <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                            [disabled]=\"previewPage() >= previewTotalPages() - 1\" (click)=\"previewNextPage()\">\n                      Suivant\n                    </button>\n                  } @else {\n                    <span class=\"pager__state numeric\">\n                      {{ result.rows.length }} ligne(s) affich\u00E9e(s)\n                    </span>\n                  }\n                </nav>\n              }\n\n              <footer class=\"card__footer row row--between\">\n                <button type=\"button\" class=\"btn btn--secondary\" (click)=\"back()\">\n                  D\u00E9poser un autre fichier\n                </button>\n                <button type=\"button\" class=\"btn btn--primary btn--lg\"\n                        [disabled]=\"!result.importable || submitting()\"\n                        (click)=\"confirmImport()\">\n                  {{ submitting()\n                     ? 'Import en cours...'\n                     : 'Importer ' + (result.validRows + result.warningRows) + ' \u00E9l\u00E8ve(s)' }}\n                </button>\n              </footer>\n            </section>\n          }\n        }\n\n        <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500 IMPORT : rapport \u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n        @if (currentMode === 'IMPORT' && step() === 4) {\n          @if (importReport(); as report) {\n            <section class=\"card\">\n              <div class=\"card__body done\">\n                <span class=\"done__icon\" aria-hidden=\"true\">\u2713</span>\n                <h2 class=\"done__title\">Import termin\u00E9</h2>\n                <p class=\"done__text numeric\">\n                  {{ report.validRows }} \u00E9l\u00E8ve(s) cr\u00E9\u00E9(s) et inscrit(s).\n                </p>\n                @if (report.invalidRows > 0) {\n                  <p class=\"done__warn numeric\">\n                    {{ report.invalidRows }} ligne(s) refus\u00E9e(s) par une r\u00E8gle m\u00E9tier.\n                  </p>\n                }\n                <div class=\"done__actions\">\n                  <a class=\"btn btn--secondary\" routerLink=\"/students\">Voir les \u00E9l\u00E8ves</a>\n                  <a class=\"btn btn--primary\" routerLink=\"/enrollments\">Voir les inscriptions</a>\n                </div>\n              </div>\n            </section>\n          }\n        }\n      </div>\n\n      <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550 Panneau lat\u00E9ral : la fiche en construction \u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n      @if (mode() !== 'IMPORT') {\n        <aside class=\"layout__side\">\n          <div class=\"draft card\">\n            <header class=\"draft__head\">\n              <eduops-avatar [name]=\"draftName() || '?'\" size=\"lg\" />\n              <div>\n                <p class=\"draft__name\">{{ draftName() || 'Nouvel \u00E9l\u00E8ve' }}</p>\n                <p class=\"draft__meta\">\n                  {{ selectedStudent()?.studentNumber ?? 'Matricule attribu\u00E9 \u00E0 la validation' }}\n                </p>\n              </div>\n            </header>\n\n            <dl class=\"draft__list\">\n              <div>\n                <dt>Classe</dt>\n                <dd>{{ selectedClassroom()?.name ?? '\u2014' }}</dd>\n              </div>\n              <div>\n                <dt>Niveau</dt>\n                <dd>{{ selectedClassroom()?.levelName ?? '\u2014' }}</dd>\n              </div>\n              @if (mode() === 'NEW') {\n                <div>\n                  <dt>Responsable</dt>\n                  <dd>\n                    {{ guardian.controls.firstName.value }}\n                    {{ guardian.controls.lastName.value }}\n                  </dd>\n                </div>\n              }\n              <div>\n                <dt>Type</dt>\n                <dd>{{ mode() === 'RETURNING' ? 'R\u00E9inscription' : 'Nouvelle inscription' }}</dd>\n              </div>\n            </dl>\n\n            <p class=\"draft__note\">\n              Les frais de scolarit\u00E9 du niveau choisi seront g\u00E9n\u00E9r\u00E9s automatiquement\n              \u00E0 la validation, avec leur \u00E9ch\u00E9ancier.\n            </p>\n          </div>\n        </aside>\n      }\n    </div>\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 choix du mode \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.modes {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: var(--space-4);\n  margin-top: var(--space-4);\n}\n\n.mode {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: var(--space-2);\n  padding: var(--space-5);\n  text-align: left;\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n  cursor: pointer;\n  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease;\n\n  &:hover,\n  &:focus-visible {\n    transform: translateY(-3px);\n    border-color: var(--brand);\n    box-shadow: var(--shadow-md);\n  }\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    width: 46px;\n    height: 46px;\n    border-radius: var(--radius-button);\n    background: var(--brand-tint);\n    color: var(--brand);\n\n    svg { width: 24px; height: 24px; }\n  }\n\n  &__title {\n    font-size: 1.05rem;\n    font-weight: 600;\n    color: var(--text-strong);\n  }\n\n  &__text {\n    font-size: .875rem;\n    line-height: 1.5;\n    color: var(--text-muted);\n  }\n\n  &__hint {\n    margin-top: auto;\n    padding-top: var(--space-2);\n    font-size: .78rem;\n    font-weight: 500;\n    color: var(--brand);\n  }\n\n  &--returning &__icon { background: var(--info-bg); color: var(--info); }\n  &--returning &__hint { color: var(--info); }\n  &--import &__icon { background: var(--success-bg); color: var(--success); }\n  &--import &__hint { color: var(--success); }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 \u00E9tapes \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.steps {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--space-2);\n  margin: 0 0 var(--space-4);\n  padding: 0;\n  list-style: none;\n\n  &__item {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    padding: var(--space-2) var(--space-3);\n    font-size: .85rem;\n    color: var(--text-muted);\n    background: var(--surface-sunken);\n    border: 1px solid var(--border);\n    border-radius: var(--radius-pill);\n\n    &--active {\n      color: var(--brand);\n      border-color: var(--brand);\n      background: var(--brand-tint);\n    }\n\n    &--current {\n      font-weight: 600;\n      box-shadow: 0 0 0 3px var(--brand-tint);\n    }\n  }\n\n  &__index {\n    display: grid;\n    place-items: center;\n    width: 20px;\n    height: 20px;\n    font-size: .72rem;\n    font-weight: 700;\n    border-radius: 50%;\n    background: var(--surface-card);\n    border: 1px solid currentColor;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 disposition \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 300px;\n  gap: var(--space-4);\n  align-items: start;\n\n  &--wide { grid-template-columns: minmax(0, 1fr); }\n\n  @media (max-width: 1080px) {\n    grid-template-columns: minmax(0, 1fr);\n  }\n}\n\n.grid2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block {\n  margin: 0 0 var(--space-3);\n  padding: var(--space-3);\n  font-size: .875rem;\n  line-height: 1.5;\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.footer-note {\n  font-size: .8rem;\n  color: var(--text-light);\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 s\u00E9lecteurs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.picker {\n  margin: var(--space-3) 0 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n\n  &__row {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    width: 100%;\n    padding: var(--space-2) var(--space-3);\n    text-align: left;\n    background: transparent;\n    border: 1px solid transparent;\n    border-radius: var(--radius-button);\n    cursor: pointer;\n\n    &:hover { background: var(--surface-sunken); border-color: var(--border); }\n  }\n\n  &__body { display: flex; flex-direction: column; flex: 1; min-width: 0; }\n  &__title { font-weight: 600; color: var(--text-strong); }\n  &__meta { font-size: .8rem; color: var(--text-muted); }\n\n  &__empty {\n    padding: var(--space-5);\n    text-align: center;\n    font-size: .875rem;\n    color: var(--text-light);\n  }\n}\n\n.classes {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n\n.class-row {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 90px auto;\n  align-items: center;\n  gap: var(--space-3);\n  width: 100%;\n  padding: var(--space-3);\n  text-align: left;\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-button);\n  cursor: pointer;\n\n  &:hover:not(:disabled) { border-color: var(--brand); }\n  &:disabled { opacity: .55; cursor: progress; }\n\n  &--on {\n    border-color: var(--brand);\n    background: var(--brand-tint);\n    box-shadow: 0 0 0 2px var(--brand-tint);\n  }\n\n  &__body { display: flex; flex-direction: column; min-width: 0; }\n  &__name { font-weight: 600; color: var(--text-strong); }\n  &__meta { font-size: .8rem; color: var(--text-muted); }\n\n  @media (max-width: 620px) {\n    grid-template-columns: minmax(0, 1fr) auto;\n    .gauge-mini { display: none; }\n  }\n}\n\n.gauge-mini {\n  display: block;\n  height: 6px;\n  border-radius: var(--radius-pill);\n  background: var(--surface-sunken);\n  overflow: hidden;\n\n  &__fill {\n    display: block;\n    height: 100%;\n    background: var(--success);\n    transition: width .2s ease;\n\n    &--WARNING { background: var(--warning); }\n    &--FULL,\n    &--OVER_CAPACITY { background: var(--danger); }\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 confirmation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.capacity {\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__line { margin: 0; font-size: .9rem; color: var(--text-normal); }\n}\n\n.verdict {\n  margin: var(--space-3) 0 0;\n  padding: var(--space-3);\n  font-size: .9rem;\n  line-height: 1.5;\n  border-radius: var(--radius-button);\n  border-left: 3px solid transparent;\n\n  ul { margin: var(--space-2) 0 0; padding-left: var(--space-4); }\n\n  &__title { margin: 0; font-weight: 600; }\n\n  &--ok { color: var(--success); background: var(--success-bg); border-left-color: var(--success); }\n  &--warn { color: var(--warning); background: var(--warning-bg); border-left-color: var(--warning); }\n  &--ko { color: var(--danger); background: var(--danger-bg); border-left-color: var(--danger); }\n}\n\n.override {\n  margin-top: var(--space-4);\n  padding: var(--space-3);\n  border: 1px dashed var(--warning);\n  border-radius: var(--radius-button);\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 import \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.columns-preview {\n  padding: var(--space-3);\n  background: var(--surface-sunken);\n  border-radius: var(--radius-button);\n\n  &__title { margin: 0 0 var(--space-2); font-weight: 600; font-size: .9rem; }\n  &__chips { display: flex; flex-wrap: wrap; gap: var(--space-1); }\n  &__note { margin: var(--space-3) 0 0; font-size: .8rem; color: var(--text-light); }\n}\n\n.col-chip {\n  padding: 2px var(--space-2);\n  font-size: .78rem;\n  color: var(--text-muted);\n  background: var(--surface-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius-pill);\n}\n\n.dropzone {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--space-2);\n  min-height: 240px;\n  padding: var(--space-6);\n  text-align: center;\n  border: 2px dashed var(--border-strong);\n  border-radius: var(--radius-card);\n  background: var(--surface-sunken);\n  transition: border-color .15s ease, background .15s ease;\n\n  &--over {\n    border-color: var(--brand);\n    background: var(--brand-tint);\n  }\n\n  &__icon { font-size: 2.2rem; color: var(--brand); line-height: 1; }\n  &__title { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__text { margin: 0; font-size: .85rem; color: var(--text-muted); }\n  &__button { margin-top: var(--space-2); cursor: pointer; }\n}\n\n.spinner {\n  width: 30px;\n  height: 30px;\n  border: 3px solid var(--border);\n  border-top-color: var(--brand);\n  border-radius: 50%;\n  animation: spin .8s linear infinite;\n}\n\n@keyframes spin { to { transform: rotate(360deg); } }\n\n.tally {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: var(--space-2);\n  padding: var(--space-3) var(--space-4);\n  border-bottom: 1px solid var(--border);\n\n  &__item {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    padding: var(--space-3);\n    border-radius: var(--radius-button);\n    background: var(--surface-sunken);\n  }\n\n  &__value { font-size: 1.5rem; font-weight: 700; line-height: 1; }\n  &__label { font-size: .78rem; color: var(--text-muted); }\n\n  &__item--ok { background: var(--success-bg); .tally__value { color: var(--success); } }\n  &__item--warn { background: var(--warning-bg); .tally__value { color: var(--warning); } }\n  &__item--dup { .tally__value { color: var(--text-muted); } }\n  &__item--err { background: var(--danger-bg); .tally__value { color: var(--danger); } }\n}\n\n.table-wrapper { overflow-x: auto; }\n\n.table-toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  flex-wrap: wrap;\n  padding: var(--space-2) var(--space-4);\n\n  &__count { font-size: .82rem; color: var(--text-muted); }\n}\n\n.pager {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  flex-wrap: wrap;\n  padding: var(--space-3) var(--space-4);\n  border-top: 1px solid var(--border);\n\n  &__state { font-size: .82rem; color: var(--text-muted); }\n\n  &__size {\n    display: inline-flex;\n    align-items: center;\n    gap: var(--space-2);\n    font-size: .82rem;\n    color: var(--text-muted);\n\n    select {\n      padding: .3rem .5rem;\n      font-size: .85rem;\n      color: var(--text-strong);\n      background: var(--surface-card);\n      border: 1px solid var(--border);\n      border-radius: var(--radius-button);\n      cursor: pointer;\n    }\n  }\n}\n\n.row--invalid > td { background: var(--danger-bg); }\n.row--duplicate > td { background: var(--surface-sunken); }\n.row--warning > td { background: var(--warning-bg); }\n\n.cell-detail {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  max-width: 280px;\n}\n\n.msg {\n  font-size: .78rem;\n  line-height: 1.35;\n\n  &--err { color: var(--danger); }\n  &--warn { color: var(--warning); }\n  &--ok { color: var(--text-light); }\n}\n\n.done {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: var(--space-2);\n  padding: var(--space-8) var(--space-4);\n  text-align: center;\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    width: 56px;\n    height: 56px;\n    font-size: 1.8rem;\n    color: var(--success);\n    background: var(--success-bg);\n    border-radius: 50%;\n  }\n\n  &__title { margin: 0; font-size: 1.25rem; }\n  &__text { margin: 0; color: var(--text-muted); }\n  &__warn { margin: 0; color: var(--warning); font-size: .875rem; }\n  &__actions { display: flex; gap: var(--space-2); margin-top: var(--space-3); }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 panneau lat\u00E9ral \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.draft {\n  position: sticky;\n  top: var(--space-4);\n  padding: var(--space-4);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    padding-bottom: var(--space-3);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__name { margin: 0; font-weight: 600; color: var(--text-strong); }\n  &__meta { margin: 0; font-size: .78rem; color: var(--text-light); }\n\n  &__list {\n    margin: var(--space-3) 0;\n\n    > div {\n      display: flex;\n      justify-content: space-between;\n      gap: var(--space-2);\n      padding: var(--space-2) 0;\n      border-bottom: 1px dashed var(--border);\n    }\n\n    dt { font-size: .8rem; color: var(--text-muted); }\n    dd { margin: 0; font-size: .85rem; font-weight: 500; text-align: right; color: var(--text-strong); }\n  }\n\n  &__note {\n    margin: 0;\n    font-size: .78rem;\n    line-height: 1.5;\n    color: var(--text-light);\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EnrollmentWizardComponent, { className: "EnrollmentWizardComponent", filePath: "frontend/src/app/features/enrollments/enrollment-wizard.component.ts", lineNumber: 30 }); })();
//# sourceMappingURL=enrollment-wizard.component.js.map