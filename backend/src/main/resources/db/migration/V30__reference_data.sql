-- =====================================================================
-- V30 - Reference data: permissions, roles and role/permission matrix.
-- Business data (school, students...) is NOT seeded here; it is created
-- through the API or the optional demo data loader (dev profile).
-- =====================================================================

INSERT INTO app_permission (code, label, module) VALUES
 ('STUDENT_VIEW',            'View students',                'student'),
 ('STUDENT_CREATE',          'Create students',              'student'),
 ('STUDENT_UPDATE',          'Update students',              'student'),
 ('STUDENT_ARCHIVE',         'Archive students',             'student'),
 ('GUARDIAN_VIEW',           'View guardians',               'guardian'),
 ('GUARDIAN_MANAGE',         'Manage guardians',             'guardian'),
 ('ADMISSION_VIEW',          'View admissions',              'admission'),
 ('ADMISSION_MANAGE',        'Manage admissions',            'admission'),
 ('ADMISSION_DECIDE',        'Decide on admissions',         'admission'),
 ('ENROLLMENT_VIEW',         'View enrollments',             'enrollment'),
 ('ENROLLMENT_CREATE',       'Create enrollments',           'enrollment'),
 ('ENROLLMENT_VALIDATE',     'Validate enrollments',         'enrollment'),
 ('ENROLLMENT_CANCEL',       'Cancel enrollments',           'enrollment'),
 ('ENROLLMENT_OVERRIDE_CAPACITY','Enroll beyond class capacity','enrollment'),
 ('TEACHER_VIEW',            'View teachers',                'teacher'),
 ('TEACHER_MANAGE',          'Manage teachers',              'teacher'),
 ('STAFF_VIEW',              'View staff',                   'staff'),
 ('STAFF_MANAGE',            'Manage staff',                 'staff'),
 ('SCHOOL_VIEW',             'View school settings',         'school'),
 ('SCHOOL_MANAGE',           'Manage school settings',       'school'),
 ('ACADEMIC_YEAR_VIEW',      'View academic years',          'academicyear'),
 ('ACADEMIC_YEAR_MANAGE',    'Manage academic years',        'academicyear'),
 ('CLASS_VIEW',              'View classes',                 'classroom'),
 ('CLASS_MANAGE',            'Manage classes',               'classroom'),
 ('SUBJECT_VIEW',            'View subjects',                'subject'),
 ('SUBJECT_MANAGE',          'Manage subjects',              'subject'),
 ('CURRICULUM_VIEW',         'View curriculum',              'curriculum'),
 ('CURRICULUM_MANAGE',       'Manage curriculum',            'curriculum'),
 ('TIMETABLE_VIEW',          'View timetables',              'timetable'),
 ('TIMETABLE_MANAGE',        'Manage timetables',            'timetable'),
 ('ATTENDANCE_VIEW',         'View attendance',              'attendance'),
 ('ATTENDANCE_CREATE',       'Record attendance',            'attendance'),
 ('ATTENDANCE_UPDATE',       'Update attendance',            'attendance'),
 ('ATTENDANCE_JUSTIFY',      'Justify absences',             'attendance'),
 ('ASSESSMENT_VIEW',         'View assessments',             'assessment'),
 ('ASSESSMENT_CREATE',       'Create assessments',           'assessment'),
 ('ASSESSMENT_MANAGE',       'Manage assessments',           'assessment'),
 ('GRADE_VIEW',              'View grades',                  'grade'),
 ('GRADE_CREATE',            'Enter grades',                 'grade'),
 ('GRADE_VALIDATE',          'Validate grades',              'grade'),
 ('GRADE_PUBLISH',           'Publish grades',               'grade'),
 ('GRADE_CORRECT_PUBLISHED', 'Correct a published grade',    'grade'),
 ('REPORT_CARD_VIEW',        'View report cards',            'reportcard'),
 ('REPORT_CARD_GENERATE',    'Generate report cards',        'reportcard'),
 ('REPORT_CARD_PUBLISH',     'Publish report cards',         'reportcard'),
 ('COUNCIL_VIEW',            'View class councils',          'classcouncil'),
 ('COUNCIL_MANAGE',          'Manage class councils',        'classcouncil'),
 ('PROMOTION_DECIDE',        'Decide promotions',            'promotion'),
 ('DISCIPLINE_VIEW',         'View discipline records',      'discipline'),
 ('DISCIPLINE_MANAGE',       'Manage discipline records',    'discipline'),
 ('FINANCE_VIEW',            'View finance',                 'finance'),
 ('FINANCE_MANAGE',          'Manage fees and schedules',    'finance'),
 ('PAYMENT_VIEW',            'View payments',                'payment'),
 ('PAYMENT_CREATE',          'Record payments',              'payment'),
 ('PAYMENT_CANCEL',          'Cancel payments',              'payment'),
 ('CASH_SESSION_MANAGE',     'Open and close cash sessions', 'cashier'),
 ('DISCOUNT_MANAGE',         'Grant discounts',              'finance'),
 ('SCHOLARSHIP_MANAGE',      'Grant scholarships',           'finance'),
 ('DOCUMENT_VIEW',           'View documents',               'document'),
 ('DOCUMENT_GENERATE',       'Generate official documents',  'document'),
 ('NOTIFICATION_SEND',       'Send notifications',           'notification'),
 ('ALERT_VIEW',              'View alerts',                  'alert'),
 ('ALERT_MANAGE',            'Acknowledge and resolve alerts','alert'),
 ('DASHBOARD_VIEW',          'View the dashboard',           'dashboard'),
 ('REPORT_VIEW',             'View reports',                 'report'),
 ('REPORT_EXPORT',           'Export reports',               'report'),
 ('IMPORT_EXECUTE',          'Run data imports',             'report'),
 ('AUDIT_VIEW',              'Read the audit trail',         'audit'),
 ('USER_MANAGE',             'Manage user accounts',         'security'),
 ('ROLE_MANAGE',             'Manage roles and permissions', 'security'),
 ('PORTAL_TEACHER',          'Access the teacher portal',    'portal'),
 ('PORTAL_PARENT',           'Access the parent portal',     'portal'),
 ('PORTAL_STUDENT',          'Access the student portal',    'portal');

