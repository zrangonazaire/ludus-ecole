package ci.company.eduops.security;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.security.dto.*;
import ci.company.eduops.security.entity.*;
import ci.company.eduops.security.repository.*;
import ci.company.eduops.security.service.*;
import org.junit.jupiter.api.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.*;

class UserManagementServiceTest {
    private final AppUserRepository users = mock(AppUserRepository.class);
    private final AppRoleRepository roles = mock(AppRoleRepository.class);
    private final CurrentUser actor = mock(CurrentUser.class);
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(4);
    private final UserManagementService service = new UserManagementService(users, roles, encoder, actor, new EduOpsProperties());
    private final UUID schoolId = UUID.randomUUID();
    private final UUID roleId = UUID.randomUUID();

    @BeforeEach void setup() { TenantContext.setSchoolId(schoolId); }
    @AfterEach void cleanup() { TenantContext.clear(); }

    private AppRole role(String code) {
        AppRole role = new AppRole();
        role.setId(roleId); role.setCode(code); role.setLabel(code); role.setSchoolId(schoolId);
        AppPermission permission = new AppPermission(); permission.setCode("STUDENT_VIEW");
        role.setPermissions(Set.of(permission));
        return role;
    }
    private UserCreateRequest request() {
        return new UserCreateRequest("a.kone", "A@EXAMPLE.COM", "Aminata", "Koné", "SecretTest123!", Set.of(roleId));
    }
    private void allowProfile() {
        when(roles.findVisible(schoolId)).thenReturn(List.of(role("SURVEILLANT")));
        when(actor.hasPermission("STUDENT_VIEW")).thenReturn(true);
    }
    @Test void createsActiveAccountWithHashedPasswordAndSelectedProfile() {
        allowProfile();
        when(users.saveAndFlush(any())).thenAnswer(invocation -> {
            AppUser user = invocation.getArgument(0);
            user.setId(UUID.randomUUID());
            assertThat(user.getSchoolId()).isEqualTo(schoolId);
            assertThat(user.getStatus()).isEqualTo(UserStatus.ACTIVE);
            assertThat(encoder.matches(request().password(), user.getPasswordHash())).isTrue();
            assertThat(user.getPasswordHash()).isNotEqualTo(request().password());
            return user;
        });
        var result = service.create(request());
        assertThat(result.email()).isEqualTo("a@example.com");
        assertThat(result.profiles()).extracting(ManagedUserResponse.Profile::id).containsExactly(roleId);
    }
    @Test void rejectsDuplicateLogin() {
        when(users.existsByUsernameIgnoreCase("a.kone")).thenReturn(true);
        assertThatThrownBy(() -> service.create(request())).isInstanceOfSatisfying(BusinessException.class,
                ex -> assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.USER_LOGIN_ALREADY_USED));
        verify(users, never()).saveAndFlush(any());
    }
    @Test void rejectsProfileFromAnotherSchool() {
        when(roles.findVisible(schoolId)).thenReturn(List.of());
        assertThatThrownBy(() -> service.create(request())).isInstanceOf(BusinessException.class);
        verify(users, never()).saveAndFlush(any());
    }
    @Test void rejectsPrivilegeEscalation() {
        when(roles.findVisible(schoolId)).thenReturn(List.of(role("DIRECTOR")));
        assertThatThrownBy(() -> service.create(request())).isInstanceOf(BusinessException.class);
        verify(users, never()).saveAndFlush(any());
    }
    @Test void neverAssignsSuperAdmin() {
        when(roles.findVisible(schoolId)).thenReturn(List.of(role("SUPER_ADMIN")));
        assertThatThrownBy(() -> service.create(request())).isInstanceOf(BusinessException.class);
        verify(users, never()).saveAndFlush(any());
    }
    @Test void rejectsCrossSchoolAccountUpdate() {
        AppUser other = new AppUser(); other.setSchoolId(UUID.randomUUID());
        UUID id = UUID.randomUUID(); when(users.findById(id)).thenReturn(Optional.of(other));
        assertThatThrownBy(() -> service.updateProfiles(id, new UserProfilesRequest(Set.of(roleId))))
                .isInstanceOfSatisfying(BusinessException.class,
                        ex -> assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.RESOURCE_NOT_FOUND));
        verify(users, never()).saveAndFlush(any());
    }
    @Test void preventsSelfLockout() {
        UUID id = UUID.randomUUID(); AppUser self = new AppUser(); self.setSchoolId(schoolId);
        when(users.findById(id)).thenReturn(Optional.of(self)); when(actor.requireId()).thenReturn(id);
        assertThatThrownBy(() -> service.updateProfiles(id, new UserProfilesRequest(Set.of(roleId))))
                .isInstanceOf(BusinessException.class);
        verify(users, never()).saveAndFlush(any());
    }
    @Test void replacesProfilesOfExistingAccount() {
        allowProfile();
        UUID id = UUID.randomUUID(); AppUser user = new AppUser();
        user.setId(id); user.setSchoolId(schoolId); user.setStatus(UserStatus.ACTIVE);
        when(users.findById(id)).thenReturn(Optional.of(user));
        when(actor.requireId()).thenReturn(UUID.randomUUID());
        when(users.saveAndFlush(user)).thenReturn(user);
        assertThat(service.updateProfiles(id, new UserProfilesRequest(Set.of(roleId))).profiles())
                .extracting(ManagedUserResponse.Profile::id).containsExactly(roleId);
    }
    @Test void requiresSchoolContext() {
        TenantContext.clear();
        assertThatThrownBy(service::list).isInstanceOf(BusinessException.class);
        verifyNoInteractions(users);
    }
}
