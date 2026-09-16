package ci.company.eduops.room.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

/**
 * Création ou édition d'une salle.
 *
 * <p>{@code capacity} suit la contrainte de la base ({@code capacity >= 0}) :
 * une salle dont la capacité n'est pas encore mesurée se saisit à 0, valeur
 * qui se lit « inconnue » et non « aucune place », plutôt qu'avec un nombre
 * inventé que les rapports reprendraient.</p>
 *
 * <p>{@code capacityMaximum} des classes reste une autre notion : elle est
 * gérée par l'écran Classes. Ici il s'agit de la place assise dans un lieu.</p>
 */
@Schema(name = "RoomUpsertRequest", description = "Création ou modification d'une salle")
public class RoomUpsertRequest {

    @NotNull
    @Schema(description = "Campus auquel la salle appartient", requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID campusId;

    @NotBlank
    @Size(max = 30)
    @Schema(description = "Code court, unique dans le campus", example = "A-101",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String code;

    @NotBlank
    @Size(max = 120)
    @Schema(description = "Nom affiché", example = "Salle A 101",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    @Size(max = 120)
    @Schema(description = "Bâtiment, tel qu'il est écrit sur les portes", example = "Bâtiment A")
    private String building;

    @Size(max = 30)
    @Schema(description = "Étage ou niveau", example = "1er étage")
    private String floor;

    @Min(0)
    @Schema(description = "Places assises ; 0 quand la capacité n'est pas connue", example = "45")
    private int capacity;

    @Size(max = 60)
    @Schema(description = "Type de salle (RoomType)", example = "CLASSROOM",
            requiredMode = Schema.RequiredMode.REQUIRED)
    private String roomType = "CLASSROOM";

    public UUID getCampusId() {
        return campusId;
    }

    public void setCampusId(UUID campusId) {
        this.campusId = campusId;
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

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }
}