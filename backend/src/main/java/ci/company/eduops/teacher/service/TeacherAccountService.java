package ci.company.eduops.teacher.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.*;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.security.entity.*;
import ci.company.eduops.security.repository.AppUserRepository;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.dto.response.TeacherAccountResponse;
import ci.company.eduops.teacher.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TeacherAccountService {
    private final AppUserRepository users;
    private final TeacherRepository teachers;
    private final AuditService audit;

    @Transactional(readOnly = true)
    public List<TeacherAccountResponse> available() {
        return users.availableTeacherAccounts(school()).stream().map(TeacherAccountResponse::from).toList();
    }

    /** The account lock serializes profile changes and two simultaneous link attempts. */
    @Transactional
    public AppUser requireAvailable(UUID id) {
        UUID schoolId = school();
        if (id == null) throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Sélectionnez un utilisateur avec le rôle Enseignant.");
        AppUser user = users.lockInSchool(id, schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.RESOURCE_NOT_FOUND));
        boolean teacherRole = user.getRoles().stream().anyMatch(role -> "TEACHER".equals(role.getCode())
                && (role.getSchoolId() == null || schoolId.equals(role.getSchoolId())));
        if (user.getStatus() != UserStatus.ACTIVE || !teacherRole)
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Le compte doit être actif et porter le rôle Enseignant.");
        if (teachers.findByUserAccountId(id).isPresent())
            throw new BusinessException(ErrorCode.CONFLICT, "Cet utilisateur possède déjà une fiche enseignant.");
        return user;
    }

    @Transactional
    public void linkExisting(UUID teacherId, UUID accountId) {
        AppUser user = requireAvailable(accountId);
        Teacher teacher = teachers.lockById(teacherId)
                .filter(t -> school().equals(t.getSchool().getId()))
                .orElseThrow(() -> new BusinessException(ErrorCode.TEACHER_NOT_FOUND));
        if (teacher.getUserAccountId() != null)
            throw new BusinessException(ErrorCode.CONFLICT, "Cette fiche est déjà rattachée à un utilisateur.");
        copyIdentity(teacher, user);
        teachers.saveAndFlush(teacher);
        audit.logUpdate("Teacher", teacherId, teacher.getEmployeeNumber(), Map.of(), Map.of("userAccountId", accountId));
    }

    public static void copyIdentity(Teacher teacher, AppUser user) {
        teacher.setUserAccountId(user.getId());
        teacher.setFirstName(user.getFirstName()); teacher.setLastName(user.getLastName());
        teacher.setEmail(user.getEmail()); teacher.setPhone(user.getPhone());
    }

    private UUID school() {
        UUID id = TenantContext.getSchoolId();
        if (id == null) throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND);
        return id;
    }
}
