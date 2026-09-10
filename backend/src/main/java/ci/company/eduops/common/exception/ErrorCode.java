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
    /**
     * No endpoint answers this address — distinct from a record that is absent.
     *
     * <p>Both are 404, but they send whoever is debugging to opposite places.
     * « Record not found » points at the data; this one points at the running
     * build, and the usual cause is that the server was started before the
     * screen calling it was written. Java does not hot-reload, so a jar packaged
     * an hour ago serves 404 for every route added since. Reporting the two the
     * same way cost two rounds of investigation on {@code /api/v1/dashboard}
     * and another on {@code /api/v1/family-requests}.</p>
     */
    ENDPOINT_NOT_FOUND(HttpStatus.NOT_FOUND, "No endpoint matches this address."),
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
    ACCESS_PROFILE_NOT_FOUND(HttpStatus.NOT_FOUND, "Access profile not found."),
    ACCESS_PROFILE_CODE_ALREADY_USED(HttpStatus.CONFLICT,
            "Another access profile already uses this code."),

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
    CLASS_CODE_ALREADY_USED(HttpStatus.CONFLICT,
            "Another class already uses this code for the same campus and academic year."),
    CLASS_CAPACITY_BELOW_ENROLLMENTS(HttpStatus.CONFLICT,
            "The new capacity is lower than the number of students already enrolled."),
    CLASS_NOT_EMPTY(HttpStatus.CONFLICT,
            "The class still holds active enrollments and cannot be closed."),
    ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "Room not found."),
    SUBJECT_NOT_FOUND(HttpStatus.NOT_FOUND, "Subject not found."),
    CURRICULUM_NOT_FOUND(HttpStatus.NOT_FOUND, "Curriculum not found."),
    CURRICULUM_SUBJECT_NOT_FOUND(HttpStatus.NOT_FOUND, "This subject is not part of the curriculum."),
    SUBJECT_CODE_ALREADY_USED(HttpStatus.CONFLICT,
            "Another subject already uses this code."),
    SUBJECT_IN_USE(HttpStatus.CONFLICT,
            "This subject carries assessments or is part of a curriculum and cannot be removed."),
    CURRICULUM_SUBJECT_ALREADY_ADDED(HttpStatus.CONFLICT,
            "This subject is already part of the curriculum for this level."),
    CURRICULUM_SUBJECT_HAS_GRADES(HttpStatus.CONFLICT,
            "Assessments already exist for this subject on this level."),
    COEFFICIENT_OUT_OF_RANGE(HttpStatus.BAD_REQUEST,
            "The coefficient must be strictly positive."),
    OPTION_NOT_FOUND(HttpStatus.NOT_FOUND, "Academic option not found."),
    OPTION_CODE_ALREADY_USED(HttpStatus.CONFLICT,
            "Another option already uses this code."),
    OPTION_OFFERING_NOT_FOUND(HttpStatus.NOT_FOUND, "Option offering not found."),
    OPTION_CHOICE_NOT_FOUND(HttpStatus.NOT_FOUND, "Student option choice not found."),
    OPTION_CHOICE_ALREADY_EXISTS(HttpStatus.CONFLICT,
            "The student already chose this option for this level."),
    OPTION_CAPACITY_REACHED(HttpStatus.CONFLICT,
            "The option capacity has been reached."),
    OPTION_LEVEL_MISMATCH(HttpStatus.CONFLICT,
            "The option is not offered for the student's level."),

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

    // ---------- transfers and departures ----------
    TRANSFER_SAME_CLASSROOM(HttpStatus.BAD_REQUEST,
            "The pupil is already in that class."),
    TRANSFER_CLASSROOM_MISMATCH(HttpStatus.CONFLICT,
            "The target class belongs to another academic year."),
    DEPARTURE_NOT_FOUND(HttpStatus.NOT_FOUND, "Departure record not found."),
    DEPARTURE_ALREADY_RECORDED(HttpStatus.CONFLICT,
            "A departure is already recorded for this enrollment."),
    DEPARTURE_NOT_EDITABLE(HttpStatus.CONFLICT,
            "This departure is settled or cancelled and no longer changes."),
    DEPARTURE_DOCUMENTS_INCOMPLETE(HttpStatus.CONFLICT,
            "Some documents have not been handed over yet."),
    DEPARTURE_DATE_BEFORE_ENROLLMENT(HttpStatus.BAD_REQUEST,
            "The departure date precedes the enrollment date."),

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
    ASSESSMENT_DATE_OUTSIDE_TERM(HttpStatus.BAD_REQUEST,
            "The assessment date falls outside the selected term."),
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
    COUNCIL_ALREADY_EXISTS(HttpStatus.CONFLICT,
            "A class council already exists for this class and grading period."),
    COUNCIL_INVALID_TRANSITION(HttpStatus.CONFLICT, "This council status transition is not allowed."),
    COUNCIL_PARTICIPANT_NOT_FOUND(HttpStatus.NOT_FOUND, "Council participant not found."),
    COUNCIL_PARTICIPANT_ALREADY_ADDED(HttpStatus.CONFLICT,
            "This person is already listed on the council."),
    PROMOTION_DECISION_NOT_FOUND(HttpStatus.NOT_FOUND, "Promotion decision not found."),

    // ---------- discipline ----------
    INCIDENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Discipline incident not found."),
    INCIDENT_CLOSED(HttpStatus.CONFLICT, "The incident is closed."),
    /**
     * The student was not enrolled anywhere on the day of the incident.
     *
     * <p>An incident is filed against an enrollment, not against a person: the
     * class and the academic year are what let it appear in the right register
     * and on the right council file. Recording one without an enrollment would
     * produce a report attached to no year, invisible everywhere it matters.</p>
     *
     * <p>Its own code rather than {@code VALIDATION_ERROR}, because nothing on
     * the form is wrong: the usual causes are a date that falls outside the
     * academic year — the very start of September, before the new year opens —
     * or an enrollment still awaiting validation. Both are fixed elsewhere than
     * on this screen, and the message has to say so.</p>
     */
    INCIDENT_STUDENT_NOT_ENROLLED(HttpStatus.BAD_REQUEST,
            "The student has no active enrollment on the date of the incident."),

    // ---------- finance ----------
    FEE_TYPE_NOT_FOUND(HttpStatus.NOT_FOUND, "Fee type not found."),
    FEE_SCHEDULE_NOT_FOUND(HttpStatus.NOT_FOUND, "Fee schedule not found."),
    FEE_TYPE_CODE_ALREADY_USED(HttpStatus.CONFLICT,
            "Another fee type already uses this code."),
    FEE_TYPE_IN_USE(HttpStatus.CONFLICT,
            "This fee type is priced on one or more levels and cannot be archived."),
    FEE_SCHEDULE_ALREADY_EXISTS(HttpStatus.CONFLICT,
            "A price already exists for this fee type on this level."),
    FEE_INSTALMENTS_MISMATCH(HttpStatus.BAD_REQUEST,
            "The instalments do not add up to the announced total."),
    FEE_SCHEDULE_IN_USE(HttpStatus.CONFLICT,
            "Student fees have already been generated from this price."),
    FEE_AMOUNT_INVALID(HttpStatus.BAD_REQUEST,
            "The amount must be zero or greater, and each instalment strictly positive."),
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
    FAMILY_REQUEST_NOT_FOUND(HttpStatus.NOT_FOUND, "Family request not found."),
    IMPORT_BATCH_NOT_FOUND(HttpStatus.NOT_FOUND, "Import batch not found."),
    IMPORT_NOT_VALIDATED(HttpStatus.CONFLICT, "The import must be validated and previewed before confirmation."),
    IMPORT_FILE_INVALID(HttpStatus.BAD_REQUEST, "The uploaded file cannot be read."),

    // ---------- school health ----------
    HEALTH_RECORD_NOT_FOUND(HttpStatus.NOT_FOUND, "This pupil has no health file yet."),
    HEALTH_CONDITION_NOT_FOUND(HttpStatus.NOT_FOUND, "Health condition not found."),
    HEALTH_ACTION_REQUIRED(HttpStatus.BAD_REQUEST,
            "A condition raised as an alert must carry the action to take."),
    HEALTH_CONSENT_REQUIRED(HttpStatus.CONFLICT,
            "The family has not authorised care: only a call may be made."),
    HEALTH_GUARDIAN_NOT_NOTIFIED(HttpStatus.CONFLICT,
            "A pupil sent home or evacuated requires the family to have been reached."),
    HEALTH_REFERRAL_REQUIRED(HttpStatus.BAD_REQUEST,
            "A referral must name where the pupil was sent."),
    HEALTH_VISIT_NOT_FOUND(HttpStatus.NOT_FOUND, "Infirmary visit not found."),
    HEALTH_VISIT_IN_FUTURE(HttpStatus.BAD_REQUEST,
            "An infirmary visit cannot be recorded for a time that has not come."),
    VACCINE_NOT_FOUND(HttpStatus.NOT_FOUND, "Vaccine not found."),
    VACCINATION_DOSES_EXCEEDED(HttpStatus.BAD_REQUEST,
            "More doses recorded than the vaccine expects."),
    EXAMINATION_NOT_FOUND(HttpStatus.NOT_FOUND, "Medical examination not found."),
    EXAMINATION_ALREADY_PLANNED(HttpStatus.CONFLICT,
            "This examination is already planned for the pupil this year."),
    EXAMINATION_RESTRICTION_REQUIRED(HttpStatus.BAD_REQUEST,
            "Fit with reserve requires the restriction to be written down."),

    // ---------- messaging ----------
    MESSAGE_CAMPAIGN_NOT_FOUND(HttpStatus.NOT_FOUND, "Campaign not found."),
    MESSAGE_ALREADY_SENT(HttpStatus.CONFLICT,
            "This campaign has already left; messages cannot be recalled."),
    MESSAGE_NO_RECIPIENT(HttpStatus.CONFLICT,
            "No recipient: there is nothing to send."),
    MESSAGE_DAILY_CAP_REACHED(HttpStatus.CONFLICT,
            "The daily SMS allowance would be exceeded by this send."),
    MESSAGE_UNKNOWN_PLACEHOLDER(HttpStatus.BAD_REQUEST,
            "The message uses a placeholder nothing will fill.");

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
