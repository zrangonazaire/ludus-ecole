package ci.company.eduops.attendance.dto.response;

import ci.company.eduops.attendance.domain.AttendanceSessionStatus;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Where one class stands for one day.
 *
 * <p>Classes whose roll call has not been taken appear with {@code done} false
 * rather than being left out. A missing sheet is not an absence of information:
 * it is thirty pupils about whom nothing is known, and that is the single most
 * useful thing this screen can say.</p>
 */
@Schema(name = "ClassroomAttendance", description = "L'état de l'appel d'une classe")
public class ClassroomAttendanceResponse {

    private UUID classroomId;
    private String classroomName;
    private String levelName;

    @Schema(description = "Le professeur principal, à qui la feuille est rattachée")
    private String mainTeacherName;

    @Schema(description = "Nombre d'élèves inscrits dans la classe", example = "38")
    private int expectedCount;

    @Schema(description = "Nul tant que l'appel du jour n'a pas été enregistré")
    private UUID sheetId;

    private AttendanceSessionStatus status;
    private String statusLabel;

    private int presentCount;
    private int absentCount;
    private int lateCount;

    @Schema(description = "Vrai quand l'appel du jour a été enregistré")
    private boolean done;

    private OffsetDateTime submittedAt;

    public UUID getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(UUID classroomId) {
        this.classroomId = classroomId;
    }

    public String getClassroomName() {
        return classroomName;
    }

    public void setClassroomName(String classroomName) {
        this.classroomName = classroomName;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public String getMainTeacherName() {
        return mainTeacherName;
    }

    public void setMainTeacherName(String mainTeacherName) {
        this.mainTeacherName = mainTeacherName;
    }

    public int getExpectedCount() {
        return expectedCount;
    }

    public void setExpectedCount(int expectedCount) {
        this.expectedCount = expectedCount;
    }

    public UUID getSheetId() {
        return sheetId;
    }

    public void setSheetId(UUID sheetId) {
        this.sheetId = sheetId;
    }

    public AttendanceSessionStatus getStatus() {
        return status;
    }

    public void setStatus(AttendanceSessionStatus status) {
        this.status = status;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public void setStatusLabel(String statusLabel) {
        this.statusLabel = statusLabel;
    }

    public int getPresentCount() {
        return presentCount;
    }

    public void setPresentCount(int presentCount) {
        this.presentCount = presentCount;
    }

    public int getAbsentCount() {
        return absentCount;
    }

    public void setAbsentCount(int absentCount) {
        this.absentCount = absentCount;
    }

    public int getLateCount() {
        return lateCount;
    }

    public void setLateCount(int lateCount) {
        this.lateCount = lateCount;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public OffsetDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(OffsetDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }
}
