package ci.company.eduops.teacher.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record TeacherAccountRequest(@NotNull UUID userAccountId) {}
