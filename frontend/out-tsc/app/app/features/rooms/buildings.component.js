import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function BuildingsComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function BuildingsComponent_Conditional_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.open()); });
    i0.ɵɵtext(1, "+ Nouveau b\u00E2timent");
    i0.ɵɵelementEnd();
} }
function BuildingsComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 4);
    i0.ɵɵtext(1, "Chargement des b\u00E2timents\u2026");
    i0.ɵɵelementEnd();
} }
function BuildingsComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 5);
    i0.ɵɵtext(1, "Impossible de charger les b\u00E2timents. ");
    i0.ɵɵelementStart(2, "button", 8);
    i0.ɵɵlistener("click", function BuildingsComponent_Conditional_9_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵtext(3, "R\u00E9essayer");
    i0.ɵɵelementEnd()();
} }
function BuildingsComponent_Conditional_10_For_2_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(level_r4.label);
} }
function BuildingsComponent_Conditional_10_For_2_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵlistener("click", function BuildingsComponent_Conditional_10_For_2_Conditional_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const building_r6 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.addLevel(building_r6)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const building_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r1.adding() !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.adding() === building_r6.id ? "Ajout\u2026" : "+ Ajouter un \u00E9tage");
} }
function BuildingsComponent_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 9)(1, "h3");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "ul");
    i0.ɵɵrepeaterCreate(8, BuildingsComponent_Conditional_10_For_2_For_9_Template, 2, 1, "li", null, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, BuildingsComponent_Conditional_10_For_2_Conditional_10_Template, 2, 2, "button", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const building_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(building_r6.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", building_r6.campusName, " \u00B7 ", building_r6.code, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(building_r6.floors === 0 ? "Plain-pied" : "R+" + building_r6.floors);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(building_r6.levels);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.auth.has("ROOM_MANAGE") ? 10 : -1);
} }
function BuildingsComponent_Conditional_10_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Aucun b\u00E2timent enregistr\u00E9. Utilisez \u00AB Nouveau b\u00E2timent \u00BB pour en cr\u00E9er un.");
    i0.ɵɵelementEnd();
} }
function BuildingsComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵrepeaterCreate(1, BuildingsComponent_Conditional_10_For_2_Template, 11, 5, "article", 9, _forTrack0, false, BuildingsComponent_Conditional_10_ForEmpty_3_Template, 2, 0, "p");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.buildings());
} }
function BuildingsComponent_Conditional_11_For_15_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const campus_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("value", campus_r8.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(campus_r8.name);
} }
function BuildingsComponent_Conditional_11_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, BuildingsComponent_Conditional_11_For_15_Conditional_0_Template, 2, 2, "option", 29);
} if (rf & 2) {
    const campus_r8 = ctx.$implicit;
    i0.ɵɵconditional(campus_r8.status === "ACTIVE" ? 0 : -1);
} }
function BuildingsComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵlistener("click", function BuildingsComponent_Conditional_11_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 13);
    i0.ɵɵlistener("keydown.escape", function BuildingsComponent_Conditional_11_Template_aside_keydown_escape_1_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵelementStart(2, "header", 14)(3, "h2", 15);
    i0.ɵɵtext(4, "Nouveau b\u00E2timent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 16);
    i0.ɵɵlistener("click", function BuildingsComponent_Conditional_11_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 17);
    i0.ɵɵlistener("ngSubmit", function BuildingsComponent_Conditional_11_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵelementStart(8, "label", 18)(9, "span", 19);
    i0.ɵɵtext(10, "Campus *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 20)(12, "option", 21);
    i0.ɵɵtext(13, "Choisir un campus");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(14, BuildingsComponent_Conditional_11_For_15_Template, 1, 1, null, null, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "p", 22);
    i0.ɵɵtext(17, "Un campus actif est n\u00E9cessaire. Si la liste est vide, v\u00E9rifiez vos campus dans la configuration de l\u2019\u00E9tablissement.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "label", 18)(19, "span", 19);
    i0.ɵɵtext(20, "Code *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "input", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "label", 18)(23, "span", 19);
    i0.ɵɵtext(24, "Nom *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "label", 18)(27, "span", 19);
    i0.ɵɵtext(28, "Nombre d\u2019\u00E9tages au-dessus du rez-de-chauss\u00E9e *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(29, "input", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "p", 22);
    i0.ɵɵtext(31, "Le rez-de-chauss\u00E9e est cr\u00E9\u00E9 automatiquement. Saisissez 2 pour cr\u00E9er aussi le 1er et le 2e \u00E9tage.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "footer", 26)(33, "button", 27);
    i0.ɵɵlistener("click", function BuildingsComponent_Conditional_11_Template_button_click_33_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.close()); });
    i0.ɵɵtext(34, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "button", 28);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(ctx_r1.campuses());
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.form.invalid || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.saving() ? "Cr\u00E9ation\u2026" : "Cr\u00E9er le b\u00E2timent");
} }
export class BuildingsComponent {
    http = inject(HttpClient);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    notifications = inject(NotificationService);
    auth = inject(AuthService);
    campuses = input([]);
    changed = output();
    buildings = signal([]);
    loading = signal(false);
    error = signal(false);
    opened = signal(false);
    saving = signal(false);
    adding = signal(null);
    addLevel(building) {
        if (this.adding())
            return;
        this.adding.set(building.id);
        this.http.post(`${environment.apiBaseUrl}/buildings/${building.id}/levels`, {})
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => { this.adding.set(null); this.load(); },
            error: () => this.adding.set(null)
        });
    }
    form = this.fb.nonNullable.group({
        campusId: ['', Validators.required],
        code: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(30)]],
        name: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(120)]],
        floors: [0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]]
    });
    constructor() { this.load(); }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.http.get(`${environment.apiBaseUrl}/buildings`)
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: list => { this.buildings.set(list); this.changed.emit(list); this.loading.set(false); },
            error: () => { this.error.set(true); this.loading.set(false); }
        });
    }
    open() {
        this.form.reset({ campusId: this.campuses().find(c => c.status === 'ACTIVE')?.id ?? '', code: '', name: '', floors: 0 });
        this.opened.set(true);
    }
    close() { if (!this.saving())
        this.opened.set(false); }
    submit() {
        if (this.form.invalid || this.saving()) {
            this.form.markAllAsTouched();
            return;
        }
        const value = this.form.getRawValue();
        this.saving.set(true);
        this.http.post(`${environment.apiBaseUrl}/buildings`, {
            ...value, code: value.code.trim().toUpperCase(), name: value.name.trim()
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: building => {
                this.saving.set(false);
                this.opened.set(false);
                this.notifications.success(`${building.name} a été créé.`, 'Bâtiment créé');
                this.load();
            },
            error: () => this.saving.set(false)
        });
    }
    static ɵfac = function BuildingsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BuildingsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BuildingsComponent, selectors: [["eduops-buildings"]], inputs: { campuses: [1, "campuses"] }, outputs: { changed: "changed" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 12, vars: 3, consts: [["aria-labelledby", "buildings-title", 1, "buildings"], [1, "buildings__head"], ["id", "buildings-title"], ["type", "button", 1, "btn", "btn--secondary"], ["role", "status"], ["role", "alert"], [1, "buildings__grid"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], [1, "card", "buildings__card"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "disabled"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "building-form-title", 1, "drawer", 3, "keydown.escape"], [1, "drawer__head"], ["id", "building-form-title"], ["type", "button", "aria-label", "Fermer", 1, "btn", "btn--ghost", 3, "click"], ["id", "building-form", 1, "drawer__body", 3, "ngSubmit", "formGroup"], [1, "field"], [1, "field__label"], ["formControlName", "campusId", 1, "select"], ["value", ""], [1, "hint-block"], ["formControlName", "code", "maxlength", "30", "placeholder", "BAT-A", 1, "input"], ["formControlName", "name", "maxlength", "120", "placeholder", "B\u00E2timent A", 1, "input"], ["type", "number", "min", "0", "step", "1", "formControlName", "floors", 1, "input"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--secondary", 3, "click", "disabled"], ["type", "submit", "form", "building-form", 1, "btn", "btn--primary", 3, "disabled"], [3, "value"]], template: function BuildingsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "header", 1)(2, "div")(3, "h2", 2);
            i0.ɵɵtext(4, "B\u00E2timents");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Cr\u00E9ez vos b\u00E2timents avant d\u2019y ajouter des salles.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, BuildingsComponent_Conditional_7_Template, 2, 0, "button", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, BuildingsComponent_Conditional_8_Template, 2, 0, "p", 4)(9, BuildingsComponent_Conditional_9_Template, 4, 0, "p", 5)(10, BuildingsComponent_Conditional_10_Template, 4, 1, "div", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(11, BuildingsComponent_Conditional_11_Template, 37, 4);
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵconditional(ctx.auth.has("ROOM_MANAGE") ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 8 : ctx.error() ? 9 : 10);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.opened() ? 11 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.MinValidator, i1.FormGroupDirective, i1.FormControlName], styles: ["@import 'styles/tokens';\n\n.lead[_ngcontent-%COMP%] {\n  max-width: 760px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n\n\n\n.filters[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  align-items: end;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  margin-bottom: var(--space-4);\n\n  .field { margin-bottom: 0; }\n\n  &__reset {\n    justify-self: start;\n    align-self: end;\n  }\n}\n\n.groups[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n}\n\n.group[_ngcontent-%COMP%] {\n  overflow: hidden;\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title {\n    margin: 0;\n    font-size: var(--text-md);\n    font-family: var(--font-display);\n    color: var(--text-strong);\n  }\n\n  &__meta {\n    margin: 2px 0 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n\n  &__totals {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    flex: none;\n    font-variant-numeric: tabular-nums;\n  }\n\n  &__rooms {\n    display: flex;\n    flex-direction: column;\n  }\n}\n\n.room[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-5);\n\n  & + .room { border-top: 1px solid var(--border-light); }\n\n  &--archived {\n    opacity: 0.6;\n\n    .room__name { text-decoration: line-through; }\n  }\n\n  &__identity {\n    min-width: 0;\n    flex: 1;\n  }\n\n  &__name {\n    margin: 0;\n    font-size: var(--text-base);\n    color: var(--text-normal);\n  }\n\n  &__sub {\n    margin: 2px 0 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n\n    em { color: var(--warning); font-style: normal; font-weight: 600; }\n  }\n\n  &__usage { flex: none; }\n\n  &__side {\n    display: flex;\n    align-items: center;\n    gap: var(--space-1);\n    flex: none;\n  }\n}\n\n.empty[_ngcontent-%COMP%] {\n  &__title {\n    margin: 0;\n    font-size: var(--text-md);\n  }\n  &__text {\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    max-width: 620px;\n  }\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.grid2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.muted[_ngcontent-%COMP%] {\n  margin-left: var(--space-2);\n  font-size: var(--text-xs);\n  color: var(--text-light);\n}\n\n.numeric[_ngcontent-%COMP%] { font-variant-numeric: tabular-nums; }\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgb(15 23 42 / 0.45);\n  z-index: var(--z-modal-backdrop);\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n\n    h2 { margin: 0; font-size: var(--text-md); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-3);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}", ".buildings[_ngcontent-%COMP%] { margin-bottom: var(--space-5); }\n.buildings__head[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-3); h2, p { margin: 0; } p { color: var(--text-muted); font-size: var(--text-sm); margin-top: 4px; } }\n.buildings__grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr)); gap: var(--space-3); }\n.buildings__card[_ngcontent-%COMP%] { padding: var(--space-4); min-width: 0; overflow-wrap: anywhere; h3 { margin: 0; font-size: var(--text-md); } p { color: var(--text-muted); font-size: var(--text-sm); margin: 8px 0 0; } }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BuildingsComponent, [{
        type: Component,
        args: [{ selector: 'eduops-buildings', standalone: true, imports: [ReactiveFormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"buildings\" aria-labelledby=\"buildings-title\">\n  <header class=\"buildings__head\"><div><h2 id=\"buildings-title\">B\u00E2timents</h2><p>Cr\u00E9ez vos b\u00E2timents avant d\u2019y ajouter des salles.</p></div>\n    @if (auth.has('ROOM_MANAGE')) { <button type=\"button\" class=\"btn btn--secondary\" (click)=\"open()\">+ Nouveau b\u00E2timent</button> }\n  </header>\n  @if (loading()) { <p role=\"status\">Chargement des b\u00E2timents\u2026</p> }\n  @else if (error()) { <p role=\"alert\">Impossible de charger les b\u00E2timents. <button type=\"button\" class=\"btn btn--ghost\" (click)=\"load()\">R\u00E9essayer</button></p> }\n  @else {\n    <div class=\"buildings__grid\">@for (building of buildings(); track building.id) {\n      <article class=\"card buildings__card\"><h3>{{ building.name }}</h3><p>{{ building.campusName }} \u00B7 {{ building.code }}</p>\n        <p>{{ building.floors === 0 ? 'Plain-pied' : 'R+' + building.floors }}</p>\n        <ul>@for (level of building.levels; track level.id) { <li>{{ level.label }}</li> }</ul>\n        @if (auth.has('ROOM_MANAGE')) {\n          <button type=\"button\" class=\"btn btn--ghost btn--sm\" [disabled]=\"adding() !== null\" (click)=\"addLevel(building)\">{{ adding() === building.id ? 'Ajout\u2026' : '+ Ajouter un \u00E9tage' }}</button>\n        }\n      </article>\n    } @empty { <p>Aucun b\u00E2timent enregistr\u00E9. Utilisez \u00AB Nouveau b\u00E2timent \u00BB pour en cr\u00E9er un.</p> }</div>\n  }\n</section>\n@if (opened()) {\n  <div class=\"drawer-backdrop\" (click)=\"close()\"></div>\n  <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"building-form-title\" (keydown.escape)=\"close()\">\n    <header class=\"drawer__head\"><h2 id=\"building-form-title\">Nouveau b\u00E2timent</h2><button type=\"button\" class=\"btn btn--ghost\" aria-label=\"Fermer\" (click)=\"close()\">\u00D7</button></header>\n    <form class=\"drawer__body\" id=\"building-form\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n      <label class=\"field\"><span class=\"field__label\">Campus *</span><select class=\"select\" formControlName=\"campusId\"><option value=\"\">Choisir un campus</option>\n        @for (campus of campuses(); track campus.id) { @if (campus.status === 'ACTIVE') { <option [value]=\"campus.id\">{{ campus.name }}</option> } }\n      </select></label>\n      <p class=\"hint-block\">Un campus actif est n\u00E9cessaire. Si la liste est vide, v\u00E9rifiez vos campus dans la configuration de l\u2019\u00E9tablissement.</p>\n      <label class=\"field\"><span class=\"field__label\">Code *</span><input class=\"input\" formControlName=\"code\" maxlength=\"30\" placeholder=\"BAT-A\" /></label>\n      <label class=\"field\"><span class=\"field__label\">Nom *</span><input class=\"input\" formControlName=\"name\" maxlength=\"120\" placeholder=\"B\u00E2timent A\" /></label>\n      <label class=\"field\"><span class=\"field__label\">Nombre d\u2019\u00E9tages au-dessus du rez-de-chauss\u00E9e *</span><input class=\"input\" type=\"number\" min=\"0\" step=\"1\" formControlName=\"floors\" /></label>\n      <p class=\"hint-block\">Le rez-de-chauss\u00E9e est cr\u00E9\u00E9 automatiquement. Saisissez 2 pour cr\u00E9er aussi le 1er et le 2e \u00E9tage.</p>\n    </form>\n    <footer class=\"drawer__foot\"><button type=\"button\" class=\"btn btn--secondary\" (click)=\"close()\" [disabled]=\"saving()\">Annuler</button>\n      <button type=\"submit\" form=\"building-form\" class=\"btn btn--primary\" [disabled]=\"form.invalid || saving()\">{{ saving() ? 'Cr\u00E9ation\u2026' : 'Cr\u00E9er le b\u00E2timent' }}</button></footer>\n  </aside>\n}\n", styles: ["@import 'styles/tokens';\n\n.lead {\n  max-width: 760px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n/* Filtres : une ligne d'outils, pas un formulaire. Les libell\u00E9s restent\n   au-dessus des champs pour que la barre se replie proprement sur mobile. */\n.filters {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  align-items: end;\n  gap: var(--space-3);\n  padding: var(--space-4);\n  margin-bottom: var(--space-4);\n\n  .field { margin-bottom: 0; }\n\n  &__reset {\n    justify-self: start;\n    align-self: end;\n  }\n}\n\n.groups {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-4);\n}\n\n.group {\n  overflow: hidden;\n\n  &__head {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border-light);\n  }\n\n  &__title {\n    margin: 0;\n    font-size: var(--text-md);\n    font-family: var(--font-display);\n    color: var(--text-strong);\n  }\n\n  &__meta {\n    margin: 2px 0 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n\n  &__totals {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    flex: none;\n    font-variant-numeric: tabular-nums;\n  }\n\n  &__rooms {\n    display: flex;\n    flex-direction: column;\n  }\n}\n\n.room {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-5);\n\n  & + .room { border-top: 1px solid var(--border-light); }\n\n  &--archived {\n    opacity: 0.6;\n\n    .room__name { text-decoration: line-through; }\n  }\n\n  &__identity {\n    min-width: 0;\n    flex: 1;\n  }\n\n  &__name {\n    margin: 0;\n    font-size: var(--text-base);\n    color: var(--text-normal);\n  }\n\n  &__sub {\n    margin: 2px 0 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n\n    em { color: var(--warning); font-style: normal; font-weight: 600; }\n  }\n\n  &__usage { flex: none; }\n\n  &__side {\n    display: flex;\n    align-items: center;\n    gap: var(--space-1);\n    flex: none;\n  }\n}\n\n.empty {\n  &__title {\n    margin: 0;\n    font-size: var(--text-md);\n  }\n  &__text {\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n    max-width: 620px;\n  }\n}\n\n.hint-block {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.grid2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.muted {\n  margin-left: var(--space-2);\n  font-size: var(--text-xs);\n  color: var(--text-light);\n}\n\n.numeric { font-variant-numeric: tabular-nums; }\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgb(15 23 42 / 0.45);\n  z-index: var(--z-modal-backdrop);\n}\n\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: min(480px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n  z-index: var(--z-modal);\n  display: flex;\n  flex-direction: column;\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n\n    h2 { margin: 0; font-size: var(--text-md); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-3);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n", ".buildings { margin-bottom: var(--space-5); }\n.buildings__head { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-3); h2, p { margin: 0; } p { color: var(--text-muted); font-size: var(--text-sm); margin-top: 4px; } }\n.buildings__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr)); gap: var(--space-3); }\n.buildings__card { padding: var(--space-4); min-width: 0; overflow-wrap: anywhere; h3 { margin: 0; font-size: var(--text-md); } p { color: var(--text-muted); font-size: var(--text-sm); margin: 8px 0 0; } }\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BuildingsComponent, { className: "BuildingsComponent", filePath: "frontend/src/app/features/rooms/buildings.component.ts", lineNumber: 22 }); })();
//# sourceMappingURL=buildings.component.js.map