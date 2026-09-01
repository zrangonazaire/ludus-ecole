export type FamilyRequestType =
  | 'SCHOOL_CERTIFICATE' | 'ENROLLMENT_CERTIFICATE' | 'REPORT_CARD_COPY'
  | 'TRANSCRIPT' | 'TRANSFER_DOCUMENTS' | 'PAYMENT_STATEMENT'
  | 'DATA_CORRECTION' | 'APPOINTMENT' | 'OTHER';

export type FamilyRequestStatus =
  | 'NEW' | 'IN_PROGRESS' | 'WAITING_FAMILY' | 'READY' | 'COMPLETED' | 'REJECTED';

export type FamilyRequestPriority = 'NORMAL' | 'HIGH' | 'URGENT';
export type FamilyRequestChannel = 'PORTAL' | 'EMAIL' | 'PHONE' | 'IN_PERSON';

export interface FamilyRequest {
  id: string;
  reference: string;
  type: FamilyRequestType;
  typeLabel: string;
  status: FamilyRequestStatus;
  statusLabel: string;
  priority: FamilyRequestPriority;
  priorityLabel: string;
  channel: FamilyRequestChannel;
  channelLabel: string;
  subject: string;
  description?: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  classroomName?: string;
  guardianName: string;
  guardianPhone?: string;
  assignedTo?: string;
  internalNote?: string;
  submittedAt: string;
  dueAt: string;
  completedAt?: string;
  overdue: boolean;
}

export interface FamilyRequestBoard {
  total: number;
  newCount: number;
  inProgressCount: number;
  waitingFamilyCount: number;
  readyCount: number;
  completedCount: number;
  overdueCount: number;
  requests: FamilyRequest[];
}

export interface FamilyRequestQuery {
  search?: string;
  status?: FamilyRequestStatus | 'OPEN';
  type?: FamilyRequestType;
}

export interface FamilyRequestCreatePayload {
  studentId: string;
  guardianName: string;
  guardianPhone?: string;
  type: FamilyRequestType;
  subject: string;
  description?: string;
  priority: FamilyRequestPriority;
  channel: FamilyRequestChannel;
}

export interface FamilyRequestUpdatePayload {
  status: FamilyRequestStatus;
  assignedTo?: string;
  internalNote?: string;
}

export const FAMILY_REQUEST_TYPES: ReadonlyArray<{
  code: FamilyRequestType; label: string
}> = [
  { code: 'SCHOOL_CERTIFICATE', label: 'Certificat de scolarité' },
  { code: 'ENROLLMENT_CERTIFICATE', label: "Attestation d'inscription" },
  { code: 'REPORT_CARD_COPY', label: 'Duplicata de bulletin' },
  { code: 'TRANSCRIPT', label: 'Relevé de notes' },
  { code: 'TRANSFER_DOCUMENTS', label: 'Dossier de transfert' },
  { code: 'PAYMENT_STATEMENT', label: 'Situation de paiement' },
  { code: 'DATA_CORRECTION', label: "Correction d'informations" },
  { code: 'APPOINTMENT', label: 'Demande de rendez-vous' },
  { code: 'OTHER', label: 'Autre demande' }
];

export const FAMILY_REQUEST_STATUSES: ReadonlyArray<{
  code: FamilyRequestStatus; label: string; tone: string
}> = [
  { code: 'NEW', label: 'Nouvelle', tone: 'new' },
  { code: 'IN_PROGRESS', label: 'En traitement', tone: 'progress' },
  { code: 'WAITING_FAMILY', label: 'Attente famille', tone: 'waiting' },
  { code: 'READY', label: 'Prête', tone: 'ready' },
  { code: 'COMPLETED', label: 'Terminée', tone: 'done' },
  { code: 'REJECTED', label: 'Refusée', tone: 'rejected' }
];
