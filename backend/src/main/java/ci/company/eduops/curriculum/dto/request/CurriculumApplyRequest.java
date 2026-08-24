package ci.company.eduops.curriculum.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Applies the same set of subjects and coefficients to several levels at once.
 *
 * <p>Within a cycle, the programme rarely changes from one level to the next:
 * a 6ᵉ and a 5ᵉ study the same subjects with the same weights. Filling the
 * table four times by hand is four opportunities to mistype a coefficient, and
 * a mistyped coefficient is invisible until the first report card.</p>
 */
@Schema(name = "CurriculumApplyRequest",
        description = "Application d'un même programme à plusieurs niveaux")
public class CurriculumApplyRequest {

    @NotEmpty(message = "Choisissez au moins un niveau.")
    @Schema(description = "Niveaux qui recevront ce programme",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private List<UUID> levelIds = new ArrayList<>();

    @Valid
    @NotEmpty(message = "Choisissez au moins une matière.")
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private List<CurriculumSubjectUpsertRequest> subjects = new ArrayList<>();

    @Schema(description = "Vrai pour remplacer le programme existant, "
            + "faux pour n'ajouter que les matières absentes", example = "false")
    private boolean replaceExisting;

    public List<UUID> getLevelIds() {
        return levelIds;
    }

    public void setLevelIds(List<UUID> levelIds) {
        this.levelIds = levelIds;
    }

    public List<CurriculumSubjectUpsertRequest> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<CurriculumSubjectUpsertRequest> subjects) {
        this.subjects = subjects;
    }

    public boolean isReplaceExisting() {
        return replaceExisting;
    }

    public void setReplaceExisting(boolean replaceExisting) {
        this.replaceExisting = replaceExisting;
    }
}
