package ci.company.eduops.room.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

/**
 * Une salle, telle que l'affiche l'écran Bâtiments et salles.
 *
 * <p>Les compteurs d'usage sont calculés par le serveur : l'écran doit
 * pouvoir expliquer pourquoi une salle ne peut pas être archivée sans
 * interroger trois modules.</p>
 */
@Schema(name = "Room", description = "Une salle physique d'un campus")
public class RoomResponse {
    private UUID levelId;
    private UUID buildingId;
    public UUID getLevelId() { return levelId; }
    public void setLevelId(UUID value) { levelId = value; }
    public UUID getBuildingId() { return buildingId; }
    public void setBuildingId(UUID value) { buildingId = value; }

    private UUID id;
    private UUID campusId;
    private String campusCode;
    private String campusName;
    private String code;
    private String name;

    @Schema(description = "Bâtiment, null quand il n'a pas été renseigné")
    private String building;

    private String floor;

    @Schema(description = "Places assises ; 0 quand la capacité n'est pas connue")
    private int capacity;

    @Schema(description = "Type de salle", example = "CLASSROOM")
    private String roomType;

    @Schema(description = "ACTIVE ou ARCHIVED")
    private String status;

    @Schema(description = "Cours actifs de l'emploi du temps dans cette salle")
    private int timetableSlotCount;

    @Schema(description = "Classes actives qui ont cette salle par défaut")
    private int defaultClassroomCount;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getTimetableSlotCount() {
        return timetableSlotCount;
    }

    public void setTimetableSlotCount(int timetableSlotCount) {
        this.timetableSlotCount = timetableSlotCount;
    }

    public int getDefaultClassroomCount() {
        return defaultClassroomCount;
    }

    public void setDefaultClassroomCount(int defaultClassroomCount) {
        this.defaultClassroomCount = defaultClassroomCount;
    }

    public boolean isArchivable() {
        return archivable;
    }

    public void setArchivable(boolean archivable) {
        this.archivable = archivable;
    }
}
