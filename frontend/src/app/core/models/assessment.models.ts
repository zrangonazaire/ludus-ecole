import { GradeStatus } from './common.models';

/** Life of a paper, from the day it is announced to the day families see it. */
export type AssessmentStatus =
  | 'DRAFT' | 'PLANNED' | 'OPEN' | 'GRADING'
  | 'SUBMITTED' | 'VALIDATED' | 'PUBLISHED' | 'CANCELLED';

export type AssessmentTypeCode =
  | 'HOMEWORK' | 'QUIZ' | 'TEST' | 'EXAM' | 'ORAL'
  | 'PRACTICAL' | 'PROJECT' | 'CONTINUOUS_ASSESSMENT' | 'OTHER';

export interface AssessmentItem {
  id: string;
  title: string;
  description?: string;
  classroomId: string;
  classroomName: string;
  subjectId: string;
  subjectName: string;
  subjectColor?: string;
  teacherId: string;
  teacherName: string;
  termId: string;
  termName: string;
  assessmentType: AssessmentTypeCode;
  assessmentTypeLabel: string;
  assessmentDate: string;
  durationMinutes?: number;
  maxScore: number;
  coefficient: number;
  countsForAverage: boolean;
  status: AssessmentStatus;
  statusLabel: string;
  studentCount: number;
  gradedCount: number;
  /** Nulle tant qu'aucune note n'est saisie : zéro serait un mensonge. */
  classAverage?: number;
  gradeEntryOpen: boolean;
  readyForNextStep: boolean;
}

export interface AssessmentBoard {
  academicYearId: string;
  termId?: string;
  termName?: string;
  termStart?: string;
  termEnd?: string;
  total: number;
  plannedCount: number;
  gradingCount: number;
  awaitingValidationCount: number;
  awaitingPublicationCount: number;
  publishedCount: number;
  overdueCount: number;
  assessments: AssessmentItem[];
}

export interface GradeRow {
  id?: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  photoUrl?: string;
  score?: number;
  normalizedScore?: number;
  absent: boolean;
  exempted: boolean;
  comment?: string;
  status: GradeStatus;
  statusLabel: string;
  requiresJustifiedCorrection: boolean;
  revisionCount: number;
}

export interface GradeSheet {
  assessment: AssessmentItem;
  classAverage?: number;
  median?: number;
  minScore?: number;
  maxScoreObtained?: number;
  passCount: number;
  absentCount: number;
  exemptedCount: number;
  /** Élèves sans note ni absence : tant qu'il en reste, rien ne se soumet. */
  missingCount: number;
  rows: GradeRow[];
}

export interface AssessmentQuery {
  termId?: string;
  classroomId?: string;
  subjectId?: string;
  status?: AssessmentStatus;
}

export interface AssessmentUpsertPayload {
  classroomId: string;
  subjectId: string;
  teacherId: string;
  termId?: string;
  title: string;
  description?: string;
  assessmentType: AssessmentTypeCode;
  assessmentDate: string;
  durationMinutes?: number;
  maxScore: number;
  coefficient: number;
  countsForAverage: boolean;
}

export interface GradeEntryPayload {
  studentId: string;
  score?: number;
  absent: boolean;
  exempted: boolean;
  comment?: string;
}

export interface GradeCorrectionPayload {
  score?: number;
  absent: boolean;
  justification: string;
}

/* ------------------------------------------------- export / import des notes */

/**
 * What the import will do to one line, once applied.
 *
 * <p>Six outcomes, not two. « Le fichier est valide » is useless to someone
 * about to overwrite thirty marks: what they need to know is which ones change,
 * which ones are refused, and why.</p>
 */
export type GradeImportRowStatus =
  /** La note du fichier diffère de celle enregistrée : elle sera écrite. */
  | 'CHANGED'
  /** Identique à ce qui est déjà là : rien à faire. */
  | 'UNCHANGED'
  /** Note illisible ou hors barème : la ligne est laissée telle quelle. */
  | 'INVALID'
  /** Matricule inconnu dans cette classe. */
  | 'UNKNOWN'
  /** Matricule présent deux fois dans le fichier. */
  | 'DUPLICATE'
  /** Note déjà validée : elle ne se corrige qu'avec un motif écrit. */
  | 'LOCKED';

export interface GradeImportRow {
  /** Le numéro de ligne du tableur, celui que l'utilisateur voit. */
  rowNumber: number;
  studentId?: string;
  studentNumber: string;
  studentName: string;
  currentScore?: number;
  currentAbsent: boolean;
  newScore?: number;
  newAbsent: boolean;
  comment?: string;
  status: GradeImportRowStatus;
  errors: string[];
  warnings: string[];
}

export interface GradeImportPreview {
  fileName: string;
  totalRows: number;
  changedRows: number;
  unchangedRows: number;
  invalidRows: number;
  unknownRows: number;
  lockedRows: number;
  /** Élèves de la classe absents du fichier : leur note ne bougera pas. */
  missingStudents: number;
  importable: boolean;
  rows: GradeImportRow[];
}

/** The kinds of paper a school actually sets, in the order they are needed. */
export const ASSESSMENT_TYPES: ReadonlyArray<{ code: AssessmentTypeCode; label: string }> = [
  { code: 'TEST', label: 'Devoir surveillé' },
  { code: 'QUIZ', label: 'Interrogation' },
  { code: 'EXAM', label: 'Composition' },
  { code: 'HOMEWORK', label: 'Devoir de maison' },
  { code: 'ORAL', label: 'Oral' },
  { code: 'PRACTICAL', label: 'Travaux pratiques' },
  { code: 'PROJECT', label: 'Projet' },
  { code: 'CONTINUOUS_ASSESSMENT', label: 'Contrôle continu' },
  { code: 'OTHER', label: 'Autre' }
];

/**
 * How each state looks, and what it means for the person reading the board.
 *
 * <p>The tone is not decoration: « à valider » and « publié » must not look
 * alike, because one is work waiting and the other is work finished.</p>
 */
export const ASSESSMENT_STATES: ReadonlyArray<{
  code: AssessmentStatus;
  label: string;
  tone: 'todo' | 'doing' | 'review' | 'done' | 'off';
  hint: string;
}> = [
  { code: 'DRAFT', label: 'Brouillon', tone: 'off',
    hint: "Le devoir n'est pas encore annoncé à la classe." },
  { code: 'PLANNED', label: 'Annoncé', tone: 'todo',
    hint: 'Annoncé, pas encore passé. Ouvrez la saisie le jour venu.' },
  { code: 'OPEN', label: 'Saisie ouverte', tone: 'doing',
    hint: 'La feuille est prête, aucune note saisie pour le moment.' },
  { code: 'GRADING', label: 'En correction', tone: 'doing',
    hint: 'La correction a commencé. Le compteur dit où elle en est.' },
  { code: 'SUBMITTED', label: 'À valider', tone: 'review',
    hint: "Le professeur a rendu ses notes. Elles attendent votre relecture." },
  { code: 'VALIDATED', label: 'Validé', tone: 'done',
    hint: 'Les notes comptent dans les moyennes. Les familles ne les voient pas encore.' },
  { code: 'PUBLISHED', label: 'Publié', tone: 'done',
    hint: 'Les familles voient les notes. Toute correction exige désormais un motif écrit.' },
  { code: 'CANCELLED', label: 'Annulé', tone: 'off',
    hint: "Le devoir n'a pas eu lieu et ne compte nulle part." }
];
