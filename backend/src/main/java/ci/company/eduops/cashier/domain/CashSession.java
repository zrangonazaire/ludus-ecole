package ci.company.eduops.cashier.domain;

import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.common.util.MoneyUtils;
import ci.company.eduops.school.domain.School;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

/** A cashier's till session, opened in the morning and reconciled at close. */
@Entity
@Table(name = "cash_session")
@Getter
@Setter
public class CashSession extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campus_id")
    private Campus campus;

    @Column(name = "cashier_user_id", nullable = false)
    private UUID cashierUserId;

    @Column(name = "reference", nullable = false, length = 40, updatable = false)
    private String reference;

    @Column(name = "opened_at", nullable = false)
    private OffsetDateTime openedAt = OffsetDateTime.now();

    @Column(name = "opening_balance", nullable = false, precision = 15, scale = 2)
    private BigDecimal openingBalance = MoneyUtils.ZERO;

    @Column(name = "closed_at")
    private OffsetDateTime closedAt;

    /** Opening balance plus every validated cash payment of the session. */
    @Column(name = "expected_balance", precision = 15, scale = 2)
    private BigDecimal expectedBalance;

    @Column(name = "actual_balance", precision = 15, scale = 2)
    private BigDecimal actualBalance;

    @Column(name = "difference", insertable = false, updatable = false, precision = 15, scale = 2)
    private BigDecimal difference;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "cash_session_status")
    private CashSessionStatus status = CashSessionStatus.OPEN;

    @Column(name = "reconciled_at")
    private OffsetDateTime reconciledAt;

    @Column(name = "reconciled_by")
    private UUID reconciledBy;

    @Column(name = "notes")
    private String notes;

    public void close(BigDecimal expected, BigDecimal actual) {
        this.expectedBalance = MoneyUtils.normalize(expected);
        this.actualBalance = MoneyUtils.normalize(actual);
        this.closedAt = OffsetDateTime.now();
        this.status = CashSessionStatus.CLOSED;
    }

    public void reconcile(UUID userId, String notes) {
        this.status = CashSessionStatus.RECONCILED;
        this.reconciledAt = OffsetDateTime.now();
        this.reconciledBy = userId;
        this.notes = notes;
    }

    public boolean isOpen() {
        return status == CashSessionStatus.OPEN;
    }
}
