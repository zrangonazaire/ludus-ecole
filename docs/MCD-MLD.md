# EduOps — Data model (MCD and MLD)

The conceptual model first, then the PostgreSQL logical model with its constraints.
71 tables, 52 enums, 3 derived views.

---

## 1. The pivot of the whole model

Everything else follows from one decision.

```
        Student                AcademicYear              Classroom
      (identity only)         (2026-2027)              (3eme A, 2026-2027)
            │                       │                         │
            └───────────┬───────────┴────────────┬────────────┘
                        │                        │
                        ▼                        ▼
                             E N R O L L M E N T
                     (student + year + classroom, 1 per year)
                                    │
        ┌───────────────┬───────────┼───────────┬────────────────┐
        ▼               ▼           ▼           ▼                ▼
   Attendance        Grade      ReportCard   StudentFee    PromotionDecision
```

A `Student` row holds **no classroom column**. The yearly placement is the `Enrollment`, which
is why:

- a pupil can be followed across five years without any data being overwritten,
- closing a year destroys nothing,
- attendance, grades, report cards and fees all resolve to one unambiguous year.

This is absolute rule 5, and it is the difference between a school information system and a
spreadsheet.

---

## 2. Conceptual model — academic structure

```
SCHOOL (1) ────────< (N) CAMPUS (1) ────────< (N) ROOM
   │                        │
   │ (1)                    │ (1)
   │                        │
   ˅ (N)                    ˅ (N)
ACADEMIC_YEAR (1) ──< (N) CLASSROOM >── (N) ─── (1) LEVEL
   │                        │                          │
   │ (1)                    │                          │ (N)
   ˅ (N)                    │                          ˅ (1)
 TERM                       │                        CYCLE
                            │                          │
   ┌────────────────────────┘                          │
   │                                                   │
   ˅ (N)                                               │
CURRICULUM (1) ──< (N) CURRICULUM_SUBJECT >── (1) SUBJECT
   ˄                         (coefficient,
   │ (1)                      weeklyHours)
   └──────────────────────────────────────────────── (1) LEVEL
```

**Cardinalities that matter**

| Relation | Cardinality | Rule |
|---|---|---|
| SCHOOL → ACADEMIC_YEAR | 1..N | exactly **one** may be `ACTIVE` |
| ACADEMIC_YEAR → CLASSROOM | 1..N | a class belongs to one year and one only |
| CYCLE → LEVEL | 1..N | ordered by `sequence`; `next_level_id` gives the promotion path |
| ACADEMIC_YEAR + LEVEL → CURRICULUM | 1..1 | one programme per level per year |
| CURRICULUM → CURRICULUM_SUBJECT | 1..N | **the coefficient lives here**, never in the client |

---

## 3. Conceptual model — people

```
                    ┌──────────────┐
                    │   APP_USER   │  optional account
                    └──────┬───────┘
             ┌─────────────┼─────────────┬──────────────┐
             │ 0..1        │ 0..1        │ 0..1         │ 0..1
             ˅             ˅             ˅              ˅
         STUDENT       GUARDIAN       TEACHER         STAFF
             │             │              │
             │ (N)     (N) │              │ (1)
             └──< STUDENT_GUARDIAN >──┘   │
                    relationship          ˅ (N)
                    isPrimary        TEACHER_ASSIGNMENT
                    hasFinancialResponsibility  (teacher + year
                    canPickupStudent             + classroom + subject)
                    receivesNotifications
                    receivesAcademicReports
                    receivesFinancialNotifications
```

A person exists as a business identity whether or not they can log in: a teacher may be
recorded with no account at all. The optional `user_account_id` link is what makes the
portals work without conflating identity and authentication.

`STUDENT_GUARDIAN` is not a plain join table. It carries the permissions that answer, per
child and per adult: who receives the report card, who is chased for the unpaid instalment,
who may collect the child at the gate. It is also the enforcement point of rule 11.

`TEACHER_ASSIGNMENT` answers *who teaches which subject, to which class, for which year* — and
is therefore the enforcement point of rule 10.

---

## 4. Conceptual model — admission to promotion

```
ADMISSION_APPLICATION ──(converted)──> STUDENT
        │  status: DRAFT → SUBMITTED → UNDER_REVIEW → TESTED
        │          → ACCEPTED → CONVERTED
        │          (or WAITLISTED / REJECTED / WITHDRAWN)
        ˅
    ENROLLMENT  status: DRAFT → PENDING → VALIDATED → ACTIVE
        │               → COMPLETED / TRANSFERRED / CANCELLED
        ├──< ENROLLMENT_DOCUMENT     (mandatory paperwork)
        ├──< ENROLLMENT_TRANSFER     (class change, traceable)
        ├──< STUDENT_ATTENDANCE
        ├──< GRADE
        ├──< REPORT_CARD ──< REPORT_CARD_LINE
        ├──< STUDENT_FEE
        └──1 PROMOTION_DECISION ──> next year's ENROLLMENT
```

