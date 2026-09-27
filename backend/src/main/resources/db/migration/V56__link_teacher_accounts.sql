-- Only unambiguous existing accounts of this school with the TEACHER role
-- are backfilled. Other legacy files remain visible for explicit linking.
SELECT set_config('app.bypass_rls', 'on', true);
UPDATE teacher t SET user_account_id = u.id
FROM app_user u
WHERE t.user_account_id IS NULL
  AND u.school_id = t.school_id AND lower(u.email) = lower(t.email)
  AND (SELECT count(*) FROM app_user x WHERE x.school_id = t.school_id
       AND lower(x.email) = lower(t.email)) = 1
  AND EXISTS (SELECT 1 FROM app_user_role ur JOIN app_role r ON r.id = ur.role_id
              WHERE ur.user_id = u.id AND r.code = 'TEACHER'
              AND (r.school_id IS NULL OR r.school_id = t.school_id))
  AND NOT EXISTS (SELECT 1 FROM teacher linked WHERE linked.user_account_id = u.id)
  AND (SELECT count(*) FROM teacher other WHERE other.school_id = t.school_id
       AND lower(other.email) = lower(t.email)) = 1;
SELECT set_config('app.bypass_rls', 'off', true);
