package ci.company.eduops.admission.dto.response;

import ci.company.eduops.admission.domain.AdmissionStatus;
import ci.company.eduops.common.domain.Gender;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record AdmissionResponse(
        UUID id,
        String applicationNumber,
        UUID academicYearId,
        String academicYearLabel,
        UUID campusId,
        String campusName,
        UUID requestedLevelId,
        String requestedLevelName,
        UUID reservedClassroomId,
        String reservedClassroomName,
        String firstName,
        String lastName,
        String middleName,
        String fullName,
        Gender gender,
        LocalDate birthDate,
        String birthPlace,
        String nationality,
        String previousSchool,
        String guardianFirstName,
        String guardianLastName,
        String guardianFullName,
        String guardianPhone,
        String guardianEmail,
        AdmissionStatus status,
        OffsetDateTime submittedAt,
        OffsetDateTime reviewedAt,
        OffsetDateTime decisionAt,
        String decisionReason,
        BigDecimal entranceExamScore,
        boolean documentsComplete,
        boolean seatReserved,
        String notes,
        List<AdmissionDocumentResponse> documents,
        OffsetDateTime createdAt) {
}
