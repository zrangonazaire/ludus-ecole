package ci.company.eduops.reportcard.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.UUID;

/** One subject on a report card. */
@Schema(name = "ReportCardLine", description = "Une matière du bulletin")
public class ReportCardLineResponse {

    private UUID subjectId;

    @Schema(description = "Le nom figé au moment de la génération. Renommer la matière "
            + "plus tard ne réécrit pas les bulletins déjà remis aux familles.")
    private String subjectName;

    private String teacherName;
    private BigDecimal coefficient;

    @Schema(description = "Nulle quand la matière n'a aucune note validée sur la période",
            example = "13.25")
    private BigDecimal subjectAverage;

    @Schema(description = "Moyenne × coefficient : ce qui pèse réellement dans la "
            + "moyenne générale", example = "26.50")
    private BigDecimal weightedAverage;

    private BigDecimal classSubjectAverage;
    private BigDecimal minScore;
    private BigDecimal maxScore;
    private Integer rankInSubject;

    @Schema(description = "Nombre de notes ayant servi au calcul", example = "3")
    private int assessmentCount;

    private String appreciation;
    private int displayOrder;

    public UUID getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(UUID subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public BigDecimal getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(BigDecimal coefficient) {
        this.coefficient = coefficient;
    }

    public BigDecimal getSubjectAverage() {
        return subjectAverage;
    }

    public void setSubjectAverage(BigDecimal subjectAverage) {
        this.subjectAverage = subjectAverage;
    }

    public BigDecimal getWeightedAverage() {
        return weightedAverage;
    }

    public void setWeightedAverage(BigDecimal weightedAverage) {
        this.weightedAverage = weightedAverage;
    }

    public BigDecimal getClassSubjectAverage() {
        return classSubjectAverage;
    }

    public void setClassSubjectAverage(BigDecimal classSubjectAverage) {
        this.classSubjectAverage = classSubjectAverage;
    }

    public BigDecimal getMinScore() {
        return minScore;
    }

    public void setMinScore(BigDecimal minScore) {
        this.minScore = minScore;
    }

    public BigDecimal getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(BigDecimal maxScore) {
        this.maxScore = maxScore;
    }

    public Integer getRankInSubject() {
        return rankInSubject;
    }

    public void setRankInSubject(Integer rankInSubject) {
        this.rankInSubject = rankInSubject;
    }

    public int getAssessmentCount() {
        return assessmentCount;
    }

    public void setAssessmentCount(int assessmentCount) {
        this.assessmentCount = assessmentCount;
    }

    public String getAppreciation() {
        return appreciation;
    }

    public void setAppreciation(String appreciation) {
        this.appreciation = appreciation;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(int displayOrder) {
        this.displayOrder = displayOrder;
    }
}
