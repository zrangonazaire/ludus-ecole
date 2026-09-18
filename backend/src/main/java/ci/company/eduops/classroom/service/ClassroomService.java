package ci.company.eduops.classroom.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.campus.repository.CampusRepository;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.dto.request.ClassroomBulkCreateRequest;
import ci.company.eduops.classroom.dto.request.ClassroomCreateRequest;
import ci.company.eduops.classroom.dto.request.ClassroomUpdateRequest;
import ci.company.eduops.classroom.dto.response.ClassroomResponse;
import ci.company.eduops.classroom.dto.response.LevelCapacityResponse;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.level.repository.LevelRepository;
import ci.company.eduops.room.domain.Room;
import ci.company.eduops.room.repository.RoomRepository;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.repository.TeacherRepository;
import ci.company.eduops.audit.service.AuditService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

/**
 * Everything a school does to its class groups after the initial configuration.
 *
 * <p>The setup wizard asks "how many classes for 6e?" before a single student
 * exists, so that number is a forecast. Reality arrives later: a level fills up,
 * a second section becomes necessary, a class turns out to be superfluous. This
 * service is the correction path, and it is deliberately as configurable as the
 * wizard it corrects.</p>
 *
 * <p>Two invariants are enforced here rather than trusted to the caller:</p>
 * <ul>
 *   <li>capacity is never lowered below the students already enrolled — the
 *       alternative is a class that reports negative free seats;</li>
 *   <li>a class holding active enrollments is never deleted, only closed.</li>
 * </ul>
 */
@Service
public class ClassroomService {

    private static final Logger log = LoggerFactory.getLogger(ClassroomService.class);

    /** Above this occupancy a level is flagged as needing another class. */
    private static final int CROWDED_PERCENT = 85;

    private static final int DEFAULT_CAPACITY = 45;

    private final ClassroomRepository classroomRepository;
    private final LevelRepository levelRepository;
    private final CampusRepository campusRepository;
    private final AcademicYearRepository academicYearRepository;
    private final TeacherRepository teacherRepository;
    private final RoomRepository roomRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AuditService auditService;

    public ClassroomService(ClassroomRepository classroomRepository,
                            LevelRepository levelRepository,
                            CampusRepository campusRepository,
                            AcademicYearRepository academicYearRepository,
                            TeacherRepository teacherRepository,
                            RoomRepository roomRepository,
                            EnrollmentRepository enrollmentRepository,
                            AuditService auditService) {
        this.classroomRepository = classroomRepository;
        this.levelRepository = levelRepository;
        this.campusRepository = campusRepository;
        this.academicYearRepository = academicYearRepository;
        this.teacherRepository = teacherRepository;
        this.roomRepository = roomRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.auditService = auditService;
    }

    // ------------------------------------------------------------------ read

    /** Every class of the year, with live seat counts. */
    @Transactional(readOnly = true)
    public List<ClassroomResponse> list(UUID academicYearId) {
        AcademicYear year = resolveYear(academicYearId);
        Map<UUID, Long> occupancy = occupancyByClassroom(year.getId());

        List<ClassroomResponse> result = new ArrayList<>();
        for (ClassroomStatus status : List.of(ClassroomStatus.ACTIVE, ClassroomStatus.DRAFT,
                ClassroomStatus.CLOSED)) {
            for (Classroom classroom : classroomRepository
                    .findByAcademicYearIdAndStatus(year.getId(), status)) {
                result.add(toResponse(classroom,
                        occupancy.getOrDefault(classroom.getId(), 0L)));
            }
        }
        result.sort((a, b) -> {
            int byLevel = a.getLevelName().compareToIgnoreCase(b.getLevelName());
            return byLevel != 0 ? byLevel : a.getName().compareToIgnoreCase(b.getName());
        });
        return result;
    }

