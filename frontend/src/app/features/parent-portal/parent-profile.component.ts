import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';

@Component({
  selector: 'eduops-parent-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <div>
        <h1 class="page-head__title">Mon profil & Sécurité</h1>
        <p class="page-head__sub">Coordonnées de contact d'urgence, enfants rattachés et accès au compte</p>
      </div>

      <button class="btn btn--primary" (click)="saveProfile()" [disabled]="savedSuccess()">
        {{ savedSuccess() ? '✓ Enregistré' : 'Enregistrer les modifications' }}
      </button>
    </header>

    @if (savedSuccess()) {
      <div class="alert alert--success">
        Vos informations ont été mises à jour avec succès.
      </div>
    }

    <div class="profile-layout">
      <!-- CARTE D'IDENTITÉ -->
      <div class="id-card card">
        <div class="id-card__header">
          <eduops-avatar [name]="userFullName()" size="lg" />
          <div class="id-card__meta">
            <h2 class="id-card__name">{{ userFullName() }}</h2>
            <p class="id-card__role">Responsable Légal • Tuteur Principal</p>
            <span class="id-card__pill">Compte vérifié</span>
          </div>
        </div>

        <div class="linked-children">
          <h3 class="linked-children__title">Enfants sous tutelle dans l'établissement</h3>
          <div class="children-pills">
            <div class="child-item">
              <span class="child-icon">🧒</span>
              <div>
                <strong>Emmanuel Kouassi</strong>
                <small>Classe de 3ème A • ELE-2025-0012</small>
              </div>
            </div>
            <div class="child-item">
              <span class="child-icon">👧</span>
              <div>
                <strong>Sarah Kouassi</strong>
                <small>Classe de 5ème B • ELE-2025-0042</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FORMULAIRES -->
      <div class="forms-col">
        <!-- COORDONNÉES DE CONTACT -->
        <div class="card form-box">
          <h3 class="form-box__title">Coordonnées & Urgence</h3>
          <p class="form-box__sub">Ces informations sont utilisées par l'infirmerie et la vie scolaire en cas d'urgence.</p>

          <div class="grid-2">
            <div class="field">
              <label>Nom complet</label>
              <input type="text" class="input" [(ngModel)]="fullName" readonly>
            </div>
            <div class="field">
              <label>Lien de parenté</label>
              <select class="input" [(ngModel)]="relation">
                <option value="PERE">Père</option>
                <option value="MERE">Mère</option>
                <option value="TUTEUR">Tuteur légal</option>
              </select>
            </div>
          </div>

          <div class="grid-2">
            <div class="field">
              <label>Numéro de téléphone principal (SMS alertes)</label>
              <input type="tel" class="input" [(ngModel)]="phone">
            </div>
            <div class="field">
              <label>Numéro secondaire / Bureau</label>
              <input type="tel" class="input" [(ngModel)]="secondaryPhone">
            </div>
          </div>

          <div class="grid-2">
            <div class="field">
              <label>Adresse e-mail</label>
              <input type="email" class="input" [(ngModel)]="email">
            </div>
            <div class="field">
              <label>Profession</label>
              <input type="text" class="input" [(ngModel)]="profession">
            </div>
          </div>

          <div class="field">
            <label>Adresse de résidence</label>
            <input type="text" class="input" [(ngModel)]="address">
          </div>
        </div>

        <!-- PRÉFÉRENCES DE NOTIFICATION -->
        <div class="card form-box">
          <h3 class="form-box__title">Canaux de notification</h3>
          <div class="checkbox-group">
            <label class="check-item">
              <input type="checkbox" [(ngModel)]="notifySmsAbsence">
              <span>Recevoir une alerte <strong>SMS immédiate</strong> en cas d'absence ou retard d'un enfant</span>
            </label>
            <label class="check-item">
              <input type="checkbox" [(ngModel)]="notifyEmailBulletin">
              <span>Recevoir une copie <strong>Email des bulletins trimestriels</strong> dès publication officielle</span>
            </label>
            <label class="check-item">
              <input type="checkbox" [(ngModel)]="notifyFinanceReminders">
              <span>Rappels d'échéances et reçus de scolarité par Email et notification</span>
            </label>
          </div>
        </div>

        <!-- SÉCURITÉ DU MOT DE PASSE -->
        <div class="card form-box">
          <h3 class="form-box__title">Sécurité du compte</h3>
          <div class="grid-2">
            <div class="field">
              <label>Nouveau mot de passe</label>
              <input type="password" class="input" placeholder="••••••••••••" [(ngModel)]="newPassword">
            </div>
            <div class="field">
              <label>Confirmer le nouveau mot de passe</label>
              <input type="password" class="input" placeholder="••••••••••••" [(ngModel)]="confirmPassword">
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

    .alert--success {
      background: #dcfce7; color: #15803d; padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-button); margin-bottom: var(--space-5); font-size: var(--text-sm); font-weight: 600;
    }

    .profile-layout {
      display: grid; grid-template-columns: 320px 1fr; gap: var(--space-6);
      align-items: start;
    }
    @media (max-width: 900px) {
      .profile-layout { grid-template-columns: 1fr; }
    }

    .id-card { padding: var(--space-5); background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius-card); }
    .id-card__header { display: flex; flex-direction: column; align-items: center; text-align: center; gap: var(--space-3); margin-bottom: var(--space-5); }
    .id-card__name { margin: 0; font-size: var(--text-lg); font-family: var(--font-display); color: var(--text-strong); }
    .id-card__role { margin: 4px 0; font-size: var(--text-xs); color: var(--text-muted); }
    .id-card__pill { font-size: 11px; background: #e0f2fe; color: #0284c7; padding: 2px 10px; border-radius: 999px; font-weight: 700; }

    .linked-children { border-top: 1px solid var(--border-light); padding-top: var(--space-4); }
    .linked-children__title { font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; margin: 0 0 var(--space-3); }
    .children-pills { display: flex; flex-direction: column; gap: var(--space-2); }
    .child-item {
      display: flex; align-items: center; gap: var(--space-3); padding: 8px 12px;
      background: var(--surface-subtle); border-radius: var(--radius-button); font-size: var(--text-xs);
    }
    .child-item strong { display: block; font-size: var(--text-sm); color: var(--text-strong); }
    .child-item small { color: var(--text-muted); }
    .child-icon { font-size: 20px; }

    .forms-col { display: flex; flex-direction: column; gap: var(--space-5); }
    .form-box { padding: var(--space-5); background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius-card); }
    .form-box__title { margin: 0 0 4px; font-size: var(--text-lg); font-family: var(--font-display); color: var(--text-strong); }
    .form-box__sub { font-size: var(--text-xs); color: var(--text-muted); margin: 0 0 var(--space-4); }

    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-bottom: var(--space-4); }
    @media (max-width: 600px) { .grid-2 { grid-template-columns: 1fr; } }

    .field { display: flex; flex-direction: column; gap: 4px; margin-bottom: var(--space-3); }
    .field label { font-size: var(--text-xs); font-weight: 600; color: var(--text-muted); }
    .input {
      padding: 10px 12px; border: 1px solid var(--border-medium); border-radius: var(--radius-button);
      font-size: var(--text-sm); background: var(--surface); color: var(--text-strong);
    }

    .checkbox-group { display: flex; flex-direction: column; gap: var(--space-3); }
    .check-item { display: flex; align-items: flex-start; gap: 10px; font-size: var(--text-sm); cursor: pointer; }
    .check-item input { margin-top: 3px; }

    .btn {
      padding: 10px 20px; border-radius: var(--radius-button); font-size: var(--text-sm);
      font-weight: 600; cursor: pointer; border: none; transition: all 0.2s;
    }
    .btn--primary { background: #1b365d; color: #fff; }
    .btn--primary:hover { background: #132742; }
  `]
})
export class ParentProfileComponent {
  private readonly auth = inject(AuthService);

  readonly savedSuccess = signal(false);

  fullName = this.auth.currentUser()?.fullName ?? 'M. Kouassi Jean';
  relation = 'PERE';
  phone = '+225 07 48 12 34 56';
  secondaryPhone = '+225 05 01 23 45 67';
  email = this.auth.currentUser()?.email ?? 'parent.kouassi@exemple.ci';
  profession = 'Ingénieur Informatique';
  address = 'Cocody Riviera 3, Abidjan, Côte d’Ivoire';

  notifySmsAbsence = true;
  notifyEmailBulletin = true;
  notifyFinanceReminders = true;

  newPassword = '';
  confirmPassword = '';

  userFullName(): string {
    return this.fullName;
  }

  saveProfile(): void {
    this.savedSuccess.set(true);
    setTimeout(() => this.savedSuccess.set(false), 3000);
  }
}
