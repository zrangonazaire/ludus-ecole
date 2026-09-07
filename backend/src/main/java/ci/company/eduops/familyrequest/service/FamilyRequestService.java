package ci.company.eduops.familyrequest.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
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
import ci.company.eduops.familyrequest.dto.FamilyRequestBoardResponse;
import ci.company.eduops.familyrequest.dto.FamilyRequestCreateRequest;
import ci.company.eduops.familyrequest.dto.FamilyRequestResponse;
import ci.company.eduops.familyrequest.dto.FamilyRequestUpdateRequest;
import ci.company.eduops.familyrequest.repository.FamilyRequestRepository;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

/** Maintains the single administrative queue used to answer families. */
@Service
public class FamilyRequestService {

    private static final String NUMBER_SCOPE = "FAMILY_REQUEST";
    private static final String NUMBER_PATTERN = "DEM-{year}-{seq:5}";

    private final FamilyRequestRepository requestRepository;
    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final NumberSequenceService numberSequenceService;
    private final AuditService auditService;

    public FamilyRequestService(FamilyRequestRepository requestRepository,
                                StudentRepository studentRepository,
                                EnrollmentRepository enrollmentRepository,
                                NumberSequenceService numberSequenceService,
                                AuditService auditService) {
        this.requestRepository = requestRepository;
        this.studentRepository = studentRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.numberSequenceService = numberSequenceService;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public FamilyRequestBoardResponse board(String search, String status,
                                            FamilyRequestType type) {
        UUID schoolId = requireSchool();
        List<FamilyRequest> all = requestRepository.findBySchoolId(schoolId);
        OffsetDateTime now = OffsetDateTime.now();
        String needle = normalize(search);
        FamilyRequestStatus exactStatus = parseStatus(status);
        boolean openOnly = "OPEN".equalsIgnoreCase(status);

        List<FamilyRequestResponse> visible = all.stream()
                .filter(item -> !openOnly || !item.getStatus().isClosed())
                .filter(item -> exactStatus == null || item.getStatus() == exactStatus)
                .filter(item -> type == null || item.getType() == type)
                .filter(item -> matches(item, needle))
                .sorted(queueOrder(now))
                .map(item -> toResponse(item, now))
                .toList();

        return new FamilyRequestBoardResponse(
                all.size(),
                count(all, FamilyRequestStatus.NEW),
                count(all, FamilyRequestStatus.IN_PROGRESS),
                count(all, FamilyRequestStatus.WAITING_FAMILY),
                count(all, FamilyRequestStatus.READY),
                count(all, FamilyRequestStatus.COMPLETED),
                all.stream().filter(item -> item.isOverdue(now)).count(),
                visible);
    }

    @Transactional
    public FamilyRequestResponse create(FamilyRequestCreateRequest request) {
        UUID schoolId = requireSchool();
        Student student = studentRepository.findById(request.getStudentId())
                .filter(item -> schoolId.equals(item.getSchool().getId()))
                .orElseThrow(() -> BusinessException.of(ErrorCode.STUDENT_NOT_FOUND));

        OffsetDateTime now = OffsetDateTime.now();
        FamilyRequest entity = new FamilyRequest();
        entity.setSchool(student.getSchool());
        entity.setStudent(student);
        entity.setReference(numberSequenceService.next(
                schoolId, NUMBER_SCOPE, NUMBER_PATTERN, student.getSchool().getCode()));
        entity.setType(request.getType());
        entity.setStatus(FamilyRequestStatus.NEW);
        entity.setPriority(request.getPriority());
        entity.setChannel(request.getChannel());
        entity.setSubject(request.getSubject().trim());
        entity.setDescription(blankToNull(request.getDescription()));
        entity.setGuardianName(request.getGuardianName().trim());
        entity.setGuardianPhone(blankToNull(request.getGuardianPhone()));
        entity.setClassroomName(currentClassroomName(student.getId()));
        entity.setSubmittedAt(now);
        entity.setDueAt(now.plusDays(dueDays(request.getPriority())));

        FamilyRequest saved = requestRepository.save(entity);
        auditService.logCreate("FamilyRequest", saved.getId(), saved.getReference(), Map.of(
                "studentId", student.getId().toString(),
                "type", saved.getType().name(),
                "priority", saved.getPriority().name()));
        return toResponse(saved, now);
    }

    @Transactional
    public FamilyRequestResponse update(UUID requestId, FamilyRequestUpdateRequest request) {
        UUID schoolId = requireSchool();
        FamilyRequest entity = requestRepository.findByIdAndSchoolId(requestId, schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.FAMILY_REQUEST_NOT_FOUND));

        FamilyRequestStatus previousStatus = entity.getStatus();
        entity.setStatus(request.getStatus());
        entity.setAssignedTo(blankToNull(request.getAssignedTo()));
        entity.setInternalNote(blankToNull(request.getInternalNote()));
        entity.setCompletedAt(request.getStatus() == FamilyRequestStatus.COMPLETED
                ? completedAt(entity) : null);

        FamilyRequest saved = requestRepository.save(entity);
        auditService.logUpdate("FamilyRequest", saved.getId(), saved.getReference(),
                Map.of("status", previousStatus.name()),
                Map.of("status", saved.getStatus().name()));
        return toResponse(saved, OffsetDateTime.now());
    }

