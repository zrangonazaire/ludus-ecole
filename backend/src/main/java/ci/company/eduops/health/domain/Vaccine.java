package ci.company.eduops.health.domain;

import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.school.domain.School;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * A vaccine the school asks to see at enrolment.
 *
 * <p>This is the school's own list, not a medical prescription. Immunisation
 * schedules change and differ from place to place, so the list is data the
 * school edits rather than a constant in the code.</p>
 */
@Entity
@Table(name = "vaccine")
@Getter
@Setter
public class Vaccine extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @Column(name = "code", nullable = false, length = 40)
    private String code;

    @Column(name = "label", nullable = false, length = 160)
    private String label;

    @Column(name = "description", length = 300)
    private String description;

    /** Whether a missing record is followed up. Never a bar to schooling. */
    @Column(name = "required", nullable = false)
    private boolean required = true;

    @Column(name = "doses_expected", nullable = false)
    private short dosesExpected = 1;

    @Column(name = "display_order", nullable = false)
    private short displayOrder;

    @Column(name = "active", nullable = false)
    private boolean active = true;
}
