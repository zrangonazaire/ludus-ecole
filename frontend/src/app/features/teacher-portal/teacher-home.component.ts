import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { Classroom } from '@core/models/domain.models';
import { AuthService } from '@core/auth/auth.service';
import { HomeworkService } from '@core/services/homework.service';
import { NotificationService } from '@core/services/notification.service';
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
  imports: [CommonModule, FormsModule, RouterLink, StatusBadgeComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="greeting">
      <h1 class="greeting__title">Bonjour, {{ firstName() }}</h1>
      <p class="greeting__meta">{{ today() }}</p>
    </section>

    <section class="quick">
      <a class="quick__action" routerLink="/teacher/attendance">
        <span class="quick__icon" aria-hidden="true">✓</span>
        <span>Faire l'appel</span>
      </a>
      <a class="quick__action" routerLink="/teacher/grades">
        <span class="quick__icon" aria-hidden="true">◉</span>
        <span>Saisir des notes</span>
      </a>
      <button type="button" class="quick__action quick__action--btn" (click)="homeworkFormOpen.set(!homeworkFormOpen())">
        <span class="quick__icon" aria-hidden="true">✎</span>
        <span>Donner un devoir</span>
      </button>
    </section>

    @if (homeworkFormOpen()) {
      <section class="hw-form card" aria-label="Publier un devoir">
        <h2 class="hw-form__title">Nouveau devoir / Cahier de textes</h2>
        <div class="hw-form__grid">
          <label class="field">
            <span class="field__label">Classe</span>
            <input class="input" [(ngModel)]="hwClassroom" placeholder="Ex. 3ème A" />
          </label>
          <label class="field">
            <span class="field__label">Matière</span>
            <input class="input" [(ngModel)]="hwSubject" placeholder="Ex. Mathématiques" />
          </label>
          <label class="field">
            <span class="field__label">À rendre pour le</span>
            <input class="input" type="date" [(ngModel)]="hwDueDate" />
          </label>
        </div>
        <label class="field" style="margin-top: 10px;">
          <span class="field__label">Titre ou chapitre</span>
          <input class="input" [(ngModel)]="hwTitle" placeholder="Ex. Exercices n° 4 et 5 page 42" />
        </label>
        <label class="field" style="margin-top: 10px;">
          <span class="field__label">Consignes pour les élèves et parents</span>
          <textarea class="textarea" rows="2" [(ngModel)]="hwDescription"
                    placeholder="Détaillez le travail à faire à la maison..."></textarea>
        </label>
        <div class="hw-form__actions">
          <button type="button" class="btn btn--secondary btn--sm" (click)="homeworkFormOpen.set(false)">Annuler</button>
          <button type="button" class="btn btn--primary btn--sm"
                  [disabled]="!hwTitle.trim() || !hwDescription.trim()"
                  (click)="publishHomework()">
            Publier aux élèves & parents
          </button>
        </div>
      </section>
    }

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
                {{ classroom.activeEnrollments }} élèves — {{ classroom.levelName }}
              </p>
            </div>
            <eduops-status-badge [status]="classroom.capacityStatus" />
          </li>
        } @empty {
          <li class="empty">Aucune classe ne vous est affectée pour cette année.</li>
        }
      </ul>
    }

    <div class="hw-head">
      <h2 class="section-title" style="margin: 0">Cahier de textes & Devoirs publiés</h2>
      <button type="button" class="btn btn--ghost btn--sm" (click)="homeworkFormOpen.set(true)">+ Ajouter</button>
    </div>

    <ul class="hw-list">
      @for (item of homework.items(); track item.id) {
        <li class="hw-card card">
          <div class="hw-card__top">
            <span class="badge badge--info">{{ item.classroomName }} · {{ item.subjectName }}</span>
            <span class="hw-card__due numeric">Pour le {{ item.dueDate | date:'dd/MM/yyyy' }}</span>
          </div>
          <p class="hw-card__title">{{ item.title }}</p>
          <p class="hw-card__desc">{{ item.description }}</p>
        </li>
      }
    </ul>
  `,
  styles: [`
    .greeting { margin-bottom: var(--space-5); }
    .greeting__title { font-size: var(--text-xl); margin: 0; }
    .greeting__meta { margin: 2px 0 0; font-size: var(--text-sm); color: var(--text-muted); text-transform: capitalize; }

    .quick { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); margin-bottom: var(--space-6); }
    .quick__action {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: var(--space-2); padding: var(--space-4) var(--space-2);
      background: var(--surface-card); border: 1px solid var(--border);
      border-radius: var(--radius-card); text-decoration: none;
      font-weight: 600; color: var(--text-strong); font-size: var(--text-sm);
      min-height: 84px; cursor: pointer; font-family: inherit;
    }
    .quick__action:hover { text-decoration: none; border-color: var(--brand); }
    .quick__icon { font-size: 22px; color: var(--brand); }

    .hw-form { padding: var(--space-4); margin-bottom: var(--space-5); border: 1px solid var(--brand-tint-border); }
    .hw-form__title { margin: 0 0 var(--space-3); font-size: var(--text-md); }
    .hw-form__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: var(--space-3); }
    .hw-form__actions { display: flex; justify-content: flex-end; gap: var(--space-2); margin-top: var(--space-3); }

    .section-title { font-size: var(--text-md); margin-bottom: var(--space-3); }

    .classes { list-style: none; margin: 0 0 var(--space-6); padding: 0; display: grid; gap: var(--space-3); }
    .class { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-4); }
    .class__body { flex: 1; }
    .class__name { margin: 0; font-weight: 600; color: var(--text-strong); }
    .class__meta { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }
    .empty { text-align: center; color: var(--text-muted); padding: var(--space-6) 0; }

    .hw-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-3); }
    .hw-list { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-3); }
    .hw-card { padding: var(--space-4); }
    .hw-card__top { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
    .hw-card__due { font-size: var(--text-xs); font-weight: 600; color: var(--warning); }
    .hw-card__title { margin: 0; font-weight: 700; color: var(--text-strong); font-size: var(--text-sm); }
    .hw-card__desc { margin: 4px 0 0; font-size: var(--text-xs); color: var(--text-muted); line-height: 1.5; }
  `]
})
export class TeacherHomeComponent implements OnInit {
  private readonly dataSource = inject(TEACHER_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);
  readonly homework = inject(HomeworkService);

  readonly classes = signal<Classroom[]>([]);
  readonly loading = signal(true);
  readonly homeworkFormOpen = signal(false);

  hwClassroom = '3ème A';
  hwSubject = 'Mathématiques';
  hwTitle = '';
  hwDescription = '';
  hwDueDate = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  ngOnInit(): void {
    this.dataSource.myClasses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (classes) => {
        this.classes.set(classes);
        if (classes[0]?.name) this.hwClassroom = classes[0].name;
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  publishHomework(): void {
    if (!this.hwTitle.trim() || !this.hwDescription.trim()) return;
    this.homework.add({
      classroomName: this.hwClassroom,
      subjectName: this.hwSubject,
      title: this.hwTitle,
      description: this.hwDescription,
      dueDate: this.hwDueDate,
      teacherName: this.auth.currentUser()?.fullName || 'Enseignant'
    });
    this.hwTitle = '';
    this.hwDescription = '';
    this.homeworkFormOpen.set(false);
    this.notifications.success('Devoir publié dans le cahier de textes des élèves et des parents.');
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
