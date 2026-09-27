import { ChangeDetectionStrategy, Component, DestroyRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReplaySubject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CLASSROOM_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { DataTableComponent } from '@shared/ui/data-table/data-table.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { PERMISSIONS } from '@core/models/auth.models';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = ["identityTpl"];
const _c1 = ["statusTpl"];
const _c2 = ["actionsTpl"];
const _c3 = () => [5, 10, 20, 50, 100];
const _c4 = a0 => ["/students", a0];
const _c5 = () => ({ edit: true });
function StudentListComponent_Conditional_3_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const room_r2 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" \u00B7 Professeur principal : ", room_r2.mainTeacherName, " ");
} }
function StudentListComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 25);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p", 26);
    i0.ɵɵtext(3);
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6);
    i0.ɵɵtemplate(7, StudentListComponent_Conditional_3_Conditional_7_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_7_0;
    const room_r2 = ctx;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u00C9l\u00E8ves de ", room_r2.name, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", room_r2.levelName, " \u2014 ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_7_0 = (tmp_7_0 = ctx_r2.page()) == null ? null : tmp_7_0.totalElements) !== null && tmp_7_0 !== undefined ? tmp_7_0 : room_r2.activeEnrollments);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("/", room_r2.capacityMaximum, " places ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(room_r2.mainTeacherName ? 7 : -1);
} }
function StudentListComponent_Conditional_4_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx.totalElements, " \u00E9l\u00E8ve(s) enregistr\u00E9(s)");
} }
function StudentListComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 25);
    i0.ɵɵtext(1, "\u00C9l\u00E8ves");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, StudentListComponent_Conditional_4_Conditional_2_Template, 2, 1, "p", 26);
} if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_4_0 = ctx_r2.page()) ? 2 : -1, tmp_4_0);
} }
function StudentListComponent_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 27);
    i0.ɵɵlistener("click", function StudentListComponent_button_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openCreateWizard()); });
    i0.ɵɵelementStart(1, "span", 28);
    i0.ɵɵtext(2, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Nouvel \u00E9l\u00E8ve ");
    i0.ɵɵelementEnd();
} }
function StudentListComponent_Conditional_9_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Liste restreinte \u00E0 la classe ");
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, ". ");
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx.name);
} }
function StudentListComponent_Conditional_9_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Liste restreinte \u00E0 une classe. ");
} }
function StudentListComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "span", 29);
    i0.ɵɵtemplate(2, StudentListComponent_Conditional_9_Conditional_2_Template, 4, 1)(3, StudentListComponent_Conditional_9_Conditional_3_Template, 1, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "a", 30);
    i0.ɵɵtext(5, "Retour aux classes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 31);
    i0.ɵɵlistener("click", function StudentListComponent_Conditional_9_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.clearClassroom()); });
    i0.ɵɵtext(7, " Voir tous les \u00E9l\u00E8ves ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_4_0 = ctx_r2.classroom()) ? 2 : 3, tmp_4_0);
} }
function StudentListComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵelement(1, "eduops-avatar", 33);
    i0.ɵɵelementStart(2, "div")(3, "p", 34);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 35);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const student_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", student_r6.fullName)("photoUrl", student_r6.photoUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(student_r6.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(student_r6.gender === "FEMALE" ? "Fille" : "Garcon");
} }
function StudentListComponent_ng_template_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-status-badge", 36);
} if (rf & 2) {
    const student_r7 = ctx.$implicit;
    i0.ɵɵproperty("status", student_r7.status);
} }
function StudentListComponent_ng_template_39_a_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 40);
    i0.ɵɵtext(1, "Modifier");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const student_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(2, _c4, student_r9.id))("queryParams", i0.ɵɵpureFunction0(4, _c5));
} }
function StudentListComponent_ng_template_39_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵlistener("click", function StudentListComponent_ng_template_39_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r8); return i0.ɵɵresetView($event.stopPropagation()); })("keydown", function StudentListComponent_ng_template_39_Template_div_keydown_0_listener($event) { i0.ɵɵrestoreView(_r8); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(1, "a", 38);
    i0.ɵɵtext(2, "Fiche / impression");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, StudentListComponent_ng_template_39_a_3_Template, 2, 5, "a", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const student_r9 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(2, _c4, student_r9.id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("eduopsHasPermission", ctx_r2.editPermission);
} }
/** Students list with server-side search, filters and pagination. */
export class StudentListComponent {
    dataSource = inject(STUDENT_DATA_SOURCE);
    classrooms = inject(CLASSROOM_DATA_SOURCE);
    router = inject(Router);
    route = inject(ActivatedRoute);
    destroyRef = inject(DestroyRef);
    page = signal(null);
    loading = signal(true);
    search = signal('');
    statusFilter = signal('');
    currentPage = signal(0);
    /** 5 lignes par défaut, modifiable via le combo du tableau. */
    pageSize = signal(5);
    /**
     * Classe sur laquelle la liste est restreinte, venue de l'adresse.
     *
     * <p>Le bouton « Élèves » d'une fiche de classe amène ici avec son
     * identifiant. Sans cette lecture, il ouvrait l'annuaire complet — la
     * question posée était « qui est en 6e A », la réponse donnée « voici les
     * 1 284 élèves ».</p>
     */
    classroomFilter = signal(null);
    classroom = signal(null);
    createPermission = PERMISSIONS.STUDENT_CREATE;
    editPermission = PERMISSIONS.STUDENT_UPDATE;
    /**
     * Déclencheur de recherche, porteur de sa clé.
     *
     * <p>Un ReplaySubject, et non un Subject : les paramètres d'adresse arrivent
     * dès l'abonnement, donc avant que le flux de recherche ne soit branché. Avec
     * un Subject, cette première demande était perdue et la page tournait
     * indéfiniment.</p>
     *
     * <p>La clé porte les critères plutôt qu'un signal vide : {@code
     * distinctUntilChanged} peut alors écarter deux recherches identiques, au
     * lieu d'écarter <em>toutes</em> les recherches après la première.</p>
     */
    query$ = new ReplaySubject(1);
    identityTpl;
    statusTpl;
    columns = [];
    actionsTpl;
    /** Relance une recherche avec les critères courants. */
    requery() {
        this.query$.next(JSON.stringify({
            page: this.currentPage(),
            size: this.pageSize(),
            search: this.search(),
            status: this.statusFilter(),
            classroomId: this.classroomFilter()
        }));
    }
    ngOnInit() {
        this.columns = [
            { key: 'fullName', label: 'Élève', template: this.identityTpl, width: '32%' },
            { key: 'studentNumber', label: 'Matricule', numeric: true, width: '18%' },
            { key: 'classroomName', label: 'Classe', width: '15%' },
            { key: 'levelName', label: 'Niveau', width: '12%' },
            { key: 'age', label: 'Age', numeric: true, width: '8%' },
            { key: 'status', label: 'Statut', template: this.statusTpl },
            { key: 'actions', label: 'Actions', template: this.actionsTpl }
        ];
        this.query$
            .pipe(debounceTime(280), distinctUntilChanged(), switchMap(() => {
            this.loading.set(true);
            return this.dataSource.search({
                page: this.currentPage(),
                size: this.pageSize(),
                search: this.search() || undefined,
                status: this.statusFilter() || undefined,
                classroomId: this.classroomFilter() || undefined
            });
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (page) => {
                this.page.set(page);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
        // Branché en dernier, une fois le flux de recherche prêt à recevoir.
        // L'adresse est la source : revenir en arrière ou partager le lien
        // redonne la même liste.
        this.route.queryParamMap
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((params) => {
            const classroomId = params.get('classroomId');
            this.classroomFilter.set(classroomId);
            this.currentPage.set(0);
            this.resolveClassroom(classroomId);
            this.requery();
        });
    }
    /** Récupère le nom de la classe, pour l'annoncer en tête de liste. */
    resolveClassroom(classroomId) {
        if (!classroomId) {
            this.classroom.set(null);
            return;
        }
        this.classrooms.getById(classroomId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (classroom) => this.classroom.set(classroom),
            // Le filtre reste actif même si le nom n'a pas pu être lu.
            error: () => this.classroom.set(null)
        });
    }
    /** Retire la restriction de classe sans quitter l'écran. */
    clearClassroom() {
        void this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { classroomId: null },
            queryParamsHandling: 'merge'
        });
    }
    onSearchChange(value) {
        this.search.set(value);
        this.currentPage.set(0);
        this.requery();
    }
    onStatusChange(value) {
        this.statusFilter.set(value);
        this.currentPage.set(0);
        this.requery();
    }
    onPageChange(page) {
        this.currentPage.set(page);
        this.requery();
    }
    onPageSizeChange(size) {
        this.pageSize.set(size);
        this.currentPage.set(0);
        this.requery();
    }
    /**
     * Ouvre l'assistant d'inscription en mode « Nouvel élève » : la création
     * d'un élève passe toujours par une inscription (élève + responsable + classe).
     */
    openCreateWizard() {
        void this.router.navigate(['/enrollments/new'], {
            queryParams: this.classroomFilter() ? { classroomId: this.classroomFilter() } : undefined
        });
    }
    openStudent(student) {
        void this.router.navigate(['/students', student.id]);
    }
    static ɵfac = function StudentListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StudentListComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StudentListComponent, selectors: [["eduops-student-list"]], viewQuery: function StudentListComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
            i0.ɵɵviewQuery(_c1, 7);
            i0.ɵɵviewQuery(_c2, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.identityTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.statusTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.actionsTpl = _t.first);
        } }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 41, vars: 13, consts: [["identityTpl", ""], ["statusTpl", ""], ["actionsTpl", ""], [1, "page"], [1, "page__header"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--secondary"], ["type", "button", "class", "btn btn--primary", 3, "click", 4, "eduopsHasPermission"], ["role", "status", 1, "scope"], [1, "card"], [1, "card__header", "filters"], [1, "filters__search"], ["for", "student-search", 1, "visually-hidden"], ["id", "student-search", "type", "search", "placeholder", "Nom, pr\u00E9nom ou matricule (ex. EDU-2026-000123)", 1, "input", 3, "input", "value"], [1, "filters__status"], ["for", "student-status", 1, "visually-hidden"], ["id", "student-status", 1, "select", 3, "change", "value"], ["value", ""], ["value", "ACTIVE"], ["value", "ADMITTED"], ["value", "APPLICANT"], ["value", "SUSPENDED"], ["value", "GRADUATED"], ["value", "TRANSFERRED"], ["caption", "Liste des \u00E9l\u00E8ves", "emptyTitle", "Aucun \u00E9l\u00E8ve trouve", "emptyMessage", "Ajustez la recherche ou le filtre de statut.", 3, "pageChange", "pageSizeChange", "rowClick", "columns", "page", "loading", "rowClickable", "showPageSize", "pageSize", "pageSizeOptions"], [1, "page__title"], [1, "page__meta", "numeric"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], [1, "scope__text"], ["routerLink", "/classes", 1, "scope__link"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], [1, "identity"], ["size", "sm", 3, "name", "photoUrl"], [1, "identity__name"], [1, "identity__meta"], [3, "status"], [3, "click", "keydown"], [1, "btn", "btn--secondary", "btn--sm", 3, "routerLink"], ["class", "btn btn--primary btn--sm", 3, "routerLink", "queryParams", 4, "eduopsHasPermission"], [1, "btn", "btn--primary", "btn--sm", 3, "routerLink", "queryParams"]], template: function StudentListComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 3)(1, "header", 4)(2, "div");
            i0.ɵɵtemplate(3, StudentListComponent_Conditional_3_Template, 8, 5)(4, StudentListComponent_Conditional_4_Template, 3, 1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 5)(6, "button", 6);
            i0.ɵɵtext(7, "Exporter Excel");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, StudentListComponent_button_8_Template, 4, 0, "button", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, StudentListComponent_Conditional_9_Template, 8, 1, "div", 8);
            i0.ɵɵelementStart(10, "section", 9)(11, "div", 10)(12, "div", 11)(13, "label", 12);
            i0.ɵɵtext(14, "Rechercher un \u00E9l\u00E8ve");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "input", 13);
            i0.ɵɵlistener("input", function StudentListComponent_Template_input_input_15_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSearchChange($event.target.value)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 14)(17, "label", 15);
            i0.ɵɵtext(18, "Filtrer par statut");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "select", 16);
            i0.ɵɵlistener("change", function StudentListComponent_Template_select_change_19_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onStatusChange($event.target.value)); });
            i0.ɵɵelementStart(20, "option", 17);
            i0.ɵɵtext(21, "Tous les statuts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "option", 18);
            i0.ɵɵtext(23, "Actif");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "option", 19);
            i0.ɵɵtext(25, "Admis");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "option", 20);
            i0.ɵɵtext(27, "Candidat");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "option", 21);
            i0.ɵɵtext(29, "Suspendu");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "option", 22);
            i0.ɵɵtext(31, "Diplome");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "option", 23);
            i0.ɵɵtext(33, "Transfere");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(34, "eduops-data-table", 24);
            i0.ɵɵlistener("pageChange", function StudentListComponent_Template_eduops_data_table_pageChange_34_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onPageChange($event)); })("pageSizeChange", function StudentListComponent_Template_eduops_data_table_pageSizeChange_34_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onPageSizeChange($event)); })("rowClick", function StudentListComponent_Template_eduops_data_table_rowClick_34_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.openStudent($event)); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(35, StudentListComponent_ng_template_35_Template, 7, 4, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(37, StudentListComponent_ng_template_37_Template, 1, 1, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor)(39, StudentListComponent_ng_template_39_Template, 4, 4, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            let tmp_3_0;
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_3_0 = ctx.classroom()) ? 3 : 4, tmp_3_0);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("eduopsHasPermission", ctx.createPermission);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.classroomFilter() ? 9 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("value", ctx.search());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("value", ctx.statusFilter());
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("columns", ctx.columns)("page", ctx.page())("loading", ctx.loading())("rowClickable", true)("showPageSize", true)("pageSize", ctx.pageSize())("pageSizeOptions", i0.ɵɵpureFunction0(12, _c3));
        } }, dependencies: [CommonModule, FormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, RouterLink, DataTableComponent, StatusBadgeComponent,
            AvatarComponent, HasPermissionDirective], styles: [".filters[_ngcontent-%COMP%] { gap: var(--space-3); flex-wrap: wrap; }\n.filters__search[_ngcontent-%COMP%] { flex: 1; min-width: 260px; }\n.filters__status[_ngcontent-%COMP%] { min-width: 180px; }\n\n.identity[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); }\n.identity__name[_ngcontent-%COMP%] { margin: 0; font-weight: 600; color: var(--text-strong); }\n.identity__meta[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n\n\n.scope[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--space-3);\n  margin-bottom: var(--space-3);\n  padding: var(--space-2) var(--space-4);\n  background: var(--brand-tint);\n  border: 1px solid var(--brand);\n  border-radius: var(--radius-button);\n\n  &__text { flex: 1; font-size: var(--text-sm); color: var(--text-normal); }\n  &__link { font-size: var(--text-sm); color: var(--brand); }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StudentListComponent, [{
        type: Component,
        args: [{ selector: 'eduops-student-list', standalone: true, imports: [
                    CommonModule, FormsModule, RouterLink, DataTableComponent, StatusBadgeComponent,
                    AvatarComponent, HasPermissionDirective
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      @if (classroom(); as room) {\n        <h1 class=\"page__title\">\u00C9l\u00E8ves de {{ room.name }}</h1>\n        <p class=\"page__meta numeric\">\n          {{ room.levelName }} \u2014\n          <strong>{{ page()?.totalElements ?? room.activeEnrollments }}</strong>/{{ room.capacityMaximum }} places\n          @if (room.mainTeacherName) {\n            \u00B7 Professeur principal : {{ room.mainTeacherName }}\n          }\n        </p>\n      } @else {\n        <h1 class=\"page__title\">\u00C9l\u00E8ves</h1>\n        @if (page(); as result) {\n          <p class=\"page__meta numeric\">{{ result.totalElements }} \u00E9l\u00E8ve(s) enregistr\u00E9(s)</p>\n        }\n      }\n    </div>\n    <div class=\"page__actions\">\n      <button type=\"button\" class=\"btn btn--secondary\">Exporter Excel</button>\n      <button type=\"button\" class=\"btn btn--primary\" *eduopsHasPermission=\"createPermission\"\n              (click)=\"openCreateWizard()\">\n        <span aria-hidden=\"true\">+</span> Nouvel \u00E9l\u00E8ve\n      </button>\n    </div>\n  </header>\n\n  @if (classroomFilter()) {\n    <div class=\"scope\" role=\"status\">\n      <span class=\"scope__text\">\n        @if (classroom(); as room) {\n          Liste restreinte \u00E0 la classe <strong>{{ room.name }}</strong>.\n        } @else {\n          Liste restreinte \u00E0 une classe.\n        }\n      </span>\n      <a class=\"scope__link\" routerLink=\"/classes\">Retour aux classes</a>\n      <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"clearClassroom()\">\n        Voir tous les \u00E9l\u00E8ves\n      </button>\n    </div>\n  }\n\n  <section class=\"card\">\n    <div class=\"card__header filters\">\n      <div class=\"filters__search\">\n        <label class=\"visually-hidden\" for=\"student-search\">Rechercher un \u00E9l\u00E8ve</label>\n        <input id=\"student-search\" class=\"input\" type=\"search\"\n               placeholder=\"Nom, pr\u00E9nom ou matricule (ex. EDU-2026-000123)\"\n               [value]=\"search()\" (input)=\"onSearchChange($any($event.target).value)\" />\n      </div>\n      <div class=\"filters__status\">\n        <label class=\"visually-hidden\" for=\"student-status\">Filtrer par statut</label>\n        <select id=\"student-status\" class=\"select\"\n                [value]=\"statusFilter()\" (change)=\"onStatusChange($any($event.target).value)\">\n          <option value=\"\">Tous les statuts</option>\n          <option value=\"ACTIVE\">Actif</option>\n          <option value=\"ADMITTED\">Admis</option>\n          <option value=\"APPLICANT\">Candidat</option>\n          <option value=\"SUSPENDED\">Suspendu</option>\n          <option value=\"GRADUATED\">Diplome</option>\n          <option value=\"TRANSFERRED\">Transfere</option>\n        </select>\n      </div>\n    </div>\n\n    <eduops-data-table\n      [columns]=\"columns\"\n      [page]=\"page()\"\n      [loading]=\"loading()\"\n      [rowClickable]=\"true\"\n      [showPageSize]=\"true\"\n      [pageSize]=\"pageSize()\"\n      [pageSizeOptions]=\"[5, 10, 20, 50, 100]\"\n      caption=\"Liste des \u00E9l\u00E8ves\"\n      emptyTitle=\"Aucun \u00E9l\u00E8ve trouve\"\n      emptyMessage=\"Ajustez la recherche ou le filtre de statut.\"\n      (pageChange)=\"onPageChange($event)\"\n      (pageSizeChange)=\"onPageSizeChange($event)\"\n      (rowClick)=\"openStudent($event)\" />\n  </section>\n</div>\n\n<!-- Cell templates -->\n<ng-template #identityTpl let-student>\n  <div class=\"identity\">\n    <eduops-avatar [name]=\"student.fullName\" [photoUrl]=\"student.photoUrl\" size=\"sm\" />\n    <div>\n      <p class=\"identity__name\">{{ student.fullName }}</p>\n      <p class=\"identity__meta\">{{ student.gender === 'FEMALE' ? 'Fille' : 'Garcon' }}</p>\n    </div>\n  </div>\n</ng-template>\n\n<ng-template #statusTpl let-student>\n  <eduops-status-badge [status]=\"student.status\" />\n</ng-template>\n\n<ng-template #actionsTpl let-student>\n  <div (click)=\"$event.stopPropagation()\" (keydown)=\"$event.stopPropagation()\">\n    <a class=\"btn btn--secondary btn--sm\" [routerLink]=\"['/students', student.id]\">Fiche / impression</a>\n    <a class=\"btn btn--primary btn--sm\" [routerLink]=\"['/students', student.id]\" [queryParams]=\"{ edit: true }\"\n       *eduopsHasPermission=\"editPermission\">Modifier</a>\n  </div>\n</ng-template>\n", styles: [".filters { gap: var(--space-3); flex-wrap: wrap; }\n.filters__search { flex: 1; min-width: 260px; }\n.filters__status { min-width: 180px; }\n\n.identity { display: flex; align-items: center; gap: var(--space-3); }\n.identity__name { margin: 0; font-weight: 600; color: var(--text-strong); }\n.identity__meta { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n\n/* Bandeau de port\u00E9e : dit sur quoi la liste est restreinte, et comment en sortir. */\n.scope {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--space-3);\n  margin-bottom: var(--space-3);\n  padding: var(--space-2) var(--space-4);\n  background: var(--brand-tint);\n  border: 1px solid var(--brand);\n  border-radius: var(--radius-button);\n\n  &__text { flex: 1; font-size: var(--text-sm); color: var(--text-normal); }\n  &__link { font-size: var(--text-sm); color: var(--brand); }\n}\n"] }]
    }], null, { identityTpl: [{
            type: ViewChild,
            args: ['identityTpl', { static: true }]
        }], statusTpl: [{
            type: ViewChild,
            args: ['statusTpl', { static: true }]
        }], actionsTpl: [{
            type: ViewChild,
            args: ['actionsTpl', { static: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StudentListComponent, { className: "StudentListComponent", filePath: "frontend/src/app/features/students/student-list.component.ts", lineNumber: 28 }); })();
//# sourceMappingURL=student-list.component.js.map