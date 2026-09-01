/** Life of a report card. Only DRAFT and GENERATED accept a change. */
export type ReportCardStatus = 'DRAFT' | 'GENERATED' | 'VALIDATED' | 'PUBLISHED' | 'ARCHIVED';

/** The class council's outcome for a pupil. */
export type CouncilDecision =
  | 'PASS' | 'REPEAT' | 'PROMOTED' | 'GRADUATED'
  | 'TRANSFER_RECOMMENDED' | 'ORIENTATION_REQUIRED' | 'PENDING_DECISION';

export interface ReportCardLine {
  subjectId?: string;
  /** Le nom figé à la génération : renommer la matière ne réécrit pas le bulletin. */
  subjectName: string;
  teacherName?: string;
  coefficient: number;
  /** Nulle quand la matière n'a aucune note validée sur la période. */
  subjectAverage?: number;
  weightedAverage?: number;
  classSubjectAverage?: number;
  minScore?: number;
  maxScore?: number;
  rankInSubject?: number;
  assessmentCount: number;
  appreciation?: string;
  displayOrder: number;
}

export interface ReportCard {
  id: string;
  reference: string;
  verificationCode: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  photoUrl?: string;
  classroomId: string;
  classroomName: string;
  levelName?: string;
  termId: string;
  termName: string;
  academicYearCode: string;
  generalAverage?: number;
  classAverage?: number;
  classMinAverage?: number;
  classMaxAverage?: number;
  rankInClass?: number;
  classSize?: number;
  rankLabel?: string;
  totalCoefficient?: number;
  scaleMax?: number;
  passingMark?: number;
  passing: boolean;
  absenceCount: number;
  justifiedAbsenceCount: number;
  latenessCount: number;
  generalRemark?: string;
  headTeacherRemark?: string;
  principalRemark?: string;
  councilDecision?: CouncilDecision;
  councilDecisionLabel?: string;
  status: ReportCardStatus;
  statusLabel: string;
  editable: boolean;
  revision: number;
  generatedAt?: string;
  publishedAt?: string;
  lines: ReportCardLine[];
}

export interface ReportCardBatch {
  classroomId: string;
  classroomName: string;
  levelName?: string;
  termId: string;
  termName: string;
  academicYearCode: string;
  studentCount: number;
  generatedCount: number;
  publishedCount: number;
  /** Devoirs de la période dont les notes ne sont pas validées. */
  unvalidatedAssessments: number;
  studentsWithoutGrades: number;
  classAverage?: number;
  classMinAverage?: number;
  classMaxAverage?: number;
  passingCount: number;
  readyToGenerate: boolean;
  reportCards: ReportCard[];
}

export interface ReportCardQuery {
  classroomId: string;
  termId: string;
}

export interface ReportCardGeneratePayload {
  classroomId: string;
  termId: string;
  regenerate: boolean;
}

export interface ReportCardRemarkPayload {
  generalRemark?: string;
  headTeacherRemark?: string;
  principalRemark?: string;
  councilDecision?: CouncilDecision;
}

/**
 * The council's decisions, in the order a French-system school considers them.
 *
 * <p>« Décision en attente » is first because it is the honest default: a
 * report card generated before the council has met has no decision, and
 * pre-filling « Admis » would put words in the council's mouth.</p>
 */
export const COUNCIL_DECISIONS: ReadonlyArray<{
  code: CouncilDecision;
  label: string;
  hint: string;
}> = [
  { code: 'PENDING_DECISION', label: 'Décision en attente',
    hint: "Le conseil ne s'est pas encore prononcé." },
  { code: 'PASS', label: 'Admis',
    hint: "L'élève a la moyenne et passe." },
  { code: 'PROMOTED', label: 'Passe en classe supérieure',
    hint: 'Passage décidé par le conseil, moyenne atteinte ou non.' },
  { code: 'REPEAT', label: 'Redouble',
    hint: "L'élève reprend le même niveau l'année prochaine." },
  { code: 'ORIENTATION_REQUIRED', label: 'Orientation à décider',
    hint: 'Le conseil demande un entretien avant de trancher.' },
  { code: 'TRANSFER_RECOMMENDED', label: 'Réorientation conseillée',
    hint: "Le conseil recommande un autre établissement ou une autre filière." },
  { code: 'GRADUATED', label: 'Fin de cycle',
    hint: "L'élève achève le cycle : il ne se réinscrit pas au même niveau." }
];

/** How each state looks on the board. */
export const REPORT_CARD_STATES: ReadonlyArray<{
  code: ReportCardStatus;
  label: string;
  tone: 'todo' | 'review' | 'done' | 'off';
}> = [
  { code: 'DRAFT', label: 'Brouillon', tone: 'off' },
  { code: 'GENERATED', label: 'Généré', tone: 'review' },
  { code: 'VALIDATED', label: 'Validé', tone: 'review' },
  { code: 'PUBLISHED', label: 'Remis aux familles', tone: 'done' },
  { code: 'ARCHIVED', label: 'Archivé', tone: 'off' }
];
