package ci.company.eduops.finance.domain;

import ci.company.eduops.common.entity.BaseEntity;
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

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Un palier de validation d'une demande de réduction : un profil (rôle)
 * doit l'approuver avant que le palier suivant ne soit ouvert.
 */
@Entity
@Table(name = "discount_request_level")
@Getter
@Setter
public class DiscountRequestLevel extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id", nullable = false, updatable = false)
    private DiscountRequest request;

    @Column(name = "school_id", nullable = false, updatable = false)
    private UUID schoolId;

    @Column(name = "level_number", nullable = false, updatable = false)
    private int levelNumber;

    /** Nom donné au palier, ex. « Intendance » puis « Direction ». */
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    /** Code du profil (rôle) habilité à trancher ce palier. */
    @Column(name = "role_code", nullable = false, length = 60)
    private String roleCode;

    @Column(name = "role_label", length = 150)
    private String roleLabel;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private DiscountRequestLevelStatus status = DiscountRequestLevelStatus.PENDING;

    @Column(name = "approver_id")
    private UUID approverId;

    @Column(name = "approver_name", length = 160)
    private String approverName;

    @Column(name = "comment")
    private String comment;

    @Column(name = "decided_at")
    private OffsetDateTime decidedAt;
}
