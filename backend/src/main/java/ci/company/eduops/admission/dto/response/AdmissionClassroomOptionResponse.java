package ci.company.eduops.admission.dto.response;

import java.util.UUID;

public record AdmissionClassroomOptionResponse(
        UUID id,
        String code,
        String label,
        UUID levelId,
        UUID campusId) {
}
