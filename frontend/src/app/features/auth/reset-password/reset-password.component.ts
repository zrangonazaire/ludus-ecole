import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PasswordResetService } from '@core/services/password-reset.service';

@Component({
  selector: 'eduops-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly passwordReset = inject(PasswordResetService);
  readonly token = this.route.snapshot.queryParamMap.get('token')?.trim() ?? '';

  readonly mode = signal<'request' | 'sent' | 'reset' | 'completed'>(
    this.token ? 'reset' : 'request');
  readonly submitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly passwordVisible = signal(false);

  readonly requestForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]]
  });

  readonly resetForm = this.fb.nonNullable.group({
    newPassword: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(128)]],
    confirmation: ['', [Validators.required, Validators.maxLength(128)]]
  });

  submitRequest(): void {
    if (this.requestForm.invalid || this.submitting()) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);
    this.passwordReset.request(this.requestForm.controls.email.value.trim()).subscribe({
      next: () => {
        this.submitting.set(false);
        this.requestForm.reset();
        this.mode.set('sent');
      },
      error: () => {
        this.submitting.set(false);
        this.errorMessage.set('La demande n’a pas pu être traitée. Réessayez dans un instant.');
      }
    });
  }

  submitReset(): void {
    if (this.resetForm.invalid || this.submitting()) {
      this.resetForm.markAllAsTouched();
      return;
    }

    const { newPassword, confirmation } = this.resetForm.getRawValue();
    if (newPassword !== confirmation) {
      this.errorMessage.set('Les deux mots de passe ne correspondent pas.');
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);
    this.passwordReset.confirm(this.token, newPassword).subscribe({
      next: () => {
        this.submitting.set(false);
        this.resetForm.reset();
        this.passwordVisible.set(false);
        this.mode.set('completed');
      },
      error: (error) => {
        this.submitting.set(false);
        this.errorMessage.set(error?.error?.message
          || 'Ce lien est invalide ou a expiré. Demandez un nouveau lien de réinitialisation.');
      }
    });
  }
}
