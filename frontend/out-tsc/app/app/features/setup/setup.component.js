import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SetupStatusService } from '@core/services/setup-status.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.key;
function SetupComponent_Conditional_5_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1, "\u2022");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2);
} if (rf & 2) {
    const setup_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Ann\u00E9e ", setup_r1.academicYearCode, " ");
} }
function SetupComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 3);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, SetupComponent_Conditional_5_Conditional_2_Template, 3, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const setup_r1 = ctx;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", setup_r1.schoolName, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(setup_r1.academicYearCode ? 2 : -1);
} }
function SetupComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "eduops-loading-state", 7);
} }
function SetupComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "eduops-error-state", 9);
    i0.ɵɵlistener("retry", function SetupComponent_Conditional_12_Template_eduops_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.load()); });
    i0.ɵɵelementEnd();
} }
function SetupComponent_Conditional_13_Conditional_0_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2", 19);
    i0.ɵɵtext(1, "Configuration termin\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p", 20);
    i0.ɵɵtext(3, " Tout est en place. Vous pouvez inscrire, noter et encaisser sereinement. ");
    i0.ɵɵelementEnd();
} }
function SetupComponent_Conditional_13_Conditional_0_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p", 20);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const setup_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3(" ", setup_r4.completedSteps, " \u00E9tape", setup_r4.completedSteps > 1 ? "s" : "", " sur ", setup_r4.totalSteps, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Il reste ", setup_r4.totalSteps - setup_r4.completedSteps, " \u00E9tape(s). L'\u00E9tablissement reste utilisable entre-temps : rien ne vous oblige a tout finir d'un coup. ");
} }
function SetupComponent_Conditional_13_Conditional_0_For_14_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 26);
    i0.ɵɵtext(1, "Fait");
    i0.ɵɵelementEnd();
} }
function SetupComponent_Conditional_13_Conditional_0_For_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 21)(1, "span", 22);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 23)(4, "div", 24)(5, "h3", 25);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, SetupComponent_Conditional_13_Conditional_0_For_14_Conditional_7_Template, 2, 0, "span", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 27);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 28);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "a", 29);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const step_r5 = ctx.$implicit;
    const ɵ$index_69_r6 = ctx.$index;
    const setup_r4 = i0.ɵɵnextContext();
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("step--done", step_r5.done)("step--next", !step_r5.done && setup_r4.nextStepKey === step_r5.key);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", step_r5.done ? "\u2713" : ɵ$index_69_r6 + 1, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(step_r5.label);
    i0.ɵɵadvance();
    i0.ɵɵconditional(step_r5.done ? 7 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r5.description);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("step__count--empty", step_r5.count === 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.countLabel(step_r5.key, step_r5.count), " ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("btn--primary", !step_r5.done)("btn--secondary", step_r5.done);
    i0.ɵɵproperty("routerLink", step_r5.actionRoute);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", step_r5.done ? "Modifier" : step_r5.actionLabel, " ");
} }
function SetupComponent_Conditional_13_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 10)(1, "div", 11);
    i0.ɵɵtemplate(2, SetupComponent_Conditional_13_Conditional_0_Conditional_2_Template, 4, 0)(3, SetupComponent_Conditional_13_Conditional_0_Conditional_3_Template, 4, 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 12);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(5, "svg", 13);
    i0.ɵɵelement(6, "circle", 14)(7, "circle", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(8, "span", 16);
    i0.ɵɵtext(9);
    i0.ɵɵelementStart(10, "small");
    i0.ɵɵtext(11, "%");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(12, "ol", 17);
    i0.ɵɵrepeaterCreate(13, SetupComponent_Conditional_13_Conditional_0_For_14_Template, 14, 17, "li", 18, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const setup_r4 = ctx;
    i0.ɵɵclassProp("progress-card--done", setup_r4.complete);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(setup_r4.complete ? 2 : 3);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", setup_r4.percentComplete + " pour cent de la configuration");
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("stroke-dasharray", 326.7)("stroke-dashoffset", 326.7 - 326.7 * setup_r4.percentComplete / 100);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(setup_r4.percentComplete);
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(setup_r4.steps);
} }
function SetupComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, SetupComponent_Conditional_13_Conditional_0_Template, 15, 9);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r2.status()) ? 0 : -1, tmp_1_0);
} }
/**
 * Configuration checklist.
 *
 * <p>Answers the question the wizard left open: "I skipped a step — where do I
 * pick it up?". Each line links straight to the screen that completes it, and
 * the state is recomputed server-side from real data, so a step done by hand
 * ticks itself off.</p>
 */
