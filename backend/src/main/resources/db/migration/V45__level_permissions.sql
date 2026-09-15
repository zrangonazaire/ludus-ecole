-- =====================================================================
-- V45 - Niveaux : permissions dediees (l'ecran /levels a son API)
--
-- Les niveaux etaient geres sans endpoint dedie, sous couvert de droits
-- voisins. Desormais LEVEL_VIEW ouvre la lecture et LEVEL_MANAGE la
-- creation, la modification, l'archivage et la restauration.
--
-- V30 distribuait les permissions par CROSS JOIN : celles creees ici
-- doivent etre attribuees explicitement, aux profils systeme uniquement
-- (school_id IS NULL, voir V40/V41).
-- =====================================================================

INSERT INTO app_permission (code, label, module) VALUES
 ('LEVEL_VIEW',   'View levels',   'level'),
 ('LEVEL_MANAGE', 'Manage levels', 'level');

-- Les administrateurs et la direction voient et gerent la structure.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'LEVEL_VIEW','LEVEL_MANAGE')
WHERE r.school_id IS NULL AND r.code IN ('SUPER_ADMIN','SCHOOL_ADMIN','DIRECTOR');

-- Le responsable pedagogique gere la structure qu'il exploite au quotidien.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'LEVEL_VIEW','LEVEL_MANAGE')
WHERE r.school_id IS NULL AND r.code = 'ACADEMIC_MANAGER';

-- Le secretariat de scolarite et les enseignants lisent les niveaux pour
-- inscrire et noter, sans les modifier.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code = 'LEVEL_VIEW'
WHERE r.school_id IS NULL AND r.code IN ('REGISTRAR','SECRETARY','TEACHER');

-- Consultation en lecture seule : les niveaux aussi.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code = 'LEVEL_VIEW'
WHERE r.school_id IS NULL AND r.code = 'VIEWER';

-- Libelle francais, comme V33 pour les permissions existantes.
UPDATE app_permission SET label = v.label
FROM (VALUES
 ('LEVEL_VIEW','Consulter les niveaux'),
 ('LEVEL_MANAGE','Gérer les niveaux')
) AS v(code, label)
WHERE app_permission.code = v.code;
