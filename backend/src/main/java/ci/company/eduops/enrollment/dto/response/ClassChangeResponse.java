package ci.company.eduops.enrollment.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.UUID;

/** One recorded change of class. */
@Schema(name = "ClassChangeRecord", description = "Un changement de classe enregistré")
public class ClassChangeResponse {

    private UUID id;
    private UUID enrollmentId;
    private UUID studentId;
    private String studentNumber;
    private String studentName;

    private UUID fromClassroomId;
    private String fromClassroomName;
    private UUID toClassroomId;
    private String toClassroomName;

    @Schema(description = "Vrai quand le changement traverse un niveau. C'est rare en "
            + "cours d'année et mérite d'être relu : le programme n'est pas le même.")
    private boolean crossesLevel;

    private String reason;
    private OffsetDateTime transferredAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(UUID enrollmentId) {
        this.enrollmentId = enrollmentId;
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

    public UUID getFromClassroomId() {
        return fromClassroomId;
    }

    public void setFromClassroomId(UUID fromClassroomId) {
        this.fromClassroomId = fromClassroomId;
    }

    public String getFromClassroomName() {
        return fromClassroomName;
    }

    public void setFromClassroomName(String fromClassroomName) {
        this.fromClassroomName = fromClassroomName;
    }

    public UUID getToClassroomId() {
        return toClassroomId;
    }

    public void setToClassroomId(UUID toClassroomId) {
        this.toClassroomId = toClassroomId;
    }

    public String getToClassroomName() {
        return toClassroomName;
    }

    public void setToClassroomName(String toClassroomName) {
        this.toClassroomName = toClassroomName;
    }

    public boolean isCrossesLevel() {
        return crossesLevel;
    }

    public void setCrossesLevel(boolean crossesLevel) {
        this.crossesLevel = crossesLevel;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public OffsetDateTime getTransferredAt() {
        return transferredAt;
    }

    public void setTransferredAt(OffsetDateTime transferredAt) {
        this.transferredAt = transferredAt;
    }
}
