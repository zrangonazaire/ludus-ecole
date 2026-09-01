package ci.company.eduops.security;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.security.dto.AccessProfileRequest;
import ci.company.eduops.security.entity.AppPermission;
import ci.company.eduops.security.entity.AppRole;
import ci.company.eduops.security.repository.AppPermissionRepository;
import ci.company.eduops.security.repository.AppRoleRepository;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.security.service.AccessProfileService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AccessProfileServiceTest {

    @Mock
    private AppRoleRepository roleRepository;
    @Mock
    private AppPermissionRepository permissionRepository;
    @Mock
    private AppUserRepository userRepository;
    @InjectMocks
    private AccessProfileService service;

    @AfterEach
    void clearTenant() {
        TenantContext.clear();
    }

    @Test
    void createsSchoolOwnedProfileWithSelectedPermissions() {
        UUID schoolId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        TenantContext.setSchoolId(schoolId);

        AppPermission permission = permission("STUDENT_VIEW");
        when(roleRepository.findVisibleByCode("SURVEILLANT_GENERAL", schoolId))
                .thenReturn(List.of());
        when(permissionRepository.findByCodeIn(Set.of("STUDENT_VIEW")))
                .thenReturn(List.of(permission));
        when(roleRepository.saveAndFlush(any(AppRole.class))).thenAnswer(invocation -> {
            AppRole role = invocation.getArgument(0);
            role.setId(roleId);
            return role;
        });
        when(userRepository.countByRoleAndSchool(roleId, schoolId)).thenReturn(0L);

        var response = service.create(new AccessProfileRequest(
                "Surveillant général", "Surveillant général", null,
                Set.of("STUDENT_VIEW")));

        assertThat(response.code()).isEqualTo("SURVEILLANT_GENERAL");
        assertThat(response.systemProfile()).isFalse();
        assertThat(response.editable()).isTrue();
        assertThat(response.permissionCodes()).containsExactly("STUDENT_VIEW");

        ArgumentCaptor<AppRole> captor = ArgumentCaptor.forClass(AppRole.class);
        verify(roleRepository).saveAndFlush(captor.capture());
        assertThat(captor.getValue().getSchoolId()).isEqualTo(schoolId);
        assertThat(captor.getValue().isSystemRole()).isFalse();
    }

    @Test
    void refusesToModifyBuiltInProfile() {
        UUID schoolId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        TenantContext.setSchoolId(schoolId);
        AppRole builtIn = new AppRole();
        builtIn.setId(roleId);
        builtIn.setSystemRole(true);
        when(roleRepository.findById(roleId)).thenReturn(Optional.of(builtIn));

        assertThatThrownBy(() -> service.update(roleId, new AccessProfileRequest(
                "DIRECTOR", "Direction", null, Set.of("STUDENT_VIEW"))))
                .isInstanceOfSatisfying(BusinessException.class,
                        exception -> assertThat(exception.getErrorCode())
                                .isEqualTo(ErrorCode.ACCESS_PROFILE_NOT_FOUND));
    }

    @Test
    void rejectsUnknownPermissionCode() {
        UUID schoolId = UUID.randomUUID();
        TenantContext.setSchoolId(schoolId);
        when(roleRepository.findVisibleByCode("TEST", schoolId)).thenReturn(List.of());
        when(permissionRepository.findByCodeIn(Set.of("DOES_NOT_EXIST")))
                .thenReturn(List.of());

        assertThatThrownBy(() -> service.create(new AccessProfileRequest(
                "TEST", "Test", null, Set.of("DOES_NOT_EXIST"))))
                .isInstanceOfSatisfying(BusinessException.class,
                        exception -> assertThat(exception.getErrorCode())
                                .isEqualTo(ErrorCode.VALIDATION_ERROR));
    }

    private static AppPermission permission(String code) {
        AppPermission permission = new AppPermission();
        permission.setId(UUID.randomUUID());
        permission.setCode(code);
        permission.setLabel(code);
        permission.setModule("student");
        return permission;
    }
}
