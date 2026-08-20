import { Injectable, computed, signal } from '@angular/core';
import {
  DEFAULT_DEMO_SETUP_DRAFT,
  DEMO_SETUP_VERSION,
  DemoOperationalConfiguration,
  DemoPriorities,
  DemoRules,
  DemoSchoolProfile,
  DemoSetupDraft
} from '@core/models/demo-setup.models';

const STORAGE_KEY = `eduops.demo-setup.v${DEMO_SETUP_VERSION}`;

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
