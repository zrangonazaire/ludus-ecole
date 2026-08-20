package ci.company.eduops.curriculum.domain;

public enum AssignmentStatus {
    DRAFT,
    ACTIVE,
    SUSPENDED,
    ENDED;

    public boolean isLive() {
        return this == ACTIVE;
    }
}
