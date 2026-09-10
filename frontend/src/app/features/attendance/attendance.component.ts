import { createUuid } from "../../core/utils/uuid";
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ATTENDANCE_DATA_SOURCE } from '@core/datasource/data-source';
import { AttendanceStatus } from '@core/models/common.models';
import { AttendanceSheet, LessonSlot } from '@core/models/domain.models';
import {
  ATTENDANCE_MARKS, Absence, AbsenceDigest, AbsenceFilter, AttendanceDay,
  AttendanceMark, ClassroomAttendance, QUICK_MARKS
} from '@core/models/attendance.models';
import { NotificationService } from '@core/services/notification.service';
import { translateErrorCode } from '@core/services/error-messages';
import { LoadingStateComponent } from '@shared/ui/loading-state/loading-state.component';
import { ErrorStateComponent } from '@shared/ui/error-state/error-state.component';
import { StepCoachmarkComponent } from '@shared/ui/step-coachmark/step-coachmark.component';

/** The three moments of attendance, in the order the day goes. */
export type AttendanceTab = 'APPEL' | 'SUIVI' | 'ATTENTE';

/** Wording of the coachmark shown once per tab, exactly as in the setup flow. */
interface HelpCopy {
  step: number;
  title: string;
  description: string;
  points: readonly string[];
  ctaLabel: string;
}

/**
 * Attendance: the roll call, the follow-up, the excuses.
 *
 * <p>One screen for three moments that are the same fact seen at three
 * distances. A mark taken at half past seven becomes an absence to chase on
 * Thursday, and a slip handed in at the office turns it into a justified one.
 * Splitting them across three pages made people take the register and never
 * look at what it accumulated.</p>
 *
 * <p>The help works like the one in the configuration: a card appears by itself
 * the first time a tab is opened, and the « ? Aide » button brings it back
 * whenever it is wanted. Nothing here is obvious enough to be left unsaid — why
 * a class with no sheet is worse than a class full of absents, why the
 * attendance rate ignores the classes that were never called — and none of it
 * should have to be read twice by someone who already knows.</p>
 */
