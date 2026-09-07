package ci.company.eduops.admission.dto.request;

import jakarta.validation.constraints.Size;

public record AdmissionDocumentRequest(
        boolean received,
        @Size(max = 500) String fileUrl) {
}
