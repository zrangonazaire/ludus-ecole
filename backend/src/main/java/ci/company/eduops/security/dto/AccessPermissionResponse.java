package ci.company.eduops.security.dto;

import java.util.UUID;

public record AccessPermissionResponse(
        UUID id,
        String code,
        String label,
        String module,
        String description) {
}
