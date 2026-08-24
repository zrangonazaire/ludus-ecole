package ci.company.eduops.classroom.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

/**
 * Adds several class groups to one level in a single call.
 *
 * <p>This exists because the initial configuration wizard asks for a class count
 * per level, and that first guess is regularly too low once real enrollments
 * start arriving. Rather than clicking "new class" five times, a registrar says
 * "add 3 more to 6e" and the names continue the existing series.</p>
 */
@Schema(name = "ClassroomBulkCreateRequest", description = "Ajout de plusieurs classes à un niveau")
public class ClassroomBulkCreateRequest {

    @NotNull
    private UUID levelId;

    private UUID campusId;

    private UUID academicYearId;

    @Min(1)
    @Max(26)
    @Schema(description = "Nombre de classes à ajouter au niveau", example = "3",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private int count = 1;

    @Min(1)
    @Max(300)
    @Schema(description = "Effectif maximum appliqué à chacune des classes créées",
            example = "45", requiredMode = Schema.RequiredMode.REQUIRED)
    private int capacityMaximum;

    @Min(1)
    @Max(100)
    private int capacityWarningThreshold = 90;

    @Schema(description = "Ouvrir les classes immediatement aux inscriptions")
    private boolean activateImmediately = true;

    public UUID getLevelId() {
        return levelId;
    }

    public void setLevelId(UUID levelId) {
        this.levelId = levelId;
    }

    public UUID getCampusId() {
        return campusId;
    }

    public void setCampusId(UUID campusId) {
        this.campusId = campusId;
    }

    public UUID getAcademicYearId() {
        return academicYearId;
    }

    public void setAcademicYearId(UUID academicYearId) {
        this.academicYearId = academicYearId;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getCapacityMaximum() {
        return capacityMaximum;
    }

    public void setCapacityMaximum(int capacityMaximum) {
        this.capacityMaximum = capacityMaximum;
    }

    public int getCapacityWarningThreshold() {
        return capacityWarningThreshold;
    }

    public void setCapacityWarningThreshold(int capacityWarningThreshold) {
        this.capacityWarningThreshold = capacityWarningThreshold;
    }

    public boolean isActivateImmediately() {
        return activateImmediately;
    }

    public void setActivateImmediately(boolean activateImmediately) {
        this.activateImmediately = activateImmediately;
    }
}
