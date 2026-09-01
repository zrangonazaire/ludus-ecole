package ci.company.eduops.health.domain;

/** The finding of a medical examination. */
public enum ExaminationOutcome {

    /** Programmée, pas encore passée. */
    PENDING,
    FIT,
    /** Apte avec un aménagement, qui doit être écrit. */
    FIT_WITH_RESERVE,
    UNFIT,
    REFERRED,
    /** L'élève ne s'est pas présenté. */
    MISSED;

    /** A finding is only known once the examination has actually taken place. */
    public boolean isSettled() {
        return this != PENDING && this != MISSED;
    }

    /** Whether the restriction to apply must be spelled out. */
    public boolean requiresRestriction() {
        return this == FIT_WITH_RESERVE;
    }

    /**
     * Whether this examination still owes the school something.
     *
     * <p>Drives the follow-up list: a missed examination is not a closed one.</p>
     */
    public boolean isOutstanding() {
        return this == PENDING || this == MISSED;
    }
}
