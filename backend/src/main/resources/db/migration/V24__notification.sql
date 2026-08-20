-- =====================================================================
-- V24 - Notifications (in-app, email, SMS, push)
-- =====================================================================

CREATE TABLE notification (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id       UUID NOT NULL REFERENCES school(id) ON DELETE CASCADE,
    recipient_user_id UUID REFERENCES app_user(id) ON DELETE CASCADE,
    recipient_email VARCHAR(180),
    recipient_phone VARCHAR(40),
    channel         notification_channel NOT NULL DEFAULT 'IN_APP',
    category        VARCHAR(60) NOT NULL,     -- ENROLLMENT, ABSENCE, GRADE, PAYMENT...
    title           VARCHAR(200) NOT NULL,
    body            TEXT NOT NULL,
    action_url      VARCHAR(500),
    payload         JSONB NOT NULL DEFAULT '{}'::jsonb,
    -- optional business anchors used for deep links and filtering
    student_id      UUID REFERENCES student(id)   ON DELETE CASCADE,
    classroom_id    UUID REFERENCES classroom(id) ON DELETE CASCADE,
    status          notification_status NOT NULL DEFAULT 'PENDING',
    scheduled_at    TIMESTAMPTZ,
    sent_at         TIMESTAMPTZ,
    read_at         TIMESTAMPTZ,
    failure_reason  TEXT,
    retry_count     INTEGER NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_notification_recipient
        CHECK (recipient_user_id IS NOT NULL OR recipient_email IS NOT NULL OR recipient_phone IS NOT NULL),
    CONSTRAINT ck_notification_retry CHECK (retry_count >= 0)
);
CREATE TRIGGER trg_notification_updated BEFORE UPDATE ON notification
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_notification_recipient ON notification(recipient_user_id, created_at DESC);
CREATE INDEX ix_notification_unread    ON notification(recipient_user_id)
    WHERE read_at IS NULL AND channel = 'IN_APP';
CREATE INDEX ix_notification_pending   ON notification(scheduled_at) WHERE status = 'PENDING';

CREATE TABLE notification_template (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id    UUID REFERENCES school(id) ON DELETE CASCADE,
    code         VARCHAR(60) NOT NULL,
    channel      notification_channel NOT NULL,
    locale       VARCHAR(10) NOT NULL DEFAULT 'fr',
    subject      VARCHAR(200),
    body_template TEXT NOT NULL,
    active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Global templates (school_id NULL) coexist with per-school overrides.
CREATE UNIQUE INDEX uq_notification_template ON notification_template(
    coalesce(school_id, '00000000-0000-0000-0000-000000000000'::uuid), code, channel, locale);
CREATE TRIGGER trg_notification_template_updated BEFORE UPDATE ON notification_template
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE announcement (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id     UUID NOT NULL REFERENCES school(id) ON DELETE CASCADE,
    title         VARCHAR(200) NOT NULL,
    body          TEXT NOT NULL,
    audience      VARCHAR(60) NOT NULL DEFAULT 'ALL',   -- ALL / TEACHERS / PARENTS / STUDENTS
    classroom_id  UUID REFERENCES classroom(id),
    level_id      UUID REFERENCES level(id),
    publish_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at    TIMESTAMPTZ,
    published     BOOLEAN NOT NULL DEFAULT FALSE,
    published_by  UUID REFERENCES app_user(id),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_announcement_dates CHECK (expires_at IS NULL OR expires_at > publish_at)
);
CREATE TRIGGER trg_announcement_updated BEFORE UPDATE ON announcement
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_announcement_active ON announcement(school_id, publish_at DESC) WHERE published;
