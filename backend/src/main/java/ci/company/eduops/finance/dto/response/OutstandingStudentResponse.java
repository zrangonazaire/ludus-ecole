package ci.company.eduops.finance.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/** One family balance, aggregated from every unpaid instalment of a pupil. */
@Getter
@Setter
public class OutstandingStudentResponse {
    private UUID studentId;
    private String studentNumber;
    private String studentName;
    private String photoUrl;
    private String classroomName;
    private String guardianName;
    private String guardianPhone;
    private String guardianEmail;
    private BigDecimal outstandingAmount;
    private BigDecimal overdueAmount;
    private String currency;
    private LocalDate oldestDueDate;
    private long daysOverdue;
    private int instalmentCount;
}
