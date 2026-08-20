import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CLASSROOM_DATA_SOURCE } from '@core/datasource/data-source';
import { Classroom } from '@core/models/domain.models';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

/**
 * Classes overview.
 *
 * Occupancy is displayed exactly as the backend computed it: available seats
 * are derived from active enrollments (rule 9) and never entered by a user.
 */
@Component({
  selector: 'eduops-class-list',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.scss'
})
export class ClassListComponent implements OnInit {
  private readonly dataSource = inject(CLASSROOM_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly classes = signal<Classroom[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (classes) => {
        this.classes.set(classes);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  /** Bar colour follows the same thresholds as the backend capacity status. */
  gaugeTone(classroom: Classroom): string {
    switch (classroom.capacityStatus) {
      case 'OVER_CAPACITY':
      case 'FULL':
        return 'var(--danger)';
      case 'WARNING':
        return 'var(--warning)';
      default:
        return 'var(--success)';
    }
  }
}
