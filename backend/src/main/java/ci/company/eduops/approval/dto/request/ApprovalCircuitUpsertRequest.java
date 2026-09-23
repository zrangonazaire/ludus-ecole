package ci.company.eduops.approval.dto.request;

import ci.company.eduops.approval.domain.ApprovalMode;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

/**
 * Création / remplacement d'un circuit : code + nom + 1 à 5 niveaux ordonnés.
 */
@Getter
@Setter
public class ApprovalCircuitUpsertRequest {

    @NotBlank
    @Size(max = 20)
    @Pattern(regexp = "^[A-Za-z0-9_-]{2,20}$",
            message = "Le code tient en 2 à 20 caractères : lettres, chiffres, tirets.")
    private String code;

    @NotBlank
    @Size(max = 150)
    private String name;

    @NotNull
    @Pattern(regexp = "DISCOUNT|FEE")
    private String usage = "DISCOUNT";

    @Valid
    @NotNull
    @Size(min = 1, max = 5)
    private List<LevelInput> levels;

    @Getter
    @Setter
    public static class LevelInput {

        @NotBlank
        @Size(max = 20)
        @Pattern(regexp = "^[A-Za-z0-9_-]{2,20}$",
                message = "Le code de niveau tient en 2 à 20 caractères.")
        private String code;

        @NotNull
        private ApprovalMode mode = ApprovalMode.ALL;

        /** Comptes valideurs nommés : au moins un par niveau. */
        @NotNull
        @Size(min = 1)
        private List<UUID> memberIds;
    }
}
