-- =====================================================================
-- V22 - School finance: fee types, schedules, student fees, invoices,
--       discounts and scholarships.
-- Rule 18: money is NUMERIC(15,2). float/double are forbidden.
-- =====================================================================

CREATE TABLE fee_type (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id     UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    code          VARCHAR(40)  NOT NULL,
    name          VARCHAR(150) NOT NULL,
    category      fee_category NOT NULL DEFAULT 'OTHER',
    recurrence    fee_recurrence NOT NULL DEFAULT 'ANNUAL',
    is_mandatory  BOOLEAN NOT NULL DEFAULT TRUE,
    refundable    BOOLEAN NOT NULL DEFAULT FALSE,
    description   TEXT,
    status        common_status NOT NULL DEFAULT 'ACTIVE',
    version       BIGINT NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_fee_type_code UNIQUE (school_id, code)
);
CREATE TRIGGER trg_fee_type_updated BEFORE UPDATE ON fee_type
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- The published price list: how much a level costs for a given year.
CREATE TABLE fee_schedule (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year_id UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    fee_type_id      UUID NOT NULL REFERENCES fee_type(id)      ON DELETE RESTRICT,
    level_id         UUID REFERENCES level(id),      -- NULL = all levels
    cycle_id         UUID REFERENCES cycle(id),
    campus_id        UUID REFERENCES campus(id),
    label            VARCHAR(150) NOT NULL,
    total_amount     NUMERIC(15,2) NOT NULL,
    currency         CHAR(3) NOT NULL DEFAULT 'XOF',
    applies_to_new_students BOOLEAN NOT NULL DEFAULT TRUE,
    applies_to_returning_students BOOLEAN NOT NULL DEFAULT TRUE,
    status           common_status NOT NULL DEFAULT 'ACTIVE',
    version          BIGINT NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_fee_schedule_amount CHECK (total_amount >= 0)
);
CREATE TRIGGER trg_fee_schedule_updated BEFORE UPDATE ON fee_schedule
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE UNIQUE INDEX uq_fee_schedule
    ON fee_schedule(academic_year_id, fee_type_id,
                    coalesce(level_id,  '00000000-0000-0000-0000-000000000000'::uuid),
                    coalesce(campus_id, '00000000-0000-0000-0000-000000000000'::uuid))
    WHERE status = 'ACTIVE';

-- Instalment plan attached to a fee schedule: 3 x 200 000 FCFA.
CREATE TABLE fee_schedule_instalment (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fee_schedule_id UUID NOT NULL REFERENCES fee_schedule(id) ON DELETE CASCADE,
    sequence        INTEGER NOT NULL,
    label           VARCHAR(120) NOT NULL,
    amount          NUMERIC(15,2) NOT NULL,
    due_date        DATE NOT NULL,
    grace_days      INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT uq_fee_instalment UNIQUE (fee_schedule_id, sequence),
    CONSTRAINT ck_fee_instalment_amount CHECK (amount > 0),
    CONSTRAINT ck_fee_instalment_grace  CHECK (grace_days >= 0)
);
CREATE INDEX ix_fee_instalment ON fee_schedule_instalment(fee_schedule_id, sequence);

