package ci.company.eduops.messaging.domain;

/**
 * The lists the product can build on its own.
 *
 * <p>Each one exists because a secretary would otherwise rebuild it by hand
 * from a screen the software already computed. That is the whole point of the
 * reminders tab: not to write messages, but to stop retyping what is known.</p>
 */
public enum ReminderType {

    /** Scolarité en retard. */
    UNPAID_FEES,
    /** Absences répétées non justifiées. */
    REPEATED_ABSENCE,
    /** Vaccin exigé, sans preuve au dossier. */
    MISSING_VACCINE,
    /** Visite médicale prévue, jamais passée. */
    OVERDUE_EXAM,
    /** Pièce de sortie non remise. */
    MISSING_DOCUMENT,
    /** Bulletin publié, à venir chercher. */
    REPORT_CARD;

    /**
     * Whether this reminder concerns money.
     *
     * <p>Decides which guardian is written to: {@code student_guardian} carries
     * {@code receives_financial_notifications} separately from
     * {@code receives_notifications}, because the parent who pays is often not
     * the parent who is told about a fever.</p>
     */
    public boolean isFinancial() {
        return this == UNPAID_FEES;
    }

    /**
     * Whether this reminder concerns schooling proper.
     *
     * <p>Read against {@code receives_academic_reports}.</p>
     */
    public boolean isAcademic() {
        return this == REPORT_CARD || this == REPEATED_ABSENCE;
    }

    /** The default subject line, when the school writes none. */
    public String defaultTitle() {
        return switch (this) {
            case UNPAID_FEES -> "Rappel de scolarité";
            case REPEATED_ABSENCE -> "Absences répétées";
            case MISSING_VACCINE -> "Carnet de vaccination à présenter";
            case OVERDUE_EXAM -> "Visite médicale à passer";
            case MISSING_DOCUMENT -> "Pièces à retirer au secrétariat";
            case REPORT_CARD -> "Bulletin disponible";
        };
    }
}
