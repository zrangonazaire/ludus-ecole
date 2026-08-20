-- =====================================================================
-- V15 - Timetable, slots and concrete course sessions
-- Teacher / classroom / room conflicts are prevented by EXCLUDE
-- constraints so no application bug can ever create one (section 27).
-- =====================================================================

CREATE TABLE timetable (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academic_year_id UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    term_id          UUID REFERENCES term(id),
    classroom_id     UUID NOT NULL REFERENCES classroom(id)     ON DELETE RESTRICT,
    label            VARCHAR(150) NOT NULL,
    effective_from   DATE NOT NULL DEFAULT CURRENT_DATE,
    effective_to     DATE,
    status           timetable_status NOT NULL DEFAULT 'DRAFT',
    published_at     TIMESTAMPTZ,
    published_by     UUID REFERENCES app_user(id),
    version          BIGINT NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_timetable_dates CHECK (effective_to IS NULL OR effective_to >= effective_from)
);
CREATE TRIGGER trg_timetable_updated BEFORE UPDATE ON timetable
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE UNIQUE INDEX uq_timetable_published
    ON timetable(classroom_id, coalesce(term_id, '00000000-0000-0000-0000-000000000000'::uuid))
    WHERE status = 'PUBLISHED';
CREATE INDEX ix_timetable_class ON timetable(classroom_id, status);

CREATE TABLE timetable_slot (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timetable_id  UUID NOT NULL REFERENCES timetable(id)  ON DELETE CASCADE,
    classroom_id  UUID NOT NULL REFERENCES classroom(id)  ON DELETE RESTRICT,
    subject_id    UUID NOT NULL REFERENCES subject(id)    ON DELETE RESTRICT,
    teacher_id    UUID NOT NULL REFERENCES teacher(id)    ON DELETE RESTRICT,
    room_id       UUID REFERENCES room(id),
    academic_year_id UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    term_id       UUID REFERENCES term(id),
    day_of_week   day_of_week NOT NULL,
    start_time    TIME NOT NULL,
    end_time      TIME NOT NULL,
    -- generated helper used by the exclusion constraints
    time_range    tsrange GENERATED ALWAYS AS (
        tsrange(('2000-01-01'::date + start_time)::timestamp,
                ('2000-01-01'::date + end_time)::timestamp, '[)')) STORED,
    slot_type     VARCHAR(40) NOT NULL DEFAULT 'COURSE',
    note          VARCHAR(255),
    active        BOOLEAN NOT NULL DEFAULT TRUE,
    version       BIGINT NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_slot_time CHECK (end_time > start_time),
    CONSTRAINT ck_slot_duration CHECK (
        EXTRACT(EPOCH FROM (end_time - start_time)) BETWEEN 900 AND 21600)  -- 15 min .. 6 h
);
CREATE TRIGGER trg_timetable_slot_updated BEFORE UPDATE ON timetable_slot
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- checkTeacherConflict(): one teacher cannot be in two places at once.
ALTER TABLE timetable_slot ADD CONSTRAINT ex_slot_teacher_conflict
    EXCLUDE USING gist (
        teacher_id       WITH =,
        academic_year_id WITH =,
        day_of_week      WITH =,
        time_range       WITH &&
    ) WHERE (active);

-- checkClassConflict(): a class cannot follow two courses at once.
ALTER TABLE timetable_slot ADD CONSTRAINT ex_slot_class_conflict
    EXCLUDE USING gist (
        classroom_id     WITH =,
        academic_year_id WITH =,
        day_of_week      WITH =,
        time_range       WITH &&
    ) WHERE (active);

-- checkRoomConflict(): a room hosts a single course at a time.
ALTER TABLE timetable_slot ADD CONSTRAINT ex_slot_room_conflict
    EXCLUDE USING gist (
        room_id          WITH =,
        academic_year_id WITH =,
        day_of_week      WITH =,
        time_range       WITH &&
    ) WHERE (active AND room_id IS NOT NULL);

CREATE INDEX ix_slot_timetable ON timetable_slot(timetable_id);
CREATE INDEX ix_slot_teacher   ON timetable_slot(teacher_id, day_of_week) WHERE active;
CREATE INDEX ix_slot_class     ON timetable_slot(classroom_id, day_of_week) WHERE active;

-- A dated occurrence of a slot: what actually happens on 2026-09-14.
CREATE TABLE course_session (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timetable_slot_id UUID REFERENCES timetable_slot(id) ON DELETE SET NULL,
    classroom_id     UUID NOT NULL REFERENCES classroom(id) ON DELETE RESTRICT,
    subject_id       UUID NOT NULL REFERENCES subject(id)   ON DELETE RESTRICT,
    teacher_id       UUID NOT NULL REFERENCES teacher(id)   ON DELETE RESTRICT,
    room_id          UUID REFERENCES room(id),
    academic_year_id UUID NOT NULL REFERENCES academic_year(id) ON DELETE RESTRICT,
    term_id          UUID REFERENCES term(id),
    session_date     DATE NOT NULL,
    start_time       TIME NOT NULL,
    end_time         TIME NOT NULL,
    topic            VARCHAR(255),
    status           course_session_status NOT NULL DEFAULT 'PLANNED',
    cancellation_reason TEXT,
    version          BIGINT NOT NULL DEFAULT 0,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_course_session_time CHECK (end_time > start_time),
    CONSTRAINT uq_course_session UNIQUE (classroom_id, session_date, start_time, subject_id)
);
CREATE TRIGGER trg_course_session_updated BEFORE UPDATE ON course_session
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX ix_course_session_date    ON course_session(session_date, classroom_id);
CREATE INDEX ix_course_session_teacher ON course_session(teacher_id, session_date);
