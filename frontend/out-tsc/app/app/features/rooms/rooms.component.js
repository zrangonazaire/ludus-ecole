import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingsComponent } from './buildings.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { ROOM_DATA_SOURCE } from '@core/datasource/data-source';
import { PERMISSIONS } from '@core/models/auth.models';
import { ROOM_TYPE_LABELS, ROOM_TYPE_ORDER } from '@core/models/room.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.key;
function RoomsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", ctx_r0.unknownCapacityCount(), " capacit\u00E9(s) \u00E0 renseigner ");
} }
function RoomsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 ", ctx_r0.occupiedCount(), " utilis\u00E9e(s) par l'emploi du temps ");
} }
function RoomsComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 20);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_12_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.openCreate()); });
    i0.ɵɵelementStart(1, "span", 21);
    i0.ɵɵtext(2, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Nouvelle salle ");
    i0.ɵɵelementEnd();
} }
function RoomsComponent_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const campus_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", campus_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", campus_r3.name, " (", campus_r3.code, ")");
} }
function RoomsComponent_For_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const building_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", building_r4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(building_r4);
} }
function RoomsComponent_For_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", type_r5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.typeLabel(type_r5));
} }
function RoomsComponent_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 17);
} }
function RoomsComponent_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 22);
    i0.ɵɵlistener("retry", function RoomsComponent_Conditional_48_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.load()); });
    i0.ɵɵelementEnd();
} }
function RoomsComponent_Conditional_49_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtext(1, "Aucune salle ne correspond \u00E0 ces filtres.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 26);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_49_Conditional_4_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.resetFilters()); });
    i0.ɵɵtext(3, " Effacer les filtres ");
    i0.ɵɵelementEnd();
} }
function RoomsComponent_Conditional_49_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtext(1, " D\u00E9clarez les salles de l'\u00E9tablissement pour que l'emploi du temps puisse les r\u00E9server et que les classes aient un lieu par d\u00E9faut. Chaque salle se rattache \u00E0 un campus. ");
    i0.ɵɵelementEnd();
} }
function RoomsComponent_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18)(1, "div", 23)(2, "h2", 24);
    i0.ɵɵtext(3, "Aucune salle");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, RoomsComponent_Conditional_49_Conditional_4_Template, 4, 0)(5, RoomsComponent_Conditional_49_Conditional_5_Template, 2, 0, "p", 25);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r0.campusFilter() || ctx_r0.buildingFilter() || ctx_r0.typeFilter() || ctx_r0.search() ? 4 : 5);
} }
function RoomsComponent_Conditional_50_For_2_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 33);
    i0.ɵɵtext(1, "capacit\u00E9 partielle");
    i0.ɵɵelementEnd();
} }
function RoomsComponent_Conditional_50_For_2_For_19_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const room_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", room_r8.floor, " ");
} }
function RoomsComponent_Conditional_50_For_2_For_19_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "em");
    i0.ɵɵtext(1, "\u00E0 mesurer");
    i0.ɵɵelementEnd();
} }
function RoomsComponent_Conditional_50_For_2_For_19_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 42);
    i0.ɵɵtext(1, "archiv\u00E9e");
    i0.ɵɵelementEnd();
} }
function RoomsComponent_Conditional_50_For_2_For_19_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 43);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const room_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.usageNote(room_r8));
} }
function RoomsComponent_Conditional_50_For_2_For_19_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 44);
    i0.ɵɵtext(1, "libre");
    i0.ɵɵelementEnd();
} }
function RoomsComponent_Conditional_50_For_2_For_19_Conditional_16_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 26);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_50_For_2_For_19_Conditional_16_Conditional_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const room_r8 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.restore(room_r8)); });
    i0.ɵɵtext(1, "Restaurer");
    i0.ɵɵelementEnd();
} }
function RoomsComponent_Conditional_50_For_2_For_19_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, RoomsComponent_Conditional_50_For_2_For_19_Conditional_16_Conditional_0_Template, 2, 0, "button", 46);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵconditional(ctx_r0.canManage() ? 0 : -1);
} }
function RoomsComponent_Conditional_50_For_2_For_19_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 47);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_50_For_2_For_19_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const room_r8 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.openEdit(room_r8)); });
    i0.ɵɵtext(1, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 48);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_50_For_2_For_19_Conditional_17_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r10); const room_r8 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.archive(room_r8)); });
    i0.ɵɵtext(3, "Archiver");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const room_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !room_r8.archivable)("title", room_r8.archivable ? "Archiver cette salle" : "Utilis\u00E9e par " + ctx_r0.usageNote(room_r8) + " : lib\u00E9rez-la d'abord");
} }
function RoomsComponent_Conditional_50_For_2_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "div", 37)(2, "h3", 38);
    i0.ɵɵtext(3);
    i0.ɵɵelementStart(4, "span", 39);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p", 40);
    i0.ɵɵtext(7);
    i0.ɵɵtemplate(8, RoomsComponent_Conditional_50_For_2_For_19_Conditional_8_Template, 1, 1);
    i0.ɵɵtext(9);
    i0.ɵɵtemplate(10, RoomsComponent_Conditional_50_For_2_For_19_Conditional_10_Template, 2, 0, "em");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 41);
    i0.ɵɵtemplate(12, RoomsComponent_Conditional_50_For_2_For_19_Conditional_12_Template, 2, 0, "span", 42)(13, RoomsComponent_Conditional_50_For_2_For_19_Conditional_13_Template, 2, 1, "span", 43)(14, RoomsComponent_Conditional_50_For_2_For_19_Conditional_14_Template, 2, 0, "span", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 45);
    i0.ɵɵtemplate(16, RoomsComponent_Conditional_50_For_2_For_19_Conditional_16_Template, 1, 1)(17, RoomsComponent_Conditional_50_For_2_For_19_Conditional_17_Template, 4, 2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const room_r8 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("room--archived", room_r8.status !== "ACTIVE");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", room_r8.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(room_r8.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.typeLabel(room_r8.roomType), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(room_r8.floor ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u00B7 ", room_r8.capacity, " place(s) ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(room_r8.capacity === 0 ? 10 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(room_r8.status !== "ACTIVE" ? 12 : ctx_r0.occupied(room_r8) ? 13 : 14);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(room_r8.status !== "ACTIVE" ? 16 : ctx_r0.canManage() ? 17 : -1);
} }
function RoomsComponent_Conditional_50_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 27)(1, "header", 28)(2, "div")(3, "h2", 29);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 30);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 31)(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10, " salle(s) ");
    i0.ɵɵelementStart(11, "span", 32);
    i0.ɵɵtext(12, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(15, " place(s) ");
    i0.ɵɵtemplate(16, RoomsComponent_Conditional_50_For_2_Conditional_16_Template, 2, 0, "span", 33);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 34);
    i0.ɵɵrepeaterCreate(18, RoomsComponent_Conditional_50_For_2_For_19_Template, 18, 10, "div", 35, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const group_r11 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(group_r11.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(group_r11.campusLabel);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(group_r11.rooms.length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(group_r11.seats);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(group_r11.unknownCapacity ? 16 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(group_r11.rooms);
} }
function RoomsComponent_Conditional_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 19);
    i0.ɵɵrepeaterCreate(1, RoomsComponent_Conditional_50_For_2_Template, 20, 5, "article", 27, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.groups());
} }
function RoomsComponent_Conditional_51_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 54);
    i0.ɵɵtext(1, " Aucun campus disponible. Les salles se rattachent \u00E0 un campus : cr\u00E9ez-en un depuis \u00AB Campus et salles \u00BB, ou demandez \u00E0 un administrateur de vous en ouvrir la lecture. ");
    i0.ɵɵelementEnd();
} }
function RoomsComponent_Conditional_51_For_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const campus_r13 = ctx.$implicit;
    i0.ɵɵproperty("value", campus_r13.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", campus_r13.name, " (", campus_r13.code, ")");
} }
function RoomsComponent_Conditional_51_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 60);
    i0.ɵɵtext(1, "Saisissez un code de salle (lettres, chiffres, tirets).");
    i0.ɵɵelementEnd();
} }
function RoomsComponent_Conditional_51_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 60);
    i0.ɵɵtext(1, "Le nom de la salle est obligatoire.");
    i0.ɵɵelementEnd();
} }
function RoomsComponent_Conditional_51_For_38_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const building_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("value", building_r14.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(building_r14.name);
} }
function RoomsComponent_Conditional_51_For_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, RoomsComponent_Conditional_51_For_38_Conditional_0_Template, 2, 2, "option", 14);
} if (rf & 2) {
    const building_r14 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(building_r14.campusId === ctx_r0.form.controls.campusId.value ? 0 : -1);
} }
function RoomsComponent_Conditional_51_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 59);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("Ancienne saisie conserv\u00E9e : ", ctx_r0.form.controls.building.value, " \u00B7 ", ctx_r0.form.controls.floor.value, "");
} }
function RoomsComponent_Conditional_51_For_47_Conditional_0_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r15 = ctx.$implicit;
    i0.ɵɵproperty("value", level_r15.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(level_r15.label);
} }
function RoomsComponent_Conditional_51_For_47_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, RoomsComponent_Conditional_51_For_47_Conditional_0_For_1_Template, 2, 2, "option", 14, _forTrack0);
} if (rf & 2) {
    const building_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵrepeater(building_r16.levels);
} }
function RoomsComponent_Conditional_51_For_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, RoomsComponent_Conditional_51_For_47_Conditional_0_Template, 2, 0);
} if (rf & 2) {
    const building_r16 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(building_r16.id === ctx_r0.form.controls.buildingId.value && building_r16.campusId === ctx_r0.form.controls.campusId.value ? 0 : -1);
} }
function RoomsComponent_Conditional_51_For_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r17 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", type_r17);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.typeLabel(type_r17));
} }
function RoomsComponent_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 49);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_51_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closePanel()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 50)(2, "header", 51)(3, "h2", 52);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 26);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_51_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closePanel()); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 53);
    i0.ɵɵlistener("ngSubmit", function RoomsComponent_Conditional_51_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submit()); });
    i0.ɵɵtemplate(8, RoomsComponent_Conditional_51_Conditional_8_Template, 2, 0, "p", 54);
    i0.ɵɵelementStart(9, "div", 55)(10, "label", 10)(11, "span", 56);
    i0.ɵɵtext(12, "Campus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "select", 57);
    i0.ɵɵlistener("change", function RoomsComponent_Conditional_51_Template_select_change_13_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.resetLocation()); });
    i0.ɵɵelementStart(14, "option", 13);
    i0.ɵɵtext(15, "Choisir un campus");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(16, RoomsComponent_Conditional_51_For_17_Template, 2, 3, "option", 14, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "label", 10)(19, "span", 56);
    i0.ɵɵtext(20, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "input", 58);
    i0.ɵɵelementStart(22, "span", 59);
    i0.ɵɵtext(23, "Lettres, chiffres et tirets. Unique dans le campus.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(24, RoomsComponent_Conditional_51_Conditional_24_Template, 2, 0, "span", 60);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "label", 10)(26, "span", 56);
    i0.ɵɵtext(27, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(28, "input", 61);
    i0.ɵɵtemplate(29, RoomsComponent_Conditional_51_Conditional_29_Template, 2, 0, "span", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 55)(31, "label", 10)(32, "span", 11);
    i0.ɵɵtext(33, "B\u00E2timent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "select", 62);
    i0.ɵɵlistener("change", function RoomsComponent_Conditional_51_Template_select_change_34_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.selectBuilding()); });
    i0.ɵɵelementStart(35, "option", 13);
    i0.ɵɵtext(36, "Sans b\u00E2timent affect\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(37, RoomsComponent_Conditional_51_For_38_Template, 1, 1, null, null, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(39, RoomsComponent_Conditional_51_Conditional_39_Template, 2, 2, "span", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "label", 10)(41, "span", 11);
    i0.ɵɵtext(42, "\u00C9tage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "select", 63)(44, "option", 13);
    i0.ɵɵtext(45, "Choisir un niveau");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(46, RoomsComponent_Conditional_51_For_47_Template, 1, 1, null, null, _forTrack0);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(48, "div", 55)(49, "label", 10)(50, "span", 11);
    i0.ɵɵtext(51, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "select", 64);
    i0.ɵɵrepeaterCreate(53, RoomsComponent_Conditional_51_For_54_Template, 2, 2, "option", 14, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(55, "label", 10)(56, "span", 11);
    i0.ɵɵtext(57, "Capacit\u00E9 (places)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(58, "input", 65);
    i0.ɵɵelementStart(59, "span", 59);
    i0.ɵɵtext(60, "0 = capacit\u00E9 non mesur\u00E9e.");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(61, "footer", 66)(62, "button", 5);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_51_Template_button_click_62_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closePanel()); });
    i0.ɵɵtext(63, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "button", 67);
    i0.ɵɵlistener("click", function RoomsComponent_Conditional_51_Template_button_click_64_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submit()); });
    i0.ɵɵtext(65);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.formTitle());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.campuses().length === 0 ? 8 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r0.campuses());
    i0.ɵɵadvance(8);
    i0.ɵɵconditional(ctx_r0.form.controls.code.touched && ctx_r0.form.controls.code.invalid ? 24 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r0.form.controls.name.touched && ctx_r0.form.controls.name.invalid ? 29 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r0.registeredBuildings());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r0.form.controls.buildingId.value && ctx_r0.form.controls.building.value ? 39 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r0.registeredBuildings());
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r0.roomTypes());
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("disabled", ctx_r0.form.invalid || ctx_r0.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.saving() ? "Enregistrement\u2026" : ctx_r0.editing() ? "Enregistrer" : "Cr\u00E9er la salle", " ");
} }
/**
 * Bâtiments et salles : ce que l'emploi du temps réserve et ce qu'un élève
 * traverse dans une journée.
 *
 * <p>Les bâtiments se créent indépendamment des salles. Pour conserver les
 * anciens libellés libres, l'écran regroupe encore les salles par leur nom de bâtiment.
 * La question à laquelle cet écran
 * répond est « combien de places assises ai-je, et où » — d'où les totaux par
 * bâtiment et le comptage des salles dont la capacité n'est pas renseignée.</p>
 */
