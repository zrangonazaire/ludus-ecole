import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';
import * as i0 from "@angular/core";
/**
 * Placeholder for screens whose route and navigation entry exist but whose UI
 * is not built yet. It states the backend endpoint the screen will consume, so
 * the remaining work is explicit rather than hidden behind a blank page.
 */
export class PlaceholderComponent {
    route = inject(ActivatedRoute);
    title = this.route.snapshot.data['title'] ?? 'Module';
    endpoint = this.route.snapshot.data['endpoint'] ?? 'API Soocloo';
    static ɵfac = function PlaceholderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PlaceholderComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PlaceholderComponent, selectors: [["eduops-placeholder"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 9, vars: 2, consts: [[1, "page"], [1, "page__header"], [1, "page__title"], [1, "card"], [1, "card__body"], ["title", "\u00C9cran a implementer", 3, "message"], [1, "hint"]], template: function PlaceholderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "h1", 2);
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "div", 3)(5, "div", 4)(6, "eduops-empty-state", 5)(7, "p", 6);
            i0.ɵɵtext(8, " Le backend expose deja cet endpoint. Le composant Angular reste a construire en suivant le meme patron que le tableau de bord : injection d'un DataSource, \u00E9tats loading / error / empty, aucun appel direct a HttpClient. ");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("message", "Cette page consommera : " + ctx.endpoint);
        } }, dependencies: [CommonModule, EmptyStateComponent], styles: [".hint[_ngcontent-%COMP%] {\n      max-width: 520px;\n      font-size: var(--text-sm);\n      color: var(--text-light);\n      margin-top: var(--space-3);\n    }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PlaceholderComponent, [{
        type: Component,
        args: [{ selector: 'eduops-placeholder', standalone: true, imports: [CommonModule, EmptyStateComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="page">
      <header class="page__header">
        <h1 class="page__title">{{ title }}</h1>
      </header>
      <div class="card">
        <div class="card__body">
          <eduops-empty-state
            title="Écran a implementer"
            [message]="'Cette page consommera : ' + endpoint">
            <p class="hint">
              Le backend expose deja cet endpoint. Le composant Angular reste a construire
              en suivant le meme patron que le tableau de bord : injection d'un DataSource,
              états loading / error / empty, aucun appel direct a HttpClient.
            </p>
          </eduops-empty-state>
        </div>
      </div>
    </div>
  `, styles: ["\n    .hint {\n      max-width: 520px;\n      font-size: var(--text-sm);\n      color: var(--text-light);\n      margin-top: var(--space-3);\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PlaceholderComponent, { className: "PlaceholderComponent", filePath: "frontend/src/app/features/placeholder/placeholder.component.ts", lineNumber: 45 }); })();
//# sourceMappingURL=placeholder.component.js.map