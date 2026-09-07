package ci.company.eduops.security.service;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantBypass;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.security.dto.AccessPermissionResponse;
import ci.company.eduops.security.dto.AccessProfileOverviewResponse;
import ci.company.eduops.security.dto.AccessProfileRequest;
import ci.company.eduops.security.dto.AccessProfileResponse;
import ci.company.eduops.security.entity.AppPermission;
import ci.company.eduops.security.entity.AppRole;
import ci.company.eduops.security.repository.AppPermissionRepository;
import ci.company.eduops.security.repository.AppRoleRepository;
import ci.company.eduops.security.repository.AppUserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/** Creates tenant-owned access profiles without ever altering built-in roles. */
@Service
public class AccessProfileService {

    private static final Map<String, String> MODULE_LABELS = Map.ofEntries(
            Map.entry("dashboard", "Pilotage"),
            Map.entry("student", "Élèves"),
            Map.entry("guardian", "Élèves"),
            Map.entry("admission", "Inscriptions"),
            Map.entry("enrollment", "Inscriptions"),
            Map.entry("teacher", "Personnel"),
            Map.entry("staff", "Personnel"),
            Map.entry("school", "Établissement"),
            Map.entry("academicyear", "Établissement"),
            Map.entry("classroom", "Pédagogie"),
            Map.entry("subject", "Pédagogie"),
            Map.entry("curriculum", "Pédagogie"),
            Map.entry("timetable", "Pédagogie"),
            Map.entry("attendance", "Pédagogie"),
            Map.entry("assessment", "Notes et bulletins"),
            Map.entry("grade", "Notes et bulletins"),
            Map.entry("reportcard", "Notes et bulletins"),
            Map.entry("classcouncil", "Notes et bulletins"),
            Map.entry("promotion", "Notes et bulletins"),
            Map.entry("discipline", "Vie scolaire"),
            Map.entry("health", "Santé scolaire"),
            Map.entry("finance", "Finance"),
            Map.entry("payment", "Finance"),
            Map.entry("cashier", "Finance"),
            Map.entry("document", "Documents"),
            Map.entry("notification", "Communication"),
            Map.entry("alert", "Communication"),
            Map.entry("report", "Pilotage"),
            Map.entry("audit", "Sécurité"),
            Map.entry("security", "Sécurité"),
            Map.entry("portal", "Portails")
    );

    private final AppRoleRepository roleRepository;
    private final AppPermissionRepository permissionRepository;
    private final AppUserRepository userRepository;

    public AccessProfileService(AppRoleRepository roleRepository,
                                AppPermissionRepository permissionRepository,
                                AppUserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
    }

    @TenantBypass
    @Transactional(readOnly = true)
    public AccessProfileOverviewResponse overview() {
        // The bootstrap SUPER_ADMIN has no school. It may inspect the protected
        // built-in profiles, while tenant accounts additionally receive only
        // their own school's profiles through the explicit repository filter.
        UUID schoolId = TenantContext.getSchoolId();
        List<AccessProfileResponse> profiles = roleRepository.findVisible(schoolId).stream()
                .map(role -> toResponse(role, schoolId))
                .toList();

        List<AccessPermissionResponse> permissions = permissionRepository
                .findAllByOrderByModuleAscLabelAsc().stream()
                .map(this::toPermissionResponse)
                .sorted(Comparator.comparing(AccessPermissionResponse::module)
                        .thenComparing(AccessPermissionResponse::label))
                .toList();
        return new AccessProfileOverviewResponse(profiles, permissions);
    }

    @Transactional
    public AccessProfileResponse create(AccessProfileRequest request) {
        UUID schoolId = requireSchool();
        String code = normaliseCode(request.code());
        requireUniqueCode(code, schoolId, null);

        AppRole role = new AppRole();
        role.setCode(code);
        role.setSystemRole(false);
        role.setSchoolId(schoolId);
        apply(role, request);
        return toResponse(save(role), schoolId);
    }

    @Transactional
    public AccessProfileResponse update(UUID id, AccessProfileRequest request) {
        UUID schoolId = requireSchool();
        AppRole role = roleRepository.findById(id)
                .filter(candidate -> !candidate.isSystemRole())
                .filter(candidate -> schoolId.equals(candidate.getSchoolId()))
                .orElseThrow(() -> new BusinessException(ErrorCode.ACCESS_PROFILE_NOT_FOUND));

        String code = normaliseCode(request.code());
        requireUniqueCode(code, schoolId, role.getId());
        role.setCode(code);
        apply(role, request);
        return toResponse(save(role), schoolId);
    }

    private void apply(AppRole role, AccessProfileRequest request) {
        role.setLabel(request.label().trim());
        role.setDescription(blankToNull(request.description()));
        role.setPermissions(resolvePermissions(request.permissionCodes()));
    }

    private Set<AppPermission> resolvePermissions(Set<String> requestedCodes) {
        Set<String> codes = requestedCodes.stream()
                .map(String::trim)
                .map(value -> value.toUpperCase(Locale.ROOT))
                .collect(Collectors.toCollection(LinkedHashSet::new));
        List<AppPermission> found = permissionRepository.findByCodeIn(codes);
        Set<String> foundCodes = found.stream().map(AppPermission::getCode).collect(Collectors.toSet());
        List<String> missing = new ArrayList<>(codes);
        missing.removeAll(foundCodes);
        if (!missing.isEmpty()) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Permissions inconnues : " + String.join(", ", missing));
        }
        return new HashSet<>(found);
    }

    private void requireUniqueCode(String code, UUID schoolId, UUID currentId) {
        boolean used = roleRepository.findVisibleByCode(code, schoolId).stream()
                .anyMatch(role -> currentId == null || !currentId.equals(role.getId()));
        if (used) {
            throw new BusinessException(ErrorCode.ACCESS_PROFILE_CODE_ALREADY_USED);
        }
    }

    private AppRole save(AppRole role) {
        try {
            return roleRepository.saveAndFlush(role);
        } catch (DataIntegrityViolationException exception) {
            throw new BusinessException(ErrorCode.ACCESS_PROFILE_CODE_ALREADY_USED,
                    ErrorCode.ACCESS_PROFILE_CODE_ALREADY_USED.getDefaultMessage(), exception);
        }
    }

    private AccessProfileResponse toResponse(AppRole role, UUID schoolId) {
        Set<String> permissionCodes = role.getPermissions().stream()
                .map(AppPermission::getCode)
                .sorted()
                .collect(Collectors.toCollection(LinkedHashSet::new));
        return new AccessProfileResponse(
                role.getId(), role.getCode(), role.getLabel(), role.getDescription(),
                role.isSystemRole(), !role.isSystemRole(), permissionCodes,
                permissionCodes.size(), userRepository.countByRoleAndSchool(role.getId(), schoolId));
    }

    private AccessPermissionResponse toPermissionResponse(AppPermission permission) {
        String module = MODULE_LABELS.getOrDefault(permission.getModule(), permission.getModule());
        return new AccessPermissionResponse(permission.getId(), permission.getCode(),
                permission.getLabel(), module, permission.getDescription());
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }

    private static String normaliseCode(String value) {
        String stripped = Normalizer.normalize(value.trim(), Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        String code = stripped.toUpperCase(Locale.ROOT)
                .replaceAll("[^A-Z0-9]+", "_")
                .replaceAll("^_+|_+$", "");
        if (code.isEmpty()) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR,
                    "Le code doit contenir au moins une lettre ou un chiffre.");
        }
        return code;
    }

    private static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
