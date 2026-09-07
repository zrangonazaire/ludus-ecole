package ci.company.eduops.staff.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.campus.repository.CampusRepository;
import ci.company.eduops.common.domain.ContractType;
import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.staff.domain.Staff;
import ci.company.eduops.staff.domain.StaffStatus;
import ci.company.eduops.staff.dto.StaffResponse;
import ci.company.eduops.staff.dto.StaffSaveRequest;
import ci.company.eduops.staff.dto.StaffStatusRequest;
import ci.company.eduops.staff.repository.StaffRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.EnumMap;
import java.util.EnumSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

/**
 * The school's non-teaching staff: bursar, secretary, caretaker, nurse.
 *
 * <p>Two things are deliberately not editable through the staff form. The
 * employee number is issued once and never changes — it is the reference that
 * appears on payslips and registers, and letting it drift would break the
 * paper trail. And the status changes through a named action carrying a
 * reason, never as a field slipped into an address correction.</p>
 */
@Service
public class StaffService {

    private static final Logger log = LoggerFactory.getLogger(StaffService.class);

    private static final String NUMBER_SCOPE = "STAFF";
    private static final String NUMBER_PATTERN = "PERS-{year}-{seq:4}";

    /** Taille de page plafonnée : un client peut demander n'importe quoi. */
    private static final int MAX_PAGE_SIZE = 200;

    /**
     * Ce qu'on peut devenir depuis chaque situation.
     *
     * <p>Une table plutôt qu'une cascade de {@code if} : les transitions
     * interdites se lisent alors par ce qui est absent. Un départ acté ne
     * redevient pas actif — il faut réembaucher, ce qui crée une nouvelle
     * fiche et laisse l'historique intact.</p>
     */
    private static final Map<StaffStatus, Set<StaffStatus>> ALLOWED =
            new EnumMap<>(StaffStatus.class);

    static {
        ALLOWED.put(StaffStatus.ACTIVE, EnumSet.of(
                StaffStatus.ON_LEAVE, StaffStatus.SUSPENDED, StaffStatus.RESIGNED));
        ALLOWED.put(StaffStatus.ON_LEAVE, EnumSet.of(
                StaffStatus.ACTIVE, StaffStatus.SUSPENDED, StaffStatus.RESIGNED));
        ALLOWED.put(StaffStatus.SUSPENDED, EnumSet.of(
                StaffStatus.ACTIVE, StaffStatus.RESIGNED));
        ALLOWED.put(StaffStatus.RESIGNED, EnumSet.of(StaffStatus.ARCHIVED));
        ALLOWED.put(StaffStatus.ARCHIVED, EnumSet.noneOf(StaffStatus.class));
    }

    private final StaffRepository staffRepository;
    private final SchoolRepository schoolRepository;
    private final CampusRepository campusRepository;
    private final NumberSequenceService numberSequenceService;
    private final AuditService auditService;

    public StaffService(StaffRepository staffRepository,
                        SchoolRepository schoolRepository,
                        CampusRepository campusRepository,
                        NumberSequenceService numberSequenceService,
                        AuditService auditService) {
        this.staffRepository = staffRepository;
        this.schoolRepository = schoolRepository;
        this.campusRepository = campusRepository;
        this.numberSequenceService = numberSequenceService;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public PageResponse<StaffResponse> search(String search, StaffStatus status,
                                              int page, int size) {
        UUID schoolId = requireSchool();
        // Sans tri : l'ordre est déclaré dans la requête elle-même.
        PageRequest pageable = PageRequest.of(Math.max(0, page),
                Math.min(Math.max(1, size), MAX_PAGE_SIZE));

        // Chaîne vide plutôt que null : voir la note sur la requête.
        Page<Staff> found = staffRepository.search(schoolId,
                status == null ? "" : status.name(),
                search == null ? "" : search.trim(),
                pageable);
        return PageResponse.from(found, this::toResponse);
    }

    /** Combien d'agents dans chaque situation, pour les filtres de l'écran. */
    @Transactional(readOnly = true)
    public Map<String, Long> countByStatus() {
        UUID schoolId = requireSchool();
        Map<String, Long> counts = new LinkedHashMap<>();
        // Toutes les situations apparaissent, même à zéro : un filtre qui
        // disparaît quand il ne ramène rien laisse croire qu'il n'existe pas.
        for (StaffStatus status : StaffStatus.values()) {
            counts.put(status.name(), 0L);
        }
        for (Object[] row : staffRepository.countByStatus(schoolId)) {
            counts.put(((StaffStatus) row[0]).name(), (Long) row[1]);
        }
        return counts;
    }

    @Transactional(readOnly = true)
    public StaffResponse get(UUID staffId) {
        return toResponse(requireStaff(staffId));
    }

    @Transactional
    public StaffResponse create(StaffSaveRequest request) {
        UUID schoolId = requireSchool();
        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND));

