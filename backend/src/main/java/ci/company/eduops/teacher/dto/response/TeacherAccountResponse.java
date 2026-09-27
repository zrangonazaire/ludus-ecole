package ci.company.eduops.teacher.dto.response;

import ci.company.eduops.security.entity.AppUser;
import java.util.UUID;

public record TeacherAccountResponse(UUID id, String username, String firstName,
        String lastName, String email, String phone) {
    public static TeacherAccountResponse from(AppUser user) {
        return new TeacherAccountResponse(user.getId(), user.getUsername(), user.getFirstName(),
                user.getLastName(), user.getEmail(), user.getPhone());
    }
}
