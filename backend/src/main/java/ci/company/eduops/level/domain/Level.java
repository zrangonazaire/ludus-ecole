package ci.company.eduops.level.domain;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.cycle.domain.Cycle;
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

/**
 * A grade level (6eme, 3eme, Terminale). {@code nextLevel} materialises the
 * promotion path used when a class council decides a student passes.
 */
@Entity
@Table(name = "level")
@Getter
@Setter
public class Level extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cycle_id", nullable = false)
    private Cycle cycle;

    @Column(name = "code", nullable = false, length = 30)
    private String code;

    @Column(name = "name", nullable = false, length = 120)
    private String name;

    @Column(name = "short_name", length = 30)
    private String shortName;

    @Column(name = "sequence", nullable = false)
    private int sequence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "next_level_id")
    private Level nextLevel;

    /** Terminal levels lead to GRADUATED rather than to a next level. */
    @Column(name = "is_terminal", nullable = false)
    private boolean terminal;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "common_status")
    private CommonStatus status = CommonStatus.ACTIVE;
}
