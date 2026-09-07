package ci.company.eduops.admission;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.admission.domain.AdmissionApplication;
import ci.company.eduops.admission.domain.AdmissionDocument;
import ci.company.eduops.admission.domain.AdmissionStatus;
import ci.company.eduops.admission.dto.request.AdmissionCreateRequest;
import ci.company.eduops.admission.dto.request.AdmissionStatusRequest;
import ci.company.eduops.admission.repository.AdmissionApplicationRepository;
import ci.company.eduops.admission.service.AdmissionService;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.campus.repository.CampusRepository;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.cycle.domain.Cycle;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.level.repository.LevelRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.service.CurrentUser;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdmissionServiceTest {

    @Mock private AdmissionApplicationRepository admissionRepository;
    @Mock private SchoolRepository schoolRepository;
    @Mock private AcademicYearRepository academicYearRepository;
    @Mock private CampusRepository campusRepository;
    @Mock private LevelRepository levelRepository;
    @Mock private ClassroomRepository classroomRepository;
    @Mock private NumberSequenceService numberSequenceService;
    @Mock private CurrentUser currentUser;
    @Mock private AuditService auditService;

    private AdmissionService service;

    @BeforeEach
    void setUp() {
        service = new AdmissionService(
                admissionRepository, schoolRepository, academicYearRepository,
                campusRepository, levelRepository, classroomRepository,
                numberSequenceService, new EduOpsProperties(), currentUser, auditService);
    }

    @AfterEach
    void clearTenant() {
        TenantContext.clear();
    }

    @Test
    void createsDraftWithGeneratedNumberAndDocumentChecklist() {
        Fixture fixture = fixture();
        TenantContext.setSchoolId(fixture.school.getId());
        when(schoolRepository.findById(fixture.school.getId()))
                .thenReturn(Optional.of(fixture.school));
        when(academicYearRepository.findById(fixture.year.getId()))
                .thenReturn(Optional.of(fixture.year));
        when(campusRepository.findById(fixture.campus.getId()))
                .thenReturn(Optional.of(fixture.campus));
        when(levelRepository.findById(fixture.level.getId()))
                .thenReturn(Optional.of(fixture.level));
        when(numberSequenceService.next(any(), any(), any(), any(), any()))
                .thenReturn("ADM-2026-000001");
        when(admissionRepository.save(any())).thenAnswer(invocation -> {
            AdmissionApplication application = invocation.getArgument(0);
            application.setId(UUID.randomUUID());
            application.getDocuments().forEach(document -> document.setId(UUID.randomUUID()));
            return application;
        });

        var response = service.create(new AdmissionCreateRequest(
                fixture.year.getId(), fixture.campus.getId(), fixture.level.getId(), null,
                "Awa", "Koné", null, Gender.FEMALE,
                LocalDate.of(2014, 5, 10), "Abidjan", "Ivoirienne", null,
                "Mariam", "Koné", "0700000000", "mariam@example.test", null));

        assertThat(response.applicationNumber()).isEqualTo("ADM-2026-000001");
        assertThat(response.status()).isEqualTo(AdmissionStatus.DRAFT);
        assertThat(response.documents()).hasSize(3);
        assertThat(response.documents()).filteredOn(item -> item.mandatory()).hasSize(2);
        assertThat(response.documentsComplete()).isFalse();
    }

    @Test
    void refusesAcceptanceWhileMandatoryDocumentsAreMissing() {
        AdmissionApplication application = applicationUnderReview(false);
        when(admissionRepository.findById(application.getId()))
                .thenReturn(Optional.of(application));

        assertThatThrownBy(() -> service.changeStatus(application.getId(),
                new AdmissionStatusRequest(AdmissionStatus.ACCEPTED, null, null, null)))
                .isInstanceOfSatisfying(BusinessException.class,
                        exception -> assertThat(exception.getErrorCode())
                                .isEqualTo(ErrorCode.ADMISSION_DOCUMENTS_INCOMPLETE));
    }

    @Test
    void acceptsCompleteApplicationAndReservesItsClassroomSeat() {
        AdmissionApplication application = applicationUnderReview(true);
        UUID reviewerId = UUID.randomUUID();
        when(admissionRepository.findById(application.getId()))
                .thenReturn(Optional.of(application));
        when(admissionRepository.save(application)).thenReturn(application);
        when(currentUser.requireId()).thenReturn(reviewerId);

        var response = service.changeStatus(application.getId(),
                new AdmissionStatusRequest(AdmissionStatus.ACCEPTED, null, null,
                        "Dossier conforme"));

        assertThat(response.status()).isEqualTo(AdmissionStatus.ACCEPTED);
        assertThat(response.seatReserved()).isTrue();
        assertThat(response.decisionReason()).isEqualTo("Dossier conforme");
    }

    private AdmissionApplication applicationUnderReview(boolean complete) {
        Fixture fixture = fixture();
        Classroom classroom = new Classroom();
        classroom.setId(UUID.randomUUID());
        classroom.setName("6e A");
        classroom.setCode("6A");
        classroom.setAcademicYear(fixture.year);
        classroom.setCampus(fixture.campus);
        classroom.setLevel(fixture.level);
        classroom.setStatus(ClassroomStatus.ACTIVE);

        AdmissionApplication application = new AdmissionApplication();
        application.setId(UUID.randomUUID());
        application.setApplicationNumber("ADM-2026-000010");
        application.setSchool(fixture.school);
        application.setAcademicYear(fixture.year);
        application.setCampus(fixture.campus);
        application.setRequestedLevel(fixture.level);
        application.setReservedClassroom(classroom);
        application.setFirstName("Awa");
        application.setLastName("Koné");
        application.setGender(Gender.FEMALE);
        application.setBirthDate(LocalDate.of(2014, 5, 10));
        application.setStatus(AdmissionStatus.UNDER_REVIEW);

        AdmissionDocument document = new AdmissionDocument();
        document.setId(UUID.randomUUID());
        document.setApplication(application);
        document.setDocumentCode("ACTE_NAISSANCE");
        document.setLabel("Acte de naissance");
        document.setMandatory(true);
        document.setReceived(complete);
        application.getDocuments().add(document);
        application.setDocumentsComplete(complete);
        return application;
    }

    private Fixture fixture() {
        School school = new School();
        school.setId(UUID.randomUUID());
        school.setCode("EP");
        school.setName("École Pilote");

        AcademicYear year = new AcademicYear();
        year.setId(UUID.randomUUID());
        year.setSchool(school);
        year.setCode("2026-2027");
        year.setLabel("Année 2026-2027");
        year.setStartDate(LocalDate.of(2026, 9, 1));
        year.setEndDate(LocalDate.of(2027, 7, 31));

        Campus campus = new Campus();
        campus.setId(UUID.randomUUID());
        campus.setSchool(school);
        campus.setCode("PRINCIPAL");
        campus.setName("Campus principal");

        Cycle cycle = new Cycle();
        cycle.setId(UUID.randomUUID());
        cycle.setSchool(school);
        cycle.setCode("COLLEGE");
        cycle.setName("Collège");

        Level level = new Level();
        level.setId(UUID.randomUUID());
        level.setCycle(cycle);
        level.setCode("6E");
        level.setName("Sixième");
        return new Fixture(school, year, campus, level);
    }

    private record Fixture(School school, AcademicYear year, Campus campus, Level level) {
    }
}
