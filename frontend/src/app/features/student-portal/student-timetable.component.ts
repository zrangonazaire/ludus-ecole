import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentTimetableCourse, StudentTimetableData } from '@core/models/student-portal.models';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

/** L'emploi du temps de la classe de l'élève (lecture seule). */
@Component({
  selector: 'eduops-student-timetable',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent, ErrorStateComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-timetable.component.html',
  styleUrl: './student-timetable.component.scss'
})
export class StudentTimetableComponent implements OnInit {
  private readonly dataSource = inject(STUDENT_PORTAL_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly data = signal<StudentTimetableData | null>(null);
  readonly loading = signal(true);
  readonly loadFailed = signal(false);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.loadFailed.set(false);
    this.dataSource.timetable().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => { this.data.set(data); this.loading.set(false); },
      error: () => { this.data.set(null); this.loadFailed.set(true); this.loading.set(false); }
    });
  }

  isToday(day: { date: string }): boolean {
    return new Date(day.date).toDateString() === new Date().toDateString();
  }

  dayTitle(day: { date: string }): string {
    const date = new Date(day.date);
    if (date.toDateString() === new Date().toDateString()) {
      return "Aujourd'hui";
    }
    return capitalize(date.toLocaleDateString('fr-FR', { weekday: 'long' }));
  }

  courseTime(course: StudentTimetableCourse, edge: 'start' | 'end'): string {
    const date = new Date(edge === 'start' ? course.startsAt : course.endsAt);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}