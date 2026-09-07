import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  CLASSROOM_DATA_SOURCE, COUNCIL_DATA_SOURCE, REFERENCE_DATA_SOURCE,
  TEACHER_DATA_SOURCE
} from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { AcademicYear, Classroom, Teacher, Term } from '@core/models/domain.models';
import {
  COUNCIL_STATES, Council, CouncilStatus, CouncilStudentDecision, CouncilSummary,
  PROMOTION_DECISIONS, PromotionDecision
} from '@core/models/council.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { ConfirmDialogComponent } from '@shared/ui/confirm-dialog/confirm-dialog.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';

/**
 * The class-council desk: calendar, attendance sheet and individual decisions.
 *
 * A promotion decision is kept on the council, rather than written directly on
 * a future enrollment. That makes the meeting's outcome readable and prevents
 * a later re-enrollment from silently changing what the council concluded.
 */
@Component({
  selector: 'eduops-councils',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoadingStateComponent,
    ErrorStateComponent, ConfirmDialogComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './councils.component.html',
  styleUrl: './councils.component.scss'
})
export class CouncilsComponent implements OnInit {
  private readonly dataSource = inject(COUNCIL_DATA_SOURCE);
  private readonly classroomsSource = inject(CLASSROOM_DATA_SOURCE);
  private readonly referenceSource = inject(REFERENCE_DATA_SOURCE);
  private readonly teacherSource = inject(TEACHER_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly states = COUNCIL_STATES;
  readonly decisions = PROMOTION_DECISIONS;
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);
  readonly detailLoading = signal(false);
  readonly createOpen = signal(false);
  readonly closeConfirmOpen = signal(false);
  readonly decisionOpen = signal(false);

  readonly years = signal<AcademicYear[]>([]);
  readonly terms = signal<Term[]>([]);
  readonly classrooms = signal<Classroom[]>([]);
  readonly teachers = signal<Teacher[]>([]);
  readonly councils = signal<CouncilSummary[]>([]);
  readonly selectedYearId = signal('');
  readonly selectedStatus = signal<CouncilStatus | ''>('');
  readonly detail = signal<Council | null>(null);
  readonly deciding = signal<CouncilStudentDecision | null>(null);

  readonly canManage = computed(() => this.auth.has(PERMISSIONS.COUNCIL_MANAGE));
  readonly canDecide = computed(() => this.auth.has(PERMISSIONS.PROMOTION_DECIDE));
  readonly filteredClassrooms = computed(() => this.classrooms().filter((classroom) =>
    classroom.academicYearId === this.selectedYearId() && classroom.status === 'ACTIVE'));
  readonly plannedCount = computed(() => this.councils()
    .filter((council) => council.status === 'PLANNED').length);
  readonly inProgressCount = computed(() => this.councils()
    .filter((council) => council.status === 'IN_PROGRESS').length);
  readonly closedCount = computed(() => this.councils()
    .filter((council) => council.status === 'CLOSED').length);
  readonly decidedCount = computed(() => this.detail()?.students
    .filter((student) => student.decided).length ?? 0);
  readonly pendingCount = computed(() => Math.max(0,
    (this.detail()?.students.length ?? 0) - this.decidedCount()));
  readonly presentCount = computed(() => this.detail()?.participants
    .filter((participant) => participant.present).length ?? 0);

  readonly createForm = this.fb.nonNullable.group({
    classroomId: ['', Validators.required],
    termId: ['', Validators.required],
    meetingDate: [today(), Validators.required],
    startTime: [''],
    endTime: [''],
    location: ['', [Validators.maxLength(150)]]
  });

  readonly meetingForm = this.fb.nonNullable.group({
    meetingDate: ['', Validators.required],
    startTime: [''],
    endTime: [''],
    location: ['', [Validators.maxLength(150)]],
    remarks: [''],
    minutesUrl: ['', [Validators.maxLength(500)]]
  });

  readonly participantForm = this.fb.nonNullable.group({
    teacherId: ['', Validators.required],
    roleLabel: ['Enseignant', [Validators.required, Validators.maxLength(120)]],
    present: [true]
  });

