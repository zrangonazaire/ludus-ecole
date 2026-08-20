-- =====================================================================
-- V31 - Multi-tenant isolation enforced by PostgreSQL Row-Level Security
--
-- EduOps is a public service: several schools share one database. A bug in
-- a service must never let school A read school B's pupils, grades or
-- payments. Application-level filtering alone is not enough, because it
-- only takes one forgotten WHERE clause.
--
-- The backend sets `app.current_school_id` at the start of every
-- transaction; these policies then make rows of any other school simply
-- invisible - to SELECT, UPDATE and DELETE alike.
--
-- FORCE ROW LEVEL SECURITY is essential: without it the table owner (which
-- is the application role here) would bypass every policy.
-- =====================================================================

-- Current tenant, or NULL when none has been set.
CREATE OR REPLACE FUNCTION current_school_id()
    RETURNS uuid
    LANGUAGE sql STABLE PARALLEL SAFE
AS $$
    SELECT NULLIF(current_setting('app.current_school_id', true), '')::uuid
$$;

-- Escape hatch for the operations that legitimately run without a tenant:
-- public signup, authentication, Flyway migrations, background maintenance.
-- The backend turns it on with SET LOCAL, so it lasts one transaction only.
CREATE OR REPLACE FUNCTION tenant_bypass_active()
    RETURNS boolean
    LANGUAGE sql STABLE PARALLEL SAFE
AS $$
    SELECT COALESCE(current_setting('app.bypass_rls', true), 'off') = 'on'
$$;

-- The predicate every policy is built on.
CREATE OR REPLACE FUNCTION tenant_allows(row_school_id uuid)
    RETURNS boolean
    LANGUAGE sql STABLE PARALLEL SAFE
AS $$
    SELECT tenant_bypass_active()
        OR (current_school_id() IS NOT NULL AND row_school_id = current_school_id())
$$;

-- ---------------------------------------------------------------------
-- Tables carrying school_id directly (20)
-- ---------------------------------------------------------------------
ALTER TABLE academic_year ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_year FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON academic_year
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE admission_application ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_application FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON admission_application
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE alert ENABLE ROW LEVEL SECURITY;
ALTER TABLE alert FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON alert
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE announcement ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON announcement
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE campus ENABLE ROW LEVEL SECURITY;
ALTER TABLE campus FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON campus
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE cash_session ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_session FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON cash_session
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE cycle ENABLE ROW LEVEL SECURITY;
ALTER TABLE cycle FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON cycle
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE discount ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON discount
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE document ENABLE ROW LEVEL SECURITY;
ALTER TABLE document FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON document
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE fee_type ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_type FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON fee_type
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE guardian ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardian FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON guardian
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE import_batch ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_batch FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON import_batch
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE notification ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON notification
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE notification_template ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_template FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON notification_template
    USING (school_id IS NULL OR tenant_allows(school_id))
    WITH CHECK (school_id IS NULL OR tenant_allows(school_id));

ALTER TABLE payment ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON payment
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE scholarship ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarship FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON scholarship
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON staff
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE student ENABLE ROW LEVEL SECURITY;
ALTER TABLE student FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON student
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE subject ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON subject
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE teacher ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON teacher
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

-- ---------------------------------------------------------------------
-- Tables reaching the school through a parent row (37)
-- ---------------------------------------------------------------------
ALTER TABLE admission_document ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_document FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON admission_document
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM admission_application p WHERE p.id = admission_document.application_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM admission_application p WHERE p.id = admission_document.application_id));

ALTER TABLE assessment ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON assessment
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = assessment.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = assessment.academic_year_id));

ALTER TABLE attendance_session ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_session FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON attendance_session
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = attendance_session.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = attendance_session.academic_year_id));

ALTER TABLE class_council ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_council FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON class_council
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = class_council.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = class_council.academic_year_id));

ALTER TABLE class_council_participant ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_council_participant FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON class_council_participant
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM teacher p WHERE p.id = class_council_participant.teacher_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM teacher p WHERE p.id = class_council_participant.teacher_id));

ALTER TABLE classroom ENABLE ROW LEVEL SECURITY;
ALTER TABLE classroom FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON classroom
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = classroom.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = classroom.academic_year_id));

ALTER TABLE course_session ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_session FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON course_session
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = course_session.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = course_session.academic_year_id));

ALTER TABLE curriculum ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON curriculum
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = curriculum.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = curriculum.academic_year_id));

ALTER TABLE curriculum_subject ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum_subject FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON curriculum_subject
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM subject p WHERE p.id = curriculum_subject.subject_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM subject p WHERE p.id = curriculum_subject.subject_id));

ALTER TABLE disciplinary_action ENABLE ROW LEVEL SECURITY;
ALTER TABLE disciplinary_action FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON disciplinary_action
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM student p WHERE p.id = disciplinary_action.student_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM student p WHERE p.id = disciplinary_action.student_id));

ALTER TABLE discipline_incident ENABLE ROW LEVEL SECURITY;
ALTER TABLE discipline_incident FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON discipline_incident
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = discipline_incident.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = discipline_incident.academic_year_id));

