-- Ajoute WhatsApp comme canal explicite pour les campagnes de relance.
ALTER TYPE notification_channel ADD VALUE IF NOT EXISTS 'WHATSAPP';
