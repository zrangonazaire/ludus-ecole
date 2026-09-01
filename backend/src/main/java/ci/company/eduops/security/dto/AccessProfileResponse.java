package ci.company.eduops.security.dto;

import java.util.Set;
import java.util.UUID;

public record AccessProfileResponse(
        UUID id,
        String code,
        String label,
        String description,
        boolean systemProfile,
        boolean editable,
        Set<String> permissionCodes,
        int permissionCount,
        long userCount) {
}
