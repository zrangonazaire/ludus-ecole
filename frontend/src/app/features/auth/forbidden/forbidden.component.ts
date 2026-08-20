import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'eduops-forbidden',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="forbidden">
      <p class="forbidden__code">403</p>
      <h1 class="forbidden__title">Acces refuse</h1>
      <p class="forbidden__message">
        Votre profil ne dispose pas des droits necessaires pour consulter cette page.
        Si vous pensez qu'il s'agit d'une erreur, contactez l'administration de l'etablissement.
      </p>
      <button type="button" class="btn btn--primary" (click)="goHome()">Retour a l'accueil</button>
    </div>
  `,
  styles: [`
    .forbidden {
      min-height: 100vh;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: var(--space-3); text-align: center; padding: var(--space-6);
    }
    .forbidden__code {
      font-family: var(--font-display);
      font-size: 72px; font-weight: 800;
      color: var(--brand-tint-border); margin: 0;
    }
    .forbidden__title { font-size: var(--text-2xl); }
    .forbidden__message { max-width: 460px; color: var(--text-muted); }
  `]
})
export class ForbiddenComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  goHome(): void {
    void this.router.navigateByUrl(this.auth.homeRoute());
  }
}
