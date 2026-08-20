import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FINANCE_DATA_SOURCE } from '@core/datasource/data-source';
import { PageResponse } from '@core/models/common.models';
import { Payment } from '@core/models/domain.models';
import { DataTableComponent, TableColumn } from '@shared/ui/data-table/data-table.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { ConfirmDialogComponent } from '@shared/ui/confirm-dialog/confirm-dialog.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { StatusLabelPipe } from '@shared/pipes/status-label.pipe';
import { NotificationService } from '@core/services/notification.service';
import { PERMISSIONS } from '@core/models/auth.models';

/**
 * Payments register.
 *
 * Cancelling requires a justification: the backend audits the operation and
 * reverses the allocations rather than deleting anything (rule 7).
 */
@Component({
  selector: 'eduops-payment-list',
  standalone: true,
  imports: [
    CommonModule, DataTableComponent, StatusBadgeComponent, ConfirmDialogComponent,
    HasPermissionDirective, MoneyPipe, StatusLabelPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <header class="page__header">
        <div>
          <h1 class="page__title">Paiements</h1>
          @if (page(); as result) {
            <p class="page__meta numeric">{{ result.totalElements }} paiement(s)</p>
          }
        </div>
        <div class="page__actions">
          <button type="button" class="btn btn--secondary">Exporter</button>
          <button type="button" class="btn btn--primary" *eduopsHasPermission="createPermission">
            <span aria-hidden="true">+</span> Encaisser un paiement
          </button>
        </div>
      </header>

      <section class="card">
        <div class="card__header">
          <label class="visually-hidden" for="payment-search">Rechercher un paiement</label>
          <input id="payment-search" class="input" type="search" style="max-width: 380px"
                 placeholder="Eleve, matricule, reference ou numero de recu"
                 (input)="onSearch($any($event.target).value)" />
        </div>
        <eduops-data-table
          [columns]="columns" [page]="page()" [loading]="loading()"
          caption="Registre des paiements"
          (pageChange)="onPageChange($event)" />
      </section>
    </div>

    <ng-template #amountTpl let-payment>
      <span class="money" style="font-weight:700">{{ payment.amount | money }}</span>
    </ng-template>

    <ng-template #methodTpl let-payment>
      {{ payment.paymentMethod | statusLabel }}
    </ng-template>

    <ng-template #statusTpl let-payment>
      <eduops-status-badge [status]="payment.status" />
    </ng-template>

    <ng-template #actionsTpl let-payment>
      <div class="row">
        <button type="button" class="btn btn--ghost btn--sm">Recu</button>
        @if (payment.status === 'VALIDATED') {
          <button type="button" class="btn btn--ghost btn--sm"
                  *eduopsHasPermission="cancelPermission"
                  (click)="askCancel(payment)">Annuler</button>
        }
      </div>
    </ng-template>

    <eduops-confirm-dialog
      [open]="cancelTarget() !== null"
      title="Annuler ce paiement"
      [message]="cancelMessage()"
      confirmLabel="Annuler le paiement"
      [danger]="true"
      [requireReason]="true"
      reasonLabel="Motif de l'annulation"
      (confirm)="confirmCancel($event)"
      (cancel)="cancelTarget.set(null)" />
  `
})
export class PaymentListComponent implements OnInit {
  private readonly dataSource = inject(FINANCE_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  readonly page = signal<PageResponse<Payment> | null>(null);
  readonly loading = signal(true);
  readonly cancelTarget = signal<Payment | null>(null);

  readonly createPermission = PERMISSIONS.PAYMENT_CREATE;
  readonly cancelPermission = PERMISSIONS.PAYMENT_CANCEL;

  private search = '';
  private currentPage = 0;

  @ViewChild('amountTpl', { static: true })
  amountTpl!: TemplateRef<{ $implicit: Payment }>;
  @ViewChild('methodTpl', { static: true })
  methodTpl!: TemplateRef<{ $implicit: Payment }>;
  @ViewChild('statusTpl', { static: true })
  statusTpl!: TemplateRef<{ $implicit: Payment }>;
  @ViewChild('actionsTpl', { static: true })
  actionsTpl!: TemplateRef<{ $implicit: Payment }>;

  columns: TableColumn<Payment>[] = [];

  ngOnInit(): void {
    this.columns = [
      { key: 'paymentDate', label: 'Date', width: '10%' },
      { key: 'receiptNumber', label: 'Recu', numeric: true, width: '16%' },
      { key: 'studentName', label: 'Eleve', width: '20%' },
      { key: 'studentNumber', label: 'Matricule', numeric: true, width: '14%' },
      { key: 'amount', label: 'Montant', numeric: true, template: this.amountTpl, width: '14%' },
      { key: 'paymentMethod', label: 'Mode', template: this.methodTpl, width: '10%' },
      { key: 'status', label: 'Statut', template: this.statusTpl, width: '8%' },
      { key: 'actions', label: '', template: this.actionsTpl, width: '8%' }
    ];
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.dataSource
      .searchPayments({ page: this.currentPage, size: 20, search: this.search || undefined })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (page) => {
          this.page.set(page);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
  }

  onSearch(value: string): void {
    this.search = value;
    this.currentPage = 0;
    this.load();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.load();
  }

  askCancel(payment: Payment): void {
    this.cancelTarget.set(payment);
  }

  cancelMessage(): string {
    const payment = this.cancelTarget();
    if (!payment) {
      return '';
    }
    return `Le paiement ${payment.paymentReference} de ${payment.studentName} sera annule. `
      + `Les affectations seront contre-passees et le recu marque annule. `
      + `Aucune donnee n'est supprimee.`;
  }

  confirmCancel(reason: string): void {
    const payment = this.cancelTarget();
    this.cancelTarget.set(null);
    if (!payment) {
      return;
    }
    // The real call is POST /api/v1/payments/{id}/cancel with the reason.
    this.notifications.success(
      `Demande d'annulation enregistree pour ${payment.paymentReference}.`);
    this.load();
  }
}