        Staff staff = new Staff();
        staff.setSchool(school);
        staff.setEmployeeNumber(numberSequenceService.next(
                schoolId, NUMBER_SCOPE, NUMBER_PATTERN, school.getCode()));
        staff.setStatus(StaffStatus.ACTIVE);
        apply(staff, request, schoolId);

        Staff saved = staffRepository.save(staff);
        auditService.logCreate("Staff", saved.getId(), saved.getEmployeeNumber(), Map.of(
                "jobTitle", saved.getJobTitle(),
                "contractType", saved.getContractType().name(),
                "hireDate", saved.getHireDate().toString()));
        log.info("Personnel {} créé : {}", saved.getEmployeeNumber(), saved.getJobTitle());
        return toResponse(saved);
    }

    @Transactional
    public StaffResponse update(UUID staffId, StaffSaveRequest request) {
        UUID schoolId = requireSchool();
        Staff staff = requireStaff(staffId);
        if (staff.getStatus() == StaffStatus.ARCHIVED) {
            throw BusinessException.of(ErrorCode.CONFLICT,
                    "Ce dossier est archivé : il ne peut plus être modifié.");
        }

        Map<String, Object> before = snapshot(staff);
        apply(staff, request, schoolId);
        Staff saved = staffRepository.save(staff);

        auditService.logUpdate("Staff", saved.getId(), saved.getEmployeeNumber(),
                before, snapshot(saved));
        return toResponse(saved);
    }

    /**
     * Change la situation d'un agent.
     *
     * <p>Les transitions interdites sont refusées avec le motif exact plutôt
     * qu'un « opération impossible » : quelqu'un qui essaie de réactiver un
     * départ acté cherche en réalité à réembaucher, et le message le dit.</p>
     */
    @Transactional
    public StaffResponse changeStatus(UUID staffId, StaffStatusRequest request) {
        Staff staff = requireStaff(staffId);
        StaffStatus from = staff.getStatus();
        StaffStatus to = request.getStatus();

        if (from == to) {
            return toResponse(staff);
        }
        if (!ALLOWED.getOrDefault(from, EnumSet.noneOf(StaffStatus.class)).contains(to)) {
            throw BusinessException.of(ErrorCode.CONFLICT, refusal(from, to));
        }

        staff.setStatus(to);
        Staff saved = staffRepository.save(staff);

        auditService.logUpdate("Staff", saved.getId(), saved.getEmployeeNumber(),
                Map.of("status", from.name()),
                Map.of("status", to.name(),
                        "reason", blankToNull(request.getReason()) == null
                                ? "" : request.getReason().trim()));

        if ((to == StaffStatus.RESIGNED || to == StaffStatus.SUSPENDED)
                && saved.getUserAccountId() != null) {
            // Un départ ne ferme pas le compte de connexion : c'est un autre
            // écran, avec ses propres droits. Le signaler dans le journal vaut
            // mieux que de laisser l'accès ouvert sans que personne n'y pense.
            log.warn("Personnel {} passé en {} alors qu'un compte de connexion "
                            + "lui reste rattaché : à désactiver côté comptes.",
                    saved.getEmployeeNumber(), to);
        }
        return toResponse(saved);
    }

    // ------------------------------------------------------------------

    private void apply(Staff staff, StaffSaveRequest request, UUID schoolId) {
        staff.setFirstName(request.getFirstName().trim());
        staff.setLastName(request.getLastName().trim());
        staff.setGender(request.getGender());
        staff.setEmail(blankToNull(request.getEmail()));
        staff.setPhone(blankToNull(request.getPhone()));
        staff.setJobTitle(request.getJobTitle().trim());
        staff.setDepartment(blankToNull(request.getDepartment()));
        staff.setHireDate(request.getHireDate());
        staff.setContractType(request.getContractType());
        staff.setCampus(resolveCampus(request.getCampusId(), schoolId));
    }

    private Campus resolveCampus(UUID campusId, UUID schoolId) {
        if (campusId == null) {
            return null;
        }
        Campus campus = campusRepository.findById(campusId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.RESOURCE_NOT_FOUND,
                        "Ce site est introuvable."));
        if (!schoolId.equals(campus.getSchool().getId())) {
            throw BusinessException.of(ErrorCode.RESOURCE_NOT_FOUND,
                    "Ce site est introuvable.");
        }
        return campus;
    }

    private String refusal(StaffStatus from, StaffStatus to) {
        if (from == StaffStatus.ARCHIVED) {
            return "Ce dossier est archivé. Pour réembaucher cette personne, "
                    + "créez une nouvelle fiche : l'historique reste ainsi intact.";
        }
        if (from == StaffStatus.RESIGNED && to != StaffStatus.ARCHIVED) {
            return "Ce départ est acté. Pour un retour, créez une nouvelle "
                    + "fiche plutôt que de réactiver l'ancienne.";
        }
        return "Passer de « " + statusLabel(from) + " » à « " + statusLabel(to)
                + " » n'est pas prévu.";
    }

    private Map<String, Object> snapshot(Staff staff) {
        Map<String, Object> values = new LinkedHashMap<>();
        values.put("jobTitle", staff.getJobTitle());
        values.put("department", staff.getDepartment() == null ? "" : staff.getDepartment());
        values.put("contractType", staff.getContractType().name());
        values.put("phone", staff.getPhone() == null ? "" : staff.getPhone());
        values.put("email", staff.getEmail() == null ? "" : staff.getEmail());
        return values;
    }

    private StaffResponse toResponse(Staff staff) {
        StaffResponse response = new StaffResponse();
        response.setId(staff.getId());
        response.setEmployeeNumber(staff.getEmployeeNumber());
        response.setFirstName(staff.getFirstName());
        response.setLastName(staff.getLastName());
        response.setFullName(staff.getLastName() + " " + staff.getFirstName());
        response.setGender(staff.getGender());
        response.setEmail(staff.getEmail());
        response.setPhone(staff.getPhone());
        response.setJobTitle(staff.getJobTitle());
        response.setDepartment(staff.getDepartment());
        response.setHireDate(staff.getHireDate());
        response.setContractType(staff.getContractType());
        response.setContractTypeLabel(contractLabel(staff.getContractType()));
        response.setStatus(staff.getStatus());
        response.setStatusLabel(statusLabel(staff.getStatus()));
        if (staff.getCampus() != null) {
            response.setCampusId(staff.getCampus().getId());
            response.setCampusName(staff.getCampus().getName());
        }
        response.setHasUserAccount(staff.getUserAccountId() != null);
        return response;
    }

    private String statusLabel(StaffStatus status) {
        return switch (status) {
            case ACTIVE -> "En poste";
            case ON_LEAVE -> "En congé";
            case SUSPENDED -> "Suspendu";
            case RESIGNED -> "Départ acté";
            case ARCHIVED -> "Archivé";
        };
    }

    private String contractLabel(ContractType type) {
        return switch (type) {
            case PERMANENT -> "Contrat à durée indéterminée";
            case FIXED_TERM -> "Contrat à durée déterminée";
            case HOURLY -> "Vacataire";
            case INTERN -> "Stagiaire";
            case VOLUNTEER -> "Bénévole";
            case OTHER -> "Autre";
        };
    }

    private Staff requireStaff(UUID staffId) {
        UUID schoolId = requireSchool();
        // Introuvable, pas refusé : un dossier d'un autre établissement ne doit
        // pas voir son existence confirmée par un « accès refusé ».
        return staffRepository.findByIdAndSchoolId(staffId, schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.STAFF_NOT_FOUND));
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
