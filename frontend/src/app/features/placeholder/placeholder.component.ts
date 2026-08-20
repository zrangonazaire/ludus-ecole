import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';

/**
 * Placeholder for screens whose route and navigation entry exist but whose UI
 * is not built yet. It states the backend endpoint the screen will consume, so
 * the remaining work is explicit rather than hidden behind a blank page.
 */
@Component({
  selector: 'eduops-placeholder',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <header class="page__header">
        <h1 class="page__title">{{ title }}</h1>
      </header>
      <div class="card">
        <div class="card__body">
          <eduops-empty-state
            title="Ecran a implementer"
            [message]="'Cette page consommera : ' + endpoint">
            <p class="hint">
              Le backend expose deja cet endpoint. Le composant Angular reste a construire
              en suivant le meme patron que le tableau de bord : injection d'un DataSource,
              etats loading / error / empty, aucun appel direct a HttpClient.
            </p>
          </eduops-empty-state>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hint {
      max-width: 520px;
      font-size: var(--text-sm);
      color: var(--text-light);
      margin-top: var(--space-3);
    }
  `]
})
export class PlaceholderComponent {
  private readonly route = inject(ActivatedRoute);

  readonly title = (this.route.snapshot.data['title'] as string) ?? 'Module';
  readonly endpoint = (this.route.snapshot.data['endpoint'] as string) ?? 'API EduOps';
}
