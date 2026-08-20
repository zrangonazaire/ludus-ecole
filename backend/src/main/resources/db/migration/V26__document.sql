-- =====================================================================
-- V26 - Official documents. Each one carries a unique identifier and a
--       verification code usable through a QR code (section 74).
-- =====================================================================

CREATE TABLE document (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id        UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    document_type    document_type NOT NULL,
    document_number  VARCHAR(60) NOT NULL,
    verification_code VARCHAR(60) NOT NULL,
    title            VARCHAR(200) NOT NULL,
    student_id       UUID REFERENCES student(id),
    enrollment_id    UUID REFERENCES enrollment(id),
    academic_year_id UUID REFERENCES academic_year(id),
    term_id          UUID REFERENCES term(id),
    related_entity   VARCHAR(80),
    related_entity_id UUID,
    file_url         VARCHAR(500),
    content_hash     VARCHAR(128),
    mime_type        VARCHAR(120) NOT NULL DEFAULT 'application/pdf',
    file_size_bytes  BIGINT,
    status           document_status NOT NULL DEFAULT 'DRAFT',
    issued_at        TIMESTAMPTZ,
    issued_by        UUID REFERENCES app_user(id),
    valid_until      DATE,
    revoked_at       TIMESTAMPTZ,
    revoke_reason    TEXT,
    metadata         JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_document_number       UNIQUE (document_number),
    CONSTRAINT uq_document_verification UNIQUE (verification_code),
    CONSTRAINT ck_document_size CHECK (file_size_bytes IS NULL OR file_size_bytes >= 0)
);
CREATE TRIGGER trg_document_updated BEFORE UPDATE ON document
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_document_student ON document(student_id, document_type, created_at DESC);
CREATE INDEX ix_document_type    ON document(school_id, document_type, status);
