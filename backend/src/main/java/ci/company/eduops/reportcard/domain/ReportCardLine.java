package ci.company.eduops.reportcard.domain;

import ci.company.eduops.subject.domain.Subject;
import ci.company.eduops.teacher.domain.Teacher;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * One subject row of a report card. The subject name and coefficient are copied
 * here so a later rename or coefficient change never alters a printed report.
 */
@Entity
@Table(name = "report_card_line")
@Getter
@Setter
public class ReportCardLine {

    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "report_card_id", nullable = false)
    private ReportCard reportCard;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @Column(name = "subject_name", nullable = false, length = 150)
    private String subjectName;

    @Column(name = "coefficient", nullable = false, precision = 6, scale = 3)
    private BigDecimal coefficient;

    @Column(name = "subject_average", precision = 6, scale = 3)
    private BigDecimal subjectAverage;

    @Column(name = "weighted_average", precision = 9, scale = 3)
    private BigDecimal weightedAverage;

    @Column(name = "class_subject_average", precision = 6, scale = 3)
    private BigDecimal classSubjectAverage;

    @Column(name = "min_score", precision = 6, scale = 3)
    private BigDecimal minScore;

    @Column(name = "max_score", precision = 6, scale = 3)
    private BigDecimal maxScore;

    @Column(name = "rank_in_subject")
    private Integer rankInSubject;

    @Column(name = "assessment_count", nullable = false)
    private int assessmentCount;

    @Column(name = "appreciation", length = 255)
    private String appreciation;

    @Column(name = "display_order", nullable = false)
    private int displayOrder = 1;
}
