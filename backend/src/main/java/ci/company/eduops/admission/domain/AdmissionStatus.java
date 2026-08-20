package ci.company.eduops.admission.domain;

import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

/** Admission funnel: from a form to an enrolled student. */
public enum AdmissionStatus {

    DRAFT,
    SUBMITTED,
    UNDER_REVIEW,
    TESTED,
    ACCEPTED,
    WAITLISTED,
    REJECTED,
    WITHDRAWN,
    /** Converted into a Student + Enrollment. Terminal. */
    CONVERTED;

    private static final Map<AdmissionStatus, Set<AdmissionStatus>> ALLOWED = Map.of(
            DRAFT,        EnumSet.of(SUBMITTED, WITHDRAWN),
            SUBMITTED,    EnumSet.of(UNDER_REVIEW, REJECTED, WITHDRAWN),
            UNDER_REVIEW, EnumSet.of(TESTED, ACCEPTED, WAITLISTED, REJECTED, WITHDRAWN),
            TESTED,       EnumSet.of(ACCEPTED, WAITLISTED, REJECTED, WITHDRAWN),
            ACCEPTED,     EnumSet.of(CONVERTED, WITHDRAWN),
            WAITLISTED,   EnumSet.of(ACCEPTED, REJECTED, WITHDRAWN),
            REJECTED,     EnumSet.noneOf(AdmissionStatus.class),
            WITHDRAWN,    EnumSet.noneOf(AdmissionStatus.class),
            CONVERTED,    EnumSet.noneOf(AdmissionStatus.class));

    public boolean canTransitionTo(AdmissionStatus target) {
        return this != target
                && ALLOWED.getOrDefault(this, EnumSet.noneOf(AdmissionStatus.class)).contains(target);
    }

    /** Statuses that hold a reserved seat in projectedAvailableSeats. */
    public boolean reservesSeat() {
        return this == UNDER_REVIEW || this == ACCEPTED || this == WAITLISTED;
    }
}
