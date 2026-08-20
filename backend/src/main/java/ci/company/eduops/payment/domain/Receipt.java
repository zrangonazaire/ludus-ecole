package ci.company.eduops.payment.domain;

import ci.company.eduops.guardian.domain.Guardian;
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

/** The legal proof handed to the family. One receipt per validated payment. */
@Entity
@Table(name = "receipt")
@Getter
@Setter
public class Receipt {

    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "payment_id", nullable = false)
    private Payment payment;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guardian_id")
    private Guardian guardian;

    @Column(name = "receipt_number", nullable = false, length = 40, updatable = false)
    private String receiptNumber;

    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate = LocalDate.now();

    @Column(name = "amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(name = "currency", nullable = false, length = 3)
    private String currency = "XOF";

    /** Amount spelled out in French, as required on an official receipt. */
    @Column(name = "amount_in_words", length = 400)
    private String amountInWords;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "payment_method", nullable = false, columnDefinition = "payment_method")
    private PaymentMethod paymentMethod;

    @Column(name = "cashier_user_id")
    private UUID cashierUserId;

    @Column(name = "verification_code", nullable = false, length = 60)
    private String verificationCode;

    @Column(name = "pdf_url", length = 500)
    private String pdfUrl;

    @Column(name = "cancelled", nullable = false)
    private boolean cancelled;

    @Column(name = "cancelled_at")
    private OffsetDateTime cancelledAt;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    public void cancel() {
        this.cancelled = true;
        this.cancelledAt = OffsetDateTime.now();
    }
}
