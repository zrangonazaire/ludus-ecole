import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Building, BuildingsComponent } from './buildings.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { ROOM_DATA_SOURCE } from '@core/datasource/data-source';
import { PERMISSIONS } from '@core/models/auth.models';
import {
  BuildingGroup, ROOM_TYPE_LABELS, ROOM_TYPE_ORDER, Room, RoomCampusOption, RoomType,
  RoomUpsertPayload
} from '@core/models/room.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

/**
 * Bâtiments et salles : ce que l'emploi du temps réserve et ce qu'un élève
 * traverse dans une journée.
 *
 * <p>Les bâtiments se créent indépendamment des salles. Pour conserver les
 * anciens libellés libres, l'écran regroupe encore les salles par leur nom de bâtiment.
 * La question à laquelle cet écran
 * répond est « combien de places assises ai-je, et où » — d'où les totaux par
 * bâtiment et le comptage des salles dont la capacité n'est pas renseignée.</p>
 */
@Component({
  selector: 'eduops-rooms',
  standalone: true,
  imports: [CommonModule, BuildingsComponent, ReactiveFormsModule, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
  private readonly dataSource = inject(ROOM_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly rooms = signal<Room[]>([]);
  readonly registeredBuildings = signal<Building[]>([]);
  readonly campuses = signal<RoomCampusOption[]>([]);
  readonly roomTypes = signal<RoomType[]>([...ROOM_TYPE_ORDER]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly includeArchived = signal(false);
  readonly campusFilter = signal('');
  readonly buildingFilter = signal('');
  readonly typeFilter = signal('');
  readonly search = signal('');
  readonly editing = signal<Room | null>(null);
  readonly creating = signal(false);

  readonly canManage = computed(() => this.auth.has(PERMISSIONS.ROOM_MANAGE));
  readonly showForm = computed(() => this.creating() || this.editing() !== null);
  readonly formTitle = computed(() => {
    const current = this.editing();
    return current ? `Modifier ${current.name}` : 'Nouvelle salle';
  });

  readonly form = this.fb.nonNullable.group({
    buildingId: [''],
    levelId: [''],
    campusId: ['', [Validators.required]],
    code: ['', [Validators.required, Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z0-9-]+$/)]],
    name: ['', [Validators.required, Validators.maxLength(120)]],
    building: ['', [Validators.maxLength(120)]],
    floor: ['', [Validators.maxLength(30)]],
    capacity: [0, [Validators.min(0)]],
    roomType: this.fb.nonNullable.control<RoomType>('CLASSROOM', [Validators.required])
  });

  /** Salles actives affichées, et places assises qu'elles représentent. */
  readonly activeRooms = computed(() => this.rooms().filter((room) => room.status === 'ACTIVE'));
  readonly totalSeats = computed(() =>
    this.activeRooms().reduce((sum, room) => sum + room.capacity, 0));
  /** Salles dont la capacité reste à mesurer : un total partiel doit se dire. */
  readonly unknownCapacityCount = computed(() =>
    this.activeRooms().filter((room) => room.capacity === 0).length);
  readonly occupiedCount = computed(() =>
    this.activeRooms().filter((room) => this.occupied(room)).length);

  /** Noms de bâtiments déjà saisis, pour le filtre (sans doublon). */
  readonly buildings = computed(() => {
    const names = this.rooms()
      .map((room) => room.building?.trim())
      .filter((name): name is string => !!name);
    return [...new Set(names)].sort((a, b) => a.localeCompare(b, 'fr'));
  });

  /**
   * Les salles groupées par campus puis par bâtiment.
   *
   * <p>« Sans bâtiment » est un groupe à part entière et non un fourre-tout
   * rangé en fin de liste : c'est souvent le gymnase ou la cour, et le taire
   * ferait croire que ces salles ont été perdues.</p>
   */
  readonly groups = computed<BuildingGroup[]>(() => {
    const buckets = new Map<string, {
      campusLabel: string; building?: string; rooms: Room[];
    }>();
    for (const room of this.rooms()) {
      const building = room.building?.trim() || undefined;
      const key = room.campusId + '::' + (building ?? '');
      const bucket = buckets.get(key)
        ?? { campusLabel: room.campusName + ' · ' + room.campusCode, building, rooms: [] };
      bucket.rooms.push(room);
      buckets.set(key, bucket);
    }
    return [...buckets.entries()]
      .map(([key, bucket]) => ({
        key,
        label: bucket.building ?? 'Sans bâtiment',
        campusLabel: bucket.campusLabel,
        rooms: bucket.rooms,
        seats: bucket.rooms.reduce((sum, room) => sum + room.capacity, 0),
        unknownCapacity: bucket.rooms.some((room) => room.capacity === 0)
      }))
      .sort((a, b) => a.campusLabel.localeCompare(b.campusLabel, 'fr')
        || (a.label === 'Sans bâtiment' ? 1 : b.label === 'Sans bâtiment' ? -1 : 0)
        || a.label.localeCompare(b.label, 'fr'));
  });

  ngOnInit(): void {
    this.loadOptions();
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.list({
      campusId: this.campusFilter() || undefined,
      building: this.buildingFilter() || undefined,
      roomType: this.typeFilter() || undefined,
      search: this.search() || undefined,
      includeArchived: this.includeArchived()
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (list) => {
        this.rooms.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  /**
   * Campus et types de salle pour les listes déroulantes.
   *
   * <p>Un échec n'est pas bloquant : les types ont une valeur par défaut
   * locale, et seul le formulaire de création a vraiment besoin des campus.
   * Il le signale lui-même quand la liste est vide.</p>
   */
  private loadOptions(): void {
    this.dataSource.options().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (options) => {
        this.campuses.set(options.campuses);
        if (options.roomTypes.length > 0) {
          this.roomTypes.set(options.roomTypes as RoomType[]);
        }
      },
      error: () => this.campuses.set([])
    });
  }

  setCampusFilter(value: string): void {
    this.campusFilter.set(value);
    this.load();
  }

  setBuildingFilter(value: string): void {
    this.buildingFilter.set(value);
    this.load();
  }

  setTypeFilter(value: string): void {
    this.typeFilter.set(value);
    this.load();
  }

  setSearch(value: string): void {
    this.search.set(value);
    this.load();
  }

  toggleArchived(): void {
    this.includeArchived.update((value) => !value);
    this.load();
  }

  resetFilters(): void {
    this.campusFilter.set('');
    this.buildingFilter.set('');
    this.typeFilter.set('');
    this.search.set('');
    this.load();
  }

  /** Vrai quand l'emploi du temps ou une classe s'appuie sur la salle. */
  occupied(room: Room): boolean {
    return room.timetableSlotCount > 0 || room.defaultClassroomCount > 0;
  }

  typeLabel(type: RoomType): string {
    return ROOM_TYPE_LABELS[type] ?? type;
  }

  /** Phrase unique expliquant pourquoi une salle ne peut pas être archivée. */
  usageNote(room: Room): string {
    const parts: string[] = [];
    if (room.timetableSlotCount > 0) {
      parts.push(`${room.timetableSlotCount} cours`);
    }
    if (room.defaultClassroomCount > 0) {
      parts.push(`${room.defaultClassroomCount} classe(s) par défaut`);
    }
    return parts.join(' · ');
  }

  openCreate(): void {
    this.editing.set(null);
    this.creating.set(true);
    this.form.reset({
      // Le campus courant du filtre est le bon candidat par défaut : on crée
      // presque toujours une salle là où l'on vient de regarder.
      campusId: this.campusFilter() || this.campuses()[0]?.id || '',
      code: '',
      name: '',
      building: this.buildingFilter() || '',
      floor: '',
      capacity: 0,
      roomType: 'CLASSROOM'
    });
  }

  openEdit(room: Room): void {
    this.creating.set(false);
    this.editing.set(room);
    this.form.reset({
      buildingId: room.buildingId ?? '',
      levelId: room.levelId ?? '',
      campusId: room.campusId,
      code: room.code,
      name: room.name,
      building: room.building ?? '',
      floor: room.floor ?? '',
      capacity: room.capacity,
      roomType: room.roomType
    });
  }

  closePanel(): void {
    if (this.saving()) {
      return;
    }
    this.editing.set(null);
    this.creating.set(false);
  }

  resetLocation(): void {
    this.form.patchValue({ buildingId: '', levelId: '', building: '', floor: '' });
  }

  selectBuilding(): void {
    this.form.patchValue({ levelId: '', building: '', floor: '' });
  }

  submit(): void {
    if (this.form.controls.buildingId.value && !this.form.controls.levelId.value) {
      this.notifications.error('Choisissez un niveau dans ce bâtiment.'); return;
    }
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }
    const current = this.editing();
    const value = this.form.getRawValue();
    const payload: RoomUpsertPayload = {
      levelId: value.levelId || undefined,
      campusId: value.campusId,
      code: value.code.trim().toUpperCase(),
      name: value.name.trim(),
      building: value.building.trim() || undefined,
      floor: value.floor.trim() || undefined,
      capacity: Number(value.capacity) || 0,
      roomType: value.roomType
    };
    this.saving.set(true);
    const request = current
      ? this.dataSource.update(current.id, payload)
      : this.dataSource.create(payload);
    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (room) => {
        this.notifications.success(
          current ? `${room.name} est à jour.` : `${room.name} peut maintenant être réservée.`,
          current ? 'Salle modifiée' : 'Salle créée');
        this.afterWrite();
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  archive(room: Room): void {
    this.dataSource.archive(room.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.notifications.success(
            `${room.name} n'apparaît plus dans les choix de l'emploi du temps.`,
            'Salle archivée');
          this.load();
        },
        error: (err) => this.explain(err)
      });
  }

  restore(room: Room): void {
    this.dataSource.restore(room.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.load(),
        error: (err) => this.explain(err)
      });
  }

  private afterWrite(): void {
    this.saving.set(false);
    this.closePanel();
    this.load();
  }

  private explain(err: unknown): void {
    const code = (err as { error?: { code?: string } } | null | undefined)?.error?.code;
    if (code) {
      this.notifications.error(translateErrorCode(code), 'Action refusée');
    }
  }
}
