package ci.company.eduops.security.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
import java.util.UUID;

public record UserProfilesRequest(@NotEmpty Set<@NotNull UUID> profileIds) { }
