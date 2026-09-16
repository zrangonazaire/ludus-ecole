-- =====================================================================
-- V46 - Salles : permissions dediees (l'ecran Batiments et salles a son API)
--
-- Le module salle existait en base depuis V4 (table room) mais n'avait ni
-- endpoint ni permission : la table restait vide et aucun ecran ne pouvait
-- la remplir. ROOM_VIEW ouvre la lecture, ROOM_MANAGE la creation, la
-- modification, l'archivage et la restauration.
--
-- Cette migration repare aussi une omission de V30 : CAMPUS_VIEW et
-- CAMPUS_MANAGE n'ont jamais ete inserees dans app_permission, alors que
-- CampusController les exige depuis sa creation. Les endpoints
-- /api/v1/campuses repondaient donc 403 a tout le monde, y compris au
-- SUPER_ADMIN, et l'ecran Campus et salles ne pouvait rien afficher.
--
-- V30 distribuait les permissions par CROSS JOIN a un instant donne : les
-- codes crees apres coup doivent etre attribues explicitement, aux profils
-- systeme uniquement (school_id IS NULL, voir V40/V41/V45).
-- =====================================================================

-- ON CONFLICT : sur une base ou la reparation aurait deja ete jouee a la
-- main, l'insertion ne doit pas faire echouer la migration suivante.
INSERT INTO app_permission (code, label, module) VALUES
 ('CAMPUS_VIEW',  'Consulter les campus',  'campus'),
 ('CAMPUS_MANAGE','Gérer les campus',      'campus'),
 ('ROOM_VIEW',    'Consulter les salles',  'room'),
 ('ROOM_MANAGE',  'Gérer les salles',      'room')
ON CONFLICT (code) DO NOTHING;

-- Les administrateurs et la direction voient et gerent les lieux.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'CAMPUS_VIEW','CAMPUS_MANAGE','ROOM_VIEW','ROOM_MANAGE')
WHERE r.school_id IS NULL AND r.code IN ('SUPER_ADMIN','SCHOOL_ADMIN','DIRECTOR')
ON CONFLICT DO NOTHING;

-- Le responsable pedagogique place les cours : il lui faut les salles, et
-- les campus pour comprendre ou elles se trouvent.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'CAMPUS_VIEW','ROOM_VIEW','ROOM_MANAGE')
WHERE r.school_id IS NULL AND r.code = 'ACADEMIC_MANAGER'
ON CONFLICT DO NOTHING;

-- Le secretariat inscrit dans des salles et les enseignants y font l'appel :
-- lecture seule, pour choisir une salle et lire l'emploi du temps.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'CAMPUS_VIEW','ROOM_VIEW')
WHERE r.school_id IS NULL AND r.code IN ('REGISTRAR','SECRETARY','TEACHER')
ON CONFLICT DO NOTHING;

-- Consultation en lecture seule : les lieux aussi.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'CAMPUS_VIEW','ROOM_VIEW')
WHERE r.school_id IS NULL AND r.code = 'VIEWER'
ON CONFLICT DO NOTHING;

-- Les profils personnalises crees dans une ecole (V40) sont des copies
-- figees : ils ne suivent pas les evolutions du profil systeme d'origine, et
-- V40 ne conserve pas de lien vers lui. On ne devine donc pas l'intention :
-- seuls les profils qui detiennent deja toutes les permissions de
-- SCHOOL_ADMIN recoivent les nouveaux codes. Un profil copie de TEACHER ne
-- doit pas se retrouver, du jour au lendemain, capable de gerer les campus.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT custom.id, p.id
FROM app_role custom
JOIN app_permission p ON p.code IN (
    'CAMPUS_VIEW','CAMPUS_MANAGE','ROOM_VIEW','ROOM_MANAGE')
WHERE custom.school_id IS NOT NULL
  AND NOT EXISTS (
      SELECT 1
      FROM app_role source
      JOIN app_role_permission sp ON sp.role_id = source.id
      WHERE source.school_id IS NULL AND source.code = 'SCHOOL_ADMIN'
        AND NOT EXISTS (
            SELECT 1 FROM app_role_permission own
            WHERE own.role_id = custom.id
              AND own.permission_id = sp.permission_id
        )
  )
ON CONFLICT DO NOTHING;