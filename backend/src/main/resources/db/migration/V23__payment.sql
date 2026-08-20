-- =====================================================================
-- V23 - Payments, allocations, receipts and cash sessions
-- Rule 7: a validated payment is NEVER physically deleted.
-- Rule 13: replayable operations are idempotent.
-- =====================================================================

CREATE TABLE cash_session (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id        UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    campus_id        UUID REFERENCES campus(id),
    cashier_user_id  UUID NOT NULL REFERENCES app_user(id) ON DELETE RESTRICT,
    reference        VARCHAR(40) NOT NULL,
    opened_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    opening_balance  NUMERIC(15,2) NOT NULL DEFAULT 0,
    closed_at        TIMESTAMPTZ,
    expected_balance NUMERIC(15,2),
    actual_balance   NUMERIC(15,2),
    difference       NUMERIC(15,2) GENERATED ALWAYS AS (actual_balance - expected_balance) STORED,
    status           cash_session_status NOT NULL DEFAULT 'OPEN',
    reconciled_at    TIMESTAMPTZ,
    reconciled_by    UUID REFERENCES app_user(id),
    notes            TEXT,
    version          BIGINT NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_cash_session_reference UNIQUE (reference),
    CONSTRAINT ck_cash_session_balances CHECK (opening_balance >= 0),
    CONSTRAINT ck_cash_session_closed
        CHECK (status = 'OPEN' OR (closed_at IS NOT NULL AND actual_balance IS NOT NULL))
);
CREATE TRIGGER trg_cash_session_updated BEFORE UPDATE ON cash_session
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
-- A cashier may only hold one open session at a time.
CREATE UNIQUE INDEX uq_cash_session_open ON cash_session(cashier_user_id) WHERE status = 'OPEN';

CREATE TABLE payment (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id         UUID NOT NULL REFERENCES school(id)        ON DELETE RESTRICT,
    student_id        UUID NOT NULL REFERENCES student(id)       ON DELETE RESTRICT,
    enrollment_id     UUID REFERENCES enrollment(id),
    academic_year_id  UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    guardian_id       UUID REFERENCES guardian(id),
    cash_session_id   UUID REFERENCES cash_session(id),
    payment_reference VARCHAR(40)  NOT NULL,
    amount            NUMERIC(15,2) NOT NULL,
    allocated_amount  NUMERIC(15,2) NOT NULL DEFAULT 0,
    unallocated_amount NUMERIC(15,2) GENERATED ALWAYS AS (amount - allocated_amount) STORED,
    currency          CHAR(3) NOT NULL DEFAULT 'XOF',
    payment_method    payment_method NOT NULL,
    payment_date      DATE NOT NULL DEFAULT CURRENT_DATE,
    external_reference VARCHAR(120),         -- bank / mobile money transaction id
    payer_name        VARCHAR(200),
    status            payment_status NOT NULL DEFAULT 'PENDING',
    -- Rule 13 - idempotency of replayable financial operations
    operation_id      VARCHAR(120) NOT NULL,
    validated_at      TIMESTAMPTZ,
    validated_by      UUID REFERENCES app_user(id),
    cancelled_at      TIMESTAMPTZ,
    cancelled_by      UUID REFERENCES app_user(id),
    cancellation_reason TEXT,
    reversal_of_payment_id UUID REFERENCES payment(id),
    notes             TEXT,
    version           BIGINT NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by        UUID REFERENCES app_user(id),
    CONSTRAINT uq_payment_reference    UNIQUE (payment_reference),
    CONSTRAINT uq_payment_operation_id UNIQUE (school_id, operation_id),
    CONSTRAINT ck_payment_amount       CHECK (amount > 0),
    CONSTRAINT ck_payment_allocation   CHECK (allocated_amount >= 0 AND allocated_amount <= amount),
    CONSTRAINT ck_payment_cancel       CHECK (status <> 'CANCELLED' OR cancellation_reason IS NOT NULL)
);
CREATE TRIGGER trg_payment_updated BEFORE UPDATE ON payment
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_payment_student   ON payment(student_id, payment_date DESC);
CREATE INDEX ix_payment_validated ON payment(academic_year_id, payment_date)
    WHERE status = 'VALIDATED';
CREATE INDEX ix_payment_session   ON payment(cash_session_id) WHERE cash_session_id IS NOT NULL;

-- Rule 7 enforced at DB level: no physical delete of a validated payment.
CREATE OR REPLACE FUNCTION prevent_validated_payment_delete()
    RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
    IF OLD.status IN ('VALIDATED','REVERSED') THEN
        RAISE EXCEPTION 'PAYMENT_CANCELLATION_NOT_ALLOWED: payment % is validated and cannot be deleted', OLD.payment_reference
            USING ERRCODE = 'check_violation';
    END IF;
    RETURN OLD;
END;
$$;
CREATE TRIGGER trg_payment_no_delete BEFORE DELETE ON payment
    FOR EACH ROW EXECUTE FUNCTION prevent_validated_payment_delete();

CREATE TABLE payment_allocation (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id     UUID NOT NULL REFERENCES payment(id)     ON DELETE RESTRICT,
    student_fee_id UUID NOT NULL REFERENCES student_fee(id) ON DELETE RESTRICT,
    invoice_id     UUID REFERENCES invoice(id),
    amount         NUMERIC(15,2) NOT NULL,
    allocated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    allocated_by   UUID REFERENCES app_user(id),
    reversed       BOOLEAN NOT NULL DEFAULT FALSE,
    reversed_at    TIMESTAMPTZ,
    CONSTRAINT ck_payment_allocation_amount CHECK (amount > 0)
);
CREATE INDEX ix_payment_allocation_payment ON payment_allocation(payment_id);
CREATE INDEX ix_payment_allocation_fee     ON payment_allocation(student_fee_id) WHERE NOT reversed;

CREATE TABLE receipt (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id     UUID NOT NULL REFERENCES payment(id) ON DELETE RESTRICT,
    student_id     UUID NOT NULL REFERENCES student(id) ON DELETE RESTRICT,
    guardian_id    UUID REFERENCES guardian(id),
    receipt_number VARCHAR(40) NOT NULL,      -- REC-2026-00001234
    issue_date     DATE NOT NULL DEFAULT CURRENT_DATE,
    amount         NUMERIC(15,2) NOT NULL,
    currency       CHAR(3) NOT NULL DEFAULT 'XOF',
    amount_in_words VARCHAR(400),
    payment_method payment_method NOT NULL,
    cashier_user_id UUID REFERENCES app_user(id),
    verification_code VARCHAR(60) NOT NULL,
    pdf_url        VARCHAR(500),
    cancelled      BOOLEAN NOT NULL DEFAULT FALSE,
    cancelled_at   TIMESTAMPTZ,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_receipt_number       UNIQUE (receipt_number),
    CONSTRAINT uq_receipt_payment      UNIQUE (payment_id),
    CONSTRAINT uq_receipt_verification UNIQUE (verification_code),
    CONSTRAINT ck_receipt_amount       CHECK (amount > 0)
);
CREATE INDEX ix_receipt_student ON receipt(student_id, issue_date DESC);
