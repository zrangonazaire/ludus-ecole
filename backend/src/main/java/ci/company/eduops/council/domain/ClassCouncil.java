package ci.company.eduops.council.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.term.domain.Term;
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
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * A class council (conseil de classe) for one class during one grading period.
 *
 * <p>Each council sits on the intersection of a {@link Classroom} and a
 * {@link Term}: at the end of a term the teaching team meets, examines every
 * pupil, and the resulting promotion decisions (section 36) hang off this
 * meeting through {@link ci.company.eduops.promotion.domain.PromotionDecision}.</p>
 *
 * <p>The schema bounds a council to one class per term (unique constraint), so a
 * council cannot be created twice for the same pair. Aggregates such as the
 * class average and success rate are recomputed when the council is closed,
 * never typed by hand.</p>
 */
@Entity
@Table(name = "class_council")
@Getter
@Setter
public class ClassCouncil extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "classroom_id", nullable = false)
    private Classroom classroom;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "term_id", nullable = false)
    private Term term;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @Column(name = "meeting_date", nullable = false)
    private LocalDate meetingDate;

    @Column(name = "start_time", columnDefinition = "time")
    private LocalTime startTime;

    @Column(name = "end_time", columnDefinition = "time")
    private LocalTime endTime;

    /** The app user chairing the meeting (a head of school, usually). */
    @Column(name = "chaired_by")
    private UUID chairedBy;

    @Column(name = "location", length = 150)
    private String location;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "council_status")
    private CouncilStatus status = CouncilStatus.PLANNED;

    /** Average written by the school over the class, or null until it is set on close. */
    @Column(name = "class_average", precision = 6, scale = 3)
    private BigDecimal classAverage;

    @Column(name = "success_rate", precision = 5, scale = 2)
    private BigDecimal successRate;

    @Column(name = "remarks", columnDefinition = "text")
    private String remarks;

    @Column(name = "minutes_url", length = 500)
    private String minutesUrl;

    @Column(name = "closed_at")
    private OffsetDateTime closedAt;

    @Column(name = "closed_by")
    private UUID closedBy;

    /** Applies a state transition after checking it is legal. */
    public void changeStatus(CouncilStatus target) {
        if (!status.canTransitionTo(target)) {
            throw BusinessException.of(ErrorCode.COUNCIL_INVALID_TRANSITION,
                            "Transition %s -> %s is not allowed".formatted(status, target))
                    .detail("from", status.name())
                    .detail("to", target.name());
        }
        this.status = target;
    }

    /** Seals the council, stamping who closed it and when. */
    public void close(UUID closedBy) {
        changeStatus(CouncilStatus.CLOSED);
        this.closedAt = OffsetDateTime.now();
        this.closedBy = closedBy;
    }
}