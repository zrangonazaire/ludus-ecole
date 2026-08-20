package ci.company.eduops.attendance.domain;

public enum AttendanceSessionStatus {
    OPEN, SUBMITTED, VALIDATED, LOCKED;

    public boolean isEditable() {
        return this == OPEN || this == SUBMITTED;
    }
}
