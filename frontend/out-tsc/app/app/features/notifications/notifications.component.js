import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { INBOX_CATEGORIES } from '@core/models/inbox.models';
import { InboxService } from '@core/services/inbox.service';
import { NotificationService } from '@core/services/notification.service';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.id;
function NotificationsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.unread(), " message(s) non lu(s). ");
} }
function NotificationsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Tout est lu. ");
} }
function NotificationsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵlistener("click", function NotificationsComponent_Conditional_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.markAllRead()); });
    i0.ɵɵtext(1, " Tout marquer comme lu ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.working());
} }
function NotificationsComponent_For_14_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 5);
    i0.ɵɵlistener("click", function NotificationsComponent_For_14_Template_button_click_0_listener() { const category_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.filterCategory(category_r4)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r4 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("is-active", ctx_r0.categoryFilter() === category_r4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.labelOf(category_r4), " ");
} }
function NotificationsComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 8);
} }
function NotificationsComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 12);
    i0.ɵɵlistener("retry", function NotificationsComponent_Conditional_18_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.load()); });
    i0.ɵɵelementEnd();
} }
function NotificationsComponent_Conditional_19_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "h2");
    i0.ɵɵtext(1, "Aucun message");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Aucun message ne correspond \u00E0 ces filtres.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 13);
    i0.ɵɵlistener("click", function NotificationsComponent_Conditional_19_Conditional_1_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.clearFilters()); });
    i0.ɵɵtext(5, " Effacer les filtres ");
    i0.ɵɵelementEnd();
} }
function NotificationsComponent_Conditional_19_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2");
    i0.ɵɵtext(1, "Votre bo\u00EEte est vide");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Les avis de l\u2019\u00E9cole arriveront ici : absence signal\u00E9e, bulletin publi\u00E9, r\u00E8glement enregistr\u00E9.");
    i0.ɵɵelementEnd();
} }
function NotificationsComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵtemplate(1, NotificationsComponent_Conditional_19_Conditional_1_Template, 6, 0)(2, NotificationsComponent_Conditional_19_Conditional_2_Template, 4, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.hasFilters() ? 1 : 2);
} }
function NotificationsComponent_Conditional_20_For_2_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 21);
    i0.ɵɵtext(1, "nouveau");
    i0.ɵɵelementEnd();
} }
function NotificationsComponent_Conditional_20_For_2_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 27);
    i0.ɵɵlistener("click", function NotificationsComponent_Conditional_20_For_2_Conditional_12_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const message_r8 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.open(message_r8)); });
    i0.ɵɵtext(1, " Ouvrir ");
    i0.ɵɵelementEnd();
} }
function NotificationsComponent_Conditional_20_For_2_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 28);
    i0.ɵɵlistener("click", function NotificationsComponent_Conditional_20_For_2_Conditional_13_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const message_r8 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.markRead(message_r8)); });
    i0.ɵɵtext(1, " Marquer lu ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.working());
} }
function NotificationsComponent_Conditional_20_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 17);
    i0.ɵɵelement(1, "span", 18);
    i0.ɵɵelementStart(2, "div", 19)(3, "p", 20);
    i0.ɵɵtext(4);
    i0.ɵɵtemplate(5, NotificationsComponent_Conditional_20_For_2_Conditional_5_Template, 2, 0, "span", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 22);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 23);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 24);
    i0.ɵɵtemplate(12, NotificationsComponent_Conditional_20_For_2_Conditional_12_Template, 2, 0, "button", 25)(13, NotificationsComponent_Conditional_20_For_2_Conditional_13_Template, 2, 1, "button", 26);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const message_r8 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("is-unread", message_r8.unread);
    i0.ɵɵadvance();
    i0.ɵɵclassMap("message__dot message__dot--" + ctx_r0.toneOf(message_r8.category));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", message_r8.title, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(message_r8.unread ? 5 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(message_r8.body);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", message_r8.categoryLabel, " \u00B7 ", i0.ɵɵpipeBind2(10, 11, message_r8.createdAt, "dd/MM/yyyy \u00E0 HH:mm"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(message_r8.actionUrl ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(message_r8.unread ? 13 : -1);
} }
function NotificationsComponent_Conditional_20_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "nav", 16)(1, "button", 28);
    i0.ɵɵlistener("click", function NotificationsComponent_Conditional_20_Conditional_3_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.previousPage()); });
    i0.ɵɵtext(2, " Pr\u00E9c\u00E9dents ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 29);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 28);
    i0.ɵɵlistener("click", function NotificationsComponent_Conditional_20_Conditional_3_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.nextPage()); });
    i0.ɵɵtext(6, " Suivants ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r0.canGoBack());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate3(" Page ", ctx_r0.page() + 1, " sur ", ctx_r0.totalPages(), " \u2014 ", ctx_r0.total(), " message(s) ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r0.canGoForward());
} }
function NotificationsComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 14);
    i0.ɵɵrepeaterCreate(1, NotificationsComponent_Conditional_20_For_2_Template, 14, 14, "li", 15, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, NotificationsComponent_Conditional_20_Conditional_3_Template, 7, 5, "nav", 16);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.messages());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.totalPages() > 1 ? 3 : -1);
} }
/**
 * Ma boîte de réception.
 *
 * <p>Ce que le système m'adresse à moi : absence de mon enfant, bulletin
 * publié, paiement enregistré. Chacun voit les siens — le serveur déduit le
 * destinataire du compte connecté, et aucune requête d'ici ne lui donne le
 * choix.</p>
 */
