package ci.company.eduops.room.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

/**
 * Création ou édition d'un bâtiment.
 *
 * <p>{@code floors} compte les niveaux au-dessus du rez-de-chaussée : un
 * bâtiment de plain-pied se saisit à 0, un R+2 à 2. Ce nombre sert à l'écran
 * des salles et aux rapports, pas à contraindre le champ libre {@code floor}
 * des salles — une mezzanine ne rentre dans aucune case.</p>
 */
@Schema(name = "BuildingUpsertRequest", description = "Création ou modification d'un bâtiment")
public class BuildingUpsertRequest {

    @NotNull
    @Schema(description = "Campus auquel le bâtiment appartient", requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID campusId;

    @NotBlank
    @Size(max = 30)
    @Schema(description = "Code court, unique dans le campus", example = "BAT-A",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String code;

    @NotBlank
    @Size(max = 120)
    @Schema(description = "Nom affiché", example = "Bâtiment A",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Min(0)
    @Schema(description = "Nombre d'étages au-dessus du rez-de-chaussée ; 0 = plain-pied", example = "2")
    private int floors;

    public UUID getCampusId() {
        return campusId;
    }

    public void setCampusId(UUID campusId) {
        this.campusId = campusId;
    }

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

    public int getFloors() {
        return floors;
    }

    public void setFloors(int floors) {
        this.floors = floors;
    }
}
