package ci.company.eduops.finance.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/** One due date of a fee schedule. */
@Entity
@Table(name = "fee_schedule_instalment")
@Getter
@Setter
public class FeeScheduleInstalment {

    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fee_schedule_id", nullable = false)
    private FeeSchedule feeSchedule;

    @Column(name = "sequence", nullable = false)
    private int sequence;

    @Column(name = "label", nullable = false, length = 120)
    private String label;

    @Column(name = "amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    /** Days after the due date before the instalment is flagged OVERDUE. */
    @Column(name = "grace_days", nullable = false)
    private int graceDays;

    public LocalDate effectiveDueDate() {
        return dueDate.plusDays(graceDays);
    }
}
