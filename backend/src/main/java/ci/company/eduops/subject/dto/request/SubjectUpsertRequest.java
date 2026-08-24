package ci.company.eduops.subject.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Creates or edits one subject in the school catalogue.
 *
 * <p>No coefficient here on purpose. A subject is the same object across the
 * whole school; what changes from one level to the next is its weight, and that
 * belongs to the curriculum.</p>
 */
@Schema(name = "SubjectUpsertRequest", description = "Création ou modification d'une matière")
public class SubjectUpsertRequest {

    @NotBlank
    @Size(max = 20)
    @Schema(description = "Code court, unique dans l'établissement", example = "MATH",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String code;

    @NotBlank
    @Size(max = 150)
    @Schema(example = "Mathématiques", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Size(max = 40)
    @Schema(description = "Abréviation affichée dans les grilles serrées", example = "Maths")
    private String shortName;

    @Schema(description = "SCIENCE, LITERATURE, LANGUAGE, ARTS, SPORT, TECHNICAL, RELIGION, CIVICS, OTHER",
            example = "SCIENCE")
    private String category;

    @Pattern(regexp = "^#[0-9A-Fa-f]{6}$",
            message = "La couleur doit être au format #RRGGBB.")
    @Schema(description = "Couleur d'identification, utilisée dans l'emploi du temps",
            example = "#2563EB")
    private String colorHex;

    @Size(max = 255)
    private String description;

    @Schema(description = "Fausse pour une matière qui n'entre dans aucune moyenne, "
            + "comme « Vie scolaire »", example = "true")
    private boolean graded = true;

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

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getColorHex() {
        return colorHex;
    }

    public void setColorHex(String colorHex) {
        this.colorHex = colorHex;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isGraded() {
        return graded;
    }

    public void setGraded(boolean graded) {
        this.graded = graded;
    }
}
