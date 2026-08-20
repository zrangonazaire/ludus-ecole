package ci.company.eduops.payment.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.cashier.domain.CashSession;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.util.MoneyUtils;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.guardian.domain.Guardian;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.student.domain.Student;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * A sum of money received from a family.
 *
 * <p>{@code operationId} is the client-supplied idempotency key: replaying the
 * same request never creates a second payment (rule 13, section 69).</p>
 *
 * <p>A validated payment can only be neutralised by an explicit cancellation or
 * a reversal entry, never by a DELETE (rule 7, enforced by a DB trigger).</p>
 */
@Entity
@Table(name = "payment")
@Getter
@Setter
public class Payment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enrollment_id")
    private Enrollment enrollment;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guardian_id")
    private Guardian guardian;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cash_session_id")
    private CashSession cashSession;

    @Column(name = "payment_reference", nullable = false, length = 40, updatable = false)
    private String paymentReference;

    @Column(name = "amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(name = "allocated_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal allocatedAmount = MoneyUtils.ZERO;

    @Column(name = "unallocated_amount", insertable = false, updatable = false,
            precision = 15, scale = 2)
    private BigDecimal unallocatedAmount;

    @Column(name = "currency", nullable = false, length = 3)
    private String currency = "XOF";

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "payment_method", nullable = false, columnDefinition = "payment_method")
    private PaymentMethod paymentMethod;

    @Column(name = "payment_date", nullable = false)
    private LocalDate paymentDate = LocalDate.now();

    @Column(name = "external_reference", length = 120)
    private String externalReference;

    @Column(name = "payer_name", length = 200)
    private String payerName;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "payment_status")
    private PaymentStatus status = PaymentStatus.PENDING;

    /** Idempotency key, unique per school. */
    @Column(name = "operation_id", nullable = false, length = 120, updatable = false)
    private String operationId;

    @Column(name = "validated_at")
    private OffsetDateTime validatedAt;

    @Column(name = "validated_by")
    private UUID validatedBy;

    @Column(name = "cancelled_at")
    private OffsetDateTime cancelledAt;

    @Column(name = "cancelled_by")
    private UUID cancelledBy;

    @Column(name = "cancellation_reason")
    private String cancellationReason;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reversal_of_payment_id")
    private Payment reversalOfPayment;

    @Column(name = "notes")
    private String notes;

    @Column(name = "created_by")
    private UUID createdByUser;

    public void validate(UUID userId) {
        this.status = PaymentStatus.VALIDATED;
        this.validatedAt = OffsetDateTime.now();
        this.validatedBy = userId;
    }

    public void cancel(UUID userId, String reason) {
        if (!status.canBeCancelled()) {
            throw BusinessException.of(ErrorCode.PAYMENT_CANCELLATION_NOT_ALLOWED)
                    .detail("status", status.name());
        }
        if (reason == null || reason.isBlank()) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "A cancellation reason is required.");
        }
        this.status = PaymentStatus.CANCELLED;
        this.cancelledAt = OffsetDateTime.now();
        this.cancelledBy = userId;
        this.cancellationReason = reason;
    }

    public BigDecimal remainingToAllocate() {
        return MoneyUtils.subtract(amount, allocatedAmount);
    }

    public void addAllocated(BigDecimal value) {
        this.allocatedAmount = MoneyUtils.add(this.allocatedAmount, value);
        if (MoneyUtils.isGreaterThan(this.allocatedAmount, this.amount)) {
            throw BusinessException.of(ErrorCode.PAYMENT_EXCEEDS_OUTSTANDING)
                    .detail("amount", amount)
                    .detail("allocated", allocatedAmount);
        }
    }
}
