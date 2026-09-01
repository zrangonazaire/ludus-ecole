package ci.company.eduops.option.dto;

import ci.company.eduops.option.domain.OptionCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record OptionUpsertRequest(
        @NotBlank @Size(max = 30) String code,
        @NotBlank @Size(max = 150) String name,
        @NotNull OptionCategory category,
        @Size(max = 10) String languageCode,
        @Size(max = 1000) String description,
        @Pattern(regexp = "^#[0-9A-Fa-f]{6}$") String colorHex) {
}