export class NotificationsComponent {
    inbox = inject(InboxService);
    toasts = inject(NotificationService);
    router = inject(Router);
    destroyRef = inject(DestroyRef);
    knownCategories = INBOX_CATEGORIES;
    messages = signal([]);
    categories = signal([]);
    unread = signal(0);
    total = signal(0);
    page = signal(0);
    totalPages = signal(1);
    loading = signal(true);
    failed = signal(false);
    working = signal(false);
    categoryFilter = signal('');
    unreadOnly = signal(false);
    hasFilters = computed(() => Boolean(this.categoryFilter()) || this.unreadOnly());
    canGoBack = computed(() => this.page() > 0);
    canGoForward = computed(() => this.page() + 1 < this.totalPages());
    helpCopy = {
        title: 'Ce que l’école vous adresse',
        description: 'Une absence signalée, un bulletin publié, un règlement '
            + 'enregistré : ces messages vous sont personnels. Personne d’autre ne '
            + 'les voit, et vous ne voyez pas ceux des autres.',
        points: [
            'Les non lus apparaissent en premier : ouvrir sa boîte sert d’abord à '
                + 'voir ce qui reste à traiter.',
            'Un message renvoie vers la fiche concernée quand il y a quelque chose '
                + 'à y faire.',
            'Les responsables qui ont décliné un type d’avis ne le reçoivent pas — '
                + 'ce réglage se trouve sur la fiche du responsable.'
        ]
    };
    ngOnInit() {
        this.load();
        this.inbox.categories()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (list) => this.categories.set(list),
            error: () => undefined
        });
    }
    load() {
        this.loading.set(true);
        this.failed.set(false);
        this.inbox.inbox({
            category: this.categoryFilter() || undefined,
            unreadOnly: this.unreadOnly(),
            page: this.page(),
            size: 30
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (result) => {
                this.messages.set(result.content);
                this.total.set(result.totalElements);
                this.totalPages.set(Math.max(1, result.totalPages));
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.failed.set(true);
            }
        });
        this.inbox.unreadCount()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({ next: (count) => this.unread.set(count), error: () => undefined });
    }
    reload() {
        this.page.set(0);
        this.load();
    }
    filterCategory(category) {
        this.categoryFilter.set(category);
        this.reload();
    }
    toggleUnreadOnly() {
        this.unreadOnly.update((value) => !value);
        this.reload();
    }
    clearFilters() {
        this.categoryFilter.set('');
        this.unreadOnly.set(false);
        this.reload();
    }
    labelOf(category) {
        return this.knownCategories.find((item) => item.code === category)?.label
            ?? category;
    }
    toneOf(category) {
        return this.knownCategories.find((item) => item.code === category)?.tone
            ?? 'announcement';
    }
    /**
     * Ouvrir un message le marque lu, puis mène à la fiche concernée.
     *
     * <p>Marquer lu avant de naviguer, et sans attendre la réponse pour partir :
     * si le marquage échoue, on affiche l'erreur mais on ne bloque pas la
     * consultation — le message est déjà sous les yeux.</p>
     */
    open(message) {
        if (message.unread) {
            this.markRead(message);
        }
        if (message.actionUrl) {
            void this.router.navigateByUrl(message.actionUrl);
        }
    }
    markRead(message) {
        if (!message.unread || this.working()) {
            return;
        }
        this.working.set(true);
        this.inbox.markRead(message.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.working.set(false);
                this.messages.update((list) => list.map((item) => item.id === message.id ? { ...item, unread: false } : item));
                this.unread.update((count) => Math.max(0, count - 1));
            },
            error: () => {
                this.working.set(false);
                this.toasts.error('Ce message n’a pas pu être marqué comme lu.');
            }
        });
    }
    markAllRead() {
        if (this.unread() === 0 || this.working()) {
            return;
        }
        this.working.set(true);
        this.inbox.markAllRead()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (count) => {
                this.working.set(false);
                this.toasts.success(`${count} message(s) marqué(s) comme lu(s).`);
                this.reload();
            },
            error: () => {
                this.working.set(false);
                this.toasts.error('Les messages n’ont pas pu être marqués comme lus.');
            }
        });
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
    static ɵfac = function NotificationsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotificationsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NotificationsComponent, selectors: [["eduops-notifications"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 21, vars: 13, consts: [[1, "inbox"], ["flow", "inbox", "stepKey", "overview", "eyebrow", "\u00C0 savoir sur cet \u00E9cran", 3, "stepNumber", "totalSteps", "title", "description", "points"], [1, "page-head"], ["type", "button", 1, "btn", "btn--ghost", 3, "disabled"], ["role", "group", "aria-label", "Filtrer les messages", 1, "filters"], ["type", "button", 3, "click"], ["type", "button", 3, "is-active"], ["type", "button", 1, "filters__toggle", 3, "click"], ["message", "Chargement de vos messages\u2026"], ["title", "Messages indisponibles", "message", "Votre bo\u00EEte de r\u00E9ception n\u2019a pas pu \u00EAtre charg\u00E9e."], [1, "panel", "empty"], ["type", "button", 1, "btn", "btn--ghost", 3, "click", "disabled"], ["title", "Messages indisponibles", "message", "Votre bo\u00EEte de r\u00E9ception n\u2019a pas pu \u00EAtre charg\u00E9e.", 3, "retry"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], [1, "messages"], [1, "message", 3, "is-unread"], ["aria-label", "Pagination des messages", 1, "pager"], [1, "message"], ["aria-hidden", "true"], [1, "message__body"], [1, "message__title"], ["aria-label", "Non lu", 1, "message__new"], [1, "message__text"], [1, "message__meta"], [1, "message__actions"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "disabled"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], [1, "pager__state"]], template: function NotificationsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "eduops-step-coachmark", 1);
            i0.ɵɵelementStart(2, "header", 2)(3, "div")(4, "h1");
            i0.ɵɵtext(5, "Messages");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtemplate(7, NotificationsComponent_Conditional_7_Template, 1, 1)(8, NotificationsComponent_Conditional_8_Template, 1, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, NotificationsComponent_Conditional_9_Template, 2, 1, "button", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 4)(11, "button", 5);
            i0.ɵɵlistener("click", function NotificationsComponent_Template_button_click_11_listener() { return ctx.filterCategory(""); });
            i0.ɵɵtext(12, "Tout");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(13, NotificationsComponent_For_14_Template, 2, 3, "button", 6, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementStart(15, "button", 7);
            i0.ɵɵlistener("click", function NotificationsComponent_Template_button_click_15_listener() { return ctx.toggleUnreadOnly(); });
            i0.ɵɵtext(16, " Non lus seulement ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(17, NotificationsComponent_Conditional_17_Template, 1, 0, "eduops-loading-state", 8)(18, NotificationsComponent_Conditional_18_Template, 1, 0, "eduops-error-state", 9)(19, NotificationsComponent_Conditional_19_Template, 3, 1, "div", 10)(20, NotificationsComponent_Conditional_20_Template, 4, 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("stepNumber", 1)("totalSteps", 1)("title", ctx.helpCopy.title)("description", ctx.helpCopy.description)("points", ctx.helpCopy.points);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.unread() > 0 ? 7 : 8);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.unread() > 0 ? 9 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("is-active", ctx.categoryFilter() === "");
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.categories());
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("is-active", ctx.unreadOnly());
            i0.ɵɵattribute("aria-pressed", ctx.unreadOnly());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading() ? 17 : ctx.failed() ? 18 : ctx.messages().length === 0 ? 19 : 20);
        } }, dependencies: [CommonModule, i1.DatePipe, LoadingStateComponent, ErrorStateComponent,
            StepCoachmarkComponent], styles: [".inbox[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.page-head[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n\n  h1 { margin: 0 0 0.2rem; font-size: 1.5rem; }\n  p { margin: 0; color: var(--text-muted); }\n}\n\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n\n  button {\n    padding: 0.32rem 0.75rem;\n    border: 1px solid var(--border-strong);\n    border-radius: 999px;\n    background: transparent;\n    color: var(--text-muted);\n    font-size: 0.82rem;\n    cursor: pointer;\n\n    &.is-active {\n      border-color: var(--brand);\n      color: var(--brand);\n      font-weight: 600;\n    }\n  }\n\n  &__toggle {\n    margin-left: auto;\n  }\n}\n\n.panel[_ngcontent-%COMP%] {\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: 12px;\n  padding: 1.5rem;\n}\n\n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n\n  h2 { margin: 0; font-size: 1.05rem; }\n  p { margin: 0; color: var(--text-muted); max-width: 44ch; }\n}\n\n\n\n\n.messages[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n\n.message[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 10px 1fr auto;\n  gap: 0.7rem;\n  align-items: start;\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: 10px;\n  padding: 0.75rem 0.9rem;\n\n  \n\n\n  &.is-unread {\n    background: var(--brand-tint);\n    border-color: var(--brand);\n  }\n\n  &__dot {\n    width: 10px;\n    height: 10px;\n    margin-top: 0.35rem;\n    border-radius: 50%;\n    background: var(--border-strong);\n\n    &--absence { background: #d97706; }\n    &--grade { background: #2563eb; }\n    &--report { background: #0891b2; }\n    &--payment { background: #16a34a; }\n    &--enrollment { background: #7c3aed; }\n    &--announcement { background: #64748b; }\n  }\n\n  &__body {\n    display: flex;\n    flex-direction: column;\n    gap: 0.15rem;\n    min-width: 0;\n  }\n\n  &__title {\n    margin: 0;\n    font-weight: 600;\n    font-size: 0.94rem;\n    display: flex;\n    align-items: center;\n    gap: 0.45rem;\n    flex-wrap: wrap;\n  }\n\n  &__new {\n    padding: 0.05rem 0.4rem;\n    border-radius: 999px;\n    background: var(--brand);\n    color: #fff;\n    font-size: 0.66rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.03em;\n  }\n\n  &__text {\n    margin: 0;\n    font-size: 0.88rem;\n    overflow-wrap: anywhere;\n  }\n\n  &__meta {\n    margin: 0;\n    font-size: 0.76rem;\n    color: var(--text-muted);\n  }\n\n  &__actions {\n    display: flex;\n    flex-direction: column;\n    gap: 0.3rem;\n  }\n}\n\n.pager[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n\n  &__state {\n    font-size: 0.82rem;\n    color: var(--text-muted);\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-notifications', standalone: true, imports: [CommonModule, LoadingStateComponent, ErrorStateComponent,
                    StepCoachmarkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"inbox\">\n\n  <eduops-step-coachmark\n    flow=\"inbox\"\n    stepKey=\"overview\"\n    [stepNumber]=\"1\"\n    [totalSteps]=\"1\"\n    eyebrow=\"\u00C0 savoir sur cet \u00E9cran\"\n    [title]=\"helpCopy.title\"\n    [description]=\"helpCopy.description\"\n    [points]=\"helpCopy.points\" />\n\n  <header class=\"page-head\">\n    <div>\n      <h1>Messages</h1>\n      <p>\n        @if (unread() > 0) {\n          {{ unread() }} message(s) non lu(s).\n        } @else {\n          Tout est lu.\n        }\n      </p>\n    </div>\n    @if (unread() > 0) {\n      <button type=\"button\" class=\"btn btn--ghost\"\n              [disabled]=\"working()\" (click)=\"markAllRead()\">\n        Tout marquer comme lu\n      </button>\n    }\n  </header>\n\n  <div class=\"filters\" role=\"group\" aria-label=\"Filtrer les messages\">\n    <button type=\"button\" [class.is-active]=\"categoryFilter() === ''\"\n            (click)=\"filterCategory('')\">Tout</button>\n    @for (category of categories(); track category) {\n      <button type=\"button\" [class.is-active]=\"categoryFilter() === category\"\n              (click)=\"filterCategory(category)\">\n        {{ labelOf(category) }}\n      </button>\n    }\n    <button type=\"button\" class=\"filters__toggle\"\n            [class.is-active]=\"unreadOnly()\"\n            [attr.aria-pressed]=\"unreadOnly()\"\n            (click)=\"toggleUnreadOnly()\">\n      Non lus seulement\n    </button>\n  </div>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement de vos messages\u2026\" />\n  } @else if (failed()) {\n    <eduops-error-state\n      title=\"Messages indisponibles\"\n      message=\"Votre bo\u00EEte de r\u00E9ception n\u2019a pas pu \u00EAtre charg\u00E9e.\"\n      (retry)=\"load()\" />\n  } @else if (messages().length === 0) {\n    <div class=\"panel empty\">\n      @if (hasFilters()) {\n        <h2>Aucun message</h2>\n        <p>Aucun message ne correspond \u00E0 ces filtres.</p>\n        <button type=\"button\" class=\"btn btn--ghost\" (click)=\"clearFilters()\">\n          Effacer les filtres\n        </button>\n      } @else {\n        <h2>Votre bo\u00EEte est vide</h2>\n        <p>Les avis de l\u2019\u00E9cole arriveront ici : absence signal\u00E9e, bulletin\n          publi\u00E9, r\u00E8glement enregistr\u00E9.</p>\n      }\n    </div>\n  } @else {\n    <ul class=\"messages\">\n      @for (message of messages(); track message.id) {\n        <li class=\"message\" [class.is-unread]=\"message.unread\">\n          <span [class]=\"'message__dot message__dot--' + toneOf(message.category)\"\n                aria-hidden=\"true\"></span>\n\n          <div class=\"message__body\">\n            <p class=\"message__title\">\n              {{ message.title }}\n              @if (message.unread) {\n                <span class=\"message__new\" aria-label=\"Non lu\">nouveau</span>\n              }\n            </p>\n            <p class=\"message__text\">{{ message.body }}</p>\n            <p class=\"message__meta\">\n              {{ message.categoryLabel }} \u00B7\n              {{ message.createdAt | date:'dd/MM/yyyy \u00E0 HH:mm' }}\n            </p>\n          </div>\n\n          <div class=\"message__actions\">\n            @if (message.actionUrl) {\n              <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                      (click)=\"open(message)\">\n                Ouvrir\n              </button>\n            }\n            @if (message.unread) {\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                      [disabled]=\"working()\" (click)=\"markRead(message)\">\n                Marquer lu\n              </button>\n            }\n          </div>\n        </li>\n      }\n    </ul>\n\n    @if (totalPages() > 1) {\n      <nav class=\"pager\" aria-label=\"Pagination des messages\">\n        <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                [disabled]=\"!canGoBack()\" (click)=\"previousPage()\">\n          Pr\u00E9c\u00E9dents\n        </button>\n        <span class=\"pager__state\">\n          Page {{ page() + 1 }} sur {{ totalPages() }} \u2014 {{ total() }} message(s)\n        </span>\n        <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                [disabled]=\"!canGoForward()\" (click)=\"nextPage()\">\n          Suivants\n        </button>\n      </nav>\n    }\n  }\n\n</section>\n", styles: [".inbox {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.page-head {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n\n  h1 { margin: 0 0 0.2rem; font-size: 1.5rem; }\n  p { margin: 0; color: var(--text-muted); }\n}\n\n.filters {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n\n  button {\n    padding: 0.32rem 0.75rem;\n    border: 1px solid var(--border-strong);\n    border-radius: 999px;\n    background: transparent;\n    color: var(--text-muted);\n    font-size: 0.82rem;\n    cursor: pointer;\n\n    &.is-active {\n      border-color: var(--brand);\n      color: var(--brand);\n      font-weight: 600;\n    }\n  }\n\n  &__toggle {\n    margin-left: auto;\n  }\n}\n\n.panel {\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: 12px;\n  padding: 1.5rem;\n}\n\n.empty {\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n\n  h2 { margin: 0; font-size: 1.05rem; }\n  p { margin: 0; color: var(--text-muted); max-width: 44ch; }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 les messages */\n\n.messages {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n\n.message {\n  display: grid;\n  grid-template-columns: 10px 1fr auto;\n  gap: 0.7rem;\n  align-items: start;\n  background: var(--surface-card);\n  border: 1px solid var(--border-strong);\n  border-radius: 10px;\n  padding: 0.75rem 0.9rem;\n\n  /* Le non-lu se voit au fond ET \u00E0 l'\u00E9tiquette \u00AB nouveau \u00BB : la couleur\n     seule laisserait un daltonien sans rep\u00E8re. */\n  &.is-unread {\n    background: var(--brand-tint);\n    border-color: var(--brand);\n  }\n\n  &__dot {\n    width: 10px;\n    height: 10px;\n    margin-top: 0.35rem;\n    border-radius: 50%;\n    background: var(--border-strong);\n\n    &--absence { background: #d97706; }\n    &--grade { background: #2563eb; }\n    &--report { background: #0891b2; }\n    &--payment { background: #16a34a; }\n    &--enrollment { background: #7c3aed; }\n    &--announcement { background: #64748b; }\n  }\n\n  &__body {\n    display: flex;\n    flex-direction: column;\n    gap: 0.15rem;\n    min-width: 0;\n  }\n\n  &__title {\n    margin: 0;\n    font-weight: 600;\n    font-size: 0.94rem;\n    display: flex;\n    align-items: center;\n    gap: 0.45rem;\n    flex-wrap: wrap;\n  }\n\n  &__new {\n    padding: 0.05rem 0.4rem;\n    border-radius: 999px;\n    background: var(--brand);\n    color: #fff;\n    font-size: 0.66rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.03em;\n  }\n\n  &__text {\n    margin: 0;\n    font-size: 0.88rem;\n    overflow-wrap: anywhere;\n  }\n\n  &__meta {\n    margin: 0;\n    font-size: 0.76rem;\n    color: var(--text-muted);\n  }\n\n  &__actions {\n    display: flex;\n    flex-direction: column;\n    gap: 0.3rem;\n  }\n}\n\n.pager {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n\n  &__state {\n    font-size: 0.82rem;\n    color: var(--text-muted);\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NotificationsComponent, { className: "NotificationsComponent", filePath: "frontend/src/app/features/notifications/notifications.component.ts", lineNumber: 31 }); })();
//# sourceMappingURL=notifications.component.js.map