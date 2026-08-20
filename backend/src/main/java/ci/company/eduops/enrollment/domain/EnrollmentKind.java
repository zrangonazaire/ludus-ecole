package ci.company.eduops.enrollment.domain;

public enum EnrollmentKind {
    /** First enrollment of a newly admitted student. */
    NEW,
    /** Re-enrollment of a student already known to the school. */
    RE_ENROLLMENT,
    /** Student arriving from another institution during the year. */
    TRANSFER_IN
}