ALTER TABLE enrollment ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollment FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON enrollment
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = enrollment.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = enrollment.academic_year_id));

ALTER TABLE enrollment_document ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollment_document FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON enrollment_document
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM enrollment p WHERE p.id = enrollment_document.enrollment_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM enrollment p WHERE p.id = enrollment_document.enrollment_id));

ALTER TABLE enrollment_transfer ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollment_transfer FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON enrollment_transfer
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM enrollment p WHERE p.id = enrollment_transfer.enrollment_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM enrollment p WHERE p.id = enrollment_transfer.enrollment_id));

ALTER TABLE fee_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_schedule FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON fee_schedule
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = fee_schedule.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = fee_schedule.academic_year_id));

ALTER TABLE fee_schedule_instalment ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_schedule_instalment FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON fee_schedule_instalment
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM fee_schedule p WHERE p.id = fee_schedule_instalment.fee_schedule_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM fee_schedule p WHERE p.id = fee_schedule_instalment.fee_schedule_id));

ALTER TABLE grade ENABLE ROW LEVEL SECURITY;
ALTER TABLE grade FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON grade
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = grade.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = grade.academic_year_id));

ALTER TABLE grade_revision ENABLE ROW LEVEL SECURITY;
ALTER TABLE grade_revision FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON grade_revision
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM grade p WHERE p.id = grade_revision.grade_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM grade p WHERE p.id = grade_revision.grade_id));

ALTER TABLE grade_validation ENABLE ROW LEVEL SECURITY;
ALTER TABLE grade_validation FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON grade_validation
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM subject p WHERE p.id = grade_validation.subject_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM subject p WHERE p.id = grade_validation.subject_id));

ALTER TABLE invoice ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON invoice
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = invoice.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = invoice.academic_year_id));

ALTER TABLE invoice_line ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_line FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON invoice_line
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM invoice p WHERE p.id = invoice_line.invoice_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM invoice p WHERE p.id = invoice_line.invoice_id));

ALTER TABLE level ENABLE ROW LEVEL SECURITY;
ALTER TABLE level FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON level
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM cycle p WHERE p.id = level.cycle_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM cycle p WHERE p.id = level.cycle_id));

ALTER TABLE payment_allocation ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_allocation FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON payment_allocation
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM payment p WHERE p.id = payment_allocation.payment_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM payment p WHERE p.id = payment_allocation.payment_id));

ALTER TABLE promotion_decision ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotion_decision FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON promotion_decision
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = promotion_decision.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = promotion_decision.academic_year_id));

ALTER TABLE receipt ENABLE ROW LEVEL SECURITY;
ALTER TABLE receipt FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON receipt
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM student p WHERE p.id = receipt.student_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM student p WHERE p.id = receipt.student_id));

ALTER TABLE report_card ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_card FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON report_card
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = report_card.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = report_card.academic_year_id));

ALTER TABLE report_card_line ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_card_line FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON report_card_line
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM teacher p WHERE p.id = report_card_line.teacher_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM teacher p WHERE p.id = report_card_line.teacher_id));

ALTER TABLE room ENABLE ROW LEVEL SECURITY;
ALTER TABLE room FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON room
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM campus p WHERE p.id = room.campus_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM campus p WHERE p.id = room.campus_id));

ALTER TABLE student_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_attendance FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON student_attendance
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = student_attendance.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = student_attendance.academic_year_id));

ALTER TABLE student_fee ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_fee FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON student_fee
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = student_fee.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = student_fee.academic_year_id));

ALTER TABLE student_guardian ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_guardian FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON student_guardian
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM student p WHERE p.id = student_guardian.student_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM student p WHERE p.id = student_guardian.student_id));

ALTER TABLE student_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_status_history FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON student_status_history
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM student p WHERE p.id = student_status_history.student_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM student p WHERE p.id = student_status_history.student_id));

ALTER TABLE teacher_assignment ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_assignment FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON teacher_assignment
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = teacher_assignment.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = teacher_assignment.academic_year_id));

ALTER TABLE teacher_subject ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_subject FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON teacher_subject
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM teacher p WHERE p.id = teacher_subject.teacher_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM teacher p WHERE p.id = teacher_subject.teacher_id));

ALTER TABLE term ENABLE ROW LEVEL SECURITY;
ALTER TABLE term FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON term
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = term.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = term.academic_year_id));

ALTER TABLE timetable ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON timetable
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = timetable.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = timetable.academic_year_id));

ALTER TABLE timetable_slot ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable_slot FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON timetable_slot
    USING (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = timetable_slot.academic_year_id))
    WITH CHECK (tenant_bypass_active() OR EXISTS (
        SELECT 1 FROM academic_year p WHERE p.id = timetable_slot.academic_year_id));

-- Note: the EXISTS sub-selects above are themselves subject to the parent
-- table's own policy, so the check cascades all the way up to school_id
-- without repeating the join condition on every table.

COMMENT ON FUNCTION current_school_id() IS
    'Tenant of the current transaction, set by the backend via SET LOCAL app.current_school_id.';
COMMENT ON FUNCTION tenant_bypass_active() IS
    'True during signup, authentication and migrations, which legitimately run without a tenant.';
