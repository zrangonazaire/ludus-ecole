package ci.company.eduops.finance;

import ci.company.eduops.approval.domain.ApprovalExecution;
import ci.company.eduops.approval.service.ApprovalExecutionService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.finance.dto.request.*;
import ci.company.eduops.finance.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import java.util.UUID;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class FeeApprovalServiceTest {
    final ApprovalExecutionService approvals = mock(ApprovalExecutionService.class);
    final FeeConfigurationService fees = mock(FeeConfigurationService.class);
    final ObjectMapper mapper = new ObjectMapper().findAndRegisterModules();
    final FeeApprovalService service = new FeeApprovalService(approvals, fees, mapper);
    final UUID id = UUID.randomUUID(), circuit = UUID.randomUUID();
    final FeeTypeUpsertRequest input = new FeeTypeUpsertRequest();
    @BeforeEach void setup() { input.setCode("CAN"); input.setName("Cantine"); }
    @Test void submissionDoesNotCreateLiveFees() {
        when(fees.changeBaseline("CREATE_TYPE", null, null, input)).thenReturn("new");
        service.submit("CREATE_TYPE", circuit, null, null, input);
        verify(approvals).submit(eq(circuit), eq("FEE"), eq("CREATE_TYPE"), any(), eq("Création du frais : Cantine"), any());
        verify(fees, never()).createType(any());
    }
    @Test void intermediateApprovalAndRejectionDoNotChangeFees() {
        for (String status : new String[]{"SUBMITTED", "REJECTED"}) {
            var execution = execution(status);
            when(approvals.lock(id)).thenReturn(execution);
            when(approvals.decide(eq(id), anyBoolean(), any())).thenReturn(execution);
            service.decide(id, decision());
        }
        verify(fees, never()).createType(any());
        verify(approvals, never()).effective(any());
    }
    @Test void finalApprovalCreatesFeeAndMarksEffective() {
        var execution = execution("APPROVED");
        when(approvals.lock(id)).thenReturn(execution);
        when(approvals.decide(eq(id), anyBoolean(), any())).thenReturn(execution);
        when(fees.changeBaseline(eq("CREATE_TYPE"), isNull(), isNull(), any())).thenReturn("new");
        service.decide(id, decision());
        verify(fees).createType(argThat(dto -> dto.getName().equals("Cantine")));
        verify(approvals).effective(execution);
    }
    @Test void changedTargetPreventsApplyingStaleRequest() {
        var execution = execution("APPROVED");
        when(approvals.lock(id)).thenReturn(execution);
        when(approvals.decide(eq(id), anyBoolean(), any())).thenReturn(execution);
        when(fees.changeBaseline(eq("CREATE_TYPE"), isNull(), isNull(), any())).thenReturn("changed");
        assertThatThrownBy(() -> service.decide(id, decision())).isInstanceOf(BusinessException.class);
        verify(fees, never()).createType(any());
    }
    private ApprovalExecution execution(String status) {
        var execution = new ApprovalExecution(); execution.setOperation("CREATE_TYPE"); execution.setStatus(status);
        var payload = mapper.createObjectNode(); payload.set("input", mapper.valueToTree(input)); payload.put("baseline", "new");
        execution.setPayload(payload); return execution;
    }
    private DiscountRequestDecisionRequest decision() {
        var result = new DiscountRequestDecisionRequest(); result.setDecision(DiscountRequestDecisionRequest.Decision.APPROVE); return result;
    }
}
