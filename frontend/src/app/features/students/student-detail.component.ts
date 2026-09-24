import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { StudentStatement, StudentStatementService } from '@core/services/student-statement.service';
import { renderStudentStatement } from './student-statement-print';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { Enrollment, StudentDetail } from '@core/models/domain.models';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { StatusLabelPipe } from '@shared/pipes/status-label.pipe';

/**
 * Student file. Answers, in one screen, the questions of section 97:
 * who is this pupil, which class, which guardians, what attendance,
 * what marks, what is still owed.
 */
@Component({
  selector: 'eduops-student-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule, AvatarComponent, StatusBadgeComponent,
    LoadingStateComponent, ErrorStateComponent, MoneyPipe, StatusLabelPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit {
  /** Bound from the route parameter via withComponentInputBinding(). */
  @Input({ required: true }) id!: string;

  private readonly dataSource = inject(STUDENT_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly notifications = inject(NotificationService);
  private readonly statements = inject(StudentStatementService);
  readonly canEdit = computed(() => this.auth.has(PERMISSIONS.STUDENT_UPDATE));
  readonly canStatement = computed(() => this.auth.has(PERMISSIONS.FINANCE_VIEW) && this.auth.has(PERMISSIONS.PAYMENT_VIEW));
  readonly editing = signal(false);
  readonly saving = signal(false);
  readonly printing = signal(false);
  readonly statement = signal<StudentStatement | null>(null);
  readonly statementLoading = signal(false);
  readonly statementError = signal(false);
  readonly maxBirthDate = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  readonly editForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(80)]],
    lastName: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(80)]],
    middleName: ['', Validators.maxLength(80)],
    gender: ['MALE' as StudentDetail['gender'], Validators.required],
    birthDate: ['', [Validators.required, (control: AbstractControl) => control.value && control.value > this.maxBirthDate ? { past: true } : null]],
    birthPlace: ['', Validators.maxLength(120)], nationality: ['', Validators.maxLength(80)],
    email: ['', [Validators.email, Validators.maxLength(160)]], phone: ['', Validators.maxLength(40)],
    address: ['', Validators.maxLength(200)], city: ['', Validators.maxLength(120)],
    previousSchool: ['', Validators.maxLength(160)]
  });

  openEdit(): void {
    const student = this.student();
    if (!student || !this.canEdit()) return;
    this.editForm.reset({ firstName: student.firstName, lastName: student.lastName,
      middleName: student.middleName ?? '', gender: student.gender, birthDate: student.birthDate,
      birthPlace: student.birthPlace ?? '', nationality: student.nationality ?? '',
      email: student.email ?? '', phone: student.phone ?? '', address: student.addressLine1 ?? '',
      city: student.city ?? '', previousSchool: student.previousSchool ?? '' });
    this.editing.set(true);
  }

  canLeave(): boolean {
    return !this.saving() && (!this.editing() || !this.editForm.dirty
      || window.confirm('Abandonner les modifications non enregistrées ?'));
  }
  cancelEdit(): void { if (this.canLeave()) this.editing.set(false); }

  save(): void {
    if (!this.canEdit() || this.saving()) return;
    if (this.editForm.invalid) { this.editForm.markAllAsTouched(); return; }
    const value = this.editForm.getRawValue();
    this.saving.set(true);
    this.dataSource.update(this.id, { ...value, version: this.student()?.version,
      firstName: value.firstName.trim(), lastName: value.lastName.trim(), email: value.email.trim()
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: student => {
        this.student.set(student); this.saving.set(false); this.editing.set(false);
        this.editForm.markAsPristine(); this.statement.set(null);
        this.notifications.success('Les informations de l’élève ont été mises à jour.');
      }, error: err => {
        this.saving.set(false);
        this.notifications.error(translateErrorCode(err?.error?.code ?? 'INTERNAL_ERROR'));
      }
    });
  }

  openFinance(): void {
    this.activeTab.set('finance');
    if (this.canStatement() && !this.statement() && !this.statementLoading()) this.loadStatement();
  }

  loadStatement(): void {
    if (!this.canStatement()) return;
    this.statementLoading.set(true); this.statementError.set(false);
    this.statements.get(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: value => { this.statement.set(value); this.statementLoading.set(false); },
      error: () => { this.statementError.set(true); this.statementLoading.set(false); }
    });
  }

  printStatement(): void {
    if (!this.canStatement() || this.printing() || this.editing()) return;
    const preview = window.open('', '_blank');
    if (!preview) { this.notifications.error('Autorisez les fenêtres contextuelles pour imprimer la fiche.'); return; }
    preview.document.body.textContent = 'Préparation de la fiche de l’élève…';
    this.printing.set(true);
    this.statements.get(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: value => {
        this.printing.set(false); this.statement.set(value);
        if (preview.closed) return;
        renderStudentStatement(preview.document, value);
        preview.focus(); preview.setTimeout(() => { if (!preview.closed) preview.print(); }, 200);
      }, error: () => {
        this.printing.set(false); preview.close();
        this.notifications.error('Impossible de préparer la fiche complète. Réessayez.');
      }
    });
  }

  readonly student = signal<StudentDetail | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly history = signal<Enrollment[]>([]);
  readonly historyLoading = signal(false);
  readonly historyError = signal(false);
  private historyLoaded = false;

  openAcademic(): void {
    this.activeTab.set('academic');
    if (!this.historyLoaded && !this.historyLoading()) this.loadHistory();
  }

  loadHistory(): void {
    this.historyLoading.set(true);
    this.historyError.set(false);
    this.dataSource.getEnrollments(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: rows => {
        this.history.set(rows);
        this.historyLoaded = true;
        this.historyLoading.set(false);
      },
      error: () => {
        this.historyError.set(true);
        this.historyLoading.set(false);
      }
    });
  }
  readonly activeTab = signal<'identity' | 'academic' | 'attendance' | 'finance'>('identity');

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.getById(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (student) => {
        this.student.set(student);
        this.loading.set(false);
        if (this.route.snapshot.queryParamMap.get('edit') === 'true') this.openEdit();
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }
}
