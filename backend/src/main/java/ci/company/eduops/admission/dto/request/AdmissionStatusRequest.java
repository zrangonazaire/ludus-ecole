package ci.company.eduops.admission.dto.request;

import ci.company.eduops.admission.domain.AdmissionStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.UUID;

public record AdmissionStatusRequest(
        @NotNull AdmissionStatus status,
        UUID reservedClassroomId,
        @DecimalMin("0.0") BigDecimal entranceExamScore,
        @Size(max = 2000) String reason) {
}
