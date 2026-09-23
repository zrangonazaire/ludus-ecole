-- =====================================================================
-- V52 - Circuits de validation persistants + apparence établissement
--
-- Les circuits (code + nom + N niveaux ordonnés, membres valideurs nommés,
-- mode Tous/Un seul) vivaient dans le localStorage du navigateur : perdus au
-- changement de poste, invisibles aux autres administrateurs. Ils deviennent
-- des tables cloisonnées par établissement (RLS), comme discount_request.
--
-- L'apparence (couleur, taille de police) vit dans school.settings, colonne
-- JSONB déjà prévue pour les réglages silencieux (cf. V4 + document layout),
-- sans nouvelle table ni migration de colonnes.
-- =====================================================================

DO $$ BEGIN
    CREATE TYPE approval_mode AS ENUM ('ALL','ONE');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE approval_circuit (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id     UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    code          VARCHAR(20) NOT NULL,
    name          VARCHAR(150) NOT NULL,
    usage         VARCHAR(30) NOT NULL DEFAULT 'DISCOUNT',
    created_by    UUID REFERENCES app_user(id),
    version       BIGINT NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT uq_approval_circuit_code UNIQUE (school_id, code),
    CONSTRAINT ck_approval_circuit_code CHECK (code ~ '^[A-Z0-9_-]{2,20}$')
);

CREATE TRIGGER trg_approval_circuit_updated BEFORE UPDATE ON approval_circuit
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE approval_circuit_level (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id      UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    circuit_id     UUID NOT NULL REFERENCES approval_circuit(id) ON DELETE CASCADE,
    level_number   INT NOT NULL,
    code           VARCHAR(20) NOT NULL,
    approval_mode  approval_mode NOT NULL DEFAULT 'ALL',
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT uq_approval_circuit_level UNIQUE (circuit_id, level_number),
    CONSTRAINT ck_approval_circuit_level_number CHECK (level_number BETWEEN 1 AND 5),
    CONSTRAINT ck_approval_circuit_level_code CHECK (code ~ '^[A-Z0-9_-]{2,20}$')
);

CREATE TRIGGER trg_approval_circuit_level_updated BEFORE UPDATE ON approval_circuit_level
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE approval_circuit_level_member (
    level_id   UUID NOT NULL REFERENCES approval_circuit_level(id) ON DELETE CASCADE,
    user_id    UUID NOT NULL REFERENCES app_user(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT pk_approval_circuit_level_member PRIMARY KEY (level_id, user_id)
);

CREATE INDEX ix_approval_circuit_school ON approval_circuit(school_id, code);
CREATE INDEX ix_approval_circuit_level_circuit
    ON approval_circuit_level(circuit_id, level_number);

ALTER TABLE approval_circuit ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_circuit FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON approval_circuit
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE approval_circuit_level ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_circuit_level FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON approval_circuit_level
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE approval_circuit_level_member ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_circuit_level_member FORCE ROW LEVEL SECURITY;
-- Les membres suivent le cloisonnement de leur niveau : un locataire ne voit
-- que les lignes jointes à un niveau de son établissement.
CREATE POLICY tenant_isolation ON approval_circuit_level_member
    USING (EXISTS (
        SELECT 1 FROM approval_circuit_level l
        WHERE l.id = approval_circuit_level_member.level_id
          AND tenant_allows(l.school_id)))
    WITH CHECK (EXISTS (
        SELECT 1 FROM approval_circuit_level l
        WHERE l.id = approval_circuit_level_member.level_id
          AND tenant_allows(l.school_id)));

COMMENT ON TABLE approval_circuit IS
    'Circuits de validation nommés (ex. VAL-ADM) : code unique par établissement, N niveaux ordonnés.';
COMMENT ON TABLE approval_circuit_level IS
    'Un niveau hiérarchique : code, mode Tous/Un seul. Seul le dernier est effectif.';
COMMENT ON TABLE approval_circuit_level_member IS
    'Valideurs nommés d''un niveau : sans membre, la demande ne peut pas avancer.';
