import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import {
  StudentAnnouncementCategory, StudentDashboard, StudentDashboardCourse
} from '@core/models/student-portal.models';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { GradePipe } from '@shared/pipes/grade.pipe';

@Component({
  selector: 'eduops-student-home',
  standalone: true,
  imports: [
    CommonModule, RouterLink, AvatarComponent, ErrorStateComponent,
    LoadingStateComponent, GradePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.scss'
})
export class StudentHomeComponent implements OnInit {
  private readonly dataSource = inject(STUDENT_PORTAL_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly dashboard = signal<StudentDashboard | null>(null);
  readonly loading = signal(true);
  readonly loadFailed = signal(false);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.loadFailed.set(false);

    this.dataSource.dashboard().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (dashboard) => {
        this.dashboard.set(dashboard);
        this.loading.set(false);
      },
      error: () => {
        this.dashboard.set(null);
        this.loadFailed.set(true);
        this.loading.set(false);
      }
    });
  }

  today(): string {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long'
    });
  }

  courseDay(course: StudentDashboardCourse): string {
    const date = new Date(course.startsAt);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    }
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' });
  }

  announcementLabel(category: StudentAnnouncementCategory): string {
    const labels: Record<StudentAnnouncementCategory, string> = {
      GENERAL: 'Information',
      ACADEMIC: 'Scolarité',
      EVENT: 'Événement'
    };
    return labels[category];
  }
}
