package ci.company.eduops.attendance.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** The justification brought by the family for one absence or lateness. */
@Schema(name = "AttendanceJustify", description = "Le justificatif apporté par la famille")
public class AttendanceJustifyRequest {

    @NotBlank
    @Size(max = 255)
    @Schema(description = "Ce qui a été présenté, en clair : « certificat médical du 12/03 », "
            + "« mot des parents ». C'est ce texte que relira le conseil de classe.",
            example = "Certificat médical du 12/03")
    private String reason;

    @Size(max = 500)
    @Schema(description = "Lien vers la pièce numérisée, si elle a été déposée")
    private String documentUrl;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getDocumentUrl() {
        return documentUrl;
    }

    public void setDocumentUrl(String documentUrl) {
        this.documentUrl = documentUrl;
    }
}
