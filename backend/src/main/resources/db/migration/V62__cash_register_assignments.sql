CREATE TABLE cash_register (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    name VARCHAR(100) NOT NULL,
    cashier_user_id UUID NOT NULL REFERENCES app_user(id) ON DELETE RESTRICT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    version BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_cash_register_name UNIQUE (school_id, name),
    CONSTRAINT uq_cash_register_cashier UNIQUE (school_id, cashier_user_id)
);
CREATE TRIGGER trg_cash_register_updated BEFORE UPDATE ON cash_register
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

SELECT set_config('app.bypass_rls', 'on', true);

-- Preserve the old session ownership as a named register assignment.
INSERT INTO cash_register (school_id, name, cashier_user_id)
SELECT DISTINCT ON (s.school_id, s.cashier_user_id)
       s.school_id,
       'Caisse ' || trim(u.first_name || ' ' || u.last_name) || ' - ' || left(u.id::text, 8),
       s.cashier_user_id
FROM cash_session s
JOIN app_user u ON u.id = s.cashier_user_id
ORDER BY s.school_id, s.cashier_user_id, s.opened_at DESC;

ALTER TABLE cash_session ADD COLUMN cash_register_id UUID;
UPDATE cash_session s
SET cash_register_id = r.id
FROM cash_register r
WHERE r.school_id = s.school_id AND r.cashier_user_id = s.cashier_user_id;
ALTER TABLE cash_session ALTER COLUMN cash_register_id SET NOT NULL;
ALTER TABLE cash_session ADD CONSTRAINT fk_cash_session_register
    FOREIGN KEY (cash_register_id) REFERENCES cash_register(id) ON DELETE RESTRICT;
CREATE UNIQUE INDEX uq_cash_register_open_session
    ON cash_session(cash_register_id) WHERE status = 'OPEN';
CREATE INDEX ix_cash_session_register ON cash_session(cash_register_id, opened_at DESC);

ALTER TABLE cash_register ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_register FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON cash_register
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));