INSERT INTO app_role (code, label, description, system_role) VALUES
 ('SUPER_ADMIN',        'Super administrator',  'Full technical and functional access', TRUE),
 ('SCHOOL_ADMIN',       'School administrator', 'Full functional access to one school', TRUE),
 ('DIRECTOR',           'Director',             'School leadership, read-wide, decisions', TRUE),
 ('ACADEMIC_MANAGER',   'Academic manager',     'Academic structure, timetable, grades',  TRUE),
 ('REGISTRAR',          'Registrar',            'Admissions, enrollments, student files', TRUE),
 ('TEACHER',            'Teacher',              'Own classes: attendance and grades',     TRUE),
 ('ACCOUNTANT',         'Accountant',           'Fees, invoices, financial reporting',    TRUE),
 ('CASHIER',            'Cashier',              'Payments, receipts, cash sessions',      TRUE),
 ('DISCIPLINE_MANAGER', 'Discipline manager',   'Incidents and sanctions',                TRUE),
 ('SECRETARY',          'Secretary',            'Administrative day-to-day operations',   TRUE),
 ('PARENT',             'Parent',               'Parent portal, own children only',       TRUE),
 ('STUDENT',            'Student',              'Student portal, own record only',        TRUE),
 ('VIEWER',             'Viewer',               'Read-only access',                       TRUE);

-- SUPER_ADMIN and SCHOOL_ADMIN receive every permission.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r CROSS JOIN app_permission p
WHERE r.code IN ('SUPER_ADMIN','SCHOOL_ADMIN');

