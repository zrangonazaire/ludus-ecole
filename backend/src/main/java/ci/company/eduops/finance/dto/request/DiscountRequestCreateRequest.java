package ci.company.eduops.finance.dto.request;

import ci.company.eduops.finance.domain.DiscountType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

/**
 * Création d'une demande de réduction de scolarité.
 *
 * <p>Le circuit est défini ici même : chaque élément de {@code levels}
 * est un palier dans l'ordre de validation, confié à un profil précis.
 * La réduction n'entrera en vigueur qu'après l'approbation du dernier.</p>
 */
@Getter
@Setter
public class DiscountRequestCreateRequest {

    @NotNull
    private UUID studentId;

    @NotBlank
    @Size(max = 150)
    private String label;

    @Size(max = 2000)
    private String reason;

    @NotNull
    private DiscountType discountType = DiscountType.PERCENTAGE;

    /** Pourcentage (≤ 100) ou montant fixe, selon {@code discountType}. */
    @NotNull
    @DecimalMin(value = "0.01")
    private BigDecimal value;

    @Valid
    @NotNull
    @Size(min = 1, max = 5)
    private List<LevelInput> levels;

    @Getter
    @Setter
    public static class LevelInput {

        @NotBlank
        @Size(max = 100)
        private String name;

        /** Code du profil (rôle) habilité à valider ce palier. */
        @NotBlank
        @Size(max = 60)
        private String roleCode;
    }
}
