package ci.company.eduops.room.service;

import ci.company.eduops.campus.repository.CampusRepository;
import ci.company.eduops.audit.service.AuditService;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.room.domain.Building;
import ci.company.eduops.room.dto.request.BuildingUpsertRequest;
import ci.company.eduops.room.dto.response.BuildingResponse;
import ci.company.eduops.room.repository.BuildingRepository;
import ci.company.eduops.room.repository.RoomRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

/**
 * Gestion des batiments : un nom sur des portes, des etages, des salles.
 *
 * <p>Un batiment appartient a un campus unique, et c'est le campus qui porte
 * l'etablissement : le contexte locataire se verifie a ce niveau, jamais par
 * le batiment lui-meme. L'archivage est refuse tant qu'une salle active y
 * reste rattachee : sinon la liste des salles afficherait un batiment
 * fantome.</p>
 */
@Service
public class BuildingService {

    private static final Logger log = LoggerFactory.getLogger(BuildingService.class);

    private final BuildingRepository buildingRepository;
    private final CampusRepository campusRepository;
    private final RoomRepository roomRepository;
    private final AuditService auditService;
    private final ci.company.eduops.room.repository.BuildingLevelRepository levels;

    public BuildingService(BuildingRepository buildingRepository,
                           CampusRepository campusRepository,
                           RoomRepository roomRepository,
                           AuditService auditService,
                           ci.company.eduops.room.repository.BuildingLevelRepository levels) {
        this.levels = levels;
        this.buildingRepository = buildingRepository;
        this.campusRepository = campusRepository;
        this.roomRepository = roomRepository;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public List<BuildingResponse> list(UUID campusId, String search, boolean includeArchived) {
        UUID schoolId = requireSchool();
        String status = includeArchived ? "" : CommonStatus.ACTIVE.name();
        return buildingRepository.search(schoolId, campusId, status, blankToEmpty(search))
                .stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public BuildingResponse getById(UUID id) {
        return toResponse(require(id));
    }

    @Transactional
    public BuildingResponse create(BuildingUpsertRequest request) {
        UUID schoolId = requireSchool();
        var campus = campusRepository.findById(request.getCampusId())
                .filter(item -> schoolId.equals(item.getSchool().getId()))
                .filter(item -> item.getStatus() == CommonStatus.ACTIVE)
                .orElseThrow(() -> BusinessException.of(ErrorCode.CAMPUS_NOT_FOUND));
        String code = request.getCode().trim().toUpperCase(Locale.ROOT);
        if (buildingRepository.existsByCampusIdAndCode(campus.getId(), code)) {
            throw BusinessException.of(ErrorCode.BUILDING_CODE_ALREADY_USED);
        }
        Building building = new Building();
        building.setCampus(campus);
        building.setCode(code);
        building.setName(request.getName().trim());
        building.setFloors(request.getFloors());
        building.setStatus(CommonStatus.ACTIVE);
        Building saved;
        try {
            saved = buildingRepository.saveAndFlush(building);
        } catch (DataIntegrityViolationException exception) {
            throw new BusinessException(ErrorCode.BUILDING_CODE_ALREADY_USED,
                    ErrorCode.BUILDING_CODE_ALREADY_USED.getDefaultMessage(), exception);
        }
        for (int number = 0; number <= saved.getFloors(); number++) {
            createLevel(saved, number);
        }
        auditService.logCreate("Building", saved.getId(), saved.getName(),
                Map.of("campusId", campus.getId(), "code", saved.getCode(),
                        "name", saved.getName(), "floors", saved.getFloors()));
        return toResponse(saved);
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) throw BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND);
        return schoolId;
    }

    @Transactional
    public BuildingResponse addLevel(UUID id) {
        Building building = require(id);
        if (building.getStatus() != CommonStatus.ACTIVE) throw BusinessException.of(ErrorCode.BUILDING_NOT_FOUND);
        int next = levels.findByBuildingIdOrderByNumberAsc(id).stream()
                .mapToInt(ci.company.eduops.room.domain.BuildingLevel::getNumber).max().orElse(-1) + 1;
        createLevel(building, next);
        building.setFloors(Math.max(building.getFloors(), next));
        buildingRepository.saveAndFlush(building);
        return toResponse(building);
    }

    private void createLevel(Building building, int number) {
        var level = new ci.company.eduops.room.domain.BuildingLevel();
        level.setBuilding(building); level.setNumber(number);
        level.setLabel(number == 0 ? "Rez-de-chaussée" : number == 1 ? "1er étage" : number + "e étage");
        levels.save(level);
    }

    private Building require(UUID id) {
        UUID schoolId = requireSchool();
        return buildingRepository.findById(id)
                .filter(building -> schoolId.equals(building.getCampus().getSchool().getId()))
                .orElseThrow(() -> BusinessException.of(ErrorCode.BUILDING_NOT_FOUND));
    }

    private String blankToEmpty(String value) {
        return value == null ? "" : value.trim();
    }

    private BuildingResponse toResponse(Building building) {
        BuildingResponse response = new BuildingResponse();
        response.setId(building.getId());
        response.setLevels(levels.findByBuildingIdOrderByNumberAsc(building.getId()).stream()
                .map(level -> new BuildingResponse.Level(level.getId(), level.getNumber(), level.getLabel())).toList());
        response.setCampusId(building.getCampus().getId());
        response.setCampusCode(building.getCampus().getCode());
        response.setCampusName(building.getCampus().getName());
        response.setCode(building.getCode());
        response.setName(building.getName());
        response.setFloors(building.getFloors());
        response.setStatus(building.getStatus().name());
        var rooms = roomRepository.findByBuildingRefIdAndStatus(building.getId(), CommonStatus.ACTIVE);
        response.setRoomCount(rooms.size());
        response.setSeatCount(rooms.stream().mapToInt(room -> Math.max(0, room.getCapacity())).sum());
        response.setUnknownCapacityCount((int) rooms.stream().filter(room -> room.getCapacity() <= 0).count());
        response.setArchivable(building.getStatus() == CommonStatus.ACTIVE && rooms.isEmpty());
        return response;
    }
}

