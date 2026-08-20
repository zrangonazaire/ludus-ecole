-- =====================================================================
-- V18 - Grades and the DRAFT -> SUBMITTED -> VALIDATED -> PUBLISHED flow
-- Rule 6: a validated/published grade can never be silently changed.
-- =====================================================================

CREATE TABLE grade (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id     UUID NOT NULL REFERENCES assessment(id) ON DELETE RESTRICT,
    student_id        UUID NOT NULL REFERENCES student(id)    ON DELETE RESTRICT,
    enrollment_id     UUID NOT NULL REFERENCES enrollment(id) ON DELETE RESTRICT,
    classroom_id      UUID NOT NULL REFERENCES classroom(id)  ON DELETE RESTRICT,
    subject_id        UUID NOT NULL REFERENCES subject(id)    ON DELETE RESTRICT,
    term_id           UUID NOT NULL REFERENCES term(id)       ON DELETE RESTRICT,
    academic_year_id  UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    score             NUMERIC(6,3),
    max_score         NUMERIC(6,3) NOT NULL,
    -- score brought back on the school scale (usually /20)
    normalized_score  NUMERIC(6,3),
    absent            BOOLEAN NOT NULL DEFAULT FALSE,
    exempted          BOOLEAN NOT NULL DEFAULT FALSE,
    status            grade_status NOT NULL DEFAULT 'DRAFT',
    comment           VARCHAR(500),
    entered_by        UUID REFERENCES app_user(id),
    entered_at        TIMESTAMPTZ,
    submitted_by      UUID REFERENCES app_user(id),
    submitted_at      TIMESTAMPTZ,
    validated_by      UUID REFERENCES app_user(id),
    validated_at      TIMESTAMPTZ,
    published_at      TIMESTAMPTZ,
    version           BIGINT NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_grade UNIQUE (assessment_id, student_id),
    CONSTRAINT ck_grade_range   CHECK (score IS NULL OR (score >= 0 AND score <= max_score)),
    CONSTRAINT ck_grade_max     CHECK (max_score > 0),
    CONSTRAINT ck_grade_absent  CHECK (NOT (absent AND score IS NOT NULL)),
    CONSTRAINT ck_grade_present CHECK (absent OR exempted OR status = 'DRAFT' OR score IS NOT NULL)
);
CREATE TRIGGER trg_grade_updated BEFORE UPDATE ON grade
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_grade_assessment ON grade(assessment_id);
CREATE INDEX ix_grade_student    ON grade(student_id, term_id, subject_id);
CREATE INDEX ix_grade_published   ON grade(student_id, term_id) WHERE status = 'PUBLISHED';
CREATE INDEX ix_grade_computation ON grade(enrollment_id, term_id, subject_id)
    WHERE status IN ('VALIDATED','PUBLISHED');

-- Every correction after validation is stored, never overwritten (rule 6).
CREATE TABLE grade_revision (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grade_id      UUID NOT NULL REFERENCES grade(id) ON DELETE CASCADE,
    previous_score NUMERIC(6,3),
    new_score      NUMERIC(6,3),
    previous_status grade_status,
    new_status      grade_status,
    justification  TEXT NOT NULL,
    changed_by     UUID NOT NULL REFERENCES app_user(id),
    changed_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ix_grade_revision ON grade_revision(grade_id, changed_at DESC);

-- Batch validation act, per class / subject / term.
CREATE TABLE grade_validation (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES assessment(id) ON DELETE CASCADE,
    classroom_id  UUID NOT NULL REFERENCES classroom(id),
    subject_id    UUID NOT NULL REFERENCES subject(id),
    term_id       UUID NOT NULL REFERENCES term(id),
    grade_count   INTEGER NOT NULL DEFAULT 0,
    validated_by  UUID NOT NULL REFERENCES app_user(id),
    validated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    comment       TEXT,
    CONSTRAINT uq_grade_validation UNIQUE (assessment_id)
);
