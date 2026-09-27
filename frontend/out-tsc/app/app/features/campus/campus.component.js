import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { CAMPUS_DATA_SOURCE } from '@core/datasource/data-source';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function CampusComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 5);
    i0.ɵɵtext(1, "B\u00E2timents et salles");
    i0.ɵɵelementEnd();
} }
function CampusComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 12);
    i0.ɵɵlistener("click", function CampusComponent_Conditional_11_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreate()); });
    i0.ɵɵelementStart(1, "span", 13);
    i0.ɵɵtext(2, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Nouveau campus ");
    i0.ɵɵelementEnd();
} }
function CampusComponent_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 9);
} }
function CampusComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 14);
    i0.ɵɵlistener("retry", function CampusComponent_Conditional_15_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.load()); });
    i0.ɵɵelementEnd();
} }
function CampusComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 15)(2, "h2", 16);
    i0.ɵɵtext(3, "Aucun campus");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 17);
    i0.ɵɵtext(5, "Cr\u00E9ez le premier campus pour organiser les salles de l'\u00E9tablissement.");
    i0.ɵɵelementEnd()()();
} }
function CampusComponent_Conditional_17_For_2_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const campus_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", campus_r4.addressLine1, " \u00B7 ");
} }
function CampusComponent_Conditional_17_For_2_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const campus_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", campus_r4.city, " ");
} }
function CampusComponent_Conditional_17_For_2_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const campus_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" \u00B7 ", campus_r4.roomCount, " salle(s) ");
} }
function CampusComponent_Conditional_17_For_2_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 26);
    i0.ɵɵtext(1, "Principal");
    i0.ɵɵelementEnd();
} }
function CampusComponent_Conditional_17_For_2_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 27);
    i0.ɵɵtext(1, "Archiv\u00E9");
    i0.ɵɵelementEnd();
} }
function CampusComponent_Conditional_17_For_2_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function CampusComponent_Conditional_17_For_2_Conditional_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const campus_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.restore(campus_r4)); });
    i0.ɵɵtext(1, "Restaurer");
    i0.ɵɵelementEnd();
} }
function CampusComponent_Conditional_17_For_2_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function CampusComponent_Conditional_17_For_2_Conditional_16_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const campus_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openEdit(campus_r4)); });
    i0.ɵɵtext(1, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 32);
    i0.ɵɵlistener("click", function CampusComponent_Conditional_17_For_2_Conditional_16_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r6); const campus_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.archive(campus_r4)); });
    i0.ɵɵtext(3, "Archiver");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const campus_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", campus_r4.archivable === false);
} }
function CampusComponent_Conditional_17_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "div", 20)(2, "div", 21)(3, "h3", 22);
    i0.ɵɵtext(4);
    i0.ɵɵelementStart(5, "span", 23);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "p", 24);
    i0.ɵɵtemplate(8, CampusComponent_Conditional_17_For_2_Conditional_8_Template, 1, 1)(9, CampusComponent_Conditional_17_For_2_Conditional_9_Template, 1, 1)(10, CampusComponent_Conditional_17_For_2_Conditional_10_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 25);
    i0.ɵɵtemplate(12, CampusComponent_Conditional_17_For_2_Conditional_12_Template, 2, 0, "span", 26)(13, CampusComponent_Conditional_17_For_2_Conditional_13_Template, 2, 0, "span", 27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 28);
    i0.ɵɵtemplate(15, CampusComponent_Conditional_17_For_2_Conditional_15_Template, 2, 0, "button", 29)(16, CampusComponent_Conditional_17_For_2_Conditional_16_Template, 4, 1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const campus_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("campus--archived", campus_r4.status !== "ACTIVE");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", campus_r4.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(campus_r4.code);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(campus_r4.addressLine1 ? 8 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(campus_r4.city ? 9 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(campus_r4.roomCount !== undefined ? 10 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(campus_r4.main ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(campus_r4.status !== "ACTIVE" ? 13 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(campus_r4.status !== "ACTIVE" ? 15 : ctx_r1.canManage() ? 16 : -1);
} }
function CampusComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 11);
    i0.ɵɵrepeaterCreate(1, CampusComponent_Conditional_17_For_2_Template, 17, 10, "div", 18, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.campuses());
} }
function CampusComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵlistener("click", function CampusComponent_Conditional_18_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "aside", 34)(2, "header", 35)(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 30);
    i0.ɵɵlistener("click", function CampusComponent_Conditional_18_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "form", 36);
    i0.ɵɵlistener("ngSubmit", function CampusComponent_Conditional_18_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵelementStart(8, "div", 37)(9, "label", 38)(10, "span", 39);
    i0.ɵɵtext(11, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "label", 38)(14, "span", 39);
    i0.ɵɵtext(15, "Nom");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "input", 41);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 37)(18, "label", 38)(19, "span", 39);
    i0.ɵɵtext(20, "Adresse");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "input", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "label", 38)(23, "span", 39);
    i0.ɵɵtext(24, "Ville");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 43);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 37)(27, "label", 38)(28, "span", 39);
    i0.ɵɵtext(29, "T\u00E9l\u00E9phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "label", 38)(32, "span", 39);
    i0.ɵɵtext(33, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(34, "input", 45);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "label", 46);
    i0.ɵɵelement(36, "input", 47);
    i0.ɵɵelementStart(37, "span");
    i0.ɵɵtext(38, "Campus principal (un seul par \u00E9tablissement)");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(39, "footer", 48)(40, "button", 6);
    i0.ɵɵlistener("click", function CampusComponent_Conditional_18_Template_button_click_40_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePanel()); });
    i0.ɵɵtext(41, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "button", 49);
    i0.ɵɵlistener("click", function CampusComponent_Conditional_18_Template_button_click_42_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.editing() ? "Modifier " + ctx_r1.editing().name : "Nouveau campus");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance(35);
    i0.ɵɵproperty("disabled", ctx_r1.form.invalid || ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Enregistrement..." : ctx_r1.editing() ? "Enregistrer" : "Cr\u00E9er", " ");
} }
/**
 * Campus et salles physiques de l'établissement.
 *
 * <p>Un campus représente un site physique. Un seul campus peut être marqué
 * comme principal. L'archivage est refusé si des salles actives sont encore
 * rattachées au campus.</p>
 */
