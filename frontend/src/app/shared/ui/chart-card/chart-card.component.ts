import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexLegend,
  ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule
} from 'ng-apexcharts';
import { ChartData } from '@core/models/domain.models';

/**
 * Wraps an ApexCharts figure in a card with a consistent header (section 58).
 * The palette comes from the design tokens, never from ApexCharts defaults.
 */
@Component({
  selector: 'eduops-chart-card',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
  `,
  styles: [`
    .chart-empty {
      text-align: center; color: var(--text-muted);
      padding: var(--space-10) 0; margin: 0;
    }
  `]
})
export class ChartCardComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
  @Input() data: ChartData | null = null;
  @Input() type: 'bar' | 'line' | 'area' = 'bar';
  @Input() height = 300;
  @Input() stacked = false;

  readonly palette = [
    '#1f5fd6', '#16915a', '#d97a16', '#7c5cd6', '#0f9bb3', '#dc3545'
  ];

  apexSeries(): ApexAxisChartSeries {
    return this.data?.series ?? [];
  }

  chartOptions(): ApexChart {
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
  xAxisOptions(): ApexXAxis {
    return {
      categories: this.data?.categories ?? [],
      labels: { style: { colors: '#7b8499', fontSize: '12px' } }
    };
  }

  yAxisOptions(): ApexYAxis {
    return { labels: { style: { colors: '#7b8499', fontSize: '12px' } } };
  }

  dataLabelOptions(): ApexDataLabels {
    return { enabled: false };
  }

  strokeOptions(): ApexStroke {
    return { curve: 'smooth', width: this.type === 'line' ? 3 : 0 };
  }

  gridOptions(): ApexGrid {
    return { borderColor: '#eef1f6', strokeDashArray: 4 };
  }

  legendOptions(): ApexLegend {
    return { position: 'top', horizontalAlign: 'right', fontSize: '13px' };
  }

  tooltipOptions(): ApexTooltip {
    return { theme: 'light' };
  }
}
