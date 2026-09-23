/**
 * Circuits de validation, tels que lus depuis `GET /api/v1/approval-circuits`.
 *
 * <p>Un circuit est un modèle nommé : un code, un nom, et une chaîne de
 * niveaux ordonnés. Chaque niveau est confié à des valideurs nommés ; le
 * dernier niveau est celui qui rend la demande effective. Le modèle vit côté
 * serveur, partagé par tous les postes de l'établissement.</p>
 */

/** Tous les valideurs du niveau doivent approuver, ou un seul suffit. */
export type ApprovalMode = 'ALL' | 'ONE';

export interface ApprovalCircuitMember {
  /** Identifiant du compte (`app_user.id`). */
  id: string;
  username?: string;
  fullName?: string;
}

export interface ApprovalCircuitLevel {
  id?: string;
  /** Rang dans la chaîne : 1 pour le premier niveau. */
  levelNumber?: number;
  /** Code du niveau, ex. DOPI. */
  code: string;
  mode: ApprovalMode;
  /** Vrai pour le dernier niveau : la demande devient effective après lui. */
  last?: boolean;
  members: ApprovalCircuitMember[];
}

export interface ApprovalCircuit {
  id: string;
  /** Code du circuit, ex. VAL-ADM. Unique par établissement. */
  code: string;
  /** Nom du circuit, ex. VALIDATION DOSSIER ADMISSION. */
  name: string;
  /** Domaine d'usage, `DISCOUNT` pour les remises de scolarité. */
  usage?: string;
  updatedAt?: string;
  levels: ApprovalCircuitLevel[];
}

/** Charge utile d'écriture : les membres sont des identifiants de comptes. */
export interface ApprovalCircuitPayload {
  usage?: string;
  code: string;
  name: string;
  levels: ApprovalCircuitLevelPayload[];
}

export interface ApprovalCircuitLevelPayload {
  code: string;
  mode: ApprovalMode;
  memberIds: string[];
}
