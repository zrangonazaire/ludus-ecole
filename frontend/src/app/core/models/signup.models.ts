/** Contracts of the public signup endpoints (no authentication required). */

/**
 * Ce que le visiteur a décrit dans « Composer ma démo ».
 *
 * <p>Facultatif : on peut s'inscrire sans être passé par ce parcours. Mais
 * quand il est fourni, le serveur crée l'école déjà configurée — sinon les
 * quatre étapes de saisie seraient jetées à l'arrivée, ce qui était le cas
 * avant : le brouillon ne servait qu'à pré-remplir quatre champs.</p>
 */
export interface SignupOperations {
  cycles: { code: string; name: string; levels: string[] }[];
  classesPerLevel: number;
  classCapacity: number;
  subjects: { code: string; name: string; coefficient: number }[];
  fees?: {
    registration: number;
    tuitionTotal: number;
    instalments: number;
    currency: string;
  };
}

export interface SignupRequest {
  schoolName: string;
  schoolCode: string;
  city?: string;
  country?: string;
  schoolPhone?: string;
  currency: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  acceptedTerms: boolean;
  operations?: SignupOperations;
}

export interface SignupResponse {
  schoolId: string;
  schoolCode: string;
  schoolName: string;
  userId: string;
  email: string;
  fullName: string;
  academicYearId: string;
  academicYearCode: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  onboardingRequired: boolean;
}

export interface AvailabilityResponse {
  available: boolean;
  code?: string;
  email?: string;
}
