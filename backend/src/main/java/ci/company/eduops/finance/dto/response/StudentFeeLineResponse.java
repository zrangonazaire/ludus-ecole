package ci.company.eduops.finance.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * Une ligne payable de l'école : une rubrique (type de frais) déclinée
 * en échéance pour un élève, avec son montant et son reste à payer.
 *
 * <p>La rubrique est alimentée par le type de frais ({@code feeTypeId},
 * {@code feeTypeCode}, {@code feeTypeName}, {@code category}) et le tarif
 * ({@code feeScheduleId}) qui en fixe le montant. La scolarité n'est qu'une
 * rubrique parmi d'autres (catégorie TUITION).</p>
 */
public class StudentFeeLineResponse {

    private UUID id;
    private String label;
    private int sequence;

    private UUID feeTypeId;
    private String feeTypeCode;
    private String feeTypeName;
    private String category;
    private String categoryLabel;
    private boolean mandatory;

    private UUID feeScheduleId;
    private UUID instalmentId;
    private String instalmentLabel;

    private BigDecimal grossAmount;
    private BigDecimal discountAmount;
    private BigDecimal amountDue;
    private BigDecimal amountPaid;
    private BigDecimal amountRemaining;
    private String currency;
    private LocalDate dueDate;
    private String status;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
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

    public String getCategoryLabel() {
        return categoryLabel;
    }

    public void setCategoryLabel(String categoryLabel) {
        this.categoryLabel = categoryLabel;
    }

    public boolean isMandatory() {
        return mandatory;
    }

    public void setMandatory(boolean mandatory) {
        this.mandatory = mandatory;
    }

    public UUID getFeeScheduleId() {
        return feeScheduleId;
    }

    public void setFeeScheduleId(UUID feeScheduleId) {
        this.feeScheduleId = feeScheduleId;
    }

    public UUID getInstalmentId() {
        return instalmentId;
    }

    public void setInstalmentId(UUID instalmentId) {
        this.instalmentId = instalmentId;
    }

    public String getInstalmentLabel() {
        return instalmentLabel;
    }

    public void setInstalmentLabel(String instalmentLabel) {
        this.instalmentLabel = instalmentLabel;
    }

    public BigDecimal getGrossAmount() {
        return grossAmount;
    }

    public void setGrossAmount(BigDecimal grossAmount) {
        this.grossAmount = grossAmount;
    }

    public BigDecimal getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(BigDecimal discountAmount) {
        this.discountAmount = discountAmount;
    }

    public BigDecimal getAmountDue() {
        return amountDue;
    }

    public void setAmountDue(BigDecimal amountDue) {
        this.amountDue = amountDue;
    }

    public BigDecimal getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(BigDecimal amountPaid) {
        this.amountPaid = amountPaid;
    }

    public BigDecimal getAmountRemaining() {
        return amountRemaining;
    }

    public void setAmountRemaining(BigDecimal amountRemaining) {
        this.amountRemaining = amountRemaining;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
