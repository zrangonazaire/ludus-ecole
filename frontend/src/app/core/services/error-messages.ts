import { ApiError } from '../models/common.models';

/**
 * Maps the backend's stable error codes to French messages shown to the user.
 *
 * The backend returns a code, never a user-facing sentence, so wording can
 * change here without touching the API contract (section 84).
 */
const MESSAGES: Record<string, string> = {
  // generic
  VALIDATION_ERROR: 'Les donnees saisies sont invalides.',
  RESOURCE_NOT_FOUND: 'Element introuvable.',
  CONFLICT: "L'operation est en conflit avec l'etat actuel.",
  CONCURRENT_MODIFICATION: 'Cet enregistrement a ete modifie par un autre utilisateur. Rechargez la page.',
  ACCESS_DENIED: "Vous n'avez pas les droits necessaires pour cette operation.",
  UNAUTHENTICATED: 'Authentification requise.',
  RATE_LIMITED: 'Trop de requetes. Reessayez dans un instant.',
  IDEMPOTENCY_CONFLICT: 'Cette cle a deja ete utilisee avec des donnees differentes.',
  INTERNAL_ERROR: 'Erreur interne. Le support a ete notifie.',

  // security
  INVALID_CREDENTIALS: 'Identifiant ou mot de passe incorrect.',
  ACCOUNT_LOCKED: 'Compte temporairement verrouille apres plusieurs echecs.',
  ACCOUNT_DISABLED: 'Ce compte est desactive.',
  TOKEN_EXPIRED: 'Votre session a expire.',

  // academic
  ACADEMIC_YEAR_NOT_ACTIVE: "L'annee scolaire n'est pas active.",
  ACADEMIC_YEAR_ALREADY_ACTIVE: 'Une autre annee scolaire est deja active.',
  ACADEMIC_YEAR_CLOSED: "L'annee scolaire est cloturee.",
  TERM_NOT_OPEN_FOR_GRADES: 'La periode de saisie des notes est fermee.',
  CLASS_NOT_FOUND: 'Classe introuvable.',
  CLASS_CAPACITY_EXCEEDED: 'La capacite maximale de la classe est atteinte.',
  CLASS_NOT_ACTIVE: "Cette classe n'est pas active.",
  CURRICULUM_NOT_FOUND: 'Aucun programme defini pour ce niveau.',

  // student / enrollment
  STUDENT_NOT_FOUND: 'Eleve introuvable.',
  STUDENT_ALREADY_ENROLLED: 'Cet eleve est deja inscrit pour cette annee scolaire.',
  STUDENT_NOT_ACTIVE: "Le statut de l'eleve ne permet pas cette operation.",
  STUDENT_INVALID_STATUS_TRANSITION: "Ce changement de statut n'est pas autorise.",
  STUDENT_NUMBER_ALREADY_USED: 'Ce matricule est deja utilise.',
  ENROLLMENT_NOT_ALLOWED: "L'inscription n'est pas autorisee dans ce contexte.",
  ENROLLMENT_WINDOW_CLOSED: 'La periode des inscriptions est fermee.',
  ENROLLMENT_DOCUMENTS_INCOMPLETE: 'Des pieces obligatoires sont manquantes.',
  ENROLLMENT_ALREADY_VALIDATED: "L'inscription est deja validee.",
  ADMISSION_NOT_ACCEPTED: "La candidature n'a pas ete acceptee.",
  GUARDIAN_PRIMARY_REQUIRED: 'Un eleve doit conserver un responsable principal.',

  // timetable / attendance
  TIMETABLE_CONFLICT: "L'enseignant ou la classe est deja occupe sur ce creneau.",
  ROOM_CONFLICT: 'La salle est deja reservee sur ce creneau.',
  TEACHER_NOT_ASSIGNED: "Vous n'etes pas affecte a cette classe ou cette matiere.",
  INVALID_ATTENDANCE: 'Saisie de presence invalide.',
  ATTENDANCE_SESSION_LOCKED: 'Cette feuille de presence est verrouillee.',

  // grades
  GRADE_NOT_ALLOWED: "Vous n'etes pas autorise a saisir des notes pour cette classe.",
  GRADE_OUT_OF_RANGE: 'La note doit etre comprise entre 0 et le bareme.',
  GRADE_ALREADY_PUBLISHED: 'Cette note est publiee : une correction justifiee est requise.',
  GRADE_JUSTIFICATION_REQUIRED: 'Une justification est obligatoire pour corriger une note publiee.',
  REPORT_CARD_NOT_READY: 'Des notes ne sont pas validees : le bulletin ne peut pas etre publie.',
  REPORT_CARD_ALREADY_PUBLISHED: 'Ce bulletin est deja publie.',

  // finance
  PAYMENT_NOT_FOUND: 'Paiement introuvable.',
  PAYMENT_ALREADY_PROCESSED: 'Ce paiement a deja ete enregistre.',
  PAYMENT_AMOUNT_INVALID: 'Le montant du paiement est invalide.',
  PAYMENT_EXCEEDS_OUTSTANDING: 'Le montant depasse le solde restant du.',
  PAYMENT_CANCELLATION_NOT_ALLOWED: 'Ce paiement ne peut plus etre annule.',
  PAYMENT_ALREADY_CANCELLED: 'Ce paiement est deja annule.',
  CASH_SESSION_ALREADY_OPEN: 'Vous avez deja une session de caisse ouverte.',
  CASH_SESSION_CLOSED: 'La session de caisse est fermee.',

  // portals
  UNAUTHORIZED_STUDENT_ACCESS: "Vous n'etes pas autorise a consulter les donnees de cet eleve.",
  UNAUTHORIZED_CLASS_ACCESS: "Vous n'etes pas autorise a acceder a cette classe.",
  PORTAL_PROFILE_MISSING: 'Aucun profil associe a ce compte.'
};

/**
 * Returns the localised message, enriched with the server-supplied details
 * where they help the user act (remaining seats, allowed range...).
 */
export function translateErrorCode(code: string, error?: ApiError): string {
  const base = MESSAGES[code] ?? error?.message ?? 'Une erreur est survenue.';
  const details = error?.details;
  if (!details) {
    return base;
  }

  if (code === 'CLASS_CAPACITY_EXCEEDED' && details['capacityMaximum'] !== undefined) {
    return `${base} (${details['activeEnrollments']}/${details['capacityMaximum']} places occupees)`;
  }
  if (code === 'GRADE_OUT_OF_RANGE' && details['maxScore'] !== undefined) {
    return `La note doit etre comprise entre 0 et ${details['maxScore']}.`;
  }
  if (code === 'PAYMENT_EXCEEDS_OUTSTANDING' && details['outstanding'] !== undefined) {
    return `${base} Solde restant : ${details['outstanding']}.`;
  }
  if (code === 'STUDENT_ALREADY_ENROLLED' && details['existingEnrollmentNumber']) {
    return `${base} (inscription ${details['existingEnrollmentNumber']})`;
  }
  return base;
}
