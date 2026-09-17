package ci.company.eduops.room.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.campus.repository.CampusRepository;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.room.domain.Room;
import ci.company.eduops.room.domain.RoomType;
import ci.company.eduops.room.dto.request.RoomUpsertRequest;
import ci.company.eduops.room.dto.response.RoomOptionsResponse;
import ci.company.eduops.room.dto.response.RoomResponse;
import ci.company.eduops.room.repository.RoomRepository;
import ci.company.eduops.timetable.repository.TimetableSlotRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

/**
 * Gestion des salles physiques : bâtiments, étages, capacités, occupation.
 *
 * <p>Une salle appartient à un campus, et c'est le campus qui porte
 * l'établissement : le contexte locataire se vérifie à ce niveau, jamais par
 * la salle elle-même.</p>
 *
 * <p>L'archivage est refusé tant que l'emploi du temps ou une classe s'appuie
 * sur la salle. Laisser partir une salle occupée produirait des créneaux
 * pointant vers un lieu qui n'existe plus, et l'appel du jour afficherait un
 * numéro de salle fantôme — exactement ce qu'aucun surveillant ne peut
 * expliquer à un remplaçant.</p>
 */
@Service
public class RoomService {

    private static final Logger log = LoggerFactory.getLogger(RoomService.class);

    private final RoomRepository roomRepository;
    private final CampusRepository campusRepository;
    private final ClassroomRepository classroomRepository;
    private final TimetableSlotRepository timetableSlotRepository;
    private final AuditService auditService;
    private final ci.company.eduops.room.repository.BuildingLevelRepository levels;

    public RoomService(RoomRepository roomRepository,
                       CampusRepository campusRepository,
                       ClassroomRepository classroomRepository,
                       TimetableSlotRepository timetableSlotRepository,
                       AuditService auditService,
                       ci.company.eduops.room.repository.BuildingLevelRepository levels) {
        this.levels = levels;
        this.roomRepository = roomRepository;
        this.campusRepository = campusRepository;
        this.classroomRepository = classroomRepository;
        this.timetableSlotRepository = timetableSlotRepository;
        this.auditService = auditService;
    }

    // ------------------------------------------------------------------ read

    @Transactional(readOnly = true)
    public List<RoomResponse> list(UUID campusId, String building, String roomType,
                                   String search, boolean includeArchived) {
        UUID schoolId = requireSchool();
        String status = includeArchived ? "" : CommonStatus.ACTIVE.name();
        // Un type inconnu est refusé plutôt que traduit en liste vide : un
        // filtre qui ne renvoie rien se lit « aucune salle », pas « faute de
        // frappe ».
        String type = blankToEmpty(roomType).isEmpty() ? "" : RoomType.parse(roomType).name();
        List<Room> rooms = roomRepository.search(schoolId, campusId, status, type,
                blankToEmpty(building), blankToEmpty(search));

        Map<UUID, Integer> slots = activeSlotsByRoom();
        Map<UUID, Integer> defaults = activeClassesByDefaultRoom();
        return rooms.stream()
                .map(room -> toResponse(room, slots, defaults))
                .toList();
    }

    @Transactional(readOnly = true)
    public RoomOptionsResponse options() {
        UUID schoolId = requireSchool();
        RoomOptionsResponse response = new RoomOptionsResponse();
        response.setCampuses(campusRepository.findBySchoolId(schoolId).stream()
                .map(this::toOption)
                .toList());
        response.setRoomTypes(Arrays.stream(RoomType.values()).map(Enum::name).toList());
        return response;
    }

    @Transactional(readOnly = true)
    public RoomResponse getById(UUID id) {
        Room room = require(id);
        return toResponse(room, activeSlotsByRoom(), activeClassesByDefaultRoom());
    }

    // ----------------------------------------------------------------- write

    @Transactional
    public RoomResponse create(RoomUpsertRequest request) {
        Campus campus = requireCampus(request.getCampusId());
        String code = normaliseCode(request.getCode());
        if (roomRepository.existsByCampusIdAndCode(campus.getId(), code)) {
            throw new BusinessException(ErrorCode.ROOM_CODE_ALREADY_USED,
                    "Ce code est déjà utilisé par une autre salle de ce campus.");
        }

        Room room = new Room();
        room.setCampus(campus);
        room.setCode(code);
        room.setStatus(CommonStatus.ACTIVE);
        apply(room, request);

        Room saved = roomRepository.save(room);
        auditService.logCreate("Room", saved.getId(), saved.getName(), snapshot(saved));
        log.info("Salle {} ({}) créée sur le campus {}", saved.getName(), saved.getCode(),
                campus.getCode());
        return toResponse(saved, Map.of(), Map.of());
    }

