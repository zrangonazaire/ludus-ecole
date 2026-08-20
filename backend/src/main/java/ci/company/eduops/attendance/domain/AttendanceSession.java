package ci.company.eduops.attendance.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.term.domain.Term;
import ci.company.eduops.timetable.domain.CourseSession;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.UUID;

/** One attendance sheet: a class, a date, a slot. Traceable once submitted. */
@Entity
@Table(name = "attendance_session")
@Getter
@Setter
public class AttendanceSession extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_session_id")
    private CourseSession courseSession;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "classroom_id", nullable = false)
    private Classroom classroom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "term_id")
    private Term term;

    @Column(name = "session_date", nullable = false)
    private LocalDate sessionDate;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "attendance_session_status")
    private AttendanceSessionStatus status = AttendanceSessionStatus.OPEN;

    @Column(name = "expected_count", nullable = false)
    private int expectedCount;

    @Column(name = "present_count", nullable = false)
    private int presentCount;

    @Column(name = "absent_count", nullable = false)
    private int absentCount;

    @Column(name = "late_count", nullable = false)
    private int lateCount;

    @Column(name = "submitted_at")
    private OffsetDateTime submittedAt;

    @Column(name = "submitted_by")
    private UUID submittedBy;

    @Column(name = "validated_at")
    private OffsetDateTime validatedAt;

    @Column(name = "validated_by")
    private UUID validatedBy;

    @Column(name = "locked_at")
    private OffsetDateTime lockedAt;

    @Column(name = "idempotency_key", length = 120)
    private String idempotencyKey;

    public void submit(UUID userId) {
        this.status = AttendanceSessionStatus.SUBMITTED;
        this.submittedAt = OffsetDateTime.now();
        this.submittedBy = userId;
    }

    public void recomputeCounters(int present, int absent, int late) {
        this.presentCount = present;
        this.absentCount = absent;
        this.lateCount = late;
    }
}
