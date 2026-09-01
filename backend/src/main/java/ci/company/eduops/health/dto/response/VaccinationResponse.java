package ci.company.eduops.health.dto.response;

import java.time.LocalDate;
import java.util.UUID;

/** What the school has seen of one vaccine, for one pupil. */
public class VaccinationResponse {

    private UUID id;
    private UUID vaccineId;
    private String vaccineCode;
    private String vaccineLabel;
    private boolean required;
    private short dosesExpected;
    private short dosesReceived;
    private LocalDate lastDoseOn;
    private LocalDate nextDoseDueOn;
    private boolean certificateSeen;
    private String notes;
    private boolean complete;
    /** Vrai quand l'école relance la famille pour ce vaccin. */
    private boolean outstanding;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getVaccineId() {
        return vaccineId;
    }

    public void setVaccineId(UUID vaccineId) {
        this.vaccineId = vaccineId;
    }

    public String getVaccineCode() {
        return vaccineCode;
    }

    public void setVaccineCode(String vaccineCode) {
        this.vaccineCode = vaccineCode;
    }

    public String getVaccineLabel() {
        return vaccineLabel;
    }

    public void setVaccineLabel(String vaccineLabel) {
        this.vaccineLabel = vaccineLabel;
    }

    public boolean isRequired() {
        return required;
    }

    public void setRequired(boolean required) {
        this.required = required;
    }

    public short getDosesExpected() {
        return dosesExpected;
    }

    public void setDosesExpected(short dosesExpected) {
        this.dosesExpected = dosesExpected;
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

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
    }

    public boolean isOutstanding() {
        return outstanding;
    }

    public void setOutstanding(boolean outstanding) {
        this.outstanding = outstanding;
    }
}
