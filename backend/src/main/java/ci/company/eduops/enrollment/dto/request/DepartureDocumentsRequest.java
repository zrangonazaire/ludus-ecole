package ci.company.eduops.enrollment.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * The papers handed over to the family.
 *
 * <p>Each one is ticked as it is given, not all at once at the end. A family
 * that comes back for a duplicate two years later needs to know which of the
 * four they already have.</p>
 */
@Schema(name = "DepartureDocuments", description = "Les pièces remises à la famille")
public class DepartureDocumentsRequest {

    @Schema(description = "L'exeat : le certificat de sortie que réclame l'école d'accueil")
    private boolean exeatIssued;

    @Schema(description = "Le certificat de radiation")
    private boolean certificateIssued;

    @Schema(description = "Le dernier bulletin, pour que l'élève ne reparte pas sans notes")
    private boolean reportCardIssued;

    @Schema(description = "Le dossier scolaire rendu à la famille : actes, photos, pièces")
    private boolean fileReturned;

    public boolean isExeatIssued() {
        return exeatIssued;
    }

    public void setExeatIssued(boolean exeatIssued) {
        this.exeatIssued = exeatIssued;
    }

    public boolean isCertificateIssued() {
        return certificateIssued;
    }

    public void setCertificateIssued(boolean certificateIssued) {
        this.certificateIssued = certificateIssued;
    }

    public boolean isReportCardIssued() {
        return reportCardIssued;
    }

    public void setReportCardIssued(boolean reportCardIssued) {
        this.reportCardIssued = reportCardIssued;
    }

    public boolean isFileReturned() {
        return fileReturned;
    }

    public void setFileReturned(boolean fileReturned) {
        this.fileReturned = fileReturned;
    }
}
