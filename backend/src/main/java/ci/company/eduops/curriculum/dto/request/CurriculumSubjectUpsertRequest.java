package ci.company.eduops.curriculum.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;

/** Attaches a subject to the programme of one level, or edits its weight. */
@Schema(name = "CurriculumSubjectUpsertRequest",
        description = "Rattachement d'une matière au programme d'un niveau")
public class CurriculumSubjectUpsertRequest {

    @NotNull
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID subjectId;

    @NotNull
    @DecimalMin(value = "0.01", message = "Le coefficient doit être strictement positif.")
    @DecimalMax(value = "20.00", message = "Le coefficient ne peut pas dépasser 20.")
    @Schema(example = "4.00", requiredMode = Schema.RequiredMode.REQUIRED)
    private BigDecimal coefficient;

    @DecimalMin(value = "0.00")
    @DecimalMax(value = "40.00")
    @Schema(example = "5.00", description = "Volume horaire hebdomadaire prévu")
    private BigDecimal weeklyHours;

    @Schema(description = "Fausse pour une option", example = "true")
    private boolean mandatory = true;

    @DecimalMin(value = "0.00")
    @Schema(description = "Moyenne de passage propre à la matière. "
            + "Laissez vide pour reprendre celle du niveau.")
    private BigDecimal passingMark;

    @Schema(description = "Rang d'affichage dans le bulletin")
    private Integer displayOrder;

    public UUID getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(UUID subjectId) {
        this.subjectId = subjectId;
    }

    public BigDecimal getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(BigDecimal coefficient) {
        this.coefficient = coefficient;
    }

    public BigDecimal getWeeklyHours() {
        return weeklyHours;
    }

    public void setWeeklyHours(BigDecimal weeklyHours) {
        this.weeklyHours = weeklyHours;
    }

    public boolean isMandatory() {
        return mandatory;
    }

    public void setMandatory(boolean mandatory) {
        this.mandatory = mandatory;
    }

    public BigDecimal getPassingMark() {
        return passingMark;
    }

    public void setPassingMark(BigDecimal passingMark) {
        this.passingMark = passingMark;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
