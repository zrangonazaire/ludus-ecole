package ci.company.eduops.student.service;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.academicyear.domain.AcademicYearStatus;
import ci.company.eduops.academicyear.repository.AcademicYearRepository;
import ci.company.eduops.common.dto.PageResponse;
import ci.company.eduops.common.exception.BusinessException;
import ci.company.eduops.common.exception.ErrorCode;
import ci.company.eduops.common.tenant.TenantContext;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.dto.response.EnrollmentResponse;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.finance.domain.StudentFee;
import ci.company.eduops.finance.dto.response.StudentFinancialSummaryResponse;
import ci.company.eduops.finance.repository.StudentFeeRepository;
import ci.company.eduops.guardian.domain.StudentGuardian;
import ci.company.eduops.guardian.repository.StudentGuardianRepository;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.student.domain.StudentStatus;
import ci.company.eduops.student.dto.response.GuardianLinkResponse;
import ci.company.eduops.student.dto.response.StudentDetailResponse;
import ci.company.eduops.student.dto.response.StudentSummaryResponse;
import ci.company.eduops.student.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Reading the pupil file.
 *
 * <p>Separate from {@link StudentService}, which changes state. Reading a file
 * and striking a pupil off are not the same responsibility, and mixing them
 * makes it far too easy to grant one while meaning the other.</p>
 *
 * <p>The class name travels with every row. Resolving it on the screen would
 * fire one lookup per pupil to draw a single table of two hundred.</p>
 */
@Service
public class StudentQueryService {

    private static final int MAX_PAGE_SIZE = 200;

    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final StudentGuardianRepository studentGuardianRepository;
    private final StudentFeeRepository studentFeeRepository;
    private final AcademicYearRepository academicYearRepository;

    public StudentQueryService(StudentRepository studentRepository,
                               EnrollmentRepository enrollmentRepository,
                               StudentGuardianRepository studentGuardianRepository,
                               StudentFeeRepository studentFeeRepository,
                               AcademicYearRepository academicYearRepository) {
        this.studentRepository = studentRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.studentGuardianRepository = studentGuardianRepository;
        this.studentFeeRepository = studentFeeRepository;
        this.academicYearRepository = academicYearRepository;
    }

    /** Paginated search, optionally narrowed to one class. */
    @Transactional(readOnly = true)
    public PageResponse<StudentSummaryResponse> search(int page, int size, String search,
                                                        String status, UUID classroomId) {
        UUID schoolId = requireSchoolId();
        // Une page sans borne haute permettrait de demander cent mille eleves
        // d'un coup et de mettre le serveur a genoux depuis la barre d'adresse.
        int safeSize = Math.min(Math.max(size, 1), MAX_PAGE_SIZE);
        PageRequest request = PageRequest.of(Math.max(page, 0), safeSize,
                Sort.by("lastName").ascending().and(Sort.by("firstName").ascending()));

        StudentStatus wanted = parseStatus(status);
        // PostgreSQL cannot infer the SQL type of a null text parameter inside
        // lower(). An empty search has the same meaning and keeps the query
        // strongly typed.
        Page<Student> found = studentRepository.search(schoolId,
            wanted == null ? "" : wanted.name(),
            search == null ? "" : search.trim(), request);

        Map<UUID, Enrollment> enrollments = activeEnrollments();
        List<StudentSummaryResponse> rows = new ArrayList<>();
        for (Student student : found.getContent()) {
            Enrollment enrollment = enrollments.get(student.getId());
            if (classroomId != null && (enrollment == null
                    || enrollment.getClassroom() == null
                    || !classroomId.equals(enrollment.getClassroom().getId()))) {
                continue;
            }
            rows.add(toSummary(student, enrollment));
        }

        PageResponse<StudentSummaryResponse> response = new PageResponse<>();
        response.setContent(rows);
        response.setPage(found.getNumber());
        response.setSize(found.getSize());
        response.setTotalElements(found.getTotalElements());
        response.setTotalPages(found.getTotalPages());
        response.setFirst(found.isFirst());
        response.setLast(found.isLast());
        return response;
    }

    /** The pupils of one class, for a roll call or a class list. */
    @Transactional(readOnly = true)
    public List<StudentSummaryResponse> byClassroom(UUID classroomId) {
        Map<UUID, Enrollment> enrollments = activeEnrollments();
        List<StudentSummaryResponse> rows = new ArrayList<>();
        for (Student student : studentRepository.findByClassroom(classroomId)) {
            rows.add(toSummary(student, enrollments.get(student.getId())));
        }
        return rows;
    }

