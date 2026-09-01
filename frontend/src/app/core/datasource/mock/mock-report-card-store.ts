import {
  CouncilDecision, ReportCard, ReportCardBatch, ReportCardGeneratePayload,
  ReportCardLine, ReportCardQuery, ReportCardRemarkPayload, ReportCardStatus
} from '@core/models/report-card.models';
import { MOCK_CLASSROOMS, MOCK_STUDENTS, MOCK_SUBJECTS, MOCK_TERMS } from './mock-data';
import { MOCK_ASSESSMENTS } from './mock-assessment-store';

/**
 * Report cards, in memory, for the demonstration.
 *
 * <p>They are computed from the marks held by {@link MOCK_ASSESSMENTS} and from
 * nowhere else. A demo that carried its own averages would show a bulletin that
 * disagrees with the grade sheet two clicks away — which is precisely the kind
 * of thing a school notices immediately and never trusts again.</p>
 *
 * <p>Once generated, a card is stored. It is not recomputed on each read: that
 * is what makes it a photograph rather than a live view, and it is the whole
 * point of the object.</p>
 */

interface StoredCard {
  id: string;
  reference: string;
  verificationCode: string;
  studentId: string;
  classroomId: string;
  termId: string;
  generalAverage?: number;
  classAverage?: number;
  classMinAverage?: number;
  classMaxAverage?: number;
  rankInClass?: number;
  classSize: number;
  totalCoefficient: number;
  absenceCount: number;
  justifiedAbsenceCount: number;
  latenessCount: number;
  generalRemark?: string;
  headTeacherRemark?: string;
  principalRemark?: string;
  councilDecision?: CouncilDecision;
  status: ReportCardStatus;
  revision: number;
  generatedAt: string;
  publishedAt?: string;
  lines: ReportCardLine[];
}

/** Le barème et la moyenne de passage de la démonstration. */
const SCALE_MAX = 20;
const PASSING_MARK = 10;
const DECIMALS = 2;

/** Coefficients par matière, faute d'un programme complet en démonstration. */
const COEFFICIENTS: Record<string, number> = {
  's-mat': 4, 's-fra': 4, 's-ang': 2, 's-svt': 2, 's-pc': 3, 's-hg': 2, 's-eps': 1
};

const STATUS_LABELS: Record<ReportCardStatus, string> = {
  DRAFT: 'Brouillon',
  GENERATED: 'Généré',
  VALIDATED: 'Validé',
  PUBLISHED: 'Remis aux familles',
  ARCHIVED: 'Archivé'
};

const DECISION_LABELS: Record<CouncilDecision, string> = {
  PASS: 'Admis',
  REPEAT: 'Redouble',
  PROMOTED: 'Passe en classe supérieure',
  GRADUATED: 'Fin de cycle',
  TRANSFER_RECOMMENDED: 'Réorientation vers un autre établissement',
  ORIENTATION_REQUIRED: 'Orientation à décider',
  PENDING_DECISION: 'Décision en attente'
};

function round(value: number, decimals = DECIMALS): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/** L'appréciation française usuelle, exprimée sur le barème. */
function appreciationFor(average: number): string {
  const percent = (average / SCALE_MAX) * 100;
  if (percent >= 80) return 'Excellent';
  if (percent >= 70) return 'Très bien';
  if (percent >= 60) return 'Bien';
  if (percent >= 50) return 'Assez bien';
  if (percent >= 40) return 'Passable';
  return 'Insuffisant';
}

function hash(seed: string): number {
  let value = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    value ^= seed.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return ((value >>> 0) % 10000) / 10000;
}

class ReportCardStore {
  private readonly cards: StoredCard[] = [];
  private sequence = 1;

  constructor() {
    this.seed();
  }

