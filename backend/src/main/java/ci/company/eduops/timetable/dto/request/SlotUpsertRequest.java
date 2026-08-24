package ci.company.eduops.timetable.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalTime;
import java.util.UUID;

/**
 * Places or moves one course on the grid.
 *
 * <p>The same payload serves the drag-and-drop and the form: a drop sends the
 * new day and time with the existing subject and teacher, a form sends
 * everything at once.</p>
 */
@Schema(name = "SlotUpsertRequest", description = "Placement d'un cours sur la grille")
public class SlotUpsertRequest {

    @NotNull
    @Schema(description = "Classe qui suit le cours", requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID classroomId;

    @NotNull
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID subjectId;

    @NotNull
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private UUID teacherId;

    @Schema(description = "Salle, facultative")
    private UUID roomId;

    @NotNull
    @Schema(example = "MONDAY", requiredMode = Schema.RequiredMode.REQUIRED)
    private String dayOfWeek;

    @NotNull
    @Schema(example = "08:00", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalTime startTime;

    @NotNull
    @Schema(example = "10:00", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalTime endTime;

    @Size(max = 40)
    @Schema(example = "COURSE")
    private String slotType;

    @Size(max = 255)
    private String note;

    @Schema(description = "Trimestre, quand l'emploi du temps change d'un trimestre à l'autre")
    private UUID termId;

    public UUID getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(UUID classroomId) {
        this.classroomId = classroomId;
    }

    public UUID getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(UUID subjectId) {
        this.subjectId = subjectId;
    }

    public UUID getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(UUID teacherId) {
        this.teacherId = teacherId;
    }

    public UUID getRoomId() {
        return roomId;
    }

    public void setRoomId(UUID roomId) {
        this.roomId = roomId;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getSlotType() {
        return slotType;
    }

    public void setSlotType(String slotType) {
        this.slotType = slotType;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public UUID getTermId() {
        return termId;
    }

    public void setTermId(UUID termId) {
        this.termId = termId;
    }
}
