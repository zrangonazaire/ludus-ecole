package ci.company.eduops.timetable.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * One draggable item: a subject and the teacher assigned to it for this class.
 *
 * <p>The palette is built from the teaching assignments rather than from the
 * subject catalogue. Dragging from it therefore cannot produce the
 * "enseignant non affecté" refusal — the impossible combination is simply not
 * offered.</p>
 */
@Schema(name = "TimetablePaletteEntry", description = "Une matière et son enseignant, prête à poser")
public class TimetablePaletteEntryResponse {

    private UUID subjectId;
    private String subjectName;
    private String subjectShortName;
    private String subjectColor;

    private UUID teacherId;
    private String teacherName;

    @Schema(example = "4.00", description = "Volume horaire hebdomadaire prévu par l'affectation")
    private BigDecimal weeklyHours;

    @Schema(example = "120", description = "Minutes déjà posées sur la grille pour ce couple")
    private int placedMinutes;

    @Schema(description = "Vrai quand le volume prévu est atteint ou dépassé")
    private boolean complete;

    public UUID getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(UUID subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getSubjectShortName() {
        return subjectShortName;
    }

    public void setSubjectShortName(String subjectShortName) {
        this.subjectShortName = subjectShortName;
    }

    public String getSubjectColor() {
        return subjectColor;
    }

    public void setSubjectColor(String subjectColor) {
        this.subjectColor = subjectColor;
    }

    public UUID getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(UUID teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public BigDecimal getWeeklyHours() {
        return weeklyHours;
    }

    public void setWeeklyHours(BigDecimal weeklyHours) {
        this.weeklyHours = weeklyHours;
    }

    public int getPlacedMinutes() {
        return placedMinutes;
    }

    public void setPlacedMinutes(int placedMinutes) {
        this.placedMinutes = placedMinutes;
    }

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
    }
}
