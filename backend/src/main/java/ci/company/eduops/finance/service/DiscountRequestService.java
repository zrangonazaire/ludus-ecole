package ci.company.eduops.finance.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.MoneyUtils;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.approval.domain.ApprovalExecution;
import ci.company.eduops.finance.domain.DiscountRequest;
import ci.company.eduops.finance.domain.DiscountRequestLevel;
import ci.company.eduops.finance.domain.DiscountRequestLevelStatus;
import ci.company.eduops.finance.domain.DiscountRequestStatus;
import ci.company.eduops.finance.domain.DiscountType;
import ci.company.eduops.finance.domain.StudentFee;
import ci.company.eduops.finance.dto.request.DiscountRequestCreateRequest;
import ci.company.eduops.finance.dto.request.DiscountRequestCancelRequest;
import ci.company.eduops.finance.dto.request.DiscountRequestDecisionRequest;
import ci.company.eduops.finance.dto.response.DiscountRequestResponse;
import ci.company.eduops.finance.repository.DiscountRequestLevelRepository;
import ci.company.eduops.finance.repository.DiscountRequestRepository;
import ci.company.eduops.finance.repository.StudentFeeRepository;
import ci.company.eduops.notification.service.MailService;
import ci.company.eduops.security.entity.AppUser;
import ci.company.eduops.security.entity.UserStatus;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.security.repository.AppRoleRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

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

    private static final Logger log = LoggerFactory.getLogger(DiscountRequestService.class);

    private final DiscountRequestRepository requests;
    private final DiscountRequestLevelRepository levels;
    private final StudentRepository students;
    private final AcademicYearRepository years;
    private final StudentFeeRepository feeLines;
    private final CurrentUser currentUser;
    private final AuditService auditService;
    private final ci.company.eduops.approval.service.ApprovalExecutionService approvals;
    private final com.fasterxml.jackson.databind.ObjectMapper mapper;
    private final ci.company.eduops.finance.repository.FeeTypeRepository feeTypes;
    private final AppUserRepository users;
    private final MailService mailService;
    private final EduOpsProperties properties;

    public DiscountRequestService(DiscountRequestRepository requests,
                                  DiscountRequestLevelRepository levels,
                                  StudentRepository students,
                                  AcademicYearRepository years,
                                  StudentFeeRepository feeLines,
                                  CurrentUser currentUser,
                                  AuditService auditService,
                                  ci.company.eduops.approval.service.ApprovalExecutionService approvals,
                                  com.fasterxml.jackson.databind.ObjectMapper mapper,
                                  ci.company.eduops.finance.repository.FeeTypeRepository feeTypes,
                                  AppUserRepository users,
                                  MailService mailService,
                                  EduOpsProperties properties) {
        this.requests = requests;
        this.levels = levels;
        this.students = students;
        this.years = years;
        this.feeLines = feeLines;
        this.currentUser = currentUser;
        this.auditService = auditService;
        this.approvals = approvals; this.mapper = mapper; this.feeTypes = feeTypes;
        this.users = users;
        this.mailService = mailService;
        this.properties = properties;
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
        if (input.getFeeTypeId() != null) feeTypes.findById(input.getFeeTypeId())
                .filter(t -> t.getSchool().getId().equals(schoolId))
                .orElseThrow(() -> BusinessException.of(ErrorCode.FEE_TYPE_NOT_FOUND));

        DiscountRequest request = new DiscountRequest();
        request.setSchoolId(schoolId);
        request.setStudentId(student.getId());
        request.setAcademicYearId(year.getId());
        request.setReference(nextReference(schoolId, year.getId()));
        request.setLabel(input.getLabel().trim());
        request.setReason(input.getReason());
        request.setDiscountType(input.getDiscountType());
        request.setValue(input.getValue());
        request.setFeeTypeId(input.getFeeTypeId());
        BigDecimal due = eligibleLines(request).stream().map(StudentFee::outstanding)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        if (due.signum() <= 0) throw BusinessException.of(ErrorCode.DISCOUNT_NO_OUTSTANDING);
        request.setComputedAmount(input.getDiscountType() == DiscountType.PERCENTAGE
                ? MoneyUtils.normalize(due.multiply(input.getValue()).divide(new BigDecimal("100")))
                : MoneyUtils.normalize(input.getValue().min(due)));
        if (request.getComputedAmount().signum() <= 0) throw BusinessException.of(ErrorCode.DISCOUNT_VALUE_INVALID);
        request.setTotalLevels(1);
        request.setCurrentLevel(1);
        request.setCreatedBy(userId);
        requests.save(request);

        var execution = approvals.submit(input.getCircuitId(), "DISCOUNT", "DISCOUNT",
                request.getId(), request.getLabel(), mapper.valueToTree(input));
        request.setTotalLevels(execution.getStages().size());
        auditService.logCreate("DiscountRequest", request.getId(), request.getReference(),
                Map.of("student", student.getFirstName() + " " + student.getLastName(),
                        "levels", request.getTotalLevels()));
        scheduleMail(() -> {
            notifyApprovers(execution, 1, request,
                    "Une demande de réduction attend votre décision.", "Ouvrir la demande");
            notifyCreator(request, "Votre demande a été transmise",
                    "Votre demande est enregistrée. Le premier niveau du circuit a été averti par e-mail.");
        });
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
        DiscountRequest request = requests.lockByIdAndSchoolId(requestId, requireSchool())
                .orElseThrow(() -> BusinessException.of(ErrorCode.DISCOUNT_REQUEST_NOT_FOUND));
        if (request.getStatus() != DiscountRequestStatus.SUBMITTED)
            throw BusinessException.of(ErrorCode.DISCOUNT_REQUEST_ALREADY_DECIDED);
        int previousLevel = request.getCurrentLevel();
        var execution = approvals.decide(requestId,
                input.getDecision() == DiscountRequestDecisionRequest.Decision.APPROVE, input.getComment());
        request.setCurrentLevel(execution.getCurrentLevel());
        if ("REJECTED".equals(execution.getStatus())) {
            request.setStatus(DiscountRequestStatus.REJECTED);
            request.setRejectionReason(input.getComment());
        } else if ("APPROVED".equals(execution.getStatus())) {
            request.setStatus(DiscountRequestStatus.APPROVED);
        }
        if (request.getStatus() != DiscountRequestStatus.SUBMITTED) {
            request.setDecidedAt(OffsetDateTime.now());
            request.setDecidedBy(currentUser.requireId());
        }
        if ("REJECTED".equals(execution.getStatus())) {
            scheduleMail(() -> notifyCreator(request, "Votre demande a été refusée",
                    "La demande a été refusée au niveau « " + stageName(execution, previousLevel)
                            + " ». Motif : " + nullSafe(input.getComment())));
        } else if (request.getStatus() == DiscountRequestStatus.APPROVED) {
            scheduleMail(() -> notifyCreator(request, "Votre réduction est approuvée",
                    "Toutes les validations sont terminées. La réduction est prête à être rendue effective depuis son suivi."));
        } else if (execution.getCurrentLevel() > previousLevel) {
            scheduleMail(() -> {
                notifyCreator(request, "Une étape de votre demande est validée",
                        "Le niveau « " + stageName(execution, previousLevel)
                                + " » a validé la demande. Elle passe maintenant au niveau « "
                                + stageName(execution, execution.getCurrentLevel()) + " ».");
                notifyApprovers(execution, execution.getCurrentLevel(), request,
                        "Une demande de réduction vient d’arriver à votre niveau.", "Examiner la demande");
            });
        }
        return get(requestId);
    }

    /** Withdraws a pending request; only its creator can do so. */
    @Transactional
    public DiscountRequestResponse cancel(UUID requestId, DiscountRequestCancelRequest input) {
        DiscountRequest request = requests.lockByIdAndSchoolId(requestId, requireSchool())
                .orElseThrow(() -> BusinessException.of(ErrorCode.DISCOUNT_REQUEST_NOT_FOUND));
        if (request.getStatus() != DiscountRequestStatus.SUBMITTED) {
            throw BusinessException.of(ErrorCode.DISCOUNT_REQUEST_ALREADY_DECIDED);
        }
        UUID actorId = currentUser.requireId();
        if (!actorId.equals(request.getCreatedBy())) {
            throw BusinessException.of(ErrorCode.ACCESS_DENIED,
                    "Seule la personne qui a créé cette demande peut l’annuler.");
        }
        ApprovalExecution execution = approvals.cancel(requestId);
        String reason = input.getReason() == null ? null : input.getReason().trim();
        request.setStatus(DiscountRequestStatus.CANCELLED);
        request.setCancellationReason(reason == null || reason.isBlank() ? null : reason);
        request.setDecidedAt(OffsetDateTime.now());
        request.setDecidedBy(actorId);
        auditService.logCancel("DiscountRequest", request.getId(), request.getReference(),
                request.getCancellationReason());
        scheduleMail(() -> {
            String message = "La demande a été retirée par son créateur. Aucune action n’est requise.";
            if (request.getCancellationReason() != null) {
                message += " Motif : " + request.getCancellationReason();
            }
            notifyApprovers(execution, execution.getCurrentLevel(), request,
                    message, "Voir le suivi");
            notifyCreator(request, "Votre demande a été annulée",
                    "Votre demande a été retirée du circuit de validation.");
        });
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
        DiscountRequest request = requests.lockByIdAndSchoolId(requestId, requireSchool())
                .orElseThrow(() -> BusinessException.of(ErrorCode.DISCOUNT_REQUEST_NOT_FOUND));
        if (request.getStatus() != DiscountRequestStatus.APPROVED)
            throw BusinessException.of(ErrorCode.DISCOUNT_REQUEST_NOT_APPROVED,
                    "La réduction doit être approuvée et ne peut être appliquée qu'une seule fois.");
        var execution = approvals.lock(requestId);
        if (!"APPROVED".equals(execution.getStatus()))
            throw BusinessException.of(ErrorCode.DISCOUNT_REQUEST_NOT_APPROVED);
        var ids = eligibleLines(request).stream().map(StudentFee::getId).sorted().toList();
        List<StudentFee> lines = ids.isEmpty() ? List.of() : feeLines.lockAllByIds(ids);
        lines = lines.stream().filter(f -> f.getStatus() != ci.company.eduops.finance.domain.StudentFeeStatus.CANCELLED
                && f.getStatus() != ci.company.eduops.finance.domain.StudentFeeStatus.WAIVED)
                .sorted(java.util.Comparator.comparing(StudentFee::getDueDate).thenComparing(StudentFee::getId)).toList();
        BigDecimal remaining = request.getComputedAmount();
        BigDecimal total = BigDecimal.ZERO;
        for (StudentFee fee : lines) {
            BigDecimal outstanding = fee.outstanding().max(BigDecimal.ZERO);
            BigDecimal lineDiscount = request.getDiscountType() == DiscountType.PERCENTAGE
                    ? MoneyUtils.normalize(outstanding.multiply(request.getValue()).divide(new BigDecimal("100")))
                    : remaining;
            lineDiscount = lineDiscount.min(outstanding).min(remaining);
            if (lineDiscount.signum() <= 0) continue;
            remaining = remaining.subtract(lineDiscount);
            fee.setDiscountAmount(MoneyUtils.add(fee.getDiscountAmount(), lineDiscount));
            fee.recomputeAmountDue();
            fee.refreshStatus();
            total = total.add(lineDiscount);
        }
        // No outstanding balance can remain after a payment during approval.
        // Record the actual effect (possibly zero), without creating a credit.
        request.setComputedAmount(total);
        request.setStatus(DiscountRequestStatus.EFFECTIVE);
        request.setEffectiveAt(OffsetDateTime.now());
        approvals.effective(execution);
        auditService.logUpdate("DiscountRequest", request.getId(), request.getReference(),
                Map.of("status", "APPROVED"), Map.of("status", "EFFECTIVE", "appliedAmount", total));
        return get(requestId);
    }

    private List<StudentFee> eligibleLines(DiscountRequest request) {
        return feeLines.findOutstandingOldestFirst(request.getStudentId(), request.getAcademicYearId()).stream()
                .filter(f -> request.getFeeTypeId() == null || request.getFeeTypeId().equals(f.getFeeType().getId()))
                .toList();
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

    /** Référence lisible : RED-2026-0007, séquence par école et par année. */
    private String nextReference(UUID schoolId, UUID yearId) {
        String year = String.valueOf(java.time.Year.now().getValue());
        return "RED-" + year + "-" + UUID.randomUUID().toString().substring(0, 12).toUpperCase(Locale.ROOT);
    }

    /**
     * Le lecteur peut-il trancher le palier en attente ? Sert à n'afficher
     * les boutons Valider / Refuser que là où ils ont un effet.
     */
    private boolean canDecide(DiscountRequest request, List<DiscountRequestLevel> chain) {
        return approvals.find(request.getId()).map(approvals::canDecide).orElse(false);
    }

    private void scheduleMail(Runnable action) {
        if (!TransactionSynchronizationManager.isSynchronizationActive()) {
            action.run();
            return;
        }
        TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
            @Override
            public void afterCommit() {
                try {
                    action.run();
                } catch (RuntimeException exception) {
                    log.error("Impossible d'envoyer les notifications e-mail d'une demande de remise", exception);
                }
            }
        });
    }

    private void notifyApprovers(ApprovalExecution execution, int levelNumber,
                                 DiscountRequest request, String message, String actionLabel) {
        if (levelNumber < 1 || levelNumber > execution.getStages().size()) return;
        List<UUID> recipientIds = execution.getStages().get(levelNumber - 1).getMembers().stream()
                .map(ApprovalExecution.Vote::getUserId).distinct().toList();
        var recipientSet = new java.util.HashSet<>(recipientIds);
        Map<UUID, AppUser> recipients = users.findBySchoolIdOrderByLastNameAscFirstNameAsc(
                        request.getSchoolId()).stream()
                .filter(user -> recipientSet.contains(user.getId()))
                .filter(user -> user.getStatus() == UserStatus.ACTIVE)
                .filter(user -> user.getEmail() != null && !user.getEmail().isBlank())
                .collect(Collectors.toMap(AppUser::getId, user -> user));
        for (UUID id : recipientIds) {
            AppUser recipient = recipients.get(id);
            if (recipient != null) {
                sendMail(recipient.getEmail(), "Action requise — remise " + request.getReference(),
                        recipient.getFirstName(), request, message, actionLabel);
            }
        }
    }

    private void notifyCreator(DiscountRequest request, String subject, String message) {
        if (request.getCreatedBy() == null) return;
        users.findById(request.getCreatedBy())
                .filter(user -> request.getSchoolId().equals(user.getSchoolId()))
                .filter(user -> user.getEmail() != null && !user.getEmail().isBlank())
                .ifPresent(user -> sendMail(user.getEmail(), subject + " — " + request.getReference(),
                        user.getFirstName(), request, message, "Voir le suivi"));
    }

    private void sendMail(String recipient, String subject, String firstName,
                          DiscountRequest request, String message, String actionLabel) {
        String baseUrl = properties.getApp().getBaseUrl();
        String url = (baseUrl == null ? "http://localhost:4200" : baseUrl.replaceAll("/+$", ""))
                + "/discounts";
        String safeName = escapeHtml(firstName);
        String safeReference = escapeHtml(request.getReference());
        String safeLabel = escapeHtml(request.getLabel());
        String safeMessage = escapeHtml(message).replace("\n", "<br>");
        String html = "<div style=\"font-family:Arial,sans-serif;color:#172033;max-width:600px;margin:auto\">"
                + "<div style=\"background:#2155cd;padding:22px 28px;color:#fff;border-radius:12px 12px 0 0\">"
                + "<strong>Soocloo · Demandes de remise</strong></div>"
                + "<div style=\"padding:28px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 12px 12px\">"
                + "<p>Bonjour " + safeName + ",</p><h2 style=\"font-size:20px\">"
                + escapeHtml(subject) + "</h2><p>" + safeMessage + "</p>"
                + "<p><strong>" + safeLabel + "</strong><br>Référence : " + safeReference + "</p>"
                + "<p><a href=\"" + escapeHtml(url) + "\" style=\"display:inline-block;background:#2155cd;"
                + "color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px\">"
                + escapeHtml(actionLabel) + "</a></p><p style=\"color:#64748b;font-size:13px\">"
                + "Connectez-vous pour consulter le détail et l’historique du circuit.</p></div></div>";
        String text = "Bonjour " + firstName + ",\n\n" + message + "\n\n" + request.getLabel()
                + " — " + request.getReference() + "\n" + url;
        mailService.sendHtml(recipient, subject, html, text);
    }

    private String stageName(ApprovalExecution execution, int levelNumber) {
        return levelNumber >= 1 && levelNumber <= execution.getStages().size()
                ? execution.getStages().get(levelNumber - 1).getCode() : "circuit";
    }

    private String nullSafe(String value) {
        return value == null || value.isBlank() ? "Aucun motif communiqué." : value;
    }

    private String escapeHtml(String value) {
        if (value == null) return "";
        return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
                .replace("\"", "&quot;").replace("'", "&#39;");
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
        out.setFeeTypeId(request.getFeeTypeId());
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
        out.setCancellationReason(request.getCancellationReason());
        out.setCreatedBy(request.getCreatedBy());
        out.setCanCancel(request.getStatus() == DiscountRequestStatus.SUBMITTED
                && currentUser.id().filter(id -> id.equals(request.getCreatedBy())).isPresent());
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
        approvals.find(request.getId()).ifPresent(execution -> {
            out.setCircuitName(execution.getCircuitName());
            out.getLevels().clear();
            for (int i = 0; i < execution.getStages().size(); i++) {
                var stage = execution.getStages().get(i);
                var lr = new DiscountRequestResponse.LevelResponse();
                lr.setLevelNumber(i + 1); lr.setName(stage.getCode());
                lr.setRoleCode(""); lr.setRoleLabel(stage.getMode() == ci.company.eduops.approval.domain.ApprovalMode.ALL ? "Tous les membres" : "Un seul membre");
                lr.setMode(stage.getMode()); lr.setMembers(stage.getMembers());
                lr.setStatus(DiscountRequestLevelStatus.valueOf(stage.getStatus()));
                out.getLevels().add(lr);
            }
        });
        return out;
    }
}
