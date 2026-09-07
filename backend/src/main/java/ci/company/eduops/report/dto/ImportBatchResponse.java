package ci.company.eduops.report.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Une ligne de l'historique des imports.
 *
 * <p>Porte le nom des personnes, pas leur identifiant : c'est un écran de
 * relecture, et « Aminata Koné » répond à la question posée là où un UUID
 * oblige à aller chercher ailleurs.</p>
 */
@Schema(name = "ImportBatch", description = "Un import passé, avec son résultat")
public class ImportBatchResponse {

    private UUID id;
    private String importType;
    private String importTypeLabel;
    private String fileName;
    private String status;
    private String statusLabel;
    private int totalRows;
    private int validRows;
    private int invalidRows;
    private int duplicateRows;
    private int importedRows;
    private String uploadedByName;
    private OffsetDateTime uploadedAt;
    private String confirmedByName;
    private OffsetDateTime confirmedAt;

    /** Les lignes refusées à l'écriture, avec leur motif. Vide le plus souvent. */
    private List<ImportRowResponse> refusedRows = List.of();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getImportType() {
        return importType;
    }

    public void setImportType(String importType) {
        this.importType = importType;
    }

    public String getImportTypeLabel() {
        return importTypeLabel;
    }

    public void setImportTypeLabel(String importTypeLabel) {
        this.importTypeLabel = importTypeLabel;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
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

    public int getInvalidRows() {
        return invalidRows;
    }

    public void setInvalidRows(int invalidRows) {
        this.invalidRows = invalidRows;
    }

    public int getDuplicateRows() {
        return duplicateRows;
    }

    public void setDuplicateRows(int duplicateRows) {
        this.duplicateRows = duplicateRows;
    }

    public int getImportedRows() {
        return importedRows;
    }

    public void setImportedRows(int importedRows) {
        this.importedRows = importedRows;
    }

    public String getUploadedByName() {
        return uploadedByName;
    }

    public void setUploadedByName(String uploadedByName) {
        this.uploadedByName = uploadedByName;
    }

    public OffsetDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(OffsetDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public String getConfirmedByName() {
        return confirmedByName;
    }

    public void setConfirmedByName(String confirmedByName) {
        this.confirmedByName = confirmedByName;
    }

    public OffsetDateTime getConfirmedAt() {
        return confirmedAt;
    }

    public void setConfirmedAt(OffsetDateTime confirmedAt) {
        this.confirmedAt = confirmedAt;
    }

    public List<ImportRowResponse> getRefusedRows() {
        return refusedRows;
    }

    public void setRefusedRows(List<ImportRowResponse> refusedRows) {
        this.refusedRows = refusedRows;
    }
}
