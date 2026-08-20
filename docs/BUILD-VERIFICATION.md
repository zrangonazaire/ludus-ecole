# Build verification report

What was mechanically verified while building this project, and what could not be —
stated honestly so nothing is assumed to work that has not been checked.

---

## Verified

### PostgreSQL schema — fully validated

Parsed with **`pglast`**, which wraps the real PostgreSQL parser (`libpg_query`), so this is
the same grammar the server uses, not an approximation.

```
30 migration files, 316 statements, 0 parse errors
71 tables, 52 enums, 3 views
```

A second structural pass confirmed, in migration order:

- every `REFERENCES` target table already exists at that point
- every foreign-key and index column exists on its table
- every column type is a built-in type or an enum declared earlier
- every `EXCLUDE` constraint column exists

Two genuine bugs were found and fixed this way: `attendance_session` and
`notification_template` used expressions inside table-level `UNIQUE` constraints, which
PostgreSQL rejects. Both became unique indexes.

### Java — syntax and cross-file consistency

All **206 files** parsed with tree-sitter's Java grammar: 0 syntax errors.

A custom consistency pass then verified:

- **242 declared types**; every `import ci.company.eduops.*` resolves to a type that exists
- **49 JPA entities**: every `@Table`, `@Column` and `@JoinColumn` name matches a real column
  in the SQL schema, `@JoinTable` join columns validated against their own join table

That last check is the valuable one: it means Hibernate's `ddl-auto: validate` should pass on
first boot rather than failing on a typo.

### Angular — compiled for real with the Angular compiler

The npm registry turned out to be reachable, so the Angular compiler was installed and the
frontend was **actually compiled**, not just parsed:

```
npx ngc -p tsconfig.ngc.json    →  exit 0, zero errors, zero warnings
```

with the strictest settings the project declares:

```json
"strict": true,
"noImplicitOverride": true,
"noImplicitReturns": true,
"noFallthroughCasesInSwitch": true,
"angularCompilerOptions": {
  "strictTemplates": true,
  "strictInjectionParameters": true,
  "strictInputAccessModifiers": true
}
```

`strictTemplates` type-checks every expression in every HTML template against the component
class, which is where most Angular defects actually live. It found **six real bugs** that no
amount of syntax checking would have caught:

| Bug | Fix |
|---|---|
| `NG5002` — `as` aliasing used on `@else if` in four templates (dashboard, student detail, teacher classes, teacher attendance). Angular only binds `as` on the **primary** `@if`, so `dashboard`, `student`, `classroom` and `sheet` were all unbound identifiers. | Nested a plain `@if` inside `@else` |
| `TS2741` — `[chart]="chartOptions()"` returned `Record<string, unknown>`; ApexCharts requires `ApexChart` | Typed every chart option method (`ApexChart`, `ApexXAxis`, `ApexYAxis`, `ApexStroke`, `ApexGrid`, `ApexLegend`, `ApexTooltip`, `ApexDataLabels`) |
| `TS2345` — `toParams(query: Record<string, unknown>)` rejected the typed query interfaces (`PageQuery` has no index signature) | Widened the parameter to `object` |
| Shadowed loop variable in `teacher-classes` where `classroom` was both the alias and the `@for` variable | Renamed the loop variable to `item` |

Two further defects had already been caught before the compiler was available:

1. `DataTableComponent<T extends Record<string, unknown>>` could not accept an interface such
   as `StudentSummary`. Relaxed to `T extends object` with explicit casts at the access points.
2. Four list components read `viewChild.required()` in `ngOnInit`, which throws — signal
   queries are only populated after view init. Converted to `@ViewChild(..., { static: true })`.

Supporting static checks also pass:

```
66 TypeScript files, 0 syntax errors
all relative and path-aliased imports resolve
all named imports exist in their target module
48 lazy-loaded routes resolve to an exported component or Routes constant
17 templateUrl / styleUrl references exist
0 orphaned stylesheets
```

### Configuration

- Every `.yml` and `.json` file parses (including a nesting bug caught in `application.yml`,
  where a stray key had pushed `flyway`, `data`, `cache` and `mail` out of the `spring` block)
- `docker-compose.yml`: 6 services, all `depends_on` targets exist, all named volumes declared,
  every service has a healthcheck
- Every file the compose stack mounts or builds from exists
- `.env` is git-ignored; `.env.example` ships placeholders only

---

## Not verified, and why

The sandbox has **no Docker daemon, no Maven, and only JDK 11**, and **Maven Central is
unreachable** through the proxy (npm is reachable, which is why the Angular compile was
possible). So the following have **not** been executed:

| Step | Command | What it would catch |
|---|---|---|
| Backend compile | `cd backend && mvn clean compile` | type errors and third-party API mismatches in the Java code |
| Unit tests | `mvn test` | assertion failures in the business rules |
| Integration tests | `mvn verify` | Flyway migration execution, Hibernate schema validation, the DB-level constraints |
| Frontend bundle | `cd frontend && npm install && npm run build` | bundling, budgets, asset resolution (the *code* is already verified by `ngc`) |
| Full stack | `cd docker && docker compose up -d` | container wiring, healthchecks, real end-to-end boot |

**The frontend code is verified; the backend code is not.** For the backend, syntax and
cross-reference checking is a strong filter but not a compiler. The Angular experience is
instructive here: static checks passed cleanly and the real compiler still found six genuine
bugs. Expect the same on the first `mvn compile` — the likely candidates are third-party API
details rather than logic:

- **jjwt 0.12.x** builder and parser methods (`verifyWith`, `parseSignedClaims`, `signWith`)
- **Hibernate 6.6** `@JdbcTypeCode(SqlTypes.NAMED_ENUM)` against the native PostgreSQL enums,
  and `SqlTypes.ARRAY` on the `String[]` mapped to `text[]`
- **hypersistence-utils-hibernate-63** `JsonBinaryType` on the JSONB columns
- unused imports and fields, which are warnings rather than errors

The two things most likely to actually matter are already independently verified: the SQL
parses against the real PostgreSQL grammar, and all 49 entity mappings match the schema
column-for-column — so `ddl-auto: validate` should pass on first boot.

---

## What running the project actually requires

The stack cannot be launched from this sandbox: there is no Docker daemon, and the shell here
is isolated from your machine. Launching it is a single command on your side, and the section
below is the order that gives the fastest feedback.

---

## Recommended first run

```bash
# 1. Schema and backend compile first — the foundation
cd backend
mvn clean compile

# 2. Unit tests: no Docker needed, fast feedback on the business rules
mvn test

# 3. Integration tests: Testcontainers boots a real PostgreSQL and runs all 30 migrations.
#    This is the step that proves the schema and the entity mappings agree.
mvn verify

# 4. Frontend
cd ../frontend
npm install
npm run build

# 5. Whole stack
cd ../docker
docker compose up -d
docker compose logs -f backend
```

If step 3 passes, the data model is sound — that is the part of this system that is hardest to
fix later, and it is the part that was most thoroughly verified here.
