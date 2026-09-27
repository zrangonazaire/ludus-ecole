import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
function ErrorStateComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 6);
    i0.ɵɵlistener("click", function ErrorStateComponent_Conditional_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.retry.emit()); });
    i0.ɵɵtext(1, "Reessayer");
    i0.ɵɵelementEnd();
} }
function ErrorStateComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 5);
    i0.ɵɵtext(1, "Reference incident : ");
    i0.ɵɵelementStart(2, "code");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.correlationId);
} }
/** Shown when a load failed; always offers a retry. */
export class ErrorStateComponent {
    title = 'Une erreur est survenue';
    message = 'Impossible de charger les données pour le moment.';
    showRetry = true;
    correlationId;
    retry = new EventEmitter();
    static ɵfac = function ErrorStateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ErrorStateComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ErrorStateComponent, selectors: [["eduops-error-state"]], inputs: { title: "title", message: "message", showRetry: "showRetry", correlationId: "correlationId" }, outputs: { retry: "retry" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 9, vars: 4, consts: [["role", "alert", 1, "state"], ["aria-hidden", "true", 1, "state__icon"], [1, "state__title"], [1, "state__message"], ["type", "button", 1, "btn", "btn--secondary"], [1, "state__correlation"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"]], template: function ErrorStateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtext(2, "!");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "p", 2);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, ErrorStateComponent_Conditional_7_Template, 2, 0, "button", 4)(8, ErrorStateComponent_Conditional_8_Template, 4, 1, "p", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.message);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showRetry ? 7 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.correlationId ? 8 : -1);
        } }, dependencies: [CommonModule], styles: [".state__icon[_ngcontent-%COMP%] {\n      width: 56px; height: 56px;\n      display: grid; place-items: center;\n      font-family: var(--font-display);\n      font-size: 26px; font-weight: 700;\n      border-radius: 50%;\n      background: var(--danger-bg);\n      color: var(--danger);\n    }\n    .state__correlation[_ngcontent-%COMP%] { font-size: var(--text-xs); color: var(--text-light); }\n    code[_ngcontent-%COMP%] { font-family: ui-monospace, monospace; }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ErrorStateComponent, [{
        type: Component,
        args: [{ selector: 'eduops-error-state', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="state" role="alert">
      <div class="state__icon" aria-hidden="true">!</div>
      <p class="state__title">{{ title }}</p>
      <p class="state__message">{{ message }}</p>
      @if (showRetry) {
        <button type="button" class="btn btn--secondary" (click)="retry.emit()">Reessayer</button>
      }
      @if (correlationId) {
        <p class="state__correlation">Reference incident : <code>{{ correlationId }}</code></p>
      }
    </div>
  `, styles: ["\n    .state__icon {\n      width: 56px; height: 56px;\n      display: grid; place-items: center;\n      font-family: var(--font-display);\n      font-size: 26px; font-weight: 700;\n      border-radius: 50%;\n      background: var(--danger-bg);\n      color: var(--danger);\n    }\n    .state__correlation { font-size: var(--text-xs); color: var(--text-light); }\n    code { font-family: ui-monospace, monospace; }\n  "] }]
    }], null, { title: [{
            type: Input
        }], message: [{
            type: Input
        }], showRetry: [{
            type: Input
        }], correlationId: [{
            type: Input
        }], retry: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ErrorStateComponent, { className: "ErrorStateComponent", filePath: "frontend/src/app/shared/ui/error-state/error-state.component.ts", lineNumber: 37 }); })();
//# sourceMappingURL=error-state.component.js.map