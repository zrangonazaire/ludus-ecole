package ci.company.eduops.student;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.finance.dto.response.StudentFinancialSummaryResponse;
import ci.company.eduops.finance.repository.StudentFeeRepository;
import ci.company.eduops.payment.domain.*;
import ci.company.eduops.payment.repository.*;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.dto.response.StudentDetailResponse;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.student.service.*;
import org.junit.jupiter.api.*;
import java.math.BigDecimal;
import java.util.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentStatementTest {
    private final StudentRepository students = mock(StudentRepository.class);
    private final StudentQueryService query = mock(StudentQueryService.class);
    private final PaymentRepository payments = mock(PaymentRepository.class);
    private final ReceiptRepository receipts = mock(ReceiptRepository.class);
    private final AcademicYearRepository years = mock(AcademicYearRepository.class);
    private final StudentFeeRepository fees = mock(StudentFeeRepository.class);
    private final StudentStatementService service = new StudentStatementService(students, query, payments, receipts, years, fees);
    @AfterEach void cleanup() { TenantContext.clear(); }

    @Test void includesHistoricalPaymentsAndCancelledStatusWithoutLosingYearOrReceipt() {
        School school = new School(); school.setId(UUID.randomUUID()); school.setName("École"); TenantContext.setSchoolId(school.getId());
        Student student = new Student(); student.setId(UUID.randomUUID()); student.setSchool(school);
        when(students.findById(student.getId())).thenReturn(Optional.of(student));
        when(query.detail(student.getId())).thenReturn(new StudentDetailResponse());
        AcademicYear old = year("2024–2025"), current = year("2026–2027");
        Payment first = payment(old, PaymentStatus.VALIDATED), second = payment(current, PaymentStatus.CANCELLED);
        Receipt receipt = new Receipt(); receipt.setPayment(first); receipt.setReceiptNumber("REC-001");
        when(receipts.findByStudentIdOrderByIssueDateDesc(student.getId())).thenReturn(List.of(receipt));
        when(payments.findByStudentIdOrderByPaymentDateDesc(student.getId())).thenReturn(List.of(second, first));
        when(years.findBySchoolOrderByStartDateDesc(school.getId())).thenReturn(List.of(current, old));
        when(query.financialSummary(eq(student.getId()), any())).thenReturn(new StudentFinancialSummaryResponse());
        var statement = service.get(student.getId());
        assertThat(statement.balances()).hasSize(2); assertThat(statement.payments()).hasSize(2);
        assertThat(statement.payments().get(0).status()).isEqualTo("CANCELLED");
        assertThat(statement.payments().get(1).yearLabel()).isEqualTo("2024–2025");
        assertThat(statement.payments().get(1).receiptNumber()).isEqualTo("REC-001");
    }

    @Test void rejectsAnotherSchoolsStudentBeforeReadingFinancialData() {
        School school = new School(); school.setId(UUID.randomUUID());
        Student student = new Student(); student.setSchool(school); student.setId(UUID.randomUUID());
        TenantContext.setSchoolId(UUID.randomUUID()); when(students.findById(student.getId())).thenReturn(Optional.of(student));
        assertThatThrownBy(() -> service.get(student.getId())).isInstanceOf(BusinessException.class);
        verifyNoInteractions(query, payments, receipts, years, fees);
    }
    private AcademicYear year(String label) { var year = new AcademicYear(); year.setId(UUID.randomUUID()); year.setLabel(label); return year; }
    private Payment payment(AcademicYear year, PaymentStatus status) {
        Payment payment = new Payment(); payment.setId(UUID.randomUUID()); payment.setAcademicYear(year);
        payment.setStatus(status); payment.setPaymentMethod(PaymentMethod.CASH); payment.setAmount(new BigDecimal("1000"));
        payment.setPaymentReference("PAY-" + year.getLabel()); return payment;
    }
}
