import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { COMMON_LOCALES, COMMON_TIMEZONES } from '@core/models/school-settings.models';
import { NotificationService } from '@core/services/notification.service';
import { AppearancePreferencesService } from './appearance-preferences.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.key;
function SystemConfigAppearanceComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 12);
    i0.ɵɵtext(1, "Hexad\u00E9cimal, ex. #1f5fd6.");
    i0.ɵɵelementEnd();
} }
function SystemConfigAppearanceComponent_For_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", c_r1.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(c_r1.label);
} }
function SystemConfigAppearanceComponent_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 12);
    i0.ɵɵtext(1, "Trois majuscules, ex. XOF.");
    i0.ɵɵelementEnd();
} }
function SystemConfigAppearanceComponent_For_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const locale_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", locale_r2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(locale_r2);
} }
function SystemConfigAppearanceComponent_For_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "option", 14);
} if (rf & 2) {
    const zone_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", zone_r3);
} }
function SystemConfigAppearanceComponent_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 19)(1, "button", 21);
    i0.ɵɵlistener("click", function SystemConfigAppearanceComponent_Conditional_42_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.reset()); });
    i0.ɵɵtext(2, "R\u00E9initialiser");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 22);
    i0.ɵɵlistener("click", function SystemConfigAppearanceComponent_Conditional_42_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r4); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.save()); });
    i0.ɵɵtext(4, " Enregistrer l\u2019apparence ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r4.form.invalid);
} }
function SystemConfigAppearanceComponent_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1, "La modification demande le droit de gestion de l\u2019\u00E9tablissement.");
    i0.ɵɵelementEnd();
} }
/** Onglet Apparence et region : couleur, taille de police, devise, langue, fuseau. */
export class SystemConfigAppearanceComponent {
    appearanceService = inject(AppearancePreferencesService);
    auth = inject(AuthService);
    notifications = inject(NotificationService);
    fb = inject(FormBuilder);
    timezones = COMMON_TIMEZONES;
    locales = COMMON_LOCALES;
    fontChoices = [
        { key: 'small', label: 'Compacte' },
        { key: 'normal', label: 'Normale' },
        { key: 'large', label: 'Large' }
    ];
    canEdit = computed(() => this.auth.has(PERMISSIONS.SCHOOL_MANAGE));
    saved = signal(this.appearanceService.load());
    form = this.fb.nonNullable.group({
        brand: [this.saved().brand, [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]],
        fontSize: [this.saved().fontSize, Validators.required],
        currency: [this.saved().currency, [Validators.required, Validators.pattern(/^[A-Z]{3}$/)]],
        locale: [this.saved().locale, Validators.required],
        timezone: [this.saved().timezone, Validators.required]
    });
    constructor() {
        this.form.valueChanges.subscribe(() => this.preview());
    }
    current() {
        const v = this.form.getRawValue();
        return {
            brand: v.brand.trim(), fontSize: v.fontSize,
            currency: v.currency.trim().toUpperCase(),
            locale: v.locale.trim(), timezone: v.timezone.trim()
        };
    }
    preview() {
        if (this.form.invalid) {
            return;
        }
        this.appearanceService.apply(this.current());
    }
    save() {
        if (!this.canEdit() || this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const prefs = this.current();
        this.appearanceService.save(prefs);
        this.saved.set(prefs);
        this.notifications.success('Couleur, taille de police, devise, langue et fuseau appliqués sur ce navigateur.', 'Apparence enregistrée');
    }
    reset() {
        const defaults = this.appearanceService.reset();
        this.saved.set(defaults);
        this.form.patchValue(defaults);
    }
    invalid(name) {
        const c = this.form.get(name);
        return !!c && c.invalid && (c.touched || c.dirty);
    }
    static ɵfac = function SystemConfigAppearanceComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SystemConfigAppearanceComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SystemConfigAppearanceComponent, selectors: [["eduops-system-config-appearance"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 44, vars: 4, consts: [[3, "formGroup"], [1, "section-note"], [1, "card"], [1, "card__body"], ["aria-hidden", "true", 1, "preview"], [1, "preview__chip"], [1, "preview__title"], [1, "grid"], [1, "field"], [1, "color-row"], ["type", "color", "formControlName", "brand"], ["formControlName", "brand", "maxlength", "7", 1, "input", "mono"], [1, "field__error"], ["formControlName", "fontSize", 1, "input"], [3, "value"], ["formControlName", "currency", "maxlength", "3", 1, "input", "mono"], ["formControlName", "locale", 1, "input"], ["list", "sysconfig-tz", "formControlName", "timezone", "maxlength", "60", 1, "input"], ["id", "sysconfig-tz"], [1, "foot-actions"], [1, "restricted"], ["type", "button", 1, "btn", "btn--ghost", 3, "click"], ["type", "button", 1, "btn", "btn--primary", 3, "click", "disabled"]], template: function SystemConfigAppearanceComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "p", 1);
            i0.ɵɵtext(2, "Couleur du portail, taille de police, devise, langue et fuseau horaire :\nappliqu\u00E9s imm\u00E9diatement sur ce navigateur, r\u00E9versibles \u00E0 tout moment.\nLes param\u00E8tres officiels de l\u2019\u00E9tablissement restent dans \u00AB Param\u00E8tres \u00BB.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "span", 5);
            i0.ɵɵtext(7, "Aper\u00E7u couleur");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span", 6);
            i0.ɵɵtext(9, "Portail de l\u2019\u00E9tablissement");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "div", 7)(11, "label", 8)(12, "span");
            i0.ɵɵtext(13, "Couleur principale");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "span", 9);
            i0.ɵɵelement(15, "input", 10)(16, "input", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(17, SystemConfigAppearanceComponent_Conditional_17_Template, 2, 0, "span", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "label", 8)(19, "span");
            i0.ɵɵtext(20, "Taille de police");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "select", 13);
            i0.ɵɵrepeaterCreate(22, SystemConfigAppearanceComponent_For_23_Template, 2, 2, "option", 14, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "label", 8)(25, "span");
            i0.ɵɵtext(26, "Devise (3 lettres)");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(27, "input", 15);
            i0.ɵɵtemplate(28, SystemConfigAppearanceComponent_Conditional_28_Template, 2, 0, "span", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "label", 8)(30, "span");
            i0.ɵɵtext(31, "Langue");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "select", 16);
            i0.ɵɵrepeaterCreate(33, SystemConfigAppearanceComponent_For_34_Template, 2, 2, "option", 14, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "label", 8)(36, "span");
            i0.ɵɵtext(37, "Fuseau horaire");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(38, "input", 17);
            i0.ɵɵelementStart(39, "datalist", 18);
            i0.ɵɵrepeaterCreate(40, SystemConfigAppearanceComponent_For_41_Template, 1, 1, "option", 14, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵtemplate(42, SystemConfigAppearanceComponent_Conditional_42_Template, 5, 1, "div", 19)(43, SystemConfigAppearanceComponent_Conditional_43_Template, 2, 0, "p", 20);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(17);
            i0.ɵɵconditional(ctx.invalid("brand") ? 17 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵrepeater(ctx.fontChoices);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.invalid("currency") ? 28 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵrepeater(ctx.locales);
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.timezones);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.canEdit() ? 42 : 43);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.FormGroupDirective, i1.FormControlName], styles: [".guide-note[_ngcontent-%COMP%] { color: var(--text-muted); line-height: 1.6; }\n.tabs[_ngcontent-%COMP%] {\n  display: flex; gap: var(--space-2); flex-wrap: wrap; margin: var(--space-4) 0;\n  .tab {\n    display: flex; flex-direction: column; align-items: flex-start; gap: 2px;\n    padding: var(--space-3) var(--space-4); border: 1px solid var(--border);\n    border-radius: var(--radius-button); background: var(--surface-card);\n    color: var(--text-strong); font: inherit; font-weight: 600; cursor: pointer;\n    small { font-weight: 400; color: var(--text-muted); font-size: var(--text-xs); }\n    &-active { border-color: var(--brand); box-shadow: var(--shadow-sm); }\n  }\n}\n.card[_ngcontent-%COMP%] {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); margin-bottom: var(--space-4);\n  &__body { padding: var(--space-5); }\n}\n.identity-card[_ngcontent-%COMP%]   .pinned[_ngcontent-%COMP%] {\n  display: flex; gap: var(--space-6); flex-wrap: wrap;\n  & > div { display: flex; flex-direction: column; gap: 2px; }\n  &__label { font-size: var(--text-xs); text-transform: uppercase; letter-spacing: .04em; color: var(--text-light); }\n  &__value { font-size: var(--text-md); font-weight: 600; }\n  &__note { margin: var(--space-3) 0 0; font-size: var(--text-sm); color: var(--text-light); }\n}\n.section-title[_ngcontent-%COMP%] { margin: 0 0 var(--space-3); font-size: var(--text-md); }\n.section-note[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-4); font-size: var(--text-sm);\n  color: var(--text-light); max-width: 78ch; line-height: 1.6;\n  code { background: var(--surface-muted, rgba(0,0,0,.04)); padding: 0 4px; border-radius: 4px; }\n}\n.grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-3) var(--space-4); }\n.field[_ngcontent-%COMP%] {\n  display: flex; flex-direction: column; gap: var(--space-1);\n  & > span { font-size: var(--text-sm); color: var(--text-light); }\n  &__error { font-size: var(--text-xs); color: var(--danger, #b3261e); }\n}\n.foot-actions[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); align-items: center; justify-content: flex-end; margin-bottom: var(--space-4); }\n.color-row[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); align-items: center;\n  input[type=\"color\"] { width: 44px; height: 36px; padding: 2px; border: 1px solid var(--border); border-radius: 8px; background: #fff; }\n  .input { flex: 1; }\n}\n.preview[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4);\n  padding: var(--space-3); border-radius: var(--radius-card);\n  background: var(--brand); color: var(--text-on-brand, #fff);\n  &__chip { font-size: var(--text-xs); text-transform: uppercase; letter-spacing: .04em; opacity: .85; }\n  &__title { font-weight: 700; }\n}\n.circuit[_ngcontent-%COMP%] { list-style: none; padding: 0; margin: 0 0 var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }\n.circuit__level[_ngcontent-%COMP%] {\n  display: flex; gap: var(--space-3); align-items: flex-start;\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); padding: var(--space-4);\n}\n.circuit__rank[_ngcontent-%COMP%] {\n  display: grid; place-items: center; flex-shrink: 0;\n  width: 34px; height: 34px; border-radius: 50%;\n  background: var(--brand); color: #fff; font-weight: 700;\n}\n.circuit__fields[_ngcontent-%COMP%] { flex: 1; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-3); }\n.circuit__reader[_ngcontent-%COMP%] { grid-column: 1 / -1; margin: 0; font-size: var(--text-sm); color: var(--text-muted); }\n.circuit__ops[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: var(--space-1); }\n.circuit-head[_ngcontent-%COMP%] {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-3); margin-bottom: var(--space-3);\n  &__count { font-size: var(--text-sm); color: var(--text-muted); }\n}\n.card__body--flush[_ngcontent-%COMP%] { padding: 0; overflow: hidden;\n  .circuit-head { padding: var(--space-4) var(--space-4) 0; }\n}\n.table-wrap[_ngcontent-%COMP%] { overflow-x: auto; }\n.circuit-table[_ngcontent-%COMP%] {\n  width: 100%; border-collapse: collapse; font-size: var(--text-sm);\n  th, td { text-align: left; padding: var(--space-3) var(--space-4); border-top: 1px solid var(--border-light); }\n  thead th { border-top: 0; font-size: var(--text-xs); text-transform: uppercase; letter-spacing: .04em; color: var(--text-light); }\n  .row-ops { white-space: nowrap; text-align: right; }\n}\n.chip[_ngcontent-%COMP%] {\n  display: inline-flex; align-items: center; gap: var(--space-1);\n  padding: 2px var(--space-2); border-radius: var(--radius-pill);\n  background: var(--surface-sunken); border: 1px solid var(--border);\n  font-size: var(--text-xs); font-weight: 600; color: var(--text-strong);\n  &__x { border: 0; background: none; cursor: pointer; color: var(--text-muted); font: inherit; padding: 0 2px; }\n}\n.chips[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: var(--space-1); margin-top: var(--space-2); }\n.members-none[_ngcontent-%COMP%] { margin: var(--space-1) 0 0; font-size: var(--text-xs); color: var(--text-light); }\n.member-add[_ngcontent-%COMP%] { display: flex; gap: var(--space-2); margin-top: var(--space-2);\n  .input { flex: 1; }\n}\n.check[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); }\n.draft-level[_ngcontent-%COMP%] {\n  border: 1px solid var(--border); border-radius: var(--radius-card);\n  padding: var(--space-3); margin: var(--space-3) 0; background: var(--surface-card);\n  .circuit__rank { width: auto; height: auto; border-radius: var(--radius-pill); padding: 2px var(--space-2); font-size: var(--text-xs); margin-bottom: var(--space-2); }\n  &__row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-2); align-items: end; }\n}\n.modal-backdrop[_ngcontent-%COMP%] {\n  position: fixed; inset: 0; z-index: var(--z-modal-backdrop, 1040);\n  background: rgba(27, 36, 53, .45); display: grid; place-items: center; padding: var(--space-4);\n}\n.modal[_ngcontent-%COMP%] {\n  width: min(640px, 100%); max-height: 90vh; overflow: auto;\n  background: var(--surface-card); border-radius: var(--radius-card);\n  padding: var(--space-5); box-shadow: var(--shadow-lg);\n  h2 { margin: 0 0 var(--space-4); font-size: var(--text-lg); }\n  .foot-actions { margin: var(--space-4) 0 0; }\n}\n.restricted[_ngcontent-%COMP%] { color: var(--text-muted); font-size: var(--text-sm); }\n.mono[_ngcontent-%COMP%] { font-family: var(--font-mono, ui-monospace, monospace); }\na[_ngcontent-%COMP%]:focus-visible, button[_ngcontent-%COMP%]:focus-visible { outline: 2px solid var(--brand); outline-offset: 3px; }\n@media (max-width: 600px) {\n  .card__body[_ngcontent-%COMP%] { padding: var(--space-3); }\n  .circuit__level[_ngcontent-%COMP%] { flex-direction: column; }\n  .circuit__ops[_ngcontent-%COMP%] { flex-direction: row; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SystemConfigAppearanceComponent, [{
        type: Component,
        args: [{ selector: 'eduops-system-config-appearance', standalone: true, imports: [CommonModule, ReactiveFormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [formGroup]=\"form\">\n<p class=\"section-note\">Couleur du portail, taille de police, devise, langue et fuseau horaire :\nappliqu\u00E9s imm\u00E9diatement sur ce navigateur, r\u00E9versibles \u00E0 tout moment.\nLes param\u00E8tres officiels de l\u2019\u00E9tablissement restent dans \u00AB Param\u00E8tres \u00BB.</p>\n\n<div class=\"card\"><div class=\"card__body\">\n  <div class=\"preview\" aria-hidden=\"true\">\n    <span class=\"preview__chip\">Aper\u00E7u couleur</span>\n    <span class=\"preview__title\">Portail de l\u2019\u00E9tablissement</span>\n  </div>\n  <div class=\"grid\">\n    <label class=\"field\"><span>Couleur principale</span>\n      <span class=\"color-row\">\n        <input type=\"color\" formControlName=\"brand\" />\n        <input class=\"input mono\" formControlName=\"brand\" maxlength=\"7\" />\n      </span>\n      @if (invalid('brand')) { <span class=\"field__error\">Hexad\u00E9cimal, ex. #1f5fd6.</span> }\n    </label>\n    <label class=\"field\"><span>Taille de police</span>\n      <select class=\"input\" formControlName=\"fontSize\">\n        @for (c of fontChoices; track c.key) {\n          <option [value]=\"c.key\">{{ c.label }}</option>\n        }\n      </select>\n    </label>\n    <label class=\"field\"><span>Devise (3 lettres)</span>\n      <input class=\"input mono\" formControlName=\"currency\" maxlength=\"3\" />\n      @if (invalid('currency')) { <span class=\"field__error\">Trois majuscules, ex. XOF.</span> }\n    </label>\n    <label class=\"field\"><span>Langue</span>\n      <select class=\"input\" formControlName=\"locale\">\n        @for (locale of locales; track locale) {\n          <option [value]=\"locale\">{{ locale }}</option>\n        }\n      </select>\n    </label>\n    <label class=\"field\"><span>Fuseau horaire</span>\n      <input class=\"input\" list=\"sysconfig-tz\" formControlName=\"timezone\" maxlength=\"60\" />\n      <datalist id=\"sysconfig-tz\">\n        @for (zone of timezones; track zone) {\n          <option [value]=\"zone\"></option>\n        }\n      </datalist>\n    </label>\n  </div>\n</div></div>\n\n@if (canEdit()) {\n  <div class=\"foot-actions\">\n    <button type=\"button\" class=\"btn btn--ghost\" (click)=\"reset()\">R\u00E9initialiser</button>\n    <button type=\"button\" class=\"btn btn--primary\" (click)=\"save()\" [disabled]=\"form.invalid\">\n      Enregistrer l\u2019apparence\n    </button>\n  </div>\n} @else {\n  <p class=\"restricted\">La modification demande le droit de gestion de l\u2019\u00E9tablissement.</p>\n}\n</div>\n", styles: [".guide-note { color: var(--text-muted); line-height: 1.6; }\n.tabs {\n  display: flex; gap: var(--space-2); flex-wrap: wrap; margin: var(--space-4) 0;\n  .tab {\n    display: flex; flex-direction: column; align-items: flex-start; gap: 2px;\n    padding: var(--space-3) var(--space-4); border: 1px solid var(--border);\n    border-radius: var(--radius-button); background: var(--surface-card);\n    color: var(--text-strong); font: inherit; font-weight: 600; cursor: pointer;\n    small { font-weight: 400; color: var(--text-muted); font-size: var(--text-xs); }\n    &-active { border-color: var(--brand); box-shadow: var(--shadow-sm); }\n  }\n}\n.card {\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); margin-bottom: var(--space-4);\n  &__body { padding: var(--space-5); }\n}\n.identity-card .pinned {\n  display: flex; gap: var(--space-6); flex-wrap: wrap;\n  & > div { display: flex; flex-direction: column; gap: 2px; }\n  &__label { font-size: var(--text-xs); text-transform: uppercase; letter-spacing: .04em; color: var(--text-light); }\n  &__value { font-size: var(--text-md); font-weight: 600; }\n  &__note { margin: var(--space-3) 0 0; font-size: var(--text-sm); color: var(--text-light); }\n}\n.section-title { margin: 0 0 var(--space-3); font-size: var(--text-md); }\n.section-note {\n  margin: 0 0 var(--space-4); font-size: var(--text-sm);\n  color: var(--text-light); max-width: 78ch; line-height: 1.6;\n  code { background: var(--surface-muted, rgba(0,0,0,.04)); padding: 0 4px; border-radius: 4px; }\n}\n.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-3) var(--space-4); }\n.field {\n  display: flex; flex-direction: column; gap: var(--space-1);\n  & > span { font-size: var(--text-sm); color: var(--text-light); }\n  &__error { font-size: var(--text-xs); color: var(--danger, #b3261e); }\n}\n.foot-actions { display: flex; gap: var(--space-2); align-items: center; justify-content: flex-end; margin-bottom: var(--space-4); }\n.color-row { display: flex; gap: var(--space-2); align-items: center;\n  input[type=\"color\"] { width: 44px; height: 36px; padding: 2px; border: 1px solid var(--border); border-radius: 8px; background: #fff; }\n  .input { flex: 1; }\n}\n.preview {\n  display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4);\n  padding: var(--space-3); border-radius: var(--radius-card);\n  background: var(--brand); color: var(--text-on-brand, #fff);\n  &__chip { font-size: var(--text-xs); text-transform: uppercase; letter-spacing: .04em; opacity: .85; }\n  &__title { font-weight: 700; }\n}\n.circuit { list-style: none; padding: 0; margin: 0 0 var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }\n.circuit__level {\n  display: flex; gap: var(--space-3); align-items: flex-start;\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card); padding: var(--space-4);\n}\n.circuit__rank {\n  display: grid; place-items: center; flex-shrink: 0;\n  width: 34px; height: 34px; border-radius: 50%;\n  background: var(--brand); color: #fff; font-weight: 700;\n}\n.circuit__fields { flex: 1; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-3); }\n.circuit__reader { grid-column: 1 / -1; margin: 0; font-size: var(--text-sm); color: var(--text-muted); }\n.circuit__ops { display: flex; flex-direction: column; gap: var(--space-1); }\n.circuit-head {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-3); margin-bottom: var(--space-3);\n  &__count { font-size: var(--text-sm); color: var(--text-muted); }\n}\n.card__body--flush { padding: 0; overflow: hidden;\n  .circuit-head { padding: var(--space-4) var(--space-4) 0; }\n}\n.table-wrap { overflow-x: auto; }\n.circuit-table {\n  width: 100%; border-collapse: collapse; font-size: var(--text-sm);\n  th, td { text-align: left; padding: var(--space-3) var(--space-4); border-top: 1px solid var(--border-light); }\n  thead th { border-top: 0; font-size: var(--text-xs); text-transform: uppercase; letter-spacing: .04em; color: var(--text-light); }\n  .row-ops { white-space: nowrap; text-align: right; }\n}\n.chip {\n  display: inline-flex; align-items: center; gap: var(--space-1);\n  padding: 2px var(--space-2); border-radius: var(--radius-pill);\n  background: var(--surface-sunken); border: 1px solid var(--border);\n  font-size: var(--text-xs); font-weight: 600; color: var(--text-strong);\n  &__x { border: 0; background: none; cursor: pointer; color: var(--text-muted); font: inherit; padding: 0 2px; }\n}\n.chips { display: flex; flex-wrap: wrap; gap: var(--space-1); margin-top: var(--space-2); }\n.members-none { margin: var(--space-1) 0 0; font-size: var(--text-xs); color: var(--text-light); }\n.member-add { display: flex; gap: var(--space-2); margin-top: var(--space-2);\n  .input { flex: 1; }\n}\n.check { display: inline-flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); }\n.draft-level {\n  border: 1px solid var(--border); border-radius: var(--radius-card);\n  padding: var(--space-3); margin: var(--space-3) 0; background: var(--surface-card);\n  .circuit__rank { width: auto; height: auto; border-radius: var(--radius-pill); padding: 2px var(--space-2); font-size: var(--text-xs); margin-bottom: var(--space-2); }\n  &__row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-2); align-items: end; }\n}\n.modal-backdrop {\n  position: fixed; inset: 0; z-index: var(--z-modal-backdrop, 1040);\n  background: rgba(27, 36, 53, .45); display: grid; place-items: center; padding: var(--space-4);\n}\n.modal {\n  width: min(640px, 100%); max-height: 90vh; overflow: auto;\n  background: var(--surface-card); border-radius: var(--radius-card);\n  padding: var(--space-5); box-shadow: var(--shadow-lg);\n  h2 { margin: 0 0 var(--space-4); font-size: var(--text-lg); }\n  .foot-actions { margin: var(--space-4) 0 0; }\n}\n.restricted { color: var(--text-muted); font-size: var(--text-sm); }\n.mono { font-family: var(--font-mono, ui-monospace, monospace); }\na:focus-visible, button:focus-visible { outline: 2px solid var(--brand); outline-offset: 3px; }\n@media (max-width: 600px) {\n  .card__body { padding: var(--space-3); }\n  .circuit__level { flex-direction: column; }\n  .circuit__ops { flex-direction: row; }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SystemConfigAppearanceComponent, { className: "SystemConfigAppearanceComponent", filePath: "frontend/src/app/features/system-config/system-config-appearance.component.ts", lineNumber: 21 }); })();
//# sourceMappingURL=system-config-appearance.component.js.map