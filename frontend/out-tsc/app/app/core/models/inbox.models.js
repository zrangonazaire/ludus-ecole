/**
 * Ma boîte de réception.
 *
 * <p>Nommé « inbox » et non « notification » : le projet a déjà un
 * `NotificationService` côté cœur, qui affiche les bulles éphémères. Deux
 * choses différentes portant le même nom finissent toujours par être
 * confondues à l'import.</p>
 */
/** Le ton visuel de chaque catégorie. La couleur double l'étiquette. */
export const INBOX_CATEGORIES = [
    { code: 'ABSENCE', label: 'Absence', tone: 'absence' },
    { code: 'GRADE', label: 'Notes', tone: 'grade' },
    { code: 'REPORT_CARD', label: 'Bulletin', tone: 'report' },
    { code: 'PAYMENT', label: 'Paiement', tone: 'payment' },
    { code: 'ENROLLMENT', label: 'Inscription', tone: 'enrollment' },
    { code: 'ANNOUNCEMENT', label: 'Annonce', tone: 'announcement' }
];
//# sourceMappingURL=inbox.models.js.map