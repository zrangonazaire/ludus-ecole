-- =====================================================================
-- V9 - Admission applications (pre-enrollment funnel)
-- =====================================================================

CREATE TABLE admission_application (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id           UUID NOT NULL REFERENCES school(id)        ON DELETE RESTRICT,
    academic_year_id    UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    campus_id           UUID NOT NULL REFERENCES campus(id)        ON DELETE RESTRICT,
    requested_level_id  UUID NOT NULL REFERENCES level(id)         ON DELETE RESTRICT,
    reserved_classroom_id UUID REFERENCES classroom(id),
    student_id          UUID REFERENCES student(id),   -- set once converted
    application_number  VARCHAR(40) NOT NULL,
    -- applicant identity captured before a Student record exists
    first_name          VARCHAR(120) NOT NULL,
    last_name           VARCHAR(120) NOT NULL,
    middle_name         VARCHAR(120),
    gender              gender NOT NULL,
    birth_date          DATE NOT NULL,
    birth_place         VARCHAR(150),
    nationality         VARCHAR(120),
    previous_school     VARCHAR(200),
    guardian_first_name VARCHAR(120),
    guardian_last_name  VARCHAR(120),
    guardian_phone      VARCHAR(40),
    guardian_email      VARCHAR(180),
    status              admission_status NOT NULL DEFAULT 'DRAFT',
    submitted_at        TIMESTAMPTZ,
    reviewed_at         TIMESTAMPTZ,
    reviewed_by         UUID REFERENCES app_user(id),
    decision_at         TIMESTAMPTZ,
    decision_by         UUID REFERENCES app_user(id),
    decision_reason     TEXT,
    entrance_exam_score NUMERIC(6,3),
    documents_complete  BOOLEAN NOT NULL DEFAULT FALSE,
    seat_reserved       BOOLEAN NOT NULL DEFAULT FALSE,
    notes               TEXT,
    version             BIGINT NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by          UUID,
    updated_by          UUID,
    CONSTRAINT uq_admission_number UNIQUE (application_number),
    CONSTRAINT ck_admission_birth  CHECK (birth_date < CURRENT_DATE),
    CONSTRAINT ck_admission_score  CHECK (entrance_exam_score IS NULL OR entrance_exam_score >= 0)
);
CREATE TRIGGER trg_admission_updated BEFORE UPDATE ON admission_application
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_admission_year_status ON admission_application(academic_year_id, status);
CREATE INDEX ix_admission_level       ON admission_application(requested_level_id);
-- Reserved seats counted by projectedAvailableSeats (section 22).
CREATE INDEX ix_admission_reserved    ON admission_application(reserved_classroom_id)
    WHERE seat_reserved AND status IN ('ACCEPTED','WAITLISTED','UNDER_REVIEW');

CREATE TABLE admission_document (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES admission_application(id) ON DELETE CASCADE,
    document_code  VARCHAR(60) NOT NULL,
    label          VARCHAR(150) NOT NULL,
    file_url       VARCHAR(500),
    received       BOOLEAN NOT NULL DEFAULT FALSE,
    mandatory      BOOLEAN NOT NULL DEFAULT TRUE,
    received_at    TIMESTAMPTZ,
    CONSTRAINT uq_admission_document UNIQUE (application_id, document_code)
);
