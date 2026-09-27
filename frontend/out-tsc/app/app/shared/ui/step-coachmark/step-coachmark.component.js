import { ChangeDetectionStrategy, Component, computed, HostListener, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { StepGuidanceService } from '@core/services/step-guidance.service';
import * as i0 from "@angular/core";
const _c0 = ["panel"];
const _c1 = ["helpButton"];
function StepCoachmarkComponent_Conditional_0_Conditional_21_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "span", 17);
    i0.ɵɵtext(2, "\u2713");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const point_r3 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(point_r3);
} }
function StepCoachmarkComponent_Conditional_0_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 14);
    i0.ɵɵrepeaterCreate(1, StepCoachmarkComponent_Conditional_0_Conditional_21_For_2_Template, 4, 1, "li", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.points());
} }
function StepCoachmarkComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2)(1, "section", 4, 0);
    i0.ɵɵlistener("click", function StepCoachmarkComponent_Conditional_0_Template_section_click_1_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.stopPropagation($event)); });
    i0.ɵɵelement(3, "div", 5);
    i0.ɵɵelementStart(4, "header", 6)(5, "span", 7);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 8);
    i0.ɵɵlistener("click", function StepCoachmarkComponent_Conditional_0_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.dismiss()); });
    i0.ɵɵtext(8, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 9)(10, "div", 10)(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div")(15, "p", 11);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "h2", 12);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p", 13);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(21, StepCoachmarkComponent_Conditional_0_Conditional_21_Template, 3, 0, "ul", 14);
    i0.ɵɵelementStart(22, "footer", 15)(23, "small");
    i0.ɵɵtext(24, "Ce conseil s\u2019affiche automatiquement une seule fois. Le bouton Aide permet de le revoir.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "button", 16);
    i0.ɵɵlistener("click", function StepCoachmarkComponent_Conditional_0_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.accept()); });
    i0.ɵɵtext(26);
    i0.ɵɵelementStart(27, "span", 17);
    i0.ɵɵtext(28, "\u2192");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-labelledby", ctx_r1.titleId())("aria-describedby", ctx_r1.descriptionId());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("\u00C9tape ", ctx_r1.stepNumber(), " sur ", ctx_r1.totalSteps(), "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.stepNumber());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.eyebrow());
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r1.titleId());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.title());
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r1.descriptionId());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.description());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.points().length ? 21 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.ctaLabel(), " ");
} }
function StepCoachmarkComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18, 1);
    i0.ɵɵlistener("click", function StepCoachmarkComponent_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.open()); });
    i0.ɵɵelementStart(2, "span", 17);
    i0.ɵɵtext(3, "?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5, "Aide");
    i0.ɵɵelementEnd()();
} }
export class StepCoachmarkComponent {
    guidance = inject(StepGuidanceService);
    panel = viewChild('panel');
    helpButton = viewChild('helpButton');
    activeKey = '';
    previousFocus = null;
    flow = input.required();
    stepKey = input.required();
    stepNumber = input.required();
    totalSteps = input.required();
    eyebrow = input('À savoir avant de commencer');
    title = input.required();
    description = input.required();
    points = input([]);
    ctaLabel = input('J’ai compris, commencer');
    accepted = output();
    visible = signal(false);
    idPrefix = computed(() => `coachmark-${this.flow()}-${this.stepKey()}`.replace(/[^a-z0-9_-]/gi, '-'));
    titleId = computed(() => `${this.idPrefix()}-title`);
    descriptionId = computed(() => `${this.idPrefix()}-description`);
    constructor() {
        effect(() => {
            const flow = this.flow();
            const step = this.stepKey();
            const key = `${flow}:${step}`;
            if (key === this.activeKey) {
                return;
            }
            this.activeKey = key;
            if (!this.guidance.isSeen(flow, step)) {
                this.show();
            }
            else {
                this.visible.set(false);
            }
        }, { allowSignalWrites: true });
    }
    open() {
        this.show();
    }
    dismiss() {
        this.guidance.markSeen(this.flow(), this.stepKey());
        this.visible.set(false);
        setTimeout(() => {
            const previous = this.previousFocus;
            const target = previous && previous !== document.body && previous.isConnected
                ? previous
                : this.helpButton()?.nativeElement;
            target?.focus();
        });
    }
    accept() {
        this.guidance.markSeen(this.flow(), this.stepKey());
        this.visible.set(false);
        this.accepted.emit();
    }
    stopPropagation(event) {
        event.stopPropagation();
    }
    handleKeydown(event) {
        if (!this.visible()) {
            return;
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            this.dismiss();
            return;
        }
        if (event.key !== 'Tab') {
            return;
        }
        const panel = this.panel()?.nativeElement;
        const focusable = panel?.querySelectorAll('button, [href], [tabindex="0"]');
        if (!focusable?.length) {
            return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const activeElement = document.activeElement;
        if (!panel?.contains(activeElement)) {
            event.preventDefault();
            first.focus();
        }
        else if (event.shiftKey && (activeElement === first || activeElement === panel)) {
            event.preventDefault();
            last.focus();
        }
        else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
    focusPanel() {
        setTimeout(() => this.panel()?.nativeElement.focus());
    }
    show() {
        if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
            this.previousFocus = document.activeElement;
        }
        this.visible.set(true);
        this.focusPanel();
    }
    static ɵfac = function StepCoachmarkComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StepCoachmarkComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StepCoachmarkComponent, selectors: [["eduops-step-coachmark"]], viewQuery: function StepCoachmarkComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.panel, _c0, 5);
            i0.ɵɵviewQuerySignal(ctx.helpButton, _c1, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance(2);
        } }, hostBindings: function StepCoachmarkComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown", function StepCoachmarkComponent_keydown_HostBindingHandler($event) { return ctx.handleKeydown($event); }, false, i0.ɵɵresolveDocument);
        } }, inputs: { flow: [1, "flow"], stepKey: [1, "stepKey"], stepNumber: [1, "stepNumber"], totalSteps: [1, "totalSteps"], eyebrow: [1, "eyebrow"], title: [1, "title"], description: [1, "description"], points: [1, "points"], ctaLabel: [1, "ctaLabel"] }, outputs: { accepted: "accepted" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 2, vars: 1, consts: [["panel", ""], ["helpButton", ""], [1, "coachmark-layer"], ["type", "button", "aria-label", "R\u00E9afficher l\u2019aide de cette \u00E9tape", "title", "Aide sur cette \u00E9tape", 1, "coachmark-help"], ["role", "dialog", "aria-modal", "true", "tabindex", "-1", 1, "coachmark", 3, "click"], ["aria-hidden", "true", 1, "coachmark__accent"], [1, "coachmark__header"], [1, "coachmark__count"], ["type", "button", "aria-label", "Fermer cette aide", 1, "coachmark__close", 3, "click"], [1, "coachmark__body"], ["aria-hidden", "true", 1, "coachmark__symbol"], [1, "coachmark__eyebrow"], [3, "id"], [1, "coachmark__description", 3, "id"], [1, "coachmark__points"], [1, "coachmark__footer"], ["type", "button", 1, "coachmark__cta", 3, "click"], ["aria-hidden", "true"], ["type", "button", "aria-label", "R\u00E9afficher l\u2019aide de cette \u00E9tape", "title", "Aide sur cette \u00E9tape", 1, "coachmark-help", 3, "click"]], template: function StepCoachmarkComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, StepCoachmarkComponent_Conditional_0_Template, 29, 12, "div", 2)(1, StepCoachmarkComponent_Conditional_1_Template, 6, 0, "button", 3);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.visible() ? 0 : 1);
        } }, styles: ["[_nghost-%COMP%] { display: contents; }\n\n.coachmark-layer[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 1070;\n  inset: 0;\n  display: grid;\n  place-items: start center;\n  padding: 88px 20px 30px;\n  overflow-y: auto;\n  background: rgba(9, 27, 48, .32);\n  backdrop-filter: blur(3px);\n  animation: _ngcontent-%COMP%_layer-in 180ms ease-out;\n}\n\n.coachmark[_ngcontent-%COMP%] {\n  position: relative;\n  width: min(500px, 100%);\n  overflow: hidden;\n  border: 1px solid rgba(255, 255, 255, .9);\n  border-radius: 22px;\n  background: #fff;\n  box-shadow: 0 28px 75px rgba(9, 30, 55, .25), 0 3px 12px rgba(9, 30, 55, .1);\n  outline: none;\n  animation: _ngcontent-%COMP%_card-in 220ms cubic-bezier(.2, .8, .2, 1);\n}\n\n.coachmark__accent[_ngcontent-%COMP%] {\n  height: 5px;\n  background: linear-gradient(90deg, var(--brand), #0b9181 68%, #e9aa38);\n}\n\n.coachmark__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 18px 0;\n}\n\n.coachmark__count[_ngcontent-%COMP%] {\n  padding: 5px 9px;\n  border-radius: 20px;\n  background: var(--brand-tint);\n  color: var(--brand);\n  font-size: 11px;\n  font-weight: 800;\n}\n\n.coachmark__close[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border: 0;\n  border-radius: 10px;\n  background: var(--surface-sunken);\n  color: var(--text-muted);\n  font-size: 21px;\n  line-height: 1;\n  cursor: pointer;\n}\n\n.coachmark__close[_ngcontent-%COMP%]:hover { background: var(--border); color: var(--text-strong); }\n\n.coachmark__body[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 58px 1fr;\n  gap: 17px;\n  align-items: start;\n  padding: 15px 24px 12px;\n}\n\n.coachmark__symbol[_ngcontent-%COMP%] {\n  position: relative;\n  width: 54px;\n  height: 54px;\n  display: grid;\n  place-items: center;\n  border-radius: 17px;\n  background: linear-gradient(145deg, var(--brand), #144595);\n  color: #fff;\n  box-shadow: 0 10px 20px rgba(31, 95, 214, .2);\n}\n\n.coachmark__symbol[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { position: relative; z-index: 1; font: 800 20px var(--font-display); }\n.coachmark__symbol[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 22px;\n  height: 22px;\n  right: -7px;\n  bottom: -6px;\n  border: 4px solid #fff;\n  border-radius: 50%;\n  background: #18a78f;\n}\n\n.coachmark__eyebrow[_ngcontent-%COMP%] {\n  margin: 1px 0 6px;\n  color: var(--brand);\n  font-size: 10px;\n  font-weight: 800;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n}\n\n.coachmark[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text-strong);\n  font-size: 23px;\n  line-height: 1.18;\n  letter-spacing: -.025em;\n}\n\n.coachmark__description[_ngcontent-%COMP%] {\n  margin: 9px 0 0;\n  color: var(--text-normal);\n  font-size: 14px;\n  line-height: 1.55;\n}\n\n.coachmark__points[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  margin: 4px 24px 18px 99px;\n  padding: 0;\n  list-style: none;\n}\n\n.coachmark__points[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--text-normal);\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.coachmark__points[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  display: grid;\n  place-items: center;\n  flex: 0 0 18px;\n  border-radius: 6px;\n  background: #e6f6f1;\n  color: #0b8978;\n  font-size: 10px;\n}\n\n.coachmark__footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 18px;\n  padding: 15px 18px;\n  border-top: 1px solid var(--border);\n  background: #f8fafc;\n}\n\n.coachmark__footer[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { max-width: 220px; color: var(--text-muted); font-size: 12px; line-height: 1.4; }\n.coachmark__cta[_ngcontent-%COMP%] {\n  min-height: 44px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 9px;\n  padding: 0 17px;\n  border: 0;\n  border-radius: 11px;\n  background: var(--brand);\n  color: #fff;\n  font: 700 12px var(--font-body);\n  box-shadow: 0 8px 18px rgba(31, 95, 214, .2);\n  cursor: pointer;\n}\n\n.coachmark__cta[_ngcontent-%COMP%]:hover { background: var(--brand-hover); }\n\n.coachmark-help[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 1035;\n  right: 22px;\n  bottom: 84px;\n  min-height: 44px;\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 5px 11px 5px 6px;\n  border: 1px solid var(--border-strong);\n  border-radius: 22px;\n  background: rgba(255, 255, 255, .96);\n  color: var(--text-normal);\n  box-shadow: var(--shadow-md);\n  cursor: pointer;\n}\n\n.coachmark-help[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  background: var(--brand);\n  color: #fff;\n  font-weight: 800;\n}\n\n.coachmark-help[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { font-size: 11px; font-weight: 700; }\n\n@keyframes _ngcontent-%COMP%_layer-in { from { opacity: 0; } }\n@keyframes _ngcontent-%COMP%_card-in { from { opacity: 0; transform: translateY(-12px) scale(.98); } }\n\n@media (max-width: 767px) {\n  .coachmark-layer[_ngcontent-%COMP%] {\n    align-items: end;\n    padding: 16px 12px calc(16px + env(safe-area-inset-bottom));\n    backdrop-filter: none;\n  }\n  .coachmark[_ngcontent-%COMP%] {\n    max-height: calc(100dvh - 32px - env(safe-area-inset-bottom));\n    overflow-y: auto;\n    overscroll-behavior: contain;\n    border-radius: 20px;\n  }\n  .coachmark__body[_ngcontent-%COMP%] { grid-template-columns: 45px 1fr; gap: 13px; padding: 13px 18px 10px; }\n  .coachmark__symbol[_ngcontent-%COMP%] { width: 44px; height: 44px; border-radius: 14px; }\n  .coachmark__symbol[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 17px; }\n  .coachmark[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { font-size: 20px; }\n  .coachmark__points[_ngcontent-%COMP%] { margin: 5px 18px 15px 76px; }\n  .coachmark__footer[_ngcontent-%COMP%] { align-items: stretch; flex-direction: column; gap: 10px; }\n  .coachmark__footer[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { max-width: none; text-align: center; }\n  .coachmark__cta[_ngcontent-%COMP%] { width: 100%; }\n  .coachmark-help[_ngcontent-%COMP%] { right: 14px; bottom: calc(84px + env(safe-area-inset-bottom)); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .coachmark-layer[_ngcontent-%COMP%], .coachmark[_ngcontent-%COMP%] { animation: none; }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StepCoachmarkComponent, [{
        type: Component,
        args: [{ selector: 'eduops-step-coachmark', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (visible()) {\n  <div class=\"coachmark-layer\">\n    <section #panel class=\"coachmark\" role=\"dialog\" aria-modal=\"true\"\n             [attr.aria-labelledby]=\"titleId()\" [attr.aria-describedby]=\"descriptionId()\"\n             tabindex=\"-1\" (click)=\"stopPropagation($event)\">\n      <div class=\"coachmark__accent\" aria-hidden=\"true\"></div>\n\n      <header class=\"coachmark__header\">\n        <span class=\"coachmark__count\">\u00C9tape {{ stepNumber() }} sur {{ totalSteps() }}</span>\n        <button type=\"button\" class=\"coachmark__close\" aria-label=\"Fermer cette aide\"\n                (click)=\"dismiss()\">\u00D7</button>\n      </header>\n\n      <div class=\"coachmark__body\">\n        <div class=\"coachmark__symbol\" aria-hidden=\"true\">\n          <span>{{ stepNumber() }}</span>\n          <i></i>\n        </div>\n        <div>\n          <p class=\"coachmark__eyebrow\">{{ eyebrow() }}</p>\n          <h2 [id]=\"titleId()\">{{ title() }}</h2>\n          <p [id]=\"descriptionId()\" class=\"coachmark__description\">{{ description() }}</p>\n        </div>\n      </div>\n\n      @if (points().length) {\n        <ul class=\"coachmark__points\">\n          @for (point of points(); track point) {\n            <li><span aria-hidden=\"true\">\u2713</span>{{ point }}</li>\n          }\n        </ul>\n      }\n\n      <footer class=\"coachmark__footer\">\n        <small>Ce conseil s\u2019affiche automatiquement une seule fois. Le bouton Aide permet de le revoir.</small>\n        <button type=\"button\" class=\"coachmark__cta\" (click)=\"accept()\">\n          {{ ctaLabel() }} <span aria-hidden=\"true\">\u2192</span>\n        </button>\n      </footer>\n    </section>\n  </div>\n} @else {\n  <button #helpButton type=\"button\" class=\"coachmark-help\"\n          aria-label=\"R\u00E9afficher l\u2019aide de cette \u00E9tape\" title=\"Aide sur cette \u00E9tape\"\n          (click)=\"open()\">\n    <span aria-hidden=\"true\">?</span>\n    <small>Aide</small>\n  </button>\n}\n", styles: [":host { display: contents; }\n\n.coachmark-layer {\n  position: fixed;\n  z-index: 1070;\n  inset: 0;\n  display: grid;\n  place-items: start center;\n  padding: 88px 20px 30px;\n  overflow-y: auto;\n  background: rgba(9, 27, 48, .32);\n  backdrop-filter: blur(3px);\n  animation: layer-in 180ms ease-out;\n}\n\n.coachmark {\n  position: relative;\n  width: min(500px, 100%);\n  overflow: hidden;\n  border: 1px solid rgba(255, 255, 255, .9);\n  border-radius: 22px;\n  background: #fff;\n  box-shadow: 0 28px 75px rgba(9, 30, 55, .25), 0 3px 12px rgba(9, 30, 55, .1);\n  outline: none;\n  animation: card-in 220ms cubic-bezier(.2, .8, .2, 1);\n}\n\n.coachmark__accent {\n  height: 5px;\n  background: linear-gradient(90deg, var(--brand), #0b9181 68%, #e9aa38);\n}\n\n.coachmark__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 18px 0;\n}\n\n.coachmark__count {\n  padding: 5px 9px;\n  border-radius: 20px;\n  background: var(--brand-tint);\n  color: var(--brand);\n  font-size: 11px;\n  font-weight: 800;\n}\n\n.coachmark__close {\n  width: 44px;\n  height: 44px;\n  border: 0;\n  border-radius: 10px;\n  background: var(--surface-sunken);\n  color: var(--text-muted);\n  font-size: 21px;\n  line-height: 1;\n  cursor: pointer;\n}\n\n.coachmark__close:hover { background: var(--border); color: var(--text-strong); }\n\n.coachmark__body {\n  display: grid;\n  grid-template-columns: 58px 1fr;\n  gap: 17px;\n  align-items: start;\n  padding: 15px 24px 12px;\n}\n\n.coachmark__symbol {\n  position: relative;\n  width: 54px;\n  height: 54px;\n  display: grid;\n  place-items: center;\n  border-radius: 17px;\n  background: linear-gradient(145deg, var(--brand), #144595);\n  color: #fff;\n  box-shadow: 0 10px 20px rgba(31, 95, 214, .2);\n}\n\n.coachmark__symbol span { position: relative; z-index: 1; font: 800 20px var(--font-display); }\n.coachmark__symbol i {\n  position: absolute;\n  width: 22px;\n  height: 22px;\n  right: -7px;\n  bottom: -6px;\n  border: 4px solid #fff;\n  border-radius: 50%;\n  background: #18a78f;\n}\n\n.coachmark__eyebrow {\n  margin: 1px 0 6px;\n  color: var(--brand);\n  font-size: 10px;\n  font-weight: 800;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n}\n\n.coachmark h2 {\n  margin: 0;\n  color: var(--text-strong);\n  font-size: 23px;\n  line-height: 1.18;\n  letter-spacing: -.025em;\n}\n\n.coachmark__description {\n  margin: 9px 0 0;\n  color: var(--text-normal);\n  font-size: 14px;\n  line-height: 1.55;\n}\n\n.coachmark__points {\n  display: grid;\n  gap: 8px;\n  margin: 4px 24px 18px 99px;\n  padding: 0;\n  list-style: none;\n}\n\n.coachmark__points li {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--text-normal);\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.coachmark__points span {\n  width: 18px;\n  height: 18px;\n  display: grid;\n  place-items: center;\n  flex: 0 0 18px;\n  border-radius: 6px;\n  background: #e6f6f1;\n  color: #0b8978;\n  font-size: 10px;\n}\n\n.coachmark__footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 18px;\n  padding: 15px 18px;\n  border-top: 1px solid var(--border);\n  background: #f8fafc;\n}\n\n.coachmark__footer small { max-width: 220px; color: var(--text-muted); font-size: 12px; line-height: 1.4; }\n.coachmark__cta {\n  min-height: 44px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 9px;\n  padding: 0 17px;\n  border: 0;\n  border-radius: 11px;\n  background: var(--brand);\n  color: #fff;\n  font: 700 12px var(--font-body);\n  box-shadow: 0 8px 18px rgba(31, 95, 214, .2);\n  cursor: pointer;\n}\n\n.coachmark__cta:hover { background: var(--brand-hover); }\n\n.coachmark-help {\n  position: fixed;\n  z-index: 1035;\n  right: 22px;\n  bottom: 84px;\n  min-height: 44px;\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 5px 11px 5px 6px;\n  border: 1px solid var(--border-strong);\n  border-radius: 22px;\n  background: rgba(255, 255, 255, .96);\n  color: var(--text-normal);\n  box-shadow: var(--shadow-md);\n  cursor: pointer;\n}\n\n.coachmark-help > span {\n  width: 30px;\n  height: 30px;\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  background: var(--brand);\n  color: #fff;\n  font-weight: 800;\n}\n\n.coachmark-help small { font-size: 11px; font-weight: 700; }\n\n@keyframes layer-in { from { opacity: 0; } }\n@keyframes card-in { from { opacity: 0; transform: translateY(-12px) scale(.98); } }\n\n@media (max-width: 767px) {\n  .coachmark-layer {\n    align-items: end;\n    padding: 16px 12px calc(16px + env(safe-area-inset-bottom));\n    backdrop-filter: none;\n  }\n  .coachmark {\n    max-height: calc(100dvh - 32px - env(safe-area-inset-bottom));\n    overflow-y: auto;\n    overscroll-behavior: contain;\n    border-radius: 20px;\n  }\n  .coachmark__body { grid-template-columns: 45px 1fr; gap: 13px; padding: 13px 18px 10px; }\n  .coachmark__symbol { width: 44px; height: 44px; border-radius: 14px; }\n  .coachmark__symbol span { font-size: 17px; }\n  .coachmark h2 { font-size: 20px; }\n  .coachmark__points { margin: 5px 18px 15px 76px; }\n  .coachmark__footer { align-items: stretch; flex-direction: column; gap: 10px; }\n  .coachmark__footer small { max-width: none; text-align: center; }\n  .coachmark__cta { width: 100%; }\n  .coachmark-help { right: 14px; bottom: calc(84px + env(safe-area-inset-bottom)); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .coachmark-layer, .coachmark { animation: none; }\n}\n"] }]
    }], () => [], { handleKeydown: [{
            type: HostListener,
            args: ['document:keydown', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StepCoachmarkComponent, { className: "StepCoachmarkComponent", filePath: "frontend/src/app/shared/ui/step-coachmark/step-coachmark.component.ts", lineNumber: 23 }); })();
//# sourceMappingURL=step-coachmark.component.js.map