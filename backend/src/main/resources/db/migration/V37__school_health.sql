-- =====================================================================
-- V37 - School health: the infirmary file, its register, vaccinations
-- and the compulsory medical examinations.
--
-- Two rules shape this migration.
--
-- First, medical data is not ordinary school data. It is kept in tables of
-- its own rather than as more columns on `student`, so that reading it can
-- be granted separately: a teacher on a field trip needs to know that a
-- pupil carries an adrenaline pen, not what the pupil is being treated for.
-- The column that a teacher may see is `action_to_take`, and only for a
-- condition marked as an alert.
--
-- Second, the health file follows the child, not the school year. Allergies
-- do not reset in September. Only the visits and the examinations are tied
-- to a year, because they are events.
-- =====================================================================

-- ---------------------------------------------------------------- types

CREATE TYPE health_condition_kind AS ENUM (
    'ALLERGY',           -- allergie, alimentaire ou autre
    'CHRONIC_ILLNESS',   -- asthme, drepanocytose, diabete...
    'TREATMENT',         -- traitement en cours, avec ou sans medicament a l'ecole
    'DISABILITY',        -- situation de handicap demandant un amenagement
    'DIETARY',           -- regime particulier a la cantine
    'OTHER');

-- L'echelle sert a decider ce qui remonte aux encadrants : a partir de
-- 'HIGH' la condition devient une alerte visible en salle des professeurs.
CREATE TYPE health_severity AS ENUM ('LOW', 'MODERATE', 'HIGH', 'CRITICAL');

CREATE TYPE infirmary_outcome AS ENUM (
    'BACK_TO_CLASS',     -- reparti en cours
    'RESTED',            -- garde en observation a l'infirmerie
    'SENT_HOME',         -- confie a la famille
    'REFERRED',          -- oriente vers un centre de sante
    'EMERGENCY');        -- evacuation en urgence

CREATE TYPE examination_kind AS ENUM (
    'ENTRY',             -- visite d'admission
    'ANNUAL',            -- visite annuelle
    'SPORT',             -- aptitude a l'education physique
    'VISION',
    'HEARING',
    'DENTAL');

CREATE TYPE examination_outcome AS ENUM (
    'PENDING',           -- programmee, pas encore passee
    'FIT',
    'FIT_WITH_RESERVE',  -- apte avec amenagement
    'UNFIT',
    'REFERRED',          -- oriente vers un specialiste
    'MISSED');           -- l'eleve ne s'est pas presente

-- ------------------------------------------------------- fiche de sante

CREATE TABLE student_health_record (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Une seule fiche par eleve : deux fiches, c'est deux groupes sanguins
    -- qui finissent par diverger.
    student_id          UUID NOT NULL UNIQUE REFERENCES student(id) ON DELETE CASCADE,

    blood_group         VARCHAR(10),
    -- Le medecin traitant declare par la famille, appele avant l'hopital.
    physician_name      VARCHAR(160),
    physician_phone     VARCHAR(40),
    insurance_name      VARCHAR(160),
    insurance_number    VARCHAR(80),
    notes               TEXT,

    -- L'autorisation ecrite des parents de donner les premiers soins. Sans
    -- elle l'infirmerie n'a le droit que d'appeler la famille, et le noter
    -- ici evite de chercher le papier au mauvais moment.
    care_consent        BOOLEAN NOT NULL DEFAULT FALSE,
    consent_signed_on   DATE,

    reviewed_on         DATE,
    reviewed_by         UUID REFERENCES app_user(id),

    version             BIGINT NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT ck_health_consent CHECK (
        NOT care_consent OR consent_signed_on IS NOT NULL)
);
CREATE TRIGGER trg_student_health_record_updated BEFORE UPDATE ON student_health_record
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE health_condition (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    health_record_id    UUID NOT NULL REFERENCES student_health_record(id) ON DELETE CASCADE,

    kind                health_condition_kind NOT NULL,
    label               VARCHAR(160) NOT NULL,
    severity            health_severity NOT NULL DEFAULT 'MODERATE',
    description         TEXT,

    -- La conduite a tenir : la seule colonne medicale qu'un encadrant voit.
    -- Elle est ecrite pour quelqu'un qui n'est pas soignant et qui doit agir
    -- tout de suite, d'ou la contrainte plus bas sur les alertes.
    action_to_take      TEXT,
    medication          VARCHAR(200),
    -- Vrai lorsque l'eleve garde son traitement sur lui (inhalateur, stylo).
    self_carried        BOOLEAN NOT NULL DEFAULT FALSE,

    declared_on         DATE NOT NULL DEFAULT CURRENT_DATE,
    resolved_on         DATE,
    active              BOOLEAN NOT NULL DEFAULT TRUE,

    version             BIGINT NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),

    -- Une alerte sans conduite a tenir previent d'un danger sans dire quoi
    -- faire : c'est le pire des deux mondes pour le professeur qui la lit.
    CONSTRAINT ck_condition_action CHECK (
        severity NOT IN ('HIGH','CRITICAL')
            OR (action_to_take IS NOT NULL AND length(trim(action_to_take)) > 0)),
    CONSTRAINT ck_condition_resolved CHECK (
        active OR resolved_on IS NOT NULL),
    CONSTRAINT ck_condition_dates CHECK (
        resolved_on IS NULL OR resolved_on >= declared_on)
);
CREATE TRIGGER trg_health_condition_updated BEFORE UPDATE ON health_condition
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX ix_health_condition_record ON health_condition(health_record_id, active);
-- Les alertes se lisent seules, sans parcourir tout le dossier.
CREATE INDEX ix_health_condition_alert ON health_condition(health_record_id)
    WHERE active AND severity IN ('HIGH','CRITICAL');

