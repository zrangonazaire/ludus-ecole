package ci.company.eduops.council.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

/**
 * Adds one person to a council's roll.
 *
 * <p>Exactly one of {@code teacherId}, {@code staffId}, {@code guardianId} must
 * be provided — the database enforces the same rule with its check constraint.</p>
 */
@Schema(name = "CouncilParticipantRequest", description = "Membre d'un conseil de classe")
public class CouncilParticipantRequest {

    @NotBlank
    @Size(max = 120)
    @Schema(description = "Rôle au sein du conseil (président, secrétaire, délégué parent...)",
            example = "Président", requiredMode = Schema.RequiredMode.REQUIRED)
    private String roleLabel;

    @Schema(description = "Professeur participant")
    private UUID teacherId;

    @Schema(description = "Membre du personnel participant")
    private UUID staffId;

    @Schema(description = "Représentant des parents participant")
    private UUID guardianId;

    @Schema(description = "Présence effective à la réunion", example = "true")
    private boolean present = true;

    public String getRoleLabel() {
        return roleLabel;
    }

    public void setRoleLabel(String roleLabel) {
        this.roleLabel = roleLabel;
    }

    public UUID getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(UUID teacherId) {
        this.teacherId = teacherId;
    }

    public UUID getStaffId() {
        return staffId;
    }

    public void setStaffId(UUID staffId) {
        this.staffId = staffId;
    }

    public UUID getGuardianId() {
        return guardianId;
    }

    public void setGuardianId(UUID guardianId) {
        this.guardianId = guardianId;
    }

    public boolean isPresent() {
        return present;
    }

    public void setPresent(boolean present) {
        this.present = present;
    }
}