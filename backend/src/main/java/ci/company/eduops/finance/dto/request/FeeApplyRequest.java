package ci.company.eduops.finance.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Applies the same price to several levels at once.
 *
 * <p>Tuition usually rises with the level, but the other fees — inscription,
 * cantine, transport — are the same for everyone. Typing the same figure
 * sixteen times is sixteen chances to add a zero.</p>
 */
@Schema(name = "FeeApplyRequest", description = "Application d'un même tarif à plusieurs niveaux")
public class FeeApplyRequest {

    @NotEmpty(message = "Choisissez au moins un niveau.")
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<UUID> levelIds = new ArrayList<>();

    @NotNull
    @Valid
    @Schema(description = "Le tarif à appliquer. Son champ levelId est ignoré : "
            + "chaque niveau de la liste reçoit sa propre copie.",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private FeeScheduleUpsertRequest schedule;

    @Schema(description = "Vrai pour écraser un tarif déjà défini sur ces niveaux, "
            + "faux pour ne remplir que les niveaux sans tarif", example = "false")
    private boolean replaceExisting;

    public List<UUID> getLevelIds() {
        return levelIds;
    }

    public void setLevelIds(List<UUID> levelIds) {
        this.levelIds = levelIds;
    }

    public FeeScheduleUpsertRequest getSchedule() {
        return schedule;
    }

    public void setSchedule(FeeScheduleUpsertRequest schedule) {
        this.schedule = schedule;
    }

    public boolean isReplaceExisting() {
        return replaceExisting;
    }

    public void setReplaceExisting(boolean replaceExisting) {
        this.replaceExisting = replaceExisting;
    }
}
