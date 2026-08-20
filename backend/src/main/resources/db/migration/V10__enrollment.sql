-- =====================================================================
-- V10 - Enrollment: the annual academic placement of a student
-- Absolute rule 5. Every academic fact is reached through here.
-- =====================================================================

CREATE TABLE enrollment (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id        UUID NOT NULL REFERENCES student(id)       ON DELETE RESTRICT,
    academic_year_id  UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    classroom_id      UUID NOT NULL REFERENCES classroom(id)     ON DELETE RESTRICT,
    admission_id      UUID REFERENCES admission_application(id),
    previous_enrollment_id UUID REFERENCES enrollment(id),
    enrollment_number VARCHAR(40) NOT NULL,
    enrollment_kind   enrollment_kind   NOT NULL DEFAULT 'NEW',
    status            enrollment_status NOT NULL DEFAULT 'DRAFT',
    enrollment_date   DATE NOT NULL DEFAULT CURRENT_DATE,
    validated_at      TIMESTAMPTZ,
    validated_by      UUID REFERENCES app_user(id),
    cancelled_at      TIMESTAMPTZ,
    cancelled_by      UUID REFERENCES app_user(id),
    cancellation_reason TEXT,
    completed_at      TIMESTAMPTZ,
    repeating         BOOLEAN NOT NULL DEFAULT FALSE,
    over_capacity_override BOOLEAN NOT NULL DEFAULT FALSE,
    over_capacity_reason   TEXT,
    over_capacity_approved_by UUID REFERENCES app_user(id),
    idempotency_key   VARCHAR(120),
    notes             TEXT,
    version           BIGINT NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by        UUID,
    updated_by        UUID,
    CONSTRAINT uq_enrollment_number UNIQUE (enrollment_number),
    CONSTRAINT ck_enrollment_override
        CHECK (NOT over_capacity_override
               OR (over_capacity_reason IS NOT NULL AND over_capacity_approved_by IS NOT NULL)),
    CONSTRAINT ck_enrollment_cancel
        CHECK (status <> 'CANCELLED' OR cancellation_reason IS NOT NULL)
);
CREATE TRIGGER trg_enrollment_updated BEFORE UPDATE ON enrollment
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Rule 21: no two live enrollments for the same student and year.
CREATE UNIQUE INDEX uq_enrollment_active_per_year
    ON enrollment(student_id, academic_year_id)
    WHERE status IN ('DRAFT','PENDING','VALIDATED','ACTIVE','SUSPENDED');

CREATE INDEX ix_enrollment_classroom ON enrollment(classroom_id, status);
CREATE INDEX ix_enrollment_year      ON enrollment(academic_year_id, status);
CREATE INDEX ix_enrollment_student   ON enrollment(student_id, academic_year_id);
-- Partial index feeding the availableSeats computation.
CREATE INDEX ix_enrollment_counting
    ON enrollment(classroom_id)
    WHERE status IN ('VALIDATED','ACTIVE');

CREATE TABLE enrollment_document (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID NOT NULL REFERENCES enrollment(id) ON DELETE CASCADE,
    document_code VARCHAR(60)  NOT NULL,
    label         VARCHAR(150) NOT NULL,
    file_url      VARCHAR(500),
    mandatory     BOOLEAN NOT NULL DEFAULT TRUE,
    received      BOOLEAN NOT NULL DEFAULT FALSE,
    received_at   TIMESTAMPTZ,
    CONSTRAINT uq_enrollment_document UNIQUE (enrollment_id, document_code)
);

-- Traceable classroom transfers inside the same academic year.
CREATE TABLE enrollment_transfer (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id    UUID NOT NULL REFERENCES enrollment(id) ON DELETE CASCADE,
    from_classroom_id UUID NOT NULL REFERENCES classroom(id),
    to_classroom_id   UUID NOT NULL REFERENCES classroom(id),
    reason           TEXT NOT NULL,
    transferred_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    transferred_by   UUID REFERENCES app_user(id),
    CONSTRAINT ck_enrollment_transfer_diff CHECK (from_classroom_id <> to_classroom_id)
);
CREATE INDEX ix_enrollment_transfer ON enrollment_transfer(enrollment_id, transferred_at DESC);
