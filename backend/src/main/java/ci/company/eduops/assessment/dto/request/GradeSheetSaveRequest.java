package ci.company.eduops.assessment.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.List;

/**
 * A whole grade sheet, saved in one call.
 *
 * <p>Marks travel together because a correction is done in one sitting, and a
 * half-saved sheet cannot be told apart from a class where half the pupils did
 * not sit the paper.</p>
 */
@Schema(name = "GradeSheetSave", description = "Les notes d'un devoir")
public class GradeSheetSaveRequest {

    @NotEmpty
    @Valid
    private List<GradeEntryRequest> entries = new ArrayList<>();

    public List<GradeEntryRequest> getEntries() {
        return entries;
    }

    public void setEntries(List<GradeEntryRequest> entries) {
        this.entries = entries;
    }
}
