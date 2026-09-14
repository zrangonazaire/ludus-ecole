package ci.company.eduops.payment.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.cashier.domain.CashSession;
import ci.company.eduops.cashier.repository.CashSessionRepository;
import ci.company.eduops.common.event.DomainEventPublisher;
import ci.company.eduops.common.event.DomainEventType;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.util.AmountInWords;
import ci.company.eduops.common.util.MoneyUtils;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.common.util.VerificationCodeGenerator;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.finance.domain.StudentFee;
import ci.company.eduops.finance.repository.StudentFeeRepository;
import ci.company.eduops.guardian.repository.GuardianRepository;
import ci.company.eduops.payment.domain.Payment;
import ci.company.eduops.payment.domain.PaymentAllocation;
import ci.company.eduops.payment.domain.PaymentStatus;
import ci.company.eduops.payment.domain.Receipt;
import ci.company.eduops.payment.dto.request.PaymentAllocationRequest;
import ci.company.eduops.payment.dto.request.PaymentCreateRequest;
import ci.company.eduops.payment.dto.response.PaymentAllocationResponse;
import ci.company.eduops.payment.dto.response.PaymentResponse;
import ci.company.eduops.payment.repository.PaymentAllocationRepository;
import ci.company.eduops.payment.repository.PaymentRepository;
import ci.company.eduops.payment.repository.ReceiptRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Records payments.
 *
 * <p>Implements the atomic sequence of section 70:</p>
 * <ol>
 *   <li>identify the student</li>
 *   <li>check the enrollment</li>
 *   <li>identify the fees</li>
 *   <li>check the amount</li>
 *   <li>check the idempotency key</li>
 *   <li>create the payment</li>
 *   <li>allocate it across the instalments</li>
 *   <li>refresh the derived balances</li>
 *   <li>generate the receipt number</li>
 *   <li>write the audit entry</li>
 *   <li>publish PaymentReceivedEvent</li>
 * </ol>
 *
 * <p>Everything happens in one transaction: a failure at any step leaves no
 * partial payment behind.</p>
 */
@Service
public class PaymentService {

    private static final Logger log = LoggerFactory.getLogger(PaymentService.class);
    private static final String SCOPE_RECEIPT = "RECEIPT";
    private static final String SCOPE_PAYMENT = "PAYMENT";

    private final PaymentRepository paymentRepository;
    private final PaymentAllocationRepository allocationRepository;
    private final ReceiptRepository receiptRepository;
    private final StudentFeeRepository studentFeeRepository;
    private final StudentRepository studentRepository;
    private final GuardianRepository guardianRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AcademicYearRepository academicYearRepository;
    private final CashSessionRepository cashSessionRepository;
    private final NumberSequenceService numberSequenceService;
    private final VerificationCodeGenerator verificationCodeGenerator;
    private final DomainEventPublisher eventPublisher;
    private final AuditService auditService;
    private final CurrentUser currentUser;
    private final EduOpsProperties properties;

    public PaymentService(PaymentRepository paymentRepository,
                          PaymentAllocationRepository allocationRepository,
                          ReceiptRepository receiptRepository,
                          StudentFeeRepository studentFeeRepository,
                          StudentRepository studentRepository,
                          GuardianRepository guardianRepository,
                          EnrollmentRepository enrollmentRepository,
                          AcademicYearRepository academicYearRepository,
                          CashSessionRepository cashSessionRepository,
                          NumberSequenceService numberSequenceService,
                          VerificationCodeGenerator verificationCodeGenerator,
                          DomainEventPublisher eventPublisher,
                          AuditService auditService,
                          CurrentUser currentUser,
                          EduOpsProperties properties) {
        this.paymentRepository = paymentRepository;
        this.allocationRepository = allocationRepository;
        this.receiptRepository = receiptRepository;
        this.studentFeeRepository = studentFeeRepository;
        this.studentRepository = studentRepository;
        this.guardianRepository = guardianRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.academicYearRepository = academicYearRepository;
        this.cashSessionRepository = cashSessionRepository;
        this.numberSequenceService = numberSequenceService;
        this.verificationCodeGenerator = verificationCodeGenerator;
        this.eventPublisher = eventPublisher;
        this.auditService = auditService;
        this.currentUser = currentUser;
        this.properties = properties;
    }

