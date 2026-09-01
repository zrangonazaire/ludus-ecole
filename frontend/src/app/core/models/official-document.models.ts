/** Official documents issued by a school and kept in the student's file. */

export type OfficialDocumentType =
  | 'STUDENT_FILE'
  | 'SCHOOL_CERTIFICATE'
  | 'ENROLLMENT_ATTESTATION'
  | 'TRANSCRIPT'
  | 'SUMMONS'
  | 'STUDENT_CARD'
  | 'OTHER';

export type OfficialDocumentStatus = 'DRAFT' | 'GENERATED' | 'ISSUED' | 'REVOKED';

/**
 * School-wide letterhead. A copy is frozen into every issued document so a
 * later logo or footer change never rewrites what a family already received.
 */
export interface OfficialDocumentLayout {
  schoolName: string;
  legalName?: string;
  motto?: string;
  registrationNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  logoDataUrl?: string;
  headerLeft?: string;
  headerRight?: string;
  footerText?: string;
  signatoryName?: string;
  signatoryTitle: string;
  accentColor: string;
  documentNumberPattern: string;
  showLogo: boolean;
  showMotto: boolean;
  showSignatureLine: boolean;
  showVerificationCode: boolean;
}

export interface OfficialDocumentMetadata {
  purpose?: string;
  recipient?: string;
  additionalMention?: string;
  meetingDate?: string;
  meetingTime?: string;
  meetingPlace?: string;
}

export interface OfficialDocumentIssuePayload extends OfficialDocumentMetadata {
  studentId: string;
  type: OfficialDocumentType;
  issueDate: string;
  validUntil?: string;
}

export interface OfficialDocument {
  id: string;
  type: OfficialDocumentType;
  typeLabel: string;
  documentNumber: string;
  verificationCode: string;
  title: string;
  status: OfficialDocumentStatus;
  issuedAt: string;
  validUntil?: string;

  studentId: string;
  studentName: string;
  studentNumber: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  birthDate: string;
  birthPlace?: string;
  nationality?: string;
  photoUrl?: string;

  enrollmentId?: string;
  enrollmentNumber?: string;
  classroomName?: string;
  levelName?: string;
  academicYearId?: string;
  academicYearCode?: string;

  metadata: OfficialDocumentMetadata;
  layout: OfficialDocumentLayout;
  revokedAt?: string;
  revokeReason?: string;
}

export interface OfficialDocumentQuery {
  page?: number;
  size?: number;
  search?: string;
  type?: OfficialDocumentType | '';
  status?: OfficialDocumentStatus | '';
  studentId?: string;
}

export interface OfficialDocumentTemplate {
  type: OfficialDocumentType;
  label: string;
  description: string;
  shortCode: string;
  tone: 'blue' | 'green' | 'amber' | 'violet' | 'slate';
}

export const OFFICIAL_DOCUMENT_TEMPLATES: readonly OfficialDocumentTemplate[] = [
  {
    type: 'SCHOOL_CERTIFICATE',
    label: 'Certificat de scolarité',
    description: "Certifie que l'élève fréquente régulièrement l'établissement.",
    shortCode: 'CS',
    tone: 'blue'
  },
  {
    type: 'ENROLLMENT_ATTESTATION',
    label: "Attestation d'inscription",
    description: "Confirme l'inscription administrative pour l'année scolaire.",
    shortCode: 'AI',
    tone: 'green'
  },
  {
    type: 'STUDENT_FILE',
    label: 'Fiche individuelle',
    description: "Synthèse officielle de l'identité et de la situation scolaire.",
    shortCode: 'FI',
    tone: 'slate'
  },
  {
    type: 'SUMMONS',
    label: 'Convocation',
    description: "Convocation nominative avec date, heure, lieu et motif.",
    shortCode: 'CV',
    tone: 'amber'
  },
  {
    type: 'STUDENT_CARD',
    label: "Carte d'élève",
    description: "Carte nominative avec matricule et classe de l'élève.",
    shortCode: 'CE',
    tone: 'violet'
  }
];

