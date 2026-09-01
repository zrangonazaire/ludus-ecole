import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, forkJoin } from 'rxjs';
import {
  CLASSROOM_DATA_SOURCE, CURRICULUM_DATA_SOURCE, GRADE_DATA_SOURCE, TEACHER_DATA_SOURCE
} from '@core/datasource/data-source';
import {
  ASSESSMENT_STATES, ASSESSMENT_TYPES, AssessmentBoard, AssessmentItem, AssessmentStatus,
  AssessmentTypeCode, GradeImportPreview, GradeRow, GradeSheet
} from '@core/models/assessment.models';
import { GradeSheetFileService } from '@core/services/grade-sheet-file.service';
import { Classroom, Teacher } from '@core/models/domain.models';
import { SubjectItem } from '@core/models/curriculum.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';

/** The three moments of an assessment, in the order responsibility moves. */
export type AssessmentTab = 'PLANNING' | 'CORRECTION' | 'VALIDATION';

/** Wording of the coachmark shown once per tab, exactly as in the setup flow. */
interface HelpCopy {
  step: number;
  title: string;
  description: string;
  points: readonly string[];
  ctaLabel: string;
}

/**
 * Assessments: planning the papers, entering the marks, validating them.
 *
 * <p>One screen for three moments because they are one chain, and each link is
 * a different person's responsibility. A paper announced by the office is sat,
 * corrected by the teacher, handed back, re-read, and only then shown to the
 * families. Splitting that across three screens is how schools end up with a
 * term's worth of marks that nobody ever validated.</p>
 *
 * <p>The help works like the one in the configuration: a card appears by itself
 * the first time a tab is opened, and the « ? Aide » button brings it back. The
 * things worth saying here are not obvious — why an empty mark is not a zero,
 * why the scale freezes after the first mark, why a published mark cannot be
 * changed silently.</p>
 */
@Component({
  selector: 'eduops-assessments',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './assessments.component.html',
  styleUrl: './assessments.component.scss'
})
export class AssessmentsComponent implements OnInit {
  private readonly dataSource = inject(GRADE_DATA_SOURCE);
  private readonly classrooms = inject(CLASSROOM_DATA_SOURCE);
  private readonly curriculum = inject(CURRICULUM_DATA_SOURCE);
  private readonly teachers = inject(TEACHER_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly files = inject(GradeSheetFileService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);

  /**
   * The component is also the grade-book entry point. Keeping both URLs on the
   * same workflow prevents a mark from having one lifecycle in Assessments and
   * another in Grades.
   */
  readonly gradesEntryPoint = this.route.snapshot.data['initialTab'] === 'CORRECTION';
  readonly pageTitle = this.gradesEntryPoint ? 'Notes' : 'Évaluations';

  readonly types = ASSESSMENT_TYPES;
  readonly states = ASSESSMENT_STATES;
  readonly totalSteps = 3;

  readonly tab = signal<AssessmentTab>(this.gradesEntryPoint ? 'CORRECTION' : 'PLANNING');
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);

  readonly board = signal<AssessmentBoard | null>(null);
  readonly classroomList = signal<Classroom[]>([]);
  readonly subjectList = signal<SubjectItem[]>([]);
  readonly teacherList = signal<Teacher[]>([]);

  readonly classroomFilter = signal('');
  readonly subjectFilter = signal('');

  /** Le devoir en cours de création ou de modification ; nul si le panneau est fermé. */
  readonly editing = signal<AssessmentItem | null>(null);
  readonly formOpen = signal(false);

  /** La feuille de notes ouverte ; nulle si le panneau est fermé. */
  readonly sheet = signal<GradeSheet | null>(null);
  readonly sheetDirty = signal(false);

  /** La note dont on saisit la correction justifiée. */
  readonly correcting = signal<GradeRow | null>(null);

  /** L'aperçu du fichier rendu ; nul tant qu'aucun fichier n'a été déposé. */
  readonly importPreview = signal<GradeImportPreview | null>(null);
  readonly analysing = signal(false);

