package ci.company.eduops.document.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.domain.AuditAction;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.common.util.VerificationCodeGenerator;
import ci.company.eduops.document.domain.DocumentStatus;
import ci.company.eduops.document.domain.DocumentType;
import ci.company.eduops.document.domain.OfficialDocument;
import ci.company.eduops.document.dto.DocumentIssueRequest;
import ci.company.eduops.document.dto.DocumentLayoutDto;
import ci.company.eduops.document.dto.DocumentResponse;
import ci.company.eduops.document.repository.OfficialDocumentRepository;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

/** Issues traceable school documents and stores their frozen print identity. */
@Service
public class OfficialDocumentService {

    private static final String LAYOUT_KEY = "officialDocumentLayout";
    private static final String NUMBER_SCOPE = "OFFICIAL_DOCUMENT";

    private final OfficialDocumentRepository documentRepository;
    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AcademicYearRepository academicYearRepository;
    private final SchoolRepository schoolRepository;
    private final NumberSequenceService numberSequenceService;
    private final VerificationCodeGenerator verificationCodeGenerator;
    private final AuditService auditService;
    private final CurrentUser currentUser;
    private final ObjectMapper objectMapper;

    public OfficialDocumentService(OfficialDocumentRepository documentRepository,
                                   StudentRepository studentRepository,
                                   EnrollmentRepository enrollmentRepository,
                                   AcademicYearRepository academicYearRepository,
                                   SchoolRepository schoolRepository,
                                   NumberSequenceService numberSequenceService,
                                   VerificationCodeGenerator verificationCodeGenerator,
                                   AuditService auditService,
                                   CurrentUser currentUser,
                                   ObjectMapper objectMapper) {
        this.documentRepository = documentRepository;
        this.studentRepository = studentRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.academicYearRepository = academicYearRepository;
        this.schoolRepository = schoolRepository;
        this.numberSequenceService = numberSequenceService;
        this.verificationCodeGenerator = verificationCodeGenerator;
        this.auditService = auditService;
        this.currentUser = currentUser;
        this.objectMapper = objectMapper;
    }

    @Transactional(readOnly = true)
    public PageResponse<DocumentResponse> search(DocumentType type, DocumentStatus status,
                                                  UUID studentId, String search,
                                                  Pageable pageable) {
        UUID schoolId = TenantContext.getSchoolId();
        String needle = search == null || search.isBlank() ? null : search.trim();
        return PageResponse.from(documentRepository.search(
                schoolId, type, status, studentId, needle, pageable), this::toResponse);
    }

