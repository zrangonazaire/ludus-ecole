import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { WebSocketService } from '@core/websocket/websocket.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { GuidedTourService } from '@core/services/guided-tour.service';
import { GuidedTourComponent } from '@shared/ui/guided-tour/guided-tour.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { PERMISSIONS } from '@core/models/auth.models';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.section;
const _forTrack1 = ($index, $item) => $item.route;
function AdminLayoutComponent_For_31_Conditional_6_For_1_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 37);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const badge_r5 = ctx;
    i0.ɵɵattribute("aria-label", "Configuration : " + badge_r5 + " \u00E9tapes");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(badge_r5);
} }
function AdminLayoutComponent_For_31_Conditional_6_For_1_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 38);
    i0.ɵɵelementStart(1, "span", 39);
    i0.ɵɵtext(2, "\u00C9cran \u00E0 venir");
    i0.ɵɵelementEnd();
} }
function AdminLayoutComponent_For_31_Conditional_6_For_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 35);
    i0.ɵɵlistener("click", function AdminLayoutComponent_For_31_Conditional_6_For_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.closeDrawer()); });
    i0.ɵɵelementStart(1, "span", 26);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 36);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, AdminLayoutComponent_For_31_Conditional_6_For_1_Conditional_5_Template, 2, 2, "span", 37)(6, AdminLayoutComponent_For_31_Conditional_6_For_1_Conditional_6_Template, 3, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_25_0;
    const item_r6 = ctx.$implicit;
    i0.ɵɵclassProp("sidebar__link--soon", !item_r6.ready);
    i0.ɵɵproperty("routerLink", item_r6.route);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_25_0 = item_r6.badge && item_r6.badge()) ? 5 : !item_r6.ready ? 6 : -1, tmp_25_0);
} }
function AdminLayoutComponent_For_31_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, AdminLayoutComponent_For_31_Conditional_6_For_1_Template, 7, 6, "a", 34, _forTrack1);
} if (rf & 2) {
    const group_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵrepeater(group_r2.items);
} }
function AdminLayoutComponent_For_31_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 31)(1, "button", 32);
    i0.ɵɵlistener("click", function AdminLayoutComponent_For_31_Template_button_click_1_listener() { const group_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleSection(group_r2.section)); });
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 33);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, AdminLayoutComponent_For_31_Conditional_6_Template, 2, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("sidebar__group--collapsed", ctx_r2.isCollapsed(group_r2.section));
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-expanded", !ctx_r2.isCollapsed(group_r2.section));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(group_r2.section);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.isCollapsed(group_r2.section) ? "+" : "\u2212", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r2.isCollapsed(group_r2.section) ? 6 : -1);
} }
function AdminLayoutComponent_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 40);
    i0.ɵɵlistener("click", function AdminLayoutComponent_Conditional_33_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeDrawer()); });
    i0.ɵɵelementStart(1, "span", 26);
    i0.ɵɵtext(2, "\u2699");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Configuration syst\u00E8me");
    i0.ɵɵelementEnd()();
} }
/**
 * Administration shell (section 56).
 *
 * Desktop: fixed 64px topbar + 248px sidebar + content.
 * Tablet/mobile: the sidebar becomes an off-canvas drawer - a genuinely
 * different layout, not a shrunken desktop (section 55).
 */
