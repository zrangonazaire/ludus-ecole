package ci.company.eduops.classroom.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

/**
 * One class group as the screens need it.
 *
 * <p>Seat counts are computed on read from active enrollments, never stored
 * (rule 9). A number returned here is therefore always current, even if a
 * colleague enrolled a student a second ago.</p>
 */
@Schema(name = "Classroom", description = "Classe")
public class ClassroomResponse {

    private UUID id;
    private String code;
    private String name;
    private String section;
    private UUID levelId;
    private String levelName;
    private UUID campusId;
    private String campusName;
    private UUID academicYearId;

    @Schema(example = "45")
    private int capacityMaximum;

    @Schema(example = "38")
    private int activeEnrollments;

    @Schema(example = "7")
    private int availableSeats;

    @Schema(example = "84")
    private int occupancyRate;

    @Schema(description = "AVAILABLE, WARNING, FULL ou OVER_CAPACITY")
    private String capacityStatus;

    private UUID mainTeacherId;
    private String mainTeacherName;

    @Schema(description = "Salle habituelle de la classe : celle que l'emploi du temps "
            + "propose par défaut, quand la classe en a une")
    private UUID defaultRoomId;
    private String defaultRoomName;

    private String languageOfInstruction;
    private String status;

    @Schema(description = "Vrai quand la classe ne porte aucune inscription active")
    private boolean deletable;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public UUID getLevelId() {
        return levelId;
    }

    public void setLevelId(UUID levelId) {
        this.levelId = levelId;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public UUID getCampusId() {
        return campusId;
    }

    public void setCampusId(UUID campusId) {
        this.campusId = campusId;
    }

    public String getCampusName() {
        return campusName;
    }

    public void setCampusName(String campusName) {
        this.campusName = campusName;
    }

    public UUID getAcademicYearId() {
        return academicYearId;
    }

    public void setAcademicYearId(UUID academicYearId) {
        this.academicYearId = academicYearId;
    }

    public int getCapacityMaximum() {
        return capacityMaximum;
    }

    public void setCapacityMaximum(int capacityMaximum) {
        this.capacityMaximum = capacityMaximum;
    }

    public int getActiveEnrollments() {
        return activeEnrollments;
    }

    public void setActiveEnrollments(int activeEnrollments) {
        this.activeEnrollments = activeEnrollments;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public int getOccupancyRate() {
        return occupancyRate;
    }

    public void setOccupancyRate(int occupancyRate) {
        this.occupancyRate = occupancyRate;
    }

    public String getCapacityStatus() {
        return capacityStatus;
    }

    public void setCapacityStatus(String capacityStatus) {
        this.capacityStatus = capacityStatus;
    }

    public UUID getMainTeacherId() {
        return mainTeacherId;
    }

    public void setMainTeacherId(UUID mainTeacherId) {
        this.mainTeacherId = mainTeacherId;
    }

    public String getMainTeacherName() {
        return mainTeacherName;
    }

    public void setMainTeacherName(String mainTeacherName) {
        this.mainTeacherName = mainTeacherName;
    }

    public UUID getDefaultRoomId() {
        return defaultRoomId;
    }

    public void setDefaultRoomId(UUID defaultRoomId) {
        this.defaultRoomId = defaultRoomId;
    }

    public String getDefaultRoomName() {
        return defaultRoomName;
    }

    public void setDefaultRoomName(String defaultRoomName) {
        this.defaultRoomName = defaultRoomName;
    }

    public String getLanguageOfInstruction() {
        return languageOfInstruction;
    }

    public void setLanguageOfInstruction(String languageOfInstruction) {
        this.languageOfInstruction = languageOfInstruction;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isDeletable() {
        return deletable;
    }

    public void setDeletable(boolean deletable) {
        this.deletable = deletable;
    }
}
