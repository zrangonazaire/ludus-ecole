package ci.company.eduops.reportcard.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

/** Generation of a whole class's report cards for one term. */
@Schema(name = "ReportCardGenerate", description = "La génération des bulletins d'une classe")
public class ReportCardGenerateRequest {

    @NotNull
    private UUID classroomId;

    @NotNull
    private UUID termId;

    @Schema(description = "Vrai pour recalculer les bulletins déjà générés. Les "
            + "bulletins publiés ne sont jamais écrasés : ils repartent en révision "
            + "suivante, l'ancienne restant consultable.")
    private boolean regenerate;

    public UUID getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(UUID classroomId) {
        this.classroomId = classroomId;
    }

    public UUID getTermId() {
        return termId;
    }

    public void setTermId(UUID termId) {
        this.termId = termId;
    }

    public boolean isRegenerate() {
        return regenerate;
    }

    public void setRegenerate(boolean regenerate) {
        this.regenerate = regenerate;
    }
}
