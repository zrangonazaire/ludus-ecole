package ci.company.eduops.finance.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.MoneyUtils;
import ci.company.eduops.finance.domain.DiscountRequest;
import ci.company.eduops.finance.domain.DiscountRequestLevel;
import ci.company.eduops.finance.domain.DiscountRequestLevelStatus;
import ci.company.eduops.finance.domain.DiscountRequestStatus;
import ci.company.eduops.finance.domain.DiscountType;
import ci.company.eduops.finance.domain.StudentFee;
import ci.company.eduops.finance.dto.request.DiscountRequestCreateRequest;
import ci.company.eduops.finance.dto.request.DiscountRequestDecisionRequest;
import ci.company.eduops.finance.dto.response.DiscountRequestResponse;
import ci.company.eduops.finance.repository.DiscountRequestLevelRepository;
import ci.company.eduops.finance.repository.DiscountRequestRepository;
import ci.company.eduops.finance.repository.StudentFeeRepository;
import ci.company.eduops.security.entity.AppRole;
import ci.company.eduops.security.repository.AppRoleRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

/**
 * Les demandes de réduction de scolarité et leur circuit de validation.
 *
 * <p>Une demande est créée avec autant de paliers que l'école le souhaite
 * (1 à 5), chaque palier confié à un profil. Le palier courant seul est
 * ouvert : on ne peut trancher que le palier attendu, et seul un porteur
 * du profil de ce palier (ou un administrateur) peut le trancher. Après
 * le dernier palier approuvé la demande passe à APPROVED ; l'impact réel
 * sur les échéances de l'élève est appliqué par un appel explicite.</p>
 */
@Service
public class DiscountRequestService {

    private final DiscountRequestRepository requests;
    private final DiscountRequestLevelRepository levels;
    private final StudentRepository students;
    private final AcademicYearRepository years;
    private final StudentFeeRepository feeLines;
    private final AppRoleRepository roles;
    private final CurrentUser currentUser;
    private final AuditService auditService;

    public DiscountRequestService(DiscountRequestRepository requests,
                                  DiscountRequestLevelRepository levels,
                                  StudentRepository students,
                                  AcademicYearRepository years,
                                  StudentFeeRepository feeLines,
                                  AppRoleRepository roles,
                                  CurrentUser currentUser,
                                  AuditService auditService) {
        this.requests = requests;
        this.levels = levels;
        this.students = students;
        this.years = years;
        this.feeLines = feeLines;
        this.roles = roles;
        this.currentUser = currentUser;
        this.auditService = auditService;
    }

    // ------------------------------------------------------------------ lecture

    @Transactional(readOnly = true)
    public List<DiscountRequestResponse> list(String statusParam, UUID studentId) {
        UUID schoolId = requireSchool();
        List<DiscountRequest> rows = (statusParam == null || statusParam.isBlank())
                ? requests.findBySchoolIdOrderByCreatedAtDesc(schoolId)
                : requests.findBySchoolIdAndStatusOrderByCreatedAtDesc(
                        schoolId, DiscountRequestStatus.valueOf(statusParam.toUpperCase(Locale.ROOT)));
        List<DiscountRequestResponse> out = new ArrayList<>();
        for (DiscountRequest row : rows) {
            if (studentId != null && !studentId.equals(row.getStudentId())) {
                continue;
            }
            // La chaîne accompagne chaque ligne : l'écran sait ainsi quel palier
            // attend, et si c'est au lecteur de le trancher.
            out.add(toResponse(row, levels.findByRequestIdOrderByLevelNumberAsc(row.getId())));
        }
        return out;
    }

