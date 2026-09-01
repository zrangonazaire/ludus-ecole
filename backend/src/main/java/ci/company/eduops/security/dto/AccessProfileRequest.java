package ci.company.eduops.security.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.Set;

/** The editable part of a school-owned access profile. */
public record AccessProfileRequest(
        @NotBlank @Size(max = 60) String code,
        @NotBlank @Size(max = 150) String label,
        @Size(max = 500) String description,
        @NotEmpty Set<@NotBlank String> permissionCodes) {
}
