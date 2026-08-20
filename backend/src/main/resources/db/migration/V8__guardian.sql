-- =====================================================================
-- V8 - Guardians and the student <-> guardian relation
-- =====================================================================

CREATE TABLE guardian (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id       UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    first_name      VARCHAR(120) NOT NULL,
    last_name       VARCHAR(120) NOT NULL,
    gender          gender,
    email           VARCHAR(180),
    phone           VARCHAR(40) NOT NULL,
    phone_secondary VARCHAR(40),
    national_id     VARCHAR(80),
    profession      VARCHAR(150),
    employer        VARCHAR(150),
    address_line1   VARCHAR(200),
    city            VARCHAR(120),
    preferred_channel notification_channel NOT NULL DEFAULT 'EMAIL',
    user_account_id UUID REFERENCES app_user(id),
    status          common_status NOT NULL DEFAULT 'ACTIVE',
    version         BIGINT NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by      UUID,
    updated_by      UUID,
    CONSTRAINT uq_guardian_user  UNIQUE (user_account_id),
    CONSTRAINT uq_guardian_phone UNIQUE (school_id, phone),
    CONSTRAINT ck_guardian_email CHECK (email IS NULL OR email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);
CREATE TRIGGER trg_guardian_updated BEFORE UPDATE ON guardian
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_guardian_search_trgm ON guardian
    USING gin ((eduops_unaccent(lower(coalesce(first_name,'') || ' ' || coalesce(last_name,'')))) gin_trgm_ops);

-- Many-to-many with rich, permission-bearing attributes.
CREATE TABLE student_guardian (
    id                              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id                      UUID NOT NULL REFERENCES student(id)  ON DELETE CASCADE,
    guardian_id                     UUID NOT NULL REFERENCES guardian(id) ON DELETE RESTRICT,
    relationship                    guardian_relationship NOT NULL,
    is_primary                      BOOLEAN NOT NULL DEFAULT FALSE,
    has_financial_responsibility    BOOLEAN NOT NULL DEFAULT FALSE,
    can_pickup_student              BOOLEAN NOT NULL DEFAULT TRUE,
    receives_notifications          BOOLEAN NOT NULL DEFAULT TRUE,
    receives_academic_reports       BOOLEAN NOT NULL DEFAULT TRUE,
    receives_financial_notifications BOOLEAN NOT NULL DEFAULT FALSE,
    lives_with_student              BOOLEAN NOT NULL DEFAULT TRUE,
    note                            TEXT,
    created_at                      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at                      TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_student_guardian UNIQUE (student_id, guardian_id)
);
CREATE TRIGGER trg_student_guardian_updated BEFORE UPDATE ON student_guardian
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Exactly one primary guardian per student.
CREATE UNIQUE INDEX uq_student_guardian_primary
    ON student_guardian(student_id) WHERE is_primary;
-- At most one financially responsible guardian per student.
CREATE UNIQUE INDEX uq_student_guardian_financial
    ON student_guardian(student_id) WHERE has_financial_responsibility;

CREATE INDEX ix_student_guardian_guardian ON student_guardian(guardian_id);
CREATE INDEX ix_student_guardian_student  ON student_guardian(student_id);
