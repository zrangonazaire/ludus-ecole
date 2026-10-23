import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, TemplateRef, ViewChild,
  inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReplaySubject, catchError, debounceTime, of, switchMap } from 'rxjs';
import { FINANCE_DATA_SOURCE } from '@core/datasource/data-source';
import {
  OutstandingBoard, OutstandingBucket, OutstandingStudent
} from '@core/models/outstanding.models';
import { DataTableComponent, TableColumn } from '@shared/ui/data-table/data-table.component';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { HasPermissionDirective } from '@shared/directives/has-permission.directive';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { PERMISSIONS } from '@core/models/auth.models';
import { OutstandingReminderService } from '@core/services/outstanding-reminder.service';
import {
  OutstandingReminderPreview, OutstandingReminderSendResult, ReminderChannel
} from '@core/models/outstanding-reminder.models';

import { CollectionPanelComponent } from './collection-panel.component';

interface BucketChoice {
  value: OutstandingBucket;
  label: string;
}

/** Collection board: what is owed, by whom, and what needs attention first. */
@Component({
  selector: 'eduops-outstanding',
  standalone: true,
  imports: [
    CommonModule, RouterLink, DataTableComponent, AvatarComponent, ErrorStateComponent,
    HasPermissionDirective, MoneyPipe, CollectionPanelComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './outstanding.component.html',
  styleUrl: './outstanding.component.scss'
})
export class OutstandingComponent implements OnInit {
  private readonly dataSource = inject(FINANCE_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);
  private readonly reminderService = inject(OutstandingReminderService);

  readonly selectedStudent = signal<OutstandingStudent | null>(null);
  readonly board = signal<OutstandingBoard | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly search = signal('');
  readonly bucket = signal<OutstandingBucket>('ALL');
  readonly currentPage = signal(0);
  readonly createPaymentPermission = PERMISSIONS.PAYMENT_CREATE;
  readonly selectedIds = signal<Set<string>>(new Set());
  readonly reminderStep = signal<'closed' | 'compose' | 'preview' | 'result'>('closed');
  readonly reminderChannel = signal<ReminderChannel>('EMAIL');
  readonly reminderTitle = signal('Rappel de scolarité');
  readonly reminderSubject = signal('Rappel de scolarité · solde à régulariser');
  readonly reminderBody = signal('Bonjour {tuteur},\n\nNous vous contactons au sujet du solde de scolarité de {eleve}, actuellement de {montant} {devise}.\n\nNous vous invitons à régulariser la situation ou à contacter l’établissement pour en discuter.\n\nMerci de votre confiance.');
  readonly preparing = signal(false);
  readonly sending = signal(false);
  readonly reminderError = signal('');
  readonly reminderPreview = signal<OutstandingReminderPreview | null>(null);
  readonly reminderResult = signal<OutstandingReminderSendResult | null>(null);

  readonly buckets: readonly BucketChoice[] = [
    { value: 'FOLLOW_UP', label: 'À relancer' },
    { value: 'ALL', label: 'Tous les soldes' },
    { value: 'OVERDUE', label: 'En retard' },
    { value: 'CRITICAL', label: '30 jours et plus' },
    { value: 'DUE_SOON', label: 'À échéance bientôt' }
  ];

  private readonly query$ = new ReplaySubject<void>(1);

  @ViewChild('studentTpl', { static: true })
  studentTpl!: TemplateRef<{ $implicit: OutstandingStudent }>;
  @ViewChild('selectTpl', { static: true })
  selectTpl!: TemplateRef<{ $implicit: OutstandingStudent }>;
  @ViewChild('guardianTpl', { static: true })
  guardianTpl!: TemplateRef<{ $implicit: OutstandingStudent }>;
  @ViewChild('dueTpl', { static: true })
  dueTpl!: TemplateRef<{ $implicit: OutstandingStudent }>;
  @ViewChild('delayTpl', { static: true })
  delayTpl!: TemplateRef<{ $implicit: OutstandingStudent }>;
  @ViewChild('amountTpl', { static: true })
  amountTpl!: TemplateRef<{ $implicit: OutstandingStudent }>;
  @ViewChild('actionsTpl', { static: true })
  actionsTpl!: TemplateRef<{ $implicit: OutstandingStudent }>;

  columns: TableColumn<OutstandingStudent>[] = [];

  ngOnInit(): void {
    this.columns = [
      { key: 'select', label: '', template: this.selectTpl, width: '4%' },
      { key: 'studentName', label: 'Élève', template: this.studentTpl, width: '25%' },
      { key: 'guardianName', label: 'Responsable financier', template: this.guardianTpl, width: '22%' },
      { key: 'oldestDueDate', label: 'Plus ancienne échéance', template: this.dueTpl, width: '15%' },
      { key: 'daysOverdue', label: 'Retard', template: this.delayTpl, width: '12%' },
      { key: 'outstandingAmount', label: 'Solde', numeric: true, template: this.amountTpl, width: '14%' },
      { key: 'actions', label: '', template: this.actionsTpl, width: '12%' }
    ];

    this.query$
      .pipe(
        debounceTime(220),
        switchMap(() => {
          this.loading.set(true);
          this.error.set(false);
          return this.dataSource.outstanding({
            page: this.currentPage(),
            size: 15,
            search: this.search().trim() || undefined,
            bucket: this.bucket()
          }).pipe(catchError(() => {
            this.error.set(true);
            return of(null);
          }));
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((board) => {
        if (board) this.board.set(board);
        this.loading.set(false);
      });

    this.reload();
  }

  onSearch(value: string): void {
    this.search.set(value);
    this.currentPage.set(0);
    this.reload();
  }

  selectBucket(bucket: OutstandingBucket): void {
    this.bucket.set(bucket);
    this.currentPage.set(0);
    this.reload();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.reload();
  }

  isSelected(studentId: string): boolean { return this.selectedIds().has(studentId); }

  toggleStudent(studentId: string, checked: boolean): void {
    const next = new Set(this.selectedIds());
    checked ? next.add(studentId) : next.delete(studentId);
    this.selectedIds.set(next);
  }

  toggleCurrentPage(checked: boolean): void {
    const next = new Set(this.selectedIds());
    for (const row of this.board()?.students.content ?? []) {
      checked ? next.add(row.studentId) : next.delete(row.studentId);
    }
    this.selectedIds.set(next);
  }

  clearSelection(): void { this.selectedIds.set(new Set()); }

  currentPageSelected(): boolean {
    const rows = this.board()?.students.content ?? [];
    return rows.length > 0 && rows.every(row => this.selectedIds().has(row.studentId));
  }

  openReminder(): void {
    this.reminderError.set('');
    this.reminderPreview.set(null);
    this.reminderResult.set(null);
    this.reminderStep.set('compose');
  }

  prepareReminder(): void {
    this.preparing.set(true);
    this.reminderError.set('');
    this.reminderService.prepare({
      studentIds: [...this.selectedIds()],
      channel: this.reminderChannel(),
      title: this.reminderTitle(),
      subject: this.reminderChannel() === 'EMAIL' ? this.reminderSubject() : undefined,
      bodyTemplate: this.reminderBody()
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: preview => {
        this.reminderPreview.set(preview);
        this.reminderStep.set('preview');
        this.preparing.set(false);
      },
      error: error => {
        this.reminderError.set(this.errorMessage(error));
        this.preparing.set(false);
      }
    });
  }

  sendReminder(): void {
    const campaignId = this.reminderPreview()?.campaignId;
    if (!campaignId) return;
    this.sending.set(true);
    this.reminderError.set('');
    this.reminderService.send(campaignId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: result => {
        this.reminderResult.set(result);
        this.reminderStep.set('result');
        this.sending.set(false);
        this.selectedIds.set(new Set());
        this.reload();
      },
      error: error => {
        this.reminderError.set(this.errorMessage(error));
        this.sending.set(false);
      }
    });
  }

  closeReminder(): void { this.reminderStep.set('closed'); }

  private errorMessage(error: { error?: { message?: string } }): string {
    return error?.error?.message ?? 'La relance n’a pas pu être traitée. Réessayez.';
  }

  reload(): void {
    this.query$.next();
  }

  delayLabel(row: OutstandingStudent): string {
    if (row.daysOverdue === 0) return 'À venir';
    if (row.daysOverdue === 1) return '1 jour';
    return `${row.daysOverdue} jours`;
  }

  delayTone(row: OutstandingStudent): string {
    if (row.daysOverdue >= 30) return 'critical';
    if (row.daysOverdue > 0) return 'overdue';
    return 'soon';
  }
}
