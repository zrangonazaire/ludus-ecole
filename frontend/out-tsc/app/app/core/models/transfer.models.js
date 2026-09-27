/**
 * The reasons, in the order a secretary meets them.
 *
 * <p>Transfer first because it is the most frequent and the only one that
 * produces an exeat the receiving school will chase. Abandonment last because
 * it is the one nobody records at the time — the pupil simply stops coming, and
 * somebody writes it down in March.</p>
 */
export const DEPARTURE_REASONS = [
    { code: 'TRANSFER_OUT', label: 'Transfert vers un autre établissement',
        hint: "L'école d'accueil réclamera l'exeat : son nom est obligatoire.",
        needsDestination: true },
    { code: 'FAMILY_MOVE', label: 'Déménagement de la famille',
        hint: "La famille quitte la ville. L'établissement d'accueil est souvent inconnu.",
        needsDestination: false },
    { code: 'FINANCIAL', label: 'Raisons financières',
        hint: 'La famille ne peut plus assumer la scolarité.', needsDestination: false },
    { code: 'DISCIPLINARY', label: 'Exclusion définitive',
        hint: 'Décision du conseil de discipline. Interdit la réinscription.',
        needsDestination: false },
    { code: 'ACADEMIC', label: 'Réorientation',
        hint: 'Le conseil de classe a recommandé une autre voie.', needsDestination: false },
    { code: 'HEALTH', label: 'Raisons de santé', hint: '', needsDestination: false },
    { code: 'ABANDONMENT', label: 'Abandon sans nouvelles',
        hint: "L'élève ne revient plus et la famille est injoignable.",
        needsDestination: false },
    { code: 'OTHER', label: 'Autre motif', hint: '', needsDestination: false }
];
/** Les quatre pièces qu'une famille doit emporter. */
export const DEPARTURE_DOCUMENTS = [
    { key: 'exeatIssued', label: 'Exeat',
        hint: "Le certificat de sortie : sans lui, l'école d'accueil n'inscrit pas." },
    { key: 'certificateIssued', label: 'Certificat de radiation',
        hint: "Atteste que l'élève ne figure plus aux effectifs." },
    { key: 'reportCardIssued', label: 'Dernier bulletin',
        hint: "Pour que l'élève ne reparte pas sans trace de ses notes." },
    { key: 'fileReturned', label: 'Dossier scolaire rendu',
        hint: 'Actes, photos, pièces déposées à l’inscription.' }
];
export const DEPARTURE_STATES = [
    { code: 'DRAFT', label: 'Brouillon', tone: 'off' },
    { code: 'RECORDED', label: 'Sortie enregistrée', tone: 'wait' },
    { code: 'CLEARED', label: 'Dossier soldé', tone: 'done' },
    { code: 'CANCELLED', label: 'Annulée', tone: 'off' }
];
//# sourceMappingURL=transfer.models.js.map