-- =====================================================================
-- V11 - Teachers and pedagogical assignments
-- =====================================================================

CREATE TABLE teacher (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id       UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    employee_number VARCHAR(40)  NOT NULL,
    first_name      VARCHAR(120) NOT NULL,
    last_name       VARCHAR(120) NOT NULL,
    gender          gender,
    birth_date      DATE,
    email           VARCHAR(180) NOT NULL,
    phone           VARCHAR(40),
    photo_url       VARCHAR(500),
    speciality      VARCHAR(150),
    qualification   VARCHAR(150),
    hire_date       DATE NOT NULL,
    contract_type   contract_type NOT NULL DEFAULT 'PERMANENT',
    weekly_hours_max INTEGER NOT NULL DEFAULT 24,
    status          teacher_status NOT NULL DEFAULT 'ACTIVE',
    user_account_id UUID REFERENCES app_user(id),
    version         BIGINT NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by      UUID,
    updated_by      UUID,
    CONSTRAINT uq_teacher_employee_number UNIQUE (school_id, employee_number),
    CONSTRAINT uq_teacher_email UNIQUE (school_id, email),
    CONSTRAINT uq_teacher_user  UNIQUE (user_account_id),
    CONSTRAINT ck_teacher_hours CHECK (weekly_hours_max > 0 AND weekly_hours_max <= 60)
);
CREATE TRIGGER trg_teacher_updated BEFORE UPDATE ON teacher
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_teacher_school_status ON teacher(school_id, status);
CREATE INDEX ix_teacher_search_trgm ON teacher
    USING gin ((eduops_unaccent(lower(coalesce(first_name,'') || ' ' || coalesce(last_name,'')))) gin_trgm_ops);

-- Deferred FK from V6.
ALTER TABLE classroom
    ADD CONSTRAINT fk_classroom_main_teacher
    FOREIGN KEY (main_teacher_id) REFERENCES teacher(id);
