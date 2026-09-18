/** Emploi du temps : grille hebdomadaire et détection des conflits. */

export type TimetableScope = 'CLASSROOM' | 'TEACHER' | 'ROOM';

export type ConflictKind =
  | 'TEACHER_BUSY'
  | 'CLASS_BUSY'
  | 'ROOM_BUSY'
  | 'TEACHER_NOT_ASSIGNED'
  | 'INVALID_TIME_RANGE';

export interface TimetableSlot {
  id: string;
  timetableId?: string;
  dayOfWeek: string;
  /** Format HH:mm ou HH:mm:ss selon la sérialisation Java. */
  startTime: string;
  endTime: string;
  durationMinutes: number;
  subjectId: string;
  subjectName: string;
  subjectShortName?: string;
  subjectColor?: string;
  teacherId: string;
  teacherName: string;
  roomId?: string;
  roomName?: string;
  classroomId: string;
  classroomName: string;
  slotType: string;
  note?: string;
}

export interface TimetableGrid {
  scope: TimetableScope;
  scopeId: string;
  scopeLabel: string;
  timetableId?: string;
  status?: string;
  editable: boolean;
  days: string[];
  dayStart: string;
  dayEnd: string;
  stepMinutes: number;
  slots: TimetableSlot[];
  totalMinutes: number;
}

export interface TimetableConflict {
  kind: ConflictKind;
  message: string;
  conflictingSlotId?: string;
  conflictingLabel?: string;
  conflictingStart?: string;
  conflictingEnd?: string;
}

export interface PaletteEntry {
  subjectId: string;
  subjectName: string;
  subjectShortName?: string;
  subjectColor?: string;
  teacherId: string;
  teacherName: string;
  weeklyHours?: number;
  placedMinutes: number;
  complete: boolean;
  /** Salle habituelle de la classe, proposée quand le cours est posé. */
  roomId?: string;
  roomName?: string;
}

export interface SlotUpsertPayload {
  classroomId: string;
  subjectId: string;
  teacherId: string;
  roomId?: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  slotType?: string;
  note?: string;
  termId?: string;
}

/** Libellés français des jours, dans l'ordre de la semaine. */
export const DAY_LABELS: Record<string, string> = {
  MONDAY: 'Lundi',
  TUESDAY: 'Mardi',
  WEDNESDAY: 'Mercredi',
  THURSDAY: 'Jeudi',
  FRIDAY: 'Vendredi',
  SATURDAY: 'Samedi',
  SUNDAY: 'Dimanche'
};

/** Messages courts par type de conflit, pour l'infobulle de la case refusée. */
export const CONFLICT_LABELS: Record<ConflictKind, string> = {
  TEACHER_BUSY: 'Enseignant occupé',
  CLASS_BUSY: 'Classe occupée',
  ROOM_BUSY: 'Salle réservée',
  TEACHER_NOT_ASSIGNED: 'Enseignant non affecté',
  INVALID_TIME_RANGE: 'Horaire invalide'
};
