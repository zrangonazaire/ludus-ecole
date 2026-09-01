package ci.company.eduops.health.dto.response;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** The full health file. Never returned without HEALTH_RECORD_VIEW. */
public class HealthRecordResponse {

    private UUID id;
    private UUID studentId;
    private String studentNumber;
    private String studentName;
    private String classroomName;
    private String bloodGroup;
    private String physicianName;
    private String physicianPhone;
    private String insuranceName;
    private String insuranceNumber;
    private String notes;
    private boolean careConsent;
    private LocalDate consentSignedOn;
    private LocalDate reviewedOn;
    private List<HealthConditionResponse> conditions = new ArrayList<>();
    private List<VaccinationResponse> vaccinations = new ArrayList<>();
    private int alertCount;
    /** Nombre de vaccins exigés dont la preuve manque encore. */
    private int missingVaccineCount;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getClassroomName() {
        return classroomName;
    }

    public void setClassroomName(String classroomName) {
        this.classroomName = classroomName;
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

    public LocalDate getReviewedOn() {
        return reviewedOn;
    }

    public void setReviewedOn(LocalDate reviewedOn) {
        this.reviewedOn = reviewedOn;
    }

    public List<HealthConditionResponse> getConditions() {
        return conditions;
    }

    public void setConditions(List<HealthConditionResponse> conditions) {
        this.conditions = conditions;
    }

    public List<VaccinationResponse> getVaccinations() {
        return vaccinations;
    }

    public void setVaccinations(List<VaccinationResponse> vaccinations) {
        this.vaccinations = vaccinations;
    }

    public int getAlertCount() {
        return alertCount;
    }

    public void setAlertCount(int alertCount) {
        this.alertCount = alertCount;
    }

    public int getMissingVaccineCount() {
        return missingVaccineCount;
    }

    public void setMissingVaccineCount(int missingVaccineCount) {
        this.missingVaccineCount = missingVaccineCount;
    }
}
