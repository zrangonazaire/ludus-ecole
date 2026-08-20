package ci.company.eduops.teacher.domain;

import ci.company.eduops.common.domain.ContractType;
import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.common.entity.AuditableEntity;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.subject.domain.Subject;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/** A teaching staff member. The subjects they may teach are declared explicitly. */
@Entity
@Table(name = "teacher")
@Getter
@Setter
public class Teacher extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @Column(name = "employee_number", nullable = false, length = 40)
    private String employeeNumber;

    @Column(name = "first_name", nullable = false, length = 120)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 120)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "gender", columnDefinition = "gender")
    private Gender gender;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "email", nullable = false, length = 180)
    private String email;

    @Column(name = "phone", length = 40)
    private String phone;

    @Column(name = "photo_url", length = 500)
    private String photoUrl;

    @Column(name = "speciality", length = 150)
    private String speciality;

    @Column(name = "qualification", length = 150)
    private String qualification;

    @Column(name = "hire_date", nullable = false)
    private LocalDate hireDate;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "contract_type", nullable = false, columnDefinition = "contract_type")
    private ContractType contractType = ContractType.PERMANENT;

    @Column(name = "weekly_hours_max", nullable = false)
    private int weeklyHoursMax = 24;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "teacher_status")
    private TeacherStatus status = TeacherStatus.ACTIVE;

    @Column(name = "user_account_id")
    private UUID userAccountId;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "teacher_subject",
            joinColumns = @JoinColumn(name = "teacher_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id"))
    private Set<Subject> qualifiedSubjects = new HashSet<>();

    public String fullName() {
        return firstName + " " + lastName;
    }
}
