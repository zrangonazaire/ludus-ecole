import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
import { CLASSROOM_DATA_SOURCE, TEACHER_DATA_SOURCE, TIMETABLE_DATA_SOURCE } from '@core/datasource/data-source';
import { Classroom, Teacher } from '@core/models/domain.models';
import {
  CONFLICT_LABELS, DAY_LABELS, PaletteEntry, SlotUpsertPayload, TimetableConflict,
  TimetableGrid, TimetableScope, TimetableSlot
} from '@core/models/timetable.models';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

interface PrintPage {
  label: string;
  scopeId: string;
  scope: TimetableScope;
  days: string[];
  hours: string[];
  stepMinutes: number;
  slots: TimetableSlot[];
  totalMinutes: number;
  totalHours: number;
}

/** Ce que l'on tient pendant un glisser : une matière neuve ou un cours à déplacer. */
interface DragPayload {
  kind: 'PALETTE' | 'SLOT';
  subjectId: string;
  teacherId: string;
  slotId?: string;
  durationMinutes: number;
}

/**
 * The weekly timetable: read it, and for a class, build it.
 *
 * <p>Placement is validated by the server while the course is still hovering,
 * so a cell that cannot accept the drop says so before the user lets go. The
 * alternative — accepting the drop then undoing it — makes the grid jump under
 * the cursor and hides which rule was broken.</p>
 */
