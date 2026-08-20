package ci.company.eduops.grade.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.assessment.domain.Assessment;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.term.domain.Term;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * One pupil's mark on one assessment.
 *
 * <p>{@code normalizedScore} brings the raw score back onto the school scale so
 * an exercise marked out of 40 can be averaged with one marked out of 20.</p>
 */
@Entity
@Table(name = "grade")
@Getter
@Setter
public class Grade extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "assessment_id", nullable = false)
    private Assessment assessment;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "enrollment_id", nullable = false)
    private Enrollment enrollment;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "classroom_id", nullable = false)
    private Classroom classroom;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "term_id", nullable = false)
    private Term term;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @Column(name = "score", precision = 6, scale = 3)
    private BigDecimal score;

    @Column(name = "max_score", nullable = false, precision = 6, scale = 3)
    private BigDecimal maxScore;

    @Column(name = "normalized_score", precision = 6, scale = 3)
    private BigDecimal normalizedScore;

    @Column(name = "absent", nullable = false)
    private boolean absent;

    @Column(name = "exempted", nullable = false)
    private boolean exempted;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "grade_status")
    private GradeStatus status = GradeStatus.DRAFT;

    @Column(name = "comment", length = 500)
    private String comment;

    @Column(name = "entered_by")
    private UUID enteredBy;

    @Column(name = "entered_at")
    private OffsetDateTime enteredAt;

    @Column(name = "submitted_by")
    private UUID submittedBy;

    @Column(name = "submitted_at")
    private OffsetDateTime submittedAt;

    @Column(name = "validated_by")
    private UUID validatedBy;

    @Column(name = "validated_at")
    private OffsetDateTime validatedAt;

    @Column(name = "published_at")
    private OffsetDateTime publishedAt;

    /**
     * Sets the score after validating the range (section 32).
     *
     * @throws BusinessException {@code GRADE_OUT_OF_RANGE}
     */
    public void applyScore(BigDecimal newScore, BigDecimal scaleMax) {
        if (newScore != null) {
            if (newScore.compareTo(BigDecimal.ZERO) < 0 || newScore.compareTo(maxScore) > 0) {
                throw BusinessException.of(ErrorCode.GRADE_OUT_OF_RANGE)
                        .detail("score", newScore)
                        .detail("maxScore", maxScore);
            }
            this.absent = false;
        }
        this.score = newScore;
        this.normalizedScore = normalize(newScore, scaleMax);
        this.enteredAt = OffsetDateTime.now();
    }

    /** score / maxScore * scaleMax, e.g. 32/40 on a /20 scale = 16.000. */
    private BigDecimal normalize(BigDecimal rawScore, BigDecimal scaleMax) {
        if (rawScore == null || maxScore == null || maxScore.compareTo(BigDecimal.ZERO) == 0) {
            return null;
        }
        return rawScore.multiply(scaleMax)
                .divide(maxScore, 3, RoundingMode.HALF_UP);
    }

    public void markAbsent() {
        this.absent = true;
        this.score = null;
        this.normalizedScore = null;
    }

    public void changeStatus(GradeStatus target) {
        if (!status.canTransitionTo(target)) {
            throw BusinessException.of(ErrorCode.GRADE_INVALID_TRANSITION,
                            "Transition %s -> %s is not allowed".formatted(status, target))
                    .detail("from", status.name())
                    .detail("to", target.name());
        }
        this.status = target;
        OffsetDateTime now = OffsetDateTime.now();
        switch (target) {
            case SUBMITTED -> this.submittedAt = now;
            case VALIDATED -> this.validatedAt = now;
            case PUBLISHED -> this.publishedAt = now;
            default -> { /* DRAFT keeps its timestamps */ }
        }
    }

    /** Absent and exempted pupils are excluded from the average denominator. */
    public boolean entersAverage() {
        return !exempted && !absent && normalizedScore != null && status.countsForAverage();
    }
}
