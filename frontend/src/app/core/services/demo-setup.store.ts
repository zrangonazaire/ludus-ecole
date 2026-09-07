import { Injectable, computed, signal } from '@angular/core';
import { SignupOperations } from '@core/models/signup.models';
import {
  DEFAULT_DEMO_SETUP_DRAFT,
  DEMO_SETUP_VERSION,
  DemoOperationalConfiguration,
  DemoPriorities,
  DemoRules,
  DemoSchoolProfile,
  DemoSetupDraft,
  SchoolPreset
} from '@core/models/demo-setup.models';

const STORAGE_KEY = `eduops.demo-setup.v${DEMO_SETUP_VERSION}`;

/**
 * Les cycles que chaque profil recouvre, selon le système ivoirien.
 *
 * <p>Le parcours ne fait pas saisir les niveaux un par un : il demande à quel
 * type d'établissement on a affaire, et c'est de là que découle la structure.
 * La rendre explicite ici évite que le visiteur arrive sur un espace vide
 * après avoir répondu à la question.</p>
 *
 * <p>Ce n'est qu'un point de départ : l'école ajoute, renomme ou supprime
 * ensuite depuis l'écran Niveaux. Une structure fausse mais modifiable vaut
 * mieux qu'une page blanche.</p>
 */
export const CYCLES_BY_PRESET: Record<SchoolPreset,
  readonly { code: string; name: string; levels: readonly string[] }[]> = {
  primary: [
    { code: 'MAT', name: 'Maternelle',
      levels: ['Petite section', 'Moyenne section', 'Grande section'] },
    { code: 'PRI', name: 'Primaire',
      levels: ['CP1', 'CP2', 'CE1', 'CE2', 'CM1', 'CM2'] }
  ],
  secondary: [
    { code: 'COL', name: 'Collège',
      levels: ['6ème', '5ème', '4ème', '3ème'] },
    { code: 'LYC', name: 'Lycée',
      levels: ['2nde', '1ère', 'Terminale'] }
  ],
  group: [
    { code: 'MAT', name: 'Maternelle',
      levels: ['Petite section', 'Moyenne section', 'Grande section'] },
    { code: 'PRI', name: 'Primaire',
      levels: ['CP1', 'CP2', 'CE1', 'CE2', 'CM1', 'CM2'] },
    { code: 'COL', name: 'Collège',
      levels: ['6ème', '5ème', '4ème', '3ème'] },
    { code: 'LYC', name: 'Lycée',
      levels: ['2nde', '1ère', 'Terminale'] }
  ]
};

/**
 * Session-scoped hand-off between the public configurator and signup/onboarding.
 *
 * The versioned payload is deliberately small and contains no account data. A
 * future onboarding flow can inject this store and consume `draft()` after the
 * account has been created.
 */
@Injectable({ providedIn: 'root' })
export class DemoSetupStore {
  private readonly state = signal<DemoSetupDraft>(this.restore());

  readonly draft = this.state.asReadonly();
  readonly hasDraft = computed(() => this.state().updatedAt.length > 0);

  updateProfile(profile: DemoSchoolProfile): void {
    this.update({ profile });
  }

  updatePriorities(priorities: DemoPriorities): void {
    this.update({ priorities });
  }

  updateRules(rules: DemoRules): void {
    this.update({ rules });
  }

  updateOperations(operations: DemoOperationalConfiguration): void {
    this.update({ operations });
  }

  markStepCompleted(step: 1 | 2 | 3 | 4): void {
    const completedStep = Math.max(this.state().completedStep, step) as 1 | 2 | 3 | 4;
    this.update({ completedStep });
  }

  /**
   * Ce que le brouillon vaut pour le serveur, au moment de l'inscription.
   *
   * <p>Le parcours promet « un espace qui reprend vos cycles, vos règles et vos
   * priorités ». Les cycles ne sont pas saisis un par un : ils découlent du
   * profil choisi — primaire, secondaire, groupe scolaire. C'est ici qu'on les
   * rend explicites, plutôt que de laisser le visiteur découvrir sur son
   * tableau de bord que rien n'a été créé.</p>
   *
   * <p>Renvoie `undefined` quand le parcours n'a pas été suivi : une école
   * créée depuis l'en-tête ne doit pas hériter d'une structure qu'on ne lui a
   * jamais demandée.</p>
   */
  operationsForSignup(): SignupOperations | undefined {
    const draft = this.draft();
    if (draft.completedStep === 0) {
      return undefined;
    }
    const cycles = CYCLES_BY_PRESET[draft.profile.preset];
    if (!cycles) {
      return undefined;
    }
    return {
      cycles: cycles.map((cycle) => ({ ...cycle, levels: [...cycle.levels] })),
      // Le nombre saisi, pas une valeur décidée à sa place. Le parcours
      // affiche le total avant validation — « 21 classes, 840 places » — pour
      // que le chiffre soit corrigé avant la création, pas après.
      classesPerLevel: draft.rules.classesPerLevel,
      classCapacity: draft.rules.classCapacity,
      subjects: [],
      fees: undefined
    };
  }

  reset(): void {
    this.state.set(structuredClone(DEFAULT_DEMO_SETUP_DRAFT));
    this.removeStoredDraft();
  }

  private update(change: Partial<Omit<DemoSetupDraft, 'version' | 'updatedAt'>>): void {
    const next: DemoSetupDraft = {
      ...this.state(),
      ...change,
      version: DEMO_SETUP_VERSION,
      updatedAt: new Date().toISOString()
    };
    this.state.set(next);
    this.persist(next);
  }

  private restore(): DemoSetupDraft {
    if (typeof sessionStorage === 'undefined') {
      return structuredClone(DEFAULT_DEMO_SETUP_DRAFT);
    }

    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return structuredClone(DEFAULT_DEMO_SETUP_DRAFT);
      }
      const parsed = JSON.parse(raw) as Partial<DemoSetupDraft>;
      if (parsed.version !== DEMO_SETUP_VERSION || !parsed.profile || !parsed.priorities || !parsed.rules) {
        this.removeStoredDraft();
        return structuredClone(DEFAULT_DEMO_SETUP_DRAFT);
      }
      return { ...structuredClone(DEFAULT_DEMO_SETUP_DRAFT), ...parsed } as DemoSetupDraft;
    } catch {
      this.removeStoredDraft();
      return structuredClone(DEFAULT_DEMO_SETUP_DRAFT);
    }
  }

  private persist(draft: DemoSetupDraft): void {
    if (typeof sessionStorage === 'undefined') {
      return;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Storage may be disabled. The in-memory draft still keeps the flow usable.
    }
  }

  private removeStoredDraft(): void {
    if (typeof sessionStorage === 'undefined') {
      return;
    }
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing else to do when browser storage is unavailable.
    }
  }
}

/**
 * Combien de niveaux chaque profil ouvre.
 *
 * <p>Dérivé de {@link CYCLES_BY_PRESET}, jamais recopié : un total tenu à part
 * finit toujours par annoncer neuf niveaux là où l'inscription en crée sept.</p>
 */
export const LEVELS_PER_PRESET: Record<SchoolPreset, number> =
  Object.fromEntries(
    Object.entries(CYCLES_BY_PRESET).map(([preset, cycles]) =>
      [preset, cycles.reduce((total, cycle) => total + cycle.levels.length, 0)])
  ) as Record<SchoolPreset, number>;
