import { createUuid } from "../../core/utils/uuid";
import {
  ChangeDetectionStrategy, Component, DestroyRef, HostListener, OnInit,
  TemplateRef, ViewChild, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, ReplaySubject, Subscription, catchError, debounceTime, expand, finalize, of, reduce, switchMap } from 'rxjs';
import { buildXlsx, saveBlob } from '@core/utils/spreadsheet-writer';
import { FINANCE_DATA_SOURCE, STUDENT_DATA_SOURCE, OFFICIAL_DOCUMENT_DATA_SOURCE } from '@core/datasource/data-source';
import { OfficialDocumentLayout } from '@core/models/official-document.models';
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
  allocations: Array<{ studentFeeId: string; amount: number }>;
}

interface PaymentMethodChoice {
  value: PaymentMethod;
  label: string;
  hint: string;
  icon: string;
}

export interface CashExpense {
  id: string;
  date: string;
  label: string;
  category: string;
  beneficiary: string;
  amount: number;
  currency: string;
}

const CASH_EXPENSES_STORAGE_KEY = 'eduops.cashbook.expenses.v1';

interface AllocationPreview {
  fee: StudentFee;
  amount: number;
}

/** Lignes dues regroupées sous une même rubrique (type de frais). */
interface FeeRubriqueGroup {
  key: string;
  name: string;
  categoryLabel: string;
  mandatory: boolean;
  totalRemaining: number;
  fees: StudentFee[];
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
  private readonly documentsSource = inject(OFFICIAL_DOCUMENT_DATA_SOURCE, { optional: true });
  readonly schoolLayout = signal<OfficialDocumentLayout | null>(null);
  private readonly notifications = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);

  readonly page = signal<PageResponse<Payment> | null>(null);
  readonly loading = signal(true);
  readonly cancelTarget = signal<Payment | null>(null);
  readonly cancelling = signal(false);
  readonly receipt = signal<Payment | null>(null);
  readonly receiptLoading = signal(false);
  readonly exporting = signal(false);
  readonly loadError = signal(false);
  private summaryRequest?: Subscription;
  private listRequest?: Subscription;
  private receiptRequest?: Subscription;

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

  readonly showCashbook = signal(false);
  readonly expenseModalOpen = signal(false);
  readonly cashExpenses = signal<CashExpense[]>(this.loadCashExpenses());
  readonly expenseForm = this.fb.nonNullable.group({
    label: ['', [Validators.required, Validators.maxLength(160)]],
    category: ['Fournitures & Bureau', [Validators.required]],
    beneficiary: ['', [Validators.maxLength(120)]],
    amount: [0, [Validators.required, Validators.min(1)]],
    date: [this.today, [Validators.required]]
  });

  readonly registerCurrency = computed(() =>
    this.page()?.content?.[0]?.currency ?? this.financialSummary()?.currency ?? 'XOF'
  );

  readonly totalCashIn = computed(() =>
    (this.page()?.content ?? [])
      .filter((p) => p.status === 'VALIDATED')
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
  );

  readonly totalCashOut = computed(() =>
    this.cashExpenses().reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
  );

  readonly netCashBalance = computed(() => this.totalCashIn() - this.totalCashOut());
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
    notes: ['', [Validators.maxLength(1000)]],
    rubrique: ['']
  });

  readonly rubriqueControl = this.paymentForm.controls.rubrique;

  /** Fees selected for explicit allocation, with the amount to apply to each. */
  readonly selectedFees = signal<Array<{ id: string; label: string; dueDate: string; amountRemaining: number; allocatedAmount: number }>>([]);

  readonly outstandingFees = computed(() =>
    (this.financialSummary()?.fees ?? [])
      .filter((fee) => fee.amountRemaining > 0 && !['WAIVED', 'CANCELLED'].includes(fee.status))
      .sort((left, right) => left.dueDate.localeCompare(right.dueDate))
  );

  /**
   * Lignes dues regroupées par rubrique (type de frais) : chaque rubrique
   * affiche son montant total restant et ses échéances. La scolarité (TUITION)
   * n'est qu'une rubrique parmi les autres (cantine, transport…).
   */
  readonly feesByRubrique = computed(() => {
    const groups = new Map<string, FeeRubriqueGroup>();
    for (const fee of this.outstandingFees()) {
      const key = fee.feeTypeId ?? fee.feeTypeName;
      let group = groups.get(key);
      if (!group) {
        group = {
          key,
          name: fee.feeTypeName,
          categoryLabel: fee.categoryLabel ?? fee.feeTypeName,
          mandatory: fee.mandatory ?? true,
          totalRemaining: 0,
          fees: []
        };
        groups.set(key, group);
      }
      group.fees.push(fee);
      group.totalRemaining += fee.amountRemaining;
    }
    return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  });

  /** Libellé de rubrique d'une ligne : type de frais + catégorie. */
  rubriqueOf(fee: StudentFee): string {
    const category = fee.categoryLabel ?? fee.category;
    if (category && category !== fee.feeTypeName) return `${fee.feeTypeName} · ${category}`;
    return fee.feeTypeName;
  }

  /** Nom d'une rubrique selon sa clé. */
  rubriqueName(key: string): string {
    const group = this.feesByRubrique().find(g => g.key === key);
    return group?.name ?? key;
  }

  /** Filtre du combo rubrique : '' = toutes les rubriques. */
  readonly rubriqueFilter = signal<string>('');

  /** Groupes de rubriques visibles selon le combo. */
  readonly visibleRubriques = computed(() => {
    const filter = this.rubriqueFilter();
    const groups = this.feesByRubrique();
    return filter ? groups.filter((g) => g.key === filter) : groups;
  });

  /** Choisir une rubrique dans le combo (filtre les échéances affichées). */
  selectRubrique(value: string): void {
    this.rubriqueFilter.set(value ?? '');
  }

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
    if (this.documentsSource) {
      this.documentsSource.layout().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (layout: OfficialDocumentLayout) => this.schoolLayout.set(layout),
        error: () => {}
      });
    }
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

    const requestedAction = this.route.snapshot.queryParamMap.get('action');
    const requestedStudentId = this.route.snapshot.queryParamMap.get('studentId');
    if (requestedAction === 'collect' && !requestedStudentId) {
      this.openCollection();
    }
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const sid = params.get('studentId');
      if (sid && this.selectedStudent()?.id !== sid) {
        this.openCollection();
        this.studentsDataSource.getById(sid).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (student) => this.selectStudent(student),
          error: () => this.closeCollection()
        });
      } else if (params.get('action') === 'collect' && !this.panelOpen()) {
        this.openCollection();
      }
    });
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
    this.listRequest?.unsubscribe();
    this.loading.set(true);
    this.loadError.set(false);
    this.listRequest = this.dataSource
      .searchPayments({ page: this.currentPage, size: 20, search: this.search || undefined })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (page) => {
          this.page.set(page);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.loadError.set(true);
        }
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
    this.summaryRequest?.unsubscribe();
    this.selectedStudent.set(student);
    this.studentSearch.set(student.fullName);
    this.studentResults.set([]);
    this.financialSummary.set(null);
    this.summaryLoading.set(true);
    this.rubriqueFilter.set('');
    this.paymentForm.controls.payerName.setValue('');

    this.summaryRequest = this.dataSource.getStudentSummary(student.id)
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
    this.summaryRequest?.unsubscribe();
    this.summaryLoading.set(false);
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

  /** Human-readable reasons why the submit button is still disabled. */
  blockers(): string[] {
    if (this.paymentResult()) return [];
    const reasons: string[] = [];
    if (!this.selectedStudent()) {
      reasons.push('Sélectionnez un élève.');
      return reasons;
    }
    if (this.summaryLoading()) {
      reasons.push('Chargement de la situation financière…');
      return reasons;
    }
    if (!this.financialSummary()) {
      reasons.push('Situation financière introuvable. Re-sélectionnez l’élève.');
      return reasons;
    }
    const rawAmount = Number(this.paymentForm.controls.amount.value) || 0;
    if (rawAmount <= 0) reasons.push('Saisissez un montant supérieur à zéro.');
    const dateValue = this.paymentForm.controls.paymentDate.value || '';
    if (!dateValue) reasons.push('Renseignez la date d’encaissement.');
    else if (dateValue > this.localToday()) reasons.push('La date d’encaissement ne peut pas être dans le futur.');
    if (this.referenceRequired()
      && this.paymentForm.controls.externalReference.value.trim().length === 0) {
      reasons.push(`Ajoutez la référence : ${this.referenceLabel()}.`);
    }
    if (reasons.length === 0 && this.paymentForm.invalid) {
      reasons.push('Vérifiez les champs : une valeur dépasse la longueur autorisée.');
    }
    return reasons;
  }

  canSubmit(): boolean {
    const rawAmount = Number(this.paymentForm.controls.amount.value) || 0;
    const dateValue = this.paymentForm.controls.paymentDate.value || '';
    const referencePresent = this.paymentForm.controls.externalReference.value.trim().length > 0;
    if (!this.selectedStudent() || !this.financialSummary() || this.summaryLoading()) return false;
    if (this.saving() || this.paymentResult()) return false;
    if (!this.paymentForm.valid) return false;
    if (rawAmount <= 0) return false;
    if (!dateValue || dateValue > this.localToday()) return false;
    if (this.referenceRequired() && !referencePresent) return false;
    return true;
  }

  submitPayment(): void {
    const student = this.selectedStudent();
    const summary = this.financialSummary();
    if (!student || !summary || !this.canSubmit()) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    const value = this.paymentForm.getRawValue();
    const selected = this.selectedFees();
    // Build explicit allocations from selected fees. If nothing is selected,
    // fall back to automatic allocation (empty array) — the backend
    // distributes the amount over the oldest open fees.
    const allocations: Array<{ studentFeeId: string; amount: number }> =
      selected.length > 0
        ? selected.map((f) => ({ studentFeeId: f.id, amount: f.allocatedAmount || f.amountRemaining }))
        : [];
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
      allocations
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

  confirmCancel(reason: string): void {
    const payment = this.cancelTarget();
    if (!payment || this.cancelling() || !reason.trim()) return;
    this.cancelTarget.set(null);
    this.cancelling.set(true);
    this.dataSource.cancelPayment(payment.id, reason.trim())
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.cancelling.set(false)))
      .subscribe({
        next: (cancelled) => {
          if (this.receipt()?.id === cancelled.id) this.receipt.set(cancelled);
          this.notifications.success(`Le paiement ${cancelled.paymentReference} a été annulé.`);
          this.load();
        },
        error: () => this.notifications.error("Le paiement n'a pas pu être annulé. Réessayez.")
      });
  }

  showReceipt(payment: Payment): void {
    this.receiptRequest?.unsubscribe();
    this.receipt.set(null);
    this.receiptLoading.set(true);
    this.receiptRequest = this.dataSource.getPayment(payment.id)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.receiptLoading.set(false)))
      .subscribe({
        next: (result) => this.receipt.set(result),
        error: () => this.notifications.error('Impossible de charger le reçu.')
      });
  }

  closeReceipt(): void {
    this.receiptRequest?.unsubscribe();
    this.receipt.set(null);
    this.receiptLoading.set(false);
  }

  printReceipt(): void {
    const content = document.getElementById('payment-receipt');
    if (!content || !this.receipt()) return;
    const preview = window.open('', '_blank', 'width=800,height=900');
    if (!preview) {
      this.notifications.error("Autorisez l'ouverture de la fenêtre pour imprimer le reçu.");
      return;
    }
    preview.opener = null;
    preview.document.title = this.receipt()!.receiptNumber ?? 'Reçu de paiement';
    const style = preview.document.createElement('style');
    style.textContent = `body { font: 15px Arial, sans-serif; color: #172338; padding: 32px; }
      .receipt-card__head { display: flex; justify-content: space-between; border-bottom: 2px solid; padding-bottom: 16px; }
      .receipt-card__amount { font-size: 32px; margin: 24px 0; }
      dl { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
      dt { color: #555; } dd { margin: 6px 0 0; overflow-wrap: anywhere; }
      li { display: flex; justify-content: space-between; padding: 10px 0; }
      ul { padding: 0; } @page { margin: 16mm; }`;
    preview.document.head.appendChild(style);

    const layout = this.schoolLayout();
    let logoDataUrl = layout?.showLogo ? layout?.logoDataUrl : undefined;
    const schoolName = layout?.schoolName || 'Établissement scolaire';
    const schoolMeta = [layout?.address, layout?.phone].filter(Boolean).join(' · ');

    if (!logoDataUrl) {
      try {
        const stored = localStorage.getItem('eduops.mock.official-document-layout.v1');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.showLogo && parsed?.logoDataUrl) {
            logoDataUrl = parsed.logoDataUrl;
          }
        }
      } catch { /* ignore fallback error */ }
    }

    const header = preview.document.createElement('div');
    header.className = 'receipt-print-header';
    header.innerHTML = `
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid #e2e8f0;">
        ${logoDataUrl ? `<img src="${logoDataUrl}" alt="${schoolName}" style="max-height:60px;max-width:120px;object-fit:contain;" />` : `<div style="width:48px;height:48px;border-radius:6px;background:#eef3fb;color:#173f8f;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:bold;">${schoolName.charAt(0)}</div>`}
        <div>
          <h2 style="margin:0;font-size:18px;color:#173f8f;">${schoolName}</h2>
          ${schoolMeta ? `<p style="margin:4px 0 0;font-size:12px;color:#64748b;">${schoolMeta}</p>` : ''}
        </div>
      </div>
    `;
    preview.document.body.appendChild(header);
    preview.document.body.appendChild(content.cloneNode(true));
    preview.focus();
    preview.setTimeout(() => preview.print(), 150);
  }

  exportPayments(): void {
    if (this.exporting()) return;
    const search = this.search || undefined;
    this.exporting.set(true);
    this.dataSource.searchPayments({ page: 0, size: 100, search })
      .pipe(
        expand((page) => page.last || page.content.length === 0 ? EMPTY
          : this.dataSource.searchPayments({ page: page.page + 1, size: 100, search })),
        reduce((payments, page) => payments.concat(page.content), [] as Payment[]),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.exporting.set(false))
      ).subscribe({
        next: (payments) => {
          const labels = new StatusLabelPipe();
          saveBlob(buildXlsx({
            sheetName: 'Paiements',
            columns: ['Date', 'Référence', 'Reçu', 'Élève', 'Matricule', 'Montant', 'Devise', 'Mode', 'Statut']
              .map((header, index) => ({ header, width: index === 3 ? 32 : 22, kind: index === 5 ? 'number' as const : 'text' as const })),
            rows: payments.map((payment) => [payment.paymentDate, payment.paymentReference,
              payment.receiptNumber, payment.studentName, payment.studentNumber, payment.amount,
              payment.currency, labels.transform(payment.paymentMethod), labels.transform(payment.status)])
          }), `paiements-${this.localToday()}.xlsx`);
          this.notifications.success(`${payments.length} paiement(s) exporté(s).`);
        },
        error: () => this.notifications.error("L'export a échoué. Réessayez.")
      });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.receipt() || this.receiptLoading()) {
      this.closeReceipt();
      return;
    }
    if (this.panelOpen()) this.closeCollection();
  }

  private resetCollection(): void {
    this.summaryRequest?.unsubscribe();
    this.selectedStudent.set(null);
    this.financialSummary.set(null);
    this.studentResults.set([]);
    this.studentSearch.set('');
    this.summaryLoading.set(false);
    this.paymentResult.set(null);
    this.operationId = createUuid();
    this.paymentForm.reset({
      amount: 0,
      paymentMethod: 'CASH',
      paymentDate: this.today,
      externalReference: '',
      payerName: '',
      notes: ''
    });
    this.amountEntered.set(0);
    this.selectedFees.set([]);
  }

  /** Toggle a fee in the explicit allocation selection. */
  toggleFee(fee: StudentFee): void {
    const current = this.selectedFees();
    const existing = current.find((f) => f.id === fee.id);
    if (existing) {
      this.selectedFees.set(current.filter((f) => f.id !== fee.id));
    } else {
      this.selectedFees.set([
        ...current,
        {
          id: fee.id,
          label: fee.label,
          dueDate: fee.dueDate,
          amountRemaining: fee.amountRemaining,
          allocatedAmount: 0,
        },
      ]);
    }
  }

  /** Update the allocated amount for a selected fee. Amount is distributed, not per-fee editable. */
  updateAllocation(feeId: string, amount: number): void {
    this.selectedFees.update((fees) =>
      fees.map((f) => (f.id === feeId ? { ...f, allocatedAmount: amount } : f))
    );
  }

  /** Total montant alloué aux frais sélectionnés. */
  readonly selectedAllocationTotal = computed(() =>
    this.selectedFees().reduce((sum, f) => sum + f.allocatedAmount, 0)
  );

  /** Frais non encore affectés dans la sélection. */
  readonly unallocatedSelectedFees = computed(() =>
    this.selectedFees().filter((f) => f.allocatedAmount === 0)
  );

  /** Vérifier si un frais est sélectionné. */
  isFeeSelected(feeId: string): boolean {
    return this.selectedFees().some((f) => f.id === feeId);
  }

  /** Montant alloué pour un frais donné. */
  getAllocatedAmount(feeId: string): number {
    return this.selectedFees().find((f) => f.id === feeId)?.allocatedAmount ?? 0;
  }

  /** Gérer la saisie du montant alloué pour un frais. */
  onAllocationInput(feeId: string, rawValue: string, currency: string): void {
    const parsed = this.parseMoney(rawValue, currency);
    if (parsed === null) return;
    this.updateAllocation(feeId, Math.max(0, parsed));
  }

  /** Allouer le montant restant complet à un frais. */
  fillAllocation(feeId: string, maxAmount: number): void {
    this.updateAllocation(feeId, maxAmount);
  }

  /** Sélectionner ou désélectionner tous les frais disponibles. */
  selectAllFees(): void {
    const outstanding = this.outstandingFees();
    if (this.selectedFees().length === outstanding.length) {
      this.selectedFees.set([]);
    } else {
      this.selectedFees.set(
        outstanding.map((fee) => ({
          id: fee.id,
          label: fee.label,
          dueDate: fee.dueDate,
          amountRemaining: fee.amountRemaining,
          allocatedAmount: 0,
        }))
      );
    }
  }

  /** Analyser une valeur monétaire saisie par l'utilisateur. */
  private parseMoney(value: string, currency: string): number | null {
    const cleaned = value.replace(/[^\d.,]/g, '').trim();
    if (cleaned === '') return null;
    const normalized = cleaned.replace(',', '.');
    const num = Number(normalized);
    return Number.isFinite(num) ? num : null;
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

  shareReceiptWhatsApp(payment: Payment): void {
    const formattedAmount = new Intl.NumberFormat('fr-FR').format(payment.amount)
      + ' ' + (payment.currency || 'XOF');
    const dateStr = payment.paymentDate
      ? new Date(payment.paymentDate).toLocaleDateString('fr-FR')
      : this.localToday();
    const receiptRef = payment.receiptNumber ?? payment.paymentReference;
    const text =
      `✅ *REÇU DE PAIEMENT — ${receiptRef}*\n\n` +
      `• *Élève* : ${payment.studentName} (${payment.studentNumber})\n` +
      `• *Montant réglé* : *${formattedAmount}*\n` +
      `• *Date* : ${dateStr}\n` +
      (payment.outstandingAfterPayment !== undefined
        ? `• *Solde restant* : ${new Intl.NumberFormat('fr-FR').format(payment.outstandingAfterPayment)} ${payment.currency || 'XOF'}\n`
        : '') +
      `\nMerci pour votre règlement.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  openExpenseModal(): void {
    this.expenseForm.reset({
      label: '',
      category: 'Fournitures & Bureau',
      beneficiary: '',
      amount: 0,
      date: this.localToday()
    });
    this.expenseModalOpen.set(true);
  }

  closeExpenseModal(): void {
    this.expenseModalOpen.set(false);
  }

  submitExpense(): void {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }
    const raw = this.expenseForm.getRawValue();
    const entry: CashExpense = {
      id: createUuid(),
      date: raw.date,
      label: raw.label.trim(),
      category: raw.category,
      beneficiary: raw.beneficiary.trim() || 'Caisse',
      amount: Number(raw.amount) || 0,
      currency: this.registerCurrency()
    };
    const updated = [entry, ...this.cashExpenses()];
    this.cashExpenses.set(updated);
    this.saveCashExpenses(updated);
    this.expenseModalOpen.set(false);
    this.showCashbook.set(true);
    this.notifications.success(`Sortie de caisse « ${entry.label} » enregistrée.`);
  }

  removeExpense(id: string): void {
    const updated = this.cashExpenses().filter((item) => item.id !== id);
    this.cashExpenses.set(updated);
    this.saveCashExpenses(updated);
  }

  printCashbook(): void {
    const preview = window.open('', '_blank', 'width=860,height=920');
    if (!preview) {
      this.notifications.error("Autorisez l'ouverture de la fenêtre pour imprimer le brouillard de caisse.");
      return;
    }
    const currency = this.registerCurrency();
    const fmt = (n: number) => `${new Intl.NumberFormat('fr-FR').format(n)} ${currency}`;
    const inflows = (this.page()?.content ?? []).filter((p) => p.status === 'VALIDATED');
    const outflows = this.cashExpenses();
    preview.document.title = `Brouillard de caisse - ${this.localToday()}`;
    preview.document.body.innerHTML = `
      <div style="font: 14px Arial, sans-serif; color: #0f172a; padding: 28px;">
        <h1 style="margin:0 0 4px; font-size: 22px;">PROCÈS-VERBAL & BROUILLARD DE CAISSE</h1>
        <p style="margin:0 0 20px; color:#475569;">Arrêté du ${new Date().toLocaleDateString('fr-FR')} · Devise : ${currency}</p>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:24px;">
          <div style="padding:14px; border:1px solid #cbd5e1; border-radius:8px; background:#f0fdf4;">
            <div style="font-size:12px; color:#166534;">TOTAL ENTRÉES (ENCAISSEMENTS)</div>
            <strong style="font-size:20px; color:#15803d;">+ ${fmt(this.totalCashIn())}</strong>
          </div>
          <div style="padding:14px; border:1px solid #cbd5e1; border-radius:8px; background:#fef2f2;">
            <div style="font-size:12px; color:#991b1b;">TOTAL SORTIES (DÉPENSES)</div>
            <strong style="font-size:20px; color:#b91c1c;">− ${fmt(this.totalCashOut())}</strong>
          </div>
          <div style="padding:14px; border:2px solid #1e5fd6; border-radius:8px; background:#eff6ff;">
            <div style="font-size:12px; color:#1e40af;">SOLDE NET EN CAISSE</div>
            <strong style="font-size:20px; color:#1e3a8a;">${fmt(this.netCashBalance())}</strong>
          </div>
        </div>
        <h2 style="font-size:15px; margin:16px 0 8px;">1. Détail des encaissements (${inflows.length})</h2>
        <table style="width:100%; border-collapse:collapse; margin-bottom:20px; font-size:13px;">
          <thead><tr style="background:#f8fafc; text-align:left;">
            <th style="padding:8px; border-bottom:1px solid #cbd5e1;">Date</th>
            <th style="padding:8px; border-bottom:1px solid #cbd5e1;">Reçu</th>
            <th style="padding:8px; border-bottom:1px solid #cbd5e1;">Élève</th>
            <th style="padding:8px; border-bottom:1px solid #cbd5e1; text-align:right;">Montant</th>
          </tr></thead>
          <tbody>
            ${inflows.map(p => `<tr>
              <td style="padding:6px 8px; border-bottom:1px solid #e2e8f0;">${p.paymentDate}</td>
              <td style="padding:6px 8px; border-bottom:1px solid #e2e8f0;">${p.receiptNumber ?? p.paymentReference}</td>
              <td style="padding:6px 8px; border-bottom:1px solid #e2e8f0;">${p.studentName}</td>
              <td style="padding:6px 8px; border-bottom:1px solid #e2e8f0; text-align:right; font-weight:700;">+ ${fmt(p.amount)}</td>
            </tr>`).join('') || '<tr><td colspan="4" style="padding:8px;">Aucun encaissement.</td></tr>'}
          </tbody>
        </table>
        <h2 style="font-size:15px; margin:16px 0 8px;">2. Détail des sorties de caisse (${outflows.length})</h2>
        <table style="width:100%; border-collapse:collapse; margin-bottom:28px; font-size:13px;">
          <thead><tr style="background:#f8fafc; text-align:left;">
            <th style="padding:8px; border-bottom:1px solid #cbd5e1;">Date</th>
            <th style="padding:8px; border-bottom:1px solid #cbd5e1;">Catégorie</th>
            <th style="padding:8px; border-bottom:1px solid #cbd5e1;">Motif & Bénéficiaire</th>
            <th style="padding:8px; border-bottom:1px solid #cbd5e1; text-align:right;">Montant</th>
          </tr></thead>
          <tbody>
            ${outflows.map(e => `<tr>
              <td style="padding:6px 8px; border-bottom:1px solid #e2e8f0;">${e.date}</td>
              <td style="padding:6px 8px; border-bottom:1px solid #e2e8f0;">${e.category}</td>
              <td style="padding:6px 8px; border-bottom:1px solid #e2e8f0;">${e.label} (${e.beneficiary})</td>
              <td style="padding:6px 8px; border-bottom:1px solid #e2e8f0; text-align:right; font-weight:700;">− ${fmt(e.amount)}</td>
            </tr>`).join('') || '<tr><td colspan="4" style="padding:8px;">Aucune sortie enregistrée.</td></tr>'}
          </tbody>
        </table>
        <div style="display:flex; justify-content:space-between; margin-top:40px; padding-top:16px; border-top:1px dashed #94a3b8;">
          <div><strong>Visa du Caissier / Secrétariat</strong><br><br><br>___________________________</div>
          <div><strong>Visa de la Direction</strong><br><br><br>___________________________</div>
        </div>
      </div>
    `;
    preview.focus();
    preview.setTimeout(() => preview.print(), 150);
  }

  private loadCashExpenses(): CashExpense[] {
    try {
      const raw = localStorage.getItem(CASH_EXPENSES_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return [
      {
        id: 'exp-1',
        date: this.localToday(),
        label: 'Achat rames de papier A4 & marqueurs tableau',
        category: 'Fournitures & Bureau',
        beneficiary: 'Papeterie Centrale',
        amount: 18500,
        currency: 'XOF'
      },
      {
        id: 'exp-2',
        date: this.localToday(),
        label: 'Entretien groupe électrogène & carburant',
        category: 'Entretien & Réparations',
        beneficiary: 'Service Technique',
        amount: 25000,
        currency: 'XOF'
      }
    ];
  }

  private saveCashExpenses(items: CashExpense[]): void {
    try {
      localStorage.setItem(CASH_EXPENSES_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }
}
