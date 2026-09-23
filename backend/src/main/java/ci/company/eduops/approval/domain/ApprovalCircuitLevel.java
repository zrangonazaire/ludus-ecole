package ci.company.eduops.approval.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.UUID;

/**
 * Un niveau hiérarchique d'un circuit : code, ordre, mode Tous/Un seul.
 *
 * <p>Pas d'héritage de {@code BaseEntity} : la clé est fournie pour garder la
 * même forme que les autres tables métier tout en restant simple. Seul le
 * dernier niveau de la liste est effectif (recalculé à chaque écriture).</p>
 */
@Entity
@Table(name = "approval_circuit_level")
@Getter
@Setter
public class ApprovalCircuitLevel {

    @Id
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "school_id", nullable = false, updatable = false)
    private UUID schoolId;

    @Column(name = "circuit_id", nullable = false, updatable = false)
    private UUID circuitId;

    @Column(name = "level_number", nullable = false, updatable = false)
    private int levelNumber;

    @Column(name = "code", nullable = false, length = 20)
    private String code;

    @Enumerated(EnumType.STRING)
    @org.hibernate.annotations.JdbcTypeCode(org.hibernate.type.SqlTypes.NAMED_ENUM)
    @Column(name = "approval_mode", nullable = false, columnDefinition = "approval_mode")
    private ApprovalMode approvalMode = ApprovalMode.ALL;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;
}
