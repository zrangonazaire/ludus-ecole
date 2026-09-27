import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import * as i0 from "@angular/core";
/**
 * Structural directive hiding UI the account cannot use:
 * `<button *eduopsHasPermission="'PAYMENT_CREATE'">`.
 *
 * This is presentation only. The backend independently rejects the call, so
 * hiding a button never becomes the security control (rule 4).
 */
export class HasPermissionDirective {
    auth = inject(AuthService);
    templateRef = inject((TemplateRef));
    viewContainer = inject(ViewContainerRef);
    required = [];
    rendered = false;
    constructor() {
        effect(() => {
            // re-evaluates whenever the session's permissions change
            const allowed = this.required.length === 0 || this.auth.hasAny(...this.required);
            if (allowed && !this.rendered) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.rendered = true;
            }
            else if (!allowed && this.rendered) {
                this.viewContainer.clear();
                this.rendered = false;
            }
        });
    }
    set eduopsHasPermission(value) {
        this.required = Array.isArray(value) ? value : [value];
    }
    static ɵfac = function HasPermissionDirective_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HasPermissionDirective)(); };
    static ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: HasPermissionDirective, selectors: [["", "eduopsHasPermission", ""]], inputs: { eduopsHasPermission: "eduopsHasPermission" }, standalone: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HasPermissionDirective, [{
        type: Directive,
        args: [{ selector: '[eduopsHasPermission]', standalone: true }]
    }], () => [], { eduopsHasPermission: [{
            type: Input
        }] }); })();
//# sourceMappingURL=has-permission.directive.js.map