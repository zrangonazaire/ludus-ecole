ALTER TABLE student
    ADD COLUMN mail_responsable VARCHAR(180);

ALTER TABLE student
    ADD CONSTRAINT ck_student_mail_responsable
        CHECK (mail_responsable IS NULL OR mail_responsable ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$');

-- Récupère l'adresse déjà saisie sur le responsable lié, en choisissant
-- d'abord le responsable financier puis le responsable principal.
UPDATE student s
SET mail_responsable = (
    SELECT NULLIF(BTRIM(g.email), '')
    FROM student_guardian sg
    JOIN guardian g ON g.id = sg.guardian_id
    WHERE sg.student_id = s.id
      AND NULLIF(BTRIM(g.email), '') IS NOT NULL
    ORDER BY sg.has_financial_responsibility DESC, sg.is_primary DESC, sg.created_at
    LIMIT 1
)
WHERE s.mail_responsable IS NULL
  AND EXISTS (
    SELECT 1
    FROM student_guardian sg
    JOIN guardian g ON g.id = sg.guardian_id
    WHERE sg.student_id = s.id
      AND NULLIF(BTRIM(g.email), '') IS NOT NULL
  );
