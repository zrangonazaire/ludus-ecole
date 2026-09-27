package ci.company.eduops.teacher.dto;

import ci.company.eduops.common.domain.ContractType;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record TeacherCreateRequest(
        @NotNull java.util.UUID userAccountId,
        @Size(max = 150) String speciality,
        @Size(max = 150) String qualification,
        @NotNull LocalDate hireDate,
        @NotNull ContractType contractType,
        @NotNull @Min(1) @Max(60) Integer weeklyHoursMax) {}
