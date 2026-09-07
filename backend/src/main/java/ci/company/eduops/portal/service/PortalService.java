package ci.company.eduops.portal.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.domain.ClassroomStatus;
import ci.company.eduops.classroom.dto.response.ClassroomResponse;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.portal.dto.response.StudentDashboardIdentity;
import ci.company.eduops.portal.dto.response.StudentDashboardResponse;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.repository.TeacherRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * What each portal user may see of their own school life.
 *
 * <p>Every method here derives its subject from the authenticated account,
 * never from a parameter. That is the whole point of a portal: a teacher who
 * could pass {@code ?teacherId=…} would read a colleague's classes, and a
 * pupil who could pass {@code ?studentId=…} would read a classmate's marks.
 * Section 66 of the specification makes this a server responsibility, and it
 * is honoured by simply not accepting the identifier.</p>
 */
@Service
public class PortalService {

    private final TeacherRepository teacherRepository;
    private final ClassroomRepository classroomRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AcademicYearRepository academicYearRepository;
    private final StudentRepository studentRepository;
    private final CurrentUser currentUser;

    public PortalService(TeacherRepository teacherRepository,
                         ClassroomRepository classroomRepository,
                         EnrollmentRepository enrollmentRepository,
                         AcademicYearRepository academicYearRepository,
                         StudentRepository studentRepository,
                         CurrentUser currentUser) {
        this.teacherRepository = teacherRepository;
        this.classroomRepository = classroomRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.academicYearRepository = academicYearRepository;
        this.studentRepository = studentRepository;
        this.currentUser = currentUser;
    }

    /** The classes the connected teacher is form tutor of. */
    @Transactional(readOnly = true)
    public List<ClassroomResponse> classesOfCurrentTeacher() {
        UUID userId = currentUser.requireId();
        Teacher teacher = teacherRepository.findAll().stream()
                .filter((row) -> userId.equals(row.getUserAccountId()))
                .findFirst()
                .orElseThrow(() -> new BusinessException(ErrorCode.PORTAL_PROFILE_MISSING,
                        "Ce compte n'est rattaché à aucun professeur."));

        AcademicYear year = academicYearRepository
                .findBySchoolIdAndStatus(requireSchoolId(), AcademicYearStatus.ACTIVE)
                .orElse(null);
        List<ClassroomResponse> rows = new ArrayList<>();
        if (year == null) {
            return rows;
        }
        for (Classroom classroom : classroomRepository
                .findByAcademicYearIdAndStatus(year.getId(), ClassroomStatus.ACTIVE)) {
            if (classroom.getMainTeacher() == null
                    || !teacher.getId().equals(classroom.getMainTeacher().getId())) {
                continue;
            }
            rows.add(toResponse(classroom));
        }
        return rows;
    }

    /**
     * The connected pupil's own dashboard.
     *
     * <p>Like the teacher's classes, the subject comes from the account, never
     * from a parameter. And nothing about anybody else appears: no ranking, no
     * class average to compare oneself against. A mark is measured against a
     * requirement, not against one's classmates, and a screen that told a
     * child « 23rd of 38 » every morning would be teaching the wrong lesson
     * every morning.</p>
     */
    @Transactional(readOnly = true)
    public StudentDashboardResponse studentDashboard() {
        UUID userId = currentUser.requireId();
        Student student = studentRepository.findByUserAccountId(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PORTAL_PROFILE_MISSING,
                        "Ce compte n'est rattaché à aucun élève."));

        StudentDashboardResponse response = new StudentDashboardResponse();
        StudentDashboardIdentity identity = new StudentDashboardIdentity();
        identity.setId(student.getId());
        identity.setStudentNumber(student.getStudentNumber());
        identity.setFirstName(student.getFirstName());
        identity.setFullName(student.fullName());
        identity.setPhotoUrl(student.getPhotoUrl());
        response.setStudent(identity);

        AcademicYear year = academicYearRepository
                .findBySchoolIdAndStatus(requireSchoolId(), AcademicYearStatus.ACTIVE)
                .orElse(null);
        if (year == null) {
            // Pas d'année ouverte : un espace vide est la réponse juste, pas
            // une erreur. L'élève n'y peut rien.
            return response;
        }
        response.setAcademicYearLabel(year.getLabel());

        enrollmentRepository.findActiveEnrollment(student.getId(), year.getId())
                .ifPresent((enrollment) -> {
                    if (enrollment.getClassroom() != null) {
                        identity.setClassroomName(enrollment.getClassroom().getName());
                        if (enrollment.getClassroom().getLevel() != null) {
                            identity.setLevelName(
                                    enrollment.getClassroom().getLevel().getName());
                        }
                    }
                });
        return response;
    }

    private ClassroomResponse toResponse(Classroom classroom) {
        ClassroomResponse row = new ClassroomResponse();
        row.setId(classroom.getId());
        row.setName(classroom.getName());
        row.setCode(classroom.getCode());
        row.setCapacityMaximum(classroom.getCapacityMaximum());
        row.setStatus(classroom.getStatus() != null ? classroom.getStatus().name() : null);
        if (classroom.getLevel() != null) {
            row.setLevelId(classroom.getLevel().getId());
            row.setLevelName(classroom.getLevel().getName());
        }
        if (classroom.getMainTeacher() != null) {
            row.setMainTeacherId(classroom.getMainTeacher().getId());
            row.setMainTeacherName(classroom.getMainTeacher().fullName());
        }
        long occupied = enrollmentRepository.countOccupiedSeats(classroom.getId());
        row.setActiveEnrollments((int) occupied);
        row.setAvailableSeats(classroom.getCapacityMaximum() - (int) occupied);
        if (classroom.getCapacityMaximum() > 0) {
            row.setOccupancyRate((int) Math.round(
                    occupied * 100.0 / classroom.getCapacityMaximum()));
        }
        return row;
    }

    private UUID requireSchoolId() {
        UUID schoolId = TenantContext.getSchoolId();
        if (schoolId == null) {
            throw new BusinessException(ErrorCode.SCHOOL_NOT_FOUND,
                    "Aucun établissement dans le contexte de la requête.");
        }
        return schoolId;
    }
}
