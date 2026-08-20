package ci.company.eduops.payment.dto.response;

import ci.company.eduops.payment.domain.PaymentMethod;
import ci.company.eduops.payment.domain.PaymentStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class PaymentResponse {

    private UUID id;
    private String paymentReference;
    private UUID studentId;
    private String studentNumber;
    private String studentName;
    private BigDecimal amount;
    private BigDecimal allocatedAmount;
    private BigDecimal unallocatedAmount;
    private String currency;
    private PaymentMethod paymentMethod;
    private LocalDate paymentDate;
    private PaymentStatus status;
    private String externalReference;
    private String payerName;
    private String operationId;
    private OffsetDateTime validatedAt;
    private String receiptNumber;
    private UUID receiptId;
    private BigDecimal outstandingAfterPayment;
    private List<PaymentAllocationResponse> allocations = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getPaymentReference() {
        return paymentReference;
    }

    public void setPaymentReference(String paymentReference) {
        this.paymentReference = paymentReference;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getAllocatedAmount() {
        return allocatedAmount;
    }

    public void setAllocatedAmount(BigDecimal allocatedAmount) {
        this.allocatedAmount = allocatedAmount;
    }

    public BigDecimal getUnallocatedAmount() {
        return unallocatedAmount;
    }

    public void setUnallocatedAmount(BigDecimal unallocatedAmount) {
        this.unallocatedAmount = unallocatedAmount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
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

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
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

    public OffsetDateTime getValidatedAt() {
        return validatedAt;
    }

    public void setValidatedAt(OffsetDateTime validatedAt) {
        this.validatedAt = validatedAt;
    }

    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public UUID getReceiptId() {
        return receiptId;
    }

    public void setReceiptId(UUID receiptId) {
        this.receiptId = receiptId;
    }

    public BigDecimal getOutstandingAfterPayment() {
        return outstandingAfterPayment;
    }

    public void setOutstandingAfterPayment(BigDecimal outstandingAfterPayment) {
        this.outstandingAfterPayment = outstandingAfterPayment;
    }

    public List<PaymentAllocationResponse> getAllocations() {
        return allocations;
    }

    public void setAllocations(List<PaymentAllocationResponse> allocations) {
        this.allocations = allocations;
    }
}
