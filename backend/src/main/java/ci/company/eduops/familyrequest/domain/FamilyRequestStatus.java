package ci.company.eduops.familyrequest.domain;

/** Progress of a family request through the administrative queue. */
public enum FamilyRequestStatus {
    NEW,
    IN_PROGRESS,
    WAITING_FAMILY,
    READY,
    COMPLETED,
    REJECTED;

    public boolean isClosed() {
        return this == COMPLETED || this == REJECTED;
    }
}
