import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CLASSROOM_DATA_SOURCE, TEACHER_DATA_SOURCE } from '@core/datasource/data-source';
import { Classroom, StudentSummary } from '@core/models/domain.models';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

@Component({
  selector: 'eduops-teacher-classes',
  standalone: true,
  imports: [CommonModule, AvatarComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="title">Mes classes</h1>

    @if (loading()) {
      <eduops-loading-state />
    } @else {
      @if (selected(); as classroom) {
      <button type="button" class="btn btn--ghost btn--sm" (click)="selected.set(null)">
        ‹ Toutes mes classes
      </button>
      <h2 class="subtitle">{{ classroom.name }}</h2>
      <ul class="students">
        @for (student of students(); track student.id) {
          <li class="student">
            <eduops-avatar [name]="student.fullName" size="sm" />
            <div>
              <p class="student__name">{{ student.fullName }}</p>
              <p class="student__meta numeric">{{ student.studentNumber }}</p>
            </div>
          </li>
        } @empty {
          <li class="empty">Aucun eleve inscrit dans cette classe.</li>
        }
      </ul>
    } @else {
      <ul class="classes">
        @for (item of classes(); track item.id) {
          <li>
            <button type="button" class="class-row card" (click)="open(item)">
              <span class="class-row__name">{{ item.name }}</span>
              <span class="class-row__meta numeric">{{ item.activeEnrollments }} eleves</span>
            </button>
          </li>
        }
      </ul>
      }
    }
  `,
  styles: [`
    .title { font-size: var(--text-xl); margin-bottom: var(--space-4); }
    .subtitle { font-size: var(--text-lg); margin: var(--space-3) 0; }
    .classes, .students { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-2); }
    .class-row {
      width: 100%; display: flex; align-items: center; justify-content: space-between;
      gap: var(--space-3); padding: var(--space-4); background: var(--surface-card);
      border: 1px solid var(--border); cursor: pointer; font: inherit; text-align: left;
    }
    .class-row__name { font-weight: 600; color: var(--text-strong); }
    .class-row__meta { font-size: var(--text-sm); color: var(--text-muted); }
    .student {
      display: flex; align-items: center; gap: var(--space-3);
      padding: var(--space-3) var(--space-4);
      background: var(--surface-card); border: 1px solid var(--border);
      border-radius: var(--radius-button);
    }
    .student__name { margin: 0; font-weight: 600; color: var(--text-strong); }
    .student__meta { margin: 0; font-size: var(--text-xs); color: var(--text-muted); }
    .empty { text-align: center; color: var(--text-muted); padding: var(--space-8) 0; }
  `]
})
export class TeacherClassesComponent implements OnInit {
  private readonly teachers = inject(TEACHER_DATA_SOURCE);
  private readonly classrooms = inject(CLASSROOM_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly classes = signal<Classroom[]>([]);
  readonly students = signal<StudentSummary[]>([]);
  readonly selected = signal<Classroom | null>(null);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.teachers.myClasses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (classes) => {
        this.classes.set(classes);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  open(classroom: Classroom): void {
    this.selected.set(classroom);
    this.loading.set(true);
    this.classrooms.getStudents(classroom.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (students) => {
          this.students.set(students);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
  }
}
