package ci.company.eduops.campus.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.campus.dto.request.CampusUpsertRequest;
import ci.company.eduops.campus.dto.response.CampusResponse;
import ci.company.eduops.campus.repository.CampusRepository;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.room.repository.RoomRepository;
import ci.company.eduops.school.repository.SchoolRepository;
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
 * Gestion des sites physiques de l'établissement.
 *
 * <p>Un campus est rattaché à l'établissement de façon unique (contexte tenant).
 * Il peut être principal (un seul par établissement) ou secondaire. Les salles
 * sont rattachées à un campus ; tant qu'une salle active existe sur un campus,
 * son archivage est refusé.</p>
 */
@Service
public class CampusService {

    private static final Logger log = LoggerFactory.getLogger(CampusService.class);

    private final CampusRepository campusRepository;
    private final RoomRepository roomRepository;
    private final SchoolRepository schoolRepository;
    private final AuditService auditService;

    public CampusService(CampusRepository campusRepository,
                         RoomRepository roomRepository,
                         SchoolRepository schoolRepository,
                         AuditService auditService) {
        this.campusRepository = campusRepository;
        this.roomRepository = roomRepository;
        this.schoolRepository = schoolRepository;
        this.auditService = auditService;
    }

    // ------------------------------------------------------------------ read

