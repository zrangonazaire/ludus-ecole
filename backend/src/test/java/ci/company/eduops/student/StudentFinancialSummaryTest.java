package ci.company.eduops.student;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.finance.domain.*;
import ci.company.eduops.finance.repository.*;
import ci.company.eduops.guardian.repository.StudentGuardianRepository;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.student.service.StudentQueryService;
import org.junit.jupiter.api.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentFinancialSummaryTest {
    @AfterEach void cleanup() { TenantContext.clear(); }

    @Test void includesPaidFeesInTotalsButNotInOverdueCount() {
        var students = mock(StudentRepository.class); var years = mock(AcademicYearRepository.class);
        var fees = mock(StudentFeeRepository.class);
        var service = new StudentQueryService(students, mock(EnrollmentRepository.class), mock(StudentGuardianRepository.class),
                fees, years, mock(FeeCategoryRepository.class));
        School school = new School(); school.setId(UUID.randomUUID()); TenantContext.setSchoolId(school.getId());
        Student student = new Student(); student.setId(UUID.randomUUID()); student.setSchool(school);
        AcademicYear year = new AcademicYear(); year.setId(UUID.randomUUID()); year.setSchool(school);
        when(students.findById(student.getId())).thenReturn(Optional.of(student));
        when(years.findById(year.getId())).thenReturn(Optional.of(year));
        StudentFee paid = fee("1000", "1000", StudentFeeStatus.PAID);
        StudentFee partial = fee("2000", "500", StudentFeeStatus.PARTIALLY_PAID);
        when(fees.findStatementLines(student.getId(), year.getId())).thenReturn(List.of(paid, partial));
        var summary = service.financialSummary(student.getId(), year.getId());
        assertThat(summary.getTotalDue()).isEqualByComparingTo("3000");
        assertThat(summary.getTotalPaid()).isEqualByComparingTo("1500");
        assertThat(summary.getOutstandingAmount()).isEqualByComparingTo("1500");
        assertThat(summary.getOverdueCount()).isEqualTo(1); assertThat(summary.getFees()).hasSize(2);
        verify(fees, never()).findOutstandingOldestFirst(any(), any());
    }
    private StudentFee fee(String due, String paid, StudentFeeStatus status) {
        StudentFee fee = new StudentFee(); fee.setId(UUID.randomUUID()); fee.setLabel("Scolarité");
        fee.setAmountDue(new BigDecimal(due)); fee.setAmountPaid(new BigDecimal(paid)); fee.setGrossAmount(new BigDecimal(due));
        fee.setDiscountAmount(BigDecimal.ZERO); fee.setCurrency("XOF"); fee.setStatus(status);
        fee.setDueDate(LocalDate.now().minusDays(30)); return fee;
    }
}
