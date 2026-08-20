package ci.company.eduops.classroom.domain;

/** Visual state of a class's occupancy (section 22). */
public enum CapacityStatus {
    AVAILABLE,
    WARNING,
    FULL,
    OVER_CAPACITY;

    public boolean blocksEnrollment() {
        return this == FULL || this == OVER_CAPACITY;
    }
}
