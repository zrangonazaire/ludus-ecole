/**
 * Combien de SMS coûte réellement un message, et pourquoi.
 *
 * <p>Les opérateurs facturent au segment, pas au message. Un texte écrit dans
 * l'alphabet GSM 03.38 tient en 160 caractères ; un seul caractère hors de cet
 * alphabet bascule tout le message en UCS-2, où un segment n'en contient que
 * 70. Une relance de 150 caractères coûte donc un SMS — ou trois, si quelqu'un
 * a écrit « Août » au lieu de « Aout ».</p>
 *
 * <p>Ce compteur tourne pendant la frappe, pour que la secrétaire voie le coût
 * monter avant d'envoyer, pas sur la facture du mois suivant. Le serveur
 * possède la même règle : c'est lui qui facture, celui-ci ne fait qu'avertir.
 * Les deux sont tenus par un fichier de vecteurs commun,
 * `backend/src/test/resources/sms-segment-vectors.json`, pour que la divergence
 * se remarque au lieu de se découvrir.</p>
 *
 * <p>Le piège français est étroit et vaut d'être connu : « é è à ù ì ò É Ä Ö Ñ
 * Ü Ç » sont dans l'alphabet, mais « ê â î ô û ë ï ç œ » n'y sont pas. Le c
 * cédille minuscule est absent alors que la majuscule y figure — d'où
 * « français » cher et « FRANÇAIS » bon marché.</p>
 */

/** Alphabet GSM 03.38 : un septet chacun. */
const GSM_BASIC =
  '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?'
  + '¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà';

/** Atteignables seulement par échappement : deux septets chacun. */
const GSM_EXTENDED = '^{}\\[~]|€';

const GSM_SINGLE = 160;
const GSM_CONCATENATED = 153;
const UCS2_SINGLE = 70;
const UCS2_CONCATENATED = 67;

/**
 * Substitutions proposables : l'accent saute, le sens reste.
 * Uniquement des caractères réellement hors de l'alphabet de base.
 */
const SUGGESTIONS: ReadonlyArray<readonly [string, string]> = [
  ['ê', 'e'], ['â', 'a'], ['î', 'i'], ['ô', 'o'], ['û', 'u'],
  ['ë', 'e'], ['ï', 'i'], ['ü', 'u'], ['ÿ', 'y'], ['ç', 'c'],
  ['œ', 'o'], ['æ', 'a'], ['À', 'A'], ['È', 'E'], ['Ù', 'U'],
  ['Ê', 'E'], ['Â', 'A'], ['Î', 'I'], ['Ô', 'O'], ['Û', 'U'],
  ['’', "'"], ['‘', "'"], ['«', '"'], ['»', '"'], ['…', '.'],
  ['–', '-'], ['—', '-']
];

export interface SmsEstimate {
  /** Vrai quand le message a dû basculer en UCS-2. */
  unicode: boolean;
  /** Longueur facturable : un caractère échappé compte double. */
  characters: number;
  segments: number;
  /** Les caractères qui ont forcé l'UCS-2, dans l'ordre d'apparition. */
  offenders: string[];
  /**
   * Le même message, écrivable dans l'alphabet de base.
   *
   * Nul quand aucune substitution n'aide : l'école écrit peut-être dans une
   * langue que l'alphabet ne couvre pas, et ce n'est pas au logiciel de la
   * défigurer.
   */
  suggestion: string | null;
}

function ceilDiv(value: number, divisor: number): number {
  return Math.ceil(value / divisor);
}

function isUnicodeOnly(text: string): boolean {
  for (const char of Array.from(text)) {
    if (GSM_BASIC.indexOf(char) < 0 && GSM_EXTENDED.indexOf(char) < 0) {
      return true;
    }
  }
  return false;
}

/** Réécrit un message pour qu'il tienne dans l'alphabet de base. */
export function simplifySms(body: string): string {
  let out = '';
  for (const char of Array.from(body)) {
    const match = SUGGESTIONS.find((pair) => pair[0] === char);
    out += match ? match[1] : char;
  }
  return out;
}

/** Mesure un message comme l'opérateur le facturera. */
export function estimateSms(body: string): SmsEstimate {
  const text = body ?? '';
  const offenders: string[] = [];
  let septets = 0;
  let unicode = false;

  // On parcourt les points de code, pas les unités : un emoji est un caractère
  // pour l'utilisateur même s'il en occupe deux en mémoire.
  for (const char of Array.from(text)) {
    if (GSM_BASIC.indexOf(char) >= 0) {
      septets += 1;
    } else if (GSM_EXTENDED.indexOf(char) >= 0) {
      septets += 2;
    } else {
      unicode = true;
      if (!offenders.includes(char)) {
        offenders.push(char);
      }
    }
  }

  let characters: number;
  let segments: number;
  if (unicode) {
    // En UCS-2 l'opérateur facture les unités de code : un emoji en occupe deux.
    characters = text.length;
    segments = characters === 0 ? 1
      : characters <= UCS2_SINGLE ? 1
        : ceilDiv(characters, UCS2_CONCATENATED);
  } else {
    characters = septets;
    segments = characters === 0 ? 1
      : characters <= GSM_SINGLE ? 1
        : ceilDiv(characters, GSM_CONCATENATED);
  }

  let suggestion: string | null = null;
  if (unicode) {
    const simplified = simplifySms(text);
    // Une proposition qui ne change rien, ou qui reste hors alphabet, ne vaut
    // pas d'être affichée : elle ferait espérer une économie inexistante.
    if (simplified !== text && !isUnicodeOnly(simplified)) {
      suggestion = simplified;
    }
  }

  return { unicode, characters, segments, offenders, suggestion };
}

/** Coût d'un message, en unités de la devise de l'école. */
export function smsCost(body: string, unitCost: number): number {
  return Math.round(estimateSms(body).segments * (unitCost || 0) * 100) / 100;
}
