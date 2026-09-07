-- A single durable queue for requests received from pupils' families.
CREATE TABLE family_request (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id       UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    student_id      UUID NOT NULL REFERENCES student(id) ON DELETE RESTRICT,
    reference       VARCHAR(40) NOT NULL,
    request_type    VARCHAR(40) NOT NULL,
    status          VARCHAR(30) NOT NULL DEFAULT 'NEW',
    priority        VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
    channel         VARCHAR(20) NOT NULL,
    subject         VARCHAR(200) NOT NULL,
    description     VARCHAR(2000),
    classroom_name  VARCHAR(160),
    guardian_name   VARCHAR(160) NOT NULL,
    guardian_phone  VARCHAR(40),
    assigned_to     VARCHAR(160),
    internal_note   VARCHAR(2000),
    submitted_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    due_at          TIMESTAMPTZ NOT NULL,
    completed_at    TIMESTAMPTZ,
    version         BIGINT NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by      UUID REFERENCES app_user(id),
    updated_by      UUID REFERENCES app_user(id),

    CONSTRAINT uq_family_request_reference UNIQUE (school_id, reference),
    CONSTRAINT ck_family_request_type CHECK (request_type IN (
        'SCHOOL_CERTIFICATE','ENROLLMENT_CERTIFICATE','REPORT_CARD_COPY',
        'TRANSCRIPT','TRANSFER_DOCUMENTS','PAYMENT_STATEMENT',
        'DATA_CORRECTION','APPOINTMENT','OTHER')),
    CONSTRAINT ck_family_request_status CHECK (status IN (
        'NEW','IN_PROGRESS','WAITING_FAMILY','READY','COMPLETED','REJECTED')),
    CONSTRAINT ck_family_request_priority CHECK (priority IN ('NORMAL','HIGH','URGENT')),
    CONSTRAINT ck_family_request_channel CHECK (channel IN ('PORTAL','EMAIL','PHONE','IN_PERSON')),
    CONSTRAINT ck_family_request_completed CHECK (
        status <> 'COMPLETED' OR completed_at IS NOT NULL)
);

CREATE TRIGGER trg_family_request_updated BEFORE UPDATE ON family_request
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX ix_family_request_queue
    ON family_request(school_id, status, priority, due_at, submitted_at DESC);
CREATE INDEX ix_family_request_student ON family_request(student_id, submitted_at DESC);

ALTER TABLE family_request ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_request FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON family_request
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

COMMENT ON TABLE family_request IS
    'Requests from families, tracked from first contact through completion.';
COMMENT ON COLUMN family_request.classroom_name IS
    'Class at submission time, kept as a snapshot so a later transfer does not rewrite history.';
