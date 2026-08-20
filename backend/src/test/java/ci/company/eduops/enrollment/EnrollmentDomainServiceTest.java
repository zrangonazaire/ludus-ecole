package ci.company.eduops.enrollment;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.admission.repository.AdmissionApplicationRepository;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;
import ci.company.eduops.enrollment.repository.EnrollmentDocumentRepository;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.enrollment.service.EnrollmentDomainService;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.domain.StudentStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Unit tests of the enrollment rules (section 86).
 *
 * <p>Pure unit tests: no Spring context, no database. They pin the decisions the
 * business made, so a refactor that quietly loosens a rule fails here.</p>
 */
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class EnrollmentDomainServiceTest {

    @Mock
    private EnrollmentRepository enrollmentRepository;

    @Mock
    private EnrollmentDocumentRepository documentRepository;

    @Mock
    private AdmissionApplicationRepository admissionRepository;

    @Mock
    private CurrentUser currentUser;

    private EnrollmentDomainService service;

    private Student student;
    private AcademicYear academicYear;
    private Classroom classroom;

    @BeforeEach
    void setUp() {
        service = new EnrollmentDomainService(
                enrollmentRepository, documentRepository, admissionRepository, currentUser);

        student = new Student();
        student.setId(UUID.randomUUID());
        student.setStudentNumber("EDU-2026-000123");
        student.setStatus(StudentStatus.ADMITTED);

        academicYear = new AcademicYear();
        academicYear.setId(UUID.randomUUID());
        academicYear.setCode("2026-2027");
        academicYear.setStatus(AcademicYearStatus.ACTIVE);
        academicYear.setStartDate(LocalDate.of(2026, 9, 14));
        academicYear.setEndDate(LocalDate.of(2027, 7, 3));
        academicYear.setEnrollmentOpenAt(OffsetDateTime.now().minusDays(30));
        academicYear.setEnrollmentCloseAt(OffsetDateTime.now().plusDays(30));

        classroom = new Classroom();
        classroom.setId(UUID.randomUUID());
        classroom.setCode("3EME-A");
        classroom.setName("3eme A");
        classroom.setCapacityMaximum(40);
        classroom.setStatus(ClassroomStatus.ACTIVE);
        classroom.setAcademicYear(academicYear);
    }

    @Nested
    @DisplayName("Class capacity (section 22 / rule 9)")
    class ClassCapacity {

        @Test
        @DisplayName("capacity 40, enrolled 39 -> the enrollment is accepted")
        void acceptsWhenOneSeatRemains() {
            when(enrollmentRepository.countOccupiedSeats(classroom.getId())).thenReturn(39L);

            assertThatCode(() -> service.checkClassCapacity(classroom, false, null))
                    .doesNotThrowAnyException();
        }

        @Test
        @DisplayName("capacity 40, enrolled 40 -> the enrollment is refused")
        void refusesWhenFull() {
            when(enrollmentRepository.countOccupiedSeats(classroom.getId())).thenReturn(40L);

            assertThatThrownBy(() -> service.checkClassCapacity(classroom, false, null))
                    .isInstanceOf(BusinessException.class)
                    .extracting(ex -> ((BusinessException) ex).getErrorCode())
                    .isEqualTo(ErrorCode.CLASS_CAPACITY_EXCEEDED);
        }

        @Test
        @DisplayName("a full class reports the seat figures so the UI can explain the refusal")
        void refusalCarriesCapacityDetails() {
            when(enrollmentRepository.countOccupiedSeats(classroom.getId())).thenReturn(40L);

            assertThatThrownBy(() -> service.checkClassCapacity(classroom, false, null))
                    .isInstanceOf(BusinessException.class)
                    .satisfies(ex -> {
                        var details = ((BusinessException) ex).getDetails();
                        assertThat(details).containsEntry("capacityMaximum", 40);
                        assertThat(details).containsEntry("activeEnrollments", 40L);
                        assertThat(details).containsEntry("availableSeats", 0);
                    });
        }

        @Test
        @DisplayName("an override without a justification is refused even with the permission")
        void refusesOverrideWithoutJustification() {
            when(enrollmentRepository.countOccupiedSeats(classroom.getId())).thenReturn(40L);

            assertThatThrownBy(() -> service.checkClassCapacity(classroom, true, "  "))
                    .isInstanceOf(BusinessException.class)
                    .extracting(ex -> ((BusinessException) ex).getErrorCode())
                    .isEqualTo(ErrorCode.VALIDATION_ERROR);
        }

        @Test
        @DisplayName("a justified override by an authorised user is accepted")
        void acceptsJustifiedOverride() {
            when(enrollmentRepository.countOccupiedSeats(classroom.getId())).thenReturn(40L);
            when(currentUser.username()).thenReturn("registrar");

            assertThatCode(() -> service.checkClassCapacity(
                    classroom, true, "Fratrie deja scolarisee, accord de la direction"))
                    .doesNotThrowAnyException();
        }

        @Test
        @DisplayName("an inactive class refuses enrollments whatever the capacity")
        void refusesInactiveClass() {
            classroom.setStatus(ClassroomStatus.DRAFT);

            assertThatThrownBy(() -> service.checkClassCapacity(classroom, false, null))
                    .isInstanceOf(BusinessException.class)
                    .extracting(ex -> ((BusinessException) ex).getErrorCode())
                    .isEqualTo(ErrorCode.CLASS_NOT_ACTIVE);
        }
    }

    @Nested
    @DisplayName("Double enrollment (section 21 / rule 21)")
    class DoubleEnrollment {

        @Test
        @DisplayName("a student already enrolled for the same year is refused")
        void refusesSecondEnrollmentForSameYear() {
            Enrollment existing = new Enrollment();
            existing.setId(UUID.randomUUID());
            existing.setEnrollmentNumber("ENR-2026-000001");
            existing.setStatus(EnrollmentStatus.ACTIVE);
            when(enrollmentRepository.findLiveEnrollment(student.getId(), academicYear.getId()))
                    .thenReturn(Optional.of(existing));

            assertThatThrownBy(() -> service.checkExistingEnrollment(student, academicYear))
                    .isInstanceOf(BusinessException.class)
                    .extracting(ex -> ((BusinessException) ex).getErrorCode())
                    .isEqualTo(ErrorCode.STUDENT_ALREADY_ENROLLED);
        }

        @Test
        @DisplayName("no live enrollment -> the check passes")
        void acceptsWhenNoLiveEnrollment() {
            when(enrollmentRepository.findLiveEnrollment(any(), any())).thenReturn(Optional.empty());

            assertThatCode(() -> service.checkExistingEnrollment(student, academicYear))
                    .doesNotThrowAnyException();
        }
    }

    @Nested
    @DisplayName("Student status and academic year")
    class StatusChecks {

        @Test
        @DisplayName("a WITHDRAWN student cannot be enrolled")
        void refusesWithdrawnStudent() {
            student.setStatus(StudentStatus.WITHDRAWN);

            assertThatThrownBy(() -> service.checkStudent(student))
                    .isInstanceOf(BusinessException.class)
                    .extracting(ex -> ((BusinessException) ex).getErrorCode())
                    .isEqualTo(ErrorCode.STUDENT_NOT_ACTIVE);
        }

        @Test
        @DisplayName("an ADMITTED or ACTIVE student can be enrolled")
        void acceptsAdmittedAndActive() {
            student.setStatus(StudentStatus.ADMITTED);
            assertThatCode(() -> service.checkStudent(student)).doesNotThrowAnyException();

            student.setStatus(StudentStatus.ACTIVE);
            assertThatCode(() -> service.checkStudent(student)).doesNotThrowAnyException();
        }

        @Test
        @DisplayName("a closed academic year refuses enrollments")
        void refusesClosedYear() {
            academicYear.setStatus(AcademicYearStatus.CLOSED);

            assertThatThrownBy(() -> service.checkAcademicYear(academicYear))
                    .isInstanceOf(BusinessException.class)
                    .extracting(ex -> ((BusinessException) ex).getErrorCode())
                    .isEqualTo(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE);
        }

        @Test
        @DisplayName("a closed enrollment window refuses enrollments on an active year")
        void refusesClosedEnrollmentWindow() {
            academicYear.setEnrollmentCloseAt(OffsetDateTime.now().minusDays(1));

            assertThatThrownBy(() -> service.checkAcademicYear(academicYear))
                    .isInstanceOf(BusinessException.class)
                    .extracting(ex -> ((BusinessException) ex).getErrorCode())
                    .isEqualTo(ErrorCode.ENROLLMENT_WINDOW_CLOSED);
        }
    }

    @Nested
    @DisplayName("Preview endpoint")
    class Preview {

        @Test
        @DisplayName("reports every blocker at once instead of the first one")
        void reportsAllBlockers() {
            student.setStatus(StudentStatus.WITHDRAWN);
            academicYear.setEnrollmentCloseAt(OffsetDateTime.now().minusDays(1));
            when(enrollmentRepository.countOccupiedSeats(classroom.getId())).thenReturn(40L);
            when(admissionRepository.countReservedSeats(classroom.getId())).thenReturn(0L);
            when(enrollmentRepository.findLiveEnrollment(any(), any())).thenReturn(Optional.empty());

            var result = service.preview(student, academicYear, classroom);

            assertThat(result.isAllowed()).isFalse();
            assertThat(result.getBlockers()).contains(
                    ErrorCode.STUDENT_NOT_ACTIVE.name(),
                    ErrorCode.ENROLLMENT_WINDOW_CLOSED.name(),
                    ErrorCode.CLASS_CAPACITY_EXCEEDED.name());
        }

        @Test
        @DisplayName("projected seats subtract the admissions holding a seat")
        void projectedSeatsAccountForReservations() {
            when(enrollmentRepository.countOccupiedSeats(classroom.getId())).thenReturn(35L);
            when(admissionRepository.countReservedSeats(classroom.getId())).thenReturn(3L);
            when(enrollmentRepository.findLiveEnrollment(any(), any())).thenReturn(Optional.empty());

            var result = service.preview(student, academicYear, classroom);

            assertThat(result.getAvailableSeats()).isEqualTo(5);
            assertThat(result.getProjectedAvailableSeats()).isEqualTo(2);
            assertThat(result.isAllowed()).isTrue();
        }
    }
}
