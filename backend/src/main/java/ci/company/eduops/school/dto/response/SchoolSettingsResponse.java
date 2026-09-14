package ci.company.eduops.school.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Paramètres de l'établissement, tels qu'ils sont réellement enregistrés.
 *
 * <p>L'écran d'administration lit ici sa seule source de vérité : le code et
 * le statut sont retournés pour être montrés, mais rien dans l'écran ne
 * prétend les modifier — ils ne sont modifiables nulle part.</p>
 */
@Getter
@Setter
@Schema(name = "SchoolSettings", description = "Paramètres de l'établissement")
public class SchoolSettingsResponse {

    private UUID id;

    @Schema(description = "Code unique de l'établissement, non modifiable", example = "HORIZON")
    private String code;

    @Schema(description = "Statut de l'établissement, non modifiable ici", example = "ACTIVE")
    private String status;

    private String name;
    private String legalName;
    private String motto;
    private String registrationNumber;
    private String email;
    private String phone;
    private String website;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String country;

    @Schema(example = "XOF")
    private String currency;

    @Schema(example = "fr-CI")
    private String locale;

    @Schema(example = "Africa/Abidjan")
    private String timezone;

    @Schema(example = "20.000")
    private BigDecimal gradingScaleMax;

    private boolean rankingEnabled;

    @Schema(example = "EDU-{year}-{seq:6}")
    private String studentNumberPattern;

    @Schema(example = "REC-{year}-{seq:8}")
    private String receiptNumberPattern;

    @Schema(example = "INV-{year}-{seq:8}")
    private String invoiceNumberPattern;
}
