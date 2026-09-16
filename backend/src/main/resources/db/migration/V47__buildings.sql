-- =====================================================================
-- V47 - Batiments geres comme des entites (l'ecran Batiments et salles)
--
-- L'entite Building existait en Java mais n'avait ni table ni endpoint : le
-- champ texte libre room.building servait de pis-aller. Cette migration cree
-- la table building et rattache les salles par building_id.
--
-- Migration douce : les noms de batiment deja saisis restent utilisables.
-- Pour chaque campus, un batiment est cree par nom distinct trouve dans
-- room.building (code normalise en majuscules), puis les salles sont
-- rattachees. La colonne texte est conservee pour l'historique mais n'est
-- plus ecrite par l'API.
--
-- Regles : code unique par campus (deux sites peuvent chacun avoir leur
-- BAT-A), archivage refuse tant qu'une salle active y est rattachee (le
-- service verifie, la contrainte RESTRICT protege la suppression brute).
-- =====================================================================

CREATE TABLE building (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campus_id  UUID NOT NULL REFERENCES campus(id) ON DELETE RESTRICT,
    code       VARCHAR(30)  NOT NULL,
    name       VARCHAR(120) NOT NULL,
    floors     INTEGER NOT NULL DEFAULT 0,
    status     common_status NOT NULL DEFAULT 'ACTIVE',
    version    BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID,
    updated_by UUID,
    CONSTRAINT uq_building_code UNIQUE (campus_id, code),
    CONSTRAINT ck_building_floors CHECK (floors >= 0)
);
CREATE TRIGGER trg_building_updated BEFORE UPDATE ON building
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_building_campus ON building(campus_id);

-- Rattachement des salles : nullable pour ne pas bloquer les salles sans
-- batiment declare. Une salle archivee garde son rattachement : l'historique
-- (emploi du temps passe) continue de dire ou le cours a eu lieu.
ALTER TABLE room
    ADD COLUMN building_id UUID REFERENCES building(id) ON DELETE RESTRICT;
CREATE INDEX ix_room_building ON room(building_id);

-- Reprise de l'existant : un batiment par (campus, nom distinct).
INSERT INTO building (campus_id, code, name, floors, status)
SELECT DISTINCT ON (r.campus_id, upper(regexp_replace(trim(r.building), '[^A-Za-z0-9-]', '', 'g')))
    r.campus_id,
    upper(regexp_replace(trim(r.building), '[^A-Za-z0-9-]', '', 'g')),
    trim(r.building),
    0,
    'ACTIVE'
FROM room r
WHERE r.building IS NOT NULL AND btrim(r.building) <> ''
  AND upper(regexp_replace(trim(r.building), '[^A-Za-z0-9-]', '', 'g')) <> ''
ON CONFLICT (campus_id, code) DO NOTHING;

UPDATE room r
SET building_id = b.id
FROM building b
WHERE b.campus_id = r.campus_id
  AND r.building IS NOT NULL AND btrim(r.building) <> ''
  AND b.code = upper(regexp_replace(trim(r.building), '[^A-Za-z0-9-]', '', 'g'))
  AND r.building_id IS NULL;
