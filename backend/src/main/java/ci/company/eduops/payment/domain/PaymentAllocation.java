package ci.company.eduops.payment.domain;

import ci.company.eduops.finance.domain.StudentFee;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

/** How much of a payment was applied to which instalment (section 41). */
@Entity
@Table(name = "payment_allocation")
@Getter
@Setter
public class PaymentAllocation {

    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "payment_id", nullable = false)
    private Payment payment;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_fee_id", nullable = false)
    private StudentFee studentFee;

    @Column(name = "invoice_id")
    private UUID invoiceId;

    @Column(name = "amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(name = "allocated_at", nullable = false)
    private OffsetDateTime allocatedAt = OffsetDateTime.now();

    @Column(name = "allocated_by")
    private UUID allocatedBy;

    /** Cancelling a payment reverses its allocations instead of deleting them. */
    @Column(name = "reversed", nullable = false)
    private boolean reversed;

    @Column(name = "reversed_at")
    private OffsetDateTime reversedAt;

    public void reverse() {
        this.reversed = true;
        this.reversedAt = OffsetDateTime.now();
    }
}
