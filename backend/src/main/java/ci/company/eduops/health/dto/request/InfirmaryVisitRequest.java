package ci.company.eduops.health.dto.request;

import ci.company.eduops.health.domain.InfirmaryOutcome;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

/** Records one passage through the infirmary. */
public class InfirmaryVisitRequest {

    @NotNull
    private UUID studentId;

    private OffsetDateTime occurredAt;

    @NotBlank
    @Size(max = 200)
    private String complaint;

    /** Required: an empty line in a care register proves nothing later. */
    @NotBlank
    private String careGiven;

    @DecimalMin("30.0")
    @DecimalMax("45.0")
    private BigDecimal temperatureCelsius;

    @NotNull
    private InfirmaryOutcome outcome;

    private String notes;

    /** True when the family has actually been reached, not merely called. */
    private boolean guardianNotified;

    @Size(max = 200)
    private String referredTo;

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public OffsetDateTime getOccurredAt() {
        return occurredAt;
    }

    public void setOccurredAt(OffsetDateTime occurredAt) {
        this.occurredAt = occurredAt;
    }

    public String getComplaint() {
        return complaint;
    }

    public void setComplaint(String complaint) {
        this.complaint = complaint;
    }

    public String getCareGiven() {
        return careGiven;
    }

    public void setCareGiven(String careGiven) {
        this.careGiven = careGiven;
    }

    public BigDecimal getTemperatureCelsius() {
        return temperatureCelsius;
    }

    public void setTemperatureCelsius(BigDecimal temperatureCelsius) {
        this.temperatureCelsius = temperatureCelsius;
    }

    public InfirmaryOutcome getOutcome() {
        return outcome;
    }

    public void setOutcome(InfirmaryOutcome outcome) {
        this.outcome = outcome;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public boolean isGuardianNotified() {
        return guardianNotified;
    }

    public void setGuardianNotified(boolean guardianNotified) {
        this.guardianNotified = guardianNotified;
    }

    public String getReferredTo() {
        return referredTo;
    }

    public void setReferredTo(String referredTo) {
        this.referredTo = referredTo;
    }
}
