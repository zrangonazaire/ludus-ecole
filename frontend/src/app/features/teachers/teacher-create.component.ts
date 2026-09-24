import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CURRICULUM_DATA_SOURCE, REFERENCE_DATA_SOURCE, TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { CONTRACT_TYPES, ContractType } from '@core/models/teacher.models';
import { SUBJECT_CATEGORIES, SUBJECT_COLORS, SubjectCategoryCode } from '@core/models/curriculum.models';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { PERMISSIONS } from '@core/models/auth.models';

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
            <div class="field"><label for="speciality">Spécialité (matière)</label>
              <select id="speciality" class="input" formControlName="speciality">
                <option value="">Choisir dans le catalogue…</option>
                @for (subject of subjectOptions(); track subject) { <option [value]="subject">{{ subject }}</option> }
                <option value="__other">Autre (saisie libre)…</option>
                <option value="__new">+ Créer une nouvelle matière…</option>
              </select>
              @if (showCustomSpeciality()) {
                <input id="specialityCustom" class="input" formControlName="specialityCustom" maxlength="150"
                  placeholder="Précisez la spécialité" style="margin-top: 8px" />
              }
              @if (invalid('speciality')) { <small class="field-error">Choisissez une spécialité du catalogue ou « Autre ».</small> }
              @if (canManageSubjects()) {
                <button type="button" class="link" (click)="openSubjectDialog()" style="margin-top: 6px">
                  La matière n’existe pas ? La créer dans le catalogue
                </button>
              } @else {
                <small class="field-hint">Matière manquante ? Demandez à un administrateur de l’ajouter via <a routerLink="/subjects">Matières et programme</a>.</small>
              }
            </div>
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
      @if (subjectDialogOpen()) {
        <div class="dialog-backdrop" (click)="closeSubjectDialog()">
          <div class="dialog" role="dialog" aria-modal="true" aria-label="Créer une matière" (click)="$event.stopPropagation()">
            <h2>Créer une matière</h2>
            <p class="dialog__hint">Elle sera ajoutée au catalogue puis sélectionnée comme spécialité.</p>
            <form [formGroup]="subjectForm" (ngSubmit)="createSubject()">
              <div class="field">
                <label for="newSubjectName">Nom *</label>
                <input id="newSubjectName" class="input" formControlName="name" maxlength="150" placeholder="Ex. : Informatique" />
                @if (subjectForm.controls.name.touched && subjectForm.controls.name.invalid) {
                  <small class="field-error">Saisissez le nom de la matière.</small>
                }
              </div>
              <div class="field">
                <label for="newSubjectCode">Code *</label>
                <input id="newSubjectCode" class="input" formControlName="code" maxlength="20" placeholder="Ex. : INFO" style="text-transform: uppercase" />
                @if (subjectForm.controls.code.touched && subjectForm.controls.code.invalid) {
                  <small class="field-error">Saisissez un code court (lettres, chiffres).</small>
                }
              </div>
              <div class="field">
                <label for="newSubjectCategory">Catégorie *</label>
                <select id="newSubjectCategory" class="input" formControlName="category">
                  @for (category of categories; track category.code) {
                    <option [value]="category.code">{{ category.label }}</option>
                  }
                </select>
              </div>
              <label class="check">
                <input type="checkbox" formControlName="graded" />
                <span>Matière notée (entre dans les moyennes)</span>
              </label>
              @if (subjectError()) { <p class="field-error" role="alert">{{ subjectError() }}</p> }
              <div class="dialog__actions">
                <button type="button" class="btn btn--secondary" [disabled]="savingSubject()" (click)="closeSubjectDialog()">Annuler</button>
                <button type="submit" class="btn btn--primary" [disabled]="savingSubject()">{{ savingSubject() ? 'Création…' : 'Créer la matière' }}</button>
              </div>
            </form>
          </div>
        </div>
      }
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
    .dialog-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.55);
      display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 60; }
    .dialog { background: #fff; border-radius: 12px; padding: 24px; width: min(480px, 100%);
      box-shadow: 0 24px 64px rgba(15, 23, 42, 0.28); }
    .dialog h2 { margin: 0 0 4px; font-size: 1.25rem; }
    .dialog__hint { margin: 0 0 16px; color: var(--text-muted); }
    .dialog .field { margin-bottom: 12px; }
    .dialog .check { display: flex; gap: 8px; align-items: center; margin: 12px 0 4px; }
    .dialog__actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px; }
    @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } fieldset { padding: 16px; } }
  `]
})
export class TeacherCreateComponent {
  private readonly data = inject(TEACHER_DATA_SOURCE);
  private readonly reference = inject(REFERENCE_DATA_SOURCE);
  private readonly curriculum = inject(CURRICULUM_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly loadingSubjects = signal(true);
  readonly subjectOptions = signal<string[]>([]);
  readonly categories = SUBJECT_CATEGORIES;
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
    specialityCustom: ['', Validators.maxLength(150)],
    qualification: ['', Validators.maxLength(150)],
    hireDate: ['', Validators.required],
    contractType: ['PERMANENT' as ContractType, Validators.required],
    weeklyHoursMax: [24, [Validators.required, Validators.min(1), Validators.max(60), Validators.pattern(/^\d+$/)]]
  });

  readonly subjectForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(20)]],
    name: ['', [Validators.required, Validators.maxLength(150)]],
    category: ['SCIENCE' as SubjectCategoryCode, [Validators.required]],
    graded: [true]
  });
  readonly subjectDialogOpen = signal(false);
  readonly savingSubject = signal(false);
  readonly subjectError = signal('');

  readonly showCustomSpeciality = computed(() => this.form.controls.speciality.value === '__other');

  constructor() {
    this.reference.subjects().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: list => {
        this.subjectOptions.set([...new Set(list.map(s => s.name.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'fr')));
        this.loadingSubjects.set(false);
      },
      error: () => this.loadingSubjects.set(false)
    });
    this.form.controls.speciality.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => { if (value === '__new') this.openSubjectDialog(); });
  }

  canManageSubjects(): boolean {
    return this.auth.has(PERMISSIONS.SUBJECT_MANAGE);
  }

  openSubjectDialog(): void {
    if (!this.canManageSubjects()) return;
    const current = this.form.controls.specialityCustom.value.trim()
      || (this.form.controls.speciality.value.startsWith('__') ? '' : this.form.controls.speciality.value.trim());
    this.subjectForm.reset({ code: '', name: current, category: 'SCIENCE' as SubjectCategoryCode, graded: true });
    this.subjectError.set('');
    this.subjectDialogOpen.set(true);
  }

  closeSubjectDialog(): void {
    if (this.savingSubject()) return;
    this.subjectDialogOpen.set(false);
    if (this.form.controls.speciality.value === '__new') this.form.controls.speciality.setValue('');
  }

  createSubject(): void {
    if (this.savingSubject()) return;
    this.subjectForm.markAllAsTouched();
    if (this.subjectForm.invalid) return;
    const value = this.subjectForm.getRawValue();
    this.savingSubject.set(true);
    this.subjectError.set('');
    this.curriculum.createSubject({
      code: value.code.trim(), name: value.name.trim(), category: value.category,
      colorHex: SUBJECT_COLORS[0], graded: value.graded
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (subject: { name: string }) => {
        this.savingSubject.set(false);
        this.subjectDialogOpen.set(false);
        this.reloadSubjects(subject.name);
        this.notifications.success(`${subject.name} a été ajoutée au catalogue.`, 'Matière créée');
      },
      error: (err: { status?: number }) => {
        this.savingSubject.set(false);
        this.subjectError.set(err.status === 409
          ? 'Ce code est déjà utilisé par une autre matière.'
          : 'Impossible de créer la matière. Vérifiez les informations et réessayez.');
      }
    });
  }

  private reloadSubjects(selectName: string): void {
    this.loadingSubjects.set(true);
    this.curriculum.listSubjects().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (list: { status: string; name: string }[]) => {
        const names = [...new Set(list.filter((s) => s.status === 'ACTIVE').map((s) => s.name.trim()).filter(Boolean))]
          .sort((a: string, b: string) => a.localeCompare(b, 'fr'));
        this.subjectOptions.set(names);
        this.loadingSubjects.set(false);
        this.form.controls.speciality.setValue(selectName.trim());
      },
      error: () => {
        this.loadingSubjects.set(false);
        this.form.controls.speciality.setValue(selectName.trim());
        this.subjectOptions.update(names => names.includes(selectName.trim()) ? names : [...names, selectName.trim()]);
      }
    });
  }

  invalid(key: string): boolean {
    const control = this.form.get(key);
    return !!control && control.touched && control.invalid;
  }

  cancel(): void { void this.router.navigate(['/teachers']); }

  save(): void {
    if (this.saving()) return;
    let rawSpeciality = this.form.controls.speciality.value;
    const custom = this.form.controls.specialityCustom;
    if (rawSpeciality === '__new') {
      this.form.controls.speciality.setValue('');
      rawSpeciality = '';
    }
    if (rawSpeciality === '__other' && !custom.value.trim()) {
      custom.setErrors({ required: true });
    }
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const { specialityCustom: _ignored, ...rest } = value;
    const speciality = rawSpeciality === '__other' ? custom.value.trim() : (rawSpeciality || '').trim();
    this.saving.set(true);
    this.error.set('');
    this.data.create({ ...rest, firstName: value.firstName.trim(), lastName: value.lastName.trim(),
      email: value.email.trim().toLowerCase(), phone: value.phone.trim(), speciality, qualification: value.qualification.trim() })
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
