import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import * as i0 from "@angular/core";
import * as i1 from "ng-apexcharts";
const _c0 = [[["", "slot", "actions"]]];
const _c1 = ["[slot=actions]"];
function ChartCardComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.subtitle);
} }
function ChartCardComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "apx-chart", 5);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("series", ctx_r0.apexSeries())("chart", ctx_r0.chartOptions())("xaxis", ctx_r0.xAxisOptions())("yaxis", ctx_r0.yAxisOptions())("colors", ctx_r0.palette)("dataLabels", ctx_r0.dataLabelOptions())("stroke", ctx_r0.strokeOptions())("grid", ctx_r0.gridOptions())("legend", ctx_r0.legendOptions())("tooltip", ctx_r0.tooltipOptions());
} }
function ChartCardComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1, "Aucune donnee pour cette periode.");
    i0.ɵɵelementEnd();
} }
/**
 * Wraps an ApexCharts figure in a card with a consistent header (section 58).
 * The palette comes from the design tokens, never from ApexCharts defaults.
 */
export class ChartCardComponent {
    title;
    subtitle;
    data = null;
    type = 'bar';
    height = 300;
    stacked = false;
    palette = [
        '#1f5fd6', '#16915a', '#d97a16', '#7c5cd6', '#0f9bb3', '#dc3545'
    ];
    apexSeries() {
        return this.data?.series ?? [];
    }
    chartOptions() {
        return {
            type: this.type,
            height: this.height,
            stacked: this.stacked,
            toolbar: { show: false },
            fontFamily: "'Public Sans', sans-serif",
            animations: { enabled: true, speed: 300 }
        };
    }
    /** Axis, grid and legend options, typed so strictTemplates can check them. */
    xAxisOptions() {
        return {
            categories: this.data?.categories ?? [],
            labels: { style: { colors: '#7b8499', fontSize: '12px' } }
        };
    }
    yAxisOptions() {
        return { labels: { style: { colors: '#7b8499', fontSize: '12px' } } };
    }
    dataLabelOptions() {
        return { enabled: false };
    }
    strokeOptions() {
        return { curve: 'smooth', width: this.type === 'line' ? 3 : 0 };
    }
    gridOptions() {
        return { borderColor: '#eef1f6', strokeDashArray: 4 };
    }
    legendOptions() {
        return { position: 'top', horizontalAlign: 'right', fontSize: '13px' };
    }
    tooltipOptions() {
        return { theme: 'light' };
    }
    static ɵfac = function ChartCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ChartCardComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ChartCardComponent, selectors: [["eduops-chart-card"]], inputs: { title: "title", subtitle: "subtitle", data: "data", type: "type", height: "height", stacked: "stacked" }, standalone: true, features: [i0.ɵɵStandaloneFeature], ngContentSelectors: _c1, decls: 10, vars: 3, consts: [[1, "card"], [1, "card__header"], [1, "card__title"], [1, "card__subtitle"], [1, "card__body"], [3, "series", "chart", "xaxis", "yaxis", "colors", "dataLabels", "stroke", "grid", "legend", "tooltip"], [1, "chart-empty"]], template: function ChartCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵelementStart(0, "section", 0)(1, "header", 1)(2, "div")(3, "h3", 2);
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, ChartCardComponent_Conditional_5_Template, 2, 1, "p", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵprojection(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div", 4);
            i0.ɵɵtemplate(8, ChartCardComponent_Conditional_8_Template, 1, 10, "apx-chart", 5)(9, ChartCardComponent_Conditional_9_Template, 2, 0, "p", 6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.subtitle ? 5 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.data && ctx.data.series.length ? 8 : 9);
        } }, dependencies: [CommonModule, NgApexchartsModule, i1.ChartComponent], styles: [".chart-empty[_ngcontent-%COMP%] {\n      text-align: center; color: var(--text-muted);\n      padding: var(--space-10) 0; margin: 0;\n    }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ChartCardComponent, [{
        type: Component,
        args: [{ selector: 'eduops-chart-card', standalone: true, imports: [CommonModule, NgApexchartsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <section class="card">
      <header class="card__header">
        <div>
          <h3 class="card__title">{{ title }}</h3>
          @if (subtitle) { <p class="card__subtitle">{{ subtitle }}</p> }
        </div>
        <ng-content select="[slot=actions]"></ng-content>
      </header>
      <div class="card__body">
        @if (data && data.series.length) {
          <apx-chart
            [series]="apexSeries()"
            [chart]="chartOptions()"
            [xaxis]="xAxisOptions()"
            [yaxis]="yAxisOptions()"
            [colors]="palette"
            [dataLabels]="dataLabelOptions()"
            [stroke]="strokeOptions()"
            [grid]="gridOptions()"
            [legend]="legendOptions()"
            [tooltip]="tooltipOptions()" />
        } @else {
          <p class="chart-empty">Aucune donnee pour cette periode.</p>
        }
      </div>
    </section>
  `, styles: ["\n    .chart-empty {\n      text-align: center; color: var(--text-muted);\n      padding: var(--space-10) 0; margin: 0;\n    }\n  "] }]
    }], null, { title: [{
            type: Input,
            args: [{ required: true }]
        }], subtitle: [{
            type: Input
        }], data: [{
            type: Input
        }], type: [{
            type: Input
        }], height: [{
            type: Input
        }], stacked: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ChartCardComponent, { className: "ChartCardComponent", filePath: "frontend/src/app/shared/ui/chart-card/chart-card.component.ts", lineNumber: 53 }); })();
//# sourceMappingURL=chart-card.component.js.map