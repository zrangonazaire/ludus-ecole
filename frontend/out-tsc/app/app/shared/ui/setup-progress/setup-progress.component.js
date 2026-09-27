import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SetupStatusService } from '@core/services/setup-status.service';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.key;
function SetupProgressComponent_Conditional_0_Conditional_0_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 13);
    i0.ɵɵtext(1, " Continuer ");
    i0.ɵɵelementStart(2, "span", 17);
    i0.ɵɵtext(3, "\u2192");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵproperty("routerLink", ctx.actionRoute);
} }
function SetupProgressComponent_Conditional_0_Conditional_0_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15)(1, "strong");
    i0.ɵɵtext(2, "Prochaine \u00E9tape :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r2 = ctx;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", step_r2.label, " \u2014 ", step_r2.description, " ");
} }
function SetupProgressComponent_Conditional_0_Conditional_0_Conditional_22_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 20)(1, "span", 21);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 22)(4, "p", 23);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 24);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "a", 25);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const step_r4 = ctx.$implicit;
    const ɵ$index_55_r5 = ctx.$index;
    const setup_r6 = i0.ɵɵnextContext(2);
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("mini--done", step_r4.done)("mini--next", !step_r4.done && setup_r6.nextStepKey === step_r4.key);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r4.done ? "\u2713" : ɵ$index_55_r5 + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(step_r4.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.countLabel(step_r4));
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", step_r4.actionRoute);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", step_r4.done ? "Modifier" : step_r4.actionLabel, " ");
} }
function SetupProgressComponent_Conditional_0_Conditional_0_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ol", 18);
    i0.ɵɵrepeaterCreate(1, SetupProgressComponent_Conditional_0_Conditional_0_Conditional_22_For_2_Template, 10, 9, "li", 19, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const setup_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(setup_r6.steps);
} }
function SetupProgressComponent_Conditional_0_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 1)(1, "div", 2)(2, "span", 3);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 4);
    i0.ɵɵelement(4, "circle", 5)(5, "path", 6);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "div", 7)(7, "h2", 8);
    i0.ɵɵtext(8, "Bien d\u00E9marrer avec Soocloo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 9);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 10);
    i0.ɵɵelement(12, "span", 11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "span", 12);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, SetupProgressComponent_Conditional_0_Conditional_0_Conditional_15_Template, 4, 1, "a", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 14);
    i0.ɵɵtemplate(17, SetupProgressComponent_Conditional_0_Conditional_0_Conditional_17_Template, 4, 2, "p", 15);
    i0.ɵɵelementStart(18, "button", 16);
    i0.ɵɵlistener("click", function SetupProgressComponent_Conditional_0_Conditional_0_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggle()); });
    i0.ɵɵtext(19);
    i0.ɵɵelementStart(20, "span", 17);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(22, SetupProgressComponent_Conditional_0_Conditional_0_Conditional_22_Template, 3, 0, "ol", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_8_0;
    let tmp_9_0;
    const setup_r6 = ctx;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("setup--compact", ctx_r2.compact);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate4(" ", setup_r6.completedSteps, " \u00E9tape", setup_r6.completedSteps > 1 ? "s" : "", " sur ", setup_r6.totalSteps, " termin\u00E9e", setup_r6.completedSteps > 1 ? "s" : "", " ");
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-valuenow", setup_r6.percentComplete);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("width", setup_r6.percentComplete, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", setup_r6.percentComplete, "%");
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_8_0 = ctx_r2.nextStep()) ? 15 : -1, tmp_8_0);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_9_0 = ctx_r2.nextStep()) ? 17 : -1, tmp_9_0);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-expanded", ctx_r2.expanded());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Voir les ", setup_r6.totalSteps, " \u00E9tapes ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.expanded() ? "\u2303" : "\u2304");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.expanded() ? 22 : -1);
} }
function SetupProgressComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, SetupProgressComponent_Conditional_0_Conditional_0_Template, 23, 16, "section", 0);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r2.status()) ? 0 : -1, tmp_1_0);
} }
/**
 * Persistent "getting started" card.
 *
 * <p>Sits at the top of the dashboard until the school is fully configured. It
 * answers three questions at a glance: how far am I, what is the very next
 * thing to do, and what is the full list — without leaving the page.</p>
 *
 * <p>Renders nothing once the configuration is complete: a checklist that stays
 * around after it is done becomes noise.</p>
 */
