import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ADMISSION_DATA_SOURCE } from '@core/datasource/data-source';
import {
  Admission, AdmissionClassroomOption, AdmissionCreatePayload, AdmissionOptions,
  AdmissionStatus, AdmissionStatusPayload
} from '@core/models/admission.models';
import { PageResponse } from '@core/models/common.models';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

interface StatusChoice { value: AdmissionStatus; label: string; }

@Component({
  selector: 'eduops-admissions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admissions.component.html',
  styleUrl: './admissions.component.scss'
})
export class AdmissionsComponent implements OnInit {
  private readonly dataSource = inject(ADMISSION_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly page = signal<PageResponse<Admission> | null>(null);
  readonly options = signal<AdmissionOptions | null>(null);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly createOpen = signal(false);
  readonly detailOpen = signal(false);
  readonly selected = signal<Admission | null>(null);
  readonly documentUpdating = signal<string | null>(null);
  readonly search = signal('');
  readonly statusFilter = signal<AdmissionStatus | ''>('');
  readonly levelFilter = signal('');
  readonly yearFilter = signal('');

  readonly canManage = computed(() => this.auth.has(PERMISSIONS.ADMISSION_MANAGE));
  readonly canDecide = computed(() => this.auth.has(PERMISSIONS.ADMISSION_DECIDE));
  readonly applications = computed(() => this.page()?.content ?? []);
  readonly summary = computed(() => {
    const items = this.applications();
    return {
      total: this.page()?.totalElements ?? 0,
      review: items.filter((item) => ['SUBMITTED', 'UNDER_REVIEW', 'TESTED']
        .includes(item.status)).length,
      accepted: items.filter((item) => item.status === 'ACCEPTED').length,
      incomplete: items.filter((item) => !item.documentsComplete
        && !['REJECTED', 'WITHDRAWN', 'CONVERTED'].includes(item.status)).length
    };
  });

  readonly statuses: StatusChoice[] = [
    { value: 'DRAFT', label: 'Brouillon' },
    { value: 'SUBMITTED', label: 'Soumis' },
    { value: 'UNDER_REVIEW', label: 'À étudier' },
    { value: 'TESTED', label: 'Test passé' },
    { value: 'ACCEPTED', label: 'Accepté' },
    { value: 'WAITLISTED', label: 'Liste d’attente' },
    { value: 'REJECTED', label: 'Refusé' },
    { value: 'WITHDRAWN', label: 'Retiré' },
    { value: 'CONVERTED', label: 'Inscrit' }
  ];

  readonly createForm = this.fb.nonNullable.group({
    academicYearId: ['', Validators.required],
    campusId: ['', Validators.required],
    requestedLevelId: ['', Validators.required],
    reservedClassroomId: [''],
    firstName: ['', [Validators.required, Validators.maxLength(120)]],
    lastName: ['', [Validators.required, Validators.maxLength(120)]],
    middleName: ['', Validators.maxLength(120)],
    gender: ['FEMALE', Validators.required],
    birthDate: ['', Validators.required],
    birthPlace: [''],
    nationality: ['Ivoirienne'],
    previousSchool: [''],
    guardianFirstName: [''],
    guardianLastName: [''],
    guardianPhone: [''],
    guardianEmail: ['', Validators.email],
    notes: ['']
  });

  readonly workflowForm = this.fb.nonNullable.group({
    status: ['', Validators.required],
    reservedClassroomId: [''],
    entranceExamScore: [''],
    reason: ['']
  });

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions(academicYearId?: string): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.options(academicYearId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (options) => {
        this.options.set(options);
        const yearId = academicYearId || options.defaultAcademicYearId
          || options.academicYears[0]?.id || '';
        this.yearFilter.set(yearId);
        this.createForm.controls.academicYearId.setValue(yearId);
        if (!this.createForm.controls.campusId.value) {
          this.createForm.controls.campusId.setValue(options.campuses[0]?.id ?? '');
        }
        this.load();
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.search({
      academicYearId: this.yearFilter() || undefined,
      status: this.statusFilter() || undefined,
      levelId: this.levelFilter() || undefined,
      search: this.search().trim() || undefined,
      page: 0,
      size: 100,
      sort: 'createdAt,desc'
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (page) => {
        this.page.set(page);
        this.loading.set(false);
      },
      error: () => {
        // Une recherche indisponible ne doit pas masquer les options ni le
        // formulaire de création déjà chargés.
        this.page.set({
          content: [], page: 0, size: 100, totalElements: 0, totalPages: 0,
          first: true, last: true
        });
        this.loading.set(false);
        this.error.set(false);
      }
    });
  }

  onYearChange(value: string): void {
    this.levelFilter.set('');
    this.loadOptions(value);
  }

  openCreate(): void {
    const options = this.options();
    this.createForm.reset({
      academicYearId: this.yearFilter() || options?.defaultAcademicYearId || '',
      campusId: options?.campuses[0]?.id ?? '',
      requestedLevelId: '', reservedClassroomId: '',
      firstName: '', lastName: '', middleName: '', gender: 'FEMALE', birthDate: '',
      birthPlace: '', nationality: 'Ivoirienne', previousSchool: '',
      guardianFirstName: '', guardianLastName: '', guardianPhone: '',
      guardianEmail: '', notes: ''
    });
    this.createOpen.set(true);
  }

  closeCreate(): void {
    if (!this.saving()) this.createOpen.set(false);
  }

  submitCreate(): void {
    if (this.createForm.invalid || this.saving()) {
      this.createForm.markAllAsTouched();
      return;
    }
    const value = this.createForm.getRawValue();
    const payload: AdmissionCreatePayload = {
      academicYearId: value.academicYearId,
      campusId: value.campusId,
      requestedLevelId: value.requestedLevelId,
      reservedClassroomId: optional(value.reservedClassroomId),
      firstName: value.firstName.trim(), lastName: value.lastName.trim(),
      middleName: optional(value.middleName),
      gender: value.gender as AdmissionCreatePayload['gender'],
      birthDate: value.birthDate,
      birthPlace: optional(value.birthPlace), nationality: optional(value.nationality),
      previousSchool: optional(value.previousSchool),
      guardianFirstName: optional(value.guardianFirstName),
      guardianLastName: optional(value.guardianLastName),
      guardianPhone: optional(value.guardianPhone), guardianEmail: optional(value.guardianEmail),
      notes: optional(value.notes)
    };
    this.saving.set(true);
    this.dataSource.create(payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (created) => {
        this.saving.set(false);
        this.createOpen.set(false);
        this.notifications.success(`${created.applicationNumber} a été créé.`,
          'Dossier d’admission');
        this.load();
      },
      error: () => this.saving.set(false)
    });
  }

  openDetails(application: Admission): void {
    this.selected.set(application);
    this.workflowForm.reset({
      status: '',
      reservedClassroomId: application.reservedClassroomId ?? '',
      entranceExamScore: application.entranceExamScore?.toString() ?? '',
      reason: application.decisionReason ?? ''
    });
    this.detailOpen.set(true);
  }

  closeDetails(): void {
    if (!this.saving()) {
      this.detailOpen.set(false);
      this.selected.set(null);
    }
  }

  submitWorkflow(): void {
    const application = this.selected();
    if (!application || this.workflowForm.invalid || this.saving()) return;
    const value = this.workflowForm.getRawValue();
    const status = value.status as AdmissionStatus;
    if (status === 'TESTED' && value.entranceExamScore === '') {
      this.notifications.warning('Saisissez la note du test d’entrée.');
      return;
    }
    if (status === 'REJECTED' && !value.reason.trim()) {
      this.notifications.warning('Le motif du refus est obligatoire.');
      return;
    }
    const payload: AdmissionStatusPayload = {
      status,
      reservedClassroomId: optional(value.reservedClassroomId),
      entranceExamScore: value.entranceExamScore === ''
        ? undefined : Number(value.entranceExamScore),
      reason: optional(value.reason)
    };
    this.saving.set(true);
    this.dataSource.changeStatus(application.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (updated) => {
          this.saving.set(false);
          this.replace(updated);
          this.workflowForm.controls.status.setValue('');
          this.notifications.success(`Le dossier est maintenant « ${this.statusLabel(updated.status)} ».`);
        },
        error: () => this.saving.set(false)
      });
  }

