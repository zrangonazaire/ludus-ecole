import { GradeStatus } from '@core/models/common.models';
import {
  AssessmentBoard, AssessmentItem, AssessmentQuery, AssessmentStatus, AssessmentTypeCode,
  AssessmentUpsertPayload, GradeCorrectionPayload, GradeEntryPayload, GradeRow, GradeSheet
} from '@core/models/assessment.models';
import { MOCK_CLASSROOMS, MOCK_STUDENTS, MOCK_SUBJECTS, MOCK_TEACHERS, MOCK_TERMS } from './mock-data';

/**
 * The assessment board, in memory, for the demonstration.
 *
 * <p>Stateful on purpose, like the attendance register. A mark entered here has
 * to still be there when the sheet is reopened, a submitted paper has to appear
 * in the office's queue, and validating one has to empty it. A mock that
 * answered from a frozen snapshot would let you validate a paper and watch it
 * reappear as « à valider ».</p>
 *
 * <p>The seed is laid out relative to today rather than to the fixed term dates
 * of the demo data. The board's whole point is what is late and what is
 * waiting, and neither means anything if the papers sit in a term that is
 * months away from the day the demo is run.</p>
 */

interface StoredGrade {
  id: string;
  assessmentId: string;
  studentId: string;
  score?: number;
  absent: boolean;
  exempted: boolean;
  comment?: string;
  status: GradeStatus;
  revisionCount: number;
}

interface StoredAssessment {
  id: string;
  title: string;
  description?: string;
  classroomId: string;
  subjectId: string;
  teacherId: string;
  assessmentType: AssessmentTypeCode;
  assessmentDate: string;
  durationMinutes?: number;
  maxScore: number;
  coefficient: number;
  countsForAverage: boolean;
  status: AssessmentStatus;
}

/** Past this, a paper sat but not corrected will not catch up in the term. */
const OVERDUE_AFTER_DAYS = 7;

/** États dans lesquels un devoir bloque encore l'édition des bulletins. */
const UNSETTLED: AssessmentStatus[] = ['OPEN', 'GRADING', 'SUBMITTED'];

/**
 * Nombre de classes ayant soldé leur période dans la démonstration.
 *
 * <p>Trois sur six : assez pour que les bulletins soient éditables tout de
 * suite, assez peu pour que l'écran Évaluations garde du travail en cours et
 * que le message « ce qui bloque » reste démontrable.</p>
 */
const SETTLED_CLASSES = 3;

const TYPE_LABELS: Record<AssessmentTypeCode, string> = {
  HOMEWORK: 'Devoir de maison',
  QUIZ: 'Interrogation',
  TEST: 'Devoir surveillé',
  EXAM: 'Composition',
  ORAL: 'Oral',
  PRACTICAL: 'Travaux pratiques',
  PROJECT: 'Projet',
  CONTINUOUS_ASSESSMENT: 'Contrôle continu',
  OTHER: 'Autre'
};

const STATUS_LABELS: Record<AssessmentStatus, string> = {
  DRAFT: 'Brouillon',
  PLANNED: 'Annoncé',
  OPEN: 'Saisie ouverte',
  GRADING: 'En correction',
  SUBMITTED: 'À valider',
  VALIDATED: 'Validé',
  PUBLISHED: 'Publié',
  CANCELLED: 'Annulé'
};

const GRADE_LABELS: Record<GradeStatus, string> = {
  DRAFT: 'En saisie',
  SUBMITTED: 'Soumise',
  VALIDATED: 'Validée',
  PUBLISHED: 'Publiée'
};

/** Which transitions the demo accepts, mirroring the server's lifecycle. */
const ALLOWED: Record<AssessmentStatus, AssessmentStatus[]> = {
  DRAFT: ['PLANNED', 'CANCELLED'],
  PLANNED: ['OPEN', 'DRAFT', 'CANCELLED'],
  OPEN: ['GRADING', 'CANCELLED'],
  GRADING: ['SUBMITTED', 'OPEN', 'CANCELLED'],
  SUBMITTED: ['VALIDATED', 'GRADING'],
  VALIDATED: ['PUBLISHED', 'SUBMITTED'],
  PUBLISHED: [],
  CANCELLED: []
};

