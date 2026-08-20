-- =====================================================================
-- V4 - School and campus (top of the academic hierarchy)
-- =====================================================================

CREATE TABLE school (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code                 VARCHAR(30)  NOT NULL,
    name                 VARCHAR(200) NOT NULL,
    legal_name           VARCHAR(255),
    motto                VARCHAR(255),
    registration_number  VARCHAR(80),
    email                VARCHAR(180),
    phone                VARCHAR(40),
    website              VARCHAR(200),
    address_line1        VARCHAR(200),
    address_line2        VARCHAR(200),
    city                 VARCHAR(120),
    country              VARCHAR(120) NOT NULL DEFAULT 'Cote d''Ivoire',
    logo_url             VARCHAR(500),
    currency             CHAR(3)      NOT NULL DEFAULT 'XOF',
    locale               VARCHAR(10)  NOT NULL DEFAULT 'fr-CI',
    timezone             VARCHAR(60)  NOT NULL DEFAULT 'Africa/Abidjan',
    grading_scale_max    NUMERIC(6,3) NOT NULL DEFAULT 20.000,
    ranking_enabled      BOOLEAN      NOT NULL DEFAULT TRUE,
    student_number_pattern VARCHAR(80) NOT NULL DEFAULT 'EDU-{year}-{seq:6}',
    receipt_number_pattern VARCHAR(80) NOT NULL DEFAULT 'REC-{year}-{seq:8}',
    invoice_number_pattern VARCHAR(80) NOT NULL DEFAULT 'INV-{year}-{seq:8}',
    settings             JSONB        NOT NULL DEFAULT '{}'::jsonb,
    status               school_status NOT NULL DEFAULT 'ACTIVE',
    version              BIGINT       NOT NULL DEFAULT 0,
    created_at           TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at           TIMESTAMPTZ  NOT NULL DEFAULT now(),
    created_by           UUID,
    updated_by           UUID,
    CONSTRAINT uq_school_code UNIQUE (code),
    CONSTRAINT ck_school_scale CHECK (grading_scale_max > 0 AND grading_scale_max <= 1000)
);
CREATE TRIGGER trg_school_updated BEFORE UPDATE ON school
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE app_user
    ADD CONSTRAINT fk_app_user_school FOREIGN KEY (school_id) REFERENCES school(id);

CREATE TABLE campus (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id      UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    code           VARCHAR(30)  NOT NULL,
    name           VARCHAR(200) NOT NULL,
    address_line1  VARCHAR(200),
    city           VARCHAR(120),
    phone          VARCHAR(40),
    email          VARCHAR(180),
    is_main        BOOLEAN NOT NULL DEFAULT FALSE,
    status         common_status NOT NULL DEFAULT 'ACTIVE',
    version        BIGINT NOT NULL DEFAULT 0,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by     UUID,
    updated_by     UUID,
    CONSTRAINT uq_campus_code UNIQUE (school_id, code)
);
CREATE TRIGGER trg_campus_updated BEFORE UPDATE ON campus
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- At most one main campus per school.
CREATE UNIQUE INDEX uq_campus_main ON campus(school_id) WHERE is_main;
CREATE INDEX ix_campus_school ON campus(school_id);

-- Physical rooms belong to a campus and are shared by the timetable.
CREATE TABLE room (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campus_id  UUID NOT NULL REFERENCES campus(id) ON DELETE RESTRICT,
    code       VARCHAR(30)  NOT NULL,
    name       VARCHAR(120) NOT NULL,
    building   VARCHAR(120),
    floor      VARCHAR(30),
    capacity   INTEGER NOT NULL DEFAULT 0,
    room_type  VARCHAR(60) NOT NULL DEFAULT 'CLASSROOM',
    status     common_status NOT NULL DEFAULT 'ACTIVE',
    version    BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_room_code UNIQUE (campus_id, code),
    CONSTRAINT ck_room_capacity CHECK (capacity >= 0)
);
CREATE TRIGGER trg_room_updated BEFORE UPDATE ON room
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_room_campus ON room(campus_id);
