package ci.company.eduops.room.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

/**
 * Un bâtiment, tel que l'affiche l'écran Bâtiments et salles.
 *
 * <p>Les compteurs sont calculés par le serveur : l'écran doit pouvoir
 * expliquer pourquoi un bâtiment ne peut pas être archivé sans interroger le
 * module des salles.</p>
 */
@Schema(name = "Building", description = "Un bâtiment d'un campus")
public class BuildingResponse {
    public record Level(UUID id, int number, String label) { }
    private java.util.List<Level> levels = java.util.List.of();
    public java.util.List<Level> getLevels() { return levels; }
    public void setLevels(java.util.List<Level> value) { levels = value; }

    private UUID id;
    private UUID campusId;
    private String campusCode;
    private String campusName;
    private String code;
    private String name;

    @Schema(description = "Nombre d'étages au-dessus du rez-de-chaussée ; 0 = plain-pied")
    private int floors;

    @Schema(description = "ACTIVE ou ARCHIVED")
    private String status;

    @Schema(description = "Salles actives rattachées à ce bâtiment")
    private int roomCount;

    @Schema(description = "Places assises des salles actives du bâtiment")
    private int seatCount;

    @Schema(description = "Salles dont la capacité n'est pas renseignée")
    private int unknownCapacityCount;

    @Schema(description = "Vrai quand l'archivage est autorisé (serveur)")
    private boolean archivable;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getCampusId() {
        return campusId;
    }

    public void setCampusId(UUID campusId) {
        this.campusId = campusId;
    }

    public String getCampusCode() {
        return campusCode;
    }

    public void setCampusCode(String campusCode) {
        this.campusCode = campusCode;
    }

    public String getCampusName() {
        return campusName;
    }

    public void setCampusName(String campusName) {
        this.campusName = campusName;
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

    public int getFloors() {
        return floors;
    }

    public void setFloors(int floors) {
        this.floors = floors;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getRoomCount() {
        return roomCount;
    }

    public void setRoomCount(int roomCount) {
        this.roomCount = roomCount;
    }

    public int getSeatCount() {
        return seatCount;
    }

    public void setSeatCount(int seatCount) {
        this.seatCount = seatCount;
    }

    public int getUnknownCapacityCount() {
        return unknownCapacityCount;
    }

    public void setUnknownCapacityCount(int unknownCapacityCount) {
        this.unknownCapacityCount = unknownCapacityCount;
    }

    public boolean isArchivable() {
        return archivable;
    }

    public void setArchivable(boolean archivable) {
        this.archivable = archivable;
    }
}
