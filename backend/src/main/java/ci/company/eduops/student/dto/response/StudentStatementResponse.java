package ci.company.eduops.student.dto.response;

import ci.company.eduops.enrollment.dto.response.EnrollmentResponse;
import ci.company.eduops.finance.dto.response.StudentFinancialSummaryResponse;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record StudentStatementResponse(
        String schoolName, String schoolAddress, String schoolPhone, OffsetDateTime generatedAt,
        StudentDetailResponse student, List<EnrollmentResponse> enrollments,
        List<YearBalance> balances, List<PaymentLine> payments) {
    public record YearBalance(UUID academicYearId, String yearLabel, StudentFinancialSummaryResponse summary) {}
    public record PaymentLine(UUID id, String yearLabel, LocalDate paymentDate, String reference,
                              String receiptNumber, String method, String status, String payerName,
                              BigDecimal amount, BigDecimal allocatedAmount, BigDecimal unallocatedAmount,
                              String currency) {}
}
