package ci.company.eduops.finance.domain;

import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.entity.BaseEntity;
import ci.company.eduops.school.domain.School;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 * Une rubrique de frais propre à une école : Inscription, Scolarité, mais
 * aussi telle ligne déclarée par l'établissement lui-même.
 *
 * <p>C'était un enum figé dans le code (V2), remplacé par cette table en
 * V54. Le code reste court et stable — il figure dans les exports et sert
 * de clé étrangère depuis {@code fee_type.category} — le libellé, lui, est
 * libre et modifiable sans redéploiement.</p>
 */
@Entity
@Table(name = "fee_category")
@Getter
@Setter
public class FeeCategory extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @Column(name = "code", nullable = false, length = 40)
    private String code;

    @Column(name = "label", nullable = false, length = 150)
    private String label;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "common_status")
    private CommonStatus status = CommonStatus.ACTIVE;
}

