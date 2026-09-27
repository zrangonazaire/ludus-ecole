import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuidedTourService } from '@core/services/guided-tour.service';
import * as i0 from "@angular/core";
function GuidedTourComponent_Conditional_0_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 17);
} if (rf & 2) {
    const box_r3 = ctx;
    i0.ɵɵstyleProp("top", box_r3.top, "px")("left", box_r3.left, "px")("width", box_r3.width, "px")("height", box_r3.height, "px");
} }
function GuidedTourComponent_Conditional_0_For_24_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function GuidedTourComponent_Conditional_0_For_24_Template_button_click_0_listener() { const $index_r5 = i0.ɵɵrestoreView(_r4).$index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.tour.goTo($index_r5)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const $index_r5 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("dot--on", $index_r5 === ctx_r1.tour.index());
    i0.ɵɵattribute("aria-label", "Etape " + ($index_r5 + 1));
} }
function GuidedTourComponent_Conditional_0_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Terminer ");
    i0.ɵɵelementStart(1, "span", 13);
    i0.ɵɵtext(2, "\u2713");
    i0.ɵɵelementEnd();
} }
function GuidedTourComponent_Conditional_0_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Suivant ");
    i0.ɵɵelementStart(1, "span", 13);
    i0.ɵɵtext(2, "\u203A");
    i0.ɵɵelementEnd();
} }
function GuidedTourComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
    i0.ɵɵlistener("click", function GuidedTourComponent_Conditional_0_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onBackdropClick()); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, GuidedTourComponent_Conditional_0_Conditional_2_Template, 1, 8, "div", 2);
    i0.ɵɵelementStart(3, "div", 3)(4, "header", 4)(5, "span", 5)(6, "span", 6);
    i0.ɵɵtext(7, "\u25C8");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8, " Piloter l'\u00E9tablissement \u00B7 ");
    i0.ɵɵelementStart(9, "span", 7);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "button", 8);
    i0.ɵɵlistener("click", function GuidedTourComponent_Conditional_0_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.tour.dismiss()); });
    i0.ɵɵtext(12, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "h2", 9);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p", 10);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "footer", 11)(18, "button", 12);
    i0.ɵɵlistener("click", function GuidedTourComponent_Conditional_0_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.tour.previous()); });
    i0.ɵɵelementStart(19, "span", 13);
    i0.ɵɵtext(20, "\u2039");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(21, " Precedent ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 14);
    i0.ɵɵrepeaterCreate(23, GuidedTourComponent_Conditional_0_For_24_Template, 1, 3, "button", 15, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "button", 16);
    i0.ɵɵlistener("click", function GuidedTourComponent_Conditional_0_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.tour.next()); });
    i0.ɵɵtemplate(26, GuidedTourComponent_Conditional_0_Conditional_26_Template, 3, 0, "span", 13)(27, GuidedTourComponent_Conditional_0_Conditional_27_Template, 3, 0, "span", 13);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_3_0;
    const step_r6 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", step_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_3_0 = ctx_r1.spotlight()) ? 2 : -1, tmp_3_0);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("top", ctx_r1.centred() ? null : ctx_r1.bubbleTop(), "px")("left", ctx_r1.centred() ? null : ctx_r1.bubbleLeft(), "px");
    i0.ɵɵclassProp("bubble--centred", ctx_r1.centred());
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.tour.position());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(step_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r6.text);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.tour.isFirst());
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r1.tour.steps());
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r1.tour.isLast() ? "btn btn--sm bubble__done" : "btn btn--primary btn--sm");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.tour.isLast() ? 26 : 27);
} }
/**
 * Guided tour overlay.
 *
 * <p>Dims the page, cuts a hole around the element being explained and anchors
 * a numbered bubble next to it. Steps without a target are centred, which suits
 * the opening and closing messages.</p>
 *
 * <p>Recomputes on scroll and resize, because a highlight that drifts away from
 * what it describes is worse than no highlight at all.</p>
 */
