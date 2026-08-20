package ci.company.eduops.student.domain;

import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

/**
 * Student lifecycle (section 17).
 *
 * <p>Transitions are whitelisted: the backend refuses an arbitrary jump such as
 * APPLICANT -> GRADUATED, whatever the client sends.</p>
 */
public enum StudentStatus {

    APPLICANT,
    ADMITTED,
    ACTIVE,
    SUSPENDED,
    WITHDRAWN,
    GRADUATED,
    TRANSFERRED,
    ARCHIVED;

    private static final Map<StudentStatus, Set<StudentStatus>> ALLOWED = Map.of(
            APPLICANT,   EnumSet.of(ADMITTED, WITHDRAWN, ARCHIVED),
            ADMITTED,    EnumSet.of(ACTIVE, WITHDRAWN, ARCHIVED),
            ACTIVE,      EnumSet.of(SUSPENDED, WITHDRAWN, GRADUATED, TRANSFERRED, ARCHIVED),
            SUSPENDED,   EnumSet.of(ACTIVE, WITHDRAWN, TRANSFERRED, ARCHIVED),
            WITHDRAWN,   EnumSet.of(ACTIVE, ARCHIVED),
            GRADUATED,   EnumSet.of(ARCHIVED),
            TRANSFERRED, EnumSet.of(ARCHIVED),
            ARCHIVED,    EnumSet.noneOf(StudentStatus.class));

    public boolean canTransitionTo(StudentStatus target) {
        return this != target
                && ALLOWED.getOrDefault(this, EnumSet.noneOf(StudentStatus.class)).contains(target);
    }

    /** Only an admitted or already active student may be enrolled. */
    public boolean canBeEnrolled() {
        return this == ADMITTED || this == ACTIVE;
    }

    public boolean isActive() {
        return this == ACTIVE;
    }

    public boolean isFinal() {
        return this == GRADUATED || this == TRANSFERRED || this == ARCHIVED;
    }
}