    @Transactional
    public RoomResponse update(UUID id, RoomUpsertRequest request) {
        Room room = require(id);
        Campus campus = requireCampus(request.getCampusId());
        String code = normaliseCode(request.getCode());

        boolean moving = !campus.getId().equals(room.getCampus().getId());
        if ((moving || !code.equals(room.getCode()))
                && roomRepository.existsByCampusIdAndCode(campus.getId(), code)) {
            throw new BusinessException(ErrorCode.ROOM_CODE_ALREADY_USED,
                    "Ce code est déjà utilisé par une autre salle de ce campus.");
        }

        Map<UUID, Integer> slots = activeSlotsByRoom();
        Map<UUID, Integer> defaults = activeClassesByDefaultRoom();
        // Déplacer une salle occupée emmènerait ses cours et la classe qui
        // l'utilise par défaut vers un autre site sans que personne ne l'ait
        // demandé.
        if (moving && usage(slots, defaults, room.getId()) > 0) {
            throw BusinessException.of(ErrorCode.ROOM_IN_USE,
                    "Cette salle est encore utilisée sur son campus : "
                            + describeUsage(slots, defaults, room.getId())
                            + " Libérez-la avant de la changer de campus.");
        }

        Map<String, Object> before = snapshot(room);
        room.setCampus(campus);
        room.setCode(code);
        apply(room, request);

        Room saved = roomRepository.save(room);
        auditService.logUpdate("Room", saved.getId(), saved.getName(), before, snapshot(saved));
        log.info("Salle {} ({}) modifiée", saved.getName(), saved.getCode());
        return toResponse(saved, slots, defaults);
    }

    @Transactional
    public RoomResponse archive(UUID id) {
        Room room = require(id);
        Map<UUID, Integer> slots = activeSlotsByRoom();
        Map<UUID, Integer> defaults = activeClassesByDefaultRoom();
        if (usage(slots, defaults, room.getId()) > 0) {
            throw BusinessException.of(ErrorCode.ROOM_IN_USE,
                    "Cette salle est encore utilisée : "
                            + describeUsage(slots, defaults, room.getId())
                            + " Libérez-la avant de l'archiver.");
        }

        room.setStatus(CommonStatus.ARCHIVED);
        Room saved = roomRepository.save(room);
        auditService.logCancel("Room", saved.getId(), saved.getName(), "Archivée par l'utilisateur");
        log.info("Salle {} ({}) archivée", saved.getName(), saved.getCode());
        return toResponse(saved, slots, defaults);
    }

    @Transactional
    public RoomResponse restore(UUID id) {
        Room room = require(id);
        if (room.getStatus() != CommonStatus.ARCHIVED) {
            throw BusinessException.of(ErrorCode.ROOM_NOT_FOUND);
        }
        room.setStatus(CommonStatus.ACTIVE);
        Room saved = roomRepository.save(room);
        auditService.logValidate("Room", saved.getId(), saved.getName(),
                "Réactivée par l'utilisateur");
        log.info("Salle {} ({}) réactivée", saved.getName(), saved.getCode());
        return toResponse(saved, activeSlotsByRoom(), activeClassesByDefaultRoom());
    }

    // ------------------------------------------------------------- internals