-- ------------------------------------------------- registre de l'infirmerie

CREATE TABLE infirmary_visit (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id          UUID NOT NULL REFERENCES student(id)       ON DELETE RESTRICT,
    academic_year_id    UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    classroom_id        UUID REFERENCES classroom(id)             ON DELETE SET NULL,

    occurred_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    complaint           VARCHAR(200) NOT NULL,
    -- Ce qui a ete fait. Une ligne vide dans un registre de soins ne prouve
    -- rien le jour ou la famille demande des comptes.
    care_given          TEXT NOT NULL,
    temperature_celsius NUMERIC(4,1),
    outcome             infirmary_outcome NOT NULL DEFAULT 'BACK_TO_CLASS',
    notes               TEXT,

    guardian_notified_at TIMESTAMPTZ,
    -- Renseigne quand l'eleve est oriente ou evacue.
    referred_to         VARCHAR(200),

    recorded_by         UUID REFERENCES app_user(id),
    version             BIGINT NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT ck_visit_temperature CHECK (
        temperature_celsius IS NULL
            OR (temperature_celsius >= 30 AND temperature_celsius <= 45)),
    -- Un eleve confie a sa famille ou evacue sans que personne n'ait ete
    -- prevenu : c'est la faute que le registre doit rendre impossible.
    CONSTRAINT ck_visit_notified CHECK (
        outcome NOT IN ('SENT_HOME','EMERGENCY') OR guardian_notified_at IS NOT NULL),
    CONSTRAINT ck_visit_referred CHECK (
        outcome NOT IN ('REFERRED','EMERGENCY') OR referred_to IS NOT NULL)
);
CREATE TRIGGER trg_infirmary_visit_updated BEFORE UPDATE ON infirmary_visit
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX ix_infirmary_visit_year ON infirmary_visit(academic_year_id, occurred_at DESC);
CREATE INDEX ix_infirmary_visit_student ON infirmary_visit(student_id, occurred_at DESC);

-- ------------------------------------------------------------ vaccinations

-- Le calendrier vaccinal n'est pas fige dans le code : il change, et il n'est
-- pas le meme partout. L'ecole tient sa propre liste de ce qu'elle exige a
-- l'inscription, amorcee ci-dessous avec les vaccins du programme elargi de
-- vaccination et modifiable ensuite.
CREATE TABLE vaccine (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id           UUID NOT NULL REFERENCES school(id) ON DELETE CASCADE,
    code                VARCHAR(40) NOT NULL,
    label               VARCHAR(160) NOT NULL,
    description         VARCHAR(300),
    required            BOOLEAN NOT NULL DEFAULT TRUE,
    doses_expected      SMALLINT NOT NULL DEFAULT 1,
    display_order       SMALLINT NOT NULL DEFAULT 0,
    active              BOOLEAN NOT NULL DEFAULT TRUE,

    version             BIGINT NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT uq_vaccine_code UNIQUE (school_id, code),
    CONSTRAINT ck_vaccine_doses CHECK (doses_expected BETWEEN 1 AND 10)
);
CREATE TRIGGER trg_vaccine_updated BEFORE UPDATE ON vaccine
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE student_vaccination (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    health_record_id    UUID NOT NULL REFERENCES student_health_record(id) ON DELETE CASCADE,
    vaccine_id          UUID NOT NULL REFERENCES vaccine(id) ON DELETE RESTRICT,

    doses_received      SMALLINT NOT NULL DEFAULT 0,
    last_dose_on        DATE,
    next_dose_due_on    DATE,
    -- Vrai seulement quand le carnet a ete presente au secretariat. Une
    -- declaration orale de la famille n'est pas une preuve.
    certificate_seen    BOOLEAN NOT NULL DEFAULT FALSE,
    notes               VARCHAR(300),

    version             BIGINT NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT uq_student_vaccination UNIQUE (health_record_id, vaccine_id),
    CONSTRAINT ck_vaccination_doses CHECK (doses_received BETWEEN 0 AND 10),
    CONSTRAINT ck_vaccination_dose_date CHECK (
        doses_received = 0 OR last_dose_on IS NOT NULL)
);
CREATE TRIGGER trg_student_vaccination_updated BEFORE UPDATE ON student_vaccination
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX ix_student_vaccination_record ON student_vaccination(health_record_id);

