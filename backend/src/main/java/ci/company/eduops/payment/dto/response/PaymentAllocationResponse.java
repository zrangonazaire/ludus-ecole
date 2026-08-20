package ci.company.eduops.payment.dto.response;

import java.math.BigDecimal;
import java.util.UUID;

public class PaymentAllocationResponse {

    private UUID id;
    private UUID studentFeeId;
    private String feeLabel;
    private BigDecimal amount;
    private BigDecimal feeRemainingAfter;
    private String feeStatus;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getStudentFeeId() {
        return studentFeeId;
    }

    public void setStudentFeeId(UUID studentFeeId) {
        this.studentFeeId = studentFeeId;
    }

    public String getFeeLabel() {
        return feeLabel;
    }

    public void setFeeLabel(String feeLabel) {
        this.feeLabel = feeLabel;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getFeeRemainingAfter() {
        return feeRemainingAfter;
    }

    public void setFeeRemainingAfter(BigDecimal feeRemainingAfter) {
        this.feeRemainingAfter = feeRemainingAfter;
    }

    public String getFeeStatus() {
        return feeStatus;
    }

    public void setFeeStatus(String feeStatus) {
        this.feeStatus = feeStatus;
    }
}
