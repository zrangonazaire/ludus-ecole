import { Injectable, computed, signal } from '@angular/core';
import { DEFAULT_DEMO_SETUP_DRAFT, DEMO_SETUP_VERSION } from '@core/models/demo-setup.models';
import * as i0 from "@angular/core";
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
export const CYCLES_BY_PRESET = {
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
export class DemoSetupStore {
    state = signal(this.restore());
    draft = this.state.asReadonly();
    hasDraft = computed(() => this.state().updatedAt.length > 0);
    updateProfile(profile) {
        this.update({ profile });
    }
    updatePriorities(priorities) {
        this.update({ priorities });
    }
    updateRules(rules) {
        this.update({ rules });
    }
    updateOperations(operations) {
        this.update({ operations });
    }
    markStepCompleted(step) {
        const completedStep = Math.max(this.state().completedStep, step);
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
    operationsForSignup() {
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
    reset() {
        this.state.set(structuredClone(DEFAULT_DEMO_SETUP_DRAFT));
        this.removeStoredDraft();
    }
    update(change) {
        const next = {
            ...this.state(),
            ...change,
            version: DEMO_SETUP_VERSION,
            updatedAt: new Date().toISOString()
        };
        this.state.set(next);
        this.persist(next);
    }
    restore() {
        if (typeof sessionStorage === 'undefined') {
            return structuredClone(DEFAULT_DEMO_SETUP_DRAFT);
        }
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return structuredClone(DEFAULT_DEMO_SETUP_DRAFT);
            }
            const parsed = JSON.parse(raw);
            if (parsed.version !== DEMO_SETUP_VERSION || !parsed.profile || !parsed.priorities || !parsed.rules) {
                this.removeStoredDraft();
                return structuredClone(DEFAULT_DEMO_SETUP_DRAFT);
            }
            return { ...structuredClone(DEFAULT_DEMO_SETUP_DRAFT), ...parsed };
        }
        catch {
            this.removeStoredDraft();
            return structuredClone(DEFAULT_DEMO_SETUP_DRAFT);
        }
    }
    persist(draft) {
        if (typeof sessionStorage === 'undefined') {
            return;
        }
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        }
        catch {
            // Storage may be disabled. The in-memory draft still keeps the flow usable.
        }
    }
    removeStoredDraft() {
        if (typeof sessionStorage === 'undefined') {
            return;
        }
        try {
            sessionStorage.removeItem(STORAGE_KEY);
        }
        catch {
            // Nothing else to do when browser storage is unavailable.
        }
    }
    static ɵfac = function DemoSetupStore_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DemoSetupStore)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: DemoSetupStore, factory: DemoSetupStore.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DemoSetupStore, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
/**
 * Combien de niveaux chaque profil ouvre.
 *
 * <p>Dérivé de {@link CYCLES_BY_PRESET}, jamais recopié : un total tenu à part
 * finit toujours par annoncer neuf niveaux là où l'inscription en crée sept.</p>
 */
export const LEVELS_PER_PRESET = Object.fromEntries(Object.entries(CYCLES_BY_PRESET).map(([preset, cycles]) => [preset, cycles.reduce((total, cycle) => total + cycle.levels.length, 0)]));
//# sourceMappingURL=demo-setup.store.js.map