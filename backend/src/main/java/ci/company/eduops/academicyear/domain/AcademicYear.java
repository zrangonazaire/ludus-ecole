package ci.company.eduops.academicyear.domain;

import ci.company.eduops.common.entity.AuditableEntity;
import ci.company.eduops.school.domain.School;
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

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * A school year (2026-2027). Every academic fact is contextualised by it
 * (rule 17), which is what makes multi-year history possible without ever
 * destroying past data (rule 16).
 */
@Entity
@Table(name = "academic_year")
@Getter
@Setter
public class AcademicYear extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @Column(name = "code", nullable = false, length = 30)
    private String code;

    @Column(name = "label", nullable = false, length = 120)
    private String label;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "academic_year_status")
    private AcademicYearStatus status = AcademicYearStatus.DRAFT;

    @Column(name = "enrollment_open_at")
    private OffsetDateTime enrollmentOpenAt;

    @Column(name = "enrollment_close_at")
    private OffsetDateTime enrollmentCloseAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "previous_year_id")
    private AcademicYear previousYear;

    @Column(name = "closed_at")
    private OffsetDateTime closedAt;

    @Column(name = "closed_by")
    private UUID closedBy;

    /** True when today falls inside the configured enrollment window. */
    public boolean isEnrollmentWindowOpen() {
        OffsetDateTime now = OffsetDateTime.now();
        boolean afterOpening = enrollmentOpenAt == null || !now.isBefore(enrollmentOpenAt);
        boolean beforeClosing = enrollmentCloseAt == null || now.isBefore(enrollmentCloseAt);
        return afterOpening && beforeClosing;
    }

    public boolean acceptsEnrollments() {
        return status.acceptsOperations() && isEnrollmentWindowOpen();
    }

    public boolean contains(LocalDate date) {
        return date != null && !date.isBefore(startDate) && !date.isAfter(endDate);
    }
}