-- ------------------------------------------------------ visites medicales

CREATE TABLE medical_examination (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id          UUID NOT NULL REFERENCES student(id)       ON DELETE RESTRICT,
    academic_year_id    UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,

    kind                examination_kind NOT NULL,
    scheduled_on        DATE NOT NULL,
    performed_on        DATE,
    outcome             examination_outcome NOT NULL DEFAULT 'PENDING',
    -- La reserve prononcee : dispense de course, place au premier rang.
    restriction         VARCHAR(300),
    practitioner        VARCHAR(160),
    notes               TEXT,

    recorded_by         UUID REFERENCES app_user(id),
    version             BIGINT NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT uq_examination_year UNIQUE (student_id, academic_year_id, kind),
    -- Une visite dont le resultat est connu a forcement eu lieu.
    CONSTRAINT ck_examination_performed CHECK (
        outcome IN ('PENDING','MISSED') OR performed_on IS NOT NULL),
    -- Et une aptitude sous reserve doit dire laquelle, sinon l'enseignant
    -- d'education physique ne sait pas ce qu'il doit amenager.
    CONSTRAINT ck_examination_reserve CHECK (
        outcome <> 'FIT_WITH_RESERVE'
            OR (restriction IS NOT NULL AND length(trim(restriction)) > 0)),
    CONSTRAINT ck_examination_dates CHECK (
        performed_on IS NULL OR performed_on >= scheduled_on - 365)
);
CREATE TRIGGER trg_medical_examination_updated BEFORE UPDATE ON medical_examination
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX ix_medical_examination_year
    ON medical_examination(academic_year_id, outcome);

-- --------------------------------------------------------------- reprise

-- `student` portait deja un groupe sanguin et des notes medicales, declares
-- mais jamais lus. On les recupere dans la fiche et on les retire de la
-- table des eleves : les laisser en place creerait un second groupe sanguin
-- qui divergerait du premier des la premiere correction.
INSERT INTO student_health_record (student_id, blood_group, notes)
SELECT id, blood_group, medical_notes
FROM student
WHERE blood_group IS NOT NULL OR medical_notes IS NOT NULL;

ALTER TABLE student DROP COLUMN blood_group;
ALTER TABLE student DROP COLUMN medical_notes;

-- Le calendrier de depart, repris du programme elargi de vaccination. Chaque
-- ecole l'ajuste ensuite : c'est une liste de ce qu'elle exige, pas une
-- prescription medicale.
INSERT INTO vaccine (school_id, code, label, description, required, doses_expected, display_order)
SELECT s.id, v.code, v.label, v.description, v.required, v.doses, v.ord
FROM school s
CROSS JOIN (VALUES
    ('BCG',        'BCG',                      'Tuberculose',                    TRUE,  1::SMALLINT, 1::SMALLINT),
    ('POLIO',      'Poliomyelite',             'Poliomyelite orale et injectable', TRUE, 4::SMALLINT, 2::SMALLINT),
    ('PENTA',      'Pentavalent',              'Diphterie, tetanos, coqueluche, hepatite B, Hib', TRUE, 3::SMALLINT, 3::SMALLINT),
    ('ROUGEOLE',   'Rougeole et rubeole',      'Rougeole, rubeole',              TRUE,  2::SMALLINT, 4::SMALLINT),
    ('FIEVRE_J',   'Fievre jaune',             'Fievre jaune',                   TRUE,  1::SMALLINT, 5::SMALLINT),
    ('DTC_RAPPEL', 'Rappel diphterie-tetanos', 'Rappel a l''age scolaire',       FALSE, 1::SMALLINT, 6::SMALLINT)
) AS v(code, label, description, required, doses, ord);

-- ------------------------------------------------------------------- RLS

-- Ces tables naissent apres V31 et declarent donc leur propre cloison. Celles
-- qui pendent a un eleve passent par lui ; `vaccine` porte l'ecole en direct.
ALTER TABLE student_health_record ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_health_record FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON student_health_record
    USING (EXISTS (SELECT 1 FROM student s
        WHERE s.id = student_health_record.student_id AND tenant_allows(s.school_id)))
    WITH CHECK (EXISTS (SELECT 1 FROM student s
        WHERE s.id = student_health_record.student_id AND tenant_allows(s.school_id)));

