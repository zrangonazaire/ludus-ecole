package ci.company.eduops.council.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

/**
 * One person on a council's roll, with the resolved identity (`teacher`,
 * `staff` or `guardian`) already flattened into a label for the screen.
 */
@Schema(name = "CouncilParticipant", description = "Membre d'un conseil de classe")
public class CouncilParticipantResponse {

    private UUID id;
    private UUID councilId;

    @Schema(description = "TEACHER, STAFF ou GUARDIAN")
    private String type;

    @Schema(description = "Identifiant de la personne concernée")
    private UUID personId;

    @Schema(description = "Nom complet résolu de la personne")
    private String name;

    private String roleLabel;
    private boolean present;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getCouncilId() {
        return councilId;
    }

    public void setCouncilId(UUID councilId) {
        this.councilId = councilId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public UUID getPersonId() {
        return personId;
    }

    public void setPersonId(UUID personId) {
        this.personId = personId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRoleLabel() {
        return roleLabel;
    }

    public void setRoleLabel(String roleLabel) {
        this.roleLabel = roleLabel;
    }

    public boolean isPresent() {
        return present;
    }

    public void setPresent(boolean present) {
        this.present = present;
    }
}