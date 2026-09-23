package ci.company.eduops.finance.domain;

import ci.company.eduops.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Une demande de réduction de scolarité, soumise à un circuit de validation
 * à plusieurs niveaux. Chaque niveau est un palier {@link DiscountRequestLevel}
 * confié à un profil ; la réduction ne devient effective qu'après le dernier.
 */
@Entity
@Table(name = "discount_request")
@Getter
@Setter
public class DiscountRequest extends BaseEntity {

    @Column(name = "school_id", nullable = false, updatable = false)
    private UUID schoolId;

    @Column(name = "student_id", nullable = false, updatable = false)
    private UUID studentId;

    @Column(name = "academic_year_id", nullable = false, updatable = false)
    private UUID academicYearId;

    @Column(name = "fee_type_id")
    private UUID feeTypeId;

    @Column(name = "reference", nullable = false, length = 40, updatable = false)
    private String reference;

    @Column(name = "label", nullable = false, length = 150)
    private String label;

    @Column(name = "reason")
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(name = "discount_type", nullable = false, length = 20)
    private DiscountType discountType = DiscountType.PERCENTAGE;

    @Column(name = "value", nullable = false, precision = 15, scale = 2)
    private BigDecimal value;

    /** Montant réel de la réduction, calculé sur le dû de l'année à la création. */
    @Column(name = "computed_amount", precision = 15, scale = 2)
    private BigDecimal computedAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private DiscountRequestStatus status = DiscountRequestStatus.SUBMITTED;

    @Column(name = "current_level", nullable = false)
    private int currentLevel = 1;

    @Column(name = "total_levels", nullable = false)
    private int totalLevels;

    @Column(name = "decided_at")
    private OffsetDateTime decidedAt;

    @Column(name = "decided_by")
    private UUID decidedBy;

    @Column(name = "rejection_reason")
    private String rejectionReason;

    @Column(name = "effective_at")
    private OffsetDateTime effectiveAt;

    @Column(name = "created_by", updatable = false)
    private UUID createdBy;
}
