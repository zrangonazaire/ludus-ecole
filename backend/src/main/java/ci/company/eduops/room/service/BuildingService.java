package ci.company.eduops.room.service;

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

    public BuildingService(BuildingRepository buildingRepository,
                           CampusRepository campusRepository,
                           RoomRepository roomRepository,
                           AuditService auditService) {
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

