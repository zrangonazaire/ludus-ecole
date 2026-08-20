-- =====================================================================
-- V7 - Students
-- The student record holds identity only. Academic placement lives in
-- `enrollment` (absolute rule 5: never a permanent classroom on student).
-- =====================================================================

CREATE TABLE student (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id          UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    student_number     VARCHAR(40)  NOT NULL,          -- EDU-2026-000123
    first_name         VARCHAR(120) NOT NULL,
    last_name          VARCHAR(120) NOT NULL,
    middle_name        VARCHAR(120),
    gender             gender NOT NULL,
    birth_date         DATE NOT NULL,
    birth_place        VARCHAR(150),
    nationality        VARCHAR(120),
    national_id        VARCHAR(80),
    photo_url          VARCHAR(500),
    email              VARCHAR(180),
    phone              VARCHAR(40),
    address_line1      VARCHAR(200),
    city               VARCHAR(120),
    blood_group        VARCHAR(10),
    medical_notes      TEXT,
    has_disability     BOOLEAN NOT NULL DEFAULT FALSE,
    status             student_status NOT NULL DEFAULT 'APPLICANT',
    admission_date     DATE,
    previous_school    VARCHAR(200),
    user_account_id    UUID REFERENCES app_user(id),
    archived_at        TIMESTAMPTZ,
    version            BIGINT NOT NULL DEFAULT 0,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by         UUID,
    updated_by         UUID,
    CONSTRAINT uq_student_number UNIQUE (student_number),
    CONSTRAINT uq_student_user   UNIQUE (user_account_id),
    CONSTRAINT ck_student_birth  CHECK (birth_date < CURRENT_DATE AND birth_date > DATE '1900-01-01'),
    CONSTRAINT ck_student_email  CHECK (email IS NULL OR email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);
CREATE TRIGGER trg_student_updated BEFORE UPDATE ON student
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX ix_student_school_status ON student(school_id, status);
CREATE INDEX ix_student_lastname      ON student(lower(last_name), lower(first_name));
-- Trigram index powering the global search bar (name or matricule).
CREATE INDEX ix_student_search_trgm ON student
    USING gin ((eduops_unaccent(lower(coalesce(first_name,'') || ' ' ||
                                       coalesce(last_name,'')  || ' ' ||
                                       coalesce(student_number,'')))) gin_trgm_ops);

-- Per-school, per-year sequence used to build the matricule.
CREATE TABLE number_sequence (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id   UUID NOT NULL REFERENCES school(id) ON DELETE CASCADE,
    scope       VARCHAR(40) NOT NULL,      -- STUDENT / RECEIPT / INVOICE / DOCUMENT
    year_part   VARCHAR(10) NOT NULL,
    current_value BIGINT NOT NULL DEFAULT 0,
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_number_sequence UNIQUE (school_id, scope, year_part),
    CONSTRAINT ck_number_sequence CHECK (current_value >= 0)
);

-- Full history of student status transitions (rule 17 - traceability).
CREATE TABLE student_status_history (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id  UUID NOT NULL REFERENCES student(id) ON DELETE CASCADE,
    from_status student_status,
    to_status   student_status NOT NULL,
    reason      TEXT,
    changed_by  UUID REFERENCES app_user(id),
    changed_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ix_student_status_history ON student_status_history(student_id, changed_at DESC);
