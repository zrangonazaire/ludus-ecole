package ci.company.eduops.option.dto;

import ci.company.eduops.option.domain.OptionChoiceStatus;
import jakarta.validation.constraints.NotNull;

public record OptionChoiceStatusRequest(@NotNull OptionChoiceStatus status) {
}
