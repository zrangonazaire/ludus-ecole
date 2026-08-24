package ci.company.eduops.finance.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Sets the price of one fee type on one level, with its payment plan.
 *
 * <p>The instalments must add up to the total. That check is not cosmetic: the
 * total is what a family is told it owes, the instalments are what it is
 * actually billed, and a gap between the two only surfaces months later, on a
 * balance nobody can explain.</p>
 */
@Schema(name = "FeeScheduleUpsertRequest", description = "Tarif d'un type de frais sur un niveau")
public class FeeScheduleUpsertRequest {

    @NotNull
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID feeTypeId;

    @Schema(description = "Niveau concerné. Laissez vide pour un tarif applicable "
            + "à tout l'établissement.")
    private UUID levelId;

    @Size(max = 150)
    @Schema(description = "Libellé affiché sur les avis d'échéance. "
            + "Déduit du type et du niveau si absent.",
            example = "Scolarité 6e")
    private String label;

    @NotNull
    @DecimalMin(value = "0.00", message = "Le montant ne peut pas être négatif.")
    @Digits(integer = 13, fraction = 2)
    @Schema(example = "600000.00", requiredMode = Schema.RequiredMode.REQUIRED)
    private BigDecimal totalAmount;

    @Schema(description = "Vrai si le tarif s'applique aux nouveaux élèves", example = "true")
    private boolean appliesToNewStudents = true;

    @Schema(description = "Vrai si le tarif s'applique aux réinscriptions", example = "true")
    private boolean appliesToReturningStudents = true;

    @Valid
    @Schema(description = "Échéancier. Vide, le montant est dû en une fois.")
    private List<InstalmentRequest> instalments = new ArrayList<>();

    /**
     * Convenience: build a regular plan instead of listing each instalment.
     *
     * <p>When set, the server spreads the total over this many due dates and
     * puts the rounding difference on the first one, so the plan always adds up
     * to the announced total to the last franc.</p>
     */
    @Schema(description = "Nombre d'échéances régulières à générer. "
            + "Ignoré si un échéancier détaillé est fourni.", example = "3")
    private Integer instalmentCount;

    @Schema(description = "Date de la première échéance générée", example = "2026-10-05")
    private java.time.LocalDate firstDueDate;

    @Schema(description = "Nombre de mois entre deux échéances générées", example = "3")
    private Integer monthsBetweenInstalments;

    public UUID getFeeTypeId() {
        return feeTypeId;
    }

    public void setFeeTypeId(UUID feeTypeId) {
        this.feeTypeId = feeTypeId;
    }

    public UUID getLevelId() {
        return levelId;
    }

    public void setLevelId(UUID levelId) {
        this.levelId = levelId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public boolean isAppliesToNewStudents() {
        return appliesToNewStudents;
    }

    public void setAppliesToNewStudents(boolean appliesToNewStudents) {
        this.appliesToNewStudents = appliesToNewStudents;
    }

    public boolean isAppliesToReturningStudents() {
        return appliesToReturningStudents;
    }

    public void setAppliesToReturningStudents(boolean appliesToReturningStudents) {
        this.appliesToReturningStudents = appliesToReturningStudents;
    }

    public List<InstalmentRequest> getInstalments() {
        return instalments;
    }

    public void setInstalments(List<InstalmentRequest> instalments) {
        this.instalments = instalments;
    }

    public Integer getInstalmentCount() {
        return instalmentCount;
    }

    public void setInstalmentCount(Integer instalmentCount) {
        this.instalmentCount = instalmentCount;
    }

    public java.time.LocalDate getFirstDueDate() {
        return firstDueDate;
    }

    public void setFirstDueDate(java.time.LocalDate firstDueDate) {
        this.firstDueDate = firstDueDate;
    }

    public Integer getMonthsBetweenInstalments() {
        return monthsBetweenInstalments;
    }

    public void setMonthsBetweenInstalments(Integer monthsBetweenInstalments) {
        this.monthsBetweenInstalments = monthsBetweenInstalments;
    }

    /** One due date of the payment plan. */
    @Schema(name = "InstalmentRequest", description = "Une échéance")
    public static class InstalmentRequest {

        @Size(max = 120)
        @Schema(example = "1re tranche")
        private String label;

        @NotNull
        @DecimalMin(value = "0.01", message = "Chaque échéance doit être strictement positive.")
        @Digits(integer = 13, fraction = 2)
        @Schema(example = "200000.00", requiredMode = Schema.RequiredMode.REQUIRED)
        private BigDecimal amount;

        @NotNull
        @Schema(example = "2026-10-05", requiredMode = Schema.RequiredMode.REQUIRED)
        private java.time.LocalDate dueDate;

        @Schema(description = "Jours de tolérance avant le passage en impayé", example = "5")
        private int graceDays;

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public BigDecimal getAmount() {
            return amount;
        }

        public void setAmount(BigDecimal amount) {
            this.amount = amount;
        }

        public java.time.LocalDate getDueDate() {
            return dueDate;
        }

        public void setDueDate(java.time.LocalDate dueDate) {
            this.dueDate = dueDate;
        }

        public int getGraceDays() {
            return graceDays;
        }

        public void setGraceDays(int graceDays) {
            this.graceDays = graceDays;
        }
    }
}
