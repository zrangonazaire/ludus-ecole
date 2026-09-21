package ci.company.eduops.finance.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * What one pupil owes, and has paid, this year.
 *
 * <p>Every amount is a {@code BigDecimal}. School fees are added, compared to
 * a threshold and printed on a receipt; a binary floating-point type would
 * eventually produce a balance of 0.00000001 F that no cashier can settle.</p>
 */
public class StudentFinancialSummaryResponse {

    private UUID studentId;
    private UUID academicYearId;
    private BigDecimal totalGross = BigDecimal.ZERO;
    private BigDecimal totalDiscount = BigDecimal.ZERO;
    private BigDecimal totalDue = BigDecimal.ZERO;
    private BigDecimal totalPaid = BigDecimal.ZERO;
    private BigDecimal outstandingAmount = BigDecimal.ZERO;
    private LocalDate nextDueDate;
    private int overdueCount;
    /** PAID, PARTIALLY_PAID, DUE. */
    private String globalStatus = "PAID";
    private String currency = "XOF";

    /**
     * Lignes de frais de l'élève pour l'année, triées par échéance.
     * Chaque ligne porte sa rubrique (type de frais + catégorie + montant),
     * ce sur quoi pointe l'encaissement au moment de la répartition.
     */
    private List<StudentFeeLineResponse> fees = new ArrayList<>();

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

    public BigDecimal getTotalGross() {
        return totalGross;
    }

    public void setTotalGross(BigDecimal totalGross) {
        this.totalGross = totalGross;
    }

    public BigDecimal getTotalDiscount() {
        return totalDiscount;
    }

    public void setTotalDiscount(BigDecimal totalDiscount) {
        this.totalDiscount = totalDiscount;
    }

    public BigDecimal getTotalDue() {
        return totalDue;
    }

    public void setTotalDue(BigDecimal totalDue) {
        this.totalDue = totalDue;
    }

    public BigDecimal getTotalPaid() {
        return totalPaid;
    }

    public void setTotalPaid(BigDecimal totalPaid) {
        this.totalPaid = totalPaid;
    }

    public BigDecimal getOutstandingAmount() {
        return outstandingAmount;
    }

    public void setOutstandingAmount(BigDecimal outstandingAmount) {
        this.outstandingAmount = outstandingAmount;
    }

    public LocalDate getNextDueDate() {
        return nextDueDate;
    }

    public void setNextDueDate(LocalDate nextDueDate) {
        this.nextDueDate = nextDueDate;
    }

    public int getOverdueCount() {
        return overdueCount;
    }

    public void setOverdueCount(int overdueCount) {
        this.overdueCount = overdueCount;
    }

    public String getGlobalStatus() {
        return globalStatus;
    }

    public void setGlobalStatus(String globalStatus) {
        this.globalStatus = globalStatus;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public List<StudentFeeLineResponse> getFees() {
        return fees;
    }

    public void setFees(List<StudentFeeLineResponse> fees) {
        this.fees = fees != null ? fees : new ArrayList<>();
    }
}
