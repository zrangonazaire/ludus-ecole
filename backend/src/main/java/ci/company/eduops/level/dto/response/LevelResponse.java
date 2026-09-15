package ci.company.eduops.level.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

<<<<<<< HEAD
/** One grade level as the screens need it. */
@Schema(name = "Level", description = "Un niveau d'enseignement")
=======
/** One level of the school's academic structure. */
@Schema(name = "Level", description = "Un niveau de la structure académique")
>>>>>>> 13f4202 (envoi de maj)
public class LevelResponse {

    private UUID id;
    private UUID cycleId;
    private String cycleName;
    private String code;
    private String name;
    private String shortName;
    private int sequence;
    private UUID nextLevelId;
    private String nextLevelName;
    private boolean terminal;
    private String status;

<<<<<<< HEAD
    @Schema(example = "2", description = "Nombre de classes actives rattachées au niveau")
    private int classroomCount;

    @Schema(description = "Vrai quand le niveau peut être archivé : "
            + "aucune classe active, aucun successeur, aucun programme ni candidature")
    private boolean archivable;
=======
    @Schema(description = "Vrai quand le niveau est le dernier d'un cycle")
    private boolean lastInCycle;
>>>>>>> 13f4202 (envoi de maj)

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getCycleId() {
        return cycleId;
    }

    public void setCycleId(UUID cycleId) {
        this.cycleId = cycleId;
    }

    public String getCycleName() {
        return cycleName;
    }

    public void setCycleName(String cycleName) {
        this.cycleName = cycleName;
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

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    public UUID getNextLevelId() {
        return nextLevelId;
    }

    public void setNextLevelId(UUID nextLevelId) {
        this.nextLevelId = nextLevelId;
    }

    public String getNextLevelName() {
        return nextLevelName;
    }

    public void setNextLevelName(String nextLevelName) {
        this.nextLevelName = nextLevelName;
    }

    public boolean isTerminal() {
        return terminal;
    }

    public void setTerminal(boolean terminal) {
        this.terminal = terminal;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

<<<<<<< HEAD
    public int getClassroomCount() {
        return classroomCount;
    }

    public void setClassroomCount(int classroomCount) {
        this.classroomCount = classroomCount;
    }

    public boolean isArchivable() {
        return archivable;
    }

    public void setArchivable(boolean archivable) {
        this.archivable = archivable;
    }
}
=======
    public boolean isLastInCycle() {
        return lastInCycle;
    }

    public void setLastInCycle(boolean lastInCycle) {
        this.lastInCycle = lastInCycle;
    }
}
>>>>>>> 13f4202 (envoi de maj)
