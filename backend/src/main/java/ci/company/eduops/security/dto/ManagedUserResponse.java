package ci.company.eduops.security.dto;

import ci.company.eduops.security.entity.AppUser;
import java.util.List;
import java.util.UUID;

/**
 * Un compte tel qu'il apparaît dans la gestion des utilisateurs.
 *
 * <p>Le profil Enseignant et la fiche enseignant sont deux choses distinctes :
 * le profil ouvre le portail, la fiche porte le matricule, le contrat et les
 * affectations. {@code teacherProfile} dit que le compte peut recevoir une
 * fiche, {@code hasTeacherRecord} dit qu'il en a une — l'écart entre les deux
 * est exactement le rattachement qu'il reste à faire.</p>
 */
public record ManagedUserResponse(UUID id, String username, String email, String firstName,
        String lastName, String phone, String status, List<Profile> profiles, boolean teacherProfile,
        boolean hasTeacherRecord) {
    public record Profile(UUID id, String label) { }
    public static ManagedUserResponse from(AppUser user, boolean hasTeacherRecord) {
        return new ManagedUserResponse(user.getId(), user.getUsername(), user.getEmail(),
                user.getFirstName(), user.getLastName(), user.getPhone(), user.getStatus().name(),
                user.getRoles().stream().map(r -> new Profile(r.getId(), r.getLabel()))
                        .sorted(java.util.Comparator.comparing(Profile::label)).toList(),
                user.getRoles().stream().anyMatch(r -> "TEACHER".equals(r.getCode())),
                hasTeacherRecord);
    }
}
