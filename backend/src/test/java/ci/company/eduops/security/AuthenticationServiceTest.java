package ci.company.eduops.security;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.guardian.repository.GuardianRepository;
import ci.company.eduops.security.dto.LoginRequest;
import ci.company.eduops.security.entity.AppPermission;
import ci.company.eduops.security.entity.AppRole;
import ci.company.eduops.security.entity.AppUser;
import ci.company.eduops.security.entity.RefreshToken;
import ci.company.eduops.security.entity.UserStatus;
import ci.company.eduops.security.jwt.JwtTokenProvider;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.security.repository.RefreshTokenRepository;
import ci.company.eduops.security.service.AuthenticationService;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.security.service.EduOpsUserDetails;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.teacher.repository.TeacherRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ci.company.eduops.audit.service.AuditService;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock private AppUserRepository userRepository;
    @Mock private RefreshTokenRepository refreshTokenRepository;
    @Mock private TeacherRepository teacherRepository;
    @Mock private GuardianRepository guardianRepository;
    @Mock private StudentRepository studentRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtTokenProvider tokenProvider;
    @Mock private CurrentUser currentUser;
    @Mock private AuditService auditService;

    private EduOpsProperties properties;
    private AuthenticationService service;

    @BeforeEach
    void setUp() {
        properties = new EduOpsProperties();
        service = new AuthenticationService(
                userRepository, refreshTokenRepository,
                teacherRepository, guardianRepository, studentRepository,
                passwordEncoder, tokenProvider, properties, currentUser, auditService);
    }

    @Test
    void loginIssuesAndPersistsACompleteSession() {
        AppUser user = activeAdmin();
        LoginRequest request = loginRequest("admin@eduops.local", "ChangeMe!2026");
        when(userRepository.findByLogin("admin@eduops.local")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(request.getPassword(), user.getPasswordHash())).thenReturn(true);
        when(tokenProvider.generateAccessToken(any(EduOpsUserDetails.class))).thenReturn("access");
        when(tokenProvider.generateRefreshToken(any(EduOpsUserDetails.class))).thenReturn("refresh");
        when(tokenProvider.hash("refresh")).thenReturn("refresh-hash");
        when(tokenProvider.accessTokenValiditySeconds()).thenReturn(3600L);
        when(tokenProvider.refreshTokenValiditySeconds()).thenReturn(604800L);

        var response = service.login(request, "JUnit", "127.0.0.1");

        assertThat(response.getAccessToken()).isEqualTo("access");
        assertThat(response.getRefreshToken()).isEqualTo("refresh");
        assertThat(response.getUserId()).isEqualTo(user.getId());
        assertThat(response.getRoles()).containsExactly("SCHOOL_ADMIN");
        assertThat(response.getPermissions()).containsExactly("ROLE_MANAGE");
        assertThat(user.getLastLoginAt()).isNotNull();

        ArgumentCaptor<RefreshToken> token = ArgumentCaptor.forClass(RefreshToken.class);
        verify(refreshTokenRepository).save(token.capture());
        assertThat(token.getValue().getTokenHash()).isEqualTo("refresh-hash");
        assertThat(token.getValue().getUserAgent()).isEqualTo("JUnit");
    }

    @Test
    void badPasswordIncrementsTheFailureCounter() {
        AppUser user = activeAdmin();
        LoginRequest request = loginRequest("admin", "incorrect-password");
        when(userRepository.findByLogin("admin")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(request.getPassword(), user.getPasswordHash())).thenReturn(false);

        assertThatThrownBy(() -> service.login(request, null, null))
                .isInstanceOfSatisfying(BusinessException.class,
                        exception -> assertThat(exception.getErrorCode())
                                .isEqualTo(ErrorCode.INVALID_CREDENTIALS));

        assertThat(user.getFailedLoginAttempts()).isEqualTo(1);
        verify(userRepository).save(user);
    }

    private AppUser activeAdmin() {
        UUID schoolId = UUID.randomUUID();
        AppPermission permission = new AppPermission();
        permission.setId(UUID.randomUUID());
        permission.setCode("ROLE_MANAGE");
        permission.setLabel("Manage roles");
        permission.setModule("security");

        AppRole role = new AppRole();
        role.setId(UUID.randomUUID());
        role.setCode("SCHOOL_ADMIN");
        role.setLabel("Administrator");
        role.setPermissions(Set.of(permission));

        AppUser user = new AppUser();
        user.setId(UUID.randomUUID());
        user.setUsername("admin");
        user.setEmail("admin@eduops.local");
        user.setFirstName("School");
        user.setLastName("Administrator");
        user.setPasswordHash("encoded-password");
        user.setSchoolId(schoolId);
        user.setStatus(UserStatus.ACTIVE);
        user.setRoles(Set.of(role));
        return user;
    }

    private LoginRequest loginRequest(String login, String password) {
        LoginRequest request = new LoginRequest();
        request.setLogin(login);
        request.setPassword(password);
        return request;
    }
}
