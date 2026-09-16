package ci.company.eduops.security.service;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.security.dto.*;
import ci.company.eduops.security.entity.*;
import ci.company.eduops.security.repository.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserManagementService {
    private final AppUserRepository users;
    private final AppRoleRepository roles;
    private final PasswordEncoder encoder;
    private final CurrentUser actor;
    private final EduOpsProperties properties;

    public UserManagementService(AppUserRepository users, AppRoleRepository roles,
                                 PasswordEncoder encoder, CurrentUser actor, EduOpsProperties properties) {
        this.users = users;
        this.roles = roles;
        this.encoder = encoder;
        this.actor = actor;
        this.properties = properties;
    }

    @Transactional(readOnly = true)
    public List<ManagedUserResponse> list() {
        return users.findBySchoolIdOrderByLastNameAscFirstNameAsc(school())
                .stream().map(ManagedUserResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public List<ManagedUserResponse.Profile> profiles() {
        return roles.findVisible(school()).stream().filter(this::assignable)
                .map(r -> new ManagedUserResponse.Profile(r.getId(), r.getLabel())).toList();
    }

    @Transactional
    public ManagedUserResponse create(UserCreateRequest request) {
        UUID schoolId = school();
        if (request.password().length() < properties.getSecurity().getPasswordMinLength()
                || request.password().getBytes(java.nio.charset.StandardCharsets.UTF_8).length > 72) {
            throw new BusinessException(ErrorCode.PASSWORD_POLICY_VIOLATION);
        }
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        if (users.existsByUsernameIgnoreCase(request.username()) || users.existsByEmailIgnoreCase(email)
                || users.existsByUsernameIgnoreCase(email) || users.existsByEmailIgnoreCase(request.username())) {
            throw new BusinessException(ErrorCode.USER_LOGIN_ALREADY_USED);
        }
        AppUser user = new AppUser();
        user.setSchoolId(schoolId);
        user.setUsername(request.username());
        user.setEmail(email);
        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.setRoles(resolve(request.profileIds(), schoolId));
        user.setPasswordHash(encoder.encode(request.password()));
        user.setStatus(UserStatus.ACTIVE);
        try {
            return ManagedUserResponse.from(users.saveAndFlush(user));
        } catch (DataIntegrityViolationException ex) {
            throw new BusinessException(ErrorCode.USER_LOGIN_ALREADY_USED);
        }
    }

    @Transactional
    public ManagedUserResponse updateProfiles(UUID id, UserProfilesRequest request) {
        UUID schoolId = school();
        AppUser user = users.findById(id).filter(u -> schoolId.equals(u.getSchoolId()))
                .orElseThrow(() -> new BusinessException(ErrorCode.RESOURCE_NOT_FOUND));
        // Prevent self-lockout and changing an account with powers the caller cannot grant.
        if (id.equals(actor.requireId()) || user.getRoles().stream().anyMatch(r -> !assignable(r))) {
            throw new BusinessException(ErrorCode.ACCESS_DENIED);
        }
        user.setRoles(resolve(request.profileIds(), schoolId));
        return ManagedUserResponse.from(users.saveAndFlush(user));
    }

    private Set<AppRole> resolve(Set<UUID> ids, UUID schoolId) {
        Set<AppRole> selected = roles.findVisible(schoolId).stream()
                .filter(r -> ids.contains(r.getId())).filter(this::assignable).collect(Collectors.toSet());
        if (selected.isEmpty() || selected.size() != ids.size()) {
            throw new BusinessException(ErrorCode.ACCESS_DENIED, "Un des profils ne peut pas être attribué.");
        }
        return selected;
    }

    private boolean assignable(AppRole role) {
        return !"SUPER_ADMIN".equals(role.getCode())
                && role.getPermissions().stream().allMatch(p -> actor.hasPermission(p.getCode()));
    }

    private UUID school() {
        UUID id = TenantContext.getSchoolId();
        if (id == null) throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                "Sélectionnez un établissement pour gérer ses utilisateurs.");
        return id;
    }
}
