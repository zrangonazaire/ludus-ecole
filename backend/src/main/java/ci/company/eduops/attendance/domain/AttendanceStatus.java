package ci.company.eduops.attendance.domain;

/** Attendance marks (section 28). */
public enum AttendanceStatus {
    PRESENT,
    ABSENT,
    LATE,
    EXCUSED_ABSENCE,
    EXCUSED_LATE,
    LEFT_EARLY;

    public boolean isAbsence() {
        return this == ABSENT || this == EXCUSED_ABSENCE;
    }

    public boolean isLateness() {
        return this == LATE || this == EXCUSED_LATE;
    }

    /** Counts as attended for the attendance rate. */
    public boolean countsAsPresent() {
        return this == PRESENT || this == LATE || this == EXCUSED_LATE || this == LEFT_EARLY;
    }

    /** Triggers a notification to the guardians. */
    public boolean notifiesGuardian() {
        return this == ABSENT || this == LATE;
    }
}
