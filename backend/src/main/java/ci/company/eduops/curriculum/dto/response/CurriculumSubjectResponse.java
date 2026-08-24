package ci.company.eduops.curriculum.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.UUID;

/** One subject inside the programme of one level, with its weight. */
@Schema(name = "CurriculumSubject", description = "Une matière au programme d'un niveau")
public class CurriculumSubjectResponse {

    private UUID id;
    private UUID subjectId;
    private String subjectCode;
    private String subjectName;
    private String subjectShortName;
    private String subjectColor;

    @Schema(description = "Fausse quand la matière n'entre dans aucune moyenne")
    private boolean graded;

    @Schema(example = "4.00", description = "Poids de la matière dans la moyenne du niveau")
    private BigDecimal coefficient;

    @Schema(example = "5.00", description = "Volume horaire hebdomadaire prévu")
    private BigDecimal weeklyHours;

    @Schema(description = "Fausse pour une option : la matière n'est alors pas due par tous")
    private boolean mandatory;

    @Schema(example = "10.00", description = "Moyenne de passage propre à la matière, si elle diffère")
    private BigDecimal passingMark;

    private int displayOrder;

    @Schema(description = "Vrai quand des évaluations existent déjà : "
            + "la matière ne peut plus être retirée du programme")
    private boolean locked;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(UUID subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getSubjectShortName() {
        return subjectShortName;
    }

    public void setSubjectShortName(String subjectShortName) {
        this.subjectShortName = subjectShortName;
    }

    public String getSubjectColor() {
        return subjectColor;
    }

    public void setSubjectColor(String subjectColor) {
        this.subjectColor = subjectColor;
    }

    public boolean isGraded() {
        return graded;
    }

    public void setGraded(boolean graded) {
        this.graded = graded;
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

    public int getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(int displayOrder) {
        this.displayOrder = displayOrder;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }
}
