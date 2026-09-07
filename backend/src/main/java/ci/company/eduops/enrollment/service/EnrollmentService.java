package ci.company.eduops.enrollment.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.admission.domain.AdmissionApplication;
import ci.company.eduops.admission.domain.AdmissionStatus;
import ci.company.eduops.admission.repository.AdmissionApplicationRepository;
import ci.company.eduops.audit.domain.AuditAction;
import ci.company.eduops.audit.service.AuditService;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.classroom.repository.ClassroomRepository;
import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.event.DomainEventPublisher;
import ci.company.eduops.common.event.DomainEventType;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.util.MoneyUtils;
import ci.company.eduops.common.util.NumberSequenceService;
import ci.company.eduops.config.EduOpsProperties;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.domain.EnrollmentStatus;
import ci.company.eduops.enrollment.dto.request.EnrollmentCreateRequest;
import ci.company.eduops.enrollment.dto.response.EnrollmentResponse;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.finance.domain.StudentFee;
import ci.company.eduops.finance.service.StudentFeeGenerationService;
import ci.company.eduops.security.service.CurrentUser;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.domain.StudentStatus;
import ci.company.eduops.student.repository.StudentRepository;
import ci.company.eduops.student.service.StudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Application service of the enrollment domain.
 *
 * <p>Implements the transaction of section 71 end to end:</p>
 * <pre>
 * BEGIN
 *   1  identify the student          7  create the enrollment
 *   2  check the academic year       8  assign the class
 *   3  check the student status      9  create the applicable fees
 *   4  check for a double enrollment 10 write the audit entry
 *   5  lock and check class capacity 11 publish StudentEnrolledEvent
 *   6  check the documents
 * COMMIT
 * </pre>
 */
@Service
public class EnrollmentService {

    private static final Logger log = LoggerFactory.getLogger(EnrollmentService.class);
    private static final String SCOPE_ENROLLMENT = "ENROLLMENT";

    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final ClassroomRepository classroomRepository;
    private final AcademicYearRepository academicYearRepository;
    private final AdmissionApplicationRepository admissionRepository;
    private final EnrollmentDomainService domainService;
    private final StudentFeeGenerationService feeGenerationService;
    private final StudentService studentService;
    private final NumberSequenceService numberSequenceService;
    private final DomainEventPublisher eventPublisher;
    private final AuditService auditService;
    private final CurrentUser currentUser;
    private final EduOpsProperties properties;

    public EnrollmentService(EnrollmentRepository enrollmentRepository,
                             StudentRepository studentRepository,
                             ClassroomRepository classroomRepository,
                             AcademicYearRepository academicYearRepository,
                             AdmissionApplicationRepository admissionRepository,
                             EnrollmentDomainService domainService,
                             StudentFeeGenerationService feeGenerationService,
                             StudentService studentService,
                             NumberSequenceService numberSequenceService,
                             DomainEventPublisher eventPublisher,
                             AuditService auditService,
                             CurrentUser currentUser,
                             EduOpsProperties properties) {
        this.enrollmentRepository = enrollmentRepository;
        this.studentRepository = studentRepository;
        this.classroomRepository = classroomRepository;
        this.academicYearRepository = academicYearRepository;
        this.admissionRepository = admissionRepository;
        this.domainService = domainService;
        this.feeGenerationService = feeGenerationService;
        this.studentService = studentService;
        this.numberSequenceService = numberSequenceService;
        this.eventPublisher = eventPublisher;
        this.auditService = auditService;
        this.currentUser = currentUser;
        this.properties = properties;
    }

    /**
     * Enrolls a student.
     *
     * <p>Idempotent: replaying the same {@code idempotencyKey} returns the
     * enrollment created by the first call.</p>
     */
    @Transactional
    public EnrollmentResponse enroll(EnrollmentCreateRequest request) {
        // 1 - identify the student
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> BusinessException.of(ErrorCode.STUDENT_NOT_FOUND));

