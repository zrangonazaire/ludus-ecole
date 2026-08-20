# EduOps — Architecture

Why the system is shaped the way it is.

---

## 1. The one idea

A school information system fails in a predictable way: it becomes a set of screens over
tables, and then nobody can answer *"in which class was this pupil in 2024, and what did they
still owe?"* — because a class was stored on the pupil and got overwritten.

EduOps is built around the opposite decision. The `Enrollment` — a pupil, a year, a class — is
the pivot, and every academic and financial fact hangs off it. That single choice is what makes
multi-year history, reproducible report cards and reliable reporting possible.

Everything else in this document follows from it.

---

## 2. Modular monolith, not microservices

One deployable artefact. The specification asks for this explicitly for the first release, and
it is the right call: the domains here are tightly coupled by business reality — you cannot
enroll a pupil without touching capacity, fees and audit in the same transaction. Distributing
that would mean inventing a saga to replace a database transaction, for no gain.

What we do instead is keep the **boundaries clean**, so extraction stays possible:

- one package per domain, with its own controller / service / domain / repository / dto / mapper
- no shared "god service", no package that imports everything
- cross-domain communication through domain events where the coupling is genuinely loose
  (notifications, dashboard refresh, reporting) rather than direct calls

The modules whose boundaries are already prepared but not implemented — library, transport,
canteen, inventory, payroll, accounting, e-learning — need no schema change to be added.

---

## 3. Layering, and what each layer is forbidden from doing

```
Controller   receives, validates the transport contract, calls a service, returns a DTO
             ─ must not contain a business decision
             ─ must not touch a repository
             ─ must not return a JPA entity

Service      transactions, orchestration, the "what happens when" of a use case
Domain svc   the pure business rules, testable without a database
Entity       invariants and state machines live here, not in the service

Repository   data access only
```

Two consequences worth naming:

**State machines belong to entities.** `Student.changeStatus()` refuses an illegal transition
itself. A service cannot forget to check, because there is no way to set the status without
going through the guard.

**Business rules are unit-testable.** `EnrollmentDomainService` takes repositories as
constructor arguments and holds no Spring magic, so the capacity and double-enrollment rules
are tested in milliseconds without Docker.

---

## 4. Defence in depth: the same rule stated twice

Every rule that must never be violated is expressed in **two** places: the service, for a clean
business error, and the database, for the guarantee.

| Rule | Service gives you | Database guarantees |
|---|---|---|
| No double enrollment | `STUDENT_ALREADY_ENROLLED` with the existing number | unique partial index |
| Class capacity | `CLASS_CAPACITY_EXCEEDED` with the seat counts | row lock + counted seats |
| Timetable conflict | `TIMETABLE_CONFLICT` naming the clash | `EXCLUDE USING gist` |
| Grade range | `GRADE_OUT_OF_RANGE` with the allowed maximum | `CHECK` constraint |
| Payment idempotency | the original payment returned | `UNIQUE (school_id, operation_id)` |
| No payment deletion | `PAYMENT_CANCELLATION_NOT_ALLOWED` | `BEFORE DELETE` trigger |
| One active year | `ACADEMIC_YEAR_ALREADY_ACTIVE` | unique partial index |

This is not redundancy for its own sake. The service layer exists to give the user a message
they can act on; the database exists so that a bug, a migration script or a manual session
cannot corrupt the school's records. `GlobalExceptionHandler` even maps constraint names back
to business codes, so a violation that slips past the service still reaches the client as a
meaningful error rather than a 500.

---

## 5. The two transactions that matter

Most of the system is ordinary. Two operations carry real risk, and both are written as a
single atomic sequence.

### Enrolling a pupil

```
BEGIN
  1  identify the student
  2  check the academic year        (status + enrollment window)
  3  check the student status       (ADMITTED or ACTIVE only)
  4  refuse a double enrollment
  5  LOCK the classroom row, then check capacity
  6  check documents and admission status
  7  create the enrollment
  8  assign the class
  9  generate the applicable fees from the price list
 10  write the audit entry
 11  publish StudentEnrolledEvent to the outbox
COMMIT
```

