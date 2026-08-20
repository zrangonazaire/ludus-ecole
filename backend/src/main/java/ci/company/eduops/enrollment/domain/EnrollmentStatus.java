package ci.company.eduops.enrollment.domain;

import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

/** Enrollment lifecycle (section 21). */
public enum EnrollmentStatus {

    DRAFT,
    PENDING,
    VALIDATED,
    ACTIVE,
    SUSPENDED,
    CANCELLED,
    COMPLETED,
    TRANSFERRED;

    private static final Map<EnrollmentStatus, Set<EnrollmentStatus>> ALLOWED = Map.of(
            DRAFT,     EnumSet.of(PENDING, VALIDATED, CANCELLED),
            PENDING,   EnumSet.of(VALIDATED, CANCELLED),
            VALIDATED, EnumSet.of(ACTIVE, SUSPENDED, CANCELLED, TRANSFERRED),
            ACTIVE,    EnumSet.of(SUSPENDED, COMPLETED, TRANSFERRED, CANCELLED),
            SUSPENDED, EnumSet.of(ACTIVE, CANCELLED, TRANSFERRED),
            CANCELLED, EnumSet.noneOf(EnrollmentStatus.class),
            COMPLETED, EnumSet.noneOf(EnrollmentStatus.class),
            TRANSFERRED, EnumSet.noneOf(EnrollmentStatus.class));

    public boolean canTransitionTo(EnrollmentStatus target) {
        return this != target
                && ALLOWED.getOrDefault(this, EnumSet.noneOf(EnrollmentStatus.class)).contains(target);
    }

    /** Statuses that occupy a seat in the class capacity computation (rule 9). */
    public boolean occupiesSeat() {
        return this == VALIDATED || this == ACTIVE;
    }

    /** Statuses that forbid a second enrollment for the same year (rule 21). */
    public boolean blocksNewEnrollment() {
        return this == DRAFT || this == PENDING || this == VALIDATED
                || this == ACTIVE || this == SUSPENDED;
    }

    public boolean isLive() {
        return this == VALIDATED || this == ACTIVE;
    }
}
