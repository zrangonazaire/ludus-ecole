import { ChangeDetectionStrategy, Component, DestroyRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ENROLLMENT_DATA_SOURCE } from '@core/datasource/data-source';
import { DataTableComponent } from '@shared/ui/data-table/data-table.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { PERMISSIONS } from '@core/models/auth.models';
import * as i0 from "@angular/core";
const _c0 = ["kindTpl"];
const _c1 = ["statusTpl"];
const _c2 = ["actionsTpl"];
const _c3 = () => [5, 10, 20, 50, 100];
const _c4 = a0 => ["/students", a0];
const _c5 = () => ({ edit: true });
function EnrollmentListComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx.totalElements, " inscription(s) pour l'ann\u00E9e active");
} }
function EnrollmentListComponent_a_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 15)(1, "span", 16);
    i0.ɵɵtext(2, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Nouvelle inscription ");
    i0.ɵɵelementEnd();
} }
function EnrollmentListComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const enrollment_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", enrollment_r2.enrollmentKind === "NEW" ? "Nouvelle" : enrollment_r2.enrollmentKind === "RE_ENROLLMENT" ? "Reinscription" : "Transfert", " ");
} }
function EnrollmentListComponent_ng_template_18_a_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 20);
    i0.ɵɵtext(1, "Fiche / impression");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const enrollment_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(1, _c4, enrollment_r3.studentId));
} }
function EnrollmentListComponent_ng_template_18_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 21);
    i0.ɵɵtext(1, "Modifier");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const enrollment_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(2, _c4, enrollment_r3.studentId))("queryParams", i0.ɵɵpureFunction0(4, _c5));
} }
function EnrollmentListComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, EnrollmentListComponent_ng_template_18_a_0_Template, 2, 3, "a", 18)(1, EnrollmentListComponent_ng_template_18_a_1_Template, 2, 5, "a", 19);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("eduopsHasPermission", ctx_r3.viewPermission);
    i0.ɵɵadvance();
    i0.ɵɵproperty("eduopsHasPermission", ctx_r3.editPermission);
} }
function EnrollmentListComponent_ng_template_20_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 24);
    i0.ɵɵtext(1, " Derogation ");
    i0.ɵɵelementEnd();
} }
function EnrollmentListComponent_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵelement(1, "eduops-status-badge", 23);
    i0.ɵɵtemplate(2, EnrollmentListComponent_ng_template_20_Conditional_2_Template, 2, 0, "span", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const enrollment_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("status", enrollment_r5.status);
    i0.ɵɵadvance();
    i0.ɵɵconditional(enrollment_r5.overCapacityOverride ? 2 : -1);
} }
export class EnrollmentListComponent {
    dataSource = inject(ENROLLMENT_DATA_SOURCE);
    destroyRef = inject(DestroyRef);
    page = signal(null);
    loading = signal(true);
    createPermission = PERMISSIONS.ENROLLMENT_CREATE;
    viewPermission = PERMISSIONS.STUDENT_VIEW;
    editPermission = PERMISSIONS.STUDENT_UPDATE;
    /** 5 lignes par défaut, modifiable via le combo du tableau. */
    pageSize = signal(5);
    search = '';
    currentPage = 0;
    kindTpl;
    statusTpl;
    columns = [];
    actionsTpl;
    ngOnInit() {
        this.columns = [
            { key: 'enrollmentNumber', label: 'N° inscription', numeric: true, width: '16%' },
            { key: 'studentName', label: 'Élève' },
            { key: 'studentNumber', label: 'Matricule', numeric: true, width: '16%' },
            { key: 'classroomName', label: 'Classe', width: '12%' },
            { key: 'enrollmentDate', label: 'Date', width: '10%' },
            { key: 'enrollmentKind', label: 'Type', template: this.kindTpl, width: '12%' },
            { key: 'status', label: 'Statut', template: this.statusTpl },
            { key: 'actions', label: 'Actions', template: this.actionsTpl }
        ];
        this.load();
    }
    load() {
        this.loading.set(true);
        this.dataSource
            .search({ page: this.currentPage, size: this.pageSize(), search: this.search || undefined })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (page) => {
                this.page.set(page);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }
    onSearch(value) {
        this.search = value;
        this.currentPage = 0;
        this.load();
    }
    onPageChange(page) {
        this.currentPage = page;
        this.load();
    }
    onPageSizeChange(size) {
        this.pageSize.set(size);
        this.currentPage = 0;
        this.load();
    }
    static ɵfac = function EnrollmentListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EnrollmentListComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EnrollmentListComponent, selectors: [["eduops-enrollment-list"]], viewQuery: function EnrollmentListComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
            i0.ɵɵviewQuery(_c1, 7);
            i0.ɵɵviewQuery(_c2, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.kindTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.statusTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.actionsTpl = _t.first);
        } }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 22, vars: 9, consts: [["kindTpl", ""], ["actionsTpl", ""], ["statusTpl", ""], [1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--secondary"], ["class", "btn btn--primary", "routerLink", "/enrollments/new", 4, "eduopsHasPermission"], [1, "card"], [1, "card__header"], ["for", "enrollment-search", 1, "visually-hidden"], ["id", "enrollment-search", "type", "search", "placeholder", "\u00C9l\u00E8ve, matricule ou num\u00E9ro d'inscription", 1, "input", 2, "max-width", "380px", 3, "input"], ["caption", "Liste des inscriptions", "emptyTitle", "Aucune inscription trouve", "emptyMessage", "Ajustez la recherche ou les filtres.", 3, "pageChange", "pageSizeChange", "columns", "page", "loading", "showPageSize", "pageSize", "pageSizeOptions"], ["routerLink", "/enrollments/new", 1, "btn", "btn--primary"], ["aria-hidden", "true"], [1, "badge", "badge--neutral"], ["class", "btn btn--secondary btn--sm", 3, "routerLink", 4, "eduopsHasPermission"], ["class", "btn btn--primary btn--sm", 3, "routerLink", "queryParams", 4, "eduopsHasPermission"], [1, "btn", "btn--secondary", "btn--sm", 3, "routerLink"], [1, "btn", "btn--primary", "btn--sm", 3, "routerLink", "queryParams"], [1, "row"], [3, "status"], ["title", "Inscription en depassement de capacite, justifiee et auditee", 1, "badge", "badge--warning"]], template: function EnrollmentListComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 3)(1, "header", 4)(2, "div")(3, "h1", 5);
            i0.ɵɵtext(4, "Inscriptions");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, EnrollmentListComponent_Conditional_5_Template, 2, 1, "p", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 7)(7, "button", 8);
            i0.ɵɵtext(8, "Exporter");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, EnrollmentListComponent_a_9_Template, 4, 0, "a", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "section", 10)(11, "div", 11)(12, "label", 12);
            i0.ɵɵtext(13, "Rechercher");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "input", 13);
            i0.ɵɵlistener("input", function EnrollmentListComponent_Template_input_input_14_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSearch($event.target.value)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "eduops-data-table", 14);
            i0.ɵɵlistener("pageChange", function EnrollmentListComponent_Template_eduops_data_table_pageChange_15_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onPageChange($event)); })("pageSizeChange", function EnrollmentListComponent_Template_eduops_data_table_pageSizeChange_15_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onPageSizeChange($event)); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(16, EnrollmentListComponent_ng_template_16_Template, 2, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(18, EnrollmentListComponent_ng_template_18_Template, 2, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor)(20, EnrollmentListComponent_ng_template_20_Template, 3, 2, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            let tmp_3_0;
            i0.ɵɵadvance(5);
            i0.ɵɵconditional((tmp_3_0 = ctx.page()) ? 5 : -1, tmp_3_0);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("eduopsHasPermission", ctx.createPermission);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("columns", ctx.columns)("page", ctx.page())("loading", ctx.loading())("showPageSize", true)("pageSize", ctx.pageSize())("pageSizeOptions", i0.ɵɵpureFunction0(8, _c3));
        } }, dependencies: [CommonModule, RouterLink, DataTableComponent, StatusBadgeComponent, HasPermissionDirective], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EnrollmentListComponent, [{
        type: Component,
        args: [{
                selector: 'eduops-enrollment-list',
                standalone: true,
                imports: [
                    CommonModule, RouterLink, DataTableComponent, StatusBadgeComponent, HasPermissionDirective
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="page">
      <header class="page__header">
        <div>
          <h1 class="page__title">Inscriptions</h1>
          @if (page(); as result) {
            <p class="page__meta numeric">{{ result.totalElements }} inscription(s) pour l'année active</p>
          }
        </div>
        <div class="page__actions">
          <button type="button" class="btn btn--secondary">Exporter</button>
          <a class="btn btn--primary" routerLink="/enrollments/new"
             *eduopsHasPermission="createPermission">
            <span aria-hidden="true">+</span> Nouvelle inscription
          </a>
        </div>
      </header>

      <section class="card">
        <div class="card__header">
          <label class="visually-hidden" for="enrollment-search">Rechercher</label>
          <input id="enrollment-search" class="input" type="search" style="max-width: 380px"
                 placeholder="Élève, matricule ou numéro d'inscription"
                 (input)="onSearch($any($event.target).value)" />
        </div>
        <eduops-data-table
          [columns]="columns" [page]="page()" [loading]="loading()"
          [showPageSize]="true"
          [pageSize]="pageSize()"
           [pageSizeOptions]="[5, 10, 20, 50, 100]"

          caption="Liste des inscriptions"
          emptyTitle="Aucune inscription trouve"
          emptyMessage="Ajustez la recherche ou les filtres."
          (pageChange)="onPageChange($event)"
          (pageSizeChange)="onPageSizeChange($event)" />
      </section>
    </div>

    <ng-template #kindTpl let-enrollment>
      <span class="badge badge--neutral">
        {{ enrollment.enrollmentKind === 'NEW' ? 'Nouvelle'
           : enrollment.enrollmentKind === 'RE_ENROLLMENT' ? 'Reinscription' : 'Transfert' }}
      </span>
    </ng-template>

    <ng-template #actionsTpl let-enrollment>
      <a class="btn btn--secondary btn--sm" [routerLink]="['/students', enrollment.studentId]"
         *eduopsHasPermission="viewPermission">Fiche / impression</a>
      <a class="btn btn--primary btn--sm" [routerLink]="['/students', enrollment.studentId]" [queryParams]="{ edit: true }"
         *eduopsHasPermission="editPermission">Modifier</a>
    </ng-template>

    <ng-template #statusTpl let-enrollment>
      <div class="row">
        <eduops-status-badge [status]="enrollment.status" />
        @if (enrollment.overCapacityOverride) {
          <span class="badge badge--warning" title="Inscription en depassement de capacite, justifiee et auditee">
            Derogation
          </span>
        }
      </div>
    </ng-template>
  `
            }]
    }], null, { kindTpl: [{
            type: ViewChild,
            args: ['kindTpl', { static: true }]
        }], statusTpl: [{
            type: ViewChild,
            args: ['statusTpl', { static: true }]
        }], actionsTpl: [{
            type: ViewChild,
            args: ['actionsTpl', { static: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EnrollmentListComponent, { className: "EnrollmentListComponent", filePath: "frontend/src/app/features/enrollments/enrollment-list.component.ts", lineNumber: 85 }); })();
//# sourceMappingURL=enrollment-list.component.js.map