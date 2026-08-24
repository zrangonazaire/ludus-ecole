package ci.company.eduops.finance.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Creates or edits one kind of fee: inscription, scolarité, cantine…
 *
 * <p>No amount here. A fee type is the same object across the whole school;
 * what changes from one level to the next is its price, and that belongs to the
 * fee schedule.</p>
 */
@Schema(name = "FeeTypeUpsertRequest", description = "Création ou modification d'un type de frais")
public class FeeTypeUpsertRequest {

    @NotBlank
    @Size(max = 40)
    @Schema(description = "Code court, unique dans l'établissement", example = "SCOL",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String code;

    @NotBlank
    @Size(max = 150)
    @Schema(example = "Scolarité annuelle", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Schema(description = "REGISTRATION, TUITION, EXAM, ACTIVITY, UNIFORM, TRANSPORT, "
            + "CANTEEN ou OTHER", example = "TUITION")
    private String category;

    @Schema(description = "ONE_TIME, ANNUAL, TERM ou MONTHLY", example = "ANNUAL")
    private String recurrence;

    @Schema(description = "Faux pour un frais facultatif — cantine, transport. "
            + "Les frais facultatifs ne sont pas générés d'office à l'inscription.",
            example = "true")
    private boolean mandatory = true;

    @Schema(description = "Vrai quand le frais peut être remboursé", example = "false")
    private boolean refundable;

    @Size(max = 255)
    private String description;

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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getRecurrence() {
        return recurrence;
    }

    public void setRecurrence(String recurrence) {
        this.recurrence = recurrence;
    }

    public boolean isMandatory() {
        return mandatory;
    }

    public void setMandatory(boolean mandatory) {
        this.mandatory = mandatory;
    }

    public boolean isRefundable() {
        return refundable;
    }

    public void setRefundable(boolean refundable) {
        this.refundable = refundable;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
