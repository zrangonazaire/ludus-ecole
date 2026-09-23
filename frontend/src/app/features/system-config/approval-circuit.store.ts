import { ApprovalMode } from '@core/models/approval-circuit.models';


/** Un niveau de la chaîne de validation, tel qu'édité dans la modale. */
export interface ApprovalCircuitLevel {
  /** Code du niveau, ex. DOPI. */
  code: string;
  /** Identifiants des comptes valideurs (`app_user.id`). */
  memberIds: string[];
  /** Tous les valideurs doivent approuver, ou un seul suffit. */
  mode: ApprovalMode;
  /** Vrai pour le dernier niveau : la demande devient effective après lui. */
  isLast: boolean;
}

export interface ApprovalCircuit {
  id: string;
  /** Code du circuit, ex. VAL-ADM. Unique par établissement. */
  code: string;
  /** Nom du circuit, ex. VALIDATION DOSSIER ADMISSION. */
  name: string;
  usage: string;
  levels: ApprovalCircuitLevel[];
}

/** Editor shape; persistence is provided by ApprovalCircuitService. */
