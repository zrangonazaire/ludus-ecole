package ci.company.eduops.term.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;

/** A grading period inside an academic year (trimester, semester...). */
@Entity
@Table(name = "term")
@Getter
@Setter
public class Term extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @Column(name = "name", nullable = false, length = 120)
    private String name;

    @Column(name = "code", nullable = false, length = 30)
    private String code;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "term_type", nullable = false, columnDefinition = "term_type")
    private TermType termType = TermType.TRIMESTER;

    @Column(name = "sequence", nullable = false)
    private int sequence;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "grade_entry_start_at")
    private OffsetDateTime gradeEntryStartAt;

    @Column(name = "grade_entry_end_at")
    private OffsetDateTime gradeEntryEndAt;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "term_status")
    private TermStatus status = TermStatus.PLANNED;

    /** Weight of this term in the annual average. */
    @Column(name = "weight", nullable = false, precision = 6, scale = 3)
    private BigDecimal weight = BigDecimal.ONE;

    public boolean isGradeEntryWindowOpen() {
        if (!status.acceptsGradeEntry()) {
            return false;
        }
        OffsetDateTime now = OffsetDateTime.now();
        boolean started = gradeEntryStartAt == null || !now.isBefore(gradeEntryStartAt);
        boolean notFinished = gradeEntryEndAt == null || now.isBefore(gradeEntryEndAt);
        return started && notFinished;
    }

    public boolean contains(LocalDate date) {
        return date != null && !date.isBefore(startDate) && !date.isAfter(endDate);
    }
}
