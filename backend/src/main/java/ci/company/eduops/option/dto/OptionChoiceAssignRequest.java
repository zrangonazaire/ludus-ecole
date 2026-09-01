package ci.company.eduops.option.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record OptionChoiceAssignRequest(
        @NotNull UUID studentId,
        @NotNull UUID offeringId,
        @Min(1) @Max(10) int priority,
        @Size(max = 1000) String notes,
        boolean confirmImmediately) {
}
