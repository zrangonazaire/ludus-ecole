package ci.company.eduops.council.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * One council in full: meeting details, participants and pupil outcomes.
 */
@Schema(name = "Council", description = "Conseil de classe détaillé")
public class CouncilResponse {

    private UUID id;
    private UUID classroomId;
    private String classroomName;
    private UUID levelId;
    private String levelName;
    private UUID termId;
    private String termName;
    private UUID academicYearId;
    private LocalDate meetingDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private UUID chairedBy;
    private String location;
    private String status;
    private String statusLabel;

    @Schema(example = "13.4")
    private java.math.BigDecimal classAverage;

    @Schema(example = "87.5")
    private java.math.BigDecimal successRate;

    private String remarks;
    private String minutesUrl;
    private OffsetDateTime closedAt;
    private boolean editable;
    private List<CouncilParticipantResponse> participants = new ArrayList<>();
    private List<StudentDecisionResponse> students = new ArrayList<>();

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

    public UUID getLevelId() {
        return levelId;
    }

    public void setLevelId(UUID levelId) {
        this.levelId = levelId;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public UUID getTermId() {
        return termId;
    }

    public void setTermId(UUID termId) {
        this.termId = termId;
    }

    public String getTermName() {
        return termName;
    }

    public void setTermName(String termName) {
        this.termName = termName;
    }

    public UUID getAcademicYearId() {
        return academicYearId;
    }

    public void setAcademicYearId(UUID academicYearId) {
        this.academicYearId = academicYearId;
    }

    public LocalDate getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(LocalDate meetingDate) {
        this.meetingDate = meetingDate;
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

    public UUID getChairedBy() {
        return chairedBy;
    }

    public void setChairedBy(UUID chairedBy) {
        this.chairedBy = chairedBy;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public void setStatusLabel(String statusLabel) {
        this.statusLabel = statusLabel;
    }

    public java.math.BigDecimal getClassAverage() {
        return classAverage;
    }

    public void setClassAverage(java.math.BigDecimal classAverage) {
        this.classAverage = classAverage;
    }

    public java.math.BigDecimal getSuccessRate() {
        return successRate;
    }

    public void setSuccessRate(java.math.BigDecimal successRate) {
        this.successRate = successRate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getMinutesUrl() {
        return minutesUrl;
    }

    public void setMinutesUrl(String minutesUrl) {
        this.minutesUrl = minutesUrl;
    }

    public OffsetDateTime getClosedAt() {
        return closedAt;
    }

    public void setClosedAt(OffsetDateTime closedAt) {
        this.closedAt = closedAt;
    }

    public boolean isEditable() {
        return editable;
    }

    public void setEditable(boolean editable) {
        this.editable = editable;
    }

    public List<CouncilParticipantResponse> getParticipants() {
        return participants;
    }

    public void setParticipants(List<CouncilParticipantResponse> participants) {
        this.participants = participants;
    }

    public List<StudentDecisionResponse> getStudents() {
        return students;
    }

    public void setStudents(List<StudentDecisionResponse> students) {
        this.students = students;
    }
}