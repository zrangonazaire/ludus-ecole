-- =====================================================================
-- V1 - Required PostgreSQL extensions
-- =====================================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";      -- gen_random_uuid(), digest()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";     -- uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "unaccent";      -- accent-insensitive search
CREATE EXTENSION IF NOT EXISTS "pg_trgm";       -- fuzzy global search
CREATE EXTENSION IF NOT EXISTS "btree_gist";    -- exclusion constraints on timetable slots

-- Immutable wrapper so unaccent() can be used inside indexes.
CREATE OR REPLACE FUNCTION eduops_unaccent(text)
    RETURNS text
    LANGUAGE sql
    IMMUTABLE PARALLEL SAFE STRICT
AS $$ SELECT public.unaccent('public.unaccent'::regdictionary, $1) $$;

-- Generic updated_at trigger reused by every mutable table.
CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS trigger
    LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at := now();
    RETURN NEW;
END;
$$;
