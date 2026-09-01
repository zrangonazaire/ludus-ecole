package ci.company.eduops.attendance.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.term.domain.Term;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.UUID;

/** One pupil's mark on one sheet. Keeps who recorded it and when (section 28). */
@Entity
@Table(name = "student_attendance")
@Getter
@Setter
public class StudentAttendance extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "attendance_session_id", nullable = false)
    private AttendanceSession attendanceSession;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "term_id")
    private Term term;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "attendance_status")
    private AttendanceStatus status;

    @Column(name = "arrival_time")
    private LocalTime arrivalTime;

    @Column(name = "departure_time")
    private LocalTime departureTime;

    @Column(name = "minutes_late")
    private Integer minutesLate;

    @Column(name = "reason", length = 255)
    private String reason;

    @Column(name = "justified", nullable = false)
    private boolean justified;

    @Column(name = "justification_document_url", length = 500)
    private String justificationDocumentUrl;

    @Column(name = "justified_by")
    private UUID justifiedBy;

    @Column(name = "justified_at")
    private OffsetDateTime justifiedAt;

    /**
     * When the family was chased about this absence.
     *
     * <p>Null means nobody has been contacted yet. It is the difference between
     * a list of who should be called and a list of who still has to be, which
     * matters as soon as two people share the work.</p>
     */
    @Column(name = "guardian_notified_at")
    private OffsetDateTime guardianNotifiedAt;

    @Column(name = "recorded_by")
    private UUID recordedBy;

    @Column(name = "recorded_at", nullable = false)
    private OffsetDateTime recordedAt = OffsetDateTime.now();

    public void justify(UUID userId, String documentUrl, String reason) {
        this.justified = true;
        this.justifiedBy = userId;
        this.justifiedAt = OffsetDateTime.now();
        this.justificationDocumentUrl = documentUrl;
        this.reason = reason;
        if (status == AttendanceStatus.ABSENT) {
            this.status = AttendanceStatus.EXCUSED_ABSENCE;
        } else if (status == AttendanceStatus.LATE) {
            this.status = AttendanceStatus.EXCUSED_LATE;
        }
    }
}
