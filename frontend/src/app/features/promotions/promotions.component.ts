import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ENROLLMENT_DATA_SOURCE, CLASSROOM_DATA_SOURCE, REFERENCE_DATA_SOURCE } from '@core/datasource/data-source';
import { AcademicYear, Classroom, Enrollment } from '@core/models/domain.models';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

interface PromotionRow extends Enrollment {
  targetClassroomId: string;
}

@Component({
  selector: 'eduops-promotions',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss'
})
export class PromotionsComponent implements OnInit {
  private readonly enrollmentSource = inject(ENROLLMENT_DATA_SOURCE);
  private readonly classroomSource = inject(CLASSROOM_DATA_SOURCE);
  private readonly referenceSource = inject(REFERENCE_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly years = signal<AcademicYear[]>([]);
  readonly classrooms = signal<Classroom[]>([]);
  readonly rows = signal<PromotionRow[]>([]);
  readonly targetYearId = signal('');
  readonly search = signal('');
  readonly canCreate = computed(() => this.auth.has(PERMISSIONS.ENROLLMENT_CREATE));
  private promotionQueue: PromotionRow[] = [];

  readonly visibleRows = computed(() => {
    const term = this.search().trim().toLocaleLowerCase();
    return this.rows().filter((row) => !term
      || `${row.studentName} ${row.studentNumber} ${row.classroomName}`
        .toLocaleLowerCase().includes(term));
  });

  readonly selectedCount = computed(() =>
    this.rows().filter((row) => !!row.targetClassroomId).length);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    forkJoin({
      enrollments: this.enrollmentSource.search({ page: 0, size: 200, status: 'ACTIVE' }),
      years: this.referenceSource.academicYears(),
      classrooms: this.classroomSource.list()
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.years.set(data.years);
        const activeYear = data.years.find((year) => year.status === 'ACTIVE') ?? data.years[0];
        const targetYear = data.years.find((year) => year.startDate > (activeYear?.startDate ?? ''));
        this.targetYearId.set(targetYear?.id ?? activeYear?.id ?? '');
        this.classrooms.set(data.classrooms);
        this.rows.set(data.enrollments.content.map((enrollment) => ({
          ...enrollment,
          targetClassroomId: ''
        })));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  classroomsForTarget(): Classroom[] {
    const yearId = this.targetYearId();
    return this.classrooms().filter((classroom) => classroom.status === 'ACTIVE'
      && (!yearId || classroom.academicYearId === yearId));
  }

  setTarget(row: PromotionRow, classroomId: string): void {
    this.rows.update((items) => items.map((item) => item.id === row.id
      ? { ...item, targetClassroomId: classroomId } : item));
  }

  promote(row: PromotionRow, continueQueue = false): void {
    if (!this.canCreate() || !row.targetClassroomId || this.saving()) {
      return;
    }
    this.saving.set(true);
    this.enrollmentSource.create({
      studentId: row.studentId,
      academicYearId: this.targetYearId(),
      classroomId: row.targetClassroomId,
      enrollmentKind: 'RE_ENROLLMENT',
      repeating: false,
      validateImmediately: true,
      idempotencyKey: `promotion-${row.studentId}-${this.targetYearId()}`
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (created) => {
        this.saving.set(false);
        this.rows.update((items) => items.filter((item) => item.id !== row.id));
        this.notifications.success(
          `${created.studentName} est inscrit pour ${created.academicYearCode}.`,
          'Réinscription enregistrée');
        if (continueQueue) {
          this.processPromotionQueue();
        }
      },
      error: () => {
        this.saving.set(false);
        this.promotionQueue = [];
      }
    });
  }

  promoteSelected(): void {
    this.promotionQueue = this.rows().filter((row) => !!row.targetClassroomId);
    this.processPromotionQueue();
  }

  private processPromotionQueue(): void {
    const next = this.promotionQueue.shift();
    if (!next) {
      this.saving.set(false);
      return;
    }
    this.promote(next, true);
  }
}
