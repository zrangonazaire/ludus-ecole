import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { DisciplineService } from '@core/services/discipline.service';
import { STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.key;
const _forTrack1 = ($index, $item) => $item.id;
function DisciplineComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function DisciplineComponent_Conditional_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreate()); });
    i0.ɵɵtext(1, "+ Signaler un incident");
    i0.ɵɵelementEnd();
} }
function DisciplineComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 4);
    i0.ɵɵtext(1, "Chargement du registre\u2026");
    i0.ɵɵelementEnd();
} }
function DisciplineComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "h2");
    i0.ɵɵtext(2, "Le registre est indisponible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Les incidents n\u2019ont pas pu \u00EAtre charg\u00E9s.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 7);
    i0.ɵɵlistener("click", function DisciplineComponent_Conditional_10_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵtext(6, "R\u00E9essayer");
    i0.ɵɵelementEnd()();
} }
function DisciplineComponent_Conditional_11_For_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", s_r5.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r5.value);
} }
function DisciplineComponent_Conditional_11_For_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", s_r6.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r6.value);
} }
function DisciplineComponent_Conditional_11_For_71_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementStart(8, "small", 20);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td")(14, "span", 21);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "td")(17, "span", 21);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "td");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td")(22, "button", 11);
    i0.ɵɵlistener("click", function DisciplineComponent_Conditional_11_For_71_Template_button_click_22_listener() { const i_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.inspect(i_r8)); });
    i0.ɵɵtext(23, "Consulter \u2192");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const i_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i_r8.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i_r8.classroomName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.types[i_r8.incidentType]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i_r8.reference);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 13, i_r8.incidentDate, "dd/MM/yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("urgent", i_r8.severity === "HIGH" || i_r8.severity === "CRITICAL");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.severities[i_r8.severity]);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("done", ctx_r1.closed(i_r8));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.statuses[i_r8.status]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i_r8.guardianInformed ? "Inform\u00E9e" : "\u00C0 informer");
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", "Consulter l\u2019incident de " + i_r8.studentName);
} }
function DisciplineComponent_Conditional_11_Conditional_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "h3");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.items().length ? "Aucun r\u00E9sultat" : "Aucun incident enregistr\u00E9");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.items().length ? "Modifiez les filtres pour retrouver un dossier." : "Les incidents signal\u00E9s et leur suivi appara\u00EEtront ici.");
} }
function DisciplineComponent_Conditional_11_Conditional_73_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "footer")(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "button", 22);
    i0.ɵɵlistener("click", function DisciplineComponent_Conditional_11_Conditional_73_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.page.set(ctx_r1.page() - 1)); });
    i0.ɵɵtext(5, "Pr\u00E9c\u00E9dent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 22);
    i0.ɵɵlistener("click", function DisciplineComponent_Conditional_11_Conditional_73_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.page.set(ctx_r1.page() + 1)); });
    i0.ɵɵtext(7, "Suivant");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Page ", ctx_r1.page(), " sur ", ctx_r1.pages(), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.page() === 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.page() === ctx_r1.pages());
} }
function DisciplineComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "article")(2, "span");
    i0.ɵɵtext(3, "Incidents enregistr\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "article")(7, "span");
    i0.ɵɵtext(8, "Dossiers ouverts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "article")(12, "span");
    i0.ɵɵtext(13, "Priorit\u00E9 \u00E9lev\u00E9e ou critique");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "article")(17, "span");
    i0.ɵɵtext(18, "Familles \u00E0 informer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "strong");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "section", 9)(22, "div", 10)(23, "div")(24, "h2");
    i0.ɵɵtext(25, "Registre des incidents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "p");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "button", 11);
    i0.ɵɵlistener("click", function DisciplineComponent_Conditional_11_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵtext(29, "Actualiser");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 12)(31, "label");
    i0.ɵɵtext(32, "Rechercher");
    i0.ɵɵelementStart(33, "input", 13);
    i0.ɵɵlistener("ngModelChange", function DisciplineComponent_Conditional_11_Template_input_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.search.set($event); return i0.ɵɵresetView(ctx_r1.page.set(1)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "label");
    i0.ɵɵtext(35, "Statut");
    i0.ɵɵelementStart(36, "select", 14);
    i0.ɵɵlistener("ngModelChange", function DisciplineComponent_Conditional_11_Template_select_ngModelChange_36_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.statusFilter.set($event); return i0.ɵɵresetView(ctx_r1.page.set(1)); });
    i0.ɵɵelementStart(37, "option", 15);
    i0.ɵɵtext(38, "Tous les statuts");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(39, DisciplineComponent_Conditional_11_For_40_Template, 2, 2, "option", 16, _forTrack0);
    i0.ɵɵpipe(41, "keyvalue");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(42, "label");
    i0.ɵɵtext(43, "Gravit\u00E9");
    i0.ɵɵelementStart(44, "select", 14);
    i0.ɵɵlistener("ngModelChange", function DisciplineComponent_Conditional_11_Template_select_ngModelChange_44_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.severityFilter.set($event); return i0.ɵɵresetView(ctx_r1.page.set(1)); });
    i0.ɵɵelementStart(45, "option", 15);
    i0.ɵɵtext(46, "Toutes les gravit\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(47, DisciplineComponent_Conditional_11_For_48_Template, 2, 2, "option", 16, _forTrack0);
    i0.ɵɵpipe(49, "keyvalue");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(50, "div", 17)(51, "table")(52, "thead")(53, "tr")(54, "th");
    i0.ɵɵtext(55, "\u00C9l\u00E8ve / classe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "th");
    i0.ɵɵtext(57, "Incident");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "th");
    i0.ɵɵtext(59, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "th");
    i0.ɵɵtext(61, "Gravit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "th");
    i0.ɵɵtext(63, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "th");
    i0.ɵɵtext(65, "Famille");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "th")(67, "span", 18);
    i0.ɵɵtext(68, "Actions");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(69, "tbody");
    i0.ɵɵrepeaterCreate(70, DisciplineComponent_Conditional_11_For_71_Template, 24, 16, "tr", null, _forTrack1);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(72, DisciplineComponent_Conditional_11_Conditional_72_Template, 5, 2, "div", 19)(73, DisciplineComponent_Conditional_11_Conditional_73_Template, 8, 4, "footer");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.items().length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.openCount());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.urgentCount());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.familyCount());
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", ctx_r1.filtered().length, " r\u00E9sultat(s)");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r1.search());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r1.statusFilter());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(i0.ɵɵpipeBind1(41, 10, ctx_r1.statuses));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r1.severityFilter());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(i0.ɵɵpipeBind1(49, 12, ctx_r1.severities));
    i0.ɵɵadvance(23);
    i0.ɵɵrepeater(ctx_r1.visible());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r1.filtered().length ? 72 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.filtered().length ? 73 : -1);
} }
function DisciplineComponent_Conditional_12_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r11 = ctx.$implicit;
    i0.ɵɵproperty("value", s_r11.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", s_r11.fullName, " \u2014 ", s_r11.classroomName || s_r11.studentNumber, "");
} }
function DisciplineComponent_Conditional_12_For_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const t_r12 = ctx.$implicit;
    i0.ɵɵproperty("value", t_r12.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(t_r12.value);
} }
function DisciplineComponent_Conditional_12_For_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r13 = ctx.$implicit;
    i0.ɵɵproperty("value", s_r13.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r13.value);
} }
function DisciplineComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "section", 23);
    i0.ɵɵlistener("keydown.escape", function DisciplineComponent_Conditional_12_Template_section_keydown_escape_1_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(!ctx_r1.saving() && ctx_r1.creating.set(false)); });
    i0.ɵɵelementStart(2, "header")(3, "h2", 24);
    i0.ɵɵtext(4, "Signaler un incident");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 25);
    i0.ɵɵlistener("click", function DisciplineComponent_Conditional_12_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.creating.set(false)); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 26, 0);
    i0.ɵɵlistener("ngSubmit", function DisciplineComponent_Conditional_12_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.create()); });
    i0.ɵɵelementStart(9, "fieldset", 27)(10, "label");
    i0.ɵɵtext(11, "Rechercher un \u00E9l\u00E8ve");
    i0.ɵɵelementStart(12, "div", 28)(13, "input", 29);
    i0.ɵɵtwoWayListener("ngModelChange", function DisciplineComponent_Conditional_12_Template_input_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.studentSearch, $event) || (ctx_r1.studentSearch = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 30);
    i0.ɵɵlistener("click", function DisciplineComponent_Conditional_12_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.searchStudents()); });
    i0.ɵɵtext(15, "Rechercher");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "label");
    i0.ɵɵtext(17, "\u00C9l\u00E8ve *");
    i0.ɵɵelementStart(18, "select", 31);
    i0.ɵɵtwoWayListener("ngModelChange", function DisciplineComponent_Conditional_12_Template_select_ngModelChange_18_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.draft.studentId, $event) || (ctx_r1.draft.studentId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(19, "option", 15);
    i0.ɵɵtext(20, "S\u00E9lectionner un \u00E9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(21, DisciplineComponent_Conditional_12_For_22_Template, 2, 3, "option", 16, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 32)(24, "label");
    i0.ɵɵtext(25, "Date *");
    i0.ɵɵelementStart(26, "input", 33);
    i0.ɵɵtwoWayListener("ngModelChange", function DisciplineComponent_Conditional_12_Template_input_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.draft.incidentDate, $event) || (ctx_r1.draft.incidentDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "label");
    i0.ɵɵtext(28, "Lieu");
    i0.ɵɵelementStart(29, "input", 34);
    i0.ɵɵtwoWayListener("ngModelChange", function DisciplineComponent_Conditional_12_Template_input_ngModelChange_29_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.draft.location, $event) || (ctx_r1.draft.location = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "label");
    i0.ɵɵtext(31, "Nature *");
    i0.ɵɵelementStart(32, "select", 35);
    i0.ɵɵtwoWayListener("ngModelChange", function DisciplineComponent_Conditional_12_Template_select_ngModelChange_32_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.draft.incidentType, $event) || (ctx_r1.draft.incidentType = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵrepeaterCreate(33, DisciplineComponent_Conditional_12_For_34_Template, 2, 2, "option", 16, _forTrack0);
    i0.ɵɵpipe(35, "keyvalue");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "label");
    i0.ɵɵtext(37, "Gravit\u00E9 *");
    i0.ɵɵelementStart(38, "select", 36);
    i0.ɵɵtwoWayListener("ngModelChange", function DisciplineComponent_Conditional_12_Template_select_ngModelChange_38_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.draft.severity, $event) || (ctx_r1.draft.severity = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵrepeaterCreate(39, DisciplineComponent_Conditional_12_For_40_Template, 2, 2, "option", 16, _forTrack0);
    i0.ɵɵpipe(41, "keyvalue");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(42, "label");
    i0.ɵɵtext(43, "Description des faits *");
    i0.ɵɵelementStart(44, "textarea", 37);
    i0.ɵɵtwoWayListener("ngModelChange", function DisciplineComponent_Conditional_12_Template_textarea_ngModelChange_44_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.draft.description, $event) || (ctx_r1.draft.description = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "footer")(46, "button", 30);
    i0.ɵɵlistener("click", function DisciplineComponent_Conditional_12_Template_button_click_46_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.creating.set(false)); });
    i0.ɵɵtext(47, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "button", 38);
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const incidentForm_r14 = i0.ɵɵreference(8);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.studentSearch);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.draft.studentId);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.students());
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.draft.incidentDate);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.draft.location);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.draft.incidentType);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpipeBind1(35, 11, ctx_r1.types));
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.draft.severity);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpipeBind1(41, 13, ctx_r1.severities));
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.draft.description);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", incidentForm_r14.invalid || !ctx_r1.draft.description.trim());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.saving() ? "Enregistrement\u2026" : "Enregistrer le signalement");
} }
function DisciplineComponent_Conditional_13_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r16 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Lieu : ", i_r16.location, "");
} }
function DisciplineComponent_Conditional_13_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 42)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 41);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const a_r17 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.actionTypes[a_r17.actionType]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(a_r17.description);
} }
function DisciplineComponent_Conditional_13_ForEmpty_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Aucune mesure enregistr\u00E9e.");
    i0.ɵɵelementEnd();
} }
function DisciplineComponent_Conditional_13_Conditional_21_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r19 = ctx.$implicit;
    i0.ɵɵproperty("value", s_r19.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r19.value);
} }
function DisciplineComponent_Conditional_13_Conditional_21_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const a_r20 = ctx.$implicit;
    i0.ɵɵproperty("value", a_r20.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(a_r20.value);
} }
function DisciplineComponent_Conditional_13_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "fieldset", 27)(1, "h3");
    i0.ɵɵtext(2, "Suivi du dossier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "label");
    i0.ɵɵtext(4, "Statut");
    i0.ɵɵelementStart(5, "select", 14);
    i0.ɵɵtwoWayListener("ngModelChange", function DisciplineComponent_Conditional_13_Conditional_21_Template_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.editStatus, $event) || (ctx_r1.editStatus = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵrepeaterCreate(6, DisciplineComponent_Conditional_13_Conditional_21_For_7_Template, 2, 2, "option", 16, _forTrack0);
    i0.ɵɵpipe(8, "keyvalue");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "label", 43)(10, "input", 44);
    i0.ɵɵtwoWayListener("ngModelChange", function DisciplineComponent_Conditional_13_Conditional_21_Template_input_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.guardianInformed, $event) || (ctx_r1.guardianInformed = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11, " La famille a \u00E9t\u00E9 inform\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p", 45);
    i0.ɵɵtext(13, "Cette mention consigne un contact d\u00E9j\u00E0 effectu\u00E9.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 7);
    i0.ɵɵlistener("click", function DisciplineComponent_Conditional_13_Conditional_21_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.update()); });
    i0.ɵɵtext(15, "Enregistrer le suivi");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "h3");
    i0.ɵɵtext(17, "Ajouter une mesure");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "label");
    i0.ɵɵtext(19, "Type de mesure");
    i0.ɵɵelementStart(20, "select", 14);
    i0.ɵɵtwoWayListener("ngModelChange", function DisciplineComponent_Conditional_13_Conditional_21_Template_select_ngModelChange_20_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.actionType, $event) || (ctx_r1.actionType = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵrepeaterCreate(21, DisciplineComponent_Conditional_13_Conditional_21_For_22_Template, 2, 2, "option", 16, _forTrack0);
    i0.ɵɵpipe(23, "keyvalue");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "label");
    i0.ɵɵtext(25, "D\u00E9cision et modalit\u00E9s");
    i0.ɵɵelementStart(26, "textarea", 46);
    i0.ɵɵtwoWayListener("ngModelChange", function DisciplineComponent_Conditional_13_Conditional_21_Template_textarea_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.actionDescription, $event) || (ctx_r1.actionDescription = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "button", 22);
    i0.ɵɵlistener("click", function DisciplineComponent_Conditional_13_Conditional_21_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.addAction()); });
    i0.ɵɵtext(28, "Enregistrer la mesure");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.editStatus);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpipeBind1(8, 6, ctx_r1.statuses));
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.guardianInformed);
    i0.ɵɵadvance(10);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.actionType);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpipeBind1(23, 8, ctx_r1.actionTypes));
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.actionDescription);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.actionDescription.trim());
} }
function DisciplineComponent_Conditional_13_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r16 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", ctx_r1.statuses[i_r16.status], " \u00B7 Famille ", i_r16.guardianInformed ? "inform\u00E9e" : "non inform\u00E9e", "");
} }
function DisciplineComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "section", 39);
    i0.ɵɵlistener("keydown.escape", function DisciplineComponent_Conditional_13_Template_section_keydown_escape_1_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(!ctx_r1.saving() && ctx_r1.selected.set(null)); });
    i0.ɵɵelementStart(2, "header")(3, "div")(4, "h2", 40);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 25);
    i0.ɵɵlistener("click", function DisciplineComponent_Conditional_13_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selected.set(null)); });
    i0.ɵɵtext(10, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "span", 21);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 41);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, DisciplineComponent_Conditional_13_Conditional_15_Template, 2, 1, "p");
    i0.ɵɵelementStart(16, "h3");
    i0.ɵɵtext(17, "Mesures d\u00E9cid\u00E9es");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(18, DisciplineComponent_Conditional_13_For_19_Template, 5, 2, "article", 42, _forTrack1, false, DisciplineComponent_Conditional_13_ForEmpty_20_Template, 2, 0, "p");
    i0.ɵɵtemplate(21, DisciplineComponent_Conditional_13_Conditional_21_Template, 29, 10, "fieldset", 27)(22, DisciplineComponent_Conditional_13_Conditional_22_Template, 2, 2, "p");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const i_r16 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i_r16.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i_r16.classroomName, " \u00B7 ", i0.ɵɵpipeBind2(8, 10, i_r16.incidentDate, "dd/MM/yyyy"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r1.types[i_r16.incidentType], " \u00B7 ", ctx_r1.severities[i_r16.severity], "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i_r16.description);
    i0.ɵɵadvance();
    i0.ɵɵconditional(i_r16.location ? 15 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(i_r16.actions);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.canManage() && !ctx_r1.closed(i_r16) ? 21 : 22);
} }
export class DisciplineComponent {
    service = inject(DisciplineService);
    studentsSource = inject(STUDENT_DATA_SOURCE);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    destroyRef = inject(DestroyRef);
    canManage = computed(() => this.auth.has('DISCIPLINE_MANAGE'));
    items = signal([]);
    students = signal([]);
    loading = signal(false);
    error = signal(false);
    saving = signal(false);
    creating = signal(false);
    selected = signal(null);
    search = signal('');
    statusFilter = signal('');
    severityFilter = signal('');
    page = signal(1);
    types = { BEHAVIOR: 'Comportement', VIOLENCE: 'Violence', CHEATING: 'Tricherie', ABSENTEEISM: 'Absentéisme', LATENESS: 'Retard', PROPERTY_DAMAGE: 'Dégradation', OTHER: 'Autre' };
    severities = { LOW: 'Faible', MEDIUM: 'Modérée', HIGH: 'Élevée', CRITICAL: 'Critique' };
    statuses = { REPORTED: 'Signalé', UNDER_REVIEW: 'En cours d’examen', ACTION_TAKEN: 'Mesure prise', CLOSED: 'Clôturé', CANCELLED: 'Annulé' };
    actionTypes = { WARNING: 'Avertissement', DETENTION: 'Retenue', PARENT_MEETING: 'Convocation des parents', SUSPENSION: 'Suspension', EXPULSION: 'Exclusion', OTHER: 'Autre mesure' };
    filtered = computed(() => this.items().filter(i => (!this.statusFilter() || i.status === this.statusFilter()) && (!this.severityFilter() || i.severity === this.severityFilter()) &&
        `${i.reference} ${i.studentName} ${i.classroomName} ${i.description}`.toLocaleLowerCase('fr').includes(this.search().toLocaleLowerCase('fr'))));
    pages = computed(() => Math.max(1, Math.ceil(this.filtered().length / 10)));
    visible = computed(() => this.filtered().slice((this.page() - 1) * 10, this.page() * 10));
    openCount = computed(() => this.items().filter(i => !this.closed(i)).length);
    urgentCount = computed(() => this.items().filter(i => !this.closed(i) && ['HIGH', 'CRITICAL'].includes(i.severity)).length);
    familyCount = computed(() => this.items().filter(i => !this.closed(i) && !i.guardianInformed).length);
    draft = this.emptyDraft();
    studentSearch = '';
    editStatus = '';
    guardianInformed = false;
    actionType = 'WARNING';
    actionDescription = '';
    constructor() { this.load(); }
    emptyDraft() {
        const now = new Date();
        const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        return { studentId: '', incidentDate: date, incidentType: 'BEHAVIOR', severity: 'LOW', description: '', location: '' };
    }
    closed(i) { return ['CLOSED', 'CANCELLED'].includes(i.status); }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.service.list().pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false))).subscribe({
            next: items => { this.items.set(items); this.page.set(Math.min(this.page(), this.pages())); }, error: () => this.error.set(true)
        });
    }
    searchStudents() {
        this.studentsSource.search({ search: this.studentSearch, page: 0, size: 50 }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: result => this.students.set(result.content), error: () => this.notifications.error('Impossible de charger les élèves.')
        });
    }
    openCreate() { this.draft = this.emptyDraft(); this.studentSearch = ''; this.students.set([]); this.creating.set(true); this.searchStudents(); }
    inspect(item) { this.selected.set(item); this.editStatus = item.status; this.guardianInformed = item.guardianInformed; this.actionDescription = ''; this.actionType = 'WARNING'; }
    create() {
        const student = this.students().find(s => s.id === this.draft.studentId);
        if (!student || !this.draft.description.trim() || !this.draft.incidentDate)
            return;
        this.mutate(this.service.create(this.draft, student.fullName, student.classroomName ?? ''), 'Incident signalé.');
    }
    update() { const i = this.selected(); if (i)
        this.mutate(this.service.update(i, this.editStatus, this.guardianInformed), 'Suivi enregistré.'); }
    addAction() { const i = this.selected(); if (i && this.actionDescription.trim())
        this.mutate(this.service.action(i, this.actionType, this.actionDescription.trim()), 'Mesure enregistrée.'); }
    mutate(operation, message) {
        if (this.saving())
            return;
        this.saving.set(true);
        operation.pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.saving.set(false))).subscribe({
            next: () => { this.notifications.success(message); this.creating.set(false); this.selected.set(null); this.load(); },
            error: (err) => this.notifications.error(this.explain(err))
        });
    }
    /**
     * Ce que le refus dit vraiment.
     *
     * Deviner d'après le statut HTTP se lisait « Cet incident a changé ou est
     * clôturé » : deux causes dans une phrase, dont une seule est vraie, et
     * l'utilisateur ne sait pas laquelle. Le serveur envoie désormais un code
     * précis, et la table de traduction en fait une phrase qui dit quoi faire.
     *
     * Le repli reste utile : un 500 nu n'a pas de code, et le nommer « erreur
     * interne » vaut mieux que d'inventer une cause métier.
     */
    explain(error) {
        const body = error?.error;
        if (body?.code) {
            return translateErrorCode(body.code, body);
        }
        if (error?.status === 0) {
            return 'Le serveur est injoignable. Vérifiez qu’il est démarré, puis réessayez.';
        }
        return 'Enregistrement impossible. Réessayez.';
    }
    static ɵfac = function DisciplineComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DisciplineComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DisciplineComponent, selectors: [["eduops-discipline"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 14, vars: 4, consts: [["incidentForm", "ngForm"], [1, "page-header"], [1, "eyebrow"], [1, "btn", "btn--primary"], ["role", "status"], ["role", "alert", 1, "card", "empty"], [1, "overlay"], [1, "btn", "btn--primary", 3, "click"], [1, "metrics"], [1, "card"], [1, "register-heading"], [1, "btn", 3, "click"], [1, "filters"], ["type", "search", "placeholder", "\u00C9l\u00E8ve, classe, r\u00E9f\u00E9rence\u2026", 1, "input", 3, "ngModelChange", "ngModel"], [1, "input", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], [1, "table-wrap"], [1, "sr-only"], [1, "empty"], [1, "reference"], [1, "badge"], [1, "btn", 3, "click", "disabled"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "create-title", 1, "panel", 3, "keydown.escape"], ["id", "create-title"], ["aria-label", "Fermer", 1, "btn", 3, "click", "disabled"], [3, "ngSubmit"], [3, "disabled"], [1, "search-row"], ["name", "studentSearch", "placeholder", "Nom ou matricule", 1, "input", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "btn", 3, "click"], ["required", "", "name", "student", 1, "input", 3, "ngModelChange", "ngModel"], [1, "form-grid"], ["type", "date", "required", "", "name", "date", 1, "input", 3, "ngModelChange", "ngModel"], ["name", "location", "maxlength", "150", "placeholder", "Cour, salle de classe\u2026", 1, "input", 3, "ngModelChange", "ngModel"], ["name", "type", 1, "input", 3, "ngModelChange", "ngModel"], ["name", "severity", 1, "input", 3, "ngModelChange", "ngModel"], ["rows", "5", "required", "", "maxlength", "5000", "name", "description", "placeholder", "D\u00E9crivez les faits observ\u00E9s et leur contexte.", 1, "input", 3, "ngModelChange", "ngModel"], [1, "btn", "btn--primary", 3, "disabled"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "detail-title", 1, "panel", 3, "keydown.escape"], ["id", "detail-title"], [1, "description"], [1, "action"], [1, "check"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "hint"], ["rows", "3", "maxlength", "5000", 1, "input", 3, "ngModelChange", "ngModel"]], template: function DisciplineComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div")(2, "span", 2);
            i0.ɵɵtext(3, "VIE SCOLAIRE");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5, "Discipline");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Signaler, comprendre et suivre les incidents des \u00E9l\u00E8ves.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(8, DisciplineComponent_Conditional_8_Template, 2, 0, "button", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, DisciplineComponent_Conditional_9_Template, 2, 0, "p", 4)(10, DisciplineComponent_Conditional_10_Template, 7, 0, "div", 5)(11, DisciplineComponent_Conditional_11_Template, 74, 14)(12, DisciplineComponent_Conditional_12_Template, 50, 15, "div", 6)(13, DisciplineComponent_Conditional_13_Template, 23, 13, "div", 6);
        } if (rf & 2) {
            let tmp_3_0;
            i0.ɵɵadvance(8);
            i0.ɵɵconditional(ctx.canManage() ? 8 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 9 : ctx.error() ? 10 : 11);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.creating() ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_3_0 = ctx.selected()) ? 13 : -1, tmp_3_0);
        } }, dependencies: [CommonModule, i1.DatePipe, i1.KeyValuePipe, FormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.RequiredValidator, i2.MaxLengthValidator, i2.NgModel, i2.NgForm], styles: ["[_nghost-%COMP%] { display: block; }\n.page-header[_ngcontent-%COMP%], .register-heading[_ngcontent-%COMP%], header[_ngcontent-%COMP%], footer[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; gap: 16px; }\n.page-header[_ngcontent-%COMP%] { margin-bottom: 24px; } h1[_ngcontent-%COMP%] { margin: 6px 0; } h2[_ngcontent-%COMP%] { font-size: 18px; margin: 0; } h3[_ngcontent-%COMP%] { font-size: 15px; margin-top: 24px; }\np[_ngcontent-%COMP%], small[_ngcontent-%COMP%] { color: var(--text-muted); } .eyebrow[_ngcontent-%COMP%] { color: var(--brand); font-size: 11px; font-weight: 700; letter-spacing: 2px; }\n.metrics[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }\n.metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], .card[_ngcontent-%COMP%] { background: var(--surface-card); border: 1px solid var(--border); border-radius: 12px; }\n.metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { padding: 20px; } .metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--text-muted); font-size: 13px; } .metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; font-size: 30px; margin-top: 12px; }\n.card[_ngcontent-%COMP%] { overflow: hidden; } .register-heading[_ngcontent-%COMP%], .filters[_ngcontent-%COMP%], footer[_ngcontent-%COMP%] { padding: 18px 22px; } .register-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin-bottom: 0; }\n.filters[_ngcontent-%COMP%] { display: flex; gap: 16px; background: var(--surface-sunken); } label[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 8px; font-size: 13px; font-weight: 600; } .filters[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:first-child { flex: 1; }\n.input[_ngcontent-%COMP%] { width: 100%; min-height: 40px; } .table-wrap[_ngcontent-%COMP%] { overflow-x: auto; } table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; text-align: left; white-space: nowrap; } th[_ngcontent-%COMP%] { color: var(--text-muted); font-size: 12px; background: var(--surface-sunken); } th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] { padding: 16px; border-bottom: 1px solid var(--border); } td[_ngcontent-%COMP%] { font-size: 13px; } small[_ngcontent-%COMP%] { display: block; margin-top: 5px; } .reference[_ngcontent-%COMP%] { max-width: 150px; overflow: hidden; text-overflow: ellipsis; }\n.badge[_ngcontent-%COMP%] { display: inline-block; padding: 5px 9px; border-radius: 6px; background: #eef2ff; color: #46578d; font-size: 12px; }.urgent[_ngcontent-%COMP%] { background: #fff0e8; color: #a43d19; }.done[_ngcontent-%COMP%] { background: #edf6ef; color: #306945; }\n.empty[_ngcontent-%COMP%] { text-align: center; padding: 48px 20px; }.overlay[_ngcontent-%COMP%] { position: fixed; inset: 0; background: #0f172a66; z-index: 1000; display: flex; justify-content: flex-end; }.panel[_ngcontent-%COMP%] { width: min(600px, 100%); height: 100%; overflow-y: auto; background: var(--surface-card); padding: 28px; box-shadow: -8px 0 40px #0002; }.panel[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] { margin-bottom: 24px; }.panel[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { margin-bottom: 18px; }.panel[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] { padding: 20px 0; }.form-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; } fieldset[_ngcontent-%COMP%] { border: 0; padding: 0; margin: 0; min-width: 0; }.search-row[_ngcontent-%COMP%] { display: flex; gap: 8px; }.check[_ngcontent-%COMP%] { flex-direction: row; align-items: center; }.description[_ngcontent-%COMP%] { white-space: pre-wrap; overflow-wrap: anywhere; color: var(--text-strong); line-height: 1.7; }.action[_ngcontent-%COMP%] { padding: 14px; background: var(--surface-sunken); border-radius: 8px; margin: 8px 0; }.hint[_ngcontent-%COMP%] { font-size: 12px; }.sr-only[_ngcontent-%COMP%] { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }\n@media(max-width: 800px) { .metrics[_ngcontent-%COMP%] { grid-template-columns: 1fr 1fr; }.filters[_ngcontent-%COMP%], .page-header[_ngcontent-%COMP%] { flex-direction: column; align-items: stretch; }.panel[_ngcontent-%COMP%] { padding: 20px; }.form-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DisciplineComponent, [{
        type: Component,
        args: [{ selector: 'eduops-discipline', standalone: true, imports: [CommonModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page-header\"><div><span class=\"eyebrow\">VIE SCOLAIRE</span><h1>Discipline</h1><p>Signaler, comprendre et suivre les incidents des \u00E9l\u00E8ves.</p></div>\n  @if (canManage()) { <button class=\"btn btn--primary\" (click)=\"openCreate()\">+ Signaler un incident</button> }\n</div>\n@if (loading()) { <p role=\"status\">Chargement du registre\u2026</p> }\n@else if (error()) { <div class=\"card empty\" role=\"alert\"><h2>Le registre est indisponible</h2><p>Les incidents n\u2019ont pas pu \u00EAtre charg\u00E9s.</p><button class=\"btn btn--primary\" (click)=\"load()\">R\u00E9essayer</button></div> }\n@else {\n  <div class=\"metrics\"><article><span>Incidents enregistr\u00E9s</span><strong>{{ items().length }}</strong></article><article><span>Dossiers ouverts</span><strong>{{ openCount() }}</strong></article><article><span>Priorit\u00E9 \u00E9lev\u00E9e ou critique</span><strong>{{ urgentCount() }}</strong></article><article><span>Familles \u00E0 informer</span><strong>{{ familyCount() }}</strong></article></div>\n  <section class=\"card\"><div class=\"register-heading\"><div><h2>Registre des incidents</h2><p>{{ filtered().length }} r\u00E9sultat(s)</p></div><button class=\"btn\" (click)=\"load()\">Actualiser</button></div>\n    <div class=\"filters\"><label>Rechercher<input class=\"input\" type=\"search\" placeholder=\"\u00C9l\u00E8ve, classe, r\u00E9f\u00E9rence\u2026\" [ngModel]=\"search()\" (ngModelChange)=\"search.set($event); page.set(1)\"></label>\n      <label>Statut<select class=\"input\" [ngModel]=\"statusFilter()\" (ngModelChange)=\"statusFilter.set($event); page.set(1)\"><option value=\"\">Tous les statuts</option>@for (s of statuses | keyvalue; track s.key) { <option [value]=\"s.key\">{{ s.value }}</option> }</select></label>\n      <label>Gravit\u00E9<select class=\"input\" [ngModel]=\"severityFilter()\" (ngModelChange)=\"severityFilter.set($event); page.set(1)\"><option value=\"\">Toutes les gravit\u00E9s</option>@for (s of severities | keyvalue; track s.key) { <option [value]=\"s.key\">{{ s.value }}</option> }</select></label>\n    </div>\n    <div class=\"table-wrap\"><table><thead><tr><th>\u00C9l\u00E8ve / classe</th><th>Incident</th><th>Date</th><th>Gravit\u00E9</th><th>Statut</th><th>Famille</th><th><span class=\"sr-only\">Actions</span></th></tr></thead><tbody>\n      @for (i of visible(); track i.id) { <tr><td><strong>{{ i.studentName }}</strong><small>{{ i.classroomName }}</small></td><td>{{ types[i.incidentType] }}<small class=\"reference\">{{ i.reference }}</small></td><td>{{ i.incidentDate | date:'dd/MM/yyyy' }}</td><td><span class=\"badge\" [class.urgent]=\"i.severity === 'HIGH' || i.severity === 'CRITICAL'\">{{ severities[i.severity] }}</span></td><td><span class=\"badge\" [class.done]=\"closed(i)\">{{ statuses[i.status] }}</span></td><td>{{ i.guardianInformed ? 'Inform\u00E9e' : '\u00C0 informer' }}</td><td><button class=\"btn\" (click)=\"inspect(i)\" [attr.aria-label]=\"'Consulter l\u2019incident de ' + i.studentName\">Consulter \u2192</button></td></tr> }\n    </tbody></table></div>\n    @if (!filtered().length) { <div class=\"empty\"><h3>{{ items().length ? 'Aucun r\u00E9sultat' : 'Aucun incident enregistr\u00E9' }}</h3><p>{{ items().length ? 'Modifiez les filtres pour retrouver un dossier.' : 'Les incidents signal\u00E9s et leur suivi appara\u00EEtront ici.' }}</p></div> }\n    @if (filtered().length) { <footer><span>Page {{ page() }} sur {{ pages() }}</span><div><button class=\"btn\" [disabled]=\"page() === 1\" (click)=\"page.set(page()-1)\">Pr\u00E9c\u00E9dent</button><button class=\"btn\" [disabled]=\"page() === pages()\" (click)=\"page.set(page()+1)\">Suivant</button></div></footer> }\n  </section>\n}\n@if (creating()) {\n  <div class=\"overlay\"><section class=\"panel\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"create-title\" (keydown.escape)=\"!saving() && creating.set(false)\"><header><h2 id=\"create-title\">Signaler un incident</h2><button class=\"btn\" aria-label=\"Fermer\" [disabled]=\"saving()\" (click)=\"creating.set(false)\">\u2715</button></header>\n    <form #incidentForm=\"ngForm\" (ngSubmit)=\"create()\"><fieldset [disabled]=\"saving()\">\n      <label>Rechercher un \u00E9l\u00E8ve<div class=\"search-row\"><input class=\"input\" name=\"studentSearch\" [(ngModel)]=\"studentSearch\" placeholder=\"Nom ou matricule\"><button type=\"button\" class=\"btn\" (click)=\"searchStudents()\">Rechercher</button></div></label>\n      <label>\u00C9l\u00E8ve *<select class=\"input\" required name=\"student\" [(ngModel)]=\"draft.studentId\"><option value=\"\">S\u00E9lectionner un \u00E9l\u00E8ve</option>@for (s of students(); track s.id) { <option [value]=\"s.id\">{{ s.fullName }} \u2014 {{ s.classroomName || s.studentNumber }}</option> }</select></label>\n      <div class=\"form-grid\"><label>Date *<input class=\"input\" type=\"date\" required name=\"date\" [(ngModel)]=\"draft.incidentDate\"></label><label>Lieu<input class=\"input\" name=\"location\" maxlength=\"150\" [(ngModel)]=\"draft.location\" placeholder=\"Cour, salle de classe\u2026\"></label>\n      <label>Nature *<select class=\"input\" name=\"type\" [(ngModel)]=\"draft.incidentType\">@for (t of types | keyvalue; track t.key) { <option [value]=\"t.key\">{{ t.value }}</option> }</select></label><label>Gravit\u00E9 *<select class=\"input\" name=\"severity\" [(ngModel)]=\"draft.severity\">@for (s of severities | keyvalue; track s.key) { <option [value]=\"s.key\">{{ s.value }}</option> }</select></label></div>\n      <label>Description des faits *<textarea class=\"input\" rows=\"5\" required maxlength=\"5000\" name=\"description\" [(ngModel)]=\"draft.description\" placeholder=\"D\u00E9crivez les faits observ\u00E9s et leur contexte.\"></textarea></label>\n      <footer><button type=\"button\" class=\"btn\" (click)=\"creating.set(false)\">Annuler</button><button class=\"btn btn--primary\" [disabled]=\"incidentForm.invalid || !draft.description.trim()\">{{ saving() ? 'Enregistrement\u2026' : 'Enregistrer le signalement' }}</button></footer>\n    </fieldset></form></section></div>\n}\n@if (selected(); as i) {\n  <div class=\"overlay\"><section class=\"panel\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"detail-title\" (keydown.escape)=\"!saving() && selected.set(null)\"><header><div><h2 id=\"detail-title\">{{ i.studentName }}</h2><p>{{ i.classroomName }} \u00B7 {{ i.incidentDate | date:'dd/MM/yyyy' }}</p></div><button class=\"btn\" aria-label=\"Fermer\" [disabled]=\"saving()\" (click)=\"selected.set(null)\">\u2715</button></header>\n    <span class=\"badge\">{{ types[i.incidentType] }} \u00B7 {{ severities[i.severity] }}</span><p class=\"description\">{{ i.description }}</p>@if (i.location) { <p>Lieu : {{ i.location }}</p> }\n    <h3>Mesures d\u00E9cid\u00E9es</h3>@for (a of i.actions; track a.id) { <article class=\"action\"><strong>{{ actionTypes[a.actionType] }}</strong><p class=\"description\">{{ a.description }}</p></article> } @empty { <p>Aucune mesure enregistr\u00E9e.</p> }\n    @if (canManage() && !closed(i)) {\n      <fieldset [disabled]=\"saving()\"><h3>Suivi du dossier</h3><label>Statut<select class=\"input\" [(ngModel)]=\"editStatus\">@for (s of statuses | keyvalue; track s.key) { <option [value]=\"s.key\">{{ s.value }}</option> }</select></label><label class=\"check\"><input type=\"checkbox\" [(ngModel)]=\"guardianInformed\"> La famille a \u00E9t\u00E9 inform\u00E9e</label><p class=\"hint\">Cette mention consigne un contact d\u00E9j\u00E0 effectu\u00E9.</p><button class=\"btn btn--primary\" (click)=\"update()\">Enregistrer le suivi</button>\n      <h3>Ajouter une mesure</h3><label>Type de mesure<select class=\"input\" [(ngModel)]=\"actionType\">@for (a of actionTypes | keyvalue; track a.key) { <option [value]=\"a.key\">{{ a.value }}</option> }</select></label><label>D\u00E9cision et modalit\u00E9s<textarea class=\"input\" rows=\"3\" maxlength=\"5000\" [(ngModel)]=\"actionDescription\"></textarea></label><button class=\"btn\" [disabled]=\"!actionDescription.trim()\" (click)=\"addAction()\">Enregistrer la mesure</button></fieldset>\n    } @else { <p>{{ statuses[i.status] }} \u00B7 Famille {{ i.guardianInformed ? 'inform\u00E9e' : 'non inform\u00E9e' }}</p> }\n  </section></div>\n}\n", styles: [":host { display: block; }\n.page-header, .register-heading, header, footer { display: flex; justify-content: space-between; align-items: center; gap: 16px; }\n.page-header { margin-bottom: 24px; } h1 { margin: 6px 0; } h2 { font-size: 18px; margin: 0; } h3 { font-size: 15px; margin-top: 24px; }\np, small { color: var(--text-muted); } .eyebrow { color: var(--brand); font-size: 11px; font-weight: 700; letter-spacing: 2px; }\n.metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }\n.metrics article, .card { background: var(--surface-card); border: 1px solid var(--border); border-radius: 12px; }\n.metrics article { padding: 20px; } .metrics span { color: var(--text-muted); font-size: 13px; } .metrics strong { display: block; font-size: 30px; margin-top: 12px; }\n.card { overflow: hidden; } .register-heading, .filters, footer { padding: 18px 22px; } .register-heading p { margin-bottom: 0; }\n.filters { display: flex; gap: 16px; background: var(--surface-sunken); } label { display: flex; flex-direction: column; gap: 8px; font-size: 13px; font-weight: 600; } .filters label:first-child { flex: 1; }\n.input { width: 100%; min-height: 40px; } .table-wrap { overflow-x: auto; } table { width: 100%; border-collapse: collapse; text-align: left; white-space: nowrap; } th { color: var(--text-muted); font-size: 12px; background: var(--surface-sunken); } th, td { padding: 16px; border-bottom: 1px solid var(--border); } td { font-size: 13px; } small { display: block; margin-top: 5px; } .reference { max-width: 150px; overflow: hidden; text-overflow: ellipsis; }\n.badge { display: inline-block; padding: 5px 9px; border-radius: 6px; background: #eef2ff; color: #46578d; font-size: 12px; }.urgent { background: #fff0e8; color: #a43d19; }.done { background: #edf6ef; color: #306945; }\n.empty { text-align: center; padding: 48px 20px; }.overlay { position: fixed; inset: 0; background: #0f172a66; z-index: 1000; display: flex; justify-content: flex-end; }.panel { width: min(600px, 100%); height: 100%; overflow-y: auto; background: var(--surface-card); padding: 28px; box-shadow: -8px 0 40px #0002; }.panel header { margin-bottom: 24px; }.panel label { margin-bottom: 18px; }.panel footer { padding: 20px 0; }.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; } fieldset { border: 0; padding: 0; margin: 0; min-width: 0; }.search-row { display: flex; gap: 8px; }.check { flex-direction: row; align-items: center; }.description { white-space: pre-wrap; overflow-wrap: anywhere; color: var(--text-strong); line-height: 1.7; }.action { padding: 14px; background: var(--surface-sunken); border-radius: 8px; margin: 8px 0; }.hint { font-size: 12px; }.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }\n@media(max-width: 800px) { .metrics { grid-template-columns: 1fr 1fr; }.filters, .page-header { flex-direction: column; align-items: stretch; }.panel { padding: 20px; }.form-grid { grid-template-columns: 1fr; } }\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DisciplineComponent, { className: "DisciplineComponent", filePath: "frontend/src/app/features/discipline/discipline.component.ts", lineNumber: 20 }); })();
//# sourceMappingURL=discipline.component.js.map