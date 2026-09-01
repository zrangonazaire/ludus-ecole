package ci.company.eduops.reportcard.dto.request;

import ci.company.eduops.promotion.domain.PromotionDecisionType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;

/**
 * What the school adds to the computed figures.
 *
 * <p>The averages come out of the marks; these lines are the only part of a
 * report card a human writes. They are also the part parents read first, so
 * they are kept separate from the computation and never regenerated.</p>
 */
@Schema(name = "ReportCardRemark", description = "Les appréciations portées sur un bulletin")
public class ReportCardRemarkRequest {

    @Size(max = 2000)
    @Schema(description = "L'appréciation générale, celle que la famille lit en premier")
    private String generalRemark;

    @Size(max = 2000)
    @Schema(description = "Le mot du professeur principal")
    private String headTeacherRemark;

    @Size(max = 2000)
    @Schema(description = "Le mot du chef d'établissement")
    private String principalRemark;

    @Schema(description = "La décision du conseil de classe, quand elle est prise")
    private PromotionDecisionType councilDecision;

    public String getGeneralRemark() {
        return generalRemark;
    }

    public void setGeneralRemark(String generalRemark) {
        this.generalRemark = generalRemark;
    }

    public String getHeadTeacherRemark() {
        return headTeacherRemark;
    }

    public void setHeadTeacherRemark(String headTeacherRemark) {
        this.headTeacherRemark = headTeacherRemark;
    }

    public String getPrincipalRemark() {
        return principalRemark;
    }

    public void setPrincipalRemark(String principalRemark) {
        this.principalRemark = principalRemark;
    }

    public PromotionDecisionType getCouncilDecision() {
        return councilDecision;
    }

    public void setCouncilDecision(PromotionDecisionType councilDecision) {
        this.councilDecision = councilDecision;
    }
}
