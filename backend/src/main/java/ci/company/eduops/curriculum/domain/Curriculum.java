package ci.company.eduops.curriculum.domain;

import ci.company.eduops.academicyear.domain.AcademicYear;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.cycle.domain.Cycle;
import ci.company.eduops.level.domain.Level;
import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The programme of a level for one academic year: which subjects are taught,
 * with which coefficient, and under which grading rules.
 *
 * <p>Coefficients are data, never constants in an Angular component
 * (section 26), so a school can change them between years without a release.</p>
 */
@Entity
@Table(name = "curriculum")
@Getter
@Setter
public class Curriculum extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "academic_year_id", nullable = false)
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cycle_id", nullable = false)
    private Cycle cycle;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "level_id", nullable = false)
    private Level level;

    @Column(name = "code", nullable = false, length = 40)
    private String code;

    @Column(name = "label", nullable = false, length = 150)
    private String label;

    /** scaleMax, passingMark, roundingMode, decimalPlaces, averageMode, rankingEnabled. */
    @Type(JsonBinaryType.class)
    @Column(name = "grading_rules", nullable = false, columnDefinition = "jsonb")
    private Map<String, Object> gradingRules = new HashMap<>();

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "common_status")
    private CommonStatus status = CommonStatus.ACTIVE;

    @OneToMany(mappedBy = "curriculum", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    private List<CurriculumSubject> subjects = new ArrayList<>();

    public void addSubject(CurriculumSubject subject) {
        subjects.add(subject);
        subject.setCurriculum(this);
    }

    public BigDecimal scaleMax() {
        return numericRule("scaleMax", new BigDecimal("20"));
    }

    public BigDecimal passingMark() {
        return numericRule("passingMark", new BigDecimal("10"));
    }

    public int decimalPlaces() {
        return numericRule("decimalPlaces", new BigDecimal("2")).intValue();
    }

    public boolean rankingEnabled() {
        Object value = gradingRules.get("rankingEnabled");
        return !(value instanceof Boolean flag) || flag;
    }

    /** Total of the coefficients of every mandatory graded subject. */
    public BigDecimal totalCoefficient() {
        return subjects.stream()
                .map(CurriculumSubject::getCoefficient)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal numericRule(String key, BigDecimal fallback) {
        Object value = gradingRules.get(key);
        if (value instanceof Number number) {
            return new BigDecimal(number.toString());
        }
        if (value instanceof String text) {
            try {
                return new BigDecimal(text);
            } catch (NumberFormatException ignored) {
                return fallback;
            }
        }
        return fallback;
    }
}
