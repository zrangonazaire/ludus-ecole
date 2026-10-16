import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SignupService } from '@core/services/signup.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'eduops-verify-email',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly signupService = inject(SignupService);
  private readonly notifications = inject(NotificationService);

  readonly state = signal<'loading' | 'success' | 'error' | 'missing_token'>('loading');
  readonly errorMessage = signal('');
  readonly emailInput = signal('');
  readonly resending = signal(false);
  readonly resendCooldown = signal(0);
  readonly resendSuccess = signal(false);

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token || !token.trim()) {
      this.state.set('missing_token');
      return;
    }

    this.signupService.verifyEmail(token.trim()).subscribe({
      next: (res) => {
        this.state.set('success');
        this.notifications.success(
          'Votre adresse e-mail a été confirmée avec succès ! Vous pouvez maintenant vous connecter.',
          'Compte activé'
        );
      },
      error: (err) => {
        this.state.set('error');
        const detail = err?.error?.message || 'Ce lien de confirmation est invalide ou a déjà expiré.';
        this.errorMessage.set(detail);
      }
    });
  }

  resend(): void {
    const email = this.emailInput().trim();
    if (!email || this.resending() || this.resendCooldown() > 0) {
      return;
    }

    this.resending.set(true);
    this.resendSuccess.set(false);

    this.signupService.resendVerification(email).subscribe({
      next: () => {
        this.resending.set(false);
        this.resendSuccess.set(true);
        this.notifications.success(
          'Si cette adresse est en attente, un nouveau lien de confirmation vient d\'être envoyé.',
          'Lien envoyé'
        );
        this.resendCooldown.set(60);
        const timer = setInterval(() => {
          this.resendCooldown.update((v) => {
            if (v <= 1) {
              clearInterval(timer);
              return 0;
            }
            return v - 1;
          });
        }, 1000);
      },
      error: () => {
        this.resending.set(false);
      }
    });
  }
}
