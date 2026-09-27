-- Append-only operational history; payment promises never change the fee ledger.
CREATE TABLE collection_action (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES school(id),
    student_id UUID NOT NULL REFERENCES student(id),
    academic_year_id UUID NOT NULL REFERENCES academic_year(id),
    created_by UUID NOT NULL REFERENCES app_user(id),
    author_name VARCHAR(200) NOT NULL,
    channel VARCHAR(20) NOT NULL CHECK (channel IN ('PHONE','SMS','EMAIL','MEETING','NOTE')),
    note VARCHAR(2000) NOT NULL CHECK (length(trim(note)) > 0),
    next_contact_date DATE,
    promised_date DATE,
    promised_amount NUMERIC(15,2),
    version BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK ((promised_date IS NULL AND promised_amount IS NULL)
        OR (promised_date IS NOT NULL AND promised_amount IS NOT NULL AND promised_amount > 0))
);
CREATE INDEX collection_action_student_year ON collection_action(school_id, student_id, academic_year_id, created_at DESC);
ALTER TABLE collection_action ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_action FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON collection_action
    USING (tenant_allows(school_id)) WITH CHECK (tenant_allows(school_id));
