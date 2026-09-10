package ci.company.eduops.curriculum.service;

import ci.company.eduops.academicyear.domain.*;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.domain.*;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.curriculum.domain.*;
import ci.company.eduops.curriculum.repository.*;
import ci.company.eduops.level.domain.Level;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.repository.TeacherRepository;
import org.junit.jupiter.api.*;
import java.math.BigDecimal;
import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TeacherAssignmentServiceTest {
    final AcademicYearRepository years = mock(AcademicYearRepository.class);
    final ClassroomRepository classes = mock(ClassroomRepository.class);
    final TeacherRepository teachers = mock(TeacherRepository.class);
    final CurriculumRepository curricula = mock(CurriculumRepository.class);
    final TeacherAssignmentRepository assignments = mock(TeacherAssignmentRepository.class);
    final AuditService audit = mock(AuditService.class);
    final TeacherAssignmentService service = new TeacherAssignmentService(years, classes, teachers, curricula, assignments, audit);
    final School school = new School();
    final AcademicYear year = new AcademicYear();
    final Teacher teacher = new Teacher();
    final Classroom classroom = new Classroom();
    final Subject subject = new Subject();
    final Curriculum curriculum = new Curriculum();

    @BeforeEach void setup() {
        school.setId(UUID.randomUUID()); TenantContext.setSchoolId(school.getId());
        year.setId(UUID.randomUUID()); year.setSchool(school); year.setStatus(AcademicYearStatus.ACTIVE);
        teacher.setId(UUID.randomUUID()); teacher.setSchool(school);
        classroom.setId(UUID.randomUUID()); classroom.setName("6e A"); classroom.setAcademicYear(year); classroom.setStatus(ClassroomStatus.ACTIVE);
        var level = new Level(); level.setId(UUID.randomUUID()); classroom.setLevel(level);
        subject.setId(UUID.randomUUID()); subject.setSchool(school);
        var cs = new CurriculumSubject(); cs.setSubject(subject); curriculum.getSubjects().add(cs);
        when(years.findBySchoolIdAndStatus(school.getId(), AcademicYearStatus.ACTIVE)).thenReturn(Optional.of(year));
        when(teachers.lockById(teacher.getId())).thenReturn(Optional.of(teacher));
        when(classes.lockById(classroom.getId())).thenReturn(Optional.of(classroom));
        when(curricula.findWithSubjects(year.getId(), level.getId())).thenReturn(Optional.of(curriculum));
        when(assignments.sumWeeklyHours(teacher.getId(), year.getId())).thenReturn(BigDecimal.ZERO);
        when(assignments.saveAndFlush(any())).thenAnswer(call -> {
            TeacherAssignment a = call.getArgument(0); a.setId(UUID.randomUUID()); return a;
        });
    }
    @AfterEach void clear() { TenantContext.clear(); }
    TeacherAssignmentService.Request request() {
        return new TeacherAssignmentService.Request(teacher.getId(), classroom.getId(), subject.getId(), new BigDecimal("2"));
    }
    @Test void createsAssignmentUsedByAuthorization() {
        var row = service.create(request());
        assertEquals(teacher.getId(), row.teacherId());
        verify(assignments).saveAndFlush(argThat(a -> a.getStatus() == AssignmentStatus.ACTIVE && a.getAcademicYear() == year));
        verify(audit).logCreate(eq("TeacherAssignment"), any(), eq("6e A"), anyMap());
    }
    @Test void refusesTeacherFromAnotherSchool() {
        var other = new School(); other.setId(UUID.randomUUID()); teacher.setSchool(other);
        assertThrows(BusinessException.class, () -> service.create(request()));
        verify(assignments, never()).saveAndFlush(any());
    }
    @Test void refusesClassFromAnotherYear() {
        var other = new AcademicYear(); other.setId(UUID.randomUUID()); classroom.setAcademicYear(other);
        assertThrows(BusinessException.class, () -> service.create(request()));
    }
    @Test void refusesSubjectOutsideCurriculum() {
        curriculum.getSubjects().clear();
        assertThrows(BusinessException.class, () -> service.create(request()));
    }
    @Test void refusesAlreadyAssignedSubject() {
        var existing = new TeacherAssignment(); existing.setSubject(subject);
        when(assignments.findByClassroomIdAndStatus(classroom.getId(), AssignmentStatus.ACTIVE)).thenReturn(List.of(existing));
        assertThrows(BusinessException.class, () -> service.create(request()));
        verify(assignments, never()).saveAndFlush(any());
    }
    @Test void refusesWeeklyOverload() {
        when(assignments.sumWeeklyHours(teacher.getId(), year.getId())).thenReturn(new BigDecimal("24"));
        assertThrows(BusinessException.class, () -> service.create(request()));
    }
    @Test void endsAssignmentWithoutDeletingHistory() {
        var assignment = new TeacherAssignment(); assignment.setId(UUID.randomUUID()); assignment.setAcademicYear(year); assignment.setClassroom(classroom);
        when(assignments.findById(assignment.getId())).thenReturn(Optional.of(assignment));
        service.end(assignment.getId());
        assertEquals(AssignmentStatus.ENDED, assignment.getStatus()); assertNotNull(assignment.getEndDate());
        verify(assignments).save(assignment);
    }
    @Test void cannotEndAssignmentOfAnotherSchool() {
        var other = new School(); other.setId(UUID.randomUUID()); year.setSchool(other);
        var assignment = new TeacherAssignment(); assignment.setId(UUID.randomUUID()); assignment.setAcademicYear(year);
        when(assignments.findById(assignment.getId())).thenReturn(Optional.of(assignment));
        assertThrows(BusinessException.class, () -> service.end(assignment.getId()));
        verify(assignments, never()).save(any());
    }
}