        // idempotency: a resubmitted form must not create a second enrollment
        if (request.getIdempotencyKey() != null && !request.getIdempotencyKey().isBlank()) {
            var replay = enrollmentRepository
                    .findLiveEnrollment(student.getId(), resolveYear(request, student).getId())
                    .filter(e -> request.getIdempotencyKey().equals(e.getIdempotencyKey()));
            if (replay.isPresent()) {
                log.info("Enrollment key {} replayed -> {}",
                        request.getIdempotencyKey(), replay.get().getEnrollmentNumber());
                return toResponse(replay.get(), 0, BigDecimal.ZERO);
            }
        }

        // 2 - check the academic year
        AcademicYear academicYear = resolveYear(request, student);
        domainService.checkAcademicYear(academicYear);

        // 3 - check the student status
        domainService.checkStudent(student);

        // 4 - refuse a second live enrollment for the same year
        domainService.checkExistingEnrollment(student, academicYear);

        // 5 - lock the class row THEN check the capacity; the lock is what makes
        //     two concurrent registrars safe on the last remaining seat
        Classroom classroom = classroomRepository.lockById(request.getClassroomId())
                .orElseThrow(() -> BusinessException.of(ErrorCode.CLASS_NOT_FOUND));
        if (!classroom.getAcademicYear().getId().equals(academicYear.getId())) {
            throw BusinessException.of(ErrorCode.ENROLLMENT_NOT_ALLOWED,
                    "The class does not belong to the selected academic year.");
        }
        domainService.checkClassCapacity(classroom,
                request.isOverCapacityOverride(), request.getOverCapacityReason());

        // 6 - admission status when the student comes from the funnel
        AdmissionApplication admission = null;
        if (request.getAdmissionId() != null) {
            admission = admissionRepository.findById(request.getAdmissionId())
                    .orElseThrow(() -> BusinessException.of(ErrorCode.ADMISSION_NOT_FOUND));
            domainService.checkAdmissionStatus(admission);
        }

        // 7 + 8 - create the enrollment and assign the class
        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setAcademicYear(academicYear);
        enrollment.setClassroom(classroom);
        enrollment.setAdmission(admission);
        enrollment.setEnrollmentKind(request.getEnrollmentKind());
        enrollment.setEnrollmentDate(request.getEnrollmentDate() == null
                ? LocalDate.now() : request.getEnrollmentDate());
        enrollment.setRepeating(request.isRepeating());
        enrollment.setNotes(request.getNotes());
        enrollment.setIdempotencyKey(request.getIdempotencyKey());
        enrollment.setEnrollmentNumber(numberSequenceService.next(
                student.getSchool().getId(), SCOPE_ENROLLMENT,
                properties.getNumbering().getEnrollmentPattern(),
                student.getSchool().getCode()));

        if (request.isOverCapacityOverride()) {
            enrollment.setOverCapacityOverride(true);
            enrollment.setOverCapacityReason(request.getOverCapacityReason());
            enrollment.setOverCapacityApprovedBy(currentUser.id().orElse(null));
        }

        if (request.isValidateImmediately()) {
            enrollment.changeStatus(EnrollmentStatus.PENDING);
            enrollment.validate(currentUser.id().orElse(null));
            enrollment.activate();
        }
        enrollment = enrollmentRepository.save(enrollment);

        // the student becomes ACTIVE the moment the placement is validated
        if (enrollment.getStatus().isLive() && student.getStatus() == StudentStatus.ADMITTED) {
            studentService.changeStatus(student, StudentStatus.ACTIVE,
                    "Enrollment " + enrollment.getEnrollmentNumber());
        }
        if (admission != null && admission.getStatus() == AdmissionStatus.ACCEPTED) {
            admission.changeStatus(AdmissionStatus.CONVERTED);
            admission.setStudent(student);
            admissionRepository.save(admission);
        }

        // 9 - applicable fees
        List<StudentFee> fees = feeGenerationService.generateForEnrollment(enrollment);
        BigDecimal totalDue = fees.stream()
                .map(StudentFee::getAmountDue)
                .reduce(BigDecimal.ZERO, MoneyUtils::add);

