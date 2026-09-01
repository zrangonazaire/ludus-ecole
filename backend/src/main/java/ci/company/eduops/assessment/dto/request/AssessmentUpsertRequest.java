package ci.company.eduops.assessment.dto.request;

import ci.company.eduops.assessment.domain.AssessmentType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/** A graded exercise, created or corrected. */
@Schema(name = "AssessmentUpsert", description = "Un devoir à planifier ou à corriger")
public class AssessmentUpsertRequest {

    @NotNull
    private UUID classroomId;

    @NotNull
    private UUID subjectId;

    @NotNull
    @Schema(description = "L'enseignant qui corrige. Il doit être affecté à cette "
            + "matière dans cette classe.")
    private UUID teacherId;

    @Schema(description = "Nulle, la période couvrant la date du devoir est retenue")
    private UUID termId;

    @NotBlank
    @Size(max = 200)
    @Schema(example = "Devoir surveillé n°2 — équations")
    private String title;

    @Size(max = 2000)
    private String description;

    @NotNull
    private AssessmentType assessmentType;

    @NotNull
    @Schema(description = "Le jour du devoir. Il doit tomber dans la période retenue : "
            + "une date hors période ferait entrer la note dans le mauvais bulletin.")
    private LocalDate assessmentDate;

    @Positive
    private Integer durationMinutes;

    @NotNull
    @DecimalMin("0.001")
    @DecimalMax("1000")
    @Schema(description = "Le barème. 20 par défaut, mais un devoir noté sur 40 est "
            + "ramené sur 20 avant d'entrer dans la moyenne.", example = "20")
    private BigDecimal maxScore;

    @NotNull
    @DecimalMin("0.001")
    @DecimalMax("100")
    @Schema(description = "Poids du devoir dans la moyenne de la matière", example = "1")
    private BigDecimal coefficient;

    @Schema(description = "Faux pour un devoir blanc : il est corrigé et rendu, "
            + "mais n'entre dans aucune moyenne.")
    private boolean countsForAverage = true;

    public UUID getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(UUID classroomId) {
        this.classroomId = classroomId;
    }

    public UUID getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(UUID subjectId) {
        this.subjectId = subjectId;
    }

    public UUID getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(UUID teacherId) {
        this.teacherId = teacherId;
    }

    public UUID getTermId() {
        return termId;
    }

    public void setTermId(UUID termId) {
        this.termId = termId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AssessmentType getAssessmentType() {
        return assessmentType;
    }

    public void setAssessmentType(AssessmentType assessmentType) {
        this.assessmentType = assessmentType;
    }

    public LocalDate getAssessmentDate() {
        return assessmentDate;
    }

    public void setAssessmentDate(LocalDate assessmentDate) {
        this.assessmentDate = assessmentDate;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
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

    public boolean isCountsForAverage() {
        return countsForAverage;
    }

    public void setCountsForAverage(boolean countsForAverage) {
        this.countsForAverage = countsForAverage;
    }
}
