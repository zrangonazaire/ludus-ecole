package ci.company.eduops.council.dto.request;

import ci.company.eduops.promotion.domain.PromotionDecisionType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Records (or rectifies) the council's outcome for one enrollment.
 *
 * <p>The enrollment identifies a pupil for this year; {@code decision} is the
 * verdict. {@code toLevelId} overrides the level the decision points to — when
 * absent it is derived from the pupil's current level (next level for a pass,
 * same level for a repeat).</p>
 */
@Schema(name = "CouncilDecisionRequest", description = "Décision du conseil pour une inscription")
public class CouncilDecisionRequest {

    @NotNull
    @Schema(description = "Inscription de l'élève concerné", requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID enrollmentId;

    @NotNull
    @Schema(description = "Verdict du conseil", requiredMode = Schema.RequiredMode.REQUIRED)
    private PromotionDecisionType decision;

    @DecimalMin("0.0")
    @DecimalMax("20.0")
    @Schema(description = "Moyenne annuelle de l'élève", example = "13.5")
    private BigDecimal annualAverage;

    @Schema(description = "Justification de la décision")
    private String justification;

    @Size(max = 255)
    @Schema(description = "Conseil d'orientation")
    private String orientationAdvice;

    @Schema(description = "Niveau de destination, si différent de celui déduit automatiquement")
    private UUID toLevelId;

    public UUID getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(UUID enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public PromotionDecisionType getDecision() {
        return decision;
    }

    public void setDecision(PromotionDecisionType decision) {
        this.decision = decision;
    }

    public BigDecimal getAnnualAverage() {
        return annualAverage;
    }

    public void setAnnualAverage(BigDecimal annualAverage) {
        this.annualAverage = annualAverage;
    }

    public String getJustification() {
        return justification;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }

    public String getOrientationAdvice() {
        return orientationAdvice;
    }

    public void setOrientationAdvice(String orientationAdvice) {
        this.orientationAdvice = orientationAdvice;
    }

    public UUID getToLevelId() {
        return toLevelId;
    }

    public void setToLevelId(UUID toLevelId) {
        this.toLevelId = toLevelId;
    }
}