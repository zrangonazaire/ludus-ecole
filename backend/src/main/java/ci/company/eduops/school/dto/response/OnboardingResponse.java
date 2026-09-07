package ci.company.eduops.school.dto.response;

import java.util.ArrayList;
import java.util.List;

/**
 * What the wizard actually created.
 *
 * <p>Counted from the rows that were saved, never from what was asked for. The
 * screen shows these figures, and showing the request back would be the same
 * lie as before — a message announcing fourteen classes when four were
 * created.</p>
 */
public class OnboardingResponse {

    private int cycles;
    private int levels;
    private int classrooms;
    private int subjects;
    private int feeSchedules;

    /**
     * Ce qui a été ignoré, et pourquoi.
     *
     * <p>Un niveau en double, un nom vide : plutôt que de refuser tout
     * l'envoi, on crée le reste et on le dit. L'école voit ce qu'elle doit
     * reprendre au lieu de recommencer à zéro.</p>
     */
    private List<String> skipped = new ArrayList<>();

    public int getCycles() {
        return cycles;
    }

    public void setCycles(int cycles) {
        this.cycles = cycles;
    }

    public int getLevels() {
        return levels;
    }

    public void setLevels(int levels) {
        this.levels = levels;
    }

    public int getClassrooms() {
        return classrooms;
    }

    public void setClassrooms(int classrooms) {
        this.classrooms = classrooms;
    }

    public int getSubjects() {
        return subjects;
    }

    public void setSubjects(int subjects) {
        this.subjects = subjects;
    }

    public int getFeeSchedules() {
        return feeSchedules;
    }

    public void setFeeSchedules(int feeSchedules) {
        this.feeSchedules = feeSchedules;
    }

    public List<String> getSkipped() {
        return skipped;
    }

    public void setSkipped(List<String> skipped) {
        this.skipped = skipped;
    }
}