CREATE TABLE discount (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id      UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    code           VARCHAR(40)  NOT NULL,
    label          VARCHAR(150) NOT NULL,
    discount_type  discount_type NOT NULL DEFAULT 'PERCENTAGE',
    value          NUMERIC(15,2) NOT NULL,
    max_amount     NUMERIC(15,2),
    reason         TEXT,
    status         common_status NOT NULL DEFAULT 'ACTIVE',
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_discount_code UNIQUE (school_id, code),
    CONSTRAINT ck_discount_value CHECK (value > 0),
    CONSTRAINT ck_discount_percentage CHECK (discount_type <> 'PERCENTAGE' OR value <= 100)
);
CREATE TRIGGER trg_discount_updated BEFORE UPDATE ON discount
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE scholarship (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id        UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    student_id       UUID NOT NULL REFERENCES student(id) ON DELETE RESTRICT,
    academic_year_id UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    label            VARCHAR(150) NOT NULL,
    sponsor          VARCHAR(150),
    coverage_type    discount_type NOT NULL DEFAULT 'PERCENTAGE',
    coverage_value   NUMERIC(15,2) NOT NULL,
    status           scholarship_status NOT NULL DEFAULT 'REQUESTED',
    granted_at       TIMESTAMPTZ,
    granted_by       UUID REFERENCES app_user(id),
    revoked_at       TIMESTAMPTZ,
    revoke_reason    TEXT,
    version          BIGINT NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_scholarship UNIQUE (student_id, academic_year_id, label),
    CONSTRAINT ck_scholarship_value CHECK (coverage_value > 0),
    CONSTRAINT ck_scholarship_percentage CHECK (coverage_type <> 'PERCENTAGE' OR coverage_value <= 100)
);
CREATE TRIGGER trg_scholarship_updated BEFORE UPDATE ON scholarship
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- What a specific student actually owes, per instalment.
CREATE TABLE student_fee (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id        UUID NOT NULL REFERENCES student(id)       ON DELETE RESTRICT,
    enrollment_id     UUID NOT NULL REFERENCES enrollment(id)    ON DELETE RESTRICT,
    academic_year_id  UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    fee_type_id       UUID NOT NULL REFERENCES fee_type(id)      ON DELETE RESTRICT,
    fee_schedule_id   UUID REFERENCES fee_schedule(id),
    instalment_id     UUID REFERENCES fee_schedule_instalment(id),
    discount_id       UUID REFERENCES discount(id),
    scholarship_id    UUID REFERENCES scholarship(id),
    label             VARCHAR(150) NOT NULL,
    sequence          INTEGER NOT NULL DEFAULT 1,
    gross_amount      NUMERIC(15,2) NOT NULL,
    discount_amount   NUMERIC(15,2) NOT NULL DEFAULT 0,
    amount_due        NUMERIC(15,2) NOT NULL,
    -- amount_paid is maintained by the payment allocation transaction
    amount_paid       NUMERIC(15,2) NOT NULL DEFAULT 0,
    amount_remaining  NUMERIC(15,2) GENERATED ALWAYS AS (amount_due - amount_paid) STORED,
    currency          CHAR(3) NOT NULL DEFAULT 'XOF',
    due_date          DATE NOT NULL,
    status            student_fee_status NOT NULL DEFAULT 'DUE',
    waived_reason     TEXT,
    waived_by         UUID REFERENCES app_user(id),
    version           BIGINT NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_student_fee_amounts CHECK (
        gross_amount >= 0 AND discount_amount >= 0 AND amount_due >= 0
        AND amount_paid >= 0 AND amount_paid <= amount_due
        AND amount_due = gross_amount - discount_amount)
);
CREATE TRIGGER trg_student_fee_updated BEFORE UPDATE ON student_fee
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_student_fee_student   ON student_fee(student_id, academic_year_id);
CREATE INDEX ix_student_fee_enrollment ON student_fee(enrollment_id);
CREATE INDEX ix_student_fee_outstanding ON student_fee(due_date, status)
    WHERE status IN ('DUE','PARTIALLY_PAID','OVERDUE');

CREATE TABLE invoice (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id        UUID NOT NULL REFERENCES student(id)       ON DELETE RESTRICT,
    enrollment_id     UUID NOT NULL REFERENCES enrollment(id)    ON DELETE RESTRICT,
    academic_year_id  UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    guardian_id       UUID REFERENCES guardian(id),
    invoice_number    VARCHAR(40) NOT NULL,
    issue_date        DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date          DATE NOT NULL,
    total_amount      NUMERIC(15,2) NOT NULL DEFAULT 0,
    paid_amount       NUMERIC(15,2) NOT NULL DEFAULT 0,
    remaining_amount  NUMERIC(15,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
    currency          CHAR(3) NOT NULL DEFAULT 'XOF',
    status            invoice_status NOT NULL DEFAULT 'DRAFT',
    cancelled_at      TIMESTAMPTZ,
    cancellation_reason TEXT,
    pdf_url           VARCHAR(500),
    version           BIGINT NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_invoice_number UNIQUE (invoice_number),
    CONSTRAINT ck_invoice_amounts CHECK (total_amount >= 0 AND paid_amount >= 0 AND paid_amount <= total_amount)
);
CREATE TRIGGER trg_invoice_updated BEFORE UPDATE ON invoice
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_invoice_student ON invoice(student_id, academic_year_id);
CREATE INDEX ix_invoice_overdue ON invoice(due_date) WHERE status IN ('ISSUED','PARTIALLY_PAID','OVERDUE');

CREATE TABLE invoice_line (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id     UUID NOT NULL REFERENCES invoice(id) ON DELETE CASCADE,
    student_fee_id UUID REFERENCES student_fee(id),
    fee_type_id    UUID NOT NULL REFERENCES fee_type(id),
    label          VARCHAR(200) NOT NULL,
    quantity       NUMERIC(9,2) NOT NULL DEFAULT 1,
    unit_amount    NUMERIC(15,2) NOT NULL,
    discount_amount NUMERIC(15,2) NOT NULL DEFAULT 0,
    line_total     NUMERIC(15,2) NOT NULL,
    display_order  INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT ck_invoice_line CHECK (
        quantity > 0 AND unit_amount >= 0 AND discount_amount >= 0
        AND line_total = (quantity * unit_amount) - discount_amount)
);
CREATE INDEX ix_invoice_line ON invoice_line(invoice_id, display_order);
