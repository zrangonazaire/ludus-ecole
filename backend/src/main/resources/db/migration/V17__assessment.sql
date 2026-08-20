-- =====================================================================
-- V17 - Assessments
-- =====================================================================

CREATE TABLE assessment (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    classroom_id     UUID NOT NULL REFERENCES classroom(id)     ON DELETE RESTRICT,
    subject_id       UUID NOT NULL REFERENCES subject(id)       ON DELETE RESTRICT,
    teacher_id       UUID NOT NULL REFERENCES teacher(id)       ON DELETE RESTRICT,
    academic_year_id UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    term_id          UUID NOT NULL REFERENCES term(id)          ON DELETE RESTRICT,
    title            VARCHAR(200) NOT NULL,
    description      TEXT,
    assessment_type  assessment_type NOT NULL DEFAULT 'TEST',
    assessment_date  DATE NOT NULL,
    duration_minutes INTEGER,
    max_score        NUMERIC(6,3) NOT NULL DEFAULT 20.000,
    coefficient      NUMERIC(6,3) NOT NULL DEFAULT 1.000,
    status           assessment_status NOT NULL DEFAULT 'DRAFT',
    counts_for_average BOOLEAN NOT NULL DEFAULT TRUE,
    published_at     TIMESTAMPTZ,
    validated_at     TIMESTAMPTZ,
    validated_by     UUID REFERENCES app_user(id),
    version          BIGINT NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by       UUID,
    updated_by       UUID,
    CONSTRAINT ck_assessment_max_score   CHECK (max_score > 0 AND max_score <= 1000),
    CONSTRAINT ck_assessment_coefficient CHECK (coefficient > 0 AND coefficient <= 100),
    CONSTRAINT ck_assessment_duration    CHECK (duration_minutes IS NULL OR duration_minutes > 0)
);
CREATE TRIGGER trg_assessment_updated BEFORE UPDATE ON assessment
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_assessment_class_term ON assessment(classroom_id, term_id, status);
CREATE INDEX ix_assessment_teacher    ON assessment(teacher_id, assessment_date DESC);
CREATE INDEX ix_assessment_upcoming   ON assessment(assessment_date)
    WHERE status IN ('PLANNED','OPEN');
