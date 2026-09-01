package ci.company.eduops.health.dto.response;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

/** One line of the infirmary register. */
public class InfirmaryVisitResponse {

    private UUID id;
    private UUID studentId;
    private String studentNumber;
    private String studentName;
    private String classroomName;
    private OffsetDateTime occurredAt;
    private String complaint;
    private String careGiven;
    private BigDecimal temperatureCelsius;
    private String outcome;
    private String outcomeLabel;
    private String notes;
    private OffsetDateTime guardianNotifiedAt;
    private String referredTo;
    /** Vrai quand l'élève est parti sans que la famille ait été jointe. */
    private boolean awaitingGuardian;

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

    public String getClassroomName() {
        return classroomName;
    }

    public void setClassroomName(String classroomName) {
        this.classroomName = classroomName;
    }

    public OffsetDateTime getOccurredAt() {
        return occurredAt;
    }

    public void setOccurredAt(OffsetDateTime occurredAt) {
        this.occurredAt = occurredAt;
    }

    public String getComplaint() {
        return complaint;
    }

    public void setComplaint(String complaint) {
        this.complaint = complaint;
    }

    public String getCareGiven() {
        return careGiven;
    }

    public void setCareGiven(String careGiven) {
        this.careGiven = careGiven;
    }

    public BigDecimal getTemperatureCelsius() {
        return temperatureCelsius;
    }

    public void setTemperatureCelsius(BigDecimal temperatureCelsius) {
        this.temperatureCelsius = temperatureCelsius;
    }

    public String getOutcome() {
        return outcome;
    }

    public void setOutcome(String outcome) {
        this.outcome = outcome;
    }

    public String getOutcomeLabel() {
        return outcomeLabel;
    }

    public void setOutcomeLabel(String outcomeLabel) {
        this.outcomeLabel = outcomeLabel;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public OffsetDateTime getGuardianNotifiedAt() {
        return guardianNotifiedAt;
    }

    public void setGuardianNotifiedAt(OffsetDateTime guardianNotifiedAt) {
        this.guardianNotifiedAt = guardianNotifiedAt;
    }

    public String getReferredTo() {
        return referredTo;
    }

    public void setReferredTo(String referredTo) {
        this.referredTo = referredTo;
    }

    public boolean isAwaitingGuardian() {
        return awaitingGuardian;
    }

    public void setAwaitingGuardian(boolean awaitingGuardian) {
        this.awaitingGuardian = awaitingGuardian;
    }
}
