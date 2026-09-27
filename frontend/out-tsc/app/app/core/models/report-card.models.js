/**
 * The council's decisions, in the order a French-system school considers them.
 *
 * <p>« Décision en attente » is first because it is the honest default: a
 * report card generated before the council has met has no decision, and
 * pre-filling « Admis » would put words in the council's mouth.</p>
 */
export const COUNCIL_DECISIONS = [
    { code: 'PENDING_DECISION', label: 'Décision en attente',
        hint: "Le conseil ne s'est pas encore prononcé." },
    { code: 'PASS', label: 'Admis',
        hint: "L'élève a la moyenne et passe." },
    { code: 'PROMOTED', label: 'Passe en classe supérieure',
        hint: 'Passage décidé par le conseil, moyenne atteinte ou non.' },
    { code: 'REPEAT', label: 'Redouble',
        hint: "L'élève reprend le même niveau l'année prochaine." },
    { code: 'ORIENTATION_REQUIRED', label: 'Orientation à décider',
        hint: 'Le conseil demande un entretien avant de trancher.' },
    { code: 'TRANSFER_RECOMMENDED', label: 'Réorientation conseillée',
        hint: "Le conseil recommande un autre établissement ou une autre filière." },
    { code: 'GRADUATED', label: 'Fin de cycle',
        hint: "L'élève achève le cycle : il ne se réinscrit pas au même niveau." }
];
/** How each state looks on the board. */
export const REPORT_CARD_STATES = [
    { code: 'DRAFT', label: 'Brouillon', tone: 'off' },
    { code: 'GENERATED', label: 'Généré', tone: 'review' },
    { code: 'VALIDATED', label: 'Validé', tone: 'review' },
    { code: 'PUBLISHED', label: 'Remis aux familles', tone: 'done' },
    { code: 'ARCHIVED', label: 'Archivé', tone: 'off' }
];
//# sourceMappingURL=report-card.models.js.map