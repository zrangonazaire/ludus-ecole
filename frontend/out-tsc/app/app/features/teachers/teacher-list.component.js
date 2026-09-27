import { ChangeDetectionStrategy, Component, DestroyRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherAccountService } from '@core/services/teacher-account.service';
import { NotificationService } from '@core/services/notification.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { DataTableComponent } from '@shared/ui/data-table/data-table.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = ["accountTpl"];
const _c1 = ["identityTpl"];
const _c2 = ["statusTpl"];
const _forTrack0 = ($index, $item) => $item.id;
const _c3 = () => ["/teachers/new"];
const _c4 = a0 => ({ accountId: a0 });
function TeacherListComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx.totalElements, " enseignant(s)");
} }
function TeacherListComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 15);
    i0.ɵɵtext(1, "Affecter aux classes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "a", 16)(3, "span", 17);
    i0.ɵɵtext(4, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Nouvel enseignant ");
    i0.ɵɵelementEnd();
} }
function TeacherListComponent_Conditional_10_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const account_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", account_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3("", account_r4.firstName, " ", account_r4.lastName, " \u2014 ", account_r4.email, "");
} }
function TeacherListComponent_Conditional_10_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.linkError());
} }
function TeacherListComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 9)(1, "h2");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Choisissez son compte actif portant le profil Enseignant. Le contrat et les affectations seront conserv\u00E9s.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "label", 18);
    i0.ɵɵtext(6, "Compte utilisateur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "select", 19);
    i0.ɵɵtwoWayListener("ngModelChange", function TeacherListComponent_Conditional_10_Template_select_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.accountId, $event) || (ctx_r2.accountId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(8, "option", 20);
    i0.ɵɵtext(9, "S\u00E9lectionner un utilisateur\u2026");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(10, TeacherListComponent_Conditional_10_For_11_Template, 2, 4, "option", 21, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, TeacherListComponent_Conditional_10_Conditional_12_Template, 2, 1, "p", 22);
    i0.ɵɵelementStart(13, "button", 23);
    i0.ɵɵlistener("click", function TeacherListComponent_Conditional_10_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.confirmLink()); });
    i0.ɵɵtext(14, "Rattacher ce compte");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 24);
    i0.ɵɵlistener("click", function TeacherListComponent_Conditional_10_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.linking.set(null)); });
    i0.ɵɵtext(16, "Annuler");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Rattacher ", ctx.fullName, "");
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.accountId);
    i0.ɵɵproperty("disabled", ctx_r2.linkSaving());
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r2.accounts());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.linkError() ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.accountId || ctx_r2.linkSaving());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.linkSaving());
} }
function TeacherListComponent_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵelement(1, "eduops-avatar", 26);
    i0.ɵɵelementStart(2, "div")(3, "p", 27);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 28);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const teacher_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", teacher_r5.fullName)("photoUrl", teacher_r5.photoUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(teacher_r5.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(teacher_r5.email);
} }
function TeacherListComponent_ng_template_19_Conditional_0_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 30);
    i0.ɵɵtext(1, "Cr\u00E9er la fiche enseignant");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const teacher_r6 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(2, _c3))("queryParams", i0.ɵɵpureFunction1(3, _c4, teacher_r6.userAccountId));
} }
function TeacherListComponent_ng_template_19_Conditional_0_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Fiche \u00E0 cr\u00E9er");
    i0.ɵɵelementEnd();
} }
function TeacherListComponent_ng_template_19_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TeacherListComponent_ng_template_19_Conditional_0_Conditional_0_Template, 2, 5, "a", 30)(1, TeacherListComponent_ng_template_19_Conditional_0_Conditional_1_Template, 2, 0, "span");
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(ctx_r2.auth.has(ctx_r2.permissions.TEACHER_MANAGE) ? 0 : 1);
} }
function TeacherListComponent_ng_template_19_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Compte Enseignant li\u00E9");
    i0.ɵɵelementEnd();
} }
function TeacherListComponent_ng_template_19_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function TeacherListComponent_ng_template_19_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const teacher_r6 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openLink(teacher_r6)); });
    i0.ɵɵtext(1, "Rattacher un utilisateur");
    i0.ɵɵelementEnd();
} }
function TeacherListComponent_ng_template_19_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Compte \u00E0 rattacher");
    i0.ɵɵelementEnd();
} }
function TeacherListComponent_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, TeacherListComponent_ng_template_19_Conditional_0_Template, 2, 1)(1, TeacherListComponent_ng_template_19_Conditional_1_Template, 2, 0, "span")(2, TeacherListComponent_ng_template_19_Conditional_2_Template, 2, 0, "button", 29)(3, TeacherListComponent_ng_template_19_Conditional_3_Template, 2, 0, "span");
} if (rf & 2) {
    const teacher_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵconditional(teacher_r6.hasTeacherRecord === false ? 0 : teacher_r6.userAccountId ? 1 : ctx_r2.auth.has(ctx_r2.permissions.TEACHER_MANAGE) ? 2 : 3);
} }
function TeacherListComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-status-badge", 32);
} if (rf & 2) {
    const teacher_r8 = ctx.$implicit;
    i0.ɵɵproperty("status", teacher_r8.status);
} }
export class TeacherListComponent {
    auth = inject(AuthService);
    permissions = PERMISSIONS;
    dataSource = inject(TEACHER_DATA_SOURCE);
    destroyRef = inject(DestroyRef);
    accountService = inject(TeacherAccountService);
    notifications = inject(NotificationService);
    linking = signal(null);
    accounts = signal([]);
    linkSaving = signal(false);
    linkError = signal('');
    accountId = '';
    accountTpl;
    openLink(teacher) {
        this.linking.set(teacher);
        this.accountId = '';
        this.accounts.set([]);
        this.linkError.set('');
        this.accountService.available().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: accounts => {
                this.accounts.set(accounts);
                if (!accounts.length)
                    this.linkError.set('Aucun compte Enseignant disponible. Créez-le ou attribuez ce profil dans Utilisateurs.');
            },
            error: () => this.linkError.set('Chargement impossible. Fermez puis réessayez.')
        });
    }
    confirmLink() {
        const teacher = this.linking();
        if (!teacher || !this.accountId || this.linkSaving())
            return;
        this.linkSaving.set(true);
        this.linkError.set('');
        this.accountService.link(teacher.id, this.accountId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => { this.linkSaving.set(false); this.linking.set(null); this.load(); this.notifications.success('Compte utilisateur rattaché.'); },
            error: err => { this.linkSaving.set(false); this.linkError.set(err?.error?.message ?? 'Rattachement impossible.'); }
        });
    }
    page = signal(null);
    loading = signal(true);
    search = '';
    currentPage = 0;
    identityTpl;
    statusTpl;
    columns = [];
    ngOnInit() {
        this.columns = [
            { key: 'fullName', label: 'Enseignant', template: this.identityTpl, width: '34%' },
            { key: 'employeeNumber', label: 'Matricule', numeric: true, width: '14%' },
            { key: 'speciality', label: 'Spécialité', width: '20%' },
            { key: 'classCount', label: 'Classes', numeric: true, width: '10%' },
            { key: 'userAccountId', label: 'Utilisateur', template: this.accountTpl, width: '20%' },
            { key: 'status', label: 'Statut', template: this.statusTpl, width: '10%' }
        ];
        this.load();
    }
    load() {
        this.loading.set(true);
        this.dataSource
            .roster({ page: this.currentPage, size: 20, search: this.search || undefined })
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
    static ɵfac = function TeacherListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TeacherListComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TeacherListComponent, selectors: [["eduops-teacher-list"]], viewQuery: function TeacherListComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
            i0.ɵɵviewQuery(_c1, 7);
            i0.ɵɵviewQuery(_c2, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.accountTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.identityTpl = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.statusTpl = _t.first);
        } }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 23, vars: 6, consts: [["identityTpl", ""], ["accountTpl", ""], ["statusTpl", ""], [1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__meta"], [1, "page__actions"], ["aria-label", "Rattacher le compte enseignant", 1, "card", 2, "padding", "1rem", "margin-bottom", "1rem"], [1, "card"], [1, "card__header"], ["for", "teacher-search", 1, "visually-hidden"], ["id", "teacher-search", "type", "search", "placeholder", "Nom, e-mail ou matricule", 1, "input", 2, "max-width", "340px", 3, "input"], ["caption", "Liste des enseignants", 3, "pageChange", "columns", "page", "loading"], ["routerLink", "/teacher-assignments", 1, "btn", "btn--secondary"], ["routerLink", "/teachers/new", 1, "btn", "btn--primary"], ["aria-hidden", "true"], ["for", "link-teacher-user"], ["id", "link-teacher-user", 1, "input", 3, "ngModelChange", "ngModel", "disabled"], ["value", ""], [3, "value"], ["role", "alert"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], [1, "row"], ["size", "sm", 3, "name", "photoUrl"], [2, "margin", "0", "font-weight", "600", "color", "var(--text-strong)"], [2, "margin", "0", "font-size", "var(--text-xs)", "color", "var(--text-muted)"], ["type", "button", 1, "btn", "btn--secondary"], [1, "btn", "btn--secondary", 3, "routerLink", "queryParams"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], [3, "status"]], template: function TeacherListComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 3)(1, "header", 4)(2, "div")(3, "h1", 5);
            i0.ɵɵtext(4, "Enseignants");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, TeacherListComponent_Conditional_5_Template, 2, 1, "p", 6);
            i0.ɵɵelementStart(6, "p", 7);
            i0.ɵɵtext(7, "Comptes portant le profil Enseignant, avec leur fiche p\u00E9dagogique ; une fiche rest\u00E9e sans compte reste visible pour \u00EAtre rattach\u00E9e.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 8);
            i0.ɵɵtemplate(9, TeacherListComponent_Conditional_9_Template, 6, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(10, TeacherListComponent_Conditional_10_Template, 17, 6, "section", 9);
            i0.ɵɵelementStart(11, "section", 10)(12, "div", 11)(13, "label", 12);
            i0.ɵɵtext(14, "Rechercher un enseignant");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "input", 13);
            i0.ɵɵlistener("input", function TeacherListComponent_Template_input_input_15_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSearch($event.target.value)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "eduops-data-table", 14);
            i0.ɵɵlistener("pageChange", function TeacherListComponent_Template_eduops_data_table_pageChange_16_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onPageChange($event)); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(17, TeacherListComponent_ng_template_17_Template, 7, 4, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(19, TeacherListComponent_ng_template_19_Template, 4, 1, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor)(21, TeacherListComponent_ng_template_21_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            let tmp_3_0;
            let tmp_5_0;
            i0.ɵɵadvance(5);
            i0.ɵɵconditional((tmp_3_0 = ctx.page()) ? 5 : -1, tmp_3_0);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.auth.has(ctx.permissions.TEACHER_MANAGE) ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_5_0 = ctx.linking()) ? 10 : -1, tmp_5_0);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("columns", ctx.columns)("page", ctx.page())("loading", ctx.loading());
        } }, dependencies: [CommonModule, FormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgModel, RouterLink, DataTableComponent, StatusBadgeComponent, AvatarComponent], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeacherListComponent, [{
        type: Component,
        args: [{
                selector: 'eduops-teacher-list',
                standalone: true,
                imports: [CommonModule, FormsModule, RouterLink, DataTableComponent, StatusBadgeComponent, AvatarComponent],
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="page">
      <header class="page__header">
        <div>
          <h1 class="page__title">Enseignants</h1>
          @if (page(); as result) {
            <p class="page__meta numeric">{{ result.totalElements }} enseignant(s)</p>
          }
          <p class="page__meta">Comptes portant le profil Enseignant, avec leur fiche pédagogique ; une
            fiche restée sans compte reste visible pour être rattachée.</p>
        </div>
        <div class="page__actions">
          @if (auth.has(permissions.TEACHER_MANAGE)) {
          <a routerLink="/teacher-assignments" class="btn btn--secondary">Affecter aux classes</a>
          <a routerLink="/teachers/new" class="btn btn--primary">
            <span aria-hidden="true">+</span> Nouvel enseignant
          </a>
          }
        </div>
      </header>

      @if (linking(); as teacher) {
        <section class="card" style="padding: 1rem; margin-bottom: 1rem" aria-label="Rattacher le compte enseignant">
          <h2>Rattacher {{ teacher.fullName }}</h2>
          <p>Choisissez son compte actif portant le profil Enseignant. Le contrat et les affectations seront conservés.</p>
          <label for="link-teacher-user">Compte utilisateur</label>
          <select class="input" id="link-teacher-user" [(ngModel)]="accountId" [disabled]="linkSaving()">
            <option value="">Sélectionner un utilisateur…</option>
            @for (account of accounts(); track account.id) {
              <option [value]="account.id">{{ account.firstName }} {{ account.lastName }} — {{ account.email }}</option>
            }
          </select>
          @if (linkError()) { <p role="alert">{{ linkError() }}</p> }
          <button class="btn btn--primary" type="button" (click)="confirmLink()" [disabled]="!accountId || linkSaving()">Rattacher ce compte</button>
          <button class="btn btn--secondary" type="button" (click)="linking.set(null)" [disabled]="linkSaving()">Annuler</button>
        </section>
      }
      <section class="card">
        <div class="card__header">
          <label class="visually-hidden" for="teacher-search">Rechercher un enseignant</label>
          <input id="teacher-search" class="input" type="search" style="max-width: 340px"
                 placeholder="Nom, e-mail ou matricule"
                 (input)="onSearch($any($event.target).value)" />
        </div>
        <eduops-data-table
          [columns]="columns" [page]="page()" [loading]="loading()"
          caption="Liste des enseignants"
          (pageChange)="onPageChange($event)" />
      </section>
    </div>

    <ng-template #identityTpl let-teacher>
      <div class="row">
        <eduops-avatar [name]="teacher.fullName" [photoUrl]="teacher.photoUrl" size="sm" />
        <div>
          <p style="margin:0;font-weight:600;color:var(--text-strong)">{{ teacher.fullName }}</p>
          <p style="margin:0;font-size:var(--text-xs);color:var(--text-muted)">{{ teacher.email }}</p>
        </div>
      </div>
    </ng-template>

    <ng-template #accountTpl let-teacher>
      @if (teacher.hasTeacherRecord === false) {
        @if (auth.has(permissions.TEACHER_MANAGE)) {
          <a class="btn btn--secondary" [routerLink]="['/teachers/new']"
             [queryParams]="{ accountId: teacher.userAccountId }">Créer la fiche enseignant</a>
        } @else { <span>Fiche à créer</span> }
      }
      @else if (teacher.userAccountId) { <span>Compte Enseignant lié</span> }
      @else if (auth.has(permissions.TEACHER_MANAGE)) {
        <button type="button" class="btn btn--secondary" (click)="openLink(teacher)">Rattacher un utilisateur</button>
      } @else { <span>Compte à rattacher</span> }
    </ng-template>

    <ng-template #statusTpl let-teacher>
      <eduops-status-badge [status]="teacher.status" />
    </ng-template>
  `
            }]
    }], null, { accountTpl: [{
            type: ViewChild,
            args: ['accountTpl', { static: true }]
        }], identityTpl: [{
            type: ViewChild,
            args: ['identityTpl', { static: true }]
        }], statusTpl: [{
            type: ViewChild,
            args: ['statusTpl', { static: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TeacherListComponent, { className: "TeacherListComponent", filePath: "frontend/src/app/features/teachers/teacher-list.component.ts", lineNumber: 102 }); })();
//# sourceMappingURL=teacher-list.component.js.map