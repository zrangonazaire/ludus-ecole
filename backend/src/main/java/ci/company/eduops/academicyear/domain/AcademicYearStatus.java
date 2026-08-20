package ci.company.eduops.academicyear.domain;

import java.util.EnumSet;
import java.util.Set;

/**
 * Lifecycle of a school year. Transitions are guarded so an accidental API call
 * cannot reopen a closed year or activate two years at once (section 19).
 */
public enum AcademicYearStatus {

    DRAFT,
    OPEN,
    ACTIVE,
    CLOSING,
    CLOSED,
    ARCHIVED;

    private static final java.util.Map<AcademicYearStatus, Set<AcademicYearStatus>> ALLOWED =
            java.util.Map.of(
                    DRAFT, EnumSet.of(OPEN, ARCHIVED),
                    OPEN, EnumSet.of(ACTIVE, DRAFT, ARCHIVED),
                    ACTIVE, EnumSet.of(CLOSING),
                    CLOSING, EnumSet.of(CLOSED, ACTIVE),
                    CLOSED, EnumSet.of(ARCHIVED),
                    ARCHIVED, EnumSet.noneOf(AcademicYearStatus.class));

    public boolean canTransitionTo(AcademicYearStatus target) {
        return ALLOWED.getOrDefault(this, EnumSet.noneOf(AcademicYearStatus.class)).contains(target);
    }

    /** Enrollments and grade entry are only possible on an open or active year. */
    public boolean acceptsOperations() {
        return this == OPEN || this == ACTIVE;
    }

    public boolean isFinished() {
        return this == CLOSED || this == ARCHIVED;
    }
}
