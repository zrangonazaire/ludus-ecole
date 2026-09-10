# EduOps

Production sur VPS : voir [la procedure de deploiement](docs/DEPLOIEMENT_PRODUCTION.md)
et utiliser `docker/compose.prod.yml` avec `.env.prod`.

**Integrated school management system** — administration, academic operations and school finance.

EduOps models how a school actually runs: a pupil is admitted, enrolled into a class for a
given year, follows a timetable, is marked present or absent, is assessed, receives averages
and a report card, and is invoiced and chased for school fees. Every one of those facts is
contextualised by an academic year, so history survives a year change instead of being
overwritten.

---

## Table of contents

1. [What this is](#what-this-is)
2. [Architecture](#architecture)
3. [Stack](#stack)
4. [Prerequisites](#prerequisites)
5. [Quick start with Docker](#quick-start-with-docker)
6. [Running without Docker](#running-without-docker)
7. [Configuration](#configuration)
8. [Database and Flyway](#database-and-flyway)
9. [Redis](#redis)
10. [Mailpit](#mailpit)
11. [API and Swagger](#api-and-swagger)
12. [WebSocket](#websocket)
13. [Frontend](#frontend)
14. [PWA and offline mode](#pwa-and-offline-mode)
15. [Tests](#tests)
16. [The twenty absolute rules](#the-twenty-absolute-rules)
17. [Security](#security)
18. [Deployment](#deployment)
19. [Environment variables](#environment-variables)
20. [Troubleshooting](#troubleshooting)
21. [Project status](#project-status)

---

## What this is

EduOps is not a CRUD front-end over a database. The business rules live in the backend and
the database enforces the ones that must never be violated, whatever the caller does.

Concretely:

| Question | Where the answer is guaranteed |
|---|---|
| Can a 41st pupil enter a class of 40? | Row lock + service check, surfaced as `CLASS_CAPACITY_EXCEEDED` |
| Can a pupil be enrolled twice in one year? | Unique **partial index** `uq_enrollment_active_per_year` |
| Can a teacher be in two rooms at 08:00 Monday? | PostgreSQL `EXCLUDE USING gist` constraints |
| Can a grade of 24/20 be saved? | `CHECK (score <= max_score)` + service validation |
| Can the same payment be recorded twice? | `UNIQUE (school_id, operation_id)` idempotency key |
| Can a validated payment be deleted? | `BEFORE DELETE` trigger that raises |
| Can a parent read another family's child? | Relation check in `PortalAccessService` → HTTP 403 |
| Can Angular compute an official average? | No: `AcademicCalculationService` is the only source |

---

## Architecture

A **modular monolith**. One deployable, but each business domain owns its package with clean
boundaries, so a module can later be extracted without rewriting its internals.

```
                         ANGULAR (PWA)
                              │
                     REST + WEBSOCKET
                              │
                              ▼
                      SPRING BOOT API
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
    ACADEMIC               STUDENT               FINANCE
   (year, term,          (student,             (fee, invoice,
    cycle, level,         guardian,             payment,
    classroom,            admission,            receipt,
    subject,              enrollment)           cash session)
    curriculum)
        │                     │                     │
        ▼                     ▼                     ▼
    TIMETABLE             ATTENDANCE             PAYMENT
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
                         POSTGRESQL
                    ┌─────────┴─────────┐
                    ▼                   ▼
                  REDIS               MAILPIT
                 (cache)            (dev mail)
```

Each module follows the same internal shape:

```
student/
├── controller/     HTTP only: validate input, call the service, return a DTO
├── service/        application services (transactions, orchestration)
├── domain/         entities and their invariants (state machines live here)
├── repository/     Spring Data JPA
├── dto/
│   ├── request/
│   └── response/
├── mapper/         plain Java mappers (no MapStruct, by design)
└── exception/
```

**Cross-cutting concerns** live in `common/`: `BaseEntity`, the `ApiError` envelope and
`GlobalExceptionHandler`, the idempotency registry, the transactional outbox
(`common/event`), money and numbering utilities, and the correlation-id filter.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the detailed design and
[`docs/MCD-MLD.md`](docs/MCD-MLD.md) for the data model.

---

## Stack

**Backend** — Java 21, Spring Boot 3.5, Maven, Spring Web / Data JPA / Validation / Security,
Hibernate, JWT (jjwt), PostgreSQL 16, Flyway, Spring WebSocket (STOMP), Redis (Lettuce),
Actuator, OpenAPI (springdoc), Apache POI, OpenHTMLtoPDF, ZXing, JUnit 5, Mockito, Testcontainers.

**Frontend** — Angular 18 (standalone components, signals), TypeScript, SCSS, Angular Router,
Reactive Forms, RxJS, ApexCharts, `@stomp/stompjs` over SockJS, Angular service worker (PWA).

Deliberate constraints from the specification, all respected:

- The frontend is **Angular** — not React, Vue or Svelte.
- **No MapStruct**: mapping is explicit Java.
- **No `record` for DTOs**: classic DTO classes with getters and setters.
- JPA entities are **never** exposed by a REST endpoint.
- Money is **never** `float` or `double` — always `NUMERIC` / `BigDecimal`.

---

## Prerequisites

| Tool | Version | Needed for |
|---|---|---|
| Docker + Compose | 24+ / v2.20+ | the whole stack |
| JDK | 21 | building the backend locally |
| Maven | 3.9+ | building the backend locally |
| Node.js | 20 or 22 | building the frontend locally |
| Docker | with 4 GB RAM available | integration tests (Testcontainers) |

---

## Quick start with Docker

```bash
# 1. Prepare the environment file and set your own secrets
cp .env.example .env
$EDITOR .env          # POSTGRES_PASSWORD, REDIS_PASSWORD, JWT_SECRET, admin password

# 2. Start everything
cd docker
docker compose up -d

# 3. Follow the first boot (Flyway runs 30 migrations)
docker compose logs -f backend
```

Once healthy:

| Service | URL |
|---|---|
| Angular application | http://localhost:4200 |
| REST API (Docker) | http://localhost:58080/api/v1 |
| Swagger UI (Docker) | http://localhost:58080/swagger-ui.html |
| Actuator health (Docker) | http://localhost:58080/actuator/health |
| Mailpit (captured mail) | http://localhost:58025 |
| PostgreSQL | localhost:55432 |
| Redis | localhost:56379 |

First login uses the bootstrap administrator from `.env`
(`EDUOPS_ADMIN_EMAIL` / `EDUOPS_ADMIN_PASSWORD`). The account is created with
`mustChangePassword = true`; change it immediately.

The optional local Docker registry is behind a profile:

```bash
docker compose --profile registry up -d registry
```

Useful commands:

```bash
docker compose ps                       # health of every service
docker compose logs -f backend          # backend logs
docker compose down                     # stop, keep the data
docker compose down -v                  # stop and DROP the database
docker compose exec postgres psql -U eduops -d eduops
```

---

## Running without Docker

```bash
# Start the local infrastructure (host ports come from .env).
cd docker
docker compose up -d postgres redis mailpit

# Backend
cd ../backend
# The dev profile automatically imports ../.env when launched locally.
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Frontend (separate terminal) - proxies /api and /ws to the local :8080
cd ../frontend
npm install
npm start
```

---

## Configuration

Configuration is layered: `application.yml` holds the shared settings, and
`application-{dev,test,prod}.yml` override per environment. Everything that differs between
environments is an environment variable, so the same image runs everywhere.

| Profile | Database | Mail | Demo data | Swagger |
|---|---|---|---|---|
| `dev` | local / compose | Mailpit | optional | on |
| `test` | Testcontainers | disabled | off | on |
| `prod` | managed instance | real SMTP relay | off | off |

The typed binding lives in `config/EduOpsProperties.java`, so a missing or malformed setting
fails at startup rather than at the first request.

---

## Database and Flyway

PostgreSQL is the single source of truth. Hibernate runs with `ddl-auto: validate` — it never
alters the schema; Flyway owns it.

The 30 migrations are ordered by dependency:

| Range | Content |
|---|---|
| `V1`–`V2` | extensions (`pgcrypto`, `pg_trgm`, `btree_gist`…), 52 domain enums |
| `V3` | users, roles, permissions, refresh tokens, idempotency registry |
| `V4`–`V6` | school, campus, room, academic year, term, cycle, level, classroom |
| `V7`–`V10` | student, guardian, admission, enrollment |
| `V11`–`V14` | teacher, staff, subject, curriculum, teaching assignments |
| `V15`–`V16` | timetable, slots, course sessions, attendance |
| `V17`–`V21` | assessment, grade, report card, class council, discipline |
| `V22`–`V23` | fees, schedules, invoices, payments, receipts, cash sessions |
| `V24`–`V28` | notifications, alerts, documents, audit, domain events, imports |
| `V29` | reporting views and composite indexes |
| `V30` | reference data: 75 permissions, 13 roles, the role matrix, mail templates |

**Never edit an applied migration.** Add a new one.

Three views carry the derived figures the specification insists must be computed, not stored:

- `v_classroom_occupancy` — available and projected seats, capacity status
- `v_student_financial_summary` — total due, paid and outstanding
- `v_student_attendance_summary` — attendance rate per pupil and term

---

## Redis

Redis is a cache and a coordination tool, never a source of truth: nothing lives there that
cannot be rebuilt from PostgreSQL. Every cache therefore carries a TTL.

| Cache | TTL | Invalidated by |
|---|---|---|
| `dashboard` | 60 s | any domain event |
| `classroomOccupancy` | 30 s | `STUDENT_ENROLLED` |
| `studentSummary`, `financialSummary` | 2 min | payment events |
| `academicYear`, `curriculum` | 30 min | manual change |
| `reference` | 2 h | manual change |

---

## Mailpit

In development every outgoing mail is captured by Mailpit at http://localhost:8025 — nothing
reaches a real parent by accident.

Business code depends only on the `MailService` interface; the SMTP host comes from the
profile. Mail is sent on a dedicated executor, so a slow mail server never delays an
enrollment or a payment, and a mail failure is logged rather than propagated.

Templates live in the `notification_template` table (`ACCOUNT_CREATED`, `ABSENCE_RECORDED`,
`REPORT_CARD_PUBLISHED`, `PAYMENT_RECEIVED`, `PAYMENT_OVERDUE`…), so wording changes need no
redeploy.

---

## API and Swagger

Versioned under `/api/v1`. Swagger UI: http://localhost:8080/swagger-ui.html

Every endpoint returns the same error envelope, with a **stable code** the frontend maps to a
localised message:

```json
{
  "timestamp": "2026-09-14T08:31:22.114Z",
  "status": 409,
  "code": "CLASS_CAPACITY_EXCEEDED",
  "message": "La capacite maximale de la classe est atteinte.",
  "path": "/api/v1/enrollments",
  "correlationId": "6f1c…",
  "details": { "capacityMaximum": 40, "activeEnrollments": 40, "availableSeats": 0 }
}
```

`ErrorCode` defines 106 codes. The `details` map carries what the UI needs to explain the
refusal — remaining seats, allowed range, outstanding balance.

**Idempotency.** `POST /payments` and `POST /enrollments` accept a client-generated
`operationId` / `idempotencyKey`. Replaying the same request returns the original result
instead of duplicating the operation.

---

## WebSocket

STOMP over SockJS at `/ws`. The backend writes domain events to a transactional outbox
(`domain_event`) inside the business transaction, and a relay pushes them out — so an event
exists if and only if the operation committed.

| Channel | Events |
|---|---|
| `/channels/dashboard` | `STUDENT_ENROLLED`, `STUDENT_TRANSFERRED`, `TIMETABLE_CHANGED` |
| `/channels/attendance` | `ATTENDANCE_RECORDED`, `ABSENCE_RECORDED` |
| `/channels/grades` | `GRADE_SUBMITTED`, `GRADE_VALIDATED`, `GRADE_PUBLISHED`, `REPORT_CARD_PUBLISHED` |
| `/channels/payments` | `PAYMENT_RECEIVED`, `PAYMENT_CANCELLED`, `OVERDUE_PAYMENT_DETECTED` |
| `/channels/alerts` | `ALERT_CREATED` |
| `/channels/notifications` | `ANNOUNCEMENT_PUBLISHED` |

Failed dispatches retry with exponential backoff capped at ten minutes.

---

## Frontend

```
src/app/
├── core/
│   ├── auth/           session, signals, role-based home route
│   ├── guards/         authGuard, permissionGuard, roleGuard
│   ├── interceptors/   correlation id, bearer token, error → toast
│   ├── datasource/     the DataSource abstraction (see below)
│   ├── websocket/      STOMP client, channels, typed events
│   ├── services/       toasts, error-code → French message
│   └── models/         DTO mirrors of the backend contracts
├── shared/
│   ├── ui/             KpiCard, StatusBadge, DataTable, Avatar, ChartCard,
│   │                   ConfirmDialog, Empty/Loading/ErrorState, ToastHost
│   ├── pipes/          money, grade, statusLabel
│   └── directives/     *eduopsHasPermission
├── layouts/
│   ├── admin-layout/   desktop: topbar 64px + sidebar 248px + content
│   └── mobile-layout/  portals: header + content + bottom tab bar
├── features/           dashboard, students, enrollments, classes, teachers,
│                       payments, and the three portals
└── styles/             tokens, base, components
```

**Components never inject `HttpClient`.** They inject a `DataSource` token, bound to either a
mock or the real API by one switch:

```ts
// core/datasource/data-source.providers.ts
{ provide: STUDENT_DATA_SOURCE,
  useClass: useMock ? MockStudentDataSource : ApiStudentDataSource }
```

With `environment.useMockData = true` the whole application runs standalone on realistic
demo data — useful for design review and for demos without a backend. Set it to `false` and
the identical components hit the real API.

**Design system.** Every colour, radius, spacing and font size is a CSS variable in
`styles/_tokens.scss`. Typography is Bricolage Grotesque for display and Public Sans for the
interface, with `font-variant-numeric: tabular-nums` wherever figures must align.

**Responsive.** Mobile `< 768px`, tablet `768–1199px`, desktop `>= 1200px`. The portals are
built mobile-first with a bottom tab bar and 40px+ touch targets — not a shrunken desktop.

**Accessibility.** Semantic landmarks, a skip link, `aria-live` on loading and error states,
`aria-sort` on sortable columns, visible focus rings, and `prefers-reduced-motion` honoured.

---

## PWA and offline mode

The service worker prefetches the app shell and caches reference data. The teacher roll call
is the offline-first path that matters: an attendance sheet is captured locally and replayed
with its idempotency key when the network returns.

**Financial operations are deliberately excluded from optimistic offline confirmation.** A
payment is only ever considered recorded once the server has confirmed it.

---

## Tests

```bash
cd backend
mvn test              # unit tests, no Docker needed
mvn verify            # + integration tests (Testcontainers, needs Docker)
```

Unit tests pin the decisions the business made:

| Scenario from the specification | Test |
|---|---|
| capacity 40, enrolled 39 → accepted; 40 → refused | `EnrollmentDomainServiceTest` |
| pupil already enrolled the same year → refused | `EnrollmentDomainServiceTest` |
| teacher booked twice on Monday 08:00 → conflict | `TimetableConflictTest` |
| grade 24 on a scale of 20 → refused | `AcademicCalculationServiceTest` |
| report card publication with unvalidated grades → refused | `GradeRepository.countUnvalidated` guard |
| the same payment sent twice → one payment | `PaymentService` idempotency check |
| parent requesting an unrelated child → 403 | `PortalAccessService` |

Also covered: the weighted average formulas with hand-computed expectations, competition
ranking with ties, all four state machines, money arithmetic, and the French amount-in-words
used on receipts.

Integration tests run against a **real PostgreSQL** through Testcontainers, because the most
important guarantees are database-level — an in-memory database would accept what production
rejects.

```bash
cd frontend
npm test
```

---

## The twenty absolute rules

These are the project's non-negotiables. Where each one is enforced:

| # | Rule | Enforced by |
|---|---|---|
| 1 | PostgreSQL is the source of truth | `ddl-auto: validate`, Redis is TTL cache only |
| 2 | The backend owns the business rules | domain services; controllers only transport |
| 3 | Angular owns the user experience | no business arithmetic in components |
| 4 | The frontend can never bypass a server rule | guards are UX only; `@PreAuthorize` + relation checks |
| 5 | Annual enrollment is the academic placement | `Student` has no classroom column |
| 6 | A validated grade is never silently changed | `grade_revision` + `GRADE_CORRECT_PUBLISHED` |
| 7 | A validated payment is never physically deleted | `BEFORE DELETE` trigger |
| 8 | Balances are derived from fees and payments | generated column `amount_remaining` |
| 9 | Available seats are computed | `v_classroom_occupancy`, no stored counter |
| 10 | A teacher acts only within their assignment | `PortalAccessService.requireTeacherScope` |
| 11 | A parent sees only their own children | `StudentGuardianRepository.isGuardianOfStudent` |
| 12 | Critical operations are audited | append-only `audit_log` |
| 13 | Replayable operations are idempotent | `idempotency_record`, `uq_payment_operation_id` |
| 14 | Official averages are computed by the backend | `AcademicCalculationService` only |
| 15 | Published report cards are reproducible | `computation_snapshot` + `revision` |
| 16 | A year change never destroys history | everything hangs off `enrollment` |
| 17 | Academic data is always contextualised | `academic_year_id` on every academic table |
| 18 | Financial data never uses float | `NUMERIC(15,2)` / `BigDecimal` |
| 19 | Secrets are never committed | `.env` is git-ignored; `.env.example` is the template |
| 20 | The frontend is Angular | Angular 18 standalone |

---

## Security

- **Authentication** — JWT access token plus a refresh token stored **hashed**, so a database
  dump cannot be replayed. Access tokens carry roles and permissions; the filter still
  reloads authorities from the database, so a revoked permission takes effect immediately.
- **Passwords** — BCrypt strength 12. Five failed attempts lock the account for 15 minutes.
- **Authorisation, two layers** — `@PreAuthorize` for the permission, then a relation check
  for the scope. A teacher with `GRADE_CREATE` still cannot grade a class they do not teach.
- **Transport** — HTTPS required in production, HSTS, `X-Content-Type-Options`, SameSite
  cookies, CORS restricted to the configured origins.
- **Traceability** — a correlation id flows from the HTTP header into logs, audit rows and
  domain events, so one incident can be followed end to end.
- **Privacy** — least privilege, sensitive-read logging (`sensitive_access_log`), minimal
  local storage, and session data cleared on logout.

---

## Deployment

```bash
# Build and push versioned images
export DOCKER_REGISTRY=registry.example.com/eduops
export IMAGE_TAG=1.0.0
cd docker
docker compose build
docker compose push
```

Production checklist:

- [ ] `SPRING_PROFILES_ACTIVE=prod`
- [ ] `JWT_SECRET` regenerated, at least 64 random characters
- [ ] Database passwords rotated; secrets injected by the orchestrator, not a file
- [ ] TLS terminated in front of the stack; `APP_BASE_URL` on `https://`
- [ ] Managed PostgreSQL with point-in-time recovery, and a restore actually tested
- [ ] Redis password set, not exposed publicly
- [ ] Real SMTP relay configured; Mailpit removed from the stack
- [ ] `/actuator/prometheus` scraped; alerts on health and error rate
- [ ] Log retention and the personal-data retention policy agreed with the school

Both Dockerfiles are multi-stage: Maven → JRE Alpine for the backend, Node → Nginx for the
frontend. Both run as a non-root user and expose a healthcheck.

---

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `POSTGRES_DB` / `_USER` / `_PASSWORD` | `eduops` | database |
| `POSTGRES_HOST` / `_PORT` | `postgres` / `5432` | connection |
| `REDIS_HOST` / `_PORT` / `_PASSWORD` | `redis` / `6379` | cache |
| `MAIL_HOST` / `_PORT` | `mailpit` / `1025` | SMTP |
| `MAIL_FROM` | `no-reply@eduops.local` | sender |
| `JWT_SECRET` | — | **required**, min. 64 characters |
| `JWT_EXPIRATION` | `3600000` | access token lifetime (ms) |
| `JWT_REFRESH_EXPIRATION` | `604800000` | refresh token lifetime (ms) |
| `APP_BASE_URL` | `http://localhost:4200` | frontend URL, drives CORS |
| `API_BASE_URL` | `http://localhost:8080` | API URL |
| `SCHOOL_NAME` / `SCHOOL_CODE` | — | school identity |
| `SCHOOL_CURRENCY` | `XOF` | currency |
| `SCHOOL_TIMEZONE` | `Africa/Abidjan` | time zone |
| `STUDENT_NUMBER_PATTERN` | `EDU-{year}-{seq:6}` | matricule format |
| `RECEIPT_NUMBER_PATTERN` | `REC-{year}-{seq:8}` | receipt format |
| `INVOICE_NUMBER_PATTERN` | `INV-{year}-{seq:8}` | invoice format |
| `EDUOPS_ADMIN_EMAIL` / `_PASSWORD` | — | bootstrap administrator |
| `DOCKER_REGISTRY` / `IMAGE_TAG` | `localhost:5000` / `latest` | image publishing |

Numbering patterns accept `{year}`, `{yy}`, `{schoolCode}` and `{seq:n}` (zero-padded on
`n` digits).

---

## Troubleshooting

**`backend` restarts in a loop.** Read the logs first: `docker compose logs backend`.

- `JWT secret must be at least 64 characters` — lengthen `JWT_SECRET` in `.env`.
- `Role SUPER_ADMIN is missing` — migration V30 did not run; check the Flyway output.
- `Schema-validation: missing table` — Flyway and the entities disagree; a migration failed
  halfway. In development: `docker compose down -v` then up again.

**Flyway reports a checksum mismatch.** An applied migration was edited. Restore the original
file and add a new migration instead. In development only, resetting the volume is acceptable.

**`CLASS_CAPACITY_EXCEEDED` on a class that looks free.** Available seats are derived from
`VALIDATED` and `ACTIVE` enrollments. Check for draft or pending enrollments still holding
seats:

```sql
SELECT status, COUNT(*) FROM enrollment WHERE classroom_id = '…' GROUP BY status;
```

**`STUDENT_ALREADY_ENROLLED` although the pupil looks unenrolled.** A `DRAFT` or `PENDING`
enrollment still blocks. Query `v_classroom_occupancy` and the `enrollment` table.

**A grade will not save.** Check the term status: marks are only accepted while the term is
`OPEN` or `GRADE_ENTRY`, and only by a teacher assigned to that class and subject.

**Report card publication refused.** `REPORT_CARD_NOT_READY` means grades are still `DRAFT`
or `SUBMITTED`; they must be validated first.

**The dashboard does not refresh live.** Check the indicator in the topbar. If the socket is
down, verify `/ws` reaches the backend through Nginx and that the event relay is enabled.

**Mail is not arriving.** In development it is not supposed to leave the machine — look in
Mailpit at http://localhost:8025.

**Integration tests fail to start.** Testcontainers needs a running Docker daemon and about
4 GB of RAM.

---

## Project status

The foundation, the data model and the critical business paths are implemented and
self-checked. The following are complete:

- 30 Flyway migrations — 71 tables, 52 enums, 3 views, all constraints and indexes
- Docker stack — Postgres, Redis, Mailpit, backend, frontend, optional registry, healthchecks
- Backend — 199 classes: security and JWT, the full domain model, the enrollment transaction,
  the payment transaction, the averages engine, the outbox and WebSocket relay, portal access
  control, audit, mail
- Frontend — 66 TypeScript files: design system, both layouts, core plumbing, the
  DataSource abstraction with mock and API implementations, dashboard, students, enrollment
  wizard, classes, teachers, payments, and the three portals
- Tests — the seven mandated scenarios plus the formula and state-machine suites

The **frontend has been compiled for real** with the Angular compiler (`ngc`) under
`strictTemplates`, `strict` and `strictInjectionParameters`: zero errors. That pass found and
fixed six genuine bugs, including `as` aliasing misused on `@else if` in four templates. See
[`docs/BUILD-VERIFICATION.md`](docs/BUILD-VERIFICATION.md).

The **backend has not been compiled** — Maven Central is unreachable from the environment this
was built in. Run `mvn clean compile && mvn verify` first; the schema and all 49 entity
mappings were verified independently, so the integration tests are the fastest way to confirm
the foundation.

What remains, and is marked as such in the code rather than hidden: several administration
screens are routed to an explicit placeholder that names the endpoint it will consume
(admissions, guardians, subjects, timetable grid, assessments, grades entry, report cards,
discipline, fees, reports, settings), and their corresponding controllers and DTOs follow the
same patterns already established by the enrollment and payment modules.

---

*EduOps — the point is not to make screens work. It is to represent the administrative,
academic and financial reality of a school faithfully, and turn it into data that is
reliable, consistent, secure and usable.*
"# ludus-ecole" 
