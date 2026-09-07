package ci.company.eduops.familyrequest.dto;

import ci.company.eduops.familyrequest.domain.FamilyRequestChannel;
import ci.company.eduops.familyrequest.domain.FamilyRequestPriority;
import ci.company.eduops.familyrequest.domain.FamilyRequestStatus;
import ci.company.eduops.familyrequest.domain.FamilyRequestType;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * One request as the office screen shows it.
 *
 * <p>Carries both the code and its French label: the code drives the colour
 * and the filters, the label is what the secretary reads. Sending only the
 * code would make every screen re-implement the same translation table.</p>
 */
public class FamilyRequestResponse {

    private UUID id;
    private String reference;
    private FamilyRequestType type;
    private String typeLabel;
    private FamilyRequestStatus status;
    private String statusLabel;
    private FamilyRequestPriority priority;
    private String priorityLabel;
    private FamilyRequestChannel channel;
    private String channelLabel;
    private String subject;
    private String description;
    private UUID studentId;
    private String studentNumber;
    private String studentName;
    private String classroomName;
    private String guardianName;
    private String guardianPhone;
    private String assignedTo;
    private String internalNote;
    private OffsetDateTime submittedAt;
    private OffsetDateTime dueAt;
    private OffsetDateTime completedAt;
    private boolean overdue;

    public FamilyRequestResponse() {
    }

    public FamilyRequestResponse(UUID id, String reference, FamilyRequestType type,
                                 String typeLabel, FamilyRequestStatus status,
                                 String statusLabel, FamilyRequestPriority priority,
                                 String priorityLabel, FamilyRequestChannel channel,
                                 String channelLabel, String subject, String description,
                                 UUID studentId, String studentNumber, String studentName,
                                 String classroomName, String guardianName,
                                 String guardianPhone, String assignedTo, String internalNote,
                                 OffsetDateTime submittedAt, OffsetDateTime dueAt,
                                 OffsetDateTime completedAt, boolean overdue) {
        this.id = id;
        this.reference = reference;
        this.type = type;
        this.typeLabel = typeLabel;
        this.status = status;
        this.statusLabel = statusLabel;
        this.priority = priority;
        this.priorityLabel = priorityLabel;
        this.channel = channel;
        this.channelLabel = channelLabel;
        this.subject = subject;
        this.description = description;
        this.studentId = studentId;
        this.studentNumber = studentNumber;
        this.studentName = studentName;
        this.classroomName = classroomName;
        this.guardianName = guardianName;
        this.guardianPhone = guardianPhone;
        this.assignedTo = assignedTo;
        this.internalNote = internalNote;
        this.submittedAt = submittedAt;
        this.dueAt = dueAt;
        this.completedAt = completedAt;
        this.overdue = overdue;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public FamilyRequestType getType() {
        return type;
    }

    public void setType(FamilyRequestType type) {
        this.type = type;
    }

    public String getTypeLabel() {
        return typeLabel;
    }

    public void setTypeLabel(String typeLabel) {
        this.typeLabel = typeLabel;
    }

    public FamilyRequestStatus getStatus() {
        return status;
    }

    public void setStatus(FamilyRequestStatus status) {
        this.status = status;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public void setStatusLabel(String statusLabel) {
        this.statusLabel = statusLabel;
    }

    public FamilyRequestPriority getPriority() {
        return priority;
    }

    public void setPriority(FamilyRequestPriority priority) {
        this.priority = priority;
    }

    public String getPriorityLabel() {
        return priorityLabel;
    }

    public void setPriorityLabel(String priorityLabel) {
        this.priorityLabel = priorityLabel;
    }

    public FamilyRequestChannel getChannel() {
        return channel;
    }

    public void setChannel(FamilyRequestChannel channel) {
        this.channel = channel;
    }

    public String getChannelLabel() {
        return channelLabel;
    }

    public void setChannelLabel(String channelLabel) {
        this.channelLabel = channelLabel;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getGuardianName() {
        return guardianName;
    }

    public void setGuardianName(String guardianName) {
        this.guardianName = guardianName;
    }

    public String getGuardianPhone() {
        return guardianPhone;
    }

    public void setGuardianPhone(String guardianPhone) {
        this.guardianPhone = guardianPhone;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public String getInternalNote() {
        return internalNote;
    }

    public void setInternalNote(String internalNote) {
        this.internalNote = internalNote;
    }

    public OffsetDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(OffsetDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public OffsetDateTime getDueAt() {
        return dueAt;
    }

    public void setDueAt(OffsetDateTime dueAt) {
        this.dueAt = dueAt;
    }

    public OffsetDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(OffsetDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public boolean isOverdue() {
        return overdue;
    }

    public void setOverdue(boolean overdue) {
        this.overdue = overdue;
    }
}
