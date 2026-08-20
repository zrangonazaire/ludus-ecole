package ci.company.eduops.grade.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

/** Rule 6: every correction of a validated or published mark is kept forever. */
@Entity
@Table(name = "grade_revision")
@Getter
@Setter
public class GradeRevision {

    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "grade_id", nullable = false)
    private Grade grade;

    @Column(name = "previous_score", precision = 6, scale = 3)
    private BigDecimal previousScore;

    @Column(name = "new_score", precision = 6, scale = 3)
    private BigDecimal newScore;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "previous_status", columnDefinition = "grade_status")
    private GradeStatus previousStatus;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "new_status", columnDefinition = "grade_status")
    private GradeStatus newStatus;

    @Column(name = "justification", nullable = false)
    private String justification;

    @Column(name = "changed_by", nullable = false)
    private UUID changedBy;

    @Column(name = "changed_at", nullable = false)
    private OffsetDateTime changedAt = OffsetDateTime.now();
}
