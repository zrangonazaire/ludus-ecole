-- =====================================================================
-- V42 - La colonne de verrouillage optimiste oubliee sur message_recipient.
--
-- V41 l'a bien posee sur messaging_settings et message_campaign, pas sur
-- message_recipient. Or l'entite etend BaseEntity, qui porte @Version : au
-- demarrage, Hibernate compare et refuse.
--
--   Schema-validation: missing column [version] in table [message_recipient]
--
-- Corriger V41 en place casserait sa somme de controle Flyway sur toute base
-- ou il a deja tourne. On ajoute donc la colonne ici.
--
-- Ce n'est pas cosmetique : sans @Version, deux envois simultanes de la meme
-- campagne pourraient ecraser mutuellement l'etat des destinataires, et une
-- famille apparaitrait « en attente » alors que son SMS est parti.
-- =====================================================================

ALTER TABLE message_recipient
    ADD COLUMN version BIGINT NOT NULL DEFAULT 0;
