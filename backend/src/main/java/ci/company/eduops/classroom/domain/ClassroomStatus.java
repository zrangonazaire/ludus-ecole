package ci.company.eduops.classroom.domain;

public enum ClassroomStatus {
    DRAFT,
    ACTIVE,
    CLOSED,
    ARCHIVED;

    public boolean acceptsEnrollments() {
        return this == ACTIVE;
    }
}
