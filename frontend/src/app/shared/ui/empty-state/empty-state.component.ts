import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Shown when a list legitimately has nothing to display. */
@Component({
  selector: 'eduops-empty-state',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="state" role="status">
      <div class="state__icon" aria-hidden="true">{{ icon }}</div>
      <p class="state__title">{{ title }}</p>
      @if (message) { <p class="state__message">{{ message }}</p> }
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .state__icon {
      width: 56px; height: 56px;
      display: grid; place-items: center;
      font-size: 26px;
      border-radius: 50%;
      background: var(--surface-sunken);
      color: var(--text-light);
    }
  `]
})
export class EmptyStateComponent {
  @Input() title = 'Aucun résultat';
  @Input() message?: string;
  @Input() icon = '—';
}
