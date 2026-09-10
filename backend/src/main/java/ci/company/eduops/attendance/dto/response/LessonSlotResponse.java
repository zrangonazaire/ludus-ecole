package ci.company.eduops.attendance.dto.response;

import java.time.LocalTime;
import java.util.UUID;

/**
 * Un cours du jour, prêt à recevoir son appel.
 *
 * <p>Vient de l'emploi du temps, pas d'une liste de matières : demander « quelle
 * matière ? » obligerait l'enseignant à retrouver lui-même quel cours a lieu à
 * cette heure-là, et rien n'empêcherait d'ouvrir l'appel d'un cours qui n'existe
 * pas ce jour-là.</p>
 */
public class LessonSlotResponse {

    private UUID subjectId;
    private String subjectName;
    private UUID teacherId;
    private String teacherName;
    private LocalTime startTime;
    private LocalTime endTime;
    private String roomName;

    /** Vrai si une feuille existe déjà pour ce cours et ce jour. */
    private boolean sheetStarted;

    /** Vrai si cette feuille a été soumise ou validée : l'appel est fait. */
    private boolean done;

    private int absentCount;

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

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public boolean isSheetStarted() {
        return sheetStarted;
    }

    public void setSheetStarted(boolean sheetStarted) {
        this.sheetStarted = sheetStarted;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public int getAbsentCount() {
        return absentCount;
    }

    public void setAbsentCount(int absentCount) {
        this.absentCount = absentCount;
    }
}
