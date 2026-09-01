package ci.company.eduops.health.dto.response;

import java.util.UUID;

/**
 * One vaccine of the school's own list.
 *
 * <p>What the school asks to see at enrolment — not a medical prescription.</p>
 */
public class VaccineResponse {

    private UUID id;
    private String code;
    private String label;
    private String description;
    private boolean required;
    private short dosesExpected;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isRequired() {
        return required;
    }

    public void setRequired(boolean required) {
        this.required = required;
    }

    public short getDosesExpected() {
        return dosesExpected;
    }

    public void setDosesExpected(short dosesExpected) {
        this.dosesExpected = dosesExpected;
    }
}
