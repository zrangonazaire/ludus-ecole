-- =====================================================================
-- V28 - Domain events (transactional outbox)
-- Events are written inside the business transaction, then dispatched to
-- WebSocket / notifications / reporting by a background relay.
-- =====================================================================

CREATE TABLE domain_event (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type     VARCHAR(80)  NOT NULL,   -- StudentEnrolledEvent, PaymentReceivedEvent...
    aggregate_type VARCHAR(80)  NOT NULL,
    aggregate_id   UUID         NOT NULL,
    school_id      UUID,
    academic_year_id UUID,
    classroom_id   UUID,
    student_id     UUID,
    payload        JSONB NOT NULL,
    correlation_id UUID,
    triggered_by   UUID REFERENCES app_user(id),
    occurred_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    status         outbox_status NOT NULL DEFAULT 'PENDING',
    attempts       INTEGER NOT NULL DEFAULT 0,
    next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    processed_at   TIMESTAMPTZ,
    last_error     TEXT,
    CONSTRAINT ck_domain_event_attempts CHECK (attempts >= 0)
);
CREATE INDEX ix_domain_event_dispatch ON domain_event(next_attempt_at)
    WHERE status IN ('PENDING','FAILED');
CREATE INDEX ix_domain_event_aggregate ON domain_event(aggregate_type, aggregate_id, occurred_at DESC);
CREATE INDEX ix_domain_event_type ON domain_event(event_type, occurred_at DESC);

-- Offline-first queue coming from the PWA (section 80).
CREATE TABLE offline_operation (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operation_id   VARCHAR(120) NOT NULL,
    user_id        UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
    operation_type VARCHAR(80) NOT NULL,
    payload        JSONB NOT NULL,
    client_created_at TIMESTAMPTZ NOT NULL,
    received_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    status         outbox_status NOT NULL DEFAULT 'PENDING',
    server_result  JSONB,
    error_code     VARCHAR(80),
    processed_at   TIMESTAMPTZ,
    CONSTRAINT uq_offline_operation UNIQUE (operation_id)
);
CREATE INDEX ix_offline_operation_pending ON offline_operation(status, received_at);

-- Import batches (section 72). Nothing is inserted before validation.
CREATE TABLE import_batch (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id      UUID NOT NULL REFERENCES school(id) ON DELETE CASCADE,
    import_type    VARCHAR(60) NOT NULL,   -- STUDENT, GUARDIAN, TEACHER, GRADE...
    file_name      VARCHAR(255) NOT NULL,
    file_hash      VARCHAR(128),
    total_rows     INTEGER NOT NULL DEFAULT 0,
    valid_rows     INTEGER NOT NULL DEFAULT 0,
    invalid_rows   INTEGER NOT NULL DEFAULT 0,
    duplicate_rows INTEGER NOT NULL DEFAULT 0,
    imported_rows  INTEGER NOT NULL DEFAULT 0,
    status         VARCHAR(30) NOT NULL DEFAULT 'UPLOADED',  -- UPLOADED/PARSED/VALIDATED/PREVIEWED/CONFIRMED/IMPORTED/REJECTED
    preview        JSONB,
    errors         JSONB,
    uploaded_by    UUID REFERENCES app_user(id),
    uploaded_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    confirmed_by   UUID REFERENCES app_user(id),
    confirmed_at   TIMESTAMPTZ,
    CONSTRAINT ck_import_batch_rows CHECK (
        total_rows >= 0 AND valid_rows >= 0 AND invalid_rows >= 0 AND imported_rows >= 0)
);
CREATE INDEX ix_import_batch ON import_batch(school_id, import_type, uploaded_at DESC);