Step 5 is the subtle one. Counting seats without locking is a race: two registrars both read
39 of 40 and both insert. `SELECT … FOR UPDATE` on the classroom row serialises them, and the
partial unique index is the backstop if anything ever bypasses the service.

### Recording a payment

```
BEGIN
  1  identify the student
  2  check the idempotency key      ← first, so a replay does nothing at all
  3  resolve the academic year and enrollment
  4  validate the amount
  5  LOCK the fee lines being settled
  6  create the payment
  7  allocate it across the instalments, oldest first
  8  refresh the derived balances
  9  generate the receipt number and the amount in words
 10  write the audit entry
 11  publish PaymentReceivedEvent
COMMIT
```

The idempotency check is deliberately the second step: a replayed request must not even begin
the work. An overpayment is allowed and stays unallocated as a family credit rather than being
silently discarded.

---

## 6. Two-layer authorisation

A permission is not enough. This is the distinction the specification insists on, and it is
where most systems are quietly wrong.

```
Layer 1  @PreAuthorize("hasAuthority('GRADE_CREATE')")
         Does this account hold the capability at all?

Layer 2  portalAccess.requireTeacherScope(classroomId, subjectId)
         Is this specific teacher assigned to this specific class and subject?
```

A teacher with `GRADE_CREATE` still cannot enter marks for a class they do not teach. A parent
with `PORTAL_PARENT` still cannot read a child who is not linked to their account — the check
is a query against `student_guardian`, and the answer is HTTP 403.

The frontend mirrors this with guards and `*eduopsHasPermission`, but that is **UX only**.
Hiding a button is never the security control; the server re-checks every call.

---

## 7. Averages are computed in exactly one place

```
subjectAverage = SUM(normalizedScore x assessmentCoefficient)
               / SUM(assessmentCoefficient)

generalAverage = SUM(subjectAverage x subjectCoefficient)
               / SUM(subjectCoefficient)
```

`AcademicCalculationService` is the only implementation. Angular displays what it returns and
never recomputes, which is why the number on screen always equals the number on the report
card.

Details that matter in practice:

- **Normalisation.** A test marked out of 40 becomes a score out of 20 before averaging, so
  assessments on different scales combine correctly.
- **Absences are excluded from the denominator**, not counted as zero. Counting an absence as
  zero would silently punish an illness.
- **Only `VALIDATED` and `PUBLISHED` marks count.** A draft mark never moves an average.
- **Rounding is configurable per level** through the curriculum's `gradingRules` JSONB, because
  schools genuinely differ on this.
- **Ranking is competition style** — 1, 2, 2, 4 — and only when the curriculum enables it.

---

## 8. Reproducible report cards

Rule 15 asks that a published report card be traceable and reproducible. Two mechanisms:

- `computation_snapshot` (JSONB) freezes the inputs of the calculation at publication time.
- `revision` increments instead of mutating. A correction produces revision 2; revision 1
  remains exactly as it was printed.

The subject name and coefficient are also **copied** into `report_card_line`. Renaming a subject
or changing a coefficient next year must not alter a document already handed to a family.

---

## 9. Transactional outbox instead of direct pushes

Publishing a WebSocket message or sending a mail inside a business transaction is a trap: the
transaction may still roll back, and the parent has already been told their child is absent.

So domain events are **written to a table** inside the transaction:

```
business transaction ──> INSERT INTO domain_event (status = PENDING)
                             │
                       COMMIT ─┘
                             │
        DomainEventRelay (scheduled) ──> WebSocket channel
                                     ──> notifications
                                     ──> dashboard cache eviction
```

An event exists if and only if the operation committed. Dispatch failures retry with
exponential backoff capped at ten minutes, and a permanently failing event stays visible in the
table rather than vanishing.

---

## 10. Redis: cache, never truth

Nothing lives in Redis that cannot be rebuilt from PostgreSQL. Every cache carries a TTL, and
the dashboard caches are additionally evicted by the event relay — so a payment recorded at the
counter updates the director's KPI tiles within seconds, without a page reload and without
anyone polling.

Redis is also used for rate limiting and, where needed, distributed locking. It is never asked
to remember a business fact.

---

## 11. Offline: honest about what can be trusted

