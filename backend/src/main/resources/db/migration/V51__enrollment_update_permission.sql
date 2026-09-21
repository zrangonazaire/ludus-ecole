-- ------------------------------------------------------------------
-- ENROLLMENT_UPDATE : new permission backing the correction of an
-- enrollment (PUT /api/v1/enrollments/{id}). Granted to every role
-- already allowed to create enrollments — the two gestures belong to
-- the same office.
-- ------------------------------------------------------------------

INSERT INTO app_permission (code, label, module)
VALUES ('ENROLLMENT_UPDATE', 'Modifier les inscriptions', 'enrollment')
ON CONFLICT (code) DO NOTHING;

INSERT INTO app_role_permission (role_id, permission_id)
SELECT DISTINCT rp.role_id, p_new.id
FROM app_role_permission rp
JOIN app_permission p_create ON p_create.id = rp.permission_id
    AND p_create.code = 'ENROLLMENT_CREATE'
CROSS JOIN app_permission p_new
WHERE p_new.code = 'ENROLLMENT_UPDATE'
  AND NOT EXISTS (
      SELECT 1 FROM app_role_permission existing
      WHERE existing.role_id = rp.role_id
        AND existing.permission_id = p_new.id
  );