        // 10 - audit
        auditService.record(AuditAction.CREATE, "Enrollment", enrollment.getId())
                .label(enrollment.getEnrollmentNumber())
                .school(student.getSchool().getId())
                .academicYear(academicYear.getId())
                // Explicit witness: Map.of on Strings infers Map<String,String>,
                // which does not match the audit API's Map<String,Object>.
                .newValue(Map.<String, Object>of(
                        "student", student.getStudentNumber(),
                        "classroom", classroom.getCode(),
                        "status", enrollment.getStatus().name(),
                        "overCapacity", String.valueOf(enrollment.isOverCapacityOverride())))
                .save();

        // 11 - domain event
        eventPublisher.event(DomainEventType.STUDENT_ENROLLED, "Enrollment", enrollment.getId())
                .school(student.getSchool().getId())
                .academicYear(academicYear.getId())
                .classroom(classroom.getId())
                .student(student.getId())
                .with("enrollmentNumber", enrollment.getEnrollmentNumber())
                .with("studentName", student.fullName())
                .with("studentNumber", student.getStudentNumber())
                .with("classroomName", classroom.getName())
                .with("levelName", classroom.getLevel().getName())
                .with("academicYear", academicYear.getCode())
                .with("totalFeesDue", totalDue.toPlainString())
                .publish();

        log.info("Student {} enrolled in {} ({}), enrollment {}",
                student.getStudentNumber(), classroom.getCode(),
                academicYear.getCode(), enrollment.getEnrollmentNumber());

