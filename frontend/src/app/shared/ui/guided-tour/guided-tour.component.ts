import {
  AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef,
  OnDestroy, effect, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuidedTourService } from '@core/services/guided-tour.service';

interface Spotlight {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Guided tour overlay.
 *
 * <p>Dims the page, cuts a hole around the element being explained and anchors
 * a numbered bubble next to it. Steps without a target are centred, which suits
 * the opening and closing messages.</p>
 *
 * <p>Recomputes on scroll and resize, because a highlight that drifts away from
 * what it describes is worse than no highlight at all.</p>
 */
@Component({
  selector: 'eduops-guided-tour',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './guided-tour.component.html',
  styleUrl: './guided-tour.component.scss'
})
export class GuidedTourComponent implements AfterViewInit, OnDestroy {
  readonly tour = inject(GuidedTourService);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly spotlight = signal<Spotlight | null>(null);
  readonly bubbleTop = signal<number>(0);
  readonly bubbleLeft = signal<number>(0);
  readonly centred = signal(true);

  private readonly onReflow = () => this.reposition();

  constructor() {
    /*
     * On remesure à chaque changement d'étape.
     *
     * Les deux branches passent par une micro-tâche, et pas seulement celle
     * qui repositionne. Angular interdit d'écrire dans un signal depuis un
     * `effect` — NG0600 — parce qu'une écriture immédiate peut relancer le
     * même effet et boucler. La branche « pas d'étape » écrivait directement
     * dans `spotlight`, ce qui faisait échouer le tout premier rendu de chaque
     * page : le guide ne s'affichait pas et la console se remplissait.
     *
     * Différer l'écriture la sort du cycle de calcul : elle a lieu après, dans
     * une tâche ordinaire, où écrire est légitime. C'est aussi ce que fait déjà
     * l'autre branche, si bien que les deux se comportent enfin pareil.
     */
    effect(() => {
      const step = this.tour.current();
      queueMicrotask(() => {
        if (step) {
          this.reposition();
        } else {
          this.spotlight.set(null);
        }
      });
    });
  }

  ngAfterViewInit(): void {
    window.addEventListener('resize', this.onReflow, { passive: true });
    window.addEventListener('scroll', this.onReflow, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onReflow);
    window.removeEventListener('scroll', this.onReflow);
  }

  private reposition(): void {
    const step = this.tour.current();
    if (!step) {
      return;
    }

    if (!step.target) {
      this.spotlight.set(null);
      this.centred.set(true);
      return;
    }

    const element = document.querySelector(step.target);
    if (!(element instanceof HTMLElement)) {
      // Target absent on this page: fall back to a centred bubble rather than
      // pointing at nothing.
      this.spotlight.set(null);
      this.centred.set(true);
      return;
    }

    const rect = element.getBoundingClientRect();
    const padding = 8;
    this.spotlight.set({
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2
    });
    this.centred.set(false);

    // Place the bubble below the target when there is room, above otherwise.
    const bubbleHeight = 190;
    const below = rect.bottom + 16;
    const fitsBelow = below + bubbleHeight < window.innerHeight;
    this.bubbleTop.set(fitsBelow ? below : Math.max(16, rect.top - bubbleHeight - 16));
    this.bubbleLeft.set(Math.min(
      Math.max(16, rect.left),
      Math.max(16, window.innerWidth - 360 - 16)));
  }

  onBackdropClick(): void {
    this.tour.dismiss();
  }
}
