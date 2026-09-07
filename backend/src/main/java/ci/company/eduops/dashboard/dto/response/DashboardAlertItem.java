package ci.company.eduops.dashboard.dto.response;

import java.time.OffsetDateTime;

/** One thing worth the head teacher's attention this morning. */
public class DashboardAlertItem {

    private String id;
    private String type;
    /** INFO, WARNING, CRITICAL. */
    private String severity;
    private String title;
    private String message;
    private String studentName;
    private String classroomName;
    private OffsetDateTime createdAt = OffsetDateTime.now();

    public DashboardAlertItem() {
    }

    public DashboardAlertItem(String id, String type, String severity,
                              String title, String message) {
        this.id = id;
        this.type = type;
        this.severity = severity;
        this.title = title;
        this.message = message;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