export class AdminLayoutComponent {
    auth = inject(AuthService);
    setupStatus = inject(SetupStatusService);
    tour = inject(GuidedTourService);
    ws = inject(WebSocketService);
    setupBadge = this.setupStatus.badge;
    setupIncomplete = this.setupStatus.incomplete;
    user = this.auth.currentUser;
    drawerOpen = signal(false);
    searchTerm = signal('');
    /**
     * « Configuration système » dans le pied de la barre latérale, juste avant
     * « Reprendre le guide ». Même garde que la route (SCHOOL_VIEW) pour que
     * le lien et l'écran restent cohérents.
     */
    canSeeSystemConfig = computed(() => this.auth.has(PERMISSIONS.SCHOOL_VIEW));
    allItems = [
        // ─────────────────────────────────────────────────────── Pilotage
        { section: 'Pilotage', label: 'Tableau de bord', route: '/dashboard', icon: '▤',
            permissions: [PERMISSIONS.DASHBOARD_VIEW], ready: true },
        { section: 'Pilotage', label: 'Configuration', route: '/setup', icon: '◑',
            badge: () => this.setupBadge(), ready: true },
        { section: 'Pilotage', label: 'Rapports', route: '/reports', icon: '▧',
            permissions: [PERMISSIONS.REPORT_VIEW], ready: true },
        { section: 'Pilotage', label: 'Alertes', route: '/alerts', icon: '⚡',
            permissions: [PERMISSIONS.ALERT_VIEW], ready: true },
        // ─────────────────────────────────────────────────────── Scolarité
        // Le travail réel d'un secrétariat : constituer un dossier, l'inscrire,
        // le suivre, le clore. Chaque entrée correspond à un acte qui laisse
        // une trace administrative.
        { section: 'Scolarité', label: 'Historique des élèves', route: '/students', icon: '◍',
            permissions: [PERMISSIONS.STUDENT_VIEW], ready: true },
        // Les pièces officielles produites par l'établissement : édition,
        // traçabilité, réimpression et révocation au même endroit.
        { section: 'Scolarité', label: 'Documents officiels', route: '/student-files', icon: '▤',
            permissions: [PERMISSIONS.DOCUMENT_VIEW] },
        { section: 'Scolarité', label: 'Admissions', route: '/admissions', icon: '◐',
            permissions: [PERMISSIONS.ADMISSION_VIEW], ready: true },
        { section: 'Scolarité', label: 'Inscriptions', route: '/enrollments', icon: '✓',
            permissions: [PERMISSIONS.ENROLLMENT_VIEW], ready: true },
        // Fin d'année : qui passe, qui redouble, qui s'oriente ailleurs.
        { section: 'Scolarité', label: 'Passage et réinscription', route: '/promotions',
            icon: '↻', permissions: ['PROMOTION_DECIDE'] },
        // Mouvements en cours d'année : arrivée d'un autre établissement,
        // départ, radiation. C'est ce qui produit l'exeat et le certificat
        // de radiation que réclame l'école d'accueil.
        { section: 'Scolarité', label: 'Transferts et départs', route: '/transfers', icon: '⇄',
            permissions: [PERMISSIONS.ENROLLMENT_VIEW], ready: true },
        { section: 'Scolarité', label: 'Responsables légaux', route: '/guardians', icon: '◎',
            permissions: ['GUARDIAN_VIEW'] },
        // Visites médicales, allergies, traitements en cours. L'infirmerie a
        // besoin de l'information au moment où l'enfant se présente, pas d'un
        // classeur au secrétariat.
        { section: 'Scolarité', label: 'Santé scolaire', route: '/health', icon: '✚',
            permissions: [PERMISSIONS.HEALTH_ALERT_VIEW], ready: true },
        // Ce que les familles réclament, en file d'attente à traiter.
        { section: 'Scolarité', label: 'Demandes des familles', route: '/requests', icon: '◑',
            permissions: [PERMISSIONS.DOCUMENT_VIEW], ready: true },
        { section: 'Scolarité', label: 'Import de listes', route: '/imports', icon: '⇪',
            permissions: [PERMISSIONS.IMPORT_EXECUTE], ready: true },
        // ────────────────────────────────────────────────────── Pédagogie
        { section: 'Pédagogie', label: 'Classes', route: '/classes', icon: '▦',
            permissions: [PERMISSIONS.CLASS_VIEW], ready: true },
        { section: 'Pédagogie', label: 'Matières et programme', route: '/subjects', icon: '◈',
            permissions: ['SUBJECT_VIEW'], ready: true },
        { section: 'Pédagogie', label: 'Emploi du temps', route: '/timetable', icon: '▥',
            permissions: [PERMISSIONS.TIMETABLE_VIEW], ready: true },
        { section: 'Pédagogie', label: 'Présences', route: '/attendance', icon: '◇',
            permissions: [PERMISSIONS.ATTENDANCE_VIEW], ready: true },
        { section: 'Pédagogie', label: 'Évaluations', route: '/assessments', icon: '◆',
            permissions: [PERMISSIONS.ASSESSMENT_VIEW], ready: true },
        { section: 'Pédagogie', label: 'Notes', route: '/grades', icon: '◉',
            permissions: [PERMISSIONS.GRADE_VIEW], ready: true },
        { section: 'Pédagogie', label: 'Bulletins', route: '/report-cards', icon: '▣',
            permissions: [PERMISSIONS.REPORT_CARD_VIEW], ready: true },
        { section: 'Pédagogie', label: 'Conseils de classe', route: '/councils', icon: '◔',
            permissions: ['COUNCIL_VIEW'] },
        { section: 'Pédagogie', label: 'Discipline', route: '/discipline', icon: '⚠',
            permissions: ['DISCIPLINE_VIEW'], ready: true },
        // ──────────────────────────────────────────────────────── Finance
        { section: 'Finance', label: 'Plan de facturation', route: '/finance', icon: '◫',
            permissions: [PERMISSIONS.FINANCE_VIEW], ready: true },
        { section: 'Finance', label: 'Encaissements', route: '/payments', icon: '◧',
            permissions: [PERMISSIONS.PAYMENT_VIEW] },
        { section: 'Finance', label: 'Caisse', route: '/cash', icon: '◨',
            permissions: [PERMISSIONS.CASH_SESSION_MANAGE], ready: true },
        { section: 'Finance', label: 'Remises et bourses', route: '/discounts', icon: '◪',
            permissions: [PERMISSIONS.DISCOUNT_REQUEST_VIEW, PERMISSIONS.DISCOUNT_REQUEST_MANAGE], ready: true },
        { section: 'Finance', label: 'Impayés', route: '/outstanding', icon: '◰',
            permissions: [PERMISSIONS.FINANCE_VIEW], ready: true },
        { section: 'Finance', label: 'Paramètres', route: '/finance-config', icon: '⚙',
            permissions: [PERMISSIONS.FINANCE_MANAGE] },
        // ───────────────────────────────────────────── Personnel et accès
        { section: 'Personnel et accès', label: 'Enseignants', route: '/teachers', icon: '◍',
            permissions: [PERMISSIONS.TEACHER_VIEW] },
        { section: 'Personnel et accès', label: 'Utilisateurs', route: '/users', icon: '◒',
            permissions: [PERMISSIONS.USER_MANAGE], ready: true },
        { section: 'Personnel et accès', label: 'Profils d’accès', route: '/access-profiles', icon: '◒',
            permissions: [PERMISSIONS.ROLE_MANAGE], ready: true },
        { section: 'Personnel et accès', label: 'Journal d\'audit', route: '/audit', icon: '▨',
            permissions: [PERMISSIONS.AUDIT_VIEW], ready: true },
        // ─────────────────────────────────────────────────── Communication
        // Aucune permission : c'est ma boîte de réception, pas un écran
        // d'administration. L'exiger priverait de leurs propres messages les
        // parents et les élèves, à qui l'on ne donne évidemment aucun droit
        // d'administration — or ce sont eux les premiers destinataires.
        { section: 'Communication', label: 'Messages', route: '/notifications', icon: '✉',
            ready: true },
        { section: 'Communication', label: 'Portail des familles', route: '/portals', icon: '◉',
            permissions: ['SCHOOL_VIEW'] },
        // ─────────────────────────────────────────────────── Établissement
        { section: 'Établissement', label: 'Paramètres', route: '/administration', icon: '◌',
            permissions: ['SCHOOL_VIEW'] },
        { section: 'Établissement', label: 'Années et périodes', route: '/academic-years',
            icon: '◷', permissions: [PERMISSIONS.ACADEMIC_YEAR_VIEW], ready: true },
        { section: 'Établissement', label: 'Fournitures scolaires', route: '/supplies', icon: '▤',
            permissions: [PERMISSIONS.LEVEL_VIEW], ready: true },
        { section: 'Établissement', label: 'Cycles et niveaux', route: '/levels', icon: '◱',
            permissions: [PERMISSIONS.LEVEL_VIEW], ready: true },
        { section: 'Établissement', label: 'Campus et salles', route: '/campus', icon: '⌂',
            permissions: [PERMISSIONS.CAMPUS_VIEW], ready: true },
        // Les bâtiments, les étages et les capacités : ce que l'emploi du temps
        // réserve. Séparé de « Campus » parce que les droits diffèrent — un
        // gestionnaire de salles n'administre pas forcément les sites.
        { section: 'Établissement', label: 'Bâtiments et salles', route: '/rooms', icon: '▤',
            permissions: [PERMISSIONS.ROOM_VIEW], ready: true }
    ];
    /**
     * Sections repliées par l'utilisateur.
     *
     * <p>Sept sections et une trentaine d'entrées ne tiennent pas à l'écran d'un portable.
     * Le choix est conservé d'une session à l'autre : un comptable qui replie la
     * pédagogie ne veut pas la rouvrir à chaque connexion.</p>
     */
    static COLLAPSE_KEY = 'eduops.nav.collapsed';
    collapsed = signal(this.readCollapsed());
    readCollapsed() {
        try {
            const raw = localStorage.getItem(AdminLayoutComponent.COLLAPSE_KEY);
            return raw ? JSON.parse(raw) : [];
        }
        catch {
            return [];
        }
    }
    isCollapsed(section) {
        return this.collapsed().includes(section);
    }
    toggleSection(section) {
        this.collapsed.update((list) => {
            const next = list.includes(section)
                ? list.filter((s) => s !== section)
                : [...list, section];
            try {
                localStorage.setItem(AdminLayoutComponent.COLLAPSE_KEY, JSON.stringify(next));
            }
            catch {
                // Navigation privée ou stockage plein : le repli reste valable
                // pour la session, il ne sera simplement pas mémorisé.
            }
            return next;
        });
    }
    /** Only the entries the account may actually reach. */
    navigation = computed(() => {
        const visible = this.allItems.filter((item) => !item.permissions || this.auth.hasAny(...item.permissions));
        const grouped = new Map();
        visible.forEach((item) => {
            const list = grouped.get(item.section) ?? [];
            list.push(item);
            grouped.set(item.section, list);
        });
        return Array.from(grouped, ([section, items]) => ({ section, items }));
    });
    ngOnInit() {
        // Feeds the sidebar badge and the dashboard reminder.
        this.setupStatus.refresh();
        // The opening step is centred, so the page is laid out before the first
        // highlighted element is requested. Starting now also prevents two help
        // dialogs from opening during the initial navigation.
        this.tour.start(this.tour.dashboardTour);
    }
    /** "Reprendre le guide" in the sidebar footer. */
    replayTour() {
        this.closeDrawer();
        this.tour.start(this.tour.dashboardTour, true);
    }
    toggleDrawer() {
        this.drawerOpen.update((open) => !open);
    }
    closeDrawer() {
        this.drawerOpen.set(false);
    }
    logout() {
        this.auth.logout();
    }
    static ɵfac = function AdminLayoutComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminLayoutComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminLayoutComponent, selectors: [["eduops-admin-layout"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 53, vars: 12, consts: [[1, "shell"], [1, "topbar"], ["type", "button", "aria-label", "Ouvrir le menu", 1, "topbar__burger", 3, "click"], ["aria-hidden", "true"], ["routerLink", "/dashboard", 1, "topbar__brand"], ["src", "assets/branding/soocloo-logo.png", "alt", "Soocloo", "width", "160", "height", "60", 1, "soocloo-logo"], ["role", "search", 1, "search", 3, "submit"], ["for", "global-search", 1, "visually-hidden"], ["aria-hidden", "true", 1, "search__icon"], ["id", "global-search", "type", "search", "placeholder", "Rechercher un \u00E9l\u00E8ve, un matricule, une classe, un re\u00E7u...", 1, "search__input", 3, "input", "value"], [1, "topbar__actions"], ["aria-hidden", "true", 1, "ws-indicator"], ["type", "button", "aria-label", "Notifications", 1, "icon-btn"], ["aria-hidden", "true", 1, "icon-btn__dot"], [1, "user"], ["size", "sm", 3, "name"], [1, "user__meta"], [1, "user__name"], [1, "user__role"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], [1, "sidebar"], ["aria-label", "Navigation principale", 1, "sidebar__nav"], [1, "sidebar__group", 3, "sidebar__group--collapsed"], [1, "sidebar__help"], ["routerLink", "/system-config", "routerLinkActive", "sidebar__link--active", "ariaCurrentWhenActive", "page", 1, "sidebar__link"], ["type", "button", 1, "sidebar__link", "sidebar__link--button", 3, "click"], ["aria-hidden", "true", 1, "sidebar__icon"], ["routerLink", "/setup", 1, "sidebar__link", 3, "click"], ["routerLink", "/roadmap", "routerLinkActive", "sidebar__link--active", "ariaCurrentWhenActive", "page", 1, "sidebar__link", 3, "click"], [1, "scrim", 3, "click"], ["id", "main-content", "tabindex", "-1", 1, "content"], [1, "sidebar__group"], ["type", "button", 1, "sidebar__section", 3, "click"], ["aria-hidden", "true", 1, "sidebar__chevron"], ["routerLinkActive", "sidebar__link--active", 1, "sidebar__link", 3, "routerLink", "sidebar__link--soon"], ["routerLinkActive", "sidebar__link--active", 1, "sidebar__link", 3, "click", "routerLink"], [1, "sidebar__label"], [1, "sidebar__badge", "numeric"], ["title", "\u00C9cran \u00E0 venir", "aria-hidden", "true", 1, "sidebar__soon"], [1, "visually-hidden"], ["routerLink", "/system-config", "routerLinkActive", "sidebar__link--active", "ariaCurrentWhenActive", "page", 1, "sidebar__link", 3, "click"]], template: function AdminLayoutComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "button", 2);
            i0.ɵɵlistener("click", function AdminLayoutComponent_Template_button_click_2_listener() { return ctx.toggleDrawer(); });
            i0.ɵɵelementStart(3, "span", 3);
            i0.ɵɵtext(4, "\u2630");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(5, "a", 4);
            i0.ɵɵelement(6, "img", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "form", 6);
            i0.ɵɵlistener("submit", function AdminLayoutComponent_Template_form_submit_7_listener($event) { return $event.preventDefault(); });
            i0.ɵɵelementStart(8, "label", 7);
            i0.ɵɵtext(9, "Recherche globale");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 8);
            i0.ɵɵtext(11, "\u2315");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "input", 9);
            i0.ɵɵlistener("input", function AdminLayoutComponent_Template_input_input_12_listener($event) { return ctx.searchTerm.set($event.target.value); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 10);
            i0.ɵɵelement(14, "span", 11);
            i0.ɵɵelementStart(15, "button", 12)(16, "span", 3);
            i0.ɵɵtext(17, "\u25D4");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(18, "span", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 14);
            i0.ɵɵelement(20, "eduops-avatar", 15);
            i0.ɵɵelementStart(21, "div", 16)(22, "span", 17);
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span", 18);
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "button", 19);
            i0.ɵɵlistener("click", function AdminLayoutComponent_Template_button_click_26_listener() { return ctx.logout(); });
            i0.ɵɵtext(27, "D\u00E9connexion");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(28, "aside", 20)(29, "nav", 21);
            i0.ɵɵrepeaterCreate(30, AdminLayoutComponent_For_31_Template, 7, 6, "div", 22, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 23);
            i0.ɵɵtemplate(33, AdminLayoutComponent_Conditional_33_Template, 5, 0, "a", 24);
            i0.ɵɵelementStart(34, "button", 25);
            i0.ɵɵlistener("click", function AdminLayoutComponent_Template_button_click_34_listener() { return ctx.replayTour(); });
            i0.ɵɵelementStart(35, "span", 26);
            i0.ɵɵtext(36, "\u25CE");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "span");
            i0.ɵɵtext(38, "Reprendre le guide");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "a", 27);
            i0.ɵɵlistener("click", function AdminLayoutComponent_Template_a_click_39_listener() { return ctx.closeDrawer(); });
            i0.ɵɵelementStart(40, "span", 26);
            i0.ɵɵtext(41, "\u25D1");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "span");
            i0.ɵɵtext(43, "\u00C9tat de la configuration");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(44, "a", 28);
            i0.ɵɵlistener("click", function AdminLayoutComponent_Template_a_click_44_listener() { return ctx.closeDrawer(); });
            i0.ɵɵelementStart(45, "span", 26);
            i0.ɵɵtext(46, "\u2197");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "span");
            i0.ɵɵtext(48, "Roadmap \u2014 Guide");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(49, "div", 29);
            i0.ɵɵlistener("click", function AdminLayoutComponent_Template_div_click_49_listener() { return ctx.closeDrawer(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "main", 30);
            i0.ɵɵelement(51, "router-outlet");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(52, "eduops-guided-tour");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_5_0;
            let tmp_6_0;
            let tmp_7_0;
            i0.ɵɵclassProp("shell--drawer-open", ctx.drawerOpen());
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("aria-expanded", ctx.drawerOpen());
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("value", ctx.searchTerm());
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap("ws-indicator--" + ctx.ws.state());
            i0.ɵɵattribute("title", "Temps reel : " + ctx.ws.state());
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("name", (tmp_5_0 = (tmp_5_0 = ctx.user()) == null ? null : tmp_5_0.fullName) !== null && tmp_5_0 !== undefined ? tmp_5_0 : "");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate((tmp_6_0 = ctx.user()) == null ? null : tmp_6_0.fullName);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate((tmp_7_0 = ctx.user()) == null ? null : tmp_7_0.roles == null ? null : tmp_7_0.roles[0]);
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("aria-hidden", !ctx.drawerOpen() && null);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.navigation());
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.canSeeSystemConfig() ? 33 : -1);
        } }, dependencies: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AvatarComponent,
            GuidedTourComponent], styles: ["@import 'styles/tokens';\n\n.shell[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: var(--surface-page);\n}\n\n\n\n.topbar[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0 0 auto 0;\n  height: var(--topbar-height);\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: 0 var(--space-5);\n  background: var(--surface-card);\n  border-bottom: 1px solid var(--border);\n  z-index: var(--z-topbar);\n}\n\n.topbar__burger[_ngcontent-%COMP%] {\n  display: none;\n  background: none;\n  border: 0;\n  font-size: 20px;\n  cursor: pointer;\n  color: var(--text-normal);\n  padding: var(--space-2);\n}\n\n.topbar__brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  text-decoration: none;\n  min-width: 180px;\n}\n\n.topbar__logo[_ngcontent-%COMP%] {\n  width: 32px; height: 32px;\n  display: grid; place-items: center;\n  background: var(--brand);\n  color: #fff;\n  border-radius: 9px;\n  font-family: var(--font-display);\n  font-weight: 800;\n}\n\n.topbar__name[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: var(--text-lg);\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: var(--text-strong);\n}\n\n.search[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  max-width: 560px;\n}\n\n.search__icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px; top: 50%;\n  transform: translateY(-50%);\n  color: var(--text-light);\n  font-size: 16px;\n}\n\n.search__input[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 38px;\n  padding: 0 var(--space-3) 0 34px;\n  font-size: var(--text-base);\n  background: var(--surface-sunken);\n  border: 1px solid transparent;\n  border-radius: var(--radius-input);\n  color: var(--text-strong);\n}\n\n.search__input[_ngcontent-%COMP%]:focus {\n  background: var(--surface-card);\n  border-color: var(--brand);\n  box-shadow: 0 0 0 3px var(--brand-tint);\n  outline: none;\n}\n\n.topbar__actions[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); margin-left: auto; }\n\n.ws-indicator[_ngcontent-%COMP%] {\n  width: 8px; height: 8px; border-radius: 50%;\n  background: var(--text-light);\n}\n.ws-indicator--connected[_ngcontent-%COMP%] { background: var(--success); }\n.ws-indicator--connecting[_ngcontent-%COMP%], \n.ws-indicator--reconnecting[_ngcontent-%COMP%] { background: var(--warning); }\n.ws-indicator--disconnected[_ngcontent-%COMP%] { background: var(--danger); }\n\n.icon-btn[_ngcontent-%COMP%] {\n  position: relative;\n  width: 38px; height: 38px;\n  display: grid; place-items: center;\n  background: none;\n  border: 1px solid var(--border);\n  border-radius: var(--radius-button);\n  cursor: pointer;\n  color: var(--text-normal);\n}\n.icon-btn__dot[_ngcontent-%COMP%] {\n  position: absolute; top: 7px; right: 8px;\n  width: 7px; height: 7px; border-radius: 50%;\n  background: var(--danger);\n  border: 2px solid var(--surface-card);\n}\n\n.user[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-2); }\n.user__meta[_ngcontent-%COMP%] { display: flex; flex-direction: column; line-height: 1.25; }\n.user__name[_ngcontent-%COMP%] { font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); }\n.user__role[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--text-muted); }\n\n\n\n.sidebar[_ngcontent-%COMP%] {\n  position: fixed;\n  top: var(--topbar-height);\n  bottom: 0;\n  left: 0;\n  width: var(--sidebar-width);\n  background: var(--surface-card);\n  border-right: 1px solid var(--border);\n  overflow-y: auto;\n  z-index: var(--z-sidebar);\n  padding: var(--space-4) 0 var(--space-8);\n}\n\n.sidebar__group[_ngcontent-%COMP%] { margin-bottom: var(--space-5); }\n\n.sidebar__section[_ngcontent-%COMP%] {\n  padding: 0 var(--space-5);\n  margin: 0 0 var(--space-2);\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--text-light);\n}\n\n.sidebar__link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  padding: 8px var(--space-4) 8px var(--space-5);\n  font-size: var(--text-base);\n  font-weight: 500;\n  color: var(--text-normal);\n  text-decoration: none;\n  border-left: 3px solid transparent;\n  transition: background var(--transition-fast), color var(--transition-fast);\n}\n\n.sidebar__link[_ngcontent-%COMP%]:hover { background: var(--surface-hover); text-decoration: none; }\n\n.sidebar__link--active[_ngcontent-%COMP%] {\n  background: var(--brand-tint);\n  color: var(--brand);\n  border-left-color: var(--brand);\n  font-weight: 600;\n}\n\n.sidebar__icon[_ngcontent-%COMP%] { flex: none; width: 18px; text-align: center; opacity: 0.75;\n  line-height: 1.3; }\n\n\n\n.content[_ngcontent-%COMP%] {\n  margin-left: var(--sidebar-width);\n  padding-top: var(--topbar-height);\n  min-height: 100vh;\n}\n\n.scrim[_ngcontent-%COMP%] { display: none; }\n\n\n\n@include tablet-down {\n  .topbar__burger { display: block; }\n  .topbar__name { display: none; }\n  .topbar__brand { min-width: auto; }\n  .user__meta { display: none; }\n\n  .sidebar {\n    transform: translateX(-100%);\n    transition: transform var(--transition-base);\n    box-shadow: var(--shadow-lg);\n  }\n\n  .shell--drawer-open .sidebar { transform: translateX(0); }\n\n  .shell--drawer-open .scrim {\n    display: block;\n    position: fixed;\n    inset: var(--topbar-height) 0 0 0;\n    background: rgba(27, 36, 53, 0.4);\n    z-index: calc(var(--z-sidebar) - 1);\n  }\n\n  .content { margin-left: 0; }\n}\n\n@include mobile {\n  .topbar { padding: 0 var(--space-3); gap: var(--space-2); }\n  .search__input::placeholder { content: 'Rechercher...'; }\n}\n\n\n\n.sidebar__badge[_ngcontent-%COMP%] {\n  margin-left: auto;\n  padding: 2px 8px;\n  border-radius: var(--radius-pill);\n  background: var(--warning-bg);\n  color: var(--warning);\n  font-size: 11px;\n  font-weight: 700;\n}\n.sidebar__link--active[_ngcontent-%COMP%]   .sidebar__badge[_ngcontent-%COMP%] { background: #fff; }\n\n\n\n.sidebar__help[_ngcontent-%COMP%] {\n  margin-top: var(--space-6);\n  padding-top: var(--space-4);\n  border-top: 1px solid var(--border-light);\n}\n.sidebar__link--button[_ngcontent-%COMP%] {\n  width: 100%;\n  background: none;\n  border: 0;\n  border-left: 3px solid transparent;\n  cursor: pointer;\n  font: inherit;\n  text-align: left;\n}\n\n\n\n\n.sidebar__section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  padding: var(--space-2) var(--space-3);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  letter-spacing: .04em;\n  text-transform: uppercase;\n  color: var(--text-light);\n  background: none;\n  border: none;\n  cursor: pointer;\n\n  &:hover { color: var(--text-muted); }\n}\n\n.sidebar__chevron[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  line-height: 1;\n  opacity: .6;\n}\n\n\n\n\n\n\n\n\n\n.sidebar__label[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  white-space: normal;\n  overflow-wrap: break-word;\n  line-height: 1.3;\n}\n\n\n\n.sidebar__link--soon[_ngcontent-%COMP%]   .sidebar__label[_ngcontent-%COMP%], \n.sidebar__link--soon[_ngcontent-%COMP%]   .sidebar__icon[_ngcontent-%COMP%] { opacity: .55; }\n\n\n\n\n\n\n\n\n\n.sidebar__soon[_ngcontent-%COMP%] {\n  flex: none;\n  align-self: center;\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: var(--border-strong);\n}\n\n.sidebar__group--collapsed[_ngcontent-%COMP%] { margin-bottom: var(--space-1); }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminLayoutComponent, [{
        type: Component,
        args: [{ selector: 'eduops-admin-layout', standalone: true, imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, AvatarComponent,
                    GuidedTourComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"shell\" [class.shell--drawer-open]=\"drawerOpen()\">\n\n  <!-- ============ Topbar (64px) ============ -->\n  <header class=\"topbar\">\n    <button type=\"button\" class=\"topbar__burger\" aria-label=\"Ouvrir le menu\"\n            [attr.aria-expanded]=\"drawerOpen()\" (click)=\"toggleDrawer()\">\n      <span aria-hidden=\"true\">\u2630</span>\n    </button>\n\n    <a class=\"topbar__brand\" routerLink=\"/dashboard\">\n      <img class=\"soocloo-logo\" src=\"assets/branding/soocloo-logo.png\" alt=\"Soocloo\" width=\"160\" height=\"60\">\n    </a>\n\n    <!-- Global search: matricule, eleve, parent, enseignant, classe, recu (section 60) -->\n    <form class=\"search\" role=\"search\" (submit)=\"$event.preventDefault()\">\n      <label class=\"visually-hidden\" for=\"global-search\">Recherche globale</label>\n      <span class=\"search__icon\" aria-hidden=\"true\">\u2315</span>\n      <input id=\"global-search\" class=\"search__input\" type=\"search\"\n             placeholder=\"Rechercher un \u00E9l\u00E8ve, un matricule, une classe, un re\u00E7u...\"\n             [value]=\"searchTerm()\"\n             (input)=\"searchTerm.set($any($event.target).value)\" />\n    </form>\n\n    <div class=\"topbar__actions\">\n      <span class=\"ws-indicator\" [class]=\"'ws-indicator--' + ws.state()\"\n            [attr.title]=\"'Temps reel : ' + ws.state()\" aria-hidden=\"true\"></span>\n\n      <button type=\"button\" class=\"icon-btn\" aria-label=\"Notifications\">\n        <span aria-hidden=\"true\">\u25D4</span>\n        <span class=\"icon-btn__dot\" aria-hidden=\"true\"></span>\n      </button>\n\n      <div class=\"user\">\n        <eduops-avatar [name]=\"user()?.fullName ?? ''\" size=\"sm\" />\n        <div class=\"user__meta\">\n          <span class=\"user__name\">{{ user()?.fullName }}</span>\n          <span class=\"user__role\">{{ user()?.roles?.[0] }}</span>\n        </div>\n        <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"logout()\">D\u00E9connexion</button>\n      </div>\n    </div>\n  </header>\n\n  <!-- ============ Sidebar (248px) ============ -->\n  <aside class=\"sidebar\" [attr.aria-hidden]=\"!drawerOpen() && null\">\n    <nav class=\"sidebar__nav\" aria-label=\"Navigation principale\">\n      @for (group of navigation(); track group.section) {\n        <div class=\"sidebar__group\" [class.sidebar__group--collapsed]=\"isCollapsed(group.section)\">\n          <button type=\"button\" class=\"sidebar__section\"\n                  [attr.aria-expanded]=\"!isCollapsed(group.section)\"\n                  (click)=\"toggleSection(group.section)\">\n            <span>{{ group.section }}</span>\n            <span class=\"sidebar__chevron\" aria-hidden=\"true\">\n              {{ isCollapsed(group.section) ? '+' : '\u2212' }}\n            </span>\n          </button>\n\n          @if (!isCollapsed(group.section)) {\n            @for (item of group.items; track item.route) {\n              <a class=\"sidebar__link\" [routerLink]=\"item.route\"\n                 [class.sidebar__link--soon]=\"!item.ready\"\n                 routerLinkActive=\"sidebar__link--active\" (click)=\"closeDrawer()\">\n                <span class=\"sidebar__icon\" aria-hidden=\"true\">{{ item.icon }}</span>\n                <span class=\"sidebar__label\">{{ item.label }}</span>\n                @if (item.badge && item.badge(); as badge) {\n                  <span class=\"sidebar__badge numeric\"\n                        [attr.aria-label]=\"'Configuration : ' + badge + ' \u00E9tapes'\">{{ badge }}</span>\n                } @else if (!item.ready) {\n                  <span class=\"sidebar__soon\" title=\"\u00C9cran \u00E0 venir\" aria-hidden=\"true\"></span>\n                  <span class=\"visually-hidden\">\u00C9cran \u00E0 venir</span>\n                }\n              </a>\n            }\n          }\n        </div>\n      }\n    </nav>\n\n    <!-- Aide, toujours accessible en bas de la barre laterale -->\n    <div class=\"sidebar__help\">\n      @if (canSeeSystemConfig()) {\n        <a class=\"sidebar__link\" routerLink=\"/system-config\"\n           routerLinkActive=\"sidebar__link--active\" ariaCurrentWhenActive=\"page\"\n           (click)=\"closeDrawer()\">\n          <span class=\"sidebar__icon\" aria-hidden=\"true\">\u2699</span>\n          <span>Configuration syst\u00E8me</span>\n        </a>\n      }\n      <button type=\"button\" class=\"sidebar__link sidebar__link--button\" (click)=\"replayTour()\">\n        <span class=\"sidebar__icon\" aria-hidden=\"true\">\u25CE</span>\n        <span>Reprendre le guide</span>\n      </button>\n      <a class=\"sidebar__link\" routerLink=\"/setup\" (click)=\"closeDrawer()\">\n        <span class=\"sidebar__icon\" aria-hidden=\"true\">\u25D1</span>\n        <span>\u00C9tat de la configuration</span>\n      </a>\n      <a class=\"sidebar__link\" routerLink=\"/roadmap\"\n         routerLinkActive=\"sidebar__link--active\" ariaCurrentWhenActive=\"page\"\n         (click)=\"closeDrawer()\">\n        <span class=\"sidebar__icon\" aria-hidden=\"true\">\u2197</span>\n        <span>Roadmap \u2014 Guide</span>\n      </a>\n    </div>\n  </aside>\n\n  <div class=\"scrim\" (click)=\"closeDrawer()\"></div>\n\n  <!-- ============ Content ============ -->\n  <main class=\"content\" id=\"main-content\" tabindex=\"-1\">\n    <router-outlet />\n  </main>\n\n  <!-- Visite guidee : superposee, au-dessus de tout -->\n  <eduops-guided-tour />\n</div>\n", styles: ["@import 'styles/tokens';\n\n.shell {\n  min-height: 100vh;\n  background: var(--surface-page);\n}\n\n/* ---------------- Topbar ---------------- */\n.topbar {\n  position: fixed;\n  inset: 0 0 auto 0;\n  height: var(--topbar-height);\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: 0 var(--space-5);\n  background: var(--surface-card);\n  border-bottom: 1px solid var(--border);\n  z-index: var(--z-topbar);\n}\n\n.topbar__burger {\n  display: none;\n  background: none;\n  border: 0;\n  font-size: 20px;\n  cursor: pointer;\n  color: var(--text-normal);\n  padding: var(--space-2);\n}\n\n.topbar__brand {\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  text-decoration: none;\n  min-width: 180px;\n}\n\n.topbar__logo {\n  width: 32px; height: 32px;\n  display: grid; place-items: center;\n  background: var(--brand);\n  color: #fff;\n  border-radius: 9px;\n  font-family: var(--font-display);\n  font-weight: 800;\n}\n\n.topbar__name {\n  font-family: var(--font-display);\n  font-size: var(--text-lg);\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: var(--text-strong);\n}\n\n.search {\n  position: relative;\n  flex: 1;\n  max-width: 560px;\n}\n\n.search__icon {\n  position: absolute;\n  left: 12px; top: 50%;\n  transform: translateY(-50%);\n  color: var(--text-light);\n  font-size: 16px;\n}\n\n.search__input {\n  width: 100%;\n  height: 38px;\n  padding: 0 var(--space-3) 0 34px;\n  font-size: var(--text-base);\n  background: var(--surface-sunken);\n  border: 1px solid transparent;\n  border-radius: var(--radius-input);\n  color: var(--text-strong);\n}\n\n.search__input:focus {\n  background: var(--surface-card);\n  border-color: var(--brand);\n  box-shadow: 0 0 0 3px var(--brand-tint);\n  outline: none;\n}\n\n.topbar__actions { display: flex; align-items: center; gap: var(--space-3); margin-left: auto; }\n\n.ws-indicator {\n  width: 8px; height: 8px; border-radius: 50%;\n  background: var(--text-light);\n}\n.ws-indicator--connected { background: var(--success); }\n.ws-indicator--connecting,\n.ws-indicator--reconnecting { background: var(--warning); }\n.ws-indicator--disconnected { background: var(--danger); }\n\n.icon-btn {\n  position: relative;\n  width: 38px; height: 38px;\n  display: grid; place-items: center;\n  background: none;\n  border: 1px solid var(--border);\n  border-radius: var(--radius-button);\n  cursor: pointer;\n  color: var(--text-normal);\n}\n.icon-btn__dot {\n  position: absolute; top: 7px; right: 8px;\n  width: 7px; height: 7px; border-radius: 50%;\n  background: var(--danger);\n  border: 2px solid var(--surface-card);\n}\n\n.user { display: flex; align-items: center; gap: var(--space-2); }\n.user__meta { display: flex; flex-direction: column; line-height: 1.25; }\n.user__name { font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); }\n.user__role { font-size: var(--text-xs); color: var(--text-muted); }\n\n/* ---------------- Sidebar ---------------- */\n.sidebar {\n  position: fixed;\n  top: var(--topbar-height);\n  bottom: 0;\n  left: 0;\n  width: var(--sidebar-width);\n  background: var(--surface-card);\n  border-right: 1px solid var(--border);\n  overflow-y: auto;\n  z-index: var(--z-sidebar);\n  padding: var(--space-4) 0 var(--space-8);\n}\n\n.sidebar__group { margin-bottom: var(--space-5); }\n\n.sidebar__section {\n  padding: 0 var(--space-5);\n  margin: 0 0 var(--space-2);\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: var(--text-light);\n}\n\n.sidebar__link {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--space-3);\n  padding: 8px var(--space-4) 8px var(--space-5);\n  font-size: var(--text-base);\n  font-weight: 500;\n  color: var(--text-normal);\n  text-decoration: none;\n  border-left: 3px solid transparent;\n  transition: background var(--transition-fast), color var(--transition-fast);\n}\n\n.sidebar__link:hover { background: var(--surface-hover); text-decoration: none; }\n\n.sidebar__link--active {\n  background: var(--brand-tint);\n  color: var(--brand);\n  border-left-color: var(--brand);\n  font-weight: 600;\n}\n\n.sidebar__icon { flex: none; width: 18px; text-align: center; opacity: 0.75;\n  line-height: 1.3; }\n\n/* ---------------- Content ---------------- */\n.content {\n  margin-left: var(--sidebar-width);\n  padding-top: var(--topbar-height);\n  min-height: 100vh;\n}\n\n.scrim { display: none; }\n\n/* ---------------- Tablet / mobile ---------------- */\n@include tablet-down {\n  .topbar__burger { display: block; }\n  .topbar__name { display: none; }\n  .topbar__brand { min-width: auto; }\n  .user__meta { display: none; }\n\n  .sidebar {\n    transform: translateX(-100%);\n    transition: transform var(--transition-base);\n    box-shadow: var(--shadow-lg);\n  }\n\n  .shell--drawer-open .sidebar { transform: translateX(0); }\n\n  .shell--drawer-open .scrim {\n    display: block;\n    position: fixed;\n    inset: var(--topbar-height) 0 0 0;\n    background: rgba(27, 36, 53, 0.4);\n    z-index: calc(var(--z-sidebar) - 1);\n  }\n\n  .content { margin-left: 0; }\n}\n\n@include mobile {\n  .topbar { padding: 0 var(--space-3); gap: var(--space-2); }\n  .search__input::placeholder { content: 'Rechercher...'; }\n}\n\n/* Badge de progression de la configuration */\n.sidebar__badge {\n  margin-left: auto;\n  padding: 2px 8px;\n  border-radius: var(--radius-pill);\n  background: var(--warning-bg);\n  color: var(--warning);\n  font-size: 11px;\n  font-weight: 700;\n}\n.sidebar__link--active .sidebar__badge { background: #fff; }\n\n/* Bloc d'aide, epingle en bas de la barre laterale */\n.sidebar__help {\n  margin-top: var(--space-6);\n  padding-top: var(--space-4);\n  border-top: 1px solid var(--border-light);\n}\n.sidebar__link--button {\n  width: 100%;\n  background: none;\n  border: 0;\n  border-left: 3px solid transparent;\n  cursor: pointer;\n  font: inherit;\n  text-align: left;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 Menu enrichi : sections repliables \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.sidebar__section {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  padding: var(--space-2) var(--space-3);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  letter-spacing: .04em;\n  text-transform: uppercase;\n  color: var(--text-light);\n  background: none;\n  border: none;\n  cursor: pointer;\n\n  &:hover { color: var(--text-muted); }\n}\n\n.sidebar__chevron {\n  font-size: var(--text-sm);\n  line-height: 1;\n  opacity: .6;\n}\n\n/*\n * Le libell\u00E9 est toujours lisible en entier.\n *\n * Tronquer \u00AB Certificats et attestations \u00BB en \u00AB Certificats et att... \u00BB oblige\n * \u00E0 survoler pour savoir o\u00F9 l'on va. Sur une barre lat\u00E9rale, la place se prend\n * en hauteur, pas en largeur : le texte passe \u00E0 la ligne.\n */\n.sidebar__label {\n  flex: 1;\n  min-width: 0;\n  white-space: normal;\n  overflow-wrap: break-word;\n  line-height: 1.3;\n}\n\n/* Une entr\u00E9e dont l'\u00E9cran n'existe pas encore : lisible, mais en retrait. */\n.sidebar__link--soon .sidebar__label,\n.sidebar__link--soon .sidebar__icon { opacity: .55; }\n\n/*\n * Marqueur d'\u00E9cran \u00E0 venir.\n *\n * Un simple point plut\u00F4t qu'un mot : \u00AB Bient\u00F4t \u00BB mangeait cinquante pixels de\n * largeur et faisait passer cinq libell\u00E9s sur deux lignes. Le point tient dans\n * la marge, l'infobulle et le lecteur d'\u00E9cran disent le reste.\n */\n.sidebar__soon {\n  flex: none;\n  align-self: center;\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: var(--border-strong);\n}\n\n.sidebar__group--collapsed { margin-bottom: var(--space-1); }\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminLayoutComponent, { className: "AdminLayoutComponent", filePath: "frontend/src/app/layouts/admin-layout/admin-layout.component.ts", lineNumber: 46 }); })();
//# sourceMappingURL=admin-layout.component.js.map