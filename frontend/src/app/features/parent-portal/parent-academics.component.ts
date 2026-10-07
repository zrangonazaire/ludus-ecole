import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentGradesData, StudentReportCard } from '@core/models/student-portal.models';
import { GradePipe } from '@shared/pipes/grade.pipe';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

@Component({
  selector: 'eduops-parent-academics',
  standalone: true,
  imports: [CommonModule, GradePipe, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <div>
        <h1 class="page-head__title">Suivi scolaire & Bulletins</h1>
        <p class="page-head__sub">Notes, moyennes trimestrielles, évaluations et bulletins officiels</p>
      </div>

      <div class="child-switcher">
        <label for="child-select" class="child-switcher__label">Élève :</label>
        <select id="child-select" class="child-switcher__select" (change)="onChildChange($event)">
          <option value="1">Kouassi Emmanuel (3ème A)</option>
          <option value="2">Kouassi Sarah (5ème B)</option>
        </select>
      </div>
    </header>

    <div class="tabs">
      <button class="tab-btn" [class.tab-btn--active]="activeTab() === 'grades'" (click)="activeTab.set('grades')">
        Notes & Évaluations
      </button>
      <button class="tab-btn" [class.tab-btn--active]="activeTab() === 'report-cards'" (click)="activeTab.set('report-cards')">
        Bulletins trimestriels
      </button>
      <button class="tab-btn" [class.tab-btn--active]="activeTab() === 'attendance'" (click)="activeTab.set('attendance')">
        Assiduité & Absences
      </button>
    </div>

    @if (loading()) {
      <eduops-loading-state message="Chargement des données scolaires..." />
    } @else {
      <!-- ONGLETS NOTES -->
      @if (activeTab() === 'grades') {
        <div class="kpi-row">
          <div class="kpi-card">
            <span class="kpi-card__label">Moyenne Générale</span>
            <span class="kpi-card__value kpi-card__value--highlight">{{ 14.8 | grade }}</span>
            <span class="kpi-card__sub">Rang : 4ème / 38 élèves</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-card__label">Moyenne de classe</span>
            <span class="kpi-card__value">{{ 12.3 | grade }}</span>
            <span class="kpi-card__sub">Trimestre 1</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-card__label">Évaluations passées</span>
            <span class="kpi-card__value">14</span>
            <span class="kpi-card__sub">Toutes corrigées et saisies</span>
          </div>
        </div>

        <div class="subjects-list">
          @for (subj of grades()?.bySubject ?? []; track subj.subjectName) {
            <div class="subject-card card">
              <div class="subject-card__header">
                <div>
                  <h3 class="subject-card__title">{{ subj.subjectName }}</h3>
                  <span class="subject-card__meta">{{ subj.count }} évaluation(s) notée(s)</span>
                </div>
                <div class="subject-card__avg">
                  <span class="avg-label">Moyenne</span>
                  <span class="avg-val">{{ subj.average | grade }}</span>
                </div>
              </div>

              <div class="eval-chips">
                @for (rec of grades()?.records ?? []; track rec.id) {
                  @if (rec.subjectName === subj.subjectName) {
                    <div class="eval-chip">
                      <span class="eval-chip__title">{{ rec.assessmentName }}</span>
                      <span class="eval-chip__score">{{ rec.score }} / {{ rec.maxScore }}</span>
                      <span class="eval-chip__date">{{ rec.publishedAt | date:'dd/MM' }}</span>
                    </div>
                  }
                }
              </div>
            </div>
          }
        </div>
      }

      <!-- ONGLETS BULLETINS -->
      @if (activeTab() === 'report-cards') {
        <div class="report-cards-grid">
          @for (rc of reportCards(); track rc.id) {
            <div class="rc-card card">
              <div class="rc-card__header">
                <div>
                  <span class="rc-badge">{{ rc.termName }}</span>
                  <h3 class="rc-card__title">Bulletin officiel de notes</h3>
                  <p class="rc-card__date">Publié le {{ rc.publishedAt | date:'dd MMMM yyyy' }}</p>
                </div>
                <div class="rc-card__grade">
                  <span class="rc-grade-num">{{ rc.generalAverage | grade }}</span>
                  <span class="rc-rank">{{ rc.rankLabel || 'Rang : 4e' }}</span>
                </div>
              </div>

              <div class="rc-card__body">
                <p class="rc-card__appreciation">
                  <strong>Appréciation générale du conseil de classe :</strong>
                  « Félicitations du conseil. Travail sérieux et régulier tout au long de la période. »
                </p>
              </div>

              <div class="rc-card__footer">
                <button class="btn btn--outline" (click)="downloadPdf(rc)">
                  <span class="icon">⤓</span> Télécharger le bulletin officiel (PDF)
                </button>
              </div>
            </div>
          }
        </div>
      }

      <!-- ONGLETS ASSIDUITÉ -->
      @if (activeTab() === 'attendance') {
        <div class="attendance-summary card">
          <div class="att-kpis">
            <div class="att-kpi">
              <span class="att-kpi__num att-kpi__num--green">97.2 %</span>
              <span class="att-kpi__lbl">Taux de présence</span>
            </div>
            <div class="att-kpi">
              <span class="att-kpi__num">2</span>
              <span class="att-kpi__lbl">Absences justifiées</span>
            </div>
            <div class="att-kpi">
              <span class="att-kpi__num att-kpi__num--red">0</span>
              <span class="att-kpi__lbl">Absence injustifiée</span>
            </div>
            <div class="att-kpi">
              <span class="att-kpi__num">1</span>
              <span class="att-kpi__lbl">Retard (10 min)</span>
            </div>
          </div>

          <div class="att-history">
            <h3 class="att-history__title">Historique des incidents récents</h3>
            <table class="att-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Créneau</th>
                  <th>Matière</th>
                  <th>Type</th>
                  <th>Motif / Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>14/09/2026</td>
                  <td>08:00 - 10:00</td>
                  <td>Mathématiques</td>
                  <td><span class="pill pill--warn">Retard (10m)</span></td>
                  <td>Embouteillage • Justifié</td>
                </tr>
                <tr>
                  <td>08/09/2026</td>
                  <td>Journée complète</td>
                  <td>Toutes</td>
                  <td><span class="pill pill--info">Absence</span></td>
                  <td>Certificat médical fourni • Validé</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
    }
  `,
  styles: [`
    .page-head {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-4);
    }
    .page-head__title { font-size: var(--text-2xl); font-family: var(--font-display); margin: 0; color: var(--text-strong); }
    .page-head__sub { margin: var(--space-1) 0 0; color: var(--text-muted); font-size: var(--text-sm); }

    .child-switcher { display: flex; align-items: center; gap: var(--space-2); }
    .child-switcher__label { font-size: var(--text-sm); font-weight: 600; color: var(--text-muted); }
    .child-switcher__select {
      padding: 8px 14px; border-radius: var(--radius-button); border: 1px solid var(--border-medium);
      font-size: var(--text-sm); font-weight: 600; background: var(--surface); color: var(--text-strong);
    }

    .tabs {
      display: flex; gap: var(--space-2); border-bottom: 2px solid var(--border-light);
      margin-bottom: var(--space-6); overflow-x: auto;
    }
    .tab-btn {
      padding: 10px 18px; border: none; background: transparent; font-size: var(--text-sm);
      font-weight: 600; color: var(--text-muted); cursor: pointer; border-bottom: 2px solid transparent;
      margin-bottom: -2px; transition: all 0.2s; white-space: nowrap;
    }
    .tab-btn:hover { color: var(--text-strong); }
    .tab-btn--active {
      color: #1b365d; border-bottom-color: #1b365d; font-weight: 700;
    }

    .kpi-row {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-4); margin-bottom: var(--space-6);
    }
    .kpi-card {
      background: var(--surface); border: 1px solid var(--border-light);
      border-radius: var(--radius-card); padding: var(--space-4);
      display: flex; flex-direction: column; gap: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);
    }
    .kpi-card__label { font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
    .kpi-card__value { font-size: var(--text-2xl); font-family: var(--font-display); font-weight: 800; color: var(--text-strong); }
    .kpi-card__value--highlight { color: #1b365d; }
    .kpi-card__sub { font-size: var(--text-xs); color: var(--text-muted); }

    .subjects-list { display: flex; flex-direction: column; gap: var(--space-4); }
    .subject-card {
      padding: var(--space-4); border: 1px solid var(--border-light);
      border-radius: var(--radius-card); background: var(--surface);
    }
    .subject-card__header {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: var(--space-3);
    }
    .subject-card__title { font-size: var(--text-lg); margin: 0; font-family: var(--font-display); color: var(--text-strong); }
    .subject-card__meta { font-size: var(--text-xs); color: var(--text-muted); }
    .subject-card__avg { text-align: right; }
    .avg-label { display: block; font-size: var(--text-xs); color: var(--text-muted); }
    .avg-val { font-size: var(--text-xl); font-family: var(--font-display); font-weight: 700; color: #1b365d; }

    .eval-chips { display: flex; gap: var(--space-3); flex-wrap: wrap; }
    .eval-chip {
      background: var(--surface-subtle); border: 1px solid var(--border-light);
      border-radius: var(--radius-button); padding: 6px 12px; display: flex; align-items: center; gap: 8px;
    }
    .eval-chip__title { font-size: var(--text-xs); color: var(--text-muted); }
    .eval-chip__score { font-size: var(--text-xs); font-weight: 700; color: var(--text-strong); }
    .eval-chip__date { font-size: 11px; color: var(--text-light); }

    .report-cards-grid { display: flex; flex-direction: column; gap: var(--space-5); }
    .rc-card {
      padding: var(--space-5); border: 1px solid var(--border-light);
      border-radius: var(--radius-card); background: var(--surface);
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }
    .rc-card__header {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: var(--space-4); border-bottom: 1px solid var(--border-light); padding-bottom: var(--space-3);
    }
    .rc-badge {
      background: #eef4fc; color: #1b365d; font-weight: 700; font-size: var(--text-xs);
      padding: 3px 8px; border-radius: 4px; display: inline-block; margin-bottom: 4px;
    }
    .rc-card__title { margin: 0; font-size: var(--text-lg); font-family: var(--font-display); }
    .rc-card__date { margin: 2px 0 0; font-size: var(--text-xs); color: var(--text-muted); }
    .rc-card__grade { text-align: right; }
    .rc-grade-num { display: block; font-size: var(--text-2xl); font-weight: 800; color: #1b365d; font-family: var(--font-display); }
    .rc-rank { font-size: var(--text-xs); color: var(--text-muted); font-weight: 600; }
    .rc-card__body { margin-bottom: var(--space-4); }
    .rc-card__appreciation { font-size: var(--text-sm); color: var(--text-strong); margin: 0; line-height: 1.5; }
    .rc-card__footer { display: flex; justify-content: flex-end; }

    .attendance-summary { padding: var(--space-5); background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius-card); }
    .att-kpis {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: var(--space-4); margin-bottom: var(--space-6); padding-bottom: var(--space-5);
      border-bottom: 1px solid var(--border-light);
    }
    .att-kpi { display: flex; flex-direction: column; align-items: center; text-align: center; }
    .att-kpi__num { font-size: var(--text-2xl); font-weight: 800; font-family: var(--font-display); }
    .att-kpi__num--green { color: #16a34a; }
    .att-kpi__num--red { color: #dc2626; }
    .att-kpi__lbl { font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px; }

    .att-history__title { font-size: var(--text-md); margin: 0 0 var(--space-3); font-family: var(--font-display); }
    .att-table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
    .att-table th { text-align: left; padding: 10px; border-bottom: 1px solid var(--border-medium); color: var(--text-muted); font-size: var(--text-xs); }
    .att-table td { padding: 10px; border-bottom: 1px solid var(--border-light); }

    .pill { font-size: var(--text-xs); font-weight: 700; padding: 2px 8px; border-radius: 4px; }
    .pill--warn { background: #fef3c7; color: #b45309; }
    .pill--info { background: #e0f2fe; color: #0369a1; }

    .btn {
      display: inline-flex; align-items: center; gap: var(--space-2);
      padding: 8px 16px; border-radius: var(--radius-button); font-size: var(--text-sm);
      font-weight: 600; cursor: pointer; text-decoration: none;
    }
    .btn--outline { border: 1px solid var(--border-medium); background: var(--surface); color: var(--text-strong); }
    .btn--outline:hover { background: var(--surface-subtle); }
  `]
})
export class ParentAcademicsComponent implements OnInit {
  private readonly dataSource = inject(STUDENT_PORTAL_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly activeTab = signal<'grades' | 'report-cards' | 'attendance'>('grades');
  readonly grades = signal<StudentGradesData | null>(null);
  readonly reportCards = signal<StudentReportCard[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.dataSource.grades().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (g) => {
        this.grades.set(g);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });

    this.dataSource.reportCards().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (rc) => this.reportCards.set(rc),
      error: () => {}
    });
  }

  onChildChange(event: Event): void {
    // Changement d'enfant (démo dynamique)
  }

  downloadPdf(rc: StudentReportCard): void {
    window.print();
  }
}
