package ci.company.eduops.term.domain;

import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

/** Term lifecycle driving when grades may be entered and validated. */
public enum TermStatus {

    PLANNED,
    OPEN,
    GRADE_ENTRY,
    VALIDATION,
    CLOSED;

    private static final Map<TermStatus, Set<TermStatus>> ALLOWED = Map.of(
            PLANNED, EnumSet.of(OPEN),
            OPEN, EnumSet.of(GRADE_ENTRY, PLANNED),
            GRADE_ENTRY, EnumSet.of(VALIDATION, OPEN),
            VALIDATION, EnumSet.of(CLOSED, GRADE_ENTRY),
            CLOSED, EnumSet.of(VALIDATION));

    public boolean canTransitionTo(TermStatus target) {
        return ALLOWED.getOrDefault(this, EnumSet.noneOf(TermStatus.class)).contains(target);
    }

    /** Teachers may only enter marks while the term is open for grading. */
    public boolean acceptsGradeEntry() {
        return this == OPEN || this == GRADE_ENTRY;
    }

    public boolean acceptsValidation() {
        return this == GRADE_ENTRY || this == VALIDATION;
    }
}
