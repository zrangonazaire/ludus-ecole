/**
 * Paramètres de l'établissement, tels que lus depuis `GET /api/v1/school`.
 *
 * <p>Le code et le statut de l'école viennent dans la lecture mais ne
 * reviennent jamais dans l'écriture : ils identifient l'établissement dans
 * les séquences de numérotation et décident de ce que le système accepte
 * encore. L'écran les montre, nulle part il ne propose de les changer.</p>
 */
export interface SchoolSettings {
  id: string;
  code: string;
  status: string | null;

  name: string;
  legalName: string | null;
  motto: string | null;
  registrationNumber: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  country: string;

  currency: string;
  locale: string;
  timezone: string;

  /** Note maximale de l'échelle de notation, 20 dans la plupart des écoles. */
  gradingScaleMax: number;
  rankingEnabled: boolean;

  studentNumberPattern: string;
  receiptNumberPattern: string;
  invoiceNumberPattern: string;
}

/** Ce que l'écran peut réellement envoyer en PUT /api/v1/school. */
export interface SchoolSettingsPayload {
  name: string;
  legalName: string | null;
  motto: string | null;
  registrationNumber: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  country: string;
  currency: string;
  locale: string;
  timezone: string;
  gradingScaleMax: number;
  rankingEnabled: boolean;
  studentNumberPattern: string;
  receiptNumberPattern: string;
  invoiceNumberPattern: string;
}

/** Fuseaux courants d'un établissement d'Afrique de l'Ouest et d'Europe. */
export const COMMON_TIMEZONES: ReadonlyArray<string> = [
  'Africa/Abidjan',
  'Africa/Bamako',
  'Africa/Ouagadougou',
  'Africa/Dakar',
  'Africa/Lagos',
  'Africa/Algiers',
  'Africa/Casablanca',
  'Europe/Paris',
  'Europe/Brussels',
  'UTC'
];

export const COMMON_LOCALES: ReadonlyArray<string> = ['fr-CI', 'fr-FR', 'en', 'en-GB'];
