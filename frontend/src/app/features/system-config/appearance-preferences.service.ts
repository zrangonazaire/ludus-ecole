import { Injectable, inject } from '@angular/core';

export type FontSizeChoice = 'small' | 'normal' | 'large';

export interface AppearancePreferences {
  /** Couleur principale (hex, ex. #1f5fd6). */
  brand: string;
  /** Taille de police de l'interface. */
  fontSize: FontSizeChoice;
  /** Devise d'affichage (3 lettres, ex. XOF). */
  currency: string;
  /** Langue d'affichage. */
  locale: string;
  /** Fuseau horaire d'affichage. */
  timezone: string;
}

const DEFAULTS: AppearancePreferences = {
  brand: '#1f5fd6',
  fontSize: 'normal',
  currency: 'XOF',
  locale: 'fr-CI',
  timezone: 'Africa/Abidjan'
};

const FONT_PX: Record<FontSizeChoice, string> = {
  small: '13px',
  normal: '14px',
  large: '16px'
};

function key(schoolId?: string): string {
  return `eduops.appearance.${schoolId ?? 'global'}`;
}

/**
 * Préférences « Apparence et région » : affichage local du front.
 *
 * <p>Stockées dans le navigateur (localStorage, par établissement), appliquées
 * immédiatement sur `:root` (couleur `--brand`, taille de police). Elles ne
 * remplacent pas les paramètres serveur (`PUT /api/v1/school` : devise, langue,
 * fuseau de l'établissement) — ce sont des surcharges d'affichage sur ce
 * navigateur, réversibles via « Réinitialiser ».</p>
 */
@Injectable({ providedIn: 'root' })
export class AppearancePreferencesService {
  constructor() {
    this.apply(this.load());
  }

  load(schoolId?: string): AppearancePreferences {
    try {
      const raw = localStorage.getItem(key(schoolId));
      if (!raw) {
        return { ...DEFAULTS };
      }
      return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<AppearancePreferences>) };
    } catch {
      return { ...DEFAULTS };
    }
  }

  save(prefs: AppearancePreferences, schoolId?: string): void {
    try {
      localStorage.setItem(key(schoolId), JSON.stringify(prefs));
    } catch {
      // Stockage indisponible : les préférences restent valables pour la session.
    }
    this.apply(prefs);
  }

  reset(schoolId?: string): AppearancePreferences {
    try {
      localStorage.removeItem(key(schoolId));
    } catch {
      // Rien à nettoyer.
    }
    this.apply(DEFAULTS);
    return { ...DEFAULTS };
  }

  defaults(): AppearancePreferences {
    return { ...DEFAULTS };
  }

  /** Applique couleur + taille sur le document (idempotent). */
  apply(prefs: AppearancePreferences): void {
    try {
      const root = document.documentElement;
      root.style.setProperty('--brand', prefs.brand);
      root.style.setProperty('font-size', FONT_PX[prefs.fontSize] ?? FONT_PX.normal);
    } catch {
      // Rendu serveur ou DOM indisponible : rien à appliquer.
    }
  }
}

export function injectAppearance(): AppearancePreferencesService {
  return inject(AppearancePreferencesService);
}
