package ci.company.eduops.enrollment.dto.request;

import ci.company.eduops.common.domain.Gender;
import ci.company.eduops.guardian.domain.GuardianRelationship;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

/**
 * Inline identity of a student who does not exist yet, supplied by the
 * {@code /enrollments/new} wizard in "Nouvel élève" mode.
 *
 * <p>When {@code EnrollmentCreateRequest.studentId} is absent the backend
 * creates the {@code Student} (and optionally the {@code Guardian}) from
 * this payload before performing the rest of the enrollment transaction.</p>
 */
public class NewStudentPayload {

    @NotBlank
    @Size(max = 120)
    private String firstName;

    @NotBlank
    @Size(max = 120)
    private String lastName;

    @Size(max = 120)
    private String middleName;

    @NotNull
    private Gender gender;

    @NotNull
    private LocalDate birthDate;

    @Size(max = 150)
    private String birthPlace;

    @Size(max = 120)
    private String nationality;

    @Size(max = 80)
    private String nationalId;

    @Size(max = 180)
    private String email;

    @Size(max = 40)
    private String phone;

    @Size(max = 200)
    private String addressLine1;

    @Size(max = 120)
    private String city;

    @Size(max = 200)
    private String previousSchool;

    private NewGuardianPayload guardian;

    // ----------------------------------------------------------------- student

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
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

    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
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

    public String getPreviousSchool() {
        return previousSchool;
    }

    public void setPreviousSchool(String previousSchool) {
        this.previousSchool = previousSchool;
    }

    public NewGuardianPayload getGuardian() {
        return guardian;
    }

    public void setGuardian(NewGuardianPayload guardian) {
        this.guardian = guardian;
    }

    // --------------------------------------------------------------- guardian

    /**
     * Legal guardian captured alongside the student identity. The wizard
     * always collects one guardian; the server creates or re-uses an existing
     * guardian matched by phone number before linking it to the new student.
     */
    public static class NewGuardianPayload {

        @NotBlank
        @Size(max = 120)
        private String firstName;

        @NotBlank
        @Size(max = 120)
        private String lastName;

        @NotBlank
        @Size(max = 40)
        private String phone;

        @Size(max = 180)
        private String email;

        @NotNull
        private GuardianRelationship relationship;

        private boolean financialResponsibility;

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public GuardianRelationship getRelationship() {
            return relationship;
        }

        public void setRelationship(GuardianRelationship relationship) {
            this.relationship = relationship;
        }

        public boolean isFinancialResponsibility() {
            return financialResponsibility;
        }

        public void setFinancialResponsibility(boolean financialResponsibility) {
            this.financialResponsibility = financialResponsibility;
        }
    }
}