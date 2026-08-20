package ci.company.eduops.guardian.domain;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.common.entity.AuditableEntity;
import ci.company.eduops.notification.domain.NotificationChannel;
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

import java.util.UUID;

/** A parent or legal representative. One guardian may follow several children. */
@Entity
@Table(name = "guardian")
@Getter
@Setter
public class Guardian extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

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

    @Column(name = "phone", nullable = false, length = 40)
    private String phone;

    @Column(name = "phone_secondary", length = 40)
    private String phoneSecondary;

    @Column(name = "national_id", length = 80)
    private String nationalId;

    @Column(name = "profession", length = 150)
    private String profession;

    @Column(name = "employer", length = 150)
    private String employer;

    @Column(name = "address_line1", length = 200)
    private String addressLine1;

    @Column(name = "city", length = 120)
    private String city;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "preferred_channel", nullable = false, columnDefinition = "notification_channel")
    private NotificationChannel preferredChannel = NotificationChannel.EMAIL;

    /** Set once the parent portal account is created. */
    @Column(name = "user_account_id")
    private UUID userAccountId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "common_status")
    private CommonStatus status = CommonStatus.ACTIVE;

    public String fullName() {
        return firstName + " " + lastName;
    }
}
