import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { Classroom } from '@core/models/domain.models';
import { AuthService } from '@core/auth/auth.service';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

/**
 * Teacher home.
 *
 * The list of classes is decided by the server from the authenticated account
 * (section 66): a teacher sees only the classes they are assigned to (rule 10).
 */
@Component({
  selector: 'eduops-teacher-home',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="greeting">
      <h1 class="greeting__title">Bonjour, {{ firstName() }}</h1>
      <p class="greeting__meta">{{ today() }}</p>
    </section>

    <section class="quick">
      <a class="quick__action" routerLink="/teacher/attendance">
        <span class="quick__icon" aria-hidden="true">◇</span>
        <span>Faire l'appel</span>
      </a>
      <a class="quick__action" routerLink="/teacher/grades">
        <span class="quick__icon" aria-hidden="true">◉</span>
        <span>Saisir des notes</span>
      </a>
    </section>

    <h2 class="section-title">Mes classes</h2>

    @if (loading()) {
      <eduops-loading-state message="Chargement de vos classes..." />
    } @else {
      <ul class="classes">
        @for (classroom of classes(); track classroom.id) {
          <li class="class card">
            <div class="class__body">
              <p class="class__name">{{ classroom.name }}</p>
              <p class="class__meta numeric">
                {{ classroom.activeEnrollments }} eleves — {{ classroom.levelName }}
              </p>
            </div>
            <eduops-status-badge [status]="classroom.capacityStatus" />
          </li>
        } @empty {
          <li class="empty">Aucune classe ne vous est affectee pour cette annee.</li>
        }
      </ul>
    }
  `,
  styles: [`
    .greeting { margin-bottom: var(--space-5); }
    .greeting__title { font-size: var(--text-xl); margin: 0; }
    .greeting__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); text-transform: capitalize; }

    .quick { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-6); }
    .quick__action {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: var(--space-2); padding: var(--space-5) var(--space-3);
      background: var(--surface-card); border: 1px solid var(--border);
      border-radius: var(--radius-card); text-decoration: none;
      font-weight: 600; color: var(--text-strong); font-size: var(--text-sm);
      min-height: 88px;
    }
    .quick__action:hover { text-decoration: none; border-color: var(--brand); }
    .quick__icon { font-size: 24px; color: var(--brand); }

    .section-title { font-size: var(--text-md); margin-bottom: var(--space-3); }

    .classes { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-3); }
    .class { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4); }
    .class__body { flex: 1; }
    .class__name { margin: 0; font-weight: 600; color: var(--text-strong); }
    .class__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }
    .empty { text-align: center; color: var(--text-muted); padding: var(--space-8) 0; }
  `]
})
export class TeacherHomeComponent implements OnInit {
  private readonly dataSource = inject(TEACHER_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  readonly classes = signal<Classroom[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.dataSource.myClasses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (classes) => {
        this.classes.set(classes);
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
      weekday: 'long', day: 'numeric', month: 'long'
    });
  }
}