    /** One pupil's file, with guardians, current enrollment and balance. */
    @Transactional(readOnly = true)
    public StudentDetailResponse detail(UUID studentId) {
        Student student = requireStudent(studentId);
        Enrollment current = activeEnrollments().get(studentId);

        StudentDetailResponse detail = new StudentDetailResponse();
        fillSummary(detail, student, current);
        detail.setMiddleName(student.getMiddleName());
        detail.setBirthPlace(student.getBirthPlace());
        detail.setNationality(student.getNationality());
        detail.setEmail(student.getEmail());
        detail.setPhone(student.getPhone());
        detail.setAddressLine1(student.getAddressLine1());
        detail.setCity(student.getCity());
        detail.setHasDisability(student.isHasDisability());
        detail.setAdmissionDate(student.getAdmissionDate());
        detail.setPreviousSchool(student.getPreviousSchool());

        for (StudentGuardian link : studentGuardianRepository.findByStudentId(studentId)) {
            detail.getGuardians().add(toGuardianLink(link));
        }
        if (current != null) {
            detail.setCurrentEnrollment(toEnrollment(current));
        }
        detail.setFinancialSummary(financialSummary(studentId, null));
        return detail;
    }

    /** Every enrollment of the pupil, newest first. */
    @Transactional(readOnly = true)
    public List<EnrollmentResponse> enrollments(UUID studentId) {
        requireStudent(studentId);
        List<EnrollmentResponse> rows = new ArrayList<>();
        for (Enrollment enrollment
                : enrollmentRepository.findByStudentIdOrderByEnrollmentDateDesc(studentId)) {
            rows.add(toEnrollment(enrollment));
        }
        return rows;
    }

    /**
     * What the family owes for the year.
     *
     * <p>Computed from the fee lines rather than stored: a frozen total would
     * keep showing a debt the day after it was settled, and the cashier would
     * be arguing with a parent holding a receipt.</p>
     */
    @Transactional(readOnly = true)
    public StudentFinancialSummaryResponse financialSummary(UUID studentId,
                                                            UUID academicYearId) {
        requireStudent(studentId);
        AcademicYear year = resolveYear(academicYearId);

        StudentFinancialSummaryResponse summary = new StudentFinancialSummaryResponse();
        summary.setStudentId(studentId);
        if (year == null) {
            return summary;
        }
        summary.setAcademicYearId(year.getId());

        BigDecimal gross = BigDecimal.ZERO;
        BigDecimal discount = BigDecimal.ZERO;
        BigDecimal due = BigDecimal.ZERO;
        BigDecimal paid = BigDecimal.ZERO;
        LocalDate today = LocalDate.now();
        LocalDate next = null;
        int overdue = 0;

        for (StudentFee fee : studentFeeRepository
                .findOutstandingOldestFirst(studentId, year.getId())) {
            gross = gross.add(safe(fee.getGrossAmount()));
            discount = discount.add(safe(fee.getDiscountAmount()));
            due = due.add(safe(fee.getAmountDue()));
            paid = paid.add(safe(fee.getAmountPaid()));

            LocalDate dueDate = fee.getDueDate();
            if (dueDate != null) {
                if (dueDate.isBefore(today)) {
                    overdue++;
                } else if (next == null || dueDate.isBefore(next)) {
                    next = dueDate;
                }
            }
        }

        BigDecimal outstanding = due.subtract(paid).max(BigDecimal.ZERO);
        summary.setTotalGross(gross);
        summary.setTotalDiscount(discount);
        summary.setTotalDue(due);
        summary.setTotalPaid(paid);
        summary.setOutstandingAmount(outstanding);
        summary.setNextDueDate(next);
        summary.setOverdueCount(overdue);
        summary.setGlobalStatus(outstanding.signum() == 0 ? "PAID"
                : paid.signum() > 0 ? "PARTIALLY_PAID" : "DUE");
        return summary;
    }

    // ----------------------------------------------------------- conversion

    private StudentSummaryResponse toSummary(Student student, Enrollment enrollment) {
        StudentSummaryResponse row = new StudentSummaryResponse();
        fillSummary(row, student, enrollment);
        return row;
    }