export class SetupProgressComponent {
    /** Compact form for pages other than the dashboard. */
    compact = false;
    setupStatus = inject(SetupStatusService);
    status = this.setupStatus.status;
    expanded = signal(false);
    /** The step the "Continuer" button jumps to. */
    nextStep = computed(() => {
        const status = this.status();
        if (!status || status.complete) {
            return null;
        }
        return status.steps.find((s) => s.key === status.nextStepKey)
            ?? status.steps.find((s) => !s.done)
            ?? null;
    });
    visible = computed(() => {
        const status = this.status();
        return status !== null && !status.complete;
    });
    toggle() {
        this.expanded.update((open) => !open);
    }
    /** Short count shown against each step in the expanded list. */
    countLabel(step) {
        if (step.count === 0) {
            return 'a faire';
        }
        switch (step.key) {
            case 'ACADEMIC_YEAR': return 'année ouverte';
            case 'CYCLES': return `${step.count} cycle(s)`;
            case 'LEVELS': return `${step.count} niveau(x)`;
            case 'CLASSES': return `${step.count} classe(s)`;
            case 'SUBJECTS': return `${step.count} matiere(s)`;
            case 'CURRICULUM': return `${step.count} programme(s)`;
            case 'FEES': return `${step.count} grille(s)`;
            case 'TEACHERS': return `${step.count} enseignant(s)`;
            case 'ASSIGNMENTS': return `${step.count} affectation(s)`;
            case 'STUDENTS': return `${step.count} eleve(s)`;
            default: return `${step.count}`;
        }
    }
    static ɵfac = function SetupProgressComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SetupProgressComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SetupProgressComponent, selectors: [["eduops-setup-progress"]], inputs: { compact: "compact" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 1, vars: 1, consts: [["aria-labelledby", "setup-heading", 1, "setup", 3, "setup--compact"], ["aria-labelledby", "setup-heading", 1, "setup"], [1, "setup__main"], ["aria-hidden", "true", 1, "setup__icon"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.7", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.5.55.87 1.06.99H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"], [1, "setup__text"], ["id", "setup-heading", 1, "setup__title"], [1, "setup__count", "numeric"], ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "setup__bar"], [1, "setup__fill"], [1, "setup__percent", "numeric"], [1, "btn", "btn--primary", "setup__cta", 3, "routerLink"], [1, "setup__footer"], [1, "setup__next"], ["type", "button", 1, "setup__toggle", 3, "click"], ["aria-hidden", "true"], [1, "setup__steps"], [1, "mini", 3, "mini--done", "mini--next"], [1, "mini"], ["aria-hidden", "true", 1, "mini__marker"], [1, "mini__body"], [1, "mini__label"], [1, "mini__count", "numeric"], [1, "mini__link", 3, "routerLink"]], template: function SetupProgressComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, SetupProgressComponent_Conditional_0_Template, 1, 1);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.visible() ? 0 : -1);
        } }, dependencies: [CommonModule, RouterLink], styles: ["@import 'styles/tokens';\n\n.setup[_ngcontent-%COMP%] {\n  background: var(--surface-card);\n  border: 1px solid var(--brand-tint-border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n  margin-bottom: var(--space-6);\n  overflow: hidden;\n}\n\n\n\n.setup__main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-5) var(--space-6);\n}\n\n.setup__icon[_ngcontent-%COMP%] {\n  width: 42px; height: 42px; flex-shrink: 0;\n  display: grid; place-items: center;\n  border-radius: 12px;\n  background: var(--brand-tint);\n  color: var(--brand);\n}\n.setup__icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] { width: 21px; height: 21px; }\n\n.setup__text[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n\n.setup__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: var(--text-md);\n  font-weight: 700;\n  color: var(--text-strong);\n}\n\n.setup__count[_ngcontent-%COMP%] {\n  margin: 2px 0 var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n}\n\n.setup__bar[_ngcontent-%COMP%] {\n  height: 5px;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-pill);\n  overflow: hidden;\n}\n.setup__fill[_ngcontent-%COMP%] {\n  display: block; height: 100%;\n  background: linear-gradient(90deg, var(--brand), var(--chart-2));\n  border-radius: var(--radius-pill);\n  transition: width 600ms cubic-bezier(.2,.7,.3,1);\n}\n\n.setup__percent[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: var(--text-lg);\n  font-weight: 700;\n  color: var(--brand);\n  flex-shrink: 0;\n}\n\n.setup__cta[_ngcontent-%COMP%] { flex-shrink: 0; }\n\n\n\n.setup__footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-6);\n  background: var(--surface-page);\n  border-top: 1px solid var(--border-light);\n  flex-wrap: wrap;\n}\n\n.setup__next[_ngcontent-%COMP%] {\n  flex: 1; min-width: 240px; margin: 0;\n  font-size: var(--text-sm);\n  color: var(--text-normal);\n}\n.setup__next[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--text-strong); }\n\n.setup__toggle[_ngcontent-%COMP%] {\n  background: none; border: 0; cursor: pointer;\n  font: inherit; font-size: var(--text-sm); font-weight: 600;\n  color: var(--brand);\n  display: inline-flex; align-items: center; gap: var(--space-1);\n  white-space: nowrap;\n}\n.setup__toggle[_ngcontent-%COMP%]:hover { text-decoration: underline; }\n\n\n\n.setup__steps[_ngcontent-%COMP%] {\n  list-style: none; margin: 0; padding: 0;\n  border-top: 1px solid var(--border-light);\n}\n\n.mini[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: var(--space-3);\n  padding: var(--space-3) var(--space-6);\n  border-bottom: 1px solid var(--border-light);\n}\n.mini[_ngcontent-%COMP%]:last-child { border-bottom: none; }\n.mini--done[_ngcontent-%COMP%] { background: var(--surface-page); }\n.mini--next[_ngcontent-%COMP%] { background: var(--brand-tint); }\n\n.mini__marker[_ngcontent-%COMP%] {\n  width: 26px; height: 26px; flex-shrink: 0;\n  display: grid; place-items: center; border-radius: 50%;\n  background: var(--surface-sunken); color: var(--text-muted);\n  font-size: var(--text-xs); font-weight: 700;\n}\n.mini--done[_ngcontent-%COMP%]   .mini__marker[_ngcontent-%COMP%] { background: var(--success-bg); color: var(--success); }\n.mini--next[_ngcontent-%COMP%]   .mini__marker[_ngcontent-%COMP%] { background: var(--brand); color: #fff; }\n\n.mini__body[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n.mini__label[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-base); font-weight: 600; color: var(--text-strong); }\n.mini__count[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n.mini--done[_ngcontent-%COMP%]   .mini__count[_ngcontent-%COMP%] { color: var(--success); }\n\n.mini__link[_ngcontent-%COMP%] {\n  font-size: var(--text-sm); font-weight: 600;\n  color: var(--brand); white-space: nowrap;\n}\n\n\n\n.setup--compact[_ngcontent-%COMP%]   .setup__main[_ngcontent-%COMP%] { padding: var(--space-4); }\n.setup--compact[_ngcontent-%COMP%]   .setup__icon[_ngcontent-%COMP%] { display: none; }\n\n@include mobile {\n  .setup__main { flex-wrap: wrap; padding: var(--space-4); }\n  .setup__text { flex-basis: 100%; order: 2; }\n  .setup__percent { order: 1; margin-left: auto; }\n  .setup__cta { order: 3; width: 100%; }\n  .setup__footer { padding: var(--space-3) var(--space-4); }\n  .mini { padding: var(--space-3) var(--space-4); flex-wrap: wrap; }\n  .mini__link { flex-basis: 100%; padding-left: 38px; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SetupProgressComponent, [{
        type: Component,
        args: [{ selector: 'eduops-setup-progress', standalone: true, imports: [CommonModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (visible()) {\n  @if (status(); as setup) {\n    <section class=\"setup\" [class.setup--compact]=\"compact\"\n             aria-labelledby=\"setup-heading\">\n\n      <!-- Ligne principale -->\n      <div class=\"setup__main\">\n        <span class=\"setup__icon\" aria-hidden=\"true\">\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\"\n               stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <circle cx=\"12\" cy=\"12\" r=\"3\"/>\n            <path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.5.55.87 1.06.99H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z\"/>\n          </svg>\n        </span>\n\n        <div class=\"setup__text\">\n          <h2 class=\"setup__title\" id=\"setup-heading\">Bien d\u00E9marrer avec Soocloo</h2>\n          <p class=\"setup__count numeric\">\n            {{ setup.completedSteps }} \u00E9tape{{ setup.completedSteps > 1 ? 's' : '' }}\n            sur {{ setup.totalSteps }} termin\u00E9e{{ setup.completedSteps > 1 ? 's' : '' }}\n          </p>\n          <div class=\"setup__bar\" role=\"progressbar\"\n               [attr.aria-valuenow]=\"setup.percentComplete\"\n               aria-valuemin=\"0\" aria-valuemax=\"100\">\n            <span class=\"setup__fill\" [style.width.%]=\"setup.percentComplete\"></span>\n          </div>\n        </div>\n\n        <span class=\"setup__percent numeric\">{{ setup.percentComplete }}%</span>\n\n        @if (nextStep(); as step) {\n          <a class=\"btn btn--primary setup__cta\" [routerLink]=\"step.actionRoute\">\n            Continuer <span aria-hidden=\"true\">\u2192</span>\n          </a>\n        }\n      </div>\n\n      <!-- Prochaine etape + bascule de la liste -->\n      <div class=\"setup__footer\">\n        @if (nextStep(); as step) {\n          <p class=\"setup__next\">\n            <strong>Prochaine \u00E9tape :</strong>\n            {{ step.label }} \u2014 {{ step.description }}\n          </p>\n        }\n        <button type=\"button\" class=\"setup__toggle\" (click)=\"toggle()\"\n                [attr.aria-expanded]=\"expanded()\">\n          Voir les {{ setup.totalSteps }} \u00E9tapes\n          <span aria-hidden=\"true\">{{ expanded() ? '\u2303' : '\u2304' }}</span>\n        </button>\n      </div>\n\n      <!-- Liste complete -->\n      @if (expanded()) {\n        <ol class=\"setup__steps\">\n          @for (step of setup.steps; track step.key; let i = $index) {\n            <li class=\"mini\" [class.mini--done]=\"step.done\"\n                [class.mini--next]=\"!step.done && setup.nextStepKey === step.key\">\n              <span class=\"mini__marker\" aria-hidden=\"true\">{{ step.done ? '\u2713' : i + 1 }}</span>\n              <div class=\"mini__body\">\n                <p class=\"mini__label\">{{ step.label }}</p>\n                <p class=\"mini__count numeric\">{{ countLabel(step) }}</p>\n              </div>\n              <a class=\"mini__link\" [routerLink]=\"step.actionRoute\">\n                {{ step.done ? 'Modifier' : step.actionLabel }}\n              </a>\n            </li>\n          }\n        </ol>\n      }\n    </section>\n  }\n}\n", styles: ["@import 'styles/tokens';\n\n.setup {\n  background: var(--surface-card);\n  border: 1px solid var(--brand-tint-border);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-xs);\n  margin-bottom: var(--space-6);\n  overflow: hidden;\n}\n\n/* \u2500\u2500 Ligne principale \u2500\u2500 */\n.setup__main {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-5) var(--space-6);\n}\n\n.setup__icon {\n  width: 42px; height: 42px; flex-shrink: 0;\n  display: grid; place-items: center;\n  border-radius: 12px;\n  background: var(--brand-tint);\n  color: var(--brand);\n}\n.setup__icon svg { width: 21px; height: 21px; }\n\n.setup__text { flex: 1; min-width: 0; }\n\n.setup__title {\n  margin: 0;\n  font-family: var(--font-display);\n  font-size: var(--text-md);\n  font-weight: 700;\n  color: var(--text-strong);\n}\n\n.setup__count {\n  margin: 2px 0 var(--space-3);\n  font-size: var(--text-sm);\n  color: var(--text-muted);\n}\n\n.setup__bar {\n  height: 5px;\n  background: var(--surface-sunken);\n  border-radius: var(--radius-pill);\n  overflow: hidden;\n}\n.setup__fill {\n  display: block; height: 100%;\n  background: linear-gradient(90deg, var(--brand), var(--chart-2));\n  border-radius: var(--radius-pill);\n  transition: width 600ms cubic-bezier(.2,.7,.3,1);\n}\n\n.setup__percent {\n  font-family: var(--font-display);\n  font-size: var(--text-lg);\n  font-weight: 700;\n  color: var(--brand);\n  flex-shrink: 0;\n}\n\n.setup__cta { flex-shrink: 0; }\n\n/* \u2500\u2500 Pied : prochaine etape \u2500\u2500 */\n.setup__footer {\n  display: flex;\n  align-items: center;\n  gap: var(--space-4);\n  padding: var(--space-3) var(--space-6);\n  background: var(--surface-page);\n  border-top: 1px solid var(--border-light);\n  flex-wrap: wrap;\n}\n\n.setup__next {\n  flex: 1; min-width: 240px; margin: 0;\n  font-size: var(--text-sm);\n  color: var(--text-normal);\n}\n.setup__next strong { color: var(--text-strong); }\n\n.setup__toggle {\n  background: none; border: 0; cursor: pointer;\n  font: inherit; font-size: var(--text-sm); font-weight: 600;\n  color: var(--brand);\n  display: inline-flex; align-items: center; gap: var(--space-1);\n  white-space: nowrap;\n}\n.setup__toggle:hover { text-decoration: underline; }\n\n/* \u2500\u2500 Liste depliee \u2500\u2500 */\n.setup__steps {\n  list-style: none; margin: 0; padding: 0;\n  border-top: 1px solid var(--border-light);\n}\n\n.mini {\n  display: flex; align-items: center; gap: var(--space-3);\n  padding: var(--space-3) var(--space-6);\n  border-bottom: 1px solid var(--border-light);\n}\n.mini:last-child { border-bottom: none; }\n.mini--done { background: var(--surface-page); }\n.mini--next { background: var(--brand-tint); }\n\n.mini__marker {\n  width: 26px; height: 26px; flex-shrink: 0;\n  display: grid; place-items: center; border-radius: 50%;\n  background: var(--surface-sunken); color: var(--text-muted);\n  font-size: var(--text-xs); font-weight: 700;\n}\n.mini--done .mini__marker { background: var(--success-bg); color: var(--success); }\n.mini--next .mini__marker { background: var(--brand); color: #fff; }\n\n.mini__body { flex: 1; min-width: 0; }\n.mini__label { margin: 0; font-size: var(--text-base); font-weight: 600; color: var(--text-strong); }\n.mini__count { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }\n.mini--done .mini__count { color: var(--success); }\n\n.mini__link {\n  font-size: var(--text-sm); font-weight: 600;\n  color: var(--brand); white-space: nowrap;\n}\n\n/* \u2500\u2500 Variante compacte \u2500\u2500 */\n.setup--compact .setup__main { padding: var(--space-4); }\n.setup--compact .setup__icon { display: none; }\n\n@include mobile {\n  .setup__main { flex-wrap: wrap; padding: var(--space-4); }\n  .setup__text { flex-basis: 100%; order: 2; }\n  .setup__percent { order: 1; margin-left: auto; }\n  .setup__cta { order: 3; width: 100%; }\n  .setup__footer { padding: var(--space-3) var(--space-4); }\n  .mini { padding: var(--space-3) var(--space-4); flex-wrap: wrap; }\n  .mini__link { flex-basis: 100%; padding-left: 38px; }\n}\n"] }]
    }], null, { compact: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SetupProgressComponent, { className: "SetupProgressComponent", filePath: "frontend/src/app/shared/ui/setup-progress/setup-progress.component.ts", lineNumber: 25 }); })();
//# sourceMappingURL=setup-progress.component.js.map