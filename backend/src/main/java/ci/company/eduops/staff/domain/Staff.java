package ci.company.eduops.staff.domain;

import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.common.domain.ContractType;
import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.school.domain.School;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.UUID;

/** Non-teaching staff: secretary, accountant, cashier, supervisor... */
@Entity
@Table(name = "staff")
@Getter
@Setter
public class Staff extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campus_id")
    private Campus campus;

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

    @Column(name = "email", length = 180)
    private String email;

    @Column(name = "phone", length = 40)
    private String phone;

    @Column(name = "job_title", nullable = false, length = 150)
    private String jobTitle;

    @Column(name = "department", length = 120)
    private String department;

    @Column(name = "hire_date", nullable = false)
    private LocalDate hireDate;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "contract_type", nullable = false, columnDefinition = "contract_type")
    private ContractType contractType = ContractType.PERMANENT;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "staff_status")
    private StaffStatus status = StaffStatus.ACTIVE;

    @Column(name = "user_account_id")
    private UUID userAccountId;

    public String fullName() {
        return firstName + " " + lastName;
    }
}
