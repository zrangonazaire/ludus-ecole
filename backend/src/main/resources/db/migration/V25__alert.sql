-- =====================================================================
-- V25 - Operational alerts surfaced on the dashboard
-- =====================================================================

CREATE TABLE alert (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id        UUID NOT NULL REFERENCES school(id) ON DELETE CASCADE,
    academic_year_id UUID REFERENCES academic_year(id)   ON DELETE CASCADE,
    alert_type       alert_type NOT NULL,
    severity         alert_severity NOT NULL DEFAULT 'WARNING',
    title            VARCHAR(200) NOT NULL,
    message          TEXT NOT NULL,
    student_id       UUID REFERENCES student(id)   ON DELETE CASCADE,
    classroom_id     UUID REFERENCES classroom(id) ON DELETE CASCADE,
    teacher_id       UUID REFERENCES teacher(id)   ON DELETE CASCADE,
    payload          JSONB NOT NULL DEFAULT '{}'::jsonb,
    -- deduplication key so the same condition does not spam the dashboard
    dedup_key        VARCHAR(200) NOT NULL,
    status           alert_status NOT NULL DEFAULT 'OPEN',
    acknowledged_at  TIMESTAMPTZ,
    acknowledged_by  UUID REFERENCES app_user(id),
    resolved_at      TIMESTAMPTZ,
    resolved_by      UUID REFERENCES app_user(id),
    resolution_note  TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_alert_updated BEFORE UPDATE ON alert
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE UNIQUE INDEX uq_alert_dedup ON alert(dedup_key) WHERE status IN ('OPEN','ACKNOWLEDGED');
CREATE INDEX ix_alert_open ON alert(school_id, severity, created_at DESC) WHERE status = 'OPEN';
CREATE INDEX ix_alert_student ON alert(student_id) WHERE status = 'OPEN';
