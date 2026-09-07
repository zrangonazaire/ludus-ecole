package ci.company.eduops.admission.dto.request;

import ci.company.eduops.common.domain.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

public record AdmissionCreateRequest(
        @NotNull UUID academicYearId,
        @NotNull UUID campusId,
        @NotNull UUID requestedLevelId,
        UUID reservedClassroomId,
        @NotBlank @Size(max = 120) String firstName,
        @NotBlank @Size(max = 120) String lastName,
        @Size(max = 120) String middleName,
        @NotNull Gender gender,
        @NotNull @Past LocalDate birthDate,
        @Size(max = 150) String birthPlace,
        @Size(max = 120) String nationality,
        @Size(max = 200) String previousSchool,
        @Size(max = 120) String guardianFirstName,
        @Size(max = 120) String guardianLastName,
        @Size(max = 40) String guardianPhone,
        @Email @Size(max = 180) String guardianEmail,
        @Size(max = 2000) String notes) {
}
