package ci.company.eduops.portal.dto.response;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Une note rendue à l'élève.
 *
 * <p>Seules les notes publiées apparaissent ici. Une note encore en correction
 * qui remonterait au portail transformerait chaque brouillon du professeur en
 * annonce, et rendrait toute rectification impossible sans explication.</p>
 */
public class StudentDashboardGrade {

    private UUID id;
    private String subjectName;
    private String assessmentName;
    private BigDecimal score;
    private BigDecimal maxScore;
    private BigDecimal coefficient;
    private OffsetDateTime publishedAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getAssessmentName() {
        return assessmentName;
    }

    public void setAssessmentName(String assessmentName) {
        this.assessmentName = assessmentName;
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public BigDecimal getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(BigDecimal maxScore) {
        this.maxScore = maxScore;
    }

    public BigDecimal getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(BigDecimal coefficient) {
        this.coefficient = coefficient;
    }

    public OffsetDateTime getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(OffsetDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }
}
