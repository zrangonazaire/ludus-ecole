package ci.company.eduops.promotion.domain;

/** Class council outcome for a pupil (section 36). */
public enum PromotionDecisionType {
    PASS,
    REPEAT,
    PROMOTED,
    GRADUATED,
    TRANSFER_RECOMMENDED,
    ORIENTATION_REQUIRED,
    PENDING_DECISION;

    /** Decisions that move the pupil to the next level at re-enrollment. */
    public boolean movesToNextLevel() {
        return this == PASS || this == PROMOTED;
    }

    public boolean isFinal() {
        return this != PENDING_DECISION;
    }
}
