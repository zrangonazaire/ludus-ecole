-- =====================================================================
-- V6 - Academic structure: cycle -> level -> classroom
-- A classroom always belongs to ONE academic year (rule 5 / section 14).
-- =====================================================================

CREATE TABLE cycle (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id   UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    code        VARCHAR(30)  NOT NULL,     -- PRE, PRI, SEC1, SEC2
    name        VARCHAR(120) NOT NULL,     -- Prescolaire, Primaire, College, Lycee
    sequence    INTEGER NOT NULL DEFAULT 1,
    description TEXT,
    status      common_status NOT NULL DEFAULT 'ACTIVE',
    version     BIGINT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_cycle_code UNIQUE (school_id, code),
    CONSTRAINT ck_cycle_sequence CHECK (sequence > 0)
);
CREATE TRIGGER trg_cycle_updated BEFORE UPDATE ON cycle
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE level (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cycle_id      UUID NOT NULL REFERENCES cycle(id) ON DELETE RESTRICT,
    code          VARCHAR(30)  NOT NULL,   -- 6EME, 3EME, TLE
    name          VARCHAR(120) NOT NULL,
    short_name    VARCHAR(30),
    sequence      INTEGER NOT NULL,
    next_level_id UUID REFERENCES level(id),
    is_terminal   BOOLEAN NOT NULL DEFAULT FALSE,
    status        common_status NOT NULL DEFAULT 'ACTIVE',
    version       BIGINT NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_level_code     UNIQUE (cycle_id, code),
    CONSTRAINT uq_level_sequence UNIQUE (cycle_id, sequence),
    CONSTRAINT ck_level_sequence CHECK (sequence > 0),
    CONSTRAINT ck_level_next     CHECK (next_level_id IS NULL OR next_level_id <> id)
);
CREATE TRIGGER trg_level_updated BEFORE UPDATE ON level
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_level_cycle ON level(cycle_id, sequence);

CREATE TABLE classroom (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year_id   UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    campus_id          UUID NOT NULL REFERENCES campus(id)        ON DELETE RESTRICT,
    level_id           UUID NOT NULL REFERENCES level(id)         ON DELETE RESTRICT,
    code               VARCHAR(40)  NOT NULL,   -- 3EME-A
    name               VARCHAR(120) NOT NULL,   -- 3eme A
    section            VARCHAR(30),             -- A, B, Scientifique...
    capacity_maximum   INTEGER NOT NULL,
    capacity_warning_threshold NUMERIC(5,2) NOT NULL DEFAULT 90.00, -- percent
    main_teacher_id    UUID,                    -- FK added in V11 (teacher)
    default_room_id    UUID REFERENCES room(id),
    language_of_instruction VARCHAR(60) NOT NULL DEFAULT 'FR',
    status             classroom_status NOT NULL DEFAULT 'DRAFT',
    version            BIGINT NOT NULL DEFAULT 0,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by         UUID,
    updated_by         UUID,
    CONSTRAINT uq_classroom_code UNIQUE (academic_year_id, campus_id, code),
    CONSTRAINT ck_classroom_capacity CHECK (capacity_maximum > 0 AND capacity_maximum <= 500),
    CONSTRAINT ck_classroom_threshold CHECK (capacity_warning_threshold > 0 AND capacity_warning_threshold <= 100)
);
CREATE TRIGGER trg_classroom_updated BEFORE UPDATE ON classroom
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_classroom_year   ON classroom(academic_year_id);
CREATE INDEX ix_classroom_level  ON classroom(level_id);
CREATE INDEX ix_classroom_campus ON classroom(campus_id);
