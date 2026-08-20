-- =====================================================================
-- V14 - Curriculum: the per-level, per-year subject programme.
-- Coefficients live here, never hard-coded in Angular (section 26).
-- =====================================================================

CREATE TABLE curriculum (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year_id UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    cycle_id         UUID NOT NULL REFERENCES cycle(id)         ON DELETE RESTRICT,
    level_id         UUID NOT NULL REFERENCES level(id)         ON DELETE RESTRICT,
    code             VARCHAR(40)  NOT NULL,
    label            VARCHAR(150) NOT NULL,
    -- Configurable grading rules (rounding, passing mark, weighting mode...)
    grading_rules    JSONB NOT NULL DEFAULT '{
        "scaleMax": 20,
        "passingMark": 10,
        "roundingMode": "HALF_UP",
        "decimalPlaces": 2,
        "averageMode": "WEIGHTED_BY_COEFFICIENT",
        "rankingEnabled": true
    }'::jsonb,
    status           common_status NOT NULL DEFAULT 'ACTIVE',
    version          BIGINT NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_curriculum UNIQUE (academic_year_id, level_id)
);
CREATE TRIGGER trg_curriculum_updated BEFORE UPDATE ON curriculum
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE curriculum_subject (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    curriculum_id  UUID NOT NULL REFERENCES curriculum(id) ON DELETE CASCADE,
    subject_id     UUID NOT NULL REFERENCES subject(id)    ON DELETE RESTRICT,
    coefficient    NUMERIC(6,3) NOT NULL DEFAULT 1.000,
    weekly_hours   NUMERIC(5,2) NOT NULL DEFAULT 2.00,
    is_mandatory   BOOLEAN NOT NULL DEFAULT TRUE,
    display_order  INTEGER NOT NULL DEFAULT 1,
    passing_mark   NUMERIC(6,3),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_curriculum_subject UNIQUE (curriculum_id, subject_id),
    CONSTRAINT ck_curriculum_coefficient CHECK (coefficient > 0 AND coefficient <= 100),
    CONSTRAINT ck_curriculum_hours       CHECK (weekly_hours >= 0)
);
CREATE TRIGGER trg_curriculum_subject_updated BEFORE UPDATE ON curriculum_subject
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_curriculum_subject ON curriculum_subject(curriculum_id, display_order);

-- Who teaches what, to which class, for which year (section 24).
CREATE TABLE teacher_assignment (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id       UUID NOT NULL REFERENCES teacher(id)       ON DELETE RESTRICT,
    academic_year_id UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    classroom_id     UUID NOT NULL REFERENCES classroom(id)     ON DELETE RESTRICT,
    subject_id       UUID NOT NULL REFERENCES subject(id)       ON DELETE RESTRICT,
    weekly_hours     NUMERIC(5,2) NOT NULL DEFAULT 2.00,
    is_main_teacher  BOOLEAN NOT NULL DEFAULT FALSE,
    start_date       DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date         DATE,
    status           assignment_status NOT NULL DEFAULT 'ACTIVE',
    version          BIGINT NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by       UUID,
    CONSTRAINT ck_teacher_assignment_dates CHECK (end_date IS NULL OR end_date >= start_date),
    CONSTRAINT ck_teacher_assignment_hours CHECK (weekly_hours >= 0)
);
CREATE TRIGGER trg_teacher_assignment_updated BEFORE UPDATE ON teacher_assignment
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- One live assignment per (classroom, subject, teacher).
CREATE UNIQUE INDEX uq_teacher_assignment_active
    ON teacher_assignment(academic_year_id, classroom_id, subject_id, teacher_id)
    WHERE status IN ('DRAFT','ACTIVE');
-- A subject in a classroom has a single active holder.
CREATE UNIQUE INDEX uq_teacher_assignment_subject_holder
    ON teacher_assignment(academic_year_id, classroom_id, subject_id)
    WHERE status = 'ACTIVE';
CREATE INDEX ix_teacher_assignment_teacher ON teacher_assignment(teacher_id, academic_year_id, status);
CREATE INDEX ix_teacher_assignment_class   ON teacher_assignment(classroom_id, status);
