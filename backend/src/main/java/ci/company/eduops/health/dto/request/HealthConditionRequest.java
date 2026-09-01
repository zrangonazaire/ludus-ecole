package ci.company.eduops.health.dto.request;

import ci.company.eduops.health.domain.HealthConditionKind;
import ci.company.eduops.health.domain.HealthSeverity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

/** Declares or amends one line of the health file. */
public class HealthConditionRequest {

    @NotNull
    private UUID studentId;

    @NotNull
    private HealthConditionKind kind;

    @NotBlank
    @Size(max = 160)
    private String label;

    @NotNull
    private HealthSeverity severity;

    private String description;

    /**
     * The action to take. Mandatory once the severity makes this an alert —
     * checked in the service, because the rule depends on another field and a
     * bean-validation annotation cannot see it.
     */
    private String actionToTake;

    @Size(max = 200)
    private String medication;

    private boolean selfCarried;

    private LocalDate declaredOn;

    public UUID getStudentId() {
        return studentId;
    }

    public void setStudentId(UUID studentId) {
        this.studentId = studentId;
    }

    public HealthConditionKind getKind() {
        return kind;
    }

    public void setKind(HealthConditionKind kind) {
        this.kind = kind;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public HealthSeverity getSeverity() {
        return severity;
    }

    public void setSeverity(HealthSeverity severity) {
        this.severity = severity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getActionToTake() {
        return actionToTake;
    }

    public void setActionToTake(String actionToTake) {
        this.actionToTake = actionToTake;
    }

    public String getMedication() {
        return medication;
    }

    public void setMedication(String medication) {
        this.medication = medication;
    }

    public boolean isSelfCarried() {
        return selfCarried;
    }

    public void setSelfCarried(boolean selfCarried) {
        this.selfCarried = selfCarried;
    }

    public LocalDate getDeclaredOn() {
        return declaredOn;
    }

    public void setDeclaredOn(LocalDate declaredOn) {
        this.declaredOn = declaredOn;
    }
}
