package ci.company.eduops.attendance.dto.response;

import ci.company.eduops.attendance.domain.AttendanceStatus;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

/** One absence or lateness in the follow-up list. */
@Schema(name = "Absence", description = "Une absence ou un retard à suivre")
public class AbsenceResponse {

    private UUID id;
    private UUID studentId;
    private String studentNumber;
    private String studentName;
    private String photoUrl;

    private UUID classroomId;
    private String classroomName;

    private LocalDate date;
    private AttendanceStatus status;
    private String statusLabel;

    private LocalTime arrivalTime;
    private Integer minutesLate;

    @Schema(description = "Le motif annoncé le jour même, ou le justificatif une fois reçu")
    private String reason;

    private boolean justified;
    private String justificationDocumentUrl;

    @Schema(description = "Nombre de jours écoulés depuis l'absence", example = "3")
    private int daysWaiting;

    @Schema(description = "Vrai pour une absence non justifiée depuis deux jours ou plus. "
            + "Passé ce délai, un justificatif qui n'est pas arrivé n'arrive "
            + "généralement plus tout seul.")
    private boolean needsFollowUp;

    @Schema(description = "Vrai quand la famille a déjà été relancée depuis cet écran")
    private boolean guardianNotified;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public AttendanceStatus getStatus() {
        return status;
    }

    public void setStatus(AttendanceStatus status) {
        this.status = status;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public void setStatusLabel(String statusLabel) {
        this.statusLabel = statusLabel;
    }

    public LocalTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public Integer getMinutesLate() {
        return minutesLate;
    }

    public void setMinutesLate(Integer minutesLate) {
        this.minutesLate = minutesLate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public boolean isJustified() {
        return justified;
    }

    public void setJustified(boolean justified) {
        this.justified = justified;
    }

    public String getJustificationDocumentUrl() {
        return justificationDocumentUrl;
    }

    public void setJustificationDocumentUrl(String justificationDocumentUrl) {
        this.justificationDocumentUrl = justificationDocumentUrl;
    }

    public int getDaysWaiting() {
        return daysWaiting;
    }

    public void setDaysWaiting(int daysWaiting) {
        this.daysWaiting = daysWaiting;
    }

    public boolean isNeedsFollowUp() {
        return needsFollowUp;
    }

    public void setNeedsFollowUp(boolean needsFollowUp) {
        this.needsFollowUp = needsFollowUp;
    }

    public boolean isGuardianNotified() {
        return guardianNotified;
    }

    public void setGuardianNotified(boolean guardianNotified) {
        this.guardianNotified = guardianNotified;
    }
}
