package ci.company.eduops.student.dto.response;

import ci.company.eduops.enrollment.dto.response.EnrollmentResponse;
import ci.company.eduops.finance.dto.response.StudentFinancialSummaryResponse;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * The pupil's file.
 *
 * <p>Extends the list row rather than repeating it: the screen navigates from
 * one to the other, and two drifting definitions of « the same pupil » would
 * show a different class on the list and on the file.</p>
 *
 * <p>No medical field here. The blood group and the medical notes moved to the
 * health record in V37 precisely so that reading them can be granted
 * separately — the administrative file is open to the whole office, the
 * medical one is not.</p>
 */
public class StudentDetailResponse extends StudentSummaryResponse {

    private String middleName;
    private String birthPlace;
    private String nationality;
    private String email;
    private String phone;
    private String addressLine1;
    private String city;
    private boolean hasDisability;
    private LocalDate admissionDate;
    private String previousSchool;
    private List<GuardianLinkResponse> guardians = new ArrayList<>();
    private EnrollmentResponse currentEnrollment;
    private StudentFinancialSummaryResponse financialSummary;

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getBirthPlace() {
        return birthPlace;
    }

    public void setBirthPlace(String birthPlace) {
        this.birthPlace = birthPlace;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public boolean isHasDisability() {
        return hasDisability;
    }

    public void setHasDisability(boolean hasDisability) {
        this.hasDisability = hasDisability;
    }

    public LocalDate getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(LocalDate admissionDate) {
        this.admissionDate = admissionDate;
    }

    public String getPreviousSchool() {
        return previousSchool;
    }

    public void setPreviousSchool(String previousSchool) {
        this.previousSchool = previousSchool;
    }

    public List<GuardianLinkResponse> getGuardians() {
        return guardians;
    }

    public void setGuardians(List<GuardianLinkResponse> guardians) {
        this.guardians = guardians;
    }

    public EnrollmentResponse getCurrentEnrollment() {
        return currentEnrollment;
    }

    public void setCurrentEnrollment(EnrollmentResponse currentEnrollment) {
        this.currentEnrollment = currentEnrollment;
    }

    public StudentFinancialSummaryResponse getFinancialSummary() {
        return financialSummary;
    }

    public void setFinancialSummary(StudentFinancialSummaryResponse financialSummary) {
        this.financialSummary = financialSummary;
    }
}
