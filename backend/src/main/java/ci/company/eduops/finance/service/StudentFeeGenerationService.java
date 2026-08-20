package ci.company.eduops.finance.service;

import ci.company.eduops.common.util.MoneyUtils;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.enrollment.domain.EnrollmentKind;
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

    public StudentFeeGenerationService(FeeScheduleRepository feeScheduleRepository,
                                       StudentFeeRepository studentFeeRepository) {
        this.feeScheduleRepository = feeScheduleRepository;
        this.studentFeeRepository = studentFeeRepository;
    }

    /**
     * Creates the fee lines applicable to an enrollment.
     *
     * @return the created lines, empty when no price list matches
     */
    @Transactional
    public List<StudentFee> generateForEnrollment(Enrollment enrollment) {
        List<FeeSchedule> schedules = feeScheduleRepository.findApplicable(
                enrollment.getAcademicYear().getId(),
                enrollment.getClassroom().getLevel().getId(),
                enrollment.getClassroom().getCampus().getId());

        boolean returning = enrollment.getEnrollmentKind() == EnrollmentKind.RE_ENROLLMENT;
        List<StudentFee> created = new ArrayList<>();

        for (FeeSchedule schedule : schedules) {
            boolean applies = returning
                    ? schedule.isAppliesToReturningStudents()
                    : schedule.isAppliesToNewStudents();
            if (!applies) {
                continue;
            }
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

    private List<StudentFee> createLines(Enrollment enrollment, FeeSchedule schedule) {
        List<StudentFee> lines = new ArrayList<>();

        if (schedule.getInstalments().isEmpty()) {
            // Single payment due at enrollment date.
            lines.add(persist(enrollment, schedule, null, 1,
                    schedule.getLabel(), schedule.getTotalAmount(),
                    enrollment.getEnrollmentDate()));
        } else {
            for (FeeScheduleInstalment instalment : schedule.getInstalments()) {
                lines.add(persist(enrollment, schedule, instalment,
                        instalment.getSequence(),
                        schedule.getLabel() + " - " + instalment.getLabel(),
                        instalment.getAmount(),
                        instalment.getDueDate()));
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
