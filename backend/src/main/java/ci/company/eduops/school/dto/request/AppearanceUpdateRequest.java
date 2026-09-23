package ci.company.eduops.school.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

/**
 * Apparence et région : couleur du portail, taille de police, devise,
 * langue et fuseau d'affichage.
 *
 * <p>La couleur et la taille vivent dans {@code school.settings} (clé
 * {@code appearance}, sans nouvelle table). Devise, langue et fuseau sont les
 * colonnes officielles de l'établissement : les changer ici change les reçus
 * et les documents, pas seulement l'affichage.</p>
 */
@Getter
@Setter
public class AppearanceUpdateRequest {

    @NotBlank
    @Pattern(regexp = "^#[0-9a-fA-F]{6}$",
            message = "La couleur s'écrit en hexadécimal, ex. #1f5fd6")
    private String brand;

    @NotBlank
    @Pattern(regexp = "^(small|normal|large)$",
            message = "La taille vaut small, normal ou large")
    private String fontSize = "normal";

    @NotBlank
    @Pattern(regexp = "[A-Z]{3}", message = "Le code devise s'écrit sur trois majuscules, ex. XOF")
    private String currency;

    @NotBlank
    @Size(max = 10)
    private String locale;

    @NotBlank
    @Size(max = 60)
    private String timezone;
}
