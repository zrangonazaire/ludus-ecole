import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CLASSROOM_DATA_SOURCE } from '@core/datasource/data-source';
import { Classroom, StudentSummary } from '@core/models/domain.models';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';

interface PedagogicalChoice {
  studentId: string;
  studentNumber: string;
  fullName: string;
  photoUrl?: string;
  lv2: string;
  speciality: string;
  optionalActivity: string;
  validated: boolean;
}

@Component({
  selector: 'eduops-pedagogical-enrollments',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <div>
        <h1 class="page-head__title">Inscriptions Pédagogiques</h1>
        <p class="page-head__sub">Affectation aux langues vivantes (LV2), options facultatives et spécialités par élève</p>
      </div>

      <div class="actions">
        <button class="btn btn--outline" (click)="autoAssign()">
          ⚡ Répartition automatique
        </button>
        <button class="btn btn--primary" (click)="saveEnrollments()" [disabled]="saving()">
          {{ saving() ? 'Enregistrement...' : '✓ Valider les inscriptions pédagogiques' }}
        </button>
      </div>
    </header>

    @if (statusMessage()) {
      <div class="alert alert--success">
        {{ statusMessage() }}
      </div>
    }

    <!-- FILTRES -->
    <div class="filter-card card">
      <div class="filter-row">
        <div class="filter-item">
          <label>Sélection de la classe :</label>
          <select class="input" [(ngModel)]="selectedClassId" (change)="onClassChange()">
            @for (c of classes(); track c.id) {
              <option [value]="c.id">{{ c.name }} ({{ c.activeEnrollments }} élèves inscrits)</option>
            }
          </select>
        </div>

        <div class="filter-item">
          <label>Année académique :</label>
          <input type="text" class="input input--readonly" value="2025-2026 (Active)" readonly>
        </div>
      </div>
    </div>

    <!-- SYNTHÈSE DES GROUPES PÉDAGOGIQUES -->
    <div class="summary-grid">
      <div class="group-card card">
        <span class="group-card__title">LV2 Espagnol</span>
        <span class="group-card__count">{{ countLv2('ESP') }} élèves</span>
        <div class="progress-bar">
          <div class="progress-fill" [style.width.%]="(countLv2('ESP') / 30) * 100"></div>
        </div>
        <small class="group-card__meta">Capacité max : 30 places</small>
      </div>

      <div class="group-card card">
        <span class="group-card__title">LV2 Allemand</span>
        <span class="group-card__count">{{ countLv2('ALL') }} élèves</span>
        <div class="progress-bar">
          <div class="progress-fill progress-fill--blue" [style.width.%]="(countLv2('ALL') / 25) * 100"></div>
        </div>
        <small class="group-card__meta">Capacité max : 25 places</small>
      </div>

      <div class="group-card card">
        <span class="group-card__title">Option Informatique / Code</span>
        <span class="group-card__count">{{ countOpt('INFO') }} élèves</span>
        <div class="progress-bar">
          <div class="progress-fill progress-fill--purple" [style.width.%]="(countOpt('INFO') / 20) * 100"></div>
        </div>
        <small class="group-card__meta">Capacité labo : 20 postes</small>
      </div>

      <div class="group-card card">
        <span class="group-card__title">Option Arts & Théâtre</span>
        <span class="group-card__count">{{ countOpt('ARTS') }} élèves</span>
        <div class="progress-bar">
          <div class="progress-fill progress-fill--orange" [style.width.%]="(countOpt('ARTS') / 25) * 100"></div>
        </div>
        <small class="group-card__meta">Capacité max : 25 places</small>
      </div>
    </div>

    @if (loading()) {
      <eduops-loading-state message="Chargement des élèves et choix pédagogiques..." />
    } @else {
      <!-- TABLE DES ÉLÈVES & OPTIONS -->
      <div class="table-card card">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 40px;">#</th>
              <th>Élève</th>
              <th style="width: 170px;">Langue Vivante 2 (LV2)</th>
              <th style="width: 170px;">Option facultative</th>
              <th style="width: 160px;">Spécialité / Atelier</th>
              <th style="width: 110px; text-align: center;">Statut</th>
            </tr>
          </thead>
          <tbody>
            @for (row of rows(); track row.studentId; let i = $index) {
              <tr>
                <td class="col-num">{{ i + 1 }}</td>
                <td>
                  <div class="student-info">
                    <eduops-avatar [name]="row.fullName" [photoUrl]="row.photoUrl" size="sm" />
                    <div>
                      <strong class="student-name">{{ row.fullName }}</strong>
                      <small class="student-num">{{ row.studentNumber }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <select class="select-inline" [(ngModel)]="row.lv2">
                    <option value="ESP">Espagnol (LV2)</option>
                    <option value="ALL">Allemand (LV2)</option>
                    <option value="NONE">Aucune LV2</option>
                  </select>
                </td>
                <td>
                  <select class="select-inline" [(ngModel)]="row.optionalActivity">
                    <option value="INFO">Informatique & Code</option>
                    <option value="ARTS">Arts & Théâtre</option>
                    <option value="MUSIQUE">Éducation Musicale</option>
                    <option value="AUCUNE">Sans option</option>
                  </select>
                </td>
                <td>
                  <select class="select-inline" [(ngModel)]="row.speciality">
                    <option value="SCIENCES">Sciences Appliquées</option>
                    <option value="LETTRES">Humanités & Lettres</option>
                    <option value="ECO">Économie & Gestion</option>
                  </select>
                </td>
                <td style="text-align: center;">
                  <span class="status-pill" [class.status-pill--ok]="row.validated">
                    {{ row.validated ? 'Validé' : 'Brouillon' }}
                  </span>
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

    .alert--success {
      background: #dcfce7; color: #15803d; padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-button); margin-bottom: var(--space-5); font-size: var(--text-sm); font-weight: 600;
    }

    .filter-card { padding: var(--space-4) var(--space-5); background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius-card); margin-bottom: var(--space-5); }
    .filter-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-4); }
    .filter-item label { display: block; font-size: var(--text-xs); font-weight: 600; color: var(--text-muted); margin-bottom: 4px; }
    .input {
      width: 100%; padding: 8px 12px; border: 1px solid var(--border-medium); border-radius: var(--radius-button);
      font-size: var(--text-sm); background: var(--surface); color: var(--text-strong); box-sizing: border-box;
    }
    .input--readonly { background: var(--surface-subtle); color: var(--text-muted); }

    .summary-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-4); margin-bottom: var(--space-6);
    }
    .group-card {
      padding: var(--space-4); background: var(--surface); border: 1px solid var(--border-light);
      border-radius: var(--radius-card); display: flex; flex-direction: column; gap: 4px;
    }
    .group-card__title { font-size: var(--text-xs); font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
    .group-card__count { font-size: var(--text-xl); font-weight: 800; font-family: var(--font-display); color: #1b365d; }
    .group-card__meta { font-size: 11px; color: var(--text-light); }

    .progress-bar { width: 100%; height: 6px; background: #e2e8f0; border-radius: 999px; overflow: hidden; margin: 4px 0; }
    .progress-fill { height: 100%; background: #16a34a; border-radius: 999px; }
    .progress-fill--blue { background: #2563eb; }
    .progress-fill--purple { background: #7c3aed; }
    .progress-fill--orange { background: #ea580c; }

    .table-card { overflow-x: auto; background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius-card); padding: 0; }
    .data-table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
    .data-table th { text-align: left; padding: 12px 14px; background: var(--surface-subtle); color: var(--text-muted); font-size: var(--text-xs); font-weight: 600; }
    .data-table td { padding: 10px 14px; border-bottom: 1px solid var(--border-light); vertical-align: middle; }
    .col-num { color: var(--text-light); font-size: var(--text-xs); }

    .student-info { display: flex; align-items: center; gap: 10px; }
    .student-name { display: block; font-size: var(--text-sm); color: var(--text-strong); }
    .student-num { color: var(--text-muted); font-size: 11px; font-family: monospace; }

    .select-inline {
      width: 100%; padding: 6px 10px; border: 1px solid var(--border-medium); border-radius: var(--radius-button);
      font-size: var(--text-xs); background: var(--surface); color: var(--text-strong);
    }

    .status-pill {
      font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 999px;
      background: #fef3c7; color: #b45309; display: inline-block;
    }
    .status-pill--ok { background: #dcfce7; color: #15803d; }

    .btn {
      padding: 9px 16px; border-radius: var(--radius-button); font-size: var(--text-sm);
      font-weight: 600; cursor: pointer; border: none; transition: all 0.2s;
    }
    .btn--outline { border: 1px solid var(--border-medium); background: var(--surface); color: var(--text-strong); }
    .btn--outline:hover { background: var(--surface-subtle); }
    .btn--primary { background: #1b365d; color: #fff; }
    .btn--primary:hover { background: #12253f; }
  `]
})
export class PedagogicalEnrollmentsComponent implements OnInit {
  private readonly classroomSource = inject(CLASSROOM_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly classes = signal<Classroom[]>([]);
  readonly rows = signal<PedagogicalChoice[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly statusMessage = signal<string | null>(null);

  selectedClassId = '';

  ngOnInit(): void {
    this.classroomSource.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (classList) => {
        this.classes.set(classList);
        if (classList.length > 0) {
          this.selectedClassId = classList[0].id;
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
        const initial: PedagogicalChoice[] = students.map((s: StudentSummary, idx: number) => ({
          studentId: s.id,
          studentNumber: s.studentNumber,
          fullName: s.fullName,
          photoUrl: s.photoUrl,
          lv2: idx % 2 === 0 ? 'ESP' : 'ALL',
          speciality: idx % 3 === 0 ? 'SCIENCES' : (idx % 3 === 1 ? 'LETTRES' : 'ECO'),
          optionalActivity: idx % 2 === 0 ? 'INFO' : 'ARTS',
          validated: idx % 4 !== 0
        }));
        this.rows.set(initial);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  countLv2(code: string): number {
    return this.rows().filter((r) => r.lv2 === code).length;
  }

  countOpt(code: string): number {
    return this.rows().filter((r) => r.optionalActivity === code).length;
  }

  autoAssign(): void {
    this.rows.update((list) =>
      list.map((r, i) => ({
        ...r,
        lv2: i % 2 === 0 ? 'ESP' : 'ALL',
        optionalActivity: i % 2 === 0 ? 'INFO' : 'ARTS',
        validated: true
      }))
    );
  }

  saveEnrollments(): void {
    this.saving.set(true);
    setTimeout(() => {
      this.saving.set(false);
      this.rows.update((list) => list.map((r) => ({ ...r, validated: true })));
      this.statusMessage.set('Toutes les inscriptions pédagogiques de la classe ont été validées et verrouillées.');
      setTimeout(() => this.statusMessage.set(null), 4000);
    }, 700);
  }
}
