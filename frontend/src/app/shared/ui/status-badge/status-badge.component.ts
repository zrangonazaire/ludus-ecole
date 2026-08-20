import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeTone } from '@core/models/common.models';
import { StatusLabelPipe } from '@shared/pipes/status-label.pipe';

/**
 * Colour-coded status chip.
 *
 * The tone is derived from the backend status value in one place, so the same
 * status always looks the same wherever it appears.
 */
@Component({
  selector: 'eduops-status-badge',
  standalone: true,
  imports: [CommonModule, StatusLabelPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge" [class]="'badge--' + tone()" [class.badge--pill]="pill">
      {{ status | statusLabel }}
    </span>
  `
})
export class StatusBadgeComponent {
  @Input({ required: true }) set status(value: string) {
    this._status.set(value);
  }
  get status(): string {
    return this._status();
  }

  @Input() pill = false;
  @Input() toneOverride?: BadgeTone;

  private readonly _status = signal('');

  readonly tone = computed<BadgeTone>(() => this.toneOverride ?? toneFor(this._status()));
}

/** Single mapping from a backend status to a visual tone. */
export function toneFor(status: string): BadgeTone {
  switch (status) {
    case 'ACTIVE':
    case 'VALIDATED':
    case 'PUBLISHED':
    case 'PAID':
    case 'PRESENT':
    case 'AVAILABLE':
    case 'GRADUATED':
    case 'PASS':
    case 'PROMOTED':
      return 'success';

    case 'WARNING':
    case 'PENDING':
    case 'SUBMITTED':
    case 'PARTIALLY_PAID':
    case 'DUE':
    case 'LATE':
    case 'EXCUSED_LATE':
    case 'SUSPENDED':
    case 'GRADING':
    case 'ORIENTATION_REQUIRED':
      return 'warning';

    case 'FULL':
    case 'OVER_CAPACITY':
    case 'OVERDUE':
    case 'ABSENT':
    case 'CANCELLED':
    case 'REJECTED':
    case 'FAILED':
    case 'CRITICAL':
    case 'REPEAT':
      return 'danger';

    case 'PLANNED':
    case 'OPEN':
    case 'ADMITTED':
    case 'INFO':
      return 'info';

    default:
      return 'neutral';
  }
}
