package ci.company.eduops.portal.service;

import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.curriculum.repository.TeacherAssignmentRepository;
import ci.company.eduops.guardian.domain.Guardian;
import ci.company.eduops.guardian.repository.GuardianRepository;
import ci.company.eduops.guardian.repository.StudentGuardianRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.teacher.domain.Teacher;
import ci.company.eduops.teacher.repository.TeacherRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Relation-based access control (section 63).
 *
 * <p>Holding a permission is not enough. A teacher with {@code GRADE_CREATE}
 * may still only grade the classes and subjects they are assigned to (rule 10),
 * and a parent may only read the children linked to their account (rule 11).
 * Every portal read and every teacher write passes through here.</p>
 */
@Service
public class PortalAccessService {

    private static final Logger log = LoggerFactory.getLogger(PortalAccessService.class);

    private final TeacherRepository teacherRepository;
    private final GuardianRepository guardianRepository;
    private final StudentRepository studentRepository;
    private final StudentGuardianRepository studentGuardianRepository;
    private final TeacherAssignmentRepository assignmentRepository;
    private final CurrentUser currentUser;

    public PortalAccessService(TeacherRepository teacherRepository,
                               GuardianRepository guardianRepository,
                               StudentRepository studentRepository,
                               StudentGuardianRepository studentGuardianRepository,
                               TeacherAssignmentRepository assignmentRepository,
                               CurrentUser currentUser) {
        this.teacherRepository = teacherRepository;
        this.guardianRepository = guardianRepository;
        this.studentRepository = studentRepository;
        this.studentGuardianRepository = studentGuardianRepository;
        this.assignmentRepository = assignmentRepository;
        this.currentUser = currentUser;
    }

    /** The teacher profile behind the authenticated account. */
    @Transactional(readOnly = true)
    public Teacher requireTeacherProfile() {
        UUID userId = currentUser.requireId();
        return teacherRepository.findByUserAccountId(userId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.PORTAL_PROFILE_MISSING,
                        "This account is not linked to a teacher record."));
    }

    @Transactional(readOnly = true)
    public Guardian requireGuardianProfile() {
        UUID userId = currentUser.requireId();
        return guardianRepository.findByUserAccountId(userId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.PORTAL_PROFILE_MISSING,
                        "This account is not linked to a guardian record."));
    }

    @Transactional(readOnly = true)
    public Student requireStudentProfile() {
        UUID userId = currentUser.requireId();
        return studentRepository.findByUserAccountId(userId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.PORTAL_PROFILE_MISSING,
                        "This account is not linked to a student record."));
    }

    /**
     * Rule 10: refuses a teacher acting outside their assignment.
     * Administrators bypass this check, teachers never do.
     */
    @Transactional(readOnly = true)
    public void requireTeacherScope(UUID classroomId, UUID subjectId) {
        if (currentUser.isAdministrator()) {
            return;
        }
        if (!currentUser.hasRole("TEACHER")) {
            return; // other staff roles are governed by their permissions only
        }
        Teacher teacher = requireTeacherProfile();
        boolean allowed = subjectId == null
                ? assignmentRepository.isTeacherOnClassroom(teacher.getId(), classroomId)
                : assignmentRepository.isTeacherAssigned(teacher.getId(), classroomId, subjectId);

        if (!allowed) {
            log.warn("Teacher {} attempted to act on class {} / subject {} without an assignment",
                    teacher.getEmployeeNumber(), classroomId, subjectId);
            throw BusinessException.of(ErrorCode.TEACHER_NOT_ASSIGNED)
                    .detail("classroomId", String.valueOf(classroomId))
                    .detail("subjectId", String.valueOf(subjectId));
        }
    }

    /**
     * Rule 11: refuses a parent reading a child that is not theirs.
     *
     * @throws BusinessException {@code UNAUTHORIZED_STUDENT_ACCESS} (HTTP 403)
     */
    @Transactional(readOnly = true)
    public void requireGuardianOwnsStudent(UUID studentId) {
        if (currentUser.isAdministrator()) {
            return;
        }
        Guardian guardian = requireGuardianProfile();
        if (!studentGuardianRepository.isGuardianOfStudent(guardian.getId(), studentId)) {
            log.warn("Guardian {} attempted to access student {} without a link",
                    guardian.getId(), studentId);
            throw BusinessException.of(ErrorCode.UNAUTHORIZED_STUDENT_ACCESS)
                    .detail("studentId", String.valueOf(studentId));
        }
    }

    /** A student may only read their own record. */
    @Transactional(readOnly = true)
    public void requireOwnStudentRecord(UUID studentId) {
        if (currentUser.isAdministrator()) {
            return;
        }
        Student student = requireStudentProfile();
        if (!student.getId().equals(studentId)) {
            throw BusinessException.of(ErrorCode.UNAUTHORIZED_STUDENT_ACCESS);
        }
    }

    /** The children a parent account is allowed to see. */
    @Transactional(readOnly = true)
    public List<UUID> accessibleStudentIds() {
        Guardian guardian = requireGuardianProfile();
        return studentGuardianRepository.findStudentIdsForGuardian(guardian.getId());
    }

    /** The classes a teacher is allowed to work on for a given year. */
    @Transactional(readOnly = true)
    public List<UUID> accessibleClassroomIds(UUID academicYearId) {
        Teacher teacher = requireTeacherProfile();
        return assignmentRepository.findClassroomIdsForTeacher(teacher.getId(), academicYearId);
    }
}
