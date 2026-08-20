package ci.company.eduops.security.entity;

/** Lifecycle of an application account. */
public enum UserStatus {
    PENDING,
    ACTIVE,
    LOCKED,
    DISABLED,
    ARCHIVED;

    public boolean canAuthenticate() {
        return this == ACTIVE;
    }
}
