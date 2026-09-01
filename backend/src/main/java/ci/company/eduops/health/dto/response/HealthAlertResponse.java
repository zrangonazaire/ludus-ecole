package ci.company.eduops.health.dto.response;

import java.util.UUID;

/**
 * What a supervising member of staff is told, and nothing more.
 *
 * <p>This class is the confidentiality boundary made visible: it has no field
 * for the diagnosis, the medication regimen, the physician or the notes. A
 * teacher holding one of these knows a pupil carries an adrenaline pen and
 * what to do with it; they do not learn what the pupil is treated for.</p>
 *
 * <p>Adding a field here widens who sees medical detail across the whole
 * school. It should not be done without deciding that on purpose.</p>
 */
public class HealthAlertResponse {

    private UUID studentId;
    private String studentNumber;
    private String studentName;
    private String classroomName;
    /** Le libellé court : « Allergie aux arachides ». Pas le dossier. */
    private String label;
    private String severity;
    private String severityLabel;
    /** La conduite à tenir, écrite pour quelqu'un qui n'est pas soignant. */
    private String actionToTake;
    /** Vrai si l'élève garde son traitement sur lui. */
    private boolean selfCarried;

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

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getSeverityLabel() {
        return severityLabel;
    }

    public void setSeverityLabel(String severityLabel) {
        this.severityLabel = severityLabel;
    }

    public String getActionToTake() {
        return actionToTake;
    }

    public void setActionToTake(String actionToTake) {
        this.actionToTake = actionToTake;
    }

    public boolean isSelfCarried() {
        return selfCarried;
    }

    public void setSelfCarried(boolean selfCarried) {
        this.selfCarried = selfCarried;
    }
}
