-- =====================================================================
-- V36 - Departures: a pupil leaving the school during or after the year.
--
-- Distinct from enrollment_transfer, which records a change of class
-- inside the school. A departure ends the schooling here, and the family
-- leaves with paperwork the receiving school will ask for: the exeat and
-- the certificate of withdrawal. Without a row of its own there is nothing
-- to reprint two years later when somebody comes back for a duplicate.
-- =====================================================================

CREATE TYPE departure_reason AS ENUM (
    'TRANSFER_OUT',      -- part vers un autre etablissement
    'FAMILY_MOVE',       -- demenagement de la famille
    'FINANCIAL',         -- la famille ne peut plus assumer la scolarite
    'DISCIPLINARY',      -- exclusion definitive prononcee
    'ACADEMIC',          -- reorientation decidee par le conseil
    'HEALTH',
    'ABANDONMENT',       -- l'eleve ne revient plus, sans nouvelles
    'OTHER');

CREATE TYPE departure_status AS ENUM ('DRAFT', 'RECORDED', 'CLEARED', 'CANCELLED');

CREATE TABLE student_departure (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id          UUID NOT NULL REFERENCES student(id)       ON DELETE RESTRICT,
    enrollment_id       UUID NOT NULL REFERENCES enrollment(id)    ON DELETE RESTRICT,
    classroom_id        UUID NOT NULL REFERENCES classroom(id)     ON DELETE RESTRICT,
    academic_year_id    UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,

    reason              departure_reason NOT NULL DEFAULT 'OTHER',
    departure_date      DATE NOT NULL,
    -- Renseigne seulement pour un depart vers un autre etablissement.
    destination_school  VARCHAR(200),
    destination_city    VARCHAR(120),
    notes               TEXT,

    -- Le solde du au moment de la sortie, fige ici. Le recalculer plus tard
    -- donnerait un autre chiffre : les frais de l'annee suivante seraient
    -- comptes, et le dossier ne correspondrait plus a ce qui a ete dit a la
    -- famille le jour du depart.
    outstanding_amount  NUMERIC(14,2) NOT NULL DEFAULT 0,
    currency            CHAR(3) NOT NULL DEFAULT 'XOF',

    -- Les pieces remises, cochees une a une par le secretariat.
    exeat_issued        BOOLEAN NOT NULL DEFAULT FALSE,
    certificate_issued  BOOLEAN NOT NULL DEFAULT FALSE,
    report_card_issued  BOOLEAN NOT NULL DEFAULT FALSE,
    file_returned       BOOLEAN NOT NULL DEFAULT FALSE,

    status              departure_status NOT NULL DEFAULT 'RECORDED',
    recorded_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    recorded_by         UUID REFERENCES app_user(id),
    cleared_at          TIMESTAMPTZ,
    cleared_by          UUID REFERENCES app_user(id),
    cancelled_reason    TEXT,

    version             BIGINT NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT ck_departure_amount CHECK (outstanding_amount >= 0),
    -- Un depart vers un autre etablissement sans nom d'etablissement produit
    -- un exeat que l'ecole d'accueil ne peut pas rapprocher.
    CONSTRAINT ck_departure_destination CHECK (
        reason <> 'TRANSFER_OUT' OR destination_school IS NOT NULL),
    CONSTRAINT ck_departure_cleared CHECK (
        status <> 'CLEARED' OR cleared_at IS NOT NULL),
    CONSTRAINT ck_departure_cancelled CHECK (
        status <> 'CANCELLED' OR cancelled_reason IS NOT NULL)
);
CREATE TRIGGER trg_student_departure_updated BEFORE UPDATE ON student_departure
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Une seule sortie vivante par inscription : deux radiations pour la meme
-- annee scolaire decriraient deux histoires differentes du meme eleve.
CREATE UNIQUE INDEX uq_student_departure_live ON student_departure(enrollment_id)
    WHERE status <> 'CANCELLED';

CREATE INDEX ix_student_departure_year ON student_departure(academic_year_id, status);
CREATE INDEX ix_student_departure_date ON student_departure(departure_date DESC);

-- Cette table est creee apres V31 et recoit donc sa RLS ici. La cloison passe
-- par l'annee scolaire, qui porte l'ecole.
ALTER TABLE student_departure ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_departure FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON student_departure
    USING (EXISTS (
        SELECT 1 FROM academic_year y
        WHERE y.id = student_departure.academic_year_id
          AND y.school_id = NULLIF(current_setting('app.current_school_id', true), '')::uuid))
    WITH CHECK (EXISTS (
        SELECT 1 FROM academic_year y
        WHERE y.id = student_departure.academic_year_id
          AND y.school_id = NULLIF(current_setting('app.current_school_id', true), '')::uuid));

COMMENT ON TABLE student_departure IS
    'Sortie d''un eleve de l''etablissement : motif, date, destination, pieces remises.';
COMMENT ON COLUMN student_departure.outstanding_amount IS
    'Solde du le jour du depart, fige. Sert de reference si la famille revient.';
