import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CURRICULUM_DATA_SOURCE } from '@core/datasource/data-source';
import {
  CurriculumSubjectPayload, LevelCurriculum, SUBJECT_CATEGORIES, SUBJECT_COLORS,
  SubjectCategoryCode, SubjectItem
} from '@core/models/curriculum.models';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

/** Les deux moitiés de l'écran : le catalogue, et le programme par niveau. */
export type SubjectsTab = 'CATALOGUE' | 'PROGRAMME';

/** Panneau latéral ouvert. */
export type SubjectsPanel = 'SUBJECT' | 'APPLY' | null;

/**
 * Subjects and programme — the two configuration steps that gate report cards.
 *
 * <p>They live on one screen because they answer one question in two halves:
 * what does the school teach, and with what weight at each level. Splitting
 * them across two pages made people declare subjects and never come back to
 * weight them, which leaves averages uncomputable without saying so.</p>
 */
@Component({
  selector: 'eduops-subjects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,
    LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent implements OnInit {
  private readonly dataSource = inject(CURRICULUM_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly setupStatus = inject(SetupStatusService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly categories = SUBJECT_CATEGORIES;
  readonly colors = SUBJECT_COLORS;

  readonly tab = signal<SubjectsTab>('CATALOGUE');
  readonly subjects = signal<SubjectItem[]>([]);
  readonly levels = signal<LevelCurriculum[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);

  readonly panel = signal<SubjectsPanel>(null);
  readonly editingSubject = signal<SubjectItem | null>(null);
  readonly openLevelId = signal<string | null>(null);
  readonly showArchived = signal(false);

  /** Niveaux cochés dans le panneau d'application groupée. */
  readonly applyTargets = signal<string[]>([]);
  /** Matière → coefficient, pour l'application groupée. */
  readonly applyRows = signal<Map<string, number>>(new Map());
  applyReplace = false;

  readonly subjectForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(20)]],
    name: ['', [Validators.required, Validators.maxLength(150)]],
    shortName: ['', [Validators.maxLength(40)]],
    category: ['SCIENCE' as SubjectCategoryCode, [Validators.required]],
    colorHex: [SUBJECT_COLORS[0]],
    graded: [true]
  });

  /** Ligne en cours d'ajout sur un niveau. */
  readonly rowForm = this.fb.nonNullable.group({
    subjectId: ['', [Validators.required]],
    coefficient: [2, [Validators.required, Validators.min(0.01), Validators.max(20)]],
    weeklyHours: [2, [Validators.min(0), Validators.max(40)]],
    mandatory: [true]
  });

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('tab') === 'programme') {
      this.tab.set('PROGRAMME');
    }
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);

    this.dataSource.listSubjects(this.showArchived())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => {
          this.subjects.set(list);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.error.set(true);
        }
      });

    this.dataSource.levels().pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (list) => this.levels.set(list),
        // Un programme illisible ne doit pas vider le catalogue.
        error: () => this.levels.set([])
      });
  }

  changeTab(tab: SubjectsTab): void {
    this.tab.set(tab);
    this.panel.set(null);
  }

  toggleArchived(): void {
    this.showArchived.update((v) => !v);
    this.load();
  }

  // ------------------------------------------------------------------ vues

  readonly activeSubjects = computed<SubjectItem[]>(
    () => this.subjects().filter((s) => s.status === 'ACTIVE'));

  /** Niveaux sans aucune matière notée : ce sont eux qui bloquent les bulletins. */
  readonly levelsWithoutProgramme = computed<LevelCurriculum[]>(
    () => this.levels().filter((l) => !l.ready));

  readonly readyCount = computed(() => this.levels().filter((l) => l.ready).length);

  /** Niveaux regroupés par cycle, pour le panneau d'application groupée. */
  readonly cycles = computed<Array<{ id: string; name: string; levels: LevelCurriculum[] }>>(() => {
    const groups = new Map<string, { id: string; name: string; levels: LevelCurriculum[] }>();
    this.levels().forEach((level) => {
      const group = groups.get(level.cycleId);
      if (group) {
        group.levels.push(level);
      } else {
        groups.set(level.cycleId,
          { id: level.cycleId, name: level.cycleName, levels: [level] });
      }
    });
    return Array.from(groups.values());
  });

  toggleLevel(levelId: string): void {
    this.openLevelId.set(this.openLevelId() === levelId ? null : levelId);
    this.rowForm.reset({ subjectId: '', coefficient: 2, weeklyHours: 2, mandatory: true });
  }

  /** Matières encore disponibles pour ce niveau. */
  availableFor(level: LevelCurriculum): SubjectItem[] {
    const used = new Set(level.subjects.map((s) => s.subjectId));
    return this.activeSubjects().filter((s) => !used.has(s.id));
  }

  levelById(levelId: string): LevelCurriculum | undefined {
    return this.levels().find((l) => l.levelId === levelId);
  }

  // --------------------------------------------------------- catalogue

  openSubject(subject?: SubjectItem): void {
    this.editingSubject.set(subject ?? null);
    this.subjectForm.reset({
      code: subject?.code ?? '',
      name: subject?.name ?? '',
      shortName: subject?.shortName ?? '',
      category: subject?.category ?? 'SCIENCE',
      colorHex: subject?.colorHex ?? SUBJECT_COLORS[0],
      graded: subject?.graded ?? true
    });
    this.panel.set('SUBJECT');
  }

  pickColor(color: string): void {
    this.subjectForm.patchValue({ colorHex: color });
  }

  submitSubject(): void {
    if (this.subjectForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.subjectForm.getRawValue();
    const payload = {
      code: value.code.trim(),
      name: value.name.trim(),
      shortName: value.shortName.trim() || undefined,
      category: value.category,
      colorHex: value.colorHex,
      graded: value.graded
    };
    const editing = this.editingSubject();
    const request = editing
      ? this.dataSource.updateSubject(editing.id, payload)
      : this.dataSource.createSubject(payload);

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (subject) => {
        this.notifications.success(
          editing ? `${subject.name} est à jour.` : `${subject.name} a été ajoutée.`,
          editing ? 'Matière modifiée' : 'Matière créée');
        this.afterWrite();
      },
      error: () => this.saving.set(false)
    });
  }

  archiveSubject(subject: SubjectItem): void {
    this.dataSource.archiveSubject(subject.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.notifications.success(
            `${subject.name} n'apparaît plus dans les listes de choix.`, 'Matière archivée');
          this.load();
        },
        error: (err) => this.explain(err)
      });
  }

  restoreSubject(subject: SubjectItem): void {
    this.dataSource.restoreSubject(subject.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: () => this.load() });
  }

  // --------------------------------------------------------- programme

  addRow(level: LevelCurriculum): void {
    if (this.rowForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.rowForm.getRawValue();
    this.write(level.levelId, {
      subjectId: value.subjectId,
      coefficient: value.coefficient,
      weeklyHours: value.weeklyHours,
      mandatory: value.mandatory
    }, () => {
      this.rowForm.reset({ subjectId: '', coefficient: 2, weeklyHours: 2, mandatory: true });
    });
  }

  /**
   * Un coefficient modifié dans la grille part directement au serveur.
   *
   * Pas de bouton « Enregistrer » : sur un tableau de dix lignes, il crée
   * surtout des modifications perdues quand on change d'onglet.
   */
  changeCoefficient(levelId: string, subjectId: string, raw: string,
                    weeklyHours: number, mandatory: boolean): void {
    const coefficient = Number(raw);
    if (!Number.isFinite(coefficient) || coefficient <= 0) {
      this.notifications.error(
        'Le coefficient doit être strictement positif.', 'Valeur refusée');
      return;
    }
    this.write(levelId, { subjectId, coefficient, weeklyHours, mandatory });
  }

  changeHours(levelId: string, subjectId: string, raw: string,
              coefficient: number, mandatory: boolean): void {
    const weeklyHours = Number(raw);
    if (!Number.isFinite(weeklyHours) || weeklyHours < 0) {
      return;
    }
    this.write(levelId, { subjectId, coefficient, weeklyHours, mandatory });
  }

  removeRow(levelId: string, subjectId: string, subjectName: string): void {
    this.dataSource.removeLevelSubject(levelId, subjectId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updated) => {
          this.replaceLevel(updated);
          this.notifications.success(`${subjectName} retirée du programme.`);
          this.setupStatus.refresh();
        },
        error: (err) => this.explain(err)
      });
  }

  private write(levelId: string, payload: CurriculumSubjectPayload,
                onDone?: () => void): void {
    this.dataSource.upsertLevelSubject(levelId, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updated) => {
          this.replaceLevel(updated);
          this.saving.set(false);
          this.setupStatus.refresh();
          onDone?.();
        },
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  private replaceLevel(updated: LevelCurriculum): void {
    this.levels.update((list) =>
      list.map((l) => (l.levelId === updated.levelId ? updated : l)));
  }

  // ------------------------------------------------- application groupée

  openApply(levelId?: string): void {
    const source = levelId ? this.levelById(levelId) : undefined;
    const rows = new Map<string, number>();
    if (source) {
      source.subjects.forEach((s) => rows.set(s.subjectId, s.coefficient));
    }
    this.applyRows.set(rows);
    this.applyTargets.set(levelId ? [levelId] : []);
    this.applyReplace = false;
    this.panel.set('APPLY');
  }

  toggleTarget(levelId: string): void {
    this.applyTargets.update((list) => list.includes(levelId)
      ? list.filter((id) => id !== levelId)
      : [...list, levelId]);
  }

  toggleCycleTargets(cycleId: string): void {
    const ids = this.levels().filter((l) => l.cycleId === cycleId).map((l) => l.levelId);
    const allSelected = ids.every((id) => this.applyTargets().includes(id));
    this.applyTargets.update((list) => allSelected
      ? list.filter((id) => !ids.includes(id))
      : Array.from(new Set([...list, ...ids])));
  }

  isTargeted(levelId: string): boolean {
    return this.applyTargets().includes(levelId);
  }

  toggleApplyRow(subjectId: string): void {
    this.applyRows.update((map) => {
      const next = new Map(map);
      if (next.has(subjectId)) {
        next.delete(subjectId);
      } else {
        next.set(subjectId, 2);
      }
      return next;
    });
  }

  setApplyCoefficient(subjectId: string, raw: string): void {
    const value = Number(raw);
    if (!Number.isFinite(value) || value <= 0) {
      return;
    }
    this.applyRows.update((map) => new Map(map).set(subjectId, value));
  }

  applyCoefficientOf(subjectId: string): number {
    return this.applyRows().get(subjectId) ?? 2;
  }

  isApplyRow(subjectId: string): boolean {
    return this.applyRows().has(subjectId);
  }

  readonly applyTotal = computed(() =>
    Array.from(this.applyRows().values()).reduce((sum, v) => sum + v, 0));

  canApply(): boolean {
    return this.applyTargets().length > 0 && this.applyRows().size > 0 && !this.saving();
  }

  submitApply(): void {
    if (!this.canApply()) {
      return;
    }
    this.saving.set(true);
    const subjects: CurriculumSubjectPayload[] =
      Array.from(this.applyRows().entries()).map(([subjectId, coefficient]) => ({
        subjectId, coefficient, mandatory: true
      }));

    this.dataSource.apply({
      levelIds: this.applyTargets(),
      subjects,
      replaceExisting: this.applyReplace
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (updated) => {
        this.notifications.success(
          `${subjects.length} matière(s) appliquées à ${updated.length} niveau(x).`,
          'Programme appliqué');
        this.afterWrite();
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  // ------------------------------------------------------------ internals

  closePanel(): void {
    this.panel.set(null);
    this.editingSubject.set(null);
  }

  private afterWrite(): void {
    this.saving.set(false);
    this.closePanel();
    this.load();
    this.setupStatus.refresh();
  }

  /** Traduit le code d'erreur du serveur plutôt que d'afficher « erreur ». */
  private explain(err: unknown): void {
    const code = (err as { error?: { code?: string } })?.error?.code;
    if (code) {
      this.notifications.error(translateErrorCode(code), 'Action refusée');
    }
  }
}
