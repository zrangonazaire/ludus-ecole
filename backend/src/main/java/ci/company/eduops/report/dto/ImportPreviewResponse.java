package ci.company.eduops.report.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Résultat de l'analyse d'un fichier, avant confirmation.
 *
 * <p>Aucune ligne n'est écrite en base à ce stade : la règle du projet est
 * qu'un fichier n'est jamais inséré sans avoir été prévisualisé
 * (section 72).</p>
 */
@Schema(name = "ImportPreview", description = "Aperçu d'un import, avant écriture")
public class ImportPreviewResponse {

    private UUID batchId;
    private String fileName;
    private int totalRows;
    private int validRows;
    private int warningRows;
    private int duplicateRows;
    private int invalidRows;
    /** Vrai si au moins une ligne est importable. */
    private boolean importable;

    /**
     * Quand ce fichier exact a déjà été importé, s'il l'a été.
     *
     * <p>Nul dans le cas ordinaire. Renseigné quand le contenu est identique
     * au bit près à un import déjà confirmé — l'avertissement le plus utile
     * de cet écran, parce que réimporter une liste crée chaque élève une
     * seconde fois et que rien ne le défait ensuite.</p>
     */
    private OffsetDateTime alreadyImportedAt;

    /** Combien d'élèves ce précédent import avait créés. */
    private int alreadyImportedRows;

    private List<ImportRowResponse> rows = new ArrayList<>();

    public UUID getBatchId() {
        return batchId;
    }

    public void setBatchId(UUID batchId) {
        this.batchId = batchId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public int getTotalRows() {
        return totalRows;
    }

    public void setTotalRows(int totalRows) {
        this.totalRows = totalRows;
    }

    public int getValidRows() {
        return validRows;
    }

    public void setValidRows(int validRows) {
        this.validRows = validRows;
    }

    public int getWarningRows() {
        return warningRows;
    }

    public void setWarningRows(int warningRows) {
        this.warningRows = warningRows;
    }

    public int getDuplicateRows() {
        return duplicateRows;
    }

    public void setDuplicateRows(int duplicateRows) {
        this.duplicateRows = duplicateRows;
    }

    public int getInvalidRows() {
        return invalidRows;
    }

    public void setInvalidRows(int invalidRows) {
        this.invalidRows = invalidRows;
    }

    public boolean isImportable() {
        return importable;
    }

    public void setImportable(boolean importable) {
        this.importable = importable;
    }

    public OffsetDateTime getAlreadyImportedAt() {
        return alreadyImportedAt;
    }

    public void setAlreadyImportedAt(OffsetDateTime alreadyImportedAt) {
        this.alreadyImportedAt = alreadyImportedAt;
    }

    public int getAlreadyImportedRows() {
        return alreadyImportedRows;
    }

    public void setAlreadyImportedRows(int alreadyImportedRows) {
        this.alreadyImportedRows = alreadyImportedRows;
    }

    public List<ImportRowResponse> getRows() {
        return rows;
    }

    public void setRows(List<ImportRowResponse> rows) {
        this.rows = rows;
    }
}
