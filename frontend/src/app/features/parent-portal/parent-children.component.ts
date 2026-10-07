import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentDetail } from '@core/models/domain.models';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { GradePipe } from '@shared/pipes/grade.pipe';

@Component({
  selector: 'eduops-parent-children',
  standalone: true,
  imports: [
    CommonModule, RouterLink, AvatarComponent, StatusBadgeComponent,
    LoadingStateComponent, MoneyPipe, GradePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <div>
        <h1 class="page-head__title">Mes enfants scolarisés</h1>
        <p class="page-head__sub">Suivez le parcours scolaire, l'assiduité et la classe de vos enfants</p>
      </div>
      <div class="page-head__badge">
        <span class="count-pill">{{ children().length }} {{ children().length > 1 ? 'enfants' : 'enfant' }}</span>
      </div>
    </header>

    @if (loading()) {
      <eduops-loading-state message="Chargement des fiches enfants..." />
    } @else {
      @for (child of children(); track child.id) {
        <article class="child-card card">
          <div class="child-card__banner"></div>
          <div class="child-card__content">
            <div class="child-card__header">
              <eduops-avatar [name]="child.fullName" [photoUrl]="child.photoUrl" size="lg" />
              <div class="child-card__id">
                <div class="child-card__row">
                  <h2 class="child-card__name">{{ child.fullName }}</h2>
                  <eduops-status-badge [status]="child.status" />
                </div>
                <p class="child-card__meta">
                  <span class="tag tag--class">{{ child.classroomName }}</span>
                  <span class="dot">•</span>
                  Matricule : <strong>{{ child.studentNumber }}</strong>
                  <span class="dot">•</span>
                  Né(e) le {{ child.birthDate | date:'dd/MM/yyyy' }}
                </p>
              </div>
            </div>

            <div class="child-card__grid">
              <div class="info-block">
                <span class="info-block__label">Professeur Principal</span>
                <span class="info-block__val">M. KOUASSI Jean-Paul</span>
              </div>
              <div class="info-block">
                <span class="info-block__label">Assiduité (période en cours)</span>
                <span class="info-block__val val--success">
                  {{ child.attendanceSummary?.attendanceRate ?? 96.5 }} % de présence
                </span>
              </div>
              <div class="info-block">
                <span class="info-block__label">Moyenne générale</span>
                <span class="info-block__val val--primary">{{ 14.2 | grade }}</span>
              </div>
              <div class="info-block">
                <span class="info-block__label">Situation financière</span>
                <span class="info-block__val" [class.val--danger]="(child.financialSummary?.outstandingAmount ?? 0) > 0">
                  {{ (child.financialSummary?.outstandingAmount ?? 0) === 0 ? 'À jour' : (child.financialSummary?.outstandingAmount | money) + ' restant' }}
                </span>
              </div>
            </div>

            <div class="child-card__actions">
              <a class="btn btn--outline" routerLink="/parent/academics">
                <span class="icon">◉</span> Notes & Bulletins
              </a>
              <a class="btn btn--outline" routerLink="/parent/payments">
                <span class="icon">◧</span> Situation financière
              </a>
              <a class="btn btn--primary" routerLink="/parent/home">
                <span class="icon">▤</span> Tableau de bord
              </a>
            </div>
          </div>
        </article>
      } @empty {
        <div class="empty-box card">
          <p class="empty-box__text">Aucun enfant n'est actuellement rattaché à votre compte tuteur.</p>
          <p class="empty-box__help">Si vos enfants sont inscrits dans l'établissement, veuillez contacter le secrétariat pour lier vos fiches d'accès.</p>
        </div>
      }
    }
  `,
  styles: [`
    .page-head {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-3);
    }
    .page-head__title { font-size: var(--text-2xl); font-family: var(--font-display); margin: 0; color: var(--text-strong); }
    .page-head__sub { margin: var(--space-1) 0 0; color: var(--text-muted); font-size: var(--text-sm); }
    .count-pill {
      background: var(--surface-subtle); color: var(--text-muted); font-weight: 600;
      font-size: var(--text-xs); padding: 4px 12px; border-radius: 999px; border: 1px solid var(--border-light);
    }

    .child-card {
      position: relative; margin-bottom: var(--space-6); overflow: hidden;
      border: 1px solid var(--border-light); border-radius: var(--radius-card);
      box-shadow: 0 2px 8px rgba(0,0,0,0.04); background: var(--surface);
    }
    .child-card__banner {
      height: 8px; background: linear-gradient(90deg, #1b365d 0%, #c59b27 100%);
    }
    .child-card__content { padding: var(--space-5); }
    .child-card__header {
      display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-5);
      flex-wrap: wrap;
    }
    .child-card__id { flex: 1; min-width: 200px; }
    .child-card__row { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; }
    .child-card__name { font-size: var(--text-xl); margin: 0; font-family: var(--font-display); color: var(--text-strong); }
    .child-card__meta { margin: 4px 0 0; font-size: var(--text-xs); color: var(--text-muted); display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
    .tag--class {
      background: #eef4fc; color: #1b365d; font-weight: 700; padding: 2px 8px;
      border-radius: 4px; font-size: var(--text-xs);
    }
    .dot { margin: 0 4px; color: var(--border-medium); }

    .child-card__grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-4); padding: var(--space-4); background: var(--surface-subtle);
      border-radius: var(--radius-button); margin-bottom: var(--space-5);
    }
    .info-block { display: flex; flex-direction: column; gap: 2px; }
    .info-block__label { font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
    .info-block__val { font-weight: 600; font-size: var(--text-sm); color: var(--text-strong); }
    .val--success { color: #16a34a; }
    .val--primary { color: #1b365d; font-family: var(--font-display); font-size: var(--text-base); }
    .val--danger { color: #dc2626; font-weight: 700; }

    .child-card__actions {
      display: flex; gap: var(--space-3); flex-wrap: wrap; justify-content: flex-end;
    }
    .btn {
      display: inline-flex; align-items: center; gap: var(--space-2);
      padding: 8px 16px; border-radius: var(--radius-button); font-size: var(--text-sm);
      font-weight: 600; text-decoration: none; cursor: pointer; transition: all 0.15s ease;
    }
    .btn--outline {
      border: 1px solid var(--border-medium); color: var(--text-strong); background: var(--surface);
    }
    .btn--outline:hover { background: var(--surface-subtle); border-color: var(--text-muted); }
    .btn--primary {
      background: #1b365d; color: #fff; border: 1px solid #1b365d;
    }
    .btn--primary:hover { background: #132742; }

    .empty-box {
      padding: var(--space-10) var(--space-6); text-align: center;
      background: var(--surface-subtle); border-radius: var(--radius-card);
    }
    .empty-box__text { font-size: var(--text-lg); font-weight: 600; margin: 0 0 var(--space-2); color: var(--text-strong); }
    .empty-box__help { font-size: var(--text-sm); color: var(--text-muted); margin: 0; }
  `]
})
export class ParentChildrenComponent implements OnInit {
  private readonly students = inject(STUDENT_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly children = signal<StudentDetail[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.students.getById('st-1').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (child) => {
        // Démo : on présente 2 enfants pour montrer la gestion multi-enfants d'une famille
        const secondChild: StudentDetail = {
          ...child,
          id: 'st-2',
          studentNumber: 'ELE-2025-0042',
          firstName: 'Sarah',
          lastName: 'Kouassi',
          fullName: 'Sarah Kouassi',
          birthDate: '2012-05-18',
          classroomName: '5ème B',
          financialSummary: {
            studentId: 'st-2',
            academicYearId: 'ay-2025-2026',
            totalGross: 450000,
            totalDiscount: 0,
            totalDue: 450000,
            totalPaid: 450000,
            outstandingAmount: 0,
            overdueCount: 0,
            currency: 'XOF',
            globalStatus: 'PAID'
          }
        };
        this.children.set([child, secondChild]);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
