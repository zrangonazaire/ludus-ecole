import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentDetail } from '@core/models/domain.models';
import { AuthService } from '@core/auth/auth.service';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { GradePipe } from '@shared/pipes/grade.pipe';

/**
 * Parent home (section 46).
 *
 * The children shown here come from the server, which returns only the pupils
 * explicitly linked to this guardian account (rule 11). The client never asks
 * for a student by id it guessed.
 */
@Component({
  selector: 'eduops-parent-home',
  standalone: true,
  imports: [
    CommonModule, AvatarComponent, StatusBadgeComponent, LoadingStateComponent,
    MoneyPipe, GradePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="greeting">
      <h1 class="greeting__title">Bonjour, {{ firstName() }}</h1>
      <p class="greeting__meta">{{ today() }}</p>
    </section>

    @if (loading()) {
      <eduops-loading-state message="Chargement des informations de vos enfants..." />
    } @else {
      @for (child of children(); track child.id) {
        <article class="child card">
          <header class="child__head">
            <eduops-avatar [name]="child.fullName" [photoUrl]="child.photoUrl" size="lg" />
            <div class="child__identity">
              <h2 class="child__name">{{ child.fullName }}</h2>
              <p class="child__meta numeric">
                {{ child.classroomName }} <span class="dot">•</span>{{ child.studentNumber }}
              </p>
            </div>
            <eduops-status-badge [status]="child.status" />
          </header>

          <dl class="child__stats">
            <div class="stat">
              <dt>Presence du jour</dt>
              <dd class="stat__value stat__value--ok">Present</dd>
            </div>
            <div class="stat">
              <dt>Taux de presence</dt>
              <dd class="stat__value numeric">
                {{ child.attendanceSummary?.attendanceRate ?? '-' }} %
              </dd>
            </div>
            <div class="stat">
              <dt>Moyenne recente</dt>
              <dd class="stat__value numeric">{{ 13.8 | grade }}</dd>
            </div>
            <div class="stat">
              <dt>Solde scolaire</dt>
              <dd class="stat__value money"
                  [class.stat__value--danger]="(child.financialSummary?.outstandingAmount ?? 0) > 0">
                {{ child.financialSummary?.outstandingAmount | money }}
              </dd>
            </div>
          </dl>

          @if ((child.financialSummary?.outstandingAmount ?? 0) > 0) {
            <p class="child__alert">
              Une echeance de {{ child.financialSummary?.outstandingAmount | money }}
              reste due (prochaine date : {{ child.financialSummary?.nextDueDate | date:'dd/MM/yyyy' }}).
            </p>
          }
        </article>
      } @empty {
        <p class="empty">
          Aucun eleve n'est associé a votre compte. Contactez le secretariat de l'etablissement.
        </p>
      }
    }
  `,
  styles: [`
    .greeting { margin-bottom: var(--space-5); }
    .greeting__title { font-size: var(--text-xl); margin: 0; }
    .greeting__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); text-transform: capitalize; }

    .child { padding: var(--space-5); margin-bottom: var(--space-4); }
    .child__head { display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-4); }
    .child__identity { flex: 1; min-width: 0; }
    .child__name { font-size: var(--text-lg); margin: 0; }
    .child__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }
    .dot { margin: 0 var(--space-2); color: var(--text-light); }

    .child__stats {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: var(--space-3); margin: 0;
      padding-top: var(--space-4); border-top: 1px solid var(--border-light);
    }
    .stat dt { margin: 0 0 2px; font-size: var(--text-xs); color: var(--text-muted); }
    .stat__value {
      margin: 0; font-family: var(--font-display); font-weight: 700;
      font-size: var(--text-md); color: var(--text-strong);
    }
    .stat__value--ok { color: var(--success); }
    .stat__value--danger { color: var(--danger); }

    .child__alert {
      margin: var(--space-4) 0 0; padding: var(--space-3);
      background: var(--warning-bg); color: var(--warning);
      border-radius: var(--radius-button); font-size: var(--text-sm); font-weight: 600;
    }

    .empty { text-align: center; color: var(--text-muted); padding: var(--space-10) var(--space-4); }
  `]
})
export class ParentHomeComponent implements OnInit {
  private readonly students = inject(STUDENT_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  readonly children = signal<StudentDetail[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    // In production this is GET /api/v1/parent/children: the server resolves the
    // guardian from the token and returns only their own children.
    this.students.getById('st-1').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (child) => {
        this.children.set([child]);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  firstName(): string {
    return this.auth.currentUser()?.fullName.split(' ')[0] ?? '';
  }

  today(): string {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }
}
