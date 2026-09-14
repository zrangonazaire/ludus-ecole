import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentGradesData } from '@core/models/student-portal.models';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { GradePipe } from '@shared/pipes/grade.pipe';

/**
 * Les notes publiées de l'élève, groupées par matière, avec la moyenne de
 * la période en cours (lecture seule).
 */
@Component({
  selector: 'eduops-student-grades',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent, ErrorStateComponent,
    LoadingStateComponent, GradePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-grades.component.html',
  styleUrl: './student-grades.component.scss'
})
export class StudentGradesComponent implements OnInit {
  private readonly dataSource = inject(STUDENT_PORTAL_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly data = signal<StudentGradesData | null>(null);
  readonly loading = signal(true);
  readonly loadFailed = signal(false);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.loadFailed.set(false);
    this.dataSource.grades().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => { this.data.set(data); this.loading.set(false); },
      error: () => { this.data.set(null); this.loadFailed.set(true); this.loading.set(false); }
    });
  }

  publishedAt(iso: string): string {
    return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  }
}