-- =====================================================================
-- V12 - Non-teaching staff
-- =====================================================================

CREATE TABLE staff (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id       UUID NOT NULL REFERENCES school(id)  ON DELETE RESTRICT,
    campus_id       UUID REFERENCES campus(id),
    employee_number VARCHAR(40)  NOT NULL,
    first_name      VARCHAR(120) NOT NULL,
    last_name       VARCHAR(120) NOT NULL,
    gender          gender,
    email           VARCHAR(180),
    phone           VARCHAR(40),
    job_title       VARCHAR(150) NOT NULL,
    department      VARCHAR(120),
    hire_date       DATE NOT NULL,
    contract_type   contract_type NOT NULL DEFAULT 'PERMANENT',
    status          staff_status NOT NULL DEFAULT 'ACTIVE',
    user_account_id UUID REFERENCES app_user(id),
    version         BIGINT NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_staff_employee_number UNIQUE (school_id, employee_number),
    CONSTRAINT uq_staff_user UNIQUE (user_account_id)
);
CREATE TRIGGER trg_staff_updated BEFORE UPDATE ON staff
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_staff_school_status ON staff(school_id, status);
