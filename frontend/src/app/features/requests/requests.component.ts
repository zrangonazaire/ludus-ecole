import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { FAMILY_REQUEST_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { StudentSummary } from '@core/models/domain.models';
import {
  FAMILY_REQUEST_STATUSES, FAMILY_REQUEST_TYPES, FamilyRequest, FamilyRequestBoard,
  FamilyRequestChannel, FamilyRequestPriority, FamilyRequestStatus,
  FamilyRequestType
} from '@core/models/family-request.models';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

type StatusFilter = 'OPEN' | FamilyRequestStatus | '';

/** Incoming family requests, from first contact to handover. */
@Component({
  selector: 'eduops-requests',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink,
    LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit {
  private readonly dataSource = inject(FAMILY_REQUEST_DATA_SOURCE);
  private readonly students = inject(STUDENT_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly types = FAMILY_REQUEST_TYPES;
  readonly statuses = FAMILY_REQUEST_STATUSES;
  readonly priorities: ReadonlyArray<{ code: FamilyRequestPriority; label: string }> = [
    { code: 'NORMAL', label: 'Normale' },
    { code: 'HIGH', label: 'Haute' },
    { code: 'URGENT', label: 'Urgente' }
  ];
  readonly channels: ReadonlyArray<{ code: FamilyRequestChannel; label: string }> = [
    { code: 'PORTAL', label: 'Portail parent' },
    { code: 'EMAIL', label: 'E-mail' },
    { code: 'PHONE', label: 'Téléphone' },
    { code: 'IN_PERSON', label: "À l'accueil" }
  ];

  readonly board = signal<FamilyRequestBoard | null>(null);
  readonly studentList = signal<StudentSummary[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly search = signal('');
  readonly statusFilter = signal<StatusFilter>('OPEN');
  readonly typeFilter = signal<FamilyRequestType | ''>('');

  readonly creating = signal(false);
  readonly reviewing = signal<FamilyRequest | null>(null);
  readonly canManage = computed(() => this.auth.has(PERMISSIONS.DOCUMENT_GENERATE));
  readonly visible = computed(() => this.board()?.requests ?? []);
  readonly hasFilters = computed(() => this.search().trim().length > 0
    || this.statusFilter() !== 'OPEN' || this.typeFilter() !== '');

  readonly createForm = this.fb.nonNullable.group({
    studentId: ['', Validators.required],
    guardianName: ['', [Validators.required, Validators.maxLength(160)]],
    guardianPhone: ['', Validators.maxLength(40)],
    type: ['SCHOOL_CERTIFICATE' as FamilyRequestType, Validators.required],
    subject: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', Validators.maxLength(2000)],
    priority: ['NORMAL' as FamilyRequestPriority, Validators.required],
    channel: ['IN_PERSON' as FamilyRequestChannel, Validators.required]
  });

  readonly reviewForm = this.fb.nonNullable.group({
    status: ['IN_PROGRESS' as FamilyRequestStatus, Validators.required],
    assignedTo: ['', Validators.maxLength(160)],
    internalNote: ['', Validators.maxLength(2000)]
  });

  ngOnInit(): void {
    forkJoin({ students: this.students.search({ page: 0, size: 500 }) })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ students }) => this.studentList.set(students.content),
        error: () => undefined
      });
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.board({
      search: this.search().trim() || undefined,
      status: this.statusFilter() || undefined,
      type: this.typeFilter() || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (board) => {
        this.board.set(board);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  applySearch(value: string): void {
    this.search.set(value);
    this.load();
  }

  filterStatus(status: StatusFilter): void {
    this.statusFilter.set(status);
    this.load();
  }

  filterType(type: FamilyRequestType | ''): void {
    this.typeFilter.set(type);
    this.load();
  }

  resetFilters(): void {
    this.search.set('');
    this.statusFilter.set('OPEN');
    this.typeFilter.set('');
    this.load();
  }

  openCreate(): void {
    this.createForm.reset({
      studentId: '', guardianName: '', guardianPhone: '',
      type: 'SCHOOL_CERTIFICATE', subject: '', description: '',
      priority: 'NORMAL', channel: 'IN_PERSON'
    });
    this.creating.set(true);
  }

  closeCreate(): void {
    this.creating.set(false);
  }

  submitCreate(): void {
    if (this.createForm.invalid || this.saving()) {
      this.createForm.markAllAsTouched();
      return;
    }
    const value = this.createForm.getRawValue();
    this.saving.set(true);
    this.dataSource.create({
      studentId: value.studentId,
      guardianName: value.guardianName.trim(),
      guardianPhone: value.guardianPhone.trim() || undefined,
      type: value.type,
      subject: value.subject.trim(),
      description: value.description.trim() || undefined,
      priority: value.priority,
      channel: value.channel
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (request) => {
        this.saving.set(false);
        this.creating.set(false);
        this.notifications.success(
          `${request.reference} est ajoutée à la file.`, 'Demande enregistrée');
        this.load();
      },
      error: () => this.fail()
    });
  }

  review(request: FamilyRequest): void {
    this.reviewing.set(request);
    this.reviewForm.reset({
      status: request.status === 'NEW' ? 'IN_PROGRESS' : request.status,
      assignedTo: request.assignedTo ?? '',
      internalNote: request.internalNote ?? ''
    });
  }

  closeReview(): void {
    this.reviewing.set(null);
  }

  saveReview(): void {
    const request = this.reviewing();
    if (!request || this.reviewForm.invalid || this.saving()) return;
    const value = this.reviewForm.getRawValue();
    this.saving.set(true);
    this.dataSource.update(request.id, {
      status: value.status,
      assignedTo: value.assignedTo.trim() || undefined,
      internalNote: value.internalNote.trim() || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (saved) => {
        this.saving.set(false);
        this.reviewing.set(saved);
        this.notifications.success(
          `${saved.reference} est maintenant « ${saved.statusLabel} ».`, 'Demande mise à jour');
        this.load();
      },
      error: () => this.fail()
    });
  }

  statusTone(status: FamilyRequestStatus): string {
    return this.statuses.find((item) => item.code === status)?.tone ?? 'new';
  }

  priorityTone(priority: FamilyRequestPriority): string {
    return ({ NORMAL: 'normal', HIGH: 'high', URGENT: 'urgent' })[priority];
  }

  dueLabel(request: FamilyRequest): string {
    if (request.status === 'COMPLETED') return 'Clôturée';
    if (request.status === 'REJECTED') return 'Refusée';
    if (request.overdue) return 'Délai dépassé';
    const hours = Math.max(0, Math.ceil((Date.parse(request.dueAt) - Date.now()) / 3600000));
    return hours < 24 ? `Échéance dans ${hours} h` : `Échéance dans ${Math.ceil(hours / 24)} j`;
  }

  private fail(): void {
    this.saving.set(false);
    this.notifications.error("La demande n'a pas pu être enregistrée.", 'Action refusée');
  }
}
