-- =====================================================================
-- V38 - Communication: reminders and announcements to families.
--
-- Three decisions are frozen in this schema.
--
-- First, a campaign keeps what each family actually received, not the
-- template it came from. `message_recipient.rendered_body` is written once,
-- at send time. Re-rendering a template six months later would show today's
-- amount owed on a reminder that quoted another figure, and the school would
-- be arguing about a message it can no longer produce.
--
-- Second, the address is frozen too. A guardian who changes phone number
-- after the fact must not make last term's SMS look as though it went
-- somewhere it never went.
--
-- Third, nothing is sent without an explicit second step. A campaign is
-- created as DRAFT with its recipient list resolved and costed; only an
-- explicit send moves it on. An SMS cannot be recalled.
-- =====================================================================

CREATE TYPE campaign_kind AS ENUM (
    'REMINDER',       -- relance alimentee par un module
    'ANNOUNCEMENT');  -- message libre a une classe, un niveau, l'ecole

-- Ce que le logiciel sait deja et n'a pas a faire ressaisir.
CREATE TYPE reminder_type AS ENUM (
    'UNPAID_FEES',        -- scolarite en retard
    'REPEATED_ABSENCE',   -- absences repetees non justifiees
    'MISSING_VACCINE',    -- vaccin exige sans preuve au dossier
    'OVERDUE_EXAM',       -- visite medicale prevue, jamais passee
    'MISSING_DOCUMENT',   -- piece de sortie non remise
    'REPORT_CARD');       -- bulletin publie, a venir chercher

CREATE TYPE campaign_status AS ENUM (
    'DRAFT',       -- destinataires resolus, rien n'est parti
    'SENDING',     -- envoi en cours
    'SENT',        -- termine, meme avec des echecs individuels
    'CANCELLED');

