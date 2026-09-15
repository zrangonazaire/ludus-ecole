package ci.company.eduops.campus.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Création ou édition d'un campus.
 *
 * <p>{@code main} ne peut être rendu {@code true} que si aucun autre campus de
 * l'établissement n'est déjà principal — le service rejette la demande avec
 * {@link ci.company.eduops.common.exception.ErrorCode#CAMPUS_MAIN_EXISTS}.</p>
 */
@Schema(name = "CampusUpsertRequest", description = "Création ou modification d'un campus")
public class CampusUpsertRequest {

    @NotBlank
    @Size(max = 30)
    @Schema(description = "Code court, unique dans l'établissement", example = "SITE-A",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String code;

    @NotBlank
    @Size(max = 200)
    @Schema(description = "Nom officiel du site", example = "Campus de Lomé",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Size(max = 200)
    @Schema(description = "Adresse postale", example = "B.P. 123, Lomé")
    private String addressLine1;

    @Size(max = 120)
    @Schema(description = "Commune / ville", example = "Lomé")
    private String city;

    @Size(max = 40)
    @Schema(description = "Téléphone du site", example = "+228 90 10 10 10")
    private String phone;

    @Size(max = 180)
    @Schema(description = "Courriel du site", example = "contact@site-a.edu")
    private String email;

    @Schema(description = "Ce campus est le site principal de l'établissement",
            example = "false")
    private Boolean main = false;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Boolean getMain() {
        return main;
    }

    public void setMain(Boolean main) {
        this.main = main;
    }
}
