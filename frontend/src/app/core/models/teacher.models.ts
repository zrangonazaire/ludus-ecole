/**
 * Contrats du personnel.
 *
 * <p>Ces types vivaient dans {@code staff.models}, avec la page Personnel qui
 * les utilisait. La page est retirée — tout le personnel est un utilisateur,
 * géré depuis /users — mais le type de contrat, lui, reste : c'est celui des
 * dossiers enseignants.</p>
 */
export type ContractType =
  | 'PERMANENT' | 'FIXED_TERM' | 'HOURLY' | 'INTERN' | 'VOLUNTEER' | 'OTHER';

export const CONTRACT_TYPES: ReadonlyArray<{ code: ContractType; label: string }> = [
  { code: 'PERMANENT', label: 'Contrat à durée indéterminée' },
  { code: 'FIXED_TERM', label: 'Contrat à durée déterminée' },
  { code: 'HOURLY', label: 'Vacataire' },
  { code: 'INTERN', label: 'Stagiaire' },
  { code: 'VOLUNTEER', label: 'Bénévole' },
  { code: 'OTHER', label: 'Autre' }
];

export interface TeacherCreatePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  speciality: string;
  qualification: string;
  hireDate: string;
  contractType: ContractType;
  weeklyHoursMax: number;
}
