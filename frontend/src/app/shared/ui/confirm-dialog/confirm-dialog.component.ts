import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Confirmation modal.
 *
 * When `requireReason` is set the action stays disabled until a justification
 * is typed - used for every operation the backend audits (cancelling a payment,
 * exceeding a class capacity, correcting a published grade).
 */
@Component({
  selector: 'eduops-confirm-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open) {
      <div class="backdrop" (click)="cancel.emit()"></div>
      <div class="dialog" role="dialog" aria-modal="true" [attr.aria-label]="title">
        <h2 class="dialog__title">{{ title }}</h2>
        <p class="dialog__message">{{ message }}</p>

        @if (requireReason) {
          <div class="field">
            <label class="field__label field__label--required" for="confirm-reason">
              {{ reasonLabel }}
            </label>
            <textarea id="confirm-reason" class="textarea" [(ngModel)]="reason"
                      [placeholder]="reasonPlaceholder" rows="3"></textarea>
            <span class="field__hint">Cette justification sera conservee dans le journal d'audit.</span>
          </div>
        }

        <div class="dialog__actions">
          <button type="button" class="btn btn--secondary" (click)="cancel.emit()">Annuler</button>
          <button type="button" [class]="'btn btn--' + (danger ? 'danger' : 'primary')"
                  [disabled]="requireReason && reason.trim().length < 5"
                  (click)="confirm.emit(reason)">
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    .backdrop {
      position: fixed; inset: 0;
      background: rgba(27, 36, 53, 0.45);
      z-index: var(--z-modal-backdrop);
    }
    .dialog {
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: min(480px, calc(100vw - 32px));
      background: var(--surface-card);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-lg);
      padding: var(--space-6);
      z-index: var(--z-modal);
    }
    .dialog__title { font-family: var(--font-display); font-size: var(--text-lg); margin-bottom: var(--space-3); }
    .dialog__message { color: var(--text-normal); margin-bottom: var(--space-4); }
    .dialog__actions { display: flex; justify-content: flex-end; gap: var(--space-3); margin-top: var(--space-5); }
  `]
})
export class ConfirmDialogComponent {
  @Input() open = false;
  @Input() title = 'Confirmer';
  @Input() message = 'Cette action est definitive.';
  @Input() confirmLabel = 'Confirmer';
  @Input() danger = false;
  @Input() requireReason = false;
  @Input() reasonLabel = 'Justification';
  @Input() reasonPlaceholder = 'Expliquez la raison de cette operation';

  @Output() confirm = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  reason = '';
}
