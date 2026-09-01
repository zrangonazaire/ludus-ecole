package ci.company.eduops.health.domain;

import ci.company.eduops.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/** What the school has seen of one vaccine, for one pupil. */
@Entity
@Table(name = "student_vaccination")
@Getter
@Setter
public class StudentVaccination extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "health_record_id", nullable = false)
    private StudentHealthRecord healthRecord;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vaccine_id", nullable = false)
    private Vaccine vaccine;

    @Column(name = "doses_received", nullable = false)
    private short dosesReceived;

    @Column(name = "last_dose_on")
    private LocalDate lastDoseOn;

    @Column(name = "next_dose_due_on")
    private LocalDate nextDoseDueOn;

    /**
     * True only once the booklet has been shown at the office.
     *
     * <p>A family saying so is not the same as having seen it, and the
     * follow-up list would be worthless if the two counted alike.</p>
     */
    @Column(name = "certificate_seen", nullable = false)
    private boolean certificateSeen;

    @Column(name = "notes", length = 300)
    private String notes;

    /** Whether every expected dose has been recorded and evidenced. */
    public boolean isComplete() {
        return certificateSeen && dosesReceived >= vaccine.getDosesExpected();
    }

    /** Whether this vaccine is one the school follows up on when missing. */
    public boolean isOutstanding() {
        return vaccine.isRequired() && vaccine.isActive() && !isComplete();
    }
}
