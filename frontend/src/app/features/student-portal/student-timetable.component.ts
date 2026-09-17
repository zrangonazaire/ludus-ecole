import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentTimetableCourse, StudentTimetableData } from '@core/models/student-portal.models';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

/** L'emploi du temps de la classe de l'élève (lecture seule). */
interface StudentPrintPage {
  schoolName: string;
  termLabel: string;
  label: string;
  days: { date: string; courses: StudentTimetableCourse[] }[];
  totalMinutes: number;
  totalHours: number;
}

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
  readonly schoolName = signal<string>(environment.schoolName ?? 'Établissement');

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

  print(): void {
    setTimeout(() => window.print(), 50);
  }

  readonly printPages = computed<StudentPrintPage[]>(() => {
    const emp = this.data();
    if (!emp) return [];
    const days = emp.days || [];
    const allCourses = days.flatMap(d => d.courses || []);
    const totalMinutes = allCourses.reduce((acc, c) => acc + this.durationOf(c), 0);
    return [{
      schoolName: this.schoolName(),
      termLabel: emp.termLabel,
      label: 'Semaine du ' + this.dateRangeLabel(days),
      days,
      totalMinutes,
      totalHours: Math.round(totalMinutes / 60 * 10) / 10
    }];
  });

  readonly generatedDate = computed(() => {
    return new Date().toLocaleString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  });

  private durationOf(course: StudentTimetableCourse): number {
    const start = new Date(course.startsAt).getTime();
    const end = new Date(course.endsAt).getTime();
    return Math.round((end - start) / 60000);
  }

  private dateRangeLabel(days: { date: string }[]): string {
    if (days.length === 0) return '';
    const first = new Date(days[0].date + 'T00:00:00');
    const last = new Date(days[days.length - 1].date + 'T00:00:00');
    const fmt = (d: Date) => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    return fmt(first) + (first.toDateString() === last.toDateString() ? '' : ' au ' + fmt(last));
  }
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
