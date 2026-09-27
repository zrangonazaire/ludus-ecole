/**
 * The six marks, in the order they are needed.
 *
 * <p>Present first because it is the answer for nine pupils in ten, and the
 * excused variants last: on the morning of the roll call nobody knows yet
 * whether an absence will be justified — that is decided days later, at the
 * office, with a slip in hand.</p>
 */
export const ATTENDANCE_MARKS = [
    { code: 'PRESENT', label: 'Présent', short: 'P', tone: 'ok',
        hint: 'En classe à l\'heure.' },
    { code: 'ABSENT', label: 'Absent', short: 'A', tone: 'absent',
        hint: 'Absent sans justificatif pour l\'instant. La famille est prévenue.' },
    { code: 'LATE', label: 'En retard', short: 'R', tone: 'late',
        hint: 'Arrivé après le début. Indiquez l\'heure : c\'est elle qui rend le retard mesurable.' },
    { code: 'LEFT_EARLY', label: 'Parti avant la fin', short: 'D', tone: 'other',
        hint: 'Présent puis reparti. Compte comme présent au taux de présence.' },
    { code: 'EXCUSED_ABSENCE', label: 'Absence justifiée', short: 'AJ', tone: 'absent',
        hint: 'À réserver aux absences déjà couvertes par un justificatif reçu.' },
    { code: 'EXCUSED_LATE', label: 'Retard justifié', short: 'RJ', tone: 'late',
        hint: 'Retard déjà couvert par un mot ou un justificatif.' }
];
/** Marks proposed on the roll call buttons; the rest passes by the office. */
export const QUICK_MARKS = ['PRESENT', 'ABSENT', 'LATE'];
//# sourceMappingURL=attendance.models.js.map