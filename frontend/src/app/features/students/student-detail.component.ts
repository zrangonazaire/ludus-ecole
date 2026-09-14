import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
    CommonModule, RouterLink, AvatarComponent, StatusBadgeComponent,
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
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }
}
