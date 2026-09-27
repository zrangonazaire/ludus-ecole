import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AUDIT_ACTIONS } from '@core/models/audit.models';
import { AuditService } from '@core/services/audit.service';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.code;
const _forTrack1 = ($index, $item) => $item.id;
function AuditComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.failedLogins(), " \u00E9chec(s) de connexion sur cette page. Des \u00E9checs r\u00E9p\u00E9t\u00E9s sur un m\u00EAme compte m\u00E9ritent un coup d\u2019\u0153il. ");
} }
function AuditComponent_For_16_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function AuditComponent_For_16_Template_button_click_0_listener() { const action_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.filterAction(action_r3.code)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("is-active", ctx_r0.actionFilter() === action_r3.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(action_r3.label);
} }
function AuditComponent_Conditional_18_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", type_r5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(type_r5);
} }
function AuditComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 10)(1, "span");
    i0.ɵɵtext(2, "Objet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 16);
    i0.ɵɵlistener("change", function AuditComponent_Conditional_18_Template_select_change_3_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.filterType($event.target.value)); });
    i0.ɵɵelementStart(4, "option", 17);
    i0.ɵɵtext(5, "Tous");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(6, AuditComponent_Conditional_18_For_7_Template, 2, 2, "option", 18, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", ctx_r0.typeFilter());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.entityTypes());
} }
function AuditComponent_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 19);
    i0.ɵɵlistener("click", function AuditComponent_Conditional_27_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.clearFilters()); });
    i0.ɵɵtext(1, "Effacer");
    i0.ɵɵelementEnd();
} }
function AuditComponent_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 13);
} }
function AuditComponent_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 20);
    i0.ɵɵlistener("retry", function AuditComponent_Conditional_29_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.load()); });
    i0.ɵɵelementEnd();
} }
function AuditComponent_Conditional_30_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "h2");
    i0.ɵɵtext(1, "Aucune entr\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucune op\u00E9ration ne correspond \u00E0 ces filtres.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 21);
    i0.ɵɵlistener("click", function AuditComponent_Conditional_30_Conditional_1_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.clearFilters()); });
    i0.ɵɵtext(5, " Effacer les filtres ");
    i0.ɵɵelementEnd();
} }
function AuditComponent_Conditional_30_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2");
    i0.ɵɵtext(1, "Le journal est vide");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Les op\u00E9rations sensibles y appara\u00EEtront au fur et \u00E0 mesure : connexions, cr\u00E9ations, modifications, validations.");
    i0.ɵɵelementEnd();
} }
function AuditComponent_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵtemplate(1, AuditComponent_Conditional_30_Conditional_1_Template, 6, 0)(2, AuditComponent_Conditional_30_Conditional_2_Template, 4, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.hasFilters() ? 1 : 2);
} }
function AuditComponent_Conditional_31_For_2_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Champs modifi\u00E9s : ", entry_r10.changedFields.join(", "), " ");
} }
function AuditComponent_Conditional_31_For_2_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Motif : ", entry_r10.reason, "");
} }
function AuditComponent_Conditional_31_For_2_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Refus\u00E9 \u2014 ", entry_r10.errorCode, "");
} }
function AuditComponent_Conditional_31_For_2_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const entry_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 depuis ", entry_r10.ipAddress, " ");
} }
function AuditComponent_Conditional_31_For_2_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const entry_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 r\u00E9f. ", entry_r10.correlationId, " ");
} }
function AuditComponent_Conditional_31_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 27);
    i0.ɵɵelement(1, "div", 28);
    i0.ɵɵelementStart(2, "div", 29)(3, "p", 30);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AuditComponent_Conditional_31_For_2_Conditional_5_Template, 2, 1, "p", 31)(6, AuditComponent_Conditional_31_For_2_Conditional_6_Template, 2, 1, "p", 32)(7, AuditComponent_Conditional_31_For_2_Conditional_7_Template, 2, 1, "p", 33);
    i0.ɵɵelementStart(8, "p", 34);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵtemplate(11, AuditComponent_Conditional_31_For_2_Conditional_11_Template, 1, 1)(12, AuditComponent_Conditional_31_For_2_Conditional_12_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const entry_r10 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("is-failure", !entry_r10.success);
    i0.ɵɵadvance();
    i0.ɵɵclassMap("entry__mark--" + ctx_r0.toneOf(entry_r10.action));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.summaryOf(entry_r10));
    i0.ɵɵadvance();
    i0.ɵɵconditional(entry_r10.changedFields.length > 0 ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(entry_r10.reason ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!entry_r10.success && entry_r10.errorCode ? 7 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(10, 14, entry_r10.occurredAt, "dd/MM/yyyy \u00E0 HH:mm:ss"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(entry_r10.ipAddress ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(entry_r10.correlationId ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassMap("badge badge--" + ctx_r0.toneOf(entry_r10.action));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", entry_r10.actionLabel, " ");
} }
function AuditComponent_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ol", 22);
    i0.ɵɵrepeaterCreate(1, AuditComponent_Conditional_31_For_2_Template, 15, 17, "li", 23, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "nav", 24)(4, "button", 25);
    i0.ɵɵlistener("click", function AuditComponent_Conditional_31_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.previousPage()); });
    i0.ɵɵtext(5, " Plus r\u00E9cent ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 26);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 25);
    i0.ɵɵlistener("click", function AuditComponent_Conditional_31_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.nextPage()); });
    i0.ɵɵtext(9, " Plus ancien ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.entries());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r0.canGoBack());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate3(" Page ", ctx_r0.page() + 1, " sur ", ctx_r0.totalPages(), " \u2014 ", ctx_r0.total(), " entr\u00E9e(s) ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r0.canGoForward());
} }
/**
 * Journal d'audit.
 *
 * <p>L'écran nomme les champs modifiés sans montrer leur contenu, parce que
 * le serveur ne l'envoie pas. Ce n'est pas une limitation à contourner :
 * c'est ce qui empêche le journal de devenir un moyen de lire, en passant par
 * la trace, des données qu'on ne peut pas ouvrir directement.</p>
 */
