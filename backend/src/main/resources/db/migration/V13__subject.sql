-- =====================================================================
-- V13 - Subjects
-- =====================================================================

CREATE TABLE subject (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id   UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    code        VARCHAR(20)  NOT NULL,   -- MAT, FRA, ANG, SVT
    name        VARCHAR(150) NOT NULL,
    short_name  VARCHAR(40),
    category    subject_category NOT NULL DEFAULT 'OTHER',
    color_hex   CHAR(7),
    description TEXT,
    is_graded   BOOLEAN NOT NULL DEFAULT TRUE,
    status      common_status NOT NULL DEFAULT 'ACTIVE',
    version     BIGINT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_subject_code  UNIQUE (school_id, code),
    CONSTRAINT ck_subject_color CHECK (color_hex IS NULL OR color_hex ~* '^#[0-9a-f]{6}$')
);
CREATE TRIGGER trg_subject_updated BEFORE UPDATE ON subject
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Which subjects a teacher is qualified to teach.
CREATE TABLE teacher_subject (
    teacher_id UUID NOT NULL REFERENCES teacher(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subject(id) ON DELETE CASCADE,
    PRIMARY KEY (teacher_id, subject_id)
);
