import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ATTENDANCE_DATA_SOURCE, TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { AttendanceSheet, Classroom } from '@core/models/domain.models';
import { AttendanceStatus } from '@core/models/common.models';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { NotificationService } from '@core/services/notification.service';

/**
 * Attendance taking (section 30).
 *
 * Flow: pick class -> pick course -> student list -> mark -> submit ->
 * server-side validation -> record.
 *
 * The submit carries an idempotency key so a flaky connection or an offline
 * replay cannot register the sheet twice (sections 69 and 80). Nothing is
 * considered final until the server confirms.
 */
@Component({
  selector: 'eduops-teacher-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, AvatarComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './teacher-attendance.component.html',
  styleUrl: './teacher-attendance.component.scss'
})
export class TeacherAttendanceComponent implements OnInit {
  private readonly teachers = inject(TEACHER_DATA_SOURCE);
  private readonly attendance = inject(ATTENDANCE_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  readonly classes = signal<Classroom[]>([]);
  readonly sheet = signal<AttendanceSheet | null>(null);
  readonly loading = signal(true);
  readonly submitting = signal(false);
  readonly submitted = signal(false);

  readonly today = new Date().toISOString().slice(0, 10);

  /** One key per opened sheet: replaying the submit is safe. */
  private idempotencyKey = crypto.randomUUID();

  readonly counters = computed(() => {
    const records = this.sheet()?.records ?? [];
    return {
      present: records.filter((r) => r.status === 'PRESENT').length,
      absent: records.filter((r) => r.status === 'ABSENT' || r.status === 'EXCUSED_ABSENCE').length,
      late: records.filter((r) => r.status === 'LATE' || r.status === 'EXCUSED_LATE').length,
      total: records.length
    };
  });

  ngOnInit(): void {
    this.teachers.myClasses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (classes) => {
        this.classes.set(classes);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  openSheet(classroom: Classroom): void {
    this.loading.set(true);
    this.submitted.set(false);
    this.idempotencyKey = crypto.randomUUID();
    this.attendance.openSheet(classroom.id, this.today)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (sheet) => {
          this.sheet.set(sheet);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
  }

  mark(studentId: string, status: AttendanceStatus): void {
    this.sheet.update((current) => {
      if (!current) {
        return current;
      }
      return {
        ...current,
        records: current.records.map((record) =>
          record.studentId === studentId
            ? {
                ...record,
                status,
                arrivalTime: status === 'LATE'
                  ? new Date().toTimeString().slice(0, 5)
                  : undefined
              }
            : record)
      };
    });
  }

  /** Marks everyone present, the usual starting point of a roll call. */
  markAllPresent(): void {
    this.sheet.update((current) => current
      ? { ...current, records: current.records.map((r) => ({ ...r, status: 'PRESENT' as const })) }
      : current);
  }

  submit(): void {
    const sheet = this.sheet();
    if (!sheet || this.submitting()) {
      return;
    }
    this.submitting.set(true);
    this.attendance.submitSheet(sheet, this.idempotencyKey)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (saved) => {
          this.sheet.set(saved);
          this.submitting.set(false);
          this.submitted.set(true);
          const counters = this.counters();
          this.notifications.success(
            `Feuille enregistree : ${counters.present} presents, ${counters.absent} absents, `
            + `${counters.late} retards. Les parents concernes seront notifies.`,
            'Appel valide');
        },
        error: () => this.submitting.set(false)
      });
  }

  close(): void {
    this.sheet.set(null);
    this.submitted.set(false);
  }
}
