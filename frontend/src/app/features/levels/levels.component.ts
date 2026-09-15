import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/auth/auth.service';
import { LEVEL_DATA_SOURCE, LevelUpsertPayload } from '@core/datasource/data-source';
import { PERMISSIONS } from '@core/models/auth.models';
import { Level } from '@core/models/domain.models';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

/** Groupe de niveaux affichés sous leur cycle. */
export interface LevelCycleGroup {
  id: string;
  name: string;
  levels: Level[];
}

/**
 * Cycles et niveaux — l'ossature pédagogique de l'établissement.
 *
 * <p>Un niveau reste dans son cycle à vie : le cycle se choisit à la
 * création et ne change plus. L'écran regroupe les niveaux par cycle dans
 * l'ordre du parcours, avec classes actives, passage et archivage.</p>
 */
@Component({
  selector: 'eduops-levels',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss'
})
export class LevelsComponent implements OnInit {
  private readonly dataSource = inject(LEVEL_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly setupStatus = inject(SetupStatusService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly levels = signal<Level[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly showArchived = signal(false);
  readonly editing = signal<Level | null>(null);
  readonly creating = signal(false);

  readonly canManage = computed(() => this.auth.has(PERMISSIONS.LEVEL_MANAGE));

  readonly form = this.fb.nonNullable.group({
    cycleId: ['', [Validators.required]],
    code: ['', [Validators.required, Validators.maxLength(30)]],
    name: ['', [Validators.required, Validators.maxLength(120)]],
    shortName: ['', [Validators.maxLength(30)]],
    sequence: [1, [Validators.required, Validators.min(1)]],
    nextLevelId: [''],
    terminal: [false]
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.list(this.showArchived())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => {
          this.levels.set(list);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set(true);
        }
      });
  }

  toggleArchived(): void {
    this.showArchived.update((v) => !v);
    this.load();
  }

  readonly activeCount = computed(() => this.levels().filter((l) => l.status === 'ACTIVE').length);

  readonly editingId = computed(() => this.editing()?.id ?? null);

  readonly cycles = computed<LevelCycleGroup[]>(() => {
    const groups = new Map<string, LevelCycleGroup>();
    this.levels().forEach((level) => {
      const group = groups.get(level.cycleId);
      if (group) {
        group.levels.push(level);
      } else {
        groups.set(level.cycleId, {
          id: level.cycleId,
          name: level.cycleName ?? 'Cycle',
          levels: [level]
        });
      }
    });
    return Array.from(groups.values());
  });

  candidatesFor(currentId?: string | null): Level[] {
    return this.levels().filter((l) => l.status === 'ACTIVE' && l.id !== currentId);
  }

  nextSequence(cycleId: string): number {
    const inCycle = this.levels().filter((l) => l.cycleId === cycleId);
    return inCycle.length === 0 ? 1 : Math.max(...inCycle.map((l) => l.sequence)) + 1;
  }

  openCreate(cycleId?: string): void {
    const target = cycleId ?? this.cycles()[0]?.id ?? '';
    this.editing.set(null);
    this.creating.set(true);
    this.form.reset({
      cycleId: target,
      code: '',
      name: '',
      shortName: '',
      sequence: target ? this.nextSequence(target) : 1,
      nextLevelId: '',
      terminal: false
    });
  }

  openEdit(level: Level): void {
    this.editing.set(level);
    this.creating.set(false);
    this.form.reset({
      cycleId: level.cycleId,
      code: level.code,
      name: level.name,
      shortName: level.shortName ?? '',
      sequence: level.sequence,
      nextLevelId: level.nextLevelId ?? '',
      terminal: level.terminal
    });
  }

  closePanel(): void {
    this.editing.set(null);
    this.creating.set(false);
  }

  onCycleChange(cycleId: string): void {
    if (!this.editing()) {
      this.form.patchValue({ sequence: this.nextSequence(cycleId) });
    }
  }

  submit(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }
    const editing = this.editing();
    const value = this.form.getRawValue();
    const payload: LevelUpsertPayload = {
      cycleId: editing ? editing.cycleId : value.cycleId,
      code: value.code.trim(),
      name: value.name.trim(),
      shortName: value.shortName.trim() || undefined,
      sequence: value.sequence,
      nextLevelId: value.terminal || !value.nextLevelId ? undefined : value.nextLevelId,
      terminal: value.terminal
    };
    this.saving.set(true);
    const request = editing
      ? this.dataSource.update(editing.id, payload)
      : this.dataSource.create(payload);
    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (level) => {
        this.notifications.success(
          editing ? `${level.name} est à jour.` : `${level.name} a été créé.`,
          editing ? 'Niveau modifié' : 'Niveau créé');
        this.afterWrite();
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  archive(level: Level): void {
    this.dataSource.archive(level.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.notifications.success(
            `${level.name} n'apparaît plus dans les listes de choix.`, 'Niveau archivé');
          this.afterWrite();
        },
        error: (err) => this.explain(err)
      });
  }

  restore(level: Level): void {
    this.dataSource.restore(level.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: () => this.afterWrite(), error: (err) => this.explain(err) });
  }

  private afterWrite(): void {
    this.saving.set(false);
    this.closePanel();
    this.load();
    this.setupStatus.refresh();
  }

  private explain(err: unknown): void {
    const code = (err as { error?: { code?: string } } | null | undefined)?.error?.code;
    if (code) {
      this.notifications.error(translateErrorCode(code), 'Action refusée');
    }
  }
}
