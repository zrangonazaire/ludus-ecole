import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { STUDENT_PORTAL_DATA_SOURCE } from '@core/datasource/data-source';
import { StudentReportCard } from '@core/models/student-portal.models';
import { EmptyStateComponent } from '@shared/ui/empty-state/empty-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

/** Les bulletins publiés de l'élève, consultables dès leur remise aux familles. */
@Component({
  selector: 'eduops-student-report-cards',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent, ErrorStateComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-report-cards.component.html',
  styleUrl: './student-report-cards.component.scss'
})
export class StudentReportCardsComponent implements OnInit {
  private readonly dataSource = inject(STUDENT_PORTAL_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly list = signal<StudentReportCard[]>([]);
  readonly loading = signal(true);
  readonly loadFailed = signal(false);
  /** Bulletin dont le détail des matières est déplié. */
  readonly expanded = signal<string | null>(null);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.loadFailed.set(false);
    this.dataSource.reportCards().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (list) => { this.list.set(list); this.loading.set(false); },
      error: () => { this.list.set([]); this.loadFailed.set(true); this.loading.set(false); }
    });
  }

  toggle(cardId: string): void {
    this.expanded.update((open) => (open === cardId ? null : cardId));
  }

  publishedAt(iso?: string): string {
    return iso ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  }
}