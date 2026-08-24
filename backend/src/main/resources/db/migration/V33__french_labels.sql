-- =====================================================================
-- V32 - Textes en francais correct : accents et cedilles
--
-- Les libelles et modeles d'e-mail inseres par V30 avaient ete ecrits sans
-- accents, ce qui donne du francais incorrect sous les yeux des directeurs,
-- des enseignants et des parents. Cette migration les reecrit.
--
-- V30 n'est volontairement pas modifiee : elle a pu deja etre appliquee, et
-- retoucher une migration executee invalide son empreinte Flyway. On corrige
-- donc les donnees, pas l'historique.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Modeles d'e-mail
-- ---------------------------------------------------------------------
UPDATE notification_template SET
    subject = 'Votre compte {{schoolName}}',
    body_template = 'Bonjour {{firstName}},' || chr(10) || chr(10) ||
        'Votre compte a été créé.' || chr(10) ||
        'Identifiant : {{username}}' || chr(10) ||
        'Mot de passe provisoire : {{temporaryPassword}}' || chr(10) || chr(10) ||
        '{{appBaseUrl}}'
WHERE code = 'ACCOUNT_CREATED' AND school_id IS NULL;

UPDATE notification_template SET
    subject = 'Réinitialisation de votre mot de passe',
    body_template = 'Bonjour {{firstName}},' || chr(10) || chr(10) ||
        'Pour réinitialiser votre mot de passe : {{resetUrl}}' || chr(10) ||
        'Ce lien expire dans {{expiryMinutes}} minutes.'
WHERE code = 'PASSWORD_RESET' AND school_id IS NULL;

UPDATE notification_template SET
    subject = 'Admission acceptée - {{studentName}}',
    body_template = 'Bonjour,' || chr(10) || chr(10) ||
        'La candidature de {{studentName}} en {{levelName}} a été acceptée ' ||
        'pour l''année scolaire {{academicYear}}.'
WHERE code = 'ADMISSION_ACCEPTED' AND school_id IS NULL;

UPDATE notification_template SET
    subject = 'Inscription confirmée - {{studentName}}',
    body_template = 'Bonjour,' || chr(10) || chr(10) ||
        '{{studentName}} est inscrit(e) en {{classroomName}} pour {{academicYear}}.' || chr(10) ||
        'Matricule : {{studentNumber}}'
WHERE code = 'ENROLLMENT_CONFIRMED' AND school_id IS NULL;

UPDATE notification_template SET
    subject = 'Absence de {{studentName}} le {{date}}',
    body_template = 'Bonjour,' || chr(10) || chr(10) ||
        '{{studentName}} a été porté(e) absent(e) le {{date}}.' || chr(10) || chr(10) ||
        'Si cette absence est justifiée, merci de transmettre un justificatif ' ||
        'au secrétariat de l''établissement.'
WHERE code = 'ABSENCE_RECORDED' AND school_id IS NULL;

UPDATE notification_template SET
    subject = 'Retard de {{studentName}} le {{date}}',
    body_template = 'Bonjour,' || chr(10) || chr(10) ||
        '{{studentName}} est arrivé(e) en retard le {{date}} à {{arrivalTime}}.'
WHERE code = 'LATENESS_RECORDED' AND school_id IS NULL;

UPDATE notification_template SET
    subject = 'Nouvelle note pour {{studentName}}',
    body_template = 'Bonjour,' || chr(10) || chr(10) ||
        'Une nouvelle note est disponible en {{subjectName}} : {{score}}/{{maxScore}}.'
WHERE code = 'GRADE_PUBLISHED' AND school_id IS NULL;

UPDATE notification_template SET
    subject = 'Bulletin disponible - {{studentName}}',
    body_template = 'Bonjour,' || chr(10) || chr(10) ||
        'Le bulletin de {{studentName}} pour {{termName}} est disponible.' || chr(10) ||
        'Moyenne générale : {{generalAverage}}/{{scaleMax}}'
WHERE code = 'REPORT_CARD_PUBLISHED' AND school_id IS NULL;

UPDATE notification_template SET
    subject = 'Reçu {{receiptNumber}}',
    body_template = 'Bonjour,' || chr(10) || chr(10) ||
        'Nous accusons réception de {{amount}} {{currency}} pour {{studentName}}.' || chr(10) ||
        'Numéro de reçu : {{receiptNumber}}' || chr(10) || chr(10) ||
        'Merci de conserver ce message.'
WHERE code = 'PAYMENT_RECEIVED' AND school_id IS NULL;

