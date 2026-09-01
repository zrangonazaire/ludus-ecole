package ci.company.eduops.option.dto;

import ci.company.eduops.option.domain.OptionChoiceStatus;

import java.time.OffsetDateTime;
import java.util.UUID;

public record OptionChoiceResponse(
        UUID id,
        UUID offeringId,
        UUID optionId,
        String optionCode,
        String optionName,
        String optionColor,
        UUID studentId,
        String studentNumber,
        String studentName,
        String photoUrl,
        UUID enrollmentId,
        String classroomName,
        UUID levelId,
        String levelName,
        int priority,
        OptionChoiceStatus status,
        String statusLabel,
        String notes,
        OffsetDateTime chosenAt,
        OffsetDateTime confirmedAt) {
}