    private String currentClassroomName(UUID studentId) {
        return enrollmentRepository.findByStudentIdOrderByEnrollmentDateDesc(studentId).stream()
                .filter(item -> item.getStatus() == EnrollmentStatus.ACTIVE
                        || item.getStatus() == EnrollmentStatus.VALIDATED)
                .map(Enrollment::getClassroom)
                .filter(java.util.Objects::nonNull)
                .map(classroom -> classroom.getName())
                .findFirst()
                .orElse(null);
    }

    private FamilyRequestStatus parseStatus(String status) {
        if (status == null || status.isBlank() || "OPEN".equalsIgnoreCase(status)) {
            return null;
        }
        try {
            return FamilyRequestStatus.valueOf(status.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException exception) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "Statut de demande inconnu : " + status);
        }
    }

    private boolean matches(FamilyRequest request, String needle) {
        if (needle == null) {
            return true;
        }
        Student student = request.getStudent();
        return contains(request.getReference(), needle)
                || contains(request.getSubject(), needle)
                || contains(student.fullName(), needle)
                || contains(student.getStudentNumber(), needle)
                || contains(request.getClassroomName(), needle)
                || contains(request.getGuardianName(), needle)
                || contains(typeLabel(request.getType()), needle);
    }

    private Comparator<FamilyRequest> queueOrder(OffsetDateTime now) {
        return Comparator
                .comparing((FamilyRequest item) -> !item.isOverdue(now))
                .thenComparingInt(item -> priorityRank(item.getPriority()))
                .thenComparing(FamilyRequest::getSubmittedAt, Comparator.reverseOrder());
    }

    private FamilyRequestResponse toResponse(FamilyRequest request, OffsetDateTime now) {
        Student student = request.getStudent();
        return new FamilyRequestResponse(
                request.getId(), request.getReference(), request.getType(),
                typeLabel(request.getType()), request.getStatus(),
                statusLabel(request.getStatus()), request.getPriority(),
                priorityLabel(request.getPriority()), request.getChannel(),
                channelLabel(request.getChannel()), request.getSubject(),
                request.getDescription(), student.getId(), student.getStudentNumber(),
                student.fullName(), request.getClassroomName(), request.getGuardianName(),
                request.getGuardianPhone(), request.getAssignedTo(), request.getInternalNote(),
                request.getSubmittedAt(), request.getDueAt(), request.getCompletedAt(),
                request.isOverdue(now));
    }

    private long count(List<FamilyRequest> requests, FamilyRequestStatus status) {
        return requests.stream().filter(item -> item.getStatus() == status).count();
    }

    private int dueDays(FamilyRequestPriority priority) {
        return switch (priority) {
            case URGENT -> 1;
            case HIGH -> 2;
            case NORMAL -> 4;
        };
    }

    private int priorityRank(FamilyRequestPriority priority) {
        return switch (priority) {
            case URGENT -> 0;
            case HIGH -> 1;
            case NORMAL -> 2;
        };
    }

    private OffsetDateTime completedAt(FamilyRequest request) {
        return request.getCompletedAt() == null ? OffsetDateTime.now() : request.getCompletedAt();
    }

    private String typeLabel(FamilyRequestType type) {
        return switch (type) {
            case SCHOOL_CERTIFICATE -> "Certificat de scolarité";
            case ENROLLMENT_CERTIFICATE -> "Attestation d'inscription";
            case REPORT_CARD_COPY -> "Duplicata de bulletin";
            case TRANSCRIPT -> "Relevé de notes";
            case TRANSFER_DOCUMENTS -> "Dossier de transfert";
            case PAYMENT_STATEMENT -> "Situation de paiement";
            case DATA_CORRECTION -> "Correction d'informations";
            case APPOINTMENT -> "Demande de rendez-vous";
            case OTHER -> "Autre demande";
        };
    }

    private String statusLabel(FamilyRequestStatus status) {
        return switch (status) {
            case NEW -> "Nouvelle";
            case IN_PROGRESS -> "En traitement";
            case WAITING_FAMILY -> "Attente famille";
            case READY -> "Prête";
            case COMPLETED -> "Terminée";
            case REJECTED -> "Refusée";
        };
    }

    private String priorityLabel(FamilyRequestPriority priority) {
        return switch (priority) {
            case NORMAL -> "Normale";
            case HIGH -> "Haute";
            case URGENT -> "Urgente";
        };
    }

    private String channelLabel(FamilyRequestChannel channel) {
        return switch (channel) {
            case PORTAL -> "Portail parent";
            case EMAIL -> "E-mail";
            case PHONE -> "Téléphone";
            case IN_PERSON -> "Accueil";
        };
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }

    private String normalize(String value) {
        String cleaned = blankToNull(value);
        return cleaned == null ? null : cleaned.toLowerCase(Locale.ROOT);
    }

    private boolean contains(String value, String needle) {
        return value != null && value.toLowerCase(Locale.ROOT).contains(needle);
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
