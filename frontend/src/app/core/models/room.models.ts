/**
 * Salles physiques : bâtiments, étages, capacités.
 *
 * <p>Les bâtiments sont enregistrés séparément. Les salles conservent leur
 * libellé de bâtiment pour rester compatibles avec les anciennes saisies.</p>
 *
 * <p>Ces salles-ci sont des lieux (emploi du temps, salle par défaut d'une
 * classe). La capacité d'une <em>classe</em> est une autre notion, gérée par
 * l'écran Classes.</p>
 */
export type RoomType =
  | 'CLASSROOM'
  | 'SCIENCE_LAB'
  | 'COMPUTER_LAB'
  | 'LIBRARY'
  | 'AMPHITHEATRE'
  | 'SPORTS_HALL'
  | 'WORKSHOP'
  | 'CAFETERIA'
  | 'OFFICE'
  | 'OTHER';

export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  CLASSROOM: 'Salle de classe',
  SCIENCE_LAB: 'Laboratoire de sciences',
  COMPUTER_LAB: 'Salle informatique',
  LIBRARY: 'Bibliothèque',
  AMPHITHEATRE: 'Amphithéâtre',
  SPORTS_HALL: 'Gymnase',
  WORKSHOP: 'Atelier',
  CAFETERIA: 'Cantine',
  OFFICE: 'Bureau',
  OTHER: 'Autre / polyvalente'
};

/** Ordre d'affichage des types dans les listes déroulantes. */
export const ROOM_TYPE_ORDER: RoomType[] = [
  'CLASSROOM', 'SCIENCE_LAB', 'COMPUTER_LAB', 'LIBRARY', 'AMPHITHEATRE',
  'SPORTS_HALL', 'WORKSHOP', 'CAFETERIA', 'OFFICE', 'OTHER'
];

export interface Room {
  levelId?: string;
  buildingId?: string;
  id: string;
  campusId: string;
  campusCode: string;
  campusName: string;
  code: string;
  name: string;
  building?: string;
  floor?: string;
  /** Places assises ; 0 quand la capacité n'est pas connue. */
  capacity: number;
  roomType: RoomType;
  status: 'ACTIVE' | 'ARCHIVED';
  /** Cours actifs de l'emploi du temps dans cette salle. */
  timetableSlotCount: number;
  /** Classes actives qui ont cette salle par défaut. */
  defaultClassroomCount: number;
  /** Faux quand le serveur refuserait l'archivage (salle occupée). */
  archivable: boolean;
}

export interface RoomCampusOption {
  id: string;
  code: string;
  name: string;
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface RoomOptions {
  campuses: RoomCampusOption[];
  roomTypes: RoomType[];
}

export interface RoomQuery {
  campusId?: string;
  building?: string;
  roomType?: string;
  search?: string;
  includeArchived?: boolean;
}

export interface RoomUpsertPayload {
  levelId?: string;
  campusId: string;
  code: string;
  name: string;
  building?: string;
  floor?: string;
  capacity: number;
  roomType: RoomType;
}

/** Une ligne « bâtiment » de l'écran : des salles et leur capacité totale. */
export interface BuildingGroup {
  key: string;
  label: string;
  campusLabel: string;
  rooms: Room[];
  seats: number;
  unknownCapacity: boolean;
}
