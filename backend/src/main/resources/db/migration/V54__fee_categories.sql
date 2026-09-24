-- =====================================================================
-- V54 - Catégories de frais : de l'enum figé à une table par école.
--
-- Le enum `fee_category` limitait chaque école à huit rubriques écrites
-- dans le code. Une école doit pouvoir déclarer les siennes (« Frais de
-- dossier », « Basket »…) et les choisir en créant un type de frais.
--
-- La colonne fee_type.category garde son contenu : elle devient un code
-- VARCHAR référençant la nouvelle table par (school_id, category). L'API
-- ne change donc pas de forme — seul le libellé vient désormais de la BDD.
-- =====================================================================

-- Lecture de `school` pour le seed, sous RLS : Flyway n'a pas de locataire.
SET app.bypass_rls = 'on';

-- 1. Le type enum ne peut pas coexister avec une table du même nom :
--    la colonne passe d'abord en VARCHAR, puis l'enum est supprimé.
ALTER TABLE fee_type ALTER COLUMN category DROP DEFAULT;
ALTER TABLE fee_type ALTER COLUMN category TYPE VARCHAR(40) USING category::text;
ALTER TABLE fee_type ALTER COLUMN category SET DEFAULT 'OTHER';
DROP TYPE fee_category;

-- 2. La table des catégories, une ligne par rubrique et par école.
CREATE TABLE fee_category (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id   UUID NOT NULL REFERENCES school(id) ON DELETE RESTRICT,
    code        VARCHAR(40)  NOT NULL,
    label       VARCHAR(150) NOT NULL,
    status      common_status NOT NULL DEFAULT 'ACTIVE',
    version     BIGINT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_fee_category_code UNIQUE (school_id, code)
);
CREATE TRIGGER trg_fee_category_updated BEFORE UPDATE ON fee_category
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 3. Les huit rubriques d'origine, pour chaque école existante : ce sont
--    les seules valeurs que l'ancien enum pouvait contenir, donc les
--    seules que fee_type.category peut déjà référencer.
INSERT INTO fee_category (school_id, code, label)
SELECT s.id, v.code, v.label
FROM school s
CROSS JOIN (VALUES
    ('REGISTRATION', 'Inscription'),
    ('TUITION',      'Scolarité'),
    ('EXAM',         'Examens'),
    ('ACTIVITY',     'Activités'),
    ('UNIFORM',      'Tenue'),
    ('TRANSPORT',    'Transport'),
    ('CANTEEN',      'Cantine'),
    ('OTHER',        'Autre')
) AS v(code, label);

-- 4. Intégrité au niveau de la base : un type de frais ne peut pointer
--    vers une catégorie qui n'existe pas pour sa propre école.
ALTER TABLE fee_type
    ADD CONSTRAINT fk_fee_type_category
    FOREIGN KEY (school_id, category)
    REFERENCES fee_category (school_id, code);

-- 5. Isolation locataire, comme toute table portant school_id (V31).
ALTER TABLE fee_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_category FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON fee_category
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));
