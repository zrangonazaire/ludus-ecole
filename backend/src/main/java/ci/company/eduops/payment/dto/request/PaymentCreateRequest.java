package ci.company.eduops.payment.dto.request;

import ci.company.eduops.payment.domain.PaymentMethod;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Schema(name = "PaymentCreateRequest", description = "Records a payment received from a family")
public class PaymentCreateRequest {

    @NotNull
    private UUID studentId;

    private UUID academicYearId;

    private UUID guardianId;

    @NotNull
    @DecimalMin(value = "0.01", message = "The amount must be greater than zero")
    @Digits(integer = 13, fraction = 2)
    @Schema(example = "200000.00")
    private BigDecimal amount;

    @NotNull
    private PaymentMethod paymentMethod;

    @PastOrPresent
    private LocalDate paymentDate;

    @Size(max = 120)
    @Schema(description = "Bank or mobile money transaction référence")
    private String externalReference;

    @Size(max = 200)
    private String payerName;

    /**
     * Idempotency key (rule 13). Sending the same operationId twice returns the
     * first payment instead of creating a duplicate.
     */
    @NotBlank
    @Size(max = 120)
    @Schema(example = "3f9a1b2c-8d4e-4f6a-9b1c-2d3e4f5a6b7c",
            description = "Client-generated UUID; guarantees the payment is recorded once")
    private String operationId;

    @Schema(description = "Leave empty to let the server settle the oldest instalments first")
    @Valid
    @NotNull
    private List<@NotNull PaymentAllocationRequest> allocations = new ArrayList<>();

    private UUID cashSessionId;

    @Size(max = 1000)
    private String notes;

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public UUID getAcademicYearId() {
        return academicYearId;
    }

    public void setAcademicYearId(UUID academicYearId) {
        this.academicYearId = academicYearId;
    }

    public UUID getGuardianId() {
        return guardianId;
    }

    public void setGuardianId(UUID guardianId) {
        this.guardianId = guardianId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getExternalReference() {
        return externalReference;
    }

    public void setExternalReference(String externalReference) {
        this.externalReference = externalReference;
    }

    public String getPayerName() {
        return payerName;
    }

    public void setPayerName(String payerName) {
        this.payerName = payerName;
    }

    public String getOperationId() {
        return operationId;
    }

    public void setOperationId(String operationId) {
        this.operationId = operationId;
    }

    public List<PaymentAllocationRequest> getAllocations() {
        return allocations;
    }

    public void setAllocations(List<PaymentAllocationRequest> allocations) {
        this.allocations = allocations;
    }

    public UUID getCashSessionId() {
        return cashSessionId;
    }

    public void setCashSessionId(UUID cashSessionId) {
        this.cashSessionId = cashSessionId;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
