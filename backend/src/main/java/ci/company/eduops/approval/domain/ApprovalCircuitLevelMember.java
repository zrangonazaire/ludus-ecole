package ci.company.eduops.approval.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.Objects;
import java.util.UUID;

/**
 * Valideurs nommés d'un niveau : sans membre, la demande ne peut pas avancer.
 */
@Entity
@Table(name = "approval_circuit_level_member")
@IdClass(ApprovalCircuitLevelMember.LevelMemberId.class)
@Getter
@Setter
public class ApprovalCircuitLevelMember {

    @Id
    @Column(name = "level_id", nullable = false, updatable = false)
    private UUID levelId;

    @Id
    @Column(name = "user_id", nullable = false, updatable = false)
    private UUID userId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Getter
    @Setter
    public static class LevelMemberId implements Serializable {
        private UUID levelId;
        private UUID userId;

        @Override
        public boolean equals(Object other) {
            if (this == other) {
                return true;
            }
            if (!(other instanceof LevelMemberId that)) {
                return false;
            }
            return Objects.equals(levelId, that.levelId)
                    && Objects.equals(userId, that.userId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(levelId, userId);
        }
    }
}
