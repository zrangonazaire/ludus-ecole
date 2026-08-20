-- =====================================================================
-- V27 - Audit trail (rule 12: every critical operation is audited)
-- =====================================================================

CREATE TABLE audit_log (
    id             BIGSERIAL PRIMARY KEY,
    correlation_id UUID,
    request_id     UUID,
    user_id        UUID REFERENCES app_user(id) ON DELETE SET NULL,
    username       VARCHAR(120),
    action         audit_action NOT NULL,
    entity_type    VARCHAR(80)  NOT NULL,
    entity_id      UUID,
    entity_label   VARCHAR(200),
    old_value      JSONB,
    new_value      JSONB,
    changed_fields TEXT[],
    reason         TEXT,
    http_method    VARCHAR(10),
    endpoint       VARCHAR(255),
    ip_address     VARCHAR(64),
    user_agent     VARCHAR(255),
    school_id      UUID,
    academic_year_id UUID,
    success        BOOLEAN NOT NULL DEFAULT TRUE,
    error_code     VARCHAR(80),
    occurred_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ix_audit_entity      ON audit_log(entity_type, entity_id, occurred_at DESC);
CREATE INDEX ix_audit_user        ON audit_log(user_id, occurred_at DESC);
CREATE INDEX ix_audit_occurred    ON audit_log(occurred_at DESC);
CREATE INDEX ix_audit_correlation ON audit_log(correlation_id);
CREATE INDEX ix_audit_action      ON audit_log(action, occurred_at DESC);

-- Audit rows are append-only.
CREATE OR REPLACE FUNCTION audit_log_is_append_only()
    RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
    RAISE EXCEPTION 'audit_log is append-only' USING ERRCODE = 'check_violation';
END;
$$;
CREATE TRIGGER trg_audit_log_no_update BEFORE UPDATE OR DELETE ON audit_log
    FOR EACH ROW EXECUTE FUNCTION audit_log_is_append_only();

-- Sensitive read tracking (section 82: journalisation des consultations).
CREATE TABLE sensitive_access_log (
    id            BIGSERIAL PRIMARY KEY,
    user_id       UUID REFERENCES app_user(id) ON DELETE SET NULL,
    entity_type   VARCHAR(80) NOT NULL,
    entity_id     UUID NOT NULL,
    purpose       VARCHAR(150),
    ip_address    VARCHAR(64),
    accessed_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ix_sensitive_access ON sensitive_access_log(entity_type, entity_id, accessed_at DESC);
