/** The kinds of paper a school actually sets, in the order they are needed. */
export const ASSESSMENT_TYPES = [
    { code: 'TEST', label: 'Devoir surveillé' },
    { code: 'QUIZ', label: 'Interrogation' },
    { code: 'EXAM', label: 'Composition' },
    { code: 'HOMEWORK', label: 'Devoir de maison' },
    { code: 'ORAL', label: 'Oral' },
    { code: 'PRACTICAL', label: 'Travaux pratiques' },
    { code: 'PROJECT', label: 'Projet' },
    { code: 'CONTINUOUS_ASSESSMENT', label: 'Contrôle continu' },
    { code: 'OTHER', label: 'Autre' }
];
/**
 * How each state looks, and what it means for the person reading the board.
 *
 * <p>The tone is not decoration: « à valider » and « publié » must not look
 * alike, because one is work waiting and the other is work finished.</p>
 */
export const ASSESSMENT_STATES = [
    { code: 'DRAFT', label: 'Brouillon', tone: 'off',
        hint: "Le devoir n'est pas encore annoncé à la classe." },
    { code: 'PLANNED', label: 'Annoncé', tone: 'todo',
        hint: 'Annoncé, pas encore passé. Ouvrez la saisie le jour venu.' },
    { code: 'OPEN', label: 'Saisie ouverte', tone: 'doing',
        hint: 'La feuille est prête, aucune note saisie pour le moment.' },
    { code: 'GRADING', label: 'En correction', tone: 'doing',
        hint: 'La correction a commencé. Le compteur dit où elle en est.' },
    { code: 'SUBMITTED', label: 'À valider', tone: 'review',
        hint: "Le professeur a rendu ses notes. Elles attendent votre relecture." },
    { code: 'VALIDATED', label: 'Validé', tone: 'done',
        hint: 'Les notes comptent dans les moyennes. Les familles ne les voient pas encore.' },
    { code: 'PUBLISHED', label: 'Publié', tone: 'done',
        hint: 'Les familles voient les notes. Toute correction exige désormais un motif écrit.' },
    { code: 'CANCELLED', label: 'Annulé', tone: 'off',
        hint: "Le devoir n'a pas eu lieu et ne compte nulle part." }
];
//# sourceMappingURL=assessment.models.js.map