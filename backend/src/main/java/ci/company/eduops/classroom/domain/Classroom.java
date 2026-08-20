package ci.company.eduops.classroom.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.common.entity.AuditableEntity;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.room.domain.Room;
import ci.company.eduops.teacher.domain.Teacher;
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

/**
 * A class group for one academic year (3eme A, 2026-2027).
 *
 * <p>A classroom is <em>always</em> bound to an academic year: students are not
 * attached to it directly but through their annual enrollment (rule 5).</p>
 *
 * <p>The number of remaining seats is never stored; it is derived from active
 * enrollments (rule 9).</p>
 */
@Entity
@Table(name = "classroom")
@Getter
@Setter
public class Classroom extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "campus_id", nullable = false)
    private Campus campus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "level_id", nullable = false)
    private Level level;

    @Column(name = "code", nullable = false, length = 40)
    private String code;

    @Column(name = "name", nullable = false, length = 120)
    private String name;

    @Column(name = "section", length = 30)
    private String section;

    @Column(name = "capacity_maximum", nullable = false)
    private int capacityMaximum;

    /** Occupancy percentage above which the class is flagged WARNING. */
    @Column(name = "capacity_warning_threshold", nullable = false, precision = 5, scale = 2)
    private BigDecimal capacityWarningThreshold = new BigDecimal("90.00");

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "main_teacher_id")
    private Teacher mainTeacher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "default_room_id")
    private Room defaultRoom;

    @Column(name = "language_of_instruction", nullable = false, length = 60)
    private String languageOfInstruction = "FR";

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "classroom_status")
    private ClassroomStatus status = ClassroomStatus.DRAFT;

    /** availableSeats = capacityMaximum - activeEnrollments (section 22). */
    public int availableSeats(long activeEnrollments) {
        return capacityMaximum - (int) activeEnrollments;
    }

    /**
     * projectedAvailableSeats also removes the seats reserved by accepted
     * admissions and adds back the students planned to leave.
     */
    public int projectedAvailableSeats(long activeEnrollments, long reservedAdmissions,
                                       long plannedTransfersOut) {
        return capacityMaximum - (int) activeEnrollments - (int) reservedAdmissions
                + (int) plannedTransfersOut;
    }

    public CapacityStatus capacityStatus(long activeEnrollments) {
        if (activeEnrollments > capacityMaximum) {
            return CapacityStatus.OVER_CAPACITY;
        }
        if (activeEnrollments == capacityMaximum) {
            return CapacityStatus.FULL;
        }
        BigDecimal threshold = BigDecimal.valueOf(capacityMaximum)
                .multiply(capacityWarningThreshold)
                .divide(BigDecimal.valueOf(100), 2, java.math.RoundingMode.HALF_UP);
        return BigDecimal.valueOf(activeEnrollments).compareTo(threshold) >= 0
                ? CapacityStatus.WARNING
                : CapacityStatus.AVAILABLE;
    }

    public String displayName() {
        return name + " (" + level.getName() + ")";
    }
}
