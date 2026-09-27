import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { environment } from '@env/environment';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _c0 = () => ["/teachers/new"];
const _c1 = a0 => ({ accountId: a0 });
function UsersComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 6);
    i0.ɵɵtext(1, "Profils d\u2019acc\u00E8s");
    i0.ɵɵelementEnd();
} }
function UsersComponent_Conditional_21_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Le profil Enseignant ouvre le portail, mais la fiche p\u00E9dagogique \u2014 matricule, contrat, affectations \u2014 reste \u00E0 cr\u00E9er. En attendant, le compte figure dans la liste des enseignants, avec l\u2019action \u00AB Cr\u00E9er la fiche enseignant \u00BB.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "a", 18);
    i0.ɵɵtext(3, "Cr\u00E9er la fiche enseignant");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(2, _c0))("queryParams", i0.ɵɵpureFunction1(3, _c1, ctx));
} }
function UsersComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 9)(1, "div")(2, "h2");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Lien de connexion : ");
    i0.ɵɵelementStart(6, "a", 16);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, UsersComponent_Conditional_21_Conditional_10_Template, 4, 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 17);
    i0.ɵɵlistener("click", function UsersComponent_Conditional_21_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.dismissCreated()); });
    i0.ɵɵtext(12, "Fermer");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_6_0;
    const username_r3 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Compte ", username_r3, " cr\u00E9\u00E9");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("href", ctx_r1.loginUrl, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.loginUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Transmettez l\u2019identifiant \u00AB ", username_r3, " \u00BB et le mot de passe que vous avez choisi par un canal priv\u00E9.");
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_6_0 = ctx_r1.pendingTeacherRecord()) ? 10 : -1, tmp_6_0);
} }
function UsersComponent_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 14);
} }
function UsersComponent_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 19);
    i0.ɵɵlistener("retry", function UsersComponent_Conditional_28_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function UsersComponent_Conditional_29_For_2_For_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const profile_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(profile_r5.label);
} }
function UsersComponent_Conditional_29_For_2_ForEmpty_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 31);
    i0.ɵɵtext(1, "Aucun profil attribu\u00E9");
    i0.ɵɵelementEnd();
} }
function UsersComponent_Conditional_29_For_2_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 33);
    i0.ɵɵtext(1, "Cr\u00E9er la fiche enseignant");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(2, _c0))("queryParams", i0.ɵɵpureFunction1(3, _c1, user_r6.id));
} }
function UsersComponent_Conditional_29_For_2_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 35);
    i0.ɵɵlistener("click", function UsersComponent_Conditional_29_For_2_Conditional_21_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const user_r6 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.open(user_r6)); });
    i0.ɵɵtext(1, "Attribuer les profils");
    i0.ɵɵelementEnd();
} }
function UsersComponent_Conditional_29_For_2_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 35);
    i0.ɵɵlistener("click", function UsersComponent_Conditional_29_For_2_Conditional_22_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const user_r6 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openAccount(user_r6)); });
    i0.ɵɵtext(1, "Votre compte");
    i0.ɵɵelementEnd();
} }
function UsersComponent_Conditional_29_For_2_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 31);
    i0.ɵɵtext(1, "Compte prot\u00E9g\u00E9");
    i0.ɵɵelementEnd();
} }
function UsersComponent_Conditional_29_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 20)(1, "header", 22)(2, "span", 23);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 24)(5, "div", 25)(6, "h2");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "code");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 26)(11, "p", 27);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 28);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 29);
    i0.ɵɵrepeaterCreate(16, UsersComponent_Conditional_29_For_2_For_17_Template, 2, 1, "span", 30, _forTrack0, false, UsersComponent_Conditional_29_For_2_ForEmpty_18_Template, 2, 0, "span", 31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "footer", 32);
    i0.ɵɵtemplate(20, UsersComponent_Conditional_29_For_2_Conditional_20_Template, 2, 5, "a", 33)(21, UsersComponent_Conditional_29_For_2_Conditional_21_Template, 2, 0, "button", 34)(22, UsersComponent_Conditional_29_For_2_Conditional_22_Template, 2, 0, "button", 34)(23, UsersComponent_Conditional_29_For_2_Conditional_23_Template, 2, 0, "span", 31);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_19_0;
    const user_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", user_r6.firstName.charAt(0), "", user_r6.lastName.charAt(0), "");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", user_r6.firstName, " ", user_r6.lastName, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r6.username);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(user_r6.email);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("user-card__status--active", user_r6.status === "ACTIVE");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(user_r6.status === "ACTIVE" ? "Actif" : user_r6.status === "PENDING" ? "En attente" : user_r6.status === "LOCKED" ? "Verrouill\u00E9" : user_r6.status === "ARCHIVED" ? "Archiv\u00E9" : "D\u00E9sactiv\u00E9");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(user_r6.profiles);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r1.needsTeacherRecord(user_r6) && ctx_r1.auth.has(ctx_r1.permissions.TEACHER_MANAGE) ? 20 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.canEdit(user_r6) ? 21 : user_r6.id === ((tmp_19_0 = ctx_r1.auth.currentUser()) == null ? null : tmp_19_0.userId) ? 22 : 23);
} }
function UsersComponent_Conditional_29_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Aucun utilisateur", ctx_r1.search() ? " ne correspond \u00E0 votre recherche." : ". Cr\u00E9ez le premier compte.", "");
} }
function UsersComponent_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 15);
    i0.ɵɵrepeaterCreate(1, UsersComponent_Conditional_29_For_2_Template, 24, 12, "article", 20, _forTrack0, false, UsersComponent_Conditional_29_ForEmpty_3_Template, 2, 1, "p", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.visibleUsers());
} }
function UsersComponent_Conditional_30_For_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const profile_r10 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(profile_r10.label);
} }
function UsersComponent_Conditional_30_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 54);
    i0.ɵɵtext(1, "Les mots de passe ne correspondent pas.");
    i0.ɵɵelementEnd();
} }
function UsersComponent_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵlistener("click", function UsersComponent_Conditional_30_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAccount()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 37);
    i0.ɵɵlistener("keydown.escape", function UsersComponent_Conditional_30_Template_aside_keydown_escape_1_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAccount()); });
    i0.ɵɵelementStart(2, "header", 38)(3, "h2", 39);
    i0.ɵɵtext(4, "Votre compte");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 40);
    i0.ɵɵlistener("click", function UsersComponent_Conditional_30_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAccount()); });
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 41)(8, "dl", 42)(9, "div")(10, "dt");
    i0.ɵɵtext(11, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "dd");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div")(15, "dt");
    i0.ɵɵtext(16, "Identifiant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "dd");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div")(20, "dt");
    i0.ɵɵtext(21, "E-mail");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "dd");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div")(25, "dt");
    i0.ɵɵtext(26, "Profils d\u2019acc\u00E8s");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "dd", 43);
    i0.ɵɵrepeaterCreate(28, UsersComponent_Conditional_30_For_29_Template, 2, 1, "span", 30, _forTrack0);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "p", 44);
    i0.ɵɵtext(31, "Pour modifier vos propres droits, contactez un autre administrateur de l\u2019\u00E9tablissement.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "form", 45);
    i0.ɵɵlistener("ngSubmit", function UsersComponent_Conditional_30_Template_form_ngSubmit_32_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.changePassword()); });
    i0.ɵɵelementStart(33, "h3");
    i0.ɵɵtext(34, "Changer le mot de passe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 46)(36, "label", 47);
    i0.ɵɵtext(37, "Mot de passe actuel");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(38, "input", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 46)(40, "label", 49);
    i0.ɵɵtext(41, "Nouveau mot de passe");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(42, "input", 50);
    i0.ɵɵelementStart(43, "span", 51);
    i0.ɵɵtext(44, "Entre 10 et 72 caract\u00E8res.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "div", 46)(46, "label", 52);
    i0.ɵɵtext(47, "Confirmer le nouveau mot de passe");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(48, "input", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(49, UsersComponent_Conditional_30_Conditional_49_Template, 2, 0, "p", 54);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "footer", 55)(51, "button", 56);
    i0.ɵɵlistener("click", function UsersComponent_Conditional_30_Template_button_click_51_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAccount()); });
    i0.ɵɵtext(52, "Fermer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "button", 57);
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const user_r11 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate2("", user_r11.firstName, " ", user_r11.lastName, "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(user_r11.username);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(user_r11.email);
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(user_r11.profiles);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("formGroup", ctx_r1.passwordForm);
    i0.ɵɵadvance(17);
    i0.ɵɵconditional(ctx_r1.passwordForm.controls.confirmation.touched && ctx_r1.passwordForm.controls.newPassword.value !== ctx_r1.passwordForm.controls.confirmation.value ? 49 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.passwordSaving());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.passwordSaving() || ctx_r1.passwordForm.invalid || ctx_r1.passwordForm.controls.newPassword.value !== ctx_r1.passwordForm.controls.confirmation.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.passwordSaving() ? "Enregistrement\u2026" : "Modifier le mot de passe");
} }
function UsersComponent_Conditional_31_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r13 = ctx;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3("", user_r13.firstName, " ", user_r13.lastName, " \u2014 ", user_r13.username, "");
} }
function UsersComponent_Conditional_31_Conditional_9_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 54);
    i0.ɵɵtext(1, "Compl\u00E9tez tous les champs avec un e-mail, un identifiant et un mot de passe valides.");
    i0.ɵɵelementEnd();
} }
function UsersComponent_Conditional_31_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46)(1, "label", 65);
    i0.ɵɵtext(2, "Pr\u00E9nom *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "input", 66);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 46)(5, "label", 67);
    i0.ɵɵtext(6, "Nom *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "input", 68);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 46)(9, "label", 69);
    i0.ɵɵtext(10, "E-mail *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 46)(13, "label", 71);
    i0.ɵɵtext(14, "Identifiant de connexion *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 72);
    i0.ɵɵelementStart(16, "span", 51);
    i0.ɵɵtext(17, "Lettres sans accents, chiffres, points, tirets ou tirets bas.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 46)(19, "label", 73);
    i0.ɵɵtext(20, "Mot de passe *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "input", 74);
    i0.ɵɵelementStart(22, "span", 51);
    i0.ɵɵtext(23, "Entre 10 et 72 caract\u00E8res. Notez-le pour le communiquer \u00E0 la personne.");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(24, UsersComponent_Conditional_31_Conditional_9_Conditional_24_Template, 2, 0, "p", 54);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(24);
    i0.ɵɵconditional(ctx_r1.form.touched && ctx_r1.form.invalid ? 24 : -1);
} }
function UsersComponent_Conditional_31_For_19_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 63)(1, "input", 75);
    i0.ɵɵlistener("change", function UsersComponent_Conditional_31_For_19_Template_input_change_1_listener() { const profile_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggle(profile_r15.id)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const profile_r15 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r1.selected().has(profile_r15.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(profile_r15.label);
} }
function UsersComponent_Conditional_31_ForEmpty_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Aucun profil attribuable. Un administrateur doit vous accorder les droits n\u00E9cessaires.");
    i0.ɵɵelementEnd();
} }
function UsersComponent_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵlistener("click", function UsersComponent_Conditional_31_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 58)(2, "header", 38)(3, "h2", 59);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 40);
    i0.ɵɵlistener("click", function UsersComponent_Conditional_31_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 60);
    i0.ɵɵlistener("ngSubmit", function UsersComponent_Conditional_31_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵtemplate(8, UsersComponent_Conditional_31_Conditional_8_Template, 2, 3, "p")(9, UsersComponent_Conditional_31_Conditional_9_Template, 25, 1);
    i0.ɵɵelementStart(10, "section", 61)(11, "h3");
    i0.ɵɵtext(12, "Profils d\u2019acc\u00E8s *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14, "S\u00E9lectionnez au moins un profil. Les droits des profils s\u00E9lectionn\u00E9s se cumulent.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p");
    i0.ɵɵtext(16, "Le profil Enseignant ouvre le portail ; la fiche p\u00E9dagogique (matricule, contrat) se cr\u00E9e ensuite depuis Enseignants \u2192 Nouvel enseignant.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 62);
    i0.ɵɵrepeaterCreate(18, UsersComponent_Conditional_31_For_19_Template, 4, 2, "label", 63, _forTrack0, false, UsersComponent_Conditional_31_ForEmpty_20_Template, 2, 0, "p");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "footer", 55)(22, "button", 56);
    i0.ɵɵlistener("click", function UsersComponent_Conditional_31_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(23, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "button", 64);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.editing() ? "Attribuer les profils" : "Cr\u00E9er un utilisateur");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_3_0 = ctx_r1.editing()) ? 8 : 9, tmp_3_0);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(ctx_r1.profiles());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || !ctx_r1.selected().size || !ctx_r1.editing() && ctx_r1.form.invalid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.saving() ? "Enregistrement\u2026" : ctx_r1.editing() ? "Enregistrer les profils" : "Cr\u00E9er le compte");
} }
export class UsersComponent {
    http = inject(HttpClient);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    notifications = inject(NotificationService);
    auth = inject(AuthService);
    permissions = PERMISSIONS;
    endpoint = `${environment.apiBaseUrl}/users`;
    users = signal([]);
    profiles = signal([]);
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    panelOpen = signal(false);
    editing = signal(null);
    account = signal(null);
    passwordSaving = signal(false);
    passwordForm = this.fb.nonNullable.group({
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(72)]],
        confirmation: ['', Validators.required]
    });
    selected = signal(new Set());
    search = signal('');
    created = signal(null);
    /** Compte enseignant créé mais encore sans fiche : le parcours n'est pas fini. */
    pendingTeacherRecord = signal(null);
    loginUrl = `${window.location.origin}/login`;
    visibleUsers = computed(() => {
        const query = this.search().trim().toLocaleLowerCase('fr');
        return this.users().filter(u => [u.firstName, u.lastName, u.username, u.email,
            ...u.profiles.map(p => p.label)].join(' ').toLocaleLowerCase('fr').includes(query));
    });
    form = this.fb.nonNullable.group({
        firstName: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(120)]],
        lastName: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(120)]],
        username: ['', [Validators.required, Validators.maxLength(120), Validators.pattern(/^[A-Za-z0-9._-]+$/)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
        password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(72)]]
    });
    constructor() { this.load(); }
    load() {
        this.loading.set(true);
        this.error.set(false);
        forkJoin({ users: this.http.get(this.endpoint),
            profiles: this.http.get(`${this.endpoint}/profiles`) })
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: result => { this.users.set(result.users); this.profiles.set(result.profiles); this.loading.set(false); },
            error: () => { this.error.set(true); this.loading.set(false); }
        });
    }
    canEdit(user) {
        return user.id !== this.auth.currentUser()?.userId
            && user.profiles.every(p => this.profiles().some(available => available.id === p.id));
    }
    openAccount(user) {
        this.passwordForm.reset();
        this.account.set(user);
    }
    closeAccount() {
        if (this.passwordSaving())
            return;
        this.account.set(null);
        this.passwordForm.reset();
    }
    changePassword() {
        const value = this.passwordForm.getRawValue();
        if (this.passwordSaving() || this.passwordForm.invalid || value.newPassword !== value.confirmation) {
            this.passwordForm.markAllAsTouched();
            return;
        }
        this.passwordSaving.set(true);
        this.http.post(`${environment.apiBaseUrl}/auth/change-password`, {
            currentPassword: value.currentPassword, newPassword: value.newPassword
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => {
                this.passwordSaving.set(false);
                this.closeAccount();
                this.notifications.success('Votre mot de passe a été modifié. Reconnectez-vous avec le nouveau mot de passe.');
                this.auth.logout();
            },
            error: () => this.passwordSaving.set(false)
        });
    }
    open(user = null) {
        this.editing.set(user);
        this.form.reset();
        this.selected.set(new Set(user?.profiles.map(p => p.id) ?? []));
        this.panelOpen.set(true);
    }
    close() {
        if (this.saving())
            return;
        this.panelOpen.set(false);
        this.form.reset();
    }
    toggle(id) {
        this.selected.update(current => {
            const next = new Set(current);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }
    submit() {
        if (this.saving() || !this.selected().size || (!this.editing() && this.form.invalid)) {
            this.form.markAllAsTouched();
            return;
        }
        const user = this.editing();
        const profileIds = [...this.selected()];
        const values = this.form.getRawValue();
        this.saving.set(true);
        const request = user
            ? this.http.put(`${this.endpoint}/${user.id}/profiles`, { profileIds })
            : this.http.post(this.endpoint, { ...values,
                firstName: values.firstName.trim(), lastName: values.lastName.trim(),
                email: values.email.trim(), profileIds });
        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: result => {
                this.saving.set(false);
                this.close();
                if (!user) {
                    this.created.set(result.username);
                    // Un compte enseignant sans fiche n'apparaît ni dans la liste des
                    // enseignants ni dans les affectations : on propose de la créer.
                    this.pendingTeacherRecord.set(this.needsTeacherRecord(result) ? result.id : null);
                }
                this.notifications.success(user ? 'Les profils du compte ont été enregistrés.' : 'Le compte est actif et peut se connecter.');
                this.load();
            },
            error: () => this.saving.set(false)
        });
    }
    /** Le compte porte le profil Enseignant mais n'a pas encore de fiche. */
    needsTeacherRecord(user) {
        return user.teacherProfile && !user.hasTeacherRecord;
    }
    dismissCreated() {
        this.created.set(null);
        this.pendingTeacherRecord.set(null);
    }
    static ɵfac = function UsersComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UsersComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UsersComponent, selectors: [["eduops-users"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 32, vars: 7, consts: [[1, "page"], [1, "page__header"], [1, "eyebrow"], [1, "page__title"], [1, "page__meta"], [1, "page__actions"], ["routerLink", "/access-profiles", 1, "btn", "btn--secondary"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], [1, "intro", "card"], ["role", "status", 1, "intro", "card"], [1, "toolbar"], [1, "search-field"], [1, "visually-hidden"], ["type", "search", "placeholder", "Nom, identifiant, e-mail ou profil\u2026", 1, "input", 3, "input", "value"], ["message", "Chargement des utilisateurs\u2026"], ["aria-label", "Utilisateurs", 1, "profile-grid"], [3, "href"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], [1, "btn", "btn--secondary", 3, "routerLink", "queryParams"], [3, "retry"], [1, "profile-card", "card", "user-card"], [1, "empty", "card"], [1, "profile-card__head"], ["aria-hidden", "true", 1, "profile-card__mark"], [1, "profile-card__identity"], [1, "profile-card__title-row"], [1, "user-card__body"], [1, "user-card__email"], [1, "user-card__status"], ["aria-label", "Profils d\u2019acc\u00E8s", 1, "user-card__profiles"], [1, "badge"], [1, "locked"], [1, "profile-card__foot"], [1, "btn", "btn--secondary", "btn--sm", 3, "routerLink", "queryParams"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "account-title", 1, "drawer", 3, "keydown.escape"], [1, "drawer__head"], ["id", "account-title", 1, "drawer__title"], ["type", "button", "aria-label", "Fermer", 1, "drawer__close", 3, "click"], [1, "drawer__body"], [1, "account-details"], [1, "user-card__profiles"], [1, "account-hint"], ["id", "password-form", 1, "password-form", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "current-password", 1, "field__label"], ["id", "current-password", "type", "password", "formControlName", "currentPassword", "autocomplete", "current-password", 1, "input"], ["for", "new-password", 1, "field__label"], ["id", "new-password", "type", "password", "formControlName", "newPassword", "autocomplete", "new-password", 1, "input"], [1, "field__hint"], ["for", "confirm-password", 1, "field__label"], ["id", "confirm-password", "type", "password", "formControlName", "confirmation", "autocomplete", "new-password", 1, "input"], [1, "field__error"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], ["type", "submit", "form", "password-form", 1, "btn", "btn--primary", 3, "disabled"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "user-title", 1, "drawer"], ["id", "user-title"], ["id", "user-form", 1, "drawer__body", 3, "ngSubmit", "formGroup"], [1, "permission-section"], [1, "permission-groups"], [1, "permission-item"], ["type", "submit", "form", "user-form", 1, "btn", "btn--primary", 3, "disabled"], ["for", "user-first", 1, "field__label"], ["id", "user-first", "formControlName", "firstName", "autocomplete", "given-name", 1, "input"], ["for", "user-last", 1, "field__label"], ["id", "user-last", "formControlName", "lastName", "autocomplete", "family-name", 1, "input"], ["for", "user-email", 1, "field__label"], ["id", "user-email", "type", "email", "formControlName", "email", "autocomplete", "email", 1, "input"], ["for", "user-login", 1, "field__label"], ["id", "user-login", "formControlName", "username", "autocomplete", "off", 1, "input"], ["for", "user-password", 1, "field__label"], ["id", "user-password", "type", "password", "formControlName", "password", "autocomplete", "new-password", 1, "input"], ["type", "checkbox", 3, "change", "checked"]], template: function UsersComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "Personnel et acc\u00E8s");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 3);
            i0.ɵɵtext(6, "Utilisateurs");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, "Tout le personnel de l\u2019\u00E9tablissement \u2014 enseignants, personnel non enseignant, administration \u2014 est un utilisateur : cr\u00E9ez ses comptes de connexion et attribuez leurs profils d\u2019acc\u00E8s.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 5);
            i0.ɵɵtemplate(10, UsersComponent_Conditional_10_Template, 2, 0, "a", 6);
            i0.ɵɵelementStart(11, "button", 7);
            i0.ɵɵlistener("click", function UsersComponent_Template_button_click_11_listener() { return ctx.open(); });
            i0.ɵɵtext(12, "+ Cr\u00E9er un utilisateur");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(13, "section", 8)(14, "div")(15, "h2");
            i0.ɵɵtext(16, "Donner acc\u00E8s \u00E0 votre \u00E9tablissement");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "p");
            i0.ɵɵtext(18, "Cr\u00E9ez un compte pour chaque membre du personnel, choisissez ses profils, puis communiquez personnellement son identifiant, son mot de passe et le lien de connexion. Aucun e-mail n\u2019est envoy\u00E9 automatiquement.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "p");
            i0.ɵɵtext(20, "Les profils d\u00E9finissent les droits. Pour les portails \u00E9l\u00E8ves, parents et enseignants, le compte doit aussi \u00EAtre rattach\u00E9 \u00E0 la fiche de la personne concern\u00E9e.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(21, UsersComponent_Conditional_21_Template, 13, 5, "section", 9);
            i0.ɵɵelementStart(22, "div", 10)(23, "label", 11)(24, "span", 12);
            i0.ɵɵtext(25, "Rechercher un utilisateur");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "input", 13);
            i0.ɵɵlistener("input", function UsersComponent_Template_input_input_26_listener($event) { return ctx.search.set($event.target.value); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(27, UsersComponent_Conditional_27_Template, 1, 0, "eduops-loading-state", 14)(28, UsersComponent_Conditional_28_Template, 1, 0, "eduops-error-state")(29, UsersComponent_Conditional_29_Template, 4, 1, "section", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(30, UsersComponent_Conditional_30_Template, 55, 9)(31, UsersComponent_Conditional_31_Template, 26, 7);
        } if (rf & 2) {
            let tmp_2_0;
            let tmp_5_0;
            i0.ɵɵadvance(10);
            i0.ɵɵconditional(ctx.auth.has("ROLE_MANAGE") ? 10 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.loading() || ctx.error());
            i0.ɵɵadvance(10);
            i0.ɵɵconditional((tmp_2_0 = ctx.created()) ? 21 : -1, tmp_2_0);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("value", ctx.search());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 27 : ctx.error() ? 28 : 29);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_5_0 = ctx.account()) ? 30 : -1, tmp_5_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.panelOpen() ? 31 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink, LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  color: var(--brand);\n  font-size: var(--text-xs);\n  font-weight: 800;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n}\n\n.intro[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-4) var(--space-5);\n  margin-bottom: var(--space-5);\n  background: linear-gradient(135deg, var(--brand-tint), var(--surface-card) 72%);\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 42px;\n    height: 42px;\n    color: var(--text-on-brand);\n    font-size: 1.35rem;\n    background: var(--brand);\n    border-radius: 13px;\n  }\n\n  h2 { margin: 0; font-size: var(--text-md); }\n  p { margin: 3px 0 0; color: var(--text-muted); font-size: var(--text-sm); }\n}\n\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  margin-bottom: var(--space-4);\n\n  &__hint { color: var(--text-light); font-size: var(--text-xs); }\n}\n\n.search-field[_ngcontent-%COMP%] {\n  position: relative;\n  display: block;\n  width: min(100%, 360px);\n\n  > span:not(.visually-hidden) {\n    position: absolute;\n    z-index: 1;\n    left: 12px;\n    top: 50%;\n    color: var(--text-light);\n    transform: translateY(-50%);\n  }\n\n  .input { width: 100%; padding-left: 34px; }\n}\n\n.profile-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));\n  gap: var(--space-4);\n}\n\n.profile-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-height: 260px;\n  overflow: hidden;\n  transition: transform var(--transition-fast), box-shadow var(--transition-fast);\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0 auto 0 0;\n    width: 3px;\n    background: var(--border);\n  }\n\n  &--custom::before { background: var(--brand); }\n  &:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    gap: var(--space-3);\n    padding: var(--space-5) var(--space-5) var(--space-3);\n  }\n\n  &__mark {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 40px;\n    height: 40px;\n    color: var(--brand);\n    font: 800 var(--text-md) var(--font-display);\n    background: var(--brand-tint);\n    border-radius: 12px;\n  }\n\n  &__identity { min-width: 0; flex: 1; }\n\n  &__title-row {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex-wrap: wrap;\n\n    h2 { margin: 0; font-size: var(--text-md); }\n  }\n\n  code { color: var(--text-light); font-size: .68rem; }\n\n  &__description {\n    flex: 1;\n    margin: 0;\n    padding: 0 var(--space-5) var(--space-4);\n    color: var(--text-muted);\n    font-size: var(--text-sm);\n    line-height: var(--leading-relaxed);\n  }\n\n  &__stats {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    margin: 0 var(--space-5) var(--space-4);\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n\n    div + div { border-left: 1px solid var(--border); padding-left: var(--space-3); }\n    dt { color: var(--text-light); font-size: var(--text-xs); }\n    dd { margin: 2px 0 0; color: var(--text-strong); font-size: var(--text-lg); font-weight: 750; }\n  }\n\n  &__foot {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-2);\n    align-items: center;\n    min-height: 54px;\n    padding: var(--space-3) var(--space-5);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n.badge[_ngcontent-%COMP%] {\n  padding: 2px 7px;\n  color: var(--text-light);\n  font-size: .65rem;\n  font-weight: 700;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-pill);\n\n  &--custom { color: var(--brand); background: var(--brand-tint); }\n}\n\n.locked[_ngcontent-%COMP%] { color: var(--text-light); font-size: var(--text-xs); }\n\n.empty[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  padding: var(--space-10);\n  text-align: center;\n\n  &__title { color: var(--text-muted); }\n}\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: var(--z-modal-backdrop);\n  inset: 0;\n  background: rgba(9, 25, 44, .4);\n  backdrop-filter: blur(2px);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: var(--z-modal);\n  inset: 0 0 0 auto;\n  display: flex;\n  flex-direction: column;\n  width: min(620px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-xl);\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__title { margin: 0; font-size: var(--text-xl); }\n\n  &__close {\n    padding: 0;\n    color: var(--text-muted);\n    font-size: 1.6rem;\n    line-height: 1;\n    background: none;\n    border: 0;\n    cursor: pointer;\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.input--code[_ngcontent-%COMP%] { font-family: var(--font-mono); text-transform: uppercase; }\n.field__error[_ngcontent-%COMP%] { display: block; margin-top: 4px; color: var(--danger); font-size: var(--text-xs); }\n\n.permission-section[_ngcontent-%COMP%] {\n  padding-top: var(--space-2);\n  border-top: 1px solid var(--border-light);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    margin-bottom: var(--space-3);\n\n    h3 { margin: 0; font-size: var(--text-md); }\n    p { margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); }\n  }\n}\n\n.permission-count[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  min-width: 34px;\n  height: 28px;\n  color: var(--brand);\n  background: var(--brand-tint);\n  border-radius: var(--radius-pill);\n}\n\n.permission-warning[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-3);\n  padding: var(--space-2) var(--space-3);\n  color: var(--warning);\n  font-size: var(--text-xs);\n  background: var(--warning-bg);\n  border-radius: var(--radius-input);\n}\n\n.permission-groups[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-3); }\n\n.permission-group[_ngcontent-%COMP%] {\n  border: 1px solid var(--border);\n  border-radius: var(--radius-input);\n  overflow: hidden;\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n\n    label { display: flex; align-items: center; gap: var(--space-2); cursor: pointer; }\n    span { color: var(--text-light); font-size: var(--text-xs); }\n  }\n\n  &__items {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 1px;\n    background: var(--border-light);\n  }\n}\n\n.permission-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-2);\n  min-width: 0;\n  padding: var(--space-3);\n  background: var(--surface-card);\n  cursor: pointer;\n\n  &:hover { background: var(--surface-hover); }\n  input { margin-top: 3px; }\n  span { min-width: 0; }\n  strong { display: block; font-size: var(--text-xs); font-weight: 600; }\n  code { display: block; overflow: hidden; color: var(--text-light); font-size: .6rem; text-overflow: ellipsis; }\n}\n\n@include mobile {\n  .intro { align-items: flex-start; }\n  .toolbar { align-items: stretch; flex-direction: column; }\n  .search-field { width: 100%; }\n  .profile-grid { grid-template-columns: 1fr; }\n  .permission-group__items { grid-template-columns: 1fr; }\n}", "[_nghost-%COMP%] { display: block; min-width: 0; }\n\n.profile-grid[_ngcontent-%COMP%] { grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); }\n.user-card[_ngcontent-%COMP%] {\n  min-width: 0;\n  .profile-card__identity { overflow-wrap: anywhere; }\n  .profile-card__title-row h2 { line-height: 1.4; }\n  .profile-card__identity code { display: block; margin-top: 4px; font-size: var(--text-xs); }\n  &__body { display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-3); padding: 0 var(--space-5) var(--space-5); flex: 1; min-width: 0; }\n  &__email { margin: 0; max-width: 100%; overflow-wrap: anywhere; color: var(--text-muted); font-size: var(--text-sm); }\n  &__status { padding: 3px 9px; border-radius: var(--radius-pill); background: var(--surface-sunken); color: var(--text-muted); font-size: var(--text-xs); font-weight: 600; }\n  &__status--active { color: var(--brand); background: var(--brand-tint); }\n  &__profiles { display: flex; flex-wrap: wrap; gap: var(--space-2); min-width: 0; }\n  .profile-card__foot { margin-top: auto; }\n}\n.badge[_ngcontent-%COMP%] { display: inline-block; max-width: 100%; white-space: normal; overflow-wrap: anywhere; font-size: var(--text-xs); line-height: 1.5; }\n.search-field[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%] { padding-left: 12px; }\n.account-details[_ngcontent-%COMP%] {\n  display: grid; gap: var(--space-4); margin: 0;\n  dt { color: var(--text-muted); font-size: var(--text-xs); margin-bottom: 4px; }\n  dd { margin: 0; overflow-wrap: anywhere; }\n}\n.account-hint[_ngcontent-%COMP%] { margin: 0; color: var(--text-muted); font-size: var(--text-sm); }\n.password-form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-4); border-top: 1px solid var(--border); padding-top: var(--space-4); h3 { margin: 0; } }\n.drawer__body[_ngcontent-%COMP%] { min-height: 0; }\n.intro[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { min-width: 0; overflow-wrap: anywhere; }\n@media (max-width: 600px) {\n  .page__actions[_ngcontent-%COMP%] { flex-wrap: wrap; }\n  .drawer__foot[_ngcontent-%COMP%] { flex-wrap: wrap; }\n  .drawer__foot[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] { white-space: normal; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UsersComponent, [{
        type: Component,
        args: [{ selector: 'eduops-users', standalone: true, imports: [ReactiveFormsModule, RouterLink, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div><p class=\"eyebrow\">Personnel et acc\u00E8s</p><h1 class=\"page__title\">Utilisateurs</h1>\n      <p class=\"page__meta\">Tout le personnel de l\u2019\u00E9tablissement \u2014 enseignants, personnel non\n        enseignant, administration \u2014 est un utilisateur : cr\u00E9ez ses comptes de connexion et\n        attribuez leurs profils d\u2019acc\u00E8s.</p></div>\n    <div class=\"page__actions\">\n      @if (auth.has('ROLE_MANAGE')) { <a class=\"btn btn--secondary\" routerLink=\"/access-profiles\">Profils d\u2019acc\u00E8s</a> }\n      <button class=\"btn btn--primary\" type=\"button\" (click)=\"open()\" [disabled]=\"loading() || error()\">+ Cr\u00E9er un utilisateur</button>\n    </div>\n  </header>\n  <section class=\"intro card\"><div>\n    <h2>Donner acc\u00E8s \u00E0 votre \u00E9tablissement</h2>\n    <p>Cr\u00E9ez un compte pour chaque membre du personnel, choisissez ses profils, puis communiquez\n      personnellement son identifiant, son mot de passe et le lien de connexion. Aucun e-mail\n      n\u2019est envoy\u00E9 automatiquement.</p>\n    <p>Les profils d\u00E9finissent les droits. Pour les portails \u00E9l\u00E8ves, parents et enseignants, le compte doit aussi \u00EAtre rattach\u00E9 \u00E0 la fiche de la personne concern\u00E9e.</p>\n  </div></section>\n  @if (created(); as username) {\n    <section class=\"intro card\" role=\"status\"><div><h2>Compte {{ username }} cr\u00E9\u00E9</h2>\n      <p>Lien de connexion : <a [href]=\"loginUrl\">{{ loginUrl }}</a></p>\n      <p>Transmettez l\u2019identifiant \u00AB {{ username }} \u00BB et le mot de passe que vous avez choisi par un canal priv\u00E9.</p>\n      @if (pendingTeacherRecord(); as accountId) {\n        <p>Le profil Enseignant ouvre le portail, mais la fiche p\u00E9dagogique \u2014 matricule, contrat, affectations \u2014 reste \u00E0 cr\u00E9er. En attendant, le compte figure dans la liste des enseignants, avec l\u2019action \u00AB Cr\u00E9er la fiche enseignant \u00BB.</p>\n        <a class=\"btn btn--secondary\" [routerLink]=\"['/teachers/new']\" [queryParams]=\"{ accountId }\">Cr\u00E9er la fiche enseignant</a>\n      }\n    </div><button class=\"btn btn--ghost\" type=\"button\" (click)=\"dismissCreated()\">Fermer</button></section>\n  }\n  <div class=\"toolbar\"><label class=\"search-field\"><span class=\"visually-hidden\">Rechercher un utilisateur</span>\n    <input class=\"input\" type=\"search\" placeholder=\"Nom, identifiant, e-mail ou profil\u2026\" [value]=\"search()\" (input)=\"search.set($any($event.target).value)\" />\n  </label></div>\n  @if (loading()) { <eduops-loading-state message=\"Chargement des utilisateurs\u2026\" /> }\n  @else if (error()) { <eduops-error-state (retry)=\"load()\" /> }\n  @else {\n    <section class=\"profile-grid\" aria-label=\"Utilisateurs\">\n      @for (user of visibleUsers(); track user.id) {\n        <article class=\"profile-card card user-card\">\n          <header class=\"profile-card__head\">\n            <span class=\"profile-card__mark\" aria-hidden=\"true\">{{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}</span>\n            <div class=\"profile-card__identity\"><div class=\"profile-card__title-row\"><h2>{{ user.firstName }} {{ user.lastName }}</h2></div><code>{{ user.username }}</code></div>\n          </header>\n          <div class=\"user-card__body\">\n            <p class=\"user-card__email\">{{ user.email }}</p>\n            <span class=\"user-card__status\" [class.user-card__status--active]=\"user.status === 'ACTIVE'\">{{ user.status === 'ACTIVE' ? 'Actif' : user.status === 'PENDING' ? 'En attente' : user.status === 'LOCKED' ? 'Verrouill\u00E9' : user.status === 'ARCHIVED' ? 'Archiv\u00E9' : 'D\u00E9sactiv\u00E9' }}</span>\n            <div class=\"user-card__profiles\" aria-label=\"Profils d\u2019acc\u00E8s\">@for (profile of user.profiles; track profile.id) { <span class=\"badge\">{{ profile.label }}</span> } @empty { <span class=\"locked\">Aucun profil attribu\u00E9</span> }</div>\n          </div>\n          <footer class=\"profile-card__foot\">\n            @if (needsTeacherRecord(user) && auth.has(permissions.TEACHER_MANAGE)) {\n              <a class=\"btn btn--secondary btn--sm\" [routerLink]=\"['/teachers/new']\" [queryParams]=\"{ accountId: user.id }\">Cr\u00E9er la fiche enseignant</a>\n            }\n            @if (canEdit(user)) { <button class=\"btn btn--secondary btn--sm\" type=\"button\" (click)=\"open(user)\">Attribuer les profils</button> }\n            @else if (user.id === auth.currentUser()?.userId) { <button class=\"btn btn--secondary btn--sm\" type=\"button\" (click)=\"openAccount(user)\">Votre compte</button> }\n            @else { <span class=\"locked\">Compte prot\u00E9g\u00E9</span> }\n          </footer>\n        </article>\n      } @empty { <p class=\"empty card\">Aucun utilisateur{{ search() ? ' ne correspond \u00E0 votre recherche.' : '. Cr\u00E9ez le premier compte.' }}</p> }\n    </section>\n  }\n</div>\n@if (account(); as user) {\n  <div class=\"drawer-backdrop\" (click)=\"closeAccount()\"></div>\n  <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"account-title\" (keydown.escape)=\"closeAccount()\">\n    <header class=\"drawer__head\"><h2 id=\"account-title\" class=\"drawer__title\">Votre compte</h2>\n      <button class=\"drawer__close\" type=\"button\" aria-label=\"Fermer\" (click)=\"closeAccount()\">\u00D7</button></header>\n    <div class=\"drawer__body\">\n      <dl class=\"account-details\"><div><dt>Nom</dt><dd>{{ user.firstName }} {{ user.lastName }}</dd></div>\n        <div><dt>Identifiant</dt><dd>{{ user.username }}</dd></div><div><dt>E-mail</dt><dd>{{ user.email }}</dd></div>\n        <div><dt>Profils d\u2019acc\u00E8s</dt><dd class=\"user-card__profiles\">@for (profile of user.profiles; track profile.id) { <span class=\"badge\">{{ profile.label }}</span> }</dd></div>\n      </dl>\n      <p class=\"account-hint\">Pour modifier vos propres droits, contactez un autre administrateur de l\u2019\u00E9tablissement.</p>\n      <form [formGroup]=\"passwordForm\" (ngSubmit)=\"changePassword()\" id=\"password-form\" class=\"password-form\">\n        <h3>Changer le mot de passe</h3>\n        <div class=\"field\"><label class=\"field__label\" for=\"current-password\">Mot de passe actuel</label><input id=\"current-password\" class=\"input\" type=\"password\" formControlName=\"currentPassword\" autocomplete=\"current-password\" /></div>\n        <div class=\"field\"><label class=\"field__label\" for=\"new-password\">Nouveau mot de passe</label><input id=\"new-password\" class=\"input\" type=\"password\" formControlName=\"newPassword\" autocomplete=\"new-password\" /><span class=\"field__hint\">Entre 10 et 72 caract\u00E8res.</span></div>\n        <div class=\"field\"><label class=\"field__label\" for=\"confirm-password\">Confirmer le nouveau mot de passe</label><input id=\"confirm-password\" class=\"input\" type=\"password\" formControlName=\"confirmation\" autocomplete=\"new-password\" /></div>\n        @if (passwordForm.controls.confirmation.touched && passwordForm.controls.newPassword.value !== passwordForm.controls.confirmation.value) { <p class=\"field__error\">Les mots de passe ne correspondent pas.</p> }\n      </form>\n    </div>\n    <footer class=\"drawer__foot\"><button class=\"btn btn--secondary\" type=\"button\" (click)=\"closeAccount()\" [disabled]=\"passwordSaving()\">Fermer</button>\n      <button class=\"btn btn--primary\" type=\"submit\" form=\"password-form\" [disabled]=\"passwordSaving() || passwordForm.invalid || passwordForm.controls.newPassword.value !== passwordForm.controls.confirmation.value\">{{ passwordSaving() ? 'Enregistrement\u2026' : 'Modifier le mot de passe' }}</button></footer>\n  </aside>\n}\n@if (panelOpen()) {\n  <div class=\"drawer-backdrop\" (click)=\"close()\"></div>\n  <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"user-title\">\n    <header class=\"drawer__head\"><h2 id=\"user-title\">{{ editing() ? 'Attribuer les profils' : 'Cr\u00E9er un utilisateur' }}</h2>\n      <button class=\"drawer__close\" type=\"button\" aria-label=\"Fermer\" (click)=\"close()\">\u00D7</button></header>\n    <form class=\"drawer__body\" [formGroup]=\"form\" (ngSubmit)=\"submit()\" id=\"user-form\">\n      @if (editing(); as user) { <p>{{ user.firstName }} {{ user.lastName }} \u2014 {{ user.username }}</p> }\n      @else {\n        <div class=\"field\"><label for=\"user-first\" class=\"field__label\">Pr\u00E9nom *</label><input id=\"user-first\" class=\"input\" formControlName=\"firstName\" autocomplete=\"given-name\" /></div>\n        <div class=\"field\"><label for=\"user-last\" class=\"field__label\">Nom *</label><input id=\"user-last\" class=\"input\" formControlName=\"lastName\" autocomplete=\"family-name\" /></div>\n        <div class=\"field\"><label for=\"user-email\" class=\"field__label\">E-mail *</label><input id=\"user-email\" class=\"input\" type=\"email\" formControlName=\"email\" autocomplete=\"email\" /></div>\n        <div class=\"field\"><label for=\"user-login\" class=\"field__label\">Identifiant de connexion *</label><input id=\"user-login\" class=\"input\" formControlName=\"username\" autocomplete=\"off\" />\n          <span class=\"field__hint\">Lettres sans accents, chiffres, points, tirets ou tirets bas.</span></div>\n        <div class=\"field\"><label for=\"user-password\" class=\"field__label\">Mot de passe *</label><input id=\"user-password\" class=\"input\" type=\"password\" formControlName=\"password\" autocomplete=\"new-password\" />\n          <span class=\"field__hint\">Entre 10 et 72 caract\u00E8res. Notez-le pour le communiquer \u00E0 la personne.</span></div>\n        @if (form.touched && form.invalid) { <p class=\"field__error\">Compl\u00E9tez tous les champs avec un e-mail, un identifiant et un mot de passe valides.</p> }\n      }\n      <section class=\"permission-section\"><h3>Profils d\u2019acc\u00E8s *</h3><p>S\u00E9lectionnez au moins un profil. Les droits des profils s\u00E9lectionn\u00E9s se cumulent.</p>\n        <p>Le profil Enseignant ouvre le portail ; la fiche p\u00E9dagogique (matricule, contrat) se cr\u00E9e ensuite depuis Enseignants \u2192 Nouvel enseignant.</p>\n        <div class=\"permission-groups\">@for (profile of profiles(); track profile.id) {\n          <label class=\"permission-item\"><input type=\"checkbox\" [checked]=\"selected().has(profile.id)\" (change)=\"toggle(profile.id)\" /><span>{{ profile.label }}</span></label>\n        } @empty { <p>Aucun profil attribuable. Un administrateur doit vous accorder les droits n\u00E9cessaires.</p> }</div>\n      </section>\n    </form>\n    <footer class=\"drawer__foot\"><button class=\"btn btn--secondary\" type=\"button\" (click)=\"close()\" [disabled]=\"saving()\">Annuler</button>\n      <button class=\"btn btn--primary\" type=\"submit\" form=\"user-form\" [disabled]=\"saving() || !selected().size || (!editing() && form.invalid)\">{{ saving() ? 'Enregistrement\u2026' : editing() ? 'Enregistrer les profils' : 'Cr\u00E9er le compte' }}</button></footer>\n  </aside>\n}\n", styles: ["@import 'styles/tokens';\n\n.eyebrow {\n  margin: 0 0 4px;\n  color: var(--brand);\n  font-size: var(--text-xs);\n  font-weight: 800;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n}\n\n.intro {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-4) var(--space-5);\n  margin-bottom: var(--space-5);\n  background: linear-gradient(135deg, var(--brand-tint), var(--surface-card) 72%);\n\n  &__icon {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 42px;\n    height: 42px;\n    color: var(--text-on-brand);\n    font-size: 1.35rem;\n    background: var(--brand);\n    border-radius: 13px;\n  }\n\n  h2 { margin: 0; font-size: var(--text-md); }\n  p { margin: 3px 0 0; color: var(--text-muted); font-size: var(--text-sm); }\n}\n\n.toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-4);\n  margin-bottom: var(--space-4);\n\n  &__hint { color: var(--text-light); font-size: var(--text-xs); }\n}\n\n.search-field {\n  position: relative;\n  display: block;\n  width: min(100%, 360px);\n\n  > span:not(.visually-hidden) {\n    position: absolute;\n    z-index: 1;\n    left: 12px;\n    top: 50%;\n    color: var(--text-light);\n    transform: translateY(-50%);\n  }\n\n  .input { width: 100%; padding-left: 34px; }\n}\n\n.profile-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));\n  gap: var(--space-4);\n}\n\n.profile-card {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-height: 260px;\n  overflow: hidden;\n  transition: transform var(--transition-fast), box-shadow var(--transition-fast);\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0 auto 0 0;\n    width: 3px;\n    background: var(--border);\n  }\n\n  &--custom::before { background: var(--brand); }\n  &:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    gap: var(--space-3);\n    padding: var(--space-5) var(--space-5) var(--space-3);\n  }\n\n  &__mark {\n    display: grid;\n    place-items: center;\n    flex: none;\n    width: 40px;\n    height: 40px;\n    color: var(--brand);\n    font: 800 var(--text-md) var(--font-display);\n    background: var(--brand-tint);\n    border-radius: 12px;\n  }\n\n  &__identity { min-width: 0; flex: 1; }\n\n  &__title-row {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex-wrap: wrap;\n\n    h2 { margin: 0; font-size: var(--text-md); }\n  }\n\n  code { color: var(--text-light); font-size: .68rem; }\n\n  &__description {\n    flex: 1;\n    margin: 0;\n    padding: 0 var(--space-5) var(--space-4);\n    color: var(--text-muted);\n    font-size: var(--text-sm);\n    line-height: var(--leading-relaxed);\n  }\n\n  &__stats {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    margin: 0 var(--space-5) var(--space-4);\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n    border-radius: var(--radius-input);\n\n    div + div { border-left: 1px solid var(--border); padding-left: var(--space-3); }\n    dt { color: var(--text-light); font-size: var(--text-xs); }\n    dd { margin: 2px 0 0; color: var(--text-strong); font-size: var(--text-lg); font-weight: 750; }\n  }\n\n  &__foot {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--space-2);\n    align-items: center;\n    min-height: 54px;\n    padding: var(--space-3) var(--space-5);\n    border-top: 1px solid var(--border-light);\n  }\n}\n\n.badge {\n  padding: 2px 7px;\n  color: var(--text-light);\n  font-size: .65rem;\n  font-weight: 700;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-pill);\n\n  &--custom { color: var(--brand); background: var(--brand-tint); }\n}\n\n.locked { color: var(--text-light); font-size: var(--text-xs); }\n\n.empty {\n  grid-column: 1 / -1;\n  padding: var(--space-10);\n  text-align: center;\n\n  &__title { color: var(--text-muted); }\n}\n\n.drawer-backdrop {\n  position: fixed;\n  z-index: var(--z-modal-backdrop);\n  inset: 0;\n  background: rgba(9, 25, 44, .4);\n  backdrop-filter: blur(2px);\n}\n\n.drawer {\n  position: fixed;\n  z-index: var(--z-modal);\n  inset: 0 0 0 auto;\n  display: flex;\n  flex-direction: column;\n  width: min(620px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-xl);\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-5);\n    border-bottom: 1px solid var(--border);\n  }\n\n  &__title { margin: 0; font-size: var(--text-xl); }\n\n  &__close {\n    padding: 0;\n    color: var(--text-muted);\n    font-size: 1.6rem;\n    line-height: 1;\n    background: none;\n    border: 0;\n    cursor: pointer;\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.input--code { font-family: var(--font-mono); text-transform: uppercase; }\n.field__error { display: block; margin-top: 4px; color: var(--danger); font-size: var(--text-xs); }\n\n.permission-section {\n  padding-top: var(--space-2);\n  border-top: 1px solid var(--border-light);\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    margin-bottom: var(--space-3);\n\n    h3 { margin: 0; font-size: var(--text-md); }\n    p { margin: 2px 0 0; color: var(--text-muted); font-size: var(--text-xs); }\n  }\n}\n\n.permission-count {\n  display: grid;\n  place-items: center;\n  min-width: 34px;\n  height: 28px;\n  color: var(--brand);\n  background: var(--brand-tint);\n  border-radius: var(--radius-pill);\n}\n\n.permission-warning {\n  margin: 0 0 var(--space-3);\n  padding: var(--space-2) var(--space-3);\n  color: var(--warning);\n  font-size: var(--text-xs);\n  background: var(--warning-bg);\n  border-radius: var(--radius-input);\n}\n\n.permission-groups { display: flex; flex-direction: column; gap: var(--space-3); }\n\n.permission-group {\n  border: 1px solid var(--border);\n  border-radius: var(--radius-input);\n  overflow: hidden;\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-3);\n    background: var(--surface-sunken);\n\n    label { display: flex; align-items: center; gap: var(--space-2); cursor: pointer; }\n    span { color: var(--text-light); font-size: var(--text-xs); }\n  }\n\n  &__items {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 1px;\n    background: var(--border-light);\n  }\n}\n\n.permission-item {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-2);\n  min-width: 0;\n  padding: var(--space-3);\n  background: var(--surface-card);\n  cursor: pointer;\n\n  &:hover { background: var(--surface-hover); }\n  input { margin-top: 3px; }\n  span { min-width: 0; }\n  strong { display: block; font-size: var(--text-xs); font-weight: 600; }\n  code { display: block; overflow: hidden; color: var(--text-light); font-size: .6rem; text-overflow: ellipsis; }\n}\n\n@include mobile {\n  .intro { align-items: flex-start; }\n  .toolbar { align-items: stretch; flex-direction: column; }\n  .search-field { width: 100%; }\n  .profile-grid { grid-template-columns: 1fr; }\n  .permission-group__items { grid-template-columns: 1fr; }\n}\n", ":host { display: block; min-width: 0; }\n\n.profile-grid { grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); }\n.user-card {\n  min-width: 0;\n  .profile-card__identity { overflow-wrap: anywhere; }\n  .profile-card__title-row h2 { line-height: 1.4; }\n  .profile-card__identity code { display: block; margin-top: 4px; font-size: var(--text-xs); }\n  &__body { display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-3); padding: 0 var(--space-5) var(--space-5); flex: 1; min-width: 0; }\n  &__email { margin: 0; max-width: 100%; overflow-wrap: anywhere; color: var(--text-muted); font-size: var(--text-sm); }\n  &__status { padding: 3px 9px; border-radius: var(--radius-pill); background: var(--surface-sunken); color: var(--text-muted); font-size: var(--text-xs); font-weight: 600; }\n  &__status--active { color: var(--brand); background: var(--brand-tint); }\n  &__profiles { display: flex; flex-wrap: wrap; gap: var(--space-2); min-width: 0; }\n  .profile-card__foot { margin-top: auto; }\n}\n.badge { display: inline-block; max-width: 100%; white-space: normal; overflow-wrap: anywhere; font-size: var(--text-xs); line-height: 1.5; }\n.search-field .input { padding-left: 12px; }\n.account-details {\n  display: grid; gap: var(--space-4); margin: 0;\n  dt { color: var(--text-muted); font-size: var(--text-xs); margin-bottom: 4px; }\n  dd { margin: 0; overflow-wrap: anywhere; }\n}\n.account-hint { margin: 0; color: var(--text-muted); font-size: var(--text-sm); }\n.password-form { display: flex; flex-direction: column; gap: var(--space-4); border-top: 1px solid var(--border); padding-top: var(--space-4); h3 { margin: 0; } }\n.drawer__body { min-height: 0; }\n.intro > div { min-width: 0; overflow-wrap: anywhere; }\n@media (max-width: 600px) {\n  .page__actions { flex-wrap: wrap; }\n  .drawer__foot { flex-wrap: wrap; }\n  .drawer__foot .btn { white-space: normal; }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UsersComponent, { className: "UsersComponent", filePath: "frontend/src/app/features/users/users.component.ts", lineNumber: 31 }); })();
//# sourceMappingURL=users.component.js.map