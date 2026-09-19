-- =====================================================================
-- V50 - La colonne de verrouillage optimiste oubliee sur discount_request_level.
--
-- V49 a bien posee la colonne version sur discount_request, mais pas sur
-- discount_request_level. Or l'entite etend BaseEntity, qui porte @Version :
-- au demarrage, Hibernate compare et refuse.
--
--   Schema-validation: missing column [version] in table [discount_request_level]
--
-- Corriger V49 en place casserait sa somme de controle Flyway sur toute base
-- ou il a deja tourne. On ajoute donc la colonne ici.
--
-- Ce n'est pas cosmetique : sans @Version, deux validations simultanées du
-- meme palier pourraient ecraser mutuellement l'etat, et un niveau pourrait
-- passer a l'etat suivant sans que le verrouillage optimiste ne le detecte.
-- =====================================================================

ALTER TABLE discount_request_level
    ADD COLUMN version BIGINT NOT NULL DEFAULT 0;