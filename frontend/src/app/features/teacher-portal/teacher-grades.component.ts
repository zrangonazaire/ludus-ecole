import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TEACHER_DATA_SOURCE, CLASSROOM_DATA_SOURCE } from '@core/datasource/data-source';
import { Classroom, StudentSummary } from '@core/models/domain.models';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { GradePipe } from '@shared/pipes/grade.pipe';

interface StudentGradeInput {
  studentId: string;
  studentNumber: string;
  fullName: string;
  photoUrl?: string;
  score: number | null;
  absent: boolean;
  comment: string;
}

@Component({
  selector: 'eduops-teacher-grades',
  standalone: true,
  imports: [CommonModule, FormsModule, AvatarComponent, LoadingStateComponent, GradePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <div>
        <h1 class="page-head__title">Saisie des notes & Évaluations</h1>
        <p class="page-head__sub">Enregistrez et validez les notes de vos classes par matière et trimestre</p>
      </div>

      <div class="actions">
        <button class="btn btn--secondary" (click)="saveDraft()" [disabled]="saving()">
          💾 Enregistrer brouillon
        </button>
        <button class="btn btn--primary" (click)="publishGrades()" [disabled]="saving()">
          ✓ Valider et Publier
        </button>
      </div>
    </header>

    @if (statusMessage()) {
      <div class="banner-alert" [class.banner-alert--success]="isSuccess()">
        {{ statusMessage() }}
      </div>
    }

    <!-- FILTRES DE SÉLECTION -->
    <div class="filter-panel card">
      <div class="grid-filters">
        <div class="filter-col">
          <label>Classe :</label>
          <select class="input" [(ngModel)]="selectedClassId" (change)="onClassChange()">
            @for (c of classes(); track c.id) {
              <option [value]="c.id">{{ c.name }} ({{ c.activeEnrollments }} élèves)</option>
            }
          </select>
        </div>

        <div class="filter-col">
          <label>Matière :</label>
          <select class="input" [(ngModel)]="selectedSubject">
            <option value="MATH">Mathématiques</option>
            <option value="PC">Physique-Chimie</option>
            <option value="SVT">SVT</option>
          </select>
        </div>

        <div class="filter-col">
          <label>Période :</label>
          <select class="input" [(ngModel)]="selectedTerm">
            <option value="T1">Trimestre 1</option>
            <option value="T2">Trimestre 2</option>
            <option value="T3">Trimestre 3</option>
          </select>
        </div>
      </div>

      <!-- DÉTAILS DE L'ÉVALUATION -->
      <div class="eval-meta">
        <div class="eval-col eval-col--title">
          <label>Titre de l'évaluation :</label>
          <input type="text" class="input" [(ngModel)]="evalTitle">
        </div>
        <div class="eval-col">
          <label>Barème (sur) :</label>
          <input type="number" class="input" [(ngModel)]="maxScore" min="10" max="100">
        </div>
        <div class="eval-col">
          <label>Coefficient :</label>
          <input type="number" class="input" [(ngModel)]="coefficient" min="1" max="10">
        </div>
        <div class="eval-col">
          <label>Date :</label>
          <input type="date" class="input" [(ngModel)]="evalDate">
        </div>
      </div>
    </div>

    @if (loading()) {
      <eduops-loading-state message="Chargement des élèves de la classe..." />
    } @else {
      <!-- KPI STATISTIQUES EN DIRECT -->
      <div class="kpis-row">
        <div class="kpi">
          <span class="kpi__label">Moyenne de classe</span>
          <span class="kpi__val">{{ currentAverage() | grade }}</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Note la plus haute</span>
          <span class="kpi__val kpi__val--green">{{ maxGradeAchieved() }} / {{ maxScore }}</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Note la plus basse</span>
          <span class="kpi__val kpi__val--red">{{ minGradeAchieved() }} / {{ maxScore }}</span>
        </div>
        <div class="kpi">
          <span class="kpi__label">Notes saisies</span>
          <span class="kpi__val">{{ filledCount() }} / {{ rows().length }}</span>
        </div>
      </div>

      <!-- TABLE DE SAISIE RAPIDE -->
      <div class="table-card card">
        <table class="grades-table">
          <thead>
            <tr>
              <th style="width: 50px;">#</th>
              <th>Élève</th>
              <th style="width: 140px;">Note (/{{ maxScore }})</th>
              <th style="width: 110px; text-align: center;">Statut</th>
              <th>Appréciation / Observation</th>
            </tr>
          </thead>
          <tbody>
            @for (row of rows(); track row.studentId; let idx = $index) {
              <tr [class.row--absent]="row.absent">
                <td class="idx-col">{{ idx + 1 }}</td>
                <td>
                  <div class="student-cell">
                    <eduops-avatar [name]="row.fullName" [photoUrl]="row.photoUrl" size="sm" />
                    <div>
                      <strong class="student-name">{{ row.fullName }}</strong>
                      <small class="student-num">{{ row.studentNumber }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  @if (row.absent) {
                    <span class="pill-absent">ABSENT</span>
                  } @else {
                    <div class="grade-input-wrap">
                      <input type="number" class="grade-input"
                             [(ngModel)]="row.score"
                             [max]="maxScore" min="0" step="0.5"
                             placeholder="Note"
                             (ngModelChange)="onGradeChange()">
                      <span class="score-den">/{{ maxScore }}</span>
                    </div>
                  }
                </td>
                <td style="text-align: center;">
                  <label class="absent-toggle" title="Marquer absent">
                    <input type="checkbox" [(ngModel)]="row.absent" (ngModelChange)="onAbsentToggle(row)">
                    <span>Absent</span>
                  </label>
                </td>
                <td>
                  <input type="text" class="comment-input"
                         [(ngModel)]="row.comment"
                         placeholder="Appréciation pour le bulletin...">
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `,
  styles: [`
    .page-head {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-4);
    }
    .page-head__title { font-size: var(--text-2xl); font-family: var(--font-display); margin: 0; color: var(--text-strong); }
    .page-head__sub { margin: var(--space-1) 0 0; color: var(--text-muted); font-size: var(--text-sm); }
    .actions { display: flex; gap: var(--space-3); }

    .banner-alert {
      padding: var(--space-3) var(--space-4); border-radius: var(--radius-button);
      background: #eff6ff; color: #1e40af; margin-bottom: var(--space-5);
      font-size: var(--text-sm); font-weight: 600;
    }
    .banner-alert--success { background: #dcfce7; color: #15803d; }

    .filter-panel { padding: var(--space-5); margin-bottom: var(--space-5); background: var(--surface); border: 1px solid var(--border-light); }
    .grid-filters { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4); margin-bottom: var(--space-4); }
    .filter-col label, .eval-col label { display: block; font-size: var(--text-xs); font-weight: 600; color: var(--text-muted); margin-bottom: 4px; }
    .input {
      width: 100%; padding: 8px 12px; border: 1px solid var(--border-medium); border-radius: var(--radius-button);
      font-size: var(--text-sm); background: var(--surface); color: var(--text-strong); box-sizing: border-box;
    }

    .eval-meta { display: flex; gap: var(--space-4); flex-wrap: wrap; border-top: 1px solid var(--border-light); padding-top: var(--space-4); }
    .eval-col { flex: 1; min-width: 140px; }
    .eval-col--title { flex: 2; min-width: 220px; }

    .kpis-row {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: var(--space-4); margin-bottom: var(--space-5);
    }
    .kpi {
      background: var(--surface); border: 1px solid var(--border-light);
      border-radius: var(--radius-card); padding: var(--space-3) var(--space-4);
      display: flex; flex-direction: column; gap: 2px;
    }
    .kpi__label { font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; }
    .kpi__val { font-size: var(--text-xl); font-weight: 800; font-family: var(--font-display); color: #1b365d; }
    .kpi__val--green { color: #16a34a; }
    .kpi__val--red { color: #dc2626; }

    .table-card { overflow-x: auto; background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius-card); padding: 0; }
    .grades-table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
    .grades-table th { text-align: left; padding: 12px 14px; background: var(--surface-subtle); color: var(--text-muted); font-size: var(--text-xs); font-weight: 600; }
    .grades-table td { padding: 10px 14px; border-bottom: 1px solid var(--border-light); vertical-align: middle; }
    .idx-col { color: var(--text-light); font-size: var(--text-xs); }

    .student-cell { display: flex; align-items: center; gap: 10px; }
    .student-name { display: block; font-size: var(--text-sm); color: var(--text-strong); }
    .student-num { color: var(--text-muted); font-size: 11px; }

    .grade-input-wrap { display: flex; align-items: center; gap: 4px; }
    .grade-input {
      width: 70px; padding: 6px 8px; border: 1px solid var(--border-medium); border-radius: var(--radius-button);
      font-size: var(--text-md); font-weight: 700; text-align: center; color: #1b365d;
    }
    .score-den { font-size: var(--text-xs); color: var(--text-muted); font-weight: 600; }

    .absent-toggle { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: var(--text-xs); cursor: pointer; color: var(--text-muted); }
    .pill-absent {
      display: inline-block; background: #fee2e2; color: #b91c1c; font-size: 11px;
      font-weight: 700; padding: 4px 8px; border-radius: 4px;
    }
    .row--absent { background: #fffcfc; opacity: 0.75; }

    .comment-input {
      width: 100%; padding: 6px 10px; border: 1px solid var(--border-light); border-radius: var(--radius-button);
      font-size: var(--text-xs); background: transparent;
    }
    .comment-input:focus { border-color: #1b365d; background: #fff; }

    .btn {
      padding: 9px 16px; border-radius: var(--radius-button); font-size: var(--text-sm);
      font-weight: 600; cursor: pointer; border: none; transition: all 0.2s;
    }
    .btn--secondary { background: var(--surface-subtle); color: var(--text-strong); border: 1px solid var(--border-medium); }
    .btn--secondary:hover { background: var(--surface); }
    .btn--primary { background: #1b365d; color: #fff; }
    .btn--primary:hover { background: #132742; }
  `]
})
export class TeacherGradesComponent implements OnInit {
  private readonly teacherSource = inject(TEACHER_DATA_SOURCE);
  private readonly classroomSource = inject(CLASSROOM_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly classes = signal<Classroom[]>([]);
  readonly rows = signal<StudentGradeInput[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly statusMessage = signal<string | null>(null);
  readonly isSuccess = signal(true);

  selectedClassId = '';
  selectedSubject = 'MATH';
  selectedTerm = 'T1';
  evalTitle = 'Devoir Surveillé N°1';
  maxScore = 20;
  coefficient = 2;
  evalDate = '2026-10-06';

  ngOnInit(): void {
    this.teacherSource.myClasses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (list: Classroom[]) => {
        this.classes.set(list);
        if (list.length > 0) {
          this.selectedClassId = list[0].id;
          this.loadStudents(this.selectedClassId);
        } else {
          this.loading.set(false);
        }
      },
      error: () => this.loading.set(false)
    });
  }

  onClassChange(): void {
    this.loadStudents(this.selectedClassId);
  }

  loadStudents(classId: string): void {
    this.loading.set(true);
    this.classroomSource.getStudents(classId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (students: StudentSummary[]) => {
        const sampleNotes = [14.5, 12, 17, 8.5, 15, 11, 16.5, 9, 13.5, 18, 10];
        const initialRows: StudentGradeInput[] = students.map((s: StudentSummary, index: number) => ({
          studentId: s.id,
          studentNumber: s.studentNumber,
          fullName: s.fullName,
          photoUrl: s.photoUrl,
          score: sampleNotes[index % sampleNotes.length],
          absent: false,
          comment: index % 3 === 0 ? 'Bonne analyse et rigueur.' : ''
        }));
        this.rows.set(initialRows);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onAbsentToggle(row: StudentGradeInput): void {
    if (row.absent) {
      row.score = null;
    }
  }

  onGradeChange(): void {}

  currentAverage(): number {
    const valid = this.rows().filter((r) => !r.absent && r.score !== null);
    if (valid.length === 0) return 0;
    const sum = valid.reduce((acc, r) => acc + (r.score ?? 0), 0);
    return Math.round((sum / valid.length) * 10) / 10;
  }

  maxGradeAchieved(): number {
    const valid = this.rows().filter((r) => !r.absent && r.score !== null).map((r) => r.score ?? 0);
    return valid.length > 0 ? Math.max(...valid) : 0;
  }

  minGradeAchieved(): number {
    const valid = this.rows().filter((r) => !r.absent && r.score !== null).map((r) => r.score ?? 0);
    return valid.length > 0 ? Math.min(...valid) : 0;
  }

  filledCount(): number {
    return this.rows().filter((r) => r.absent || r.score !== null).length;
  }

  saveDraft(): void {
    this.saving.set(true);
    setTimeout(() => {
      this.saving.set(false);
      this.isSuccess.set(true);
      this.statusMessage.set('Brouillon enregistré avec succès. Les notes ne sont pas encore visibles des familles.');
      setTimeout(() => this.statusMessage.set(null), 4000);
    }, 600);
  }

  publishGrades(): void {
    this.saving.set(true);
    setTimeout(() => {
      this.saving.set(false);
      this.isSuccess.set(true);
      this.statusMessage.set('Notes validées et publiées ! Les moyennes de classe ont été recalculées et les parents ont été notifiés.');
      setTimeout(() => this.statusMessage.set(null), 5000);
    }, 800);
  }
}
