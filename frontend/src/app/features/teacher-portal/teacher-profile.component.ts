import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';

@Component({
  selector: 'eduops-teacher-profile',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <div>
        <h1 class="page-head__title">Mon profil enseignant</h1>
        <p class="page-head__sub">Affectations pédagogiques, volume horaire et informations de contact</p>
      </div>

      <span class="status-pill">Enseignant Actif</span>
    </header>

    <div class="profile-grid">
      <!-- CARTE D'IDENTITÉ -->
      <div class="card id-card">
        <eduops-avatar [name]="teacherName()" size="lg" />
        <h2 class="id-card__name">{{ teacherName() }}</h2>
        <p class="id-card__role">Professeur de Mathématiques & Physique</p>
        <p class="id-card__meta">Matricule : <strong>ENS-2024-0018</strong> • Titulaire</p>

        <div class="kpi-box">
          <div class="kpi-mini">
            <span class="kpi-mini__num">18h</span>
            <span class="kpi-mini__lbl">Service / Semaine</span>
          </div>
          <div class="kpi-mini">
            <span class="kpi-mini__num">4</span>
            <span class="kpi-mini__lbl">Classes</span>
          </div>
          <div class="kpi-mini">
            <span class="kpi-mini__num">142</span>
            <span class="kpi-mini__lbl">Élèves</span>
          </div>
        </div>
      </div>

      <!-- DÉTAILS DU SERVICE & COORDONNÉES -->
      <div class="details-col">
        <div class="card info-card">
          <h3 class="info-card__title">Classes & Matières affectées (2025-2026)</h3>
          <div class="assignments-list">
            <div class="assign-item">
              <span class="badge badge--class">3ème A</span>
              <div class="assign-item__body">
                <strong>Mathématiques</strong>
                <small>4h / semaine • Salle B-102 • 38 élèves (Professeur Principal)</small>
              </div>
            </div>
            <div class="assign-item">
              <span class="badge badge--class">3ème B</span>
              <div class="assign-item__body">
                <strong>Mathématiques</strong>
                <small>4h / semaine • Salle B-104 • 36 élèves</small>
              </div>
            </div>
            <div class="assign-item">
              <span class="badge badge--class">4ème A</span>
              <div class="assign-item__body">
                <strong>Mathématiques & Géométrie</strong>
                <small>5h / semaine • Salle A-201 • 35 élèves</small>
              </div>
            </div>
            <div class="assign-item">
              <span class="badge badge--class">5ème C</span>
              <div class="assign-item__body">
                <strong>Physique-Chimie</strong>
                <small>3h / semaine • Labo Sciences • 33 élèves</small>
              </div>
            </div>
          </div>
        </div>

        <div class="card info-card">
          <h3 class="info-card__title">Coordonnées professionnelles & Salle des profs</h3>
          <div class="info-grid">
            <div class="info-cell">
              <span class="cell-lbl">Email institutionnel :</span>
              <span class="cell-val">j.kouassi&#64;ludus-ecole.ci</span>
            </div>
            <div class="info-cell">
              <span class="cell-lbl">Téléphone :</span>
              <span class="cell-val">+225 07 11 22 33 44</span>
            </div>
            <div class="info-cell">
              <span class="cell-lbl">Casier salle des profs :</span>
              <span class="cell-val">N° 24 (Bâtiment Administration)</span>
            </div>
            <div class="info-cell">
              <span class="cell-lbl">Heures de réception parents :</span>
              <span class="cell-val">Vendredi 15h00 - 16h30 (sur rendez-vous)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-head {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-4);
    }
    .page-head__title { font-size: var(--text-2xl); font-family: var(--font-display); margin: 0; color: var(--text-strong); }
    .page-head__sub { margin: var(--space-1) 0 0; color: var(--text-muted); font-size: var(--text-sm); }
    .status-pill {
      background: #dcfce7; color: #15803d; font-size: var(--text-xs);
      font-weight: 700; padding: 4px 12px; border-radius: 999px;
    }

    .profile-grid { display: grid; grid-template-columns: 320px 1fr; gap: var(--space-6); }
    @media (max-width: 900px) { .profile-grid { grid-template-columns: 1fr; } }

    .id-card {
      padding: var(--space-6); display: flex; flex-direction: column;
      align-items: center; text-align: center; background: var(--surface);
      border: 1px solid var(--border-light); border-radius: var(--radius-card);
    }
    .id-card__name { font-size: var(--text-xl); font-family: var(--font-display); margin: var(--space-3) 0 2px; }
    .id-card__role { font-size: var(--text-sm); color: var(--text-muted); margin: 0 0 var(--space-2); }
    .id-card__meta { font-size: var(--text-xs); color: var(--text-light); margin: 0 0 var(--space-5); }

    .kpi-box {
      width: 100%; display: grid; grid-template-columns: 1fr 1fr 1fr;
      border-top: 1px solid var(--border-light); padding-top: var(--space-4); gap: var(--space-2);
    }
    .kpi-mini { display: flex; flex-direction: column; align-items: center; }
    .kpi-mini__num { font-size: var(--text-xl); font-weight: 800; font-family: var(--font-display); color: #1b365d; }
    .kpi-mini__lbl { font-size: 10px; color: var(--text-muted); text-transform: uppercase; margin-top: 2px; }

    .details-col { display: flex; flex-direction: column; gap: var(--space-5); }
    .info-card { padding: var(--space-5); background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius-card); }
    .info-card__title { margin: 0 0 var(--space-4); font-size: var(--text-md); font-family: var(--font-display); color: var(--text-strong); }

    .assignments-list { display: flex; flex-direction: column; gap: var(--space-3); }
    .assign-item {
      display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3);
      background: var(--surface-subtle); border-radius: var(--radius-button);
    }
    .badge--class {
      background: #1b365d; color: #fff; font-size: var(--text-xs); font-weight: 700;
      padding: 6px 10px; border-radius: 6px;
    }
    .assign-item__body { display: flex; flex-direction: column; }
    .assign-item__body strong { font-size: var(--text-sm); color: var(--text-strong); }
    .assign-item__body small { font-size: var(--text-xs); color: var(--text-muted); }

    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
    @media (max-width: 600px) { .info-grid { grid-template-columns: 1fr; } }
    .info-cell { display: flex; flex-direction: column; gap: 2px; }
    .cell-lbl { font-size: var(--text-xs); color: var(--text-muted); }
    .cell-val { font-size: var(--text-sm); font-weight: 600; color: var(--text-strong); }
  `]
})
export class TeacherProfileComponent {
  private readonly auth = inject(AuthService);

  teacherName(): string {
    return this.auth.currentUser()?.fullName ?? 'M. Kouassi Jean-Paul';
  }
}
