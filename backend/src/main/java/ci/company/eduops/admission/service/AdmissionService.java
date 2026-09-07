package ci.company.eduops.admission.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.admission.domain.AdmissionApplication;
import ci.company.eduops.admission.domain.AdmissionDocument;
import ci.company.eduops.admission.domain.AdmissionStatus;
import ci.company.eduops.admission.dto.request.AdmissionCreateRequest;
import ci.company.eduops.admission.dto.request.AdmissionDocumentRequest;
import ci.company.eduops.admission.dto.request.AdmissionStatusRequest;
import ci.company.eduops.admission.dto.response.AdmissionClassroomOptionResponse;
import ci.company.eduops.admission.dto.response.AdmissionDocumentResponse;
import ci.company.eduops.admission.dto.response.AdmissionOptionsResponse;
import ci.company.eduops.admission.dto.response.AdmissionReferenceResponse;
import ci.company.eduops.admission.dto.response.AdmissionResponse;
import ci.company.eduops.admission.repository.AdmissionApplicationRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.campus.repository.CampusRepository;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.level.repository.LevelRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.service.CurrentUser;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/** Manages the admission funnel before a candidate becomes a student. */
@Service
public class AdmissionService {

    private static final String SCOPE_ADMISSION = "ADMISSION";

    private final AdmissionApplicationRepository admissionRepository;
    private final SchoolRepository schoolRepository;
    private final AcademicYearRepository academicYearRepository;
    private final CampusRepository campusRepository;
    private final LevelRepository levelRepository;
    private final ClassroomRepository classroomRepository;
    private final NumberSequenceService numberSequenceService;
    private final EduOpsProperties properties;
    private final CurrentUser currentUser;
    private final AuditService auditService;

    public AdmissionService(AdmissionApplicationRepository admissionRepository,
                            SchoolRepository schoolRepository,
                            AcademicYearRepository academicYearRepository,
                            CampusRepository campusRepository,
                            LevelRepository levelRepository,
                            ClassroomRepository classroomRepository,
                            NumberSequenceService numberSequenceService,
                            EduOpsProperties properties,
                            CurrentUser currentUser,
                            AuditService auditService) {
        this.admissionRepository = admissionRepository;
        this.schoolRepository = schoolRepository;
        this.academicYearRepository = academicYearRepository;
        this.campusRepository = campusRepository;
        this.levelRepository = levelRepository;
        this.classroomRepository = classroomRepository;
        this.numberSequenceService = numberSequenceService;
        this.properties = properties;
        this.currentUser = currentUser;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public PageResponse<AdmissionResponse> search(UUID academicYearId,
                                                   AdmissionStatus status,
                                                   UUID levelId,
                                                   String search,
                                                   Pageable pageable) {
        AcademicYear year = resolveYear(academicYearId);
        String term = search == null ? "" : search.trim();
        return PageResponse.from(admissionRepository.search(
                year.getId(), status, levelId, term, pageable), this::toResponse);
    }

    @Transactional(readOnly = true)
    public AdmissionResponse get(UUID id) {
        return toResponse(requireAdmission(id));
    }

    @Transactional(readOnly = true)
    public AdmissionOptionsResponse options(UUID academicYearId) {
        UUID schoolId = requireSchool();
        List<AcademicYear> years = academicYearRepository
                .findBySchoolOrderByStartDateDesc(schoolId);
        AcademicYear selected = academicYearId == null
                ? years.stream().filter(year -> year.getStatus() == AcademicYearStatus.ACTIVE)
                    .findFirst().orElseGet(() -> years.stream().findFirst().orElse(null))
                : years.stream().filter(year -> year.getId().equals(academicYearId))
                    .findFirst().orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));

        List<AdmissionReferenceResponse> yearOptions = years.stream()
                .map(year -> new AdmissionReferenceResponse(
                        year.getId(), year.getCode(), year.getLabel()))
                .toList();
        List<AdmissionReferenceResponse> campuses = campusRepository
                .findBySchoolIdAndStatus(schoolId, CommonStatus.ACTIVE).stream()
                .map(campus -> new AdmissionReferenceResponse(
                        campus.getId(), campus.getCode(), campus.getName()))
                .toList();
        List<AdmissionReferenceResponse> levels = levelRepository
                .findBySchool(schoolId, CommonStatus.ACTIVE).stream()
                .map(level -> new AdmissionReferenceResponse(
                        level.getId(), level.getCode(), level.getName()))
                .toList();
        List<AdmissionClassroomOptionResponse> classrooms = selected == null
                ? List.of()
                : classroomRepository.findByAcademicYearIdAndStatus(
                        selected.getId(), ClassroomStatus.ACTIVE).stream()
                    .sorted(Comparator.comparing(Classroom::getName))
                    .map(classroom -> new AdmissionClassroomOptionResponse(
                            classroom.getId(), classroom.getCode(), classroom.getName(),
                            classroom.getLevel().getId(), classroom.getCampus().getId()))
                    .toList();

