-- =====================================================================
-- V40 - Profils d'acces personnalises, isoles par etablissement
-- =====================================================================

ALTER TABLE app_role
    ADD COLUMN school_id UUID REFERENCES school(id) ON DELETE CASCADE;

ALTER TABLE app_role DROP CONSTRAINT uq_app_role_code;

-- Les profils fournis par EduOps gardent un code global unique. Deux ecoles
-- peuvent en revanche employer le meme code pour leurs profils locaux.
CREATE UNIQUE INDEX uq_app_role_system_code
    ON app_role (upper(code))
    WHERE school_id IS NULL;

CREATE UNIQUE INDEX uq_app_role_school_code
    ON app_role (school_id, upper(code))
    WHERE school_id IS NOT NULL;

ALTER TABLE app_role
    ADD CONSTRAINT ck_app_role_owner CHECK (
        (system_role = TRUE AND school_id IS NULL)
        OR (system_role = FALSE AND school_id IS NOT NULL)
    );

-- Les profils systeme sont lisibles par tous les tenants authentifies. Un
-- profil personnalise n'est visible et modifiable que par son ecole. Le bypass
-- reste necessaire a l'authentification, qui charge les droits avant de poser
-- le contexte tenant.
ALTER TABLE app_role ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_role FORCE ROW LEVEL SECURITY;

CREATE POLICY app_role_select ON app_role FOR SELECT
    USING (
        tenant_bypass_active()
        OR (current_school_id() IS NOT NULL
            AND (system_role = TRUE OR school_id = current_school_id()))
    );

CREATE POLICY app_role_insert ON app_role FOR INSERT
    WITH CHECK (
        tenant_bypass_active()
        OR (system_role = FALSE AND tenant_allows(school_id))
    );

CREATE POLICY app_role_update ON app_role FOR UPDATE
    USING (
        tenant_bypass_active()
        OR (system_role = FALSE AND tenant_allows(school_id))
    )
    WITH CHECK (
        tenant_bypass_active()
        OR (system_role = FALSE AND tenant_allows(school_id))
    );

CREATE POLICY app_role_delete ON app_role FOR DELETE
    USING (
        tenant_bypass_active()
        OR (system_role = FALSE AND tenant_allows(school_id))
    );

CREATE INDEX ix_app_role_school ON app_role(school_id)
    WHERE school_id IS NOT NULL;

COMMENT ON COLUMN app_role.school_id IS
    'NULL for protected system profiles; owning tenant for custom profiles.';
