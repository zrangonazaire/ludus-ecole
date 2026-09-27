import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { StudentImportService } from '@core/services/student-import.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.rowNumber;
const _forTrack1 = ($index, $item) => $item.id;
function ImportsComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1, " Vous pouvez consulter cet \u00E9cran, mais l\u2019import demande l\u2019autorisation \u00AB Ex\u00E9cuter les imports \u00BB. Demandez-la \u00E0 la direction. ");
    i0.ɵɵelementEnd();
} }
function ImportsComponent_Conditional_22_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 13);
} }
function ImportsComponent_Conditional_22_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1, "Glissez votre classeur ici");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p", 15);
    i0.ɵɵtext(3, "ou");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "label", 16);
    i0.ɵɵtext(5, " Choisir un fichier ");
    i0.ɵɵelementStart(6, "input", 17);
    i0.ɵɵlistener("change", function ImportsComponent_Conditional_22_Conditional_18_Template_input_change_6_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onFileSelected($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "p", 18);
    i0.ɵɵtext(8, "Formats accept\u00E9s : .xlsx, .csv");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("is-disabled", !ctx_r1.canImport());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canImport());
} }
function ImportsComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "ol", 10)(2, "li")(3, "strong");
    i0.ɵɵtext(4, "T\u00E9l\u00E9chargez le mod\u00E8le.");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Il porte les douze colonnes attendues, dans l\u2019ordre attendu. ");
    i0.ɵɵelementStart(6, "button", 11);
    i0.ɵɵlistener("click", function ImportsComponent_Conditional_22_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.downloadTemplate()); });
    i0.ɵɵtext(7, " T\u00E9l\u00E9charger le mod\u00E8le ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "li")(9, "strong");
    i0.ɵɵtext(10, "Recopiez-y vos listes.");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11, " Passez la colonne \u00AB T\u00E9l\u00E9phone du responsable \u00BB au format Texte avant de saisir : sinon le tableur r\u00E9\u00E9crit +225 07 11 22 33 en nombre, et le num\u00E9ro d\u2019origine est perdu. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "li")(13, "strong");
    i0.ɵɵtext(14, "D\u00E9posez le fichier ci-dessous.");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(15, " Vous verrez un aper\u00E7u avant toute \u00E9criture.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 12);
    i0.ɵɵlistener("dragover", function ImportsComponent_Conditional_22_Template_div_dragover_16_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDragOver($event)); })("dragleave", function ImportsComponent_Conditional_22_Template_div_dragleave_16_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDragLeave()); })("drop", function ImportsComponent_Conditional_22_Template_div_drop_16_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDrop($event)); });
    i0.ɵɵtemplate(17, ImportsComponent_Conditional_22_Conditional_17_Template, 1, 0, "eduops-loading-state", 13)(18, ImportsComponent_Conditional_22_Conditional_18_Template, 9, 3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(16);
    i0.ɵɵclassProp("is-dragging", ctx_r1.dragging());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.analysing() ? 17 : 18);
} }
function ImportsComponent_Conditional_23_Conditional_0_Conditional_8_For_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" Ligne ", row_r5.rowNumber, " refus\u00E9e : ", row_r5.errors.join(" ; "), " ");
} }
function ImportsComponent_Conditional_23_Conditional_0_Conditional_8_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ImportsComponent_Conditional_23_Conditional_0_Conditional_8_For_2_Conditional_0_Template, 2, 2, "li");
} if (rf & 2) {
    const row_r5 = ctx.$implicit;
    i0.ɵɵconditional(row_r5.errors.length > 0 ? 0 : -1);
} }
function ImportsComponent_Conditional_23_Conditional_0_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 20);
    i0.ɵɵrepeaterCreate(1, ImportsComponent_Conditional_23_Conditional_0_Conditional_8_For_2_Template, 1, 1, null, null, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const done_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(done_r6.rows);
} }
function ImportsComponent_Conditional_23_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 19)(1, "h2");
    i0.ɵɵtext(2, "Import termin\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7, ". ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, ImportsComponent_Conditional_23_Conditional_0_Conditional_8_Template, 3, 0, "ul", 20);
    i0.ɵɵelementStart(9, "div", 21)(10, "button", 22);
    i0.ɵɵlistener("click", function ImportsComponent_Conditional_23_Conditional_0_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.discard()); });
    i0.ɵɵtext(11, " Importer un autre fichier ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 11);
    i0.ɵɵlistener("click", function ImportsComponent_Conditional_23_Conditional_0_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.goTo("HISTORIQUE")); });
    i0.ɵɵtext(13, " Voir l\u2019historique ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const done_r6 = ctx;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", done_r6.rows.length, " ligne(s) trait\u00E9e(s) depuis ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(done_r6.fileName);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(done_r6.rows.length > 0 ? 8 : -1);
} }
function ImportsComponent_Conditional_23_Conditional_1_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 30);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const data_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" Ce fichier a d\u00E9j\u00E0 \u00E9t\u00E9 import\u00E9 le ", i0.ɵɵpipeBind2(2, 2, data_r8.alreadyImportedAt, "dd/MM/yyyy \u00E0 HH:mm"), " (", data_r8.alreadyImportedRows, " \u00E9l\u00E8ve(s) cr\u00E9\u00E9s). Confirmer une seconde fois cr\u00E9era chaque \u00E9l\u00E8ve en double. ");
} }
function ImportsComponent_Conditional_23_Conditional_1_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 30);
    i0.ɵɵtext(1, " Aucune ligne n\u2019est importable en l\u2019\u00E9tat. Corrigez le fichier et red\u00E9posez-le. ");
    i0.ɵɵelementEnd();
} }
function ImportsComponent_Conditional_23_Conditional_1_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1, " Aucune ligne dans ce filtre \u2014 c\u2019est plut\u00F4t bon signe. ");
    i0.ɵɵelementEnd();
} }
function ImportsComponent_Conditional_23_Conditional_1_Conditional_25_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 37);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(column_r9);
} }
function ImportsComponent_Conditional_23_Conditional_1_Conditional_25_For_14_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r10 = ctx.$implicit;
    const row_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r11.values[column_r10]);
} }
function ImportsComponent_Conditional_23_Conditional_1_Conditional_25_For_14_For_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const error_r12 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(error_r12);
} }
function ImportsComponent_Conditional_23_Conditional_1_Conditional_25_For_14_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 42);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const warning_r13 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(warning_r13);
} }
function ImportsComponent_Conditional_23_Conditional_1_Conditional_25_For_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td")(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵrepeaterCreate(6, ImportsComponent_Conditional_23_Conditional_1_Conditional_25_For_14_For_7_Template, 2, 1, "td", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementStart(8, "td", 40);
    i0.ɵɵrepeaterCreate(9, ImportsComponent_Conditional_23_Conditional_1_Conditional_25_For_14_For_10_Template, 2, 1, "span", 41, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵrepeaterCreate(11, ImportsComponent_Conditional_23_Conditional_1_Conditional_25_For_14_For_12_Template, 2, 1, "span", 42, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵclassMap("row row--" + ctx_r1.statusTone(row_r11.status));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r11.rowNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap("badge badge--" + ctx_r1.statusTone(row_r11.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.statusLabel(row_r11.status), " ");
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.columns());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(row_r11.errors);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(row_r11.warnings);
} }
function ImportsComponent_Conditional_23_Conditional_1_Conditional_25_Conditional_15_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 45);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r15 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r15);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r15);
} }
function ImportsComponent_Conditional_23_Conditional_1_Conditional_25_Conditional_15_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 47);
    i0.ɵɵlistener("click", function ImportsComponent_Conditional_23_Conditional_1_Conditional_25_Conditional_15_Conditional_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.previewPrevPage()); });
    i0.ɵɵtext(1, " Pr\u00E9c\u00E9dent ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 46);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 47);
    i0.ɵɵlistener("click", function ImportsComponent_Conditional_23_Conditional_1_Conditional_25_Conditional_15_Conditional_6_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.previewNextPage()); });
    i0.ɵɵtext(5, " Suivant ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", ctx_r1.previewPage() === 0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate5(" Lignes ", ctx_r1.previewFirstRow(), "\u2013", ctx_r1.previewLastRow(), " sur ", ctx_r1.visibleRows().length, " \u2014 page ", ctx_r1.previewPage() + 1, " / ", ctx_r1.previewTotalPages(), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.previewPage() >= ctx_r1.previewTotalPages() - 1);
} }
function ImportsComponent_Conditional_23_Conditional_1_Conditional_25_Conditional_15_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.visibleRows().length, " ligne(s) affich\u00E9e(s) ");
} }
function ImportsComponent_Conditional_23_Conditional_1_Conditional_25_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "nav", 39)(1, "label", 43);
    i0.ɵɵtext(2, " Lignes par page ");
    i0.ɵɵelementStart(3, "select", 44);
    i0.ɵɵlistener("change", function ImportsComponent_Conditional_23_Conditional_1_Conditional_25_Conditional_15_Template_select_change_3_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.changePreviewPageSize($event)); });
    i0.ɵɵrepeaterCreate(4, ImportsComponent_Conditional_23_Conditional_1_Conditional_25_Conditional_15_For_5_Template, 2, 2, "option", 45, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, ImportsComponent_Conditional_23_Conditional_1_Conditional_25_Conditional_15_Conditional_6_Template, 6, 7)(7, ImportsComponent_Conditional_23_Conditional_1_Conditional_25_Conditional_15_Conditional_7_Template, 2, 1, "span", 46);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", ctx_r1.previewPageSize());
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.pageSizeOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.previewTotalPages() > 1 ? 6 : 7);
} }
function ImportsComponent_Conditional_23_Conditional_1_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35)(1, "table", 36)(2, "thead")(3, "tr")(4, "th", 37);
    i0.ɵɵtext(5, "Ligne");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th", 37);
    i0.ɵɵtext(7, "\u00C9tat");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(8, ImportsComponent_Conditional_23_Conditional_1_Conditional_25_For_9_Template, 2, 1, "th", 37, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementStart(10, "th", 37);
    i0.ɵɵtext(11, "Remarques");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "tbody");
    i0.ɵɵrepeaterCreate(13, ImportsComponent_Conditional_23_Conditional_1_Conditional_25_For_14_Template, 13, 6, "tr", 38, _forTrack0);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(15, ImportsComponent_Conditional_23_Conditional_1_Conditional_25_Conditional_15_Template, 8, 2, "nav", 39);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r1.columns());
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r1.pagedVisibleRows());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.visibleRows().length > ctx_r1.pageSizeOptions[0] ? 15 : -1);
} }
function ImportsComponent_Conditional_23_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 23)(2, "p", 24);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "ul", 25)(5, "li", 26);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "li", 27);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "li", 28);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "li", 29);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(13, ImportsComponent_Conditional_23_Conditional_1_Conditional_13_Template, 3, 5, "p", 30)(14, ImportsComponent_Conditional_23_Conditional_1_Conditional_14_Template, 2, 0, "p", 30);
    i0.ɵɵelementStart(15, "div", 31)(16, "button", 32);
    i0.ɵɵlistener("click", function ImportsComponent_Conditional_23_Conditional_1_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.filterRows("A_CORRIGER")); });
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 32);
    i0.ɵɵlistener("click", function ImportsComponent_Conditional_23_Conditional_1_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.filterRows("TOUT")); });
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 32);
    i0.ɵɵlistener("click", function ImportsComponent_Conditional_23_Conditional_1_Template_button_click_20_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.filterRows("INVALID")); });
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 32);
    i0.ɵɵlistener("click", function ImportsComponent_Conditional_23_Conditional_1_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.filterRows("DUPLICATE")); });
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(24, ImportsComponent_Conditional_23_Conditional_1_Conditional_24_Template, 2, 0, "p", 7)(25, ImportsComponent_Conditional_23_Conditional_1_Conditional_25_Template, 16, 1);
    i0.ɵɵelementStart(26, "div", 21)(27, "button", 33);
    i0.ɵɵlistener("click", function ImportsComponent_Conditional_23_Conditional_1_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.confirm()); });
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "button", 11);
    i0.ɵɵlistener("click", function ImportsComponent_Conditional_23_Conditional_1_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.discard()); });
    i0.ɵɵtext(30, " Abandonner ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "p", 34);
    i0.ɵɵtext(32, " Abandonner n\u2019\u00E9crit rien : le fichier n\u2019a pas encore \u00E9t\u00E9 appliqu\u00E9. ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const data_r8 = ctx;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(data_r8.fileName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", data_r8.validRows, " pr\u00EAte(s)");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", data_r8.warningRows, " \u00E0 v\u00E9rifier");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", data_r8.duplicateRows, " doublon(s)");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", data_r8.invalidRows, " en erreur");
    i0.ɵɵadvance();
    i0.ɵɵconditional(data_r8.alreadyImportedAt ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!data_r8.importable ? 14 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("is-active", ctx_r1.rowFilter() === "A_CORRIGER");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u00C0 corriger (", ctx_r1.toFixCount(), ") ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("is-active", ctx_r1.rowFilter() === "TOUT");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Toutes (", data_r8.totalRows, ") ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("is-active", ctx_r1.rowFilter() === "INVALID");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" En erreur (", data_r8.invalidRows, ") ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("is-active", ctx_r1.rowFilter() === "DUPLICATE");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Doublons (", data_r8.duplicateRows, ") ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.visibleRows().length === 0 ? 24 : 25);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !data_r8.importable || ctx_r1.confirming() || !ctx_r1.canImport());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.confirming() ? "Import en cours\u2026" : "Cr\u00E9er " + ctx_r1.willCreate() + " \u00E9l\u00E8ve(s)", " ");
} }
function ImportsComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ImportsComponent_Conditional_23_Conditional_0_Template, 14, 3, "div", 19)(1, ImportsComponent_Conditional_23_Conditional_1_Template, 33, 22, "div", 8);
} if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.report()) ? 0 : -1, tmp_1_0);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_2_0 = ctx_r1.preview()) ? 1 : -1, tmp_2_0);
} }
function ImportsComponent_Conditional_24_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 48);
} }
function ImportsComponent_Conditional_24_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 50);
    i0.ɵɵlistener("retry", function ImportsComponent_Conditional_24_Conditional_2_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.loadHistory()); });
    i0.ɵɵelementEnd();
} }
function ImportsComponent_Conditional_24_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1, " Aucun import pour l\u2019instant. Le premier que vous confirmerez appara\u00EEtra ici, avec son auteur et son r\u00E9sultat. ");
    i0.ɵɵelementEnd();
} }
function ImportsComponent_Conditional_24_Conditional_4_For_23_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td")(15, "span");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td")(18, "button", 53);
    i0.ɵɵlistener("click", function ImportsComponent_Conditional_24_Conditional_4_For_23_Template_button_click_18_listener() { const batch_r19 = i0.ɵɵrestoreView(_r18).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openBatch(batch_r19)); });
    i0.ɵɵtext(19, " D\u00E9tail ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_14_0;
    const batch_r19 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(batch_r19.fileName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(batch_r19.importTypeLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_14_0 = batch_r19.uploadedByName) !== null && tmp_14_0 !== undefined ? tmp_14_0 : "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 9, batch_r19.uploadedAt, "dd/MM/yyyy HH:mm"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(batch_r19.importedRows);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(batch_r19.invalidRows + batch_r19.duplicateRows);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap("badge badge--" + batch_r19.status.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", batch_r19.statusLabel, " ");
} }
function ImportsComponent_Conditional_24_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35)(1, "table", 51)(2, "thead")(3, "tr")(4, "th", 37);
    i0.ɵɵtext(5, "Fichier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th", 37);
    i0.ɵɵtext(7, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th", 37);
    i0.ɵɵtext(9, "D\u00E9pos\u00E9 par");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 37);
    i0.ɵɵtext(11, "Le");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 37);
    i0.ɵɵtext(13, "Cr\u00E9\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 37);
    i0.ɵɵtext(15, "Ignor\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 37);
    i0.ɵɵtext(17, "\u00C9tat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "th", 37)(19, "span", 52);
    i0.ɵɵtext(20, "D\u00E9tail");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(21, "tbody");
    i0.ɵɵrepeaterCreate(22, ImportsComponent_Conditional_24_Conditional_4_For_23_Template, 20, 12, "tr", null, _forTrack1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(22);
    i0.ɵɵrepeater(ctx_r1.history());
} }
function ImportsComponent_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtemplate(1, ImportsComponent_Conditional_24_Conditional_1_Template, 1, 0, "eduops-loading-state", 48)(2, ImportsComponent_Conditional_24_Conditional_2_Template, 1, 0, "eduops-error-state", 49)(3, ImportsComponent_Conditional_24_Conditional_3_Template, 2, 0, "p", 7)(4, ImportsComponent_Conditional_24_Conditional_4_Template, 24, 0, "div", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.loadingHistory() ? 1 : ctx_r1.historyFailed() ? 2 : ctx_r1.history().length === 0 ? 3 : 4);
} }
function ImportsComponent_Conditional_25_Conditional_37_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r21 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("Ligne ", row_r21.rowNumber, " : ", row_r21.errors.join(" ; "), "");
} }
function ImportsComponent_Conditional_25_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3");
    i0.ɵɵtext(1, "Lignes refus\u00E9es \u00E0 l\u2019\u00E9criture");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "ul", 20);
    i0.ɵɵrepeaterCreate(3, ImportsComponent_Conditional_25_Conditional_37_For_4_Template, 2, 2, "li", null, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const batch_r22 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(batch_r22.refusedRows);
} }
function ImportsComponent_Conditional_25_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1, " Aucune ligne refus\u00E9e \u00E0 l\u2019\u00E9criture. ");
    i0.ɵɵelementEnd();
} }
function ImportsComponent_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9)(1, "div", 54)(2, "header", 55)(3, "h2", 56);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 11);
    i0.ɵɵlistener("click", function ImportsComponent_Conditional_25_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeBatch()); });
    i0.ɵɵtext(6, " Fermer ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "dl", 57)(8, "dt");
    i0.ɵɵtext(9, "D\u00E9pos\u00E9 par");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "dd");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "dt");
    i0.ɵɵtext(13, "Le");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "dd");
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "dt");
    i0.ɵɵtext(18, "Confirm\u00E9 par");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "dd");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "dt");
    i0.ɵɵtext(22, "Lignes lues");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "dd");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "dt");
    i0.ɵɵtext(26, "\u00C9l\u00E8ves cr\u00E9\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "dd");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "dt");
    i0.ɵɵtext(30, "Doublons ignor\u00E9s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "dd");
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "dt");
    i0.ɵɵtext(34, "Lignes en erreur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "dd");
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(37, ImportsComponent_Conditional_25_Conditional_37_Template, 5, 0)(38, ImportsComponent_Conditional_25_Conditional_38_Template, 2, 0, "p", 7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_3_0;
    let tmp_5_0;
    const batch_r22 = ctx;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(batch_r22.fileName);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate((tmp_3_0 = batch_r22.uploadedByName) !== null && tmp_3_0 !== undefined ? tmp_3_0 : "\u2014");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(16, 9, batch_r22.uploadedAt, "dd/MM/yyyy \u00E0 HH:mm"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_5_0 = batch_r22.confirmedByName) !== null && tmp_5_0 !== undefined ? tmp_5_0 : "\u2014");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(batch_r22.totalRows);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(batch_r22.importedRows);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(batch_r22.duplicateRows);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(batch_r22.invalidRows);
    i0.ɵɵadvance();
    i0.ɵɵconditional(batch_r22.refusedRows.length > 0 ? 37 : 38);
} }
/**
 * Import de listes.
 *
 * <p>L'écran suit la règle du module : un fichier n'écrit rien tant que
 * personne n'a vu ce qu'il contient. Le dépôt produit un aperçu, l'aperçu
 * demande une confirmation, et la confirmation laisse une trace dans
 * l'historique.</p>
 *
 * <p>L'aperçu s'ouvre par défaut sur les lignes à corriger. Sur un fichier de
 * trois cents élèves dont quatre sont fautifs, montrer les trois cents d'abord
 * revient à cacher les quatre qui demandent une décision.</p>
 */
