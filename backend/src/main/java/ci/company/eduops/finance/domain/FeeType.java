package ci.company.eduops.finance.domain;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.school.domain.School;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/** A kind of fee: inscription, scolarite, examen... (section 39). */
@Entity
@Table(name = "fee_type")
@Getter
@Setter
public class FeeType extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @Column(name = "code", nullable = false, length = 40)
    private String code;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "category", nullable = false, columnDefinition = "fee_category")
    private FeeCategory category = FeeCategory.OTHER;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "recurrence", nullable = false, columnDefinition = "fee_recurrence")
    private FeeRecurrence recurrence = FeeRecurrence.ANNUAL;

    @Column(name = "is_mandatory", nullable = false)
    private boolean mandatory = true;

    @Column(name = "refundable", nullable = false)
    private boolean refundable;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "common_status")
    private CommonStatus status = CommonStatus.ACTIVE;
}
