package ci.company.eduops.curriculum.service;

import ci.company.eduops.academicyear.domain.*;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.exception.*;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.curriculum.domain.*;
import ci.company.eduops.curriculum.repository.*;
import ci.company.eduops.teacher.domain.TeacherStatus;
import ci.company.eduops.teacher.repository.TeacherRepository;
import jakarta.validation.constraints.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TeacherAssignmentService {
    private final AcademicYearRepository years;
    private final ClassroomRepository classes;
    private final TeacherRepository teachers;
    private final CurriculumRepository curricula;
    private final TeacherAssignmentRepository assignments;
    private final AuditService audit;

    public record Choice(UUID id, String name) {}
    public record ClassChoice(UUID id, String name, List<Choice> subjects) {}
    public record Row(UUID id, UUID teacherId, String teacherName, UUID classroomId,
                      String classroomName, UUID subjectId, String subjectName, BigDecimal weeklyHours) {}
    public record Board(String academicYearCode, List<Choice> teachers, List<ClassChoice> classes, List<Row> assignments) {}
    public record Request(@NotNull UUID teacherId, @NotNull UUID classroomId, @NotNull UUID subjectId,
                          @NotNull @DecimalMin("0.01") @DecimalMax("60") @Digits(integer = 2, fraction = 2) BigDecimal weeklyHours) {}

    @Transactional(readOnly = true)
    public Board board() {
        var schoolId = schoolId();
        var year = years.findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE).orElse(null);
        if (year == null) return new Board(null, List.of(), List.of(), List.of());
        var choices = classes.findByAcademicYearIdAndStatus(year.getId(), ClassroomStatus.ACTIVE).stream()
                .map(c -> new ClassChoice(c.getId(), c.getName(), curricula.findWithSubjects(year.getId(), c.getLevel().getId())
                        .map(p -> p.getSubjects().stream().filter(s -> s.getSubject().getStatus() == CommonStatus.ACTIVE)
                                .map(s -> new Choice(s.getSubject().getId(), s.getSubject().getName())).toList())
                        .orElse(List.of()))).toList();
        return new Board(year.getCode(), teachers.findBySchoolIdAndStatus(schoolId, TeacherStatus.ACTIVE).stream()
                .map(t -> new Choice(t.getId(), t.fullName())).toList(), choices,
                assignments.findByAcademicYearIdAndStatus(year.getId(), AssignmentStatus.ACTIVE).stream().map(this::row).toList());
    }

    @Transactional
    public Row create(Request request) {
        var schoolId = schoolId();
        var year = years.findBySchoolIdAndStatus(schoolId, AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE));
        var teacher = teachers.lockById(request.teacherId())
                .filter(t -> schoolId.equals(t.getSchool().getId()))
                .orElseThrow(() -> new BusinessException(ErrorCode.TEACHER_NOT_FOUND));
        if (teacher.getStatus() != TeacherStatus.ACTIVE) throw new BusinessException(ErrorCode.TEACHER_NOT_ACTIVE);
        var classroom = classes.lockById(request.classroomId())
                .filter(c -> year.getId().equals(c.getAcademicYear().getId()) && c.getStatus() == ClassroomStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.CLASS_NOT_FOUND));
        var subject = curricula.findWithSubjects(year.getId(), classroom.getLevel().getId())
                .stream().flatMap(p -> p.getSubjects().stream()).map(CurriculumSubject::getSubject)
                .filter(s -> s.getId().equals(request.subjectId()) && schoolId.equals(s.getSchool().getId()) && s.getStatus() == CommonStatus.ACTIVE)
                .findFirst().orElseThrow(() -> new BusinessException(ErrorCode.CURRICULUM_SUBJECT_NOT_FOUND));
        if (assignments.findByClassroomIdAndStatus(classroom.getId(), AssignmentStatus.ACTIVE).stream()
                .anyMatch(a -> a.getSubject().getId().equals(subject.getId()))) {
            throw new BusinessException(ErrorCode.CONFLICT, "Cette matière a déjà un enseignant dans cette classe. Terminez son affectation avant de la remplacer.");
        }
        if (assignments.sumWeeklyHours(teacher.getId(), year.getId()).add(request.weeklyHours())
                .compareTo(BigDecimal.valueOf(teacher.getWeeklyHoursMax())) > 0) {
            throw new BusinessException(ErrorCode.CONFLICT, "Le maximum d’heures hebdomadaires de cet enseignant serait dépassé.");
        }
        var assignment = new TeacherAssignment();
        assignment.setTeacher(teacher);
        assignment.setClassroom(classroom);
        assignment.setAcademicYear(year);
        assignment.setSubject(subject);
        assignment.setWeeklyHours(request.weeklyHours());
        var saved = assignments.saveAndFlush(assignment);
        audit.logCreate("TeacherAssignment", saved.getId(), classroom.getName(), Map.of("teacherId", teacher.getId(), "subjectId", subject.getId()));
        return row(saved);
    }

    @Transactional
    public void end(UUID id) {
        var schoolId = schoolId();
        var assignment = assignments.findById(id)
                .filter(a -> schoolId.equals(a.getAcademicYear().getSchool().getId()))
                .orElseThrow(() -> new BusinessException(ErrorCode.TEACHER_NOT_ASSIGNED));
        if (assignment.getAcademicYear().getStatus() != AcademicYearStatus.ACTIVE)
            throw new BusinessException(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE);
        if (assignment.getStatus() != AssignmentStatus.ACTIVE) return;
        assignment.setStatus(AssignmentStatus.ENDED);
        assignment.setEndDate(LocalDate.now().isBefore(assignment.getStartDate()) ? assignment.getStartDate() : LocalDate.now());
        assignments.save(assignment);
        audit.logUpdate("TeacherAssignment", id, assignment.getClassroom().getName(), Map.of("status", "ACTIVE"), Map.of("status", "ENDED"));
    }

    private UUID schoolId() {
        var id = TenantContext.getSchoolId();
        if (id == null) throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND);
        return id;
    }
    private Row row(TeacherAssignment a) {
        return new Row(a.getId(), a.getTeacher().getId(), a.getTeacher().fullName(), a.getClassroom().getId(),
                a.getClassroom().getName(), a.getSubject().getId(), a.getSubject().getName(), a.getWeeklyHours());
    }
}
