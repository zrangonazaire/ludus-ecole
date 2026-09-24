package ci.company.eduops.supply;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;

public record SupplyListRequest(
        @PositiveOrZero Long version,
        @NotBlank @Size(max = 160) String title,
        @NotNull @Size(max = 4000) String notes,
        @NotEmpty @Size(max = 200) List<@NotNull @Valid Item> items) {
    public record Item(@NotBlank @Size(max = 200) String name,
                       @NotNull @Min(1) @Max(999) Integer quantity,
                       @NotNull @Size(max = 500) String details) {}
}
