import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ENROLLMENT_DATA_SOURCE, CLASSROOM_DATA_SOURCE, REFERENCE_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function PromotionsComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 6);
} }
function PromotionsComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 7);
    i0.ɵɵlistener("retry", function PromotionsComponent_Conditional_12_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function PromotionsComponent_Conditional_13_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const year_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", year_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(year_r4.label);
} }
function PromotionsComponent_Conditional_13_For_35_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const classroom_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", classroom_r7.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", classroom_r7.name, " \u00B7 ", classroom_r7.levelName, "");
} }
function PromotionsComponent_Conditional_13_For_35_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small", 21);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td")(9, "span", 22);
    i0.ɵɵtext(10, "\u00C0 d\u00E9cider");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td")(12, "select", 11);
    i0.ɵɵlistener("change", function PromotionsComponent_Conditional_13_For_35_Template_select_change_12_listener($event) { const row_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setTarget(row_r6, $event.target.value)); });
    i0.ɵɵelementStart(13, "option", 23);
    i0.ɵɵtext(14, "Choisir une classe");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(15, PromotionsComponent_Conditional_13_For_35_For_16_Template, 2, 3, "option", 12, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td", 20)(18, "button", 24);
    i0.ɵɵlistener("click", function PromotionsComponent_Conditional_13_For_35_Template_button_click_18_listener() { const row_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.promote(row_r6)); });
    i0.ɵɵtext(19, "R\u00E9inscrire");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r6.studentName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r6.studentNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r6.classroomName);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", row_r6.targetClassroomId);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.classroomsForTarget());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !row_r6.targetClassroomId || ctx_r1.saving());
} }
function PromotionsComponent_Conditional_13_ForEmpty_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 25)(2, "div", 26);
    i0.ɵɵtext(3, "Aucun \u00E9l\u00E8ve \u00E0 promouvoir pour le moment.");
    i0.ɵɵelementEnd()()();
} }
function PromotionsComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 8)(1, "label", 9)(2, "span", 10);
    i0.ɵɵtext(3, "Ann\u00E9e cible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 11);
    i0.ɵɵlistener("change", function PromotionsComponent_Conditional_13_Template_select_change_4_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.targetYearId.set($event.target.value)); });
    i0.ɵɵrepeaterCreate(5, PromotionsComponent_Conditional_13_For_6_Template, 2, 2, "option", 12, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "label", 13)(8, "span", 10);
    i0.ɵɵtext(9, "Rechercher un \u00E9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "input", 14);
    i0.ɵɵlistener("input", function PromotionsComponent_Conditional_13_Template_input_input_10_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.search.set($event.target.value)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 15)(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15, "\u00E9l\u00E8ve(s) \u00E0 traiter");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "section", 16)(17, "div", 17)(18, "table", 18)(19, "caption", 19);
    i0.ɵɵtext(20, "\u00C9l\u00E8ves \u00E0 r\u00E9inscrire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "thead")(22, "tr")(23, "th");
    i0.ɵɵtext(24, "\u00C9l\u00E8ve");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "th");
    i0.ɵɵtext(26, "Classe actuelle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "th");
    i0.ɵɵtext(28, "D\u00E9cision");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "th");
    i0.ɵɵtext(30, "Classe cible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "th", 20);
    i0.ɵɵtext(32, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(33, "tbody");
    i0.ɵɵrepeaterCreate(34, PromotionsComponent_Conditional_13_For_35_Template, 20, 5, "tr", null, _forTrack0, false, PromotionsComponent_Conditional_13_ForEmpty_36_Template, 4, 0, "tr");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r1.targetYearId());
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.years());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r1.search());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.visibleRows().length);
    i0.ɵɵadvance(21);
    i0.ɵɵrepeater(ctx_r1.visibleRows());
} }
export class PromotionsComponent {
    enrollmentSource = inject(ENROLLMENT_DATA_SOURCE);
    classroomSource = inject(CLASSROOM_DATA_SOURCE);
    referenceSource = inject(REFERENCE_DATA_SOURCE);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    destroyRef = inject(DestroyRef);
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    years = signal([]);
    classrooms = signal([]);
    rows = signal([]);
    targetYearId = signal('');
    search = signal('');
    canCreate = computed(() => this.auth.has(PERMISSIONS.ENROLLMENT_CREATE));
    promotionQueue = [];
    visibleRows = computed(() => {
        const term = this.search().trim().toLocaleLowerCase();
        return this.rows().filter((row) => !term
            || `${row.studentName} ${row.studentNumber} ${row.classroomName}`
                .toLocaleLowerCase().includes(term));
    });
    selectedCount = computed(() => this.rows().filter((row) => !!row.targetClassroomId).length);
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        forkJoin({
            enrollments: this.enrollmentSource.search({ page: 0, size: 200, status: 'ACTIVE' }),
            years: this.referenceSource.academicYears(),
            classrooms: this.classroomSource.list()
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (data) => {
                this.years.set(data.years);
                const activeYear = data.years.find((year) => year.status === 'ACTIVE') ?? data.years[0];
                const targetYear = data.years.find((year) => year.startDate > (activeYear?.startDate ?? ''));
                this.targetYearId.set(targetYear?.id ?? activeYear?.id ?? '');
                this.classrooms.set(data.classrooms);
                this.rows.set(data.enrollments.content.map((enrollment) => ({
                    ...enrollment,
                    targetClassroomId: ''
                })));
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    classroomsForTarget() {
        const yearId = this.targetYearId();
        return this.classrooms().filter((classroom) => classroom.status === 'ACTIVE'
            && (!yearId || classroom.academicYearId === yearId));
    }
    setTarget(row, classroomId) {
        this.rows.update((items) => items.map((item) => item.id === row.id
            ? { ...item, targetClassroomId: classroomId } : item));
    }
    promote(row, continueQueue = false) {
        if (!this.canCreate() || !row.targetClassroomId || this.saving()) {
            return;
        }
        this.saving.set(true);
        this.enrollmentSource.create({
            studentId: row.studentId,
            academicYearId: this.targetYearId(),
            classroomId: row.targetClassroomId,
            enrollmentKind: 'RE_ENROLLMENT',
            repeating: false,
            validateImmediately: true,
            idempotencyKey: `promotion-${row.studentId}-${this.targetYearId()}`
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (created) => {
                this.saving.set(false);
                this.rows.update((items) => items.filter((item) => item.id !== row.id));
                this.notifications.success(`${created.studentName} est inscrit pour ${created.academicYearCode}.`, 'Réinscription enregistrée');
                if (continueQueue) {
                    this.processPromotionQueue();
                }
            },
            error: () => {
                this.saving.set(false);
                this.promotionQueue = [];
            }
        });
    }
    promoteSelected() {
        this.promotionQueue = this.rows().filter((row) => !!row.targetClassroomId);
        this.processPromotionQueue();
    }
    processPromotionQueue() {
        const next = this.promotionQueue.shift();
        if (!next) {
            this.saving.set(false);
            return;
        }
        this.promote(next, true);
    }
    static ɵfac = function PromotionsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PromotionsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PromotionsComponent, selectors: [["eduops-promotions"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 14, vars: 3, consts: [[1, "page"], [1, "page__header"], [1, "eyebrow"], [1, "page__title"], [1, "page__meta"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"], ["message", "Chargement des \u00E9l\u00E8ves \u00E0 promouvoir..."], [3, "retry"], [1, "toolbar", "card"], [1, "field"], [1, "field__label"], [1, "select", 3, "change", "value"], [3, "value"], [1, "field", "search-field"], ["type", "search", "placeholder", "Nom ou matricule", 1, "input", 3, "input", "value"], [1, "summary"], [1, "card", "table-card"], [1, "table-wrapper"], [1, "table"], [1, "visually-hidden"], [1, "cell-actions"], [1, "muted", "numeric"], ["data-status", "ACTIVE", 1, "status-pill"], ["value", ""], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click", "disabled"], ["colspan", "5"], [1, "empty"]], template: function PromotionsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "Scolarit\u00E9 \u00B7 Fin d'ann\u00E9e");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 3);
            i0.ɵɵtext(6, "Promotions et r\u00E9inscriptions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, "Pr\u00E9parez le passage des \u00E9l\u00E8ves vers leur classe de l'ann\u00E9e suivante.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "button", 5);
            i0.ɵɵlistener("click", function PromotionsComponent_Template_button_click_9_listener() { return ctx.promoteSelected(); });
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(11, PromotionsComponent_Conditional_11_Template, 1, 0, "eduops-loading-state", 6)(12, PromotionsComponent_Conditional_12_Template, 1, 0, "eduops-error-state")(13, PromotionsComponent_Conditional_13_Template, 37, 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("disabled", !ctx.selectedCount() || ctx.saving());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" Valider ", ctx.selectedCount(), " r\u00E9inscription(s) ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 11 : ctx.error() ? 12 : 13);
        } }, dependencies: [CommonModule, FormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, LoadingStateComponent, ErrorStateComponent], styles: [".toolbar[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(180px, 240px) minmax(220px, 1fr) auto;\n  gap: var(--space-4);\n  align-items: end;\n  margin-bottom: var(--space-5);\n  padding: var(--space-4) var(--space-5);\n}\n\n.field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-2); }\n.field__label[_ngcontent-%COMP%] { font-size: var(--text-xs); font-weight: 700; color: var(--text-muted); }\n.search-field[_ngcontent-%COMP%] { max-width: 420px; }\n.summary[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: flex-end; color: var(--text-muted); }\n.summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 24px; line-height: 1; color: var(--text-strong); }\n.summary[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .muted[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--text-muted); }\n.table-card[_ngcontent-%COMP%] { overflow: hidden; }\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; }\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { vertical-align: middle; }\n.table[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%] { min-width: 220px; }\n.empty[_ngcontent-%COMP%] { padding: var(--space-8); text-align: center; color: var(--text-muted); }\n\n@media (max-width: 800px) {\n  .toolbar[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n  .search-field[_ngcontent-%COMP%] { max-width: none; }\n  .summary[_ngcontent-%COMP%] { align-items: flex-start; }\n  .page__header[_ngcontent-%COMP%] { align-items: flex-start; gap: var(--space-3); flex-direction: column; }\n  .table-wrapper[_ngcontent-%COMP%] { overflow-x: auto; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PromotionsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-promotions', standalone: true, imports: [CommonModule, FormsModule, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <p class=\"eyebrow\">Scolarit\u00E9 \u00B7 Fin d'ann\u00E9e</p>\n      <h1 class=\"page__title\">Promotions et r\u00E9inscriptions</h1>\n      <p class=\"page__meta\">Pr\u00E9parez le passage des \u00E9l\u00E8ves vers leur classe de l'ann\u00E9e suivante.</p>\n    </div>\n    <button class=\"btn btn--primary\" type=\"button\" [disabled]=\"!selectedCount() || saving()\"\n            (click)=\"promoteSelected()\">\n      Valider {{ selectedCount() }} r\u00E9inscription(s)\n    </button>\n  </header>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des \u00E9l\u00E8ves \u00E0 promouvoir...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n    <section class=\"toolbar card\">\n      <label class=\"field\">\n        <span class=\"field__label\">Ann\u00E9e cible</span>\n        <select class=\"select\" [value]=\"targetYearId()\"\n                (change)=\"targetYearId.set($any($event.target).value)\">\n          @for (year of years(); track year.id) {\n            <option [value]=\"year.id\">{{ year.label }}</option>\n          }\n        </select>\n      </label>\n      <label class=\"field search-field\">\n        <span class=\"field__label\">Rechercher un \u00E9l\u00E8ve</span>\n        <input class=\"input\" type=\"search\" placeholder=\"Nom ou matricule\"\n               [value]=\"search()\" (input)=\"search.set($any($event.target).value)\" />\n      </label>\n      <div class=\"summary\">\n        <strong>{{ visibleRows().length }}</strong>\n        <span>\u00E9l\u00E8ve(s) \u00E0 traiter</span>\n      </div>\n    </section>\n\n    <section class=\"card table-card\">\n      <div class=\"table-wrapper\">\n        <table class=\"table\">\n          <caption class=\"visually-hidden\">\u00C9l\u00E8ves \u00E0 r\u00E9inscrire</caption>\n          <thead>\n            <tr>\n              <th>\u00C9l\u00E8ve</th>\n              <th>Classe actuelle</th>\n              <th>D\u00E9cision</th>\n              <th>Classe cible</th>\n              <th class=\"cell-actions\">Action</th>\n            </tr>\n          </thead>\n          <tbody>\n            @for (row of visibleRows(); track row.id) {\n              <tr>\n                <td>\n                  <strong>{{ row.studentName }}</strong>\n                  <small class=\"muted numeric\">{{ row.studentNumber }}</small>\n                </td>\n                <td>{{ row.classroomName }}</td>\n                <td><span class=\"status-pill\" data-status=\"ACTIVE\">\u00C0 d\u00E9cider</span></td>\n                <td>\n                  <select class=\"select\" [value]=\"row.targetClassroomId\"\n                          (change)=\"setTarget(row, $any($event.target).value)\">\n                    <option value=\"\">Choisir une classe</option>\n                    @for (classroom of classroomsForTarget(); track classroom.id) {\n                      <option [value]=\"classroom.id\">{{ classroom.name }} \u00B7 {{ classroom.levelName }}</option>\n                    }\n                  </select>\n                </td>\n                <td class=\"cell-actions\">\n                  <button class=\"btn btn--secondary btn--sm\" type=\"button\"\n                          [disabled]=\"!row.targetClassroomId || saving()\"\n                          (click)=\"promote(row)\">R\u00E9inscrire</button>\n                </td>\n              </tr>\n            } @empty {\n              <tr><td colspan=\"5\"><div class=\"empty\">Aucun \u00E9l\u00E8ve \u00E0 promouvoir pour le moment.</div></td></tr>\n            }\n          </tbody>\n        </table>\n      </div>\n    </section>\n  }\n</div>\n", styles: [".toolbar {\n  display: grid;\n  grid-template-columns: minmax(180px, 240px) minmax(220px, 1fr) auto;\n  gap: var(--space-4);\n  align-items: end;\n  margin-bottom: var(--space-5);\n  padding: var(--space-4) var(--space-5);\n}\n\n.field { display: flex; flex-direction: column; gap: var(--space-2); }\n.field__label { font-size: var(--text-xs); font-weight: 700; color: var(--text-muted); }\n.search-field { max-width: 420px; }\n.summary { display: flex; flex-direction: column; align-items: flex-end; color: var(--text-muted); }\n.summary strong { font-size: 24px; line-height: 1; color: var(--text-strong); }\n.summary span, .muted { font-size: var(--text-xs); color: var(--text-muted); }\n.table-card { overflow: hidden; }\n.table td strong, .table td small { display: block; }\n.table td { vertical-align: middle; }\n.table .select { min-width: 220px; }\n.empty { padding: var(--space-8); text-align: center; color: var(--text-muted); }\n\n@media (max-width: 800px) {\n  .toolbar { grid-template-columns: 1fr; }\n  .search-field { max-width: none; }\n  .summary { align-items: flex-start; }\n  .page__header { align-items: flex-start; gap: var(--space-3); flex-direction: column; }\n  .table-wrapper { overflow-x: auto; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PromotionsComponent, { className: "PromotionsComponent", filePath: "frontend/src/app/features/promotions/promotions.component.ts", lineNumber: 26 }); })();
//# sourceMappingURL=promotions.component.js.map