    @Transactional
    public DocumentResponse issue(DocumentIssueRequest request) {
        UUID schoolId = TenantContext.getSchoolId();
        Student student = studentRepository.findById(request.getStudentId())
                .filter(item -> item.getSchool().getId().equals(schoolId))
                .orElseThrow(() -> BusinessException.of(ErrorCode.STUDENT_NOT_FOUND));

        AcademicYear year = academicYearRepository
                .findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE));
        Enrollment enrollment = enrollmentRepository
                .findActiveEnrollment(student.getId(), year.getId()).orElse(null);

        if (requiresEnrollment(request.getType()) && enrollment == null) {
            throw BusinessException.of(ErrorCode.ENROLLMENT_NOT_FOUND,
                    "Une inscription active est nécessaire pour ce document.");
        }
        if (request.getType() == DocumentType.SUMMONS
                && (request.getMeetingDate() == null || blank(request.getPurpose()))) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "La date et le motif sont obligatoires pour une convocation.");
        }

        DocumentLayoutDto layout = readLayout(student.getSchool());
        String pattern = layout.getDocumentNumberPattern();
        String documentNumber = numberSequenceService.next(
                schoolId, NUMBER_SCOPE, pattern, student.getSchool().getCode(),
                String.valueOf(request.getIssueDate().getYear()));

        OfficialDocument document = new OfficialDocument();
        document.setSchool(student.getSchool());
        document.setType(request.getType());
        document.setDocumentNumber(documentNumber);
        document.setVerificationCode(verificationCodeGenerator.generate());
        document.setTitle(label(request.getType()));
        document.setStudent(student);
        document.setEnrollment(enrollment);
        document.setAcademicYear(year);
        document.setStatus(DocumentStatus.ISSUED);
        document.setIssuedAt(OffsetDateTime.of(
                request.getIssueDate(), LocalTime.now(), ZoneOffset.UTC));
        document.setIssuedBy(currentUser.id().orElse(null));
        document.setValidUntil(request.getValidUntil());
        document.setMetadata(metadata(request, layout));
        document = documentRepository.save(document);

        auditService.record(AuditAction.PUBLISH, "OfficialDocument", document.getId())
                .label(documentNumber)
                .school(schoolId)
                .academicYear(year.getId())
                .newValue(Map.of(
                        "type", request.getType().name(),
                        "studentId", student.getId().toString(),
                        "documentNumber", documentNumber))
                .save();
        return toResponse(document);
    }

    @Transactional
    public DocumentResponse revoke(UUID id, String reason) {
        UUID schoolId = TenantContext.getSchoolId();
        OfficialDocument document = documentRepository.findByIdAndSchoolId(id, schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.DOCUMENT_NOT_FOUND));
        if (document.getStatus() == DocumentStatus.REVOKED) {
            throw BusinessException.of(ErrorCode.DOCUMENT_REVOKED);
        }
        document.revoke(reason.trim());
        documentRepository.save(document);
        auditService.logCancel("OfficialDocument", document.getId(),
                document.getDocumentNumber(), reason.trim());
        return toResponse(document);
    }

    @Transactional(readOnly = true)
    public DocumentLayoutDto layout() {
        return readLayout(currentSchool());
    }

    @Transactional
    public DocumentLayoutDto saveLayout(DocumentLayoutDto layout) {
        School school = currentSchool();
        Map<String, Object> settings = new HashMap<>(school.getSettings());
        settings.put(LAYOUT_KEY, objectMapper.convertValue(layout,
                new TypeReference<Map<String, Object>>() { }));
        school.setSettings(settings);
        schoolRepository.save(school);
        auditService.logUpdate("School", school.getId(), school.getName(),
                Map.of("setting", LAYOUT_KEY), Map.of("setting", LAYOUT_KEY, "updated", true));
        return layout;
    }

    private School currentSchool() {
        return schoolRepository.findById(TenantContext.getSchoolId())
                .orElseThrow(() -> BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND));
    }

    private DocumentLayoutDto readLayout(School school) {
        Object stored = school.getSettings().get(LAYOUT_KEY);
        if (stored != null) {
            return objectMapper.convertValue(stored, DocumentLayoutDto.class);
        }
        DocumentLayoutDto layout = new DocumentLayoutDto();
        layout.setSchoolName(school.getName());
        layout.setLegalName(school.getLegalName());
        layout.setMotto(school.getMotto());
        layout.setRegistrationNumber(school.getRegistrationNumber());
        layout.setAddress(join(school.getAddressLine1(), school.getAddressLine2()));
        layout.setCity(school.getCity());
        layout.setCountry(school.getCountry());
        layout.setPhone(school.getPhone());
        layout.setEmail(school.getEmail());
        layout.setWebsite(school.getWebsite());
        layout.setLogoDataUrl(school.getLogoUrl());
        layout.setHeaderLeft("RÉPUBLIQUE DE CÔTE D'IVOIRE\nUnion • Discipline • Travail");
        layout.setHeaderRight("MINISTÈRE DE L'ÉDUCATION NATIONALE\nET DE L'ALPHABÉTISATION");
        layout.setFooterText("Document officiel délivré par l'établissement. "
                + "Toute altération le rend nul.");
        layout.setSignatoryTitle("Chef d'établissement");
        layout.setAccentColor("#1f5fd6");
        layout.setDocumentNumberPattern("DOC-{year}-{seq:6}");
        layout.setShowLogo(true);
        layout.setShowMotto(true);
        layout.setShowSignatureLine(true);
        layout.setShowVerificationCode(true);
        return layout;
    }

    private Map<String, Object> metadata(DocumentIssueRequest request,
                                         DocumentLayoutDto layout) {
        Map<String, Object> metadata = new LinkedHashMap<>();
        put(metadata, "purpose", request.getPurpose());
        put(metadata, "recipient", request.getRecipient());
        put(metadata, "additionalMention", request.getAdditionalMention());
        if (request.getMeetingDate() != null) {
            metadata.put("meetingDate", request.getMeetingDate().toString());
        }
        if (request.getMeetingTime() != null) {
            metadata.put("meetingTime", request.getMeetingTime().toString());
        }
        put(metadata, "meetingPlace", request.getMeetingPlace());
        metadata.put("layout", objectMapper.convertValue(layout,
                new TypeReference<Map<String, Object>>() { }));
        return metadata;
    }

    private DocumentResponse toResponse(OfficialDocument document) {
        DocumentResponse response = new DocumentResponse();
        response.setId(document.getId());
        response.setType(document.getType());
        response.setTypeLabel(label(document.getType()));
        response.setDocumentNumber(document.getDocumentNumber());
        response.setVerificationCode(document.getVerificationCode());
        response.setTitle(document.getTitle());
        response.setStatus(document.getStatus());
        response.setIssuedAt(document.getIssuedAt());
        response.setValidUntil(document.getValidUntil());
        response.setRevokedAt(document.getRevokedAt());
        response.setRevokeReason(document.getRevokeReason());

        Student student = document.getStudent();
        if (student != null) {
            response.setStudentId(student.getId());
            response.setStudentName(student.fullName());
            response.setStudentNumber(student.getStudentNumber());
            response.setGender(student.getGender());
            response.setBirthDate(student.getBirthDate());
            response.setBirthPlace(student.getBirthPlace());
            response.setNationality(student.getNationality());
            response.setPhotoUrl(student.getPhotoUrl());
        }

        Enrollment enrollment = document.getEnrollment();
        if (enrollment != null) {
            response.setEnrollmentId(enrollment.getId());
            response.setEnrollmentNumber(enrollment.getEnrollmentNumber());
            response.setClassroomName(enrollment.getClassroom().getName());
            response.setLevelName(enrollment.getClassroom().getLevel().getName());
        }
        AcademicYear year = document.getAcademicYear();
        if (year != null) {
            response.setAcademicYearId(year.getId());
            response.setAcademicYearCode(year.getCode());
        }

        Map<String, Object> publicMetadata = new LinkedHashMap<>(document.getMetadata());
        Object frozenLayout = publicMetadata.remove("layout");
        response.setMetadata(publicMetadata);
        response.setLayout(frozenLayout == null
                ? readLayout(document.getSchool())
                : objectMapper.convertValue(frozenLayout, DocumentLayoutDto.class));
        return response;
    }

    private boolean requiresEnrollment(DocumentType type) {
        return type == DocumentType.SCHOOL_CERTIFICATE
                || type == DocumentType.ENROLLMENT_ATTESTATION
                || type == DocumentType.STUDENT_CARD
                || type == DocumentType.TRANSCRIPT;
    }

    private String label(DocumentType type) {
        return switch (type) {
            case STUDENT_FILE -> "Fiche individuelle";
            case SCHOOL_CERTIFICATE -> "Certificat de scolarité";
            case ENROLLMENT_ATTESTATION -> "Attestation d'inscription";
            case TRANSCRIPT -> "Relevé de notes";
            case SUMMONS -> "Convocation";
            case STUDENT_CARD -> "Carte d'élève";
            case REPORT_CARD -> "Bulletin de notes";
            case RECEIPT -> "Reçu";
            case INVOICE -> "Facture";
            case FINANCIAL_STATEMENT -> "Situation financière";
            case OTHER -> "Document officiel";
        };
    }

    private void put(Map<String, Object> target, String key, String value) {
        if (!blank(value)) {
            target.put(key, value.trim());
        }
    }

    private boolean blank(String value) {
        return value == null || value.isBlank();
    }

    private String join(String first, String second) {
        if (blank(first)) return second;
        if (blank(second)) return first;
        return first + ", " + second;
    }
}

