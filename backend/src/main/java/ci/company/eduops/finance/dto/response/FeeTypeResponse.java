package ci.company.eduops.finance.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

/** One kind of fee in the school catalogue. */
@Schema(name = "FeeType", description = "Un type de frais")
public class FeeTypeResponse {

    private UUID id;
    private String code;
    private String name;
    private String category;
    private String categoryLabel;
    private String recurrence;
    private String recurrenceLabel;
    private boolean mandatory;
    private boolean refundable;
    private String description;
    private String status;

    @Schema(example = "12", description = "Nombre de niveaux tarifés pour ce type de frais")
    private int pricedLevels;

    @Schema(description = "Vrai quand aucun tarif et aucun frais élève ne le référencent")
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

    public String getCategoryLabel() {
        return categoryLabel;
    }

    public void setCategoryLabel(String categoryLabel) {
        this.categoryLabel = categoryLabel;
    }

    public String getRecurrence() {
        return recurrence;
    }

    public void setRecurrence(String recurrence) {
        this.recurrence = recurrence;
    }

    public String getRecurrenceLabel() {
        return recurrenceLabel;
    }

    public void setRecurrenceLabel(String recurrenceLabel) {
        this.recurrenceLabel = recurrenceLabel;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getPricedLevels() {
        return pricedLevels;
    }

    public void setPricedLevels(int pricedLevels) {
        this.pricedLevels = pricedLevels;
    }

    public boolean isDeletable() {
        return deletable;
    }

    public void setDeletable(boolean deletable) {
        this.deletable = deletable;
    }
}
