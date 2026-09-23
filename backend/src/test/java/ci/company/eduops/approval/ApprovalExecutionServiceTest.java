package ci.company.eduops.approval;

import ci.company.eduops.approval.domain.*;
import ci.company.eduops.approval.repository.*;
import ci.company.eduops.approval.service.ApprovalExecutionService;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.security.entity.*;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.security.service.CurrentUser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import java.util.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class ApprovalExecutionServiceTest {
    final UUID school = UUID.randomUUID(), first = UUID.randomUUID(), second = UUID.randomUUID(), last = UUID.randomUUID();
    final ApprovalExecutionRepository executions = mock(ApprovalExecutionRepository.class);
    final ApprovalCircuitRepository circuits = mock(ApprovalCircuitRepository.class);
    final ApprovalCircuitLevelRepository levels = mock(ApprovalCircuitLevelRepository.class);
    final ApprovalCircuitLevelMemberRepository members = mock(ApprovalCircuitLevelMemberRepository.class);
    final AppUserRepository users = mock(AppUserRepository.class);
    final CurrentUser actor = mock(CurrentUser.class);
    final ObjectMapper mapper = new ObjectMapper().findAndRegisterModules();
    final ApprovalExecutionService service = new ApprovalExecutionService(executions, circuits, levels, members, users, actor, mock(AuditService.class), mapper);
    ApprovalExecution execution;
    @BeforeEach void setup() {
        TenantContext.setSchoolId(school);
        when(actor.requireId()).thenReturn(first);
        execution = new ApprovalExecution(); execution.setResourceId(UUID.randomUUID()); execution.setSchoolId(school);
        execution.setLabel("Scolarité");
        execution.setStages(new ArrayList<>(List.of(stage(ApprovalMode.ALL, first, second), stage(ApprovalMode.ONE, last))));
        when(executions.lockResource(execution.getResourceId(), school)).thenReturn(Optional.of(execution));
    }
    @AfterEach void clean() { TenantContext.clear(); }
    @Test void allWaitsForEveryMemberThenAdvancesInOrder() {
        service.decide(execution.getResourceId(), true, "Accord");
        assertThat(execution.getCurrentLevel()).isEqualTo(1);
        assertThat(execution.getStatus()).isEqualTo("SUBMITTED");
        when(actor.requireId()).thenReturn(second);
        service.decide(execution.getResourceId(), true, null);
        assertThat(execution.getCurrentLevel()).isEqualTo(2);
        when(actor.requireId()).thenReturn(last);
        service.decide(execution.getResourceId(), true, null);
        assertThat(execution.getStatus()).isEqualTo("APPROVED");
        assertThat(execution.getStages().getFirst().getMembers().getFirst().getComment()).isEqualTo("Accord");
    }
    @Test void oneAdvancesAfterTheFirstVote() {
        execution.getStages().getFirst().setMode(ApprovalMode.ONE);
        service.decide(execution.getResourceId(), true, null);
        assertThat(execution.getCurrentLevel()).isEqualTo(2);
        assertThat(execution.getStages().getFirst().getMembers().get(1).getDecision()).isNull();
    }
    @Test void duplicateVoteCannotCountTwice() {
        service.decide(execution.getResourceId(), true, null);
        assertThatThrownBy(() -> service.decide(execution.getResourceId(), true, null)).isInstanceOf(BusinessException.class);
        assertThat(execution.getCurrentLevel()).isEqualTo(1);
    }
    @Test void laterLevelAndUnassignedAdministratorCannotVote() {
        when(actor.requireId()).thenReturn(last);
        when(actor.isAdministrator()).thenReturn(true);
        assertThatThrownBy(() -> service.decide(execution.getResourceId(), true, null)).isInstanceOf(BusinessException.class);
        assertThat(execution.getStages().getFirst().getStatus()).isEqualTo("PENDING");
    }
    @Test void rejectionNeedsReasonAndPermanentlyClosesRequest() {
        assertThatThrownBy(() -> service.decide(execution.getResourceId(), false, " ")).isInstanceOf(BusinessException.class);
        service.decide(execution.getResourceId(), false, "Budget insuffisant");
        assertThat(execution.getStatus()).isEqualTo("REJECTED");
        when(actor.requireId()).thenReturn(second);
        assertThatThrownBy(() -> service.decide(execution.getResourceId(), true, null)).isInstanceOf(BusinessException.class);
    }
    @Test void effectiveRequiresCompleteApprovalAndCannotBeRepeated() {
        assertThatThrownBy(() -> service.effective(execution)).isInstanceOf(BusinessException.class);
        execution.setStatus("APPROVED"); service.effective(execution);
        assertThat(execution.getStatus()).isEqualTo("EFFECTIVE");
        assertThatThrownBy(() -> service.effective(execution)).isInstanceOf(BusinessException.class);
    }
    @Test void otherSchoolCannotReadOrDecide() {
        TenantContext.setSchoolId(UUID.randomUUID());
        assertThat(service.find(execution.getResourceId())).isEmpty();
        assertThatThrownBy(() -> service.decide(execution.getResourceId(), true, null)).isInstanceOf(BusinessException.class);
    }
    @Test void submissionCopiesMembersAndRejectsWrongUsage() {
        UUID id = UUID.randomUUID();
        var circuit = new ApprovalCircuit(); circuit.setId(id); circuit.setUsage("FEE"); circuit.setCode("FIN"); circuit.setName("Finance");
        when(circuits.findByIdAndSchoolId(id, school)).thenReturn(Optional.of(circuit));
        var level = new ApprovalCircuitLevel(); level.setId(UUID.randomUUID()); level.setCode("DIR"); level.setApprovalMode(ApprovalMode.ALL);
        when(levels.findByCircuitIdOrderByLevelNumberAsc(id)).thenReturn(List.of(level));
        var member = new ApprovalCircuitLevelMember(); member.setUserId(first);
        when(members.findByLevelId(level.getId())).thenReturn(List.of(member));
        var user = new AppUser(); user.setId(first); user.setStatus(UserStatus.ACTIVE); user.setFirstName("Ada"); user.setLastName("K");
        when(users.findBySchoolIdOrderByLastNameAscFirstNameAsc(school)).thenReturn(List.of(user));
        var submitted = service.submit(id, "FEE", "CREATE_TYPE", UUID.randomUUID(), "Cantine", mapper.createObjectNode());
        member.setUserId(second); level.setCode("MODIFIE");
        assertThat(submitted.getStages().getFirst().getCode()).isEqualTo("DIR");
        assertThat(submitted.getStages().getFirst().getMembers().getFirst().getUserId()).isEqualTo(first);
        assertThatThrownBy(() -> service.submit(id, "DISCOUNT", "DISCOUNT", UUID.randomUUID(), "Réduction", mapper.createObjectNode())).isInstanceOf(BusinessException.class);
    }
    @Test void missingCircuitNeverApprovesAutomatically() {
        assertThatThrownBy(() -> service.submit(null, "FEE", "CREATE_TYPE", UUID.randomUUID(), "Frais", mapper.createObjectNode())).isInstanceOf(BusinessException.class);
        verify(executions, never()).save(any());
    }
    static ApprovalExecution.Stage stage(ApprovalMode mode, UUID... ids) {
        var stage = new ApprovalExecution.Stage(); stage.setCode("DIR"); stage.setMode(mode);
        for (UUID id : ids) { var vote = new ApprovalExecution.Vote(); vote.setUserId(id); stage.getMembers().add(vote); }
        return stage;
    }
}
