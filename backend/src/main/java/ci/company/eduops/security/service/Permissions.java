package ci.company.eduops.security.service;

/**
 * Compile-time constants for every permission code seeded in V30.
 * Using these instead of string literals keeps {@code @PreAuthorize} in sync
 * with the database.
 */
public final class Permissions {

    // student
    public static final String STUDENT_VIEW = "STUDENT_VIEW";
    public static final String STUDENT_CREATE = "STUDENT_CREATE";
    public static final String STUDENT_UPDATE = "STUDENT_UPDATE";
    public static final String STUDENT_ARCHIVE = "STUDENT_ARCHIVE";
    // guardian
    public static final String GUARDIAN_VIEW = "GUARDIAN_VIEW";
    public static final String GUARDIAN_MANAGE = "GUARDIAN_MANAGE";
    // admission
    public static final String ADMISSION_VIEW = "ADMISSION_VIEW";
    public static final String ADMISSION_MANAGE = "ADMISSION_MANAGE";
    public static final String ADMISSION_DECIDE = "ADMISSION_DECIDE";
    // enrollment
    public static final String ENROLLMENT_VIEW = "ENROLLMENT_VIEW";
    public static final String ENROLLMENT_CREATE = "ENROLLMENT_CREATE";
    public static final String ENROLLMENT_VALIDATE = "ENROLLMENT_VALIDATE";
    public static final String ENROLLMENT_CANCEL = "ENROLLMENT_CANCEL";
    public static final String ENROLLMENT_OVERRIDE_CAPACITY = "ENROLLMENT_OVERRIDE_CAPACITY";
    // people
    public static final String TEACHER_VIEW = "TEACHER_VIEW";
    public static final String TEACHER_MANAGE = "TEACHER_MANAGE";
    public static final String STAFF_VIEW = "STAFF_VIEW";
    public static final String STAFF_MANAGE = "STAFF_MANAGE";
    // school / academic
    public static final String SCHOOL_VIEW = "SCHOOL_VIEW";
    public static final String SCHOOL_MANAGE = "SCHOOL_MANAGE";
<<<<<<< HEAD
    public static final String CAMPUS_VIEW = "CAMPUS_VIEW";
    public static final String CAMPUS_MANAGE = "CAMPUS_MANAGE";
=======
    public static final String LEVEL_VIEW = "LEVEL_VIEW";
    public static final String LEVEL_MANAGE = "LEVEL_MANAGE";
>>>>>>> 13f4202 (envoi de maj)
    public static final String ACADEMIC_YEAR_VIEW = "ACADEMIC_YEAR_VIEW";
    public static final String ACADEMIC_YEAR_MANAGE = "ACADEMIC_YEAR_MANAGE";
    public static final String CLASS_VIEW = "CLASS_VIEW";
    public static final String CLASS_MANAGE = "CLASS_MANAGE";
    public static final String LEVEL_VIEW = "LEVEL_VIEW";
    public static final String LEVEL_MANAGE = "LEVEL_MANAGE";
    public static final String SUBJECT_VIEW = "SUBJECT_VIEW";
    public static final String SUBJECT_MANAGE = "SUBJECT_MANAGE";
    public static final String CURRICULUM_VIEW = "CURRICULUM_VIEW";
    public static final String CURRICULUM_MANAGE = "CURRICULUM_MANAGE";
    // timetable / attendance
    public static final String TIMETABLE_VIEW = "TIMETABLE_VIEW";
    public static final String TIMETABLE_MANAGE = "TIMETABLE_MANAGE";
    public static final String ATTENDANCE_VIEW = "ATTENDANCE_VIEW";
    public static final String ATTENDANCE_CREATE = "ATTENDANCE_CREATE";
    public static final String ATTENDANCE_UPDATE = "ATTENDANCE_UPDATE";
    public static final String ATTENDANCE_JUSTIFY = "ATTENDANCE_JUSTIFY";
    // assessment / grade
    public static final String ASSESSMENT_VIEW = "ASSESSMENT_VIEW";
    public static final String ASSESSMENT_CREATE = "ASSESSMENT_CREATE";
    public static final String ASSESSMENT_MANAGE = "ASSESSMENT_MANAGE";
    public static final String GRADE_VIEW = "GRADE_VIEW";
    public static final String GRADE_CREATE = "GRADE_CREATE";
    public static final String GRADE_VALIDATE = "GRADE_VALIDATE";
    public static final String GRADE_PUBLISH = "GRADE_PUBLISH";
    public static final String GRADE_CORRECT_PUBLISHED = "GRADE_CORRECT_PUBLISHED";
    // report card / council
    public static final String REPORT_CARD_VIEW = "REPORT_CARD_VIEW";
    public static final String REPORT_CARD_GENERATE = "REPORT_CARD_GENERATE";
    public static final String REPORT_CARD_PUBLISH = "REPORT_CARD_PUBLISH";
    public static final String COUNCIL_VIEW = "COUNCIL_VIEW";
    public static final String COUNCIL_MANAGE = "COUNCIL_MANAGE";
    public static final String PROMOTION_DECIDE = "PROMOTION_DECIDE";
    // discipline
    public static final String DISCIPLINE_VIEW = "DISCIPLINE_VIEW";
    public static final String DISCIPLINE_MANAGE = "DISCIPLINE_MANAGE";
    // finance
    public static final String FINANCE_VIEW = "FINANCE_VIEW";
    public static final String FINANCE_MANAGE = "FINANCE_MANAGE";
    public static final String PAYMENT_VIEW = "PAYMENT_VIEW";
    public static final String PAYMENT_CREATE = "PAYMENT_CREATE";
    public static final String PAYMENT_CANCEL = "PAYMENT_CANCEL";
    public static final String CASH_SESSION_MANAGE = "CASH_SESSION_MANAGE";
    public static final String DISCOUNT_MANAGE = "DISCOUNT_MANAGE";
    public static final String SCHOLARSHIP_MANAGE = "SCHOLARSHIP_MANAGE";
    // cross-cutting
    public static final String DOCUMENT_VIEW = "DOCUMENT_VIEW";
    public static final String DOCUMENT_GENERATE = "DOCUMENT_GENERATE";
    public static final String NOTIFICATION_SEND = "NOTIFICATION_SEND";
    public static final String ALERT_VIEW = "ALERT_VIEW";
    public static final String ALERT_MANAGE = "ALERT_MANAGE";
    public static final String DASHBOARD_VIEW = "DASHBOARD_VIEW";
    public static final String REPORT_VIEW = "REPORT_VIEW";
    public static final String REPORT_EXPORT = "REPORT_EXPORT";
    public static final String IMPORT_EXECUTE = "IMPORT_EXECUTE";
    public static final String AUDIT_VIEW = "AUDIT_VIEW";
    public static final String USER_MANAGE = "USER_MANAGE";
    public static final String ROLE_MANAGE = "ROLE_MANAGE";
    // Santé scolaire. HEALTH_ALERT_VIEW est volontairement séparée des autres :
    // elle n'ouvre que le libellé et la conduite à tenir des conditions
    // signalées, et c'est la seule que reçoit le personnel encadrant.
    public static final String HEALTH_RECORD_VIEW = "HEALTH_RECORD_VIEW";
    public static final String HEALTH_RECORD_MANAGE = "HEALTH_RECORD_MANAGE";
    public static final String HEALTH_VISIT_VIEW = "HEALTH_VISIT_VIEW";
    public static final String HEALTH_VISIT_RECORD = "HEALTH_VISIT_RECORD";
    public static final String HEALTH_ALERT_VIEW = "HEALTH_ALERT_VIEW";

    public static final String PORTAL_TEACHER = "PORTAL_TEACHER";
    public static final String PORTAL_PARENT = "PORTAL_PARENT";
    public static final String PORTAL_STUDENT = "PORTAL_STUDENT";

    private Permissions() {
        // constants holder
    }
}
