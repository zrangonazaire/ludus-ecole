-- =====================================================================
-- V49 - Réductions de scolarité : demandes à validation multi-niveaux
--
-- Une demande de réduction suit un circuit unique : soumission, puis
-- validation séquentielle par autant de niveaux que l'école le décide,
-- chaque niveau confié à un profil (rôle) précis. La réduction n'a
-- d'effet sur les échéances de l'élève qu'une fois le dernier niveau
-- passé ET la décision « appliquée ».
-- =====================================================================

DO $$ BEGIN
    CREATE TYPE discount_request_status AS ENUM
        ('SUBMITTED','APPROVED','REJECTED','CANCELLED','EFFECTIVE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE discount_request (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id         UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    student_id        UUID NOT NULL REFERENCES student(id) ON DELETE RESTRICT,
    academic_year_id  UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    reference         VARCHAR(40) NOT NULL,
    label             VARCHAR(150) NOT NULL,
    reason            TEXT,
    discount_type     discount_type NOT NULL DEFAULT 'PERCENTAGE',
    value             NUMERIC(15,2) NOT NULL,
    computed_amount   NUMERIC(15,2),
    status            discount_request_status NOT NULL DEFAULT 'SUBMITTED',
    current_level     INT NOT NULL DEFAULT 1,
    total_levels      INT NOT NULL,
    decided_at        TIMESTAMPTZ,
    decided_by        UUID REFERENCES app_user(id),
    rejection_reason  TEXT,
    effective_at      TIMESTAMPTZ,
    created_by        UUID REFERENCES app_user(id),
    version           BIGINT NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT uq_discount_request_reference UNIQUE (school_id, reference),
    CONSTRAINT ck_discount_request_value CHECK (value > 0),
    CONSTRAINT ck_discount_request_percentage
        CHECK (discount_type <> 'PERCENTAGE' OR value <= 100),
    CONSTRAINT ck_discount_request_levels CHECK (total_levels BETWEEN 1 AND 5),
    CONSTRAINT ck_discount_request_current
        CHECK (current_level BETWEEN 1 AND total_levels),
    CONSTRAINT ck_discount_request_decided CHECK (
        status NOT IN ('APPROVED','REJECTED') OR decided_at IS NOT NULL),
    CONSTRAINT ck_discount_request_effective CHECK (
        status <> 'EFFECTIVE' OR effective_at IS NOT NULL)
);

CREATE TRIGGER trg_discount_request_updated BEFORE UPDATE ON discount_request
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE discount_request_level (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id      UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    request_id     UUID NOT NULL REFERENCES discount_request(id) ON DELETE CASCADE,
    level_number   INT NOT NULL,
    name           VARCHAR(100) NOT NULL,
    role_code      VARCHAR(60) NOT NULL,
    role_label     VARCHAR(150),
    status         VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    approver_id    UUID REFERENCES app_user(id),
    approver_name  VARCHAR(160),
    comment        TEXT,
    decided_at     TIMESTAMPTZ,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT uq_discount_request_level UNIQUE (request_id, level_number),
    CONSTRAINT ck_discount_request_level_status
        CHECK (status IN ('PENDING','APPROVED','REJECTED','SKIPPED'))
);

CREATE TRIGGER trg_discount_request_level_updated BEFORE UPDATE ON discount_request_level
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX ix_discount_request_queue
    ON discount_request(school_id, status, current_level, created_at DESC);
CREATE INDEX ix_discount_request_student
    ON discount_request(student_id, created_at DESC);
CREATE INDEX ix_discount_request_level_role
    ON discount_request_level(role_code, status);

ALTER TABLE discount_request ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_request FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON discount_request
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE discount_request_level ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_request_level FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON discount_request_level
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

COMMENT ON TABLE discount_request IS
    'Scolarité : demandes de réduction, validées niveau par niveau par des profils dédiés.';
COMMENT ON COLUMN discount_request.computed_amount IS
    'Montant de la réduction calculé sur le dû de l''année, figé à la création.';
COMMENT ON TABLE discount_request_level IS
    'Un palier de validation : un profil (rôle) doit l''approuver avant le suivant.';
