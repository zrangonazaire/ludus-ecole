package ci.company.eduops.grade.domain;

import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

/** Grade workflow DRAFT -> SUBMITTED -> VALIDATED -> PUBLISHED (section 33). */
public enum GradeStatus {

    DRAFT, SUBMITTED, VALIDATED, PUBLISHED;

    private static final Map<GradeStatus, Set<GradeStatus>> ALLOWED = Map.of(
            DRAFT,     EnumSet.of(SUBMITTED),
            SUBMITTED, EnumSet.of(VALIDATED, DRAFT),
            VALIDATED, EnumSet.of(PUBLISHED, SUBMITTED),
            PUBLISHED, EnumSet.noneOf(GradeStatus.class));

    public boolean canTransitionTo(GradeStatus target) {
        return this != target
                && ALLOWED.getOrDefault(this, EnumSet.noneOf(GradeStatus.class)).contains(target);
    }

    /** Only validated or published marks enter an average (rule 14). */
    public boolean countsForAverage() {
        return this == VALIDATED || this == PUBLISHED;
    }

    /** Rule 6: past this point a change needs a permission and a justification. */
    public boolean requiresJustifiedCorrection() {
        return this == VALIDATED || this == PUBLISHED;
    }
}