        return toResponse(enrollment, fees.size(), totalDue);
    }

    /** Explicit validation of an enrollment left in DRAFT or PENDING. */
    @Transactional
    public EnrollmentResponse validate(UUID enrollmentId) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ENROLLMENT_NOT_FOUND));

        if (enrollment.getStatus().isLive()) {
            throw BusinessException.of(ErrorCode.ENROLLMENT_ALREADY_VALIDATED);
        }
        domainService.checkRequiredDocuments(enrollment);

        Classroom classroom = classroomRepository.lockById(enrollment.getClassroom().getId())
                .orElseThrow(() -> BusinessException.of(ErrorCode.CLASS_NOT_FOUND));
        domainService.checkClassCapacity(classroom,
                enrollment.isOverCapacityOverride(), enrollment.getOverCapacityReason());

        enrollment.validate(currentUser.id().orElse(null));
        enrollment.activate();
        enrollmentRepository.save(enrollment);

        if (enrollment.getStudent().getStatus() == StudentStatus.ADMITTED) {
            studentService.changeStatus(enrollment.getStudent(), StudentStatus.ACTIVE,
                    "Enrollment validated");
        }

        auditService.logValidate("Enrollment", enrollment.getId(),
                enrollment.getEnrollmentNumber(), null);

        eventPublisher.event(DomainEventType.STUDENT_ENROLLED, "Enrollment", enrollment.getId())
                .school(enrollment.getStudent().getSchool().getId())
                .academicYear(enrollment.getAcademicYear().getId())
                .classroom(classroom.getId())
                .student(enrollment.getStudent().getId())
                .with("enrollmentNumber", enrollment.getEnrollmentNumber())
                .with("studentName", enrollment.getStudent().fullName())
                .publish();

        return toResponse(enrollment, 0, BigDecimal.ZERO);
    }

    /** Cancels an enrollment; the seat is freed as soon as the status changes. */
    @Transactional
    public EnrollmentResponse cancel(UUID enrollmentId, String reason) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ENROLLMENT_NOT_FOUND));
        enrollment.cancel(currentUser.id().orElse(null), reason);
        enrollmentRepository.save(enrollment);

        auditService.logCancel("Enrollment", enrollmentId,
                enrollment.getEnrollmentNumber(), reason);
        return toResponse(enrollment, 0, BigDecimal.ZERO);
    }

    /** Non-destructive preview used by the registrar screen before submitting. */
    @Transactional(readOnly = true)
    public EnrollmentCheckResult check(UUID studentId, UUID academicYearId, UUID classroomId) {
        Student student = studentRepository.findById(studentId).orElse(null);
        AcademicYear year = academicYearId == null
                ? activeYear(student)
                : academicYearRepository.findById(academicYearId).orElse(null);
        Classroom classroom = classroomRepository.findById(classroomId).orElse(null);
        return domainService.preview(student, year, classroom);
    }

    @Transactional(readOnly = true)
    public EnrollmentResponse findById(UUID id) {
        return enrollmentRepository.findById(id)
                .map(e -> toResponse(e, 0, null))
                .orElseThrow(() -> BusinessException.of(ErrorCode.ENROLLMENT_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public PageResponse<EnrollmentResponse> search(UUID academicYearId, UUID classroomId,
                                                    EnrollmentStatus status, String search,
                                                    Pageable pageable) {
        UUID yearId = academicYearId != null ? academicYearId : activeYearId();
        return PageResponse.from(
                enrollmentRepository.search(yearId, classroomId, status,
                        search == null ? "" : search.trim(), pageable),
                e -> toResponse(e, 0, null));
    }

    @Transactional(readOnly = true)
    public List<EnrollmentResponse> historyOf(UUID studentId) {
        return enrollmentRepository.findByStudentIdOrderByEnrollmentDateDesc(studentId).stream()
                .map(e -> toResponse(e, 0, null))
                .toList();
    }

    // ------------------------------------------------------------------

    private AcademicYear resolveYear(EnrollmentCreateRequest request, Student student) {
        if (request.getAcademicYearId() != null) {
            return academicYearRepository.findById(request.getAcademicYearId())
                    .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_FOUND));
        }
        return academicYearRepository
                .findBySchoolIdAndStatus(student.getSchool().getId(), AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE));
    }

    private AcademicYear activeYear(Student student) {
        if (student == null) {
            return null;
        }
        return academicYearRepository
                .findBySchoolIdAndStatus(student.getSchool().getId(), AcademicYearStatus.ACTIVE)
                .orElse(null);
    }

    private UUID activeYearId() {
        return academicYearRepository.findByStatuses(List.of(AcademicYearStatus.ACTIVE)).stream()
                .findFirst()
                .map(AcademicYear::getId)
                .orElseThrow(() -> BusinessException.of(ErrorCode.ACADEMIC_YEAR_NOT_ACTIVE));
    }

    private EnrollmentResponse toResponse(Enrollment enrollment, int feeLines, BigDecimal totalDue) {
        EnrollmentResponse response = new EnrollmentResponse();
        response.setId(enrollment.getId());
        response.setEnrollmentNumber(enrollment.getEnrollmentNumber());
        response.setStudentId(enrollment.getStudent().getId());
        response.setStudentNumber(enrollment.getStudent().getStudentNumber());
        response.setStudentName(enrollment.getStudent().fullName());
        response.setAcademicYearId(enrollment.getAcademicYear().getId());
        response.setAcademicYearCode(enrollment.getAcademicYear().getCode());
        response.setClassroomId(enrollment.getClassroom().getId());
        response.setClassroomName(enrollment.getClassroom().getName());
        response.setLevelId(enrollment.getClassroom().getLevel().getId());
        response.setLevelName(enrollment.getClassroom().getLevel().getName());
        response.setEnrollmentKind(enrollment.getEnrollmentKind());
        response.setStatus(enrollment.getStatus());
        response.setEnrollmentDate(enrollment.getEnrollmentDate());
        response.setValidatedAt(enrollment.getValidatedAt());
        response.setRepeating(enrollment.isRepeating());
        response.setOverCapacityOverride(enrollment.isOverCapacityOverride());
        response.setFeeLinesCreated(feeLines);
        response.setTotalFeesDue(totalDue);
        return response;
    }
}