export class GuidedTourComponent {
    tour = inject(GuidedTourService);
    host = inject((ElementRef));
    destroyRef = inject(DestroyRef);
    spotlight = signal(null);
    bubbleTop = signal(0);
    bubbleLeft = signal(0);
    centred = signal(true);
    onReflow = () => this.reposition();
    constructor() {
        /*
         * On remesure à chaque changement d'étape.
         *
         * Les deux branches passent par une micro-tâche, et pas seulement celle
         * qui repositionne. Angular interdit d'écrire dans un signal depuis un
         * `effect` — NG0600 — parce qu'une écriture immédiate peut relancer le
         * même effet et boucler. La branche « pas d'étape » écrivait directement
         * dans `spotlight`, ce qui faisait échouer le tout premier rendu de chaque
         * page : le guide ne s'affichait pas et la console se remplissait.
         *
         * Différer l'écriture la sort du cycle de calcul : elle a lieu après, dans
         * une tâche ordinaire, où écrire est légitime. C'est aussi ce que fait déjà
         * l'autre branche, si bien que les deux se comportent enfin pareil.
         */
        effect(() => {
            const step = this.tour.current();
            queueMicrotask(() => {
                if (step) {
                    this.reposition();
                }
                else {
                    this.spotlight.set(null);
                }
            });
        });
    }
    ngAfterViewInit() {
        window.addEventListener('resize', this.onReflow, { passive: true });
        window.addEventListener('scroll', this.onReflow, { passive: true });
    }
    ngOnDestroy() {
        window.removeEventListener('resize', this.onReflow);
        window.removeEventListener('scroll', this.onReflow);
    }
    reposition() {
        const step = this.tour.current();
        if (!step) {
            return;
        }
        if (!step.target) {
            this.spotlight.set(null);
            this.centred.set(true);
            return;
        }
        const element = document.querySelector(step.target);
        if (!(element instanceof HTMLElement)) {
            // Target absent on this page: fall back to a centred bubble rather than
            // pointing at nothing.
            this.spotlight.set(null);
            this.centred.set(true);
            return;
        }
        const rect = element.getBoundingClientRect();
        const padding = 8;
        this.spotlight.set({
            top: rect.top - padding,
            left: rect.left - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2
        });
        this.centred.set(false);
        // Place the bubble below the target when there is room, above otherwise.
        const bubbleHeight = 190;
        const below = rect.bottom + 16;
        const fitsBelow = below + bubbleHeight < window.innerHeight;
        this.bubbleTop.set(fitsBelow ? below : Math.max(16, rect.top - bubbleHeight - 16));
        this.bubbleLeft.set(Math.min(Math.max(16, rect.left), Math.max(16, window.innerWidth - 360 - 16)));
    }
    onBackdropClick() {
        this.tour.dismiss();
    }
    static ɵfac = function GuidedTourComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || GuidedTourComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: GuidedTourComponent, selectors: [["eduops-guided-tour"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 1, vars: 1, consts: [["role", "dialog", "aria-modal", "true", 1, "tour"], ["aria-hidden", "true", 1, "tour__backdrop", 3, "click"], ["aria-hidden", "true", 1, "tour__spotlight", 3, "top", "left", "width", "height"], [1, "bubble"], [1, "bubble__head"], [1, "bubble__badge"], ["aria-hidden", "true", 1, "bubble__icon"], [1, "numeric"], ["type", "button", "aria-label", "Fermer le guide", 1, "bubble__close", 3, "click"], [1, "bubble__title"], [1, "bubble__text"], [1, "bubble__foot"], ["type", "button", 1, "bubble__prev", 3, "click", "disabled"], ["aria-hidden", "true"], ["role", "tablist", "aria-label", "Progression du guide", 1, "dots"], ["type", "button", 1, "dot", 3, "dot--on"], ["type", "button", 3, "click"], ["aria-hidden", "true", 1, "tour__spotlight"], ["type", "button", 1, "dot", 3, "click"]], template: function GuidedTourComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, GuidedTourComponent_Conditional_0_Template, 28, 15, "div", 0);
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵconditional((tmp_0_0 = ctx.tour.current()) ? 0 : -1, tmp_0_0);
        } }, dependencies: [CommonModule], styles: ["@import 'styles/tokens';\n\n.tour[_ngcontent-%COMP%] { position: fixed; inset: 0; z-index: var(--z-modal); }\n\n.tour__backdrop[_ngcontent-%COMP%] {\n  position: absolute; inset: 0;\n  background: rgba(20, 40, 90, .55);\n  backdrop-filter: blur(1px);\n}\n\n\n\n.tour__spotlight[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: var(--radius-card);\n  border: 2px solid #fff;\n  box-shadow: 0 0 0 9999px rgba(20, 40, 90, .55);\n  pointer-events: none;\n  transition: top 260ms ease, left 260ms ease, width 260ms ease, height 260ms ease;\n}\n\n\n\n.bubble[_ngcontent-%COMP%] {\n  position: absolute;\n  width: min(360px, calc(100vw - 32px));\n  background: var(--surface-card);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-5);\n  animation: _ngcontent-%COMP%_bubble-in 200ms ease;\n}\n.bubble--centred[_ngcontent-%COMP%] {\n  top: 50%; left: 50%;\n  transform: translate(-50%, -50%);\n}\n@keyframes _ngcontent-%COMP%_bubble-in { from { opacity: 0; transform: translateY(8px) scale(.98); } }\n.bubble--centred[_ngcontent-%COMP%] { animation: _ngcontent-%COMP%_bubble-in-centred 200ms ease; }\n@keyframes _ngcontent-%COMP%_bubble-in-centred {\n  from { opacity: 0; transform: translate(-50%, -46%) scale(.98); }\n}\n\n.bubble__head[_ngcontent-%COMP%] {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-3); margin-bottom: var(--space-3);\n}\n.bubble__badge[_ngcontent-%COMP%] {\n  display: inline-flex; align-items: center; gap: var(--space-2);\n  font-size: var(--text-xs); font-weight: 600; color: var(--brand);\n}\n.bubble__icon[_ngcontent-%COMP%] {\n  width: 20px; height: 20px; display: grid; place-items: center;\n  border-radius: 6px; background: var(--brand-tint); font-size: 11px;\n}\n.bubble__close[_ngcontent-%COMP%] {\n  background: none; border: 0; cursor: pointer;\n  font-size: 20px; line-height: 1; color: var(--text-light); padding: 0 2px;\n}\n.bubble__close[_ngcontent-%COMP%]:hover { color: var(--text-strong); }\n\n.bubble__title[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-2);\n  font-family: var(--font-display); font-size: var(--text-md);\n  font-weight: 700; color: var(--text-strong);\n}\n.bubble__text[_ngcontent-%COMP%] {\n  margin: 0 0 var(--space-5);\n  font-size: var(--text-sm); color: var(--text-normal);\n  line-height: var(--leading-relaxed);\n}\n\n.bubble__foot[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); }\n\n.bubble__prev[_ngcontent-%COMP%] {\n  background: none; border: 0; cursor: pointer;\n  font: inherit; font-size: var(--text-sm); font-weight: 600;\n  color: var(--text-muted); padding: 0;\n  display: inline-flex; align-items: center; gap: 4px;\n}\n.bubble__prev[_ngcontent-%COMP%]:disabled { opacity: .4; cursor: not-allowed; }\n.bubble__prev[_ngcontent-%COMP%]:not(:disabled):hover { color: var(--brand); }\n\n.bubble__done[_ngcontent-%COMP%] { background: var(--success); color: #fff; }\n.bubble__done[_ngcontent-%COMP%]:hover { filter: brightness(.95); }\n\n\n\n.dots[_ngcontent-%COMP%] { display: flex; gap: 5px; }\n.dot[_ngcontent-%COMP%] {\n  width: 6px; height: 6px; padding: 0;\n  border: 0; border-radius: var(--radius-pill);\n  background: var(--border-strong); cursor: pointer;\n  transition: width var(--transition-fast), background var(--transition-fast);\n}\n.dot--on[_ngcontent-%COMP%] { width: 18px; background: var(--brand); }\n\n@include mobile {\n  .bubble {\n    top: auto !important; left: 50% !important; bottom: var(--space-4);\n    transform: translateX(-50%);\n    width: calc(100vw - 32px);\n  }\n  .bubble--centred { top: 50% !important; transform: translate(-50%, -50%); }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GuidedTourComponent, [{
        type: Component,
        args: [{ selector: 'eduops-guided-tour', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (tour.current(); as step) {\n  <div class=\"tour\" role=\"dialog\" aria-modal=\"true\" [attr.aria-label]=\"step.title\">\n\n    <!-- Fond assombri, troue autour de l'element explique -->\n    <div class=\"tour__backdrop\" (click)=\"onBackdropClick()\" aria-hidden=\"true\"></div>\n\n    @if (spotlight(); as box) {\n      <div class=\"tour__spotlight\" aria-hidden=\"true\"\n           [style.top.px]=\"box.top\" [style.left.px]=\"box.left\"\n           [style.width.px]=\"box.width\" [style.height.px]=\"box.height\"></div>\n    }\n\n    <!-- Bulle -->\n    <div class=\"bubble\" [class.bubble--centred]=\"centred()\"\n         [style.top.px]=\"centred() ? null : bubbleTop()\"\n         [style.left.px]=\"centred() ? null : bubbleLeft()\">\n\n      <header class=\"bubble__head\">\n        <span class=\"bubble__badge\">\n          <span class=\"bubble__icon\" aria-hidden=\"true\">\u25C8</span>\n          Piloter l'\u00E9tablissement \u00B7 <span class=\"numeric\">{{ tour.position() }}</span>\n        </span>\n        <button type=\"button\" class=\"bubble__close\" aria-label=\"Fermer le guide\"\n                (click)=\"tour.dismiss()\">\u00D7</button>\n      </header>\n\n      <h2 class=\"bubble__title\">{{ step.title }}</h2>\n      <p class=\"bubble__text\">{{ step.text }}</p>\n\n      <footer class=\"bubble__foot\">\n        <button type=\"button\" class=\"bubble__prev\" [disabled]=\"tour.isFirst()\"\n                (click)=\"tour.previous()\">\n          <span aria-hidden=\"true\">\u2039</span> Precedent\n        </button>\n\n        <div class=\"dots\" role=\"tablist\" aria-label=\"Progression du guide\">\n          @for (s of tour.steps(); track $index) {\n            <button type=\"button\" class=\"dot\" [class.dot--on]=\"$index === tour.index()\"\n                    [attr.aria-label]=\"'Etape ' + ($index + 1)\"\n                    (click)=\"tour.goTo($index)\"></button>\n          }\n        </div>\n\n        <button type=\"button\"\n                [class]=\"tour.isLast() ? 'btn btn--sm bubble__done' : 'btn btn--primary btn--sm'\"\n                (click)=\"tour.next()\">\n          @if (tour.isLast()) {\n            Terminer <span aria-hidden=\"true\">\u2713</span>\n          } @else {\n            Suivant <span aria-hidden=\"true\">\u203A</span>\n          }\n        </button>\n      </footer>\n    </div>\n  </div>\n}\n", styles: ["@import 'styles/tokens';\n\n.tour { position: fixed; inset: 0; z-index: var(--z-modal); }\n\n.tour__backdrop {\n  position: absolute; inset: 0;\n  background: rgba(20, 40, 90, .55);\n  backdrop-filter: blur(1px);\n}\n\n/* Trou lumineux autour de l'element explique */\n.tour__spotlight {\n  position: absolute;\n  border-radius: var(--radius-card);\n  border: 2px solid #fff;\n  box-shadow: 0 0 0 9999px rgba(20, 40, 90, .55);\n  pointer-events: none;\n  transition: top 260ms ease, left 260ms ease, width 260ms ease, height 260ms ease;\n}\n\n/* \u2500\u2500 Bulle \u2500\u2500 */\n.bubble {\n  position: absolute;\n  width: min(360px, calc(100vw - 32px));\n  background: var(--surface-card);\n  border-radius: var(--radius-card);\n  box-shadow: var(--shadow-lg);\n  padding: var(--space-5);\n  animation: bubble-in 200ms ease;\n}\n.bubble--centred {\n  top: 50%; left: 50%;\n  transform: translate(-50%, -50%);\n}\n@keyframes bubble-in { from { opacity: 0; transform: translateY(8px) scale(.98); } }\n.bubble--centred { animation: bubble-in-centred 200ms ease; }\n@keyframes bubble-in-centred {\n  from { opacity: 0; transform: translate(-50%, -46%) scale(.98); }\n}\n\n.bubble__head {\n  display: flex; align-items: center; justify-content: space-between;\n  gap: var(--space-3); margin-bottom: var(--space-3);\n}\n.bubble__badge {\n  display: inline-flex; align-items: center; gap: var(--space-2);\n  font-size: var(--text-xs); font-weight: 600; color: var(--brand);\n}\n.bubble__icon {\n  width: 20px; height: 20px; display: grid; place-items: center;\n  border-radius: 6px; background: var(--brand-tint); font-size: 11px;\n}\n.bubble__close {\n  background: none; border: 0; cursor: pointer;\n  font-size: 20px; line-height: 1; color: var(--text-light); padding: 0 2px;\n}\n.bubble__close:hover { color: var(--text-strong); }\n\n.bubble__title {\n  margin: 0 0 var(--space-2);\n  font-family: var(--font-display); font-size: var(--text-md);\n  font-weight: 700; color: var(--text-strong);\n}\n.bubble__text {\n  margin: 0 0 var(--space-5);\n  font-size: var(--text-sm); color: var(--text-normal);\n  line-height: var(--leading-relaxed);\n}\n\n.bubble__foot { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); }\n\n.bubble__prev {\n  background: none; border: 0; cursor: pointer;\n  font: inherit; font-size: var(--text-sm); font-weight: 600;\n  color: var(--text-muted); padding: 0;\n  display: inline-flex; align-items: center; gap: 4px;\n}\n.bubble__prev:disabled { opacity: .4; cursor: not-allowed; }\n.bubble__prev:not(:disabled):hover { color: var(--brand); }\n\n.bubble__done { background: var(--success); color: #fff; }\n.bubble__done:hover { filter: brightness(.95); }\n\n/* \u2500\u2500 Points de progression \u2500\u2500 */\n.dots { display: flex; gap: 5px; }\n.dot {\n  width: 6px; height: 6px; padding: 0;\n  border: 0; border-radius: var(--radius-pill);\n  background: var(--border-strong); cursor: pointer;\n  transition: width var(--transition-fast), background var(--transition-fast);\n}\n.dot--on { width: 18px; background: var(--brand); }\n\n@include mobile {\n  .bubble {\n    top: auto !important; left: 50% !important; bottom: var(--space-4);\n    transform: translateX(-50%);\n    width: calc(100vw - 32px);\n  }\n  .bubble--centred { top: 50% !important; transform: translate(-50%, -50%); }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(GuidedTourComponent, { className: "GuidedTourComponent", filePath: "frontend/src/app/shared/ui/guided-tour/guided-tour.component.ts", lineNumber: 33 }); })();
//# sourceMappingURL=guided-tour.component.js.map