  readonly assessmentForm = this.fb.nonNullable.group({
    classroomId: ['', [Validators.required]],
    subjectId: ['', [Validators.required]],
    teacherId: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(200)]],
    assessmentType: ['TEST' as AssessmentTypeCode, [Validators.required]],
    assessmentDate: ['', [Validators.required]],
    durationMinutes: [120, [Validators.min(1), Validators.max(600)]],
    maxScore: [20, [Validators.required, Validators.min(0.001), Validators.max(1000)]],
    coefficient: [2, [Validators.required, Validators.min(0.001), Validators.max(100)]],
    countsForAverage: [true]
  });

  readonly correctionForm = this.fb.nonNullable.group({
    score: [0, [Validators.min(0)]],
    absent: [false],
    justification: ['', [Validators.required, Validators.maxLength(500)]]
  });

  // ------------------------------------------------------------------ aide

  private readonly help: Record<AssessmentTab, HelpCopy> = {
    PLANNING: {
      step: 1,
      title: 'Un devoir se déclare avant d\'être corrigé',
      description: "Chaque devoir porte une classe, une matière, un enseignant et un "
        + "barème. Ces quatre-là décident où la note ira : dans quelle moyenne, avec "
        + 'quel poids, dans quel bulletin.',
      points: [
        "Une date hors de la période est refusée : la note irait dans le mauvais "
        + "bulletin, et rien en aval ne s'en apercevrait.",
        'Une matière absente du programme du niveau est refusée : sans coefficient, '
        + "la note n'entrerait dans aucune moyenne.",
        'Le barème se fige dès la première note saisie. Le changer après coup ferait '
        + 'bouger toutes les notes déjà entrées sans que personne y touche.'
      ],
      ctaLabel: 'Planifier un devoir'
    },
    CORRECTION: {
      step: 2,
      title: 'La saisie se fait copie par copie, et se garde',
      description: 'Enregistrer n\'est pas soumettre. Une correction étalée sur une '
        + 'soirée survit à un navigateur fermé, et rien de ce qui est encore en cours '
        + 'de saisie n\'apparaît comme définitif au secrétariat.',
      points: [
        "Une case vide n'est pas un zéro : un zéro se saisit. Un élève qui n'a pas "
        + 'composé se marque absent — sa note ne compte pas, elle n\'est pas comptée '
        + 'zéro.',
        'Un devoir ne peut pas être soumis tant qu\'un élève n\'a ni note ni absence. '
        + 'Une note manquante ne se voit pas dans une moyenne : l\'élève pèse '
        + 'simplement moins, en silence.',
        'La feuille s\'exporte en classeur Excel, se remplit hors ligne, et revient '
        + 'par « Importer ». Le rapprochement se fait sur le matricule, jamais sur '
        + 'l\'ordre des lignes : trier par note avant de rendre le fichier ne casse rien.',
        'Un import montre d\'abord ce qu\'il changerait, ligne par ligne, avec '
        + 'l\'ancienne note à côté de la nouvelle. Rien n\'est écrit avant votre accord.'
      ],
      ctaLabel: 'Voir les corrections'
    },
    VALIDATION: {
      step: 3,
      title: 'Relire avant que les familles voient',
      description: 'Les notes soumises attendent votre relecture. La distribution est '
        + 'affichée avec elles : moyenne, médiane, extrêmes, nombre d\'élèves ayant '
        + 'la moyenne.',
      points: [
        'Une copie où les deux tiers de la classe sont sous 5 est rarement une '
        + 'mauvaise classe : c\'est le plus souvent un sujet trop dur ou un barème mal '
        + 'saisi. Cela se voit avant la publication, pas après.',
        'Valider fait entrer les notes dans les moyennes. Publier les montre aux '
        + 'familles. Les deux gestes sont séparés parce qu\'ils n\'engagent pas la '
        + 'même chose.',
        'Après publication, toute correction exige un motif écrit, conservé avec '
        + 'l\'ancienne valeur. Sans cette trace, une note corrigée et une note '
        + 'trafiquée se ressemblent.'
      ],
      ctaLabel: 'Relire les notes'
    }
  };

  readonly helpCopy = computed<HelpCopy>(() => this.help[this.tab()]);

  // --------------------------------------------------------------- cycle

  ngOnInit(): void {
    this.loadReferences();
    this.load();
  }

  changeTab(tab: AssessmentTab): void {
    this.tab.set(tab);
    this.closeSheet();
    this.closeForm();
  }

  private loadReferences(): void {
    forkJoin({
      classrooms: this.classrooms.list(),
      subjects: this.curriculum.listSubjects(),
      teachers: this.teachers.search({ page: 0, size: 200 })
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.classroomList.set(data.classrooms);
        this.subjectList.set(data.subjects.filter((s) => s.status === 'ACTIVE'));
        this.teacherList.set(data.teachers.content);
      },
      // Les listes de choix manquantes ne doivent pas vider le tableau.
      error: () => undefined
    });
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.board({
      classroomId: this.classroomFilter() || undefined,
      subjectId: this.subjectFilter() || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (board) => {
        this.board.set(board);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(true);
        this.explain(err);
      }
    });
  }

  changeClassroom(classroomId: string): void {
    this.classroomFilter.set(classroomId);
    this.load();
  }

  changeSubject(subjectId: string): void {
    this.subjectFilter.set(subjectId);
    this.load();
  }

  // ------------------------------------------------------------- les vues

  /** Ce que montre l'onglet courant. Les compteurs, eux, ne bougent jamais. */
  readonly visible = computed<AssessmentItem[]>(() => {
    const all = this.board()?.assessments ?? [];
    switch (this.tab()) {
      case 'CORRECTION':
        return all.filter((a) => a.status === 'OPEN' || a.status === 'GRADING'
          || a.status === 'PLANNED');
      case 'VALIDATION':
        return all.filter((a) => a.status === 'SUBMITTED' || a.status === 'VALIDATED');
      default:
        return all;
    }
  });

  /** Copies passées depuis plus d'une semaine sans une seule note saisie. */
  readonly overdue = computed<AssessmentItem[]>(() => {
    const today = isoToday();
    return (this.board()?.assessments ?? []).filter((a) =>
      (a.status === 'OPEN' || a.status === 'GRADING')
      && a.gradedCount === 0
      && daysBetween(a.assessmentDate, today) >= 7);
  });

  stateOf(status: AssessmentStatus) {
    return this.states.find((s) => s.code === status) ?? this.states[0];
  }

  progressOf(item: AssessmentItem): number {
    return item.studentCount > 0
      ? Math.round((item.gradedCount * 100) / item.studentCount)
      : 0;
  }

  // -------------------------------------------------------- le formulaire

  openForm(item?: AssessmentItem): void {
    this.editing.set(item ?? null);
    this.assessmentForm.reset({
      classroomId: item?.classroomId ?? this.classroomFilter() ?? '',
      subjectId: item?.subjectId ?? '',
      teacherId: item?.teacherId ?? '',
      title: item?.title ?? '',
      assessmentType: item?.assessmentType ?? 'TEST',
      assessmentDate: item?.assessmentDate ?? isoToday(),
      durationMinutes: item?.durationMinutes ?? 120,
      maxScore: item?.maxScore ?? 20,
      coefficient: item?.coefficient ?? 2,
      countsForAverage: item?.countsForAverage ?? true
    });
    this.formOpen.set(true);
  }

  closeForm(): void {
    this.formOpen.set(false);
    this.editing.set(null);
  }

  /** Le barème est verrouillé dès qu'une note existe : le champ le dit. */
  readonly scaleLocked = computed(() => {
    const item = this.editing();
    return item !== null && item.gradedCount > 0;
  });

  submitForm(): void {
    if (this.assessmentForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.assessmentForm.getRawValue();
    const payload = {
      classroomId: value.classroomId,
      subjectId: value.subjectId,
      teacherId: value.teacherId,
      title: value.title.trim(),
      assessmentType: value.assessmentType,
      assessmentDate: value.assessmentDate,
      durationMinutes: value.durationMinutes || undefined,
      maxScore: value.maxScore,
      coefficient: value.coefficient,
      countsForAverage: value.countsForAverage
    };
    const item = this.editing();
    const request = item
      ? this.dataSource.updateAssessment(item.id, payload)
      : this.dataSource.createAssessment(payload);

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (saved) => {
        this.saving.set(false);
        this.closeForm();
        this.load();
        this.notifications.success(
          item
            ? `${saved.title} est à jour.`
            : `${saved.title} est annoncé en ${saved.classroomName} pour le `
              + `${formatDay(saved.assessmentDate)}.`,
          item ? 'Devoir modifié' : 'Devoir planifié');
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  // -------------------------------------------------------- le cycle de vie

  advance(item: AssessmentItem, target: AssessmentStatus, message: string): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.changeStatus(item.id, target)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.load();
          this.notifications.success(message, item.title);
        },
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  openEntry(item: AssessmentItem): void {
    this.advance(item, 'OPEN',
      'La saisie est ouverte : la feuille contient la liste réelle des inscrits.');
  }

  cancel(item: AssessmentItem): void {
    this.advance(item, 'CANCELLED',
      "Le devoir est annulé. Il ne compte nulle part et n'apparaît plus dans le tableau.");
  }

  // ------------------------------------------------------ la feuille de notes

  openSheet(item: AssessmentItem): void {
    this.sheetDirty.set(false);
    this.dataSource.gradeSheet(item.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (sheet) => this.sheet.set(sheet),
        error: (err) => this.explain(err)
      });
  }

  closeSheet(): void {
    this.sheet.set(null);
    this.sheetDirty.set(false);
    this.correcting.set(null);
    this.importPreview.set(null);
  }

  setScore(studentId: string, raw: string): void {
    const sheet = this.sheet();
    if (!sheet) {
      return;
    }
    const trimmed = raw.trim();
    // Une case vidée n'est pas un zéro : elle redevient « pas encore corrigé ».
    const score = trimmed === '' ? undefined : Number(trimmed.replace(',', '.'));
    if (score !== undefined && (!Number.isFinite(score) || score < 0
        || score > sheet.assessment.maxScore)) {
      this.notifications.error(
        `La note doit être comprise entre 0 et ${sheet.assessment.maxScore}.`,
        'Note hors barème');
      return;
    }
    this.patchRow(studentId, { score, absent: false });
  }

  /** Marquer absent efface la note : une absence n'est pas un zéro. */
  toggleAbsent(studentId: string, absent: boolean): void {
    this.patchRow(studentId, { absent, score: undefined });
  }

  toggleExempted(studentId: string, exempted: boolean): void {
    this.patchRow(studentId, { exempted, score: undefined });
  }

  private patchRow(studentId: string, patch: Partial<GradeRow>): void {
    this.sheetDirty.set(true);
    this.sheet.update((current) => current === null ? current : {
      ...current,
      rows: current.rows.map((row) => row.studentId === studentId
        ? { ...row, ...patch }
        : row)
    });
  }

  /** Le compte de la feuille ouverte, recalculé à chaque saisie. */
  readonly sheetCounters = computed(() => {
    const sheet = this.sheet();
    const rows = sheet?.rows ?? [];
    const scored = rows.filter((r) => !r.absent && !r.exempted && r.score !== undefined);
    const scores = scored.map((r) => r.score as number);
    const half = (sheet?.assessment.maxScore ?? 20) / 2;
    return {
      total: rows.length,
      scored: scored.length,
      absent: rows.filter((r) => r.absent).length,
      exempted: rows.filter((r) => r.exempted).length,
      missing: rows.filter((r) => !r.absent && !r.exempted && r.score === undefined).length,
      passed: scores.filter((s) => s >= half).length,
      average: scores.length > 0
        ? Math.round((scores.reduce((sum, s) => sum + s, 0) / scores.length) * 100) / 100
        : undefined
    };
  });

  saveSheet(): void {
    const sheet = this.sheet();
    if (!sheet || this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.saveGrades(sheet.assessment.id, sheet.rows.map((row) => ({
      studentId: row.studentId,
      score: row.score,
      absent: row.absent,
      exempted: row.exempted,
      comment: row.comment
    }))).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (saved) => {
        this.sheet.set(saved);
        this.sheetDirty.set(false);
        this.saving.set(false);
        this.load();
        this.notifications.success(
          `${this.sheetCounters().scored} note(s) enregistrée(s). Rien n'est encore `
          + 'transmis : la correction peut reprendre plus tard.',
          'Notes enregistrées');
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  submitSheet(): void {
    const sheet = this.sheet();
    if (!sheet || this.saving()) {
      return;
    }
    if (this.sheetCounters().missing > 0) {
      this.notifications.error(
        `${this.sheetCounters().missing} élève(s) n'ont ni note ni absence. Une note `
        + "manquante ne se voit pas dans une moyenne : l'élève pèse simplement moins.",
        'Feuille incomplète');
      return;
    }
    this.runOnSheet(() => this.dataSource.submitGrades(sheet.assessment.id),
      'Notes transmises. Elles attendent la relecture de l\'administration.');
  }

  validateSheet(): void {
    const sheet = this.sheet();
    if (!sheet) {
      return;
    }
    this.runOnSheet(() => this.dataSource.validateGrades(sheet.assessment.id),
      'Notes validées : elles comptent désormais dans les moyennes. Les familles ne '
      + 'les voient pas encore.');
  }

  publishSheet(): void {
    const sheet = this.sheet();
    if (!sheet) {
      return;
    }
    this.runOnSheet(() => this.dataSource.publishGrades(sheet.assessment.id),
      'Notes publiées. Toute correction exigera désormais un motif écrit.');
  }

  private runOnSheet(action: () => Observable<GradeSheet>, message: string): void {
    this.saving.set(true);
    action().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (saved) => {
        this.sheet.set(saved);
        this.sheetDirty.set(false);
        this.saving.set(false);
        this.load();
        this.notifications.success(message, saved.assessment.title);
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  // ------------------------------------------------ export et import

  /** Le classeur part avec la classe déjà remplie : rien à recopier. */
  exportSheet(): void {
    const sheet = this.sheet();
    if (!sheet) {
      return;
    }
    this.files.export(sheet);
    this.notifications.success(
      'Le classeur est téléchargé. Les notes se saisissent hors ligne, puis le '
      + 'fichier revient ici par « Importer ».',
      'Feuille exportée');
  }

  /**
   * Lit le fichier rendu et décrit ce qu'il changerait. Rien n'est écrit ici.
   */
  async onFileChosen(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const sheet = this.sheet();
    if (!file || !sheet) {
      return;
    }
    this.analysing.set(true);
    try {
      this.importPreview.set(await this.files.analyse(file, sheet));
    } finally {
      this.analysing.set(false);
      // Sans cela, redéposer le même fichier après correction ne déclenche rien.
      input.value = '';
    }
  }

  closeImport(): void {
    this.importPreview.set(null);
  }

  /** N'applique que les lignes acceptées ; les autres restent en l'état. */
  applyImport(): void {
    const preview = this.importPreview();
    const sheet = this.sheet();
    if (!preview || !sheet || !preview.importable || this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.saveGrades(sheet.assessment.id, this.files.toEntries(preview, sheet))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (saved) => {
          this.sheet.set(saved);
          this.sheetDirty.set(false);
          this.importPreview.set(null);
          this.saving.set(false);
          this.load();
          const ignored = preview.invalidRows + preview.unknownRows + preview.lockedRows;
          this.notifications.success(
            `${preview.changedRows} note(s) reprises du fichier.`
            + (ignored > 0 ? ` ${ignored} ligne(s) laissées en l'état.` : ''),
            'Notes importées');
        },
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  // ------------------------------------------------------ la correction

  openCorrection(row: GradeRow): void {
    this.correcting.set(row);
    this.correctionForm.reset({
      score: row.score ?? 0,
      absent: row.absent,
      justification: ''
    });
  }

  closeCorrection(): void {
    this.correcting.set(null);
  }

  submitCorrection(): void {
    const row = this.correcting();
    if (!row || !row.id || this.correctionForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.correctionForm.getRawValue();
    this.dataSource.correctGrade(row.id, {
      score: value.absent ? undefined : value.score,
      absent: value.absent,
      justification: value.justification.trim()
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (saved) => {
        this.sheet.set(saved);
        this.correcting.set(null);
        this.saving.set(false);
        this.load();
        this.notifications.success(
          `La note de ${row.studentName} est corrigée. L'ancienne valeur et le motif `
          + 'sont conservés.',
          'Correction enregistrée');
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  // ------------------------------------------------------------- affichage

  formatDate(iso: string): string {
    return formatDay(iso);
  }

  formatScore(value: number | undefined, scale?: number): string {
    if (value === undefined || value === null) {
      return '—';
    }
    return scale ? `${trim(value)}/${trim(scale)}` : trim(value);
  }

  /** Traduit le code du serveur plutôt que d'afficher « erreur ». */
  private explain(err: unknown): void {
    const error = (err as { error?: { code?: string; message?: string } })?.error;
    if (error?.code) {
      this.notifications.error(
        error.message ?? translateErrorCode(error.code), 'Action refusée');
      return;
    }
    // En démonstration, le magasin lève un code nu plutôt qu'une réponse HTTP.
    const code = (err as { message?: string })?.message;
    if (code && /^[A-Z_]+$/.test(code)) {
      this.notifications.error(translateErrorCode(code), 'Action refusée');
    }
  }
}

/* ------------------------------------------------------------------ dates */

function isoToday(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function daysBetween(from: string, to: string): number {
  const start = Date.parse(`${from}T00:00:00`);
  const end = Date.parse(`${to}T00:00:00`);
  return Math.round((end - start) / 86400000);
}

function formatDay(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
}

function trim(value: number): string {
  return Number.isInteger(value) ? String(value) : String(value).replace('.', ',');
}
