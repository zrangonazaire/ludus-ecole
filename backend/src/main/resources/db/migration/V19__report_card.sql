-- =====================================================================
-- V19 - Report cards. Averages are computed by the backend (rule 14)
-- and frozen on publication (rule 15).
-- =====================================================================

CREATE TABLE report_card (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id         UUID NOT NULL REFERENCES student(id)       ON DELETE RESTRICT,
    enrollment_id      UUID NOT NULL REFERENCES enrollment(id)    ON DELETE RESTRICT,
    classroom_id       UUID NOT NULL REFERENCES classroom(id)     ON DELETE RESTRICT,
    academic_year_id   UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    term_id            UUID NOT NULL REFERENCES term(id)          ON DELETE RESTRICT,
    reference          VARCHAR(60) NOT NULL,
    verification_code  VARCHAR(60) NOT NULL,
    general_average    NUMERIC(6,3),
    class_average      NUMERIC(6,3),
    class_min_average  NUMERIC(6,3),
    class_max_average  NUMERIC(6,3),
    rank_in_class      INTEGER,
    class_size         INTEGER,
    total_coefficient  NUMERIC(8,3),
    absence_count      INTEGER NOT NULL DEFAULT 0,
    justified_absence_count INTEGER NOT NULL DEFAULT 0,
    lateness_count     INTEGER NOT NULL DEFAULT 0,
    general_remark     TEXT,
    council_decision   promotion_decision_type,
    head_teacher_remark TEXT,
    principal_remark   TEXT,
    status             report_card_status NOT NULL DEFAULT 'DRAFT',
    generated_at       TIMESTAMPTZ,
    generated_by       UUID REFERENCES app_user(id),
    published_at       TIMESTAMPTZ,
    published_by       UUID REFERENCES app_user(id),
    -- Immutable snapshot of the computation inputs (rule 15: reproducible)
    computation_snapshot JSONB,
    pdf_url            VARCHAR(500),
    revision           INTEGER NOT NULL DEFAULT 1,
    version            BIGINT NOT NULL DEFAULT 0,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_report_card UNIQUE (enrollment_id, term_id, revision),
    CONSTRAINT uq_report_card_reference    UNIQUE (reference),
    CONSTRAINT uq_report_card_verification UNIQUE (verification_code),
    CONSTRAINT ck_report_card_rank    CHECK (rank_in_class IS NULL OR rank_in_class > 0),
    CONSTRAINT ck_report_card_average CHECK (general_average IS NULL OR general_average >= 0),
    CONSTRAINT ck_report_card_published
        CHECK (status <> 'PUBLISHED' OR (published_at IS NOT NULL AND general_average IS NOT NULL))
);
CREATE TRIGGER trg_report_card_updated BEFORE UPDATE ON report_card
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_report_card_student ON report_card(student_id, term_id);
CREATE INDEX ix_report_card_class   ON report_card(classroom_id, term_id, status);

CREATE TABLE report_card_line (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_card_id    UUID NOT NULL REFERENCES report_card(id) ON DELETE CASCADE,
    subject_id        UUID NOT NULL REFERENCES subject(id)     ON DELETE RESTRICT,
    teacher_id        UUID REFERENCES teacher(id),
    subject_name      VARCHAR(150) NOT NULL,     -- frozen label
    coefficient       NUMERIC(6,3) NOT NULL,
    subject_average   NUMERIC(6,3),
    weighted_average  NUMERIC(9,3),
    class_subject_average NUMERIC(6,3),
    min_score         NUMERIC(6,3),
    max_score         NUMERIC(6,3),
    rank_in_subject   INTEGER,
    assessment_count  INTEGER NOT NULL DEFAULT 0,
    appreciation      VARCHAR(255),
    display_order     INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT uq_report_card_line UNIQUE (report_card_id, subject_id),
    CONSTRAINT ck_report_card_line_coefficient CHECK (coefficient > 0)
);
CREATE INDEX ix_report_card_line ON report_card_line(report_card_id, display_order);
