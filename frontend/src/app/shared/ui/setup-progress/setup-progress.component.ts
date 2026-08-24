import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SetupStatusService } from '@core/services/setup-status.service';
import { SetupStep } from '@core/models/setup.models';

/**
 * Persistent "getting started" card.
 *
 * <p>Sits at the top of the dashboard until the school is fully configured. It
 * answers three questions at a glance: how far am I, what is the very next
 * thing to do, and what is the full list — without leaving the page.</p>
 *
 * <p>Renders nothing once the configuration is complete: a checklist that stays
 * around after it is done becomes noise.</p>
 */
@Component({
  selector: 'eduops-setup-progress',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './setup-progress.component.html',
  styleUrl: './setup-progress.component.scss'
})
export class SetupProgressComponent {
  /** Compact form for pages other than the dashboard. */
  @Input() compact = false;

  private readonly setupStatus = inject(SetupStatusService);

  readonly status = this.setupStatus.status;
  readonly expanded = signal(false);

  /** The step the "Continuer" button jumps to. */
  readonly nextStep = computed<SetupStep | null>(() => {
    const status = this.status();
    if (!status || status.complete) {
      return null;
    }
    return status.steps.find((s) => s.key === status.nextStepKey)
        ?? status.steps.find((s) => !s.done)
        ?? null;
  });

  readonly visible = computed(() => {
    const status = this.status();
    return status !== null && !status.complete;
  });

  toggle(): void {
    this.expanded.update((open) => !open);
  }

  /** Short count shown against each step in the expanded list. */
  countLabel(step: SetupStep): string {
    if (step.count === 0) {
      return 'a faire';
    }
    switch (step.key) {
      case 'ACADEMIC_YEAR': return 'année ouverte';
      case 'CYCLES': return `${step.count} cycle(s)`;
      case 'LEVELS': return `${step.count} niveau(x)`;
      case 'CLASSES': return `${step.count} classe(s)`;
      case 'SUBJECTS': return `${step.count} matiere(s)`;
      case 'CURRICULUM': return `${step.count} programme(s)`;
      case 'FEES': return `${step.count} grille(s)`;
      case 'TEACHERS': return `${step.count} enseignant(s)`;
      case 'ASSIGNMENTS': return `${step.count} affectation(s)`;
      case 'STUDENTS': return `${step.count} eleve(s)`;
      default: return `${step.count}`;
    }
  }
}
