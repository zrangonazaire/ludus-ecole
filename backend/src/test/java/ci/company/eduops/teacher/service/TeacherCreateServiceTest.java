package ci.company.eduops.teacher.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.domain.ContractType;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.school.repository.SchoolRepository;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.domain.TeacherStatus;
import ci.company.eduops.teacher.dto.TeacherCreateRequest;
import ci.company.eduops.teacher.repository.TeacherRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TeacherCreateServiceTest {
    final TeacherRepository teachers = mock(TeacherRepository.class);
    final SchoolRepository schools = mock(SchoolRepository.class);
    final NumberSequenceService numbers = mock(NumberSequenceService.class);
    final AuditService audit = mock(AuditService.class);
    final TeacherQueryService queries = mock(TeacherQueryService.class);
    final TeacherCreateService service = new TeacherCreateService(teachers, schools, numbers, audit, queries);
    final TeacherCreateRequest request = new TeacherCreateRequest(" Ada ", " Koffi ", "ADA@example.com",
            " 0123456789 ", " Maths ", " Master ", LocalDate.of(2026, 9, 1), ContractType.PERMANENT, 24);

    @AfterEach void clear() { TenantContext.clear(); }

    @Test void refusesMissingSchoolContext() {
        TenantContext.clear();
        assertThrows(BusinessException.class, () -> service.create(request));
        verifyNoInteractions(teachers, schools, numbers);
    }

    @Test void refusesDuplicateEmailWithinSchool() {
        var school = school();
        when(teachers.existsBySchoolIdAndEmailIgnoreCase(school.getId(), "ada@example.com")).thenReturn(true);
        assertThrows(BusinessException.class, () -> service.create(request));
        verify(teachers, never()).saveAndFlush(any());
        verifyNoInteractions(numbers, audit);
    }

    @Test void createsActiveTeacherInCurrentSchoolAndNormalizesFields() {
        var school = school();
        when(numbers.next(school.getId(), "TEACHER", "ENS-{year}-{seq:4}", "ECOLE")).thenReturn("ENS-2026-0001");
        when(teachers.saveAndFlush(any(Teacher.class))).thenAnswer(call -> {
            Teacher teacher = call.getArgument(0);
            assertSame(school, teacher.getSchool());
            assertEquals("Ada", teacher.getFirstName());
            assertEquals("ada@example.com", teacher.getEmail());
            assertEquals(TeacherStatus.ACTIVE, teacher.getStatus());
            assertEquals(24, teacher.getWeeklyHoursMax());
            teacher.setId(UUID.randomUUID());
            return teacher;
        });
        service.create(request);
        verify(audit).logCreate(eq("Teacher"), any(UUID.class), eq("ENS-2026-0001"), anyMap());
        verify(queries).detail(any(UUID.class));
    }

    private School school() {
        var school = new School();
        school.setId(UUID.randomUUID());
        school.setCode("ECOLE");
        TenantContext.setSchoolId(school.getId());
        when(schools.findById(school.getId())).thenReturn(Optional.of(school));
        return school;
    }
}
