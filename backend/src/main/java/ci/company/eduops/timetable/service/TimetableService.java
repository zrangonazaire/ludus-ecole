package ci.company.eduops.timetable.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.domain.DayOfWeekEnum;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.curriculum.domain.AssignmentStatus;
import ci.company.eduops.curriculum.domain.TeacherAssignment;
import ci.company.eduops.curriculum.repository.TeacherAssignmentRepository;
import ci.company.eduops.room.domain.Room;
import ci.company.eduops.room.repository.RoomRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.subject.repository.SubjectRepository;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.repository.TeacherRepository;
import ci.company.eduops.term.repository.TermRepository;
import ci.company.eduops.timetable.domain.Timetable;
import ci.company.eduops.timetable.domain.TimetableSlot;
import ci.company.eduops.timetable.domain.TimetableStatus;
import ci.company.eduops.timetable.dto.request.SlotUpsertRequest;
import ci.company.eduops.timetable.dto.request.TimetableSettingsRequest;
import ci.company.eduops.timetable.dto.response.TimetableConflictResponse;
import ci.company.eduops.timetable.dto.response.TimetableGridResponse;
import ci.company.eduops.timetable.dto.response.TimetablePaletteEntryResponse;
import ci.company.eduops.timetable.dto.response.TimetableSettingsResponse;
import ci.company.eduops.timetable.dto.response.TimetableSlotResponse;
import ci.company.eduops.timetable.repository.TimetableRepository;
import ci.company.eduops.timetable.repository.TimetableSlotRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

/**
 * Builds and guards the weekly timetable.
 *
 * <p>The core of this service is refusing impossible placements. A teacher
 * cannot stand in two classrooms at once, a class cannot follow two courses at
 * once, a room cannot host two groups at once. Those three checks look similar
 * but fail for different reasons, so each returns its own message — "M. Koffi
 * enseigne déjà en 5e A" tells the user what to do; "conflit" does not.</p>
 *
 * <p>Conflicts are collected, never thrown one by one. Dropping a course on a
 * busy slot often breaks two rules at the same time, and revealing them one per
 * attempt turns a single correction into three round trips.</p>
 *
 * <p>Editing always happens on a DRAFT. Parents and teachers keep reading the
 * PUBLISHED timetable until someone deliberately publishes the new one.</p>
 */
@Service
public class TimetableService {

    private static final Logger log = LoggerFactory.getLogger(TimetableService.class);

    private static final List<String> DEFAULT_DAYS = List.of(
            "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY");
    private static final LocalTime DEFAULT_DAY_START = LocalTime.of(7, 0);
    private static final LocalTime DEFAULT_DAY_END = LocalTime.of(18, 0);
    private static final int DEFAULT_STEP_MINUTES = 60;

    private final TimetableRepository timetableRepository;
    private final TimetableSlotRepository slotRepository;
    private final ClassroomRepository classroomRepository;
    private final SubjectRepository subjectRepository;
    private final TeacherRepository teacherRepository;
    private final RoomRepository roomRepository;
    private final TermRepository termRepository;
    private final AcademicYearRepository academicYearRepository;
    private final SchoolRepository schoolRepository;
    private final TeacherAssignmentRepository assignmentRepository;
    private final AuditService auditService;
    private final CurrentUser currentUser;

    public TimetableService(TimetableRepository timetableRepository,
                            TimetableSlotRepository slotRepository,
                            ClassroomRepository classroomRepository,
                            SubjectRepository subjectRepository,
                            TeacherRepository teacherRepository,
                            RoomRepository roomRepository,
                            TermRepository termRepository,
                            AcademicYearRepository academicYearRepository,
                            SchoolRepository schoolRepository,
                            TeacherAssignmentRepository assignmentRepository,
                            AuditService auditService,
                            CurrentUser currentUser) {
        this.timetableRepository = timetableRepository;
        this.slotRepository = slotRepository;
        this.classroomRepository = classroomRepository;
        this.subjectRepository = subjectRepository;
        this.teacherRepository = teacherRepository;
        this.roomRepository = roomRepository;
        this.termRepository = termRepository;
        this.academicYearRepository = academicYearRepository;
        this.schoolRepository = schoolRepository;
        this.assignmentRepository = assignmentRepository;
        this.auditService = auditService;
        this.currentUser = currentUser;
    }

