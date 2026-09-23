/** Réductions de scolarité : demandes validées par un circuit à plusieurs niveaux. */

export type DiscountRequestStatus =
  | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'EFFECTIVE';

export type DiscountLevelStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SKIPPED';

export type DiscountKind = 'PERCENTAGE' | 'FIXED_AMOUNT';

export interface DiscountLevel {
  mode?: 'ALL' | 'ONE';
  members?: import('./approval-execution.models').ApprovalVote[];
  levelNumber: number;
  name: string;
  roleCode: string;
  roleLabel?: string;
  status: DiscountLevelStatus;
  approverName?: string;
  comment?: string;
  decidedAt?: string;
}

export interface DiscountRequest {
  id: string;
  reference: string;
  studentId: string;
  studentName?: string;
  studentNumber?: string;
  label: string;
  reason?: string;
  discountType: DiscountKind;
  value: number;
  computedAmount?: number;
  status: DiscountRequestStatus;
  currentLevel: number;
  totalLevels: number;
  rejectionReason?: string;
  effectiveAt?: string;
  createdAt?: string;
  /** Vrai quand le palier en attente appartient au profil du lecteur. */
  awaitingMyDecision?: boolean;
  levels: DiscountLevel[];
}

export interface DiscountLevelInput {
  name: string;
  roleCode: string;
}

export interface DiscountRequestPayload {
  studentId: string;
  label: string;
  reason?: string;
  discountType: DiscountKind;
  value: number;
  circuitId: string;
  feeTypeId?: string;
  levels?: DiscountLevelInput[];
}

export interface DiscountDecisionPayload {
  decision: 'APPROVE' | 'REJECT';
  comment?: string;
}

export const DISCOUNT_STATUS_LABELS: Record<DiscountRequestStatus, string> = {
  SUBMITTED: 'Dans le circuit',
  APPROVED: 'Approuvée',
  REJECTED: 'Refusée',
  CANCELLED: 'Annulée',
  EFFECTIVE: 'Appliquée'
};

export const DISCOUNT_LEVEL_LABELS: Record<DiscountLevelStatus, string> = {
  PENDING: 'En attente',
  APPROVED: 'Validé',
  REJECTED: 'Refusé',
  SKIPPED: 'Non requis'
};

export const DISCOUNT_KIND_LABELS: Record<DiscountKind, string> = {
  PERCENTAGE: 'Pourcentage',
  FIXED_AMOUNT: 'Montant fixe'
};
