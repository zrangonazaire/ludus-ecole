ALTER TABLE message_campaign
    ADD COLUMN collect_responses BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN response_question VARCHAR(500);

ALTER TABLE message_campaign
    ADD CONSTRAINT ck_campaign_response_question CHECK (
        (collect_responses = FALSE AND response_question IS NULL)
        OR (collect_responses = TRUE AND response_question IS NOT NULL));

CREATE TABLE message_response_request (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES message_campaign(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL UNIQUE REFERENCES message_recipient(id) ON DELETE CASCADE,
    token_hash CHAR(64) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    answered_at TIMESTAMPTZ,
    answer TEXT,
    version BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_message_response_answer CHECK (
        (answered_at IS NULL AND answer IS NULL)
        OR (answered_at IS NOT NULL AND answer IS NOT NULL))
);
CREATE TRIGGER trg_message_response_request_updated BEFORE UPDATE ON message_response_request
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_message_response_request_open ON message_response_request(expires_at)
    WHERE answered_at IS NULL;
CREATE INDEX ix_message_response_request_campaign ON message_response_request(campaign_id, answered_at);

ALTER TABLE message_response_request ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_response_request FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON message_response_request
    USING (EXISTS (SELECT 1 FROM message_campaign c
        WHERE c.id = message_response_request.campaign_id AND tenant_allows(c.school_id)))
    WITH CHECK (EXISTS (SELECT 1 FROM message_campaign c
        WHERE c.id = message_response_request.campaign_id AND tenant_allows(c.school_id)));
