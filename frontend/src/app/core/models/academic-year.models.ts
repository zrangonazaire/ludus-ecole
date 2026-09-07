/** Années scolaires et découpage en périodes. */

export type AcademicYearStatus =
  | 'DRAFT' | 'OPEN' | 'ACTIVE' | 'CLOSING' | 'CLOSED' | 'ARCHIVED';

export type TermType = 'TERM' | 'SEMESTER' | 'TRIMESTER' | 'CUSTOM';

export type TermStatus =
  | 'PLANNED' | 'OPEN' | 'GRADE_ENTRY' | 'VALIDATION' | 'CLOSED';

export interface Term {
  id: string;
  name: string;
  code: string;
  termType: TermType;
  termTypeLabel: string;
  sequence: number;
  startDate: string;
  endDate: string;
  status: TermStatus;
  statusLabel: string;
  /** Chaîne et non nombre : le serveur envoie un décimal exact. */
  weight: string;
}

export interface AcademicYear {
  id: string;
  code: string;
  label: string;
  startDate: string;
  endDate: string;
  status: AcademicYearStatus;
  statusLabel: string;
  active: boolean;
  editable: boolean;
  classroomCount: number;
  enrollmentCount: number;
  terms: Term[];
}

export interface AcademicYearCreatePayload {
  code: string;
  label?: string;
  startDate: string;
  endDate: string;
  termType: TermType;
  termCount: number;
}

export const TERM_TYPES: ReadonlyArray<{
  code: TermType; label: string; defaultCount: number
}> = [
  { code: 'TRIMESTER', label: 'Trimestres', defaultCount: 3 },
  { code: 'SEMESTER', label: 'Semestres', defaultCount: 2 },
  { code: 'TERM', label: 'Périodes', defaultCount: 4 },
  { code: 'CUSTOM', label: 'Découpage libre', defaultCount: 3 }
];
