import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { GUARDIAN_DATA_SOURCE } from '@core/datasource/data-source';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
const _c0 = () => [];
const _c1 = a0 => ["/students", a0];
function GuardiansComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx.totalElements, " responsable(s)");
} }
function GuardiansComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 11);
} }
function GuardiansComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 13);
    i0.ɵɵlistener("retry", function GuardiansComponent_Conditional_18_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.reload()); });
    i0.ɵɵelementEnd();
} }
function GuardiansComponent_Conditional_19_For_17_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "small");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const student_r3 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(3, _c1, student_r3.id));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", student_r3.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(student_r3.studentNumber);
} }
function GuardiansComponent_Conditional_19_For_17_ForEmpty_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵtext(1, "Aucun \u00E9l\u00E8ve li\u00E9");
    i0.ɵɵelementEnd();
} }
function GuardiansComponent_Conditional_19_For_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td")(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "small");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵrepeaterCreate(12, GuardiansComponent_Conditional_19_For_17_For_13_Template, 4, 5, "a", 16, _forTrack0, false, GuardiansComponent_Conditional_19_For_17_ForEmpty_14_Template, 2, 0, "span", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const guardian_r4 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(guardian_r4.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(guardian_r4.profession || "Responsable l\u00E9gal");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(guardian_r4.phone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(guardian_r4.email || "Email non renseign\u00E9");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(guardian_r4.students);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(guardian_r4.preferredChannel === "SMS" ? "SMS" : guardian_r4.preferredChannel === "PHONE" ? "T\u00E9l\u00E9phone" : "Email");
} }
function GuardiansComponent_Conditional_19_ForEmpty_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 18)(2, "div", 19);
    i0.ɵɵtext(3, "Aucun responsable trouv\u00E9.");
    i0.ɵɵelementEnd()()();
} }
function GuardiansComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 12)(1, "div", 14)(2, "table", 15)(3, "caption", 8);
    i0.ɵɵtext(4, "Liste des responsables l\u00E9gaux");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "thead")(6, "tr")(7, "th");
    i0.ɵɵtext(8, "Responsable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Contact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "\u00C9l\u00E8ve(s) rattach\u00E9(s)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Canal pr\u00E9f\u00E9r\u00E9");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "tbody");
    i0.ɵɵrepeaterCreate(16, GuardiansComponent_Conditional_19_For_17_Template, 17, 6, "tr", null, _forTrack0, false, GuardiansComponent_Conditional_19_ForEmpty_18_Template, 4, 0, "tr");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(16);
    i0.ɵɵrepeater((tmp_1_0 = (tmp_1_0 = ctx_r1.page()) == null ? null : tmp_1_0.content) !== null && tmp_1_0 !== undefined ? tmp_1_0 : i0.ɵɵpureFunction0(1, _c0));
} }
export class GuardiansComponent {
    dataSource = inject(GUARDIAN_DATA_SOURCE);
    destroyRef = inject(DestroyRef);
    search$ = new Subject();
    page = signal(null);
    loading = signal(true);
    error = signal(false);
    search = signal('');
    ngOnInit() {
        this.search$.pipe(debounceTime(250), distinctUntilChanged(), switchMap((search) => {
            this.loading.set(true);
            return this.dataSource.search({ page: 0, size: 50, search: search || undefined });
        }), takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (page) => {
                this.page.set(page);
                this.loading.set(false);
                this.error.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
        this.search$.next('');
    }
    updateSearch(value) {
        this.search.set(value);
        this.search$.next(value.trim());
    }
    reload() {
        this.search$.next(this.search().trim());
    }
    static ɵfac = function GuardiansComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || GuardiansComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: GuardiansComponent, selectors: [["eduops-guardians"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 20, vars: 3, consts: [[1, "page"], [1, "page__header"], [1, "eyebrow"], [1, "page__title"], [1, "page__meta"], ["routerLink", "/students", 1, "btn", "btn--primary"], [1, "toolbar", "card"], [1, "search-field"], [1, "visually-hidden"], ["type", "search", "placeholder", "Nom, t\u00E9l\u00E9phone ou email", 1, "input", 3, "input", "value"], [1, "result-count", "numeric"], ["message", "Chargement des responsables l\u00E9gaux..."], [1, "card", "table-card"], [3, "retry"], [1, "table-wrapper"], [1, "table"], [1, "student-link", 3, "routerLink"], [1, "muted"], ["colspan", "4"], [1, "empty"]], template: function GuardiansComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "Scolarit\u00E9 \u00B7 Familles");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1", 3);
            i0.ɵɵtext(6, "Responsables l\u00E9gaux");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, "Retrouvez les contacts des familles et les \u00E9l\u00E8ves rattach\u00E9s.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "a", 5);
            i0.ɵɵtext(10, "Voir les \u00E9l\u00E8ves");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "section", 6)(12, "label", 7)(13, "span", 8);
            i0.ɵɵtext(14, "Rechercher un responsable");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "input", 9);
            i0.ɵɵlistener("input", function GuardiansComponent_Template_input_input_15_listener($event) { return ctx.updateSearch($event.target.value); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(16, GuardiansComponent_Conditional_16_Template, 2, 1, "span", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(17, GuardiansComponent_Conditional_17_Template, 1, 0, "eduops-loading-state", 11)(18, GuardiansComponent_Conditional_18_Template, 1, 0, "eduops-error-state")(19, GuardiansComponent_Conditional_19_Template, 19, 2, "section", 12);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_1_0;
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("value", ctx.search());
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_1_0 = ctx.page()) ? 16 : -1, tmp_1_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 17 : ctx.error() ? 18 : 19);
        } }, dependencies: [CommonModule, RouterLink, LoadingStateComponent, ErrorStateComponent], styles: [".toolbar[_ngcontent-%COMP%] { display: flex; align-items: end; gap: var(--space-4); margin-bottom: var(--space-5); padding: var(--space-4) var(--space-5); }\n.search-field[_ngcontent-%COMP%] { flex: 1; max-width: 480px; }\n.result-count[_ngcontent-%COMP%] { color: var(--text-muted); font-size: var(--text-sm); }\n.table-card[_ngcontent-%COMP%] { overflow: hidden; }\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { display: block; }\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { margin-top: 3px; color: var(--text-muted); font-size: var(--text-xs); }\n.student-link[_ngcontent-%COMP%] { display: block; color: var(--brand); font-weight: 700; text-decoration: none; }\n.student-link[_ngcontent-%COMP%]:hover { text-decoration: underline; }\n.muted[_ngcontent-%COMP%], .empty[_ngcontent-%COMP%] { color: var(--text-muted); }\n.empty[_ngcontent-%COMP%] { padding: var(--space-8); text-align: center; }\n@media (max-width: 720px) { .toolbar[_ngcontent-%COMP%] { align-items: stretch; flex-direction: column; } .search-field[_ngcontent-%COMP%] { max-width: none; } .table-wrapper[_ngcontent-%COMP%] { overflow-x: auto; } }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GuardiansComponent, [{
        type: Component,
        args: [{ selector: 'eduops-guardians', standalone: true, imports: [CommonModule, RouterLink, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <p class=\"eyebrow\">Scolarit\u00E9 \u00B7 Familles</p>\n      <h1 class=\"page__title\">Responsables l\u00E9gaux</h1>\n      <p class=\"page__meta\">Retrouvez les contacts des familles et les \u00E9l\u00E8ves rattach\u00E9s.</p>\n    </div>\n    <a class=\"btn btn--primary\" routerLink=\"/students\">Voir les \u00E9l\u00E8ves</a>\n  </header>\n\n  <section class=\"toolbar card\">\n    <label class=\"search-field\">\n      <span class=\"visually-hidden\">Rechercher un responsable</span>\n      <input class=\"input\" type=\"search\" placeholder=\"Nom, t\u00E9l\u00E9phone ou email\"\n             [value]=\"search()\" (input)=\"updateSearch($any($event.target).value)\" />\n    </label>\n    @if (page(); as result) {\n      <span class=\"result-count numeric\">{{ result.totalElements }} responsable(s)</span>\n    }\n  </section>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des responsables l\u00E9gaux...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"reload()\" />\n  } @else {\n    <section class=\"card table-card\">\n      <div class=\"table-wrapper\">\n        <table class=\"table\">\n          <caption class=\"visually-hidden\">Liste des responsables l\u00E9gaux</caption>\n          <thead><tr><th>Responsable</th><th>Contact</th><th>\u00C9l\u00E8ve(s) rattach\u00E9(s)</th><th>Canal pr\u00E9f\u00E9r\u00E9</th></tr></thead>\n          <tbody>\n            @for (guardian of page()?.content ?? []; track guardian.id) {\n              <tr>\n                <td><strong>{{ guardian.fullName }}</strong><small>{{ guardian.profession || 'Responsable l\u00E9gal' }}</small></td>\n                <td><strong>{{ guardian.phone }}</strong><small>{{ guardian.email || 'Email non renseign\u00E9' }}</small></td>\n                <td>\n                  @for (student of guardian.students; track student.id) {\n                    <a class=\"student-link\" [routerLink]=\"['/students', student.id]\">{{ student.name }} <small>{{ student.studentNumber }}</small></a>\n                  } @empty { <span class=\"muted\">Aucun \u00E9l\u00E8ve li\u00E9</span> }\n                </td>\n                <td>{{ guardian.preferredChannel === 'SMS' ? 'SMS' : guardian.preferredChannel === 'PHONE' ? 'T\u00E9l\u00E9phone' : 'Email' }}</td>\n              </tr>\n            } @empty {\n              <tr><td colspan=\"4\"><div class=\"empty\">Aucun responsable trouv\u00E9.</div></td></tr>\n            }\n          </tbody>\n        </table>\n      </div>\n    </section>\n  }\n</div>\n", styles: [".toolbar { display: flex; align-items: end; gap: var(--space-4); margin-bottom: var(--space-5); padding: var(--space-4) var(--space-5); }\n.search-field { flex: 1; max-width: 480px; }\n.result-count { color: var(--text-muted); font-size: var(--text-sm); }\n.table-card { overflow: hidden; }\n.table td strong, .table td small { display: block; }\n.table td small { margin-top: 3px; color: var(--text-muted); font-size: var(--text-xs); }\n.student-link { display: block; color: var(--brand); font-weight: 700; text-decoration: none; }\n.student-link:hover { text-decoration: underline; }\n.muted, .empty { color: var(--text-muted); }\n.empty { padding: var(--space-8); text-align: center; }\n@media (max-width: 720px) { .toolbar { align-items: stretch; flex-direction: column; } .search-field { max-width: none; } .table-wrapper { overflow-x: auto; } }\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(GuardiansComponent, { className: "GuardiansComponent", filePath: "frontend/src/app/features/guardians/guardians.component.ts", lineNumber: 20 }); })();
//# sourceMappingURL=guardians.component.js.map