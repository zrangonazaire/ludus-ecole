import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiValue } from '@core/models/domain.models';

/**
 * Dashboard KPI tile (section 57).
 *
 * Displays a value produced by the backend. It performs no computation of its
 * own: `formatted` arrives ready to print so the tile and the report always
 * agree.
 */
@Component({
  selector: 'eduops-kpi-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article [class]="'kpi kpi--' + (kpi.tone ?? 'neutral') + (clickable ? ' kpi--clickable' : '')">
      <header class="kpi__head">
        <span class="kpi__label">{{ kpi.label }}</span>
        @if (kpi.live) {
          <span class="badge badge--info badge--live" aria-label="Donnée temps réel">LIVE</span>
        } @else if (clickable) {
          <span class="kpi__arrow" aria-hidden="true">→</span>
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
  `,
  styles: [`
    .kpi {
      position: relative;
      overflow: hidden;
      background: var(--surface-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--space-5);
      box-shadow: var(--shadow-xs);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: var(--space-2);
      min-height: 120px;
      transition: box-shadow var(--transition-base), transform var(--transition-base), border-color var(--transition-base);
    }
    .kpi::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--brand);
      opacity: 0.7;
    }
    .kpi--success::before { background: var(--success); }
    .kpi--warning::before { background: var(--warning); }
    .kpi--danger::before  { background: var(--danger); }

    .kpi--clickable { cursor: pointer; }
    .kpi--clickable:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--brand-tint-border);
      transform: translateY(-2px);
    }
    .kpi--clickable:hover .kpi__arrow {
      transform: translateX(3px);
      color: var(--brand);
    }

    .kpi__head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }
    .kpi__label {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--text-muted);
      letter-spacing: 0.01em;
    }
    .kpi__arrow {
      font-size: var(--text-sm);
      color: var(--text-light);
      transition: transform var(--transition-fast), color var(--transition-fast);
    }

    .kpi__value {
      font-family: var(--font-display);
      font-size: var(--text-3xl);
      font-weight: 700;
      letter-spacing: -0.025em;
      line-height: 1.1;
      color: var(--text-strong);
      margin: 0;
    }
    .kpi__value--success { color: var(--success); }
    .kpi__value--warning { color: var(--warning); }
    .kpi__value--danger  { color: var(--danger); }

    .kpi__suffix { font-size: var(--text-lg); color: var(--text-muted); margin-left: 2px; }

    .kpi__delta {
      display: flex;
      align-items: center;
      gap: var(--space-1);
      font-size: var(--text-sm);
      font-weight: 600;
      margin: 0;
    }
    .kpi__delta--up { color: var(--success); }
    .kpi__delta--down { color: var(--danger); }
    .kpi__delta--flat { color: var(--text-muted); }
    .kpi__delta-label { color: var(--text-muted); font-weight: 400; }

    @media (max-width: 767px) {
      .kpi { padding: var(--space-4); min-height: 96px; }
      .kpi__value { font-size: var(--text-2xl); }
    }
  `]
})
export class KpiCardComponent {
  @Input({ required: true }) kpi!: KpiValue;
  @Input() clickable = false;
}
