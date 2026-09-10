import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AssignmentBoard, TeacherAssignment, TeacherAssignmentService } from '@core/services/teacher-assignment.service';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';

@Component({
  selector: 'eduops-teacher-assignments', standalone: true,
  imports: [ReactiveFormsModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <header class="page__header"><div>
        <a routerLink="/setup">← Configuration</a>
        <h1 class="page__title">Affectation des enseignants</h1>
        <p class="page__meta">Associez chaque enseignant à une classe et une matière pour définir son périmètre de saisie.</p>
        @if (board()?.academicYearCode; as year) { <p>Année scolaire : <strong>{{ year }}</strong></p> }
      </div><a class="btn btn--secondary" routerLink="/teachers">Gérer les enseignants</a></header>
      @if (error()) { <p role="alert" class="error">{{ error() }}</p> }
      @if (loading()) { <p role="status">Chargement des affectations…</p> }
      @else { @if (board(); as data) {
        @if (!data.academicYearCode) {
          <section class="card"><h2>Aucune année scolaire active</h2><p>Activez une année avant d’affecter les enseignants.</p><a routerLink="/academic-years">Gérer les années scolaires</a></section>
        } @else {
          <section class="card">
            <h2>Nouvelle affectation</h2>
            @if (!data.teachers.length || !data.classes.length) {
              <p>Ajoutez au moins un enseignant actif et une classe active pour commencer.</p>
              <div class="actions"><a routerLink="/teachers/new">Ajouter un enseignant</a><a routerLink="/classes">Gérer les classes</a></div>
            } @else {
              <form [formGroup]="form" (ngSubmit)="save()">
                <fieldset [disabled]="busy()"><div class="grid">
                  <div><label for="assignment-class">Classe *</label><select id="assignment-class" class="input" formControlName="classroomId" (change)="form.controls.subjectId.setValue('')">
                    <option value="">Choisir une classe</option>@for (c of data.classes; track c.id) { <option [value]="c.id">{{ c.name }}</option> }
                  </select></div>
                  <div><label for="assignment-subject">Matière *</label><select id="assignment-subject" class="input" formControlName="subjectId">
                    <option value="">Choisir une matière du programme</option>@for (s of subjects(); track s.id) { <option [value]="s.id">{{ s.name }}</option> }
                  </select></div>
                  <div><label for="assignment-teacher">Enseignant *</label><select id="assignment-teacher" class="input" formControlName="teacherId">
                    <option value="">Choisir un enseignant</option>@for (t of data.teachers; track t.id) { <option [value]="t.id">{{ t.name }}</option> }
                  </select></div>
                  <div><label for="assignment-hours">Heures par semaine *</label><input id="assignment-hours" class="input" type="number" min="0.01" max="60" step="0.01" formControlName="weeklyHours" /></div>
                </div></fieldset>
                @if (form.controls.classroomId.value && !subjects().length) { <p>Aucune matière au programme de cette classe. <a routerLink="/subjects">Définir le programme</a></p> }
                @if (form.touched && form.invalid) { <p class="error" role="alert">Renseignez les trois sélections et un volume horaire entre 0,01 et 60 (deux décimales maximum).</p> }
                <div class="actions"><button class="btn btn--primary" type="submit" [disabled]="busy()">{{ busy() ? 'Enregistrement…' : 'Affecter l’enseignant' }}</button></div>
              </form>
            }
          </section>
          <section class="card"><h2>Affectations actives ({{ data.assignments.length }})</h2>
            @if (!data.assignments.length) { <p>Aucune affectation pour le moment. Choisissez une classe, une matière et un enseignant ci-dessus.</p> }
            @else {
              <div class="table-wrap"><table><caption class="visually-hidden">Affectations des enseignants pour l’année active</caption><thead><tr><th>Enseignant</th><th>Classe</th><th>Matière</th><th>Heures / semaine</th><th>Action</th></tr></thead><tbody>
                @for (a of data.assignments; track a.id) { <tr><td>{{ a.teacherName }}</td><td>{{ a.classroomName }}</td><td>{{ a.subjectName }}</td><td>{{ a.weeklyHours }}</td><td><button type="button" class="btn btn--secondary" [disabled]="busy()" (click)="ending.set(a)">Terminer</button></td></tr> }
              </tbody></table></div>
            }
            @if (ending(); as a) { <div class="confirmation" role="group" aria-label="Confirmation de fin d’affectation"><p>Terminer l’affectation de <strong>{{ a.teacherName }}</strong> en {{ a.subjectName }} pour {{ a.classroomName }} ? Son autorisation de saisie pour cette matière et cette classe sera retirée.</p>
              <div class="actions"><button class="btn btn--secondary" [disabled]="busy()" (click)="ending.set(null)">Annuler</button><button class="btn btn--primary" [disabled]="busy()" (click)="end(a)">Confirmer la fin</button></div></div> }
          </section>
        }
      } @else { <button class="btn btn--secondary" (click)="load()">Réessayer</button> } }
    </div>
  `,
  styles: [`
    .card { padding: 24px; margin-bottom: 24px; } h2 { margin-top: 0; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
    label { display: block; font-weight: 600; margin-bottom: 8px; } fieldset { border: 0; padding: 0; min-width: 0; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px; }
    .error { color: var(--danger, #b42318); } .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; } th, td { text-align: left; padding: 12px; border-bottom: 1px solid var(--border, #e5e7eb); }
    .confirmation { padding: 16px; margin-top: 16px; border: 1px solid var(--border, #e5e7eb); border-radius: 8px; }
    @media (max-width: 640px) { .grid { grid-template-columns: 1fr; } .card { padding: 16px; } }
  `]
})
export class TeacherAssignmentsComponent {
  private readonly service = inject(TeacherAssignmentService);
  private readonly notifications = inject(NotificationService);
  private readonly setup = inject(SetupStatusService);
  private readonly destroyRef = inject(DestroyRef);
  readonly board = signal<AssignmentBoard | null>(null);
  readonly loading = signal(true);
  readonly busy = signal(false);
  readonly error = signal('');
  readonly ending = signal<TeacherAssignment | null>(null);
  readonly form = inject(FormBuilder).nonNullable.group({
    teacherId: ['', Validators.required], classroomId: ['', Validators.required], subjectId: ['', Validators.required],
    weeklyHours: [2, [Validators.required, Validators.min(0.01), Validators.max(60), Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
  });
  constructor() { this.load(); }
  subjects() { return this.board()?.classes.find(c => c.id === this.form.controls.classroomId.value)?.subjects ?? []; }
  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.service.board().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: data => { this.board.set(data); this.loading.set(false); },
      error: () => { this.board.set(null); this.loading.set(false); this.error.set('Impossible de charger les affectations. Réessayez.'); }
    });
  }
  save(): void {
    if (this.busy()) return;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.busy.set(true); this.error.set('');
    this.service.create(this.form.getRawValue()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.busy.set(false); this.form.reset(); this.notifications.success('Enseignant affecté à la classe et à la matière.'); this.load(); this.setup.refresh(); },
      error: err => this.failure(err)
    });
  }
  end(row: TeacherAssignment): void {
    if (this.busy()) return;
    this.busy.set(true); this.error.set('');
    this.service.end(row.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.busy.set(false); this.ending.set(null); this.notifications.success('Affectation terminée.'); this.load(); this.setup.refresh(); },
      error: err => this.failure(err)
    });
  }
  private failure(err: { error?: { message?: string } }): void {
    this.busy.set(false);
    this.error.set(err.error?.message || 'Impossible d’enregistrer cette affectation. Réessayez.');
  }
}
