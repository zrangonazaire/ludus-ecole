import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '@core/services/notification.service';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function ToastHostComponent_For_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const toast_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(toast_r2.title);
} }
function ToastHostComponent_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2)(1, "div", 3);
    i0.ɵɵtemplate(2, ToastHostComponent_For_2_Conditional_2_Template, 2, 1, "p", 4);
    i0.ɵɵelementStart(3, "p", 5);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 6);
    i0.ɵɵlistener("click", function ToastHostComponent_For_2_Template_button_click_5_listener() { const toast_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.notifications.dismiss(toast_r2.id)); });
    i0.ɵɵtext(6, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const toast_r2 = ctx.$implicit;
    i0.ɵɵclassMap("toast--" + toast_r2.tone);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(toast_r2.title ? 2 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(toast_r2.message);
} }
/** Renders the toast queue. Mounted once, at the app root. */
export class ToastHostComponent {
    notifications = inject(NotificationService);
    static ɵfac = function ToastHostComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastHostComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToastHostComponent, selectors: [["eduops-toast-host"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 0, consts: [["role", "region", "aria-live", "polite", "aria-label", "Notifications", 1, "toasts"], ["role", "status", 1, "toast", 3, "class"], ["role", "status", 1, "toast"], [1, "toast__body"], [1, "toast__title"], [1, "toast__message"], ["type", "button", "aria-label", "Fermer", 1, "toast__close", 3, "click"]], template: function ToastHostComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵrepeaterCreate(1, ToastHostComponent_For_2_Template, 7, 4, "div", 1, _forTrack0);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.notifications.toasts());
        } }, dependencies: [CommonModule], styles: [".toasts[_ngcontent-%COMP%] {\n      position: fixed;\n      top: calc(var(--topbar-height) + var(--space-4));\n      right: var(--space-4);\n      display: flex; flex-direction: column; gap: var(--space-2);\n      z-index: var(--z-toast);\n      max-width: min(420px, calc(100vw - 32px));\n    }\n    .toast[_ngcontent-%COMP%] {\n      display: flex; align-items: flex-start; gap: var(--space-3);\n      padding: var(--space-3) var(--space-4);\n      background: var(--surface-card);\n      border: 1px solid var(--border);\n      border-left-width: 4px;\n      border-radius: var(--radius-button);\n      box-shadow: var(--shadow-md);\n      animation: _ngcontent-%COMP%_slide-in 180ms ease;\n    }\n    .toast--success[_ngcontent-%COMP%] { border-left-color: var(--success); }\n    .toast--error[_ngcontent-%COMP%]   { border-left-color: var(--danger); }\n    .toast--warning[_ngcontent-%COMP%] { border-left-color: var(--warning); }\n    .toast--info[_ngcontent-%COMP%]    { border-left-color: var(--brand); }\n\n    .toast__title[_ngcontent-%COMP%] { font-weight: 700; margin: 0 0 2px; color: var(--text-strong); }\n    .toast__message[_ngcontent-%COMP%] { margin: 0; font-size: var(--text-base); color: var(--text-normal); }\n    .toast__close[_ngcontent-%COMP%] {\n      background: none; border: 0; cursor: pointer;\n      font-size: 20px; line-height: 1; color: var(--text-light);\n      padding: 0 2px;\n    }\n    @keyframes _ngcontent-%COMP%_slide-in { from { opacity: 0; transform: translateX(16px); } }\n\n    @media (max-width: 767px) {\n      .toasts[_ngcontent-%COMP%] { left: var(--space-3); right: var(--space-3); top: var(--space-3); max-width: none; }\n    }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastHostComponent, [{
        type: Component,
        args: [{ selector: 'eduops-toast-host', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="toasts" role="region" aria-live="polite" aria-label="Notifications">
      @for (toast of notifications.toasts(); track toast.id) {
        <div class="toast" [class]="'toast--' + toast.tone" role="status">
          <div class="toast__body">
            @if (toast.title) { <p class="toast__title">{{ toast.title }}</p> }
            <p class="toast__message">{{ toast.message }}</p>
          </div>
          <button type="button" class="toast__close" aria-label="Fermer"
                  (click)="notifications.dismiss(toast.id)">×</button>
        </div>
      }
    </div>
  `, styles: ["\n    .toasts {\n      position: fixed;\n      top: calc(var(--topbar-height) + var(--space-4));\n      right: var(--space-4);\n      display: flex; flex-direction: column; gap: var(--space-2);\n      z-index: var(--z-toast);\n      max-width: min(420px, calc(100vw - 32px));\n    }\n    .toast {\n      display: flex; align-items: flex-start; gap: var(--space-3);\n      padding: var(--space-3) var(--space-4);\n      background: var(--surface-card);\n      border: 1px solid var(--border);\n      border-left-width: 4px;\n      border-radius: var(--radius-button);\n      box-shadow: var(--shadow-md);\n      animation: slide-in 180ms ease;\n    }\n    .toast--success { border-left-color: var(--success); }\n    .toast--error   { border-left-color: var(--danger); }\n    .toast--warning { border-left-color: var(--warning); }\n    .toast--info    { border-left-color: var(--brand); }\n\n    .toast__title { font-weight: 700; margin: 0 0 2px; color: var(--text-strong); }\n    .toast__message { margin: 0; font-size: var(--text-base); color: var(--text-normal); }\n    .toast__close {\n      background: none; border: 0; cursor: pointer;\n      font-size: 20px; line-height: 1; color: var(--text-light);\n      padding: 0 2px;\n    }\n    @keyframes slide-in { from { opacity: 0; transform: translateX(16px); } }\n\n    @media (max-width: 767px) {\n      .toasts { left: var(--space-3); right: var(--space-3); top: var(--space-3); max-width: none; }\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToastHostComponent, { className: "ToastHostComponent", filePath: "frontend/src/app/shared/ui/toast-host/toast-host.component.ts", lineNumber: 63 }); })();
//# sourceMappingURL=toast-host.component.js.map