package ci.company.eduops.promotion.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.council.domain.ClassCouncil;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.student.domain.Student;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * The class council's outcome for one pupil (section 36).
 *
 * <p>One decision per enrollment (unique constraint), decided during a
 * {@link ClassCouncil}. The database refuses a final decision that was never
 * signed: {@code CHECK (decision = 'PENDING_DECISION' OR decided_at IS NOT NULL)},
 * so a decision always carries who made it and when.</p>
 *
 * <p>Applying the decision (creating the re-enrollment of the next year) is a
 * separate step handled elsewhere; this row only records what was decided.</p>
 */
@Entity
@Table(name = "promotion_decision")
@Getter
@Setter
public class PromotionDecision extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "council_id")
    private ClassCouncil council;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "enrollment_id", nullable = false)
    private Enrollment enrollment;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    /** The level the pupil was in during the decided year. */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "from_level_id", nullable = false)
    private Level fromLevel;

    /** The level the pupil moves to; null when the decision does not move them. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_level_id")
    private Level toLevel;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "decision", nullable = false, columnDefinition = "promotion_decision_type")
    private PromotionDecisionType decision = PromotionDecisionType.PENDING_DECISION;

    @Column(name = "annual_average", precision = 6, scale = 3)
    private BigDecimal annualAverage;

    @Column(name = "justification", columnDefinition = "text")
    private String justification;

    @Column(name = "orientation_advice", length = 255)
    private String orientationAdvice;

    @Column(name = "decided_at")
    private OffsetDateTime decidedAt;

    @Column(name = "decided_by")
    private UUID decidedBy;

    @Column(name = "applied_at")
    private OffsetDateTime appliedAt;

    public boolean isDecided() {
        return decision != PromotionDecisionType.PENDING_DECISION;
    }

    /** Records an outcome, stamping who decided and when. Pending reopens the case. */
    public void decide(PromotionDecisionType outcome, UUID userId, Level targetLevel) {
        this.decision = outcome;
        this.toLevel = targetLevel;
        if (outcome == PromotionDecisionType.PENDING_DECISION) {
            this.decidedAt = null;
            this.decidedBy = null;
        } else {
            this.decidedAt = OffsetDateTime.now();
            this.decidedBy = userId;
        }
    }
}