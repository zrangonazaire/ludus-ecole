package ci.company.eduops.security.repository;

import ci.company.eduops.security.entity.PasswordResetToken;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, UUID> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select t from PasswordResetToken t join fetch t.user where t.tokenHash = :tokenHash")
    Optional<PasswordResetToken> lockByTokenHash(@Param("tokenHash") String tokenHash);

    @Query("select max(t.createdAt) from PasswordResetToken t where t.user.id = :userId")
    Optional<OffsetDateTime> lastIssuedAt(@Param("userId") UUID userId);

    @Query("select count(t) from PasswordResetToken t "
            + "where t.user.id = :userId and t.createdAt >= :since")
    long countIssuedSince(@Param("userId") UUID userId,
                          @Param("since") OffsetDateTime since);

    @Modifying
    @Query("update PasswordResetToken t set t.usedAt = :now "
            + "where t.user.id = :userId and t.usedAt is null")
    int invalidateOpenForUser(@Param("userId") UUID userId,
                              @Param("now") OffsetDateTime now);
}
