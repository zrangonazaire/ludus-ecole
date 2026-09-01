package ci.company.eduops.health.domain;

import ci.company.eduops.common.entity.BaseEntity;
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

/**
 * One line of the health file: an allergy, an illness, a treatment.
 *
 * <p>{@link #getActionToTake()} is the only medical column a supervising
 * member of staff ever sees, and only when the severity makes this an alert.
 * It is written for someone who is not a carer and who must act at once.</p>
 */
@Entity
@Table(name = "health_condition")
@Getter
@Setter
public class HealthCondition extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "health_record_id", nullable = false)
    private StudentHealthRecord healthRecord;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "kind", nullable = false)
    private HealthConditionKind kind;

    @Column(name = "label", nullable = false, length = 160)
    private String label;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "severity", nullable = false)
    private HealthSeverity severity = HealthSeverity.MODERATE;

    @Column(name = "description")
    private String description;

    @Column(name = "action_to_take")
    private String actionToTake;

    @Column(name = "medication", length = 200)
    private String medication;

    /** True when the pupil keeps the treatment on them: inhaler, pen. */
    @Column(name = "self_carried", nullable = false)
    private boolean selfCarried;

    @Column(name = "declared_on", nullable = false)
    private LocalDate declaredOn = LocalDate.now();

    @Column(name = "resolved_on")
    private LocalDate resolvedOn;

    @Column(name = "active", nullable = false)
    private boolean active = true;

    /** Whether supervising staff are told about this one. */
    public boolean isAlert() {
        return active && severity.isAlert();
    }

    /**
     * Closes the condition.
     *
     * <p>Conditions are never deleted. A resolved allergy that turns out to
     * have been resolved too early must still be findable.</p>
     */
    public void resolve(LocalDate on) {
        this.active = false;
        this.resolvedOn = on;
    }

    public void reopen() {
        this.active = true;
        this.resolvedOn = null;
    }
}
