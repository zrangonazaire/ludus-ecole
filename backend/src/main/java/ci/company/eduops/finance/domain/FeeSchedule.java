package ci.company.eduops.finance.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.cycle.domain.Cycle;
import ci.company.eduops.level.domain.Level;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * The published price of one fee type for a level and a year, with its
 * instalment plan (600 000 FCFA payable in 3 x 200 000).
 */
@Entity
@Table(name = "fee_schedule")
@Getter
@Setter
public class FeeSchedule extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "fee_type_id", nullable = false)
    private FeeType feeType;

    /** Null means the price applies to every level. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "level_id")
    private Level level;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cycle_id")
    private Cycle cycle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campus_id")
    private Campus campus;

    @Column(name = "label", nullable = false, length = 150)
    private String label;

    @Column(name = "total_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "currency", nullable = false, length = 3)
    private String currency = "XOF";

    @Column(name = "applies_to_new_students", nullable = false)
    private boolean appliesToNewStudents = true;

    @Column(name = "applies_to_returning_students", nullable = false)
    private boolean appliesToReturningStudents = true;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "common_status")
    private CommonStatus status = CommonStatus.ACTIVE;

    @OneToMany(mappedBy = "feeSchedule", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("sequence ASC")
    private List<FeeScheduleInstalment> instalments = new ArrayList<>();

    public void addInstalment(FeeScheduleInstalment instalment) {
        instalments.add(instalment);
        instalment.setFeeSchedule(this);
    }

    /** The instalments must add up to the announced total. */
    public boolean instalmentsMatchTotal() {
        BigDecimal sum = instalments.stream()
                .map(FeeScheduleInstalment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return instalments.isEmpty() || sum.compareTo(totalAmount) == 0;
    }
}
