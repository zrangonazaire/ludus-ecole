-- =====================================================================
-- V5 - Academic years and terms
-- Rule: only ONE academic year may be ACTIVE per school at a time.
-- =====================================================================

CREATE TABLE academic_year (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id           UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    code                VARCHAR(30)  NOT NULL,          -- 2026-2027
    label               VARCHAR(120) NOT NULL,
    start_date          DATE NOT NULL,
    end_date            DATE NOT NULL,
    status              academic_year_status NOT NULL DEFAULT 'DRAFT',
    enrollment_open_at  TIMESTAMPTZ,
    enrollment_close_at TIMESTAMPTZ,
    previous_year_id    UUID REFERENCES academic_year(id),
    closed_at           TIMESTAMPTZ,
    closed_by           UUID REFERENCES app_user(id),
    version             BIGINT NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by          UUID,
    updated_by          UUID,
    CONSTRAINT uq_academic_year_code UNIQUE (school_id, code),
    CONSTRAINT ck_academic_year_dates CHECK (end_date > start_date),
    CONSTRAINT ck_academic_year_enrollment_window
        CHECK (enrollment_open_at IS NULL OR enrollment_close_at IS NULL
               OR enrollment_close_at > enrollment_open_at)
);
CREATE TRIGGER trg_academic_year_updated BEFORE UPDATE ON academic_year
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Business rule 19: a single ACTIVE year per school, enforced by the DB.
CREATE UNIQUE INDEX uq_academic_year_single_active
    ON academic_year(school_id) WHERE status = 'ACTIVE';
CREATE INDEX ix_academic_year_school_status ON academic_year(school_id, status);

CREATE TABLE term (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year_id      UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    name                  VARCHAR(120) NOT NULL,
    code                  VARCHAR(30)  NOT NULL,
    term_type             term_type NOT NULL DEFAULT 'TRIMESTER',
    sequence              INTEGER NOT NULL,
    start_date            DATE NOT NULL,
    end_date              DATE NOT NULL,
    grade_entry_start_at  TIMESTAMPTZ,
    grade_entry_end_at    TIMESTAMPTZ,
    status                term_status NOT NULL DEFAULT 'PLANNED',
    weight                NUMERIC(6,3) NOT NULL DEFAULT 1.000,
    version               BIGINT NOT NULL DEFAULT 0,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_term_code     UNIQUE (academic_year_id, code),
    CONSTRAINT uq_term_sequence UNIQUE (academic_year_id, sequence),
    CONSTRAINT ck_term_dates    CHECK (end_date > start_date),
    CONSTRAINT ck_term_sequence CHECK (sequence > 0),
    CONSTRAINT ck_term_weight   CHECK (weight > 0),
    CONSTRAINT ck_term_grade_window
        CHECK (grade_entry_start_at IS NULL OR grade_entry_end_at IS NULL
               OR grade_entry_end_at > grade_entry_start_at)
);
CREATE TRIGGER trg_term_updated BEFORE UPDATE ON term
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_term_year ON term(academic_year_id, sequence);
