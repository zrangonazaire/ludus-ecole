package ci.company.eduops.option.domain;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.school.domain.School;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "academic_option")
@Getter
@Setter
public class AcademicOption extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @Column(name = "code", nullable = false, length = 30)
    private String code;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false, length = 30)
    private OptionCategory category = OptionCategory.OTHER;

    @Column(name = "language_code", length = 10)
    private String languageCode;

    @Column(name = "description")
    private String description;

    @Column(name = "color_hex", length = 7)
    private String colorHex;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "common_status")
    private CommonStatus status = CommonStatus.ACTIVE;
}
