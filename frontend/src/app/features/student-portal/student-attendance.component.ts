import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentAttendanceData } from '@core/models/student-portal.models';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

/** L'état des présences de l'élève (lecture seule). */
@Component({
  selector: 'eduops-student-attendance',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent, ErrorStateComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-attendance.component.html',
  styleUrl: './student-attendance.component.scss'
})
export class StudentAttendanceComponent implements OnInit {
  private readonly dataSource = inject(STUDENT_PORTAL_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly data = signal<StudentAttendanceData | null>(null);
  readonly loading = signal(true);
  readonly loadFailed = signal(false);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.loadFailed.set(false);
    this.dataSource.attendance().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => { this.data.set(data); this.loading.set(false); },
      error: () => { this.data.set(null); this.loadFailed.set(true); this.loading.set(false); }
    });
  }

  dateLabel(iso: string): string {
    return new Date(iso).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' });
  }

  /** Trace la tonalité visuelle d'un statut de présence. */
  toneOf(status: string): string {
    switch (status) {
      case 'PRESENT': case 'LEFT_EARLY': return 'ok';
      case 'ABSENT': case 'EXCUSED_ABSENCE': return 'absent';
      case 'LATE': case 'EXCUSED_LATE': return 'late';
      default: return 'neutral';
    }
  }
}