export class ImportsComponent {
    imports = inject(StudentImportService);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    destroyRef = inject(DestroyRef);
    totalSteps = 3;
    step = signal('DEPOT');
    preview = signal(null);
    history = signal([]);
    openedBatch = signal(null);
    analysing = signal(false);
    confirming = signal(false);
    loadingHistory = signal(true);
    historyFailed = signal(false);
    dragging = signal(false);
    rowFilter = signal('A_CORRIGER');
    /** Le résultat d'une confirmation, distinct de l'aperçu qui l'a précédé. */
    report = signal(null);
    canImport = computed(() => this.auth.has(PERMISSIONS.IMPORT_EXECUTE));
    columns = computed(() => {
        const rows = this.preview()?.rows ?? [];
        const seen = [];
        for (const row of rows) {
            for (const key of Object.keys(row.values)) {
                if (!seen.includes(key)) {
                    seen.push(key);
                }
            }
        }
        return seen;
    });
    toFixCount = computed(() => {
        const rows = this.preview()?.rows ?? [];
        return rows.filter((row) => row.status === 'INVALID'
            || row.status === 'DUPLICATE' || row.warnings.length > 0).length;
    });
    visibleRows = computed(() => {
        const rows = this.preview()?.rows ?? [];
        const filter = this.rowFilter();
        if (filter === 'TOUT') {
            return rows;
        }
        if (filter === 'A_CORRIGER') {
            return rows.filter((row) => row.status === 'INVALID'
                || row.status === 'DUPLICATE' || row.warnings.length > 0);
        }
        return rows.filter((row) => row.status === filter);
    });
    /** Combien d'élèves seront réellement créés si l'on confirme. */
    willCreate = computed(() => {
        const preview = this.preview();
        return preview ? preview.validRows + preview.warningRows : 0;
    });
    // --- pagination de l'aperçu : 300 lignes d'un coup rend le tableau illisible ---
    pageSizeOptions = [10, 20, 50, 100];
    previewPageSize = signal(10);
    previewPage = signal(0);
    previewTotalPages = computed(() => Math.max(1, Math.ceil(this.visibleRows().length / this.previewPageSize())));
    pagedVisibleRows = computed(() => {
        const start = this.previewPage() * this.previewPageSize();
        return this.visibleRows().slice(start, start + this.previewPageSize());
    });
    previewFirstRow() {
        const total = this.visibleRows().length;
        return total === 0 ? 0 : this.previewPage() * this.previewPageSize() + 1;
    }
    previewLastRow() {
        const total = this.visibleRows().length;
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
    helpCopy = computed(() => {
        switch (this.step()) {
            case 'DEPOT':
                return {
                    step: 1,
                    title: 'Partez du modèle, pas de votre fichier',
                    description: 'Le classeur modèle porte les colonnes attendues dans '
                        + "l'ordre attendu. Recopiez-y vos listes plutôt que d'adapter le "
                        + 'fichier reçu : les erreurs de colonnes sont les plus longues à '
                        + 'démêler ensuite.',
                    points: [
                        'Mettez la colonne « Téléphone du responsable » au format Texte '
                            + 'avant de saisir : sinon le tableur transforme +225… en nombre.',
                        'La colonne « Classe » doit reprendre le nom exact de vos classes, '
                            + '« 6ème A » et non « 6ème ».',
                        'Une ligne sans classe reste importable : l\'élève est créé, son '
                            + 'inscription viendra plus tard.'
                    ]
                };
            case 'APERCU':
                return {
                    step: 2,
                    title: 'Rien n’est encore enregistré',
                    description: 'Ce tableau décrit ce qui se passerait. Les lignes en '
                        + 'rouge seront ignorées, celles en orange passeront avec une '
                        + 'réserve. Corrigez dans votre fichier et redéposez-le autant de '
                        + 'fois qu\'il le faut : tant que vous n\'avez pas confirmé, la '
                        + 'base est intacte.',
                    points: [
                        'Un doublon est détecté sur le nom, le prénom et la date de '
                            + 'naissance : deux homonymes nés le même jour demanderont une '
                            + 'saisie manuelle.',
                        'Le nombre annoncé sur le bouton est exactement le nombre d\'élèves '
                            + 'qui seront créés.'
                    ]
                };
            default:
                return {
                    step: 3,
                    title: 'Qui a importé quoi, et quand',
                    description: 'Chaque import confirmé laisse une ligne ici, avec son '
                        + 'auteur et son résultat. C\'est ce qui permet de répondre quand '
                        + 'deux cents élèves apparaissent un mardi.',
                    points: [
                        'Ouvrez un import pour voir les lignes que le serveur a refusées '
                            + 'à l\'écriture et leur motif.',
                        'Redéposer un fichier déjà importé déclenche un avertissement '
                            + 'avant la confirmation.'
                    ]
                };
        }
    });
    ngOnInit() {
        this.loadHistory();
    }
    goTo(step) {
        this.step.set(step);
        if (step === 'HISTORIQUE') {
            this.loadHistory();
        }
    }
    loadHistory() {
        this.loadingHistory.set(true);
        this.historyFailed.set(false);
        this.imports.history()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (batches) => {
                this.history.set(batches);
                this.loadingHistory.set(false);
            },
            error: () => {
                this.loadingHistory.set(false);
                this.historyFailed.set(true);
            }
        });
    }
    downloadTemplate() {
        this.imports.downloadTemplate();
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
            this.analyse(file);
        }
    }
    onFileSelected(event) {
        const input = event.target;
        const file = input.files?.[0];
        if (file) {
            this.analyse(file);
        }
        // Remis à zéro pour que redéposer le même fichier relance l'analyse.
        input.value = '';
    }
    analyse(file) {
        if (this.analysing()) {
            return;
        }
        this.analysing.set(true);
        this.report.set(null);
        this.imports.analyse(file)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (preview) => {
                this.analysing.set(false);
                this.preview.set(preview);
                this.previewPage.set(0);
                this.rowFilter.set(this.toFixCount() > 0 ? 'A_CORRIGER' : 'TOUT');
                this.step.set('APERCU');
            },
            error: (err) => {
                this.analysing.set(false);
                this.notifications.error(this.messageOf(err), 'Le fichier n’a pas pu être lu');
            }
        });
    }
    confirm() {
        const preview = this.preview();
        if (!preview || !preview.importable || this.confirming()) {
            return;
        }
        this.confirming.set(true);
        this.imports.confirm(preview.batchId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (report) => {
                this.confirming.set(false);
                this.report.set(report);
                this.preview.set(null);
                const created = report.rows.filter((row) => row.errors.length === 0).length;
                this.notifications.success(`${created} élève(s) créé(s) depuis ${report.fileName}.`, 'Import terminé');
                this.loadHistory();
            },
            error: (err) => {
                this.confirming.set(false);
                this.notifications.error(this.messageOf(err), 'Import refusé');
            }
        });
    }
    /** Abandonne l'aperçu sans rien écrire. */
    discard() {
        this.preview.set(null);
        this.report.set(null);
        this.step.set('DEPOT');
    }
    openBatch(batch) {
        this.openedBatch.set(batch);
        this.imports.detail(batch.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (full) => this.openedBatch.set(full),
            error: () => undefined
        });
    }
    closeBatch() {
        this.openedBatch.set(null);
    }
    filterRows(filter) {
        this.rowFilter.set(filter);
        this.previewPage.set(0);
    }
    statusLabel(status) {
        return ({
            VALID: 'Prête', WARNING: 'À vérifier',
            DUPLICATE: 'Doublon', INVALID: 'En erreur'
        })[status];
    }
    statusTone(status) {
        return status.toLowerCase();
    }
    messageOf(err) {
        const failure = err?.error;
        // Le message du serveur d'abord : il nomme la ligne ou la date en cause,
        // là où le code ne rend qu'une phrase générique.
        return failure?.message?.trim()
            || translateErrorCode(failure?.code ?? 'UNKNOWN');
    }
    static ɵfac = function ImportsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ImportsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ImportsComponent, selectors: [["eduops-imports"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 26, vars: 18, consts: [[1, "imports"], ["flow", "imports", "eyebrow", "Conseil pour cette \u00E9tape", 3, "stepKey", "stepNumber", "totalSteps", "title", "description", "points"], [1, "page-head"], ["aria-label", "\u00C9tapes de l\u2019import", 1, "steps"], ["type", "button", 1, "steps__item", 3, "click"], [1, "steps__num"], ["type", "button", 1, "steps__item", 3, "click", "disabled"], [1, "notice", "notice--muted"], [1, "panel"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "batch-title", 1, "drawer"], [1, "howto"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], [1, "dropzone", 3, "dragover", "dragleave", "drop"], ["message", "Lecture du fichier\u2026"], [1, "dropzone__hint"], [1, "dropzone__or"], [1, "btn", "btn--primary"], ["type", "file", "hidden", "", "accept", ".xlsx,.csv,.tsv", 3, "change", "disabled"], [1, "dropzone__formats"], [1, "panel", "panel--done"], [1, "refused"], [1, "actions"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], [1, "summary"], [1, "summary__file"], [1, "summary__counts"], [1, "count", "count--valid"], [1, "count", "count--warning"], [1, "count", "count--duplicate"], [1, "count", "count--invalid"], [1, "notice", "notice--danger"], ["role", "group", "aria-label", "Filtrer les lignes", 1, "filters"], ["type", "button", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [1, "actions__note"], [1, "table-wrap"], [1, "preview"], ["scope", "col"], [3, "class"], ["aria-label", "Pagination de l'aper\u00E7u", 1, "pager"], [1, "remarks"], [1, "remark", "remark--error"], [1, "remark", "remark--warning"], [1, "pager__size"], [3, "change", "value"], [3, "value"], [1, "pager__state"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], ["message", "Chargement de l\u2019historique\u2026"], ["title", "Historique indisponible", "message", "Les imports pass\u00E9s n\u2019ont pas pu \u00EAtre charg\u00E9s."], ["title", "Historique indisponible", "message", "Les imports pass\u00E9s n\u2019ont pas pu \u00EAtre charg\u00E9s.", 3, "retry"], [1, "history"], [1, "sr-only"], ["type", "button", 1, "btn", "btn--link", 3, "click"], [1, "drawer__panel"], [1, "drawer__head"], ["id", "batch-title"], [1, "drawer__facts"]], template: function ImportsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "eduops-step-coachmark", 1);
            i0.ɵɵelementStart(2, "header", 2)(3, "div")(4, "h1");
            i0.ɵɵtext(5, "Import de listes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Reprenez vos listes existantes sans les ressaisir. Rien n\u2019est enregistr\u00E9 avant que vous ayez vu ce que le fichier contient.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "nav", 3)(9, "button", 4);
            i0.ɵɵlistener("click", function ImportsComponent_Template_button_click_9_listener() { return ctx.goTo("DEPOT"); });
            i0.ɵɵelementStart(10, "span", 5);
            i0.ɵɵtext(11, "1");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(12, " D\u00E9poser un fichier ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 6);
            i0.ɵɵlistener("click", function ImportsComponent_Template_button_click_13_listener() { return ctx.goTo("APERCU"); });
            i0.ɵɵelementStart(14, "span", 5);
            i0.ɵɵtext(15, "2");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(16, " V\u00E9rifier l\u2019aper\u00E7u ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "button", 4);
            i0.ɵɵlistener("click", function ImportsComponent_Template_button_click_17_listener() { return ctx.goTo("HISTORIQUE"); });
            i0.ɵɵelementStart(18, "span", 5);
            i0.ɵɵtext(19, "3");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(20, " Historique ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(21, ImportsComponent_Conditional_21_Template, 2, 0, "p", 7)(22, ImportsComponent_Conditional_22_Template, 19, 3, "div", 8)(23, ImportsComponent_Conditional_23_Template, 2, 2)(24, ImportsComponent_Conditional_24_Template, 5, 1, "div", 8)(25, ImportsComponent_Conditional_25_Template, 39, 12, "div", 9);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_14_0;
            i0.ɵɵadvance();
            i0.ɵɵproperty("stepKey", ctx.step())("stepNumber", ctx.helpCopy().step)("totalSteps", ctx.totalSteps)("title", ctx.helpCopy().title)("description", ctx.helpCopy().description)("points", ctx.helpCopy().points);
            i0.ɵɵadvance(8);
            i0.ɵɵclassProp("is-active", ctx.step() === "DEPOT");
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-active", ctx.step() === "APERCU");
            i0.ɵɵproperty("disabled", !ctx.preview() && !ctx.report());
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-active", ctx.step() === "HISTORIQUE");
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(!ctx.canImport() ? 21 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step() === "DEPOT" ? 22 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step() === "APERCU" ? 23 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step() === "HISTORIQUE" ? 24 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_14_0 = ctx.openedBatch()) ? 25 : -1, tmp_14_0);
        } }, dependencies: [CommonModule, i1.DatePipe, LoadingStateComponent, ErrorStateComponent,
            StepCoachmarkComponent], styles: [".imports[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.page-head[_ngcontent-%COMP%] {\n  h1 {\n    margin: 0 0 0.25rem;\n    font-size: 1.5rem;\n  }\n\n  p {\n    margin: 0;\n    color: var(--color-text-muted);\n    max-width: 62ch;\n  }\n}\n\n\n\n\n.steps[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n\n  &__item {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.5rem;\n    padding: 0.55rem 0.95rem;\n    border: 1px solid var(--color-border);\n    border-radius: 999px;\n    background: var(--color-surface);\n    color: var(--color-text);\n    font-size: 0.9rem;\n    cursor: pointer;\n\n    &:disabled {\n      opacity: 0.45;\n      cursor: not-allowed;\n    }\n\n    &.is-active {\n      border-color: var(--color-primary);\n      background: var(--color-primary-soft, rgba(37, 99, 235, 0.08));\n      color: var(--color-primary);\n      font-weight: 600;\n    }\n  }\n\n  &__num {\n    display: inline-grid;\n    place-items: center;\n    width: 1.35rem;\n    height: 1.35rem;\n    border-radius: 50%;\n    background: var(--color-border);\n    font-size: 0.75rem;\n    font-weight: 700;\n  }\n}\n\n.panel[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: 12px;\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n\n  &--done {\n    border-color: var(--color-success, #16a34a);\n  }\n}\n\n\n\n\n.howto[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 1.2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.7rem;\n  color: var(--color-text-muted);\n  max-width: 72ch;\n\n  strong {\n    color: var(--color-text);\n  }\n\n  .btn {\n    margin-left: 0.4rem;\n  }\n}\n\n.dropzone[_ngcontent-%COMP%] {\n  border: 2px dashed var(--color-border);\n  border-radius: 12px;\n  padding: 2.25rem 1rem;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  transition: border-color 120ms ease, background 120ms ease;\n\n  &.is-dragging {\n    border-color: var(--color-primary);\n    background: var(--color-primary-soft, rgba(37, 99, 235, 0.06));\n  }\n\n  &__hint {\n    margin: 0;\n    font-size: 1.05rem;\n    font-weight: 600;\n  }\n\n  &__or,\n  &__formats {\n    margin: 0;\n    color: var(--color-text-muted);\n    font-size: 0.85rem;\n  }\n}\n\n\n\n\n.summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n\n  &__file {\n    margin: 0;\n    font-weight: 600;\n  }\n\n  &__counts {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    margin: 0;\n    padding: 0;\n    list-style: none;\n  }\n}\n\n.count[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.6rem;\n  border-radius: 999px;\n  font-size: 0.82rem;\n  background: var(--color-border);\n\n  &--valid { background: rgba(22, 163, 74, 0.12); color: #15803d; }\n  &--warning { background: rgba(217, 119, 6, 0.14); color: #b45309; }\n  &--duplicate { background: rgba(100, 116, 139, 0.16); color: #475569; }\n  &--invalid { background: rgba(220, 38, 38, 0.12); color: #b91c1c; }\n}\n\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n\n  button {\n    padding: 0.4rem 0.8rem;\n    border: 1px solid var(--color-border);\n    border-radius: 999px;\n    background: transparent;\n    color: var(--color-text-muted);\n    font-size: 0.85rem;\n    cursor: pointer;\n\n    &.is-active {\n      border-color: var(--color-primary);\n      color: var(--color-primary);\n      font-weight: 600;\n    }\n  }\n}\n\n.table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.pager[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n  padding: 0.75rem 0.25rem 0;\n\n  &__state {\n    font-size: 0.82rem;\n    color: var(--color-text-muted);\n  }\n\n  &__size {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.4rem;\n    font-size: 0.82rem;\n    color: var(--color-text-muted);\n\n    select {\n      padding: 0.3rem 0.5rem;\n      font-size: 0.85rem;\n      color: var(--color-text);\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: 6px;\n      cursor: pointer;\n    }\n  }\n}\n\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.88rem;\n\n  th,\n  td {\n    padding: 0.55rem 0.6rem;\n    text-align: left;\n    border-bottom: 1px solid var(--color-border);\n    vertical-align: top;\n    white-space: nowrap;\n  }\n\n  th {\n    font-weight: 600;\n    color: var(--color-text-muted);\n    font-size: 0.8rem;\n  }\n}\n\n.row[_ngcontent-%COMP%] {\n  \n\n\n  &--invalid { background: rgba(220, 38, 38, 0.05); }\n  &--duplicate { background: rgba(100, 116, 139, 0.06); }\n  &--warning { background: rgba(217, 119, 6, 0.05); }\n}\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.15rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background: var(--color-border);\n\n  &--valid, &--imported { background: rgba(22, 163, 74, 0.14); color: #15803d; }\n  &--warning, &--previewed { background: rgba(217, 119, 6, 0.16); color: #b45309; }\n  &--duplicate { background: rgba(100, 116, 139, 0.16); color: #475569; }\n  &--invalid, &--rejected { background: rgba(220, 38, 38, 0.14); color: #b91c1c; }\n}\n\n.remarks[_ngcontent-%COMP%] {\n  white-space: normal;\n  min-width: 18rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n\n.remark[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n\n  &--error { color: #b91c1c; }\n  &--warning { color: #b45309; }\n}\n\n\n\n\n.notice[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.7rem 0.9rem;\n  border-radius: 8px;\n  font-size: 0.88rem;\n\n  &--muted {\n    background: var(--color-surface-muted, rgba(100, 116, 139, 0.08));\n    color: var(--color-text-muted);\n  }\n\n  &--danger {\n    background: rgba(220, 38, 38, 0.08);\n    color: #b91c1c;\n    border: 1px solid rgba(220, 38, 38, 0.25);\n  }\n}\n\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.6rem;\n\n  &__note {\n    margin: 0;\n    color: var(--color-text-muted);\n    font-size: 0.82rem;\n  }\n}\n\n.refused[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  font-size: 0.85rem;\n  color: #b91c1c;\n}\n\n\n\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.35);\n  display: flex;\n  justify-content: flex-end;\n  z-index: 40;\n\n  &__panel {\n    width: min(30rem, 100%);\n    height: 100%;\n    overflow-y: auto;\n    background: var(--color-surface);\n    padding: 1.25rem;\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.75rem;\n\n    h2 {\n      margin: 0;\n      font-size: 1.1rem;\n      overflow-wrap: anywhere;\n    }\n  }\n\n  &__facts {\n    display: grid;\n    grid-template-columns: auto 1fr;\n    gap: 0.35rem 1rem;\n    margin: 0;\n    font-size: 0.88rem;\n\n    dt {\n      color: var(--color-text-muted);\n    }\n\n    dd {\n      margin: 0;\n      font-weight: 600;\n    }\n  }\n}\n\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  white-space: nowrap;\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ImportsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-imports', standalone: true, imports: [CommonModule, LoadingStateComponent, ErrorStateComponent,
                    StepCoachmarkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"imports\">\n\n  <eduops-step-coachmark\n    flow=\"imports\"\n    [stepKey]=\"step()\"\n    [stepNumber]=\"helpCopy().step\"\n    [totalSteps]=\"totalSteps\"\n    eyebrow=\"Conseil pour cette \u00E9tape\"\n    [title]=\"helpCopy().title\"\n    [description]=\"helpCopy().description\"\n    [points]=\"helpCopy().points\" />\n\n  <header class=\"page-head\">\n    <div>\n      <h1>Import de listes</h1>\n      <p>Reprenez vos listes existantes sans les ressaisir. Rien n\u2019est\n        enregistr\u00E9 avant que vous ayez vu ce que le fichier contient.</p>\n    </div>\n  </header>\n\n  <nav class=\"steps\" aria-label=\"\u00C9tapes de l\u2019import\">\n    <button type=\"button\" class=\"steps__item\"\n            [class.is-active]=\"step() === 'DEPOT'\"\n            (click)=\"goTo('DEPOT')\">\n      <span class=\"steps__num\">1</span> D\u00E9poser un fichier\n    </button>\n    <button type=\"button\" class=\"steps__item\"\n            [class.is-active]=\"step() === 'APERCU'\"\n            [disabled]=\"!preview() && !report()\"\n            (click)=\"goTo('APERCU')\">\n      <span class=\"steps__num\">2</span> V\u00E9rifier l\u2019aper\u00E7u\n    </button>\n    <button type=\"button\" class=\"steps__item\"\n            [class.is-active]=\"step() === 'HISTORIQUE'\"\n            (click)=\"goTo('HISTORIQUE')\">\n      <span class=\"steps__num\">3</span> Historique\n    </button>\n  </nav>\n\n  @if (!canImport()) {\n    <p class=\"notice notice--muted\">\n      Vous pouvez consulter cet \u00E9cran, mais l\u2019import demande l\u2019autorisation\n      \u00AB Ex\u00E9cuter les imports \u00BB. Demandez-la \u00E0 la direction.\n    </p>\n  }\n\n  <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 1. D\u00E9p\u00F4t -->\n  @if (step() === 'DEPOT') {\n    <div class=\"panel\">\n      <ol class=\"howto\">\n        <li>\n          <strong>T\u00E9l\u00E9chargez le mod\u00E8le.</strong>\n          Il porte les douze colonnes attendues, dans l\u2019ordre attendu.\n          <button type=\"button\" class=\"btn btn--ghost\" (click)=\"downloadTemplate()\">\n            T\u00E9l\u00E9charger le mod\u00E8le\n          </button>\n        </li>\n        <li>\n          <strong>Recopiez-y vos listes.</strong>\n          Passez la colonne \u00AB T\u00E9l\u00E9phone du responsable \u00BB au format Texte\n          avant de saisir : sinon le tableur r\u00E9\u00E9crit +225 07 11 22 33 en\n          nombre, et le num\u00E9ro d\u2019origine est perdu.\n        </li>\n        <li><strong>D\u00E9posez le fichier ci-dessous.</strong> Vous verrez un\n          aper\u00E7u avant toute \u00E9criture.</li>\n      </ol>\n\n      <div class=\"dropzone\"\n           [class.is-dragging]=\"dragging()\"\n           (dragover)=\"onDragOver($event)\"\n           (dragleave)=\"onDragLeave()\"\n           (drop)=\"onDrop($event)\">\n        @if (analysing()) {\n          <eduops-loading-state message=\"Lecture du fichier\u2026\" />\n        } @else {\n          <p class=\"dropzone__hint\">Glissez votre classeur ici</p>\n          <p class=\"dropzone__or\">ou</p>\n          <label class=\"btn btn--primary\" [class.is-disabled]=\"!canImport()\">\n            Choisir un fichier\n            <input type=\"file\" hidden\n                   accept=\".xlsx,.csv,.tsv\"\n                   [disabled]=\"!canImport()\"\n                   (change)=\"onFileSelected($event)\" />\n          </label>\n          <p class=\"dropzone__formats\">Formats accept\u00E9s : .xlsx, .csv</p>\n        }\n      </div>\n    </div>\n  }\n\n  <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 2. Aper\u00E7u -->\n  @if (step() === 'APERCU') {\n\n    @if (report(); as done) {\n      <div class=\"panel panel--done\">\n        <h2>Import termin\u00E9</h2>\n        <p>\n          {{ done.rows.length }} ligne(s) trait\u00E9e(s) depuis\n          <strong>{{ done.fileName }}</strong>.\n        </p>\n        @if (done.rows.length > 0) {\n          <ul class=\"refused\">\n            @for (row of done.rows; track row.rowNumber) {\n              @if (row.errors.length > 0) {\n                <li>\n                  Ligne {{ row.rowNumber }} refus\u00E9e :\n                  {{ row.errors.join(' ; ') }}\n                </li>\n              }\n            }\n          </ul>\n        }\n        <div class=\"actions\">\n          <button type=\"button\" class=\"btn btn--primary\" (click)=\"discard()\">\n            Importer un autre fichier\n          </button>\n          <button type=\"button\" class=\"btn btn--ghost\" (click)=\"goTo('HISTORIQUE')\">\n            Voir l\u2019historique\n          </button>\n        </div>\n      </div>\n    }\n\n    @if (preview(); as data) {\n      <div class=\"panel\">\n        <div class=\"summary\">\n          <p class=\"summary__file\">{{ data.fileName }}</p>\n          <ul class=\"summary__counts\">\n            <li class=\"count count--valid\">{{ data.validRows }} pr\u00EAte(s)</li>\n            <li class=\"count count--warning\">{{ data.warningRows }} \u00E0 v\u00E9rifier</li>\n            <li class=\"count count--duplicate\">{{ data.duplicateRows }} doublon(s)</li>\n            <li class=\"count count--invalid\">{{ data.invalidRows }} en erreur</li>\n          </ul>\n        </div>\n\n        @if (data.alreadyImportedAt) {\n          <p class=\"notice notice--danger\">\n            Ce fichier a d\u00E9j\u00E0 \u00E9t\u00E9 import\u00E9 le\n            {{ data.alreadyImportedAt | date:'dd/MM/yyyy \u00E0 HH:mm' }}\n            ({{ data.alreadyImportedRows }} \u00E9l\u00E8ve(s) cr\u00E9\u00E9s).\n            Confirmer une seconde fois cr\u00E9era chaque \u00E9l\u00E8ve en double.\n          </p>\n        }\n\n        @if (!data.importable) {\n          <p class=\"notice notice--danger\">\n            Aucune ligne n\u2019est importable en l\u2019\u00E9tat. Corrigez le fichier\n            et red\u00E9posez-le.\n          </p>\n        }\n\n        <div class=\"filters\" role=\"group\" aria-label=\"Filtrer les lignes\">\n          <button type=\"button\" [class.is-active]=\"rowFilter() === 'A_CORRIGER'\"\n                  (click)=\"filterRows('A_CORRIGER')\">\n            \u00C0 corriger ({{ toFixCount() }})\n          </button>\n          <button type=\"button\" [class.is-active]=\"rowFilter() === 'TOUT'\"\n                  (click)=\"filterRows('TOUT')\">\n            Toutes ({{ data.totalRows }})\n          </button>\n          <button type=\"button\" [class.is-active]=\"rowFilter() === 'INVALID'\"\n                  (click)=\"filterRows('INVALID')\">\n            En erreur ({{ data.invalidRows }})\n          </button>\n          <button type=\"button\" [class.is-active]=\"rowFilter() === 'DUPLICATE'\"\n                  (click)=\"filterRows('DUPLICATE')\">\n            Doublons ({{ data.duplicateRows }})\n          </button>\n        </div>\n\n        @if (visibleRows().length === 0) {\n          <p class=\"notice notice--muted\">\n            Aucune ligne dans ce filtre \u2014 c\u2019est plut\u00F4t bon signe.\n          </p>\n        } @else {\n          <div class=\"table-wrap\">\n            <table class=\"preview\">\n              <thead>\n                <tr>\n                  <th scope=\"col\">Ligne</th>\n                  <th scope=\"col\">\u00C9tat</th>\n                  @for (column of columns(); track column) {\n                    <th scope=\"col\">{{ column }}</th>\n                  }\n                  <th scope=\"col\">Remarques</th>\n                </tr>\n              </thead>\n              <tbody>\n                @for (row of pagedVisibleRows(); track row.rowNumber) {\n                  <tr [class]=\"'row row--' + statusTone(row.status)\">\n                    <td>{{ row.rowNumber }}</td>\n                    <td>\n                      <span [class]=\"'badge badge--' + statusTone(row.status)\">\n                        {{ statusLabel(row.status) }}\n                      </span>\n                    </td>\n                    @for (column of columns(); track column) {\n                      <td>{{ row.values[column] }}</td>\n                    }\n                    <td class=\"remarks\">\n                      @for (error of row.errors; track error) {\n                        <span class=\"remark remark--error\">{{ error }}</span>\n                      }\n                      @for (warning of row.warnings; track warning) {\n                        <span class=\"remark remark--warning\">{{ warning }}</span>\n                      }\n                    </td>\n                  </tr>\n                }\n              </tbody>\n            </table>\n          </div>\n          @if (visibleRows().length > pageSizeOptions[0]) {\n            <nav class=\"pager\" aria-label=\"Pagination de l'aper\u00E7u\">\n              <label class=\"pager__size\">\n                Lignes par page\n                <select [value]=\"previewPageSize()\" (change)=\"changePreviewPageSize($event)\">\n                  @for (size of pageSizeOptions; track size) {\n                    <option [value]=\"size\">{{ size }}</option>\n                  }\n                </select>\n              </label>\n              @if (previewTotalPages() > 1) {\n                <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                        [disabled]=\"previewPage() === 0\" (click)=\"previewPrevPage()\">\n                  Pr\u00E9c\u00E9dent\n                </button>\n                <span class=\"pager__state\">\n                  Lignes {{ previewFirstRow() }}\u2013{{ previewLastRow() }}\n                  sur {{ visibleRows().length }}\n                  \u2014 page {{ previewPage() + 1 }} / {{ previewTotalPages() }}\n                </span>\n                <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                        [disabled]=\"previewPage() >= previewTotalPages() - 1\" (click)=\"previewNextPage()\">\n                  Suivant\n                </button>\n              } @else {\n                <span class=\"pager__state\">\n                  {{ visibleRows().length }} ligne(s) affich\u00E9e(s)\n                </span>\n              }\n            </nav>\n          }\n        }\n\n        <div class=\"actions\">\n          <button type=\"button\" class=\"btn btn--primary\"\n                  [disabled]=\"!data.importable || confirming() || !canImport()\"\n                  (click)=\"confirm()\">\n            {{ confirming()\n              ? 'Import en cours\u2026'\n              : 'Cr\u00E9er ' + willCreate() + ' \u00E9l\u00E8ve(s)' }}\n          </button>\n          <button type=\"button\" class=\"btn btn--ghost\" (click)=\"discard()\">\n            Abandonner\n          </button>\n          <p class=\"actions__note\">\n            Abandonner n\u2019\u00E9crit rien : le fichier n\u2019a pas encore \u00E9t\u00E9 appliqu\u00E9.\n          </p>\n        </div>\n      </div>\n    }\n  }\n\n  <!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 3. Historique -->\n  @if (step() === 'HISTORIQUE') {\n    <div class=\"panel\">\n      @if (loadingHistory()) {\n        <eduops-loading-state message=\"Chargement de l\u2019historique\u2026\" />\n      } @else if (historyFailed()) {\n        <eduops-error-state\n          title=\"Historique indisponible\"\n          message=\"Les imports pass\u00E9s n\u2019ont pas pu \u00EAtre charg\u00E9s.\"\n          (retry)=\"loadHistory()\" />\n      } @else if (history().length === 0) {\n        <p class=\"notice notice--muted\">\n          Aucun import pour l\u2019instant. Le premier que vous confirmerez\n          appara\u00EEtra ici, avec son auteur et son r\u00E9sultat.\n        </p>\n      } @else {\n        <div class=\"table-wrap\">\n          <table class=\"history\">\n            <thead>\n              <tr>\n                <th scope=\"col\">Fichier</th>\n                <th scope=\"col\">Type</th>\n                <th scope=\"col\">D\u00E9pos\u00E9 par</th>\n                <th scope=\"col\">Le</th>\n                <th scope=\"col\">Cr\u00E9\u00E9s</th>\n                <th scope=\"col\">Ignor\u00E9s</th>\n                <th scope=\"col\">\u00C9tat</th>\n                <th scope=\"col\"><span class=\"sr-only\">D\u00E9tail</span></th>\n              </tr>\n            </thead>\n            <tbody>\n              @for (batch of history(); track batch.id) {\n                <tr>\n                  <td>{{ batch.fileName }}</td>\n                  <td>{{ batch.importTypeLabel }}</td>\n                  <td>{{ batch.uploadedByName ?? '\u2014' }}</td>\n                  <td>{{ batch.uploadedAt | date:'dd/MM/yyyy HH:mm' }}</td>\n                  <td>{{ batch.importedRows }}</td>\n                  <td>{{ batch.invalidRows + batch.duplicateRows }}</td>\n                  <td>\n                    <span [class]=\"'badge badge--' + batch.status.toLowerCase()\">\n                      {{ batch.statusLabel }}\n                    </span>\n                  </td>\n                  <td>\n                    <button type=\"button\" class=\"btn btn--link\"\n                            (click)=\"openBatch(batch)\">\n                      D\u00E9tail\n                    </button>\n                  </td>\n                </tr>\n              }\n            </tbody>\n          </table>\n        </div>\n      }\n    </div>\n  }\n\n  @if (openedBatch(); as batch) {\n    <div class=\"drawer\" role=\"dialog\" aria-modal=\"true\"\n         aria-labelledby=\"batch-title\">\n      <div class=\"drawer__panel\">\n        <header class=\"drawer__head\">\n          <h2 id=\"batch-title\">{{ batch.fileName }}</h2>\n          <button type=\"button\" class=\"btn btn--ghost\" (click)=\"closeBatch()\">\n            Fermer\n          </button>\n        </header>\n        <dl class=\"drawer__facts\">\n          <dt>D\u00E9pos\u00E9 par</dt><dd>{{ batch.uploadedByName ?? '\u2014' }}</dd>\n          <dt>Le</dt><dd>{{ batch.uploadedAt | date:'dd/MM/yyyy \u00E0 HH:mm' }}</dd>\n          <dt>Confirm\u00E9 par</dt><dd>{{ batch.confirmedByName ?? '\u2014' }}</dd>\n          <dt>Lignes lues</dt><dd>{{ batch.totalRows }}</dd>\n          <dt>\u00C9l\u00E8ves cr\u00E9\u00E9s</dt><dd>{{ batch.importedRows }}</dd>\n          <dt>Doublons ignor\u00E9s</dt><dd>{{ batch.duplicateRows }}</dd>\n          <dt>Lignes en erreur</dt><dd>{{ batch.invalidRows }}</dd>\n        </dl>\n        @if (batch.refusedRows.length > 0) {\n          <h3>Lignes refus\u00E9es \u00E0 l\u2019\u00E9criture</h3>\n          <ul class=\"refused\">\n            @for (row of batch.refusedRows; track row.rowNumber) {\n              <li>Ligne {{ row.rowNumber }} : {{ row.errors.join(' ; ') }}</li>\n            }\n          </ul>\n        } @else {\n          <p class=\"notice notice--muted\">\n            Aucune ligne refus\u00E9e \u00E0 l\u2019\u00E9criture.\n          </p>\n        }\n      </div>\n    </div>\n  }\n\n</section>\n", styles: [".imports {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.page-head {\n  h1 {\n    margin: 0 0 0.25rem;\n    font-size: 1.5rem;\n  }\n\n  p {\n    margin: 0;\n    color: var(--color-text-muted);\n    max-width: 62ch;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 \u00E9tapes */\n\n.steps {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n\n  &__item {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.5rem;\n    padding: 0.55rem 0.95rem;\n    border: 1px solid var(--color-border);\n    border-radius: 999px;\n    background: var(--color-surface);\n    color: var(--color-text);\n    font-size: 0.9rem;\n    cursor: pointer;\n\n    &:disabled {\n      opacity: 0.45;\n      cursor: not-allowed;\n    }\n\n    &.is-active {\n      border-color: var(--color-primary);\n      background: var(--color-primary-soft, rgba(37, 99, 235, 0.08));\n      color: var(--color-primary);\n      font-weight: 600;\n    }\n  }\n\n  &__num {\n    display: inline-grid;\n    place-items: center;\n    width: 1.35rem;\n    height: 1.35rem;\n    border-radius: 50%;\n    background: var(--color-border);\n    font-size: 0.75rem;\n    font-weight: 700;\n  }\n}\n\n.panel {\n  background: var(--color-surface);\n  border: 1px solid var(--color-border);\n  border-radius: 12px;\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n\n  &--done {\n    border-color: var(--color-success, #16a34a);\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 d\u00E9p\u00F4t */\n\n.howto {\n  margin: 0;\n  padding-left: 1.2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.7rem;\n  color: var(--color-text-muted);\n  max-width: 72ch;\n\n  strong {\n    color: var(--color-text);\n  }\n\n  .btn {\n    margin-left: 0.4rem;\n  }\n}\n\n.dropzone {\n  border: 2px dashed var(--color-border);\n  border-radius: 12px;\n  padding: 2.25rem 1rem;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n  transition: border-color 120ms ease, background 120ms ease;\n\n  &.is-dragging {\n    border-color: var(--color-primary);\n    background: var(--color-primary-soft, rgba(37, 99, 235, 0.06));\n  }\n\n  &__hint {\n    margin: 0;\n    font-size: 1.05rem;\n    font-weight: 600;\n  }\n\n  &__or,\n  &__formats {\n    margin: 0;\n    color: var(--color-text-muted);\n    font-size: 0.85rem;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 aper\u00E7u */\n\n.summary {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n\n  &__file {\n    margin: 0;\n    font-weight: 600;\n  }\n\n  &__counts {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    margin: 0;\n    padding: 0;\n    list-style: none;\n  }\n}\n\n.count {\n  padding: 0.25rem 0.6rem;\n  border-radius: 999px;\n  font-size: 0.82rem;\n  background: var(--color-border);\n\n  &--valid { background: rgba(22, 163, 74, 0.12); color: #15803d; }\n  &--warning { background: rgba(217, 119, 6, 0.14); color: #b45309; }\n  &--duplicate { background: rgba(100, 116, 139, 0.16); color: #475569; }\n  &--invalid { background: rgba(220, 38, 38, 0.12); color: #b91c1c; }\n}\n\n.filters {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n\n  button {\n    padding: 0.4rem 0.8rem;\n    border: 1px solid var(--color-border);\n    border-radius: 999px;\n    background: transparent;\n    color: var(--color-text-muted);\n    font-size: 0.85rem;\n    cursor: pointer;\n\n    &.is-active {\n      border-color: var(--color-primary);\n      color: var(--color-primary);\n      font-weight: 600;\n    }\n  }\n}\n\n.table-wrap {\n  overflow-x: auto;\n}\n\n.pager {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n  padding: 0.75rem 0.25rem 0;\n\n  &__state {\n    font-size: 0.82rem;\n    color: var(--color-text-muted);\n  }\n\n  &__size {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.4rem;\n    font-size: 0.82rem;\n    color: var(--color-text-muted);\n\n    select {\n      padding: 0.3rem 0.5rem;\n      font-size: 0.85rem;\n      color: var(--color-text);\n      background: var(--color-surface);\n      border: 1px solid var(--color-border);\n      border-radius: 6px;\n      cursor: pointer;\n    }\n  }\n}\n\ntable {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.88rem;\n\n  th,\n  td {\n    padding: 0.55rem 0.6rem;\n    text-align: left;\n    border-bottom: 1px solid var(--color-border);\n    vertical-align: top;\n    white-space: nowrap;\n  }\n\n  th {\n    font-weight: 600;\n    color: var(--color-text-muted);\n    font-size: 0.8rem;\n  }\n}\n\n.row {\n  /* La couleur double l'\u00E9tiquette, elle ne la remplace pas : un daltonien\n     lit \u00AB En erreur \u00BB m\u00EAme s'il ne distingue pas le fond. */\n  &--invalid { background: rgba(220, 38, 38, 0.05); }\n  &--duplicate { background: rgba(100, 116, 139, 0.06); }\n  &--warning { background: rgba(217, 119, 6, 0.05); }\n}\n\n.badge {\n  display: inline-block;\n  padding: 0.15rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background: var(--color-border);\n\n  &--valid, &--imported { background: rgba(22, 163, 74, 0.14); color: #15803d; }\n  &--warning, &--previewed { background: rgba(217, 119, 6, 0.16); color: #b45309; }\n  &--duplicate { background: rgba(100, 116, 139, 0.16); color: #475569; }\n  &--invalid, &--rejected { background: rgba(220, 38, 38, 0.14); color: #b91c1c; }\n}\n\n.remarks {\n  white-space: normal;\n  min-width: 18rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n\n.remark {\n  font-size: 0.8rem;\n\n  &--error { color: #b91c1c; }\n  &--warning { color: #b45309; }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 communs */\n\n.notice {\n  margin: 0;\n  padding: 0.7rem 0.9rem;\n  border-radius: 8px;\n  font-size: 0.88rem;\n\n  &--muted {\n    background: var(--color-surface-muted, rgba(100, 116, 139, 0.08));\n    color: var(--color-text-muted);\n  }\n\n  &--danger {\n    background: rgba(220, 38, 38, 0.08);\n    color: #b91c1c;\n    border: 1px solid rgba(220, 38, 38, 0.25);\n  }\n}\n\n.actions {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.6rem;\n\n  &__note {\n    margin: 0;\n    color: var(--color-text-muted);\n    font-size: 0.82rem;\n  }\n}\n\n.refused {\n  margin: 0;\n  padding-left: 1.1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  font-size: 0.85rem;\n  color: #b91c1c;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 tiroir */\n\n.drawer {\n  position: fixed;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.35);\n  display: flex;\n  justify-content: flex-end;\n  z-index: 40;\n\n  &__panel {\n    width: min(30rem, 100%);\n    height: 100%;\n    overflow-y: auto;\n    background: var(--color-surface);\n    padding: 1.25rem;\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.75rem;\n\n    h2 {\n      margin: 0;\n      font-size: 1.1rem;\n      overflow-wrap: anywhere;\n    }\n  }\n\n  &__facts {\n    display: grid;\n    grid-template-columns: auto 1fr;\n    gap: 0.35rem 1rem;\n    margin: 0;\n    font-size: 0.88rem;\n\n    dt {\n      color: var(--color-text-muted);\n    }\n\n    dd {\n      margin: 0;\n      font-weight: 600;\n    }\n  }\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  white-space: nowrap;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ImportsComponent, { className: "ImportsComponent", filePath: "frontend/src/app/features/imports/imports.component.ts", lineNumber: 52 }); })();
//# sourceMappingURL=imports.component.js.map