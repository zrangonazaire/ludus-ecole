package ci.company.eduops.report.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Une ligne du fichier importé, telle qu'elle sera présentée à l'utilisateur
 * avant toute écriture en base.
 */
@Schema(name = "ImportRow", description = "Une ligne du fichier, avec son verdict")
public class ImportRowResponse {

    public enum Status {
        /** Prête à être importée. */
        VALID,
        /** Importable, mais quelque chose mérite l'attention. */
        WARNING,
        /** Un élève identique existe déjà : la ligne sera ignorée. */
        DUPLICATE,
        /** Donnée manquante ou invalide : la ligne sera ignorée. */
        INVALID
    }

    private int rowNumber;
    private Status status;
    private Map<String, String> values = new LinkedHashMap<>();
    private List<String> errors = new ArrayList<>();
    private List<String> warnings = new ArrayList<>();
    /** Matricule qui sera attribué, quand la ligne est importable. */
    private String previewStudentNumber;

    public int getRowNumber() {
        return rowNumber;
    }

    public void setRowNumber(int rowNumber) {
        this.rowNumber = rowNumber;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Map<String, String> getValues() {
        return values;
    }

    public void setValues(Map<String, String> values) {
        this.values = values;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

    public List<String> getWarnings() {
        return warnings;
    }

    public void setWarnings(List<String> warnings) {
        this.warnings = warnings;
    }

    public String getPreviewStudentNumber() {
        return previewStudentNumber;
    }

    public void setPreviewStudentNumber(String previewStudentNumber) {
        this.previewStudentNumber = previewStudentNumber;
    }

    public void addError(String message) {
        this.errors.add(message);
        this.status = Status.INVALID;
    }

    public void addWarning(String message) {
        this.warnings.add(message);
        if (this.status == Status.VALID) {
            this.status = Status.WARNING;
        }
    }
}
