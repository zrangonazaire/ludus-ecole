package ci.company.eduops.finance.service;

import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.util.MoneyUtils;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.domain.EnrollmentKind;
import ci.company.eduops.enrollment.repository.EnrollmentRepository;
import ci.company.eduops.finance.domain.FeeSchedule;
import ci.company.eduops.finance.domain.FeeScheduleInstalment;
import ci.company.eduops.finance.domain.StudentFee;
import ci.company.eduops.finance.repository.FeeScheduleRepository;
import ci.company.eduops.finance.repository.StudentFeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Turns the school's price list into the concrete instalments a family owes
 * (step 9 of the enrollment transaction, section 71).
 *
 * <p>Runs inside the enrollment transaction: if the enrollment rolls back, so
 * do the fees.</p>
 */
@Service
public class StudentFeeGenerationService {

    private static final Logger log = LoggerFactory.getLogger(StudentFeeGenerationService.class);

    private final FeeScheduleRepository feeScheduleRepository;
    private final StudentFeeRepository studentFeeRepository;
    private final EnrollmentRepository enrollmentRepository;

    public StudentFeeGenerationService(FeeScheduleRepository feeScheduleRepository,
                                       StudentFeeRepository studentFeeRepository,
                                       EnrollmentRepository enrollmentRepository) {
        this.feeScheduleRepository = feeScheduleRepository;
        this.studentFeeRepository = studentFeeRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    /**
     * Creates the fee lines applicable to an enrollment.
     *
     * @return the created lines, empty when no price list matches
     */
    @Transactional
    public List<StudentFee> generateForEnrollment(Enrollment enrollment) {
        boolean returning = enrollment.getEnrollmentKind() == EnrollmentKind.RE_ENROLLMENT;
        List<FeeSchedule> schedules = findApplicableSchedulesForClassroom(
                enrollment.getClassroom(), returning);

        List<StudentFee> created = new ArrayList<>();
        for (FeeSchedule schedule : schedules) {
            created.addAll(createLines(enrollment, schedule));
        }

        if (created.isEmpty()) {
            log.warn("No fee schedule matched enrollment {} (level {})",
                    enrollment.getEnrollmentNumber(),
                    enrollment.getClassroom().getLevel().getCode());
        } else {
            log.info("{} fee lines generated for enrollment {}",
                    created.size(), enrollment.getEnrollmentNumber());
        }
        return created;
    }

    /**
     * Resolves all active fee schedules applicable to a classroom's level, cycle, and campus.
     */
    @Transactional(readOnly = true)
    public List<FeeSchedule> findApplicableSchedulesForClassroom(Classroom classroom, boolean returning) {
        if (classroom == null || classroom.getAcademicYear() == null || classroom.getLevel() == null) {
            return List.of();
        }
        UUID levelId = classroom.getLevel().getId();
        UUID cycleId = classroom.getLevel().getCycle() != null
                ? classroom.getLevel().getCycle().getId()
                : null;
        UUID campusId = classroom.getCampus() != null
                ? classroom.getCampus().getId()
                : null;

        List<FeeSchedule> schedules = feeScheduleRepository.findApplicable(
                classroom.getAcademicYear().getId(),
                levelId,
                cycleId,
                campusId);

        List<FeeSchedule> result = new ArrayList<>();
        for (FeeSchedule schedule : schedules) {
            boolean applies = returning
                    ? schedule.isAppliesToReturningStudents()
                    : schedule.isAppliesToNewStudents();
            if (applies) {
                result.add(schedule);
            }
        }
        return result;
    }

    /**
     * Applies a newly saved price to pupils already enrolled in that year.
     * Existing fee lines are left untouched; only missing sequence lines are
     * created, so repeating this operation cannot bill the same instalment twice.
     */
    @Transactional
    public List<StudentFee> generateForExistingEnrollments(FeeSchedule schedule) {
        List<StudentFee> created = new ArrayList<>();
        for (Enrollment enrollment : enrollmentRepository.findActiveByYear(
                schedule.getAcademicYear().getId())) {
            if (enrollment.getClassroom() == null
                    || (schedule.getLevel() != null
                        && !schedule.getLevel().getId().equals(
                                enrollment.getClassroom().getLevel().getId()))
                    || (schedule.getCycle() != null
                        && (enrollment.getClassroom().getLevel().getCycle() == null
                            || !schedule.getCycle().getId().equals(
                                    enrollment.getClassroom().getLevel().getCycle().getId())))
                    || (schedule.getCampus() != null
                        && (enrollment.getClassroom().getCampus() == null
                            || !schedule.getCampus().getId().equals(
                                    enrollment.getClassroom().getCampus().getId())))) {
                continue;
            }

            boolean returning = enrollment.getEnrollmentKind() == EnrollmentKind.RE_ENROLLMENT;
            if (returning ? !schedule.isAppliesToReturningStudents()
                    : !schedule.isAppliesToNewStudents()) {
                continue;
            }

            created.addAll(createLines(enrollment, schedule));
        }
        log.info("{} fee lines generated from schedule {} for existing enrollments",
                created.size(), schedule.getLabel());
        return created;
    }

    private List<StudentFee> createLines(Enrollment enrollment, FeeSchedule schedule) {
        List<StudentFee> lines = new ArrayList<>();

        if (schedule.getInstalments().isEmpty()) {
            // Single payment due at enrollment date.
            if (!studentFeeRepository.existsByEnrollmentIdAndFeeScheduleIdAndSequence(
                    enrollment.getId(), schedule.getId(), 1)) {
                lines.add(persist(enrollment, schedule, null, 1,
                        schedule.getLabel(), schedule.getTotalAmount(),
                        enrollment.getEnrollmentDate()));
            }
        } else {
            for (FeeScheduleInstalment instalment : schedule.getInstalments()) {
                if (!studentFeeRepository.existsByEnrollmentIdAndFeeScheduleIdAndSequence(
                        enrollment.getId(), schedule.getId(), instalment.getSequence())) {
                    lines.add(persist(enrollment, schedule, instalment,
                            instalment.getSequence(),
                            schedule.getLabel() + " - " + instalment.getLabel(),
                            instalment.getAmount(),
                            instalment.getDueDate()));
                }
            }
        }
        return lines;
    }

    private StudentFee persist(Enrollment enrollment,
                               FeeSchedule schedule,
                               FeeScheduleInstalment instalment,
                               int sequence,
                               String label,
                               BigDecimal amount,
                               java.time.LocalDate dueDate) {
        StudentFee fee = new StudentFee();
        fee.setStudent(enrollment.getStudent());
        fee.setEnrollment(enrollment);
        fee.setAcademicYear(enrollment.getAcademicYear());
        fee.setFeeType(schedule.getFeeType());
        fee.setFeeSchedule(schedule);
        fee.setInstalment(instalment);
        fee.setLabel(label);
        fee.setSequence(sequence);
        fee.setGrossAmount(MoneyUtils.normalize(amount));
        fee.setDiscountAmount(MoneyUtils.ZERO);
        fee.recomputeAmountDue();
        fee.setCurrency(schedule.getCurrency());
        fee.setDueDate(dueDate);
        fee.refreshStatus();
        return studentFeeRepository.save(fee);
    }

    /** Total still owed by the student for the year. */
    @Transactional(readOnly = true)
    public BigDecimal outstandingFor(java.util.UUID studentId, java.util.UUID academicYearId) {
        return studentFeeRepository.outstandingForStudent(studentId, academicYearId);
    }
}
