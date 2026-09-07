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
  // Émis par le proxy du serveur de développement, pas par le backend :
  // personne n'écoute à l'adresse visée.
  BACKEND_UNREACHABLE: 'Le serveur ne répond pas. Vérifiez qu’il est bien '
    + 'démarré, puis réessayez.',
  // Repli seulement : le serveur nomme l'adresse manquante, et cette précision
  // vaut mieux que la phrase générique. Voir translateErrorCode.
  ENDPOINT_NOT_FOUND: "Cette fonction n'est pas disponible sur le serveur en "
    + 'cours d’exécution. Reconstruisez-le et relancez-le.',
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
  ACCESS_PROFILE_NOT_FOUND: 'Ce profil d’accès est introuvable.',
  ACCESS_PROFILE_CODE_ALREADY_USED: 'Un autre profil utilise déjà ce code.',

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
  ADMISSION_NOT_FOUND: "Ce dossier d'admission est introuvable.",
  ADMISSION_NOT_ACCEPTED: "La candidature n'a pas été acceptée.",
  ADMISSION_INVALID_TRANSITION: "Ce changement d'état du dossier n'est pas autorisé.",
  ADMISSION_DOCUMENTS_INCOMPLETE: 'Les pièces obligatoires doivent être reçues avant l’acceptation.',
  GUARDIAN_PRIMARY_REQUIRED: 'Un élève doit conserver un responsable principal.',

  // transferts et départs
  TRANSFER_SAME_CLASSROOM: "L'élève est déjà dans cette classe.",
  TRANSFER_CLASSROOM_MISMATCH: "La classe d'accueil appartient à une autre année "
    + "scolaire : l'inscription pointerait hors de sa propre année.",
  DEPARTURE_NOT_FOUND: 'Cette sortie est introuvable.',
  DEPARTURE_ALREADY_RECORDED: 'Une sortie est déjà enregistrée pour cet élève. '
    + "Annulez-la d'abord si elle est erronée : deux radiations pour la même année "
    + "raconteraient deux histoires différentes du même élève.",
  DEPARTURE_NOT_EDITABLE: 'Cette sortie est soldée ou annulée : elle ne change plus.',
  DEPARTURE_DOCUMENTS_INCOMPLETE: 'Il manque des pièces à remettre. Solder un dossier '
    + 'incomplet ferait croire que la famille est repartie avec tout.',
  DEPARTURE_DATE_BEFORE_ENROLLMENT: "La date de sortie précède l'inscription.",

  // timetable / attendance
  TIMETABLE_CONFLICT: "L'enseignant ou la classe est déjà occupe sur ce creneau.",
  ROOM_CONFLICT: 'La salle est deja reservee sur ce creneau.',
  INVALID_ATTENDANCE: 'Saisie de présence invalide.',
  ATTENDANCE_SESSION_LOCKED: 'Cette feuille de présence est verrouillée. Elle reste '
    + 'consultable, mais les marques ne peuvent plus changer : c\'est elle qui a servi '
    + 'aux bulletins.',
  ATTENDANCE_SESSION_NOT_FOUND: 'Cette feuille de présence est introuvable.',
  ATTENDANCE_STUDENT_NOT_IN_CLASS: "Un élève de la feuille n'est pas inscrit dans cette "
    + 'classe. Rechargez la page : la composition de la classe a changé depuis '
    + "l'ouverture de l'appel.",

  // grades
  GRADE_NOT_ALLOWED: "Vous n'êtes pas autorisé à saisir des notes pour cette classe.",
  GRADE_OUT_OF_RANGE: 'La note doit être comprise entre 0 et le barème.',
  GRADE_ALREADY_PUBLISHED: 'Cette note est déjà validée : sa correction passe par le '
    + 'formulaire dédié, avec un motif écrit.',
  GRADE_JUSTIFICATION_REQUIRED: 'Un motif écrit est obligatoire pour corriger une note '
    + 'déjà validée.',
  GRADE_NOT_FOUND: 'Cette note est introuvable.',

  // assessments
  ASSESSMENT_NOT_FOUND: 'Ce devoir est introuvable.',
  ASSESSMENT_NOT_OPEN: "La saisie n'est pas ouverte sur ce devoir.",
  ASSESSMENT_INVALID_TRANSITION: "Ce devoir ne peut pas passer directement à cet état.",
  ASSESSMENT_DATE_OUTSIDE_TERM: 'La date du devoir ne tombe pas dans la période '
    + 'retenue : la note irait dans le mauvais bulletin.',
  ASSESSMENT_INCOMPLETE: "Des élèves n'ont ni note ni absence. Une note manquante ne se "
    + "voit pas dans une moyenne : l'élève pèse simplement moins.",
  ASSESSMENT_SCALE_LOCKED: 'Le barème est figé : des notes ont déjà été saisies dessus. '
    + 'Le changer les ferait toutes bouger sans que personne y touche.',
  TEACHER_NOT_ASSIGNED: "Cet enseignant n'est pas affecté à cette matière dans cette "
    + "classe. Les notes n'apparaîtraient sur aucun de ses écrans.",
  CURRICULUM_SUBJECT_NOT_FOUND: "Cette matière n'est pas au programme du niveau. Sans "
    + "coefficient, la note n'entrerait dans aucune moyenne.",
  // bulletins
  REPORT_CARD_NOT_FOUND: 'Ce bulletin est introuvable.',
  REPORT_CARD_NOT_READY: "La génération est refusée tant que des notes de la période ne "
    + 'sont pas validées : les moyennes porteraient sur une partie du travail. Un '
    + "bulletin sans moyenne générale ne peut pas non plus être remis — il n'apprendrait "
    + 'rien à la famille et ne pourrait pas être contesté.',
  REPORT_CARD_ALREADY_PUBLISHED: 'Ce bulletin est déjà remis aux familles. Les '
    + 'appréciations font partie du document reçu et ne changent plus ; une note '
    + 'corrigée produira la révision suivante.',

  // conseils de classe
  COUNCIL_NOT_FOUND: 'Ce conseil de classe est introuvable.',
  COUNCIL_CLOSED: 'Ce conseil est clos : son procès-verbal, ses présences et ses décisions sont figés.',
  COUNCIL_ALREADY_EXISTS: 'Un conseil existe déjà pour cette classe et cette période.',
  COUNCIL_INVALID_TRANSITION: 'Ce changement d’état du conseil n’est pas autorisé.',
  COUNCIL_PARTICIPANT_NOT_FOUND: 'Ce participant ne figure plus sur la feuille de présence.',
  COUNCIL_PARTICIPANT_ALREADY_ADDED: 'Cette personne figure déjà parmi les participants du conseil.',

  // options et langues
  OPTION_NOT_FOUND: 'Cette option est introuvable.',
  OPTION_CODE_ALREADY_USED: 'Une autre option utilise déjà ce code.',
  OPTION_OFFERING_NOT_FOUND: "Cette option n'est pas ouverte à ce niveau.",
  OPTION_CHOICE_NOT_FOUND: 'Ce vœu est introuvable.',
  OPTION_CHOICE_ALREADY_EXISTS: 'Cet élève a déjà un vœu sur cette option.',
  OPTION_CAPACITY_REACHED: 'Le groupe est complet. Un vœu supplémentaire passe en liste '
    + "d'attente ; confirmer une place au-delà de la capacité créerait un effectif que "
    + 'la salle ne peut pas contenir.',
  OPTION_LEVEL_MISMATCH: "Cette option n'est pas ouverte au niveau de l'élève : elle ne "
    + "tomberait sur aucune heure de son emploi du temps.",
  OPTION_IN_USE: 'Des élèves ont choisi cette option. Retirez leurs vœux avant de la '
    + 'fermer : sinon ils se retrouveraient sans enseignement, sans que rien ne le '
    + 'signale.',

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
/**
 * Codes dont le serveur écrit un message plus précis que la table.
 *
 * La règle générale est que la table gagne : les messages par défaut du
 * serveur sont en anglais et ne doivent jamais atteindre l'utilisateur. Mais
 * pour une adresse inconnue, le serveur écrit une phrase française qui nomme
 * la route manquante — « GET /api/v1/family-requests » — et cette phrase
 * désigne le problème, là où « Élément introuvable » envoie chercher une
 * fiche qui n'a jamais été demandée.
 */
const SERVER_MESSAGE_WINS = new Set(['ENDPOINT_NOT_FOUND']);

export function translateErrorCode(code: string, error?: ApiError): string {
  const preferred = SERVER_MESSAGE_WINS.has(code) ? error?.message?.trim() : undefined;
  const base = preferred || MESSAGES[code] || error?.message || 'Une erreur est survenue.';
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