    @Transactional(readOnly = true)
    public DiscountRequestResponse get(UUID id) {
        UUID schoolId = requireSchool();
        DiscountRequest request = requests.findByIdAndSchoolId(id, schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.DISCOUNT_REQUEST_NOT_FOUND));
        return toResponse(request, levels.findByRequestIdOrderByLevelNumberAsc(id));
    }

    // ------------------------------------------------------------------ création

    @Transactional
    public DiscountRequestResponse create(DiscountRequestCreateRequest input) {
        UUID schoolId = requireSchool();
        UUID userId = currentUser.requireId();

        Student student = students.findById(input.getStudentId())
                .filter(s -> s.getSchool() != null && schoolId.equals(s.getSchool().getId()))
                .orElseThrow(() -> BusinessException.of(ErrorCode.STUDENT_NOT_FOUND));

        AcademicYear year = years.findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE,
                        "Aucune année scolaire active : impossible de demander une réduction."));

        validateValue(input.getDiscountType(), input.getValue());

        DiscountRequest request = new DiscountRequest();
        request.setSchoolId(schoolId);
        request.setStudentId(student.getId());
        request.setAcademicYearId(year.getId());
        request.setReference(nextReference(schoolId, year.getId()));
        request.setLabel(input.getLabel().trim());
        request.setReason(input.getReason());
        request.setDiscountType(input.getDiscountType());
        request.setValue(input.getValue());
        request.setComputedAmount(computeDiscount(schoolId, student.getId(),
                year.getId(), input.getDiscountType(), input.getValue()));
        request.setTotalLevels(input.getLevels().size());
        request.setCurrentLevel(1);
        request.setCreatedBy(userId);
        requests.save(request);

        int number = 1;
        for (DiscountRequestCreateRequest.LevelInput levelInput : input.getLevels()) {
            AppRole role = findRole(schoolId, levelInput.getRoleCode());
            DiscountRequestLevel level = new DiscountRequestLevel();
            level.setRequest(request);
            level.setSchoolId(schoolId);
            level.setLevelNumber(number++);
            level.setName(levelInput.getName().trim());
            level.setRoleCode(role.getCode());
            level.setRoleLabel(role.getLabel());
            levels.save(level);
        }
        auditService.logCreate("DiscountRequest", request.getId(), request.getReference(),
                Map.of("student", student.getFirstName() + " " + student.getLastName(),
                        "levels", request.getTotalLevels()));
        return get(request.getId());
    }

    // ------------------------------------------------------------------ décision

    /**
     * Tranche le palier en attente. La demande doit être soumise, seul le
     * palier courant est tranchable, et le décideur doit porter le profil
     * du palier — sauf les administrateurs, qui peuvent toujours.
     */
    @Transactional
    public DiscountRequestResponse decide(UUID requestId, DiscountRequestDecisionRequest input) {
        UUID schoolId = requireSchool();
        DiscountRequest request = requests.findByIdAndSchoolId(requestId, schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.DISCOUNT_REQUEST_NOT_FOUND));
        if (request.getStatus() != DiscountRequestStatus.SUBMITTED) {
            throw BusinessException.of(ErrorCode.DISCOUNT_REQUEST_ALREADY_DECIDED,
                    "Seule une demande soumise peut être validée.");
        }
        List<DiscountRequestLevel> chain =
                levels.findByRequestIdOrderByLevelNumberAsc(requestId);
        DiscountRequestLevel level = chain.stream()
                .filter(l -> l.getLevelNumber() == request.getCurrentLevel())
                .findFirst()
                .orElseThrow(() -> BusinessException.of(ErrorCode.DISCOUNT_REQUEST_NOT_FOUND));

        boolean administrator =
                currentUser.hasRole("SUPER_ADMIN") || currentUser.hasRole("SCHOOL_ADMIN");
        if (!administrator && !currentUser.hasRole(level.getRoleCode())
                && !currentUser.hasPermission("DISCOUNT_REQUEST_DECIDE_ALL")) {
            throw BusinessException.of(ErrorCode.ACCESS_DENIED,
                    "Ce palier est réservé au profil « " + level.getRoleLabel() + " ».");
        }

        boolean approved = input.getDecision()
                == DiscountRequestDecisionRequest.Decision.APPROVE;
        level.setStatus(approved
                ? DiscountRequestLevelStatus.APPROVED
                : DiscountRequestLevelStatus.REJECTED);
        level.setApproverId(currentUser.requireId());
        level.setApproverName(displayName());
        level.setComment(input.getComment());
        level.setDecidedAt(OffsetDateTime.now());

        if (!approved) {
            request.setStatus(DiscountRequestStatus.REJECTED);
            request.setCurrentLevel(level.getLevelNumber());
            request.setDecidedAt(OffsetDateTime.now());
            request.setDecidedBy(currentUser.requireId());
            request.setRejectionReason(input.getComment());
            auditService.logCancel("DiscountRequest", request.getId(), request.getReference(),
                    "Refus au niveau " + level.getName()
                            + (input.getComment() == null ? "" : " : " + input.getComment()));
        } else if (level.getLevelNumber() < request.getTotalLevels()) {
            request.setCurrentLevel(level.getLevelNumber() + 1);
            auditService.logValidate("DiscountRequest", request.getId(), request.getReference(),
                    "Approuvé au niveau " + level.getName() + " — en attente du suivant.");
        } else {
            request.setStatus(DiscountRequestStatus.APPROVED);
            request.setDecidedAt(OffsetDateTime.now());
            request.setDecidedBy(currentUser.requireId());
            auditService.logValidate("DiscountRequest", request.getId(), request.getReference(),
                    "Circuit complet — réduction approuvée.");
        }
        return get(requestId);
    }

    // ------------------------------------------------------------------ application

    /**
     * Applique la réduction approuvée sur les échéances de l'élève : chaque
     * ligne due reçoit sa part de la réduction, recalculée ligne par ligne.
     * Journalise l'impact réel. Un appel répété refuse poliment.
     */
    @Transactional
    public DiscountRequestResponse apply(UUID requestId) {
        UUID schoolId = requireSchool();
        DiscountRequest request = requests.findByIdAndSchoolId(requestId, schoolId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.DISCOUNT_REQUEST_NOT_FOUND));
        if (request.getStatus() != DiscountRequestStatus.APPROVED) {
            throw BusinessException.of(ErrorCode.DISCOUNT_REQUEST_NOT_APPROVED,
                    "La réduction doit être approuvée par tous les niveaux avant application.");
        }
        BigDecimal due = feeLines.outstandingForStudent(request.getStudentId(), request.getAcademicYearId());
        if (due.compareTo(BigDecimal.ZERO) <= 0) {
            throw BusinessException.of(ErrorCode.DISCOUNT_NO_OUTSTANDING,
                    "Aucun montant dû : la réduction n'a rien à réduire.");
        }
        BigDecimal remaining = MoneyUtils.normalize(request.getValue());
        BigDecimal total = BigDecimal.ZERO;
        List<StudentFee> lines = feeLines.findOutstandingOldestFirst(
                request.getStudentId(), request.getAcademicYearId());
        for (StudentFee fee : lines) {
            BigDecimal lineDiscount;
            if (request.getDiscountType() == DiscountType.FIXED_AMOUNT) {
                lineDiscount = remaining.min(fee.getAmountDue());
            } else {
                lineDiscount = MoneyUtils.normalize(
                        fee.getGrossAmount().multiply(request.getValue())
                                .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP));
            }
            if (lineDiscount.compareTo(BigDecimal.ZERO) <= 0) {
                continue;
            }
            if (request.getDiscountType() == DiscountType.FIXED_AMOUNT) {
                remaining = remaining.subtract(lineDiscount);
            }
            fee.setDiscountAmount(MoneyUtils.normalize(lineDiscount));
            fee.recomputeAmountDue();
            fee.refreshStatus();
            total = total.add(lineDiscount);
        }
        request.setStatus(DiscountRequestStatus.EFFECTIVE);
        request.setEffectiveAt(OffsetDateTime.now());
        auditService.logUpdate("DiscountRequest", request.getId(), request.getReference(),
                Map.of("status", "APPROVED"), Map.of("status", "EFFECTIVE", "appliedAmount", total));
        return get(requestId);
    }

    // ------------------------------------------------------------------ helpers

    private void validateValue(DiscountType type, BigDecimal value) {
        if (value == null || value.compareTo(BigDecimal.ZERO) <= 0) {
            throw BusinessException.of(ErrorCode.DISCOUNT_VALUE_INVALID,
                    "La valeur de la réduction doit être strictement positive.");
        }
        if (type == DiscountType.PERCENTAGE && value.compareTo(new BigDecimal("100")) > 0) {
            throw BusinessException.of(ErrorCode.DISCOUNT_VALUE_INVALID,
                    "Un pourcentage de réduction ne peut dépasser 100.");
        }
    }

    /** Montant estimé de la réduction sur le dû actuel, figé dans la demande. */
    private BigDecimal computeDiscount(UUID schoolId, UUID studentId, UUID yearId,
                                       DiscountType type, BigDecimal value) {
        BigDecimal due = feeLines.outstandingForStudent(studentId, yearId);
        if (due.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ZERO;
        }
        if (type == DiscountType.PERCENTAGE) {
            return due.multiply(value).divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP)
                    .min(due);
        }
        return value.min(due);
    }

    /** Référence lisible : RED-2026-0007, séquence par école et par année. */
    private String nextReference(UUID schoolId, UUID yearId) {
        long n = requests.countBySchoolIdAndAcademicYearId(schoolId, yearId) + 1;
        String year = String.valueOf(java.time.Year.now().getValue());
        return "RED-" + year + "-" + String.format("%04d", n);
    }

    private AppRole findRole(UUID schoolId, String code) {
        return roles.findVisibleByCode(code, schoolId).stream().findFirst()
                .orElseThrow(() -> BusinessException.of(ErrorCode.VALIDATION_ERROR,
                        "Profil inconnu : " + code));
    }

    private String displayName() {
        var details = currentUser.details();
        return details.map(d -> d.getFullName() == null
                        ? d.getUsername() : d.getFullName())
                .orElse("Système");
    }

    /**
     * Le lecteur peut-il trancher le palier en attente ? Sert à n'afficher
     * les boutons Valider / Refuser que là où ils ont un effet.
     */
    private boolean canDecide(DiscountRequest request, List<DiscountRequestLevel> chain) {
        if (request.getStatus() != DiscountRequestStatus.SUBMITTED) {
            return false;
        }
        if (currentUser.hasRole("SUPER_ADMIN") || currentUser.hasRole("SCHOOL_ADMIN")) {
            return true;
        }
        return chain.stream()
                .filter(l -> l.getLevelNumber() == request.getCurrentLevel())
                .findFirst()
                .map(l -> currentUser.hasRole(l.getRoleCode()))
                .orElse(false);
    }

    private UUID requireSchool() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }

    private DiscountRequestResponse toResponse(DiscountRequest request,
                                               List<DiscountRequestLevel> chain) {
        DiscountRequestResponse out = new DiscountRequestResponse();
        out.setId(request.getId());
        out.setReference(request.getReference());
        out.setStudentId(request.getStudentId());
        students.findById(request.getStudentId()).ifPresent(s -> {
            out.setStudentName(s.getFirstName() + " " + s.getLastName());
            out.setStudentNumber(s.getStudentNumber());
        });
        out.setLabel(request.getLabel());
        out.setReason(request.getReason());
        out.setDiscountType(request.getDiscountType());
        out.setValue(request.getValue());
        out.setComputedAmount(request.getComputedAmount());
        out.setStatus(request.getStatus());
        out.setCurrentLevel(request.getCurrentLevel());
        out.setTotalLevels(request.getTotalLevels());
        out.setRejectionReason(request.getRejectionReason());
        out.setEffectiveAt(request.getEffectiveAt());
        out.setCreatedAt(request.getCreatedAt());
        out.setAwaitingMyDecision(canDecide(request, chain));
        for (DiscountRequestLevel level : chain) {
            DiscountRequestResponse.LevelResponse lr = new DiscountRequestResponse.LevelResponse();
            lr.setLevelNumber(level.getLevelNumber());
            lr.setName(level.getName());
            lr.setRoleCode(level.getRoleCode());
            lr.setRoleLabel(level.getRoleLabel());
            lr.setStatus(level.getStatus());
            lr.setApproverName(level.getApproverName());
            lr.setComment(level.getComment());
            lr.setDecidedAt(level.getDecidedAt());
            out.getLevels().add(lr);
        }
        return out;
    }
}