    // ------------------------------------------------------------------ read

    /** The week of one class. This is the only view that can be edited. */
    @Transactional(readOnly = true)
    public TimetableGridResponse classroomGrid(UUID classroomId, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CLASS_NOT_FOUND));

        TimetableGridResponse grid = emptyGrid("CLASSROOM", classroomId,
                classroom.getName() + " (" + classroom.getLevel().getName() + ")");
        grid.setEditable(true);

        timetableRepository
                .findFirstByClassroomIdAndAcademicYearIdAndStatusOrderByEffectiveFromDesc(
                        classroomId, year.getId(), TimetableStatus.DRAFT)
                .or(() -> timetableRepository
                        .findFirstByClassroomIdAndAcademicYearIdAndStatusOrderByEffectiveFromDesc(
                                classroomId, year.getId(), TimetableStatus.PUBLISHED))
                .ifPresent(timetable -> {
                    grid.setTimetableId(timetable.getId());
                    grid.setStatus(timetable.getStatus().name());
                });

        fill(grid, slotRepository.findGridByClassroom(classroomId, year.getId()));
        return grid;
    }

    /** The week of one teacher, across every class they teach. */
    @Transactional(readOnly = true)
    public TimetableGridResponse teacherGrid(UUID teacherId, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new BusinessException(ErrorCode.TEACHER_NOT_FOUND));

        TimetableGridResponse grid = emptyGrid("TEACHER", teacherId, teacher.fullName());
        // A teacher's week is an aggregation of several class timetables; editing
        // it here would mean guessing which class a change belongs to.
        grid.setEditable(false);
        fill(grid, slotRepository.findGridByTeacher(teacherId, year.getId()));
        return grid;
    }

    /** The occupancy of one room. */
    @Transactional(readOnly = true)
    public TimetableGridResponse roomGrid(UUID roomId, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));

        TimetableGridResponse grid = emptyGrid("ROOM", roomId, room.getName());
        grid.setEditable(false);
        fill(grid, slotRepository.findGridByRoom(roomId, year.getId()));
        return grid;
    }

    /**
     * Runs every check and writes nothing.
     *
     * <p>The drag-and-drop calls this while the course is still hovering, so the
     * cell can refuse the drop before the user lets go.</p>
     */
    @Transactional(readOnly = true)
    public List<TimetableConflictResponse> check(SlotUpsertRequest request, UUID excludeSlotId) {
        return conflicts(request, excludeSlotId, resolveYear(null).getId());
    }

    /**
     * The subject/teacher pairs that may be dropped on this class.
     *
     * <p>Built from the teaching assignments, so every entry is already known to
     * pass the rule-10 check. Each entry also carries how much of its weekly
     * quota is already on the grid — the person building the timetable can see
     * that 4 hours of maths are planned and only 2 are placed.</p>
     */
    @Transactional(readOnly = true)
    public List<TimetablePaletteEntryResponse> palette(UUID classroomId, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        Classroom classroom = classroomRepository.findById(classroomId)
                .orElseThrow(() -> new BusinessException(ErrorCode.CLASS_NOT_FOUND));
        // La salle habituelle accompagne chaque matière de la palette : sans
        // elle, la personne qui construit la grille devrait choisir un lieu pour
        // chaque cours, et les cours finiraient sans salle du tout.
        Room defaultRoom = classroom.getDefaultRoom();

        Map<String, Integer> placed = new HashMap<>();
        for (TimetableSlot slot : slotRepository.findGridByClassroom(classroomId, year.getId())) {
            placed.merge(slot.getSubject().getId() + "/" + slot.getTeacher().getId(),
                    slot.durationMinutes(), Integer::sum);
        }

        List<TimetablePaletteEntryResponse> entries = new ArrayList<>();
        for (TeacherAssignment assignment : assignmentRepository
                .findByClassroomIdAndStatus(classroomId, AssignmentStatus.ACTIVE)) {
            Subject subject = assignment.getSubject();
            Teacher teacher = assignment.getTeacher();

            TimetablePaletteEntryResponse entry = new TimetablePaletteEntryResponse();
            entry.setSubjectId(subject.getId());
            entry.setSubjectName(subject.getName());
            entry.setSubjectShortName(subject.getShortName());
            entry.setSubjectColor(subject.getColorHex());
            entry.setTeacherId(teacher.getId());
            entry.setTeacherName(teacher.fullName());
            entry.setWeeklyHours(assignment.getWeeklyHours());
            entry.setRoomId(defaultRoom == null ? null : defaultRoom.getId());
            entry.setRoomName(defaultRoom == null ? null : defaultRoom.getName());

            int done = placed.getOrDefault(subject.getId() + "/" + teacher.getId(), 0);
            entry.setPlacedMinutes(done);
            int expected = assignment.getWeeklyHours() == null
                    ? 0
                    : assignment.getWeeklyHours().multiply(BigDecimal.valueOf(60)).intValue();
            entry.setComplete(expected > 0 && done >= expected);
            entries.add(entry);
        }
        entries.sort((a, b) -> a.getSubjectName().compareToIgnoreCase(b.getSubjectName()));
        return entries;
    }

    // ----------------------------------------------------------------- write

    /**
     * Places a new course, or moves an existing one when {@code slotId} is given.
     *
     * <p>When the request carries no room, the course takes the class's usual
     * room: that is where its students expect it, and that is what fills the
     * "par salle" view. The room is resolved before the conflict check so it is
     * validated like any other — see {@link #effectiveRoomId}.</p>
     *
     * @throws BusinessException with the full conflict list attached, so the
     *         screen can explain all the reasons at once
     */
    @Transactional
    public TimetableSlotResponse saveSlot(SlotUpsertRequest request, UUID slotId) {
        AcademicYear year = resolveYear(null);
        List<TimetableConflictResponse> found = conflicts(request, slotId, year.getId());
        if (!found.isEmpty()) {
            throw new BusinessException(conflictCode(found), found.get(0).getMessage())
                    .detail("conflicts", found);
        }

        UUID roomId = effectiveRoomId(request);
        Classroom classroom = classroomRepository.findById(request.getClassroomId())
                .orElseThrow(() -> new BusinessException(ErrorCode.CLASS_NOT_FOUND));
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new BusinessException(ErrorCode.SUBJECT_NOT_FOUND));
        Teacher teacher = teacherRepository.findById(request.getTeacherId())
                .orElseThrow(() -> new BusinessException(ErrorCode.TEACHER_NOT_FOUND));

        Timetable timetable = draftFor(classroom, year);

        TimetableSlot slot;
        if (slotId == null) {
            slot = new TimetableSlot();
            slot.setTimetable(timetable);
        } else {
            slot = slotRepository.findById(slotId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.TIMETABLE_NOT_FOUND));
        }

        slot.setClassroom(classroom);
        slot.setSubject(subject);
        slot.setTeacher(teacher);
        slot.setAcademicYear(year);
        slot.setDayOfWeek(parseDay(request.getDayOfWeek()));
        slot.setStartTime(request.getStartTime());
        slot.setEndTime(request.getEndTime());
        slot.setSlotType(request.getSlotType() == null || request.getSlotType().isBlank()
                ? "COURSE" : request.getSlotType().trim());
        slot.setNote(request.getNote());
        slot.setActive(true);

        if (roomId == null) {
            slot.setRoom(null);
        } else {
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));
            // Une salle archivee n'accueille plus de cours : la reserver la
            // ferait reapparaitre dans l'emploi du temps publie, alors que
            // l'ecran des salles la presente comme hors service.
            if (room.getStatus() != CommonStatus.ACTIVE) {
                throw new BusinessException(ErrorCode.ROOM_ARCHIVED,
                        "Cette salle est archivée : réactivez-la avant d'y placer un cours.");
            }
            slot.setRoom(room);
        }
        if (request.getTermId() == null) {
            slot.setTerm(null);
        } else {
            slot.setTerm(termRepository.findById(request.getTermId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.TERM_NOT_FOUND)));
        }

        TimetableSlot saved = slotRepository.save(slot);
        String label = subject.getName() + " — " + classroom.getName();
        Map<String, Object> state = Map.<String, Object>of(
                "day", saved.getDayOfWeek().name(),
                "start", saved.getStartTime().toString(),
                "end", saved.getEndTime().toString(),
                "teacher", teacher.fullName());
        if (slotId == null) {
            auditService.logCreate("TimetableSlot", saved.getId(), label, state);
        } else {
            auditService.logUpdate("TimetableSlot", saved.getId(), label, Map.of(), state);
        }
        return toResponse(saved);
    }

    /**
     * Removes a course from the grid.
     *
     * <p>The row is deactivated rather than deleted: attendance sheets and course
     * sessions already reference it, and a hard delete would orphan them.</p>
     */
    @Transactional
    public void deleteSlot(UUID slotId) {
        TimetableSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new BusinessException(ErrorCode.TIMETABLE_NOT_FOUND));
        slot.setActive(false);
        slotRepository.save(slot);
        auditService.logCancel("TimetableSlot", slot.getId(),
                slot.getSubject().getName() + " — " + slot.getClassroom().getName(), null);
    }

    /**
     * Publishes the draft of one class.
     *
     * <p>The previously published timetable is archived in the same transaction,
     * because the schema allows exactly one PUBLISHED row per class.</p>
     */
    @Transactional
    public TimetableGridResponse publish(UUID classroomId, UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        Timetable draft = timetableRepository
                .findFirstByClassroomIdAndAcademicYearIdAndStatusOrderByEffectiveFromDesc(
                        classroomId, year.getId(), TimetableStatus.DRAFT)
                .orElseThrow(() -> new BusinessException(ErrorCode.TIMETABLE_NOT_FOUND,
                        "Aucun brouillon à publier pour cette classe."));

        if (slotRepository.findGridByClassroom(classroomId, year.getId()).isEmpty()) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "L'emploi du temps est vide : placez au moins un cours avant de publier.");
        }

        timetableRepository
                .findFirstByClassroomIdAndAcademicYearIdAndStatusOrderByEffectiveFromDesc(
                        classroomId, year.getId(), TimetableStatus.PUBLISHED)
                .ifPresent(previous -> {
                    previous.setStatus(TimetableStatus.ARCHIVED);
                    timetableRepository.save(previous);
                });

        draft.setStatus(TimetableStatus.PUBLISHED);
        draft.setPublishedAt(OffsetDateTime.now());
        draft.setPublishedBy(currentUser.id().orElse(null));
        timetableRepository.save(draft);
        auditService.logPublish("Timetable", draft.getId(), draft.getLabel());
        log.info("Emploi du temps {} publié pour la classe {}", draft.getId(), classroomId);

        return classroomGrid(classroomId, year.getId());
    }

    // ------------------------------------------------------------- conflicts

    /**
     * The room the course will really occupy here.
     *
     * <p>Falls back to the class's usual room. Without this, a course dropped
     * without a room would skip the room check and still land in a room — the
     * two views would then disagree about what occupies the place.</p>
     *
     * <p>An archived default room is ignored rather than rejected: a stale
     * setting on the class must not make placing a course impossible.</p>
     */
    private UUID effectiveRoomId(SlotUpsertRequest request) {
        if (request.getRoomId() != null) {
            return request.getRoomId();
        }
        if (request.getClassroomId() == null) {
            return null;
        }
        return classroomRepository.findById(request.getClassroomId())
                .map(Classroom::getDefaultRoom)
                .filter(room -> room.getStatus() == CommonStatus.ACTIVE)
                .map(Room::getId)
                .orElse(null);
    }

    private List<TimetableConflictResponse> conflicts(SlotUpsertRequest request,
                                                      UUID excludeSlotId,
                                                      UUID academicYearId) {
        List<TimetableConflictResponse> found = new ArrayList<>();

        if (request.getStartTime() == null || request.getEndTime() == null
                || !request.getStartTime().isBefore(request.getEndTime())) {
            found.add(new TimetableConflictResponse("INVALID_TIME_RANGE",
                    "L'heure de fin doit être postérieure à l'heure de début."));
            // Every other check compares times; running them now would be noise.
            return found;
        }

        DayOfWeekEnum day = parseDay(request.getDayOfWeek());
        UUID roomId = effectiveRoomId(request);

        for (TimetableSlot busy : slotRepository.findTeacherConflicts(request.getTeacherId(),
                academicYearId, day, request.getStartTime(), request.getEndTime(), excludeSlotId)) {
            found.add(describe("TEACHER_BUSY", busy,
                    busy.getTeacher().fullName() + " enseigne déjà en "
                            + busy.getClassroom().getName() + " de "
                            + busy.getStartTime() + " à " + busy.getEndTime() + "."));
        }

        for (TimetableSlot busy : slotRepository.findClassConflicts(request.getClassroomId(),
                academicYearId, day, request.getStartTime(), request.getEndTime(), excludeSlotId)) {
            found.add(describe("CLASS_BUSY", busy,
                    busy.getClassroom().getName() + " suit déjà "
                            + busy.getSubject().getName() + " de "
                            + busy.getStartTime() + " à " + busy.getEndTime() + "."));
        }

        if (roomId != null) {
            for (TimetableSlot busy : slotRepository.findRoomConflicts(roomId,
                    academicYearId, day, request.getStartTime(), request.getEndTime(),
                    excludeSlotId)) {
                found.add(describe("ROOM_BUSY", busy,
                        "La salle accueille déjà " + busy.getClassroom().getName()
                                + " de " + busy.getStartTime() + " à " + busy.getEndTime() + "."));
            }
        }

        // Rule 10: a teacher only appears on a class and subject they are assigned to.
        if (!assignmentRepository.isTeacherAssigned(request.getTeacherId(),
                request.getClassroomId(), request.getSubjectId())) {
            found.add(new TimetableConflictResponse("TEACHER_NOT_ASSIGNED",
                    "Cet enseignant n'est pas affecté à cette matière pour cette classe. "
                            + "Créez l'affectation avant de le placer dans la grille."));
        }

        return found;
    }

    private TimetableConflictResponse describe(String kind, TimetableSlot busy, String message) {
        TimetableConflictResponse conflict = new TimetableConflictResponse(kind, message);
        conflict.setConflictingSlotId(busy.getId());
        conflict.setConflictingLabel(busy.getSubject().getName()
                + " — " + busy.getClassroom().getName());
        conflict.setConflictingStart(busy.getStartTime());
        conflict.setConflictingEnd(busy.getEndTime());
        return conflict;
    }

    /** A room clash has its own HTTP code so the screen can colour it differently. */
    private ErrorCode conflictCode(List<TimetableConflictResponse> found) {
        boolean onlyRoom = found.stream().allMatch(c -> "ROOM_BUSY".equals(c.getKind()));
        return onlyRoom ? ErrorCode.ROOM_CONFLICT : ErrorCode.TIMETABLE_CONFLICT;
    }

    // ------------------------------------------------------------- internals

    /** Returns the class draft, creating it on first edit. */
    private Timetable draftFor(Classroom classroom, AcademicYear year) {
        return timetableRepository
                .findFirstByClassroomIdAndAcademicYearIdAndStatusOrderByEffectiveFromDesc(
                        classroom.getId(), year.getId(), TimetableStatus.DRAFT)
                .orElseGet(() -> {
                    Timetable created = new Timetable();
                    created.setAcademicYear(year);
                    created.setClassroom(classroom);
                    created.setLabel("Emploi du temps " + classroom.getName()
                            + " — " + year.getCode());
                    created.setStatus(TimetableStatus.DRAFT);
                    return timetableRepository.save(created);
                });
    }

    private TimetableGridResponse emptyGrid(String scope, UUID scopeId, String label) {
        TimetableGridResponse grid = new TimetableGridResponse();
        grid.setScope(scope);
        grid.setScopeId(scopeId);
        grid.setScopeLabel(label);

        // Working days and hours live in the school settings: a school running
        // Saturday mornings should not need a different build.
        Map<String, Object> settings = schoolSettings();
        grid.setDays(readDays(settings));
        grid.setDayStart(readTime(settings, "timetable.dayStart", DEFAULT_DAY_START));
        grid.setDayEnd(readTime(settings, "timetable.dayEnd", DEFAULT_DAY_END));
        grid.setStepMinutes(readInt(settings, "timetable.stepMinutes", DEFAULT_STEP_MINUTES));
        return grid;
    }

    private void fill(TimetableGridResponse grid, List<TimetableSlot> slots) {
        List<TimetableSlotResponse> mapped = new ArrayList<>(slots.size());
        int minutes = 0;
        for (TimetableSlot slot : slots) {
            mapped.add(toResponse(slot));
            minutes += slot.durationMinutes();
        }
        grid.setSlots(mapped);
        grid.setTotalMinutes(minutes);
    }

    private TimetableSlotResponse toResponse(TimetableSlot slot) {
        TimetableSlotResponse response = new TimetableSlotResponse();
        response.setId(slot.getId());
        response.setTimetableId(slot.getTimetable() == null ? null : slot.getTimetable().getId());
        response.setDayOfWeek(slot.getDayOfWeek().name());
        response.setStartTime(slot.getStartTime());
        response.setEndTime(slot.getEndTime());
        response.setDurationMinutes(slot.durationMinutes());
        response.setSlotType(slot.getSlotType());
        response.setNote(slot.getNote());

        Subject subject = slot.getSubject();
        response.setSubjectId(subject.getId());
        response.setSubjectName(subject.getName());
        response.setSubjectShortName(subject.getShortName());
        response.setSubjectColor(subject.getColorHex());

        Teacher teacher = slot.getTeacher();
        response.setTeacherId(teacher.getId());
        response.setTeacherName(teacher.fullName());

        Classroom classroom = slot.getClassroom();
        response.setClassroomId(classroom.getId());
        response.setClassroomName(classroom.getName());

        Room room = slot.getRoom();
        if (room != null) {
            response.setRoomId(room.getId());
            response.setRoomName(room.getName());
        }
        return response;
    }

    private Map<String, Object> schoolSettings() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            return Map.of();
        }
        return schoolRepository.findById(schoolId)
                .map(School::getSettings)
                .orElse(Map.of());
    }

    private List<String> readDays(Map<String, Object> settings) {
        Object raw = settings.get("timetable.days");
        if (raw instanceof List<?> list && !list.isEmpty()) {
            List<String> days = new ArrayList<>(list.size());
            for (Object item : list) {
                try {
                    days.add(DayOfWeekEnum
                            .valueOf(String.valueOf(item).toUpperCase(Locale.ROOT)).name());
                } catch (IllegalArgumentException ignored) {
                    // A typo in the settings must not blank out the whole week.
                    log.warn("Jour ignoré dans les réglages de l'emploi du temps : {}", item);
                }
            }
            if (!days.isEmpty()) {
                return days;
            }
        }
        return DEFAULT_DAYS;
    }

    private LocalTime readTime(Map<String, Object> settings, String key, LocalTime fallback) {
        Object raw = settings.get(key);
        if (raw == null) {
            return fallback;
        }
        try {
            return LocalTime.parse(String.valueOf(raw));
        } catch (RuntimeException e) {
            log.warn("Heure illisible dans les réglages ({}) : {}", key, raw);
            return fallback;
        }
    }

    private int readInt(Map<String, Object> settings, String key, int fallback) {
        Object raw = settings.get(key);
        if (raw instanceof Number number) {
            return number.intValue();
        }
        try {
            return raw == null ? fallback : Integer.parseInt(String.valueOf(raw));
        } catch (NumberFormatException e) {
            return fallback;
        }
    }

    // -------------------------------------------------------------- settings

    /**
     * Réglages de la grille horaire de l'établissement, avec les valeurs par
     * défaut si rien n'a encore été configuré.
     */
    @Transactional(readOnly = true)
    public TimetableSettingsResponse settings() {
        Map<String, Object> settings = schoolSettings();
        LocalTime start = readTime(settings, "timetable.dayStart", DEFAULT_DAY_START);
        LocalTime end = readTime(settings, "timetable.dayEnd", DEFAULT_DAY_END);
        return TimetableSettingsResponse.of(readDays(settings),
                start.toString(), end.toString(),
                readInt(settings, "timetable.stepMinutes", DEFAULT_STEP_MINUTES));
    }

    /**
     * Écrit les réglages de la grille dans les paramètres de l'école.
     *
     * <p>Les heures de la journée et le pas d'affichage influencent toutes les
     * grilles et les créneaux déjà posés ne sont pas déplacés : un cours reste
     * affiché dans la tranche qui le contient, même si le pas change. Seuls
     * les jours ouvrés, les bornes de journée et le pas sont écrits — jamais
     * les cours eux-mêmes.</p>
     */
    @Transactional
    public TimetableSettingsResponse updateSettings(TimetableSettingsRequest request) {
        LocalTime start = LocalTime.parse(request.getDayStart());
        LocalTime end = LocalTime.parse(request.getDayEnd());
        if (!start.isBefore(end)) {
            throw new BusinessException(ErrorCode.INVALID_TIME_RANGE,
                    "L'heure de fin de journée doit être postérieure à l'heure de début.");
        }
        int step = request.getStepMinutes();
        if (step < 5 || step > 240) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Le pas de la grille doit être compris entre 5 et 240 minutes.");
        }
        List<String> days = new ArrayList<>(request.getDays().size());
        for (String raw : request.getDays()) {
            days.add(parseDay(raw).name());
        }
        if (days.isEmpty()) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Au moins un jour ouvré est nécessaire.");
        }

        Map<String, Object> before = Map.of(
                "timetable.dayStart", String.valueOf(schoolSettings().get("timetable.dayStart")),
                "timetable.dayEnd", String.valueOf(schoolSettings().get("timetable.dayEnd")),
                "timetable.stepMinutes", String.valueOf(schoolSettings().get("timetable.stepMinutes")),
                "timetable.days", String.valueOf(schoolSettings().get("timetable.days")));

        Map<String, Object> settings = new LinkedHashMap<>(schoolSettings());
        settings.put("timetable.dayStart", start.toString());
        settings.put("timetable.dayEnd", end.toString());
        settings.put("timetable.stepMinutes", step);
        settings.put("timetable.days", days);

        School school = requireSchool();
        school.setSettings(settings);
        School saved = schoolRepository.save(school);

        auditService.logUpdate("School", saved.getId(), saved.getName(), before,
                Map.of("timetable.dayStart", start.toString(),
                        "timetable.dayEnd", end.toString(),
                        "timetable.stepMinutes", step,
                        "timetable.days", days));
        log.info("Réglages de la grille horaire mis à jour : {} – {} / {} min / {} jours",
                start, end, step, days.size());
        return settings();
    }

    private School requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolRepository.findById(schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.SCHOOL_NOT_FOUND));
    }

    private DayOfWeekEnum parseDay(String value) {
        try {
            return DayOfWeekEnum.valueOf(String.valueOf(value).toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Jour de la semaine inconnu : " + value);
        }
    }

    private AcademicYear resolveYear(UUID academicYearId) {
        if (academicYearId != null) {
            return academicYearRepository.findById(academicYearId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
        }
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return academicYearRepository.findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND,
                        "Aucune année scolaire active."));
    }
}