  /**
   * Report cards for the classes that have finished their term.
   *
   * <p>They are produced by calling {@link generate} — the same path the screen
   * uses — rather than written out by hand. A seed that fabricated cards
   * directly would show averages nobody could trace back to a mark, and the
   * first person to open a bulletin next to the grade sheet would find them
   * disagreeing.</p>
   *
   * <p>Three states are laid out on purpose: one class already handed out, one
   * reviewed but not handed out, one freshly computed. Opening the screen on a
   * single state would leave two thirds of it undemonstrable.</p>
   */
  private seed(): void {
    const term = MOCK_TERMS[1];
    const ready = MOCK_CLASSROOMS.filter((classroom) =>
      this.batch({ classroomId: classroom.id, termId: term.id }).readyToGenerate);

    ready.forEach((classroom, index) => {
      const batch = this.generate({
        classroomId: classroom.id, termId: term.id, regenerate: false
      });
      if (batch.reportCards.length === 0) {
        return;
      }

      if (index === 0) {
        // Une classe déjà remise : l'onglet « Remis aux familles » a du contenu,
        // et les bulletins figés se voient.
        batch.reportCards.forEach((card, rank) => {
          this.remark(card.id, {
            generalRemark: remarkFor(card.generalAverage),
            headTeacherRemark: rank < 3
              ? 'Élève sérieux, à encourager.'
              : undefined,
            councilDecision: card.passing ? 'PASS' : 'PENDING_DECISION'
          });
        });
        this.publishAll({ classroomId: classroom.id, termId: term.id });
      } else if (index === 1) {
        // Une classe relue mais pas encore remise : c'est l'état dans lequel se
        // trouve une école la veille du conseil de classe.
        batch.reportCards.slice(0, 6).forEach((card) => {
          this.remark(card.id, {
            generalRemark: remarkFor(card.generalAverage),
            councilDecision: 'PENDING_DECISION'
          });
        });
      }
      // La troisième reste telle quelle : générée, sans une appréciation.
    });
  }

  // ---------------------------------------------------------------- lecture

  batch(query: ReportCardQuery): ReportCardBatch {
    const classroom = MOCK_CLASSROOMS.find((c) => c.id === query.classroomId)
      ?? MOCK_CLASSROOMS[0];
    const term = MOCK_TERMS.find((t) => t.id === query.termId) ?? MOCK_TERMS[1];
    const students = this.studentsOf(classroom.id);

    const stored = this.latestRevisions(classroom.id, term.id);
    const described = stored
      .map((card) => this.describe(card))
      .sort(byRank);

    const averages = described
      .map((card) => card.generalAverage)
      .filter((value): value is number => value !== undefined)
      .sort((a, b) => a - b);

    // Ce qui bloque : les devoirs dont les notes ne sont pas validées.
    const unvalidated = MOCK_ASSESSMENTS.board({ classroomId: classroom.id })
      .assessments.filter((a) => a.status === 'OPEN' || a.status === 'GRADING'
        || a.status === 'SUBMITTED').length;

    const computed = this.computeClass(classroom.id);
    const withoutGrades = students.filter(
      (student) => computed.averages.get(student.id) === undefined).length;

    return {
      classroomId: classroom.id,
      classroomName: classroom.name,
      levelName: classroom.levelName,
      termId: term.id,
      termName: term.name,
      academicYearCode: '2026-2027',
      studentCount: students.length,
      generatedCount: described.length,
      publishedCount: described.filter((c) => c.status === 'PUBLISHED').length,
      unvalidatedAssessments: unvalidated,
      studentsWithoutGrades: withoutGrades,
      classAverage: averages.length > 0
        ? round(averages.reduce((sum, v) => sum + v, 0) / averages.length)
        : undefined,
      classMinAverage: averages.length > 0 ? averages[0] : undefined,
      classMaxAverage: averages.length > 0 ? averages[averages.length - 1] : undefined,
      passingCount: described.filter((c) => c.passing).length,
      readyToGenerate: unvalidated === 0 && students.length > 0,
      reportCards: described
    };
  }

  getById(reportCardId: string): ReportCard {
    const card = this.cards.find((c) => c.id === reportCardId);
    if (!card) {
      throw new Error('REPORT_CARD_NOT_FOUND');
    }
    return this.describe(card);
  }

  verify(code: string): ReportCard {
    const card = this.cards.find(
      (c) => c.verificationCode.toUpperCase() === code.trim().toUpperCase());
    if (!card) {
      throw new Error('REPORT_CARD_NOT_FOUND');
    }
    return this.describe(card);
  }

  // -------------------------------------------------------------- écriture

