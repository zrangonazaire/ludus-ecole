package ci.company.eduops.finance.service;

import ci.company.eduops.approval.service.ApprovalExecutionService;
import ci.company.eduops.approval.dto.response.ApprovalExecutionResponse;
import ci.company.eduops.common.exception.*;
import ci.company.eduops.finance.dto.request.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

/** Every public fee mutation submits a request; only the final vote executes it. */
@Service
@Transactional
public class FeeApprovalService {
    private final ApprovalExecutionService approvals;
    private final FeeConfigurationService fees;
    private final ObjectMapper mapper;
    public FeeApprovalService(ApprovalExecutionService approvals, FeeConfigurationService fees, ObjectMapper mapper) {
        this.approvals = approvals; this.fees = fees; this.mapper = mapper;
    }
    public ApprovalExecutionResponse submit(String operation, UUID circuitId, UUID targetId,
            UUID yearId, Object input) {
        UUID resolvedYear = fees.validateChange(operation, targetId, yearId, input);
        ObjectNode payload = mapper.createObjectNode();
        payload.set("input", mapper.valueToTree(input));
        if (targetId != null) payload.put("targetId", targetId.toString());
        if (resolvedYear != null) payload.put("academicYearId", resolvedYear.toString());
        // Detect changes to the target while a request is waiting for approval.
        payload.put("baseline", fees.changeBaseline(operation, targetId, resolvedYear, input));
        String label = switch (operation) {
            case "CREATE_TYPE" -> "Création du frais : " + ((FeeTypeUpsertRequest) input).getName();
            case "UPDATE_TYPE" -> "Modification du frais : " + ((FeeTypeUpsertRequest) input).getName();
            case "ARCHIVE_TYPE" -> "Archivage : " + fees.typeName(targetId);
            case "SAVE_SCHEDULE" -> "Tarif : " + fees.typeName(((FeeScheduleUpsertRequest) input).getFeeTypeId());
            case "APPLY_SCHEDULE" -> "Tarif groupé : " + fees.typeName(((FeeApplyRequest) input).getSchedule().getFeeTypeId());
            case "DELETE_SCHEDULE" -> "Suppression du tarif : " + fees.scheduleName(targetId);
            default -> throw BusinessException.of(ErrorCode.VALIDATION_ERROR);
        };
        return approvals.response(approvals.submit(circuitId, "FEE", operation, UUID.randomUUID(), label, payload));
    }
    public ApprovalExecutionResponse decide(UUID id, DiscountRequestDecisionRequest input) {
        var execution = approvals.lock(id);
        if ("DISCOUNT".equals(execution.getOperation())) throw BusinessException.of(ErrorCode.ACCESS_DENIED);
        var result = approvals.decide(id, input.getDecision() == DiscountRequestDecisionRequest.Decision.APPROVE, input.getComment());
        if ("APPROVED".equals(result.getStatus())) {
            var data = result.getPayload();
            UUID target = data.hasNonNull("targetId") ? UUID.fromString(data.get("targetId").asText()) : null;
            UUID year = data.hasNonNull("academicYearId") ? UUID.fromString(data.get("academicYearId").asText()) : null;
            String op = result.getOperation();
            Object body = switch (op) {
                case "CREATE_TYPE", "UPDATE_TYPE" -> mapper.convertValue(data.get("input"), FeeTypeUpsertRequest.class);
                case "SAVE_SCHEDULE" -> mapper.convertValue(data.get("input"), FeeScheduleUpsertRequest.class);
                case "APPLY_SCHEDULE" -> mapper.convertValue(data.get("input"), FeeApplyRequest.class);
                default -> null;
            };
            if (!data.path("baseline").asText().equals(fees.changeBaseline(op, target, year, body))) {
                throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                        "Les frais ont changé depuis la demande. Refusez cette demande puis soumettez les nouvelles valeurs.");
            }
            switch (op) {
                case "CREATE_TYPE" -> fees.createType((FeeTypeUpsertRequest) body);
                case "UPDATE_TYPE" -> fees.updateType(target, (FeeTypeUpsertRequest) body);
                case "ARCHIVE_TYPE" -> fees.archiveType(target);
                case "SAVE_SCHEDULE" -> fees.saveSchedule((FeeScheduleUpsertRequest) body, year);
                case "APPLY_SCHEDULE" -> fees.applyToLevels((FeeApplyRequest) body, year);
                case "DELETE_SCHEDULE" -> fees.deleteSchedule(target);
                default -> throw BusinessException.of(ErrorCode.VALIDATION_ERROR);
            }
            approvals.effective(result);
        }
        return approvals.response(result);
    }
}