  toggleDocument(documentId: string, received: boolean): void {
    const application = this.selected();
    if (!application || this.documentUpdating()) return;
    this.documentUpdating.set(documentId);
    this.dataSource.updateDocument(application.id, documentId, received)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (updated) => {
          this.documentUpdating.set(null);
          this.replace(updated);
        },
        error: () => this.documentUpdating.set(null)
      });
  }

  availableClassroomsForCreate(): AdmissionClassroomOption[] {
    const value = this.createForm.getRawValue();
    return this.options()?.classrooms.filter((item) =>
      (!value.requestedLevelId || item.levelId === value.requestedLevelId)
      && (!value.campusId || item.campusId === value.campusId)) ?? [];
  }

  availableClassrooms(application: Admission): AdmissionClassroomOption[] {
    return this.options()?.classrooms.filter((item) =>
      item.levelId === application.requestedLevelId
      && item.campusId === application.campusId) ?? [];
  }

  nextStatuses(application: Admission): StatusChoice[] {
    const transitions: Record<AdmissionStatus, AdmissionStatus[]> = {
      DRAFT: ['SUBMITTED', 'WITHDRAWN'],
      SUBMITTED: ['UNDER_REVIEW', 'REJECTED', 'WITHDRAWN'],
      UNDER_REVIEW: ['TESTED', 'ACCEPTED', 'WAITLISTED', 'REJECTED', 'WITHDRAWN'],
      TESTED: ['ACCEPTED', 'WAITLISTED', 'REJECTED', 'WITHDRAWN'],
      ACCEPTED: ['WITHDRAWN'],
      WAITLISTED: ['ACCEPTED', 'REJECTED', 'WITHDRAWN'],
      REJECTED: [], WITHDRAWN: [], CONVERTED: []
    };
    return transitions[application.status].map((status) => ({
      value: status, label: this.statusLabel(status)
    }));
  }

  statusLabel(status: AdmissionStatus): string {
    return this.statuses.find((item) => item.value === status)?.label ?? status;
  }

  documentProgress(application: Admission): string {
    const mandatory = application.documents.filter((item) => item.mandatory);
    return `${mandatory.filter((item) => item.received).length}/${mandatory.length}`;
  }

  private replace(updated: Admission): void {
    this.selected.set(updated);
    this.page.update((page) => page ? {
      ...page,
      content: page.content.map((item) => item.id === updated.id ? updated : item)
    } : page);
  }
}

function optional(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed || undefined;
}