export class AuditComponent {
    audit = inject(AuditService);
    destroyRef = inject(DestroyRef);
    actions = AUDIT_ACTIONS;
    entries = signal([]);
    entityTypes = signal([]);
    total = signal(0);
    page = signal(0);
    totalPages = signal(1);
    loading = signal(true);
    failed = signal(false);
    actionFilter = signal('');
    typeFilter = signal('');
    from = signal('');
    to = signal('');
    hasFilters = computed(() => Boolean(this.actionFilter() || this.typeFilter() || this.from() || this.to()));
    canGoBack = computed(() => this.page() > 0);
    canGoForward = computed(() => this.page() + 1 < this.totalPages());
    /** Les échecs de connexion méritent d'être vus en premier. */
    failedLogins = computed(() => this.entries().filter((entry) => entry.action === 'LOGIN_FAILED').length);
    helpCopy = {
        title: 'Ce que le journal dit, et ce qu’il tait',
        description: 'Chaque opération sensible laisse une ligne : qui, quoi, '
            + 'quand, depuis quelle adresse. Les champs modifiés sont nommés — '
            + '« téléphone, adresse » — mais leur contenu n’est pas affiché.',
        points: [
            'Le journal ne peut pas être modifié : la base refuse toute écriture '
                + 'autre qu’un ajout.',
            'Montrer le contenu des champs ferait du journal un moyen de lire des '
                + 'dossiers qu’on n’a pas le droit d’ouvrir — un dossier médical, par '
                + 'exemple.',
            'Les échecs de connexion répétés sur un même compte sont le signal le '
                + 'plus utile de cet écran.'
        ]
    };
    ngOnInit() {
        this.load();
        this.audit.entityTypes()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (types) => this.entityTypes.set(types),
            error: () => undefined
        });
    }
    load() {
        this.loading.set(true);
        this.failed.set(false);
        this.audit.search({
            action: this.actionFilter() || undefined,
            entityType: this.typeFilter() || undefined,
            from: this.from() || undefined,
            to: this.to() || undefined,
            page: this.page(),
            size: 50
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (result) => {
                this.entries.set(result.content);
                this.total.set(result.totalElements);
                this.totalPages.set(Math.max(1, result.totalPages));
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.failed.set(true);
            }
        });
    }
    /** Tout changement de filtre ramène à la première page. */
    reload() {
        this.page.set(0);
        this.load();
    }
    filterAction(action) {
        this.actionFilter.set(action);
        this.reload();
    }
    filterType(type) {
        this.typeFilter.set(type);
        this.reload();
    }
    setFrom(value) {
        this.from.set(value);
        this.reload();
    }
    setTo(value) {
        this.to.set(value);
        this.reload();
    }
    clearFilters() {
        this.actionFilter.set('');
        this.typeFilter.set('');
        this.from.set('');
        this.to.set('');
        this.reload();
    }
    previousPage() {
        if (this.canGoBack()) {
            this.page.update((value) => value - 1);
            this.load();
        }
    }
    nextPage() {
        if (this.canGoForward()) {
            this.page.update((value) => value + 1);
            this.load();
        }
    }
    toneOf(action) {
        return this.actions.find((item) => item.code === action)?.tone ?? 'update';
    }
    /** Une phrase lisible, plutôt qu'une ligne de colonnes techniques. */
    summaryOf(entry) {
        const who = entry.username ?? 'Un compte supprimé';
        const what = entry.entityLabel
            ? `${entry.entityTypeLabel} « ${entry.entityLabel} »`
            : entry.entityTypeLabel;
        if (entry.action === 'LOGIN') {
            return `${who} s’est connecté.`;
        }
        if (entry.action === 'LOGIN_FAILED') {
            return `Échec de connexion pour ${who}.`;
        }
        return `${who} — ${entry.actionLabel.toLowerCase()} : ${what}`;
    }
    static ɵfac = function AuditComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuditComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditComponent, selectors: [["eduops-audit"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 32, vars: 13, consts: [[1, "audit"], ["flow", "audit", "stepKey", "overview", "eyebrow", "\u00C0 savoir sur cet \u00E9cran", 3, "stepNumber", "totalSteps", "title", "description", "points"], [1, "page-head"], [1, "notice", "notice--muted"], [1, "notice", "notice--warn"], [1, "toolbar"], ["role", "group", "aria-label", "Filtrer par action", 1, "filters"], ["type", "button", 3, "click"], ["type", "button", 3, "is-active"], [1, "range"], [1, "range__field"], ["type", "date", 1, "input", 3, "change", "value"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm"], ["message", "Lecture du journal\u2026"], ["title", "Journal indisponible", "message", "Le journal d\u2019audit n\u2019a pas pu \u00EAtre charg\u00E9."], [1, "panel", "empty"], [1, "select", 3, "change", "value"], ["value", ""], [3, "value"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["title", "Journal indisponible", "message", "Le journal d\u2019audit n\u2019a pas pu \u00EAtre charg\u00E9.", 3, "retry"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], [1, "trail"], [1, "entry", 3, "is-failure"], ["aria-label", "Pagination du journal", 1, "pager"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], [1, "pager__state"], [1, "entry"], ["aria-hidden", "true", 1, "entry__mark"], [1, "entry__body"], [1, "entry__summary"], [1, "entry__fields"], [1, "entry__reason"], [1, "entry__error"], [1, "entry__meta"]], template: function AuditComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "eduops-step-coachmark", 1);
            i0.ɵɵelementStart(2, "header", 2)(3, "div")(4, "h1");
            i0.ɵɵtext(5, "Journal d\u2019audit");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Qui a fait quoi, et quand. Le journal ne peut pas \u00EAtre modifi\u00E9.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "p", 3);
            i0.ɵɵtext(9, " Les champs modifi\u00E9s sont nomm\u00E9s, leur contenu n\u2019est pas affich\u00E9 \u2014 le journal ne doit pas permettre de lire des dossiers qu\u2019on n\u2019a pas le droit d\u2019ouvrir. ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, AuditComponent_Conditional_10_Template, 2, 1, "p", 4);
            i0.ɵɵelementStart(11, "div", 5)(12, "div", 6)(13, "button", 7);
            i0.ɵɵlistener("click", function AuditComponent_Template_button_click_13_listener() { return ctx.filterAction(""); });
            i0.ɵɵtext(14, "Toutes les actions");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(15, AuditComponent_For_16_Template, 2, 3, "button", 8, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 9);
            i0.ɵɵtemplate(18, AuditComponent_Conditional_18_Template, 8, 1, "label", 10);
            i0.ɵɵelementStart(19, "label", 10)(20, "span");
            i0.ɵɵtext(21, "Du");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "input", 11);
            i0.ɵɵlistener("change", function AuditComponent_Template_input_change_22_listener($event) { return ctx.setFrom($event.target.value); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "label", 10)(24, "span");
            i0.ɵɵtext(25, "Au");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "input", 11);
            i0.ɵɵlistener("change", function AuditComponent_Template_input_change_26_listener($event) { return ctx.setTo($event.target.value); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(27, AuditComponent_Conditional_27_Template, 2, 0, "button", 12);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(28, AuditComponent_Conditional_28_Template, 1, 0, "eduops-loading-state", 13)(29, AuditComponent_Conditional_29_Template, 1, 0, "eduops-error-state", 14)(30, AuditComponent_Conditional_30_Template, 3, 1, "div", 15)(31, AuditComponent_Conditional_31_Template, 10, 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("stepNumber", 1)("totalSteps", 1)("title", ctx.helpCopy.title)("description", ctx.helpCopy.description)("points", ctx.helpCopy.points);
            i0.ɵɵadvance(9);
            i0.ɵɵconditional(ctx.failedLogins() > 0 ? 10 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("is-active", ctx.actionFilter() === "");
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.actions);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.entityTypes().length > 0 ? 18 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("value", ctx.from());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("value", ctx.to());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.hasFilters() ? 27 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 28 : ctx.failed() ? 29 : ctx.entries().length === 0 ? 30 : 31);
        } }, dependencies: [CommonModule, i1.DatePipe, LoadingStateComponent, ErrorStateComponent,
            StepCoachmarkComponent], styles: [".audit[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.page-head[_ngcontent-%COMP%] {\n  h1 { margin: 0 0 0.25rem; font-size: 1.5rem; }\n  p { margin: 0; color: var(--text-muted); }\n}\n\n.notice[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.65rem 0.9rem;\n  border-radius: 8px;\n  font-size: 0.87rem;\n\n  &--muted {\n    background: rgba(100, 116, 139, 0.08);\n    color: var(--text-muted);\n  }\n\n  &--warn {\n    background: rgba(217, 119, 6, 0.1);\n    color: #b45309;\n    border: 1px solid rgba(217, 119, 6, 0.25);\n  }\n}\n\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.3rem;\n\n  button {\n    padding: 0.3rem 0.7rem;\n    border: 1px solid var(--border-strong);\n    border-radius: 999px;\n    background: transparent;\n    color: var(--text-muted);\n    font-size: 0.8rem;\n    cursor: pointer;\n\n    &.is-active {\n      border-color: var(--brand);\n      color: var(--brand);\n      font-weight: 600;\n    }\n  }\n}\n\n.range[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: 0.6rem;\n\n  &__field {\n    display: flex;\n    flex-direction: column;\n    gap: 0.2rem;\n    font-size: 0.78rem;\n    color: var(--text-muted);\n\n    .input, .select { min-width: 9rem; }\n  }\n}\n\n.panel[_ngcontent-%COMP%] {\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: 12px;\n  padding: 1.5rem;\n}\n\n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n\n  h2 { margin: 0; font-size: 1.05rem; }\n  p { margin: 0; color: var(--text-muted); max-width: 46ch; }\n}\n\n\n\n\n.trail[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}\n\n.entry[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 4px 1fr auto;\n  gap: 0.75rem;\n  align-items: start;\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: 10px;\n  padding: 0.65rem 0.85rem;\n\n  &.is-failure {\n    border-color: rgba(220, 38, 38, 0.35);\n    background: rgba(220, 38, 38, 0.03);\n  }\n\n  &__mark {\n    align-self: stretch;\n    border-radius: 999px;\n    background: var(--border-strong);\n\n    &--create { background: #16a34a; }\n    &--update { background: #2563eb; }\n    &--delete { background: #dc2626; }\n    &--validate { background: #0891b2; }\n    &--cancel { background: #d97706; }\n    &--login { background: #64748b; }\n    &--failed { background: #dc2626; }\n    &--permission { background: #7c3aed; }\n    &--transfer { background: #0d9488; }\n  }\n\n  &__body {\n    display: flex;\n    flex-direction: column;\n    gap: 0.15rem;\n    min-width: 0;\n  }\n\n  &__summary {\n    margin: 0;\n    font-size: 0.9rem;\n    overflow-wrap: anywhere;\n  }\n\n  &__fields,\n  &__reason,\n  &__meta {\n    margin: 0;\n    font-size: 0.78rem;\n    color: var(--text-muted);\n  }\n\n  &__error {\n    margin: 0;\n    font-size: 0.78rem;\n    color: #b91c1c;\n    font-weight: 600;\n  }\n}\n\n.badge[_ngcontent-%COMP%] {\n  padding: 0.15rem 0.55rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  white-space: nowrap;\n  background: rgba(100, 116, 139, 0.14);\n  color: #475569;\n\n  \n\n  &--create { background: rgba(22, 163, 74, 0.14); color: #15803d; }\n  &--update { background: rgba(37, 99, 235, 0.13); color: #1d4ed8; }\n  &--delete, &--failed { background: rgba(220, 38, 38, 0.12); color: #b91c1c; }\n  &--validate { background: rgba(8, 145, 178, 0.14); color: #0e7490; }\n  &--cancel { background: rgba(217, 119, 6, 0.16); color: #b45309; }\n  &--permission { background: rgba(124, 58, 237, 0.14); color: #6d28d9; }\n  &--transfer { background: rgba(13, 148, 136, 0.14); color: #0f766e; }\n}\n\n.pager[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n\n  &__state {\n    font-size: 0.82rem;\n    color: var(--text-muted);\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditComponent, [{
        type: Component,
        args: [{ selector: 'eduops-audit', standalone: true, imports: [CommonModule, LoadingStateComponent, ErrorStateComponent,
                    StepCoachmarkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"audit\">\n\n  <eduops-step-coachmark\n    flow=\"audit\"\n    stepKey=\"overview\"\n    [stepNumber]=\"1\"\n    [totalSteps]=\"1\"\n    eyebrow=\"\u00C0 savoir sur cet \u00E9cran\"\n    [title]=\"helpCopy.title\"\n    [description]=\"helpCopy.description\"\n    [points]=\"helpCopy.points\" />\n\n  <header class=\"page-head\">\n    <div>\n      <h1>Journal d\u2019audit</h1>\n      <p>Qui a fait quoi, et quand. Le journal ne peut pas \u00EAtre modifi\u00E9.</p>\n    </div>\n  </header>\n\n  <!--\n    Dit une fois, clairement, plut\u00F4t que de laisser chercher pourquoi les\n    valeurs n'apparaissent pas.\n  -->\n  <p class=\"notice notice--muted\">\n    Les champs modifi\u00E9s sont nomm\u00E9s, leur contenu n\u2019est pas affich\u00E9 \u2014 le\n    journal ne doit pas permettre de lire des dossiers qu\u2019on n\u2019a pas le droit\n    d\u2019ouvrir.\n  </p>\n\n  @if (failedLogins() > 0) {\n    <p class=\"notice notice--warn\">\n      {{ failedLogins() }} \u00E9chec(s) de connexion sur cette page. Des \u00E9checs\n      r\u00E9p\u00E9t\u00E9s sur un m\u00EAme compte m\u00E9ritent un coup d\u2019\u0153il.\n    </p>\n  }\n\n  <div class=\"toolbar\">\n    <div class=\"filters\" role=\"group\" aria-label=\"Filtrer par action\">\n      <button type=\"button\" [class.is-active]=\"actionFilter() === ''\"\n              (click)=\"filterAction('')\">Toutes les actions</button>\n      @for (action of actions; track action.code) {\n        <button type=\"button\" [class.is-active]=\"actionFilter() === action.code\"\n                (click)=\"filterAction(action.code)\">{{ action.label }}</button>\n      }\n    </div>\n\n    <div class=\"range\">\n      @if (entityTypes().length > 0) {\n        <label class=\"range__field\">\n          <span>Objet</span>\n          <select class=\"select\" [value]=\"typeFilter()\"\n                  (change)=\"filterType($any($event.target).value)\">\n            <option value=\"\">Tous</option>\n            @for (type of entityTypes(); track type) {\n              <option [value]=\"type\">{{ type }}</option>\n            }\n          </select>\n        </label>\n      }\n      <label class=\"range__field\">\n        <span>Du</span>\n        <input class=\"input\" type=\"date\" [value]=\"from()\"\n               (change)=\"setFrom($any($event.target).value)\" />\n      </label>\n      <label class=\"range__field\">\n        <span>Au</span>\n        <input class=\"input\" type=\"date\" [value]=\"to()\"\n               (change)=\"setTo($any($event.target).value)\" />\n      </label>\n      @if (hasFilters()) {\n        <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                (click)=\"clearFilters()\">Effacer</button>\n      }\n    </div>\n  </div>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Lecture du journal\u2026\" />\n  } @else if (failed()) {\n    <eduops-error-state\n      title=\"Journal indisponible\"\n      message=\"Le journal d\u2019audit n\u2019a pas pu \u00EAtre charg\u00E9.\"\n      (retry)=\"load()\" />\n  } @else if (entries().length === 0) {\n    <div class=\"panel empty\">\n      @if (hasFilters()) {\n        <h2>Aucune entr\u00E9e</h2>\n        <p>Aucune op\u00E9ration ne correspond \u00E0 ces filtres.</p>\n        <button type=\"button\" class=\"btn btn--ghost\" (click)=\"clearFilters()\">\n          Effacer les filtres\n        </button>\n      } @else {\n        <h2>Le journal est vide</h2>\n        <p>Les op\u00E9rations sensibles y appara\u00EEtront au fur et \u00E0 mesure :\n          connexions, cr\u00E9ations, modifications, validations.</p>\n      }\n    </div>\n  } @else {\n    <ol class=\"trail\">\n      @for (entry of entries(); track entry.id) {\n        <li class=\"entry\" [class.is-failure]=\"!entry.success\">\n          <div class=\"entry__mark\" [class]=\"'entry__mark--' + toneOf(entry.action)\"\n               aria-hidden=\"true\"></div>\n\n          <div class=\"entry__body\">\n            <p class=\"entry__summary\">{{ summaryOf(entry) }}</p>\n\n            @if (entry.changedFields.length > 0) {\n              <p class=\"entry__fields\">\n                Champs modifi\u00E9s : {{ entry.changedFields.join(', ') }}\n              </p>\n            }\n\n            @if (entry.reason) {\n              <p class=\"entry__reason\">Motif : {{ entry.reason }}</p>\n            }\n\n            @if (!entry.success && entry.errorCode) {\n              <p class=\"entry__error\">Refus\u00E9 \u2014 {{ entry.errorCode }}</p>\n            }\n\n            <p class=\"entry__meta\">\n              {{ entry.occurredAt | date:'dd/MM/yyyy \u00E0 HH:mm:ss' }}\n              @if (entry.ipAddress) {\n                \u00B7 depuis {{ entry.ipAddress }}\n              }\n              @if (entry.correlationId) {\n                \u00B7 r\u00E9f. {{ entry.correlationId }}\n              }\n            </p>\n          </div>\n\n          <span [class]=\"'badge badge--' + toneOf(entry.action)\">\n            {{ entry.actionLabel }}\n          </span>\n        </li>\n      }\n    </ol>\n\n    <nav class=\"pager\" aria-label=\"Pagination du journal\">\n      <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n              [disabled]=\"!canGoBack()\" (click)=\"previousPage()\">\n        Plus r\u00E9cent\n      </button>\n      <span class=\"pager__state\">\n        Page {{ page() + 1 }} sur {{ totalPages() }} \u2014 {{ total() }} entr\u00E9e(s)\n      </span>\n      <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n              [disabled]=\"!canGoForward()\" (click)=\"nextPage()\">\n        Plus ancien\n      </button>\n    </nav>\n  }\n\n</section>\n", styles: [".audit {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.page-head {\n  h1 { margin: 0 0 0.25rem; font-size: 1.5rem; }\n  p { margin: 0; color: var(--text-muted); }\n}\n\n.notice {\n  margin: 0;\n  padding: 0.65rem 0.9rem;\n  border-radius: 8px;\n  font-size: 0.87rem;\n\n  &--muted {\n    background: rgba(100, 116, 139, 0.08);\n    color: var(--text-muted);\n  }\n\n  &--warn {\n    background: rgba(217, 119, 6, 0.1);\n    color: #b45309;\n    border: 1px solid rgba(217, 119, 6, 0.25);\n  }\n}\n\n.toolbar {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n\n.filters {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.3rem;\n\n  button {\n    padding: 0.3rem 0.7rem;\n    border: 1px solid var(--border-strong);\n    border-radius: 999px;\n    background: transparent;\n    color: var(--text-muted);\n    font-size: 0.8rem;\n    cursor: pointer;\n\n    &.is-active {\n      border-color: var(--brand);\n      color: var(--brand);\n      font-weight: 600;\n    }\n  }\n}\n\n.range {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n  gap: 0.6rem;\n\n  &__field {\n    display: flex;\n    flex-direction: column;\n    gap: 0.2rem;\n    font-size: 0.78rem;\n    color: var(--text-muted);\n\n    .input, .select { min-width: 9rem; }\n  }\n}\n\n.panel {\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: 12px;\n  padding: 1.5rem;\n}\n\n.empty {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n\n  h2 { margin: 0; font-size: 1.05rem; }\n  p { margin: 0; color: var(--text-muted); max-width: 46ch; }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 la trace */\n\n.trail {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}\n\n.entry {\n  display: grid;\n  grid-template-columns: 4px 1fr auto;\n  gap: 0.75rem;\n  align-items: start;\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: 10px;\n  padding: 0.65rem 0.85rem;\n\n  &.is-failure {\n    border-color: rgba(220, 38, 38, 0.35);\n    background: rgba(220, 38, 38, 0.03);\n  }\n\n  &__mark {\n    align-self: stretch;\n    border-radius: 999px;\n    background: var(--border-strong);\n\n    &--create { background: #16a34a; }\n    &--update { background: #2563eb; }\n    &--delete { background: #dc2626; }\n    &--validate { background: #0891b2; }\n    &--cancel { background: #d97706; }\n    &--login { background: #64748b; }\n    &--failed { background: #dc2626; }\n    &--permission { background: #7c3aed; }\n    &--transfer { background: #0d9488; }\n  }\n\n  &__body {\n    display: flex;\n    flex-direction: column;\n    gap: 0.15rem;\n    min-width: 0;\n  }\n\n  &__summary {\n    margin: 0;\n    font-size: 0.9rem;\n    overflow-wrap: anywhere;\n  }\n\n  &__fields,\n  &__reason,\n  &__meta {\n    margin: 0;\n    font-size: 0.78rem;\n    color: var(--text-muted);\n  }\n\n  &__error {\n    margin: 0;\n    font-size: 0.78rem;\n    color: #b91c1c;\n    font-weight: 600;\n  }\n}\n\n.badge {\n  padding: 0.15rem 0.55rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  white-space: nowrap;\n  background: rgba(100, 116, 139, 0.14);\n  color: #475569;\n\n  /* La couleur double l'\u00E9tiquette, elle ne la remplace pas. */\n  &--create { background: rgba(22, 163, 74, 0.14); color: #15803d; }\n  &--update { background: rgba(37, 99, 235, 0.13); color: #1d4ed8; }\n  &--delete, &--failed { background: rgba(220, 38, 38, 0.12); color: #b91c1c; }\n  &--validate { background: rgba(8, 145, 178, 0.14); color: #0e7490; }\n  &--cancel { background: rgba(217, 119, 6, 0.16); color: #b45309; }\n  &--permission { background: rgba(124, 58, 237, 0.14); color: #6d28d9; }\n  &--transfer { background: rgba(13, 148, 136, 0.14); color: #0f766e; }\n}\n\n.pager {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n\n  &__state {\n    font-size: 0.82rem;\n    color: var(--text-muted);\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AuditComponent, { className: "AuditComponent", filePath: "frontend/src/app/features/audit/audit.component.ts", lineNumber: 29 }); })();
//# sourceMappingURL=audit.component.js.map