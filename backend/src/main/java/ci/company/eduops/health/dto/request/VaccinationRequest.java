package ci.company.eduops.health.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

/** Records what the office has seen of one vaccine, for one pupil. */
public class VaccinationRequest {

    @NotNull
    private UUID studentId;

    @NotNull
    private UUID vaccineId;

    @Min(0)
    private short dosesReceived;

    private LocalDate lastDoseOn;

    private LocalDate nextDoseDueOn;

    /** Only ticked when the booklet was actually produced at the office. */
    private boolean certificateSeen;

    @Size(max = 300)
    private String notes;

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public UUID getVaccineId() {
        return vaccineId;
    }

    public void setVaccineId(UUID vaccineId) {
        this.vaccineId = vaccineId;
    }

    public short getDosesReceived() {
        return dosesReceived;
    }

    public void setDosesReceived(short dosesReceived) {
        this.dosesReceived = dosesReceived;
    }

    public LocalDate getLastDoseOn() {
        return lastDoseOn;
    }

    public void setLastDoseOn(LocalDate lastDoseOn) {
        this.lastDoseOn = lastDoseOn;
    }

    public LocalDate getNextDoseDueOn() {
        return nextDoseDueOn;
    }

    public void setNextDoseDueOn(LocalDate nextDoseDueOn) {
        this.nextDoseDueOn = nextDoseDueOn;
    }

    public boolean isCertificateSeen() {
        return certificateSeen;
    }

    public void setCertificateSeen(boolean certificateSeen) {
        this.certificateSeen = certificateSeen;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
