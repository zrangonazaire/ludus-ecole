package ci.company.eduops.student.dto.request;

import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import ci.company.eduops.common.domain.Gender;

import java.time.LocalDate;

/**
 * Payload of {@code PUT /api/v1/students/{id}}.
 *
 * <p>Partial by contract: a null field means « leave unchanged ». The
 * matricule and the status are deliberately absent — one is immutable, the
 * other moves only through the guarded transitions.</p>
 */
public class StudentUpdateRequest {

    @PositiveOrZero
    private Long version;
    private Gender gender;
    @Size(max = 80)
    private String middleName;
    @Size(max = 120)
    private String city;

    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }
    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }
    public String getMiddleName() { return middleName; }
    public void setMiddleName(String middleName) { this.middleName = middleName; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    @Pattern(regexp = "(?s).*\\S.*", message = "Le prénom est obligatoire")
    @Size(max = 80, message = "Le prénom ne doit pas dépasser 80 caractères")
    private String firstName;

    @Pattern(regexp = "(?s).*\\S.*", message = "Le nom est obligatoire")
    @Size(max = 80, message = "Le nom ne doit pas dépasser 80 caractères")
    private String lastName;

    @Past(message = "La date de naissance doit être dans le passé")
    private LocalDate birthDate;

    @Size(max = 120)
    private String birthPlace;

    @Size(max = 80)
    private String nationality;

    @Email
    @Size(max = 160)
    private String email;

    @Size(max = 40)
    private String phone;

    @Size(max = 200)
    private String address;

    @Size(max = 160)
    private String previousSchool;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPreviousSchool() {
        return previousSchool;
    }

    public void setPreviousSchool(String previousSchool) {
        this.previousSchool = previousSchool;
    }
}
