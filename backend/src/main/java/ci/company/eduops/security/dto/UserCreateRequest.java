package ci.company.eduops.security.dto;

import jakarta.validation.constraints.*;
import java.util.Set;
import java.util.UUID;

public record UserCreateRequest(
        @NotBlank @Size(max = 120) @Pattern(regexp = "[A-Za-z0-9._-]+") String username,
        @NotBlank @Email @Size(max = 180) String email,
        @NotBlank @Size(max = 120) String firstName,
        @NotBlank @Size(max = 120) String lastName,
        @NotBlank @Size(min = 10, max = 72) String password,
        @NotEmpty Set<@NotNull UUID> profileIds) { }
