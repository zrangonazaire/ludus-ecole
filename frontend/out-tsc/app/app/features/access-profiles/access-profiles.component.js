import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ACCESS_PROFILE_DATA_SOURCE } from '@core/datasource/data-source';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.module;
const _forTrack2 = ($index, $item) => $item.code;
function AccessProfilesComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 6);
    i0.ɵɵtext(1, "G\u00E9rer les utilisateurs");
    i0.ɵɵelementEnd();
} }
function AccessProfilesComponent_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 16);
} }
function AccessProfilesComponent_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 18);
    i0.ɵɵlistener("retry", function AccessProfilesComponent_Conditional_33_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function AccessProfilesComponent_Conditional_34_For_2_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 32);
    i0.ɵɵlistener("click", function AccessProfilesComponent_Conditional_34_For_2_Conditional_26_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const profile_r5 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openEdit(profile_r5)); });
    i0.ɵɵtext(1, "Modifier les droits");
    i0.ɵɵelementEnd();
} }
function AccessProfilesComponent_Conditional_34_For_2_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 32);
    i0.ɵɵlistener("click", function AccessProfilesComponent_Conditional_34_For_2_Conditional_27_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const profile_r5 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openEdit(profile_r5)); });
    i0.ɵɵtext(1, "Voir les droits");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 33);
    i0.ɵɵlistener("click", function AccessProfilesComponent_Conditional_34_For_2_Conditional_27_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r6); const profile_r5 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.duplicate(profile_r5)); });
    i0.ɵɵtext(3, "Cr\u00E9er une copie personnalis\u00E9e");
    i0.ɵɵelementEnd();
} }
function AccessProfilesComponent_Conditional_34_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 21)(1, "header", 22)(2, "div", 23);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 24)(5, "div", 25)(6, "h2");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 26);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "code");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "p", 27);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "dl", 28)(15, "div")(16, "dt");
    i0.ɵɵtext(17, "Permissions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "dd", 29);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div")(21, "dt");
    i0.ɵɵtext(22, "Comptes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "dd", 29);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "footer", 30);
    i0.ɵɵtemplate(26, AccessProfilesComponent_Conditional_34_For_2_Conditional_26_Template, 2, 0, "button", 31)(27, AccessProfilesComponent_Conditional_34_For_2_Conditional_27_Template, 4, 0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const profile_r5 = ctx.$implicit;
    i0.ɵɵclassProp("profile-card--custom", !profile_r5.systemProfile);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", profile_r5.label.charAt(0).toLocaleUpperCase("fr"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(profile_r5.label);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("badge--custom", !profile_r5.systemProfile);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", profile_r5.systemProfile ? "Syst\u00E8me" : "Personnalis\u00E9", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(profile_r5.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", profile_r5.description || "Profil personnalis\u00E9 de votre \u00E9tablissement.", " ");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(profile_r5.permissionCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(profile_r5.userCount);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(profile_r5.editable ? 26 : 27);
} }
function AccessProfilesComponent_Conditional_34_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20)(1, "p", 34);
    i0.ɵɵtext(2, "Aucun profil ne correspond \u00E0 cette recherche.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 33);
    i0.ɵɵlistener("click", function AccessProfilesComponent_Conditional_34_ForEmpty_3_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.search.set("")); });
    i0.ɵɵtext(4, " Effacer la recherche ");
    i0.ɵɵelementEnd()();
} }
function AccessProfilesComponent_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 17);
    i0.ɵɵrepeaterCreate(1, AccessProfilesComponent_Conditional_34_For_2_Template, 28, 12, "article", 19, _forTrack0, false, AccessProfilesComponent_Conditional_34_ForEmpty_3_Template, 5, 0, "div", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.visibleProfiles());
} }
function AccessProfilesComponent_Conditional_35_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 41);
    i0.ɵɵtext(1, "Ce profil syst\u00E8me est commun aux \u00E9tablissements. Cr\u00E9ez une copie personnalis\u00E9e pour adapter ses permissions, puis attribuez cette copie aux comptes concern\u00E9s dans Utilisateurs.");
    i0.ɵɵelementEnd();
} }
function AccessProfilesComponent_Conditional_35_Conditional_12_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Les modifications s\u2019appliqueront aux ", ctx.userCount, " compte(s) utilisant ce profil.");
} }
function AccessProfilesComponent_Conditional_35_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AccessProfilesComponent_Conditional_35_Conditional_12_Conditional_0_Template, 2, 1, "p", 41);
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional((tmp_2_0 = ctx_r1.editing()) ? 0 : -1, tmp_2_0);
} }
function AccessProfilesComponent_Conditional_35_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 45);
    i0.ɵɵtext(1, "Le nom du profil est obligatoire.");
    i0.ɵɵelementEnd();
} }
function AccessProfilesComponent_Conditional_35_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 45);
    i0.ɵɵtext(1, "Saisissez un code valide et unique.");
    i0.ɵɵelementEnd();
} }
function AccessProfilesComponent_Conditional_35_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 41);
    i0.ɵɵtext(1, "S\u00E9lectionnez au moins une permission.");
    i0.ɵɵelementEnd();
} }
function AccessProfilesComponent_Conditional_35_For_41_For_10_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 63)(1, "input", 64);
    i0.ɵɵlistener("change", function AccessProfilesComponent_Conditional_35_For_41_For_10_Template_input_change_1_listener() { const permission_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.togglePermission(permission_r11.code)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "code");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const permission_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.viewing() || ctx_r1.saving())("checked", ctx_r1.selectedPermissions().has(permission_r11.code));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(permission_r11.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(permission_r11.code);
} }
function AccessProfilesComponent_Conditional_35_For_41_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 55)(1, "header", 60)(2, "label")(3, "input", 61);
    i0.ɵɵlistener("change", function AccessProfilesComponent_Conditional_35_For_41_Template_input_change_3_listener() { const group_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleGroup(group_r9.items)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 29);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 62);
    i0.ɵɵrepeaterCreate(9, AccessProfilesComponent_Conditional_35_For_41_For_10_Template, 7, 4, "label", 63, _forTrack2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const group_r9 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("checked", ctx_r1.groupSelected(group_r9.items))("disabled", ctx_r1.viewing() || ctx_r1.saving());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(group_r9.module);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", group_r9.items.length, " droit", group_r9.items.length > 1 ? "s" : "", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(group_r9.items);
} }
function AccessProfilesComponent_Conditional_35_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function AccessProfilesComponent_Conditional_35_Conditional_45_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.duplicate(ctx_r1.editing())); });
    i0.ɵɵtext(1, "Cr\u00E9er une copie personnalis\u00E9e");
    i0.ɵɵelementEnd();
} }
function AccessProfilesComponent_Conditional_35_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 65);
    i0.ɵɵlistener("click", function AccessProfilesComponent_Conditional_35_Conditional_46_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r1.profileForm.invalid || ctx_r1.selectedPermissions().size === 0 || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Enregistrement\u2026" : ctx_r1.editing() ? "Enregistrer" : "Cr\u00E9er le profil", " ");
} }
function AccessProfilesComponent_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵlistener("click", function AccessProfilesComponent_Conditional_35_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 36)(2, "header", 37)(3, "div")(4, "p", 2);
    i0.ɵɵtext(5, "Profil d\u2019acc\u00E8s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 38);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 39);
    i0.ɵɵlistener("click", function AccessProfilesComponent_Conditional_35_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "form", 40);
    i0.ɵɵlistener("ngSubmit", function AccessProfilesComponent_Conditional_35_Template_form_ngSubmit_10_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵtemplate(11, AccessProfilesComponent_Conditional_35_Conditional_11_Template, 2, 0, "p", 41)(12, AccessProfilesComponent_Conditional_35_Conditional_12_Template, 1, 1);
    i0.ɵɵelementStart(13, "div", 42)(14, "label", 43);
    i0.ɵɵtext(15, "Nom du profil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "input", 44);
    i0.ɵɵlistener("input", function AccessProfilesComponent_Conditional_35_Template_input_input_16_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onLabelInput($event.target.value)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, AccessProfilesComponent_Conditional_35_Conditional_17_Template, 2, 0, "span", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 42)(19, "label", 46);
    i0.ɵɵtext(20, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "input", 47);
    i0.ɵɵlistener("blur", function AccessProfilesComponent_Conditional_35_Template_input_blur_21_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.normaliseCodeInput()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span", 48);
    i0.ɵɵtext(23, "Majuscules, chiffres et tirets bas uniquement.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(24, AccessProfilesComponent_Conditional_35_Conditional_24_Template, 2, 0, "span", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 42)(26, "label", 49);
    i0.ɵɵtext(27, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(28, "textarea", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "section", 51)(30, "div", 52)(31, "div")(32, "h3");
    i0.ɵɵtext(33, "Permissions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "p");
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "strong", 53);
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(38, AccessProfilesComponent_Conditional_35_Conditional_38_Template, 2, 0, "p", 41);
    i0.ɵɵelementStart(39, "div", 54);
    i0.ɵɵrepeaterCreate(40, AccessProfilesComponent_Conditional_35_For_41_Template, 11, 5, "section", 55, _forTrack1);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(42, "footer", 56)(43, "button", 57);
    i0.ɵɵlistener("click", function AccessProfilesComponent_Conditional_35_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(45, AccessProfilesComponent_Conditional_35_Conditional_45_Template, 2, 0, "button", 58)(46, AccessProfilesComponent_Conditional_35_Conditional_46_Template, 2, 2, "button", 59);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.viewing() ? "Droits du profil syst\u00E8me" : ctx_r1.editing() ? "Modifier le profil" : "Cr\u00E9er un profil", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.profileForm);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.viewing() ? 11 : 12);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r1.profileForm.controls.label.touched && ctx_r1.profileForm.controls.label.invalid ? 17 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵconditional(ctx_r1.profileForm.controls.code.touched && ctx_r1.profileForm.controls.code.invalid ? 24 : -1);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r1.viewing() ? "Permissions incluses dans ce profil." : "Choisissez pr\u00E9cis\u00E9ment ce que ce profil pourra faire.");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.selectedPermissions().size);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.selectedPermissions().size === 0 ? 38 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.permissionGroups());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.viewing() ? "Fermer" : "Annuler");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.viewing() ? 45 : 46);
} }
/** Gestion des profils d'accès : un profil est un ensemble nommé de permissions. */
export class AccessProfilesComponent {
    auth = inject(AuthService);
    dataSource = inject(ACCESS_PROFILE_DATA_SOURCE);
    notifications = inject(NotificationService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    profiles = signal([]);
    permissions = signal([]);
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    search = signal('');
    editing = signal(null);
    panelOpen = signal(false);
    viewing = signal(false);
    selectedPermissions = signal(new Set());
    profileForm = this.fb.nonNullable.group({
        label: ['', [Validators.required, Validators.maxLength(150)]],
        code: ['', [Validators.required, Validators.maxLength(60),
                Validators.pattern(/^[A-Z0-9_]+$/)]],
        description: ['', [Validators.maxLength(500)]]
    });
    visibleProfiles = computed(() => {
        const needle = this.search().trim().toLocaleLowerCase('fr');
        if (!needle) {
            return this.profiles();
        }
        return this.profiles().filter((profile) => [profile.label, profile.code, profile.description ?? '']
            .some((value) => value.toLocaleLowerCase('fr').includes(needle)));
    });
    customCount = computed(() => this.profiles().filter((profile) => !profile.systemProfile).length);
    permissionGroups = computed(() => {
        const groups = new Map();
        this.permissions().forEach((permission) => {
            const items = groups.get(permission.module) ?? [];
            items.push(permission);
            groups.set(permission.module, items);
        });
        return Array.from(groups.entries()).map(([module, items]) => ({ module, items }));
    });
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.overview().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (overview) => {
                this.profiles.set(overview.profiles);
                this.permissions.set(overview.permissions);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    openCreate() {
        this.viewing.set(false);
        this.profileForm.enable();
        this.editing.set(null);
        this.profileForm.reset({ label: '', code: '', description: '' });
        this.selectedPermissions.set(new Set());
        this.panelOpen.set(true);
    }
    openEdit(profile) {
        this.viewing.set(!profile.editable);
        this.profileForm.enable();
        this.editing.set(profile);
        this.profileForm.reset({
            label: profile.label,
            code: profile.code,
            description: profile.description ?? ''
        });
        this.selectedPermissions.set(new Set(profile.permissionCodes));
        if (!profile.editable)
            this.profileForm.disable();
        this.panelOpen.set(true);
    }
    duplicate(profile) {
        this.openCreate();
        const base = `${profile.code.slice(0, 45)}_COPIE`;
        let code = base;
        let suffix = 2;
        while (this.profiles().some(item => item.code === code))
            code = `${base}_${suffix++}`;
        this.profileForm.reset({
            label: `${profile.label.slice(0, 125)} (copie)`, code,
            description: profile.description ?? ''
        });
        this.selectedPermissions.set(new Set(profile.permissionCodes));
    }
    closePanel() {
        if (this.saving()) {
            return;
        }
        this.panelOpen.set(false);
        this.editing.set(null);
    }
    onLabelInput(value) {
        if (!this.editing() && !this.profileForm.controls.code.dirty) {
            this.profileForm.controls.code.setValue(this.normaliseCode(value));
        }
    }
    normaliseCodeInput() {
        this.profileForm.controls.code.setValue(this.normaliseCode(this.profileForm.controls.code.value));
    }
    togglePermission(code) {
        if (this.viewing() || this.saving())
            return;
        this.selectedPermissions.update((current) => {
            const next = new Set(current);
            next.has(code) ? next.delete(code) : next.add(code);
            return next;
        });
    }
    toggleGroup(items) {
        if (this.viewing() || this.saving())
            return;
        const allSelected = items.every((item) => this.selectedPermissions().has(item.code));
        this.selectedPermissions.update((current) => {
            const next = new Set(current);
            items.forEach((item) => allSelected ? next.delete(item.code) : next.add(item.code));
            return next;
        });
    }
    groupSelected(items) {
        return items.length > 0
            && items.every((item) => this.selectedPermissions().has(item.code));
    }
    submit() {
        if (this.viewing())
            return;
        if (this.profileForm.invalid || this.selectedPermissions().size === 0 || this.saving()) {
            this.profileForm.markAllAsTouched();
            return;
        }
        this.saving.set(true);
        const value = this.profileForm.getRawValue();
        const payload = {
            label: value.label.trim(),
            code: this.normaliseCode(value.code),
            description: value.description.trim() || undefined,
            permissionCodes: Array.from(this.selectedPermissions()).sort()
        };
        const current = this.editing();
        const request = current
            ? this.dataSource.update(current.id, payload)
            : this.dataSource.create(payload);
        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (profile) => {
                this.notifications.success(current ? `${profile.label} est à jour.` : `${profile.label} peut maintenant être attribué.`, current ? 'Profil modifié' : 'Profil créé');
                this.panelOpen.set(false);
                this.editing.set(null);
                this.saving.set(false);
                this.load();
            },
            error: () => this.saving.set(false)
        });
    }
    normaliseCode(value) {
        return value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    }
    static ɵfac = function AccessProfilesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccessProfilesComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccessProfilesComponent, selectors: [["eduops-access-profiles"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 36, vars: 6, consts: [[1, "page"], [1, "page__header"], [1, "eyebrow"], [1, "page__title"], [1, "page__meta"], [1, "page__actions"], ["routerLink", "/users", 1, "btn", "btn--secondary"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], [1, "intro", "card"], ["aria-hidden", "true", 1, "intro__icon"], [1, "toolbar"], [1, "search-field"], [1, "visually-hidden"], ["type", "search", "placeholder", "Rechercher un profil\u2026", 1, "input", 3, "input", "value"], [1, "toolbar__hint"], ["message", "Chargement des profils\u2026"], ["aria-label", "Liste des profils d\u2019acc\u00E8s", 1, "profile-grid"], [3, "retry"], [1, "profile-card", "card", 3, "profile-card--custom"], [1, "empty", "card"], [1, "profile-card", "card"], [1, "profile-card__head"], ["aria-hidden", "true", 1, "profile-card__mark"], [1, "profile-card__identity"], [1, "profile-card__title-row"], [1, "badge"], [1, "profile-card__description"], [1, "profile-card__stats"], [1, "numeric"], [1, "profile-card__foot"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], [1, "empty__title"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "profile-form-title", 1, "drawer"], [1, "drawer__head"], ["id", "profile-form-title", 1, "drawer__title"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "drawer__body", 3, "ngSubmit", "formGroup"], [1, "permission-warning"], [1, "field"], ["for", "profile-label", 1, "field__label", "field__label--required"], ["id", "profile-label", "formControlName", "label", "placeholder", "Ex. Surveillant g\u00E9n\u00E9ral", 1, "input", 3, "input"], [1, "field__error"], ["for", "profile-code", 1, "field__label", "field__label--required"], ["id", "profile-code", "formControlName", "code", "placeholder", "SURVEILLANT_GENERAL", 1, "input", "input--code", 3, "blur"], [1, "field__hint"], ["for", "profile-description", 1, "field__label"], ["id", "profile-description", "formControlName", "description", "rows", "2", "placeholder", "\u00C0 qui ce profil est-il destin\u00E9 ?", 1, "textarea"], [1, "permission-section"], [1, "permission-section__head"], [1, "permission-count", "numeric"], [1, "permission-groups"], [1, "permission-group"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary"], ["type", "button", 1, "btn", "btn--primary", 3, "disabled"], [1, "permission-group__head"], ["type", "checkbox", 3, "change", "checked", "disabled"], [1, "permission-group__items"], [1, "permission-item"], ["type", "checkbox", 3, "change", "disabled", "checked"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"]], template: function AccessProfilesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "Personnel et acc\u00E8s");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 3);
            i0.ɵɵtext(6, "Profils d\u2019acc\u00E8s");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 5);
            i0.ɵɵtemplate(10, AccessProfilesComponent_Conditional_10_Template, 2, 0, "a", 6);
            i0.ɵɵelementStart(11, "button", 7);
            i0.ɵɵlistener("click", function AccessProfilesComponent_Template_button_click_11_listener() { return ctx.openCreate(); });
            i0.ɵɵelementStart(12, "span", 8);
            i0.ɵɵtext(13, "+");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(14, " Cr\u00E9er un profil ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "section", 9)(16, "div", 10);
            i0.ɵɵtext(17, "\u25CE");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div")(19, "h2");
            i0.ɵɵtext(20, "Un profil regroupe les droits d\u2019un m\u00E9tier");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "p");
            i0.ɵɵtext(22, " Cr\u00E9ez par exemple un profil \u00AB Surveillant \u00BB ou \u00AB Responsable cantine \u00BB, puis attribuez-le aux comptes concern\u00E9s. Les profils syst\u00E8me restent prot\u00E9g\u00E9s. ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(23, "div", 11)(24, "label", 12)(25, "span", 13);
            i0.ɵɵtext(26, "Rechercher un profil");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "span", 8);
            i0.ɵɵtext(28, "\u2315");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "input", 14);
            i0.ɵɵlistener("input", function AccessProfilesComponent_Template_input_input_29_listener($event) { return ctx.search.set($event.target.value); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "span", 15);
            i0.ɵɵtext(31, "Les profils syst\u00E8me sont fournis par Soocloo.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(32, AccessProfilesComponent_Conditional_32_Template, 1, 0, "eduops-loading-state", 16)(33, AccessProfilesComponent_Conditional_33_Template, 1, 0, "eduops-error-state")(34, AccessProfilesComponent_Conditional_34_Template, 4, 1, "section", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(35, AccessProfilesComponent_Conditional_35_Template, 47, 10);
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate2(" ", ctx.profiles().length, " profil(s), dont ", ctx.customCount(), " cr\u00E9\u00E9(s) par votre \u00E9tablissement ");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.auth.has("USER_MANAGE") ? 10 : -1);
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("value", ctx.search());
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.loading() ? 32 : ctx.error() ? 33 : 34);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.panelOpen() ? 35 : -1);
        } }, dependencies: [CommonModule, RouterLink, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  color: var(--brand);\n  font-size: var(--text-xs);\n  font-weight: 800;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n}\n\n.intro[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-4) var(--space-5);\n  margin-bottom: var(--space-5);\n  background: linear-gradient(135deg, var(--brand-tint), var(--surface-card) 72%);\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 42px;\n    height: 42px;\n    color: var(--text-on-brand);\n    font-size: 1.35rem;\n    background: var(--brand);\n    border-radius: 13px;\n  }\n\n  h2 { margin: 0; font-size: var(--text-md); }\n  p { margin: 3px 0 0; color: var(--text-muted); font-size: var(--text-sm); }\n}\n\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  margin-bottom: var(--space-4);\n\n  &__hint { color: var(--text-light); font-size: var(--text-xs); }\n}\n\n.search-field[_ngcontent-%COMP%] {\n  position: relative;\n  display: block;\n  width: min(100%, 360px);\n\n  > span:not(.visually-hidden) {\n    position: absolute;\n    z-index: 1;\n    left: 12px;\n    top: 50%;\n    color: var(--text-light);\n    transform: translateY(-50%);\n  }\n\n  .input { width: 100%; padding-left: 34px; }\n}\n\n.profile-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));\n  gap: var(--space-4);\n}\n\n.profile-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-height: 260px;\n  overflow: hidden;\n  transition: transform var(--transition-fast), box-shadow var(--transition-fast);\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0 auto 0 0;\n    width: 3px;\n    background: var(--border);\n  }\n\n  &--custom::before { background: var(--brand); }\n  &:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    gap: var(--space-3);\n    padding: var(--space-5) var(--space-5) var(--space-3);\n  }\n\n  &__mark {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 40px;\n    height: 40px;\n    color: var(--brand);\n    font: 800 var(--text-md) var(--font-display);\n    background: var(--brand-tint);\n    border-radius: 12px;\n  }\n\n  &__identity { min-width: 0; flex: 1; }\n\n  &__title-row {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex-wrap: wrap;\n\n    h2 { margin: 0; font-size: var(--text-md); }\n  }\n\n  code { color: var(--text-light); font-size: .68rem; }\n\n  &__description {\n    flex: 1;\n    margin: 0;\n    padding: 0 var(--space-5) var(--space-4);\n    color: var(--text-muted);\n    font-size: var(--text-sm);\n    line-height: var(--leading-relaxed);\n  }\n\n  &__stats {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    margin: 0 var(--space-5) var(--space-4);\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n\n    div + div { border-left: 1px solid var(--border); padding-left: var(--space-3); }\n    dt { color: var(--text-light); font-size: var(--text-xs); }\n    dd { margin: 2px 0 0; color: var(--text-strong); font-size: var(--text-lg); font-weight: 750; }\n  }\n\n  &__foot {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-2);\n    align-items: center;\n    min-height: 54px;\n    padding: var(--space-3) var(--space-5);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n.badge[_ngcontent-%COMP%] {\n  padding: 2px 7px;\n  color: var(--text-light);\n  font-size: .65rem;\n  font-weight: 700;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-pill);\n\n  &--custom { color: var(--brand); background: var(--brand-tint); }\n}\n\n.locked[_ngcontent-%COMP%] { color: var(--text-light); font-size: var(--text-xs); }\n\n.empty[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  padding: var(--space-10);\n  text-align: center;\n\n  &__title { color: var(--text-muted); }\n}\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: var(--z-modal-backdrop);\n  inset: 0;\n  background: rgba(9, 25, 44, .4);\n  backdrop-filter: blur(2px);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: var(--z-modal);\n  inset: 0 0 0 auto;\n  display: flex;\n  flex-direction: column;\n  width: min(620px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-xl);\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__title { margin: 0; font-size: var(--text-xl); }\n\n  &__close {\n    padding: 0;\n    color: var(--text-muted);\n    font-size: 1.6rem;\n    line-height: 1;\n    background: none;\n    border: 0;\n    cursor: pointer;\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.input--code[_ngcontent-%COMP%] { font-family: var(--font-mono); text-transform: uppercase; }\n.field__error[_ngcontent-%COMP%] { display: block; margin-top: 4px; color: var(--danger); font-size: var(--text-xs); }\n\n.permission-section[_ngcontent-%COMP%] {\n  padding-top: var(--space-2);\n  border-top: 1px solid var(--border-light);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    margin-bottom: var(--space-3);\n\n    h3 { margin: 0; font-size: var(--text-md); }\n    p { margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); }\n  }\n}\n\n.permission-count[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  min-width: 34px;\n  height: 28px;\n  color: var(--brand);\n  background: var(--brand-tint);\n  border-radius: var(--radius-pill);\n}\n\n.permission-warning[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-3);\n  padding: var(--space-2) var(--space-3);\n  color: var(--warning);\n  font-size: var(--text-xs);\n  background: var(--warning-bg);\n  border-radius: var(--radius-input);\n}\n\n.permission-groups[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); }\n\n.permission-group[_ngcontent-%COMP%] {\n  border: 1px solid var(--border);\n  border-radius: var(--radius-input);\n  overflow: hidden;\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n\n    label { display: flex; align-items: center; gap: var(--space-2); cursor: pointer; }\n    span { color: var(--text-light); font-size: var(--text-xs); }\n  }\n\n  &__items {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 1px;\n    background: var(--border-light);\n  }\n}\n\n.permission-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-2);\n  min-width: 0;\n  padding: var(--space-3);\n  background: var(--surface-card);\n  cursor: pointer;\n\n  &:hover { background: var(--surface-hover); }\n  input { margin-top: 3px; }\n  span { min-width: 0; }\n  strong { display: block; font-size: var(--text-xs); font-weight: 600; }\n  code { display: block; overflow: hidden; color: var(--text-light); font-size: .6rem; text-overflow: ellipsis; }\n}\n\n@include mobile {\n  .intro { align-items: flex-start; }\n  .toolbar { align-items: stretch; flex-direction: column; }\n  .search-field { width: 100%; }\n  .profile-grid { grid-template-columns: 1fr; }\n  .permission-group__items { grid-template-columns: 1fr; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccessProfilesComponent, [{
        type: Component,
        args: [{ selector: 'eduops-access-profiles', standalone: true, imports: [CommonModule, RouterLink, ReactiveFormsModule, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <p class=\"eyebrow\">Personnel et acc\u00E8s</p>\n      <h1 class=\"page__title\">Profils d\u2019acc\u00E8s</h1>\n      <p class=\"page__meta\">\n        {{ profiles().length }} profil(s), dont {{ customCount() }} cr\u00E9\u00E9(s) par votre \u00E9tablissement\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      @if (auth.has('USER_MANAGE')) {\n        <a class=\"btn btn--secondary\" routerLink=\"/users\">G\u00E9rer les utilisateurs</a>\n      }\n      <button type=\"button\" class=\"btn btn--primary\" (click)=\"openCreate()\">\n        <span aria-hidden=\"true\">+</span> Cr\u00E9er un profil\n      </button>\n    </div>\n  </header>\n\n  <section class=\"intro card\">\n    <div class=\"intro__icon\" aria-hidden=\"true\">\u25CE</div>\n    <div>\n      <h2>Un profil regroupe les droits d\u2019un m\u00E9tier</h2>\n      <p>\n        Cr\u00E9ez par exemple un profil \u00AB Surveillant \u00BB ou \u00AB Responsable cantine \u00BB, puis\n        attribuez-le aux comptes concern\u00E9s. Les profils syst\u00E8me restent prot\u00E9g\u00E9s.\n      </p>\n    </div>\n  </section>\n\n  <div class=\"toolbar\">\n    <label class=\"search-field\">\n      <span class=\"visually-hidden\">Rechercher un profil</span>\n      <span aria-hidden=\"true\">\u2315</span>\n      <input type=\"search\" class=\"input\" placeholder=\"Rechercher un profil\u2026\"\n             [value]=\"search()\" (input)=\"search.set($any($event.target).value)\" />\n    </label>\n    <span class=\"toolbar__hint\">Les profils syst\u00E8me sont fournis par Soocloo.</span>\n  </div>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des profils\u2026\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n    <section class=\"profile-grid\" aria-label=\"Liste des profils d\u2019acc\u00E8s\">\n      @for (profile of visibleProfiles(); track profile.id) {\n        <article class=\"profile-card card\" [class.profile-card--custom]=\"!profile.systemProfile\">\n          <header class=\"profile-card__head\">\n            <div class=\"profile-card__mark\" aria-hidden=\"true\">\n              {{ profile.label.charAt(0).toLocaleUpperCase('fr') }}\n            </div>\n            <div class=\"profile-card__identity\">\n              <div class=\"profile-card__title-row\">\n                <h2>{{ profile.label }}</h2>\n                <span class=\"badge\" [class.badge--custom]=\"!profile.systemProfile\">\n                  {{ profile.systemProfile ? 'Syst\u00E8me' : 'Personnalis\u00E9' }}\n                </span>\n              </div>\n              <code>{{ profile.code }}</code>\n            </div>\n          </header>\n\n          <p class=\"profile-card__description\">\n            {{ profile.description || 'Profil personnalis\u00E9 de votre \u00E9tablissement.' }}\n          </p>\n\n          <dl class=\"profile-card__stats\">\n            <div>\n              <dt>Permissions</dt>\n              <dd class=\"numeric\">{{ profile.permissionCount }}</dd>\n            </div>\n            <div>\n              <dt>Comptes</dt>\n              <dd class=\"numeric\">{{ profile.userCount }}</dd>\n            </div>\n          </dl>\n\n          <footer class=\"profile-card__foot\">\n            @if (profile.editable) {\n              <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                      (click)=\"openEdit(profile)\">Modifier les droits</button>\n            } @else {\n              <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                      (click)=\"openEdit(profile)\">Voir les droits</button>\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                      (click)=\"duplicate(profile)\">Cr\u00E9er une copie personnalis\u00E9e</button>\n            }\n          </footer>\n        </article>\n      } @empty {\n        <div class=\"empty card\">\n          <p class=\"empty__title\">Aucun profil ne correspond \u00E0 cette recherche.</p>\n          <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"search.set('')\">\n            Effacer la recherche\n          </button>\n        </div>\n      }\n    </section>\n  }\n</div>\n\n@if (panelOpen()) {\n  <div class=\"drawer-backdrop\" (click)=\"closePanel()\"></div>\n  <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"profile-form-title\">\n    <header class=\"drawer__head\">\n      <div>\n        <p class=\"eyebrow\">Profil d\u2019acc\u00E8s</p>\n        <h2 class=\"drawer__title\" id=\"profile-form-title\">\n          {{ viewing() ? 'Droits du profil syst\u00E8me' : editing() ? 'Modifier le profil' : 'Cr\u00E9er un profil' }}\n        </h2>\n      </div>\n      <button type=\"button\" class=\"drawer__close\" aria-label=\"Fermer\" (click)=\"closePanel()\">\u00D7</button>\n    </header>\n\n    <form class=\"drawer__body\" [formGroup]=\"profileForm\" (ngSubmit)=\"submit()\">\n      @if (viewing()) {\n        <p class=\"permission-warning\">Ce profil syst\u00E8me est commun aux \u00E9tablissements. Cr\u00E9ez une copie personnalis\u00E9e pour adapter ses permissions, puis attribuez cette copie aux comptes concern\u00E9s dans Utilisateurs.</p>\n      } @else {\n        @if (editing(); as profile) {\n          <p class=\"permission-warning\">Les modifications s\u2019appliqueront aux {{ profile.userCount }} compte(s) utilisant ce profil.</p>\n        }\n      }\n      <div class=\"field\">\n        <label class=\"field__label field__label--required\" for=\"profile-label\">Nom du profil</label>\n        <input id=\"profile-label\" class=\"input\" formControlName=\"label\"\n               placeholder=\"Ex. Surveillant g\u00E9n\u00E9ral\"\n               (input)=\"onLabelInput($any($event.target).value)\" />\n        @if (profileForm.controls.label.touched && profileForm.controls.label.invalid) {\n          <span class=\"field__error\">Le nom du profil est obligatoire.</span>\n        }\n      </div>\n\n      <div class=\"field\">\n        <label class=\"field__label field__label--required\" for=\"profile-code\">Code</label>\n        <input id=\"profile-code\" class=\"input input--code\" formControlName=\"code\"\n               placeholder=\"SURVEILLANT_GENERAL\" (blur)=\"normaliseCodeInput()\" />\n        <span class=\"field__hint\">Majuscules, chiffres et tirets bas uniquement.</span>\n        @if (profileForm.controls.code.touched && profileForm.controls.code.invalid) {\n          <span class=\"field__error\">Saisissez un code valide et unique.</span>\n        }\n      </div>\n\n      <div class=\"field\">\n        <label class=\"field__label\" for=\"profile-description\">Description</label>\n        <textarea id=\"profile-description\" class=\"textarea\" formControlName=\"description\"\n                  rows=\"2\" placeholder=\"\u00C0 qui ce profil est-il destin\u00E9 ?\"></textarea>\n      </div>\n\n      <section class=\"permission-section\">\n        <div class=\"permission-section__head\">\n          <div>\n            <h3>Permissions</h3>\n            <p>{{ viewing() ? 'Permissions incluses dans ce profil.' : 'Choisissez pr\u00E9cis\u00E9ment ce que ce profil pourra faire.' }}</p>\n          </div>\n          <strong class=\"permission-count numeric\">{{ selectedPermissions().size }}</strong>\n        </div>\n\n        @if (selectedPermissions().size === 0) {\n          <p class=\"permission-warning\">S\u00E9lectionnez au moins une permission.</p>\n        }\n\n        <div class=\"permission-groups\">\n          @for (group of permissionGroups(); track group.module) {\n            <section class=\"permission-group\">\n              <header class=\"permission-group__head\">\n                <label>\n                  <input type=\"checkbox\" [checked]=\"groupSelected(group.items)\"\n                         [disabled]=\"viewing() || saving()\"\n                         (change)=\"toggleGroup(group.items)\" />\n                  <strong>{{ group.module }}</strong>\n                </label>\n                <span class=\"numeric\">\n                  {{ group.items.length }} droit{{ group.items.length > 1 ? 's' : '' }}\n                </span>\n              </header>\n              <div class=\"permission-group__items\">\n                @for (permission of group.items; track permission.code) {\n                  <label class=\"permission-item\">\n                    <input type=\"checkbox\"\n                           [disabled]=\"viewing() || saving()\"\n                           [checked]=\"selectedPermissions().has(permission.code)\"\n                           (change)=\"togglePermission(permission.code)\" />\n                    <span>\n                      <strong>{{ permission.label }}</strong>\n                      <code>{{ permission.code }}</code>\n                    </span>\n                  </label>\n                }\n              </div>\n            </section>\n          }\n        </div>\n      </section>\n    </form>\n\n    <footer class=\"drawer__foot\">\n      <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closePanel()\">{{ viewing() ? 'Fermer' : 'Annuler' }}</button>\n      @if (viewing()) {\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"duplicate(editing()!)\">Cr\u00E9er une copie personnalis\u00E9e</button>\n      } @else {\n      <button type=\"button\" class=\"btn btn--primary\"\n              [disabled]=\"profileForm.invalid || selectedPermissions().size === 0 || saving()\"\n              (click)=\"submit()\">\n        {{ saving() ? 'Enregistrement\u2026' : (editing() ? 'Enregistrer' : 'Cr\u00E9er le profil') }}\n      </button>\n      }\n    </footer>\n  </aside>\n}\n", styles: ["@import 'styles/tokens';\n\n.eyebrow {\n  margin: 0 0 4px;\n  color: var(--brand);\n  font-size: var(--text-xs);\n  font-weight: 800;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n}\n\n.intro {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-4) var(--space-5);\n  margin-bottom: var(--space-5);\n  background: linear-gradient(135deg, var(--brand-tint), var(--surface-card) 72%);\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 42px;\n    height: 42px;\n    color: var(--text-on-brand);\n    font-size: 1.35rem;\n    background: var(--brand);\n    border-radius: 13px;\n  }\n\n  h2 { margin: 0; font-size: var(--text-md); }\n  p { margin: 3px 0 0; color: var(--text-muted); font-size: var(--text-sm); }\n}\n\n.toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  margin-bottom: var(--space-4);\n\n  &__hint { color: var(--text-light); font-size: var(--text-xs); }\n}\n\n.search-field {\n  position: relative;\n  display: block;\n  width: min(100%, 360px);\n\n  > span:not(.visually-hidden) {\n    position: absolute;\n    z-index: 1;\n    left: 12px;\n    top: 50%;\n    color: var(--text-light);\n    transform: translateY(-50%);\n  }\n\n  .input { width: 100%; padding-left: 34px; }\n}\n\n.profile-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));\n  gap: var(--space-4);\n}\n\n.profile-card {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-height: 260px;\n  overflow: hidden;\n  transition: transform var(--transition-fast), box-shadow var(--transition-fast);\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0 auto 0 0;\n    width: 3px;\n    background: var(--border);\n  }\n\n  &--custom::before { background: var(--brand); }\n  &:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    gap: var(--space-3);\n    padding: var(--space-5) var(--space-5) var(--space-3);\n  }\n\n  &__mark {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 40px;\n    height: 40px;\n    color: var(--brand);\n    font: 800 var(--text-md) var(--font-display);\n    background: var(--brand-tint);\n    border-radius: 12px;\n  }\n\n  &__identity { min-width: 0; flex: 1; }\n\n  &__title-row {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex-wrap: wrap;\n\n    h2 { margin: 0; font-size: var(--text-md); }\n  }\n\n  code { color: var(--text-light); font-size: .68rem; }\n\n  &__description {\n    flex: 1;\n    margin: 0;\n    padding: 0 var(--space-5) var(--space-4);\n    color: var(--text-muted);\n    font-size: var(--text-sm);\n    line-height: var(--leading-relaxed);\n  }\n\n  &__stats {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    margin: 0 var(--space-5) var(--space-4);\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n\n    div + div { border-left: 1px solid var(--border); padding-left: var(--space-3); }\n    dt { color: var(--text-light); font-size: var(--text-xs); }\n    dd { margin: 2px 0 0; color: var(--text-strong); font-size: var(--text-lg); font-weight: 750; }\n  }\n\n  &__foot {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-2);\n    align-items: center;\n    min-height: 54px;\n    padding: var(--space-3) var(--space-5);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n.badge {\n  padding: 2px 7px;\n  color: var(--text-light);\n  font-size: .65rem;\n  font-weight: 700;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-pill);\n\n  &--custom { color: var(--brand); background: var(--brand-tint); }\n}\n\n.locked { color: var(--text-light); font-size: var(--text-xs); }\n\n.empty {\n  grid-column: 1 / -1;\n  padding: var(--space-10);\n  text-align: center;\n\n  &__title { color: var(--text-muted); }\n}\n\n.drawer-backdrop {\n  position: fixed;\n  z-index: var(--z-modal-backdrop);\n  inset: 0;\n  background: rgba(9, 25, 44, .4);\n  backdrop-filter: blur(2px);\n}\n\n.drawer {\n  position: fixed;\n  z-index: var(--z-modal);\n  inset: 0 0 0 auto;\n  display: flex;\n  flex-direction: column;\n  width: min(620px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-xl);\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__title { margin: 0; font-size: var(--text-xl); }\n\n  &__close {\n    padding: 0;\n    color: var(--text-muted);\n    font-size: 1.6rem;\n    line-height: 1;\n    background: none;\n    border: 0;\n    cursor: pointer;\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.input--code { font-family: var(--font-mono); text-transform: uppercase; }\n.field__error { display: block; margin-top: 4px; color: var(--danger); font-size: var(--text-xs); }\n\n.permission-section {\n  padding-top: var(--space-2);\n  border-top: 1px solid var(--border-light);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    margin-bottom: var(--space-3);\n\n    h3 { margin: 0; font-size: var(--text-md); }\n    p { margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); }\n  }\n}\n\n.permission-count {\n  display: grid;\n  place-items: center;\n  min-width: 34px;\n  height: 28px;\n  color: var(--brand);\n  background: var(--brand-tint);\n  border-radius: var(--radius-pill);\n}\n\n.permission-warning {\n  margin: 0 0 var(--space-3);\n  padding: var(--space-2) var(--space-3);\n  color: var(--warning);\n  font-size: var(--text-xs);\n  background: var(--warning-bg);\n  border-radius: var(--radius-input);\n}\n\n.permission-groups { display: flex; flex-direction: column; gap: var(--space-3); }\n\n.permission-group {\n  border: 1px solid var(--border);\n  border-radius: var(--radius-input);\n  overflow: hidden;\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n\n    label { display: flex; align-items: center; gap: var(--space-2); cursor: pointer; }\n    span { color: var(--text-light); font-size: var(--text-xs); }\n  }\n\n  &__items {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 1px;\n    background: var(--border-light);\n  }\n}\n\n.permission-item {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-2);\n  min-width: 0;\n  padding: var(--space-3);\n  background: var(--surface-card);\n  cursor: pointer;\n\n  &:hover { background: var(--surface-hover); }\n  input { margin-top: 3px; }\n  span { min-width: 0; }\n  strong { display: block; font-size: var(--text-xs); font-weight: 600; }\n  code { display: block; overflow: hidden; color: var(--text-light); font-size: .6rem; text-overflow: ellipsis; }\n}\n\n@include mobile {\n  .intro { align-items: flex-start; }\n  .toolbar { align-items: stretch; flex-direction: column; }\n  .search-field { width: 100%; }\n  .profile-grid { grid-template-columns: 1fr; }\n  .permission-group__items { grid-template-columns: 1fr; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccessProfilesComponent, { className: "AccessProfilesComponent", filePath: "frontend/src/app/features/access-profiles/access-profiles.component.ts", lineNumber: 26 }); })();
//# sourceMappingURL=access-profiles.component.js.map