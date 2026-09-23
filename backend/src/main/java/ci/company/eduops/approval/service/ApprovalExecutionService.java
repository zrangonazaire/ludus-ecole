package ci.company.eduops.approval.service;

import ci.company.eduops.approval.domain.*;
import ci.company.eduops.approval.dto.response.ApprovalExecutionResponse;
import ci.company.eduops.approval.repository.*;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.*;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.security.service.CurrentUser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.OffsetDateTime;
import java.util.*;

@Service
@Transactional
public class ApprovalExecutionService {
    private final ApprovalExecutionRepository executions;
    private final ApprovalCircuitRepository circuits;
    private final ApprovalCircuitLevelRepository levels;
    private final ApprovalCircuitLevelMemberRepository members;
    private final AppUserRepository users;
    private final CurrentUser actor;
    private final AuditService audit;
    private final ObjectMapper mapper;

    public ApprovalExecutionService(ApprovalExecutionRepository executions,
            ApprovalCircuitRepository circuits, ApprovalCircuitLevelRepository levels,
            ApprovalCircuitLevelMemberRepository members, AppUserRepository users,
            CurrentUser actor, AuditService audit, ObjectMapper mapper) {
        this.executions = executions; this.circuits = circuits; this.levels = levels;
        this.members = members; this.users = users; this.actor = actor;
        this.audit = audit; this.mapper = mapper;
    }

    public ApprovalExecution submit(UUID circuitId, String usage, String operation,
            UUID resourceId, String label, JsonNode payload) {
        if (circuitId == null) throw invalid("Choisissez un circuit de validation configuré.");
        var circuit = circuits.findByIdAndSchoolId(circuitId, school())
                .orElseThrow(() -> invalid("Circuit de validation introuvable dans cet établissement."));
        if (!usage.equals(circuit.getUsage())) throw invalid("Ce circuit ne correspond pas à cette opération.");
        var chain = levels.findByCircuitIdOrderByLevelNumberAsc(circuitId);
        if (chain.isEmpty()) throw invalid("Le circuit doit comporter au moins un niveau.");
        var accounts = users.findBySchoolIdOrderByLastNameAscFirstNameAsc(school());
        var execution = new ApprovalExecution();
        execution.setSchoolId(school()); execution.setResourceId(resourceId);
        execution.setOperation(operation); execution.setLabel(label);
        execution.setCircuitName(circuit.getCode() + " — " + circuit.getName());
        execution.setCreatedBy(actor.requireId()); execution.setPayload(payload.deepCopy());
        for (var level : chain) {
            var stage = new ApprovalExecution.Stage();
            stage.setCode(level.getCode()); stage.setMode(level.getApprovalMode());
            for (var member : members.findByLevelId(level.getId())) {
                var account = accounts.stream().filter(u -> u.getId().equals(member.getUserId())
                        && "ACTIVE".equals(u.getStatus().name())).findFirst()
                        .orElseThrow(() -> invalid("Un valideur du circuit est inactif ou indisponible. Corrigez le circuit."));
                var vote = new ApprovalExecution.Vote();
                vote.setUserId(account.getId());
                vote.setName(account.getFirstName() + " " + account.getLastName());
                stage.getMembers().add(vote);
            }
            if (stage.getMembers().isEmpty()) throw invalid("Chaque niveau doit avoir un valideur.");
            execution.getStages().add(stage);
        }
        executions.save(execution);
        audit.logCreate("ApprovalExecution", execution.getId(), label,
                Map.of("operation", operation, "circuit", execution.getCircuitName()));
        return execution;
    }