export class SetupComponent {
    setupStatus = inject(SetupStatusService);
    destroyRef = inject(DestroyRef);
    status = this.setupStatus.status;
    loading = signal(true);
    error = signal(false);
    ngOnInit() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.error.set(false);
        this.setupStatus.load().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: () => this.loading.set(false),
            error: () => {
                this.loading.set(false);
                this.error.set(true);
            }
        });
    }
    /** Numbers read better than a bare count on an empty step. */
    countLabel(key, count) {
        if (count === 0) {
            return 'Rien de créé pour le moment';
        }
        switch (key) {
            case 'CYCLES': return `${count} niveau${count > 1 ? 'x' : ''} defini${count > 1 ? 's' : ''}`;
            case 'CLASSES': return `${count} classe${count > 1 ? 's' : ''} active${count > 1 ? 's' : ''}`;
            case 'SUBJECTS': return `${count} matiere${count > 1 ? 's' : ''}`;
            case 'FEES': return `${count} grille${count > 1 ? 's' : ''} de frais`;
            case 'TEACHERS': return `${count} enseignant${count > 1 ? 's' : ''} actif${count > 1 ? 's' : ''}`;
            case 'ASSIGNMENTS': return `${count} affectation${count > 1 ? 's' : ''} active${count > 1 ? 's' : ''}`;
            case 'STUDENTS': return `${count} eleve${count > 1 ? 's' : ''} inscrit${count > 1 ? 's' : ''}`;
            default: return `${count}`;
        }
    }
    static ɵfac = function SetupComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SetupComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SetupComponent, selectors: [["eduops-setup"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 14, vars: 2, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "page__meta"], [1, "page__actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["routerLink", "/onboarding", 1, "btn", "btn--primary"], ["message", "V\u00E9rification de votre configuration..."], [1, "dot"], [3, "retry"], [1, "progress-card", "card"], [1, "progress-card__text"], ["role", "img", 1, "gauge"], ["viewBox", "0 0 120 120", 1, "gauge__svg"], ["cx", "60", "cy", "60", "r", "52", 1, "gauge__track"], ["cx", "60", "cy", "60", "r", "52", 1, "gauge__fill"], [1, "gauge__value", "numeric"], [1, "steps-list"], [1, "step", 3, "step--done", "step--next"], [1, "progress-card__title"], [1, "progress-card__lead"], [1, "step"], ["aria-hidden", "true", 1, "step__marker"], [1, "step__body"], [1, "step__heading"], [1, "step__label"], [1, "badge", "badge--success"], [1, "step__description"], [1, "step__count", "numeric"], [1, "btn", "btn--sm", 3, "routerLink"]], template: function SetupComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "h1", 2);
            i0.ɵɵtext(4, "Configuration de l'\u00E9tablissement");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, SetupComponent_Conditional_5_Template, 3, 2, "p", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 4)(7, "button", 5);
            i0.ɵɵlistener("click", function SetupComponent_Template_button_click_7_listener() { return ctx.load(); });
            i0.ɵɵtext(8, "Actualiser");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "a", 6);
            i0.ɵɵtext(10, "Reprendre l'assistant");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(11, SetupComponent_Conditional_11_Template, 1, 0, "eduops-loading-state", 7)(12, SetupComponent_Conditional_12_Template, 1, 0, "eduops-error-state")(13, SetupComponent_Conditional_13_Template, 1, 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵadvance(5);
            i0.ɵɵconditional((tmp_0_0 = ctx.status()) ? 5 : -1, tmp_0_0);
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.loading() ? 11 : ctx.error() ? 12 : 13);
        } }, dependencies: [CommonModule, RouterLink, LoadingStateComponent, ErrorStateComponent], styles: ["@import 'styles/tokens';\n\n.dot[_ngcontent-%COMP%] { margin: 0 var(--space-2); color: var(--text-light); }\n\n\n\n.progress-card[_ngcontent-%COMP%] {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-8); padding: var(--space-6);\n  margin-bottom: var(--space-6);\n  border-left: 4px solid var(--brand);\n}\n.progress-card--done[_ngcontent-%COMP%] { border-left-color: var(--success); }\n.progress-card__text[_ngcontent-%COMP%] { flex: 1; }\n.progress-card__title[_ngcontent-%COMP%] { font-size: var(--text-xl); margin: 0 0 var(--space-2); }\n.progress-card__lead[_ngcontent-%COMP%] { margin: 0; color: var(--text-muted); line-height: var(--leading-relaxed); }\n\n.gauge[_ngcontent-%COMP%] { position: relative; width: 120px; height: 120px; flex-shrink: 0; }\n.gauge__svg[_ngcontent-%COMP%] { width: 100%; height: 100%; transform: rotate(-90deg); }\n.gauge__track[_ngcontent-%COMP%] { fill: none; stroke: var(--surface-sunken); stroke-width: 10; }\n.gauge__fill[_ngcontent-%COMP%] {\n  fill: none; stroke: var(--brand); stroke-width: 10; stroke-linecap: round;\n  transition: stroke-dashoffset 600ms cubic-bezier(.2,.7,.3,1);\n}\n.progress-card--done[_ngcontent-%COMP%]   .gauge__fill[_ngcontent-%COMP%] { stroke: var(--success); }\n.gauge__value[_ngcontent-%COMP%] {\n  position: absolute; inset: 0; display: grid; place-items: center;\n  font-family: var(--font-display); font-size: var(--text-xl);\n  font-weight: 700; color: var(--text-strong);\n}\n.gauge__value[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { font-size: var(--text-sm); color: var(--text-muted); }\n\n\n\n.steps-list[_ngcontent-%COMP%] { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-3); }\n\n.step[_ngcontent-%COMP%] {\n  display: flex; align-items: center; gap: var(--space-4);\n  padding: var(--space-5);\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n}\n.step--next[_ngcontent-%COMP%] { border-color: var(--brand); box-shadow: var(--shadow-sm); }\n.step--done[_ngcontent-%COMP%] { background: var(--surface-page); }\n\n.step__marker[_ngcontent-%COMP%] {\n  width: 34px; height: 34px; flex-shrink: 0;\n  display: grid; place-items: center; border-radius: 50%;\n  background: var(--surface-sunken); color: var(--text-muted);\n  font-family: var(--font-display); font-weight: 700; font-size: var(--text-base);\n}\n.step--done[_ngcontent-%COMP%]   .step__marker[_ngcontent-%COMP%] { background: var(--success-bg); color: var(--success); }\n.step--next[_ngcontent-%COMP%]   .step__marker[_ngcontent-%COMP%] { background: var(--brand); color: #fff; }\n\n.step__body[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n.step__heading[_ngcontent-%COMP%] { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; }\n.step__label[_ngcontent-%COMP%] { font-size: var(--text-md); margin: 0; }\n.step__description[_ngcontent-%COMP%] { margin: var(--space-1) 0 var(--space-2); font-size: var(--text-sm); color: var(--text-muted); }\n.step__count[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-sm); font-weight: 600; color: var(--success); }\n.step__count--empty[_ngcontent-%COMP%] { color: var(--text-light); font-weight: 400; }\n\n@include mobile {\n  .progress-card { flex-direction: column-reverse; text-align: center; gap: var(--space-4); }\n  .step { flex-wrap: wrap; }\n  .step__body { flex-basis: 100%; order: 1; }\n  .step .btn { width: 100%; order: 2; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SetupComponent, [{
        type: Component,
        args: [{ selector: 'eduops-setup', standalone: true, imports: [CommonModule, RouterLink, LoadingStateComponent, ErrorStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"page\">\n  <header class=\"page__header\">\n    <div>\n      <h1 class=\"page__title\">Configuration de l'\u00E9tablissement</h1>\n      @if (status(); as setup) {\n        <p class=\"page__meta\">\n          {{ setup.schoolName }}\n          @if (setup.academicYearCode) {\n            <span class=\"dot\">\u2022</span>Ann\u00E9e {{ setup.academicYearCode }}\n          }\n        </p>\n      }\n    </div>\n    <div class=\"page__actions\">\n      <button type=\"button\" class=\"btn btn--secondary\" (click)=\"load()\">Actualiser</button>\n      <a class=\"btn btn--primary\" routerLink=\"/onboarding\">Reprendre l'assistant</a>\n    </div>\n  </header>\n\n  @if (loading()) {\n    <eduops-loading-state message=\"V\u00E9rification de votre configuration...\" />\n  } @else if (error()) {\n    <eduops-error-state (retry)=\"load()\" />\n  } @else {\n    @if (status(); as setup) {\n\n    <!-- Progression globale -->\n    <section class=\"progress-card card\" [class.progress-card--done]=\"setup.complete\">\n      <div class=\"progress-card__text\">\n        @if (setup.complete) {\n          <h2 class=\"progress-card__title\">Configuration termin\u00E9e</h2>\n          <p class=\"progress-card__lead\">\n            Tout est en place. Vous pouvez inscrire, noter et encaisser sereinement.\n          </p>\n        } @else {\n          <h2 class=\"progress-card__title\">\n            {{ setup.completedSteps }} \u00E9tape{{ setup.completedSteps > 1 ? 's' : '' }}\n            sur {{ setup.totalSteps }}\n          </h2>\n          <p class=\"progress-card__lead\">\n            Il reste {{ setup.totalSteps - setup.completedSteps }} \u00E9tape(s).\n            L'\u00E9tablissement reste utilisable entre-temps : rien ne vous oblige a tout finir d'un coup.\n          </p>\n        }\n      </div>\n\n      <div class=\"gauge\" role=\"img\"\n           [attr.aria-label]=\"setup.percentComplete + ' pour cent de la configuration'\">\n        <svg viewBox=\"0 0 120 120\" class=\"gauge__svg\">\n          <circle class=\"gauge__track\" cx=\"60\" cy=\"60\" r=\"52\" />\n          <circle class=\"gauge__fill\" cx=\"60\" cy=\"60\" r=\"52\"\n                  [style.stroke-dasharray]=\"326.7\"\n                  [style.stroke-dashoffset]=\"326.7 - (326.7 * setup.percentComplete / 100)\" />\n        </svg>\n        <span class=\"gauge__value numeric\">{{ setup.percentComplete }}<small>%</small></span>\n      </div>\n    </section>\n\n    <!-- Etapes -->\n    <ol class=\"steps-list\">\n      @for (step of setup.steps; track step.key; let i = $index) {\n        <li class=\"step\" [class.step--done]=\"step.done\"\n            [class.step--next]=\"!step.done && setup.nextStepKey === step.key\">\n          <span class=\"step__marker\" aria-hidden=\"true\">\n            {{ step.done ? '\u2713' : i + 1 }}\n          </span>\n\n          <div class=\"step__body\">\n            <div class=\"step__heading\">\n              <h3 class=\"step__label\">{{ step.label }}</h3>\n              @if (step.done) {\n                <span class=\"badge badge--success\">Fait</span>\n              }\n            </div>\n            <p class=\"step__description\">{{ step.description }}</p>\n            <p class=\"step__count numeric\" [class.step__count--empty]=\"step.count === 0\">\n              {{ countLabel(step.key, step.count) }}\n            </p>\n          </div>\n\n          <a class=\"btn btn--sm\"\n             [class.btn--primary]=\"!step.done\"\n             [class.btn--secondary]=\"step.done\"\n             [routerLink]=\"step.actionRoute\">\n            {{ step.done ? 'Modifier' : step.actionLabel }}\n          </a>\n        </li>\n      }\n    </ol>\n    }\n  }\n</div>\n", styles: ["@import 'styles/tokens';\n\n.dot { margin: 0 var(--space-2); color: var(--text-light); }\n\n/* \u2500\u2500 Progression globale \u2500\u2500 */\n.progress-card {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-8); padding: var(--space-6);\n  margin-bottom: var(--space-6);\n  border-left: 4px solid var(--brand);\n}\n.progress-card--done { border-left-color: var(--success); }\n.progress-card__text { flex: 1; }\n.progress-card__title { font-size: var(--text-xl); margin: 0 0 var(--space-2); }\n.progress-card__lead { margin: 0; color: var(--text-muted); line-height: var(--leading-relaxed); }\n\n.gauge { position: relative; width: 120px; height: 120px; flex-shrink: 0; }\n.gauge__svg { width: 100%; height: 100%; transform: rotate(-90deg); }\n.gauge__track { fill: none; stroke: var(--surface-sunken); stroke-width: 10; }\n.gauge__fill {\n  fill: none; stroke: var(--brand); stroke-width: 10; stroke-linecap: round;\n  transition: stroke-dashoffset 600ms cubic-bezier(.2,.7,.3,1);\n}\n.progress-card--done .gauge__fill { stroke: var(--success); }\n.gauge__value {\n  position: absolute; inset: 0; display: grid; place-items: center;\n  font-family: var(--font-display); font-size: var(--text-xl);\n  font-weight: 700; color: var(--text-strong);\n}\n.gauge__value small { font-size: var(--text-sm); color: var(--text-muted); }\n\n/* \u2500\u2500 Liste des etapes \u2500\u2500 */\n.steps-list { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-3); }\n\n.step {\n  display: flex; align-items: center; gap: var(--space-4);\n  padding: var(--space-5);\n  background: var(--surface-card); border: 1px solid var(--border);\n  border-radius: var(--radius-card);\n}\n.step--next { border-color: var(--brand); box-shadow: var(--shadow-sm); }\n.step--done { background: var(--surface-page); }\n\n.step__marker {\n  width: 34px; height: 34px; flex-shrink: 0;\n  display: grid; place-items: center; border-radius: 50%;\n  background: var(--surface-sunken); color: var(--text-muted);\n  font-family: var(--font-display); font-weight: 700; font-size: var(--text-base);\n}\n.step--done .step__marker { background: var(--success-bg); color: var(--success); }\n.step--next .step__marker { background: var(--brand); color: #fff; }\n\n.step__body { flex: 1; min-width: 0; }\n.step__heading { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; }\n.step__label { font-size: var(--text-md); margin: 0; }\n.step__description { margin: var(--space-1) 0 var(--space-2); font-size: var(--text-sm); color: var(--text-muted); }\n.step__count { margin: 0; font-size: var(--text-sm); font-weight: 600; color: var(--success); }\n.step__count--empty { color: var(--text-light); font-weight: 400; }\n\n@include mobile {\n  .progress-card { flex-direction: column-reverse; text-align: center; gap: var(--space-4); }\n  .step { flex-wrap: wrap; }\n  .step__body { flex-basis: 100%; order: 1; }\n  .step .btn { width: 100%; order: 2; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SetupComponent, { className: "SetupComponent", filePath: "frontend/src/app/features/setup/setup.component.ts", lineNumber: 25 }); })();
//# sourceMappingURL=setup.component.js.map