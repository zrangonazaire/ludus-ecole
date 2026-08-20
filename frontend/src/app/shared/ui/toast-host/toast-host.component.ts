import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '@core/services/notification.service';

/** Renders the toast queue. Mounted once, at the app root. */
@Component({
  selector: 'eduops-toast-host',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="toasts" role="region" aria-live="polite" aria-label="Notifications">
      @for (toast of notifications.toasts(); track toast.id) {
        <div class="toast" [class]="'toast--' + toast.tone" role="status">
          <div class="toast__body">
            @if (toast.title) { <p class="toast__title">{{ toast.title }}</p> }
            <p class="toast__message">{{ toast.message }}</p>
          </div>
          <button type="button" class="toast__close" aria-label="Fermer"
                  (click)="notifications.dismiss(toast.id)">×</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toasts {
      position: fixed;
      top: calc(var(--topbar-height) + var(--space-4));
      right: var(--space-4);
      display: flex; flex-direction: column; gap: var(--space-2);
      z-index: var(--z-toast);
      max-width: min(420px, calc(100vw - 32px));
    }
    .toast {
      display: flex; align-items: flex-start; gap: var(--space-3);
      padding: var(--space-3) var(--space-4);
      background: var(--surface-card);
      border: 1px solid var(--border);
      border-left-width: 4px;
      border-radius: var(--radius-button);
      box-shadow: var(--shadow-md);
      animation: slide-in 180ms ease;
    }
    .toast--success { border-left-color: var(--success); }
    .toast--error   { border-left-color: var(--danger); }
    .toast--warning { border-left-color: var(--warning); }
    .toast--info    { border-left-color: var(--brand); }

    .toast__title { font-weight: 700; margin: 0 0 2px; color: var(--text-strong); }
    .toast__message { margin: 0; font-size: var(--text-base); color: var(--text-normal); }
    .toast__close {
      background: none; border: 0; cursor: pointer;
      font-size: 20px; line-height: 1; color: var(--text-light);
      padding: 0 2px;
    }
    @keyframes slide-in { from { opacity: 0; transform: translateX(16px); } }

    @media (max-width: 767px) {
      .toasts { left: var(--space-3); right: var(--space-3); top: var(--space-3); max-width: none; }
    }
  `]
})
export class ToastHostComponent {
  readonly notifications = inject(NotificationService);
}
