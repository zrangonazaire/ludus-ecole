package ci.company.eduops.teacher.dto;

import ci.company.eduops.common.domain.ContractType;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record TeacherCreateRequest(
        @NotBlank @Size(max = 120) String firstName,
        @NotBlank @Size(max = 120) String lastName,
        @NotBlank @Email @Size(max = 180) String email,
        @Size(max = 40) String phone,
        @Size(max = 150) String speciality,
        @Size(max = 150) String qualification,
        @NotNull LocalDate hireDate,
        @NotNull ContractType contractType,
        @NotNull @Min(1) @Max(60) Integer weeklyHoursMax) {}