    /**
     * Records and validates a payment.
     *
     * @return the created payment, or the previously created one when the same
     *         {@code operationId} is replayed
     */
    @Transactional
    public PaymentResponse recordPayment(PaymentCreateRequest request) {
        // 1 - identify the student
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> BusinessException.of(ErrorCode.STUDENT_NOT_FOUND));
        UUID schoolId = student.getSchool().getId();

        // 5 - idempotency check comes early: a replay must do nothing at all
        var existing = paymentRepository.findBySchoolIdAndOperationId(schoolId, request.getOperationId());
        if (existing.isPresent()) {
            log.info("Payment operation {} replayed, returning payment {}",
                    request.getOperationId(), existing.get().getPaymentReference());
            return toResponse(existing.get());
        }

        // 2 - resolve the academic year and check the enrollment
        AcademicYear academicYear = resolveAcademicYear(request, schoolId);
        var enrollment = enrollmentRepository
                .findActiveEnrollment(student.getId(), academicYear.getId())
                .orElse(null);

        // 4 - check the amount
        BigDecimal amount = MoneyUtils.normalize(request.getAmount());
        if (!MoneyUtils.isPositive(amount)) {
            throw BusinessException.of(ErrorCode.PAYMENT_AMOUNT_INVALID)
                    .detail("amount", amount);
        }

        // Use the same lock order as cancellation: till first, then fee lines.
        CashSession cashSession = resolveCashSession(request);

        // 3 - identify the fee lines to settle, locking them against concurrency
        List<StudentFee> targetFees = resolveTargetFees(request, student, academicYear);

        BigDecimal totalOutstanding = targetFees.stream()
                .map(StudentFee::outstanding)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        if (MoneyUtils.isGreaterThan(amount, totalOutstanding) && !request.getAllocations().isEmpty()) {
            throw BusinessException.of(ErrorCode.PAYMENT_EXCEEDS_OUTSTANDING)
                    .detail("amount", amount)
                    .detail("outstanding", totalOutstanding);
        }

        // 6 - create the payment
        Payment payment = new Payment();
        payment.setSchool(student.getSchool());
        payment.setStudent(student);
        payment.setEnrollment(enrollment);
        payment.setAcademicYear(academicYear);
        if (request.getGuardianId() != null) {
            guardianRepository.findById(request.getGuardianId()).ifPresent(payment::setGuardian);
        }
        payment.setCashSession(cashSession);
        payment.setPaymentReference(nextPaymentReference(schoolId, student));
        payment.setAmount(amount);
        payment.setCurrency(student.getSchool().getCurrency());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentDate(request.getPaymentDate() == null
                ? LocalDate.now() : request.getPaymentDate());
        payment.setExternalReference(request.getExternalReference());
        payment.setPayerName(request.getPayerName());
        payment.setOperationId(request.getOperationId());
        payment.setNotes(request.getNotes());
        currentUser.id().ifPresent(payment::setCreatedByUser);
        payment = paymentRepository.save(payment);

        // 7 + 8 - allocate and refresh the derived balances
        List<PaymentAllocation> allocations =
                allocate(payment, targetFees, request.getAllocations(), amount);

        // validate the payment now that the allocation succeeded
        payment.validate(currentUser.id().orElse(null));
        paymentRepository.save(payment);

        // 9 - receipt
        Receipt receipt = createReceipt(payment, student);

        // 10 - audit
        auditService.record(ci.company.eduops.audit.domain.AuditAction.CREATE,
                        "Payment", payment.getId())
                .label(payment.getPaymentReference())
                .school(schoolId)
                .academicYear(academicYear.getId())
                .newValue(java.util.Map.<String, Object>of(
                        "amount", amount.toPlainString(),
                        "method", payment.getPaymentMethod().name(),
                        "student", student.getStudentNumber(),
                        "receipt", receipt.getReceiptNumber()))
                .save();

        // 11 - domain event
        BigDecimal outstandingAfter = studentFeeRepository
                .outstandingForStudent(student.getId(), academicYear.getId());
        eventPublisher.event(DomainEventType.PAYMENT_RECEIVED, "Payment", payment.getId())
                .school(schoolId)
                .academicYear(academicYear.getId())
                .student(student.getId())
                .with("paymentReference", payment.getPaymentReference())
                .with("receiptNumber", receipt.getReceiptNumber())
                .with("amount", amount.toPlainString())
                .with("currency", payment.getCurrency())
                .with("studentName", student.fullName())
                .with("studentNumber", student.getStudentNumber())
                .with("outstandingAfter", outstandingAfter.toPlainString())
                .publish();

