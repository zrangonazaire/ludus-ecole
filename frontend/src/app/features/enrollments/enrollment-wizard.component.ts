import { createUuid } from "../../core/utils/uuid";
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CLASSROOM_DATA_SOURCE, ENROLLMENT_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { Classroom, EnrollmentCheckResult, StudentSummary } from '@core/models/domain.models';
import { ImportPreview } from '@core/models/import.models';
import { StudentImportService } from '@core/services/student-import.service';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { translateErrorCode } from '@core/services/error-messages';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';

/** Les trois façons réelles d'inscrire un élève. */
export type EnrollmentMode = 'NEW' | 'RETURNING' | 'IMPORT';

@Component({
  selector: 'eduops-enrollment-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,
    AvatarComponent, StatusBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './enrollment-wizard.component.html',
  styleUrl: './enrollment-wizard.component.scss'
})
export class EnrollmentWizardComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly students = inject(STUDENT_DATA_SOURCE);
  private readonly classrooms = inject(CLASSROOM_DATA_SOURCE);
  private readonly enrollments = inject(ENROLLMENT_DATA_SOURCE);
  private readonly importService = inject(StudentImportService);
  private readonly notifications = inject(NotificationService);
  private readonly setupStatus = inject(SetupStatusService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  /** null tant que l'utilisateur n'a pas choisi son mode d'entrée. */
  readonly mode = signal<EnrollmentMode | null>(null);
  readonly step = signal(1);
  readonly submitting = signal(false);

  readonly availableClasses = signal<Classroom[]>([]);
  readonly selectedClassroom = signal<Classroom | null>(null);
  readonly checkResult = signal<EnrollmentCheckResult | null>(null);
  readonly checking = signal(false);

  // --- mode réinscription ---
  readonly candidates = signal<StudentSummary[]>([]);
  readonly selectedStudent = signal<StudentSummary | null>(null);

  // --- mode import ---
  readonly preview = signal<ImportPreview | null>(null);
  readonly importReport = signal<ImportPreview | null>(null);
  readonly analysing = signal(false);
  readonly dragging = signal(false);

  /** Dérogation de capacité : permission + justification, toutes deux auditées. */
  overrideRequested = false;
  overrideReason = '';

  /** Une clé par session d'assistant : un double clic n'inscrit qu'une fois. */
  private readonly idempotencyKey = createUuid();

  readonly identity = this.fb.nonNullable.group({
    lastName: ['', [Validators.required, Validators.maxLength(120)]],
    firstName: ['', [Validators.required, Validators.maxLength(120)]],
    gender: ['FEMALE', [Validators.required]],
    birthDate: ['', [Validators.required]],
    birthPlace: [''],
    nationality: ['Ivoirienne'],
    previousSchool: ['']
  });

  readonly guardian = this.fb.nonNullable.group({
    lastName: ['', [Validators.required, Validators.maxLength(120)]],
    firstName: ['', [Validators.required, Validators.maxLength(120)]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.email]],
    relationship: ['MOTHER', [Validators.required]],
    financialResponsibility: [true]
  });

  ngOnInit(): void {
    this.classrooms.list().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((list) => this.availableClasses.set(list));
  }

  // ------------------------------------------------------------- navigation

  chooseMode(mode: EnrollmentMode): void {
    this.mode.set(mode);
    this.step.set(1);
  }

  backToModes(): void {
    this.mode.set(null);
    this.step.set(1);
    this.preview.set(null);
    this.importReport.set(null);
    this.selectedStudent.set(null);
    this.selectedClassroom.set(null);
    this.checkResult.set(null);
  }

  next(): void {
    this.step.update((s) => s + 1);
  }

  back(): void {
    this.step.update((s) => Math.max(1, s - 1));
  }

  /** Libellés des étapes, propres à chaque mode. */
  readonly stepLabels = computed<string[]>(() => {
    switch (this.mode()) {
      case 'NEW': return ['Identité', 'Responsable', 'Classe', 'Confirmation'];
      case 'RETURNING': return ['Élève', 'Classe', 'Confirmation'];
      case 'IMPORT': return ['Modèle', 'Dépôt', 'Vérification', 'Import'];
      default: return [];
    }
  });

  // --------------------------------------------------------- élève existant

  searchStudents(term: string): void {
    if (term.trim().length < 2) {
      this.candidates.set([]);
      return;
    }
    this.students.search({ page: 0, size: 8, search: term })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((page) => this.candidates.set(page.content));
  }

  chooseStudent(student: StudentSummary): void {
    this.selectedStudent.set(student);
    this.next();
  }

  // ------------------------------------------------------------------ classe

  chooseClassroom(classroom: Classroom): void {
    this.selectedClassroom.set(classroom);
    const student = this.selectedStudent();
    if (student) {
      this.runCheck(student.id, classroom.id);
    } else {
      // Élève pas encore créé : seule la capacité est vérifiable maintenant.
      this.checkResult.set({
        allowed: classroom.availableSeats > 0,
        blockers: classroom.availableSeats > 0 ? [] : ['CLASS_CAPACITY_EXCEEDED'],
        warnings: classroom.capacityStatus === 'WARNING' ? ['CLASS_CAPACITY_WARNING'] : [],
        capacityMaximum: classroom.capacityMaximum,
        occupiedSeats: classroom.activeEnrollments,
        availableSeats: classroom.availableSeats,
        projectedAvailableSeats: classroom.projectedAvailableSeats ?? classroom.availableSeats
      });
    }
  }

  private runCheck(studentId: string, classroomId: string): void {
    this.checking.set(true);
    this.enrollments.check(studentId, classroomId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.checkResult.set(result);
          this.checking.set(false);
        },
        error: () => this.checking.set(false)
      });
  }

  blockerMessage(code: string): string {
    return translateErrorCode(code);
  }

  canOverride(): boolean {
    const result = this.checkResult();
    return !!result && result.blockers.length === 1
        && result.blockers[0] === 'CLASS_CAPACITY_EXCEEDED';
  }

  canSubmit(): boolean {
    const result = this.checkResult();
    if (!result || !this.selectedClassroom()) {
      return false;
    }
    if (this.mode() === 'NEW' && (this.identity.invalid || this.guardian.invalid)) {
      return false;
    }
    if (this.mode() === 'RETURNING' && !this.selectedStudent()) {
      return false;
    }
    if (result.allowed) {
      return true;
    }
    return this.canOverride() && this.overrideRequested
        && this.overrideReason.trim().length >= 10;
  }

  submit(): void {
    if (!this.canSubmit() || this.submitting()) {
      return;
    }
    this.submitting.set(true);

    const payload = {
      studentId: this.selectedStudent()?.id,
      newStudent: this.mode() === 'NEW' ? {
        ...this.identity.getRawValue(),
        guardian: this.guardian.getRawValue()
      } : undefined,
      classroomId: this.selectedClassroom()!.id,
      enrollmentKind: this.mode() === 'RETURNING' ? 'RE_ENROLLMENT' : 'NEW',
      validateImmediately: true,
      overCapacityOverride: this.overrideRequested,
      overCapacityReason: this.overrideRequested ? this.overrideReason : undefined,
      idempotencyKey: this.idempotencyKey
    };

    this.enrollments.create(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (enrollment) => {
          this.notifications.success(
            `${enrollment.studentName} est inscrit(e) en ${enrollment.classroomName}.`,
            `Inscription ${enrollment.enrollmentNumber}`);
          this.setupStatus.refresh();
          void this.router.navigate(['/enrollments']);
        },
        error: () => this.submitting.set(false)
      });
  }

  // ------------------------------------------------------------------ import

  downloadTemplate(): void {
    this.importService.downloadTemplate();
    this.notifications.info(
      'Remplissez une ligne par élève, puis déposez le fichier à l\'étape suivante.');
    this.next();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(true);
  }

  onDragLeave(): void {
    this.dragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.analyseFile(file);
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.analyseFile(file);
    }
  }

  private analyseFile(file: File): void {
    this.analysing.set(true);
    this.importService.analyse(file)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (preview) => {
          this.preview.set(preview);
          this.analysing.set(false);
          this.step.set(3);
        },
        error: () => this.analysing.set(false)
      });
  }

  confirmImport(): void {
    const preview = this.preview();
    if (!preview || this.submitting()) {
      return;
    }
    this.submitting.set(true);
    this.importService.confirm(preview.batchId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (report) => {
          this.importReport.set(report);
          this.submitting.set(false);
          this.step.set(4);
          this.setupStatus.refresh();
          this.notifications.success(
            `${report.validRows} élève(s) créé(s) et inscrit(s).`, 'Import terminé');
        },
        error: () => this.submitting.set(false)
      });
  }

  rowTone(status: string): 'success' | 'warning' | 'danger' | 'neutral' {
    switch (status) {
      case 'VALID': return 'success';
      case 'WARNING': return 'warning';
      case 'DUPLICATE': return 'neutral';
      default: return 'danger';
    }
  }

  rowLabel(status: string): string {
    switch (status) {
      case 'VALID': return 'Prêt';
      case 'WARNING': return 'À vérifier';
      case 'DUPLICATE': return 'Doublon';
      default: return 'Erreur';
    }
  }

  /** Colonnes réellement présentes dans le fichier déposé. */
  readonly previewColumns = computed<string[]>(() => {
    const rows = this.preview()?.rows ?? [];
    const keys = new Set<string>();
    rows.forEach((r) => Object.keys(r.values).forEach((k) => keys.add(k)));
    return Array.from(keys).slice(0, 5);
  });

  /** Nom affiché dans le panneau latéral, au fur et à mesure de la saisie. */
  readonly draftName = computed(() => {
    const student = this.selectedStudent();
    if (student) {
      return student.fullName;
    }
    const { firstName, lastName } = this.identity.getRawValue();
    return `${firstName} ${lastName}`.trim();
  });
}
