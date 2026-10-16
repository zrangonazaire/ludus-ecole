-- =====================================================================
-- SEED COMPLET ET EVOLUE POUR EDUOPS / LUDUS-ECOLE
-- Etablissement : GROUPE EPP KONANKRO (id: 91f07b93-1835-4b7b-ae3f-f48de760c204)
-- Annee academique : 2026-2027 (id: 5a9ba129-8f4a-4e37-bd46-a61a89cdbe7f)
-- =====================================================================

SET app.bypass_rls = 'on';

DO $$
DECLARE
    v_school_id UUID := '91f07b93-1835-4b7b-ae3f-f48de760c204';
    v_year_id   UUID := '5a9ba129-8f4a-4e37-bd46-a61a89cdbe7f';
    v_t1_id     UUID := 'ef2ede62-12a7-4e4d-9e06-caa3741fb754';
    v_t2_id     UUID := 'dc251052-01de-41e3-b505-ab7203306ac4';
    v_t3_id     UUID := 'bf3836b9-284a-48e3-9a03-29d86a516599';
    v_campus_id UUID;
    v_bldg_a    UUID;
    v_bldg_b    UUID;
    v_bldg_c    UUID;
    v_room_101  UUID;
    v_room_102  UUID;
    v_room_labo UUID;
    v_room_eps  UUID;
    v_admin_pwd VARCHAR(255) := '$2a$12$9NcPdqDtGIDw45KDqcqVm.jf0.dDVcgRCimYTE6XUwm3umKloSL9u'; -- 'ChangeMe!2026'
    
    -- Roles
    v_role_super_admin UUID;
    v_role_school_admin UUID;
    v_role_director UUID;
    v_role_academic_mgr UUID;
    v_role_accountant UUID;
    v_role_cashier UUID;
    v_role_teacher UUID;
    v_role_discipline UUID;
    v_role_secretary UUID;
    v_role_parent UUID;
    v_role_student UUID;
    
    -- Users
    v_user_tadmin UUID;
    v_user_dir UUID;
    v_user_caisse UUID;
    v_user_compta UUID;
    v_user_acad UUID;
    v_user_disc UUID;
    v_user_prof_mat UUID;
    v_user_prof_fra UUID;
    v_user_prof_ang UUID;
    v_user_prof_pc UUID;
    v_user_prof_svt UUID;
    v_user_prof_hg UUID;
    v_user_prof_eps UUID;
    v_user_parent UUID;
    v_user_student UUID;
    
    -- Teachers
    v_tch_mat UUID;
    v_tch_fra UUID;
    v_tch_ang UUID;
    v_tch_pc  UUID;
    v_tch_svt UUID;
    v_tch_hg  UUID;
    v_tch_eps UUID;

    -- Classes
    v_class_6a UUID := '1344c60d-16f8-4a5c-be11-09c26b5d25c4';
    v_class_6b UUID := 'f2b23e39-dd3b-4a65-b13f-d27b5e4f2b52';
    v_class_5a UUID := 'b5b9f297-cb50-4aea-bc74-e248326234e7';
    v_class_4a UUID := '2f8a6ca7-d091-4518-bb62-34ccdf29c8dc';
    v_class_3a UUID := '66e8c2b5-65d7-4e01-b068-6243fb865995';
    v_class_cm2a UUID := 'e2d4bbdb-97e5-4a21-bb73-2da109bae5df';

    -- Subjects
    v_sub_mat UUID := '5a828cc9-b365-4f1b-9057-4c877e9173dd';
    v_sub_fra UUID := '9022ba1c-b0cb-4805-ab42-6b317e0e00fa';
    v_sub_ang UUID := 'fe18d1f9-9eae-472b-ad32-28536dd6db62';
    v_sub_pc  UUID := '8e63fef3-9761-47a3-ba45-f583dbe066cc';
    v_sub_svt UUID := 'fc844021-4b3d-4494-b431-4f27b2fe8e3d';
    v_sub_hg  UUID := '6ad3a105-6155-42fd-937d-97494c3d7244';
    v_sub_eps UUID := 'bae6d383-2bc6-4e74-a541-d30e0bcfc101';

    -- Timetable
    v_tt_6a UUID;
    v_tt_3a UUID;
    v_slot_1 UUID;
    v_slot_2 UUID;
    v_slot_3 UUID;
    v_slot_4 UUID;
    v_slot_5 UUID;
    v_sess_1 UUID;
    v_sess_2 UUID;
    v_att_sess_1 UUID;
    v_att_sess_2 UUID;

    -- Cashier
    v_cash_closed UUID;
    v_cash_open UUID;
    
    -- Student & Guardian demo
    v_demo_student_id UUID;
    v_demo_guardian_id UUID;
    v_demo_enrollment_id UUID;

    -- Variables de boucle
    s_rec RECORD;
    lvl_rec RECORD;
