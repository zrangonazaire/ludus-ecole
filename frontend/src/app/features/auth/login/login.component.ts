import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { environment } from '@env/environment';

import { SignupService } from '@core/services/signup.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'eduops-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly signupService = inject(SignupService);
  private readonly notifications = inject(NotificationService);

  readonly submitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly unverifiedEmail = signal<string | null>(null);
  readonly resending = signal(false);
  readonly resendCooldown = signal(0);

  /**
   * Le mot de passe est-il lisible à l'écran ?
   *
   * <p>Masqué par défaut, et il le redevient dès la soumission : laisser un
   * mot de passe en clair sur un poste partagé — le bureau d'une école en est
   * un — est le risque que ce bouton introduit, et le remettre à couvert au
   * moment où l'on cesse de le taper coûte peu.</p>
   */
  readonly passwordVisible = signal(false);
  readonly demoMode = environment.useMockData;
  readonly schoolName = environment.schoolName;

  readonly form = this.fb.nonNullable.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.errorMessage.set(null);
    this.unverifiedEmail.set(null);
    this.passwordVisible.set(false);

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        void this.router.navigateByUrl(returnUrl ?? this.auth.homeRoute());
      },
      error: (error: HttpErrorResponse) => {
        this.submitting.set(false);
        this.errorMessage.set(this.explain(error));
      }
    });
  }

  togglePassword(): void {
    this.passwordVisible.update((visible) => !visible);
  }

  /**
   * Pourquoi la connexion a échoué.
   *
   * <p>Cet écran répondait « Identifiant ou mot de passe incorrect » à tout,
   * y compris à un compte verrouillé, à un compte désactivé et à un serveur
   * éteint. Le serveur distingue pourtant ces cas avec soin. Quelqu'un dont
   * le compte est bloqué après cinq essais retapait son mot de passe une
   * sixième fois, ce qui prolongeait le blocage — le message le poussait
   * exactement vers ce qu'il ne fallait pas faire.</p>
   */
  private explain(error: HttpErrorResponse): string {
    const failure = error?.error as { code?: string; message?: string } | undefined;

    switch (failure?.code) {
      case 'ACCOUNT_LOCKED':
        return failure.message?.trim()
          || 'Ce compte est temporairement verrouillé après plusieurs échecs. '
            + 'Patientez quelques minutes avant de réessayer, ou contactez '
            + 'la direction de votre établissement.';
      case 'ACCOUNT_DISABLED':
        return 'Ce compte est désactivé. Contactez la direction de votre '
          + 'établissement pour le réactiver.';
      case 'EMAIL_NOT_VERIFIED':
        this.unverifiedEmail.set(this.form.controls.login.value.trim());
        return failure.message?.trim()
          || 'Votre adresse e-mail n\'a pas encore été confirmée. Veuillez cliquer sur le lien reçu par e-mail.';
      case 'INVALID_CREDENTIALS':
        return 'Identifiant ou mot de passe incorrect.';
      default:
        break;
    }

    if (error?.status === 0) {
      return 'Le serveur est injoignable. Vérifiez votre connexion, '
        + 'puis réessayez.';
    }
    if (error?.status === 404) {
      return 'Le service de connexion est introuvable sur ce serveur. '
        + 'Il est peut-être arrêté ou en cours de redémarrage.';
    }
    // Un corps qui n'est pas notre enveloppe JSON vient d'un intermédiaire,
    // pas de l'API : le proxy de développement quand rien n'écoute derrière.
    // Accuser le serveur d'une panne interne enverrait lire des journaux
    // qu'aucun serveur n'a écrits.
    if (typeof error?.error === 'string'
        && /ECONNREFUSED|ECONNRESET|socket hang up|proxy/i.test(error.error)) {
      return 'Le serveur ne répond pas : rien n’écoute à l’adresse appelée. '
        + 'Vérifiez qu’il est démarré, et sur le port attendu.';
    }
    if (error?.status >= 500) {
      return 'Le serveur a rencontré une erreur pendant la connexion. '
        + 'Réessayez dans un instant ; si cela persiste, signalez-le.';
    }
    // Un 401 sans enveloppe reste, de loin, un mot de passe erroné.
    return 'Identifiant ou mot de passe incorrect.';
  }

  resendVerification(): void {
    const email = this.unverifiedEmail();
    if (!email || this.resending() || this.resendCooldown() > 0) {
      return;
    }
    this.resending.set(true);
    this.signupService.resendVerification(email).subscribe({
      next: () => {
        this.resending.set(false);
        this.notifications.success('Un nouveau lien de confirmation a été envoyé par e-mail.', 'E-mail envoyé');
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
      error: () => this.resending.set(false)
    });
  }

  /** One-click demo profiles, available only while mock data is on. */
  useDemoProfile(login: string): void {
    this.form.patchValue({ login, password: 'demo1234' });
    this.submit();
  }
}
