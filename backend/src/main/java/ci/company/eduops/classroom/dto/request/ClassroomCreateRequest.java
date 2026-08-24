package ci.company.eduops.classroom.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

/**
 * Creates one class group inside an existing level.
 *
 * <p>Only the level and the capacity are truly required. The code and the name
 * are derived from the level when the caller leaves them out, which is what the
 * "add one more class" button does: a school that already has "6e A" and
 * "6e B" gets "6e C" without typing anything.</p>
 */
@Schema(name = "ClassroomCreateRequest", description = "Création d'une classe")
public class ClassroomCreateRequest {

    @NotNull
    @Schema(description = "Niveau auquel la classe appartient", requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID levelId;

    @Schema(description = "Campus. Le campus principal est utilisé si absent.")
    private UUID campusId;

    @Schema(description = "Année scolaire. L'année active est utilisée si absente.")
    private UUID academicYearId;

    @Size(max = 40)
    @Schema(description = "Code court, unique par campus et par année. Généré si absent.",
            example = "6E-C")
    private String code;

    @Size(max = 120)
    @Schema(description = "Nom affiché. Déduit du niveau si absent.", example = "6e C")
    private String name;

    @Size(max = 30)
    @Schema(description = "Section ou série, quand le niveau en comporte", example = "Serie D")
    private String section;

    @Min(1)
    @Max(300)
    @Schema(description = "Effectif maximum", example = "45", requiredMode = Schema.RequiredMode.REQUIRED)
    private int capacityMaximum;

    @Min(1)
    @Max(100)
    @Schema(description = "Pourcentage d'occupation à partir duquel la classe est signalée",
            example = "90")
    private int capacityWarningThreshold = 90;

    @Schema(description = "Professeur principal, facultatif")
    private UUID mainTeacherId;

    @Schema(description = "Salle par défaut, facultative")
    private UUID defaultRoomId;

    @Size(max = 60)
    @Schema(description = "Langue d'enseignement", example = "FR")
    private String languageOfInstruction;

    @Schema(description = "Ouvrir la classe immédiatement aux inscriptions", example = "true")
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
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

    public UUID getMainTeacherId() {
        return mainTeacherId;
    }

    public void setMainTeacherId(UUID mainTeacherId) {
        this.mainTeacherId = mainTeacherId;
    }

    public UUID getDefaultRoomId() {
        return defaultRoomId;
    }

    public void setDefaultRoomId(UUID defaultRoomId) {
        this.defaultRoomId = defaultRoomId;
    }

    public String getLanguageOfInstruction() {
        return languageOfInstruction;
    }

    public void setLanguageOfInstruction(String languageOfInstruction) {
        this.languageOfInstruction = languageOfInstruction;
    }

    public boolean isActivateImmediately() {
        return activateImmediately;
    }

    public void setActivateImmediately(boolean activateImmediately) {
        this.activateImmediately = activateImmediately;
    }
}