-- DIRECTOR: everything except low-level security administration.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r CROSS JOIN app_permission p
WHERE r.code = 'DIRECTOR'
  AND p.code NOT IN ('USER_MANAGE','ROLE_MANAGE','PORTAL_PARENT','PORTAL_STUDENT');

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'DASHBOARD_VIEW','SCHOOL_VIEW','ACADEMIC_YEAR_VIEW','ACADEMIC_YEAR_MANAGE',
    'CLASS_VIEW','CLASS_MANAGE','SUBJECT_VIEW','SUBJECT_MANAGE',
    'CURRICULUM_VIEW','CURRICULUM_MANAGE','TIMETABLE_VIEW','TIMETABLE_MANAGE',
    'TEACHER_VIEW','TEACHER_MANAGE','STUDENT_VIEW','ENROLLMENT_VIEW',
    'ATTENDANCE_VIEW','ASSESSMENT_VIEW','ASSESSMENT_MANAGE',
    'GRADE_VIEW','GRADE_VALIDATE','GRADE_PUBLISH',
    'REPORT_CARD_VIEW','REPORT_CARD_GENERATE','REPORT_CARD_PUBLISH',
    'COUNCIL_VIEW','COUNCIL_MANAGE','PROMOTION_DECIDE',
    'ALERT_VIEW','ALERT_MANAGE','REPORT_VIEW','REPORT_EXPORT','DOCUMENT_VIEW')
WHERE r.code = 'ACADEMIC_MANAGER';

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'DASHBOARD_VIEW','STUDENT_VIEW','STUDENT_CREATE','STUDENT_UPDATE','STUDENT_ARCHIVE',
    'GUARDIAN_VIEW','GUARDIAN_MANAGE',
    'ADMISSION_VIEW','ADMISSION_MANAGE','ADMISSION_DECIDE',
    'ENROLLMENT_VIEW','ENROLLMENT_CREATE','ENROLLMENT_VALIDATE','ENROLLMENT_CANCEL',
    'CLASS_VIEW','ACADEMIC_YEAR_VIEW','ATTENDANCE_VIEW',
    'DOCUMENT_VIEW','DOCUMENT_GENERATE','REPORT_VIEW','REPORT_EXPORT','IMPORT_EXECUTE',
    'NOTIFICATION_SEND','ALERT_VIEW')
WHERE r.code = 'REGISTRAR';

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'PORTAL_TEACHER','DASHBOARD_VIEW','CLASS_VIEW','STUDENT_VIEW',
    'TIMETABLE_VIEW','ATTENDANCE_VIEW','ATTENDANCE_CREATE','ATTENDANCE_UPDATE',
    'ASSESSMENT_VIEW','ASSESSMENT_CREATE','GRADE_VIEW','GRADE_CREATE',
    'REPORT_CARD_VIEW','DISCIPLINE_VIEW','ALERT_VIEW')
WHERE r.code = 'TEACHER';

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'DASHBOARD_VIEW','FINANCE_VIEW','FINANCE_MANAGE','PAYMENT_VIEW','PAYMENT_CANCEL',
    'DISCOUNT_MANAGE','SCHOLARSHIP_MANAGE','STUDENT_VIEW','GUARDIAN_VIEW',
    'ENROLLMENT_VIEW','REPORT_VIEW','REPORT_EXPORT','DOCUMENT_VIEW','DOCUMENT_GENERATE',
    'ALERT_VIEW','ALERT_MANAGE','AUDIT_VIEW')
WHERE r.code = 'ACCOUNTANT';

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'DASHBOARD_VIEW','FINANCE_VIEW','PAYMENT_VIEW','PAYMENT_CREATE',
    'CASH_SESSION_MANAGE','STUDENT_VIEW','GUARDIAN_VIEW',
    'DOCUMENT_VIEW','DOCUMENT_GENERATE')
WHERE r.code = 'CASHIER';

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'DASHBOARD_VIEW','DISCIPLINE_VIEW','DISCIPLINE_MANAGE','STUDENT_VIEW',
    'GUARDIAN_VIEW','ATTENDANCE_VIEW','CLASS_VIEW','ALERT_VIEW','ALERT_MANAGE',
    'NOTIFICATION_SEND','DOCUMENT_VIEW','DOCUMENT_GENERATE')
WHERE r.code = 'DISCIPLINE_MANAGER';

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'DASHBOARD_VIEW','STUDENT_VIEW','STUDENT_CREATE','STUDENT_UPDATE',
    'GUARDIAN_VIEW','GUARDIAN_MANAGE','ADMISSION_VIEW','ADMISSION_MANAGE',
    'ENROLLMENT_VIEW','CLASS_VIEW','TIMETABLE_VIEW','ATTENDANCE_VIEW',
    'DOCUMENT_VIEW','DOCUMENT_GENERATE','NOTIFICATION_SEND')