BEGIN
    RAISE NOTICE '>>> Demarrage de l''injection des donnees de test EduOps...';

    -- 0. RECUPERER LES ROLES
    SELECT id INTO v_role_super_admin FROM app_role WHERE code = 'SUPER_ADMIN';
    SELECT id INTO v_role_school_admin FROM app_role WHERE code = 'SCHOOL_ADMIN';
    SELECT id INTO v_role_director FROM app_role WHERE code = 'DIRECTOR';
    SELECT id INTO v_role_academic_mgr FROM app_role WHERE code = 'ACADEMIC_MANAGER';
    SELECT id INTO v_role_accountant FROM app_role WHERE code = 'ACCOUNTANT';
    SELECT id INTO v_role_cashier FROM app_role WHERE code = 'CASHIER';
    SELECT id INTO v_role_teacher FROM app_role WHERE code = 'TEACHER';
    SELECT id INTO v_role_discipline FROM app_role WHERE code = 'DISCIPLINE_MANAGER';
    SELECT id INTO v_role_secretary FROM app_role WHERE code = 'SECRETARY';
    SELECT id INTO v_role_parent FROM app_role WHERE code = 'PARENT';
    SELECT id INTO v_role_student FROM app_role WHERE code = 'STUDENT';

    -- S'assurer que le campus principal existe
    SELECT id INTO v_campus_id FROM campus WHERE school_id = v_school_id ORDER BY is_main DESC LIMIT 1;
    IF v_campus_id IS NULL THEN
        INSERT INTO campus (id, school_id, code, name, is_main, status)
        VALUES (gen_random_uuid(), v_school_id, 'CP-PRINCIPAL', 'Campus Principal Konankro', true, 'ACTIVE')
        RETURNING id INTO v_campus_id;
    END IF;

    -- Ajuster les dates du trimestre T1 pour permettre la saisie et validation des notes
    UPDATE term
    SET grade_entry_start_at = '2026-09-15 00:00:00+00',
        grade_entry_end_at   = '2026-12-20 23:59:59+00',
        status = 'OPEN'
    WHERE id = v_t1_id;

    -- 1. BATIMENTS ET SALLES
    INSERT INTO building (id, campus_id, code, name, floors, status)
    VALUES 
        (gen_random_uuid(), v_campus_id, 'BAT-A', 'Bâtiment A - Enseignement Général', 2, 'ACTIVE'),
        (gen_random_uuid(), v_campus_id, 'BAT-B', 'Bâtiment B - Sciences & Laboratoires', 1, 'ACTIVE'),
        (gen_random_uuid(), v_campus_id, 'BAT-C', 'Bâtiment C - Primaire & Activités', 1, 'ACTIVE')
    ON CONFLICT (campus_id, code) DO UPDATE SET name = EXCLUDED.name;

    SELECT id INTO v_bldg_a FROM building WHERE campus_id = v_campus_id AND code = 'BAT-A' LIMIT 1;
    SELECT id INTO v_bldg_b FROM building WHERE campus_id = v_campus_id AND code = 'BAT-B' LIMIT 1;
    SELECT id INTO v_bldg_c FROM building WHERE campus_id = v_campus_id AND code = 'BAT-C' LIMIT 1;

    INSERT INTO room (id, campus_id, building_id, code, name, capacity, room_type, status)
    VALUES
        (gen_random_uuid(), v_campus_id, v_bldg_a, 'SALLE-101', 'Salle 101 (6ème A)', 45, 'CLASSROOM', 'ACTIVE'),
        (gen_random_uuid(), v_campus_id, v_bldg_a, 'SALLE-102', 'Salle 102 (6ème B)', 45, 'CLASSROOM', 'ACTIVE'),
        (gen_random_uuid(), v_campus_id, v_bldg_a, 'SALLE-201', 'Salle 201 (3ème A)', 40, 'CLASSROOM', 'ACTIVE'),
        (gen_random_uuid(), v_campus_id, v_bldg_b, 'LABO-SC',   'Laboratoire SVT & Chimie', 35, 'LABORATORY', 'ACTIVE'),
        (gen_random_uuid(), v_campus_id, v_bldg_c, 'TERRAIN-EPS','Terrain de sport omnisports', 100, 'SPORTS', 'ACTIVE')
    ON CONFLICT (campus_id, code) DO UPDATE SET name = EXCLUDED.name;

    SELECT id INTO v_room_101 FROM room WHERE campus_id = v_campus_id AND code = 'SALLE-101';
    SELECT id INTO v_room_102 FROM room WHERE campus_id = v_campus_id AND code = 'SALLE-102';
    SELECT id INTO v_room_labo FROM room WHERE campus_id = v_campus_id AND code = 'LABO-SC';
    SELECT id INTO v_room_eps  FROM room WHERE campus_id = v_campus_id AND code = 'TERRAIN-EPS';

    UPDATE classroom SET default_room_id = v_room_101 WHERE id = v_class_6a;
    UPDATE classroom SET default_room_id = v_room_102 WHERE id = v_class_6b;
    UPDATE classroom SET default_room_id = v_room_101 WHERE id = v_class_3a;

    -- 2. COMPTES UTILISATEURS DU PERSONNEL (Password: ChangeMe!2026 pour tous)
    -- MAJ comptes existants
    UPDATE app_user SET password_hash = v_admin_pwd, must_change_password = false WHERE email IN (
        'admin@eduops.local', 'tadmin@soocloo.com', 'testdirection@soocloo.com', 'testcaisse@soocloo.com', 'zrangonazaire@gmail.com'
    );

    -- Creer direction, gestion pedagogique, comptabilite, surveillant
    SELECT id INTO v_user_dir FROM app_user WHERE email = 'testdirection@soocloo.com';
    SELECT id INTO v_user_caisse FROM app_user WHERE email = 'testcaisse@soocloo.com';
    SELECT id INTO v_user_tadmin FROM app_user WHERE email = 'tadmin@soocloo.com';

    -- Comptable
    INSERT INTO app_user (id, username, email, password_hash, first_name, last_name, school_id, status, must_change_password)
    VALUES (gen_random_uuid(), 'comptable', 'compta@soocloo.com', v_admin_pwd, 'Pauline', 'Aman', v_school_id, 'ACTIVE', false)
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, must_change_password = false
    RETURNING id INTO v_user_compta;
    SELECT id INTO v_user_compta FROM app_user WHERE email = 'compta@soocloo.com';
    INSERT INTO app_user_role (user_id, role_id) VALUES (v_user_compta, v_role_accountant) ON CONFLICT DO NOTHING;

    -- Responsable Pedagogique
    INSERT INTO app_user (id, username, email, password_hash, first_name, last_name, school_id, status, must_change_password)
    VALUES (gen_random_uuid(), 'pedagogie', 'pedagogie@soocloo.com', v_admin_pwd, 'Marc', 'Dago', v_school_id, 'ACTIVE', false)
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, must_change_password = false
    RETURNING id INTO v_user_acad;
    SELECT id INTO v_user_acad FROM app_user WHERE email = 'pedagogie@soocloo.com';
    INSERT INTO app_user_role (user_id, role_id) VALUES (v_user_acad, v_role_academic_mgr) ON CONFLICT DO NOTHING;

    -- Surveillant General
    INSERT INTO app_user (id, username, email, password_hash, first_name, last_name, school_id, status, must_change_password)
    VALUES (gen_random_uuid(), 'surveillant', 'surveillant@soocloo.com', v_admin_pwd, 'Amara', 'Toure', v_school_id, 'ACTIVE', false)
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, must_change_password = false
    RETURNING id INTO v_user_disc;
    SELECT id INTO v_user_disc FROM app_user WHERE email = 'surveillant@soocloo.com';
    INSERT INTO app_user_role (user_id, role_id) VALUES (v_user_disc, v_role_discipline) ON CONFLICT DO NOTHING;

    -- 3. CORPS ENSEIGNANT AVEC COMPTES ET PROFILS COMPLETS
    -- Prof de Mathematiques
    INSERT INTO app_user (id, username, email, password_hash, first_name, last_name, school_id, status, must_change_password)
    VALUES (gen_random_uuid(), 'prof.maths', 'prof.maths@soocloo.com', v_admin_pwd, 'Kouassi', 'N''Guessan', v_school_id, 'ACTIVE', false)
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, must_change_password = false
    RETURNING id INTO v_user_prof_mat;
    SELECT id INTO v_user_prof_mat FROM app_user WHERE email = 'prof.maths@soocloo.com';
    INSERT INTO app_user_role (user_id, role_id) VALUES (v_user_prof_mat, v_role_teacher) ON CONFLICT DO NOTHING;

    INSERT INTO teacher (id, school_id, employee_number, first_name, last_name, email, phone, speciality, qualification, hire_date, contract_type, user_account_id, status)
    VALUES (gen_random_uuid(), v_school_id, 'ENS-2026-0010', 'Kouassi', 'N''Guessan', 'prof.maths@soocloo.com', '+225 0701020304', 'Mathematiques', 'CAPES Mathematiques', '2022-09-01', 'PERMANENT', v_user_prof_mat, 'ACTIVE')
    ON CONFLICT (school_id, email) DO UPDATE SET user_account_id = EXCLUDED.user_account_id
    RETURNING id INTO v_tch_mat;
    SELECT id INTO v_tch_mat FROM teacher WHERE school_id = v_school_id AND email = 'prof.maths@soocloo.com';

    -- Prof de Francais
    INSERT INTO app_user (id, username, email, password_hash, first_name, last_name, school_id, status, must_change_password)
    VALUES (gen_random_uuid(), 'prof.francais', 'prof.francais@soocloo.com', v_admin_pwd, 'Adjoua', 'Bamba', v_school_id, 'ACTIVE', false)
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, must_change_password = false
    RETURNING id INTO v_user_prof_fra;
    SELECT id INTO v_user_prof_fra FROM app_user WHERE email = 'prof.francais@soocloo.com';
    INSERT INTO app_user_role (user_id, role_id) VALUES (v_user_prof_fra, v_role_teacher) ON CONFLICT DO NOTHING;

    INSERT INTO teacher (id, school_id, employee_number, first_name, last_name, email, phone, speciality, qualification, hire_date, contract_type, user_account_id, status)
    VALUES (gen_random_uuid(), v_school_id, 'ENS-2026-0011', 'Adjoua', 'Bamba', 'prof.francais@soocloo.com', '+225 0705060708', 'Français', 'Master Lettres Modernes', '2023-09-01', 'PERMANENT', v_user_prof_fra, 'ACTIVE')
    ON CONFLICT (school_id, email) DO UPDATE SET user_account_id = EXCLUDED.user_account_id
    RETURNING id INTO v_tch_fra;
    SELECT id INTO v_tch_fra FROM teacher WHERE school_id = v_school_id AND email = 'prof.francais@soocloo.com';

    -- Prof d'Anglais
    INSERT INTO app_user (id, username, email, password_hash, first_name, last_name, school_id, status, must_change_password)
    VALUES (gen_random_uuid(), 'prof.anglais', 'prof.anglais@soocloo.com', v_admin_pwd, 'Fatou', 'Diallo', v_school_id, 'ACTIVE', false)
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, must_change_password = false
    RETURNING id INTO v_user_prof_ang;
    SELECT id INTO v_user_prof_ang FROM app_user WHERE email = 'prof.anglais@soocloo.com';
    INSERT INTO app_user_role (user_id, role_id) VALUES (v_user_prof_ang, v_role_teacher) ON CONFLICT DO NOTHING;

    INSERT INTO teacher (id, school_id, employee_number, first_name, last_name, email, phone, speciality, qualification, hire_date, contract_type, user_account_id, status)
    VALUES (gen_random_uuid(), v_school_id, 'ENS-2026-0012', 'Fatou', 'Diallo', 'prof.anglais@soocloo.com', '+225 0709101112', 'Anglais', 'Licence Anglais', '2024-09-01', 'PERMANENT', v_user_prof_ang, 'ACTIVE')
    ON CONFLICT (school_id, email) DO UPDATE SET user_account_id = EXCLUDED.user_account_id
    RETURNING id INTO v_tch_ang;
    SELECT id INTO v_tch_ang FROM teacher WHERE school_id = v_school_id AND email = 'prof.anglais@soocloo.com';

    -- Prof de Physique-Chimie
    INSERT INTO app_user (id, username, email, password_hash, first_name, last_name, school_id, status, must_change_password)
    VALUES (gen_random_uuid(), 'prof.pc', 'prof.pc@soocloo.com', v_admin_pwd, 'Ibrahim', 'Cisse', v_school_id, 'ACTIVE', false)
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, must_change_password = false
    RETURNING id INTO v_user_prof_pc;
    SELECT id INTO v_user_prof_pc FROM app_user WHERE email = 'prof.pc@soocloo.com';
    INSERT INTO app_user_role (user_id, role_id) VALUES (v_user_prof_pc, v_role_teacher) ON CONFLICT DO NOTHING;

    INSERT INTO teacher (id, school_id, employee_number, first_name, last_name, email, phone, speciality, qualification, hire_date, contract_type, user_account_id, status)
    VALUES (gen_random_uuid(), v_school_id, 'ENS-2026-0013', 'Ibrahim', 'Cisse', 'prof.pc@soocloo.com', '+225 0713141516', 'Physique-Chimie', 'Master Sciences Physiques', '2021-09-01', 'PERMANENT', v_user_prof_pc, 'ACTIVE')
    ON CONFLICT (school_id, email) DO UPDATE SET user_account_id = EXCLUDED.user_account_id
    RETURNING id INTO v_tch_pc;
    SELECT id INTO v_tch_pc FROM teacher WHERE school_id = v_school_id AND email = 'prof.pc@soocloo.com';

    -- Prof de SVT
    INSERT INTO app_user (id, username, email, password_hash, first_name, last_name, school_id, status, must_change_password)
    VALUES (gen_random_uuid(), 'prof.svt', 'prof.svt@soocloo.com', v_admin_pwd, 'Yao', 'Kouame', v_school_id, 'ACTIVE', false)
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, must_change_password = false
    RETURNING id INTO v_user_prof_svt;
    SELECT id INTO v_user_prof_svt FROM app_user WHERE email = 'prof.svt@soocloo.com';
    INSERT INTO app_user_role (user_id, role_id) VALUES (v_user_prof_svt, v_role_teacher) ON CONFLICT DO NOTHING;

    INSERT INTO teacher (id, school_id, employee_number, first_name, last_name, email, phone, speciality, qualification, hire_date, contract_type, user_account_id, status)
    VALUES (gen_random_uuid(), v_school_id, 'ENS-2026-0014', 'Yao', 'Kouame', 'prof.svt@soocloo.com', '+225 0717181920', 'Sciences de la Vie et de la Terre', 'CAPES SVT', '2020-09-01', 'PERMANENT', v_user_prof_svt, 'ACTIVE')
    ON CONFLICT (school_id, email) DO UPDATE SET user_account_id = EXCLUDED.user_account_id
    RETURNING id INTO v_tch_svt;
    SELECT id INTO v_tch_svt FROM teacher WHERE school_id = v_school_id AND email = 'prof.svt@soocloo.com';

    -- Prof d'Histoire-Geo
    INSERT INTO app_user (id, username, email, password_hash, first_name, last_name, school_id, status, must_change_password)
    VALUES (gen_random_uuid(), 'prof.hg', 'prof.hg@soocloo.com', v_admin_pwd, 'Awa', 'Sanogo', v_school_id, 'ACTIVE', false)
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, must_change_password = false
    RETURNING id INTO v_user_prof_hg;
    SELECT id INTO v_user_prof_hg FROM app_user WHERE email = 'prof.hg@soocloo.com';
    INSERT INTO app_user_role (user_id, role_id) VALUES (v_user_prof_hg, v_role_teacher) ON CONFLICT DO NOTHING;

    INSERT INTO teacher (id, school_id, employee_number, first_name, last_name, email, phone, speciality, qualification, hire_date, contract_type, user_account_id, status)
    VALUES (gen_random_uuid(), v_school_id, 'ENS-2026-0015', 'Awa', 'Sanogo', 'prof.hg@soocloo.com', '+225 0721222324', 'Histoire-Geographie', 'Master Histoire', '2022-09-01', 'PERMANENT', v_user_prof_hg, 'ACTIVE')
    ON CONFLICT (school_id, email) DO UPDATE SET user_account_id = EXCLUDED.user_account_id
    RETURNING id INTO v_tch_hg;
    SELECT id INTO v_tch_hg FROM teacher WHERE school_id = v_school_id AND email = 'prof.hg@soocloo.com';

    -- Prof d'EPS
    INSERT INTO app_user (id, username, email, password_hash, first_name, last_name, school_id, status, must_change_password)
    VALUES (gen_random_uuid(), 'prof.eps', 'prof.eps@soocloo.com', v_admin_pwd, 'Sekou', 'Traore', v_school_id, 'ACTIVE', false)
    ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, must_change_password = false
    RETURNING id INTO v_user_prof_eps;
    SELECT id INTO v_user_prof_eps FROM app_user WHERE email = 'prof.eps@soocloo.com';
    INSERT INTO app_user_role (user_id, role_id) VALUES (v_user_prof_eps, v_role_teacher) ON CONFLICT DO NOTHING;

    INSERT INTO teacher (id, school_id, employee_number, first_name, last_name, email, phone, speciality, qualification, hire_date, contract_type, user_account_id, status)
    VALUES (gen_random_uuid(), v_school_id, 'ENS-2026-0016', 'Sekou', 'Traore', 'prof.eps@soocloo.com', '+225 0725262728', 'Education Physique et Sportive', 'Professeur Certifie EPS', '2021-09-01', 'PERMANENT', v_user_prof_eps, 'ACTIVE')
    ON CONFLICT (school_id, email) DO UPDATE SET user_account_id = EXCLUDED.user_account_id
    RETURNING id INTO v_tch_eps;
    SELECT id INTO v_tch_eps FROM teacher WHERE school_id = v_school_id AND email = 'prof.eps@soocloo.com';

    -- Associations Enseignant <-> Matieres (teacher_subject)
    INSERT INTO teacher_subject (teacher_id, subject_id) VALUES
        (v_tch_mat, v_sub_mat),
        (v_tch_fra, v_sub_fra),
        (v_tch_ang, v_sub_ang),
        (v_tch_pc,  v_sub_pc),
        (v_tch_svt, v_sub_svt),
        (v_tch_hg,  v_sub_hg),
        (v_tch_eps, v_sub_eps)
    ON CONFLICT DO NOTHING;

    -- Enseignant principal de 6eme A = Prof de Maths
    UPDATE classroom SET main_teacher_id = v_tch_mat WHERE id = v_class_6a;
    -- Enseignant principal de 3eme A = Prof de Francais
    UPDATE classroom SET main_teacher_id = v_tch_fra WHERE id = v_class_3a;

    -- Affectations d'enseignants (teacher_assignment) pour 6eme A et 3eme A
    DELETE FROM teacher_assignment WHERE academic_year_id = v_year_id AND classroom_id IN (v_class_6a, v_class_3a);

    INSERT INTO teacher_assignment (academic_year_id, classroom_id, subject_id, teacher_id, weekly_hours, is_main_teacher, status)
    VALUES
        (v_year_id, v_class_6a, v_sub_mat, v_tch_mat, 5.0, true, 'ACTIVE'),
        (v_year_id, v_class_6a, v_sub_fra, v_tch_fra, 5.0, false, 'ACTIVE'),
        (v_year_id, v_class_6a, v_sub_ang, v_tch_ang, 3.0, false, 'ACTIVE'),
        (v_year_id, v_class_6a, v_sub_pc,  v_tch_pc,  2.0, false, 'ACTIVE'),
        (v_year_id, v_class_6a, v_sub_svt, v_tch_svt, 2.0, false, 'ACTIVE'),
        (v_year_id, v_class_6a, v_sub_hg,  v_tch_hg,  3.0, false, 'ACTIVE'),
        (v_year_id, v_class_6a, v_sub_eps, v_tch_eps, 2.0, false, 'ACTIVE'),
        -- 3eme A
        (v_year_id, v_class_3a, v_sub_fra, v_tch_fra, 5.0, true, 'ACTIVE'),
        (v_year_id, v_class_3a, v_sub_mat, v_tch_mat, 5.0, false, 'ACTIVE'),
        (v_year_id, v_class_3a, v_sub_ang, v_tch_ang, 3.0, false, 'ACTIVE'),
        (v_year_id, v_class_3a, v_sub_pc,  v_tch_pc,  3.0, false, 'ACTIVE'),
        (v_year_id, v_class_3a, v_sub_svt, v_tch_svt, 3.0, false, 'ACTIVE'),
        (v_year_id, v_class_3a, v_sub_hg,  v_tch_hg,  3.0, false, 'ACTIVE'),
        (v_year_id, v_class_3a, v_sub_eps, v_tch_eps, 2.0, false, 'ACTIVE');

    -- 4. EMPLOI DU TEMPS (TIMETABLE) POUR 6EME A ET 3EME A
    -- Supprimer anciens slots de test
    DELETE FROM timetable_slot WHERE classroom_id IN (v_class_6a, v_class_3a);
    DELETE FROM timetable WHERE classroom_id IN (v_class_6a, v_class_3a);

    INSERT INTO timetable (id, academic_year_id, term_id, classroom_id, label, status, published_at, published_by)
    VALUES (gen_random_uuid(), v_year_id, v_t1_id, v_class_6a, 'Emploi du temps 6ème A (T1)', 'PUBLISHED', now(), v_user_tadmin)
    RETURNING id INTO v_tt_6a;

    INSERT INTO timetable (id, academic_year_id, term_id, classroom_id, label, status, published_at, published_by)
    VALUES (gen_random_uuid(), v_year_id, v_t1_id, v_class_3a, 'Emploi du temps 3ème A (T1)', 'PUBLISHED', now(), v_user_tadmin)
    RETURNING id INTO v_tt_3a;

    -- Créneaux pour 6ème A
    INSERT INTO timetable_slot (id, timetable_id, classroom_id, subject_id, teacher_id, room_id, academic_year_id, term_id, day_of_week, start_time, end_time, slot_type, active)
    VALUES
        (gen_random_uuid(), v_tt_6a, v_class_6a, v_sub_mat, v_tch_mat, v_room_101, v_year_id, v_t1_id, 'MONDAY',    '08:00', '10:00', 'COURSE', true),
        (gen_random_uuid(), v_tt_6a, v_class_6a, v_sub_fra, v_tch_fra, v_room_101, v_year_id, v_t1_id, 'MONDAY',    '10:15', '12:15', 'COURSE', true),
        (gen_random_uuid(), v_tt_6a, v_class_6a, v_sub_ang, v_tch_ang, v_room_101, v_year_id, v_t1_id, 'TUESDAY',   '08:00', '10:00', 'COURSE', true),
        (gen_random_uuid(), v_tt_6a, v_class_6a, v_sub_pc,  v_tch_pc,  v_room_labo,v_year_id, v_t1_id, 'TUESDAY',   '10:15', '12:15', 'COURSE', true),
        (gen_random_uuid(), v_tt_6a, v_class_6a, v_sub_svt, v_tch_svt, v_room_labo,v_year_id, v_t1_id, 'WEDNESDAY', '08:00', '10:00', 'COURSE', true),
        (gen_random_uuid(), v_tt_6a, v_class_6a, v_sub_hg,  v_tch_hg,  v_room_101, v_year_id, v_t1_id, 'THURSDAY',  '08:00', '10:00', 'COURSE', true),
        (gen_random_uuid(), v_tt_6a, v_class_6a, v_sub_eps, v_tch_eps, v_room_eps, v_year_id, v_t1_id, 'FRIDAY',    '08:00', '10:00', 'COURSE', true);

    -- Créneaux pour 3ème A (sans chevauchement de profs ni de salles)
    INSERT INTO timetable_slot (id, timetable_id, classroom_id, subject_id, teacher_id, room_id, academic_year_id, term_id, day_of_week, start_time, end_time, slot_type, active)
    VALUES
        (gen_random_uuid(), v_tt_3a, v_class_3a, v_sub_fra, v_tch_fra, v_room_102, v_year_id, v_t1_id, 'MONDAY',    '08:00', '10:00', 'COURSE', true),
        (gen_random_uuid(), v_tt_3a, v_class_3a, v_sub_mat, v_tch_mat, v_room_102, v_year_id, v_t1_id, 'MONDAY',    '10:15', '12:15', 'COURSE', true),
        (gen_random_uuid(), v_tt_3a, v_class_3a, v_sub_pc,  v_tch_pc,  v_room_labo,v_year_id, v_t1_id, 'WEDNESDAY', '10:15', '12:15', 'COURSE', true),
        (gen_random_uuid(), v_tt_3a, v_class_3a, v_sub_eps, v_tch_eps, v_room_eps, v_year_id, v_t1_id, 'FRIDAY',    '10:15', '12:15', 'COURSE', true);

    -- 5. SESSIONS DE COURS CONCRETES (Semaine courante : 05/10 au 09/10/2026)
    DELETE FROM course_session WHERE classroom_id IN (v_class_6a, v_class_3a);

    INSERT INTO course_session (id, classroom_id, subject_id, teacher_id, room_id, academic_year_id, term_id, session_date, start_time, end_time, topic, status)
    VALUES
        (gen_random_uuid(), v_class_6a, v_sub_mat, v_tch_mat, v_room_101, v_year_id, v_t1_id, '2026-10-05', '08:00', '10:00', 'Nombres décimaux et fractions', 'DONE'),
        (gen_random_uuid(), v_class_6a, v_sub_fra, v_tch_fra, v_room_101, v_year_id, v_t1_id, '2026-10-05', '10:15', '12:15', 'Grammaire : Les accords complexes', 'DONE'),
        (gen_random_uuid(), v_class_6a, v_sub_ang, v_tch_ang, v_room_101, v_year_id, v_t1_id, '2026-10-06', '08:00', '10:00', 'Present continuous & vocabulary', 'DONE'),
        (gen_random_uuid(), v_class_6a, v_sub_svt, v_tch_svt, v_room_labo,v_year_id, v_t1_id, '2026-10-07', '08:00', '10:00', 'Respiration des êtres vivants', 'DONE'),
        (gen_random_uuid(), v_class_6a, v_sub_hg,  v_tch_hg,  v_room_101, v_year_id, v_t1_id, '2026-10-08', '08:00', '10:00', 'Les grands empires africains', 'DONE'),
        -- Session d'aujourd'hui (09/10/2026)
        (gen_random_uuid(), v_class_6a, v_sub_eps, v_tch_eps, v_room_eps, v_year_id, v_t1_id, '2026-10-09', '08:00', '10:00', 'Course de demi-fond & échauffement', 'DONE'),
        (gen_random_uuid(), v_class_6a, v_sub_mat, v_tch_mat, v_room_101, v_year_id, v_t1_id, '2026-10-09', '14:00', '16:00', 'Géométrie : Droites remarquables', 'PLANNED');

    -- 6. APPEL ET PRESENCES (ATTENDANCE) POUR 6EME A
    DELETE FROM student_attendance WHERE classroom_id = v_class_6a;
    DELETE FROM attendance_session WHERE classroom_id = v_class_6a;

    -- Feuille d'appel validée pour le 05/10/2026
    INSERT INTO attendance_session (id, classroom_id, subject_id, teacher_id, academic_year_id, term_id, session_date, start_time, end_time, status, expected_count, present_count, absent_count, late_count, validated_at, validated_by)
    VALUES (gen_random_uuid(), v_class_6a, v_sub_mat, v_tch_mat, v_year_id, v_t1_id, '2026-10-05', '08:00', '10:00', 'VALIDATED', 23, 21, 2, 0, now() - interval '4 days', v_user_prof_mat)
    RETURNING id INTO v_att_sess_1;

    -- Feuille d'appel d'aujourd'hui 09/10/2026 (matin)
    INSERT INTO attendance_session (id, classroom_id, subject_id, teacher_id, academic_year_id, term_id, session_date, start_time, end_time, status, expected_count, present_count, absent_count, late_count, submitted_at, submitted_by)
    VALUES (gen_random_uuid(), v_class_6a, v_sub_eps, v_tch_eps, v_year_id, v_t1_id, '2026-10-09', '08:00', '10:00', 'SUBMITTED', 23, 20, 2, 1, now(), v_user_prof_eps)
    RETURNING id INTO v_att_sess_2;

    -- Inserer les presences individuelles des 23 eleves de 6eme A
    INSERT INTO student_attendance (attendance_session_id, student_id, enrollment_id, classroom_id, academic_year_id, term_id, attendance_date, status, arrival_time, minutes_late, reason, justified)
    SELECT
        v_att_sess_1,
        e.student_id,
        e.id,
        v_class_6a,
        v_year_id,
        v_t1_id,
        '2026-10-05',
        CASE 
            WHEN row_number() over (order by s.last_name) = 3 THEN 'EXCUSED_ABSENCE'::attendance_status
            WHEN row_number() over (order by s.last_name) = 15 THEN 'ABSENT'::attendance_status
            ELSE 'PRESENT'::attendance_status
        END,
        '08:00',
        0,
        CASE WHEN row_number() over (order by s.last_name) = 3 THEN 'Certificat médical fourni' ELSE NULL END,
        CASE WHEN row_number() over (order by s.last_name) = 3 THEN true ELSE false END
    FROM enrollment e
    JOIN student s ON e.student_id = s.id
    WHERE e.classroom_id = v_class_6a AND e.status IN ('VALIDATED', 'ACTIVE');

    -- Presences pour la session du jour
    INSERT INTO student_attendance (attendance_session_id, student_id, enrollment_id, classroom_id, academic_year_id, term_id, attendance_date, status, arrival_time, minutes_late, reason, justified)
    SELECT
        v_att_sess_2,
        e.student_id,
        e.id,
        v_class_6a,
        v_year_id,
        v_t1_id,
        '2026-10-09',
        CASE 
            WHEN row_number() over (order by s.last_name) = 5 THEN 'LATE'::attendance_status
            WHEN row_number() over (order by s.last_name) = 12 THEN 'ABSENT'::attendance_status
            WHEN row_number() over (order by s.last_name) = 18 THEN 'EXCUSED_ABSENCE'::attendance_status
            ELSE 'PRESENT'::attendance_status
        END,
        CASE WHEN row_number() over (order by s.last_name) = 5 THEN '08:25'::time ELSE '08:00'::time END,
        CASE WHEN row_number() over (order by s.last_name) = 5 THEN 25 ELSE 0 END,
        CASE WHEN row_number() over (order by s.last_name) = 18 THEN 'Rendez-vous médical' ELSE NULL END,
        CASE WHEN row_number() over (order by s.last_name) = 18 THEN true ELSE false END
    FROM enrollment e
    JOIN student s ON e.student_id = s.id
    WHERE e.classroom_id = v_class_6a AND e.status IN ('VALIDATED', 'ACTIVE');

    -- 7. EVALUATIONS ET NOTES (ASSESSMENT & GRADE) POUR 6EME A (T1)
    DELETE FROM grade WHERE classroom_id = v_class_6a;
    DELETE FROM assessment WHERE classroom_id = v_class_6a;

    -- Devoirs surveilles en Maths, Francais, Anglais, PC, SVT, HG
    INSERT INTO assessment (id, classroom_id, subject_id, teacher_id, academic_year_id, term_id, title, assessment_type, assessment_date, max_score, coefficient, status, published_at, validated_at, validated_by)
    VALUES
        -- Devoir 1 Maths
        (gen_random_uuid(), v_class_6a, v_sub_mat, v_tch_mat, v_year_id, v_t1_id, 'Devoir Surveillé n°1 - Algèbre', 'TEST', '2026-09-28', 20.0, 1.0, 'PUBLISHED', now() - interval '10 days', now() - interval '10 days', v_user_prof_mat),
        -- Devoir 2 Maths
        (gen_random_uuid(), v_class_6a, v_sub_mat, v_tch_mat, v_year_id, v_t1_id, 'Devoir Surveillé n°2 - Géométrie', 'TEST', '2026-10-06', 20.0, 2.0, 'VALIDATED', now() - interval '2 days', now() - interval '2 days', v_user_prof_mat),
        -- Devoir 1 Français
        (gen_random_uuid(), v_class_6a, v_sub_fra, v_tch_fra, v_year_id, v_t1_id, 'Devoir de Grammaire et Conjugaison', 'TEST', '2026-09-30', 20.0, 1.0, 'PUBLISHED', now() - interval '8 days', now() - interval '8 days', v_user_prof_fra),
        -- Devoir 2 Français
        (gen_random_uuid(), v_class_6a, v_sub_fra, v_tch_fra, v_year_id, v_t1_id, 'Dictée et Questions de texte', 'TEST', '2026-10-07', 20.0, 2.0, 'VALIDATED', now() - interval '1 day', now() - interval '1 day', v_user_prof_fra),
        -- Devoir 1 Anglais
        (gen_random_uuid(), v_class_6a, v_sub_ang, v_tch_ang, v_year_id, v_t1_id, 'English Vocabulary & Comprehension', 'QUIZ', '2026-10-01', 20.0, 1.0, 'PUBLISHED', now() - interval '7 days', now() - interval '7 days', v_user_prof_ang),
        -- Devoir 1 PC
        (gen_random_uuid(), v_class_6a, v_sub_pc,  v_tch_pc,  v_year_id, v_t1_id, 'Evaluation Physique : Les mélanges', 'TEST', '2026-10-02', 20.0, 1.0, 'PUBLISHED', now() - interval '6 days', now() - interval '6 days', v_user_prof_pc),
        -- Devoir 1 SVT
        (gen_random_uuid(), v_class_6a, v_sub_svt, v_tch_svt, v_year_id, v_t1_id, 'Contrôle SVT : La cellule et la vie', 'TEST', '2026-10-05', 20.0, 1.0, 'PUBLISHED', now() - interval '3 days', now() - interval '3 days', v_user_prof_svt),
        -- Devoir 1 HG
        (gen_random_uuid(), v_class_6a, v_sub_hg,  v_tch_hg,  v_year_id, v_t1_id, 'Interrogation Histoire : L''Egypte antique', 'QUIZ', '2026-10-08', 20.0, 1.0, 'VALIDATED', now() - interval '1 day', now() - interval '1 day', v_user_prof_hg),
        -- Devoir en cours de saisie (OPEN) pour tester la saisie enseignant
        (gen_random_uuid(), v_class_6a, v_sub_mat, v_tch_mat, v_year_id, v_t1_id, 'Interrogation écrite surprise - Calcul mental', 'QUIZ', '2026-10-09', 20.0, 1.0, 'OPEN', null, null, null);

    -- Inserer les notes des 23 eleves pour chacune des evaluations validees/publiees
    INSERT INTO grade (assessment_id, student_id, enrollment_id, classroom_id, subject_id, term_id, academic_year_id, score, max_score, normalized_score, absent, exempted, status, comment, entered_at, validated_at, published_at)
    SELECT
        a.id,
        e.student_id,
        e.id,
        v_class_6a,
        a.subject_id,
        v_t1_id,
        v_year_id,
        -- Note deterministe entre 08.5 et 18.5
        ROUND(((8.5 + ((abs(hashtext(e.student_id::text || a.id::text)) % 100) / 10.0)))::numeric, 1),
        20.0,
        ROUND(((8.5 + ((abs(hashtext(e.student_id::text || a.id::text)) % 100) / 10.0)))::numeric, 1),
        false,
        false,
        'VALIDATED'::grade_status,
        'Bon travail d''ensemble.',
        now() - interval '2 days',
        now() - interval '1 day',
        now() - interval '1 day'
    FROM assessment a
    CROSS JOIN enrollment e
    WHERE a.classroom_id = v_class_6a 
      AND a.status IN ('VALIDATED', 'PUBLISHED')
      AND e.classroom_id = v_class_6a
      AND e.status IN ('VALIDATED', 'ACTIVE');

    -- 8. BULLETINS DE NOTES OFFICIELS (REPORT CARDS) POUR 6EME A
    DELETE FROM report_card_line WHERE report_card_id IN (SELECT id FROM report_card WHERE classroom_id = v_class_6a);
    DELETE FROM report_card WHERE classroom_id = v_class_6a;

    -- Generer un bulletin T1 par eleve avec moyenne et rang calcules
    WITH ranked_students AS (
        SELECT 
            e.student_id,
            e.id as enrollment_id,
            ROUND(AVG(g.score), 2) as avg_score,
            ROW_NUMBER() OVER (ORDER BY AVG(g.score) DESC, e.student_id) as student_rank,
            COUNT(*) as nb_notes
        FROM enrollment e
        JOIN grade g ON g.enrollment_id = e.id AND g.term_id = v_t1_id AND g.status IN ('VALIDATED','PUBLISHED')
        WHERE e.classroom_id = v_class_6a
        GROUP BY e.student_id, e.id
    )
    INSERT INTO report_card (
        id, student_id, enrollment_id, classroom_id, academic_year_id, term_id,
        reference, verification_code, general_average, class_average, class_min_average, class_max_average,
        rank_in_class, class_size, total_coefficient, absence_count, justified_absence_count, lateness_count,
        general_remark, head_teacher_remark, principal_remark, status, generated_at, published_at, revision
    )
    SELECT
        gen_random_uuid(),
        r.student_id,
        r.enrollment_id,
        v_class_6a,
        v_year_id,
        v_t1_id,
        'BUL-2026-6A-' || LPAD(r.student_rank::text, 4, '0'),
        'VERIF-6A-' || upper(substr(md5(r.student_id::text || v_t1_id::text), 1, 12)),
        r.avg_score,
        13.45,
        09.80,
        17.90,
        r.student_rank,
        23,
        15.0,
        1,
        1,
        0,
        CASE 
            WHEN r.avg_score >= 15 THEN 'Excellent trimestre. Félicitations du conseil de classe.'
            WHEN r.avg_score >= 12 THEN 'Trimestre satisfaisant, poursuivez vos efforts avec régularité.'
            ELSE 'Des lacunes qu''il convient de combler par un travail personnel accru.'
        END,
        'Élève sérieux et assidu. Participation active en classe.',
        'Trimestre encourageant, maintenez cette dynamique positive.',
        'PUBLISHED'::report_card_status,
        now() - interval '2 days',
        now() - interval '1 day',
        1
    FROM ranked_students r;

    -- Inserer les lignes de bulletins (report_card_line)
    INSERT INTO report_card_line (
        report_card_id, subject_id, teacher_id, subject_name, coefficient,
        subject_average, weighted_average, class_subject_average, min_score, max_score,
        rank_in_subject, assessment_count, appreciation, display_order
    )
    SELECT
        rc.id,
        s.id,
        ta.teacher_id,
        s.name,
        cs.coefficient,
        COALESCE(ROUND(AVG(g.score), 2), 12.50),
        COALESCE(ROUND(AVG(g.score) * cs.coefficient, 2), 12.50 * cs.coefficient),
        13.20,
        08.50,
        18.00,
        1,
        2,
        'Bonne acquisition des compétences et notions du trimestre.',
        cs.display_order
    FROM report_card rc
    JOIN classroom c ON rc.classroom_id = c.id
    JOIN level l ON c.level_id = l.id
    JOIN curriculum curr ON curr.level_id = l.id AND curr.academic_year_id = v_year_id
    JOIN curriculum_subject cs ON cs.curriculum_id = curr.id
    JOIN subject s ON cs.subject_id = s.id
    LEFT JOIN teacher_assignment ta ON ta.classroom_id = c.id AND ta.subject_id = s.id
    LEFT JOIN grade g ON g.enrollment_id = rc.enrollment_id AND g.subject_id = s.id
    WHERE rc.classroom_id = v_class_6a
    GROUP BY rc.id, s.id, ta.teacher_id, s.name, cs.coefficient, cs.display_order;

    -- 9. CONSEIL DE CLASSE (CLASS COUNCIL) POUR 6EME A
    DELETE FROM class_council_participant WHERE council_id IN (SELECT id FROM class_council WHERE classroom_id = v_class_6a);
    DELETE FROM class_council WHERE classroom_id = v_class_6a;

    INSERT INTO class_council (
        id, classroom_id, academic_year_id, term_id, meeting_date, start_time, end_time,
        chaired_by, location, status, class_average, remarks, closed_at, closed_by
    )
    VALUES (
        gen_random_uuid(),
        v_class_6a,
        v_year_id,
        v_t1_id,
        CURRENT_DATE - 2,
        '16:30'::time,
        '18:00'::time,
        v_user_dir,
        'Salle polyvalente Konankro',
        'CLOSED'::council_status,
        13.45,
        'Bilan très positif pour la 6ème A. Bonne ambiance de travail, niveau d''ensemble satisfaisant avec une moyenne générale de 13.45/20. Félicitations et encouragements accordés à la majorité des élèves.',
        now() - interval '2 days',
        v_user_dir
    );

    -- 10. SESSION DE CAISSE ET ENCAISSEMENTS (CASH & PAYMENTS)
    -- Clôturer les anciennes sessions
    UPDATE cash_session 
    SET status = 'CLOSED',
        closed_at = now(),
        actual_balance = COALESCE(actual_balance, opening_balance),
        expected_balance = COALESCE(expected_balance, opening_balance)
    WHERE school_id = v_school_id AND status = 'OPEN';

    -- Session d'hier clôturée
    INSERT INTO cash_session (school_id, campus_id, cashier_user_id, reference, opened_at, closed_at, opening_balance, actual_balance, expected_balance, status, notes)
    VALUES (
        v_school_id, v_campus_id, v_user_caisse,
        'CSH-2026-000001',
        now() - interval '1 day' - interval '8 hours',
        now() - interval '1 day',
        50000.00, 450000.00, 450000.00,
        'CLOSED',
        'Session clôturée sans écart. Rapprochement physique conforme.'
    );

    -- Session d'aujourd'hui ouverte pour t-caisse
    INSERT INTO cash_session (id, school_id, campus_id, cashier_user_id, reference, opened_at, opening_balance, status, notes)
    VALUES (
        gen_random_uuid(),
        v_school_id, v_campus_id, v_user_caisse,
        'CSH-2026-000002',
        now() - interval '4 hours',
        50000.00,
        'OPEN',
        'Session ouverte à 08:00 par la caissière. Fonds de caisse de 50 000 FCFA.'
    )
    RETURNING id INTO v_cash_open;

    -- Inserer 35 paiements concrets avec leurs recus et allocations
    FOR i IN 1..35 LOOP
        DECLARE
            v_fee_rec RECORD;
            v_pay_id UUID := gen_random_uuid();
            v_pay_amount NUMERIC(15,2);
            v_pay_method payment_method;
            v_rec_num VARCHAR(40) := 'REC-2026-' || LPAD((1000 + i)::text, 8, '0');
            v_pay_ref VARCHAR(40) := 'PAY-2026-' || LPAD((5000 + i)::text, 8, '0');
            v_op_id   VARCHAR(120) := 'OP-' || v_school_id || '-' || i;
        BEGIN
            -- Trouver un student_fee impayé
            SELECT sf.id, sf.student_id, sf.enrollment_id, sf.amount_due, sf.amount_remaining, s.first_name, s.last_name
            INTO v_fee_rec
            FROM student_fee sf
            JOIN student s ON sf.student_id = s.id
            WHERE sf.academic_year_id = v_year_id 
              AND sf.amount_remaining > 0
            ORDER BY sf.due_date ASC, sf.id ASC
            OFFSET (i - 1) LIMIT 1;

            IF v_fee_rec.id IS NOT NULL THEN
                v_pay_amount := LEAST(v_fee_rec.amount_remaining, 50000.00);
                v_pay_method := CASE (i % 4)
                    WHEN 0 THEN 'CASH'::payment_method
                    WHEN 1 THEN 'MOBILE_MONEY'::payment_method
                    WHEN 2 THEN 'BANK_TRANSFER'::payment_method
                    ELSE 'CHEQUE'::payment_method
                END;

                -- Inserer le paiement
                INSERT INTO payment (
                    id, school_id, student_id, enrollment_id, academic_year_id,
                    cash_session_id, payment_reference, amount, allocated_amount,
                    currency, payment_method, payment_date, external_reference,
                    payer_name, status, operation_id, validated_at, validated_by
                ) VALUES (
                    v_pay_id, v_school_id, v_fee_rec.student_id, v_fee_rec.enrollment_id, v_year_id,
                    CASE WHEN v_pay_method = 'CASH' THEN v_cash_open ELSE NULL END,
                    v_pay_ref, v_pay_amount, v_pay_amount,
                    'XOF', v_pay_method, CURRENT_DATE - (i % 5),
                    CASE WHEN v_pay_method = 'MOBILE_MONEY' THEN 'WAVE-CI-' || (100000 + i) ELSE NULL END,
                    'Parent ' || v_fee_rec.last_name,
                    'VALIDATED'::payment_status,
                    v_op_id,
                    now() - interval '1 hour',
                    v_user_caisse
                );

                -- Inserer l'allocation de paiement
                INSERT INTO payment_allocation (
                    payment_id, student_fee_id, amount, allocated_at, allocated_by
                ) VALUES (
                    v_pay_id, v_fee_rec.id, v_pay_amount, now() - interval '1 hour', v_user_caisse
                );

                -- Mettre a jour le student_fee
                UPDATE student_fee
                SET amount_paid = amount_paid + v_pay_amount,
                    status = CASE 
                        WHEN (amount_paid + v_pay_amount) >= amount_due THEN 'PAID'::student_fee_status
                        ELSE 'PARTIALLY_PAID'::student_fee_status
                    END
                WHERE id = v_fee_rec.id;

                -- Creer le reçu officiel avec montant en toutes lettres et QR code
                INSERT INTO receipt (
                    payment_id, student_id, receipt_number, issue_date, amount, currency,
                    amount_in_words, payment_method, cashier_user_id, verification_code
                ) VALUES (
                    v_pay_id, v_fee_rec.student_id, v_rec_num, CURRENT_DATE - (i % 5), v_pay_amount, 'XOF',
                    v_pay_amount::text || ' Francs CFA',
                    v_pay_method, v_user_caisse,
                    'REC-VRF-' || upper(substr(md5(v_pay_id::text), 1, 10))
                );
            END IF;
        END;
    END LOOP;

    -- 11. REMISES ET BOURSES D'EXCELLENCE
    INSERT INTO discount (school_id, code, label, discount_type, value, status, reason)
    VALUES
        (v_school_id, 'REMISE-FRATRIE-10', 'Remise fratrie (3ème enfant)', 'PERCENTAGE', 10.0, 'ACTIVE', 'Accorde 10% sur la scolarite a partir du 3e enfant scolarise.'),
        (v_school_id, 'REMISE-PERSONNEL', 'Exonération personnel enseignant', 'PERCENTAGE', 25.0, 'ACTIVE', 'Reduction accordee aux enfants des agents de l''etablissement.')
    ON CONFLICT (school_id, code) DO NOTHING;

    -- 12. ACTIONS DE RECOUVREMENT (COLLECTION ACTIONS) SUR LES IMPAYES
    INSERT INTO collection_action (school_id, student_id, academic_year_id, created_by, author_name, channel, note, promised_date, promised_amount)
    SELECT
        v_school_id,
        sf.student_id,
        v_year_id,
        v_user_compta,
        'Pauline Aman (Service Comptabilité)',
        'PHONE',
        'Contact téléphonique avec le tuteur concernant l''échéance de scolarité en retard. Engagement ferme pris pour régularisation avant fin du mois.',
        CURRENT_DATE + interval '10 days',
        45000.00
    FROM student_fee sf
    WHERE sf.academic_year_id = v_year_id AND sf.status = 'DUE'
    LIMIT 5;

    -- 13. SANTE SCOLAIRE (FICHE MEDICALE, ALLERGIES, VISITES INFIRMERIE)
    FOR s_rec IN SELECT id, first_name, last_name FROM student WHERE school_id = v_school_id LIMIT 10 LOOP
        DECLARE
            v_hr_id UUID := gen_random_uuid();
        BEGIN
            INSERT INTO student_health_record (
                id, student_id, blood_group, physician_name, physician_phone, insurance_name, insurance_number,
                care_consent, consent_signed_on, notes
            ) VALUES (
                v_hr_id,
                s_rec.id,
                (ARRAY['O+', 'A+', 'B+', 'AB+', 'O-'])[1 + (abs(hashtext(s_rec.id::text)) % 5)],
                'Dr. Bakayoko (Polyclinique Sainte Anne)',
                '+225 0102030405',
                'NSIA Assurances Scolaires',
                'POL-2026-NSIA-' || substr(s_rec.id::text, 1, 6),
                true,
                '2026-09-15',
                'Dossier médical d''admission complété et validé par les parents.'
            ) ON CONFLICT (student_id) DO NOTHING;

            SELECT id INTO v_hr_id FROM student_health_record WHERE student_id = s_rec.id;

            IF v_hr_id IS NOT NULL THEN
                -- Ajouter une allergie / pathologie pour certains élèves
                IF (abs(hashtext(s_rec.id::text)) % 3) = 0 THEN
                    INSERT INTO health_condition (
                        health_record_id, kind, label, severity, description, action_to_take, medication, self_carried, active
                    ) VALUES (
                        v_hr_id,
                        'ALLERGY'::health_condition_kind,
                        'Allergie sévère aux arachides',
                        'HIGH'::health_severity,
                        'Réaction anaphylactique rapide en cas d''ingestion d''arachide ou dérivés.',
                        'URGENT : Administrer stylo auto-injecteur Anapen puis contacter le SAMU (185) et les parents.',
                        'Anapen 150mcg',
                        true,
                        true
                    ) ON CONFLICT DO NOTHING;
                ELSIF (abs(hashtext(s_rec.id::text)) % 3) = 1 THEN
                    INSERT INTO health_condition (
                        health_record_id, kind, label, severity, description, action_to_take, medication, self_carried, active
                    ) VALUES (
                        v_hr_id,
                        'CHRONIC_ILLNESS'::health_condition_kind,
                        'Asthme d''effort modéré',
                        'MODERATE'::health_severity,
                        'Gêne respiratoire lors d''efforts intenses par temps froid ou sec.',
                        'Laisser l''élève au repos, faire inhaler 2 bouffées de Ventoline. Pas d''effort violent.',
                        'Ventoline 100mcg',
                        true,
                        true
                    ) ON CONFLICT DO NOTHING;
                END IF;

                -- Une visite à l'infirmerie pour 3 élèves
                IF (abs(hashtext(s_rec.id::text)) % 4) = 0 THEN
                    INSERT INTO infirmary_visit (
                        student_id, academic_year_id, classroom_id, occurred_at, complaint,
                        care_given, temperature_celsius, outcome, notes, recorded_by
                    ) VALUES (
                        s_rec.id,
                        v_year_id,
                        v_class_6a,
                        now() - interval '2 days',
                        'Céphalées intenses et fatigue après le cours de sport',
                        'Prise de température (37.2°C). Repos allongé 30 min, réhydratation avec eau fraîche et sucre.',
                        37.2,
                        'BACK_TO_CLASS'::infirmary_outcome,
                        'L''élève a pu réintégrer la classe à 10h15 en pleine forme.',
                        v_user_disc
                    );
                END IF;
            END IF;
        END;
    END LOOP;

    -- 14. LISTES DE FOURNITURES SCOLAIRES (SUPPLY LISTS)
    FOR lvl_rec IN SELECT id, name FROM level WHERE cycle_id IN (SELECT id FROM cycle WHERE school_id = v_school_id) LIMIT 3 LOOP
        INSERT INTO supply_list (school_id, level_id, academic_year_id, title, notes, items)
        VALUES (
            v_school_id,
            lvl_rec.id,
            v_year_id,
            'Liste officielle des fournitures — ' || lvl_rec.name,
            'Les fournitures doivent être étiquetées au nom de l''élève avant le premier jour de classe.',
            '[
                {"item": "Cahier 200 pages grand format (21x29.7)", "quantity": 6, "mandatory": true},
                {"item": "Boîte de crayons de couleur et feutres", "quantity": 1, "mandatory": true},
                {"item": "Règle plate 30cm, équerre et rapporteur", "quantity": 1, "mandatory": true},
                {"item": "Stylos à bille (Bleu, Noir, Rouge, Vert)", "quantity": 4, "mandatory": true},
                {"item": "Gourde d''eau individuelle étiquetée", "quantity": 1, "mandatory": true}
            ]'::jsonb
        ) ON CONFLICT (school_id, level_id, academic_year_id) DO NOTHING;
    END LOOP;

    -- 15. DEMANDES DES FAMILLES (FAMILY REQUESTS)
    SELECT id INTO v_demo_student_id FROM student WHERE school_id = v_school_id LIMIT 1;
    INSERT INTO family_request (
        school_id, student_id, reference, request_type, status, priority, channel,
        subject, description, classroom_name, guardian_name, guardian_phone, submitted_at, due_at
    ) VALUES
        (v_school_id, v_demo_student_id, 'REQ-2026-0001', 'SCHOOL_CERTIFICATE', 'READY', 'NORMAL', 'PORTAL',
         'Demande de certificat de scolarité original', 'Besoin de 2 exemplaires certifiés pour l''employeur du père (allocations familiales).',
         '6ème A', 'M. Koffi Kouassi', '+225 0708091011', now() - interval '2 days', now() + interval '3 days'),
        (v_school_id, v_demo_student_id, 'REQ-2026-0002', 'APPOINTMENT', 'NEW', 'HIGH', 'EMAIL',
         'Rendez-vous avec le Professeur Principal', 'Souhait d''échanger sur l''orientation et les résultats en mathématiques.',
         '6ème A', 'Mme Aminata Kone', '+225 0506070809', now() - interval '4 hours', now() + interval '2 days')
    ON CONFLICT (school_id, reference) DO NOTHING;

    -- 16. DOCUMENTS OFFICIELS EMIS (DOCUMENT)
    INSERT INTO document (
        school_id, document_type, document_number, verification_code, title,
        student_id, academic_year_id, status, issued_at, issued_by, valid_until
    ) VALUES (
        v_school_id, 'ENROLLMENT_ATTESTATION', 'DOC-2026-00000123', 'VRF-DOC-2026-A1B2C3',
        'Certificat d''inscription officiel 2026-2027',
        v_demo_student_id, v_year_id, 'ISSUED', now() - interval '10 days', v_user_tadmin, '2027-07-31'
    ) ON CONFLICT (document_number) DO NOTHING;

    -- 17. ALERTES DASHBOARD ET ANNONCES OFFICIELLES
    DELETE FROM alert WHERE school_id = v_school_id AND dedup_key IN ('ALERT-PAY-OVERDUE-T1', 'ALERT-ABS-TRAORE-6A', 'ALERT-CAP-6A');

    INSERT INTO alert (school_id, academic_year_id, alert_type, severity, title, message, dedup_key, status)
    VALUES
        (v_school_id, v_year_id, 'PAYMENT_OVERDUE', 'WARNING', 'Échéances de scolarité à relancer', 'Plusieurs échéances de frais du 1er trimestre sont arrivées à échéance.', 'ALERT-PAY-OVERDUE-T1', 'OPEN'),
        (v_school_id, v_year_id, 'STUDENT_REPEATED_ABSENCE', 'WARNING', 'Absences répétées signalées', 'L''élève Traoré a cumulé 3 absences non justifiées en cours d''EPS et de Français.', 'ALERT-ABS-TRAORE-6A', 'OPEN'),
        (v_school_id, v_year_id, 'CLASS_CAPACITY_WARNING', 'INFO', 'Capacité de classe : 6ème A', 'La classe de 6ème A a atteint 23 élèves inscrits sur une capacité maximale de 25.', 'ALERT-CAP-6A', 'OPEN');

    INSERT INTO announcement (school_id, title, body, audience, publish_at, published, published_by)
    VALUES
        (v_school_id, 'Réunion parents-professeurs du 1er trimestre', 'La direction informe les parents d''élèves que la réunion de mi-trimestre se tiendra le samedi 17 octobre 2026 à partir de 09h00 dans la cour d''honneur.', 'ALL', now() - interval '1 day', true, v_user_dir),
        (v_school_id, 'Lancement des évaluations formatives', 'Rappel aux enseignants : la saisie des devoirs surveillés n°1 doit être finalisée avant le vendredi 16 octobre à 18h00.', 'TEACHERS', now(), true, v_user_acad)
    ON CONFLICT DO NOTHING;

    -- 18. COMPTE PARENT ET ELEVE POUR TESTS DES PORTAILS
    -- Trouver le premier tuteur
    SELECT id INTO v_demo_guardian_id FROM guardian WHERE school_id = v_school_id LIMIT 1;
    IF v_demo_guardian_id IS NOT NULL THEN
        INSERT INTO app_user (id, username, email, password_hash, first_name, last_name, school_id, status, must_change_password)
        VALUES (gen_random_uuid(), 'parent.demo', 'parent.demo@soocloo.com', v_admin_pwd, 'Parent', 'Testeur', v_school_id, 'ACTIVE', false)
        ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, must_change_password = false
        RETURNING id INTO v_user_parent;
        SELECT id INTO v_user_parent FROM app_user WHERE email = 'parent.demo@soocloo.com';
        INSERT INTO app_user_role (user_id, role_id) VALUES (v_user_parent, v_role_parent) ON CONFLICT DO NOTHING;
        UPDATE guardian SET user_account_id = v_user_parent WHERE id = v_demo_guardian_id;
    END IF;

    -- Compte pour le premier eleve
    IF v_demo_student_id IS NOT NULL THEN
        INSERT INTO app_user (id, username, email, password_hash, first_name, last_name, school_id, status, must_change_password)
        VALUES (gen_random_uuid(), 'eleve.demo', 'eleve.demo@soocloo.com', v_admin_pwd, 'Eleve', 'Testeur', v_school_id, 'ACTIVE', false)
        ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, must_change_password = false
        RETURNING id INTO v_user_student;
        SELECT id INTO v_user_student FROM app_user WHERE email = 'eleve.demo@soocloo.com';
        INSERT INTO app_user_role (user_id, role_id) VALUES (v_user_student, v_role_student) ON CONFLICT DO NOTHING;
        UPDATE student SET user_account_id = v_user_student WHERE id = v_demo_student_id;
    END IF;

    RAISE NOTICE '>>> Injection des donnees de test achevee avec succes !';
END $$;
