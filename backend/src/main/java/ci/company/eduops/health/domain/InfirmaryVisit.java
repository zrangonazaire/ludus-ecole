package ci.company.eduops.health.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.classroom.domain.Classroom;
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

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * One passage through the infirmary.
 *
 * <p>The register is the school's proof of what was done. An empty line in it
 * proves nothing on the day a family asks for an account, which is why the
 * care given is required rather than optional.</p>
 */
@Entity
@Table(name = "infirmary_visit")
@Getter
@Setter
public class InfirmaryVisit extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "classroom_id")
    private Classroom classroom;

    @Column(name = "occurred_at", nullable = false)
    private OffsetDateTime occurredAt = OffsetDateTime.now();

    @Column(name = "complaint", nullable = false, length = 200)
    private String complaint;

    @Column(name = "care_given", nullable = false)
    private String careGiven;

    /** Never a floating-point type: a temperature is compared to a threshold. */
    @Column(name = "temperature_celsius", precision = 4, scale = 1)
    private BigDecimal temperatureCelsius;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "outcome", nullable = false, columnDefinition = "infirmary_outcome")
    private InfirmaryOutcome outcome = InfirmaryOutcome.BACK_TO_CLASS;

    @Column(name = "notes")
    private String notes;

    @Column(name = "guardian_notified_at")
    private OffsetDateTime guardianNotifiedAt;

    @Column(name = "referred_to", length = 200)
    private String referredTo;

    @Column(name = "recorded_by")
    private UUID recordedBy;

    public boolean isGuardianNotified() {
        return guardianNotifiedAt != null;
    }

    public void notifyGuardian(OffsetDateTime at) {
        this.guardianNotifiedAt = at;
    }
}