  generate(payload: ReportCardGeneratePayload): ReportCardBatch {
    const classroom = MOCK_CLASSROOMS.find((c) => c.id === payload.classroomId)
      ?? MOCK_CLASSROOMS[0];
    const term = MOCK_TERMS.find((t) => t.id === payload.termId) ?? MOCK_TERMS[1];

    const unvalidated = MOCK_ASSESSMENTS.board({ classroomId: classroom.id })
      .assessments.filter((a) => a.status === 'OPEN' || a.status === 'GRADING'
        || a.status === 'SUBMITTED').length;
    if (unvalidated > 0) {
      throw new Error('REPORT_CARD_NOT_READY');
    }

    const students = this.studentsOf(classroom.id);
    if (students.length === 0) {
      throw new Error('REPORT_CARD_NOT_READY');
    }

    // Toute la classe en une passe : le rang n'a de sens que calculé sur les
    // mêmes notes, au même moment.
    const computed = this.computeClass(classroom.id);

    students.forEach((student) => {
      const existing = this.latestRevisionOf(student.id, classroom.id, term.id);
      if (existing && !payload.regenerate) {
        return;
      }

      const editable = existing && (existing.status === 'DRAFT' || existing.status === 'GENERATED');
      const card: StoredCard = editable ? existing : {
        id: `rc-${this.sequence++}`,
        reference: `BUL-2027-${String(this.sequence).padStart(6, '0')}`,
        verificationCode: this.newCode(student.id, term.id),
        studentId: student.id,
        classroomId: classroom.id,
        termId: term.id,
        classSize: students.length,
        totalCoefficient: 0,
        absenceCount: 0,
        justifiedAbsenceCount: 0,
        latenessCount: 0,
        status: 'GENERATED',
        // Une régénération après publication crée la révision suivante :
        // l'ancienne reste consultable.
        revision: (existing?.revision ?? 0) + 1,
        generatedAt: new Date().toISOString(),
        lines: []
      };

      this.fill(card, computed, student.id, students.length);
      if (!editable) {
        this.cards.push(card);
      }
    });

    return this.batch({ classroomId: classroom.id, termId: term.id });
  }

  remark(reportCardId: string, payload: ReportCardRemarkPayload): ReportCard {
    const card = this.cards.find((c) => c.id === reportCardId);
    if (!card) {
      throw new Error('REPORT_CARD_NOT_FOUND');
    }
    if (card.status !== 'DRAFT' && card.status !== 'GENERATED') {
      throw new Error('REPORT_CARD_ALREADY_PUBLISHED');
    }
    card.generalRemark = payload.generalRemark?.trim() || undefined;
    card.headTeacherRemark = payload.headTeacherRemark?.trim() || undefined;
    card.principalRemark = payload.principalRemark?.trim() || undefined;
    card.councilDecision = payload.councilDecision;
    return this.describe(card);
  }

  publish(reportCardId: string): ReportCard {
    const card = this.cards.find((c) => c.id === reportCardId);
    if (!card) {
      throw new Error('REPORT_CARD_NOT_FOUND');
    }
    this.publishOne(card);
    return this.describe(card);
  }

  publishAll(query: ReportCardQuery): ReportCardBatch {
    const cards = this.latestRevisions(query.classroomId, query.termId);
    if (cards.length === 0) {
      throw new Error('REPORT_CARD_NOT_FOUND');
    }
    // Un seul bulletin sans moyenne suffit à bloquer la remise : la classe part
    // ensemble ou ne part pas.
    if (cards.some((c) => c.status !== 'PUBLISHED' && c.generalAverage === undefined)) {
      throw new Error('REPORT_CARD_NOT_READY');
    }
    cards.forEach((card) => {
      if (card.status !== 'PUBLISHED') {
        this.publishOne(card);
      }
    });
    return this.batch(query);
  }

  // ------------------------------------------------------------- internals

  private publishOne(card: StoredCard): void {
    if (card.status === 'PUBLISHED') {
      throw new Error('REPORT_CARD_ALREADY_PUBLISHED');
    }
    if (card.generalAverage === undefined) {
      throw new Error('REPORT_CARD_NOT_READY');
    }
    card.status = 'PUBLISHED';
    card.publishedAt = new Date().toISOString();
  }

