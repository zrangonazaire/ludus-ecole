package ci.company.eduops.familyrequest;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.familyrequest.domain.FamilyRequest;
import ci.company.eduops.familyrequest.domain.FamilyRequestChannel;
import ci.company.eduops.familyrequest.domain.FamilyRequestPriority;
import ci.company.eduops.familyrequest.domain.FamilyRequestStatus;
import ci.company.eduops.familyrequest.domain.FamilyRequestType;
import ci.company.eduops.familyrequest.dto.FamilyRequestCreateRequest;
import ci.company.eduops.familyrequest.dto.FamilyRequestUpdateRequest;
import ci.company.eduops.familyrequest.repository.FamilyRequestRepository;
import ci.company.eduops.familyrequest.service.FamilyRequestService;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FamilyRequestServiceTest {

    @Mock private FamilyRequestRepository requestRepository;
    @Mock private StudentRepository studentRepository;
    @Mock private EnrollmentRepository enrollmentRepository;
    @Mock private NumberSequenceService numberSequenceService;
    @Mock private AuditService auditService;

    private FamilyRequestService service;
    private School school;
    private Student student;

    @BeforeEach
    void setUp() {
        service = new FamilyRequestService(requestRepository, studentRepository,
                enrollmentRepository, numberSequenceService, auditService);
        school = school();
        student = student(school);
        TenantContext.setSchoolId(school.getId());
    }

    @AfterEach
    void clearTenant() {
        TenantContext.clear();
    }

    @Test
    void boardCountsEverythingButOpenFilterHidesClosedRequests() {
        FamilyRequest overdue = request(FamilyRequestStatus.NEW,
                FamilyRequestPriority.URGENT, OffsetDateTime.now().minusHours(2));
        FamilyRequest completed = request(FamilyRequestStatus.COMPLETED,
                FamilyRequestPriority.NORMAL, OffsetDateTime.now().minusDays(2));
        completed.setCompletedAt(OffsetDateTime.now().minusDays(1));
        when(requestRepository.findBySchoolId(school.getId()))
                .thenReturn(List.of(completed, overdue));

        var board = service.board(null, "OPEN", null);

        assertThat(board.getTotal()).isEqualTo(2);
        assertThat(board.getNewCount()).isEqualTo(1);
        assertThat(board.getCompletedCount()).isEqualTo(1);
        assertThat(board.getOverdueCount()).isEqualTo(1);
        assertThat(board.getRequests()).extracting("reference")
                .containsExactly(overdue.getReference());
    }

    @Test
    void createGeneratesReferenceAndKeepsCurrentClassAsSnapshot() {
        Classroom classroom = new Classroom();
        classroom.setName("6e A");
        Enrollment enrollment = new Enrollment();
        enrollment.setStatus(EnrollmentStatus.ACTIVE);
        enrollment.setClassroom(classroom);
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        when(enrollmentRepository.findByStudentIdOrderByEnrollmentDateDesc(student.getId()))
                .thenReturn(List.of(enrollment));
        when(numberSequenceService.next(any(), any(), any(), any()))
                .thenReturn("DEM-2026-00001");
        when(requestRepository.save(any())).thenAnswer(invocation -> {
            FamilyRequest saved = invocation.getArgument(0);
            saved.setId(UUID.randomUUID());
            return saved;
        });

        OffsetDateTime before = OffsetDateTime.now();
        FamilyRequestCreateRequest request = new FamilyRequestCreateRequest();
        request.setStudentId(student.getId());
        // Les espaces sont volontaires : le service doit les enlever.
        request.setGuardianName(" Mme Koné ");
        request.setGuardianPhone(" 0700000000 ");
        request.setType(FamilyRequestType.SCHOOL_CERTIFICATE);
        request.setSubject(" Certificat CAF ");
        request.setDescription(null);
        request.setPriority(FamilyRequestPriority.HIGH);
        request.setChannel(FamilyRequestChannel.IN_PERSON);

        var response = service.create(request);

        assertThat(response.getReference()).isEqualTo("DEM-2026-00001");
        assertThat(response.getClassroomName()).isEqualTo("6e A");
        assertThat(response.getGuardianName()).isEqualTo("Mme Koné");
        assertThat(response.getSubject()).isEqualTo("Certificat CAF");
        assertThat(ChronoUnit.DAYS.between(before, response.getDueAt())).isBetween(1L, 2L);
    }

    @Test
    void updateCompletesTheRequestAndCanClearAssignment() {
        FamilyRequest entity = request(FamilyRequestStatus.IN_PROGRESS,
                FamilyRequestPriority.NORMAL, OffsetDateTime.now().plusDays(1));
        entity.setAssignedTo("Awa Traoré");
        when(requestRepository.findByIdAndSchoolId(entity.getId(), school.getId()))
                .thenReturn(Optional.of(entity));
        when(requestRepository.save(entity)).thenReturn(entity);

        FamilyRequestUpdateRequest update = new FamilyRequestUpdateRequest();
        update.setStatus(FamilyRequestStatus.COMPLETED);
        // Deux espaces : une affectation effacee doit revenir a null.
        update.setAssignedTo("  ");
        update.setInternalNote("Document remis à la famille");

        var response = service.update(entity.getId(), update);

        assertThat(response.getStatus()).isEqualTo(FamilyRequestStatus.COMPLETED);
        assertThat(response.getCompletedAt()).isNotNull();
        assertThat(response.getAssignedTo()).isNull();
        assertThat(response.getInternalNote()).isEqualTo("Document remis à la famille");
        assertThat(response.isOverdue()).isFalse();
    }

    private FamilyRequest request(FamilyRequestStatus status,
                                  FamilyRequestPriority priority,
                                  OffsetDateTime dueAt) {
        FamilyRequest request = new FamilyRequest();
        request.setId(UUID.randomUUID());
        request.setSchool(school);
        request.setStudent(student);
        request.setReference("DEM-2026-" + UUID.randomUUID().toString().substring(0, 5));
        request.setType(FamilyRequestType.OTHER);
        request.setStatus(status);
        request.setPriority(priority);
        request.setChannel(FamilyRequestChannel.EMAIL);
        request.setSubject("Question de la famille");
        request.setGuardianName("Mme Koné");
        request.setSubmittedAt(OffsetDateTime.now().minusDays(1));
        request.setDueAt(dueAt);
        return request;
    }

    private School school() {
        School value = new School();
        value.setId(UUID.randomUUID());
        value.setCode("EP");
        value.setName("École Pilote");
        return value;
    }

    private Student student(School owner) {
        Student value = new Student();
        value.setId(UUID.randomUUID());
        value.setSchool(owner);
        value.setStudentNumber("EDU-2026-000001");
        value.setFirstName("Aïcha");
        value.setLastName("Koné");
        value.setGender(Gender.FEMALE);
        value.setBirthDate(LocalDate.of(2013, 4, 5));
        return value;
    }
}
