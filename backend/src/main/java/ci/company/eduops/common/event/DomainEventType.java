package ci.company.eduops.common.event;

/** Catalogue of domain events (sections 48 and 49). */
public enum DomainEventType {

    STUDENT_ENROLLED,
    STUDENT_TRANSFERRED,
    ATTENDANCE_RECORDED,
    ABSENCE_RECORDED,
    GRADE_SUBMITTED,
    GRADE_VALIDATED,
    GRADE_PUBLISHED,
    REPORT_CARD_PUBLISHED,
    PAYMENT_RECEIVED,
    PAYMENT_CANCELLED,
    OVERDUE_PAYMENT_DETECTED,
    TIMETABLE_CHANGED,
    ALERT_CREATED,
    ANNOUNCEMENT_PUBLISHED;

    /** WebSocket destination this event is broadcast to. */
    public String channel() {
        return switch (this) {
            case ATTENDANCE_RECORDED, ABSENCE_RECORDED -> "/channels/attendance";
            case GRADE_SUBMITTED, GRADE_VALIDATED, GRADE_PUBLISHED, REPORT_CARD_PUBLISHED ->
                    "/channels/grades";
            case PAYMENT_RECEIVED, PAYMENT_CANCELLED, OVERDUE_PAYMENT_DETECTED ->
                    "/channels/payments";
            case ALERT_CREATED -> "/channels/alerts";
            case ANNOUNCEMENT_PUBLISHED -> "/channels/notifications";
            default -> "/channels/dashboard";
        };
    }

    /** Whether receiving this event should invalidate the dashboard cache. */
    public boolean affectsDashboard() {
        return this != ANNOUNCEMENT_PUBLISHED;
    }
}
