package ci.company.eduops.finance.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Création ou modification d'une rubrique de frais de l'école.
 *
 * <p>Le code est court, stable et sert de clé référencée par les types de
 * frais ; le libellé est ce que les familles lisent sur les reçus.</p>
 */
@Schema(name = "FeeCategoryUpsertRequest",
        description = "Création ou modification d'une catégorie de frais")
public class FeeCategoryUpsertRequest {

    @NotBlank
    @Size(max = 40)
    @Schema(description = "Code court, unique dans l'établissement",
            example = "DOSSIER", requiredMode = Schema.RequiredMode.REQUIRED)
    private String code;

    @NotBlank
    @Size(max = 150)
    @Schema(example = "Frais de dossier", requiredMode = Schema.RequiredMode.REQUIRED)
    private String label;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
