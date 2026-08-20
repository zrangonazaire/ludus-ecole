-- =====================================================================
-- V20 - Class councils and promotion decisions
-- =====================================================================

CREATE TABLE class_council (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    classroom_id     UUID NOT NULL REFERENCES classroom(id)     ON DELETE RESTRICT,
    term_id          UUID NOT NULL REFERENCES term(id)          ON DELETE RESTRICT,
    academic_year_id UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    meeting_date     DATE NOT NULL,
    start_time       TIME,
    end_time         TIME,
    chaired_by       UUID REFERENCES app_user(id),
    location         VARCHAR(150),
    status           council_status NOT NULL DEFAULT 'PLANNED',
    class_average    NUMERIC(6,3),
    success_rate     NUMERIC(5,2),
    remarks          TEXT,
    minutes_url      VARCHAR(500),
    closed_at        TIMESTAMPTZ,
    closed_by        UUID REFERENCES app_user(id),
    version          BIGINT NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_class_council UNIQUE (classroom_id, term_id),
    CONSTRAINT ck_class_council_rate CHECK (success_rate IS NULL OR (success_rate >= 0 AND success_rate <= 100))
);
CREATE TRIGGER trg_class_council_updated BEFORE UPDATE ON class_council
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE class_council_participant (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    council_id    UUID NOT NULL REFERENCES class_council(id) ON DELETE CASCADE,
    teacher_id    UUID REFERENCES teacher(id),
    staff_id      UUID REFERENCES staff(id),
    guardian_id   UUID REFERENCES guardian(id),
    role_label    VARCHAR(120) NOT NULL,
    present       BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT ck_council_participant_identity
        CHECK (num_nonnulls(teacher_id, staff_id, guardian_id) = 1)
);
CREATE INDEX ix_council_participant ON class_council_participant(council_id);

CREATE TABLE promotion_decision (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    council_id         UUID REFERENCES class_council(id) ON DELETE SET NULL,
    student_id         UUID NOT NULL REFERENCES student(id)       ON DELETE RESTRICT,
    enrollment_id      UUID NOT NULL REFERENCES enrollment(id)    ON DELETE RESTRICT,
    academic_year_id   UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    from_level_id      UUID NOT NULL REFERENCES level(id),
    to_level_id        UUID REFERENCES level(id),
    decision           promotion_decision_type NOT NULL DEFAULT 'PENDING_DECISION',
    annual_average     NUMERIC(6,3),
    justification      TEXT,
    orientation_advice VARCHAR(255),
    decided_at         TIMESTAMPTZ,
    decided_by         UUID REFERENCES app_user(id),
    applied_at         TIMESTAMPTZ,   -- when the re-enrollment was created
    version            BIGINT NOT NULL DEFAULT 0,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_promotion_decision UNIQUE (enrollment_id),
    CONSTRAINT ck_promotion_final
        CHECK (decision = 'PENDING_DECISION' OR decided_at IS NOT NULL)
);
CREATE TRIGGER trg_promotion_decision_updated BEFORE UPDATE ON promotion_decision
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_promotion_decision_year ON promotion_decision(academic_year_id, decision);
