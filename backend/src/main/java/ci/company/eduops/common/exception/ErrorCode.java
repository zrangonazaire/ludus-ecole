package ci.company.eduops.common.exception;

import org.springframework.http.HttpStatus;

/**
 * Canonical business error codes (section 84).
 *
 * <p>The code is the contract with the frontend: Angular maps it to a
 * localised message, never the raw English text.</p>
 */
public enum ErrorCode {

    // ---------- generic ----------
    VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "The submitted data is invalid."),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "Resource not found."),
    CONFLICT(HttpStatus.CONFLICT, "The operation conflicts with the current state."),
    CONCURRENT_MODIFICATION(HttpStatus.CONFLICT, "The record was modified by another user."),
    UNAUTHENTICATED(HttpStatus.UNAUTHORIZED, "Authentication is required."),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "You are not allowed to perform this operation."),
    RATE_LIMITED(HttpStatus.TOO_MANY_REQUESTS, "Too many requests."),
    IDEMPOTENCY_CONFLICT(HttpStatus.CONFLICT, "This idempotency key was used with a different payload."),
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected internal error."),

    // ---------- security ----------
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid username or password."),
    ACCOUNT_LOCKED(HttpStatus.LOCKED, "Account temporarily locked after too many failed attempts."),
    ACCOUNT_DISABLED(HttpStatus.FORBIDDEN, "This account is disabled."),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "The token has expired."),
    TOKEN_INVALID(HttpStatus.UNAUTHORIZED, "The token is invalid."),
    PASSWORD_POLICY_VIOLATION(HttpStatus.BAD_REQUEST, "The password does not meet the policy."),

    // ---------- school / academic ----------
    SCHOOL_NOT_FOUND(HttpStatus.NOT_FOUND, "School not found."),
    CAMPUS_NOT_FOUND(HttpStatus.NOT_FOUND, "Campus not found."),
    ACADEMIC_YEAR_NOT_FOUND(HttpStatus.NOT_FOUND, "Academic year not found."),
    ACADEMIC_YEAR_NOT_ACTIVE(HttpStatus.CONFLICT, "The academic year is not active."),
    ACADEMIC_YEAR_ALREADY_ACTIVE(HttpStatus.CONFLICT, "Another academic year is already active."),
    ACADEMIC_YEAR_CLOSED(HttpStatus.CONFLICT, "The academic year is closed."),
    ACADEMIC_YEAR_INVALID_TRANSITION(HttpStatus.CONFLICT, "This academic year status transition is not allowed."),
    TERM_NOT_FOUND(HttpStatus.NOT_FOUND, "Term not found."),
    TERM_NOT_OPEN_FOR_GRADES(HttpStatus.CONFLICT, "The grade entry window for this term is closed."),
    CYCLE_NOT_FOUND(HttpStatus.NOT_FOUND, "Cycle not found."),
    LEVEL_NOT_FOUND(HttpStatus.NOT_FOUND, "Level not found."),
    CLASS_NOT_FOUND(HttpStatus.NOT_FOUND, "Class not found."),
    CLASS_CAPACITY_EXCEEDED(HttpStatus.CONFLICT, "The maximum capacity of the class has been reached."),
    CLASS_NOT_ACTIVE(HttpStatus.CONFLICT, "The class is not active."),
    ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "Room not found."),
    SUBJECT_NOT_FOUND(HttpStatus.NOT_FOUND, "Subject not found."),
    CURRICULUM_NOT_FOUND(HttpStatus.NOT_FOUND, "Curriculum not found."),
    CURRICULUM_SUBJECT_NOT_FOUND(HttpStatus.NOT_FOUND, "This subject is not part of the curriculum."),

    // ---------- student ----------
    STUDENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Student not found."),
    STUDENT_ALREADY_ENROLLED(HttpStatus.CONFLICT, "The student is already enrolled for this academic year."),
    STUDENT_NOT_ACTIVE(HttpStatus.CONFLICT, "The student is not active."),
    STUDENT_INVALID_STATUS_TRANSITION(HttpStatus.CONFLICT, "This student status transition is not allowed."),
    STUDENT_NUMBER_ALREADY_USED(HttpStatus.CONFLICT, "This student number is already in use."),
    GUARDIAN_NOT_FOUND(HttpStatus.NOT_FOUND, "Guardian not found."),
    GUARDIAN_ALREADY_LINKED(HttpStatus.CONFLICT, "This guardian is already linked to the student."),
    GUARDIAN_PRIMARY_REQUIRED(HttpStatus.CONFLICT, "A student must keep one primary guardian."),

    // ---------- admission / enrollment ----------
    ADMISSION_NOT_FOUND(HttpStatus.NOT_FOUND, "Admission application not found."),
    ADMISSION_NOT_ACCEPTED(HttpStatus.CONFLICT, "The admission application has not been accepted."),
    ADMISSION_INVALID_TRANSITION(HttpStatus.CONFLICT, "This admission status transition is not allowed."),
    ADMISSION_DOCUMENTS_INCOMPLETE(HttpStatus.CONFLICT, "Mandatory admission documents are missing."),
    ENROLLMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Enrollment not found."),
    ENROLLMENT_NOT_ALLOWED(HttpStatus.CONFLICT, "Enrollment is not allowed in the current context."),
    ENROLLMENT_WINDOW_CLOSED(HttpStatus.CONFLICT, "The enrollment window is closed for this academic year."),
    ENROLLMENT_DOCUMENTS_INCOMPLETE(HttpStatus.CONFLICT, "Mandatory enrollment documents are missing."),
    ENROLLMENT_INVALID_TRANSITION(HttpStatus.CONFLICT, "This enrollment status transition is not allowed."),
    ENROLLMENT_ALREADY_VALIDATED(HttpStatus.CONFLICT, "The enrollment is already validated."),

    // ---------- teacher / timetable ----------
    TEACHER_NOT_FOUND(HttpStatus.NOT_FOUND, "Teacher not found."),
    TEACHER_NOT_ASSIGNED(HttpStatus.FORBIDDEN, "The teacher is not assigned to this class and subject."),
    TEACHER_NOT_ACTIVE(HttpStatus.CONFLICT, "The teacher is not active."),
    STAFF_NOT_FOUND(HttpStatus.NOT_FOUND, "Staff member not found."),
    ASSIGNMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Teaching assignment not found."),
    ASSIGNMENT_ALREADY_EXISTS(HttpStatus.CONFLICT, "This teaching assignment already exists."),
    TIMETABLE_NOT_FOUND(HttpStatus.NOT_FOUND, "Timetable not found."),
    TIMETABLE_CONFLICT(HttpStatus.CONFLICT, "The teacher or the class is already busy on this slot."),
    ROOM_CONFLICT(HttpStatus.CONFLICT, "The room is already booked on this slot."),
    INVALID_TIME_RANGE(HttpStatus.BAD_REQUEST, "The end time must be after the start time."),

    // ---------- attendance ----------
    ATTENDANCE_SESSION_NOT_FOUND(HttpStatus.NOT_FOUND, "Attendance sheet not found."),
    ATTENDANCE_SESSION_LOCKED(HttpStatus.CONFLICT, "The attendance sheet is locked."),
    INVALID_ATTENDANCE(HttpStatus.BAD_REQUEST, "The attendance record is invalid."),
    ATTENDANCE_STUDENT_NOT_IN_CLASS(HttpStatus.CONFLICT, "The student is not enrolled in this class."),

    // ---------- assessment / grade ----------
    ASSESSMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Assessment not found."),
    ASSESSMENT_NOT_OPEN(HttpStatus.CONFLICT, "The assessment is not open for grading."),
    ASSESSMENT_INVALID_TRANSITION(HttpStatus.CONFLICT, "This assessment status transition is not allowed."),
    GRADE_NOT_FOUND(HttpStatus.NOT_FOUND, "Grade not found."),
    GRADE_NOT_ALLOWED(HttpStatus.FORBIDDEN, "You are not allowed to enter grades for this class or subject."),
    GRADE_OUT_OF_RANGE(HttpStatus.BAD_REQUEST, "The score must be between 0 and the maximum score."),
    GRADE_ALREADY_PUBLISHED(HttpStatus.CONFLICT, "The grade is published and requires a justified correction."),
    GRADE_INVALID_TRANSITION(HttpStatus.CONFLICT, "This grade status transition is not allowed."),
    GRADE_JUSTIFICATION_REQUIRED(HttpStatus.BAD_REQUEST, "A justification is required to correct a published grade."),

    // ---------- report card / council ----------
    REPORT_CARD_NOT_FOUND(HttpStatus.NOT_FOUND, "Report card not found."),
    REPORT_CARD_NOT_READY(HttpStatus.CONFLICT, "Some grades are not validated: the report card cannot be published."),
    REPORT_CARD_ALREADY_PUBLISHED(HttpStatus.CONFLICT, "The report card is already published."),
    COUNCIL_NOT_FOUND(HttpStatus.NOT_FOUND, "Class council not found."),
    COUNCIL_CLOSED(HttpStatus.CONFLICT, "The class council is closed."),
    PROMOTION_DECISION_NOT_FOUND(HttpStatus.NOT_FOUND, "Promotion decision not found."),

    // ---------- discipline ----------
    INCIDENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Discipline incident not found."),
    INCIDENT_CLOSED(HttpStatus.CONFLICT, "The incident is closed."),

    // ---------- finance ----------
    FEE_TYPE_NOT_FOUND(HttpStatus.NOT_FOUND, "Fee type not found."),
    FEE_SCHEDULE_NOT_FOUND(HttpStatus.NOT_FOUND, "Fee schedule not found."),
    STUDENT_FEE_NOT_FOUND(HttpStatus.NOT_FOUND, "Student fee not found."),
    INVOICE_NOT_FOUND(HttpStatus.NOT_FOUND, "Invoice not found."),
    PAYMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Payment not found."),
    PAYMENT_ALREADY_PROCESSED(HttpStatus.CONFLICT, "This payment operation has already been processed."),
    PAYMENT_AMOUNT_INVALID(HttpStatus.BAD_REQUEST, "The payment amount is invalid."),
    PAYMENT_EXCEEDS_OUTSTANDING(HttpStatus.BAD_REQUEST, "The allocation exceeds the outstanding balance."),
    PAYMENT_CANCELLATION_NOT_ALLOWED(HttpStatus.CONFLICT, "This payment can no longer be cancelled."),
    PAYMENT_ALREADY_CANCELLED(HttpStatus.CONFLICT, "The payment is already cancelled."),
    CASH_SESSION_NOT_FOUND(HttpStatus.NOT_FOUND, "Cash session not found."),
    CASH_SESSION_ALREADY_OPEN(HttpStatus.CONFLICT, "This cashier already has an open session."),
    CASH_SESSION_CLOSED(HttpStatus.CONFLICT, "The cash session is closed."),
    DISCOUNT_NOT_FOUND(HttpStatus.NOT_FOUND, "Discount not found."),
    SCHOLARSHIP_NOT_FOUND(HttpStatus.NOT_FOUND, "Scholarship not found."),

    // ---------- portals / relation-based access ----------
    UNAUTHORIZED_STUDENT_ACCESS(HttpStatus.FORBIDDEN, "You are not allowed to access this student's data."),
    UNAUTHORIZED_CLASS_ACCESS(HttpStatus.FORBIDDEN, "You are not allowed to access this class."),
    PORTAL_PROFILE_MISSING(HttpStatus.FORBIDDEN, "No portal profile is linked to this account."),

    // ---------- documents / import ----------
    DOCUMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Document not found."),
    DOCUMENT_REVOKED(HttpStatus.GONE, "This document has been revoked."),
    IMPORT_BATCH_NOT_FOUND(HttpStatus.NOT_FOUND, "Import batch not found."),
    IMPORT_NOT_VALIDATED(HttpStatus.CONFLICT, "The import must be validated and previewed before confirmation."),
    IMPORT_FILE_INVALID(HttpStatus.BAD_REQUEST, "The uploaded file cannot be read.");

    private final HttpStatus status;
    private final String defaultMessage;

    ErrorCode(HttpStatus status, String defaultMessage) {
        this.status = status;
        this.defaultMessage = defaultMessage;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getDefaultMessage() {
        return defaultMessage;
    }
}
