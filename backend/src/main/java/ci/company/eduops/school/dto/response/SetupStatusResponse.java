package ci.company.eduops.school.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * How far along the school's configuration is.
 *
 * <p>Everything here is recomputed from the database on each call. A school that
 * creates its classes by hand, without ever opening the wizard, sees the step
 * tick itself off — the checklist reflects reality rather than a remembered
 * position in a form.</p>
 */
@Schema(name = "SetupStatus", description = "Avancement de la configuration de l'établissement")
public class SetupStatusResponse {

    private UUID schoolId;
    private String schoolName;
    private String academicYearCode;

    @Schema(example = "4")
    private int completedSteps;

    @Schema(example = "6")
    private int totalSteps;

    @Schema(example = "67")
    private int percentComplete;

    @Schema(description = "Vrai quand toutes les étapes obligatoires sont faites")
    private boolean complete;

    @Schema(description = "Clé de la prochaine étape à traiter, nulle si terminé")
    private String nextStepKey;

    private List<SetupStepResponse> steps = new ArrayList<>();

    public UUID getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(UUID schoolId) {
        this.schoolId = schoolId;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getAcademicYearCode() {
        return academicYearCode;
    }

    public void setAcademicYearCode(String academicYearCode) {
        this.academicYearCode = academicYearCode;
    }

    public int getCompletedSteps() {
        return completedSteps;
    }

    public void setCompletedSteps(int completedSteps) {
        this.completedSteps = completedSteps;
    }

    public int getTotalSteps() {
        return totalSteps;
    }

    public void setTotalSteps(int totalSteps) {
        this.totalSteps = totalSteps;
    }

    public int getPercentComplete() {
        return percentComplete;
    }

    public void setPercentComplete(int percentComplete) {
        this.percentComplete = percentComplete;
    }

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
    }

    public String getNextStepKey() {
        return nextStepKey;
    }

    public void setNextStepKey(String nextStepKey) {
        this.nextStepKey = nextStepKey;
    }

    public List<SetupStepResponse> getSteps() {
        return steps;
    }

    public void setSteps(List<SetupStepResponse> steps) {
        this.steps = steps;
    }
}
