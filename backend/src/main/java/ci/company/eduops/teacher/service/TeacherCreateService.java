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
import java.util.Locale;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TeacherCreateService {
    private final TeacherRepository teachers;
    private final SchoolRepository schools;
    private final NumberSequenceService numbers;
    private final AuditService audit;
    private final TeacherQueryService queries;

    @Transactional
    public TeacherResponse create(TeacherCreateRequest request) {
        var schoolId = TenantContext.getSchoolId();
        if (schoolId == null) throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND);
        var school = schools.findById(schoolId)
                .orElseThrow(() -> new BusinessException(ErrorCode.SCHOOL_NOT_FOUND));
        var email = request.email().trim().toLowerCase(Locale.ROOT);
        if (teachers.existsBySchoolIdAndEmailIgnoreCase(schoolId, email)) {
            throw new BusinessException(ErrorCode.CONFLICT, "Un enseignant utilise déjà cette adresse e-mail.");
        }
        var teacher = new Teacher();
        teacher.setSchool(school);
        teacher.setEmployeeNumber(numbers.next(schoolId, "TEACHER", "ENS-{year}-{seq:4}", school.getCode()));
        teacher.setFirstName(request.firstName().trim());
        teacher.setLastName(request.lastName().trim());
        teacher.setEmail(email);
        teacher.setPhone(clean(request.phone()));
        teacher.setSpeciality(clean(request.speciality()));
        teacher.setQualification(clean(request.qualification()));
        teacher.setHireDate(request.hireDate());
        teacher.setContractType(request.contractType());
        teacher.setWeeklyHoursMax(request.weeklyHoursMax());
        var saved = teachers.saveAndFlush(teacher);
        audit.logCreate("Teacher", saved.getId(), saved.getEmployeeNumber(),
                Map.of("contractType", saved.getContractType().name()));
        return queries.detail(saved.getId());
    }

    private static String clean(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