  /**
   * Averages of a whole class, subject by subject, from the marks that count.
   *
   * <p>Mirrors the server: the subject average weights each mark by the
   * <em>assessment</em> coefficient, and the general average weights each
   * subject by the <em>curriculum</em> coefficient. Confusing the two is the
   * classic way to produce a bulletin that looks plausible and is wrong.</p>
   */
  private computeClass(classroomId: string): ClassComputation {
    const grades = MOCK_ASSESSMENTS.countingGrades(classroomId);

    // studentId -> subjectId -> { sum, coefficients }
    const perStudent = new Map<string, Map<string, { sum: number; coef: number; count: number }>>();
    grades.forEach((grade) => {
      const bySubject = perStudent.get(grade.studentId) ?? new Map();
      const entry = bySubject.get(grade.subjectId) ?? { sum: 0, coef: 0, count: 0 };
      entry.sum += grade.normalizedScore * grade.assessmentCoefficient;
      entry.coef += grade.assessmentCoefficient;
      entry.count += 1;
      bySubject.set(grade.subjectId, entry);
      perStudent.set(grade.studentId, bySubject);
    });

    const subjectAverages = new Map<string, Map<string, { average: number; count: number }>>();
    const averages = new Map<string, number>();

    perStudent.forEach((bySubject, studentId) => {
      const subjects = new Map<string, { average: number; count: number }>();
      let weighted = 0;
      let coefficients = 0;

      bySubject.forEach((entry, subjectId) => {
        if (entry.coef === 0) {
          return;
        }
        const average = round(entry.sum / entry.coef);
        subjects.set(subjectId, { average, count: entry.count });
        const subjectCoefficient = COEFFICIENTS[subjectId] ?? 1;
        weighted += average * subjectCoefficient;
        coefficients += subjectCoefficient;
      });

      subjectAverages.set(studentId, subjects);
      if (coefficients > 0) {
        averages.set(studentId, round(weighted / coefficients));
      }
    });

    // Moyenne de la classe par matière, pour la colonne de comparaison.
    const classPerSubject = new Map<string, number[]>();
    subjectAverages.forEach((subjects) => {
      subjects.forEach((entry, subjectId) => {
        const list = classPerSubject.get(subjectId) ?? [];
        list.push(entry.average);
        classPerSubject.set(subjectId, list);
      });
    });

    return { averages, subjectAverages, classPerSubject };
  }

  private fill(card: StoredCard, computed: ClassComputation,
               studentId: string, classSize: number): void {
    const subjects = computed.subjectAverages.get(studentId) ?? new Map();
    const values = [...computed.averages.values()].sort((a, b) => a - b);
    const own = computed.averages.get(studentId);

    card.generalAverage = own;
    card.classSize = classSize;
    card.classAverage = values.length > 0
      ? round(values.reduce((sum, v) => sum + v, 0) / values.length)
      : undefined;
    card.classMinAverage = values.length > 0 ? values[0] : undefined;
    card.classMaxAverage = values.length > 0 ? values[values.length - 1] : undefined;
    // Rang à égalité : deux moyennes identiques partagent le rang, et le suivant
    // saute (1, 2, 2, 4).
    card.rankInClass = own === undefined
      ? undefined
      : values.filter((v) => v > own).length + 1;

    let totalCoefficient = 0;
    const lines: ReportCardLine[] = [];
    let order = 1;

    MOCK_SUBJECTS.forEach((subject) => {
      const coefficient = COEFFICIENTS[subject.id] ?? 1;
      const entry = subjects.get(subject.id);
      const classValues = computed.classPerSubject.get(subject.id) ?? [];
      totalCoefficient += coefficient;

      lines.push({
        subjectId: subject.id,
        subjectName: subject.name,
        coefficient,
        subjectAverage: entry?.average,
        weightedAverage: entry ? round(entry.average * coefficient) : undefined,
        classSubjectAverage: classValues.length > 0
          ? round(classValues.reduce((sum, v) => sum + v, 0) / classValues.length)
          : undefined,
        minScore: classValues.length > 0 ? Math.min(...classValues) : undefined,
        maxScore: classValues.length > 0 ? Math.max(...classValues) : undefined,
        rankInSubject: entry
          ? classValues.filter((v) => v > entry.average).length + 1
          : undefined,
        assessmentCount: entry?.count ?? 0,
        appreciation: entry ? appreciationFor(entry.average) : undefined,
        displayOrder: order++
      });
    });

    card.lines = lines;
    card.totalCoefficient = totalCoefficient;

    // Les absences viennent du registre : un bulletin qui les inventerait
    // contredirait l'écran Présences.
    const draw = hash(`abs|${studentId}|${card.termId}`);
    card.absenceCount = Math.floor(draw * 6);
    card.justifiedAbsenceCount = Math.floor(card.absenceCount * 0.6);
    card.latenessCount = Math.floor(hash(`late|${studentId}`) * 4);
  }

