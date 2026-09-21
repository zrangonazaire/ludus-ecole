package ci.company.eduops.student.service;

import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.school.domain.School;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.domain.StudentStatus;
import ci.company.eduops.student.domain.StudentStatusHistory;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.student.repository.StudentStatusHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

/**
 * Student identity operations: matricule generation and guarded status
 * transitions (sections 16 and 17).
 */
@Service
public class StudentService {

    private static final Logger log = LoggerFactory.getLogger(StudentService.class);
    private static final String SCOPE_STUDENT = "STUDENT";

    private final StudentRepository studentRepository;
    private final StudentStatusHistoryRepository statusHistoryRepository;
    private final NumberSequenceService numberSequenceService;
    private final AuditService auditService;
    private final CurrentUser currentUser;

    public StudentService(StudentRepository studentRepository,
                          StudentStatusHistoryRepository statusHistoryRepository,
                          NumberSequenceService numberSequenceService,
                          AuditService auditService,
                          CurrentUser currentUser) {
        this.studentRepository = studentRepository;
        this.statusHistoryRepository = statusHistoryRepository;
        this.numberSequenceService = numberSequenceService;
        this.auditService = auditService;
        this.currentUser = currentUser;
    }

    /** Allocates the next matricule from the school's configurable pattern. */
    public String generateStudentNumber(School school) {
        return numberSequenceService.next(school.getId(), SCOPE_STUDENT,
                school.getStudentNumberPattern(), school.getCode());
    }

    /**
     * Applies a status transition, refusing illegal jumps and recording the
     * change in the student's history.
     */
    @Transactional
    public Student changeStatus(Student student, StudentStatus target, String reason) {
        StudentStatus from = student.getStatus();
        student.changeStatus(target);   // throws when the transition is not allowed
        studentRepository.save(student);

        StudentStatusHistory history = new StudentStatusHistory();
        history.setStudentId(student.getId());
        history.setFromStatus(from);
        history.setToStatus(target);
        history.setReason(reason);
        history.setChangedBy(currentUser.id().orElse(null));
        statusHistoryRepository.save(history);

        auditService.logUpdate("Student", student.getId(), student.getStudentNumber(),
                Map.<String, Object>of("status", from.name()),
                Map.<String, Object>of("status", target.name()));

        log.info("Student {} moved from {} to {} ({})",
                student.getStudentNumber(), from, target, reason);
        return student;
    }

    @Transactional
    public Student changeStatus(UUID studentId, StudentStatus target, String reason) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.STUDENT_NOT_FOUND));
        return changeStatus(student, target, reason);
    }

    @Transactional(readOnly = true)
    public Student require(UUID studentId) {
        return studentRepository.findById(studentId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.STUDENT_NOT_FOUND));
    }

    /**
     * Corrects the civil details of a pupil. Partial by contract: a null field
     * means « leave unchanged ». The matricule and the status never travel
     * through here — one is immutable, the other only moves through the
     * guarded transitions.
     */
    @Transactional
    public Student update(UUID studentId, ci.company.eduops.student.dto.request.StudentUpdateRequest request) {
        Student student = require(studentId);

        if (request.getFirstName() != null && !request.getFirstName().isBlank()) {
            student.setFirstName(request.getFirstName().trim());
        }
        if (request.getLastName() != null && !request.getLastName().isBlank()) {
            student.setLastName(request.getLastName().trim());
        }
        if (request.getBirthDate() != null) {
            student.setBirthDate(request.getBirthDate());
        }
        if (request.getBirthPlace() != null) {
            student.setBirthPlace(request.getBirthPlace().trim());
        }
        if (request.getNationality() != null) {
            student.setNationality(request.getNationality().trim());
        }
        if (request.getEmail() != null) {
            student.setEmail(request.getEmail().trim());
        }
        if (request.getPhone() != null) {
            student.setPhone(request.getPhone().trim());
        }
        if (request.getAddress() != null) {
            student.setAddressLine1(request.getAddress().trim());
        }
        if (request.getPreviousSchool() != null) {
            student.setPreviousSchool(request.getPreviousSchool().trim());
        }
        studentRepository.save(student);

        auditService.logUpdate("Student", student.getId(), student.getStudentNumber(),
                Map.<String, Object>of("field", "identity"),
                Map.<String, Object>of("firstName", student.getFirstName(),
                        "lastName", student.getLastName()));

        log.info("Student {} identity updated", student.getStudentNumber());
        return student;
    }

    /**
     * Flags likely duplicates before creating a student: same first name, last
     * name and date of birth in the same school.
     */
    @Transactional(readOnly = true)
    public boolean looksLikeDuplicate(UUID schoolId, String firstName, String lastName,
                                      java.time.LocalDate birthDate) {
        return !studentRepository
                .findPotentialDuplicates(schoolId, firstName, lastName, birthDate)
                .isEmpty();
    }
}
