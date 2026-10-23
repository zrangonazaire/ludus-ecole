import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, forkJoin, of } from 'rxjs';
import { FINANCE_DATA_SOURCE } from '@core/datasource/data-source';
import { Payment } from '@core/models/domain.models';
import { OutstandingBoard, OutstandingStudent } from '@core/models/outstanding.models';
import { PageResponse } from '@core/models/common.models';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

const EMPTY_PAYMENTS: PageResponse<Payment> = {
  content: [], page: 0, size: 6, totalElements: 0, totalPages: 0,
  first: true, last: true
};

/** Synthèse financière de l'année active, reliée aux données de recouvrement. */
@Component({
  selector: 'eduops-finance-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MoneyPipe, HasPermissionDirective,
    ErrorStateComponent, LoadingStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './finance-dashboard.component.html',
  styleUrl: './finance-dashboard.component.scss'
})
export class FinanceDashboardComponent implements OnInit {
  private readonly finance = inject(FINANCE_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly board = signal<OutstandingBoard | null>(null);
  readonly payments = signal<Payment[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly lastRefresh = signal<Date | null>(null);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    forkJoin({
      board: this.finance.outstanding({ page: 0, size: 6, bucket: 'ALL' }),
      // Le rôle Finance peut consulter les soldes sans avoir le droit de lire
      // le registre des paiements : l'indisponibilité de ce widget reste locale.
      payments: this.finance.searchPayments({ page: 0, size: 6, sort: 'paymentDate,desc' })
        .pipe(catchError(() => of(EMPTY_PAYMENTS)))
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ board, payments }) => {
        this.board.set(board);
        this.payments.set(payments.content ?? []);
        this.loading.set(false);
        this.lastRefresh.set(new Date());
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  overdueShare(board: OutstandingBoard): number {
    if (board.totalOutstanding <= 0) return 0;
    return Math.min(100, Math.max(0, board.overdueAmount / board.totalOutstanding * 100));
  }

  methodLabel(method: Payment['paymentMethod']): string {
    const labels: Record<Payment['paymentMethod'], string> = {
      CASH: 'Espèces', BANK_TRANSFER: 'Virement', CARD: 'Carte',
      MOBILE_MONEY: 'Mobile Money', CHEQUE: 'Chèque', OTHER: 'Autre'
    };
    return labels[method] ?? method;
  }

  trackStudent(_: number, student: OutstandingStudent): string {
    return student.studentId;
  }
}
