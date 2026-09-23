package ci.company.eduops.school.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * Apparence et région telles qu'enregistrées : couleur, taille, devise,
 * langue et fuseau.
 */
@Getter
@Setter
@Schema(name = "Appearance", description = "Apparence et région de l'établissement")
public class AppearanceResponse {

    @Schema(example = "#1f5fd6")
    private String brand;

    @Schema(example = "normal", allowableValues = {"small", "normal", "large"})
    private String fontSize;

    @Schema(example = "XOF")
    private String currency;

    @Schema(example = "fr-CI")
    private String locale;

    @Schema(example = "Africa/Abidjan")
    private String timezone;
}
