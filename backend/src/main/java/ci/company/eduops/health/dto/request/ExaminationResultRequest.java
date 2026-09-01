package ci.company.eduops.health.dto.request;

import ci.company.eduops.health.domain.ExaminationOutcome;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

/** Records the finding of an examination that has taken place. */
public class ExaminationResultRequest {

    @NotNull
    private ExaminationOutcome outcome;

    private LocalDate performedOn;

    /**
     * The restriction to apply. Mandatory for a fit-with-reserve finding: the
     * physical education teacher cannot adapt to a reserve nobody wrote down.
     */
    @Size(max = 300)
    private String restriction;

    @Size(max = 160)
    private String practitioner;

    private String notes;

    public ExaminationOutcome getOutcome() {
        return outcome;
    }

    public void setOutcome(ExaminationOutcome outcome) {
        this.outcome = outcome;
    }

    public LocalDate getPerformedOn() {
        return performedOn;
    }

    public void setPerformedOn(LocalDate performedOn) {
        this.performedOn = performedOn;
    }

    public String getRestriction() {
        return restriction;
    }

    public void setRestriction(String restriction) {
        this.restriction = restriction;
    }

    public String getPractitioner() {
        return practitioner;
    }

    public void setPractitioner(String practitioner) {
        this.practitioner = practitioner;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
