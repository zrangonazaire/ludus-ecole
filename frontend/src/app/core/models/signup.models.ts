/** Contracts of the public signup endpoints (no authentication required). */

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