@Component({
  selector: 'eduops-timetable',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent implements OnInit {
  private readonly timetables = inject(TIMETABLE_DATA_SOURCE);
  private readonly classrooms = inject(CLASSROOM_DATA_SOURCE);
  private readonly teachers = inject(TEACHER_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly grid = signal<TimetableGrid | null>(null);
  readonly palette = signal<PaletteEntry[]>([]);
  readonly classList = signal<Classroom[]>([]);
  readonly teacherList = signal<Teacher[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);

  readonly scope = signal<TimetableScope>('CLASSROOM');
  readonly scopeId = signal<string>('');

  /** Case actuellement survolée pendant un glisser, et son verdict serveur. */
  readonly hoverCell = signal<string | null>(null);
  readonly hoverConflicts = signal<TimetableConflict[]>([]);
  readonly checking = signal(false);

  readonly selectedSlot = signal<TimetableSlot | null>(null);
  readonly schoolName = signal<string>(environment.schoolName ?? 'Établissement');

  private dragged: DragPayload | null = null;
  private hoverToken = 0;

  ngOnInit(): void {
    this.classrooms.list().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((list) => {
      this.classList.set(list);
      const requested = this.route.snapshot.queryParamMap.get('classroomId');
      const target = requested ?? list[0]?.id ?? '';
      if (target) {
        this.scopeId.set(target);
        this.load();
      } else {
        this.loading.set(false);
      }
    });
    this.teachers.search({ page: 0, size: 100 })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((page) => this.teacherList.set(page.content));
  }

  // ------------------------------------------------------------------ lecture

  load(): void {
    const id = this.scopeId();
    if (!id) {
      return;
    }
    this.loading.set(true);
    this.error.set(false);

    const request = this.scope() === 'TEACHER'
      ? this.timetables.teacherGrid(id)
      : this.scope() === 'ROOM'
        ? this.timetables.roomGrid(id)
        : this.timetables.classroomGrid(id);

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (grid) => {
        this.grid.set(grid);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });

    if (this.scope() === 'CLASSROOM') {
      this.timetables.palette(id).pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (entries) => this.palette.set(entries),
          error: () => this.palette.set([])
        });
    } else {
      this.palette.set([]);
    }
  }

  changeScope(scope: TimetableScope): void {
    this.scope.set(scope);
    this.selectedSlot.set(null);
    const fallback = scope === 'TEACHER'
      ? this.teacherList()[0]?.id
      : this.classList()[0]?.id;
    this.scopeId.set(fallback ?? '');
    this.load();
  }

  changeScopeId(id: string): void {
    this.scopeId.set(id);
    this.selectedSlot.set(null);
    this.load();
  }

  // -------------------------------------------------------------- géométrie

  /** Les heures de la règle verticale, du début à la fin de journée. */
  readonly hours = computed<string[]>(() => {
    const grid = this.grid();
    if (!grid) {
      return [];
    }
    const step = grid.stepMinutes > 0 ? grid.stepMinutes : 60;
    const start = this.toMinutes(grid.dayStart);
    const end = this.toMinutes(grid.dayEnd);
    const slots: string[] = [];
    for (let m = start; m < end; m += step) {
      slots.push(this.toLabel(m));
    }
    return slots;
  });

  readonly days = computed<string[]>(() => this.grid()?.days ?? []);

  dayLabel(day: string): string {
    return DAY_LABELS[day] ?? day;
  }

  /** Les cours qui commencent dans cette case. */
  slotsAt(day: string, hour: string): TimetableSlot[] {
    return (this.grid()?.slots ?? []).filter(
      (slot) => slot.dayOfWeek === day && this.hhmm(slot.startTime) === hour);
  }

  /**
   * Hauteur de la carte, en nombre de cases.
   *
   * Un cours de deux heures occupe deux lignes : sans cela, la grille mentirait
   * sur la durée réelle et deux cours consécutifs seraient indiscernables.
   */
  spanOf(slot: TimetableSlot, stepMinutes = this.grid()?.stepMinutes ?? 60): number {
    const step = stepMinutes > 0 ? stepMinutes : 60;
    return Math.max(1, Math.round(slot.durationMinutes / step));
  }

  cellKey(day: string, hour: string): string {
    return `${day}|${hour}`;
  }

  /** Vrai quand la case survolée est refusée par le serveur. */
  isBlocked(day: string, hour: string): boolean {
    return this.hoverCell() === this.cellKey(day, hour) && this.hoverConflicts().length > 0;
  }

  isAllowed(day: string, hour: string): boolean {
    return this.hoverCell() === this.cellKey(day, hour)
      && this.hoverConflicts().length === 0 && !this.checking();
  }

  conflictLabel(conflict: TimetableConflict): string {
    return CONFLICT_LABELS[conflict.kind] ?? 'Conflit';
  }

  readonly totalHours = computed(() => {
    const minutes = this.grid()?.totalMinutes ?? 0;
    return (minutes / 60).toFixed(minutes % 60 === 0 ? 0 : 1);
  });

  // ---------------------------------------------------------- glisser-déposer

  startPaletteDrag(entry: PaletteEntry, event: DragEvent): void {
    this.dragged = {
      kind: 'PALETTE',
      subjectId: entry.subjectId,
      teacherId: entry.teacherId,
      durationMinutes: this.grid()?.stepMinutes ?? 60
    };
    event.dataTransfer?.setData('text/plain', entry.subjectId);
  }

  startSlotDrag(slot: TimetableSlot, event: DragEvent): void {
    this.dragged = {
      kind: 'SLOT',
      subjectId: slot.subjectId,
      teacherId: slot.teacherId,
      slotId: slot.id,
      durationMinutes: slot.durationMinutes
    };
    event.dataTransfer?.setData('text/plain', slot.id);
  }

  endDrag(): void {
    this.dragged = null;
    this.hoverCell.set(null);
    this.hoverConflicts.set([]);
  }

  /**
   * Interroge le serveur pendant le survol.
   *
   * Un jeton par survol évite qu'une réponse lente sur une case quittée vienne
   * repeindre la case en cours.
   */
  onDragOver(day: string, hour: string, event: DragEvent): void {
    event.preventDefault();
    if (!this.dragged || !this.grid()?.editable) {
      return;
    }
    const key = this.cellKey(day, hour);
    if (this.hoverCell() === key) {
      return;
    }
    this.hoverCell.set(key);
    this.hoverConflicts.set([]);
    this.checking.set(true);

    const token = ++this.hoverToken;
    this.timetables.check(this.payloadFor(day, hour), this.dragged.slotId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (conflicts) => {
          if (token !== this.hoverToken) {
            return;
          }
          this.hoverConflicts.set(conflicts);
          this.checking.set(false);
        },
        error: () => {
          if (token === this.hoverToken) {
            this.checking.set(false);
          }
        }
      });
  }

  onDrop(day: string, hour: string, event: DragEvent): void {
    event.preventDefault();
    const dragged = this.dragged;
    if (!dragged || !this.grid()?.editable || this.saving()) {
      return;
    }
    if (this.hoverConflicts().length > 0) {
      this.notifications.error(this.hoverConflicts()[0].message, 'Placement refusé');
      this.endDrag();
      return;
    }

    this.saving.set(true);
    const payload = this.payloadFor(day, hour);
    const request = dragged.slotId
      ? this.timetables.updateSlot(dragged.slotId, payload)
      : this.timetables.createSlot(payload);

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.saving.set(false);
        this.endDrag();
        this.load();
      },
      error: () => {
        this.saving.set(false);
        this.endDrag();
      }
    });
  }

  private payloadFor(day: string, hour: string): SlotUpsertPayload {
    const dragged = this.dragged!;
    const start = this.toMinutes(hour);
    return {
      classroomId: this.scopeId(),
      subjectId: dragged.subjectId,
      teacherId: dragged.teacherId,
      dayOfWeek: day,
      startTime: this.toLabel(start),
      endTime: this.toLabel(start + dragged.durationMinutes),
      slotType: 'COURSE'
    };
  }

  // ------------------------------------------------------------------ actions

  removeSlot(slot: TimetableSlot): void {
    this.timetables.deleteSlot(slot.id).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.notifications.success(
            `${slot.subjectName} retiré du ${this.dayLabel(slot.dayOfWeek).toLowerCase()}.`);
          this.selectedSlot.set(null);
          this.load();
        }
      });
  }

  publish(): void {
    const grid = this.grid();
    if (!grid || this.saving()) {
      return;
    }
    this.saving.set(true);
    this.timetables.publish(grid.scopeId).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (published) => {
          this.grid.set(published);
          this.saving.set(false);
          this.notifications.success(
            'Les enseignants et les parents voient désormais cette version.',
            'Emploi du temps publié');
        },
        error: () => this.saving.set(false)
      });
  }

  select(slot: TimetableSlot): void {
    this.selectedSlot.set(this.selectedSlot()?.id === slot.id ? null : slot);
  }

  // ------------------------------------------------------------------ impression

  readonly printPages = computed<PrintPage[]>(() => {
    const grid = this.grid();
    if (!grid) {
      return [];
    }
    return [this.buildPrintPage(grid)];
  });

  private buildPrintPage(grid: TimetableGrid): PrintPage {
    const dayStartMin = this.toMinutes(grid.dayStart);
    const dayEndMin = this.toMinutes(grid.dayEnd);
    const hours: string[] = [];
    for (let m = dayStartMin; m < dayEndMin; m += grid.stepMinutes) {
      hours.push(this.toLabel(m));
    }

    return {
      label: grid.scopeLabel,
      scopeId: grid.scopeId,
      scope: grid.scope,
      days: grid.days,
      hours,
      stepMinutes: grid.stepMinutes,
      slots: grid.slots,
      totalMinutes: grid.totalMinutes,
      totalHours: Math.round((grid.totalMinutes / 60) * 10) / 10,
    };
  }

  print(): void {
    if (!this.grid()) {
      return;
    }
    // Le rendu de la feuille est fait par Angular : on attend un tour de boucle
    // avant d'ouvrir le dialogue, sinon la page part vide à l'imprimante.
    setTimeout(() => {
      window.print();
    }, 120);
  }

  slotsAtPrint(day: string, hour: string, slots: TimetableSlot[]): TimetableSlot[] {
    const startMin = this.toMinutes(hour);
    const endMin = startMin + (this.grid()?.stepMinutes ?? 60);
    return slots.filter((slot) => {
      const slotStart = this.toMinutes(slot.startTime);
      return slot.dayOfWeek === day && slotStart >= startMin && slotStart < endMin;
    });
  }

  generatedDate(): string {
    return new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  /** Part du volume horaire déjà posée, en pourcentage. */
  paletteProgress(entry: PaletteEntry): number {
    const expected = (entry.weeklyHours ?? 0) * 60;
    if (expected <= 0) {
      return 0;
    }
    return Math.min(100, Math.round((entry.placedMinutes / expected) * 100));
  }

  // ------------------------------------------------------------------ minutes

  /** Tolère HH:mm comme HH:mm:ss, selon la sérialisation du serveur. */
  hhmm(time: string): string {
    return time.slice(0, 5);
  }

  private toMinutes(time: string): number {
    const [hours, minutes] = this.hhmm(time).split(':').map(Number);
    return hours * 60 + minutes;
  }

  private toLabel(total: number): string {
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
}
