/** Personnel non enseignant. */

export type StaffStatus =
  | 'ACTIVE' | 'ON_LEAVE' | 'SUSPENDED' | 'RESIGNED' | 'ARCHIVED';

export type ContractType =
  | 'PERMANENT' | 'FIXED_TERM' | 'HOURLY' | 'INTERN' | 'VOLUNTEER' | 'OTHER';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface StaffMember {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender?: Gender;
  email?: string;
  phone?: string;
  jobTitle: string;
  department?: string;
  hireDate: string;
  contractType: ContractType;
  contractTypeLabel: string;
  status: StaffStatus;
  statusLabel: string;
  campusId?: string;
  campusName?: string;
  /** Un compte de connexion existe-t-il ? Jamais son identifiant. */
  hasUserAccount: boolean;
}

export interface StaffSavePayload {
  firstName: string;
  lastName: string;
  gender?: Gender;
  email?: string;
  phone?: string;
  jobTitle: string;
  department?: string;
  hireDate: string;
  contractType: ContractType;
  campusId?: string;
}

export interface StaffStatusPayload {
  status: StaffStatus;
  reason?: string;
}

export interface StaffQuery {
  search?: string;
  status?: StaffStatus;
  page?: number;
  size?: number;
}

export const STAFF_STATUSES: ReadonlyArray<{
  code: StaffStatus; label: string; tone: string
}> = [
  { code: 'ACTIVE', label: 'En poste', tone: 'active' },
  { code: 'ON_LEAVE', label: 'En congé', tone: 'on_leave' },
  { code: 'SUSPENDED', label: 'Suspendu', tone: 'suspended' },
  { code: 'RESIGNED', label: 'Départ acté', tone: 'resigned' },
  { code: 'ARCHIVED', label: 'Archivé', tone: 'archived' }
];

export const CONTRACT_TYPES: ReadonlyArray<{ code: ContractType; label: string }> = [
  { code: 'PERMANENT', label: 'Contrat à durée indéterminée' },
  { code: 'FIXED_TERM', label: 'Contrat à durée déterminée' },
  { code: 'HOURLY', label: 'Vacataire' },
  { code: 'INTERN', label: 'Stagiaire' },
  { code: 'VOLUNTEER', label: 'Bénévole' },
  { code: 'OTHER', label: 'Autre' }
];

/**
 * Ce qu'un agent peut devenir depuis sa situation actuelle.
 *
 * <p>Reprend la table du serveur, pour n'offrir que des actions qui
 * aboutiront. Proposer un bouton qui sera refusé est une promesse qu'on ne
 * tient pas ; le serveur reste juge, cette table ne fait qu'éviter le
 * détour.</p>
 */
export const ALLOWED_TRANSITIONS: Record<StaffStatus, StaffStatus[]> = {
  ACTIVE: ['ON_LEAVE', 'SUSPENDED', 'RESIGNED'],
  ON_LEAVE: ['ACTIVE', 'SUSPENDED', 'RESIGNED'],
  SUSPENDED: ['ACTIVE', 'RESIGNED'],
  RESIGNED: ['ARCHIVED'],
  ARCHIVED: []
};
