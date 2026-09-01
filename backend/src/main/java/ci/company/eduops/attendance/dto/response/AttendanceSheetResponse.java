package ci.company.eduops.attendance.dto.response;

import ci.company.eduops.attendance.domain.AttendanceSessionStatus;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * A roll call sheet, opened or already recorded.
 *
 * <p>A sheet that has never been submitted comes back with a null id and every
 * pupil marked present. Starting from "everyone is here" is not an assumption:
 * it is the shape of a normal day, and it means the person only touches the
 * lines that differ — which is also the only way the marks stay honest when a
 * class of forty is called in two minutes.</p>
 */
@Schema(name = "AttendanceSheet", description = "Une feuille d'appel")
public class AttendanceSheetResponse {

    @Schema(description = "Nul tant que la feuille n'a jamais été enregistrée")
    private UUID id;

    private UUID classroomId;
    private String classroomName;
    private String levelName;

    @Schema(description = "Nul pour l'appel du jour")
    private UUID subjectId;
    private String subjectName;

    @Schema(description = "L'enseignant auquel la feuille est rattachée")
    private UUID teacherId;
    private String teacherName;

    private LocalDate sessionDate;
    private LocalTime startTime;
    private LocalTime endTime;

    private AttendanceSessionStatus status;
    private String statusLabel;

    private int expectedCount;
    private int presentCount;
    private int absentCount;
    private int lateCount;

    private OffsetDateTime submittedAt;

    @Schema(description = "Faux quand la feuille est verrouillée : elle reste lisible, "
            + "mais plus modifiable")
    private boolean editable;

    private List<AttendanceRecordResponse> records = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

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

    public LocalDate getSessionDate() {
        return sessionDate;
    }

    public void setSessionDate(LocalDate sessionDate) {
        this.sessionDate = sessionDate;
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

    public int getExpectedCount() {
        return expectedCount;
    }

    public void setExpectedCount(int expectedCount) {
        this.expectedCount = expectedCount;
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

    public OffsetDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(OffsetDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public boolean isEditable() {
        return editable;
    }

    public void setEditable(boolean editable) {
        this.editable = editable;
    }

    public List<AttendanceRecordResponse> getRecords() {
        return records;
    }

    public void setRecords(List<AttendanceRecordResponse> records) {
        this.records = records;
    }
}
