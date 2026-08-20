package ci.company.eduops.reportcard.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.classroom.domain.Classroom;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.enrollment.domain.Enrollment;
import ci.company.eduops.promotion.domain.PromotionDecisionType;
import ci.company.eduops.student.domain.Student;
import ci.company.eduops.term.domain.Term;
import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * A pupil's term report.
 *
 * <p>Rule 15: once published it must be reproducible. The inputs of the
 * computation are frozen in {@code computationSnapshot}, and any later
 * correction produces a new {@code revision} rather than mutating this one.</p>
 */
@Entity
@Table(name = "report_card")
@Getter
@Setter
public class ReportCard extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "enrollment_id", nullable = false)
    private Enrollment enrollment;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "classroom_id", nullable = false)
    private Classroom classroom;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "term_id", nullable = false)
    private Term term;

    @Column(name = "reference", nullable = false, length = 60)
    private String reference;

    /** Printed and QR-encoded so a third party can verify the document. */
    @Column(name = "verification_code", nullable = false, length = 60)
    private String verificationCode;

    @Column(name = "general_average", precision = 6, scale = 3)
    private BigDecimal generalAverage;

    @Column(name = "class_average", precision = 6, scale = 3)
    private BigDecimal classAverage;

    @Column(name = "class_min_average", precision = 6, scale = 3)
    private BigDecimal classMinAverage;

    @Column(name = "class_max_average", precision = 6, scale = 3)
    private BigDecimal classMaxAverage;

    @Column(name = "rank_in_class")
    private Integer rankInClass;

    @Column(name = "class_size")
    private Integer classSize;

    @Column(name = "total_coefficient", precision = 8, scale = 3)
    private BigDecimal totalCoefficient;

    @Column(name = "absence_count", nullable = false)
    private int absenceCount;

    @Column(name = "justified_absence_count", nullable = false)
    private int justifiedAbsenceCount;

    @Column(name = "lateness_count", nullable = false)
    private int latenessCount;

    @Column(name = "general_remark")
    private String generalRemark;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "council_decision", columnDefinition = "promotion_decision_type")
    private PromotionDecisionType councilDecision;

    @Column(name = "head_teacher_remark")
    private String headTeacherRemark;

    @Column(name = "principal_remark")
    private String principalRemark;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "report_card_status")
    private ReportCardStatus status = ReportCardStatus.DRAFT;

    @Column(name = "generated_at")
    private OffsetDateTime generatedAt;

    @Column(name = "generated_by")
    private UUID generatedBy;

    @Column(name = "published_at")
    private OffsetDateTime publishedAt;

    @Column(name = "published_by")
    private UUID publishedBy;

    @Type(JsonBinaryType.class)
    @Column(name = "computation_snapshot", columnDefinition = "jsonb")
    private Map<String, Object> computationSnapshot = new HashMap<>();

    @Column(name = "pdf_url", length = 500)
    private String pdfUrl;

    @Column(name = "revision", nullable = false)
    private int revision = 1;

    @OneToMany(mappedBy = "reportCard", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    private List<ReportCardLine> lines = new ArrayList<>();

    public void addLine(ReportCardLine line) {
        lines.add(line);
        line.setReportCard(this);
    }

    public void publish(UUID userId) {
        this.status = ReportCardStatus.PUBLISHED;
        this.publishedAt = OffsetDateTime.now();
        this.publishedBy = userId;
    }

    public String rankLabel() {
        if (rankInClass == null || classSize == null) {
            return null;
        }
        return rankInClass + " / " + classSize;
    }
}
