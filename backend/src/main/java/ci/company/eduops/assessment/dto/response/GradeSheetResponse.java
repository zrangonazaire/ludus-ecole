package ci.company.eduops.assessment.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * A grade sheet: the assessment, its pupils, and how the class did.
 *
 * <p>The distribution travels with the marks because it is what an
 * administrator needs before validating. A paper where two thirds of the class
 * is under 5 is not a bad class — it is usually a paper that was too hard or a
 * scale that was mistyped, and it deserves a second look before the marks reach
 * the families.</p>
 */
@Schema(name = "GradeSheet", description = "La feuille de notes d'un devoir")
public class GradeSheetResponse {

    private AssessmentResponse assessment;

    @Schema(description = "Moyenne de la classe, sur le barème du devoir", example = "11.75")
    private BigDecimal classAverage;

    @Schema(description = "La note du milieu. Loin de la moyenne, elle signale une "
            + "classe coupée en deux plutôt qu'un niveau homogène.", example = "12.00")
    private BigDecimal median;

    private BigDecimal minScore;
    private BigDecimal maxScoreObtained;

    @Schema(description = "Élèves ayant la moyenne", example = "18")
    private int passCount;

    private int absentCount;
    private int exemptedCount;

    @Schema(description = "Élèves sans note ni absence saisie. Tant qu'il en reste, "
            + "le devoir ne peut pas être soumis.", example = "3")
    private int missingCount;

    private List<GradeRowResponse> rows = new ArrayList<>();

    public AssessmentResponse getAssessment() {
        return assessment;
    }

    public void setAssessment(AssessmentResponse assessment) {
        this.assessment = assessment;
    }

    public BigDecimal getClassAverage() {
        return classAverage;
    }

    public void setClassAverage(BigDecimal classAverage) {
        this.classAverage = classAverage;
    }

    public BigDecimal getMedian() {
        return median;
    }

    public void setMedian(BigDecimal median) {
        this.median = median;
    }

    public BigDecimal getMinScore() {
        return minScore;
    }

    public void setMinScore(BigDecimal minScore) {
        this.minScore = minScore;
    }

    public BigDecimal getMaxScoreObtained() {
        return maxScoreObtained;
    }

    public void setMaxScoreObtained(BigDecimal maxScoreObtained) {
        this.maxScoreObtained = maxScoreObtained;
    }

    public int getPassCount() {
        return passCount;
    }

    public void setPassCount(int passCount) {
        this.passCount = passCount;
    }

    public int getAbsentCount() {
        return absentCount;
    }

    public void setAbsentCount(int absentCount) {
        this.absentCount = absentCount;
    }

    public int getExemptedCount() {
        return exemptedCount;
    }

    public void setExemptedCount(int exemptedCount) {
        this.exemptedCount = exemptedCount;
    }

    public int getMissingCount() {
        return missingCount;
    }

    public void setMissingCount(int missingCount) {
        this.missingCount = missingCount;
    }

    public List<GradeRowResponse> getRows() {
        return rows;
    }

    public void setRows(List<GradeRowResponse> rows) {
        this.rows = rows;
    }
}
