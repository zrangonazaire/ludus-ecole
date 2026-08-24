import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SetupStatusService } from '@core/services/setup-status.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

/**
 * Configuration checklist.
 *
 * <p>Answers the question the wizard left open: "I skipped a step — where do I
 * pick it up?". Each line links straight to the screen that completes it, and
 * the state is recomputed server-side from real data, so a step done by hand
 * ticks itself off.</p>
 */
@Component({
  selector: 'eduops-setup',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent implements OnInit {
  private readonly setupStatus = inject(SetupStatusService);
  private readonly destroyRef = inject(DestroyRef);

  readonly status = this.setupStatus.status;
  readonly loading = signal(true);
  readonly error = signal(false);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.setupStatus.load().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => this.loading.set(false),
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  /** Numbers read better than a bare count on an empty step. */
  countLabel(key: string, count: number): string {
    if (count === 0) {
      return 'Rien de créé pour le moment';
    }
    switch (key) {
      case 'CYCLES': return `${count} niveau${count > 1 ? 'x' : ''} defini${count > 1 ? 's' : ''}`;
      case 'CLASSES': return `${count} classe${count > 1 ? 's' : ''} active${count > 1 ? 's' : ''}`;
      case 'SUBJECTS': return `${count} matiere${count > 1 ? 's' : ''}`;
      case 'FEES': return `${count} grille${count > 1 ? 's' : ''} de frais`;
      case 'TEACHERS': return `${count} enseignant${count > 1 ? 's' : ''} actif${count > 1 ? 's' : ''}`;
      case 'STUDENTS': return `${count} eleve${count > 1 ? 's' : ''} inscrit${count > 1 ? 's' : ''}`;
      default: return `${count}`;
    }
  }
}
