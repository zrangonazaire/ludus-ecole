-- Hibernate maps Java String to VARCHAR. V36 created this column as CHAR(3),
-- which PostgreSQL reports as bpchar and therefore fails ddl-auto validation.
ALTER TABLE student_departure
    ALTER COLUMN currency TYPE VARCHAR(3) USING BTRIM(currency);