  readonly decisionForm = this.fb.nonNullable.group({
    decision: ['PASS' as PromotionDecision, Validators.required],
    annualAverage: [''],
    justification: [''],
    orientationAdvice: ['', Validators.maxLength(255)]
  });

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.loading.set(true);
    this.error.set(false);
    this.referenceSource.academicYears().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (years) => {
        this.years.set(years);
        const active = years.find((year) => year.status === 'ACTIVE') ?? years[0];
        this.selectedYearId.set(active?.id ?? '');
        if (!active) {
          this.loading.set(false);
          return;
        }
        forkJoin({
          classrooms: this.classroomsSource.list(),
          terms: this.referenceSource.terms(active.id),
          teachers: this.teacherSource.search({ page: 0, size: 100 })
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: (data) => {
            this.classrooms.set(data.classrooms);
            this.terms.set(data.terms);
            this.teachers.set(data.teachers.content.filter((teacher) => teacher.status === 'ACTIVE'));
            this.load();
          },
          error: () => this.failLoad()
        });
      },
      error: () => this.failLoad()
    });
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.list({
      academicYearId: this.selectedYearId() || undefined,
      status: this.selectedStatus() || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (councils) => {
        this.councils.set(councils);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.error.set(true);
        this.explain(error);
      }
    });
  }

  changeYear(yearId: string): void {
    this.selectedYearId.set(yearId);
    this.detail.set(null);
    this.referenceSource.terms(yearId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (terms) => {
        this.terms.set(terms);
        this.load();
      },
      error: (error) => this.explain(error)
    });
  }

  changeStatus(status: CouncilStatus | ''): void {
    this.selectedStatus.set(status);
    this.load();
  }

  stateOf(status: CouncilStatus) {
    return this.states.find((state) => state.code === status) ?? this.states[0];
  }

  decisionOf(decision?: PromotionDecision) {
    return this.decisions.find((item) => item.code === (decision ?? 'PENDING_DECISION'))
      ?? this.decisions[0];
  }

  formatDate(value: string): string {
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
      .format(new Date(`${value}T12:00:00`));
  }

  openCreate(): void {
    const firstTerm = this.terms().find((term) => term.status === 'GRADE_ENTRY')
      ?? this.terms().find((term) => term.status === 'OPEN')
      ?? this.terms()[0];
    this.createForm.reset({
      classroomId: this.filteredClassrooms()[0]?.id ?? '',
      termId: firstTerm?.id ?? '',
      meetingDate: today(), startTime: '', endTime: '', location: ''
    });
    this.createOpen.set(true);
  }

  closeCreate(): void {
    this.createOpen.set(false);
  }

  submitCreate(): void {
    if (this.createForm.invalid || this.saving()) {
      return;
    }
    const value = this.createForm.getRawValue();
    this.saving.set(true);
    this.dataSource.create({
      ...value,
      startTime: value.startTime || undefined,
      endTime: value.endTime || undefined,
      location: value.location.trim() || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (council) => {
        this.saving.set(false);
        this.closeCreate();
        this.replaceSummary(council);
        this.openDetail(council);
        this.notifications.success(
          `${council.classroomName} · ${council.termName} est ajouté au calendrier.`,
          'Conseil planifié');
      },
      error: (error) => {
        this.saving.set(false);
        this.explain(error);
      }
    });
  }

  openDetail(council: CouncilSummary | Council): void {
    this.detailLoading.set(true);
    this.dataSource.get(council.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (detail) => {
        this.detailLoading.set(false);
        this.setDetail(detail);
      },
      error: (error) => {
        this.detailLoading.set(false);
        this.explain(error);
      }
    });
  }

  closeDetail(): void {
    this.detail.set(null);
    this.decisionOpen.set(false);
    this.closeConfirmOpen.set(false);
  }

  saveMeeting(): void {
    const council = this.detail();
    if (!council || !council.editable || this.meetingForm.invalid || this.saving()) {
      return;
    }
    const value = this.meetingForm.getRawValue();
    this.saving.set(true);
    this.dataSource.update(council.id, {
      ...value,
      startTime: value.startTime || undefined,
      endTime: value.endTime || undefined,
      location: value.location.trim() || undefined,
      remarks: value.remarks.trim() || undefined,
      minutesUrl: value.minutesUrl.trim() || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (updated) => {
        this.saving.set(false);
        this.setDetail(updated);
        this.replaceSummary(updated);
        this.notifications.success('Les informations pratiques sont enregistrées.');
      },
      error: (error) => {
        this.saving.set(false);
        this.explain(error);
      }
    });
  }

  startCouncil(): void {
    const council = this.detail();
    if (!council || this.saving()) return;
    this.saving.set(true);
    this.dataSource.start(council.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (updated) => {
        this.saving.set(false);
        this.setDetail(updated);
        this.replaceSummary(updated);
        this.notifications.success('Le conseil est ouvert : les décisions peuvent être consignées.');
      },
      error: (error) => {
        this.saving.set(false);
        this.explain(error);
      }
    });
  }

  askClose(): void {
    if (this.detail() && !this.saving()) this.closeConfirmOpen.set(true);
  }

  closeCouncil(): void {
    const council = this.detail();
    if (!council || this.saving()) return;
    this.saving.set(true);
    this.dataSource.close(council.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (updated) => {
        this.saving.set(false);
        this.closeConfirmOpen.set(false);
        this.setDetail(updated);
        this.replaceSummary(updated);
        this.notifications.success(
          `${this.decidedCount()} décision(s) sont désormais figées.`, 'Conseil clos');
      },
      error: (error) => {
        this.saving.set(false);
        this.explain(error);
      }
    });
  }

  addParticipant(): void {
    const council = this.detail();
    if (!council || this.participantForm.invalid || this.saving()) return;
    const value = this.participantForm.getRawValue();
    this.saving.set(true);
    this.dataSource.addParticipant(council.id, {
      teacherId: value.teacherId,
      roleLabel: value.roleLabel.trim(),
      present: value.present
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (updated) => {
        this.saving.set(false);
        this.setDetail(updated);
        this.participantForm.reset({ teacherId: '', roleLabel: 'Enseignant', present: true });
      },
      error: (error) => {
        this.saving.set(false);
        this.explain(error);
      }
    });
  }

  setPresence(participantId: string, present: boolean): void {
    const council = this.detail();
    if (!council || this.saving()) return;
    this.dataSource.setParticipantPresence(council.id, participantId, present)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (updated) => this.setDetail(updated),
        error: (error) => this.explain(error)
      });
  }

  removeParticipant(participantId: string): void {
    const council = this.detail();
    if (!council || this.saving()) return;
    this.saving.set(true);
    this.dataSource.removeParticipant(council.id, participantId)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (updated) => {
          this.saving.set(false);
          this.setDetail(updated);
        },
        error: (error) => {
          this.saving.set(false);
          this.explain(error);
        }
      });
  }

  openDecision(student: CouncilStudentDecision): void {
    if (!this.canDecide() || !this.detail()?.editable) return;
    this.deciding.set(student);
    this.decisionForm.reset({
      decision: student.decision ?? 'PASS',
      annualAverage: student.annualAverage?.toString() ?? '',
      justification: student.justification ?? '',
      orientationAdvice: student.orientationAdvice ?? ''
    });
    this.decisionOpen.set(true);
  }

  closeDecision(): void {
    this.decisionOpen.set(false);
    this.deciding.set(null);
  }

  saveDecision(): void {
    const council = this.detail();
    const student = this.deciding();
    if (!council || !student || this.decisionForm.invalid || this.saving()) return;
    const value = this.decisionForm.getRawValue();
    const annualAverage = value.annualAverage.trim() === '' ? undefined : Number(value.annualAverage);
    if (annualAverage !== undefined && (!Number.isFinite(annualAverage)
      || annualAverage < 0 || annualAverage > 20)) {
      this.notifications.error('La moyenne annuelle doit être comprise entre 0 et 20.', 'Moyenne invalide');
      return;
    }
    this.saving.set(true);
    this.dataSource.recordDecision(council.id, {
      enrollmentId: student.enrollmentId,
      decision: value.decision,
      annualAverage,
      justification: value.justification.trim() || undefined,
      orientationAdvice: value.orientationAdvice.trim() || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (updatedStudent) => {
        this.saving.set(false);
        this.detail.update((current) => current ? {
          ...current,
          students: current.students.map((item) => item.enrollmentId === updatedStudent.enrollmentId
            ? updatedStudent : item)
        } : current);
        this.closeDecision();
        this.notifications.success(`Décision enregistrée pour ${updatedStudent.studentName}.`);
      },
      error: (error) => {
        this.saving.set(false);
        this.explain(error);
      }
    });
  }

  private setDetail(detail: Council): void {
    this.detail.set(detail);
    this.meetingForm.reset({
      meetingDate: detail.meetingDate,
      startTime: detail.startTime ?? '',
      endTime: detail.endTime ?? '',
      location: detail.location ?? '',
      remarks: detail.remarks ?? '',
      minutesUrl: detail.minutesUrl ?? ''
    });
  }

  private replaceSummary(council: Council): void {
    const summary: CouncilSummary = {
      id: council.id, classroomId: council.classroomId, classroomName: council.classroomName,
      termId: council.termId, termName: council.termName, academicYearId: council.academicYearId,
      meetingDate: council.meetingDate, status: council.status,
      classAverage: council.classAverage, successRate: council.successRate
    };
    this.councils.update((items) => {
      const found = items.some((item) => item.id === council.id);
      const next = found ? items.map((item) => item.id === council.id ? summary : item) : [summary, ...items];
      return next.sort((a, b) => b.meetingDate.localeCompare(a.meetingDate));
    });
  }

  private failLoad(): void {
    this.loading.set(false);
    this.error.set(true);
  }

  private explain(err: unknown): void {
    const apiError = (err as { error?: { code?: string; message?: string } })?.error;
    if (apiError?.code) {
      this.notifications.error(translateErrorCode(apiError.code), 'Action refusée');
      return;
    }
    const code = (err as { message?: string })?.message;
    this.notifications.error(code && /^[A-Z_]+$/.test(code)
      ? translateErrorCode(code) : 'Une erreur est survenue. Réessayez.', 'Action refusée');
  }
}

function today(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}
