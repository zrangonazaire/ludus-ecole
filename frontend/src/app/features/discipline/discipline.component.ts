import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, finalize } from 'rxjs';
import { DisciplineService, Incident, IncidentPayload } from '@core/services/discipline.service';
import { STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentSummary } from '@core/models/domain.models';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ApiError } from '@core/models/common.models';

@Component({
  selector: 'eduops-discipline', standalone: true, imports: [CommonModule, FormsModule],
  templateUrl: './discipline.component.html', styleUrl: './discipline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisciplineComponent {
  private readonly service = inject(DisciplineService);
  private readonly studentsSource = inject(STUDENT_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);
  readonly canManage = computed(() => this.auth.has('DISCIPLINE_MANAGE'));
  readonly items = signal<Incident[]>([]);
  readonly students = signal<StudentSummary[]>([]);
  readonly loading = signal(false);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly creating = signal(false);
  readonly selected = signal<Incident | null>(null);
  readonly search = signal('');
  readonly statusFilter = signal('');
  readonly severityFilter = signal('');
  readonly page = signal(1);
  readonly types: Record<string,string> = { BEHAVIOR: 'Comportement', VIOLENCE: 'Violence', CHEATING: 'Tricherie', ABSENTEEISM: 'Absentéisme', LATENESS: 'Retard', PROPERTY_DAMAGE: 'Dégradation', OTHER: 'Autre' };
  readonly severities: Record<string,string> = { LOW: 'Faible', MEDIUM: 'Modérée', HIGH: 'Élevée', CRITICAL: 'Critique' };
  readonly statuses: Record<string,string> = { REPORTED: 'Signalé', UNDER_REVIEW: 'En cours d’examen', ACTION_TAKEN: 'Mesure prise', CLOSED: 'Clôturé', CANCELLED: 'Annulé' };
  readonly actionTypes: Record<string,string> = { WARNING: 'Avertissement', DETENTION: 'Retenue', PARENT_MEETING: 'Convocation des parents', SUSPENSION: 'Suspension', EXPULSION: 'Exclusion', OTHER: 'Autre mesure' };
  readonly filtered = computed(() => this.items().filter(i =>
    (!this.statusFilter() || i.status === this.statusFilter()) && (!this.severityFilter() || i.severity === this.severityFilter()) &&
    `${i.reference} ${i.studentName} ${i.classroomName} ${i.description}`.toLocaleLowerCase('fr').includes(this.search().toLocaleLowerCase('fr'))));
  readonly pages = computed(() => Math.max(1, Math.ceil(this.filtered().length / 10)));
  readonly visible = computed(() => this.filtered().slice((this.page() - 1) * 10, this.page() * 10));
  readonly openCount = computed(() => this.items().filter(i => !this.closed(i)).length);
  readonly urgentCount = computed(() => this.items().filter(i => !this.closed(i) && ['HIGH', 'CRITICAL'].includes(i.severity)).length);
  readonly familyCount = computed(() => this.items().filter(i => !this.closed(i) && !i.guardianInformed).length);
  draft = this.emptyDraft();
  studentSearch = '';
  editStatus = '';
  guardianInformed = false;
  actionType = 'WARNING';
  actionDescription = '';
  constructor() { this.load(); }
  private emptyDraft(): IncidentPayload {
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    return { studentId: '', incidentDate: date, incidentType: 'BEHAVIOR', severity: 'LOW', description: '', location: '' };
  }
  closed(i: Incident) { return ['CLOSED','CANCELLED'].includes(i.status); }
  load() {
    this.loading.set(true); this.error.set(false);
    this.service.list().pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false))).subscribe({
      next: items => { this.items.set(items); this.page.set(Math.min(this.page(), this.pages())); }, error: () => this.error.set(true)
    });
  }
  searchStudents() {
    this.studentsSource.search({ search: this.studentSearch, page: 0, size: 50 }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: result => this.students.set(result.content), error: () => this.notifications.error('Impossible de charger les élèves.')
    });
  }
  openCreate() { this.draft = this.emptyDraft(); this.studentSearch = ''; this.students.set([]); this.creating.set(true); this.searchStudents(); }
  inspect(item: Incident) { this.selected.set(item); this.editStatus = item.status; this.guardianInformed = item.guardianInformed; this.actionDescription = ''; this.actionType = 'WARNING'; }
  create() {
    const student = this.students().find(s => s.id === this.draft.studentId);
    if (!student || !this.draft.description.trim() || !this.draft.incidentDate) return;
    this.mutate(this.service.create(this.draft, student.fullName, student.classroomName ?? ''), 'Incident signalé.');
  }
  update() { const i = this.selected(); if (i) this.mutate(this.service.update(i, this.editStatus, this.guardianInformed), 'Suivi enregistré.'); }
  addAction() { const i = this.selected(); if (i && this.actionDescription.trim()) this.mutate(this.service.action(i, this.actionType, this.actionDescription.trim()), 'Mesure enregistrée.'); }
  private mutate(operation: Observable<unknown>, message: string) {
    if (this.saving()) return;
    this.saving.set(true);
    operation.pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.saving.set(false))).subscribe({
      next: () => { this.notifications.success(message); this.creating.set(false); this.selected.set(null); this.load(); },
      error: (err: HttpErrorResponse) => this.notifications.error(this.explain(err))
    });
  }

  /**
   * Ce que le refus dit vraiment.
   *
   * Deviner d'après le statut HTTP se lisait « Cet incident a changé ou est
   * clôturé » : deux causes dans une phrase, dont une seule est vraie, et
   * l'utilisateur ne sait pas laquelle. Le serveur envoie désormais un code
   * précis, et la table de traduction en fait une phrase qui dit quoi faire.
   *
   * Le repli reste utile : un 500 nu n'a pas de code, et le nommer « erreur
   * interne » vaut mieux que d'inventer une cause métier.
   */
  private explain(error: HttpErrorResponse): string {
    const body = error?.error as ApiError | undefined;
    if (body?.code) {
      return translateErrorCode(body.code, body);
    }
    if (error?.status === 0) {
      return 'Le serveur est injoignable. Vérifiez qu’il est démarré, puis réessayez.';
    }
    return 'Enregistrement impossible. Réessayez.';
  }
}
