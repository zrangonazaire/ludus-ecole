package ci.company.eduops.room.domain;

import ci.company.eduops.campus.domain.Campus;
import ci.company.eduops.common.domain.CommonStatus;
import ci.company.eduops.common.entity.AuditableEntity;
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
 * Un bâtiment d'un campus : un nom écrit sur les portes, des étages, des salles.
 *
 * <p>Le bâtiment est rattaché à un campus unique, et son code est unique dans ce
 * campus : deux sites peuvent chacun avoir leur « BAT-A » sans se marcher dessus.
 * Les salles pointent vers lui ; tant qu'une salle active y reste rattachée, son
 * archivage est refusé — sinon la liste des salles afficherait un bâtiment
 * fantôme.</p>
 */
@Entity
@Table(name = "building")
@Getter
@Setter
public class Building extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "campus_id", nullable = false)
    private Campus campus;

    @Column(name = "code", nullable = false, length = 30)
    private String code;

    @Column(name = "name", nullable = false, length = 120)
    private String name;

    @Column(name = "floors", nullable = false)
    private int floors;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", nullable = false, columnDefinition = "common_status")
    private CommonStatus status = CommonStatus.ACTIVE;
}
