import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function ConfirmDialogComponent_Conditional_0_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "label", 8);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "textarea", 9);
    i0.ɵɵtwoWayListener("ngModelChange", function ConfirmDialogComponent_Conditional_0_Conditional_6_Template_textarea_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.reason, $event) || (ctx_r1.reason = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 10);
    i0.ɵɵtext(5, "Cette justification sera conservee dans le journal d'audit.");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.reasonLabel, " ");
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.reason);
    i0.ɵɵproperty("placeholder", ctx_r1.reasonPlaceholder);
} }
function ConfirmDialogComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 0);
    i0.ɵɵlistener("click", function ConfirmDialogComponent_Conditional_0_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancel.emit()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "div", 1)(2, "h2", 2);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 3);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, ConfirmDialogComponent_Conditional_0_Conditional_6_Template, 6, 3, "div", 4);
    i0.ɵɵelementStart(7, "div", 5)(8, "button", 6);
    i0.ɵɵlistener("click", function ConfirmDialogComponent_Conditional_0_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancel.emit()); });
    i0.ɵɵtext(9, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 7);
    i0.ɵɵlistener("click", function ConfirmDialogComponent_Conditional_0_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirm.emit(ctx_r1.reason)); });
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", ctx_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.message);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.requireReason ? 6 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap("btn btn--" + (ctx_r1.danger ? "danger" : "primary"));
    i0.ɵɵproperty("disabled", ctx_r1.requireReason && ctx_r1.reason.trim().length < 5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.confirmLabel, " ");
} }
/**
 * Confirmation modal.
 *
 * When `requireReason` is set the action stays disabled until a justification
 * is typed - used for every operation the backend audits (cancelling a payment,
 * exceeding a class capacity, correcting a published grade).
 */
export class ConfirmDialogComponent {
    open = false;
    title = 'Confirmer';
    message = 'Cette action est definitive.';
    confirmLabel = 'Confirmer';
    danger = false;
    requireReason = false;
    reasonLabel = 'Justification';
    reasonPlaceholder = 'Expliquez la raison de cette operation';
    confirm = new EventEmitter();
    cancel = new EventEmitter();
    reason = '';
    static ɵfac = function ConfirmDialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ConfirmDialogComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ConfirmDialogComponent, selectors: [["eduops-confirm-dialog"]], inputs: { open: "open", title: "title", message: "message", confirmLabel: "confirmLabel", danger: "danger", requireReason: "requireReason", reasonLabel: "reasonLabel", reasonPlaceholder: "reasonPlaceholder" }, outputs: { confirm: "confirm", cancel: "cancel" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 1, vars: 1, consts: [[1, "backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", 1, "dialog"], [1, "dialog__title"], [1, "dialog__message"], [1, "field"], [1, "dialog__actions"], ["type", "button", 1, "btn", "btn--secondary", 3, "click"], ["type", "button", 3, "click", "disabled"], ["for", "confirm-reason", 1, "field__label", "field__label--required"], ["id", "confirm-reason", "rows", "3", 1, "textarea", 3, "ngModelChange", "ngModel", "placeholder"], [1, "field__hint"]], template: function ConfirmDialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ConfirmDialogComponent_Conditional_0_Template, 12, 8);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.open ? 0 : -1);
        } }, dependencies: [CommonModule, FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel], styles: [".backdrop[_ngcontent-%COMP%] {\n      position: fixed; inset: 0;\n      background: rgba(27, 36, 53, 0.45);\n      z-index: var(--z-modal-backdrop);\n    }\n    .dialog[_ngcontent-%COMP%] {\n      position: fixed;\n      top: 50%; left: 50%;\n      transform: translate(-50%, -50%);\n      width: min(480px, calc(100vw - 32px));\n      background: var(--surface-card);\n      border-radius: var(--radius-card);\n      box-shadow: var(--shadow-lg);\n      padding: var(--space-6);\n      z-index: var(--z-modal);\n    }\n    .dialog__title[_ngcontent-%COMP%] { font-family: var(--font-display); font-size: var(--text-lg); margin-bottom: var(--space-3); }\n    .dialog__message[_ngcontent-%COMP%] { color: var(--text-normal); margin-bottom: var(--space-4); }\n    .dialog__actions[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: var(--space-3); margin-top: var(--space-5); }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConfirmDialogComponent, [{
        type: Component,
        args: [{ selector: 'eduops-confirm-dialog', standalone: true, imports: [CommonModule, FormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    @if (open) {
      <div class="backdrop" (click)="cancel.emit()"></div>
      <div class="dialog" role="dialog" aria-modal="true" [attr.aria-label]="title">
        <h2 class="dialog__title">{{ title }}</h2>
        <p class="dialog__message">{{ message }}</p>

        @if (requireReason) {
          <div class="field">
            <label class="field__label field__label--required" for="confirm-reason">
              {{ reasonLabel }}
            </label>
            <textarea id="confirm-reason" class="textarea" [(ngModel)]="reason"
                      [placeholder]="reasonPlaceholder" rows="3"></textarea>
            <span class="field__hint">Cette justification sera conservee dans le journal d'audit.</span>
          </div>
        }

        <div class="dialog__actions">
          <button type="button" class="btn btn--secondary" (click)="cancel.emit()">Annuler</button>
          <button type="button" [class]="'btn btn--' + (danger ? 'danger' : 'primary')"
                  [disabled]="requireReason && reason.trim().length < 5"
                  (click)="confirm.emit(reason)">
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    }
  `, styles: ["\n    .backdrop {\n      position: fixed; inset: 0;\n      background: rgba(27, 36, 53, 0.45);\n      z-index: var(--z-modal-backdrop);\n    }\n    .dialog {\n      position: fixed;\n      top: 50%; left: 50%;\n      transform: translate(-50%, -50%);\n      width: min(480px, calc(100vw - 32px));\n      background: var(--surface-card);\n      border-radius: var(--radius-card);\n      box-shadow: var(--shadow-lg);\n      padding: var(--space-6);\n      z-index: var(--z-modal);\n    }\n    .dialog__title { font-family: var(--font-display); font-size: var(--text-lg); margin-bottom: var(--space-3); }\n    .dialog__message { color: var(--text-normal); margin-bottom: var(--space-4); }\n    .dialog__actions { display: flex; justify-content: flex-end; gap: var(--space-3); margin-top: var(--space-5); }\n  "] }]
    }], null, { open: [{
            type: Input
        }], title: [{
            type: Input
        }], message: [{
            type: Input
        }], confirmLabel: [{
            type: Input
        }], danger: [{
            type: Input
        }], requireReason: [{
            type: Input
        }], reasonLabel: [{
            type: Input
        }], reasonPlaceholder: [{
            type: Input
        }], confirm: [{
            type: Output
        }], cancel: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ConfirmDialogComponent, { className: "ConfirmDialogComponent", filePath: "frontend/src/app/shared/ui/confirm-dialog/confirm-dialog.component.ts", lineNumber: 68 }); })();
//# sourceMappingURL=confirm-dialog.component.js.map