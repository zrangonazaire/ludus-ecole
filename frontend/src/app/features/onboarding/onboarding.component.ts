import {
  ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { translateErrorCode } from '@core/services/error-messages';
import {
  OnboardingCyclePayload, OnboardingLevelPayload, OnboardingPayload, OnboardingService
} from '@core/services/onboarding.service';

/** How the classes of a level are named. */
export type ClassNaming = 'LETTER' | 'NUMBER' | 'CUSTOM';

/**
 * Everything that is decided per level.
 *
 * <p>Schools do not run on a single template: a primary class may be named
 * "CP1 Etoile" while the secondary uses "3eme A", and tuition almost always
 * rises with the level. The database already models this
 * ({@code classroom.name} is free text, {@code fee_schedule.level_id} scopes a
 * price to one level), so the wizard must not flatten it.</p>
 */
export interface LevelSetup {
  cycleCode: string;
  code: string;
  name: string;
  selected: boolean;
  classCount: number;
  naming: ClassNaming;
  /** Comma-separated, used when naming is CUSTOM. */
  customNames: string;
  capacity: number;
  registrationFee: number;
  tuitionTotal: number;
  instalments: number;
}

interface CycleTemplate {
  code: string;
  name: string;
  selected: boolean;
  levels: { code: string; name: string; selected: boolean }[];
}

interface SubjectTemplate {
  code: string;
  name: string;
  coefficient: number;
  selected: boolean;
}

@Component({
  selector: 'eduops-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly onboarding = inject(OnboardingService);
  private readonly destroyRef = inject(DestroyRef);

  readonly step = signal<1 | 2 | 3 | 4>(1);
  readonly saving = signal(false);
  readonly user = this.auth.currentUser;

  /** Which level is expanded in steps 2 and 4. */
  readonly openLevel = signal<string | null>(null);

  readonly cycles = signal<CycleTemplate[]>([
    {
      code: 'PRE', name: 'Préscolaire', selected: false,
      levels: [
        { code: 'PS', name: 'Petite section', selected: true },
        { code: 'MS', name: 'Moyenne section', selected: true },
        { code: 'GS', name: 'Grande section', selected: true }
      ]
    },
    {
      code: 'PRI', name: 'Primaire', selected: true,
      levels: [
        { code: 'CP1', name: 'CP1', selected: true },
        { code: 'CP2', name: 'CP2', selected: true },
        { code: 'CE1', name: 'CE1', selected: true },
        { code: 'CE2', name: 'CE2', selected: true },
        { code: 'CM1', name: 'CM1', selected: true },
        { code: 'CM2', name: 'CM2', selected: true }
      ]
    },
    {
      code: 'COL', name: 'Collège', selected: true,
      levels: [
        { code: '6EME', name: '6eme', selected: true },
        { code: '5EME', name: '5eme', selected: true },
        { code: '4EME', name: '4eme', selected: true },
        { code: '3EME', name: '3eme', selected: true }
      ]
    },
    {
      code: 'LYC', name: 'Lycée', selected: false,
      levels: [
        { code: '2NDE', name: '2nde', selected: true },
        { code: '1ERE', name: '1ere', selected: true },
        { code: 'TLE', name: 'Terminale', selected: true }
      ]
    }
  ]);

  /** Per-level settings, rebuilt whenever the cycle selection changes. */
  readonly levelSetups = signal<LevelSetup[]>([]);

  readonly subjects = signal<SubjectTemplate[]>([
    { code: 'FRA', name: 'Français', coefficient: 4, selected: true },
    { code: 'MAT', name: 'Mathematiques', coefficient: 4, selected: true },
    { code: 'ANG', name: 'Anglais', coefficient: 2, selected: true },
    { code: 'HG', name: 'Histoire-Geographie', coefficient: 2, selected: true },
    { code: 'SVT', name: 'Sciences de la Vie et de la Terre', coefficient: 2, selected: true },
    { code: 'PC', name: 'Physique-Chimie', coefficient: 2, selected: true },
    { code: 'EPS', name: 'Education Physique et Sportive', coefficient: 1, selected: true },
    { code: 'ECM', name: 'Education Civique et Morale', coefficient: 1, selected: false },
    { code: 'INFO', name: 'Informatique', coefficient: 1, selected: false }
  ]);

  /** Values used by the "apply to every level" shortcuts. */
  readonly bulk = signal({
    classCount: 2,
    capacity: 40,
    registrationFee: 25000,
    tuitionTotal: 600000,
    instalments: 3
  });

  constructor() {
    this.rebuildLevelSetups();
  }

  // ---------------------------------------------------------------- totals

  readonly activeLevels = computed(() => this.levelSetups().filter((l) => l.selected));

  readonly totalClasses = computed(() =>
    this.activeLevels().reduce((n, l) => n + l.classCount, 0));

  readonly totalSeats = computed(() =>
    this.activeLevels().reduce((n, l) => n + l.classCount * l.capacity, 0));

  readonly selectedSubjectCount = computed(() =>
    this.subjects().filter((s) => s.selected).length);

  /** Range of annual tuition across levels, shown as a sanity check. */
  readonly tuitionRange = computed(() => {
    const values = this.activeLevels().map((l) => l.tuitionTotal);
    if (values.length === 0) {
      return null;
    }
    return { min: Math.min(...values), max: Math.max(...values) };
  });

  // ------------------------------------------------------------- cycles

  toggleCycle(code: string): void {
    this.cycles.update((list) =>
      list.map((c) => (c.code === code ? { ...c, selected: !c.selected } : c)));
    this.rebuildLevelSetups();
  }

  toggleLevel(cycleCode: string, levelCode: string): void {
    this.cycles.update((list) =>
      list.map((c) => c.code !== cycleCode ? c : {
        ...c,
        levels: c.levels.map((l) =>
          l.code === levelCode ? { ...l, selected: !l.selected } : l)
      }));
    this.rebuildLevelSetups();
  }

  /**
   * Keeps {@link levelSetups} in step with the cycle selection, preserving any
   * value the administrator already typed for a level that stays selected.
   */
  private rebuildLevelSetups(): void {
    const previous = new Map(this.levelSetups().map((l) => [l.code, l]));
    const defaults = this.bulk();
    const next: LevelSetup[] = [];

    for (const cycle of this.cycles()) {
      if (!cycle.selected) {
        continue;
      }
      for (const level of cycle.levels) {
        if (!level.selected) {
          continue;
        }
        next.push(previous.get(level.code) ?? {
          cycleCode: cycle.code,
          code: level.code,
          name: level.name,
          selected: true,
          classCount: defaults.classCount,
          naming: 'LETTER',
          customNames: '',
          capacity: defaults.capacity,
          registrationFee: defaults.registrationFee,
          tuitionTotal: defaults.tuitionTotal,
          instalments: defaults.instalments
        });
      }
    }
    this.levelSetups.set(next);
  }

  // -------------------------------------------------------- per level edits

  private patchLevel(code: string, patch: Partial<LevelSetup>): void {
    this.levelSetups.update((list) =>
      list.map((l) => (l.code === code ? { ...l, ...patch } : l)));
  }

  setClassCount(code: string, value: number): void {
    this.patchLevel(code, { classCount: Math.max(1, Math.min(20, Number(value) || 1)) });
  }

  setCapacity(code: string, value: number): void {
    this.patchLevel(code, { capacity: Math.max(1, Math.min(200, Number(value) || 1)) });
  }

  setNaming(code: string, value: ClassNaming): void {
    this.patchLevel(code, { naming: value });
  }

  setCustomNames(code: string, value: string): void {
    this.patchLevel(code, { customNames: value });
  }

  setRegistrationFee(code: string, value: number): void {
    this.patchLevel(code, { registrationFee: Math.max(0, Number(value) || 0) });
  }

  setTuitionTotal(code: string, value: number): void {
    this.patchLevel(code, { tuitionTotal: Math.max(0, Number(value) || 0) });
  }

  setInstalments(code: string, value: number): void {
    this.patchLevel(code, { instalments: Math.max(1, Number(value) || 1) });
  }

  toggleOpenLevel(code: string): void {
    this.openLevel.update((current) => (current === code ? null : code));
  }

  // ------------------------------------------------------------- bulk apply

  setBulk(field: keyof ReturnType<typeof this.bulk>, value: number): void {
    this.bulk.update((b) => ({ ...b, [field]: Number(value) || 0 }));
  }

  /** Copies one bulk value onto every level, so nobody types it thirteen times. */
  applyToAllLevels(field: 'classCount' | 'capacity' | 'registrationFee'
                        | 'tuitionTotal' | 'instalments'): void {
    const value = this.bulk()[field];
    this.levelSetups.update((list) => list.map((l) => ({ ...l, [field]: value })));
    this.notifications.info(`Valeur appliquee aux ${this.activeLevels().length} niveaux.`);
  }

  // ------------------------------------------------------------- previews

  /** The class names that will actually be created for a level. */
  classNamesFor(level: LevelSetup): string[] {
    if (level.naming === 'CUSTOM') {
      const parts = level.customNames.split(',').map((p) => p.trim()).filter(Boolean);
      return parts.length > 0 ? parts : [level.name];
    }
    const suffixes = level.naming === 'LETTER'
      ? 'ABCDEFGHIJKLMNOPQRST'.split('')
      : Array.from({ length: 20 }, (_, i) => String(i + 1));
    return Array.from({ length: level.classCount },
      (_, i) => `${level.name} ${suffixes[i] ?? i + 1}`);
  }

  instalmentAmount(level: LevelSetup): number {
    return level.instalments > 0
      ? Math.round(level.tuitionTotal / level.instalments)
      : 0;
  }

  totalPerStudent(level: LevelSetup): number {
    return level.tuitionTotal + level.registrationFee;
  }

  // --------------------------------------------------------------- subjects

  toggleSubject(code: string): void {
    this.subjects.update((list) =>
      list.map((s) => (s.code === code ? { ...s, selected: !s.selected } : s)));
  }

  updateCoefficient(code: string, value: number): void {
    this.subjects.update((list) =>
      list.map((s) => (s.code === code ? { ...s, coefficient: Number(value) || 1 } : s)));
  }

  // ------------------------------------------------------------- navigation

  next(): void {
    this.step.update((s) => (s < 4 ? ((s + 1) as 2 | 3 | 4) : s));
  }

  back(): void {
    this.step.update((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s));
  }

  skip(): void {
    void this.router.navigate(['/dashboard']);
  }

  /**
   * Envoie la configuration au serveur, et n'annonce que ce qui a été créé.
   *
   * <p>Cette méthode se contentait d'un `setTimeout` de 900 ms suivi d'un
   * message « Établissement configuré » énonçant les chiffres saisis. Rien
   * n'était enregistré — le composant n'injectait même pas de source de
   * données. Le directeur ne s'en apercevait que des semaines plus tard,
   * devant un écran Classes vide.</p>
   *
   * <p>Le message final reprend maintenant les compteurs renvoyés par le
   * serveur, pas les nôtres. S'il en crée quatre là où l'écran en montrait
   * quatorze, c'est quatre qui s'affichent.</p>
   */
  finish(): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.onboarding.apply(this.buildPayload())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (result) => {
          this.saving.set(false);
          this.notifications.success(
            `${result.levels} niveau(x), ${result.classrooms} classe(s), `
            + `${result.subjects} matière(s) et ${result.feeSchedules} barème(s) `
            + 'créés, avec une scolarité propre à chaque niveau.',
            'Établissement configuré');
          // Ce qui a été écarté se dit à part : l'école voit quoi reprendre
          // plutôt que de découvrir un niveau manquant dans trois semaines.
          if (result.skipped.length > 0) {
            this.notifications.warning(result.skipped.join(' '),
              `${result.skipped.length} élément(s) ignoré(s)`);
          }
          void this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.saving.set(false);
          // On reste sur l'assistant : rien n'a été créé côté serveur, la
          // saisie est intacte, et l'utilisateur peut réessayer sans tout
          // ressaisir. L'envoyer au tableau de bord lui ferait croire que
          // c'est passé.
          // Le serveur écrit souvent mieux que le catalogue de codes : il sait
          // que « l'établissement a déjà des cycles » et dit quoi faire à la
          // place. Le remplacer par « L'opération est en conflit avec l'état
          // actuel » perdrait tout ce qui est utile.
          const failure = (err as { error?: { code?: string; message?: string } })?.error;
          const message = failure?.message?.trim()
            || translateErrorCode(failure?.code ?? 'UNKNOWN');
          this.notifications.error(message,
            'La configuration n’a pas été enregistrée');
        }
      });
  }

  /** Traduit l'état de l'assistant en ce que le serveur attend. */
  private buildPayload(): OnboardingPayload {
    const levelsByCycle = new Map<string, OnboardingLevelPayload[]>();
    for (const level of this.activeLevels()) {
      const rows = levelsByCycle.get(level.cycleCode) ?? [];
      rows.push({
        code: level.code,
        name: level.name,
        // Les noms sont résolus ici, pas sur le serveur : l'école recevra
        // exactement ceux que l'aperçu lui a montrés, y compris les siens.
        classNames: this.classNamesFor(level),
        capacity: level.capacity,
        registrationFee: level.registrationFee,
        tuitionTotal: level.tuitionTotal,
        instalments: level.instalments
      });
      levelsByCycle.set(level.cycleCode, rows);
    }

    const cycles: OnboardingCyclePayload[] = [];
    for (const cycle of this.cycles()) {
      const levels = levelsByCycle.get(cycle.code);
      // Un cycle dont aucun niveau n'est retenu n'a rien à ouvrir.
      if (!levels || levels.length === 0) {
        continue;
      }
      cycles.push({ code: cycle.code, name: cycle.name, levels });
    }

    return {
      cycles,
      subjects: this.subjects()
        .filter((subject) => subject.selected)
        .map((subject) => ({
          code: subject.code,
          name: subject.name,
          coefficient: subject.coefficient
        }))
    };
  }

  firstName(): string {
    return this.user()?.fullName.split(' ')[0] ?? '';
  }
}
