package ci.company.eduops.curriculum.domain;

import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.subject.domain.Subject;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/** One subject inside a curriculum, carrying its coefficient and weekly load. */
@Entity
@Table(name = "curriculum_subject")
@Getter
@Setter
public class CurriculumSubject extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "curriculum_id", nullable = false)
    private Curriculum curriculum;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(name = "coefficient", nullable = false, precision = 6, scale = 3)
    private BigDecimal coefficient = BigDecimal.ONE;

    @Column(name = "weekly_hours", nullable = false, precision = 5, scale = 2)
    private BigDecimal weeklyHours = new BigDecimal("2.00");

    @Column(name = "is_mandatory", nullable = false)
    private boolean mandatory = true;

    @Column(name = "display_order", nullable = false)
    private int displayOrder = 1;

    /** Subject-specific passing mark; falls back to the curriculum rule. */
    @Column(name = "passing_mark", precision = 6, scale = 3)
    private BigDecimal passingMark;
}
