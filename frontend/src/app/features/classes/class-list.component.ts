import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CLASSROOM_DATA_SOURCE } from '@core/datasource/data-source';
import { Classroom } from '@core/models/domain.models';
import { LevelCapacity } from '@core/models/classroom.models';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

/** Panneau ouvert sur la droite : creation unitaire, ajout en lot, ou modification. */
export type ClassPanel = 'ONE' | 'MANY' | 'EDIT' | null;

/**
 * Classes overview and, above all, the place where a school corrects the
 * forecast it gave during setup.
 *
 * <p>Occupancy is displayed exactly as the backend computed it: available seats
 * are derived from active enrollments (rule 9) and never entered by a user.</p>
 */
@Component({
  selector: 'eduops-class-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink,
    StatusBadgeComponent, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.scss'
})
export class ClassListComponent implements OnInit {
  private readonly dataSource = inject(CLASSROOM_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly setupStatus = inject(SetupStatusService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly classes = signal<Classroom[]>([]);
  readonly levels = signal<LevelCapacity[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);

  readonly panel = signal<ClassPanel>(null);
  readonly editing = signal<Classroom | null>(null);
  readonly levelFilter = signal<string | null>(null);

  readonly createForm = this.fb.nonNullable.group({
    levelId: ['', [Validators.required]],
    name: [''],
    code: [''],
    capacityMaximum: [45, [Validators.required, Validators.min(1), Validators.max(300)]],
    capacityWarningThreshold: [90, [Validators.min(1), Validators.max(100)]],
    activateImmediately: [true]
  });

  readonly bulkForm = this.fb.nonNullable.group({
    levelId: ['', [Validators.required]],
    count: [2, [Validators.required, Validators.min(1), Validators.max(26)]],
    capacityMaximum: [45, [Validators.required, Validators.min(1), Validators.max(300)]],
    activateImmediately: [true]
  });

  readonly editForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    capacityMaximum: [45, [Validators.required, Validators.min(1), Validators.max(300)]],
    capacityWarningThreshold: [90, [Validators.min(1), Validators.max(100)]]
  });

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
    this.dataSource.levelCapacities().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (levels) => this.levels.set(levels),
        // A missing capacity summary must not blank out the class list.
        error: () => this.levels.set([])
      });
  }

  // ---------------------------------------------------------------- lecture

  readonly visibleClasses = computed<Classroom[]>(() => {
    const filter = this.levelFilter();
    return filter ? this.classes().filter((c) => c.levelId === filter) : this.classes();
  });

  /** Niveaux satures : ceux qui justifient d'ouvrir une classe de plus. */
  readonly crowdedLevels = computed<LevelCapacity[]>(
    () => this.levels().filter((l) => l.needsMoreClasses));

  readonly totalSeats = computed(
    () => this.classes().reduce((sum, c) => sum + c.capacityMaximum, 0));

  readonly totalEnrolled = computed(
    () => this.classes().reduce((sum, c) => sum + c.activeEnrollments, 0));

  filterByLevel(levelId: string | null): void {
    this.levelFilter.set(this.levelFilter() === levelId ? null : levelId);
  }

  levelName(levelId: string): string {
    return this.levels().find((l) => l.levelId === levelId)?.levelName ?? '';
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

  // ---------------------------------------------------------------- panneaux

  openCreate(levelId?: string): void {
    const level = this.levels().find((l) => l.levelId === levelId) ?? this.levels()[0];
    this.createForm.reset({
      levelId: level?.levelId ?? '',
      name: level?.suggestedName ?? '',
      code: level?.suggestedCode ?? '',
      capacityMaximum: level?.suggestedCapacity ?? 45,
      capacityWarningThreshold: 90,
      activateImmediately: true
    });
    this.panel.set('ONE');
  }

  openBulk(levelId?: string): void {
    const level = this.levels().find((l) => l.levelId === levelId) ?? this.levels()[0];
    this.bulkForm.reset({
      levelId: level?.levelId ?? '',
      count: 2,
      capacityMaximum: level?.suggestedCapacity ?? 45,
      activateImmediately: true
    });
    this.panel.set('MANY');
  }

  openEdit(classroom: Classroom): void {
    this.editing.set(classroom);
    this.editForm.reset({
      name: classroom.name,
      capacityMaximum: classroom.capacityMaximum,
      capacityWarningThreshold: 90
    });
    this.panel.set('EDIT');
  }

  closePanel(): void {
    this.panel.set(null);
    this.editing.set(null);
  }

  /**
   * Changer de niveau dans le formulaire remet le nom, le code et l'effectif
   * proposes : la suggestion suit le niveau, elle ne reste pas figee sur le
   * premier choix.
   */
  onLevelChange(levelId: string): void {
    const level = this.levels().find((l) => l.levelId === levelId);
    if (!level) {
      return;
    }
    this.createForm.patchValue({
      name: level.suggestedName,
      code: level.suggestedCode,
      capacityMaximum: level.suggestedCapacity
    });
  }

  // ---------------------------------------------------------------- ecriture

  submitCreate(): void {
    if (this.createForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.createForm.getRawValue();
    this.dataSource.create({
      levelId: value.levelId,
      name: value.name.trim() || undefined,
      code: value.code.trim() || undefined,
      capacityMaximum: value.capacityMaximum,
      capacityWarningThreshold: value.capacityWarningThreshold,
      activateImmediately: value.activateImmediately
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (classroom) => {
        this.notifications.success(
          `${classroom.name} est ouverte avec ${classroom.capacityMaximum} places.`,
          'Classe créée');
        this.afterWrite();
      },
      error: () => this.saving.set(false)
    });
  }

  submitBulk(): void {
    if (this.bulkForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.bulkForm.getRawValue();
    this.dataSource.createMany({
      levelId: value.levelId,
      count: value.count,
      capacityMaximum: value.capacityMaximum,
      activateImmediately: value.activateImmediately
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (created) => {
        this.notifications.success(
          `${created.length} classe(s) ajoutée(s) : ${created.map((c) => c.name).join(', ')}.`,
          'Classes créées');
        this.afterWrite();
      },
      error: () => this.saving.set(false)
    });
  }

  submitEdit(): void {
    const classroom = this.editing();
    if (!classroom || this.editForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.editForm.getRawValue();
    this.dataSource.update(classroom.id, {
      name: value.name.trim(),
      capacityMaximum: value.capacityMaximum,
      capacityWarningThreshold: value.capacityWarningThreshold
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (updated) => {
        this.notifications.success(`${updated.name} est à jour.`, 'Classe modifiée');
        this.afterWrite();
      },
      error: () => this.saving.set(false)
    });
  }

  activate(classroom: Classroom): void {
    this.dataSource.activate(classroom.id).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.notifications.success(`${classroom.name} accepte les inscriptions.`);
          this.load();
        }
      });
  }

  close(classroom: Classroom): void {
    this.dataSource.close(classroom.id).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.notifications.success(`${classroom.name} est fermée.`);
          this.load();
        }
      });
  }

  /** Effectif au-dela duquel l'effectif saisi ne peut pas descendre. */
  minimumCapacity(): number {
    return this.editing()?.activeEnrollments ?? 0;
  }

  private afterWrite(): void {
    this.saving.set(false);
    this.closePanel();
    this.load();
    // La classe compte pour l'etape CLASSES de la configuration.
    this.setupStatus.refresh();
  }
}
