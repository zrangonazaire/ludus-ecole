package ci.company.eduops.health.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

/** Creates or updates the health file of one pupil. */
public class HealthRecordRequest {

    @NotNull
    private UUID studentId;

    @Size(max = 10)
    private String bloodGroup;

    @Size(max = 160)
    private String physicianName;

    @Size(max = 40)
    private String physicianPhone;

    @Size(max = 160)
    private String insuranceName;

    @Size(max = 80)
    private String insuranceNumber;

    private String notes;

    private boolean careConsent;

    private LocalDate consentSignedOn;

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getPhysicianName() {
        return physicianName;
    }

    public void setPhysicianName(String physicianName) {
        this.physicianName = physicianName;
    }

    public String getPhysicianPhone() {
        return physicianPhone;
    }

    public void setPhysicianPhone(String physicianPhone) {
        this.physicianPhone = physicianPhone;
    }

    public String getInsuranceName() {
        return insuranceName;
    }

    public void setInsuranceName(String insuranceName) {
        this.insuranceName = insuranceName;
    }

    public String getInsuranceNumber() {
        return insuranceNumber;
    }

    public void setInsuranceNumber(String insuranceNumber) {
        this.insuranceNumber = insuranceNumber;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public boolean isCareConsent() {
        return careConsent;
    }

    public void setCareConsent(boolean careConsent) {
        this.careConsent = careConsent;
    }

    public LocalDate getConsentSignedOn() {
        return consentSignedOn;
    }

    public void setConsentSignedOn(LocalDate consentSignedOn) {
        this.consentSignedOn = consentSignedOn;
    }
}
