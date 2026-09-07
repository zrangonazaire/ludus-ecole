package ci.company.eduops.admission.dto.response;

import java.time.OffsetDateTime;
import java.util.UUID;

public record AdmissionDocumentResponse(
        UUID id,
        String code,
        String label,
        boolean mandatory,
        boolean received,
        String fileUrl,
        OffsetDateTime receivedAt) {
}
