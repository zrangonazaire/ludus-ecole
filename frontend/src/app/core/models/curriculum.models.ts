/** Catalogue des matières et programme par niveau. */

export type SubjectCategoryCode =
  | 'SCIENCE' | 'LITERATURE' | 'LANGUAGE' | 'ARTS'
  | 'SPORT' | 'TECHNICAL' | 'RELIGION' | 'CIVICS' | 'OTHER';

export interface SubjectItem {
  id: string;
  code: string;
  name: string;
  shortName?: string;
  category: SubjectCategoryCode;
  categoryLabel: string;
  colorHex?: string;
  description?: string;
  graded: boolean;
  status: string;
  /** Nombre de niveaux qui portent cette matière au programme. */
  levelCount: number;
  deletable: boolean;
}

export interface SubjectUpsertPayload {
  code: string;
  name: string;
  shortName?: string;
  category: SubjectCategoryCode;
  colorHex?: string;
  description?: string;
  graded: boolean;
}

export interface CurriculumSubjectItem {
  id: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  subjectShortName?: string;
  subjectColor?: string;
  graded: boolean;
  coefficient: number;
  weeklyHours: number;
  mandatory: boolean;
  passingMark?: number;
  displayOrder: number;
  /** Vrai quand des évaluations existent : la matière ne peut plus être retirée. */
  locked: boolean;
}

export interface LevelCurriculum {
  levelId: string;
  levelName: string;
  levelCode: string;
  cycleId: string;
  cycleName: string;
  sequence: number;
  curriculumId?: string;
  subjectCount: number;
  totalCoefficient: number;
  totalWeeklyHours: number;
  /** Vrai quand le niveau porte au moins une matière notée. */
  ready: boolean;
  subjects: CurriculumSubjectItem[];
}

export interface CurriculumSubjectPayload {
  subjectId: string;
  coefficient: number;
  weeklyHours?: number;
  mandatory: boolean;
  passingMark?: number;
  displayOrder?: number;
}

export interface CurriculumApplyPayload {
  levelIds: string[];
  subjects: CurriculumSubjectPayload[];
  replaceExisting: boolean;
}

/** Libellés français des catégories, dans l'ordre d'affichage du formulaire. */
export const SUBJECT_CATEGORIES: ReadonlyArray<{ code: SubjectCategoryCode; label: string }> = [
  { code: 'SCIENCE', label: 'Sciences' },
  { code: 'LITERATURE', label: 'Lettres' },
  { code: 'LANGUAGE', label: 'Langues' },
  { code: 'ARTS', label: 'Arts' },
  { code: 'SPORT', label: 'Sport' },
  { code: 'TECHNICAL', label: 'Technique' },
  { code: 'RELIGION', label: 'Religion' },
  { code: 'CIVICS', label: 'Éducation civique' },
  { code: 'OTHER', label: 'Autre' }
];

/** Palette proposée à la création d'une matière. */
export const SUBJECT_COLORS: readonly string[] = [
  '#2563EB', '#7C3AED', '#0891B2', '#059669',
  '#D97706', '#DC2626', '#DB2777', '#475569'
];
