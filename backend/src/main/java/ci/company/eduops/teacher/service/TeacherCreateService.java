package ci.company.eduops.teacher.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.dto.TeacherCreateRequest;
import ci.company.eduops.teacher.dto.response.TeacherResponse;
import ci.company.eduops.teacher.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TeacherCreateService {
    private final TeacherRepository teachers;
    private final SchoolRepository schools;
    private final NumberSequenceService numbers;
    private final AuditService audit;
    private final TeacherQueryService queries;
    private final TeacherAccountService accounts;

    @Transactional
    public TeacherResponse create(TeacherCreateRequest request) {
        var schoolId = TenantContext.getSchoolId();
        if (schoolId == null) throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND);
        var school = schools.findById(schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.SCHOOL_NOT_FOUND));
        var user = accounts.requireAvailable(request.userAccountId());
        if (teachers.existsBySchoolIdAndEmailIgnoreCase(schoolId, user.getEmail())) {
            throw new BusinessException(ErrorCode.CONFLICT, "Une ancienne fiche utilise cet e-mail. Rattachez-la au compte depuis la liste des enseignants.");
        }
        var teacher = new Teacher();
        teacher.setSchool(school);
        teacher.setEmployeeNumber(numbers.next(schoolId, "TEACHER", "ENS-{year}-{seq:4}", school.getCode()));
        TeacherAccountService.copyIdentity(teacher, user);
        teacher.setSpeciality(clean(request.speciality()));
        teacher.setQualification(clean(request.qualification()));
        teacher.setHireDate(request.hireDate());
        teacher.setContractType(request.contractType());
        teacher.setWeeklyHoursMax(request.weeklyHoursMax());
        var saved = teachers.saveAndFlush(teacher);
        audit.logCreate("Teacher", saved.getId(), saved.getEmployeeNumber(),
                Map.of("contractType", saved.getContractType().name(), "userAccountId", user.getId()));
        return queries.detail(saved.getId());
    }

    private static String clean(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
