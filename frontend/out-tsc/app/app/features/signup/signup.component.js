import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SignupService } from '@core/services/signup.service';
import { NotificationService } from '@core/services/notification.service';
import { AuthService } from '@core/auth/auth.service';
import { DemoSetupStore } from '@core/services/demo-setup.store';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function SignupComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "span", 15);
    i0.ɵɵtext(2, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "strong");
    i0.ɵɵtext(5, "Votre sc\u00E9nario de d\u00E9monstration est pr\u00EAt");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", ctx_r0.demoSummary(), ". Il reste attach\u00E9 \u00E0 cet onglet et vous pourrez encore l\u2019ajuster.");
} }
function SignupComponent_Conditional_31_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "Le nom est obligatoire.");
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_31_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 25);
    i0.ɵɵtext(1, "V\u00E9rification...");
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_31_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "Ce code est d\u00E9j\u00E0 utilis\u00E9, choisissez-en un autre.");
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_31_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 26);
    i0.ɵɵtext(1, "Ce code est disponible.");
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_31_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 25);
    i0.ɵɵtext(1, " Identifiant court et unique. Il servira de prefixe aux matricules : ");
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", (ctx_r0.schoolForm.controls.schoolCode.value || "GSH").toUpperCase(), "-2026-000123");
} }
function SignupComponent_Conditional_31_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "Lettres, chiffres et tirets uniquement.");
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 16);
    i0.ɵɵlistener("ngSubmit", function SignupComponent_Conditional_31_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.goToStep2()); });
    i0.ɵɵelementStart(1, "h1", 17);
    i0.ɵɵtext(2, "Cr\u00E9er mon espace Soocloo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 18);
    i0.ɵɵtext(4, "Ces informations identifieront votre \u00E9cole t\u00E9moin et son administrateur.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 19)(6, "label", 20);
    i0.ɵɵtext(7, " Nom de l'\u00E9tablissement ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 21);
    i0.ɵɵtemplate(9, SignupComponent_Conditional_31_Conditional_9_Template, 2, 0, "span", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 19)(11, "label", 23);
    i0.ɵɵtext(12, " Code \u00E9tablissement ");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 24);
    i0.ɵɵtemplate(14, SignupComponent_Conditional_31_Conditional_14_Template, 2, 0, "span", 25)(15, SignupComponent_Conditional_31_Conditional_15_Template, 2, 0, "span", 22)(16, SignupComponent_Conditional_31_Conditional_16_Template, 2, 0, "span", 26)(17, SignupComponent_Conditional_31_Conditional_17_Template, 4, 1, "span", 25)(18, SignupComponent_Conditional_31_Conditional_18_Template, 2, 0, "span", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 27)(20, "div", 19)(21, "label", 28);
    i0.ɵɵtext(22, "Ville");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(23, "input", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 19)(25, "label", 30);
    i0.ɵɵtext(26, "Pays");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(27, "input", 31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div", 27)(29, "div", 19)(30, "label", 32);
    i0.ɵɵtext(31, "T\u00E9l\u00E9phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(32, "input", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 19)(34, "label", 34);
    i0.ɵɵtext(35, "Devise");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "select", 35)(37, "option", 36);
    i0.ɵɵtext(38, "Franc CFA (XOF)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "option", 37);
    i0.ɵɵtext(40, "Franc CFA (XAF)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "option", 38);
    i0.ɵɵtext(42, "Euro (EUR)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "option", 39);
    i0.ɵɵtext(44, "Dollar (USD)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "option", 40);
    i0.ɵɵtext(46, "Dirham (MAD)");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(47, "button", 41);
    i0.ɵɵtext(48, " Continuer ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "p", 42);
    i0.ɵɵtext(50, " Vous avez d\u00E9j\u00E0 un compte ? ");
    i0.ɵɵelementStart(51, "a", 43);
    i0.ɵɵtext(52, "Se connecter");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.schoolForm);
    i0.ɵɵadvance(9);
    i0.ɵɵconditional(ctx_r0.schoolForm.controls.schoolName.touched && ctx_r0.schoolForm.controls.schoolName.invalid ? 9 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("is-invalid", ctx_r0.codeAvailable() === false);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.checkingCode() ? 14 : ctx_r0.codeAvailable() === false ? 15 : ctx_r0.codeAvailable() === true ? 16 : 17);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r0.schoolForm.controls.schoolCode.touched && (ctx_r0.schoolForm.controls.schoolCode.errors == null ? null : ctx_r0.schoolForm.controls.schoolCode.errors["pattern"]) ? 18 : -1);
    i0.ɵɵadvance(29);
    i0.ɵɵproperty("disabled", ctx_r0.codeAvailable() === false);
} }
function SignupComponent_Conditional_32_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "Le pr\u00E9nom est obligatoire.");
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_32_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "Le nom est obligatoire.");
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_32_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 25);
    i0.ɵɵtext(1, "V\u00E9rification...");
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_32_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "Un compte existe d\u00E9j\u00E0 avec cet email.");
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_32_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "Format d'email invalide.");
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_32_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 25);
    i0.ɵɵtext(1, "Il servira d'identifiant de connexion.");
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_32_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 56);
    i0.ɵɵelement(1, "path", 62)(2, "path", 63)(3, "path", 64)(4, "path", 65);
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_32_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 56);
    i0.ɵɵelement(1, "path", 66)(2, "circle", 67);
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_32_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68)(1, "div", 69);
    i0.ɵɵelement(2, "span", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 71);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "ul", 72)(6, "li");
    i0.ɵɵtext(7, "Au moins 10 caract\u00E8res");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "li");
    i0.ɵɵtext(9, "Une majuscule");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "li");
    i0.ɵɵtext(11, "Une minuscule");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "li");
    i0.ɵɵtext(13, "Un chiffre");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap("strength__fill--" + ctx_r0.passwordStrength().score);
    i0.ɵɵstyleProp("width", ctx_r0.passwordStrength().score * 25, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.passwordStrength().label);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("checks--ok", ctx_r0.passwordStrength().checks.length);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("checks--ok", ctx_r0.passwordStrength().checks.upper);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("checks--ok", ctx_r0.passwordStrength().checks.lower);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("checks--ok", ctx_r0.passwordStrength().checks.digit);
} }
function SignupComponent_Conditional_32_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "Vous devez accepter les conditions.");
    i0.ɵɵelementEnd();
} }
function SignupComponent_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 16);
    i0.ɵɵlistener("ngSubmit", function SignupComponent_Conditional_32_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submit()); });
    i0.ɵɵelementStart(1, "h1", 17);
    i0.ɵɵtext(2, "Votre compte administrateur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 18);
    i0.ɵɵtext(4, " Ce compte pourra tout gerer dans ");
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7, " et cr\u00E9er les autres utilisateurs. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 27)(9, "div", 19)(10, "label", 44);
    i0.ɵɵtext(11, "Pr\u00E9nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 45);
    i0.ɵɵtemplate(13, SignupComponent_Conditional_32_Conditional_13_Template, 2, 0, "span", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 19)(15, "label", 46);
    i0.ɵɵtext(16, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(17, "input", 47);
    i0.ɵɵtemplate(18, SignupComponent_Conditional_32_Conditional_18_Template, 2, 0, "span", 22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 19)(20, "label", 48);
    i0.ɵɵtext(21, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(22, "input", 49);
    i0.ɵɵtemplate(23, SignupComponent_Conditional_32_Conditional_23_Template, 2, 0, "span", 25)(24, SignupComponent_Conditional_32_Conditional_24_Template, 2, 0, "span", 22)(25, SignupComponent_Conditional_32_Conditional_25_Template, 2, 0, "span", 22)(26, SignupComponent_Conditional_32_Conditional_26_Template, 2, 0, "span", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 19)(28, "label", 50);
    i0.ɵɵtext(29, "T\u00E9l\u00E9phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 19)(32, "label", 52);
    i0.ɵɵtext(33, "Mot de passe");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 53);
    i0.ɵɵelement(35, "input", 54);
    i0.ɵɵelementStart(36, "button", 55);
    i0.ɵɵlistener("click", function SignupComponent_Conditional_32_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.togglePassword()); });
    i0.ɵɵtemplate(37, SignupComponent_Conditional_32_Conditional_37_Template, 5, 0, ":svg:svg", 56)(38, SignupComponent_Conditional_32_Conditional_38_Template, 3, 0, ":svg:svg", 56);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(39, SignupComponent_Conditional_32_Conditional_39_Template, 14, 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "label", 57);
    i0.ɵɵelement(41, "input", 58);
    i0.ɵɵelementStart(42, "span");
    i0.ɵɵtext(43, "J'accepte les conditions d'utilisation et la politique de confidentialite.");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(44, SignupComponent_Conditional_32_Conditional_44_Template, 2, 0, "span", 22);
    i0.ɵɵelementStart(45, "div", 59)(46, "button", 60);
    i0.ɵɵlistener("click", function SignupComponent_Conditional_32_Template_button_click_46_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.back()); });
    i0.ɵɵtext(47, "Retour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "button", 61);
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.adminForm);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.schoolForm.controls.schoolName.value);
    i0.ɵɵadvance(7);
    i0.ɵɵconditional(ctx_r0.adminForm.controls.firstName.touched && ctx_r0.adminForm.controls.firstName.invalid ? 13 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r0.adminForm.controls.lastName.touched && ctx_r0.adminForm.controls.lastName.invalid ? 18 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("is-invalid", ctx_r0.emailAvailable() === false);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.checkingEmail() ? 23 : ctx_r0.emailAvailable() === false ? 24 : ctx_r0.adminForm.controls.email.touched && ctx_r0.adminForm.controls.email.invalid ? 25 : 26);
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("type", ctx_r0.passwordVisible() ? "text" : "password");
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", ctx_r0.passwordVisible() ? "Masquer le mot de passe" : "Afficher le mot de passe")("aria-pressed", ctx_r0.passwordVisible());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.passwordVisible() ? 37 : 38);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.adminForm.controls.password.value ? 39 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r0.adminForm.controls.acceptedTerms.touched && ctx_r0.adminForm.controls.acceptedTerms.invalid ? 44 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r0.submitting() || !ctx_r0.passwordStrength().valid);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.submitting() ? "Creation en cours..." : "Creer mon etablissement", " ");
} }
/**
 * Public signup: the school, then its administrator.
 *
 * <p>Split in two steps because asking for eleven fields at once is the surest
 * way to lose someone. Availability of the school code and the email is checked
 * live, so a conflict never surfaces only at submit time.</p>
 */