        return new AdmissionOptionsResponse(
                selected == null ? null : selected.getId(),
                yearOptions, campuses, levels, classrooms);
    }

    @Transactional
    public AdmissionResponse create(AdmissionCreateRequest request) {
        UUID schoolId = requireSchool();
        School school = schoolRepository.findById(schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND));
        AcademicYear year = requireYear(request.academicYearId(), schoolId);
        Campus campus = requireCampus(request.campusId(), schoolId);
        Level level = requireLevel(request.requestedLevelId(), schoolId);
        Classroom classroom = resolveClassroom(
                request.reservedClassroomId(), year, campus, level);

        AdmissionApplication application = new AdmissionApplication();
        application.setSchool(school);
        application.setAcademicYear(year);
        application.setCampus(campus);
        application.setRequestedLevel(level);
        application.setReservedClassroom(classroom);
        application.setApplicationNumber(numberSequenceService.next(
                schoolId, SCOPE_ADMISSION,
                properties.getNumbering().getAdmissionPattern(), school.getCode(),
                String.valueOf(year.getStartDate().getYear())));
        application.setFirstName(request.firstName().trim());
        application.setLastName(request.lastName().trim());
        application.setMiddleName(blankToNull(request.middleName()));
        application.setGender(request.gender());
        application.setBirthDate(request.birthDate());
        application.setBirthPlace(blankToNull(request.birthPlace()));
        application.setNationality(blankToNull(request.nationality()));
        application.setPreviousSchool(blankToNull(request.previousSchool()));
        application.setGuardianFirstName(blankToNull(request.guardianFirstName()));
        application.setGuardianLastName(blankToNull(request.guardianLastName()));
        application.setGuardianPhone(blankToNull(request.guardianPhone()));
        application.setGuardianEmail(blankToNull(request.guardianEmail()));
        application.setNotes(blankToNull(request.notes()));
        addDocument(application, "ACTE_NAISSANCE", "Extrait d’acte de naissance", true);
        addDocument(application, "BULLETINS", "Derniers bulletins scolaires", true);
        addDocument(application, "PHOTO", "Photo d’identité", false);

        AdmissionApplication saved = admissionRepository.save(application);
        auditService.logCreate("AdmissionApplication", saved.getId(),
                saved.getApplicationNumber(), Map.of(
                        "candidate", saved.fullName(),
                        "level", level.getName(),
                        "status", saved.getStatus().name()));
        return toResponse(saved);
    }

    @Transactional
    public AdmissionResponse changeStatus(UUID id, AdmissionStatusRequest request) {
        AdmissionApplication application = requireAdmission(id);
        AdmissionStatus from = application.getStatus();
        AdmissionStatus target = request.status();
        if (target == AdmissionStatus.CONVERTED) {
            throw BusinessException.of(ErrorCode.ADMISSION_INVALID_TRANSITION,
                    "La conversion est effectuée par l’inscription de l’élève.");
        }

        if (request.reservedClassroomId() != null) {
            application.setReservedClassroom(resolveClassroom(
                    request.reservedClassroomId(), application.getAcademicYear(),
                    application.getCampus(), application.getRequestedLevel()));
        }
        if (request.entranceExamScore() != null) {
            application.setEntranceExamScore(request.entranceExamScore());
        }
        if (target == AdmissionStatus.TESTED && application.getEntranceExamScore() == null) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "La note du test d’entrée est obligatoire.");
        }
        if (target == AdmissionStatus.ACCEPTED && !application.hasAllMandatoryDocuments()) {
            throw BusinessException.of(ErrorCode.ADMISSION_DOCUMENTS_INCOMPLETE);
        }
        if (target == AdmissionStatus.REJECTED
                && (request.reason() == null || request.reason().isBlank())) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "Le motif du refus est obligatoire.");
        }

        application.changeStatus(target);
        OffsetDateTime now = OffsetDateTime.now();
        if (target == AdmissionStatus.SUBMITTED) {
            application.setSubmittedAt(now);
        }
        if (target == AdmissionStatus.UNDER_REVIEW) {
            application.setReviewedAt(now);
            application.setReviewedBy(currentUser.requireId());
        }
        if (target == AdmissionStatus.ACCEPTED
                || target == AdmissionStatus.WAITLISTED
                || target == AdmissionStatus.REJECTED) {
            application.setDecisionAt(now);
            application.setDecisionBy(currentUser.requireId());
            application.setDecisionReason(blankToNull(request.reason()));
        }

        AdmissionApplication saved = admissionRepository.save(application);
        auditService.logUpdate("AdmissionApplication", saved.getId(),
                saved.getApplicationNumber(), Map.of("status", from.name()),
                Map.of("status", target.name()));
        return toResponse(saved);
    }

    @Transactional
    public AdmissionResponse updateDocument(UUID admissionId, UUID documentId,
                                             AdmissionDocumentRequest request) {
        AdmissionApplication application = requireAdmission(admissionId);
        AdmissionDocument document = application.getDocuments().stream()
                .filter(item -> item.getId().equals(documentId))
                .findFirst()
                .orElseThrow(() -> BusinessException.of(ErrorCode.RESOURCE_NOT_FOUND));
        if (request.received()) {
            document.markReceived(blankToNull(request.fileUrl()));
        } else {
            document.setReceived(false);
            document.setFileUrl(null);
            document.setReceivedAt(null);
        }
        application.setDocumentsComplete(application.hasAllMandatoryDocuments());
        admissionRepository.save(application);
        auditService.logUpdate("AdmissionApplication", application.getId(),
                application.getApplicationNumber(), Map.of("document", document.getDocumentCode()),
                Map.of("received", document.isReceived()));
        return toResponse(application);
    }

    private AdmissionApplication requireAdmission(UUID id) {
        return admissionRepository.findById(id)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ADMISSION_NOT_FOUND));
    }

    private AcademicYear resolveYear(UUID academicYearId) {
        UUID schoolId = requireSchool();
        if (academicYearId != null) {
            return requireYear(academicYearId, schoolId);
        }
        return academicYearRepository.findBySchoolIdAndStatus(
                        schoolId, AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE));
    }

    private AcademicYear requireYear(UUID id, UUID schoolId) {
        return academicYearRepository.findById(id)
                .filter(year -> schoolId.equals(year.getSchool().getId()))
                .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
    }

    private Campus requireCampus(UUID id, UUID schoolId) {
        return campusRepository.findById(id)
                .filter(campus -> schoolId.equals(campus.getSchool().getId()))
                .orElseThrow(() -> BusinessException.of(ErrorCode.CAMPUS_NOT_FOUND));
    }

    private Level requireLevel(UUID id, UUID schoolId) {
        return levelRepository.findById(id)
                .filter(level -> schoolId.equals(level.getCycle().getSchool().getId()))
                .orElseThrow(() -> BusinessException.of(ErrorCode.RESOURCE_NOT_FOUND,
                        "Niveau introuvable."));
    }

    private Classroom resolveClassroom(UUID id, AcademicYear year, Campus campus, Level level) {
        if (id == null) {
            return null;
        }
        return classroomRepository.findById(id)
                .filter(item -> item.getAcademicYear().getId().equals(year.getId()))
                .filter(item -> item.getCampus().getId().equals(campus.getId()))
                .filter(item -> item.getLevel().getId().equals(level.getId()))
                .filter(item -> item.getStatus() == ClassroomStatus.ACTIVE)
                .orElseThrow(() -> BusinessException.of(ErrorCode.CLASS_NOT_FOUND));
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }

    private void addDocument(AdmissionApplication application, String code,
                             String label, boolean mandatory) {
        AdmissionDocument document = new AdmissionDocument();
        document.setApplication(application);
        document.setDocumentCode(code);
        document.setLabel(label);
        document.setMandatory(mandatory);
        application.getDocuments().add(document);
    }

    private AdmissionResponse toResponse(AdmissionApplication application) {
        Classroom classroom = application.getReservedClassroom();
        String guardianFullName = joinNames(
                application.getGuardianFirstName(), application.getGuardianLastName());
        List<AdmissionDocumentResponse> documents = application.getDocuments().stream()
                .sorted(Comparator.comparing(AdmissionDocument::isMandatory).reversed()
                        .thenComparing(AdmissionDocument::getLabel))
                .map(document -> new AdmissionDocumentResponse(
                        document.getId(), document.getDocumentCode(), document.getLabel(),
                        document.isMandatory(), document.isReceived(), document.getFileUrl(),
                        document.getReceivedAt()))
                .toList();
        return new AdmissionResponse(
                application.getId(), application.getApplicationNumber(),
                application.getAcademicYear().getId(), application.getAcademicYear().getLabel(),
                application.getCampus().getId(), application.getCampus().getName(),
                application.getRequestedLevel().getId(), application.getRequestedLevel().getName(),
                classroom == null ? null : classroom.getId(),
                classroom == null ? null : classroom.getName(),
                application.getFirstName(), application.getLastName(), application.getMiddleName(),
                application.fullName(), application.getGender(), application.getBirthDate(),
                application.getBirthPlace(), application.getNationality(), application.getPreviousSchool(),
                application.getGuardianFirstName(), application.getGuardianLastName(), guardianFullName,
                application.getGuardianPhone(), application.getGuardianEmail(), application.getStatus(),
                application.getSubmittedAt(), application.getReviewedAt(), application.getDecisionAt(),
                application.getDecisionReason(), application.getEntranceExamScore(),
                application.isDocumentsComplete(), application.isSeatReserved(), application.getNotes(),
                documents, application.getCreatedAt());
    }

    private String joinNames(String firstName, String lastName) {
        String value = ((firstName == null ? "" : firstName) + " "
                + (lastName == null ? "" : lastName)).trim();
        return value.isEmpty() ? null : value;
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
