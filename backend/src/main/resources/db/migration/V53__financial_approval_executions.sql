-- A circuit is copied at submission: editing or deleting the template cannot
-- alter the authorizations of an operation already in flight.
CREATE TABLE approval_execution (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES school(id),
    resource_id UUID NOT NULL,
    operation VARCHAR(40) NOT NULL,
    label VARCHAR(255) NOT NULL,
    circuit_name VARCHAR(255) NOT NULL,
    created_by UUID NOT NULL REFERENCES app_user(id),
    status VARCHAR(20) NOT NULL DEFAULT 'SUBMITTED'
        CHECK (status IN ('SUBMITTED','APPROVED','REJECTED','EFFECTIVE')),
    current_level INT NOT NULL DEFAULT 1 CHECK (current_level BETWEEN 1 AND 5),
    stages JSONB NOT NULL,
    payload JSONB NOT NULL,
    effective_at TIMESTAMPTZ,
    version BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (school_id, resource_id)
);
CREATE INDEX ix_approval_execution_school ON approval_execution(school_id, created_at DESC);
CREATE TRIGGER trg_approval_execution_updated BEFORE UPDATE ON approval_execution
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
ALTER TABLE approval_execution ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_execution FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON approval_execution
    USING (tenant_allows(school_id)) WITH CHECK (tenant_allows(school_id));
ALTER TABLE discount_request ADD COLUMN fee_type_id UUID REFERENCES fee_type(id);
