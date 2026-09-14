package ci.company.eduops.school.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Édition des paramètres de l'établissement.
 *
 * <p>Le code de l'établissement et son statut n'y figurent pas : le code
 * identifie l'école dans les séquences de numérotation et sur les documents
 * officiels, le statut décide de ce que le système accepte encore — ni l'un
 * ni l'autre ne se change au milieu d'un formulaire d'adresse.</p>
 */
@Getter
@Setter
public class SchoolSettingsUpdateRequest {

    @NotBlank
    @Size(max = 200)
    private String name;

    @Size(max = 255)
    private String legalName;

    @Size(max = 255)
    private String motto;

    @Size(max = 80)
    private String registrationNumber;

    @Size(max = 180)
    @Email
    private String email;

    @Size(max = 40)
    private String phone;

    @Size(max = 200)
    private String website;

    @Size(max = 200)
    private String addressLine1;

    @Size(max = 200)
    private String addressLine2;

    @Size(max = 120)
    private String city;

    @NotBlank
    @Size(max = 120)
    private String country;

    @NotBlank
    @Pattern(regexp = "[A-Z]{3}", message = "Le code devise s'écrit sur trois majuscules, ex. XOF")
    private String currency;

    @NotBlank
    @Size(max = 10)
    private String locale;

    @NotBlank
    @Size(max = 60)
    private String timezone;

    /** Note maximale de l'échelle de notation, 20 dans la plupart des écoles. */
    @NotNull
    @DecimalMin(value = "0.000", message = "L'échelle de notation doit être strictement positive")
    @DecimalMax(value = "1000", message = "L'échelle de notation ne peut excéder 1000")
    private BigDecimal gradingScaleMax;

    /** Classement des élèves dans les bulletins : activé ou non pour tous. */
    private boolean rankingEnabled;

    @NotBlank
    @Size(max = 80)
    private String studentNumberPattern;

    @NotBlank
    @Size(max = 80)
    private String receiptNumberPattern;

    @NotBlank
    @Size(max = 80)
    private String invoiceNumberPattern;
}
