package ci.company.eduops.payment.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;

/** Explicit allocation of part of a payment to one instalment. */
public class PaymentAllocationRequest {

    @NotNull
    private UUID studentFeeId;

    @NotNull
    @DecimalMin(value = "0.01", message = "The allocated amount must be positive")
    private BigDecimal amount;

    public UUID getStudentFeeId() {
        return studentFeeId;
    }

    public void setStudentFeeId(UUID studentFeeId) {
        this.studentFeeId = studentFeeId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
