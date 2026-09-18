import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, expand, reduce, tap } from 'rxjs';
import { environment } from '@env/environment';
import { CLASSROOM_DATA_SOURCE, ROOM_DATA_SOURCE, TEACHER_DATA_SOURCE, TIMETABLE_DATA_SOURCE } from '@core/datasource/data-source';
import { Classroom, Teacher } from '@core/models/domain.models';
import { Room } from '@core/models/room.models';
import {
  CONFLICT_LABELS, DAY_LABELS, PaletteEntry, SlotUpsertPayload, TimetableConflict,
  TimetableGrid, TimetableScope, TimetableSlot
} from '@core/models/timetable.models';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
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
  roomId?: string;
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
  private readonly auth = inject(AuthService);
  readonly canCancel = computed(() => this.auth.has(PERMISSIONS.TIMETABLE_MANAGE));
  readonly cancelling = signal(false);

  // ─── Réglages de la grille (jours, heures de la journée, pas) ───
  readonly canManageSettings = computed(() => this.auth.has(PERMISSIONS.TIMETABLE_MANAGE));
  readonly settingsOpen = signal(false);
  readonly settingsLoading = signal(false);
  readonly savingSettings = signal(false);
  readonly settingsError = signal('');
  readonly settingsDays = signal<string[]>([]);
  readonly settingsStart = signal('07:00');
  readonly settingsEnd = signal('18:00');
  readonly settingsStep = signal(60);
  /** Choix d'heures pour les bornes de journée : quarts d'heure de 06:00 à 20:00. */
  readonly settingsTimeChoices: string[] = Array.from({ length: 57 }, (_, i) => {
    const minutes = 6 * 60 + i * 15;
    return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
  });
  readonly settingsStepChoices = [15, 30, 45, 60];
  /** Tous les jours proposés, dans l'ordre de la semaine. */
  readonly allDays = Object.keys(DAY_LABELS);
  readonly settingsDirty = computed(() =>
    this.settingsStart() !== this.grid()?.dayStart
    || this.settingsEnd() !== this.grid()?.dayEnd
    || this.settingsStep() !== this.grid()?.stepMinutes
    || this.settingsDays().join(',') !== this.grid()?.days.join(','));

  toggleDay(day: string): void {
    const current = this.settingsDays();
    const order = Object.keys(DAY_LABELS);
    this.settingsDays.set(current.includes(day)
      ? current.filter(d => d !== day)
      : [...current, day].sort((a, b) => order.indexOf(a) - order.indexOf(b)));
  }

  dayToggled(day: string): boolean {
    return this.settingsDays().includes(day);
  }

  /** Le select renvoie une chaîne : on repasse en nombre pour la comparaison et l'API. */
  changeSettingsStep(value: string | number): void {
    this.settingsStep.set(Number(value));
  }

  /** Ouvre (et charge au premier appel) ou ferme le panneau de réglages. */
  toggleSettings(): void {
    if (this.settingsOpen()) {
      this.settingsOpen.set(false);
      return;
    }
    this.settingsOpen.set(true);
    this.settingsLoading.set(true);
    this.settingsError.set('');
    this.timetables.settings().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (s) => {
        this.settingsDays.set([...s.days]);
        this.settingsStart.set(s.dayStart.slice(0, 5));
        this.settingsEnd.set(s.dayEnd.slice(0, 5));
        this.settingsStep.set(s.stepMinutes);
        this.settingsLoading.set(false);
      },
      error: () => {
        this.settingsLoading.set(false);
        this.settingsError.set('Impossible de charger les réglages.');
      }
    });
  }

  saveSettings(): void {
    if (!this.settingsDays().length) {
      this.settingsError.set('Choisissez au moins un jour ouvré.');
      return;
    }
    if (this.settingsStart() >= this.settingsEnd()) {
      this.settingsError.set("L'heure de fin de journée doit être postérieure à l'heure de début.");
      return;
    }
    this.savingSettings.set(true);
    this.settingsError.set('');
    this.timetables.updateSettings({
      days: this.settingsDays(),
      dayStart: this.settingsStart(),
      dayEnd: this.settingsEnd(),
      stepMinutes: Number(this.settingsStep())
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.savingSettings.set(false);
        this.settingsOpen.set(false);
        this.notifications.success('Réglages de la grille enregistrés.');
        this.load();
      },
      error: (err) => {
        this.savingSettings.set(false);
        this.settingsError.set(err?.error?.message ?? 'Enregistrement impossible.');
      }
    });
  }

  private readonly timetables = inject(TIMETABLE_DATA_SOURCE);
  private readonly classrooms = inject(CLASSROOM_DATA_SOURCE);
  private readonly teachers = inject(TEACHER_DATA_SOURCE);
  private readonly rooms = inject(ROOM_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly grid = signal<TimetableGrid | null>(null);
  readonly palette = signal<PaletteEntry[]>([]);
  readonly classList = signal<Classroom[]>([]);
  readonly teacherList = signal<Teacher[]>([]);
  readonly roomList = signal<Room[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);

  readonly scope = signal<TimetableScope>('CLASSROOM');
  readonly scopeId = signal<string>('');

  /** Salle que les prochains cours posés prendront ; vide = salle habituelle. */
  readonly roomChoice = signal<string>('');

  /** Case actuellement survolée pendant un glisser, et son verdict serveur. */
  readonly hoverCell = signal<string | null>(null);
  readonly hoverConflicts = signal<TimetableConflict[]>([]);
  readonly checking = signal(false);

  readonly selectedSlot = signal<TimetableSlot | null>(null);
  readonly schoolName = signal<string>(environment.schoolName ?? 'Établissement');

  private dragged: DragPayload | null = null;
  private hoverToken = 0;
  private loadToken = 0;
  private readonly selections: Partial<Record<TimetableScope, string>> = {};

  ngOnInit(): void {
    this.selections.CLASSROOM = this.route.snapshot.queryParamMap.get('classroomId') ?? '';
    this.loadOptions();
  }

  private loadOptions(): void {
    const scope = this.scope();
    const token = ++this.loadToken;
    this.grid.set(null);
    this.palette.set([]);
    this.scopeId.set('');
    this.loading.set(true);
    this.error.set(false);
    const request: Observable<{ id: string }[]> = scope === 'TEACHER'
      ? this.teachers.search({ page: 0, size: 100 }).pipe(
          expand(page => page.page + 1 < page.totalPages
            ? this.teachers.search({ page: page.page + 1, size: 100 }) : EMPTY),
          reduce((list, page) => [...list, ...page.content], [] as Teacher[]),
          tap(list => this.teacherList.set(list)))
      : scope === 'ROOM'
        ? this.rooms.list().pipe(tap(list => this.roomList.set(list)))
        : this.classrooms.list().pipe(tap(list => this.classList.set(list)));

    // Le constructeur d'emploi du temps choisit une salle : la liste des salles
    // ne sert donc plus seulement à l'onglet « Par salle ».
    if (scope === 'CLASSROOM') {
      this.loadRooms();
    }

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: list => {
        if (token !== this.loadToken) return;
        const previous = this.selections[scope];
        const id = list.find(item => item.id === previous)?.id ?? list[0]?.id ?? '';
        this.scopeId.set(id);
        if (id) {
          this.selections[scope] = id;
          if (scope === 'CLASSROOM') {
            this.syncRoomChoice(id);
          }

          this.load();
        } else {
          this.loading.set(false);
        }
      },
      error: () => {
        if (token !== this.loadToken) return;
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  /**
   * Les salles actives, pour les sélecteurs de salle.
   *
   * <p>Un échec n'est pas bloquant : sans salles, le sélecteur n'offre que la
   * salle habituelle et le serveur reste seul juge.</p>
   */
  private loadRooms(): void {
    this.rooms.list().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => this.roomList.set(list),
        error: () => this.roomList.set([])
      });
  }

  /**
   * Aligne la salle proposée sur la classe choisie.
   *
   * <p>Appelée au changement de classe, pas à chaque rechargement : après avoir
   * posé un cours au laboratoire, on enchaîne souvent avec le même lieu, et le
   * ramener à la salle habituelle à chaque fois serait une brimade.</p>
   */
  private syncRoomChoice(classroomId: string): void {
    this.roomChoice.set(
      this.classList().find((item) => item.id === classroomId)?.defaultRoomId ?? '');
  }

  // ------------------------------------------------------------------ lecture

  load(): void {
    const id = this.scopeId();
    if (!id) {
      this.loadOptions();
      return;
    }
    const token = ++this.loadToken;
    this.grid.set(null);
    this.palette.set([]);
    this.loading.set(true);
    this.error.set(false);

    const request = this.scope() === 'TEACHER'
      ? this.timetables.teacherGrid(id)
      : this.scope() === 'ROOM'
        ? this.timetables.roomGrid(id)
        : this.timetables.classroomGrid(id);

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (grid) => {
        if (token !== this.loadToken) return;
        this.grid.set(grid);
        this.loading.set(false);
      },
      error: () => {
        if (token !== this.loadToken) return;
        this.loading.set(false);
        this.error.set(true);
      }
    });

    if (this.scope() === 'CLASSROOM') {
      this.timetables.palette(id).pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (entries) => { if (token === this.loadToken) this.palette.set(entries); },
          error: () => { if (token === this.loadToken) this.palette.set([]); }
        });
    } else {
      this.palette.set([]);
    }
  }

  changeScope(scope: TimetableScope): void {
    if (scope === this.scope()) return;
    this.scope.set(scope);
    this.selectedSlot.set(null);
    this.endDrag();
    this.loadOptions();
  }

  changeScopeId(id: string): void {
    this.scopeId.set(id);
    this.selections[this.scope()] = id;
    if (this.scope() === 'CLASSROOM') {
      this.syncRoomChoice(id);
    }

    this.selectedSlot.set(null);
    this.endDrag();
    this.load();
  }

  /**
   * Choisit la salle que les prochains cours posés prendront.
   *
   * <p>Le verdict affiché portait sur l'ancienne salle : on l'efface plutôt que
   * de laisser une case verte qui ne l'est plus.</p>
   */
  changeRoomChoice(roomId: string): void {
    this.roomChoice.set(roomId);
    this.endDrag();
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

  /** Salles proposables : une salle archivée n'accueille plus de cours. */
  readonly activeRooms = computed<Room[]>(
    () => this.roomList().filter((room) => room.status === 'ACTIVE'));

  /** Salle habituelle de la classe affichée, quand elle en a une. */
  readonly defaultRoom = computed<Room | undefined>(() => {
    const classroomId = this.scopeId();
    const roomId = this.classList().find((item) => item.id === classroomId)?.defaultRoomId;
    return this.activeRooms().find((room) => room.id === roomId);
  });

  /**
   * Libellé de l'option « laisser la salle habituelle ».
   *
   * <p>Vide veut dire « le serveur décide » : il retombe sur la salle habituelle
   * de la classe. Afficher « Aucune salle » quand la classe en a une ferait
   * croire à un choix qui n'existe pas.</p>
   */
  defaultRoomOptionLabel(): string {
    const room = this.defaultRoom();
    return room ? `Salle habituelle — ${room.name}` : 'Aucune salle';
  }

  dayLabel(day: string): string {
    return DAY_LABELS[day] ?? day;
  }

  /**
   * Les cours qui tombent dans cette tranche horaire.
   *
   * <p>La grille suit le pas des réglages de l'école (souvent une heure
   * pleine) mais un cours peut commencer à 07:30 : on l'affiche dans la
   * tranche qui le contient, sinon il serait enregistré sans jamais paraître.
   * C'est la même règle que la feuille d'impression.</p>
   */
  slotsAt(day: string, hour: string): TimetableSlot[] {
    const step = this.grid()?.stepMinutes ?? 60;
    const startMin = this.toMinutes(hour);
    return (this.grid()?.slots ?? []).filter((slot) => {
      return slot.dayOfWeek === day
        && this.toMinutes(slot.startTime) >= startMin
        && this.toMinutes(slot.startTime) < startMin + step;
    });
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

  /**
   * Décalage vertical de la carte dans sa cellule conteneur, entre 0 et 1.
   *
   * Un cours de 07:30 logé dans la ligne 07:00 doit démarrer à mi-case,
   * sinon la grille le présenterait comme commençant à l'heure pleine.
   */
  offsetOf(slot: TimetableSlot, hour: string, stepMinutes = this.grid()?.stepMinutes ?? 60): number {
    const step = stepMinutes > 0 ? stepMinutes : 60;
    const offset = (this.toMinutes(slot.startTime) - this.toMinutes(hour)) / step;
    return Math.max(0, Math.min(1, offset));
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

  // --------------------------------------------------------- création manuelle

  /** Clé « subjectId|teacherId » choisie dans le formulaire d'ajout. */
  readonly formSubjectKey = signal('');
  readonly formDay = signal('');
  /** Heure et minute de départ saisies séparément (ex. 07 h 30). */
  readonly formHour = signal('');
  readonly formMinute = signal('');
  readonly formDuration = signal(60);
  readonly formConflicts = signal<TimetableConflict[]>([]);
  readonly formError = signal('');

  /** Les heures pleines de la journée, d'après les réglages de l'école. */
  readonly hourChoices = computed<string[]>(() => {
    const grid = this.grid();
    if (!grid) {
      return [];
    }
    const start = this.toMinutes(grid.dayStart);
    const end = this.toMinutes(grid.dayEnd);
    const choices: string[] = [];
    for (let m = start; m < end; m += 60) {
      choices.push(this.toLabel(m).slice(0, 2));
    }
    return choices;
  });

  /** Les minutes proposées, au quart d'heure. */
  readonly minuteChoices = ['00', '15', '30', '45'];

  /** L'heure de départ reconstituée, au format HH:mm. */
  readonly formStartTime = computed<string>(() => {
    const hour = this.formHour();
    const minute = this.formMinute();
    return hour && minute ? `${hour}:${minute}` : '';
  });

  /**
   * Libellé français d'une heure : 07:30 devient « 07h30 ».
   *
   * <p>À l'école on dit « sept heures trente », pas « sept deux-points
   * trente » : les écrans s'adressent à des humains, la colonne SQL attend
   * HH:mm — on convertit à l'affichage, jamais au stockage.</p>
   */
  frTime(time: string): string {
    return time.replace(':', 'h');
  }

  /** Résumé lisible du cours saisi : « Départ 07h30 · Fin 09h30 (120 min) ». */
  readonly formSummary = computed<string>(() => {
    const start = this.formStartTime();
    const grid = this.grid();
    if (!start || !grid) {
      return '';
    }
    const endMin = this.toMinutes(start) + Number(this.formDuration());
    const end = this.toLabel(Math.min(endMin, this.toMinutes(grid.dayEnd)));
    return `Départ à ${this.frTime(start)} · Fin à ${this.frTime(end)}`;
  });

  /** Durées proposées, en minutes. */
  readonly durationChoices = [30, 45, 60, 90, 120];

  canSubmitForm(): boolean {
    return !!this.grid()?.editable
      && !!this.formSubjectKey()
      && !!this.formDay()
      && !!this.formStartTime()
      && !this.saving();
  }

  /**
   * Crée un cours à partir du formulaire : le serveur vérifie d'abord les
   * règles (enseignant, classe, salle) et le cours n'est posé que si rien
   * ne s'y oppose — le même verdict que le survol du glisser-déposer.
   */
  createSlotManually(): void {
    const grid = this.grid();
    if (!this.canSubmitForm() || !grid) {
      return;
    }
    const [subjectId, teacherId] = this.formSubjectKey().split('|');
    const entry = this.palette().find(
      (item) => item.subjectId === subjectId && item.teacherId === teacherId);
    const start = this.formStartTime();
    // Le <select> renvoie une chaîne : sans conversion, 450 + "120" donnerait
    // "450120" par concaténation et ferait échouer le contrôle de fin de journée.
    const duration = Number(this.formDuration());
    if (!Number.isFinite(duration) || duration <= 0) {
      this.formError.set('Durée invalide.');
      return;
    }
    const endMin = this.toMinutes(start) + duration;
    if (endMin > this.toMinutes(grid.dayEnd)) {
      this.formError.set('Le cours dépasse la fin de la journée.');
      return;
    }
    const payload: SlotUpsertPayload = {
      classroomId: this.scopeId(),
      subjectId,
      teacherId,
      roomId: this.roomChoice() || undefined,
      dayOfWeek: this.formDay(),
      startTime: start,
      endTime: this.toLabel(endMin),
      slotType: 'COURSE'
    };
    this.formError.set('');
    this.formConflicts.set([]);
    this.saving.set(true);
    this.timetables.check(payload).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (conflicts) => {
          if (conflicts.length > 0) {
            this.saving.set(false);
            this.formConflicts.set(conflicts);
            return;
          }
          this.timetables.createSlot(payload)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => {
                this.saving.set(false);
                this.notifications.success(
                  `${entry?.subjectName ?? 'Cours'} — ` +
                  `${this.dayLabel(payload.dayOfWeek).toLowerCase()} ` +
                  `${payload.startTime}–${payload.endTime}.`,
                  'Cours ajouté');
                this.load();
              },
              error: () => this.saving.set(false)
            });
        },
        error: () => this.saving.set(false)
      });
  }

  // ---------------------------------------------------------- glisser-déposer

  startPaletteDrag(entry: PaletteEntry, event: DragEvent): void {
    this.dragged = {
      kind: 'PALETTE',
      subjectId: entry.subjectId,
      teacherId: entry.teacherId,
      // La salle choisie dans la palette, sinon celle que la matière proposait
      // déjà (la salle habituelle de la classe) : sans cela le cours partirait
      // sans lieu et échapperait au contrôle de conflit de salle.
      roomId: this.roomChoice() || entry.roomId || undefined,
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
      roomId: slot.roomId,
      durationMinutes: slot.durationMinutes
    };
    event.dataTransfer?.setData('text/plain', slot.id);
  }

  endDrag(): void {
    ++this.hoverToken;
    this.checking.set(false);
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
    if (!dragged || !this.grid()?.editable || this.saving() || this.cancelling()) {
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
      roomId: dragged.roomId,
      dayOfWeek: day,
      startTime: this.toLabel(start),
      endTime: this.toLabel(start + dragged.durationMinutes),
      slotType: 'COURSE'
    };
  }

  // ------------------------------------------------------------------ actions

  removeSlot(slot: TimetableSlot): void {
    if (!this.canCancel() || this.saving() || this.cancelling() || this.loading()
        || !this.grid()?.slots.some((item) => item.id === slot.id)) {
      return;
    }
    // Le planning représente un créneau récurrent, pas une séance datée.
    const message =
      `Annuler « ${slot.subjectName} » du ${this.dayLabel(slot.dayOfWeek).toLowerCase()} ` +
      `${this.hhmm(slot.startTime)}–${this.hhmm(slot.endTime)} ?\n\n` +
      'Ce créneau hebdomadaire sera retiré de toutes les vues de l\'emploi du temps. ' +
      'Les séances d\'appel déjà enregistrées sont conservées.';
    if (!window.confirm(message)) {
      return;
    }
    this.cancelling.set(true);
    this.timetables.deleteSlot(slot.id).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.cancelling.set(false);
          this.notifications.success(
            `${slot.subjectName} annulé le ${this.dayLabel(slot.dayOfWeek).toLowerCase()} ` +
            `${this.hhmm(slot.startTime)}–${this.hhmm(slot.endTime)}.`,
            'Cours annulé');
          this.selectedSlot.set(null);
          this.load();
        },
        // L'échec ne doit pas laisser un bouton mort : on remet le bouton
        // actif pour retenter, et l'erreur remonte en notif (intercepteur).
        error: () => this.cancelling.set(false)
      });
  }

  /**
   * Déplace un cours déjà posé vers une autre salle.
   *
   * <p>Le point d'entrée de modification attend le cours entier, pas seulement le
   * champ modifié : on renvoie l'horaire et le couple matière/enseignant tels
   * quels, avec la nouvelle salle. Le serveur revérifie alors les trois règles —
   * dont celle de la salle — et refuse en disant laquelle est enfreinte.</p>
   */
  changeSlotRoom(slot: TimetableSlot, roomId: string): void {
    if (!this.grid()?.editable || this.saving() || this.cancelling() || (slot.roomId ?? '') === roomId) {
      return;
    }
    this.saving.set(true);
    const payload: SlotUpsertPayload = {
      classroomId: slot.classroomId,
      subjectId: slot.subjectId,
      teacherId: slot.teacherId,
      // Vide veut dire « la salle habituelle de la classe » : le serveur tranche.
      roomId: roomId || undefined,
      dayOfWeek: slot.dayOfWeek,
      startTime: this.hhmm(slot.startTime),
      endTime: this.hhmm(slot.endTime),
      slotType: slot.slotType,
      note: slot.note
    };
    this.timetables.updateSlot(slot.id, payload).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.notifications.success(
            `${slot.subjectName} — ${roomId ? this.roomLabel(roomId) : 'salle habituelle'}.`,
            'Salle du cours mise à jour');
          this.selectedSlot.set(null);
          this.load();
        },
        error: () => this.saving.set(false)
      });
  }

  /** Nom lisible d'une salle, pour les messages. */
  private roomLabel(roomId: string): string {
    return this.roomList().find((room) => room.id === roomId)?.name ?? 'nouvelle salle';
  }


  publish(): void {
    const grid = this.grid();
    if (!grid || this.saving() || this.cancelling()) {
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
