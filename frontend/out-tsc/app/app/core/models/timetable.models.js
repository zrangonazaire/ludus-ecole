/** Emploi du temps : grille hebdomadaire et détection des conflits. */
/** Libellés français des jours, dans l'ordre de la semaine. */
export const DAY_LABELS = {
    MONDAY: 'Lundi',
    TUESDAY: 'Mardi',
    WEDNESDAY: 'Mercredi',
    THURSDAY: 'Jeudi',
    FRIDAY: 'Vendredi',
    SATURDAY: 'Samedi',
    SUNDAY: 'Dimanche'
};
/** Messages courts par type de conflit, pour l'infobulle de la case refusée. */
export const CONFLICT_LABELS = {
    TEACHER_BUSY: 'Enseignant occupé',
    CLASS_BUSY: 'Classe occupée',
    ROOM_BUSY: 'Salle réservée',
    TEACHER_NOT_ASSIGNED: 'Enseignant non affecté',
    INVALID_TIME_RANGE: 'Horaire invalide'
};
//# sourceMappingURL=timetable.models.js.map