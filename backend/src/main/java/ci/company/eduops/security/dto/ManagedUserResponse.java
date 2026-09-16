package ci.company.eduops.security.dto;

import ci.company.eduops.security.entity.AppUser;
import java.util.List;
import java.util.UUID;

public record ManagedUserResponse(UUID id, String username, String email, String firstName,
        String lastName, String status, List<Profile> profiles) {
    public record Profile(UUID id, String label) { }
    public static ManagedUserResponse from(AppUser user) {
        return new ManagedUserResponse(user.getId(), user.getUsername(), user.getEmail(),
                user.getFirstName(), user.getLastName(), user.getStatus().name(),
                user.getRoles().stream().map(r -> new Profile(r.getId(), r.getLabel()))
                        .sorted(java.util.Comparator.comparing(Profile::label)).toList());
    }
}
