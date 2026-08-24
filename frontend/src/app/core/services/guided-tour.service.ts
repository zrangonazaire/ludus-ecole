import { Injectable, computed, signal } from '@angular/core';

export interface TourStep {
  /** CSS selector of the element to highlight; null centres the bubble. */
  target: string | null;
  title: string;
  text: string;
}

const SEEN_KEY = 'eduops.tour.seen';

/**
 * Drives the guided tour.
 *
 * <p>Runs once on the first visit, then stays available on demand through
 * "Reprendre le guide". The seen flag lives in localStorage: it is a per-browser
 * convenience, not data — losing it only means seeing the tour again.</p>
 */
@Injectable({ providedIn: 'root' })
export class GuidedTourService {

  private readonly _steps = signal<TourStep[]>([]);
  private readonly _index = signal(0);
  private readonly _running = signal(false);

  readonly running = this._running.asReadonly();
  readonly index = this._index.asReadonly();
  readonly steps = this._steps.asReadonly();

  readonly current = computed<TourStep | null>(() => {
    const steps = this._steps();
    const i = this._index();
    return this._running() && i < steps.length ? steps[i] : null;
  });

  readonly position = computed(() => `${this._index() + 1}/${this._steps().length}`);
  readonly isFirst = computed(() => this._index() === 0);
  readonly isLast = computed(() => this._index() >= this._steps().length - 1);

  /** The dashboard tour, mirroring the order in which the page is read. */
  readonly dashboardTour: TourStep[] = [
    {
      target: null,
      title: "Piloter l'établissement",
      text: "Reperez ce qui bloque reellement la rentrée ou le travail du jour, "
          + 'puis reprenez la configuration sans recommencer.'
    },
    {
      target: '.setup',
      title: 'Suivre la configuration',
      text: "Ce bloc reste affiche tant que l'établissement n'est pas prêt. "
          + '« Continuer » vous emmene directement a la prochaine étape utile.'
    },
    {
      target: '.grid--kpi',
      title: 'Lire les chiffres cles',
      text: 'Effectifs, présence, moyennes et encaissements. Les compteurs portent '
          + "sur l'ensemble des dossiers, pas seulement sur ce qui est affiche."
    },
    {
      target: '.section-gap',
      title: 'Suivre les tendances',
      text: 'Effectifs par niveau, présence, performance et encaissements. '
          + 'Les graphiques se mettent a jour des qu\'une donnée change.'
    },
    {
      target: '.sidebar__badge',
      title: 'Revenir a la configuration',
      text: 'Le compteur de la barre laterale indique ce qui reste a faire. '
          + 'Il disparait une fois tout terminé.'
    },
    {
      target: null,
      title: "Vous savez que c'est terminé lorsque…",
      text: 'Les dix étapes sont calculees depuis vos données reelles, et la prochaine '
          + 'action utile remplace automatiquement la precedente.'
    }
  ];

  /** Starts the tour, unless it has already been seen and this is automatic. */
  start(steps: TourStep[], force = false): void {
    if (!force && this.hasSeen()) {
      return;
    }
    this._steps.set(steps);
    this._index.set(0);
    this._running.set(true);
  }

  next(): void {
    if (this.isLast()) {
      this.finish();
      return;
    }
    this._index.update((i) => i + 1);
  }

  previous(): void {
    this._index.update((i) => Math.max(0, i - 1));
  }

  goTo(index: number): void {
    this._index.set(Math.max(0, Math.min(index, this._steps().length - 1)));
  }

  finish(): void {
    this._running.set(false);
    this.markSeen();
  }

  /** Closing early counts as seen: nobody wants it reappearing on every page. */
  dismiss(): void {
    this.finish();
  }

  hasSeen(): boolean {
    try {
      return localStorage.getItem(SEEN_KEY) === '1';
    } catch {
      return false;
    }
  }

  private markSeen(): void {
    try {
      localStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Private browsing: the tour simply shows again next time.
    }
  }

  /** Lets the user replay it from the sidebar. */
  reset(): void {
    try {
      localStorage.removeItem(SEEN_KEY);
    } catch {
      // ignored
    }
  }
}