    private void fillSummary(StudentSummaryResponse row, Student student,
                             Enrollment enrollment) {
        row.setId(student.getId());
        row.setStudentNumber(student.getStudentNumber());
        row.setFirstName(student.getFirstName());
        row.setLastName(student.getLastName());
        row.setFullName(student.fullName());
        row.setGender(student.getGender() != null ? student.getGender().name() : null);
        row.setBirthDate(student.getBirthDate());
        if (student.getBirthDate() != null) {
            row.setAge(Period.between(student.getBirthDate(), LocalDate.now()).getYears());
        }
        row.setPhotoUrl(student.getPhotoUrl());
        row.setStatus(student.getStatus() != null ? student.getStatus().name() : null);
        if (enrollment != null && enrollment.getClassroom() != null) {
            row.setClassroomId(enrollment.getClassroom().getId());
            row.setClassroomName(enrollment.getClassroom().getName());
            if (enrollment.getClassroom().getLevel() != null) {
                row.setLevelName(enrollment.getClassroom().getLevel().getName());
            }
        }
    }

    private GuardianLinkResponse toGuardianLink(StudentGuardian link) {
        GuardianLinkResponse row = new GuardianLinkResponse();
        row.setId(link.getId());
        row.setGuardianId(link.getGuardian().getId());
        row.setFirstName(link.getGuardian().getFirstName());
        row.setLastName(link.getGuardian().getLastName());
        row.setFullName(link.getGuardian().fullName());
        row.setPhone(link.getGuardian().getPhone());
        row.setEmail(link.getGuardian().getEmail());
        row.setRelationship(link.getRelationship() != null
                ? link.getRelationship().name() : null);
        row.setPrimary(link.isPrimary());
        row.setFinancialResponsibility(link.isFinancialResponsibility());
        row.setCanPickupStudent(link.isCanPickupStudent());
        row.setReceivesNotifications(link.isReceivesNotifications());
        return row;
    }

    private EnrollmentResponse toEnrollment(Enrollment enrollment) {
        EnrollmentResponse row = new EnrollmentResponse();
        row.setId(enrollment.getId());
        row.setEnrollmentNumber(enrollment.getEnrollmentNumber());
        row.setStudentId(enrollment.getStudent().getId());
        row.setStudentNumber(enrollment.getStudent().getStudentNumber());
        row.setStudentName(enrollment.getStudent().fullName());
        row.setAcademicYearId(enrollment.getAcademicYear().getId());
        row.setAcademicYearCode(enrollment.getAcademicYear().getCode());
        if (enrollment.getClassroom() != null) {
            row.setClassroomId(enrollment.getClassroom().getId());
            row.setClassroomName(enrollment.getClassroom().getName());
            if (enrollment.getClassroom().getLevel() != null) {
                row.setLevelId(enrollment.getClassroom().getLevel().getId());
                row.setLevelName(enrollment.getClassroom().getLevel().getName());
            }
        }
        row.setEnrollmentKind(enrollment.getEnrollmentKind());
        row.setStatus(enrollment.getStatus());
        row.setEnrollmentDate(enrollment.getEnrollmentDate());
        row.setValidatedAt(enrollment.getValidatedAt());
        row.setRepeating(enrollment.isRepeating());
        row.setOverCapacityOverride(enrollment.isOverCapacityOverride());
        return row;
    }

    // ------------------------------------------------------------ plomberie

    private Map<UUID, Enrollment> activeEnrollments() {
        AcademicYear year = resolveYear(null);
        Map<UUID, Enrollment> byStudent = new LinkedHashMap<>();
        if (year == null) {
            return byStudent;
        }
        for (Enrollment enrollment : enrollmentRepository.findActiveByYear(year.getId())) {
            byStudent.put(enrollment.getStudent().getId(), enrollment);
        }
        return byStudent;
    }

    private StudentStatus parseStatus(String status) {
        if (status == null || status.isBlank()) {
            return null;
        }
        try {
            return StudentStatus.valueOf(status.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            // Un filtre inconnu ne vaut pas une erreur 500 : on ignore le
            // filtre plutot que de refuser la page entiere.
            return null;
        }
    }

    private Student requireStudent(UUID studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.STUDENT_NOT_FOUND));
        UUID schoolId = requireSchoolId();
        if (student.getSchool() == null || !schoolId.equals(student.getSchool().getId())) {
            // Meme reponse qu'un identifiant inexistant : dire « existe, mais
            // pas chez vous » renseignerait sur les eleves d'une autre ecole.
            throw new BusinessException(ErrorCode.STUDENT_NOT_FOUND);
        }
        return student;
    }

    /** The active year, or null when the school has not opened one yet. */
    private AcademicYear resolveYear(UUID academicYearId) {
        if (academicYearId != null) {
            return academicYearRepository.findById(academicYearId).orElse(null);
        }
        return academicYearRepository
                .findBySchoolIdAndStatus(requireSchoolId(), AcademicYearStatus.ACTIVE)
                .orElse(null);
    }

    private BigDecimal safe(BigDecimal value) {
        return value != null ? value : BigDecimal.ZERO;
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
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