export class RoomsComponent {
    dataSource = inject(ROOM_DATA_SOURCE);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    rooms = signal([]);
    registeredBuildings = signal([]);
    campuses = signal([]);
    roomTypes = signal([...ROOM_TYPE_ORDER]);
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    includeArchived = signal(false);
    campusFilter = signal('');
    buildingFilter = signal('');
    typeFilter = signal('');
    search = signal('');
    editing = signal(null);
    creating = signal(false);
    canManage = computed(() => this.auth.has(PERMISSIONS.ROOM_MANAGE));
    showForm = computed(() => this.creating() || this.editing() !== null);
    formTitle = computed(() => {
        const current = this.editing();
        return current ? `Modifier ${current.name}` : 'Nouvelle salle';
    });
    form = this.fb.nonNullable.group({
        buildingId: [''],
        levelId: [''],
        campusId: ['', [Validators.required]],
        code: ['', [Validators.required, Validators.maxLength(30),
                Validators.pattern(/^[a-zA-Z0-9-]+$/)]],
        name: ['', [Validators.required, Validators.maxLength(120)]],
        building: ['', [Validators.maxLength(120)]],
        floor: ['', [Validators.maxLength(30)]],
        capacity: [0, [Validators.min(0)]],
        roomType: this.fb.nonNullable.control('CLASSROOM', [Validators.required])
    });
    /** Salles actives affichées, et places assises qu'elles représentent. */
    activeRooms = computed(() => this.rooms().filter((room) => room.status === 'ACTIVE'));
    totalSeats = computed(() => this.activeRooms().reduce((sum, room) => sum + room.capacity, 0));
    /** Salles dont la capacité reste à mesurer : un total partiel doit se dire. */
    unknownCapacityCount = computed(() => this.activeRooms().filter((room) => room.capacity === 0).length);
    occupiedCount = computed(() => this.activeRooms().filter((room) => this.occupied(room)).length);
    /** Noms de bâtiments déjà saisis, pour le filtre (sans doublon). */
    buildings = computed(() => {
        const names = this.rooms()
            .map((room) => room.building?.trim())
            .filter((name) => !!name);
        return [...new Set(names)].sort((a, b) => a.localeCompare(b, 'fr'));
    });
    /**
     * Les salles groupées par campus puis par bâtiment.
     *
     * <p>« Sans bâtiment » est un groupe à part entière et non un fourre-tout
     * rangé en fin de liste : c'est souvent le gymnase ou la cour, et le taire
     * ferait croire que ces salles ont été perdues.</p>
     */
    groups = computed(() => {
        const buckets = new Map();
        for (const room of this.rooms()) {
            const building = room.building?.trim() || undefined;
            const key = room.campusId + '::' + (building ?? '');
            const bucket = buckets.get(key)
                ?? { campusLabel: room.campusName + ' · ' + room.campusCode, building, rooms: [] };
            bucket.rooms.push(room);
            buckets.set(key, bucket);
        }
        return [...buckets.entries()]
            .map(([key, bucket]) => ({
            key,
            label: bucket.building ?? 'Sans bâtiment',
            campusLabel: bucket.campusLabel,
            rooms: bucket.rooms,
            seats: bucket.rooms.reduce((sum, room) => sum + room.capacity, 0),
            unknownCapacity: bucket.rooms.some((room) => room.capacity === 0)
        }))
            .sort((a, b) => a.campusLabel.localeCompare(b.campusLabel, 'fr')
            || (a.label === 'Sans bâtiment' ? 1 : b.label === 'Sans bâtiment' ? -1 : 0)
            || a.label.localeCompare(b.label, 'fr'));
    });
    ngOnInit() {
        this.loadOptions();
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.list({
            campusId: this.campusFilter() || undefined,
            building: this.buildingFilter() || undefined,
            roomType: this.typeFilter() || undefined,
            search: this.search() || undefined,
            includeArchived: this.includeArchived()
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (list) => {
                this.rooms.set(list);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    /**
     * Campus et types de salle pour les listes déroulantes.
     *
     * <p>Un échec n'est pas bloquant : les types ont une valeur par défaut
     * locale, et seul le formulaire de création a vraiment besoin des campus.
     * Il le signale lui-même quand la liste est vide.</p>
     */
    loadOptions() {
        this.dataSource.options().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (options) => {
                this.campuses.set(options.campuses);
                if (options.roomTypes.length > 0) {
                    this.roomTypes.set(options.roomTypes);
                }
            },
            error: () => this.campuses.set([])
        });
    }
    setCampusFilter(value) {
        this.campusFilter.set(value);
        this.load();
    }
    setBuildingFilter(value) {
        this.buildingFilter.set(value);
        this.load();
    }
    setTypeFilter(value) {
        this.typeFilter.set(value);
        this.load();
    }
    setSearch(value) {
        this.search.set(value);
        this.load();
    }
    toggleArchived() {
        this.includeArchived.update((value) => !value);
        this.load();
    }
    resetFilters() {
        this.campusFilter.set('');
        this.buildingFilter.set('');
        this.typeFilter.set('');
        this.search.set('');
        this.load();
    }
    /** Vrai quand l'emploi du temps ou une classe s'appuie sur la salle. */
    occupied(room) {
        return room.timetableSlotCount > 0 || room.defaultClassroomCount > 0;
    }
    typeLabel(type) {
        return ROOM_TYPE_LABELS[type] ?? type;
    }
    /** Phrase unique expliquant pourquoi une salle ne peut pas être archivée. */
    usageNote(room) {
        const parts = [];
        if (room.timetableSlotCount > 0) {
            parts.push(`${room.timetableSlotCount} cours`);
        }
        if (room.defaultClassroomCount > 0) {
            parts.push(`${room.defaultClassroomCount} classe(s) par défaut`);
        }
        return parts.join(' · ');
    }
    openCreate() {
        this.editing.set(null);
        this.creating.set(true);
        this.form.reset({
            // Le campus courant du filtre est le bon candidat par défaut : on crée
            // presque toujours une salle là où l'on vient de regarder.
            campusId: this.campusFilter() || this.campuses()[0]?.id || '',
            code: '',
            name: '',
            building: this.buildingFilter() || '',
            floor: '',
            capacity: 0,
            roomType: 'CLASSROOM'
        });
    }
    openEdit(room) {
        this.creating.set(false);
        this.editing.set(room);
        this.form.reset({
            buildingId: room.buildingId ?? '',
            levelId: room.levelId ?? '',
            campusId: room.campusId,
            code: room.code,
            name: room.name,
            building: room.building ?? '',
            floor: room.floor ?? '',
            capacity: room.capacity,
            roomType: room.roomType
        });
    }
    closePanel() {
        if (this.saving()) {
            return;
        }
        this.editing.set(null);
        this.creating.set(false);
    }
    resetLocation() {
        this.form.patchValue({ buildingId: '', levelId: '', building: '', floor: '' });
    }
    selectBuilding() {
        this.form.patchValue({ levelId: '', building: '', floor: '' });
    }
    submit() {
        if (this.form.controls.buildingId.value && !this.form.controls.levelId.value) {
            this.notifications.error('Choisissez un niveau dans ce bâtiment.');
            return;
        }
        if (this.form.invalid || this.saving()) {
            this.form.markAllAsTouched();
            return;
        }
        const current = this.editing();
        const value = this.form.getRawValue();
        const payload = {
            levelId: value.levelId || undefined,
            campusId: value.campusId,
            code: value.code.trim().toUpperCase(),
            name: value.name.trim(),
            building: value.building.trim() || undefined,
            floor: value.floor.trim() || undefined,
            capacity: Number(value.capacity) || 0,
            roomType: value.roomType
        };
        this.saving.set(true);
        const request = current
            ? this.dataSource.update(current.id, payload)
            : this.dataSource.create(payload);
        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (room) => {
                this.notifications.success(current ? `${room.name} est à jour.` : `${room.name} peut maintenant être réservée.`, current ? 'Salle modifiée' : 'Salle créée');
                this.afterWrite();
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    archive(room) {
        this.dataSource.archive(room.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.notifications.success(`${room.name} n'apparaît plus dans les choix de l'emploi du temps.`, 'Salle archivée');
                this.load();
            },
            error: (err) => this.explain(err)
        });
    }
    restore(room) {
        this.dataSource.restore(room.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => this.load(),
            error: (err) => this.explain(err)
        });
    }
    afterWrite() {
        this.saving.set(false);
        this.closePanel();
        this.load();
    }
    explain(err) {
        const code = err?.error?.code;
        if (code) {
            this.notifications.error(translateErrorCode(code), 'Action refusée');
        }
    }
    static ɵfac = function RoomsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RoomsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RoomsComponent, selectors: [["eduops-rooms"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 52, vars: 9, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary"], [1, "lead"], [3, "changed", "campuses"], [1, "filters", "card"], [1, "field"], [1, "field__label"], [1, "select", 3, "change"], ["value", ""], [3, "value"], ["type", "search", "placeholder", "Nom, code, b\u00E2timent", 1, "input", 3, "change"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", "filters__reset", 3, "click"], ["message", "Chargement des salles..."], [1, "card"], [1, "groups"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], [3, "retry"], [1, "card__body"], [1, "empty__title"], [1, "empty__text"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], [1, "group", "card"], [1, "group__head"], [1, "group__title"], [1, "group__meta", "numeric"], [1, "group__totals", "numeric"], [1, "muted"], [1, "badge", "badge--warning", "badge--pill"], [1, "group__rooms"], [1, "room", 3, "room--archived"], [1, "room"], [1, "room__identity"], [1, "room__name"], [1, "muted", "numeric"], [1, "room__sub", "numeric"], [1, "room__usage"], [1, "badge", "badge--neutral", "badge--pill"], [1, "badge", "badge--info", "badge--pill", "numeric"], [1, "badge", "badge--success", "badge--pill"], [1, "room__side"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled", "title"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "room-form-title", 1, "drawer"], [1, "drawer__head"], ["id", "room-form-title"], [1, "drawer__body", 3, "ngSubmit", "formGroup"], [1, "hint-block"], [1, "grid2"], [1, "field__label", "field__label--required"], ["formControlName", "campusId", 1, "select", 3, "change"], ["formControlName", "code", "maxlength", "30", "placeholder", "A-101", "autocomplete", "off", 1, "input"], [1, "field__hint"], [1, "field__error"], ["formControlName", "name", "maxlength", "120", "placeholder", "Salle A 101", "autocomplete", "off", 1, "input"], ["formControlName", "buildingId", 1, "select", 3, "change"], ["formControlName", "levelId", 1, "select"], ["formControlName", "roomType", 1, "select"], ["type", "number", "min", "0", "step", "1", "formControlName", "capacity", 1, "input", "numeric"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"]], template: function RoomsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "B\u00E2timents et salles");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6);
            i0.ɵɵtemplate(7, RoomsComponent_Conditional_7_Template, 1, 1)(8, RoomsComponent_Conditional_8_Template, 1, 1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4)(10, "button", 5);
            i0.ɵɵlistener("click", function RoomsComponent_Template_button_click_10_listener() { return ctx.toggleArchived(); });
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(12, RoomsComponent_Conditional_12_Template, 4, 0, "button", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "p", 7);
            i0.ɵɵtext(14, " Une salle appartient \u00E0 un campus et se rep\u00E8re par son b\u00E2timent et son \u00E9tage. C'est ce que l'emploi du temps r\u00E9serve et ce que les classes prennent par d\u00E9faut. La capacit\u00E9 compte les places assises : laissez 0 si elle n'a pas encore \u00E9t\u00E9 mesur\u00E9e, les totaux le signaleront. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "eduops-buildings", 8);
            i0.ɵɵlistener("changed", function RoomsComponent_Template_eduops_buildings_changed_15_listener($event) { return ctx.registeredBuildings.set($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 9)(17, "label", 10)(18, "span", 11);
            i0.ɵɵtext(19, "Campus");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "select", 12);
            i0.ɵɵlistener("change", function RoomsComponent_Template_select_change_20_listener($event) { return ctx.setCampusFilter($event.target.value); });
            i0.ɵɵelementStart(21, "option", 13);
            i0.ɵɵtext(22, "Tous les campus");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(23, RoomsComponent_For_24_Template, 2, 3, "option", 14, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "label", 10)(26, "span", 11);
            i0.ɵɵtext(27, "B\u00E2timent");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "select", 12);
            i0.ɵɵlistener("change", function RoomsComponent_Template_select_change_28_listener($event) { return ctx.setBuildingFilter($event.target.value); });
            i0.ɵɵelementStart(29, "option", 13);
            i0.ɵɵtext(30, "Tous les b\u00E2timents");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(31, RoomsComponent_For_32_Template, 2, 2, "option", 14, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "label", 10)(34, "span", 11);
            i0.ɵɵtext(35, "Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "select", 12);
            i0.ɵɵlistener("change", function RoomsComponent_Template_select_change_36_listener($event) { return ctx.setTypeFilter($event.target.value); });
            i0.ɵɵelementStart(37, "option", 13);
            i0.ɵɵtext(38, "Tous les types");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(39, RoomsComponent_For_40_Template, 2, 2, "option", 14, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "label", 10)(42, "span", 11);
            i0.ɵɵtext(43, "Recherche");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "input", 15);
            i0.ɵɵlistener("change", function RoomsComponent_Template_input_change_44_listener($event) { return ctx.setSearch($event.target.value); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "button", 16);
            i0.ɵɵlistener("click", function RoomsComponent_Template_button_click_45_listener() { return ctx.resetFilters(); });
            i0.ɵɵtext(46, " R\u00E9initialiser ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(47, RoomsComponent_Conditional_47_Template, 1, 0, "eduops-loading-state", 17)(48, RoomsComponent_Conditional_48_Template, 1, 0, "eduops-error-state")(49, RoomsComponent_Conditional_49_Template, 6, 1, "div", 18)(50, RoomsComponent_Conditional_50_Template, 3, 0, "section", 19)(51, RoomsComponent_Conditional_51_Template, 66, 8);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate2(" ", ctx.activeRooms().length, " salle(s) active(s) \u00B7 ", ctx.totalSeats(), " place(s) ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.unknownCapacityCount() > 0 ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.occupiedCount() > 0 ? 8 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.includeArchived() ? "Masquer les archiv\u00E9es" : "Voir les archiv\u00E9es", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.canManage() ? 12 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("campuses", ctx.campuses());
            i0.ɵɵadvance(8);
            i0.ɵɵrepeater(ctx.campuses());
            i0.ɵɵadvance(8);
            i0.ɵɵrepeater(ctx.buildings());
            i0.ɵɵadvance(8);
            i0.ɵɵrepeater(ctx.roomTypes());
            i0.ɵɵadvance(8);
            i0.ɵɵconditional(ctx.loading() ? 47 : ctx.error() ? 48 : ctx.rooms().length === 0 ? 49 : 50);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.showForm() ? 51 : -1);
        } }, dependencies: [CommonModule, BuildingsComponent, ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.MinValidator, i1.FormGroupDirective, i1.FormControlName, LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.lead[_ngcontent-%COMP%] {\n  max-width: 760px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n\n\n\n.filters[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  align-items: end;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  margin-bottom: var(--space-4);\n\n  .field { margin-bottom: 0; }\n\n  &__reset {\n    justify-self: start;\n    align-self: end;\n  }\n}\n\n.groups[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n}\n\n.group[_ngcontent-%COMP%] {\n  overflow: hidden;\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title {\n    margin: 0;\n    font-size: var(--text-md);\n    font-family: var(--font-display);\n    color: var(--text-strong);\n  }\n\n  &__meta {\n    margin: 2px 0 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n\n  &__totals {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    flex: none;\n    font-variant-numeric: tabular-nums;\n  }\n\n  &__rooms {\n    display: flex;\n    flex-direction: column;\n  }\n}\n\n.room[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-5);\n\n  & + .room { border-top: 1px solid var(--border-light); }\n\n  &--archived {\n    opacity: 0.6;\n\n    .room__name { text-decoration: line-through; }\n  }\n\n  &__identity {\n    min-width: 0;\n    flex: 1;\n  }\n\n  &__name {\n    margin: 0;\n    font-size: var(--text-base);\n    color: var(--text-normal);\n  }\n\n  &__sub {\n    margin: 2px 0 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n\n    em { color: var(--warning); font-style: normal; font-weight: 600; }\n  }\n\n  &__usage { flex: none; }\n\n  &__side {\n    display: flex;\n    align-items: center;\n    gap: var(--space-1);\n    flex: none;\n  }\n}\n\n.empty[_ngcontent-%COMP%] {\n  &__title {\n    margin: 0;\n    font-size: var(--text-md);\n  }\n  &__text {\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    max-width: 620px;\n  }\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.grid2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.muted[_ngcontent-%COMP%] {\n  margin-left: var(--space-2);\n  font-size: var(--text-xs);\n  color: var(--text-light);\n}\n\n.numeric[_ngcontent-%COMP%] { font-variant-numeric: tabular-nums; }\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgb(15 23 42 / 0.45);\n  z-index: var(--z-modal-backdrop);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n\n    h2 { margin: 0; font-size: var(--text-md); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-3);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RoomsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-rooms', standalone: true, imports: [CommonModule, BuildingsComponent, ReactiveFormsModule, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">B\u00E2timents et salles</h1>\n      <p class=\"page__meta numeric\">\n        {{ activeRooms().length }} salle(s) active(s) \u00B7 {{ totalSeats() }} place(s)\n        @if (unknownCapacityCount() > 0) {\n          \u00B7 {{ unknownCapacityCount() }} capacit\u00E9(s) \u00E0 renseigner\n        }\n        @if (occupiedCount() > 0) {\n          \u00B7 {{ occupiedCount() }} utilis\u00E9e(s) par l'emploi du temps\n        }\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      <button type=\"button\" class=\"btn btn--secondary\" (click)=\"toggleArchived()\">\n        {{ includeArchived() ? 'Masquer les archiv\u00E9es' : 'Voir les archiv\u00E9es' }}\n      </button>\n      @if (canManage()) {\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openCreate()\">\n          <span aria-hidden=\"true\">+</span> Nouvelle salle\n        </button>\n      }\n    </div>\n  </header>\n\n  <p class=\"lead\">\n    Une salle appartient \u00E0 un campus et se rep\u00E8re par son b\u00E2timent et son \u00E9tage.\n    C'est ce que l'emploi du temps r\u00E9serve et ce que les classes prennent par\n    d\u00E9faut. La capacit\u00E9 compte les places assises : laissez 0 si elle n'a pas\n    encore \u00E9t\u00E9 mesur\u00E9e, les totaux le signaleront.\n  </p>\n\n  <eduops-buildings [campuses]=\"campuses()\" (changed)=\"registeredBuildings.set($event)\" />\n\n  <div class=\"filters card\">\n    <label class=\"field\">\n      <span class=\"field__label\">Campus</span>\n      <select class=\"select\" (change)=\"setCampusFilter($any($event.target).value)\">\n        <option value=\"\">Tous les campus</option>\n        @for (campus of campuses(); track campus.id) {\n          <option [value]=\"campus.id\">{{ campus.name }} ({{ campus.code }})</option>\n        }\n      </select>\n    </label>\n    <label class=\"field\">\n      <span class=\"field__label\">B\u00E2timent</span>\n      <select class=\"select\" (change)=\"setBuildingFilter($any($event.target).value)\">\n        <option value=\"\">Tous les b\u00E2timents</option>\n        @for (building of buildings(); track building) {\n          <option [value]=\"building\">{{ building }}</option>\n        }\n      </select>\n    </label>\n    <label class=\"field\">\n      <span class=\"field__label\">Type</span>\n      <select class=\"select\" (change)=\"setTypeFilter($any($event.target).value)\">\n        <option value=\"\">Tous les types</option>\n        @for (type of roomTypes(); track type) {\n          <option [value]=\"type\">{{ typeLabel(type) }}</option>\n        }\n      </select>\n    </label>\n    <label class=\"field\">\n      <span class=\"field__label\">Recherche</span>\n      <input class=\"input\" type=\"search\" placeholder=\"Nom, code, b\u00E2timent\"\n             (change)=\"setSearch($any($event.target).value)\" />\n    </label>\n    <button type=\"button\" class=\"btn btn--ghost btn--sm filters__reset\" (click)=\"resetFilters()\">\n      R\u00E9initialiser\n    </button>\n  </div>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des salles...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else if (rooms().length === 0) {\n    <div class=\"card\">\n      <div class=\"card__body\">\n        <h2 class=\"empty__title\">Aucune salle</h2>\n        @if (campusFilter() || buildingFilter() || typeFilter() || search()) {\n          <p class=\"empty__text\">Aucune salle ne correspond \u00E0 ces filtres.</p>\n          <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"resetFilters()\">\n            Effacer les filtres\n          </button>\n        } @else {\n          <p class=\"empty__text\">\n            D\u00E9clarez les salles de l'\u00E9tablissement pour que l'emploi du temps\n            puisse les r\u00E9server et que les classes aient un lieu par d\u00E9faut.\n            Chaque salle se rattache \u00E0 un campus.\n          </p>\n        }\n      </div>\n    </div>\n  } @else {\n    <section class=\"groups\">\n      @for (group of groups(); track group.key) {\n        <article class=\"group card\">\n          <header class=\"group__head\">\n            <div>\n              <h2 class=\"group__title\">{{ group.label }}</h2>\n              <p class=\"group__meta numeric\">{{ group.campusLabel }}</p>\n            </div>\n            <div class=\"group__totals numeric\">\n              <strong>{{ group.rooms.length }}</strong> salle(s)\n              <span class=\"muted\">\u00B7</span>\n              <strong>{{ group.seats }}</strong> place(s)\n              @if (group.unknownCapacity) {\n                <span class=\"badge badge--warning badge--pill\">capacit\u00E9 partielle</span>\n              }\n            </div>\n          </header>\n          <div class=\"group__rooms\">\n            @for (room of group.rooms; track room.id) {\n              <div class=\"room\" [class.room--archived]=\"room.status !== 'ACTIVE'\">\n                <div class=\"room__identity\">\n                  <h3 class=\"room__name\">\n                    {{ room.name }}\n                    <span class=\"muted numeric\">{{ room.code }}</span>\n                  </h3>\n                  <p class=\"room__sub numeric\">\n                    {{ typeLabel(room.roomType) }}\n                    @if (room.floor) { \u00B7 {{ room.floor }} }\n                    \u00B7 {{ room.capacity }} place(s)\n                    @if (room.capacity === 0) { <em>\u00E0 mesurer</em> }\n                  </p>\n                </div>\n                <div class=\"room__usage\">\n                  @if (room.status !== 'ACTIVE') {\n                    <span class=\"badge badge--neutral badge--pill\">archiv\u00E9e</span>\n                  } @else if (occupied(room)) {\n                    <span class=\"badge badge--info badge--pill numeric\">{{ usageNote(room) }}</span>\n                  } @else {\n                    <span class=\"badge badge--success badge--pill\">libre</span>\n                  }\n                </div>\n                <div class=\"room__side\">\n                  @if (room.status !== 'ACTIVE') {\n                    @if (canManage()) {\n                      <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                              (click)=\"restore(room)\">Restaurer</button>\n                    }\n                  } @else if (canManage()) {\n                    <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                            (click)=\"openEdit(room)\">Modifier</button>\n                    <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                            [disabled]=\"!room.archivable\"\n                            [title]=\"room.archivable\n                              ? 'Archiver cette salle'\n                              : 'Utilis\u00E9e par ' + usageNote(room) + ' : lib\u00E9rez-la d\\'abord'\"\n                            (click)=\"archive(room)\">Archiver</button>\n                  }\n                </div>\n              </div>\n            }\n          </div>\n        </article>\n      }\n    </section>\n  }\n\n  @if (showForm()) {\n    <div class=\"drawer-backdrop\" (click)=\"closePanel()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"room-form-title\">\n      <header class=\"drawer__head\">\n        <h2 id=\"room-form-title\">{{ formTitle() }}</h2>\n        <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"closePanel()\">\u2715</button>\n      </header>\n      <form class=\"drawer__body\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        @if (campuses().length === 0) {\n          <p class=\"hint-block\">\n            Aucun campus disponible. Les salles se rattachent \u00E0 un campus :\n            cr\u00E9ez-en un depuis \u00AB Campus et salles \u00BB, ou demandez \u00E0 un\n            administrateur de vous en ouvrir la lecture.\n          </p>\n        }\n        <div class=\"grid2\">\n          <label class=\"field\">\n            <span class=\"field__label field__label--required\">Campus</span>\n            <select class=\"select\" formControlName=\"campusId\" (change)=\"resetLocation()\">\n              <option value=\"\">Choisir un campus</option>\n              @for (campus of campuses(); track campus.id) {\n                <option [value]=\"campus.id\">{{ campus.name }} ({{ campus.code }})</option>\n              }\n            </select>\n          </label>\n          <label class=\"field\">\n            <span class=\"field__label field__label--required\">Code</span>\n            <input class=\"input\" formControlName=\"code\" maxlength=\"30\"\n                   placeholder=\"A-101\" autocomplete=\"off\" />\n            <span class=\"field__hint\">Lettres, chiffres et tirets. Unique dans le campus.</span>\n            @if (form.controls.code.touched && form.controls.code.invalid) {\n              <span class=\"field__error\">Saisissez un code de salle (lettres, chiffres, tirets).</span>\n            }\n          </label>\n        </div>\n\n        <label class=\"field\">\n          <span class=\"field__label field__label--required\">Nom</span>\n          <input class=\"input\" formControlName=\"name\" maxlength=\"120\"\n                 placeholder=\"Salle A 101\" autocomplete=\"off\" />\n          @if (form.controls.name.touched && form.controls.name.invalid) {\n            <span class=\"field__error\">Le nom de la salle est obligatoire.</span>\n          }\n        </label>\n\n        <div class=\"grid2\">\n          <label class=\"field\">\n            <span class=\"field__label\">B\u00E2timent</span>\n            <select class=\"select\" formControlName=\"buildingId\" (change)=\"selectBuilding()\">\n              <option value=\"\">Sans b\u00E2timent affect\u00E9</option>\n              @for (building of registeredBuildings(); track building.id) {\n                @if (building.campusId === form.controls.campusId.value) { <option [value]=\"building.id\">{{ building.name }}</option> }\n              }\n            </select>\n            @if (!form.controls.buildingId.value && form.controls.building.value) {\n              <span class=\"field__hint\">Ancienne saisie conserv\u00E9e : {{ form.controls.building.value }} \u00B7 {{ form.controls.floor.value }}</span>\n            }\n          </label>\n          <label class=\"field\">\n            <span class=\"field__label\">\u00C9tage</span>\n            <select class=\"select\" formControlName=\"levelId\">\n              <option value=\"\">Choisir un niveau</option>\n              @for (building of registeredBuildings(); track building.id) {\n                @if (building.id === form.controls.buildingId.value && building.campusId === form.controls.campusId.value) {\n                  @for (level of building.levels; track level.id) { <option [value]=\"level.id\">{{ level.label }}</option> }\n                }\n              }\n            </select>\n          </label>\n        </div>\n\n        <div class=\"grid2\">\n          <label class=\"field\">\n            <span class=\"field__label\">Type</span>\n            <select class=\"select\" formControlName=\"roomType\">\n              @for (type of roomTypes(); track type) {\n                <option [value]=\"type\">{{ typeLabel(type) }}</option>\n              }\n            </select>\n          </label>\n          <label class=\"field\">\n            <span class=\"field__label\">Capacit\u00E9 (places)</span>\n            <input class=\"input numeric\" type=\"number\" min=\"0\" step=\"1\"\n                   formControlName=\"capacity\" />\n            <span class=\"field__hint\">0 = capacit\u00E9 non mesur\u00E9e.</span>\n          </label>\n        </div>\n      </form>\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closePanel()\">Annuler</button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"form.invalid || saving()\" (click)=\"submit()\">\n          {{ saving() ? 'Enregistrement\u2026' : (editing() ? 'Enregistrer' : 'Cr\u00E9er la salle') }}\n        </button>\n      </footer>\n    </aside>\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n.lead {\n  max-width: 760px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n/* Filtres : une ligne d'outils, pas un formulaire. Les libell\u00E9s restent\n   au-dessus des champs pour que la barre se replie proprement sur mobile. */\n.filters {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  align-items: end;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  margin-bottom: var(--space-4);\n\n  .field { margin-bottom: 0; }\n\n  &__reset {\n    justify-self: start;\n    align-self: end;\n  }\n}\n\n.groups {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n}\n\n.group {\n  overflow: hidden;\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title {\n    margin: 0;\n    font-size: var(--text-md);\n    font-family: var(--font-display);\n    color: var(--text-strong);\n  }\n\n  &__meta {\n    margin: 2px 0 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n\n  &__totals {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    flex: none;\n    font-variant-numeric: tabular-nums;\n  }\n\n  &__rooms {\n    display: flex;\n    flex-direction: column;\n  }\n}\n\n.room {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-5);\n\n  & + .room { border-top: 1px solid var(--border-light); }\n\n  &--archived {\n    opacity: 0.6;\n\n    .room__name { text-decoration: line-through; }\n  }\n\n  &__identity {\n    min-width: 0;\n    flex: 1;\n  }\n\n  &__name {\n    margin: 0;\n    font-size: var(--text-base);\n    color: var(--text-normal);\n  }\n\n  &__sub {\n    margin: 2px 0 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n\n    em { color: var(--warning); font-style: normal; font-weight: 600; }\n  }\n\n  &__usage { flex: none; }\n\n  &__side {\n    display: flex;\n    align-items: center;\n    gap: var(--space-1);\n    flex: none;\n  }\n}\n\n.empty {\n  &__title {\n    margin: 0;\n    font-size: var(--text-md);\n  }\n  &__text {\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    max-width: 620px;\n  }\n}\n\n.hint-block {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.grid2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.muted {\n  margin-left: var(--space-2);\n  font-size: var(--text-xs);\n  color: var(--text-light);\n}\n\n.numeric { font-variant-numeric: tabular-nums; }\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgb(15 23 42 / 0.45);\n  z-index: var(--z-modal-backdrop);\n}\n\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n\n    h2 { margin: 0; font-size: var(--text-md); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-3);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RoomsComponent, { className: "RoomsComponent", filePath: "frontend/src/app/features/rooms/rooms.component.ts", lineNumber: 38 }); })();
//# sourceMappingURL=rooms.component.js.map