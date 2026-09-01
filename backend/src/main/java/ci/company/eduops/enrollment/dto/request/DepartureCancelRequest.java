package ci.company.eduops.enrollment.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Undoing a departure that should not have been recorded.
 *
 * <p>The reason is mandatory and kept. A pupil who reappears in the class list
 * after having been struck off needs a written explanation, otherwise the next
 * person to look at the file assumes a bug.</p>
 */
@Schema(name = "DepartureCancel", description = "L'annulation d'une sortie enregistrée")
public class DepartureCancelRequest {

    @NotBlank
    @Size(max = 1000)
    @Schema(example = "La famille est revenue sur sa décision, l'élève reprend en 4e A")
    private String reason;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
