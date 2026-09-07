-- =====================================================================
-- V44 - Cloisonner le journal d'audit par etablissement
-- =====================================================================
--
-- La table audit_log a echappe a V31 : elle porte bien une colonne
-- school_id, mais aucune politique ne l'utilisait, et la colonne restait
-- vide dans cinquante-quatre des soixante-six ecritures. Tant que le
-- journal n'etait lu par aucun ecran, cela ne se voyait pas. Le jour ou on
-- l'expose, c'est l'historique complet du voisin — qui s'est connecte, ce
-- qui a ete modifie, sur quelles fiches — qui devient lisible.
--
-- Le service remplit desormais school_id depuis le contexte de la requete.
-- Cette migration pose la cloison qui le rend contraignant.

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log FORCE ROW LEVEL SECURITY;

-- Les lignes sans etablissement restent invisibles a tout locataire : elles
-- ne peuvent etre attribuees a personne, et les rattacher au hasard serait
-- pire que de les taire. Le contournement technique (tenant_bypass) les
-- voit toujours, pour l'exploitation.
CREATE POLICY tenant_isolation ON audit_log
    USING (tenant_bypass_active()
           OR (school_id IS NOT NULL AND tenant_allows(school_id)))
    WITH CHECK (TRUE);

COMMENT ON COLUMN audit_log.school_id IS
    'Etablissement concerne, renseigne automatiquement depuis le contexte de '
    'la requete. Une ligne sans etablissement n''est visible d''aucun '
    'locataire : elle ne peut pas etre attribuee.';

-- L'ecran filtre par etablissement puis par date : l'index de V27 ne porte
-- que la date, ce qui obligeait a parcourir le journal entier.
CREATE INDEX ix_audit_school_occurred
    ON audit_log(school_id, occurred_at DESC);
