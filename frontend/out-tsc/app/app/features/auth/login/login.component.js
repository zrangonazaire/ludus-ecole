import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function LoginComponent_Conditional_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 29);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 54);
    i0.ɵɵelement(2, "circle", 55)(3, "path", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx);
} }
function LoginComponent_Conditional_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 37);
    i0.ɵɵtext(1, "L'identifiant est obligatoire.");
    i0.ɵɵelementEnd();
} }
function LoginComponent_Conditional_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 47);
    i0.ɵɵelement(1, "path", 57)(2, "path", 58)(3, "path", 59)(4, "path", 60);
    i0.ɵɵelementEnd();
} }
function LoginComponent_Conditional_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 47);
    i0.ɵɵelement(1, "path", 61)(2, "circle", 62);
    i0.ɵɵelementEnd();
} }
function LoginComponent_Conditional_96_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 37);
    i0.ɵɵtext(1, "Le mot de passe est obligatoire.");
    i0.ɵɵelementEnd();
} }
function LoginComponent_Conditional_98_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 63);
    i0.ɵɵtext(1, " Connexion\u2026 ");
} }
function LoginComponent_Conditional_99_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Se connecter ");
    i0.ɵɵelementStart(1, "span", 49);
    i0.ɵɵtext(2, "\u2192");
    i0.ɵɵelementEnd();
} }
function LoginComponent_Conditional_104_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 52)(1, "div", 64)(2, "span");
    i0.ɵɵtext(3, "Mode d\u00E9monstration");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "p", 65);
    i0.ɵɵtext(5, "Un clic remplit le formulaire et vous connecte.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 66)(7, "button", 67);
    i0.ɵɵlistener("click", function LoginComponent_Conditional_104_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.useDemoProfile("admin@soocloo.com")); });
    i0.ɵɵelementStart(8, "span", 68);
    i0.ɵɵtext(9, "\u25C8");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 69)(11, "strong");
    i0.ɵɵtext(12, "Administration");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "i");
    i0.ɵɵtext(14, "Direction & secr\u00E9tariat");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "button", 67);
    i0.ɵɵlistener("click", function LoginComponent_Conditional_104_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.useDemoProfile("prof@soocloo.com")); });
    i0.ɵɵelementStart(16, "span", 70);
    i0.ɵɵtext(17, "\u270E");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 69)(19, "strong");
    i0.ɵɵtext(20, "Enseignant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "i");
    i0.ɵɵtext(22, "Notes & appels");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "button", 67);
    i0.ɵɵlistener("click", function LoginComponent_Conditional_104_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.useDemoProfile("parent@soocloo.com")); });
    i0.ɵɵelementStart(24, "span", 71);
    i0.ɵɵtext(25, "\u2661");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 69)(27, "strong");
    i0.ɵɵtext(28, "Parent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "i");
    i0.ɵɵtext(30, "Suivi de scolarit\u00E9");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "button", 67);
    i0.ɵɵlistener("click", function LoginComponent_Conditional_104_Template_button_click_31_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.useDemoProfile("eleve@soocloo.com")); });
    i0.ɵɵelementStart(32, "span", 72);
    i0.ɵɵtext(33, "\u2726");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span", 69)(35, "strong");
    i0.ɵɵtext(36, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "i");
    i0.ɵɵtext(38, "Notes & devoirs");
    i0.ɵɵelementEnd()()()()();
} }
export class LoginComponent {
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    router = inject(Router);
    route = inject(ActivatedRoute);
    submitting = signal(false);
    errorMessage = signal(null);
    /**
     * Le mot de passe est-il lisible à l'écran ?
     *
     * <p>Masqué par défaut, et il le redevient dès la soumission : laisser un
     * mot de passe en clair sur un poste partagé — le bureau d'une école en est
     * un — est le risque que ce bouton introduit, et le remettre à couvert au
     * moment où l'on cesse de le taper coûte peu.</p>
     */
    passwordVisible = signal(false);
    demoMode = environment.useMockData;
    schoolName = environment.schoolName;
    form = this.fb.nonNullable.group({
        login: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(4)]]
    });
    submit() {
        if (this.form.invalid || this.submitting()) {
            this.form.markAllAsTouched();
            return;
        }
        this.submitting.set(true);
        this.errorMessage.set(null);
        this.passwordVisible.set(false);
        this.auth.login(this.form.getRawValue()).subscribe({
            next: () => {
                const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                void this.router.navigateByUrl(returnUrl ?? this.auth.homeRoute());
            },
            error: (error) => {
                this.submitting.set(false);
                this.errorMessage.set(this.explain(error));
            }
        });
    }
    togglePassword() {
        this.passwordVisible.update((visible) => !visible);
    }
    /**
     * Pourquoi la connexion a échoué.
     *
     * <p>Cet écran répondait « Identifiant ou mot de passe incorrect » à tout,
     * y compris à un compte verrouillé, à un compte désactivé et à un serveur
     * éteint. Le serveur distingue pourtant ces cas avec soin. Quelqu'un dont
     * le compte est bloqué après cinq essais retapait son mot de passe une
     * sixième fois, ce qui prolongeait le blocage — le message le poussait
     * exactement vers ce qu'il ne fallait pas faire.</p>
     */
    explain(error) {
        const failure = error?.error;
        switch (failure?.code) {
            case 'ACCOUNT_LOCKED':
                return failure.message?.trim()
                    || 'Ce compte est temporairement verrouillé après plusieurs échecs. '
                        + 'Patientez quelques minutes avant de réessayer, ou contactez '
                        + 'la direction de votre établissement.';
            case 'ACCOUNT_DISABLED':
                return 'Ce compte est désactivé. Contactez la direction de votre '
                    + 'établissement pour le réactiver.';
            case 'INVALID_CREDENTIALS':
                return 'Identifiant ou mot de passe incorrect.';
            default:
                break;
        }
        if (error?.status === 0) {
            return 'Le serveur est injoignable. Vérifiez votre connexion, '
                + 'puis réessayez.';
        }
        if (error?.status === 404) {
            return 'Le service de connexion est introuvable sur ce serveur. '
                + 'Il est peut-être arrêté ou en cours de redémarrage.';
        }
        // Un corps qui n'est pas notre enveloppe JSON vient d'un intermédiaire,
        // pas de l'API : le proxy de développement quand rien n'écoute derrière.
        // Accuser le serveur d'une panne interne enverrait lire des journaux
        // qu'aucun serveur n'a écrits.
        if (typeof error?.error === 'string'
            && /ECONNREFUSED|ECONNRESET|socket hang up|proxy/i.test(error.error)) {
            return 'Le serveur ne répond pas : rien n’écoute à l’adresse appelée. '
                + 'Vérifiez qu’il est démarré, et sur le port attendu.';
        }
        if (error?.status >= 500) {
            return 'Le serveur a rencontré une erreur pendant la connexion. '
                + 'Réessayez dans un instant ; si cela persiste, signalez-le.';
        }
        // Un 401 sans enveloppe reste, de loin, un mot de passe erroné.
        return 'Identifiant ou mot de passe incorrect.';
    }
    /** One-click demo profiles, available only while mock data is on. */
    useDemoProfile(login) {
        this.form.patchValue({ login, password: 'demo1234' });
        this.submit();
    }
    static ɵfac = function LoginComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["eduops-login"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 107, vars: 12, consts: [[1, "login"], ["aria-hidden", "true", 1, "login__showcase"], [1, "login__grid-bg"], [1, "login__glow", "login__glow--one"], [1, "login__glow", "login__glow--two"], [1, "login__showcase-inner"], [1, "login__brand"], ["src", "assets/branding/soocloo-logo.png", "alt", "Soocloo", "width", "240", "height", "89", 1, "soocloo-logo", "soocloo-logo--large"], [1, "login__pitch"], [1, "login__eyebrow"], [1, "login__pulse"], [1, "login__tagline"], [1, "login__lead"], [1, "login__perks"], [1, "login__perk-icon"], [1, "login__proof"], [1, "login__avatar"], [1, "login__main"], [1, "login__topbar"], ["routerLink", "/", 1, "login__back"], [1, "login__secure"], [1, "login__dot"], [1, "login__panel"], [1, "login__mobile-brand"], ["src", "assets/branding/soocloo-logo.png", "alt", "Soocloo", "width", "160", "height", "60", 1, "soocloo-logo"], [1, "login__school"], [1, "login__heading"], [1, "login__sub"], ["novalidate", "", 1, "login__form", 3, "ngSubmit", "formGroup"], ["role", "alert", 1, "login__error"], [1, "field", "login__field"], ["for", "login", 1, "field__label"], [1, "login__control"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "aria-hidden", "true", 1, "login__icon"], ["cx", "12", "cy", "8", "r", "3.6"], ["d", "M5 20c1.4-3.4 4-5 7-5s5.6 1.6 7 5"], ["id", "login", "type", "text", "formControlName", "login", "autocomplete", "username", "placeholder", "pr\u00E9nom.nom@votre-ecole.ci", 1, "input", "login__input"], [1, "field__error"], [1, "login__label-row"], ["for", "password", 1, "field__label"], ["href", "#", 1, "login__forgot", 3, "click"], [1, "field__control"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "aria-hidden", "true", 1, "login__icon", "login__icon--lock"], ["x", "5", "y", "10", "width", "14", "height", "10", "rx", "2.5"], ["d", "M8 10V7a4 4 0 018 0v3"], ["id", "password", "formControlName", "password", "autocomplete", "current-password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "input", "input--with-action", "login__input", 3, "type"], ["type", "button", 1, "field__reveal", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "aria-hidden", "true"], ["type", "submit", 1, "btn", "btn--primary", "btn--block", "btn--lg", "login__submit", 3, "disabled"], ["aria-hidden", "true"], [1, "login__switch"], ["routerLink", "/signup"], [1, "login__demo"], [1, "login__foot"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "aria-hidden", "true"], ["cx", "12", "cy", "12", "r", "9"], ["d", "M12 8v4M12 16h.01"], ["d", "M3 3l18 18"], ["d", "M10.6 10.6a2 2 0 002.8 2.8"], ["d", "M9.4 5.3A9.6 9.6 0 0112 5c5 0 9 4.5 9 7a11 11 0 01-2.6 3.6"], ["d", "M6.3 6.9C3.9 8.4 3 10.6 3 12c0 2.5 4 7 9 7 1.3 0 2.5-.3 3.6-.8"], ["d", "M3 12c0-2.5 4-7 9-7s9 4.5 9 7-4 7-9 7-9-4.5-9-7z"], ["cx", "12", "cy", "12", "r", "2.6"], ["aria-hidden", "true", 1, "login__spinner"], [1, "login__divider"], [1, "login__demo-hint"], [1, "login__demo-grid"], ["type", "button", 1, "login__role", 3, "click"], [1, "login__role-icon", "login__role-icon--admin"], [1, "login__role-text"], [1, "login__role-icon", "login__role-icon--teacher"], [1, "login__role-icon", "login__role-icon--parent"], [1, "login__role-icon", "login__role-icon--student"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "aside", 1);
            i0.ɵɵelement(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelementStart(5, "div", 5)(6, "span", 6);
            i0.ɵɵelement(7, "img", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 8)(9, "p", 9);
            i0.ɵɵelement(10, "span", 10);
            i0.ɵɵtext(11, " La plateforme des \u00E9coles qui avancent");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "h2", 11);
            i0.ɵɵtext(13, "Simplifiez l\u2019\u00E9cole.");
            i0.ɵɵelement(14, "br");
            i0.ɵɵelementStart(15, "em");
            i0.ɵɵtext(16, "Multipliez les r\u00E9ussites.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 12);
            i0.ɵɵtext(18, "Notes, pr\u00E9sences, frais scolaires et bulletins \u2014 tout votre \u00E9tablissement dans un seul espace.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "ul", 13)(20, "li")(21, "span", 14);
            i0.ɵɵtext(22, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div")(24, "strong");
            i0.ɵɵtext(25, "Bulletins en un clic");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "span");
            i0.ɵɵtext(27, "Moyennes, rangs et mentions calcul\u00E9s.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(28, "li")(29, "span", 14);
            i0.ɵɵtext(30, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div")(32, "strong");
            i0.ɵɵtext(33, "Frais suivis en temps r\u00E9el");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "span");
            i0.ɵɵtext(35, "Re\u00E7us, relances et impay\u00E9s pilot\u00E9s.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(36, "li")(37, "span", 14);
            i0.ɵɵtext(38, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div")(40, "strong");
            i0.ɵɵtext(41, "Chacun \u00E0 sa place");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "span");
            i0.ɵɵtext(43, "Direction, enseignants, parents, \u00E9l\u00E8ves.");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(44, "figure", 15)(45, "blockquote");
            i0.ɵɵtext(46, "\u00AB Chaque note, chaque pr\u00E9sence, chaque paiement raconte la scolarit\u00E9 d\u2019un \u00E9l\u00E8ve. \u00BB");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "figcaption")(48, "span", 16);
            i0.ɵɵtext(49, "D");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "span")(51, "strong");
            i0.ɵɵtext(52, "Direction t\u00E9moin");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "i");
            i0.ɵɵtext(54, "\u00C9cole partenaire \u00B7 Abidjan");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(55, "div", 17)(56, "div", 18)(57, "a", 19);
            i0.ɵɵtext(58, "\u2190 Retour au site");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "span", 20);
            i0.ɵɵelement(60, "span", 21);
            i0.ɵɵtext(61, " Espace s\u00E9curis\u00E9");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(62, "div", 22)(63, "div", 23);
            i0.ɵɵelement(64, "img", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "p", 25);
            i0.ɵɵtext(66);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "h1", 26);
            i0.ɵɵtext(68, "Bon retour parmi nous");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(69, "p", 27);
            i0.ɵɵtext(70, "Connectez-vous pour retrouver votre \u00E9tablissement.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "form", 28);
            i0.ɵɵlistener("ngSubmit", function LoginComponent_Template_form_ngSubmit_71_listener() { return ctx.submit(); });
            i0.ɵɵtemplate(72, LoginComponent_Conditional_72_Template, 6, 1, "p", 29);
            i0.ɵɵelementStart(73, "div", 30)(74, "label", 31);
            i0.ɵɵtext(75, "Identifiant ou email");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "div", 32);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(77, "svg", 33);
            i0.ɵɵelement(78, "circle", 34)(79, "path", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelement(80, "input", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(81, LoginComponent_Conditional_81_Template, 2, 0, "span", 37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(82, "div", 30)(83, "div", 38)(84, "label", 39);
            i0.ɵɵtext(85, "Mot de passe");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "a", 40);
            i0.ɵɵlistener("click", function LoginComponent_Template_a_click_86_listener($event) { return $event.preventDefault(); });
            i0.ɵɵtext(87, "Mot de passe oubli\u00E9 ?");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(88, "div", 41);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(89, "svg", 42);
            i0.ɵɵelement(90, "rect", 43)(91, "path", 44);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelement(92, "input", 45);
            i0.ɵɵelementStart(93, "button", 46);
            i0.ɵɵlistener("click", function LoginComponent_Template_button_click_93_listener() { return ctx.togglePassword(); });
            i0.ɵɵtemplate(94, LoginComponent_Conditional_94_Template, 5, 0, ":svg:svg", 47)(95, LoginComponent_Conditional_95_Template, 3, 0, ":svg:svg", 47);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(96, LoginComponent_Conditional_96_Template, 2, 0, "span", 37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "button", 48);
            i0.ɵɵtemplate(98, LoginComponent_Conditional_98_Template, 2, 0)(99, LoginComponent_Conditional_99_Template, 3, 0, "span", 49);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(100, "p", 50);
            i0.ɵɵtext(101, " Pas encore d'\u00E9tablissement sur Soocloo ? ");
            i0.ɵɵelementStart(102, "a", 51);
            i0.ɵɵtext(103, "Cr\u00E9er mon espace");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(104, LoginComponent_Conditional_104_Template, 39, 0, "div", 52);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(105, "p", 53);
            i0.ɵɵtext(106, "\u00A9 Soocloo \u00B7 www.soocloo.com \u2014 Vos donn\u00E9es restent celles de votre \u00E9cole.");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            let tmp_2_0;
            i0.ɵɵadvance(66);
            i0.ɵɵtextInterpolate(ctx.schoolName);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_2_0 = ctx.errorMessage()) ? 72 : -1, tmp_2_0);
            i0.ɵɵadvance(9);
            i0.ɵɵconditional(ctx.form.controls.login.touched && ctx.form.controls.login.invalid ? 81 : -1);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("type", ctx.passwordVisible() ? "text" : "password");
            i0.ɵɵadvance();
            i0.ɵɵattribute("aria-label", ctx.passwordVisible() ? "Masquer le mot de passe" : "Afficher le mot de passe")("aria-pressed", ctx.passwordVisible());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.passwordVisible() ? 94 : 95);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.form.controls.password.touched && ctx.form.controls.password.invalid ? 96 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.submitting());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.submitting() ? 98 : 99);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.demoMode ? 104 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: ["@import 'styles/tokens';\n\n.login[_ngcontent-%COMP%] {\n  --navy: #0f1f3d;\n  min-height: 100dvh;\n  display: grid;\n  grid-template-columns: minmax(480px, 1.05fr) minmax(420px, 1fr);\n  background: #fff;\n  animation: _ngcontent-%COMP%_login-in 420ms ease both;\n}\n\n@keyframes _ngcontent-%COMP%_login-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n\n\n\n.login__showcase[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: linear-gradient(150deg, #10306f 0%, #1f5fd6 46%, #0b8a7d 130%);\n  color: #fff;\n  display: flex;\n}\n\n.login__grid-bg[_ngcontent-%COMP%] {\n  position: absolute; inset: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, .07) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(255, 255, 255, .07) 1px, transparent 1px);\n  background-size: 44px 44px;\n  mask-image: radial-gradient(ellipse 90% 80% at 50% 20%, #000 30%, transparent 75%);\n}\n\n.login__glow[_ngcontent-%COMP%] {\n  position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none;\n}\n\n.login__glow--one[_ngcontent-%COMP%] {\n  width: 420px; height: 420px; top: -140px; right: -120px;\n  background: rgba(233, 170, 56, .35);\n}\n\n.login__glow--two[_ngcontent-%COMP%] {\n  width: 480px; height: 480px; bottom: -200px; left: -160px;\n  background: rgba(11, 138, 125, .5);\n}\n\n.login__showcase-inner[_ngcontent-%COMP%] {\n  position: relative; z-index: 1;\n  width: min(520px, 100%);\n  margin: 0 auto;\n  padding: var(--space-8) var(--space-8) var(--space-10);\n  display: flex; flex-direction: column; gap: var(--space-8);\n}\n\n.login__brand[_ngcontent-%COMP%], .login__mobile-brand[_ngcontent-%COMP%] {\n  display: inline-flex; align-items: center; gap: 10px;\n  font: 800 19px/1 var(--font-display); color: #fff; text-decoration: none;\n}\n\n.login__mark[_ngcontent-%COMP%] {\n  width: 38px; height: 38px;\n  display: flex; align-items: end; justify-content: center; gap: 3px;\n  padding: 9px; border-radius: 12px 12px 12px 4px;\n  background: rgba(255, 255, 255, .16);\n  border: 1px solid rgba(255, 255, 255, .35);\n  box-shadow: 0 8px 20px rgba(4, 20, 50, .3);\n}\n\n.login__mark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { width: 4px; border-radius: 3px; background: #fff; }\n.login__mark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) { height: 10px; opacity: .7; }\n.login__mark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) { height: 18px; }\n.login__mark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) { height: 13px; opacity: .85; }\n\n.login__word[_ngcontent-%COMP%] { letter-spacing: -0.01em; }\n.login__pitch[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-4); }\n\n.login__eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex; align-items: center; gap: 8px;\n  align-self: flex-start;\n  margin: 0; padding: 7px 12px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, .12);\n  border: 1px solid rgba(255, 255, 255, .25);\n  font-size: var(--text-xs); font-weight: 600; letter-spacing: 0.02em;\n}\n\n.login__pulse[_ngcontent-%COMP%] {\n  width: 8px; height: 8px; border-radius: 50%; background: #7cf2c6;\n  box-shadow: 0 0 0 0 rgba(124, 242, 198, .7);\n  animation: _ngcontent-%COMP%_login-pulse 2.2s ease-out infinite;\n}\n\n@keyframes _ngcontent-%COMP%_login-pulse {\n  70% { box-shadow: 0 0 0 9px rgba(124, 242, 198, 0); }\n  100% { box-shadow: 0 0 0 0 rgba(124, 242, 198, 0); }\n}\n\n.login__tagline[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(30px, 3.4vw, 44px);\n  line-height: 1.08; letter-spacing: -0.025em; font-weight: 800;\n}\n\n.login__tagline[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] { font-style: normal; color: #ffe1a1; }\n\n.login__lead[_ngcontent-%COMP%] {\n  margin: 0; max-width: 44ch;\n  font-size: var(--text-md); line-height: var(--leading-relaxed);\n  color: rgba(255, 255, 255, .85);\n}\n\n.login__perks[_ngcontent-%COMP%] { list-style: none; margin: var(--space-2) 0 0; padding: 0; display: grid; gap: var(--space-3); }\n\n.login__perks[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  background: rgba(255, 255, 255, .1);\n  border: 1px solid rgba(255, 255, 255, .18);\n  border-radius: 14px;\n  backdrop-filter: blur(6px);\n}\n\n.login__perk-icon[_ngcontent-%COMP%] {\n  flex: 0 0 30px; width: 30px; height: 30px;\n  display: grid; place-items: center;\n  border-radius: 10px;\n  background: rgba(255, 255, 255, .16);\n  font-size: 14px; font-weight: 800;\n}\n\n.login__perks[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; font-size: var(--text-base); font-weight: 700; }\n.login__perks[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child { font-size: var(--text-sm); color: rgba(255, 255, 255, .75); }\n\n.login__proof[_ngcontent-%COMP%] {\n  margin: auto 0 0; padding: var(--space-5);\n  background: rgba(6, 20, 46, .42);\n  border: 1px solid rgba(255, 255, 255, .16);\n  border-radius: 16px;\n}\n\n.login__proof[_ngcontent-%COMP%]   blockquote[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-4);\n  font-family: var(--font-display);\n  font-size: var(--text-lg); line-height: 1.45; letter-spacing: -0.01em;\n}\n\n.login__proof[_ngcontent-%COMP%]   figcaption[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); }\n\n.login__avatar[_ngcontent-%COMP%] {\n  width: 38px; height: 38px; border-radius: 50%;\n  display: grid; place-items: center;\n  background: linear-gradient(145deg, #e9aa38, #c77f1a);\n  font-weight: 800; font-size: var(--text-md);\n}\n\n.login__proof[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; font-size: var(--text-sm); }\n.login__proof[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { font-style: normal; font-size: var(--text-xs); color: rgba(255, 255, 255, .7); }\n.login__main[_ngcontent-%COMP%] {\n  display: flex; flex-direction: column;\n  min-height: 100dvh;\n  background:\n    radial-gradient(600px 300px at 85% -80px, rgba(31, 95, 214, .07), transparent 70%),\n    #fff;\n}\n\n.login__topbar[_ngcontent-%COMP%] {\n  display: flex; align-items: center; justify-content: space-between;\n  padding: var(--space-5) var(--space-8);\n}\n\n.login__back[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; color: var(--text-muted); }\n.login__back[_ngcontent-%COMP%]:hover { color: var(--brand); }\n\n.login__secure[_ngcontent-%COMP%] {\n  display: inline-flex; align-items: center; gap: 7px;\n  font-size: var(--text-xs); font-weight: 600; color: var(--text-muted);\n  padding: 6px 12px; border-radius: 999px;\n  background: var(--surface-sunken); border: 1px solid var(--border);\n}\n\n.login__dot[_ngcontent-%COMP%] { width: 7px; height: 7px; border-radius: 50%; background: var(--success); }\n\n.login__panel[_ngcontent-%COMP%] {\n  width: min(460px, 100%);\n  margin: auto;\n  padding: var(--space-6) var(--space-8);\n  display: flex; flex-direction: column;\n  animation: _ngcontent-%COMP%_login-rise 480ms 80ms ease both;\n}\n\n@keyframes _ngcontent-%COMP%_login-rise {\n  from { opacity: 0; transform: translateY(14px); }\n  to { opacity: 1; transform: none; }\n}\n\n.login__mobile-brand[_ngcontent-%COMP%] { display: none; color: var(--navy); margin-bottom: var(--space-5); }\n.login__mark--sm[_ngcontent-%COMP%] {\n  background: linear-gradient(145deg, var(--brand), #124498);\n  border: 0; box-shadow: 0 7px 15px rgba(31, 95, 214, .25);\n}\n\n.login__school[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-2);\n  font-size: var(--text-xs); font-weight: 700;\n  text-transform: uppercase; letter-spacing: 0.08em;\n  color: var(--brand);\n}\n\n.login__heading[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: var(--text-3xl); font-weight: 800; letter-spacing: -0.02em;\n  color: var(--text-strong);\n}\n\n.login__sub[_ngcontent-%COMP%] { margin: var(--space-2) 0 var(--space-6); color: var(--text-muted); font-size: var(--text-md); }\n.login__form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-4); }\n\n.login__error[_ngcontent-%COMP%] {\n  display: flex; align-items: flex-start; gap: var(--space-2);\n  margin: 0; padding: var(--space-3) var(--space-4);\n  background: var(--danger-bg); color: var(--danger);\n  border: 1px solid var(--danger);\n  border-radius: var(--radius-button);\n  font-size: var(--text-sm); font-weight: 600; line-height: 1.45;\n}\n\n.login__error[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] { flex: 0 0 18px; width: 18px; height: 18px; margin-top: 1px; }\n\n.login__field[_ngcontent-%COMP%] { margin: 0; }\n.login__label-row[_ngcontent-%COMP%] { display: flex; align-items: baseline; justify-content: space-between; gap: var(--space-2); }\n.login__forgot[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; color: var(--brand); white-space: nowrap; }\n.login__forgot[_ngcontent-%COMP%]:hover { color: var(--brand-hover); }\n\n.login__control[_ngcontent-%COMP%] { position: relative; }\n.login__icon[_ngcontent-%COMP%] {\n  position: absolute; left: 13px; top: 50%; transform: translateY(-50%);\n  width: 18px; height: 18px; color: var(--text-light);\n  pointer-events: none; z-index: 1;\n}\n.login__input[_ngcontent-%COMP%] { padding-left: 40px; height: 48px; font-size: var(--text-md); }\n.login__input[_ngcontent-%COMP%]::placeholder { color: var(--text-light); }\n.login__input[_ngcontent-%COMP%]:focus { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(31, 95, 214, .15); }\n.field__control[_ngcontent-%COMP%]   .login__input[_ngcontent-%COMP%] { padding-left: 40px; }\n.field__control[_ngcontent-%COMP%]   .field__reveal[_ngcontent-%COMP%] { right: 6px; }\n\n.login__submit[_ngcontent-%COMP%] {\n  margin-top: var(--space-2); height: 50px; font-size: var(--text-md);\n  box-shadow: 0 12px 26px rgba(31, 95, 214, .28);\n}\n.login__submit[_ngcontent-%COMP%]:hover:not(:disabled) { transform: translateY(-1px); }\n.login__spinner[_ngcontent-%COMP%] {\n  width: 17px; height: 17px; border-radius: 50%;\n  border: 2.5px solid rgba(255, 255, 255, .4); border-top-color: #fff;\n  animation: _ngcontent-%COMP%_login-spin 700ms linear infinite;\n}\n@keyframes _ngcontent-%COMP%_login-spin { to { transform: rotate(360deg); } }\n\n\n\n.login__switch[_ngcontent-%COMP%] {\n  margin: var(--space-5) 0 0; padding-top: var(--space-4);\n  text-align: center; font-size: var(--text-sm); color: var(--text-muted);\n  border-top: 1px solid var(--border-light);\n}\n.login__switch[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { font-weight: 700; color: var(--brand); }\n.login__demo[_ngcontent-%COMP%] { margin-top: var(--space-5); }\n.login__divider[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: var(--space-3);\n  font-size: var(--text-xs); font-weight: 700;\n  text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-light);\n  margin-bottom: var(--space-2);\n}\n.login__divider[_ngcontent-%COMP%]::before, .login__divider[_ngcontent-%COMP%]::after {\n  content: ''; flex: 1; height: 1px; background: var(--border);\n}\n.login__demo-hint[_ngcontent-%COMP%] { margin: 0 0 var(--space-3); text-align: center; font-size: var(--text-sm); color: var(--text-muted); }\n.login__demo-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); }\n.login__role[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: var(--space-2);\n  padding: var(--space-2) var(--space-3);\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong); border-radius: 12px;\n  cursor: pointer; text-align: left;\n  transition: border-color var(--transition-fast), background var(--transition-fast), transform var(--transition-base);\n}\n.login__role[_ngcontent-%COMP%]:hover { border-color: var(--brand); background: var(--brand-tint); transform: translateY(-1px); }\n.login__role-icon[_ngcontent-%COMP%] {\n  flex: 0 0 34px; width: 34px; height: 34px;\n  display: grid; place-items: center;\n  border-radius: 10px; font-size: 15px; font-weight: 800;\n}\n.login__role-icon--admin[_ngcontent-%COMP%] { background: #eaf1fe; color: var(--brand); }\n.login__role-icon--teacher[_ngcontent-%COMP%] { background: #e7f4ed; color: var(--success); }\n.login__role-icon--parent[_ngcontent-%COMP%] { background: #fdf0e1; color: var(--warning); }\n.login__role-icon--student[_ngcontent-%COMP%] { background: #f0eafa; color: #7c5cd6; }\n.login__role-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; font-size: var(--text-sm); color: var(--text-strong); }\n.login__role-text[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { font-style: normal; font-size: var(--text-xs); color: var(--text-muted); }\n.login__foot[_ngcontent-%COMP%] {\n  margin: 0; padding: var(--space-4) var(--space-8);\n  text-align: center; font-size: var(--text-xs); color: var(--text-light);\n}\n\n@include tablet-down {\n  .login { grid-template-columns: 1fr; }\n  .login__showcase { display: none; }\n  .login__main { min-height: 100dvh; }\n  .login__mobile-brand { display: inline-flex; }\n}\n\n@include mobile {\n  .login__topbar { padding: var(--space-4) var(--space-5); }\n  .login__panel { padding: var(--space-4) var(--space-5) var(--space-8); }\n  .login__heading { font-size: var(--text-2xl); }\n  .login__demo-grid { grid-template-columns: 1fr; }\n  .login__foot { padding: var(--space-4) var(--space-5); }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{ selector: 'eduops-login', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"login\">\n  <aside class=\"login__showcase\" aria-hidden=\"true\">\n    <div class=\"login__grid-bg\"></div>\n    <div class=\"login__glow login__glow--one\"></div>\n    <div class=\"login__glow login__glow--two\"></div>\n    <div class=\"login__showcase-inner\">\n      <span class=\"login__brand\">\n        <img class=\"soocloo-logo soocloo-logo--large\" src=\"assets/branding/soocloo-logo.png\" alt=\"Soocloo\" width=\"240\" height=\"89\">\n      </span>\n      <div class=\"login__pitch\">\n        <p class=\"login__eyebrow\"><span class=\"login__pulse\"></span> La plateforme des \u00E9coles qui avancent</p>\n        <h2 class=\"login__tagline\">Simplifiez l\u2019\u00E9cole.<br><em>Multipliez les r\u00E9ussites.</em></h2>\n        <p class=\"login__lead\">Notes, pr\u00E9sences, frais scolaires et bulletins \u2014 tout votre \u00E9tablissement dans un seul espace.</p>\n        <ul class=\"login__perks\">\n          <li><span class=\"login__perk-icon\">\u2713</span><div><strong>Bulletins en un clic</strong><span>Moyennes, rangs et mentions calcul\u00E9s.</span></div></li>\n          <li><span class=\"login__perk-icon\">\u2713</span><div><strong>Frais suivis en temps r\u00E9el</strong><span>Re\u00E7us, relances et impay\u00E9s pilot\u00E9s.</span></div></li>\n          <li><span class=\"login__perk-icon\">\u2713</span><div><strong>Chacun \u00E0 sa place</strong><span>Direction, enseignants, parents, \u00E9l\u00E8ves.</span></div></li>\n        </ul>\n      </div>\n      <figure class=\"login__proof\">\n        <blockquote>\u00AB Chaque note, chaque pr\u00E9sence, chaque paiement raconte la scolarit\u00E9 d\u2019un \u00E9l\u00E8ve. \u00BB</blockquote>\n        <figcaption><span class=\"login__avatar\">D</span><span><strong>Direction t\u00E9moin</strong><i>\u00C9cole partenaire \u00B7 Abidjan</i></span></figcaption>\n      </figure>\n    </div>\n  </aside>\n\n  <div class=\"login__main\">\n    <div class=\"login__topbar\">\n      <a class=\"login__back\" routerLink=\"/\">\u2190 Retour au site</a>\n      <span class=\"login__secure\"><span class=\"login__dot\"></span> Espace s\u00E9curis\u00E9</span>\n    </div>\n    <div class=\"login__panel\">\n      <div class=\"login__mobile-brand\">\n        <img class=\"soocloo-logo\" src=\"assets/branding/soocloo-logo.png\" alt=\"Soocloo\" width=\"160\" height=\"60\">\n      </div>\n      <p class=\"login__school\">{{ schoolName }}</p>\n      <h1 class=\"login__heading\">Bon retour parmi nous</h1>\n      <p class=\"login__sub\">Connectez-vous pour retrouver votre \u00E9tablissement.</p>\n\n    <form class=\"login__form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\" novalidate>\n      @if (errorMessage(); as message) {\n        <p class=\"login__error\" role=\"alert\">\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 8v4M12 16h.01\"/></svg>\n          <span>{{ message }}</span>\n        </p>\n      }\n\n      <div class=\"field login__field\">\n        <label class=\"field__label\" for=\"login\">Identifiant ou email</label>\n        <div class=\"login__control\">\n          <svg class=\"login__icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"8\" r=\"3.6\"/><path d=\"M5 20c1.4-3.4 4-5 7-5s5.6 1.6 7 5\"/></svg>\n          <input id=\"login\" class=\"input login__input\" type=\"text\" formControlName=\"login\"\n                 autocomplete=\"username\" placeholder=\"pr\u00E9nom.nom@votre-ecole.ci\" />\n        </div>\n        @if (form.controls.login.touched && form.controls.login.invalid) {\n          <span class=\"field__error\">L'identifiant est obligatoire.</span>\n        }\n      </div>\n\n      <div class=\"field login__field\">\n        <div class=\"login__label-row\">\n          <label class=\"field__label\" for=\"password\">Mot de passe</label>\n          <a class=\"login__forgot\" href=\"#\" (click)=\"$event.preventDefault()\">Mot de passe oubli\u00E9 ?</a>\n        </div>\n        <div class=\"field__control\">\n          <svg class=\"login__icon login__icon--lock\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" aria-hidden=\"true\"><rect x=\"5\" y=\"10\" width=\"14\" height=\"10\" rx=\"2.5\"/><path d=\"M8 10V7a4 4 0 018 0v3\"/></svg>\n          <input id=\"password\" class=\"input input--with-action login__input\"\n                 [type]=\"passwordVisible() ? 'text' : 'password'\"\n                 formControlName=\"password\"\n                 autocomplete=\"current-password\" placeholder=\"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\" />\n          <!--\n            type=\"button\" est obligatoire : dans un <form>, un bouton sans type\n            vaut submit, et regarder son mot de passe enverrait le formulaire.\n          -->\n          <button type=\"button\" class=\"field__reveal\"\n                  [attr.aria-label]=\"passwordVisible()\n                    ? 'Masquer le mot de passe' : 'Afficher le mot de passe'\"\n                  [attr.aria-pressed]=\"passwordVisible()\"\n                  (click)=\"togglePassword()\">\n            @if (passwordVisible()) {\n              <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\"\n                   stroke-width=\"1.8\" stroke-linecap=\"round\" aria-hidden=\"true\">\n                <path d=\"M3 3l18 18\" />\n                <path d=\"M10.6 10.6a2 2 0 002.8 2.8\" />\n                <path d=\"M9.4 5.3A9.6 9.6 0 0112 5c5 0 9 4.5 9 7a11 11 0 01-2.6 3.6\" />\n                <path d=\"M6.3 6.9C3.9 8.4 3 10.6 3 12c0 2.5 4 7 9 7 1.3 0 2.5-.3 3.6-.8\" />\n              </svg>\n            } @else {\n              <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\"\n                   stroke-width=\"1.8\" stroke-linecap=\"round\" aria-hidden=\"true\">\n                <path d=\"M3 12c0-2.5 4-7 9-7s9 4.5 9 7-4 7-9 7-9-4.5-9-7z\" />\n                <circle cx=\"12\" cy=\"12\" r=\"2.6\" />\n              </svg>\n            }\n          </button>\n        </div>\n        @if (form.controls.password.touched && form.controls.password.invalid) {\n          <span class=\"field__error\">Le mot de passe est obligatoire.</span>\n        }\n      </div>\n\n      <button type=\"submit\" class=\"btn btn--primary btn--block btn--lg login__submit\" [disabled]=\"submitting()\">\n        @if (submitting()) {\n          <span class=\"login__spinner\" aria-hidden=\"true\"></span> Connexion\u2026\n        } @else {\n          Se connecter <span aria-hidden=\"true\">\u2192</span>\n        }\n      </button>\n    </form>\n\n    <!--\n      Sans ce lien, quelqu'un qui arrive directement sur la connexion n'a aucun\n      moyen de cr\u00E9er un compte : l'\u00E9cran existait, mais rien n'y menait.\n    -->\n    <p class=\"login__switch\">\n      Pas encore d'\u00E9tablissement sur Soocloo ?\n      <a routerLink=\"/signup\">Cr\u00E9er mon espace</a>\n    </p>\n\n    @if (demoMode) {\n      <div class=\"login__demo\">\n        <div class=\"login__divider\"><span>Mode d\u00E9monstration</span></div>\n        <p class=\"login__demo-hint\">Un clic remplit le formulaire et vous connecte.</p>\n        <div class=\"login__demo-grid\">\n          <button type=\"button\" class=\"login__role\"\n                  (click)=\"useDemoProfile('admin@soocloo.com')\">\n            <span class=\"login__role-icon login__role-icon--admin\">\u25C8</span>\n            <span class=\"login__role-text\"><strong>Administration</strong><i>Direction & secr\u00E9tariat</i></span>\n          </button>\n          <button type=\"button\" class=\"login__role\"\n                  (click)=\"useDemoProfile('prof@soocloo.com')\">\n            <span class=\"login__role-icon login__role-icon--teacher\">\u270E</span>\n            <span class=\"login__role-text\"><strong>Enseignant</strong><i>Notes & appels</i></span>\n          </button>\n          <button type=\"button\" class=\"login__role\"\n                  (click)=\"useDemoProfile('parent@soocloo.com')\">\n            <span class=\"login__role-icon login__role-icon--parent\">\u2661</span>\n            <span class=\"login__role-text\"><strong>Parent</strong><i>Suivi de scolarit\u00E9</i></span>\n          </button>\n          <button type=\"button\" class=\"login__role\"\n                  (click)=\"useDemoProfile('eleve@soocloo.com')\">\n            <span class=\"login__role-icon login__role-icon--student\">\u2726</span>\n            <span class=\"login__role-text\"><strong>\u00C9l\u00E8ve</strong><i>Notes & devoirs</i></span>\n          </button>\n        </div>\n      </div>\n    }\n    </div>\n\n    <p class=\"login__foot\">\u00A9 Soocloo \u00B7 www.soocloo.com \u2014 Vos donn\u00E9es restent celles de votre \u00E9cole.</p>\n  </div>\n</div>\n", styles: ["@import 'styles/tokens';\n\n.login {\n  --navy: #0f1f3d;\n  min-height: 100dvh;\n  display: grid;\n  grid-template-columns: minmax(480px, 1.05fr) minmax(420px, 1fr);\n  background: #fff;\n  animation: login-in 420ms ease both;\n}\n\n@keyframes login-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n/* ================= Showcase (gauche) ================= */\n\n.login__showcase {\n  position: relative;\n  overflow: hidden;\n  background: linear-gradient(150deg, #10306f 0%, #1f5fd6 46%, #0b8a7d 130%);\n  color: #fff;\n  display: flex;\n}\n\n.login__grid-bg {\n  position: absolute; inset: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, .07) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(255, 255, 255, .07) 1px, transparent 1px);\n  background-size: 44px 44px;\n  mask-image: radial-gradient(ellipse 90% 80% at 50% 20%, #000 30%, transparent 75%);\n}\n\n.login__glow {\n  position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none;\n}\n\n.login__glow--one {\n  width: 420px; height: 420px; top: -140px; right: -120px;\n  background: rgba(233, 170, 56, .35);\n}\n\n.login__glow--two {\n  width: 480px; height: 480px; bottom: -200px; left: -160px;\n  background: rgba(11, 138, 125, .5);\n}\n\n.login__showcase-inner {\n  position: relative; z-index: 1;\n  width: min(520px, 100%);\n  margin: 0 auto;\n  padding: var(--space-8) var(--space-8) var(--space-10);\n  display: flex; flex-direction: column; gap: var(--space-8);\n}\n\n.login__brand, .login__mobile-brand {\n  display: inline-flex; align-items: center; gap: 10px;\n  font: 800 19px/1 var(--font-display); color: #fff; text-decoration: none;\n}\n\n.login__mark {\n  width: 38px; height: 38px;\n  display: flex; align-items: end; justify-content: center; gap: 3px;\n  padding: 9px; border-radius: 12px 12px 12px 4px;\n  background: rgba(255, 255, 255, .16);\n  border: 1px solid rgba(255, 255, 255, .35);\n  box-shadow: 0 8px 20px rgba(4, 20, 50, .3);\n}\n\n.login__mark span { width: 4px; border-radius: 3px; background: #fff; }\n.login__mark span:nth-child(1) { height: 10px; opacity: .7; }\n.login__mark span:nth-child(2) { height: 18px; }\n.login__mark span:nth-child(3) { height: 13px; opacity: .85; }\n\n.login__word { letter-spacing: -0.01em; }\n.login__pitch { display: flex; flex-direction: column; gap: var(--space-4); }\n\n.login__eyebrow {\n  display: inline-flex; align-items: center; gap: 8px;\n  align-self: flex-start;\n  margin: 0; padding: 7px 12px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, .12);\n  border: 1px solid rgba(255, 255, 255, .25);\n  font-size: var(--text-xs); font-weight: 600; letter-spacing: 0.02em;\n}\n\n.login__pulse {\n  width: 8px; height: 8px; border-radius: 50%; background: #7cf2c6;\n  box-shadow: 0 0 0 0 rgba(124, 242, 198, .7);\n  animation: login-pulse 2.2s ease-out infinite;\n}\n\n@keyframes login-pulse {\n  70% { box-shadow: 0 0 0 9px rgba(124, 242, 198, 0); }\n  100% { box-shadow: 0 0 0 0 rgba(124, 242, 198, 0); }\n}\n\n.login__tagline {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: clamp(30px, 3.4vw, 44px);\n  line-height: 1.08; letter-spacing: -0.025em; font-weight: 800;\n}\n\n.login__tagline em { font-style: normal; color: #ffe1a1; }\n\n.login__lead {\n  margin: 0; max-width: 44ch;\n  font-size: var(--text-md); line-height: var(--leading-relaxed);\n  color: rgba(255, 255, 255, .85);\n}\n\n.login__perks { list-style: none; margin: var(--space-2) 0 0; padding: 0; display: grid; gap: var(--space-3); }\n\n.login__perks li {\n  display: flex; align-items: center; gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  background: rgba(255, 255, 255, .1);\n  border: 1px solid rgba(255, 255, 255, .18);\n  border-radius: 14px;\n  backdrop-filter: blur(6px);\n}\n\n.login__perk-icon {\n  flex: 0 0 30px; width: 30px; height: 30px;\n  display: grid; place-items: center;\n  border-radius: 10px;\n  background: rgba(255, 255, 255, .16);\n  font-size: 14px; font-weight: 800;\n}\n\n.login__perks strong { display: block; font-size: var(--text-base); font-weight: 700; }\n.login__perks div span:last-child { font-size: var(--text-sm); color: rgba(255, 255, 255, .75); }\n\n.login__proof {\n  margin: auto 0 0; padding: var(--space-5);\n  background: rgba(6, 20, 46, .42);\n  border: 1px solid rgba(255, 255, 255, .16);\n  border-radius: 16px;\n}\n\n.login__proof blockquote {\n  margin: 0 0 var(--space-4);\n  font-family: var(--font-display);\n  font-size: var(--text-lg); line-height: 1.45; letter-spacing: -0.01em;\n}\n\n.login__proof figcaption { display: flex; align-items: center; gap: var(--space-3); }\n\n.login__avatar {\n  width: 38px; height: 38px; border-radius: 50%;\n  display: grid; place-items: center;\n  background: linear-gradient(145deg, #e9aa38, #c77f1a);\n  font-weight: 800; font-size: var(--text-md);\n}\n\n.login__proof strong { display: block; font-size: var(--text-sm); }\n.login__proof i { font-style: normal; font-size: var(--text-xs); color: rgba(255, 255, 255, .7); }\n.login__main {\n  display: flex; flex-direction: column;\n  min-height: 100dvh;\n  background:\n    radial-gradient(600px 300px at 85% -80px, rgba(31, 95, 214, .07), transparent 70%),\n    #fff;\n}\n\n.login__topbar {\n  display: flex; align-items: center; justify-content: space-between;\n  padding: var(--space-5) var(--space-8);\n}\n\n.login__back { font-size: var(--text-sm); font-weight: 600; color: var(--text-muted); }\n.login__back:hover { color: var(--brand); }\n\n.login__secure {\n  display: inline-flex; align-items: center; gap: 7px;\n  font-size: var(--text-xs); font-weight: 600; color: var(--text-muted);\n  padding: 6px 12px; border-radius: 999px;\n  background: var(--surface-sunken); border: 1px solid var(--border);\n}\n\n.login__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--success); }\n\n.login__panel {\n  width: min(460px, 100%);\n  margin: auto;\n  padding: var(--space-6) var(--space-8);\n  display: flex; flex-direction: column;\n  animation: login-rise 480ms 80ms ease both;\n}\n\n@keyframes login-rise {\n  from { opacity: 0; transform: translateY(14px); }\n  to { opacity: 1; transform: none; }\n}\n\n.login__mobile-brand { display: none; color: var(--navy); margin-bottom: var(--space-5); }\n.login__mark--sm {\n  background: linear-gradient(145deg, var(--brand), #124498);\n  border: 0; box-shadow: 0 7px 15px rgba(31, 95, 214, .25);\n}\n\n.login__school {\n  margin: 0 0 var(--space-2);\n  font-size: var(--text-xs); font-weight: 700;\n  text-transform: uppercase; letter-spacing: 0.08em;\n  color: var(--brand);\n}\n\n.login__heading {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: var(--text-3xl); font-weight: 800; letter-spacing: -0.02em;\n  color: var(--text-strong);\n}\n\n.login__sub { margin: var(--space-2) 0 var(--space-6); color: var(--text-muted); font-size: var(--text-md); }\n.login__form { display: flex; flex-direction: column; gap: var(--space-4); }\n\n.login__error {\n  display: flex; align-items: flex-start; gap: var(--space-2);\n  margin: 0; padding: var(--space-3) var(--space-4);\n  background: var(--danger-bg); color: var(--danger);\n  border: 1px solid var(--danger);\n  border-radius: var(--radius-button);\n  font-size: var(--text-sm); font-weight: 600; line-height: 1.45;\n}\n\n.login__error svg { flex: 0 0 18px; width: 18px; height: 18px; margin-top: 1px; }\n\n.login__field { margin: 0; }\n.login__label-row { display: flex; align-items: baseline; justify-content: space-between; gap: var(--space-2); }\n.login__forgot { font-size: var(--text-sm); font-weight: 600; color: var(--brand); white-space: nowrap; }\n.login__forgot:hover { color: var(--brand-hover); }\n\n.login__control { position: relative; }\n.login__icon {\n  position: absolute; left: 13px; top: 50%; transform: translateY(-50%);\n  width: 18px; height: 18px; color: var(--text-light);\n  pointer-events: none; z-index: 1;\n}\n.login__input { padding-left: 40px; height: 48px; font-size: var(--text-md); }\n.login__input::placeholder { color: var(--text-light); }\n.login__input:focus { border-color: var(--brand); box-shadow: 0 0 0 3px rgba(31, 95, 214, .15); }\n.field__control .login__input { padding-left: 40px; }\n.field__control .field__reveal { right: 6px; }\n\n.login__submit {\n  margin-top: var(--space-2); height: 50px; font-size: var(--text-md);\n  box-shadow: 0 12px 26px rgba(31, 95, 214, .28);\n}\n.login__submit:hover:not(:disabled) { transform: translateY(-1px); }\n.login__spinner {\n  width: 17px; height: 17px; border-radius: 50%;\n  border: 2.5px solid rgba(255, 255, 255, .4); border-top-color: #fff;\n  animation: login-spin 700ms linear infinite;\n}\n@keyframes login-spin { to { transform: rotate(360deg); } }\n\n/* La porte vers la cr\u00E9ation de compte : visible, mais apr\u00E8s l'action principale. */\n.login__switch {\n  margin: var(--space-5) 0 0; padding-top: var(--space-4);\n  text-align: center; font-size: var(--text-sm); color: var(--text-muted);\n  border-top: 1px solid var(--border-light);\n}\n.login__switch a { font-weight: 700; color: var(--brand); }\n.login__demo { margin-top: var(--space-5); }\n.login__divider {\n  display: flex; align-items: center; gap: var(--space-3);\n  font-size: var(--text-xs); font-weight: 700;\n  text-transform: uppercase; letter-spacing: 0.07em; color: var(--text-light);\n  margin-bottom: var(--space-2);\n}\n.login__divider::before, .login__divider::after {\n  content: ''; flex: 1; height: 1px; background: var(--border);\n}\n.login__demo-hint { margin: 0 0 var(--space-3); text-align: center; font-size: var(--text-sm); color: var(--text-muted); }\n.login__demo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); }\n.login__role {\n  display: flex; align-items: center; gap: var(--space-2);\n  padding: var(--space-2) var(--space-3);\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong); border-radius: 12px;\n  cursor: pointer; text-align: left;\n  transition: border-color var(--transition-fast), background var(--transition-fast), transform var(--transition-base);\n}\n.login__role:hover { border-color: var(--brand); background: var(--brand-tint); transform: translateY(-1px); }\n.login__role-icon {\n  flex: 0 0 34px; width: 34px; height: 34px;\n  display: grid; place-items: center;\n  border-radius: 10px; font-size: 15px; font-weight: 800;\n}\n.login__role-icon--admin { background: #eaf1fe; color: var(--brand); }\n.login__role-icon--teacher { background: #e7f4ed; color: var(--success); }\n.login__role-icon--parent { background: #fdf0e1; color: var(--warning); }\n.login__role-icon--student { background: #f0eafa; color: #7c5cd6; }\n.login__role-text strong { display: block; font-size: var(--text-sm); color: var(--text-strong); }\n.login__role-text i { font-style: normal; font-size: var(--text-xs); color: var(--text-muted); }\n.login__foot {\n  margin: 0; padding: var(--space-4) var(--space-8);\n  text-align: center; font-size: var(--text-xs); color: var(--text-light);\n}\n\n@include tablet-down {\n  .login { grid-template-columns: 1fr; }\n  .login__showcase { display: none; }\n  .login__main { min-height: 100dvh; }\n  .login__mobile-brand { display: inline-flex; }\n}\n\n@include mobile {\n  .login__topbar { padding: var(--space-4) var(--space-5); }\n  .login__panel { padding: var(--space-4) var(--space-5) var(--space-8); }\n  .login__heading { font-size: var(--text-2xl); }\n  .login__demo-grid { grid-template-columns: 1fr; }\n  .login__foot { padding: var(--space-4) var(--space-5); }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "frontend/src/app/features/auth/login/login.component.ts", lineNumber: 17 }); })();
//# sourceMappingURL=login.component.js.map