import { Pipe, PipeTransform } from '@angular/core';

const LABELS: Record<string, string> = {
  // student
  APPLICANT: 'Candidat', ADMITTED: 'Admis', ACTIVE: 'Actif', SUSPENDED: 'Suspendu',
  WITHDRAWN: 'Retire', GRADUATED: 'Diplome', TRANSFERRED: 'Transfere', ARCHIVED: 'Archive',
  // enrollment
  DRAFT: 'Brouillon', PENDING: 'En attente', VALIDATED: 'Validee', CANCELLED: 'Annulee',
  COMPLETED: 'Terminee',
  // capacity
  AVAILABLE: 'Places disponibles', WARNING: 'Presque pleine', FULL: 'Complete',
  OVER_CAPACITY: 'Sureffectif',
  // attendance
  PRESENT: 'Present', ABSENT: 'Absent', LATE: 'Retard',
  EXCUSED_ABSENCE: 'Absence justifiee', EXCUSED_LATE: 'Retard justifie',
  LEFT_EARLY: 'Parti tot',
  // grades
  SUBMITTED: 'Soumise', PUBLISHED: 'Publiee', GRADING: 'Correction en cours',
  PLANNED: 'Planifiee', OPEN: 'Ouverte',
  // finance
  PAID: 'Solde', PARTIALLY_PAID: 'Partiellement paye', DUE: 'A payer',
  OVERDUE: 'En retard', WAIVED: 'Exonere',
  CASH: 'Especes', BANK_TRANSFER: 'Virement', CARD: 'Carte',
  MOBILE_MONEY: 'Mobile money', CHEQUE: 'Cheque', OTHER: 'Autre',
  REVERSED: 'Contre-passe', FAILED: 'Echoue',
  // council
  PASS: 'Admis en classe superieure', REPEAT: 'Redouble', PROMOTED: 'Promu',
  TRANSFER_RECOMMENDED: 'Reorientation conseillee',
  ORIENTATION_REQUIRED: 'Orientation requise', PENDING_DECISION: 'Decision en attente',
  // severity
  INFO: 'Information', CRITICAL: 'Critique',
  // academic year
  CLOSING: 'En cloture', CLOSED: 'Cloturee', GRADE_ENTRY: 'Saisie des notes',
  VALIDATION: 'Validation'
};

/** Turns a backend enum value into a French label. */
@Pipe({ name: 'statusLabel', standalone: true })
export class StatusLabelPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '-';
    }
    return LABELS[value] ?? value;
  }
}
