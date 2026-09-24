CREATE TABLE supply_list (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES school(id),
    level_id UUID NOT NULL REFERENCES level(id),
    academic_year_id UUID NOT NULL REFERENCES academic_year(id),
    title VARCHAR(160) NOT NULL CHECK (length(trim(title)) > 0),
    notes VARCHAR(4000) NOT NULL DEFAULT '',
    items JSONB NOT NULL CHECK (jsonb_typeof(items) = 'array' AND jsonb_array_length(items) BETWEEN 1 AND 200),
    version BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (school_id, level_id, academic_year_id)
);
CREATE TRIGGER trg_supply_list_updated BEFORE UPDATE ON supply_list
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
ALTER TABLE supply_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE supply_list FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON supply_list
    USING (tenant_allows(school_id)) WITH CHECK (tenant_allows(school_id));
