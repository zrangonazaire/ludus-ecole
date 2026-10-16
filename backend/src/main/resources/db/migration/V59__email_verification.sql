-- =====================================================================
-- V59 - Confirmation de l'adresse e-mail
--
-- Le premier compte d'un établissement (son administrateur) reste PENDING
-- tant que son adresse n'a pas été confirmée : personne ne peut ouvrir de
-- session avec une adresse qu'il ne possède pas, ni usurper celle d'autrui.
--
-- Le jeton envoyé par e-mail n'est JAMAIS stocké en clair : seule son
-- empreinte SHA-256 l'est. Une fuite de la base ne permet donc pas de
-- confirmer (ni de rejouer) une adresse.
-- =====================================================================

ALTER TABLE app_user
    ADD COLUMN email_verified_at TIMESTAMPTZ;

-- Les comptes actifs existants sont considérés comme déjà confirmés.
UPDATE app_user
   SET email_verified_at = COALESCE(created_at, now())
 WHERE status = 'ACTIVE';

CREATE TABLE email_verification_token (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID        NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
    token_hash   VARCHAR(64) NOT NULL,
    expires_at   TIMESTAMPTZ NOT NULL,
    consumed_at  TIMESTAMPTZ,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    request_ip   VARCHAR(64)
);

-- Recherche par empreinte à la confirmation ; unique par construction
-- (256 bits d'entropie), ce qui protège aussi d'un bug de génération.
CREATE UNIQUE INDEX ux_email_verification_token_hash
    ON email_verification_token (token_hash);

-- Cooldown de renvoi et purge : « dernier jeton de cet utilisateur ».
CREATE INDEX ix_email_verification_token_user
    ON email_verification_token (user_id, created_at DESC);
