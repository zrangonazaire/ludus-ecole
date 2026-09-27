import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/** Accessible loading indicator. */
export class LoadingStateComponent {
    message = 'Chargement en cours...';
    static ɵfac = function LoadingStateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoadingStateComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoadingStateComponent, selectors: [["eduops-loading-state"]], inputs: { message: "message" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 4, vars: 1, consts: [["role", "status", "aria-live", "polite", 1, "state"], ["aria-hidden", "true", 1, "spinner"], [1, "state__message"]], template: function LoadingStateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "div", 1);
            i0.ɵɵelementStart(2, "p", 2);
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.message);
        } }, dependencies: [CommonModule], encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoadingStateComponent, [{
        type: Component,
        args: [{
                selector: 'eduops-loading-state',
                standalone: true,
                imports: [CommonModule],
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="state" role="status" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <p class="state__message">{{ message }}</p>
    </div>
  `
            }]
    }], null, { message: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoadingStateComponent, { className: "LoadingStateComponent", filePath: "frontend/src/app/shared/ui/loading-state/loading-state.component.ts", lineNumber: 17 }); })();
//# sourceMappingURL=loading-state.component.js.map