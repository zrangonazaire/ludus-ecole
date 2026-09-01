package ci.company.eduops.enrollment.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.entity.BaseEntity;
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

/**
 * A pupil leaving the school.
 *
 * <p>Distinct from {@link EnrollmentTransfer}, which records a change of class
 * inside the school. This ends the schooling here, and the family leaves with
 * papers the receiving school will ask for.</p>
 *
 * <p>The outstanding balance is frozen on the row rather than recomputed on
 * read. Recomputed later it would give another figure — next year's fees would
 * be counted — and the file would no longer match what was told to the family
 * on the day.</p>
 */
@Entity
@Table(name = "student_departure")
@Getter
@Setter
public class StudentDeparture extends BaseEntity {

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
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "reason", nullable = false, columnDefinition = "departure_reason")
    private DepartureReason reason = DepartureReason.OTHER;

    @Column(name = "departure_date", nullable = false)
    private LocalDate departureDate;

    @Column(name = "destination_school", length = 200)
    private String destinationSchool;

    @Column(name = "destination_city", length = 120)
    private String destinationCity;

    @Column(name = "notes")
    private String notes;

    /** Le solde dû le jour du départ, figé. */
    @Column(name = "outstanding_amount", nullable = false, precision = 14, scale = 2)
    private BigDecimal outstandingAmount = BigDecimal.ZERO;

    @Column(name = "currency", nullable = false, length = 3)
    private String currency = "XOF";

    @Column(name = "exeat_issued", nullable = false)
    private boolean exeatIssued;

    @Column(name = "certificate_issued", nullable = false)
    private boolean certificateIssued;

    @Column(name = "report_card_issued", nullable = false)
    private boolean reportCardIssued;

    @Column(name = "file_returned", nullable = false)
    private boolean fileReturned;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "departure_status")
    private DepartureStatus status = DepartureStatus.RECORDED;

    @Column(name = "recorded_at", nullable = false)
    private OffsetDateTime recordedAt = OffsetDateTime.now();

    @Column(name = "recorded_by")
    private UUID recordedBy;

    @Column(name = "cleared_at")
    private OffsetDateTime clearedAt;

    @Column(name = "cleared_by")
    private UUID clearedBy;

    @Column(name = "cancelled_reason")
    private String cancelledReason;

    /** Everything the family was supposed to leave with has been handed over. */
    public boolean documentsComplete() {
        return exeatIssued && certificateIssued && reportCardIssued && fileReturned;
    }

    public void clear(UUID userId) {
        this.status = DepartureStatus.CLEARED;
        this.clearedAt = OffsetDateTime.now();
        this.clearedBy = userId;
    }

    public void cancel(String reason) {
        this.status = DepartureStatus.CANCELLED;
        this.cancelledReason = reason;
    }
}
