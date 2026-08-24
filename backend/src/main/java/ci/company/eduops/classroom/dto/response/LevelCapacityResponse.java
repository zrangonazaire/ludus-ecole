package ci.company.eduops.classroom.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

/**
 * One level seen from the capacity angle, used to drive the "add a class" form.
 *
 * <p>The configuration wizard asks how many classes each level needs before any
 * student exists, so the answer is a guess. This view shows the guess against
 * reality: how many seats the level actually offers, how many are taken, and
 * what the next class would be called if one more were added.</p>
 */
@Schema(name = "LevelCapacity", description = "État de remplissage d'un niveau")
public class LevelCapacityResponse {

    private UUID levelId;
    private String levelName;
    private String levelCode;
    private String cycleName;

    @Schema(description = "Rang du niveau dans le cycle, pour l'affichage ordonné")
    private int sequence;

    @Schema(example = "3", description = "Nombre de classes actives sur ce niveau")
    private int classroomCount;

    @Schema(example = "135", description = "Somme des effectifs maximums")
    private int totalCapacity;

    @Schema(example = "128", description = "Inscriptions actives sur le niveau")
    private int totalEnrolled;

    @Schema(example = "7")
    private int availableSeats;

    @Schema(example = "94")
    private int occupancyRate;

    @Schema(description = "Vrai quand le niveau approche ou dépasse la saturation")
    private boolean needsMoreClasses;

    @Schema(example = "6e D", description = "Nom proposé pour la prochaine classe du niveau")
    private String suggestedName;

    @Schema(example = "6E-D", description = "Code proposé pour la prochaine classe du niveau")
    private String suggestedCode;

    @Schema(example = "45", description = "Effectif maximum le plus fréquent sur ce niveau")
    private int suggestedCapacity;

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

    public String getLevelCode() {
        return levelCode;
    }

    public void setLevelCode(String levelCode) {
        this.levelCode = levelCode;
    }

    public String getCycleName() {
        return cycleName;
    }

    public void setCycleName(String cycleName) {
        this.cycleName = cycleName;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public int getClassroomCount() {
        return classroomCount;
    }

    public void setClassroomCount(int classroomCount) {
        this.classroomCount = classroomCount;
    }

    public int getTotalCapacity() {
        return totalCapacity;
    }

    public void setTotalCapacity(int totalCapacity) {
        this.totalCapacity = totalCapacity;
    }

    public int getTotalEnrolled() {
        return totalEnrolled;
    }

    public void setTotalEnrolled(int totalEnrolled) {
        this.totalEnrolled = totalEnrolled;
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

    public boolean isNeedsMoreClasses() {
        return needsMoreClasses;
    }

    public void setNeedsMoreClasses(boolean needsMoreClasses) {
        this.needsMoreClasses = needsMoreClasses;
    }

    public String getSuggestedName() {
        return suggestedName;
    }

    public void setSuggestedName(String suggestedName) {
        this.suggestedName = suggestedName;
    }

    public String getSuggestedCode() {
        return suggestedCode;
    }

    public void setSuggestedCode(String suggestedCode) {
        this.suggestedCode = suggestedCode;
    }

    public int getSuggestedCapacity() {
        return suggestedCapacity;
    }

    public void setSuggestedCapacity(int suggestedCapacity) {
        this.suggestedCapacity = suggestedCapacity;
    }
}
