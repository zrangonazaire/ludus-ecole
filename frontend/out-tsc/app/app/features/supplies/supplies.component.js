import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import { LEVEL_DATA_SOURCE } from '@core/datasource/data-source';
import { PERMISSIONS } from '@core/models/auth.models';
import { SupplyListService } from '@core/services/supply-list.service';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function SuppliesComponent_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const y_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", y_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(y_r3.label);
} }
function SuppliesComponent_For_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const l_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", l_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", l_r5.name, "", l_r5.status === "ARCHIVED" ? " (archiv\u00E9)" : "", "");
} }
function SuppliesComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1, "Chargement de la liste\u2026");
    i0.ɵɵelementEnd();
} }
function SuppliesComponent_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 10);
    i0.ɵɵlistener("click", function SuppliesComponent_Conditional_23_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r6); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.years().length ? ctx_r6.load() : ctx_r6.initialize()); });
    i0.ɵɵtext(4, "R\u00E9essayer");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r6.error());
} }
function SuppliesComponent_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtext(1, "Cr\u00E9ez d\u2019abord un niveau et une ann\u00E9e scolaire pour pr\u00E9parer une liste de fournitures.");
    i0.ɵɵelementEnd();
} }
function SuppliesComponent_Conditional_25_Conditional_0_For_12_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17)(1, "label");
    i0.ɵɵtext(2);
    i0.ɵɵelement(3, "input", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "label");
    i0.ɵɵtext(5, "Quantit\u00E9");
    i0.ɵɵelement(6, "input", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "label");
    i0.ɵɵtext(8, "Pr\u00E9cisions");
    i0.ɵɵelement(9, "input", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 28);
    i0.ɵɵlistener("click", function SuppliesComponent_Conditional_25_Conditional_0_For_12_Template_button_click_10_listener() { const ɵ$index_74_r10 = i0.ɵɵrestoreView(_r9).$index; const ctx_r6 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r6.remove(ɵ$index_74_r10)); });
    i0.ɵɵtext(11, "Retirer");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ɵ$index_74_r10 = ctx.$index;
    i0.ɵɵproperty("formGroupName", ɵ$index_74_r10);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Fourniture ", ɵ$index_74_r10 + 1, "");
    i0.ɵɵadvance(8);
    i0.ɵɵattribute("aria-label", "Retirer la fourniture " + (ɵ$index_74_r10 + 1));
} }
function SuppliesComponent_Conditional_25_Conditional_0_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 21);
    i0.ɵɵtext(1, "Renseignez un titre, au moins une fourniture et des quantit\u00E9s enti\u00E8res comprises entre 1 et 999.");
    i0.ɵɵelementEnd();
} }
function SuppliesComponent_Conditional_25_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 12);
    i0.ɵɵlistener("ngSubmit", function SuppliesComponent_Conditional_25_Conditional_0_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.save()); });
    i0.ɵɵelementStart(1, "fieldset", 13)(2, "div", 14)(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "label");
    i0.ɵɵtext(8, "Titre de la liste");
    i0.ɵɵelement(9, "input", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 16);
    i0.ɵɵrepeaterCreate(11, SuppliesComponent_Conditional_25_Conditional_0_For_12_Template, 12, 3, "div", 17, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 18);
    i0.ɵɵlistener("click", function SuppliesComponent_Conditional_25_Conditional_0_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r8); const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.add()); });
    i0.ɵɵtext(14, "+ Ajouter une fourniture");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "label", 19);
    i0.ɵɵtext(16, "Recommandations aux familles");
    i0.ɵɵelement(17, "textarea", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, SuppliesComponent_Conditional_25_Conditional_0_Conditional_18_Template, 2, 0, "p", 21);
    i0.ɵɵelementStart(19, "div", 22)(20, "button", 23);
    i0.ɵɵlistener("click", function SuppliesComponent_Conditional_25_Conditional_0_Template_button_click_20_listener() { i0.ɵɵrestoreView(_r8); const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.cancel()); });
    i0.ɵɵtext(21, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 24);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const list_r11 = i0.ɵɵnextContext();
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r6.form);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r6.saving());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(list_r11.id ? "Modifier la liste" : "Cr\u00E9er la liste");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", list_r11.levelName, " \u00B7 ", list_r11.yearLabel, "");
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r6.items.controls);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r6.items.length >= 200);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(ctx_r6.form.invalid && ctx_r6.form.touched ? 18 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r6.saving() ? "Enregistrement\u2026" : "Enregistrer la liste");
} }
function SuppliesComponent_Conditional_25_Conditional_1_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function SuppliesComponent_Conditional_25_Conditional_1_Conditional_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r6 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r6.edit()); });
    i0.ɵɵtext(1, "Cr\u00E9er la liste de fournitures");
    i0.ɵɵelementEnd();
} }
function SuppliesComponent_Conditional_25_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "h2");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, SuppliesComponent_Conditional_25_Conditional_1_Conditional_5_Template, 2, 0, "button", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const list_r11 = i0.ɵɵnextContext();
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Aucune liste pour ", list_r11.levelName, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Ann\u00E9e scolaire ", list_r11.yearLabel, "");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r6.canManage() ? 5 : -1);
} }
function SuppliesComponent_Conditional_25_Conditional_2_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 10);
    i0.ɵɵlistener("click", function SuppliesComponent_Conditional_25_Conditional_2_Conditional_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r6 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r6.edit()); });
    i0.ɵɵtext(1, "Modifier");
    i0.ɵɵelementEnd();
} }
function SuppliesComponent_Conditional_25_Conditional_2_For_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r15 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r15.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r15.quantity);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r15.details || "\u2014");
} }
function SuppliesComponent_Conditional_25_Conditional_2_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3");
    i0.ɵɵtext(1, "Recommandations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p", 33);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const list_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(list_r11.notes);
} }
function SuppliesComponent_Conditional_25_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 22)(4, "button", 10);
    i0.ɵɵlistener("click", function SuppliesComponent_Conditional_25_Conditional_2_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r13); const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.load()); });
    i0.ɵɵtext(5, "Actualiser");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, SuppliesComponent_Conditional_25_Conditional_2_Conditional_6_Template, 2, 0, "button");
    i0.ɵɵelementStart(7, "button", 30);
    i0.ɵɵlistener("click", function SuppliesComponent_Conditional_25_Conditional_2_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r13); const ctx_r6 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r6.print()); });
    i0.ɵɵtext(8, "Imprimer / PDF");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "article", 31)(10, "span", 3);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "h2");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p");
    i0.ɵɵtext(15, "Niveau : ");
    i0.ɵɵelementStart(16, "strong");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(18, " \u00B7 Ann\u00E9e scolaire : ");
    i0.ɵɵelementStart(19, "strong");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 32)(22, "table")(23, "thead")(24, "tr")(25, "th");
    i0.ɵɵtext(26, "Fourniture");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "th");
    i0.ɵɵtext(28, "Quantit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "th");
    i0.ɵɵtext(30, "Pr\u00E9cisions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "tbody");
    i0.ɵɵrepeaterCreate(32, SuppliesComponent_Conditional_25_Conditional_2_For_33_Template, 7, 3, "tr", null, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(34, SuppliesComponent_Conditional_25_Conditional_2_Conditional_34_Template, 4, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const list_r11 = i0.ɵɵnextContext();
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", list_r11.items.length, " fournitures \u00B7 ", list_r11.levelName, " \u00B7 ", list_r11.yearLabel, "");
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r6.canManage() ? 6 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(list_r11.schoolName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(list_r11.title);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(list_r11.levelName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(list_r11.yearLabel);
    i0.ɵɵadvance(12);
    i0.ɵɵrepeater(list_r11.items);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(list_r11.notes ? 34 : -1);
} }
function SuppliesComponent_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, SuppliesComponent_Conditional_25_Conditional_0_Template, 24, 8, "form", 11)(1, SuppliesComponent_Conditional_25_Conditional_1_Template, 6, 3, "div", 9)(2, SuppliesComponent_Conditional_25_Conditional_2_Template, 35, 9);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r6.editing() ? 0 : !ctx.id ? 1 : 2);
} }
export class SuppliesComponent {
    api = inject(SupplyListService);
    levelSource = inject(LEVEL_DATA_SOURCE);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    destroyRef = inject(DestroyRef);
    fb = inject(FormBuilder);
    levels = signal([]);
    years = signal([]);
    current = signal(null);
    loading = signal(false);
    saving = signal(false);
    error = signal('');
    editing = signal(false);
    selectedLevel = signal('');
    selectedYear = signal('');
    canManage = computed(() => this.auth.has(PERMISSIONS.LEVEL_MANAGE)
        && !['CLOSED', 'ARCHIVED'].includes(this.years().find(y => y.id === this.selectedYear())?.status ?? ''));
    form = this.fb.nonNullable.group({
        title: ['Liste de fournitures scolaires', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(160)]],
        notes: ['', Validators.maxLength(4000)],
        items: this.fb.array([], [Validators.required, Validators.maxLength(200)])
    });
    get items() { return this.form.controls.items; }
    ngOnInit() { this.initialize(); }
    initialize() {
        this.loading.set(true);
        this.error.set('');
        forkJoin({ levels: this.levelSource.list(true), years: this.api.years() })
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: ({ levels, years }) => {
                this.levels.set(levels);
                this.years.set(years);
                this.selectedLevel.set(levels.find(l => l.status === 'ACTIVE')?.id ?? levels[0]?.id ?? '');
                this.selectedYear.set(years.find(y => y.status === 'ACTIVE')?.id ?? years[0]?.id ?? '');
                this.load();
            }, error: () => { this.loading.set(false); this.error.set('Impossible de charger les niveaux et les années scolaires.'); }
        });
    }
    select(kind, value) {
        if (this.editing() && this.form.dirty && !window.confirm('Abandonner les modifications non enregistrées ?'))
            return;
        if (kind === 'level')
            this.selectedLevel.set(value);
        else
            this.selectedYear.set(value);
        this.load();
    }
    load() {
        this.current.set(null);
        this.editing.set(false);
        this.error.set('');
        if (!this.selectedLevel() || !this.selectedYear()) {
            this.loading.set(false);
            return;
        }
        this.loading.set(true);
        this.api.get(this.selectedLevel(), this.selectedYear()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: list => { this.current.set(list); this.loading.set(false); },
            error: () => { this.loading.set(false); this.error.set('Impossible de charger la liste de fournitures.'); }
        });
    }
    itemForm(item = { name: '', quantity: 1, details: '' }) {
        return this.fb.nonNullable.group({
            name: [item.name, [Validators.required, Validators.pattern(/\S/), Validators.maxLength(200)]],
            quantity: [item.quantity, [Validators.required, Validators.min(1), Validators.max(999), Validators.pattern(/^\d+$/)]],
            details: [item.details, Validators.maxLength(500)]
        });
    }
    edit() {
        const list = this.current();
        if (!list || !this.canManage())
            return;
        this.form.patchValue({ title: list.title, notes: list.notes });
        this.items.clear();
        (list.items.length ? list.items : [{ name: '', quantity: 1, details: '' }]).forEach(item => this.items.push(this.itemForm(item)));
        this.form.markAsPristine();
        this.editing.set(true);
    }
    add() { if (this.items.length < 200) {
        this.items.push(this.itemForm());
        this.form.markAsDirty();
    } }
    remove(index) { this.items.removeAt(index); this.form.markAsDirty(); }
    cancel() {
        if (!this.canLeave())
            return;
        this.editing.set(false);
    }
    canLeave() {
        return !this.saving() && (!this.editing() || !this.form.dirty
            || window.confirm('Abandonner les modifications non enregistrées ?'));
    }
    save() {
        if (this.form.invalid || this.saving() || !this.canManage()) {
            this.form.markAllAsTouched();
            return;
        }
        this.saving.set(true);
        const value = this.form.getRawValue();
        this.api.save(this.selectedLevel(), this.selectedYear(), {
            ...value, version: this.current()?.version ?? null,
            title: value.title.trim(), notes: value.notes.trim(),
            items: value.items.map(i => ({ ...i, name: i.name.trim(), details: i.details.trim() }))
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: list => {
                this.current.set(list);
                this.saving.set(false);
                this.editing.set(false);
                this.form.markAsPristine();
                this.notifications.success('La liste de fournitures a été enregistrée.');
            }, error: err => {
                this.saving.set(false);
                this.notifications.error(err?.error?.code === 'CONCURRENT_MODIFICATION'
                    ? 'Cette liste a été modifiée par une autre personne. Annulez puis rechargez la liste avant de reprendre vos modifications.'
                    : translateErrorCode(err?.error?.code ?? 'INTERNAL_ERROR'));
            }
        });
    }
    print() {
        const list = this.current();
        if (!list?.id || this.editing())
            return;
        const preview = window.open('', '_blank');
        if (!preview) {
            this.notifications.error('Autorisez les fenêtres contextuelles pour imprimer la liste.');
            return;
        }
        // All user-provided content is inserted as text, never interpreted as HTML.
        const doc = preview.document;
        doc.title = `${list.levelName} — ${list.yearLabel} — Fournitures`;
        const style = doc.createElement('style');
        style.textContent = `@page{size:A4;margin:18mm}body{font:12pt Arial,sans-serif;color:#172033;max-width:180mm;margin:24px auto}h1{font-size:22pt}h2{font-size:14pt}table{border-collapse:collapse;width:100%;margin:24px 0;table-layout:fixed}th,td{border:1px solid #aaa;padding:10px;text-align:left;overflow-wrap:anywhere;white-space:pre-wrap}th:first-child{width:35%}th:nth-child(2){width:12%}thead{display:table-header-group}tr{break-inside:avoid}p{white-space:pre-wrap;overflow-wrap:anywhere}button{padding:10px 16px;margin-right:12px;cursor:pointer}@media print{button{display:none}body{margin:0;max-width:none}}`;
        doc.head.append(style);
        const append = (tag, text, parent = doc.body) => {
            const element = doc.createElement(tag);
            element.textContent = text;
            parent.append(element);
            return element;
        };
        const button = append('button', 'Imprimer / Enregistrer en PDF');
        button.addEventListener('click', () => preview.print());
        append('h2', list.schoolName);
        append('h1', list.title);
        append('p', `Niveau : ${list.levelName}\nAnnée scolaire : ${list.yearLabel}`);
        const table = append('table', '');
        const head = append('thead', '', table);
        const row = append('tr', '', head);
        ['Fourniture', 'Quantité', 'Précisions'].forEach(text => append('th', text, row));
        const body = append('tbody', '', table);
        list.items.forEach(item => {
            const tr = append('tr', '', body);
            [item.name, String(item.quantity), item.details].forEach(text => append('td', text, tr));
        });
        if (list.notes) {
            append('h2', 'Recommandations');
            append('p', list.notes);
        }
        preview.focus();
        preview.setTimeout(() => preview.print(), 200);
    }
    static ɵfac = function SuppliesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SuppliesComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SuppliesComponent, selectors: [["eduops-supplies"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 26, vars: 6, consts: [["year", ""], ["level", ""], [1, "supplies"], [1, "eyebrow"], [1, "filters"], [3, "change", "value", "disabled"], [3, "value"], ["role", "status", 1, "empty"], ["role", "alert", 1, "empty"], [1, "empty"], [3, "click"], [3, "formGroup"], [3, "ngSubmit", "formGroup"], [3, "disabled"], [1, "toolbar"], ["formControlName", "title", "maxlength", "160"], ["formArrayName", "items", 1, "items"], [1, "item", 3, "formGroupName"], ["type", "button", 3, "click", "disabled"], [1, "notes"], ["formControlName", "notes", "rows", "4", "maxlength", "4000", "placeholder", "Consignes g\u00E9n\u00E9rales, mat\u00E9riel \u00E0 \u00E9tiqueter\u2026"], ["role", "alert", 1, "validation"], [1, "actions"], ["type", "button", 3, "click"], ["type", "submit", 1, "primary"], ["formControlName", "name", "maxlength", "200", "placeholder", "Ex. Cahier grand format, 96 pages"], ["formControlName", "quantity", "type", "number", "min", "1", "max", "999", "step", "1"], ["formControlName", "details", "maxlength", "500", "placeholder", "Format, couleur, mati\u00E8re\u2026"], ["type", "button", 1, "remove", 3, "click"], [1, "primary"], [1, "primary", 3, "click"], [1, "sheet"], [1, "table-wrap"], [1, "preserve"]], template: function SuppliesComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "section", 2)(1, "header")(2, "div")(3, "span", 3);
            i0.ɵɵtext(4, "PR\u00C9PARER LA RENTR\u00C9E");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Fournitures scolaires");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p");
            i0.ɵɵtext(8, "Une liste par niveau et par ann\u00E9e scolaire, pr\u00EAte \u00E0 remettre aux familles.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "div", 4)(10, "label");
            i0.ɵɵtext(11, "Ann\u00E9e scolaire");
            i0.ɵɵelementStart(12, "select", 5, 0);
            i0.ɵɵlistener("change", function SuppliesComponent_Template_select_change_12_listener() { i0.ɵɵrestoreView(_r1); const year_r2 = i0.ɵɵreference(13); ctx.select("year", year_r2.value); return i0.ɵɵresetView(year_r2.value = ctx.selectedYear()); });
            i0.ɵɵrepeaterCreate(14, SuppliesComponent_For_15_Template, 2, 2, "option", 6, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "label");
            i0.ɵɵtext(17, "Niveau");
            i0.ɵɵelementStart(18, "select", 5, 1);
            i0.ɵɵlistener("change", function SuppliesComponent_Template_select_change_18_listener() { i0.ɵɵrestoreView(_r1); const level_r4 = i0.ɵɵreference(19); ctx.select("level", level_r4.value); return i0.ɵɵresetView(level_r4.value = ctx.selectedLevel()); });
            i0.ɵɵrepeaterCreate(20, SuppliesComponent_For_21_Template, 2, 3, "option", 6, _forTrack0);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(22, SuppliesComponent_Conditional_22_Template, 2, 0, "p", 7)(23, SuppliesComponent_Conditional_23_Template, 5, 1, "div", 8)(24, SuppliesComponent_Conditional_24_Template, 2, 0, "div", 9)(25, SuppliesComponent_Conditional_25_Template, 3, 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_9_0;
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("value", ctx.selectedYear())("disabled", ctx.loading() || ctx.saving());
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.years());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("value", ctx.selectedLevel())("disabled", ctx.loading() || ctx.saving());
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.levels());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loading() ? 22 : ctx.error() ? 23 : !ctx.levels().length || !ctx.years().length ? 24 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((tmp_9_0 = ctx.current()) ? 25 : -1, tmp_9_0);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.MinValidator, i1.MaxValidator, i1.FormGroupDirective, i1.FormControlName, i1.FormGroupName, i1.FormArrayName], styles: ["[_nghost-%COMP%] { display: block; }\n.supplies[_ngcontent-%COMP%] { max-width: 1200px; margin: 0 auto; padding: 28px; color: var(--text-strong); }\nh1[_ngcontent-%COMP%] { font-size: 28px; margin: 8px 0; } h2[_ngcontent-%COMP%] { font-size: 21px; } header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { color: var(--text-muted); }\n.eyebrow[_ngcontent-%COMP%] { font-size: 12px; font-weight: 700; letter-spacing: .08em; color: var(--brand); }\n.filters[_ngcontent-%COMP%], .toolbar[_ngcontent-%COMP%], .actions[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }\n.filters[_ngcontent-%COMP%] { margin: 28px 0; } .filters[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { min-width: 220px; }\nlabel[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 8px; font-size: 13px; font-weight: 600; }\ninput[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%] { width: 100%; box-sizing: border-box; border: 1px solid var(--border-strong); border-radius: 8px; padding: 11px; font: inherit; background: var(--surface-card); color: inherit; }\nbutton[_ngcontent-%COMP%] { border: 1px solid var(--border-strong); background: var(--surface-card); color: inherit; border-radius: 8px; padding: 10px 16px; font: inherit; cursor: pointer; }\nbutton[_ngcontent-%COMP%]:disabled { opacity: .5; cursor: default; } button.primary[_ngcontent-%COMP%] { background: var(--brand); border-color: transparent; color: var(--text-on-brand); }\n.toolbar[_ngcontent-%COMP%] { justify-content: space-between; margin: 20px 0; } .toolbar[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { color: var(--text-muted); }\n.empty[_ngcontent-%COMP%], .sheet[_ngcontent-%COMP%], form[_ngcontent-%COMP%] { background: var(--surface-card); border: 1px solid var(--border); border-radius: 14px; padding: 28px; }\n.empty[_ngcontent-%COMP%] { text-align: center; padding: 48px 24px; } fieldset[_ngcontent-%COMP%] { border: 0; padding: 0; margin: 0; min-width: 0; }\n.item[_ngcontent-%COMP%] { display: grid; grid-template-columns: 2fr 100px 2fr auto; align-items: end; gap: 12px; padding: 16px 0; border-bottom: 1px solid var(--border); }\n.items[_ngcontent-%COMP%] { margin: 16px 0; } .remove[_ngcontent-%COMP%], .validation[_ngcontent-%COMP%] { color: var(--danger); } .notes[_ngcontent-%COMP%] { margin: 24px 0; }\n.sheet[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 12px 0; } table[_ngcontent-%COMP%] { border-collapse: collapse; width: 100%; margin: 24px 0; table-layout: fixed; }\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] { text-align: left; padding: 14px 12px; border-bottom: 1px solid var(--border); overflow-wrap: anywhere; white-space: pre-wrap; }\nth[_ngcontent-%COMP%] { font-size: 12px; color: var(--text-muted); } th[_ngcontent-%COMP%]:nth-child(2) { width: 90px; }\n.preserve[_ngcontent-%COMP%] { white-space: pre-wrap; overflow-wrap: anywhere; } .table-wrap[_ngcontent-%COMP%] { overflow-x: auto; }\ninput.ng-invalid.ng-touched[_ngcontent-%COMP%] { border-color: var(--danger); }\n@media(max-width: 700px) { .supplies[_ngcontent-%COMP%] { padding: 16px; } .item[_ngcontent-%COMP%] { grid-template-columns: 1fr 90px; } .sheet[_ngcontent-%COMP%], form[_ngcontent-%COMP%] { padding: 18px; } .filters[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { min-width: 0; flex: 1; } }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SuppliesComponent, [{
        type: Component,
        args: [{ selector: 'eduops-supplies', standalone: true, imports: [CommonModule, ReactiveFormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"supplies\">\n  <header><div><span class=\"eyebrow\">PR\u00C9PARER LA RENTR\u00C9E</span><h1>Fournitures scolaires</h1>\n    <p>Une liste par niveau et par ann\u00E9e scolaire, pr\u00EAte \u00E0 remettre aux familles.</p></div></header>\n  <div class=\"filters\">\n    <label>Ann\u00E9e scolaire<select #year [value]=\"selectedYear()\" [disabled]=\"loading() || saving()\"\n      (change)=\"select('year', year.value); year.value = selectedYear()\">\n      @for (y of years(); track y.id) { <option [value]=\"y.id\">{{ y.label }}</option> }\n    </select></label>\n    <label>Niveau<select #level [value]=\"selectedLevel()\" [disabled]=\"loading() || saving()\"\n      (change)=\"select('level', level.value); level.value = selectedLevel()\">\n      @for (l of levels(); track l.id) { <option [value]=\"l.id\">{{ l.name }}{{ l.status === 'ARCHIVED' ? ' (archiv\u00E9)' : '' }}</option> }\n    </select></label>\n  </div>\n  @if (loading()) { <p role=\"status\" class=\"empty\">Chargement de la liste\u2026</p> }\n  @else if (error()) { <div class=\"empty\" role=\"alert\"><p>{{ error() }}</p><button (click)=\"years().length ? load() : initialize()\">R\u00E9essayer</button></div> }\n  @else if (!levels().length || !years().length) {\n    <div class=\"empty\">Cr\u00E9ez d\u2019abord un niveau et une ann\u00E9e scolaire pour pr\u00E9parer une liste de fournitures.</div>\n  }\n  @if (current(); as list) {\n    @if (editing()) {\n      <form [formGroup]=\"form\" (ngSubmit)=\"save()\">\n        <fieldset [disabled]=\"saving()\">\n          <div class=\"toolbar\"><h2>{{ list.id ? 'Modifier la liste' : 'Cr\u00E9er la liste' }}</h2><span>{{ list.levelName }} \u00B7 {{ list.yearLabel }}</span></div>\n          <label>Titre de la liste<input formControlName=\"title\" maxlength=\"160\" /></label>\n          <div formArrayName=\"items\" class=\"items\">\n            @for (item of items.controls; track item; let i = $index) {\n              <div class=\"item\" [formGroupName]=\"i\">\n                <label>Fourniture {{ i + 1 }}<input formControlName=\"name\" maxlength=\"200\" placeholder=\"Ex. Cahier grand format, 96 pages\" /></label>\n                <label>Quantit\u00E9<input formControlName=\"quantity\" type=\"number\" min=\"1\" max=\"999\" step=\"1\" /></label>\n                <label>Pr\u00E9cisions<input formControlName=\"details\" maxlength=\"500\" placeholder=\"Format, couleur, mati\u00E8re\u2026\" /></label>\n                <button type=\"button\" class=\"remove\" (click)=\"remove(i)\" [attr.aria-label]=\"'Retirer la fourniture ' + (i + 1)\">Retirer</button>\n              </div>\n            }\n          </div>\n          <button type=\"button\" (click)=\"add()\" [disabled]=\"items.length >= 200\">+ Ajouter une fourniture</button>\n          <label class=\"notes\">Recommandations aux familles<textarea formControlName=\"notes\" rows=\"4\" maxlength=\"4000\" placeholder=\"Consignes g\u00E9n\u00E9rales, mat\u00E9riel \u00E0 \u00E9tiqueter\u2026\"></textarea></label>\n          @if (form.invalid && form.touched) { <p class=\"validation\" role=\"alert\">Renseignez un titre, au moins une fourniture et des quantit\u00E9s enti\u00E8res comprises entre 1 et 999.</p> }\n          <div class=\"actions\"><button type=\"button\" (click)=\"cancel()\">Annuler</button><button class=\"primary\" type=\"submit\">{{ saving() ? 'Enregistrement\u2026' : 'Enregistrer la liste' }}</button></div>\n        </fieldset>\n      </form>\n    } @else if (!list.id) {\n      <div class=\"empty\"><h2>Aucune liste pour {{ list.levelName }}</h2><p>Ann\u00E9e scolaire {{ list.yearLabel }}</p>\n        @if (canManage()) { <button class=\"primary\" (click)=\"edit()\">Cr\u00E9er la liste de fournitures</button> }\n      </div>\n    } @else {\n      <div class=\"toolbar\"><span>{{ list.items.length }} fournitures \u00B7 {{ list.levelName }} \u00B7 {{ list.yearLabel }}</span>\n        <div class=\"actions\"><button (click)=\"load()\">Actualiser</button>@if (canManage()) { <button (click)=\"edit()\">Modifier</button> }\n          <button class=\"primary\" (click)=\"print()\">Imprimer / PDF</button></div>\n      </div>\n      <article class=\"sheet\"><span class=\"eyebrow\">{{ list.schoolName }}</span><h2>{{ list.title }}</h2>\n        <p>Niveau : <strong>{{ list.levelName }}</strong> \u00B7 Ann\u00E9e scolaire : <strong>{{ list.yearLabel }}</strong></p>\n        <div class=\"table-wrap\"><table><thead><tr><th>Fourniture</th><th>Quantit\u00E9</th><th>Pr\u00E9cisions</th></tr></thead><tbody>\n          @for (item of list.items; track $index) { <tr><td>{{ item.name }}</td><td>{{ item.quantity }}</td><td>{{ item.details || '\u2014' }}</td></tr> }\n        </tbody></table></div>\n        @if (list.notes) { <h3>Recommandations</h3><p class=\"preserve\">{{ list.notes }}</p> }\n      </article>\n    }\n  }\n</section>\n", styles: [":host { display: block; }\n.supplies { max-width: 1200px; margin: 0 auto; padding: 28px; color: var(--text-strong); }\nh1 { font-size: 28px; margin: 8px 0; } h2 { font-size: 21px; } header p { color: var(--text-muted); }\n.eyebrow { font-size: 12px; font-weight: 700; letter-spacing: .08em; color: var(--brand); }\n.filters, .toolbar, .actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }\n.filters { margin: 28px 0; } .filters label { min-width: 220px; }\nlabel { display: flex; flex-direction: column; gap: 8px; font-size: 13px; font-weight: 600; }\ninput, select, textarea { width: 100%; box-sizing: border-box; border: 1px solid var(--border-strong); border-radius: 8px; padding: 11px; font: inherit; background: var(--surface-card); color: inherit; }\nbutton { border: 1px solid var(--border-strong); background: var(--surface-card); color: inherit; border-radius: 8px; padding: 10px 16px; font: inherit; cursor: pointer; }\nbutton:disabled { opacity: .5; cursor: default; } button.primary { background: var(--brand); border-color: transparent; color: var(--text-on-brand); }\n.toolbar { justify-content: space-between; margin: 20px 0; } .toolbar span { color: var(--text-muted); }\n.empty, .sheet, form { background: var(--surface-card); border: 1px solid var(--border); border-radius: 14px; padding: 28px; }\n.empty { text-align: center; padding: 48px 24px; } fieldset { border: 0; padding: 0; margin: 0; min-width: 0; }\n.item { display: grid; grid-template-columns: 2fr 100px 2fr auto; align-items: end; gap: 12px; padding: 16px 0; border-bottom: 1px solid var(--border); }\n.items { margin: 16px 0; } .remove, .validation { color: var(--danger); } .notes { margin: 24px 0; }\n.sheet h2 { margin: 12px 0; } table { border-collapse: collapse; width: 100%; margin: 24px 0; table-layout: fixed; }\nth, td { text-align: left; padding: 14px 12px; border-bottom: 1px solid var(--border); overflow-wrap: anywhere; white-space: pre-wrap; }\nth { font-size: 12px; color: var(--text-muted); } th:nth-child(2) { width: 90px; }\n.preserve { white-space: pre-wrap; overflow-wrap: anywhere; } .table-wrap { overflow-x: auto; }\ninput.ng-invalid.ng-touched { border-color: var(--danger); }\n@media(max-width: 700px) { .supplies { padding: 16px; } .item { grid-template-columns: 1fr 90px; } .sheet, form { padding: 18px; } .filters label { min-width: 0; flex: 1; } }\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SuppliesComponent, { className: "SuppliesComponent", filePath: "frontend/src/app/features/supplies/supplies.component.ts", lineNumber: 20 }); })();
//# sourceMappingURL=supplies.component.js.map