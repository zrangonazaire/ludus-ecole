import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';

/**
 * Structural directive hiding UI the account cannot use:
 * `<button *eduopsHasPermission="'PAYMENT_CREATE'">`.
 *
 * This is presentation only. The backend independently rejects the call, so
 * hiding a button never becomes the security control (rule 4).
 */
@Directive({ selector: '[eduopsHasPermission]', standalone: true })
export class HasPermissionDirective {
  private readonly auth = inject(AuthService);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  private required: string[] = [];
  private rendered = false;

  constructor() {
    effect(() => {
      // re-evaluates whenever the session's permissions change
      const allowed = this.required.length === 0 || this.auth.hasAny(...this.required);
      if (allowed && !this.rendered) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.rendered = true;
      } else if (!allowed && this.rendered) {
        this.viewContainer.clear();
        this.rendered = false;
      }
    });
  }

  @Input() set eduopsHasPermission(value: string | string[]) {
    this.required = Array.isArray(value) ? value : [value];
  }
}