The cycle closes: a `PROMOTION_DECISION` of `PASS` produces next year's enrollment at
`level.next_level_id`, linked back through `previous_enrollment_id`. The pupil's whole
trajectory is a linked list of enrollments.

---

## 5. Conceptual model — timetable and attendance

```
TIMETABLE (1 per classroom, per term) ──< TIMETABLE_SLOT
                                              │  day, startTime, endTime
                                              │  classroom + subject + teacher + room
                                              ˅
                                         COURSE_SESSION  (a dated occurrence)
                                              │
                                              ˅
                                      ATTENDANCE_SESSION  (the sheet)
                                              │
                                              ˅ (N)
                                       STUDENT_ATTENDANCE
                                    PRESENT / ABSENT / LATE
                                    EXCUSED_ABSENCE / EXCUSED_LATE / LEFT_EARLY
```

`TIMETABLE_SLOT` is where the three impossibilities are made impossible — not by application
code, but by the database (see section 8).

---

## 6. Conceptual model — finance

```
FEE_TYPE (1) ──< (N) FEE_SCHEDULE ──< FEE_SCHEDULE_INSTALMENT
  REGISTRATION      (price for a level          (3 x 200 000,
  TUITION            for a year)                 with due dates)
  EXAM …                  │
                          ˅ applied at enrollment
                     STUDENT_FEE  (what this pupil owes, per instalment)
                          │        amountDue / amountPaid / amountRemaining
        ┌─────────────────┼──────────────────┐
        ˅                 ˅                  ˅
    INVOICE          PAYMENT_ALLOCATION   DISCOUNT / SCHOLARSHIP
   ──< INVOICE_LINE       ˄
                          │ (N)
                       PAYMENT (1) ──1 RECEIPT
                          │
                          ˅ 0..1
                     CASH_SESSION  (cashier's till, reconciled at close)
```

Money never flows in one step. A `PAYMENT` is a sum received; `PAYMENT_ALLOCATION` records how
much of it settled which instalment. That separation is what allows an overpayment to sit as a
family credit, and a cancellation to reverse allocations without deleting the payment.

---

## 7. Cross-cutting tables

| Table | Purpose |
|---|---|
| `audit_log` | append-only trail; UPDATE and DELETE raise |
| `sensitive_access_log` | who *read* which sensitive record |
| `domain_event` | transactional outbox feeding WebSocket, notifications, reporting |
| `idempotency_record` | scope + key → the result of the first execution |
| `offline_operation` | PWA queue replayed and revalidated server-side |
| `import_batch` | Excel pipeline: upload → parse → validate → preview → confirm |
| `notification` / `notification_template` / `announcement` | messaging |
| `alert` | dashboard alerts, deduplicated while open |
| `document` | official documents with a unique number and verification code |
| `number_sequence` | per school / scope / year counter behind every identifier |

---

## 8. Logical model — the constraints that carry the rules

The specification says the backend owns the business rules. Where a rule must hold no matter
what — a bug, a rogue script, a manual `psql` session — it is also expressed in the schema.

### Capacity and double enrollment

```sql
-- Rule 21: at most one live enrollment per pupil per year.
CREATE UNIQUE INDEX uq_enrollment_active_per_year
    ON enrollment(student_id, academic_year_id)
    WHERE status IN ('DRAFT','PENDING','VALIDATED','ACTIVE','SUSPENDED');

-- Rule 9: seats are counted, never stored.
CREATE INDEX ix_enrollment_counting ON enrollment(classroom_id)
    WHERE status IN ('VALIDATED','ACTIVE');
```

A partial unique index is the right tool here: a cancelled enrollment must not block a new
one, so the uniqueness applies only to live statuses. The service takes a
`SELECT … FOR UPDATE` on the classroom row before counting, which is what makes two
simultaneous registrars safe on the last free seat.

### Timetable conflicts

```sql
-- One teacher cannot be in two places at once.
ALTER TABLE timetable_slot ADD CONSTRAINT ex_slot_teacher_conflict
    EXCLUDE USING gist (
        teacher_id WITH =, academic_year_id WITH =,
        day_of_week WITH =, time_range WITH &&
    ) WHERE (active);
```

The same shape guards the class and the room. `time_range` is a generated `tsrange`, and `&&`
is range overlap — so the database itself rejects "Professor A, Monday 08:00, class A" and
"Professor A, Monday 08:00, class B". No application path can create that conflict.

