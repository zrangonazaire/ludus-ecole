package ci.company.eduops.admission.dto.response;

import java.util.List;
import java.util.UUID;

public record AdmissionOptionsResponse(
        UUID defaultAcademicYearId,
        List<AdmissionReferenceResponse> academicYears,
        List<AdmissionReferenceResponse> campuses,
        List<AdmissionReferenceResponse> levels,
        List<AdmissionClassroomOptionResponse> classrooms) {
}
