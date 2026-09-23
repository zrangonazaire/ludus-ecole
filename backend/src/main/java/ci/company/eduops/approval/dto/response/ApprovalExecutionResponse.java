package ci.company.eduops.approval.dto.response;

import ci.company.eduops.approval.domain.ApprovalExecution.Stage;
import com.fasterxml.jackson.databind.JsonNode;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record ApprovalExecutionResponse(UUID id, String operation, String label,
        String circuitName, String status, int currentLevel, List<Stage> stages,
        JsonNode payload, UUID createdBy, OffsetDateTime createdAt,
        OffsetDateTime effectiveAt, boolean awaitingMyDecision) { }
