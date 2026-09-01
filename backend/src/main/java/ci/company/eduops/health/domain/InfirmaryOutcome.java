package ci.company.eduops.health.domain;

/** How a visit to the infirmary ended. */
public enum InfirmaryOutcome {

    /** Reparti en cours. */
    BACK_TO_CLASS,
    /** Gardé en observation à l'infirmerie. */
    RESTED,
    /** Confié à la famille. */
    SENT_HOME,
    /** Orienté vers un centre de santé. */
    REFERRED,
    /** Évacuation en urgence. */
    EMERGENCY;

    /**
     * Whether the pupil left the school's care.
     *
     * <p>The family must have been reached before this is recorded: a child
     * handed over or evacuated without anyone being told is the mistake the
     * register exists to prevent.</p>
     */
    public boolean requiresGuardian() {
        return this == SENT_HOME || this == EMERGENCY;
    }

    /** Whether an outside practitioner or facility must be named. */
    public boolean requiresReferral() {
        return this == REFERRED || this == EMERGENCY;
    }
}
