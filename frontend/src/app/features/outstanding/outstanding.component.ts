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
    HasPermissionDirective, MoneyPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './outstanding.component.html',
  styleUrl: './outstanding.component.scss'
})
export class OutstandingComponent implements OnInit {
  private readonly dataSource = inject(FINANCE_DATA_SOURCE);
  private readonly destroyRef = inject(DestroyRef);

  readonly board = signal<OutstandingBoard | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly search = signal('');
  readonly bucket = signal<OutstandingBucket>('ALL');
  readonly currentPage = signal(0);
  readonly createPaymentPermission = PERMISSIONS.PAYMENT_CREATE;

  readonly buckets: readonly BucketChoice[] = [
    { value: 'ALL', label: 'Tous les soldes' },
    { value: 'OVERDUE', label: 'En retard' },
    { value: 'CRITICAL', label: '+ de 30 jours' },
    { value: 'DUE_SOON', label: 'À échéance bientôt' }
  ];

  private readonly query$ = new ReplaySubject<void>(1);

  @ViewChild('studentTpl', { static: true })
  studentTpl!: TemplateRef<{ $implicit: OutstandingStudent }>;
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
