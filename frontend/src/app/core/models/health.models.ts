/**
 * Santé scolaire.
 *
 * La frontière de confidentialité est reprise ici telle que le serveur la
 * pose : `HealthAlert` n'a pas de champ pour le diagnostic, le traitement, le
 * médecin ou les notes. Ce n'est pas une décision d'affichage — c'est la forme
 * que le serveur renvoie à un appelant sans HEALTH_RECORD_VIEW. Le reste
 * n'arrive jamais jusqu'au navigateur.
 */

/** Ce que porte une ligne de la fiche de santé. */
export type HealthConditionKind =
  | 'ALLERGY' | 'CHRONIC_ILLNESS' | 'TREATMENT' | 'DISABILITY' | 'DIETARY' | 'OTHER';

/** À partir de HIGH, la condition devient une alerte visible des encadrants. */
export type HealthSeverity = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

/** Comment s'est terminé un passage à l'infirmerie. */
export type InfirmaryOutcome =
  | 'BACK_TO_CLASS' | 'RESTED' | 'SENT_HOME' | 'REFERRED' | 'EMERGENCY';

export type ExaminationKind =
  | 'ENTRY' | 'ANNUAL' | 'SPORT' | 'VISION' | 'HEARING' | 'DENTAL';

export type ExaminationOutcome =
  | 'PENDING' | 'FIT' | 'FIT_WITH_RESERVE' | 'UNFIT' | 'REFERRED' | 'MISSED';

/**
 * Ce que reçoit le personnel encadrant, et rien de plus.
 *
 * Ajouter un champ ici, c'est élargir ce que voit toute la salle des
 * professeurs. À ne faire qu'en le décidant.
 */
export interface HealthAlert {
  studentId: string;
  studentNumber: string;
  studentName: string;
  classroomName: string;
  /** Le libellé court : « Allergie aux arachides ». Pas le dossier. */
  label: string;
  severity: HealthSeverity;
  severityLabel: string;
  /** La conduite à tenir, écrite pour quelqu'un qui n'est pas soignant. */
  actionToTake?: string;
  /** Vrai si l'élève garde son traitement sur lui. */
  selfCarried: boolean;
}

export interface HealthCondition {
  id: string;
  kind: HealthConditionKind;
  kindLabel: string;
  label: string;
  severity: HealthSeverity;
  severityLabel: string;
  description?: string;
  actionToTake?: string;
  medication?: string;
  selfCarried: boolean;
  declaredOn: string;
  resolvedOn?: string;
  active: boolean;
  alert: boolean;
}

export interface Vaccination {
  id: string;
  vaccineId: string;
  vaccineCode: string;
  vaccineLabel: string;
  required: boolean;
  dosesExpected: number;
  dosesReceived: number;
  lastDoseOn?: string;
  nextDoseDueOn?: string;
  certificateSeen: boolean;
  notes?: string;
  complete: boolean;
  /** Vrai quand l'école relance la famille pour ce vaccin. */
  outstanding: boolean;
}

export interface HealthRecord {
  id: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  classroomName: string;
  bloodGroup?: string;
  physicianName?: string;
  physicianPhone?: string;
  insuranceName?: string;
  insuranceNumber?: string;
  notes?: string;
  careConsent: boolean;
  consentSignedOn?: string;
  reviewedOn?: string;
  conditions: HealthCondition[];
  vaccinations: Vaccination[];
  alertCount: number;
  missingVaccineCount: number;
}

export interface InfirmaryVisit {
  id: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  classroomName: string;
  occurredAt: string;
  complaint: string;
  careGiven: string;
  temperatureCelsius?: number;
  outcome: InfirmaryOutcome;
  outcomeLabel: string;
  notes?: string;
  guardianNotifiedAt?: string;
  referredTo?: string;
  /** Vrai quand l'élève est parti sans que la famille ait été jointe. */
  awaitingGuardian: boolean;
}

export interface MedicalExamination {
  id: string;
  studentId: string;
  studentNumber: string;
  studentName: string;
  classroomName: string;
  kind: ExaminationKind;
  kindLabel: string;
  scheduledOn: string;
  performedOn?: string;
  outcome: ExaminationOutcome;
  outcomeLabel: string;
  restriction?: string;
  practitioner?: string;
  notes?: string;
  overdue: boolean;
}

/**
 * L'écran, en un appel.
 *
 * `fullAccess` dit laquelle des deux formes on a reçue. À faux, `records`,
 * `visits` et `examinations` sont vides : le serveur n'a pas envoyé le détail
 * médical, il ne s'agit pas de le masquer.
 */
export interface HealthBoard {
  academicYearId: string;
  academicYearCode: string;
  fullAccess: boolean;
  alertCount: number;
  visitCountThisWeek: number;
  awaitingGuardianCount: number;
  missingConsentCount: number;
  missingVaccineCount: number;
  overdueExaminationCount: number;
  alerts: HealthAlert[];
  records: HealthRecord[];
  visits: InfirmaryVisit[];
  examinations: MedicalExamination[];
}

// ------------------------------------------------------------- envois

export interface HealthRecordPayload {
  studentId: string;
  bloodGroup?: string;
  physicianName?: string;
  physicianPhone?: string;
  insuranceName?: string;
  insuranceNumber?: string;
  notes?: string;
  careConsent: boolean;
  consentSignedOn?: string;
}

export interface HealthConditionPayload {
  studentId: string;
  kind: HealthConditionKind;
  label: string;
  severity: HealthSeverity;
  description?: string;
  /** Obligatoire dès que la gravité en fait une alerte. */
  actionToTake?: string;
  medication?: string;
  selfCarried: boolean;
  declaredOn?: string;
}

export interface InfirmaryVisitPayload {
  studentId: string;
  occurredAt?: string;
  complaint: string;
  careGiven: string;
  temperatureCelsius?: number;
  outcome: InfirmaryOutcome;
  notes?: string;
  /** Vrai quand la famille a réellement été jointe. */
  guardianNotified: boolean;
  referredTo?: string;
}

export interface VaccinationPayload {
  studentId: string;
  vaccineId: string;
  dosesReceived: number;
  lastDoseOn?: string;
  nextDoseDueOn?: string;
  certificateSeen: boolean;
  notes?: string;
}

export interface ExaminationPayload {
  studentId: string;
  kind: ExaminationKind;
  scheduledOn: string;
  practitioner?: string;
  notes?: string;
}

export interface ExaminationResultPayload {
  outcome: ExaminationOutcome;
  performedOn?: string;
  /** Obligatoire pour « apte avec réserve ». */
  restriction?: string;
  practitioner?: string;
  notes?: string;
}
