/** Creation et suivi des classes. */

/**
 * Un niveau vu sous l'angle du remplissage.
 *
 * L'assistant de configuration demande un nombre de classes par niveau avant
 * qu'aucun eleve n'existe : c'est une estimation. Cette vue confronte
 * l'estimation au reel et propose directement la classe suivante.
 */
export interface LevelCapacity {
  levelId: string;
  levelName: string;
  levelCode: string;
  cycleName: string;
  sequence: number;
  classroomCount: number;
  totalCapacity: number;
  totalEnrolled: number;
  availableSeats: number;
  occupancyRate: number;
  needsMoreClasses: boolean;
  suggestedName: string;
  suggestedCode: string;
  suggestedCapacity: number;
}

export interface ClassroomCreatePayload {
  levelId: string;
  campusId?: string;
  academicYearId?: string;
  code?: string;
  name?: string;
  section?: string;
  capacityMaximum: number;
  capacityWarningThreshold?: number;
  mainTeacherId?: string;
  defaultRoomId?: string;
  languageOfInstruction?: string;
  activateImmediately?: boolean;
}

export interface ClassroomBulkCreatePayload {
  levelId: string;
  campusId?: string;
  academicYearId?: string;
  count: number;
  capacityMaximum: number;
  capacityWarningThreshold?: number;
  activateImmediately?: boolean;
}

export interface ClassroomUpdatePayload {
  name: string;
  section?: string;
  capacityMaximum: number;
  capacityWarningThreshold?: number;
  mainTeacherId?: string;
  defaultRoomId?: string;
  languageOfInstruction?: string;
}
