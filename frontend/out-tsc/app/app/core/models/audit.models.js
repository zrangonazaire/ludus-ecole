/** Journal d'audit : qui a fait quoi, et quand. */
export const AUDIT_ACTIONS = [
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
//# sourceMappingURL=audit.models.js.map