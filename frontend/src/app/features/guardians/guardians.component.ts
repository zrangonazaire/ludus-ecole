import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { GUARDIAN_DATA_SOURCE } from '@core/datasource/data-source';
import { Guardian } from '@core/models/guardian.models';
import { PageResponse } from '@core/models/common.models';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

@Component({
  selector: 'eduops-guardians',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './guardians.component.html',
  styleUrl: './guardians.component.scss'
})
export class GuardiansComponent implements OnInit {
  private readonly dataSource = inject(GUARDIAN_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);
  private readonly search$ = new Subject<string>();

  readonly page = signal<PageResponse<Guardian> | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly search = signal('');

  ngOnInit(): void {
    this.search$.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((search) => {
        this.loading.set(true);
        return this.dataSource.search({ page: 0, size: 50, search: search || undefined });
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (page) => {
        this.page.set(page);
        this.loading.set(false);
        this.error.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
    this.search$.next('');
  }

  updateSearch(value: string): void {
    this.search.set(value);
    this.search$.next(value.trim());
  }

  reload(): void {
    this.search$.next(this.search().trim());
  }
}
