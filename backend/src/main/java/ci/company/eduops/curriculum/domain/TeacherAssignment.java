package ci.company.eduops.curriculum.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.subject.domain.Subject;
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
import java.time.LocalDate;
import java.util.UUID;

/**
 * Answers "who teaches which subject, to which class, for which year"
 * (section 24) and defines each teacher's authorised perimeter (rule 10).
 */
@Entity
@Table(name = "teacher_assignment")
@Getter
@Setter
public class TeacherAssignment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "classroom_id", nullable = false)
    private Classroom classroom;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(name = "weekly_hours", nullable = false, precision = 5, scale = 2)
    private BigDecimal weeklyHours = new BigDecimal("2.00");

    @Column(name = "is_main_teacher", nullable = false)
    private boolean mainTeacher;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate = LocalDate.now();

    @Column(name = "end_date")
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "assignment_status")
    private AssignmentStatus status = AssignmentStatus.ACTIVE;

    @Column(name = "created_by")
    private UUID createdBy;

    public boolean isEffectiveOn(LocalDate date) {
        return status.isLive()
                && !date.isBefore(startDate)
                && (endDate == null || !date.isAfter(endDate));
    }
}
