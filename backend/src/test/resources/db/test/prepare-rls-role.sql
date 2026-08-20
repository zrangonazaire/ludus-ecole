-- Testcontainers creates POSTGRES_USER as a superuser. PostgreSQL superusers
-- always bypass RLS, including policies on tables with FORCE ROW LEVEL
-- SECURITY, which would make TenantIsolationIT incapable of testing the
-- production guarantee. Keep that account for container administration and
-- give the application a distinct, non-privileged database owner.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

CREATE ROLE eduops_app_test
    LOGIN
    PASSWORD 'eduops_app_test'
    NOSUPERUSER
    NOCREATEDB
    NOCREATEROLE
    NOREPLICATION
    NOBYPASSRLS;

ALTER DATABASE eduops_test OWNER TO eduops_app_test;
ALTER SCHEMA public OWNER TO eduops_app_test;