ALTER TABLE health_condition ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_condition FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON health_condition
    USING (EXISTS (SELECT 1 FROM student_health_record r JOIN student s ON s.id = r.student_id
        WHERE r.id = health_condition.health_record_id AND tenant_allows(s.school_id)))
    WITH CHECK (EXISTS (SELECT 1 FROM student_health_record r JOIN student s ON s.id = r.student_id
        WHERE r.id = health_condition.health_record_id AND tenant_allows(s.school_id)));

ALTER TABLE infirmary_visit ENABLE ROW LEVEL SECURITY;
ALTER TABLE infirmary_visit FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON infirmary_visit
    USING (EXISTS (SELECT 1 FROM student s
        WHERE s.id = infirmary_visit.student_id AND tenant_allows(s.school_id)))
    WITH CHECK (EXISTS (SELECT 1 FROM student s
        WHERE s.id = infirmary_visit.student_id AND tenant_allows(s.school_id)));

ALTER TABLE vaccine ENABLE ROW LEVEL SECURITY;
ALTER TABLE vaccine FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON vaccine
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE student_vaccination ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_vaccination FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON student_vaccination
    USING (EXISTS (SELECT 1 FROM student_health_record r JOIN student s ON s.id = r.student_id
        WHERE r.id = student_vaccination.health_record_id AND tenant_allows(s.school_id)))
    WITH CHECK (EXISTS (SELECT 1 FROM student_health_record r JOIN student s ON s.id = r.student_id
        WHERE r.id = student_vaccination.health_record_id AND tenant_allows(s.school_id)));

ALTER TABLE medical_examination ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_examination FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON medical_examination
    USING (EXISTS (SELECT 1 FROM student s
        WHERE s.id = medical_examination.student_id AND tenant_allows(s.school_id)))
    WITH CHECK (EXISTS (SELECT 1 FROM student s
        WHERE s.id = medical_examination.student_id AND tenant_allows(s.school_id)));

-- ------------------------------------------------- droits et role infirmerie

-- V30 distribuait les permissions par CROSS JOIN : les permissions creees
-- ici ne sont donc donnees a personne tant qu'on ne le fait pas explicitement.
-- Pour du medical, c'est la bonne facon de s'y prendre - on nomme qui voit
-- quoi au lieu de l'heriter par megarde.
INSERT INTO app_permission (code, label, module) VALUES
 ('HEALTH_RECORD_VIEW',   'View the health file',        'health'),
 ('HEALTH_RECORD_MANAGE', 'Update the health file',      'health'),
 ('HEALTH_VISIT_VIEW',    'View the infirmary register', 'health'),
 ('HEALTH_VISIT_RECORD',  'Record an infirmary visit',   'health'),
 ('HEALTH_ALERT_VIEW',    'View health alerts only',     'health');

INSERT INTO app_role (code, label, description, system_role) VALUES
 ('NURSE', 'School nurse', 'Infirmary: health files, visits, vaccinations', TRUE);

-- L'infirmerie, la direction et les administrateurs voient le dossier entier.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'HEALTH_RECORD_VIEW','HEALTH_RECORD_MANAGE',
    'HEALTH_VISIT_VIEW','HEALTH_VISIT_RECORD','HEALTH_ALERT_VIEW')
WHERE r.code IN ('SUPER_ADMIN','SCHOOL_ADMIN','DIRECTOR','NURSE');

-- Le personnel encadrant ne recoit que l'alerte et la conduite a tenir. Assez
-- pour agir pendant les cinq minutes ou cela compte, sans ouvrir le dossier.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code = 'HEALTH_ALERT_VIEW'
WHERE r.code IN ('TEACHER','ACADEMIC_MANAGER','REGISTRAR','SECRETARY','DISCIPLINE_MANAGER');

-- L'infirmiere a par ailleurs besoin de retrouver un eleve et sa classe.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'DASHBOARD_VIEW','STUDENT_VIEW','CLASS_VIEW','ENROLLMENT_VIEW',
    'GUARDIAN_VIEW','NOTIFICATION_SEND','DOCUMENT_VIEW')
WHERE r.code = 'NURSE';

COMMENT ON TABLE student_health_record IS
    'Fiche de sante de l''eleve : elle suit l''enfant, pas l''annee scolaire.';
COMMENT ON COLUMN health_condition.action_to_take IS
    'Conduite a tenir, ecrite pour un non-soignant. Seule colonne medicale '
    'visible d''un encadrant, et seulement si la condition est une alerte.';
COMMENT ON TABLE vaccine IS
    'Ce que l''ecole exige a l''inscription. Liste modifiable, pas une '
    'prescription medicale.';
COMMENT ON TABLE infirmary_visit IS
    'Registre des passages a l''infirmerie : plainte, soins donnes, suite.';
