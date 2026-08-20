package ci.company.eduops.assessment.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.entity.AuditableEntity;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.term.domain.Term;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

/** A graded exercise: devoir, interrogation, composition... */
@Entity
@Table(name = "assessment")
@Getter
@Setter
public class Assessment extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "classroom_id", nullable = false)
    private Classroom classroom;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "term_id", nullable = false)
    private Term term;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "assessment_type", nullable = false, columnDefinition = "assessment_type")
    private AssessmentType assessmentType = AssessmentType.TEST;

    @Column(name = "assessment_date", nullable = false)
    private LocalDate assessmentDate;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    /** The scale this exercise is marked on; usually 20 but may differ. */
    @Column(name = "max_score", nullable = false, precision = 6, scale = 3)
    private BigDecimal maxScore = new BigDecimal("20.000");

    /** Weight of this assessment inside the subject average. */
    @Column(name = "coefficient", nullable = false, precision = 6, scale = 3)
    private BigDecimal coefficient = BigDecimal.ONE;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "assessment_status")
    private AssessmentStatus status = AssessmentStatus.DRAFT;

    @Column(name = "counts_for_average", nullable = false)
    private boolean countsForAverage = true;

    @Column(name = "published_at")
    private OffsetDateTime publishedAt;

    @Column(name = "validated_at")
    private OffsetDateTime validatedAt;

    @Column(name = "validated_by")
    private UUID validatedBy;

    public void changeStatus(AssessmentStatus target) {
        if (!status.canTransitionTo(target)) {
            throw BusinessException.of(ErrorCode.ASSESSMENT_INVALID_TRANSITION,
                            "Transition %s -> %s is not allowed".formatted(status, target))
                    .detail("from", status.name())
                    .detail("to", target.name());
        }
        this.status = target;
    }
}
