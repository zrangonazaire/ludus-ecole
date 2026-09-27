/** The order used by a principal while the council examines each pupil. */
export const PROMOTION_DECISIONS = [
    { code: 'PENDING_DECISION', label: 'En attente', tone: 'todo' },
    { code: 'PASS', label: 'Admis', tone: 'done' },
    { code: 'PROMOTED', label: 'Passe en classe supérieure', tone: 'done' },
    { code: 'REPEAT', label: 'Redouble', tone: 'warning' },
    { code: 'ORIENTATION_REQUIRED', label: 'Orientation à décider', tone: 'review' },
    { code: 'TRANSFER_RECOMMENDED', label: 'Réorientation conseillée', tone: 'review' },
    { code: 'GRADUATED', label: 'Fin de cycle', tone: 'done' }
];
export const COUNCIL_STATES = [
    { code: 'PLANNED', label: 'À venir', tone: 'todo' },
    { code: 'IN_PROGRESS', label: 'En cours', tone: 'review' },
    { code: 'CLOSED', label: 'Clos', tone: 'done' },
    { code: 'ARCHIVED', label: 'Archivé', tone: 'off' }
];
//# sourceMappingURL=council.models.js.map