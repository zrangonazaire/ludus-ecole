package ci.company.eduops.student;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.*;
import ci.company.eduops.student.dto.request.StudentUpdateRequest;
import ci.company.eduops.student.repository.*;
import ci.company.eduops.student.service.StudentService;
import jakarta.validation.Validation;
import org.junit.jupiter.api.*;
import java.util.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentUpdateTest {
    private final StudentRepository repository = mock(StudentRepository.class);
    private final AuditService audit = mock(AuditService.class);
    private final StudentService service = new StudentService(repository, mock(StudentStatusHistoryRepository.class),
            mock(NumberSequenceService.class), audit, mock(CurrentUser.class));
    private Student student;
    @BeforeEach void setup() {
        School school = new School(); school.setId(UUID.randomUUID()); TenantContext.setSchoolId(school.getId());
        student = new Student(); student.setId(UUID.randomUUID()); student.setSchool(school); student.setVersion(3L);
        student.setFirstName("Avant"); student.setLastName("Koné"); student.setStudentNumber("E001");
        student.setEmail("ancien@example.com"); student.setStatus(StudentStatus.ACTIVE);
        when(repository.findById(student.getId())).thenReturn(Optional.of(student));
    }
    @AfterEach void cleanup() { TenantContext.clear(); }

    @Test void editsIdentityAndClearsOptionalFieldsWithoutChangingEnrollmentIdentity() {
        var request = new StudentUpdateRequest(); request.setVersion(3L); request.setFirstName(" Awa ");
        request.setGender(Gender.FEMALE); request.setCity(" Abidjan "); request.setEmail("");
        service.update(student.getId(), request);
        assertThat(student.getFirstName()).isEqualTo("Awa"); assertThat(student.getLastName()).isEqualTo("Koné");
        assertThat(student.getEmail()).isEmpty(); assertThat(student.getCity()).isEqualTo("Abidjan");
        assertThat(student.getGender()).isEqualTo(Gender.FEMALE);
        assertThat(student.getStudentNumber()).isEqualTo("E001"); assertThat(student.getStatus()).isEqualTo(StudentStatus.ACTIVE);
        verify(audit).logUpdate(eq("Student"), eq(student.getId()), eq("E001"),
                argThat(before -> "Avant".equals(before.get("firstName"))),
                argThat(after -> "Awa".equals(after.get("firstName"))));
    }

    @Test void rejectsAnotherSchoolsStudent() {
        TenantContext.setSchoolId(UUID.randomUUID());
        assertThatThrownBy(() -> service.update(student.getId(), new StudentUpdateRequest())).isInstanceOf(BusinessException.class);
        verify(repository, never()).saveAndFlush(any());
    }

    @Test void rejectsStaleEdits() {
        var request = new StudentUpdateRequest(); request.setVersion(2L); request.setFirstName("Après");
        assertThatThrownBy(() -> service.update(student.getId(), request)).isInstanceOf(BusinessException.class);
        assertThat(student.getFirstName()).isEqualTo("Avant"); verify(repository, never()).saveAndFlush(any());
    }

    @Test void validatesNamesEmailAndPastBirthDate() {
        try (var factory = Validation.buildDefaultValidatorFactory()) {
            var request = new StudentUpdateRequest();
            assertThat(factory.getValidator().validate(request)).isEmpty();
            request.setFirstName(" "); request.setEmail("invalid"); request.setBirthDate(java.time.LocalDate.now().plusDays(1));
            assertThat(factory.getValidator().validate(request)).hasSize(3);
        }
    }
}