CREATE TABLE messaging_settings (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- Un seul reglage par ecole : deux tarifs SMS concurrents donneraient deux
    -- estimations de cout pour le meme envoi.
    school_id         UUID NOT NULL UNIQUE REFERENCES school(id) ON DELETE CASCADE,

    -- Le nom affiche a la place du numero, quand l'operateur le permet.
    sms_sender_name   VARCHAR(11),
    -- Prix d'un segment SMS. NUMERIC, jamais un flottant : ce chiffre est
    -- multiplie par des milliers d'envois et annonce au directeur.
    sms_unit_cost     NUMERIC(10,2) NOT NULL DEFAULT 0,
    currency          VARCHAR(3) NOT NULL DEFAULT 'XOF',
    -- Plafond quotidien. Un filtre mal pose peut viser toute l'ecole ; ce
    -- nombre est ce qui separe une erreur d'un desastre facturable.
    daily_sms_cap     INTEGER NOT NULL DEFAULT 500,

    reply_to_email    VARCHAR(180),
    signature         VARCHAR(200),

    version           BIGINT NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT ck_messaging_cost CHECK (sms_unit_cost >= 0),
    CONSTRAINT ck_messaging_cap CHECK (daily_sms_cap >= 0)
);
CREATE TRIGGER trg_messaging_settings_updated BEFORE UPDATE ON messaging_settings
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE message_campaign (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id         UUID NOT NULL REFERENCES school(id) ON DELETE CASCADE,
    academic_year_id  UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,

    kind              campaign_kind NOT NULL,
    -- Renseigne pour une relance, nul pour une annonce libre.
    reminder          reminder_type,
    channel           notification_channel NOT NULL,

    title             VARCHAR(200) NOT NULL,
    subject           VARCHAR(200),
    -- Le gabarit tel que redige, avec ses variables. Ce qui est parti est
    -- conserve destinataire par destinataire, plus bas.
    body_template     TEXT NOT NULL,

    -- La cible telle que decrite au moment de la creation, en clair, pour que
    -- le journal reste lisible sans rejouer la requete.
    audience_label    VARCHAR(300) NOT NULL,
    classroom_id      UUID REFERENCES classroom(id) ON DELETE SET NULL,

    status            campaign_status NOT NULL DEFAULT 'DRAFT',
    recipient_count   INTEGER NOT NULL DEFAULT 0,
    segment_count     INTEGER NOT NULL DEFAULT 0,
    sent_count        INTEGER NOT NULL DEFAULT 0,
    failed_count      INTEGER NOT NULL DEFAULT 0,
    -- Cout estime au moment de l'envoi, fige. Le tarif peut changer.
    estimated_cost    NUMERIC(12,2) NOT NULL DEFAULT 0,
    currency          VARCHAR(3) NOT NULL DEFAULT 'XOF',

    created_by        UUID REFERENCES app_user(id),
    sent_by           UUID REFERENCES app_user(id),
    sent_at           TIMESTAMPTZ,
    cancelled_reason  TEXT,

    version           BIGINT NOT NULL DEFAULT 0,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

    -- Une relance dit de quoi elle relance ; une annonce n'a rien a declarer.
    CONSTRAINT ck_campaign_reminder CHECK (
        (kind = 'REMINDER' AND reminder IS NOT NULL)
        OR (kind = 'ANNOUNCEMENT' AND reminder IS NULL)),
    CONSTRAINT ck_campaign_sent CHECK (
        status <> 'SENT' OR sent_at IS NOT NULL),
    CONSTRAINT ck_campaign_cancelled CHECK (
        status <> 'CANCELLED' OR cancelled_reason IS NOT NULL),
    CONSTRAINT ck_campaign_counts CHECK (
        recipient_count >= 0 AND sent_count >= 0 AND failed_count >= 0
        AND sent_count + failed_count <= recipient_count),
    CONSTRAINT ck_campaign_cost CHECK (estimated_cost >= 0)
);
CREATE TRIGGER trg_message_campaign_updated BEFORE UPDATE ON message_campaign
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX ix_message_campaign_year ON message_campaign(academic_year_id, created_at DESC);
CREATE INDEX ix_message_campaign_status ON message_campaign(school_id, status);

CREATE TABLE message_recipient (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id       UUID NOT NULL REFERENCES message_campaign(id) ON DELETE CASCADE,
    guardian_id       UUID REFERENCES guardian(id) ON DELETE SET NULL,
    student_id        UUID REFERENCES student(id)  ON DELETE SET NULL,

    -- Le nom au moment de l'envoi. Un tuteur supprime plus tard laisserait
    -- sinon une ligne de journal sans personne en face.
    recipient_name    VARCHAR(240) NOT NULL,
    -- L'adresse reellement utilisee, figee. Un changement de numero apres coup
    -- ne doit pas reecrire l'histoire d'un envoi.
    address           VARCHAR(180) NOT NULL,
    channel           notification_channel NOT NULL,

    rendered_subject  VARCHAR(200),
    -- Ce que la famille a lu, mot pour mot.
    rendered_body     TEXT NOT NULL,
    -- Nombre de segments SMS factures pour ce message precis.
    segments          SMALLINT NOT NULL DEFAULT 1,

    status            notification_status NOT NULL DEFAULT 'PENDING',
    sent_at           TIMESTAMPTZ,
    failure_reason    TEXT,
    -- L'identifiant rendu par l'operateur, pour rapprocher une reclamation.
    provider_ref      VARCHAR(120),

    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT ck_recipient_segments CHECK (segments >= 1),
    CONSTRAINT ck_recipient_sent CHECK (status <> 'SENT' OR sent_at IS NOT NULL),
    CONSTRAINT ck_recipient_failed CHECK (status <> 'FAILED' OR failure_reason IS NOT NULL)
);
CREATE TRIGGER trg_message_recipient_updated BEFORE UPDATE ON message_recipient
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE INDEX ix_message_recipient_campaign ON message_recipient(campaign_id, status);
CREATE INDEX ix_message_recipient_student ON message_recipient(student_id);
-- Retrouver tout ce qu'une famille a recu : la premiere question posee quand
-- un parent affirme n'avoir rien recu.
CREATE INDEX ix_message_recipient_guardian ON message_recipient(guardian_id, created_at DESC);

