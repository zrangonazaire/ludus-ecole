import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { DemoSetupStore } from '@core/services/demo-setup.store';
import { environment } from '@env/environment';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.index;
const _forTrack2 = ($index, $item) => $item.label;
const _forTrack3 = ($index, $item) => $item.question;
function LandingComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 11);
    i0.ɵɵtext(1, "Mon espace");
    i0.ɵɵelementEnd();
} }
function LandingComponent_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 111);
    i0.ɵɵtext(1, "Se connecter");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "a", 112);
    i0.ɵɵlistener("click", function LandingComponent_Conditional_24_Template_a_click_2_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵtext(3, " Cr\u00E9er mon espace ");
    i0.ɵɵelementEnd();
} }
function LandingComponent_For_74_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 8);
    i0.ɵɵlistener("click", function LandingComponent_For_74_Template_button_click_0_listener() { const preview_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectPreview(preview_r4.id)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const preview_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("profile-picker__item--active", ctx_r1.activePreviewId() === preview_r4.id);
    i0.ɵɵattribute("aria-pressed", ctx_r1.activePreviewId() === preview_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", preview_r4.shortLabel, " ");
} }
function LandingComponent_For_175_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cycle_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cycle_r5);
} }
function LandingComponent_For_233_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 113);
    i0.ɵɵlistener("click", function LandingComponent_For_233_Template_button_click_0_listener() { const challenge_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.chooseChallenge(challenge_r7)); });
    i0.ɵɵelementStart(1, "span", 114);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div")(8, "span", 13);
    i0.ɵɵtext(9, "\u21B3");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const challenge_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("challenge-card--selected", ctx_r1.selectedChallenge() === challenge_r7.index);
    i0.ɵɵattribute("aria-pressed", ctx_r1.selectedChallenge() === challenge_r7.index);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(challenge_r7.index);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(challenge_r7.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(challenge_r7.text);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", challenge_r7.result, "");
} }
function LandingComponent_For_286_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article");
    i0.ɵɵelement(1, "span", 115);
    i0.ɵɵelementStart(2, "small");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "i", 116);
    i0.ɵɵelement(9, "span");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const rule_r8 = ctx.$implicit;
    i0.ɵɵclassMap("rule rule--" + rule_r8.tone);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(rule_r8.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(rule_r8.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(rule_r8.detail);
} }
function LandingComponent_For_416_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r11.answer);
} }
function LandingComponent_For_416_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 117)(1, "button", 8);
    i0.ɵɵlistener("click", function LandingComponent_For_416_Template_button_click_1_listener() { const ɵ$index_722_r10 = i0.ɵɵrestoreView(_r9).$index; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleFaq(ɵ$index_722_r10)); });
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "i", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, LandingComponent_For_416_Conditional_5_Template, 2, 1, "p");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    i0.ɵɵclassProp("faq-item--open", item_r11.open);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-expanded", item_r11.open);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r11.question);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(item_r11.open ? 5 : -1);
} }
export class LandingComponent {
    auth = inject(AuthService);
    demoSetup = inject(DemoSetupStore);
    isAuthenticated = this.auth.isAuthenticated;
    menuOpen = signal(false);
    activePreviewId = signal(this.demoSetup.draft().profile.preset);
    selectedChallenge = signal(null);
    currentYear = new Date().getFullYear();
    previews = [
        {
            id: 'primary', shortLabel: 'Primaire', label: 'Maternelle & primaire',
            context: '1 campus · 12 classes', students: '486', attendance: '94 %', collection: '82 %',
            cycles: ['Préscolaire', 'Primaire'], focus: 'Inscriptions & familles',
            alert: '8 dossiers à compléter'
        },
        {
            id: 'secondary', shortLabel: 'Secondaire', label: 'Collège & lycée',
            context: '2 cycles · 24 classes', students: '1 140', attendance: '91 %', collection: '76 %',
            cycles: ['Collège', 'Lycée'], focus: 'Notes & emplois du temps',
            alert: '3 conflits évités'
        },
        {
            id: 'group', shortLabel: 'Groupe', label: 'Groupe multi-campus',
            context: '3 campus · vue consolidée', students: '2 860', attendance: '93 %', collection: '88 %',
            cycles: ['Tous cycles', 'Multi-campus'], focus: 'Pilotage consolidé',
            alert: '2 campus à comparer'
        }
    ];
    challenges = [
        {
            index: '01', priority: 'organize', title: 'Réussir la rentrée sans fichiers dispersés',
            text: 'Dossiers, responsables, pièces et affectations suivent un même parcours contrôlé.',
            result: 'Une inscription lisible de bout en bout'
        },
        {
            index: '02', priority: 'collect', title: 'Recouvrer sans abîmer la relation parent',
            text: 'Échéanciers, reçus et relances partent du vrai solde de chaque famille.',
            result: 'Chacun sait ce qui est payé et attendu'
        },
        {
            index: '03', priority: 'organize', title: 'Publier des bulletins fiables',
            text: 'Barèmes, coefficients et règles d’arrondi sont définis par votre établissement.',
            result: 'Les calculs restent cohérents toute l’année'
        },
        {
            index: '04', priority: 'engage', title: 'Rapprocher l’école et les familles',
            text: 'Présences, informations et documents utiles deviennent accessibles sans déplacement.',
            result: 'Moins d’attente, plus de visibilité'
        }
    ];
    ruleGroups = [
        { label: 'Pédagogie', value: 'Trimestres · note /20', detail: 'Coefficients par niveau', tone: 'blue' },
        { label: 'Admissions', value: '40 places / classe', detail: 'Dérogation avec motif', tone: 'green' },
        { label: 'Finance', value: '3 échéances · XOF', detail: 'Espèces, virement, mobile money', tone: 'gold' },
        { label: 'Identité', value: 'GSH-2026-0001', detail: 'Vos formats de matricule et reçu', tone: 'purple' }
    ];
    faq = signal([
        {
            question: 'Puis-je essayer Soocloo sans importer mes vrais élèves ?',
            answer: 'Oui. Le parcours crée une école témoin avec une configuration fictive. Vous explorez les écrans et les rôles sans exposer les données de votre établissement.',
            open: true
        },
        {
            question: 'La plateforme convient-elle à mon organisation scolaire ?',
            answer: 'Le configurateur adapte les cycles, les périodes, le barème, les capacités, les frais, les moyens de paiement et les modules. Ces règles restent modifiables après la prise en main.',
            open: false
        },
        {
            question: 'Mes données sont-elles séparées de celles des autres écoles ?',
            answer: 'Oui. L’isolation est appliquée jusque dans la base de données : chaque établissement reste confiné à son propre périmètre, indépendamment des contrôles de l’interface.',
            open: false
        },
        {
            question: 'Que se passe-t-il si la connexion est instable ?',
            answer: 'Les parcours sont pensés pour rester légers. Les actions sensibles, notamment financières, attendent toujours la confirmation du serveur afin d’éviter une fausse validation.',
            open: false
        }
    ]);
    activePreview() {
        return this.previews.find((preview) => preview.id === this.activePreviewId()) ?? this.previews[0];
    }
    selectPreview(id) {
        this.activePreviewId.set(id);
    }
    chooseChallenge(challenge) {
        this.selectedChallenge.set(challenge.index);
        const current = this.demoSetup.draft().priorities;
        this.demoSetup.updatePriorities({ ...current, mainPriority: challenge.priority });
    }
    prepareDemo() {
        const profile = this.demoSetup.draft().profile;
        this.demoSetup.updateProfile({ ...profile, preset: this.activePreviewId() });
    }
    toggleFaq(index) {
        this.faq.update((items) => items.map((item, current) => current === index ? { ...item, open: !item.open } : item));
    }
    toggleMenu() {
        this.menuOpen.update((open) => !open);
    }
    closeMenu() {
        this.menuOpen.set(false);
    }
    scrollTo(id) {
        this.closeMenu();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // ─────────────────────────────────────────────────────────── tarif
    /** Tarif d'entrée, lu depuis la configuration : une seule source. */
    pricing = environment.pricing;
    /** Montant formaté à la française : 25 000, pas 25000 ni 25,000. */
    get startingPrice() {
        return new Intl.NumberFormat('fr-FR').format(this.pricing.startingFrom);
    }
    /**
     * Le franc CFA s'écrit « FCFA » pour le public ivoirien.
     *
     * <p>Le code ISO XOF est juste, mais il ne se lit pas : sur une page d'accueil
     * on affiche ce que les gens reconnaissent, et on garde le code pour les
     * documents comptables.</p>
     */
    get currencyLabel() {
        return environment.currency === 'XOF' ? 'FCFA' : environment.currency;
    }
    static ɵfac = function LandingComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LandingComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LandingComponent, selectors: [["eduops-landing"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 450, vars: 12, consts: [["href", "#main-content", 1, "skip-link"], [1, "landing"], [1, "nav"], [1, "nav__inner"], ["routerLink", "/", "aria-label", "Soocloo, accueil", 1, "brand", 3, "click"], ["src", "assets/branding/soocloo-logo.png", "alt", "Soocloo", "width", "160", "height", "60", 1, "soocloo-logo"], ["type", "button", "aria-label", "Ouvrir le menu", 1, "nav__toggle", 3, "click"], ["aria-label", "Navigation principale", 1, "nav__links"], ["type", "button", 3, "click"], ["routerLink", "/roadmap", 3, "click"], [1, "nav__actions"], ["routerLink", "/dashboard", 1, "nav__login"], ["routerLink", "/commencer", 1, "button", "button--small", 3, "click"], ["aria-hidden", "true"], ["id", "main-content"], [1, "hero"], ["aria-hidden", "true", 1, "hero__glow", "hero__glow--one"], ["aria-hidden", "true", 1, "hero__glow", "hero__glow--two"], [1, "hero__inner"], [1, "hero__copy"], [1, "eyebrow"], [1, "hero__lead"], [1, "hero__actions"], ["routerLink", "/commencer", 1, "button", "button--primary", "button--large", 3, "click"], ["type", "button", 1, "button", "button--quiet", "button--large", 3, "click"], ["aria-hidden", "true", 1, "play"], ["aria-label", "Conditions de la d\u00E9monstration", 1, "assurances"], ["aria-label", "Aper\u00E7u interactif d\u2019un espace Soocloo", 1, "hero__experience"], ["role", "group", "aria-label", "Type d\u2019\u00E9tablissement \u00E0 pr\u00E9visualiser", 1, "profile-picker"], ["type", "button", 3, "profile-picker__item--active"], [1, "console"], [1, "console__bar"], ["aria-hidden", "true", 1, "console__dots"], [1, "console__address"], [1, "console__live"], [1, "console__body"], ["aria-hidden", "true", 1, "console__side"], [1, "console__mini-logo"], [1, "side-line", "side-line--active"], [1, "side-line"], [1, "side-line", "side-line--short"], [1, "console__main"], [1, "console__heading"], [1, "status"], [1, "metrics"], ["aria-hidden", "true", 1, "metric__icon", "metric__icon--blue"], ["aria-hidden", "true", 1, "metric__icon", "metric__icon--green"], ["aria-hidden", "true", 1, "metric__icon", "metric__icon--gold"], [1, "console__lower"], [1, "pulse-card"], [1, "card-heading"], ["aria-hidden", "true", 1, "bars"], [2, "--h", "36%"], [2, "--h", "58%"], [2, "--h", "48%"], [2, "--h", "76%"], [2, "--h", "66%"], [2, "--h", "88%"], [1, "bars__today", 2, "--h", "70%"], ["aria-hidden", "true", 1, "days"], [1, "priority-card"], [1, "priority-card__chips"], [1, "floating-event", "floating-event--payment"], ["aria-hidden", "true", 1, "event-icon"], [1, "floating-event", "floating-event--family"], ["aria-hidden", "true", 1, "event-icon", "event-icon--violet"], ["aria-label", "Une plateforme pour toute la communaut\u00E9", 1, "role-strip"], [1, "role-dot", "role-dot--blue"], [1, "role-dot", "role-dot--green"], [1, "role-dot", "role-dot--purple"], [1, "role-dot", "role-dot--gold"], ["id", "solutions", 1, "section", "challenges"], [1, "section__heading"], [1, "section-kicker"], [1, "challenge-grid"], ["type", "button", 1, "challenge-card", 3, "challenge-card--selected"], ["id", "adaptation", 1, "section", "adaptation"], [1, "adaptation__copy"], ["routerLink", "/commencer", 1, "text-link", 3, "click"], ["aria-label", "Exemple de param\u00E8tres Soocloo", 1, "rule-board"], [1, "rule-board__top"], [1, "rule-board__grid"], [3, "class"], [1, "rule-board__footer"], [1, "integrity"], [1, "integrity__inner"], [1, "integrity__title"], [1, "section-kicker", "section-kicker--light"], [1, "guard-grid"], [1, "guard-icon"], ["id", "parcours", 1, "section", "journey"], [1, "section__heading", "section__heading--center"], [1, "journey__steps"], [1, "journey__icon"], [1, "journey__action"], ["id", "faq", 1, "section", "faq"], [1, "faq__intro"], [1, "faq__list"], [1, "faq-item", 3, "faq-item--open"], [1, "final-cta"], ["aria-hidden", "true", 1, "final-cta__orbit", "final-cta__orbit--one"], ["aria-hidden", "true", 1, "final-cta__orbit", "final-cta__orbit--two"], ["routerLink", "/commencer", 1, "button", "button--light", "button--large", 3, "click"], [1, "footer"], [1, "footer__inner"], ["routerLink", "/", 1, "brand", "brand--footer"], ["src", "assets/branding/soocloo-logo.png", "alt", "Soocloo", "width", "160", "height", "60", "loading", "lazy", 1, "soocloo-logo"], ["aria-label", "Liens de pied de page"], ["routerLink", "/login"], ["routerLink", "/signup"], ["routerLink", "/commencer", 3, "click"], ["routerLink", "/login", 1, "nav__login"], ["routerLink", "/signup", 1, "nav__login", 3, "click"], ["type", "button", 1, "challenge-card", 3, "click"], [1, "challenge-card__index"], ["aria-hidden", "true", 1, "rule__mark"], ["aria-hidden", "true", 1, "toggle"], [1, "faq-item"]], template: function LandingComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "a", 0);
            i0.ɵɵtext(1, "Aller au contenu");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "div", 1)(3, "header", 2)(4, "div", 3)(5, "a", 4);
            i0.ɵɵlistener("click", function LandingComponent_Template_a_click_5_listener() { return ctx.closeMenu(); });
            i0.ɵɵelement(6, "img", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "button", 6);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_7_listener() { return ctx.toggleMenu(); });
            i0.ɵɵelement(8, "span")(9, "span")(10, "span");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "nav", 7)(12, "button", 8);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_12_listener() { return ctx.scrollTo("solutions"); });
            i0.ɵɵtext(13, "Solutions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "button", 8);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_14_listener() { return ctx.scrollTo("adaptation"); });
            i0.ɵɵtext(15, "Param\u00E9trage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "button", 8);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_16_listener() { return ctx.scrollTo("parcours"); });
            i0.ɵɵtext(17, "La d\u00E9mo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "a", 9);
            i0.ɵɵlistener("click", function LandingComponent_Template_a_click_18_listener() { return ctx.closeMenu(); });
            i0.ɵɵtext(19, "Roadmap \u2014 Guide");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "button", 8);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_20_listener() { return ctx.scrollTo("faq"); });
            i0.ɵɵtext(21, "Questions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 10);
            i0.ɵɵtemplate(23, LandingComponent_Conditional_23_Template, 2, 0, "a", 11)(24, LandingComponent_Conditional_24_Template, 4, 0);
            i0.ɵɵelementStart(25, "a", 12);
            i0.ɵɵlistener("click", function LandingComponent_Template_a_click_25_listener() { ctx.closeMenu(); return ctx.prepareDemo(); });
            i0.ɵɵtext(26, " Composer ma d\u00E9mo ");
            i0.ɵɵelementStart(27, "span", 13);
            i0.ɵɵtext(28, "\u2192");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(29, "main", 14)(30, "section", 15);
            i0.ɵɵelement(31, "div", 16)(32, "div", 17);
            i0.ɵɵelementStart(33, "div", 18)(34, "div", 19)(35, "p", 20);
            i0.ɵɵelement(36, "span");
            i0.ɵɵtext(37, " Pens\u00E9 pour les \u00E9coles qui ont leur propre fa\u00E7on de faire");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "h1");
            i0.ɵɵtext(39, "Simplifiez l\u2019\u00E9cole.");
            i0.ɵɵelement(40, "br");
            i0.ɵɵelementStart(41, "em");
            i0.ɵɵtext(42, "Multipliez les r\u00E9ussites.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "p", 21);
            i0.ɵɵtext(44, " Configurez vos cycles, classes, bulletins, frais et acc\u00E8s dans un seul espace. Commencez par une \u00E9cole t\u00E9moin qui ressemble d\u00E9j\u00E0 \u00E0 la v\u00F4tre. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "div", 22)(46, "a", 23);
            i0.ɵɵlistener("click", function LandingComponent_Template_a_click_46_listener() { return ctx.prepareDemo(); });
            i0.ɵɵtext(47, " Composer ma d\u00E9mo ");
            i0.ɵɵelementStart(48, "span", 13);
            i0.ɵɵtext(49, "\u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "button", 24);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_50_listener() { return ctx.scrollTo("adaptation"); });
            i0.ɵɵelementStart(51, "span", 25);
            i0.ɵɵtext(52, "\u25B6");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(53, " Voir comment \u00E7a s\u2019adapte ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(54, "ul", 26)(55, "li")(56, "span", 13);
            i0.ɵɵtext(57, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(58, " Sans carte bancaire");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "li")(60, "span", 13);
            i0.ɵɵtext(61, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(62, " Sans installation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "li")(64, "span", 13);
            i0.ɵɵtext(65, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(66, " Donn\u00E9es fictives uniquement");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "li")(68, "span", 13);
            i0.ɵɵtext(69, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(70, " Essai gratuit avant tout paiement");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(71, "div", 27)(72, "div", 28);
            i0.ɵɵrepeaterCreate(73, LandingComponent_For_74_Template, 2, 4, "button", 29, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "div", 30)(76, "div", 31)(77, "div", 32);
            i0.ɵɵelement(78, "i")(79, "i")(80, "i");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(81, "div", 33);
            i0.ɵɵtext(82, "www.soocloo.com / direction");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "span", 34);
            i0.ɵɵelement(84, "i");
            i0.ɵɵtext(85, " D\u00E9mo");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(86, "div", 35)(87, "aside", 36)(88, "span", 37);
            i0.ɵɵtext(89, "E");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(90, "i", 38)(91, "i", 39)(92, "i", 39)(93, "i", 39)(94, "i", 40);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(95, "div", 41)(96, "div", 42)(97, "div")(98, "small");
            i0.ɵɵtext(99, "\u00C9cole t\u00E9moin");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(100, "h2");
            i0.ɵɵtext(101);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(102, "p");
            i0.ɵɵtext(103);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(104, "span", 43);
            i0.ɵɵelement(105, "i");
            i0.ɵɵtext(106, " Configuration pr\u00EAte");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(107, "div", 44)(108, "article")(109, "span", 45);
            i0.ɵɵtext(110, "\u2197");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(111, "small");
            i0.ɵɵtext(112, "\u00C9l\u00E8ves");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(113, "strong");
            i0.ɵɵtext(114);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(115, "em");
            i0.ɵɵtext(116, "Donn\u00E9es fictives");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(117, "article")(118, "span", 46);
            i0.ɵɵtext(119, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(120, "small");
            i0.ɵɵtext(121, "Pr\u00E9sence");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(122, "strong");
            i0.ɵɵtext(123);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(124, "em");
            i0.ɵɵtext(125, "Aujourd\u2019hui");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(126, "article")(127, "span", 47);
            i0.ɵɵtext(128, "\u25C7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(129, "small");
            i0.ɵɵtext(130, "Recouvrement");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(131, "strong");
            i0.ɵɵtext(132);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(133, "em");
            i0.ɵɵtext(134, "Ann\u00E9e en cours");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(135, "div", 48)(136, "article", 49)(137, "div", 50)(138, "div")(139, "small");
            i0.ɵɵtext(140, "Activit\u00E9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(141, "strong");
            i0.ɵɵtext(142, "Le rythme de l\u2019\u00E9cole");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(143, "span");
            i0.ɵɵtext(144, "7 jours");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(145, "div", 51);
            i0.ɵɵelement(146, "i", 52)(147, "i", 53)(148, "i", 54)(149, "i", 55)(150, "i", 56)(151, "i", 57)(152, "i", 58);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(153, "div", 59)(154, "span");
            i0.ɵɵtext(155, "L");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(156, "span");
            i0.ɵɵtext(157, "M");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(158, "span");
            i0.ɵɵtext(159, "M");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(160, "span");
            i0.ɵɵtext(161, "J");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(162, "span");
            i0.ɵɵtext(163, "V");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(164, "span");
            i0.ɵɵtext(165, "S");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(166, "span");
            i0.ɵɵtext(167, "Auj.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(168, "article", 60)(169, "small");
            i0.ɵɵtext(170, "Priorit\u00E9 configur\u00E9e");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(171, "strong");
            i0.ɵɵtext(172);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(173, "div", 61);
            i0.ɵɵrepeaterCreate(174, LandingComponent_For_175_Template, 2, 1, "span", null, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(176, "p")(177, "i", 13);
            i0.ɵɵtext(178, "!");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(179);
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(180, "div", 62)(181, "span", 63);
            i0.ɵɵtext(182, "\u2713");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(183, "div")(184, "small");
            i0.ɵɵtext(185, "Paiement rapproch\u00E9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(186, "strong");
            i0.ɵɵtext(187, "Re\u00E7u g\u00E9n\u00E9r\u00E9 automatiquement");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(188, "div", 64)(189, "span", 65);
            i0.ɵɵtext(190, "\u2197");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(191, "div")(192, "small");
            i0.ɵɵtext(193, "Portail parent");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(194, "strong");
            i0.ɵɵtext(195, "Information disponible");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(196, "section", 66)(197, "p");
            i0.ɵɵtext(198, "Une m\u00EAme v\u00E9rit\u00E9, adapt\u00E9e \u00E0 chaque r\u00F4le");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(199, "div")(200, "span");
            i0.ɵɵelement(201, "i", 67);
            i0.ɵɵtext(202, " Direction ");
            i0.ɵɵelementStart(203, "b");
            i0.ɵɵtext(204, "Piloter");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(205, "span");
            i0.ɵɵelement(206, "i", 68);
            i0.ɵɵtext(207, " Enseignants ");
            i0.ɵɵelementStart(208, "b");
            i0.ɵɵtext(209, "Agir");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(210, "span");
            i0.ɵɵelement(211, "i", 69);
            i0.ɵɵtext(212, " Parents ");
            i0.ɵɵelementStart(213, "b");
            i0.ɵɵtext(214, "Suivre");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(215, "span");
            i0.ɵɵelement(216, "i", 70);
            i0.ɵɵtext(217, " \u00C9l\u00E8ves ");
            i0.ɵɵelementStart(218, "b");
            i0.ɵɵtext(219, "Progresser");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(220, "section", 71)(221, "div", 72)(222, "p", 73);
            i0.ɵɵtext(223, "Commencer par le vrai probl\u00E8me");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(224, "h2");
            i0.ɵɵtext(225, "Quel sujet voulez-vous");
            i0.ɵɵelement(226, "br");
            i0.ɵɵelementStart(227, "em");
            i0.ɵɵtext(228, "r\u00E9soudre en premier ?");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(229, "p");
            i0.ɵɵtext(230, "Soocloo ne vous impose pas un ordre. Votre d\u00E9monstration met d\u2019abord en sc\u00E8ne ce qui compte maintenant pour votre \u00E9quipe.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(231, "div", 74);
            i0.ɵɵrepeaterCreate(232, LandingComponent_For_233_Template, 11, 7, "button", 75, _forTrack1);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(234, "section", 76)(235, "div", 77)(236, "p", 73);
            i0.ɵɵtext(237, "Un logiciel qui parle votre langage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(238, "h2");
            i0.ɵɵtext(239, "Vos r\u00E8gles ne sont pas des exceptions.");
            i0.ɵɵelement(240, "br");
            i0.ɵɵelementStart(241, "em");
            i0.ɵɵtext(242, "Elles deviennent des param\u00E8tres.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(243, "p");
            i0.ɵɵtext(244, " Une \u00E9cole primaire, un lyc\u00E9e et un groupe multi-campus n\u2019ont ni les m\u00EAmes rythmes, ni les m\u00EAmes contr\u00F4les. Votre espace part de vos d\u00E9cisions, pas d\u2019un mod\u00E8le fig\u00E9. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(245, "ul")(246, "li")(247, "span");
            i0.ɵɵtext(248, "01");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(249, "div")(250, "strong");
            i0.ɵɵtext(251, "Choisissez une base");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(252, "small");
            i0.ɵɵtext(253, "Un profil proche de votre organisation, jamais une page blanche.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(254, "li")(255, "span");
            i0.ɵɵtext(256, "02");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(257, "div")(258, "strong");
            i0.ɵɵtext(259, "Ajustez ce qui compte");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(260, "small");
            i0.ɵɵtext(261, "Cycles, p\u00E9riodes, capacit\u00E9s, bar\u00E8mes, finance et acc\u00E8s.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(262, "li")(263, "span");
            i0.ɵɵtext(264, "03");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(265, "div")(266, "strong");
            i0.ɵɵtext(267, "Faites \u00E9voluer sans recommencer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(268, "small");
            i0.ɵɵtext(269, "Les r\u00E9glages suivent vos ann\u00E9es scolaires et vos campus.");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(270, "a", 78);
            i0.ɵɵlistener("click", function LandingComponent_Template_a_click_270_listener() { return ctx.prepareDemo(); });
            i0.ɵɵtext(271, "Configurer mon \u00E9cole t\u00E9moin ");
            i0.ɵɵelementStart(272, "span");
            i0.ɵɵtext(273, "\u2192");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(274, "div", 79)(275, "div", 80)(276, "div")(277, "small");
            i0.ɵɵtext(278, "PROFIL ACTIF");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(279, "strong");
            i0.ɵɵtext(280, "Groupe Scolaire Horizon");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(281, "span");
            i0.ɵɵelement(282, "i");
            i0.ɵɵtext(283, " Brouillon sauvegard\u00E9");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(284, "div", 81);
            i0.ɵɵrepeaterCreate(285, LandingComponent_For_286_Template, 10, 5, "article", 82, _forTrack2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(287, "div", 83)(288, "span");
            i0.ɵɵtext(289, "7 modules s\u00E9lectionn\u00E9s");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(290, "div");
            i0.ɵɵelement(291, "i")(292, "i")(293, "i");
            i0.ɵɵelementStart(294, "b");
            i0.ɵɵtext(295, "+4");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(296, "button", 8);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_296_listener() { return ctx.scrollTo("parcours"); });
            i0.ɵɵtext(297, "Voir le parcours");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(298, "section", 84)(299, "div", 85)(300, "div", 86)(301, "p", 87);
            i0.ɵɵtext(302, "La confiance est aussi une fonctionnalit\u00E9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(303, "h2");
            i0.ɵɵtext(304, "Le syst\u00E8me prot\u00E8ge les r\u00E8gles");
            i0.ɵɵelement(305, "br");
            i0.ɵɵtext(306, "m\u00EAme quand personne ne regarde.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(307, "div", 88)(308, "article")(309, "span", 89);
            i0.ɵɵtext(310, "40");
            i0.ɵɵelementStart(311, "span");
            i0.ɵɵtext(312, "/40");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(313, "div")(314, "small");
            i0.ɵɵtext(315, "CAPACIT\u00C9 ATTEINTE");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(316, "h3");
            i0.ɵɵtext(317, "Le 41e \u00E9l\u00E8ve est signal\u00E9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(318, "p");
            i0.ɵɵtext(319, "Une d\u00E9rogation exige un motif : l\u2019exception reste visible.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(320, "article")(321, "span", 89);
            i0.ɵɵtext(322, "24");
            i0.ɵɵelementStart(323, "span");
            i0.ɵɵtext(324, "/20");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(325, "div")(326, "small");
            i0.ɵɵtext(327, "BAR\u00C8ME D\u00C9PASS\u00C9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(328, "h3");
            i0.ɵɵtext(329, "La note incoh\u00E9rente est bloqu\u00E9e");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(330, "p");
            i0.ɵɵtext(331, "Le contr\u00F4le vient de la r\u00E8gle d\u00E9finie par votre \u00E9cole.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(332, "article")(333, "span", 89);
            i0.ɵɵtext(334, "\u2713");
            i0.ɵɵelementStart(335, "span");
            i0.ɵɵtext(336, "re\u00E7u");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(337, "div")(338, "small");
            i0.ɵɵtext(339, "PAIEMENT VALID\u00C9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(340, "h3");
            i0.ɵɵtext(341, "L\u2019historique ne dispara\u00EEt pas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(342, "p");
            i0.ɵɵtext(343, "Une correction se trace, elle ne r\u00E9\u00E9crit pas le pass\u00E9.");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(344, "section", 90)(345, "div", 91)(346, "p", 73);
            i0.ɵɵtext(347, "Votre \u00E9cole t\u00E9moin, \u00E9tape par \u00E9tape");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(348, "h2");
            i0.ɵɵtext(349, "Quelques choix. Puis un espace");
            i0.ɵɵelement(350, "br");
            i0.ɵɵelementStart(351, "em");
            i0.ɵɵtext(352, "qui raconte d\u00E9j\u00E0 votre quotidien.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(353, "p");
            i0.ɵɵtext(354, "Le brouillon reste sur cet appareil jusqu\u2019\u00E0 la cr\u00E9ation de votre compte.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(355, "ol", 92)(356, "li")(357, "span");
            i0.ɵɵtext(358, "1");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(359, "div", 93);
            i0.ɵɵtext(360, "\u2302");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(361, "h3");
            i0.ɵɵtext(362, "Votre profil");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(363, "p");
            i0.ɵɵtext(364, "Type d\u2019\u00E9cole, taille, campus et contexte.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(365, "li")(366, "span");
            i0.ɵɵtext(367, "2");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(368, "div", 93);
            i0.ɵɵtext(369, "\u25C7");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(370, "h3");
            i0.ɵɵtext(371, "Vos priorit\u00E9s");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(372, "p");
            i0.ɵɵtext(373, "Les modules qui doivent prendre vie en premier.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(374, "li")(375, "span");
            i0.ɵɵtext(376, "3");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(377, "div", 93);
            i0.ɵɵtext(378, "\u2261");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(379, "h3");
            i0.ɵɵtext(380, "Vos r\u00E8gles");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(381, "p");
            i0.ɵɵtext(382, "P\u00E9riodes, bar\u00E8me, capacit\u00E9 et paiements.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(383, "li")(384, "span");
            i0.ɵɵtext(385, "4");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(386, "div", 93);
            i0.ɵɵtext(387, "\u2197");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(388, "h3");
            i0.ɵɵtext(389, "Votre espace");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(390, "p");
            i0.ɵɵtext(391, "Un compte administrateur et votre feuille de route.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(392, "div", 94)(393, "a", 23);
            i0.ɵɵlistener("click", function LandingComponent_Template_a_click_393_listener() { return ctx.prepareDemo(); });
            i0.ɵɵtext(394, " Commencer la configuration ");
            i0.ɵɵelementStart(395, "span", 13);
            i0.ɵɵtext(396, "\u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(397, "small");
            i0.ɵɵtext(398, "Vous pourrez revenir sur chaque choix.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(399, "section", 95)(400, "div", 96)(401, "p", 73);
            i0.ɵɵtext(402, "Questions fr\u00E9quentes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(403, "h2");
            i0.ɵɵtext(404, "Avant de");
            i0.ɵɵelement(405, "br");
            i0.ɵɵelementStart(406, "em");
            i0.ɵɵtext(407, "vous lancer.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(408, "p");
            i0.ɵɵtext(409, "Une question plus pr\u00E9cise sur votre \u00E9tablissement ? La d\u00E9mo vous permet d\u00E9j\u00E0 de tester vos principaux r\u00E9glages.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(410, "a", 78);
            i0.ɵɵlistener("click", function LandingComponent_Template_a_click_410_listener() { return ctx.prepareDemo(); });
            i0.ɵɵtext(411, "Essayer avec mon profil ");
            i0.ɵɵelementStart(412, "span");
            i0.ɵɵtext(413, "\u2192");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(414, "div", 97);
            i0.ɵɵrepeaterCreate(415, LandingComponent_For_416_Template, 6, 5, "article", 98, _forTrack3);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(417, "section", 99);
            i0.ɵɵelement(418, "div", 100)(419, "div", 101);
            i0.ɵɵelementStart(420, "p");
            i0.ɵɵtext(421, "La meilleure d\u00E9mo n\u2019est pas la n\u00F4tre.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(422, "h2");
            i0.ɵɵtext(423, "C\u2019est celle qui ressemble");
            i0.ɵɵelement(424, "br");
            i0.ɵɵelementStart(425, "em");
            i0.ɵɵtext(426, "\u00E0 votre \u00E9cole.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(427, "a", 102);
            i0.ɵɵlistener("click", function LandingComponent_Template_a_click_427_listener() { return ctx.prepareDemo(); });
            i0.ɵɵtext(428, " Composer mon \u00E9cole t\u00E9moin ");
            i0.ɵɵelementStart(429, "span", 13);
            i0.ɵɵtext(430, "\u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(431, "small");
            i0.ɵɵtext(432, "Configuration guid\u00E9e \u00B7 Sans carte bancaire \u00B7 Donn\u00E9es fictives");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(433, "footer", 103)(434, "div", 104)(435, "a", 105);
            i0.ɵɵelement(436, "img", 106);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(437, "p");
            i0.ɵɵtext(438, "Simplifiez l\u2019\u00E9cole. Multipliez les r\u00E9ussites.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(439, "nav", 107)(440, "a", 108);
            i0.ɵɵtext(441, "Connexion");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(442, "a", 109);
            i0.ɵɵtext(443, "Cr\u00E9er mon espace");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(444, "a", 110);
            i0.ɵɵlistener("click", function LandingComponent_Template_a_click_444_listener() { return ctx.prepareDemo(); });
            i0.ɵɵtext(445, "Cr\u00E9er une d\u00E9mo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(446, "button", 8);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_446_listener() { return ctx.scrollTo("faq"); });
            i0.ɵɵtext(447, "Questions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(448, "small");
            i0.ɵɵtext(449);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("nav--open", ctx.menuOpen());
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("aria-expanded", ctx.menuOpen());
            i0.ɵɵadvance(16);
            i0.ɵɵconditional(ctx.isAuthenticated() ? 23 : 24);
            i0.ɵɵadvance(50);
            i0.ɵɵrepeater(ctx.previews);
            i0.ɵɵadvance(28);
            i0.ɵɵtextInterpolate(ctx.activePreview().label);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.activePreview().context);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.activePreview().students);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.activePreview().attendance);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.activePreview().collection);
            i0.ɵɵadvance(40);
            i0.ɵɵtextInterpolate(ctx.activePreview().focus);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.activePreview().cycles);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", ctx.activePreview().alert, "");
            i0.ɵɵadvance(53);
            i0.ɵɵrepeater(ctx.challenges);
            i0.ɵɵadvance(53);
            i0.ɵɵrepeater(ctx.ruleGroups);
            i0.ɵɵadvance(130);
            i0.ɵɵrepeater(ctx.faq());
            i0.ɵɵadvance(34);
            i0.ɵɵtextInterpolate1("\u00A9 ", ctx.currentYear, " Soocloo \u00B7 www.soocloo.com");
        } }, dependencies: [CommonModule, RouterLink], styles: ["@import 'styles/tokens';\n\n[_nghost-%COMP%] {\n  --navy: #0f1f3d;\n  --deep: #153f91;\n  --lagoon: #0b8a7d;\n  --lagoon-dark: #087267;\n  --sun: #e9aa38;\n  --paper: #fbfcf8;\n  display: block;\n}\n\n.landing[_ngcontent-%COMP%] { min-height: 100vh; overflow: hidden; background: #fff; color: var(--text-normal); }\n.button[_ngcontent-%COMP%] {\n  min-height: 46px; display: inline-flex; align-items: center; justify-content: center; gap: 10px;\n  padding: 0 20px; border: 1px solid transparent; border-radius: 12px; font: 700 14px/1 var(--font-body);\n  cursor: pointer; text-decoration: none; transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;\n}\n.button[_ngcontent-%COMP%]:hover { transform: translateY(-1px); text-decoration: none; }\n.button--small[_ngcontent-%COMP%] { min-height: 40px; padding: 0 16px; background: var(--brand); color: #fff; border-radius: 10px; }\n.button--small[_ngcontent-%COMP%]:hover, .button--primary[_ngcontent-%COMP%]:hover { background: var(--brand-hover); color: #fff; }\n.button--primary[_ngcontent-%COMP%] { background: var(--brand); color: #fff; box-shadow: 0 12px 26px rgba(31, 95, 214, .22); }\n.button--large[_ngcontent-%COMP%] { min-height: 52px; padding: 0 23px; font-size: 15px; }\n.button--quiet[_ngcontent-%COMP%] { color: var(--navy); background: rgba(255,255,255,.82); border-color: #dce4f0; }\n.button--quiet[_ngcontent-%COMP%]:hover { color: var(--brand); background: #fff; }\n.button--light[_ngcontent-%COMP%] { color: var(--deep); background: #fff; box-shadow: 0 15px 30px rgba(5, 24, 56, .2); }\n.play[_ngcontent-%COMP%] { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; background: var(--brand-tint); color: var(--brand); font-size: 9px; }\n\n.nav[_ngcontent-%COMP%] { position: fixed; inset: 0 0 auto; z-index: var(--z-topbar); height: 72px; background: rgba(255,255,255,.9); border-bottom: 1px solid rgba(219,227,239,.8); backdrop-filter: blur(16px); }\n.nav__inner[_ngcontent-%COMP%] { height: 100%; width: min(1180px, calc(100% - 40px)); margin: auto; display: flex; align-items: center; gap: 36px; }\n.brand[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: 10px; color: var(--navy); font: 800 19px/1 var(--font-display); text-decoration: none; }\n.brand[_ngcontent-%COMP%]:hover { color: var(--navy); text-decoration: none; }\n.brand__mark[_ngcontent-%COMP%] { width: 34px; height: 34px; display: flex; align-items: end; justify-content: center; gap: 3px; padding: 8px; border-radius: 11px 11px 11px 4px; background: linear-gradient(145deg, var(--brand), #124498); box-shadow: 0 7px 15px rgba(31,95,214,.2); }\n.brand__mark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { width: 4px; border-radius: 3px; background: #fff; }\n.brand__mark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) { height: 9px; opacity: .7; }\n.brand__mark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) { height: 16px; }\n.brand__mark[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3) { height: 12px; opacity: .85; }\n.nav__links[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 28px; margin-left: auto; }\n.nav__links[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .nav__links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { border: 0; padding: 0; background: none; color: #59677f; font: 600 13px/1 var(--font-body); cursor: pointer; }\n.nav__links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { text-decoration: none; white-space: nowrap; }\n.nav__links[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, .nav__links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover { color: var(--brand); }\n.nav__actions[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 18px; }\n.nav__login[_ngcontent-%COMP%] { color: #4e5c74; font-size: 13px; font-weight: 600; }\n.nav__toggle[_ngcontent-%COMP%] { display: none; width: 42px; height: 42px; border: 0; border-radius: 10px; background: var(--surface-sunken); padding: 11px; }\n.nav__toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: block; height: 2px; margin: 4px 0; background: var(--navy); border-radius: 2px; }\n\n.hero[_ngcontent-%COMP%] { position: relative; min-height: 750px; padding: 148px 0 80px; background-color: var(--paper); background-image: linear-gradient(rgba(31,95,214,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(31,95,214,.035) 1px, transparent 1px); background-size: 42px 42px; }\n.hero[_ngcontent-%COMP%]::after { content: ''; position: absolute; inset: auto 0 0; height: 130px; background: linear-gradient(transparent, rgba(255,255,255,.82)); pointer-events: none; }\n.hero__inner[_ngcontent-%COMP%] { position: relative; z-index: 2; width: min(1180px, calc(100% - 40px)); margin: auto; display: grid; grid-template-columns: .92fr 1.08fr; gap: 55px; align-items: center; }\n.hero__copy[_ngcontent-%COMP%] { padding-bottom: 10px; }\n.eyebrow[_ngcontent-%COMP%], .section-kicker[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 9px; margin: 0 0 20px; color: var(--brand); font-size: 11px; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; }\n.eyebrow[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { width: 20px; height: 20px; border: 1px solid #bcd4fa; border-radius: 50%; background: radial-gradient(circle, var(--brand) 0 3px, transparent 4px); }\n.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { max-width: 610px; color: var(--navy); font-size: clamp(42px, 4.4vw, 67px); line-height: 1.01; letter-spacing: -.055em; }\n.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   em[_ngcontent-%COMP%], .section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   em[_ngcontent-%COMP%], .final-cta[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] { color: var(--brand); font-style: normal; }\n.hero__lead[_ngcontent-%COMP%] { max-width: 580px; margin: 25px 0 28px; color: #627089; font-size: 17px; line-height: 1.7; }\n.hero__actions[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 12px; }\n\n\n.price[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: baseline;\n  flex-wrap: wrap;\n  gap: 7px;\n  margin: 22px 0 0;\n  padding: 9px 16px;\n  background: #fff;\n  border: 1px solid #e3e8f0;\n  border-radius: 999px;\n  box-shadow: 0 1px 2px rgba(16, 24, 40, .04);\n}\n.price__label[_ngcontent-%COMP%] { font-size: 12px; color: #77839a; }\n.price__amount[_ngcontent-%COMP%] { font-size: 19px; font-weight: 800; color: var(--navy); letter-spacing: -.01em; }\n.price__period[_ngcontent-%COMP%] { font-size: 12px; color: #77839a; }\n.price__note[_ngcontent-%COMP%] { font-size: 11px; color: #98a2b3; }\n\n.assurances[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 10px 18px; margin: 22px 0 0; padding: 0; list-style: none; color: #77839a; font-size: 11px; }\n.assurances[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--lagoon); font-weight: 800; }\n.hero__glow[_ngcontent-%COMP%] { position: absolute; border-radius: 50%; filter: blur(1px); pointer-events: none; }\n.hero__glow--one[_ngcontent-%COMP%] { width: 380px; height: 380px; right: 2%; top: 15%; background: rgba(31,95,214,.07); }\n.hero__glow--two[_ngcontent-%COMP%] { width: 190px; height: 190px; left: 38%; bottom: 5%; background: rgba(11,138,125,.06); }\n\n.hero__experience[_ngcontent-%COMP%] { position: relative; padding-top: 54px; }\n.profile-picker[_ngcontent-%COMP%] { position: absolute; z-index: 4; top: 0; left: 50%; display: flex; gap: 4px; padding: 5px; border: 1px solid #dfe7f1; border-radius: 12px; background: rgba(255,255,255,.94); box-shadow: var(--shadow-md); transform: translateX(-50%); }\n.profile-picker[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { min-height: 34px; padding: 0 13px; border: 0; border-radius: 8px; background: transparent; color: #7a879c; font: 700 11px var(--font-body); white-space: nowrap; cursor: pointer; }\n.profile-picker[_ngcontent-%COMP%]   .profile-picker__item--active[_ngcontent-%COMP%] { background: var(--navy); color: #fff; }\n.console[_ngcontent-%COMP%] { overflow: hidden; border: 1px solid #dbe4f0; border-radius: 20px; background: #fff; box-shadow: 0 30px 65px rgba(32,54,88,.16), 0 4px 12px rgba(32,54,88,.07); transform: perspective(1400px) rotateY(-1.6deg) rotateX(1deg); }\n.console__bar[_ngcontent-%COMP%] { height: 38px; display: flex; align-items: center; gap: 12px; padding: 0 14px; background: #f7f9fc; border-bottom: 1px solid #e7ecf3; }\n.console__dots[_ngcontent-%COMP%] { display: flex; gap: 5px; }\n.console__dots[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { width: 7px; height: 7px; border-radius: 50%; background: #ff7a63; }\n.console__dots[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:nth-child(2) { background: #f4bc49; }\n.console__dots[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:nth-child(3) { background: #4fc68b; }\n.console__address[_ngcontent-%COMP%] { flex: 1; max-width: 230px; margin: auto; padding: 5px 10px; border: 1px solid #e1e7ef; border-radius: 7px; background: #fff; color: #91a0b6; font-size: 8px; text-align: center; }\n.console__live[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 5px; color: #758399; font-size: 8px; font-weight: 700; }\n.console__live[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .rule-board__top[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { width: 6px; height: 6px; border-radius: 50%; background: #20b779; box-shadow: 0 0 0 3px rgba(32,183,121,.12); }\n.console__body[_ngcontent-%COMP%] { min-height: 374px; display: grid; grid-template-columns: 50px 1fr; }\n.console__side[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: center; gap: 19px; padding: 16px 10px; background: var(--navy); }\n.console__mini-logo[_ngcontent-%COMP%] { width: 25px; height: 25px; display: grid; place-items: center; margin-bottom: 5px; border-radius: 7px; background: var(--brand); color: #fff; font: 800 10px var(--font-display); }\n.side-line[_ngcontent-%COMP%] { width: 20px; height: 5px; border-radius: 5px; background: rgba(255,255,255,.18); }\n.side-line--active[_ngcontent-%COMP%] { height: 20px; background: rgba(87,144,248,.6); }\n.side-line--short[_ngcontent-%COMP%] { width: 13px; margin-top: auto; }\n.console__main[_ngcontent-%COMP%] { min-width: 0; padding: 22px; background: #f6f8fc; }\n.console__heading[_ngcontent-%COMP%] { display: flex; align-items: start; justify-content: space-between; gap: 12px; }\n.console__heading[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .metrics[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .priority-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .pulse-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; color: #8d99ad; font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; }\n.console__heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 4px 0 2px; color: var(--navy); font-size: 17px; }\n.console__heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0; color: #8390a4; font-size: 9px; }\n.status[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 6px; padding: 6px 9px; border: 1px solid #ccebdc; border-radius: 20px; background: #f0fbf5; color: #26835c; font-size: 8px; font-weight: 700; }\n.metrics[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 17px; }\n.metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { position: relative; padding: 12px 10px 10px 38px; border: 1px solid #e5eaf2; border-radius: 11px; background: #fff; }\n.metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; margin: 2px 0; color: var(--navy); font: 800 19px var(--font-display); }\n.metrics[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] { color: #9aa5b6; font-size: 7px; font-style: normal; }\n.metric__icon[_ngcontent-%COMP%] { position: absolute; left: 10px; top: 13px; width: 20px; height: 20px; display: grid; place-items: center; border-radius: 7px; font-size: 9px; font-weight: 800; }\n.metric__icon--blue[_ngcontent-%COMP%] { background: #eaf1fe; color: var(--brand); }\n.metric__icon--green[_ngcontent-%COMP%] { background: #e7f7f0; color: var(--lagoon); }\n.metric__icon--gold[_ngcontent-%COMP%] { background: #fff4df; color: #c98513; }\n.console__lower[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1.25fr .75fr; gap: 10px; margin-top: 10px; }\n.pulse-card[_ngcontent-%COMP%], .priority-card[_ngcontent-%COMP%] { min-height: 139px; padding: 13px; border: 1px solid #e5eaf2; border-radius: 11px; background: #fff; }\n.card-heading[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: start; }\n.card-heading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; margin-top: 3px; color: var(--navy); font-size: 10px; }\n.card-heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { padding: 4px 6px; border-radius: 5px; background: #f2f5f9; color: #8693a7; font-size: 7px; }\n.bars[_ngcontent-%COMP%] { height: 63px; display: flex; align-items: end; gap: 7px; padding-top: 13px; border-bottom: 1px solid #edf0f5; }\n.bars[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { flex: 1; height: var(--h); min-height: 7px; border-radius: 4px 4px 0 0; background: #cbdafa; }\n.bars[_ngcontent-%COMP%]   .bars__today[_ngcontent-%COMP%] { background: linear-gradient(var(--brand), #6d9af0); }\n.days[_ngcontent-%COMP%] { display: flex; justify-content: space-between; padding-top: 5px; color: #a2adbd; font-size: 6px; }\n.priority-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; min-height: 29px; margin-top: 5px; color: var(--navy); font-size: 11px; line-height: 1.3; }\n.priority-card__chips[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 4px; margin: 8px 0; }\n.priority-card__chips[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { padding: 4px 6px; border-radius: 12px; background: var(--brand-tint); color: var(--brand); font-size: 7px; font-weight: 700; }\n.priority-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 5px; margin: 7px 0 0; color: #68768c; font-size: 7px; }\n.priority-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { width: 14px; height: 14px; display: grid; place-items: center; border-radius: 50%; background: #fff1df; color: #c87b0b; font-size: 8px; font-style: normal; font-weight: 800; }\n.floating-event[_ngcontent-%COMP%] { position: absolute; z-index: 5; display: flex; align-items: center; gap: 9px; padding: 10px 13px; border: 1px solid #dfe7f1; border-radius: 12px; background: rgba(255,255,255,.96); box-shadow: 0 16px 30px rgba(27,48,81,.14); }\n.floating-event--payment[_ngcontent-%COMP%] { left: -33px; bottom: 61px; }\n.floating-event--family[_ngcontent-%COMP%] { right: -30px; top: 131px; }\n.floating-event[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; color: #929db0; font-size: 7px; }\n.floating-event[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; margin-top: 2px; color: var(--navy); font-size: 8px; }\n.event-icon[_ngcontent-%COMP%] { width: 26px; height: 26px; display: grid; place-items: center; border-radius: 8px; background: #e8f7f0; color: var(--lagoon); font-size: 11px; font-weight: 800; }\n.event-icon--violet[_ngcontent-%COMP%] { background: #f0ebfd; color: #7755ce; }\n\n.role-strip[_ngcontent-%COMP%] { position: relative; z-index: 3; width: min(1060px, calc(100% - 40px)); display: flex; align-items: center; justify-content: space-between; gap: 25px; margin: -28px auto 0; padding: 20px 26px; border: 1px solid #e3e9f1; border-radius: 16px; background: #fff; box-shadow: var(--shadow-md); }\n.role-strip[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { margin: 0; color: #8a96a9; font-size: 10px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; }\n.role-strip[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { display: flex; gap: 26px; }\n.role-strip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: grid; grid-template-columns: auto auto; gap: 0 7px; color: var(--navy); font-size: 11px; font-weight: 700; }\n.role-strip[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] { grid-column: 2; color: #97a2b3; font-size: 8px; font-weight: 600; }\n.role-dot[_ngcontent-%COMP%] { grid-row: span 2; align-self: center; width: 8px; height: 8px; border-radius: 3px; background: var(--brand); }\n.role-dot--green[_ngcontent-%COMP%] { background: var(--lagoon); }.role-dot--purple[_ngcontent-%COMP%] { background: #7657ca; }.role-dot--gold[_ngcontent-%COMP%] { background: var(--sun); }\n\n.section[_ngcontent-%COMP%] { width: min(1120px, calc(100% - 40px)); margin: auto; padding: 112px 0; }\n.section__heading[_ngcontent-%COMP%] { max-width: 650px; }\n.section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { color: var(--navy); font-size: clamp(32px, 4vw, 48px); letter-spacing: -.04em; }\n.section__heading[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:last-child, .adaptation__copy[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { margin-top: 20px; color: #718096; line-height: 1.7; }\n.challenges[_ngcontent-%COMP%] { display: grid; grid-template-columns: .75fr 1.25fr; gap: 70px; align-items: start; }\n.challenge-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }\n.challenge-card[_ngcontent-%COMP%] { min-height: 235px; padding: 24px; border: 1px solid #e4e9f1; border-radius: 17px; background: #fff; color: inherit; font-family: var(--font-body); text-align: left; cursor: pointer; transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease; }\n.challenge-card[_ngcontent-%COMP%]:hover { transform: translateY(-4px); border-color: #cbdcf7; box-shadow: var(--shadow-md); }\n.challenge-card--selected[_ngcontent-%COMP%] { border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-tint); }\n.challenge-card__index[_ngcontent-%COMP%] { display: inline-grid; place-items: center; width: 30px; height: 30px; border-radius: 9px; background: var(--brand-tint); color: var(--brand); font: 800 10px var(--font-display); }\n.challenge-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 27px 0 11px; color: var(--navy); font-size: 16px; line-height: 1.35; }\n.challenge-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { min-height: 57px; color: #77859a; font-size: 12px; line-height: 1.6; }\n.challenge-card[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { display: flex; gap: 7px; color: var(--lagoon-dark); font-size: 10px; font-weight: 700; }\n\n.adaptation[_ngcontent-%COMP%] { width: 100%; max-width: none; display: grid; grid-template-columns: minmax(0, 510px) minmax(0, 570px); justify-content: center; gap: 80px; padding-inline: 30px; background: #f7f9fc; }\n.adaptation__copy[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] { display: grid; gap: 17px; margin: 30px 0 25px; padding: 0; list-style: none; }\n.adaptation__copy[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] { display: flex; align-items: start; gap: 14px; }\n.adaptation__copy[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { flex: 0 0 29px; height: 29px; display: grid; place-items: center; border-radius: 9px; background: #fff; border: 1px solid #dfe7f1; color: var(--brand); font-size: 9px; font-weight: 800; }\n.adaptation__copy[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .adaptation__copy[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; }\n.adaptation__copy[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--navy); font-size: 13px; }\n.adaptation__copy[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { margin-top: 3px; color: #8290a4; font-size: 11px; line-height: 1.45; }\n.text-link[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: 9px; color: var(--brand); font-size: 13px; font-weight: 800; }\n.text-link[_ngcontent-%COMP%]:hover { text-decoration: none; }.text-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { transition: transform 180ms ease; }.text-link[_ngcontent-%COMP%]:hover   span[_ngcontent-%COMP%] { transform: translateX(4px); }\n.rule-board[_ngcontent-%COMP%] { align-self: center; overflow: hidden; border: 1px solid #dfe6ef; border-radius: 22px; background: #fff; box-shadow: 0 24px 55px rgba(40,61,93,.12); }\n.rule-board__top[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding: 20px 22px; border-bottom: 1px solid #e8edf3; }\n.rule-board__top[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .rule[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; color: #9aa4b4; font-size: 8px; font-weight: 800; letter-spacing: .06em; }\n.rule-board__top[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; margin-top: 3px; color: var(--navy); font-size: 13px; }\n.rule-board__top[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 7px; color: #4a8b6c; font-size: 8px; font-weight: 700; }\n.rule-board__grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; padding: 18px; background: #fafbfd; }\n.rule[_ngcontent-%COMP%] { position: relative; min-height: 150px; padding: 18px; overflow: hidden; border: 1px solid #e4e9f0; border-radius: 14px; background: #fff; }\n.rule[_ngcontent-%COMP%]::after { content: ''; position: absolute; right: -25px; top: -25px; width: 70px; height: 70px; border-radius: 50%; background: var(--rule-bg); }\n.rule__mark[_ngcontent-%COMP%] { display: block; width: 24px; height: 5px; margin-bottom: 18px; border-radius: 4px; background: var(--rule-color); }\n.rule[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display: block; margin-top: 7px; color: var(--navy); font-size: 13px; }\n.rule[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 4px 0 13px; color: #8490a2; font-size: 9px; }\n.rule--blue[_ngcontent-%COMP%] { --rule-color: var(--brand); --rule-bg: #eaf1fe; }.rule--green[_ngcontent-%COMP%] { --rule-color: var(--lagoon); --rule-bg: #e5f5f1; }\n.rule--gold[_ngcontent-%COMP%] { --rule-color: var(--sun); --rule-bg: #fff3db; }.rule--purple[_ngcontent-%COMP%] { --rule-color: #7657ca; --rule-bg: #f0ebfc; }\n.toggle[_ngcontent-%COMP%] { display: block; width: 27px; height: 15px; padding: 2px; border-radius: 10px; background: var(--rule-color); }\n.toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: block; width: 11px; height: 11px; margin-left: auto; border-radius: 50%; background: #fff; }\n.rule-board__footer[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 12px; padding: 14px 20px; border-top: 1px solid #e8edf3; }\n.rule-board__footer[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { color: #7c899c; font-size: 9px; }.rule-board__footer[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { display: flex; margin-right: auto; }\n.rule-board__footer[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .rule-board__footer[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] { width: 22px; height: 22px; display: grid; place-items: center; margin-left: -5px; border: 2px solid #fff; border-radius: 50%; background: var(--brand-tint); }\n.rule-board__footer[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:nth-child(2) { background: #e5f5f1; }.rule-board__footer[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:nth-child(3) { background: #fff1db; }\n.rule-board__footer[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] { background: var(--navy); color: #fff; font-size: 7px; }\n.rule-board__footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { border: 0; background: none; color: var(--brand); font: 800 9px var(--font-body); cursor: pointer; }\n\n.integrity[_ngcontent-%COMP%] { padding: 90px 30px; background: var(--navy); }\n.integrity__inner[_ngcontent-%COMP%] { width: min(1120px, 100%); margin: auto; }\n.integrity__title[_ngcontent-%COMP%] { display: flex; align-items: end; justify-content: space-between; gap: 35px; margin-bottom: 42px; }\n.section-kicker--light[_ngcontent-%COMP%] { color: #7ca7f6; }.integrity[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { max-width: 640px; color: #fff; font-size: clamp(30px, 3.6vw, 45px); }\n.guard-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }\n.guard-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] { min-height: 205px; padding: 23px; border: 1px solid rgba(255,255,255,.11); border-radius: 16px; background: rgba(255,255,255,.045); }\n.guard-icon[_ngcontent-%COMP%] { width: 58px; height: 58px; display: grid; place-items: center; margin-bottom: 29px; border: 1px solid rgba(255,255,255,.16); border-radius: 15px; background: rgba(255,255,255,.07); color: #fff; font: 800 16px var(--font-display); }\n.guard-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: block; margin-top: -9px; color: #91a0b9; font-size: 7px; }.guard-grid[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #70a0f8; font-size: 8px; font-weight: 800; letter-spacing: .06em; }\n.guard-grid[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 7px 0; color: #fff; font-size: 14px; }.guard-grid[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { color: #9ba9bf; font-size: 11px; line-height: 1.55; }\n\n.section__heading--center[_ngcontent-%COMP%] { max-width: 750px; margin: 0 auto 55px; text-align: center; }\n.section__heading--center[_ngcontent-%COMP%]   .section-kicker[_ngcontent-%COMP%] { justify-content: center; }\n.journey__steps[_ngcontent-%COMP%] { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; margin: 0; padding: 0; list-style: none; }\n.journey__steps[_ngcontent-%COMP%]::before { content: ''; position: absolute; left: 12.5%; right: 12.5%; top: 38px; border-top: 1px dashed #cbd5e2; }\n.journey__steps[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] { position: relative; text-align: center; }\n.journey__steps[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { position: absolute; z-index: 2; left: calc(50% + 25px); top: -4px; width: 22px; height: 22px; display: grid; place-items: center; border-radius: 50%; background: var(--brand); color: #fff; font-size: 8px; font-weight: 800; }\n.journey__icon[_ngcontent-%COMP%] { position: relative; z-index: 1; width: 76px; height: 76px; display: grid; place-items: center; margin: 0 auto 19px; border: 1px solid #dce5f0; border-radius: 21px; background: #fff; color: var(--brand); font: 800 24px var(--font-display); box-shadow: var(--shadow-sm); }\n.journey__steps[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { color: var(--navy); font-size: 14px; }.journey__steps[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { max-width: 180px; margin: 8px auto 0; color: #7f8ca0; font-size: 10px; line-height: 1.5; }\n.journey__action[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: center; gap: 11px; margin-top: 50px; }.journey__action[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #929daf; font-size: 9px; }\n\n.faq[_ngcontent-%COMP%] { display: grid; grid-template-columns: .7fr 1.3fr; gap: 85px; padding-top: 90px; }\n.faq__intro[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { color: var(--navy); font-size: 44px; }.faq__intro[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%]:not(.section-kicker) { margin: 20px 0 23px; color: #7a879a; line-height: 1.65; }\n.faq__list[_ngcontent-%COMP%] { border-top: 1px solid #dde4ed; }\n.faq-item[_ngcontent-%COMP%] { border-bottom: 1px solid #dde4ed; }\n.faq-item[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { width: 100%; min-height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 0; border: 0; background: transparent; color: var(--navy); font: 700 14px/1.4 var(--font-body); text-align: left; cursor: pointer; }\n.faq-item[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { position: relative; flex: 0 0 26px; height: 26px; border-radius: 50%; background: var(--surface-sunken); }\n.faq-item[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]::before, .faq-item[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]::after { content: ''; position: absolute; left: 8px; right: 8px; top: 12px; height: 2px; background: var(--brand); }\n.faq-item[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]::after { transform: rotate(90deg); transition: transform 180ms ease; }.faq-item--open[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]::after { transform: rotate(0); }\n.faq-item[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { padding: 0 45px 22px 0; color: #78869a; font-size: 12px; line-height: 1.65; }\n\n.final-cta[_ngcontent-%COMP%] { position: relative; overflow: hidden; width: min(1120px, calc(100% - 40px)); margin: 15px auto 90px; padding: 78px 30px; border-radius: 28px; background: linear-gradient(130deg, #164ca7, #1f5fd6 55%, #147f86); color: #fff; text-align: center; }\n.final-cta[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.final-cta__orbit) { position: relative; z-index: 2; }.final-cta[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%] { margin: 0 0 9px; color: #c9dafb; font-size: 11px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; }\n.final-cta[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { color: #fff; font-size: clamp(36px, 5vw, 55px); }.final-cta[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] { color: #dff9f3; }\n.final-cta[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] { margin-top: 27px; }.final-cta[_ngcontent-%COMP%]    > small[_ngcontent-%COMP%] { display: block; margin-top: 16px; color: #c8d8f5; font-size: 9px; }\n.final-cta__orbit[_ngcontent-%COMP%] { position: absolute; border: 1px solid rgba(255,255,255,.14); border-radius: 50%; }.final-cta__orbit--one[_ngcontent-%COMP%] { width: 440px; height: 440px; left: -210px; top: -190px; }.final-cta__orbit--two[_ngcontent-%COMP%] { width: 520px; height: 520px; right: -230px; bottom: -280px; }\n\n.footer[_ngcontent-%COMP%] { padding: 28px 0; border-top: 1px solid #e4e9ef; background: #fff; }.footer__inner[_ngcontent-%COMP%] { width: min(1120px, calc(100% - 40px)); margin: auto; display: flex; align-items: center; gap: 25px; }\n.brand--footer[_ngcontent-%COMP%] { font-size: 16px; }.brand--footer[_ngcontent-%COMP%]   .brand__mark[_ngcontent-%COMP%] { width: 29px; height: 29px; padding: 7px; }.footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { margin: 0 auto 0 0; color: #8a96a8; font-size: 10px; }\n.footer[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] { display: flex; gap: 20px; }.footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:not(.brand), .footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { color: #69768b; font-size: 10px; font-weight: 600; }.footer[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #a0a9b8; font-size: 9px; }\n\n@include tablet-down {\n  .nav__inner { gap: 20px; }.nav__links { gap: 16px; }.hero__inner { grid-template-columns: 1fr; max-width: 760px; text-align: center; }.hero__copy { display: flex; flex-direction: column; align-items: center; }\n  .hero__lead { max-width: 650px; }.hero__experience { width: min(640px, 100%); margin: 20px auto 0; text-align: left; }.hero { padding-top: 135px; }.floating-event--payment { left: -12px; }.floating-event--family { right: -12px; }\n  .role-strip { margin-top: 35px; flex-direction: column; }.challenges, .faq { grid-template-columns: 1fr; gap: 45px; }.section__heading { max-width: 720px; }.challenge-grid { grid-template-columns: repeat(2, 1fr); }\n  .adaptation { grid-template-columns: minmax(0, 510px); }.guard-grid { grid-template-columns: 1fr; }.guard-grid article { min-height: 0; display: flex; gap: 20px; }.guard-icon { flex: 0 0 58px; margin-bottom: 0; }\n}\n\n@include mobile {\n  .nav { height: 64px; }.nav__inner { width: calc(100% - 28px); }.nav__toggle { display: block; margin-left: auto; }.nav__links, .nav__actions { display: none; }\n  .nav--open { height: auto; }.nav--open .nav__inner { min-height: 64px; flex-wrap: wrap; padding-bottom: 16px; }.nav--open .nav__links, .nav--open .nav__actions { flex: 1 0 100%; display: flex; }\n  .nav--open .nav__links { align-items: stretch; flex-direction: column; gap: 0; }.nav--open .nav__links button, .nav--open .nav__links a { min-height: 42px; display: flex; align-items: center; text-align: left; border-bottom: 1px solid var(--border-light); }\n  .nav--open .nav__actions { justify-content: space-between; }.hero { min-height: 0; padding: 112px 0 65px; }.hero__inner { width: calc(100% - 28px); gap: 32px; }.eyebrow { max-width: 310px; font-size: 9px; line-height: 1.4; }\n  .hero h1 { font-size: 41px; }.hero__lead { margin: 20px 0 24px; font-size: 15px; }.hero__actions { width: 100%; }.hero__actions .button { width: 100%; }.assurances { justify-content: center; gap: 7px 13px; }.price { align-self: center; }\n  .hero__experience { padding-top: 51px; }.profile-picker { width: 100%; }.profile-picker button { flex: 1; padding: 0 6px; }.console { transform: none; }.console__body { grid-template-columns: 1fr; min-height: 0; }.console__side { display: none; }.console__main { padding: 14px; }\n  .console__heading .status { display: none; }.metrics { gap: 6px; }.metrics article { padding: 10px 6px; }.metric__icon { display: none; }.metrics strong { font-size: 16px; }.console__lower { grid-template-columns: 1fr; }.priority-card { display: none; }\n  .floating-event { display: none; }.role-strip { width: calc(100% - 28px); padding: 18px; }.role-strip > div { display: grid; grid-template-columns: 1fr 1fr; width: 100%; gap: 15px; }\n  .section { width: calc(100% - 28px); padding: 78px 0; }.section h2 { font-size: 34px; }.challenge-grid { grid-template-columns: 1fr; }.challenge-card { min-height: 0; }.challenge-card p { min-height: 0; }\n  .adaptation { width: 100%; padding: 75px 14px; gap: 45px; }.rule-board__grid { grid-template-columns: 1fr; }.rule { min-height: 130px; }.rule-board__footer > span { display: none; }\n  .integrity { padding: 72px 14px; }.integrity__title { display: block; }.guard-grid article { padding: 19px; }.journey__steps { grid-template-columns: 1fr 1fr; gap: 38px 16px; }.journey__steps::before { display: none; }\n  .faq { gap: 35px; }.faq__intro h2 { font-size: 36px; }.final-cta { width: calc(100% - 28px); margin-bottom: 60px; padding: 62px 18px; }.final-cta .button { width: 100%; }\n  .footer__inner { flex-wrap: wrap; }.footer p { flex: 1; }.footer nav { order: 3; flex-basis: 100%; justify-content: space-between; }.footer small { margin-left: auto; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LandingComponent, [{
        type: Component,
        args: [{ selector: 'eduops-landing', standalone: true, imports: [CommonModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: "<a class=\"skip-link\" href=\"#main-content\">Aller au contenu</a>\n\n<div class=\"landing\">\n  <header class=\"nav\" [class.nav--open]=\"menuOpen()\">\n    <div class=\"nav__inner\">\n      <a class=\"brand\" routerLink=\"/\" aria-label=\"Soocloo, accueil\" (click)=\"closeMenu()\">\n        <img class=\"soocloo-logo\" src=\"assets/branding/soocloo-logo.png\" alt=\"Soocloo\" width=\"160\" height=\"60\">\n      </a>\n\n      <button class=\"nav__toggle\" type=\"button\" aria-label=\"Ouvrir le menu\"\n              [attr.aria-expanded]=\"menuOpen()\" (click)=\"toggleMenu()\">\n        <span></span><span></span><span></span>\n      </button>\n\n      <nav class=\"nav__links\" aria-label=\"Navigation principale\">\n        <button type=\"button\" (click)=\"scrollTo('solutions')\">Solutions</button>\n        <button type=\"button\" (click)=\"scrollTo('adaptation')\">Param\u00E9trage</button>\n        <button type=\"button\" (click)=\"scrollTo('parcours')\">La d\u00E9mo</button>\n        <a routerLink=\"/roadmap\" (click)=\"closeMenu()\">Roadmap \u2014 Guide</a>\n        <button type=\"button\" (click)=\"scrollTo('faq')\">Questions</button>\n      </nav>\n\n      <div class=\"nav__actions\">\n        @if (isAuthenticated()) {\n          <a class=\"nav__login\" routerLink=\"/dashboard\">Mon espace</a>\n        } @else {\n          <a class=\"nav__login\" routerLink=\"/login\">Se connecter</a>\n          <!--\n            Deux intentions diff\u00E9rentes, deux portes. \u00AB Composer ma d\u00E9mo \u00BB\n            s'adresse \u00E0 qui veut voir avant de d\u00E9cider ; celui qui sait d\u00E9j\u00E0 ce\n            qu'il veut ne doit pas \u00EAtre oblig\u00E9 de traverser la d\u00E9mo pour ouvrir\n            un compte.\n          -->\n          <a class=\"nav__login\" routerLink=\"/signup\" (click)=\"closeMenu()\">\n            Cr\u00E9er mon espace\n          </a>\n        }\n        <a class=\"button button--small\" routerLink=\"/commencer\" (click)=\"closeMenu(); prepareDemo()\">\n          Composer ma d\u00E9mo\n          <span aria-hidden=\"true\">\u2192</span>\n        </a>\n      </div>\n    </div>\n  </header>\n\n  <main id=\"main-content\">\n    <section class=\"hero\">\n      <div class=\"hero__glow hero__glow--one\" aria-hidden=\"true\"></div>\n      <div class=\"hero__glow hero__glow--two\" aria-hidden=\"true\"></div>\n      <div class=\"hero__inner\">\n        <div class=\"hero__copy\">\n          <p class=\"eyebrow\"><span></span> Pens\u00E9 pour les \u00E9coles qui ont leur propre fa\u00E7on de faire</p>\n          <h1>Simplifiez l\u2019\u00E9cole.<br><em>Multipliez les r\u00E9ussites.</em></h1>\n          <p class=\"hero__lead\">\n            Configurez vos cycles, classes, bulletins, frais et acc\u00E8s dans un seul espace.\n            Commencez par une \u00E9cole t\u00E9moin qui ressemble d\u00E9j\u00E0 \u00E0 la v\u00F4tre.\n          </p>\n\n          <div class=\"hero__actions\">\n            <a class=\"button button--primary button--large\" routerLink=\"/commencer\" (click)=\"prepareDemo()\">\n              Composer ma d\u00E9mo <span aria-hidden=\"true\">\u2192</span>\n            </a>\n            <button class=\"button button--quiet button--large\" type=\"button\"\n                    (click)=\"scrollTo('adaptation')\">\n              <span class=\"play\" aria-hidden=\"true\">\u25B6</span> Voir comment \u00E7a s\u2019adapte\n            </button>\n          </div>\n\n          <ul class=\"assurances\" aria-label=\"Conditions de la d\u00E9monstration\">\n            <li><span aria-hidden=\"true\">\u2713</span> Sans carte bancaire</li>\n            <li><span aria-hidden=\"true\">\u2713</span> Sans installation</li>\n            <li><span aria-hidden=\"true\">\u2713</span> Donn\u00E9es fictives uniquement</li>\n            <li><span aria-hidden=\"true\">\u2713</span> Essai gratuit avant tout paiement</li>\n          </ul>\n        </div>\n\n        <div class=\"hero__experience\" aria-label=\"Aper\u00E7u interactif d\u2019un espace Soocloo\">\n          <div class=\"profile-picker\" role=\"group\" aria-label=\"Type d\u2019\u00E9tablissement \u00E0 pr\u00E9visualiser\">\n            @for (preview of previews; track preview.id) {\n              <button type=\"button\" [class.profile-picker__item--active]=\"activePreviewId() === preview.id\"\n                      [attr.aria-pressed]=\"activePreviewId() === preview.id\"\n                      (click)=\"selectPreview(preview.id)\">\n                {{ preview.shortLabel }}\n              </button>\n            }\n          </div>\n\n          <div class=\"console\">\n            <div class=\"console__bar\">\n              <div class=\"console__dots\" aria-hidden=\"true\"><i></i><i></i><i></i></div>\n              <div class=\"console__address\">www.soocloo.com / direction</div>\n              <span class=\"console__live\"><i></i> D\u00E9mo</span>\n            </div>\n\n            <div class=\"console__body\">\n              <aside class=\"console__side\" aria-hidden=\"true\">\n                <span class=\"console__mini-logo\">E</span>\n                <i class=\"side-line side-line--active\"></i>\n                <i class=\"side-line\"></i><i class=\"side-line\"></i><i class=\"side-line\"></i>\n                <i class=\"side-line side-line--short\"></i>\n              </aside>\n\n              <div class=\"console__main\">\n                <div class=\"console__heading\">\n                  <div>\n                    <small>\u00C9cole t\u00E9moin</small>\n                    <h2>{{ activePreview().label }}</h2>\n                    <p>{{ activePreview().context }}</p>\n                  </div>\n                  <span class=\"status\"><i></i> Configuration pr\u00EAte</span>\n                </div>\n\n                <div class=\"metrics\">\n                  <article>\n                    <span class=\"metric__icon metric__icon--blue\" aria-hidden=\"true\">\u2197</span>\n                    <small>\u00C9l\u00E8ves</small>\n                    <strong>{{ activePreview().students }}</strong>\n                    <em>Donn\u00E9es fictives</em>\n                  </article>\n                  <article>\n                    <span class=\"metric__icon metric__icon--green\" aria-hidden=\"true\">\u2713</span>\n                    <small>Pr\u00E9sence</small>\n                    <strong>{{ activePreview().attendance }}</strong>\n                    <em>Aujourd\u2019hui</em>\n                  </article>\n                  <article>\n                    <span class=\"metric__icon metric__icon--gold\" aria-hidden=\"true\">\u25C7</span>\n                    <small>Recouvrement</small>\n                    <strong>{{ activePreview().collection }}</strong>\n                    <em>Ann\u00E9e en cours</em>\n                  </article>\n                </div>\n\n                <div class=\"console__lower\">\n                  <article class=\"pulse-card\">\n                    <div class=\"card-heading\">\n                      <div><small>Activit\u00E9</small><strong>Le rythme de l\u2019\u00E9cole</strong></div>\n                      <span>7 jours</span>\n                    </div>\n                    <div class=\"bars\" aria-hidden=\"true\">\n                      <i style=\"--h: 36%\"></i><i style=\"--h: 58%\"></i><i style=\"--h: 48%\"></i>\n                      <i style=\"--h: 76%\"></i><i style=\"--h: 66%\"></i><i style=\"--h: 88%\"></i>\n                      <i class=\"bars__today\" style=\"--h: 70%\"></i>\n                    </div>\n                    <div class=\"days\" aria-hidden=\"true\"><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>Auj.</span></div>\n                  </article>\n\n                  <article class=\"priority-card\">\n                    <small>Priorit\u00E9 configur\u00E9e</small>\n                    <strong>{{ activePreview().focus }}</strong>\n                    <div class=\"priority-card__chips\">\n                      @for (cycle of activePreview().cycles; track cycle) { <span>{{ cycle }}</span> }\n                    </div>\n                    <p><i aria-hidden=\"true\">!</i> {{ activePreview().alert }}</p>\n                  </article>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"floating-event floating-event--payment\">\n            <span class=\"event-icon\" aria-hidden=\"true\">\u2713</span>\n            <div><small>Paiement rapproch\u00E9</small><strong>Re\u00E7u g\u00E9n\u00E9r\u00E9 automatiquement</strong></div>\n          </div>\n          <div class=\"floating-event floating-event--family\">\n            <span class=\"event-icon event-icon--violet\" aria-hidden=\"true\">\u2197</span>\n            <div><small>Portail parent</small><strong>Information disponible</strong></div>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"role-strip\" aria-label=\"Une plateforme pour toute la communaut\u00E9\">\n      <p>Une m\u00EAme v\u00E9rit\u00E9, adapt\u00E9e \u00E0 chaque r\u00F4le</p>\n      <div>\n        <span><i class=\"role-dot role-dot--blue\"></i> Direction <b>Piloter</b></span>\n        <span><i class=\"role-dot role-dot--green\"></i> Enseignants <b>Agir</b></span>\n        <span><i class=\"role-dot role-dot--purple\"></i> Parents <b>Suivre</b></span>\n        <span><i class=\"role-dot role-dot--gold\"></i> \u00C9l\u00E8ves <b>Progresser</b></span>\n      </div>\n    </section>\n\n    <section class=\"section challenges\" id=\"solutions\">\n      <div class=\"section__heading\">\n        <p class=\"section-kicker\">Commencer par le vrai probl\u00E8me</p>\n        <h2>Quel sujet voulez-vous<br><em>r\u00E9soudre en premier ?</em></h2>\n        <p>Soocloo ne vous impose pas un ordre. Votre d\u00E9monstration met d\u2019abord en sc\u00E8ne ce qui compte maintenant pour votre \u00E9quipe.</p>\n      </div>\n      <div class=\"challenge-grid\">\n        @for (challenge of challenges; track challenge.index) {\n          <button type=\"button\" class=\"challenge-card\"\n                  [class.challenge-card--selected]=\"selectedChallenge() === challenge.index\"\n                  [attr.aria-pressed]=\"selectedChallenge() === challenge.index\"\n                  (click)=\"chooseChallenge(challenge)\">\n            <span class=\"challenge-card__index\">{{ challenge.index }}</span>\n            <h3>{{ challenge.title }}</h3>\n            <p>{{ challenge.text }}</p>\n            <div><span aria-hidden=\"true\">\u21B3</span> {{ challenge.result }}</div>\n          </button>\n        }\n      </div>\n    </section>\n\n    <section class=\"section adaptation\" id=\"adaptation\">\n      <div class=\"adaptation__copy\">\n        <p class=\"section-kicker\">Un logiciel qui parle votre langage</p>\n        <h2>Vos r\u00E8gles ne sont pas des exceptions.<br><em>Elles deviennent des param\u00E8tres.</em></h2>\n        <p>\n          Une \u00E9cole primaire, un lyc\u00E9e et un groupe multi-campus n\u2019ont ni les m\u00EAmes rythmes,\n          ni les m\u00EAmes contr\u00F4les. Votre espace part de vos d\u00E9cisions, pas d\u2019un mod\u00E8le fig\u00E9.\n        </p>\n        <ul>\n          <li><span>01</span><div><strong>Choisissez une base</strong><small>Un profil proche de votre organisation, jamais une page blanche.</small></div></li>\n          <li><span>02</span><div><strong>Ajustez ce qui compte</strong><small>Cycles, p\u00E9riodes, capacit\u00E9s, bar\u00E8mes, finance et acc\u00E8s.</small></div></li>\n          <li><span>03</span><div><strong>Faites \u00E9voluer sans recommencer</strong><small>Les r\u00E9glages suivent vos ann\u00E9es scolaires et vos campus.</small></div></li>\n        </ul>\n        <a class=\"text-link\" routerLink=\"/commencer\" (click)=\"prepareDemo()\">Configurer mon \u00E9cole t\u00E9moin <span>\u2192</span></a>\n      </div>\n\n      <div class=\"rule-board\" aria-label=\"Exemple de param\u00E8tres Soocloo\">\n        <div class=\"rule-board__top\">\n          <div><small>PROFIL ACTIF</small><strong>Groupe Scolaire Horizon</strong></div>\n          <span><i></i> Brouillon sauvegard\u00E9</span>\n        </div>\n        <div class=\"rule-board__grid\">\n          @for (rule of ruleGroups; track rule.label) {\n            <article [class]=\"'rule rule--' + rule.tone\">\n              <span class=\"rule__mark\" aria-hidden=\"true\"></span>\n              <small>{{ rule.label }}</small>\n              <strong>{{ rule.value }}</strong>\n              <p>{{ rule.detail }}</p>\n              <i class=\"toggle\" aria-hidden=\"true\"><span></span></i>\n            </article>\n          }\n        </div>\n        <div class=\"rule-board__footer\">\n          <span>7 modules s\u00E9lectionn\u00E9s</span>\n          <div><i></i><i></i><i></i><b>+4</b></div>\n          <button type=\"button\" (click)=\"scrollTo('parcours')\">Voir le parcours</button>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"integrity\">\n      <div class=\"integrity__inner\">\n        <div class=\"integrity__title\">\n          <p class=\"section-kicker section-kicker--light\">La confiance est aussi une fonctionnalit\u00E9</p>\n          <h2>Le syst\u00E8me prot\u00E8ge les r\u00E8gles<br>m\u00EAme quand personne ne regarde.</h2>\n        </div>\n        <div class=\"guard-grid\">\n          <article>\n            <span class=\"guard-icon\">40<span>/40</span></span>\n            <div><small>CAPACIT\u00C9 ATTEINTE</small><h3>Le 41e \u00E9l\u00E8ve est signal\u00E9</h3><p>Une d\u00E9rogation exige un motif : l\u2019exception reste visible.</p></div>\n          </article>\n          <article>\n            <span class=\"guard-icon\">24<span>/20</span></span>\n            <div><small>BAR\u00C8ME D\u00C9PASS\u00C9</small><h3>La note incoh\u00E9rente est bloqu\u00E9e</h3><p>Le contr\u00F4le vient de la r\u00E8gle d\u00E9finie par votre \u00E9cole.</p></div>\n          </article>\n          <article>\n            <span class=\"guard-icon\">\u2713<span>re\u00E7u</span></span>\n            <div><small>PAIEMENT VALID\u00C9</small><h3>L\u2019historique ne dispara\u00EEt pas</h3><p>Une correction se trace, elle ne r\u00E9\u00E9crit pas le pass\u00E9.</p></div>\n          </article>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"section journey\" id=\"parcours\">\n      <div class=\"section__heading section__heading--center\">\n        <p class=\"section-kicker\">Votre \u00E9cole t\u00E9moin, \u00E9tape par \u00E9tape</p>\n        <h2>Quelques choix. Puis un espace<br><em>qui raconte d\u00E9j\u00E0 votre quotidien.</em></h2>\n        <p>Le brouillon reste sur cet appareil jusqu\u2019\u00E0 la cr\u00E9ation de votre compte.</p>\n      </div>\n\n      <ol class=\"journey__steps\">\n        <li><span>1</span><div class=\"journey__icon\">\u2302</div><h3>Votre profil</h3><p>Type d\u2019\u00E9cole, taille, campus et contexte.</p></li>\n        <li><span>2</span><div class=\"journey__icon\">\u25C7</div><h3>Vos priorit\u00E9s</h3><p>Les modules qui doivent prendre vie en premier.</p></li>\n        <li><span>3</span><div class=\"journey__icon\">\u2261</div><h3>Vos r\u00E8gles</h3><p>P\u00E9riodes, bar\u00E8me, capacit\u00E9 et paiements.</p></li>\n        <li><span>4</span><div class=\"journey__icon\">\u2197</div><h3>Votre espace</h3><p>Un compte administrateur et votre feuille de route.</p></li>\n      </ol>\n\n      <div class=\"journey__action\">\n        <a class=\"button button--primary button--large\" routerLink=\"/commencer\" (click)=\"prepareDemo()\">\n          Commencer la configuration <span aria-hidden=\"true\">\u2192</span>\n        </a>\n        <small>Vous pourrez revenir sur chaque choix.</small>\n      </div>\n    </section>\n\n    <section class=\"section faq\" id=\"faq\">\n      <div class=\"faq__intro\">\n        <p class=\"section-kicker\">Questions fr\u00E9quentes</p>\n        <h2>Avant de<br><em>vous lancer.</em></h2>\n        <p>Une question plus pr\u00E9cise sur votre \u00E9tablissement ? La d\u00E9mo vous permet d\u00E9j\u00E0 de tester vos principaux r\u00E9glages.</p>\n        <a class=\"text-link\" routerLink=\"/commencer\" (click)=\"prepareDemo()\">Essayer avec mon profil <span>\u2192</span></a>\n      </div>\n      <div class=\"faq__list\">\n        @for (item of faq(); track item.question; let index = $index) {\n          <article class=\"faq-item\" [class.faq-item--open]=\"item.open\">\n            <button type=\"button\" [attr.aria-expanded]=\"item.open\" (click)=\"toggleFaq(index)\">\n              <span>{{ item.question }}</span><i aria-hidden=\"true\"></i>\n            </button>\n            @if (item.open) { <p>{{ item.answer }}</p> }\n          </article>\n        }\n      </div>\n    </section>\n\n    <section class=\"final-cta\">\n      <div class=\"final-cta__orbit final-cta__orbit--one\" aria-hidden=\"true\"></div>\n      <div class=\"final-cta__orbit final-cta__orbit--two\" aria-hidden=\"true\"></div>\n      <p>La meilleure d\u00E9mo n\u2019est pas la n\u00F4tre.</p>\n      <h2>C\u2019est celle qui ressemble<br><em>\u00E0 votre \u00E9cole.</em></h2>\n      <a class=\"button button--light button--large\" routerLink=\"/commencer\" (click)=\"prepareDemo()\">\n        Composer mon \u00E9cole t\u00E9moin <span aria-hidden=\"true\">\u2192</span>\n      </a>\n      <small>Configuration guid\u00E9e \u00B7 Sans carte bancaire \u00B7 Donn\u00E9es fictives</small>\n    </section>\n  </main>\n\n  <footer class=\"footer\">\n    <div class=\"footer__inner\">\n      <a class=\"brand brand--footer\" routerLink=\"/\">\n        <img class=\"soocloo-logo\" src=\"assets/branding/soocloo-logo.png\" alt=\"Soocloo\" width=\"160\" height=\"60\" loading=\"lazy\">\n      </a>\n      <p>Simplifiez l\u2019\u00E9cole. Multipliez les r\u00E9ussites.</p>\n      <nav aria-label=\"Liens de pied de page\">\n        <a routerLink=\"/login\">Connexion</a>\n        <a routerLink=\"/signup\">Cr\u00E9er mon espace</a>\n        <a routerLink=\"/commencer\" (click)=\"prepareDemo()\">Cr\u00E9er une d\u00E9mo</a>\n        <button type=\"button\" (click)=\"scrollTo('faq')\">Questions</button>\n      </nav>\n      <small>\u00A9 {{ currentYear }} Soocloo \u00B7 www.soocloo.com</small>\n    </div>\n  </footer>\n</div>\n", styles: ["@import 'styles/tokens';\n\n:host {\n  --navy: #0f1f3d;\n  --deep: #153f91;\n  --lagoon: #0b8a7d;\n  --lagoon-dark: #087267;\n  --sun: #e9aa38;\n  --paper: #fbfcf8;\n  display: block;\n}\n\n.landing { min-height: 100vh; overflow: hidden; background: #fff; color: var(--text-normal); }\n.button {\n  min-height: 46px; display: inline-flex; align-items: center; justify-content: center; gap: 10px;\n  padding: 0 20px; border: 1px solid transparent; border-radius: 12px; font: 700 14px/1 var(--font-body);\n  cursor: pointer; text-decoration: none; transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;\n}\n.button:hover { transform: translateY(-1px); text-decoration: none; }\n.button--small { min-height: 40px; padding: 0 16px; background: var(--brand); color: #fff; border-radius: 10px; }\n.button--small:hover, .button--primary:hover { background: var(--brand-hover); color: #fff; }\n.button--primary { background: var(--brand); color: #fff; box-shadow: 0 12px 26px rgba(31, 95, 214, .22); }\n.button--large { min-height: 52px; padding: 0 23px; font-size: 15px; }\n.button--quiet { color: var(--navy); background: rgba(255,255,255,.82); border-color: #dce4f0; }\n.button--quiet:hover { color: var(--brand); background: #fff; }\n.button--light { color: var(--deep); background: #fff; box-shadow: 0 15px 30px rgba(5, 24, 56, .2); }\n.play { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; background: var(--brand-tint); color: var(--brand); font-size: 9px; }\n\n.nav { position: fixed; inset: 0 0 auto; z-index: var(--z-topbar); height: 72px; background: rgba(255,255,255,.9); border-bottom: 1px solid rgba(219,227,239,.8); backdrop-filter: blur(16px); }\n.nav__inner { height: 100%; width: min(1180px, calc(100% - 40px)); margin: auto; display: flex; align-items: center; gap: 36px; }\n.brand { display: inline-flex; align-items: center; gap: 10px; color: var(--navy); font: 800 19px/1 var(--font-display); text-decoration: none; }\n.brand:hover { color: var(--navy); text-decoration: none; }\n.brand__mark { width: 34px; height: 34px; display: flex; align-items: end; justify-content: center; gap: 3px; padding: 8px; border-radius: 11px 11px 11px 4px; background: linear-gradient(145deg, var(--brand), #124498); box-shadow: 0 7px 15px rgba(31,95,214,.2); }\n.brand__mark span { width: 4px; border-radius: 3px; background: #fff; }\n.brand__mark span:nth-child(1) { height: 9px; opacity: .7; }\n.brand__mark span:nth-child(2) { height: 16px; }\n.brand__mark span:nth-child(3) { height: 12px; opacity: .85; }\n.nav__links { display: flex; align-items: center; gap: 28px; margin-left: auto; }\n.nav__links button, .nav__links a, .footer button { border: 0; padding: 0; background: none; color: #59677f; font: 600 13px/1 var(--font-body); cursor: pointer; }\n.nav__links a { text-decoration: none; white-space: nowrap; }\n.nav__links button:hover, .nav__links a:hover { color: var(--brand); }\n.nav__actions { display: flex; align-items: center; gap: 18px; }\n.nav__login { color: #4e5c74; font-size: 13px; font-weight: 600; }\n.nav__toggle { display: none; width: 42px; height: 42px; border: 0; border-radius: 10px; background: var(--surface-sunken); padding: 11px; }\n.nav__toggle span { display: block; height: 2px; margin: 4px 0; background: var(--navy); border-radius: 2px; }\n\n.hero { position: relative; min-height: 750px; padding: 148px 0 80px; background-color: var(--paper); background-image: linear-gradient(rgba(31,95,214,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(31,95,214,.035) 1px, transparent 1px); background-size: 42px 42px; }\n.hero::after { content: ''; position: absolute; inset: auto 0 0; height: 130px; background: linear-gradient(transparent, rgba(255,255,255,.82)); pointer-events: none; }\n.hero__inner { position: relative; z-index: 2; width: min(1180px, calc(100% - 40px)); margin: auto; display: grid; grid-template-columns: .92fr 1.08fr; gap: 55px; align-items: center; }\n.hero__copy { padding-bottom: 10px; }\n.eyebrow, .section-kicker { display: flex; align-items: center; gap: 9px; margin: 0 0 20px; color: var(--brand); font-size: 11px; font-weight: 800; letter-spacing: .07em; text-transform: uppercase; }\n.eyebrow span { width: 20px; height: 20px; border: 1px solid #bcd4fa; border-radius: 50%; background: radial-gradient(circle, var(--brand) 0 3px, transparent 4px); }\n.hero h1 { max-width: 610px; color: var(--navy); font-size: clamp(42px, 4.4vw, 67px); line-height: 1.01; letter-spacing: -.055em; }\n.hero h1 em, .section h2 em, .final-cta h2 em { color: var(--brand); font-style: normal; }\n.hero__lead { max-width: 580px; margin: 25px 0 28px; color: #627089; font-size: 17px; line-height: 1.7; }\n.hero__actions { display: flex; flex-wrap: wrap; gap: 12px; }\n/* Tarif d'entr\u00E9e : lisible d'un coup d'\u0153il, sans crier plus fort que le titre. */\n.price {\n  display: inline-flex;\n  align-items: baseline;\n  flex-wrap: wrap;\n  gap: 7px;\n  margin: 22px 0 0;\n  padding: 9px 16px;\n  background: #fff;\n  border: 1px solid #e3e8f0;\n  border-radius: 999px;\n  box-shadow: 0 1px 2px rgba(16, 24, 40, .04);\n}\n.price__label { font-size: 12px; color: #77839a; }\n.price__amount { font-size: 19px; font-weight: 800; color: var(--navy); letter-spacing: -.01em; }\n.price__period { font-size: 12px; color: #77839a; }\n.price__note { font-size: 11px; color: #98a2b3; }\n\n.assurances { display: flex; flex-wrap: wrap; gap: 10px 18px; margin: 22px 0 0; padding: 0; list-style: none; color: #77839a; font-size: 11px; }\n.assurances span { color: var(--lagoon); font-weight: 800; }\n.hero__glow { position: absolute; border-radius: 50%; filter: blur(1px); pointer-events: none; }\n.hero__glow--one { width: 380px; height: 380px; right: 2%; top: 15%; background: rgba(31,95,214,.07); }\n.hero__glow--two { width: 190px; height: 190px; left: 38%; bottom: 5%; background: rgba(11,138,125,.06); }\n\n.hero__experience { position: relative; padding-top: 54px; }\n.profile-picker { position: absolute; z-index: 4; top: 0; left: 50%; display: flex; gap: 4px; padding: 5px; border: 1px solid #dfe7f1; border-radius: 12px; background: rgba(255,255,255,.94); box-shadow: var(--shadow-md); transform: translateX(-50%); }\n.profile-picker button { min-height: 34px; padding: 0 13px; border: 0; border-radius: 8px; background: transparent; color: #7a879c; font: 700 11px var(--font-body); white-space: nowrap; cursor: pointer; }\n.profile-picker .profile-picker__item--active { background: var(--navy); color: #fff; }\n.console { overflow: hidden; border: 1px solid #dbe4f0; border-radius: 20px; background: #fff; box-shadow: 0 30px 65px rgba(32,54,88,.16), 0 4px 12px rgba(32,54,88,.07); transform: perspective(1400px) rotateY(-1.6deg) rotateX(1deg); }\n.console__bar { height: 38px; display: flex; align-items: center; gap: 12px; padding: 0 14px; background: #f7f9fc; border-bottom: 1px solid #e7ecf3; }\n.console__dots { display: flex; gap: 5px; }\n.console__dots i { width: 7px; height: 7px; border-radius: 50%; background: #ff7a63; }\n.console__dots i:nth-child(2) { background: #f4bc49; }\n.console__dots i:nth-child(3) { background: #4fc68b; }\n.console__address { flex: 1; max-width: 230px; margin: auto; padding: 5px 10px; border: 1px solid #e1e7ef; border-radius: 7px; background: #fff; color: #91a0b6; font-size: 8px; text-align: center; }\n.console__live { display: flex; align-items: center; gap: 5px; color: #758399; font-size: 8px; font-weight: 700; }\n.console__live i, .status i, .rule-board__top span i { width: 6px; height: 6px; border-radius: 50%; background: #20b779; box-shadow: 0 0 0 3px rgba(32,183,121,.12); }\n.console__body { min-height: 374px; display: grid; grid-template-columns: 50px 1fr; }\n.console__side { display: flex; flex-direction: column; align-items: center; gap: 19px; padding: 16px 10px; background: var(--navy); }\n.console__mini-logo { width: 25px; height: 25px; display: grid; place-items: center; margin-bottom: 5px; border-radius: 7px; background: var(--brand); color: #fff; font: 800 10px var(--font-display); }\n.side-line { width: 20px; height: 5px; border-radius: 5px; background: rgba(255,255,255,.18); }\n.side-line--active { height: 20px; background: rgba(87,144,248,.6); }\n.side-line--short { width: 13px; margin-top: auto; }\n.console__main { min-width: 0; padding: 22px; background: #f6f8fc; }\n.console__heading { display: flex; align-items: start; justify-content: space-between; gap: 12px; }\n.console__heading small, .metrics small, .priority-card small, .pulse-card small { display: block; color: #8d99ad; font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; }\n.console__heading h2 { margin: 4px 0 2px; color: var(--navy); font-size: 17px; }\n.console__heading p { margin: 0; color: #8390a4; font-size: 9px; }\n.status { display: flex; align-items: center; gap: 6px; padding: 6px 9px; border: 1px solid #ccebdc; border-radius: 20px; background: #f0fbf5; color: #26835c; font-size: 8px; font-weight: 700; }\n.metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 17px; }\n.metrics article { position: relative; padding: 12px 10px 10px 38px; border: 1px solid #e5eaf2; border-radius: 11px; background: #fff; }\n.metrics strong { display: block; margin: 2px 0; color: var(--navy); font: 800 19px var(--font-display); }\n.metrics em { color: #9aa5b6; font-size: 7px; font-style: normal; }\n.metric__icon { position: absolute; left: 10px; top: 13px; width: 20px; height: 20px; display: grid; place-items: center; border-radius: 7px; font-size: 9px; font-weight: 800; }\n.metric__icon--blue { background: #eaf1fe; color: var(--brand); }\n.metric__icon--green { background: #e7f7f0; color: var(--lagoon); }\n.metric__icon--gold { background: #fff4df; color: #c98513; }\n.console__lower { display: grid; grid-template-columns: 1.25fr .75fr; gap: 10px; margin-top: 10px; }\n.pulse-card, .priority-card { min-height: 139px; padding: 13px; border: 1px solid #e5eaf2; border-radius: 11px; background: #fff; }\n.card-heading { display: flex; justify-content: space-between; align-items: start; }\n.card-heading strong { display: block; margin-top: 3px; color: var(--navy); font-size: 10px; }\n.card-heading > span { padding: 4px 6px; border-radius: 5px; background: #f2f5f9; color: #8693a7; font-size: 7px; }\n.bars { height: 63px; display: flex; align-items: end; gap: 7px; padding-top: 13px; border-bottom: 1px solid #edf0f5; }\n.bars i { flex: 1; height: var(--h); min-height: 7px; border-radius: 4px 4px 0 0; background: #cbdafa; }\n.bars .bars__today { background: linear-gradient(var(--brand), #6d9af0); }\n.days { display: flex; justify-content: space-between; padding-top: 5px; color: #a2adbd; font-size: 6px; }\n.priority-card strong { display: block; min-height: 29px; margin-top: 5px; color: var(--navy); font-size: 11px; line-height: 1.3; }\n.priority-card__chips { display: flex; flex-wrap: wrap; gap: 4px; margin: 8px 0; }\n.priority-card__chips span { padding: 4px 6px; border-radius: 12px; background: var(--brand-tint); color: var(--brand); font-size: 7px; font-weight: 700; }\n.priority-card p { display: flex; align-items: center; gap: 5px; margin: 7px 0 0; color: #68768c; font-size: 7px; }\n.priority-card p i { width: 14px; height: 14px; display: grid; place-items: center; border-radius: 50%; background: #fff1df; color: #c87b0b; font-size: 8px; font-style: normal; font-weight: 800; }\n.floating-event { position: absolute; z-index: 5; display: flex; align-items: center; gap: 9px; padding: 10px 13px; border: 1px solid #dfe7f1; border-radius: 12px; background: rgba(255,255,255,.96); box-shadow: 0 16px 30px rgba(27,48,81,.14); }\n.floating-event--payment { left: -33px; bottom: 61px; }\n.floating-event--family { right: -30px; top: 131px; }\n.floating-event small { display: block; color: #929db0; font-size: 7px; }\n.floating-event strong { display: block; margin-top: 2px; color: var(--navy); font-size: 8px; }\n.event-icon { width: 26px; height: 26px; display: grid; place-items: center; border-radius: 8px; background: #e8f7f0; color: var(--lagoon); font-size: 11px; font-weight: 800; }\n.event-icon--violet { background: #f0ebfd; color: #7755ce; }\n\n.role-strip { position: relative; z-index: 3; width: min(1060px, calc(100% - 40px)); display: flex; align-items: center; justify-content: space-between; gap: 25px; margin: -28px auto 0; padding: 20px 26px; border: 1px solid #e3e9f1; border-radius: 16px; background: #fff; box-shadow: var(--shadow-md); }\n.role-strip > p { margin: 0; color: #8a96a9; font-size: 10px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; }\n.role-strip > div { display: flex; gap: 26px; }\n.role-strip span { display: grid; grid-template-columns: auto auto; gap: 0 7px; color: var(--navy); font-size: 11px; font-weight: 700; }\n.role-strip b { grid-column: 2; color: #97a2b3; font-size: 8px; font-weight: 600; }\n.role-dot { grid-row: span 2; align-self: center; width: 8px; height: 8px; border-radius: 3px; background: var(--brand); }\n.role-dot--green { background: var(--lagoon); }.role-dot--purple { background: #7657ca; }.role-dot--gold { background: var(--sun); }\n\n.section { width: min(1120px, calc(100% - 40px)); margin: auto; padding: 112px 0; }\n.section__heading { max-width: 650px; }\n.section h2 { color: var(--navy); font-size: clamp(32px, 4vw, 48px); letter-spacing: -.04em; }\n.section__heading > p:last-child, .adaptation__copy > p { margin-top: 20px; color: #718096; line-height: 1.7; }\n.challenges { display: grid; grid-template-columns: .75fr 1.25fr; gap: 70px; align-items: start; }\n.challenge-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }\n.challenge-card { min-height: 235px; padding: 24px; border: 1px solid #e4e9f1; border-radius: 17px; background: #fff; color: inherit; font-family: var(--font-body); text-align: left; cursor: pointer; transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease; }\n.challenge-card:hover { transform: translateY(-4px); border-color: #cbdcf7; box-shadow: var(--shadow-md); }\n.challenge-card--selected { border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-tint); }\n.challenge-card__index { display: inline-grid; place-items: center; width: 30px; height: 30px; border-radius: 9px; background: var(--brand-tint); color: var(--brand); font: 800 10px var(--font-display); }\n.challenge-card h3 { margin: 27px 0 11px; color: var(--navy); font-size: 16px; line-height: 1.35; }\n.challenge-card p { min-height: 57px; color: #77859a; font-size: 12px; line-height: 1.6; }\n.challenge-card > div { display: flex; gap: 7px; color: var(--lagoon-dark); font-size: 10px; font-weight: 700; }\n\n.adaptation { width: 100%; max-width: none; display: grid; grid-template-columns: minmax(0, 510px) minmax(0, 570px); justify-content: center; gap: 80px; padding-inline: 30px; background: #f7f9fc; }\n.adaptation__copy ul { display: grid; gap: 17px; margin: 30px 0 25px; padding: 0; list-style: none; }\n.adaptation__copy li { display: flex; align-items: start; gap: 14px; }\n.adaptation__copy li > span { flex: 0 0 29px; height: 29px; display: grid; place-items: center; border-radius: 9px; background: #fff; border: 1px solid #dfe7f1; color: var(--brand); font-size: 9px; font-weight: 800; }\n.adaptation__copy li strong, .adaptation__copy li small { display: block; }\n.adaptation__copy li strong { color: var(--navy); font-size: 13px; }\n.adaptation__copy li small { margin-top: 3px; color: #8290a4; font-size: 11px; line-height: 1.45; }\n.text-link { display: inline-flex; align-items: center; gap: 9px; color: var(--brand); font-size: 13px; font-weight: 800; }\n.text-link:hover { text-decoration: none; }.text-link span { transition: transform 180ms ease; }.text-link:hover span { transform: translateX(4px); }\n.rule-board { align-self: center; overflow: hidden; border: 1px solid #dfe6ef; border-radius: 22px; background: #fff; box-shadow: 0 24px 55px rgba(40,61,93,.12); }\n.rule-board__top { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding: 20px 22px; border-bottom: 1px solid #e8edf3; }\n.rule-board__top small, .rule small { display: block; color: #9aa4b4; font-size: 8px; font-weight: 800; letter-spacing: .06em; }\n.rule-board__top strong { display: block; margin-top: 3px; color: var(--navy); font-size: 13px; }\n.rule-board__top span { display: flex; align-items: center; gap: 7px; color: #4a8b6c; font-size: 8px; font-weight: 700; }\n.rule-board__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; padding: 18px; background: #fafbfd; }\n.rule { position: relative; min-height: 150px; padding: 18px; overflow: hidden; border: 1px solid #e4e9f0; border-radius: 14px; background: #fff; }\n.rule::after { content: ''; position: absolute; right: -25px; top: -25px; width: 70px; height: 70px; border-radius: 50%; background: var(--rule-bg); }\n.rule__mark { display: block; width: 24px; height: 5px; margin-bottom: 18px; border-radius: 4px; background: var(--rule-color); }\n.rule strong { display: block; margin-top: 7px; color: var(--navy); font-size: 13px; }\n.rule p { margin: 4px 0 13px; color: #8490a2; font-size: 9px; }\n.rule--blue { --rule-color: var(--brand); --rule-bg: #eaf1fe; }.rule--green { --rule-color: var(--lagoon); --rule-bg: #e5f5f1; }\n.rule--gold { --rule-color: var(--sun); --rule-bg: #fff3db; }.rule--purple { --rule-color: #7657ca; --rule-bg: #f0ebfc; }\n.toggle { display: block; width: 27px; height: 15px; padding: 2px; border-radius: 10px; background: var(--rule-color); }\n.toggle span { display: block; width: 11px; height: 11px; margin-left: auto; border-radius: 50%; background: #fff; }\n.rule-board__footer { display: flex; align-items: center; gap: 12px; padding: 14px 20px; border-top: 1px solid #e8edf3; }\n.rule-board__footer > span { color: #7c899c; font-size: 9px; }.rule-board__footer > div { display: flex; margin-right: auto; }\n.rule-board__footer div i, .rule-board__footer div b { width: 22px; height: 22px; display: grid; place-items: center; margin-left: -5px; border: 2px solid #fff; border-radius: 50%; background: var(--brand-tint); }\n.rule-board__footer div i:nth-child(2) { background: #e5f5f1; }.rule-board__footer div i:nth-child(3) { background: #fff1db; }\n.rule-board__footer div b { background: var(--navy); color: #fff; font-size: 7px; }\n.rule-board__footer button { border: 0; background: none; color: var(--brand); font: 800 9px var(--font-body); cursor: pointer; }\n\n.integrity { padding: 90px 30px; background: var(--navy); }\n.integrity__inner { width: min(1120px, 100%); margin: auto; }\n.integrity__title { display: flex; align-items: end; justify-content: space-between; gap: 35px; margin-bottom: 42px; }\n.section-kicker--light { color: #7ca7f6; }.integrity h2 { max-width: 640px; color: #fff; font-size: clamp(30px, 3.6vw, 45px); }\n.guard-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }\n.guard-grid article { min-height: 205px; padding: 23px; border: 1px solid rgba(255,255,255,.11); border-radius: 16px; background: rgba(255,255,255,.045); }\n.guard-icon { width: 58px; height: 58px; display: grid; place-items: center; margin-bottom: 29px; border: 1px solid rgba(255,255,255,.16); border-radius: 15px; background: rgba(255,255,255,.07); color: #fff; font: 800 16px var(--font-display); }\n.guard-icon span { display: block; margin-top: -9px; color: #91a0b9; font-size: 7px; }.guard-grid small { color: #70a0f8; font-size: 8px; font-weight: 800; letter-spacing: .06em; }\n.guard-grid h3 { margin: 7px 0; color: #fff; font-size: 14px; }.guard-grid p { color: #9ba9bf; font-size: 11px; line-height: 1.55; }\n\n.section__heading--center { max-width: 750px; margin: 0 auto 55px; text-align: center; }\n.section__heading--center .section-kicker { justify-content: center; }\n.journey__steps { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; margin: 0; padding: 0; list-style: none; }\n.journey__steps::before { content: ''; position: absolute; left: 12.5%; right: 12.5%; top: 38px; border-top: 1px dashed #cbd5e2; }\n.journey__steps li { position: relative; text-align: center; }\n.journey__steps li > span { position: absolute; z-index: 2; left: calc(50% + 25px); top: -4px; width: 22px; height: 22px; display: grid; place-items: center; border-radius: 50%; background: var(--brand); color: #fff; font-size: 8px; font-weight: 800; }\n.journey__icon { position: relative; z-index: 1; width: 76px; height: 76px; display: grid; place-items: center; margin: 0 auto 19px; border: 1px solid #dce5f0; border-radius: 21px; background: #fff; color: var(--brand); font: 800 24px var(--font-display); box-shadow: var(--shadow-sm); }\n.journey__steps h3 { color: var(--navy); font-size: 14px; }.journey__steps p { max-width: 180px; margin: 8px auto 0; color: #7f8ca0; font-size: 10px; line-height: 1.5; }\n.journey__action { display: flex; flex-direction: column; align-items: center; gap: 11px; margin-top: 50px; }.journey__action small { color: #929daf; font-size: 9px; }\n\n.faq { display: grid; grid-template-columns: .7fr 1.3fr; gap: 85px; padding-top: 90px; }\n.faq__intro h2 { color: var(--navy); font-size: 44px; }.faq__intro > p:not(.section-kicker) { margin: 20px 0 23px; color: #7a879a; line-height: 1.65; }\n.faq__list { border-top: 1px solid #dde4ed; }\n.faq-item { border-bottom: 1px solid #dde4ed; }\n.faq-item button { width: 100%; min-height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 0; border: 0; background: transparent; color: var(--navy); font: 700 14px/1.4 var(--font-body); text-align: left; cursor: pointer; }\n.faq-item button i { position: relative; flex: 0 0 26px; height: 26px; border-radius: 50%; background: var(--surface-sunken); }\n.faq-item button i::before, .faq-item button i::after { content: ''; position: absolute; left: 8px; right: 8px; top: 12px; height: 2px; background: var(--brand); }\n.faq-item button i::after { transform: rotate(90deg); transition: transform 180ms ease; }.faq-item--open button i::after { transform: rotate(0); }\n.faq-item > p { padding: 0 45px 22px 0; color: #78869a; font-size: 12px; line-height: 1.65; }\n\n.final-cta { position: relative; overflow: hidden; width: min(1120px, calc(100% - 40px)); margin: 15px auto 90px; padding: 78px 30px; border-radius: 28px; background: linear-gradient(130deg, #164ca7, #1f5fd6 55%, #147f86); color: #fff; text-align: center; }\n.final-cta > *:not(.final-cta__orbit) { position: relative; z-index: 2; }.final-cta > p { margin: 0 0 9px; color: #c9dafb; font-size: 11px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; }\n.final-cta h2 { color: #fff; font-size: clamp(36px, 5vw, 55px); }.final-cta h2 em { color: #dff9f3; }\n.final-cta .button { margin-top: 27px; }.final-cta > small { display: block; margin-top: 16px; color: #c8d8f5; font-size: 9px; }\n.final-cta__orbit { position: absolute; border: 1px solid rgba(255,255,255,.14); border-radius: 50%; }.final-cta__orbit--one { width: 440px; height: 440px; left: -210px; top: -190px; }.final-cta__orbit--two { width: 520px; height: 520px; right: -230px; bottom: -280px; }\n\n.footer { padding: 28px 0; border-top: 1px solid #e4e9ef; background: #fff; }.footer__inner { width: min(1120px, calc(100% - 40px)); margin: auto; display: flex; align-items: center; gap: 25px; }\n.brand--footer { font-size: 16px; }.brand--footer .brand__mark { width: 29px; height: 29px; padding: 7px; }.footer p { margin: 0 auto 0 0; color: #8a96a8; font-size: 10px; }\n.footer nav { display: flex; gap: 20px; }.footer a:not(.brand), .footer button { color: #69768b; font-size: 10px; font-weight: 600; }.footer small { color: #a0a9b8; font-size: 9px; }\n\n@include tablet-down {\n  .nav__inner { gap: 20px; }.nav__links { gap: 16px; }.hero__inner { grid-template-columns: 1fr; max-width: 760px; text-align: center; }.hero__copy { display: flex; flex-direction: column; align-items: center; }\n  .hero__lead { max-width: 650px; }.hero__experience { width: min(640px, 100%); margin: 20px auto 0; text-align: left; }.hero { padding-top: 135px; }.floating-event--payment { left: -12px; }.floating-event--family { right: -12px; }\n  .role-strip { margin-top: 35px; flex-direction: column; }.challenges, .faq { grid-template-columns: 1fr; gap: 45px; }.section__heading { max-width: 720px; }.challenge-grid { grid-template-columns: repeat(2, 1fr); }\n  .adaptation { grid-template-columns: minmax(0, 510px); }.guard-grid { grid-template-columns: 1fr; }.guard-grid article { min-height: 0; display: flex; gap: 20px; }.guard-icon { flex: 0 0 58px; margin-bottom: 0; }\n}\n\n@include mobile {\n  .nav { height: 64px; }.nav__inner { width: calc(100% - 28px); }.nav__toggle { display: block; margin-left: auto; }.nav__links, .nav__actions { display: none; }\n  .nav--open { height: auto; }.nav--open .nav__inner { min-height: 64px; flex-wrap: wrap; padding-bottom: 16px; }.nav--open .nav__links, .nav--open .nav__actions { flex: 1 0 100%; display: flex; }\n  .nav--open .nav__links { align-items: stretch; flex-direction: column; gap: 0; }.nav--open .nav__links button, .nav--open .nav__links a { min-height: 42px; display: flex; align-items: center; text-align: left; border-bottom: 1px solid var(--border-light); }\n  .nav--open .nav__actions { justify-content: space-between; }.hero { min-height: 0; padding: 112px 0 65px; }.hero__inner { width: calc(100% - 28px); gap: 32px; }.eyebrow { max-width: 310px; font-size: 9px; line-height: 1.4; }\n  .hero h1 { font-size: 41px; }.hero__lead { margin: 20px 0 24px; font-size: 15px; }.hero__actions { width: 100%; }.hero__actions .button { width: 100%; }.assurances { justify-content: center; gap: 7px 13px; }.price { align-self: center; }\n  .hero__experience { padding-top: 51px; }.profile-picker { width: 100%; }.profile-picker button { flex: 1; padding: 0 6px; }.console { transform: none; }.console__body { grid-template-columns: 1fr; min-height: 0; }.console__side { display: none; }.console__main { padding: 14px; }\n  .console__heading .status { display: none; }.metrics { gap: 6px; }.metrics article { padding: 10px 6px; }.metric__icon { display: none; }.metrics strong { font-size: 16px; }.console__lower { grid-template-columns: 1fr; }.priority-card { display: none; }\n  .floating-event { display: none; }.role-strip { width: calc(100% - 28px); padding: 18px; }.role-strip > div { display: grid; grid-template-columns: 1fr 1fr; width: 100%; gap: 15px; }\n  .section { width: calc(100% - 28px); padding: 78px 0; }.section h2 { font-size: 34px; }.challenge-grid { grid-template-columns: 1fr; }.challenge-card { min-height: 0; }.challenge-card p { min-height: 0; }\n  .adaptation { width: 100%; padding: 75px 14px; gap: 45px; }.rule-board__grid { grid-template-columns: 1fr; }.rule { min-height: 130px; }.rule-board__footer > span { display: none; }\n  .integrity { padding: 72px 14px; }.integrity__title { display: block; }.guard-grid article { padding: 19px; }.journey__steps { grid-template-columns: 1fr 1fr; gap: 38px 16px; }.journey__steps::before { display: none; }\n  .faq { gap: 35px; }.faq__intro h2 { font-size: 36px; }.final-cta { width: calc(100% - 28px); margin-bottom: 60px; padding: 62px 18px; }.final-cta .button { width: 100%; }\n  .footer__inner { flex-wrap: wrap; }.footer p { flex: 1; }.footer nav { order: 3; flex-basis: 100%; justify-content: space-between; }.footer small { margin-left: auto; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LandingComponent, { className: "LandingComponent", filePath: "frontend/src/app/features/landing/landing.component.ts", lineNumber: 51 }); })();
//# sourceMappingURL=landing.component.js.map