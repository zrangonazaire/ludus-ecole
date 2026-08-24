package ci.company.eduops.classroom.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

/**
 * Edits a class that already exists.
 *
 * <p>The level and the academic year are deliberately absent: moving a class to
 * another level would silently move every enrolled student with it. Such a move
 * has to go through enrollments, one student at a time.</p>
 */
@Schema(name = "ClassroomUpdateRequest", description = "Modification d'une classe")
public class ClassroomUpdateRequest {

    @NotBlank
    @Size(max = 120)
    private String name;

    @Size(max = 30)
    private String section;

    @Min(1)
    @Max(300)
    @Schema(description = "Ne peut pas descendre sous l'effectif déjà inscrit")
    private int capacityMaximum;

    @Min(1)
    @Max(100)
    private int capacityWarningThreshold = 90;

    private UUID mainTeacherId;

    private UUID defaultRoomId;

    @Size(max = 60)
    private String languageOfInstruction;

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
}