### Grades

```sql
CONSTRAINT ck_grade_range   CHECK (score IS NULL OR (score >= 0 AND score <= max_score)),
CONSTRAINT ck_grade_absent  CHECK (NOT (absent AND score IS NOT NULL)),
```

A grade of 24 out of 20 cannot exist. Neither can an absent pupil with a mark.

### Money

```sql
amount_remaining NUMERIC(15,2) GENERATED ALWAYS AS (amount_due - amount_paid) STORED,
CONSTRAINT ck_student_fee_amounts CHECK (
    amount_paid >= 0 AND amount_paid <= amount_due
    AND amount_due = gross_amount - discount_amount)
```

Rule 8 says balances are derived. A generated column makes that structural: nothing can write
an inconsistent remaining amount.

```sql
-- Rule 7: a validated payment is never physically deleted.
CREATE TRIGGER trg_payment_no_delete BEFORE DELETE ON payment
    FOR EACH ROW EXECUTE FUNCTION prevent_validated_payment_delete();

-- Rule 13: the same operation is recorded once.
CONSTRAINT uq_payment_operation_id UNIQUE (school_id, operation_id)
```

### Single active year, single primary guardian

```sql
CREATE UNIQUE INDEX uq_academic_year_single_active
    ON academic_year(school_id) WHERE status = 'ACTIVE';

CREATE UNIQUE INDEX uq_student_guardian_primary
    ON student_guardian(student_id) WHERE is_primary;

CREATE UNIQUE INDEX uq_student_guardian_financial
    ON student_guardian(student_id) WHERE has_financial_responsibility;
```

### Audit is append-only

```sql
CREATE TRIGGER trg_audit_log_no_update BEFORE UPDATE OR DELETE ON audit_log
    FOR EACH ROW EXECUTE FUNCTION audit_log_is_append_only();
```

An audit trail that can be rewritten is not an audit trail.

---

## 9. Type choices

| Concern | Type | Why |
|---|---|---|
| Primary keys | `UUID DEFAULT gen_random_uuid()` | no guessable sequence in a URL; safe to merge across campuses |
| Timestamps | `TIMESTAMPTZ` | a school may operate across time zones; DST is not the app's problem |
| Dates without time | `DATE` | a birth date has no time zone |
| Money | `NUMERIC(15,2)` | rule 18; `float` would lose francs |
| Grades and averages | `NUMERIC(6,3)` | three decimals internally, rounded for display |
| Coefficients | `NUMERIC(6,3)` | fractional coefficients are used in some systems |
| Business states | native `ENUM` | the database refuses an impossible value |
| Flexible attributes | `JSONB` | grading rules, settings, event payloads, audit diffs |
| Time slots | `TIME` + generated `tsrange` | enables the `EXCLUDE` constraints |
| Changed field lists | `TEXT[]` | audit diffs without a child table |

---

## 10. Derived views

The specification is explicit that certain figures must be computed, not entered. These views
are the single definition of each formula:

```sql
-- availableSeats = capacityMaximum - activeEnrollments
-- projectedAvailableSeats also removes reserved admission seats
v_classroom_occupancy

-- outstandingAmount = totalDue - totalValidatedPayments
v_student_financial_summary

-- attendanceRate over present / late / left-early
v_student_attendance_summary
```

---

## 11. Indexing strategy

Beyond the primary and foreign keys:

- **Partial indexes** on the hot filtered paths — live enrollments, open alerts, outstanding
  fees, unread notifications, pending outbox events. Smaller than a full index and matched
  exactly to the queries that run constantly.
- **Trigram GIN indexes** on student, guardian and teacher names for the global search bar, so
  `EDU-2026-000123` and a misspelled surname both resolve fast.
- **Covering indexes** (`INCLUDE`) on the dashboard aggregations, so the KPI queries are
  index-only scans.
- **Composite indexes** ordered by selectivity, matching the real query shapes
  (`academic_year_id, status, date DESC`).

---

## 12. Multi-year strategy

Closing a year never deletes anything:

1. `ACTIVE → CLOSING` — grade entry closes, report cards are published.
2. Class councils record a `PROMOTION_DECISION` per pupil.
3. `CLOSING → CLOSED` — the year is frozen.
4. The new year is created; classes are cloned at the next level.
5. Re-enrollment creates a fresh `ENROLLMENT` with `previous_enrollment_id` set.
6. Every past attendance record, grade, report card and payment stays exactly where it is.

A pupil's complete history is therefore a walk along `previous_enrollment_id`, and last year's
report card renders exactly as it did the day it was published, because its inputs were frozen
in `computation_snapshot`.