WHERE r.code = 'SECRETARY';

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code = 'PORTAL_PARENT'
WHERE r.code = 'PARENT';

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code = 'PORTAL_STUDENT'
WHERE r.code = 'STUDENT';

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'DASHBOARD_VIEW','STUDENT_VIEW','CLASS_VIEW','ENROLLMENT_VIEW','TIMETABLE_VIEW',
    'ATTENDANCE_VIEW','GRADE_VIEW','REPORT_CARD_VIEW','FINANCE_VIEW','REPORT_VIEW')
WHERE r.code = 'VIEWER';

-- Default notification templates (French, the school's working language).
INSERT INTO notification_template (code, channel, locale, subject, body_template) VALUES
 ('ACCOUNT_CREATED','EMAIL','fr','Votre compte {{schoolName}}',
  'Bonjour {{firstName}},\n\nVotre compte a ete cree.\nIdentifiant : {{username}}\nMot de passe provisoire : {{temporaryPassword}}\n\n{{appBaseUrl}}'),
 ('PASSWORD_RESET','EMAIL','fr','Reinitialisation de votre mot de passe',
  'Bonjour {{firstName}},\n\nPour reinitialiser votre mot de passe : {{resetUrl}}\nCe lien expire dans {{expiryMinutes}} minutes.'),
 ('ADMISSION_ACCEPTED','EMAIL','fr','Admission acceptee - {{studentName}}',
  'Bonjour,\n\nLa candidature de {{studentName}} en {{levelName}} a ete acceptee pour {{academicYear}}.'),
 ('ENROLLMENT_CONFIRMED','EMAIL','fr','Inscription confirmee - {{studentName}}',
  'Bonjour,\n\n{{studentName}} est inscrit(e) en {{classroomName}} pour {{academicYear}}.\nMatricule : {{studentNumber}}'),
 ('ABSENCE_RECORDED','EMAIL','fr','Absence de {{studentName}} le {{date}}',
  'Bonjour,\n\n{{studentName}} a ete porte(e) absent(e) le {{date}}{{#subject}} en {{subject}}{{/subject}}.'),
 ('LATENESS_RECORDED','EMAIL','fr','Retard de {{studentName}} le {{date}}',
  'Bonjour,\n\n{{studentName}} est arrive(e) en retard le {{date}} a {{arrivalTime}}.'),
 ('GRADE_PUBLISHED','EMAIL','fr','Nouvelle note pour {{studentName}}',
  'Bonjour,\n\nUne nouvelle note est disponible en {{subjectName}} : {{score}}/{{maxScore}}.'),
 ('REPORT_CARD_PUBLISHED','EMAIL','fr','Bulletin disponible - {{studentName}}',
  'Bonjour,\n\nLe bulletin de {{studentName}} pour {{termName}} est disponible.\nMoyenne generale : {{generalAverage}}/{{scaleMax}}'),
 ('PAYMENT_RECEIVED','EMAIL','fr','Recu {{receiptNumber}}',
  'Bonjour,\n\nNous accusons reception de {{amount}} {{currency}} pour {{studentName}}.\nRecu : {{receiptNumber}}'),
 ('PAYMENT_DUE','EMAIL','fr','Echeance a venir - {{studentName}}',
  'Bonjour,\n\nUne echeance de {{amount}} {{currency}} arrive a echeance le {{dueDate}}.'),
 ('PAYMENT_OVERDUE','EMAIL','fr','Impaye - {{studentName}}',
  'Bonjour,\n\nUn montant de {{amount}} {{currency}} reste impaye depuis le {{dueDate}}.'),
 ('TIMETABLE_CHANGED','EMAIL','fr','Emploi du temps modifie - {{classroomName}}',
  'Bonjour,\n\nL''emploi du temps de {{classroomName}} a ete modifie.'),
 ('COUNCIL_SUMMONS','EMAIL','fr','Convocation - conseil de classe {{classroomName}}',
  'Bonjour,\n\nVous etes convoque(e) au conseil de classe de {{classroomName}} le {{meetingDate}}.'),
 ('DISCIPLINE_INCIDENT','EMAIL','fr','Incident disciplinaire - {{studentName}}',
  'Bonjour,\n\nUn incident concernant {{studentName}} a ete enregistre le {{incidentDate}}.');
