/**
 * Ma boîte de réception.
 *
 * <p>Nommé « inbox » et non « notification » : le projet a déjà un
 * `NotificationService` côté cœur, qui affiche les bulles éphémères. Deux
 * choses différentes portant le même nom finissent toujours par être
 * confondues à l'import.</p>
 */

export interface InboxMessage {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  body: string;
  actionUrl?: string;
  studentId?: string;
  unread: boolean;
  createdAt: string;
  readAt?: string;
}

export interface InboxQuery {
  category?: string;
  unreadOnly?: boolean;
  page?: number;
  size?: number;
}

/** Le ton visuel de chaque catégorie. La couleur double l'étiquette. */
export const INBOX_CATEGORIES: ReadonlyArray<{
  code: string; label: string; tone: string
}> = [
  { code: 'ABSENCE', label: 'Absence', tone: 'absence' },
  { code: 'GRADE', label: 'Notes', tone: 'grade' },
  { code: 'REPORT_CARD', label: 'Bulletin', tone: 'report' },
  { code: 'PAYMENT', label: 'Paiement', tone: 'payment' },
  { code: 'ENROLLMENT', label: 'Inscription', tone: 'enrollment' },
  { code: 'ANNOUNCEMENT', label: 'Annonce', tone: 'announcement' }
];
