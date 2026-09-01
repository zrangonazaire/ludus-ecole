package ci.company.eduops.health.domain;

import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.student.domain.Student;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * The health file of one pupil.
 *
 * <p>It follows the child, not the school year: allergies do not reset in
 * September. Only visits and examinations are tied to a year, because those
 * are events.</p>
 *
 * <p>It lives apart from {@code Student} so that reading it can be granted
 * separately. The pupil's administrative record is open to the whole office;
 * this is not.</p>
 */
@Entity
@Table(name = "student_health_record")
@Getter
@Setter
public class StudentHealthRecord extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private Student student;

    @Column(name = "blood_group", length = 10)
    private String bloodGroup;

    @Column(name = "physician_name", length = 160)
    private String physicianName;

    @Column(name = "physician_phone", length = 40)
    private String physicianPhone;

    @Column(name = "insurance_name", length = 160)
    private String insuranceName;

    @Column(name = "insurance_number", length = 80)
    private String insuranceNumber;

    @Column(name = "notes")
    private String notes;

    /**
     * The parents' written permission to give first aid.
     *
     * <p>Without it the infirmary may only call the family. Recording it here
     * saves hunting for the paper at the moment it matters.</p>
     */
    @Column(name = "care_consent", nullable = false)
    private boolean careConsent;

    @Column(name = "consent_signed_on")
    private LocalDate consentSignedOn;

    @Column(name = "reviewed_on")
    private LocalDate reviewedOn;

    @Column(name = "reviewed_by")
    private UUID reviewedBy;

    @OneToMany(mappedBy = "healthRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("severity DESC, declaredOn DESC")
    private List<HealthCondition> conditions = new ArrayList<>();

    @OneToMany(mappedBy = "healthRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentVaccination> vaccinations = new ArrayList<>();

    /** The conditions supervising staff are told about. */
    public List<HealthCondition> alerts() {
        return conditions.stream()
                .filter(HealthCondition::isActive)
                .filter((condition) -> condition.getSeverity().isAlert())
                .toList();
    }

    /**
     * Records the consent, keeping the signature date consistent with it.
     *
     * <p>Consent without a date could not be produced if it were contested,
     * and a date left behind after a withdrawal would suggest a permission
     * that no longer holds.</p>
     */
    public void setConsent(boolean granted, LocalDate signedOn) {
        this.careConsent = granted;
        this.consentSignedOn = granted ? signedOn : null;
    }

    public void markReviewed(LocalDate on, UUID userId) {
        this.reviewedOn = on;
        this.reviewedBy = userId;
    }
}
