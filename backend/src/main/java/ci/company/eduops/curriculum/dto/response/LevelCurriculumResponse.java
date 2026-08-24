package ci.company.eduops.curriculum.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * The programme of one level: its subjects, their coefficients, and whether it
 * can actually produce report cards.
 *
 * <p>The screen shows every level of the school, including those with no
 * programme at all. A level that has none is not an empty list to scroll past —
 * it is the reason bulletins cannot be published, and it says so.</p>
 */
@Schema(name = "LevelCurriculum", description = "Le programme d'un niveau")
public class LevelCurriculumResponse {

    private UUID levelId;
    private String levelName;
    private String levelCode;
    private UUID cycleId;
    private String cycleName;

    @Schema(description = "Rang du niveau, pour l'affichage ordonné")
    private int sequence;

    @Schema(description = "Nul tant qu'aucune matière n'a été rattachée au niveau")
    private UUID curriculumId;

    @Schema(example = "8")
    private int subjectCount;

    @Schema(example = "24.00", description = "Somme des coefficients des matières notées")
    private BigDecimal totalCoefficient;

    @Schema(example = "28.00", description = "Somme des volumes horaires hebdomadaires")
    private BigDecimal totalWeeklyHours;

    @Schema(description = "Vrai quand le niveau porte au moins une matière notée : "
            + "les moyennes et les bulletins deviennent alors calculables")
    private boolean ready;

    private List<CurriculumSubjectResponse> subjects = new ArrayList<>();

    public UUID getLevelId() {
        return levelId;
    }

    public void setLevelId(UUID levelId) {
        this.levelId = levelId;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public String getLevelCode() {
        return levelCode;
    }

    public void setLevelCode(String levelCode) {
        this.levelCode = levelCode;
    }

    public UUID getCycleId() {
        return cycleId;
    }

    public void setCycleId(UUID cycleId) {
        this.cycleId = cycleId;
    }

    public String getCycleName() {
        return cycleName;
    }

    public void setCycleName(String cycleName) {
        this.cycleName = cycleName;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public UUID getCurriculumId() {
        return curriculumId;
    }

    public void setCurriculumId(UUID curriculumId) {
        this.curriculumId = curriculumId;
    }

    public int getSubjectCount() {
        return subjectCount;
    }

    public void setSubjectCount(int subjectCount) {
        this.subjectCount = subjectCount;
    }

    public BigDecimal getTotalCoefficient() {
        return totalCoefficient;
    }

    public void setTotalCoefficient(BigDecimal totalCoefficient) {
        this.totalCoefficient = totalCoefficient;
    }

    public BigDecimal getTotalWeeklyHours() {
        return totalWeeklyHours;
    }

    public void setTotalWeeklyHours(BigDecimal totalWeeklyHours) {
        this.totalWeeklyHours = totalWeeklyHours;
    }

    public boolean isReady() {
        return ready;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }

    public List<CurriculumSubjectResponse> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<CurriculumSubjectResponse> subjects) {
        this.subjects = subjects;
    }
}
