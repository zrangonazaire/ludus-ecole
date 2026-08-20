package ci.company.eduops.grade.service;

import java.math.BigDecimal;
import java.util.UUID;

/** Result of one subject's average computation for a pupil and a term. */
public class SubjectAverage {

    private UUID subjectId;
    private String subjectName;
    private UUID teacherId;
    private BigDecimal coefficient;
    private BigDecimal average;
    private BigDecimal weightedAverage;
    private int assessmentCount;
    private BigDecimal classAverage;
    private BigDecimal minScore;
    private BigDecimal maxScore;
    private Integer rankInSubject;
    private String appreciation;

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

    public UUID getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(UUID teacherId) {
        this.teacherId = teacherId;
    }

    public BigDecimal getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(BigDecimal coefficient) {
        this.coefficient = coefficient;
    }

    public BigDecimal getAverage() {
        return average;
    }

    public void setAverage(BigDecimal average) {
        this.average = average;
    }

    public BigDecimal getWeightedAverage() {
        return weightedAverage;
    }

    public void setWeightedAverage(BigDecimal weightedAverage) {
        this.weightedAverage = weightedAverage;
    }

    public int getAssessmentCount() {
        return assessmentCount;
    }

    public void setAssessmentCount(int assessmentCount) {
        this.assessmentCount = assessmentCount;
    }

    public BigDecimal getClassAverage() {
        return classAverage;
    }

    public void setClassAverage(BigDecimal classAverage) {
        this.classAverage = classAverage;
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

    public String getAppreciation() {
        return appreciation;
    }

    public void setAppreciation(String appreciation) {
        this.appreciation = appreciation;
    }
}