The teacher roll call has to work in a corridor with no signal, so it is captured locally and
replayed with an idempotency key.

Financial operations are deliberately **excluded** from optimistic offline confirmation. A
payment is only ever "recorded" once the server says so. Telling a parent their fees are paid
and discovering later that the sync failed is a worse failure than making the cashier wait for
the network.

---

## 12. The error contract

One envelope, everywhere, with a **stable code**:

```json
{
  "status": 409,
  "code": "CLASS_CAPACITY_EXCEEDED",
  "message": "…",
  "correlationId": "6f1c…",
  "details": { "capacityMaximum": 40, "activeEnrollments": 40 }
}
```

The backend returns a code, never a user-facing sentence. Angular maps the code to French in
`error-messages.ts`, and enriches it from `details` — so a full class tells the registrar
*40/40 seats occupied*, not just "conflict". Wording changes need no API change.

---

## 13. Traceability end to end

A correlation id is generated (or accepted from the `X-Correlation-Id` header) on every
request and flows into:

- the log pattern, on every line
- `audit_log.correlation_id`
- `domain_event.correlation_id`
- the error response returned to the user

When a parent reports a problem, the id shown on their screen is enough to reconstruct exactly
what happened, including operations that were refused.

---

## 14. Frontend: the DataSource abstraction

Components inject an injection token, never `HttpClient`:

```ts
{ provide: STUDENT_DATA_SOURCE,
  useClass: environment.useMockData ? MockStudentDataSource : ApiStudentDataSource }
```

This buys three things:

1. The whole application runs on realistic demo data with no backend — design review, demos,
   and frontend work that is not blocked by API delivery.
2. Component tests inject a stub with no HTTP mocking machinery.
3. The mock and the API implement the *same interface*, so a shape mismatch is a compile error
   rather than a runtime surprise.

The mock dataset reproduces the reference dashboard figures exactly (1 284 pupils, 94,8 %
attendance, 18 450 000 FCFA collected), and is generated deterministically so it is identical
on every reload.

---

## 15. Design system

Every colour, radius, spacing value and font size is a CSS custom property in
`styles/_tokens.scss`. No component hard-codes a hex value — which is what makes a theme change
or a white-label deployment a token edit rather than a search-and-replace.

Two typefaces, each with a job: Bricolage Grotesque for display and large figures, Public Sans
for the interface. `font-variant-numeric: tabular-nums` wherever numbers must align in a
column, because a finance table with proportional digits is unreadable.

**Responsive means different, not smaller.** Desktop gets topbar + sidebar + content. The
portals get header + content + bottom tab bar, with 40px+ touch targets. The teacher roll call
is designed for a thumb on a phone in a classroom, not for a mouse.

---

## 16. Known trade-offs

Worth stating plainly.

- **`@Version` optimistic locking is on every entity**, and pessimistic locks are used only on
  the two contended paths (classroom seats, fee lines). Locking more would hurt throughput;
  locking less would allow the races that matter.
- **The outbox relay is a scheduled poll**, not LISTEN/NOTIFY. Simpler to reason about and to
  operate; the two-second latency is invisible on a dashboard. If sub-second latency is ever
  needed, the relay is the only thing that changes.
- **Report card generation is synchronous.** For a class of forty that is fine. Generating a
  whole school's report cards should move to a background job before it becomes a problem.
- **Mail is fire-and-forget on a dedicated executor.** A failure is logged, not retried. If
  guaranteed delivery becomes a requirement, notifications should move into the outbox
  alongside the domain events.
- **Search uses trigram indexes on PostgreSQL**, not a separate search engine. Correct and fast
  enough at this scale, and one less service to operate.

---

## 17. Order of decisions

When a technical choice is contested, the specification gives a priority order, and this
codebase follows it:

```
1. Data integrity        6. User experience
2. Business rules        7. Performance
3. Security              8. Extensibility
4. Traceability
5. Maintainability
```

Which is why balances are generated columns rather than cached counters, why the timetable uses
an `EXCLUDE` constraint rather than a service check alone, and why a payment can never be
deleted even though a soft-delete flag would have been less code.

Data integrity is never traded away to simplify an interface.
