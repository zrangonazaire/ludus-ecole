package ci.company.eduops.enrollment.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.admission.domain.AdmissionApplication;
import ci.company.eduops.admission.domain.AdmissionStatus;
import ci.company.eduops.admission.repository.AdmissionApplicationRepository;
import ci.company.eduops.classroom.domain.CapacityStatus;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.repository.EnrollmentDocumentRepository;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.security.service.Permissions;
import ci.company.eduops.student.domain.Student;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * The business rules of an enrollment, isolated from transport and persistence
 * concerns so they can be unit-tested without a database.
 *
 * <p>Implements the guard sequence of section 21:</p>
 * <pre>
 * checkStudent()          checkAcademicYear()
 * checkExistingEnrollment()  checkClassCapacity()
 * checkRequiredDocuments()   checkAdmissionStatus()
 * </pre>
 */
@Service
public class EnrollmentDomainService {

    private static final Logger log = LoggerFactory.getLogger(EnrollmentDomainService.class);

    private final EnrollmentRepository enrollmentRepository;
    private final EnrollmentDocumentRepository documentRepository;
    private final AdmissionApplicationRepository admissionRepository;
    private final CurrentUser currentUser;

    public EnrollmentDomainService(EnrollmentRepository enrollmentRepository,
                                   EnrollmentDocumentRepository documentRepository,
                                   AdmissionApplicationRepository admissionRepository,
                                   CurrentUser currentUser) {
        this.enrollmentRepository = enrollmentRepository;
        this.documentRepository = documentRepository;
        this.admissionRepository = admissionRepository;
        this.currentUser = currentUser;
    }

    /**
     * The student must exist, not be archived, and be in a status that accepts
     * an enrollment (ADMITTED or ACTIVE).
     */
    public void checkStudent(Student student) {
        if (student == null) {
            throw BusinessException.of(ErrorCode.STUDENT_NOT_FOUND);
        }
        if (!student.getStatus().canBeEnrolled()) {
            throw BusinessException.of(ErrorCode.STUDENT_NOT_ACTIVE,
                            "A student in status %s cannot be enrolled".formatted(student.getStatus()))
                    .detail("studentStatus", student.getStatus().name())
                    .detail("studentNumber", student.getStudentNumber());
        }
    }