    public ApprovalExecution decide(UUID resourceId, boolean approve, String comment) {
        var e = lock(resourceId);
        if (!"SUBMITTED".equals(e.getStatus())) throw invalid("Cette demande n'attend plus de décision.");
        if (!canDecide(e)) throw BusinessException.of(ErrorCode.ACCESS_DENIED,
                "Seuls les membres désignés du niveau courant peuvent décider, une seule fois.");
        if (!approve && (comment == null || comment.isBlank())) throw invalid("Indiquez le motif du refus.");
        // Copy the JSON value to make dirty tracking explicit.
        var stages = mapper.convertValue(mapper.valueToTree(e.getStages()),
                mapper.getTypeFactory().constructCollectionType(ArrayList.class, ApprovalExecution.Stage.class));
        @SuppressWarnings("unchecked")
        List<ApprovalExecution.Stage> snapshot = (List<ApprovalExecution.Stage>) stages;
        e.setStages(snapshot);
        var stage = e.getStages().get(e.getCurrentLevel() - 1);
        var vote = stage.getMembers().stream().filter(v -> v.getUserId().equals(actor.requireId())).findFirst().orElseThrow();
        vote.setDecision(approve ? "APPROVED" : "REJECTED");
        vote.setComment(comment); vote.setDecidedAt(OffsetDateTime.now());
        if (!approve) {
            stage.setStatus("REJECTED"); e.setStatus("REJECTED");
        } else if (stage.getMode() == ApprovalMode.ONE || stage.getMembers().stream()
                .allMatch(v -> "APPROVED".equals(v.getDecision()))) {
            stage.setStatus("APPROVED");
            if (e.getCurrentLevel() == e.getStages().size()) e.setStatus("APPROVED");
            else e.setCurrentLevel(e.getCurrentLevel() + 1);
        }
        audit.logUpdate("ApprovalExecution", e.getId(), e.getLabel(), Map.of(),
                Map.of("decision", vote.getDecision(), "level", stage.getCode(), "status", e.getStatus()));
        return e;
    }

    public ApprovalExecution lock(UUID resourceId) {
        return executions.lockResource(resourceId, school())
                .orElseThrow(() -> invalid("Aucun circuit enregistré pour cette demande. Soumettez une nouvelle demande avec un circuit configuré."));
    }
    @Transactional(readOnly = true)
    public Optional<ApprovalExecution> find(UUID resourceId) {
        return executions.findByResourceIdAndSchoolId(resourceId, school());
    }
    @Transactional(readOnly = true)
    public List<ApprovalExecutionResponse> feeRequests() {
        return executions.findBySchoolIdAndOperationNotOrderByCreatedAtDesc(school(), "DISCOUNT")
                .stream().map(this::response).toList();
    }
    public void effective(ApprovalExecution e) {
        if (!"APPROVED".equals(e.getStatus())) throw invalid("Tous les niveaux doivent être approuvés avant application.");
        e.setStatus("EFFECTIVE"); e.setEffectiveAt(OffsetDateTime.now());
        audit.logValidate("ApprovalExecution", e.getId(), e.getLabel(), "Validation complète et opération appliquée.");
    }
    public boolean canDecide(ApprovalExecution e) {
        return "SUBMITTED".equals(e.getStatus()) && e.getStages().get(e.getCurrentLevel() - 1)
                .getMembers().stream().anyMatch(v -> v.getUserId().equals(actor.requireId()) && v.getDecision() == null);
    }
    public ApprovalExecutionResponse response(ApprovalExecution e) {
        return new ApprovalExecutionResponse(e.getResourceId(), e.getOperation(), e.getLabel(),
                e.getCircuitName(), e.getStatus(), e.getCurrentLevel(), e.getStages(), e.getPayload(),
                e.getCreatedBy(), e.getCreatedAt(), e.getEffectiveAt(), canDecide(e));
    }
    private UUID school() {
        UUID id = TenantContext.getSchoolId();
        if (id == null) throw BusinessException.of(ErrorCode.SCHOOL_NOT_FOUND);
        return id;
    }
    private BusinessException invalid(String message) { return BusinessException.of(ErrorCode.VALIDATION_ERROR, message); }
}
