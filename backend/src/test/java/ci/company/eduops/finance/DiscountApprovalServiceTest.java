package ci.company.eduops.finance;

import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.approval.domain.ApprovalExecution;
import ci.company.eduops.approval.service.ApprovalExecutionService;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.finance.domain.*;
import ci.company.eduops.finance.repository.*;
import ci.company.eduops.finance.service.DiscountRequestService;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.repository.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class DiscountApprovalServiceTest {
    final UUID school = UUID.randomUUID(), id = UUID.randomUUID();
    final DiscountRequestRepository requests = mock(DiscountRequestRepository.class);
    final StudentFeeRepository fees = mock(StudentFeeRepository.class);
    final ApprovalExecutionService approvals = mock(ApprovalExecutionService.class);
    final DiscountRequestService service = new DiscountRequestService(requests, mock(DiscountRequestLevelRepository.class),
            mock(StudentRepository.class), mock(AcademicYearRepository.class), fees, mock(CurrentUser.class),
            mock(AuditService.class), approvals, new ObjectMapper(), mock(FeeTypeRepository.class));
    DiscountRequest request;
    ApprovalExecution execution;
    @BeforeEach void setup() {
        TenantContext.setSchoolId(school);
        request = new DiscountRequest(); request.setId(id); request.setStudentId(UUID.randomUUID()); request.setAcademicYearId(UUID.randomUUID());
        request.setReference("RED-TEST"); request.setStatus(DiscountRequestStatus.APPROVED); request.setDiscountType(DiscountType.FIXED_AMOUNT);
        request.setValue(new BigDecimal("500")); request.setComputedAmount(new BigDecimal("500"));
        when(requests.lockByIdAndSchoolId(id, school)).thenReturn(Optional.of(request));
        when(requests.findByIdAndSchoolId(id, school)).thenReturn(Optional.of(request));
        execution = new ApprovalExecution(); execution.setStatus("APPROVED");
        when(approvals.lock(id)).thenReturn(execution);
    }
    @AfterEach void cleanup() { TenantContext.clear(); }
    @Test void existingDiscountsAndPaymentsArePreserved() {
        var line = line("1000", "100", "700"); lines(line);
        service.apply(id);
        assertThat(line.getDiscountAmount()).isEqualByComparingTo("300");
        assertThat(line.getAmountDue()).isEqualByComparingTo("700");
        assertThat(line.outstanding()).isEqualByComparingTo("0");
        assertThat(request.getComputedAmount()).isEqualByComparingTo("200");
        assertThat(request.getStatus()).isEqualTo(DiscountRequestStatus.EFFECTIVE);
    }
    @Test void percentageUsesOutstandingAndNeverExceedsApprovedEstimate() {
        request.setDiscountType(DiscountType.PERCENTAGE); request.setValue(new BigDecimal("50")); request.setComputedAmount(new BigDecimal("80"));
        var line = line("1000", "100", "700"); lines(line);
        service.apply(id);
        assertThat(line.getDiscountAmount()).isEqualByComparingTo("180");
        assertThat(line.outstanding()).isEqualByComparingTo("120");
    }
    @Test void fixedAmountIsDistributedOnceAndNotOncePerInstalment() {
        var one = line("100", "0", "0"); var two = line("900", "0", "0"); lines(one, two);
        service.apply(id);
        assertThat(one.getDiscountAmount().add(two.getDiscountAmount())).isEqualByComparingTo("500");
        assertThatThrownBy(() -> service.apply(id)).isInstanceOf(BusinessException.class);
    }
    @Test void onlySelectedFeeTypeIsReduced() {
        var tuition = line("500", "0", "0"); var canteen = line("200", "0", "0");
        request.setFeeTypeId(tuition.getFeeType().getId());
        when(fees.findOutstandingOldestFirst(request.getStudentId(), request.getAcademicYearId())).thenReturn(List.of(tuition, canteen));
        when(fees.lockAllByIds(List.of(tuition.getId()))).thenReturn(List.of(tuition));
        service.apply(id);
        assertThat(tuition.outstanding()).isEqualByComparingTo("0");
        assertThat(canteen.outstanding()).isEqualByComparingTo("200");
    }
    @Test void noEffectBeforeApprovalEvenIfApplyEndpointCalledDirectly() {
        request.setStatus(DiscountRequestStatus.SUBMITTED);
        assertThatThrownBy(() -> service.apply(id)).isInstanceOf(BusinessException.class);
        verifyNoInteractions(fees);
    }
    @Test void requestStatusAloneCannotBypassCircuit() {
        execution.setStatus("SUBMITTED");
        assertThatThrownBy(() -> service.apply(id)).isInstanceOf(BusinessException.class);
        verifyNoInteractions(fees);
    }
    private void lines(StudentFee... lines) {
        when(fees.findOutstandingOldestFirst(request.getStudentId(), request.getAcademicYearId())).thenReturn(List.of(lines));
        when(fees.lockAllByIds(anyList())).thenReturn(List.of(lines));
    }
    private StudentFee line(String gross, String discount, String paid) {
        var line = new StudentFee(); line.setId(UUID.randomUUID()); line.setDueDate(LocalDate.now().plusDays(30));
        var type = new FeeType(); type.setId(UUID.randomUUID()); line.setFeeType(type);
        line.setGrossAmount(new BigDecimal(gross)); line.setDiscountAmount(new BigDecimal(discount));
        line.setAmountPaid(new BigDecimal(paid)); line.recomputeAmountDue(); return line;
    }
}
