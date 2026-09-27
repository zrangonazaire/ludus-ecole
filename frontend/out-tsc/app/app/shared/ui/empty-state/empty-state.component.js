import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
const _c0 = ["*"];
function EmptyStateComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.message);
} }
/** Shown when a list legitimately has nothing to display. */
export class EmptyStateComponent {
    title = 'Aucun résultat';
    message;
    icon = '—';
    static ɵfac = function EmptyStateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmptyStateComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmptyStateComponent, selectors: [["eduops-empty-state"]], inputs: { title: "title", message: "message", icon: "icon" }, standalone: true, features: [i0.ɵɵStandaloneFeature], ngContentSelectors: _c0, decls: 7, vars: 3, consts: [["role", "status", 1, "state"], ["aria-hidden", "true", 1, "state__icon"], [1, "state__title"], [1, "state__message"]], template: function EmptyStateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "p", 2);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, EmptyStateComponent_Conditional_5_Template, 2, 1, "p", 3);
            i0.ɵɵprojection(6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.icon);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.message ? 5 : -1);
        } }, dependencies: [CommonModule], styles: [".state__icon[_ngcontent-%COMP%] {\n      width: 56px; height: 56px;\n      display: grid; place-items: center;\n      font-size: 26px;\n      border-radius: 50%;\n      background: var(--surface-sunken);\n      color: var(--text-light);\n    }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmptyStateComponent, [{
        type: Component,
        args: [{ selector: 'eduops-empty-state', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="state" role="status">
      <div class="state__icon" aria-hidden="true">{{ icon }}</div>
      <p class="state__title">{{ title }}</p>
      @if (message) { <p class="state__message">{{ message }}</p> }
      <ng-content></ng-content>
    </div>
  `, styles: ["\n    .state__icon {\n      width: 56px; height: 56px;\n      display: grid; place-items: center;\n      font-size: 26px;\n      border-radius: 50%;\n      background: var(--surface-sunken);\n      color: var(--text-light);\n    }\n  "] }]
    }], null, { title: [{
            type: Input
        }], message: [{
            type: Input
        }], icon: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmptyStateComponent, { className: "EmptyStateComponent", filePath: "frontend/src/app/shared/ui/empty-state/empty-state.component.ts", lineNumber: 29 }); })();
//# sourceMappingURL=empty-state.component.js.map