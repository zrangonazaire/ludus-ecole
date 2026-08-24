package ci.company.eduops.finance.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** The price of one fee type on one level, with its payment plan. */
@Schema(name = "FeeSchedule", description = "Le tarif d'un type de frais sur un niveau")
public class FeeScheduleResponse {

    private UUID id;
    private UUID feeTypeId;
    private String feeTypeCode;
    private String feeTypeName;
    private String category;
    private boolean mandatory;

    private UUID levelId;
    private String levelName;

    private String label;
    private BigDecimal totalAmount;
    private String currency;
    private boolean appliesToNewStudents;
    private boolean appliesToReturningStudents;
    private String status;

    private List<InstalmentResponse> instalments = new ArrayList<>();

    @Schema(description = "Vrai quand des frais élèves ont déjà été générés depuis ce tarif : "
            + "il ne peut plus être supprimé")
    private boolean locked;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getFeeTypeId() {
        return feeTypeId;
    }

    public void setFeeTypeId(UUID feeTypeId) {
        this.feeTypeId = feeTypeId;
    }

    public String getFeeTypeCode() {
        return feeTypeCode;
    }

    public void setFeeTypeCode(String feeTypeCode) {
        this.feeTypeCode = feeTypeCode;
    }

    public String getFeeTypeName() {
        return feeTypeName;
    }

    public void setFeeTypeName(String feeTypeName) {
        this.feeTypeName = feeTypeName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public boolean isMandatory() {
        return mandatory;
    }

    public void setMandatory(boolean mandatory) {
        this.mandatory = mandatory;
    }

    public UUID getLevelId() {
        return levelId;
    }

    public void setLevelId(UUID levelId) {
        this.levelId = levelId;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public boolean isAppliesToNewStudents() {
        return appliesToNewStudents;
    }

    public void setAppliesToNewStudents(boolean appliesToNewStudents) {
        this.appliesToNewStudents = appliesToNewStudents;
    }

    public boolean isAppliesToReturningStudents() {
        return appliesToReturningStudents;
    }

    public void setAppliesToReturningStudents(boolean appliesToReturningStudents) {
        this.appliesToReturningStudents = appliesToReturningStudents;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<InstalmentResponse> getInstalments() {
        return instalments;
    }

    public void setInstalments(List<InstalmentResponse> instalments) {
        this.instalments = instalments;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }
}
