import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Shown when a load failed; always offers a retry. */
@Component({
  selector: 'eduops-error-state',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="state" role="alert">
      <div class="state__icon" aria-hidden="true">!</div>
      <p class="state__title">{{ title }}</p>
      <p class="state__message">{{ message }}</p>
      @if (showRetry) {
        <button type="button" class="btn btn--secondary" (click)="retry.emit()">Reessayer</button>
      }
      @if (correlationId) {
        <p class="state__correlation">Reference incident : <code>{{ correlationId }}</code></p>
      }
    </div>
  `,
  styles: [`
    .state__icon {
      width: 56px; height: 56px;
      display: grid; place-items: center;
      font-family: var(--font-display);
      font-size: 26px; font-weight: 700;
      border-radius: 50%;
      background: var(--danger-bg);
      color: var(--danger);
    }
    .state__correlation { font-size: var(--text-xs); color: var(--text-light); }
    code { font-family: ui-monospace, monospace; }
  `]
})
export class ErrorStateComponent {
  @Input() title = 'Une erreur est survenue';
  @Input() message = 'Impossible de charger les données pour le moment.';
  @Input() showRetry = true;
  @Input() correlationId?: string;
  @Output() retry = new EventEmitter<void>();
}
