ALTER TABLE cash_session ADD COLUMN opened_by_user_id UUID REFERENCES app_user(id) ON DELETE RESTRICT;
SELECT set_config('app.bypass_rls', 'on', true);
UPDATE cash_session SET opened_by_user_id = cashier_user_id WHERE opened_by_user_id IS NULL;
ALTER TABLE cash_session ALTER COLUMN opened_by_user_id SET NOT NULL;
