package ci.company.eduops.option.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.level.domain.Level;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "option_offering")
@Getter
@Setter
public class OptionOffering extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "option_id", nullable = false)
    private AcademicOption option;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "level_id", nullable = false)
    private Level level;

    @Column(name = "capacity", nullable = false)
    private int capacity = 40;

    @Column(name = "weekly_hours", nullable = false, precision = 5, scale = 2)
    private BigDecimal weeklyHours = new BigDecimal("2.00");

    @Column(name = "choice_start_date")
    private LocalDate choiceStartDate;

    @Column(name = "choice_end_date")
    private LocalDate choiceEndDate;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "common_status")
    private CommonStatus status = CommonStatus.ACTIVE;
}

