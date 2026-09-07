package ci.company.eduops.dashboard.dto.response;

import java.util.UUID;

/** Une classe qui demande une décision : trop pleine, ou presque vide. */
public class ClassroomSummary {

    private UUID id;
    private String name;
    private String levelName;
    private int capacityMaximum;
    private int currentEnrollment;
    /** Le motif de la remontée, en clair : « 38 élèves pour 35 places ». */
    private String reason;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public int getCapacityMaximum() {
        return capacityMaximum;
    }

    public void setCapacityMaximum(int capacityMaximum) {
        this.capacityMaximum = capacityMaximum;
    }

    public int getCurrentEnrollment() {
        return currentEnrollment;
    }

    public void setCurrentEnrollment(int currentEnrollment) {
        this.currentEnrollment = currentEnrollment;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
