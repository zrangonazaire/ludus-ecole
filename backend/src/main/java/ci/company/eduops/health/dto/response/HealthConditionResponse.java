package ci.company.eduops.health.dto.response;

import java.time.LocalDate;
import java.util.UUID;

/** One line of the health file, in full. Infirmary and leadership only. */
public class HealthConditionResponse {

    private UUID id;
    private String kind;
    private String kindLabel;
    private String label;
    private String severity;
    private String severityLabel;
    private String description;
    private String actionToTake;
    private String medication;
    private boolean selfCarried;
    private LocalDate declaredOn;
    private LocalDate resolvedOn;
    private boolean active;
    private boolean alert;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public String getKindLabel() {
        return kindLabel;
    }

    public void setKindLabel(String kindLabel) {
        this.kindLabel = kindLabel;
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

    public LocalDate getResolvedOn() {
        return resolvedOn;
    }

    public void setResolvedOn(LocalDate resolvedOn) {
        this.resolvedOn = resolvedOn;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isAlert() {
        return alert;
    }

    public void setAlert(boolean alert) {
        this.alert = alert;
    }
}
