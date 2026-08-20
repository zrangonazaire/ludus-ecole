-- =====================================================================
-- V21 - Discipline: incidents and sanctions
-- =====================================================================

CREATE TABLE discipline_incident (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id       UUID NOT NULL REFERENCES student(id)       ON DELETE RESTRICT,
    enrollment_id    UUID REFERENCES enrollment(id),
    classroom_id     UUID NOT NULL REFERENCES classroom(id)     ON DELETE RESTRICT,
    academic_year_id UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    term_id          UUID REFERENCES term(id),
    reference        VARCHAR(40) NOT NULL,
    incident_type    incident_type NOT NULL,
    severity         incident_severity NOT NULL DEFAULT 'LOW',
    incident_date    DATE NOT NULL,
    incident_time    TIME,
    location         VARCHAR(150),
    description      TEXT NOT NULL,
    witnesses        TEXT,
    reported_by      UUID REFERENCES app_user(id),
    reported_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    status           incident_status NOT NULL DEFAULT 'REPORTED',
    guardian_informed BOOLEAN NOT NULL DEFAULT FALSE,
    guardian_informed_at TIMESTAMPTZ,
    closed_at        TIMESTAMPTZ,
    closed_by        UUID REFERENCES app_user(id),
    version          BIGINT NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_discipline_incident_reference UNIQUE (reference)
);
CREATE TRIGGER trg_discipline_incident_updated BEFORE UPDATE ON discipline_incident
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_discipline_student ON discipline_incident(student_id, incident_date DESC);
CREATE INDEX ix_discipline_open    ON discipline_incident(academic_year_id, status)
    WHERE status IN ('REPORTED','UNDER_REVIEW');

CREATE TABLE disciplinary_action (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    incident_id   UUID NOT NULL REFERENCES discipline_incident(id) ON DELETE CASCADE,
    student_id    UUID NOT NULL REFERENCES student(id) ON DELETE RESTRICT,
    action_type   disciplinary_action_type NOT NULL,
    description   TEXT NOT NULL,
    start_date    DATE,
    end_date      DATE,
    duration_days INTEGER,
    decided_by    UUID REFERENCES app_user(id),
    decided_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    executed      BOOLEAN NOT NULL DEFAULT FALSE,
    executed_at   TIMESTAMPTZ,
    document_url  VARCHAR(500),
    version       BIGINT NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_disciplinary_action_dates CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date),
    CONSTRAINT ck_disciplinary_action_days  CHECK (duration_days IS NULL OR duration_days > 0)
);
CREATE TRIGGER trg_disciplinary_action_updated BEFORE UPDATE ON disciplinary_action
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_disciplinary_action ON disciplinary_action(incident_id);
CREATE INDEX ix_disciplinary_student ON disciplinary_action(student_id, decided_at DESC);
