-- =====================================================================
-- V3 - Security: users, roles, permissions, refresh tokens, idempotency
-- =====================================================================

CREATE TABLE app_user (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username                VARCHAR(120) NOT NULL,
    email                   VARCHAR(180) NOT NULL,
    password_hash           VARCHAR(255) NOT NULL,
    first_name              VARCHAR(120) NOT NULL,
    last_name               VARCHAR(120) NOT NULL,
    phone                   VARCHAR(40),
    status                  user_status NOT NULL DEFAULT 'PENDING',
    must_change_password    BOOLEAN NOT NULL DEFAULT FALSE,
    failed_login_attempts   INTEGER NOT NULL DEFAULT 0,
    locked_until            TIMESTAMPTZ,
    last_login_at           TIMESTAMPTZ,
    password_changed_at     TIMESTAMPTZ,
    preferred_locale        VARCHAR(10) NOT NULL DEFAULT 'fr',
    -- optional links to the business identity behind the account
    school_id               UUID,
    version                 BIGINT NOT NULL DEFAULT 0,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by              UUID,
    updated_by              UUID,
    CONSTRAINT uq_app_user_username UNIQUE (username),
    CONSTRAINT uq_app_user_email    UNIQUE (email),
    CONSTRAINT ck_app_user_email    CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
    CONSTRAINT ck_app_user_attempts CHECK (failed_login_attempts >= 0)
);
CREATE TRIGGER trg_app_user_updated BEFORE UPDATE ON app_user
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE app_role (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code         VARCHAR(60)  NOT NULL,
    label        VARCHAR(150) NOT NULL,
    description  TEXT,
    system_role  BOOLEAN NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_app_role_code UNIQUE (code)
);
CREATE TRIGGER trg_app_role_updated BEFORE UPDATE ON app_role
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE app_permission (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code        VARCHAR(80)  NOT NULL,
    label       VARCHAR(150) NOT NULL,
    module      VARCHAR(60)  NOT NULL,
    description TEXT,
    CONSTRAINT uq_app_permission_code UNIQUE (code)
);

CREATE TABLE app_role_permission (
    role_id       UUID NOT NULL REFERENCES app_role(id)       ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES app_permission(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE app_user_role (
    user_id     UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
    role_id     UUID NOT NULL REFERENCES app_role(id) ON DELETE CASCADE,
    granted_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    granted_by  UUID REFERENCES app_user(id),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE refresh_token (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
    token_hash  VARCHAR(128) NOT NULL,
    issued_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at  TIMESTAMPTZ NOT NULL,
    revoked_at  TIMESTAMPTZ,
    user_agent  VARCHAR(255),
    ip_address  VARCHAR(64),
    CONSTRAINT uq_refresh_token_hash UNIQUE (token_hash),
    CONSTRAINT ck_refresh_token_dates CHECK (expires_at > issued_at)
);
CREATE INDEX ix_refresh_token_user ON refresh_token(user_id) WHERE revoked_at IS NULL;

CREATE TABLE password_reset_token (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
    token_hash VARCHAR(128) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at    TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_password_reset_hash UNIQUE (token_hash)
);

-- ---------------------------------------------------------------------
-- Idempotency registry: guarantees replayable critical operations
-- (payments, enrollments, imports, offline mobile actions) execute once.
-- ---------------------------------------------------------------------
CREATE TABLE idempotency_record (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    idempotency_key VARCHAR(120) NOT NULL,
    scope           VARCHAR(80)  NOT NULL,
    request_hash    VARCHAR(128) NOT NULL,
    resource_type   VARCHAR(80),
    resource_id     UUID,
    response_body   JSONB,
    http_status     INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at      TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '30 days',
    CONSTRAINT uq_idempotency UNIQUE (scope, idempotency_key)
);
CREATE INDEX ix_idempotency_expires ON idempotency_record(expires_at);

CREATE INDEX ix_app_user_status ON app_user(status);
CREATE INDEX ix_app_user_email_lower ON app_user(lower(email));
