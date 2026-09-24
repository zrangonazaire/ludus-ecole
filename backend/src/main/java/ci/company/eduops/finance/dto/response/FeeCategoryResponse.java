package ci.company.eduops.finance.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

/** Une rubrique de frais déclarée par l'établissement. */
@Schema(name = "FeeCategory", description = "Une catégorie de frais")
public class FeeCategoryResponse {

    private UUID id;
    private String code;
    private String label;
    private String status;

    @Schema(example = "2", description = "Nombre de types de frais ACTIFS utilisant cette catégorie")
    private long feeTypeCount;

    @Schema(description = "Faux tant que des types de frais actifs la référencent")
    private boolean deletable;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getFeeTypeCount() {
        return feeTypeCount;
    }

    public void setFeeTypeCount(long feeTypeCount) {
        this.feeTypeCount = feeTypeCount;
    }

    public boolean isDeletable() {
        return deletable;
    }

    public void setDeletable(boolean deletable) {
        this.deletable = deletable;
    }
}