-- ------------------------------------------------------------------- RLS

ALTER TABLE messaging_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE messaging_settings FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON messaging_settings
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

ALTER TABLE message_campaign ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_campaign FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON message_campaign
    USING (tenant_allows(school_id))
    WITH CHECK (tenant_allows(school_id));

-- Les destinataires pendent a la campagne, qui porte l'ecole.
ALTER TABLE message_recipient ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_recipient FORCE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON message_recipient
    USING (EXISTS (SELECT 1 FROM message_campaign c
        WHERE c.id = message_recipient.campaign_id AND tenant_allows(c.school_id)))
    WITH CHECK (EXISTS (SELECT 1 FROM message_campaign c
        WHERE c.id = message_recipient.campaign_id AND tenant_allows(c.school_id)));

-- --------------------------------------------------------------- droits

-- V30 distribuait les permissions par CROSS JOIN : celles creees ici doivent
-- etre attribuees explicitement.
INSERT INTO app_permission (code, label, module) VALUES
 ('MESSAGE_VIEW',     'View campaigns and the send log', 'messaging'),
 ('MESSAGE_COMPOSE',  'Prepare a campaign',              'messaging'),
 ('MESSAGE_SEND',     'Actually send a campaign',        'messaging'),
 ('MESSAGE_SETTINGS', 'Change messaging settings',       'messaging');

-- Preparer et envoyer sont separes a dessein : une secretaire peut constituer
-- la relance, la direction decide qu'elle part.
--
-- V40 a supprime l'unicite globale du code de role : deux ecoles peuvent
-- desormais definir un profil local portant le meme code qu'un autre. Les
-- attributions ci-dessous visent donc explicitement les profils systeme
-- (school_id IS NULL), faute de quoi elles accorderaient ces droits aux
-- profils locaux d'etablissements qui ne les ont pas demandes.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'MESSAGE_VIEW','MESSAGE_COMPOSE','MESSAGE_SEND','MESSAGE_SETTINGS')
WHERE r.school_id IS NULL AND r.code IN ('SUPER_ADMIN','SCHOOL_ADMIN','DIRECTOR');

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'MESSAGE_VIEW','MESSAGE_COMPOSE')
WHERE r.school_id IS NULL AND r.code IN ('REGISTRAR','SECRETARY','ACADEMIC_MANAGER','NURSE');

-- La comptabilite relance elle-meme les impayes : c'est son metier.
INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'MESSAGE_VIEW','MESSAGE_COMPOSE','MESSAGE_SEND')
WHERE r.school_id IS NULL AND r.code = 'ACCOUNTANT';

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code = 'MESSAGE_VIEW'
WHERE r.school_id IS NULL AND r.code = 'TEACHER';

-- Un reglage par ecole existante, avec le plafond par defaut.
INSERT INTO messaging_settings (school_id, sms_unit_cost, currency, daily_sms_cap)
SELECT id, 0, 'XOF', 500 FROM school;

COMMENT ON COLUMN message_recipient.rendered_body IS
    'Ce que la famille a lu, mot pour mot. Fige a l''envoi : rejouer le '
    'gabarit plus tard donnerait un autre texte.';
COMMENT ON COLUMN message_recipient.address IS
    'Numero ou courriel reellement utilise, fige. Un changement ulterieur ne '
    'doit pas reecrire l''histoire d''un envoi.';
COMMENT ON COLUMN messaging_settings.daily_sms_cap IS
    'Plafond quotidien de segments SMS. Ce qui separe une erreur de filtre '
    'd''un desastre facturable.';
