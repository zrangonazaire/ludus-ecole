package ci.company.eduops.enrollment.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

/** Moving a pupil to another class inside the school. */
@Schema(name = "ClassChange", description = "Le changement de classe d'un élève")
public class ClassChangeRequest {

    @NotNull
    private UUID enrollmentId;

    @NotNull
    private UUID toClassroomId;

    @NotBlank
    @Size(max = 1000)
    @Schema(description = "Pourquoi l'élève change de classe. Ce motif reste au dossier "
            + "et se relit au conseil de classe.",
            example = "Rééquilibrage des effectifs après trois arrivées en 6e A")
    private String reason;

    @Schema(description = "Vrai pour passer outre la capacité de la classe d'accueil. "
            + "Réservé aux situations où la décision est déjà prise ailleurs.")
    private boolean overrideCapacity;

    public UUID getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(UUID enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public UUID getToClassroomId() {
        return toClassroomId;
    }

    public void setToClassroomId(UUID toClassroomId) {
        this.toClassroomId = toClassroomId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public boolean isOverrideCapacity() {
        return overrideCapacity;
    }

    public void setOverrideCapacity(boolean overrideCapacity) {
        this.overrideCapacity = overrideCapacity;
    }
}
