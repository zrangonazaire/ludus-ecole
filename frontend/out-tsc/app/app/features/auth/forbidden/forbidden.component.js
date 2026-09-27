import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import * as i0 from "@angular/core";
export class ForbiddenComponent {
    router = inject(Router);
    auth = inject(AuthService);
    goHome() {
        void this.router.navigateByUrl(this.auth.homeRoute());
    }
    static ɵfac = function ForbiddenComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ForbiddenComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ForbiddenComponent, selectors: [["eduops-forbidden"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 9, vars: 0, consts: [[1, "forbidden"], [1, "forbidden__code"], [1, "forbidden__title"], [1, "forbidden__message"], ["type", "button", 1, "btn", "btn--primary", 3, "click"]], template: function ForbiddenComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "p", 1);
            i0.ɵɵtext(2, "403");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "h1", 2);
            i0.ɵɵtext(4, "Acces refuse");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, " Votre profil ne dispose pas des droits necessaires pour consulter cette page. Si vous pensez qu'il s'agit d'une erreur, contactez l'administration de l'\u00E9tablissement. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "button", 4);
            i0.ɵɵlistener("click", function ForbiddenComponent_Template_button_click_7_listener() { return ctx.goHome(); });
            i0.ɵɵtext(8, "Retour a l'accueil");
            i0.ɵɵelementEnd()();
        } }, dependencies: [CommonModule], styles: [".forbidden[_ngcontent-%COMP%] {\n      min-height: 100vh;\n      display: flex; flex-direction: column;\n      align-items: center; justify-content: center;\n      gap: var(--space-3); text-align: center; padding: var(--space-6);\n    }\n    .forbidden__code[_ngcontent-%COMP%] {\n      font-family: var(--font-display);\n      font-size: 72px; font-weight: 800;\n      color: var(--brand-tint-border); margin: 0;\n    }\n    .forbidden__title[_ngcontent-%COMP%] { font-size: var(--text-2xl); }\n    .forbidden__message[_ngcontent-%COMP%] { max-width: 460px; color: var(--text-muted); }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ForbiddenComponent, [{
        type: Component,
        args: [{ selector: 'eduops-forbidden', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="forbidden">
      <p class="forbidden__code">403</p>
      <h1 class="forbidden__title">Acces refuse</h1>
      <p class="forbidden__message">
        Votre profil ne dispose pas des droits necessaires pour consulter cette page.
        Si vous pensez qu'il s'agit d'une erreur, contactez l'administration de l'établissement.
      </p>
      <button type="button" class="btn btn--primary" (click)="goHome()">Retour a l'accueil</button>
    </div>
  `, styles: ["\n    .forbidden {\n      min-height: 100vh;\n      display: flex; flex-direction: column;\n      align-items: center; justify-content: center;\n      gap: var(--space-3); text-align: center; padding: var(--space-6);\n    }\n    .forbidden__code {\n      font-family: var(--font-display);\n      font-size: 72px; font-weight: 800;\n      color: var(--brand-tint-border); margin: 0;\n    }\n    .forbidden__title { font-size: var(--text-2xl); }\n    .forbidden__message { max-width: 460px; color: var(--text-muted); }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ForbiddenComponent, { className: "ForbiddenComponent", filePath: "frontend/src/app/features/auth/forbidden/forbidden.component.ts", lineNumber: 38 }); })();
//# sourceMappingURL=forbidden.component.js.map