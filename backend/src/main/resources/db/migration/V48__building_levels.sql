CREATE TABLE building_level (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    building_id UUID NOT NULL REFERENCES building(id) ON DELETE RESTRICT,
    level_number INTEGER NOT NULL CHECK (level_number >= 0),
    label VARCHAR(30) NOT NULL,
    UNIQUE (building_id, level_number)
);
INSERT INTO building_level(building_id, level_number, label)
SELECT b.id, n, CASE WHEN n = 0 THEN 'Rez-de-chaussée'
    WHEN n = 1 THEN '1er étage' ELSE n || 'e étage' END
FROM building b CROSS JOIN LATERAL generate_series(0, b.floors) n;
ALTER TABLE room ADD COLUMN level_id UUID REFERENCES building_level(id) ON DELETE RESTRICT;
CREATE INDEX ix_room_level ON room(level_id);
-- Only unambiguous existing labels are linked; other labels remain intact.
UPDATE room r SET level_id = l.id FROM building_level l
WHERE r.building_id = l.building_id AND
  (lower(trim(r.floor)) = lower(l.label)
   OR (l.level_number = 0 AND lower(trim(r.floor)) IN ('rdc', 'rez de chaussée', 'rez-de-chaussee')));
