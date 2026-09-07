import { PageQuery } from './common.models';

export type AdmissionStatus =
  | 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'TESTED'
  | 'ACCEPTED' | 'WAITLISTED' | 'REJECTED' | 'WITHDRAWN' | 'CONVERTED';

export type AdmissionGender = 'MALE' | 'FEMALE' | 'OTHER';

export interface AdmissionDocument {
  id: string;
  code: string;
  label: string;
  mandatory: boolean;
  received: boolean;
  fileUrl?: string;
  receivedAt?: string;
}

export interface Admission {
  id: string;
  applicationNumber: string;
  academicYearId: string;
  academicYearLabel: string;
  campusId: string;
  campusName: string;
  requestedLevelId: string;
  requestedLevelName: string;
  reservedClassroomId?: string;
  reservedClassroomName?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  fullName: string;
  gender: AdmissionGender;
  birthDate: string;
  birthPlace?: string;
  nationality?: string;
  previousSchool?: string;
  guardianFirstName?: string;
  guardianLastName?: string;
  guardianFullName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  status: AdmissionStatus;
  submittedAt?: string;
  reviewedAt?: string;
  decisionAt?: string;
  decisionReason?: string;
  entranceExamScore?: number;
  documentsComplete: boolean;
  seatReserved: boolean;
  notes?: string;
  documents: AdmissionDocument[];
  createdAt?: string;
}

export interface AdmissionReference {
  id: string;
  code: string;
  label: string;
}

export interface AdmissionClassroomOption extends AdmissionReference {
  levelId: string;
  campusId: string;
}

export interface AdmissionOptions {
  defaultAcademicYearId?: string;
  academicYears: AdmissionReference[];
  campuses: AdmissionReference[];
  levels: AdmissionReference[];
  classrooms: AdmissionClassroomOption[];
}

export interface AdmissionQuery extends PageQuery {
  academicYearId?: string;
  status?: AdmissionStatus;
  levelId?: string;
}

export interface AdmissionCreatePayload {
  academicYearId: string;
  campusId: string;
  requestedLevelId: string;
  reservedClassroomId?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  gender: AdmissionGender;
  birthDate: string;
  birthPlace?: string;
  nationality?: string;
  previousSchool?: string;
  guardianFirstName?: string;
  guardianLastName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  notes?: string;
}

export interface AdmissionStatusPayload {
  status: AdmissionStatus;
  reservedClassroomId?: string;
  entranceExamScore?: number;
  reason?: string;
}
