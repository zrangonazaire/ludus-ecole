import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function KpiCardComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 3);
    i0.ɵɵtext(1, "LIVE");
    i0.ɵɵelementEnd();
} }
function KpiCardComponent_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.kpi.suffix);
} }
function KpiCardComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8)(1, "span", 9);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 10);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 11);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap("kpi__delta--" + ((tmp_1_0 = ctx_r0.kpi.trend) !== null && tmp_1_0 !== undefined ? tmp_1_0 : "flat"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.kpi.trend === "down" ? "\u25BE" : ctx_r0.kpi.trend === "up" ? "\u25B4" : "\u2013");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r0.kpi.delta > 0 ? "+" : "", "", ctx_r0.kpi.delta, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.kpi.deltaLabel);
} }
/**
 * Dashboard KPI tile (section 57).
 *
 * Displays a value produced by the backend. It performs no computation of its
 * own: `formatted` arrives ready to print so the tile and the report always
 * agree.
 */
export class KpiCardComponent {
    kpi;
    clickable = false;
    static ɵfac = function KpiCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KpiCardComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KpiCardComponent, selectors: [["eduops-kpi-card"]], inputs: { kpi: "kpi", clickable: "clickable" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 9, vars: 9, consts: [[1, "kpi"], [1, "kpi__head"], [1, "kpi__label"], ["aria-label", "Donn\u00E9e temps reel", 1, "badge", "badge--info", "badge--live"], [1, "kpi__value", "numeric"], ["class", "kpi__suffix", 4, "ngIf"], [1, "kpi__delta", 3, "class"], [1, "kpi__suffix"], [1, "kpi__delta"], ["aria-hidden", "true"], [1, "numeric"], [1, "kpi__delta-label"]], template: function KpiCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "article", 0)(1, "header", 1)(2, "span", 2);
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(4, KpiCardComponent_Conditional_4_Template, 2, 0, "span", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 4);
            i0.ɵɵtext(6);
            i0.ɵɵtemplate(7, KpiCardComponent_span_7_Template, 2, 1, "span", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, KpiCardComponent_Conditional_8_Template, 7, 6, "p", 6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_3_0;
            i0.ɵɵclassProp("kpi--clickable", ctx.clickable);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.kpi.label);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.kpi.live ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵclassMap("kpi__value--" + ((tmp_3_0 = ctx.kpi.tone) !== null && tmp_3_0 !== undefined ? tmp_3_0 : "neutral"));
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.kpi.formatted, "");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.kpi.suffix);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.kpi.delta !== undefined && ctx.kpi.delta !== null ? 8 : -1);
        } }, dependencies: [CommonModule, i1.NgIf], styles: [".kpi[_ngcontent-%COMP%] {\n      background: var(--surface-card);\n      border: 1px solid var(--border);\n      border-radius: var(--radius-card);\n      padding: var(--space-5);\n      box-shadow: var(--shadow-xs);\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-2);\n      min-height: 116px;\n      transition: box-shadow var(--transition-base), transform var(--transition-base);\n    }\n    .kpi--clickable[_ngcontent-%COMP%] { cursor: pointer; }\n    .kpi--clickable[_ngcontent-%COMP%]:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); }\n\n    .kpi__head[_ngcontent-%COMP%] { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }\n    .kpi__label[_ngcontent-%COMP%] {\n      font-size: var(--text-sm);\n      font-weight: 600;\n      color: var(--text-muted);\n      letter-spacing: 0.01em;\n    }\n\n    .kpi__value[_ngcontent-%COMP%] {\n      font-family: var(--font-display);\n      font-size: var(--text-3xl);\n      font-weight: 700;\n      letter-spacing: -0.02em;\n      line-height: 1.1;\n      color: var(--text-strong);\n      margin: 0;\n    }\n    .kpi__value--success[_ngcontent-%COMP%] { color: var(--success); }\n    .kpi__value--warning[_ngcontent-%COMP%] { color: var(--warning); }\n    .kpi__value--danger[_ngcontent-%COMP%]  { color: var(--danger); }\n\n    .kpi__suffix[_ngcontent-%COMP%] { font-size: var(--text-lg); color: var(--text-muted); margin-left: 2px; }\n\n    .kpi__delta[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: var(--space-1);\n      font-size: var(--text-sm);\n      font-weight: 600;\n      margin: 0;\n    }\n    .kpi__delta--up[_ngcontent-%COMP%] { color: var(--success); }\n    .kpi__delta--down[_ngcontent-%COMP%] { color: var(--danger); }\n    .kpi__delta--flat[_ngcontent-%COMP%] { color: var(--text-muted); }\n    .kpi__delta-label[_ngcontent-%COMP%] { color: var(--text-muted); font-weight: 400; }\n\n    @media (max-width: 767px) {\n      .kpi[_ngcontent-%COMP%] { padding: var(--space-4); min-height: 96px; }\n      .kpi__value[_ngcontent-%COMP%] { font-size: var(--text-2xl); }\n    }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KpiCardComponent, [{
        type: Component,
        args: [{ selector: 'eduops-kpi-card', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <article class="kpi" [class.kpi--clickable]="clickable">
      <header class="kpi__head">
        <span class="kpi__label">{{ kpi.label }}</span>
        @if (kpi.live) {
          <span class="badge badge--info badge--live" aria-label="Donnée temps reel">LIVE</span>
        }
      </header>

      <p class="kpi__value numeric" [class]="'kpi__value--' + (kpi.tone ?? 'neutral')">
        {{ kpi.formatted }}<span class="kpi__suffix" *ngIf="kpi.suffix">{{ kpi.suffix }}</span>
      </p>

      @if (kpi.delta !== undefined && kpi.delta !== null) {
        <p class="kpi__delta" [class]="'kpi__delta--' + (kpi.trend ?? 'flat')">
          <span aria-hidden="true">{{ kpi.trend === 'down' ? '▾' : kpi.trend === 'up' ? '▴' : '–' }}</span>
          <span class="numeric">{{ kpi.delta > 0 ? '+' : '' }}{{ kpi.delta }}</span>
          <span class="kpi__delta-label">{{ kpi.deltaLabel }}</span>
        </p>
      }
    </article>
  `, styles: ["\n    .kpi {\n      background: var(--surface-card);\n      border: 1px solid var(--border);\n      border-radius: var(--radius-card);\n      padding: var(--space-5);\n      box-shadow: var(--shadow-xs);\n      display: flex;\n      flex-direction: column;\n      gap: var(--space-2);\n      min-height: 116px;\n      transition: box-shadow var(--transition-base), transform var(--transition-base);\n    }\n    .kpi--clickable { cursor: pointer; }\n    .kpi--clickable:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); }\n\n    .kpi__head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }\n    .kpi__label {\n      font-size: var(--text-sm);\n      font-weight: 600;\n      color: var(--text-muted);\n      letter-spacing: 0.01em;\n    }\n\n    .kpi__value {\n      font-family: var(--font-display);\n      font-size: var(--text-3xl);\n      font-weight: 700;\n      letter-spacing: -0.02em;\n      line-height: 1.1;\n      color: var(--text-strong);\n      margin: 0;\n    }\n    .kpi__value--success { color: var(--success); }\n    .kpi__value--warning { color: var(--warning); }\n    .kpi__value--danger  { color: var(--danger); }\n\n    .kpi__suffix { font-size: var(--text-lg); color: var(--text-muted); margin-left: 2px; }\n\n    .kpi__delta {\n      display: flex;\n      align-items: center;\n      gap: var(--space-1);\n      font-size: var(--text-sm);\n      font-weight: 600;\n      margin: 0;\n    }\n    .kpi__delta--up { color: var(--success); }\n    .kpi__delta--down { color: var(--danger); }\n    .kpi__delta--flat { color: var(--text-muted); }\n    .kpi__delta-label { color: var(--text-muted); font-weight: 400; }\n\n    @media (max-width: 767px) {\n      .kpi { padding: var(--space-4); min-height: 96px; }\n      .kpi__value { font-size: var(--text-2xl); }\n    }\n  "] }]
    }], null, { kpi: [{
            type: Input,
            args: [{ required: true }]
        }], clickable: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KpiCardComponent, { className: "KpiCardComponent", filePath: "frontend/src/app/shared/ui/kpi-card/kpi-card.component.ts", lineNumber: 97 }); })();
//# sourceMappingURL=kpi-card.component.js.map