    /** The year must accept operations and its enrollment window must be open. */
    public void checkAcademicYear(AcademicYear year) {
        if (year == null) {
            throw BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_FOUND);
        }
        if (!year.getStatus().acceptsOperations()) {
            throw BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE,
                            "The academic year %s is %s".formatted(year.getCode(), year.getStatus()))
                    .detail("academicYearStatus", year.getStatus().name());
        }
        if (!year.isEnrollmentWindowOpen()) {
            throw BusinessException.of(ErrorCode.ENROLLMENT_WINDOW_CLOSED)
                    .detail("enrollmentOpenAt", String.valueOf(year.getEnrollmentOpenAt()))
                    .detail("enrollmentCloseAt", String.valueOf(year.getEnrollmentCloseAt()));
        }
    }

    /**
     * Rule 21: a student may not hold two live enrollments for the same year.
     * The unique partial index is the ultimate guarantee; this check produces a
     * clean business error instead of a constraint violation.
     */
    public void checkExistingEnrollment(Student student, AcademicYear year) {
        enrollmentRepository.findLiveEnrollment(student.getId(), year.getId())
                .ifPresent(existing -> {
                    throw BusinessException.of(ErrorCode.STUDENT_ALREADY_ENROLLED)
                            .detail("existingEnrollmentId", existing.getId().toString())
                            .detail("existingEnrollmentNumber", existing.getEnrollmentNumber())
                            .detail("existingStatus", existing.getStatus().name());
                });
    }

    /**
     * Rule 9: available seats are computed, never entered by a user.
     *
     * <p>The caller must already hold a pessimistic lock on the classroom row,
     * otherwise two transactions can both observe the last free seat.</p>
     *
     * @param allowOverride whether the caller asked to exceed the capacity
     * @param overrideReason mandatory justification when overriding
     */
    public void checkClassCapacity(Classroom classroom, boolean allowOverride, String overrideReason) {
        if (classroom == null) {
            throw BusinessException.of(ErrorCode.CLASS_NOT_FOUND);
        }
        if (!classroom.getStatus().acceptsEnrollments()) {
            throw BusinessException.of(ErrorCode.CLASS_NOT_ACTIVE)
                    .detail("classroomStatus", classroom.getStatus().name());
        }

        long occupied = enrollmentRepository.countOccupiedSeats(classroom.getId());
        int available = classroom.availableSeats(occupied);
        CapacityStatus capacityStatus = classroom.capacityStatus(occupied);

        if (available > 0) {
            if (capacityStatus == CapacityStatus.WARNING) {
                log.info("Class {} is close to full: {}/{}",
                        classroom.getCode(), occupied, classroom.getCapacityMaximum());
            }
            return;
        }

        // No seat left: only an explicitly justified override may proceed.
        if (allowOverride) {
            if (overrideReason == null || overrideReason.isBlank()) {
                throw BusinessException.of(ErrorCode.VALIDATION_ERROR,
                        "Exceeding the class capacity requires a justification.");
            }
            currentUser.requirePermission(Permissions.ENROLLMENT_OVERRIDE_CAPACITY);
            log.warn("Capacity override on class {} ({}/{}) by {}: {}",
                    classroom.getCode(), occupied, classroom.getCapacityMaximum(),
                    currentUser.username(), overrideReason);
            return;
        }

        throw BusinessException.of(ErrorCode.CLASS_CAPACITY_EXCEEDED)
                .detail("classroomId", classroom.getId().toString())
                .detail("classroomCode", classroom.getCode())
                .detail("capacityMaximum", classroom.getCapacityMaximum())
                .detail("activeEnrollments", occupied)
                .detail("availableSeats", 0)
                .detail("capacityStatus", capacityStatus.name());
    }

    /** Every mandatory document must have been received before validation. */
    public void checkRequiredDocuments(Enrollment enrollment) {
        List<?> missing = documentRepository
                .findByEnrollmentIdAndMandatoryTrueAndReceivedFalse(enrollment.getId());
        if (!missing.isEmpty()) {
            throw BusinessException.of(ErrorCode.ENROLLMENT_DOCUMENTS_INCOMPLETE)
                    .detail("missingCount", missing.size());
        }
    }

    /** A new student coming from the admission funnel must have been accepted. */
    public void checkAdmissionStatus(AdmissionApplication admission) {
        if (admission == null) {
            return; // direct enrollment, no application involved
        }
        if (admission.getStatus() != AdmissionStatus.ACCEPTED) {
            throw BusinessException.of(ErrorCode.ADMISSION_NOT_ACCEPTED)
                    .detail("admissionStatus", admission.getStatus().name());
        }
        if (!admission.hasAllMandatoryDocuments()) {
            throw BusinessException.of(ErrorCode.ADMISSION_DOCUMENTS_INCOMPLETE);
        }
    }

    /**
     * Non-throwing variant used by the "can I enroll?" preview screen: returns
     * every blocker instead of failing on the first one.
     */
    public EnrollmentCheckResult preview(Student student, AcademicYear year, Classroom classroom) {
        EnrollmentCheckResult result = new EnrollmentCheckResult();

        if (student == null) {
            return result.blocker(ErrorCode.STUDENT_NOT_FOUND.name());
        }
        if (!student.getStatus().canBeEnrolled()) {
            result.blocker(ErrorCode.STUDENT_NOT_ACTIVE.name());
        }
        if (year == null) {
            return result.blocker(ErrorCode.ACADEMIC_YEAR_NOT_FOUND.name());
        }
        if (!year.getStatus().acceptsOperations()) {
            result.blocker(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE.name());
        }
        if (!year.isEnrollmentWindowOpen()) {
            result.blocker(ErrorCode.ENROLLMENT_WINDOW_CLOSED.name());
        }
        if (enrollmentRepository.findLiveEnrollment(student.getId(), year.getId()).isPresent()) {
            result.blocker(ErrorCode.STUDENT_ALREADY_ENROLLED.name());
        }
        if (classroom == null) {
            return result.blocker(ErrorCode.CLASS_NOT_FOUND.name());
        }
        if (!classroom.getStatus().acceptsEnrollments()) {
            result.blocker(ErrorCode.CLASS_NOT_ACTIVE.name());
        }

        long occupied = enrollmentRepository.countOccupiedSeats(classroom.getId());
        long reserved = admissionRepository.countReservedSeats(classroom.getId());
        result.setCapacityMaximum(classroom.getCapacityMaximum());
        result.setOccupiedSeats(occupied);
        result.setAvailableSeats(classroom.availableSeats(occupied));
        result.setProjectedAvailableSeats(classroom.projectedAvailableSeats(occupied, reserved, 0));

        CapacityStatus capacityStatus = classroom.capacityStatus(occupied);
        if (capacityStatus.blocksEnrollment()) {
            result.blocker(ErrorCode.CLASS_CAPACITY_EXCEEDED.name());
        } else if (capacityStatus == CapacityStatus.WARNING) {
            result.warning("CLASS_CAPACITY_WARNING");
        }
        return result;
    }
}
