package ci.company.eduops.school.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Public self-service signup: creates a school and its first administrator.
 * No authentication required.
 */
@Schema(name = "SignupRequest", description = "Creates a school and its administrator account")
public class SignupRequest {

    // ---------- the school ----------

    @NotBlank(message = "Le nom de l'établissement est obligatoire")
    @Size(max = 200)
    @Schema(example = "Groupe Scolaire Horizon")
    private String schoolName;

    @NotBlank(message = "Le code établissement est obligatoire")
    @Size(min = 2, max = 30)
    @Pattern(regexp = "^[A-Za-z0-9-]+$",
             message = "Le code ne peut contenir que des lettres, chiffres et tirets")
    @Schema(example = "GSH", description = "Identifiant court, unique sur la plateforme")
    private String schoolCode;

    @Size(max = 120)
    @Schema(example = "Abidjan")
    private String city;

    @Size(max = 120)
    @Schema(example = "Cote d'Ivoire")
    private String country;

    @Size(max = 40)
    private String schoolPhone;

    @Schema(example = "XOF", description = "Devise ISO 4217")
    @Pattern(regexp = "^[A-Z]{3}$", message = "Devise invalide")
    private String currency = "XOF";

    // ---------- the administrator ----------

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(max = 120)
    private String firstName;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 120)
    private String lastName;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format d'email invalide")
    @Size(max = 180)
    private String email;

    @Size(max = 40)
    private String phone;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 10, max = 128, message = "Le mot de passe doit contenir au moins 10 caractères")
    @Schema(description = "Au moins 10 caractères, avec majuscule, minuscule et chiffre")
    private String password;

    @Schema(description = "Acceptation des conditions d'utilisation")
    private boolean acceptedTerms;

    /**
     * Ce que le visiteur a decrit dans « Composer ma demo ».
     *
     * <p>Facultatif : on peut s'inscrire sans etre passe par ce parcours. Mais
     * s'il est fourni, l'ecole est creee deja configuree — sinon le travail
     * demande au visiteur pendant quatre etapes serait jete a l'arrivee.</p>
     */
    @Valid
    private SignupOperationsRequest operations;

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getSchoolCode() {
        return schoolCode;
    }

    public void setSchoolCode(String schoolCode) {
        this.schoolCode = schoolCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getSchoolPhone() {
        return schoolPhone;
    }

    public void setSchoolPhone(String schoolPhone) {
        this.schoolPhone = schoolPhone;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAcceptedTerms() {
        return acceptedTerms;
    }

    public void setAcceptedTerms(boolean acceptedTerms) {
        this.acceptedTerms = acceptedTerms;
    }

    public SignupOperationsRequest getOperations() {
        return operations;
    }

    public void setOperations(SignupOperationsRequest operations) {
        this.operations = operations;
    }
}
