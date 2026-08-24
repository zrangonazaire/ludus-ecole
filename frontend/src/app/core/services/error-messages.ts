import { ApiError } from '../models/common.models';

/**
 * Maps the backend's stable error codes to French messages shown to the user.
 *
 * The backend returns a code, never a user-facing sentence, so wording can
 * change here without touching the API contract (section 84).
 */
const MESSAGES: Record<string, string> = {
  // generic
  VALIDATION_ERROR: 'Les données saisies sont invalides.',
  RESOURCE_NOT_FOUND: 'Élément introuvable.',
  CONFLICT: "L'opération est en conflit avec l'état actuel.",
  CONCURRENT_MODIFICATION: 'Cet enregistrement a été modifié par un autre utilisateur. Rechargez la page.',
  ACCESS_DENIED: "Vous n'avez pas les droits nécessaires pour cette opération.",
  UNAUTHENTICATED: 'Authentification requise.',
  RATE_LIMITED: 'Trop de requêtes. Réessayez dans un instant.',
  IDEMPOTENCY_CONFLICT: 'Cette clé a déjà été utilisée avec des données différentes.',
  INTERNAL_ERROR: 'Erreur interne. Le support a été notifié.',

  // security
  INVALID_CREDENTIALS: 'Identifiant ou mot de passe incorrect.',
  ACCOUNT_LOCKED: 'Compte temporairement verrouillé après plusieurs échecs.',
  ACCOUNT_DISABLED: 'Ce compte est désactivé.',
  TOKEN_EXPIRED: 'Votre session a expiré.',

  // academic
  ACADEMIC_YEAR_NOT_ACTIVE: "L'année scolaire n'est pas active.",
  ACADEMIC_YEAR_ALREADY_ACTIVE: 'Une autre année scolaire est déjà active.',
  ACADEMIC_YEAR_CLOSED: "L'année scolaire est clôturee.",
  TERM_NOT_OPEN_FOR_GRADES: 'La periode de saisie des notes est fermee.',
  CLASS_NOT_FOUND: 'Classe introuvable.',
  CLASS_CAPACITY_EXCEEDED: 'La capacite maximale de la classe est atteinte.',
  CLASS_NOT_ACTIVE: "Cette classe n'est pas active.",
  SUBJECT_CODE_ALREADY_USED: 'Une autre matière utilise déjà ce code.',
  SUBJECT_IN_USE: "Cette matière figure au programme d'un ou plusieurs niveaux. "
    + "Retirez-la de ces programmes avant de l'archiver.",
  CURRICULUM_SUBJECT_ALREADY_ADDED: 'Cette matière est déjà au programme de ce niveau.',
  CURRICULUM_SUBJECT_HAS_GRADES: 'Des évaluations existent déjà pour cette matière sur ce '
    + 'niveau. Le coefficient reste modifiable, mais la matière ne peut plus être retirée.',
  COEFFICIENT_OUT_OF_RANGE: 'Le coefficient doit être strictement positif.',
  FEE_TYPE_CODE_ALREADY_USED: 'Un autre type de frais utilise déjà ce code.',
  FEE_TYPE_IN_USE: 'Ce type de frais est tarifé sur au moins un niveau. '
    + 'Supprimez ces tarifs avant de l\'archiver.',
  FEE_SCHEDULE_ALREADY_EXISTS: 'Un tarif existe déjà pour ce type de frais sur ce niveau.',
  FEE_INSTALMENTS_MISMATCH: 'Les échéances ne totalisent pas le montant annoncé.',
  FEE_SCHEDULE_IN_USE: 'Des frais ont déjà été générés depuis ce tarif. Le montant reste '
    + 'modifiable pour les prochaines inscriptions, mais le tarif ne peut plus être supprimé.',
  FEE_AMOUNT_INVALID: 'Le montant doit être positif, et chaque échéance strictement positive.',
  CURRICULUM_NOT_FOUND: 'Aucun programme défini pour ce niveau.',

  // student / enrollment
  STUDENT_NOT_FOUND: 'Élève introuvable.',
  STUDENT_ALREADY_ENROLLED: 'Cet élève est déjà inscrit pour cette année scolaire.',
  STUDENT_NOT_ACTIVE: "Le statut de l'élève ne permet pas cette opération.",
  STUDENT_INVALID_STATUS_TRANSITION: "Ce changement de statut n'est pas autorise.",
  STUDENT_NUMBER_ALREADY_USED: 'Ce matricule est déjà utilisé.',
  ENROLLMENT_NOT_ALLOWED: "L'inscription n'est pas autorisee dans ce contexte.",
  ENROLLMENT_WINDOW_CLOSED: 'La période des inscriptions est fermee.',
  ENROLLMENT_DOCUMENTS_INCOMPLETE: 'Des pieces obligatoires sont manquantes.',
  ENROLLMENT_ALREADY_VALIDATED: "L'inscription est déjà validee.",
  ADMISSION_NOT_ACCEPTED: "La candidature n'a pas été acceptée.",
  GUARDIAN_PRIMARY_REQUIRED: 'Un élève doit conserver un responsable principal.',

  // timetable / attendance
  TIMETABLE_CONFLICT: "L'enseignant ou la classe est déjà occupe sur ce creneau.",
  ROOM_CONFLICT: 'La salle est deja reservee sur ce creneau.',
  TEACHER_NOT_ASSIGNED: "Vous n'etes pas affecte a cette classe ou cette matiere.",
  INVALID_ATTENDANCE: 'Saisie de présence invalide.',
  ATTENDANCE_SESSION_LOCKED: 'Cette feuille de présence est verrouillée.',

  // grades
  GRADE_NOT_ALLOWED: "Vous n'etes pas autorisé a saisir des notes pour cette classe.",
  GRADE_OUT_OF_RANGE: 'La note doit être comprise entre 0 et le bareme.',
  GRADE_ALREADY_PUBLISHED: 'Cette note est publiee : une correction justifiee est requise.',
  GRADE_JUSTIFICATION_REQUIRED: 'Une justification est obligatoire pour corriger une note publiee.',
  REPORT_CARD_NOT_READY: 'Des notes ne sont pas validees : le bulletin ne peut pas etre publie.',
  REPORT_CARD_ALREADY_PUBLISHED: 'Ce bulletin est deja publie.',

  // finance
  PAYMENT_NOT_FOUND: 'Paiement introuvable.',
  PAYMENT_ALREADY_PROCESSED: 'Ce paiement a déjà été enregistré.',
  PAYMENT_AMOUNT_INVALID: 'Le montant du paiement est invalide.',
  PAYMENT_EXCEEDS_OUTSTANDING: 'Le montant depasse le solde restant du.',
  PAYMENT_CANCELLATION_NOT_ALLOWED: 'Ce paiement ne peut plus etre annule.',
  PAYMENT_ALREADY_CANCELLED: 'Ce paiement est deja annule.',
  CASH_SESSION_ALREADY_OPEN: 'Vous avez deja une session de caisse ouverte.',
  CASH_SESSION_CLOSED: 'La session de caisse est fermee.',

  // portals
  UNAUTHORIZED_STUDENT_ACCESS: "Vous n'êtes pas autorisé à consulter les données de cet élève.",
  UNAUTHORIZED_CLASS_ACCESS: "Vous n'etes pas autorisé a acceder a cette classe.",
  PORTAL_PROFILE_MISSING: 'Aucun profil associe a ce compte.'
};

/**
 * Returns the localised message, enriched with the server-supplied détails
 * where they help the user act (remaining seats, allowed range...).
 */
export function translateErrorCode(code: string, error?: ApiError): string {
  const base = MESSAGES[code] ?? error?.message ?? 'Une erreur est survenue.';
  const details = error?.details;
  if (!details) {
    return base;
  }

  if (code === 'CLASS_CAPACITY_EXCEEDED' && details['capacityMaximum'] !== undefined) {
    return `${base} (${details['activeEnrollments']}/${details['capacityMaximum']} places occupées)`;
  }
  if (code === 'GRADE_OUT_OF_RANGE' && details['maxScore'] !== undefined) {
    return `La note doit être comprise entre 0 et ${details['maxScore']}.`;
  }
  if (code === 'PAYMENT_EXCEEDS_OUTSTANDING' && details['outstanding'] !== undefined) {
    return `${base} Solde restant : ${details['outstanding']}.`;
  }
  if (code === 'STUDENT_ALREADY_ENROLLED' && details['existingEnrollmentNumber']) {
    return `${base} (inscription ${details['existingEnrollmentNumber']})`;
  }
  return base;
}
