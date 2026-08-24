package ci.company.eduops.timetable.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalTime;
import java.util.UUID;

/**
 * One reason a course cannot be placed where it was dropped.
 *
 * <p>Conflicts are returned as a list rather than thrown one at a time: a slot
 * can clash with the teacher's other class <em>and</em> with the room booking,
 * and telling the user only about the first means a second failed attempt.</p>
 */
@Schema(name = "TimetableConflict", description = "Un empêchement sur un créneau")
public class TimetableConflictResponse {

    /** TEACHER_BUSY, CLASS_BUSY, ROOM_BUSY, TEACHER_NOT_ASSIGNED, INVALID_TIME_RANGE. */
    @Schema(example = "TEACHER_BUSY")
    private String kind;

    @Schema(example = "M. Koffi enseigne déjà en 5e A de 08:00 à 10:00.")
    private String message;

    @Schema(description = "Créneau déjà occupé, quand le conflit vient d'un cours existant")
    private UUID conflictingSlotId;

    private String conflictingLabel;
    private LocalTime conflictingStart;
    private LocalTime conflictingEnd;

    public TimetableConflictResponse() {
    }

    public TimetableConflictResponse(String kind, String message) {
        this.kind = kind;
        this.message = message;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UUID getConflictingSlotId() {
        return conflictingSlotId;
    }

    public void setConflictingSlotId(UUID conflictingSlotId) {
        this.conflictingSlotId = conflictingSlotId;
    }

    public String getConflictingLabel() {
        return conflictingLabel;
    }

    public void setConflictingLabel(String conflictingLabel) {
        this.conflictingLabel = conflictingLabel;
    }

    public LocalTime getConflictingStart() {
        return conflictingStart;
    }

    public void setConflictingStart(LocalTime conflictingStart) {
        this.conflictingStart = conflictingStart;
    }

    public LocalTime getConflictingEnd() {
        return conflictingEnd;
    }

    public void setConflictingEnd(LocalTime conflictingEnd) {
        this.conflictingEnd = conflictingEnd;
    }
}
