-- =====================================================================
-- V16 - Attendance sheets and individual student attendance records
-- =====================================================================

CREATE TABLE attendance_session (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_session_id UUID REFERENCES course_session(id) ON DELETE SET NULL,
    classroom_id     UUID NOT NULL REFERENCES classroom(id)     ON DELETE RESTRICT,
    subject_id       UUID REFERENCES subject(id),
    teacher_id       UUID NOT NULL REFERENCES teacher(id)       ON DELETE RESTRICT,
    academic_year_id UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    term_id          UUID REFERENCES term(id),
    session_date     DATE NOT NULL,
    start_time       TIME,
    end_time         TIME,
    status           attendance_session_status NOT NULL DEFAULT 'OPEN',
    expected_count   INTEGER NOT NULL DEFAULT 0,
    present_count    INTEGER NOT NULL DEFAULT 0,
    absent_count     INTEGER NOT NULL DEFAULT 0,
    late_count       INTEGER NOT NULL DEFAULT 0,
    submitted_at     TIMESTAMPTZ,
    submitted_by     UUID REFERENCES app_user(id),
    validated_at     TIMESTAMPTZ,
    validated_by     UUID REFERENCES app_user(id),
    locked_at        TIMESTAMPTZ,
    idempotency_key  VARCHAR(120),
    version          BIGINT NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_attendance_counts CHECK (
        expected_count >= 0 AND present_count >= 0 AND absent_count >= 0 AND late_count >= 0)
);
CREATE TRIGGER trg_attendance_session_updated BEFORE UPDATE ON attendance_session
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
-- One sheet per class / date / time slot / subject (expressions require an index).
CREATE UNIQUE INDEX uq_attendance_session ON attendance_session(
    classroom_id,
    session_date,
    coalesce(start_time, TIME '00:00'),
    coalesce(subject_id, '00000000-0000-0000-0000-000000000000'::uuid));
CREATE INDEX ix_attendance_session_date  ON attendance_session(session_date DESC, classroom_id);
CREATE INDEX ix_attendance_session_teacher ON attendance_session(teacher_id, session_date DESC);

CREATE TABLE student_attendance (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attendance_session_id UUID NOT NULL REFERENCES attendance_session(id) ON DELETE CASCADE,
    student_id            UUID NOT NULL REFERENCES student(id)     ON DELETE RESTRICT,
    enrollment_id         UUID NOT NULL REFERENCES enrollment(id)  ON DELETE RESTRICT,
    classroom_id          UUID NOT NULL REFERENCES classroom(id)   ON DELETE RESTRICT,
    academic_year_id      UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    term_id               UUID REFERENCES term(id),
    attendance_date       DATE NOT NULL,
    status                attendance_status NOT NULL,
    arrival_time          TIME,
    departure_time        TIME,
    minutes_late          INTEGER,
    reason                VARCHAR(255),
    justified             BOOLEAN NOT NULL DEFAULT FALSE,
    justification_document_url VARCHAR(500),
    justified_by          UUID REFERENCES app_user(id),
    justified_at          TIMESTAMPTZ,
    recorded_by           UUID REFERENCES app_user(id),
    recorded_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
    version               BIGINT NOT NULL DEFAULT 0,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_student_attendance UNIQUE (attendance_session_id, student_id),
    CONSTRAINT ck_attendance_late CHECK (minutes_late IS NULL OR minutes_late >= 0),
    CONSTRAINT ck_attendance_late_consistency
        CHECK (status NOT IN ('LATE','EXCUSED_LATE') OR arrival_time IS NOT NULL)
);
CREATE TRIGGER trg_student_attendance_updated BEFORE UPDATE ON student_attendance
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_student_attendance_student ON student_attendance(student_id, attendance_date DESC);
CREATE INDEX ix_student_attendance_class   ON student_attendance(classroom_id, attendance_date DESC);
CREATE INDEX ix_student_attendance_absent  ON student_attendance(attendance_date, classroom_id)
    WHERE status IN ('ABSENT','EXCUSED_ABSENCE');
CREATE INDEX ix_student_attendance_term    ON student_attendance(student_id, term_id, status);
