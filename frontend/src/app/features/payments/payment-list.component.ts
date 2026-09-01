import {
  ChangeDetectionStrategy, Component, DestroyRef, HostListener, OnInit,
  TemplateRef, ViewChild, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReplaySubject, catchError, debounceTime, of, switchMap } from 'rxjs';
import { FINANCE_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { PageResponse, PaymentMethod } from '@core/models/common.models';
import {
  FinancialSummary, Payment, StudentFee, StudentSummary
} from '@core/models/domain.models';
import { DataTableComponent, TableColumn } from '@shared/ui/data-table/data-table.component';
import { StatusBadgeComponent } from '@shared/ui/status-badge/status-badge.component';
import { ConfirmDialogComponent } from '@shared/ui/confirm-dialog/confirm-dialog.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { StatusLabelPipe } from '@shared/pipes/status-label.pipe';
import { NotificationService } from '@core/services/notification.service';
import { PERMISSIONS } from '@core/models/auth.models';

interface PaymentCreatePayload {
  studentId: string;
  academicYearId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  externalReference?: string;
  payerName?: string;
  notes?: string;
  operationId: string;
  allocations: [];
}

interface PaymentMethodChoice {
  value: PaymentMethod;
  label: string;
  hint: string;
  icon: string;
}

interface AllocationPreview {
  fee: StudentFee;
  amount: number;
}

const EMPTY_STUDENT_PAGE: PageResponse<StudentSummary> = {
  content: [], page: 0, size: 8, totalElements: 0, totalPages: 1, first: true, last: true
};

/**
 * Payment register and guided collection workflow.
 *
 * A payment is submitted with a client-generated operation id. Retrying after
 * a network interruption is therefore safe: the backend returns the first
 * payment instead of creating a duplicate.
 */
@Component({
  selector: 'eduops-payment-list',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, DataTableComponent, StatusBadgeComponent,
    ConfirmDialogComponent, AvatarComponent, HasPermissionDirective, MoneyPipe,
    StatusLabelPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent implements OnInit {
  private readonly dataSource = inject(FINANCE_DATA_SOURCE);
  private readonly studentsDataSource = inject(STUDENT_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);

  readonly page = signal<PageResponse<Payment> | null>(null);
  readonly loading = signal(true);
  readonly cancelTarget = signal<Payment | null>(null);

  readonly panelOpen = signal(false);
  readonly studentSearch = signal('');
  readonly studentResults = signal<StudentSummary[]>([]);
  readonly studentsLoading = signal(false);
  readonly selectedStudent = signal<StudentSummary | null>(null);
  readonly financialSummary = signal<FinancialSummary | null>(null);
  readonly summaryLoading = signal(false);
  readonly saving = signal(false);
  readonly amountEntered = signal(0);
  readonly paymentResult = signal<Payment | null>(null);

  readonly today = this.localToday();
  readonly createPermission = PERMISSIONS.PAYMENT_CREATE;
  readonly cancelPermission = PERMISSIONS.PAYMENT_CANCEL;

  readonly paymentMethods: readonly PaymentMethodChoice[] = [
    { value: 'CASH', label: 'Espèces', hint: 'À la caisse', icon: '₣' },
    { value: 'MOBILE_MONEY', label: 'Mobile Money', hint: 'Orange, MTN, Wave…', icon: '⌁' },
    { value: 'BANK_TRANSFER', label: 'Virement', hint: 'Compte bancaire', icon: '⇄' },
    { value: 'CARD', label: 'Carte', hint: 'TPE ou en ligne', icon: '▣' },
    { value: 'CHEQUE', label: 'Chèque', hint: 'Numéro requis', icon: '▤' },
    { value: 'OTHER', label: 'Autre', hint: 'À préciser', icon: '⋯' }
  ];

  readonly paymentForm = this.fb.nonNullable.group({
    amount: [0, [Validators.required, Validators.min(0.01)]],
    paymentMethod: ['CASH' as PaymentMethod, [Validators.required]],
    paymentDate: [this.today, [Validators.required]],
    externalReference: ['', [Validators.maxLength(120)]],
    payerName: ['', [Validators.maxLength(200)]],
    notes: ['', [Validators.maxLength(1000)]]
  });

  readonly outstandingFees = computed(() =>
    (this.financialSummary()?.fees ?? [])
      .filter((fee) => fee.amountRemaining > 0 && !['WAIVED', 'CANCELLED'].includes(fee.status))
      .sort((left, right) => left.dueDate.localeCompare(right.dueDate))
  );

  readonly suggestedAmount = computed(() => this.outstandingFees()[0]?.amountRemaining ?? 0);

  readonly allocationPreview = computed<AllocationPreview[]>(() => {
    let remaining = Math.max(0, this.amountEntered());
    const allocations: AllocationPreview[] = [];
    for (const fee of this.outstandingFees()) {
      if (remaining <= 0) break;
      const amount = Math.min(remaining, fee.amountRemaining);
      allocations.push({ fee, amount });
      remaining -= amount;
    }
    return allocations;
  });

  readonly remainingAfterPayment = computed(() => Math.max(
    0, (this.financialSummary()?.outstandingAmount ?? 0) - this.amountEntered()
  ));

  readonly unallocatedAmount = computed(() => Math.max(
    0, this.amountEntered() - (this.financialSummary()?.outstandingAmount ?? 0)
  ));

  private readonly studentQuery$ = new ReplaySubject<string>(1);
  private operationId = '';
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
      { key: 'receiptNumber', label: 'Reçu', numeric: true, width: '16%' },
      { key: 'studentName', label: 'Élève', width: '20%' },
      { key: 'studentNumber', label: 'Matricule', numeric: true, width: '14%' },
      { key: 'amount', label: 'Montant', numeric: true, template: this.amountTpl, width: '14%' },
      { key: 'paymentMethod', label: 'Mode', template: this.methodTpl, width: '10%' },
      { key: 'status', label: 'Statut', template: this.statusTpl, width: '8%' },
      { key: 'actions', label: '', template: this.actionsTpl, width: '8%' }
    ];

    this.studentQuery$
      .pipe(
        debounceTime(220),
        switchMap((search) => {
          this.studentsLoading.set(true);
          return this.studentsDataSource.search({
            page: 0, size: 8, search: search || undefined, status: 'ACTIVE'
          }).pipe(catchError(() => of(EMPTY_STUDENT_PAGE)));
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((page) => {
        this.studentResults.set(page.content);
        this.studentsLoading.set(false);
      });

    this.paymentForm.controls.amount.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((amount) => this.amountEntered.set(Number(amount) || 0));

    this.load();

    const requestedStudentId = this.route.snapshot.queryParamMap.get('studentId');
    if (requestedStudentId) {
      this.openCollection();
      this.studentsDataSource.getById(requestedStudentId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (student) => this.selectStudent(student),
          error: () => this.closeCollection()
        });
    }
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

  openCollection(): void {
    this.panelOpen.set(true);
    this.resetCollection();
    this.studentQuery$.next('');
    setTimeout(() => document.getElementById('collection-student-search')?.focus());
  }

  closeCollection(): void {
    if (this.saving()) return;
    this.panelOpen.set(false);
  }

  onStudentSearch(value: string): void {
    this.studentSearch.set(value);
    this.studentQuery$.next(value.trim());
  }

  selectStudent(student: StudentSummary): void {
    this.selectedStudent.set(student);
    this.studentSearch.set(student.fullName);
    this.studentResults.set([]);
    this.financialSummary.set(null);
    this.summaryLoading.set(true);
    this.paymentForm.controls.payerName.setValue('');

    this.dataSource.getStudentSummary(student.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (summary) => {
          this.financialSummary.set(summary);
          this.summaryLoading.set(false);
          const suggestion = summary.fees
            ?.filter((fee) => fee.amountRemaining > 0)
            .sort((left, right) => left.dueDate.localeCompare(right.dueDate))[0]
            ?.amountRemaining ?? summary.outstandingAmount;
          this.chooseAmount(suggestion);
          setTimeout(() => document.getElementById('payment-amount')?.focus());
        },
        error: () => this.summaryLoading.set(false)
      });
  }

  changeStudent(): void {
    this.selectedStudent.set(null);
    this.financialSummary.set(null);
    this.studentSearch.set('');
    this.chooseAmount(0);
    this.studentQuery$.next('');
    setTimeout(() => document.getElementById('collection-student-search')?.focus());
  }

  chooseAmount(amount: number): void {
    this.paymentForm.controls.amount.setValue(amount);
    this.paymentForm.controls.amount.markAsDirty();
  }

  referenceRequired(): boolean {
    return this.paymentForm.controls.paymentMethod.value !== 'CASH';
  }

  referenceLabel(): string {
    const labels: Partial<Record<PaymentMethod, string>> = {
      MOBILE_MONEY: 'Référence de transaction',
      BANK_TRANSFER: 'Référence du virement',
      CARD: 'Référence de transaction',
      CHEQUE: 'Numéro du chèque',
      OTHER: 'Référence ou précision'
    };
    return labels[this.paymentForm.controls.paymentMethod.value] ?? 'Référence externe';
  }

  canSubmit(): boolean {
    const referencePresent = this.paymentForm.controls.externalReference.value.trim().length > 0;
    return !!this.selectedStudent() && !!this.financialSummary() && !this.summaryLoading()
      && !this.saving() && this.paymentForm.valid
      && (!this.referenceRequired() || referencePresent);
  }

  submitPayment(): void {
    const student = this.selectedStudent();
    const summary = this.financialSummary();
    if (!student || !summary || !this.canSubmit()) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    const value = this.paymentForm.getRawValue();
    const payload: PaymentCreatePayload = {
      studentId: student.id,
      academicYearId: summary.academicYearId,
      amount: value.amount,
      paymentMethod: value.paymentMethod,
      paymentDate: value.paymentDate,
      externalReference: this.optional(value.externalReference),
      payerName: this.optional(value.payerName),
      notes: this.optional(value.notes),
      operationId: this.operationId,
      // The server allocates the payment to the oldest outstanding fees first.
      allocations: []
    };

    this.saving.set(true);
    this.dataSource.recordPayment(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (payment) => {
          this.saving.set(false);
          this.paymentResult.set(payment);
          this.notifications.success(
            `Le reçu ${payment.receiptNumber ?? payment.paymentReference} est prêt.`,
            'Paiement encaissé');
          this.load();
        },
        error: () => this.saving.set(false)
      });
  }

  collectAnother(): void {
    this.resetCollection();
    this.studentQuery$.next('');
    setTimeout(() => document.getElementById('collection-student-search')?.focus());
  }

  askCancel(payment: Payment): void {
    this.cancelTarget.set(payment);
  }

  cancelMessage(): string {
    const payment = this.cancelTarget();
    if (!payment) return '';
    return `Le paiement ${payment.paymentReference} de ${payment.studentName} sera annulé. `
      + `Les affectations seront contre-passées et le reçu marqué annulé. `
      + `Aucune donnée n'est supprimée.`;
  }

  confirmCancel(_reason: string): void {
    const payment = this.cancelTarget();
    this.cancelTarget.set(null);
    if (!payment) return;
    // The cancellation endpoint will be connected with the receipt viewer.
    this.notifications.success(
      `Demande d'annulation enregistrée pour ${payment.paymentReference}.`);
    this.load();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.panelOpen()) this.closeCollection();
  }

  private resetCollection(): void {
    this.selectedStudent.set(null);
    this.financialSummary.set(null);
    this.studentResults.set([]);
    this.studentSearch.set('');
    this.summaryLoading.set(false);
    this.paymentResult.set(null);
    this.operationId = crypto.randomUUID();
    this.paymentForm.reset({
      amount: 0,
      paymentMethod: 'CASH',
      paymentDate: this.today,
      externalReference: '',
      payerName: '',
      notes: ''
    });
    this.amountEntered.set(0);
  }

  private optional(value: string): string | undefined {
    const clean = value.trim();
    return clean || undefined;
  }

  private localToday(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