export class CampusComponent {
    dataSource = inject(CAMPUS_DATA_SOURCE);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    setupStatus = inject(SetupStatusService);
    fb = inject(FormBuilder);
    destroyRef = inject(DestroyRef);
    campuses = signal([]);
    loading = signal(true);
    error = signal(false);
    saving = signal(false);
    showArchived = signal(false);
    editing = signal(null);
    creating = signal(false);
    canManage = computed(() => this.auth.has(PERMISSIONS.CAMPUS_MANAGE));
    canViewRooms = computed(() => this.auth.has(PERMISSIONS.ROOM_VIEW));
    form = this.fb.nonNullable.group({
        code: ['', [Validators.required, Validators.maxLength(30)]],
        name: ['', [Validators.required, Validators.maxLength(120)]],
        addressLine1: [''],
        city: [''],
        phone: [''],
        email: [''],
        main: [false]
    });
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.dataSource.list(this.showArchived())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (list) => {
                this.campuses.set(list);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    toggleArchived() {
        this.showArchived.update(v => !v);
        this.load();
    }
    activeCount = computed(() => this.campuses().filter(c => c.status === 'ACTIVE').length);
    openCreate() {
        this.editing.set(null);
        this.creating.set(true);
        this.form.reset({
            code: '',
            name: '',
            addressLine1: '',
            city: '',
            phone: '',
            email: '',
            main: false
        });
    }
    openEdit(campus) {
        this.editing.set(campus);
        this.creating.set(false);
        this.form.reset({
            code: campus.code,
            name: campus.name,
            addressLine1: campus.addressLine1 ?? '',
            city: campus.city ?? '',
            phone: campus.phone ?? '',
            email: campus.email ?? '',
            main: campus.main
        });
    }
    closePanel() {
        this.editing.set(null);
        this.creating.set(false);
    }
    submit() {
        if (this.form.invalid || this.saving()) {
            this.form.markAllAsTouched();
            return;
        }
        const editing = this.editing();
        const value = this.form.getRawValue();
        const payload = {
            code: value.code.toUpperCase().trim(),
            name: value.name.trim(),
            addressLine1: value.addressLine1.trim() || undefined,
            city: value.city.trim() || undefined,
            phone: value.phone.trim() || undefined,
            email: value.email.trim() || undefined,
            main: !!value.main
        };
        this.saving.set(true);
        const request = editing
            ? this.dataSource.update(editing.id, payload)
            : this.dataSource.create(payload);
        request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (campus) => {
                this.notifications.success(editing ? `${campus.name} est à jour.` : `${campus.name} a été créé.`, editing ? 'Campus modifié' : 'Campus créé');
                this.afterWrite();
            },
            error: (err) => {
                this.saving.set(false);
                this.explain(err);
            }
        });
    }
    archive(campus) {
        this.dataSource.archive(campus.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.notifications.success(`${campus.name} ne figure plus dans les listes de choix.`, 'Campus archivé');
                this.afterWrite();
            },
            error: (err) => this.explain(err)
        });
    }
    restore(campus) {
        this.dataSource.restore(campus.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => this.afterWrite(),
            error: (err) => this.explain(err)
        });
    }
    afterWrite() {
        this.saving.set(false);
        this.closePanel();
        this.load();
        this.setupStatus.refresh();
    }
    explain(err) {
        const code = err?.error?.code;
        if (code) {
            this.notifications.error(translateErrorCode(code), 'Action refusée');
        }
    }
    static ɵfac = function CampusComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CampusComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CampusComponent, selectors: [["eduops-campus"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 19, vars: 6, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta", "numeric"], [1, "page__actions"], ["routerLink", "/rooms", 1, "btn", "btn--secondary"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 1, "btn", "btn--primary"], [1, "lead"], ["message", "Chargement des campus..."], [1, "card"], [1, "campuses"], ["type", "button", 1, "btn", "btn--primary", 3, "click"], ["aria-hidden", "true"], [3, "retry"], [1, "card__body"], [1, "empty__title"], [1, "empty__text"], [1, "campus", "card", 3, "campus--archived"], [1, "campus", "card"], [1, "campus__main"], [1, "campus__identity"], [1, "campus__name"], [1, "muted", "numeric"], [1, "campus__sub", "numeric"], [1, "campus__meta"], [1, "badge", "badge--main"], [1, "pill", "pill--archived"], [1, "campus__side"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--secondary", "btn--sm", 3, "click"], ["type", "button", 1, "btn", "btn--ghost", "btn--sm", 3, "click", "disabled"], [1, "drawer-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-label", "Campus", 1, "drawer"], [1, "drawer__head"], [1, "drawer__body", 3, "ngSubmit", "formGroup"], [1, "grid2"], [1, "field"], [1, "field__label"], ["formControlName", "code", "maxlength", "30", "placeholder", "CAMP-US", "autocomplete", "off", 1, "input"], ["formControlName", "name", "maxlength", "120", "placeholder", "Campus Principal", "autocomplete", "off", 1, "input"], ["formControlName", "addressLine1", "placeholder", "Avenue de la R\u00E9publique", "autocomplete", "off", 1, "input"], ["formControlName", "city", "placeholder", "Abidjan", "autocomplete", "off", 1, "input"], ["formControlName", "phone", "placeholder", "+225 0700000000", "autocomplete", "off", 1, "input"], ["formControlName", "email", "placeholder", "contact@ecole.ci", "autocomplete", "off", 1, "input"], [1, "switch"], ["type", "checkbox", "formControlName", "main"], [1, "drawer__foot"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"]], template: function CampusComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Campus et salles");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4);
            i0.ɵɵtemplate(8, CampusComponent_Conditional_8_Template, 2, 0, "a", 5);
            i0.ɵɵelementStart(9, "button", 6);
            i0.ɵɵlistener("click", function CampusComponent_Template_button_click_9_listener() { return ctx.toggleArchived(); });
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(11, CampusComponent_Conditional_11_Template, 4, 0, "button", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "p", 8);
            i0.ɵɵtext(13, " Les campus sont les sites physiques de l'\u00E9tablissement. Chaque salle est rattach\u00E9e \u00E0 un campus. Un campus principal ne peut pas \u00EAtre archiv\u00E9. ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(14, CampusComponent_Conditional_14_Template, 1, 0, "eduops-loading-state", 9)(15, CampusComponent_Conditional_15_Template, 1, 0, "eduops-error-state")(16, CampusComponent_Conditional_16_Template, 6, 0, "div", 10)(17, CampusComponent_Conditional_17_Template, 3, 0, "section", 11)(18, CampusComponent_Conditional_18_Template, 44, 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.activeCount(), " campus(x) actif(s) ");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.canViewRooms() ? 8 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.showArchived() ? "Masquer les archiv\u00E9s" : "Voir les archiv\u00E9s", " ");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.canManage() ? 11 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.loading() ? 14 : ctx.error() ? 15 : ctx.campuses().length === 0 ? 16 : 17);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.editing() || ctx.creating() ? 18 : -1);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName, RouterLink, LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.lead[_ngcontent-%COMP%] {\n  max-width: 720px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n.campuses[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  padding: 0 var(--space-4) var(--space-4);\n}\n\n.campus[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  border-top: 1px solid var(--border);\n\n  &--archived { opacity: 0.62; }\n\n  &__main {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    min-width: 0;\n    flex: 1;\n  }\n\n  &__identity {\n    min-width: 0;\n  }\n\n  &__name {\n    margin: 0;\n    font-size: var(--text-md);\n  }\n\n  &__sub {\n    margin: 2px 0 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n\n  &__meta {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex: none;\n  }\n\n  &__side {\n    display: flex;\n    align-items: center;\n    gap: var(--space-1);\n    flex: none;\n  }\n}\n\n.muted[_ngcontent-%COMP%] {\n  margin-left: var(--space-2);\n  font-size: var(--text-xs);\n  color: var(--text-light);\n}\n\n.empty[_ngcontent-%COMP%] {\n  &__title {\n    margin: 0;\n    font-size: var(--text-md);\n  }\n  &__text {\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n}\n\n.grid2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-pill);\n  background: var(--success-bg);\n  color: var(--success);\n  &--main { }\n}\n\n.pill[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-pill);\n  &--archived {\n    color: var(--text-light);\n    background: var(--surface-sunken);\n  }\n}\n\n.drawer-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgb(15 23 42 / 0.45);\n  z-index: 40;\n}\n\n.drawer[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: min(440px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n\n    h2 { margin: 0; font-size: var(--text-md); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.page[_ngcontent-%COMP%] {\n  &__header {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    margin-bottom: var(--space-4);\n  }\n\n  &__title {\n    margin: 0;\n    font-size: var(--text-lg);\n  }\n\n  &__meta {\n    margin: 4px 0 0;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n\n    &.numeric {\n      font-variant-numeric: tabular-nums;\n    }\n  }\n\n  &__actions {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CampusComponent, [{
        type: Component,
        args: [{ selector: 'eduops-campus', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Campus et salles</h1>\n      <p class=\"page__meta numeric\">\n        {{ activeCount() }} campus(x) actif(s)\n      </p>\n    </div>\n    <div class=\"page__actions\">\n      @if (canViewRooms()) {\n        <a class=\"btn btn--secondary\" routerLink=\"/rooms\">B\u00E2timents et salles</a>\n      }\n      <button type=\"button\" class=\"btn btn--secondary\" (click)=\"toggleArchived()\">\n        {{ showArchived() ? 'Masquer les archiv\u00E9s' : 'Voir les archiv\u00E9s' }}\n      </button>\n      @if (canManage()) {\n        <button type=\"button\" class=\"btn btn--primary\" (click)=\"openCreate()\">\n          <span aria-hidden=\"true\">+</span> Nouveau campus\n        </button>\n      }\n    </div>\n  </header>\n\n  <p class=\"lead\">\n    Les campus sont les sites physiques de l'\u00E9tablissement. Chaque salle est\n    rattach\u00E9e \u00E0 un campus. Un campus principal ne peut pas \u00EAtre archiv\u00E9.\n  </p>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"Chargement des campus...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else if (campuses().length === 0) {\n    <div class=\"card\"><div class=\"card__body\">\n      <h2 class=\"empty__title\">Aucun campus</h2>\n      <p class=\"empty__text\">Cr\u00E9ez le premier campus pour organiser les salles de l'\u00E9tablissement.</p>\n    </div></div>\n  } @else {\n    <section class=\"campuses\">\n      @for (campus of campuses(); track campus.id) {\n        <div class=\"campus card\" [class.campus--archived]=\"campus.status !== 'ACTIVE'\">\n          <div class=\"campus__main\">\n            <div class=\"campus__identity\">\n              <h3 class=\"campus__name\">{{ campus.name }}\n                <span class=\"muted numeric\">{{ campus.code }}</span>\n              </h3>\n              <p class=\"campus__sub numeric\">\n                @if (campus.addressLine1) { {{ campus.addressLine1 }} \u00B7 }\n                @if (campus.city) { {{ campus.city }} }\n                @if (campus.roomCount !== undefined) {\n                  \u00B7 {{ campus.roomCount }} salle(s)\n                }\n              </p>\n            </div>\n            <div class=\"campus__meta\">\n              @if (campus.main) {\n                <span class=\"badge badge--main\">Principal</span>\n              }\n              @if (campus.status !== 'ACTIVE') {\n                <span class=\"pill pill--archived\">Archiv\u00E9</span>\n              }\n            </div>\n          </div>\n\n          <div class=\"campus__side\">\n            @if (campus.status !== 'ACTIVE') {\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                      (click)=\"restore(campus)\">Restaurer</button>\n            } @else if (canManage()) {\n              <button type=\"button\" class=\"btn btn--secondary btn--sm\"\n                      (click)=\"openEdit(campus)\">Modifier</button>\n              <button type=\"button\" class=\"btn btn--ghost btn--sm\"\n                      [disabled]=\"campus.archivable === false\"\n                      (click)=\"archive(campus)\">Archiver</button>\n            }\n          </div>\n        </div>\n      }\n    </section>\n  }\n\n  @if (editing() || creating()) {\n    <div class=\"drawer-backdrop\" (click)=\"closePanel()\"></div>\n    <aside class=\"drawer\" role=\"dialog\" aria-modal=\"true\" aria-label=\"Campus\">\n      <header class=\"drawer__head\">\n        <h2>{{ editing() ? 'Modifier ' + editing()!.name : 'Nouveau campus' }}</h2>\n        <button type=\"button\" class=\"btn btn--ghost btn--sm\" (click)=\"closePanel()\">\u2715</button>\n      </header>\n      <form class=\"drawer__body\" [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n        <div class=\"grid2\">\n          <label class=\"field\">\n            <span class=\"field__label\">Code</span>\n            <input class=\"input\" formControlName=\"code\" maxlength=\"30\"\n                   placeholder=\"CAMP-US\" autocomplete=\"off\" />\n          </label>\n          <label class=\"field\">\n            <span class=\"field__label\">Nom</span>\n            <input class=\"input\" formControlName=\"name\" maxlength=\"120\"\n                   placeholder=\"Campus Principal\" autocomplete=\"off\" />\n          </label>\n        </div>\n        <div class=\"grid2\">\n          <label class=\"field\">\n            <span class=\"field__label\">Adresse</span>\n            <input class=\"input\" formControlName=\"addressLine1\"\n                   placeholder=\"Avenue de la R\u00E9publique\" autocomplete=\"off\" />\n          </label>\n          <label class=\"field\">\n            <span class=\"field__label\">Ville</span>\n            <input class=\"input\" formControlName=\"city\"\n                   placeholder=\"Abidjan\" autocomplete=\"off\" />\n          </label>\n        </div>\n        <div class=\"grid2\">\n          <label class=\"field\">\n            <span class=\"field__label\">T\u00E9l\u00E9phone</span>\n            <input class=\"input\" formControlName=\"phone\"\n                   placeholder=\"+225 0700000000\" autocomplete=\"off\" />\n          </label>\n          <label class=\"field\">\n            <span class=\"field__label\">Email</span>\n            <input class=\"input\" formControlName=\"email\"\n                   placeholder=\"contact@ecole.ci\" autocomplete=\"off\" />\n          </label>\n        </div>\n        <label class=\"switch\">\n          <input type=\"checkbox\" formControlName=\"main\" />\n          <span>Campus principal (un seul par \u00E9tablissement)</span>\n        </label>\n      </form>\n      <footer class=\"drawer__foot\">\n        <button type=\"button\" class=\"btn btn--secondary\" (click)=\"closePanel()\">Annuler</button>\n        <button type=\"button\" class=\"btn btn--primary\"\n                [disabled]=\"form.invalid || saving()\" (click)=\"submit()\">\n          {{ saving() ? 'Enregistrement...' : (editing() ? 'Enregistrer' : 'Cr\u00E9er') }}\n        </button>\n      </footer>\n    </aside>\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n.lead {\n  max-width: 720px;\n  margin: 0 0 var(--space-4);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n}\n\n.campuses {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  padding: 0 var(--space-4) var(--space-4);\n}\n\n.campus {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--space-3);\n  padding: var(--space-3) var(--space-4);\n  border-top: 1px solid var(--border);\n\n  &--archived { opacity: 0.62; }\n\n  &__main {\n    display: flex;\n    align-items: center;\n    gap: var(--space-3);\n    min-width: 0;\n    flex: 1;\n  }\n\n  &__identity {\n    min-width: 0;\n  }\n\n  &__name {\n    margin: 0;\n    font-size: var(--text-md);\n  }\n\n  &__sub {\n    margin: 2px 0 0;\n    font-size: var(--text-xs);\n    color: var(--text-muted);\n  }\n\n  &__meta {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n    flex: none;\n  }\n\n  &__side {\n    display: flex;\n    align-items: center;\n    gap: var(--space-1);\n    flex: none;\n  }\n}\n\n.muted {\n  margin-left: var(--space-2);\n  font-size: var(--text-xs);\n  color: var(--text-light);\n}\n\n.empty {\n  &__title {\n    margin: 0;\n    font-size: var(--text-md);\n  }\n  &__text {\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n  }\n}\n\n.grid2 {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: var(--space-3);\n}\n\n.hint-block {\n  margin: 0;\n  padding: var(--space-3);\n  font-size: var(--text-sm);\n  line-height: var(--leading-relaxed);\n  color: var(--text-muted);\n  background: var(--info-bg);\n  border-left: 3px solid var(--info);\n  border-radius: var(--radius-input);\n}\n\n.badge {\n  display: inline-block;\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-pill);\n  background: var(--success-bg);\n  color: var(--success);\n  &--main { }\n}\n\n.pill {\n  display: inline-block;\n  padding: 1px var(--space-2);\n  font-size: var(--text-xs);\n  font-weight: 600;\n  border-radius: var(--radius-pill);\n  &--archived {\n    color: var(--text-light);\n    background: var(--surface-sunken);\n  }\n}\n\n.drawer-backdrop {\n  position: fixed;\n  inset: 0;\n  background: rgb(15 23 42 / 0.45);\n  z-index: 40;\n}\n\n.drawer {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: min(440px, 100vw);\n  background: var(--surface-card);\n  box-shadow: var(--shadow-lg);\n  z-index: 41;\n  display: flex;\n  flex-direction: column;\n\n  &__head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: var(--space-3);\n    padding: var(--space-4) var(--space-5);\n    border-bottom: 1px solid var(--border);\n\n    h2 { margin: 0; font-size: var(--text-md); }\n  }\n\n  &__body {\n    flex: 1;\n    overflow-y: auto;\n    display: flex;\n    flex-direction: column;\n    gap: var(--space-4);\n    padding: var(--space-5);\n  }\n\n  &__foot {\n    display: flex;\n    justify-content: flex-end;\n    gap: var(--space-2);\n    padding: var(--space-4) var(--space-5);\n    border-top: 1px solid var(--border);\n  }\n}\n\n.page {\n  &__header {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--space-3);\n    margin-bottom: var(--space-4);\n  }\n\n  &__title {\n    margin: 0;\n    font-size: var(--text-lg);\n  }\n\n  &__meta {\n    margin: 4px 0 0;\n    font-size: var(--text-sm);\n    color: var(--text-muted);\n\n    &.numeric {\n      font-variant-numeric: tabular-nums;\n    }\n  }\n\n  &__actions {\n    display: flex;\n    align-items: center;\n    gap: var(--space-2);\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CampusComponent, { className: "CampusComponent", filePath: "frontend/src/app/features/campus/campus.component.ts", lineNumber: 31 }); })();
//# sourceMappingURL=campus.component.js.map