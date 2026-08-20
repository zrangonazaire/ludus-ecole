package ci.company.eduops.assessment.domain;

import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

/** Assessment lifecycle (section 31). */
public enum AssessmentStatus {

    DRAFT, PLANNED, OPEN, GRADING, SUBMITTED, VALIDATED, PUBLISHED, CANCELLED;

    private static final Map<AssessmentStatus, Set<AssessmentStatus>> ALLOWED = Map.of(
            DRAFT,     EnumSet.of(PLANNED, CANCELLED),
            PLANNED,   EnumSet.of(OPEN, DRAFT, CANCELLED),
            OPEN,      EnumSet.of(GRADING, CANCELLED),
            GRADING,   EnumSet.of(SUBMITTED, OPEN, CANCELLED),
            SUBMITTED, EnumSet.of(VALIDATED, GRADING),
            VALIDATED, EnumSet.of(PUBLISHED, SUBMITTED),
            PUBLISHED, EnumSet.noneOf(AssessmentStatus.class),
            CANCELLED, EnumSet.noneOf(AssessmentStatus.class));

    public boolean canTransitionTo(AssessmentStatus target) {
        return this != target
                && ALLOWED.getOrDefault(this, EnumSet.noneOf(AssessmentStatus.class)).contains(target);
    }

    /** Teachers may only enter marks while the assessment is open or grading. */
    public boolean acceptsGradeEntry() {
        return this == OPEN || this == GRADING;
    }

    /** Only validated marks feed the averages (rule 14). */
    public boolean countsForAverage() {
        return this == VALIDATED || this == PUBLISHED;
    }
}
