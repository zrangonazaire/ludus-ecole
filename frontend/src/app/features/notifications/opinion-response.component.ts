import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnnouncementService } from '@core/services/announcement.service';
import { OpinionRequest } from '@core/models/announcement.models';

@Component({
  selector: 'eduops-opinion-response',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="opinion-page">
      <section class="opinion-card">
        <div class="opinion-brand" aria-hidden="true">✉</div>
        @if (request(); as data) {
          <p class="opinion-school">{{ data.schoolName }}</p>
          <h1>{{ data.campaignTitle }}</h1>
          @if (data.answered || sent()) {
            <div class="opinion-success"><strong>Merci pour votre réponse.</strong><span>Votre avis a bien été transmis à l’établissement.</span></div>
          } @else {
            <p class="opinion-question">{{ data.question }}</p>
            <label for="opinion-answer">Votre réponse</label>
            <textarea id="opinion-answer" rows="7" maxlength="3000" [value]="answer()"
                      (input)="answer.set($any($event.target).value)"
                      placeholder="Écrivez votre réponse ici…"></textarea>
            <small class="opinion-muted">{{ answer().length }} / 3000 caractères · Lien valable jusqu’au {{ data.expiresAt | date:'dd/MM/yyyy' }}</small>
            @if (error()) { <p class="opinion-error" role="alert">{{ error() }}</p> }
            <button type="button" [disabled]="sending() || !answer().trim()" (click)="submit()">
              {{ sending() ? 'Envoi…' : 'Envoyer ma réponse' }}
            </button>
            <p class="opinion-privacy">Votre réponse est transmise à l’établissement et associée au responsable destinataire de cet avis.</p>
          }
        } @else if (loading()) {
          <p class="opinion-muted">Ouverture de votre demande…</p>
        } @else {
          <h1>Lien indisponible</h1><p>{{ error() }}</p>
        }
      </section>
    </main>
  `,
  styles: [`
    :host { display:block; min-height:100vh; background:#f4f7fb; color:#172033; }
    .opinion-page { min-height:100vh; display:grid; place-items:center; padding:1.25rem; }
    .opinion-card { width:min(100%, 620px); padding:clamp(1.25rem,4vw,2.25rem); background:#fff; border:1px solid #e2e8f0; border-radius:18px; box-shadow:0 14px 45px #17203312; }
    .opinion-brand { width:42px; height:42px; display:grid; place-items:center; margin-bottom:1rem; color:#fff; background:#245cda; border-radius:12px; font-size:1.2rem; }
    h1 { margin:.2rem 0 .85rem; font-size:clamp(1.4rem,4vw,1.9rem); }
    .opinion-school { margin:0; color:#245cda; font-size:.8rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; }
    .opinion-question { margin:0 0 1rem; padding:.85rem; background:#f7f9fc; border-radius:10px; line-height:1.5; }
    label { display:block; margin-bottom:.4rem; font-size:.9rem; font-weight:650; }
    textarea { width:100%; box-sizing:border-box; padding:.8rem; border:1px solid #cbd5e1; border-radius:9px; color:#172033; font:inherit; resize:vertical; }
    textarea:focus { outline:3px solid #245cda26; border-color:#245cda; }
    button { width:100%; margin-top:.9rem; padding:.78rem 1rem; border:0; border-radius:9px; color:#fff; background:#245cda; font:inherit; font-weight:700; cursor:pointer; }
    button:disabled { opacity:.55; cursor:not-allowed; }
    .opinion-muted, .opinion-privacy { color:#64748b; font-size:.78rem; line-height:1.45; }
    .opinion-privacy { margin-bottom:0; }
    .opinion-error { color:#9f1239; font-size:.85rem; }
    .opinion-success { display:flex; flex-direction:column; gap:.3rem; padding:1rem; color:#166534; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; }
  `]
})
export class OpinionResponseComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(AnnouncementService);
  private readonly destroyRef = inject(DestroyRef);
  private token = '';
  readonly request = signal<OpinionRequest | null>(null);
  readonly answer = signal('');
  readonly loading = signal(true);
  readonly sending = signal(false);
  readonly sent = signal(false);
  readonly error = signal('');

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    this.service.opinionRequest(this.token).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (request) => { this.request.set(request); this.loading.set(false); },
      error: () => { this.error.set('Ce lien est invalide ou a expiré. Demandez un nouvel avis à votre établissement.'); this.loading.set(false); }
    });
  }

  submit(): void {
    if (!this.answer().trim() || this.sending()) return;
    this.sending.set(true);
    this.error.set('');
    this.service.submitOpinion(this.token, this.answer()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.sending.set(false); this.sent.set(true); },
      error: (error) => {
        this.sending.set(false);
        this.error.set(error?.error?.message ?? 'La réponse n’a pas pu être enregistrée. Réessayez ou contactez l’établissement.');
      }
    });
  }
}
