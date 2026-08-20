package ci.company.eduops.subject.domain;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.entity.BaseEntity;
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

/** A taught subject (MAT - Mathematiques). Coefficients live in the curriculum. */
@Entity
@Table(name = "subject")
@Getter
@Setter
public class Subject extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @Column(name = "code", nullable = false, length = 20)
    private String code;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "short_name", length = 40)
    private String shortName;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "category", nullable = false, columnDefinition = "subject_category")
    private SubjectCategory category = SubjectCategory.OTHER;

    @Column(name = "color_hex", length = 7)
    private String colorHex;

    @Column(name = "description")
    private String description;

    /** Non-graded subjects (e.g. "Vie scolaire") never enter an average. */
    @Column(name = "is_graded", nullable = false)
    private boolean graded = true;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "common_status")
    private CommonStatus status = CommonStatus.ACTIVE;
}
