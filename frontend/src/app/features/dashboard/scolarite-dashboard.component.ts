import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, forkJoin, of } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import {
  ADMISSION_DATA_SOURCE, ENROLLMENT_DATA_SOURCE, FAMILY_REQUEST_DATA_SOURCE,
  STUDENT_DATA_SOURCE
} from '@core/datasource/data-source';
import { PERMISSIONS } from '@core/models/auth.models';
import { Enrollment, StudentSummary } from '@core/models/domain.models';
import { PageResponse } from '@core/models/common.models';
import { Admission } from '@core/models/admission.models';
import { FamilyRequestBoard } from '@core/models/family-request.models';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

const emptyPage = <T>(): PageResponse<T> => ({
  content: [], page: 0, size: 5, totalElements: 0, totalPages: 0,
  first: true, last: true
});

@Component({
  selector: 'eduops-scolarite-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ErrorStateComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scolarite-dashboard.component.html',
  styleUrl: './scolarite-dashboard.component.scss'
})
export class ScolariteDashboardComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly studentSource = inject(STUDENT_DATA_SOURCE);
  private readonly enrollmentSource = inject(ENROLLMENT_DATA_SOURCE);
  private readonly admissionSource = inject(ADMISSION_DATA_SOURCE);
  private readonly requestSource = inject(FAMILY_REQUEST_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly activeStudents = signal<PageResponse<StudentSummary> | null>(null);
  readonly pendingEnrollments = signal<PageResponse<Enrollment> | null>(null);
  readonly recentAdmissions = signal<PageResponse<Admission> | null>(null);
  readonly admissionsSubmitted = signal<number | null>(null);
  readonly admissionsUnderReview = signal<number | null>(null);
  readonly familyRequests = signal<FamilyRequestBoard | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly lastRefresh = signal<Date | null>(null);

  readonly canViewAdmissions = this.auth.has(PERMISSIONS.ADMISSION_VIEW);
  readonly canViewEnrollments = this.auth.has(PERMISSIONS.ENROLLMENT_VIEW);
  readonly canViewRequests = this.auth.has(PERMISSIONS.DOCUMENT_VIEW);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);

    forkJoin({
      students: this.studentSource.search({ page: 0, size: 1, status: 'ACTIVE' })
        .pipe(catchError(() => of(null))),
      enrollments: this.canViewEnrollments
        ? this.enrollmentSource.search({ page: 0, size: 5, status: 'PENDING', sort: 'enrollmentDate,asc' })
          .pipe(catchError(() => of(null)))
        : of(null),
      admissions: this.canViewAdmissions
        ? this.admissionSource.search({ page: 0, size: 5, sort: 'createdAt,desc' })
          .pipe(catchError(() => of(null)))
        : of(null),
      submitted: this.canViewAdmissions
        ? this.admissionSource.search({ page: 0, size: 1, status: 'SUBMITTED' })
          .pipe(catchError(() => of(null)))
        : of(null),
      underReview: this.canViewAdmissions
        ? this.admissionSource.search({ page: 0, size: 1, status: 'UNDER_REVIEW' })
          .pipe(catchError(() => of(null)))
        : of(null),
      requests: this.canViewRequests
        ? this.requestSource.board({}).pipe(catchError(() => of(null)))
        : of(null)
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ students, enrollments, admissions, submitted, underReview, requests }) => {
        this.activeStudents.set(students);
        this.pendingEnrollments.set(enrollments);
        this.recentAdmissions.set(admissions);
        this.admissionsSubmitted.set(submitted?.totalElements ?? null);
        this.admissionsUnderReview.set(underReview?.totalElements ?? null);
        this.familyRequests.set(requests);
        this.error.set(students === null && enrollments === null && admissions === null);
        this.loading.set(false);
        this.lastRefresh.set(new Date());
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  get admissionsToReview(): number | null {
    const submitted = this.admissionsSubmitted();
    const underReview = this.admissionsUnderReview();
    return submitted === null || underReview === null ? null : submitted + underReview;
  }

  get openFamilyRequestCount(): number | null {
    const board = this.familyRequests();
    return board ? board.newCount + board.inProgressCount + board.waitingFamilyCount + board.readyCount : null;
  }

  enrollmentTrack(_: number, enrollment: Enrollment): string {
    return enrollment.id;
  }

  admissionTrack(_: number, admission: Admission): string {
    return admission.id;
  }

  admissionStatusLabel(status: Admission['status']): string {
    const labels: Record<Admission['status'], string> = {
      DRAFT: 'Brouillon', SUBMITTED: 'À examiner', UNDER_REVIEW: 'En étude',
      TESTED: 'Test passé', ACCEPTED: 'Acceptée', WAITLISTED: 'Liste d’attente',
      REJECTED: 'Refusée', WITHDRAWN: 'Retirée', CONVERTED: 'Inscrite'
    };
    return labels[status];
  }
}