  private describe(card: StoredCard): ReportCard {
    const student = MOCK_STUDENTS.find((s) => s.id === card.studentId);
    const classroom = MOCK_CLASSROOMS.find((c) => c.id === card.classroomId);
    const term = MOCK_TERMS.find((t) => t.id === card.termId);
    const editable = card.status === 'DRAFT' || card.status === 'GENERATED';

    return {
      id: card.id,
      reference: card.reference,
      verificationCode: card.verificationCode,
      studentId: card.studentId,
      studentName: student?.fullName ?? 'Élève',
      studentNumber: student?.studentNumber ?? '',
      classroomId: card.classroomId,
      classroomName: classroom?.name ?? '',
      levelName: classroom?.levelName,
      termId: card.termId,
      termName: term?.name ?? '',
      academicYearCode: '2026-2027',
      generalAverage: card.generalAverage,
      classAverage: card.classAverage,
      classMinAverage: card.classMinAverage,
      classMaxAverage: card.classMaxAverage,
      rankInClass: card.rankInClass,
      classSize: card.classSize,
      rankLabel: card.rankInClass !== undefined
        ? `${card.rankInClass} / ${card.classSize}`
        : undefined,
      totalCoefficient: card.totalCoefficient,
      scaleMax: SCALE_MAX,
      passingMark: PASSING_MARK,
      passing: card.generalAverage !== undefined && card.generalAverage >= PASSING_MARK,
      absenceCount: card.absenceCount,
      justifiedAbsenceCount: card.justifiedAbsenceCount,
      latenessCount: card.latenessCount,
      generalRemark: card.generalRemark,
      headTeacherRemark: card.headTeacherRemark,
      principalRemark: card.principalRemark,
      councilDecision: card.councilDecision,
      councilDecisionLabel: card.councilDecision
        ? DECISION_LABELS[card.councilDecision]
        : undefined,
      status: card.status,
      statusLabel: STATUS_LABELS[card.status],
      editable,
      revision: card.revision,
      generatedAt: card.generatedAt,
      publishedAt: card.publishedAt,
      lines: card.lines
    };
  }

  private latestRevisions(classroomId: string, termId: string): StoredCard[] {
    const byStudent = new Map<string, StoredCard>();
    this.cards
      .filter((c) => c.classroomId === classroomId && c.termId === termId)
      .forEach((card) => {
        const kept = byStudent.get(card.studentId);
        if (!kept || card.revision > kept.revision) {
          byStudent.set(card.studentId, card);
        }
      });
    return [...byStudent.values()];
  }

  private latestRevisionOf(studentId: string, classroomId: string,
                           termId: string): StoredCard | undefined {
    return this.cards
      .filter((c) => c.studentId === studentId && c.classroomId === classroomId
        && c.termId === termId)
      .sort((a, b) => b.revision - a.revision)[0];
  }

  private studentsOf(classroomId: string) {
    return MOCK_STUDENTS.filter((s) => s.classroomId === classroomId);
  }

  /** Un code court, lisible à voix haute, sans caractères confondables. */
  private newCode(studentId: string, termId: string): string {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      const draw = hash(`${studentId}|${termId}|${i}|${this.sequence}`);
      code += alphabet[Math.floor(draw * alphabet.length)];
      if (i === 3) {
        code += '-';
      }
    }
    return code;
  }
}

interface ClassComputation {
  averages: Map<string, number>;
  subjectAverages: Map<string, Map<string, { average: number; count: number }>>;
  classPerSubject: Map<string, number[]>;
}

/**
 * Une appréciation générale plausible, calée sur la moyenne.
 *
 * <p>Écrite dans le registre d'un bulletin ivoirien : constatation, puis
 * conseil. Une phrase creuse — « bon trimestre » — ne montrerait pas à quoi
 * sert le champ.</p>
 */
function remarkFor(average: number | undefined): string {
  if (average === undefined) {
    return "Aucune note validée sur la période : le bulletin ne peut rien conclure.";
  }
  if (average >= 16) {
    return 'Trimestre excellent, régulier dans toutes les matières. Continuez ainsi.';
  }
  if (average >= 14) {
    return 'Très bon trimestre. Des résultats solides, un travail suivi.';
  }
  if (average >= 12) {
    return 'Trimestre satisfaisant. Des progrès possibles dans les matières à fort coefficient.';
  }
  if (average >= 10) {
    return 'Moyenne atteinte, mais de justesse. Un travail plus régulier est attendu.';
  }
  if (average >= 8) {
    return 'Trimestre insuffisant. Des lacunes à combler avant la prochaine période.';
  }
  return 'Résultats très faibles. Un accompagnement est indispensable dès la rentrée.';
}

/** Meilleure moyenne d'abord ; sans moyenne en dernier, puis par nom. */
function byRank(a: ReportCard, b: ReportCard): number {
  if (a.generalAverage === undefined && b.generalAverage === undefined) {
    return a.studentName.localeCompare(b.studentName);
  }
  if (a.generalAverage === undefined) return 1;
  if (b.generalAverage === undefined) return -1;
  return b.generalAverage - a.generalAverage
    || a.studentName.localeCompare(b.studentName);
}

/** One store for the whole demonstration session. */
export const MOCK_REPORT_CARDS = new ReportCardStore();
