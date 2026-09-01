package ci.company.eduops.security.dto;

import java.util.List;

public record AccessProfileOverviewResponse(
        List<AccessProfileResponse> profiles,
        List<AccessPermissionResponse> permissions) {
}
