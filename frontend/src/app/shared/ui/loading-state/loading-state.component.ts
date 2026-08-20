import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Accessible loading indicator. */
@Component({
  selector: 'eduops-loading-state',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="state" role="status" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <p class="state__message">{{ message }}</p>
    </div>
  `
})
export class LoadingStateComponent {
  @Input() message = 'Chargement en cours...';
}
