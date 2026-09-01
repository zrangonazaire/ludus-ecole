package ci.company.eduops.enrollment.domain;

/**
 * Why a pupil leaves the school.
 *
 * <p>The reason is not decoration: it decides which papers the family leaves
 * with, and whether the pupil may be re-enrolled later. A disciplinary
 * exclusion and a house move both end the schooling here, and a secretary who
 * cannot tell them apart in two years' time will re-admit the wrong one.</p>
 */
public enum DepartureReason {

    /** Part vers un autre établissement, qui réclamera l'exeat. */
    TRANSFER_OUT,
    FAMILY_MOVE,
    FINANCIAL,
    DISCIPLINARY,
    ACADEMIC,
    HEALTH,
    /** L'élève ne revient plus, sans nouvelles de la famille. */
    ABANDONMENT,
    OTHER;

    /** A departure towards a named school needs that school on the paperwork. */
    public boolean requiresDestination() {
        return this == TRANSFER_OUT;
    }

    /**
     * Whether the pupil may be enrolled again later.
     *
     * <p>An exclusion is a decision of the school; letting the same pupil back
     * in through a re-enrolment screen would quietly undo it.</p>
     */
    public boolean allowsReturn() {
        return this != DISCIPLINARY;
    }
}
