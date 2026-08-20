import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CLASSROOM_DATA_SOURCE, ENROLLMENT_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { Classroom, EnrollmentCheckResult, StudentSummary } from '@core/models/domain.models';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';

/**
 * Enrollment wizard: student -> class -> server-side pre-check -> confirmation.
 *
 * The pre-check step calls `GET /enrollments/check`, which returns every blocker
 * at once (full class, existing enrollment, closed window) so the registrar is
 * never surprised at submit time. The submit itself carries an idempotency key
 * so a double click cannot create two enrollments (rule 13).
 */
@Component({
  selector: 'eduops-enrollment-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusBadgeComponent, AvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './enrollment-wizard.component.html',
  styleUrl: './enrollment-wizard.component.scss'
})
export class EnrollmentWizardComponent implements OnInit {
  private readonly students = inject(STUDENT_DATA_SOURCE);
  private readonly classrooms = inject(CLASSROOM_DATA_SOURCE);
  private readonly enrollments = inject(ENROLLMENT_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly step = signal<1 | 2 | 3>(1);
  readonly candidates = signal<StudentSummary[]>([]);
  readonly availableClasses = signal<Classroom[]>([]);
  readonly selectedStudent = signal<StudentSummary | null>(null);
  readonly selectedClassroom = signal<Classroom | null>(null);
  readonly checkResult = signal<EnrollmentCheckResult | null>(null);
  readonly checking = signal(false);
  readonly submitting = signal(false);

  /** Populated only when the registrar explicitly asks to exceed the capacity. */
  overrideRequested = false;
  overrideReason = '';

  /** Generated once per wizard session; makes the submit idempotent. */
  private readonly idempotencyKey = crypto.randomUUID();

  ngOnInit(): void {
    this.classrooms.list().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((classes) => this.availableClasses.set(classes));
  }

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
    this.step.set(2);
  }

  chooseClassroom(classroom: Classroom): void {
    this.selectedClassroom.set(classroom);
    this.runCheck();
  }

  /** Asks the server whether this enrollment is possible, and why not. */
  runCheck(): void {
    const student = this.selectedStudent();
    const classroom = this.selectedClassroom();
    if (!student || !classroom) {
      return;
    }
    this.checking.set(true);
    this.enrollments.check(student.id, classroom.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.checkResult.set(result);
          this.checking.set(false);
          this.step.set(3);
        },
        error: () => this.checking.set(false)
      });
  }

  blockerMessage(code: string): string {
    return translateErrorCode(code);
  }

  /** True when the only blocker is the capacity, which a permission may override. */
  canOverride(): boolean {
    const result = this.checkResult();
    return !!result
      && result.blockers.length === 1
      && result.blockers[0] === 'CLASS_CAPACITY_EXCEEDED';
  }

  canSubmit(): boolean {
    const result = this.checkResult();
    if (!result) {
      return false;
    }
    if (result.allowed) {
      return true;
    }
    return this.canOverride() && this.overrideRequested && this.overrideReason.trim().length >= 10;
  }

  submit(): void {
    if (!this.canSubmit() || this.submitting()) {
      return;
    }
    this.submitting.set(true);
    this.enrollments
      .create({
        studentId: this.selectedStudent()!.id,
        classroomId: this.selectedClassroom()!.id,
        enrollmentKind: 'NEW',
        validateImmediately: true,
        overCapacityOverride: this.overrideRequested,
        overCapacityReason: this.overrideRequested ? this.overrideReason : undefined,
        idempotencyKey: this.idempotencyKey
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (enrollment) => {
          this.notifications.success(
            `${enrollment.studentName} est inscrit(e) en ${enrollment.classroomName}.`,
            `Inscription ${enrollment.enrollmentNumber}`);
          void this.router.navigate(['/enrollments']);
        },
        error: () => this.submitting.set(false)
      });
  }

  back(): void {
    this.step.update((current) => (current > 1 ? ((current - 1) as 1 | 2) : 1));
  }
}
