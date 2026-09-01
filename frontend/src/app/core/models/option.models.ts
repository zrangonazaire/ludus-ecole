/** Les familles d'options que déclare un établissement. */
export type OptionCategory =
  | 'LANGUAGE' | 'ACADEMIC' | 'ARTS' | 'SPORT' | 'TECHNICAL' | 'OTHER';

/**
 * Life of a pupil's wish.
 *
 * <p>« Sur liste d'attente » n'est pas un refus : c'est un vœu recevable qu'une
 * place manque. La distinction compte, parce qu'une annulation libère une place
 * et que quelqu'un doit alors être appelé.</p>
 */
export type OptionChoiceStatus = 'REQUESTED' | 'CONFIRMED' | 'WAITLISTED' | 'CANCELLED';

/** Une option ouverte à un niveau, avec sa capacité et sa fenêtre de choix. */
export interface OptionOffering {
  id: string;
  optionId: string;
  levelId: string;
  levelCode: string;
  levelName: string;
  capacity: number;
  requestedCount: number;
  confirmedCount: number;
  waitlistedCount: number;
  /** Places restantes : négatif impossible, le serveur bascule en attente. */
  availableSeats: number;
  weeklyHours: number;
  choiceStartDate?: string;
  choiceEndDate?: string;
}

export interface AcademicOption {
  id: string;
  code: string;
  name: string;
  category: OptionCategory;
  categoryLabel: string;
  /** Code ISO de la langue, pour une LV1 ou une LV2. */
  languageCode?: string;
  description?: string;
  colorHex?: string;
  offerings: OptionOffering[];
  levelCount: number;
  totalCapacity: number;
  requestedCount: number;
  confirmedCount: number;
  waitlistedCount: number;
}

export interface OptionLevel {
  id: string;
  code: string;
  name: string;
  cycleName: string;
  sequence: number;
}

export interface OptionOverview {
  academicYearId: string;
  academicYearCode: string;
  levels: OptionLevel[];
  options: AcademicOption[];
  activeOptionCount: number;
  offeringCount: number;
  totalCapacity: number;
  confirmedCount: number;
  waitlistedCount: number;
}

export interface OptionChoice {
  id: string;
  offeringId: string;
  optionId: string;
  optionCode: string;
  optionName: string;
  optionColor?: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  photoUrl?: string;
  enrollmentId: string;
  classroomName: string;
  levelId: string;
  levelName: string;
  priority: number;
  status: OptionChoiceStatus;
  statusLabel: string;
  notes?: string;
  chosenAt: string;
  confirmedAt?: string;
}

export interface OptionChoiceQuery {
  offeringId?: string;
  levelId?: string;
  status?: OptionChoiceStatus;
  search?: string;
  page?: number;
  size?: number;
}

export interface OptionUpsertPayload {
  code: string;
  name: string;
  category: OptionCategory;
  languageCode?: string;
  description?: string;
  colorHex?: string;
}

export interface OptionOfferingsSavePayload {
  levelIds: string[];
  capacity: number;
  weeklyHours: number;
  choiceStartDate?: string;
  choiceEndDate?: string;
}

export interface OptionChoiceAssignPayload {
  studentId: string;
  offeringId: string;
  priority: number;
  notes?: string;
  /** Vrai pour confirmer d'emblée ; bascule en attente si la classe est pleine. */
  confirmImmediately: boolean;
}

/**
 * The categories, in the order a school declares them.
 *
 * <p>Les langues d'abord : dans un collège ivoirien, la LV1 et la LV2 sont les
 * seuls choix que tout le monde doit faire. Le reste est facultatif au sens
 * propre.</p>
 */
export const OPTION_CATEGORIES: ReadonlyArray<{
  code: OptionCategory;
  label: string;
  hint: string;
}> = [
  { code: 'LANGUAGE', label: 'Langue vivante',
    hint: 'LV1, LV2, ou une langue à option. Renseignez le code de la langue.' },
  { code: 'ACADEMIC', label: 'Enseignement optionnel',
    hint: 'Latin, grec, mathématiques renforcées : une matière en plus du tronc commun.' },
  { code: 'ARTS', label: 'Arts',
    hint: 'Arts plastiques, musique, théâtre.' },
  { code: 'SPORT', label: 'Sport',
    hint: 'Une pratique sportive choisie, distincte de l’EPS obligatoire.' },
  { code: 'TECHNICAL', label: 'Technique',
    hint: 'Informatique, technologie, ateliers professionnels.' },
  { code: 'OTHER', label: 'Autre', hint: 'Ce qui n’entre dans aucune des cases ci-dessus.' }
];

/** L'état d'un vœu, avec la couleur qui va avec. */
export const OPTION_CHOICE_STATES: ReadonlyArray<{
  code: OptionChoiceStatus;
  label: string;
  tone: 'todo' | 'done' | 'wait' | 'off';
  hint: string;
}> = [
  { code: 'REQUESTED', label: 'Demandé', tone: 'todo',
    hint: "Le vœu est enregistré, il attend une décision de l'établissement." },
  { code: 'CONFIRMED', label: 'Confirmé', tone: 'done',
    hint: "L'élève a sa place : elle est décomptée de la capacité." },
  { code: 'WAITLISTED', label: "Sur liste d'attente", tone: 'wait',
    hint: 'Vœu recevable, mais plus de place. Une annulation en libère une.' },
  { code: 'CANCELLED', label: 'Annulé', tone: 'off',
    hint: 'Retiré par la famille ou par l’établissement. La place est rendue.' }
];

/** Palette des options, reprise de celle des matières. */
export const OPTION_COLORS: readonly string[] = [
  '#1f5fd6', '#7c5cd6', '#0f9bb3', '#16915a', '#d97a16', '#dc3545', '#6b7280'
];
