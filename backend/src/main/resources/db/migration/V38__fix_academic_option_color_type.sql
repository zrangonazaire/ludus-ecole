-- Hibernate maps Java String to VARCHAR. Keep the option colour consistent
-- with subject.color_hex and avoid fixed-width CHAR validation mismatches.
ALTER TABLE academic_option
    ALTER COLUMN color_hex TYPE VARCHAR(7) USING trim(color_hex);
