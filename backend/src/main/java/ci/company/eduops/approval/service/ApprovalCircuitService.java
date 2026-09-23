package ci.company.eduops.approval.service;

import ci.company.eduops.approval.domain.ApprovalCircuit;
import ci.company.eduops.approval.domain.ApprovalCircuitLevel;
import ci.company.eduops.approval.domain.ApprovalCircuitLevelMember;
import ci.company.eduops.approval.domain.ApprovalMode;
import ci.company.eduops.approval.dto.request.ApprovalCircuitUpsertRequest;
import ci.company.eduops.approval.dto.response.ApprovalCircuitResponse;
import ci.company.eduops.approval.repository.ApprovalCircuitLevelMemberRepository;
import ci.company.eduops.approval.repository.ApprovalCircuitLevelRepository;
import ci.company.eduops.approval.repository.ApprovalCircuitRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.security.entity.AppUser;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.security.service.Permissions;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

/**
 * Circuits de validation nommes, persistes par etablissement.
 *
 * <p>Lecture : SCHOOL_VIEW ou DISCOUNT_REQUEST_VIEW. Ecriture : SCHOOL_MANAGE
 * ou DISCOUNT_REQUEST_MANAGE. Chaque membre doit etre un compte du meme
 * etablissement. Le dernier niveau de la liste est toujours l'effectif : on ne
 * le demande pas au client, on le recalcule a chaque ecriture.</p>
 */
@Service
public class ApprovalCircuitService {

    private final ApprovalCircuitRepository circuits;
    private final ApprovalCircuitLevelRepository levels;
    private final ApprovalCircuitLevelMemberRepository members;
    private final AppUserRepository users;
    private final CurrentUser currentUser;
    private final AuditService auditService;

