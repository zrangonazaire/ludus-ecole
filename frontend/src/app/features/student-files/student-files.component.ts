import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  CLASSROOM_DATA_SOURCE, OFFICIAL_DOCUMENT_DATA_SOURCE, REFERENCE_DATA_SOURCE,
  STUDENT_DATA_SOURCE
} from '@core/datasource/data-source';
import { Classroom, StudentSummary } from '@core/models/domain.models';
import {
  OFFICIAL_DOCUMENT_TEMPLATES, OfficialDocument, OfficialDocumentLayout,
  OfficialDocumentTemplate, OfficialDocumentType
} from '@core/models/official-document.models';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { NotificationService } from '@core/services/notification.service';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';

export type StudentFilesTab = 'CREATE' | 'REGISTER' | 'SETTINGS';

@Component({
  selector: 'eduops-student-files',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingStateComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './student-files.component.html',
  styleUrl: './student-files.component.scss'
})
export class StudentFilesComponent implements OnInit {
  private readonly documentsSource = inject(OFFICIAL_DOCUMENT_DATA_SOURCE);
  private readonly studentsSource = inject(STUDENT_DATA_SOURCE);
  private readonly classroomsSource = inject(CLASSROOM_DATA_SOURCE);
  private readonly referenceSource = inject(REFERENCE_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly auth = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly templates = OFFICIAL_DOCUMENT_TEMPLATES;
  readonly tab = signal<StudentFilesTab>('CREATE');
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly students = signal<StudentSummary[]>([]);
  readonly classrooms = signal<Classroom[]>([]);
  readonly academicYearCode = signal('');
  readonly documents = signal<OfficialDocument[]>([]);
  readonly layout = signal<OfficialDocumentLayout | null>(null);
  readonly selectedStudentId = signal('');
  readonly studentSearch = signal('');
  readonly classroomFilter = signal('');
  readonly historySearch = signal('');
  readonly historyType = signal<OfficialDocumentType | ''>('');
  readonly printing = signal<OfficialDocument | null>(null);
  readonly revokeTarget = signal<OfficialDocument | null>(null);
  readonly draftRevision = signal(0);

  readonly canGenerate = computed(() => this.auth.has(PERMISSIONS.DOCUMENT_GENERATE));
  readonly canConfigure = computed(() => this.auth.has(PERMISSIONS.SCHOOL_MANAGE));

  readonly issueForm = this.fb.nonNullable.group({
    type: ['SCHOOL_CERTIFICATE' as OfficialDocumentType, [Validators.required]],
    issueDate: [localIsoDate(), [Validators.required]],
    validUntil: [''],
    purpose: ['', [Validators.maxLength(500)]],
    recipient: ['', [Validators.maxLength(250)]],
    additionalMention: ['', [Validators.maxLength(1000)]],
    meetingDate: [''],
    meetingTime: [''],
    meetingPlace: ['', [Validators.maxLength(250)]]
  });

  readonly layoutForm = this.fb.nonNullable.group({
    schoolName: ['', [Validators.required, Validators.maxLength(200)]],
    legalName: ['', [Validators.maxLength(255)]],
    motto: ['', [Validators.maxLength(255)]],
    registrationNumber: ['', [Validators.maxLength(80)]],
    address: ['', [Validators.maxLength(400)]],
    city: ['', [Validators.maxLength(120)]],
    country: ['', [Validators.maxLength(120)]],
    phone: ['', [Validators.maxLength(40)]],
    email: ['', [Validators.email, Validators.maxLength(180)]],
    website: ['', [Validators.maxLength(200)]],
    logoDataUrl: [''],
    headerLeft: ['', [Validators.maxLength(500)]],
    headerRight: ['', [Validators.maxLength(500)]],
    footerText: ['', [Validators.maxLength(1000)]],
    signatoryName: ['', [Validators.maxLength(200)]],
    signatoryTitle: ['', [Validators.required, Validators.maxLength(160)]],
    accentColor: ['#1f5fd6', [Validators.required, Validators.pattern(/^#[0-9a-fA-F]{6}$/)]],
    documentNumberPattern: ['DOC-{year}-{seq:6}', [Validators.required,
      Validators.pattern(/.*\{seq(?::\d+)?}.*/)]],
    showLogo: [true],
    showMotto: [true],
    showSignatureLine: [true],
    showVerificationCode: [true]
  });

  readonly revokeForm = this.fb.nonNullable.group({
    reason: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]]
  });

  readonly selectedTemplate = computed<OfficialDocumentTemplate>(() => {
    this.draftRevision();
    const type = this.issueForm.controls.type.value;
    return this.templates.find((item) => item.type === type) ?? this.templates[0];
  });

  readonly selectedStudent = computed(() =>
    this.students().find((student) => student.id === this.selectedStudentId()) ?? null);

  readonly visibleStudents = computed(() => {
    const search = normalise(this.studentSearch());
    const classroomId = this.classroomFilter();
    return this.students()
      .filter((student) => !classroomId || student.classroomId === classroomId)
      .filter((student) => !search || normalise(
        `${student.fullName} ${student.studentNumber} ${student.classroomName ?? ''}`)
        .includes(search))
      .slice(0, 10);
  });

  readonly visibleDocuments = computed(() => {
    const search = normalise(this.historySearch());
    const type = this.historyType();
    return this.documents()
      .filter((document) => !type || document.type === type)
      .filter((document) => !search || normalise(
        `${document.studentName} ${document.studentNumber} ${document.documentNumber} ${document.title}`)
        .includes(search));
  });

  readonly issuedCount = computed(() =>
    this.documents().filter((document) => document.status === 'ISSUED').length);
  readonly revokedCount = computed(() =>
    this.documents().filter((document) => document.status === 'REVOKED').length);

  readonly previewDocument = computed<OfficialDocument | null>(() => {
    this.draftRevision();
    const student = this.selectedStudent();
    const layout = this.previewLayout();
    if (!student || !layout) {
      return null;
    }
    const value = this.issueForm.getRawValue();
    const classroom = this.classrooms().find((item) => item.id === student.classroomId);
    return {
      id: 'preview',
      type: value.type,
      typeLabel: this.selectedTemplate().label,
      documentNumber: previewNumber(layout.documentNumberPattern, value.issueDate),
      verificationCode: 'APER-CU00-2026',
      title: this.selectedTemplate().label,
      status: 'DRAFT',
      issuedAt: `${value.issueDate}T00:00:00Z`,
      validUntil: value.validUntil || undefined,
      studentId: student.id,
      studentName: student.fullName,
      studentNumber: student.studentNumber,
      gender: student.gender,
      birthDate: student.birthDate,
      birthPlace: 'Abidjan',
      nationality: 'Ivoirienne',
      photoUrl: student.photoUrl,
      enrollmentNumber: `INS-${value.issueDate.slice(0, 4)}-${student.studentNumber.slice(-6)}`,
      classroomName: classroom?.name ?? student.classroomName,
      levelName: classroom?.levelName ?? student.levelName,
      academicYearId: classroom?.academicYearId,
      academicYearCode: this.academicYearCode(),
      metadata: {
        purpose: value.purpose.trim() || undefined,
        recipient: value.recipient.trim() || undefined,
        additionalMention: value.additionalMention.trim() || undefined,
        meetingDate: value.meetingDate || undefined,
        meetingTime: value.meetingTime || undefined,
        meetingPlace: value.meetingPlace.trim() || undefined
      },
      layout
    };
  });

  readonly readyToIssue = computed(() => {
    this.draftRevision();
    const value = this.issueForm.getRawValue();
    const summonsComplete = value.type !== 'SUMMONS'
      || (!!value.purpose.trim() && !!value.meetingDate);
    return !!this.selectedStudent() && this.issueForm.valid && summonsComplete
      && this.canGenerate() && !this.saving();
  });

  ngOnInit(): void {
    this.watchForms();
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    forkJoin({
      students: this.studentsSource.search({ page: 0, size: 300, status: 'ACTIVE' })
        .pipe(catchError(() => of({ content: [] as StudentSummary[] }))),
      classrooms: this.classroomsSource.list().pipe(catchError(() => of([] as Classroom[]))),
      years: this.referenceSource.academicYears().pipe(catchError(() => of([]))),
      documents: this.documentsSource.search({ page: 0, size: 100 })
        .pipe(catchError(() => of({ content: [] as OfficialDocument[] }))),
      layout: this.documentsSource.layout().pipe(catchError(() => of(null)))
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.students.set(data.students.content);
        this.classrooms.set(data.classrooms);
        this.documents.set(data.documents.content);
        if (data.layout) {
          this.layout.set(data.layout);
          this.layoutForm.reset(data.layout);
        }
        const activeYear = data.years.find((year) => year.status === 'ACTIVE') ?? data.years[0];
        this.academicYearCode.set(activeYear?.code ?? '');
        this.selectedStudentId.set(data.students.content[0]?.id ?? '');
        this.loading.set(false);
        this.draftRevision.update((value) => value + 1);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  changeTab(tab: StudentFilesTab): void {
    this.tab.set(tab);
    this.draftRevision.update((value) => value + 1);
  }

  /** Ouvre une nouvelle émission sans conserver les mentions précédentes. */
  newDocument(): void {
    this.issueForm.reset({
      type: 'SCHOOL_CERTIFICATE',
      issueDate: localIsoDate(),
      validUntil: '',
      purpose: '',
      recipient: '',
      additionalMention: '',
      meetingDate: '',
      meetingTime: '',
      meetingPlace: ''
    });
    this.studentSearch.set('');
    this.classroomFilter.set('');
    this.selectedStudentId.set(this.students()[0]?.id ?? '');
    this.tab.set('CREATE');
    this.draftRevision.update((value) => value + 1);
  }

  chooseTemplate(type: OfficialDocumentType): void {
    this.issueForm.patchValue({ type });
  }

  chooseStudent(studentId: string): void {
    this.selectedStudentId.set(studentId);
  }

  issue(printAfter: boolean): void {
    if (!this.readyToIssue()) {
      return;
    }
    this.saving.set(true);
    const value = this.issueForm.getRawValue();
    this.documentsSource.issue({
      studentId: this.selectedStudentId(),
      type: value.type,
      issueDate: value.issueDate,
      validUntil: value.validUntil || undefined,
      purpose: value.purpose.trim() || undefined,
      recipient: value.recipient.trim() || undefined,
      additionalMention: value.additionalMention.trim() || undefined,
      meetingDate: value.meetingDate || undefined,
      meetingTime: value.meetingTime || undefined,
      meetingPlace: value.meetingPlace.trim() || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (document) => {
        this.saving.set(false);
        this.documents.update((items) => [document, ...items]);
        this.notifications.success(
          `${document.title} ${document.documentNumber} enregistré pour ${document.studentName}.`,
          'Document officiel émis');
        if (printAfter) {
          this.print(document);
        } else {
          this.tab.set('REGISTER');
        }
      },
      error: () => this.saving.set(false)
    });
  }

  print(document: OfficialDocument): void {
    this.printing.set(document);
    setTimeout(() => {
      window.print();
      this.printing.set(null);
    }, 120);
  }

  openRevoke(document: OfficialDocument): void {
    this.revokeTarget.set(document);
    this.revokeForm.reset({ reason: '' });
  }

  closeRevoke(): void {
    this.revokeTarget.set(null);
  }

  revoke(): void {
    const target = this.revokeTarget();
    if (!target || this.revokeForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    this.documentsSource.revoke(target.id, this.revokeForm.controls.reason.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (document) => {
          this.documents.update((items) => items.map((item) =>
            item.id === document.id ? document : item));
          this.saving.set(false);
          this.closeRevoke();
          this.notifications.warning(
            `${document.documentNumber} reste au registre mais n'est plus valable.`,
            'Document révoqué');
        },
        error: () => this.saving.set(false)
      });
  }

  saveLayout(): void {
    if (this.layoutForm.invalid || this.saving() || !this.canConfigure()) {
      this.layoutForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.documentsSource.saveLayout(this.layoutForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (layout) => {
          this.layout.set(layout);
          this.layoutForm.reset(layout);
          this.saving.set(false);
          this.notifications.success(
            'Les prochains documents utiliseront cette mise en page. Les anciens restent inchangés.',
            'Papier à en-tête enregistré');
        },
        error: () => this.saving.set(false)
      });
  }

  cancelLayoutChanges(): void {
    const layout = this.layout();
    if (layout) {
      this.layoutForm.reset(layout);
    }
  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith('image/') || file.size > 500_000) {
      this.notifications.error('Choisissez une image PNG, JPG ou SVG de moins de 500 Ko.',
        'Logo non chargé');
      input.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.layoutForm.patchValue({ logoDataUrl: String(reader.result ?? ''), showLogo: true });
      input.value = '';
    };
    reader.readAsDataURL(file);
  }

  removeLogo(): void {
    this.layoutForm.patchValue({ logoDataUrl: '', showLogo: false });
  }

  formatDate(value: string | undefined): string {
    if (!value) {
      return '—';
    }
    return new Date(value.length === 10 ? `${value}T00:00:00` : value)
      .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  shortDate(value: string): string {
    return new Date(value).toLocaleDateString('fr-FR');
  }

  statusLabel(status: OfficialDocument['status']): string {
    return status === 'REVOKED' ? 'Révoqué' : status === 'ISSUED' ? 'Émis' : 'Brouillon';
  }

  salutation(document: OfficialDocument): string {
    return document.gender === 'FEMALE' ? "l'élève" : "l'élève";
  }

  bornLabel(document: OfficialDocument): string {
    return document.gender === 'FEMALE' ? 'née' : 'né';
  }

  private previewLayout(): OfficialDocumentLayout | null {
    if (this.tab() === 'SETTINGS' && this.layoutForm.valid) {
      return this.layoutForm.getRawValue();
    }
    return this.layout();
  }

  private watchForms(): void {
    this.issueForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.draftRevision.update((value) => value + 1));
    this.layoutForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.draftRevision.update((value) => value + 1));
  }
}

function localIsoDate(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function normalise(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function previewNumber(pattern: string, issueDate: string): string {
  const year = issueDate.slice(0, 4) || String(new Date().getFullYear());
  return pattern.replaceAll('{year}', year).replaceAll('{yy}', year.slice(-2))
    .replaceAll('{schoolCode}', 'ECOLE')
    .replace(/\{seq(?::(\d+))?}/g, (_match, width: string | undefined) =>
      '0'.repeat(Math.max(1, Number(width ?? 6) - 3)) + '123');
}

