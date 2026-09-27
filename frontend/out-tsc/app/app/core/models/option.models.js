/**
 * The categories, in the order a school declares them.
 *
 * <p>Les langues d'abord : dans un collège ivoirien, la LV1 et la LV2 sont les
 * seuls choix que tout le monde doit faire. Le reste est facultatif au sens
 * propre.</p>
 */
export const OPTION_CATEGORIES = [
    { code: 'LANGUAGE', label: 'Langue vivante',
        hint: 'LV1, LV2, ou une langue à option. Renseignez le code de la langue.' },
    { code: 'ACADEMIC', label: 'Enseignement optionnel',
        hint: 'Latin, grec, mathématiques renforcées : une matière en plus du tronc commun.' },
    { code: 'ARTS', label: 'Arts',
        hint: 'Arts plastiques, musique, théâtre.' },
    { code: 'SPORT', label: 'Sport',
        hint: 'Une pratique sportive choisie, distincte de l’EPS obligatoire.' },
    { code: 'TECHNICAL', label: 'Technique',
        hint: 'Informatique, technologie, ateliers professionnels.' },
    { code: 'OTHER', label: 'Autre', hint: 'Ce qui n’entre dans aucune des cases ci-dessus.' }
];
/** L'état d'un vœu, avec la couleur qui va avec. */
export const OPTION_CHOICE_STATES = [
    { code: 'REQUESTED', label: 'Demandé', tone: 'todo',
        hint: "Le vœu est enregistré, il attend une décision de l'établissement." },
    { code: 'CONFIRMED', label: 'Confirmé', tone: 'done',
        hint: "L'élève a sa place : elle est décomptée de la capacité." },
    { code: 'WAITLISTED', label: "Sur liste d'attente", tone: 'wait',
        hint: 'Vœu recevable, mais plus de place. Une annulation en libère une.' },
    { code: 'CANCELLED', label: 'Annulé', tone: 'off',
        hint: 'Retiré par la famille ou par l’établissement. La place est rendue.' }
];
/** Palette des options, reprise de celle des matières. */
export const OPTION_COLORS = [
    '#1f5fd6', '#7c5cd6', '#0f9bb3', '#16915a', '#d97a16', '#dc3545', '#6b7280'
];
//# sourceMappingURL=option.models.js.map