        log.info("Payment {} of {} {} recorded for {} ({} allocations)",
                payment.getPaymentReference(), amount, payment.getCurrency(),
                student.getStudentNumber(), allocations.size());

        PaymentResponse response = toResponse(payment);
        response.setOutstandingAfterPayment(outstandingAfter);
        return response;
    }

    /**
     * Cancels a validated payment.
     *
     * <p>Rule 7: nothing is deleted. The allocations are reversed, the balances
     * are recomputed and the receipt is marked cancelled.</p>
     */
    @Transactional
    public PaymentResponse cancelPayment(UUID paymentId, String reason) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.PAYMENT_NOT_FOUND));

        if (payment.getStatus() == PaymentStatus.CANCELLED) {
            throw BusinessException.of(ErrorCode.PAYMENT_ALREADY_CANCELLED);
        }

        if (payment.getCashSession() != null) {
            CashSession session = cashSessionRepository.lockById(payment.getCashSession().getId())
                    .orElseThrow(() -> BusinessException.of(ErrorCode.CASH_SESSION_NOT_FOUND));
            if (!session.isOpen()) throw BusinessException.of(ErrorCode.CASH_SESSION_CLOSED);
        }

        List<PaymentAllocation> allocations =
                allocationRepository.findByPaymentIdAndReversedFalse(paymentId);
        for (PaymentAllocation allocation : allocations) {
            StudentFee fee = studentFeeRepository.lockById(allocation.getStudentFee().getId())
                    .orElseThrow(() -> BusinessException.of(ErrorCode.STUDENT_FEE_NOT_FOUND));
            fee.deallocate(allocation.getAmount());
            studentFeeRepository.save(fee);
            allocation.reverse();
            allocationRepository.save(allocation);
        }

        payment.cancel(currentUser.id().orElse(null), reason);
        payment.setAllocatedAmount(MoneyUtils.ZERO);
        paymentRepository.save(payment);

        receiptRepository.findByPaymentId(paymentId).ifPresent(receipt -> {
            receipt.cancel();
            receiptRepository.save(receipt);
        });

        auditService.logCancel("Payment", paymentId, payment.getPaymentReference(), reason);

        eventPublisher.event(DomainEventType.PAYMENT_CANCELLED, "Payment", paymentId)
                .school(payment.getSchool().getId())
                .academicYear(payment.getAcademicYear().getId())
                .student(payment.getStudent().getId())
                .with("paymentReference", payment.getPaymentReference())
                .with("amount", payment.getAmount().toPlainString())
                .with("reason", reason)
                .publish();

        log.warn("Payment {} cancelled by {}: {}",
                payment.getPaymentReference(), currentUser.username(), reason);
        return toResponse(payment);
    }

    /** Reads one payment with its allocations and receipt. */
    @Transactional(readOnly = true)
    public PaymentResponse findById(UUID paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.PAYMENT_NOT_FOUND));
        return toResponse(payment);
    }

    /** Paginated payment search for the finance screens. */
    @Transactional(readOnly = true)
    public ci.company.eduops.common.dto.PageResponse<PaymentResponse> search(
            UUID academicYearId,
            PaymentStatus status,
            LocalDate from,
            LocalDate to,
            String search,
            org.springframework.data.domain.Pageable pageable) {
        UUID yearId = academicYearId != null ? academicYearId : activeAcademicYearId();
        return ci.company.eduops.common.dto.PageResponse.from(
                // La chaine vide, jamais null : `lower(concat('%', :search, '%'))`
                // avec un parametre nul ne donne a PostgreSQL aucun type pour
                // choisir la surcharge de lower(). Il lit bytea et refuse la
                // requete entiere — « function lower(bytea) does not exist » —
                // alors meme que le garde `:search = ''` l'aurait court-circuitee.
                // La resolution des fonctions se fait a l'analyse, avant toute
                // evaluation : un OR ne protege rien.
                paymentRepository.search(yearId, status == null ? "" : status.name(), from, to,
                        (search == null || search.isBlank()) ? "" : search.trim(), pageable),
                this::toResponse);
    }

    private UUID activeAcademicYearId() {
        // Comme pour les inscriptions : l'annee active de CET etablissement,
        // jamais la premiere annee ACTIVE trouvee dans toute la base.
        UUID schoolId = ci.company.eduops.common.tenant.TenantContext.getSchoolId();
        if (schoolId == null) {
            throw BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return academicYearRepository
                .findBySchoolIdAndStatus(schoolId,
                        ci.company.eduops.academicyear.domain.AcademicYearStatus.ACTIVE)
                .map(AcademicYear::getId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE));
    }

    // ------------------------------------------------------------------
    // internals
    // ------------------------------------------------------------------

    private AcademicYear resolveAcademicYear(PaymentCreateRequest request, UUID schoolId) {
        if (request.getAcademicYearId() != null) {
            return academicYearRepository.findById(request.getAcademicYearId())
                    .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
        }
        return academicYearRepository
                .findBySchoolIdAndStatus(schoolId,
                        ci.company.eduops.academicyear.domain.AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE));
    }

    private CashSession resolveCashSession(PaymentCreateRequest request) {
        if (request.getCashSessionId() != null) {
            CashSession session = cashSessionRepository.lockById(request.getCashSessionId())
                    .orElseThrow(() -> BusinessException.of(ErrorCode.CASH_SESSION_NOT_FOUND));
            if (!session.getCashierUserId().equals(currentUser.requireId())
                    || !session.getSchool().getId().equals(ci.company.eduops.common.tenant.TenantContext.getSchoolId())) {
                throw BusinessException.of(ErrorCode.CASH_SESSION_NOT_FOUND);
            }
            if (!session.isOpen()) {
                throw BusinessException.of(ErrorCode.CASH_SESSION_CLOSED);
            }
            return session;
        }
        if (request.getPaymentMethod() != null && request.getPaymentMethod().requiresCashSession()) {
            // Lock the till until the payment commits, so closing cannot miss this payment.
            return currentUser.id()
                    .flatMap(cashSessionRepository::findOpenForCashier)
                    .orElseThrow(() -> BusinessException.of(ErrorCode.CASH_SESSION_NOT_FOUND,
                            "Ouvrez votre caisse avant d’enregistrer un paiement en espèces."));
        }
        return null;
    }

    /**
     * Determines which instalments the money settles. When the caller did not
     * specify anything, the oldest outstanding lines are settled first.
     * The rows are locked so a concurrent cashier cannot over-allocate.
     */
    private List<StudentFee> resolveTargetFees(PaymentCreateRequest request,
                                               Student student,
                                               AcademicYear academicYear) {
        if (!request.getAllocations().isEmpty()) {
            List<UUID> ids = request.getAllocations().stream()
                    .map(PaymentAllocationRequest::getStudentFeeId)
                    .toList();
            List<StudentFee> fees = studentFeeRepository.lockAllByIds(ids);
            if (fees.size() != ids.size()) {
                throw BusinessException.of(ErrorCode.STUDENT_FEE_NOT_FOUND);
            }
            return fees;
        }
        return studentFeeRepository
                .findOutstandingOldestFirst(student.getId(), academicYear.getId())
                .stream()
                .map(fee -> studentFeeRepository.lockById(fee.getId()).orElse(fee))
                .toList();
    }

    private List<PaymentAllocation> allocate(Payment payment,
                                             List<StudentFee> fees,
                                             List<PaymentAllocationRequest> explicit,
                                             BigDecimal amount) {
        List<PaymentAllocation> created = new ArrayList<>();

        if (!explicit.isEmpty()) {
            for (PaymentAllocationRequest line : explicit) {
                StudentFee fee = fees.stream()
                        .filter(f -> f.getId().equals(line.getStudentFeeId()))
                        .findFirst()
                        .orElseThrow(() -> BusinessException.of(ErrorCode.STUDENT_FEE_NOT_FOUND));
                BigDecimal requested = MoneyUtils.normalize(line.getAmount());
                if (MoneyUtils.isGreaterThan(requested, fee.outstanding())) {
                    throw BusinessException.of(ErrorCode.PAYMENT_EXCEEDS_OUTSTANDING)
                            .detail("studentFeeId", fee.getId().toString())
                            .detail("requested", requested)
                            .detail("outstanding", fee.outstanding());
                }
                created.add(persistAllocation(payment, fee, requested));
            }
            return created;
        }

        // Automatic settlement, oldest instalment first.
        BigDecimal remaining = amount;
        for (StudentFee fee : fees) {
            if (MoneyUtils.isZeroOrLess(remaining)) {
                break;
            }
            BigDecimal applied = MoneyUtils.min(remaining, fee.outstanding());
            if (MoneyUtils.isZeroOrLess(applied)) {
                continue;
            }
            created.add(persistAllocation(payment, fee, applied));
            remaining = MoneyUtils.subtract(remaining, applied);
        }

        if (MoneyUtils.isPositive(remaining)) {
            // Overpayment stays unallocated: it becomes a credit for the family.
            log.info("Payment {} leaves {} unallocated (credit balance)",
                    payment.getPaymentReference(), remaining);
        }
        return created;
    }

    private PaymentAllocation persistAllocation(Payment payment, StudentFee fee, BigDecimal amount) {
        fee.allocate(amount);
        studentFeeRepository.save(fee);

        payment.addAllocated(amount);

        PaymentAllocation allocation = new PaymentAllocation();
        allocation.setPayment(payment);
        allocation.setStudentFee(fee);
        allocation.setAmount(amount);
        allocation.setAllocatedBy(currentUser.id().orElse(null));
        return allocationRepository.save(allocation);
    }

    private Receipt createReceipt(Payment payment, Student student) {
        Receipt receipt = new Receipt();
        receipt.setPayment(payment);
        receipt.setStudent(student);
        receipt.setGuardian(payment.getGuardian());
        receipt.setReceiptNumber(numberSequenceService.next(
                student.getSchool().getId(), SCOPE_RECEIPT,
                student.getSchool().getReceiptNumberPattern(),
                student.getSchool().getCode()));
        receipt.setAmount(payment.getAmount());
        receipt.setCurrency(payment.getCurrency());
        receipt.setAmountInWords(AmountInWords.toFrench(payment.getAmount(),
                currencyLabel(payment.getCurrency())));
        receipt.setPaymentMethod(payment.getPaymentMethod());
        receipt.setCashierUserId(currentUser.id().orElse(null));
        receipt.setVerificationCode(verificationCodeGenerator.generate());
        return receiptRepository.save(receipt);
    }

    private String currencyLabel(String currency) {
        return "XOF".equalsIgnoreCase(currency) ? "francs CFA" : currency;
    }

    private String nextPaymentReference(UUID schoolId, Student student) {
        return numberSequenceService.next(schoolId, SCOPE_PAYMENT, "PAY-{year}-{seq:8}",
                student.getSchool().getCode());
    }

    private PaymentResponse toResponse(Payment payment) {
        PaymentResponse response = new PaymentResponse();
        response.setId(payment.getId());
        response.setPaymentReference(payment.getPaymentReference());
        response.setStudentId(payment.getStudent().getId());
        response.setStudentNumber(payment.getStudent().getStudentNumber());
        response.setStudentName(payment.getStudent().fullName());
        response.setAmount(payment.getAmount());
        response.setAllocatedAmount(payment.getAllocatedAmount());
        response.setUnallocatedAmount(payment.remainingToAllocate());
        response.setCurrency(payment.getCurrency());
        response.setPaymentMethod(payment.getPaymentMethod());
        response.setPaymentDate(payment.getPaymentDate());
        response.setStatus(payment.getStatus());
        response.setExternalReference(payment.getExternalReference());
        response.setPayerName(payment.getPayerName());
        response.setOperationId(payment.getOperationId());
        response.setValidatedAt(payment.getValidatedAt());

        receiptRepository.findByPaymentId(payment.getId()).ifPresent(receipt -> {
            response.setReceiptId(receipt.getId());
            response.setReceiptNumber(receipt.getReceiptNumber());
        });

        List<PaymentAllocationResponse> lines = allocationRepository
                .findByPaymentIdAndReversedFalse(payment.getId()).stream()
                .map(allocation -> {
                    PaymentAllocationResponse dto = new PaymentAllocationResponse();
                    dto.setId(allocation.getId());
                    dto.setStudentFeeId(allocation.getStudentFee().getId());
                    dto.setFeeLabel(allocation.getStudentFee().getLabel());
                    dto.setAmount(allocation.getAmount());
                    dto.setFeeRemainingAfter(allocation.getStudentFee().outstanding());
                    dto.setFeeStatus(allocation.getStudentFee().getStatus().name());
                    return dto;
                })
                .toList();
        response.setAllocations(lines);
        return response;
    }
}
