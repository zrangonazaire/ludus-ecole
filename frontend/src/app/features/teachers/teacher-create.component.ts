import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { CONTRACT_TYPES, ContractType } from '@core/models/staff.models';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'eduops-teacher-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <header class="page__header">
        <div>
          <a routerLink="/teachers">← Enseignants</a>
          <h1 class="page__title">Nouvel enseignant</h1>
          <p class="page__meta">Renseignez les informations de l’enseignant pour créer son dossier.</p>
        </div>
      </header>
      <form [formGroup]="form" (ngSubmit)="save()">
        <fieldset class="card" [disabled]="saving()">
          <legend>Identité et coordonnées</legend>
          <p>Les champs marqués d’un * sont obligatoires.</p>
          <div class="form-grid">
            @for (field of identityFields; track field.key) {
              <div class="field">
                <label [for]="field.key">{{ field.label }}{{ field.required ? ' *' : '' }}</label>
                <input class="input" [id]="field.key" [type]="field.type"
                  [formControlName]="field.key" [maxlength]="field.max"
                  [attr.autocomplete]="field.autocomplete"
                  [attr.aria-invalid]="invalid(field.key)" [attr.aria-describedby]="invalid(field.key) ? field.key + '-error' : null" />
                @if (invalid(field.key)) {
                  <small class="field-error" [id]="field.key + '-error'">{{ field.key === 'email' ? 'Saisissez une adresse e-mail valide.' : 'Ce champ est obligatoire.' }}</small>
                }
              </div>
            }
          </div>
        </fieldset>
        <fieldset class="card" [disabled]="saving()">
          <legend>Informations professionnelles</legend>
          <p>Le matricule sera attribué automatiquement. Le dossier sera créé avec le statut actif.</p>
          <div class="form-grid">
            <div class="field"><label for="speciality">Spécialité</label><input id="speciality" class="input" formControlName="speciality" maxlength="150" placeholder="Ex. : Mathématiques" /></div>
            <div class="field"><label for="qualification">Diplôme / qualification</label><input id="qualification" class="input" formControlName="qualification" maxlength="150" /></div>
            <div class="field"><label for="hireDate">Date d’embauche *</label><input id="hireDate" class="input" type="date" formControlName="hireDate" [attr.aria-invalid]="invalid('hireDate')" />
              @if (invalid('hireDate')) { <small class="field-error">Choisissez une date d’embauche.</small> }
            </div>
            <div class="field"><label for="contractType">Type de contrat *</label><select id="contractType" class="input" formControlName="contractType">
              @for (contract of contracts; track contract.code) { <option [value]="contract.code">{{ contract.label }}</option> }
            </select></div>
            <div class="field"><label for="weeklyHoursMax">Maximum d’heures par semaine *</label><input id="weeklyHoursMax" class="input" type="number" min="1" max="60" step="1" formControlName="weeklyHoursMax" [attr.aria-invalid]="invalid('weeklyHoursMax')" />
              @if (invalid('weeklyHoursMax')) { <small class="field-error">Saisissez un nombre entier entre 1 et 60.</small> }
            </div>
          </div>
        </fieldset>
        @if (error()) { <p class="field-error" role="alert">{{ error() }}</p> }
        <div class="form-actions">
          <button type="button" class="btn btn--secondary" [disabled]="saving()" (click)="cancel()">Annuler</button>
          <button type="submit" class="btn btn--primary" [disabled]="saving()">{{ saving() ? 'Enregistrement…' : 'Créer l’enseignant' }}</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host { display: block; }
    form { max-width: 960px; }
    fieldset { min-width: 0; padding: 24px; margin: 0 0 24px; }
    legend { font-weight: 600; padding: 0 8px; color: var(--text-strong); }
    fieldset p { margin-top: 0; color: var(--text-muted); }
    .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
    .field { display: flex; flex-direction: column; gap: 8px; }
    label { font-weight: 500; }
    .field-error { color: var(--danger, #b42318); }
    .form-actions { display: flex; justify-content: flex-end; gap: 12px; }
    @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } fieldset { padding: 16px; } }
  `]
})
export class TeacherCreateComponent {
  private readonly data = inject(TEACHER_DATA_SOURCE);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly contracts = CONTRACT_TYPES;
  readonly identityFields = [
    { key: 'lastName', label: 'Nom', type: 'text', max: 120, required: true, autocomplete: 'family-name' },
    { key: 'firstName', label: 'Prénom(s)', type: 'text', max: 120, required: true, autocomplete: 'given-name' },
    { key: 'email', label: 'Adresse e-mail', type: 'email', max: 180, required: true, autocomplete: 'email' },
    { key: 'phone', label: 'Téléphone', type: 'tel', max: 40, required: false, autocomplete: 'tel' }
  ] as const;
  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(120)]],
    lastName: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(180)]],
    phone: ['', Validators.maxLength(40)],
    speciality: ['', Validators.maxLength(150)],
    qualification: ['', Validators.maxLength(150)],
    hireDate: ['', Validators.required],
    contractType: ['PERMANENT' as ContractType, Validators.required],
    weeklyHoursMax: [24, [Validators.required, Validators.min(1), Validators.max(60), Validators.pattern(/^\d+$/)]]
  });

  invalid(key: string): boolean {
    const control = this.form.get(key);
    return !!control && control.touched && control.invalid;
  }

  cancel(): void { void this.router.navigate(['/teachers']); }

  save(): void {
    if (this.saving()) return;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    this.saving.set(true);
    this.error.set('');
    this.data.create({ ...value, firstName: value.firstName.trim(), lastName: value.lastName.trim(),
      email: value.email.trim().toLowerCase(), phone: value.phone.trim(), speciality: value.speciality.trim(), qualification: value.qualification.trim() })
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: teacher => {
          this.notifications.success(`L’enseignant ${teacher.fullName} a été créé (${teacher.employeeNumber}).`);
          void this.router.navigate(['/teachers']);
        },
        error: err => {
          this.saving.set(false);
          this.error.set(err.status === 409 ? 'Un enseignant utilise déjà cette adresse e-mail.' : 'Impossible de créer l’enseignant. Vérifiez les informations et réessayez.');
        }
      });
  }
}
