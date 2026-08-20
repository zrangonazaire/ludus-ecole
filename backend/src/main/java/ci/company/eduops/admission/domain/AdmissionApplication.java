package ci.company.eduops.admission.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.common.entity.AuditableEntity;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.student.domain.Student;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * A candidate application, captured before any Student record exists.
 * Converting an ACCEPTED application creates the Student and its Enrollment.
 */
@Entity
@Table(name = "admission_application")
@Getter
@Setter
public class AdmissionApplication extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "campus_id", nullable = false)
    private Campus campus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "requested_level_id", nullable = false)
    private Level requestedLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reserved_classroom_id")
    private Classroom reservedClassroom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @Column(name = "application_number", nullable = false, length = 40, updatable = false)
    private String applicationNumber;

    @Column(name = "first_name", nullable = false, length = 120)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 120)
    private String lastName;

    @Column(name = "middle_name", length = 120)
    private String middleName;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "gender", nullable = false, columnDefinition = "gender")
    private Gender gender;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "birth_place", length = 150)
    private String birthPlace;

    @Column(name = "nationality", length = 120)
    private String nationality;

    @Column(name = "previous_school", length = 200)
    private String previousSchool;

    @Column(name = "guardian_first_name", length = 120)
    private String guardianFirstName;

    @Column(name = "guardian_last_name", length = 120)
    private String guardianLastName;

    @Column(name = "guardian_phone", length = 40)
    private String guardianPhone;

    @Column(name = "guardian_email", length = 180)
    private String guardianEmail;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "admission_status")
    private AdmissionStatus status = AdmissionStatus.DRAFT;

    @Column(name = "submitted_at")
    private OffsetDateTime submittedAt;

    @Column(name = "reviewed_at")
    private OffsetDateTime reviewedAt;

    @Column(name = "reviewed_by")
    private UUID reviewedBy;

    @Column(name = "decision_at")
    private OffsetDateTime decisionAt;

    @Column(name = "decision_by")
    private UUID decisionBy;

    @Column(name = "decision_reason")
    private String decisionReason;

    @Column(name = "entrance_exam_score", precision = 6, scale = 3)
    private BigDecimal entranceExamScore;

    @Column(name = "documents_complete", nullable = false)
    private boolean documentsComplete;

    @Column(name = "seat_reserved", nullable = false)
    private boolean seatReserved;

    @Column(name = "notes")
    private String notes;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AdmissionDocument> documents = new ArrayList<>();

    public String fullName() {
        return firstName + " " + lastName;
    }

    public void changeStatus(AdmissionStatus target) {
        if (!status.canTransitionTo(target)) {
            throw BusinessException.of(ErrorCode.ADMISSION_INVALID_TRANSITION,
                            "Transition %s -> %s is not allowed".formatted(status, target))
                    .detail("from", status.name())
                    .detail("to", target.name());
        }
        this.status = target;
        this.seatReserved = target.reservesSeat() && reservedClassroom != null;
    }

    /** True when every mandatory document has been received. */
    public boolean hasAllMandatoryDocuments() {
        return documents.stream()
                .filter(AdmissionDocument::isMandatory)
                .allMatch(AdmissionDocument::isReceived);
    }
}
