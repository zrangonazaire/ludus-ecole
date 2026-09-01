package ci.company.eduops.option.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record OptionOfferingsSaveRequest(
        @NotEmpty List<@NotNull UUID> levelIds,
        @Min(1) @Max(500) int capacity,
        @NotNull @DecimalMin("0.25") BigDecimal weeklyHours,
        LocalDate choiceStartDate,
        LocalDate choiceEndDate) {
}
