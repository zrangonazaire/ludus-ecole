import {
  ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { HEALTH_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { AuthService } from '@core/auth/auth.service';
import { PERMISSIONS } from '@core/models/auth.models';
import { StudentSummary } from '@core/models/domain.models';
import {
  ExaminationKind, ExaminationOutcome, HealthBoard, HealthConditionKind, HealthRecord,
  HealthSeverity, InfirmaryOutcome, InfirmaryVisit, MedicalExamination
} from '@core/models/health.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';

export type HealthTab = 'INFIRMERIE' | 'FICHES' | 'SUIVI';

interface HelpCopy {
  step: number;
  title: string;
  description: string;
  points: readonly string[];
  ctaLabel: string;
}

interface Choice<T> {
  value: T;
  label: string;
}

/**
 * School health: the infirmary, the files, the follow-up.
 *
 * <p>The screen has two shapes and the server decides which. A caller without
 * HEALTH_RECORD_VIEW receives only the alerts — the medical detail was never
 * sent, so there is nothing here to hide. That is deliberate: a confidentiality
 * rule enforced by a client is not a rule, it is a suggestion that anyone can
 * read past by opening their own browser's network tab.</p>
 *
 * <p>What supervising staff do get is the label and the action to take. A
 * teacher on a field trip who does not know a pupil carries an adrenaline pen
 * cannot use it, and secrecy that costs a child their life is not privacy.</p>
 */
@Component({
  selector: 'eduops-health',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './health.component.html',
  styleUrl: './health.component.scss'
})
export class HealthComponent implements OnInit {
  private readonly dataSource = inject(HEALTH_DATA_SOURCE);
  private readonly students = inject(STUDENT_DATA_SOURCE);
  private readonly auth = inject(AuthService);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly totalSteps = 3;

  readonly tab = signal<HealthTab>('INFIRMERIE');
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);

  readonly board = signal<HealthBoard | null>(null);
  readonly search = signal('');
  readonly studentList = signal<StudentSummary[]>([]);
  readonly vaccineList = signal<{ id: string; code: string; label: string;
                                  required: boolean; dosesExpected: number }[]>([]);

  readonly visitOpen = signal(false);
  readonly conditionOpen = signal(false);
  readonly examOpen = signal(false);
  /** La fiche ouverte en détail ; nulle quand le panneau est fermé. */
  readonly reviewing = signal<HealthRecord | null>(null);
  readonly resulting = signal<MedicalExamination | null>(null);

  readonly severities: Choice<HealthSeverity>[] = [
    { value: 'LOW', label: 'Pour information' },
    { value: 'MODERATE', label: 'À connaître' },
    { value: 'HIGH', label: 'Alerte — signalée aux encadrants' },
    { value: 'CRITICAL', label: 'Alerte vitale — signalée aux encadrants' }
  ];

  readonly kinds: Choice<HealthConditionKind>[] = [
    { value: 'ALLERGY', label: 'Allergie' },
    { value: 'CHRONIC_ILLNESS', label: 'Maladie chronique' },
    { value: 'TREATMENT', label: 'Traitement en cours' },
    { value: 'DISABILITY', label: 'Situation de handicap' },
    { value: 'DIETARY', label: 'Régime alimentaire' },
    { value: 'OTHER', label: 'Autre' }
  ];

  readonly outcomes: Choice<InfirmaryOutcome>[] = [
    { value: 'BACK_TO_CLASS', label: 'Reparti en cours' },
    { value: 'RESTED', label: 'Gardé en observation' },
    { value: 'SENT_HOME', label: 'Confié à la famille' },
    { value: 'REFERRED', label: 'Orienté vers un centre de santé' },
    { value: 'EMERGENCY', label: 'Évacuation en urgence' }
  ];

  readonly examKinds: Choice<ExaminationKind>[] = [
    { value: 'ENTRY', label: "Visite d'admission" },
    { value: 'ANNUAL', label: 'Visite annuelle' },
    { value: 'SPORT', label: 'Aptitude au sport' },
    { value: 'VISION', label: 'Dépistage visuel' },
    { value: 'HEARING', label: 'Dépistage auditif' },
    { value: 'DENTAL', label: 'Dépistage dentaire' }
  ];

  readonly examOutcomes: Choice<ExaminationOutcome>[] = [
    { value: 'FIT', label: 'Apte' },
    { value: 'FIT_WITH_RESERVE', label: 'Apte avec réserve' },
    { value: 'UNFIT', label: 'Inapte' },
    { value: 'REFERRED', label: 'Orienté vers un spécialiste' },
    { value: 'MISSED', label: 'Ne s\'est pas présenté' }
  ];

  readonly visitForm = this.fb.nonNullable.group({
    studentId: ['', [Validators.required]],
    complaint: ['', [Validators.required, Validators.maxLength(200)]],
    careGiven: ['', [Validators.required]],
    temperatureCelsius: [null as number | null],
    outcome: ['BACK_TO_CLASS' as InfirmaryOutcome, [Validators.required]],
    guardianNotified: [false],
    referredTo: [''],
    notes: ['']
  });

  readonly conditionForm = this.fb.nonNullable.group({
    studentId: ['', [Validators.required]],
    kind: ['ALLERGY' as HealthConditionKind, [Validators.required]],
    label: ['', [Validators.required, Validators.maxLength(160)]],
    severity: ['MODERATE' as HealthSeverity, [Validators.required]],
    description: [''],
    actionToTake: [''],
    medication: [''],
    selfCarried: [false]
  });

  readonly examForm = this.fb.nonNullable.group({
    studentId: ['', [Validators.required]],
    kind: ['ANNUAL' as ExaminationKind, [Validators.required]],
    scheduledOn: ['', [Validators.required]],
    practitioner: ['']
  });

  readonly resultForm = this.fb.nonNullable.group({
    outcome: ['FIT' as ExaminationOutcome, [Validators.required]],
    performedOn: [''],
    restriction: [''],
    notes: ['']
  });

  /**
   * Vrai quand l'appelant reçoit le dossier complet.
   *
   * <p>Lu sur la réponse du serveur, pas sur le jeton local : c'est le serveur
   * qui décide, l'écran ne fait que constater ce qu'il a reçu.</p>
   */
  readonly fullAccess = computed(() => this.board()?.fullAccess ?? false);

  /** Le droit d'écrire, distinct de celui de lire. */
  readonly canManage = computed(() => this.auth.has(PERMISSIONS.HEALTH_RECORD_MANAGE));
  readonly canRecordVisit = computed(() => this.auth.has(PERMISSIONS.HEALTH_VISIT_RECORD));

  readonly alerts = computed(() => this.board()?.alerts ?? []);
  readonly records = computed(() => this.board()?.records ?? []);
  readonly visits = computed(() => this.board()?.visits ?? []);
  readonly examinations = computed(() => this.board()?.examinations ?? []);

  /** Les passages du jour restés sans appel à la famille. */
  readonly awaitingGuardian = computed(() =>
    this.visits().filter((visit) => visit.awaitingGuardian));

  /** Les fiches auxquelles il manque une pièce : autorisation ou vaccin. */
  readonly incompleteRecords = computed(() =>
    this.records().filter((record) => !record.careConsent || record.missingVaccineCount > 0));

  readonly overdueExams = computed(() =>
    this.examinations().filter((examination) => examination.overdue));

  /** Vrai quand la gravité choisie fait de la condition une alerte. */
  readonly severityIsAlert = computed(() => {
    const value = this.conditionForm.controls.severity.value;
    return value === 'HIGH' || value === 'CRITICAL';
  });

  private readonly help: Record<HealthTab, HelpCopy> = {
    INFIRMERIE: {
      step: 1,
      title: "Le registre de l'infirmerie",
      description: "Chaque passage se consigne ici : ce dont l'élève s'est "
        + "plaint, ce qui a été fait, et comment cela s'est terminé.",
      points: [
        "Écrivez les soins donnés, même minimes. Un registre vide ne prouve "
          + "rien le jour où une famille demande des comptes.",
        "Un élève confié à sa famille ou évacué ne peut pas être enregistré "
          + "tant que la famille n'a pas été jointe.",
        "Une orientation demande le nom du centre : sans lui, personne ne sait "
          + "où l'élève a été conduit."
      ],
      ctaLabel: "J'ai compris"
    },
    FICHES: {
      step: 2,
      title: 'Les fiches de santé',
      description: "La fiche suit l'enfant d'une année à l'autre. Les allergies "
        + 'ne disparaissent pas à la rentrée.',
      points: [
        "Classer une condition en « Alerte » la rend visible du personnel "
          + "encadrant — avec la conduite à tenir, jamais le diagnostic.",
        "C'est pourquoi une alerte sans conduite à tenir est refusée : "
          + "prévenir d'un danger sans dire quoi faire n'aide personne.",
        "L'autorisation écrite des parents conditionne les premiers soins. "
          + "Sans elle, l'infirmerie ne peut qu'appeler la famille."
      ],
      ctaLabel: 'Continuer'
    },
    SUIVI: {
      step: 3,
      title: 'Vaccins et visites médicales',
      description: 'Ce qui manque au dossier, et ce qu\'il faut demander aux '
        + 'familles avant la fin du trimestre.',
      points: [
        "Un vaccin exigé mais sans preuve est signalé et relancé. Il ne bloque "
          + "jamais la scolarité : l'enfant n'y est pour rien.",
        "Cochez « carnet vu » seulement quand le carnet a été présenté. Une "
          + "déclaration orale de la famille n'est pas une preuve.",
        "Une aptitude sous réserve doit dire laquelle, sinon le professeur "
          + "d'éducation physique ne sait pas quoi aménager."
      ],
      ctaLabel: 'Terminer'
    }
  };

  readonly helpCopy = computed<HelpCopy>(() => this.help[this.tab()]);

  // ----------------------------------------------------------------- cycle

  ngOnInit(): void {
    forkJoin({
      students: this.students.search({ page: 0, size: 500 }),
      vaccines: this.dataSource.vaccines()
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.studentList.set(data.students.content);
        this.vaccineList.set(data.vaccines);
      },
      // Les listes de choix manquantes ne doivent pas vider l'écran.
      error: () => undefined
    });
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.board(this.search() || undefined)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (board) => {
          this.board.set(board);
          // Un appelant qui ne reçoit que les alertes n'a rien à faire sur les
          // deux autres onglets : ils seraient vides sans expliquer pourquoi.
          if (!board.fullAccess) {
            this.tab.set('INFIRMERIE');
          }
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(false);
          this.board.set({
            academicYearId: '',
            academicYearCode: '',
            fullAccess: false,
            alerts: [],
            records: [],
            visits: [],
            examinations: [],
            alertCount: 0,
            visitCountThisWeek: 0,
            awaitingGuardianCount: 0,
            missingVaccineCount: 0,
            missingConsentCount: 0,
            overdueExaminationCount: 0
          });
          this.notifications.error(
            translateErrorCode(err?.error?.code ?? 'UNKNOWN'),
            'Santé scolaire indisponible');
        }
      });
  }

  changeTab(tab: HealthTab): void {
    this.tab.set(tab);
  }

  applySearch(value: string): void {
    this.search.set(value);
    this.load();
  }

  // ------------------------------------------------------------- passages

  openVisit(studentId?: string): void {
    this.visitForm.reset({
      studentId: studentId ?? '',
      complaint: '',
      careGiven: '',
      temperatureCelsius: null,
      outcome: 'BACK_TO_CLASS',
      guardianNotified: false,
      referredTo: '',
      notes: ''
    });
    this.visitOpen.set(true);
  }

  closeVisit(): void {
    this.visitOpen.set(false);
  }

  /** Vrai quand l'issue choisie exige que la famille ait été jointe. */
  visitNeedsGuardian(): boolean {
    const outcome = this.visitForm.controls.outcome.value;
    return outcome === 'SENT_HOME' || outcome === 'EMERGENCY';
  }

  visitNeedsReferral(): boolean {
    const outcome = this.visitForm.controls.outcome.value;
    return outcome === 'REFERRED' || outcome === 'EMERGENCY';
  }

  submitVisit(): void {
    if (this.visitForm.invalid || this.saving()) {
      this.visitForm.markAllAsTouched();
      return;
    }
    const value = this.visitForm.getRawValue();
    this.saving.set(true);
    this.dataSource.recordVisit({
      studentId: value.studentId,
      complaint: value.complaint,
      careGiven: value.careGiven,
      temperatureCelsius: value.temperatureCelsius ?? undefined,
      outcome: value.outcome,
      guardianNotified: value.guardianNotified,
      referredTo: value.referredTo || undefined,
      notes: value.notes || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.saving.set(false);
        this.visitOpen.set(false);
        this.notifications.success('Passage consigné au registre.');
        this.load();
      },
      error: (err) => this.fail(err)
    });
  }

  markNotified(visit: InfirmaryVisit): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.notifyGuardian(visit.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.notifications.success(`Famille de ${visit.studentName} notée comme jointe.`);
          this.load();
        },
        error: (err) => this.fail(err)
      });
  }

  // ------------------------------------------------------------- conditions

  openCondition(studentId?: string): void {
    this.conditionForm.reset({
      studentId: studentId ?? '',
      kind: 'ALLERGY',
      label: '',
      severity: 'MODERATE',
      description: '',
      actionToTake: '',
      medication: '',
      selfCarried: false
    });
    this.conditionOpen.set(true);
  }

  closeCondition(): void {
    this.conditionOpen.set(false);
  }

  submitCondition(): void {
    if (this.conditionForm.invalid || this.saving()) {
      this.conditionForm.markAllAsTouched();
      return;
    }
    const value = this.conditionForm.getRawValue();
    // Le serveur refuse une alerte sans conduite à tenir ; on le dit ici pour
    // ne pas faire perdre un aller-retour, mais c'est bien lui qui tranche.
    if ((value.severity === 'HIGH' || value.severity === 'CRITICAL')
      && !value.actionToTake.trim()) {
      this.notifications.error(translateErrorCode('HEALTH_ACTION_REQUIRED'));
      return;
    }
    this.saving.set(true);
    this.dataSource.addCondition({
      studentId: value.studentId,
      kind: value.kind,
      label: value.label,
      severity: value.severity,
      description: value.description || undefined,
      actionToTake: value.actionToTake || undefined,
      medication: value.medication || undefined,
      selfCarried: value.selfCarried
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.saving.set(false);
        this.conditionOpen.set(false);
        this.notifications.success('Condition portée à la fiche.');
        this.load();
      },
      error: (err) => this.fail(err)
    });
  }

  resolveCondition(conditionId: string): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.resolveCondition(conditionId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.notifications.success('Condition close ; elle reste au dossier.');
          this.load();
        },
        error: (err) => this.fail(err)
      });
  }

  // ------------------------------------------------------------------ fiches

  review(record: HealthRecord): void {
    this.reviewing.set(record);
  }

  closeReview(): void {
    this.reviewing.set(null);
  }

  toggleConsent(record: HealthRecord): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.saveRecord({
      studentId: record.studentId,
      bloodGroup: record.bloodGroup,
      physicianName: record.physicianName,
      physicianPhone: record.physicianPhone,
      insuranceName: record.insuranceName,
      insuranceNumber: record.insuranceNumber,
      notes: record.notes,
      careConsent: !record.careConsent
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (saved) => {
        this.saving.set(false);
        this.reviewing.set(saved);
        this.notifications.success(saved.careConsent
          ? 'Autorisation de soins enregistrée.'
          : 'Autorisation de soins retirée.');
        this.load();
      },
      error: (err) => this.fail(err)
    });
  }

  markCertificateSeen(record: HealthRecord, vaccineId: string,
                      dosesExpected: number): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.saveVaccination({
      studentId: record.studentId,
      vaccineId,
      dosesReceived: dosesExpected,
      certificateSeen: true,
      lastDoseOn: new Date().toISOString().slice(0, 10)
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.saving.set(false);
        this.notifications.success('Carnet vu, vaccin porté au dossier.');
        this.dataSource.record(record.studentId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({ next: (fresh) => this.reviewing.set(fresh), error: () => undefined });
        this.load();
      },
      error: (err) => this.fail(err)
    });
  }

  // ---------------------------------------------------------------- visites

  openExam(): void {
    this.examForm.reset({
      studentId: '', kind: 'ANNUAL',
      scheduledOn: new Date().toISOString().slice(0, 10), practitioner: ''
    });
    this.examOpen.set(true);
  }

  closeExam(): void {
    this.examOpen.set(false);
  }

  submitExam(): void {
    if (this.examForm.invalid || this.saving()) {
      this.examForm.markAllAsTouched();
      return;
    }
    const value = this.examForm.getRawValue();
    this.saving.set(true);
    this.dataSource.planExamination({
      studentId: value.studentId,
      kind: value.kind,
      scheduledOn: value.scheduledOn,
      practitioner: value.practitioner || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.saving.set(false);
        this.examOpen.set(false);
        this.notifications.success('Visite programmée.');
        this.load();
      },
      error: (err) => this.fail(err)
    });
  }

  openResult(examination: MedicalExamination): void {
    this.resultForm.reset({
      outcome: 'FIT',
      performedOn: new Date().toISOString().slice(0, 10),
      restriction: '',
      notes: ''
    });
    this.resulting.set(examination);
  }

  closeResult(): void {
    this.resulting.set(null);
  }

  /** Vrai quand le résultat choisi exige d'écrire la réserve. */
  resultNeedsRestriction(): boolean {
    return this.resultForm.controls.outcome.value === 'FIT_WITH_RESERVE';
  }

  submitResult(): void {
    const examination = this.resulting();
    if (!examination || this.resultForm.invalid || this.saving()) {
      return;
    }
    const value = this.resultForm.getRawValue();
    if (value.outcome === 'FIT_WITH_RESERVE' && !value.restriction.trim()) {
      this.notifications.error(translateErrorCode('EXAMINATION_RESTRICTION_REQUIRED'));
      return;
    }
    this.saving.set(true);
    this.dataSource.recordExamination(examination.id, {
      outcome: value.outcome,
      performedOn: value.performedOn || undefined,
      restriction: value.restriction || undefined,
      notes: value.notes || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.saving.set(false);
        this.resulting.set(null);
        this.notifications.success('Résultat consigné.');
        this.load();
      },
      error: (err) => this.fail(err)
    });
  }

  // ---------------------------------------------------------------- outils

  studentName(studentId: string): string {
    return this.studentList().find((student) => student.id === studentId)?.fullName ?? '';
  }

  /** Le ton d'une gravité, pour la pastille de couleur. */
  severityTone(severity: HealthSeverity): string {
    switch (severity) {
      case 'CRITICAL': return 'critical';
      case 'HIGH': return 'high';
      case 'MODERATE': return 'moderate';
      default: return 'low';
    }
  }

  outcomeTone(outcome: InfirmaryOutcome): string {
    switch (outcome) {
      case 'EMERGENCY': return 'critical';
      case 'REFERRED': return 'high';
      case 'SENT_HOME': return 'moderate';
      default: return 'low';
    }
  }

  examTone(outcome: ExaminationOutcome): string {
    switch (outcome) {
      case 'UNFIT': return 'critical';
      case 'MISSED':
      case 'REFERRED': return 'high';
      case 'FIT_WITH_RESERVE': return 'moderate';
      case 'PENDING': return 'todo';
      default: return 'low';
    }
  }

  private fail(err: unknown): void {
    this.saving.set(false);
    const code = (err as { error?: { code?: string } })?.error?.code
      ?? (err as { message?: string })?.message
      ?? 'UNKNOWN';
    this.notifications.error(translateErrorCode(code));
  }
}