    @Transactional(readOnly = true)
    public List<CampusResponse> list(boolean includeArchived) {
        UUID schoolId = requireSchool();
        List<Campus> campuses = includeArchived
                ? campusRepository.findBySchoolId(schoolId)
                : campusRepository.findBySchoolIdAndStatus(schoolId, CommonStatus.ACTIVE);
        return campuses.stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public CampusResponse getById(UUID id) {
        Campus campus = require(id);
        return toResponse(campus);
    }

    // ------------------------------------------------------------- write

    @Transactional
    public CampusResponse create(CampusUpsertRequest request) {
        UUID schoolId = requireSchool();
        Campus campus = new Campus();
        campus.setSchool(schoolRepository.getReferenceById(schoolId));
        apply(campus, request);
        campus.setStatus(CommonStatus.ACTIVE);

        String code = normaliseCode(request.getCode());
        if (campusRepository.existsBySchoolIdAndCode(schoolId, code)) {
            throw new BusinessException(ErrorCode.CAMPUS_CODE_ALREADY_USED,
                    "Ce code est déjà utilisé par un autre campus.");
        }
        campus.setCode(code);

        if (Boolean.TRUE.equals(request.getMain())) {
            if (campusRepository.findBySchoolIdAndMainTrue(schoolId).isPresent()) {
                throw new BusinessException(ErrorCode.CAMPUS_MAIN_EXISTS,
                        "Cet établissement a déjà un campus principal.");
            }
            campus.setMain(true);
        }

        Campus saved = campusRepository.save(campus);
        Map<String, Object> snapshot = snapshot(saved);
        auditService.logCreate("Campus", saved.getId(), saved.getName(), snapshot);
        log.info("Campus {} ({}) créé dans l'établissement {}", saved.getName(), saved.getCode(),
                schoolId);
        return toResponse(saved);
    }


    @Transactional
    public CampusResponse update(UUID id, CampusUpsertRequest request) {
        Campus campus = require(id);
        UUID schoolId = requireSchool();
        String code = normaliseCode(request.getCode());
        if (!code.equals(campus.getCode())
                && campusRepository.existsBySchoolIdAndCode(schoolId, code)) {
            throw new BusinessException(ErrorCode.CAMPUS_CODE_ALREADY_USED,
                    "Ce code est déjà utilisé par un autre campus.");
        }
        if (Boolean.TRUE.equals(request.getMain())
                && campusRepository.findBySchoolIdAndMainTrue(schoolId)
                        .filter(main -> !main.getId().equals(campus.getId())).isPresent()) {
            throw new BusinessException(ErrorCode.CAMPUS_MAIN_EXISTS,
                    "Cet établissement a déjà un campus principal.");
        }

        Map<String, Object> before = snapshot(campus);
        campus.setCode(code);
        apply(campus, request);
        Campus saved = campusRepository.save(campus);
        auditService.logUpdate("Campus", saved.getId(), saved.getName(), before, snapshot(saved));
        return toResponse(saved);
    }

    @Transactional
    public CampusResponse archive(UUID id) {
        Campus campus = require(id);
        if (roomRepository.existsByCampusIdAndStatus(campus.getId(), CommonStatus.ACTIVE)) {
            throw new BusinessException(ErrorCode.CAMPUS_IN_USE,
                    "Des salles sont encore liées à ce campus.");
        }
        campus.setStatus(CommonStatus.ARCHIVED);
        Campus saved = campusRepository.save(campus);
        Map<String, Object> snapshot = snapshot(saved);
        auditService.logCancel("Campus", saved.getId(), saved.getName(), "Archivé par l'utilisateur");
        log.info("Campus {} ({}) archivé", saved.getName(), saved.getCode());
        return toResponse(saved);
    }

    @Transactional
    public CampusResponse restore(UUID id) {
        Campus campus = require(id);
        if (campus.getStatus() != CommonStatus.ARCHIVED) {
            throw new BusinessException(ErrorCode.CAMPUS_NOT_FOUND);
        }
        campus.setStatus(CommonStatus.ACTIVE);
        Campus saved = campusRepository.save(campus);
        auditService.logValidate("Campus", saved.getId(), saved.getName(), "Réactivé par l'utilisateur");
        log.info("Campus {} ({}) réactivé", saved.getName(), saved.getCode());
        return toResponse(saved);
    }

    // ------------------------------------------------------------- internals

    private Campus require(UUID id) {
        Campus campus = campusRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.CAMPUS_NOT_FOUND));
        UUID schoolId = requireSchool();
        if (!campus.getSchool().getId().equals(schoolId)) {
            throw new BusinessException(ErrorCode.CAMPUS_NOT_FOUND);
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

    private CampusResponse toResponse(Campus campus) {
        CampusResponse response = new CampusResponse();
        response.setId(campus.getId());
        response.setCode(campus.getCode());
        response.setName(campus.getName());
        response.setAddressLine1(campus.getAddressLine1());
        response.setCity(campus.getCity());
        response.setPhone(campus.getPhone());
        response.setEmail(campus.getEmail());
        response.setMain(campus.isMain());
        response.setStatus(campus.getStatus().name());
        response.setRoomCount((int) roomRepository.countByCampusId(campus.getId()));
        response.setArchivable(canArchive(campus));
        return response;
    }

    private boolean canArchive(Campus campus) {
        if (campus.isMain()) {
            return false;
        }
        return !roomRepository.existsByCampusIdAndStatus(campus.getId(), CommonStatus.ACTIVE);
    }

    private Map<String, Object> snapshot(Campus campus) {
        Map<String, Object> snapshot = new LinkedHashMap<>();
        snapshot.put("code", campus.getCode());
        snapshot.put("name", campus.getName());
        snapshot.put("addressLine1", campus.getAddressLine1());
        snapshot.put("city", campus.getCity());
        snapshot.put("phone", campus.getPhone());
        snapshot.put("email", campus.getEmail());
        snapshot.put("main", campus.isMain());
        snapshot.put("status", campus.getStatus().name());
        return snapshot;
    }

    private void apply(Campus campus, CampusUpsertRequest request) {
        campus.setName(request.getName().trim());
        campus.setAddressLine1(blankToNull(request.getAddressLine1()));
        campus.setCity(blankToNull(request.getCity()));
        campus.setPhone(blankToNull(request.getPhone()));
        campus.setEmail(blankToNull(request.getEmail()));
        campus.setMain(Boolean.TRUE.equals(request.getMain()));
    }

    private static String normaliseCode(String value) {
        if (value == null) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Le code du campus est obligatoire.");
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
}
