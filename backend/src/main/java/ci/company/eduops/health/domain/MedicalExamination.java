package ci.company.eduops.health.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.common.entity.BaseEntity;
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

import java.time.LocalDate;
import java.util.UUID;

/** A compulsory medical examination, scheduled then recorded. */
@Entity
@Table(name = "medical_examination")
@Getter
@Setter
public class MedicalExamination extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "kind", nullable = false, columnDefinition = "examination_kind")
    private ExaminationKind kind;

    @Column(name = "scheduled_on", nullable = false)
    private LocalDate scheduledOn;

    @Column(name = "performed_on")
    private LocalDate performedOn;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "outcome", nullable = false, columnDefinition = "examination_outcome")
    private ExaminationOutcome outcome = ExaminationOutcome.PENDING;

    /** The reserve pronounced: excused from running, seated at the front. */
    @Column(name = "restriction", length = 300)
    private String restriction;

    @Column(name = "practitioner", length = 160)
    private String practitioner;

    @Column(name = "notes")
    private String notes;

    @Column(name = "recorded_by")
    private UUID recordedBy;

    /** Whether the examination is late: due, still not settled. */
    public boolean isOverdue(LocalDate today) {
        return outcome.isOutstanding() && scheduledOn.isBefore(today);
    }

    /**
     * Records the finding.
     *
     * <p>A missed examination keeps no date of performance: writing one would
     * claim a consultation that never happened.</p>
     */
    public void record(ExaminationOutcome result, LocalDate on, UUID userId) {
        this.outcome = result;
        this.performedOn = result.isSettled() ? on : null;
        this.recordedBy = userId;
    }
}
