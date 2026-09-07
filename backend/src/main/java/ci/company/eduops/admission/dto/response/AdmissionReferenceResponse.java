package ci.company.eduops.admission.dto.response;

import java.util.UUID;

public record AdmissionReferenceResponse(UUID id, String code, String label) {
}
