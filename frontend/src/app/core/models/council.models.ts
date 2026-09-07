/** The lifecycle of a class council. A closed council is a sealed record. */
export type CouncilStatus = 'PLANNED' | 'IN_PROGRESS' | 'CLOSED' | 'ARCHIVED';

/** A decision made for one active enrollment during a council. */
export type PromotionDecision =
  | 'PASS' | 'REPEAT' | 'PROMOTED' | 'GRADUATED'
  | 'TRANSFER_RECOMMENDED' | 'ORIENTATION_REQUIRED' | 'PENDING_DECISION';

export interface CouncilSummary {
  id: string;
  classroomId: string;
  classroomName: string;
  termId: string;
  termName: string;
  academicYearId: string;
  meetingDate: string;
  status: CouncilStatus;
  classAverage?: number;
  successRate?: number;
}

export interface CouncilParticipant {
  id: string;
  councilId: string;
  type: 'TEACHER' | 'STAFF' | 'GUARDIAN';
  personId: string;
  name: string;
  roleLabel: string;
  present: boolean;
}

export interface CouncilStudentDecision {
  decisionId?: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  enrollmentId: string;
  fromLevelId: string;
  fromLevelName: string;
  toLevelId?: string;
  toLevelName?: string;
  decision?: PromotionDecision;
  annualAverage?: number;
  justification?: string;
  orientationAdvice?: string;
  decidedAt?: string;
  decided: boolean;
}

export interface Council extends CouncilSummary {
  levelId: string;
  levelName: string;
  startTime?: string;
  endTime?: string;
  chairedBy?: string;
  location?: string;
  statusLabel: string;
  remarks?: string;
  minutesUrl?: string;
  closedAt?: string;
  editable: boolean;
  participants: CouncilParticipant[];
  students: CouncilStudentDecision[];
}

export interface CouncilQuery {
  academicYearId?: string;
  classroomId?: string;
  status?: CouncilStatus;
}

export interface CouncilCreatePayload {
  classroomId: string;
  termId: string;
  meetingDate: string;
  startTime?: string;
  endTime?: string;
  chairedBy?: string;
  location?: string;
}

export interface CouncilUpdatePayload {
  meetingDate?: string;
  startTime?: string;
  endTime?: string;
  chairedBy?: string;
  location?: string;
  remarks?: string;
  minutesUrl?: string;
}

export interface CouncilDecisionPayload {
  enrollmentId: string;
  decision: PromotionDecision;
  annualAverage?: number;
  justification?: string;
  orientationAdvice?: string;
  toLevelId?: string;
}

export interface CouncilParticipantPayload {
  roleLabel: string;
  teacherId?: string;
  staffId?: string;
  guardianId?: string;
  present: boolean;
}

/** The order used by a principal while the council examines each pupil. */
export const PROMOTION_DECISIONS: ReadonlyArray<{
  code: PromotionDecision;
  label: string;
  tone: 'todo' | 'done' | 'review' | 'warning' | 'danger';
}> = [
  { code: 'PENDING_DECISION', label: 'En attente', tone: 'todo' },
  { code: 'PASS', label: 'Admis', tone: 'done' },
  { code: 'PROMOTED', label: 'Passe en classe supérieure', tone: 'done' },
  { code: 'REPEAT', label: 'Redouble', tone: 'warning' },
  { code: 'ORIENTATION_REQUIRED', label: 'Orientation à décider', tone: 'review' },
  { code: 'TRANSFER_RECOMMENDED', label: 'Réorientation conseillée', tone: 'review' },
  { code: 'GRADUATED', label: 'Fin de cycle', tone: 'done' }
];

export const COUNCIL_STATES: ReadonlyArray<{
  code: CouncilStatus;
  label: string;
  tone: 'todo' | 'review' | 'done' | 'off';
}> = [
  { code: 'PLANNED', label: 'À venir', tone: 'todo' },
  { code: 'IN_PROGRESS', label: 'En cours', tone: 'review' },
  { code: 'CLOSED', label: 'Clos', tone: 'done' },
  { code: 'ARCHIVED', label: 'Archivé', tone: 'off' }
];
