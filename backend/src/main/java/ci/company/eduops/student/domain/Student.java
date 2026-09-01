package ci.company.eduops.student.domain;

import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.common.entity.AuditableEntity;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.school.domain.School;
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
import java.time.Period;
import java.util.UUID;

/**
 * A pupil's permanent identity.
 *
 * <p>Deliberately holds <em>no</em> classroom: the yearly placement lives in
 * {@code Enrollment} (rule 5), which is what allows a complete school history
 * across years.</p>
 */
@Entity
@Table(name = "student")
@Getter
@Setter
public class Student extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    /** Unique matricule, e.g. EDU-2026-000123. Pattern configurable per school. */
    @Column(name = "student_number", nullable = false, length = 40, updatable = false)
    private String studentNumber;

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

    @Column(name = "national_id", length = 80)
    private String nationalId;

    @Column(name = "photo_url", length = 500)
    private String photoUrl;

    @Column(name = "email", length = 180)
    private String email;

    @Column(name = "phone", length = 40)
    private String phone;

    @Column(name = "address_line1", length = 200)
    private String addressLine1;

    @Column(name = "city", length = 120)
    private String city;

    // Le groupe sanguin et les notes medicales vivaient ici, declares mais
    // jamais lus. V37 les a deplaces dans StudentHealthRecord, ou leur lecture
    // peut etre accordee separement : la fiche de l'eleve est ouverte a tout le
    // secretariat, son dossier medical ne doit pas l'etre.
    @Column(name = "has_disability", nullable = false)
    private boolean hasDisability;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "student_status")
    private StudentStatus status = StudentStatus.APPLICANT;

    @Column(name = "admission_date")
    private LocalDate admissionDate;

    @Column(name = "previous_school", length = 200)
    private String previousSchool;

    @Column(name = "user_account_id")
    private UUID userAccountId;

    @Column(name = "archived_at")
    private OffsetDateTime archivedAt;

    public String fullName() {
        return middleName == null || middleName.isBlank()
                ? firstName + " " + lastName
                : firstName + " " + middleName + " " + lastName;
    }

    public Integer age() {
        return birthDate == null ? null : Period.between(birthDate, LocalDate.now()).getYears();
    }

    /**
     * Applies a status change after checking the transition is legal.
     *
     * @throws BusinessException {@code STUDENT_INVALID_STATUS_TRANSITION}
     */
    public void changeStatus(StudentStatus target) {
        if (!status.canTransitionTo(target)) {
            throw BusinessException.of(ErrorCode.STUDENT_INVALID_STATUS_TRANSITION,
                            "Transition %s -> %s is not allowed".formatted(status, target))
                    .detail("from", status.name())
                    .detail("to", target.name());
        }
        this.status = target;
        if (target == StudentStatus.ARCHIVED) {
            this.archivedAt = OffsetDateTime.now();
        }
    }
}
