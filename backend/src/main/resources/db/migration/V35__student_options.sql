-- =====================================================================
-- V35 - Optional courses and languages chosen by students.
-- =====================================================================

CREATE TABLE academic_option (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id         UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    code              VARCHAR(30) NOT NULL,
    name              VARCHAR(150) NOT NULL,
    category          VARCHAR(30) NOT NULL DEFAULT 'OTHER',
    language_code     VARCHAR(10),
    description       TEXT,
    color_hex         CHAR(7),
    status            common_status NOT NULL DEFAULT 'ACTIVE',
    version           BIGINT NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_academic_option_code UNIQUE (school_id, code),
    CONSTRAINT ck_academic_option_category CHECK (
        category IN ('LANGUAGE','ACADEMIC','ARTS','SPORT','TECHNICAL','OTHER')),
    CONSTRAINT ck_academic_option_color CHECK (
        color_hex IS NULL OR color_hex ~* '^#[0-9a-f]{6}$')
);
CREATE TRIGGER trg_academic_option_updated BEFORE UPDATE ON academic_option
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE option_offering (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    option_id          UUID NOT NULL REFERENCES academic_option(id) ON DELETE RESTRICT,
    academic_year_id   UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    level_id           UUID NOT NULL REFERENCES level(id) ON DELETE RESTRICT,
    capacity           INTEGER NOT NULL DEFAULT 40,
    weekly_hours       NUMERIC(5,2) NOT NULL DEFAULT 2.00,
    choice_start_date  DATE,
    choice_end_date    DATE,
    status             common_status NOT NULL DEFAULT 'ACTIVE',
    version            BIGINT NOT NULL DEFAULT 0,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_option_offering UNIQUE (option_id, academic_year_id, level_id),
    CONSTRAINT ck_option_offering_capacity CHECK (capacity > 0),
    CONSTRAINT ck_option_offering_hours CHECK (weekly_hours >= 0),
    CONSTRAINT ck_option_offering_dates CHECK (
        choice_end_date IS NULL OR choice_start_date IS NULL
        OR choice_end_date >= choice_start_date)
);
CREATE TRIGGER trg_option_offering_updated BEFORE UPDATE ON option_offering
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE student_option_choice (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offering_id       UUID NOT NULL REFERENCES option_offering(id) ON DELETE RESTRICT,
    student_id        UUID NOT NULL REFERENCES student(id) ON DELETE RESTRICT,
    enrollment_id     UUID NOT NULL REFERENCES enrollment(id) ON DELETE RESTRICT,
    priority          INTEGER NOT NULL DEFAULT 1,
    status            VARCHAR(20) NOT NULL DEFAULT 'REQUESTED',
    notes             TEXT,
    chosen_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    confirmed_at      TIMESTAMPTZ,
    confirmed_by      UUID REFERENCES app_user(id),
    version           BIGINT NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_student_option_choice UNIQUE (offering_id, student_id),
    CONSTRAINT ck_student_option_priority CHECK (priority > 0),
    CONSTRAINT ck_student_option_status CHECK (
        status IN ('REQUESTED','CONFIRMED','WAITLISTED','CANCELLED'))
);
CREATE TRIGGER trg_student_option_choice_updated BEFORE UPDATE ON student_option_choice
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX ix_option_offering_year ON option_offering(academic_year_id, status);
CREATE INDEX ix_option_choice_student ON student_option_choice(student_id, status);
CREATE INDEX ix_option_choice_offering ON student_option_choice(offering_id, status);

-- These tables were created after V31 and therefore receive their RLS here.
ALTER TABLE academic_option ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_option FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON academic_option
    USING (school_id = NULLIF(current_setting('app.current_school_id', true), '')::uuid)
    WITH CHECK (school_id = NULLIF(current_setting('app.current_school_id', true), '')::uuid);

ALTER TABLE option_offering ENABLE ROW LEVEL SECURITY;
ALTER TABLE option_offering FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON option_offering
    USING (EXISTS (
        SELECT 1 FROM academic_option o
        WHERE o.id = option_offering.option_id
          AND o.school_id = NULLIF(current_setting('app.current_school_id', true), '')::uuid))
    WITH CHECK (EXISTS (
        SELECT 1 FROM academic_option o
        WHERE o.id = option_offering.option_id
          AND o.school_id = NULLIF(current_setting('app.current_school_id', true), '')::uuid));

ALTER TABLE student_option_choice ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_option_choice FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON student_option_choice
    USING (EXISTS (
        SELECT 1 FROM option_offering f JOIN academic_option o ON o.id = f.option_id
        WHERE f.id = student_option_choice.offering_id
          AND o.school_id = NULLIF(current_setting('app.current_school_id', true), '')::uuid))
    WITH CHECK (EXISTS (
        SELECT 1 FROM option_offering f JOIN academic_option o ON o.id = f.option_id
        WHERE f.id = student_option_choice.offering_id
          AND o.school_id = NULLIF(current_setting('app.current_school_id', true), '')::uuid));

