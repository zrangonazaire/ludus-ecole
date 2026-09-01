/** Pourquoi un élève quitte l'établissement. */
export type DepartureReason =
  | 'TRANSFER_OUT' | 'FAMILY_MOVE' | 'FINANCIAL' | 'DISCIPLINARY'
  | 'ACADEMIC' | 'HEALTH' | 'ABANDONMENT' | 'OTHER';

/** Vie d'un dossier de sortie. */
export type DepartureStatus = 'DRAFT' | 'RECORDED' | 'CLEARED' | 'CANCELLED';

export interface ClassChange {
  id: string;
  enrollmentId: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  fromClassroomId: string;
  fromClassroomName: string;
  toClassroomId: string;
  toClassroomName: string;
  /** Vrai quand le changement traverse un niveau : rare, et à relire. */
  crossesLevel: boolean;
  reason: string;
  transferredAt: string;
}

export interface Departure {
  id: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  photoUrl?: string;
  enrollmentId: string;
  classroomId: string;
  classroomName: string;
  levelName?: string;
  reason: DepartureReason;
  reasonLabel: string;
  departureDate: string;
  /** Vrai tant que la date n'est pas atteinte : l'élève est encore en classe. */
  upcoming: boolean;
  destinationSchool?: string;
  destinationCity?: string;
  notes?: string;
  /** Solde figé le jour du départ. Affiché, jamais bloquant. */
  outstandingAmount: number;
  currency: string;
  exeatIssued: boolean;
  certificateIssued: boolean;
  reportCardIssued: boolean;
  fileReturned: boolean;
  documentsIssued: number;
  documentsComplete: boolean;
  status: DepartureStatus;
  statusLabel: string;
  editable: boolean;
  /** Faux pour une exclusion : la réinscription rouvrirait la décision. */
  allowsReturn: boolean;
  recordedAt: string;
  clearedAt?: string;
  cancelledReason?: string;
}

export interface TransferBoard {
  academicYearId: string;
  academicYearCode: string;
  classChangeCount: number;
  pendingDepartureCount: number;
  clearedDepartureCount: number;
  upcomingDepartureCount: number;
  outstandingTotal: number;
  currency: string;
  classChanges: ClassChange[];
  departures: Departure[];
}

export interface ClassChangePayload {
  enrollmentId: string;
  toClassroomId: string;
  reason: string;
  overrideCapacity: boolean;
}

export interface DepartureRecordPayload {
  enrollmentId: string;
  reason: DepartureReason;
  departureDate: string;
  destinationSchool?: string;
  destinationCity?: string;
  notes?: string;
}

export interface DepartureDocumentsPayload {
  exeatIssued: boolean;
  certificateIssued: boolean;
  reportCardIssued: boolean;
  fileReturned: boolean;
}

/**
 * The reasons, in the order a secretary meets them.
 *
 * <p>Transfer first because it is the most frequent and the only one that
 * produces an exeat the receiving school will chase. Abandonment last because
 * it is the one nobody records at the time — the pupil simply stops coming, and
 * somebody writes it down in March.</p>
 */
export const DEPARTURE_REASONS: ReadonlyArray<{
  code: DepartureReason;
  label: string;
  hint: string;
  /** Vrai quand le nom de l'établissement d'accueil est exigé. */
  needsDestination: boolean;
}> = [
  { code: 'TRANSFER_OUT', label: 'Transfert vers un autre établissement',
    hint: "L'école d'accueil réclamera l'exeat : son nom est obligatoire.",
    needsDestination: true },
  { code: 'FAMILY_MOVE', label: 'Déménagement de la famille',
    hint: "La famille quitte la ville. L'établissement d'accueil est souvent inconnu.",
    needsDestination: false },
  { code: 'FINANCIAL', label: 'Raisons financières',
    hint: 'La famille ne peut plus assumer la scolarité.', needsDestination: false },
  { code: 'DISCIPLINARY', label: 'Exclusion définitive',
    hint: 'Décision du conseil de discipline. Interdit la réinscription.',
    needsDestination: false },
  { code: 'ACADEMIC', label: 'Réorientation',
    hint: 'Le conseil de classe a recommandé une autre voie.', needsDestination: false },
  { code: 'HEALTH', label: 'Raisons de santé', hint: '', needsDestination: false },
  { code: 'ABANDONMENT', label: 'Abandon sans nouvelles',
    hint: "L'élève ne revient plus et la famille est injoignable.",
    needsDestination: false },
  { code: 'OTHER', label: 'Autre motif', hint: '', needsDestination: false }
];

/** Les quatre pièces qu'une famille doit emporter. */
export const DEPARTURE_DOCUMENTS: ReadonlyArray<{
  key: keyof DepartureDocumentsPayload;
  label: string;
  hint: string;
}> = [
  { key: 'exeatIssued', label: 'Exeat',
    hint: "Le certificat de sortie : sans lui, l'école d'accueil n'inscrit pas." },
  { key: 'certificateIssued', label: 'Certificat de radiation',
    hint: "Atteste que l'élève ne figure plus aux effectifs." },
  { key: 'reportCardIssued', label: 'Dernier bulletin',
    hint: "Pour que l'élève ne reparte pas sans trace de ses notes." },
  { key: 'fileReturned', label: 'Dossier scolaire rendu',
    hint: 'Actes, photos, pièces déposées à l’inscription.' }
];

export const DEPARTURE_STATES: ReadonlyArray<{
  code: DepartureStatus;
  label: string;
  tone: 'todo' | 'wait' | 'done' | 'off';
}> = [
  { code: 'DRAFT', label: 'Brouillon', tone: 'off' },
  { code: 'RECORDED', label: 'Sortie enregistrée', tone: 'wait' },
  { code: 'CLEARED', label: 'Dossier soldé', tone: 'done' },
  { code: 'CANCELLED', label: 'Annulée', tone: 'off' }
];
