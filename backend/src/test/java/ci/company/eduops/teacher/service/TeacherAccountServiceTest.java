package ci.company.eduops.teacher.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.security.entity.*;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.repository.TeacherRepository;
import org.junit.jupiter.api.*;
import java.util.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class TeacherAccountServiceTest {
    final AppUserRepository users = mock(AppUserRepository.class);
    final TeacherRepository teachers = mock(TeacherRepository.class);
    final AuditService audit = mock(AuditService.class);
    final TeacherAccountService service = new TeacherAccountService(users, teachers, audit);
    final UUID schoolId = UUID.randomUUID(), userId = UUID.randomUUID();
    AppUser user;
    @BeforeEach void setup() {
        TenantContext.setSchoolId(schoolId);
        user = new AppUser(); user.setId(userId); user.setSchoolId(schoolId); user.setStatus(UserStatus.ACTIVE);
        user.setFirstName("Ada"); user.setLastName("Koffi"); user.setEmail("ada@example.com");
        AppRole role = new AppRole(); role.setCode("TEACHER"); user.setRoles(Set.of(role));
        when(users.lockInSchool(userId, schoolId)).thenReturn(Optional.of(user));
    }
    @AfterEach void clear() { TenantContext.clear(); }
    @Test void acceptsOnlyAnActiveTeacherAccountOfTheSchool() {
        assertThat(service.requireAvailable(userId)).isSameAs(user);
        user.setStatus(UserStatus.DISABLED);
        assertThatThrownBy(() -> service.requireAvailable(userId)).isInstanceOf(BusinessException.class);
    }
    @Test void refusesMissingRoleAndDoesNotGrantItImplicitly() {
        user.setRoles(Set.of());
        assertThatThrownBy(() -> service.requireAvailable(userId)).isInstanceOf(BusinessException.class);
        verify(users, never()).save(any());
    }
    @Test void refusesAnotherSchoolsAccountOrRole() {
        when(users.lockInSchool(userId, schoolId)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> service.requireAvailable(userId)).isInstanceOf(BusinessException.class);
        when(users.lockInSchool(userId, schoolId)).thenReturn(Optional.of(user));
        user.getRoles().iterator().next().setSchoolId(UUID.randomUUID());
        assertThatThrownBy(() -> service.requireAvailable(userId)).isInstanceOf(BusinessException.class);
    }
    @Test void refusesDuplicateLink() {
        when(teachers.findByUserAccountId(userId)).thenReturn(Optional.of(new Teacher()));
        assertThatThrownBy(() -> service.requireAvailable(userId)).isInstanceOf(BusinessException.class);
    }
    @Test void linksLegacyProfileWithoutChangingItsProfessionalData() {
        Teacher teacher = legacy(); teacher.setSpeciality("Mathématiques"); teacher.setWeeklyHoursMax(18);
        service.linkExisting(teacher.getId(), userId);
        assertThat(teacher.getUserAccountId()).isEqualTo(userId);
        assertThat(teacher.getFirstName()).isEqualTo("Ada");
        assertThat(teacher.getEmail()).isEqualTo("ada@example.com");
        assertThat(teacher.getSpeciality()).isEqualTo("Mathématiques");
        assertThat(teacher.getWeeklyHoursMax()).isEqualTo(18);
        verify(teachers).saveAndFlush(teacher);
    }
    @Test void cannotRelinkAnExistingAccountOrAnotherSchoolsProfile() {
        Teacher teacher = legacy(); teacher.setUserAccountId(UUID.randomUUID());
        assertThatThrownBy(() -> service.linkExisting(teacher.getId(), userId)).isInstanceOf(BusinessException.class);
        teacher.setUserAccountId(null); teacher.getSchool().setId(UUID.randomUUID());
        assertThatThrownBy(() -> service.linkExisting(teacher.getId(), userId)).isInstanceOf(BusinessException.class);
        verify(teachers, never()).saveAndFlush(any());
    }
    @Test void identityReadsFromUserAccount() {
        Teacher teacher = legacy(); teacher.setFirstName("Ancien nom"); teacher.setUserAccount(user);
        user.setFirstName("Nouveau prénom");
        assertThat(teacher.fullName()).isEqualTo("Nouveau prénom Koffi");
        assertThat(teacher.getEmail()).isEqualTo(user.getEmail());
    }
    private Teacher legacy() {
        Teacher teacher = new Teacher(); teacher.setId(UUID.randomUUID()); teacher.setEmployeeNumber("ENS-1");
        School school = new School(); school.setId(schoolId); teacher.setSchool(school);
        when(teachers.lockById(teacher.getId())).thenReturn(Optional.of(teacher)); return teacher;
    }
}
