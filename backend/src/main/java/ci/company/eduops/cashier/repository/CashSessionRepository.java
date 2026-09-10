package ci.company.eduops.cashier.repository;

import ci.company.eduops.cashier.domain.CashSession;
import ci.company.eduops.cashier.domain.CashSessionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CashSessionRepository extends JpaRepository<CashSession, UUID> {

    java.util.List<CashSession> findBySchoolIdAndCashierUserIdOrderByOpenedAtDesc(UUID schoolId, UUID cashierUserId);

    @org.springframework.data.jpa.repository.Lock(jakarta.persistence.LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM CashSession s WHERE s.id = :id")
    Optional<CashSession> lockById(@Param("id") UUID id);

    /** A cashier may only hold one open session at a time. */
    @org.springframework.data.jpa.repository.Lock(jakarta.persistence.LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM CashSession s WHERE s.cashierUserId = :userId AND s.status = 'OPEN'")
    Optional<CashSession> findOpenForCashier(@Param("userId") UUID userId);

    Page<CashSession> findBySchoolIdAndStatus(UUID schoolId, CashSessionStatus status, Pageable pageable);

    Optional<CashSession> findByReference(String reference);
}
