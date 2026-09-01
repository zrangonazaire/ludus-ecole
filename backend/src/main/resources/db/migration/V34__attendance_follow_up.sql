-- =====================================================================
-- V34 - Trace of the reminder sent to the family for an unjustified absence
--
-- Without this column the follow-up screen can flag who should be chased,
-- but not who already has been. Two people sharing the job would then call
-- the same family twice and miss the next one, which is precisely the
-- failure the screen exists to prevent.
-- =====================================================================

ALTER TABLE student_attendance
    ADD COLUMN IF NOT EXISTS guardian_notified_at TIMESTAMPTZ;

COMMENT ON COLUMN student_attendance.guardian_notified_at IS
    'Date de la relance envoyee a la famille pour cette absence, nulle tant qu''aucune relance n''a ete faite.';

-- Partial index: the follow-up list only ever reads the rows still waiting.
CREATE INDEX IF NOT EXISTS ix_student_attendance_follow_up
    ON student_attendance (academic_year_id, attendance_date DESC)
    WHERE justified = FALSE AND status IN ('ABSENT', 'LATE');
