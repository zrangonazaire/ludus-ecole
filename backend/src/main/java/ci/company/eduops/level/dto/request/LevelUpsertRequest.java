package ci.company.eduops.level.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

/**
 * Creates or edits one grade level inside a cycle.
 *
 * <p>The level stays inside its cycle for life: moving a level across cycles
 * would orphan its classrooms, curricula and fee schedules, so the cycle can
 * only be chosen at creation.</p>
 */
@Schema(name = "LevelUpsertRequest", description = "Création ou modification d'un niveau")
public class LevelUpsertRequest {

    @NotNull
    @Schema(description = "Cycle d'accueil. Figé après la création.",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID cycleId;

    @NotBlank
    @Size(max = 30)
    @Schema(description = "Code court, unique dans le cycle",
            example = "6EME", requiredMode = Schema.RequiredMode.REQUIRED)
    private String code;

    @NotBlank
    @Size(max = 120)
    @Schema(example = "Sixième", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Size(max = 30)
    @Schema(description = "Abréviation affichée dans les grilles serrées", example = "6e")
    private String shortName;

    @Min(1)
    @Schema(description = "Rang dans le cycle, à partir de 1", example = "1",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private int sequence = 1;

    @Schema(description = "Niveau de destination en cas de passage. "
            + "Ignoré quand le niveau est terminal.")
    private UUID nextLevelId;

    @Schema(description = "Vrai pour le dernier niveau du cycle : "
            + "un passage y mène à la sortie, pas à un niveau suivant",
            example = "false")
    private boolean terminal;

    public UUID getCycleId() {
        return cycleId;
    }

    public void setCycleId(UUID cycleId) {
        this.cycleId = cycleId;
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

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public UUID getNextLevelId() {
        return nextLevelId;
    }

    public void setNextLevelId(UUID nextLevelId) {
        this.nextLevelId = nextLevelId;
    }

    public boolean isTerminal() {
        return terminal;
    }

    public void setTerminal(boolean terminal) {
        this.terminal = terminal;
    }
}
