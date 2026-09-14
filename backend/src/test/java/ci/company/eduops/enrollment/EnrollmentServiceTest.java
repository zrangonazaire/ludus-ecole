package ci.company.eduops.enrollment;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.admission.repository.AdmissionApplicationRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.common.event.DomainEventPublisher;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.dto.request.EnrollmentCreateRequest;
import ci.company.eduops.enrollment.dto.request.NewStudentPayload;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.enrollment.service.EnrollmentDomainService;
import ci.company.eduops.enrollment.service.EnrollmentService;
import ci.company.eduops.finance.service.StudentFeeGenerationService;
import ci.company.eduops.guardian.domain.Guardian;
import ci.company.eduops.guardian.domain.GuardianRelationship;
import ci.company.eduops.guardian.domain.StudentGuardian;
import ci.company.eduops.guardian.repository.GuardianRepository;
import ci.company.eduops.guardian.repository.StudentGuardianRepository;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.student.service.StudentService;
import jakarta.validation.Validation;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.*;

class EnrollmentServiceTest {
    final EnrollmentRepository enrollments = mock(EnrollmentRepository.class);
    final StudentRepository students = mock(StudentRepository.class);
    final ClassroomRepository classrooms = mock(ClassroomRepository.class);
    final AcademicYearRepository years = mock(AcademicYearRepository.class);
    final GuardianRepository guardians = mock(GuardianRepository.class);
    final StudentGuardianRepository links = mock(StudentGuardianRepository.class);
    final StudentService studentService = mock(StudentService.class);
    final EnrollmentService service = new EnrollmentService(enrollments, students, classrooms,
            years, mock(AdmissionApplicationRepository.class), mock(EnrollmentDomainService.class),
            mock(StudentFeeGenerationService.class), studentService, mock(NumberSequenceService.class),
            mock(DomainEventPublisher.class, RETURNS_DEEP_STUBS),
            mock(AuditService.class, RETURNS_DEEP_STUBS), mock(CurrentUser.class),
            new EduOpsProperties(), guardians, links);

    EnrollmentCreateRequest request() {
        var request = new EnrollmentCreateRequest();
        request.setClassroomId(UUID.randomUUID());
        request.setAcademicYearId(UUID.randomUUID());
        request.setIdempotencyKey(UUID.randomUUID().toString());
        var payload = new NewStudentPayload();
        payload.setFirstName("Aya");
        payload.setLastName("Kone");
        payload.setGender(Gender.FEMALE);
        payload.setBirthDate(LocalDate.of(2015, 1, 1));
        var guardian = new NewStudentPayload.NewGuardianPayload();
        guardian.setFirstName("Awa");
        guardian.setLastName("Kone");
        guardian.setPhone("0102030405");
        guardian.setRelationship(GuardianRelationship.MOTHER);
        guardian.setFinancialResponsibility(true);
        payload.setGuardian(guardian);
        request.setNewStudent(payload);
        return request;
    }

    Classroom classroom(EnrollmentCreateRequest request) {
        var school = new School();
        school.setId(UUID.randomUUID());
        school.setCode("TEST");
        var year = new AcademicYear();
        year.setId(request.getAcademicYearId());
        year.setSchool(school);
        year.setCode("2026");
        var level = new Level();
        level.setName("CP");
        var classroom = new Classroom();
        classroom.setId(request.getClassroomId());
        classroom.setAcademicYear(year);
        classroom.setLevel(level);
        classroom.setCode("CP-A");
        classroom.setName("CP A");
        when(classrooms.lockById(classroom.getId())).thenReturn(Optional.of(classroom));
        when(years.findById(year.getId())).thenReturn(Optional.of(year));
        return classroom;
    }

    @Test
    void createsStudentAndGuardianThenEnrollsWithoutNullLookup() {
        var request = request();
        classroom(request);
        when(studentService.generateStudentNumber(any())).thenReturn("EDU-001");
        when(students.save(any())).thenAnswer(call -> {
            Student student = call.getArgument(0);
            student.setId(UUID.randomUUID());
            return student;
        });
        when(guardians.save(any())).thenAnswer(call -> call.getArgument(0));
        when(enrollments.save(any())).thenAnswer(call -> {
            Enrollment enrollment = call.getArgument(0);
            enrollment.setId(UUID.randomUUID());
            return enrollment;
        });
        var response = service.enroll(request);
        assertThat(response.getStudentName()).isEqualTo("Aya Kone");
        assertThat(response.getStudentId()).isNotNull();
        verify(students, never()).findById(any());
        var link = ArgumentCaptor.forClass(StudentGuardian.class);
        verify(links).save(link.capture());
        assertThat(link.getValue().getGuardian().getFirstName()).isEqualTo("Awa");
        assertThat(link.getValue().isFinancialResponsibility()).isTrue();
    }

    @Test
    void replayDoesNotCreateAnotherStudent() {
        var request = request();
        var classroom = classroom(request);
        var existing = new Enrollment();
        var student = new Student();
        student.setId(UUID.randomUUID());
        existing.setStudent(student);
        existing.setAcademicYear(classroom.getAcademicYear());
        existing.setClassroom(classroom);
        when(enrollments.findByClassroomIdAndIdempotencyKey(request.getClassroomId(),
                request.getIdempotencyKey())).thenReturn(Optional.of(existing));
        assertThat(service.enroll(request).getStudentId()).isEqualTo(student.getId());
        verifyNoInteractions(students, guardians, links);
    }

    @Test
    void missingStudentReturnsValidationErrorBeforeRepositoryAccess() {
        var request = request();
        request.setNewStudent(null);
        assertThatThrownBy(() -> service.enroll(request)).isInstanceOf(BusinessException.class);
        verifyNoInteractions(students, classrooms);
    }

    @Test
    void validatesNestedIdentityGuardianAndExclusiveSelection() {
        try (var factory = Validation.buildDefaultValidatorFactory()) {
            var validator = factory.getValidator();
            var request = request();
            assertThat(validator.validate(request)).isEmpty();
            request.getNewStudent().setFirstName("");
            request.getNewStudent().getGuardian().setPhone("");
            assertThat(validator.validate(request)).extracting(v -> v.getPropertyPath().toString())
                    .contains("newStudent.firstName", "newStudent.guardian.phone");
            request.setStudentId(UUID.randomUUID());
            assertThat(validator.validate(request)).extracting(v -> v.getPropertyPath().toString())
                    .contains("studentSelectionValid");
        }
    }
}
