/** Journal d'audit : qui a fait quoi, et quand. */

export type AuditAction =
  | 'CREATE' | 'UPDATE' | 'DELETE' | 'READ_SENSITIVE' | 'VALIDATE'
  | 'PUBLISH' | 'CANCEL' | 'LOGIN' | 'LOGIN_FAILED' | 'LOGOUT'
  | 'PERMISSION_CHANGE' | 'EXPORT' | 'IMPORT';

/**
 * Une entrée du journal.
 *
 * <p>Aucun champ ne porte le contenu des données modifiées, et c'est
 * délibéré : le serveur ne l'envoie pas. Ajouter ici un champ de valeur
 * n'apporterait rien — il resterait vide — mais laisserait croire au
 * prochain lecteur que le contenu est disponible.</p>
 */
export interface AuditEntry {
  id: number;
  occurredAt: string;
  action: AuditAction;
  actionLabel: string;
  entityType: string;
  entityTypeLabel: string;
  entityId?: string;
  entityLabel?: string;
  username?: string;
  userId?: string;
  /** Les noms des champs touchés, déjà traduits. */
  changedFields: string[];
  reason?: string;
  success: boolean;
  errorCode?: string;
  ipAddress?: string;
  correlationId?: string;
}

export interface AuditQuery {
  action?: AuditAction | '';
  entityType?: string;
  from?: string;
  to?: string;
  page?: number;
  size?: number;
}

export const AUDIT_ACTIONS: ReadonlyArray<{
  code: AuditAction; label: string; tone: string
}> = [
  { code: 'CREATE', label: 'Création', tone: 'create' },
  { code: 'UPDATE', label: 'Modification', tone: 'update' },
  { code: 'DELETE', label: 'Suppression', tone: 'delete' },
  { code: 'VALIDATE', label: 'Validation', tone: 'validate' },
  { code: 'PUBLISH', label: 'Publication', tone: 'validate' },
  { code: 'CANCEL', label: 'Annulation', tone: 'cancel' },
  { code: 'LOGIN', label: 'Connexion', tone: 'login' },
  { code: 'LOGIN_FAILED', label: 'Échec de connexion', tone: 'failed' },
  { code: 'LOGOUT', label: 'Déconnexion', tone: 'login' },
  { code: 'PERMISSION_CHANGE', label: 'Changement de droits', tone: 'permission' },
  { code: 'READ_SENSITIVE', label: 'Consultation sensible', tone: 'permission' },
  { code: 'EXPORT', label: 'Export', tone: 'transfer' },
  { code: 'IMPORT', label: 'Import', tone: 'transfer' }
];