@Component({
  selector: 'eduops-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    LoadingStateComponent, ErrorStateComponent, StepCoachmarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent implements OnInit {
  private readonly dataSource = inject(ATTENDANCE_DATA_SOURCE);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly marks = ATTENDANCE_MARKS;
  readonly quickMarks = QUICK_MARKS;
  readonly totalSteps = 3;

  /** Fenêtres proposées au suivi : la semaine, le mois, le trimestre. */
  readonly periods: readonly number[] = [7, 30, 90];

  /** Bornes le sélecteur de date : on n'appelle pas un jour à venir. */
  readonly maxDate = isoToday();

  readonly tab = signal<AttendanceTab>('APPEL');
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly saving = signal(false);

  /** Le jour appelé. Une date future est refusée : ce serait une saisie fausse. */
  readonly date = signal(isoToday());
  readonly day = signal<AttendanceDay | null>(null);

  /** La feuille ouverte dans le panneau ; nulle quand il est fermé. */
  /**
   * La classe dont on est en train de choisir le cours.
   *
   * <p>Étape intermédiaire, et seulement quand elle a un emploi du temps :
   * au primaire un maître tient sa classe toute la journée, lui faire choisir
   * une matière serait une question sans réponse.</p>
   */
  readonly pickingLesson = signal<ClassroomAttendance | null>(null);
  readonly lessons = signal<LessonSlot[]>([]);
  readonly loadingLessons = signal(false);

  readonly sheet = signal<AttendanceSheet | null>(null);
  readonly sheetDirty = signal(false);

  readonly digest = signal<AbsenceDigest | null>(null);
  readonly filter = signal<AbsenceFilter>('ALL');
  readonly classroomFilter = signal<string>('');
  readonly periodDays = signal(30);

  /** La ligne dont on saisit le justificatif ; nulle quand le panneau est fermé. */
  readonly justifying = signal<Absence | null>(null);

  /** Une clé par feuille ouverte : rejouer l'envoi ne crée pas de doublon. */
  private idempotencyKey = newKey();

  readonly justifyForm = this.fb.nonNullable.group({
    reason: ['', [Validators.required, Validators.maxLength(255)]],
    documentUrl: ['', [Validators.maxLength(500)]]
  });

  // ------------------------------------------------------------------ aide

  private readonly help: Record<AttendanceTab, HelpCopy> = {
    APPEL: {
      step: 1,
      title: "L'appel se fait classe par classe, en une minute",
      description: "Chaque feuille s'ouvre avec tout le monde présent. Vous ne touchez "
        + "que les lignes qui changent — c'est ce qui permet d'appeler quarante élèves "
        + 'sans se tromper de nom.',
      points: [
        "Une classe sans feuille n'est pas une classe sans absents : c'est une classe "
        + 'dont personne ne sait rien. Elle reste en tête de liste jusqu\'à ce que '
        + "l'appel soit fait.",
        'Le taux du jour ne compte que les classes appelées. Compter les autres le '
        + "ferait monter à mesure que l'appel se fait mal.",
        "Un retard demande son heure d'arrivée : sans elle, il n'est ni mesurable ni "
        + 'cumulable en fin de trimestre.'
      ],
      ctaLabel: "J'ai compris, faire l'appel"
    },
    SUIVI: {
      step: 2,
      title: 'Les absences et les retards se lisent ensemble',
      description: 'Trois quarts d\'heure perdus chaque matin pèsent autant qu\'une '
        + 'journée manquée. Une liste qui ne montrerait que les absences entières ne '
        + 'ferait jamais apparaître ce cas-là.',
      points: [
        'Les compteurs portent sur toute la période. Seule la liste suit le filtre : '
        + 'des totaux qui suivraient le filtre permettraient de réduire la vue jusqu\'à '
        + 'ce que tout paraisse en ordre.',
        'Une absence justifiée reste visible. Effacée, elle laisserait un conseil de '
        + 'classe se demander pourquoi un élève a manqué un trimestre avec un dossier '
        + 'vierge.',
        "Trois absences non justifiées sur la période, ce n'est plus un incident : "
        + "c'est une tendance, et l'écran le dit."
      ],
      ctaLabel: 'Voir le suivi'
    },
    ATTENTE: {
      step: 3,
      title: 'Ce qui attend encore un justificatif',
      description: 'Les absences non couvertes, de la plus ancienne à la plus récente. '
        + "Passé deux jours, un justificatif qui n'est pas arrivé n'arrive généralement "
        + 'plus tout seul : c\'est le moment d\'appeler.',
      points: [
        'La relance est inscrite sur la ligne, pas seulement envoyée. À deux, on '
        + "n'appelle pas deux fois la même famille en oubliant la suivante.",
        "Enregistrer un justificatif ne supprime pas l'absence : il la couvre. "
        + "L'élève garde son historique, la famille n'est plus relancée.",
        'Le motif saisi ici est celui que relira le conseil de classe. « Certificat '
        + 'médical du 12/03 » se comprend en juin ; « RAS » ne se comprend plus.'
      ],
      ctaLabel: 'Traiter la file'
    }
  };

  readonly helpCopy = computed<HelpCopy>(() => this.help[this.tab()]);

  // --------------------------------------------------------------- cycle

  ngOnInit(): void {
    this.loadDay();
  }

  changeTab(tab: AttendanceTab): void {
    this.tab.set(tab);
    this.closeSheet();
    this.justifying.set(null);
    if (tab === 'APPEL') {
      this.loadDay();
    } else {
      this.filter.set(tab === 'ATTENTE' ? 'UNJUSTIFIED' : 'ALL');
      this.loadDigest();
    }
  }

  reload(): void {
    if (this.tab() === 'APPEL') {
      this.loadDay();
    } else {
      this.loadDigest();
    }
  }

  // ---------------------------------------------------------- appel du jour

  loadDay(): void {
    this.loading.set(true);
    this.error.set(false);
    this.dataSource.day(this.date())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (day) => {
          this.day.set(day);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(true);
          this.explain(err);
        }
      });
  }

  changeDate(value: string): void {
    if (!value) {
      return;
    }
    if (value > isoToday()) {
      this.notifications.error(
        "On ne fait pas l'appel d'un jour qui n'est pas encore arrivé.", 'Date refusée');
      return;
    }
    this.date.set(value);
    this.loadDay();
  }

  goToPreviousDay(): void {
    this.changeDate(shiftDays(this.date(), -1));
  }

  goToNextDay(): void {
    const next = shiftDays(this.date(), 1);
    if (next <= isoToday()) {
      this.changeDate(next);
    }
  }

  readonly isToday = computed(() => this.date() === isoToday());

  /** Les classes non appelées d'abord : ce sont elles qui restent à faire. */
  readonly orderedClassrooms = computed<ClassroomAttendance[]>(() => {
    const list = [...(this.day()?.classrooms ?? [])];
    return list.sort((a, b) => Number(a.done) - Number(b.done)
      || a.classroomName.localeCompare(b.classroomName));
  });

  readonly pendingClassrooms = computed(
    () => this.orderedClassrooms().filter((c) => !c.done));

  // -------------------------------------------------------------- feuille

  /**
   * Ouvre l'appel d'une classe.
   *
   * <p>Demande d'abord ses cours du jour. S'il y en a, on laisse choisir
   * lequel : au collège l'absence se constate cours par cours, et un appel
   * unique compterait présent tout le jour un élève parti après la récréation.
   * S'il n'y en a pas, on ouvre directement l'appel de la journée.</p>
   */
  openSheet(classroom: ClassroomAttendance): void {
    this.loadingLessons.set(true);
    this.lessons.set([]);
    this.dataSource.lessons(classroom.classroomId, this.date())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (lessons) => {
          this.loadingLessons.set(false);
          if (lessons.length === 0) {
            this.openDaySheet(classroom);
            return;
          }
          this.lessons.set(lessons);
          this.pickingLesson.set(classroom);
        },
        error: () => {
          // L'emploi du temps indisponible ne doit pas empêcher l'appel :
          // on retombe sur celui de la journée plutôt que de bloquer.
          this.loadingLessons.set(false);
          this.openDaySheet(classroom);
        }
      });
  }

  /** L'appel de la journée entière, sans matière. */
  openDaySheet(classroom: ClassroomAttendance): void {
    this.pickingLesson.set(null);
    this.loadSheet(classroom.classroomId, undefined);
  }

  /** L'appel d'un cours précis. */
  openLesson(lesson: LessonSlot): void {
    const classroom = this.pickingLesson();
    if (!classroom) {
      return;
    }
    this.pickingLesson.set(null);
    this.loadSheet(classroom.classroomId, lesson.subjectId);
  }

  cancelLessonPick(): void {
    this.pickingLesson.set(null);
    this.lessons.set([]);
  }

  private loadSheet(classroomId: string, subjectId?: string): void {
    this.saving.set(false);
    this.sheetDirty.set(false);
    this.idempotencyKey = newKey();
    this.dataSource.openSheet(classroomId, this.date(), subjectId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (sheet) => this.sheet.set(sheet),
        error: (err) => this.explain(err)
      });
  }

  /** « 08:00 – 09:00 », ou la matière seule si l'horaire manque. */
  lessonWhen(lesson: LessonSlot): string {
    if (!lesson.startTime) {
      return '';
    }
    const end = lesson.endTime ? ` – ${lesson.endTime.slice(0, 5)}` : '';
    return `${lesson.startTime.slice(0, 5)}${end}`;
  }

  closeSheet(): void {
    this.sheet.set(null);
    this.sheetDirty.set(false);
  }

  mark(studentId: string, status: AttendanceStatus): void {
    this.sheetDirty.set(true);
    this.sheet.update((current) => current === null ? current : {
      ...current,
      records: current.records.map((record) => record.studentId !== studentId
        ? record
        : {
            ...record,
            status,
            statusLabel: labelOf(status),
            // Un retard sans heure d'arrivée n'est pas mesurable : on propose
            // l'heure courante, qui reste modifiable.
            arrivalTime: status === 'LATE' || status === 'EXCUSED_LATE'
              ? record.arrivalTime ?? currentTime()
              : undefined
          })
    });
  }

  setArrivalTime(studentId: string, value: string): void {
    this.sheetDirty.set(true);
    this.sheet.update((current) => current === null ? current : {
      ...current,
      records: current.records.map((record) => record.studentId === studentId
        ? { ...record, arrivalTime: value || undefined }
        : record)
    });
  }

  markAllPresent(): void {
    this.sheetDirty.set(true);
    this.sheet.update((current) => current === null ? current : {
      ...current,
      records: current.records.map((record) => ({
        ...record,
        status: 'PRESENT' as AttendanceStatus,
        statusLabel: labelOf('PRESENT'),
        arrivalTime: undefined
      }))
    });
  }

  /** Le compte de la feuille ouverte, recalculé à chaque marque. */
  readonly sheetCounters = computed(() => {
    const records = this.sheet()?.records ?? [];
    const absent = records.filter((r) => r.status === 'ABSENT'
      || r.status === 'EXCUSED_ABSENCE').length;
    const late = records.filter((r) => r.status === 'LATE'
      || r.status === 'EXCUSED_LATE').length;
    return {
      total: records.length,
      absent,
      late,
      // Les présents sont ce qui reste : le compte tombe toujours juste.
      present: Math.max(0, records.length - absent - late)
    };
  });

  /** Un retard sans heure bloque l'enregistrement : le serveur le refuserait. */
  readonly missingArrivalTimes = computed(() => (this.sheet()?.records ?? []).filter(
    (r) => (r.status === 'LATE' || r.status === 'EXCUSED_LATE') && !r.arrivalTime).length);

  submitSheet(): void {
    const sheet = this.sheet();
    if (!sheet || this.saving()) {
      return;
    }
    if (this.missingArrivalTimes() > 0) {
      this.notifications.error(
        "Un retard doit porter une heure d'arrivée : sans elle, il n'est ni mesurable "
        + 'ni cumulable en fin de trimestre.', 'Heure manquante');
      return;
    }
    this.saving.set(true);
    this.dataSource.submitSheet(sheet, this.idempotencyKey)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (saved) => {
          const counters = this.sheetCounters();
          this.saving.set(false);
          this.closeSheet();
          this.loadDay();
          this.notifications.success(
            `${saved.classroomName} : ${counters.present} présent(s), `
            + `${counters.absent} absent(s), ${counters.late} retard(s). `
            + 'Les familles concernées sont prévenues.',
            'Appel enregistré');
        },
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  // ------------------------------------------------------------- le suivi

  loadDigest(): void {
    this.loading.set(true);
    this.error.set(false);
    const to = isoToday();
    this.dataSource.absences({
      from: shiftDays(to, -this.periodDays()),
      to,
      classroomId: this.classroomFilter() || undefined,
      filter: this.filter()
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (digest) => {
        this.digest.set(digest);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(true);
        this.explain(err);
      }
    });
  }

  changePeriod(days: number): void {
    this.periodDays.set(days);
    this.loadDigest();
  }

  changeFilter(filter: AbsenceFilter): void {
    this.filter.set(filter);
    this.loadDigest();
  }

  changeClassroom(classroomId: string): void {
    this.classroomFilter.set(classroomId);
    this.loadDigest();
  }

  /** Les classes proposées au filtre viennent du jour déjà chargé. */
  readonly classroomOptions = computed(() => this.day()?.classrooms ?? []);

  readonly waitingEntries = computed<Absence[]>(() => {
    const entries = this.digest()?.entries ?? [];
    // Du plus ancien au plus récent : la file se traite par le haut.
    return [...entries].sort((a, b) => a.date.localeCompare(b.date));
  });

  // -------------------------------------------------------- justificatifs

  openJustify(absence: Absence): void {
    this.justifying.set(absence);
    this.justifyForm.reset({ reason: absence.reason ?? '', documentUrl: '' });
  }

  closeJustify(): void {
    this.justifying.set(null);
  }

  submitJustify(): void {
    const absence = this.justifying();
    if (!absence || this.justifyForm.invalid || this.saving()) {
      return;
    }
    this.saving.set(true);
    const value = this.justifyForm.getRawValue();
    this.dataSource.justify(absence.id, {
      reason: value.reason.trim(),
      documentUrl: value.documentUrl.trim() || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (saved) => {
        this.saving.set(false);
        this.justifying.set(null);
        this.loadDigest();
        this.notifications.success(
          `L'absence du ${formatDay(saved.date)} de ${saved.studentName} est justifiée. `
          + "Elle reste dans son historique, elle n'y est plus reprochée.",
          'Justificatif enregistré');
      },
      error: (err) => {
        this.saving.set(false);
        this.explain(err);
      }
    });
  }

  remind(absence: Absence): void {
    if (this.saving()) {
      return;
    }
    this.saving.set(true);
    this.dataSource.remind(absence.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (saved) => {
          this.saving.set(false);
          this.loadDigest();
          this.notifications.success(
            `La famille de ${saved.studentName} est relancée. La date est inscrite sur `
            + "la ligne : personne ne rappellera pour la même absence.",
            'Relance envoyée');
        },
        error: (err) => {
          this.saving.set(false);
          this.explain(err);
        }
      });
  }

  // ------------------------------------------------------------- affichage

  markOf(status: AttendanceStatus): AttendanceMark {
    return this.marks.find((m) => m.code === status) ?? this.marks[0];
  }

  formatDate(iso: string): string {
    return formatDay(iso);
  }

  formatRate(rate: number | undefined): string {
    return rate === undefined || rate === null ? '—' : `${rate.toFixed(1)} %`;
  }

  /** Traduit le code du serveur plutôt que d'afficher « erreur ». */
  private explain(err: unknown): void {
    const error = (err as { error?: { code?: string; message?: string } })?.error;
    if (error?.code) {
      this.notifications.error(
        error.message ?? translateErrorCode(error.code), 'Action refusée');
    }
  }
}

/* ------------------------------------------------------------------ dates */

function isoToday(): string {
  return toIso(new Date());
}

function toIso(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function shiftDays(iso: string, days: number): string {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toIso(date);
}

function currentTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

function formatDay(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString('fr-FR',
    { weekday: 'long', day: 'numeric', month: 'long' });
}

function labelOf(status: AttendanceStatus): string {
  return ATTENDANCE_MARKS.find((m) => m.code === status)?.label ?? '';
}

function newKey(): string {
  return createUuid();
}
