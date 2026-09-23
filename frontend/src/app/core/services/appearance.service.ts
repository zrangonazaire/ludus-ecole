import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import {
  AppearanceSettings, AppearanceSettingsPayload
} from '@core/models/school-settings.models';
import { SchoolSettingsService } from '@core/services/school-settings.service';

/** Taille de police proposée par l'écran Apparence et région. */
export type FontSizeChoice = AppearanceSettings['fontSize'];

/** Nom historique, conservé pour les écrans qui parlaient de « préférences ». */
export type AppearancePreferences = AppearanceSettings;

/** Valeurs d'attente tant que le serveur n'a rien dit. */
const FALLBACK: AppearanceSettings = {
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

/**
 * Copie locale de la dernière apparence reçue du serveur.
 *
 * <p>Elle ne sert qu'à peindre juste : sans elle, l'écran s'ouvrirait à la
 * couleur par défaut puis basculerait, ce qui se voit. La vérité reste
 * `GET /api/v1/school/appearance` — la couleur, la taille, la devise, la
 * langue et le fuseau appartiennent à l'établissement, pas au navigateur.</p>
 */
const CACHE_KEY = 'eduops.appearance.cache';

/**
 * Apparence et région de l'établissement : lecture, écriture, application.
 *
 * <p>Paramètres persistés côté serveur et partagés par tous les postes : la
 * couleur et la taille de police habillent l'interface, la devise, la langue
 * et le fuseau sont les valeurs officielles qui suivent les reçus et les
 * documents. Une modification faite ici se voit partout.</p>
 */
@Injectable({ providedIn: 'root' })
export class AppearanceService {

  private readonly settings = inject(SchoolSettingsService);
  private readonly state = signal<AppearanceSettings>(readCache() ?? FALLBACK);

  readonly appearance = this.state.asReadonly();

  constructor() {
    // Peinture immédiate depuis la copie locale, puis vérité serveur.
    this.apply(this.state());
    this.refresh();
  }

  /** Relit l'apparence de l'établissement et l'applique (silencieux si absent). */
  refresh(): void {
    this.settings.getAppearance().pipe(
      catchError(() => of(null))
    ).subscribe((next) => {
      if (next) {
        this.accept(next);
      }
    });
  }

  /** Enregistre l'apparence de l'établissement, puis l'applique. */
  update(payload: AppearanceSettingsPayload): Observable<AppearanceSettings> {
    return this.settings.updateAppearance(payload)
      .pipe(tap((next) => this.accept(next)));
  }

  /** Applique une valeur sans l'enregistrer : aperçu avant validation. */
  preview(prefs: AppearanceSettings): void {
    this.apply(prefs);
  }

  defaults(): AppearanceSettings {
    return { ...FALLBACK };
  }

  /** Applique couleur et taille sur le document (idempotent). */
  apply(prefs: AppearanceSettings): void {
    try {
      const root = document.documentElement;
      root.style.setProperty('--brand', prefs.brand);
      root.style.setProperty('font-size', FONT_PX[prefs.fontSize] ?? FONT_PX.normal);
    } catch {
      // DOM indisponible (rendu hors navigateur) : rien à appliquer.
    }
  }

  private accept(next: AppearanceSettings): void {
    this.state.set(next);
    writeCache(next);
    this.apply(next);
  }
}

function readCache(): AppearanceSettings | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? { ...FALLBACK, ...(JSON.parse(raw) as Partial<AppearanceSettings>) } : null;
  } catch {
    return null;
  }
}

function writeCache(prefs: AppearanceSettings): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(prefs));
  } catch {
    // Stockage indisponible : l'application reste juste pour la session.
  }
}