    public ApprovalCircuitService(ApprovalCircuitRepository circuits,
                                  ApprovalCircuitLevelRepository levels,
                                  ApprovalCircuitLevelMemberRepository members,
                                  AppUserRepository users,
                                  CurrentUser currentUser,
                                  AuditService auditService) {
        this.circuits = circuits;
        this.levels = levels;
        this.members = members;
        this.users = users;
        this.currentUser = currentUser;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public List<ApprovalCircuitResponse> list() {
        UUID schoolId = requireSchool();
        requireView();
        List<ApprovalCircuitResponse> out = new ArrayList<>();
        for (ApprovalCircuit circuit : circuits.findBySchoolIdOrderByCodeAsc(schoolId)) {
            out.add(toResponse(circuit));
        }
        return out;
    }

    @Transactional(readOnly = true)
    public ApprovalCircuitResponse get(UUID id) {
        requireSchool();
        requireView();
        return toResponse(requireCircuit(id));
    }

    @Transactional
    public ApprovalCircuitResponse create(ApprovalCircuitUpsertRequest input) {
        UUID schoolId = requireSchool();
        requireManage();
        String code = normaliseCode(input.getCode());
        if (circuits.existsBySchoolIdAndCodeIgnoreCase(schoolId, code)) {
            throw BusinessException.of(ErrorCode.APPROVAL_CIRCUIT_CODE_ALREADY_USED,
                    "Le code " + code + " est deja utilise par un autre circuit.");
        }
        ApprovalCircuit circuit = new ApprovalCircuit();
        circuit.setSchoolId(schoolId);
        circuit.setCode(code);
        circuit.setName(input.getName().trim());
        circuit.setUsage(input.getUsage());
        circuit.setCreatedBy(currentUser.requireId());
        circuits.save(circuit);
        replaceLevels(circuit, input.getLevels());
        auditService.logCreate("ApprovalCircuit", circuit.getId(), circuit.getCode(),
                Map.of("levels", input.getLevels().size()));
        return toResponse(circuit);
    }

    @Transactional
    public ApprovalCircuitResponse update(UUID id, ApprovalCircuitUpsertRequest input) {
        requireSchool();
        requireManage();
        ApprovalCircuit circuit = requireCircuit(id);
        String code = normaliseCode(input.getCode());
        if (circuits.existsBySchoolIdAndCodeIgnoreCaseAndIdNot(
                circuit.getSchoolId(), code, circuit.getId())) {
            throw BusinessException.of(ErrorCode.APPROVAL_CIRCUIT_CODE_ALREADY_USED,
                    "Le code " + code + " est deja utilise par un autre circuit.");
        }
        Map<String, Object> before = Map.of("code", circuit.getCode(),
                "levels", levels.findByCircuitIdOrderByLevelNumberAsc(
                        circuit.getId()).size());
        circuit.setCode(code);
        circuit.setName(input.getName().trim());
        circuit.setUsage(input.getUsage());
        circuits.save(circuit);
        replaceLevels(circuit, input.getLevels());
        auditService.logUpdate("ApprovalCircuit", circuit.getId(), circuit.getCode(),
                before, Map.of("code", code, "levels", input.getLevels().size()));
        return toResponse(circuit);
    }

    @Transactional
    public void delete(UUID id) {
        requireSchool();
        requireManage();
        ApprovalCircuit circuit = requireCircuit(id);
        List<ApprovalCircuitLevel> chain =
                levels.findByCircuitIdOrderByLevelNumberAsc(circuit.getId());
        if (!chain.isEmpty()) {
            members.deleteByLevelIdIn(chain.stream()
                    .map(ApprovalCircuitLevel::getId).toList());
        }
        levels.deleteByCircuitId(circuit.getId());
        circuits.delete(circuit);
        // Le circuit disparait du modele : les demandes deja engagees gardent
        // leur propre chaine de validation, figee a leur creation.
        auditService.logCancel("ApprovalCircuit", circuit.getId(),
                circuit.getCode(), "Circuit supprime par un administrateur.");
    }

    /**
     * Remplace la chaine de niveaux d'un circuit.
     *
     * <p>Remplacer plutot que rapprocher : un niveau renomme ou reordonne est
     * un autre niveau. Chaque niveau doit porter au moins un membre : sans
     * valideur nomme, la demande ne pourrait pas avancer et le circuit serait
     * un piege.</p>
     */
    private void replaceLevels(ApprovalCircuit circuit,
                               List<ApprovalCircuitUpsertRequest.LevelInput> inputs) {
        List<ApprovalCircuitLevel> existing =
                levels.findByCircuitIdOrderByLevelNumberAsc(circuit.getId());
        if (!existing.isEmpty()) {
            members.deleteByLevelIdIn(existing.stream()
                    .map(ApprovalCircuitLevel::getId).toList());
            levels.deleteByCircuitId(circuit.getId());
            levels.flush();
        }
        Map<UUID, AppUser> accounts = loadSchoolAccounts(circuit.getSchoolId());
        int number = 1;
        OffsetDateTime now = OffsetDateTime.now();
        for (ApprovalCircuitUpsertRequest.LevelInput input : inputs) {
            Set<UUID> memberIds = new LinkedHashSet<>(input.getMemberIds());
            if (memberIds.isEmpty()) {
                throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                        "Affectez au moins un membre au niveau "
                                + input.getCode().trim() + ".");
            }
            for (UUID memberId : memberIds) {
                if (!accounts.containsKey(memberId)) {
                    throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                            "Ce compte n'appartient pas a l'etablissement.");
                }
            }
            ApprovalCircuitLevel level = new ApprovalCircuitLevel();
            level.setId(UUID.randomUUID());
            level.setSchoolId(circuit.getSchoolId());
            level.setCircuitId(circuit.getId());
            level.setLevelNumber(number++);
            level.setCode(input.getCode().trim().toUpperCase());
            level.setApprovalMode(
                    input.getMode() == null ? ApprovalMode.ALL : input.getMode());
            level.setCreatedAt(now);
            level.setUpdatedAt(now);
            levels.save(level);
            for (UUID memberId : memberIds) {
                ApprovalCircuitLevelMember member = new ApprovalCircuitLevelMember();
                member.setLevelId(level.getId());
                member.setUserId(memberId);
                member.setCreatedAt(now);
                members.save(member);
            }
        }
        levels.flush();
    }

    private Map<UUID, AppUser> loadSchoolAccounts(UUID schoolId) {
        Map<UUID, AppUser> out = new LinkedHashMap<>();
        for (AppUser user : users.findBySchoolIdOrderByLastNameAscFirstNameAsc(schoolId)) {
            out.put(user.getId(), user);
        }
        return out;
    }

    /** Assemble la reponse : niveaux ordonnes, membres nommes, dernier niveau marque. */
    private ApprovalCircuitResponse toResponse(ApprovalCircuit circuit) {
        ApprovalCircuitResponse out = new ApprovalCircuitResponse();
        out.setId(circuit.getId());
        out.setCode(circuit.getCode());
        out.setName(circuit.getName());
        out.setUsage(circuit.getUsage());
        out.setUpdatedAt(circuit.getUpdatedAt());
        List<ApprovalCircuitLevel> chain =
                levels.findByCircuitIdOrderByLevelNumberAsc(circuit.getId());
        Map<UUID, List<ApprovalCircuitLevelMember>> byLevel = new LinkedHashMap<>();
        if (!chain.isEmpty()) {
            List<UUID> ids = chain.stream().map(ApprovalCircuitLevel::getId).toList();
            for (ApprovalCircuitLevelMember m : members.findByLevelIdIn(ids)) {
                byLevel.computeIfAbsent(m.getLevelId(),
                        k -> new ArrayList<>()).add(m);
            }
        }
        Map<UUID, AppUser> accounts = loadSchoolAccounts(circuit.getSchoolId());
        for (int i = 0; i < chain.size(); i++) {
            ApprovalCircuitLevel level = chain.get(i);
            ApprovalCircuitResponse.LevelResponse lr =
                    new ApprovalCircuitResponse.LevelResponse();
            lr.setId(level.getId());
            lr.setLevelNumber(level.getLevelNumber());
            lr.setCode(level.getCode());
            lr.setMode(level.getApprovalMode());
            lr.setLast(i == chain.size() - 1);
            for (ApprovalCircuitLevelMember m :
                    byLevel.getOrDefault(level.getId(), List.of())) {
                ApprovalCircuitResponse.MemberResponse mr =
                        new ApprovalCircuitResponse.MemberResponse();
                mr.setId(m.getUserId());
                AppUser account = accounts.get(m.getUserId());
                if (account != null) {
                    mr.setUsername(account.getUsername());
                    mr.setFullName(account.getFirstName() + " " + account.getLastName());
                }
                lr.getMembers().add(mr);
            }
            out.getLevels().add(lr);
        }
        return out;
    }

    private ApprovalCircuit requireCircuit(UUID id) {
        UUID schoolId = requireSchool();
        return circuits.findByIdAndSchoolId(id, schoolId)
                .orElseThrow(() -> BusinessException.of(
                        ErrorCode.APPROVAL_CIRCUIT_NOT_FOUND));
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun etablissement dans le contexte de la requete.");
        }
        return schoolId;
    }

    private void requireView() {
        if (!currentUser.hasPermission(Permissions.SCHOOL_VIEW)
                && !currentUser.hasPermission(Permissions.DISCOUNT_REQUEST_VIEW)
                && !currentUser.hasPermission(Permissions.DISCOUNT_REQUEST_MANAGE)
                && !currentUser.hasPermission(Permissions.FINANCE_VIEW)
                && !currentUser.hasPermission(Permissions.FINANCE_MANAGE)) {
            throw BusinessException.of(ErrorCode.ACCESS_DENIED,
                    "Missing permission: SCHOOL_VIEW or DISCOUNT_REQUEST_VIEW");
        }
    }

    private void requireManage() {
        if (!currentUser.hasPermission(Permissions.SCHOOL_MANAGE)
                && !currentUser.hasPermission(Permissions.DISCOUNT_REQUEST_MANAGE)) {
            throw BusinessException.of(ErrorCode.ACCESS_DENIED,
                    "Missing permission: SCHOOL_MANAGE or DISCOUNT_REQUEST_MANAGE");
        }
    }

    private String normaliseCode(String code) {
        return code == null ? "" : code.trim().toUpperCase();
    }
}
