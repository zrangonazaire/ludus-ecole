-- Permissions du module, attribuées selon le modèle V46.

INSERT INTO app_permission (code, label, module) VALUES
 ('DISCOUNT_REQUEST_VIEW',   'Consulter les demandes de réduction',       'finance'),
 ('DISCOUNT_REQUEST_MANAGE', 'Créer et suivre les demandes de réduction', 'finance'),
 ('DISCOUNT_REQUEST_DECIDE', 'Valider ou refuser une demande de réduction', 'finance')
ON CONFLICT (code) DO NOTHING;

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p ON p.code IN (
    'DISCOUNT_REQUEST_VIEW','DISCOUNT_REQUEST_MANAGE','DISCOUNT_REQUEST_DECIDE')
WHERE r.school_id IS NULL AND r.code IN ('SUPER_ADMIN','SCHOOL_ADMIN')
ON CONFLICT DO NOTHING;

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p
    ON p.code IN ('DISCOUNT_REQUEST_VIEW','DISCOUNT_REQUEST_MANAGE')
WHERE r.school_id IS NULL AND r.code IN ('DIRECTOR','REGISTRAR','SECRETARY')
ON CONFLICT DO NOTHING;

INSERT INTO app_role_permission (role_id, permission_id)
SELECT r.id, p.id FROM app_role r JOIN app_permission p
    ON p.code = 'DISCOUNT_REQUEST_VIEW'
WHERE r.school_id IS NULL AND r.code = 'VIEWER'
ON CONFLICT DO NOTHING;
