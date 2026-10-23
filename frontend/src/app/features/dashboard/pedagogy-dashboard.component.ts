import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, forkJoin, of } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import {
  ATTENDANCE_DATA_SOURCE, CLASSROOM_DATA_SOURCE, GRADE_DATA_SOURCE
} from '@core/datasource/data-source';
import { PERMISSIONS } from '@core/models/auth.models';
import { Classroom } from '@core/models/domain.models';
import { AttendanceDay } from '@core/models/attendance.models';
import { AssessmentBoard, AssessmentItem } from '@core/models/assessment.models';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

@Component({
  selector: 'eduops-pedagogy-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ErrorStateComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pedagogy-dashboard.component.html',
  styleUrl: './pedagogy-dashboard.component.scss'
})
export class PedagogyDashboardComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly classroomsSource = inject(CLASSROOM_DATA_SOURCE);
  private readonly attendanceSource = inject(ATTENDANCE_DATA_SOURCE);
  private readonly gradesSource = inject(GRADE_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly classrooms = signal<Classroom[]>([]);
  readonly attendance = signal<AttendanceDay | null>(null);
  readonly assessments = signal<AssessmentBoard | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly lastRefresh = signal<Date | null>(null);
  readonly canViewAttendance = this.auth.has(PERMISSIONS.ATTENDANCE_VIEW);
  readonly canViewAssessments = this.auth.has(PERMISSIONS.ASSESSMENT_VIEW);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    forkJoin({
      classrooms: this.classroomsSource.list().pipe(catchError(() => of(null))),
      attendance: this.canViewAttendance
        ? this.attendanceSource.day(this.localToday()).pipe(catchError(() => of(null)))
        : of(null),
      assessments: this.canViewAssessments
        ? this.gradesSource.board({}).pipe(catchError(() => of(null)))
        : of(null)
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ classrooms, attendance, assessments }) => {
        if (classrooms === null) {
          this.error.set(true);
        } else {
          this.classrooms.set(classrooms);
        }
        this.attendance.set(attendance);
        this.assessments.set(assessments);
        this.loading.set(false);
        this.lastRefresh.set(new Date());
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  get activeEnrollmentCount(): number {
    return this.classrooms().reduce((total, room) => total + room.activeEnrollments, 0);
  }

  get averageOccupancy(): number | null {
    const rooms = this.classrooms();
    if (!rooms.length) return null;
    return rooms.reduce((sum, room) => sum + room.occupancyRate, 0) / rooms.length;
  }

  get classesToWatch(): Classroom[] {
    return this.classrooms()
      .filter((room) => room.capacityStatus === 'FULL' || room.capacityStatus === 'OVER_CAPACITY'
        || room.occupancyRate >= 90)
      .sort((left, right) => right.occupancyRate - left.occupancyRate)
      .slice(0, 5);
  }

  get upcomingAssessments(): AssessmentItem[] {
    const today = this.localToday();
    return (this.assessments()?.assessments ?? [])
      .filter((item) => item.assessmentDate >= today && item.status !== 'CANCELLED')
      .sort((left, right) => left.assessmentDate.localeCompare(right.assessmentDate))
      .slice(0, 5);
  }

  get assessmentAverage(): number | null {
    const completed = (this.assessments()?.assessments ?? [])
      .filter((item) => item.classAverage !== undefined && item.classAverage !== null
        && ['VALIDATED', 'PUBLISHED'].includes(item.status));
    const weight = completed.reduce((sum, item) => sum + (item.gradedCount || 0), 0);
    if (!weight) return null;
    return completed.reduce((sum, item) => sum + (item.classAverage || 0) * (item.gradedCount || 0), 0) / weight;
  }

  classroomTrack(_: number, classroom: Classroom): string {
    return classroom.id;
  }

  assessmentTrack(_: number, assessment: AssessmentItem): string {
    return assessment.id;
  }

  localToday(): string {
    const now = new Date();
    const pad = (value: number) => String(value).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  }
}
