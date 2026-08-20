-- =====================================================================
-- V32 - Align the existing schema with the JPA mappings.
--
-- The two association entities inherit BaseEntity and therefore require
-- the version column used by Hibernate's @Version mapping. String fields
-- mapped with @Column(length = ...) are VARCHAR in JPA, so convert the
-- legacy fixed-width CHAR columns to their mapped type as well.
-- =====================================================================

ALTER TABLE curriculum_subject
    ADD COLUMN IF NOT EXISTS version BIGINT NOT NULL DEFAULT 0;

ALTER TABLE student_guardian
    ADD COLUMN IF NOT EXISTS version BIGINT NOT NULL DEFAULT 0;

ALTER TABLE school
    ALTER COLUMN currency TYPE VARCHAR(3) USING BTRIM(currency);

ALTER TABLE subject
    ALTER COLUMN color_hex TYPE VARCHAR(7) USING BTRIM(color_hex);

ALTER TABLE fee_schedule
    ALTER COLUMN currency TYPE VARCHAR(3) USING BTRIM(currency);

ALTER TABLE student_fee
    ALTER COLUMN currency TYPE VARCHAR(3) USING BTRIM(currency);

ALTER TABLE invoice
    ALTER COLUMN currency TYPE VARCHAR(3) USING BTRIM(currency);

ALTER TABLE payment
    ALTER COLUMN currency TYPE VARCHAR(3) USING BTRIM(currency);

ALTER TABLE receipt
    ALTER COLUMN currency TYPE VARCHAR(3) USING BTRIM(currency);
