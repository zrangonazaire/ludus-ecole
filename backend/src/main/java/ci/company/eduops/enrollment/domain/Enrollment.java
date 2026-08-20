package ci.company.eduops.enrollment.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.admission.domain.AdmissionApplication;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.entity.AuditableEntity;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
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
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * The annual academic placement of a student: student + year + classroom.
 *
 * <p>This is the pivot of the whole system. Attendance, grades, report cards and
 * fees all hang off an enrollment, which is why history survives a year change
 * (rule 16).</p>
 */
@Entity
@Table(name = "enrollment")
@Getter
@Setter
public class Enrollment extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "classroom_id", nullable = false)
    private Classroom classroom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admission_id")
    private AdmissionApplication admission;

    /** Link to last year's enrollment; builds the student's school history. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "previous_enrollment_id")
    private Enrollment previousEnrollment;

    @Column(name = "enrollment_number", nullable = false, length = 40, updatable = false)
    private String enrollmentNumber;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "enrollment_kind", nullable = false, columnDefinition = "enrollment_kind")
    private EnrollmentKind enrollmentKind = EnrollmentKind.NEW;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "enrollment_status")
    private EnrollmentStatus status = EnrollmentStatus.DRAFT;

    @Column(name = "enrollment_date", nullable = false)
    private LocalDate enrollmentDate = LocalDate.now();

    @Column(name = "validated_at")
    private OffsetDateTime validatedAt;

    @Column(name = "validated_by")
    private UUID validatedBy;

    @Column(name = "cancelled_at")
    private OffsetDateTime cancelledAt;

    @Column(name = "cancelled_by")
    private UUID cancelledBy;

    @Column(name = "cancellation_reason")
    private String cancellationReason;

    @Column(name = "completed_at")
    private OffsetDateTime completedAt;

    @Column(name = "repeating", nullable = false)
    private boolean repeating;

    /** Enrolling past the maximum capacity requires an explicit justification. */
    @Column(name = "over_capacity_override", nullable = false)
    private boolean overCapacityOverride;

    @Column(name = "over_capacity_reason")
    private String overCapacityReason;

    @Column(name = "over_capacity_approved_by")
    private UUID overCapacityApprovedBy;

    @Column(name = "idempotency_key", length = 120)
    private String idempotencyKey;

    @Column(name = "notes")
    private String notes;

    public void changeStatus(EnrollmentStatus target) {
        if (!status.canTransitionTo(target)) {
            throw BusinessException.of(ErrorCode.ENROLLMENT_INVALID_TRANSITION,
                            "Transition %s -> %s is not allowed".formatted(status, target))
                    .detail("from", status.name())
                    .detail("to", target.name());
        }
        this.status = target;
    }

    public void validate(UUID validatorId) {
        changeStatus(EnrollmentStatus.VALIDATED);
        this.validatedAt = OffsetDateTime.now();
        this.validatedBy = validatorId;
    }

    public void activate() {
        changeStatus(EnrollmentStatus.ACTIVE);
    }

    public void cancel(UUID userId, String reason) {
        if (reason == null || reason.isBlank()) {
            throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                    "A cancellation reason is required.");
        }
        changeStatus(EnrollmentStatus.CANCELLED);
        this.cancelledAt = OffsetDateTime.now();
        this.cancelledBy = userId;
        this.cancellationReason = reason;
    }

    public void complete() {
        changeStatus(EnrollmentStatus.COMPLETED);
        this.completedAt = OffsetDateTime.now();
    }
}
