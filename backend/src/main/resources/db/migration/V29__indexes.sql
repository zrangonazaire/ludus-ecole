-- =====================================================================
-- V29 - Cross-cutting indexes and reporting helper views
-- =====================================================================

-- ---------------------------------------------------------------------
-- Computed classroom occupancy (section 22).
-- availableSeats = capacityMaximum - activeEnrollments
-- projectedAvailableSeats also removes reserved admission seats.
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW v_classroom_occupancy AS
SELECT
    c.id                              AS classroom_id,
    c.academic_year_id,
    c.campus_id,
    c.level_id,
    c.code,
    c.name,
    c.capacity_maximum,
    COALESCE(e.active_enrollments, 0) AS active_enrollments,
    COALESCE(a.reserved_admissions, 0) AS reserved_admissions,
    c.capacity_maximum - COALESCE(e.active_enrollments, 0) AS available_seats,
    c.capacity_maximum - COALESCE(e.active_enrollments, 0)
                       - COALESCE(a.reserved_admissions, 0) AS projected_available_seats,
    ROUND(100.0 * COALESCE(e.active_enrollments, 0) / NULLIF(c.capacity_maximum, 0), 2) AS occupancy_rate,
    CASE
        WHEN COALESCE(e.active_enrollments, 0) > c.capacity_maximum THEN 'OVER_CAPACITY'
        WHEN COALESCE(e.active_enrollments, 0) = c.capacity_maximum THEN 'FULL'
        WHEN COALESCE(e.active_enrollments, 0) >= c.capacity_maximum * c.capacity_warning_threshold / 100 THEN 'WARNING'
        ELSE 'AVAILABLE'
    END::capacity_status AS capacity_status
FROM classroom c
LEFT JOIN (
    SELECT classroom_id, COUNT(*) AS active_enrollments
    FROM enrollment
    WHERE status IN ('VALIDATED','ACTIVE')
    GROUP BY classroom_id
) e ON e.classroom_id = c.id
LEFT JOIN (
    SELECT reserved_classroom_id AS classroom_id, COUNT(*) AS reserved_admissions
    FROM admission_application
    WHERE seat_reserved AND status IN ('ACCEPTED','WAITLISTED','UNDER_REVIEW')
    GROUP BY reserved_classroom_id
) a ON a.classroom_id = c.id;

-- ---------------------------------------------------------------------
-- Student financial position (rule 8: balances are derived, never stored)
-- outstandingAmount = totalDue - totalValidatedPayments
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW v_student_financial_summary AS
SELECT
    sf.student_id,
    sf.academic_year_id,
    SUM(sf.gross_amount)                                   AS total_gross,
    SUM(sf.discount_amount)                                AS total_discount,
    SUM(sf.amount_due)                                     AS total_due,
    SUM(sf.amount_paid)                                    AS total_paid,
    SUM(sf.amount_due - sf.amount_paid)                    AS outstanding_amount,
    MIN(sf.due_date) FILTER (WHERE sf.amount_due > sf.amount_paid) AS next_due_date,
    COUNT(*) FILTER (WHERE sf.status = 'OVERDUE')          AS overdue_count,
    CASE
        WHEN SUM(sf.amount_due - sf.amount_paid) <= 0 THEN 'PAID'
        WHEN SUM(sf.amount_paid) = 0 THEN 'DUE'
        ELSE 'PARTIALLY_PAID'
    END AS global_status
FROM student_fee sf
WHERE sf.status <> 'CANCELLED'
GROUP BY sf.student_id, sf.academic_year_id;

-- ---------------------------------------------------------------------
-- Attendance aggregation per student and term.
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW v_student_attendance_summary AS
SELECT
    sa.student_id,
    sa.academic_year_id,
    sa.term_id,
    sa.classroom_id,
    COUNT(*)                                                          AS total_records,
    COUNT(*) FILTER (WHERE sa.status = 'PRESENT')                     AS present_count,
    COUNT(*) FILTER (WHERE sa.status IN ('ABSENT','EXCUSED_ABSENCE')) AS absence_count,
    COUNT(*) FILTER (WHERE sa.status = 'ABSENT' AND NOT sa.justified) AS unjustified_absence_count,
    COUNT(*) FILTER (WHERE sa.status IN ('LATE','EXCUSED_LATE'))      AS lateness_count,
    ROUND(100.0 * COUNT(*) FILTER (WHERE sa.status IN ('PRESENT','LATE','EXCUSED_LATE'))
          / NULLIF(COUNT(*), 0), 2)                                   AS attendance_rate
FROM student_attendance sa
GROUP BY sa.student_id, sa.academic_year_id, sa.term_id, sa.classroom_id;

-- ---------------------------------------------------------------------
-- Additional composite indexes for the dashboard and reporting queries.
-- ---------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS ix_enrollment_dashboard
    ON enrollment(academic_year_id, status, enrollment_date DESC);
CREATE INDEX IF NOT EXISTS ix_payment_dashboard
    ON payment(academic_year_id, status, payment_date DESC)
    INCLUDE (amount);
CREATE INDEX IF NOT EXISTS ix_student_fee_dashboard
    ON student_fee(academic_year_id, status)
    INCLUDE (amount_due, amount_paid);
CREATE INDEX IF NOT EXISTS ix_grade_dashboard
    ON grade(academic_year_id, term_id, status)
    INCLUDE (normalized_score);
CREATE INDEX IF NOT EXISTS ix_attendance_dashboard
    ON student_attendance(academic_year_id, attendance_date, status);
CREATE INDEX IF NOT EXISTS ix_document_verification
    ON document(verification_code) WHERE status = 'ISSUED';