UPDATE notification_template SET
    subject = 'Échéance à venir - {{studentName}}',
    body_template = 'Bonjour,' || chr(10) || chr(10) ||
        'Une échéance de {{amount}} {{currency}} arrive à échéance le {{dueDate}} ' ||
        'pour {{studentName}}.'
WHERE code = 'PAYMENT_DUE' AND school_id IS NULL;

UPDATE notification_template SET
    subject = 'Impayé - {{studentName}}',
    body_template = 'Bonjour,' || chr(10) || chr(10) ||
        'Un montant de {{amount}} {{currency}} reste impayé depuis le {{dueDate}} ' ||
        'pour {{studentName}}.' || chr(10) || chr(10) ||
        'Merci de régulariser la situation auprès du service comptabilité.'
WHERE code = 'PAYMENT_OVERDUE' AND school_id IS NULL;

UPDATE notification_template SET
    subject = 'Emploi du temps modifié - {{classroomName}}',
    body_template = 'Bonjour,' || chr(10) || chr(10) ||
        'L''emploi du temps de {{classroomName}} a été modifié.'
WHERE code = 'TIMETABLE_CHANGED' AND school_id IS NULL;

UPDATE notification_template SET
    subject = 'Convocation - conseil de classe {{classroomName}}',
    body_template = 'Bonjour,' || chr(10) || chr(10) ||
        'Vous êtes convoqué(e) au conseil de classe de {{classroomName}} ' ||
        'le {{meetingDate}}.'
WHERE code = 'COUNCIL_SUMMONS' AND school_id IS NULL;

UPDATE notification_template SET
    subject = 'Incident disciplinaire - {{studentName}}',
    body_template = 'Bonjour,' || chr(10) || chr(10) ||
        'Un incident concernant {{studentName}} a été enregistré le {{incidentDate}}.' ||
        chr(10) || chr(10) ||
        'La direction vous contactera pour un entretien.'
WHERE code = 'DISCIPLINE_INCIDENT' AND school_id IS NULL;

-- ---------------------------------------------------------------------
-- Libelles des roles : ils s'affichent dans l'interface, donc en francais
-- ---------------------------------------------------------------------
UPDATE app_role SET label = v.label, description = v.description
FROM (VALUES
 ('SUPER_ADMIN',        'Super administrateur',   'Accès technique et fonctionnel complet'),
 ('SCHOOL_ADMIN',       'Administrateur',         'Accès fonctionnel complet à un établissement'),
 ('DIRECTOR',           'Direction',              'Pilotage de l''établissement et décisions'),
 ('ACADEMIC_MANAGER',   'Responsable pédagogique','Structure académique, emploi du temps, notes'),
 ('REGISTRAR',          'Secrétariat scolarité',  'Admissions, inscriptions et dossiers élèves'),
 ('TEACHER',            'Enseignant',             'Ses classes : présences et notes'),
 ('ACCOUNTANT',         'Comptable',              'Frais, factures et suivi financier'),
 ('CASHIER',            'Caissier',               'Encaissements, reçus et sessions de caisse'),
 ('DISCIPLINE_MANAGER', 'Responsable discipline', 'Incidents et sanctions'),
 ('SECRETARY',          'Secrétaire',             'Gestion administrative quotidienne'),
 ('PARENT',             'Parent',                 'Portail parent, ses enfants uniquement'),
 ('STUDENT',            'Élève',                  'Portail élève, son dossier uniquement'),
 ('VIEWER',             'Consultation',           'Accès en lecture seule')
) AS v(code, label, description)
WHERE app_role.code = v.code;