    @Transactional(readOnly = true)
    public ClassroomResponse getById(UUID id) {
        Classroom classroom = classroomRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.CLASS_NOT_FOUND));
        return toResponse(classroom, enrollmentRepository.countOccupiedSeats(id));
    }

    /**
     * The levels of the school, each with its real occupancy and a proposal for
     * the next class. This is what the "add a class" form reads: it turns an
     * abstract "create a class" into "6e is at 94%, add 6e D".
     */
    @Transactional(readOnly = true)
    public List<LevelCapacityResponse> levelCapacities(UUID academicYearId) {
        UUID schoolId = requireSchool();
        AcademicYear year = resolveYear(academicYearId);
        Map<UUID, Long> occupancy = occupancyByClassroom(year.getId());

        List<LevelCapacityResponse> result = new ArrayList<>();
        for (Level level : levelRepository.findBySchool(schoolId, CommonStatus.ACTIVE)) {
            List<Classroom> classes = classroomRepository
                    .findByAcademicYearIdAndLevelId(year.getId(), level.getId())
                    .stream()
                    .filter(c -> c.getStatus() != ClassroomStatus.ARCHIVED)
                    .toList();

            int capacity = classes.stream().mapToInt(Classroom::getCapacityMaximum).sum();
            int enrolled = classes.stream()
                    .mapToInt(c -> occupancy.getOrDefault(c.getId(), 0L).intValue())
                    .sum();

            LevelCapacityResponse item = new LevelCapacityResponse();
            item.setLevelId(level.getId());
            item.setLevelName(level.getName());
            item.setLevelCode(level.getCode());
            item.setCycleName(level.getCycle().getName());
            item.setSequence(level.getSequence());
            item.setClassroomCount(classes.size());
            item.setTotalCapacity(capacity);
            item.setTotalEnrolled(enrolled);
            item.setAvailableSeats(capacity - enrolled);
            item.setOccupancyRate(percent(enrolled, capacity));
            // A level with no class at all always needs one, whatever the rate.
            item.setNeedsMoreClasses(classes.isEmpty() || item.getOccupancyRate() >= CROWDED_PERCENT);
            item.setSuggestedName(nextName(level, classes));
            item.setSuggestedCode(nextCode(level, classes));
            item.setSuggestedCapacity(mostCommonCapacity(classes));
            result.add(item);
        }
        return result;
    }

    // ----------------------------------------------------------------- write

    @Transactional
    public ClassroomResponse create(ClassroomCreateRequest request) {
        AcademicYear year = resolveYear(request.getAcademicYearId());
        Campus campus = resolveCampus(request.getCampusId());
        Level level = requireLevel(request.getLevelId());

        List<Classroom> siblings = classroomRepository
                .findByAcademicYearIdAndLevelId(year.getId(), level.getId());

        Classroom classroom = new Classroom();
        classroom.setAcademicYear(year);
        classroom.setCampus(campus);
        classroom.setLevel(level);
        classroom.setName(blankToNull(request.getName()) != null
                ? request.getName().trim()
                : nextName(level, siblings));
        classroom.setSection(blankToNull(request.getSection()));
        classroom.setCapacityMaximum(request.getCapacityMaximum());
        classroom.setCapacityWarningThreshold(
                BigDecimal.valueOf(request.getCapacityWarningThreshold()));
        classroom.setLanguageOfInstruction(blankToNull(request.getLanguageOfInstruction()) != null
                ? request.getLanguageOfInstruction().trim()
                : "FR");
        classroom.setStatus(request.isActivateImmediately()
                ? ClassroomStatus.ACTIVE
                : ClassroomStatus.DRAFT);
        applyTeacherAndRoom(classroom, request.getMainTeacherId(), request.getDefaultRoomId());

        String code = blankToNull(request.getCode()) != null
                ? request.getCode().trim().toUpperCase(Locale.ROOT)
                : nextCode(level, siblings);
        if (classroomRepository.existsByAcademicYearIdAndCampusIdAndCode(
                year.getId(), campus.getId(), code)) {
            throw new BusinessException(ErrorCode.CLASS_CODE_ALREADY_USED)
                    .detail("code", code);
        }
        classroom.setCode(code);

        Classroom saved = classroomRepository.save(classroom);
        auditService.logCreate("Classroom", saved.getId(), saved.getName(),
                Map.<String, Object>of(
                        "level", level.getName(),
                        "capacity", saved.getCapacityMaximum(),
                        "status", saved.getStatus().name()));
        log.info("Classe {} créée sur le niveau {} ({} places)",
                saved.getName(), level.getName(), saved.getCapacityMaximum());
        return toResponse(saved, 0L);
    }

    /**
     * Adds {@code count} classes to one level in one transaction.
     *
     * <p>The names continue the existing series, so a level already holding A
     * and B receives C, D, E — no collision, no gap.</p>
     */
    @Transactional
    public List<ClassroomResponse> createMany(ClassroomBulkCreateRequest request) {
        List<ClassroomResponse> created = new ArrayList<>();
        for (int i = 0; i < request.getCount(); i++) {
            ClassroomCreateRequest one = new ClassroomCreateRequest();
            one.setLevelId(request.getLevelId());
            one.setCampusId(request.getCampusId());
            one.setAcademicYearId(request.getAcademicYearId());
            one.setCapacityMaximum(request.getCapacityMaximum());
            one.setCapacityWarningThreshold(request.getCapacityWarningThreshold());
            one.setActivateImmediately(request.isActivateImmediately());
            // Name and code left null on purpose: create() reads the siblings
            // saved by the previous iteration and continues the series.
            created.add(create(one));
        }
        return created;
    }

    @Transactional
    public ClassroomResponse update(UUID id, ClassroomUpdateRequest request) {
        Classroom classroom = classroomRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.CLASS_NOT_FOUND));

        long occupied = enrollmentRepository.countOccupiedSeats(id);
        if (request.getCapacityMaximum() < occupied) {
            throw new BusinessException(ErrorCode.CLASS_CAPACITY_BELOW_ENROLLMENTS)
                    .detail("enrolled", occupied)
                    .detail("requestedCapacity", request.getCapacityMaximum());
        }

        Map<String, Object> before = Map.<String, Object>of(
                "name", classroom.getName(),
                "capacity", classroom.getCapacityMaximum());

        classroom.setName(request.getName().trim());
        classroom.setSection(blankToNull(request.getSection()));
        classroom.setCapacityMaximum(request.getCapacityMaximum());
        classroom.setCapacityWarningThreshold(
                BigDecimal.valueOf(request.getCapacityWarningThreshold()));
        if (blankToNull(request.getLanguageOfInstruction()) != null) {
            classroom.setLanguageOfInstruction(request.getLanguageOfInstruction().trim());
        }
        applyTeacherAndRoom(classroom, request.getMainTeacherId(), request.getDefaultRoomId());

        Classroom saved = classroomRepository.save(classroom);
        auditService.logUpdate("Classroom", saved.getId(), saved.getName(), before,
                Map.<String, Object>of(
                        "name", saved.getName(),
                        "capacity", saved.getCapacityMaximum()));
        return toResponse(saved, occupied);
    }

    /** Opens a draft class to enrollments. */
    @Transactional
    public ClassroomResponse activate(UUID id) {
        Classroom classroom = classroomRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.CLASS_NOT_FOUND));
        classroom.setStatus(ClassroomStatus.ACTIVE);
        Classroom saved = classroomRepository.save(classroom);
        auditService.logValidate("Classroom", saved.getId(), saved.getName(), null);
        return toResponse(saved, enrollmentRepository.countOccupiedSeats(id));
    }

    /**
     * Closes a class. A class that still holds students is refused: closing it
     * would leave those enrollments pointing at something no longer open, and
     * the students have to be moved first.
     */
    @Transactional
    public ClassroomResponse close(UUID id, String reason) {
        Classroom classroom = classroomRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.CLASS_NOT_FOUND));

        long occupied = enrollmentRepository.countOccupiedSeats(id);
        if (occupied > 0) {
            throw new BusinessException(ErrorCode.CLASS_NOT_EMPTY)
                    .detail("enrolled", occupied);
        }
        classroom.setStatus(ClassroomStatus.CLOSED);
        Classroom saved = classroomRepository.save(classroom);
        auditService.logCancel("Classroom", saved.getId(), saved.getName(), reason);
        return toResponse(saved, 0L);
    }

    // ------------------------------------------------------------- internals

    private void applyTeacherAndRoom(Classroom classroom, UUID teacherId, UUID roomId) {
        if (teacherId == null) {
            classroom.setMainTeacher(null);
        } else {
            Teacher teacher = teacherRepository.findById(teacherId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.TEACHER_NOT_FOUND));
            classroom.setMainTeacher(teacher);
        }
        if (roomId == null) {
            classroom.setDefaultRoom(null);
        } else {
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));
            // Une classe ne peut pas elire une salle archivee : elle afficherait
            // un lieu hors service sur ses listes et son emploi du temps.
            if (room.getStatus() != CommonStatus.ACTIVE) {
                throw new BusinessException(ErrorCode.ROOM_ARCHIVED,
                        "Cette salle est archivée : réactivez-la avant de la donner "
                                + "par défaut à une classe.");
            }
            classroom.setDefaultRoom(room);
        }
    }

    private Map<UUID, Long> occupancyByClassroom(UUID academicYearId) {
        Map<UUID, Long> occupancy = new HashMap<>();
        for (Object[] row : enrollmentRepository.countActiveByClassroom(academicYearId)) {
            occupancy.put((UUID) row[0], ((Number) row[1]).longValue());
        }
        return occupancy;
    }

    private AcademicYear resolveYear(UUID academicYearId) {
        if (academicYearId != null) {
            return academicYearRepository.findById(academicYearId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
        }
        return academicYearRepository
                .findBySchoolIdAndStatus(requireSchool(), AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_FOUND,
                        "Aucune année scolaire active : ouvrez-en une avant de créer des classes."));
    }

    private Campus resolveCampus(UUID campusId) {
        UUID schoolId = requireSchool();
        if (campusId != null) {
            return campusRepository.findById(campusId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.CAMPUS_NOT_FOUND));
        }
        return campusRepository.findBySchoolIdAndMainTrue(schoolId)
                .or(() -> campusRepository.findBySchoolId(schoolId).stream().findFirst())
                .orElseThrow(() -> new BusinessException(ErrorCode.CAMPUS_NOT_FOUND));
    }

    private Level requireLevel(UUID levelId) {
        Level level = levelRepository.findById(levelId)
                .orElseThrow(() -> new BusinessException(ErrorCode.LEVEL_NOT_FOUND));
        // Belt and braces: RLS already scopes the query, this makes the refusal explicit.
        if (!level.getCycle().getSchool().getId().equals(requireSchool())) {
            throw new BusinessException(ErrorCode.LEVEL_NOT_FOUND);
        }
        return level;
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }

    /**
     * Next letter in the series, based on what the level already holds.
     *
     * <p>Reading the existing names rather than counting them matters: a school
     * that deleted "6e B" gets "6e C" next, not a second "6e C".</p>
     */
    private char nextLetter(List<Classroom> siblings) {
        char highest = 0;
        for (Classroom sibling : siblings) {
            String name = sibling.getName();
            if (name == null || name.isBlank()) {
                continue;
            }
            char last = Character.toUpperCase(name.charAt(name.length() - 1));
            if (last >= 'A' && last <= 'Z' && last > highest) {
                highest = last;
            }
        }
        if (highest == 0) {
            return 'A';
        }
        return highest >= 'Z' ? 'Z' : (char) (highest + 1);
    }

    private String nextName(Level level, List<Classroom> siblings) {
        String base = level.getShortName() != null && !level.getShortName().isBlank()
                ? level.getShortName()
                : level.getName();
        return base + " " + nextLetter(siblings);
    }

    private String nextCode(Level level, List<Classroom> siblings) {
        return asciiUpper(level.getCode()) + "-" + nextLetter(siblings);
    }

    /**
     * Capacity most often used on the level, so a new class matches its peers
     * instead of falling back to a number nobody chose.
     */
    private int mostCommonCapacity(List<Classroom> siblings) {
        if (siblings.isEmpty()) {
            return DEFAULT_CAPACITY;
        }
        Map<Integer, Integer> tally = new HashMap<>();
        for (Classroom sibling : siblings) {
            tally.merge(sibling.getCapacityMaximum(), 1, Integer::sum);
        }
        int best = DEFAULT_CAPACITY;
        int bestCount = 0;
        for (Map.Entry<Integer, Integer> entry : tally.entrySet()) {
            if (entry.getValue() > bestCount) {
                bestCount = entry.getValue();
                best = entry.getKey();
            }
        }
        return best;
    }

    private ClassroomResponse toResponse(Classroom classroom, long occupied) {
        ClassroomResponse response = new ClassroomResponse();
        response.setId(classroom.getId());
        response.setCode(classroom.getCode());
        response.setName(classroom.getName());
        response.setSection(classroom.getSection());
        response.setLevelId(classroom.getLevel().getId());
        response.setLevelName(classroom.getLevel().getName());
        response.setCampusId(classroom.getCampus().getId());
        response.setCampusName(classroom.getCampus().getName());
        response.setAcademicYearId(classroom.getAcademicYear().getId());
        response.setCapacityMaximum(classroom.getCapacityMaximum());
        response.setActiveEnrollments((int) occupied);
        response.setAvailableSeats(classroom.availableSeats(occupied));
        response.setOccupancyRate(percent((int) occupied, classroom.getCapacityMaximum()));
        response.setCapacityStatus(classroom.capacityStatus(occupied).name());
        response.setLanguageOfInstruction(classroom.getLanguageOfInstruction());
        response.setStatus(classroom.getStatus().name());
        response.setDeletable(occupied == 0);
        Teacher mainTeacher = classroom.getMainTeacher();
        if (mainTeacher != null) {
            response.setMainTeacherId(mainTeacher.getId());
            response.setMainTeacherName(mainTeacher.fullName());
        }
        // La salle habituelle sert a l'ecran de l'emploi du temps, qui la propose
        // par defaut : la classe y suit ses cours sans avoir a la ressaisir.
        Room defaultRoom = classroom.getDefaultRoom();
        if (defaultRoom != null) {
            response.setDefaultRoomId(defaultRoom.getId());
            response.setDefaultRoomName(defaultRoom.getName());
        }
        return response;
    }

    private static int percent(int part, int whole) {
        return whole <= 0 ? 0 : (int) Math.round(part * 100.0 / whole);
    }

    private static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value;
    }

    /** Strips accents so a code stays usable in URLs, exports and file names. */
    private static String asciiUpper(String value) {
        String normalised = Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        return normalised.toUpperCase(Locale.ROOT).replaceAll("[^A-Z0-9]+", "");
    }
}
