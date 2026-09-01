import { AttendanceStatus } from './common.models';

/** Life of one sheet. Only OPEN and SUBMITTED accept a correction. */
export type AttendanceSessionStatus = 'OPEN' | 'SUBMITTED' | 'VALIDATED' | 'LOCKED';

/** What the follow-up list shows. The counters above it never move. */
export type AbsenceFilter = 'ALL' | 'UNJUSTIFIED' | 'FOLLOW_UP' | 'JUSTIFIED' | 'LATENESS';

/** Where one class stands for one day. */
export interface ClassroomAttendance {
  classroomId: string;
  classroomName: string;
  levelName?: string;
  mainTeacherName?: string;
  expectedCount: number;
  sheetId?: string;
  status?: AttendanceSessionStatus;
  statusLabel?: string;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  done: boolean;
  submittedAt?: string;
}

export interface AttendanceDay {
  date: string;
  academicYearId: string;
  termId?: string;
  termName?: string;
  classroomCount: number;
  sheetsDone: number;
  expectedCount: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  /** Nul tant qu'aucune classe n'a été appelée : un taux sans appel serait faux. */
  attendanceRate?: number;
  classrooms: ClassroomAttendance[];
}

/** One absence or lateness in the follow-up list. */
export interface Absence {
  id: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  photoUrl?: string;
  classroomId: string;
  classroomName: string;
  date: string;
  status: AttendanceStatus;
  statusLabel: string;
  arrivalTime?: string;
  minutesLate?: number;
  reason?: string;
  justified: boolean;
  justificationDocumentUrl?: string;
  daysWaiting: number;
  needsFollowUp: boolean;
  guardianNotified: boolean;
}

export interface AbsenceDigest {
  from: string;
  to: string;
  absenceCount: number;
  latenessCount: number;
  justifiedCount: number;
  unjustifiedCount: number;
  followUpCount: number;
  studentCount: number;
  repeatedCount: number;
  attendanceRate?: number;
  entries: Absence[];
}

export interface AbsenceQuery {
  from?: string;
  to?: string;
  classroomId?: string;
  filter?: AbsenceFilter;
}

export interface JustifyPayload {
  reason: string;
  documentUrl?: string;
}

/** A mark, with the wording and the shorthand the roll call buttons use. */
export interface AttendanceMark {
  code: AttendanceStatus;
  label: string;
  short: string;
  /** Drives the colour, so the same meaning looks the same everywhere. */
  tone: 'ok' | 'absent' | 'late' | 'other';
  hint: string;
}

/**
 * The six marks, in the order they are needed.
 *
 * <p>Present first because it is the answer for nine pupils in ten, and the
 * excused variants last: on the morning of the roll call nobody knows yet
 * whether an absence will be justified — that is decided days later, at the
 * office, with a slip in hand.</p>
 */
export const ATTENDANCE_MARKS: readonly AttendanceMark[] = [
  { code: 'PRESENT', label: 'Présent', short: 'P', tone: 'ok',
    hint: 'En classe à l\'heure.' },
  { code: 'ABSENT', label: 'Absent', short: 'A', tone: 'absent',
    hint: 'Absent sans justificatif pour l\'instant. La famille est prévenue.' },
  { code: 'LATE', label: 'En retard', short: 'R', tone: 'late',
    hint: 'Arrivé après le début. Indiquez l\'heure : c\'est elle qui rend le retard mesurable.' },
  { code: 'LEFT_EARLY', label: 'Parti avant la fin', short: 'D', tone: 'other',
    hint: 'Présent puis reparti. Compte comme présent au taux de présence.' },
  { code: 'EXCUSED_ABSENCE', label: 'Absence justifiée', short: 'AJ', tone: 'absent',
    hint: 'À réserver aux absences déjà couvertes par un justificatif reçu.' },
  { code: 'EXCUSED_LATE', label: 'Retard justifié', short: 'RJ', tone: 'late',
    hint: 'Retard déjà couvert par un mot ou un justificatif.' }
];

/** Marks proposed on the roll call buttons; the rest passes by the office. */
export const QUICK_MARKS: readonly AttendanceStatus[] = ['PRESENT', 'ABSENT', 'LATE'];