    private Room require(UUID id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ROOM_NOT_FOUND));
        UUID schoolId = requireSchool();
        if (!room.getCampus().getSchool().getId().equals(schoolId)) {
            throw BusinessException.of(ErrorCode.ROOM_NOT_FOUND);
        }
        return room;
    }

    private Campus requireCampus(UUID campusId) {
        Campus campus = campusRepository.findById(campusId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.CAMPUS_NOT_FOUND));
        UUID schoolId = requireSchool();
        if (!campus.getSchool().getId().equals(schoolId)) {
            throw BusinessException.of(ErrorCode.CAMPUS_NOT_FOUND);
        }
        return campus;
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }

    /** Cours actifs de l'emploi du temps, comptés par salle en une requête. */
    private Map<UUID, Integer> activeSlotsByRoom() {
        Map<UUID, Integer> counts = new HashMap<>();
        for (Object[] row : timetableSlotRepository.countActiveByRoom()) {
            if (row.length >= 2 && row[0] instanceof UUID roomId && row[1] instanceof Number total) {
                counts.put(roomId, total.intValue());
            }
        }
        return counts;
    }

    /** Classes actives ayant la salle par défaut, comptées par salle. */
    private Map<UUID, Integer> activeClassesByDefaultRoom() {
        Map<UUID, Integer> counts = new HashMap<>();
        for (Object[] row : classroomRepository.countActiveByDefaultRoom()) {
            if (row.length >= 2 && row[0] instanceof UUID roomId && row[1] instanceof Number total) {
                counts.put(roomId, total.intValue());
            }
        }
        return counts;
    }

    private static int usage(Map<UUID, Integer> slots, Map<UUID, Integer> defaults, UUID roomId) {
        return slots.getOrDefault(roomId, 0) + defaults.getOrDefault(roomId, 0);
    }

    private static String describeUsage(Map<UUID, Integer> slots, Map<UUID, Integer> defaults,
                                        UUID roomId) {
        int courses = slots.getOrDefault(roomId, 0);
        int classes = defaults.getOrDefault(roomId, 0);
        if (courses > 0 && classes > 0) {
            return courses + " cours de l'emploi du temps et " + classes
                    + " classe(s) l'ont par défaut.";
        }
        if (courses > 0) {
            return courses + " cours de l'emploi du temps s'y tiennent.";
        }
        return classes + " classe(s) l'ont par défaut.";
    }

    private RoomResponse toResponse(Room room, Map<UUID, Integer> slots,
                                    Map<UUID, Integer> defaults) {
        RoomResponse response = new RoomResponse();
        response.setId(room.getId());
        response.setLevelId(room.getLevel() == null ? null : room.getLevel().getId());
        response.setBuildingId(room.getBuildingRef() == null ? null : room.getBuildingRef().getId());
        response.setCampusId(room.getCampus().getId());
        response.setCampusCode(room.getCampus().getCode());
        response.setCampusName(room.getCampus().getName());
        response.setCode(room.getCode());
        response.setName(room.getName());
        response.setBuilding(room.getBuilding());
        response.setFloor(room.getFloor());
        response.setCapacity(room.getCapacity());
        response.setRoomType(room.getRoomType());
        response.setStatus(room.getStatus().name());
        int courses = slots.getOrDefault(room.getId(), 0);
        int classes = defaults.getOrDefault(room.getId(), 0);
        response.setTimetableSlotCount(courses);
        response.setDefaultClassroomCount(classes);
        response.setArchivable(room.getStatus() == CommonStatus.ACTIVE
                && courses == 0 && classes == 0);
        return response;
    }

    private RoomOptionsResponse.CampusOption toOption(Campus campus) {
        RoomOptionsResponse.CampusOption option = new RoomOptionsResponse.CampusOption();
        option.setId(campus.getId());
        option.setCode(campus.getCode());
        option.setName(campus.getName());
        option.setStatus(campus.getStatus().name());
        return option;
    }

    private void apply(Room room, RoomUpsertRequest request) {
        room.setName(request.getName().trim());
        room.setBuilding(blankToNull(request.getBuilding()));
        room.setFloor(blankToNull(request.getFloor()));
        room.setLevel(null);
        room.setBuildingRef(null);
        if (request.getLevelId() != null) {
            var level = levels.findById(request.getLevelId())
                    .filter(item -> item.getBuilding().getCampus().getId().equals(room.getCampus().getId()))
                    .filter(item -> item.getBuilding().getCampus().getSchool().getId().equals(requireSchool()))
                    .filter(item -> item.getBuilding().getStatus() == CommonStatus.ACTIVE)
                    .orElseThrow(() -> BusinessException.of(ErrorCode.VALIDATION_ERROR));
            room.setLevel(level);
            room.setBuildingRef(level.getBuilding());
            room.setBuilding(level.getBuilding().getName());
            room.setFloor(level.getLabel());
        }
        room.setCapacity(request.getCapacity());
        room.setRoomType(RoomType.parse(request.getRoomType()).name());
    }

    private Map<String, Object> snapshot(Room room) {
        Map<String, Object> snapshot = new LinkedHashMap<>();
        snapshot.put("campusId", room.getCampus().getId());
        snapshot.put("campusCode", room.getCampus().getCode());
        snapshot.put("code", room.getCode());
        snapshot.put("name", room.getName());
        snapshot.put("building", room.getBuilding());
        snapshot.put("floor", room.getFloor());
        snapshot.put("capacity", room.getCapacity());
        snapshot.put("roomType", room.getRoomType());
        snapshot.put("status", room.getStatus().name());
        return snapshot;
    }

    private static String normaliseCode(String value) {
        if (value == null) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Le code de la salle est obligatoire.");
        }
        String stripped = value.trim().toUpperCase(Locale.ROOT)
                .replaceAll("[^A-Z0-9-]", "");
        if (stripped.isEmpty()) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Le code doit contenir au moins une lettre ou un chiffre.");
        }
        return stripped;
    }

    private static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private static String blankToEmpty(String value) {
        return value == null ? "" : value.trim();
    }
}