export class SignupComponent {
    fb = inject(FormBuilder);
    signupService = inject(SignupService);
    notifications = inject(NotificationService);
    auth = inject(AuthService);
    demoSetup = inject(DemoSetupStore);
    router = inject(Router);
    destroyRef = inject(DestroyRef);
    demoDraft = this.demoSetup.draft();
    step = signal(1);
    submitting = signal(false);
    /**
     * Le mot de passe est-il lisible à l'écran ?
     *
     * <p>Utile surtout ici : il faut satisfaire quatre règles de robustesse, et
     * corriger à l'aveugle une majuscule manquante fait recommencer la saisie
     * entière. Il redevient masqué à la soumission — un bureau d'école est un
     * poste partagé.</p>
     */
    passwordVisible = signal(false);
    codeAvailable = signal(null);
    emailAvailable = signal(null);
    checkingCode = signal(false);
    checkingEmail = signal(false);
    hasDemoDraft = this.demoSetup.hasDraft;
    demoSummary = computed(() => {
        const draft = this.demoSetup.draft();
        const profileLabels = {
            primary: 'Maternelle & primaire',
            secondary: 'Collège & lycée',
            group: 'Groupe scolaire'
        };
        const period = draft.rules.periodScheme === 'trimester' ? '3 trimestres' : '2 semestres';
        const scale = draft.rules.gradingScale === 'competency'
            ? 'évaluation par compétences'
            : `notes sur ${draft.rules.gradingScale}`;
        return `${profileLabels[draft.profile.preset]} · ${period} · ${scale}`;
    });
    schoolForm = this.fb.nonNullable.group({
        schoolName: [this.demoDraft.profile.schoolName, [Validators.required, Validators.maxLength(200)]],
        schoolCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30),
                Validators.pattern(/^[A-Za-z0-9-]+$/)]],
        city: [this.demoDraft.profile.city],
        country: [this.demoDraft.profile.country || 'Côte d’Ivoire'],
        schoolPhone: [''],
        currency: [this.demoDraft.rules.currency, [Validators.required]]
    });
    adminForm = this.fb.nonNullable.group({
        firstName: ['', [Validators.required, Validators.maxLength(120)]],
        lastName: ['', [Validators.required, Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        password: ['', [Validators.required, Validators.minLength(10)]],
        acceptedTerms: [false, [Validators.requiredTrue]]
    });
    /** Mirrors the server-side rule so the user is never surprised on submit. */
    passwordStrength = computed(() => {
        const value = this.passwordValue();
        const checks = {
            length: value.length >= 10,
            upper: /[A-Z]/.test(value),
            lower: /[a-z]/.test(value),
            digit: /\d/.test(value)
        };
        const score = Object.values(checks).filter(Boolean).length;
        return {
            checks,
            score,
            label: score <= 1 ? 'Faible' : score === 2 ? 'Moyen' : score === 3 ? 'Bon' : 'Solide',
            valid: score === 4
        };
    });
    passwordValue = signal('');
    constructor() {
        // Live availability of the school code.
        this.schoolForm.controls.schoolCode.valueChanges
            .pipe(debounceTime(400), distinctUntilChanged(), switchMap((code) => {
            const normalised = code.trim();
            if (normalised.length < 2) {
                this.codeAvailable.set(null);
                return [];
            }
            this.checkingCode.set(true);
            return this.signupService.isSchoolCodeAvailable(normalised);
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((available) => {
            this.checkingCode.set(false);
            this.codeAvailable.set(available);
        });
        this.adminForm.controls.email.valueChanges
            .pipe(debounceTime(400), distinctUntilChanged(), switchMap((email) => {
            if (!email.includes('@')) {
                this.emailAvailable.set(null);
                return [];
            }
            this.checkingEmail.set(true);
            return this.signupService.isEmailAvailable(email.trim());
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((available) => {
            this.checkingEmail.set(false);
            this.emailAvailable.set(available);
        });
        this.adminForm.controls.password.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((value) => this.passwordValue.set(value));
    }
    goToStep2() {
        if (this.schoolForm.invalid || this.codeAvailable() === false) {
            this.schoolForm.markAllAsTouched();
            return;
        }
        this.step.set(2);
    }
    back() {
        this.step.set(1);
    }
    togglePassword() {
        this.passwordVisible.update((visible) => !visible);
    }
    submit() {
        if (this.adminForm.invalid || !this.passwordStrength().valid
            || this.emailAvailable() === false || this.submitting()) {
            this.adminForm.markAllAsTouched();
            return;
        }
        this.submitting.set(true);
        this.passwordVisible.set(false);
        this.signupService
            .signup({
            ...this.schoolForm.getRawValue(),
            ...this.adminForm.getRawValue(),
            // Ce que le visiteur a composé dans « Composer ma démo » part enfin
            // avec l'inscription. Sans cette ligne, les quatre étapes de saisie ne
            // servaient qu'à pré-remplir le nom de l'école : le serveur créait un
            // établissement vide, et le tableau de bord annonçait « 1 étape sur
            // 10 » à quelqu'un qui venait d'en remplir quatre.
            operations: this.demoSetup.operationsForSignup()
        })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (response) => {
                this.notifications.success(`${response.schoolName} est cree. Annee scolaire ${response.academicYearCode} ouverte.`, 'Bienvenue sur Soocloo');
                // The API already returns a usable session; go straight to the wizard.
                this.auth.applyExternalSession({
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken,
                    userId: response.userId,
                    username: response.email,
                    email: response.email,
                    fullName: response.fullName,
                    schoolId: response.schoolId,
                    roles: ['SCHOOL_ADMIN']
                });
                // Le serveur dit si l'assistant a encore quelque chose à poser.
                // Y envoyer quelqu'un dont l'école vient d'être configurée par le
                // parcours le ferait buter sur le refus de l'assistant, qui
                // s'interdit de tourner deux fois pour ne pas doubler les classes.
                // Il arrive donc directement sur son tableau de bord, déjà rempli.
                void this.router.navigate([response.onboardingRequired ? '/onboarding' : '/dashboard']);
            },
            error: () => this.submitting.set(false)
        });
    }
    static ɵfac = function SignupComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SignupComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SignupComponent, selectors: [["eduops-signup"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 33, vars: 9, consts: [[1, "signup"], ["aria-hidden", "true", 1, "signup__aside"], ["routerLink", "/", 1, "signup__brand"], [1, "signup__logo"], [1, "signup__brandname"], [1, "signup__quote"], [1, "signup__points"], ["id", "main-content", 1, "signup__main"], [1, "signup__panel"], [1, "signup__back", 3, "routerLink"], ["role", "status", 1, "demo-context"], ["aria-label", "\u00C9tapes", 1, "steps"], [1, "steps__item"], [1, "steps__index"], [1, "form", 3, "formGroup"], ["aria-hidden", "true", 1, "demo-context__icon"], [1, "form", 3, "ngSubmit", "formGroup"], [1, "form__title"], [1, "form__lead"], [1, "field"], ["for", "schoolName", 1, "field__label", "field__label--required"], ["id", "schoolName", "type", "text", "formControlName", "schoolName", "placeholder", "Groupe Scolaire Horizon", "autocomplete", "organization", 1, "input"], [1, "field__error"], ["for", "schoolCode", 1, "field__label", "field__label--required"], ["id", "schoolCode", "type", "text", "formControlName", "schoolCode", "placeholder", "GSH", "maxlength", "30", 1, "input"], [1, "field__hint"], [1, "field__hint", "field__hint--ok"], [1, "form__row"], ["for", "city", 1, "field__label"], ["id", "city", "type", "text", "formControlName", "city", "placeholder", "Abidjan", "autocomplete", "address-level2", 1, "input"], ["for", "country", 1, "field__label"], ["id", "country", "type", "text", "formControlName", "country", "autocomplete", "country-name", 1, "input"], ["for", "schoolPhone", 1, "field__label"], ["id", "schoolPhone", "type", "tel", "formControlName", "schoolPhone", "placeholder", "+225 27 20 00 00 00", "autocomplete", "tel", 1, "input"], ["for", "currency", 1, "field__label", "field__label--required"], ["id", "currency", "formControlName", "currency", 1, "select"], ["value", "XOF"], ["value", "XAF"], ["value", "EUR"], ["value", "USD"], ["value", "MAD"], ["type", "submit", 1, "btn", "btn--primary", "btn--block", "btn--lg", 3, "disabled"], [1, "form__switch"], ["routerLink", "/login"], ["for", "firstName", 1, "field__label", "field__label--required"], ["id", "firstName", "type", "text", "formControlName", "firstName", "autocomplete", "given-name", 1, "input"], ["for", "lastName", 1, "field__label", "field__label--required"], ["id", "lastName", "type", "text", "formControlName", "lastName", "autocomplete", "family-name", 1, "input"], ["for", "email", 1, "field__label", "field__label--required"], ["id", "email", "type", "email", "formControlName", "email", "placeholder", "directeur@monecole.ci", "autocomplete", "email", 1, "input"], ["for", "phone", 1, "field__label"], ["id", "phone", "type", "tel", "formControlName", "phone", "autocomplete", "tel", 1, "input"], ["for", "password", 1, "field__label", "field__label--required"], [1, "field__control"], ["id", "password", "formControlName", "password", "autocomplete", "new-password", 1, "input", "input--with-action", 3, "type"], ["type", "button", 1, "field__reveal", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "aria-hidden", "true"], [1, "terms"], ["type", "checkbox", "formControlName", "acceptedTerms"], [1, "form__actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "submit", 1, "btn", "btn--primary", "btn--lg", 3, "disabled"], ["d", "M3 3l18 18"], ["d", "M10.6 10.6a2 2 0 002.8 2.8"], ["d", "M9.4 5.3A9.6 9.6 0 0112 5c5 0 9 4.5 9 7a11 11 0 01-2.6 3.6"], ["d", "M6.3 6.9C3.9 8.4 3 10.6 3 12c0 2.5 4 7 9 7 1.3 0 2.5-.3 3.6-.8"], ["d", "M3 12c0-2.5 4-7 9-7s9 4.5 9 7-4 7-9 7-9-4.5-9-7z"], ["cx", "12", "cy", "12", "r", "2.6"], [1, "strength"], [1, "strength__bar"], [1, "strength__fill"], [1, "strength__label"], [1, "checks"]], template: function SignupComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "aside", 1)(2, "a", 2)(3, "span", 3);
            i0.ɵɵtext(4, "S");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "span", 4);
            i0.ɵɵtext(6, "Soocloo");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "blockquote", 5)(8, "p");
            i0.ɵɵtext(9, "En quelques minutes, votre \u00E9tablissement est pr\u00EAt : ann\u00E9e scolaire ouverte, trimestres cr\u00E9\u00E9s, compte administrateur actif.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "ul", 6)(11, "li");
            i0.ɵɵtext(12, "Vos donn\u00E9es sont isolees des autres \u00E9tablissements");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "li");
            i0.ɵɵtext(14, "Aucune carte bancaire demandee pour configurer la demonstration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "li");
            i0.ɵɵtext(16, "Assistant guide pour les cycles, classes et frais");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(17, "main", 7)(18, "div", 8)(19, "a", 9);
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(21, SignupComponent_Conditional_21_Template, 8, 1, "div", 10);
            i0.ɵɵelementStart(22, "ol", 11)(23, "li", 12)(24, "span", 13);
            i0.ɵɵtext(25, "1");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(26, " \u00C9tablissement ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "li", 12)(28, "span", 13);
            i0.ɵɵtext(29, "2");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(30, " Administrateur ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(31, SignupComponent_Conditional_31_Template, 53, 7, "form", 14)(32, SignupComponent_Conditional_32_Template, 50, 15, "form", 14);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("routerLink", ctx.hasDemoDraft() ? "/commencer" : "/");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" \u2039 ", ctx.hasDemoDraft() ? "Retour \u00E0 ma configuration" : "Retour \u00E0 l\u2019accueil", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.hasDemoDraft() ? 21 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("steps__item--active", ctx.step() >= 1);
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("steps__item--active", ctx.step() >= 2);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.step() === 1 ? 31 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.step() === 2 ? 32 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: ["@import 'styles/tokens';\n\n.signup[_ngcontent-%COMP%] { min-height: 100vh; display: grid; grid-template-columns: 420px 1fr; }\n\n\n\n.signup__aside[_ngcontent-%COMP%] {\n  display: flex; flex-direction: column; gap: var(--space-8);\n  padding: var(--space-10) var(--space-8);\n  background: linear-gradient(150deg, var(--brand) 0%, #143f95 100%);\n  color: #fff;\n}\n.signup__brand[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-2); text-decoration: none; }\n.signup__logo[_ngcontent-%COMP%] {\n  width: 36px; height: 36px; display: grid; place-items: center;\n  background: rgba(255,255,255,.18); border-radius: 10px;\n  font-family: var(--font-display); font-weight: 800; font-size: 18px; color: #fff;\n}\n.signup__brandname[_ngcontent-%COMP%] {\n  font-family: var(--font-display); font-size: var(--text-lg);\n  font-weight: 700; letter-spacing: -0.02em; color: #fff;\n}\n.signup__quote[_ngcontent-%COMP%] { margin: auto 0 0; }\n.signup__quote[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-family: var(--font-display); font-size: var(--text-xl);\n  font-weight: 700; letter-spacing: -0.02em; line-height: 1.35; margin: 0;\n}\n.signup__points[_ngcontent-%COMP%] { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-3); }\n.signup__points[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  position: relative; padding-left: var(--space-6);\n  font-size: var(--text-base); opacity: .92; line-height: 1.5;\n}\n.signup__points[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: '\u2713'; position: absolute; left: 0; top: 0;\n  width: 18px; height: 18px; display: grid; place-items: center;\n  border-radius: 50%; background: rgba(255,255,255,.2); font-size: 11px; font-weight: 700;\n}\n\n\n\n.signup__main[_ngcontent-%COMP%] { display: grid; place-items: center; padding: var(--space-8) var(--space-6); background: var(--surface-page); }\n.signup__panel[_ngcontent-%COMP%] { width: 100%; max-width: 520px; }\n.signup__back[_ngcontent-%COMP%] {\n  display: inline-block; margin-bottom: var(--space-5);\n  font-size: var(--text-sm); font-weight: 600; color: var(--text-muted);\n}\n.signup__back[_ngcontent-%COMP%]:hover { color: var(--brand); text-decoration: none; }\n\n.demo-context[_ngcontent-%COMP%] {\n  display: flex; align-items: flex-start; gap: var(--space-3);\n  margin-bottom: var(--space-5); padding: var(--space-4);\n  border: 1px solid var(--brand-tint-border); border-radius: var(--radius-card);\n  background: linear-gradient(135deg, var(--brand-tint), #f7fbff);\n}\n.demo-context__icon[_ngcontent-%COMP%] {\n  flex: 0 0 28px; height: 28px; display: grid; place-items: center;\n  border-radius: 9px; background: var(--brand); color: #fff; font-weight: 800;\n}\n.demo-context[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; color: var(--text-strong); font-size: var(--text-sm); }\n.demo-context[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 3px 0 0; color: var(--text-muted); font-size: var(--text-xs); line-height: 1.5; }\n\n\n\n.steps[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); list-style: none; margin: 0 0 var(--space-6); padding: 0; }\n.steps__item[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: var(--space-2);\n  padding: var(--space-2) var(--space-4); border-radius: var(--radius-pill);\n  background: var(--surface-card); border: 1px solid var(--border);\n  font-size: var(--text-sm); font-weight: 600; color: var(--text-muted);\n}\n.steps__item--active[_ngcontent-%COMP%] { background: var(--brand-tint); border-color: var(--brand-tint-border); color: var(--brand); }\n.steps__index[_ngcontent-%COMP%] {\n  width: 20px; height: 20px; display: grid; place-items: center;\n  border-radius: 50%; background: currentColor; color: #fff; font-size: 11px;\n}\n.steps__item--active[_ngcontent-%COMP%]   .steps__index[_ngcontent-%COMP%] { background: var(--brand); }\n\n\n\n.form[_ngcontent-%COMP%] {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); padding: var(--space-8);\n  box-shadow: var(--shadow-sm);\n}\n.form__title[_ngcontent-%COMP%] { font-size: var(--text-2xl); margin: 0 0 var(--space-2); }\n.form__lead[_ngcontent-%COMP%] { color: var(--text-muted); margin-bottom: var(--space-6); }\n.form__row[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }\n.form__actions[_ngcontent-%COMP%] { display: flex; gap: var(--space-3); justify-content: space-between; margin-top: var(--space-5); }\n.form__actions[_ngcontent-%COMP%]   .btn--lg[_ngcontent-%COMP%] { flex: 1; }\n.form__switch[_ngcontent-%COMP%] { margin: var(--space-5) 0 0; text-align: center; font-size: var(--text-sm); color: var(--text-muted); }\n\n.field__hint--ok[_ngcontent-%COMP%] { color: var(--success); font-weight: 600; }\n\n\n\n.strength[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); margin-top: var(--space-2); }\n.strength__bar[_ngcontent-%COMP%] { flex: 1; height: 5px; background: var(--surface-sunken); border-radius: var(--radius-pill); overflow: hidden; }\n.strength__fill[_ngcontent-%COMP%] { display: block; height: 100%; border-radius: var(--radius-pill); transition: width var(--transition-base); }\n.strength__fill--1[_ngcontent-%COMP%] { background: var(--danger); }\n.strength__fill--2[_ngcontent-%COMP%] { background: var(--warning); }\n.strength__fill--3[_ngcontent-%COMP%] { background: var(--chart-5); }\n.strength__fill--4[_ngcontent-%COMP%] { background: var(--success); }\n.strength__label[_ngcontent-%COMP%] { font-size: var(--text-xs); font-weight: 700; color: var(--text-muted); min-width: 48px; }\n\n.checks[_ngcontent-%COMP%] { list-style: none; margin: var(--space-3) 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-1); }\n.checks[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] { position: relative; padding-left: var(--space-5); font-size: var(--text-xs); color: var(--text-light); }\n.checks[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before { content: '\u25CB'; position: absolute; left: 0; }\n.checks--ok[_ngcontent-%COMP%] { color: var(--success); }\n.checks--ok[_ngcontent-%COMP%]::before { content: '\u25CF'; }\n\n\n\n.terms[_ngcontent-%COMP%] { display: flex; gap: var(--space-3); align-items: flex-start; margin-top: var(--space-4); cursor: pointer; }\n.terms[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { margin-top: 3px; flex-shrink: 0; }\n.terms[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--text-normal); line-height: 1.5; }\n\n\n\n@include tablet-down {\n  .signup { grid-template-columns: 1fr; }\n  .signup__aside { display: none; }\n  .signup__main { padding: var(--space-5) var(--space-4); align-items: start; }\n  .form { padding: var(--space-5); }\n  .form__row { grid-template-columns: 1fr; gap: 0; }\n  .checks { grid-template-columns: 1fr; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignupComponent, [{
        type: Component,
        args: [{ selector: 'eduops-signup', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"signup\">\n  <aside class=\"signup__aside\" aria-hidden=\"true\">\n    <a class=\"signup__brand\" routerLink=\"/\">\n      <span class=\"signup__logo\">S</span>\n      <span class=\"signup__brandname\">Soocloo</span>\n    </a>\n    <blockquote class=\"signup__quote\">\n      <p>En quelques minutes, votre \u00E9tablissement est pr\u00EAt : ann\u00E9e scolaire ouverte,\n         trimestres cr\u00E9\u00E9s, compte administrateur actif.</p>\n    </blockquote>\n    <ul class=\"signup__points\">\n      <li>Vos donn\u00E9es sont isolees des autres \u00E9tablissements</li>\n      <li>Aucune carte bancaire demandee pour configurer la demonstration</li>\n      <li>Assistant guide pour les cycles, classes et frais</li>\n    </ul>\n  </aside>\n\n  <main class=\"signup__main\" id=\"main-content\">\n    <div class=\"signup__panel\">\n      <a class=\"signup__back\" [routerLink]=\"hasDemoDraft() ? '/commencer' : '/'\">\n        &lsaquo; {{ hasDemoDraft() ? 'Retour \u00E0 ma configuration' : 'Retour \u00E0 l\u2019accueil' }}\n      </a>\n\n      @if (hasDemoDraft()) {\n        <div class=\"demo-context\" role=\"status\">\n          <span class=\"demo-context__icon\" aria-hidden=\"true\">\u2713</span>\n          <div>\n            <strong>Votre sc\u00E9nario de d\u00E9monstration est pr\u00EAt</strong>\n            <p>{{ demoSummary() }}. Il reste attach\u00E9 \u00E0 cet onglet et vous pourrez encore l\u2019ajuster.</p>\n          </div>\n        </div>\n      }\n\n      <ol class=\"steps\" aria-label=\"\u00C9tapes\">\n        <li class=\"steps__item\" [class.steps__item--active]=\"step() >= 1\">\n          <span class=\"steps__index\">1</span> \u00C9tablissement\n        </li>\n        <li class=\"steps__item\" [class.steps__item--active]=\"step() >= 2\">\n          <span class=\"steps__index\">2</span> Administrateur\n        </li>\n      </ol>\n\n      <!-- \u2550\u2550\u2550 Etape 1 : l'etablissement \u2550\u2550\u2550 -->\n      @if (step() === 1) {\n        <form class=\"form\" [formGroup]=\"schoolForm\" (ngSubmit)=\"goToStep2()\">\n          <h1 class=\"form__title\">Cr\u00E9er mon espace Soocloo</h1>\n          <p class=\"form__lead\">Ces informations identifieront votre \u00E9cole t\u00E9moin et son administrateur.</p>\n\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"schoolName\">\n              Nom de l'\u00E9tablissement\n            </label>\n            <input id=\"schoolName\" class=\"input\" type=\"text\" formControlName=\"schoolName\"\n                   placeholder=\"Groupe Scolaire Horizon\" autocomplete=\"organization\" />\n            @if (schoolForm.controls.schoolName.touched && schoolForm.controls.schoolName.invalid) {\n              <span class=\"field__error\">Le nom est obligatoire.</span>\n            }\n          </div>\n\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"schoolCode\">\n              Code \u00E9tablissement\n            </label>\n            <input id=\"schoolCode\" class=\"input\" type=\"text\" formControlName=\"schoolCode\"\n                   placeholder=\"GSH\" maxlength=\"30\"\n                   [class.is-invalid]=\"codeAvailable() === false\" />\n            @if (checkingCode()) {\n              <span class=\"field__hint\">V\u00E9rification...</span>\n            } @else if (codeAvailable() === false) {\n              <span class=\"field__error\">Ce code est d\u00E9j\u00E0 utilis\u00E9, choisissez-en un autre.</span>\n            } @else if (codeAvailable() === true) {\n              <span class=\"field__hint field__hint--ok\">Ce code est disponible.</span>\n            } @else {\n              <span class=\"field__hint\">\n                Identifiant court et unique. Il servira de prefixe aux matricules :\n                <strong>{{ (schoolForm.controls.schoolCode.value || 'GSH').toUpperCase() }}-2026-000123</strong>\n              </span>\n            }\n            @if (schoolForm.controls.schoolCode.touched && schoolForm.controls.schoolCode.errors?.['pattern']) {\n              <span class=\"field__error\">Lettres, chiffres et tirets uniquement.</span>\n            }\n          </div>\n\n          <div class=\"form__row\">\n            <div class=\"field\">\n              <label class=\"field__label\" for=\"city\">Ville</label>\n              <input id=\"city\" class=\"input\" type=\"text\" formControlName=\"city\"\n                     placeholder=\"Abidjan\" autocomplete=\"address-level2\" />\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label\" for=\"country\">Pays</label>\n              <input id=\"country\" class=\"input\" type=\"text\" formControlName=\"country\"\n                     autocomplete=\"country-name\" />\n            </div>\n          </div>\n\n          <div class=\"form__row\">\n            <div class=\"field\">\n              <label class=\"field__label\" for=\"schoolPhone\">T\u00E9l\u00E9phone</label>\n              <input id=\"schoolPhone\" class=\"input\" type=\"tel\" formControlName=\"schoolPhone\"\n                     placeholder=\"+225 27 20 00 00 00\" autocomplete=\"tel\" />\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"currency\">Devise</label>\n              <select id=\"currency\" class=\"select\" formControlName=\"currency\">\n                <option value=\"XOF\">Franc CFA (XOF)</option>\n                <option value=\"XAF\">Franc CFA (XAF)</option>\n                <option value=\"EUR\">Euro (EUR)</option>\n                <option value=\"USD\">Dollar (USD)</option>\n                <option value=\"MAD\">Dirham (MAD)</option>\n              </select>\n            </div>\n          </div>\n\n          <button type=\"submit\" class=\"btn btn--primary btn--block btn--lg\"\n                  [disabled]=\"codeAvailable() === false\">\n            Continuer\n          </button>\n\n          <p class=\"form__switch\">\n            Vous avez d\u00E9j\u00E0 un compte ? <a routerLink=\"/login\">Se connecter</a>\n          </p>\n        </form>\n      }\n\n      <!-- \u2550\u2550\u2550 Etape 2 : l'administrateur \u2550\u2550\u2550 -->\n      @if (step() === 2) {\n        <form class=\"form\" [formGroup]=\"adminForm\" (ngSubmit)=\"submit()\">\n          <h1 class=\"form__title\">Votre compte administrateur</h1>\n          <p class=\"form__lead\">\n            Ce compte pourra tout gerer dans <strong>{{ schoolForm.controls.schoolName.value }}</strong>\n            et cr\u00E9er les autres utilisateurs.\n          </p>\n\n          <div class=\"form__row\">\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"firstName\">Pr\u00E9nom</label>\n              <input id=\"firstName\" class=\"input\" type=\"text\" formControlName=\"firstName\"\n                     autocomplete=\"given-name\" />\n              @if (adminForm.controls.firstName.touched && adminForm.controls.firstName.invalid) {\n                <span class=\"field__error\">Le pr\u00E9nom est obligatoire.</span>\n              }\n            </div>\n            <div class=\"field\">\n              <label class=\"field__label field__label--required\" for=\"lastName\">Nom</label>\n              <input id=\"lastName\" class=\"input\" type=\"text\" formControlName=\"lastName\"\n                     autocomplete=\"family-name\" />\n              @if (adminForm.controls.lastName.touched && adminForm.controls.lastName.invalid) {\n                <span class=\"field__error\">Le nom est obligatoire.</span>\n              }\n            </div>\n          </div>\n\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"email\">Email</label>\n            <input id=\"email\" class=\"input\" type=\"email\" formControlName=\"email\"\n                   placeholder=\"directeur@monecole.ci\" autocomplete=\"email\"\n                   [class.is-invalid]=\"emailAvailable() === false\" />\n            @if (checkingEmail()) {\n              <span class=\"field__hint\">V\u00E9rification...</span>\n            } @else if (emailAvailable() === false) {\n              <span class=\"field__error\">Un compte existe d\u00E9j\u00E0 avec cet email.</span>\n            } @else if (adminForm.controls.email.touched && adminForm.controls.email.invalid) {\n              <span class=\"field__error\">Format d'email invalide.</span>\n            } @else {\n              <span class=\"field__hint\">Il servira d'identifiant de connexion.</span>\n            }\n          </div>\n\n          <div class=\"field\">\n            <label class=\"field__label\" for=\"phone\">T\u00E9l\u00E9phone</label>\n            <input id=\"phone\" class=\"input\" type=\"tel\" formControlName=\"phone\"\n                   autocomplete=\"tel\" />\n          </div>\n\n          <div class=\"field\">\n            <label class=\"field__label field__label--required\" for=\"password\">Mot de passe</label>\n            <div class=\"field__control\">\n              <input id=\"password\" class=\"input input--with-action\"\n                     [type]=\"passwordVisible() ? 'text' : 'password'\"\n                     formControlName=\"password\" autocomplete=\"new-password\" />\n              <!-- type=\"button\" : sans lui, ce bouton soumettrait l'\u00E9tape. -->\n              <button type=\"button\" class=\"field__reveal\"\n                      [attr.aria-label]=\"passwordVisible()\n                        ? 'Masquer le mot de passe' : 'Afficher le mot de passe'\"\n                      [attr.aria-pressed]=\"passwordVisible()\"\n                      (click)=\"togglePassword()\">\n                @if (passwordVisible()) {\n                  <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\"\n                       stroke-width=\"1.8\" stroke-linecap=\"round\" aria-hidden=\"true\">\n                    <path d=\"M3 3l18 18\" />\n                    <path d=\"M10.6 10.6a2 2 0 002.8 2.8\" />\n                    <path d=\"M9.4 5.3A9.6 9.6 0 0112 5c5 0 9 4.5 9 7a11 11 0 01-2.6 3.6\" />\n                    <path d=\"M6.3 6.9C3.9 8.4 3 10.6 3 12c0 2.5 4 7 9 7 1.3 0 2.5-.3 3.6-.8\" />\n                  </svg>\n                } @else {\n                  <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\"\n                       stroke-width=\"1.8\" stroke-linecap=\"round\" aria-hidden=\"true\">\n                    <path d=\"M3 12c0-2.5 4-7 9-7s9 4.5 9 7-4 7-9 7-9-4.5-9-7z\" />\n                    <circle cx=\"12\" cy=\"12\" r=\"2.6\" />\n                  </svg>\n                }\n              </button>\n            </div>\n\n            @if (adminForm.controls.password.value) {\n              <div class=\"strength\">\n                <div class=\"strength__bar\">\n                  <span class=\"strength__fill\"\n                        [style.width.%]=\"passwordStrength().score * 25\"\n                        [class]=\"'strength__fill--' + passwordStrength().score\"></span>\n                </div>\n                <span class=\"strength__label\">{{ passwordStrength().label }}</span>\n              </div>\n              <ul class=\"checks\">\n                <li [class.checks--ok]=\"passwordStrength().checks.length\">Au moins 10 caract\u00E8res</li>\n                <li [class.checks--ok]=\"passwordStrength().checks.upper\">Une majuscule</li>\n                <li [class.checks--ok]=\"passwordStrength().checks.lower\">Une minuscule</li>\n                <li [class.checks--ok]=\"passwordStrength().checks.digit\">Un chiffre</li>\n              </ul>\n            }\n          </div>\n\n          <label class=\"terms\">\n            <input type=\"checkbox\" formControlName=\"acceptedTerms\" />\n            <span>J'accepte les conditions d'utilisation et la politique de confidentialite.</span>\n          </label>\n          @if (adminForm.controls.acceptedTerms.touched && adminForm.controls.acceptedTerms.invalid) {\n            <span class=\"field__error\">Vous devez accepter les conditions.</span>\n          }\n\n          <div class=\"form__actions\">\n            <button type=\"button\" class=\"btn btn--secondary\" (click)=\"back()\">Retour</button>\n            <button type=\"submit\" class=\"btn btn--primary btn--lg\"\n                    [disabled]=\"submitting() || !passwordStrength().valid\">\n              {{ submitting() ? 'Creation en cours...' : 'Creer mon etablissement' }}\n            </button>\n          </div>\n        </form>\n      }\n    </div>\n  </main>\n</div>\n", styles: ["@import 'styles/tokens';\n\n.signup { min-height: 100vh; display: grid; grid-template-columns: 420px 1fr; }\n\n/* \u2500\u2500 Colonne de gauche \u2500\u2500 */\n.signup__aside {\n  display: flex; flex-direction: column; gap: var(--space-8);\n  padding: var(--space-10) var(--space-8);\n  background: linear-gradient(150deg, var(--brand) 0%, #143f95 100%);\n  color: #fff;\n}\n.signup__brand { display: flex; align-items: center; gap: var(--space-2); text-decoration: none; }\n.signup__logo {\n  width: 36px; height: 36px; display: grid; place-items: center;\n  background: rgba(255,255,255,.18); border-radius: 10px;\n  font-family: var(--font-display); font-weight: 800; font-size: 18px; color: #fff;\n}\n.signup__brandname {\n  font-family: var(--font-display); font-size: var(--text-lg);\n  font-weight: 700; letter-spacing: -0.02em; color: #fff;\n}\n.signup__quote { margin: auto 0 0; }\n.signup__quote p {\n  font-family: var(--font-display); font-size: var(--text-xl);\n  font-weight: 700; letter-spacing: -0.02em; line-height: 1.35; margin: 0;\n}\n.signup__points { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-3); }\n.signup__points li {\n  position: relative; padding-left: var(--space-6);\n  font-size: var(--text-base); opacity: .92; line-height: 1.5;\n}\n.signup__points li::before {\n  content: '\u2713'; position: absolute; left: 0; top: 0;\n  width: 18px; height: 18px; display: grid; place-items: center;\n  border-radius: 50%; background: rgba(255,255,255,.2); font-size: 11px; font-weight: 700;\n}\n\n/* \u2500\u2500 Colonne de droite \u2500\u2500 */\n.signup__main { display: grid; place-items: center; padding: var(--space-8) var(--space-6); background: var(--surface-page); }\n.signup__panel { width: 100%; max-width: 520px; }\n.signup__back {\n  display: inline-block; margin-bottom: var(--space-5);\n  font-size: var(--text-sm); font-weight: 600; color: var(--text-muted);\n}\n.signup__back:hover { color: var(--brand); text-decoration: none; }\n\n.demo-context {\n  display: flex; align-items: flex-start; gap: var(--space-3);\n  margin-bottom: var(--space-5); padding: var(--space-4);\n  border: 1px solid var(--brand-tint-border); border-radius: var(--radius-card);\n  background: linear-gradient(135deg, var(--brand-tint), #f7fbff);\n}\n.demo-context__icon {\n  flex: 0 0 28px; height: 28px; display: grid; place-items: center;\n  border-radius: 9px; background: var(--brand); color: #fff; font-weight: 800;\n}\n.demo-context strong { display: block; color: var(--text-strong); font-size: var(--text-sm); }\n.demo-context p { margin: 3px 0 0; color: var(--text-muted); font-size: var(--text-xs); line-height: 1.5; }\n\n/* \u2500\u2500 Etapes \u2500\u2500 */\n.steps { display: flex; gap: var(--space-2); list-style: none; margin: 0 0 var(--space-6); padding: 0; }\n.steps__item {\n  display: flex; align-items: center; gap: var(--space-2);\n  padding: var(--space-2) var(--space-4); border-radius: var(--radius-pill);\n  background: var(--surface-card); border: 1px solid var(--border);\n  font-size: var(--text-sm); font-weight: 600; color: var(--text-muted);\n}\n.steps__item--active { background: var(--brand-tint); border-color: var(--brand-tint-border); color: var(--brand); }\n.steps__index {\n  width: 20px; height: 20px; display: grid; place-items: center;\n  border-radius: 50%; background: currentColor; color: #fff; font-size: 11px;\n}\n.steps__item--active .steps__index { background: var(--brand); }\n\n/* \u2500\u2500 Formulaire \u2500\u2500 */\n.form {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); padding: var(--space-8);\n  box-shadow: var(--shadow-sm);\n}\n.form__title { font-size: var(--text-2xl); margin: 0 0 var(--space-2); }\n.form__lead { color: var(--text-muted); margin-bottom: var(--space-6); }\n.form__row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }\n.form__actions { display: flex; gap: var(--space-3); justify-content: space-between; margin-top: var(--space-5); }\n.form__actions .btn--lg { flex: 1; }\n.form__switch { margin: var(--space-5) 0 0; text-align: center; font-size: var(--text-sm); color: var(--text-muted); }\n\n.field__hint--ok { color: var(--success); font-weight: 600; }\n\n/* \u2500\u2500 Robustesse du mot de passe \u2500\u2500 */\n.strength { display: flex; align-items: center; gap: var(--space-3); margin-top: var(--space-2); }\n.strength__bar { flex: 1; height: 5px; background: var(--surface-sunken); border-radius: var(--radius-pill); overflow: hidden; }\n.strength__fill { display: block; height: 100%; border-radius: var(--radius-pill); transition: width var(--transition-base); }\n.strength__fill--1 { background: var(--danger); }\n.strength__fill--2 { background: var(--warning); }\n.strength__fill--3 { background: var(--chart-5); }\n.strength__fill--4 { background: var(--success); }\n.strength__label { font-size: var(--text-xs); font-weight: 700; color: var(--text-muted); min-width: 48px; }\n\n.checks { list-style: none; margin: var(--space-3) 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-1); }\n.checks li { position: relative; padding-left: var(--space-5); font-size: var(--text-xs); color: var(--text-light); }\n.checks li::before { content: '\u25CB'; position: absolute; left: 0; }\n.checks--ok { color: var(--success); }\n.checks--ok::before { content: '\u25CF'; }\n\n/* \u2500\u2500 Conditions \u2500\u2500 */\n.terms { display: flex; gap: var(--space-3); align-items: flex-start; margin-top: var(--space-4); cursor: pointer; }\n.terms input { margin-top: 3px; flex-shrink: 0; }\n.terms span { font-size: var(--text-sm); color: var(--text-normal); line-height: 1.5; }\n\n/* \u2500\u2500 Responsive \u2500\u2500 */\n@include tablet-down {\n  .signup { grid-template-columns: 1fr; }\n  .signup__aside { display: none; }\n  .signup__main { padding: var(--space-5) var(--space-4); align-items: start; }\n  .form { padding: var(--space-5); }\n  .form__row { grid-template-columns: 1fr; gap: 0; }\n  .checks { grid-template-columns: 1fr; }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SignupComponent, { className: "SignupComponent", filePath: "frontend/src/app/features/signup/signup.component.ts", lineNumber: 27 }); })();
//# sourceMappingURL=signup.component.js.map