const TITLES: Record<string, string[]> = {
  TEST: ['Devoir surveillé n°1', 'Devoir surveillé n°2', 'Devoir surveillé n°3'],
  QUIZ: ['Interrogation écrite', 'Interrogation orale', 'Contrôle rapide'],
  EXAM: ['Composition du trimestre'],
  HOMEWORK: ['Devoir de maison n°1', 'Devoir de maison n°2']
};

function hash(seed: string): number {
  let value = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    value ^= seed.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return ((value >>> 0) % 10000) / 10000;
}

function toIso(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function todayIso(): string {
  return toIso(new Date());
}

function shift(iso: string, days: number): string {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toIso(date);
}

function daysSince(iso: string): number {
  const start = Date.parse(`${iso}T00:00:00`);
  const end = Date.parse(`${todayIso()}T00:00:00`);
  return Math.round((end - start) / 86400000);
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

class AssessmentStore {
  private readonly assessments: StoredAssessment[] = [];
  private readonly grades: StoredGrade[] = [];
  private sequence = 1;

  constructor() {
    this.seed();
  }

  // -------------------------------------------------------------- the board

  board(query: AssessmentQuery): AssessmentBoard {
    const matching = this.assessments.filter((a) =>
      a.status !== 'CANCELLED'
      && (!query.classroomId || a.classroomId === query.classroomId)
      && (!query.subjectId || a.subjectId === query.subjectId)
      && (!query.status || a.status === query.status));

    const items = matching
      .map((a) => this.describe(a))
      .sort((a, b) => b.assessmentDate.localeCompare(a.assessmentDate)
        || a.classroomName.localeCompare(b.classroomName));

    const all = this.assessments.filter((a) => a.status !== 'CANCELLED').map((a) => this.describe(a));
    const term = MOCK_TERMS[1];

    return {
      academicYearId: 'ay-2026-2027',
      termId: term.id,
      termName: term.name,
      termStart: shift(todayIso(), -60),
      termEnd: shift(todayIso(), 30),
      total: items.length,
      // Les compteurs portent sur toute la période, jamais sur la liste filtrée.
      plannedCount: all.filter((a) => a.status === 'PLANNED' || a.status === 'DRAFT').length,
      gradingCount: all.filter((a) => a.status === 'OPEN' || a.status === 'GRADING').length,
      awaitingValidationCount: all.filter((a) => a.status === 'SUBMITTED').length,
      awaitingPublicationCount: all.filter((a) => a.status === 'VALIDATED').length,
      publishedCount: all.filter((a) => a.status === 'PUBLISHED').length,
      overdueCount: all.filter((a) =>
        (a.status === 'OPEN' || a.status === 'GRADING')
        && a.gradedCount === 0
        && daysSince(a.assessmentDate) >= OVERDUE_AFTER_DAYS).length,
      assessments: items
    };
  }

  // --------------------------------------------------------- the assessment

  create(payload: AssessmentUpsertPayload): AssessmentItem {
    const stored: StoredAssessment = {
      id: `as-${this.sequence++}`,
      title: payload.title,
      description: payload.description,
      classroomId: payload.classroomId,
      subjectId: payload.subjectId,
      teacherId: payload.teacherId,
      assessmentType: payload.assessmentType,
      assessmentDate: payload.assessmentDate,
      durationMinutes: payload.durationMinutes,
      maxScore: payload.maxScore,
      coefficient: payload.coefficient,
      countsForAverage: payload.countsForAverage,
      status: 'PLANNED'
    };
    this.assessments.push(stored);
    return this.describe(stored);
  }

  update(id: string, payload: AssessmentUpsertPayload): AssessmentItem {
    const stored = this.require(id);
    const marks = this.gradesOf(id).filter((g) => g.score !== undefined).length;
    if (marks > 0 && stored.maxScore !== payload.maxScore) {
      // Le barème est figé dès la première note : le changer ferait bouger
      // toutes les notes déjà saisies sans que personne y touche.
      throw new Error('ASSESSMENT_SCALE_LOCKED');
    }
    Object.assign(stored, {
      title: payload.title,
      description: payload.description,
      classroomId: payload.classroomId,
      subjectId: payload.subjectId,
      teacherId: payload.teacherId,
      assessmentType: payload.assessmentType,
      assessmentDate: payload.assessmentDate,
      durationMinutes: payload.durationMinutes,
      maxScore: payload.maxScore,
      coefficient: payload.coefficient,
      countsForAverage: payload.countsForAverage
    });
    return this.describe(stored);
  }

  changeStatus(id: string, target: AssessmentStatus): AssessmentItem {
    const stored = this.require(id);
    if (!ALLOWED[stored.status].includes(target)) {
      throw new Error('ASSESSMENT_INVALID_TRANSITION');
    }
    if (target === 'OPEN') {
      this.ensureRows(stored);
    }
    if (target === 'SUBMITTED') {
      this.moveGrades(id, 'DRAFT', 'SUBMITTED');
    }
    if (target === 'VALIDATED') {
      this.moveGrades(id, 'SUBMITTED', 'VALIDATED');
    }
    if (target === 'PUBLISHED') {
      this.moveGrades(id, 'VALIDATED', 'PUBLISHED');
    }
    stored.status = target;
    return this.describe(stored);
  }

  // ---------------------------------------------------------- the grades

  sheet(assessmentId: string): GradeSheet {
    const stored = this.require(assessmentId);
    const byStudent = new Map(this.gradesOf(assessmentId).map((g) => [g.studentId, g]));

    const rows: GradeRow[] = this.studentsOf(stored.classroomId).map((student) => {
      const grade = byStudent.get(student.id);
      const status: GradeStatus = grade?.status ?? 'DRAFT';
      return {
        id: grade?.id,
        studentId: student.id,
        studentNumber: student.studentNumber,
        studentName: student.fullName,
        score: grade?.score,
        normalizedScore: grade?.score !== undefined
          ? round2((grade.score * 20) / stored.maxScore)
          : undefined,
        absent: grade?.absent ?? false,
        exempted: grade?.exempted ?? false,
        comment: grade?.comment,
        status,
        statusLabel: GRADE_LABELS[status],
        requiresJustifiedCorrection: status === 'VALIDATED' || status === 'PUBLISHED',
        revisionCount: grade?.revisionCount ?? 0
      };
    }).sort((a, b) => a.studentName.localeCompare(b.studentName));

    const scores = rows
      .filter((r) => !r.absent && !r.exempted && r.score !== undefined)
      .map((r) => r.score as number)
      .sort((a, b) => a - b);

    const half = stored.maxScore / 2;
    return {
      assessment: this.describe(stored),
      classAverage: scores.length > 0
        ? round2(scores.reduce((sum, s) => sum + s, 0) / scores.length)
        : undefined,
      median: scores.length > 0 ? round2(medianOf(scores)) : undefined,
      minScore: scores.length > 0 ? scores[0] : undefined,
      maxScoreObtained: scores.length > 0 ? scores[scores.length - 1] : undefined,
      passCount: scores.filter((s) => s >= half).length,
      absentCount: rows.filter((r) => r.absent).length,
      exemptedCount: rows.filter((r) => r.exempted).length,
      missingCount: rows.filter((r) => !r.absent && !r.exempted && r.score === undefined).length,
      rows
    };
  }

  saveGrades(assessmentId: string, entries: GradeEntryPayload[]): GradeSheet {
    const stored = this.require(assessmentId);
    if (stored.status !== 'OPEN' && stored.status !== 'GRADING') {
      throw new Error('ASSESSMENT_NOT_OPEN');
    }
    const byStudent = new Map(this.gradesOf(assessmentId).map((g) => [g.studentId, g]));

    entries.forEach((entry) => {
      if (entry.score !== undefined && entry.score !== null
        && (entry.score < 0 || entry.score > stored.maxScore)) {
        throw new Error('GRADE_OUT_OF_RANGE');
      }
      const existing = byStudent.get(entry.studentId);
      if (existing && (existing.status === 'VALIDATED' || existing.status === 'PUBLISHED')) {
        throw new Error('GRADE_ALREADY_PUBLISHED');
      }
      const grade = existing ?? this.newGrade(assessmentId, entry.studentId);
      grade.absent = entry.absent;
      grade.exempted = entry.exempted;
      grade.score = entry.absent || entry.exempted ? undefined : entry.score ?? undefined;
      grade.comment = entry.comment;
    });

    // Le devoir bascule tout seul en correction dès la première note.
    if (stored.status === 'OPEN') {
      stored.status = 'GRADING';
    }
    return this.sheet(assessmentId);
  }

  submit(assessmentId: string): GradeSheet {
    const sheet = this.sheet(assessmentId);
    if (sheet.missingCount > 0) {
      throw new Error('ASSESSMENT_INCOMPLETE');
    }
    this.changeStatus(assessmentId, 'SUBMITTED');
    return this.sheet(assessmentId);
  }

  validate(assessmentId: string): GradeSheet {
    this.changeStatus(assessmentId, 'VALIDATED');
    return this.sheet(assessmentId);
  }

  publish(assessmentId: string): GradeSheet {
    this.changeStatus(assessmentId, 'PUBLISHED');
    return this.sheet(assessmentId);
  }

  correct(gradeId: string, payload: GradeCorrectionPayload): GradeSheet {
    const grade = this.grades.find((g) => g.id === gradeId);
    if (!grade) {
      throw new Error('GRADE_NOT_FOUND');
    }
    if (grade.status !== 'VALIDATED' && grade.status !== 'PUBLISHED') {
      throw new Error('GRADE_NOT_ALLOWED');
    }
    if (!payload.justification || !payload.justification.trim()) {
      throw new Error('GRADE_JUSTIFICATION_REQUIRED');
    }
    const assessment = this.require(grade.assessmentId);
    if (payload.score !== undefined && payload.score !== null
      && (payload.score < 0 || payload.score > assessment.maxScore)) {
      throw new Error('GRADE_OUT_OF_RANGE');
    }
    grade.absent = payload.absent;
    grade.score = payload.absent ? undefined : payload.score ?? undefined;
    grade.comment = payload.justification.trim();
    grade.revisionCount++;
    return this.sheet(grade.assessmentId);
  }

  /**
   * The marks that count towards an average, for a whole class.
   *
   * <p>Only validated and published papers, and only marks that are neither
   * absent nor exempt — the same rule the server applies. The report cards read
   * this rather than keeping marks of their own: two sources for the same
   * figure always end up disagreeing, and the disagreement shows up the day a
   * parent compares a bulletin with the screen.</p>
   */
  countingGrades(classroomId: string): Array<{
    studentId: string;
    subjectId: string;
    /** La note ramenée sur 20, comme le fait le serveur avant de moyenner. */
    normalizedScore: number;
    /** Le coefficient du devoir, pas celui de la matière. */
    assessmentCoefficient: number;
  }> {
    const counting = this.assessments.filter((a) =>
      a.classroomId === classroomId
      && (a.status === 'VALIDATED' || a.status === 'PUBLISHED')
      && a.countsForAverage);

    const result: Array<{
      studentId: string; subjectId: string;
      normalizedScore: number; assessmentCoefficient: number;
    }> = [];

    counting.forEach((assessment) => {
      this.gradesOf(assessment.id).forEach((grade) => {
        if (grade.absent || grade.exempted || grade.score === undefined) {
          return;
        }
        result.push({
          studentId: grade.studentId,
          subjectId: assessment.subjectId,
          normalizedScore: (grade.score * 20) / assessment.maxScore,
          assessmentCoefficient: assessment.coefficient
        });
      });
    });
    return result;
  }

  // ------------------------------------------------------------- internals

  private describe(stored: StoredAssessment): AssessmentItem {
    const classroom = MOCK_CLASSROOMS.find((c) => c.id === stored.classroomId);
    const subject = MOCK_SUBJECTS.find((s) => s.id === stored.subjectId);
    const teacher = MOCK_TEACHERS.find((t) => t.id === stored.teacherId);
    const students = this.studentsOf(stored.classroomId).length;

    const marks = this.gradesOf(stored.id);
    const graded = marks.filter((g) => g.score !== undefined || g.absent || g.exempted).length;
    const scored = marks.filter((g) => g.score !== undefined).map((g) => g.score as number);

    return {
      id: stored.id,
      title: stored.title,
      description: stored.description,
      classroomId: stored.classroomId,
      classroomName: classroom?.name ?? '',
      subjectId: stored.subjectId,
      subjectName: subject?.name ?? '',
      subjectColor: subject?.colorHex,
      teacherId: stored.teacherId,
      teacherName: teacher?.fullName ?? '',
      termId: MOCK_TERMS[1].id,
      termName: MOCK_TERMS[1].name,
      assessmentType: stored.assessmentType,
      assessmentTypeLabel: TYPE_LABELS[stored.assessmentType],
      assessmentDate: stored.assessmentDate,
      durationMinutes: stored.durationMinutes,
      maxScore: stored.maxScore,
      coefficient: stored.coefficient,
      countsForAverage: stored.countsForAverage,
      status: stored.status,
      statusLabel: STATUS_LABELS[stored.status],
      studentCount: students,
      gradedCount: graded,
      // Nulle tant qu'aucune note n'est saisie : zéro serait un mensonge.
      classAverage: scored.length > 0
        ? round2(scored.reduce((sum, s) => sum + s, 0) / scored.length)
        : undefined,
      gradeEntryOpen: stored.status === 'OPEN' || stored.status === 'GRADING',
      readyForNextStep: students > 0 && graded >= students
    };
  }

  private require(id: string): StoredAssessment {
    const stored = this.assessments.find((a) => a.id === id);
    if (!stored) {
      throw new Error('ASSESSMENT_NOT_FOUND');
    }
    return stored;
  }

  private gradesOf(assessmentId: string): StoredGrade[] {
    return this.grades.filter((g) => g.assessmentId === assessmentId);
  }

  private studentsOf(classroomId: string) {
    return MOCK_STUDENTS.filter((s) => s.classroomId === classroomId);
  }

  private newGrade(assessmentId: string, studentId: string): StoredGrade {
    const grade: StoredGrade = {
      id: `gr-${this.sequence++}`,
      assessmentId,
      studentId,
      absent: false,
      exempted: false,
      status: 'DRAFT',
      revisionCount: 0
    };
    this.grades.push(grade);
    return grade;
  }

  private ensureRows(stored: StoredAssessment): void {
    const known = new Set(this.gradesOf(stored.id).map((g) => g.studentId));
    this.studentsOf(stored.classroomId).forEach((student) => {
      if (!known.has(student.id)) {
        this.newGrade(stored.id, student.id);
      }
    });
  }

  private moveGrades(assessmentId: string, from: GradeStatus, to: GradeStatus): void {
    this.gradesOf(assessmentId).forEach((grade) => {
      if (grade.status === from) {
        grade.status = to;
      }
    });
  }

  /**
   * A term's worth of papers, laid out around today.
   *
   * <p>Every state is represented, including the one nobody wants: a paper sat
   * nine days ago on which not a single mark has been entered. The board exists
   * to surface exactly that, and a demo where nothing is late shows nothing.</p>
   */
  private seed(): void {
    const plan: Array<{ offset: number; status: AssessmentStatus; graded: 'none' | 'partial' | 'full' }> = [
      { offset: 12, status: 'PLANNED', graded: 'none' },
      { offset: 5, status: 'PLANNED', graded: 'none' },
      { offset: -1, status: 'OPEN', graded: 'none' },
      { offset: -3, status: 'GRADING', graded: 'partial' },
      { offset: -9, status: 'OPEN', graded: 'none' },
      { offset: -12, status: 'SUBMITTED', graded: 'full' },
      { offset: -20, status: 'VALIDATED', graded: 'full' },
      { offset: -34, status: 'PUBLISHED', graded: 'full' }
    ];

    const today = todayIso();
    MOCK_CLASSROOMS.forEach((classroom, classIndex) => {
      // Les trois dernières classes ont soldé leur période : tous leurs devoirs
      // sont validés ou publiés. Sans elles, l'écran Bulletins s'ouvrirait sur
      // six classes bloquées et un bouton grisé, c'est-à-dire sur rien — alors
      // que la moitié du travail d'une fin de trimestre consiste justement à
      // éditer les bulletins des classes qui, elles, ont fini.
      const settled = classIndex >= MOCK_CLASSROOMS.length - SETTLED_CLASSES;

      plan.forEach((step, stepIndex) => {
        if (settled && UNSETTLED.includes(step.status)) {
          return;
        }
        // Toutes les classes n'ont pas tous les devoirs : un tableau parfaitement
        // régulier ne ressemble à aucun établissement. Les devoirs comptés dans
        // les moyennes, eux, sont toujours là : une classe soldée sans une seule
        // note validée produirait des bulletins vides.
        const counting = step.status === 'VALIDATED' || step.status === 'PUBLISHED';
        if (!counting && hash(`keep|${classroom.id}|${stepIndex}`) > 0.62) {
          return;
        }
        const subject = MOCK_SUBJECTS[(classIndex + stepIndex) % MOCK_SUBJECTS.length];
        const teacher = MOCK_TEACHERS[(classIndex + stepIndex) % MOCK_TEACHERS.length];
        const type: AssessmentTypeCode = stepIndex % 4 === 0 ? 'QUIZ'
          : stepIndex % 5 === 0 ? 'EXAM' : 'TEST';
        const titles = TITLES[type] ?? TITLES['TEST'];
        const maxScore = type === 'QUIZ' ? 10 : 20;

        const stored: StoredAssessment = {
          id: `as-${this.sequence++}`,
          title: titles[stepIndex % titles.length],
          classroomId: classroom.id,
          subjectId: subject.id,
          teacherId: teacher.id,
          assessmentType: type,
          assessmentDate: shift(today, step.offset),
          durationMinutes: type === 'QUIZ' ? 30 : 120,
          maxScore,
          coefficient: type === 'EXAM' ? 3 : type === 'QUIZ' ? 1 : 2,
          countsForAverage: true,
          status: step.status
        };
        this.assessments.push(stored);

        if (step.graded === 'none' && step.status !== 'PLANNED') {
          this.ensureRows(stored);
          return;
        }
        if (step.graded === 'none') {
          return;
        }

        const students = this.studentsOf(classroom.id);
        const cut = step.graded === 'partial'
          ? Math.ceil(students.length * 0.45)
          : students.length;

        students.forEach((student, index) => {
          const grade = this.newGrade(stored.id, student.id);
          grade.status = step.status === 'PUBLISHED' ? 'PUBLISHED'
            : step.status === 'VALIDATED' ? 'VALIDATED'
            : step.status === 'SUBMITTED' ? 'SUBMITTED' : 'DRAFT';
          if (index >= cut) {
            return;
          }
          const draw = hash(`s|${student.id}|${stored.id}`);
          if (draw < 0.06) {
            grade.absent = true;
            return;
          }
          // Une classe réelle s'étale : quelques très bons, un gros milieu,
          // quelques élèves en difficulté.
          const centred = (draw - 0.5) * 2;
          const raw = maxScore * (0.55 + centred * 0.32);
          grade.score = Math.max(0, Math.min(maxScore, Math.round(raw * 2) / 2));
        });
      });

      // Une classe soldée reçoit une composition dans chaque matière. Sans
      // cela son bulletin ne porterait que deux matières sur sept, et un
      // bulletin à moitié vide ne montre pas à quoi sert un bulletin.
      if (settled) {
        MOCK_SUBJECTS.forEach((subject, subjectIndex) => {
          this.seedCountingPaper(classroom.id, subject.id,
            MOCK_TEACHERS[(classIndex + subjectIndex) % MOCK_TEACHERS.length].id,
            shift(today, -26 + subjectIndex));
        });
      }
    });
  }

  /**
   * One validated paper, marked for the whole class.
   *
   * <p>Validated rather than published: the marks count towards the averages
   * without the families having seen them yet, which is where a school stands
   * when it starts editing bulletins.</p>
   */
  private seedCountingPaper(classroomId: string, subjectId: string,
                            teacherId: string, date: string): void {
    const stored: StoredAssessment = {
      id: `as-${this.sequence++}`,
      title: 'Composition du trimestre',
      classroomId,
      subjectId,
      teacherId,
      assessmentType: 'EXAM',
      assessmentDate: date,
      durationMinutes: 120,
      maxScore: 20,
      coefficient: 3,
      countsForAverage: true,
      status: 'VALIDATED'
    };
    this.assessments.push(stored);

    this.studentsOf(classroomId).forEach((student) => {
      const grade = this.newGrade(stored.id, student.id);
      grade.status = 'VALIDATED';
      const draw = hash(`c|${student.id}|${stored.id}`);
      if (draw < 0.04) {
        grade.absent = true;
        return;
      }
      const centred = (draw - 0.5) * 2;
      const raw = 20 * (0.55 + centred * 0.32);
      grade.score = Math.max(0, Math.min(20, Math.round(raw * 2) / 2));
    });
  }
}

function medianOf(sorted: number[]): number {
  const size = sorted.length;
  return size % 2 === 1
    ? sorted[(size - 1) / 2]
    : (sorted[size / 2 - 1] + sorted[size / 2]) / 2;
}

/** One board for the whole demonstration session. */
export const MOCK_ASSESSMENTS = new AssessmentStore();
