package ci.company.eduops.security.repository;

import ci.company.eduops.security.entity.EmailVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EmailVerificationTokenRepository
        extends JpaRepository<EmailVerificationToken, UUID> {

    Optional<EmailVerificationToken> findByTokenHash(String tokenHash);

    /** Date d'émission du dernier jeton : sert au délai minimal entre deux envois. */
    @Query("select max(t.createdAt) from EmailVerificationToken t where t.user.id = :userId")
    Optional<OffsetDateTime> lastIssuedAt(@Param("userId") UUID userId);

    /** Nombre de jetons émis depuis une date : plafond horaire des renvois. */
    @Query("select count(t) from EmailVerificationToken t "
            + "where t.user.id = :userId and t.createdAt >= :since")
    long countIssuedSince(@Param("userId") UUID userId,
                          @Param("since") OffsetDateTime since);

    /** Invalide les jetons encore ouverts : seul le dernier lien envoyé fonctionne. */
    @Modifying
    @Query("update EmailVerificationToken t set t.consumedAt = :now "
            + "where t.user.id = :userId and t.consumedAt is null")
    int invalidateOpenTokens(@Param("userId") UUID userId,
                             @Param("now") OffsetDateTime now);
}