-- ---------------------------------------------------------------------
-- Libelles des permissions, affiches dans l'ecran de gestion des roles
-- ---------------------------------------------------------------------
UPDATE app_permission SET label = v.label
FROM (VALUES
 ('STUDENT_VIEW','Consulter les élèves'),
 ('STUDENT_CREATE','Créer des élèves'),
 ('STUDENT_UPDATE','Modifier les élèves'),
 ('STUDENT_ARCHIVE','Archiver des élèves'),
 ('GUARDIAN_VIEW','Consulter les responsables'),
 ('GUARDIAN_MANAGE','Gérer les responsables'),
 ('ADMISSION_VIEW','Consulter les admissions'),
 ('ADMISSION_MANAGE','Gérer les admissions'),
 ('ADMISSION_DECIDE','Décider des admissions'),
 ('ENROLLMENT_VIEW','Consulter les inscriptions'),
 ('ENROLLMENT_CREATE','Créer des inscriptions'),
 ('ENROLLMENT_VALIDATE','Valider les inscriptions'),
 ('ENROLLMENT_CANCEL','Annuler des inscriptions'),
 ('ENROLLMENT_OVERRIDE_CAPACITY','Inscrire au-delà de la capacité'),
 ('TEACHER_VIEW','Consulter les enseignants'),
 ('TEACHER_MANAGE','Gérer les enseignants'),
 ('STAFF_VIEW','Consulter le personnel'),
 ('STAFF_MANAGE','Gérer le personnel'),
 ('SCHOOL_VIEW','Consulter les paramètres'),
 ('SCHOOL_MANAGE','Gérer les paramètres'),
 ('ACADEMIC_YEAR_VIEW','Consulter les années scolaires'),
 ('ACADEMIC_YEAR_MANAGE','Gérer les années scolaires'),
 ('CLASS_VIEW','Consulter les classes'),
 ('CLASS_MANAGE','Gérer les classes'),
 ('SUBJECT_VIEW','Consulter les matières'),
 ('SUBJECT_MANAGE','Gérer les matières'),
 ('CURRICULUM_VIEW','Consulter les programmes'),
 ('CURRICULUM_MANAGE','Gérer les programmes'),
 ('TIMETABLE_VIEW','Consulter les emplois du temps'),
 ('TIMETABLE_MANAGE','Gérer les emplois du temps'),
 ('ATTENDANCE_VIEW','Consulter les présences'),
 ('ATTENDANCE_CREATE','Faire l''appel'),
 ('ATTENDANCE_UPDATE','Modifier les présences'),
 ('ATTENDANCE_JUSTIFY','Justifier les absences'),
 ('ASSESSMENT_VIEW','Consulter les évaluations'),
 ('ASSESSMENT_CREATE','Créer des évaluations'),
 ('ASSESSMENT_MANAGE','Gérer les évaluations'),
 ('GRADE_VIEW','Consulter les notes'),
 ('GRADE_CREATE','Saisir des notes'),
 ('GRADE_VALIDATE','Valider les notes'),
 ('GRADE_PUBLISH','Publier les notes'),
 ('GRADE_CORRECT_PUBLISHED','Corriger une note publiée'),
 ('REPORT_CARD_VIEW','Consulter les bulletins'),
 ('REPORT_CARD_GENERATE','Générer les bulletins'),
 ('REPORT_CARD_PUBLISH','Publier les bulletins'),
 ('COUNCIL_VIEW','Consulter les conseils de classe'),
 ('COUNCIL_MANAGE','Gérer les conseils de classe'),
 ('PROMOTION_DECIDE','Décider des passages'),
 ('DISCIPLINE_VIEW','Consulter la discipline'),
 ('DISCIPLINE_MANAGE','Gérer la discipline'),
 ('FINANCE_VIEW','Consulter les finances'),
 ('FINANCE_MANAGE','Gérer les frais et échéanciers'),
 ('PAYMENT_VIEW','Consulter les paiements'),
 ('PAYMENT_CREATE','Encaisser des paiements'),
 ('PAYMENT_CANCEL','Annuler des paiements'),
 ('CASH_SESSION_MANAGE','Gérer les sessions de caisse'),
 ('DISCOUNT_MANAGE','Accorder des remises'),
 ('SCHOLARSHIP_MANAGE','Accorder des bourses'),
 ('DOCUMENT_VIEW','Consulter les documents'),
 ('DOCUMENT_GENERATE','Générer des documents officiels'),
 ('NOTIFICATION_SEND','Envoyer des notifications'),
 ('ALERT_VIEW','Consulter les alertes'),
 ('ALERT_MANAGE','Traiter les alertes'),
 ('DASHBOARD_VIEW','Consulter le tableau de bord'),
 ('REPORT_VIEW','Consulter les rapports'),
 ('REPORT_EXPORT','Exporter les rapports'),
 ('IMPORT_EXECUTE','Importer des données'),
 ('AUDIT_VIEW','Consulter le journal d''audit'),
 ('USER_MANAGE','Gérer les comptes utilisateurs'),
 ('ROLE_MANAGE','Gérer les rôles et permissions'),
 ('PORTAL_TEACHER','Accéder au portail enseignant'),
 ('PORTAL_PARENT','Accéder au portail parent'),
 ('PORTAL_STUDENT','Accéder au portail élève')
) AS v(code, label)
WHERE app_permission.code = v.code;
