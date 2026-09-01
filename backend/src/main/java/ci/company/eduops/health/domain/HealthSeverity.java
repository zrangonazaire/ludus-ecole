package ci.company.eduops.health.domain;

/**
 * How serious a condition is, and — through {@link #isAlert()} — who gets told.
 *
 * <p>This is the hinge of the whole confidentiality design. Below the alert
 * threshold nothing leaves the infirmary. At or above it, supervising staff
 * receive the label and the action to take, never the diagnosis.</p>
 */
public enum HealthSeverity {

    /** Signalée pour mémoire : sans effet sur la vie scolaire. */
    LOW,
    /** À connaître de l'infirmerie, sans conduite d'urgence particulière. */
    MODERATE,
    /** Demande une conduite à tenir connue des encadrants. */
    HIGH,
    /** Pronostic vital engageable : la conduite à tenir doit être immédiate. */
    CRITICAL;

    /**
     * Whether this condition is surfaced to supervising staff.
     *
     * <p>A teacher taking a class on a field trip must know a pupil carries an
     * adrenaline pen. They must not learn what the pupil is treated for.</p>
     */
    public boolean isAlert() {
        return this == HIGH || this == CRITICAL;
    }
}
